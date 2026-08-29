---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "Hreflang، دليل تحسين محركات البحث متعددة اللغات"
description: "ما هو hreflang، القواعد التي تفرضها محركات البحث، لماذا x-default خاطئ في معظم الأحيان، وكيفية إنشاء علامات صحيحة في Next.js و TanStack Start."
keywords:
  - hreflang
  - SEO
  - Internationalization
  - Intlayer
  - i18n
  - Sitemap
  - Canonical
  - Next.js
  - TanStack Start
slugs:
  - blog
  - hreflang-guide-multilingual-seo
author: aymericzip
---

# Hreflang: دليل تحسين محركات البحث متعددة اللغات

لقد قمت بترجمة تطبيقك. قمت بنشر `/en`، `/fr`، `/es`. ومع ذلك، المستخدمون الفرنسيون لا يزالون يصلون إلى الصفحة الإنجليزية.

الترجمة هي النصف السهل. النصف الصعب هو إخبار محركات البحث أن هذه الصفحات هي **نفس الصفحة بلغة أخرى**، وليست ثلاث وثائق تتنافس مع بعضها البعض. هذا ما يفعله `hreflang`، وهنا حيث تفقد معظم المواقع متعددة اللغات حركة المستخدمين بصمت.

---

## ما هو hreflang فعليًا

تعليق توضيحي على صفحة يقول: _هذا عنوان URL له نسخ معادلة هناك، لتلك اللغات._

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="es" href="https://example.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

إنه يوفر لك شيئين: عرض الإصدار الصحيح للمستخدم المناسب، وتوحيد لغاتك في مجموعة واحدة بدلاً من أن تتنافس مع بعضها البعض كنسخ مكررة.

من المهم أن تكون واضحًا بشأن ما هو ليس عليه. إنه **ليس إعادة توجيه** — إنها مجرد تلميح، وقد تتجاوزها Google. إنه **ليس تعزيزًا للترتيب** — إنه يغير _أي_ إصدار يحتل مرتبة، وليس _ما إذا كان_ لديك ترتيب. و Bing يتجاهله تمامًا، معتمدًا على `content-language` والاستهداف الجغرافي بدلاً من ذلك.

---

## حيث يتم التصريح به

ثلاثة مواضع، جميعها صحيحة. اختر واحدًا والبث فيه — نفس المجموعة المعلنة في مكانين هو كيف تنجرف المجموعات.

**HTML `<head>`** هو الخيار المعتاد. تحذير واحد: الوسوم المُدرجة بعد الترطيب غير موثوقة. إذا كان إطار عملك يضيفها فقط على جانب العميل، فقد لا يراها الزاحف أبدًا.

**XML sitemap** أفضل في التعامل مع النطاق الواسع. عشرة locales عبر 5000 صفحة تعني 50000 عنصر `<link>` يُرسل إلى المتصفحات دون فائدة؛ في sitemap لا يكلف صفحاتك أي بايتات.

**HTTP `Link` header** هو الخيار الوحيد للملفات غير HTML مثل PDFs.

---

## القواعد

### المرجع الذاتي والمعاملة بالمثل

يجب أن تتضمن المجموعة على `/fr/about` `hreflang="fr"` يشير إلى `/fr/about`. وإذا كان `/about` يشير إلى `/fr/about`، يجب أن يشير `/fr/about` مرة أخرى. تسمي Google مرجع ذو اتجاه واحد "no return tag" وتحذفه.

في الممارسة العملية، هذا يعني **كل صفحة في cluster ترسل مجموعة الروابط المتطابقة**. توليد هذه المجموعات من قائمة locale مشتركة ليس للراحة فقط، بل هو الطريقة الوحيدة للبقاء صحيحاً بمجرد أن يكون لديك أكثر من locale واحد.

### عناوين URL المطلقة، دائماً

```html
<!-- تم تجاهله صامتًا -->
<link rel="alternate" hreflang="fr" href="/fr/about" />

<!-- صحيح -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
```

