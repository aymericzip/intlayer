---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: الإدراج
description: تعلّم كيفية إعلان واستخدام عناصر الإدراج النائبة في المحتوى الخاص بك. يوجهك هذا التوثيق خلال خطوات إدخال القيم ديناميكيًا ضمن هياكل المحتوى المعرفة مسبقًا.
keywords:
  - الإدراج
  - المحتوى الديناميكي
  - العناصر النائبة
  - Intlayer
  - Next.js
  - جافا سكريبت
  - React
slugs:
  - doc
  - concept
  - content
  - insertion
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: بداية التاريخ
---

# محتوى الإدراج / الإدراج في Intlayer

## كيف يعمل الإدراج

في Intlayer، يتم تحقيق محتوى الإدراج من خلال دالة `insertion`، التي تحدد حقول العناصر النائبة في النص (مثل `{{name}}` أو `{{age}}`) والتي يمكن استبدالها ديناميكيًا أثناء وقت التشغيل. تتيح لك هذه الطريقة إنشاء سلاسل نصية مرنة تشبه القوالب حيث يتم تحديد أجزاء معينة من المحتوى بواسطة البيانات التي يتم تمريرها من تطبيقك.

عند التكامل مع React Intlayer أو Next Intlayer، يمكنك ببساطة توفير كائن البيانات الذي يحتوي على القيم لكل عنصر نائب، وسيقوم Intlayer تلقائيًا بعرض المحتوى مع استبدال العناصر النائبة.

## إعداد محتوى الإدراج

لإعداد محتوى الإدراج في مشروع Intlayer الخاص بك، أنشئ وحدة محتوى تتضمن تعريفات الإدراج الخاصة بك. فيما يلي أمثلة بصيغ مختلفة.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("مرحبًا، اسمي {{name}} وعمري {{age}} سنة!"),
  },
} satisfies Dictionary;

export default myInsertionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { insert } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("مرحبًا، اسمي {{name}} وعمري {{age}} سنة!"),
  },
};

export default myInsertionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { insert } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("مرحبًا، اسمي {{name}} وعمري {{age}} سنة!"),
  },
};

module.exports = myInsertionContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myInsertion": {
      "nodeType": "insertion",
      "insertion": "مرحبًا، اسمي {{name}} وعمري {{age}} سنة!",
    },
  },
}
```

## استخدام محتوى الإدراج مع React Intlayer

لاستخدام محتوى الإدراج داخل مكون React، قم باستيراد واستخدام الخطاف `useIntlayer` من حزمة `react-intlayer`. يقوم هذا الخطاف باسترجاع المحتوى للمفتاح المحدد ويسمح لك بتمرير كائن يربط كل عنصر نائب في المحتوى بالقيمة التي ترغب في عرضها.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* الإخراج: "مرحبًا، اسمي جون وعمري 30 سنة!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* يمكنك إعادة استخدام نفس الإدراج بقيم مختلفة */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* الإخراج: "مرحبًا، اسمي جون وعمري 30 سنة!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* يمكنك إعادة استخدام نفس الإدراج بقيم مختلفة */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* الإخراج: "مرحبًا، اسمي جون وعمري 30 سنة!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* يمكنك إعادة استخدام نفس الإدراج بقيم مختلفة */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## الموارد الإضافية

لمزيد من المعلومات التفصيلية حول التكوين والاستخدام، يرجى الرجوع إلى الموارد التالية:

- [توثيق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md)
- [توثيق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)
- [توثيق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md)

تقدم هذه الموارد رؤى إضافية حول إعداد واستخدام Intlayer عبر بيئات وأُطُر عمل مختلفة.
