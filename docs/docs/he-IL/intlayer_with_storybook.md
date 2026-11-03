---
createdAt: 2026-03-20
updatedAt: 2026-11-03
priority: 6
title: "Storybook i18n - מדריך מלא לתרגום האפליקציה שלך"
description: "הגדירו את Intlayer ב-Storybook: decorators רב-לשוניים לסיפורים והחלפת שפות, תוך שימוש באותו תוכן בעל טיפוסיות מלאה כמו באפליקציה שלכם."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Storybook
  - React
  - i18n
  - TypeScript
  - Vite
  - Webpack
slugs:
  - doc
  - storybook
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון השימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 8.4.5
    date: 2026-03-20
    changes: "אתחול תיעוד"
author: aymericzip
---

# Intlayer עם Storybook

## תוכן עניינים

<TOC/>

## מדוע לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות מובילים כמו `storybook-react-i18next` או `i18next`, ‏Intlayer הוא פתרון המגיע עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="כיסוי מלא עבור Storybook">

Intlayer מותאם לפעולה מושלמת עם Storybook על ידי מתן **decorators רב-לשוניים לסיפורים**, **החלפת שפות**, וכל התכונות הנדרשות להרחבת הבינאום (i18n) במערכת העיצוב (design system) שלכם.

</Accordion>
<Accordion header="גודל החבילה (Bundle size)">

במקום לטעון קובצי JSON ענקיים לתוך הדפים שלכם, טענו רק את התוכן הנדרש. Intlayer מסייע **להפחית את גודל החבילה והדפים שלכם בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות">

תיחום התוכן של האפליקציה שלכם **מקל על התחזוקה** באפליקציות בקנה מידה גדול. תוכלו לשכפל או למחוק תיקיית תכונה (feature) בודדת מבלי הנטל המחשבתי של סקירת כל קוד התוכן שלכם. בנוסף, Intlayer **בעל טיפוסיות מלאה** כדי להבטיח את דיוק התוכן שלכם.

</Accordion>
<Accordion header="סוכני AI">

