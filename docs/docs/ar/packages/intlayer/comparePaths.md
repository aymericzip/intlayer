---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: وثائق دالة comparePaths | intlayer
description: تعرف على كيفية استخدام دالة comparePaths لحزمة intlayer
keywords:
  - comparePaths
  - normalizePath
  - الرابط النشط
  - التنقل
  - Intlayer
  - intlayer
  - التدويل
  - الوثائق
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
    changes: "الوثائق الأولية"
author: aymericzip
---

# الوثائق: دالة `comparePaths` في `intlayer`

## الوصف

تقوم دالة `comparePaths` بمقارنة عنواني URL أو مسارين للتحقق من تطابقهما مع تجاهل جزء اللغة (locale)، البروتوكول/المضيف، سلسلة الاستعلام (query string)، التجزئة (hash)، والشرطات المائلة الختامية (trailing slashes). إنها الطريقة الموصى بها لتحديد ما إذا كان رابط التنقل يشير إلى الصفحة الحالية — على سبيل المثال لتمييز الرابط النشط — دون الحاجة إلى كتابة منطق التسوية (normalization logic) الخاص بك والذي يكون عرضة للأخطاء.

داخليًا، تعيد استخدام [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getPathWithoutLocale.md) لإزالة جزء اللغة، لذلك فهي تحترم وضع التوجيه واللغات التي قمت بتكوينها.

تُصدّر الحزمة أيضًا الأداة المساعدة الأساسية [`normalizePath`](#normalizepath)، والتي تُرجع المسار القياسي المستقل عن اللغة والمُستخدم في المقارنة.

**الميزات الرئيسية:**

- مقارنة مستقلة عن اللغة (`/ar/about` يتطابق مع `/about`)
- تعمل مع كل من عناوين URL المطلقة والمسارات النسبية
- تتجاهل سلسلة الاستعلام، التجزئة، والشرطات المائلة الختامية
- تتسامح مع غياب الشرطات المائلة البادئة والقيم الفارغة (يتم تسويتها إلى `/`)
- خفيفة الوزن — مبنية على `getPathWithoutLocale`

---

## توقيع الدالة

```typescript
comparePaths(
  pathname: string,  // مطلوب
  href: string,      // مطلوب
  locales?: Locales[] // اختياري
): boolean

normalizePath(
  inputUrl: string,   // مطلوب
  locales?: Locales[] // اختياري
): string
```

---

## المعلمات (Parameters)

- `pathname: string`
  - **الوصف**: سلسلة URL الأولى أو المسار الأول للمقارنة (عادةً ما يكون المسار الحالي).
  - **النوع**: `string`
  - **مطلوب**: نعم

- `href: string`
  - **الوصف**: سلسلة URL الثانية أو المسار الثاني للمقارنة (عادةً ما يكون `href` لرابط التنقل).
  - **النوع**: `string`
  - **مطلوب**: نعم

- `locales: Locales[]`
  - **الوصف**: مصفوفة اختيارية للغات المدعومة. يتم افتراض اللغات المكوّنة في المشروع.
  - **النوع**: `Locales[]`
  - **مطلوب**: لا (اختياري)

### الإرجاع (Returns)

- **النوع**: `boolean`
- **الوصف**: `true` عندما يتم حل كلا الإدخالين إلى نفس المسار المستقل عن اللغة، وإلا `false`.

---

## مثال على الاستخدام

### الاستخدام الأساسي

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

### عناوين URL المطلقة والنسبية

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### تمييز رابط التنقل النشط

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

تقوم `normalizePath` بإرجاع المسار القياسي والمستقل عن اللغة الذي تستخدمه `comparePaths`. تقوم بإزالة جزء اللغة، البروتوكول/المضيف، سلسلة الاستعلام، والتجزئة، وتضمن وجود شرطة مائلة بادئة واحدة، وتزيل أي شرطات مائلة ختامية (باستثناء الجذر)، وتستخدم `/` كقيمة احتياطية للقيم الفارغة.

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

## دوال ذات صلة

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getPathWithoutLocale.md): يزيل جزء اللغة من عنوان URL أو مسار.
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getPrefix.md): يحدد بادئة URL للغة معينة.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocalizedUrl.md): يولد عنوان URL محلي للغة معينة.

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
