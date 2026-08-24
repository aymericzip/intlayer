---
createdAt: 2024-08-13
updatedAt: 2025-10-14
title: Форматери
description: Засоби форматування, орієнтовані на локаль, на основі Intl для чисел, відсотків, валют, дат, відносного часу, одиниць та компактного представлення. Містить кешований хелпер Intl.
keywords:
  - Форматери
  - Intl
  - Числа
  - Валюта
  - Відсотки
  - Дати
  - Відносний час
  - Одиниці
  - Компактне представлення
  - Список
  - Інтернаціоналізація
slugs:
  - doc
  - formatters
history:
  - version: 6.2.0
    date: 2025-10-14
    changes: "Видалено getIntlayerAsync з форматерів"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Додано форматери для Vue"
  - version: 5.8.0
    date: 2025-08-18
    changes: "Додано документацію щодо форматерів"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Додано документацію для форматера списків"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Додано додаткові утиліти Intl (DisplayNames, Collator, PluralRules)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Додано утиліти для локалі (getLocaleName, getLocaleLang, getLocaleFromPath тощо)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Додано утиліти обробки контенту (getContent, getTranslation, getIntlayer тощо)"
author: aymericzip
---

# Форматери Intlayer

## Зміст

<TOC/>

## Cached Intl

Because formatter construction is relatively expensive, this caching improves performance without changing behavior. The wrapper exposes the same API as the native `Intl`, so usage is identical.

> Якщо `Intl.DisplayNames` недоступний у середовищі, виводиться одне попередження лише для розробників (розгляньте можливість поліфілу).

Приклади:

## Утиліти локалей

### `getLocaleName(displayLocale, targetLocale?)`

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // англійською: "French"
getLocaleName("en", "fr"); // французькою: "anglais"
getLocaleName("de", "es"); // іспанською: "alemán"
```

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

Генерує локалізований URL для поточної локалі:

- **url**: Початковий URL для локалізації
- **currentLocale**: Поточна локаль
- **locales**: Необов'язковий масив підтримуваних локалей (за замовчуванням, сконфігуровані локалі)
- **defaultLocale**: Необов'язкова локаль за замовчуванням (за замовчуванням, сконфігурована локаль за замовчуванням)
- **prefixDefault**: Чи додавати префікс для локалі за замовчуванням (за замовчуванням, сконфігуроване значення)

### `getContent(node, nodeProps, locale?)`

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

### `getIntlayer(dictionaryKey, locale?, plugins?)`

Отримує та трансформує вміст із словника за ключем:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

## Форматувачі

### `number(value, options?)`

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (в en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `currency(value, options?)`

Форматує значення як локалізовану валюту. За замовчуванням `USD` з двома знаками після коми.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Типові поля: `currency` (наприклад, `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

### `relativeTime(from, to = new Date(), options?)`

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "через 3 дні"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 години тому"
```

### `units(value, options?)`

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Загальні поля: `unit` (наприклад, `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - За замовчуванням: `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 кілометрів"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (залежить від локалі)
```

## Vanilla JS / Node.js Formatters

Для контекстів без фреймворку імпортуйте форматери безпосередньо з `intlayer`. Зверніть увагу, що ви повинні передати locale вручну.

### `list(values, options?)`

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // результат: "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

### Функції форматування

#### `number(value, options?)`

Форматує числове значення з врахуванням локалі для групування та десяткових знаків.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
number(123456.789); // "123,456.789" (in en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

#### `percentage(value, options?)`

Форматує число як рядок відсотка. Значення більше 1 нормалізуються (наприклад, `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

#### `currency(value, options?)`

Форматує значення як локалізовану валюту. За замовчуванням використовує `USD`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `currency`, `currencyDisplay` (`"symbol" | "code" | "name"`)

```ts
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

#### `date(date, optionsOrPreset?)`

Форматує значення дати/часу.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` або preset: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

```ts
date(new Date(), "short"); // наприклад, "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

#### `relativeTime(from, to?, options?)`

Форматує відносний час між двома моментами.

- **from**: `Date | string | number`
- **to**: `Date | string | number` (за замовчуванням `new Date()`)
- **options**: `{ locale?, unit?, numeric?, style? }`

```ts
const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "через 3 дні"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 години тому"
```

#### `units(value, options?)`

Форматує числове значення з одиницею виміру.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `unit` (e.g., `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)

```ts
units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"
```

#### `compact(value, options?)`

Форматує число за допомогою компактного запису.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

#### `list(values, options?)`

Форматує масив у локалізований рядок списку.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Поширені: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)

```ts
list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
```

## Cached Intl

Експортований `Intl` з `intlayer` — це кешований wrapper навколо глобального `Intl`. Він мемоізує екземпляри форматерів (`NumberFormat`, `DateTimeFormat` тощо), щоб уникнути їхнього повторного створення та поліпшити продуктивність.

```ts
import { Intl } from "intlayer";

// Форматування чисел
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// Назви відображення для мов, регіонів тощо
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Collation для сортування
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (equal)

// Правила множини
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

### Додаткові функції Intl

#### `Intl.DisplayNames`

Для локалізованих назв мов, регіонів, валют та письмових систем:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

#### `Intl.Collator`

Для локалізованого порівняння та сортування рядків:

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base",
  numeric: true,
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

#### `Intl.PluralRules`

Для визначення форм множини в різних локалях:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## Locale Utilities

### `getLocaleName(displayLocale, targetLocale?)`

Отримує локалізовану назву локалі:

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

### `getLocaleLang(locale?)`

Витягує код мови з рядка локалі:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
```

### `getLocaleFromPath(inputUrl)`

Витягує сегмент локалі з URL-адреси або шляху:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (локаль за замовчуванням)
```

### `getPathWithoutLocale(inputUrl, locales?)`

Видаляє сегмент локалі з URL:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
```

### React

Клієнтські компоненти:

```ts
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "react-intlayer/server/format";
// або в додатках Next.js
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "next-intlayer/server/format";
```

### `getHTMLTextDir(locale?)`

Повертає напрямок тексту для локалі:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

## Утиліти обробки вмісту

### Vue

Клієнтські компоненти:

```ts
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "vue-intlayer/format";
```

### `getTranslation(languageContent, locale?, fallback?)`

Витягує вміст для конкретної локалі:

```ts
import { getTranslation } from "intlayer";

const content = getTranslation(
  { en: "Hello", fr: "Bonjour", de: "Hallo" },
  "fr",
  true
); // "Bonjour"
```

### `getIntlayer(dictionaryKey, locale?, plugins?)`

Отримує та трансформує вміст зі словника:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
```

## Примітки

- Усі помічники приймають входи типу `string`; внутрішньо вони перетворюються на числа або дати.
- Locale за замовчуванням використовує ваш налаштований `internationalization.defaultLocale`, якщо він не надано.
- Ці утиліти є тонкими обгортками; для розширеного форматування передайте стандартні параметри `Intl`.
