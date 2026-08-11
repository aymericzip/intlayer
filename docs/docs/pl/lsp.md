---
createdAt: 2025-06-07
updatedAt: 2026-08-10
title: Serwer LSP Intlayer
description: Dowiedz się, jak serwer języka Intlayer wnosi przejście do definicji, wyszukiwanie referencji, podglądy po najechaniu kursorem, autouzupełnianie kluczy i diagnostykę do Twojego IDE oraz agenta AI.
keywords:
  - LSP
  - Serwer języka
  - Go to Definition
  - Autouzupełnianie
  - Diagnostyka
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
    changes: "Dodano wyszukiwanie referencji, podgląd po najechaniu, autouzupełnianie i diagnostykę"
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# Serwer LSP Intlayer

**Serwer języka Intlayer** to implementacja [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/), która sprawia, że Twoje IDE — i Twój agent AI — rozumieją Intlayer. Łączy wywołanie takie jak `useIntlayer("home")` z plikiem `.content.ts`, który je deklaruje, w obie strony.

---

## Funkcje

| Funkcja                         | Skrót               | Opis                                                                                                             |
| ------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Przejdź do definicji**        | `F12` / `Cmd+Klik`  | Przejście od klucza słownika lub użycia pola do jego deklaracji w pliku treści                                   |
| **Znajdź wszystkie referencje** | `Shift+F12`         | Z pliku treści wypisanie każdego miejsca wywołania używającego tego klucza lub pola                              |
| **Podgląd (hover)**             | najedź kursorem     | Podgląd pól słownika lub przetłumaczonej wartości pola bez opuszczania pliku                                     |
| **Autouzupełnianie**            | `"` `'` `` ` `` `.` | Podpowiadanie zadeklarowanych kluczy słowników wewnątrz gettera oraz pól treści po `.` lub przy destrukturyzacji |
| **Diagnostyka**                 | automatycznie       | Ostrzeżenie, gdy klucz nie jest zadeklarowany w żadnym pliku treści                                              |

Warto znać dwa dodatkowe zachowania:

- **Scalone słowniki** — klucz podzielony na kilka plików treści zwraca jeden wynik na plik, dzięki czemu możesz przejść do każdej deklaracji.
- **Obsługa monorepo** — serwer rozwiązuje _najbliższy_ każdemu plikowi `intlayer.config.*`, dzięki czemu wiele projektów w jednym obszarze roboczym ma własne słowniki.

### Obsługiwane wywołania

Klucz jest odczytywany albo z pozycyjnego argumentu tekstowego, albo z obiektu opcji (`{ namespace }`, `{ id }`).

| Biblioteka                  | Wywołania                                                |
| --------------------------- | -------------------------------------------------------- |
| **Intlayer**                | `useIntlayer`, `getIntlayer`                             |
| **i18next / react-i18next** | `useTranslation`, `getFixedT`, `t`, `Trans`              |
| **next-intl / use-intl**    | `useTranslations`, `getTranslations`, `createTranslator` |
| **react-intl**              | `formatMessage`, `FormattedMessage`                      |
| **Lingui**                  | `useLingui`, `t`, `Trans`, `_`                           |
| **vue-i18n**                | `useI18n`                                                |

Działa to dla każdego pakietu `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `intlayer`) oraz dla pakietów adapterów compat, które pozwalają zachować dotychczasową składnię i18n.

> Słowniki są odczytywane z wyniku budowania, więc uruchom `npx intlayer build` — albo pozostaw działający serwer deweloperski — aby serwer miał co rozwiązywać.

---

## Instalacja

Serwer jest dostarczany jako binarium `intlayer-lsp` w pakiecie `@intlayer/lsp`:

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

Zainstaluj go globalnie (`npm install -g @intlayer/lsp`), jeśli Twój edytor wymaga `intlayer-lsp` w `PATH` — dotyczy to wtyczki Claude Code oraz każdej poniższej konfiguracji wywołującej binarium bezpośrednio.

---

## Konfiguracja

<Tabs defaultTab="vscode">
  <Tab label="VS Code" value="vscode">

Zainstaluj [rozszerzenie Intlayer dla VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension). Serwer języka jest w nim zawarty od wersji v8.12.0 i uruchamia się automatycznie — **konfiguracja nie jest wymagana**.

Pozostałe funkcje opisano w [dokumentacji rozszerzenia VS Code](https://intlayer.org/doc/vs-code-extension).

  </Tab>
  <Tab label="Cursor / Windsurf" value="cursor">

[Cursor](https://www.cursor.com/) i [Windsurf](https://windsurf.com/) to forki VS Code korzystające z tego samego ekosystemu rozszerzeń. Zainstaluj [rozszerzenie Intlayer dla VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) raz, a serwer aktywuje się automatycznie — **konfiguracja nie jest wymagana**.

  </Tab>
  <Tab label="Claude Code" value="claude-code">

Intlayer dostarcza **wtyczkę do Claude Code** hostowaną w repozytorium Intlayer. Daje ona Claude Code prawdziwe rozwiązywanie symboli dla Twoich kluczy słowników zamiast sięgania po `grep`.

Umieść binarium w `PATH`, następnie zarejestruj marketplace i zainstaluj wtyczkę:

```bash
npm install -g @intlayer/lsp

claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
```

`install` również włącza wtyczkę. **Zrestartuj Claude Code** — serwery języka wczytywane są przy starcie, więc wcześniej wtyczka nie działa.

Claude Code uruchomi wtedy serwer dla plików `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.astro` i `.svelte` oraz użyje `goToDefinition`, `findReferences` i `hover` podczas nawigacji po kodzie.

Jeśli przejście do definicji nadal nic nie robi, Twoja wersja Claude Code może ukrywać narzędzie LSP za flagą:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

  </Tab>
  <Tab label="Zed" value="zed">

Zed ma natywne wsparcie LSP. Dodaj serwer do ustawień użytkownika:

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

Symbol zastępczy `"..."` zachowuje domyślne serwery języka Zed obok serwera Intlayer.

  </Tab>
  <Tab label="Neovim" value="neovim">

Za pomocą [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) zarejestruj własną konfigurację serwera:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Uruchom serwer przez npx, aby nie wymagać instalacji globalnej
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

Po zrestartowaniu Neovima `gd` na kluczu słownika uruchamia Przejdź do definicji, a `gr` — Znajdź referencje.

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
  <Tab label="Inne edytory" value="other">

Każdy edytor obsługujący LSP może uruchomić `@intlayer/lsp`. Wskaż mu:

- **Plik wykonywalny** — `npx @intlayer/lsp` lub binarium `intlayer-lsp`
- **Transport** — stdio (standardowy)
- **Możliwości** — `definitionProvider`, `referencesProvider`, `hoverProvider`, `completionProvider` (znaki wyzwalające `"` `'` `` ` `` `.`), diagnostyka push, `textDocumentSync: Incremental`
- **Wzorce katalogu głównego** — `intlayer.config.ts`, `intlayer.config.js`, `package.json`

Dokładny format konfiguracji znajdziesz w dokumentacji LSP swojego edytora.

  </Tab>
</Tabs>

---

## Uwaga o agentach AI w terminalu

**Claude Code** działa jako prawdziwy klient LSP — zobacz zakładkę powyżej.

**OpenAI Codex** i większość innych narzędzi terminalowych nie są klientami LSP: czytają i zapisują pliki bezpośrednio. Samo uruchomienie serwera im nie pomoże; wartość pojawia się, gdy jest aktywny w towarzyszącym edytorze, którego indeks agent może odpytać (Cursor Composer, Windsurf Cascade, Copilot Chat).

---

## Jak to działa

Dla każdego pliku serwer lokalizuje najbliższy `intlayer.config.*` i wczytuje konfigurację tego projektu, aby znaleźć skompilowane słowniki. Konfiguracja, słowniki i lista plików źródłowych są buforowane z krótkim TTL i unieważniane, gdy zmieni się obserwowany plik treści.

Przy żądaniu serwer parsuje dokument (przez [oxc](https://oxc.rs/)) i bada pozycję kursora:

1. **Na ciągu klucza** (`useIntlayer("home")`) → zwraca każdy plik treści deklarujący ten klucz, ustawiony na jego linii `key:`.
2. **Na użyciu pola** (`content.title`, zdestrukturyzowana właściwość, `t('path.to.field')`, `<Trans>`, …) → sprowadza zmienną z powrotem do jej słownika i zwraca pasujące pole w plikach treści.
3. **Z pliku treści** → wykonuje wyszukiwanie odwrotne, przeszukując źródła projektu w poszukiwaniu miejsc wywołania tego klucza lub pola.

---

## Rozwiązywanie problemów

| Objaw                                       | Prawdopodobna przyczyna               | Rozwiązanie                                                                        |
| ------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------- |
| Nic się nie dzieje                          | Serwer nie działa                     | Sprawdź, czy `@intlayer/lsp` jest zainstalowany i czy edytor go uruchamia          |
| Działa w edytorze, ale nie w Claude Code    | Wtyczka zainstalowana w trakcie sesji | Zrestartuj Claude Code — serwery języka wczytują się przy starcie                  |
| Nie znaleziono definicji dla klucza         | Słowniki nie zostały zbudowane        | Uruchom `npx intlayer build` albo serwer deweloperski                              |
| Każdy klucz zgłaszany jako niezadeklarowany | Konfiguracja nierozwiązana            | Sprawdź, czy `intlayer.config.ts` (lub `.js`) istnieje w katalogu głównym projektu |
| W monorepo użyto niewłaściwego projektu     | Brak konfiguracji w pakiecie          | Dodaj `intlayer.config.*` do każdego pakietu deklarującego własną treść            |
| Serwer zawiesza się przy starcie            | Zbyt stara wersja Node.js             | Wymaga Node.js ≥ 14.18                                                             |

W VS Code serwer zapisuje logi w **Widok → Dane wyjściowe → „Intlayer LSP”** — przydatne, by potwierdzić, która konfiguracja została rozwiązana i ile słowników znaleziono.
