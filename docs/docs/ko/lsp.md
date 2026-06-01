---
createdAt: 2025-06-07
updatedAt: 2026-05-31
title: Intlayer LSP 서버
description: Intlayer 언어 서버가 지원되는 모든 에디터에서 useIntlayer, getIntlayer 및 관련 호출에 대해 정의로 이동(Go-to-Definition) 및 기타 IDE 기능을 제공하는 방법을 알아봅니다.
keywords:
  - LSP
  - 언어 서버
  - 정의로 이동
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
---

# Intlayer LSP 서버

**Intlayer 언어 서버(LSP)**는 Intlayer를 인식하는 지능형 기능으로 IDE를 향상시키는 [Language Server Protocol(LSP)](https://microsoft.github.io/language-server-protocol/) 구현체입니다. 현재 사전 키 호출에 대한 **정의로 이동(Go to Definition)** 기능을 제공하여, 컴포넌트의 `useIntlayer("my-key")`에서 선언된 `.content.ts` 파일로 즉시 이동할 수 있습니다.

---

## LSP를 사용하는 이유는 무엇인가요?

Intlayer를 사용할 때 `useIntlayer("homepage")`와 같은 호출과 `src/homepage.content.ts` 내의 선언 사이의 연결은 암시적입니다. 도구가 없다면 수동으로 파일을 찾아야 합니다. LSP는 이 연결을 명시적으로 만듭니다.

**AI 에이전트 인식**

AI 코딩 에이전트(Cursor, Windsurf, GitHub Copilot, Claude Code, Codex)는 기호를 해석하고 파일 간의 관계를 이해하기 위해 언어 서버에 의존합니다. Intlayer LSP가 실행 중이면 에이전트는 `useIntlayer("key")`를 선언된 곳까지 추적할 수 있으므로, 사용 가능한 콘텐츠 키, 각 사전의 구조, 읽거나 편집해야 하는 파일에 대한 정확한 컨텍스트를 얻을 수 있습니다.

**정의로 이동**

지원되는 게터 호출 내부의 사전 키 문자열에 커서를 놓고 `F12` 키(또는 `Cmd/Ctrl+클릭`)를 누릅니다. 에디터가 콘텐츠 선언 파일을 열고 커서를 `key:` 행에 배치합니다.

**병합된 사전 지원**

하나의 키가 여러 콘텐츠 파일에 분산되어 있을 수 있습니다(Intlayer가 이를 병합함). 서버는 소스 파일당 하나의 `Location`을 반환하므로 모든 선언으로 이동할 수 있습니다.

**모든 환경에서 작동**

모든 `*-intlayer` 패키지를 지원합니다 (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `adonis-intlayer`, `intlayer`).

### 지원되는 게터 호출

서버는 다음과 같은 함수 호출을 감지하고 첫 번째 문자열 리터럴 인수를 사전 키로 추출합니다.

| 함수          | 예시                          |
| ------------- | ----------------------------- |
| `useIntlayer` | `useIntlayer("hero")`         |
| `getIntlayer` | `getIntlayer("hero", locale)` |

TypeScript 제네릭 및 추가 인수는 무시되며 오직 키 문자열만 중요합니다.

> `useDictionary` 및 `getDictionary`는 문자열 키 대신 이미 가져온 `Dictionary` 객체를 첫 번째 인수로 받으므로 정의로 이동의 이점을 누리지 못하며 서버에서 추적되지 않습니다.

---

## 설치

LSP 서버는 `@intlayer/lsp` 패키지의 일부로 배포됩니다.

```bash packageManager="npm"
npm install --save-dev @intlayer/lsp
```

```bash packageManager="yarn"
yarn add --dev @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add --save-dev @intlayer/lsp
```

```bash packageManager="bun"
bun add --dev @intlayer/lsp
```

이 패키지는 에디터가 서버 실행 파일로 사용하는 `intlayer-lsp` 바이너리를 노출합니다.

---

## Claude Code 플러그인으로 설정

Intlayer LSP는 Intlayer GitHub 리포지토리에 직접 호스팅되는 **Claude Code 플러그인**으로 사용할 수 있습니다. 이를 설치하면 Claude Code가 모든 `useIntlayer` / `getIntlayer` 호출에 대해 네이티브 정의로 이동 기능을 인식하게 됩니다.

### 1. 언어 서버 바이너리 설치

```bash packageManager="npm"
npm install -g @intlayer/lsp
```

```bash packageManager="yarn"
yarn global add @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add -g @intlayer/lsp
```

이 명령은 플러그인의 `lspServers` 항목이 호출하는 `intlayer-lsp` 바이너리를 PATH에 배치합니다.

### 2. Intlayer 마켓플레이스 등록 및 플러그인 설치

```bash
claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
claude plugin enable intlayer-lsp@intlayer
```

Claude Code는 `enabledPlugins`에 `"intlayer-lsp@intlayer": true`를 추가하고 지원되는 파일 형식(`.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`)에서 언어 서버를 자동으로 시작합니다.

### 3. LSP 도구 활성화 (아직 활성화되지 않은 경우)

일부 Claude Code 버전에서는 LSP 기능 플래그를 설정해야 합니다. 설치 후 정의로 이동이 작동하지 않으면 `~/.claude/settings.json`에 다음을 추가하십시오.

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

Claude Code를 다시 시작하십시오. 이제 Intlayer 코드베이스를 탐색할 때 `grep`으로 대체하는 대신 `goToDefinition`, `findReferences` 및 기타 LSP 작업을 사용합니다.

---

## VS Code에서 설정 (확장 프로그램 권장)

[Intlayer VS Code 확장 프로그램](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)이 설치되어 있다면 언어 서버가 자동으로 시작됩니다. 추가 설정은 필요하지 않습니다.

> 설치 및 기타 기능에 대해서는 [VS Code 확장 프로그램 설명서](https://intlayer.org/doc/vs-code-extension)를 참조하십시오.

---

## VS Code에서 수동 설정

Intlayer 확장 프로그램을 사용하지 않는 경우, [**vscode-glspc**](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter)와 같은 범용 LSP 클라이언트 확장 프로그램을 사용하거나 직접 작은 확장 프로그램을 작성하여 언어 서버를 수동으로 연결할 수 있습니다. 권장하는 방법은 Intlayer 확장 프로그램을 사용하는 것입니다.

참고로, 서버는 stdio를 통해 `intlayer-lsp` 바이너리를 실행합니다.

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

Intlayer 확장 프로그램은 이러한 설정을 읽어 서버를 시작합니다. 확장 프로그램에만 의존하는 경우 수동 설정은 필요하지 않습니다.

---

## Cursor에서 설정

[Cursor](https://www.cursor.com/)는 AI 기능이 내장된 VS Code 포크입니다. 동일한 확장 프로그램 생태계를 사용하므로 **Intlayer VS Code 확장 프로그램**이 추가 설정 없이 작동합니다. 한 번 설치하면 Cursor가 자동으로 이를 감지합니다.

수동 설정을 선호하는 경우 Cursor도 작업 영역 루트에서 `.vscode/settings.json`을 읽으므로 위의 VS Code 스니펫이 그대로 적용됩니다.

---

## Windsurf에서 설정

[Windsurf](https://windsurf.com/)(Codeium 제공)는 또 다른 VS Code 기반 에디터입니다. VS Code 마켓플레이스에서 Intlayer 확장 프로그램을 설치하면 VS Code 및 Cursor에서와 마찬가지로 언어 서버가 자동으로 활성화됩니다.

수동 설정의 경우 프로젝트 루트에 `.vscode/settings.json`을 생성하십시오.

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

---

## Zed에서 설정

[Zed](https://zed.dev/)는 언어 설정을 통해 네이티브 LSP 지원을 제공합니다. Zed 사용자 설정(`~/.config/zed/settings.json`)에 항목을 추가합니다.

```json fileName="~/.config/zed/settings.json"
{
  "lsp": {
    "intlayer-lsp": {
      "binary": {
        "path": "npx",
        "arguments": ["--yes", "@intlayer/lsp"]
      }
    }
  },
  "languages": {
    "TypeScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "TSX": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "JavaScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Vue.js": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Svelte": {
      "language_servers": ["intlayer-lsp", "..."]
    }
  }
}
```

`"..."` 자리 표시자는 Zed에 Intlayer 서버와 함께 기본 언어 서버를 유지하도록 지시합니다.

---

## AI 에이전트 CLI (Claude Code, Codex 등) 설정

**Claude Code**는 뛰어난 LSP 플러그인 지원을 제공합니다. 위의 [Claude Code 플러그인으로 설정](#claude-code-플러그인으로-설정)에 따라 터미널 세션에서 직접 정의로 이동 기능을 완전히 경험해 보십시오.

**OpenAI Codex** 및 기타 터미널 기반 도구는 아직 LSP 클라이언트로 작동하지 않으며, 지속적인 언어 서버 세션을 유지하는 대신 파일을 직접 읽고 씁니다. 이러한 도구들의 경우 LSP를 실행하는 이점은 간접적으로 발생합니다. 동반 에디터(VS Code, Cursor, Windsurf 등)에서 서버가 활성화되면 에디터의 라이브 인덱스가 에디터 제공 컨텍스트(예: Cursor Composer, Windsurf Cascade, GitHub Copilot Chat)를 통해 쿼리할 수 있는 모든 AI 에이전트에 제공됩니다.

에디터를 열지 않고 터미널에서만 작업하는 경우 백그라운드에서 언어 서버를 시작하여 나중에 동일한 작업 영역에 연결하는 에디터에 대비할 수 있습니다.

```bash
# 백그라운드에서 서버 실행 상태 유지
npx @intlayer/lsp &
```

---

## Neovim에서 수동 설정

[nvim-lspconfig](https://github.com/neovim/nvim-lspconfig)를 사용하여 사용자 정의 서버 설정을 등록합니다.

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- 전역 설치를 피하기 위해 npx로 서버를 시작
      cmd = { 'npx', '--yes', '@intlayer/lsp' },
      filetypes = {
        'typescript',
        'typescriptreact',
        'javascript',
        'javascriptreact',
        'vue',
        'svelte',
      },
      root_dir = lspconfig.util.root_pattern(
        'intlayer.config.ts',
        'intlayer.config.js',
        'package.json'
      ),
    },
  }
end

lspconfig.intlayer_lsp.setup({})
```

Neovim을 다시 시작한 후 Intlayer 키 위에서 `gd`를 누르면 정의로 이동이 호출됩니다.

---

## 기타 에디터에서 수동 설정

Language Server Protocol을 지원하는 모든 에디터에서 `@intlayer/lsp`를 사용할 수 있습니다. 서버 사양은 다음과 같습니다.

- **전송** – Node.js IPC / stdio (표준)
- **실행 파일** – `npx @intlayer/lsp` (또는 로컬에 설치된 `intlayer-lsp` 바이너리)
- **기능** – `definitionProvider: true`, `textDocumentSync: Incremental`

에디터의 정확한 설정 형식(예: [coc.nvim](https://github.com/neoclide/coc.nvim)의 `languageserver.json` 또는 [Helix](https://helix-editor.com)의 LSP 클라이언트 설정)은 에디터 설명서를 참조하십시오.

### 예시: coc.nvim

```json fileName="~/.config/nvim/coc-settings.json"
{
  "languageserver": {
    "intlayer": {
      "command": "npx",
      "args": ["@intlayer/lsp"],
      "filetypes": [
        "typescript",
        "typescriptreact",
        "javascript",
        "javascriptreact",
        "vue",
        "svelte"
      ],
      "rootPatterns": [
        "intlayer.config.ts",
        "intlayer.config.js",
        "package.json"
      ]
    }
  }
}
```

### 예시: Helix

```toml fileName="~/.config/helix/languages.toml"
[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]
```

---

## 작동 원리

서버가 시작되면 `getConfiguration()`을 사용하여 작업 영역 루트에서 Intlayer 설정을 해제합니다. 이를 통해 컴파일된 사전을 찾는 데 필요한 `build` 및 `system` 경로를 얻습니다.

각 **정의로 이동** 요청 시:

1. 서버는 열려 있는 문서의 전체 텍스트를 읽습니다.
2. 정규 표현식을 사용하여 게터 호출(`useIntlayer`, `getIntlayer` 등)을 검색합니다.
3. 커서 위치가 이러한 호출 중 하나 내부인지 확인합니다.
4. 만약 그렇다면 사전 키(정규식 캡처 그룹 3)를 추출하고 `getUnmergedDictionaries()`를 호출하여 해당 키를 선언하는 각 콘텐츠 파일의 위치를 찾습니다.
5. 일치하는 각 파일을 읽고 `key: "<key>"`를 포함하는 정확한 행을 찾아 커서를 정확하게 배치합니다.
6. `Location` 객체 배열(소스 파일당 하나)을 반환합니다.

설정은 세션마다 캐시되고 지연 해제되며, 새로운 작업 영역 폴더를 열 때 등 매 `initialize` 요청 시 재설정됩니다.

---

## 문제 해결

| 증상                        | 예상 원인                  | 해결 방법                                                                    |
| --------------------------- | -------------------------- | ---------------------------------------------------------------------------- |
| 정의로 이동이 작동하지 않음 | 서버가 실행 중이 아님      | `@intlayer/lsp`가 설치되어 있고 에디터가 이를 실행하고 있는지 확인하십시오   |
| 잘못된 작업 영역 루트 감지  | 여러 작업 영역 폴더        | `intlayer.config.ts`가 포함된 폴더가 첫 번째 작업 영역 폴더인지 확인하십시오 |
| 키 정의를 찾을 수 없음      | 설정이 해제되지 않음       | 작업 영역 루트에 `intlayer.config.ts`(또는 `.js`)가 존재하는지 확인하십시오  |
| 시작 시 서버 작동 중단      | Node.js 버전이 너무 오래됨 | Node.js ≥ 14.18이 필요합니다                                                 |
