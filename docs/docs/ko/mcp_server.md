---
createdAt: 2025-06-07
updatedAt: 2025-07-11
title: MCP 서버 문서
description: MCP 서버의 기능과 설정을 탐색하여 서버 관리 및 운영을 최적화하세요.
keywords:
  - MCP 서버
  - 서버 관리
  - 최적화
  - Intlayer
  - 문서
  - 설정
  - 기능
slugs:
  - doc
  - mcp-server
history:
  - version: 5.5.12
    date: 2025-07-11
    changes: ChatGPT 설정 추가
  - version: 5.5.12
    date: 2025-07-10
    changes: Claude Desktop 설정 추가
  - version: 5.5.12
    date: 2025-07-10
    changes: SSE 전송 및 원격 서버 추가
  - version: 5.5.10
    date: 2025-06-29
    changes: 초기 기록
---

# Intlayer MCP 서버

**Intlayer MCP (Model Context Protocol) 서버**는 Intlayer 생태계에 맞춤화된 AI 기반 IDE 지원을 제공합니다.

## 어디에서 사용할 수 있나요?

- **Cursor**, **VS Code**와 같은 최신 개발 환경 및 MCP 프로토콜을 지원하는 모든 IDE에서.
- **Claude Desktop**, **Gemini**, **ChatGPT** 등 좋아하는 AI 어시스턴트에서.

## 왜 Intlayer MCP 서버를 사용해야 하나요?

Intlayer MCP 서버를 IDE에서 활성화하면 다음과 같은 기능을 사용할 수 있습니다:

- **컨텍스트 인식 문서**
  MCP 서버는 Intlayer의 문서를 로드하고 노출합니다. 설정, 마이그레이션 등을 빠르게 진행할 수 있도록 도와줍니다.
  이를 통해 코드 제안, 명령 옵션 및 설명이 항상 최신 상태이고 관련성이 유지됩니다.

- **스마트 CLI 통합**
  IDE 인터페이스에서 직접 Intlayer CLI 명령어에 접근하고 실행할 수 있습니다. MCP 서버를 사용하면 AI 어시스턴트가 `intlayer dictionaries build` 명령어로 사전을 업데이트하거나 `intlayer dictionaries fill` 명령어로 누락된 번역을 채우도록 할 수 있습니다.

  > 전체 명령어 및 옵션 목록은 [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)에서 확인하세요.

## 로컬 서버 (stdio) vs 원격 서버 (SSE)

MCP 서버는 두 가지 방식으로 사용할 수 있습니다:

- 로컬 서버 (stdio)
- 원격 서버 (SSE)

### 로컬 서버 (stdio) (권장)

Intlayer는 사용자의 컴퓨터에 로컬로 설치할 수 있는 NPM 패키지를 제공합니다. 이 패키지는 VS Code, Cursor와 같은 선호하는 IDE뿐만 아니라 ChatGPT, Claude Desktop 등과 같은 로컬 어시스턴트 애플리케이션에도 설치할 수 있습니다.

이 서버는 MCP 서버를 사용하는 권장 방법입니다. CLI 도구를 포함한 MCP 서버의 모든 기능이 통합되어 있기 때문입니다.

### 원격 서버 (SSE)

MCP 서버는 SSE 전송 방식을 사용하여 원격으로도 사용할 수 있습니다. 이 서버는 Intlayer에서 호스팅하며 https://mcp.intlayer.org 에서 이용할 수 있습니다. 이 서버는 인증 없이 공개적으로 접근할 수 있으며 무료로 사용할 수 있습니다.

원격 서버는 CLI 도구, AI 자동완성 등과 통합되어 있지 않다는 점에 유의하세요. 원격 서버는 Intlayer 생태계와 관련된 문서와 상호작용하여 AI 어시스턴트를 돕기 위한 용도로만 사용됩니다.

> 서버 호스팅 비용으로 인해 원격 서버의 가용성을 보장할 수 없습니다. 동시 연결 수를 제한하고 있습니다. 가장 안정적인 경험을 위해 로컬 서버(stdio) 전송 방식을 사용하는 것을 권장합니다.

---

## Cursor에서 설정하기

Cursor에서 MCP 서버를 구성하려면 [공식 문서](https://docs.cursor.com/context/mcp)를 참고하세요.

프로젝트 루트에 다음과 같은 `.cursor/mcp.json` 구성 파일을 추가합니다:

### 로컬 서버 (stdio) (권장)

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### 원격 서버 (SSE)

Server-Sent Events (SSE)를 사용하여 원격 Intlayer MCP 서버에 연결하려면, MCP 클라이언트를 호스팅된 서비스에 연결하도록 구성할 수 있습니다.

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "transport": "sse"
    }
  }
}
```

이 설정은 IDE가 `npx`를 사용하여 Intlayer MCP 서버를 실행하도록 하여, 버전을 고정하지 않는 한 항상 최신 버전을 사용하도록 보장합니다.

---

## VS Code에서 설정하기

[공식 문서](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)를 참고하여 VS Code에서 MCP 서버를 구성하세요.

VS Code에서 Intlayer MCP 서버를 사용하려면 작업 공간 또는 사용자 설정에서 구성해야 합니다.

### 로컬 서버 (stdio) (권장)

프로젝트 루트에 `.vscode/mcp.json` 파일을 생성하세요:

```json fileName=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### 원격 서버 (SSE)

Server-Sent Events (SSE)를 사용하여 원격 Intlayer MCP 서버에 연결하려면, MCP 클라이언트를 호스팅된 서비스에 연결하도록 구성할 수 있습니다.

```json fileName=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "type": "sse"
    }
  }
}
```

---

## ChatGPT 설정

### 원격 서버 (SSE)

ChatGPT에서 MCP 서버를 구성하려면 [공식 문서](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server)를 참조하세요.

1. [프롬프트 대시보드](https://platform.openai.com/prompts)로 이동
2. `+ Create` 클릭
3. `Tools (Create or +)` 클릭
4. `MCP Server` 선택
5. `Add new` 클릭
6. 다음 필드를 입력:

   - URL: `https://mcp.intlayer.org`
   - Label: `Intlayer MCP Server`
   - Name: `intlayer-mcp-server`
   - Authentication: `None`

7. `Save` 클릭

---

## Claude Desktop 설정

[공식 문서](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server)를 참고하여 Claude Desktop에서 MCP 서버를 설정하세요.

설정 파일 경로:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### 로컬 서버 (stdio) (권장)

```json fileName="claude_desktop_config.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

---

## CLI를 통한 MCP 서버 사용

테스트, 디버깅 또는 다른 도구와의 통합을 위해 Intlayer MCP 서버를 명령줄에서 직접 실행할 수도 있습니다.

```bash
# 전역 설치
npm install -g @intlayer/mcp

# 또는 npx로 직접 사용 (권장)
npx @intlayer/mcp
```

---
