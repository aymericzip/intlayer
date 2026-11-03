---
createdAt: 2026-08-23
updatedAt: 2026-11-03
priority: 9
title: "Elysia i18n - מדריך מלא לתרגום האפליקציה שלך"
description: "הגדירו את Intlayer ב-Elysia: זהו את השפה (locale) לכל בקשה באמצעות התוסף, תרגמו תגובות API ושמרו על טיפוסיות מלאה ב-Bun."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Elysia
  - JavaScript
  - צד שרת
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "התאמת המדריך לתבנית Elysia (הגדרת טיפוסיות להקשר, הגדרת Bun, סקריפטים)"
  - version: 9.4.0
    date: 2026-08-23
    changes: "אתחול תוסף Elysia"
author: aymericzip
---

# תרגום אתר צד-שרת מבוסס Elysia באמצעות Intlayer

`elysia-intlayer` הוא תוסף בינאום (i18n) עוצמתי לאפליקציות Elysia, שנועד להפוך את שירותי צד-השרת שלכם לנגישים גלובלית על ידי מתן תגובות מותאמות לשפה על בסיס העדפות הלקוח.

> ראו את [יישום החבילה ב-GitHub](https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer).

## מקרי שימוש מעשיים

- **הצגת שגיאות צד-שרת בשפת המשתמש**: כאשר מתרחשת שגיאה, הצגת הודעות בשפת האם של המשתמש משפרת את ההבנה ומפחיתה תסכול. הדבר שימושי במיוחד עבור הודעות שגיאה דינמיות שעשויות להופיע ברכיבי צד-לקוח כמו הודעות קופצות (toasts) או חלונות מודאליים.
- **שליפת תוכן רב-לשוני**: עבור אפליקציות שמושכות תוכן ממסד נתונים, בינאום מבטיח שתוכלו להגיש תוכן זה במספר שפות. הדבר חיוני עבור פלטפורמות כגון אתרי מסחר אלקטרוני (e-commerce) או מערכות ניהול תוכן (CMS) שצריכות להציג תיאורי מוצרים, מאמרים ותוכן נוסף בשפה המועדפת על המשתמש.
- **שליחת הודעות דוא"ל רב-לשוניות**: בין אם מדובר בהודעות דוא"ל תפעוליות (transactional), קמפיינים שיווקיים או התראות, שליחת הודעות דוא"ל בשפת הנמען יכולה לשפר משמעותית את המעורבות והאפקטיביות.
- **התראות Push רב-לשוניות**: עבור אפליקציות מובייל, שליחת התראות push בשפה המועדפת על המשתמש יכולה להעצים את האינטראקציה ושימור המשתמשים. מגע אישי זה הופך את ההתראות לרלוונטיות יותר.
- **תקשורות אחרות**: כל צורת תקשורת מצד השרת, כגון הודעות SMS, התראות מערכת או עדכוני ממשק משתמש, מרוויחה מהיותה בשפת המשתמש, מה שמבטיח בהירות ומשפר את חוויית המשתמש הכוללת.

על ידי בינאום צד השרת, האפליקציה שלכם לא רק מכבדת הבדלים תרבותיים אלא גם מתאימה את עצמה טוב יותר לצורכי השוק הגלובלי, מה שמהווה שלב מפתח בהרחבת השירותים שלכם ברחבי העולם.

## תחילת העבודה

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

