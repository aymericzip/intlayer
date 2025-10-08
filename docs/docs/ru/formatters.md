---
createdAt: 2024-08-13
updatedAt: 2025-08-20
title: Форматтеры
description: Утилиты для форматирования с учётом локали на основе Intl для чисел, процентов, валюты, дат, относительного времени, единиц измерения и компактной записи. Включает кешированный помощник Intl.
keywords:
  - Форматтеры
  - Intl
  - Число
  - Валюта
  - Процент
  - Дата
  - Относительное время
  - Единицы измерения
  - Компактный формат
  - Список
  - Интернационализация
slugs:
  - doc
  - formatters
---

# Форматтеры Intlayer

## Обзор

Intlayer предоставляет набор лёгких помощников, построенных поверх нативных API `Intl`, а также кешированный обёртку `Intl`, чтобы избежать многократного создания тяжёлых форматтеров. Эти утилиты полностью учитывают локаль и могут использоваться из основного пакета `intlayer`.

### Импорт

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
  getIntlayerAsync,
} from "intlayer";
```

Если вы используете React, хуки также доступны; смотрите `react-intlayer/format`.

## Кешированный Intl

Экспортируемый `Intl` — это тонкая кешированная обёртка вокруг глобального `Intl`. Он мемоизирует экземпляры `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, `ListFormat`, `DisplayNames`, `Collator` и `PluralRules`, что позволяет избежать повторного создания одного и того же форматтера.

Поскольку создание форматтера относительно дорогостоящее, такое кеширование улучшает производительность без изменения поведения. Обёртка предоставляет тот же API, что и нативный `Intl`, поэтому использование идентично.

- Кеширование происходит на уровне процесса и прозрачно для вызывающих.

> Если `Intl.DisplayNames` недоступен в среде, выводится одно предупреждение только для разработчиков (рекомендуется использовать полифилл).

Примеры:

```ts
import { Intl } from "intlayer";

// Форматирование чисел
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// Отображение названий языков, регионов и т.д.
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Сортировка с учётом локали
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (равны)

// Правила множественного числа
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

## Дополнительные утилиты Intl

Помимо помощников для форматтеров, вы также можете использовать кешированную обёртку Intl напрямую для других возможностей Intl:

### `Intl.DisplayNames`

Для локализованных названий языков, регионов, валют и систем письма:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

### `Intl.Collator`

Для локализованного сравнения и сортировки строк:

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

Для определения форм множественного числа в разных локалях:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## Утилиты локалей

### `getLocaleName(displayLocale, targetLocale?)`

Получает локализованное название локали на другом языке:

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

- **displayLocale**: Локаль, для которой нужно получить название
- **targetLocale**: Локаль, на которой будет отображаться название (по умолчанию displayLocale)

### `getLocaleLang(locale?)`

Извлекает код языка из строки локали:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

- **locale**: Локаль, из которой нужно извлечь язык (по умолчанию текущая локаль)

### `getLocaleFromPath(inputUrl)`

Извлекает сегмент локали из URL или пути:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (локаль по умолчанию)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

- **inputUrl**: Полная строка URL или путь для обработки
- **returns**: Обнаруженная локаль или локаль по умолчанию, если локаль не найдена

### `getPathWithoutLocale(inputUrl, locales?)`

Удаляет сегмент локали из URL или пути:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
getPathWithoutLocale("https://example.com/en/about"); // "https://example.com/about"
```

- **inputUrl**: Полная строка URL или путь для обработки
- **locales**: Необязательный массив поддерживаемых локалей (по умолчанию используется настроенный список локалей)
- **returns**: URL без сегмента локали

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

Генерирует локализованный URL для текущей локали:

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

- **url**: Исходный URL для локализации
- **currentLocale**: Текущая локаль
- **locales**: Необязательный массив поддерживаемых локалей (по умолчанию используется настроенный список локалей)
- **defaultLocale**: Необязательная локаль по умолчанию (по умолчанию используется настроенная локаль по умолчанию)
- **prefixDefault**: Добавлять ли префикс для локали по умолчанию (по умолчанию используется настроенное значение)

### `getHTMLTextDir(locale?)`

Возвращает направление текста для локали:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

- **locale**: Локаль, для которой нужно получить направление текста (по умолчанию текущая локаль)
- **returns**: `"ltr"`, `"rtl"` или `"auto"`

## Утилиты для обработки контента

### `getContent(node, nodeProps, locale?)`

Преобразует узел контента со всеми доступными плагинами (перевод, перечисление, вставка и т.д.):

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

