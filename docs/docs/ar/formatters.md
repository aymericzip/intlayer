---
createdAt: 2024-08-13
updatedAt: 2025-08-18
title: أدوات التنسيق
description: أدوات تنسيق مدركة للغة بناءً على Intl للأرقام والنسب المئوية والعملات والتواريخ والوقت النسبي والوحدات والترميز المضغوط. تتضمن مساعد Intl مخزن مؤقتًا.
keywords:
  - أدوات التنسيق
  - Intl
  - رقم
  - عملة
  - نسبة مئوية
  - تاريخ
  - وقت نسبي
  - وحدات
  - مضغوط
  - التدويل
slugs:
  - doc
  - formatters
---

# أدوات تنسيق Intlayer

## نظرة عامة

يوفر Intlayer مجموعة من المساعدين الخفيفين المبنيين على واجهات برمجة التطبيقات الأصلية `Intl`، بالإضافة إلى غلاف `Intl` مخزن مؤقتًا لتجنب إعادة إنشاء أدوات التنسيق الثقيلة بشكل متكرر. هذه الأدوات مدركة تمامًا للغة ويمكن استخدامها من الحزمة الرئيسية `intlayer`.

### الاستيراد

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

إذا كنت تستخدم React، فإن الخطافات متاحة أيضًا؛ راجع `react-intlayer/format`.

## Intl المخزن مؤقتًا

الـ `Intl` المصدر هو غلاف رقيق مخزن مؤقتًا حول الـ `Intl` العالمي. يقوم بتخزين مثيلات `NumberFormat` و `DateTimeFormat` و `RelativeTimeFormat` في الذاكرة المؤقتة، مما يتجنب إعادة بناء نفس أداة التنسيق مرارًا وتكرارًا.

نظرًا لأن إنشاء أدوات التنسيق مكلف نسبيًا، فإن هذا التخزين المؤقت يحسن الأداء دون تغيير السلوك. يكشف الغلاف عن نفس واجهة برمجة التطبيقات مثل الـ `Intl` الأصلي، لذا فإن الاستخدام متطابق.

- التخزين المؤقت يتم لكل عملية وهو شفاف للمستدعين.

> إذا لم يكن `Intl.DisplayNames` متاحًا في البيئة، يتم طباعة تحذير واحد خاص بالمطور فقط (فكر في استخدام polyfill).

مثال:

```ts
import { Intl } from "intlayer";

const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"
```

## أدوات التنسيق

جميع الأدوات المساعدة أدناه مُصدرة من `intlayer`.

### `number(value, options?)`

يقوم بتنسيق قيمة رقمية باستخدام التجميع والفواصل العشرية المعتمدة على اللغة.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

أمثلة:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (في en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

يقوم بتنسيق رقم كسلسلة نسبة مئوية.

السلوك: القيم الأكبر من 1 تُفسر كنسب مئوية كاملة ويتم تطبيعها (مثلاً، `25` → `25%`، `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

أمثلة:

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### `currency(value, options?)`

يقوم بتنسيق القيمة كعملة محلية. القيمة الافتراضية هي `USD` مع خانتين عشريتين.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - الحقول الشائعة: `currency` (مثل `"EUR"`)، `currencyDisplay` (`"symbol" | "code" | "name"`)

أمثلة:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

يقوم بتنسيق قيمة التاريخ/الوقت باستخدام `Intl.DateTimeFormat`.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` أو أحد الإعدادات المسبقة:
  - الإعدادات المسبقة: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

أمثلة:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // على سبيل المثال، "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

يقوم بتنسيق الوقت النسبي بين لحظتين باستخدام `Intl.RelativeTimeFormat`.

- مرر "now" كوسيط أول والهدف كوسيط ثاني للحصول على تعبير طبيعي.
- **from**: `Date | string | number`
- **to**: `Date | string | number` (افتراضيًا `new Date()`)
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - الوحدة الافتراضية `unit` هي `"second"`.

أمثلة:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "بعد 3 أيام"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "منذ ساعتين"
```

### `units(value, options?)`

يقوم بتنسيق قيمة رقمية كسلسلة وحدة محلية باستخدام `Intl.NumberFormat` مع `style: 'unit'`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - الحقول الشائعة: `unit` (مثل `"kilometer"`, `"byte"`)، `unitDisplay` (`"short" | "narrow" | "long"`)
  - القيم الافتراضية: `unit: 'day'`، `unitDisplay: 'short'`، `useGrouping: false`

أمثلة:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (يعتمد على اللغة)
```

### `compact(value, options?)`

يقوم بتنسيق رقم باستخدام التدوين المضغوط (مثل `1.2K`، `1M`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (يستخدم `notation: 'compact'` ضمنيًا)

أمثلة:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

## ملاحظات

- جميع الأدوات المساعدة تقبل مدخلات من نوع `string`؛ حيث يتم تحويلها داخليًا إلى أرقام أو تواريخ.
- اللغة الافتراضية هي `internationalization.defaultLocale` التي قمت بتكوينها إذا لم يتم توفير لغة.
- هذه الأدوات هي أغلفة رقيقة؛ للتنسيق المتقدم، استخدم خيارات `Intl` القياسية.

## نقاط الدخول وإعادة التصدير (`@index.ts`)

توجد أدوات التنسيق في الحزمة الأساسية ويتم إعادة تصديرها من الحزم الأعلى للحفاظ على سهولة الاستيراد عبر بيئات التشغيل المختلفة:

أمثلة:

```ts
// كود التطبيق (موصى به)
import { number, currency, date, Intl } from "intlayer";
```

### React

مكونات العميل:

```ts
import { useNumber, useCurrency, useDate } from "react-intlayer/format";
// أو في تطبيقات Next.js
import { useNumber, useCurrency, useDate } from "next-intlayer/client/format";
```

مكونات الخادم (أو بيئة تشغيل React Server):

```ts
import { useNumber, useCurrency, useDate } from "intlayer/server/format";
// أو في تطبيقات Next.js
import { useNumber, useCurrency, useDate } from "next-intlayer/server/format";
```

> هذه الخطافات ستأخذ اللغة من `IntlayerProvider` أو `IntlayerServerProvider`

## تاريخ الوثيقة

| الإصدار | التاريخ    | التغييرات                 |
| ------- | ---------- | ------------------------- |
| 5.8.0   | 2025-08-18 | إضافة توثيق أدوات التنسيق |
