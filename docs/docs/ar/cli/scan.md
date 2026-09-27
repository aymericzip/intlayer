---
createdAt: 2026-06-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer scan: تدقيق i18n وتحسين محركات البحث لموقع"
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
  - version: 9.5.11
    date: 2026-09-26
    changes: "اكتشاف استراتيجية التوجيه ومجموعة تقنيات i18n (المكتبات، TMS)؛ إضافة فحوصات التبادلية لـ hreflang و og:locale ومبدل اللغة؛ وتتبع خرائط المواقع في robots.txt وفهارس خرائط المواقع وخرائط المواقع المضغوطة بـ gzip"
  - version: 9.5.2
    date: 2026-09-12
    changes: "إضافة العلامة `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "إضافة أمر scan"
author: aymericzip
---

# مسح موقع الويب

يقوم الأمر `scan` بجلب عنوان URL عام، وقياس الحجم الإجمالي للصفحة، وتدقيق صحة i18n و SEO للصفحة. ينتج عنه تقرير بنقاط (0-100) يغطي سمات HTML، والروابط الأساسية، وعلامات hreflang وروابط العودة المقابلة لها، و robots.txt، وخرائط المواقع، والروابط الداخلية المترجمة، ووزن اللغة لحزمة JavaScript.

كما يوضح كيفية ترميز الموقع للغة في عناوين URL الخاصة به (استراتيجية التوجيه) وأي إطار عمل، أو مكتبة i18n، أو نظام إدارة الترجمة (TMS) أو وكيل ترجمة يستخدمه. تعمل نفس الفحوصات في [أداة فحص i18n SEO عبر الإنترنت](https://intlayer.org/i18n-seo-scanner) وملحق Intlayer لمتصفح Chrome.

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
🔍 Scanned https://example.com/fr (basic mode)

Score: 91/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: fr, en, es, de
Routing: locale prefix except for the default locale (every hreflang alternate but "en" starts with a locale segment, default locale: en)

Stack:
  Framework Next.js 15.1.0 (window.next.version)
  i18n library next-intl (JavaScript bundle contains "X-NEXT-INTL-LOCALE")
  TMS Crowdin (loads https://distributions.crowdin.net/…)

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ locale signals consistent (lang, URL, hreflang)
  ⚠ og:locale meta tag
      Missing <meta property="og:locale">: social previews default to en_US
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ hreflang alternates link back
  ✓ unused bundle locale content
  ✓ localized internal links
  ⚠ all internal links keep the locale
      2 internal links leave the "fr" locale (0 to another locale, 2 without locale)
        <a href="/pricing">Tarifs</a>
  ✓ crawlable language switcher
  ✓ robots.txt present
  ✓ robots.txt keeps localized URLs crawlable
  ✓ sitemap present
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

- **`--base-dir`**: الدليل الأساسي المستخدم لتحديد موقع ملف `intlayer.config.*`.
- **`-e, --env`**: البيئة المستهدفة (على سبيل المثال `development` ، `production`).
- **`--env-file`**: المسار إلى ملف `.env` مخصص.
- **`--no-cache`**: تعطيل ذاكرة التخزين المؤقت للتكوين.
- **`--ci`**: ينفّذ الأمر في كل مشروع Intlayer في الـ monorepo (أو في المشروع الحالي فقط عند التشغيل من مجلد مشروع). يمكن حقن بيانات اعتماد لكل مشروع عبر `INTLAYER_PROJECT_CREDENTIALS`، وهو كائن JSON يربط مسار كل مشروع بـ `{ "clientId", "clientSecret" }`.
- **`--verbose`**: تمكين التسجيل التفصيلي (افتراضي في وضع CLI).
- **`--prefix`**: بادئة تسجيل مخصصة.

## استراتيجية التوجيه

يكشف نمط اللغة المشترك بين بدائل hreflang للصفحة عن كيفية توجيه الموقع للغاته. في حالة عدم وجود بدائل، يتم استخدام عنوان URL الممسوح بمفرده (مستوى ثقة منخفض).

| الاستراتيجية        | مثال                                     |
| ------------------- | ---------------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`                 |
| `prefix-no-default` | `/about` (اللغة الافتراضية), `/fr/about` |
| `search-params`     | `/about?lang=fr`                         |
| `subdomain`         | `fr.example.com`                         |
| `domain`            | `example.fr`, `example.de`               |
| `no-prefix`         | عنوان URL واحد لكل لغة (cookie)          |

تقرأ فحوصات الروابط والروابط الأساسية و robots.txt وخريطة الموقع كل عنوان URL عبر هذه الاستراتيجية. على سبيل المثال، يكون الرابط بدون بادئة صحيحًا في اللغة الافتراضية لموقع يعتمد `prefix-no-default`، بينما يؤدي الرابط بدون `?lang=` إلى الخروج من اللغة في موقع يعتمد `search-params`.

## التقنيات المكتشفة

يتم تحديد أطر العمل، ومكتبات i18n (مثل Intlayer و i18next و react-i18next و next-i18next و next-intl و use-intl و react-intl و vue-i18n و @nuxtjs/i18n و Lingui و svelte-i18n و Paraglide و ngx-translate و Transloco و Polylang و WPML…)، وأنظمة إدارة الترجمة (مثل Crowdin و Phrase و Lokalise و locize و Transifex و Tolgee و Localazy و SimpleLocalize و Localizely و Smartling و Intlayer CMS) ووكلاء الترجمة (مثل Weglot و Localize و GTranslate…) من خلال كود HTML والموارد المحملة وحزم JavaScript. كما يقرأ الوضع العميق المتغيرات العامة لـ window وملفات تعريف الارتباط.

## ما يتم فحصه

| الفحص                           | الوصف                                                                                                 | وزن النتيجة |
| ------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------- |
| `html lang`                     | سمة `<html lang>` موجودة وتمثل علامة BCP 47 صالحة                                                     | 9           |
| `html dir`                      | تم تعيين `dir="rtl"` للغات التي تكتب من اليمين إلى اليسار (`ltr` هو الافتراضي)                        | 3           |
| `locale signals consistent`     | تتطابق إشارات `<html lang>` ولغة عنوان URL ومدخل hreflang المرجعي الذاتي                              | 5           |
| `og:locale`                     | تم تعيين `og:locale` ويتطابق مع `<html lang>`                                                         | 3           |
| `canonical`                     | يوجد رابط أساسي ولا يشير إلى إصدار لغة أخرى                                                           | 10          |
| `hreflang`                      | علامات hreflang موجودة، برموز صالحة، وعناوين URL مطلقة، وبدون تكرار ومع إشارة ذاتية                   | 9           |
| `x-default hreflang`            | بديل hreflang `x-default` موجود                                                                       | 7           |
| `hreflang alternates link back` | تستجيب البدائل برمز 200، ولا تتم إعادة توجيهها، وترتبط مرة أخرى وتعلن عن اللغة                        | 8           |
| `localized links`               | تشير الروابط الداخلية إلى لغة الصفحة                                                                  | 8           |
| `all links keep the locale`     | لا يقوم أي رابط داخلي بتغيير اللغة أو إسقاطها                                                         | 6           |
| `language switcher`             | توجد روابط `<a href>` قابلة للزحف تشير إلى إصدارات اللغات الأخرى                                      | 6           |
| `robots.txt present`            | يعيد `/robots.txt` استجابة 200                                                                        | 10          |
| `robots.txt localized URLs`     | لا يتم حظر الموقع ولا عناوين URL المترجمة الخاصة به لـ Googlebot                                      | 8           |
| `sitemap present`               | تم العثور على خريطة موقع (توجيهات `Sitemap:` في robots.txt، و `/sitemap.xml`، و `/sitemap_index.xml`) | 10          |
| `sitemap locale coverage`       | يتم سرد كل لغة، وتسرد المدخلات التي تحتوي على بدائل نفسها                                             | 9           |
| `sitemap alternates`            | تحتوي خريطة الموقع على روابط بديلة `hreflang`                                                         | 8           |
| `sitemap x-default`             | تحتوي خريطة الموقع على `x-default` hreflang                                                           | 7           |
| `unused bundle content`         | لا تتضمن حزمة JS الرئيسية ترجمات للغات أخرى                                                           | 8           |

يمنح التحذير نصف الوزن. النتيجة النهائية هي المجموع الموزون للفحوصات التي تم تشغيلها، معبرًا عنها كنسبة مئوية (0-100). تطبع الفحوصات الفاشلة المشاكل الأولى التي تم العثور عليها؛ استخدم `--json` للحصول على التفاصيل الكاملة.

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
