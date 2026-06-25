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

## القاموس

يجب إعلان جميع مفاتيح القاموس داخل ملفات إعلان المحتوى لتعزيز أمان النوع وتجنب الأخطاء. يمكنك العثور على [تعليمات الإعداد هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

## مثال على الاستخدام في React

عرض استخدام الـ `useIntlayer` hook داخل مكون React:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

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
