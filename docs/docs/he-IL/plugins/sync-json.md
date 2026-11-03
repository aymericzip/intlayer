---
createdAt: 2025-03-13
updatedAt: 2026-11-03
priority: 6
title: "תוסף Sync JSON: שמירה על קובצי ה-JSON של ה-i18n שלכם"
description: "סנכרנו מילוני Intlayer עם קובצי JSON של i18next, next-intl, react-intl או vue-i18n, ונהלו, תרגמו ובדקו אותם באמצעות Intlayer."
keywords:
  - Intlayer
  - סנכרון JSON
  - Sync JSON
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - תרגומים
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 9.0.0
    date: 2026-06-21
    changes: "הוספת אפשרות splitKeys (מילון אחד לכל מפתח namespace ברמה העליונה) עבור מבנה קובץ יחיד ב-next-intl / react-intl"
  - version: 7.5.0
    date: 2025-12-13
    changes: "הוספת תמיכה בפורמטים ICU ו-i18next"
  - version: 6.1.6
    date: 2025-10-05
    changes: "תיעוד ראשוני עבור תוסף Sync JSON"
author: aymericzip
---

# Sync JSON (גשרי i18n) - סנכרון JSON עם תמיכה ב-ICU / i18next

<iframe title="How to keep your JSON translations in sync with Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

השתמשו ב-Intlayer כתוסף הרחבה למערך ה-i18n הקיים שלכם. תוסף זה שומר על סנכרון בין הודעות ה-JSON שלכם לבין מילוני Intlayer, כך שתוכלו:

- להמשיך להשתמש ב-i18next, next-intl, react-intl, vue-i18n, next-translate, nuxt-i18n, Solid-i18next, svelte-i18n וכו'.
- לנהל ולתרגם את ההודעות שלכם באמצעות Intlayer (ב-CLI, ב-CI, בספקים וב-CMS), ללא צורך בארגון מחדש (refactoring) של האפליקציה שלכם.
- להגיש הדרכות ותוכן SEO המכוונים לכל אקוסיסטם, תוך הצגת Intlayer כשכבת ניהול ה-JSON.

הערות והיקף תמיכה נוכחי:

- החצנה ל-CMS פועלת עבור תרגומים וטקסט רגיל.
- עדיין אין תמיכה בהזרקות (insertions), צורות רבים (plurals/ICU) או תכונות runtime מתקדמות של ספריות אחרות.
- העורך הוויזואלי עדיין אינו נתמך עבור פלטי i18n של צד שלישי.

## מתי להשתמש בתוסף זה

- אתם כבר משתמשים בספריית i18n ושומרים הודעות בקובצי JSON.
- אתם מעוניינים במילוי אוטומטי מבוסס AI, בדיקות ב-CI וניהול תוכן שוטף מבלי לשנות את סביבת הרינדור (rendering runtime) שלכם.

## התקנה

```bash
pnpm add -D @intlayer/sync-json-plugin
# או
npm i -D @intlayer/sync-json-plugin
```

## תוספים

חבילה זו מספקת שני תוספים:

- `loadJSON`: טעינת קובצי JSON לתוך מילוני Intlayer.
  - תוסף זה משמש לטעינת קובצי JSON ממקור נתון והמרתם למילוני Intlayer. הוא יכול לסרוק את כל בסיס הקוד ולחפש קובצי JSON ספציפיים.
    תוסף זה שימושי:
    - אם אתם משתמשים בספריית i18n שכופה מיקום ספציפי לטעינת ה-JSON שלכם (למשל `next-intl`, `i18next`, `react-intl`, `vue-i18n` וכו'), אך אתם מעוניינים למקם את הצהרת התוכן שלכם בכל מקום שתרצו בבסיס הקוד.
    - אם אתם מעוניינים למשוך את ההודעות שלכם ממקור מרוחק (למשל CMS, API וכו') ולשמור אותן בקובצי JSON.

  > מאחורי הקלעים, תוסף זה יסרוק את כל בסיס הקוד, יאתר קובצי JSON ספציפיים ויטען אותם לתוך מילוני Intlayer.
  > שימו לב כי תוסף זה אינו כותב את הפלט והתרגומים בחזרה לתוך קובצי ה-JSON.

- `syncJSON`: סנכרון קובצי JSON עם מילוני Intlayer.
  - תוסף זה משמש לסנכרון קובצי JSON עם מילוני Intlayer. הוא יכול לסרוק את המיקום הנתון ולטעון את קובצי ה-JSON התואמים לתבנית. תוסף זה שימושי אם ברצונכם ליהנות מיתרונות Intlayer בעת שימוש בספריית i18n אחרת.

## שימוש בשני התוספים יחד

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // שמירה על סנכרון קובצי ה-JSON הנוכחיים עם מילוני Intlayer
  plugins: [
    /**
     * יטען את כל קובצי ה-JSON בתיקיית src התואמים לתבנית {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // מבטיח שקובצי JSON אלה יקבלו עדיפות על פני קבצים ב-`./locales/en/${key}.json`
      format: "intlayer", // פורמט תוכן ה-JSON
    }),
    /**
     * יטען ויכתוב את הפלט והתרגומים בחזרה לקובצי ה-JSON בתיקיית locales
     */
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
      format: "i18next",
    }),
  ],
};

