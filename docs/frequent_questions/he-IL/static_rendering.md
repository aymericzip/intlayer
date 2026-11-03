---
createdAt: 2025-05-20
updatedAt: 2026-11-03
priority: 4
title: רינדור סטטי לעומת דינמי עם i18n ב-Next.js
description: "מדוע כלי העזר של next-intl הופכים נתיבי i18n ב-Next.js לדינמיים, וכיצד לשמור על דפים מתורגמים מרונדרים באופן סטטי."
keywords:
  - סטטי
  - דינמי
  - רינדור
  - i18n
  - next.js
  - next-intl
  - intlayer
  - framework
  - middleware
  - הגדרות
slugs:
  - frequent-questions
  - static-rendering
author: aymericzip
---

# רינדור סטטי לעומת דינמי עם i18n ב-Next.js

## הבעיה עם **next-intl**

- **מה קורה?**
  כאשר אתה משתמש ב-`useTranslations`, ב-`getTranslations` או בכל כלי עזר של next-intl _בתוך Server Component_ באפליקציה עם ניתוב i18n‏ (`/en/…`, `/fr/…`), Next.js מסמן את הנתיב כולו כ-**דינמי (dynamic)**. ([Next Intl][1])

- **מדוע?**
  next-intl מאתר את ה-locale הנוכחי מתוך כותרת שהיא ייעודית לבקשה בלבד (`x-next-intl-locale`) דרך `headers()`. מכיוון ש-`headers()` הוא **API דינמי**, כל רכיב שניגש אליו מאבד את האופטימיזציה הסטטית שלו. ([Next Intl][1], [Next.js][2])

- **מעקף רשמי (Boilerplate)**
  1. ייצוא `generateStaticParams` עם כל locale נתמך.
  2. קריאה ל-`setRequestLocale(locale)` ב-**כל** layout/page _לפני_ שאתה קורא ל-`useTranslations`. ([Next Intl][1])
     פעולה זו מסירה את התלות בכותרות, אך כעת יש לך קוד נוסף לתחזק וממשק API שאינו יציב בייצור.

## כיצד **intlayer** עוקף את הבעיה

**בחירות ארכיטקטוניות**

1. **פרמטר נתיב בלבד (Route-param only)**, ה-locale מגיע מתוך מקטע ה-URL של `[locale]` ש-Next.js כבר מעביר לכל עמוד.
2. **באנדלים בזמן הידור (Compile-time bundles)**, תרגומים מיובאים כמודולי ES רגילים, כך שהם עוברים tree-shaking ומוטמעים בזמן ה-build.
3. **ללא ממשקי API דינמיים**, `useT()` קורא מתוך React context, ולא מ-`headers()` או מ-`cookies()`.
4. **אפס הגדרות נוספות**, ברגע שהדפים שלך נמצאים תחת `app/[locale]/`, Next.js מבצע prerendering של קובץ HTML אחד לכל locale באופן אוטומטי.
