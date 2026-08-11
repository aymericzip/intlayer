---
createdAt: 2025-06-07
updatedAt: 2026-08-10
title: LSP-сервер Intlayer
description: Дізнайтеся, як мовний сервер Intlayer додає перехід до визначення, пошук посилань, спливаючі підказки, автодоповнення ключів і діагностику до вашої IDE та вашого ШІ-агента.
keywords:
  - LSP
  - Мовний сервер
  - Go to Definition
  - Автодоповнення
  - Діагностика
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
    changes: "Додано пошук посилань, спливаючі підказки, автодоповнення та діагностику"
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# LSP-сервер Intlayer

**Мовний сервер Intlayer** — це реалізація [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/), яка робить вашу IDE — і вашого ШІ-агента — обізнаними про Intlayer. Він пов’язує виклик на кшталт `useIntlayer("home")` із файлом `.content.ts`, який його оголошує, в обидва боки.

---

## Можливості

| Можливість                | Комбінація клавіш   | Що робить                                                                                                      |
| ------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Перейти до визначення** | `F12` / `Cmd+Клік`  | Перейти від ключа словника або використання поля до його оголошення у файлі контенту                           |
| **Знайти всі посилання**  | `Shift+F12`         | З файлу контенту показати всі місця виклику, що використовують цей ключ або поле                               |
| **Спливаюча підказка**    | навести курсор      | Переглянути поля словника або перекладене значення поля, не залишаючи файл                                     |
| **Автодоповнення**        | `"` `'` `` ` `` `.` | Пропонувати оголошені ключі словників усередині ґетера та поля контенту після `.` або під час деструктуризації |
| **Діагностика**           | автоматично         | Попереджати, коли ключ не оголошено в жодному файлі контенту                                                   |

Варто знати ще про дві особливості:

- **Об’єднані словники** — ключ, розділений між кількома файлами контенту, повертає по одному результату на файл, тож ви можете перейти до кожного оголошення.
- **Підтримка монорепозиторіїв** — сервер знаходить _найближчий_ до кожного файлу `intlayer.config.*`, тож кілька проєктів в одному робочому просторі отримують власні словники.

### Підтримувані виклики

Ключ зчитується або з позиційного рядкового аргументу, або з об’єкта опцій (`{ namespace }`, `{ id }`).

| Бібліотека                  | Виклики                                                  |
| --------------------------- | -------------------------------------------------------- |
| **Intlayer**                | `useIntlayer`, `getIntlayer`                             |
| **i18next / react-i18next** | `useTranslation`, `getFixedT`, `t`, `Trans`              |
| **next-intl / use-intl**    | `useTranslations`, `getTranslations`, `createTranslator` |
| **react-intl**              | `formatMessage`, `FormattedMessage`                      |
| **Lingui**                  | `useLingui`, `t`, `Trans`, `_`                           |
| **vue-i18n**                | `useI18n`                                                |

Це працює для кожного пакета `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `intlayer`), а також для пакетів-адаптерів сумісності, які дозволяють зберегти наявний синтаксис i18n.

> Словники читаються з результату збірки, тож виконайте `npx intlayer build` — або тримайте dev-сервер запущеним — щоб серверу було що розв’язувати.

---

## Встановлення

Сервер постачається як бінарний файл `intlayer-lsp` у складі `@intlayer/lsp`:

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

Встановіть його глобально (`npm install -g @intlayer/lsp`), якщо вашому редактору потрібен `intlayer-lsp` у `PATH` — це стосується плагіна Claude Code та будь-якої конфігурації нижче, що викликає бінарний файл напряму.

---

## Налаштування

<Tabs defaultTab="vscode">
  <Tab label="VS Code" value="vscode">

Встановіть [розширення Intlayer для VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension). Мовний сервер входить до нього починаючи з v8.12.0 і запускається автоматично — **налаштування не потрібне**.

