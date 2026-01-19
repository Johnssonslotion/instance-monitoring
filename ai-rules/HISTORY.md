# AI Rules Change History (Index)

이 문서는 AI Rules 변경의 **요약 이력**을 관리합니다.  
상세 변경 내용은 `ai-rules/changes/` 디렉터리를 참고하세요.

---

## [v1.4.0] - 2026-01-17
**변경 주체**: Git 전략 강화 및 문서/코드 분리  
**승인자**: 사용자  
**회의록**: [20260117_git_strategy_v1.4.0.md](meeting_minutes/20260117_git_strategy_v1.4.0.md)

### 변경 내용
- Git 브랜치 전략 수립 (문서 `docs/` vs 코드 `feat/` 등 격리)
- 즉시 머지 금지 원칙 도입 (PR 및 승인 프로세스 의무화)
- 문서 발전 전략을 독립된 백로그 과업으로 정의

### 상세 문서
- [변경 상세: v1.4.0](changes/20260117_v1.4.0_git_strategy_update.md)

---

## [v1.3.0] - 2026-01-17
**변경 주체**: 관리 전략 고도화 (Backlog, Roadmap, RFC)  
**승인자**: 사용자  
**회의록**: [20260117_management_v1.3.0.md](meeting_minutes/20260117_management_v1.3.0.md)

### 변경 내용
- 프로젝트 로드맵 운영 원칙 수립 (`ROADMAP.md`)
- 백로그 관리 전략 정립 (`docs/backlog/` 및 이슈 관리)
- RFC (Request for Comments) 프로세스 도입 (`docs/rfc/`)

### 상세 문서
- [변경 상세: v1.3.0](changes/20260117_v1.3.0_management_update.md)

---

## [v1.2.0] - 2026-01-17
**변경 주체**: 거버넌스 고도화 제안 (환경변수, 컨테이너, Spec-First)  
**승인자**: 사용자  
**회의록**: [20260117_governance_v1.2.0.md](meeting_minutes/20260117_governance_v1.2.0.md)

### 변경 내용
- 환경변수 관리 원칙 수립 (`.env.example` 필수화, 시크릿 보안 강화)
- 컨테이너 전략 도입 (Docker/DevContainers를 통한 환경 격리)
- Spec-First 프로세스 의무화 (구현 전 명세 승인 필수)

### 상세 문서
- [변경 상세: v1.2.0](changes/20260117_v1.2.0_governance_update.md)

---

## [v1.1.0] - 2026-01-17
**변경 주체**: AI-Rules 페르소나 검토 프로세스  
**승인자**: 사용자  
**회의록**: [20260117_korean_language.md](meeting_minutes/20260117_korean_language.md)

### 변경 내용
- Korean Language (한글 기본) 원칙 추가
- 모든 프로젝트 문서는 한글로 작성 기본
- CHANGELOG는 영어 메인 + 한글 병기 (LLM 토큰 효율 및 사용자 편의)
- 예외 조항 명시: 오픈소스, 인프라 코드, 학술 출판물, 국제 협업

### 상세 문서
- [변경 상세: v1.1.0](changes/20260117_v1.1.0_korean_language.md)

---

## [v1.0.0] - 2026-01-17
**변경 주체**: 프로젝트 초기 설정  
**승인자**: 사용자  
**회의록**: [20260117_initial_setup.md](../docs/meeting_minutes/20260117_initial_setup.md)

### 변경 내용
- AI Rules 관리 구조 수립 (`index.md`, `core_principles.md`)
- Document-First, Explicit Approval, Version Control 원칙 정의
- `.agent/rules/ai-rules.md` 자동 동기화 메커니즘 구현

### 상세 문서
- [변경 상세: v1.0.0](changes/20260117_v1.0.0_initial_setup.md)

---

## 변경 이력 작성 규칙
1. 각 변경은 **버전 번호**(Semantic Versioning), **날짜**, **변경 주체**, **승인자**를 명시
2. **회의록 링크** 필수 (합의 근거)
3. 상세 변경 문서는 `ai-rules/changes/YYYYMMDD_vX.Y.Z_description.md` 형식으로 작성
