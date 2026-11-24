---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "מעבר מ-ngx-translate ל-Intlayer"
description: "העבירו אפליקציית Angular מ-ngx-translate ל-Intlayer שלב אחר שלב. ה-pipe ‏translate, הדירקטיבה translate ו-TranslateService ממשיכים לעבוד עם ה-compat adapter ‏@intlayer/ngx-translate."
keywords:
  - ngx-translate
  - "@ngx-translate/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - Angular
slugs:
  - doc
  - migration
  - ngx-translate
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# מעבר מ-ngx-translate ל-Intlayer

## למה לעבור מ-ngx-translate ל-Intlayer?

<AccordionGroup>
<Accordion header="ללא HTTP loader">

ngx-translate מורידה קובצי locale בזמן ריצה דרך `TranslateHttpLoader`, מה שמעכב את הרינדור הראשון. Intlayer מקמפלת את המילונים בזמן ה-build, כך שהתרגומים זמינים מיד.

</Accordion>
<Accordion header="תחזוקתיות">

המפתחות **מוגדרים בטיפוסים** לפי המילונים שלכם: מפתחות לא תקינים נכשלים בזמן ה-build. התוכן יכול לשבת ליד הקומפוננטות שמשתמשות בו.

</Accordion>
<Accordion header="סוכן AI">

תוכן שיושב ליד הקומפוננטות **מקטין את ההקשר הנדרש** ל-LLM. Intlayer מספקת **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**, **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)** ו-**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**.

</Accordion>
<Accordion header="אוטומציה">

תרגמו הודעות חסרות ב-pipeline של CI/CD עם ה-LLM שתבחרו, או ברקע דרך [פלטפורמת הווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md).

</Accordion>
<Accordion header="התרחבות עם אנשים שאינם מפתחים">

Intlayer מספקת **[עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)** באירוח עצמי ו-**[CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)** כדי שמתרגמים וכותבי תוכן יערכו תוכן בזמן אמת.

</Accordion>
</AccordionGroup>

> כדי להבין מאיפה הגיעו הספריות האלה, קראו את [ההיסטוריה של i18n ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md).

## אסטרטגיות מעבר

1. **Compat adapter (מומלץ לאפליקציות קיימות)**: התקינו את `@intlayer/ngx-translate`. הוא חושף את אותו API של `@ngx-translate/core` (`provideTranslateService`, `TranslateService`, `TranslatePipe`, `TranslateDirective`, `TranslateModule`) ומגיש את ההודעות מתוך המילונים של Intlayer. התבניות שלכם נשארות ללא שינוי.
2. **מעבר מלא**: החליפו בהדרגה את קריאות ngx-translate ב-`useIntlayer` מתוך `angular-intlayer` ובקובצי `.content.ts` לצד הקומפוננטות.

## תוכן העניינים

<TOC/>

## מעבר מהיר

<Steps>
<Step number={1} title="התקנת תלויות">

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

> הדגל `--interactive` אופציונלי. השתמשו ב-`intlayer-cli init` אם אתם סוכן AI.

הפקודה מזהה את הסביבה שלכם ומתקינה את ה-packages הנדרשים, לדוגמה:

```bash packageManager="npm"
npm install intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
npm install -D @angular-builders/custom-esbuild
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
pnpm add -D @angular-builders/custom-esbuild
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
yarn add -D @angular-builders/custom-esbuild
```

```bash packageManager="bun"
bun add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
bun add -D @angular-builders/custom-esbuild
```

> השאירו את `@ngx-translate/core` מותקן: הוא מספק את טיפוסי TypeScript. אפשר להסיר את `@ngx-translate/http-loader`.

</Step>
<Step number={2} title="הגדרת Intlayer">

כוונו את התוסף `syncJSON` אל קובצי התרגום הקיימים. עם קובץ אחד לכל namespace ‏(`src/i18n/en/home.json`), כל קובץ הופך למילון:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // matches ngx-translate placeholder syntax: {{name}}
      format: "i18next",
      // ./src/i18n/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/i18n/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `'home.title' | translate` מפוענח לשדה `title` של המילון `home`. אם אתם משתמשים בקובץ יחיד לכל locale ‏(`src/assets/i18n/en.json`) עם מפתחות מקוננים, השתמשו במקום זאת ב-`source: ({ locale }) => \`./src/assets/i18n/${locale}.json\``: כל מפתח ברמה העליונה הופך למילון.

</Step>
<Step number={3} title="הוספת תוסף ה-esbuild">

ה-Angular CLI מקבל תוספי esbuild דרך `@angular-builders/custom-esbuild`. צרו קובץ תוספים:

