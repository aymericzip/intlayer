---
docName: dictionary__nesting
url: https://intlayer.org/doc/concept/content/nesting
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/nesting.md
createdAt: 2025-02-7
updatedAt: 2025-06-29
title: تداخل القاموس
description: تعلم كيفية استخدام تداخل المحتوى في Intlayer لإعادة استخدام وتنظيم المحتوى متعدد اللغات بكفاءة. اتبع هذه الوثيقة لتنفيذ التداخل بسلاسة في مشروعك.
keywords:
  - Nesting
  - إعادة استخدام المحتوى
  - وثائق
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# التعشيش / الإشارة إلى المحتوى الفرعي

## كيف يعمل التعشيش

في Intlayer، يتم تحقيق التعشيش من خلال وظيفة `nest`، التي تتيح لك الإشارة إلى وإعادة استخدام المحتوى من قاموس آخر. بدلاً من تكرار المحتوى، يمكنك الإشارة إلى وحدة محتوى موجودة باستخدام مفتاحها.

## إعداد التعشيش

لإعداد التعشيش في مشروع Intlayer الخاص بك، تقوم أولاً بتعريف المحتوى الأساسي الذي ترغب في إعادة استخدامه. ثم، في وحدة محتوى منفصلة، تستخدم وظيفة `nest` لاستيراد هذا المحتوى.

### القاموس الأساسي

فيما يلي مثال على قاموس أساسي للتعشيش في قاموس آخر:

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

### الإشارة باستخدام Nest

الآن، قم بإنشاء وحدة محتوى أخرى تستخدم وظيفة `nest` للإشارة إلى المحتوى أعلاه. يمكنك الإشارة إلى المحتوى بالكامل أو إلى قيمة فرعية محددة:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat="typescript"
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // يشير إلى القاموس بالكامل:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // يشير إلى قيمة فرعية محددة:
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

كمعامل ثانٍ، يمكنك تحديد مسار إلى قيمة فرعية داخل هذا المحتوى. عندما لا يتم توفير مسار، يتم إرجاع المحتوى الكامل للقاموس المشار إليه.

## استخدام التعشيش مع React Intlayer

لاستخدام المحتوى المتعشش في مكون React، استخدم الخطاف `useIntlayer` من حزمة `react-intlayer`. يسترجع هذا الخطاف المحتوى الصحيح بناءً على المفتاح المحدد. إليك مثال على كيفية استخدامه:

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
        Full Nested Content: {JSON.stringify(fullNestedContent)}
        {/* الإخراج: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Partial Nested Value: {partialNestedContent}
        {/* الإخراج: 0 */}
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
        Full Nested Content: {JSON.stringify(fullNestedContent)}
        {/* الإخراج: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Partial Nested Value: {partialNestedContent}
        {/* الإخراج: 0 */}
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
        Full Nested Content: {JSON.stringify(fullNestedContent)}
        {/* الإخراج: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Partial Nested Value: {partialNestedContent}
        {/* الإخراج: 0 */}
      </p>
    </div>
  );
};

module.exports = NestComponent;
```

## موارد إضافية

لمزيد من المعلومات التفصيلية حول التكوين والاستخدام، راجع الموارد التالية:

- [وثائق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md)
- [وثائق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)
- [وثائق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md)

توفر هذه الموارد مزيدًا من الأفكار حول إعداد واستخدام Intlayer في بيئات مختلفة ومع أطر عمل متنوعة.
