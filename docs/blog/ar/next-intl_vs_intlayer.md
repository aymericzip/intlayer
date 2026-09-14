---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "next-intl مقابل Intlayer: معيار ومقارنة 2026"
description: "مقارنة دقيقة بين next-intl وIntlayer على Next.js App Router وTanStack Start. حجم الحزمة، تسرب المحتوى، حجم المكونات، وسرعة تبديل اللغة وتجربة المطور."
keywords:
  - next-intl
  - use-intl
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer
author: aymericzip
---

# next-intl مقابل Intlayer | مقارنة أداء التدويل (i18n) في React وNext.js

مكتبة `next-intl` هي الخيار الافتراضي لتدويل تطبيقات Next.js App Router اليوم: تكامل محكم مع التوجيه، دعم كامل لـ ICU MessageFormat، وتجربة مطور مألوفة لأي شخص استخدم أنظمة i18n الكلاسيكية.

أما `Intlayer` فتعيد التفكير في المشكلة من أساسها: لا توجد قواميس مركزية، ولا حاجة لمطابقة مساحات الأسماء (namespaces) مع المسارات يدوياً. يتم الإعلان عن المحتوى بجانب كل مكون، بينما يتكفل مترجم وقت البناء بحزم ما تحتاجه كل صفحة فقط.

تقارن هذه المقالة المكتبتين بناءً على بيانات مستخرجة من [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)، وهو مشروع اختبار مفتوح المصدر يبني التطبيق نفسه مع كل مكتبة ويسجل ما يقوم المتصفح بتنزيله وتنفيذه فعلياً.

<TOC/>

> **باختصار (tl;dr)**: تضيف `next-intl` ما لا يقل عن **+12.6 كيلوبايت gzip** في كل صفحة لمجرد وقت التشغيل (runtime)، وتسرب **~90% من سلاسل الصفحات الأخرى** في إعداداتها القياسية (`static` و`dynamic`). يتطلب التخلص من هذا التسرب تقسيم الكتالوجات إلى مساحات أسماء واختيارها يدوياً لكل صفحة، وهي مهمة معقدة يتجنبها معظم المطورين. في المقابل، يضمن مترجم `Intlayer` تسريباً بنسبة **0%**، ومكونات أصغر **بثلاث مرات**، و**+0.3 كيلوبايت** فقط فوق التطبيق الأساسي، كل ذلك بدون أي إعدادات يدوية إضافية.

## نظرة عامة

- **next-intl** - معيار مجتمع Next.js. قواميس JSON مركزية لكل لغة، دعم كامل لـ ICU MessageFormat، وتكامل وثيق مع معالجة طلبات Next.js ونظام التوجيه الخاص به.
- **Intlayer** - نموذج محتوى يتمحور حول المكونات. توضع ملفات `.content.ts` بجانب مكوناتها، ويقوم مترجم وقت البناء بتقليم الشجرة (tree-shaking) والتحميل الكسول للمحتوى لكل مكون ولكل لغة، مع توليد أنواع TypeScript صارمة تلقائياً.

| المكتبة               | نجوم GitHub                                                                                                                                                                    | إجمالي التعديلات                                                                                                                                                                   | آخر تعديل                                                                                                                                           | الإصدار الأول | إصدار NPM                                                                                                     | تنزيلات NPM                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | أبريل 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   |
| `amannn/next-intl`    | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       | مارس 2021     | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) |

> يتم تحديث الشارات تلقائياً.

## مقارنة الميزات جنباً إلى جنب

