---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق هوك useLocale | react-intlayer
description: تعرف على كيفية استخدام هوك useLocale لحزمة react-intlayer
keywords:
  - useLocale
  - dictionary
  - key
  - Intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافاسكريبت
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: بدء التاريخ
---

# تكامل React: توثيق هوك `useLocale`

يوفر هذا القسم تفاصيل شاملة حول هوك `useLocale` من مكتبة `react-intlayer`، المصممة لإدارة الإعدادات المحلية في تطبيقات React.

## استيراد `useLocale` في React

لدمج هوك `useLocale` في تطبيق React الخاص بك، قم باستيراده من الحزمة الخاصة به:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // يستخدم في مكونات React لإدارة الإعدادات المحلية
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // يستخدم في مكونات React لإدارة الإعدادات المحلية
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // يستخدم في مكونات React لإدارة الإعدادات المحلية
```

## نظرة عامة

يوفر هوك `useLocale` طريقة سهلة للوصول إلى إعدادات اللغة والتعامل معها داخل مكونات React. حيث يتيح الوصول إلى اللغة الحالية، اللغة الافتراضية، جميع اللغات المتاحة، بالإضافة إلى دوال لتحديث إعدادات اللغة.

## الاستخدام

إليك كيفية استخدام هوك `useLocale` داخل مكون React:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

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

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

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

## المعاملات وقيم الإرجاع

عند استدعاء هوك `useLocale`، فإنه يعيد كائنًا يحتوي على الخصائص التالية:

- **`locale`**: اللغة الحالية كما تم تعيينها في سياق React.
- **`defaultLocale`**: اللغة الأساسية المعرفة في الإعدادات.
- **`availableLocales`**: قائمة بجميع اللغات المتاحة كما هو معرف في الإعدادات.
- **`setLocale`**: دالة لتحديث اللغة الحالية ضمن سياق التطبيق.

## مثال

يوضح هذا المثال مكونًا يستخدم هوك `useLocale` لعرض مبدل اللغة، مما يسمح للمستخدمين بتغيير لغة التطبيق ديناميكيًا:

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

## الخاتمة

تُعدّ الخطاف `useLocale` من مكتبة `react-intlayer` أداة أساسية لإدارة اللغات في تطبيقات React الخاصة بك، حيث توفر الوظائف اللازمة لتكييف تطبيقك مع جماهير دولية متنوعة بفعالية.