export default config;
```

## תוסף `syncJSON`

### תחילת עבודה מהירה

הוסיפו את התוסף לקובץ `intlayer.config.ts` שלכם וכוונו אותו למבנה ה-JSON הקיים שלכם.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // שמירה על סנכרון קובצי ה-JSON הנוכחיים עם מילוני Intlayer
  plugins: [
    syncJSON({
      // מבנה לפי שפה ולפי namespace (למשל next-intl, i18next עם namespaces)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "icu",
    }),
  ],
};

export default config;
```

חלופה: קובץ יחיד לכל שפה (נפוץ בהגדרות של i18next/react-intl):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
    }),
  ],
};

export default config;
```

#### כיצד זה פועל

- קריאה: התוסף מגלה קובצי JSON מתוך בונה ה-`source` וטוען אותם כמילוני Intlayer.
- כתיבה: לאחר בנייה ומילוי תרגומים, הוא כותב JSON מתורגם בחזרה לאותם הנתיבים (עם שורה חדשה בסוף הקובץ למניעת בעיות עיצוב).
- מילוי אוטומטי (Auto-fill): התוסף מצהיר על נתיב `autoFill` לכל מילון. הרצת `intlayer fill` מעדכנת כברירת מחדל רק תרגומים חסרים בקובצי ה-JSON שלכם.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // חובה
  location?: string, // תווית אופציונלית, ברירת מחדל: "plugin"
  priority?: number, // עדיפות אופציונלית לפתרון התנגשויות, ברירת מחדל: 0
  format?: 'intlayer' | 'icu' | 'i18next', // מעצב אופציונלי, משמש לתאימות runtime עם intlayer
  splitKeys?: boolean, // אופציונלי, פיצול קובץ יחיד למילון אחד לכל מפתח ברמה העליונה (מזוהה אוטומטית)
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

מגדיר באיזה מעצב (formatter) להשתמש עבור תוכן המילון בעת סנכרון קובצי JSON. מאפשר שימוש בתחבירי עיצוב הודעות שונים התואמים לזמן הריצה של Intlayer.

- `undefined`: לא ייעשה שימוש במעצב, ותוכן ה-JSON ישמש כפי שהוא.
- `'intlayer'`: מעצב ברירת המחדל של Intlayer (ברירת מחדל).
- `'icu'`: עושה שימוש בעיצוב הודעות ICU (תואם לספריות כגון react-intl, vue-i18n).
- `'i18next'`: עושה שימוש בעיצוב הודעות i18next (תואם ל-i18next, next-i18next, Solid-i18next).

> שימו לב כי שימוש במעצב עשוי לשנות את תוכן ה-JSON בקלט ובפלט. עבור כללי JSON מורכבים כמו צורות רבים ב-ICU, תהליך הפענוח עשוי לא להבטיח מיפוי של 1 ל-1 בין הקלט לפלט.
> אם אינכם משתמשים בזמן הריצה של Intlayer, ייתכן שתעדיפו לא להגדיר מעצב.

**דוגמה:**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // שימוש בעיצוב i18next לצורכי תאימות
}),
```

#### `splitKeys` (boolean)

שולט בשאלה האם קובץ JSON יחיד שבו **המפתחות ברמה הראשונה הם namespaces** יפוצל למילון אחד לכל מפתח ברמה העליונה, במקום מילון בודד המכיל את הקובץ כולו.

זה מתאים למודל ה-namespaces של ספריות כמו `next-intl` ו-`react-intl`, שבהן קובץ `messages/{locale}.json` יחיד מקבץ מספר namespaces לפי המפתחות ברמה הראשונה, כאשר לכל אחד מהם ניגשים בנפרד (לדוגמה `useTranslations('Hero')` פונה למילון `Hero`).

