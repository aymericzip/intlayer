---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: comparePaths فنکشن دستاویزات | intlayer
description: جانیں کہ intlayer پیکیج کے لیے comparePaths فنکشن کا استعمال کیسے کریں
keywords:
  - comparePaths
  - normalizePath
  - فعال لنک (active link)
  - نیویگیشن
  - Intlayer
  - intlayer
  - بین الاقوامیت (Internationalization)
  - دستاویزات
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "ابتدائی دستاویزات"
author: aymericzip
---

# دستاویزات: `intlayer` میں `comparePaths` فنکشن

## تفصیل

`comparePaths` فنکشن لوکیل (locale) سیگمنٹ، پروٹوکول/ہوسٹ، استفسار کی تار (query string)، ہیش اور ٹریلنگ سلیش (trailing slashes) کو نظرانداز کرتے ہوئے دو یو آر ایل (URLs) یا راستوں کی برابری کا موازنہ کرتا ہے۔ یہ اس بات کا تعین کرنے کا تجویز کردہ طریقہ ہے کہ آیا کوئی نیویگیشن لنک موجودہ صفحے کی طرف اشارہ کر رہا ہے — مثال کے طور پر فعال لنک کو اجاگر کرنے کے لیے — اپنا خود کا (غلطی کا شکار) معمول کی منطق (normalization logic) لکھے بغیر۔

اندرونی طور پر یہ لوکیل سیگمنٹ کو ہٹانے کے لیے [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/packages/intlayer/getPathWithoutLocale.md) کو دوبارہ استعمال کرتا ہے، اس طرح یہ آپ کے تشکیل شدہ روٹنگ موڈ اور لوکیلز کا احترام کرتا ہے۔

پیکیج ایک بنیادی [`normalizePath`](#normalizepath) مددگار (helper) کو بھی برآمد کرتا ہے، جو موازنہ کے لیے استعمال ہونے والا کینونیکل، لوکیل سے آزاد راستہ واپس کرتا ہے۔

**کلیدی خصوصیات:**

- لوکیل سے آزاد موازنہ (`/ur/about`, `/about` سے میل کھاتا ہے)
- مطلق (absolute) URLs اور متعلقہ (relative) راستوں دونوں کے ساتھ کام کرتا ہے
- استفسار کی تار (query string)، ہیش اور ٹریلنگ سلیش کو نظر انداز کرتا ہے
- غائب معروف سلیش اور خالی اقدار کو برداشت کرتا ہے (`/` میں معمول کے مطابق)
- ہلکا پھلکا — `getPathWithoutLocale` کے اوپر بنایا گیا

---

## فنکشن سگنیچر

```typescript
comparePaths(
  pathname: string,  // ضروری
  href: string,      // ضروری
  locales?: Locales[] // اختیاری
): boolean

normalizePath(
  inputUrl: string,   // ضروری
  locales?: Locales[] // اختیاری
): string
```

---

## پیرامیٹرز

- `pathname: string`
  - **تفصیل**: موازنہ کرنے کے لیے پہلی URL سٹرنگ یا راستہ (عام طور پر موجودہ راستہ)۔
  - **قسم**: `string`
  - **ضروری**: ہاں

- `href: string`
  - **تفصیل**: موازنہ کرنے کے لیے دوسری URL سٹرنگ یا راستہ (عام طور پر نیویگیشن لنک کا `href`)۔
  - **قسم**: `string`
  - **ضروری**: ہاں

- `locales: Locales[]`
  - **تفصیل**: حمایت یافتہ لوکیلز کا اختیاری مجموعہ (array)۔ پہلے سے طے شدہ طور پر پروجیکٹ میں تشکیل شدہ لوکیلز کو لیتا ہے۔
  - **قسم**: `Locales[]`
  - **ضروری**: نہیں (اختیاری)

### واپسی (Returns)

- **قسم**: `boolean`
- **تفصیل**: `true` جب دونوں ان پٹ ایک ہی لوکیل سے آزاد راستے پر حل ہوتے ہیں، بصورت دیگر `false`۔

---

## استعمال کی مثال

### بنیادی استعمال

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### مطلق اور رشتہ دار URLs

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### فعال نیویگیشن لنک کو اجاگر کرنا

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

---

## normalizePath

`normalizePath` وہ کینونیکل، لوکیل سے آزاد راستہ واپس کرتا ہے جو `comparePaths` کے ذریعہ استعمال ہوتا ہے۔ یہ لوکیل سیگمنٹ، پروٹوکول/ہوسٹ، استفسار کی تار اور ہیش کو ہٹا دیتا ہے، ایک واحد معروف سلیش کو یقینی بناتا ہے، کسی بھی ٹریلنگ سلیش کو ہٹاتا ہے (روٹ کے سوا) اور خالی اقدار کے لیے `/` پر واپس آجاتا ہے۔

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

---

## متعلقہ فنکشنز

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/packages/intlayer/getPathWithoutLocale.md): کسی URL یا راستے سے لوکیل سیگمنٹ کو ہٹاتا ہے۔
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/packages/intlayer/getPrefix.md): کسی دیئے گئے لوکیل کے لیے URL سابقہ (prefix) کا تعین کرتا ہے۔
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/packages/intlayer/getLocalizedUrl.md): ایک مخصوص لوکیل کے لیے مقامی (localized) URL تیار کرتا ہے۔

---

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```