السبب يستحق الفهم بدلاً من مجرد الحفظ. `hreflang` هو مرجع عابر للمستندات: محركات البحث تبني مجموعة مفهرسة حسب URL، مشتركة عبر كل صفحة فيها. المسار النسبي له معنى فقط بالنسبة للمستند الذي يقع فيه، لذلك لا يمكنه التعبير عن ذلك. كما أنه لا يمكنه عبور مضيف - والبديل غالباً ما يفعل ذلك، عندما يكون اللغة على `example.fr` أو `fr.example.com`. في خريطة الموقع أو رأس HTTP، لا توجد وثيقة أساسية للرجوع إليها على الإطلاق.

هذا له عاقبة مباشرة في الكود. `getLocalizedUrl("/about", "fr")` يرجع `/fr/about` — نسبي يدخل، نسبي يخرج. بالنسبة لـ `hreflang` يجب أن تزوده بـ URL مطلق:

```ts
getLocalizedUrl("/about", "fr"); // → "/fr/about"          ❌ تم حذفه
getLocalizedUrl("https://example.com/about", "fr"); // → "https://example.com/fr/about"  ✅
```

الاستثناء الوحيد هو framework يحل القيم النسبية لك قبل التصيير: Next.js يوسع `alternates` النسبية ضد `metadataBase`. حسناً — لكن القاعدة تنطبق على **HTML المُصدَّر**، لذا تحقق باستخدام `curl`، وليس مفتش DevTools.

### رموز اللغة

ISO 639-1 للغة، ISO 3166-1 Alpha 2 للمنطقة الاختيارية: `fr`، `fr-CA`، `pt-BR`.

هناك فخان يقعان فيهما الجميع تقريباً. منطقة وحدها غير صحيحة — `hreflang="ca"` هي الكاتالونية، وليست كندا؛ تحتاج إلى `en-CA` أو `fr-CA`. و `en-UK` غير موجود: رمز الدولة للمملكة المتحدة هو `GB`، لذلك يكون `en-GB`.

أضف منطقة فقط عندما تقدم فعلاً محتوى مختلفاً لتلك المنطقة — أسعار مختلفة، إشعارات قانونية مختلفة. `fr` و `fr-FR` على محتوى متطابق هو ضوضاء.

### x-default

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

أحد المفاهيم التي يتم نسيانها بشكل متكرر جداً، وسوء فهمها، هو `x-default` — أقل من 30% من التطبيقات تطبقه بشكل صحيح.

إنه بمثابة fallback للمستخدمين الذين لا تطابق لغتهم أي شيء في مجموعتك. مستخدم ناطق بالهولندية على موقع يقدم اللغات الإنجليزية والفرنسية والإسبانية لا يطابق أي entry؛ بدون `x-default`، يختار Google لك.

ما يخطئ فيه الناس هو معناه. `x-default` **ليس "النسخة الإنجليزية"** و**ليس "locale الافتراضي"**، حتى لو كان يشير إلى هناك عادةً. إنه يعني _الصفحة للمستخدمين الذين لا تغطيهم هذه المجموعة_. هذا هو السبب في أنه من الشرعي — وغالباً أفضل — أن تشير إليه في صفحة محدد لغة أو صفحة هبوط إعادة توجيه جغرافية بدلاً من `/en`. إذا لم تكن لديك مثل هذه الصفحة، فإن اللغة الأساسية لديك هي الإجابة المعقولة.

شيئان يجب الفصل بينهما: `x-default` هو إدخال إضافي واحد في المجموعة، وليس استبدالاً للإدخال الذي يشير إلى نفسه، وكما هو الحال مع كل إدخال آخر، يجب أن يظهر بشكل متطابق على كل صفحة في المجموعة.

---

## فخ canonical

يجب أن تكون كل صفحة محلية **canonical خاصة بها**:

```html
<!-- على https://example.com/fr/about -->
<link rel="canonical" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="en" href="https://example.com/about" />
```

الإشارة إلى canonical كل لغة إلى الإصدار الإنجليزي بدلاً من ذلك:

```html
<!-- على https://example.com/fr/about — تقتل الصفحة -->
<link rel="canonical" href="https://example.com/about" />
```

يقول أن صفحة اللغة الفرنسية نسخة مكررة يجب عدم فهرستها، بينما `hreflang` يقول أنها الصفحة المراد تقديمها لمستخدمي اللغة الفرنسية. الإشارات متناقضة، والـ canonical يفوز، وتسقط صفحاتك الفرنسية من الفهرس.

