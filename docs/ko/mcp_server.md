# Intlayer MCP 서버

**Intlayer MCP (Model Context Protocol) 서버**는 [Intlayer](https://github.com/aymericzip/intlayer) 생태계를 위해 AI 기반의 IDE 지원을 제공합니다. **Cursor**, **GitHub Copilot workspace**, 그리고 MCP 프로토콜을 지원하는 모든 IDE와 같은 현대적인 개발자 환경을 위해 설계된 이 서버는 프로젝트 설정에 기반한 실시간 컨텍스트 지원을 제공합니다.

## Intlayer MCP 서버를 사용하는 이유

IDE에서 Intlayer MCP 서버를 활성화하면 다음과 같은 기능을 사용할 수 있습니다:

- **스마트 CLI 통합**
  IDE 인터페이스에서 Intlayer CLI 명령어를 직접 실행하고 접근할 수 있습니다. 명령어와 옵션의 전체 목록은 [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)에서 확인할 수 있습니다.

- **컨텍스트 기반 문서화**
  MCP 서버는 프로젝트에서 사용하는 Intlayer 버전에 해당하는 문서를 로드하고 노출합니다. 이를 통해 코드 제안, 명령어 옵션 및 설명이 항상 최신 상태로 유지되고 관련성이 보장됩니다.

- **AI 지원 개발**
  프로젝트에 적합한 제안 및 자동 완성을 통해 AI 도우미는 코드 설명, CLI 사용법 추천 또는 현재 파일에 기반한 Intlayer의 특정 기능 사용 방법을 제안할 수 있습니다.

- **경량 및 즉각적인 설정**
  서버 유지보수나 무거운 설치가 필요하지 않습니다. `.cursor/mcp.json` 또는 동등한 MCP 설정을 구성하면 바로 사용할 수 있습니다.

---

## Cursor 설정

프로젝트 루트에 다음과 같은 `.cursor/mcp.json` 설정 파일을 추가하세요:

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

이는 IDE가 `npx`를 사용하여 Intlayer MCP 서버를 실행하도록 지시하며, 최신 버전을 항상 사용하도록 보장합니다(고정하지 않는 한).

---

## VS Code 설정

Intlayer MCP 서버를 VS Code에서 사용하려면 워크스페이스 또는 사용자 설정에서 이를 구성해야 합니다.

### 워크스페이스 설정

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

### VS Code에서 MCP 서버 사용

1. **에이전트 모드 활성화**: 채팅 뷰를 열고(맥에서는 ⌃⌘I, 윈도우/리눅스에서는 Ctrl+Alt+I) 드롭다운에서 **에이전트** 모드를 선택하세요.

2. **도구 접근**: **도구** 버튼을 클릭하여 사용 가능한 Intlayer 도구를 확인하세요. 필요에 따라 특정 도구를 선택/해제할 수 있습니다.

3. **직접 도구 참조**: 프롬프트에서 `#` 뒤에 도구 이름을 입력하여 도구를 직접 참조하세요.

4. **도구 확인**: 기본적으로 VS Code는 도구 실행 전에 확인을 요청합니다. **계속** 버튼 옵션을 사용하여 현재 세션, 워크스페이스 또는 모든 미래 호출에 대해 도구를 자동으로 확인할 수 있습니다.

### 서버 관리

- 명령 팔레트에서 **MCP: List Servers**를 실행하여 구성된 서버를 확인하세요.
- 필요에 따라 Intlayer MCP 서버를 시작, 중지 또는 재시작하세요.
- 서버를 선택하고 **출력 보기**를 선택하여 서버 로그를 확인하고 문제를 해결하세요.

VS Code MCP 통합에 대한 자세한 정보는 [공식 VS Code MCP 문서](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)를 참조하세요.

---

## CLI를 통한 MCP 서버 사용

Intlayer MCP 서버를 명령줄에서 직접 실행하여 테스트, 디버깅 또는 다른 도구와의 통합에 사용할 수 있습니다.

### MCP 서버 설치

먼저 MCP 서버 패키지를 전역으로 설치하거나 npx를 통해 사용하세요:

```bash
# 전역 설치
npm install -g @intlayer/mcp

# 또는 npx를 통해 직접 사용 (권장)
npx @intlayer/mcp
```

### 서버 시작

디버깅 및 테스트를 위해 인스펙터와 함께 MCP 서버를 시작하려면:

```bash
# 내장된 시작 명령 사용
npm run start

# 또는 npx를 통해 직접 실행
npx @modelcontextprotocol/inspector npx @intlayer/mcp
```

이 명령은 MCP 서버를 인스펙터 인터페이스와 함께 실행하며, 이를 통해 다음을 수행할 수 있습니다:

- MCP 프로토콜 통신 테스트
- 서버 응답 디버깅
- 도구 및 리소스 구현 검증
- 서버 성능 모니터링

### 개발용 사용

개발 및 테스트 목적으로 서버를 다양한 모드에서 실행할 수 있습니다:

```bash
# 개발 모드에서 빌드 및 시작
npm run dev

# 사용자 정의 설정으로 실행
node dist/cjs/index.cjs

# 서버 기능 테스트
npm test
```

서버는 Cursor 또는 기타 IDE뿐만 아니라 MCP 호환 클라이언트에서 사용할 수 있는 Intlayer 전용 도구와 리소스를 노출합니다.

---

## 기능 개요

| 기능          | 설명                                                              |
| ------------- | ----------------------------------------------------------------- |
| CLI 지원      | `intlayer` 명령 실행, 사용법 힌트 및 인라인 인수 제공             |
| 버전별 문서   | 현재 사용 중인 Intlayer 버전에 맞는 문서를 자동으로 감지하고 로드 |
| 자동 완성     | 입력 중 지능적인 명령어 및 설정 제안                              |
| 플러그인 지원 | MCP 표준을 지원하는 IDE 및 도구와 호환                            |

---

## 유용한 링크

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)
- [Intlayer GitHub 저장소](https://github.com/aymericzip/intlayer)
