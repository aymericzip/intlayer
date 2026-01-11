---
createdAt: 2025-03-13
updatedAt: 2025-12-13
title: Плагін Sync JSON
description: Синхронізуйте словники Intlayer із зовнішніми i18n JSON-файлами (i18next, next-intl, react-intl, vue-i18n та ін.). Залишайте ваш існуючий i18n-стек і використовуйте Intlayer для керування, перекладу та тестування повідомлень.
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
  - переклади
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.5.0
    date: 2025-12-13
    changes: Додано підтримку форматів ICU та i18next
  - version: 6.1.6
    date: 2025-10-05
    changes: Початкова документація плагіна Sync JSON
---

# Sync JSON (містки i18n) - Синхронізація JSON з підтримкою ICU / i18next

<iframe title="Як синхронізувати ваші JSON-переклади з Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Використовуйте Intlayer як додаток до вашого існуючого стеку i18n. Цей плагін синхронізує ваші JSON-повідомлення зі словниками Intlayer, тож ви можете:

- Продовжувати використовувати i18next, next‑intl, react‑intl, vue‑i18n, next‑translate, nuxt‑i18n, Solid‑i18next, svelte‑i18n тощо.
- Керувати та перекладати ваші повідомлення за допомогою Intlayer (CLI, CI, providers, CMS), без рефакторингу додатка.
- Публікуйте навчальні матеріали та SEO‑контент, орієнтований на кожну екосистему, пропонуючи Intlayer як шар управління JSON.

Зауваги та поточна область охоплення:

- Екстерналізація в CMS працює для перекладів та звичайного тексту.
- Поки що немає підтримки вставок, форм множини/ICU або розширених runtime‑функцій інших бібліотек.
- Візуальний редактор поки що не підтримується для виходів сторонніх i18n‑бібліотек.

### Коли використовувати цей плагін

- Ви вже використовуєте i18n‑бібліотеку та зберігаєте повідомлення в JSON‑файлах.
- Ви хочете AI‑допомогу при заповненні, тестування в CI та операції з контентом без зміни runtime для рендерингу.

## Встановлення

```bash
pnpm add -D @intlayer/sync-json-plugin
# or
npm i -D @intlayer/sync-json-plugin
```

## Плагіни

Цей пакет надає два плагіни:

- `loadJSON`: Завантажувати JSON‑файли в словники Intlayer.
  - Цей плагін використовується для завантаження JSON-файлів з джерела і поміщає їх у словники Intlayer. Він може просканувати весь codebase і знайти конкретні JSON-файли.
    Цей плагін можна використовувати
    - якщо ви використовуєте i18n-бібліотеку, яка вимагає певного розташування для завантаження ваших JSON (наприклад: `next-intl`, `i18next`, `react-intl`, `vue-i18n` тощо), але ви хочете розміщувати декларації контенту там, де вам зручно у вашому codebase.
    - Також його можна використовувати, якщо ви хочете отримувати повідомлення з віддаленого джерела (наприклад: CMS, API тощо) і зберігати ці повідомлення в JSON-файлах.

  > Під капотом цей плагін просканує весь codebase, знайде конкретні JSON-файли і завантажить їх у словники Intlayer.
  > Зауважте, цей плагін не записує результат і переклади назад у JSON-файли.

- `syncJSON`: Синхронізує JSON-файли зі словниками Intlayer.
  - Цей плагін використовується для синхронізації JSON-файлів зі словниками Intlayer. Він може просканувати вказане розташування та завантажити JSON-файли, що відповідають заданому шаблону. Цей плагін корисний, якщо ви хочете отримати переваги Intlayer, використовуючи іншу i18n-бібліотеку.