**القانوني ذاتي المرجعية لكل لغة. `hreflang` يصف المجموعة.**

---

## اختيار هيكل العنوان

`hreflang` يشرح العناوين، لذا يأتي الهيكل أولاً.

| الهيكل               | مثال              | المقايضة                                      |
| -------------------- | ----------------- | --------------------------------------------- |
| **المجلدات الفرعية** | `example.com/fr/` | مجال واحد، سلطة مشتركة — إشارة جغرافية أضعف   |
| **النطاقات الفرعية** | `fr.example.com`  | سهل إضافة أو إسقاط لغة — قد يُقرأ كموقع منفصل |
| **ccTLDs**           | `example.fr`      | أقوى إشارة بلد — السلطة المبنية لكل نطاق      |

الأدلة الفرعية هي الخيار الافتراضي الصحيح لمعظم المشاريع. استخدم ccTLDs فقط عندما تعمل فعلاً كشركات بلد منفصلة.

البنية الوحيدة التي يجب تجنبها: خدمة لغات مختلفة على **نفس URL** بناءً على `Accept-Language` أو IP. يرى الزاحفون نسخة واحدة وينهي فهرسة نسخة واحدة؛ كل شيء آخر غير مرئي.

> يغطي Intlayer جميع الثلاثة من خلال `routing.mode` و `routing.domains`. انظر [النطاقات المخصصة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/custom_domains.md) و[مرجع التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

---

## التنفيذ

كتابة هذه الوسوم يدويًا لا تستمر عند التعامل مع لغة ثانية. استخرجها من قائمة اللغات الخاصة بك بدلاً من ذلك.

<Steps>

<Step number={1} title="بث الكتلة على كل صفحة">

نفس المجموعة في كل مكان، canonical لكل لغة، URLs مطلقة، `x-default` مضمنة.

<Tabs>

<Tab label="Next.js" value="nextjs">

يكشف Metadata API عن `alternates.languages`، و `getMultilingualUrls` ينشئ السجل بالكامل من اللغات المكونة لديك:

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

const SITE_URL = "https://example.com";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  /**
   * getMultilingualUrls(`${SITE_URL}/about`) يعيد:
   * {
   *   en: 'https://example.com/about',
   *   fr: 'https://example.com/fr/about',
   *   es: 'https://example.com/es/about',
   * }
   */
  const multilingualUrls = getMultilingualUrls(`${SITE_URL}/about`);

  return {
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": `${SITE_URL}/about` },
    },
  };
};
```

الإعداد الكامل: [دليل i18n لـ Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md).

</Tab>

<Tab label="TanStack Start" value="tanstack">

تبني دالة `head` في المسار الروابط. يكرر `localeMap` اللغات المكونة لديك، لذا فإن إضافة لغة إلى الإعدادات تضيفها في كل مكان مرة واحدة:

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getLocalizedUrl, localeMap } from "intlayer";

const SITE_URL = "https://example.com";

export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => {
    // استخراج اللغة من المعاملات، مع استخدام اللغة الافتراضية كقيمة احتياطية
    const { locale = defaultLocale } = params;
    const url = `${SITE_URL}/about`;

    return {
      links: [
        // تعيين الرابط الكنسي للغة الحالية
        { rel: "canonical", href: getLocalizedUrl(url, locale) },

        // إنشاء روابط بديلة لجميع اللغات المكونة
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(url, mapLocale),
        })),

        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(url, defaultLocale),
        },
      ],
    };
  },
});
```

يتم تشغيل `head` على الخادم، لذا تصل العلامات إلى HTML الأولي. الإعداد الكامل: [دليل TanStack Start i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_tanstack.md).

</Tab>

</Tabs>

</Step>

<Step number={2} title="أو انقله كله إلى خريطة الموقع">

على نطاق واسع، احذف التعليقات من صفحاتك تماماً. يُصدر `generateSitemap` بدائل `xhtml:link` لكل إدخال، بقراءة اللغات وطريقة التوجيه من config الخاص بك:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { generateSitemap } from "intlayer";

