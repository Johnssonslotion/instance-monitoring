# Local Testing Guide (Docker Compose)

이 문서는 로컬 환경에서 전체 모니터링 파이프라인(DB + API)을 시뮬레이션하고 테스트하는 방법을 안내합니다.

## 전제 조건
- Docker 및 Docker Compose 설치

## 1. 테스트 환경 실행
다음 명령어로 TimescaleDB(Mock Master)와 API Bridge를 실행합니다.

```bash
docker-compose up --build -d
```
- **DB**: `localhost:5435` (Mock Master - TimescaleDB)
- **API**: `localhost:3000` (Node.js Server)

## 2. 테스트 데이터 생성
테스트를 위해 가상의 메트릭을 DB에 삽입합니다.

```bash
docker-compose exec timescaledb psql -U postgres -d postgres -c "
INSERT INTO system_metrics (time, type, value, meta) VALUES
 (NOW(), 'cpu', 45.5, '{\"host\": \"a1-master\"}'),
 (NOW(), 'mem', 60.2, '{\"host\": \"a1-master\"}'),
 (NOW(), 'container_status', 1, '{\"container_name\": \"api-server\"}'),
 (NOW(), 'container_status', 0, '{\"container_name\": \"worker-01\"}');
"
```

## 3. API 호출 테스트
API가 정상적으로 데이터를 반환하는지 확인합니다.

```bash
# 정상 요청
curl -H "X-API-KEY: local-test-key" http://localhost:3000/api/status

# 인증 실패 테스트
curl http://localhost:3000/api/status
```

## 4. 종료 및 정리
```bash
docker-compose down -v
```
