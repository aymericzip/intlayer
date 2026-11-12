---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 9
title: "בינאום Express (i18n), מדריך מלא לתרגום האפליקציה שלך"
description: "הגדרת Intlayer ב-Express: זיהוי השפה לפי בקשה באמצעות middleware, תרגום תגובות API והודעות שגיאה, עם טיפוסיות מקצה לקצה."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Express
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - express
applicationTemplate: https://github.com/aymericzip/intlayer-express-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון השימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 7.5.9
    date: 2025-12-30
    changes: "הוספת פקודת init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תרגום אתר צד שרת ב-Express באמצעות Intlayer

`express-intlayer` הוא middleware רב-עוצמה לבינאום (i18n) עבור אפליקציות Express, שנועד להפוך את שירותי ה-backend שלכם לנגישים גלובלית על ידי מתן תגובות מותאמות אישית בהתאם להעדפות הלקוח.

## מקרי שימוש מעשיים

- **הצגת שגיאות צד שרת בשפת המשתמש**: כאשר מתרחשת שגיאה, הצגת הודעות בשפת האם של המשתמש משפרת את ההבנה ומפחיתה תסכול. הדבר שימושי במיוחד עבור הודעות שגיאה דינמיות שעשויות להיות מוצגות ברכיבי front-end כגון toasts או modals.

- **אחזור תוכן רב-לשוני**: עבור אפליקציות שמושכות תוכן ממסד נתונים, בינאום מבטיח שתוכלו להגיש תוכן זה במספר שפות. הדבר חיוני עבור פלטפורמות כגון אתרי מסחר אלקטרוני (e-commerce) או מערכות ניהול תוכן (CMS) שצריכות להציג תיאורי מוצרים, מאמרים ותוכן אחר בשפה המועדפת על המשתמש.

- **שליחת הודעות דוא"ל רב-לשוניות**: בין אם מדובר בהודעות דוא"ל עסקתיות (transactional emails), קמפיינים שיווקיים או התראות, שליחת הודעות דוא"ל בשפת הנמען יכולה להגדיל משמעותית את המעורבות והיעילות.

- **התראות Push רב-לשוניות**: עבור אפליקציות לנייד, שליחת התראות push בשפה המועדפת על המשתמש יכולה לשפר את האינטראקציה ושימור המשתמשים. מגע אישי זה הופך את ההתראות לרלוונטיות יותר ומעודדות לפעולה.

- **תקשורות נוספות**: כל סוג של תקשורת מצד השרת, כגון הודעות SMS, התראות מערכת או עדכוני ממשק משתמש, מרוויח מנוכחותו בשפת המשתמש, מה שמבטיח בהירות ומשפר את חוויית המשתמש הכוללת.

על ידי בינאום ה-backend, האפליקציה שלכם לא רק מכבדת הבדלים תרבותיים אלא גם מתיישרת טוב יותר עם צורכי השוק העולמי, מה שהופך זאת לשלב מפתח בהרחבת השירותים שלכם ברחבי העולם.

## תחילת עבודה

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-express-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - כיצד לבצע בינאום לאפליקציה שלכם באמצעות Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