| الميزة                                      | Intlayer (`react-intlayer` / `next-intlayer`)                          | next-intl (`next-intl` / `use-intl`)                       |
| ------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------- |
| **الترجمات بجانب المكونات**                 | ✅ نعم، ملف `.content.ts` بجوار كل مكون                                | ❌ قواميس JSON مركزية في مجلد `messages/`                  |
| **التكامل مع TypeScript**                   | ✅ أنواع صارمة مولدة تلقائياً من المحتوى                               | ⚠️ مدعوم عبر إعدادات `global.d.ts` يدوية لمسارات الرسائل   |
| **اكتشاف الترجمات المفقودة**                | ✅ خطأ TypeScript + خطأ/تحذير وقت البناء                               | ⚠️ وقت التشغيل يعيد المفتاح أو يرمي خطأ حسب الإعدادات      |
| **المحتوى الغني (JSX / Markdown / مكونات)** | ✅ دعم مباشر                                                           | ⚠️ عبر `t.rich()` مع توفير مكونات التحويل                  |
| **دعم ICU MessageFormat**                   | ⚠️ قيد التطوير                                                         | ✅ نعم، دعم كامل لمعيار ICU                                |
| **مكونات الخادم المتزامنة**                 | ✅ `useIntlayer` من `next-intlayer/server` يعمل في أي مكون خادم متزامن | ❌ يتطلب تمرير الترجمات عبر الـ props من خادم غير متزامن   |
| **تقليم الشجرة (Tree-shaking)**             | ✅ تلقائي لكل مكون ولكل لغة                                            | ⚠️ يتطلب تقسيماً يدوياً لمساحات الأسماء واستخدام `pick()`  |
| **التحميل الكسول (Lazy loading)**           | ✅ سطر إعداد واحد (`importMode: 'dynamic'`)                            | ⚠️ يتطلب استيراداً ديناميكياً يدوياً في `getRequestConfig` |
| **محرر مرئي / CMS**                         | ✅ محرر مرئي مجاني + CMS اختياري                                       | ❌ لا يوجد                                                 |
| **ترجمة مدعومة بالذكاء الاصطناعي**          | ✅ مدمجة وتستخدم مفاتيحك الخاصة                                        | ❌ لا يوجد                                                 |
| **خادم MCP ومهارات الوكلاء**                | ✅ نعم                                                                 | ❌ لا يوجد                                                 |

## الاختبار

### ما تم قياسه

تبني مجموعة [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) **نفس التطبيق** مع كل مكتبة: **10 صفحات** (الرئيسية، من نحن، المدونة، الوظائف، اتصل بنا، الأسئلة الشائعة، الأسعار، المنتجات، الإعدادات، الفريق)، و**10 لغات** (`en`، `fr`، `es`، `de`، `it`، `pt`، `zh`، `ja`, `ko`, `ru`)، مع مكونات متطابقة ومحتوى متطابق. يتم قياس الصفحات باللغتين `en` و`fr`. يتم تطبيق كل مكتبة في ما يصل إلى أربع **استراتيجيات تحميل**:

| الاستراتيجية       | الوصف                                                                           | من يستخدمها                                      |
| ------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------ |
| **static**         | يتم تجميع كل لغة وكل صفحة معاً وتحميلها دفعة واحدة                              | النماذج الأولية السريعة، الأكواد المولدة بالذكاء |
| **dynamic**        | يتم تحميل لغة العرض النشطة فقط، ولكن لجميع الصفحات دفعة واحدة                   | معظم المشاريع                                    |
| **scoped-static**  | مساحات أسماء لكل مسار، بدون تحميل كسول                                          | نادرة                                            |
| **scoped-dynamic** | مساحات أسماء لكل مسار + تحميل كسول. يتم إرسال الصفحة الحالية باللغة الحالية فقط | التطبيقات ذات الميزانيات الصارمة في الأداء       |

لا تملك Intlayer متغيراً "مخصص النطاق" (scoped): يقوم المترجم تلقائياً بتحديد نطاق المحتوى **لكل مكون**، لذلك فإن صفي `static` و`dynamic` محصوران بالفعل.

لكل بناء، تسجل المجموعة:

- **حجم المكتبة (Lib size)**: حجم gzip لمكون فارغ يستورد مكتبة i18n فقط.
- **JS للصفحة (Page JS)**: متوسط حجم JavaScript بتنسيق gzip الذي تم تنزيله لكل صفحة.
- **نسبة تسرب اللغة (Locale leak %)**: نسبة السلاسل التي تنتمي إلى لغة لا يعرضها المستخدم.
- **نسبة تسرب الصفحة (Page leak %)**: نسبة السلاسل التي تنتمي إلى صفحة لا يتصفحها المستخدم.
- **متوسط حجم المكون (Component avg)**: متوسط حجم gzip لكل مكون تم تجميعه بمعزل.
- **تفاعلية E2E**: الوقت المنقضي بين اختيار لغة جديدة وتحديث `html[lang]` في الـ DOM.
- **الترطيب (Hydration)**: مدة مرحلة ترطيب React.

> الأرقام أدناه مأخوذة من اختبار بتاريخ **2026-09-12** باستخدام `next-intl` 4.14.2 و`intlayer` 9.5.1.

