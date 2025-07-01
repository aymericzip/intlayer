---
docName: dictionary__condition
url: https://intlayer.org/doc/concept/content/condition
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/condition.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: محتوى شرطي
description: تعلم كيفية استخدام المحتوى الشرطي في Intlayer لعرض المحتوى ديناميكيًا بناءً على شروط محددة. اتبع هذه الوثيقة لتنفيذ الشروط بكفاءة في مشروعك.
keywords:
  - محتوى شرطي
  - التصيير الديناميكي
  - وثائق
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# المحتوى الشرطي / الشرط في Intlayer

## كيف يعمل الشرط

في Intlayer، يتم تحقيق المحتوى الشرطي من خلال وظيفة `cond`، التي تربط شروطًا محددة (عادةً قيم منطقية) بالمحتوى المقابل لها. يتيح لك هذا النهج اختيار المحتوى ديناميكيًا بناءً على شرط معين. عند دمجه مع React Intlayer أو Next Intlayer، يتم اختيار المحتوى المناسب تلقائيًا وفقًا للشرط المقدم أثناء وقت التشغيل.

## إعداد المحتوى الشرطي

لإعداد المحتوى الشرطي في مشروع Intlayer الخاص بك، قم بإنشاء وحدة محتوى تتضمن تعريفاتك الشرطية. فيما يلي أمثلة بتنسيقات مختلفة.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "المحتوى الخاص بي عندما يكون الشرط صحيحًا",
      false: "المحتوى الخاص بي عندما يكون الشرط خاطئًا",
      fallback: "المحتوى الخاص بي عندما يفشل الشرط", // اختياري
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { cond } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "المحتوى الخاص بي عندما يكون الشرط صحيحًا",
      false: "المحتوى الخاص بي عندما يكون الشرط خاطئًا",
      fallback: "المحتوى الخاص بي عندما يفشل الشرط", // اختياري
    }),
  },
};

export default myConditionalContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { cond } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "المحتوى الخاص بي عندما يكون الشرط صحيحًا",
      false: "المحتوى الخاص بي عندما يكون الشرط خاطئًا",
      fallback: "المحتوى الخاص بي عندما يفشل الشرط", // اختياري
    }),
  },
};

module.exports = myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "المحتوى الخاص بي عندما يكون الشرط صحيحًا",
        "false": "المحتوى الخاص بي عندما يكون الشرط خاطئًا",
        "fallback": "المحتوى الخاص بي عندما يفشل الشرط", // اختياري
      },
    },
  },
}
```

> إذا لم يتم إعلان fallback، سيتم أخذ المفتاح الأخير المعلن كـ fallback إذا لم يتم التحقق من الشرط.

## استخدام المحتوى الشرطي مع React Intlayer

لاستخدام المحتوى الشرطي داخل مكون React، قم باستيراد واستخدام الخطاف `useIntlayer` من حزمة `react-intlayer`. يقوم هذا الخطاف بجلب المحتوى للمفتاح المحدد ويسمح لك بتمرير شرط لاختيار الإخراج المناسب.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* الإخراج: المحتوى الخاص بي عندما يكون الشرط صحيحًا */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* الإخراج: المحتوى الخاص بي عندما يكون الشرط خاطئًا */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* الإخراج: المحتوى الخاص بي عندما يفشل الشرط */
          myCondition("")
        }
      </p>
      <p>
        {
          /* الإخراج: المحتوى الخاص بي عندما يفشل الشرط */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* الإخراج: المحتوى الخاص بي عندما يكون الشرط صحيحًا */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* الإخراج: المحتوى الخاص بي عندما يكون الشرط خاطئًا */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* الإخراج: المحتوى الخاص بي عندما يفشل الشرط */
          myCondition("")
        }
      </p>
      <p>
        {
          /* الإخراج: المحتوى الخاص بي عندما يفشل الشرط */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* الإخراج: المحتوى الخاص بي عندما يكون الشرط صحيحًا */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* الإخراج: المحتوى الخاص بي عندما يكون الشرط خاطئًا */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* الإخراج: المحتوى الخاص بي عندما يفشل الشرط */
          myCondition("")
        }
      </p>
      <p>
        {
          /* الإخراج: المحتوى الخاص بي عندما يفشل الشرط */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

module.exports = ConditionalComponent;
```

## موارد إضافية

لمزيد من المعلومات التفصيلية حول الإعداد والاستخدام، راجع الموارد التالية:

- [وثائق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md)
- [وثائق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)
- [وثائق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md)

تقدم هذه الموارد مزيدًا من الأفكار حول إعداد واستخدام Intlayer عبر بيئات وأطر عمل مختلفة.
