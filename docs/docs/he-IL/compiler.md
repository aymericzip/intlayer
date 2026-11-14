---
createdAt: 2025-09-09
updatedAt: 2026-11-12
priority: 8
title: "מהדר Intlayer | חילוץ תוכן אוטומטי עבור i18n"
description: "חלץ תוכן מהרכיבים שלך באופן אוטומטי באמצעות מהדר ה-Intlayer, עבור i18n מהיר יותר ב-Vite, ב-Next.js ועוד."
keywords:
  - Intlayer
  - Compiler
  - מהדר
  - Internationalization
  - בינאום
  - i18n
  - Automation
  - אוטומציה
  - Extraction
  - חילוץ
  - Speed
  - מהירות
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 9.7.4
    date: 2026-11-12
    changes: "Extract single capitalized words, add intlayer-ignore comment directives"
  - version: 9.0.0
    date: 2026-06-24
    changes: "הוספת שינוי לגבי Intlayer v9"
  - version: 8.2.0
    date: 2026-03-09
    changes: "עדכון אפשרויות מהדר, הוספת תמיכה ב-FilePathPattern"
  - version: 8.1.7
    date: 2026-02-25
    changes: "עדכון אפשרויות מהדר"
  - version: 7.3.1
    date: 2025-11-27
    changes: "שחרור ראשוני של המהדר"
author: aymericzip
youtubeVideo: https://www.youtube.com/watch?v=7VtLdbtV1us&t=1230s
---

# מהדר Intlayer: חילוץ תוכן אוטומטי עבור i18n

<iframe title="הכול על i18n: המדריך המלא לבינאום ווב" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/7VtLdbtV1us?autoplay=0&amp;start=1230&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

## מהו מהדר ה-Intlayer (Intlayer Compiler)?

**מהדר ה-Intlayer** הוא כלי רב-עוצמה שנועד להפוך את תהליך הבינאום (i18n) באפליקציות שלך לאוטומטי. הוא סורק את קוד המקור שלך (JSX, TSX, Vue, Svelte) לאיתור הצהרות תוכן, מחלץ אותן ומייצר אוטומטית את קובצי המילון הנדרשים. הדבר מאפשר לך לשמור את התוכן שלך בצמוד לרכיבים (co-located) בעוד ש-Intlayer מטפל בניהול ובסנכרון של המילונים שלך.

## מדוע להשתמש במהדר ה-Intlayer?

- **אוטומציה**: ביטול הצורך בהעתקה והדבקה ידנית של תוכן לתוך מילונים.

- **מהירות**: חילוץ תוכן מותאם אישית המבטיח שתהליך הבנייה שלך יישאר מהיר.

- **חוויית מפתח**: שמירת הצהרות התוכן בדיוק במקום שבו הן בשימוש, מה שמשפר את יכולת התחזוקה.

- **עדכונים חיים**: תמיכה ב-Hot Module Replacement (HMR) עבור משוב מיידי במהלך הפיתוח.

עיין במאמר הבלוג [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/compiler_vs_declarative_i18n.md) להשוואה מעמיקה יותר.

- [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/compiler_vs_declarative_i18n.md)

## מתי לא כדאי להשתמש במהדר ה-Intlayer?

למרות שהמהדר מציע חוויית "זה פשוט עובד" מצוינת, הוא כולל גם מספר פשרות (trade-offs) שכדאי להכיר:

- **עמימות יוריסטית**: המהדר נדרש לנחש מהו תוכן הפונה למשתמש לעומת לוגיקה של האפליקציה (למשל `className="active"`, קודי סטטוס, מזהי מוצר). בבסיסי קוד מורכבים, הדבר עלול להוביל לזיהויים חיוביים שגויים (false positives) או למחרוזות שהוחמצו, מה שדורש ביאורים ידניים (annotations) והחרגות.

