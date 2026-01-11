---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Документація: функція getHTMLTextDir | intlayer
description: Дізнайтеся, як використовувати функцію getHTMLTextDir у пакеті intlayer
keywords:
  - getHTMLTextDir
  - переклад
  - Intlayer
  - intlayer
  - інтернаціоналізація
  - документація
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getHTMLTextDir
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Документація: функція `getHTMLTextDir` в `intlayer`

## Опис

Функція `getHTMLTextDir` визначає напрямок тексту (`ltr`, `rtl` або `auto`) на основі заданої локалі. Вона призначена, щоб допомогти розробникам встановити атрибут `dir` в HTML для коректного відображення тексту.

## Параметри

- `locale?: Locales`
  - **Опис**: Рядок локалі (наприклад, `Locales.ENGLISH`, `Locales.ARABIC`), що використовується для визначення напрямку тексту.
  - **Тип**: `Locales` (необов'язковий)

## Повертає

- **Тип**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Опис**: Напрямок тексту, що відповідає локалі:
  - `'ltr'` для мов з напрямком зліва направо.
  - `'rtl'` для мов з напрямком справа наліво.
  - `'auto'` якщо локаль не розпізнана.

## Приклад використання

### Визначення напряму тексту

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Output: "ltr"
getHTMLTextDir(Locales.FRENCH); // Output: "ltr"
getHTMLTextDir(Locales.ARABIC); // Output: "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Вивід: "ltr"
getHTMLTextDir(Locales.FRENCH); // Вивід: "ltr"
getHTMLTextDir(Locales.ARABIC); // Вивід: "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

getHTMLTextDir(Locales.ENGLISH); // Вивід: "ltr"
getHTMLTextDir(Locales.FRENCH); // Вивід: "ltr"
getHTMLTextDir(Locales.ARABIC); // Вивід: "rtl"
```

## Крайні випадки

- **Локаль не вказано:**
  - Функція повертає `'auto'`, коли `locale` має значення `undefined`.

- **Невідома локаль:**
  - Для невідомих локалей функція за замовчуванням повертає `'auto'`.

## Використання в компонентах:

Функцію `getHTMLTextDir` можна використовувати для динамічної установки атрибута `dir` в HTML-документі для коректного відображення тексту залежно від локалі.

```tsx codeFormat="typescript"
import type { FC } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

У наведеному вище прикладі атрибут `dir` динамічно встановлюється на основі локалі.
