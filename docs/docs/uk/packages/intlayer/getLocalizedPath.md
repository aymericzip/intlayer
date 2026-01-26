---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: Документація функції getLocalizedPath | intlayer
description: Дізнайтеся, як використовувати функцію getLocalizedPath у пакеті intlayer
keywords:
  - getLocalizedPath
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
  - getLocalizedPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Implement custom URL rewrites
---

# Документація: функція `getLocalizedPath` у `intlayer`

## Опис

Функція `getLocalizedPath` перетворює канонічний шлях (внутрішній шлях додатка) у його локалізований еквівалент на основі вказаної локалі та правил переписування. Вона особливо корисна для генерації SEO-дружніх URL-адрес, що відрізняються залежно від мови.

**Ключові можливості:**

- Підтримує динамічні параметри маршруту з використанням синтаксису `[param]`.
- Розв'язує шляхи відповідно до кастомних правил переписування, визначених у вашій конфігурації.
- Автоматично здійснює відкат до канонічного шляху, якщо для вказаної локалі не знайдено правила переписування.

---

## Сигнатура функції

```typescript
getLocalizedPath(
  canonicalPath: string,         // Обов'язково
  locale: Locales,               // Обов'язково
  rewriteRules?: RoutingConfig['rewrite'] // Необов'язково
): string
```

---

## Параметри

### Обов'язкові параметри

- `canonicalPath: string`
  - **Опис**: Внутрішній шлях додатка (наприклад, `/about`, `/product/[id]`).
  - **Тип**: `string`
  - **Обов'язковий**: Так

- `locale: Locales`
  - **Опис**: Цільова локаль, для якої шлях має бути локалізований.
  - **Тип**: `Locales`
  - **Обов'язковий**: Так

### Необов'язкові параметри

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Опис**: Об'єкт, що визначає кастомні правила переписування. Якщо не вказано, використовується значення `routing.rewrite` з конфігурації вашого проєкту.
  - **Тип**: `RoutingConfig['rewrite']`
  - **За замовчуванням**: `configuration.routing.rewrite`

---

## Повертає

- **Тип**: `string`
- **Опис**: Локалізований шлях для зазначеної локалі.

---

## Приклад використання

### Базове використання (з конфігурацією)

Якщо ви налаштували власні правила перезапису у файлі `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Конфігурація: { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// Вивід: "/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// Вивід: "/about"
```

### Використання з динамічними маршрутами

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Конфігурація: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// Вивід: "/produit/123"
```

### Ручні правила перезапису

Ви також можете передати ручні правила перезапису у функцію:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getLocalizedPath("/contact", Locales.FRENCH, manualRules);
// Вивід: "/contactez-nous"
```

---

## Пов'язані функції

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getCanonicalPath.md): Відновлює локалізований шлях до внутрішнього канонічного шляху.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedUrl.md): Генерує повністю локалізований URL (включно з протоколом, хостом та префіксом локалі).
