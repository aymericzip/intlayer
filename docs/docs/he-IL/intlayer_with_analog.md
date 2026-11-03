---
createdAt: 2025-04-18
updatedAt: 2026-11-03
priority: 9
title: "בינאום Analog (i18n), מדריך מלא לתרגום האפליקציה שלך"
description: "הגדרת Intlayer ב-Analog: תוכן בעל טיפוסיות (typed) לכל רכיב, זיהוי והחלפת שפה, וניתוב מתורגם עבור Angular עם Vite."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Analog
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - analog
applicationTemplate: https://github.com/aymericzip/intlayer-analog-template
applicationShowcase: https://intlayer-analog-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון השימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 8.0.4
    date: 2026-01-26
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תרגום אפליקציית Analog (Angular) באמצעות Intlayer

<Tabs defaultTab="code">
  <Tab label="קוד" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-analog-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - כיצד לבצע בינאום לאפליקציה שלכם באמצעות Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="דמו" value="demo">

<iframe
  src="https://intlayer-analog-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-analog-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## תוכן עניינים

<TOC/>

## למה לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות עיקריים כמו `ngx-translate` או `angular-l10n`, Intlayer הוא פתרון המגיע עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="כיסוי מלא ל-Analog">

Intlayer מותאם לעבודה מושלמת עם Analog ומציע **ניתוב רב-לשוני (multilingual routing)**, **תמיכה ב-SSR**, וכל התכונות הנדרשות להרחבת הבינאום (i18n) באפליקציות גדולות.

</Accordion>
<Accordion header="גודל החבילה (Bundle size)">

במקום לטעון קובצי JSON עצומים לתוך הדפים שלכם, טענו רק את התוכן הנחוץ. Intlayer מסייע **להפחית את גודל ה-bundle והדפים שלכם בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות">

הגדרת התוכן בצמוד לרכיבים **מפשטת את התחזוקה** באפליקציות בקנה מידה גדול. ניתן לשכפל או למחוק תיקיית תכונה (feature folder) אחת מבלי הנטל המנטלי של בדיקת כל בסיס הקוד של התוכן. בנוסף, Intlayer הוא **בעל טיפוסיות מלאה (fully typed)** כדי להבטיח את דיוק התוכן שלכם.

</Accordion>
<Accordion header="סוכני AI">

הצמדת תוכן לרכיבים **מצמצמת את ההקשר (context) הנדרש** על ידי מודלי שפה גדולים (LLMs). כמו כן, Intlayer מגיע עם חבילת כלים כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)** ו-**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)**, כדי להפוך את חוויית המפתח (DX) לחלקה אף יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמשו באוטומציה כדי לתרגם בתוך תהליך ה-CI/CD שלכם באמצעות מודל ה-LLM לבחירתכם בעלות של ספק ה-AI שלכם. Intlayer מציע גם **קומפיילר (compiler)** לאוטומציה של חילוץ תוכן, וכן [פלטפורמת אינטרנט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md) המסייעת **לתרגם ברקע**.

