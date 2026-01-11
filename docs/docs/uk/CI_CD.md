---
createdAt: 2025-05-20
updatedAt: 2025-08-13
title: "Інтеграція CI/CD"
description: "Дізнайтеся, як інтегрувати Intlayer у ваш CI/CD конвеєр для автоматизованого керування контентом та розгортання."
keywords:
  - CI/CD
  - Безперервна інтеграція
  - Безперервне розгортання
  - Автоматизація
  - Інтернаціоналізація
  - Документація
  - Intlayer
slugs:
  - doc
  - concept
  - ci-cd
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Автоматичне генерування перекладів у CI/CD конвеєрі

Intlayer дозволяє автоматично створювати переклади для ваших файлів декларації контенту. Існує кілька способів досягти цього залежно від вашого робочого процесу.

## Зміст

<TOC/>

## Використання CMS

З Intlayer ви можете використовувати робочий процес, у якому локально оголошується лише одна локаль, тоді як усі переклади керуються віддалено через CMS. Це дозволяє повністю відокремити вміст і переклади від codebase, надаючи редакторам вмісту більше гнучкості та забезпечуючи Live Sync (немає потреби перебудовувати застосунок, щоб застосувати зміни).

### Приклад конфігурації

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Optional locales will be managed remotely
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    // Облікові дані CMS, якщо ви використовуєте CMS
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
  ai: {
    applicationContext: "This is a test application", // Допомагає забезпечити узгоджене генерування перекладів
  },
};

export default config;
```

Щоб дізнатися більше про CMS, зверніться до [офіційної документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

## Використання Husky

Ви можете інтегрувати генерацію перекладів у ваш локальний Git-воркфлоу за допомогою [Husky](https://typicode.github.io/husky/).

### Приклад конфігурації

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Необов’язкові локалі обробляються віддалено
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // Використайте власний API-ключ

    applicationContext: "This is a test application", // Допомагає забезпечити узгоджене генерування перекладів
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Щоб переконатися, що словники оновлені
npx intlayer fill --unpushed --mode fill    # Заповнює лише відсутній вміст, не оновлює існуючий
```

> For more information about Intlayer CLI commands and their usage, refer to the [CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).
>
> If you have multiple apps in your repo using separate intlayer instances, you can use the `--base-dir` argument like this:

```bash fileName=".husky/pre-push"
# Додаток 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# Додаток 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## Використання GitHub Actions

Intlayer надає CLI-команду для автоматичного заповнення та перегляду вмісту словників. Це можна інтегрувати у ваш робочий процес CI/CD за допомогою GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Авто-заповнення
# Умови запуску цього workflow
on:
  pull_request:
    branches:
      - "main"

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      # Конфігурація OpenAI
      AI_MODEL: openai
      AI_PROVIDER: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}

    steps:
      # Крок 1: Отримати останній код з репозиторію
      - name: ⬇️ Клонувати репозиторій
        uses: actions/checkout@v4
        with:
          persist-credentials: true # Зберегти облікові дані для створення PR
          fetch-depth: 0 # Отримати повну історію git для аналізу diff

      # Крок 2: Налаштування середовища Node.js
      - name: 🟢 Налаштувати Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20 # Використовуйте Node.js 20 LTS для стабільності

      # Крок 3: Встановити залежності проєкту
      - name: 📦 Встановити залежності
        run: npm install

      # Крок 4: Встановити Intlayer CLI глобально для керування перекладами
      - name: 📦 Встановити Intlayer
        run: npm install -g intlayer-cli

      # Крок 5: Побудувати проєкт Intlayer для генерації файлів перекладу
      - name: ⚙️ Побудувати проєкт Intlayer
        run: npx intlayer build

      # Крок 6: Використати AI для автоматичного заповнення відсутніх перекладів
      - name: 🤖 Автоматично заповнити відсутні переклади
        run: npx intlayer fill --git-diff --mode fill --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY

      # Крок 7: Перевірити наявність змін і закомітити їх
      - name: 🔍 Перевірити наявність змін
        id: check-changes
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            echo "has-changes=true" >> $GITHUB_OUTPUT
          else
            echo "has-changes=false" >> $GITHUB_OUTPUT
          fi

      # Крок 8: Закомітити та відправити зміни, якщо вони є
      - name: 📤 Закомітити та відправити зміни
        if: steps.check-changes.outputs.has-changes == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "chore: автоматичне заповнення відсутніх перекладів [skip ci]"
          git push origin HEAD:${{ github.head_ref }}
```

Щоб налаштувати змінні середовища, перейдіть у GitHub → Settings → Secrets and variables → Actions і додайте секрет .

> Так само, як і для Husky, у випадку монорепозиторію ви можете використовувати аргумент `--base-dir`, щоб послідовно обробляти кожен додаток.

> За замовчуванням аргумент `--git-diff` фільтрує словники, які містять зміни від бази (за замовчуванням `origin/main`) до поточної гілки (за замовчуванням: `HEAD`).

> Для отримання додаткової інформації про команди Intlayer CLI та їх використання зверніться до [CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).
