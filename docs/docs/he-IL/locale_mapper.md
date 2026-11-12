---
createdAt: 2025-07-27
updatedAt: 2026-11-03
priority: 8
title: "מיפוי שפות (Locale Mapper): localeMap, localeFlatMap, localeRecord"
description: "בצעו טרנספורמציה לנתוני שפה באמצעות localeMap, localeFlatMap ו-localeRecord כדי לבנות נתיבים, פרמטרים סטטיים ורשומות לפי שפה."
keywords:
  - מיפוי שפות
  - Locale Mapper
  - תחילת עבודה
  - Intlayer
  - אפליקציה
  - חבילות
slugs:
  - doc
  - locale-mapper
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: "הוספת תיעוד מיפוי שפות (locale mapper)"
author: aymericzip
---

# מיפוי שפות (Locale Mapper)

ה-Locale Mapper הוא כלי שירות עוצמתי המסייע לכם לעבוד עם נתוני בינאום באפליקציית ה-Intlayer שלכם. הוא מספק שלוש פונקציות עיקריות לטרנספורמציה וארגון נתונים ספציפיים לשפה: `localeMap`,‏ `localeFlatMap`, ו-`localeRecord`.

## כיצד ה-Locale Mapper עובד

ה-Locale Mapper פועל על אובייקט מסוג `LocaleData` המכיל את כל המידע הנדרש על שפה מסוימת:

```typescript
type LocaleData = {
  locale: LocalesValues; // קוד השפה הנוכחית (למשל 'en', 'fr')
  defaultLocale: LocalesValues; // קוד שפת ברירת המחדל
  isDefault: boolean; // האם זו שפת ברירת המחדל
  locales: LocalesValues[]; // מערך של כל השפות הזמינות
  urlPrefix: string; // קידומת URL עבור שפה זו (למשל '/fr' או '')
};
```

פונקציות המיפוי מייצרות אוטומטית נתונים אלו עבור כל שפה המוגדרת בתצורה שלכם, תוך התחשבות ב:

- רשימת השפות המוגדרות שלכם
- הגדרת שפת ברירת המחדל
- האם שפת ברירת המחדל צריכה לקבל קידומת בכתובות ה-URL

## פונקציות מרכזיות

### `localeMap`

ממיר כל שפה לאובייקט בודד באמצעות פונקציית מיפוי (mapper).

```typescript
localeMap<T>(
  mapper: (locale: LocaleData) => T,
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**דוגמה: יצירת אובייקטי נתיב (Route objects)**

```typescript
import { localeMap } from "intlayer";

const routes = localeMap((localizedData) => ({
  path: localizedData.urlPrefix,
  name: localizedData.locale,
  isDefault: localizedData.isDefault,
  locales: localizedData.locales,
  defaultLocale: localizedData.defaultLocale,
}));

// תוצאה:
// [
//   { path: '/', name: 'en', isDefault: true, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/fr', name: 'fr', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/es', name: 'es', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' }
// ]
```

### `localeFlatMap`

בדומה ל-`localeMap`, אך פונקציית המיפוי מחזירה מערך של אובייקטים המשוטח (flattened) למערך יחיד.

```typescript
localeFlatMap<T>(
  mapper: (locale: LocaleData) => T[],
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**דוגמה: יצירת מספר נתיבים לכל שפה**

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

// תוצאה:
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

יוצר אובייקט רשומה (record) שבו כל שפה היא מפתח הממפה לערך שהומר על ידי פונקציית המיפוי.

```typescript
localeRecord<T>(
  mapper: (locale: LocaleData) => T,
  locales?: Locales[],
  defaultLocale?: Locales,
  prefixDefault?: boolean
): Record<Locales, T>
```

**דוגמה: טעינת קובצי תרגום**

```typescript
import { localeRecord } from "intlayer";

const translations = localeRecord(({ locale }) =>
  require(`./translations/${locale}.json`)
);

// תוצאה:
// {
//   en: { welcome: 'Welcome', hello: 'Hello' },
//   fr: { welcome: 'Bienvenue', hello: 'Bonjour' },
//   es: { welcome: 'Bienvenido', hello: 'Hola' }
// }
```

## הגדרת Locale Mapper

ה-Locale Mapper משתמש אוטומטית בתצורת Intlayer שלכם, אך ניתן לדרוס את ערכי ברירת המחדל על ידי העברת פרמטרים:

### שימוש בתצורת ברירת המחדל

```typescript
import { localeMap } from "intlayer";

// משתמש בהגדרות מתוך intlayer.config.ts
const routes = localeMap((data) => ({
  path: data.urlPrefix,
  locale: data.locale,
}));
```

### דריסת הגדרות

```typescript
import { localeMap } from "intlayer";

// דריסת שפות ושפת ברירת מחדל
const customRoutes = localeMap(
  (data) => ({ path: data.urlPrefix, locale: data.locale }),
  ["en", "fr", "de"], // שפות מותאמות אישית
  "en", // שפת ברירת מחדל מותאמת אישית
  true // הוספת קידומת לשפת ברירת המחדל בכתובות URL
);
```

## דוגמאות שימוש מתקדמות

### יצירת תפריטי ניווט

```typescript
import { localeMap } from "intlayer";

const navigationItems = localeMap((data) => ({
  label: data.locale.toUpperCase(),
  href: data.urlPrefix || "/",
  isActive: data.isDefault,
  flag: `/flags/${data.locale}.svg`,
}));
```

### הפקת נתוני מפת אתר (Sitemap)

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

### טעינת תרגומים דינמית

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

## שילוב בתצורה (Configuration Integration)

ה-Locale Mapper משתלב בצורה חלקה עם תצורת Intlayer שלכם:

- **Locales**: משתמש אוטומטית ב-`configuration.internationalization.locales`
- **Default Locale**: משתמש ב-`configuration.internationalization.defaultLocale`
- **URL Prefixing**: מכבד את `configuration.routing.mode` / `configuration.middleware.prefixDefault`

הדבר מבטיח עקביות בכל רחבי האפליקציה שלכם ומונע כפילות הגדרות.