### النتائج على Next.js (App Router)

| المكتبة                       | الاستراتيجية   | حجم المكتبة (gz) | متوسط JS للصفحة (gz) | تسرب اللغة | تسرب الصفحة | متوسط المكون (gz) | تفاعلية E2E | الترطيب |
| ----------------------------- | -------------- | ---------------: | -------------------: | ---------: | ----------: | ----------------: | ----------: | ------: |
| **base** (بدون i18n)          | -              |           0.0 KB |             141.0 KB |       0.0% |        0.0% |            0.9 KB |     13.4 ms | 11.8 ms |
| `next-intl`                   | static         |          14.7 KB |             153.6 KB |       4.2% |       89.8% |           21.8 KB |     16.0 ms | 14.7 ms |
| `next-intl`                   | dynamic        |          14.7 KB |             153.6 KB |       9.7% |       89.9% |           21.8 KB |     15.6 ms | 14.8 ms |
| `next-intl`                   | scoped-static  |          14.7 KB |             153.6 KB |       0.0% |        0.0% |           80.1 KB |     17.9 ms | 17.4 ms |
| `next-intl`                   | scoped-dynamic |          14.7 KB |             153.6 KB |       0.0% |        0.0% |           22.9 KB |     17.8 ms | 16.8 ms |
| **`next-intlayer`**           | static         |       **5.5 KB** |         **141.3 KB** |   **0.0%** |    **0.0%** |        **8.5 KB** | **15.5 ms** | 16.9 ms |
| **`next-intlayer`**           | dynamic        |       **5.5 KB** |         **141.3 KB** |   **0.0%** |    **0.0%** |        **6.9 KB** | **15.3 ms** | 15.9 ms |
| `@intlayer/next-intl` (توافق) | static         |           8.0 KB |             147.5 KB |       0.0% |        0.0% |            8.1 KB |     14.5 ms | 12.8 ms |
| `@intlayer/next-intl` (توافق) | dynamic        |           8.0 KB |             148.7 KB |       0.0% |        0.0% |            8.1 KB |     11.7 ms | 12.8 ms |

**كيف تقرأ هذه النتائج**

- **تكلفة وقت التشغيل.** يزن التطبيق الأساسي 141.0 كيلوبايت لكل صفحة. ترفعه `next-intl` إلى 153.6 كيلوبايت (**+12.6 كيلوبايت gzip في كل صفحة**)، بينما يرفعه Intlayer إلى 141.3 كيلوبايت فقط (**+0.3 كيلوبايت**).
- **التسريب.** في الإعدادين الأكثر استخداماً (`static` و`dynamic`)، ترسل `next-intl` ما يقرب من **~90% من سلاسل الصفحات الأخرى** في كل صفحة، لأن ملف `en.json` كاملاً يدخل في مزود العميل. يتطلب الوصول إلى 0% تقسيماً يدوياً دقيقاً. أما Intlayer فيحقق 0% تلقائياً.
- **حجم المكون.** المكون الذي يستدعي `useTranslations()` يُترجم في المتوسط إلى 21.8 كيلوبايت؛ والمكون نفسه مع `useIntlayer()` يبلغ 6.9 كيلوبايت فقط. وفي وضع `scoped-static` تقفز مكونات `next-intl` إلى 80.1 كيلوبايت لأن كل مكون يُضمن مساحة أسمائه داخلياً.

### النتائج على TanStack Start (`use-intl`)

| المكتبة                      | الاستراتيجية   | حجم المكتبة (gz) | متوسط JS للصفحة (gz) | تسرب اللغة | تسرب الصفحة | متوسط المكون (gz) | تفاعلية E2E |
| ---------------------------- | -------------- | ---------------: | -------------------: | ---------: | ----------: | ----------------: | ----------: |
| **base** (بدون i18n)         | -              |           0.0 KB |             111.0 KB |       0.0% |        0.0% |            0.7 KB |      8.1 ms |
| `use-intl`                   | static         |          14.1 KB |             179.8 KB |      50.0% |       89.8% |           76.0 KB |      6.7 ms |
| `use-intl`                   | dynamic        |          14.1 KB |             119.4 KB |       0.0% |       89.8% |           75.9 KB |      7.0 ms |
| `use-intl`                   | scoped-static  |          14.1 KB |             128.7 KB |       0.0% |        0.0% |           87.1 KB |     20.9 ms |
| `use-intl`                   | scoped-dynamic |          14.1 KB |             128.7 KB |       0.0% |        0.0% |           87.1 KB |     13.3 ms |
| **`intlayer`**               | static         |       **5.0 KB** |         **125.8 KB** |      50.0% |    **0.0%** |        **8.1 KB** |  **3.2 ms** |
| **`intlayer`**               | dynamic        |       **5.0 KB** |         **118.6 KB** |   **0.0%** |    **0.0%** |        **6.3 KB** |  **3.6 ms** |
| `@intlayer/use-intl` (توافق) | dynamic        |           7.3 KB |             129.7 KB |       0.0% |        0.0% |            9.3 KB |      8.7 ms |

