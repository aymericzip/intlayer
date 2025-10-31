---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Как автоматизировать перевод JSON для next-intl с помощью Intlayer
description: Автоматизируйте перевод JSON с помощью Intlayer и next-intl для улучшенной интернационализации в приложениях Next.js.
slugs:
  - blog
  - intlayer-with-next-intl
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Переход на плагин syncJSON
---

# Как автоматизировать перевод JSON для next-intl с помощью Intlayer

## Что такое Intlayer?

**Intlayer** — это инновационная, открытая библиотека интернационализации, созданная для устранения недостатков традиционных решений i18n. Она предлагает современный подход к управлению контентом в приложениях Next.js.

Смотрите конкретное сравнение с next-intl в нашем блоге [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/next-i18next_vs_next-intl_vs_intlayer.md).

## Почему стоит сочетать Intlayer с next-intl?

Хотя Intlayer предоставляет отличное автономное решение для i18n (см. наше [руководство по интеграции с Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md)), вы можете захотеть объединить его с next-intl по нескольким причинам:

1. **Существующая кодовая база**: У вас уже есть реализованный next-intl, и вы хотите постепенно перейти на улучшенный опыт разработчика с Intlayer.
2. **Требования к наследию**: Ваш проект требует совместимости с существующими плагинами или рабочими процессами next-intl.
3. **Знакомство команды**: Ваша команда привыкла работать с next-intl, но хочет улучшить управление контентом.

**Для этого Intlayer может быть реализован как адаптер для next-intl, чтобы помочь автоматизировать ваши JSON-переводы в CLI или CI/CD пайплайнах, тестировать переводы и многое другое.**

Это руководство покажет вам, как использовать превосходную систему декларации контента Intlayer, сохраняя совместимость с next-intl.

## Содержание

<TOC/>

## Пошаговое руководство по настройке Intlayer с next-intl

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
- **@intlayer/sync-json-plugin**: Плагин для экспорта деклараций контента Intlayer в JSON-формат, совместимый с next-intl

### Шаг 2: Реализация плагина Intlayer для обёртки JSON

Создайте файл конфигурации Intlayer для определения поддерживаемых локалей:

**Если вы также хотите экспортировать JSON-словарь для next-intl**, добавьте плагин `syncJSON`:

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
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Плагин `syncJSON` автоматически обернет JSON. Он будет читать и записывать JSON-файлы без изменения архитектуры контента.

Если вы хотите, чтобы JSON сосуществовал с файлами декларации контента intlayer (`.content` файлы), Intlayer будет работать следующим образом:

    1. загрузит как JSON, так и файлы декларации контента и преобразует их в словарь intlayer.
    2. если возникают конфликты между JSON и файлами декларации контента, Intlayer выполнит слияние всех словарей. В зависимости от приоритета плагинов и файла декларации контента (все настраивается).

Если изменения вносятся с помощью CLI для перевода JSON или через CMS, Intlayer обновит JSON-файл с новыми переводами.

## Конфигурация Git

Рекомендуется игнорировать автоматически сгенерированные файлы Intlayer:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

Эти файлы могут быть восстановлены в процессе сборки и не требуют коммита в систему контроля версий.

### Расширение VS Code

Для улучшения опыта разработчика установите официальное **расширение Intlayer для VS Code**:

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