Інші можливості описано в [документації розширення VS Code](https://intlayer.org/doc/vs-code-extension).

  </Tab>
  <Tab label="Cursor / Windsurf" value="cursor">

[Cursor](https://www.cursor.com/) і [Windsurf](https://windsurf.com/) — форки VS Code, що використовують ту саму екосистему розширень. Встановіть [розширення Intlayer для VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) один раз, і сервер активується автоматично — **налаштування не потрібне**.

  </Tab>
  <Tab label="Claude Code" value="claude-code">

Intlayer постачає **плагін для Claude Code**, розміщений у репозиторії Intlayer. Він дає Claude Code справжнє розв’язання символів для ваших ключів словників замість відкоту до `grep`.

Помістіть бінарний файл у `PATH`, потім зареєструйте маркетплейс і встановіть плагін:

```bash
npm install -g @intlayer/lsp

claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
```

`install` також вмикає плагін. **Перезапустіть Claude Code** — мовні сервери завантажуються під час старту, тож до перезапуску плагін не діє.

Після цього Claude Code запускає сервер для файлів `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.astro` та `.svelte` і використовує `goToDefinition`, `findReferences` та `hover` під час навігації кодом.

Якщо перехід до визначення досі не працює, ваша версія Claude Code може приховувати інструмент LSP за прапорцем:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

  </Tab>
  <Tab label="Zed" value="zed">

Zed має вбудовану підтримку LSP. Додайте сервер до користувацьких налаштувань:

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

Заповнювач `"..."` зберігає стандартні мовні сервери Zed поряд із сервером Intlayer.

  </Tab>
  <Tab label="Neovim" value="neovim">

За допомогою [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) зареєструйте власну конфігурацію сервера:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Запускати сервер через npx, щоб не потребувати глобального встановлення
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

Після перезапуску Neovim `gd` на ключі словника виконує перехід до визначення, а `gr` — пошук посилань.

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
  <Tab label="Інші редактори" value="other">

Будь-який редактор із підтримкою LSP може запускати `@intlayer/lsp`. Укажіть йому:

- **Виконуваний файл** — `npx @intlayer/lsp` або бінарний файл `intlayer-lsp`
- **Транспорт** — stdio (стандартний)
- **Можливості** — `definitionProvider`, `referencesProvider`, `hoverProvider`, `completionProvider` (символи-тригери `"` `'` `` ` `` `.`), push-діагностика, `textDocumentSync: Incremental`
- **Шаблони кореня** — `intlayer.config.ts`, `intlayer.config.js`, `package.json`

Точний формат конфігурації дивіться в документації LSP вашого редактора.

  </Tab>
</Tabs>

---

## Примітка про ШІ-агентів у терміналі

**Claude Code** працює як повноцінний LSP-клієнт — див. вкладку вище.

**OpenAI Codex** і більшість інших термінальних інструментів не є LSP-клієнтами: вони читають і пишуть файли напряму. Запуск сервера сам по собі їм не допоможе; користь з’являється, коли він активний у супутньому редакторі, чий індекс агент може запитувати (Cursor Composer, Windsurf Cascade, Copilot Chat).

---

## Як це працює

Для кожного файлу сервер знаходить найближчий `intlayer.config.*` і завантажує конфігурацію цього проєкту, щоб знайти скомпільовані словники. Конфігурація, словники та список вихідних файлів кешуються з коротким TTL і скидаються при зміні відстежуваного файлу контенту.

На запит сервер розбирає документ (через [oxc](https://oxc.rs/)) і аналізує позицію курсора:

1. **На рядку ключа** (`useIntlayer("home")`) → повертає кожен файл контенту, що оголошує цей ключ, із позицією на рядку `key:`.
2. **На використанні поля** (`content.title`, деструктуризована властивість, `t('path.to.field')`, `<Trans>`, …) → зводить змінну назад до її словника й повертає відповідне поле у файлах контенту.
3. **З файлу контенту** → виконує зворотний пошук, переглядаючи джерела проєкту в пошуках місць виклику цього ключа або поля.

---

## Усунення несправностей

| Симптом                                     | Ймовірна причина                 | Рішення                                                                    |
| ------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------- |
| Нічого не відбувається                      | Сервер не запущено               | Переконайтеся, що `@intlayer/lsp` встановлено і редактор його запускає     |
| Працює в редакторі, але не в Claude Code    | Плагін встановлено під час сесії | Перезапустіть Claude Code — мовні сервери завантажуються під час старту    |
| Визначення для ключа не знайдено            | Словники не зібрано              | Виконайте `npx intlayer build` або запустіть dev-сервер                    |
| Усі ключі позначені як неоголошені          | Конфігурацію не розв’язано       | Перевірте, що `intlayer.config.ts` (або `.js`) є в корені проєкту          |
| У монорепозиторії використано не той проєкт | Немає конфігурації в пакеті      | Додайте `intlayer.config.*` до кожного пакета, що оголошує власний контент |
| Сервер падає при запуску                    | Застара версія Node.js           | Потрібен Node.js ≥ 14.18                                                   |

У VS Code сервер пише логи у **Вигляд → Вивід → «Intlayer LSP»** — це допомагає з’ясувати, яку конфігурацію було розв’язано і скільки словників знайдено.
