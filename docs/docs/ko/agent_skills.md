---
createdAt: 2026-02-09
updatedAt: 2026-02-12
title: 에이전트 스킬
description: 메타데이터, 사이트맵 및 서버 액션에 대한 포괄적인 설정 가이드를 포함하여 Intlayer 에이전트 스킬을 사용하여 AI 에이전트의 프로젝트 이해도를 높이는 방법을 배워보세요.
keywords:
  - Intlayer
  - 에이전트 스킬
  - AI 에이전트
  - 국제화
  - 문서
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: 내역 초기화
---

## `intlayer init skills` 명령어

`intlayer init skills` 명령어는 프로젝트에 에이전트 스킬을 설정하는 가장 쉬운 방법입니다. 사용자 환경을 감지하고 선호하는 플랫폼에 필요한 구성 파일을 설치합니다.

```bash
npx intlayer init skills
```

또는 Vercel Skill SDK 사용

```bash
npx skills add aymericzip/intlayer-skills
```

이 명령어를 실행하면 다음과 같은 작업이 수행됩니다:

1.  사용 중인 프레임워크(예: Next.js, React, Vite)를 감지합니다.
2.  어떤 플랫폼(Cursor, Windsurf, VS Code, OpenCode, Claude Code, GitHub Copilot Workspace 등)에 대한 스킬을 설치할지 묻습니다.
3.  필요한 구성 파일(`.cursor/skills/intlayer-next-js/SKILL.md`, `.windsurf/skills/intlayer-next-js/SKILL.md`, `.opencode/skills/intlayer-next-js/SKILL.md`, `.vscode/mcp.json` 등)을 생성합니다.

## 지원되는 플랫폼

Intlayer는 AI 에이전트가 특정 프로젝트에서 Intlayer와 연동하는 방법을 이해하는 데 도움이 되는 프레임워크별 문서(설정, 사용법, 메타데이터, 사이트맵, 서버 액션 등)를 제공합니다. 이러한 스킬은 에이전트가 국제화의 복잡한 과정을 거치도록 안내하여 올바른 패턴과 모범 사례를 따르도록 설계되었습니다.

Intlayer는 다음 플랫폼과의 통합을 지원합니다:

### 1. Cursor

Cursor는 MCP(Model Context Protocol) 서버 및 사용자 지정 스킬을 지원합니다. `intlayer init skills`를 실행하면 다음과 같은 작업이 수행됩니다:

- Intlayer MCP 서버와 통신하기 위한 `.cursor/mcp.json` 파일을 생성합니다.
- `.cursor/skills` 디렉토리에 프레임워크별 스킬을 설치합니다.

### 2. Windsurf

Windsurf는 AI 기반 IDE입니다. `intlayer init skills`를 실행하면 `.windsurf/skills` 디렉토리에 프레임워크별 스킬이 설치됩니다.

### 3. VS Code

VS Code 사용자, 특히 GitHub Copilot 또는 기타 MCP 호환 확장 프로그램을 사용하는 사용자를 위해 이 명령어는 다음과 같은 작업을 수행합니다:

- `.vscode/mcp.json` 구성을 생성합니다.
- 프로젝트 루트의 `skills/` 디렉토리에 프레임워크별 스킬을 설치합니다.

### 4. OpenCode

OpenCode는 소프트웨어 엔지니어링 작업을 위해 설계된 대화형 CLI 에이전트입니다. Intlayer는 OpenCode가 국제화 작업을 지원할 수 있도록 특정 스킬을 제공합니다. 이 스킬들은 `.opencode/skills` 디렉토리에 설치됩니다.

### 5. Claude Code

Claude Code는 Intlayer 스킬을 사용하도록 구성할 수 있습니다. 이 명령어는 `.claude/skills` 디렉토리에 프레임워크별 스킬을 설치합니다.

### 6. GitHub Copilot Workspace

GitHub Copilot Workspace를 사용하면 사용자 지정 스킬을 정의할 수 있습니다. 이 명령어는 `.github/skills` 디렉토리에 프레임워크별 스킬을 설치합니다.
