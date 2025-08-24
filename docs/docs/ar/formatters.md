---
createdAt: 2024-08-13
updatedAt: 2025-08-20
title: أدوات التنسيق
description: أدوات تنسيق مدركة للغة بناءً على Intl للأرقام، النسب المئوية، العملات، التواريخ، الوقت النسبي، الوحدات، والترميز المضغوط. تشمل مساعد Intl مخزن مؤقت.
keywords:
  - أدوات التنسيق
  - Intl
  - الرقم
  - العملة
  - النسبة المئوية
  - التاريخ
  - الوقت النسبي
  - الوحدات
  - مضغوط
  - القائمة
  - التدويل
slugs:
  - doc
  - formatters
---

# أدوات تنسيق Intlayer

## نظرة عامة

يوفر Intlayer مجموعة من المساعدين الخفيفين المبنيين على واجهات برمجة التطبيقات الأصلية `Intl`، بالإضافة إلى غلاف `Intl` مخزن مؤقت لتجنب إنشاء أدوات تنسيق ثقيلة بشكل متكرر. هذه الأدوات مدركة تمامًا للغة ويمكن استخدامها من الحزمة الرئيسية `intlayer`.

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
  list,
  getLocaleName,
  getLocaleLang,
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedUrl,
  getHTMLTextDir,
  getContent,
  getLocalisedContent,
  getTranslation,
  getIntlayer,
  getIntlayerAsync,
} from "intlayer";
```

إذا كنت تستخدم React، فإن الخطافات متاحة أيضًا؛ راجع `react-intlayer/format`.

## Intl المخزن مؤقتًا

الـ `Intl` المصدر هو غلاف رقيق مخزن مؤقت حول الـ `Intl` العالمي. يقوم بتخزين نسخ من `NumberFormat`، `DateTimeFormat`، `RelativeTimeFormat`، `ListFormat`، `DisplayNames`، `Collator`، و `PluralRules`، مما يتجنب إعادة بناء نفس أداة التنسيق مرارًا وتكرارًا.

نظرًا لأن إنشاء أداة التنسيق مكلف نسبيًا، فإن هذا التخزين المؤقت يحسن الأداء دون تغيير السلوك. الغلاف يعرض نفس واجهة برمجة التطبيقات `Intl` الأصلية، لذا فإن الاستخدام متطابق.

- التخزين المؤقت يتم لكل عملية وهو شفاف للمستدعين.

> إذا لم يكن `Intl.DisplayNames` متاحًا في البيئة، يتم طباعة تحذير واحد مخصص للمطور فقط (فكر في استخدام polyfill).

أمثلة:

```ts
import { Intl } from "intlayer";

// تنسيق الأرقام
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// أسماء العرض للغات والمناطق، إلخ.
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// الترتيب للفرز
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (متساوي)

// قواعد الجمع
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "واحد"
pluralRules.select(2); // "آخر"
```

## أدوات Intl إضافية

بعيدًا عن مساعدي التنسيق، يمكنك أيضًا استخدام الغلاف المؤقت لـ Intl مباشرةً لميزات Intl الأخرى:

### `Intl.DisplayNames`

لأسماء اللغات والمناطق والعملات والكتابات المحلية:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

### `Intl.Collator`

للمقارنة والفرز النصي المعتمد على اللغة:

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

لتحديد أشكال الجمع في لغات مختلفة:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## أدوات اللغة

### `getLocaleName(displayLocale, targetLocale?)`

يحصل على الاسم المحلي للغة في لغة أخرى:

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

- **displayLocale**: اللغة التي سيتم الحصول على اسمها
- **targetLocale**: اللغة التي سيتم عرض الاسم بها (افتراضيًا تكون نفس displayLocale)

### `getLocaleLang(locale?)`

يستخرج رمز اللغة من سلسلة اللغة:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

- **locale**: اللغة التي سيتم استخراج رمز اللغة منها (افتراضيًا اللغة الحالية)

### `getLocaleFromPath(inputUrl)`

يستخرج جزء اللغة من عنوان URL أو مسار:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (اللغة الافتراضية)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

- **inputUrl**: سلسلة عنوان URL الكاملة أو مسار المعالجة
- **returns**: اللغة المكتشفة أو اللغة الافتراضية إذا لم يتم العثور على لغة

### `getPathWithoutLocale(inputUrl, locales?)`

يزيل جزء اللغة من عنوان URL أو مسار:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
getPathWithoutLocale("https://example.com/en/about"); // "https://example.com/about"
```