- `undefined` (ברירת מחדל): **מזוהה אוטומטית**. הקובץ מפוצל כאשר תבנית ה-`source` אינה מכילה מקטע `{key}` (קובץ אחד המכיל את כל ה-namespaces), ונשמר כמילון יחיד במקרים אחרים (קובץ אחד לכל מפתח).
- `true`: תמיד מפצל כל מפתח ברמה העליונה למילון עצמאי משלו.
- `false`: לעולם אינו מפצל, הקובץ כולו הופך למילון יחיד.

בהינתן קובץ `messages/{locale}.json` יחיד:

```json fileName="messages/en.json"
{
  "Hero": { "title": "Full-stack developer" },
  "Nav": { "work": "Work", "about": "About" },
  "About": { "lead": "I build apps end to end." }
}
```

```ts fileName="intlayer.config.ts"
syncJSON({
  format: "icu",
  source: ({ locale }) => `./messages/${locale}.json`,
  // splitKeys: true, // משתמע מכך שהתבנית אינה כוללת מקטע `{key}`
}),
```

הגדרה זו מייצרת שלושה מילונים (`Hero`, `Nav` ו-`About`), כך ש-`useTranslations('Hero')` (ב-next-intl) מפוענח נכון. בעת כתיבה חוזרת לקובץ, כל ה-namespaces מאוחדים מחדש לאותו קובץ לכל שפה.

> כאשר אתם שומרים על מקטע `{key}` מפורש ב-`source` שלכם (למשל `./locales/${locale}/${key}.json`), כל קובץ מהווה ממילא namespace נפרד, ולכן הפיצול מושבת כברירת מחדל.

### מקורות JSON מרובים ומערכת עדיפויות

תוכלו להוסיף מספר תוספי `syncJSON` כדי לסנכרן מקורות JSON שונים. הדבר שימושי כאשר יש לכם מספר ספריות i18n או מבני JSON שונים בפרויקט שלכם.

#### מערכת עדיפויות (Priority system)

כאשר מספר תוספים מכוונים לאותו מפתח מילון, הפרמטר `priority` קובע איזה תוסף יקבל קדימות:

- מספרי עדיפות גבוהים יותר גוברים על נמוכים יותר
- עדיפות ברירת המחדל של קובצי `.content` היא `0`
- עדיפות ברירת המחדל של תוספים היא `0`
- תוספים בעלי אותה עדיפות מעובדים לפי סדר הופעתם בקובץ התצורה

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // מקור JSON ראשי (העדיפות הגבוהה ביותר)
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // מקור JSON משני (עדיפות נמוכה יותר)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // מקור JSON מדור קודם (legacy, העדיפות הנמוכה ביותר)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## תוסף Load JSON

### תחילת עבודה מהירה

