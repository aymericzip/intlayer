---
createdAt: 2026-01-06
updatedAt: 2026-01-06
title: Команда CI
description: Дізнайтеся, як використовувати команду Intlayer CI для запуску команд Intlayer з автоматично підставленими обліковими даними у CI/CD пайплайнах та монорепозиторіях.
keywords:
  - CI
  - CI/CD
  - Automation
  - Monorepo
  - Credentials
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - ci
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: "Додано команду CI"
author: aymericzip
---

# Команда CI

```bash packageManager="npm"
npx intlayer ci <command...>
```

```bash packageManager="yarn"
yarn intlayer ci <command...>
```

```bash packageManager="pnpm"
pnpm intlayer ci <command...>
```

```bash packageManager="bun"
bun x intlayer ci <command...>
```

Команда CI призначена для автоматизації та CI/CD-пайплайнів. Вона автоматично підставляє облікові дані зі змінної оточення `INTLAYER_PROJECT_CREDENTIALS` і може виконувати команди Intlayer для кількох проєктів у монорепозиторії.

## Як це працює

Команда CI працює в двох режимах:

1. **Режим одного проєкту**: Якщо поточний робочий каталог відповідає одному зі шляхів проєктів у `INTLAYER_PROJECT_CREDENTIALS`, команда запускається лише для цього конкретного проєкту.

2. **Режим ітерації**: Якщо контекст конкретного проєкту не виявлено, вона перебирає всі налаштовані проєкти й виконує команду для кожного з них.

## Змінна середовища

Команда вимагає встановленої змінної середовища `INTLAYER_PROJECT_CREDENTIALS`. Ця змінна повинна містити JSON-обʼєкт, який відображає шляхи проєктів на їхні облікові дані:

```json
{
  "packages/app": {
    "clientId": "your-client-id-1",
    "clientSecret": "your-client-secret-1"
  },
  "packages/admin": {
    "clientId": "your-client-id-2",
    "clientSecret": "your-client-secret-2"
  }
}
```

## Визначення менеджера пакетів

Команда CI автоматично визначає, який package manager використовується (npm, yarn, pnpm або bun) на основі змінної середовища `npm_config_user_agent` і використовує відповідну команду для запуску Intlayer.

## Аргументи

- **`<command...>`**: Команда Intlayer для виконання (наприклад, `fill`, `push`, `build`). Ви можете передати будь-яку команду Intlayer та її аргументи.

  > Приклад: `npx intlayer ci fill --verbose`
  >
  > Приклад: `npx intlayer ci push`
  >
  > Приклад: `npx intlayer ci build`

## Приклади

### Запустити команду в режимі одного проекту

Якщо ви перебуваєте в директорії проекту, що відповідає одному з шляхів у `INTLAYER_PROJECT_CREDENTIALS`:

```bash
cd packages/app
npx intlayer ci fill
```

Це запустить команду `fill` з автоматично підставленими обліковими даними для проєкту `packages/app`.

### Запустити команду для всіх проєктів

Якщо ви перебуваєте в каталозі, який не відповідає жодному шляху проєкту, команда пройде по всіх налаштованих проєктах:

```bash
cd /path/to/monorepo
npx intlayer ci push
```

Це виконає команду `push` для кожного проєкту, налаштованого в `INTLAYER_PROJECT_CREDENTIALS`.

### Передача додаткових прапорів

Ви можете передати будь-які прапори в базову команду Intlayer:

```bash packageManager="npm"
npx intlayer ci fill --verbose --mode complete
```

```bash packageManager="yarn"
yarn intlayer ci fill --verbose --mode complete
```

```bash packageManager="pnpm"
pnpm intlayer ci fill --verbose --mode complete
```

```bash packageManager="bun"
bun x intlayer ci fill --verbose --mode complete
```

### Використання в CI/CD пайплайнах

У вашій конфігурації CI/CD (наприклад, GitHub Actions, GitLab CI) встановіть `INTLAYER_PROJECT_CREDENTIALS` як секрет:

```yaml
# Приклад GitHub Actions
env:
  INTLAYER_PROJECT_CREDENTIALS: ${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}

steps:
  - name: Fill dictionaries
    run: npx intlayer ci fill
```

## Scaffolded GitHub Actions

Коли ви запустите `intlayer init`, Intlayer виявляє ваш package manager (npm, yarn, pnpm або bun) і створює два GitHub Actions workflows у `.github/workflows/` з командами, які відповідають цьому package manager:

- **`intlayer-fill.yml`** — На кожен pull request будує словники і запускає `intlayer fill --git-diff --mode complete` для генерування відсутніх перекладів для змінених словників, потім фіксує результат назад у гілку PR.
- **`intlayer-test.yml`** — На кожен pull request будує словники і запускає `intlayer test`, завершуючи перевірку з помилкою, коли обов'язкові мови не мають перекладів.

Існуючі файли workflows ніколи не перезаписуються. Щоб пропустити scaffolding повністю, запустіть:

```bash
npx intlayer init --no-github-actions
```

### Надання доступу до ШІ для робочого процесу заповнення

Сгенерований `intlayer-fill.yml` вимагає доступу до ШІ. Доступні два варіанти (налаштовуються в блоці `env` робочого процесу):

1. **Ваш власний ключ AI-провайдера** — Додайте секрет `AI_API_KEY` в налаштуваннях вашого репозиторію (Settings → Secrets and variables → Actions). Робочий процес передає його через `--provider`, `--model` та `--api-key`.
2. **Ключі доступу до Intlayer CMS** — Додайте секрети `INTLAYER_CLIENT_ID` та `INTLAYER_CLIENT_SECRET` і підключіть їх до секції `editor` вашого `intlayer.config`. Ключі доступу до CMS надають доступ до ШІ через backend Intlayer.

Робочий процес `intlayer-test.yml` не вимагає жодного доступу до ШІ.

## Обробка помилок

- Якщо `INTLAYER_PROJECT_CREDENTIALS` не встановлено, команда завершиться з помилкою.
- Якщо `INTLAYER_PROJECT_CREDENTIALS` не є валідним JSON, команда завершиться з помилкою.
- Якщо шлях до проекту не існує, він буде пропущений з попередженням.
- Якщо будь-який проект зазнає невдачі, команда завершиться з кодом стану, відмінним від нуля.

## Випадки використання

- **Автоматизація монорепо**: Виконувати команди Intlayer для кількох проектів у монорепозиторії
- **Конвеєри CI/CD**: Автоматизувати керування словниками в процесах безперервної інтеграції
- **Масові операції**: Виконувати одну й ту саму операцію одночасно для кількох проектів Intlayer
- **Управління секретами**: Безпечно керуйте обліковими даними для кількох проєктів за допомогою змінних середовища

## Кращі практики безпеки

- Зберігайте `INTLAYER_PROJECT_CREDENTIALS` як зашифровані секрети на вашій платформі CI/CD
- Ніколи не комітіть облікові дані у систему контролю версій
- Використовуйте окремі облікові дані для різних середовищ розгортання
- Регулярно проводьте ротацію облікових даних