- [פלטפורמת אינטרנט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON עצומים לרכיבים עלול לגרום לבעיות ביצועים ותגובתיות (reactivity). Intlayer מבצע אופטימיזציה לטעינת התוכן שלכם בזמן הבנייה (build time).

</Accordion>
<Accordion header="הרחבה וניהול ללא מתכנתים">

יותר מסתם פתרון i18n,‏ Intlayer מספק **[עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) באחסון עצמי** ו-**[CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)** שיעזרו לכם לנהל את התוכן הרב-לשוני שלכם ב**זמן אמת**, מה שהופך את שיתוף הפעולה עם מתרגמים, כותבי תוכן וחברי צוות אחרים לחלק ופשוט. ניתן לאחסן תוכן באופן מקומי ו/או מרחוק.

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## מדריך שלב אחר שלב להגדרת Intlayer באפליקציית Analog

ראו את [תבנית האפליקציה](https://github.com/aymericzip/intlayer-analog-template) ב-GitHub.

<Steps>
<Step number={1} title="התקנת תלויות">

התקינו את החבילות הנחוצות באמצעות npm:

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
npm install intlayer angular-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer angular-intlayer vite-intlayer
```

- **intlayer**

  חבילת הליבה המספקת כלי בינאום לניהול תצורה, תרגום, [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md), טרנספילציה ו-[פקודות CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md).

- **angular-intlayer**
  החבילה המשלבת את Intlayer באפליקציית Angular. היא מספקת ספקי הקשר (context providers) והוקים עבור בינאום ב-Angular.

- **vite-intlayer**
  החבילה המשלבת את Intlayer ב-Vite. היא מספקת פלאגין לטיפול בקובצי הצהרת תוכן ומגדירה aliases לביצועים מיטביים.

</Step>
<Step number={2} title="הגדרת הפרויקט שלכם">

### ארכיטקטורה

בארכיטקטורה זו, `angular-intlayer` מספקת את `provideIntlayer()`, שנרשמת ב-`src/app/app.config.ts` כך שכל רכיב וכל דף מבוסס קובץ יכול לקרוא את התוכן שלו באמצעות הסיגנל `useIntlayer`. אפליקציית Analog מבוססת על Vite, ולכן הפלאגין `intlayer()` מתוך `vite-intlayer` מתווסף לצד `analog()` ב-`vite.config.ts` כדי לעקוב ולבנות מחדש את הצהרות התוכן שלכם ולהפעיל את פרוקסי השפות. הצהרות התוכן ממוקמות לצד רכיבים ודפים ב-`src/app/`.

```bash
.
├── src
│   ├── app
│   │   ├── pages
│   │   │   └── index.page.ts         # מסלול מבוסס קבצים המשתמש ב-useIntlayer
│   │   ├── app.config.ts             # הגדרות אפליקציה עם provideIntlayer()
│   │   ├── app.content.ts            # הצהרת תוכן של האפליקציה
│   │   └── locale-switcher.component.ts
│   └── main.ts
├── intlayer.config.ts
├── package.json
├── tsconfig.json
└── vite.config.ts                    # פלאגינים ל-Vite: analog() ו-intlayer()
```

### קובץ תצורה

צרו קובץ תצורה כדי להגדיר את השפות של האפליקציה שלכם:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // השפות הנוספות שלך
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> באמצעות קובץ תצורה זה, תוכלו להגדיר כתובות URL מקומיות, ניתוב מחדש באמצעות middleware, שמות עוגיות (cookies), מיקום וסיומות של הצהרות התוכן שלכם, ביטול יומני רישום (logs) של Intlayer במסוף, ועוד. לרשימה מלאה של הפרמטרים הזמינים, עיינו ב-[תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md).

- [תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

</Step>
<Step number={3} title="שילוב Intlayer בתצורת Vite שלכם">

כדי לשלב את Intlayer עם Analog, עליכם להשתמש בפלאגין `vite-intlayer`.

עדכנו את קובץ ה-`vite.config.ts` שלכם:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import analog from "@analogjs/platform";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    analog(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
}));
```

> הפלאגין `intlayer()` מגדיר את Vite עם Intlayer. הוא מטפל בקובצי הצהרת תוכן ומגדיר aliases לביצועים מיטביים.

</Step>
<Step number={4} title="הצהרת התוכן שלכם">

צרו ונהלו את הצהרות התוכן שלכם כדי לאחסן תרגומים:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu application está en ejecución. 🎉",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> ניתן להגדיר את הצהרות התוכן שלכם בכל מקום באפליקציה, כל עוד הן נכללות בספריית `contentDir` (כברירת מחדל, `./src`) ותואמות לסיומת קובץ הצהרת התוכן (כברירת מחדל, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> לפרטים נוספים, עיינו ב-[תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md).

- [תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md)

</Step>
<Step number={5} title="שימוש ב-Intlayer בקוד שלכם">

כדי להשתמש בתכונות הבינאום של Intlayer בכל רחבי אפליקציית ה-Analog שלכם, עליכם לרשום את ה-provider של Intlayer בתצורת האפליקציה.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideIntlayer } from "angular-intlayer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideIntlayer(), // הוסף כאן את ה-provider של Intlayer
  ],
};
```

לאחר מכן, תוכלו להשתמש בפונקציה `useIntlayer` בכל רכיב.

```typescript fileName="src/app/pages/index.page.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  standalone: true,
  template: `
    <div class="content">
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>
    </div>
  `,
})
export default class HomeComponent {
  content = useIntlayer("app");
}
```

התוכן של Intlayer מוחזר כ-`Signal`, כך שניגשים לערכים על ידי קריאה לסיגנל: `content().title`.

</Step>
<Step number={6} title="החלפת שפת התוכן שלכם" isOptional={true}>

כדי להחליף את שפת התוכן, תוכלו להשתמש בפונקציה `setLocale` המסופקת על ידי הפונקציה `useLocale`. זה מאפשר לכם להגדיר את שפת האפליקציה ולעדכן את התוכן בהתאם.

צרו רכיב להחלפה בין שפות:

```typescript fileName="src/app/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { useLocale } from "angular-intlayer";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="locale-switcher">
      <select
        [value]="locale()"
        (change)="setLocale($any($event.target).value)"
      >
        @for (loc of availableLocales; track loc) {
          <option [value]="loc">{{ loc }}</option>
        }
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

