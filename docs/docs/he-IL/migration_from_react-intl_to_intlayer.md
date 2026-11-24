---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "מעבר מ-react-intl ‏(FormatJS) ל-Intlayer"
description: "העבירו אפליקציית React מ-react-intl ל-Intlayer שלב אחר שלב. ‏useIntl, ‏FormattedMessage וכל קומפוננטות ה-Formatted* ממשיכים לעבוד עם ה-compat adapter ‏@intlayer/react-intl."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - internationalization
  - i18n
  - ICU
  - React
  - Vite
slugs:
  - doc
  - migration
  - react-intl
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# מעבר מ-react-intl ‏(FormatJS) ל-Intlayer

## למה לעבור מ-react-intl ל-Intlayer?

<AccordionGroup>
<Accordion header="גודל ה-bundle">

ב-react-intl, כל ההודעות של ה-locale מועברות ל-`IntlProvider`, כך שכל עמוד נושא את הקטלוג כולו. Intlayer שולחת רק את המילונים שכל עמוד משתמש בהם, וכך **מקטינה את גודל ה-bundles והעמודים בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות">

מזהי ההודעות **מוגדרים בטיפוסים** לפי המילונים שלכם: מזהים לא תקינים נכשלים בזמן ה-build. התוכן יכול לשבת ליד הקומפוננטות שמשתמשות בו.

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

1. **Compat adapter (מומלץ לאפליקציות קיימות)**: התקינו את `@intlayer/react-intl`. הוא חושף את אותו API של `react-intl` (`IntlProvider`, `useIntl`, `FormattedMessage`, `FormattedNumber`, `FormattedDate`, `defineMessages`, `createIntl`…) ומגיש את ההודעות מתוך המילונים של Intlayer. ICU MessageFormat, רבים, select ותגיות rich text עובדים כמו קודם.
2. **מעבר מלא**: החליפו בהדרגה את קריאות react-intl ב-`useIntlayer` ובקובצי `.content.ts` לצד הקומפוננטות.

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
npm install intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

> השאירו את `react-intl` מותקן: הוא מספק את טיפוסי TypeScript.

</Step>
<Step number={2} title="הגדרת Intlayer">

כוונו את התוסף `syncJSON` אל קובצי ההודעות הקיימים. הקטלוגים של react-intl הם maps שטוחים של מזהים עם נקודות:

```json fileName="src/lang/en.json"
{
  "home.title": "Welcome",
  "home.greeting": "Hello {name}",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

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
      // react-intl uses ICU MessageFormat
      format: "icu",
      source: ({ locale }) => `./src/lang/${locale}.json`,
      // 'home.title' → dictionary `home`, key `title`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

> המקטע הראשון של כל מזהה (`home`) הופך למילון של Intlayer, כך שכל עמוד טוען רק את המילונים שהוא משתמש בהם. כש-Intlayer כותבת תרגומים בחזרה, הקובץ שומר על המבנה השטוח שלו.

</Step>
<Step number={3} title="הוספת תוסף ה-Vite">

`reactIntlVitePlugin()` מריץ את ה-build של Intlayer ויוצר alias מ-`react-intl` אל `@intlayer/react-intl`, בלי שינוי בקובצי המקור.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactIntlVitePlugin } from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

> משתמשים ב-bundler אחר? שנו את שם ה-imports ל-`@intlayer/react-intl` (ראו שלב 5) והשתמשו בתוסף Intlayer של ה-bundler שלכם, למשל `withIntlayer` מתוך `next-intlayer` עבור Next.js.

</Step>
<Step number={4} title="הפסקת העברת הודעות ל-IntlProvider">

`IntlProvider` ממשיך לעבוד, אבל ההודעות נטענות כעת על ידי Intlayer. הסירו את ה-prop ‏`messages` ואת ה-import של הקטלוג:

```tsx fileName="src/main.tsx"
import { IntlProvider } from "react-intl";

export const App = ({ locale }: { locale: string }) => (
  <IntlProvider locale={locale} defaultLocale="en">
    <Home />
  </IntlProvider>
);
```

> אם `messages` עדיין מועבר, המערכת מתעלמת ממנו ומוצגת אזהרה בסביבת הפיתוח.

</Step>
</Steps>

הקומפוננטות שלכם ממשיכות לעבוד ללא שינוי, עם מזהים בעלי טיפוסים:

```tsx fileName="src/Home.tsx"
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

export const Home = () => {
  const intl = useIntl();

  return (
    <main>
      <h1>{intl.formatMessage({ id: "home.title" })}</h1>
      <FormattedMessage id="home.greeting" values={{ name: "Ada" }} />
      <FormattedNumber value={42} style="currency" currency="EUR" />
    </main>
  );
};
```

## מעבר מלא

<Steps>
<Step number={5} title="שינוי שם מפורש של imports (אופציונלי)" isOptional={true}>

תוסף ה-Vite כבר מטפל ב-aliases. כדי להפוך את התלות למפורשת:

| לפני                                            | אחרי                                                      |
| ----------------------------------------------- | --------------------------------------------------------- |
| `import { IntlProvider } from 'react-intl'`     | `import { IntlProvider } from '@intlayer/react-intl'`     |
| `import { useIntl } from 'react-intl'`          | `import { useIntl } from '@intlayer/react-intl'`          |
| `import { FormattedMessage } from 'react-intl'` | `import { FormattedMessage } from '@intlayer/react-intl'` |
| `import { defineMessages } from 'react-intl'`   | `import { defineMessages } from '@intlayer/react-intl'`   |
| `import { createIntl } from 'react-intl'`       | `import { createIntl } from '@intlayer/react-intl'`       |

</Step>
<Step number={6} title="העברת התוכן לקובצי .content.ts" isOptional={true}>

קומפוננטות חדשות יכולות להשתמש בתוכן נייטיב של Intlayer לצד קריאות react-intl קיימות:

```typescript fileName="src/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```tsx fileName="src/Home.tsx"
import { useIntlayer } from "react-intlayer";

export const Home = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
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

| קובץ / תבנית                                | למה כבר לא נחוץ                                            |
| ------------------------------------------- | ---------------------------------------------------------- |
| ה-prop ‏`messages` וטעינת הקטלוג             | Intlayer מקמפלת וטוענת את המילונים.                        |
| שלב `formatjs compile`                      | Intlayer מפענחת הודעות ICU ישירות מקובצי ה-JSON.           |
| יצירת מזהים באמצעות `babel-plugin-formatjs` | השתמשו במזהים מפורשים עם נקודות כדי שכל מזהה יתאים למילון. |

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

- [react-intl compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/react-intl.md)
- [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [Intlayer עם Vite ו-React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+react.md)
- [מעבר מ-react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_react-i18next_to_intlayer.md)
- [העורך הוויזואלי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
