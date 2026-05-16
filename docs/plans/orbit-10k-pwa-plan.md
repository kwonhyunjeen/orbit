# Orbit Implementation Plan

## 1. 목표
`docs/specs/orbit-10k-pwa-spec.md`에 정의된 MVP를 React + TypeScript + Vite 기반 PWA로 구현한다.

## 2. 작업 원칙
- Spec 범위를 넘는 기능 추가를 하지 않는다.
- 패키지 설치/실행/스크립트는 pnpm 기준으로 통일한다.
- 전역 상태는 Zustand store를 단일 소스로 사용한다.
- UI, 상태, 3D 렌더링, 날짜 계산 로직을 분리한다.
- 모바일 환경 중심으로 인터랙션을 검증한다.

## 3. 구현 단계

### Phase 0. 프로젝트 초기화
1. pnpm 기반 Vite React TypeScript 프로젝트 생성
2. 필수 의존성 설치 (pnpm)
   - `react-router-dom`, `zustand`, `dayjs`, `lucide-react`
   - `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
   - `framer-motion`
   - `vite-plugin-pwa`
3. Tailwind CSS 설정 및 다크 테마 기본 토큰 정의
4. PWA 기본 설정(manifest, service worker) 적용
5. 코드 품질 도구 설정 (pnpm)
   - `prettier` 설치 및 기본 포맷 규칙 구성
   - `eslint` 설치 및 TypeScript/React 기준 린트 규칙 구성
   - `lefthook` 설치 및 pre-commit 훅에서 포맷/린트 실행 설정
6. 잠금 파일 및 실행 기준 검증
   - `pnpm-lock.yaml` 생성 확인
   - 스크립트 실행(`pnpm lint`, `pnpm format`, `pnpm build`) 기준 확인

### Phase 1. 기본 구조 및 데이터 레이어
1. `src` 디렉토리 구조를 spec 기준으로 생성
2. `constants/planData.ts`에 5주 훈련 데이터 정의
3. `utils`에 날짜 포맷/비교 helper 구성 (`YYYY-MM-DD` 기준)
4. `store/useOrbitStore.ts` 구현
   - `user`, `records`, `progressCount`
   - `toggleRecord`, `setUserName`, `recalculateProgress`
   - localStorage persist 설정

### Phase 2. 공통 레이아웃 및 라우팅
1. `App.tsx`에 라우팅/레이아웃 골격 구성
2. `Splash.tsx`, `Home.tsx`, `Plan.tsx` 라우트 연결
3. `components/layout/Header.tsx` 구현
   - 페이지 타이틀 표시
   - Avatar 클릭 시 이름 변경 모달 연결
4. `components/layout/BottomNav.tsx` 구현
   - Home/Plan 탭 이동
   - 활성 탭 스타일링

### Phase 3. Home 화면 구현
1. `components/3d/OrbitScene.tsx` 구현
   - Base Track + Progress Track + Bloom
   - OrbitControls 제한(zoom/pan 비활성, drag 회전만 허용)
2. 진행률 변화 애니메이션 구현
   - 완료/취소에 따라 부드러운 증가/감소 전환
3. `Home.tsx` 구현
   - 오늘의 훈련 카드
   - 다가오는 3일 리스트
   - 상태/데이터 매핑

### Phase 4. Plan 화면 및 BottomSheet 구현
1. `Plan.tsx` 상단 영역 구현
   - 타이틀, 범례, 달성률
2. 월간/주간 토글 캘린더 구현
   - 일요일 시작
   - 오늘 하이라이트
   - 과거 미완료 Skip/딤 처리
3. `components/ui/BottomSheet.tsx` 구현
   - 날짜/타입/요약/상세/메모 노출
   - 닫기 버튼 + 스와이프 다운 닫기
4. 완료 버튼 인터랙션 구현
   - 오버레이 + 격려 메시지 + Home 동일 3D 애니메이션
   - 완료/취소 모두 부드러운 증가/감소 전환
   - 오버레이는 탭/클릭으로 닫기

### Phase 5. 정책/예외 처리
1. 미래 날짜 완료 비활성화 및 안내 문구 처리
2. 과거 미완료 기록 정책 반영
3. viewport 핀치줌 방지 설정 반영

### Phase 6. 검증 및 마감
1. 타입체크/린트/포맷/빌드 검증
2. 주요 플로우 수동 검증
   - Home/Plan 이동
   - 완료/취소 상태 전환
   - 오버레이/바텀시트 닫기 동작
   - persist 복원
3. PWA 설치/실행 기본 플로우 확인
4. 남은 이슈 정리 및 수정

## 4. 파일 단위 작업 우선순위
1. `main.tsx`, `App.tsx`
2. `store/useOrbitStore.ts`, `constants/planData.ts`, `utils/*`
3. `components/layout/*`, `components/ui/*`
4. `components/3d/*`
5. `pages/Home.tsx`, `pages/Plan.tsx`, `pages/Splash.tsx`

## 5. 리스크와 대응
- 3D + 모바일 성능 저하 가능성
  - 대응: 재렌더링 최소화, 불필요한 애니메이션 재생 방지
- 날짜 경계값 처리 오류 가능성
  - 대응: helper 단일화, 날짜 비교 규칙 일원화
- 상태/파생값 불일치 가능성
  - 대응: store selector 기반으로 화면 표시 통일

## 6. 완료 정의
- Spec의 완료 기준(기능/상태/인터랙션/PWA)을 모두 충족한다.
- 모바일 브라우저 기준 주요 사용자 플로우가 끊김 없이 동작한다.
- 구현 범위가 Spec MVP를 초과하지 않는다.
