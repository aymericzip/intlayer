---
createdAt: 2026-01-10
updatedAt: 2026-11-03
priority: 8
title: "הפיכת אפליקציית Next.js קיימת לרב-לשונית"
description: "הוסיפו i18n לאפליקציית Next.js קיימת מבלי לשכתב אותה: חלצו מחרוזות מקודדות אוטומטית, תרגמו אותן באמצעות AI והגדירו ניתוב רב-לשוני."
keywords:
  - Next.js i18n
  - בינאום
  - Internationalization
  - תרגום אפליקציית Next.js קיימת
  - Next.js 16
  - Intlayer
  - רב-לשוני
  - Multilingual
  - React i18n
  - קומפיילר
  - Compiler
  - תרגום AI
  - AI translation
  - SEO
slugs:
  - blog
  - transform-existing-nextjs-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "עדכון לארכיטקטורת Next.js >= 9.4.0"
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

# כיצד להפוך אפליקציית Next.js קיימת לרב-לשונית (i18n) בדיעבד (מדריך 2026)

הוספת בינאום (i18n) לפרויקט Next.js מהיום הראשון היא משימה פשוטה יחסית. אך מה קורה כאשר כבר יש לכם אפליקציית Next.js בוגרת, מוכנה לייצור (production) שנבנתה בשפה אחת בלבד, ועליכם להפוך אותה לרב-לשונית **בדיעבד**?

אם אי פעם ניסיתם לעשות זאת עם ספריות מסורתיות כמו `next-intl` או `next-i18next`, אתם מכירים את הסיוט:

- מעקב אחר מחרוזות טקסט מקודדות (hardcoded) במאות קובצי JSX/TSX.
- יצירה ידנית של קובצי JSON מקוננים והמצאת שמות שרירותיים למפתחות תרגום (`pages.dashboard.header.title` וכדומה).
- החלפת טקסט ב-JSX בקריאות מסורבלות ל-hooks של תרגום (`t('...')`).
- ארגון מחדש של כל תיקיית `app/` לתוך `app/[locale]/...`, מה ששובר נתיבים קיימים, סימניות ואינדוקס במנועי חיפוש.

בשנת 2026, אין צורך לשכתב את בסיס הקוד שלכם כדי להפוך את אפליקציית ה-Next.js לרב-לשונית. באמצעות **Intlayer**, תוכלו להוסיף בינאום לאפליקציית Next.js קיימת בתוך דקות, תוך שימוש בחילוץ אוטומטי, תרגום מבוסס AI וניתוב שאינו פולשני.

> מחפשים את המדריך הטכני המלא שלב אחר שלב עבור Next.js 16 App Router? עיינו בתיעוד הייעודי שלנו: [תרגום Next.js 16 באמצעות Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md).

- [תרגום Next.js 16 באמצעות Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)

## תוכן עניינים

<TOC/>

## דילמת השדרוג: מדוע הפיכת אפליקציית Next.js קיימת לרב-לשונית היא משימה מורכבת

כאשר מוסיפים בינאום לאפליקציית Next.js קיימת, מפתחים נתקלים בשלושה מכשולים עיקריים:

1. **פגיעה בבסיס הקוד (Codebase Disruption)**: חילוץ ידני של מחרוזות לתוך מילוני JSON דורש עריכה של כמעט כל קובץ רכיב. הדבר יוצר diff עצום ב-Git, סיכון גבוה להתנגשויות מיזוג (merge conflicts) ובאגים של רגרסיה.
2. **נעילת ניתוב (Routing Lock-in)**: ספריות i18n מסורתיות בדרך כלל מאלצות אתכם להעביר את ה-layout הראשי ואת הדפים לתוך מקטע `[locale]` דינמי (למשל `/app/[locale]/page.tsx`). באפליקציה קיימת, הדבר עלול לשבש middleware קיים, נתיבים יחסיים ואינטגרציות של צד שלישי.
3. **עבודת שחורות בתרגום**: ברגע שהמחרוזות מחולצות, הזנת מילונים ב-5, 10 או 20 שפות דורשת אינסוף העתק-הדבק או שירותי לוקליזציה יקרים.

