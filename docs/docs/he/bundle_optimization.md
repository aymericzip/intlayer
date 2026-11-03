---
createdAt: 2025-11-25
updatedAt: 2026-11-03
priority: 8
title: "אופטימיזציית גודל ה-Bundle וביצועי i18n"
description: "הפחיתו את גודל ה-bundle של האפליקציה על ידי אופטימיזציה של תוכן בינאום (i18n). למדו כיצד למנף tree shaking וטעינה עצלה (lazy loading) עבור מילונים עם Intlayer."
keywords:
  - אופטימיזציית Bundle
  - אוטומציית תוכן
  - תוכן דינמי
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 9.2.1
    date: 2026-08-09
    changes: "`purge` ו-`minify` פועלים כעת ב-Next.js דרך `@intlayer/swc`, ללא צורך ב-`babel.config.js`"
  - version: 8.12.0
    date: 2026-06-24
    changes: "פירוט תוספי Babel לפי סדר צינור העבודה הנדרש (extract ← purge ← minify ← optimize) בטבלאות העיון"
  - version: 8.12.0
    date: 2026-06-07
    changes: "הוספת `intlayerPurgeBabelPlugin` ו-`intlayerMinifyBabelPlugin` עבור Babel/Webpack; הבהרת צינור התוספים"
  - version: 8.7.0
    date: 2026-04-08
    changes: "הוספת אפשרויות `minify` ו-`purge` להגדרות הבנייה"
author: aymericzip
---

# אופטימיזציית גודל ה-Bundle וביצועי i18n

אחד האתגרים הנפוצים ביותר בפתרונות i18n מסורתיים הנשענים על קובצי JSON הוא ניהול גודל התוכן. אם מפתחים אינם מפרידים ידנית את התוכן ל-namespaces, משתמשים מוצאים את עצמם לעיתים קרובות מורידים תרגומים של כל דף ובפוטנציאל של כל שפה רק כדי לצפות בדף בודד.

**Intlayer פותר בעיה זו באמצעות אופטימיזציה בזמן הבנייה.** הוא מנתח את הקוד שלכם כדי לזהות אילו מילונים נמצאים בשימוש בפועל בכל רכיב, ומזריק מחדש רק את התוכן הנדרש לתוך ה-bundle שלכם.

## תוכן עניינים

<TOC />

## בעיות שיש לזכור

פתרון i18n מוסיף משקל ל-bundle שלכם בחמש דרכים, ו-Intlayer מטפל בכל אחת מהן:

1. **קוד הספרייה.** Intlayer שומר על פונקציות קומפקטיות, משתף לוגיקה ביניהן ותומך באופן מלא ב-tree-shaking: כל פונקציה שאינכם משתמשים בה מושמטת על ידי ה-bundler שלכם.

