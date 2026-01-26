---
createdAt: 2025-08-23
updatedAt: 2026-01-26
title: Документация по хуку useLocale | next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-26
    changes: Установлено значение `onLocaleChange` по умолчанию на `replace`
  - version: 5.5.10
    date: 2025-06-29
    changes: Инициализация истории
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

## Параметры

Хук `useLocale` принимает следующие параметры:

- **`onLocaleChange`**: Строка, определяющая способ обновления URL при изменении локали. Может принимать значения `"replace"`, `"push"` или `"none"`.

  > Рассмотрим пример:
  >
  > 1. Вы находитесь на `/fr/home`
  > 2. Вы переходите на `/fr/about`
  > 3. Вы меняете локаль на `/es/about`
  > 4. Вы нажимаете кнопку «назад» в браузере
  >
  > Поведение будет отличаться в зависимости от значения `onLocaleChange`:
  >
  > - `"replace"` (по умолчанию): Заменяет текущий URL новым локализованным URL и устанавливает куки.
  >   -> Кнопка «назад» вернет вас на `/es/home`
  > - `"push"`: Добавляет новый локализованный URL в историю браузера и устанавливает куки.
  >   -> Кнопка «назад» вернет вас на `/fr/about`
  > - `"none"`: Только обновляет локаль в контексте клиента и устанавливает куки без изменения URL.
  >   -> Кнопка «назад» вернет вас на `/fr/home`
  > - `(locale) => void`: Устанавливает куки и вызывает пользовательскую функцию при изменении локали.
  >
  >   Опция `undefined` является поведением по умолчанию, так как мы рекомендуем использовать компонент `Link` для перехода на новую локаль.
  >   Пример:
  >
  >   ```tsx
  >   <Link href="/es/about" replace>
  >     О нас
  >   </Link>
  >   ```

## Возвращаемые значения

- **`locale`**: Текущая локаль, установленная в контексте React.
- **`defaultLocale`**: Основная локаль, определённая в конфигурации.
- **`availableLocales`**: Список всех доступных локалей, определённых в конфигурации.
- **`setLocale`**: Функция для изменения локали приложения и соответствующего обновления URL. Она учитывает правила префиксов, добавлять ли локаль в путь или нет, в зависимости от конфигурации. Использует `useRouter` из `next/navigation` для навигационных функций, таких как `push` и `refresh`.
- **`pathWithoutLocale`**: Вычисляемое свойство, возвращающее путь без локали. Полезно для сравнения URL. Например, если текущая локаль - `fr`, а URL - `fr/my_path`, путь без локали будет `/my_path`. Использует `usePathname` из `next/navigation` для получения текущего пути.

## Заключение

Хук `useLocale` из `next-intlayer` является важным инструментом для управления локалями в приложениях Next.js. Он предлагает интегрированный подход для адаптации вашего приложения под несколько локалей, обеспечивая управление хранением локали, состоянием и изменениями URL без сбоев.
