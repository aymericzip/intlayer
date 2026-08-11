---
createdAt: 2025-06-07
updatedAt: 2026-08-10
title: Intlayer LSP 서버
description: Intlayer 언어 서버가 정의로 이동, 참조 찾기, 호버 미리보기, 키 자동 완성, 진단 기능을 IDE와 AI 에이전트에 제공하는 방법을 알아보세요.
keywords:
  - LSP
  - 언어 서버
  - Go to Definition
  - 자동 완성
  - 진단
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 9.1.3
    date: 2026-08-10
    changes: "참조 찾기, 호버, 자동 완성, 진단 추가"
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# Intlayer LSP 서버

**Intlayer 언어 서버**는 IDE와 AI 에이전트가 Intlayer를 인식하도록 만드는 [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) 구현입니다. `useIntlayer("home")` 같은 호출과 이를 선언하는 `.content.ts` 파일을 양방향으로 연결합니다.

---

## 기능

| 기능               | 단축키              | 설명                                                                            |
| ------------------ | ------------------- | ------------------------------------------------------------------------------- |
| **정의로 이동**    | `F12` / `Cmd+클릭`  | 사전 키 또는 필드 사용처에서 콘텐츠 파일의 선언으로 이동합니다                  |
| **모든 참조 찾기** | `Shift+F12`         | 콘텐츠 파일에서 해당 키나 필드를 사용하는 모든 호출 지점을 나열합니다           |
| **호버**           | 커서 올리기         | 파일을 벗어나지 않고 사전의 필드나 필드의 번역 값을 미리 봅니다                 |
| **자동 완성**      | `"` `'` `` ` `` `.` | 게터 안에서 선언된 사전 키를, `.` 뒤나 구조 분해에서는 콘텐츠 필드를 제안합니다 |
| **진단**           | 자동                | 어떤 콘텐츠 파일에도 선언되지 않은 키를 경고합니다                              |

알아 두면 좋은 동작이 두 가지 더 있습니다.

- **병합된 사전** — 여러 콘텐츠 파일에 나뉜 키는 파일마다 하나씩 결과를 반환하므로 모든 선언으로 이동할 수 있습니다.
- **모노레포 지원** — 서버는 각 파일에서 _가장 가까운_ `intlayer.config.*`를 해석하므로, 한 워크스페이스의 여러 프로젝트가 각자의 사전을 갖습니다.

### 지원되는 호출

키는 위치 기반 문자열 인자 또는 옵션 객체(`{ namespace }`, `{ id }`)에서 읽습니다.

| 라이브러리                  | 호출                                                     |
| --------------------------- | -------------------------------------------------------- |
| **Intlayer**                | `useIntlayer`, `getIntlayer`                             |
| **i18next / react-i18next** | `useTranslation`, `getFixedT`, `t`, `Trans`              |
| **next-intl / use-intl**    | `useTranslations`, `getTranslations`, `createTranslator` |
| **react-intl**              | `formatMessage`, `FormattedMessage`                      |
| **Lingui**                  | `useLingui`, `t`, `Trans`, `_`                           |
| **vue-i18n**                | `useI18n`                                                |

이는 모든 `*-intlayer` 패키지(`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `intlayer`)와, 기존 i18n 문법을 유지할 수 있게 해 주는 compat 어댑터 패키지에서 동작합니다.

> 사전은 빌드 결과물에서 읽으므로, 서버가 해석할 대상이 있도록 `npx intlayer build`를 실행하거나 개발 서버를 계속 켜 두세요.

---

## 설치

서버는 `@intlayer/lsp`에 포함된 `intlayer-lsp` 바이너리로 배포됩니다.

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

에디터가 `PATH`의 `intlayer-lsp`를 필요로 한다면 대신 전역으로 설치하세요(`npm install -g @intlayer/lsp`). Claude Code 플러그인과 아래에서 바이너리를 직접 호출하는 모든 설정이 여기에 해당합니다.

---

## 설정

<Tabs defaultTab="vscode">
  <Tab label="VS Code" value="vscode">

[Intlayer VS Code 확장](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)을 설치하세요. 언어 서버는 v8.12.0부터 포함되어 있으며 자동으로 시작됩니다 — **설정이 필요 없습니다**.