- **inputUrl**: سلسلة عنوان URL الكاملة أو مسار المعالجة
- **locales**: مصفوفة اختيارية من اللغات المدعومة (افتراضيًا إلى اللغات المُعدة)
- **returns**: عنوان URL بدون جزء اللغة

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

ينشئ عنوان URL محلي للغة الحالية:

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

- **url**: عنوان URL الأصلي لتوطينه
- **currentLocale**: اللغة الحالية
- **locales**: مصفوفة اختيارية من اللغات المدعومة (افتراضيًا إلى اللغات المُعدة)
- **defaultLocale**: اللغة الافتراضية الاختيارية (افتراضيًا إلى اللغة الافتراضية المُعدة)
- **prefixDefault**: ما إذا كان يجب إضافة بادئة للغة الافتراضية (افتراضيًا إلى القيمة المُعدة)

### `getHTMLTextDir(locale?)`

يعيد اتجاه النص للغة معينة:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

- **locale**: اللغة التي يتم الحصول على اتجاه النص لها (افتراضيًا إلى اللغة الحالية)
- **returns**: `"ltr"`، `"rtl"`، أو `"auto"`

## أدوات معالجة المحتوى

### `getContent(node, nodeProps, locale?)`

يقوم بتحويل عقدة المحتوى باستخدام جميع الإضافات المتاحة (الترجمة، الترقيم، الإدراج، إلخ):

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

- **node**: عقدة المحتوى التي سيتم تحويلها
- **nodeProps**: خصائص سياق التحويل
- **locale**: اللغة الاختيارية (افتراضيًا إلى اللغة الافتراضية المُعدة)

### `getLocalisedContent(node, locale, nodeProps, fallback?)`

يقوم بتحويل عقدة المحتوى باستخدام إضافة الترجمة فقط:

```ts
import { getLocalisedContent } from "intlayer";

const content = getLocalisedContent(
  contentNode,
  "fr",
  { dictionaryKey: "common" },
  true // الرجوع إلى اللغة الافتراضية إذا لم تتوفر الترجمة
);
```

- **node**: عقدة المحتوى التي سيتم تحويلها
- **locale**: اللغة المستخدمة للترجمة
- **nodeProps**: خصائص سياق التحويل
- **fallback**: ما إذا كان يجب الرجوع إلى اللغة الافتراضية (الافتراضي هو false)

### `getTranslation(languageContent, locale?, fallback?)`

يستخرج المحتوى للغة معينة من كائن محتوى متعدد اللغات:

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

- **languageContent**: كائن يربط اللغات بالمحتوى
- **locale**: اللغة المستهدفة (الافتراضي هو اللغة الافتراضية المُعدة)
- **fallback**: ما إذا كان يجب الرجوع إلى اللغة الافتراضية (الافتراضي هو true)

### `getIntlayer(dictionaryKey, locale?, plugins?)`

يسترجع ويحوّل المحتوى من قاموس حسب المفتاح:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

- **dictionaryKey**: مفتاح القاموس الذي سيتم استرجاعه
- **locale**: اللغة الاختيارية (الافتراضي هو اللغة الافتراضية المُعدة)
- **plugins**: مصفوفة اختيارية من الإضافات المخصصة للتحويل

### `getIntlayerAsync(dictionaryKey, locale?, plugins?)`

يسترجع المحتوى بشكل غير متزامن من قاموس بعيد:

```ts
import { getIntlayerAsync } from "intlayer";

const content = await getIntlayerAsync("common", "fr");
```

