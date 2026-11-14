---
createdAt: 2026-09-23
updatedAt: 2026-11-03
priority: 8
title: האם Intlayer קלה יותר מ-Paraglide?
description: "Paraglide נראית כמעט ללא עלות במבחני ביצועי i18n מכיוון שהקוד שלה נוצר ישירות במאגר שלך. לאן המשקל הזה הולך ואיך היא מושווה ל-Intlayer."
keywords:
  - Paraglide
  - Intlayer
  - בינאום
  - i18n
  - גודל bundle
  - Tree shaking
  - מבחן ביצועים
  - בלוג
slugs:
  - blog
  - is-intlayer-lighter-than-paraglide
author: aymericzip
youtubeVideo: https://www.youtube.com/watch?v=7VtLdbtV1us&t=2081s
---

# האם Intlayer קלה יותר מ-Paraglide?

<iframe title="הכול על i18n: המדריך המלא לבינאום ווב" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/7VtLdbtV1us?autoplay=0&amp;start=2081&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

כן.

ל-`Paraglide` יש מוניטין חיובי כפתרון ה-i18n הקל ביותר בסביבה, ובמבט ראשון ה[בנצ'מרק](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md) מאשר זאת: גודל הספרייה שלה קרוב לאפס. אך גודל ספרייה של אפס אינו אומר שאפס בייטים נשלחים לדפדפן. המשמעות היא שהבייטים הללו נמצאים במקום שבו המדד אינו בודק.

- [בנצ'מרק](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)

<TOC/>

## נקודות מפתח

**גודל הספרייה מוסתר, לא נעלם:**

Paraglide מייצרת את זמן הריצה ופונקציות ההודעות שלה ישירות לתוך קוד המקור שלכם. קוד זה נשלח לדפדפן, אך הוא נספר כקוד _שלכם_, ולא כשל הספרייה.

**היעדר Provider אינו ניצחון חינמי:**

כל קריאה ל-`m.my_key()` מפענחת את ה-locale בעצמה, וקוראת את ה-cookie או ה-storage עבור כל צומת (node) שמרונדר, במקום לקרוא אותו פעם אחת מ-context.

**ללא טעינה דינמית:**

Paraglide מייבאת כל שפה (locale) של הודעה לתוך חבילת הלקוח שלכם. Intlayer עם `importMode: 'dynamic'` או `'fetch'` טוענת אך ורק את השפה שמרונדרת בפועל.

**Tree-shaking אינו מובטח:**

בחלק ממבחני הביצועים שלנו, ה-Tree-shaking שהובטח ב-Paraglide לא פעל בפועל. בדקו את ה-bundle שלכם.

## לאן הולך המשקל של Paraglide?

בדוחות מבחני הביצועים, מדד "גודל הספרייה" בודק את ה-provider וה-hooks של כל ספריית i18n בקומפוננטה ריקה, לפני הוספת תוכן כלשהו.

| ספרייה (TanStack Start)       | גודל ספרייה (gz) | גודל ספרייה (min) |
| ----------------------------- | ---------------- | ----------------- |
| `@inlang/paraglide-js@2.15.1` | 1.8 KB           | 4.5 KB            |
| `react-intlayer@9.5.1`        | 5.0 KB           | 15.2 KB           |

בקריאה מבודדת, Paraglide מנצחת. אך Paraglide היא קומפיילר: היא קוראת את קובצי ה-`messages/*.json` שלכם וכותבת תיקיית `paraglide/` לתוך המאגר שלכם, המכילה `runtime.js` (זיהוי locale, אסטרטגיות cookie ו-storage, לוקליזציה של URLs) ופונקציית JavaScript אחת לכל הודעה.

```bash
src/paraglide/
├── runtime.js      # זיהוי locale, אסטרטגיות, עזרי URL
├── server.js
├── messages.js     # ייצוא מחדש של כל הודעה
└── messages/
    ├── _index.js
    ├── en.js
    └── fr.js
```

מכיוון שקוד זה יושב בתוך תיקיית ה-`src/` שלכם ואתם מייבאים אותו באמצעות נתיב יחסי, הבנדלר מייחס אותו לאפליקציה שלכם, ולא לחבילת `node_modules`. עמודת גודל הספרייה מציגה כמעט אפס, בעוד שאותו היגיון קוד עדיין נשלח במלואו ב-bundle של הדף שלכם.

יצירת קוד (code generation) אינה רעיון רע כשלעצמו: זמן הריצה שנוצר כולל רק את הלוגיקה שהקונפיגורציה שלכם דורשת (אסטרטגיית קידומת, cookie לעומת local storage וכו'). Intlayer מגיעה לאותה תוצאה בדרך אחרת, על ידי הזרקת משתני סביבה בזמן בנייה כך שהבנדלר מסיר את הענפים שאינם בשימוש בקונפיגורציה שלכם. שתי הגישות מסתיימות בקוד קל פי 3 עד 10 מ-`i18next` או `next-intl`.

לכן, ההשוואה ההוגנת אינה גודל הספרייה. היא **קוד ה-JavaScript שנשלח בפועל לכל דף**.

## משקל דף, במדידה בפועל

אפליקציית TanStack Start, 10 דפים, נמדדה בנתיבי `en` ו-`fr`, מכווץ ב-gzip:

| הגדרה                              | ממוצע JS לדף (gz) | מעל הבסיס   | דליפת שפות | דליפת דפים אחרים |
| ---------------------------------- | ----------------- | ----------- | ---------- | ---------------- |
| Base (ללא i18n)                    | 111.0 KB          | -           | 0.0%       | 0.0%             |
| `paraglide` (כל אסטרטגיה)          | 125.1 KB          | +14.1 KB    | 49.7%      | 0.0%             |
| `intlayer` (`importMode: static`)  | 125.8 KB          | +14.8 KB    | 50.0%      | 0.0%             |
| `intlayer` (`importMode: dynamic`) | **118.6 KB**      | **+7.6 KB** | **0.0%**   | **0.0%**         |

Next.js 16 App Router, אותה אפליקציה:

| הגדרה            | ממוצע JS לדף (gz) | מעל הבסיס   |
| ---------------- | ----------------- | ----------- |
| Base (ללא i18n)  | 141.0 KB          | -           |
| `paraglide-next` | 155.3 KB          | +14.3 KB    |
| `next-intlayer`  | **141.3 KB**      | **+0.3 KB** |

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

> הנתונים המלאים מופיעים ב[דוח ביצועי TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md) וב[דוח ביצועי Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md). ניתן לבדוק כל bundle ב[מאגר מבחני הביצועים](https://github.com/intlayer-org/benchmark-i18n).

- [דוח ביצועי TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)
- [דוח ביצועי Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)

שני דברים בולטים מיד:

- במצב `static`, Intlayer שולחת למעשה את אותו התוכן כמו Paraglide (125.8 KB לעומת 125.1 KB). זה צפוי: שתיהן כוללות את כל השפות של ההודעות שבהן הדף משתמש.
- Paraglide נשארת על 125.1 KB בכל אסטרטגיה שהיא, מכיוון שאין לה מצב דינמי. כל שורה בטבלה לעיל היא השורה הסטטית.

## ללא Provider: רעיון שנשמע טוב אבל אינו כזה

ל-Paraglide אין provider. אתם פשוט מייבאים הודעה וקוראים לה:

```tsx fileName="Hero.tsx"
import { m } from "../paraglide/messages.js";

export const Hero = () => (
  <section>
    <h1>{m.hero_title()}</h1>
    <p>{m.hero_description()}</p>
    <button>{m.hero_cta()}</button>
  </section>
);
```

ללא context, ללא wrapper וללא hook. זה נראה פשוט יותר. אבל השפה עדיין צריכה להגיע מאיפשהו. כל פונקציית הודעה שנוצרת נראית בקירוב כך (בצורה מופשטת):

```js fileName="paraglide/messages/_index.js"
export const hero_title = (inputs = {}, options = {}) => {
  const locale = options.locale ?? getLocale(); // מפוענח בכל קריאה מחדש

  if (locale === "en") return en.hero_title(inputs);
  if (locale === "fr") return fr.hero_title(inputs);
  // ...ענף אחד לכל שפה
};
```

והפונקציה `getLocale()` עוברת על האסטרטגיות שהוגדרו (cookie, local storage, URL, שפת בסיס) כדי למצוא את השפה הנוכחית. המשמעות היא שכל צומת טקסט שאתם מרנדרים (`<>{m.my_key()}</>`) מריץ פענוח שפה עצמאי משלו, כולל קריאת `document.cookie` בדפדפן. דף עם 200 מחרוזות מתורגמות מפענח את השפה 200 פעמים בכל רינדור, ושוב בכל רינדור מחדש (re-render).

ספרייה המבוססת על provider קוראת את השפה **פעם אחת**, שומרת אותה ב-context (או ב-signal, או ב-store), וכל צומת קורא ערך שכבר נמצא בזיכרון. ה-provider עולה כמה מאות בייטים. הוויתור עליו עולה ב-CPU בכל רינדור, וזה ניכר במבחני הביצועים: זמני טעינת הדף והחלפת השפה של Paraglide מפגרים בעקביות אחרי אלו של Intlayer ב-TanStack Start (22.1 ms לעומת 14.6 ms בטעינת דף, 4.3 ms לעומת 3.2 ms בתגובתיות E2E).

## חוויית מפתח

מקור האמת (source of truth) של Paraglide הוא קובצי JSON, אך לעולם אינכם מייבאים את ה-JSON ישירות. אתם מייבאים את קובץ ה-`.js` שנוצר:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "hero_title": "Ship your app in every language"
}
```

```json fileName="messages/fr.json"
{
  "hero_title": "Publiez votre app dans toutes les langues"
}
```

```tsx fileName="Hero.tsx"
// נוצר רק לאחר שהקומפיילר ייצר אותו מחדש מתוך ה-JSON
import { m } from "../paraglide/messages.js";

export const Hero = () => <h1>{m.hero_title()}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      en: "Ship your app in every language",
      fr: "Publiez votre app dans toutes les langues",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

למחזור עבודה זה יש מחיר:

- כל שינוי בקובץ JSON מחייב יצירה מחדש (regeneration) לפני שה-import מתפענח או שהטיפוסים מתעדכנים.
- את תיקיית `paraglide/` שנוצרת יש לבצע לה commit (מה שמוביל להתנגשויות merge בקבצים מיוצרים בכל PR שנוגע בטקסט), או להתעלם ממנה (מה שמחייב שלב יצירה לפני כל בדיקת טיפוסים, בדיקה ומשימת CI).
- כל מחרוזת הופכת לקריאת פונקציה. קבועים הופכים ל-`m.key()` בכל מקום, כולל במקומות שבהם ערך פשוט היה מספיק.

## Tree Shaking: בדקו את ה-Bundle שלכם

ההבטחה העיקרית של Paraglide היא שהודעות ללא שימוש מוסרות ב-tree-shaking, מאחר שכל הודעה היא export עצמאי. במבחן הביצועים של Svelte + Vite, זה עובד כמובטח.

בהגדרות אחרות, זה לא עבד. בהרצה שלנו ב-[Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md), הדפים של Paraglide שוקלים 14 KB יותר מאפליקציית הבסיס, בעוד ש-`next-intlayer` מוסיפה רק 0.3 KB. הרצות קודמות ב-TanStack Start הראו שהודעות מדפים אחרים הגיעו גם הן ל-bundle של הנתיב.

- [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)

Tree shaking תלוי בבנדלר שלכם (Turbopack, Rolldown, Rollup), באופן ייבוא ההודעות (`import { m }` לעומת `import * as m`), ובניתוח תופעות לוואי (side-effect analysis). אם אתם בוחרים ב-Paraglide בשל גודלה, פתחו את ה-bundle visualizer ובדקו שזה אכן מתקיים באפליקציה שלכם.

## ללא טעינה דינמית

זוהי המגבלה המבנית. ל-Paraglide אין דרך לטעון שפה אחת בכל פעם: כל פונקציית הודעה מייבאת סטטית את המימוש של כל שפה, ולכן כל השפות נכללות ב-bundle הלקוח שלכם.

עם 2 שפות, חצי מנפח התרגומים שלכם מבוזבז, מה שתואם את דליפת השפות של כ-50% שנמדדה למעלה. עם 10 שפות, 90% מבוזבז. עם 30 שפות, 97%.

הגרף שלהלן מעריך את נפח הנתונים עבור אפליקציה תיאורטית של 1 עד 10 דפים ב-1 עד 10 שפות, עם כ-30 KB טקסט לכל דף. פיצול תוכן פר נתיב מסיר ציר אחד, טעינתו באופן דינמי פר שפה מסירה את הציר השני, ורק השילוב ביניהם שומר על נפח נתונים שטוח ומינימלי. Paraglide מכסה במקרה הטוב את הציר הראשון, ולעולם לא את השני.

![דליפת תוכן תיאורטית לפי ארכיטקטורה](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

מעבר לטעינה דינמית לא יפתור זאת: עם פונקציה אחת לכל הודעה, טעינה עצלה של כל אחת בנפרד תגרום לאלפי בקשות רשת.

Intlayer מאפשרת לכם לבחור, גלובלית או פר מילון:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic", // 'static' | 'dynamic' | 'fetch'
  },
};

export default config;
```

| `importMode` | מה נשלח ללקוח                                       | לעומת Paraglide        |
| ------------ | --------------------------------------------------- | ---------------------- |
| `static`     | כל השפות של המילונים שבהם הדף משתמש                 | תיאורטית אותו תוכן     |
| `dynamic`    | רק השפה הנוכחית, בטעינה עצלה (lazy-loaded) פר מילון | **קטן פי N** עם N שפות |
| `fetch`      | רק השפה הנוכחית, נמשכת מ-Live Sync API              | **קטן פי N** עם N שפות |

עם [טרנספורמציית הבנייה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md) ו-`importMode: 'static'`, Intlayer טוענת, בתיאוריה, בדיוק את אותו התוכן כמו Paraglide. עם `'dynamic'` או `'fetch'`, היא טוענת אך ורק את מה שהשפה הנוכחית צריכה: עבור אפליקציה ב-N שפות, נפח התרגום קטן פי N מזה של Paraglide.

- [טרנספורמציית בנייה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)

## היכן Paraglide עדיין מתאימה

<AccordionGroup>
<Accordion header="Svelte + Vite עם מעט שפות">

אם ה-stack שלכם הוא Svelte עם Vite ואתם תומכים בשתיים או שלוש שפות, tree shaking עובד כמובטח והתקורה של השפות נשארת קטנה.

</Accordion>
<Accordion header="תהליך עבודה קיים ב-inlang">

אם הצוות שלכם כבר משתמש באקוסיסטם של inlang (כגון Fink, Sherlock, פלאגינים של message format), Paraglide משתלבת בו באופן טבעי.

</Accordion>
</AccordionGroup>

## נסו זאת באפליקציה שלכם

בדקו את נפח הנתונים ודליפת השפות באפליקציה הפעילה שלכם באמצעות [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner) החינמי:

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

להגדרת Intlayer:

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

## לקריאה נוספת

- [מבחן ביצועי i18n ב-TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)
- [מבחן ביצועי i18n ב-Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)
- [אופטימיזציית Bundle ו-`importMode`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)
- [כיצד לבחור ספריית i18n ל-React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/how_to_pick_react_i18n_library.md)
- [הטיעון לטובת בינאום מונחה-קומפיילר](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/compiler_vs_declarative_i18n.md)

> כדי להבין מהיכן הגיעו ספריות אלו, קראו על ההיסטוריה של i18n ב-JavaScript.

- [ההיסטוריה של i18n ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md)
