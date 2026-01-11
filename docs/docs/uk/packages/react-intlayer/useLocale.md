---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Хук useLocale — документація | react-intlayer
description: Дивіться, як використовувати хук useLocale для пакета react-intlayer
keywords:
  - useLocale
  - dictionary
  - key
  - Intlayer
  - Internationalization
  - Документація
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Інтеграція з React: документація хуку `useLocale`

У цьому розділі наведено детальну інформацію про хук `useLocale` з бібліотеки `react-intlayer`, призначений для керування локалізацією в React-застосунках.

## Імпорт хуку `useLocale` у React

Щоб інтегрувати хук `useLocale` у свій React-додаток, імпортуйте його з відповідного пакета:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // Використовується в React-компонентах для керування локаллю
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // Використовується в React-компонентах для керування локаллю
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // Використовується в React-компонентах для керування локаллю
```

## Огляд

Хук `useLocale` пропонує простий спосіб отримувати доступ та змінювати налаштування локалі в React-компонентах. Він надає доступ до поточної локалі, локалі за замовчуванням, усіх доступних локалей та функцій для оновлення налаштувань локалі.

## Використання

Ось як ви можете використовувати хук `useLocale` у React-компоненті:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Current Locale: {locale}</h1>
      <p>Default Locale: {defaultLocale}</p>
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
      <h1>Поточна локаль: {locale}</h1>
      <p>Локаль за замовчуванням: {defaultLocale}</p>
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
      <h1>Поточна локаль: {locale}</h1>
      <p>Локаль за замовчуванням: {defaultLocale}</p>
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

## Параметри та значення, що повертаються

Коли ви викликаєте хук `useLocale`, він повертає об'єкт, який містить такі властивості:

- **`locale`**: Поточна локаль, встановлена в контексті React.
- **`defaultLocale`**: Основна локаль, визначена в конфігурації.
- **`availableLocales`**: Список усіх доступних локалей, визначених у конфігурації.
  /// **`setLocale`**: Функція для оновлення поточної локалі в контексті додатка.

## Приклад

У цьому прикладі показано компонент, який використовує хук `useLocale` для відображення перемикача локалі, що дозволяє користувачам динамічно змінювати локаль додатка:

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

## Висновок

Хук `useLocale` з `react-intlayer` — це необхідний інструмент для керування локалями у ваших React-застосунках, що надає функціональність, необхідну для ефективного адаптування застосунку до різних міжнародних аудиторій.
