# Nesting / مرجعية المحتوى الفرعي

## كيف يعمل التعشيش

في Intlayer، يتم تحقيق التعشيش من خلال وظيفة `nest`، التي تتيح لك الرجوع إلى وإعادة استخدام المحتوى من قاموس آخر. بدلاً من تكرار المحتوى، يمكنك الإشارة إلى وحدة محتوى موجودة باستخدام مفتاحها.

## إعداد التعشيش

لإعداد التعشيش في مشروع Intlayer الخاص بك، تقوم أولاً بتعريف المحتوى الأساسي الذي ترغب في إعادة استخدامه. ثم، في وحدة محتوى منفصلة، تستخدم وظيفة `nest` لاستيراد هذا المحتوى.

### القاموس الأساسي

فيما يلي مثال على قاموس أساسي بمحتوى معشش:

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary } from "intlayer";

const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
} satisfies Dictionary;

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

module.exports = firstDictionary;
```

```json fileName="firstDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_first_dictionary",
  "content": {
    "content": "content",
    "subContent": {
      "contentNumber": 0,
      "contentString": "string"
    }
  }
}
```

### المرجعية مع Nest

الآن، قم بإنشاء وحدة محتوى أخرى تستخدم وظيفة `nest` للإشارة إلى المحتوى أعلاه. يمكنك الرجوع إلى المحتوى بالكامل أو قيمة فرعية معينة:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat="typescript"
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // يشار إلى القاموس بأكمله:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // الإشارة إلى قيمة فرعية معينة:
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.mjs" contentDeclarationFormat="esm"
import { nest } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { nest } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

module.exports = myNestingContent;
```

```json fileName="secondDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_second_dictionary",
  "content": {
    "fullNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary"
      }
    },
    "partialNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary",
        "path": "subContent.contentNumber"
      }
    }
  }
}
```

كمُعامل ثانٍ، يمكنك تحديد مسار للقيمة الفرعية داخل هذا المحتوى. إذا لم يتم توفير مسار، يتم إرجاع المحتوى بالكامل للقاموس المُشار إليه.

## استخدام التعشيش مع React Intlayer

لاستخدام المحتوى المعشش في مكوّن React، استخدم تعليمة `useIntlayer` من حزمة `react-intlayer`. تسترجع هذه التعليمة المحتوى الصحيح بناءً على المفتاح المحدد. فيما يلي مثال على كيفية استخدامه:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        محتوى معشش بالكامل: {JSON.stringify(fullNestedContent)}
        {/* النتيجة: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        قيمة فرعية معششة: {partialNestedContent}
        {/* النتيجة: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        محتوى معشش بالكامل: {JSON.stringify(fullNestedContent)}
        {/* النتيجة: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        قيمة فرعية معششة: {partialNestedContent}
        {/* النتيجة: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.cjx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        محتوى معشش بالكامل: {JSON.stringify(fullNestedContent)}
        {/* النتيجة: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        قيمة فرعية معششة: {partialNestedContent}
        {/* النتيجة: 0 */}
      </p>
    </div>
  );
};

module.exports = NestComponent;
```

## الموارد الإضافية

لمزيد من المعلومات التفصيلية حول الإعداد والاستخدام، يُرجى الرجوع إلى الموارد التالية:

- [توثيق CLI لـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md)
- [توثيق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md)
- [توثيق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md)

توفر هذه الموارد رؤى إضافية حول إعداد واستخدام Intlayer في بيئات مختلفة ومع أطر عمل متنوعة.
