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
history:
  - version: 5.8.0
    date: 2025-08-20
    changes: "Добавлены форматтеры для Vue"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Добавлены форматтеры списка"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Добавлены дополнительные утилиты Intl (DisplayNames, Collator, PluralRules)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Добавлены утилиты локали (getLocaleName, getLocaleLang, getLocaleFromPath и др.)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Добавлены утилиты для работы с контентом (getContent, getTranslation, getIntlayer и др.)"
  - version: 5.8.0
    date: 2025-08-18
    changes: "Добавлена документация по форматтерам"
author: aymericzip
---

# Форматтеры Intlayer

## Обзор

Intlayer предоставляет набор лёгких помощников, построенных поверх нативных API `Intl`, а также кешированный обёртку `Intl`, чтобы избежать многократного создания тяжёлых форматтеров. Эти утилиты полностью учитывают локаль и могут использоваться из основного пакета `intlayer`.

## Кешированный Intl

Поскольку создание форматтера относительно дорогостоящее, такое кеширование улучшает производительность без изменения поведения. Обёртка предоставляет тот же API, что и нативный `Intl`, поэтому использование идентично.

> Если `Intl.DisplayNames` недоступен в среде, выводится одно предупреждение только для разработчиков (рекомендуется использовать полифилл).

Примеры:

## React Formatters

### `Intl.DisplayNames`

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

### Доступные Hooks

Все hooks автоматически используют локаль из `IntlayerProvider` или `IntlayerServerProvider`.

| Hook                | Description                                 | Example Output                |
| ------------------- | ------------------------------------------- | ----------------------------- |
| `useNumber()`       | Форматирование чисел с разделением          | `"123,456.789"`               |
| `useCurrency()`     | Форматирование значений валют               | `"€1,234.50"`                 |
| `usePercentage()`   | Форматирование процентов                    | `"25%"`                       |
| `useDate()`         | Форматирование дат и времени                | `"Aug 2, 2025"`               |
| `useRelativeTime()` | Форматирование относительного времени       | `"in 3 days"`                 |
| `useUnit()`         | Форматирование значений с единицами         | `"5 kilometers"`              |
| `useCompact()`      | Форматирование чисел в сокращенной форме    | `"1.2K"`                      |
| `useList()`         | Форматирование массивов как списки          | `"apple, banana, and orange"` |
| `useIntl()`         | Получить привязанный к локали объект `Intl` | Full `Intl` API access        |

### `Intl.Collator`

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

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

### Доступные Composables

Все composables возвращают computed refs, которые автоматически используют локаль из внедренного `IntlayerProvider`.

| Composable          | Описание                                    | Пример вывода                 |
| ------------------- | ------------------------------------------- | ----------------------------- |
| `useNumber()`       | Форматирование чисел с группировкой         | `"123,456.789"`               |
| `useCurrency()`     | Форматирование значений валют               | `"€1,234.50"`                 |
| `usePercentage()`   | Форматирование процентов                    | `"25%"`                       |
| `useDate()`         | Форматирование дат и времени                | `"Aug 2, 2025"`               |
| `useRelativeTime()` | Форматирование относительного времени       | `"in 3 days"`                 |
| `useUnit()`         | Форматирование значений с единицами         | `"5 kilometers"`              |
| `useCompact()`      | Форматирование чисел в компактной нотации   | `"1.2K"`                      |
| `useList()`         | Форматирование массивов как списки          | `"apple, banana, and orange"` |
| `useIntl()`         | Получить привязанный к локали объект `Intl` | Полный доступ к `Intl` API    |

### Полный пример

```vue
<script setup>
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

const number = useNumber();
const currency = useCurrency();
const date = useDate();
const percentage = usePercentage();
const compact = useCompact();
const list = useList();
const relativeTime = useRelativeTime();
const unit = useUnit();
</script>

<template>
  <div>
    <p>{{ number.value(123456.789) }}</p>
    <p>{{ currency.value(1234.5, { currency: "EUR" }) }}</p>
    <p>{{ date.value(new Date(), "short") }}</p>
    <p>{{ percentage.value(0.25) }}</p>
    <p>{{ compact.value(1200) }}</p>
    <p>{{ list.value(["apple", "banana", "orange"]) }}</p>
    <p>{{ relativeTime.value(new Date(), new Date(Date.now() + 86400000)) }}</p>
    <p>{{ unit.value(5, { unit: "kilometer" }) }}</p>
  </div>
</template>
```

