---
description: AI Rules 변경 워크플로우 (페르소나 검토 포함)
---

# AI Rules 변경 워크플로우

이 워크플로우는 `ai-rules/` 내 규칙 변경 시 사용됩니다.  
슬래시 커맨드: `/update-ai-rules`

---

## 단계별 프로세스

### 1. 변경 제안 확인 및 문서화
- 사용자로부터 변경 동기(Why), 내용(What), 예상 영향(Impact)을 확인합니다.
- 변경 대상 파일을 명확히 합니다 (`index.md`, `core_principles.md`, `tasks/*.md` 등).

### 2. 페르소나 기반 검토 시작
**참여 페르소나** (ai-rules/personas.md 참조):
- Senior Software Engineer (시니어 개발자)
- Research Lead (연구 리드)
- System Architect (시스템 아키텍트)
- Project Manager (프로젝트 매니저)

**프로세스**:
1. **라운드 1**: 각 페르소나가 독립적으로 의견 제시 (찬성/반대/조건부 찬성)
2. **라운드 2**: 타 페르소나 의견을 검토 후 반박 또는 보완 의견 제시
3. **라운드 3**: 최종 입장 정리 및 타협안 도출

**중요**: 각 라운드의 모든 페르소나 의견을 빠짐없이 기록합니다.

### 3. PM 최종 보고서 작성
- 4명의 페르소나 의견을 종합합니다.
- **합의 사항**, **보류/반대 사항**, **리스크 및 완화책**을 정리합니다.
- 최종 권고안(승인/조건부 승인/반대)을 제시합니다.

### 4. AI-Rules 전용 회의록 작성
**위치**: `ai-rules/meeting_minutes/YYYYMMDD_topic.md`

**필수 포함 사항**:
- 변경 제안 요약 (Why, What, Impact)
- **페르소나 토론 3라운드 전체 기록**:
  - 라운드 1: 각 페르소나 초기 의견
  - 라운드 2: 반박 및 보완 의견
  - 라운드 3: 최종 입장 및 타협안
- PM 최종 보고서
- 합의된 변경 사항 (System Update 섹션)
- 향후 조치 사항 (Action Items)

**회의록 템플릿**: `ai-rules/meeting_minutes/template.md` 참조 (이 워크플로우 실행 시 생성)

### 5. AI-Rules 파일 수정
- 합의된 내용을 바탕으로 해당 ai-rules 파일을 수정합니다.
- 변경 시 버전 번호를 결정합니다 (Semantic Versioning):
  - MAJOR: core_principles.md 변경
  - MINOR: index.md 또는 tasks/*.md 주요 변경
  - PATCH: 오타 수정, 문구 개선

### 6. 변경 이력 문서 작성
**HISTORY.md 업데이트**:
- 새 버전 섹션 추가 (버전, 날짜, 변경 주체, 승인자, 회의록 링크)

**상세 문서 작성** (`ai-rules/changes/YYYYMMDD_vX.Y.Z_description.md`):
- 변경 동기, 내용, 영향 범위, 검증 방법 포함
- 페르소나 토론 요약 및 PM 보고서 링크

### 7. CHANGELOG.md 업데이트
- `Unreleased` 섹션에 ai-rules 변경 항목 추가:
  ```markdown
  ### Changed
  - [AI-Rules vX.Y.Z] Added Korean language requirement ([AI-규칙 vX.Y.Z] 한글 기본 원칙 추가)
  ```
- **형식**: 영어를 먼저 작성하고 괄호 안에 한글 번역 추가
- LLM 토큰 효율성을 위해 영어 메인 공간 사용

### 8. .agent/rules/ai-rules.md 동기화
**자동 생성 (권장)**:
`.agent/rules/ai-rules.md`는 LLM이 빠르게 읽을 수 있도록 `index.md` + `core_principles.md`의 **간결한 요약본**입니다.

AI-rules 변경 시 아래 명령으로 재생성:
```bash
# 수동으로 .agent/rules/ai-rules.md 편집하거나
# 다음 템플릿을 따라 index.md + core_principles.md 핵심 내용 통합
vi .agent/rules/ai-rules.md
```

**포함 내용**:
- Core Principles 전체 (간결 버전)
- 규칙 우선순위 시스템
- AI 에이전트 행동 지침
- AI-Rules 변경 프로세스 요약
- 참조 링크: `/ai-rules/index.md`, `/ai-rules/core_principles.md`

**중요 제약사항**:
- **12000자 이하 유지 필수** (LLM 토큰 효율성)
- 상세 내용은 참조 링크로 연결
- 핵심만 간결하게 요약
- 파일 크기 초과 시 불필요한 설명 제거 또는 참조 링크로 대체

**검증**:
```bash
# 파일 크기 확인 (12000자 이하 확인)
wc -m .agent/rules/ai-rules.md
```

**중요**: `core_principles.md` 변경 시 반드시 `.agent/rules/ai-rules.md`도 업데이트해야 합니다.

### 9. PR 생성 및 검증
- 변경 사항을 브랜치에 커밋하고 PR을 생성합니다.
- PR에 회의록 링크와 HISTORY.md 링크를 포함합니다.
- CI 검증 통과 확인 (pre-commit, lint 등).

### 10. 사용자 최종 승인 및 머지
- 사용자에게 PM 보고서와 회의록을 제시하고 승인을 요청합니다.
- 승인 후 PR을 머지합니다.

---

## 체크리스트
복사하여 사용하세요:

```markdown
- [ ] 변경 제안 확인 (Why, What, Impact)
- [ ] 페르소나 4명 라운드 1 의견 수집
- [ ] 페르소나 4명 라운드 2 의견 수집
- [ ] 페르소나 4명 라운드 3 의견 수집
- [ ] PM 최종 보고서 작성
- [ ] AI-Rules 전용 회의록 작성 (ai-rules/meeting_minutes/)
- [ ] AI-Rules 파일 수정 및 버전 결정
- [ ] HISTORY.md 업데이트
- [ ] ai-rules/changes/ 상세 문서 작성
- [ ] CHANGELOG.md 업데이트
- [ ] .agent/rules/ai-rules.md 동기화
- [ ] PR 생성 및 CI 검증
- [ ] 사용자 승인 및 머지
```

---

## 참고 문서
- [AI-Rules Index](../ai-rules/index.md)
- [Personas 정의](../ai-rules/personas.md)
- [Core Principles](../ai-rules/core_principles.md)
- [HISTORY](../ai-rules/HISTORY.md)