ראו [תבנית אפליקציה](https://github.com/aymericzip/intlayer-elysia-template) ב-GitHub.

### התקנה

כדי להתחיל להשתמש ב-`elysia-intlayer`, התקינו את החבילה באמצעות מנהל החבילות שלכם:

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

> הדגל `--interactive` הוא אופציונלי. השתמשו ב-`intlayer-cli init` אם אתם סוכן AI.

> פקודה זו תזהה את הסביבה שלכם ותתקין את החבילות הנדרשות. לדוגמה:

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

### הגדרת תצורה

הגדירו את תצורת הבינאום על ידי יצירת קובץ `intlayer.config.ts` בתיקיית השורש של הפרויקט:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    /**
     * שפת ברירת מחדל המשמשת כברירת מחדל אם השפה המבוקשת אינה נמצאת.
     */
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
      es: "Ejemplo de contenido devuelto en español",
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
        "es": "Ejemplo de contenido devuelto en español"
      }
    }
  }
}
```

> הצהרות התוכן שלכם יכולות להיות מוגדרות בכל מקום באפליקציה, כל עוד הן נכללות בתיקייה `contentDir` (כברירת מחדל, `./src`) ומתאימות לסיומת קובץ הצהרת התוכן (כברירת מחדל, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> לפרטים נוספים, עיינו ב[תיעוד הצהרת התוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md).

- [תיעוד הצהרת התוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md)

### הגדרת אפליקציית Elysia

רשמו את התוסף באמצעות `.use(intlayer())`. הוא מזריק אובייקט `intlayer` לתוך ההקשר (context) של כל נתיב, וחושף את השפה שנקבעה ואת כלי העזר לתרגום:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia()
  // טעינת תוסף הבינאום
  .use(intlayer())
  // נתיבים
  .get("/", ({ intlayer }) => ({
    // השפה המשמשת לבקשה זו, נקבעה לפי Accept-Language או נקראה מתוך האחסון
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> התוסף רושם את ההקשר שלו דרך `derive` **גלובלי**, אשר Elysia מגדירה את הטיפוס שלו כ-`Partial<{ intlayer: IntlayerContext }>`. הערך תמיד קיים בזמן ריצה עבור נתיבים שנרשמו לאחר `.use(intlayer())`, לכן השתמשו בסימן קריאה (`intlayer!.locale`), או בשרשור אופציונלי (optional chaining), כדי לספק את TypeScript במצב `strict`.

הקשר הנתיב חושף:

| מאפיין            | תיאור                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| `locale`          | השפה שבה יש להשתמש עבור בקשה זו. `locale_storage` מקבל קדימות על פני `locale_detected`.               |
| `locale_storage`  | השפה שהוגדרה במפורש על ידי הלקוח באמצעות עוגייה (cookie) או כותרת (header). `undefined` אם לא הוגדרה. |
| `locale_detected` | השפה שנקבעה מתוך הכותרת `Accept-Language`, עם חזרה ל-`defaultLocale` בעת הצורך.                       |
| `defaultLocale`   | שפת ברירת המחדל שהוגדרה ב-`intlayer.config.ts`.                                                       |
| `t`               | מתרגם מפת שפות מוטמעת (inline).                                                                       |
| `getIntlayer`     | קורא מילון לפי מפתח, כברירת מחדל לפי שפת הבקשה.                                                       |
| `getDictionary`   | קורא מילון מיובא, כברירת מחדל לפי שפת הבקשה.                                                          |

אותם כלי עזר מיוצאים גם כפונקציות עצמאיות (standalone). הם מפענחים את הבקשה הנוכחית באמצעות `AsyncLocalStorage`, כך שתוכלו לקרוא להם מבלי לחלץ (destructure) את ההקשר:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  .use(intlayer())
  .get("/t_example", () =>
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);
```

> הקשר הבקשה משוחרר ברגע שהתגובה ממופה, כך שהפונקציות העצמאיות לעולם אינן מפענחות ערכים מול בקשה שכבר הסתיימה. אם קוראים להן מחוץ לבקשה המטופלת על ידי התוסף, הן חוזרות לשפת ברירת המחדל שהוגדרה.

### הרצת האפליקציה שלכם

הוסיפו את סקריפטי Intlayer ל-`package.json` שלכם. הפקודה `intlayer build` מקמפלת את הצהרות התוכן שלכם לתוך תיקיית `.intlayer` ומייצרת את טיפוסי ה-TypeScript:

```json fileName="package.json"
{
  "scripts": {
    "dev": "intlayer build && bun run --watch src/index.ts",
    "build": "intlayer build",
    "start": "bun run src/index.ts",
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

לאחר מכן הפעילו את השרת:

```bash
bun run dev
```

בדקו את קביעת השפה באמצעות `Accept-Language`:

```bash
curl -H "Accept-Language: fr" http://localhost:3000/
# {"locale":"fr","greeting":"Bonjour","content":"Exemple de contenu renvoyé en français"}

