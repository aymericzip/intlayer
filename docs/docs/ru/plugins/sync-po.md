---
createdAt: 2026-05-10
updatedAt: 2026-05-10
title: Плагин Sync PO
description: Синхронизируйте словари Intlayer с файлами Gettext PO. Сохраняйте существующую i18n, используя Intlayer для управления, перевода и тестирования ваших сообщений.
keywords:
  - Intlayer
  - Sync PO
  - Gettext
  - i18n
  - переводы
slugs:
  - doc
  - plugin
  - sync-po
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 8.9.4
    date: 2026-05-10
    changes: "Начальная документация плагина Sync PO"
---

# Sync PO (i18n мосты) - Синхронизация PO с поддержкой ICU / i18next

Используйте Intlayer как дополнение к вашему существующему стеку i18n. Этот плагин синхронизирует ваши сообщения Gettext PO со словарями Intlayer, чтобы вы могли:

- Сохранить существующий рабочий процесс перевода на основе PO.
- Управлять и переводить свои сообщения с помощью Intlayer (CLI, CI, провайдеры, CMS) без рефакторинга вашего приложения.
- Выпускать учебные пособия и SEO-контент для каждой экосистемы, предлагая Intlayer в качестве уровня управления PO.

Примечания и текущая область применения:

- Экстернализация в CMS работает для переводов и классического текста.
- Пока нет поддержки вставок, множественного числа/ICU или расширенных функций среды выполнения других библиотек внутри самих записей PO.
- Визуальный редактор пока не поддерживается для сторонних выходных данных i18n.

### Когда использовать этот плагин

- Вы уже используете файлы Gettext PO для своих переводов.
- Вы хотите использовать заполнение с помощью ИИ, тестирование в CI и операции с контентом без изменения среды выполнения рендеринга.

## Установка

```bash
pnpm add -D @intlayer/sync-po-plugin
# или
npm i -D @intlayer/sync-po-plugin
```

## Плагины

Этот пакет предоставляет два плагина:

- `loadPO`: Загрузка PO-файлов в словари Intlayer.
  - Этот плагин используется для загрузки PO-файлов из источника и их добавления в словари Intlayer. Он может сканировать всю кодовую базу и искать определенные PO-файлы.
    Этот плагин можно использовать:
    - если вы используете библиотеку i18n, которая навязывает определенное местоположение для загрузки ваших PO-файлов, но вы хотите разместить объявление контента там, где вам удобно в вашей кодовой базе.
    - Его также можно использовать, если вы хотите получать свои сообщения из удаленного источника (например, CMS, API и т. д.) и сохранять их в PO-файлах.

  > Под капотом этот плагин сканирует всю кодовую базу, ищет определенные PO-файлы и загружает их в словари Intlayer.
  > Обратите внимание, что этот плагин не записывает вывод и переводы обратно в PO-файлы.

- `syncPO`: Синхронизация PO-файлов со словарями Intlayer.
  - Этот плагин используется для синхронизации PO-файлов со словарями Intlayer. Он может сканировать заданное местоположение и загружать PO, соответствующие шаблону для определенных PO-файлов. Этот плагин полезен, если вы хотите получить преимущества Intlayer, используя другую библиотеку i18n.

## Использование обоих плагинов

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO, syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Синхронизация текущих PO-файлов со словарями Intlayer
  plugins: [
    /**
     * Загрузит все PO-файлы в src, соответствующие шаблону {key}.i18n.po
     */
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      locale: Locales.ENGLISH,
      priority: 1, // Гарантирует, что эти PO-файлы имеют приоритет над файлами в `./locales/en/${key}.po`
    }),
    /**
     * Загрузит и запишет вывод и переводы обратно в PO-файлы в каталоге locales
     */
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      priority: 0,
    }),
  ],
};

export default config;
```

## Плагин `syncPO`

### Быстрый старт

Добавьте плагин в свой `intlayer.config.ts` и укажите на существующую структуру PO.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Синхронизация текущих PO-файлов со словарями Intlayer
  plugins: [
    syncPO({
      // Структура по локалям и пространствам имен
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

Альтернатива: один файл на локаль:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      source: ({ locale }) => `./locales/${locale}.po`,
    }),
  ],
};

export default config;
```

#### Как это работает

- Чтение: плагин обнаруживает PO-файлы с помощью вашего сборщика `source` и загружает их как словари Intlayer.
- Запись: после сборки и заполнения он записывает локализованные PO обратно по тем же путям (с правильными заголовками Gettext).
- Автозаполнение: плагин объявляет путь `autoFill` для каждого словаря. Запуск `intlayer fill` по умолчанию обновляет только отсутствующие переводы в ваших PO-файлах.

API:

```ts
syncPO({
  source: ({ key, locale }) => string, // обязательно
  location?: string, // необязательная метка, по умолчанию: "sync-po::path/to/source"
  priority?: number, // необязательный приоритет для разрешения конфликтов, по умолчанию: 0
});
```

