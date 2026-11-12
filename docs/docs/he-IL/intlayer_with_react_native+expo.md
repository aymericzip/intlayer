---
createdAt: 2025-06-18
updatedAt: 2026-11-03
priority: 9
title: "Expo + React Native i18n: מדריך תרגום מלא"
description: "הגדירו את Intlayer ב-Expo ו-React Native: תוכן בעל טיפוסיות מלאה לכל רכיב, זיהוי שפת המכשיר, בורר שפות ואריזת Metro."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - React Native
  - Expo
  - JavaScript
slugs:
  - doc
  - environment
  - react-native-and-expo
applicationTemplate: https://github.com/aymericzip/intlayer-react-native-template
applicationShowcase: https://intlayer-react-native.vercel.app
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "ייבוא ספקים ו-hooks ישירות מ-react-native-intlayer, אין צורך יותר ב-react-intlayer כתלות ישירה"
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון השימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 7.5.9
    date: 2025-12-30
    changes: "הוספת פקודת init"
  - version: 6.1.6
    date: 2025-10-02
    changes: "הוספת סעיף ניפוי שגיאות (debug)"
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תרגום אפליקציית Expo ו-React Native שלכם

<Tabs defaultTab="code">
  <Tab label="קוד" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="דמו" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## תוכן עניינים

<TOC/>

## מדוע לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות מובילים כמו `react-native-localize` או `i18next`, ‏Intlayer הוא פתרון המגיע עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="כיסוי מלא עבור React Native">

Intlayer מותאם לפעולה מושלמת עם React Native ו-Expo על ידי מתן **תיחום תוכן ברמת הרכיב**, **תמיכה ב-TypeScript**, וכל התכונות הנדרשות להרחבת הבינאום (i18n) באפליקציות מובייל.

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
<Accordion header="גודל החבילה (Bundle size)">

במקום לטעון קובצי JSON ענקיים לתוך הדפים שלכם, טענו רק את התוכן הנדרש. Intlayer מסייע **להפחית את גודל החבילה והתצוגות שלכם בעד 50%**.

</Accordion>
</AccordionGroup>

<Steps>
<Step number={1} title="התקנת תלויות">

