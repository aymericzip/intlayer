---
createdAt: 2025-08-23
updatedAt: 2025-10-09
title: Документація хуку useLocale | next-intlayer
description: Дивіться, як використовувати хук useLocale у пакеті next-intlayer
keywords:
  - useLocale
  - dictionary
  - key
  - Intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useLocale
history:
  - version: 6.2.0
    date: 2025-10-09
    changes: Додано документацію для хуку `useLocale` з опцією `onLocaleChange`
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Інтеграція з Next.js: документація хуку `useLocale` для `next-intlayer`

This section offers detailed documentation on the `useLocale` hook tailored for Next.js applications within the `next-intlayer` library. It is designed to handle locale changes and routing efficiently.

## Імпорт `useLocale` у Next.js

Щоб використовувати хук `useLocale` у вашому Next.js застосунку, імпортуйте його, як показано нижче:

```javascript
import { useLocale } from "next-intlayer"; // Використовується для керування локалями та маршрутизацією в Next.js
```

## Використання

Ось як реалізувати хук `useLocale` у компоненті Next.js:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
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
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Поточна локаль: {locale}</h1>
      <p>Мова за замовчуванням: {defaultLocale}</p>
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
      <h1>Поточна локаль: {locale}</h1>
      <p>Мова за замовчуванням: {defaultLocale}</p>
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

## Параметри

Хук `useLocale` приймає такі параметри:

- **`onLocaleChange`**: Рядок, який визначає, як має оновлюватися URL під час зміни локалі. Може бути `"replace"`, `"push"` або `"none"`.

  > Розглянемо приклад:
  >
  > 1. Ви перебуваєте на `/fr/home`
  > 2. Ви переходите на `/fr/about`
  > 3. Ви переключаєтесь на `/es/about`
  > 4. Ви натискаєте кнопку "назад" у браузері
  >
  > Поведінка відрізнятиметься залежно від значення `onLocaleChange`:
  >
  > - `undefined`: (за замовчуванням) Оновлює лише локаль у клієнтському контексті та встановлює cookie, не змінюючи URL.
  >   -> Кнопка «назад» перейде на `/fr/home`
  > - `"replace"`: Замінює поточний URL на новий локалізований URL і встановлює cookie.
  >   -> Кнопка «назад» перейде на `/es/home`
  > - `"push"`: Додає новий локалізований URL в історію браузера та встановлює cookie.
  >   -> Кнопка «назад» перейде на `/fr/about`
  > - `(locale) => void`: Встановлює cookie і викликає кастомну функцію, яка буде запущена при зміні локалі.
  >
  >   Опція `undefined` — поведінка за замовчуванням: ми рекомендуємо використовувати компонент `Link` для навігації на нову локаль.
  >   Приклад:
  >
  >   ```tsx
  >   <Link href="/es/about" replace>
  >     Про нас
  >   </Link>
  >   ```

## Повернуті значення

Коли ви викликаєте хук `useLocale`, він повертає об'єкт, що містить наступні властивості:

- **`locale`**: Поточна локаль, як встановлено в контексті React.
- **`defaultLocale`**: Основна локаль, визначена в конфігурації.
- **`availableLocales`**: Список усіх доступних локалей, визначених у конфігурації.
- **`setLocale`**: Функція для зміни локалі застосунку та відповідного оновлення URL. Вона враховує правила префіксів, чи додавати локаль у шлях залежно від конфігурації. Використовує `useRouter` з `next/navigation` для навігаційних функцій, таких як `push` і `refresh`.
- **`pathWithoutLocale`**: обчислювана властивість, яка повертає шлях без локалі. Корисна для порівняння URL-адрес. Наприклад, якщо поточна локаль — `fr`, а URL — `fr/my_path`, то шлях без локалі буде `/my_path`. Використовує `usePathname` з `next/navigation` для отримання поточного шляху.

## Висновок

Хук `useLocale` з `next-intlayer` — це ключовий інструмент для керування локалями в додатках Next.js. Він пропонує інтегрований підхід для адаптації вашого застосунку до кількох локалей, безшовно обробляючи збереження локалі, управління станом та модифікації URL.
