---
createdAt: 2025-06-07
updatedAt: 2025-07-10
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
---

# Intlayer MCP 서버

**Intlayer MCP (Model Context Protocol) 서버**는 Intlayer 생태계에 맞춤화된 AI 기반 IDE 지원을 제공합니다.

## 어디에서 사용할 수 있나요?

- **Cursor**, **VS Code**와 같이 MCP 프로토콜을 지원하는 최신 개발 환경에서.
- **Claude Desktop**, **Gemini**, **ChatGPT** 등 좋아하는 AI 어시스턴트에서.

## 왜 Intlayer MCP 서버를 사용해야 하나요?

Intlayer MCP 서버를 IDE에서 활성화하면 다음 기능을 사용할 수 있습니다:

- **컨텍스트 인식 문서**
  MCP 서버는 Intlayer의 문서를 로드하고 노출합니다. 설정, 마이그레이션 등을 빠르게 진행할 수 있도록 도와줍니다.
  이를 통해 코드 제안, 명령 옵션 및 설명이 항상 최신 상태이고 관련성이 유지됩니다.

- **스마트 CLI 통합**
  IDE 인터페이스에서 직접 Intlayer CLI 명령어에 접근하고 실행할 수 있습니다. MCP 서버를 사용하면 AI 어시스턴트가 `intlayer dictionaries build` 명령어로 사전을 업데이트하거나 `intlayer dictionaries fill` 명령어로 누락된 번역을 채울 수 있습니다.

  > 전체 명령어 및 옵션 목록은 [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)에서 확인하세요.

---

## Cursor에서 설정하기

Cursor에서 MCP 서버를 구성하려면 [공식 문서](https://docs.cursor.com/context/mcp)를 참고하세요.

프로젝트 루트에 다음과 같은 `.cursor/mcp.json` 구성 파일을 추가합니다:

### 로컬 서버 (stdio) (권장)

```json filename=".cursor/mcp.json"
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

> **참고:** 원격 서버는 CLI 도구를 통합하지 않습니다. 원격 서버는 문서 및 컨텍스트 용도로만 제공됩니다.

> **참고:** 서버 호스팅 비용으로 인해 원격 서버의 가용성을 보장할 수 없습니다. 가장 안정적인 경험을 위해 로컬 서버(stdio) 전송 방식을 사용하는 것을 권장합니다.

```json filename=".cursor/mcp.json"
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

## VS Code 설정

VS Code에서 MCP 서버를 구성하려면 [공식 문서](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)를 참고하세요.

VS Code에서 Intlayer MCP 서버를 사용하려면 작업 공간 또는 사용자 설정에 구성해야 합니다.

### 로컬 서버 (stdio) (권장)

프로젝트 루트에 `.vscode/mcp.json` 파일을 생성하세요:

```json filename=".vscode/mcp.json"
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

> **참고:** 원격 서버는 CLI 도구와 통합되지 않습니다. 원격 서버는 문서 및 컨텍스트 용도로만 사용됩니다.

> **참고:** 서버 호스팅 비용으로 인해 원격 서버의 가용성을 보장할 수 없습니다. 가장 안정적인 경험을 위해 로컬 서버(stdio) 전송 방식을 사용하는 것을 권장합니다.

```json filename=".vscode/mcp.json"
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

1 - [프롬프트 대시보드](https://platform.openai.com/prompts)로 이동  
2 - "+ 생성"을 클릭  
3 - "도구 (생성 또는 +)"를 클릭  
4 - "MCP 서버" 선택  
5 - "새로 추가" 클릭  
6 - 다음 필드를 작성:

- URL: https://mcp.intlayer.org
- 라벨: Intlayer MCP 서버
- 이름: intlayer-mcp-server
- 인증: 없음

7 - "저장" 클릭

> **참고:** 원격 서버는 CLI 도구를 통합하지 않습니다. 원격 서버는 문서 및 컨텍스트 용도로만 사용됩니다.

> **참고:** 서버 호스팅 비용으로 인해 원격 서버의 가용성을 보장할 수 없습니다. 가장 안정적인 경험을 위해 로컬 서버(stdio) 전송 방식을 사용하는 것을 권장합니다.

---

## Claude 데스크톱에서 설정하기

[공식 문서](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server)를 따라 Claude 데스크톱에서 MCP 서버를 구성하세요.

설정 파일 경로:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### 로컬 서버 (stdio) (권장)

```json filename="claude_desktop_config.json"
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

Intlayer MCP 서버를 테스트, 디버깅 또는 다른 도구와의 통합을 위해 명령줄에서 직접 실행할 수도 있습니다.

```bash
# 전역 설치
npm install -g @intlayer/mcp

# 또는 npx로 직접 사용 (권장)
npx @intlayer/mcp
```

---

## 문서 이력

| 버전   | 날짜       | 변경 사항                  |
| ------ | ---------- | -------------------------- |
| 5.5.12 | 2025-07-11 | ChatGPT 설정 추가          |
| 5.5.12 | 2025-07-10 | Claude Desktop 설정 추가   |
| 5.5.12 | 2025-07-10 | SSE 전송 및 원격 서버 추가 |
| 5.5.10 | 2025-06-29 | 초기 이력                  |
