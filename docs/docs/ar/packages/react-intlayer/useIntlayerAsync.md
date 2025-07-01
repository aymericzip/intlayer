---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق الخطاف useIntlayerAsync | react-intlayer
description: تعرف على كيفية استخدام الخطاف useIntlayerAsync لحزمة react-intlayer
keywords:
  - useIntlayerAsync
  - dictionary
  - key
  - Intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافاسكريبت
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useIntlayerAsync
---

# تكامل React: توثيق الخطاف `useIntlayerAsync`

يقوم الخطاف `useIntlayerAsync` بتوسيع وظيفة `useIntlayer` ليس فقط بإرجاع القواميس التي تم عرضها مسبقًا، بل أيضًا بجلب التحديثات بشكل غير متزامن، مما يجعله مثاليًا للتطبيقات التي تقوم بتحديث محتواها المحلي بشكل متكرر بعد العرض الأولي.

## نظرة عامة

- **تحميل القاموس بشكل غير متزامن:**  
  عند التركيب الأولي، يقوم `useIntlayerAsync` أولاً بإرجاع أي قاموس محلي تم جلبه مسبقًا أو تم تجميعه بشكل ثابت (تمامًا كما يفعل `useIntlayer`) ثم يقوم بجلب ودمج أي قواميس جديدة متاحة عن بُعد بشكل غير متزامن.
- **إدارة حالة التقدم:**  
  يوفر الخطاف أيضًا حالة `isLoading`، التي تشير إلى متى يتم جلب قاموس عن بُعد. هذا يسمح للمطورين بعرض مؤشرات تحميل أو حالات هيكل عظمي لتجربة مستخدم أكثر سلاسة.

## إعداد البيئة

يوفر Intlayer نظام إدارة مصادر المحتوى (CSM) بدون واجهة، يمكّن غير المطورين من إدارة وتحديث محتوى التطبيق بسلاسة. من خلال استخدام لوحة تحكم Intlayer البديهية، يمكن لفريقك تحرير النصوص المحلية، الصور، والموارد الأخرى دون تعديل الكود مباشرة. هذا يبسط عملية إدارة المحتوى، يعزز التعاون، ويضمن إمكانية إجراء التحديثات بسرعة وسهولة.

للبدء مع Intlayer:

1. **سجّل واحصل على رمز وصول** من [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
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

3. **دفع قاموس لغة جديد إلى Intlayer:**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   يقوم هذا الأمر بتحميل قواميس المحتوى الأولية الخاصة بك، مما يجعلها متاحة للتحميل والتحرير غير المتزامن من خلال منصة Intlayer.

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

## المعاملات

1. **`key`**:  
   **النوع**: `DictionaryKeys`  
   مفتاح القاموس المستخدم لتحديد كتلة المحتوى المترجم. يجب تعريف هذا المفتاح في ملفات إعلان المحتوى الخاصة بك.

2. **`locale`** (اختياري):  
   **النوع**: `Locales`  
   اللغة المحددة التي تريد استهدافها. إذا تم حذفها، يستخدم الخطاف اللغة من سياق Intlayer الحالي.

3. **`isRenderEditor`** (اختياري، القيمة الافتراضية `true`):  
   **النوع**: `boolean`  
   يحدد ما إذا كان يجب أن يكون المحتوى جاهزًا للعرض مع تراكب محرر Intlayer. إذا تم تعيينه إلى `false`، ستستبعد بيانات القاموس المرجعة ميزات خاصة بالمحرر.

## القيمة المرجعة

يرجع الخطاف كائن قاموس يحتوي على محتوى مترجم يتم تحديده بواسطة `key` و `locale`. كما يتضمن متغيرًا منطقيًا `isLoading` يشير إلى ما إذا كان يتم حاليًا جلب قاموس عن بُعد.

## مثال على الاستخدام في مكون React

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const ComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("يتم تحميل المحتوى...");
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
      console.log("يتم تحميل المحتوى...");
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
      console.log("يتم تحميل المحتوى...");
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

- عند العرض الأولي، يأتي `title` و `description` من قاموس اللغة الذي تم جلبه مسبقًا أو المضمن بشكل ثابت.
- بينما تكون قيمة `isLoading` هي `true`، يتم إجراء طلب في الخلفية لجلب قاموس محدث.
- بمجرد اكتمال الجلب، يتم تحديث `title` و `description` بأحدث المحتويات، وتعود قيمة `isLoading` إلى `false`.

## التعامل مع تعريب السمات

يمكنك أيضًا استرجاع القيم المعربة لسمات HTML المختلفة (مثل `alt`، `title`، `aria-label`):

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## ملفات القاموس

يجب تعريف جميع مفاتيح المحتوى في ملفات إعلان المحتوى الخاصة بك لضمان سلامة النوع ومنع أخطاء وقت التشغيل. تتيح هذه الملفات التحقق من صحة TypeScript، مما يضمن أنك تشير دائمًا إلى المفاتيح واللغات الموجودة.

تعليمات إعداد ملفات إعلان المحتوى متوفرة [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md).

## معلومات إضافية

- **محرر Intlayer المرئي:**  
  دمج مع محرر Intlayer المرئي لإدارة وتحرير المحتوى مباشرة من واجهة المستخدم. مزيد من التفاصيل [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md).

---

**باختصار**، `useIntlayerAsync` هو هوك قوي في React مصمم لتعزيز تجربة المستخدم والحفاظ على تحديث المحتوى من خلال دمج القواميس التي تم تقديمها مسبقًا أو جلبها مسبقًا مع تحديثات القاموس غير المتزامنة. من خلال الاستفادة من `isLoading` وإعلانات المحتوى المعتمدة على TypeScript، يمكنك دمج المحتوى الديناميكي والمحلي بسلاسة في تطبيقات React الخاصة بك.

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بدء التاريخ
