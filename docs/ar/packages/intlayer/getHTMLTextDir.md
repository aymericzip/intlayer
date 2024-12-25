# الوثائق: دالة `getHTMLTextDir` في `intlayer`

## الوصف:

تحدد دالة `getHTMLTextDir` اتجاه النص (`ltr`، `rtl`، أو `auto`) بناءً على الإعدادات المحلية المقدمة. تم تصميمها لمساعدة المطورين في تعيين خاصية `dir` في HTML لضمان عرض النص بشكل صحيح.

## المعلمات:

- `locale?: Locales`

  - **الوصف**: سلسلة الإعدادات المحلية (مثل `Locales.ENGLISH`، `Locales.ARABIC`) المستخدمة لتحديد اتجاه النص.
  - **النوع**: `Locales` (اختياري)

## العائدات:

- **النوع**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **الوصف**: اتجاه النص المتوافق مع الإعدادات المحلية:
  - `'ltr'` للغات من اليسار إلى اليمين.
  - `'rtl'` للغات من اليمين إلى اليسار.
  - `'auto'` إذا كانت الإعدادات المحلية غير معروفة.

## مثال الاستخدام:

### تحديد اتجاه النص:

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

## الحالات الخاصة:

- **عدم تقديم إعداد محلي:**

  - ترجع الدالة `'auto'` عندما تكون `locale` غير معرفة.

- **إعداد محلي غير معترف به:**
  - بالنسبة للإعدادات المحلية غير المعترف بها، تقوم الدالة بالتقاعس إلى `'auto'`.

## الاستخدام في المكونات:

يمكن استخدام دالة `getHTMLTextDir` لضبط خاصية `dir` ديناميكيًا في مستند HTML لضمان عرض النص بشكل صحيح بناءً على الإعدادات المحلية.

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

في المثال أعلاه، يتم تعيين خاصية `dir` ديناميكيًا استنادًا إلى الإعدادات المحلية.
