---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: هوك useDictionary - توثيق React Intlayer
description: دليل كامل لاستخدام هوك useDictionary في تطبيقات React مع Intlayer لإدارة المحتوى المحلي بكفاءة بدون محرر بصري.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - localization
  - i18n
  - dictionary
  - translation
slugs:
  - doc
  - packages
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "بداية التاريخ"
author: aymericzip
---

## مثال على الاستخدام في React

فيما يلي مثال على كيفية استخدام الخطاف `useDictionary` في مكون React:

```tsx fileName="./ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## التكامل مع الخادم

إذا كنت تستخدم الخطاف `useDictionary` خارج `IntlayerProvider`، يجب توفير اللغة صراحة كمعامل عند عرض المكون:

```tsx fileName="./ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## نصائح إضافية

- **سلامة النوع**: استخدم دائمًا `Dictionary` لتعريف القواميس الخاصة بك لضمان سلامة النوع.
- **تحديثات التوطين**: عند تحديث المحتوى، تأكد من اتساق جميع اللغات لتجنب فقدان الترجمات.

تركز هذه الوثائق على تكامل الخطاف `useDictionary`، مما يوفر نهجًا مبسطًا لإدارة المحتوى المحلي دون الاعتماد على وظائف المحرر المرئي.
