# Orbit Spec

## 1. 프로젝트 정의

- 프로젝트명: Orbit
- 목표: 2026-05-30 지구런 10K 완주를 위한 5주 훈련 페이스메이커 제공
- 핵심 경험:
  - 완료한 훈련은 빛나는 궤적으로 누적된다.
  - 스킵한 훈련은 이탈이 아닌 지나온 흔적(회색)으로 기록된다.
  - 죄책감보다 복귀 동기를 높이는 인터랙션을 제공한다.
- 대상 플랫폼: 모바일 웹 및 PWA (iOS Safari, Android Chrome)
- MVP 범위:
  - Home: 3D 궤도, 오늘의 훈련, 다가오는 3일 훈련
  - Plan: 주간/월간 캘린더, 훈련 상세 바텀시트, 완료/취소 처리
  - 사용자 이름 편집, 로컬 저장 기반 진행률 집계, 미래 날짜 완료 방지

## 2. 아키텍처 및 디렉토리

### 2.1 아키텍처 원칙

- UI, 도메인 데이터, 상태, 유틸을 분리한다.
- 3D 렌더링 로직은 `components/3d`에 격리한다.
- 파생 데이터는 페이지 내부 계산이 아니라 selector/helper에서 계산한다.

### 2.2 디렉토리 구조

```text
src/
├── assets/
├── components/
│   ├── layout/
│   ├── ui/
│   └── 3d/
├── constants/
├── pages/
│   ├── Splash.tsx
│   ├── Home.tsx
│   └── Plan.tsx
├── store/
│   └── useOrbitStore.ts
├── utils/
├── App.tsx
└── main.tsx
```

### 2.3 상태 모델 (Zustand + persist)

- `user: { name: string }`
- `records: Record<string, 'completed' | 'skipped' | 'upcoming'>` (`YYYY-MM-DD` 키)
- `progressCount: number` (러닝 핵심 훈련 완료 수, 최대 11)
- `actions`
  - `toggleRecord(date, status)`
  - `setUserName(name)`
  - `recalculateProgress()`

### 2.4 상태 정책

- 미래 날짜는 완료 처리할 수 없다.
- 과거 미완료는 skipped 표시가 가능하며, 최대 궤도 모수(11)는 줄이지 않는다.
- Home/Plan은 store를 단일 소스로 사용한다.

## 3. 기능 및 UX 명세

### 3.1 전역 레이아웃

- Header: 좌측 페이지 타이틀, 우측 Avatar 아이콘
- Avatar 클릭 시 사용자 이름 변경 모달 노출
- Bottom Navigation: Home/Plan 고정 탭, 활성 탭 강조
- 기본 테마: 다크 모드 (`#0f172a` 계열)

### 3.2 Home 화면

- 3D Orbit Canvas 렌더링 (`@react-three/fiber`)
- Base Track: 다크 메탈 링
- Progress Track: `progressCount`에 따라 Arc 길이 변화 + Bloom 발광
- 애니메이션:
  - 진행률 변화 시 부드러운 보간(Lerp)으로 차오름/줄어듦 전환
  - Home 재진입 시 불필요한 재생을 피하고 현재 상태를 안정적으로 반영
- 오늘의 훈련 카드 노출
- 내일부터 3일 훈련 요약 리스트 노출

### 3.3 Plan 화면

- 상단: `🌍 Run 10K Planning`, 범례, 달성률
- 월간/주간 토글 지원
- 일요일 시작 기준 캘린더
- 오늘 날짜 강조
- 과거 미완료는 Skip/딤 처리

### 3.4 BottomSheet 및 오버레이 상호작용

- 캘린더 날짜 탭 시 바텀시트 오픈
- 바텀시트 구성:
  - 날짜, 훈련 타입, 요약, 상세(웜업/메인/쿨다운), 메모
- 완료 버튼 클릭 시:
  - 오버레이 위에 격려 메시지와 Home과 동일한 3D 궤도/애니메이션 노출
  - 완료/취소 모두 부드럽게 차오르고 부드럽게 줄어드는 애니메이션 전환을 제공
- 오버레이는 자동 종료하지 않고 사용자 탭/클릭으로 닫는다.
- 오버레이 닫힘 후 바텀시트는 유지되며, 아래로 스와이프 또는 닫기 버튼으로 닫는다.

## 4. 예외 처리 및 정책

- 미래 날짜를 탭하면 완료 체크를 비활성화하고 안내 문구를 노출한다.
- 과거 미완료 훈련은 기록으로 남기되, 완료 총량 최대치(11) 산정 구조는 유지한다.
- `index.html` viewport에 `user-scalable=no, maximum-scale=1.0` 적용으로 핀치 줌을 방지한다.

## 5. 개발 품질 기준

- 패키지 매니저와 스크립트 실행은 pnpm 기준으로 통일한다.
- Prettier를 적용해 코드 포맷을 일관되게 유지한다.
- ESLint를 적용해 정적 분석 기반 코드 품질을 유지한다.
- Lefthook을 사용해 커밋 전 품질 검사(포맷/린트)를 자동 실행한다.

## 6. 완료 기준

### 6.1 기능 검증

- 라우팅, Header, BottomNav 동작이 정상이다.
- 오늘 훈련/다가오는 3일 데이터가 정확하다.
- 캘린더 날짜 선택 시 바텀시트 정보가 일치한다.

### 6.2 상태 및 정책 검증

- 완료/취소 후 `records`, `progressCount`가 일관된다.
- 미래 날짜 완료 비활성화와 안내 문구가 동작한다.
- 새로고침 후 persist 복원이 정상이다.

### 6.3 인터랙션 검증

- 완료 클릭 시 오버레이에 격려 메시지 + Home 동일 3D/애니메이션이 노출된다.
- 완료/취소 모두 애니메이션이 부드럽게 증가/감소 전환된다.
- 오버레이는 탭/클릭으로 닫힌다.
- 오버레이 종료 후 바텀시트는 스와이프 다운/닫기 버튼으로 닫힌다.

### 6.4 PWA/모바일 검증

- manifest/service worker 등록이 정상이다.
- iOS/Android 설치 및 실행 기본 흐름이 동작한다.
- 핀치 줌 방지 viewport 정책이 적용된다.
