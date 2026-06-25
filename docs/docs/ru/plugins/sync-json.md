---
createdAt: 2025-03-13
updatedAt: 2026-06-21
title: Плагин Sync JSON
description: Синхронизируйте словари Intlayer со сторонними i18n JSON-файлами (i18next, next-intl, react-intl, vue-i18n и другими). Сохраняйте существующую i18n структуру, используя Intlayer для управления, перевода и тестирования ваших сообщений.
keywords:
  - Intlayer
  - Sync JSON
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
  - translations
  - переводы
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 9.0.0
    date: 2026-06-21
    changes: "Добавлена опция splitKeys (один словарь на каждый ключ пространства имен верхнего уровня) для однофайловых структур next-intl / react-intl"
  - version: 7.5.0
    date: 2025-12-13
    changes: "Добавлена поддержка форматов ICU и i18next"
  - version: 6.1.6
    date: 2025-10-05
    changes: "Начальная документация плагина Sync JSON"
author: aymericzip
---

# Sync JSON (i18n bridges) — Синхронизация JSON с поддержкой ICU / i18next

<iframe title="Как синхронизировать ваши JSON-переводы с помощью Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Используйте Intlayer как дополнение к вашему существующему стеку i18n. Этот плагин синхронизирует ваши сообщения JSON со словарями Intlayer, чтобы вы могли:

- Сохраняйте поддержку i18next, next‑intl, react‑intl, vue‑i18n, next‑translate, nuxt‑i18n, Solid‑i18next, svelte‑i18n и других.
- Управляйте и переводите свои сообщения с помощью Intlayer (CLI, CI, провайдеры, CMS) без рефакторинга вашего приложения.
- Создавайте руководства и SEO-контент для каждой экосистемы, предлагая Intlayer в качестве слоя управления JSON.

Заметки и текущая область применения:

- Экспорт в CMS работает для переводов и обычного текста.
- Пока нет поддержки вставок, множественного числа/ICU или продвинутых функций рантайма других библиотек.
- Визуальный редактор пока не поддерживает вывод i18n сторонних библиотек.

### Когда использовать этот плагин

- Вы уже используете библиотеку i18n и храните сообщения в JSON-файлах.
- Вы хотите использовать автозаполнение с помощью ИИ, тесты в CI и content ops без изменения вашего рантайма рендеринга.

## Установка

```bash
pnpm add -D @intlayer/sync-json-plugin
# или
npm i -D @intlayer/sync-json-plugin
```

## Плагины

Этот пакет предоставляет два плагина:

- `loadJSON`: Загрузка JSON-файлов в словари Intlayer.
  - Этот плагин используется для загрузки JSON-файлов из источника и их загрузки в словари Intlayer. Он может сканировать всю codebase и искать определенные JSON-файлы.
    Этот плагин можно использовать
    - если вы используете библиотеку i18n, которая требует определенного расположения для загрузки ваших JSON (например, `next-intl`, `i18next`, `react-intl`, `vue-i18n` и т. д.), но вы хотите размещать объявления контента там, где вам удобно в вашей codebase.
    - Его также можно использовать, если вы хотите получать сообщения из удаленного источника (например, CMS, API и т. д.) и сохранять их в JSON-файлах.

  > Внутри этот плагин будет сканировать всю кодовую базу (codebase), искать определенные JSON-файлы и загружать их в словари Intlayer.
  > Обратите внимание, что этот плагин не будет записывать результат и переводы обратно в JSON-файлы.

- `syncJSON`: Синхронизация JSON-файлов со словарями Intlayer.
  - Этот плагин используется для синхронизации JSON-файлов со словарями Intlayer. Он может сканировать указанное местоположение и загружать JSON, соответствующие шаблону для определенных JSON-файлов. Этот плагин полезен, если вы хотите получить преимущества Intlayer, используя при этом другую библиотеку i18n.

## Использование обоих плагинов

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Поддерживайте ваши текущие JSON-файлы в синхронизации со словарями Intlayer
  plugins: [
    /**
     * Загрузит все JSON-файлы в src, которые соответствуют шаблону {key}.i18n json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Гарантирует, что эти JSON-файлы имеют приоритет над файлами в `./locales/en/${key}.json`
      format: "intlayer", // Формат содержимого JSON
    }),
    /**
     * Загрузит, а также запишет результат и переводы обратно в JSON-файлы в директории locales
     */
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
      format: "i18next",
    }),
  ],
};

export default config;
```

## `syncJSON` plugin

### Быстрый старт

Добавьте плагин в ваш `intlayer.config.ts` и укажите ему на вашу существующую структуру JSON.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Поддерживайте ваши текущие JSON-файлы в синхронизации со словарями Intlayer
  plugins: [
    syncJSON({
      // Макет для каждой локали, для каждого пространства имен (например, next-intl, i18next с пространствами имен)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "icu",
    }),
  ],
};

export default config;
```

Альтернатива: один файл на локаль (часто используется в настройках i18next/react-intl):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
      format: "i18next",
    }),
  ],
};

