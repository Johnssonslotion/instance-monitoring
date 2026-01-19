# Environment Variables & Secrets Guide (Example)

이 문서는 프로젝트 운영에 필요한 모든 환경 변수와 Secret의 설정 예시를 다룹니다.

## 1. API Bridge 실무 예시 (`api-bridge/.env`)
이 설정은 Northflank 에지 노드에서 실행되는 서버의 기준이 됩니다.

```ini
# Database Connection (via Tailscale)
DB_HOST=100.64.0.1          # OCI A1의 Tailscaled IP (예시)
DB_PORT=5432
DB_USER=monitoring_user
DB_PASSWORD=your_secure_db_password_123
DB_NAME=instance_db

# API Security
API_PORT=3000
X_API_KEY=sk-bridge-proto-v1-abcde  # 프론트엔드와 공유할 비밀 키
ALLOWED_ORIGIN=https://my-monitoring.netlify.app

# Infrastructure (Northflank/Container)
TAILSCALE_AUTH_KEY=tskey-auth-kABCDE-1234567890abcdef # Tailscale 발급 키
```

## 2. Frontend 실무 예시 (`frontend/.env`)
Vite 프론트엔드에서 API 브릿지와 통신하기 위한 설정입니다.

```ini
# API Connectivity
VITE_API_BASE_URL=https://bridge-api.northflank.app
VITE_X_API_KEY=sk-bridge-proto-v1-abcde  # 브릿지 서버와 동일하게 설정
```

## 3. GitHub Secrets 등록 리스트 (CI/CD)
GitHub Actions를 통한 자동 배포 시 필요한 항목들입니다.

| Key | Value 예시 | 용도 |
| :--- | :--- | :--- |
| `NETLIFY_AUTH_TOKEN` | `nla_AbCdEf...` | Netlify 배포 권한 |
| `NETLIFY_SITE_ID` | `1a2b3c4d-5e6f...` | 대상 사이트 ID |
| `NORTHFLANK_API_TOKEN` | `nf_token_...` | Northflank API 권한 |
| `NORTHFLANK_PROJECT_ID` | `p-12345` | 프로젝트 고유 ID |
| `NORTHFLANK_SERVICE_ID` | `s-67890` | 서비스 고유 ID |

---
> [!TIP]
> 모든 `AUTH_KEY`나 `PASSWORD`는 실제 운영 시 주기적으로 갱신하고, 절대 Git 저장소에 커밋하지 마세요.