curl -H "Accept-Language: es" http://localhost:3000/
# {"locale":"es","greeting":"Hola","content":"Ejemplo de contenido devuelto en español"}
```

> `intlayer build` אינו נדרש בהכרח לפני `bun run src/index.ts`: התוסף מכין את המילונים גם בעת עליית אפליקציית ה-Elysia. הרצתו מראש שומרת על הטיפוסים שנוצרו מסונכרנים עבור עורך הקוד שלכם ומונעת את עלות הבנייה בבקשה הראשונה.

### תאימות

`elysia-intlayer` תואם לחלוטין עם:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/exports.md)
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/next-intlayer/exports.md)
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/vite-intlayer/exports.md)

הוא פועל בצורה חלקה גם עם כל פתרון בינאום במגוון סביבות, כולל דפדפנים ובקשות API.

כברירת מחדל, התוסף קובע את השפה בסדר הבא:

1. העוגייה `INTLAYER_LOCALE`.
2. הכותרת `x-intlayer-locale`.
3. משא ומתן דרך כותרת ה-`Accept-Language`.

תוכלו להתאים אישית את העוגייה והכותרת המשמשות לזיהוי שפה:

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

> למידע נוסף על תצורה ונושאים מתקדמים, בקרו ב[תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md).

- [תצורת Intlayer (intlayer.config.ts)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

### הגדרת TypeScript

`elysia-intlayer` ממנף את היכולות החזקות של TypeScript כדי להעצים את תהליך הבינאום. מערכת הטיפוסים הסטטית של TypeScript מבטיחה שכל מפתח תרגום נלקח בחשבון, מפחיתה את הסיכון לתרגומים חסרים ומשפרת את יכולת התחזוקה.

ודאו שהטיפוסים שנוצרו אוטומטית (כברירת מחדל ב-`./types/intlayer.d.ts`) כלולים בקובץ ה-`tsconfig.json` שלכם.

```json5 fileName="tsconfig.json"
{
  // ... תצורות ה-TypeScript הקיימות שלכם
  "include": [
    // ... תצורות ה-TypeScript הקיימות שלכם
    ".intlayer/**/*.ts", // הכללת הטיפוסים שנוצרו אוטומטית
  ],
}
```

### תוסף ל-VS Code

כדי לשפר את חוויית הפיתוח שלכם עם Intlayer, תוכלו להתקין את **התוסף הרשמי של Intlayer ל-VS Code**.

- [התקנה מ-VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

תוסף זה מספק:

- **השלמה אוטומטית (Autocompletion)** עבור מפתחות תרגום.
- **זיהוי שגיאות בזמן אמת** עבור תרגומים חסרים.
- **תצוגה מקדימה מוטבעת (Inline previews)** של תוכן מתורגם.
- **פעולות מהירות (Quick actions)** ליצירה ועדכון קלים של תרגומים.

לפרטים נוספים על אופן השימוש בתוסף, עיינו ב[תיעוד התוסף של Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md).

- [תיעוד התוסף של Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md)

### הגדרת Git

מומלץ להתעלם מהקבצים שנוצרים על ידי Intlayer כדי למנוע את העלאתם למאגר ה-Git שלכם.

לשם כך, תוכלו להוסיף את ההוראה הבאה לקובץ ה-`.gitignore` שלכם:

```plaintext fileName=".gitignore"
# התעלמות מקבצים שנוצרו על ידי Intlayer
.intlayer
```

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום צד-שרת ב-Elysia?">

ל-Elysia אין שכבת i18n מובנית משלה, ולכן האפשרויות הן ספרייה כללית כגון `i18next` המחוברת ידנית לתוך hook, או `Intlayer` דרך `elysia-intlayer`, אשר רושם את התוסף עבורכם, מפענח את השפה לכל בקשה וחולק את אותו תוכן בעל טיפוסיות חזקה עם צד-הלקוח שלכם.

הסיבה העיקרית לבינאום צד-השרת היא שחלק ניכר מהטקסט שהמשתמש קורא אינו עובר כלל דרך צד-הלקוח: הודעות שגיאה של ה-API, הודעות דוא"ל תפעוליות, התראות push, הודעות SMS וקובצי PDF מיוצאים. כל אלה דורשים את שפת הנמען, הנקבעת לכל בקשה ולא לכל הפעלה (session).

ראו [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/interest_of_intlayer.md).

- [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/interest_of_intlayer.md)

</Question>
<Question title="בכמה משפיע ה-i18n על גודל החבילה (bundle size) של שרת ה-Elysia שלי?">

מעט מאוד. המילונים מקומפלים מראש (ahead of time) ורק השפות שהצהרתם עליהן נכללות, כך שאין טעינת קטלוגים בעליית השרת ואין קריאות קבצים במהלך ניתוב הבקשה. יש לכך חשיבות רבה במיוחד בפריסות serverless ו-edge, שבהן גודל החבילה משפיע ישירות על זמן ה-cold start. ראו [אופטימיזציית חבילות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md).

- [אופטימיזציית חבילות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md)

</Question>
<Question title="האם ניתן להגר מ-i18next מבלי לשכתב את ה-handlers שלי?">

כן, ויש שני נתיבים אפשריים. תוכלו להגר את התוכן בהדרגה בעזרת [מדריך ההגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_i18next_to_intlayer.md). לחלופין, תוכלו לשמור על ה-API הנוכחי שלכם לחלוטין: [מתאמי התאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/index.md) חושפים בדיוק את אותו ה-API כמו `i18next`, אך מוגשים על ידי מילוני Intlayer, כך שרק הייבואים (imports) משתנים וקוד ה-handlers נשאר ללא שינוי.

- [מדריך ההגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_i18next_to_intlayer.md)
- [מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/index.md)

</Question>
<Question title="האם אוכל לשמור על קובצי תרגום ה-JSON הקיימים שלי?">

כן. [תוסף סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md) שומר על קובצי ה-`/messages/{locale}/{namespace}.json` כמקור האמת ומייצר מהם מילוני Intlayer בשני הכיוונים. [תוסף סנכרון ה-PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו[קבצים לפי שפה (per locale files)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md) מאפשרים לפצל תוכן לפי שפה במקום לקבץ את כל השפות בקובץ אחד.

- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md)
- [תוסף סנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הריצו `npx intlayer extract` ו-Intlayer יקרא את קובצי המקור שלכם, ישלוף את המחרוזות המוצגות למשתמש ויכתוב קובץ `.content` לצד כל קובץ מקור, כך שתוכלו לסקור diff במקום להעתיק מחרוזות לקטלוג אחת אחת. ראו את [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md).

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md)

בצד הלקוח של אותו פרויקט, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md) לוקח זאת צעד קדימה ומייצר את המילונים בזמן הבנייה מתוך קוד ה-JSX, TSX, Vue או Svelte שלכם, כך ששני חלקי האפליקציה חולקים שכבת תוכן אחת ללא צורך בתחזוקת מפתחות ידנית.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md)

</Question>
<Question title="אילו כלי עריכה וסוכני AI זמינים?">

חמישה כלים, כולם אופציונליים:

- **[תוסף ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md)**: קפיצה ממפתח ב-`useIntlayer` אל קובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת build, fill, test, push ו-pull מלוח הפקודות או מטאב ייעודי של Intlayer.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)**: אותה רמת מודעות בכל עורך שתומך ב-LSP, עם מעבר להגדרה (go to definition), מציאת כל המופעים (find all references), תצוגה מקדימה בריחוף עכבר של ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, ואזהרה כאשר מפתח אינו מוצהר בשום מקום. הוא גם מפענח קריאות של `i18next`, `react-i18next`, `next-intl` ו-`use-intl`, מה שעוזר בזמן ההגירה.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer עבור Cursor, VS Code, Claude Desktop, Claude Code ו-ChatGPT, כך שעוזר חכם עונה מתוך התיעוד העדכני במקום לנחש, ויכול להריץ פקודות כמו `intlayer fill` בעצמו.
- **[כישורי סוכנים (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)**: כישורים ממוקדים כגון `intlayer-config`, `intlayer-cli` ו-`intlayer-content`, בנוסף לכישור ייעודי לכל framework, המלמדים את הסוכן שלכם על הגדרות הניתוב וסוגי צמתי התוכן.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/eslint.md)**: הכלל `no-raw-text` מסמן מחרוזות מקודדות (hardcoded), עם כללים נוספים עבור מפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="כיצד Intlayer יודע באיזו שפה לענות?">

כברירת מחדל, `elysia-intlayer` קורא את הכותרת `Accept-Language` של הבקשה הנכנסת ובוחר את השפה המוצהרת הקרובה ביותר, תוך חזרה לשפת ברירת המחדל שלכם בעת הצורך. תוכלו לשנות את המקור באמצעות `routing.storage`, לדוגמה כותרת מותאמת אישית או עוגייה (cookie) שנקבעה על ידי צד הלקוח, כך שה-API יענה בשפה שהמשתמש בחר בפועל ולא בזו שהדפדפן שלו מציג. ראו את [מדריך התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md).

- [מדריך התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

</Question>
<Question title="האם השפה מבודדת לכל בקשה?">

כן. התוסף תוחם את השפה הפעילה לטווח הבקשה (request scope), כך ששתי בקשות מקבילות בשפות שונות לעולם לא יקראו את השפה זו של זו. זה מה שהופך את הקריאות ל-`t()` ול-`getIntlayer()` לבטוחות מתוך שירות (service) מבלי להעביר ארגומנט של שפה דרך כל פונקציה.

</Question>
<Question title="כיצד שולחים הודעות דוא\"ל תפעוליות בשפת הנמען?">

הצהירו על תוכן הדוא"ל בקובץ תוכן בדיוק כמו כל תוכן אחר, ולאחר מכן אחזרו אותו באמצעות `getIntlayer` עבור השפה השמורה של הנמען במקום שפת הבקשה. זה חיוני עבור משימות רקע ותורים (jobs and queues), שבהם השפה שייכת לרשומת המשתמש ואין בקשה נכנסת שממנה ניתן לקרוא כותרת.

</Question>
<Question title="כיצד מבצעים לוקליזציה של הודעות שגיאה ב-API?">

עטפו את ההודעה ב-`t()` בנקודה שבה השגיאה נוצרת. שפת הבקשה הפעילה תפענח אותה, כך שהלקוח יקבל הודעה שניתן להציג ישירות, וצד-הלקוח שלכם לא יזדקק לקטלוג מקביל של קודי שגיאה.

</Question>
<Question title="האם זה עובד ב-Bun ובסביבות ריצה של edge?">

Elysia מיועדת בראש ובראשונה ל-Bun, ו-Intlayer מפענח תוכן מתוך מילונים שקומפלו בזמן הבנייה במקום לקרוא קובצי קטלוג מהדיסק בזמן ריצה, וזה מה שלרוב נשבר בסביבות edge. השאירו את `dictionary.importMode` בערך ברירת המחדל שלו `"static"` כדי שהתוכן ייאגד יחד עם השרת.

</Question>
<Question title="האם התוסף שומר על הסקת הטיפוסים מקצה לקצה של Elysia?">

כן. התוסף נרשם באמצעות `.use()` בדיוק כמו כל תוסף Elysia אחר, כך שהטיפוסים המשורשרים ממשיכים לזרום, ומפתחות המילון שלכם מוגדרים טיפוסית בנפרד מתוך קובץ ה-`types/intlayer.d.ts` שנוצר.

</Question>
<Question title="כיצד מתרגמים את תוכן צד-השרת באופן אוטומטי באמצעות AI?">

הריצו `npx intlayer fill`, אשר ממלא תרגומים חסרים בעזרת מודל ה-LLM לבחירתכם, תוך שימוש בספק ובמפתח ה-API שלכם. הוסיפו את הדגל `--git-diff` כדי לתרגם רק את התוכן שהשתנה בענף הנוכחי. ראו את [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/fill.md) ו[אינטגרציית CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/fill.md)
- [אינטגרציית CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/CI_CD.md)

</Question>
<Question title="האם Intlayer תומך בריבוי, מגדר וערכים מוטמעים בשרת?">

כן: [צורות רבים (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/plurial.md), [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/gender.md), תנאים, [הטמעות (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/insertion.md) עבור ערכים משתנים, [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/markdown.md) לגוף הודעות דוא"ל, ו[מעצבים (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/formatters.md) עבור מספרים, תאריכים ומטבעות.

- [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/plurial.md)
- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/gender.md)
- [הטמעות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/markdown.md)
- [מעצבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/formatters.md)

</Question>
<Question title="האם מקבלים השלמה אוטומטית של TypeScript בשרת?">

כן. Intlayer מייצר את הטיפוסים של המילונים שלכם לתוך `./types/intlayer.d.ts`, כך שמפתח שאינו קיים מהווה שגיאת קומפילציה במקום מחרוזת ריקה בזמן ריצה. הריצו `npx intlayer test` ב-CI כדי להכשיל את תהליך הבנייה כאשר שפה מוצהרת חסרה תוכן.

</Question>
<Question title="האם צד-הלקוח וצד-השרת יכולים לחלוק את אותו התוכן?">

כן, וזהו המבנה המקובל. `elysia-intlayer` עובד לצד `react-intlayer`, `next-intlayer` ו-`vite-intlayer` על אותו תוכן מוצהר, כך שתווית המשמשת הן בתגובת API והן בדף אינטרנט מוצהרת פעם אחת בלבד. ראו [כיצד Intlayer עובד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/how_works_intlayer.md).

- [כיצד Intlayer עובד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/how_works_intlayer.md)

</Question>
<Question title="האם Intlayer חינמי ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. מערכת ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md) המאוחסנת היא שירות אופציונלי בתשלום שניתן גם [לארח עצמאית (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md).

- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)
- [אירוח עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md)

</Question>

</FAQ>
