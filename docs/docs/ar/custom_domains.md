---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: نطاقات مخصصة (Custom Domains)
description: تعرف على كيفية تكوين توجيه اللغات القائم على النطاق في Intlayer لخدمة لغات مختلفة من أسماء مضيفين مخصصة.
keywords:
  - نطاقات مخصصة
  - توجيه النطاق
  - التوجيه
  - التدويل
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "إضافة توجيه اللغات القائم على النطاق عبر تكوين routing.domains."
---

# نطاقات مخصصة

يدعم Intlayer توجيه اللغات القائم على النطاق، مما يسمح لك بتقديم لغات محددة من أسماء مضيفين مخصصة. على سبيل المثال، يمكن توجيه الزوار الصينيين إلى `intlayer.zh` بدلاً من `intlayer.org/zh`.

## كيف يعمل

تربط خريطة `domains` في `routing` كل لغة باسم مضيف. يستخدم Intlayer هذه الخريطة في مكانين:

1. **توليد الرابط** (`getLocalizedUrl`): عندما تكون اللغة المستهدفة موجودة على نطاق _مختلف_ عن الصفحة الحالية، يتم إرجاع رابط مطلق (مثل `https://intlayer.zh/about`). عندما يتطابق كلا النطاقين، يتم إرجاع رابط نسبي (مثل `/fr/about`).
2. **بروكسي الخادم** (Next.js و Vite): تتم إعادة توجيه الطلبات الواردة أو إعادة كتابتها بناءً على النطاق الذي تصل إليه.

### النطاقات الحصرية مقابل المشتركة

الفرق الرئيسي هو **الحصرية**:

- **نطاق حصري** — لغة واحدة فقط ترتبط باسم المضيف هذا (مثل `zh → intlayer.zh`). النطاق نفسه يحدد اللغة، لذا لا يتم إضافة بادئة لغة إلى المسار. يخدم `https://intlayer.zh/about` المحتوى الصيني.
- **نطاق مشترك** — ترتبط لغات متعددة بنفس اسم المضيف (مثل `en` و `fr` كلاهما يرتبطان بـ `intlayer.org`). يتم تطبيق التوجيه التقليدي القائم على البادئة. يخدم `intlayer.org/fr/about` المحتوى الفرنسي.

