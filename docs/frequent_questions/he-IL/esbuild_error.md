---
createdAt: 2025-05-20
updatedAt: 2026-11-03
priority: 4
title: תיקון שגיאות ESBuild עם Intlayer
description: תקן שגיאות ESBuild במהלך בניית Intlayer, הנגרמות בדרך כלל מתוסף bundler חסר או לא מוגדר כהלכה עבור ה-framework שלך.
keywords:
  - esbuild
  - שגיאה
  - error
  - intlayer
  - plugin
  - תוסף
  - framework
  - next.js
  - vite
  - react-native
  - lynx
slugs:
  - frequent-questions
  - esbuild-error
author: aymericzip
---

# שגיאת ESBuild

אם אתה נתקל בשגיאת ESBuild במהלך תהליך ה-build, סביר להניח שתוסף Intlayer לא הוגדר כראוי.

ESBuild אחראי על קריאת קובצי הצהרת התוכן (`.content.{ts,js,mjs,cjs,json}`) ויצירת המילונים המתאימים בתיקיית `.intlayer/dictionary`, כמו גם על קריאת קובץ ההגדרות (`intlayer.config.ts`).

Intlayer מספקת תוספים לשילוב עם ה-bundlers שלך. התוסף נועד ליצור כינויים (aliasing) לרכיבים שאמורים לרוץ בצד השרת בלבד.

אם אתה משתמש ב-framework כגון Next.js (Webpack / Turbopack), Vite, או React Native, Lynx וכו', Intlayer מספקת תוסף שבאמצעותו תוכל לשלב את Intlayer באפליקציה שלך. עיין בתיעוד הספציפי של ה-framework שלך כדי ללמוד כיצד לשלב את התוסף.
