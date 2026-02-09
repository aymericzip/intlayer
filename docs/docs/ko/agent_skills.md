---
createdAt: 2026-02-09
updatedAt: 2026-02-09
title: 에이전트 스킬
description: Intlayer 에이전트 스킬을 사용하여 AI 에이전트의 프로젝트 이해도를 높이는 방법을 배워보세요.
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
  - version: 8.0.4
    date: 2026-02-09
    changes: 내역 초기화
---

## `intlayer init skills` 명령어

`intlayer init skills` 명령어는 프로젝트에 에이전트 스킬을 설정하는 가장 쉬운 방법입니다. 사용자 환경을 감지하고 선호하는 플랫폼에 필요한 구성 파일을 설치합니다.

```bash
npx intlayer init skills
```

이 명령어를 실행하면 다음과 같은 작업이 수행됩니다:

1.  사용 중인 프레임워크(예: Next.js, React, Vite)를 감지합니다.
2.  어떤 플랫폼(Cursor, VS Code, OpenCode, Claude Code 등)에 대한 스킬을 설치할지 묻습니다.
3.  필요한 구성 파일(`.cursor/mcp.json`, `.vscode/mcp.json`, 또는 `.intlayer/skills/*.md` 등)을 생성합니다.

## 지원되는 플랫폼

Intlayer는 다음 플랫폼과의 통합을 지원합니다:

### 1. Cursor

Cursor는 MCP(Model Context Protocol) 서버를 지원합니다. `intlayer init skills`를 실행하면 Cursor가 Intlayer MCP 서버와 통신할 수 있도록 하는 `.cursor/mcp.json` 파일이 생성됩니다.

### 2. VS Code

VS Code 사용자, 특히 GitHub Copilot 또는 기타 MCP 호환 확장 프로그램을 사용하는 사용자를 위해 이 명령어는 `.vscode/mcp.json` 구성을 생성합니다.

### 3. OpenCode

OpenCode는 소프트웨어 엔지니어링 작업을 위해 설계된 대화형 CLI 에이전트입니다. Intlayer는 OpenCode가 국제화 작업을 지원할 수 있도록 특정 스킬을 제공합니다.

### 4. Claude Code

Claude Code는 생성된 구성을 데스크톱 또는 CLI 설정에 추가하여 Intlayer 스킬을 사용하도록 구성할 수 있습니다.
