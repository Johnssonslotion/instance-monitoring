# AI-Rules 회의록: 관리 전략 고도화 (Backlog, Roadmap, RFC)

**일시**: 2026-01-17  
**참석자**: [페르소나 기반 검토] Senior Software Engineer, Research Lead, System Architect, Project Manager  
**주제**: 백로그, 로드맵, RFC 관리 프로세스 도입

---

## 1. 변경 제안 요약

### 변경 동기 (Why)
프로젝트의 장기적인 방향성을 가시화하고, 복잡한 의사결정 과정을 문서화하여 추적성을 높이기 위함. 단순한 구현을 넘어 운영과 기획의 전문성을 강화함.

### 변경 내용 (What)
1. **Backlog 전략**: 관리 대상 과업을 중앙화하고 우선순위 설정 기준(Impact vs Effort)을 명확히 함.
2. **Roadmap**: 프로젝트의 주요 마일스톤과 분기별 목표를 `ROADMAP.md`에 유지 관리함.
3. **RFC (Request for Comments)**: 주요 아키텍처 변경, 새로운 기술 스택 도입, 또는 파괴적 변경(Breaking Changes) 전 의견 수렴 프로세스를 정립함.

### 예상 영향 (Impact)
- **긍정**: 팀 내 비전 정렬, 기술적 부채 예방, 의사결정 근거의 투명화.
- **부정**: 문서를 위한 문서가 되지 않도록 프로세스 경량화 필요.

---

## 2. 페르소나 검토 (3라운드)

### 라운드 1: 독립 의견

#### Senior Software Engineer (시니어 개발자)
**입장**: 찬성  
**의견**:
- RFC는 개발자 간의 기술적 합의를 이끌어내는 데 매우 효과적임. 코드를 쓰기 전에 "왜 이 방식인가"를 토론하는 문화가 필요함.
- 백로그는 너무 세분화되면 관리 비용이 크므로, 큰 단위(Epic/Feature) 위주로 명시하자.

#### Research Lead (연구 리드)
**입장**: 찬성  
**의견**:
- 로드맵에 "연구 탐색 기간"이 명시되면 제품 출시 일정과의 충돌을 예방할 수 있음.
- RFC는 연구 방법론의 타당성을 검토받는 용도로도 활용 가능할 것임.

#### System Architect (시스템 아키텍트)
**입장**: 강력 찬성  
**의견**:
- RFC 없이 진행되는 아키텍처 변경은 나중에 큰 기술 부채로 돌아옴. 영향도가 큰 변경에 대해 RFC 작성을 의무화해야 함.
- 로드맵에는 기술적 고도화(Refactoring, Infra upgrade) 항목도 반드시 포함되어야 함.

#### Project Manager (프로젝트 매니저)
**입장**: 강력 찬성  
**의견**:
- 로드맵은 스테이크홀더와의 소통 창구임. 백로그는 우선순위(P0~P3)와 상태(To-do, In-progress, Done)가 명확히 관리되어야 함.

---

### 라운드 2: 반박 및 보완

#### Senior Software Engineer
- RFC를 작성해야 하는 기준(Threshold)을 정하자. 모든 작은 함수 변경에 RFC를 요구하면 생산성이 저하됨. 
- **보안**: "데이터 스키마 변경, 신규 라이브러리 도입, API 인터페이스 변경" 시 RFC 필수.

#### Research Lead
- 백로그에 "실패한 실험"에 대한 아카이브 기록도 포함하면 좋겠음. 다음 연구 시 중복 시도를 막을 수 있음.

#### System Architect
- 백로그는 `docs/backlog/` 하위에 Markdown으로 기록하거나 GitHub Issues를 적극 활용하자. 템플릿화가 중요함.

#### Project Manager
- 로드맵은 분기별(Quarterly)로 업데이트하고, 매달 진행 상황을 점검하는 루틴을 거버넌스에 넣자.

---

### 라운드 3: 최종 입장 및 타협안

#### Senior Software Engineer
**최종 입장**: 찬성  
- RFC 템플릿(Motivation, Design, Drawbacks) 제공.

#### Research Lead
**최종 입장**: 찬성  
- 로드맵에 실험 일정을 유연하게 배치(Window-based)하는 데 동의.

#### System Architect
**최종 입장**: 찬성  
- RFC 승인 후 Spec 작성으로 이어지는 흐름(RFC -> Spec -> Impl) 확립.

#### Project Manager
**최종 입장**: 찬성  
- 백로그 우선순위 산정 시 "비즈니스 가치" 외에 "기술적 중요도" 가중치 부여 합의.

---

## 3. PM 최종 보고서

### 합의 사항
- **ROADMAP.md**: 루트 디렉터리에 상주. 비전과 마일스톤 기록.
- **RFC**: `docs/rfc/` 하위에 작성. 영향도가 큰 변경 시 필수. 
- **Backlog**: `docs/backlog/` 하위 또는 프로젝트 이슈 관리 도구 활용. 우선순위와 상태를 명확히 함.
- **프로세스**: RFC(제안 및 토론) -> Spec(상세 설계) -> Implementation(구현).

### 최종 권고
**권고안**: 승인  
**근거**: 프로젝트의 지속 가능성과 품질 관리를 위해 전문적인 계획 및 설계 프로세스가 필수적임.

---

## 4. 합의된 변경 (System Update)

- `ai-rules/core_principles.md` 업데이트:
  - **8. Plan & Discuss (계획 및 논의)**: 로드맵, 백로그, RFC 운영 원칙 추가.
- 버전: v1.3.0
- 적용 범위: 프로젝트 전체 운영 및 아키텍쳐 변경.

---

## 5. 향후 조치 사항 (Action Items)

- [ ] `core_principles.md` (v1.3.0) 수정
- [ ] `ROADMAP.md` 파일 생성 (초안)
- [ ] `docs/rfc/`, `docs/backlog/` 디렉터리 생성 및 템플릿 비치
- [ ] `.agent/rules/ai-rules.md` 요약본 업데이트
- [ ] CHANGELOG.md 반영
