---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: Маппер локалей
description: Дізнайтеся, як працює Маппер локалей. Перегляньте кроки, які виконує Маппер локалей у вашому застосунку. Дізнайтеся, що роблять різні пакети.
keywords:
  - Locale Mapper
  - Початок роботи
  - Intlayer
  - Додаток
  - Пакети
slugs:
  - doc
  - locale-mapper
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: Додано документацію для Locale Mapper
---

# Маппер локалей

Маппер локалей — потужний інструмент, який допомагає працювати з даними інтернаціоналізації в вашому застосунку Intlayer. Він надає три основні функції для перетворення і організації даних, специфічних для локалі: `localeMap`, `localeFlatMap` та `localeRecord`.

## Як працює Маппер локалей

Мапер локалей працює з об'єктом `LocaleData`, який містить всю необхідну інформацію про локаль:

```typescript
type LocaleData = {
  locale: LocalesValues; // Поточний код локалі (наприклад, 'en', 'fr')
  defaultLocale: LocalesValues; // Код локалі за замовчуванням
  isDefault: boolean; // Чи є ця локаль за замовчуванням
  locales: LocalesValues[]; // Масив всіх доступних локалей
  urlPrefix: string; // Префікс URL для цієї локалі (наприклад, '/fr' або '')
};
```

Функції-мапери автоматично генерують ці дані для кожної локалі у вашій конфігурації, враховуючи:

- Ваш список налаштованих локалей
- Налаштування локалі за замовчуванням
- Чи слід додавати префікс для локалі за замовчуванням у URL

## Основні функції

### `localeMap`

Перетворює кожну локаль на один об'єкт за допомогою функції mapper.

```typescript
localeMap<T>(
  mapper: (locale: LocaleData) => T,
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Приклад: створення об'єктів маршрутів**

```typescript
import { localeMap } from "intlayer";

const routes = localeMap((localizedData) => ({
  path: localizedData.urlPrefix,
  name: localizedData.locale,
  isDefault: localizedData.isDefault,
  locales: localizedData.locales,
  defaultLocale: localizedData.defaultLocale,
}));

// Result:
// [
//   { path: '/', name: 'en', isDefault: true, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/fr', name: 'fr', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/es', name: 'es', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' }
// ]
```

### `localeFlatMap`

Подібно до `localeMap`, але функція mapper повертає масив об'єктів, який згортається в один масив.

```typescript
localeFlatMap<T>(
  mapper: (locale: LocaleData) => T[],
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Приклад: Створення кількох маршрутів для кожної локалі**

```typescript
import { localeFlatMap } from "intlayer";

const routes = localeFlatMap((localizedData) => [
  {
    path: localizedData.urlPrefix,
    name: localizedData.locale,
    isDefault: localizedData.isDefault,
  },
  {
    path: `${localizedData.urlPrefix}/about`,
    name: `${localizedData.locale}-about`,
    isDefault: localizedData.isDefault,
  },
]);

// Результат:
// [
//   { path: '/', name: 'en', isDefault: true },
//   { path: '/about', name: 'en-about', isDefault: true },
//   { path: '/fr', name: 'fr', isDefault: false },
//   { path: '/fr/about', name: 'fr-about', isDefault: false },
//   { path: '/es', name: 'es', isDefault: false },
//   { path: '/es/about', name: 'es-about', isDefault: false }
// ]
```

### `localeRecord`

Створює об'єкт запису, де кожна локаль є ключем, що відображається на значення, перетворене функцією mapper.

```typescript
localeRecord<T>(
  mapper: (locale: LocaleData) => T,
  locales?: Locales[],
  defaultLocale?: Locales,
  prefixDefault?: boolean
): Record<Locales, T>
```

**Приклад: Завантаження файлів перекладу**

```typescript
import { localeRecord } from "intlayer";

const translations = localeRecord(({ locale }) =>
  require(`./translations/${locale}.json`)
);

// Результат:
// {
//   en: { welcome: 'Welcome', hello: 'Hello' },
//   fr: { welcome: 'Bienvenue', hello: 'Bonjour' },
//   es: { welcome: 'Bienvenido', hello: 'Hola' }
// }
```

## Налаштування Locale Mapper

Locale Mapper автоматично використовує вашу конфігурацію Intlayer, але ви можете перевизначити значення за замовчуванням, передавши параметри:

### Використання конфігурації за замовчуванням

```typescript
import { localeMap } from "intlayer";

// Використовує конфігурацію з intlayer.config.ts
const routes = localeMap((data) => ({
  path: data.urlPrefix,
  locale: data.locale,
}));
```

### Перевизначення конфігурації

```typescript
import { localeMap } from "intlayer";

// Перевизначити локалі та локаль за замовчуванням
const customRoutes = localeMap(
  (data) => ({ path: data.urlPrefix, locale: data.locale }),
  ["en", "fr", "de"], // Користувацькі локалі
  "en", // Користувацька локаль за замовчуванням
  true // Додавати префікс локалі за замовчуванням у URL
);
```

## Розширені приклади використання

### Створення навігаційних меню

```typescript
import { localeMap } from "intlayer";

const navigationItems = localeMap((data) => ({
  label: data.locale.toUpperCase(),
  href: data.urlPrefix || "/",
  isActive: data.isDefault,
  flag: `/flags/${data.locale}.svg`,
}));
```

### Генерація даних Sitemap

```typescript
import { localeFlatMap } from "intlayer";

const sitemapUrls = localeFlatMap((data) => [
  {
    url: `${data.urlPrefix}/`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: data.isDefault ? 1.0 : 0.8,
  },
  {
    url: `${data.urlPrefix}/about`,
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: data.isDefault ? 0.8 : 0.6,
  },
]);
```

### Динамічне завантаження перекладів

```typescript
import { localeRecord } from "intlayer";

const translationModules = localeRecord(({ locale }) => ({
  messages: import(`./locales/${locale}/messages.json`),
  validation: import(`./locales/${locale}/validation.json`),
  metadata: {
    locale,
    direction: ["ar", "he", "fa"].includes(locale) ? "rtl" : "ltr",
  },
}));
```

## Інтеграція конфігурації

Locale Mapper безшовно інтегрується з вашою конфігурацією Intlayer:

- **Locales**: Автоматично використовує `configuration.internationalization.locales`
- **Локаль за замовчуванням**: Використовує `configuration.internationalization.defaultLocale`
- **Додавання префіксу до URL**: Дотримується `configuration.middleware.prefixDefault`

Це забезпечує узгодженість у всьому додатку та зменшує дублювання конфігурації.
