---
docName: dictionary__function_fetching
url: https://intlayer.org/doc/concept/content/function-fetching
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/function_fetching.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: استرجاع الوظيفة
description: اكتشف كيفية إعلان واستخدام استرجاع الوظيفة في موقعك متعدد اللغات. اتبع الخطوات في هذه الوثائق الإلكترونية لإعداد مشروعك في دقائق.
keywords:
  - استرجاع الوظيفة
  - دولي
  - التوثيق
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# جلب الوظائف

يسمح Intlayer لك بإعلان وظائف المحتوى في وحدات المحتوى الخاصة بك، والتي يمكن أن تكون متزامنة أو غير متزامنة. عند بناء التطبيق، يقوم Intlayer بتنفيذ هذه الوظائف للحصول على نتيجة الوظيفة. يجب أن تكون القيمة المرجعة كائن JSON أو قيمة بسيطة مثل سلسلة نصية أو رقم.

> تحذير: جلب الوظائف غير متاح حاليًا في إعلان محتوى JSON وملفات إعلانات المحتوى البعيدة.

## إعلانات الوظائف

إليك مثال على وظيفة متزامنة بسيطة لجلب المحتوى:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "هذا هو المحتوى الذي يتم عرضه بواسطة وظيفة",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "هذا هو المحتوى الذي يتم عرضه بواسطة وظيفة",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "هذا هو المحتوى الذي يتم عرضه بواسطة وظيفة",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "هذا هو المحتوى الذي يتم عرضه بواسطة وظيفة"
  }
}
```

في هذا المثال، يحتوي المفتاح `text` على وظيفة تُرجع سلسلة نصية. يمكن عرض هذا المحتوى في مكونات React الخاصة بك باستخدام حزم المفسر الخاصة بـ Intlayer مثل `react-intlayer`.

## جلب الوظائف غير المتزامنة

بالإضافة إلى الوظائف المتزامنة، يدعم Intlayer الوظائف غير المتزامنة، مما يتيح لك جلب البيانات من مصادر خارجية أو محاكاة استرجاع البيانات باستخدام بيانات وهمية.

فيما يلي مثال على وظيفة غير متزامنة تحاكي جلب البيانات من الخادم:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // انتظر لمدة 200 مللي ثانية لمحاكاة الجلب من الخادم
  return await setTimeout(200).then(
    () => "هذا هو المحتوى الذي تم جلبه من الخادم"
  );
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies Dictionary;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // انتظر لمدة 200 مللي ثانية لمحاكاة الجلب من الخادم
  await setTimeout(200);
  return "هذا هو المحتوى الذي تم جلبه من الخادم";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // انتظر لمدة 200 مللي ثانية لمحاكاة الجلب من الخادم
  await setTimeout(200);
  return "هذا هو المحتوى الذي تم جلبه من الخادم";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
لا يمكن جلب المحتوى من ملف JSON، استخدم ملف .ts أو .js بدلاً من ذلك
```

في هذه الحالة، تحاكي وظيفة `fakeFetch` تأخيرًا لمحاكاة وقت استجابة الخادم. يقوم Intlayer بتنفيذ الوظيفة غير المتزامنة ويستخدم النتيجة كمحتوى للمفتاح `text`.

## استخدام المحتوى المستند إلى الوظائف في مكونات React

لاستخدام المحتوى المستند إلى الوظائف في مكون React، تحتاج إلى استيراد `useIntlayer` من `react-intlayer` واستدعائها باستخدام معرف المحتوى لاسترداد المحتوى. إليك مثال:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* الإخراج: هذا هو المحتوى الذي يتم عرضه بواسطة وظيفة */}
      <p>{asyncFunctionContent.text}</p>
      {/* الإخراج: هذا هو المحتوى الذي تم جلبه من الخادم */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* الإخراج: هذا هو المحتوى الذي يتم عرضه بواسطة وظيفة */}
      <p>{asyncFunctionContent.text}</p>
      {/* الإخراج: هذا هو المحتوى الذي تم جلبه من الخادم */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* الإخراج: هذا هو المحتوى الذي يتم عرضه بواسطة وظيفة */}
      <p>{asyncFunctionContent.text}</p>
      {/* الإخراج: هذا هو المحتوى الذي تم جلبه من الخادم */}
    </div>
  );
};

module.exports = MyComponent;
```
