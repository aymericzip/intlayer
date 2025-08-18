---
createdAt: 2024-08-13
updatedAt: 2025-08-18
title: Форматтеры
description: Утилиты для форматирования с учетом локали на основе Intl для чисел, процентов, валюты, дат, относительного времени, единиц измерения и компактной записи. Включает кешированный помощник Intl.
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
  - Интернационализация
slugs:
  - doc
  - formatters
---

# Форматтеры Intlayer

## Обзор

Intlayer предоставляет набор легковесных помощников, построенных поверх нативных API `Intl`, а также кешированный обертку `Intl`, чтобы избежать повторного создания тяжелых форматтеров. Эти утилиты полностью учитывают локаль и могут использоваться из основного пакета `intlayer`.

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
} from "intlayer";
```

Если вы используете React, хуки также доступны; смотрите `react-intlayer/format`.

## Кешированный Intl

Экспортируемый `Intl` — это тонкая кешированная обертка вокруг глобального `Intl`. Она мемоизирует экземпляры `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, что позволяет избежать повторного создания одного и того же форматтера.

Поскольку создание форматтера относительно дорогостоящее, такое кеширование улучшает производительность без изменения поведения. Обертка предоставляет тот же API, что и нативный `Intl`, поэтому использование идентично.

- Кеширование происходит на уровне процесса и прозрачно для вызывающих.

> Если `Intl.DisplayNames` недоступен в среде, выводится одно предупреждение только для разработчиков (рекомендуется использовать полифилл).

Пример:

```ts
import { Intl } from "intlayer";

const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"
```

## Форматтеры

Все приведённые ниже помощники экспортируются из `intlayer`.

### `number(value, options?)`

Форматирует числовое значение с учётом локальных правил группировки и десятичных знаков.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Примеры:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (в en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
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
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
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

- Передайте "now" в качестве первого аргумента, а целевое время — вторым, чтобы получить естественную формулировку.
- **from**: `Date | string | number`
- **to**: `Date | string | number` (по умолчанию `new Date()`)
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - По умолчанию `unit` — `"second"`.

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

Форматирует число, используя компактную нотацию (например, `1.2K`, `1M`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (использует `notation: 'compact'` под капотом)

Примеры:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 миллион"
```

## Примечания

- Все вспомогательные функции принимают входные данные в виде `string`; они внутренне приводятся к числам или датам.
- Локаль по умолчанию берется из вашей настройки `internationalization.defaultLocale`, если не указана явно.
- Эти утилиты являются тонкими обертками; для расширенного форматирования используйте стандартные опции `Intl`.

## Точки входа и реэкспорты (`@index.ts`)

Форматтеры находятся в основном пакете и реэкспортируются из пакетов более высокого уровня для удобства импорта в разных средах выполнения:

Примеры:

```ts
// Код приложения (рекомендуется)
import { number, currency, date, Intl } from "intlayer";
```

### React

Клиентские компоненты:

```ts
import { useNumber, useCurrency, useDate } from "react-intlayer/format";
// или в приложениях Next.js
import { useNumber, useCurrency, useDate } from "next-intlayer/client/format";
```

Серверные компоненты (или React Server runtime):

```ts
import { useNumber, useCurrency, useDate } from "intlayer/server/format";
// или в приложениях Next.js
import { useNumber, useCurrency, useDate } from "next-intlayer/server/format";
```

> Эти хуки будут учитывать локаль из `IntlayerProvider` или `IntlayerServerProvider`

## История документации

| Версия | Дата       | Изменения                             |
| ------ | ---------- | ------------------------------------- |
| 5.8.0  | 2025-08-18 | Добавлена документация по форматтерам |