### Несколько источников PO и приоритет

Вы можете добавить несколько плагинов `syncPO` для синхронизации различных источников PO. Это полезно, когда у вас есть несколько источников перевода или различные структуры PO в вашем проекте.

#### Система приоритетов

Когда несколько плагинов нацелены на один и тот же ключ словаря, параметр `priority` определяет, какой плагин имеет преимущество:

- Более высокие числа приоритета побеждают над более низкими
- Приоритет файлов `.content` по умолчанию равен `0`
- Приоритет плагинов по умолчанию равен `0`
- Плагины с одинаковым приоритетом обрабатываются в том порядке, в котором они появляются в конфигурации

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Основной источник PO (наивысший приоритет)
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      location: "main-translations",
      priority: 10,
    }),

    // Резервный источник PO (более низкий приоритет)
    syncPO({
      source: ({ locale }) => `./fallback-locales/${locale}.po`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Устаревший источник PO (самый низкий приоритет)
    syncPO({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.po`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Плагин Load PO

### Быстрый старт

Добавьте плагин в свой `intlayer.config.ts`, чтобы поглощать существующие PO-файлы как словари Intlayer. Этот плагин работает только на чтение (без записи на диск):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Поглощение сообщений PO, расположенных в любом месте вашего дерева исходных кодов
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      // Загрузка одной локали на экземпляр плагина (по умолчанию используется defaultLocale из конфигурации)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Альтернатива: структура по локалям, все еще только для чтения (загружается только выбранная локаль):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadPO({
      // Только файлы для Locales.FRENCH будут загружены по этому шаблону
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### Как это работает

- Обнаружение: создает glob из вашего сборщика `source` и собирает соответствующие PO-файлы.
- Поглощение: загружает каждый PO-файл как словарь Intlayer с указанной локалью `locale`.
- Только чтение: не записывает и не форматирует выходные файлы; используйте `syncPO`, если вам нужна двусторонняя синхронизация.
- Готовность к автозаполнению: определяет путь `fill`, чтобы `intlayer content fill` мог заполнить отсутствующие ключи.

### API

```ts
loadPO({
  // Сборка путей к вашим PO. `locale` необязателен, если в вашей структуре нет сегмента локали
  source: ({ key, locale }) => string,

  // Целевая локаль для словарей, загружаемых этим экземпляром плагина
  // По умолчанию используется configuration.internationalization.defaultLocale
  locale?: Locale,

  // Необязательная метка для идентификации источника
  location?: string, // по умолчанию: "plugin"

  // Приоритет, используемый для разрешения конфликтов с другими источниками
  priority?: number, // по умолчанию: 0
});
```

### Поведение и соглашения

- Если ваша маска `source` включает заполнитель локали, поглощаются только файлы для выбранной локали `locale`.
- Если в вашей маске нет сегмента `{key}`, ключом словаря будет "index".
- Ключи извлекаются из путей к файлам путем замены заполнителя `{key}` в вашем сборщике `source`.
- Плагин использует только обнаруженные файлы и не создает недостающие локали или ключи.
- Путь `fill` выводится из вашего `source` и используется для обновления отсутствующих значений через CLI, когда вы соглашаетесь.

## Разрешение конфликтов

Когда один и тот же ключ перевода существует в нескольких источниках PO:

1. Плагин с наивысшим приоритетом определяет конечное значение.
2. Источники с более низким приоритетом используются в качестве резервных для отсутствующих ключей.
3. Это позволяет вам сохранять устаревшие переводы, постепенно переходя на новые структуры.

## CLI

Синхронизированные PO-файлы будут рассматриваться так же, как и другие файлы `.content`. Это означает, что для синхронизированных PO-файлов будут доступны все команды intlayer. Включая:

- `intlayer content test` для проверки наличия отсутствующих переводов
- `intlayer content list` для вывода списка синхронизированных PO-файлов
- `intlayer content fill` для заполнения отсутствующих переводов
- `intlayer content push` для отправки синхронизированных PO-файлов
- `intlayer content pull` для получения синхронизированных PO-файлов

См. [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) для получения более подробной информации.

## Ограничения (текущие)

- Отсутствие поддержки вставок или множественного числа/ICU при нацеливании на сторонние библиотеки.
- Визуальный редактор пока недоступен для сред выполнения, отличных от Intlayer.
- Только синхронизация PO; форматы каталогов, отличные от PO, не поддерживаются.

## Почему это важно

- Мы можем рекомендовать устоявшиеся решения i18n и позиционировать Intlayer как дополнение.
- Мы используем их SEO/ключевые слова с учебными пособиями, которые заканчиваются предложением использовать Intlayer для управления PO.
- Расширяет целевую аудиторию с «новых проектов» до «любой команды, уже использующей i18n».
