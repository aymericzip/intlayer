---
createdAt: 2025-09-09
updatedAt: 2026-11-03
priority: 9
title: "NestJS i18n - מדריך מלא לתרגום האפליקציה שלך"
description: "הגדירו את Intlayer ב-NestJS: זהו את השפה (locale) לכל בקשה, תרגמו תגובות controllers והודעות אימות, עם טיפוסיות מלאה מקצה לקצה."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - NestJS
  - JavaScript
  - צד שרת
slugs:
  - doc
  - environment
  - nest
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון השימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 7.5.9
    date: 2025-12-30
    changes: "הוספת פקודת init"
  - version: 5.8.0
    date: 2025-09-09
    changes: "תיעוד ראשוני"
author: aymericzip
---

# תרגום אתר צד-שרת מבוסס Nest באמצעות Intlayer

`express-intlayer` הוא תוסף תווך (middleware) עוצמתי לבינאום (i18n) עבור אפליקציות Express, שנועד להפוך את שירותי צד-השרת שלכם לנגישים גלובלית על ידי מתן מענה מקומי המבוסס על העדפות הלקוח. מכיוון ש-NestJS בנויה על גבי Express, תוכלו לשלב בצורה חלקה את `express-intlayer` באפליקציות ה-NestJS שלכם כדי לנהל תוכן רב-לשוני ביעילות.

## מקרי שימוש מעשיים

- **הצגת שגיאות צד-שרת בשפת המשתמש**: כאשר מתרחשת שגיאה, הצגת הודעות בשפת האם של המשתמש משפרת את ההבנה ומפחיתה תסכול. הדבר שימושי במיוחד עבור הודעות שגיאה דינמיות שעשויות להופיע ברכיבי צד-לקוח כמו הודעות קופצות (toasts) או חלונות מודאליים.

- **שליפת תוכן רב-לשוני**: עבור אפליקציות שמושכות תוכן ממסד נתונים, בינאום מבטיח שתוכלו להגיש תוכן זה במספר שפות. הדבר חיוני עבור פלטפורמות כגון אתרי מסחר אלקטרוני (e-commerce) או מערכות ניהול תוכן (CMS) שצריכות להציג תיאורי מוצרים, מאמרים ותוכן נוסף בשפה המועדפת על המשתמש.

- **שליחת הודעות דוא"ל רב-לשוניות**: בין אם מדובר בהודעות דוא"ל תפעוליות (transactional), קמפיינים שיווקיים או התראות, שליחת הודעות דוא"ל בשפת הנמען יכולה לשפר משמעותית את המעורבות והאפקטיביות.

- **התראות Push רב-לשוניות**: עבור אפליקציות מובייל, שליחת התראות push בשפה המועדפת על המשתמש יכולה להעצים את האינטראקציה ושימור המשתמשים. מגע אישי זה הופך את ההתראות לרלוונטיות יותר.

- **תקשורות אחרות**: כל צורת תקשורת מצד השרת, כגון הודעות SMS, התראות מערכת או עדכוני ממשק משתמש, מרוויחה מהיותה בשפת המשתמש, מה שמבטיח בהירות ומשפר את חוויית המשתמש הכוללת.

על ידי בינאום צד השרת, האפליקציה שלכם לא רק מכבדת הבדלים תרבותיים אלא גם מתאימה את עצמה טוב יותר לצורכי השוק הגלובלי, מה שמהווה שלב מפתח בהרחבת השירותים שלכם ברחבי העולם.

## תחילת העבודה

### יצירת פרויקט NestJS חדש

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### התקנה

כדי להתחיל להשתמש ב-`express-intlayer`, התקינו את החבילה באמצעות מנהל החבילות שלכם:

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

### הגדרת tsconfig.json

