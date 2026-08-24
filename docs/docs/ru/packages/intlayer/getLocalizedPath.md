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
    changes: "Реализована поддержка пользовательских правил перезаписи URL"
author: aymericzip
---

# Документация: функция `getLocalizedPath` в `intlayer`

## Описание

Функция `getLocalizedPath` преобразует канонический путь (внутренний путь приложения) в его локализованный эквивалент на основе указанной локали и правил перезаписи. Она особенно полезна для генерации SEO-дружественных URL, которые различаются по языку.

Это относительный аналог [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedUrl.md) — для относительного входного значения оба возвращают одинаковое значение. В отличие от `getLocalizedUrl`, он никогда не возвращает абсолютный URL: конфигурация `domains` игнорируется, поэтому локаль, обслуживаемая со своего собственного домена, все равно возвращает путь. Абсолютный входной URL принимается, но его origin отбрасывается — сохраняются только путь, строка запроса и фрагмент.

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

### Необязательные параметры

- `locale?: Locales`
  - **Description**: Целевой язык, для которого должен быть локализован путь.
  - **Type**: `Locales`
  - **Default**: Язык по умолчанию конфигурации вашего проекта.

- `options?: object`
  - **Description**: Переопределения маршрутизации. Каждая запись использует конфигурацию вашего проекта по умолчанию.
  - **Type**: `object`

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Описание**: Объект, определяющий пользовательские правила перезаписи. Если не указан, по умолчанию используется свойство `routing.rewrite` из конфигурации проекта.
  - **Тип**: `RoutingConfig['rewrite']`
  - **По умолчанию**: `configuration.routing.rewrite`

---

## Возвращаемое значение

- **Тип**: `string`
- **Описание**: Локализованный путь для указанной локали.

Тип сужается на основе правил переписи, объявленных в вашей конфигурации, поэтому редактор показывает разрешённый путь вместо простой `string`:

```typescript codeFormat="typescript"
// Конфигурация: режим 'prefix-no-default', defaultLocale 'en',
//                { '/about': { fr: '/a-propos' }, '/product/[id]': { fr: '/produit/[id]' } }
const about = getLocalizedPath("/about", Locales.FRENCH);
//    ^? '/fr/a-propos'
const product = getLocalizedPath("/product/123", Locales.FRENCH);
//    ^? '/fr/produit/123'
const contact = getLocalizedPath("/contact", Locales.FRENCH);
//    ^? '/fr/contact'  (нет подходящего правила переписания, применяется только префикс)
const home = getLocalizedPath("/", Locales.FRENCH);
//    ^? '/fr'
```

То же сужение переходит в [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedUrl.md), которая применяет правила переписи перед добавлением префикса локали.

Два случая остаются расширенными до `string`, поскольку они не могут быть разрешены во время компиляции:

- путь, который не является строковым литералом (например, построенный из переменной);
- путь, соответствующий правилу с многосегментным или необязательным параметром (`[...slug]`, `[[...slug]]`, `:param?`).

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

### Опущение локали

Когда локаль не указана, путь локализируется для настроенной локали по умолчанию:

```typescript codeFormat="typescript"
import { getLocalizedPath } from "intlayer";

// Конфигурация: defaultLocale = Locales.ENGLISH, { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about");
// Вывод: "/about"
```

---

## Связанные функции

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getCanonicalPath.md): Преобразует локализованный путь обратно во внутренний канонический путь.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedUrl.md): Генерирует полностью локализованный URL (включая протокол, хост и префикс локали).