Intlayer פותרת בעיות אלו ברמה הארכיטקטונית באמצעות **חילוץ בסיוע קומפיילר**, **מילונים הצהרתיים** ו**ניתוב גמיש**.

## חילוץ תוכן אוטומטי (ללא חיפוש ידני של מחרוזות)

במקום לחלץ ידנית כל מחרוזת מתוך ה-JSX שלכם, Intlayer מציעה שני מסלולים נטולי חיכוך:

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

פקודה זו סורקת את רכיבי ה-React שלכם, מחלצת מחרוזות הפונות למשתמש ויוצרת באופן אוטומטי קובצי הצהרת תוכן לפי רכיב (`.content.ts`) ישירות לצד הרכיבים שלכם. לוגיקת הרכיב נשארת הצהרתית, ברורה ובטוחה מבחינת טיפוסים, מבלי שתצטרכו לכתוב ידנית אפילו מפתח תרגום בודד.

### אפשרות ב': קומפיילר Intlayer (חילוץ בזמן בנייה)

כאשר קומפיילר Intlayer מופעל בהגדרות שלכם, תוכלו פשוט להמשיך לכתוב את הרכיבים שלכם עם טקסט רגיל מקודד בשפת ברירת המחדל שלכם. בזמן הבנייה, הקומפיילר מחלץ את הטקסט ומזריק את התוכן המתורגם באופן אוטומטי:

```tsx fileName="src/app/page.tsx"
// כיתבו קוד React רגיל. הקומפיילר מחלץ את הטקסט באופן אוטומטי
export default function HomePage() {
  return (
    <section>
      <h1>Welcome to our platform</h1>
      <p>Start exploring our modern features today.</p>
    </section>
  );
}
```

מאחורי הקלעים, Intlayer בונה את המילון ומקשרת את הרכיב לתוכן המתורגם שלו, מה שמבטל לחלוטין את שלב השכתוב הידני.

במקרה זה, ייווצר קובץ `src/app/page.content.ts` עם התוכן הבא:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
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

## תרגום מבוסס AI עם מודל השפה המועדף עליכם

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
      "SaaS dashboard for productivity and team collaboration",
  },
};

export default config;
```

הרצת `npx intlayer fill` מאכלסת את הצהרות ה-`.content.ts` שלכם בתרגומים עבור השפות שהוגדרו:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
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

מכיוון ש-Intlayer מספקת הקשר ברמת האפליקציה (`applicationContext`) למודל ה-LLM, התרגומים שנוצרים שומרים על ניואנסים טכניים, טון המותג והקשר דקדוקי טוב בהרבה מכלים אוטומטיים מסורתיים.

כדי לוודא שלא פוספסו מחרוזות לפני השחרור לייצור:

```bash
npx intlayer test
```

## הוספת ניתוב רב-לשוני מבלי לשבור כתובות URL קיימות

אחד החששות הגדולים ביותר בעת תרגום אפליקציה קיימת הוא שכתוב מערך הניתוב. Intlayer מספקת מספר אסטרטגיות ניתוב מוכנות מראש:

- **מצב Search Params / עוגיות (`search-params`)**: שמרו על מבנה התיקיות המדויק שלכם (`/app/page.tsx`, `/app/dashboard/page.tsx`) מבלי להעביר דבר ל-`[locale]`. השפה מוחלפת באמצעות פרמטר שאילתה (למשל `?locale=he`) או נשמרת בעוגיות (cookies).
- **מצב Prefix מבוסס נתיב (`prefix` / `prefix-all-locales`)**: כאשר תרצו לעבור לכתובות URL מותאמות ל-SEO (`/he/dashboard`, `/es/dashboard`), Intlayer תומכת בניתוב נתיבים באמצעות פרוקסי פשוט של Next.js.

הגדירו את האינטגרציה עם Next.js בתוך שניות:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* הגדרות ה-Next.js הקיימות שלכם */};

export default withIntlayer(nextConfig);
```