כדי להשתמש ב-Intlayer עם TypeScript, ודאו ש-`tsconfig.json` מוגדר לתמיכה במודולי ES. תוכלו לעשות זאת על ידי הגדרת האפשרויות `module` ו-`moduleResolution` ל-`nodenext`.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... אפשרויות נוספות
  },
}
```

### הגדרת תצורה

הגדירו את תצורת הבינאום על ידי יצירת קובץ `intlayer.config.ts` בתיקיית השורש של הפרויקט:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### הצהרת התוכן שלכם

צרו ונהלו את הצהרות התוכן שלכם כדי לאחסן תרגומים:

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> הצהרות התוכן שלכם יכולות להיות מוגדרות בכל מקום באפליקציה, כל עוד הן נכללות בתיקייה `contentDir` (כברירת מחדל, `./src`) ומתאימות לסיומת קובץ הצהרת התוכן (כברירת מחדל, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> לפרטים נוספים, עיינו ב[תיעוד הצהרת התוכן](/doc/concept/content).

### הגדרת Middleware של Express

שלבו את ה-middleware של `express-intlayer` באפליקציית ה-NestJS שלכם כדי לטפל בבינאום:

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // החלה על כל הנתיבים
  }
}
```

### שימוש בתרגומים בשירותים או ב-Controllers שלכם

