# Frontend Specification (v1.0)

이 문서는 인스턴스 모니터링 대시보드의 UI/UX 디자인 및 프론트엔드 기술 규격을 정의합니다.

## 1. 디자인 컨셉: **"Oceanic Glassmorphism (Dark Mode)"**
- **시각적 목표**: 프리미엄 느낌의 다크 모드와 반투명 효과(Glassmorphism)를 활용하여 상태를 한눈에 파악할 수 있는 고성능 대시보드.
- **색상 팔레트**:
  - Background: Deep Navy (#0A0F1E)
  - Card: Semi-transparent Navy with Blur (rgba(16, 22, 40, 0.7))
  - Accent (Running): Neon Green (#00FFA3)
  - Accent (Stopped/Warning): Neon Red (#FF3D71)
  - Accent (Infrastructure): Cyber Blue (#00E5FF)
- **Typography**: Inter 또는 Outfit (Google Fonts)

## 2. 주요 컴포넌트 구조

### A. Infrastructure Health Overview
- **CPU/Memory/Disk Gauge**: 원형 또는 선형 게이지 바를 사용하여 사용률 시각화.
- **색상 동적 변경**: 80% 이상 시 색상을 Blue -> Orange -> Red로 그라데이션 변화.

### B. Service Status Grid
- **Container Cards**: 서비스별 상태(Running/Stopped)를 배지로 표시.
- **Uptime Trend**: 간단한 스파크라인(Sparkline)을 통해 최근 상태 변화 표시.

### C. Real-time Log Terminal [NEW]
- **Terminal UI**: 카드 하단에 고정된 터미널 창을 배치하여 실시간 로그 스트리밍 표시.
- **Auto-scroll**: 새로운 로그 유입 시 자동 스크롤(선택 가능).
- **Filtering**: 서비스별 로그 필터링 기능 제공.

### D. System Alert & Connectivity

## 3. 기술 스택
- **Framework**: Vite + React (고성능 SPA 및 빠른 개발 루프)
- **Styling**: Vanilla CSS (CSS Variables 및 Modern Flex/Grid 활용)
- **Visualization**: Recharts 또는 CSS 애니메이션 기반 게이지.
- **Icons**: Lucide-React (심플하고 세련된 아이콘 세트)

## 4. 데이터 페칭 전략
- **Polling**: 5~10초 간격으로 `GET /api/status` 호출.
- **Loading State**: 데이터 로드 시 Skeleton UI 또는 부드러운 페이드 인 효과 적용.
- **Error Handling**: API Key 오류 또는 네트워크 단절 시 명확한 피드백 제공.

---

## 5. UI Mockup (제안)
```text
+-------------------------------------------------------+
| [Status: Connected]          Instance Monitoring      |
+-------------------------------------------------------+
| Infrastructure                Services                |
| +----------+ +----------+     +---------------------+ |
| | CPU  45% | | MEM  62% |     | [Running] api-server| |
| +----------+ +----------+     | [Stopped] worker-01 | |
|                               +---------------------+ |
+-------------------------------------------------------+
| Last Updated: 2026-01-19 15:40:00                     |
+-------------------------------------------------------+
```