2. **תוכן מדפים ומשפות אחרות.** ספריית i18n ממוצעת שוקלת בין 5KB ל-25KB, בעוד שתוכן הטקסט של דף במקטע (chunk) של JS שוקל בין 20KB ל-60KB. העלות האמיתית היא "דליפת תוכן" (content leakage): אפליקציה עם 10 דפים ב-10 שפות עלולה לשלוח תוכן של 100 דפים כאשר רק **אחד** נחוץ בפועל. Intlayer מבצע טרנספורמציה לקוד שלכם בזמן הבנייה (תוספי Babel / SWC / Vite) כדי לטעון אך ורק את התוכן של הדף הנוכחי בשפה הנוכחית.

   ![דליפת תוכן תיאורטית לפי ארכיטקטורה](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

   הגרף מעריך עלות זו עבור 1 עד 10 דפים ב-1 עד 10 שפות, עם כ-30KB של טקסט לדף. ייבוא דינמי מסיר את ציר השפות, תוכן לפי רכיב מסיר את ציר הדפים, ורק השילוב ביניהם שומר על גודל נתונים מינימלי וקבוע.

3. **תכונות שאינן בשימוש.** עוגיות (cookies), אחסון מקומי (local storage), קידומות URL, גיבוי תוכן (fallback), פורמט הודעות ICU: כל תכונה מוסיפה לוגיקה. במקום לייצר קוד ישירות לתוך בסיס הקוד שלכם (כפי שעושה Paraglide),‏ Intlayer מזריק משתני סביבה בזמן הבנייה מתוך התצורה שלכם, כך שה-bundler יכול להסיר כל תכונה שאינה בשימוש.

4. **תוכן לא מנוצל ומילולי מדי.** ב-Vite וב-Next.js,‏ Intlayer [מנקה (purges)](#purging-unused-field-removal) את שדות המילון שהקוד שלכם אינו קורא לעולם ו-[ממזער (minifies)](#minification-field-key-renaming) את המפתחות הנותרים.

5. **תוכן כפול.** מילונים החולקים את אותו המפתח, בין אם הם מגיעים ממספר קובצי `.content` או ממקורות מקומיים ומרוחקים ([CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)), ממוזגים למילון יחיד.

## כיצד זה פועל

Intlayer משתמש ב**גישה לפי רכיב (per-component)**. בניגוד לקובצי JSON גלובליים, התוכן שלכם מוגדר לצד הרכיבים או בתוכם. במהלך תהליך הבנייה, Intlayer:

1. **מנתח** את הקוד שלכם כדי לאתר קריאות `useIntlayer`.
2. **בונה** את תוכן המילון המתאים.
3. **מחליף** את קריאת `useIntlayer` בקוד מותאם וממוטב בהתאם להגדרות שלכם.

פעולה זו מבטיחה כי:

- אם רכיב אינו מיובא, התוכן שלו אינו נכלל ב-bundle (סילוק קוד מת, Dead Code Elimination).
- אם רכיב נטען בטעינה עצלה (lazy-loaded), התוכן שלו נטען גם הוא בטעינה עצלה.

## הגדרה לפי פלטפורמה

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js דורש את התוסף `@intlayer/swc`, כיוון ש-Next.js משתמש ב-SWC לצורך בנייה. החל מגרסה **v9.2.1**, חבילה בודדת זו מכסה את כל צינור העבודה: אופטימיזציה (שכתוב ייבוא), ניקוי (purge) ומזעור (minify).

> תוסף זה אינו מותקן כברירת מחדל מכיוון שתוספי SWC עדיין נחשבים ניסיוניים ב-Next.js. הדבר עשוי להשתנות בעתיד.

> **Next.js 16.1.0 היא גרסת המינימום.** זוהי הגרסה הראשונה שנבנתה על בסיס ה-Wasm plugin ABI התואם לעתיד של SWC; גרסאות מוקדמות יותר דוחות את התוסף. הפונקציה `withIntlayer` מזהה את גרסת ה-Next.js שלכם ופשוט אינה רושמת את התוסף בגרסאות הנמוכות מ-16.1.0. בניית הפרויקט עדיין תצליח, אך תפעל ללא אופטימיזציית bundle.

<Tabs>
 <Tab value="npm">

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

 </Tab>
 <Tab value="Crates.io (rust)">

```toml fileName="Cargo.toml"
[dependencies]
intlayer-swc-plugin = "*"
```

[צפייה ב-Crates.io](https://crates.io/crates/intlayer-swc-plugin)

 </Tab>
</Tabs>

לאחר ההתקנה, Intlayer יזהה וישתמש בתוסף באופן אוטומטי.

שלבי ה-**purge ו-minify** (הסרת שדות ושינוי שמות שדות) אינם דורשים חבילה נוספת וללא צורך ב-`babel.config.js`. עטפו את ההגדרות שלכם באמצעות `withIntlayer` והפעילו את הדגלים ב-`intlayer.config.ts`:

```typescript fileName="next.config.ts"
import { withIntlayer } from "next-intlayer/server";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {/* ההגדרות שלכם */};

export default withIntlayer(nextConfig);
```

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // הסרת שדות תוכן שאינם בשימוש מקובצי JSON הארוזים
    minify: true, // שינוי שמות מפתחות שדות תוכן לכינויים קצרים
  },
};

export default config;
```

במהלך `next build`, הפונקציה `withIntlayer` מנתחת את קובצי המקור שלכם, משכתבת את המילונים המהודרים, ומעבירה את טבלאות שינוי השמות ל-`@intlayer/swc`, אשר מעדכן את גישות המאפיינים התואמות בקוד שלכם.

> השתמשו ב-`withIntlayer` האסינכרוני, ולא ב-`withIntlayerSync`. הגרסה הסינכרונית אינה מריצה את צינור הניתוח, ולכן ל-purge ול-minify לא תהיה השפעה עימה.

> purge ו-minify פועלים ב-`next build` בלבד, צינור האופטימיזציה כבוי במהלך `next dev`.

**גרסאות מוקדמות יותר (לפני 9.2.1)** דרשו את `@intlayer/babel` וקובץ `babel.config.js` שהצהיר על `intlayerPurgeBabelPlugin` ו-`intlayerMinifyBabelPlugin`. קובץ זה אינו נחוץ עוד וניתן למחוק אותו.

 </Tab>
 <Tab value="vite">

### Vite

Vite משתמש בתוסף `@intlayer/babel`, הכלול כתלות של `vite-intlayer`. צינור האופטימיזציה המלא (שכתוב ייבוא, purge, ו-minify) מופעל כברירת מחדל ואינו דורש רישום תוספים נוסף.

הפעילו את purge ו-minify על ידי הגדרת הדגלים המתאימים ב-`intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // הסרת שדות תוכן שאינם בשימוש מקובצי JSON הארוזים
    minify: true, // שינוי שמות מפתחות שדות תוכן לכינויים קצרים
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (ו-Next.js עם Babel)

התקינו את `@intlayer/babel`:

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

הוסיפו את כל ארבעת התוספים ל-`babel.config.js` לפי הסדר הנכון:

```javascript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  plugins: [
    // Extract: הידור קובצי .content.ts ← .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: הסרת שדות שאינם בשימוש מתוך .intlayer/**/*.json
    //    (קורא את דגל build.purge מתוך intlayer.config.ts)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: שינוי שמות מפתחות שדות ב-JSON ובקוד המקור
    //    (קורא את דגל build.minify מתוך intlayer.config.ts)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: שכתוב useIntlayer('key') ← useDictionary(hash)
    //    חייב להופיע אחרון מכיוון שהוא מוחק את מפתח המילון.
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## מדריך תוספים

אופטימיזציית הבנייה של Intlayer מחולקת למספר תוספים נפרדים, שלכל אחד מהם אחריות ייעודית בודדת. הבנת התפקיד של כל אחד מהם מונעת בלבול בעת חיבורם.

### תוספי Babel (`@intlayer/babel`)

אלו משמשים ישירות ב-`babel.config.js` עבור הגדרות מבוססות Webpack (Next.js עם Babel, CRA, Webpack מותאם אישית וכו').

הטבלה שלהלן מפרטת אותם לפי סדר צינור העבודה הנדרש (אותו סדר שבו עליהם להופיע ב-`babel.config.js`):

| תוסף                          | תפקיד                                                                                                    |
| :---------------------------- | :------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | סורק קובצי `.content.ts` וכותב מילונים מהודרים ל-`.intlayer/`                                            |
| `intlayerPurgeBabelPlugin`    | סורק את כל קובצי המקור, מסיר **שדות תוכן שאינם בשימוש** מתוך קובצי המילון `.intlayer/**/*.json`          |
| `intlayerMinifyBabelPlugin`   | **משנה שמות של מפתחות שדות תוכן** לכינויים אלפביתיים קצרים (`title` ← `a`) הן בקובצי JSON והן בקוד המקור |
| `intlayerOptimizeBabelPlugin` | משכתב `useIntlayer('key')` ← `useDictionary(hash)` ומזריק את ה-`import` התואם של המילון                  |

> **סדר התוספים קריטי.** בקובץ ה-`babel.config.js` שלכם, תוספי ה-purge וה-minify חייבים להופיע **לפני** תוסף ה-optimize. שלב ה-optimize מחליף את `useIntlayer('key')` בקריאת `useDictionary(hash)` אטומה, מה שמוחק את פרטי מפתח המילון ששלבי ה-purge וה-minify זקוקים להם כדי לזהות אילו שדות נמצאים בשימוש.

לכל תוסף Babel יש פונקציית עזר מתאימה לקריאת אפשרויות, אשר קוראת את ה-`intlayer.config.ts` שלכם פעם אחת בעת טעינת התצורה ומחזירה ערכים מוגדרים מראש:

| פונקציית עזר לאפשרויות       | משמש עם                       |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |

### תוספי Vite (`vite-intlayer`)

משתמשי Vite **אינם מגדירים אלה ישירות לעולם**. הם מחוברים אוטומטית בעת קריאה ל-`withIntlayer()` ב-`vite.config.ts`. הדגלים `build.purge` ו-`build.minify` ב-`intlayer.config.ts` מפעילים את ההתנהגות המתאימה ללא צורך ברישום תוסף נוסף.

| תוסף Vite פנימי                 | התנהגות מקבילה                                                                          |
| :------------------------------ | :-------------------------------------------------------------------------------------- |
| מנתח שימוש (Usage analyzer)     | זהה לשלב הניתוח של `intlayerPurgeBabelPlugin`                                           |
| ניקוי מילון (Dictionary prune)  | זהה לשלב כתיבת ה-JSON של `intlayerPurgeBabelPlugin`                                     |
| מזעור מילון (Dictionary minify) | זהה לשלב כתיבת ה-JSON של `intlayerMinifyBabelPlugin`                                    |
| טרנספורמציית Babel              | זהה לשינוי שמות קוד המקור ב-`intlayerMinifyBabelPlugin` + `intlayerOptimizeBabelPlugin` |

### תוסף SWC (`@intlayer/swc`)

משתמשי Next.js **אינם מגדירים אלה ישירות לעולם** גם כן. החל מגרסה **v9.2.1**, הפונקציה `withIntlayer()` ב-`next.config.ts` מריצה את הצינור המלא (purge, minify ושכתוב ייבוא) מתוך הדגלים `build.purge` ו-`build.minify` בלבד.

העבודה מפוצלת לשניים, כיוון שתוסף SWC Wasm מעבד קובץ אחד בכל פעם ללא גישה למערכת הקבצים:

| שלב                                     | היכן הוא רץ                   | מה הוא עושה                                                                         |
| :-------------------------------------- | :---------------------------- | :---------------------------------------------------------------------------------- |
| ניתוח שימוש + purge/minify ל-JSON       | ב-Node, בתוך `withIntlayer()` | קורא כל קובץ מקור של רכיב, משכתב את `.intlayer/**/*.json`, ומייצר טבלאות שינוי שמות |
| שכתוב קוד מקור (`content.title` ← `.a`) | ב-`@intlayer/swc` (Wasm)      | מחיל את טבלאות שינוי השמות על גישות המאפיינים התואמות בקוד שלכם                     |
| שכתוב ייבוא (`useIntlayer` ← מילון)     | ב-`@intlayer/swc` (Wasm)      | זהה ל-`intlayerOptimizeBabelPlugin`                                                 |

ההחלטה _אילו_ שדות אינם בשימוש ו_איזה_ כינוי יקבל כל אחד דורשת ניהול מצב חוצה-קבצים וגישת I/O לקבצים, ולכן מחצית זו רצה ב-Node; תוסף ה-SWC מקבל רק את הטבלאות שנוצרו.

## הגדרות (Configuration)

תוכלו לשלוט באופן שבו Intlayer מבצע אופטימיזציה ל-bundle שלכם דרך המאפיין `build` בקובץ `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // החלפת קריאות useIntlayer() בייבוא ישיר של מילונים בזמן הבנייה.
    // undefined = אוטומטי (מופעל בייצור), true = תמיד, false = לעולם לא.
    optimize: undefined,

    // שינוי שמות מפתחות שדות תוכן במילונים מהודרים לכינויים
    // אלפביתיים קצרים (למשל title ← a). מקטין את גודל ה-JSON; דורש optimize.
    minify: true,

    // הסרת שדות תוכן שלעולם אינם נגישים בקוד המקור.
    // דורש optimize.
    purge: true,
  },
};

