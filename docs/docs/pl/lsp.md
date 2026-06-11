---
createdAt: 2025-06-07
updatedAt: 2026-05-31
title: Serwer Intlayer LSP
description: Dowiedz się, jak serwer językowy Intlayer zapewnia funkcję "Przejdź do definicji" i inne funkcje IDE dla useIntlayer, getIntlayer oraz powiązanych wywołań we wszystkich obsługiwanych edytorach.
keywords:
  - LSP
  - Serwer Językowy
  - Przejdź do definicji
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
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Serwer Intlayer LSP

**Serwer Językowy Intlayer (LSP)** to implementacja protokołu [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/), która wzbogaca Twoje IDE o inteligencję rozumiejącą strukturę Intlayer. Obecnie zapewnia funkcję **Przejdź do definicji (Go to Definition)** dla wywołań kluczy słownika, umożliwiając bezpośrednie przejście od `useIntlayer("my-key")` w komponencie do pliku `.content.ts`, który go deklaruje.

---

## Dlaczego warto używać LSP?

Gdy używasz Intlayer, połączenie między wywołaniem takim jak `useIntlayer("homepage")` a jego deklaracją w `src/homepage.content.ts` jest niejawne. Bez odpowiednich narzędzi musisz szukać tego pliku ręcznie. LSP sprawia, że to powiązanie staje się jawne:

**Świadomość agentów AI**

Agenci kodujący AI (Cursor, Windsurf, GitHub Copilot, Claude Code, Codex) polegają na serwerze językowym w celu rozpoznawania symboli i rozumienia relacji między plikami. Dzięki uruchomionemu Intlayer LSP agenci mogą śledzić wywołanie `useIntlayer("key")` z powrotem do jego deklaracji, co daje im dokładny kontekst dotyczący dostępnych kluczy treści, struktury każdego słownika oraz plików do odczytu lub edycji.

**Przejdź do definicji**

Umieść kursor na dowolnym ciągu klucza słownika wewnątrz obsługiwanego wywołania pobierającego i naciśnij `F12` (lub `Cmd/Ctrl+Kliknięcie`). Edytor otworzy plik deklaracji treści i ustawi kursor w linii `key:`.

**Obsługa scalonych słowników**

Klucz może być podzielony na wiele plików treści (Intlayer scala je). Serwer zwraca jedną lokalizację (`Location`) na plik źródłowy, dzięki czemu możesz przejść do każdej deklaracji.

**Działa wszędzie**

