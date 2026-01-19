# AI Rules (간결 버전 - LLM 최적화)

> **참조**: 상세 내용은 `/ai-rules/index.md`, `/ai-rules/core_principles.md` 참조

---

## 핵심 원칙 (Core Principles)

### 1. Document-First (문서 우선)
- 구현 전 문서화 필수
- 문서와 코드 불일치 시 문서가 진실

### 2. Explicit Approval (명시적 승인)
- 중요 변경 시 사용자 승인 필수
- 모호한 지시는 재확인 요청

### 3. Version Control & Traceability (형상 관리)
- 모든 변경은 Git + `CHANGELOG.md` 기록
- 회의 결정은 회의록 + 규칙 파일 반영

### 4. Stability & Quality (안정성)
- `main`/`develop` 브랜치는 항상 테스트 통과 상태 유지

- **예외**: 오픈소스 기여, 인프라 코드, 학술 출판물, 국제 협업

### 6. Env & Isolation (격리 및 환경)
- `.env.example` 필수, 외부 변수 문서화
- Docker/DevContainers 기반 환경 격리

### 7. Spec-First (설계 우선)
- 구현 전 상세 명세(Specification) 작성 및 승인 필수

### 8. Plan & Discuss (계획 및 논의)
- `ROADMAP.md`를 통한 분기별 목표 관리
- `docs/backlog/`를 통한 우선순위 기반 과업 관리
- 큰 변경 시 `docs/rfc/` 제안 및 합의 필수

### 9. Git & Workflow (작업 흐름)
- 문서(`docs/`)와 코드(`feat/`, `fix/`) 브랜치 엄격 분리
- **즉시 머지 금지**: 모든 변경은 PR 및 명시적 승인 필수

---

## 규칙 우선순위
1. `ai-rules/index.md` & `core_principles.md` (최우선)
2. `ai-rules/tasks/*.md` (작업별 가이드)
3. 일반 문서 (`docs/governance.md` 등)
4. 코드 주석

---

## AI 에이전트 행동 지침
- 작업 시작 전 `ai-rules/index.md` 읽기
- 사용자 지시와 규칙 충돌 시 재확인 요청
- `core_principles.md` 위배 여부 자가 점검

---

## AI-Rules 변경 프로세스
1. 제안 → 2. 페르소나 검토 (3라운드) → 3. 회의록 작성 → 4. 반영 → 5. 검증
- **페르소나**: 10년차+ 개발자, 연구원, 아키텍트, PM
- **회의록**: `ai-rules/meeting_minutes/YYYYMMDD_topic.md`
- **이력**: `ai-rules/HISTORY.md` + `ai-rules/changes/`
- **워크플로우**: `/update-ai-rules`

---

**최종 업데이트**: 2026-01-17 v1.4.0 (Git 전략 및 문서/코드 분리 추가)
