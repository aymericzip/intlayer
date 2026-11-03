---
createdAt: 2026-05-10
updatedAt: 2026-11-03
priority: 6
title: "תוסף Sync PO: קובצי Gettext עם Intlayer"
description: "סנכרנו מילוני Intlayer עם קובצי PO של Gettext. שמרו על מערך ה-i18n הקיים שלכם בעודכם משתמשים ב-Intlayer לניהול, תרגום ובדיקת ההודעות שלכם."
keywords:
  - Intlayer
  - סנכרון PO
  - Sync PO
  - Gettext
  - i18n
  - תרגומים
slugs:
  - doc
  - plugin
  - sync-po
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 8.9.4
    date: 2026-05-10
    changes: "תיעוד ראשוני עבור תוסף Sync PO"
author: aymericzip
---

# Sync PO (גשרי i18n) - סנכרון PO עם תמיכה ב-ICU / i18next

השתמשו ב-Intlayer כתוסף הרחבה למערך ה-i18n הקיים שלכם. תוסף זה שומר על סנכרון בין הודעות ה-PO של Gettext לבין מילוני Intlayer, כך שתוכלו:

- להמשיך להשתמש בתהליך העבודה הקיים שלכם המבוסס על קובצי PO.
- לנהל ולתרגם את ההודעות שלכם באמצעות Intlayer (ב-CLI, ב-CI, בספקים וב-CMS), ללא צורך בארגון מחדש (refactoring) של האפליקציה שלכם.
- להגיש הדרכות ותוכן SEO המכוונים לכל אקוסיסטם, תוך הצגת Intlayer כשכבת ניהול ה-PO.

הערות והיקף תמיכה נוכחי:

- החצנה ל-CMS פועלת עבור תרגומים וטקסט רגיל.
- עדיין אין תמיכה בהזרקות (insertions), צורות רבים (plurals/ICU) או תכונות runtime מתקדמות של ספריות אחרות בתוך רשומות ה-PO עצמן.
- העורך הוויזואלי עדיין אינו נתמך עבור פלטי i18n של צד שלישי.

## מתי להשתמש בתוסף זה

- אתם כבר משתמשים בקובצי PO של Gettext עבור התרגומים שלכם.
- אתם מעוניינים במילוי אוטומטי מבוסס AI, בדיקות ב-CI וניהול תוכן שוטף מבלי לשנות את סביבת הרינדור (rendering runtime) שלכם.

## התקנה

```bash
pnpm add -D @intlayer/sync-po-plugin
# או
npm i -D @intlayer/sync-po-plugin
```

## תוספים

חבילה זו מספקת שני תוספים:

- `loadPO`: טעינת קובצי PO לתוך מילוני Intlayer.
  - תוסף זה משמש לטעינת קובצי PO ממקור נתון והמרתם למילוני Intlayer. הוא יכול לסרוק את כל בסיס הקוד ולחפש קובצי PO ספציפיים.
    תוסף זה שימושי:
    - אם אתם משתמשים בספריית i18n שכופה מיקום ספציפי לטעינת קובצי ה-PO שלכם, אך אתם מעוניינים למקם את הצהרת התוכן שלכם בכל מקום שתרצו בבסיס הקוד.
    - אם אתם מעוניינים למשוך את ההודעות שלכם ממקור מרוחק (למשל CMS, API וכו') ולשמור אותן בקובצי PO.

  > מאחורי הקלעים, תוסף זה יסרוק את כל בסיס הקוד, יאתר קובצי PO ספציפיים ויטען אותם לתוך מילוני Intlayer.
  > שימו לב כי תוסף זה אינו כותב את הפלט והתרגומים בחזרה לתוך קובצי ה-PO.

- `syncPO`: סנכרון קובצי PO עם מילוני Intlayer.
  - תוסף זה משמש לסנכרון קובצי PO עם מילוני Intlayer. הוא יכול לסרוק את המיקום הנתון ולטעון את קובצי ה-PO התואמים לתבנית. תוסף זה שימושי אם ברצונכם ליהנות מיתרונות Intlayer בעת שימוש בספריית i18n אחרת.

## שימוש בשני התוספים יחד

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO, syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // שמירה על סנכרון קובצי ה-PO הנוכחיים עם מילוני Intlayer
  plugins: [
    /**
     * יטען את כל קובצי ה-PO בתיקיית src התואמים לתבנית {key}.i18n.po
     */
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      locale: Locales.ENGLISH,
      priority: 1, // מבטיח שקובצי PO אלה יקבלו עדיפות על פני קבצים ב-`./locales/en/${key}.po`
    }),
    /**
     * יטען ויכתוב את הפלט והתרגומים בחזרה לקובצי ה-PO בתיקיית locales
     */
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      priority: 0,
    }),
  ],
};

