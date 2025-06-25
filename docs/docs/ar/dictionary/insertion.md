---
docName: dictionary__insertion
url: https://intlayer.org/doc/concept/content/insertion
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/insertion.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: إدراج
description: تعلم كيفية إعلان واستخدام عناصر نائبة للإدراج في المحتوى الخاص بك. يوجهك هذا الدليل عبر الخطوات لإدراج القيم ديناميكيًا داخل هياكل المحتوى المحددة مسبقًا.
keywords:
  - إدراج
  - محتوى ديناميكي
  - العناصر النائبة
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# إدراج المحتوى / الإدراج في Intlayer

## كيف يعمل الإدراج

في Intlayer، يتم تحقيق إدراج المحتوى من خلال وظيفة `insertion`، التي تحدد الحقول النائبة في النص (مثل `{{name}}` أو `{{age}}`) والتي يمكن استبدالها ديناميكيًا أثناء وقت التشغيل. يتيح هذا النهج إنشاء نصوص مرنة تشبه القوالب حيث يتم تحديد أجزاء معينة من المحتوى بواسطة البيانات التي يتم تمريرها من تطبيقك.

عند التكامل مع React Intlayer أو Next Intlayer، يمكنك ببساطة تقديم كائن البيانات الذي يحتوي على القيم لكل حقل نائب، وسيقوم Intlayer تلقائيًا بعرض المحتوى مع استبدال الحقول النائبة.

## إعداد محتوى الإدراج

لإعداد محتوى الإدراج في مشروع Intlayer الخاص بك، قم بإنشاء وحدة محتوى تتضمن تعريفات الإدراج الخاصة بك. فيما يلي أمثلة بتنسيقات مختلفة.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("مرحبًا، اسمي {{name}} وعمري {{age}} عامًا!"),
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
    myInsertion: insert("مرحبًا، اسمي {{name}} وعمري {{age}} عامًا!"),
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
    myInsertion: insert("مرحبًا، اسمي {{name}} وعمري {{age}} عامًا!"),
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
      "insertion": "مرحبًا، اسمي {{name}} وعمري {{age}} عامًا!",
    },
  },
}
```

## استخدام محتوى الإدراج مع React Intlayer

لاستخدام محتوى الإدراج داخل مكون React، قم باستيراد واستخدام الخطاف `useIntlayer` من حزمة `react-intlayer`. يسترد هذا الخطاف المحتوى للمفتاح المحدد ويسمح لك بتمرير كائن يطابق كل حقل نائب في المحتوى بالقيمة التي ترغب في عرضها.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* النتيجة: "مرحبًا، اسمي John وعمري 30 عامًا!" */
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
          /* النتيجة: "مرحبًا، اسمي John وعمري 30 عامًا!" */
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
          /* النتيجة: "مرحبًا، اسمي John وعمري 30 عامًا!" */
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

## موارد إضافية

لمزيد من المعلومات التفصيلية حول التكوين والاستخدام، راجع الموارد التالية:

- [وثائق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md)
- [وثائق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)
- [وثائق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md)

تقدم هذه الموارد مزيدًا من الأفكار حول إعداد واستخدام Intlayer عبر بيئات وأطر عمل مختلفة.
