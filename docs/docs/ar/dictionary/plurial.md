---
createdAt: 2026-05-04
updatedAt: 2026-05-04
title: الجمع (Plural)
description: تعرف على كيفية التصريح عن محتوى الجمع المتوافق مع اللغة (بناءً على CLDR) واستخدامه في موقعك الإلكتروني متعدد اللغات. اتبع الخطوات في هذه التوثيق عبر الإنترنت لإعداد مشروعك في بضع دقائق.
keywords:
  - الجمع
  - الجمع والتثنية
  - CLDR
  - تدويل
  - توثيق
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - plural
history:
  - version: 8.8.0
    date: 2026-05-04
    changes: "Init history"
author: aymericzip
---

# محتوى الجمع / الجمع في Intlayer

## كيف يعمل الجمع

في Intlayer، يتم تحقيق محتوى الجمع من خلال وظيفة `plural` التي تربط فئات الجمع في CLDR, `zero` و `one` و `two` و `few` و `many` و `other`, بالمحتوى المقابل لها. يتم اختيار الفئة الصحيحة تلقائيًا بناءً على اللغة النشطة وقيمة العدد، باستخدام واجهة برمجة تطبيقات [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) المدمجة في النظام الأساسي.

على عكس [`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/enumeration.md)، الذي يختار المحتوى بناءً على نطاقات رقمية تحددها بنفسك، تفوض وظيفة `plural` الاختيار لقواعد CLDR. وهذا ما يجعلها قابلة للتوسع للغات ذات قواعد الجمع المعقدة, مثل الروسية أو البولندية أو العربية أو الويلزية, دون الحاجة إلى كتابة منطق الحساب يدويًا.

## متى تستخدم `plural` مقابل `enu`

<Tabs group="framework">
  <Tab label="React" value="react">

To use plural content inside a React component, retrieve it via the `useIntlayer` hook and call it with a count. The active locale and the count are combined to pick the matching CLDR category.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use plural content in Next.js Client Components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To use plural content in Vue components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```vue fileName="**/*.vue" codeFormat="vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

defineProps<{ count: number }>();

const { totalOpenings } = useIntlayer("total_openings");
</script>

<template>
  <div>
    <p>{{ totalOpenings(count) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use plural content in Svelte components, retrieve it via the `useIntlayer` hook and call it with a count. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte" codeFormat="svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

export let count: number;

const content = useIntlayer("total_openings");
</script>

<div>
  <p>{$content.totalOpenings(count)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use plural content in Preact components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To use plural content in SolidJS components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const OpeningsComponent: Component<{ count: number }> = (props) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(props.count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use plural content in Angular components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component, Input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-openings",
  template: `
    <div>
      <p>{{ content().totalOpenings(count) }}</p>
    </div>
  `,
})
export class OpeningsComponent {
  @Input() count!: number;

  content = useIntlayer("total_openings");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use plural content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("total_openings").onChange((newContent) => {
  document.getElementById("openings")!.textContent =
    newContent.totalOpenings(5);
});

// Initial render
document.getElementById("openings")!.textContent = content.totalOpenings(5);
```

  </Tab>
</Tabs>

## إعداد محتوى الجمع

لإعداد محتوى الجمع في مشروع Intlayer الخاص بك، قم بإنشاء وحدة محتوى تستخدم مساعد `plural`. فئة `other` مطلوبة وتستخدم كبديل عندما لا تحدد اللغة فئة أكثر تحديدًا.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      ar: plural({
        zero: "لا توجد وظائف شاغرة",
        one: "وظيفة شاغرة واحدة",
        two: "وظيفتان شاغرتان",
        few: "{{count}} وظائف شاغرة",
        many: "{{count}} وظيفة شاغرة",
        other: "{{count}} وظيفة شاغرة",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "total_openings",
  "content": {
    "totalOpenings": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} opening",
            "other": "{{count}} openings"
          }
        },
        "ar": {
          "nodeType": "plural",
          "plural": {
            "zero": "لا توجد وظائف شاغرة",
            "one": "وظيفة شاغرة واحدة",
            "two": "وظيفتان شاغرتان",
            "few": "{{count}} وظائف شاغرة",
            "many": "{{count}} وظيفة شاغرة",
            "other": "{{count}} وظيفة شاغرة"
          }
        }
      }
    }
  }
}
```

> الفئات المدعومة هي `zero` و `one` و `two` و `few` و `many` و `other`. تحتاج فقط إلى التصريح عن الفئات التي تستخدمها لغتك المستهدفة, يعود Intlayer إلى `other` عندما لا تتطابق أي فئة محددة.
>
> يتم استبدال العنصر النائب `{{count}}` تلقائيًا بالعدد الذي تمرره في وقت التشغيل. يمكنك تضمين عناصر نائبة أخرى أيضًا (انظر [العناصر النائبة المخصصة](#custom-placeholders) أدناه).

## استخدام محتوى الجمع مع React Intlayer

لاستخدام محتوى الجمع داخل مكون React، قم باسترجاعه عبر خطاف `useIntlayer` واستدعه مع العدد. يتم دمج اللغة النشطة والعدد لاختيار فئة CLDR المطابقة.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      {/* باللغة الإنجليزية:                                 */}
      {/*  count=0  → "0 openings"   (other)           */}
      {/*  count=1  → "1 opening"    (one)             */}
      {/*  count=2  → "2 openings"   (other)           */}
      {/*  count=21 → "21 openings"  (other)           */}
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

يمكنك استدعاء الوظيفة المرجعة بطريقتين متكافئتين:

```tsx
totalOpenings(21); // اختصار: العدد فقط
totalOpenings({ count: 21 }); // النموذج الصريح
```

## العناصر النائبة المخصصة

يمكن أن تتضمن سلاسل الجمع عناصر نائبة أخرى غير `{{count}}`. قم بتمريرها في شكل كائن بجانب `count`:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      one: "{{name}}، لديك رسالة جديدة واحدة",
      other: "{{name}}، لديك {{count}} رسائل جديدة",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice، لديك رسالة جديدة واحدة"

summary({ count: 7, name: "Alice" });
// → "Alice، لديك 7 رسائل جديدة"
```

## فئات CLDR في لمحة

تستخدم اللغات المختلفة مجموعات فرعية مختلفة من فئات CLDR. بعض الحالات الشائعة:

| اللغة               | الفئات المستخدمة                                  |
| ------------------- | ------------------------------------------------- |
| الإنجليزية (`en`)   | `one` ، `other`                                   |
| الفرنسية (`fr`)     | `one` ، `many` ، `other`                          |
| الروسية (`ru`)      | `one` ، `few` ، `many` ، `other`                  |
| البولندية (`pl`)    | `one` ، `few` ، `many` ، `other`                  |
| العربية (`ar`)      | `zero` ، `one` ، `two` ، `few` ، `many` ، `other` |
| اليابانية / الصينية | `other` فقط                                       |

لا تحتاج إلى حفظ هذا, صرح عن الفئات التي لديك ترجمات لها، وسيعود Intlayer إلى `other` عند الحاجة.

## قيود

مقارنة بالعقد الأخرى، لا يمكن تداخل العقدة `plural` مع العقد الفرعية حتى الآن.

مثال:

صالح:

```ts
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      fr: plural({
        one: "{{count}} offre",
        other: "{{count}} offres",
      }),
    }),
```

غير صالح:

```ts
totalOpenings: plural({
  one: t({
    en: "{{count}} opening",
    fr: "{{count}} offre",
  }),
  other: t({
    en: "{{count}} openings",
    fr: "{{count}} offres",
  }),
}),
```

## موارد إضافية

لمزيد من المعلومات التفصيلية حول التكوين والاستخدام، راجع الموارد التالية:

- [توثيق التعداد (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/enumeration.md)
- [توثيق الإدراج (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/insertion.md)
- [توثيق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md)
- [توثيق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)
- [توثيق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md)

تقدم هذه الموارد مزيدًا من الرؤى حول إعداد واستخدام Intlayer عبر بيئات وأطر عمل مختلفة.
