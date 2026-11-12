---
createdAt: 2025-05-20
updatedAt: 2026-11-03
priority: 4
title: ערך Locale שגוי מתקבל מתוך ה-URL
description: 'פתרון בעיה שבה נקרא locale שגוי מתוך ה-URL ב-Next.js, כגון "about" במקום "en", על ידי שימוש במבנה התיקיות [locale] ש-Intlayer מצפה לו.'
keywords:
  - locale
  - url
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - הגדרות
  - configuration
  - prefixDefault
  - noPrefix
slugs:
  - frequent-questions
  - locale-incorect-in-url
author: aymericzip
---

# ערך Locale שגוי מתקבל מתוך ה-URL

## תיאור הבעיה

בעת ניסיון לגשת לפרמטר ה-locale מתוך ה-URL, ייתכן שתיתקל בבעיה שבה ערך ה-locale שגוי:

```js
const { locale } = await params;
console.log(locale); // מחזיר "about" במקום ה-locale המצופה
```

## פתרון

### 1. אימות מבנה הקבצים

ודא שנתיב ה-App Router ב-Next.js עוקב אחר המבנה הבא:

```bash
src/app/[locale]/about/page.tsx
```

### 2. בדיקת הגדרות ה-Middleware

הבעיה מתרחשת לעתים קרובות כאשר ה-middleware אינו קיים או אינו מופעל. קובץ ה-middleware צריך להיות ממוקם בנתיב:

```bash
src/middleware.ts
```

קובץ ה-middleware אחראי על שכתוב (rewrite) של נתיבים כאשר `prefixDefault` מוגדר כ-`false`. לדוגמה, הוא משכתב את `/en/about` לנתיב `/about`.

### 3. תבניות URL בהתאם להגדרות

#### הגדרת ברירת מחדל (`prefixDefault: false`, `noPrefix: false`)

- אנגלית: `/about`
- צרפתית: `/fr/about`
- ספרדית: `/es/about`

#### עם `prefixDefault: true`

- אנגלית: `/en/about`
- צרפתית: `/fr/about`
- ספרדית: `/es/about`

#### עם `noPrefix: true`

- אנגלית: `/about`
- צרפתית: `/about`
- ספרדית: `/about`

לפרטים נוספים אודות אפשרויות הגדרה אלו, עיין ב-[תיעוד ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).
