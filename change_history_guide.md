# Change History Guide

## 목적
이 문서는 프로젝트의 **변경 이력 관리 프로세스**를 정의합니다. 모든 코드 변경, 실험 결과, 회의 합의 내용은 이 가이드에 따라 기록되고, `CHANGELOG.md`와 Git 히스토리에 반영됩니다.

## 1. CHANGELOG 작성 규칙
- **형식**: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) 를 따릅니다.
- **버전**: Semantic Versioning (MAJOR.MINOR.PATCH) 적용.
- **섹션**: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security` 로 구분.
- **작성 시점**: PR 머지 전, `Unreleased` 섹션에 임시 기록 후, 릴리즈 시 버전 섹션으로 이동.

## 2. 회의록 기록 및 연동
- 회의가 끝난 뒤 `docs/meeting_minutes/` 폴더에 `YYYYMMDD_topic.md` 로 저장.
- 회의록에 **합의된 변경** 항목을 `### 합의된 변경` 섹션에 명시.
- CI 파이프라인에서 `meeting_minutes` 파일이 변경되면 자동으로 `CHANGELOG.md`의 `Unreleased` 섹션에 해당 항목을 추가하도록 스크립트를 실행합니다.

## 3. 버전 태깅 및 릴리즈 노트 자동화
- `git tag -a v<MAJOR>.<MINOR>.<PATCH> -m "Release <버전>"` 로 태그 생성.
- 태그 푸시 시 GitHub Actions(또는 Google Cloud Build)에서 자동으로 `CHANGELOG.md`의 해당 버전 섹션을 릴리즈 노트로 사용합니다.

## 4. CI 검증
- PR 검증 단계에서 `ci/check_changelog.sh` 스크립트가 실행되어:
  1. `CHANGELOG.md`에 `Unreleased` 섹션이 비어 있지 않은지 확인
  2. 변경된 파일 목록과 `CHANGELOG.md`에 기록된 항목이 일치하는지 검사
- 위 검증을 통과하지 못하면 PR이 병합되지 않습니다.

## 5. 보호 브랜치 및 리뷰 정책
- `main`(또는 `master`) 브랜치는 **보호** 설정: 직접 푸시 금지, 최소 2명의 리뷰어 승인 필요.
- `develop` 브랜치도 동일하게 보호하고, CI 통과 후에만 병합 허용.

## 6. 참고 자료
- [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
- [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html)
- 프로젝트 내부 `ci/` 디렉터리의 스크립트 예시
