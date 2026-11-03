---
createdAt: 2024-03-07
updatedAt: 2026-11-03
priority: 8
title: "הפיכת אפליקציית Vite + React קיימת לרב-לשונית"
description: "הוסיפו i18n לאפליקציית Vite ו-React קיימת מבלי לשכתב אותה: חלצו מחרוזות מקודדות אוטומטית, תרגמו אותן באמצעות AI ושמרו על גודל חבילה קטן."
keywords:
  - Vite i18n
  - React i18n
  - בינאום
  - Internationalization
  - תרגום אפליקציית Vite קיימת
  - תרגום אפליקציית React קיימת
  - Intlayer
  - רב-לשוני
  - Multilingual
  - קומפיילר
  - Compiler
  - תרגום AI
  - AI translation
  - SEO
slugs:
  - blog
  - transform-existing-react-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון שימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 8.2.0
    date: 2026-03-09
    changes: "עדכון אפשרויות קומפיילר, הוספת תמיכה ב-FilePathPattern"
  - version: 8.1.6
    date: 2026-02-23
    changes: "גרסה ראשונית"
author: aymericzip
---

# כיצד להפוך אפליקציית Vite ו-React קיימת לרב-לשונית (i18n) בדיעבד (מדריך 2026)

הוספת בינאום (i18n) לפרויקט Vite ו-React מהיום הראשון היא פשוטה יחסית. אך מה קורה כאשר כבר יש לכם אפליקציה בוגרת, מוכנה לייצור (production) בשפה אחת בלבד, ועליכם להפוך אותה לרב-לשונית **בדיעבד**?

אם אי פעם ניסיתם לעשות זאת עם ספריות מסורתיות כמו `react-i18next` או `react-intl`, אתם מכירים את החיכוך:

- חיפוש ידני של מחרוזות מקודדות (hardcoded) במאות קובצי JSX ו-TSX.
- יצירה ידנית של קובצי JSON מקוננים והמצאת מפתחות תרגום שרירותיים (`components.header.title` וכדומה).
- החלפת טקסט ב-JSX בקריאות מסורבלות ל-hooks של תרגום (`t('...')`).
- ארגון מחדש של הניתוב בצד הלקוח, ניהול ה-state ולוגיקת החלפת השפה.

בשנת 2026, אין צורך לשכתב את בסיס הקוד שלכם כדי להפוך את אפליקציית ה-Vite ו-React שלכם לרב-לשונית. עם **Intlayer**, תוכלו להוסיף בינאום לאפליקציה קיימת בתוך דקות, תוך שימוש בחילוץ אוטומטי, תרגום מבוסס AI ואינטגרציה חלקה.

> מחפשים את המדריך הטכני המלא שלב אחר שלב עבור Vite ו-React? עיינו בתיעוד הייעודי שלנו: [תרגום Vite ו-React באמצעות Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+react.md).

- [תרגום Vite ו-React באמצעות Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+react.md)

## תוכן עניינים

<TOC/>

## דילמת השדרוג: מדוע הפיכת אפליקציית Vite ו-React קיימת לרב-לשונית היא משימה קשה

בעת הוספת בינאום לאפליקציית Vite ו-React קיימת, מפתחים מתמודדים עם שלושה מכשולים מרכזיים:

1. **פגיעה בבסיס הקוד (Codebase Disruption)**: חילוץ ידני של מחרוזות לתוך מילוני JSON מחייב עריכה של כמעט כל קובץ רכיב. הדבר מייצר diff עצום ב-Git, סיכון להתנגשויות מיזוג ובאגים אפשריים במבנה הדף.
2. **תקורה בניהול מפתחות**: המצאת מפתחות כגון `dashboard.hero.ctaButton` עבור כל קטע טקסט מאטה את הפיתוח ויוצרת עומס קוגניטיבי בכל שינוי תוכן קל.
3. **עבודת שחורות בתרגום**: ברגע שהמחרוזות מחולצות, אכלוס מילונים ב-5, 10 או 20 שפות דורש העתק-הדבק אינסופי או שירותי תרגום חיצוניים יקרים.

Intlayer פותרת אתגרים אלו ברמה הארכיטקטונית באמצעות **חילוץ בסיוע קומפיילר**, **מילונים הצהרתיים ברמת הרכיב** ו**אינטגרציה ישירה עם Vite**.

