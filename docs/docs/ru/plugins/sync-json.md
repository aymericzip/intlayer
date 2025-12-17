---
createdAt: 2025-03-13
updatedAt: 2025-12-13
title: Плагин синхронизации JSON
description: Синхронизируйте словари Intlayer с JSON-файлами сторонних i18n (i18next, next-intl, react-intl, vue-i18n и другими). Сохраняйте существующую i18n, используя Intlayer для управления, перевода и тестирования ваших сообщений.
keywords:
  - Intlayer
  - Синхронизация JSON
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - переводы
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.5.0
    date: 2025-12-13
    changes: Добавлена поддержка форматов ICU и i18next
  - version: 6.1.6
    date: 2025-10-05
    changes: Начальная документация плагина синхронизации JSON
---

# Синхронизация JSON (мосты i18n) - Синхронизация JSON с поддержкой ICU / i18next

<iframe title="Как поддерживать синхронизацию ваших JSON-переводов с Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Используйте Intlayer в качестве дополнения к вашему существующему стеку i18n. Этот плагин поддерживает синхронизацию ваших JSON-сообщений со словарями Intlayer, чтобы вы могли:

- Сохранять использование i18next, next-intl, react-intl, vue-i18n, next-translate, nuxt-i18n, Solid-i18next, svelte-i18n и других.
- Управлять и переводить ваши сообщения с помощью Intlayer (CLI, CI, провайдеры, CMS), без необходимости рефакторинга вашего приложения.
- Публиковать обучающие материалы и SEO-контент, ориентированный на каждую экосистему, предлагая Intlayer в качестве слоя управления JSON.

Примечания и текущий охват:

- Внешняя интеграция с CMS работает для переводов и классического текста.
- Пока нет поддержки вставок, множественного числа/ICU или продвинутых функций времени выполнения других библиотек.
- Визуальный редактор пока не поддерживается для вывода сторонних i18n.

### Когда использовать этот плагин

- Вы уже используете библиотеку i18n и храните сообщения в JSON-файлах.
- Вы хотите использовать заполнение с помощью ИИ, тестирование в CI и управление контентом без изменения вашего runtime для рендеринга.

## Установка

```bash
pnpm add -D @intlayer/sync-json-plugin
# или
npm i -D @intlayer/sync-json-plugin
```

## Быстрый старт

Добавьте плагин в ваш `intlayer.config.ts` и укажите путь к вашей существующей структуре JSON.

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Синхронизируйте ваши текущие JSON-файлы со словарями Intlayer
  plugins: [
    syncJSON({
      // Макет по локалям и пространствам имён (например, next-intl, i18next с пространствами имён)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
});
```

Альтернатива: один файл на локаль (распространено в настройках i18next/react-intl):

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### Как это работает

- Чтение: плагин обнаруживает JSON-файлы с помощью вашего билдера `source` и загружает их как словари Intlayer.
- Запись: после сборок и заполнения он записывает локализованные JSON обратно по тем же путям (с завершающим переводом строки, чтобы избежать проблем с форматированием).
- Автозаполнение: плагин объявляет путь `autoFill` для каждого словаря. Запуск `intlayer fill` по умолчанию обновляет только отсутствующие переводы в ваших JSON-файлах.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // обязательно
  location?: string, // необязательная метка, по умолчанию: "plugin"
  priority?: number, // необязательный приоритет для разрешения конфликтов, по умолчанию: 0
  format?: 'intlayer' | 'icu' | 'i18next', // необязательный форматтер, по умолчанию: 'intlayer'
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Указывает форматтер, который будет использоваться для содержимого словаря при синхронизации JSON-файлов. Это позволяет использовать различные синтаксисы форматирования сообщений, совместимые с различными библиотеками i18n.

- `'intlayer'`: Форматтер Intlayer по умолчанию (по умолчанию).
- `'icu'`: Использует форматирование сообщений ICU (совместимо с библиотеками, такими как react-intl, vue-i18n).
- `'i18next'`: Использует форматирование сообщений i18next (совместимо с i18next, next-i18next, Solid-i18next).

**Пример:**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // Использовать форматирование i18next для совместимости
}),
```

## Несколько источников JSON и приоритет

Вы можете добавить несколько плагинов `syncJSON` для синхронизации разных источников JSON. Это полезно, если в вашем проекте используются несколько библиотек i18n или разные структуры JSON.

### Система приоритетов

Когда несколько плагинов нацелены на один и тот же ключ словаря, параметр `priority` определяет, какой плагин имеет преимущество:

- Побеждает плагин с более высоким числом приоритета
- Приоритет по умолчанию для файлов `.content` равен `0`
- Приоритет по умолчанию для файлов плагинов равен `-1`
- Плагины с одинаковым приоритетом обрабатываются в порядке их появления в конфигурации

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Основной источник JSON (наивысший приоритет)
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // Резервный источник JSON (низший приоритет)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Источник устаревших JSON (самый низкий приоритет)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
});
```

### Разрешение конфликтов

Когда один и тот же ключ перевода присутствует в нескольких JSON-источниках:

1. Плагин с наивысшим приоритетом определяет итоговое значение
2. Источники с более низким приоритетом используются как резервные для отсутствующих ключей
3. Это позволяет поддерживать устаревшие переводы, постепенно переходя на новые структуры

## Интеграции

Ниже приведены распространённые сопоставления. Не изменяйте ваше окружение выполнения; просто добавьте плагин.

### i18next

Типичная структура файлов: `./public/locales/{locale}/{namespace}.json` или `./locales/{locale}/{namespace}.json`.

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

export default {
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};
```

### next-intl

JSON-сообщения для каждого локаля (часто `./messages/{locale}.json`) или по namespace.

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
  }),
];
```

См. также: `docs/ru/intlayer_with_next-intl.md`.

### react-intl

Обычно используется один JSON на локаль:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### vue-i18n

Либо один файл на локаль, либо по пространствам имён:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`, // источник файлов локализации
  }),
];
```

## CLI

Синхронизированные JSON-файлы будут рассматриваться как другие файлы с расширением `.content`. Это означает, что все команды intlayer будут доступны для синхронизированных JSON-файлов, включая:

- `intlayer content test` для проверки отсутствующих переводов
- `intlayer content list` для вывода списка синхронизированных JSON-файлов
- `intlayer content fill` для заполнения отсутствующих переводов
- `intlayer content push` для отправки синхронизированных JSON-файлов
- `intlayer content pull` для загрузки синхронизированных JSON-файлов

См. [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md) для получения дополнительной информации.

## Ограничения (текущие)

- Нет поддержки вставок или множественного числа/ICU при работе с библиотеками третьих сторон.
- Визуальный редактор пока недоступен для сред выполнения, не являющихся Intlayer.
- Синхронизация только JSON; форматы каталогов, не являющиеся JSON, не поддерживаются.

## Почему это важно

- Мы можем рекомендовать проверенные решения i18n и позиционировать Intlayer как дополнение.
- Мы используем их SEO/ключевые слова с помощью руководств, которые заканчиваются предложением использовать Intlayer для управления JSON.
- Расширяет целевую аудиторию с «новых проектов» до «любых команд, уже использующих i18n».