ראו [תבנית אפליקציה](https://github.com/aymericzip/intlayer-react-native-template) ב-GitHub.

מתוך פרויקט ה-React Native שלכם, התקינו את החבילות הבאות:

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
npm install intlayer react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-native-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-native-intlayer
```

```bash packageManager="bun"
bun add intlayer react-native-intlayer
```

### חבילות

- **intlayer**  
  ארגז הכלים המרכזי של i18n עבור הגדרות תצורה, תוכן מילונים, יצירת טיפוסים ופקודות CLI.

- **react-native-intlayer**  
  אינטגרציית React Native המספקת את ספקי ההקשר (context providers) וה-hooks של React שתשתמשו בהם לקבלת והחלפת שפות, את ה-polyfills של React Native, ואת תוסף Metro לשילוב Intlayer עם ה-bundler של React Native. החבילה מייצאת מחדש את כל התוכן מ-`react-intlayer`, כך שזו החבילה היחידה שתצטרכו באפליקציית React Native.

</Step>
<Step number={2} title="יצירת תצורת Intlayer">

### ארכיטקטורה

בארכיטקטורה זו, `react-native-intlayer` מספקת את ה-`IntlayerProvider` הראשי ו-hooks של React Native לניהול תרגומים בין מסכים ורכיבים. הצהרות התוכן נמצאות לצד הרכיבים שלהן.

```bash
.
├── app
│   ├── (tabs)
│   │   ├── _layout.tsx
│   │   ├── explore.tsx
│   │   └── index.tsx
│   ├── +not-found.tsx
│   └── _layout.tsx                   # פריסת שורש עם IntlayerProvider
├── components
│   ├── LocaleSwitcher.content.ts
│   └── LocaleSwitcher.tsx
├── app.json
├── intlayer.config.ts
├── metro.config.js
├── package.json
└── tsconfig.json
```

### הגדרת תצורה

בתיקיית השורש של הפרויקט (או בכל מיקום נוח), צרו קובץ **הגדרת תצורה של Intlayer**. הוא עשוי להיראות כך:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
/**
 * אם הטיפוסים של Locales אינם זמינים, נסו להגדיר moduleResolution ל-"bundler" בקובץ ה-tsconfig.json שלכם
 */
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
<Step number={3} title="הוספת תוסף Metro">

Metro הוא ה-bundler עבור React Native, ומהווה את ברירת המחדל בפרויקטים שנוצרו באמצעות הפקודה `react-native init`. כדי להשתמש ב-Intlayer עם Metro, עליכם להוסיף את התוסף לקובץ ה-`metro.config.js` שלכם:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

> הערה: `configMetroIntlayer` היא פונקציה אסינכרונית (מחזירה Promise). השתמשו ב-`configMetroIntlayerSync` במקומה אם ברצונכם להשתמש בה באופן סינכרוני, או להימנע מ-IIFE (ביטוי פונקציה המופעל מיידית).
> הערה: `configMetroIntlayerSync` אינה מאפשרת לבנות מילוני intlayer בעת הפעלת השרת.

</Step>
<Step number={4} title="הוספת ה-Provider של Intlayer">

כדי לשמור על שפת המשתמש מסונכרנת ברחבי האפליקציה שלכם, עליכם לעטוף את רכיב השורש שלכם עם הרכיב `IntlayerProvider` מתוך `react-native-intlayer`.

> ייבאו תמיד מ-`react-native-intlayer`. ה-`IntlayerProvider` שלו כולל polyfills עבור ה-Web API המשמש את Intlayer, והחבילה מייצאת מחדש את כל ה-hooks וכלי העזר מ-`react-intlayer`.

בנוסף, עליכם לוודא שה-polyfills זמינים לקובץ ה-`index.js` כדי להבטיח ש-Intlayer יוכל לפעול כשורה.

```tsx fileName="app/_layout.tsx" codeFormat={["typescript", "esm"]}
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";
import { type FC } from "react";

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

export default RootLayout;
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

> **Expo Router (אינטרנט): שמרו על קובצי `.content.*` מחוץ לתיקיית `app/`.** Expo Router מתייחס לכל קובץ JavaScript/TypeScript בתוך `app/` כאל נתיב (route). באינטרנט, תהליך גילוי הנתיבים שלו סורק את מערכת הקבצים ישירות ו**אינו** מכבד את ה-`resolver.blockList` של Metro, ולכן קובץ `*.content.ts` שממוקם שם יירשם כנתיב. קובץ כגון `app/(tabs)/_layout.content.ts` אף מפוענח כ-layout (החלק `.content` נקרא כסיומת פלטפורמה), מה שמתנגש עם `_layout.tsx` האמיתי וזורק שגיאה:
>
> ```
> The layouts "./(tabs)/_layout.content.ts" and "./(tabs)/_layout.tsx" conflict on the route "/(tabs)/_layout.content". Remove or rename one of these files.
> ```
>
> מקמו את ההצהרות שלכם בתיקייה מחוץ ל-`app/` (למשל `content/` או `src/content/`). Intlayer מגלה קובצי `.content.*` בכל מקום בפרויקט והמילונים מתייחסים לפי ה-`key` שלהם, כך שלא נדרש שינוי בייבואים. ב-native זה לא נדרש (ה-`blockList` של Metro כבר מסתיר אותם), אך שימוש בתיקייה מחוץ ל-`app/` שומר על תקינות העבודה בשתי הפלטפורמות.

דוגמה (TypeScript עם צמתי TSX עבור React Native):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
} satisfies Dictionary;

export default homeScreenContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> לפרטים נוספים על הצהרות תוכן, עיינו ב[תיעוד התוכן של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md).

- [תיעוד התוכן של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)

</Step>
<Step number={6} title="שימוש ב-Intlayer ברכיבים שלכם">

השתמשו ב-hook של `useIntlayer` ברכיבי צאצא כדי לקבל תוכן מתורגם.

### דוגמה

```tsx fileName="app/(tabs)/index.tsx" codeFormat={["typescript", "esm"]}
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-native-intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { type FC } from "react";

const HomeScreen = (): FC => {
  const { title, steps } = useIntlayer("home-screen");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title}</ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default HomeScreen;
```

> בעת שימוש ב-`content.someKey` ב-props מבוססי מחרוזת (למשל, `title` של כפתור או `children` של רכיב `Text`), **קראו ל-`content.someKey.value`** כדי לקבל את המחרוזת עצמה.

