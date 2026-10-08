---
createdAt: 2025-02-07
updatedAt: 2026-10-08
priority: 8
title: "المحتوى الشرطي في Intlayer"
description: "اعرض محتوى مختلفًا حسب شرط منطقي باستخدام العقدة cond() في Intlayer، يُعرَّف مرة واحدة ويُحسم عند العرض."
keywords:
  - محتوى شرطي
  - التصيير الديناميكي
  - وثائق
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - condition
author: aymericzip
---

# المحتوى الشرطي / الشرط في Intlayer

## كيف يعمل الشرط

في Intlayer، يتم تحقيق المحتوى الشرطي من خلال وظيفة `cond`، التي تربط شروطًا محددة (عادةً قيم منطقية) بالمحتوى المقابل لها. يتيح لك هذا النهج اختيار المحتوى ديناميكيًا بناءً على شرط معين. عند دمجه مع React Intlayer أو Next Intlayer، يتم اختيار المحتوى المناسب تلقائيًا وفقًا للشرط المقدم أثناء وقت التشغيل.

## إعداد المحتوى الشرطي

لإعداد المحتوى الشرطي في مشروع Intlayer الخاص بك، قم بإنشاء وحدة محتوى تتضمن تعريفاتك الشرطية. فيما يلي أمثلة بتنسيقات مختلفة.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "المحتوى الخاص بي عندما يكون الشرط صحيحًا",
      false: "المحتوى الخاص بي عندما يكون الشرط خاطئًا",
      fallback: "المحتوى الخاص بي عندما يفشل الشرط", // اختياري
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "المحتوى الخاص بي عندما يكون الشرط صحيحًا",
        "false": "المحتوى الخاص بي عندما يكون الشرط خاطئًا",
        "fallback": "المحتوى الخاص بي عندما يفشل الشرط", // اختياري
      },
    },
  },
}
```

> إذا لم يتم إعلان fallback، سيتم أخذ المفتاح الأخير المعلن كـ fallback إذا لم يتم التحقق من الشرط.

## استخدام المحتوى الشرطي مع React Intlayer

<Tabs group="framework">
  <Tab label="React" value="react">

لاستخدام المحتوى الشرطي داخل مكون React، استورد واستخدم خطاف `useIntlayer` من حزمة `react-intlayer`. يجلب هذا الخطاف المحتوى للمفتاح المحدد ويسمح لك بتمرير شرط لتحديد المخرجات المناسبة.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: my content when it's true */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Output: my content when it's false */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Output: my content when the condition fails */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Output: my content when the condition fails */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

لاستخدام المحتوى الشرطي في مكونات عميل Next.js، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

لاستخدام المحتوى الشرطي في مكونات Vue، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myCondition } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ myCondition(true) }}</p>
    <p>{{ myCondition(false) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

لاستخدام المحتوى الشرطي في مكونات Svelte، استرجعه عبر خطاف `useIntlayer`. يتم الوصول إلى المخزن باستخدام `---
createdAt: 2025-02-07
updatedAt: 2026-09-27
priority: 8
title: "المحتوى الشرطي في Intlayer"
description: "اعرض محتوى مختلفًا حسب شرط منطقي باستخدام العقدة cond() في Intlayer، يُعرَّف مرة واحدة ويُحسم عند العرض."
keywords:

- محتوى شرطي
- التصيير الديناميكي
- وثائق
- Intlayer
- Next.js
- JavaScript
- React
  slugs:
- doc
- concept
- content
- condition
  author: aymericzip

---

# المحتوى الشرطي / الشرط في Intlayer

## كيف يعمل الشرط

في Intlayer، يتم تحقيق المحتوى الشرطي من خلال وظيفة `cond`، التي تربط شروطًا محددة (عادةً قيم منطقية) بالمحتوى المقابل لها. يتيح لك هذا النهج اختيار المحتوى ديناميكيًا بناءً على شرط معين. عند دمجه مع React Intlayer أو Next Intlayer، يتم اختيار المحتوى المناسب تلقائيًا وفقًا للشرط المقدم أثناء وقت التشغيل.

## إعداد المحتوى الشرطي

لإعداد المحتوى الشرطي في مشروع Intlayer الخاص بك، قم بإنشاء وحدة محتوى تتضمن تعريفاتك الشرطية. فيما يلي أمثلة بتنسيقات مختلفة.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "المحتوى الخاص بي عندما يكون الشرط صحيحًا",
      false: "المحتوى الخاص بي عندما يكون الشرط خاطئًا",
      fallback: "المحتوى الخاص بي عندما يفشل الشرط", // اختياري
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "المحتوى الخاص بي عندما يكون الشرط صحيحًا",
        "false": "المحتوى الخاص بي عندما يكون الشرط خاطئًا",
        "fallback": "المحتوى الخاص بي عندما يفشل الشرط", // اختياري
      },
    },
  },
}
```

> إذا لم يتم إعلان fallback، سيتم أخذ المفتاح الأخير المعلن كـ fallback إذا لم يتم التحقق من الشرط.

## استخدام المحتوى الشرطي مع React Intlayer

<Tabs group="framework">
  <Tab label="React" value="react">

لاستخدام المحتوى الشرطي داخل مكون React، استورد واستخدم خطاف `useIntlayer` من حزمة `react-intlayer`. يجلب هذا الخطاف المحتوى للمفتاح المحدد ويسمح لك بتمرير شرط لتحديد المخرجات المناسبة.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: my content when it's true */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Output: my content when it's false */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Output: my content when the condition fails */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Output: my content when the condition fails */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

لاستخدام المحتوى الشرطي في مكونات عميل Next.js، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

لاستخدام المحتوى الشرطي في مكونات Vue، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myCondition } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ myCondition(true) }}</p>
    <p>{{ myCondition(false) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

. فيما يلي مثال:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.myCondition(true)}</p>
  <p>{$content.myCondition(false)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

لاستخدام المحتوى الشرطي في مكونات Preact، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

لاستخدام المحتوى الشرطي في مكونات SolidJS، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const ConditionalComponent: Component = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

لاستخدام المحتوى الشرطي في مكونات Angular، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-conditional",
  template: `
    <div>
      <p>{{ content().myCondition(true) }}</p>
      <p>{{ content().myCondition(false) }}</p>
    </div>
  `,
})
export class ConditionalComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

لاستخدام المحتوى الشرطي مع `vanilla-intlayer`، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("true-content")!.textContent =
    newContent.myCondition(true);
  document.getElementById("false-content")!.textContent =
    newContent.myCondition(false);
});

// Initial render
document.getElementById("true-content")!.textContent =
  content.myCondition(true);
document.getElementById("false-content")!.textContent =
  content.myCondition(false);
```

  </Tab>
</Tabs>

## موارد إضافية

لمزيد من المعلومات التفصيلية حول الإعداد والاستخدام، راجع الموارد التالية:

- [وثائق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md)
- [وثائق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)
- [وثائق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md)

تقدم هذه الموارد مزيدًا من الأفكار حول إعداد واستخدام Intlayer عبر بيئات وأطر عمل مختلفة.
