---
createdAt: 2026-09-02
updatedAt: 2026-11-03
priority: 8
title: האם next-intl מיושנת ב-2026?
description: next-intl הפכה לבחירת ברירת המחדל עבור Next.js App Router. אך מתחת לפני השטח, היא עדיין נושאת עומס bundle בזמן ריצה ותקורה ידנית של ניהול namespaces.
keywords:
  - next-intl
  - Intlayer
  - בינאום
  - i18n
  - Next.js
  - גודל bundle
  - בלוג
  - JavaScript
slugs:
  - blog
  - is-next-intl-outdated
author: aymericzip
youtubeVideo: https://www.youtube.com/watch?v=7VtLdbtV1us&t=1617s
---

# האם next-intl מיושנת ב-2026?

<iframe title="הכול על i18n: המדריך המלא לבינאום ווב" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/7VtLdbtV1us?autoplay=0&amp;start=1617&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

כאשר Vercel הציגה את ה-App Router והפסיקה בהדרגה את ה-i18n המובנה של ה-Pages Router, ‏`next-intl` מילאה במהירות את החלל. Jan Amann סיפק תיעוד מעולה ותמיכה מהירה ב-App Router, מה שהפך אותה לברירת המחדל של הקהילה.

אם כך, מדוע עולה השאלה האם היא מראה סימני התיישנות?

**ארכיטקטורת הווב השתנתה במהירות בשלוש השנים האחרונות, אך המודל הבסיסי של `next-intl` לא השתנה.**

בעוד ש-Next.js התקדמה לעבר React Server Components (RSC), הזרמה (streaming) ואופטימיזציה ברמת הקומפיילר, `next-intl` עדיין מתייחסת לבינאום כאל עניין של זמן ריצה: העברת אובייקטי JSON גדולים דרך client providers, הרצת מעבדי פורמט ICU בתוך ה-bundles של הדפדפן, והסתמכות על ניהול ידני של namespaces כדי לבלום את התנפחות ה-bundle.

<TOC/>

## נקודות מפתח

**סטגנציה בתחזוקה:**

ב-12 החודשים האחרונים, `next-intl` רשמה כ-187 commits, שהתמקדו בעיקר בעדכוני תאימות ל-Next.js ותיקוני טלאי (patch).

**מס זמן ריצה בצד הלקוח:**

טעינת `NextIntlClientProvider` יחד עם `useTranslations()` מוסיפה כ-12.8 KB מכווץ ב-gzip (או 51 KB לאחר minification) עוד לפני רינדור מילה אחת, פי 3 בערך לעומת `next-intlayer` (4.3 KB).

**דליפת תוכן של 90%:**

בהגדרות טיפוסיות, **89.8% מנפח התרגומים הנשלח לדף שייך לנתיבים אחרים**. כניסה לנתיב `/contact` מורידה גם את הטקסטים של `/pricing` ושל `/dashboard`.

**תקורה של ניהול ידני של namespaces:**

מניעת התנפחות הטקסט דורשת מיפוי ידני ומאומץ של namespaces לכל נתיב, מה שמגדיל את הסיכון למפתחות חסרים בסביבת ייצור (production).

**חסות מסחרית:**

כשותפה רשמית של Crowdin, קיים תמריץ מועט לפתח פקודת תרגום מקומית וחינמית המבוססת על AI ישירות בתוך ה-CLI.

## תחזוקה לעומת כלים מודרניים

פעילות commits במהלך 12 החודשים האחרונים:

