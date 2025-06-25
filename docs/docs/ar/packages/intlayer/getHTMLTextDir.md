---
docName: package__intlayer__getHTMLTextDir
url: https://intlayer.org/doc/packages/intlayer/getHTMLTextDir
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: وثائق دالة getHTMLTextDir | intlayer
description: انظر كيف تستخدم دالة getHTMLTextDir لحزمة intlayer
keywords:
  - getHTMLTextDir
  - ترجمة
  - Intlayer
  - intlayer
  - الدولية
  - المستندات
  - Next.js
  - JavaScript
  - React
---

# التوثيق: وظيفة `getHTMLTextDir` في `intlayer`

## الوصف

تحدد وظيفة `getHTMLTextDir` اتجاه النص (`ltr`, `rtl`, أو `auto`) بناءً على اللغة المحددة. تم تصميمها لمساعدة المطورين على تعيين خاصية `dir` في HTML لعرض النصوص بشكل صحيح.

## المعاملات

- `locale?: Locales`

  - **الوصف**: سلسلة اللغة (مثلًا، `Locales.ENGLISH`, `Locales.ARABIC`) المستخدمة لتحديد اتجاه النص.
  - **النوع**: `Locales` (اختياري)

## القيم المعادة

- **النوع**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **الوصف**: اتجاه النص الذي يتوافق مع اللغة:
  - `'ltr'` للغات التي تكتب من اليسار إلى اليمين.
  - `'rtl'` للغات التي تكتب من اليمين إلى اليسار.
  - `'auto'` إذا لم يتم التعرف على اللغة.

## مثال على الاستخدام

### تحديد اتجاه النص

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // الناتج: "ltr"
getHTMLTextDir(Locales.FRENCH); // الناتج: "ltr"
getHTMLTextDir(Locales.ARABIC); // الناتج: "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // الناتج: "ltr"
getHTMLTextDir(Locales.FRENCH); // الناتج: "ltr"
getHTMLTextDir(Locales.ARABIC); // الناتج: "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

getHTMLTextDir(Locales.ENGLISH); // الناتج: "ltr"
getHTMLTextDir(Locales.FRENCH); // الناتج: "ltr"
getHTMLTextDir(Locales.ARABIC); // الناتج: "rtl"
```

## الحالات الخاصة

- **عدم توفير لغة:**

  - تعيد الوظيفة `'auto'` عندما تكون `locale` غير معرفة.

- **لغة غير معروفة:**
  - بالنسبة للغات غير المعروفة، تقوم الوظيفة بالافتراض إلى `'auto'`.

## الاستخدام في المكونات:

يمكن استخدام وظيفة `getHTMLTextDir` لتعيين خاصية `dir` بشكل ديناميكي في مستند HTML لعرض النصوص بشكل صحيح بناءً على اللغة.

```tsx codeFormat="typescript"
import type { FC } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

في المثال أعلاه، يتم تعيين خاصية `dir` بشكل ديناميكي بناءً على اللغة.
