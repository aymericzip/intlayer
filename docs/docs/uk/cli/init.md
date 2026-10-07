---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: "intlayer init: налаштування Intlayer у проєкті"
description: "Запустіть intlayer init, щоб додати Intlayer до наявного проєкту: команда визначить фреймворк, встановить пакети й запише конфігурацію."
keywords:
  - Ініціалізація
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 9.5.13
    date: 2026-09-29
    changes: "init лише встановлює пакети й налаштовує фреймворк; додано окрему підкоманду для кожного кроку; --interactive завершується помилкою без термінала"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Додати підкоманду init infra"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Додано опцію --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Додано вміст команди init"
author: aymericzip
---

# Ініціалізація Intlayer

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Команда `init` встановлює пакети Intlayer і налаштовує ваш фреймворк (файл конфігурації, TypeScript, плагін бандлера, middleware/proxy, провайдери). Це рекомендований спосіб почати роботу з Intlayer.

Усе інше (CI-воркфлоу, AI-скіли, MCP-сервер, інструменти редактора, правила лінтера, CMS, інфраструктура) вмикається за бажанням: виберіть це в чек-листі `--interactive` або запустіть окрему підкоманду (див. нижче).

## Аліаси (Aliases):

- `npx intlayer init`

## Аргументи (Arguments):

- `--project-root [projectRoot]` - Опціонально. Вкажіть кореневу директорію проєкту. Якщо не вказано, команда шукатиме корінь проєкту, починаючи з поточної робочої директорії.
- `--no-gitignore` - Опціонально. Пропускає автоматичне оновлення файлу `.gitignore`. Якщо цей прапорець встановлено, `.intlayer` не буде додано до `.gitignore`.
- `--no-framework-setup` - Необов'язково. Лише встановлює пакети, не змінюючи файли проєкту.
- `--routing <routing>` - Необов'язково. Маршрутизація локалей: `prefix-no-default` (за замовчуванням), `prefix-all`, `no-prefix`, `search-params` або `none`.
- `--content <layout>` - Необов'язково. Як оголошується контент:
  - `multilingual` - `{fileName}.content.{ts,json}` поруч із компонентом, усі локалі в одному файлі (задає `compiler.output`).
  - `per-locale` - `{fileName}.{locale}.content.{ts,json}` поруч із компонентом (задає `compiler.output` і `dictionary.locale`).
  - `centralized` - один каталог `/locales/{locale}.{json,po}` на локаль (додає плагін `syncJSON` / `syncPO`).
  - `namespaces` - каталоги `/locales/{locale}/{namespace}.{json,po}` (додає плагін `syncJSON` / `syncPO`).
- `--content-format <format>` - Необов'язково, з `--content`. `ts` або `json` для `multilingual` / `per-locale`, `json` або `po` для `centralized` / `namespaces`. За замовчуванням перший.
- `-i, --interactive` - Необов'язково. Виберіть кроки налаштування з чек-листа (пакети, CI, скіли, MCP, VS Code, LSP, лінтер, CMS, інфраструктура, …) замість набору за замовчуванням. Потрібен термінал: без нього (AI-агент, CI) команда завершується помилкою й виводить список підкоманд, які треба запустити натомість.
- `--no-github-actions` - Необов'язково. З `--interactive` ніколи не створює воркфлоу GitHub Actions, навіть якщо їх вибрано.

## Що вона робить:

Команда `init` виконує наступні завдання з налаштування:

1. **Перевірка структури проєкту** - Переконується, що ви перебуваєте в коректній директорії проєкту з файлом `package.json`.
2. **Встановлює пакети** - Встановлює відсутні для вашого стеку пакети Intlayer (наприклад, `react-intlayer`, `vite-intlayer`) і оновлює застарілі.
3. **Оновлення `.gitignore`** - Додає `.intlayer` до вашого файлу `.gitignore`, щоб виключити згенеровані файли з системи контролю версій (можна пропустити за допомогою `--no-gitignore`).
4. **Конфігурація TypeScript** - Оновлює будь-які файли `tsconfig.json`, щоб включити визначення типів Intlayer (`.intlayer/**/*.ts`).
5. **Створення файлу конфігурації** - Генерує `intlayer.config.ts` (для проєктів на TypeScript) або `intlayer.config.mjs` (для проєктів на JavaScript) з налаштуваннями за замовчуванням.
6. **Оновлює конфігурацію бандлера / фреймворка** - Додає плагін Intlayer до конфігурації Vite, Next.js, Nuxt, Astro, …, і створює middleware/proxy та провайдери, якщо фреймворк це підтримує.

