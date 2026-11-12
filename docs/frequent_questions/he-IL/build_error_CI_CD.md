---
createdAt: 2025-05-20
updatedAt: 2026-11-03
priority: 4
title: תיקון שגיאות בנייה של Intlayer ב-CI/CD
description: תקן שגיאות רינדור של Server Components המתרחשות רק בבניות CI/CD, על ידי וידוא שמילוני Intlayer נבנים במהלך שלב ה-build.
keywords:
  - build
  - בנייה
  - שגיאה
  - error
  - ci
  - cd
  - pipeline
  - intlayer
  - dictionaries
  - מילונים
  - next.js
  - prebuild
  - אוטומציה
slugs:
  - frequent-questions
  - build-error-ci-cd
author: aymericzip
---

# שגיאת בנייה ב-CI/CD

אם אתה נתקל בשגיאה כזו ב-Next.js:

```text
Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error
```

להלן מספר פתרונות:

## 1. מילונים חסרים

ודא שהמילונים נבנים במהלך שלב ה-build.

שכיח מאוד שה-build עובד באופן מקומי אך נכשל ב-CI/CD. הסיבה לכך היא שמקומית תיקיית `.intlayer` קיימת, אך בסביבת CI/CD היא אינה קיימת מכיוון שהיא מוחרגת ממאגר הקוד.

ניתן לתקן זאת על ידי הוספת סקריפט `prebuild` בקובץ `package.json` של הפרויקט שלך.

```json5 fileName=package.json
{
  // ...
  "scripts": {
    "prebuild": "npx intlayer dictionaries build", // ירוץ לפני ה-build
    "build": "next build",
  },
}
```

> שים לב שאם אתה משתמש בפונקציה `withIntlayer`, או בתוסף ה-bundler המקביל עבור ה-framework שלך, סקריפט ה-prebuild יופעל אוטומטית לפני ה-build.

## 2. משתני סביבה חסרים בזמן build / run

בתוך container, או בפלטפורמת פריסה אוטומטית, מומלץ להחריג את קובץ ה-`.env` מתהליך ה-build.

```text fileName=".gitignore or .dockerignore"
# Environment variables
.env
**/.env
.env.*
**/.env.*
```

אם משתני הסביבה שלך אינם זמינים בזמן ה-build, תיזרק שגיאה.

```ts
import { Metadata } from "next";

export const generateMetadata = async ({ params }): Promise<Metadata> => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
});
```

שגיאה זו ככל הנראה אינה קשורה ל-Intlayer. לכן בדוק את משתני הסביבה שלך בזמן ה-build בפלטפורמת ה-CI/CD שלך.
