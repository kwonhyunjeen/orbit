# Orbit Implementation Plan

## 1. 목표

`docs/specs/orbit-10k-pwa-spec.md`에 정의된 MVP를 React + TypeScript + Vite 기반 PWA로 구현한다.

## 2. 작업 원칙

- Spec 범위를 넘는 기능 추가를 하지 않는다.
- 패키지 설치/실행/스크립트는 pnpm 기준으로 통일한다.
- 전역 상태는 Zustand store를 단일 소스로 사용한다.
- UI, 상태, 3D 렌더링, 날짜 계산 로직을 분리한다.
- 모바일 환경 중심으로 인터랙션을 검증한다.
- UI를 작은 단위로 먼저 만들고, 기능 연결은 더미 계약으로 시작한 뒤 실제 로직으로 치환한다.

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

### Phase 1. UI 스캐폴드 및 컴포넌트 계약 고정 (선행)

1. `src` 디렉토리 구조를 spec 기준으로 생성
2. 공통 레이아웃 스캐폴드 구현
   - `components/layout/Header.tsx`
   - `components/layout/BottomNav.tsx`
3. 페이지 골격 구현
   - `pages/Splash.tsx`, `pages/Home.tsx`, `pages/Plan.tsx`
   - 라우트 연결만 우선 적용
4. UI 컴포넌트 더미 구현
   - `components/ui/BottomSheet.tsx`, 오버레이, 범례 등
   - 실제 상태 연결 없이 local state/dummy props로 동작 확인
5. 3D 컴포넌트 스캐폴드 구현
   - `components/3d/OrbitScene.tsx` 기본 렌더/제어만 연결
6. 컴포넌트 계약(Type/Props) 고정
   - 오늘 훈련 카드, 캘린더 셀, 바텀시트 데이터 shape를 타입으로 선언
   - 이후 상태/유틸 레이어가 이 계약을 따르도록 기준화

### Phase 2. 데이터 및 상태 레이어 구현

1. `constants/planData.ts`에 5주 훈련 데이터 정의
2. `utils`에 날짜 포맷/비교 helper 구성 (`YYYY-MM-DD` 기준)
3. `store/useOrbitStore.ts` 구현
   - `user`, `records`, `progressCount`
   - `toggleRecord`, `setUserName`, `recalculateProgress`
   - localStorage persist 설정
4. Phase 1의 더미 데이터/핸들러를 실제 store + helper 기반으로 치환

### Phase 3. 핵심 인터랙션 및 정책 연결

1. Home 진행률 반영 및 3D 애니메이션 연결
   - 완료/취소에 따른 부드러운 증가/감소 전환
2. Plan 캘린더 상태 반영
   - 오늘 하이라이트
   - 과거 미완료 Skip/딤 처리
3. BottomSheet 완료/취소 흐름 연결
   - 오버레이 + 격려 메시지 + Home 동일 3D 애니메이션
   - 오버레이 탭/클릭 닫기
   - 바텀시트 스와이프 다운/닫기 버튼 닫기
4. 정책/예외 처리 반영
   - 미래 날짜 완료 비활성화 및 안내 문구
   - 과거 미완료 기록 정책 반영
   - viewport 핀치줌 방지 설정 반영

### Phase 4. 통합 검증 및 마감

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
2. `pages/*`, `components/layout/*`, `components/ui/*`, `components/3d/*` (UI 선행)
3. `constants/planData.ts`, `utils/*`, `store/useOrbitStore.ts` (로직 치환)

## 5. 리스크와 대응

- UI 더미와 실제 로직 연결 시 계약 불일치 가능성
  - 대응: Phase 1에서 Props/Type 계약을 먼저 고정하고, Phase 2는 계약을 따르는 방향으로만 구현
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
