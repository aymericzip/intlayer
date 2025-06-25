---
docName: package__next-intlayer__useLocale
url: https://intlayer.org/doc/packages/next-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: وثائق hook useLocale | next-intlayer
description: شاهد كيفية استخدام hook useLocale لحزمة next-intlayer
keywords:
  - useLocale
  - قاموس
  - مفتاح
  - Intlayer
  - الترجمة الدولية
  - الوثائق
  - Next.js
  - JavaScript
  - React
---

# Next.js التكامل: توثيق `useLocale` Hook لـ `next-intlayer`

يوفر هذا القسم توثيقًا مفصلًا حول `useLocale` hook المصمم لتطبيقات Next.js ضمن مكتبة `next-intlayer`. تم تصميمه للتعامل مع تغييرات اللغة والتوجيه بكفاءة.

## استيراد `useLocale` في Next.js

لاستخدام `useLocale` hook في تطبيق Next.js الخاص بك، قم باستيراده كما هو موضح أدناه:

```javascript
import { useLocale } from "next-intlayer"; // يُستخدم لإدارة اللغات والتوجيه في Next.js
```

## الاستخدام

إليك كيفية تنفيذ `useLocale` hook داخل مكون Next.js:

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

## المعلمات وقيم الإرجاع

عند استدعاء `useLocale` hook، فإنه يُرجع كائنًا يحتوي على الخصائص التالية:

- **`locale`**: اللغة الحالية كما تم تعيينها في سياق React.
- **`defaultLocale`**: اللغة الأساسية المحددة في التكوين.
- **`availableLocales`**: قائمة بجميع اللغات المتاحة كما تم تعريفها في التكوين.
- **`setLocale`**: وظيفة لتغيير لغة التطبيق وتحديث عنوان URL وفقًا لذلك. تتعامل مع قواعد الإضافة، سواء لإضافة اللغة إلى المسار أم لا بناءً على التكوين. تستخدم `useRouter` من `next/navigation` لوظائف التوجيه مثل `push` و `refresh`.
- **`pathWithoutLocale`**: خاصية محسوبة تُرجع المسار بدون اللغة. وهي مفيدة لمقارنة عناوين URL. على سبيل المثال، إذا كانت اللغة الحالية هي `fr`، والعنوان `fr/my_path`، فإن المسار بدون اللغة هو `/my_path`. تستخدم `usePathname` من `next/navigation` للحصول على المسار الحالي.

## الخاتمة

يُعد `useLocale` hook من `next-intlayer` أداة أساسية لإدارة اللغات في تطبيقات Next.js. يوفر نهجًا متكاملًا لتكييف تطبيقك مع لغات متعددة من خلال التعامل مع تخزين اللغة، وإدارة الحالة، وتعديلات عناوين URL بسلاسة.
