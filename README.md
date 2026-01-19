# Vibe Project Template

프로젝트 시작을 위한 체계적인 관리 구조를 갖춘 템플릿입니다.

## 개요

이 템플릿은 개발 및 연구 프로젝트를 위한 **문서 우선(Document-First)** 접근 방식을 제공합니다.  
AI 에이전트와 협업하며, 페르소나 기반 검토 프로세스를 통해 프로젝트 규칙을 관리합니다.

## 주요 기능

### 1. AI Rules 관리 시스템
- **핵심 원칙**: Document-First, Explicit Approval, Version Control, Korean Language
- **페르소나 기반 검토**: 10년차+ 베테랑 4명 (개발자, 연구원, 아키텍트, PM)
- **3라운드 교차 토론**: 독립 의견 → 반박/보완 → 최종 입장
- **변경 이력 관리**: `ai-rules/HISTORY.md` + `ai-rules/changes/`

### 2. 변경 이력 추적
- **CHANGELOG**: 영어 메인 + 한글 병기 (LLM 토큰 효율)
- **회의록 관리**: `ai-rules/meeting_minutes/` (AI-rules 전용)
- **Git 기반 형상 관리**: 모든 변경 사항 추적 가능

### 3. 워크플로우 자동화
- `/update-ai-rules`: AI-rules 변경 프로세스 자동화
- `init_repo.sh`: 저장소 초기화 및 보호 브랜치 설정
- Pre-commit 훅: `.agent/rules/ai-rules.md` 자동 동기화

## 디렉터리 구조

```
vibe-project-template/
├── ai-rules/              # AI 에이전트 규칙 관리
│   ├── index.md           # AI Rules 진입점
│   ├── core_principles.md # 핵심 원칙
│   ├── personas.md        # 페르소나 정의
│   ├── HISTORY.md         # 변경 이력 인덱스
│   ├── changes/           # 상세 변경 문서
│   ├── meeting_minutes/   # AI-rules 전용 회의록
│   └── tasks/             # 작업별 가이드라인
├── docs/
│   └── meeting_minutes/   # 일반 프로젝트 회의록
├── .agent/
│   ├── rules/
│   │   └── ai-rules.md    # LLM 최적화 버전 (12000자 이하)
│   └── workflows/
│       └── update-ai-rules.md
├── CHANGELOG.md           # 프로젝트 변경 이력 (영어 + 한글)
├── change_history_guide.md # 변경 관리 프로세스
└── init_repo.sh           # 저장소 초기화 스크립트
```

## 사용 방법

### 1. 템플릿으로 신규 프로젝트 시작

```bash
# 이 저장소를 포크하거나 템플릿으로 사용
git clone git@github.com:Johnssonslotion/vibe-project-templete.git my-new-project
cd my-new-project

# 저장소 초기화 (선택사항)
chmod +x init_repo.sh
./init_repo.sh
```

### 2. AI-Rules 확인

```bash
# IDE가 읽는 간결 버전
cat .agent/rules/ai-rules.md

# 전체 상세 내용
cat ai-rules/index.md
cat ai-rules/core_principles.md
```

### 3. AI-Rules 변경

템플릿에 포함된 `/update-ai-rules` 워크플로우를 사용:
1. 변경 제안
2. 페르소나 검토 (3라운드)
3. 회의록 작성
4. 파일 수정 및 이력 업데이트

## 핵심 원칙

### 1. Document-First (문서 우선)
코드 작성 전 문서화 필수. 문서가 진실(Truth).

### 2. Explicit Approval (명시적 승인)
중요 변경 시 사용자 승인 필수.

### 3. Version Control & Traceability (형상 관리)
모든 변경은 Git + CHANGELOG 기록.

### 4. Stability & Quality (안정성)
main/develop 브랜치는 항상 테스트 통과 상태 유지.

### 5. Korean Language (한글 기본)
- 모든 문서는 한글 작성 (기본)
- CHANGELOG는 영어 메인 + 한글 병기 (LLM 효율)
- 예외: 오픈소스, 인프라 코드, 학술 출판물, 국제 협업

## 라이선스

MIT License (템플릿을 자유롭게 사용하세요)

## 기여

이 템플릿에 개선 사항이 있다면 PR을 환영합니다!

---

**버전**: v1.1.0  
**최종 업데이트**: 2026-01-17  
**주요 변경**: Korean Language 원칙 및 CHANGELOG 이중 언어 전략 추가