export default config;
```

> שמירה על ערך ברירת המחדל (`undefined`) עבור `optimize` מומלצת במרבית המקרים.

> עיינו במדריך ההגדרות לכל האפשרויות: [הגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

- [הגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

### אפשרויות בנייה

| מאפיין         | טיפוס                 | ברירת מחדל  | תיאור                                                                                                                                                   |
| :------------- | :-------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`optimize`** | `boolean / undefined` | `undefined` | מפעיל את שלב שכתוב הייבוא. `undefined` = פעיל רק בבניית ייצור. `false` משבית גם את purge ו-minify.                                                      |
| **`minify`**   | `boolean`             | `false`     | משנה שמות מפתחות שדות תוכן בקובצי JSON מהודרים לכינויים קצרים. משכתב בנוסף גישות מאפיינים תואמות בקוד המקור. חסר השפעה כאשר `optimize` מוגדר כ-`false`. |
| **`purge`**    | `boolean`             | `false`     | מסיר שדות תוכן שלעולם אינם נגישים סטטית מתוך קובצי JSON מהודרים. חסר השפעה כאשר `optimize` מוגדר כ-`false`.                                             |

### מזעור (שינוי שמות מפתחות שדות)

ההגדרה `build.minify` **אינה** ממזערת את ה-bundle של ה-JavaScript שלכם, ה-bundler שלכם מטפל בכך. במקום זאת, היא מכווצת את קובצי ה-JSON של המילונים המהודרים על ידי החלפת כל מפתח שדה שהוגדר על ידי המשתמש בכינוי אלפביתי קצר:

```
// לפני מזעור
{ "title": "Hello", "subtitle": "World" }

