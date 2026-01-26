---
createdAt: 2024-08-11
updatedAt: 2026-01-26
title: توثيق هوك useLocale | next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-26
    changes: تعيين القيمة الافتراضية لـ `onLocaleChange` إلى `replace`
  - version: 5.5.10
    date: 2025-06-29
    changes: بداية التاريخ
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

## المعاملات

يقبل هوك `useLocale` المعاملات التالية:

- **`onLocaleChange`**: سلسلة نصية تحدد كيفية تحديث عنوان URL عند تغيير اللغة. يمكن أن تكون `"replace"` أو `"push"` أو `"none"`.

  > لنأخذ مثالاً:
  >
  > 1. أنت في الموقع `/fr/home`
  > 2. قمت بالانتقال إلى `/fr/about`
  > 3. قمت بتغيير اللغة إلى `/es/about`
  > 4. قمت بالنقر على زر "الرجوع" في المتصفح
  >
  > سيختلف السلوك بناءً على قيمة `onLocaleChange`:
  >
  > - `"replace"` (افتراضي): يستبدل عنوان URL الحالي بعنوان URL الجديد المترجم، ويقوم بتعيين ملف تعريف الارتباط (cookie).
  >   -> زر "الرجوع" سينقلك إلى `/es/home`
  > - `"push"`: يضيف عنوان URL الجديد المترجم إلى سجل المتصفح، ويقوم بتعيين ملف تعريف الارتباط.
  >   -> زر "الرجوع" سينقلك إلى `/fr/about`
  > - `"none"`: يقوم فقط بتحديث اللغة في سياق العميل، ويقوم بتعيين ملف تعريف الارتباط، دون تغيير عنوان URL.
  >   -> زر "الرجوع" سينقلك إلى `/fr/home`
  > - `(locale) => void`: يقوم بتعيين ملف تعريف الارتباط وتشغيل دالة مخصصة سيتم استدعاؤها عند تغيير اللغة.
  >
  >   خيار `undefined` هو السلوك الافتراضي لأننا نوصي باستخدام مكون `Link` للانتقال إلى اللغة الجديدة.
  >   مثال:
  >
  >   ```tsx
  >   <Link href="/es/about" replace>
  >     حول
  >   </Link>
  >   ```

## قيم الإرجاع

- **`locale`**: اللغة الحالية كما تم تعيينها في سياق React.
- **`defaultLocale`**: اللغة الأساسية المعرفة في الإعدادات.
- **`availableLocales`**: قائمة بجميع اللغات المتاحة كما هو معرف في الإعدادات.
- **`setLocale`**: دالة لتغيير لغة التطبيق وتحديث عنوان URL وفقًا لذلك. تتولى قواعد البادئة، سواء بإضافة اللغة إلى المسار أو لا بناءً على الإعدادات. تستخدم `useRouter` من `next/navigation` لوظائف التنقل مثل `push` و `refresh`.
- **`pathWithoutLocale`**: خاصية محسوبة تُرجع المسار بدون اللغة. وهي مفيدة لمقارنة عناوين URL. على سبيل المثال، إذا كانت اللغة الحالية هي `fr`، وكان عنوان URL هو `fr/my_path`، فإن المسار بدون اللغة هو `/my_path`. تستخدم `usePathname` من `next/navigation` للحصول على المسار الحالي.

## الخاتمة

تُعد دالة `useLocale` من مكتبة `next-intlayer` أداةً أساسية لإدارة اللغات في تطبيقات Next.js. فهي تقدم نهجًا متكاملاً لتكييف تطبيقك مع لغات متعددة من خلال التعامل بسلاسة مع تخزين اللغة، وإدارة الحالة، وتعديلات عناوين URL.
