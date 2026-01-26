---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق المكوّن MarkdownRenderer | react-intlayer
description: اطلع على كيفية استخدام المكوّن MarkdownRenderer لحزمة react-intlayer
keywords:
  - MarkdownRenderer
  - react
  - Intlayer
  - intlayer
  - التدويل
  - توثيق
slugs:
  - doc
  - packages
  - react-intlayer
  - MarkdownRenderer
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: إنشاء المستند
---

# توثيق المكوّن MarkdownRenderer

يعمل المكوّن `MarkdownRenderer` على عرض محتوى Markdown باستخدام مكوّنات مخصصة.

## الاستخدام

```tsx
import { MarkdownRenderer } from "react-intlayer";

const MyComponent = () => (
  <MarkdownRenderer># My Title My content</MarkdownRenderer>
);
```

## الخصائص

| الخاصية      | النوع             | الوصف                                                       |
| ------------ | ----------------- | ----------------------------------------------------------- |
| `children`   | `string`          | محتوى الـ Markdown الذي سيتم عرضه.                          |
| `components` | `Overrides`       | خريطة من المكونات المخصصة لاستخدامها لعناصر Markdown محددة. |
| `options`    | `MarkdownOptions` | خيارات إضافية لعارض Markdown.                               |
