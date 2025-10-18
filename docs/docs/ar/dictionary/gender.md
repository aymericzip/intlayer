---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: المحتوى القائم على النوع الاجتماعي
description: تعلّم كيفية استخدام المحتوى القائم على النوع الاجتماعي في Intlayer لعرض المحتوى ديناميكيًا بناءً على النوع. اتبع هذا التوثيق لتنفيذ المحتوى الخاص بالنوع بكفاءة في مشروعك.
keywords:
  - المحتوى القائم على النوع الاجتماعي
  - العرض الديناميكي
  - التوثيق
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - gender
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: تقديم المحتوى المعتمد على الجنس
---

# المحتوى القائم على النوع الاجتماعي / النوع في Intlayer

## كيف يعمل النوع الاجتماعي

في Intlayer، يتم تحقيق المحتوى القائم على النوع الاجتماعي من خلال دالة `gender`، التي تربط قيم النوع المحددة ('male'، 'female') بالمحتوى المقابل لها. تتيح لك هذه الطريقة اختيار المحتوى ديناميكيًا بناءً على النوع المعطى. عند التكامل مع React Intlayer أو Next Intlayer، يتم اختيار المحتوى المناسب تلقائيًا وفقًا للنوع المقدم أثناء وقت التشغيل.

## إعداد المحتوى القائم على النوع الاجتماعي

لإعداد المحتوى القائم على النوع الاجتماعي في مشروع Intlayer الخاص بك، قم بإنشاء وحدة محتوى تتضمن تعريفات النوع الخاصة بك. فيما يلي أمثلة بصيغ مختلفة.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "محتواي للمستخدمين الذكور",
      female: "محتواي للمستخدمين الإناث",
      fallback: "محتواي عندما لا يتم تحديد النوع", // اختياري
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { gender } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "محتواي للمستخدمين الذكور",
      female: "محتواي للمستخدمين الإناث",
      fallback: "محتواي عندما لا يتم تحديد النوع", // اختياري
    }),
  },
};

export default myGenderContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { gender } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "محتواي للمستخدمين الذكور",
      female: "محتواي للمستخدمين الإناث",
      fallback: "محتواي عندما لا يتم تحديد النوع", // اختياري
    }),
  },
};

module.exports = myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "محتواي للمستخدمين الذكور",
        "female": "محتواي للمستخدمين الإناث",
        "fallback": "محتواي عندما لا يتم تحديد النوع", // اختياري
      },
    },
  },
}
```

> إذا لم يتم إعلان قيمة بديلة، فسيتم أخذ آخر مفتاح معلن كقيمة بديلة إذا لم يتم تحديد النوع أو لم يتطابق مع أي نوع معرف.

## استخدام المحتوى المعتمد على النوع مع React Intlayer

لاستخدام المحتوى المعتمد على النوع داخل مكون React، قم باستيراد واستخدام الخطاف `useIntlayer` من حزمة `react-intlayer`. يقوم هذا الخطاف بجلب المحتوى للمفتاح المحدد ويسمح لك بتمرير النوع لاختيار المخرجات المناسبة.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* المخرجات: محتواي للمستخدمين الذكور */
          myGender("male")
        }
      </p>
      <p>
        {
          /* المخرجات: محتواي للمستخدمين الإناث */
          myGender("female")
        }
      </p>
      <p>
        {
          /* المخرجات: محتواي للمستخدمين الذكور */
          myGender("m")
        }
      </p>
      <p>
        {
          /* المخرجات: محتواي للمستخدمين الإناث */
          myGender("f")
        }
      </p>
      <p>
        {
          /* المخرجات: محتواي عندما لا يتم تحديد النوع */
          myGender("")
        }
      </p>
      <p>
        {
          /* المخرجات: محتواي عندما لا يتم تحديد النوع */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* المخرجات: محتواي للمستخدمين الذكور */
          myGender("male")
        }
      </p>
      <p>
        {
          /* المخرجات: محتواي للمستخدمين الإناث */
          myGender("female")
        }
      </p>
      <p>
        {
          /* المخرجات: محتواي للمستخدمين الذكور */
          myGender("m")
        }
      </p>
      <p>
        {
          /* المخرجات: محتواي للمستخدمين الإناث */
          myGender("f")
        }
      </p>
      <p>
        {
          /* المخرجات: محتواي عندما لا يتم تحديد النوع */
          myGender("")
        }
      </p>
      <p>
        {
          /* المخرجات: محتواي عندما لا يتم تحديد النوع */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* المخرجات: محتواي للمستخدمين الذكور */
          myGender("male")
        }
      </p>
      <p>
        {
          /* المخرجات: محتواي للمستخدمين الإناث */
          myGender("female")
        }
      </p>
      <p>
        {
          /* المخرجات: محتواي للمستخدمين الذكور */
          myGender("m")
        }
      </p>
      <p>
        {
          /* المخرجات: محتواي للمستخدمين الإناث */
          myGender("f")
        }
      </p>
      <p>
        {
          /* المخرجات: محتواي عندما لا يتم تحديد الجنس */
          myGender("")
        }
      </p>
      <p>
        {
          /* المخرجات: محتواي عندما لا يتم تحديد الجنس */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

module.exports = GenderComponent;
```

## موارد إضافية

لمزيد من المعلومات التفصيلية حول التهيئة والاستخدام، يرجى الرجوع إلى الموارد التالية:

- [توثيق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md)
- [توثيق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)
- [توثيق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md)

توفر هذه الموارد رؤى إضافية حول إعداد واستخدام Intlayer عبر بيئات وأُطُر عمل مختلفة.
