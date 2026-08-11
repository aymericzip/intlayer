---
createdAt: 2025-06-07
updatedAt: 2026-08-10
title: LSP-сервер Intlayer
description: Узнайте, как языковой сервер Intlayer добавляет переход к определению, поиск ссылок, всплывающие подсказки, автодополнение ключей и диагностику в вашу IDE и вашего ИИ-агента.
keywords:
  - LSP
  - Языковой сервер
  - Go to Definition
  - Автодополнение
  - Диагностика
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
    changes: "Добавлены поиск ссылок, всплывающие подсказки, автодополнение и диагностика"
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# LSP-сервер Intlayer

**Языковой сервер Intlayer** — это реализация [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/), которая делает вашу IDE — и вашего ИИ-агента — осведомлёнными об Intlayer. Он связывает вызов вида `useIntlayer("home")` с файлом `.content.ts`, который его объявляет, в обоих направлениях.

---

## Возможности

| Возможность               | Сочетание клавиш    | Что делает                                                                                              |
| ------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------- |
| **Перейти к определению** | `F12` / `Cmd+Клик`  | Перейти от ключа словаря или использования поля к его объявлению в файле контента                       |
| **Найти все ссылки**      | `Shift+F12`         | Из файла контента показать все места вызова, использующие этот ключ или поле                            |
| **Всплывающая подсказка** | навести курсор      | Посмотреть поля словаря или переведённое значение поля, не покидая файл                                 |
| **Автодополнение**        | `"` `'` `` ` `` `.` | Предлагать объявленные ключи словарей внутри геттера и поля контента после `.` или при деструктуризации |
| **Диагностика**           | автоматически       | Предупреждать, когда ключ не объявлен ни в одном файле контента                                         |

Стоит знать ещё о двух особенностях:

- **Объединённые словари** — ключ, разделённый между несколькими файлами контента, возвращает по одному результату на файл, поэтому вы можете перейти к каждому объявлению.
- **Поддержка монорепозиториев** — сервер находит _ближайший_ к каждому файлу `intlayer.config.*`, поэтому несколько проектов в одном рабочем пространстве получают собственные словари.

### Поддерживаемые вызовы

Ключ считывается либо из позиционного строкового аргумента, либо из объекта опций (`{ namespace }`, `{ id }`).

| Библиотека                  | Вызовы                                                   |
| --------------------------- | -------------------------------------------------------- |
| **Intlayer**                | `useIntlayer`, `getIntlayer`                             |
| **i18next / react-i18next** | `useTranslation`, `getFixedT`, `t`, `Trans`              |
| **next-intl / use-intl**    | `useTranslations`, `getTranslations`, `createTranslator` |
| **react-intl**              | `formatMessage`, `FormattedMessage`                      |
| **Lingui**                  | `useLingui`, `t`, `Trans`, `_`                           |
| **vue-i18n**                | `useI18n`                                                |

Это работает для каждого пакета `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `intlayer`), а также для пакетов-адаптеров совместимости, позволяющих сохранить существующий синтаксис i18n.

> Словари читаются из результата сборки, поэтому выполните `npx intlayer build` — или держите dev-сервер запущенным — чтобы серверу было что разрешать.

---

## Установка

Сервер поставляется как бинарный файл `intlayer-lsp` в составе `@intlayer/lsp`:

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

Установите его глобально (`npm install -g @intlayer/lsp`), если вашему редактору нужен `intlayer-lsp` в `PATH` — это относится к плагину Claude Code и к любой конфигурации ниже, которая вызывает бинарный файл напрямую.

---

## Настройка

<Tabs defaultTab="vscode">
  <Tab label="VS Code" value="vscode">

Установите [расширение Intlayer для VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension). Языковой сервер входит в него начиная с v8.12.0 и запускается автоматически — **настройка не требуется**.

