# جلب الدالة

## إعلانات الدوال

يسمح Intlayer لك بإعلان دوال المحتوى في وحدات المحتوى الخاصة بك، والتي يمكن أن تكون إما متزامنة أو غير متزامنة. عندما يتم بناء التطبيق، يقوم Intlayer بتنفيذ هذه الدوال للحصول على نتيجة الدالة. يجب أن تكون قيمة الإرجاع كائن JSON أو قيمة بسيطة مثل سلسلة أو رقم.

إليك مثال لوظيفة متزامنة بسيطة لجلب المحتوى:

```typescript
import type { DeclarationContent } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "This is the content rendered by a function",
  },
} satisfies DeclarationContent;

export default functionContent;
```

في هذا المثال، يحتوي مفتاح `text` على دالة تعيد سلسلة. يمكن عرض هذا المحتوى في مكونات React الخاصة بك باستخدام حزم المترجم من Intlayer مثل `react-intlayer`.

## جلب الدوال غير المتزامنة

بالإضافة إلى الدوال المتزامنة، يدعم Intlayer الدوال غير المتزامنة، مما يسمح لك بجلب البيانات من مصادر خارجية أو محاكاة استرجاع البيانات باستخدام بيانات وهمية.

إليك مثال لدالة غير متزامنة تحاكي جلب البيانات من الخادم:

```typescript
import { setTimeout } from "node:timers/promises";
import type { DeclarationContent } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // انتظر 200 مللي ثانية لمحاكاة Fetch من الخادم
  return await setTimeout(200).then(
    () => "This is the content fetched from the server"
  );
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies DeclarationContent;

export default asyncFunctionContent;
```

في هذه الحالة، تقوم دالة `fakeFetch` بمحاكاة تأخير لمحاكاة وقت استجابة الخادم. يقوم Intlayer بتنفيذ الدالة غير المتزامنة ويستخدم النتيجة كمحتوى لمفتاح `text`.

## استخدام المحتوى المستند إلى الدوال في مكونات React

لاستخدام المحتوى المستند إلى الدوال في مكون React، تحتاج إلى استيراد `useIntlayer` من `react-intlayer` واستدعائه باستخدام معرف المحتوى لاسترجاع المحتوى. إليك مثال:

```javascript
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* الناتج: This is the content rendered by a function */}
      <p>{asyncFunctionContent.text}</p>
      {/* الناتج: This is the content fetched from the server */}
    </div>
  );
};

export default MyComponent;
```