לאחר מכן, השתמשו ברכיב זה בדפים שלכם:

```typescript fileName="src/app/pages/index.page.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "../locale-switcher.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [LocaleSwitcherComponent],
  template: `
    <app-locale-switcher></app-locale-switcher>
    <div class="content">
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>
    </div>
  `,
})
export default class HomeComponent {
  content = useIntlayer("app");
}
```

</Step>

</Steps>

### הגדרת TypeScript

Intlayer עושה שימוש ב-module augmentation כדי להפיק תועלת מ-TypeScript ולהפוך את בסיס הקוד שלכם לחזק יותר.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

וודאו שתצורת ה-TypeScript שלכם כוללת את הטיפוסים שנוצרו אוטומטית.

```json5 fileName="tsconfig.json"
{
  // ... הגדרות ה-TypeScript הקיימות שלכם
  "include": [
    // ... הגדרות ה-TypeScript הקיימות שלכם
    ".intlayer/**/*.ts", // כלול את הטיפוסים שנוצרו אוטומטית
  ],
}
```

### הגדרת Git

מומלץ להתעלם מהקבצים שנוצרים על ידי Intlayer. זה מאפשר לכם להימנע מביצוע commit שלהם למאגר ה-Git שלכם.

לשם כך, תוכלו להוסיף את ההוראה הבאה לקובץ ה-`.gitignore` שלכם:

```bash
# התעלמות מקבצים שנוצרו על ידי Intlayer
.intlayer
```

### תוסף ל-VS Code

כדי לשפר את חוויית הפיתוח שלכם עם Intlayer, תוכלו להתקין את **תוסף Intlayer הרשמי ל-VS Code**.

