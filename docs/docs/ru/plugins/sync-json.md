---
createdAt: 2025-03-13
updatedAt: 2026-09-27
priority: 6
title: "Плагин Sync JSON: синхронизация ваших JSON-файлов i18n"
description: "Синхронизируйте словари Intlayer с JSON-файлами i18next, next-intl, react-intl или vue-i18n, а также управляйте ими, переводите и тестируйте их с помощью Intlayer."
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
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 9.0.0
    date: 2026-06-21
    changes: "Добавлена опция splitKeys (один словарь на каждый ключ верхнего уровня пространства имён) для схем с одним файлом в next-intl / react-intl"
  - version: 7.5.0
    date: 2025-12-13
    changes: "Добавлена поддержка форматов ICU и i18next"
  - version: 6.1.6
    date: 2025-10-05
    changes: "Первоначальная документация по плагину Sync JSON"
author: aymericzip
---

# Sync JSON (мосты для i18n) - Sync JSON с поддержкой ICU / i18next

<iframe title="Как синхронизировать ваши JSON-переводы с Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Используйте Intlayer как дополнение к вашему существующему стеку i18n. Этот плагин поддерживает синхронизацию ваших JSON-сообщений со словарями Intlayer, что позволяет вам:

- Сохраняйте i18next, next‑intl, react‑intl, vue‑i18n, next‑translate, nuxt‑i18n, Solid‑i18next, svelte‑i18n и т. д.
- Управляйте сообщениями и переводите их с помощью Intlayer (CLI, CI, провайдеры, CMS), не переписывая ваше приложение.
- Публикуйте туториалы и SEO‑контент для каждой экосистемы, предлагая Intlayer в качестве слоя управления JSON.

Примечания и текущий охват:

- Экстернализация в CMS работает для переводов и обычного текста.
- Пока не поддерживаются вставки, plurals/ICU и продвинутые runtime‑функции других библиотек.
- Визуальный редактор пока не поддерживается для выходных данных сторонних i18n‑библиотек.

## Когда использовать этот плагин

- Вы уже используете библиотеку i18n и храните сообщения в JSON‑файлах.
- Вы хотите автоматизированное заполнение с помощью AI, тестирование в CI и управление контентом без изменения runtime для рендеринга.

## Установка

```bash
pnpm add -D @intlayer/sync-json-plugin
# или
npm i -D @intlayer/sync-json-plugin
```

## Плагины

Этот пакет предоставляет два плагина:

- `loadJSON`: Загрузка JSON-файлов в словари Intlayer.
  - Этот плагин используется для загрузки JSON-файлов из источника в словари Intlayer. Он может сканировать всю кодовую базу и искать определённые JSON-файлы.
    Этот плагин можно использовать
    - если вы используете библиотеку i18n, которая требует определённое расположение для загрузки ваших JSON-файлов (например: `next-intl`, `i18next`, `react-intl`, `vue-i18n` и т. д.), но вы хотите размещать объявления контента там, где вам удобно в вашей кодовой базе.
    - Его также можно использовать, если вы хотите получать сообщения из удалённого источника (например: CMS, API и т. д.) и сохранять их в JSON-файлах.

  > Под капотом этот плагин сканирует всю кодовую базу, ищет определённые JSON-файлы и загружает их в словари Intlayer.
  > Обратите внимание, что этот плагин не будет записывать вывод и переводы обратно в JSON-файлы.

- `syncJSON`: Синхронизация JSON-файлов со словарями Intlayer.
  - Этот плагин используется для синхронизации JSON-файлов со словарями Intlayer. Он может сканировать указанное расположение и загружать JSON-файлы, соответствующие шаблону для определённых JSON-файлов. Этот плагин полезен, если вы хотите получить преимущества Intlayer при использовании другой библиотеки i18n.

