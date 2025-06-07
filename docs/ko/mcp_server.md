# Intlayer MCP 서버

**Intlayer MCP (Model Context Protocol) 서버**는 [Intlayer](https://github.com/aymericzip/intlayer) 생태계를 위해 AI 기반의 IDE 지원을 제공합니다. **Cursor**, **GitHub Copilot workspace**, 그리고 MCP 프로토콜을 지원하는 모든 IDE와 같은 현대적인 개발 환경을 위해 설계된 이 서버는 프로젝트 설정에 기반한 실시간 컨텍스트 지원을 제공합니다.

## Intlayer MCP 서버를 사용하는 이유?

IDE에서 Intlayer MCP 서버를 활성화하면 다음과 같은 기능을 사용할 수 있습니다:

- **스마트 CLI 통합**
  IDE 인터페이스에서 Intlayer CLI 명령을 직접 실행하고 액세스할 수 있습니다. 명령 및 옵션의 전체 목록은 [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)에서 확인할 수 있습니다.

- **컨텍스트 인식 문서화**
  MCP 서버는 프로젝트에서 사용하는 Intlayer 버전에 해당하는 문서를 로드하고 노출합니다. 이를 통해 코드 제안, 명령 옵션 및 설명이 항상 최신 상태이며 관련성이 유지됩니다.

- **AI 지원 개발**
  프로젝트 인식 제안 및 자동 완성을 통해 AI 어시스턴트는 코드 설명, CLI 사용 추천, 또는 현재 파일에 기반한 Intlayer의 특정 기능 사용 방법을 제안할 수 있습니다.

- **경량 및 즉각적인 설정**
  서버 유지 관리나 복잡한 설치가 필요 없습니다. `.cursor/mcp.json` 또는 동등한 MCP 설정을 구성하기만 하면 바로 사용할 수 있습니다.

---

## Cursor 설정

프로젝트 루트에 다음과 같은 `.cursor/mcp.json` 구성 파일을 추가하세요:

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

이는 IDE가 `npx`를 사용하여 Intlayer MCP 서버를 실행하도록 지시하며, 최신 버전을 항상 사용할 수 있도록 보장합니다(고정하지 않는 한).

---

## 🛠 기능 개요

| 기능             | 설명                                                         |
| ---------------- | ------------------------------------------------------------ |
| 🧠 CLI 지원      | `intlayer` 명령 실행, 사용법 힌트 및 인라인 인수 제공        |
| 📘 버전별 문서   | 현재 사용 중인 Intlayer 버전에 맞는 문서를 자동 감지 및 로드 |
| 🛎 자동 완성     | 입력 중 지능형 명령 및 구성 제안                             |
| 🧩 플러그인 지원 | MCP 표준을 지원하는 IDE 및 도구와 호환 가능                  |

---

## 📎 유용한 링크

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)
- [Intlayer GitHub 저장소](https://github.com/aymericzip/intlayer)

---
