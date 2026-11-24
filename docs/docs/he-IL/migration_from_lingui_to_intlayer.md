---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "מעבר מ-Lingui ל-Intlayer"
description: "העבירו אפליקציית React מ-Lingui ל-Intlayer שלב אחר שלב. המאקרואים של Lingui, ‏useLingui ו-<Trans> ממשיכים לעבוד עם ה-compat adapter ‏@intlayer/lingui."
keywords:
  - lingui
  - "@lingui/react"
  - "@lingui/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - React
  - Vite
slugs:
  - doc
  - migration
  - lingui
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# מעבר מ-Lingui ל-Intlayer

## למה לעבור מ-Lingui ל-Intlayer?

<AccordionGroup>
<Accordion header="גודל ה-bundle">

Lingui טוענת קטלוג מקומפל אחד לכל locale, עם כל ההודעות של האפליקציה. Intlayer מחלקת את התוכן לפי מילון ושולחת רק את מה שכל עמוד משתמש בו, וכך **מקטינה את גודל ה-bundles והעמודים בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות">

המילונים של Intlayer **מוגדרים בטיפוסים מלאים** ויכולים לשבת ליד הקומפוננטות שמשתמשות בהם. אין שלבי `extract` / `compile` לזכור: המילונים נבנים על ידי תוסף ה-bundler.

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

1. **Compat adapter (מומלץ לאפליקציות קיימות)**: התקינו את `@intlayer/lingui`. הוא חושף את אותו API של `@lingui/core` ו-`@lingui/react` (`i18n`, `setupI18n`, `I18nProvider`, `useLingui`, `Trans`) ומגיש את ההודעות מתוך המילונים של Intlayer. המאקרואים שלכם (`` t`…` ``, `<Trans>`, `msg`, `plural`) ממשיכים להתקמפל בדיוק כמו קודם.
2. **מעבר מלא**: החליפו בהדרגה את קריאות Lingui ב-`useIntlayer` ובקובצי `.content.ts` לצד הקומפוננטות.

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
npm install intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

> השאירו מותקנים את `@lingui/core`, `@lingui/react` ואת תוסף המאקרו (`@lingui/babel-plugin-lingui-macro` או `@lingui/swc-plugin`). המאקרואים ממשיכים לרוץ, וה-packages של Lingui מספקים את טיפוסי TypeScript.

</Step>
<Step number={2} title="הגדרת Intlayer">

Intlayer קוראת את הקטלוגים של Lingui כמקור האמת. במבנה ברירת המחדל של Lingui (`src/locales/{locale}/messages.po`), כוונו אליהם את התוסף `syncPO`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      // ./src/locales/en/messages.po → dictionary `messages`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

<Accordion header="שימוש בקטלוגי JSON">

עם `@lingui/format-json`, השתמשו ב-`syncJSON` עם פורמט ICU:

```typescript fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

// ...
plugins: [
  syncJSON({
    format: "icu",
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
],
```

</Accordion>

> השתמשו במזהי הודעה מפורשים (`t({ id: "hero.title", message: "Welcome" })` או `<Trans id="hero.title">`). מזהים שנוצרים מטקסט המקור אינם מפוענחים מול הקטלוגים.

</Step>
<Step number={3} title="החלפת תוסף ה-Vite של Lingui">

החליפו את `@lingui/vite-plugin` ב-`@intlayer/lingui/plugin`. השם נשאר `lingui()`: התוסף מריץ את ה-build של Intlayer ויוצר aliases מ-`@lingui/core` ו-`@lingui/react` אל `@intlayer/lingui`, בלי שינוי בקובצי המקור.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin"; // was "@lingui/vite-plugin"

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

> השאירו את תוסף המאקרו בתוך תוסף React (Babel או `@lingui/swc-plugin`), כך שהמאקרואים יתקמפלו לקריאות `i18n._()` לפני ש-Intlayer מפענחת אותם.

</Step>
</Steps>

הקומפוננטות שלכם ממשיכות לעבוד ללא שינוי:

```tsx fileName="src/Hero.tsx"
import { Trans, useLingui } from "@lingui/react/macro";

export const Hero = ({ name }: { name: string }) => {
  const { t } = useLingui();

  return (
    <header>
      <h1>{t({ id: "hero.title", message: "Welcome" })}</h1>
      <Trans id="hero.greeting">Hello {name}</Trans>
    </header>
  );
};
```

החלפת locale עדיין מתבצעת דרך `i18n.activate(locale)`, שמעדכן כל צרכן של `useLingui()`.

## מעבר מלא

<Steps>
<Step number={4} title="הסרת טעינת קטלוגים בזמן ריצה" isOptional={true}>

ההודעות מגיעות כעת מהמילונים של Intlayer שמקומפלים בזמן ה-build. קריאות `i18n.load()` / `i18n.loadAndActivate()` משמשות רק כ-fallback ומציגות אזהרה בסביבת הפיתוח. החליפו אותן ב-`i18n.activate(locale)` והסירו את שלב `lingui compile`. השאירו את `lingui extract` לאיסוף מזהי הודעה חדשים.

</Step>
<Step number={5} title="שינוי שם מפורש של imports (אופציונלי)" isOptional={true}>

תוסף ה-Vite כבר מטפל ב-aliases. כדי להפוך את התלות למפורשת:

| לפני                                               | אחרי                                                  |
| -------------------------------------------------- | ----------------------------------------------------- |
| `import { i18n } from '@lingui/core'`              | `import { i18n } from '@intlayer/lingui'`             |
| `import { setupI18n } from '@lingui/core'`         | `import { setupI18n } from '@intlayer/lingui'`        |
| `import { I18nProvider } from '@lingui/react'`     | `import { I18nProvider } from '@intlayer/lingui'`     |
| `import { useLingui, Trans } from '@lingui/react'` | `import { useLingui, Trans } from '@intlayer/lingui'` |

</Step>
<Step number={6} title="העברת התוכן לקובצי .content.ts" isOptional={true}>

קומפוננטות חדשות יכולות להשתמש בתוכן נייטיב של Intlayer לצד קריאות Lingui קיימות:

```typescript fileName="src/hero.content.ts"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default heroContent;
```

```tsx fileName="src/Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

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

התרגומים שהושלמו נכתבים בחזרה לקטלוגים של Lingui. להגדרת ה-AI עיינו ב[תיעוד ה-CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).

</Step>
</Steps>

## מה אפשר למחוק אחרי המעבר

| קובץ / תבנית                               | למה כבר לא נחוץ                                    |
| ------------------------------------------ | -------------------------------------------------- |
| `i18n.load()` / imports דינמיים של קטלוגים | Intlayer מקמפלת וטוענת את המילונים.                |
| `lingui compile` וקטלוגי `.js` מקומפלים    | Intlayer בונה את המילונים ישירות מהקטלוגים שלכם.   |
| `@lingui/vite-plugin`                      | הוחלף ב-`lingui()` מתוך `@intlayer/lingui/plugin`. |

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

- [Lingui compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/lingui.md)
- [תוסף sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md)
- [Intlayer עם Vite ו-React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+react.md)
- [העורך הוויזואלי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md)