## Використання обох плагінів

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Тримайте ваші поточні JSON-файли синхронізованими зі словниками Intlayer
  plugins: [
    /**
     * Завантажить усі JSON-файли у src, що відповідають шаблону {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Ensures these JSON files take precedence over files at `./locales/en/${key}.json`
      format: "intlayer", // Format of the JSON content
    }),
    /**
     * Завантажить та запише результати й переклади назад у JSON-файли в директорії locales
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
      format: "i18next",
    }),
  ],
};

export default config;
```

## Плагін `syncJSON`

### Швидкий старт

Додайте плагін до вашого `intlayer.config.ts` і вкажіть шлях до наявної структури JSON.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Підтримуйте поточні JSON-файли синхронізованими зі словниками Intlayer
  plugins: [
    syncJSON({
      // Розміщення по локалі та namespace (наприклад, next-intl, i18next з namespaces)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "icu",
    }),
  ],
};

export default config;
```

Альтернатива: один файл на мову (поширено для налаштувань i18next/react-intl):

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

#### Як це працює

- Зчитування: плагін знаходить JSON-файли через ваш builder `source` і завантажує їх як словники Intlayer.
- Запис: після збірок і заповнення, він записує локалізований JSON назад за тими самими шляхами (з кінцевим символом нового рядка, щоб уникнути проблем з форматуванням).
- Автозаповнення: плагін оголошує шлях `autoFill` для кожного словника. Запуск `intlayer fill` за замовчуванням оновлює лише відсутні переклади у ваших JSON-файлах.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // обов'язково
  location?: string, // необов'язковий ярлик, за замовчуванням: "plugin"
  priority?: number, // необов'язковий пріоритет для вирішення конфліктів, за замовчуванням: 0
  format?: 'intlayer' | 'icu' | 'i18next', // необов'язковий форматтер, використовується для сумісності з intlayer runtime
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Визначає форматер, який буде використовуватися для вмісту словника під час синхронізації JSON-файлів. Це дозволяє використовувати різні синтакси форматування повідомлень, сумісні з Intlayer runtime.

- `undefined`: Форматер не використовуватиметься, JSON-контент буде використовуватися як є.
- `'intlayer'`: Форматер Intlayer за замовчуванням.
- `'icu'`: Використовує форматування повідомлень ICU (сумісне з бібліотеками на кшталт react-intl, vue-i18n).
- `'i18next'`: Використовує форматування повідомлень i18next (сумісне з i18next, next-i18next, Solid-i18next).

> Зверніть увагу, що використання форматера перетворює ваш JSON-контент на вході та на виході. Для складних правил JSON, наприклад ICU plurals, парсинг може не забезпечити відповідності 1:1 між вхідними та вихідними даними. Якщо ви не використовуєте Intlayer runtime, можливо, краще не встановлювати форматер.

**Приклад:**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // Використовувати форматування i18next для сумісності
}),
```

### Кілька джерел JSON та пріоритет

Ви можете додавати кілька плагінів `syncJSON` для синхронізації різних джерел JSON. Це корисно, коли у вашому проєкті використовується декілька i18n бібліотек або різні структури JSON.

#### Система пріоритетів

Коли декілька плагінів орієнтуються на той самий ключ словника, параметр `priority` визначає, який плагін матиме перевагу:

- Вищі значення пріоритету мають перевагу над нижчими
- Пріоритет за замовчуванням для файлів `.content` — `0`
- Пріоритет плагінів за замовчуванням — `0`
- Плагіни з однаковим пріоритетом обробляються в порядку їхнього розміщення в конфігурації

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Основне джерело JSON (найвищий пріоритет)
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // Резервне джерело JSON (нижчий пріоритет)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Спадкове джерело JSON (найнижчий пріоритет)
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

## Плагін loadJSON

### Швидкий старт

Додайте плагін у ваш `intlayer.config.ts`, щоб імпортувати наявні JSON-файли як словники Intlayer. Цей плагін лише для читання (без запису на диск):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Імпортувати JSON-повідомлення, розташовані в будь-якому місці структури вашого проєкту
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // Завантажує одну локаль на екземпляр плагіна (за замовчуванням — config.defaultLocale)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Альтернатива: макет по локалях, все ще лише для читання (завантажується тільки обрана локаль):

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
      // За цим шаблоном завантажуватимуться лише файли для Locales.FRENCH
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### Як це працює

- Виявлення (Discover): будує glob з вашого `source` builder і збирає відповідні JSON-файли.
- Імпорт (Ingest): завантажує кожен JSON-файл як словник Intlayer з вказаною `locale`.
- Тільки для читання (Read‑only): не записує і не форматирує вихідні файли; використовуйте `syncJSON`, якщо вам потрібен двосторонній синхрон.
- Готово до авто‑заповнення (Auto‑fill ready): визначає шаблон `fill`, щоб `intlayer content fill` міг заповнювати відсутні ключі.

### API

```ts
loadJSON({
  // Побудувати шляхи до ваших JSON-файлів. `locale` необов'язковий, якщо у вашій структурі немає сегмента локалі
  source: ({ key, locale }) => string,

  // Цільова локаль для словників, завантажених цим екземпляром плагіна
  // За замовчуванням — configuration.internationalization.defaultLocale
  locale?: Locale,

  // Необов'язковий мітка для ідентифікації джерела
  location?: string, // за замовчуванням: "plugin"

  // Пріоритет, що використовується для вирішення конфліктів із іншими джерелами
  priority?: number, // за замовчуванням: 0

  // Необов'язковий форматувач для JSON-вмісту
  format?: 'intlayer' | 'icu' | 'i18next', // за замовчуванням: 'intlayer'
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Вказує форматувач, який використовується для вмісту словника при завантаженні JSON-файлів. Це дозволяє використовувати різні синтаксиси форматування повідомлень, сумісні з різними i18n-бібліотеками.

- `'intlayer'`: Форматувач Intlayer за замовчуванням.
- `'icu'`: Використовує форматування повідомлень ICU (сумісне з бібліотеками, такими як react-intl, vue-i18n).
- `'i18next'`: Використовує форматування i18next (сумісне з i18next, next-i18next, Solid-i18next).

**Приклад:**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // Використовувати форматування ICU для сумісності
}),
```

### Поведінка та конвенції

- Якщо ваша маска `source` містить плейсхолдер локалі, імпортуються лише файли для обраної `locale`.
- Якщо в масці немає сегмента `{key}`, ключ словника — "index".
- Ключі виводяться зі шляхів файлів шляхом підстановки плейсхолдера `{key}` у вашому source builder.
- Плагін використовує лише виявлені файли і не створює відсутні локалі чи ключі.
- Шлях `fill` виводиться з вашого `source` і використовується для оновлення відсутніх значень через CLI, якщо ви погодитесь.

## Вирішення конфліктів

Коли один і той самий ключ перекладу існує в кількох JSON-джерелах:

1. Плагін з найвищим пріоритетом визначає остаточне значення
2. Джерела з нижчим пріоритетом використовуються як резервні джерела для відсутніх ключів
3. Це дозволяє зберігати наявні (legacy) переклади під час поступової міграції до нових структур

## Інтерфейс командного рядка (CLI)

Синхронізовані JSON-файли розглядатимуться як інші `.content` файли. Це означає, що всі команди intlayer будуть доступні для синхронізованих JSON-файлів. Включно з:

- `intlayer content test` — щоб перевірити, чи є відсутні переклади
- `intlayer content list` — перелічити синхронізовані JSON-файли
- `intlayer content fill` — заповнити відсутні переклади
- `intlayer content push` — відправити (push) синхронізовані JSON-файли
- `intlayer content pull` — отримати (pull) синхронізовані JSON-файли

Дивіться [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md) для детальнішої інформації.

## Поточні обмеження

- Відсутня підтримка вставок або plurals/ICU при орієнтації на сторонні бібліотеки.
- Візуальний редактор поки недоступний для рантаймів, що не є Intlayer.
- Підтримується лише синхронізація JSON; формати каталогів, відмінні від JSON, не підтримуються.

## Чому це важливо

- Ми можемо рекомендувати усталені i18n-рішення й позиціонувати Intlayer як доповнення.
- Ми використовуємо їхнє SEO та ключові слова через навчальні матеріали, які наприкінці пропонують використовувати Intlayer для керування JSON.
- Розширює цільову аудиторію з «нових проєктів» до «будь-якої команди, що вже використовує i18n».