export default config;
```

## תוסף `syncPO`

### תחילת עבודה מהירה

הוסיפו את התוסף לקובץ `intlayer.config.ts` שלכם וכוונו אותו למבנה ה-PO הקיים שלכם.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // שמירה על סנכרון קובצי ה-PO הנוכחיים עם מילוני Intlayer
  plugins: [
    syncPO({
      // מבנה לפי שפה ולפי namespace
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

חלופה: קובץ יחיד לכל שפה:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      source: ({ locale }) => `./locales/${locale}.po`,
    }),
  ],
};

export default config;
```

#### כיצד זה פועל

- קריאה: התוסף מגלה קובצי PO מתוך בונה ה-`source` וטוען אותם כמילוני Intlayer.
- כתיבה: לאחר בנייה ומילוי תרגומים, הוא כותב PO מתורגם בחזרה לאותם הנתיבים (עם כותרות Gettext מתאימות).
- מילוי אוטומטי (Auto-fill): התוסף מצהיר על נתיב `autoFill` לכל מילון. הרצת `intlayer fill` מעדכנת כברירת מחדל רק תרגומים חסרים בקובצי ה-PO שלכם.

API:

```ts
syncPO({
  source: ({ key, locale }) => string, // חובה
  location?: string, // תווית אופציונלית, ברירת מחדל: "sync-po::path/to/source"
  priority?: number, // עדיפות אופציונלית לפתרון התנגשויות, ברירת מחדל: 0
});
```

### מקורות PO מרובים ומערכת עדיפויות

תוכלו להוסיף מספר תוספי `syncPO` כדי לסנכרן מקורות PO שונים. הדבר שימושי כאשר יש לכם מספר מקורות תרגום או מבני PO שונים בפרויקט שלכם.

#### מערכת עדיפויות (Priority system)

כאשר מספר תוספים מכוונים לאותו מפתח מילון, הפרמטר `priority` קובע איזה תוסף יקבל קדימות:

