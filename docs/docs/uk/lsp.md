---
createdAt: 2025-06-07
updatedAt: 2026-05-31
title: LSP-сервер Intlayer
description: Дізнайтеся, як мовний сервер Intlayer надає функцію «Перейти до визначення» та інші можливості IDE для useIntlayer, getIntlayer та пов'язаних викликів у всіх підтримуваних редакторах.
keywords:
  - LSP
  - Мовний сервер
  - Перейти до визначення
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
author: aymericzip
---

# LSP-сервер Intlayer

**Мовний сервер Intlayer (LSP)** — це реалізація [протоколу мовного сервера (LSP)](https://microsoft.github.io/language-server-protocol/), яка розширює можливості вашої IDE за допомогою інтелектуальних функцій, адаптованих під Intlayer. Наразі він надає функцію **Перейти до визначення (Go to Definition)** для викликів ключів словника, дозволяючи переходити безпосередньо з `useIntlayer("my-key")` у вашому компоненті до файлу `.content.ts`, який його оголошує.

---

## Навіщо використовувати LSP?

При використанні Intlayer зв'язок між викликом на кшталт `useIntlayer("homepage")` та його оголошенням у `src/homepage.content.ts` є неявним. Без інструментів вам доведеться шукати файл вручну. LSP робить цей зв'язок явним:

**Розуміння ШІ-агентами**

ШІ-агенти для кодингу (Cursor, Windsurf, GitHub Copilot, Claude Code, Codex) покладаються на мовний сервер для вирішення символів та розуміння зв'язків між файлами. За запущеного Intlayer LSP агенти можуть відстежувати шлях від `useIntlayer("key")` до місця оголошення ключа, отримуючи точний контекст про доступні ключі контенту, структуру кожного словника та про те, які файли слід читати чи редагувати.

**Перейти до визначення**

Помістіть курсор на будь-який рядок із ключем словника всередині підтримуваного виклику геттера та натисніть `F12` (або `Cmd/Ctrl+клік`). Редактор відкриє файл оголошення контенту і помістить курсор на рядок `key:`.

**Підтримка об'єднаних словників**

Ключ може бути розділений між кількома файлами контенту (Intlayer об'єднує їх). Сервер повертає одне місцеположення (`Location`) на кожен вихідний файл, щоб ви могли перейти до кожного оголошення.

**Працює всюди**

Підтримує всі пакети `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `adonis-intlayer`, `intlayer`).

### Підтримувані виклики геттерів

Сервер виявляє наступні виклики функцій та витягує перший строковий літерал як ключ словника:

| Функція       | Приклад                       |
| ------------- | ----------------------------- |
| `useIntlayer` | `useIntlayer("hero")`         |
| `getIntlayer` | `getIntlayer("hero", locale)` |

Дженерики TypeScript та додаткові аргументи ігноруються — важливий лише ключ.

> `useDictionary` та `getDictionary` приймають уже імпортований об'єкт `Dictionary` як перший аргумент замість строкового ключа, тому вони не підтримують функцію «Перейти до визначення» та не відстежуються сервером.

---

## Встановлення

LSP-сервер поширюється у складі пакета `@intlayer/lsp`:

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

Пакет надає бінарний файл `intlayer-lsp`, який редактори використовують як виконуваний файл сервера.

---

## Налаштування як плагіна Claude Code

Intlayer LSP доступний як **плагін Claude Code**, розміщений безпосередньо в репозиторії Intlayer на GitHub. Його встановлення дає Claude Code нативну підтримку функції «Перейти до визначення» для всіх викликів `useIntlayer` / `getIntlayer`.

### 1. Встановіть бінарний файл мовного сервера

```bash packageManager="npm"
npm install -g @intlayer/lsp
```

```bash packageManager="yarn"
yarn global add @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add -g @intlayer/lsp
```

Це помістить виконуваний файл `intlayer-lsp` у ваш PATH, який викликається записом `lspServers` у плагіні.

### 2. Зареєструйте маркетплейс Intlayer та встановіть плагін

```bash
claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
claude plugin enable intlayer-lsp@intlayer
```

Claude Code додасть `"intlayer-lsp@intlayer": true` до списку ваших `enabledPlugins` і автоматично запустить мовний сервер для підтримуваних типів файлів (`.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`).

### 3. Увімкніть інструмент LSP (якщо він ще не активний)

Деякі версії Claude Code вимагають встановлення прапорця функції LSP. Додайте наступне до вашого файлу `~/.claude/settings.json`, якщо перехід до визначення не працює після встановлення:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

Перезапустіть Claude Code — тепер він буде використовувати `goToDefinition`, `findReferences` та інші операції LSP при навігації по вашому коду Intlayer замість повернення до `grep`.

---

## Налаштування у VS Code (через розширення — рекомендується)

Якщо у вас встановлено [розширення Intlayer для VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension), мовний сервер запускається автоматично. Ніякого додаткового налаштування не потрібно. LSP безпосередньо інтегровано в розширення VSCode, починаючи з версії 8.12.0.

> Інструкції зі встановлення та опис інших функцій див. у [документації розширення VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Ручне налаштування у VS Code

Якщо ви не використовуєте розширення Intlayer, ви можете підключити мовний сервер вручну, використовуючи універсальне розширення клієнта LSP, таке як [**vscode-glspc**](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter), або написавши власне невелике розширення. Рекомендований підхід — використовувати розширення Intlayer.

Для довідки, сервер запускається через бінарний файл `intlayer-lsp` через stdio:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

Розширення Intlayer зчитує ці налаштування для запуску сервера. Якщо ви використовуєте лише розширення, ручні налаштування не потрібні.

---

## Налаштування в Cursor

[Cursor](https://www.cursor.com/) — це форк VS Code з вбудованими функціями ШІ. Він використовує ту саму екосистему розширень, тому **розширення Intlayer для VS Code** працює без додаткового налаштування — встановіть його один раз, і Cursor підхопить його автоматично.

Якщо ви віддаєте перевагу ручному налаштуванню, Cursor також зчитує файл `.vscode/settings.json` з кореня робочої області, тому наведений вище фрагмент коду для VS Code застосовується безпосередньо.

---

## Налаштування в Windsurf

[Windsurf](https://windsurf.com/) (від Codeium) — ще один редактор на базі VS Code. Встановіть розширення Intlayer з VS Code Marketplace, і мовний сервер активується автоматично, точно так само, як у VS Code та Cursor.

Для ручного налаштування створіть файл `.vscode/settings.json` у корені проекту:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

---

## Налаштування в Zed

[Zed](https://zed.dev/) має вбудовану підтримку LSP через налаштування мови. Додайте запис у користувацькі налаштування Zed (`~/.config/zed/settings.json`):

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

Плейсхолдер `"..."` вказує Zed зберігати стандартні мовні сервери разом із сервером Intlayer.

---

## Налаштування для інтерфейсів командного рядка ШІ-агентів (Claude Code, Codex тощо)

**Claude Code** має першокласну підтримку плагінів LSP — дотримуйтесь інструкцій з [налаштування плагіна Claude Code](#налаштування-як-плагіна-claude-code) вище, щоб отримати повноцінну функцію «Перейти до визначення» прямо в сесіях термінала.

**OpenAI Codex** та інші консольні інструменти поки не працюють як клієнти LSP — вони безпосередньо читають і записують файли, а не підтримують постійний сеанс мовного сервера. Для цих інструментів цінність працюючого LSP виявляється опосередковано: коли сервер активний у супутньому редакторі (VS Code, Cursor, Windsurf тощо), його живий індекс доступний будь-якому ШІ-агенту, який може запитати його через контекст редактора (наприклад, Cursor Composer, Windsurf Cascade, GitHub Copilot Chat).

Якщо ви працюєте виключно в терміналі без відкритого редактора, ви можете запустити мовний сервер у фоновому режимі, щоб він був готовий до підключення будь-якого редактора:

```bash
# Підтримувати сервер активним у фоновому режимі
npx @intlayer/lsp &
```

---

## Ручне налаштування в Neovim

Використовуючи [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), зареєструйте користувацьку конфігурацію сервера:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Запуск сервера за допомогою npx, щоб не потрібне було глобальне встановлення
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

Після перезапуску Neovim натискання `gd` на ключі Intlayer викличе функцію переходу до визначення.

---

## Ручне налаштування в інших редакторах

Будь-який редактор із підтримкою Language Server Protocol може використовувати `@intlayer/lsp`. Характеристики сервера:

- **Транспорт** – Node.js IPC / stdio (стандартний)
- **Виконуваний файл** – `npx @intlayer/lsp` (або локально встановлений бінарний файл `intlayer-lsp`)
- **Можливості** – `definitionProvider: true`, `textDocumentSync: Incremental`

Формат конфігурації для вашого редактора (наприклад, `languageserver.json` для [coc.nvim](https://github.com/neoclide/coc.nvim) або налаштування клієнта LSP в [Helix](https://helix-editor.com)) дивіться в його документації.

### Приклад: coc.nvim

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

## Як це працює

При запуску сервер зчитує конфігурацію Intlayer з кореня робочої області за допомогою `getConfiguration()`. Це вказує йому шляхи `build` та `system`, необхідні для пошуку скомпільованих словників.

На кожен запит **Перейти до визначення**:

1. Сервер зчитує весь текст відкритого документа.
2. Він сканує виклики геттерів (`useIntlayer`, `getIntlayer` тощо) за допомогою регулярного вираження.
3. Він перевіряє, чи потрапляє позиція курсора всередину одного з цих викликів.
4. Якщо потрапляє, він витягує ключ словника (група захоплення 3 регулярного вираження) і викликає `getUnmergedDictionaries()` для пошуку кожного файлу контенту, який оголошує цей ключ.
5. Він зчитує кожен відповідний файл і знаходить точний рядок із `key: "<key>"`, щоб точно позиціонувати курсор.
6. Він повертає масив об'єктів `Location` — по одному на кожен вихідний файл.

Конфігурація вирішується ліниво і кешується для кожного сеансу; вона скидається при кожному запиті `initialize` (наприклад, при відкритті нової папки робочої області).

---

## Усунення неполадок

| Симптом                                   | Можлива причина              | Вирішення                                                                         |
| ----------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------- |
| Перейти до визначення нічого не робить    | Сервер не запущений          | Переконайтеся, що `@intlayer/lsp` встановлений і редактор запускає його           |
| Невірний корінь робочої області           | Кілька папок робочої області | Переконайтеся, що папка з `intlayer.config.ts` є першою папкою робочої області    |
| Визначення не знайдено для ключа          | Конфігурація не вчинена      | Переконайтеся, що `intlayer.config.ts` (або `.js`) існує в корені робочої області |
| Сервер аварійно завершує роботу на старті | Занадто стара версія Node.js | Потрібен Node.js ≥ 14.18                                                          |
