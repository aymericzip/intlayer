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
    changes: "Implement custom URL rewrites"
author: aymericzip
---

# Документація: функція `getLocalizedPath` у `intlayer`

## Опис

Функція `getLocalizedPath` перетворює канонічний шлях (внутрішній шлях додатка) у його локалізований еквівалент на основі вказаної локалі та правил переписування. Вона особливо корисна для генерації SEO-дружніх URL-адрес, що відрізняються залежно від мови.

Це відносний аналог [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedUrl.md) — для відносного вводу обидва повертають одне й те саме значення. На відміну від `getLocalizedUrl`, він ніколи не повертає абсолютний URL: конфігурація `domains` ігнорується, тому локаль, обслужена з власного домену, все одно повертає шлях. Абсолютний вввід прийнятий, але його походження видаляється — зберігаються лише його шлях, рядок запиту та хеш.

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

### Необов'язкові параметри

- `locale?: Locales`
  - **Description**: Цільовий локаль, для якого слід локалізувати шлях.
  - **Type**: `Locales`
  - **Default**: Локаль за замовчуванням конфігурації вашого проекту.

- `options?: object`
  - **Description**: Перевизначення маршрутизації. Кожен запис за замовчуванням використовує конфігурацію вашого проекту.
  - **Type**: `object`

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Опис**: Об'єкт, що визначає кастомні правила переписування. Якщо не вказано, використовується значення `routing.rewrite` з конфігурації вашого проєкту.
  - **Тип**: `RoutingConfig['rewrite']`
  - **За замовчуванням**: `configuration.routing.rewrite`

---

## Повертає

- **Тип**: `string`
- **Опис**: Локалізований шлях для зазначеної локалі.

Тип звужується на основі правил перезапису, оголошених у вашій конфігурації, тому редактор показує розташовану шляхом, а не звичайний `string`:

```typescript codeFormat="typescript"
// Конфігурація: режим 'prefix-no-default', defaultLocale 'en',
//                { '/about': { fr: '/a-propos' }, '/product/[id]': { fr: '/produit/[id]' } }
const about = getLocalizedPath("/about", Locales.FRENCH);
//    ^? '/fr/a-propos'
const product = getLocalizedPath("/product/123", Locales.FRENCH);
//    ^? '/fr/produit/123'
const contact = getLocalizedPath("/contact", Locales.FRENCH);
//    ^? '/fr/contact'  (немає правила переписування, застосовується лише префікс)
const home = getLocalizedPath("/", Locales.FRENCH);
//    ^? '/fr'
```

Те саме звуження поширюється на [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedUrl.md), яка застосовує правила переписування перед додаванням префікса локалі.

Два випадки залишаються розширеними до `string`, оскільки вони не можуть бути розв'язані під час компіляції:

- шлях, який не є рядковим літералом (наприклад, побудований зі змінної);
- шлях, який відповідає правилу з використанням багатосегментного або необов'язкового параметра (`[...slug]`, `[[...slug]]`, `:param?`).

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

### Пропуск локалі

Коли локаль не вказана, шлях локалізується для налаштованої локалі за замовчуванням:

```typescript codeFormat="typescript"
import { getLocalizedPath } from "intlayer";

// Конфігурація: defaultLocale = Locales.ENGLISH, { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about");
// Результат: "/about"
```

---

## Пов'язані функції

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getCanonicalPath.md): Відновлює локалізований шлях до внутрішнього канонічного шляху.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedUrl.md): Генерує повністю локалізований URL (включно з протоколом, хостом та префіксом локалі).
