# Meeting Minutes: Project Initialization & AI Rules Setup

**일시**: 2026-01-17  
**참석자**: 사용자, AI Assistant

## 1. 개요
프로젝트 시작을 위한 기본 거버넌스, 버전 관리 방식, 그리고 AI 규칙 관리 구조에 대한 협의를 진행.

## 2. 주요 논의 안건
1. **버전 관리 플랫폼**: Google 플랫폼을 사용하기로 확정.
2. **프로젝트 관리 기준**: 문서 중심(Document-First) 접근 방식 채택. 구현보다 기준 문서 작성을 우선함.
3. **AI Rules 구조화**: `ai-rules` 디렉터리를 생성하여 AI 에이전트가 최우선으로 준수해야 할 규칙을 시스템화.
4. **변경 이력 관리**: Git을 통한 형상 관리 및 `CHANGELOG.md` 작성 프로세스 확립.

## 3. 합의된 결정 사항
1. **저장소 초기화**: 
   - Root: 프로젝트 루트 디렉터리
   - Git 초기화 및 `develop` 브랜치 생성, 보호 정책 적용 스크립트(`init_repo.sh`) 실행.
2. **AI Rules 우선순위 설정**:
   - `ai-rules/index.md`를 프로젝트 관리의 최상위 기준 문서로 설정.
   - 모든 연구/개발 워크플로우는 이 곳에 링크된 규칙을 따른다.
3. **거버넌스 문서 체계**:
   - `CHANGELOG.md`: 변경 이력 기록.
   - `change_history_guide.md`: 변경 관리 프로세스 정의.
   - `ai-rules/*`: AI 행동 지침 및 코어 원칙.

## 4. 향후 계획 (Action Items)
- [x] `init_repo.sh` 작성 및 실행 (완료)
- [x] `CHANGELOG.md` 및 가이드 작성 (완료)
- [x] `ai-rules` 구조 정의 문서 작성 (완료)
- [ ] Development/Research 상세 워크플로우 (`ai-rules/tasks/`) 작성
- [ ] Google Remote Repository 연결 (사용자 진행 필요)

### 합의된 변경 (System Update)
- `ai-rules/index.md` 생성 및 최우선 순위 지정.
- `ai-rules` 디렉터리 내에서 모든 거버넌스 규칙 관리.
- **[New] 심볼릭 링크 대신 복사본 동기화 적용**:
  - IDE 호환성 문제(심링크 끊김)를 방지하기 위해 `ai-rules/index.md`를 `.agent/rules/ai-rules.md`로 **자동 복사**하는 방식 채택.
  - `pre-commit` 훅이 `ai-rules/index.md` 변경 시 자동으로 `.agent/rules/ai-rules.md`를 업데이트하고 커밋에 포함.
- **[New] 페르소나 기반 검토 프로세스 도입**:
  - AI-rules 변경 시 10년차+ 베테랑 페르소나 4명 이상 참여 (개발자, 연구원, 아키텍트, PM)
  - 교차 토론 3회 진행 (독립 의견 → 반박/보완 → 최종 입장)
  - PM이 최종 권고안 작성 및 보고
  - 변경 이력은 `HISTORY.md`(인덱스) + `changes/`(상세)로 분리 관리
