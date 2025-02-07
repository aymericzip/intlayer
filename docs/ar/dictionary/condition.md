# Conditional Content / شروط المحتوى في Intlayer

## كيفية عمل الشروط

في Intlayer، يتم تحقيق المحتوى الشرطي من خلال وظيفة `cond`، والتي تربط الشروط المحددة (عادةً القيم البوليانية) بالمحتوى المقابل لها. يتيح هذا النهج لك تحديد المحتوى بناءً على شرط معين بشكل ديناميكي. عند التكامل مع React Intlayer أو Next Intlayer، يتم اختيار المحتوى المناسب تلقائيًا وفقًا للشرط المقدم أثناء وقت التشغيل.

## إعداد شروط المحتوى

لإعداد شروط المحتوى في مشروع Intlayer الخاص بك، قم بإنشاء وحدة محتوى تتضمن التعريفات الشرطية. أدناه أمثلة بتنسيقات مختلفة.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "محتواي عندما يكون الشرط صحيحاً",
      false: "محتواي عندما يكون الشرط خاطئاً",
      fallback: "محتواي عندما يفشل الشرط", // اختياري
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
      true: "محتواي عندما يكون الشرط صحيحاً",
      false: "محتواي عندما يكون الشرط خاطئاً",
      fallback: "محتواي عندما يفشل الشرط", // اختياري
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
      true: "محتواي عندما يكون الشرط صحيحاً",
      false: "محتواي عندما يكون الشرط خاطئاً",
      fallback: "محتواي عندما يفشل الشرط", // اختياري
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
        "true": "محتواي عندما يكون الشرط صحيحاً",
        "false": "محتواي عندما يكون الشرط خاطئاً",
        "fallback": "محتواي عندما يفشل الشرط", // اختياري
      },
    },
  },
}
```

> إذا لم يتم تحديد خيار بديل، سيتم استخدام المفتاح الأخير المُعلن كبديل إذا لم يتم تحقيق الشرط.

## استخدام شروط المحتوى مع React Intlayer

لاستخدام شروط المحتوى داخل مكون React، قم باستيراد واستخدام الوظيفة `useIntlayer` من حزمة `react-intlayer`. هذه الوظيفة تقوم بجلب المحتوى للمفتاح المحدد وتتيح لك تمرير شرط لتحديد الإخراج المناسب.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* الإخراج: محتواي عندما يكون الشرط صحيحاً */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* الإخراج: محتواي عندما يكون الشرط خاطئاً */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* الإخراج: محتواي عندما يفشل الشرط */
          myCondition("")
        }
      </p>
      <p>
        {
          /* الإخراج: محتواي عندما يفشل الشرط */
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
          /* الإخراج: محتواي عندما يكون الشرط صحيحاً */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* الإخراج: محتواي عندما يكون الشرط خاطئاً */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* الإخراج: محتواي عندما يفشل الشرط */
          myCondition("")
        }
      </p>
      <p>
        {
          /* الإخراج: محتواي عندما يفشل الشرط */
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
          /* الإخراج: محتواي عندما يكون الشرط صحيحاً */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* الإخراج: محتواي عندما يكون الشرط خاطئاً */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* الإخراج: محتواي عندما يفشل الشرط */
          myCondition("")
        }
      </p>
      <p>
        {
          /* الإخراج: محتواي عندما يفشل الشرط */
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

- [توثيق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md)
- [توثيق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md)
- [توثيق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md)

توفر هذه الموارد رؤى إضافية حول الإعداد واستخدام Intlayer عبر بيئات وأطر عمل مختلفة.
