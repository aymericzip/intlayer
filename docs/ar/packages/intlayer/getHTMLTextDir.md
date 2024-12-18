# Documentation: `getHTMLTextDir` Function in `intlayer`

## Description:

تحدد دالة `getHTMLTextDir` اتجاه النص (`ltr`، `rtl`، أو `auto`) بناءً على اللغة المقدمة. تم تصميمها لمساعدة المطورين على تعيين سمة `dir` في HTML لضمان عرض النص بشكل صحيح.

## Parameters:

- `locale?: Locales`

  - **Description**: سلسلة اللغة (على سبيل المثال، `Locales.ENGLISH`، `Locales.ARABIC`) المستخدمة لتحديد اتجاه النص.
  - **Type**: `Locales` (اختياري)

## Returns:

- **Type**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Description**: اتجاه النص المقابل للغة:
  - `'ltr'` للغات التي تكتب من اليسار إلى اليمين.
  - `'rtl'` للغات التي تكتب من اليمين إلى اليسار.
  - `'auto'` إذا لم يتم التعرف على اللغة.

## Example Usage:

### Determining Text Direction:

```typescript
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Output: "ltr"
getHTMLTextDir(Locales.FRENCH); // Output: "ltr"
getHTMLTextDir(Locales.ARABIC); // Output: "rtl"
```

## Edge Cases:

- **No Locale Provided:**

  - ترجع الدالة `'auto'` عندما تكون `locale` غير محددة.

- **Unrecognized Locale:**
  - بالنسبة للغات غير المعترف بها، تقوم الدالة بالتقيد بـ `'auto'`.

## Usage in Components:

يمكن استخدام دالة `getHTMLTextDir` لتعيين سمة `dir` ديناميكيًا في وثيقة HTML لضمان عرض النص بشكل صحيح بناءً على اللغة.

```tsx
import { getHTMLTextDir } from "intlayer";

export const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

في المثال أعلاه، يتم تعيين سمة `dir` ديناميكيًا بناءً على اللغة.
