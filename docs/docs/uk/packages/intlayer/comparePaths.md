---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Документація функції comparePaths | intlayer
description: Дізнайтеся, як використовувати функцію comparePaths у пакеті intlayer
keywords:
  - comparePaths
  - normalizePath
  - активне посилання
  - навігація
  - Intlayer
  - intlayer
  - Інтернаціоналізація
  - Документація
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "Початкова документація"
author: aymericzip
---

# Документація: Функція `comparePaths` в `intlayer`

## Опис

Функція `comparePaths` порівнює два URL-адреси або шляхи на рівність, ігноруючи сегмент локалі, протокол/хост, рядок запиту (query string), хеш та кінцеві слеші. Це рекомендований спосіб визначення, чи вказує навігаційне посилання на поточну сторінку — наприклад, для виділення активного посилання — без необхідності писати власну (схильну до помилок) логіку нормалізації.

Внутрішньо вона повторно використовує [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getPathWithoutLocale.md) для видалення сегмента локалі, тому вона враховує ваш налаштований режим маршрутизації та локалі.

Пакет також експортує базовий помічник [`normalizePath`](#normalizepath), який повертає канонічний шлях, незалежний від локалі, що використовується для порівняння.

**Ключові особливості:**

- Порівняння незалежно від локалі (`/uk/about` збігається з `/about`)
- Працює як з абсолютними URL-адресами, так і з відносними шляхами
- Ігнорує рядок запиту, хеш та кінцеві слеші
- Допускає відсутність початкових слешів та порожні значення (нормалізується до `/`)
- Легковагова — побудована поверх `getPathWithoutLocale`

---

## Сигнатура функції

```typescript
comparePaths(
  pathname: string,  // Обов'язково
  href: string,      // Обов'язково
  locales?: Locales[] // Необов'язково
): boolean

normalizePath(
  inputUrl: string,   // Обов'язково
  locales?: Locales[] // Необов'язково
): string
```

---

## Параметри

- `pathname: string`
  - **Опис**: Перший рядок URL або шлях для порівняння (зазвичай поточний шлях).
  - **Тип**: `string`
  - **Обов'язково**: Так

- `href: string`
  - **Опис**: Другий рядок URL або шлях для порівняння (зазвичай `href` навігаційного посилання).
  - **Тип**: `string`
  - **Обов'язково**: Так

- `locales: Locales[]`
  - **Опис**: Необов'язковий масив підтримуваних локалей. За замовчуванням використовуються локалі, налаштовані у проєкті.
  - **Тип**: `Locales[]`
  - **Обов'язково**: Ні (Необов'язково)

### Повертає

- **Тип**: `boolean`
- **Опис**: `true`, коли обидва входи розв'язуються в один і той самий шлях, незалежний від локалі, інакше `false`.

---

## Приклад використання

### Базове використання

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### Абсолютні та відносні URL-адреси

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### Виділення активного навігаційного посилання

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

---

## normalizePath

`normalizePath` повертає канонічний шлях, незалежний від локалі, який використовується `comparePaths`. Вона видаляє сегмент локалі, протокол/хост, рядок запиту та хеш, забезпечує наявність одного початкового слеша, видаляє будь-які кінцеві слеші (крім кореня) і повертає `/` для порожніх значень.

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

---

## Пов'язані функції

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getPathWithoutLocale.md): Видаляє сегмент локалі з URL-адреси або шляху.
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getPrefix.md): Визначає префікс URL-адреси для заданої локалі.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedUrl.md): Генерує локалізовану URL-адресу для певної локалі.

---

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```