כעת תוכלו להשתמש בפונקציה `getIntlayer` כדי לגשת לתרגומים בשירותים או ב-Controllers שלכם:

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet;
  }
}
```

### תאימות

`express-intlayer` תואם לחלוטין עם:

- [`react-intlayer`](/doc/packages/react-intlayer)
- [`next-intlayer`](/doc/packages/next-intlayer)
- [`vite-intlayer`](/doc/packages/vite-intlayer)

הוא פועל בצורה חלקה גם עם כל פתרון בינאום במגוון סביבות, כולל דפדפנים ובקשות API. תוכלו להתאים אישית את ה-middleware לזיהוי שפה (locale) דרך כותרות (headers) או עוגיות (cookies):

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

כברירת מחדל, `express-intlayer` יפרש את הכותרת `Accept-Language` כדי לקבוע את השפה המועדפת על הלקוח.

> למידע נוסף על תצורה ונושאים מתקדמים, בקרו ב[תיעוד התצורה](/doc/concept/configuration).

### הגדרת TypeScript

`express-intlayer` ממנף את היכולות החזקות של TypeScript כדי להעצים את תהליך הבינאום. מערכת הטיפוסים הסטטית של TypeScript מבטיחה שכל מפתח תרגום נלקח בחשבון, מפחיתה את הסיכון לתרגומים חסרים ומשפרת את יכולת התחזוקה.

![השלמה אוטומטית](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![שגיאת תרגום](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

ודאו שהטיפוסים שנוצרו אוטומטית (כברירת מחדל ב-`./types/intlayer.d.ts`) כלולים בקובץ ה-`tsconfig.json` שלכם.

```json5 fileName="tsconfig.json"
{
  // ... תצורות ה-TypeScript הקיימות שלכם
  include: [
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

לפרטים נוספים על אופן השימוש בתוסף, עיינו ב[תיעוד התוסף של Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md).

- [תיעוד התוסף של Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)

### הגדרת Git

מומלץ להתעלם מהקבצים שנוצרים על ידי Intlayer כדי למנוע את העלאתם למאגר ה-Git שלכם.

לשם כך, תוכלו להוסיף את ההוראה הבאה לקובץ ה-`.gitignore` שלכם:

```plaintext fileName=".gitignore"
# התעלמות מקבצים שנוצרו על ידי Intlayer
.intlayer
```

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום צד-שרת ב-NestJS?">

ל-NestJS יש את `nestjs-i18n`, שהוא הבחירה הנפוצה ומכסה קטלוגים של JSON או YAML באמצעות שירות בטווח הבקשה (request scoped service). החלופה היא `Intlayer` דרך `express-intlayer`, אשר משתמש באותן הצהרות תוכן כמו בצד-הלקוח שלכם, בעל טיפוסיות חזקה מול המילונים שלכם, ומגיע עם תרגום מבוסס AI ומערכת CMS.

הסיבה העיקרית לבינאום צד-השרת היא שחלק ניכר מהטקסט שהמשתמש קורא אינו עובר כלל דרך צד-הלקוח: הודעות שגיאה של ה-API, הודעות דוא"ל תפעוליות, התראות push, הודעות SMS וקובצי PDF מיוצאים. כל אלה דורשים את שפת הנמען, הנקבעת לכל בקשה ולא לכל הפעלה (session).

ראו [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md).

- [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)

</Question>
<Question title="בכמה משפיע ה-i18n על גודל החבילה (bundle size) של שרת ה-NestJS שלי?">

מעט מאוד. המילונים מקומפלים מראש (ahead of time) ורק השפות שהצהרתם עליהן נכללות, כך שאין טעינת קטלוגים בעליית השרת ואין קריאות קבצים במהלך ניתוב הבקשה. יש לכך חשיבות רבה במיוחד בפריסות serverless ו-edge, שבהן גודל החבילה משפיע ישירות על זמן ה-cold start. ראו [אופטימיזציית חבילות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md).

- [אופטימיזציית חבילות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)

</Question>
<Question title="האם ניתן להגר מ-i18next מבלי לשכתב את ה-handlers שלי?">

כן, ויש שני נתיבים אפשריים. תוכלו להגר את התוכן בהדרגה בעזרת [מדריך ההגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md). לחלופין, תוכלו לשמור על ה-API הנוכחי שלכם לחלוטין: [מתאמי התאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md) חושפים בדיוק את אותו ה-API כמו `i18next`, אך מוגשים על ידי מילוני Intlayer, כך שרק הייבואים (imports) משתנים וקוד ה-handlers נשאר ללא שינוי.

- [מדריך ההגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md)
- [מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md)

</Question>
<Question title="האם אוכל לשמור על קובצי תרגום ה-JSON הקיימים שלי?">

כן. [תוסף סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קובצי ה-`/messages/{locale}/{namespace}.json` כמקור האמת ומייצר מהם מילוני Intlayer בשני הכיוונים. [תוסף סנכרון ה-PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו[קבצים לפי שפה (per locale files)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md) מאפשרים לפצל תוכן לפי שפה במקום לקבץ את כל השפות בקובץ אחד.

- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [תוסף סנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הריצו `npx intlayer extract` ו-Intlayer יקרא את קובצי המקור שלכם, ישלוף את המחרוזות המוצגות למשתמש ויכתוב קובץ `.content` לצד כל קובץ מקור, כך שתוכלו לסקור diff במקום להעתיק מחרוזות לקטלוג אחת אחת. ראו את [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md).

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

בצד הלקוח של אותו פרויקט, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) לוקח זאת צעד קדימה ומייצר את המילונים בזמן הבנייה מתוך קוד ה-JSX, TSX, Vue או Svelte שלכם, כך ששני חלקי האפליקציה חולקים שכבת תוכן אחת ללא צורך בתחזוקת מפתחות ידנית.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)

</Question>
<Question title="אילו כלי עריכה וסוכני AI זמינים?">

חמישה כלים, כולם אופציונליים:

- **[תוסף ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)**: קפיצה ממפתח ב-`useIntlayer` אל קובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת build, fill, test, push ו-pull מלוח הפקודות או מטאב ייעודי של Intlayer.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**: אותה רמת מודעות בכל עורך שתומך ב-LSP, עם מעבר להגדרה (go to definition), מציאת כל המופעים (find all references), תצוגה מקדימה בריחוף עכבר של ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, ואזהרה כאשר מפתח אינו מוצהר בשום מקום. הוא גם מפענח קריאות של `i18next`, `react-i18next`, `next-intl` ו-`use-intl`, מה שעוזר בזמן ההגירה.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer עבור Cursor, VS Code, Claude Desktop, Claude Code ו-ChatGPT, כך שעוזר חכם עונה מתוך התיעוד העדכני במקום לנחש, ויכול להריץ פקודות כמו `intlayer fill` בעצמו.
- **[כישורי סוכנים (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**: כישורים ממוקדים כגון `intlayer-config`, `intlayer-cli` ו-`intlayer-content`, בנוסף לכישור ייעודי לכל framework, המלמדים את הסוכן שלכם על הגדרות הניתוב וסוגי צמתי התוכן.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md)**: הכלל `no-raw-text` מסמן מחרוזות מקודדות (hardcoded), עם כללים נוספים עבור מפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="כיצד Intlayer יודע באיזו שפה לענות?">

כברירת מחדל, `express-intlayer` קורא את הכותרת `Accept-Language` של הבקשה הנכנסת ובוחר את השפה המוצהרת הקרובה ביותר, תוך חזרה לשפת ברירת המחדל שלכם בעת הצורך. תוכלו לשנות את המקור באמצעות `routing.storage`, לדוגמה כותרת מותאמת אישית או עוגייה (cookie) שנקבעה על ידי צד הלקוח, כך שה-API יענה בשפה שהמשתמש בחר בפועל ולא בזו שהדפדפן שלו מציג. ראו את [מדריך התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [מדריך התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Question>
<Question title="האם השפה מבודדת לכל בקשה?">

כן. ה-middleware תוחם את השפה הפעילה לטווח הבקשה (request scope), כך ששתי בקשות מקבילות בשפות שונות לעולם לא יקראו את השפה זו של זו. זה מה שהופך את הקריאות ל-`t()` ול-`getIntlayer()` לבטוחות מתוך שירות (service) מבלי להעביר ארגומנט של שפה דרך כל פונקציה.

</Question>
<Question title="כיצד שולחים הודעות דוא\"ל תפעוליות בשפת הנמען?">

הצהירו על תוכן הדוא"ל בקובץ תוכן בדיוק כמו כל תוכן אחר, ולאחר מכן אחזרו אותו באמצעות `getIntlayer` עבור השפה השמורה של הנמען במקום שפת הבקשה. זה חיוני עבור משימות רקע ותורים (jobs and queues), שבהם השפה שייכת לרשומת המשתמש ואין בקשה נכנסת שממנה ניתן לקרוא כותרת.

</Question>
<Question title="כיצד מבצעים לוקליזציה של הודעות שגיאה ב-API?">

עטפו את ההודעה ב-`t()` בנקודה שבה השגיאה נוצרת. שפת הבקשה הפעילה תפענח אותה, כך שהלקוח יקבל הודעה שניתן להציג ישירות, וצד-הלקוח שלכם לא יזדקק לקטלוג מקביל של קודי שגיאה.

</Question>
<Question title="האם ניתן להזריק תרגומים לתוך שירות או controller של NestJS?">

כן. קראו ל-`getIntlayer("app")` בתוך השירות או ה-controller, כפי שמוצג למעלה. אין מודול שצריך לרשום עבור כל תכונה (feature) ואין token שצריך להזריק, מכיוון שהשפה הפעילה מגיעה מהקשר הבקשה שה-middleware התקין.

</Question>
<Question title="כיצד מתרגמים את תוכן צד-השרת באופן אוטומטי באמצעות AI?">

הריצו `npx intlayer fill`, אשר ממלא תרגומים חסרים בעזרת מודל ה-LLM לבחירתכם, תוך שימוש בספק ובמפתח ה-API שלכם. הוסיפו את הדגל `--git-diff` כדי לתרגם רק את התוכן שהשתנה בענף הנוכחי. ראו את [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md) ו[אינטגרציית CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md)
- [אינטגרציית CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md)

</Question>
<Question title="האם Intlayer תומך בריבוי, מגדר וערכים מוטמעים בשרת?">

כן: [צורות רבים (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md), [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md), תנאים, [הטמעות (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md) עבור ערכים משתנים, [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md) לגוף הודעות דוא"ל, ו[מעצבים (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md) עבור מספרים, תאריכים ומטבעות.

- [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md)
- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md)
- [הטמעות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md)
- [מעצבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)

</Question>
<Question title="האם מקבלים השלמה אוטומטית של TypeScript בשרת?">

כן. Intlayer מייצר את הטיפוסים של המילונים שלכם לתוך `./types/intlayer.d.ts`, כך שמפתח שאינו קיים מהווה שגיאת קומפילציה במקום מחרוזת ריקה בזמן ריצה. הריצו `npx intlayer test` ב-CI כדי להכשיל את תהליך הבנייה כאשר שפה מוצהרת חסרה תוכן.

</Question>
<Question title="האם צד-הלקוח וצד-השרת יכולים לחלוק את אותו התוכן?">

כן, וזהו המבנה המקובל. `express-intlayer` עובד לצד `react-intlayer`, `next-intlayer` ו-`vite-intlayer` על אותו תוכן מוצהר, כך שתווית המשמשת הן בתגובת API והן בדף אינטרנט מוצהרת פעם אחת בלבד. ראו [כיצד Intlayer עובד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/how_works_intlayer.md).

- [כיצד Intlayer עובד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/how_works_intlayer.md)

</Question>
<Question title="האם Intlayer חינמי ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. מערכת ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) המאוחסנת היא שירות אופציונלי בתשלום שניתן גם [לארח עצמאית (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md).

- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)
- [אירוח עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md)

</Question>

</FAQ>
