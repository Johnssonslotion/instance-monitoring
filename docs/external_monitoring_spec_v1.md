# External Monitoring Spec Sheet (v1.0)

이 문서는 OCI A1(Master)과 에지 노드(Status Bridge) 간의 통신/데이터 규격을 정의하는 **인터페이스 계약(Contract)**입니다.

## 1. 전송 계층 명세 (Connectivity)
| 항목 | 명세 | 비고 |
| :--- | :--- | :--- |
| **Protocol** | Tailscale VPN (Private Net) | 공인 IP 노출 차단 |
| **Endpoint** | `100.x.y.z` (A1 Tailnet IP) | DB 접속 주소 |
| **Main Port** | `5432` (PostgreSQL) | TimescaleDB 포트 |
| **Auth** | Database MD5/Scram Password | `DB_PASSWORD` 기반 |

## 2. 데이터 베이스 명세 (DB Schema Contract)
에지 노드 API는 다음 테이블에서 **Read-Only**로 데이터를 호출합니다.

### Table: `system_metrics`
| Column | Type | Description |
| :--- | :--- | :--- |
| **time** | `TIMESTAMPTZ` (UTC) | 측정 시간 |
| **type** | `TEXT` | `cpu`, `mem`, `disk`, `container_status` |
| **value** | `DOUBLE` | 측정 수치 (0.0 ~ 100.0 or 1.0/0.0) |
| **meta** | `JSONB` | 컨테이너 이름, 호스트명 등 부가 정보 |

## 3. 외부 API 명세 (API Contract)
에지 노드(Northflank)에서 Netlify로 제공되는 API 규격입니다.

### Endpoint: `GET /api/status`
- **Request Headers**:
  - `X-API-KEY`: `your-secret-key` (보안 인증)
- **Response Shape (JSON)**:
```json
{
  "infrastructure": {
    "cpu": 45.2,
    "memory": 62.1,
    "disk": 12.5,
    "last_updated": "2026-01-19T06:20:00Z"
  },
  "services": [
    {
      "name": "api-server",
      "status": "running",
      "uptime_val": 1,
      "last_seen": "2026-01-19T06:20:00Z"
    },
    ...
  ]
}
```

```

### 4. 실시간 소켓 명세 (WebSocket/Socket.io Contract) [NEW]
- **Endpoint**: `wss://your-bridge-url`
- **Authentication**: `auth: { token: "your-secret-key" }` (Handshake 시점에 검증)
- **Events**:
  - `metrics:update`: 최신 인프라 메트릭 자동 푸시 (5초 간격)
  - `logs:stream`: 시스템 및 컨테이너 로그 실시간 스트리밍
  ```json
  {
    "service": "api-server",
    "level": "info",
    "message": "GET /api/status 200",
    "timestamp": "2026-01-19T06:40:00Z"
  }
  ```

## 5. 보안 및 거버넌스 (Security)
- **CORS Restricted**: 지정된 Netlify 도메인 이외의 브라우저 접근 차단.
- **Failover Concept**: 에지 노드에서 A1으로의 연결이 10초 이상 타임아웃될 경우 UI에서 `A1 HOST UNREACHABLE` 경고 표시.
- **Versioning**: 스키마 변경 시 `master_roadmap.md`에 선행 공지 후 동기화 수행.
