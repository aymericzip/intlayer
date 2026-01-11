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
    changes: Видалено getIntlayerAsync з форматерів
  - version: 5.8.0
    date: 2025-08-20
    changes: Додано форматери для Vue
  - version: 5.8.0
    date: 2025-08-18
    changes: Додано документацію щодо форматерів
  - version: 5.8.0
    date: 2025-08-20
    changes: Додано документацію для форматера списків
  - version: 5.8.0
    date: 2025-08-20
    changes: Додано додаткові утиліти Intl (DisplayNames, Collator, PluralRules)
  - version: 5.8.0
    date: 2025-08-20
    changes: Додано утиліти для локалі (getLocaleName, getLocaleLang, getLocaleFromPath тощо)
  - version: 5.8.0
    date: 2025-08-20
    changes: Додано утиліти обробки контенту (getContent, getTranslation, getIntlayer тощо)
---

# Форматери Intlayer

## Зміст

<TOC/>

## Огляд

Intlayer надає набір легких хелперів, побудованих поверх рідних API `Intl`, а також кешований обгорток `Intl`, щоб уникнути повторного створення важких форматерів. Ці утиліти повністю враховують локаль і можуть використовуватися з основного пакета `intlayer`.

### Імпорт

```ts
import {
  Intl,
  number,
  percentage,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  getLocaleName,
  getLocaleLang,
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedUrl,
  getHTMLTextDir,
  getContent,
  getTranslation,
  getIntlayer,
} from "intlayer";
```

If you are using React, hooks are also available; see `react-intlayer/format`.

## Cached Intl

The exported `Intl` is a thin, cached wrapper around the global `Intl`. It memoizes instances of `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, `ListFormat`, `DisplayNames`, `Collator`, and `PluralRules`, which avoids rebuilding the same formatter repeatedly.

Because formatter construction is relatively expensive, this caching improves performance without changing behavior. The wrapper exposes the same API as the native `Intl`, so usage is identical.

- Кешування здійснюється на рівні процесу й є прозорим для викликачів.

> Якщо `Intl.DisplayNames` недоступний у середовищі, виводиться одне попередження лише для розробників (розгляньте можливість поліфілу).

Приклади:

```ts
import { Intl } from "intlayer";

// Форматування чисел
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// Відображувані назви мов, регіонів тощо
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Порівняння рядків для сортування
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (рівні)

// Правила множини
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "інше"
```

## Додаткові утиліти Intl

Окрім допоміжних форматерів, ви також можете безпосередньо використовувати кешований обгорток Intl для інших можливостей Intl:

### `Intl.DisplayNames`

Для локалізованих назв мов, регіонів, валют та писемностей:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "французька"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "Сполучені Штати"
```

### `Intl.Collator`

Для порівняння рядків та сортування з урахуванням локалі:

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base",
  numeric: true,
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

### `Intl.PluralRules`

Для визначення форм множини в різних локалях:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "нуль"
pluralRules.select(1); // "один"
pluralRules.select(2); // "два"
pluralRules.select(3); // "кілька"
pluralRules.select(11); // "багато"
```

## Утиліти локалей

### `getLocaleName(displayLocale, targetLocale?)`

Отримує локалізовану назву локалі в іншій локалі:

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // англійською: "French"
getLocaleName("en", "fr"); // французькою: "anglais"
getLocaleName("de", "es"); // іспанською: "alemán"
```

- **displayLocale**: Локаль, для якої потрібно отримати назву
- **targetLocale**: Локаль, в якій відображається назва (за замовчуванням displayLocale)

### `getLocaleLang(locale?)`

Витягує код мови з рядка локалі:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

- **locale**: Локаль, з якої потрібно витягти код мови (за замовчуванням поточна локаль)

### `getLocaleFromPath(inputUrl)`

Витягує сегмент локалі з URL або шляху:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (default locale)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

- **inputUrl**: Повний рядок URL або шлях (pathname) для обробки
- **returns**: Виявлена локаль або локаль за замовчуванням, якщо локаль не знайдена

### `getPathWithoutLocale(inputUrl, locales?)`

Видаляє сегмент локалі з URL або шляху (pathname):

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
getPathWithoutLocale("https://example.com/en/about"); // "https://example.com/about"
```

- **inputUrl**: Повний рядок URL або шлях (pathname) для обробки
- **locales**: Необов'язковий масив підтримуваних локалей (за замовчуванням використовується сконфігурований список локалей)
- **returns**: URL без сегменту локалі

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

Генерує локалізований URL для поточної локалі:

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

- **url**: Початковий URL для локалізації
- **currentLocale**: Поточна локаль
- **locales**: Необов'язковий масив підтримуваних локалей (за замовчуванням — сконфігуровані локалі)
- **defaultLocale**: Необов'язкова локаль за замовчуванням (за замовчуванням — сконфігурована локаль за замовчуванням)
- **prefixDefault**: Чи додавати префікс для локалі за замовчуванням (за замовчуванням — сконфігуроване значення)

### `getHTMLTextDir(locale?)`

Повертає напрямок тексту для локалі:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // повертає "ltr"
getHTMLTextDir("ar"); // повертає "rtl"
getHTMLTextDir("he"); // повертає "rtl"
```

- **locale**: Локаль, для якої потрібно отримати напрямок тексту (за замовчуванням — поточна локаль)
- **повертає**: `"ltr"`, `"rtl"`, або `"auto"`