// אחרי מזעור
{ "a": "Hello", "b": "World" }
```

אותו שינוי שם מוחל על כל גישות המאפיינים בקוד המקור שלכם, כך ש-`content.title` הופך ל-`content.a` בפלט המהודר. התנהגות זמן הריצה נותרת זהה לחלוטין.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> המזעור מדולג כאשר `optimize` מוגדר כ-`false`. כאשר `editor.enabled` מוגדר כ-`true` הוא עדיין פועל, אך ללא שלב שינוי שמות השדות, כיוון שהעורך הוויזואלי מפענח עריכות לפי `keyPath`, ולכן שמות השדות המקוריים חייבים להישמר.

> ב-Next.js, המזעור מדולג גם כאשר `@intlayer/swc` אינו מותקן או שאינו ניתן לטעינה (גרסאות Next.js מתחת ל-16.1.0). התוסף הוא החלק שמשכתב את הגישות בקוד המקור, ולכן שינוי שמות המילונים בלעדיו יגרום לקוד שלכם לקרוא שמות שדות שכבר אינם קיימים.

> המזעור מדולג גם עבור מילונים הנטענים דרך `importMode: 'fetch'` כיוון שה-JSON שלהם מוגש מ-API מרוחק באמצעות שמות השדות המקוריים, ושינוי שמות המפתחות בצד הלקוח ישבור את החוזה בין השרת ללקוח.

### ניקוי (הסרת שדות שאינם בשימוש)

ההגדרה `build.purge` מנתחת אילו שדות תוכן נגישים בפועל בקוד המקור שלכם ומסירה את כל השאר מקובצי ה-JSON המהודרים.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**דוגמה:** מילון בעל חמישה שדות שרק בשניים מהם נעשה שימוש:

```
// לפני ניקוי
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// אחרי ניקוי (רק title + subtitle נגישים בקוד המקור)
{ "title": "…", "subtitle": "…" }
```

> הניקוי מדולג כאשר `optimize` מוגדר כ-`false`. הוא נשאר פעיל כאשר `editor.enabled` מוגדר כ-`true`, שכן שדה שנוקה אינו נקרא על ידי אף רכיב, ולכן העורך לעולם אינו מרנדר אותו. ב-Next.js הוא מדולג בנוסף כאשר `@intlayer/swc` אינו זמין, וכאשר מוגדרים קוראים של compat-adapters.

> הניקוי מדולג גם באופן שמרני כאשר לא ניתן לנתח קובץ מקור, או כאשר תוצאת `useIntlayer` מוקצית למשתנה ומועברת בדרכים שהמנתח הסטטי אינו יכול לעקוב אחריהן (למשל פיזור spread לתוך אובייקט, העברה כ-prop ללא destructuring). במקרים אלו המילון המלא נשמר.

### מצב ייבוא (Import Mode)

עבור אפליקציות גדולות, הכוללות מספר דפים ושפות, קובצי ה-JSON שלכם עשויים לייצג חלק ניכר מגודל ה-bundle שלכם. Intlayer מאפשר לכם לשלוט באופן טעינת המילונים באמצעות האפשרות `importMode`.

### הגדרה גלובלית

ניתן להגדיר את מצב הייבוא באופן גלובלי בקובץ `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // ברירת המחדל היא 'static'
  },
};

