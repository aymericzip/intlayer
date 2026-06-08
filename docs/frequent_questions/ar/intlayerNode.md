---
createdAt: 2026-05-07
updatedAt: 2026-05-07
title: نوع IntlayerNode. ما هو؟
description: ما هو نوع IntlayerNode؟ لماذا يتم تحويل سلسلتي النصية إلى IntlayerNode&lt;string&gt;؟
keywords:
  - مقدمة
  - ابدأ الآن
  - Intlayer
  - تطبيق
  - حزم
slugs:
  - frequent-questions
  - intlayer-node
history:
  - version: 8.9.0
    date: 2026-05-07
    changes: "بدء التوثيق"
---

# ما هو نوع IntlayerNode؟

نوع `IntlayerNode<T>` هو نوع خاص توفره حزم intlayer مثل `next-intlayer` و `react-intlayer` و `vue-intlayer` و `preact-intlayer` و `solid-intlayer` و `angular-intlayer` و `svelte-intlayer` و `lit-intlayer` و `vanilla-intlayer`.

## مثال على الاستخدام

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Preact",
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Preact"
  }
}
```

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

```tsx fileName="src/App.tsx"
import { useIntlayer } from "react-intlayer";

const AppContent = () => {
  const { title } = useIntlayer("app");

  return title; // يرجع النوع: IntlayerNode&lt;string&gt;
};
```

  </Tab>

// Todo إضافة أطر عمل أخرى كعلامات تبويب كما في docs/docs/ar/dictionary/markdown.md
</Tabs>

### لماذا يقوم Intlayer بإدراج IntlayerNode؟

يقوم Intlayer بإدراج IntlayerNode ليتمكن من عرض محددات المحرر المرئي في سياق نظام إدارة المحتوى (CMS) / المحرر المرئي.

![عرض تجريبي للمحرر المرئي](https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/visual_editor.gif?raw=true)

إن IntlayerNode عبارة عن عقدة React/Vue/Preact/Solid/Angular/Svelte/Lit/Vanilla غنية، ولكنها تتيح أيضاً الوصول إلى خصائص العقدة البدائية الأساسية.

على سبيل المثال:

```js
const content = useIntlayer("app");

// حالة السلسلة النصية (String)
content.title; // يرجع IntlayerNode&lt;string&gt;
content.title.value; // يرجع المحتوى الأساسي، هنا سلسلة نصية

content.title.toString(); // يرجع سلسلة نصية
content.title.toLowerCase(); // يرجع سلسلة نصية
String(content.title); // يرجع سلسلة نصية
content.title.toUpperCase(); // يرجع سلسلة نصية بأحرف كبيرة
content.title.replace("a", "b"); // يرجع سلسلة نصية معدلة
// ...
```

> الوصول إلى خصائص IntlayerNode سيعمل، ولكنه سيعطل القدرة على عرض المحددات في المحرر المرئي.

> يمكن لـ IntlayerNode أيضاً تغليف الأرقام، أو أنواع أخرى مثل `IntlayerNode<number>`
