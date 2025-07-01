---
docName: package__next-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/next-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق هوك useIntlayerAsync | next-intlayer
description: تعرف على كيفية استخدام هوك useIntlayerAsync لحزمة next-intlayer
keywords:
  - useIntlayerAsync
  - dictionary
  - key
  - Intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافا سكريبت
  - React
---

# تكامل Next.js: توثيق هوك `useIntlayerAsync`

يقوم هوك `useIntlayerAsync` بتوسيع وظيفة هوك `useIntlayer` ليس فقط بإرجاع القواميس المسبقة العرض، بل أيضًا بجلب التحديثات بشكل غير متزامن، مما يجعله مثاليًا للتطبيقات التي تقوم بتحديث محتواها المحلي بشكل متكرر بعد العرض الأولي.

## نظرة عامة

- **تحميل القاموس بشكل غير متزامن:**  
  على جانب العميل، يقوم `useIntlayerAsync` أولاً بإرجاع قاموس اللغة المسبق العرض (تمامًا مثل `useIntlayer`) ثم يقوم بجلب ودمج أي قواميس جديدة متاحة عن بُعد بشكل غير متزامن.
- **إدارة حالة التقدم:**  
  يوفر الهوك أيضًا حالة `isLoading`، التي تشير إلى متى يتم جلب قاموس عن بُعد. هذا يسمح للمطورين بعرض مؤشرات تحميل أو حالات هيكل عظمي لتجربة مستخدم أكثر سلاسة.

## إعداد البيئة

توفر Intlayer نظام إدارة مصادر المحتوى بدون واجهة (CSM) يمكّن غير المطورين من إدارة وتحديث محتوى التطبيق بسلاسة. باستخدام لوحة التحكم البديهية الخاصة بـ Intlayer، يمكن لفريقك تحرير النصوص المترجمة، والصور، والموارد الأخرى دون الحاجة إلى تعديل الكود مباشرة. هذا يبسط عملية إدارة المحتوى، ويعزز التعاون، ويضمن إمكانية إجراء التحديثات بسرعة وسهولة.

للبدء مع Intlayer، ستحتاج أولاً إلى التسجيل والحصول على رمز وصول في [لوحة التحكم](https://intlayer.org/dashboard). بمجرد حصولك على بيانات الاعتماد الخاصة بك، أضفها إلى ملف التكوين الخاص بك كما هو موضح أدناه:

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

بعد تكوين بيانات الاعتماد الخاصة بك، يمكنك دفع قاموس لغة جديد إلى Intlayer عن طريق تشغيل الأمر التالي:

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

يقوم هذا الأمر بتحميل قواميس المحتوى الأولية الخاصة بك، مما يجعلها متاحة للتحميل والتحرير بشكل غير متزامن عبر منصة Intlayer.

## استيراد `useIntlayerAsync` في Next.js

نظرًا لأن `useIntlayerAsync` مخصص لمكونات **جهة العميل**، فستقوم باستيراده من نفس نقطة الدخول الخاصة بالعميل مثل `useIntlayer`:

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

تأكد من أن الملف الذي يستورد يحتوي على التعليق `"use client"` في الأعلى، إذا كنت تستخدم Next.js App Router مع فصل مكونات الخادم والعميل.

## المعاملات

1. **`key`**:  
   **النوع**: `DictionaryKeys`  
   مفتاح القاموس المستخدم لتحديد كتلة المحتوى المحلي. يجب تعريف هذا المفتاح في ملفات إعلان المحتوى الخاصة بك.

2. **`locale`** (اختياري):  
   **النوع**: `Locales`  
   اللغة المحددة التي تريد استهدافها. إذا تم حذفها، يستخدم الخطاف اللغة من سياق العميل.

3. **`isRenderEditor`** (اختياري، القيمة الافتراضية `true`):  
    **النوع**: `boolean`  
   يحدد ما إذا كان يجب أن يكون المحتوى جاهزًا للعرض مع تراكب محرر Intlayer. إذا تم تعيينه إلى `false`، ستستبعد بيانات القاموس المرجعة الميزات الخاصة بالمحرر.

## القيمة المرجعة

يعيد الخطاف كائن قاموس يحتوي على المحتوى المحلي المفهرس بواسطة `key` و`locale`. كما يتضمن قيمة منطقية `isLoading` تشير إلى ما إذا كان يتم حاليًا جلب قاموس بعيد.

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
      console.log("يتم تحميل المحتوى...");
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
      console.log("يتم تحميل المحتوى...");
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
      console.log("يتم تحميل المحتوى...");
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

- عند العرض الأولي، يأتي `title` و `description` من قاموس اللغة المُسبق العرض.
- بينما تكون قيمة `isLoading` تساوي `true`، يتم إجراء طلب عن بُعد في الخلفية لجلب قاموس محدث.
- بمجرد اكتمال الجلب، يتم تحديث `title` و `description` بأحدث المحتويات، وتعود قيمة `isLoading` إلى `false`.

## التعامل مع تعريب الخصائص

كما هو الحال مع `useIntlayer`، يمكنك استرجاع قيم الخصائص المعربة لمختلف خصائص HTML (مثل `alt`، `title`، `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## ملفات القاموس

يجب تعريف جميع مفاتيح المحتوى في ملفات إعلان المحتوى الخاصة بك لضمان سلامة النوع ولمنع أخطاء وقت التشغيل. تتيح هذه الملفات التحقق من صحة TypeScript، مما يضمن أنك تشير دائمًا إلى المفاتيح واللغات الموجودة.

تعليمات إعداد ملفات إعلان المحتوى متاحة [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md).

## معلومات إضافية

- **محرر Intlayer المرئي:**  
  دمج مع محرر Intlayer المرئي لإدارة وتحرير المحتوى مباشرة من واجهة المستخدم. مزيد من التفاصيل [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md).

---

**باختصار**، `useIntlayerAsync` هو هوك قوي على جانب العميل مصمم لتعزيز تجربة المستخدم والحفاظ على تحديث المحتوى من خلال الجمع بين القواميس المعالجة مسبقًا وتحديثات القاموس غير المتزامنة. من خلال الاستفادة من `isLoading` وإعلانات المحتوى المستندة إلى TypeScript، يمكنك دمج المحتوى الديناميكي والمحلي بسلاسة في تطبيقات Next.js الخاصة بك.

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بدء التاريخ