export default config;
```

### הגדרה ברמת המילון הבודד

תוכלו לדרוס את מצב הייבוא עבור מילונים ספציפיים בקובצי ה-`.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}` שלהם.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // דריסת מצב הייבוא של ברירת המחדל
  content: {
    // ...
  },
};

export default appContent;
```

| מאפיין           | טיפוס                              | ברירת מחדל | תיאור                                                                                                    |
| :--------------- | :--------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **מיושן (Deprecated)**: השתמשו ב-`dictionary.importMode` במקום זאת. קובע כיצד מילונים נטענים (ראו להלן). |

ההגדרה `importMode` קובעת כיצד תוכן המילון מוזרק לתוך הרכיב שלכם. ניתן להגדיר אותה גלובלית ב-`intlayer.config.ts` תחת אובייקט `dictionary`, או לדרוס אותה לפי מילון בקובץ ה-`.content.ts` שלו.

### 1. מצב סטטי (`ברירת מחדל`)

במצב סטטי, Intlayer מחליף את `useIntlayer` ב-`useDictionary` ומזריק את המילון ישירות לתוך ה-bundle של ה-JavaScript.

- **יתרונות:** רינדור מיידי (סינכרוני), אפס בקשות רשת נוספות במהלך הידרציה (hydration).
- **חסרונות:** ה-bundle כולל תרגומים עבור **כל** השפות הזמינות עבור אותו רכיב ספציפי.
- **הכי מתאים עבור:** Single Page Applications (SPA).

