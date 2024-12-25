# دمج React: وثائق `useLocale` Hook

تقدم هذه القسم تفاصيل شاملة حول `useLocale` hook من مكتبة `react-intlayer`، المصممة للتعامل مع إدارة اللغات في تطبيقات React.

## استيراد `useLocale` في React

لدمج `useLocale` hook في تطبيق React الخاص بك، قم باستيراده من حزمتها المعنية:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // مستخدم في مكونات React لإدارة اللغات
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // مستخدم في مكونات React لإدارة اللغات
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // مستخدم في مكونات React لإدارة اللغات
```

## نظرة عامة

يوفر `useLocale` hook وسيلة سهلة للوصول إلى إعدادات اللغة والتلاعب بها داخل مكونات React. يوفر الوصول إلى اللغة الحالية، اللغة الافتراضية، جميع اللغات المتاحة، ووظائف لتحديث إعدادات اللغة.

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

عندما تستدعي `useLocale` hook، فإنه يُرجع كائنًا يحتوي على الخصائص التالية:

- **`locale`**: اللغة الحالية كما هو محدد في سياق React.
- **`defaultLocale`**: اللغة الأساسية المحددة في التكوين.
- **`availableLocales`**: قائمة بجميع اللغات المتاحة كما هو محدد في التكوين.
- **`setLocale`**: دالة لتحديث اللغة الحالية داخل سياق التطبيق.

## مثال

يظهر هذا المثال مكون يستخدم `useLocale` hook لعرض محول اللغة، مما يسمح للمستخدمين بتغيير اللغة في التطبيق ديناميكيًا:

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

`useLocale` hook من `react-intlayer` هو أداة أساسية لإدارة اللغات في تطبيقات React الخاصة بك، حيث يوفر الوظائف اللازمة لتكييف تطبيقك مع مختلف الجماهير الدولية بفعالية.