Obsługuje wszystkie pakiety `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `adonis-intlayer`, `intlayer`).

### Obsługiwane wywołania pobierające

Serwer wykrywa następujące wywołania funkcji i wyodrębnia pierwszy argument jako klucz słownika:

| Funkcja       | Przykład                      |
| ------------- | ----------------------------- |
| `useIntlayer` | `useIntlayer("hero")`         |
| `getIntlayer` | `getIntlayer("hero", locale)` |

Typy generyczne TypeScript oraz dodatkowe argumenty są ignorowane — liczy się tylko klucz słownika.

> Funkcje `useDictionary` i `getDictionary` przyjmują jako pierwszy argument już zaimportowany obiekt `Dictionary`, a nie klucz tekstowy, dlatego nie korzystają z funkcji Przejdź do definicji i nie są śledzone przez serwer.

---

## Instalacja

Serwer LSP jest dystrybuowany jako część pakietu `@intlayer/lsp`:

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

Pakiet udostępnia plik wykonywalny `intlayer-lsp`, którego edytory używają jako serwera.

---

## Konfiguracja jako plugin Claude Code

Serwer Intlayer LSP jest dostępny jako **plugin Claude Code** hostowany bezpośrednio w repozytorium GitHub Intlayer. Jego instalacja daje Claude Code natywną świadomość funkcji Przejdź do definicji dla wszystkich wywołań `useIntlayer` / `getIntlayer`.

### 1. Zainstaluj plik wykonywalny serwera językowego

```bash packageManager="npm"
npm install -g @intlayer/lsp
```

```bash packageManager="yarn"
yarn global add @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add -g @intlayer/lsp
```

To polecenie umieści plik binarny `intlayer-lsp` w Twojej ścieżce PATH, co jest wywoływane przez wpis `lspServers` w pluginie.

### 2. Zarejestruj rynek Intlayer i zainstaluj plugin

```bash
claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
claude plugin enable intlayer-lsp@intlayer
```

Claude Code doda `"intlayer-lsp@intlayer": true` do Twoich `enabledPlugins` i automatycznie uruchomi serwer językowy dla obsługiwanych typów plików (`.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`).

### 3. Włącz narzędzie LSP (jeśli nie jest jeszcze aktywne)

Niektóre wersje Claude Code wymagają ustawienia flagi funkcji LSP. Dodaj poniższy wpis do pliku `~/.claude/settings.json`, jeśli funkcja Przejdź do definicji nie działa po instalacji:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

Uruchom ponownie Claude Code — od teraz będzie on używał `goToDefinition`, `findReferences` oraz innych operacji LSP podczas nawigacji po kodzie Intlayer zamiast powracać do `grep`.

---

## Konfiguracja w VS Code (przez rozszerzenie — zalecane)

Jeśli masz zainstalowane [rozszerzenie Intlayer dla VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension), serwer językowy uruchomi się automatycznie. Nie jest wymagana żadna dodatkowa konfiguracja. LSP jest bezpośrednio zintegrowany z rozszerzeniem VSCode od wersji 8.12.0.

> Zobacz [dokumentację rozszerzenia VS Code](https://intlayer.org/doc/vs-code-extension) w celu uzyskania szczegółów instalacji i innych funkcji.

---

## Ręczna konfiguracja w VS Code

Jeśli nie używasz rozszerzenia Intlayer, możesz połączyć serwer językowy ręcznie, korzystając z ogólnego rozszerzenia klienta LSP, takiego jak [**vscode-glspc**](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter) lub pisząc własne małe rozszerzenie. Zalecanym podejściem jest użycie oficjalnego rozszerzenia Intlayer.

Dla odniesienia, serwer uruchamia się za pomocą pliku binarnego `intlayer-lsp` przez stdio:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

Rozszerzenie Intlayer odczytuje te ustawienia, aby uruchomić serwer. Jeśli polegasz wyłącznie na rozszerzeniu, konfiguracja ręczna nie jest potrzebna.

---

## Konfiguracja w Cursor

[Cursor](https://www.cursor.com/) to fork VS Code z wbudowanymi funkcjami AI. Korzysta z tego samego ekosystemu rozszerzeń, więc **rozszerzenie Intlayer dla VS Code** działa bez żadnej dodatkowej konfiguracji — zainstaluj je raz, a Cursor wykryje je automatycznie.

Jeśli wolisz ręczną konfigurację, Cursor odczytuje również plik `.vscode/settings.json` z katalogu głównego obszaru roboczego, więc powyższy fragment kodu dla VS Code ma zastosowanie bezpośrednio.

---

## Konfiguracja w Windsurf

[Windsurf](https://windsurf.com/) (stworzony przez Codeium) to kolejny edytor oparty na VS Code. Zainstaluj rozszerzenie Intlayer z VS Code Marketplace, a serwer językowy aktywuje się automatycznie, dokładnie tak samo jak w VS Code i Cursor.

W przypadku ręcznej konfiguracji utwórz plik `.vscode/settings.json` w katalogu głównym projektu:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

---

## Konfiguracja w Zed

[Zed](https://zed.dev/) posiada natywną obsługę LSP poprzez swoje ustawienia językowe. Dodaj wpis do ustawień użytkownika Zed (`~/.config/zed/settings.json`):

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

Znak zastępczy `"..."` informuje edytor Zed, aby zachował domyślne serwery językowe obok serwera Intlayer.

---

## Konfiguracja dla AI Agent CLI (Claude Code, Codex itp.)

**Claude Code** posiada pierwszorzędną obsługę pluginów LSP — postępuj zgodnie z instrukcjami w sekcji [Konfiguracja jako plugin Claude Code](#konfiguracja-jako-plugin-claude-code) powyżej, aby uzyskać pełną funkcjonalność Przejdź do definicji bezpośrednio w sesjach terminala.

**OpenAI Codex** oraz inne narzędzia konsolowe nie działają jeszcze jako klienci LSP — odczytują i zapisują pliki bezpośrednio, zamiast utrzymywać trwałą sesję serwera językowego. Dla tych narzędzi wartość uruchomionego LSP pojawia się pośrednio: gdy serwer jest aktywny w towarzyszącym edytorze (VS Code, Cursor, Windsurf, ...), bieżący indeks edytora jest dostępny dla każdego agenta AI, który może odpytać go za pomocą dostarczonego przez edytor kontekstu (np. Cursor Composer, Windsurf Cascade, GitHub Copilot Chat).

Jeśli pracujesz wyłącznie w terminalu bez otwartego edytora, możesz uruchomić serwer językowy w tle, aby był gotowy na podłączenie dowolnego edytora do tego samego obszaru roboczego w przyszłości:

```bash
# Utrzymuj serwer aktywny w tle
npx @intlayer/lsp &
```

---

## Ręczna konfiguracja w Neovim

Używając [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), zarejestruj niestandardową konfigurację serwera:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Uruchom serwer za pomocą npx, aby uniknąć instalacji globalnej
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

Po ponownym uruchomieniu Neovim, naciśnięcie `gd` nad kluczem Intlayer wywoła funkcję Przejdź do definicji.

---

## Ręczna konfiguracja w innych edytorach

Każdy edytor obsługujący protokół Language Server Protocol może korzystać z `@intlayer/lsp`. Specyfikacja serwera:

- **Transport** – Node.js IPC / stdio (standard)
- **Plik wykonywalny** – `npx @intlayer/lsp` (lub lokalnie zainstalowany plik binarny `intlayer-lsp`)
- **Możliwości** – `definitionProvider: true`, `textDocumentSync: Incremental`

Skonsultuj się z dokumentacją LSP swojego edytora, aby uzyskać dokładny format konfiguracji (np. `languageserver.json` dla [coc.nvim](https://github.com/neoclide/coc.nvim) lub ustawienia klienta LSP w [Helix](https://helix-editor.com)).

### Przykład: coc.nvim

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

### Przykład: Helix

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

## Jak to działa

Gdy serwer się uruchamia, odczytuje konfigurację Intlayer z głównego katalogu obszaru roboczego za pomocą `getConfiguration()`. Daje mu to ścieżki `build` i `system` niezbędne do znalezienia skompilowanych słowników.

Przy każdym żądaniu **Przejdź do definicji**:

1. Serwer odczytuje pełny tekst otwartego dokumentu.
2. Skanuje w poszukiwaniu wywołań pobierających (`useIntlayer`, `getIntlayer` itp.) za pomocą wyrażenia regularnego.
3. Sprawdza, czy pozycja kursora znajduje się wewnątrz jednego z tych wywołań.
4. Jeśli tak, wyodrębnia klucz słownika (grupa przechwytująca 3 wyrażenia regularnego) i wywołuje `getUnmergedDictionaries()`, aby zlokalizować każdy plik treści, który deklaruje ten klucz.
5. Odczytuje każdy pasujący plik i znajduje dokładną linię zawierającą `key: "<klucz>"`, aby precyzyjnie ustawić kursor.
6. Zwraca tablicę obiektów `Location` — po jednym na plik źródłowy.

Konfiguracja jest pobierana leniwie (lazy) i buforowana na sesję; resetuje się przy każdym żądaniu `initialize` (np. przy otwarciu nowego folderu obszaru roboczego).

---

## Rozwiązywanie problemów

| Symptom                              | Prawdopodobna przyczyna            | Rozwiązanie                                                                                       |
| ------------------------------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| Przejdź do definicji nic nie robi    | Serwer nie działa                  | Sprawdź, czy `@intlayer/lsp` jest zainstalowany i czy edytor go uruchamia                         |
| Wykryto nieprawidłowy katalog główny | Wiele folderów w obszarze roboczym | Upewnij się, że folder zawierający `intlayer.config.ts` jest pierwszym folderem obszaru roboczego |
| Nie znaleziono definicji dla klucza  | Konfiguracja nie została wczytana  | Sprawdź, czy `intlayer.config.ts` (lub `.js`) istnieje w katalogu głównym obszaru roboczego       |
| Serwer ulega awarii przy starcie     | Wersja Node.js jest zbyt stara     | Wymaga Node.js ≥ 14.18                                                                            |