- **חילוץ סטטי בלבד**: חילוץ מבוסס מהדר מסתמך על ניתוח סטטי. מחרוזות הקיימות רק בזמן ריצה (קודי שגיאה מ-API, שדות מ-CMS וכו') אינן ניתנות לגילוי או לתרגום על ידי המהדר בלבד, ולכן עדיין נדרשת אסטרטגיית i18n משלימה לזמן ריצה.

להשוואה ארכיטקטונית מעמיקה יותר, עיין במאמר הבלוג [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/compiler_vs_declarative_i18n.md).

- [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/compiler_vs_declarative_i18n.md)

כחלופה, כדי להפוך את תהליך ה-i18n שלך לאוטומטי תוך שמירה על שליטה מלאה בתוכן שלך, Intlayer מספק גם פקודת חילוץ אוטומטית `intlayer extract` (ראה [תיעוד CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)), או את הפקודה `Intlayer: extract content to Dictionary` מתוך הרחבת Intlayer ל-VS Code (ראה [תיעוד הרחבת VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)).

- [תיעוד CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)
- [תיעוד הרחבת VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)

## שימוש

> הדרך המהירה ביותר לחבר את המהדר היא ההגדרה האינטראקטיבית: הרץ `npx intlayer init --interactive` ובחר ב-**Compiler**. ב-Next.js וב-Vite הוא מופעל אוטומטית ברגע ש-`compiler.enabled` מוגדר ונתיב `compiler.output` מוגדר.

<Tabs>
 <Tab value='vite'>

### Vite

עבור אפליקציות מבוססות Vite (React, Vue, Svelte וכו'), המהדר מובנה ישירות בתוך התוסף הראשי `intlayer()` מתוך חבילת `vite-intlayer`. אין צורך לרשום תוסף נפרד.

#### התקנה

```bash
npm install vite-intlayer
```

#### תצורה

התוסף `intlayer()` כבר כולל את המהדר. הוא מופעל אוטומטית ברגע ש-`compiler.enabled` מוגדר ונתיב `compiler.output` מוגדר בקובץ ה-`intlayer.config.ts` שלך (ראה [תצורה מותאמת אישית](#תצורה-מותאמת-אישית) להלן):

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

> התוסף העצמאי `intlayerCompiler()` עדיין מיוצא עבור הגדרות מתקדמות. רישומו לצד `intlayer()` הוא בטוח, שכן המהדר מונע כפילויות של עצמו ורץ פעם אחת בלבד.

ראה את המדריך המלא: [תרגום Vite ו-React עם Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+react.md)

- [תרגום Vite ו-React עם Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+react.md)

#### תמיכה בפריימוורקים

תוסף ה-Vite מזהה ומטפל אוטומטית בסוגי קבצים שונים:

- **React / JSX / TSX**: מטופל באופן טבעי (native).

- **Vue**: דורש את `@intlayer/vue-compiler`.

- **Svelte**: דורש את `@intlayer/svelte-compiler`.

הקפד להתקין את חבילת המהדר המתאימה עבור הפריימוורק שלך:

```bash
# עבור Vue
npm install @intlayer/vue-compiler

# עבור Svelte
npm install @intlayer/svelte-compiler
```

 </Tab>
 <Tab value='nextjs'>

### Next.js

ב-Next.js המהדר רץ כ-loader של הבאנדלר, `next-intlayer/extractor-loader`. הפונקציה `withIntlayer` רושמת אותו עבורך **הן** ב-Turbopack והן ב-webpack. אין צורך לכתוב `babel.config.js`.

#### התקנה

```bash
npm install @intlayer/babel
```

#### תצורה

אין צורך להגדיר דבר. כל עוד ה-`next.config.ts` שלך עובר דרך `withIntlayer`, התקנת `@intlayer/babel` מספיקה כדי שה-loader יירשם:

```ts fileName="next.config.ts"
import { withIntlayer } from "next-intlayer/server";

export default withIntlayer({});
```

ה-loader רץ על קובצי `.tsx` ו-`.jsx`, לפני `next-swc-loader`, כך שהוא קורא את ה-JSX המקורי שלך. תוכן המוצהר ברכיבים שלך מחולץ לקובצי `.content` ונבנה לתוך `.intlayer` בעת הידור הקובץ.

 </Tab>

 <Tab value="Babel">

### Babel

עבור אפליקציות מבוססות Webpack המשתמשות ב-Babel, תוכל להגדיר את המהדר באמצעות התוסף `@intlayer/babel`.

#### התקנה

```bash
npm install @intlayer/babel
```

#### תצורה

עדכן את ה-`babel.config.js` שלך (או `babel.config.json`) כדי לכלול את תוסף החילוץ. אנו מספקים פונקציית עזר `getExtractPluginOptions` לטעינת תצורת Intlayer שלך באופן אוטומטי.

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // חילוץ תוכן מרכיבים לתוך מילונים
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // אופטימיזציה של ייבוא על ידי החלפת useIntlayer בייבוא ישיר של מילונים
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

תצורה זו מבטיחה שתוכן המוצהר ברכיבים שלך יחולץ אוטומטית וישמש ליצירת מילונים במהלך תהליך הבנייה שלך.

 </Tab>
</Tabs>

### תצורה מותאמת אישית

כדי להתאים אישית את התנהגות המהדר, תוכל לעדכן את הקובץ `intlayer.config.ts` בשורש הפרויקט שלך.

````ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  compiler: {
    /**
     * מציין אם יש להפעיל את המהדר.
     * הגדר ל-'build-only' כדי לדלג על המהדר במהלך פיתוח ולהאיץ את זמני ההפעלה.
     */
    enabled: true,

    /**
     * מגדיר את נתיב קובצי הפלט. מחליף את `outputDir`.
     *
     * - נתיבים המתחילים ב-`./` מפוענחים ביחס לספריית הרכיב.
     * - נתיבים המתחילים ב-`/` מפוענחים ביחס לשורש הפרויקט (`baseDir`).
     *
     * - הכללת המשתנה `{{locale}}` בנתיב תפעיל יצירה של מילונים נפרדים לכל שפה.
     *
     * דוגמה:
     * ```ts
     * {
     *   // יצירת קובצי .content.ts רב-לשוניים סמוך לרכיב
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // שווה ערך באמצעות תבנית מחרוזת
     * }
     * ```
     *
     * ```ts
     * {
     *   // יצירת קובצי JSON מרוכזים לכל שפה בשורש הפרויקט
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // שווה ערך באמצעות תבנית מחרוזת
     * }
     * ```
     *
     * רשימת משתנים:
     *   - `fileName`: שם הקובץ.
     *   - `key`: מפתח התוכן.
     *   - `locale`: שפת התוכן.
     *   - `extension`: סיומת הקובץ.
     *   - `componentFileName`: שם קובץ הרכיב.
     *   - `componentExtension`: סיומת קובץ הרכיב.
     *   - `format`: פורמט המילון.
     *   - `componentFormat`: פורמט מילון הרכיב.
     *   - `componentDirPath`: נתיב ספריית הרכיב.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * מציין אם יש לשמור את הרכיבים לאחר הטרנספורמציה.
     *
     * - אם `true`, המהדר ישכתב את קובץ הרכיב בדיסק. כך שהשינוי יהיה קבוע, והמהדר ידלג על השינוי בתהליך הבא. בדרך זו, המהדר יכול לבצע שינוי באפליקציה, ולאחר מכן ניתן להסירו.
     *
     * - אם `false`, המהדר יזריק את קריאת הפונקציה `useIntlayer()` לתוך הקוד בפלט הבנייה בלבד, וישמור על בסיס הקוד ללא שינוי. השינוי יתבצע בזיכרון בלבד.
     */
    saveComponents: false,

    /**
     * הכנסת תוכן בלבד לקובץ שנוצר. שימושי עבור פלטי JSON של i18next או ICU MessageFormat פר-שפה.
     *
     * - `output: ({ locale, key }) => `./locale/${locale}/${key}.json`,`
     */
    noMetadata: false,

    /**
     * קידומת מפתח מילון
     */
    dictionaryKeyPrefix: "", // הוספת קידומת אופציונלית עבור מפתחות המילון שחולצו
  },
};

export default config;
````

### הפניה לתצורת המהדר (Compiler Configuration Reference)

המאפיינים הבאים ניתנים להגדרה בבלוק ה-`compiler` של קובץ ה-`intlayer.config.ts` שלך:

- **enabled**:
  - _סוג_: `boolean | 'build-only'`
  - _ברירת מחדל_: `true`
  - _תיאור_: מציין אם יש להפעיל את המהדר.

- **dictionaryKeyPrefix**:
  - _סוג_: `string`
  - _ברירת מחדל_: `''`
  - _תיאור_: קידומת עבור מפתחות המילון שחולצו.

- **transformPattern**:
  - _סוג_: `string | string[]`
  - _ברירת מחדל_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}', '!**/node_modules/**']`
  - _תיאור_: (לא מומלץ: השתמש ב-`build.traversePattern` במקום) תבניות לסריקת הקוד לצורך אופטימיזציה.

- **excludePattern**:
  - _סוג_: `string | string[]`
  - _ברירת מחדל_: `['**/node_modules/**']`
  - _תיאור_: (לא מומלץ: השתמש ב-`build.traversePattern` במקום) תבניות להחרגה מהאופטימיזציה.

- **output**:
  - _סוג_: `FilePathPattern`
  - _ברירת מחדל_: `({ key }) => 'compiler/${key}.content.json'`
  - _תיאור_: מגדיר את נתיב קובצי הפלט. מחליף את `outputDir`. תומך במשתנים דינמיים כגון `{{locale}}`, `{{key}}`, `{{fileName}}`, `{{extension}}`, `{{format}}`, `{{dirPath}}`, `{{componentFileName}}`, `{{componentExtension}}`, `{{componentFormat}}`. ניתן להגדרה כמחרוזת בפורמט `'my/{{var}}/path'`, או כפונקציה.
  - _הערה_: נתיבי `./**/*` מפוענחים ביחס לרכיב. נתיבי `/**/*` מפוענחים ביחס ל-`baseDir` של Intlayer.
  - _הערה_: אם מוגדר שדה locale בנתיב, ייווצרו מילונים נפרדים לכל שפה.
  - _דוגמה_: `output: ({ locale, key }) => 'compiler/${locale}/${key}.json'`

- **noMetadata**:
  - _סוג_: `boolean`
  - _ברירת מחדל_: `false`
  - _תיאור_: מציין אם יש לשמור את המטא-דאטה בקובץ. אם מוגדר true, המהדר לא ישמור את המטא-דאטה של המילונים (key, מעטפת תוכן). שימושי עבור פלטי JSON של i18next או ICU MessageFormat פר-שפה.
  - _הערה_: שימושי אם משתמשים בתוסף `loadJSON`.
  - _דוגמה_:
    אם `true`:
    ```json
    {
      "key": "value"
    }
    ```
    אם `false`:
    ```json
    {
      "key": "value",
      "content": {
        "key": "value"
      }
    }
    ```

- **saveComponents**:
  - _סוג_: `boolean`
  - _ברירת מחדל_: `false`
  - _תיאור_: מציין אם יש לשמור את הרכיבים לאחר הטרנספורמציה.
    - אם `true`, המהדר ישכתב את קובץ הרכיב בדיסק. השינוי יהיה קבוע, ולאחר מכן ניתן יהיה להסיר את המהדר.
    - אם `false`, המהדר יזריק את קריאת הפונקציה `useIntlayer()` לתוך הקוד בפלט הבנייה בלבד, וישמור על בסיס הקוד המקורי ללא שינוי. השינוי יתבצע בזיכרון בלבד.

### החרגת מחרוזות מהחילוץ

המהדר מחלץ כל מחרוזת שנראית כמו טקסט שמוצג למשתמש, כולל מילים בודדות כמו `Save`, `Settings` או `Counter`. הוא לא יכול להבדיל בין תווית לבין שם פרטי או שם מותג, לכן סמנו אותם בהנחיה בהערה:

- `intlayer-ignore-next-line`: מדלגת על המחרוזות של השורה הבאה. כשהיא ממוקמת מעל רכיב JSX, Vue או Svelte, היא מדלגת גם על הטקסט והמאפיינים של הרכיב.
- `intlayer-ignore-line`: מדלגת על המחרוזות של השורה שלה עצמה.
- `intlayer-ignore-file`: מדלגת על הקובץ כולו. מקמו אותה בראש הקובץ.

```tsx fileName="src/components/Author.tsx"
export const Author = () => {
  const brand = "Intlayer"; // intlayer-ignore-line

  return (
    <div>
      {/* intlayer-ignore-next-line */}
      <p title="John Doe">John Doe</p>
      <p>Written with {brand}</p>
    </div>
  );
};
```

בתבניות Vue ו-Svelte, השתמשו בהערת HTML: `<!-- intlayer-ignore-next-line -->`.

כלל ה-ESLint `intlayer/no-raw-text` קורא את אותן הנחיות, כך שמחרוזות שדולגו גם לא מדווחות.

### השלמת תרגומים חסרים

Intlayer מספק כלי CLI שיסייע לך להשלים תרגומים חסרים. תוכל להשתמש בפקודת `intlayer` כדי לבדוק ולהשלים תרגומים חסרים מתוך הקוד שלך.

```bash packageManager="npm"
npx intlayer test         # בדיקה אם ישנם תרגומים חסרים
```

```bash packageManager="yarn"
yarn intlayer test         # בדיקה אם ישנם תרגומים חסרים
```

```bash packageManager="pnpm"
pnpm intlayer test         # בדיקה אם ישנם תרגומים חסרים
```

```bash packageManager="bun"
bun x intlayer test         # בדיקה אם ישנם תרגומים חסרים
```

```bash packageManager="npm"
npx intlayer fill         # השלמת תרגומים חסרים
```

```bash packageManager="yarn"
yarn intlayer fill         # השלמת תרגומים חסרים
```

```bash packageManager="pnpm"
pnpm intlayer fill         # השלמת תרגומים חסרים
```

```bash packageManager="bun"
bun x intlayer fill         # השלמת תרגומים חסרים
```

### חילוץ (Extract)

Intlayer מספק כלי CLI לחילוץ תוכן מתוך הקוד שלך. תוכל להשתמש בפקודת `intlayer extract` כדי לחלץ תוכן מתוך הקוד שלך.

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

> לפרטים נוספים, עיין ב[תיעוד ה-CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).

- [תיעוד ה-CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md)