export default config;
```

#### Как это работает

- Чтение: плагин обнаруживает JSON-файлы из вашего `source` билдера и загружает их как словари Intlayer.
- Запись: после сборки и заполнения он записывает локализованный JSON обратно по тем же путям (с конечной новой строкой, чтобы избежать проблем с форматированием).
- Автозаполнение: плагин объявляет путь `autoFill` для каждого словаря. Запуск `intlayer fill` по умолчанию обновляет только отсутствующие переводы в ваших JSON-файлах.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // required
  location?: string, // optional label, default: "plugin"
  priority?: number, // optional priority for conflict resolution, default: 0
  format?: 'intlayer' | 'icu' | 'i18next', // optional formatter, used for intlayer runtime compatibility
  splitKeys?: boolean, // необязательно, разделяет один файл на один словарь для каждого ключа верхнего уровня (автоматическое определение)
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Указывает форматтер, который будет использоваться для содержимого словаря при синхронизации JSON-файлов. Это позволяет использовать различные синтаксисы форматирования сообщений, совместимые с рантаймом intlayer.

- `undefined`: Форматтер не будет использоваться, содержимое JSON будет использоваться как есть.
- `'intlayer'`: Форматтер Intlayer по умолчанию (default).
- `'icu'`: Использует форматирование сообщений ICU (совместимо с такими библиотеками, как react-intl, vue-i18n).
- `'i18next'`: Использует форматирование сообщений i18next (совместимо с i18next, next-i18next, Solid-i18next).

> Обратите внимание, что использование форматтера преобразует содержимое вашего JSON на входе и выходе. Для сложных правил JSON, таких как множественное число ICU, парсинг может не гарантировать отображение один к одному между входом и выходом.
> Если вы не используете рантайм Intlayer, вы можете предпочесть не устанавливать форматтер.

**Пример:**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // Use i18next formatting for compatibility
}),
```

#### `splitKeys` (boolean)

Определяет, должен ли один JSON-файл, **ключи первого уровня которого являются пространствами имен**, становиться одним словарем на каждый ключ верхнего уровня, вместо одного словаря, содержащего весь файл.

Это соответствует модели пространств имен таких библиотек, как `next-intl` и `react-intl`, где один файл `messages/{locale}.json` группирует несколько пространств имен по своим ключам первого уровня, каждое из которых адресуется независимо (например, `useTranslations('Hero')` разрешается в словарь `Hero`).

- `undefined` (по умолчанию): **автоматическое определение** — файл разделяется, когда шаблон `source` не содержит сегмента `{key}` (один файл содержит все пространства имен), и сохраняется как один словарь в противном случае (один файл на ключ).
- `true`: всегда разделять каждый ключ верхнего уровня на свой собственный словарь.
- `false`: никогда не разделять; весь файл становится одним словарем.

Пример одного файла `messages/{locale}.json`:

```json fileName="messages/en.json"
{
  "Hero": { "title": "Full-stack developer" },
  "Nav": { "work": "Work", "about": "About" },
  "About": { "lead": "I build apps end to end." }
}
```

```ts fileName="intlayer.config.ts"
syncJSON({
  format: "icu",
  source: ({ locale }) => `./messages/${locale}.json`,
  // splitKeys: true, // подразумевается, потому что шаблон не содержит сегмента `{key}`
}),
```

Это создает три словаря — `Hero`, `Nav` и `About` — так что `useTranslations('Hero')` (next-intl) разрешается правильно. При обратной записи все пространства имен снова собираются в тот же файл для каждой локали.

> Когда вы сохраняете явный сегмент `{key}` в вашем `source` (например, `./locales/${locale}/${key}.json`), каждый файл уже является одним пространством имен, поэтому разделение по умолчанию отключено.

### Несколько источников JSON и приоритет

Вы можете добавить несколько плагинов `syncJSON` для синхронизации различных источников JSON. Это полезно, когда у вас есть несколько библиотек i18n или различные структуры JSON в вашем проекте.

#### Система приоритетов

Когда несколько плагинов нацелены на один и тот же ключ словаря, параметр `priority` определяет, какой плагин имеет приоритет:

- Более высокие номера приоритета преобладают над более низкими
- Приоритет по умолчанию для файлов `.content` равен `0`
- Приоритет по умолчанию для плагинов равен `0`
- Плагины с одинаковым приоритетом обрабатываются в порядке их появления в конфигурации

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Primary JSON source (highest priority)
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // Fallback JSON source (lower priority)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Legacy JSON source (lowest priority)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Load JSON plugin

### Быстрый старт

Добавьте плагин в ваш `intlayer.config.ts`, чтобы импортировать существующие JSON-файлы как словари Intlayer. Этот плагин предназначен только для чтения (без записи на диск):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Импорт JSON-сообщений, расположенных в любом месте вашего исходного дерева
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // Загрузка одной локали для каждого экземпляра плагина (по умолчанию используется defaultLocale из конфигурации)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Альтернатива: макет для каждой локали, только для чтения (загружается только выбранная локаль):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadJSON({
      // Только файлы для Locales.FRENCH будут загружены по этому шаблону
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### Как это работает

