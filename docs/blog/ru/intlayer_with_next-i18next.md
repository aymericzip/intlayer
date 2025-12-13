---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer и next-i18next
description: Интеграция Intlayer с next-i18next для комплексного решения интернационализации Next.js
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Интернационализация
  - Блог
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Добавлен плагин loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Переход на плагин syncJSON и полный переписанный код
---

# Интернационализация Next.js (i18n) с next-i18next и Intlayer

<iframe title="Как автоматизировать ваши JSON-переводы next-i18next с помощью Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Содержание

<TOC/>

## Что такое next-i18next?

**next-i18next** — это один из самых популярных фреймворков для интернационализации (i18n) в приложениях Next.js. Построенный на мощной экосистеме **i18next**, он предоставляет комплексное решение для управления переводами, локализацией и переключением языков в проектах Next.js.

Однако next-i18next имеет некоторые сложности:

- **Сложная конфигурация**: Настройка next-i18next требует нескольких конфигурационных файлов и тщательной настройки экземпляров i18n на стороне сервера и клиента.
- **Разрозненные переводы**: Файлы переводов обычно хранятся в отдельных директориях от компонентов, что затрудняет поддержание согласованности.
- **Ручное управление пространствами имён**: Разработчикам необходимо вручную управлять пространствами имён и обеспечивать правильную загрузку ресурсов переводов.
- **Ограниченная типобезопасность**: Поддержка TypeScript требует дополнительной настройки и не обеспечивает автоматическую генерацию типов для переводов.

## Что такое Intlayer?

**Intlayer** — это инновационная, открытая библиотека интернационализации, разработанная для устранения недостатков традиционных решений i18n. Она предлагает современный подход к управлению контентом в приложениях Next.js.

Смотрите конкретное сравнение с next-intl в нашем блоге [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/next-i18next_vs_next-intl_vs_intlayer.md).

## Почему стоит сочетать Intlayer с next-i18next?

Хотя Intlayer предоставляет отличное автономное решение для i18n (см. наше [руководство по интеграции с Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md)), вы можете захотеть комбинировать его с next-i18next по нескольким причинам:

1. **Существующая кодовая база**: У вас уже есть реализованная система next-i18next, и вы хотите постепенно перейти на улучшенный опыт разработки с Intlayer.
2. **Требования наследия**: Ваш проект требует совместимости с существующими плагинами или рабочими процессами i18next.
3. **Знакомство команды**: Ваша команда привыкла к next-i18next, но хочет лучшее управление контентом.

**Для этого Intlayer может быть реализован как адаптер для next-i18next, чтобы помочь автоматизировать ваши JSON-переводы в CLI или CI/CD пайплайнах, тестировать ваши переводы и многое другое.**

В этом руководстве показано, как использовать превосходную систему декларации контента Intlayer, сохраняя при этом совместимость с next-i18next.

---

## Пошаговое руководство по настройке Intlayer с next-i18next

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью предпочитаемого менеджера пакетов:

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

**Объяснение пакетов:**

- **intlayer**: Основная библиотека для декларации и управления контентом
- **@intlayer/sync-json-plugin**: Плагин для синхронизации деклараций контента Intlayer с форматом JSON i18next

### Шаг 2: Реализация плагина Intlayer для обёртывания JSON

Создайте файл конфигурации Intlayer для определения поддерживаемых локалей:

**Если вы также хотите экспортировать JSON-словарь для i18next**, добавьте плагин `syncJSON`:

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
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Плагин `syncJSON` автоматически обернет JSON. Он будет читать и записывать JSON-файлы без изменения архитектуры контента.

Если вы хотите, чтобы JSON сосуществовал с файлами декларации контента Intlayer (`.content` файлы), Intlayer будет работать следующим образом:

    1. загрузит как JSON, так и файлы декларации контента и преобразует их в словарь Intlayer.
    2. если возникнут конфликты между JSON и файлами декларации контента, Intlayer выполнит слияние всех словарей. В зависимости от приоритета плагинов и файлов декларации контента (все настраивается).

Если изменения внесены с помощью CLI для перевода JSON или с использованием CMS, Intlayer обновит JSON-файл с новыми переводами.

Для получения дополнительной информации о плагине `syncJSON` обратитесь к [документации плагина syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md).

---

### (Необязательно) Шаг 3: Реализация перевода JSON по компонентам

По умолчанию Intlayer загрузит, объединит и синхронизирует как JSON, так и файлы декларации контента. Подробнее смотрите в [документации по декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md). Но если вы предпочитаете, используя плагин Intlayer, вы также можете реализовать управление локализованным JSON по компонентам в любом месте вашей кодовой базы.

Для этого вы можете использовать плагин `loadJSON`.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Поддерживайте синхронизацию ваших текущих JSON-файлов с словарями Intlayer
  plugins: [
    /**
     * Загрузит все JSON-файлы в src, которые соответствуют шаблону {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Обеспечивает приоритет этих JSON-файлов над файлами в `./public/locales/en/${key}.json`
    }),
    /**
     * Загрузит, а также запишет результаты и переводы обратно в JSON-файлы в директории локалей
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Это загрузит все JSON-файлы в директории `src`, которые соответствуют шаблону `{key}.i18n.json`, и загрузит их как словари Intlayer.

---

## Конфигурация Git

Исключите сгенерированные файлы из системы контроля версий:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

Эти файлы автоматически пересоздаются во время процесса сборки и не требуют коммита в ваш репозиторий.

### Расширение VS Code

Для улучшения опыта разработчика установите официальное расширение **Intlayer для VS Code**:

[Установить из магазина расширений VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