## חילוץ תוכן אוטומטי (ללא מעקב ידני אחר מחרוזות)

במקום לחלץ ידנית כל מחרוזת מקודדת מתוך ה-JSX שלכם, Intlayer מספקת שני מסלולים קלים ללא חיכוך:

### אפשרות א': כלי החילוץ ב-CLI (`npx intlayer extract`)

תוכלו להריץ את כלי החילוץ של Intlayer ישירות על בסיס הקוד שלכם:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm dlx intlayer extract
```

```bash packageManager="yarn"
yarn dlx intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

פקודה זו מנתחת את רכיבי ה-React שלכם, מחלצת מחרוזות הפונות למשתמש ויוצרת אוטומטית קובצי הצהרת תוכן לפי רכיב (`.content.ts`) ישירות לצד הרכיבים שלכם. לוגיקת הרכיב נשארת הצהרתית, ברורה ובטוחה לחלוטין מבחינת טיפוסים, מבלי שתצטרכו לכתוב מפתח תרגום יחיד בעצמכם.

### אפשרות ב': קומפיילר Intlayer (חילוץ בזמן בנייה)

כאשר קומפיילר Intlayer מופעל בהגדרות שלכם, תוכלו להמשיך לכתוב את הרכיבים שלכם עם טקסט רגיל מקודד בשפת ברירת המחדל. בזמן הבנייה, הקומפיילר מחלץ את הטקסט ומזריק את התוכן המקומי באופן אוטומטי:

```tsx fileName="src/App.tsx"
// כיתבו קוד React רגיל. הקומפיילר מחלץ את הטקסט באופן אוטומטי
export default function App() {
  return (
    <section>
      <h1>Welcome to our platform</h1>
      <p>Start exploring our modern features today.</p>
    </section>
  );
}
```

מאחורי הקלעים, Intlayer בונה את המילון ומקשרת את הרכיב לתוכן המתורגם שלו, מה שמבטל לחלוטין את הצורך בשכתוב ידני.

במקרה זה, נוצר קובץ הצהרה `src/App.content.ts` במבנה הבא:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    welcomeToOurPlatform: t({
      "he-IL": "ברוכים הבאים לפלטפורמה שלנו",
      en: "Welcome to our platform",
    }),
    startExploringOurModernFeaturesToday: t({
      "he-IL": "התחילו לגלות את התכונות המתקדמות שלנו עוד היום.",
      en: "Start exploring our modern features today.",
    }),
  },
};

export default content;
```

## תרגום מבוסס AI עם ה-LLM המועדף עליכם

לאחר שהתוכן שלכם חולץ, תרגומו לעשרות שפות לא צריך לקחת ימים. Intlayer כוללת כלי CLI מובנה לתרגום באמצעות AI המתממשק ישירות עם OpenAI, Anthropic, DeepSeek או Mistral באמצעות מפתחות ה-API שלכם:

```bash packageManager="npm"
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
yarn dlx intlayer fill
```

```bash packageManager="bun"
bunx intlayer fill
```

הגדירו את השפות שלכם ואת ספק ה-AI ב-`intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.HEBREW,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.GERMAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-5.6-terra",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext:
      "Modern SaaS application and dashboard built with Vite and React",
  },
};

export default config;
```

הרצת `npx intlayer fill` מאכלסת את הצהרות התוכן שלכם בתרגומים באיכות גבוהה עבור השפות שהוגדרו:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    welcomeToOurPlatform: t({
      "he-IL": "ברוכים הבאים לפלטפורמה שלנו",
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
      de: "Willkommen auf unserer Plattform",
    }),
    startExploringOurModernFeaturesToday: t({
      "he-IL": "התחילו לגלות את התכונות המתקדמות שלנו עוד היום.",
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
      de: "Entdecken Sie noch heute unsere modernen Funktionen.",
    }),
  },
};

export default content;
```

מכיוון ש-Intlayer מעבירה הקשר ברמת האפליקציה (`applicationContext`) למודל ה-LLM, התרגומים שנוצרים שומרים על ניואנסים טכניים, טון המותג והקשר דקדוקי טוב בהרבה מכלים אוטומטיים גנריים.

כדי לוודא שלא פוספסו מחרוזות לפני פריסה לייצור:

```bash
npx intlayer test
```

## שילוב עם Vite והגדרת Provider

