---
createdAt: 2026-05-10
updatedAt: 2026-05-10
title: Плагін Sync PO
description: Синхронізуйте словники Intlayer з файлами Gettext PO. Зберігайте існуючу i18n, використовуючи Intlayer для керування, перекладу та тестування ваших повідомлень.
keywords:
  - Intlayer
  - Sync PO
  - Gettext
  - i18n
  - переклади
slugs:
  - doc
  - plugin
  - sync-po
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 8.9.4
    date: 2026-05-10
    changes: "Початкова документація плагіна Sync PO"
author: aymericzip
---

# Sync PO (i18n мости) - Синхронізація PO з підтримкою ICU / i18next

Використовуйте Intlayer як доповнення до вашого існуючого стека i18n. Цей плагін синхронізує ваші повідомлення Gettext PO зі словниками Intlayer, щоб ви могли:

- Зберігати існуючий робочий процес перекладу на основі PO.
- Керувати та перекладати свої повідомлення за допомогою Intlayer (CLI, CI, провайдери, CMS) без рефакторингу вашого додатка.
- Випускати навчальні посібники та SEO-контент для кожної екосистеми, пропонуючи Intlayer як рівень керування PO.

Примітки та поточна область застосування:

- Екстерналізація в CMS працює для перекладів та класичного тексту.
- Поки немає підтримки вставок, множини/ICU або розширених функцій середовища виконання інших бібліотек всередині самих записів PO.
- Візуальний редактор поки не підтримується для сторонніх вихідних даних i18n.

### Коли використовувати цей плагін

- Ви вже використовуєте файли Gettext PO для своїх перекладів.
- Ви хочете використовувати заповнення за допомогою ШІ, тестування в CI та операції з контентом без зміни середовища виконання рендерингу.

## Встановлення

```bash
pnpm add -D @intlayer/sync-po-plugin
# або
npm i -D @intlayer/sync-po-plugin
```

## Плагіни

Цей пакет надає два плагіни:

- `loadPO`: Завантаження PO-файлів у словники Intlayer.
  - Цей плагін використовується для завантаження PO-файлів з джерела, і вони будуть додані до словників Intlayer. Він може сканувати всю кодову базу та шукати певні PO-файли.
    Цей плагін можна використовувати:
    - якщо ви використовуєте бібліотеку i18n, яка нав'язує певне місце розташування для завантаження ваших PO-файлів, але ви хочете розмістити оголошення контенту там, де вам зручно у вашій кодовій базі.
    - Його також можна використовувати, якщо ви хочете отримувати свої повідомлення з віддаленого джерела (наприклад: CMS, API тощо) і зберігати свої повідомлення в PO-файлах.

  > Під капотом цей плагін сканує всю кодову базу, шукає певні PO-файли та завантажує їх у словники Intlayer.
  > Зверніть увагу, що цей плагін не записує вивід та переклади назад у PO-файли.

- `syncPO`: Синхронізація PO-файлів зі словниками Intlayer.
  - Цей плагін використовується для синхронізації PO-файлів зі словниками Intlayer. Він може сканувати задане місце розташування та завантажувати PO, що відповідають шаблону для певних PO-файлів. Цей плагін корисний, якщо ви хочете отримати переваги Intlayer, використовуючи іншу бібліотеку i18n.

## Використання обох плагінів

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO, syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Синхронізація поточних PO-файлів зі словниками Intlayer
  plugins: [
    /**
     * Завантажить усі PO-файли в src, що відповідають шаблону {key}.i18n.po
     */
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      locale: Locales.ENGLISH,
      priority: 1, // Гарантує, що ці PO-файли мають пріоритет над файлами в `./locales/en/${key}.po`
    }),
    /**
     * Завантажить та запише вивід та переклади назад у PO-файли в каталозі locales
     */
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      priority: 0,
    }),
  ],
};

export default config;
```

## Плагін `syncPO`

### Швидкий старт

Додайте плагін у свій `intlayer.config.ts` та вкажіть на існуючу структуру PO.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Синхронізація поточних PO-файлів зі словниками Intlayer
  plugins: [
    syncPO({
      // Структура за локалями та просторами імен
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

#### Як це працює

- Читання: плагін виявляє PO-файли за допомогою вашого збірника `source` та завантажує їх як словники Intlayer.
- Запис: після збірки та заповнення він записує локалізовані PO назад за тими ж шляхами (з правильними заголовками Gettext).
- Автозаповнення: плагін оголошує шлях `autoFill` для кожного словника. Запуск `intlayer fill` за замовчуванням оновлює лише відсутні переклади у ваших PO-файлах.

API:

```ts
syncPO({
  source: ({ key, locale }) => string, // обов'язково
  location?: string, // необов'язкова мітка, за замовчуванням: "sync-po::path/to/source"
  priority?: number, // необов'язковий пріоритет для вирішення конфліктів, за замовчуванням: 0
});
```

### Кілька джерел PO та пріоритет

Ви можете додати кілька плагінів `syncPO` для синхронізації різних джерел PO. Це корисно, коли у вас є кілька джерел перекладу або різні структури PO у вашому проекті.

#### Система пріоритетів

Коли кілька плагінів націлені на один і той же ключ словника, параметр `priority` визначає, який плагін має перевагу:

- Вищі числа пріоритету перемагають нижчі
- Пріоритет файлів `.content` за замовчуванням дорівнює `0`
- Пріоритет плагінів за замовчуванням дорівнює `0`
- Плагіни з однаковим пріоритетом обробляються в тому порядку, в якому вони з'являються в конфігурації

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Основне джерело PO (найвищий пріоритет)
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      location: "main-translations",
      priority: 10,
    }),

    // Резервне джерело PO (нижчий пріоритет)
    syncPO({
      source: ({ locale }) => `./fallback-locales/${locale}.po`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Застаріле джерело PO (найнижчий пріоритет)
    syncPO({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.po`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Плагін Load PO