ראו את [תבנית האפליקציה](https://github.com/aymericzip/intlayer-express-template) ב-GitHub.

### התקנה

כדי להתחיל להשתמש ב-`express-intlayer`, התקינו את החבילה באמצעות npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> הדגל `--interactive` הוא אופציונלי. השתמשו ב-`intlayer-cli init` אם אתם סוכני AI.

> פקודה זו תזהה את הסביבה שלכם ותתקין את החבילות הנדרשות. לדוגמה:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

```bash packageManager="bun"
bun add intlayer express-intlayer
```

### הגדרת תצורה

הגדירו את מאפייני הבינאום על ידי יצירת הקובץ `intlayer.config.ts` בשורש הפרויקט:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### הצהרת התוכן שלכם

צרו ונהלו את הצהרות התוכן שלכם כדי לאחסן תרגומים:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> ניתן להגדיר את הצהרות התוכן שלכם בכל מקום באפליקציה, כל עוד הן נכללות בספריית `contentDir` (כברירת מחדל, `./src`) ותואמות לסיומת קובץ הצהרת התוכן (כברירת מחדל, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> לפרטים נוספים, עיינו ב-[תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md).

- [תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)

### הגדרת אפליקציית Express

הגדירו את אפליקציית ה-Express שלכם לשימוש ב-`express-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import express, { type Express } from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app: Express = express();

// טעינת request handler של בינאום
app.use(intlayer());

// נתיבים
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// הפעלת השרת
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### תאימות

`express-intlayer` תואם לחלוטין עם:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/exports.md)
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/next-intlayer/exports.md)
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/vite-intlayer/exports.md)

הוא גם עובד בצורה חלקה עם כל פתרון בינאום במגוון סביבות, כולל דפדפנים ובקשות API. תוכלו להתאים אישית את ה-middleware לזיהוי השפה באמצעות כותרות (headers) או עוגיות (cookies):

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... אפשרויות תצורה נוספות
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

כברירת מחדל, `express-intlayer` יפרש את כותרת ה-`Accept-Language` כדי לקבוע את השפה המועדפת על הלקוח.

> למידע נוסף על תצורה ונושאים מתקדמים, בקרו ב-[תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [תצורת Intlayer (intlayer.config.ts)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

### הגדרת TypeScript

`express-intlayer` מנצל את היכולות החזקות של TypeScript כדי לשפר את תהליך הבינאום. הטיפוסיות הסטטית של TypeScript מבטיחה שכל מפתח תרגום נלקח בחשבון, מה שמפחית את הסיכון לתרגומים חסרים ומשפר את התחזוקתיות.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

וודאו שהטיפוסים שנוצרו אוטומטית (כברירת מחדל ב-`./types/intlayer.d.ts`) נכללים בקובץ ה-`tsconfig.json` שלכם.

```json5 fileName="tsconfig.json"
{
  // ... הגדרות ה-TypeScript הקיימות שלכם
  "include": [
    // ... הגדרות ה-TypeScript הקיימות שלכם
    ".intlayer/**/*.ts", // כלול את הטיפוסים שנוצרו אוטומטית
  ],
}
```

### תוסף ל-VS Code

כדי לשפר את חוויית הפיתוח שלכם עם Intlayer, תוכלו להתקין את **תוסף Intlayer הרשמי ל-VS Code**.

- [התקנה מ-VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

תוסף זה מספק:

- **השלמה אוטומטית (Autocompletion)** עבור מפתחות תרגום.
- **זיהוי שגיאות בזמן אמת** עבור תרגומים חסרים.
- **תצוגה מקדימה מוטמעת (Inline previews)** של תוכן מתורגם.
- **פעולות מהירות (Quick actions)** ליצירה ועדכון קלים של תרגומים.

לפרטים נוספים על אופן השימוש בתוסף, עיינו ב-[תיעוד תוסף Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md).

- [תיעוד תוסף Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)

### הגדרת Git

מומלץ להתעלם מהקבצים שנוצרים על ידי Intlayer. זה מאפשר לכם להימנע מביצוע commit שלהם למאגר ה-Git שלכם.

לשם כך, תוכלו להוסיף את ההוראה הבאה לקובץ ה-`.gitignore` שלכם:

```plaintext fileName=".gitignore"
# התעלמות מקבצים שנוצרו על ידי Intlayer
.intlayer
```

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום צד שרת ב-Express?">

האפשרות ההיסטורית היא `i18next` עם `i18next-http-middleware`, שטוענת קטלוגי JSON לכל namespace ושומרת את השפה על הבקשה. החלופה היא `Intlayer` דרך `express-intlayer`, שמצהירה על תוכן בקבצים בעלי טיפוסיות המשותפים עם ה-frontend שלכם, מפענחת את השפה לכל בקשה, ומוסיפה תרגום AI ו-CMS.

הסיבה לביצוע בינאום ב-backend היא שחלק ניכר מהטקסט שמשתמש קורא אינו עובר כלל דרך ה-frontend: הודעות שגיאה של ה-API, הודעות דוא"ל עסקתיות, התראות push, הודעות SMS וייצוא קובצי PDF. אלו דורשים את שפת הנמען, המפוענחת לכל בקשה ולא לכל סשן.

ראו [למה כדאי להשתמש ב-Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md).

- [למה כדאי להשתמש ב-Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)

</Question>
<Question title="בכמה i18n מגדיל את גודל ה-bundle של שרת ה-Express שלי?">

מעט מאוד. המילונים מקומפלים מראש ורק השפות שאתם מצהירים עליהן נכללות, כך שאין טעינת קטלוגים באתחול ואין קריאות קבצים בנתיב הבקשה. הדבר חשוב במיוחד בפריסות serverless ו-edge, שבהן גודל החבילה משפיע על זמן ה-cold start. ראו [אופטימיזציית חבילה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md).

- [אופטימיזציית חבילה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)

</Question>
<Question title="האם ניתן להגר מ-`i18next` מבלי לשכתב את ה-handlers שלי?">

כן, וישנם שני מסלולים. תוכלו להגר את התוכן בהדרגה עם [מדריך ההגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md). או שתוכלו לשמור על ה-API הנוכחי שלכם במלואו: [מתאמי התאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md) חושפים בדיוק את אותו ה-API של `i18next`, אך מוגש באמצעות מילוני Intlayer, כך שה-imports משתנים וקוד ה-handler נשאר ללא שינוי.

- [מדריך ההגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md)
- [מתאמי תאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md)

</Question>
<Question title="האם אוכל לשמור על קובצי תרגום ה-JSON הקיימים שלי?">

כן. [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קובצי ה-`/messages/{locale}/{namespace}.json` שלכם כמקור האמת ומייצר מהם מילוני Intlayer, בשני הכיוונים. [תוסף sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו-[קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md) מאפשרים לכם לפצל תוכן לפי שפה במקום לקבץ את כל השפות בקובץ אחד.

- [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [תוסף sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הריצו `npx intlayer extract` ו-Intlayer יקרא את קובצי המקור שלכם, יחלץ את המחרוזות המוצגות למשתמש ויכתוב קובץ `.content` לצד כל אחד מהם, כך שתוכלו לבדוק diff במקום להעתיק מחרוזות לקטלוג אחת בכל פעם. ראו את [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md).

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

בצד ה-frontend של אותו פרויקט, [הקומפיילר של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) הולך צעד קדימה ומייצר את המילונים בזמן הבנייה מתוך קוד מקור של JSX, TSX, Vue או Svelte, כך ששני חלקי האפליקציה חולקים שכבת תוכן אחת ללא צורך בתחזוקת מפתחות ידנית.

- [קומפיילר של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)

</Question>
<Question title="אילו כלי עריכה וסוכני AI זמינים?">

חמישה כלים, כולם אופציונליים:

- **[תוסף VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)**: קפיצה ישירה ממפתח `useIntlayer` לקובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת פקודות build, fill, test, push ו-pull מלוח הפקודות או מלשונית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**: אותה מודעות בכל עורך שתומך ב-LSP, עם מעבר להגדרה (go to definition), מציאת כל ההפניות (find all references), תצוגה מקדימה בריחוף (hover preview) של ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, ואזהרה כאשר מפתח אינו מוצהר בשום מקום. הוא גם מפענח קריאות של `i18next`, `react-i18next`, `next-intl` ו-`use-intl`, מה שעוזר במהלך ההגירה.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer ל-Cursor, VS Code, Claude Desktop, Claude Code ו-ChatGPT, כך שעוזר AI עונה מתוך התיעוד העדכני במקום לנחש, ויכול להריץ פקודות כמו `intlayer fill` בעצמו.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**: מיומנויות ממוקדות כגון `intlayer-config`, `intlayer-cli` ו-`intlayer-content`, בתוספת מיומנות ייעודית לכל framework, המלמדות את הסוכן על הגדרת הניתוב וסוגי צמתי התוכן שלכם.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md)**: כלל `no-raw-text` מסמן מחרוזות מקודדות (hardcoded), עם כללים נוספים למפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="כיצד Intlayer יודע באיזו שפה לענות?">

כברירת מחדל `express-intlayer` קורא את כותרת ה-`Accept-Language` של הבקשה הנכנסת ובוחר את השפה המוצהרת הקרובה ביותר, תוך חזרה לשפת ברירת המחדל שלכם במידת הצורך. תוכלו לשנות את המקור באמצעות `routing.storage`, למשל כותרת מותאמת אישית או עוגייה שהוגדרה על ידי ה-frontend שלכם, כך שה-API יענה בשפה שהמשתמש באמת בחר ולא בזו שהדפדפן שלו מפרסם. ראו את [הפניית התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [הפניית התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Question>
<Question title="האם השפה מבודדת לכל בקשה?">

כן. ה-middleware תוחם את השפה הפעילה לרמת הבקשה (per request), כך ששתי בקשות מקבילות בשפות שונות לעולם לא יקראו את השפה זו של זו. זה מה שהופך קריאות ל-`t()` ו-`getIntlayer()` לבטוחות לחלוטין מתוך שירות ללא צורך בהעברת ארגומנט שפה לאורך כל שרשרת הפונקציות.

</Question>
<Question title="כיצד אוכל לשלוח הודעות דוא&quot;ל עסקתיות בשפת הנמען?">

הצהירו על תוכן הדוא"ל בקובץ תוכן כמו כל תוכן אחר, ולאחר מכן אחזרו אותו באמצעות `getIntlayer` עבור השפה השמורה של הנמען במקום שפת הבקשה. הדבר חשוב במיוחד עבור תהליכי רקע (jobs) ותורים (queues), שבהם השפה שייכת לרשומת המשתמש ואין בקשה נכנסת שממנה ניתן לקרוא כותרת.

</Question>
<Question title="כיצד אוכל לתרגם הודעות שגיאה של ה-API?">

עטפו את ההודעה ב-`t()` בנקודה שבה נבנית השגיאה. שפת הבקשה הפעילה תפענח אותה, כך שהלקוח יקבל הודעה שניתן להציג ישירות, וה-frontend שלכם לא יזדקק לקטלוג מקביל של קודי שגיאה.

</Question>
<Question title="האם זה עובד עם אפליקציית Express קיימת ועם middlewares אחרים?">

כן. `express-intlayer` הוא middleware סטנדרטי של Express, כך שהוא משתלב היטב עם המערך הקיים שלכם. רשמו אותו לפני הנתיבים שקוראים תוכן, כך שהשפה תפוענח עד לזמן שבו ה-handler יקרא ל-`t()` או `getIntlayer()`.

</Question>
<Question title="כיצד אוכל לתרגם את תוכן ה-backend באופן אוטומטי באמצעות AI?">

הריצו `npx intlayer fill`. הפקודה משלימה תרגומים חסרים באמצעות ה-LLM לבחירתכם, תוך שימוש בספק ובמפתח ה-API שלכם. הוסיפו את הדגל `--git-diff` כדי לתרגם רק את התוכן שהשתנה בענף. עיינו ב-[פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md) וב-[אינטגרציית CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md)
- [אינטגרציית CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md)

</Question>
<Question title="האם Intlayer תומך בריבוי (plurals), מגדר וערכים מוזרקים בשרת?">

כן: [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md), [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md), תנאים, [הזרקות (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md) לערכים מוטמעים, [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md) לגוף הודעות דוא"ל, ו-[מעצבים (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md) למספרים, תאריכים ומטבעות.

- [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md)
- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md)
- [הזרקות (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md)
- [מעצבים (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)

</Question>
<Question title="האם אקבל השלמה אוטומטית של TypeScript בשרת?">

כן. Intlayer מייצר את הטיפוסים של המילונים שלכם לתוך `./types/intlayer.d.ts`, כך שמפתח שאינו קיים גורם לשגיאת הידור (compile error) במקום למחרוזת ריקה בזמן ריצה. הריצו `npx intlayer test` ב-CI כדי להכשיל את הבנייה כאשר חסר תוכן בשפה מוצהרת כלשהי.

</Question>
<Question title="האם ה-frontend וה-backend יכולים לחלוק את אותו התוכן?">

כן, וזו התצורה המקובלת בדרך כלל. `express-intlayer` עובד לצד `react-intlayer`, `next-intlayer` ו-`vite-intlayer` על אותו תוכן מוצהר, כך שתווית המשמשת גם בתגובת API וגם בדף מוצהרת פעם אחת בלבד. ראו [כיצד Intlayer פועל](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/how_works_intlayer.md).

- [כיצד Intlayer פועל](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/how_works_intlayer.md)

</Question>
<Question title="האם Intlayer חינמי ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. [ה-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) המאוחסן הוא שירות אופציונלי בתשלום שניתן גם [לאחסנו באופן עצמאי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md).

- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)
- [אחסון עצמאי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md)

</Question>

</FAQ>
