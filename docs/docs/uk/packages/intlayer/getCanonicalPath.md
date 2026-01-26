---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: Документація функції getCanonicalPath | intlayer
description: Дізнайтеся, як використовувати функцію getCanonicalPath у пакеті intlayer
keywords:
  - getCanonicalPath
  - переклад
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
  - getCanonicalPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Реалізовано користувацькі правила перезапису URL
---

# Документація: функція `getCanonicalPath` у `intlayer`

## Опис

Функція `getCanonicalPath` перетворює локалізований URL-шлях (наприклад, `/a-propos`) назад у його внутрішній канонічний шлях у додатку (наприклад, `/about`). Це необхідно, щоб маршрутизатори могли співставляти правильний внутрішній маршрут незалежно від мови URL.

**Ключові можливості:**

- Підтримує динамічні параметри маршруту з використанням синтаксису `[param]`.
- Порівнює локалізовані шляхи з користувацькими правилами перезапису, визначеними у вашій конфігурації.
- Повертає оригінальний шлях, якщо відповідне правило перезапису не знайдено.

---

## Підпис функції

```typescript
getCanonicalPath(
  localizedPath: string,         // Обов'язково
  locale: Locales,               // Обов'язково
  rewriteRules?: RoutingConfig['rewrite'] // Необов'язково
): string
```

---

## Параметри

### Обов'язкові параметри

- `localizedPath: string`
  - **Опис**: Локалізований шлях, як він відображається в браузері (наприклад, `/a-propos`).
  - **Тип**: `string`
  - **Обов'язковий**: Так

- `locale: Locales`
  - **Опис**: Локаль, яка використовується для розв'язування цього шляху.
  - **Тип**: `Locales`
  - **Обов'язковий**: Так

### Необов'язкові параметри

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Опис**: Об'єкт, що визначає користувацькі правила переписування. Якщо не вказано, за замовчуванням використовується властивість `routing.rewrite` з конфігурації вашого проєкту.
  - **Тип**: `RoutingConfig['rewrite']`
  - **За замовчуванням**: `configuration.routing.rewrite`

---

## Повертає

- **Тип**: `string`
- **Опис**: Внутрішній канонічний шлях.

---

## Приклад використання

### Базове використання (з конфігурацією)

Якщо ви налаштували користувацькі правила переписування у вашому `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Конфігурація: { '/about': { en: '/about', fr: '/a-propos' } }
getCanonicalPath("/a-propos", Locales.FRENCH);
// Output: "/about"

getCanonicalPath("/about", Locales.ENGLISH);
// Output: "/about"
```

### Використання з динамічними маршрутами

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Конфігурація: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getCanonicalPath("/produit/123", Locales.FRENCH);
// Output: "/product/123"
```

### Ручні правила перепису

Ви також можете передати функції ручні правила перепису:

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

## Пов'язані функції

- [`getLocalizedPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedPath.md): Визначає канонічний шлях у його локалізований еквівалент.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedUrl.md): Генерує повністю локалізовану URL-адресу (включаючи протокол, хост і префікс локалі).