## Налаштування по одному кроку

Кожен крок чек-листа `--interactive` має власну підкоманду. Вони нічого не питають, якщо значення передано прапорцями, тож їх можна безпечно запускати з AI-агента або CI-завдання.

| Команда                                                               | Що налаштовує                                                                                |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `intlayer init packages`                                              | Встановлює відсутні пакети Intlayer і оновлює застарілі                                      |
| `intlayer init project [--routing <routing>] [--content <layout>]`    | Файл конфігурації, TypeScript, плагін бандлера, middleware/proxy, провайдери та `.gitignore` |
| `intlayer init github-actions`                                        | Воркфлоу GitHub Actions `fill` і `test`                                                      |
| `intlayer init vscode-extension`                                      | Рекомендує розширення Intlayer у `.vscode/extensions.json`                                   |
| `intlayer init lsp`                                                   | Мовний сервер Intlayer у `.vscode/settings.json`                                             |
| `intlayer init eslint`                                                | Правила лінтера Intlayer (ESLint / oxlint), якщо в проєкті вже є лінтер                      |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | Документацію Intlayer у вигляді скілів для AI-агентів                                        |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | MCP-сервер Intlayer                                                                          |
| `intlayer init extension [--browser <chrome/firefox>]`                | Відкриває сторінку розширення Intlayer для браузера в магазині                               |
| `intlayer init cms`                                                   | Вхід в Intlayer CMS через браузер і збереження облікових даних у `.env`                      |
| `intlayer init infra --mode <desktop/docker/compose>`                 | Десктопний застосунок або self-hosted стек                                                   |

### З AI-агента або CI-завдання

Оболонка AI-агента не має термінала, тому відповісти на запитання неможливо. Використайте команду за замовчуванням, а потім потрібні підкоманди:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

Без термінала:

- `init skills` встановлює скіли, що відповідають вашому стеку, якщо не задано `--skills` (наприклад, `--skills Usage Content React`).
- `init skills` і `init mcp` використовують виявлену AI-платформу (Claude Code, Cursor, VS Code, Windsurf, …), якщо не задано `--platform`, і завершуються помилкою зі списком платформ, якщо жодну не виявлено.
- `init mcp` використовує транспорт `stdio`, якщо не задано `--transport`.
- `init infra` вимагає `--mode`, а `init extension` лише виводить посилання на магазин, якщо не задано `--browser`.

MCP-сервер завжди налаштовується всередині проєкту (для Claude Code у `.mcp.json`).

## Приклади:

### Базова ініціалізація:

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Це ініціалізує Intlayer у поточній директорії з автоматичним визначенням кореня проєкту.

### Ініціалізація з користувацьким коренем проєкту:

```bash packageManager="npm"
npx intlayer init --project-root ./my-project
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./my-project
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./my-project
```

```bash packageManager="bun"
bun x intlayer init --project-root ./my-project
```

Це ініціалізує Intlayer у вказаній директорії.

### Ініціалізація без оновлення .gitignore:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

Це налаштує всі файли конфігурації, але не змінить ваш файл `.gitignore`.

### Налаштування інфраструктури (десктопний застосунок або власний хостинг):

```bash
npx intlayer init infra
```

Завантажує та запускає інсталятор (`https://intlayer.org/install.sh`, або `install.ps1` на Windows), який запитує, як ви хочете запускати Intlayer:

- **Десктопний застосунок** - встановлює нативну панель керування на ваш комп'ютер, підключену до Intlayer Cloud.
- **All-in-one Docker** - панель керування + API + MongoDB + Redis + MinIO в одному контейнері.
- **Docker Compose** - один контейнер на сервіс для масштабованого власного хостингу.

Пропустіть меню за допомогою `--mode`:

```bash
npx intlayer init infra --mode compose
```

Цей же крок пропонується через `npx intlayer init --interactive`. Дивіться [довідку `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/infra.md) щодо налаштувань інсталятора та [посібник із власного хостингу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md) щодо того, що налаштовує кожен режим.

- [довідку `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/infra.md)
- [посібник із власного хостингу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md)

## Приклад виводу:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Примітки:

- Команда є ідемпотентною - ви можете безпечно запускати її кілька разів. Вже налаштовані кроки будуть пропущені.
- Якщо файл конфігурації вже існує, він не буде перезаписаний.
- Конфігурації TypeScript без масиву `include` (наприклад, конфігурації у стилі solution з посиланнями) пропускаються.
- Команда зупиниться з помилкою, якщо в корені проєкту не буде знайдено `package.json`.
