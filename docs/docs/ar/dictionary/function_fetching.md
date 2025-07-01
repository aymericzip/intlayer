---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: جلب الدوال
description: اكتشف كيفية إعلان واستخدام جلب الدوال في موقعك متعدد اللغات. اتبع الخطوات في هذا التوثيق عبر الإنترنت لإعداد مشروعك في دقائق قليلة.
keywords:
  - جلب الدوال
  - التدويل
  - التوثيق
  - Intlayer
  - Next.js
  - جافاسكريبت
  - React
slugs:
  - doc
  - concept
  - content
  - function-fetching
---

# جلب الدوال

تسمح Intlayer لك بإعلان دوال المحتوى في وحدات المحتوى الخاصة بك، والتي يمكن أن تكون متزامنة أو غير متزامنة. عند بناء التطبيق، تقوم Intlayer بتنفيذ هذه الدوال للحصول على نتيجة الدالة. يجب أن تكون القيمة المرجعة كائن JSON أو قيمة بسيطة مثل نص أو رقم.

> تحذير: جلب الدوال غير متاح حالياً في إعلان محتوى JSON وملفات إعلانات المحتوى البعيدة.

## إعلانات الدوال

إليك مثال على دالة متزامنة بسيطة تقوم بجلب المحتوى:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "This is the content rendered by a function",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
// تعريف محتوى الدالة
const functionContent = {
  key: "function_content",
  content: {
    text: () => "هذا هو المحتوى الذي تم عرضه بواسطة دالة",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
// تعريف محتوى الدالة
const functionContent = {
  key: "function_content",
  content: {
    text: () => "هذا هو المحتوى الذي تم عرضه بواسطة دالة",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "هذا هو المحتوى الذي تم عرضه بواسطة دالة"
  }
}
```

في هذا المثال، يحتوي المفتاح `text` على دالة تُرجع سلسلة نصية. يمكن عرض هذا المحتوى في مكونات React الخاصة بك باستخدام حزم المفسر الخاصة بـ Intlayer مثل `react-intlayer`.

## جلب الدالة غير المتزامنة

بالإضافة إلى الدوال المتزامنة، يدعم Intlayer الدوال غير المتزامنة، مما يتيح لك جلب البيانات من مصادر خارجية أو محاكاة استرجاع البيانات باستخدام بيانات وهمية.

فيما يلي مثال على دالة غير متزامنة تحاكي جلب بيانات من الخادم:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // الانتظار لمدة 200 مللي ثانية لمحاكاة جلب البيانات من الخادم
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
  // الانتظار لمدة 200 مللي ثانية لمحاكاة جلب البيانات من الخادم
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
  // الانتظار لمدة 200 مللي ثانية لمحاكاة جلب البيانات من الخادم
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
لا توجد طريقة لجلب المحتوى من ملف JSON، استخدم ملف .ts أو .js بدلاً من ذلك
```

في هذه الحالة، تقوم دالة `fakeFetch` بمحاكاة تأخير لتقليد وقت استجابة الخادم. يقوم Intlayer بتنفيذ الدالة غير المتزامنة ويستخدم النتيجة كمحتوى للمفتاح `text`.

## استخدام المحتوى المعتمد على الدوال في مكونات React

لاستخدام المحتوى المعتمد على الدوال في مكون React، تحتاج إلى استيراد `useIntlayer` من `react-intlayer` واستدعاؤه مع معرف المحتوى لاسترجاع المحتوى. إليك مثالاً:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* المخرجات: هذا هو المحتوى الذي تم عرضه بواسطة دالة */}
      <p>{asyncFunctionContent.text}</p>
      {/* المخرجات: هذا هو المحتوى الذي تم جلبه من الخادم */}
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
      {/* المخرجات: هذا هو المحتوى الذي تم عرضه بواسطة دالة */}
      <p>{asyncFunctionContent.text}</p>
      {/* المخرجات: هذا هو المحتوى الذي تم جلبه من الخادم */}
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
      {/* المخرجات: هذا هو المحتوى الذي تم عرضه بواسطة دالة */}
      <p>{asyncFunctionContent.text}</p>
      {/* المخرجات: هذا هو المحتوى الذي تم جلبه من الخادم */}
    </div>
  );
};

module.exports = MyComponent;
```

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية السجل