### Composable `useIntl`

Composable `useIntl` предоставляет прямой доступ к объекту `Intl`, привязанному к локали. Это полезно, когда вам нужен полный API `Intl` с автоматическим внедрением локали.

```vue
<script setup>
import { useIntl } from "vue-intlayer/format";

const intl = useIntl(); // использует локаль контекста

// Стандартный API Intl, но локаль автоматически внедряется, если не определена
const formatted = new intl.value.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
}).format(123.45);

// Вы все еще можете переопределить локаль, если необходимо
const date = new intl.value.DateTimeFormat("fr-FR").format(new Date());

// Доступ к другим функциям Intl
const displayNames = new intl.value.DisplayNames(undefined, {
  type: "language",
});
const languageName = displayNames.of("fr");
</script>

<template>
  <div>
    <p>{{ formatted }}</p>
    <p>{{ date }}</p>
    <p>{{ languageName }}</p>
  </div>
</template>
```

## Vanilla JS / Node.js Formatters

Для контекстов без framework'а импортируйте форматтеры напрямую из `intlayer`. Обратите внимание, что вы должны передать locale вручную.

### `getLocaleLang(locale?)`

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

### Функции форматирования

#### `number(value, options?)`

Форматирует числовое значение с учётом локали, используя локализованные разделители групп и десятичные разделители.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
number(123456.789); // "123,456.789" (в en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

#### `percentage(value, options?)`

Форматирует число как строку процента. Значения больше 1 нормализуются (например, `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

#### `currency(value, options?)`

Форматирует значение как локализованную валюту. По умолчанию `USD`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `currency`, `currencyDisplay` (`"symbol" | "code" | "name"`)

```ts
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

#### `date(date, optionsOrPreset?)`

Форматирует значение даты/времени.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` или preset: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

```ts
date(new Date(), "short"); // например, "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

#### `relativeTime(from, to?, options?)`

Форматирует относительное время между двумя моментами.

- **from**: `Date | string | number`
- **to**: `Date | string | number` (по умолчанию `new Date()`)
- **options**: `{ locale?, unit?, numeric?, style? }`

```ts
const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "через 3 дня"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 часа назад"
```

#### `units(value, options?)`

Форматирует числовое значение с единицей измерения.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `unit` (например, `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)

```ts
units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"
```

#### `compact(value, options?)`

Форматирует число с использованием компактной нотации.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

#### `list(values, options?)`

Форматирует массив в локализованную строку списка.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Common: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)

```ts
list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
```

## Cached Intl

Экспортируемый `Intl` из `intlayer` — это кэшированная обёртка вокруг глобального `Intl`. Она мемоизирует экземпляры форматтеров (`NumberFormat`, `DateTimeFormat` и т. д.), чтобы избежать их повторного создания и улучшить производительность.

```ts
import { Intl } from "intlayer";

// Форматирование чисел
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// Отображение названий языков, регионов и т. д.
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Сортировка по правилам коллации
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (equal)

// Правила plurals
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

### Дополнительные возможности Intl

#### `Intl.DisplayNames`

Для локализованных названий языков, регионов, валют и письменностей:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

#### `Intl.Collator`

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

#### `Intl.PluralRules`

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

## Утилиты Локализации

### `percentage(value, options?)`

Примеры:

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### `currency(value, options?)`

Примеры:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

Примеры:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // например, "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

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

Примеры:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (зависит от локали)
```

### `compact(value, options?)`

Примеры:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

## Утилиты для обработки содержимого

### `list(values, options?)`

Примеры:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

### React

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

### Vue

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

## Примечания

- Все вспомогательные функции принимают входные данные типа `string`; они внутренне преобразуются в числа или даты.
- Локаль по умолчанию использует ваш настроенный `internationalization.defaultLocale`, если не указана.
- Эти утилиты являются тонкими оболочками; для продвинутого форматирования передавайте стандартные параметры `Intl`.
