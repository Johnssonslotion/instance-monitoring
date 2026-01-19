# API Bridge (Status Bridge)

이 컴포넌트는 OCI A1(Master)의 TimescaleDB와 Netlify 프론트엔드 사이의 인터페이스 역할을 하는 에지 노드 API 서버입니다.

## 주요 기능
- **Tailscale VPN 접속**: 사설망 내의 A1 데이터베이스에 안전하게 접근합니다.
- **데이터 통합**: 인프라 메트릭(CPU, Mem, Disk)과 컨테이너 상태를 통합하여 JSON으로 제공합니다.
- **보안**: `X-API-KEY` 인증 및 CORS 제한을 적용합니다.

## 실행 방법
1. `.env.example`을 `.env`로 복사하고 환경 변수를 설정합니다.
2. 종속성을 설치합니다: `npm install`
3. 서버를 실행합니다: `npm start` (개발 모드: `npm run dev`)

## API 명세
### `GET /api/status`
- **Headers**: `X-API-KEY` (필수)
- **Response**: `external_monitoring_spec_v1.md` 참조