- Обнаружение: создает glob из вашего `source` билдера и собирает соответствующие JSON-файлы.
- Импорт: загружает каждый JSON-файл как словарь Intlayer с предоставленной `locale`.
- Только для чтения: не записывает и не форматирует выходные файлы; используйте `syncJSON`, если вам нужна двусторонняя синхронизация.
- Готовность к автозаполнению: определяет шаблон `fill`, чтобы `intlayer content fill` мог заполнять отсутствующие ключи.

### API

```ts
loadJSON({
  // Build paths to your JSON. `locale` is optional if your structure has no locale segment
  source: ({ key, locale }) => string,

  // Target locale for the dictionaries loaded by this plugin instance
  // Defaults to configuration.internationalization.defaultLocale
  locale?: Locale,

  // Optional label to identify the source
  location?: string, // default: "plugin"

  // Priority used for conflict resolution against other sources
  priority?: number, // default: 0

  // Optional formatter for the JSON content
  format?: 'intlayer' | 'icu' | 'i18next', // default: 'intlayer'

  // Разделяет один файл на один словарь для каждого ключа верхнего уровня (автоматическое определение)
  splitKeys?: boolean,
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Указывает форматтер, который будет использоваться для содержимого словаря при загрузке JSON-файлов. Это позволяет использовать различные синтаксисы форматирования сообщений, совместимые с различными библиотеками i18n.

- `'intlayer'`: Форматтер Intlayer по умолчанию (default).
- `'icu'`: Использует форматирование сообщений ICU (совместимо с такими библиотеками, как react-intl, vue-i18n).
- `'i18next'`: Использует форматирование сообщений i18next (совместимо с i18next, next-i18next, Solid-i18next).

**Пример:**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // Use ICU formatting for compatibility
}),
```

#### `splitKeys` (boolean)

Поведение такое же, как в [`syncJSON`](#splitkeys-boolean): когда один JSON-файл группирует несколько пространств имен по своим ключам первого уровня, каждый ключ верхнего уровня становится своим собственным словарем.

- `undefined` (по умолчанию): **автоматическое определение** — разделение происходит, когда шаблон `source` не содержит сегмента `{key}`, в противном случае — один словарь.
- `true` / `false`: принудительное включение или отключение разделения.

```ts
loadJSON({
  source: ({ locale }) => `./messages/${locale}.json`,
  format: "icu",
  // splitKeys auto-enabled: `Hero`, `Nav`, `About`, … each become a dictionary
}),
```

### Поведение и соглашения

- Если ваша маска `source` включает плейсхолдер локали, будут импортированы только файлы для выбранной `locale`.
- Если в вашей маске нет сегмента `{key}`, каждый ключ верхнего уровня файла становится отдельным словарем по умолчанию (см. [splitKeys](#splitkeys-boolean)). Установите `splitKeys: false`, чтобы вместо этого загрузить весь файл как единый словарь `index`.
- Ключи выводятся из путей к файлам путем подстановки плейсхолдера `{key}` в вашем `source` билдере.
- Плагин использует только обнаруженные файлы и не создает отсутствующие локали или ключи.
- Путь `fill` выводится из вашего `source` и используется для обновления отсутствующих значений через CLI, когда вы соглашаетесь.

## Разрешение конфликтов

Когда один и тот же ключ перевода существует в нескольких источниках JSON:

1. Плагин с наивысшим приоритетом определяет окончательное значение
2. Источники с более низким приоритетом используются в качестве запасных для отсутствующих ключей
3. Это позволяет вам поддерживать устаревшие переводы, постепенно переходя к новым структурам

## CLI

Синхронизированные JSON-файлы будут рассматриваться как другие файлы `.content`. Это означает, что все команды intlayer будут доступны для синхронизированных JSON-файлов. Включая:

- `intlayer content test` для проверки наличия отсутствующих переводов
- `intlayer content list` для вывода списка синхронизированных JSON-файлов
- `intlayer content fill` для заполнения отсутствующих переводов
- `intlayer content push` для отправки синхронизированных JSON-файлов
- `intlayer content pull` для получения синхронизированных JSON-файлов

Подробнее см. в [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

## Ограничения (текущие)

- Нет поддержки вставок или множественного числа/ICU при работе со сторонними библиотеками.
- Визуальный редактор пока недоступен для рантаймов, отличных от Intlayer.
- Только синхронизация JSON; форматы каталогов, отличные от JSON, не поддерживаются.

## Почему это важно

- Мы можем рекомендовать проверенные решения i18n и позиционировать Intlayer как дополнение.
- Мы используем их SEO/ключевые слова с руководствами, которые заканчиваются предложением Intlayer для управления JSON.
- Расширяет целевую аудиторию от «новых проектов» до «любой команды, уже использующей i18n».
