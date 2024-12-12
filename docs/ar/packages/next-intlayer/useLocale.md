# دمج Next.js: توثيق Hook `useLocale` لـ `next-intlayer`

هذا القسم يقدم توثيقًا مفصلًا عن Hook `useLocale` المصمم لتطبيقات Next.js ضمن مكتبة `next-intlayer`. تم تصميمه للتعامل مع تغييرات اللغة والتوجيه بكفاءة.

## استيراد `useLocale` في Next.js

لاستخدام Hook `useLocale` في تطبيق Next.js الخاص بك، استورده كما هو موضح أدناه:

```javascript
import { useLocale } from "next-intlayer"; // تستخدم لإدارة اللغات والتوجيه في Next.js
```

## الاستخدام

إليك كيفية تنفيذ Hook `useLocale` داخل مكون Next.js:

```jsx
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

export default LocaleSwitcher;
```

## المعلمات والقيم المرجعة

عند استدعائك ل Hook `useLocale`، فإنه يرجع كائنًا يحتوي على الخصائص التالية:

- **`locale`**: اللغة الحالية كما هو محدد في سياق React.
- **`defaultLocale`**: اللغة الأساسية المحددة في التكوين.
- **`availableLocales`**: قائمة بجميع اللغات المتاحة كما هو محدد في التكوين.
- **`setLocale`**: دالة لتغيير لغة التطبيق وتحديث عنوان URL وفقًا لذلك. تتعامل مع قواعد البادئة، سواء لإضافة اللغة إلى المسار أم لا بناءً على التكوين. تستخدم `useRouter` من `next/navigation` لوظائف التنقل مثل `push` و `refresh`.
- **`pathWithoutLocale`**: خاصية محسوبة ترجع المسار بدون اللغة. وهي مفيدة لمقارنة عناوين URL. على سبيل المثال، إذا كانت اللغة الحالية هي `fr`، وعنوان URL هو `fr/my_path`، فإن المسار بدون اللغة هو `/my_path`. تستخدم `usePathname` من `next/navigation` للحصول على المسار الحالي.

## الخاتمة

Hook `useLocale` من `next-intlayer` هو أداة حاسمة لإدارة اللغات في تطبيقات Next.js. يوفر نهجًا متكاملًا لتكييف تطبيقك للعديد من اللغات من خلال التعامل مع تخزين اللغات، وإدارة الحالة، وتعديلات عنوان URL بسلاسة.
