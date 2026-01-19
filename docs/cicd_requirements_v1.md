# CI/CD Implementation Requirements (v1.0)

이 문서는 프론트엔드(Netlify) 및 컨테이너(Northflank) 자동 배포를 위한 CI/CD 환경의 최소 요구 사항을 정의합니다.

## 1. 공통 인프라 (GitHub Actions)
- **Secrets 관리**: 모든 민감한 정보는 GitHub Repository Secrets에 안전하게 저장되어야 합니다.
- **Branch Strategy**: `main` 브랜치 머지 시 배포가 트리거되도록 설정합니다.

## 2. 프론트엔드 (Netlify) 요구 사항
- **필수 Secrets**:
  - `NETLIFY_AUTH_TOKEN`: Netlify API 접근 토큰
  - `NETLIFY_SITE_ID`: 배포 대상 사이트 ID
- **설정 파일**:
  - `netlify.toml`: 빌드 명령 및 배포 디렉터리 설정

## 3. API 브릿지 (Northflank) 요구 사항
- **Dockerfile**: `api-bridge/` 내에 Node.js 런타임을 포함한 경량화된 Docker 이미지 빌드 파일 필요.
- **필수 Secrets**:
  - `NORTHFLANK_API_TOKEN`: Northflank API 접근 토큰
  - `NORTHFLANK_PROJECT_ID`: 대상 프로젝트 ID
  - `NORTHFLANK_SERVICE_ID`: 대상 서비스 ID
- **환경 변수 주입**: 배포 단계에서 `DB_HOST`, `DB_PASSWORD`, `X_API_KEY` 등이 환경 변수로 주입되어야 합니다.

## 4. 보안 및 최적화
- **.dockerignore**: 빌드 시 불필요한 파일(`node_modules`, `.env` 등)이 포함되지 않도록 설정.
- **경량 이미지**: `node:alpine` 또는 `node:slim` 이미지를 사용하여 빌드 및 배포 속도 최적화.

---

## 다음 단계 (Implementation Plan)
1. `api-bridge/Dockerfile` 및 `.dockerignore` 생성
2. `.github/workflows/` 디렉터리 생성 및 워크플로우 YAML 작성
3. 사용자에게 필수 Secrets 등록 요청