**דוגמת קוד לאחר טרנספורמציה:**

```tsx
// הקוד שלכם
const content = useIntlayer("my-key");

// איור קוד ממוטב לאחר טרנספורמציה (סטטי)
// להמחשה בלבד, הקוד בפועל יהיה שונה משיקולי אופטימיזציה
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. מצב דינמי (Dynamic Mode)

במצב דינמי, Intlayer מחליף את `useIntlayer` ב-`useDictionaryAsync`. הדבר עושה שימוש ב-`import()` (מנגנון דמוי Suspense) כדי לטעון בטעינה עצלה אך ורק את ה-JSON של השפה הנוכחית.

- **יתרונות:** **Tree shaking ברמת השפה.** משתמש הצופה בגרסה האנגלית יוריד _רק_ את המילון באנגלית. המילון בצרפתית לעולם אינו נטען.
- **חסרונות:** מפעיל בקשת רשת (שליפת נכס) לכל רכיב במהלך הידרציה.
- **הכי מתאים עבור:** גושי טקסט גדולים, מאמרים, או אפליקציות התומכות בשפות רבות שבהן גודל ה-bundle הוא קריטי.

**דוגמת קוד לאחר טרנספורמציה:**

```tsx
// הקוד שלכם
const content = useIntlayer("my-key");