- מספרי עדיפות גבוהים יותר גוברים על נמוכים יותר
- עדיפות ברירת המחדל של קובצי `.content` היא `0`
- עדיפות ברירת המחדל של תוספים היא `0`
- תוספים בעלי אותה עדיפות מעובדים לפי סדר הופעתם בקובץ התצורה

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // מקור PO ראשי (העדיפות הגבוהה ביותר)
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      location: "main-translations",
      priority: 10,
    }),

    // מקור PO משני (עדיפות נמוכה יותר)
    syncPO({
      source: ({ locale }) => `./fallback-locales/${locale}.po`,
      location: "fallback-translations",
      priority: 5,
    }),

    // מקור PO מדור קודם (legacy, העדיפות הנמוכה ביותר)
    syncPO({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.po`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## תוסף Load PO

### תחילת עבודה מהירה

הוסיפו את התוסף לקובץ `intlayer.config.ts` כדי לקלוט קובצי PO קיימים כמילוני Intlayer. תוסף זה מיועד לקריאה בלבד (ללא כתיבה לדיסק):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // קליטת הודעות PO הממוקמות בכל מקום בעץ קובצי המקור שלכם
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      // טעינת שפה בודדת לכל מופע של תוסף (ברירת מחדל: defaultConfig.defaultLocale)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

חלופה: מבנה לפי שפה, עדיין לקריאה בלבד (רק השפה שנבחרה נטענת):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadPO({
      // רק קבצים עבור Locales.FRENCH ייטענו מתבנית זו
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### כיצד זה פועל

- גילוי: בונה glob מתוך הגדרת ה-`source` ואוסף קובצי PO תואמים.
- קליטה: טוען כל קובץ PO כמילון Intlayer עם ה-`locale` שסופק.
- קריאה בלבד: אינו כותב או מעצב קובצי פלט. השתמשו ב-`syncPO` אם אתם זקוקים לסנכרון דו-כיווני.
- מוכן למילוי אוטומטי: מגדיר תבנית `fill` כך ש-`intlayer content fill` יוכל לאכלס מפתחות חסרים.

### API

```ts
loadPO({
  // בניית נתיבים לקובצי ה-PO שלכם. `locale` אופציונלי אם במבנה שלכם אין מקטע שפה
  source: ({ key, locale }) => string,

  // שפת יעד עבור המילונים הנטענים על ידי מופע תוסף זה
  // ברירת מחדל: configuration.internationalization.defaultLocale
  locale?: Locale,

  // תווית אופציונלית לזיהוי המקור
  location?: string, // ברירת מחדל: "plugin"

  // עדיפות המשמשת לפתרון התנגשויות מול מקורות אחרים
  priority?: number, // ברירת מחדל: 0
});
```

### התנהגות ומוסכמות

- אם מסכת ה-`source` שלכם כוללת מציין שפה (locale placeholder), רק קבצים עבור ה-`locale` הנבחר ייקלטו.
- אם אין מקטע `{key}` במסכה שלכם, מפתח המילון יהיה "index".
- מפתחות נגזרים מנתיבי קבצים על ידי החלפת מציין המיקום `{key}` בבונה ה-`source` שלכם.
- התוסף משתמש רק בקבצים שנתגלו ואינו ממציא שפות או מפתחות חסרים.
- נתיב ה-`fill` מוסק מתוך ה-`source` שלכם ומשמש לעדכון ערכים חסרים באמצעות ה-CLI כאשר אתם בוחרים בכך.

## פתרון התנגשויות (Conflict resolution)

כאשר אותו מפתח תרגום קיים במספר מקורות PO:

1. התוסף בעל העדיפות הגבוהה ביותר קובע את הערך הסופי
2. מקורות בעלי עדיפות נמוכה יותר משמשים כגיבוי (fallbacks) עבור מפתחות חסרים
3. הדבר מאפשר לכם לתחזק תרגומים ממערכות ישנות תוך מעבר הדרגתי למבנים חדשים

## CLI

קובצי ה-PO המסונכרנים ייחשבו כקובצי `.content` לכל דבר. המשמעות היא שכל פקודות intlayer יהיו זמינות עבור קובצי ה-PO המסונכרנים, כולל:

- `intlayer content test` כדי לבדוק אם קיימים תרגומים חסרים
- `intlayer content list` כדי להציג את רשימת קובצי ה-PO המסונכרנים
- `intlayer content fill` כדי למלא תרגומים חסרים
- `intlayer content push` כדי לדחוף את קובצי ה-PO המסונכרנים
- `intlayer content pull` כדי למשוך את קובצי ה-PO המסונכרנים

ראו [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md) לפרטים נוספים.

- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md)

## מגבלות נוכחיות

- אין תמיכה בהזרקות (insertions) או צורות רבים ב-ICU בעת עבודה מול ספריות צד שלישי.
- העורך הוויזואלי אינו זמין עדיין עבור סביבות ריצה שאינן של Intlayer.
- סנכרון PO בלבד; פורמטים של קטלוגים שאינם PO אינם נתמכים.

## מדוע זה חשוב

- אנו יכולים להמליץ על פתרונות i18n מבוססים ולמצב את Intlayer כתוסף ערך מוסף (add-on).
- אנו מנצלים את ה-SEO ומילות המפתח שלהם באמצעות מדריכים המסתיימים בהמלצה על Intlayer לניהול PO.
- מרחיב את קהל היעד מ"פרויקטים חדשים" ל"כל צוות שכבר משתמש ב-i18n".