### Швидкий старт

Додайте плагін у свій `intlayer.config.ts`, щоб поглинати існуючі PO-файли як словники Intlayer. Цей плагін працює тільки на читання (без запису на диск):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Поглинання повідомлень PO, розташованих у будь-якому місці вашого дерева вихідних кодів
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      // Завантаження однієї локалі на екземпляр плагіна (за замовчуванням використовується defaultLocale з конфігурації)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Альтернатива: структура за локалями, все ще тільки для читання (завантажується тільки вибрана локаль):

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
      // Тільки файли для Locales.UKRAINIAN будуть завантажені за цим шаблоном
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      locale: Locales.UKRAINIAN,
    }),
  ],
};

export default config;
```

### Як це працює

- Виявлення: створює glob з вашого збірника `source` та збирає відповідні PO-файли.
- Поглинання: завантажує кожен PO-файл як словник Intlayer з вказаною локаллю `locale`.
- Тільки читання: не записує та не форматує вихідні файли; використовуйте `syncPO`, якщо вам потрібна двостороння синхронізація.
- Готовність до автозаповнення: визначає шлях `fill`, щоб `intlayer content fill` міг заповнити відсутні ключі.

### API

```ts
loadPO({
  // Збірка шляхів до ваших PO. `locale` необов'язковий, якщо у вашій структурі немає сегмента локалі
  source: ({ key, locale }) => string,

  // Цільова локаль для словників, що завантажуються цим екземпляром плагіна
  // За замовчуванням використовується configuration.internationalization.defaultLocale
  locale?: Locale,

  // Необов'язкова мітка для ідентифікації джерела
  location?: string, // за замовчуванням: "plugin"

  // Пріоритет, що використовується для вирішення конфліктів з іншими джерелами
  priority?: number, // за замовчуванням: 0
});
```

### Поведінка та угоди

- Якщо ваша маска `source` включає заповнювач локалі, поглинаються лише файли для вибраної локалі `locale`.
- Якщо у вашій масці немає сегмента `{key}`, ключем словника буде "index".
- Ключі отримуються зі шляхів до файлів шляхом заміни заповнювача `{key}` у вашому збірнику `source`.
- Плагін використовує лише виявлені файли та не створює відсутні локалі або ключі.
- Шлях `fill` виводиться з вашого `source` і використовується для оновлення відсутніх значень через CLI, коли ви погоджуєтесь.

## Вирішення конфліктів

Коли один і той же ключ перекладу існує в кількох джерелах PO:

1. Плагін з найвищим пріоритетом визначає кінцеве значення.
2. Джерела з нижчим пріоритетом використовуються як резервні для відсутніх ключів.
3. Це дозволяє вам зберігати застарілі переклади, поступово переходячи на нові структури.

## CLI

Синхронізовані PO-файли будуть розглядатися так само, як і інші файли `.content`. Це означає, що для синхронізованих PO-файлів будуть доступні всі команди intlayer. Включаючи:

- `intlayer content test` для перевірки наявності відсутніх перекладів
- `intlayer content list` для виведення списку синхронізованих PO-файлов
- `intlayer content fill` для заповнення відсутніх перекладів
- `intlayer content push` для відправки синхронізованих PO-файлов
- `intlayer content pull` для отримання синхронізованих PO-файлов

Див. [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) для отримання детальнішої інформації.

## Обмеження (поточні)

- Відсутність підтримки вставок або множини/ICU при націлюванні на сторонні бібліотеки.
- Візуальний редактор поки недоступний для середовищ виконання, відмінних від Intlayer.
- Тільки синхронізація PO; формати каталогів, відмінні від PO, не підтримуються.

## Чому це важливо

- Ми можемо рекомендувати встановлені рішення i18n і позиціонувати Intlayer як доповнення.
- Ми використовуємо їх SEO/ключові слова з навчальними посібниками, які закінчуються пропозицією використовувати Intlayer для керування PO.
- Розширює цільову аудиторію з «нових проектів» до «будь-якої команди, що вже використовує i18n».