שילוב Intlayer ב-Vite דורש הוספת הפלאגין לקובץ `vite.config.ts` ועטיפת רכיב השורש באמצעות `IntlayerProvider`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> החל מ-Intlayer v9, הקומפיילר מגיע ישירות בתוך הפלאגין `intlayer()` ומופעל אוטומטית ברגע שמוגדר `compiler.enabled` ב-`intlayer.config.ts`.

עטפו את האפליקציה שלכם ב-`IntlayerProvider` ברכיב הראשי:

```tsx fileName="src/App.tsx"
import { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { MainContent } from "./MainContent";

const App: FC = () => {
  return (
    <IntlayerProvider>
      <MainContent />
    </IntlayerProvider>
  );
};

export default App;
```

### החלפת שפות באופן דינמי

החליפו שפות בקלות בכל מקום באפליקציה שלכם באמצעות ה-hook של `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locales)}
    >
      {availableLocales.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## SEO רב-לשוני (Sitemap ו-Robots.txt)

Intlayer כוללת מעצבים כגון `generateSitemap` ו-`getMultilingualUrls` המפיקים פלטי `sitemap.xml` ו-`robots.txt` רב-לשוניים המוכנים לסורקי מנועי חיפוש עבור פריסות סטטיות של Vite:

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.SITE_URL || "https://example.com").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, {
  siteUrl: "https://example.com",
});
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: https://example.com/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);
console.log("קובצי ה-SEO נוצרו בהצלחה.");
```

הוסיפו hook מסוג `prebuild` לקובץ ה-`package.json` שלכם כדי להריץ סקריפט זה לפני `vite build`:

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## מדריך מעמיק: מוכנים ליישום שלב אחר שלב?

מדריך זה סיפק סקירה ברמה גבוהה כיצד להוסיף בינאום לאפליקציית Vite ו-React קיימת בשנת 2026 ללא שינויים ארכיטקטוניים מורכבים.

אם אתם מוכנים להגדיר כל חלק באפליקציית ה-Vite ו-React שלכם שלב אחר שלב, כולל אפשרויות קונפיגורציה מפורטות, בטיחות טיפוסים ב-TypeScript, מילונים דינמיים ועריכה ויזואלית, עברו למדריך התיעוד המקיף שלנו:

👉 **[מדריך מלא לתרגום Vite ו-React עם Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+react.md)**

- [מדריך מלא לתרגום Vite ו-React עם Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+react.md)

## שאלות נפוצות (FAQ)

<FAQ>

<Question title="האם ניתן להפוך את אפליקציית ה-Vite ו-React שלי לרב-לשונית ללא צורך בשכתוב ידני של כל המחרוזות?">

כן. תוכלו להשתמש ב-`npx intlayer extract` כדי לזהות ולחלץ אוטומטית מחרוזות מקודדות לתוך הצהרות תוכן מקומיות, או להשתמש בקומפיילר של Intlayer כדי להמיר רכיבים בזמן הבנייה כך שתוכלו להמשיך לכתוב JSX רגיל.

</Question>
<Question title="כיצד Intlayer מצמצמת את גודל החבילה (bundle size) ב-Vite בהשוואה ל-react-i18next או react-intl?">

Intlayer משתמשת בהגדרות מילון לפי-רכיב ובאופטימיזציית מאקרו בזמן הבנייה. החבילות מקבלות רק את השדות המדויקים הנדרשים על ידי הרכיבים המרונדרים בדף, במקום לייבא קובצי JSON שלמים של namespaces. מילונים דינמיים יכולים בנוסף לטעון שפות בטעינה עצלה (lazy load) לפי דרישה.

</Question>
<Question title="האם אוכל להשתמש ב-AI כדי לתרגם את הרכיבים הקיימים שלי למספר שפות?">

כן. ה-CLI של Intlayer כולל את הפקודה `npx intlayer fill`, המתחברת לספק ה-AI המועדף עליכם (OpenAI, Anthropic, Mistral, DeepSeek) כדי לייצר תרגומים בהתאם להקשר עבור שפות חסרות בכל הפרויקט שלכם.

</Question>
<Question title="האם ניתן להגר מ-react-i18next או react-intl מבלי לשכתב את הרכיבים שלי?">

כן. Intlayer מספקת מתאמי תאימות (adapters) עבור `react-i18next` ו-`react-intl`, וכן פלאגינים לסנכרון קובצי תרגום JSON קיימים (`sync-json`).

</Question>

</FAQ>
