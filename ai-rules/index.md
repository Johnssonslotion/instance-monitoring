# AI Rules Management Structure

## 개요
이 문서는 **AI Rules**(`ai-rules`)의 관리 구조, 우선순위, 변경 프로세스를 정의합니다.  
본 프로젝트의 모든 개발 및 연구 활동은 이 문서와 하위 규칙들을 최우선으로 준수해야 합니다.

## 1. 디렉터리 구조
```
ai-rules/
├── index.md            # 본 문서 (AI Rules 진입점)
├── core_principles.md  # 핵심 원칙 (변경 불가/엄격 관리)
├── personas.md         # 페르소나 정의 및 검토 프로세스
├── HISTORY.md          # 변경 이력 인덱스
├── changes/            # 상세 변경 문서
├── meeting_minutes/    # AI-Rules 전용 회의록
├── tasks/              # 작업별 가이드라인
│   ├── development.md  # 개발 워크플로우 규칙
│   └── research.md     # 연구 워크플로우 규칙
└── archives/           # 폐기된 규칙 보관
```

## 2. 규칙 우선순위 시스템
AI 에이전트는 규칙 충돌 시 다음 우선순위를 따릅니다:
1. **`ai-rules/index.md` & `core_principles.md`** (절대적 최우선)
2. `ai-rules/tasks/*.md` (구체적 작업 가이드)
3. 일반 프로젝트 문서 (`docs/governance.md` 등)
4. 코드 내 주석 및 관례

## 3. 관리 및 변경 프로세스
### 3.1 변경 권한
- **Core Principles**: 프로젝트 관리자 승인 + 전체 팀 회의 합의 필수.
- **Task Rules**: 해당 파트 리드 승인 필요.

### 3.2 변경 절차 (Strict Mode + Persona Review)
1. **제안**: 이슈 또는 회의에서 규칙 변경 제안.
2. **페르소나 검토**: 
   - 10년차+ 베테랑 페르소나 4명 이상 참여 (개발자, 연구원, 아키텍트, PM)
   - **교차 토론 3회** 진행 (독립 의견 → 반박/보완 → 최종 입장)
   - PM이 모든 의견을 종합하여 **최종 권고안** 작성
   - 상세 프로세스: [personas.md](personas.md) 참조
3. **회의록 작성**: 
   - `ai-rules/meeting_minutes/YYYYMMDD_topic.md` 에 합의 내용 기록
   - "합의된 변경" 섹션 및 페르소나 토론 요약 포함
4. **반영**: 
   - 규칙 파일 수정 (PR 제출)
   - `CHANGELOG.md` 및 `ai-rules/HISTORY.md`에 변경 사항 기록
   - `ai-rules/changes/` 에 상세 변경 문서 작성
5. **검증**: `pre-commit` 및 CI에서 규칙 파일 포맷 준수 여부 확인.

## 4. AI 에이전트 행동 지침
- 작업을 시작하기 전 반드시 `ai-rules/index.md`를 읽고 컨텍스트를 로드한다.
- 사용자의 지시가 규칙과 충돌할 경우, 규칙을 근거로 재확인을 요청한다.
- 모든 코드 생성 및 플랜 작성 시 `core_principles.md`를 위배하지 않는지 자가 점검한다.