다른 기능은 [VS Code 확장 문서](https://intlayer.org/doc/vs-code-extension)를 참고하세요.

  </Tab>
  <Tab label="Cursor / Windsurf" value="cursor">

[Cursor](https://www.cursor.com/)와 [Windsurf](https://windsurf.com/)는 VS Code 포크로 동일한 확장 생태계를 사용합니다. [Intlayer VS Code 확장](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)을 한 번 설치하면 서버가 자동으로 활성화됩니다 — **설정이 필요 없습니다**.

  </Tab>
  <Tab label="Claude Code" value="claude-code">

Intlayer는 Intlayer 저장소에서 호스팅되는 **Claude Code 플러그인**을 제공합니다. 이를 통해 Claude Code는 `grep`에 의존하는 대신 사전 키에 대한 실제 심볼 해석을 수행합니다.

바이너리를 `PATH`에 두고, 마켓플레이스를 등록한 뒤 플러그인을 설치하세요.

```bash
npm install -g @intlayer/lsp

claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
```

`install`은 플러그인 활성화도 함께 수행합니다. **Claude Code를 재시작하세요** — 언어 서버는 시작 시 로드되므로 그전까지는 플러그인이 적용되지 않습니다.

이후 Claude Code는 `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.astro`, `.svelte` 파일에서 서버를 시작하고, 코드를 탐색할 때 `goToDefinition`, `findReferences`, `hover`를 사용합니다.

정의로 이동이 여전히 동작하지 않는다면, 사용 중인 Claude Code 버전이 LSP 도구를 플래그 뒤에 두고 있을 수 있습니다.

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

  </Tab>
  <Tab label="Zed" value="zed">

Zed는 LSP를 기본 지원합니다. 사용자 설정에 서버를 추가하세요.

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
    "TypeScript": { "language_servers": ["intlayer-lsp", "..."] },
    "TSX": { "language_servers": ["intlayer-lsp", "..."] },
    "JavaScript": { "language_servers": ["intlayer-lsp", "..."] },
    "Vue.js": { "language_servers": ["intlayer-lsp", "..."] },
    "Svelte": { "language_servers": ["intlayer-lsp", "..."] }
  }
}
```

`"..."` 자리 표시자는 Zed의 기본 언어 서버를 Intlayer 서버와 함께 유지합니다.

  </Tab>
  <Tab label="Neovim" value="neovim">

[nvim-lspconfig](https://github.com/neovim/nvim-lspconfig)로 사용자 정의 서버 구성을 등록하세요.

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- 전역 설치가 필요 없도록 npx로 서버를 실행
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

Neovim을 재시작하면 사전 키 위에서 `gd`는 정의로 이동을, `gr`은 참조 찾기를 실행합니다.

  </Tab>
  <Tab label="coc.nvim" value="coc">

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

  </Tab>
  <Tab label="Helix" value="helix">

```toml fileName="~/.config/helix/languages.toml"
[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]

[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]
```

  </Tab>
  <Tab label="기타 에디터" value="other">

LSP를 지원하는 모든 에디터에서 `@intlayer/lsp`를 실행할 수 있습니다. 다음을 지정하세요.

- **실행 파일** — `npx @intlayer/lsp` 또는 `intlayer-lsp` 바이너리
- **전송 방식** — stdio(표준)
- **기능** — `definitionProvider`, `referencesProvider`, `hoverProvider`, `completionProvider`(트리거 문자 `"` `'` `` ` `` `.`), 푸시 진단, `textDocumentSync: Incremental`
- **루트 패턴** — `intlayer.config.ts`, `intlayer.config.js`, `package.json`

정확한 설정 형식은 사용 중인 에디터의 LSP 문서를 확인하세요.

  </Tab>
</Tabs>

---

## 터미널 AI 에이전트에 대한 참고

**Claude Code**는 실제 LSP 클라이언트로 동작합니다 — 위 탭을 참고하세요.

**OpenAI Codex**를 비롯한 대부분의 터미널 도구는 LSP 클라이언트가 아니며 파일을 직접 읽고 씁니다. 서버만 단독으로 실행해도 도움이 되지 않습니다. 에이전트가 색인을 조회할 수 있는 보조 에디터(Cursor Composer, Windsurf Cascade, Copilot Chat)에서 서버가 활성화되어 있을 때 가치가 생깁니다.

---

## 동작 방식

서버는 파일마다 가장 가까운 `intlayer.config.*`를 찾아 해당 프로젝트의 설정을 불러오고 컴파일된 사전을 찾습니다. 설정, 사전, 소스 파일 목록은 짧은 TTL로 캐시되며, 감시 중인 콘텐츠 파일이 변경되면 무효화됩니다.

요청이 오면 서버는 ([oxc](https://oxc.rs/)로) 문서를 파싱하고 커서 위치를 살펴봅니다.

1. **키 문자열 위**(`useIntlayer("home")`) → 해당 키를 선언한 모든 콘텐츠 파일을 `key:` 줄에 위치시켜 반환합니다.
2. **필드 사용처 위**(`content.title`, 구조 분해된 속성, `t('path.to.field')`, `<Trans>` 등) → 변수를 사전까지 거슬러 해석하고 콘텐츠 파일 내의 해당 필드를 반환합니다.
3. **콘텐츠 파일에서** → 역방향 조회를 수행하여 해당 키나 필드의 호출 지점을 프로젝트 소스에서 찾습니다.

---

## 문제 해결

| 증상                                        | 가능한 원인               | 해결                                                                 |
| ------------------------------------------- | ------------------------- | -------------------------------------------------------------------- |
| 아무 일도 일어나지 않음                     | 서버가 실행되지 않음      | `@intlayer/lsp`가 설치되어 있고 에디터가 이를 실행하는지 확인하세요  |
| 에디터에서는 되지만 Claude Code에서는 안 됨 | 세션 도중에 플러그인 설치 | Claude Code를 재시작하세요 — 언어 서버는 시작 시 로드됩니다          |
| 키의 정의를 찾지 못함                       | 사전이 빌드되지 않음      | `npx intlayer build`를 실행하거나 개발 서버를 시작하세요             |
| 모든 키가 미선언으로 보고됨                 | 설정이 해석되지 않음      | 프로젝트 루트에 `intlayer.config.ts`(또는 `.js`)가 있는지 확인하세요 |
| 모노레포에서 잘못된 프로젝트가 사용됨       | 패키지별 설정 누락        | 자체 콘텐츠를 선언하는 각 패키지에 `intlayer.config.*`를 추가하세요  |
| 시작 시 서버가 충돌함                       | Node.js 버전이 너무 낮음  | Node.js 14.18 이상이 필요합니다                                      |

VS Code에서 서버는 **보기 → 출력 → "Intlayer LSP"**에 로그를 남깁니다. 어떤 설정이 해석되었고 사전이 몇 개 발견되었는지 확인하는 데 유용합니다.
