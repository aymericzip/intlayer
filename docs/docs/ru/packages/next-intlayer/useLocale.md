---
docName: package__next-intlayer__useLocale
url: https://intlayer.org/doc/packages/next-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация по хуку useLocale | next-intlayer
description: Узнайте, как использовать хук useLocale в пакете next-intlayer
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
---

# Интеграция с Next.js: Документация по хуку `useLocale` для `next-intlayer`

Этот раздел содержит подробную документацию по хуку `useLocale`, предназначенному для приложений Next.js в библиотеке `next-intlayer`. Он разработан для эффективного управления изменениями локали и маршрутизацией.

## Импорт `useLocale` в Next.js

Чтобы использовать хук `useLocale` в вашем приложении Next.js, импортируйте его следующим образом:

```javascript
import { useLocale } from "next-intlayer"; // Используется для управления локалями и маршрутизацией в Next.js
```

## Использование

Вот как реализовать хук `useLocale` внутри компонента Next.js:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

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
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

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
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

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
```

## Параметры и возвращаемые значения

При вызове хука `useLocale` он возвращает объект, содержащий следующие свойства:

- **`locale`**: Текущая локаль, установленная в контексте React.
- **`defaultLocale`**: Основная локаль, определённая в конфигурации.
- **`availableLocales`**: Список всех доступных локалей, определённых в конфигурации.
- **`setLocale`**: Функция для изменения локали приложения и соответствующего обновления URL. Она учитывает правила префиксов, добавлять ли локаль в путь или нет, в зависимости от конфигурации. Использует `useRouter` из `next/navigation` для навигационных функций, таких как `push` и `refresh`.
- **`pathWithoutLocale`**: Вычисляемое свойство, возвращающее путь без локали. Полезно для сравнения URL. Например, если текущая локаль — `fr`, а URL — `fr/my_path`, путь без локали будет `/my_path`. Использует `usePathname` из `next/navigation` для получения текущего пути.

## Заключение

Хук `useLocale` из `next-intlayer` является важным инструментом для управления локалями в приложениях Next.js. Он предлагает интегрированный подход для адаптации вашего приложения под несколько локалей, обеспечивая управление хранением локали, состоянием и изменениями URL без сбоев.

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