## Использование обоих плагинов

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Синхронизируйте текущие JSON-файлы со словарями Intlayer
  plugins: [
    /**
     * Загрузит все JSON-файлы в src, соответствующие шаблону {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Обеспечивает приоритет этих JSON-файлов над файлами по пути `./locales/en/${key}.json`
      format: "intlayer", // Формат содержимого JSON
    }),
    /**
     * Загрузит и запишет результат и переводы обратно в JSON-файлы в директории locales
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

## Плагин `syncJSON`

### Быстрый старт

Добавьте плагин в `intlayer.config.ts` и укажите на вашу существующую структуру JSON.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Синхронизируйте текущие JSON-файлы со словарями Intlayer
  plugins: [
    syncJSON({
      // Макет для каждой локали и каждого пространства имён (например, next-intl, i18next с namespaces)
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

- Чтение: плагин находит JSON-файлы по функции `source` и загружает их как словари Intlayer.
- Écrire : après les builds et les remplissages, il réécrit le JSON localisé dans les mêmes chemins (avec un saut de ligne final pour éviter les problèmes de formatage).

Заменяю:

- Запись: после сборки и заполнения плагин записывает локализованный JSON обратно в те же пути (с завершающим переводом строки, чтобы избежать проблем с форматированием).
- Автозаполнение: плагин объявляет путь `autoFill` для каждого словаря. Запуск `intlayer fill` по умолчанию обновляет в ваших JSON-файлах только отсутствующие переводы.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // обязательный
  location?: string, // необязательная метка, по умолчанию: "plugin"
  priority?: number, // необязательный приоритет для разрешения конфликтов, по умолчанию: 0
  format?: 'intlayer' | 'icu' | 'i18next', // необязательный форматтер, используется для совместимости с runtime Intlayer
  splitKeys?: boolean, // необязательный, разделяет один файл на отдельный словарь для каждого ключа верхнего уровня (определяется автоматически)
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Указывает форматтер, который используется для содержимого словаря при синхронизации JSON-файлов. Это позволяет использовать различные синтаксисы форматирования сообщений, совместимые с runtime Intlayer.

- `undefined`: Форматтер не используется, содержимое JSON используется как есть.
- `'intlayer'`: Стандартный форматтер Intlayer (по умолчанию).
- `'icu'`: Использует форматирование сообщений ICU (совместимо с библиотеками вроде react-intl, vue-i18n).
- `'i18next'`: Использует форматирование сообщений i18next (совместимо с i18next, next-i18next, Solid-i18next).

> Обратите внимание, что использование форматтера преобразует ваше JSON-содержимое на входе и на выходе. Для сложных правил JSON, таких как плюralизация ICU, парсинг может не обеспечивать точное соответствие 1 к 1 между входными и выходными данными.
> Если вы не используете runtime Intlayer, вы можете предпочесть не задавать форматтер.

**Пример:**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // Использовать форматирование i18next для совместимости
}),
```

#### `splitKeys` (boolean)

Определяет, должен ли один JSON-файл, у которого **ключи первого уровня являются пространствами имён**, превращаться в отдельный словарь для каждого ключа верхнего уровня, вместо одного словаря, содержащего весь файл.

Это соответствует модели пространств имён таких библиотек, как `next-intl` и `react-intl`, где один файл `messages/{locale}.json` группирует несколько пространств имён по их ключам первого уровня, каждое из которых адресуется независимо (например, `useTranslations('Hero')` обращается к словарю `Hero`).

- `undefined` (по умолчанию): **определяется автоматически**. Файл разбивается, если в шаблоне `source` отсутствует сегмент `{key}` (один файл содержит все пространства имён), и сохраняется как один словарь в остальных случаях (один файл на каждый ключ).
- `true`: всегда разбивать каждый ключ верхнего уровня на отдельный словарь.
- `false`: никогда не разбивать; весь файл становится одним словарём.

Для одного файла `messages/{locale}.json`:

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
  // splitKeys: true, // подразумевается, так как шаблон не содержит сегмент `{key}`
}),
```

Это создает три словаря (`Hero`, `Nav` и `About`), чтобы `useTranslations('Hero')` (next-intl) корректно находил нужные данные. При обратной записи все пространства имен пересобираются в один и тот же файл для каждой локали.

> Если вы сохраняете явный сегмент `{key}` в вашем `source` (например, `./locales/${locale}/${key}.json`), каждый файл уже содержит одно пространство имен, поэтому разбиение по умолчанию отключено.

### Несколько JSON-источников и приоритет

Вы можете добавить несколько плагинов `syncJSON`, чтобы синхронизировать различные JSON-источники. Это полезно, когда в проекте используется несколько библиотек интернационализации или различные структуры JSON.

#### Система приоритетов

Когда несколько плагинов работают с одним и тем же ключом словаря, параметр `priority` определяет, какой плагин имеет преимущество:

- Бо́льшие числа приоритета имеют преимущество над меньшими
- Приоритет по умолчанию для файлов `.content` равен `0`
- Приоритет по умолчанию для плагинов равен `0`
- Плагины с одинаковым приоритетом обрабатываются в порядке их следования в конфигурации

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

    // Устаревший источник JSON (самый низкий приоритет)
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

## Плагин Load JSON

### Быстрый старт

Добавьте плагин в `intlayer.config.ts`, чтобы импортировать существующие JSON-файлы как словари Intlayer. Этот плагин работает только на чтение (без записи на диск):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Импорт JSON-сообщений, расположенных в любом месте вашего дерева исходников
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // Загружать только одну локаль на экземпляр плагина (по умолчанию — defaultLocale из конфигурации)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Альтернатива: структура с разделением по локалям, по-прежнему только для чтения (загружается только выбранная локаль):

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

- Обнаружение: формирует glob-шаблон на основе вашего построителя `source` и собирает подходящие JSON-файлы.
- Загрузка: загружает каждый JSON-файл как словарь Intlayer с указанной `locale`.
- Только чтение: не записывает и не форматирует выходные файлы; используйте `syncJSON`, если нужна двусторонняя синхронизация.
- Готовность к автозаполнению: определяет шаблон `fill`, чтобы `intlayer content fill` мог заполнить отсутствующие ключи.

### API

```ts
loadJSON({
  // Формируйте пути к вашим JSON-файлам. `locale` необязателен, если в вашей структуре нет сегмента с локалью
  source: ({ key, locale }) => string,

  // Locale cible pour les dictionnaires chargés par cette instance du plugin
  // Par défaut : configuration.internationalization.defaultLocale
  locale?: Locale,

  // Libellé optionnel pour identifier la source
  location?: string, // par défaut : "plugin"

  // Priorité utilisée pour résoudre les conflits avec d'autres sources
  priority?: number, // par défaut : 0

  // Formateur optionnel pour le contenu JSON
  format?: 'intlayer' | 'icu' | 'i18next', // par défaut : 'intlayer'

  // Découpe un fichier unique en un dictionnaire par clé de premier niveau (détection automatique)
  splitKeys?: boolean,
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Указывает форматтер, который используется для содержимого словаря при загрузке JSON-файлов. Это позволяет использовать различные синтаксисы форматирования сообщений, совместимые с разными i18n-библиотеками.

- `'intlayer'`: Стандартный форматтер Intlayer (по умолчанию).
- `'icu'`: Использует форматирование сообщений ICU (совместим с библиотеками, такими как react-intl, vue-i18n).
- `'i18next'`: Использует форматирование сообщений i18next (совместим с i18next, next-i18next, Solid-i18next).

**Пример:**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // Использовать форматирование ICU для совместимости
}),
```

#### `splitKeys` (boolean)

Так же, как в [`syncJSON`](#splitkeys-boolean): когда один JSON-файл группирует несколько пространств имён по своим ключам первого уровня, каждый ключ верхнего уровня становится отдельным словарём.

- `undefined` (по умолчанию): **определяется автоматически**, разбиение выполняется, если в шаблоне `source` нет сегмента `{key}`, в противном случае создаётся один словарь.
- `true` / `false`: принудительно включить или отключить разбиение.

```ts
loadJSON({
  source: ({ locale }) => `./messages/${locale}.json`,
  format: "icu",
  // splitKeys включается автоматически: `Hero`, `Nav`, `About`, … становятся отдельными словарями
}),
```

### Поведение и соглашения

- Если в вашей маске `source` есть плейсхолдер локали, загружаются только файлы для выбранной `locale`.
- Если в вашей маске нет сегмента `{key}`, каждый ключ верхнего уровня файла по умолчанию становится отдельным словарём (см. [`splitKeys`](#splitkeys-boolean)). Установите `splitKeys: false`, чтобы загрузить весь файл как один словарь `index`.
- Ключи выводятся из путей к файлам путём подстановки плейсхолдера `{key}` в вашем построителе `source`.
- Плагин использует только найденные файлы и не создаёт отсутствующие локали или ключи.
- Путь `fill` выводится из вашего `source` и используется для обновления отсутствующих значений через CLI, когда вы включаете эту опцию.

## Разрешение конфликтов

Когда один и тот же ключ перевода существует в нескольких источниках JSON:

1. Окончательное значение определяет плагин с наивысшим приоритетом
2. Источники с более низким приоритетом используются как запасные варианты для отсутствующих ключей
3. Это позволяет сохранять устаревшие переводы, постепенно переходя на новые структуры

## CLI

Синхронизированные JSON-файлы будут обрабатываться так же, как и другие файлы `.content`. Это означает, что все команды intlayer будут доступны и для синхронизированных JSON-файлов, включая:

- `intlayer content test` для проверки наличия недостающих переводов
- `intlayer content list` для вывода списка синхронизированных JSON-файлов
- `intlayer content fill` для заполнения недостающих переводов
- `intlayer content push` для отправки синхронизированных JSON-файлов
- `intlayer content pull` для получения синхронизированных JSON-файлов

Подробнее см. в разделе [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md)