- [התקנה מ-VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

תוסף זה מספק:

- **השלמה אוטומטית (Autocompletion)** עבור מפתחות תרגום.
- **זיהוי שגיאות בזמן אמת** עבור תרגומים חסרים.
- **תצוגה מקדימה מוטמעת (Inline previews)** של תוכן מתורגם.
- **פעולות מהירות (Quick actions)** ליצירה ועדכון קלים של תרגומים.

לפרטים נוספים על אופן השימוש בתוסף, עיינו ב-[תיעוד תוסף Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md).

- [תיעוד תוסף Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md)

### להעמיק עוד

כדי להתקדם הלאה, תוכלו להטמיע את [העורך החזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) או להעביר את התוכן שלכם לניהול חיצוני באמצעות [ה-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום אפליקציית Analog?">

אפליקציית Analog היא מטה-פריימוורק (meta framework) של Angular הבנוי על גבי Vite, כך שהיא יורשת את האפשרויות של Angular ומוסיפה עליהן את אלו של Vite:

- **`@angular/localize`**: חילוץ XLIFF עם גרסת בנייה נפרדת לכל שפה, דבר שאינו משתלב היטב עם נתב מבוסס קבצים ורינדור שרת.
- **`ngx-translate`** ו-**`Transloco`**: קטלוגי JSON בזמן ריצה דרך שירות, ללא אינטגרציה עם הניתוב של Analog או רינדור צד השרת.
- **`Intlayer`**: הפתרון המתקדם ביותר. תוכן מוגדר בכל מקום בבסיס הקוד שלכם ([לצד כל רכיב או בצורה מרוכזת](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)) ומקומפל על ידי פלאגין Vite בזמן בנייה, בעל טיפוסיות מלאה, עם החלפת שפה בזמן ריצה, תרגום AI, עורך חזותי ו-CMS.

ראו [למה כדאי להשתמש ב-Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/interest_of_intlayer.md) ואת [מדריך Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_angular_21.md) עבור ה-APIs הספציפיים ל-Angular.

- [למה כדאי להשתמש ב-Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/interest_of_intlayer.md)
- [מדריך Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_angular_21.md)

</Question>
<Question title="בכמה i18n מגדיל את גודל ה-bundle שלי ב-Analog?">

בהרבה פחות מאשר הגדרה מבוססת namespaces, מכיוון שדף אינו מוריד לעולם קטלוג שאינו מרונדר בו. תוכן מרונדר שרת מפוענח בשרת, והקומפיילר בזמן הבנייה מחליף קריאות `useIntlayer` ברשומות המילון המדויקות שהרכיב משתמש בהן, כך שמפתחות שאינם בשימוש ושפות שאינן בשימוש מושמטים, ו-[מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md) מפצלים את השאר לפי שפה. בהשוואה לחלופות הרגילות, Intlayer מפחית את גודל ה-bundle והדף בעד 50%. ראו [אופטימיזציית חבילה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md) ואת ה-[benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/index.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md)
- [אופטימיזציית חבילה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md)
- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/index.md)

</Question>
<Question title="האם ניתן להגר מ-`ngx-translate`, מ-`Transloco` או מ-`@angular/localize` מבלי לשכתב את התבניות שלי?">

במידה רבה, כן. עקבו אחר [מדריך ההגירה מ-ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/ngx-translate.md) או [מדריך ההגירה מ-Transloco](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/transloco.md) כדי להעביר את התוכן. ניתן גם להגר בהדרגה: [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md) שומר על קטלוגי ה-JSON הקיימים שלכם כמקור האמת ומייצר מהם מילוני Intlayer, כך ששתי השכבות נשארות מסונכרנות בזמן שאתם מעבירים תבניות אחת בכל פעם.

- [מדריך ההגירה מ-ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/ngx-translate.md)
- [מדריך ההגירה מ-Transloco](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/transloco.md)
- [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md)

</Question>
<Question title="האם אוכל לשמור על קובצי תרגום ה-JSON הקיימים שלי?">

כן. [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md) שומר על קובצי ה-`/messages/{locale}/{namespace}.json` שלכם כמקור האמת ומייצר מהם מילוני Intlayer, בשני הכיוונים. [תוסף sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו-[קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md) מאפשרים לכם לפצל תוכן לפי שפה במקום לקבץ את כל השפות בקובץ אחד.

- [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md)
- [תוסף sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הריצו `npx intlayer extract` ו-Intlayer יקרא את קובצי המקור שלכם, יחלץ את המחרוזות המוצגות למשתמש ויכתוב קובץ `.content` לצד כל אחד מהם, כך שתוכלו לבדוק diff במקום להעתיק מחרוזות לקטלוג אחת בכל פעם. ראו את [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md).

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md)

עבור pipeline אוטומטי לחלוטין, [הקומפיילר של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md) עושה את אותו הדבר בזמן הבנייה על קוד מקור של JSX, TSX, Vue ו-Svelte, ומייצר את המילונים בכל שינוי כך שאין צורך לתחזק מפתחות ידנית. הוא פועל באמצעות ניתוח סטטי (static analysis), כך שמחרוזות שקיימות רק בזמן ריצה אינן נכללות, והוא זקוק למספר הערות (annotations) קצרות כדי להבחין בין טקסט המוצג למשתמש לבין לוגיקת האפליקציה.

- [קומפיילר של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md)

</Question>
<Question title="אילו כלי עריכה וסוכני AI זמינים?">

חמישה כלים, כולם אופציונליים:

- **[תוסף VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md)**: קפיצה ישירה ממפתח `useIntlayer` לקובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת פקודות build, fill, test, push ו-pull מלוח הפקודות או מלשונית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)**: אותה מודעות בכל עורך שתומך ב-LSP, עם מעבר להגדרה (go to definition), מציאת כל ההפניות (find all references), תצוגה מקדימה בריחוף (hover preview) של ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, ואזהרה כאשר מפתח אינו מוצהר בשום מקום. הוא גם מפענח קריאות של `i18next`, `react-i18next`, `next-intl` ו-`use-intl`, מה שעוזר במהלך ההגירה.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer ל-Cursor, VS Code, Claude Desktop, Claude Code ו-ChatGPT, כך שעוזר AI עונה מתוך התיעוד העדכני במקום לנחש, ויכול להריץ פקודות כמו `intlayer fill` בעצמו.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)**: מיומנויות ממוקדות כגון `intlayer-config`, `intlayer-cli` ו-`intlayer-content`, בתוספת מיומנות ייעודית לכל framework, המלמדות את הסוכן על הגדרת הניתוב וסוגי צמתי התוכן שלכם.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/eslint.md)**: כלל `no-raw-text` מסמן מחרוזות מקודדות (hardcoded), עם כללים נוספים למפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="האם אני צריך build אחד לכל שפה?">

