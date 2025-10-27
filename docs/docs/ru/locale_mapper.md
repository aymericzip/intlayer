---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: Отображатель локалей
description: Узнайте, как работает Отображатель локалей. Посмотрите шаги, которые использует Отображатель локалей в вашем приложении. Узнайте, что делают разные пакеты.
keywords:
  - Отображатель локалей
  - Начало работы
  - Intlayer
  - Приложение
  - Пакеты
slugs:
  - doc
  - locale-mapper
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: Добавлена документация по locale mapper
---

# Отображатель локалей

Отображатель локалей - это мощный инструмент, который помогает работать с данными интернационализации в вашем приложении Intlayer. Он предоставляет три основные функции для преобразования и организации данных, специфичных для локали: `localeMap`, `localeFlatMap` и `localeRecord`.

## Как работает Отображатель локалей

Отображатель локалей работает с объектом `LocaleData`, который содержит всю необходимую информацию о локали:

```typescript
type LocaleData = {
  locale: LocalesValues; // Текущий код локали (например, 'en', 'fr')
  defaultLocale: LocalesValues; // Код локали по умолчанию
  isDefault: boolean; // Является ли эта локаль локалью по умолчанию
  locales: LocalesValues[]; // Массив всех доступных локалей
  urlPrefix: string; // Префикс URL для этой локали (например, '/fr' или '')
};
```

Функции отображателя автоматически генерируют эти данные для каждой локали в вашей конфигурации, учитывая:

- Ваш список настроенных локалей
- Настройку локали по умолчанию
- Нужно ли добавлять префикс для локали по умолчанию в URL

## Основные функции

### `localeMap`

Преобразует каждую локаль в один объект с помощью функции отображения.

```typescript
localeMap<T>(
  mapper: (locale: LocaleData) => T,
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Пример: Создание объектов маршрутов**

```typescript
import { localeMap } from "intlayer";

const routes = localeMap((localizedData) => ({
  path: localizedData.urlPrefix,
  name: localizedData.locale,
  isDefault: localizedData.isDefault,
  locales: localizedData.locales,
  defaultLocale: localizedData.defaultLocale,
}));

// Результат:
// [
//   { path: '/', name: 'en', isDefault: true, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/fr', name: 'fr', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/es', name: 'es', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' }
// ]
```

### `localeFlatMap`

Похож на `localeMap`, но функция преобразования возвращает массив объектов, который затем объединяется в один плоский массив.

```typescript
localeFlatMap<T>(
  mapper: (locale: LocaleData) => T[],
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Пример: Создание нескольких маршрутов для каждой локали**

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

Создаёт объект-запись, где каждая локаль является ключом, отображающимся на значение, преобразованное функцией mapper.

```typescript
localeRecord<T>(
  mapper: (locale: LocaleData) => T,
  locales?: Locales[],
  defaultLocale?: Locales,
  prefixDefault?: boolean
): Record<Locales, T>
```

**Пример: Загрузка файлов переводов**

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

## Настройка Locale Mapper

Locale Mapper автоматически использует вашу конфигурацию Intlayer, но вы можете переопределить значения по умолчанию, передав параметры:

### Использование конфигурации по умолчанию

```typescript
import { localeMap } from "intlayer";

// Использует конфигурацию из intlayer.config.ts
const routes = localeMap((data) => ({
  path: data.urlPrefix,
  locale: data.locale,
}));
```

### Переопределение конфигурации

```typescript
import { localeMap } from "intlayer";

// Переопределение локалей и локали по умолчанию
const customRoutes = localeMap(
  (data) => ({ path: data.urlPrefix, locale: data.locale }),
  //  ["en", "fr", "de"], // Пользовательские локали
  "en", // Пользовательская локаль по умолчанию
  true // Добавлять префикс локали по умолчанию в URL
);
```

## Расширенные примеры использования

### Создание навигационных меню

```typescript
import { localeMap } from "intlayer";

const navigationItems = localeMap((data) => ({
  label: data.locale.toUpperCase(),
  href: data.urlPrefix || "/",
  isActive: data.isDefault,
  flag: `/flags/${data.locale}.svg`, // путь к изображению флага
}));
```

### Генерация данных для Sitemap

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

### Динамическая загрузка переводов

```typescript
import { localeRecord } from "intlayer";

const translationModules = localeRecord(({ locale }) => ({
  messages: import(`./locales/${locale}/messages.json`), // импорт сообщений перевода
  validation: import(`./locales/${locale}/validation.json`), // импорт правил валидации
  metadata: {
    locale,
    direction: ["ar", "he", "fa"].includes(locale) ? "rtl" : "ltr", // направление текста: справа налево для арабского, иврита, фарси
  },
}));
```

## Интеграция с конфигурацией

Locale Mapper бесшовно интегрируется с вашей конфигурацией Intlayer:

- **Локали**: Автоматически использует `configuration.internationalization.locales`
- **Локаль по умолчанию**: Использует `configuration.internationalization.defaultLocale`
- **Префикс URL**: Учитывает `configuration.middleware.prefixDefault`

Это обеспечивает согласованность во всем вашем приложении и уменьшает дублирование конфигурации.
