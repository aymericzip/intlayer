---
docName: package__react-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/react-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: وثائق خطاف useIntlayerAsync | react-intlayer
description: انظر كيف تستخدم خطاف useIntlayerAsync لحزمة react-intlayer
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

# React Integration: `useIntlayerAsync` توثيق الخطاف

يمدد الخطاف `useIntlayerAsync` وظيفة `useIntlayer` من خلال عدم إعادة القواميس المسبقة فقط ولكن أيضًا جلب التحديثات بشكل غير متزامن، مما يجعله مثاليًا للتطبيقات التي تقوم بتحديث محتواها المحلي بشكل متكرر بعد العرض الأولي.

## نظرة عامة

- **تحميل القواميس بشكل غير متزامن:**  
  عند التثبيت الأولي، يقوم `useIntlayerAsync` أولاً بإرجاع أي قاموس محلي تم جلبه مسبقًا أو تم تجميعه بشكل ثابت (تمامًا كما يفعل `useIntlayer`) ثم يجلب ويدمج أي قواميس جديدة متاحة عن بُعد بشكل غير متزامن.
- **إدارة حالة التقدم:**  
  يوفر الخطاف أيضًا حالة `isLoading`، التي تشير إلى وقت جلب قاموس عن بُعد. يتيح ذلك للمطورين عرض مؤشرات التحميل أو حالات الهيكل العظمي لتجربة مستخدم أكثر سلاسة.

## إعداد البيئة

يوفر Intlayer نظام إدارة مصادر محتوى بدون واجهة (CSM) يمكّن غير المطورين من إدارة وتحديث محتوى التطبيق بسلاسة. باستخدام لوحة التحكم البديهية لـ Intlayer، يمكن لفريقك تحرير النصوص المحلية والصور والموارد الأخرى دون تعديل الكود مباشرة. يعمل هذا على تبسيط عملية إدارة المحتوى، وتعزيز التعاون، وضمان إمكانية إجراء التحديثات بسرعة وسهولة.

لبدء استخدام Intlayer:

1. **سجل واحصل على رمز وصول** على [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **أضف بيانات الاعتماد إلى ملف التكوين الخاص بك:**  
   في مشروع React الخاص بك، قم بتكوين عميل Intlayer باستخدام بيانات الاعتماد الخاصة بك:

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

3. **ادفع قاموس لغة جديد إلى Intlayer:**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   يقوم هذا الأمر بتحميل قواميس المحتوى الأولية الخاصة بك، مما يجعلها متاحة للجلب والتحرير غير المتزامن من خلال منصة Intlayer.

## استيراد `useIntlayerAsync` في React

في مكونات React الخاصة بك، قم باستيراد `useIntlayerAsync`:

```ts codeFormat="typescript"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="esm"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="commonjs"
const { useIntlayerAsync } = require("react-intlayer");
```

## المعلمات

1. **`key`**:  
   **النوع**: `DictionaryKeys`  
   مفتاح القاموس المستخدم لتحديد كتلة المحتوى المحلي. يجب تعريف هذا المفتاح في ملفات إعلان المحتوى الخاصة بك.

2. **`locale`** (اختياري):  
   **النوع**: `Locales`  
   اللغة المحددة التي تريد استهدافها. إذا تم حذفها، يستخدم الخطاف اللغة من سياق Intlayer الحالي.

3. **`isRenderEditor`** (اختياري، الافتراضي هو `true`):  
   **النوع**: `boolean`  
   يحدد ما إذا كان المحتوى يجب أن يكون جاهزًا للعرض مع تراكب محرر Intlayer. إذا تم تعيينه إلى `false`، ستستبعد بيانات القاموس المعادة ميزات خاصة بالمحرر.

## قيمة الإرجاع

يعيد الخطاف كائن قاموس يحتوي على محتوى محلي مفاتيحه `key` و `locale`. كما يتضمن قيمة منطقية `isLoading` تشير إلى ما إذا كان قاموس عن بُعد يتم جلبه حاليًا.

## مثال على الاستخدام في مكون React

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const ComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("المحتوى قيد التحميل...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>جارٍ التحميل…</h1>
          <p>يرجى الانتظار أثناء تحديث المحتوى.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("المحتوى قيد التحميل...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>جارٍ التحميل…</h1>
          <p>يرجى الانتظار أثناء تحديث المحتوى.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useIntlayerAsync } = require("react-intlayer");

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("المحتوى قيد التحميل...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>جارٍ التحميل…</h1>
          <p>يرجى الانتظار أثناء تحديث المحتوى.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

**النقاط الرئيسية:**

- عند العرض الأولي، تأتي `title` و `description` من قاموس اللغة المدمج مسبقًا أو المضمن بشكل ثابت.
- بينما تكون `isLoading` تساوي `true`، يتم تنفيذ طلب في الخلفية لجلب قاموس محدث.
- بمجرد اكتمال الجلب، يتم تحديث `title` و `description` بأحدث محتوى، وتعود `isLoading` إلى `false`.

## التعامل مع توطين السمات

يمكنك أيضًا استرجاع القيم المحلية للسمات المختلفة لخصائص HTML (مثل `alt`، `title`، `aria-label`):

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## ملفات القاموس

يجب تعريف جميع مفاتيح المحتوى في ملفات إعلان المحتوى الخاصة بك لضمان الأمان من النوع ولتجنب أخطاء وقت التشغيل. تتيح هذه الملفات التحقق من صحة TypeScript، مما يضمن دائمًا الرجوع إلى المفاتيح واللغات الموجودة.

تعليمات إعداد ملفات إعلان المحتوى متاحة [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md).

## مزيد من المعلومات

- **محرر Intlayer المرئي:**  
  قم بالتكامل مع محرر Intlayer المرئي لإدارة وتحرير المحتوى مباشرة من واجهة المستخدم. مزيد من التفاصيل [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md).

---

**باختصار**، يعد `useIntlayerAsync` خطاف React قويًا مصممًا لتعزيز تجربة المستخدم والحفاظ على تحديث المحتوى من خلال دمج القواميس المسبقة أو المجمعة مسبقًا مع تحديثات القاموس غير المتزامنة. من خلال الاستفادة من `isLoading` وإعلانات المحتوى المستندة إلى TypeScript، يمكنك دمج محتوى ديناميكي ومحلي بسلاسة في تطبيقات React الخاصة بك.
