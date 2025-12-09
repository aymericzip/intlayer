---
createdAt: 2024-12-24
updatedAt: 2025-11-01
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
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Добавлен плагин loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Изменение на плагин syncJSON
---

# Как автоматизировать ваши JSON-переводы i18next с помощью Intlayer

<iframe title="Как автоматизировать ваши JSON-переводы i18next с помощью Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Что такое Intlayer?

**Intlayer** — это инновационная, открытая библиотека интернационализации, созданная для устранения недостатков традиционных решений i18n. Она предлагает современный подход к управлению контентом в JavaScript-приложениях.

Смотрите конкретное сравнение с i18next в нашем блоге [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/next-i18next_vs_next-intl_vs_intlayer.md).

## Почему стоит сочетать Intlayer с i18next?

Хотя Intlayer предоставляет отличное самостоятельное решение для i18n (см. наше [руководство по интеграции с Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md)), вы можете захотеть объединить его с i18next по нескольким причинам:

1. **Существующая кодовая база**: У вас уже есть реализованная система i18next, и вы хотите постепенно перейти на улучшенный опыт разработчика с Intlayer.
2. **Требования наследия**: Ваш проект требует совместимости с существующими плагинами или рабочими процессами i18next.
3. **Знакомство команды**: Ваша команда привыкла к i18next, но хочет улучшить управление контентом.
4. **Использование возможностей Intlayer**: Вы хотите использовать функции Intlayer, такие как декларация контента, управление ключами переводов, статус переводов и многое другое.

**Для этого Intlayer может быть реализован как адаптер для i18next, чтобы помочь автоматизировать ваши JSON-переводы в CLI или CI/CD пайплайнах, тестировать переводы и многое другое.**

Это руководство показывает, как использовать превосходную систему декларации контента Intlayer, сохраняя при этом совместимость с i18next.

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

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin
```

**Описание пакетов:**

- **intlayer**: Основная библиотека для управления интернационализацией, декларации контента и сборки
- **@intlayer/sync-json-plugin**: Плагин для экспорта деклараций контента Intlayer в JSON-формат, совместимый с i18next

### Шаг 2: Реализация плагина Intlayer для обертки JSON

Создайте файл конфигурации Intlayer для определения поддерживаемых локалей:

**Если вы также хотите экспортировать JSON-словари для i18next**, добавьте плагин `syncJSON`:

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
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Плагин `syncJSON` автоматически обернет JSON. Он будет читать и записывать JSON-файлы без изменения архитектуры содержимого.

Если вы хотите, чтобы JSON сосуществовал с файлами деклараций контента Intlayer (`.content` файлы), Intlayer будет работать следующим образом:

    1. загрузит как JSON, так и файлы деклараций контента и преобразует их в словарь Intlayer.
    2. если возникнут конфликты между JSON и файлами деклараций контента, Intlayer выполнит слияние всех этих словарей. В зависимости от приоритета плагинов и приоритета файла декларации контента (все настраивается).

Если изменения вносятся с помощью CLI для перевода JSON или с помощью CMS, Intlayer обновит JSON-файл с новыми переводами.

Чтобы узнать больше подробностей о плагине `syncJSON`, пожалуйста, обратитесь к [документации плагина syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md).

### (Необязательно) Шаг 3: Реализация перевода JSON по компонентам

По умолчанию Intlayer загрузит, объединит и синхронизирует как JSON, так и файлы деклараций контента. Подробнее смотрите в [документации по декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md). Но если вы предпочитаете, используя плагин Intlayer, вы также можете реализовать управление локализованным JSON по компонентам в любом месте вашей кодовой базы.

Для этого вы можете использовать плагин `loadJSON`.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Поддерживайте актуальность ваших текущих JSON файлов в соответствии со словарями Intlayer
  plugins: [
    /**
     * Загрузит все JSON файлы в папке src, которые соответствуют шаблону {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Обеспечивает приоритет этих JSON файлов над файлами в `./locales/en/${key}.json`
    }),
    /**
     * Загрузит и запишет результат и переводы обратно в JSON файлы в директории locales
     */
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Это загрузит все JSON файлы в директории `src`, которые соответствуют шаблону `{key}.i18n.json`, и загрузит их как словари Intlayer.

---

## Конфигурация Git

Рекомендуется игнорировать автоматически сгенерированные файлы Intlayer:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

Эти файлы могут быть воссозданы в процессе сборки и не требуют добавления в систему контроля версий.

### Расширение VS Code

Для улучшения опыта разработчика установите официальное **расширение Intlayer для VS Code**:

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