לא. זהו המודל של `@angular/localize`, שבו כל שפה מקומפלת לחבילה נפרדת ונפרסת בנפרד. עם Intlayer, גרסת build יחידה משרתת כל שפה מוצהרת, והשפה הפעילה נקבעת בזמן ריצה מתוך כתובת ה-URL, עוגייה (cookie) או כותרת ה-`Accept-Language`.

</Question>
<Question title="האם Intlayer תומך ב-Angular signals וברכיבי standalone?">

כן. תוכן נחשף באמצעות סיגנלים, כך שתבנית מתרנדרת מחדש בעת שינוי שפה ללא טעינה מחדש של הדף, וה-provider נרשם כמו כל provider עצמאי אחר.

</Question>
<Question title="כיצד אני מחליף שפה בזמן ריצה?">

שלב 6 מכסה זאת. הפונקציה `useLocale` חושפת את השפה הפעילה, השפות המוצהרות ופונקציית עדכון (setter) ששומרת את הבחירה, ו-`getLocalizedUrl` משכתבת את הנתיב הנוכחי כך שהמשתמש נשאר באותו מסלול לאחר ההחלפה.

</Question>
<Question title="האם זה עובד עם רינדור צד שרת של Analog ועם Vite?">

כן. הפלאגין `intlayer()` של Vite מקמפל את התוכן שלכם ועוקב אחריו בפיתוח, והשפה מפוענחת בשרת כך שתגובת ה-HTML הראשונה כבר מגיעה בשפה הנכונה. מסלולים המרונדרים מראש (prerendered routes) מפענחים את התוכן שלהם בזמן הבנייה.

</Question>
<Question title="כיצד אוכל לתרגם את האפליקציה באופן אוטומטי באמצעות AI?">

הריצו `npx intlayer fill`. הפקודה משלימה תרגומים חסרים באמצעות ה-LLM לבחירתכם, תוך שימוש בספק ובמפתח ה-API שלכם, והדגל `--git-diff` מגביל את ההרצה לתוכן שהשתנה בענף בלבד. עיינו ב-[פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/fill.md) וב-[אינטגרציית CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/fill.md)
- [אינטגרציית CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/CI_CD.md)

</Question>
<Question title="האם Intlayer תומך בריבוי (plurals), מגדר וטקסט עשיר?">

כן: [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/plurial.md), [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/gender.md), תנאים, [הזרקות (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/markdown.md) ו-[מעצבים (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/formatters.md) למספרים, תאריכים ומטבעות.

- [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/plurial.md)
- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/gender.md)
- [הזרקות (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/markdown.md)
- [מעצבים (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/formatters.md)

</Question>
<Question title="כיצד אוכל לתפוס תרגומים חסרים לפני פריסה לייצור?">

הריצו `npx intlayer test` ב-CI. הבנייה תיכשל כאשר חסר תוכן עבור שפה מוצהרת כלשהי. [תוסף VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md) מדווח על אותן שגיאות תוך כדי הקלדה. עיינו ב-[בדיקת התוכן שלכם](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/testing.md).

- [תוסף VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md)
- [בדיקת התוכן שלכם](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/testing.md)

</Question>
<Question title="כיצד מתרגמים יכולים לערוך את התוכן מבלי לגעת בקוד?">

באמצעות [העורך החזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md), הפועל על התשתית שלכם ומאפשר לכל אחד לערוך טקסט ישירות באפליקציה הפועלת, או [ה-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md), המוציא את התוכן לניהול חיצוני כך שניתן לשנותו ללא צורך בפריסה (deployment) מחדש.

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Question>
<Question title="האם Intlayer חינמי ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. ה-CMS המאוחסן הוא שירות אופציונלי בתשלום שניתן גם [לאחסנו באופן עצמאי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md).

- [אחסון עצמאי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md)

</Question>

</FAQ>
