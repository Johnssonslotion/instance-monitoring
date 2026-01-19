# CHANGELOG.md

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added
- [feat] External Monitoring Spec (v1.0) and implementation plan ([feat] 외부 모니터링 명세(v1.0) 및 구현 계획 수립)
- [feat] Initial implementation of API Bridge (Status Bridge) ([feat] API 브릿지 초기 구현)
  - `docs/schema.sql`: TimescaleDB schema for system metrics
  - `api-bridge/server.js`: Node.js Express server for data bridging
  - `api-bridge/.env.example`: Environment configuration template
- [workflow] Added Database Schema Sync Workflow ([workflow] DB 스키마 동기화 워크플로우 추가)
  - `.agent/workflows/sync-db-schema.md`
- [feat] Implemented Communication Layer & CI/CD ([feat] 통신 레이어 및 CI/CD 구현)
  - `api-bridge/Dockerfile`: Multi-stage build with Tailscale integration
  - `api-bridge/start.sh`: Container entrypoint with VPN auto-join
  - `.github/workflows/deploy.yml`: Automated deployment to Northflank/Netlify
- [feat] Implemented Frontend Dashboard (Vite + React) ([feat] 프론트엔드 대시보드 구현)
  - `frontend/`: React app with 'Oceanic Glassmorphism' dark mode UI
  - Real-time Log Terminal & Metric Gauges via Socket.io

### Changed
- [AI-Rules v1.4.0] Strengthened Git strategy with Doc/Code separation and no-immediate-merge policy ([AI-규칙 v1.4.0] 문서/코드 분리 및 즉시 머지 금지 정책을 통한 Git 전략 강화)
  - Strict branch naming: `docs/`, `feat/`, `fix/`, `research/` ([브랜치 네이밍 강제: docs, feat, fix, research])
  - Immediate merge prohibited; PR and explicit approval required ([즉시 머지 금지; PR 및 명시적 승인 필수])
  - Document Evolution Strategy defined as a separate backlog ticket ([문서 발전 전략을 독립된 백로그 티켓으로 정의])
  - Meeting: [20260117_git_strategy_v1.4.0.md](ai-rules/meeting_minutes/20260117_git_strategy_v1.4.0.md)
- [AI-Rules v1.3.0] Introduced Backlog, Roadmap, and RFC management strategies ([AI-규칙 v1.3.0] 백로그, 로드맵, RFC 관리 전략 도입)
  - Established `ROADMAP.md` for project milestones ([ROADMAP.md를 통한 마일스톤 관리])
  - Added Backlog management in `docs/backlog/` ([docs/backlog/을 통한 태스크 관리])
  - Introduced RFC process in `docs/rfc/` for major changes ([주요 변경 사항을 위한 RFC 프로세스 도입])
  - Meeting: [20260117_management_v1.3.0.md](ai-rules/meeting_minutes/20260117_management_v1.3.0.md)
- [AI-Rules v1.2.0] Enhanced governance with Env Var management, Container strategy, and Spec-First process ([AI-규칙 v1.2.0] 환경변수 관리, 컨테이너 전략, Spec-First 프로세스를 통한 거버넌스 고도화)
  - Mandatory `.env.example` and documentation ([.env.example 필수화 및 문서화])
  - Docker/DevContainers for project isolation ([Docker/DevContainers를 통한 프로젝트 격리])
  - Specification approval required before implementation ([구현 전 명세 승인 의무화])
  - Meeting: [20260117_governance_v1.2.0.md](ai-rules/meeting_minutes/20260117_governance_v1.2.0.md)
- [AI-Rules v1.1.0] Added Korean language requirement with dual-language CHANGELOG strategy ([AI-규칙 v1.1.0] 한글 기본 원칙 추가 및 CHANGELOG 이중 언어 전략 도입)
  - All project documents default to Korean (프로젝트 문서 한글 기본)
  - CHANGELOG: English main + Korean translation (CHANGELOG: 영어 메인 + 한글 병기)
  - Meeting: [20260117_korean_language.md](ai-rules/meeting_minutes/20260117_korean_language.md) (회의록)

## [1.0.0] - 2026-01-17
- Initial release
