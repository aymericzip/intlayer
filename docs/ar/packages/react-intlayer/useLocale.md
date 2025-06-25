---
docName: package__react-intlayer__useLocale
url: /doc/packages/react-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: وثائق hook useLocale | react-intlayer
description: اطلع على كيفية استخدام hook useLocale لحزمة react-intlayer
keywords:
  - useLocale
  - قاموس
  - مفتاح
  - Intlayer
  - التدويل
  - توثيق
  - Next.js
  - JavaScript
  - React
---

# دمج React: توثيق `useLocale` Hook

يوفر هذا القسم تفاصيل شاملة حول `useLocale` hook من مكتبة `react-intlayer`، المصممة لإدارة إعدادات اللغة في تطبيقات React.

## استيراد `useLocale` في React

لدمج `useLocale` hook في تطبيق React الخاص بك، قم باستيراده من الحزمة الخاصة به:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // تُستخدم في مكونات React لإدارة إعدادات اللغة
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // تُستخدم في مكونات React لإدارة إعدادات اللغة
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // تُستخدم في مكونات React لإدارة إعدادات اللغة
```

## نظرة عامة

يوفر `useLocale` hook طريقة سهلة للوصول إلى إعدادات اللغة والتعامل معها داخل مكونات React. يتيح الوصول إلى اللغة الحالية، اللغة الافتراضية، جميع اللغات المتاحة، ووظائف لتحديث إعدادات اللغة.

## الاستخدام

إليك كيفية استخدام `useLocale` hook داخل مكون React:

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

## المعلمات وقيم الإرجاع

عند استدعاء `useLocale` hook، فإنه يُرجع كائنًا يحتوي على الخصائص التالية:

- **`locale`**: اللغة الحالية كما تم تعيينها في سياق React.
- **`defaultLocale`**: اللغة الأساسية المحددة في التكوين.
- **`availableLocales`**: قائمة بجميع اللغات المتاحة كما تم تعريفها في التكوين.
- **`setLocale`**: وظيفة لتحديث اللغة الحالية داخل سياق التطبيق.

## مثال

يوضح هذا المثال مكونًا يستخدم `useLocale` hook لعرض مبدل لغة، مما يسمح للمستخدمين بتغيير لغة التطبيق ديناميكيًا:

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

يُعد `useLocale` hook من `react-intlayer` أداة أساسية لإدارة اللغات في تطبيقات React الخاصة بك، حيث يوفر الوظائف اللازمة لتكييف تطبيقك مع جمهور دولي متنوع بشكل فعال.