## Утиліти обробки контенту

### `getContent(node, nodeProps, locale?)`

Перетворює вузол контенту за допомогою всіх доступних плагінів (translation, enumeration, insertion тощо):

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

- **node**: Вузол контенту, який потрібно перетворити
- **nodeProps**: Властивості для контексту перетворення
- **locale**: Необов'язкова локаль (за замовчуванням використовується налаштована локаль)

### `getTranslation(languageContent, locale?, fallback?)`

Витягує вміст для конкретної локалі з об'єкта мовного вмісту:

```ts
import { getTranslation } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    de: "Hallo",
  },
  "fr",
  true
); // "Bonjour"
```

- **languageContent**: Об'єкт, що відображає локалі на відповідний вміст
- **locale**: Цільова локаль (за замовчуванням використовується налаштована локаль)
- **fallback**: Чи виконувати відкат до локалі за замовчуванням (за замовчуванням true)

### `getIntlayer(dictionaryKey, locale?, plugins?)`

Отримує та трансформує вміст із словника за ключем:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

- **dictionaryKey**: Ключ словника, який необхідно отримати
- **locale**: Необов'язкова локаль (за замовчуванням — налаштована локаль за замовчуванням)
- **plugins**: Необов'язковий масив кастомних плагінів трансформації

## Форматувачі

Усі допоміжні функції нижче експортуються з `intlayer`.

### `number(value, options?)`

Форматує числове значення з урахуванням локалі для групування та десяткових знаків.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Examples:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (в en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

Форматує число у рядок відсотків.

Поведінка: значення більше за 1 інтерпретується як повні відсотки та нормалізується (наприклад, `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Приклади:

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### `currency(value, options?)`

Форматує значення як локалізовану валюту. За замовчуванням `USD` з двома знаками після коми.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Типові поля: `currency` (наприклад, `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

Приклади:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

Форматує значення дати/часу за допомогою `Intl.DateTimeFormat`.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` або один із пресетів:
  - Presets: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

Приклади:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // наприклад: "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

Форматує відносний час між двома моментами за допомогою `Intl.RelativeTimeFormat`.

- Передайте "now" як перший аргумент, а цільовий — як другий, щоб отримати природне формулювання.
- **from**: `Date | string | number`
- **to**: `Date | string | number` (за замовчуванням — `new Date()`)
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - За замовчуванням `unit` — `"second"`.

Приклади:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "через 3 дні"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 години тому"
```

### `units(value, options?)`

Форматує числове значення як локалізований рядок одиниці виміру, використовуючи `Intl.NumberFormat` зі `style: 'unit'`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Загальні поля: `unit` (наприклад, `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - За замовчуванням: `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

Приклади:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 кілометрів"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (залежить від локалі)
```

### `compact(value, options?)`

Форматує число з використанням компактної нотації (наприклад, `1.2K`, `1M`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (використовує `notation: 'compact'` під капотом)

Приклади:

```ts
import { compact } from "intlayer";

compact(1200); // результат: "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // результат: "1 million"
```

### `list(values, options?)`

Форматує масив значень у локалізований рядок списку за допомогою `Intl.ListFormat`.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Загальні поля: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)
  - За замовчуванням: `type: 'conjunction'`, `style: 'long'`

Приклади:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // результат: "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

## Примітки

- Усі утиліти приймають вхідні значення як `string`; всередині вони приводяться до чисел або дат.
- Якщо локаль не вказана, за замовчуванням використовується налаштована вами `internationalization.defaultLocale`.
- Ці утиліти — тонкі обгортки; для просунутого форматування передавайте стандартні опції `Intl`.

## Точки входу та повторні експорти (`@index.ts`)

Форматери містяться в core-пакеті і реекспортуються з пакетів вищого рівня, щоб зробити імпорти зручними в різних середовищах виконання:

Приклади:

```ts
// Код додатку (рекомендовано)
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  Intl,
  getLocaleName,
  getLocaleLang,
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedUrl,
  getHTMLTextDir,
  getContent,
  getTranslation,
  getIntlayer,
} from "intlayer";
```

### React

Клієнтські компоненти:

```tsx
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "react-intlayer/format";
// або в Preact-додатках
// "preact-intlayer/format";
// або в Next.js-додатках
// "next-intlayer/client/format";

const MyComponent = () => {
  const number = useNumber();
  const currency = useCurrency();
  const date = useDate();
  const percentage = usePercentage();
  const compact = useCompact();
  const list = useList();
  const relativeTime = useRelativeTime();
  const unit = useUnit();

  return (
    <div>
      <p>{number(123456.789)}</p>
      <p>{currency(1234.5, { currency: "EUR" })}</p>
      <p>{date(new Date(), "short")}</p>
      <p>{percentage(0.25)}</p>
      <p>{compact(1200)}</p>
      <p>{list(["apple", "banana", "orange"])}</p>
      <p>{relativeTime(new Date(), new Date() + 1000)}</p>
      <p>{unit(123456.789, { unit: "kilometer" })}</p>
    </div>
  );
};
```

Серверні компоненти (або React Server runtime):

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

> Ці хуки братимуть до уваги локаль із `IntlayerProvider` або `IntlayerServerProvider`

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

> Ці composables братимуть до уваги локаль із ін'єктованого `IntlayerProvider`
