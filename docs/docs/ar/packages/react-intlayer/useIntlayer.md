---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق هوك useIntlayer | react-intlayer
description: تعرف على كيفية استخدام هوك useIntlayer لحزمة react-intlayer
keywords:
  - useIntlayer
  - dictionary
  - key
  - Intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافاسكريبت
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useIntlayer
author: aymericzip
---

# توثيق خطاف useIntlayer

يسمح خطاف `useIntlayer` بالحصول على محتوى محلي من قاموس باستخدام مفتاحه. وهو يعتمد على `useDictionary` لكنه يحقن تلقائياً نسخة محسّنة من القاموس من التصريحات المُنشأة.

## مثال على الاستخدام في React

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## موارد إضافية

- **محرر Intlayer المرئي**: لتجربة إدارة محتوى أكثر سهولة وبديهية، راجع توثيق المحرر المرئي [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md).

تستهدف هذه القسم بشكل خاص دمج الخطاف `useIntlayer` في تطبيقات React، مما يبسط عملية التعريب ويضمن تناسق المحتوى عبر اللغات المختلفة.
