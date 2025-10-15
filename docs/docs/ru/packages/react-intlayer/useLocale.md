---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация по хуку useLocale | react-intlayer
description: Узнайте, как использовать хук useLocale из пакета react-intlayer
keywords:
  - useLocale
  - словарь
  - ключ
  - Intlayer
  - Интернационализация
  - Документация
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
    changes: Инициализация истории
---

# Интеграция с React: Документация по хуку `useLocale`

В этом разделе представлены подробные сведения о хуке `useLocale` из библиотеки `react-intlayer`, предназначенном для управления локалями в React-приложениях.

## Импорт хуков `useLocale` в React

Чтобы интегрировать хук `useLocale` в ваше React-приложение, импортируйте его из соответствующего пакета:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // Используется в React-компонентах для управления локалью
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // Используется в React-компонентах для управления локалью
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // Используется в React-компонентах для управления локалью
```

## Обзор

Хук `useLocale` предоставляет простой способ доступа и управления настройками локали внутри React-компонентов. Он обеспечивает доступ к текущей локали, локали по умолчанию, всем доступным локалям, а также функции для обновления настроек локали.

## Использование

Вот как вы можете использовать хук `useLocale` внутри React-компонента:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Текущая локаль: {locale}</h1>
      <p>Локаль по умолчанию: {defaultLocale}</p>
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
      <h1>Текущая локаль: {locale}</h1>
      <p>Локаль по умолчанию: {defaultLocale}</p>
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
      <h1>Текущая локаль: {locale}</h1>
      <p>Локаль по умолчанию: {defaultLocale}</p>
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

## Параметры и возвращаемые значения

При вызове хука `useLocale` он возвращает объект, содержащий следующие свойства:

- **`locale`**: Текущая локаль, установленная в контексте React.
- **`defaultLocale`**: Основная локаль, определённая в конфигурации.
- **`availableLocales`**: Список всех доступных локалей, определённых в конфигурации.

```typescript
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

export default LocaleSelector;
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

## Заключение

Хук `useLocale` из `react-intlayer` является важным инструментом для управления локалями в ваших React-приложениях, предоставляя функциональность, необходимую для эффективной адаптации вашего приложения к различным международным аудиториям.
