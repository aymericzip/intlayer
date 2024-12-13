# تكامل React: وثائق `useLocale` هوك

هذا القسم يقدم تفاصيل شاملة حول هوك `useLocale` من مكتبة `react-intlayer`، المصممة لإدارة اللغات في تطبيقات React.

## استيراد `useLocale` في React

لدمج هوك `useLocale` في تطبيق React الخاص بك، قم باستيراده من الحزمة ذات الصلة:

```javascript
import { useLocale } from "react-intlayer"; // يُستخدم في مكونات React لإدارة اللغات
```

## نظرة عامة

يوفر هوك `useLocale` وسيلة سهلة للوصول إلى إعدادات اللغة والتلاعب بها داخل مكونات React. يوفر الوصول إلى اللغة الحالية، اللغة الافتراضية، جميع اللغات المتاحة، والدوال لتحديث إعدادات اللغة.

## الاستخدام

إليك كيف يمكنك استخدام هوك `useLocale` داخل مكون React:

```jsx
import React from "react";
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

## المعاملات والقيم المرتجعة

عند استدعاء هوك `useLocale`، يقوم بإرجاع كائن يحتوي على الخصائص التالية:

- **`locale`**: اللغة الحالية كما هو محدد في سياق React.
- **`defaultLocale`**: اللغة الأساسية المعرفة في الإعدادات.
- **`availableLocales`**: قائمة بجميع اللغات المتاحة كما هو محدد في الإعدادات.
- **`setLocale`**: دالة لتحديث اللغة الحالية داخل سياق التطبيق.

## مثال

يظهر هذا المثال مكونًا يستخدم هوك `useLocale` لعرض محول اللغة، مما يسمح للمستخدمين بتغيير لغة التطبيق ديناميكيًا:

```jsx
import { useLocale } from "react-intlayer";

function LocaleSelector() {
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
}

export default LocaleSelector;
```

## الخاتمة

هوك `useLocale` من `react-intlayer` هو أداة أساسية لإدارة اللغات في تطبيقات React الخاصة بك، حيث يوفر الوظائف اللازمة لتكييف تطبيقك لجماهير دولية متنوعة بفاعلية.
