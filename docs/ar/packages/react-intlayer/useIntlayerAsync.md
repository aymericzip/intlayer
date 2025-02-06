# React Integration: `useIntlayerAsync` Hook Documentation

The `useIntlayerAsync` hook يوسع من وظيفة `useIntlayer` من خلال عدم العودة فقط القواميس المدفوعة مسبقًا ولكن أيضًا تحميل التحديثات بشكل غير متزامن، مما يجعلها مثالية للتطبيقات التي تقوم بتحديث محتواها المحلي بشكل متكرر بعد التقديم الأولي.

## Overview

- **تحميل القاموس غير المتزامن:**  
  عند التركيب الأولي، يعود `useIntlayerAsync` أولاً بأي قاموس محلي تم تحميله مسبقًا أو تم تجميعه بشكل ثابت (تمامًا كما يفعل `useIntlayer`) ثم يقوم بتحميلMerge لأي قواميس بعيدة جديدة متاحة.
- **إدارة حالة التقدم:**  
  يوفر الخطاف أيضًا حالة `isLoading`، تشير إلى متى يتم تحميل قاموس بعيد. وهذا يسمح للمطورين بعرض مؤشرات تحميل أو حالات هيكلية لتجربة مستخدم أكثر سلاسة.

## Environment Setup

تقدم Intlayer نظام إدارة محتوى بدون رأس (CSM) يمكّن غير المطورين من إدارة وتحديث محتوى التطبيق بسلاسة. من خلال استخدام لوحة معلومات Intlayer البديهية، يمكن لفريقك تعديل النصوص المحلية والصور والموارد الأخرى دون تعديل الكود مباشرة. وهذا يبسط عملية إدارة المحتوى، ويعزز التعاون، ويضمن إمكانية إجراء التحديثات بسرعة وسهولة.

للبدء مع Intlayer:

1. **قم بالتسجيل والحصول على رمز الوصول** على [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
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

3. **ادفع قاموس locale جديد إلى Intlayer:**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   يقوم هذا الأمر بتحميل قواميس المحتوى الأولية الخاصة بك، مما يجعلها متاحة للتحميل والتحرير غير المتزامن من خلال منصة Intlayer.

## Importing `useIntlayerAsync` in React

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

## Parameters

1. **`key`**:  
   **Type**: `DictionaryKeys`  
   مفتاح القاموس المستخدم لتحديد كتلة المحتوى المحلية. يجب تحديد هذا المفتاح في ملفات إعلان المحتوى الخاصة بك.

2. **`locale`** (اختياري):  
   **Type**: `Locales`  
   locale المحدد الذي تريد استهدافه. إذا تم التخلي عن ذلك، يستخدم الخطاف locale من سياق Intlayer الحالي.

3. **`isRenderEditor`** (اختياري، الافتراضي إلى `true`):  
   **Type**: `boolean`  
   يحدد ما إذا كان يجب أن يكون المحتوى جاهزًا للرسم باستخدام تراكب محرر Intlayer. إذا تم تعيينه على `false`، ستستثني بيانات القاموس المعادة الميزات الخاصة بالمحرر.

## Return Value

يعيد الخطاف كائن قاموس يحتوي على محتوى محلي مشفر حسب `key` و `locale`. كما يتضمن قيمة منطقية `isLoading` تشير إلى ما إذا كان يتم حاليًا جلب قاموس بعيد.

## Example Usage in a React Component

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const ComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("المحتوى يتم تحميله...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>جار التحميل…</h1>
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
      console.log("المحتوى يتم تحميله...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>جار التحميل…</h1>
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
      console.log("المحتوى يتم تحميله...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>جار التحميل…</h1>
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

**Key Points:**

- عند التقديم الأولي، يأتي `title` و `description` من القاموس المحلي المدفوع مسبقًا أو المدعوم ثابتًا.
- بينما `isLoading` هو `true`، يتم جلب قاموس محدث في الخلفية.
- بمجرد اكتمال الطلب، يتم تحديث `title` و `description` بأحدث المحتوى، و `isLoading` يعود إلى `false`.

## Handling Attribute Localization

يمكنك أيضًا استرجاع قيم السمات المترجمة لقيم HTML المختلفة (مثل `alt`، `title`، `aria-label`):

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Dictionary Files

يجب تعريف جميع مفاتيح المحتوى في ملفات إعلان المحتوى الخاصة بك من أجل سلامة النوع ومنع أخطاء وقت التشغيل. تتيح هذه الملفات تحقق TypeScript، مما يضمن لك دائمًا الإشارة إلى المفاتيح واللغات الموجودة.

التعليمات الخاصة بإعداد ملفات إعلان المحتوى متاحة [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md).

## Further Information

- **محرر Intlayer المرئي:**  
  قم بالتكامل مع محرر Intlayer المرئي لإدارة وتحرير المحتوى مباشرة من واجهة المستخدم. المزيد من التفاصيل [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor.md).

---

**In summary**, `useIntlayerAsync` هو خطاف React قوي مصمم لتعزيز تجربة المستخدم والحفاظ على تحديث المحتوى من خلال دمج القواميس المدفوعة مسبقًا أو المدفوعة مسبقًا مع تحديثات القاموس غير المتزامنة. من خلال الاستفادة من `isLoading` وDeclarations المحتوى المستندة إلى TypeScript، يمكنك دمج المحتوى الديناميكي والمحلي بسهولة في تطبيقات React الخاصة بك.
