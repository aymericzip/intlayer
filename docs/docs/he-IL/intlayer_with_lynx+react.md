---
createdAt: 2025-03-09
updatedAt: 2026-11-03
priority: 3
title: "Lynx + React i18n - מדריך מלא לתרגום האפליקציה שלך"
description: "הגדירו את Intlayer באפליקציית מובייל של Lynx ו-React: תוכן מוגדר טיפוסית ברמת הרכיב, זיהוי שפת המכשיר ובורר שפות."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Vite
  - React
  - Lynx
  - JavaScript
slugs:
  - doc
  - environment
  - lynx-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-lynx-template
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

# תרגום אפליקציית המובייל שלכם ב-Lynx ו-React באמצעות Intlayer

ראו [תבנית אפליקציה](https://github.com/aymericzip/intlayer-lynx-template) ב-GitHub.

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-lynx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

## מדוע לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות מובילים כמו `react-native-localize` או `i18next`, ‏Intlayer הוא פתרון המגיע עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="כיסוי מלא עבור Lynx">

Intlayer מותאם לפעולה מושלמת עם Lynx ו-React על ידי מתן **תיחום תוכן ברמת הרכיב**, **תמיכה ב-TypeScript**, וכל התכונות הנדרשות להרחבת הבינאום (i18n).

</Accordion>
<Accordion header="גודל החבילה (Bundle size)">

במקום לטעון קובצי JSON ענקיים לתוך הדפים שלכם, טענו רק את התוכן הנדרש. Intlayer מסייע **להפחית את גודל החבילה והדפים שלכם בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות">

תיחום התוכן של האפליקציה שלכם **מקל על התחזוקה** באפליקציות בקנה מידה גדול. תוכלו לשכפל או למחוק תיקיית תכונה (feature) בודדת מבלי הנטל המחשבתי של סקירת כל קוד התוכן שלכם. בנוסף, Intlayer **בעל טיפוסיות מלאה** כדי להבטיח את דיוק התוכן שלכם.

</Accordion>
<Accordion header="סוכני AI">

מיקום התוכן לצד הקוד (co-location) **מפחית את ההקשר (context) הנדרש** עבור מודלי שפה גדולים (LLMs). ‏Intlayer מגיע גם עם חבילת כלים, כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)**, ו**[כישורי סוכנים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**, כדי להפוך את חוויית המפתח (DX) לחלקה אף יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)
- [כישורי סוכנים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמשו באוטומציה כדי לתרגם בצינור ה-CI/CD שלכם באמצעות מודל ה-LLM לבחירתכם בעלות ספק ה-AI שלכם. Intlayer מציע גם **מהדר (compiler)** לאוטומציה של חילוץ תוכן, וכן [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) המסייעת **לתרגם ברקע**.

- [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON ענקיים לרכיבים עלול לגרום לבעיות ביצועים ותגובתיות. Intlayer מבצע אופטימיזציה לטעינת התוכן שלכם בזמן הבנייה.

</Accordion>
<Accordion header="צמיחה ועבודה עם אנשי צוות שאינם מפתחים">

יותר מסתם פתרון i18n, ‏Intlayer מספק **[עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) באירוח עצמי** ו**[מערכת CMS מלאה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)** כדי לעזור לכם לנהל את התוכן הרב-לשוני שלכם **בזמן אמת**, מה שהופך את שיתוף הפעולה עם מתרגמים, כותבי תוכן וחברי צוות אחרים לפשוט וזורם. ניתן לאחסן תוכן באופן מקומי ו/או מרחוק.

- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [מערכת CMS מלאה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

<Steps>
<Step number={1} title="התקנת תלויות">

מתוך פרויקט ה-Lynx שלכם, התקינו את החבילות הבאות:

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
npm install intlayer react-intlayer lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="bun"
bun add intlayer react-intlayer lynx-intlayer
```

### חבילות

- **intlayer**  
  ארגז הכלים המרכזי של i18n עבור הגדרות תצורה, תוכן מילונים, יצירת טיפוסים ופקודות CLI.

- **react-intlayer**  
  אינטגרציית React המספקת את ספקי ההקשר (context providers) וה-hooks של React שתשתמשו בהם ב-Lynx לקבלת והחלפת שפות.

- **lynx-intlayer**  
  אינטגרציית Lynx המספקת את התוסף לשילוב Intlayer עם ה-bundler של Lynx.

</Step>
<Step number={2} title="יצירת תצורת Intlayer">

בתיקיית השורש של הפרויקט (או בכל מיקום נוח), צרו קובץ **הגדרת תצורה של Intlayer**. הוא עשוי להיראות כך:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... הוסיפו כל שפה נוספת הדרושה לכם
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

בתוך תצורה זו, תוכלו:

- להגדיר את **רשימת השפות הנתמכות** שלכם.
- לקבוע שפת **ברירת מחדל**.
- בהמשך, תוכלו להוסיף אפשרויות מתקדמות יותר (למשל, לוגים, תיקיות תוכן מותאמות אישית וכו').
- ראו את [תיעוד תצורת Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md) לפרטים נוספים.

</Step>
<Step number={3} title="הוספת תוסף Intlayer ל-Bundler של Lynx">

כדי להשתמש ב-Intlayer עם Lynx, עליכם להוסיף את התוסף לקובץ ה-`lynx.config.ts` שלכם:

```ts fileName="lynx.config.ts"
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... תוספים נוספים
    pluginIntlayerLynx(),
  ],
});
```

</Step>
<Step number={4} title="הוספת ה-Provider של Intlayer">

כדי לשמור על שפת המשתמש מסונכרנת ברחבי האפליקציה שלכם, עליכם לעטוף את רכיב השורש שלכם עם הרכיב `IntlayerProvider` מתוך `react-intlayer`.

בנוסף, עליכם להוסיף את קריאת הפונקציה `intlayerPolyfill` כדי להבטיח ש-Intlayer יוכל לפעול כשורה.

```tsx fileName="src/index.tsx"
import { root } from "@lynx-js/react";

