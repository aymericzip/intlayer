---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Документация функции comparePaths | intlayer
description: Узнайте, как использовать функцию comparePaths в пакете intlayer
keywords:
  - comparePaths
  - normalizePath
  - активная ссылка
  - навигация
  - Intlayer
  - intlayer
  - Интернационализация
  - Документация
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
    changes: "Первоначальная документация"
author: aymericzip
---

# Документация: Функция `comparePaths` в `intlayer`

## Описание

Функция `comparePaths` сравнивает два URL или пути на равенство, игнорируя сегмент локали, протокол/хост, строку запроса (query string), хэш и конечные слэши. Это рекомендуемый способ определения, указывает ли навигационная ссылка на текущую страницу (например, для выделения активной ссылки), без необходимости писать собственную (склонную к ошибкам) логику нормализации.

Внутри она повторно использует [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getPathWithoutLocale.md) для удаления сегмента локали, поэтому она учитывает ваш настроенный режим маршрутизации и локали.

Пакет также экспортирует базовый помощник [`normalizePath`](#normalizepath), который возвращает канонический путь, независимый от локали, используемый для сравнения.

**Ключевые особенности:**

- Сравнение независимо от локали (`/ru/about` совпадает с `/about`)
- Работает как с абсолютными URL, так и с относительными путями
- Игнорирует строку запроса, хэш и конечные слэши
- Допускает отсутствие начальных слэшей и пустые значения (нормализуется к `/`)
- Легковесная — построена поверх `getPathWithoutLocale`

---

## Сигнатура функции

```typescript
comparePaths(
  pathname: string,  // Обязательно
  href: string,      // Обязательно
  locales?: Locales[] // Необязательно
): boolean

normalizePath(
  inputUrl: string,   // Обязательно
  locales?: Locales[] // Необязательно
): string
```

---

## Параметры

- `pathname: string`
  - **Описание**: Первая строка URL или путь для сравнения (обычно текущий путь).
  - **Тип**: `string`
  - **Обязательно**: Да

- `href: string`
  - **Описание**: Вторая строка URL или путь для сравнения (обычно `href` навигационной ссылки).
  - **Тип**: `string`
  - **Обязательно**: Да

- `locales: Locales[]`
  - **Описание**: Необязательный массив поддерживаемых локалей. По умолчанию используются локали, настроенные в проекте.
  - **Тип**: `Locales[]`
  - **Обязательно**: Нет (Необязательно)

### Возвращает

- **Тип**: `boolean`
- **Описание**: `true`, когда оба входа разрешаются в один и тот же путь, независимый от локали, иначе `false`.

---

## Пример использования

### Базовое использование

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

### Абсолютные и относительные URL

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### Выделение активной навигационной ссылки

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

`normalizePath` возвращает канонический путь, независимый от локали, используемый `comparePaths`. Он удаляет сегмент локали, протокол/хост, строку запроса и хэш, обеспечивает наличие одного начального слэша, удаляет любые конечные слэши (кроме корня) и возвращает `/` для пустых значений.

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

## Связанные функции

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getPathWithoutLocale.md): Удаляет сегмент локали из URL или пути.
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getPrefix.md): Определяет префикс URL для заданной локали.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedUrl.md): Генерирует локализованный URL для указанной локали.

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
