---
createdAt: 2025-05-20
updatedAt: 2025-08-13
title: Интеграция CI/CD
description: Узнайте, как интегрировать Intlayer в ваш CI/CD конвейер для автоматизированного управления контентом и развертывания.
keywords:
  - CI/CD
  - Непрерывная интеграция
  - Непрерывное развертывание
  - Автоматизация
  - Интернационализация
  - Документация
  - Intlayer
slugs:
  - doc
  - concept
  - ci-cd
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Инициализация истории"
---

# Автоматическая генерация переводов в CI/CD конвейере

Intlayer позволяет автоматически генерировать переводы для ваших файлов декларации контента. Существует несколько способов достичь этого в зависимости от вашего рабочего процесса.

## Использование CMS

С Intlayer вы можете использовать рабочий процесс, при котором локально объявляется только одна локаль, а все переводы управляются удаленно через CMS. Это позволяет полностью отделить контент и переводы от кодовой базы, обеспечивая большую гибкость для редакторов контента и позволяя горячую перезагрузку контента (нет необходимости пересобирать приложение для применения изменений).

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
    dictionaryPriorityStrategy: "distant_first", // Удалённый контент имеет приоритет

    applicationURL: process.env.APPLICATION_URL, // URL приложения, используемый CMS

    clientId: process.env.INTLAYER_CLIENT_ID, // Учетные данные CMS
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "This is a test application", // Помогает обеспечить согласованное создание переводов
  },
};

export default config;
```

Чтобы узнать больше о CMS, обратитесь к [официальной документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

## Использование Husky

Вы можете интегрировать генерацию переводов в ваш локальный Git-рабочий процесс с помощью [Husky](https://typicode.github.io/husky/).

### Пример конфигурации

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Необязательные локали обрабатываются удалённо
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // Используйте свой собственный API-ключ

    applicationContext: "This is a test application", // Помогает обеспечить согласованное создание переводов
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Чтобы словари были актуальными
npx intlayer fill --unpushed --mode fill    # Заполняет только отсутствующий контент, не обновляет существующий
```

> Для получения дополнительной информации о командах Intlayer CLI и их использовании обратитесь к [документации CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

> Если у вас несколько приложений в репозитории, использующих отдельные экземпляры intlayer, вы можете использовать аргумент `--base-dir` следующим образом:

```bash fileName=".husky/pre-push"
# Приложение 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# Приложение 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## Использование GitHub Actions

Intlayer предоставляет команду CLI для автоматического заполнения и проверки содержимого словаря. Это можно интегрировать в ваш CI/CD процесс с использованием GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Автозаполнение
# Условия запуска этого workflow
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
      # OpenAI
      AI_MODEL: openai
      AI_PROVIDER: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}

    steps:
      # Шаг 1: Получить последний код из репозитория
      - name: ⬇️ Проверка репозитория
        uses: actions/checkout@v4
        with:
          persist-credentials: true # Сохранять учетные данные для создания PR
          fetch-depth: 0 # Получить полную историю git для анализа изменений

      # Шаг 2: Настроить окружение Node.js
      - name: 🟢 Настроить Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20 # Использовать Node.js 20 LTS для стабильности

      # Шаг 3: Установить зависимости проекта
      - name: 📦 Установить зависимости
        run: npm install

      # Шаг 4: Глобально установить Intlayer CLI для управления переводами
      - name: 📦 Установить Intlayer
        run: npm install -g intlayer-cli

      # Шаг 5: Собрать проект Intlayer для генерации файлов перевода
      - name: ⚙️ Собрать проект Intlayer
        run: npx intlayer build

      # Шаг 6: Использовать ИИ для автоматического заполнения отсутствующих переводов
      - name: 🤖 Автоматическое заполнение отсутствующих переводов
        run: npx intlayer fill --git-diff --mode fill --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY

      # Шаг 7: Проверить наличие изменений и зафиксировать их
      - name: � Проверить изменения
        id: check-changes
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            echo "has-changes=true" >> $GITHUB_OUTPUT
          else
            echo "has-changes=false" >> $GITHUB_OUTPUT
          fi

      # Шаг 8: Зафиксировать и отправить изменения, если они есть
      - name: 📤 Зафиксировать и отправить изменения
        if: steps.check-changes.outputs.has-changes == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "chore: автоматическое заполнение отсутствующих переводов [skip ci]"
          git push origin HEAD:${{ github.head_ref }}
```

Чтобы настроить переменные окружения, перейдите в GitHub → Settings → Secrets and variables → Actions и добавьте секрет .

> Аналогично Husky, в случае монорепозитория вы можете использовать аргумент `--base-dir` для последовательной обработки каждого приложения.

> По умолчанию аргумент `--git-diff` фильтрует словари, которые содержат изменения от базы (по умолчанию `origin/main`) до текущей ветки (по умолчанию: `HEAD`).

> Для получения дополнительной информации о командах Intlayer CLI и их использовании обратитесь к [документации CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).
