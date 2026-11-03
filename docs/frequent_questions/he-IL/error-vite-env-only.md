---
createdAt: 2026-01-11
updatedAt: 2026-11-03
priority: 4
title: "vite-env-only: שגיאת שווא של node:fs עם Intlayer"
description: מדוע vite-env-only מדווח על ייבוא חסום של node:fs עם Intlayer + React-Router + Vite ומה ניתן לעשות.
keywords:
  - intlayer
  - vite
  - react-router
  - vite-env-only
  - node:fs
  - ייבוא נדחה
  - import denied
  - alias
  - client bundle
slugs:
  - frequent-questions
  - vite-env-only-node-fs-false-positive
author: aymericzip
---

# vite-env-only חוסם את `node:fs` עם Intlayer

אם השתמשת בתוסף **vite-env-only** (כפי שהוצע בהמלצות ישנות יותר של React-Router v7) ואתה רואה:

```bash

Error: [vite-env-only] Import denied

* Denied by specifier pattern: /^node:/
* Importer: index.html
* Import: "node:fs"

```

...אף על פי ש-**אין שום `node:fs` ב-client bundle שלך**, מדובר ב-**false positive** (זיהוי שגוי).

## מה גורם לכך

התוסף `vite-env-only` מריץ בדיקה מבוססת Babel בשלב מוקדם של פיענוח הגרף ב-Vite, _לפני_:

- יצירת כינויים (aliasing, כולל המיפויים של Intlayer בין דפדפן ל-Node),
- ניקוי קוד מת (dead-code elimination),
- הבחנה בין SSR ל-client,
- מודולים וירטואליים כמו אלה של React-Router.

חבילות Intlayer כוללות קוד שיכול לפעול הן בסביבת Node והן בדפדפן. בשלב _ביניים_, רכיב Node מובנה כמו `node:fs` עשוי להופיע בגרף **לפני** ש-Vite מסיר אותו מה-client build. התוסף `vite-env-only` מזהה זאת וזורק שגיאה באופן מיידי, על אף שה-bundle הסופי אינו כולל אותו כלל.

## React-Router ומודולי שרת

בתיעוד של React-Router בנושא **מוסכמות מודולי שרת**  
(https://reactrouter.com/api/framework-conventions/server-modules), הצוות **מציע במפורש להשתמש ב-`vite-env-only`** כדי למנוע דליפת ייבוא של קוד שרת בלבד אל תוך ה-client bundle.

עם זאת, מוסכמות אלו מסתמכות על ה-aliasing, ה-conditional exports וה-tree-shaking של Vite כדי להסיר קוד שרת בלבד. בעוד ש-aliasing ו-conditional exports כבר מוחלים, כלי עזר מסוימים מבוססי Node עדיין נוכחים בחבילות כמו `@intlayer/core` באותו שלב (אף על פי שהם לעולם אינם מיובאים ב-client). מכיוון ש-tree-shaking עדיין לא הופעל, פונקציות אלו עדיין מנותחות על ידי Babel, ו-`vite-env-only` מזהה את ייבויי ה-`node:` שלהן ומעלה התראת שווא, אף על פי שהן מנוקות לחלוטין מה-client bundle הסופי.

## כיצד לתקן / לעקוף את הבעיה

### מומלץ: הסרת `vite-env-only`

פשוט הסר את התוסף. במקרים רבים אין בו צורך. Vite כבר מטפל בהפרדה בין ייבויי client לייבויי server באמצעות מנגנון ה-resolution הפנימי שלו.

הסרה זו פותרת את חסימת השווא של `node:fs` ללא צורך בשינויים ב-Intlayer.

### אימות ה-Build הסופי במקום זאת

אם אתה עדיין רוצה לוודא שאין רכיבי Node מובנים ב-client, עשה זאת **לאחר ה-build**, לדוגמה:

```bash
pnpm build
grep -R "node:" dist/
```

אם אין תוצאות, ה-client bundles שלך נקיים.

## סיכום

- `vite-env-only` עלול להשליך שגיאה על `node:fs` מכיוון שהוא בודק מוקדם מדי.
- מוסכמות מודולי השרת של Vite + Intlayer + React-Router מסירות בדרך כלל הפניות לקוד שרת בצורה תקינה.
- הסרת התוסף או אימות ה-**פלט הסופי** היא בדרך כלל הפתרון הטוב ביותר.
