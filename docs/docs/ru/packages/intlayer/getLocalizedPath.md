---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: Документация функции getLocalizedPath | intlayer
description: Узнайте, как использовать функцию getLocalizedPath из пакета intlayer
keywords:
  - getLocalizedPath
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
  - getLocalizedPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Реализована поддержка пользовательских правил перезаписи URL
---

# Документация: функция `getLocalizedPath` в `intlayer`

## Описание

Функция `getLocalizedPath` преобразует канонический путь (внутренний путь приложения) в его локализованный эквивалент на основе указанной локали и правил перезаписи. Она особенно полезна для генерации SEO-дружественных URL, которые различаются по языку.

**Ключевые возможности:**

- Поддерживает динамические параметры маршрута, использующие синтаксис `[param]`.
- Разрешает пути в соответствии с пользовательскими правилами перезаписи, определёнными в вашей конфигурации.
- Автоматически выполняет откат к каноническому пути, если для указанной локали не найдено правило перезаписи.

---

## Сигнатура функции

```typescript
getLocalizedPath(
  canonicalPath: string,         // Обязательно
  locale: Locales,               // Обязательно
  rewriteRules?: RoutingConfig['rewrite'] // Необязательно
): string
```

---

## Параметры

### Обязательные параметры

- `canonicalPath: string`
  - **Описание**: Внутренний путь приложения (например, `/about`, `/product/[id]`).
  - **Тип**: `string`
  - **Обязательный**: Да

- `locale: Locales`
  - **Описание**: Целевая локаль, для которой должен быть локализован путь.
  - **Тип**: `Locales`
  - **Обязательный**: Да

### Необязательные параметры

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Описание**: Объект, определяющий пользовательские правила перезаписи. Если не указан, по умолчанию используется свойство `routing.rewrite` из конфигурации проекта.
  - **Тип**: `RoutingConfig['rewrite']`
  - **По умолчанию**: `configuration.routing.rewrite`

---

## Возвращаемое значение

- **Тип**: `string`
- **Описание**: Локализованный путь для указанной локали.

---

## Пример использования

### Базовое использование (с конфигурацией)

Если вы настроили пользовательские правила перезаписи в `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Configuration: { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// Output: "/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// Output: "/about"
```

### Использование с динамическими маршрутами

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Configuration: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// Output: "/produit/123"
```

### Ручные правила перезаписи

Вы также можете передать ручные правила перезаписи в функцию:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getLocalizedPath("/contact", Locales.FRENCH, manualRules);
// Вывод: "/contactez-nous"
```

---

## Связанные функции

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getCanonicalPath.md): Преобразует локализованный путь обратно во внутренний канонический путь.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedUrl.md): Генерирует полностью локализованный URL (включая протокол, хост и префикс локали).
