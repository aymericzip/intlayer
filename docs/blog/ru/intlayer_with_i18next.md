---
createdAt: 2024-12-24
updatedAt: 2025-10-29
title: Как автоматизировать ваши JSON-переводы i18next с помощью Intlayer
description: Автоматизируйте ваши JSON-переводы с помощью Intlayer и i18next для улучшенной интернационализации в JavaScript-приложениях.
keywords:
  - Intlayer
  - i18next
  - Интернационализация
  - i18n
  - Локализация
  - Перевод
  - React
  - Next.js
  - JavaScript
  - TypeScript
  - Миграция
  - Интеграция
slugs:
  - blog
  - intlayer-with-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Переход на плагин syncJSON
---

# Как автоматизировать ваши JSON-переводы i18next с помощью Intlayer

## Что такое Intlayer?

**Intlayer** — это инновационная, открытая библиотека для интернационализации, созданная для устранения недостатков традиционных решений i18n. Она предлагает современный подход к управлению контентом в JavaScript-приложениях.

Смотрите конкретное сравнение с i18next в нашем блоге [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/next-i18next_vs_next-intl_vs_intlayer.md).

## Почему стоит сочетать Intlayer с i18next?

Хотя Intlayer предоставляет отличное самостоятельное решение для i18n (см. наше руководство по интеграции с Next.js [Next.js integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md)), вы можете захотеть сочетать его с i18next по нескольким причинам:

1. **Существующая кодовая база**: У вас уже есть реализованная система i18next, и вы хотите постепенно перейти на улучшенный опыт разработки с Intlayer.
2. **Требования наследия**: Ваш проект требует совместимости с существующими плагинами или рабочими процессами i18next.
3. **Знакомство команды**: Ваша команда привыкла к i18next, но хочет улучшить управление контентом.

**Для этого Intlayer может быть реализован как адаптер для i18next, чтобы помочь автоматизировать ваши JSON-переводы в CLI или CI/CD пайплайнах, тестировать переводы и многое другое.**

В этом руководстве показано, как использовать превосходную систему декларации контента Intlayer, сохраняя совместимость с i18next.

## Содержание

<TOC/>

## Пошаговое руководство по настройке Intlayer с i18next

### Шаг 1: Установка зависимостей

Установите необходимые пакеты:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

**Описание пакетов:**

- **intlayer**: Основная библиотека для управления интернационализацией, декларации контента и сборки
- **@intlayer/sync-json-plugin**: Плагин для экспорта деклараций контента Intlayer в JSON-формат, совместимый с i18next

### Шаг 2: Реализация плагина Intlayer для обертки JSON

Создайте файл конфигурации Intlayer для определения поддерживаемых локалей:

**Если вы хотите также экспортировать JSON-словари для i18next**, добавьте плагин `syncJSON`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Плагин `syncJSON` автоматически обернет JSON. Он будет читать и записывать JSON-файлы без изменения архитектуры контента.

Если вы хотите, чтобы JSON сосуществовал с файлами декларации контента Intlayer (`.content` файлы), Intlayer будет работать следующим образом:

    1. загрузит как JSON, так и файлы декларации контента и преобразует их в словарь Intlayer.
    2. если возникают конфликты между JSON и файлами декларации контента, Intlayer выполнит слияние всех словарей. В зависимости от приоритета плагинов и файла декларации контента (все настраивается).

Если изменения вносятся с помощью CLI для перевода JSON или через CMS, Intlayer обновит JSON-файл с новыми переводами.

## Конфигурация Git

Рекомендуется игнорировать автоматически сгенерированные файлы Intlayer:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

Эти файлы могут быть восстановлены во время процесса сборки и не требуют добавления в систему контроля версий.

### Расширение VS Code

Для улучшения опыта разработчика установите официальное **расширение Intlayer для VS Code**:

[Установить из магазина расширений VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
