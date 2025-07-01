---
docName: package__intlayer__getHTMLTextDir
url: https://intlayer.org/doc/packages/intlayer/getHTMLTextDir
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getHTMLTextDir.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق دالة getHTMLTextDir | intlayer
description: تعرف على كيفية استخدام دالة getHTMLTextDir لحزمة intlayer
keywords:
  - getHTMLTextDir
  - الترجمة
  - Intlayer
  - intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافاسكريبت
  - React
---

# التوثيق: دالة `getHTMLTextDir` في `intlayer`

## الوصف

تحدد دالة `getHTMLTextDir` اتجاه النص (`ltr`، `rtl`، أو `auto`) بناءً على اللغة المقدمة. تم تصميمها لمساعدة المطورين في تعيين خاصية `dir` في HTML لضمان عرض النص بشكل صحيح.

## المعاملات

- `locale?: Locales`

  - **الوصف**: سلسلة اللغة (مثل `Locales.ENGLISH`، `Locales.ARABIC`) المستخدمة لتحديد اتجاه النص.
  - **النوع**: `Locales` (اختياري)

## القيم المرجعة

- **النوع**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **الوصف**: اتجاه النص المقابل للغة:
  - `'ltr'` للغات التي تُكتب من اليسار إلى اليمين.
  - `'rtl'` للغات التي تُكتب من اليمين إلى اليسار.
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

- **عدم توفير اللغة:**

  - تُعيد الدالة `'auto'` عندما تكون قيمة `locale` غير معرفة.

- **اللغة غير المعروفة:**
  - بالنسبة للغات غير المعروفة، تقوم الدالة بافتراض القيمة `'auto'`.

## الاستخدام في المكونات:

يمكن استخدام دالة `getHTMLTextDir` لتعيين خاصية `dir` بشكل ديناميكي في مستند HTML لضمان عرض النص بشكل صحيح بناءً على اللغة.

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

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بدء التاريخ