## التكوين

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
    domains: {
      // نطاق مشترك — en و fr يستخدمان توجيه البادئة على intlayer.org
      en: "intlayer.org",
      // نطاق حصري — zh لها اسم مضيف خاص بها، لا حاجة لبادئة /zh/
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

تستمر اللغات غير المدرجة في `domains` في استخدام توجيه البادئة القياسي دون أي تجاوز للنطاق.

## توليد الرابط (URL Generation)

يقوم `getLocalizedUrl` تلقائيًا بإنتاج نوع الرابط الصحيح بناءً على سياق الاستدعاء.

### لغة في نفس النطاق (رابط نسبي)

```ts
// الصفحة الحالية: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// ← "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// ← "/about"  (اللغة الافتراضية، لا توجد بادئة)
```

### لغة في نطاق مختلف (رابط مطلق)

```ts
// الصفحة الحالية: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// ← "https://intlayer.zh/about"  (نطاق حصري، لا توجد بادئة /zh/)
```

### الخدمة من النطاق الخاص باللغة

```ts
// الصفحة الحالية: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// ← "/about"  (بالفعل على النطاق الصحيح — رابط نسبي)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// ← "https://intlayer.org/fr/about"  (رابط عبر النطاقات يعود إلى intlayer.org)
```

### الكشف التلقائي عن النطاق الحالي

خيار `currentDomain` اختياري. عند حذفه، يقوم `getLocalizedUrl` بحله بهذا الترتيب:

1. اسم المضيف لرابط إدخال مطلق (مثلاً `https://intlayer.org/about` ← `intlayer.org`).
2. `window.location.hostname` في بيئات المتصفح.
3. إذا لم يتوفر أي منهما (SSR بدون خيار صريح)، يتم إرجاع رابط نسبي للغات الموجودة على نفس النطاق ولا يتم إنتاج رابط مطلق — وهذا هو التراجع الآمن.

```ts
// المتصفح — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// ← "https://intlayer.zh/about"  (تم اكتشافه تلقائيًا من النافذة)

// من رابط مطلق — تم اكتشاف النطاق تلقائيًا
getLocalizedUrl("https://intlayer.org/about", "zh");
// ← "https://intlayer.zh/about"
```

### `getMultilingualUrls` مع النطاقات

يستدعي `getMultilingualUrls` الدالة `getLocalizedUrl` لكل لغة، لذا فهو ينتج مزيجًا من الروابط النسبية والمطلقة اعتمادًا على نطاق المستدعي:

```ts
// currentDomain: 'intlayer.org'
getMultilingualUrls("/about", { currentDomain: "intlayer.org" });
// {
//   en: "/about",
//   fr: "/fr/about",
//   es: "/es/about",
//   zh: "https://intlayer.zh/about",
// }
```

هذه الروابط المطلقة جاهزة للاستخدام في وسوم `<link rel="alternate" hreflang="...">` لـ SEO.

## سلوك البروكسي (Proxy Behaviour)

### Next.js

يتعامل وسيط `intlayerProxy` مع توجيه النطاق تلقائيًا. أضفه إلى ملف `middleware.ts`:

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**إعادة التوجيه (Redirect)** — يصل الطلب إلى النطاق الخطأ لبادئة لغة معينة:

```
GET intlayer.org/zh/about
← 301 https://intlayer.zh/about
```

**إعادة الكتابة (Rewrite)** — يصل الطلب إلى النطاق الحصري للغة بدون بادئة:

```
GET intlayer.zh/about
← إعادة الكتابة إلى /zh/about  (توجيه Next.js الداخلي فقط، يظل الرابط نظيفًا)
```

### Vite

يطبق ملحق `intlayerProxy` الخاص بـ Vite نفس المنطق أثناء التطوير:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **ملاحظة**: في التطوير المحلي، تكون عادةً على `localhost` ن لذا ستشير عمليات إعادة التوجيه عبر النطاقات إلى النطاقات المباشرة بدلاً من منفذ محلي آخر. استخدم تجاوز ملف hosts (مثلاً `127.0.0.1 intlayer.zh`) أو بروكسي عكسي إذا كنت بحاجة إلى اختبار توجيه النطاقات المتعددة محليًا.

## مبدل اللغة (Locale Switcher)

يتعامل خطاف `useLocale` من `next-intlayer` مع التنقل المدرك للنطاق تلقائيًا. عندما ينتقل المستخدم إلى لغة على نطاق مختلف، يقوم الخطاف بتنقل كامل للصفحة (`window.location.href`) بدلاً من دفع موجه جانب العميل، لأن موجه Next.js لا يمكنه تجاوز الأصول (origins).

```tsx fileName="components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { availableLocales, locale, setLocale } = useLocale();

  return (
    <ul>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <button
            onClick={() => setLocale(localeEl)}
            aria-current={localeEl === locale ? "true" : undefined}
          >
            {l.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

لا يلزم تكوين إضافي — يكتشف `useLocale` داخليًا `window.location.hostname` ويقرر بين `router.replace` (نفس النطاق) و `window.location.href` (عبر النطاقات).

## SEO: روابط `hreflang` البديلة

يشيع استخدام التوجيه القائم على النطاق مع `hreflang` لإخبار محركات البحث بالرابط الذي يجب أرشفته لكل لغة. استخدم `getMultilingualUrls` لإنشاء المجموعة الكاملة من الروابط البديلة:

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // مثلًا "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

ينتج عن هذا:

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## الأدوات الأساسية (Core Utilities)

| الأداة                                            | الوصف                                                                                   |
| ------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `getLocalizedUrl(url, locale, { currentDomain })` | يرجع رابطًا نسبيًا أو مطلقًا اعتمادًا على ما إذا كانت اللغة المستهدفة في النطاق الحالي. |
| `getMultilingualUrls(url, { currentDomain })`     | يرجع خريطة روابط محلية مفهرسة باللغة، تجمع بين الروابط النسبية والمطلقة حسب الحاجة.     |
| `getPrefix(locale, { domains })`                  | يرجع بادئة فارغة للغات ذات النطاق الحصري، وبادئة عادية في حالات أخرى.                   |