> אם האפליקציה שלכם כבר קיימת, תוכלו להשתמש ב-[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md), כמו גם ב[פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md), כדי לשנות אלפי רכיבים בשניות.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)
- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

</Step>
<Step number={7} title="שינוי שפת האפליקציה" isOptional={true}>

כדי להחליף שפות מתוך הרכיבים שלכם, תוכלו להשתמש במתודה `setLocale` של ה-hook ‏`useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-native-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales } = useLocale();

  return (
    <View style={styles.container}>
      {availableLocales.map((locale) => (
        <TouchableOpacity
          key={locale}
          style={styles.button}
          onPress={() => setLocale(locale)}
        >
          <Text style={styles.text}>{getLocaleName(locale)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
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

תהנו מבניית אפליקציות **React Native** עם בינאום מלא ועוצמתי באמצעות **Intlayer**!

### ניפוי שגיאות (Debug)

React Native עשויה להיות פחות יציבה מ-React בדפדפן, לכן הקפידו על תאימות גרסאות מדויקת.

Intlayer מיועדת בעיקרה ל-Web Intl API; ב-React Native עליכם לכלול את ה-polyfills המתאימים.

רשימת בדיקה (Checklist):

- השתמשו בגרסאות העדכניות ביותר של `intlayer` ו-`react-native-intlayer`.
- הפעילו את ה-polyfill של Intlayer.
- אם אתם משתמשים ב-`getLocaleName` או בכלים אחרים המבוססים על Intl-API, ייבאו polyfills אלה בשלב מוקדם (לדוגמה ב-`index.js` או ב-`App.tsx`):

```ts
import "intl";
import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-displaynames/polyfill";
import "@formatjs/intl-listformat/polyfill";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-datetimeformat/polyfill";
```

- ודאו את תצורת Metro שלכם (כינויי שמות של resolver, תוספי assets, נתיבי `tsconfig`) אם מודולים אינם נפתרים.

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום אפליקציית React Native או Expo?">

- **`i18n-js`** בשילוב עם `expo-localization`: השילוב הוותיק, אובייקט פשוט של הודעות ללא הגדרת טיפוסים.
- **`react-i18next`**: התקן הנפוץ באקוסיסטם של React, עם מרחבי שמות של JSON הנטענים בזמן ריצה.
- **`Intlayer`**: הפתרון המתקדם ביותר. תוכן מוצהר בכל מקום בקוד שלכם ([לצד כל רכיב או בצורה מרוכזת](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)) ומקומפל על ידי תוסף Metro בזמן הבנייה, בעל טיפוסיות מלאה, עם תרגום מבוסס AI, עורך ויזואלי ומערכת CMS.

במובייל טיעון גודל החבילה חזק עוד יותר מאשר באינטרנט, כיוון שהכל נארז לתוך האפליקציה במקום להיטען לכל דף בנפרד. קימפול תוכן לפי רכיב שומר על שפות ומפתחות שאינם בשימוש מחוץ לחבילה הסופית. ראו [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md).

- [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)

</Question>
<Question title="בכמה משפיע ה-i18n על גודל החבילה של האפליקציה שלי?">

הרבה פחות מקטלוג בזמן ריצה, עובדה שחשובה עוד יותר במובייל מאשר באינטרנט כיוון שהכל נארז יחד לתוך קובץ האפליקציה במקום להישלף לכל דף. תוסף Metro מפענח קריאות `useIntlayer` במדויק לרשומות שבהן הרכיב משתמש, כך שמפתחות ושפות שאינם בשימוש לעולם אינם מגיעים לקובץ הבינארי. בהשוואה לחלופות הרגילות, Intlayer מפחית את גודל החבילה בעד 50%. ראו [אופטימיזציית חבילות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md).

- [אופטימיזציית חבילות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)

</Question>
<Question title="האם ניתן להגר מ-i18n-js או מ-react-i18next מבלי לשכתב את הרכיבים שלי?">

כן, ויש שני נתיבים אפשריים. תוכלו להגר את התוכן בהדרגה בעזרת [מדריך ההגירה מ-i18n-js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/i18n-js.md) או [מדריך ההגירה מ-react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_react-i18next_to_intlayer.md). לחלופין, תוכלו לשמור על ה-API הנוכחי שלכם לחלוטין: [מתאמי התאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md) חושפים בדיוק את אותו ה-API כמו `react-i18next` ו-`react-intl`, אך מוגשים על ידי מילוני Intlayer, כך שרק הייבואים משתנים וקוד הרכיב נשאר ללא שינוי.

- [מדריך הגירה מ-i18n-js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/i18n-js.md)
- [מדריך הגירה מ-react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_react-i18next_to_intlayer.md)
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

עבור צינור עבודה אוטומטי לחלוטין, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) עושה את אותו הדבר בזמן הבנייה על קוד מקור של JSX, TSX, Vue ו-Svelte, ומייצר את המילונים בכל שינוי כך שאין צורך לתחזק מפתחות ידנית. הוא פועל באמצעות ניתוח סטטי, כך שמחרוזות שקיימות רק בזמן ריצה אינן נגישות עבורו, והוא דורש מעט ביאורים (annotations) כדי להבדיל בין טקסט המוצג למשתמש לבין לוגיקת האפליקציה.

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
<Question title="האם Intlayer עובד עם Expo וה-bundler של Metro?">

כן. שלב 3 מוסיף את תוסף Metro, אשר מקמפל את קובצי ה-`.content.ts` שלכם ומייצר מחדש את הטיפוסים בשמירה, כך ש-Fast Refresh קולט עריכות תוכן בדיוק כמו כל שינוי קוד מקור אחר. זה עובד הן ב-Expo Go והן ב-development builds.

</Question>
<Question title="כיצד מזהים את שפת המכשיר?">

קוראים אותה מתוך `expo-localization` ומעבירים אותה ל-provider של Intlayer בתור השפה הראשונית, ולאחר מכן שומרים את בחירתו המפורשת של המשתמש. Intlayer חוזר לשפת ברירת המחדל שלכם כאשר שפת המכשיר אינה בין השפות המוצהרות, כך שהאפליקציה לעולם אינה מרנדרת מחרוזת ריקה.

</Question>
<Question title="כיצד משנים את שפת האפליקציה בזמן ריצה?">

שלב 7 מכסה זאת. `useLocale` חושף את השפה הפעילה, את השפות המוצהרות ופונקציית setter, והרכיבים שקוראים את התוכן מתרנדרים מחדש באופן מיידי, כך שהשפה משתנה מבלי להפעיל מחדש את האפליקציה.

</Question>
<Question title="כיצד תומכים בשפות הנכתבות מימין לשמאל כמו ערבית או עברית?">

השתמשו ב-`getHTMLTextDir` כדי לדעת אם השפה הפעילה נכתבת מימין לשמאל, והחילו זאת דרך `I18nManager` של React Native. זכרו כי React Native דורשת טעינה מחדש (reload) עבור היפוך עיצוב מלא (RTL flip), ולכן רוב האפליקציות מציגות הודעה למשתמש פעם אחת כאשר הוא בוחר שפת RTL.

</Question>
<Question title="כיצד מתרגמים את האפליקציה באופן אוטומטי באמצעות AI?">

הריצו `npx intlayer fill`, אשר ממלא תרגומים חסרים בעזרת מודל ה-LLM לבחירתכם תוך שימוש בספק ובמפתח ה-API שלכם, והדגל `--git-diff` מגביל את ההרצה לתוכן שהשתנה בענף הנוכחי בלבד. ראו את [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md) ו[אינטגרציית CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md)
- [אינטגרציית CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md)

</Question>
<Question title="האם Intlayer תומך בצורות רבים, מגדר וטקסט עשיר?">

כן: [צורות רבים (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md), [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md), תנאים, [הטמעות (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md) ו[מעצבים (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md) עבור מספרים, תאריכים ומטבעות.

- [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md)
- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md)
- [הטמעות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md)
- [מעצבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)

</Question>
<Question title="כיצד מתרגמים יכולים לערוך תוכן מבלי לגעת בקוד?">

באמצעות ה-[עורך הויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md), הפועל על גבי התשתית שלכם ומאפשר לכל אחד לערוך טקסט במקום באפליקציה הפועלת, או באמצעות ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md), אשר מוציא את התוכן החוצה כך שיוכל להשתנות ללא צורך בפריסה מחודשת (deployment).

- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Question>
<Question title="האם Intlayer חינמי ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. מערכת ה-CMS המאוחסנת היא שירות אופציונלי בתשלום שניתן גם [לארח עצמאית (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md).

- [אירוח עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md)

</Question>

</FAQ>
