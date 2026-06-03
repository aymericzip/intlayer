---
createdAt: 2025-06-07
updatedAt: 2026-05-31
title: LSP-сервер Intlayer
description: Узнайте, как языковой сервер Intlayer предоставляет функцию «Перейти к определению» и другие функции IDE для useIntlayer, getIntlayer и связанных вызовов во всех поддерживаемых редакторах.
keywords:
  - LSP
  - Языковой сервер
  - Перейти к определению
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

# LSP-сервер Intlayer

**Языковой сервер Intlayer (LSP)** — это реализация [протокола языкового сервера (LSP)](https://microsoft.github.io/language-server-protocol/), которая расширяет возможности вашей IDE с помощью интеллектуальных функций, адаптированных под Intlayer. В настоящее время он поддерживает функцию **Перейти к определению (Go to Definition)** для вызовов ключей словаря, позволяя переходить прямо из вызова `useIntlayer("my-key")` в вашем компоненте к файлу `.content.ts`, в котором он объявлен.

---

## Зачем использовать LSP?

При использовании Intlayer связь между вызовом вроде `useIntlayer("homepage")` и его объявлением в `src/homepage.content.ts` является неявной. Без инструментов вам придется искать файл вручную. LSP делает эту связь явной:

**Понимание ИИ-агентами**

ИИ-агенты для кодинга (Cursor, Windsurf, GitHub Copilot, Claude Code, Codex) полагаются на языковой сервер для разрешения символов и понимания связей между файлами. При запущенном Intlayer LSP агенты могут отслеживать путь от `useIntlayer("key")` до места объявления ключа, получая точный контекст о доступных ключах контента, структуре каждого словаря и о том, какие файлы следует читать или редактировать.

**Перейти к определению**

Поместите курсор на любую строку с ключом словаря внутри поддерживаемого вызова геттера и нажмите `F12` (или `Cmd/Ctrl+клик`). Редактор откроет файл объявления контента и поместит курсор на строку `key:`.

**Поддержка объединенных словарей**

Ключ может быть разделен между несколькими файлами контента (Intlayer объединяет их). Сервер возвращает одно местоположение (`Location`) на каждый исходный файл, чтобы вы могли перейти к каждому объявлению.

**Работает везде**

Поддерживает все пакеты `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `adonis-intlayer`, `intlayer`).

### Поддерживаемые вызовы геттеров

Сервер обнаруживает следующие вызовы функций и извлекает первый строковый литерал в качестве ключа словаря:

| Функция       | Пример                        |
| ------------- | ----------------------------- |
| `useIntlayer` | `useIntlayer("hero")`         |
| `getIntlayer` | `getIntlayer("hero", locale)` |

Дженерики TypeScript и дополнительные аргументы игнорируются — важен только ключ.

> `useDictionary` и `getDictionary` принимают уже импортированный объект `Dictionary` в качестве первого аргумента вместо строкового ключа, поэтому они не поддерживают функцию «Перейти к определению» и не отслеживаются сервером.

---

## Установка

LSP-сервер распространяется в составе пакета `@intlayer/lsp`:

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

Пакет предоставляет бинарный файл `intlayer-lsp`, который редакторы используют в качестве исполняемого файла сервера.

---

## Настройка в качестве плагина Claude Code

Intlayer LSP доступен как **плагин Claude Code**, размещенный непосредственно в репозитории Intlayer на GitHub. Его установка дает Claude Code нативную поддержку функции «Перейти к определению» для всех вызовов `useIntlayer` / `getIntlayer`.

### 1. Установите бинарный файл языкового сервера

```bash packageManager="npm"
npm install -g @intlayer/lsp
```

```bash packageManager="yarn"
yarn global add @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add -g @intlayer/lsp
```

Это поместит исполняемый файл `intlayer-lsp` в ваш PATH, который вызывается записью `lspServers` в плагине.

### 2. Зарегистрируйте маркетплейс Intlayer и установите плагин

```bash
claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
claude plugin enable intlayer-lsp@intlayer
```

Claude Code добавит `"intlayer-lsp@intlayer": true` в список ваших `enabledPlugins` и автоматически запустит языковой сервер для поддерживаемых типов файлов (`.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`).

### 3. Включите инструмент LSP (если он еще не активен)

Некоторые версии Claude Code требуют установки флага функции LSP. Добавьте следующее в ваш файл `~/.claude/settings.json`, если переход к определению не работает после установки:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

Перезапустите Claude Code — теперь он будет использовать `goToDefinition`, `findReferences` и другие операции LSP при навигации по вашему коду Intlayer вместо возврата к `grep`.

---

## Настройка в VS Code (через расширение — рекомендуется)

Если у вас установлено [расширение Intlayer для VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension), языковой сервер запускается автоматически. Никакой дополнительной настройки не требуется. LSP напрямую интегрирован в расширение VSCode начиная с версии 8.12.0.

> Инструкции по установке и описание других функций см. в [документации расширения VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Ручная настройка в VS Code

Если вы не используете расширение Intlayer, вы можете подключить языковой сервер вручную, используя универсальное расширение клиента LSP, такое как [**vscode-glspc**](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter), или написав собственное небольшое расширение. Рекомендуемый подход — использовать расширение Intlayer.

Для справки, сервер запускается через бинарный файл `intlayer-lsp` через stdio:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

Расширение Intlayer считывает эти настройки для запуска сервера. Если вы используете только расширение, ручные настройки не требуются.

---

## Настройка в Cursor

[Cursor](https://www.cursor.com/) — это форк VS Code со встроенными функциями ИИ. Он использует ту же экосистему расширений, поэтому **расширение Intlayer для VS Code** работает без дополнительной настройки — установите его один раз, и Cursor подхватит его автоматически.

Если вы предпочитаете ручную настройку, Cursor также считывает файл `.vscode/settings.json` из корня рабочей области, поэтому приведенный выше фрагмент кода для VS Code применяется напрямую.

---

## Настройка в Windsurf

[Windsurf](https://windsurf.com/) (от Codeium) — еще один редактор на базе VS Code. Установите расширение Intlayer из VS Code Marketplace, и языковой сервер активируется автоматически, точно так же, как в VS Code и Cursor.

Для ручной настройки создайте файл `.vscode/settings.json` в корне проекта:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

---

## Настройка в Zed

[Zed](https://zed.dev/) имеет встроенную поддержку LSP через настройки языка. Добавьте запись в пользовательские настройки Zed (`~/.config/zed/settings.json`):

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

Плейсхолдер `"..."` указывает Zed сохранять стандартные языковые серверы вместе с сервером Intlayer.

---

## Настройка для интерфейсов командной строки ИИ-агентов (Claude Code, Codex и др.)

**Claude Code** имеет первоклассную поддержку плагинов LSP — следуйте инструкциям по [настройке плагина Claude Code](#настройка-в-качестве-плагина-claude-code) выше, чтобы получить полноценную функцию «Перейти к определению» прямо в сессиях терминала.

**OpenAI Codex** и другие консольные инструменты пока не работают как клиенты LSP — они напрямую читают и записывают файлы, а не поддерживают постоянный сеанс языкового сервера. Для этих инструментов ценность работающего LSP проявляется косвенно: когда сервер активен в сопутствующем редакторе (VS Code, Cursor, Windsurf и т. д.), его живой индекс доступен любому ИИ-агенту, который может запросить его через контекст редактора (например, Cursor Composer, Windsurf Cascade, GitHub Copilot Chat).

Если вы работаете исключительно в терминале без открытого редактора, вы можете запустить языковой сервер в фоновом режиме, чтобы он был готов к подключению любого редактора:

```bash
# Поддерживать сервер активным в фоновом режиме
npx @intlayer/lsp &
```

---

## Ручная настройка в Neovim

Используя [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), зарегистрируйте пользовательскую конфигурацию сервера:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Запуск сервера с помощью npx, чтобы не требовалась глобальная установка
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

После перезапуска Neovim нажатие `gd` на ключе Intlayer вызовет функцию перехода к определению.

---

## Ручная настройка в других редакторах

Любой редактор с поддержкой Language Server Protocol может использовать `@intlayer/lsp`. Характеристики сервера:

- **Транспорт** – Node.js IPC / stdio (стандартный)
- **Исполняемый файл** – `npx @intlayer/lsp` (или локально установленный бинарный файл `intlayer-lsp`)
- **Возможности** – `definitionProvider: true`, `textDocumentSync: Incremental`

Формат конфигурации для вашего редактора (например, `languageserver.json` для [coc.nvim](https://github.com/neoclide/coc.nvim) или настройки клиента LSP в [Helix](https://helix-editor.com)) смотрите в его документации.

### Пример: coc.nvim

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

### Пример: Helix

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

## Как это работает

При запуске сервер считывает конфигурацию Intlayer из корня рабочей области с помощью `getConfiguration()`. Это указывает ему пути `build` и `system`, необходимые для поиска скомпилированных словарей.

На каждый запрос **Перейти к определению**:

1. Сервер считывает весь текст открытого документа.
2. Он сканирует вызовы геттеров (`useIntlayer`, `getIntlayer` и т. д.) с помощью регулярного выражения.
3. Он проверяет, попадает ли позиция курсора внутрь одного из этих вызовов.
4. Если попадает, он извлекает ключ словаря (группа захвата 3 регулярного выражения) и вызывает `getUnmergedDictionaries()` для поиска каждого файла контента, объявляющего этот ключ.
5. Он считывает каждый соответствующий файл и находит точную строку с `key: "<key>"`, чтобы точно позиционировать курсор.
6. Он возвращает массив объектов `Location` — по одному на каждый исходный файл.

Конфигурация разрешается лениво и кэшируется для каждого сеанса; она сбрасывается при каждом запросе `initialize` (например, при открытии новой папки рабочей области).

---

## Устранение неполадок

| Симптом                                    | Возможная причина               | Решение                                                                            |
| ------------------------------------------ | ------------------------------- | ---------------------------------------------------------------------------------- |
| Перейти к определению ничего не делает     | Сервер не запущен               | Убедитесь, что `@intlayer/lsp` установлен и редактор запускает его                 |
| Неверный корень рабочей области            | Несколько папок рабочей области | Убедитесь, что папка с `intlayer.config.ts` является первой папкой рабочей области |
| Определения не найдены для ключа           | Конфигурация не разрешена       | Убедитесь, что `intlayer.config.ts` (или `.js`) существует в корне рабочей области |
| Сервер аварийно завершает работу на старте | Слишком старая версия Node.js   | Требуется Node.js ≥ 14.18                                                          |
