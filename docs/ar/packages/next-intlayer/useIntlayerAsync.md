---
docName: package__next-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/next-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: وثائق خطاف useIntlayerAsync | next-intlayer
description: انظر كيف تستخدم خطاف useIntlayerAsync لحزمة next-intlayer
keywords:
  - useIntlayerAsync
  - قاموس
  - مفتاح
  - Intlayer
  - الدولية
  - التوثيق
  - Next.js
  - JavaScript
  - React
---

# دمج Next.js: توثيق `useIntlayerAsync` Hook

يمدد الخطاف `useIntlayerAsync` وظائف `useIntlayer` من خلال عدم إرجاع القواميس المسبقة العرض فقط، بل أيضًا جلب التحديثات بشكل غير متزامن، مما يجعله مثاليًا للتطبيقات التي تقوم بتحديث محتواها المحلي بشكل متكرر بعد العرض الأولي.

## نظرة عامة

- **تحميل القواميس بشكل غير متزامن:**  
  على جانب العميل، يقوم `useIntlayerAsync` أولاً بإرجاع قاموس اللغة المسبق العرض (مثل `useIntlayer`) ثم يجلب ويدمج أي قواميس بعيدة جديدة متاحة بشكل غير متزامن.
- **إدارة حالة التقدم:**  
  يوفر الخطاف أيضًا حالة `isLoading`، مما يشير إلى متى يتم جلب قاموس بعيد. يتيح ذلك للمطورين عرض مؤشرات التحميل أو حالات الهيكل العظمي لتجربة مستخدم أكثر سلاسة.

## إعداد البيئة

يوفر Intlayer نظام إدارة مصدر محتوى بدون رأس (CSM) يمكّن غير المطورين من إدارة وتحديث محتوى التطبيق بسلاسة. باستخدام لوحة التحكم البديهية لـ Intlayer، يمكن لفريقك تحرير النصوص المحلية والصور والموارد الأخرى دون تعديل الكود مباشرة. هذا يبسط عملية إدارة المحتوى، ويعزز التعاون، ويضمن إمكانية إجراء التحديثات بسرعة وسهولة.

لبدء استخدام Intlayer، ستحتاج أولاً إلى التسجيل والحصول على رمز وصول في [https://intlayer.org/dashboard](https://intlayer.org/dashboard). بمجرد حصولك على بيانات الاعتماد الخاصة بك، أضفها إلى ملف التكوين كما هو موضح أدناه:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

export default {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

بعد تكوين بيانات الاعتماد الخاصة بك، يمكنك دفع قاموس لغة جديد إلى Intlayer عن طريق تشغيل:

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

يقوم هذا الأمر بتحميل قواميس المحتوى الأولية الخاصة بك، مما يجعلها متاحة للجلب والتحرير غير المتزامن من خلال منصة Intlayer.

## استيراد `useIntlayerAsync` في Next.js

نظرًا لأن `useIntlayerAsync` مخصص لمكونات **جانب العميل**، ستقوم باستيراده من نفس نقطة دخول العميل مثل `useIntlayer`:

```tsx codeFormat="typescript"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="esm"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="commonjs"
"use client";

const { useIntlayerAsync } = require("next-intlayer");
```

تأكد من أن ملف الاستيراد مشروح بـ `"use client"` في الأعلى، إذا كنت تستخدم App Router في Next.js مع فصل المكونات الخادمة والعميلة.

## المعلمات

1. **`key`**:  
   **النوع**: `DictionaryKeys`  
   مفتاح القاموس المستخدم لتحديد كتلة المحتوى المحلي. يجب تعريف هذا المفتاح في ملفات إعلان المحتوى الخاصة بك.

2. **`locale`** (اختياري):  
   **النوع**: `Locales`  
   اللغة المحددة التي تريد استهدافها. إذا تم إغفالها، يستخدم الخطاف اللغة من سياق العميل.

3. **`isRenderEditor`** (اختياري، القيمة الافتراضية `true`):  
   **النوع**: `boolean`  
   يحدد ما إذا كان المحتوى يجب أن يكون جاهزًا للعرض مع تراكب محرر Intlayer. إذا تم تعيينه إلى `false`، ستستبعد بيانات القاموس المرتجعة الميزات الخاصة بالمحرر.

## قيمة الإرجاع

يعيد الخطاف كائن قاموس يحتوي على المحتوى المحلي المفهرس بواسطة `key` و `locale`. كما يتضمن منطقية `isLoading` تشير إلى ما إذا كان يتم جلب قاموس بعيد حاليًا.

## مثال على الاستخدام في Next.js

### مثال على مكون جانب العميل

```tsx fileName="src/components/AsyncClientComponentExample.tsx" codeFormat="typescript"
"use client";

import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("المحتوى قيد التحميل...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("المحتوى قيد التحميل...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useEffect } = require("react");
const { useIntlayerAsync } = require("next-intlayer");

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("المحتوى قيد التحميل...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

**النقاط الرئيسية:**

- عند العرض الأولي، يتم جلب `title` و `description` من قاموس اللغة المسبق العرض.
- أثناء أن تكون `isLoading` تساوي `true`، يتم إجراء طلب بعيد في الخلفية لجلب قاموس محدث.
- بمجرد اكتمال الجلب، يتم تحديث `title` و `description` بالمحتوى الأحدث، وتعود `isLoading` إلى `false`.

## التعامل مع توطين السمات

كما هو الحال مع `useIntlayer`، يمكنك استرداد القيم المحلية للسمات المختلفة لخصائص HTML (مثل `alt`، `title`، `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## ملفات القاموس

يجب تعريف جميع مفاتيح المحتوى في ملفات إعلان المحتوى الخاصة بك لضمان الأمان من النوع ولتجنب أخطاء وقت التشغيل. تتيح هذه الملفات التحقق من صحة TypeScript، مما يضمن دائمًا الرجوع إلى المفاتيح واللغات الموجودة.

تعليمات إعداد ملفات إعلان المحتوى متاحة [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md).

## معلومات إضافية

- **محرر Intlayer المرئي:**  
  قم بالدمج مع محرر Intlayer المرئي لإدارة وتحرير المحتوى مباشرة من واجهة المستخدم. مزيد من التفاصيل [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md).

---

**باختصار**، يعد `useIntlayerAsync` خطافًا قويًا لجانب العميل مصممًا لتحسين تجربة المستخدم والحفاظ على تحديث المحتوى من خلال الجمع بين القواميس المسبقة العرض وتحديثات القواميس غير المتزامنة. من خلال الاستفادة من `isLoading` وإعلانات المحتوى المستندة إلى TypeScript، يمكنك دمج محتوى ديناميكي ومحلي بسلاسة في تطبيقات Next.js الخاصة بك.