// איור קוד ממוטב לאחר טרנספורמציה (דינמי)
// להמחשה בלבד, הקוד בפועל יהיה שונה משיקולי אופטימיזציה
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  fr: () =>
    import(".intlayer/dynamic_dictionary/my-key/fr.json").then(
      (mod) => mod.default
    ),
});
```

> בעת שימוש ב-`importMode: 'dynamic'`, אם יש לכם 100 רכיבים המשתמשים ב-`useIntlayer` בדף בודד, הדפדפן ינסה לבצע 100 שליפות נפרדות. כדי להימנע מ"מפל" (waterfall) בקשות זה, קבצו תוכן לפחות קובצי `.content` (למשל מילון אחד לכל סקשן בדף) במקום מילון לכל רכיב אטומי. ניתן גם להשתמש במספר קובצי `.content` המשתמשים באותו המפתח. Intlayer ימזג אותם למילון בודד.

### 3. מצב Fetch

מתנהג בדומה למצב דינמי אך מנסה תחילה לשלוף מילונים מה-API של Intlayer Live Sync. אם קריאת ה-API נכשלת או שהתוכן אינו מסומן לעדכונים חיים, הוא נסוג לייבוא דינמי.

**דוגמת קוד לאחר טרנספורמציה:**

```tsx
// הקוד שלכם
const content = useIntlayer("my-key");

// איור קוד ממוטב (Fetch)
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  fr: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/fr").then((res) =>
      res.json()
    ),
});
```

> עיינו בתיעוד ה-CMS לפרטים נוספים: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

> במצב fetch, ניקוי (purge) ומזעור (minify) אינם מוחלים כיוון שה-JSON מוגש מ-API מרוחק באמצעות שמות השדות המקוריים.

## סיכום: סטטי מול דינמי

| תכונה                 | מצב סטטי                                | מצב דינמי                       |
| :-------------------- | :-------------------------------------- | :------------------------------ |
| **גודל JS Bundle**    | גדול יותר (כולל את כל השפות עבור הרכיב) | הקטן ביותר (קוד בלבד, ללא תוכן) |
| **טעינה ראשונית**     | מיידית (התוכן נמצא ב-bundle)            | השהיה קלה (שולף JSON)           |
| **בקשות רשת**         | 0 בקשות נוספות                          | בקשה אחת לכל מפתח מילון         |
| **Tree Shaking**      | ברמת הרכיב                              | ברמת הרכיב + ברמת השפה          |
| **תרחיש שימוש מומלץ** | רכיבי UI, אפליקציות קטנות               | דפים מרובי טקסט, שפות רבות      |

## סריקת ה-Bundle שלכם

ניתוח ה-bundle שלכם הוא הדרך הישירה ביותר לזהות קובצי JSON "כבדים" והזדמנויות לפיצול קוד (code-splitting). כלים אלו מייצרים מפת עצים (treemap) חזותית של הקוד המהודר של האפליקציה שלכם, ומאפשרים לכם לראות בדיוק אילו ספריות צורכות את מירב השטח.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite משתמש ב-Rollup מאחורי הקלעים. התוסף `rollup-plugin-visualizer` מייצר קובץ HTML אינטראקטיבי המציג את הגודל של כל מודול בגרף שלכם.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // פותח אוטומטית את הדוח בדפדפן שלכם
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

עבור פרויקטים המשתמשים ב-App Router וב-Turbopack,‏ Next.js מספק מנתח ניסיוני מובנה שאינו דורש תלויות נוספות.

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

אם אתם משתמשים ב-bundler ברירת המחדל של Webpack ב-Next.js, השתמשו ב-bundle analyzer הרשמי. הפעילו אותו על ידי הגדרת משתנה סביבה במהלך הבנייה שלכם.

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // הגדרות ה-Next.js שלכם
});
```

**שימוש:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Webpack סטנדרטי

עבור Create React App (לאחר eject), ‏Angular, או הגדרות Webpack מותאמות אישית, השתמשו בכלי הסטנדרטי בתעשייה `webpack-bundle-analyzer`.

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>
