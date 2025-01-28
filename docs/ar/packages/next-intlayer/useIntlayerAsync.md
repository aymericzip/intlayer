# Next.js Integration: `useIntlayerAsync` Hook Documentation

The `useIntlayerAsync` hook يمدد وظيفة `useIntlayer` من خلال ليس فقط إرجاع القواميس المعالجة مسبقًا، ولكن أيضًا جلب التحديثات بشكل غير متزامن، مما يجعله مثاليًا للتطبيقات التي تقوم بتحديث محتواها المحلي بشكل متكرر بعد العرض الأولي.

## Overview

- **تحميل القاموس بشكل غير متزامن:**  
  على جانب العميل، `useIntlayerAsync` أولاً يُرجع القاموس المحلي المعالج مسبقًا (تمامًا مثل `useIntlayer`) ثم يجلب بشكل غير متزامن ويجمع أي قواميس بعيدة جديدة متاحة.
- **إدارة حالة التقدم:**  
  يوفر الخطاف أيضًا حالة `isLoading`، مما يشير إلى متى يتم جلب قاموس بعيد. هذا يسمح للمطورين بعرض مؤشرات تحميل أو حالات هيكلية لتجربة مستخدم أكثر سلاسة.

## Environment Setup

Intlayer يوفر نظام إدارة محتوى بلا رأس (CSM) يمكّن غير المطورين من إدارة وتحديث محتوى التطبيقات بسلاسة. من خلال استخدام لوحة المعلومات السهلة الاستخدام لـ Intlayer، يمكن لفريقك تحرير النصوص المحلية والصور وموارد أخرى دون تعديل الكود مباشرة. هذا يبسط عملية إدارة المحتوى، ويعزز التعاون، ويضمن إمكانية إجراء التحديثات بسرعة وسهولة.

للشروع في استخدام Intlayer، ستحتاج أولاً إلى التسجيل والحصول على رمز وصول على [https://intlayer.org/dashboard](https://intlayer.org/dashboard). بمجرد أن تحصل على بيانات الاعتماد الخاصة بك، أضفها إلى ملف التكوين الخاص بك كما هو موضح أدناه:

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

بعد تكوين بيانات الاعتماد الخاصة بك، يمكنك دفع قاموس محلي جديد إلى Intlayer عن طريق تشغيل:

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

هذا الأمر يرفع قواميس المحتوى الأولية الخاصة بك، مما يجعلها متاحة للاستخراج والتعديل غير المتزامن من خلال منصة Intlayer.

## Importing `useIntlayerAsync` in Next.js

نظرًا لأن `useIntlayerAsync` مخصص لمكونات **جانب العميل**، ستقوم باستيراده من نفس نقطة الدخول الخاصة بالعميل مثل `useIntlayer`:

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

تأكد من أن الملف المستورد مُعَلّم بــ `"use client"` في الأعلى، إذا كنت تستخدم موجه تطبيقات Next.js مع مكونات خادم وعميل مفصولة.

## Parameters

1. **`key`**:  
   **Type**: `DictionaryKeys`  
   مفتاح القاموس المستخدم لتحديد كتلة المحتوى المحلي. ينبغي تعريف هذا المفتاح في ملفات إعلان المحتوى الخاصة بك.

2. **`locale`** (اختياري):  
   **Type**: `Locales`  
   اللغة المحددة التي تريد استهدافها. إذا تم حذفها، يستخدم الخطاف اللغة من سياق العميل.

3. **`isRenderEditor`** (اختياري، الافتراضي هو `true`):  
   **Type**: `boolean`  
   يحدد ما إذا كان ينبغي أن يكون المحتوى جاهزًا للرسم باستخدام طبقة تحرير Intlayer. إذا تم تعيينه على `false`، ستستثني بيانات القاموس المعادة الميزات الخاصة بالتحرير.

## Return Value

يرجع الخطاف كائن قاموس يحتوي على محتوى محلي مرتّب حسب `key` و `locale`. يتضمن أيضًا قيمة منطقية `isLoading` تشير إلى ما إذا كان يتم جلب قاموس بعيد حاليًا.

## Example Usage in Next.js

### Client-Side Component Example

```tsx fileName="src/components/AsyncClientComponentExample.tsx" codeFormat="typescript"
"use client";

import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("المحتوى يتم تحميله...");
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
      console.log("المحتوى يتم تحميله...");
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
      console.log("المحتوى يتم تحميله...");
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

**Key Points:**

- عند العرض الأول، تأتي `title` و `description` من القاموس المحلي المعالج مسبقًا.
- بينما تكون `isLoading` `true`، يتم إجراء طلب بعيد في الخلفية لجلب قاموس محدث.
- بمجرد اكتمال الجلب، يتم تحديث `title` و `description` بأحدث المحتويات، وتعود `isLoading` إلى `false`.

## Handling Attribute Localization

كما هو الحال مع `useIntlayer`، يمكنك استرداد قيم سمات محلية لخصائص HTML المختلفة (مثل `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Content Declaration Files

يجب تحديد جميع مفاتيح المحتوى في ملفات إعلان المحتوى الخاصة بك من أجل سلامة النوع ومنع الأخطاء في وقت التشغيل. تتيح هذه الملفات التحقق من صحة TypeScript، مما يضمن دائمًا الإشارة إلى المفاتيح واللغات الموجودة.

إرشادات لإعداد ملفات إعلان المحتوى متاحة [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md).

## Further Information

- **Intlayer Visual Editor:**  
  دمج مع محرر Intlayer المرئي لإدارة وتحرير المحتوى مباشرة من واجهة المستخدم. مزيد من التفاصيل [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor.md).

---

**In summary**, `useIntlayerAsync` هو خطاف قوي من جهة العميل مصمم لتحسين تجربة المستخدم والحفاظ على تحديث المحتوى من خلال مزج القواميس المعالجة مسبقًا مع التحديثات غير المتزامنة للقواميس. من خلال الاستفادة من `isLoading` وإعلانات المحتوى المستندة إلى TypeScript، يمكنك دمج المحتوى الديناميكي والمحلي بسلاسة في تطبيقات Next.js الخاصة بك.