import { App } from "./App.js";
import { IntlayerProvider } from "react-intlayer";
import { intlayerPolyfill } from "lynx-intlayer";

intlayerPolyfill();

root.render(
  <IntlayerProvider>
    <App />
  </IntlayerProvider>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
```

</Step>
<Step number={5} title="הצהרת התוכן שלכם">

צרו קובצי **הצהרת תוכן** בכל מקום בפרויקט שלכם (בדרך כלל בתוך `src/`), באמצעות כל אחד מפורמטי הסיומות ש-Intlayer תומך בהם:

- `.content.json`
- `.content.jsonc`
- `.content.json5`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.md`
- `.content.mdx`
- `.content.yaml`
- `.content.yml`
- וכו'.

דוגמה:

```tsx fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "React",
    "subtitle": {
      "nodeType": "translation",
      "translation": {
        "en": "on Lynx",
        "fr": "sur Lynx",
        "es": "en Lynx"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Tap the logo and have fun!",
        "fr": "Appuyez sur le logo et amusez-vous!",
        "es": "¡Toca el logo y diviértete!"
      }
    },
    "hint": [
      {
        "nodeType": "translation",
        "translation": {
          "en": "Edit",
          "fr": "Modifier",
          "es": "Editar"
        }
      },
      " src/App.tsx ",
      {
        "nodeType": "translation",
        "translation": {
          "en": "to see updates!",
          "fr": "pour voir les mises à jour!",
          "es": "para ver actualizaciones!"
        }
      }
    ]
  }
}
```

> לפרטים נוספים על הצהרות תוכן, עיינו ב[תיעוד התוכן של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md).

- [תיעוד התוכן של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)

</Step>
<Step number={6} title="שימוש ב-Intlayer ברכיבים שלכם">

השתמשו ב-hook של `useIntlayer` ברכיבי צאצא כדי לקבל תוכן מתורגם.

```tsx fileName="src/App.tsx"
import { useCallback, useState } from "@lynx-js/react";
import { useIntlayer } from "react-intlayer";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { LocaleSwitcher } from "./components/LocaleSwitcher.jsx";

export const App = () => {
  const [alterLogo, setAlterLogo] = useState(false);
  const { title, subtitle, description, hint } = useIntlayer("app");

  const onTap = useCallback(() => {
    "background only";
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">{title}</text>
          <text className="Subtitle">{subtitle}</text>
        </view>
        <view className="Content">
          <image src={arrow} className="Arrow" />
          <text className="Description">{description}</text>
          <text className="Hint">
            {hint[0]}
            <text style={{ fontStyle: "italic" }}>{hint[1]}</text>
            {hint[2]}
          </text>
        </view>
        <LocaleSwitcher />
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  );
};
```

> בעת שימוש ב-`content.someKey` ב-props מבוססי מחרוזת (למשל, `title` של כפתור או `children` של רכיב `Text`), **קראו ל-`content.someKey.value`** כדי לקבל את המחרוזת עצמה.

</Step>
<Step number={7} title="שינוי שפת האפליקציה" isOptional={true}>

כדי להחליף שפות מתוך הרכיבים שלכם, תוכלו להשתמש במתודה `setLocale` של ה-hook ‏`useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales, locale } = useLocale();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {availableLocales.map((localeEl) => (
        <text
          key={localeEl}
          style={{
            color: localeEl === locale ? "#fff" : "#888",
            fontSize: "12px",
          }}
          bindtap={() => setLocale(localeEl)}
        >
          {getLocaleName(localeEl)}
        </text>
      ))}
    </view>
  );
};
```

פעולה זו מפעילה רינדור מחדש של כל הרכיבים המשתמשים בתוכן של Intlayer, וכעת הם יציגו תרגומים עבור השפה החדשה.

> עיינו ב[תיעוד של `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useLocale.md) לפרטים נוספים.

- [תיעוד של `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useLocale.md)

</Step>

</Steps>

## הגדרת TypeScript (אם אתם משתמשים ב-TypeScript)

Intlayer מייצר הגדרות טיפוסים בתיקייה מוסתרת (כברירת מחדל `.intlayer`) כדי לשפר את ההשלמה האוטומטית ולתפוס שגיאות תרגום:

```json5
// tsconfig.json
{
  // ... תצורת ה-TS הקיימת שלכם
  "include": [
    "src", // קוד המקור שלכם
    ".intlayer/types/**/*.ts", // <-- ודאו שהטיפוסים שנוצרו אוטומטית נכללים
    // ... כל דבר אחר שכבר כללתם
  ],
}
```

זה מה שמאפשר תכונות כגון:

- **השלמה אוטומטית (Autocompletion)** עבור מפתחות המילון שלכם.
- **בדיקת טיפוסים (Type checking)** המזהירה אם אתם ניגשים למפתח שאינו קיים או אי התאמה בטיפוס.

## הגדרת Git

כדי להימנע מהעלאת קבצים שנוצרו אוטומטית על ידי Intlayer למאגר ה-Git שלכם, הוסיפו את השורה הבאה לקובץ ה-`.gitignore`:

```bash
# התעלמות מקבצים שנוצרו על ידי Intlayer
.intlayer
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

## הרחבה נוספת

- [עורך ויזואלי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md)