const sitemap = generateSitemap(
  [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/about", changefreq: "monthly", priority: 0.8 },
  ],
  { siteUrl: "https://example.com" }
);
```

خياران يستحق معرفتهما:

- `xhtmlLinks` (الافتراضي `true`) — يتم إصدار البدائل فقط حيث تختلف عناوين URL للإعدادات المحلية فعلياً. في وضع `no-prefix` تشترك كل إعدادات محلية في عنوان URL واحد، لذلك يتم تخطيها ما لم يعطِ `routing.domains` الإعدادات المحلية أسماء مضيفات خاصة بها.
- `entryPerLocale` (default `false`) — بشكل افتراضي، يحمل إدخال `<url>` واحد جميع البدائل. كلا النموذجين صحيح، لكن فقط عنوان URL المدرج كـ `<loc>` يُعتبر _مُرسلاً_ في Search Console؛ تبقى المناطق البديلة فقط قابلة للاكتشاف لكنها لا تُنسب إلى خريطة الموقع. تفعيل هذا يعطي كل عنوان URL محلّي إدخاله الخاص به مع تكرار مجموعة البدائل الكاملة. يضاعف الإدخالات حسب عدد المناطق، لذا راقب حد 50000 عنوان URL / 50 ميجابايت وقسّم إلى فهرس خريطة الموقع بعده.

</Step>

<Step number={3} title="تحقق مما يتلقاه الزاحف">

`hreflang` يفشل بصمت، لذا تحقق منه بدلاً من افتراضه.

اقرأ المصدر، وليس المفتش — `curl https://example.com/fr/about | grep hreflang` يُظهر ما يحصل عليه الزاحف؛ DevTools يعرض DOM بعد تشغيل JavaScript. ثم اتبع كل بديل وأكّد أنه يشير للخلف بنفس المجموعة، وأنه لا أحد منهم ينقل. تقرير International Targeting في Search Console يعالج الباقي عبر الموقع بالكامل.

للزحف متعدد اللغات، [Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner) يتحقق من الوسوم المفقودة والبدائل المعطلة والنزاعات القانونية عبر صفحاتك المحلية.

</Step>

</Steps>

---

## قائمة التحقق

- [ ] كل لغة لها عنوان URL مختلف وقابل للزحف
- [ ] كل صفحة تُرجع إلى نفسها، وكل مرجع متبادل
- [ ] نفس المجموعة تُشحن على كل صفحة في العنقود
- [ ] جميع قيم `href` مطلقة في HTML المُرسل
- [ ] الأكواد هي ISO 639-1 + ISO 3166-1 Alpha 2 (`en-GB`، وليس `en-UK`)
- [ ] `x-default` موجود، ويشير إلى حيث يجب أن يذهب المستخدمون غير المتطابقين
- [ ] الـ Canonical ذاتي المرجع لكل لغة
- [ ] يتم عرض Tags من جانب الخادم، وليس حقنها بعد الـ hydration
- [ ] معلن في مكان واحد بالضبط
- [ ] لا توجد عمليات إعادة توجيه بديلة

---

## الخلاصة

`hreflang` بسيط وغير متسامح. علامة إرجاع واحدة مفقودة، أو عنوان URL نسبي واحد، أو canonical عابر للغات، والمجموعة بأكملها سيتم التخلص منها دون أي رسالة خطأ في أي مكان. كل واحد من هذه يأتي من كتابة العلامات يدويًا.

اشتق المجموعة من قائمة إقليم واحد، وقدمها من جانب الخادم، واحتفظ بالعلامة الكنسية ذاتية المرجعية، وأعط `x-default` الاهتمام الذي تستحقه. افعل ذلك مرة واحدة وتوقف عن الحاجة إلى الحفاظ على الصحة.

### الذهاب أبعد

- [SEO والتدويل](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/internationalization_and_SEO.md) — الصورة الأوسع لتحسين محركات البحث متعددة اللغات
- [SEO و i18n في Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/nextjs-multilingual-seo-comparison.md) — `next-intl` مقابل `next-i18next` مقابل Intlayer
- [دليل Next.js 16 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md)
- [دليل TanStack Start i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_tanstack.md)
- [النطاقات المخصصة لكل لغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/custom_domains.md)
- [مرجع التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)