- **node**: Узел контента для преобразования
- **nodeProps**: Свойства для контекста преобразования
- **locale**: Необязательная локаль (по умолчанию используется настроенная локаль по умолчанию)

### `getTranslation(languageContent, locale?, fallback?)`

Извлекает контент для конкретной локали из объекта с языковым содержимым:

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

- **languageContent**: Объект, сопоставляющий локали с контентом
- **locale**: Целевая локаль (по умолчанию используется настроенная локаль по умолчанию)
- **fallback**: Использовать ли резервный вариант с локалью по умолчанию (по умолчанию true)

### `getIntlayer(dictionaryKey, locale?, plugins?)`

Получает и преобразует контент из словаря по ключу:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

- **dictionaryKey**: Ключ словаря для получения
- **locale**: Необязательная локаль (по умолчанию используется настроенная локаль по умолчанию)
- **plugins**: Необязательный массив пользовательских плагинов трансформации

### `getIntlayerAsync(dictionaryKey, locale?, plugins?)`

Асинхронно получает контент из удалённого словаря:

```ts
import { getIntlayerAsync } from "intlayer";

const content = await getIntlayerAsync("common", "fr");
```

- **dictionaryKey**: Ключ словаря для получения
- **locale**: Необязательная локаль (по умолчанию используется настроенная локаль по умолчанию)
- **plugins**: Необязательный массив пользовательских плагинов трансформации

## Форматтеры

Все ниже перечисленные помощники экспортируются из `intlayer`.

### `number(value, options?)`

Форматирует числовое значение с учетом локали, группировки и десятичных знаков.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Примеры:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (в en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

Форматирует число в строку с процентами.

Поведение: значения больше 1 интерпретируются как целые проценты и нормализуются (например, `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Примеры:

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### `currency(value, options?)`

Форматирует значение как локализованную валюту. По умолчанию используется `USD` с двумя десятичными знаками.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Общие поля: `currency` (например, `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

Примеры:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

Форматирует значение даты/времени с помощью `Intl.DateTimeFormat`.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` или один из предустановленных вариантов:
  - Предустановки: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

Примеры:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // например, "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

Форматирует относительное время между двумя моментами с помощью `Intl.RelativeTimeFormat`.

- Передайте "now" в качестве первого аргумента и целевой момент вторым, чтобы получить естественную формулировку.
- **from**: `Date | string | number`
- **to**: `Date | string | number` (по умолчанию `new Date()`)
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - По умолчанию `unit` равен `"second"`.

Примеры:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "через 3 дня"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 часа назад"
```

### `units(value, options?)`

Форматирует числовое значение как локализованную строку с единицей измерения, используя `Intl.NumberFormat` с `style: 'unit'`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Общие поля: `unit` (например, `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - Значения по умолчанию: `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

Примеры:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (зависит от локали)
```

### `compact(value, options?)`

Форматирует число с использованием компактной нотации (например, `1.2K`, `1M`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (использует `notation: 'compact'` под капотом)

Примеры:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

### `list(values, options?)`

Форматирует массив значений в локализованную строку списка с использованием `Intl.ListFormat`.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Общие поля: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)
  - Значения по умолчанию: `type: 'conjunction'`, `style: 'long'`

Примеры:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

### React

Клиентские компоненты:

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
// или в приложениях Next.js
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "next-intlayer/client/format";

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

Серверные компоненты (или React Server runtime):

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
// или в приложениях Next.js
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

> Эти хуки будут учитывать локаль из `IntlayerProvider` или `IntlayerServerProvider`

### Vue

Клиентские компоненты:

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

> Эти композиции будут учитывать локаль из внедренного `IntlayerProvider`

## История документации

| Версия | Дата       | Изменения                             |
| ------ | ---------- | ------------------------------------- |
| 5.8.0  | 2025-08-20 | Добавлены форматтеры для Vue          |
| 5.8.0  | 2025-08-18 | Добавлена документация по форматтерам |

Компоненты клиента:

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

> Эти композиционные функции будут учитывать локаль из внедренного `IntlayerProvider`

## История документации

| Версия | Дата       | Изменения                                                                                |
| ------ | ---------- | ---------------------------------------------------------------------------------------- |
| 5.8.0  | 2025-08-20 | Добавлены форматтеры списка                                                              |
| 5.8.0  | 2025-08-20 | Добавлены дополнительные утилиты Intl (DisplayNames, Collator, PluralRules)              |
| 5.8.0  | 2025-08-20 | Добавлены утилиты локали (getLocaleName, getLocaleLang, getLocaleFromPath и др.)         |
| 5.8.0  | 2025-08-20 | Добавлены утилиты для работы с контентом (getContent, getTranslation, getIntlayer и др.) |
