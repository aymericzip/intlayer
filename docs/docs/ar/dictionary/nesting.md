---
createdAt: 2025-02-07
updatedAt: 2026-10-08
priority: 8
title: "التداخل: إعادة استخدام المحتوى بين القواميس"
description: "أشر من قاموس إلى آخر باستخدام العقدة nest() في Intlayer لإعادة استخدام المحتوى المشترك دون تكرار الترجمات."
keywords:
  - Nesting
  - إعادة استخدام المحتوى
  - وثائق
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - nesting
author: aymericzip
---

# التعشيش / الإشارة إلى المحتوى الفرعي

## كيف يعمل التعشيش

في Intlayer، يتم تحقيق التعشيش من خلال وظيفة `nest`، التي تتيح لك الإشارة إلى وإعادة استخدام المحتوى من قاموس آخر. بدلاً من تكرار المحتوى، يمكنك الإشارة إلى وحدة محتوى موجودة باستخدام مفتاحها.

## إعداد التداخل

لإعداد التداخل في مشروع Intlayer الخاص بك، تقوم أولاً بتعريف المحتوى الأساسي الذي تريد إعادة استخدامه. ثم، في وحدة محتوى منفصلة، تستخدم دالة `nest` لاستيراد هذا المحتوى.

### القاموس الأساسي

فيما يلي مثال على قاموس أساسي للتداخل في قاموس آخر:

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

الآن، قم بإنشاء وحدة محتوى أخرى تستخدم دالة `nest` للإشارة إلى المحتوى أعلاه. يمكنك الإشارة إلى المحتوى بالكامل أو قيمة محددة متداخلة:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // الإشارة إلى القاموس بالكامل:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // الإشارة إلى قيمة متداخلة محددة:
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
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

كمعامل ثانٍ، يمكنك تحديد المسار إلى قيمة متداخلة داخل هذا المحتوى. عندما لا يتم توفير مسار، يتم إرجاع محتوى القاموس المرجعي بالكامل.

## إعداد التعشيش

<Tabs group="framework">
  <Tab label="React" value="react">

لاستخدام المحتوى المتداخل في مكون React، استفد من خطاف `useIntlayer` من حزمة `react-intlayer`. يسترجع هذا الخطاف المحتوى المناسب بناءً على المفتاح المحدد. فيما يلي مثال على كيفية استخدامه:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

لاستخدام المحتوى المتداخل في مكونات عميل Next.js، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

لاستخدام المحتوى المتداخل في مكونات Vue، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { fullNestedContent, partialNestedContent } = useIntlayer(
  "key_of_my_second_dictionary"
);
</script>

<template>
  <div>
    <p>Full Nested Content: {{ JSON.stringify(fullNestedContent) }}</p>
    <p>Partial Nested Value: {{ partialNestedContent }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

لاستخدام المحتوى المتداخل في مكونات Svelte، استرجعه عبر خطاف `useIntlayer`. يتم الوصول إلى المخزن باستخدام `---
createdAt: 2025-02-07
updatedAt: 2026-09-27
priority: 8
title: "التداخل: إعادة استخدام المحتوى بين القواميس"
description: "أشر من قاموس إلى آخر باستخدام العقدة nest() في Intlayer لإعادة استخدام المحتوى المشترك دون تكرار الترجمات."
keywords:

- Nesting
- إعادة استخدام المحتوى
- وثائق
- Intlayer
- Next.js
- JavaScript
- React
  slugs:
- doc
- concept
- content
- nesting
  author: aymericzip

---

# التعشيش / الإشارة إلى المحتوى الفرعي

## كيف يعمل التعشيش

في Intlayer، يتم تحقيق التعشيش من خلال وظيفة `nest`، التي تتيح لك الإشارة إلى وإعادة استخدام المحتوى من قاموس آخر. بدلاً من تكرار المحتوى، يمكنك الإشارة إلى وحدة محتوى موجودة باستخدام مفتاحها.

## إعداد التداخل

لإعداد التداخل في مشروع Intlayer الخاص بك، تقوم أولاً بتعريف المحتوى الأساسي الذي تريد إعادة استخدامه. ثم، في وحدة محتوى منفصلة، تستخدم دالة `nest` لاستيراد هذا المحتوى.

### القاموس الأساسي

فيما يلي مثال على قاموس أساسي للتداخل في قاموس آخر:

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

الآن، قم بإنشاء وحدة محتوى أخرى تستخدم دالة `nest` للإشارة إلى المحتوى أعلاه. يمكنك الإشارة إلى المحتوى بالكامل أو قيمة محددة متداخلة:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // الإشارة إلى القاموس بالكامل:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // الإشارة إلى قيمة متداخلة محددة:
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
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

كمعامل ثانٍ، يمكنك تحديد المسار إلى قيمة متداخلة داخل هذا المحتوى. عندما لا يتم توفير مسار، يتم إرجاع محتوى القاموس المرجعي بالكامل.

## إعداد التعشيش

<Tabs group="framework">
  <Tab label="React" value="react">

لاستخدام المحتوى المتداخل في مكون React، استفد من خطاف `useIntlayer` من حزمة `react-intlayer`. يسترجع هذا الخطاف المحتوى المناسب بناءً على المفتاح المحدد. فيما يلي مثال على كيفية استخدامه:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

لاستخدام المحتوى المتداخل في مكونات عميل Next.js، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

لاستخدام المحتوى المتداخل في مكونات Vue، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { fullNestedContent, partialNestedContent } = useIntlayer(
  "key_of_my_second_dictionary"
);
</script>

<template>
  <div>
    <p>Full Nested Content: {{ JSON.stringify(fullNestedContent) }}</p>
    <p>Partial Nested Value: {{ partialNestedContent }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

. فيما يلي مثال:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("key_of_my_second_dictionary");
</script>

<div>
  <p>Full Nested Content: {JSON.stringify($content.fullNestedContent)}</p>
  <p>Partial Nested Value: {$content.partialNestedContent}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

لاستخدام المحتوى المتداخل في مكونات Preact، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

لاستخدام المحتوى المتداخل في مكونات SolidJS، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const NestComponent: Component = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

لاستخدام المحتوى المتداخل في مكونات Angular، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-nest",
  template: `
    <div>
      <p>
        Full Nested Content: {{ JSON.stringify(content().fullNestedContent) }}
      </p>
      <p>Partial Nested Value: {{ content().partialNestedContent }}</p>
    </div>
  `,
})
export class NestComponent {
  content = useIntlayer("key_of_my_second_dictionary");
  JSON = JSON;
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

لاستخدام المحتوى المتداخل مع `vanilla-intlayer`، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("key_of_my_second_dictionary").onChange(
  (newContent) => {
    document.getElementById("nested")!.textContent =
      newContent.partialNestedContent;
  }
);

// Initial render
document.getElementById("nested")!.textContent = content.partialNestedContent;
```

  </Tab>
</Tabs>

## موارد إضافية

لمزيد من المعلومات التفصيلية حول التكوين والاستخدام، راجع الموارد التالية:

- [وثائق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md)
- [وثائق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)
- [وثائق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md)

توفر هذه الموارد مزيدًا من الأفكار حول إعداد واستخدام Intlayer في بيئات مختلفة ومع أطر عمل متنوعة.
