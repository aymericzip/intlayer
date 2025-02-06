# وظيفة جلب

تسمح لك Intlayer بإعلان وظائف المحتوى في وحدات المحتوى الخاصة بك، والتي يمكن أن تكون متزامنة أو غير متزامنة. عند بناء التطبيق، تقوم Intlayer بتنفيذ هذه الوظائف للحصول على نتيجة الوظيفة. يجب أن تكون قيمة الإرجاع كائن JSON أو قيمة بسيطة مثل سلسلة نصية أو رقم.

> تحذير: وظيفة الجلب غير متاحة حاليًا في إعلان محتوى JSON وملفات إعلانات المحتوى البعيد.

## إعلانات الوظيفة

إليك مثال على وظيفة جلب محتوى بسيطة متزامنة:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "هذا هو المحتوى المعروض بواسطة وظيفة",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "هذا هو المحتوى المعروض بواسطة وظيفة",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "هذا هو المحتوى المعروض بواسطة وظيفة",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "هذا هو المحتوى المعروض بواسطة وظيفة"
  }
}
```

في هذا المثال، يحتوي المفتاح `text` على وظيفة تعيد سلسلة نصية. يمكن عرض هذا المحتوى في مكونات React الخاصة بك باستخدام حزم المترجم الخاصة بـ Intlayer مثل `react-intlayer`.

## جلب الوظائف غير المتزامنة

بالإضافة إلى الوظائف المتزامنة، تدعم Intlayer الوظائف غير المتزامنة، مما يسمح لك بجلب البيانات من مصادر خارجية أو محاكاة استرجاع البيانات ببيانات وهمية.

فيما يلي مثال على وظيفة غير متزامنة تحاكي جلب من الخادم:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // انتظر 200 مللي ثانية لمحاكاة جلب من الخادم
  return await setTimeout(200).then(() => "هذا هو المحتوى المسترد من الخادم");
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
  // انتظر 200 مللي ثانية لمحاكاة جلب من الخادم
  await setTimeout(200);
  return "هذا هو المحتوى المسترد من الخادم";
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
  // انتظر 200 مللي ثانية لمحاكاة جلب من الخادم
  await setTimeout(200);
  return "هذا هو المحتوى المسترد من الخادم";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
لا يوجد طريقة لجلب المحتوى من ملف JSON، استخدم ملف .ts أو .js بدلاً من ذلك
```

في هذه الحالة، تحاكي وظيفة `fakeFetch` تأخيرًا لمحاكاة وقت استجابة الخادم. تقوم Intlayer بتنفيذ الوظيفة غير المتزامنة وتستخدم النتيجة كمحتوى لمفتاح `text`.

## استخدام المحتوى القائم على الوظائف في مكونات React

لاستخدام المحتوى القائم على الوظائف في مكون React، تحتاج إلى استيراد `useIntlayer` من `react-intlayer` واستدعائها بمعرف المحتوى لاسترداد المحتوى. إليك مثال:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* الإخراج: هذا هو المحتوى المعروض بواسطة وظيفة */}
      <p>{asyncFunctionContent.text}</p>
      {/* الإخراج: هذا هو المحتوى المسترد من الخادم */}
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
      {/* الإخراج: هذا هو المحتوى المعروض بواسطة وظيفة */}
      <p>{asyncFunctionContent.text}</p>
      {/* الإخراج: هذا هو المحتوى المسترد من الخادم */}
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
      {/* الإخراج: هذا هو المحتوى المعروض بواسطة وظيفة */}
      <p>{asyncFunctionContent.text}</p>
      {/* الإخراج: هذا هو المحتوى المسترد من الخادم */}
    </div>
  );
};

module.exports = MyComponent;
```
