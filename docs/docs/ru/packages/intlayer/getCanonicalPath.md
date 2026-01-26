---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: Документация: функция getCanonicalPath | intlayer
description: Инструкция по использованию функции getCanonicalPath в пакете intlayer
keywords:
  - getCanonicalPath
  - перевод
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
  - getCanonicalPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Реализованы пользовательские правила перезаписи URL
---

# Документация: функция `getCanonicalPath` в `intlayer`

## Описание

Функция `getCanonicalPath` преобразует локализованный URL-путь (например, `/a-propos`) обратно в его внутренний канонический путь приложения (например, `/about`). Это необходимо для маршрутизаторов, чтобы сопоставлять правильный внутренний маршрут независимо от языка в URL.

**Ключевые возможности:**

- Поддерживает динамические параметры маршрута с использованием синтаксиса `[param]`.
- Сопоставляет локализованные пути с пользовательскими правилaми перезаписи (rewrite rules), заданными в вашей конфигурации.
- Возвращает исходный путь, если подходящее правило перезаписи не найдено.

---

## Сигнатура функции

```typescript
getCanonicalPath(
  localizedPath: string,         // Обязательно
  locale: Locales,               // Обязательно
  rewriteRules?: RoutingConfig['rewrite'] // Необязательно
): string
```

---

## Параметры

### Обязательные параметры

- `localizedPath: string`
  - **Описание**: Локализованный путь, как он отображается в браузере (например, `/a-propos`).
  - **Тип**: `string`
  - **Обязательно**: Да

- `locale: Locales`
  - **Описание**: Локаль, используемая для разрешения пути.
  - **Тип**: `Locales`
  - **Обязательно**: Да

### Необязательные параметры

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Описание**: Объект, определяющий пользовательские правила переписывания. Если не указан, по умолчанию используется свойство `routing.rewrite` из конфигурации вашего проекта.
  - **Тип**: `RoutingConfig['rewrite']`
  - **По умолчанию**: `configuration.routing.rewrite`

---

## Возвращаемое значение

- **Тип**: `string`
- **Описание**: Внутренний канонический путь.

---

## Пример использования

### Базовое использование (с конфигурацией)

Если вы настроили пользовательские правила переписывания в вашем `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Конфигурация: { '/about': { en: '/about', fr: '/a-propos' } }
getCanonicalPath("/a-propos", Locales.FRENCH);
// Вывод: "/about"

getCanonicalPath("/about", Locales.ENGLISH);
// Вывод: "/about"
```

### Использование с динамическими маршрутами

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Конфигурация: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getCanonicalPath("/produit/123", Locales.FRENCH);
// Вывод: "/product/123"
```

### Ручные правила перезаписи

Вы также можете передать ручные правила перезаписи в функцию:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getCanonicalPath("/contactez-nous", Locales.FRENCH, manualRules);
// Output: "/contact"
```

---

## Связанные функции

- [`getLocalizedPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedPath.md): Преобразует канонический путь в его локализованный эквивалент.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedUrl.md): Генерирует полностью локализованный URL (включая протокол, хост и префикс локали).