- **dictionaryKey**: مفتاح القاموس الذي سيتم استرجاعه
- **locale**: اللغة الاختيارية (الافتراضي هو اللغة الافتراضية المُعدة)
- **plugins**: مصفوفة اختيارية من الإضافات المخصصة للتحويل

## أدوات التنسيق

جميع الأدوات التالية مُصدرة من `intlayer`.

### `number(value, options?)`

يقوم بتنسيق قيمة رقمية باستخدام التجميع والفواصل العشرية المعتمدة على اللغة.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

أمثلة:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (في en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
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

يقوم بتنسيق قيمة كعملة محلية. الافتراضي هو `USD` مع رقمين عشريين.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - الحقول الشائعة: `currency` (مثلاً، `"EUR"`)، `currencyDisplay` (`"symbol" | "code" | "name"`)

أمثلة:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
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
  - الحقول الشائعة: `unit` (مثلًا، `"kilometer"`، `"byte"`)، `unitDisplay` (`"short" | "narrow" | "long"`)
  - القيم الافتراضية: `unit: 'day'`، `unitDisplay: 'short'`، `useGrouping: false`

أمثلة:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (يعتمد على اللغة)
```

### `compact(value, options?)`

يقوم بتنسيق رقم باستخدام التدوين المضغوط (مثلًا، `1.2K`، `1M`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (يستخدم `notation: 'compact'` ضمنيًا)

أمثلة:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

### `list(values, options?)`

يقوم بتنسيق مصفوفة من القيم إلى سلسلة قائمة محلية باستخدام `Intl.ListFormat`.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - الحقول الشائعة: `type` (`"conjunction" | "disjunction" | "unit"`)، `style` (`"long" | "short" | "narrow"`)
  - القيم الافتراضية: `type: 'conjunction'`، `style: 'long'`

أمثلة:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

## ملاحظات

- جميع الأدوات المساعدة تقبل مدخلات من نوع `string`؛ حيث يتم تحويلها داخليًا إلى أرقام أو تواريخ.
- اللغة الافتراضية هي `internationalization.defaultLocale` التي قمت بتكوينها إذا لم يتم توفير لغة.
- هذه الأدوات هي أغلفة رقيقة؛ للتنسيق المتقدم، استخدم خيارات `Intl` القياسية.

## نقاط الدخول وإعادة التصدير (`@index.ts`)

تعيش أدوات التنسيق في الحزمة الأساسية ويتم إعادة تصديرها من الحزم الأعلى للحفاظ على سهولة الاستيراد عبر بيئات التشغيل المختلفة:

أمثلة:

```ts
// كود التطبيق (موصى به)
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
  getLocalisedContent,
  getTranslation,
  getIntlayer,
  getIntlayerAsync,
} from "intlayer";
```

### React

مكونات العميل:

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
// أو في تطبيقات Next.js
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

مكونات الخادم (أو وقت تشغيل خادم React):

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
// أو في تطبيقات Next.js
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

> ستأخذ هذه الخطافات في الاعتبار اللغة من `IntlayerProvider` أو `IntlayerServerProvider`

### Vue

مكونات العميل:

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

> ستأخذ هذه التركيبات في الاعتبار اللغة من `IntlayerProvider` المحقون

## تاريخ الوثيقة

| الإصدار | التاريخ    | التغييرات                                                                           |
| ------- | ---------- | ----------------------------------------------------------------------------------- |
| 5.8.0   | 2025-08-20 | إضافة منسقات vue                                                                    |
| 5.8.0   | 2025-08-18 | إضافة توثيق المنسقات                                                                |
| 5.8.0   | 2025-08-20 | إضافة توثيق منسق القوائم                                                            |
| 5.8.0   | 2025-08-20 | إضافة أدوات Intl إضافية (DisplayNames، Collator، PluralRules)                       |
| 5.8.0   | 2025-08-20 | إضافة أدوات التعامل مع اللغة (getLocaleName، getLocaleLang، getLocaleFromPath، إلخ) |
| 5.8.0   | 2025-08-20 | إضافة أدوات التعامل مع المحتوى (getContent، getTranslation، getIntlayer، إلخ)       |
