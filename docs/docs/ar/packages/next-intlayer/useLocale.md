---
docName: package__next-intlayer__useLocale
url: https://intlayer.org/doc/packages/next-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق هوك useLocale | next-intlayer
description: تعرف على كيفية استخدام هوك useLocale لحزمة next-intlayer
keywords:
  - useLocale
  - القاموس
  - المفتاح
  - Intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافا سكريبت
  - React
---

# تكامل Next.js: توثيق هوك `useLocale` لحزمة `next-intlayer`

تقدم هذه القسم توثيقًا مفصلًا لهوك `useLocale` المصمم خصيصًا لتطبيقات Next.js ضمن مكتبة `next-intlayer`. تم تصميمه للتعامل مع تغييرات اللغة والتوجيه بكفاءة.

## استيراد `useLocale` في Next.js

لاستخدام هوك `useLocale` في تطبيق Next.js الخاص بك، قم باستيراده كما هو موضح أدناه:

```javascript
import { useLocale } from "next-intlayer"; // يستخدم لإدارة اللغات والتوجيه في Next.js
```

## الاستخدام

إليك كيفية تنفيذ هوك `useLocale` داخل مكون Next.js:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>اللغة الحالية: {locale}</h1>
      <p>اللغة الافتراضية: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>اللغة الحالية: {locale}</h1>
      <p>اللغة الافتراضية: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>اللغة الحالية: {locale}</h1>
      <p>اللغة الافتراضية: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## المعاملات وقيم الإرجاع

عند استدعاء الـ `useLocale` هوك، فإنه يعيد كائن يحتوي على الخصائص التالية:

- **`locale`**: اللغة الحالية كما تم تعيينها في سياق React.
- **`defaultLocale`**: اللغة الأساسية المعرفة في الإعدادات.
- **`availableLocales`**: قائمة بجميع اللغات المتاحة كما هو معرف في الإعدادات.
- **`setLocale`**: دالة لتغيير لغة التطبيق وتحديث عنوان URL وفقًا لذلك. تتولى قواعد البادئة، سواء بإضافة اللغة إلى المسار أو لا بناءً على الإعدادات. تستخدم `useRouter` من `next/navigation` لوظائف التنقل مثل `push` و `refresh`.
- **`pathWithoutLocale`**: خاصية محسوبة تُرجع المسار بدون اللغة. وهي مفيدة لمقارنة عناوين URL. على سبيل المثال، إذا كانت اللغة الحالية هي `fr`، وكان عنوان URL هو `fr/my_path`، فإن المسار بدون اللغة هو `/my_path`. تستخدم `usePathname` من `next/navigation` للحصول على المسار الحالي.

## الخاتمة

تُعد دالة `useLocale` من مكتبة `next-intlayer` أداةً أساسية لإدارة اللغات في تطبيقات Next.js. فهي تقدم نهجًا متكاملاً لتكييف تطبيقك مع لغات متعددة من خلال التعامل بسلاسة مع تخزين اللغة، وإدارة الحالة، وتعديلات عناوين URL.

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ
