---
description: 타겟 DB로부터 스키마를 추출하여 docs/schema.sql과 동기화하는 워크플로우
---

# DB 스키마 동기화 워크플로우

이 워크플로우는 OCI A1(Master) 데이터베이스의 실제 스키마를 추출하여 프로젝트의 기준 문서인 `docs/schema.sql`과 동기화할 때 사용됩니다.

## 정책 배경 (Document-First)
- **문서 우선 원칙**: `docs/schema.sql`은 데이터베이스 구조의 "단일 진실 공급원(Single Source of Truth)"입니다.
- **동기화 필요성**: 런타임 데이터베이스에 변경 사항이 발생한 경우, 이를 즉시 문서에 반영하여 코드와 데이터베이스, 문서 간의 일치성을 유지해야 합니다.

---

## 단계별 프로세스

### 1. 연결 확인 (Connectivity)
- **Tailscale 확인**: 대상 DB(`100.x.y.z`)에 접근 가능한 상태인지 확인합니다.
- **환경 변수 확인**: `api-bridge/.env`에 올바른 DB 접속 정보가 설정되어 있는지 확인합니다.

### 2. 스키마 추출 (Schema Extraction)
- `pg_dump` 도구를 사용하여 스키마만 추출합니다.
- **명령 예시**:
```bash
pg_dump -h 100.x.y.z -U postgres -s -t system_metrics > docs/schema_current.sql
```
- *참고*: TimescaleDB 관련 메타데이터나 특정 인덱스 설정이 포함되도록 옵션을 조정할 수 있습니다.

### 3. 비교 및 업데이트 (Compare & Update)
- 추출된 `docs/schema_current.sql`과 기존 `docs/schema.sql`을 비교합니다.
- 변경 사항이 있는 경우, `docs/schema.sql`을 업데이트합니다.
- **규칙**: 인덱스 명명 규칙, TimescaleDB 하이퍼테이블 설정 등이 프로젝트 표준을 따르는지 확인합니다.

### 4. 변경 이력 기록
- **CHANGELOG.md**: `Unreleased` 섹션에 스키마 변경 또는 동기화 이력을 기록합니다.
  ```markdown
  ### Changed
  - [db] Synchronized system_metrics schema from master DB ([db] 마스터 DB로부터 system_metrics 스키마 동기화)
  ```

### 5. 관련 코드 검토
- 스키마 변경이 `api-bridge/server.js`의 쿼리 로직에 영향을 주는지 검토합니다.
- 필요한 경우 API 코드 및 테스트 코드를 함께 수정합니다.

---

## 체크리스트
- [ ] Tailscale VPN 연결 확인
- [ ] DB 접속 권한 확인
- [ ] 스키마 추출 및 비교
- [ ] docs/schema.sql 업데이트
- [ ] CHANGELOG.md 기록 및 PR 생성
