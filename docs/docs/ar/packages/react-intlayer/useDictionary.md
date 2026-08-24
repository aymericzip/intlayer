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

# توثيق Hook useDictionary

يسمح hook `useDictionary` بمعالجة كائن يشبه القاموس (يحتوي على مفاتيح ومحتوى) والتعامل مع الترجمات والتعددات وما إلى ذلك بداخله. بخلاف `useIntlayer`، الذي تم تصميمه للعمل مع إعلانات القاموس المُنشأة، فإن `useDictionary` أكثر مرونة ويمكن استخدامه مع أي كائن يتبع هيكل القاموس.

## مثال على الاستخدام في React

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

## نصائح إضافية

- **سلامة النوع**: استخدم دائمًا `Dictionary` لتعريف القواميس الخاصة بك لضمان سلامة النوع.
- **تحديثات التوطين**: عند تحديث المحتوى، تأكد من اتساق جميع اللغات لتجنب فقدان الترجمات.

تركز هذه الوثائق على تكامل الخطاف `useDictionary`، مما يوفر نهجًا مبسطًا لإدارة المحتوى المحلي دون الاعتماد على وظائف المحرر المرئي.