Другие возможности описаны в [документации расширения VS Code](https://intlayer.org/doc/vs-code-extension).

  </Tab>
  <Tab label="Cursor / Windsurf" value="cursor">

[Cursor](https://www.cursor.com/) и [Windsurf](https://windsurf.com/) — форки VS Code, использующие ту же экосистему расширений. Установите [расширение Intlayer для VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) один раз, и сервер активируется автоматически — **настройка не требуется**.

  </Tab>
  <Tab label="Claude Code" value="claude-code">

Intlayer поставляет **плагин для Claude Code**, размещённый в репозитории Intlayer. Он даёт Claude Code настоящее разрешение символов для ваших ключей словарей вместо отката к `grep`.

Поместите бинарный файл в `PATH`, затем зарегистрируйте маркетплейс и установите плагин:

```bash
npm install -g @intlayer/lsp

claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
```

`install` также включает плагин. **Перезапустите Claude Code** — языковые серверы загружаются при старте, поэтому до перезапуска плагин не действует.

После этого Claude Code запускает сервер для файлов `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.astro` и `.svelte` и использует `goToDefinition`, `findReferences` и `hover` при навигации по коду.

Если переход к определению всё ещё не работает, ваша версия Claude Code может скрывать инструмент LSP за флагом:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

  </Tab>
  <Tab label="Zed" value="zed">

Zed имеет встроенную поддержку LSP. Добавьте сервер в пользовательские настройки:

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

Заполнитель `"..."` сохраняет языковые серверы Zed по умолчанию рядом с сервером Intlayer.

  </Tab>
  <Tab label="Neovim" value="neovim">

С помощью [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) зарегистрируйте пользовательскую конфигурацию сервера:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Запускать сервер через npx, чтобы не требовалась глобальная установка
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

После перезапуска Neovim `gd` на ключе словаря выполняет переход к определению, а `gr` — поиск ссылок.

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
  <Tab label="Другие редакторы" value="other">

Любой редактор с поддержкой LSP может запускать `@intlayer/lsp`. Укажите ему:

- **Исполняемый файл** — `npx @intlayer/lsp` или бинарный файл `intlayer-lsp`
- **Транспорт** — stdio (стандартный)
- **Возможности** — `definitionProvider`, `referencesProvider`, `hoverProvider`, `completionProvider` (символы-триггеры `"` `'` `` ` `` `.`), push-диагностика, `textDocumentSync: Incremental`
- **Шаблоны корня** — `intlayer.config.ts`, `intlayer.config.js`, `package.json`

Точный формат конфигурации смотрите в документации LSP вашего редактора.

  </Tab>
</Tabs>

---

## Примечание об ИИ-агентах в терминале

**Claude Code** работает как полноценный LSP-клиент — см. вкладку выше.

**OpenAI Codex** и большинство других терминальных инструментов не являются LSP-клиентами: они читают и пишут файлы напрямую. Запуск сервера сам по себе им не поможет; польза появляется, когда он активен в сопутствующем редакторе, чей индекс агент может запрашивать (Cursor Composer, Windsurf Cascade, Copilot Chat).

---

## Как это работает

Для каждого файла сервер находит ближайший `intlayer.config.*` и загружает конфигурацию этого проекта, чтобы найти скомпилированные словари. Конфигурация, словари и список исходных файлов кешируются с коротким TTL и сбрасываются при изменении отслеживаемого файла контента.

При запросе сервер разбирает документ (через [oxc](https://oxc.rs/)) и анализирует позицию курсора:

1. **На строке ключа** (`useIntlayer("home")`) → возвращает каждый файл контента, объявляющий этот ключ, с позицией на строке `key:`.
2. **На использовании поля** (`content.title`, деструктурированное свойство, `t('path.to.field')`, `<Trans>`, …) → возводит переменную обратно к её словарю и возвращает соответствующее поле внутри файлов контента.
3. **Из файла контента** → выполняет обратный поиск, просматривая исходники проекта в поисках мест вызова этого ключа или поля.

---

## Устранение неполадок

| Симптом                                      | Вероятная причина                 | Решение                                                                      |
| -------------------------------------------- | --------------------------------- | ---------------------------------------------------------------------------- |
| Ничего не происходит                         | Сервер не запущен                 | Убедитесь, что `@intlayer/lsp` установлен и редактор его запускает           |
| Работает в редакторе, но не в Claude Code    | Плагин установлен во время сессии | Перезапустите Claude Code — языковые серверы загружаются при старте          |
| Определения для ключа не найдены             | Словари не собраны                | Выполните `npx intlayer build` или запустите dev-сервер                      |
| Все ключи отмечены как необъявленные         | Конфигурация не разрешена         | Проверьте, что `intlayer.config.ts` (или `.js`) есть в корне проекта         |
| В монорепозитории используется не тот проект | Нет конфигурации в пакете         | Добавьте `intlayer.config.*` в каждый пакет, объявляющий собственный контент |
| Сервер падает при запуске                    | Слишком старая версия Node.js     | Требуется Node.js ≥ 14.18                                                    |

В VS Code сервер пишет логи в **Вид → Вывод → «Intlayer LSP»** — это помогает убедиться, какая конфигурация была разрешена и сколько словарей найдено.
