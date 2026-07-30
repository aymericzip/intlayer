---
createdAt: 2026-07-30
updatedAt: 2026-07-30
title: المحتوى بناءً على الاختيار
description: تعرّف على كيفية استخدام المحتوى المستند إلى الاختيار في Intlayer لعرض محتوى ديناميكي استنادًا إلى قيمة نصية عشوائية. اتبع هذا التوثيق لتنفيذ محتوى شبيه بـ switch في مشروعك.
keywords:
  - محتوى بناءً على الاختيار
  - Select Content
  - محتوى Switch
  - ICU select
  - عرض ديناميكي
  - التوثيق
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - select
history:
  - version: 9.1.0
    date: 2026-07-30
    changes: "تم تقديم محتوى يعتمد على الاختيار"
author: aymericzip
---

# المحتوى المستند إلى الاختيار (Select) / Intlayer

## كيف يعمل Select

في Intlayer، يتم تحقيق المحتوى المستند إلى الاختيار من خلال الدالة `select` التي تقوم بتعيين قيم نصية عشوائية لمحتواها المقابل. هذا يعادل رسالة `{value, select, …}` في ICU، أو تعليمة `switch` في الكود الخاص بتطبيقك.

استخدم `select` عندما يكون المُميّز (discriminant) عبارة عن سلسلة نصية حرة: حالة (status)، خطة (plan)، منصة (platform)، أو دور (role). أما بالنسبة للمُميّزات الأخرى، يوفر Intlayer عقدًا مخصصة:

| المُميّز              | العقدة     |
| --------------------- | ---------- |
| كمية                  | `enu()`    |
| قيمة منطقية (Boolean) | `cond()`   |
| جنس                   | `gender()` |
| أي نص آخر             | `select()` |

## إعداد المحتوى المستند إلى الاختيار

لإعداد المحتوى المستند إلى الاختيار في مشروع Intlayer الخاص بك، قم بإنشاء وحدة محتوى تتضمن تعريفات الاختيار الخاصة بك. فيما يلي أمثلة بتنسيقات متعددة.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // اختياري
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "publishStatus": {
      "nodeType": "select",
      "select": {
        "draft": "This post is a draft",
        "published": "This post is live",
        "scheduled": "This post is scheduled",
        "fallback": "Unknown status", // اختياري
      },
    },
  },
}
```

> إذا لم يتم الإعلان عن `fallback`، فسيتم اعتبار المفتاح الأخير المعلن كخيار احتياطي عند عدم تطابق القيمة المقدمة مع أي حالة معلنة: نفس عقد `cond()` و `gender()`.

### سلامة الأنواع (Type Safety)

يتم استنتاج المعامل المقبول من الحالات المعلنة:

- بدون `fallback`، سيتم قبول الحالات المعلنة فقط: يعتبر الخطأ الإملائي خطأ في النوع (type error).
- مع `fallback`، يُقبل أي نص (حيث يغطي الخيار الاحتياطي القيم غير المتطابقة) بينما تستمر الحالات المعلنة في توفير ميزة الإكمال التلقائي (autocompletion).

## لماذا لا تستخدم كائنًا بسيطًا؟

من المغري أن تقوم بتعريف كائن بسيط والوصول إليه باستخدام القيمة أثناء وقت التشغيل:

```tsx
// ❌ لا تفعل هذا
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

يحلل مترجم (compiler) Intlayer كود المصدر الخاص بك لاستبعاد المحتوى غير المستخدم ولضغط (minify) المفاتيح المتبقية. لا يمكن تقييم الوصول الديناميكي المحسوب (`obj[expr]`) بشكل ثابت، لذلك سيتم تحديد الفرع بأكمله كأنه غامض (opaque): سيبقى في الحزمة (bundle) وتبقى مفاتيحه بدون ضغط.

عند استخدام `select()`، يتم معالجة الحالة داخل استدعاء دالة بدلاً من الوصول كخاصية. يرى المترجم ذلك كوصول ثابت لحقل واحد، ويحسّن العقدة تمامًا كما يفعل مع `enu()`، `cond()` أو `gender()`:

```tsx
// ✅ افعل هذا
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## استخدام المحتوى المستند إلى الاختيار

<Tabs group="framework">
  <Tab label="React" value="react">

لاستخدام المحتوى المستند إلى الاختيار داخل مكون React، قم باستيراد واستخدام الخطاف `useIntlayer` من حزمة `react-intlayer`. يقوم هذا الخطاف بجلب المحتوى للمفتاح المحدد ويسمح لك بتمرير قيمة لاختيار الإخراج المناسب.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* المخرجات: This post is a draft */
          publishStatus("draft")
        }
      </p>
      <p>
        {
          /* المخرجات: This post is live */
          publishStatus("published")
        }
      </p>
      <p>
        {
          /* المخرجات: Unknown status */
          publishStatus("Archived")
        }
      </p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

لاستخدام المحتوى المستند إلى الاختيار داخل مكونات العميل (client components) في Next.js، قم بجلبه باستخدام الخطاف `useIntlayer`. إليك مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Vue" value="vue">

لاستخدام المحتوى المستند إلى الاختيار داخل مكونات Vue، قم بجلبه باستخدام الخطاف `useIntlayer`. إليك مثال:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { publishStatus } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ publishStatus("draft") }}</p>
    <p>{{ publishStatus("published") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

لاستخدام المحتوى المستند إلى الاختيار داخل مكونات Svelte، قم بجلبه باستخدام الخطاف `useIntlayer`. يتم الوصول إلى store باستخدام `$`. إليك مثال:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.publishStatus("draft")}</p>
  <p>{$content.publishStatus("published")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

لاستخدام المحتوى المستند إلى الاختيار داخل مكونات Preact، قم بجلبه باستخدام الخطاف `useIntlayer`. إليك مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Solid" value="solid">

لاستخدام المحتوى المستند إلى الاختيار داخل مكونات SolidJS، قم بجلبه باستخدام الخطاف `useIntlayer`. إليك مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const PostStatus: Component = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Angular" value="angular">

لاستخدام المحتوى المستند إلى الاختيار داخل مكونات Angular، قم بجلبه باستخدام الخطاف `useIntlayer`. إليك مثال:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-post-status",
  template: `
    <div>
      <p>{{ content().publishStatus("draft") }}</p>
      <p>{{ content().publishStatus("published") }}</p>
    </div>
  `,
})
export class PostStatusComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

لاستخدام المحتوى المستند إلى الاختيار في `vanilla-intlayer`، قم بجلبه باستخدام الخطاف `useIntlayer`. إليك مثال:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("status")!.textContent =
    newContent.publishStatus("draft");
});

// العرض الأولي
document.getElementById("status")!.textContent = content.publishStatus("draft");
```

  </Tab>
</Tabs>

## دمج Select مع العقد الأخرى

تحتوي كل حالة على عقدة محتوى كاملة، لذلك يمكن تركيب `select` مع `t()`، `insert()`، `md()` وغيرها:

```typescript fileName="**/*.content.ts" codeFormat="typescript"
import { insert, select, t, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: insert(
        t({
          en: "{{name}} saved a draft",
          fr: "{{name}} a enregistré un brouillon",
          ar: "حفظ {{name}} مسودة",
        })
      ),
      published: insert(
        t({
          en: "{{name}} published the post",
          fr: "{{name}} a publié l’article",
          ar: "نشر {{name}} المقال",
        })
      ),
      fallback: insert(
        t({
          en: "{{name}} updated the post",
          fr: "{{name}} a mis à jour l’article",
          ar: "قام {{name}} بتحديث المقال",
        })
      ),
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```tsx
publishStatus("draft")({ name: "Alice" }); // المخرجات: حفظ Alice مسودة
```

## الترحيل من `select` الخاص بـ ICU

الرسائل التي تستخدم معامل `select` في ICU يتم استيرادها كعقد `select`:

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

ستصبح:

```typescript
select(
  {
    draft: "draft",
    published: "published",
    fallback: "Unknown",
  },
  "publishType"
);
```

تم إعادة تسمية الحالة `other` في ICU إلى `fallback`، وهو الاسم القياسي في Intlayer لجميع الحالات غير المتطابقة. يسجل المعامل الثاني اسم المتغير الخاص بـ ICU لكي يتم إرجاع الرسالة كجملة ICU كما هي تمامًا في وقت التصدير.

> لاحظ أن الرسالة بـ `select` في ICU التي تكون حالاتها قيم جنس (`male` / `female` / `other`) ستُستورد بدلاً من ذلك كعقدة [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/gender.md).

## الموارد الإضافية

للحصول على معلومات أكثر تفصيلًا حول التكوين والاستخدام، راجع الموارد التالية:

- [توثيق واجهة سطر الأوامر (CLI) الخاصة بـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md)
- [توثيق Intlayer مع React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)
- [توثيق Intlayer مع Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md)

تقدم هذه الموارد رؤى أعمق حول كيفية إعداد واستخدام Intlayer داخل بيئات وأطر عمل متنوعة.