הוסיפו את התוסף לקובץ `intlayer.config.ts` כדי לקלוט קובצי JSON קיימים כמילוני Intlayer. תוסף זה מיועד לקריאה בלבד (ללא כתיבה לדיסק):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // קליטת הודעות JSON הממוקמות בכל מקום בעץ קובצי המקור שלכם
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
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
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadJSON({
      // רק קבצים עבור Locales.FRENCH ייטענו מתבנית זו
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### כיצד זה פועל

- גילוי: בונה glob מתוך הגדרת ה-`source` ואוסף קובצי JSON תואמים.
- קליטה: טוען כל קובץ JSON כמילון Intlayer עם ה-`locale` שסופק.
- קריאה בלבד: אינו כותב או מעצב קובצי פלט. השתמשו ב-`syncJSON` אם אתם זקוקים לסנכרון דו-כיווני.
- מוכן למילוי אוטומטי: מגדיר תבנית `fill` כך ש-`intlayer content fill` יוכל לאכלס מפתחות חסרים.

### API

```ts
loadJSON({
  // בניית נתיבים לקובצי ה-JSON שלכם. `locale` אופציונלי אם במבנה שלכם אין מקטע שפה
  source: ({ key, locale }) => string,

  // שפת יעד עבור המילונים הנטענים על ידי מופע תוסף זה
  // ברירת מחדל: configuration.internationalization.defaultLocale
  locale?: Locale,

  // תווית אופציונלית לזיהוי המקור
  location?: string, // ברירת מחדל: "plugin"

  // עדיפות המשמשת לפתרון התנגשויות מול מקורות אחרים
  priority?: number, // ברירת מחדל: 0

  // מעצב אופציונלי עבור תוכן ה-JSON
  format?: 'intlayer' | 'icu' | 'i18next', // ברירת מחדל: 'intlayer'

  // פיצול קובץ יחיד למילון אחד לכל מפתח ברמה העליונה (מזוהה אוטומטית)
  splitKeys?: boolean,
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

מגדיר באיזה מעצב להשתמש עבור תוכן המילון בעת טעינת קובצי JSON. מאפשר שימוש בתחבירי עיצוב הודעות שונים התואמים למגוון ספריות i18n.

- `'intlayer'`: מעצב ברירת המחדל של Intlayer (ברירת מחדל).
- `'icu'`: עושה שימוש בעיצוב הודעות ICU (תואם לספריות כמו react-intl, vue-i18n).
- `'i18next'`: עושה שימוש בעיצוב הודעות i18next (תואם ל-i18next, next-i18next, Solid-i18next).

**דוגמה:**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // שימוש בעיצוב ICU לצורכי תאימות
}),
```

#### `splitKeys` (boolean)

התנהגות זהה לזו שב-[`syncJSON`](#splitkeys-boolean): כאשר קובץ JSON בודד מקבץ מספר namespaces לפי המפתחות ברמה הראשונה שלו, כל מפתח ברמה העליונה הופך למילון עצמאי.

- `undefined` (ברירת מחדל): **מזוהה אוטומטית**. מפצל כאשר תבנית ה-`source` אינה מכילה מקטע `{key}`, ומייצר מילון יחיד במקרים אחרים.
- `true` / `false`: אילוץ או השבתה של הפיצול.

```ts
loadJSON({
  source: ({ locale }) => `./messages/${locale}.json`,
  format: "icu",
  // splitKeys מופעל אוטומטית: `Hero`, `Nav`, `About` וכו' הופכים כל אחד למילון נפרד
}),
```

### התנהגות ומוסכמות

- אם מסכת ה-`source` שלכם כוללת מציין שפה (locale placeholder), רק קבצים עבור ה-`locale` הנבחר ייקלטו.
- אם אין מקטע `{key}` במסכה שלכם, כל מפתח ברמה העליונה של הקובץ הופך למילון עצמאי כברירת מחדל (ראו [`splitKeys`](#splitkeys-boolean)). הגדירו `splitKeys: false` כדי לטעון במקום זאת את הקובץ כולו כמילון `index` יחיד.
- מפתחות נגזרים מנתיבי קבצים על ידי החלפת מציין המיקום `{key}` בבונה ה-`source` שלכם.
- התוסף משתמש רק בקבצים שנתגלו ואינו ממציא שפות או מפתחות חסרים.
- נתיב ה-`fill` מוסק מתוך ה-`source` שלכם ומשמש לעדכון ערכים חסרים באמצעות ה-CLI כאשר אתם בוחרים בכך.

## פתרון התנגשויות (Conflict resolution)

כאשר אותו מפתח תרגום קיים במספר מקורות JSON:

1. התוסף בעל העדיפות הגבוהה ביותר קובע את הערך הסופי
2. מקורות בעלי עדיפות נמוכה יותר משמשים כגיבוי (fallbacks) עבור מפתחות חסרים
3. הדבר מאפשר לכם לתחזק תרגומים ממערכות ישנות תוך מעבר הדרגתי למבנים חדשים

## CLI

קובצי ה-JSON המסונכרנים ייחשבו כקובצי `.content` לכל דבר. המשמעות היא שכל פקודות intlayer יהיו זמינות עבור קובצי ה-JSON המסונכרנים, כולל:

- `intlayer content test` כדי לבדוק אם קיימים תרגומים חסרים
- `intlayer content list` כדי להציג את רשימת קובצי ה-JSON המסונכרנים
- `intlayer content fill` כדי למלא תרגומים חסרים
- `intlayer content push` כדי לדחוף את קובצי ה-JSON המסונכרנים
- `intlayer content pull` כדי למשוך את קובצי ה-JSON המסונכרנים

ראו [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md) לפרטים נוספים.

- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md)

## מגבלות נוכחיות

- אין תמיכה בהזרקות (insertions) או צורות רבים ב-ICU בעת עבודה מול ספריות צד שלישי.
- העורך הוויזואלי אינו זמין עדיין עבור סביבות ריצה שאינן של Intlayer.
- סנכרון JSON בלבד; פורמטים של קטלוגים שאינם JSON אינם נתמכים.

## מדוע זה חשוב

- אנו יכולים להמליץ על פתרונות i18n מבוססים ולמצב את Intlayer כתוסף ערך מוסף (add-on).
- אנו מנצלים את ה-SEO ומילות המפתח שלהם באמצעות מדריכים המסתיימים בהמלצה על Intlayer לניהול JSON.
- מרחיב את קהל היעד מ"פרויקטים חדשים" ל"כל צוות שכבר משתמש ב-i18n".
