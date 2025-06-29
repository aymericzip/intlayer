---
docName: ci_cd
url: https://intlayer.org/doc/concept/ci-cd
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/CI_CD.md
createdAt: 2025-05-20
updatedAt: 2025-05-20
title: Интеграция CI/CD
description: Узнайте, как интегрировать Intlayer в ваш CI/CD-пайплайн для автоматического управления контентом и развертывания.
keywords:
  - CI/CD
  - Непрерывная интеграция
  - Непрерывное развертывание
  - Автоматизация
  - Интернационализация
  - Документация
  - Intlayer
---

# Автоматическая генерация переводов в CI/CD пайплайне

Intlayer позволяет автоматически генерировать переводы для ваших файлов декларации контента. Существует несколько способов достижения этого в зависимости от вашего рабочего процесса.

## Использование CMS

С помощью Intlayer вы можете использовать рабочий процесс, в котором локально объявляется только одна локаль, а все переводы управляются удаленно через CMS. Это позволяет полностью отделить контент и переводы от кодовой базы, предоставляя больше гибкости редакторам контента и обеспечивая горячую перезагрузку контента (нет необходимости пересобирать приложение для применения изменений).

### Пример конфигурации

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Необязательные локали будут управляться удаленно
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // Удаленный контент имеет приоритет

    applicationURL: process.env.APPLICATION_URL, // URL приложения, используемый CMS

    clientId: process.env.INTLAYER_CLIENT_ID, // Учетные данные CMS
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "Это тестовое приложение", // Помогает обеспечить согласованность генерации переводов
  },
};

export default config;
```

Чтобы узнать больше о CMS, обратитесь к [официальной документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

## Использование Husky

Вы можете интегрировать генерацию переводов в ваш локальный Git рабочий процесс с помощью [Husky](https://typicode.github.io/husky/).

### Пример конфигурации

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Необязательные локали обрабатываются удаленно
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // Используйте ваш собственный API ключ

    applicationContext: "Это тестовое приложение", // Помогает обеспечить согласованность генерации переводов
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Убедитесь, что словари актуальны
npx intlayer fill --unpushed --mode fill    # Заполняет только отсутствующий контент, не обновляет существующий
```

> Для получения дополнительной информации о командах Intlayer CLI и их использовании обратитесь к [документации CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).

> Если у вас в репозитории несколько приложений, использующих отдельные экземпляры Intlayer, вы можете использовать аргумент `--base-dir`, например:

```bash fileName=".husky/pre-push"
# Приложение 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# Приложение 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## Использование GitHub Actions

Intlayer предоставляет CLI-команду для автозаполнения и проверки содержимого словарей. Это можно интегрировать в ваш CI/CD рабочий процесс с использованием GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  push:
    branches: [ main ]
    paths:
      - 'src/**'
  pull_request:
    branches: [ main ]
    paths:
      - 'src/**'
  workflow_dispatch: {}

concurrency:
  group: 'autofill-${{ github.ref }}'
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      INTLAYER_CLIENT_ID: ${{ secrets.INTLAYER_CLIENT_ID }}
      INTLAYER_CLIENT_SECRET: ${{ secrets.INTLAYER_CLIENT_SECRET }}
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

    steps:
      - name: ⬇️ Checkout repository
        uses: actions/checkout@v3
        with:
          persist-credentials: true

      - name: 🟢 Установить Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 Установить зависимости
        run: npm ci

      - name: ⚙️ Сборка проекта Intlayer
        run: npx intlayer build

      - name: 🤖 Автозаполнение недостающих переводов
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 Создать или обновить PR с переводами
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: auto-fill missing translations [skip ci]
          branch: auto-translations
          title: chore: update missing translations
          labels: translation, automated
```

> Как и в случае с Husky, в случае монорепозитория вы можете использовать аргумент `--base-dir` для последовательной обработки каждого приложения.

> По умолчанию аргумент `--git-diff` фильтрует словари, которые включают изменения от базовой ветки (по умолчанию `origin/main`) до текущей ветки (по умолчанию: `HEAD`).

> Для получения дополнительной информации о командах Intlayer CLI и их использовании обратитесь к [документации CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).