מיקום התוכן לצד הקוד (co-location) **מפחית את ההקשר (context) הנדרש** עבור מודלי שפה גדולים (LLMs). ‏Intlayer מגיע גם עם חבילת כלים, כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)**, ו**[כישורי סוכנים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)**, כדי להפוך את חוויית המפתח (DX) לחלקה אף יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)
- [כישורי סוכנים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמשו באוטומציה כדי לתרגם בצינור ה-CI/CD שלכם באמצעות מודל ה-LLM לבחירתכם בעלות ספק ה-AI שלכם. Intlayer מציע גם **מהדר (compiler)** לאוטומציה של חילוץ תוכן, וכן [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md) המסייעת **לתרגם ברקע**.

- [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON ענקיים לרכיבים עלול לגרום לבעיות ביצועים ותגובתיות. Intlayer מבצע אופטימיזציה לטעינת התוכן שלכם בזמן הבנייה.

</Accordion>
<Accordion header="צמיחה ועבודה עם אנשי צוות שאינם מפתחים">

יותר מסתם פתרון i18n, ‏Intlayer מספק **[עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) באירוח עצמי** ו**[מערכת CMS מלאה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)** כדי לעזור לכם לנהל את התוכן הרב-לשוני שלכם **בזמן אמת**, מה שהופך את שיתוף הפעולה עם מתרגמים, כותבי תוכן וחברי צוות אחרים לפשוט וזורם. ניתן לאחסן תוכן באופן מקומי ו/או מרחוק.

- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [מערכת CMS מלאה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## מדוע להשתמש ב-Intlayer עם Storybook?

Storybook הוא הכלי הסטנדרטי בתעשייה לפיתוח ולתיעוד רכיבי ממשק משתמש (UI) בבידוד. השילוב שלו עם Intlayer מאפשר לכם:

- **תצוגה מקדימה של כל שפה** ישירות בתוך קנבס ה-Storybook באמצעות בורר בסרגל הכלים.
- **תפיסת תרגומים חסרים** לפני שהם מגיעים לסביבת הייצור (production).
- **תיעוד רכיבים רב-לשוניים** עם תוכן אמיתי ובטוח מבחינת טיפוסים (type-safe) במקום מחרוזות מקודדות (hard-coded).

## הגדרה שלב אחר שלב

<Tabs>
<Tab value="הגדרת Vite">

<Steps>
<Step number={1} title="התקנת תלויות">

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

| חבילה            | תפקיד                                                          |
| ---------------- | -------------------------------------------------------------- |
| `intlayer`       | ליבה - הגדרות תצורה, הידור תוכן, CLI                           |
| `react-intlayer` | חיבורי React - הרכיב `IntlayerProvider`, ה-hook ‏`useIntlayer` |
| `vite-intlayer`  | תוסף Vite - מעקב והידור של קובצי הצהרת תוכן                    |

</Step>
<Step number={2} title="יצירת תצורת Intlayer">

צרו קובץ `intlayer.config.ts` בתיקיית השורש של הפרויקט (או בתוך חבילת ה-design-system שלכם):

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // הוסיפו שפות נוספות לפי הצורך
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // היכן שנמצאים קובצי ה-*.content.ts שלכם
  },
};

export default config;
```

> לרשימת האפשרויות המלאה, עיינו ב[מדריך התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md).

- [מדריך התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

</Step>
<Step number={3} title="הוספת תוסף Vite ל-Storybook">

ה-hook של Storybook בשם `viteFinal` מאפשר להרחיב את תצורת ה-Vite הפנימית. ייבאו והוסיפו את התוסף `intlayer()` שם:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …תוספים נוספים
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(baseConfig, { configType }) {
    const env = {
      command: configType === "DEVELOPMENT" ? "serve" : "build",
      mode: configType === "DEVELOPMENT" ? "development" : "production",
    } as const;

    const viteConfig = defineConfig(() => ({
      plugins: [
        intlayer({
          proxy: {
            ignore: (req) => req.url?.startsWith("/api"),
          },
        }),
      ],
    }));

    return mergeConfig(baseConfig, viteConfig(env));
  },
};

export default config;
```

התוסף `intlayer()` עוקב אחר קובצי ה-`*.content.ts` שלכם ובונה מחדש את המילונים אוטומטית בכל פעם שהם משתנים במהלך הפיתוח ב-Storybook.

</Step>
<Step number={4} title="הוספת Decorator של IntlayerProvider וסרגל שפות">

קובץ ה-`preview` של Storybook הוא המקום הנכון לעטוף כל סיפור (story) ב-`IntlayerProvider` ולחשוף בורר שפות בסרגל הכלים:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // עטיפת כל סיפור בתוך IntlayerProvider
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  // חשיפת בורר שפות בסרגל הכלים של Storybook
  globalTypes: {
    locale: {
      description: "שפה פעילה",
      defaultValue: "en",
      toolbar: {
        title: "Locale",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

> ערכי ה-`locale` חייבים להתאים לשפות שהוצהרו בקובץ ה-`intlayer.config.ts` שלכם.

</Step>
</Steps>
</Tab>
<Tab value="הגדרת Webpack">
<Steps>
<Step number={1} title="התקנת תלויות">

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install @intlayer/webpack --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add @intlayer/webpack --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add @intlayer/webpack --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add @intlayer/webpack --dev
```

</Step>
<Step number={2} title="יצירת תצורת Intlayer">

צרו קובץ `intlayer.config.ts` בתיקיית השורש של הפרויקט:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"],
  },
};

export default config;
```

</Step>
<Step number={3} title="הגדרת תצורת Webpack של Storybook">

עבור הגדרות Storybook המבוססות על Webpack (לדוגמה `@storybook/react-webpack5`), הרחיבו את תצורת ה-webpack דרך `webpackFinal` כדי להוסיף את הכינויים (aliases) וה-loader של Intlayer:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-webpack5";
import { IntlayerPlugin } from "@intlayer/webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (baseConfig) => {
    baseConfig.plugins = [...(baseConfig.plugins ?? []), new IntlayerPlugin()];
    return baseConfig;
  },
};

export default config;
```

</Step>
<Step number={4} title="הוספת Decorator של IntlayerProvider וסרגל שפות">

בדיוק כמו בהגדרת Vite - הוסיפו את ה-decorator ואת טיפוס השפה הגלובלי ב-`.storybook/preview.tsx`:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  globalTypes: {
    locale: {
      description: "שפה פעילה",
      defaultValue: "en",
      toolbar: {
        title: "Locale",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

</Step>
</Steps>
</Tab>
</Tabs>

## הצהרת תוכן

צרו קובץ `*.content.ts` לצד כל רכיב. Intlayer יקלוט אותו אוטומטית במהלך ההידור.

```typescript fileName="src/components/CopyButton/CopyButton.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
} satisfies Dictionary;

export default copyButtonContent;
```

> למידע נוסף על פורמטים ותכונות של הצהרת תוכן, עיינו ב[תיעוד הצהרת התוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md).

- [תיעוד הצהרת התוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md)

## שימוש ב-`useIntlayer` ברכיב

```tsx fileName="src/components/CopyButton/index.tsx" codeFormat="typescript"
"use client";

import { type FC } from "react";
import { useIntlayer } from "react-intlayer";

type CopyButtonProps = {
  content: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ content }) => {
  const { label } = useIntlayer("copy-button");

  return (
    <button
      onClick={() => navigator.clipboard.writeText(content)}
      aria-label={label.value}
      title={label.value}
    >
      Copy
    </button>
  );
};
```

ה-hook ‏`useIntlayer` מחזיר את המילון המקומפל עבור השפה הנוכחית המסופקת על ידי ה-`IntlayerProvider` הקרוב ביותר. החלפת השפה בסרגל הכלים של Storybook מרנדרת מחדש אוטומטית את הסיפור עם התרגומים המעודכנים.

## כתיבת Stories עבור רכיבים מבוססי בינאום

כאשר ה-decorator של `IntlayerProvider` מוגדר, הסיפורים שלכם עובדים בדיוק כמו קודם. סרגל השפות שולט בשפה הפעילה עבור כל הקנבס:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

/** סיפור ברירת מחדל - החליפו את השפה בסרגל הכלים כדי לצפות בתרגומים. */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** מרנדר את הכפתור בתוך בלוק קוד, מקרה שימוש נפוץ בעולם האמיתי. */
export const InsideCodeBlock: Story = {
  render: (args) => (
    <div style={{ position: "relative", display: "inline-block" }}>
      <pre style={{ background: "#1e1e1e", color: "#fff", padding: "1rem" }}>
        <code>{args.content}</code>
      </pre>
      <CopyButton
        content={args.content}
        style={{ position: "absolute", top: 8, right: 8 }}
      />
    </div>
  ),
  args: {
    content: "npx intlayer init",
  },
};
```

> כל סיפור יורש את הגדרת ה-`locale` הגלובלית מסרגל הכלים, כך שתוכלו לאמת כל שפה מבלי לשנות אף שורת קוד בסיפור עצמו.

## בדיקת תרגומים ב-Stories

השתמשו בפונקציות ה-`play` של Storybook כדי לאמת שהטקסט המתורגם הנכון מרונדר עבור שפה נתונה:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const AccessibleLabel: Story = {
  args: { content: "Hello World" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // וידוא שלכפתור יש שם נגיש שאינו ריק
    await expect(button).toHaveAccessibleName();
    // וידוא שהכפתור אינו מושבת
    await expect(button).not.toBeDisabled();
    // וידוא נגישות מקלדת
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

## משאבים נוספים

- [מדריך תצורת Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)
- [תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md)
- [תיעוד Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md)
- [תיעוד Storybook](https://storybook.js.org/docs)
