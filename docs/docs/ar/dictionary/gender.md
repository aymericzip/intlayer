---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: المحتوى القائم على النوع الاجتماعي
description: تعلّم كيفية استخدام المحتوى القائم على النوع الاجتماعي في Intlayer لعرض المحتوى ديناميكيًا بناءً على النوع. اتبع هذا التوثيق لتنفيذ المحتوى الخاص بالنوع بكفاءة في مشروعك.
keywords:
  - المحتوى القائم على النوع الاجتماعي
  - العرض الديناميكي
  - التوثيق
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - gender
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: "تقديم المحتوى المعتمد على الجنس"
author: aymericzip
---

# المحتوى القائم على النوع الاجتماعي / النوع في Intlayer

## كيف يعمل النوع الاجتماعي

في Intlayer، يتم تحقيق المحتوى القائم على النوع الاجتماعي من خلال دالة `gender`، التي تربط قيم النوع المحددة ('male'، 'female') بالمحتوى المقابل لها. تتيح لك هذه الطريقة اختيار المحتوى ديناميكيًا بناءً على النوع المعطى. عند التكامل مع React Intlayer أو Next Intlayer، يتم اختيار المحتوى المناسب تلقائيًا وفقًا للنوع المقدم أثناء وقت التشغيل.

## إعداد المحتوى القائم على النوع الاجتماعي

لإعداد المحتوى القائم على النوع الاجتماعي في مشروع Intlayer الخاص بك، قم بإنشاء وحدة محتوى تتضمن تعريفات النوع الخاصة بك. فيما يلي أمثلة بصيغ مختلفة.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "محتواي للمستخدمين الذكور",
      female: "محتواي للمستخدمين الإناث",
      fallback: "محتواي عندما لا يتم تحديد النوع", // اختياري
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "محتواي للمستخدمين الذكور",
        "female": "محتواي للمستخدمين الإناث",
        "fallback": "محتواي عندما لا يتم تحديد النوع", // اختياري
      },
    },
  },
}
```

> إذا لم يتم إعلان قيمة بديلة، فسيتم أخذ آخر مفتاح معلن كقيمة بديلة إذا لم يتم تحديد النوع أو لم يتطابق مع أي نوع معرف.

## استخدام المحتوى المعتمد على النوع مع React Intlayer

<Tabs group="framework">
  <Tab label="React" value="react">

To utilize gender-based content within a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This hook fetches the content for the specified key and allows you to pass in a gender to select the appropriate output.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: my content for male users */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Output: my content for female users */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Output: my content for male users */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Output: my content for female users */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Output: my content when gender is not specified */
          myGender("")
        }
      </p>
      <p>
        {
          /* Output: my content when gender is not specified */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To utilize gender-based content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To utilize gender-based content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myGender } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ myGender("male") }}</p>
    <p>{{ myGender("female") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To utilize gender-based content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.myGender("male")}</p>
  <p>{$content.myGender("female")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To utilize gender-based content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To utilize gender-based content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const GenderComponent: Component = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To utilize gender-based content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-gender",
  template: `
    <div>
      <p>{{ content().myGender("male") }}</p>
      <p>{{ content().myGender("female") }}</p>
    </div>
  `,
})
export class GenderComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To utilize gender-based content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("gender-male")!.textContent =
    newContent.myGender("male");
  document.getElementById("gender-female")!.textContent =
    newContent.myGender("female");
});

// Initial render
document.getElementById("gender-male")!.textContent = content.myGender("male");
document.getElementById("gender-female")!.textContent =
  content.myGender("female");
```

  </Tab>
</Tabs>

## موارد إضافية

لمزيد من المعلومات التفصيلية حول التهيئة والاستخدام، يرجى الرجوع إلى الموارد التالية:

- [توثيق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md)
- [توثيق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)
- [توثيق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md)

توفر هذه الموارد رؤى إضافية حول إعداد واستخدام Intlayer عبر بيئات وأُطُر عمل مختلفة.
