---
createdAt: 2026-01-06
updatedAt: 2026-01-06
title: Команда CI
description: Узнайте, как использовать команду Intlayer CI для запуска команд Intlayer с автоматически внедренными учетными данными в CI/CD конвейерах и монорепозиториях.
keywords:
  - CI
  - CI/CD
  - Автоматизация
  - Монорепозиторий
  - Учетные данные
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
    changes: "Добавить команду CI"
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

Команда CI предназначена для автоматизации и CI/CD конвейеров. Она автоматически внедряет учетные данные из переменной окружения `INTLAYER_PROJECT_CREDENTIALS` и может запускать команды Intlayer для нескольких проектов в монорепозитории.

## Как это работает

Команда CI работает в двух режимах:

1. **Режим одного проекта**: Если текущий рабочий каталог соответствует одному из путей проектов в `INTLAYER_PROJECT_CREDENTIALS`, она запускает команду только для этого конкретного проекта.

2. **Режим итерации**: Если не обнаружен конкретный контекст проекта, она перебирает все настроенные проекты и запускает команду для каждого из них.

## Переменная окружения

Команда требует установки переменной окружения `INTLAYER_PROJECT_CREDENTIALS`. Эта переменная должна содержать JSON-объект, сопоставляющий пути проектов с их учетными данными:

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

## Определение менеджера пакетов

Команда CI автоматически определяет, какой менеджер пакетов используется (npm, yarn, pnpm или bun), на основе переменной окружения `npm_config_user_agent` и использует соответствующую команду для выполнения Intlayer.

## Аргументы

- **`<command...>`**: Команда Intlayer для выполнения (например, `fill`, `push`, `build`). Вы можете передать любую команду Intlayer и ее аргументы.

  > Пример: `npx intlayer ci fill --verbose`
  >
  > Пример: `npx intlayer ci push`
  >
  > Пример: `npx intlayer ci build`

## Примеры

### Запуск команды в режиме одного проекта

Если вы находитесь в каталоге проекта, который соответствует одному из путей в `INTLAYER_PROJECT_CREDENTIALS`:

```bash
cd packages/app
npx intlayer ci fill
```

Это запустит команду `fill` с автоматически внедренными учетными данными для проекта `packages/app`.

### Запуск команды для всех проектов

Если вы находитесь в каталоге, который не соответствует ни одному пути проекта, команда переберет все настроенные проекты:

```bash
cd /path/to/monorepo
npx intlayer ci push
```

Это запустит команду `push` для каждого проекта, настроенного в `INTLAYER_PROJECT_CREDENTIALS`.

### Передача дополнительных флагов

Вы можете передать любые флаги в базовую команду Intlayer:

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

### Использование в CI/CD конвейерах

В вашей конфигурации CI/CD (например, GitHub Actions, GitLab CI) установите `INTLAYER_PROJECT_CREDENTIALS` как секрет:

```yaml
# Пример GitHub Actions
env:
  INTLAYER_PROJECT_CREDENTIALS: ${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}

steps:
  - name: Заполнить словари
    run: npx intlayer ci fill
```

## Строительные блоки GitHub Actions

При запуске `intlayer init`, Intlayer определяет ваш package manager (npm, yarn, pnpm или bun) и создает два workflow'а GitHub Actions в папке `.github/workflows/`, с командами, соответствующими вашему package manager'у:

- **`intlayer-fill.yml`** — При каждом pull request'е собирает словари и запускает `intlayer fill --git-diff --mode complete` для генерации недостающих переводов в измененных словарях, а затем коммитит результат обратно в ветку PR.
- **`intlayer-test.yml`** — При каждом pull request'е собирает словари и запускает `intlayer test`, не пропуская проверку, когда требуемым локалям не хватает переводов.

Существующие файлы workflow никогда не перезаписываются. Чтобы полностью пропустить создание строительных блоков, запустите:

```bash
npx intlayer init --no-github-actions
```

### Предоставление доступа к ИИ для рабочего процесса fill

Созданный файл `intlayer-fill.yml` требует доступа к ИИ. Доступны два варианта (настраиваются в блоке `env` рабочего процесса):

1. **Ваш собственный ключ поставщика ИИ** — добавьте секрет `AI_API_KEY` в настройки репозитория (Settings → Secrets and variables → Actions). Рабочий процесс передает его через `--provider`, `--model` и `--api-key`.
2. **Ключи доступа Intlayer CMS** — добавьте секреты `INTLAYER_CLIENT_ID` и `INTLAYER_CLIENT_SECRET` и свяжите их с разделом `editor` в вашем `intlayer.config`. Ключи доступа CMS предоставляют доступ к ИИ через backend Intlayer.

Рабочий процесс `intlayer-test.yml` не требует доступа к ИИ.

## Обработка ошибок

- Если `INTLAYER_PROJECT_CREDENTIALS` не установлена, команда завершится с ошибкой.
- Если `INTLAYER_PROJECT_CREDENTIALS` не является допустимым JSON, команда завершится с ошибкой.
- Если путь проекта не существует, он будет пропущен с предупреждением.
- Если какой-либо проект завершится неудачей, команда завершится с ненулевым кодом состояния.

## Случаи использования

- **Автоматизация монорепозитория**: Запуск команд Intlayer для нескольких проектов в монорепозитории
- **CI/CD конвейеры**: Автоматизация управления словарями в рабочих процессах непрерывной интеграции
- **Массовые операции**: Выполнение одной и той же операции для нескольких проектов Intlayer одновременно
- **Управление секретами**: Безопасное управление учетными данными для нескольких проектов с использованием переменных окружения

## Рекомендации по безопасности

- Храните `INTLAYER_PROJECT_CREDENTIALS` как зашифрованные секреты в вашей платформе CI/CD
- Никогда не коммитьте учетные данные в систему контроля версий
- Используйте учетные данные, специфичные для окружения, для различных сред развертывания
- Регулярно обновляйте учетные данные