**كيف تقرأ هذه النتائج**

- يرسل الإعداد البسيط لـ `use-intl` ما مقداره **68.8 كيلوبايت أكثر من JavaScript لكل صفحة** مقارنة بالتطبيق الأساسي.
- في وضع `dynamic`، يصل `use-intl` إلى 119.4 كيلوبايت، لكنه لا يزال يحمل **تسرباً للصفحات بنسبة 89.8%**.
- يظهر الفارق المعماري بوضوح في **حجم المكونات**: 76-87 كيلوبايت مع `use-intl` مقابل 6-8 كيلوبايت مع Intlayer.
- **تبديل اللغة** أسرع بمرتين إلى أربع مرات مع Intlayer (3 مللي ثانية مقابل 7-21 مللي ثانية).

## لماذا هذا الفارق؟ الكتالوجات المركزية مقابل القواميس المجمعة

تتبع `next-intl` النموذج التقليدي: ملف JSON واحد لكل لغة، يُحمّل في `getRequestConfig`، ويُمرر إلى `NextIntlClientProvider`، ويُقرأ عبر `t("namespace.key")`.

```bash
.
├── messages
│   ├── en.json
│   └── fr.json
└── src
    ├── i18n
    │   ├── request.ts
    │   └── routing.ts
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                └── page.tsx
```

لا يمكن لوقت التشغيل معرفة المفاتيح التي ستستخدمها الصفحة فعلياً، لذا فإن الخيار الآمن هو إرسال الكتالوج بأكمله.

بينما تقلب Intlayer هذه المسؤولية؛ حيث يتم الإعلان عن المحتوى بجانب المكون المعني مباشرة:

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                ├── page.tsx
                └── page.content.ts
    └── components
        └── Counter
            ├── index.tsx
            └── index.content.ts
```

في وقت البناء، يرى المترجم أي مكون يستورد أي قاموس، ويحزم هذه القواميس فقط للغة النشطة، ويسقط أي محتوى غير مستخدم تلقائياً.

> للحصول على أرقام صف `dynamic`، اضبط `dictionary.importMode: 'dynamic'` في `intlayer.config.ts`. راجع [دليل تحسين الحزمة](https://intlayer.org/ar/doc/concept/bundle-optimization).

## تجربة المطور

### مكون العميل (Client Component)

**next-intl**

```json fileName="messages/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

export const Counter = () => {
  const t = useTranslations("counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")} onClick={() => setCount((c) => c + 1)}>
        {t("increment")}
      </button>
    </div>
  );
};
```

**Intlayer**

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

### مكونات الخادم المتزامنة (Server Components)

غالباً ما تكون عناصر واجهة المستخدم المشتركة (شريط التنقل، التذييل، البطاقات) مكونات خادم تُعرض كأبناء لمكونات العميل، لذا لا يمكن أن تكون غير متزامنة (`async`).

**next-intl**

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  formattedCount: string;
};

export const ServerCounter = ({ t, formattedCount }: ServerCounterProps) => (
  <div>
    <p>{formattedCount}</p>
    <button aria-label={t("label")}>{t("increment")}</button>
  </div>
);
```

**Intlayer**

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

### البيانات الوصفية (Metadata)

**next-intl**

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

const localizedPath = (locale: string, path: string) =>
  locale === routing.defaultLocale ? path : `/${locale}${path}`;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};
```

**Intlayer**

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("about-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};
```

## الاحتفاظ بـ API الخاص بـ next-intl مع مخرجات Intlayer

