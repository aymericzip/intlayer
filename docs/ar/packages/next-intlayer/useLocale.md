# Next.js Integration: `useLocale` Hook Documentation for `next-intlayer`

هذا القسم يقدم وثائق مفصلة حول `useLocale` hook المخصصة لتطبيقات Next.js ضمن مكتبة `next-intlayer`. تم تصميمه للتعامل مع تغييرات اللغة والتوجيه بكفاءة.

## استيراد `useLocale` في Next.js

لاستخدام `useLocale` hook في تطبيق Next.js الخاص بك، استورده كما هو موضح أدناه:

```javascript
import { useLocale } from "next-intlayer"; // مُستخدم لإدارة اللغات والتوجيه في Next.js
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

## المعلمات و القيم العائدة

عند استدعاء `useLocale` hook، فإنه يعيد كائن يحتوي على الخصائص التالية:

- **`locale`**: اللغة الحالية كما هو محدد في سياق React.
- **`defaultLocale`**: اللغة الرئيسية المعرفة في التكوين.
- **`availableLocales`**: قائمة بجميع اللغات المتاحة كما هو محدد في التكوين.
- **`setLocale`**: دالة لتغيير لغة التطبيق وتحديث عنوان URL وفقًا لذلك. إنها تعتني بقواعد البادئة، سواء لإضافة اللغة إلى المسار أم لا استنادًا إلى التكوين. تستخدم `useRouter` من `next/navigation` لوظائف التوجيه مثل `push` و `refresh`.
- **`pathWithoutLocale`**: خاصية محسوبة تعيد المسار بدون اللغة. إنها مفيدة لمقارنة عناوين URL. على سبيل المثال، إذا كانت اللغة الحالية هي `fr`، وعنوان url هو `fr/my_path`، فإن المسار بدون اللغة هو `/my_path`. تستخدم `usePathname` من `next/navigation` للحصول على المسار الحالي.

## الخلاصة

`useLocale` hook من `next-intlayer` هي أداة حاسمة لإدارة اللغات في تطبيقات Next.js. إنها تقدم نهجًا متكاملًا لتكيف تطبيقك لعدة لغات من خلال معالجة تخزين اللغة وإدارة الحالة وتعديلات عنوان URL بسلاسة.