עטפו את ה-Root Layout שלכם עם `IntlayerProvider`:

```tsx fileName="src/app/layout.tsx"
import type { ReactNode } from "react";
import { IntlayerProvider } from "next-intlayer";
import { getLocale } from "next-intlayer/server";
import { getHTMLTextDir } from "intlayer";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
}
```

## SEO רב-לשוני

הפכו את הדפים שלכם לניתנים לגילוי עולמי באמצעות יצירת מטא-דאטה מקומית, תגי OpenGraph וכותרות `hreflang` קנוניות:

```tsx fileName="src/app/page.tsx"
import type { Metadata } from "next";
import { getLocale } from "next-intlayer/server";
import { getIntlayer } from "intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const content = getIntlayer("home-page-metadata", locale);

  return {
    title: content.title,
    description: content.description,
  };
};
```

## מדריך מעמיק: מוכנים ליישום שלב אחר שלב?

מדריך זה סיפק סקירה ברמה גבוהה של האופן שבו ניתן להוסיף בינאום לאפליקציית Next.js קיימת בשנת 2026 ללא כאבי ראש ארכיטקטוניים.

אם אתם מוכנים להגדיר כל חלק באפליקציית Next.js שלכם שלב אחר שלב, כולל הגדרות middleware מפורטות, יצירת אתרים סטטיים (`generateStaticParams`), מפות אתר מקומיות ותבניות מתקדמות של Server Components, עברו למדריך התיעוד המקיף שלנו:

👉 **[מדריך מלא לתרגום Next.js 16 עם Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)**

- [מדריך מלא לתרגום Next.js 16 עם Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)

## שאלות נפוצות (FAQ)

<FAQ>

<Question title="האם ניתן להפוך את אפליקציית ה-Next.js שלי לרב-לשונית מבלי להעביר קבצים ל-app/[locale]?">

כן. Intlayer תומכת ב-`routing.mode: "search-params"` וכן בזיהוי שפה על בסיס עוגיות וכותרות HTTP. תוכלו לשמור על מבנה תיקיית `app/` הקיים ללא שינוי, מה שהופך אותה לאידיאלית להסבת אפליקציות קיימות מבלי לשבור כתובות URL או היררכיית תיקיות.

</Question>
<Question title="האם עליי להחליף ידנית את כל המחרוזות המקודדות בבסיס הקוד הקיים שלי?">

לא. תוכלו להשתמש ב-`npx intlayer extract` כדי לזהות ולחלץ אוטומטית מחרוזות מקודדות לתוך הצהרות תוכן מקומיות, או להשתמש בקומפיילר של Intlayer כדי להמיר רכיבים בזמן הבנייה, כך שתוכלו להמשיך לכתוב JSX רגיל.

</Question>
<Question title="כיצד Intlayer מצמצמת את גודל החבילה (bundle size) ב-Next.js בהשוואה ל-next-intl או next-i18next?">

Intlayer משתמשת בהגדרות מילון לפי-רכיב ובאופטימיזציית מאקרו בזמן הבנייה. חבילות צד-הלקוח מקבלות רק את השדות המדויקים הנדרשים על ידי הרכיבים המרונדרים בדף, במקום לייבא קובצי JSON שלמים של namespaces. בנוסף, רכיבי React Server מרנדרים את התוכן שלהם בשרת ללא שום תקורה בצד הלקוח.

</Question>
<Question title="האם אוכל להשתמש ב-AI כדי לתרגם את הרכיבים הקיימים שלי למספר שפות?">

כן. ה-CLI של Intlayer כולל את הפקודה `npx intlayer fill`, המתחברת לספק ה-AI המועדף עליכם (OpenAI, Anthropic, Mistral, DeepSeek) כדי לייצר תרגומים בהתאם להקשר עבור שפות חסרות בכל הפרויקט שלכם.

</Question>

</FAQ>