لا يتعين عليك إعادة كتابة مكوناتك للحصول على أرقام الأداء الموضحة أعلاه. حزمة `@intlayer/next-intl` هي محول متوافق مباشرة: يحتفظ بـ `useTranslations` و`getTranslations` و`useFormatter` و`t.rich()` وصيغ الجمع في ICU، ويقدمها من قواميس Intlayer التي يترجمها مترجم Intlayer.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

في الاختبار، تحسن بناء التوافق لنفس التطبيق من **153.6 كيلوبايت إلى 147.5 كيلوبايت** لكل صفحة، ومن **21.8 كيلوبايت إلى 8.1 كيلوبايت** لكل مكون، ومن **تسرب يقارب 90% إلى 0%**، مع بقاء كود التطبيق دون أي تعديل. ويمكن لملفات `messages/{locale}.json` الحالية أن تظل مصدر الحقيقة عبر [إضافة مزامنة JSON](https://intlayer.org/ar/doc/compatibility/next-intl).

راجع [دليل الانتقال من next-intl](https://intlayer.org/ar/doc/migration/next-intl) لاتباع الخطوات التفصيلية.

## متى تختار أياً منهما؟

- **اختر next-intl** إذا كنت بحاجة إلى معيار مجتمع Next.js الواسع، أو تعتمد بشكل كبير على ICU MessageFormat، أو كان تطبيقك صغيراً إلى متوسط الحجم، أو كنت مدمجاً بالفعل مع منصات ترجمة مركزية (Crowdin، Phrase، Lokalise...).
- **اختر Intlayer** إذا كنت تريد **محتوى بنطاق المكونات**، و**TypeScript صارماً**، و**أخطاء للمفاتيح المفقودة عند البناء**، و**تقليم الشجرة والتحميل الكسول دون أي جهد**، ومكونات خادم متزامنة، وأدوات تحرير مدمجة (محرر مرئي، CMS، ترجمة بالذكاء الاصطناعي، خادم MCP).
- **اختر `@intlayer/next-intl`** إذا كنت تستخدم `next-intl` بالفعل وتريد مكاسب الحزمة والأداء دون إعادة كتابة التطبيق.

## مقارنات ذات صلة

- [i18next مقابل Intlayer](https://intlayer.org/ar/blog/i18next-vs-intlayer) (الاختبار نفسه)
- [Lingui مقابل Intlayer](https://intlayer.org/ar/blog/lingui-vs-intlayer) (الاختبار نفسه)
- [vue-i18n مقابل Intlayer](https://intlayer.org/ar/blog/vue-i18n-vs-intlayer-benchmark) (الاختبار نفسه)
- [next-i18next مقابل next-intl مقابل Intlayer](https://intlayer.org/ar/blog/next-i18next-vs-next-intl-vs-intlayer)
- [هل أصبحت next-intl قديمة؟](https://intlayer.org/ar/blog/is-next-intl-outdated)

## نجوم GitHub

تعد نجوم GitHub مؤشراً قوياً على شعبية المشروع وثقة المجتمع وأهميته على المدى الطويل.

[![رسم بياني لتاريخ النجوم](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#amannn/next-intl&aymericzip/intlayer)

## الخاتمة

`next-intl` مكتبة قوية ومصانة جيداً، ويؤكد الاختبار أنها خيار جيد على Next.js. لكن نموذج الكتالوج المركزي يضع كل عبء التحسين على عاتق المطور: الإعداد البسيط يسرب نحو 90% من محتوى الصفحات الأخرى، ووقت التشغيل وحده يكلف +12.6 كيلوبايت gzip في كل صفحة.

ينقل Intlayer هذا العمل بأكمله إلى المترجم. القواميس لكل مكون، والتحميل الكسول لكل لغة، وتطهير المحتوى غير المستخدم تصبح جميعها مخرجات بناء تلقائية. والنتيجة على نفس التطبيق: **+0.3 كيلوبايت لكل صفحة**، **0% تسرب**، ومكونات **أصغر بـ 3 مرات**، وتبديل لغة **أسرع بمرتين إلى 4 مرات** على TanStack Start.

جميع البيانات الأولية والتطبيقات وسيناريوهات الاختبار متاحة في [مستودع Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). يمكنك تشغيلها بنفسك.

راجع وثيقة ['لماذا Intlayer؟'](https://intlayer.org/ar/doc/why) لمزيد من التفاصيل.
