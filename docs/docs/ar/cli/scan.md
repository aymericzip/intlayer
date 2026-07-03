---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: مسح موقع الويب
description: تعرف على كيفية استخدام أمر scan في Intlayer CLI لقياس حجم الصفحة وتدقيق صحة i18n/SEO لأي موقع ويب.
keywords:
  - مسح
  - SEO
  - i18n
  - تدقيق
  - CLI
  - Intlayer
  - حجم الصفحة
  - حزمة
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 9.0.0
    date: 2026-06-11
    changes: "إضافة أمر scan"
author: aymericzip
---

# مسح موقع الويب

يقوم الأمر `scan` بجلب عنوان URL عام، وقياس الحجم الإجمالي للصفحة، وتدقيق صحة i18n و SEO للصفحة. ينتج عنه تقرير بنقاط (0-100) يغطي سمات HTML، والروابط الأساسية، وعلامات hreflang، و robots.txt، و sitemap.xml، والروابط الداخلية المترجمة، ووزن اللغة لحزمة JavaScript.

لا توجد تبعيات إضافية مطلوبة. عندما يكون [puppeteer](https://pptr.dev/) مثبتًا، يمكن للمسح التقاط أجزاء JavaScript التي يتم تحميلها بشكل كسول (lazy-loaded) لتحليل حزمة أكثر دقة؛ وإلا فإنه يتراجع عن فحص البرامج النصية المحملة بلهفة المعلن عنها في HTML.

## الاستخدام

```bash packageManager="npm"
npx intlayer scan <url>
```

```bash packageManager="yarn"
yarn intlayer scan <url>
```

```bash packageManager="pnpm"
pnpm intlayer scan <url>
```

```bash packageManager="bun"
bun x intlayer scan <url>
```

### مثال

```bash packageManager="npm"
npx intlayer scan https://example.com
```

نموذج المخرجات:

```
🔍 Scanned https://example.com (basic mode)

Score: 90/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: en, fr, es, de, …

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ localized internal links
  ⚠ all internal links localized
  ✓ current locale detected
  ✓ robots.txt present
  ✓ robots.txt keeps locale paths crawlable
  ✓ sitemap.xml present
  ✓ sitemap lists every locale
  ✓ sitemap has alternate links
  ✓ sitemap has x-default

Bundle locale weight:
  Translations shipped: 120.50 KB
  Unused (other locales): 45.20 KB (37%)
```

## الخيارات

### `<url>` (مطلوب)

عنوان URL المؤهل بالكامل للمسح (على سبيل المثال `https://example.com`).

### `--no-deep`

تعطيل المسح العميق القائم على العرض.

بشكل افتراضي ، يحاول الأمر استخدام [puppeteer](https://pptr.dev/) لعرض الصفحة في متصفح بدون رأس ، والتقاط أجزاء JavaScript التي يتم تحميلها بشكل كسول ، وقياس حجم نقل السلك الحقيقي. إذا لم يكن puppeteer مثبتًا ، يتراجع الأمر تلقائيًا إلى الوضع الأساسي.

قم بتمرير `--no-deep` لفرض الوضع الأساسي حتى عند توفر puppeteer.

> مثال: `npx intlayer scan https://example.com --no-deep`

### `--json`

إخراج نتيجة المسح الكاملة ككائن JSON بدلاً من تقرير منسق. مفيد للاستهلاك البرمجي أو خطوط أنابيب CI.

> مثال: `npx intlayer scan https://example.com --json`

### خيارات التكوين القياسية

- **`--base-dir`** — الدليل الأساسي المستخدم لتحديد موقع ملف `intlayer.config.*`.
- **`-e, --env`** — البيئة المستهدفة (على سبيل المثال `development` ، `production`).
- **`--env-file`** — المسار إلى ملف `.env` مخصص.
- **`--no-cache`** — تعطيل ذاكرة التخزين المؤقت للتكوين.
- **`--verbose`** — تمكين التسجيل التفصيلي (افتراضي في وضع CLI).
- **`--prefix`** — بادئة تسجيل مخصصة.

## ما يتم فحصه

| الفحص                     | الوصف                                               | وزن النتيجة |
| ------------------------- | --------------------------------------------------- | ----------- |
| `html lang`               | سمة `<html lang="…">` موجودة                        | 9           |
| `html dir`                | سمة `<html dir="…">` موجودة                         | 3           |
| `canonical`               | `<link rel="canonical">` موجود                      | 10          |
| `hreflang`                | علامات `<link rel="alternate" hreflang="…">` موجودة | 9           |
| `x-default hreflang`      | بديل hreflang `x-default` موجود                     | 7           |
| `localized links`         | يتضمن رابط داخلي واحد على الأقل شريحة لغة           | 5           |
| `all links localized`     | يتضمن كل رابط داخلي شريحة لغة                       | 5           |
| `current locale`          | يمكن اكتشاف لغة الصفحة                              | 3           |
| `robots.txt present`      | يعيد `/robots.txt` استجابة 200                      | 10          |
| `robots.txt locale paths` | لا يتم حظر أي مسار لغة في robots.txt                | 10          |
| `sitemap.xml present`     | يعيد `/sitemap.xml` استجابة 200                     | 10          |
| `sitemap locale coverage` | تظهر كل لغة مكتشفة في خريطة الموقع                  | 10          |
| `sitemap alternates`      | تحتوي خريطة الموقع على روابط بديلة `hreflang`       | 5           |
| `sitemap x-default`       | تحتوي خريطة الموقع على `x-default` hreflang         | 5           |
| `unused bundle content`   | لا تشحن حزمة JS بيانات لغة غير مستخدمة مفرطة        | 9           |

النتيجة النهائية هي المجموع الموزون لجميع الفحوصات الناجحة معبرًا عنها بنسبة مئوية (0-100).

## استخدام وظيفة المسح برمجياً

يتم تصدير وظيفة `scan` أيضًا من `@intlayer/cli` بحيث يمكن استدعاؤها من البرامج النصية الخاصة بك:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

للوصول إلى مستوى أدنى ، يعيد `scanWebsite` من `@intlayer/engine/scan` كائن `ScanResult` مهيكل:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