```typescript fileName="esbuild.plugins.ts"
import { ngxTranslateEsbuildPlugin } from "@intlayer/ngx-translate/esbuild";

export default [ngxTranslateEsbuildPlugin()];
```

לאחר מכן הפנו אליו ב-`angular.json`:

```json5 fileName="angular.json"
{
  "architect": {
    "build": {
      "builder": "@angular-builders/custom-esbuild:application",
      "options": {
        "plugins": ["./esbuild.plugins.ts"],
        // ... your existing options
      },
    },
    "serve": {
      "builder": "@angular-builders/custom-esbuild:dev-server",
    },
  },
}
```

התוסף מריץ את ה-build של Intlayer ומפנה את `@ngx-translate/core` אל `@intlayer/ngx-translate`, בלי שינוי בקובצי המקור.

> בונים עם Vite ‏(Analog)? השתמשו במקום זאת ב-`ngxTranslateVitePlugin()` מתוך `@intlayer/ngx-translate/plugin`.

</Step>
<Step number={4} title="הסרת ה-HTTP loader">

השאירו את `provideTranslateService()`, אבל הסירו את האפשרות `loader`: ההודעות מגיעות מהמילונים של Intlayer.

```typescript fileName="src/app/app.config.ts"
import type { ApplicationConfig } from "@angular/core";
import { provideTranslateService } from "@ngx-translate/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideTranslateService({
      lang: "en",
      fallbackLang: "en",
    }),
  ],
};
```

> התרגומים כבר לא עוברים דרך loader, לכן אפשר להסיר את `TranslateHttpLoader` ואת `@ngx-translate/http-loader`.

</Step>
</Steps>

התבניות והשירותים שלכם ממשיכים לעבוד ללא שינוי:

```html fileName="src/app/app.html"
<h1>{{ 'home.title' | translate }}</h1>
<p [translate]="'home.greeting'" [translateParams]="{ name: 'Ada' }"></p>
<h2 translate>home.serviceSection</h2>
```

```typescript fileName="src/app/app.ts"
import { Component, inject } from "@angular/core";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  imports: [TranslatePipe],
  templateUrl: "./app.html",
})
export class App {
  private readonly translate = inject(TranslateService);

  readonly message = this.translate.instant("home.title");

  switchTo = (lang: string) => this.translate.use(lang);
}
```

## מעבר מלא

<Steps>
<Step number={5} title="שינוי שם מפורש של imports (אופציונלי)" isOptional={true}>

תוסף ה-esbuild כבר מטפל ב-aliases. כדי להפוך את התלות למפורשת:

| לפני                                                            | אחרי                                                                |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { TranslateService } from '@ngx-translate/core'`        | `import { TranslateService } from '@intlayer/ngx-translate'`        |
| `import { TranslatePipe } from '@ngx-translate/core'`           | `import { TranslatePipe } from '@intlayer/ngx-translate'`           |
| `import { provideTranslateService } from '@ngx-translate/core'` | `import { provideTranslateService } from '@intlayer/ngx-translate'` |

</Step>
<Step number={6} title="העברת התוכן לקובצי .content.ts" isOptional={true}>

קומפוננטות חדשות יכולות להשתמש בתוכן נייטיב של Intlayer לצד קריאות ngx-translate קיימות. רשמו את `provideIntlayer()` מתוך `angular-intlayer` לצד `provideTranslateService()` ב-`app.config.ts`, ואז:

```typescript fileName="src/app/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```typescript fileName="src/app/home.component.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  template: `<h1>{{ content().title }}</h1>`,
})
export class HomeComponent {
  content = useIntlayer("home");
}
```

</Step>
<Step number={7} title="הפעלת תרגום מבוסס AI" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

התרגומים שהושלמו נכתבים בחזרה לקובצי ה-JSON שלכם. להגדרת ה-AI עיינו ב[תיעוד ה-CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).

</Step>
</Steps>

## מה אפשר למחוק אחרי המעבר

| קובץ / תבנית                                | למה כבר לא נחוץ                         |
| ------------------------------------------- | --------------------------------------- |
| `TranslateHttpLoader` / loaders מותאמים     | Intlayer מקמפלת וטוענת את המילונים.     |
| `@ngx-translate/http-loader`                | אין עוד הורדה של קובצי תרגום בזמן ריצה. |
| `provideHttpClient()` (אם משמש רק לתרגומים) | מאותה סיבה.                             |

## הגדרת TypeScript

כללו את הטיפוסים שנוצרו ב-`tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## הגדרת Git

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [ngx-translate compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/ngx-translate.md)
- [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [Intlayer עם Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_angular_21.md)
- [העורך הוויזואלי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