| מאגר                  | כוכבים                                                                                                                                                 | סך כל ה-commits                                                                                                                                                     | Commits בשנה                                                                                                                                                       | Commit אחרון                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `amannn/next-intl`    | [![stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=stars)](https://github.com/amannn/next-intl/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/amannn/next-intl?style=for-the-badge&label=%2Fyear)](https://github.com/amannn/next-intl/commits)       | [![last](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

פעילות ב-12 החודשים האחרונים:

- `amannn/next-intl`: **187 commits** (בעיקר עדכוני patch ועדכוני תלויות).
- `aymericzip/intlayer`: **4,343 commits** (עבודה פעילה על קומפיילרים, הרחבות ל-IDE, שרתי MCP ומנועי תרגום).

[![תרשים היסטוריית כוכבים](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#amannn/next-intl&aymericzip/intlayer)

<GithubCommits repositories="amannn/next-intl,aymericzip/intlayer" />

ספרייה קטנה יכולה להיות שלמה ויציבה. אולם עולם ה-i18n בפרונטאנד התקדם: קומפיילרים מסוגלים כעת להסיר טקסט שאינו בשימוש בזמן build, מודלי LLM יכולים לאזן ולתרגם באופן אוטומטי ישירות ב-CI, ועורכי קוד מסתמכים על שרתי שפה ייעודיים (LSP) וסוכני AI. ספרייה שנמצאת במצב תחזוקה בלבד מתקשה להטמיע את ההתפתחויות הללו.

> כדי להבין את מקורן של ספריות אלו, קראו על ההיסטוריה של בינאום ב-JavaScript.

- [ההיסטוריה של בינאום ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md)

## הורדות ב-npm

<NpmDownloads packages="next-intl,next-intlayer" period="last-6-months" />

מספר ההורדות מתגמל את הפתרונות הוותיקים ביותר, ולא בהכרח את הטובים ביותר. ספרייה ששוחררה לפני שנים עדיין מותקנת על ידי כל פרויקט שבחר בה בעבר, על ידי כל הרצת CI ועל ידי כל חבילה שתלויה בה. הספירה משקפת אינרציה יותר מאשר בחירה מודעת ועדכנית.

עוזרי AI מגבירים את האפקט הזה. `next-intl`, `i18next` ו-`vue-i18n` מופיעות בכל מקום בקוד שעליו הם אומנו, ולכן הם ממליצים עליהן כברירת מחדל, ללא השוואה מעמיקה לחלופות. כל המלצה כזו מוסיפה הורדות, מה שמזין את ההמלצה הבאה. מומלץ להשוות לפי מבחני ביצועים (benchmarks) ולא לפי כמות ההורדות.

## מדידת ביצועים ב-Next.js 16 App Router

ביצענו בדיקת ביצועים (benchmark) על יישום App Router סטנדרטי עם 10 נתיבים ו-10 שפות (locales):

<I18nBenchmark framework="nextjs" packages="next-intl,@intlayer/next-intl,next-intlayer" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> נבדק בסביבות דפדפן אמיתיות תוך שימוש בדחיסת gzip לייצור. פרטים מלאים ב-[דוח ה-benchmark של Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md).

- [דוח ה-benchmark של Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)

### טביעת הרגל של ספריית הליבה

טביעת הרגל בצד הלקוח לפני הוספת תוכן כלשהו:

| ספרייה                 | Gzipped    | Minified    |
| ---------------------- | ---------- | ----------- |
| `next-intl@4.9.1`      | 12.8 KB    | 51.0 KB     |
| `next-intlayer@8.7.12` | **4.3 KB** | **13.3 KB** |

### משקל הדף ודליפת תוכן

| הגדרה               | ממוצע JS לדף (gz) | דליפת שפה (Locale leak) | דליפת דפים אחרים | ממוצע לקומפוננטה (gz) |
| ------------------- | ----------------- | ----------------------- | ---------------- | --------------------- |
| בסיס (ללא i18n)     | 150.8 KB          | 0.0%                    | 0.0%             | 0.7 KB                |
| `next-intl` (סטטי)  | 163.5 KB          | 4.2%                    | **89.8%**        | 20.5 KB               |
| `next-intl` (דינמי) | 163.4 KB          | 9.7%                    | **89.9%**        | 20.5 KB               |
| `next-intlayer`     | **152.1 KB**      | **0.0%**                | **0.0%**         | **7.2 KB**            |

### מדוע מתרחשת דליפת תוכן מדפים אחרים?

בהגדרות טיפוסיות של `next-intl`, ה-root layouts טוענים את כל ההודעות מראש:

```tsx fileName="app/[locale]/layout.tsx"
export default async function RootLayout({ children, params }) {
  const messages = await getMessages();

  return (
    <html>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

מכיוון ש-`messages` מועבר ל-client provider ברמת השורש, הדפדפן מקבל את כל מילון התרגומים בכל דף. כניסה ל-`/login` מאלצת את המשתמש להוריד גם את התוכן של שאלות נפוצות, תיעוד ולוח הבקרה (dashboard).

ניתן למנוע זאת על ידי חלוקת קובצי ה-JSON ל-namespaces וטעינתם באופן מותנה לכל נתיב. אולם, תחזוקה ידנית של מיפוי בין נתיבים ל-namespaces היא משימה מייגעת ומועדת לשגיאות של מפתחות חסרים בייצור.

הגרף להלן מעריך את נפח הנתונים עבור יישום תיאורטי של 1 עד 10 דפים ב-1 עד 10 שפות, עם כ-30 KB של טקסט לכל דף. טעינה דינמית של הודעות לפי שפה מסירה ציר אחד, חלוקתן לפי נתיב מסירה את הציר השני, ורק השילוב ביניהן שומר על נפח נמוך וקבוע.

![דליפת תוכן תיאורטית לפי ארכיטקטורה](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Intlayer פותרת זאת באמצעות ניתוח סטטי: ה-[קומפיילר של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) אורז רק את הטקסטים שנעשה בהם שימוש בפועל באותו נתיב, ומוריד את דליפת הדפים האחרים ל-**0.0%**.

- [קומפיילר של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)

## מדוע לא ניתן לבצע Tree-Shaking ב-next-intl?

ה-API מסתמך על קריאות מחרוזת דינמיות בזמן ריצה:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```tsx fileName="UserProfile.tsx"
"use client";

import { useTranslations } from "next-intl";

export function UserProfile() {
  const t = useTranslations("UserProfile");

  return <h2>{t("heading")}</h2>;
}
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```tsx fileName="UserProfile.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function UserProfile() {
  const { heading } = useIntlayer("user-profile");

  return <h2>{heading}</h2>;
}
```

  </Tab>
</Tabs>

Turbopack ו-Webpack אינם יכולים לאמת אילו מפתחות בתוך `UserProfile` נקראים בפועל בזמן ריצה. כדי למנוע שגיאות של מפתחות חסרים, **ה-bundler חייב לכלול את כל ה-namespace בתוך ה-chunk של הלקוח**. הפירוק (destructuring) של מאפיינים ב-Intlayer מאפשר לקומפיילר לעקוב ישירות אחר הפניות ולהסיר שדות שאינם בשימוש במהלך הקומפילציה. למידע נוסף ראו [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md).

- [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)

## חוויית פיתוח (Developer Experience)

### קובצי JSON מנותקים לעומת מיקום משותף (Co-Location)

ב-`next-intl`, הטקסטים מפוזרים בין קובצי JSON מרובים בתיקיית `messages/` מרוחקת. Intlayer מאפשרת להגדיר תוכן בצמוד לקומפוננטות:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "authModal": {
    "title": "Sign in to your account",
    "submitButton": "Continue"
  }
}
```

```json fileName="messages/fr.json"
{
  "authModal": {
    "title": "Connectez-vous à votre compte",
    "submitButton": "Continuer"
  }
}
```

```tsx fileName="AuthModal.tsx"
import { useTranslations } from "next-intl";

export const AuthModal = () => {
  const t = useTranslations("authModal");
  return (
    <form>
      <h2>{t("title")}</h2>
      <button type="submit">{t("submitButton")}</button>
    </form>
  );
};
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="AuthModal.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "auth-modal",
  content: {
    title: t({
      en: "Sign in to your account",
      fr: "Connectez-vous à votre compte",
      "he-IL": "התחבר לחשבונך",
    }),
    submitButton: t({
      en: "Continue",
      fr: "Continuer",
      "he-IL": "המשך",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="AuthModal.tsx"
import { useIntlayer } from "next-intlayer";

export const AuthModal = () => {
  const { title, submitButton } = useIntlayer("auth-modal");
  return (
    <form>
      <h2>{title}</h2>
      <button type="submit">{submitButton}</button>
    </form>
  );
};
```

  </Tab>
</Tabs>

כאשר מוחקים או מעדכנים את `AuthModal.tsx`, התרגומים שלו מתעדכנים או מוסרים יחד איתו.

### השלמה אוטומטית לעומת אכיפת טיפוסים קפדנית

הרחבת `IntlMessages` ב-`next-intl` מספקת השלמה אוטומטית בעורך בהתבסס על קובץ השפה הראשי:

```ts fileName="global.d.ts"
import en from "./messages/en.json";

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
```

עם זאת, הבדיקה נעשית רק מול שפת המקור שלכם. אם תמחקו מפתח מ-`fr.json`, ‏TypeScript לא יציג שום אזהרה, מה שישאיר את ה-CI ירוק ותקין בזמן שמשתמשים בצרפתית ייתקלו בטקסט חסר או בערכי ברירת מחדל.

Intlayer מסיקה טיפוסים מכל הגדרות התוכן. הפעלת [`strictMode`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md) הופכת תרגומים חסרים בכל שפה שהיא לשגיאות קומפילציה ברורות.

- [`strictMode`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

### כלי עבודה וסביבת עבודה לסוכני AI

| תכונה                          | `next-intl` | Intlayer                                                                                                          |
| ------------------------------ | ----------- | ----------------------------------------------------------------------------------------------------------------- |
| **הרחבה ל-VS Code**            | ❌ אין      | ✅ [הרחבה רשמית](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)           |
| **שרת שפה (LSP)**              | ❌ אין      | ✅ [LSP משולב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)                           |
| **שרת MCP (עבור סוכני AI)**    | ❌ אין      | ✅ [שרת MCP מובנה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)                |
| **כישורי סוכן (Agent Skills)** | ❌ אין      | ✅ [כישורים מוכנים לשימוש](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)      |
| **CMS חזותי בהקשר הדף**        | ❌ אין      | ✅ [חינמי ובקוד פתוח](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) |

שרת LSP מובנה ושרת MCP מאפשרים לעוזרי קוד מבוססי AI לבחון את גרף התוכן של הפרויקט, להשלים מחרוזות בכל השפות ולעדכן מילונים באופן מדויק.

## השותפות עם Crowdin וההשפעה על כלי הפיתוח

`next-intl` פועלת בשותפות רשמית עם Crowdin. חסויות שומרות על קהילת הקוד הפתוח בריאה, אך קשר מסחרי זה משפיע באופן טבעי על סדר העדיפויות במפת הדרכים: `next-intl` מתוכננת כ-client עבור פלטפורמות TMS חיצוניות, מה שאומר שפקודת תרגום מקומית וחינמית המבוססת על AI אינה צפויה לקבל עדיפות.

Intlayer מספקת כלים מובנים:

**השלמה אוטומטית מקומית באמצעות AI ‏(`intlayer fill`):**

מזהה ומתרגמת מפתחות חסרים באופן אוטומטי באמצעות מפתחות ה-API האישיים שלכם ב-OpenAI, ‏Anthropic, ‏Mistral או Gemini.

**CMS חזותי הניתן לאירוח עצמי:**

השתמשו ב-[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) כדי לאפשר ליוצרי תוכן שאינם אנשי פיתוח לערוך תוכן ויזואלית עם ביצוע commit בחזרה ל-Git.

- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

**רישיון קוד פתוח מתירני:**

כל המערכת מופצת תחת רישיון Apache 2.0.

## היכן next-intl עדיין מתאימה

<AccordionGroup>
<Accordion header="דרישות מורכבות של ICU MessageFormat">

אם הפרויקט שלכם מסתמך במידה רבה על כללי רבים (plurals) מורכבים, בחירת ספרות סידוריות ומעבדי פורמט מקוננים, מימוש ה-ICU של `next-intl` בוגר ואמין.

</Accordion>
<Accordion header="תהליכי עבודה קיימים עם Crowdin">

אם הצוות שלכם כבר עובד עם תהליכי אוטומציה ב-Crowdin, ‏`next-intl` משתלבת היטב בזרימת העבודה הזו.

</Accordion>
<Accordion header="יישומים יציבים קיימים">

אם בסיס הקוד שלכם פועל בצורה יציבה וגדלי ה-bundle בצד הלקוח עומדים ביעדי הביצועים, ייתכן שאין צורך מיידי בהגירה.

</Accordion>
</AccordionGroup>

## כיצד לשפר את מערך ה-next-intl הקיים?

Intlayer מספקת חבילת תאימות drop-in ששומרת על אותן חתימות פונקציה ו-hooks בדיוק כמו ב-`next-intl` (כגון `useTranslations`, `getTranslations` ועוזרי ניתוב). אינכם צריכים לשכתב את הדפים או הקומפוננטות שלכם כדי להתחיל ליהנות מאופטימיזציות ברמת הקומפיילר.

ההגדרה מתבצעת באמצעות פקודה אחת:

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

ה-CLI האינטראקטיבי:

1. מתקין את חבילת התאימות `@intlayer/next-intl`.
2. מגדיר כינויים (aliases) ב-bundler כך שהייבואים הקיימים שלכם (`next-intl`, `next-intl/server`) ינותבו ישירות ל-Intlayer, מה שמאפשר להסיר את הספרייה הישנה מ-`package.json`.
3. מגדיר אבחון שרת שפה (LSP) לעורך, ביצוע tree-shaking בזמן build (המונע דליפת תרגומים בין נתיבים שונים), ותהליכי תרגום מקומיים באמצעות AI ללא צורך בשכתוב נרחב.

להנחיות שלב אחר שלב, עיינו במדריכים הייעודיים שלנו:

- **תאימות מלאה (Drop-in):** שמרו על הקוד הקיים באמצעות [שכבת התאימות של `next-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/next-intl.md).
- **הגירה אוטומטית:** המירו קובצי JSON ישנים למילונים מובנים בעזרת [מדריך ההגירה מ-next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_next-intl_to_intlayer.md).
- **מערך היברידי:** שמרו על `next-intl` לרינדור בזמן ריצה בעת [שימוש ב-Intlayer לצד next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/intlayer_with_next-intl.md) עבור תרגום מקומי מבוסס AI.

בדקו את נפח הנתונים והדליפות ביישום ה-Next.js שלכם בעזרת הכלי החינמי [סורק SEO ל-i18n](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## קריאה נוספת

- [Next.js i18n Benchmark: ניתוח ביצועים מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)
- [next-i18next מול next-intl מול Intlayer: השוואה מלאה](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-i18next_vs_next-intl_vs_intlayer.md)
- [האם i18next מיושנת ב-2026?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/is_i18next_outdated.md)
- [הטיעון בעד בינאום מונחה קומפיילר](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/compiler_vs_declarative_i18n.md)
