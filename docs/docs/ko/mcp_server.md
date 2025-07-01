---
docName: mcp_server
url: https://intlayer.org/doc/mcp-server
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md
createdAt: 2025-06-07
updatedAt: 2025-06-07
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
---

# Intlayer MCP 서버

**Intlayer MCP (Model Context Protocol) 서버**는 Intlayer 생태계에 맞춤화된 AI 기반 IDE 지원을 제공합니다. **Cursor**, **GitHub Copilot 작업 공간**과 같은 최신 개발 환경 및 MCP 프로토콜을 지원하는 모든 IDE를 위해 설계되었으며, 프로젝트 설정에 기반한 상황별 실시간 지원을 제공합니다.

## 왜 Intlayer MCP 서버를 사용해야 하나요?

IDE에서 Intlayer MCP 서버를 활성화하면 다음과 같은 기능을 사용할 수 있습니다:

- **스마트 CLI 통합**
  IDE 인터페이스에서 직접 Intlayer CLI 명령을 실행하고 접근할 수 있습니다. 명령어와 옵션의 전체 목록은 [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)에서 확인하세요.

- **상황 인식 문서 제공**
  MCP 서버는 프로젝트에서 사용 중인 Intlayer 버전에 해당하는 문서를 로드하고 노출합니다. 이를 통해 코드 제안, 명령 옵션 및 설명이 항상 최신 상태이고 관련성이 있도록 보장합니다.

- **AI 지원 개발**
  프로젝트 인식 제안 및 자동 완성을 통해 AI 어시스턴트가 코드를 설명하고, CLI 사용법을 추천하거나 현재 파일을 기반으로 Intlayer의 특정 기능 사용 방법을 제안할 수 있습니다.

- **경량 및 즉시 설정**
  서버 유지 관리나 무거운 설치가 필요 없습니다. 단지 `.cursor/mcp.json` 또는 이에 상응하는 MCP 설정을 구성하면 바로 사용할 수 있습니다.

---

## Cursor 설정

프로젝트 루트에 다음 `.cursor/mcp.json` 구성 파일을 추가하세요:

```json
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

이 구성은 IDE에 `npx`를 사용하여 Intlayer MCP 서버를 실행하도록 지시하며, 버전을 고정하지 않는 한 항상 최신 버전을 사용하도록 보장합니다.

---

## VS Code 설정

VS Code에서 Intlayer MCP 서버를 사용하려면 작업 공간 또는 사용자 설정에서 구성해야 합니다.

### 작업 공간 구성

프로젝트 루트에 `.vscode/mcp.json` 파일을 생성하세요:

```json
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

### VS Code에서 MCP 서버 사용하기

1. **에이전트 모드 활성화**: 채팅 뷰를 열고 (Mac에서는 ⌃⌘I, Windows/Linux에서는 Ctrl+Alt+I) 드롭다운에서 **Agent** 모드를 선택하세요.

2. **도구 접근**: **도구(Tools)** 버튼을 클릭하여 사용 가능한 Intlayer 도구를 확인하세요. 필요에 따라 특정 도구를 선택하거나 선택 해제할 수 있습니다.

3. **직접 도구 참조**: 프롬프트에서 `#` 뒤에 도구 이름을 입력하여 도구를 직접 참조할 수 있습니다.

4. **도구 확인**: 기본적으로 VS Code는 도구 실행 전에 확인을 요청합니다. **계속(Continue)** 버튼 옵션을 사용하여 현재 세션, 작업 공간 또는 모든 향후 호출에 대해 도구를 자동으로 확인할 수 있습니다.

### 서버 관리

- 명령 팔레트에서 **MCP: 서버 목록(List Servers)** 을 실행하여 구성된 서버를 확인하세요.
- 필요에 따라 Intlayer MCP 서버를 시작, 중지 또는 재시작하세요.
- 서버를 선택하고 **출력 표시(Show Output)** 를 선택하여 문제 해결을 위한 서버 로그를 확인하세요.

VS Code MCP 통합에 대한 자세한 정보는 [공식 VS Code MCP 문서](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)를 참조하세요.

---

## CLI를 통한 MCP 서버 사용

Intlayer MCP 서버를 명령줄에서 직접 실행하여 테스트, 디버깅 또는 다른 도구와의 통합에 사용할 수 있습니다.

### MCP 서버 설치

먼저, MCP 서버 패키지를 전역으로 설치하거나 npx를 통해 사용하세요:

```bash
# 전역 설치
npm install -g @intlayer/mcp

# 또는 npx로 직접 사용 (권장)
npx @intlayer/mcp
```

### 서버 시작

디버깅 및 테스트를 위한 인스펙터와 함께 MCP 서버를 시작하려면:

```bash
# 내장된 start 명령어 사용
npm run start

# 또는 npx로 직접 실행
npx @modelcontextprotocol/inspector npx @intlayer/mcp
```

이 명령은 검사기 인터페이스와 함께 MCP 서버를 실행하여 다음 작업을 수행할 수 있습니다:

- MCP 프로토콜 통신 테스트
- 서버 응답 디버깅
- 도구 및 리소스 구현 검증
- 서버 성능 모니터링

### 개발 용도

개발 및 테스트 목적으로 서버를 다양한 모드로 실행할 수 있습니다:

```bash
# 개발 모드에서 빌드 및 시작
npm run dev

# 사용자 지정 구성으로 실행
node dist/cjs/index.cjs

# 서버 기능 테스트
npm test
```

서버는 Cursor나 다른 IDE뿐만 아니라 모든 MCP 호환 클라이언트가 사용할 수 있는 Intlayer 전용 도구와 리소스를 제공합니다.

---

## 기능 개요

| Feature       | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| CLI 지원      | `intlayer` 명령어 실행, 사용법 힌트 및 인라인 인수 제공      |
| 버전별 문서   | 현재 사용 중인 Intlayer 버전에 맞는 문서를 자동 감지 및 로드 |
| 자동완성      | 입력 중인 명령어 및 설정에 대한 지능형 제안                  |
| 플러그인 지원 | MCP 표준을 지원하는 IDE 및 도구와 호환 가능                  |

---

## 유용한 링크

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)
- [Intlayer GitHub 저장소](https://github.com/aymericzip/intlayer)

---

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
