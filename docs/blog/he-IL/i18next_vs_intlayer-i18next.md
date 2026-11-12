---
createdAt: 2026-09-13
updatedAt: 2026-11-03
priority: 8
title: "i18next מול @intlayer/i18next: אותו API, Bundle שונה"
description: "אפליקציית React או Next.js שומרת על קריאות ה-i18next שלה, המוגשות דרך מתאמי @intlayer/i18next. מדידת JavaScript לכל עמוד, גודל קומפוננטות וזליגת תוכן."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - "@intlayer/i18next"
  - "@intlayer/react-i18next"
  - "@intlayer/next-i18next"
  - Intlayer
  - מתאם תאימות
  - הגירה
  - בינאום
  - i18n
  - Benchmark
  - גודל bundle
  - בלוג
  - Next.js
  - React
slugs:
  - blog
  - i18next-vs-intlayer-i18next
author: aymericzip
---

# i18next מול @intlayer/i18next: אותו API, Bundle שונה

![i18next מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

החבילות `@intlayer/i18next`, `@intlayer/react-i18next` ו-`@intlayer/next-i18next` הן מתאמי תאימות (compat adapters). הן חושפות בדיוק את אותו ה-API של `i18next` שהקוד שלכם כבר משתמש בו (`useTranslation`, `t()`, `<Trans>`, `i18n.changeLanguage()`, `getFixedT`, `serverSideTranslations`...) ומגישות אותו מתוך מילונים המקומפלים על ידי Intlayer. הקומפוננטות שלכם אינן משתנות כלל, אך שכבת זמן הריצה מתחתיהן מוחלפת.

מאמר זה מודד את ההחלפה הזו על אותה אפליקציית Next.js בדיוק, שנבנתה פעם אחת עם `next-i18next` ופעם שנייה עם `@intlayer/next-i18next`. הנתונים נלקחו מתוך [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). להשוואה רחבה יותר בין `i18next` ל-Intlayer כספריות, קראו את [i18next מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18next_vs_intlayer.md). מאמר זה מתמקד במה שמתאם התאימות משנה כאשר אתם משאירים את הקוד שלכם בדיוק כפי שהוא.

- [i18next מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18next_vs_intlayer.md)

<TOC/>

> **תקציר (tl;dr)**: באותה אפליקציית Next.js, החלפת `next-i18next` ב-`@intlayer/next-i18next` הורידה את ה-JavaScript לכל עמוד מ-**218.5 KB ל-150.7 KB** ב-gzip (בתצורה בסיסית), ועקפה את התצורה הממוטבת ביותר של `next-i18next` (163.4 KB) ב-**12.7 KB**. גודל הקומפוננטה הממוצעת ירד מ-**78.5 KB ל-9.7 KB**, זליגת מחרוזות מדפים זרים ירדה מ-**~90% ל-0%**, זמן ה-hydration ירד מ-**15.6 ms ל-11.3 ms**, וזמן הריצה הצטמצם מ-**19.7 KB ל-9.4 KB**. אף קומפוננטה לא נערכה; רק קובץ Provider אחד עודכן. תוספי `i18next` (כגון backends וגלאי שפה) מתקבלים ללא שגיאה אך אינם מבצעים דבר, כיוון שאין עוד צורך לטעון או לזהות שום דבר בזמן ריצה.

## מה זה `@intlayer/i18next`?

`i18next` היא ספריית זמן ריצה. הפקודה `i18n.init({ resources })` או תוסף backend טוענים את `locales/{lng}/{ns}.json` לתוך מופע גלובלי; הקריאה `useTranslation("about")` רושמת את הקומפוננטה כמנויה אליו; והקריאה `t("title")` מחפשת את המפתח בזמן רינדור. עליכם מוטלת האחריות להגדיר ולתחזק namespaces, טעינה עצלה, רשימות namespaces לפי עמוד ובטיחות טיפוסים.

מתאמי התאימות משמרים את ה-API ומחליפים את המופע:

1. **הגדרת Aliases לייבוא (Import aliasing).** הפונקציה `createNextI18nPlugin()` מתוך `@intlayer/next-i18next/plugin` (או `withI18next`) עוטפת את `withIntlayer` ומוסיפה aliases ב-Webpack וב-Turbopack, כך ש-`next-i18next`, `react-i18next` ו-`i18next` מנותבים אל המקבילים שלהם תחת `@intlayer/*`. ב-Vite, הפונקציה `reactI18nextVitePlugin()` מתוך `@intlayer/react-i18next/plugin` מבצעת את אותה פעולה. אין צורך לשנות אף פקודת ייבוא בקוד.
2. **קובצי JSON כמקור האמת.** התוסף `syncJSON` קורא את קובצי ה-`locales/{lng}/{ns}.json` הקיימים שלכם עם `format: "i18next"` (כך ש-`{{name}}`, קינון `$t()`, סיומות `_one` / `_other` וסיומות הקשר מנותחים כהלכה) וכותב תרגומים בחזרה כשה-CLI או ה-CMS מעדכנים אותם.
3. **חיבור ישיר בנקודת הקריאה (Call-site binding).** שלב האופטימיזציה של Intlayer משכתב את הקריאה `useTranslation("about")` לקריאה המקבלת ישירות את מילון `about` בשפה הפעילה. הקומפוננטה מפסיקה לגשת ל-store הגלובלי.

```tsx fileName="components/About.tsx"
// הקוד שלכם, ללא שינוי
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="מה שהקומפיילר פולט (מפושט)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslation } from "@intlayer/react-i18next";

const About = () => {
  const { t } = useTranslation(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

שכתוב זה הוא הגורם המרכזי לשינוי המשמעותי בגודל הקומפוננטות ובמניעת זליגת התוכן.

## מה המתאמים משמרים, מתעלמים ואינם מחליפים

| ממשק `i18next`                                                                  | עם `@intlayer/*`                                                                                      |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `useTranslation("ns")`, `useTranslation("ns", { keyPrefix })`                   | ✅ נשמר. מקושר למילון `ns` בזמן build; המפתחות מוקלדים בהתאם לתוכן שלכם                               |
| `t("key", { name })`, `{{interpolation}}`, קינון `$t(key)`                      | ✅ נשמר                                                                                               |
| צורות ריבוי `key_one` / `key_other`, הקשר `key_male`, `returnObjects`           | ✅ נשמר. צורות ריבוי מוערכות באמצעות `Intl.PluralRules`                                               |
| `<Trans>` עם `components`, תגיות ממוספרות `<1>...</1>`, `values`                | ✅ נשמר                                                                                               |
| `withTranslation`, `Translation`, `I18nContext`                                 | ✅ נשמר                                                                                               |
| `i18n.changeLanguage()`, `i18n.language`, `i18n.dir()`, `on("languageChanged")` | ✅ נשמר. הפונקציה `changeLanguage` מנהלת את ה-locale של Intlayer                                      |
| `getFixedT(lng, ns, keyPrefix)`, `i18n.exists()`, `hasLoadedNamespace()`        | ✅ נשמר                                                                                               |
| `i18n.use(Backend).use(LanguageDetector).init({...})`                           | ⚠️ הפונקציה `use()` קוראת ל-`init` של התוסף ומסיימת; לתוספי backend וגלאים אין מה לטעון או לזהות      |
| `init({ resources })`, `addResourceBundle()`                                    | ⚠️ המאפיין `resources` **מתעלם** עם אזהרת פיתוח; הסירו את ייבויי ה-JSON כדי להשיג את החיסכון ב-bundle |
| `I18nextProvider i18n={i18n}`                                                   | ⚠️ מרנדר `IntlayerProvider`; המאפיין `i18n` אינו פעיל. ב-App Router, העבירו את ה-locale (ראו להלן)    |
| `serverSideTranslations(locale, ["common"])` (next-i18next)                     | ⚠️ מחזיר את המבנה המצופה ואינו טוען דבר. בטוח להשאיר, בטוח למחוק                                      |
| `appWithTranslation(App)` (next-i18next)                                        | ✅ נשמר                                                                                               |
| `next-i18next.config.js`                                                        | ⚠️ אינו נקרא. השפות מוגדרות מתוך `intlayer.config.ts`                                                 |
| קריאה ללא ארגומנט `useTranslation()`                                            | ✅ פועלת מול מילון הקובץ השלם `translation` (כאשר `splitKeys: false`)                                 |

## ה-Benchmark

### מה נמדד

מערך הבדיקות [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) בונה **את אותה האפליקציה בדיוק** בכל תצורה: **10 עמודים** (בית, אודות, בלוג, קריירה, צור קשר, שאלות נפוצות, מחירים, מוצרים, הגדרות, צוות), **10 שפות** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), קומפוננטות זהות ותוכן זהה. העמודים נמדדים ב-`en` וב-`fr`.

הספרייה `next-i18next` נבנתה בארבע אסטרטגיות טעינה שונות, החל מייבוא כל קובצי ה-JSON ישירות ל-`resources` (`static`) ועד טעינה עצלה של namespace אחד לכל נתיב דרך backend (`scoped-dynamic`). המתאם נבנה על גבי **אותן קומפוננטות כמו בתצורה הבסיסית**, כאשר רק `next.config.ts`, `intlayer.config.ts` וקובץ ה-provider שונו. אין לו גרסת "scoped" מיוחדת, כיוון שהקומפיילר תוחם את התוכן ברמת הקומפוננטה באופן אוטומטי.

עבור כל build נמדדו המדדים הבאים:

- **גודל ספרייה (Lib size)**: גודל ב-gzip של קומפוננטה ריקה המייבאת רק את ספריית ה-i18n.
- **JS לעמוד (Page JS)**: ממוצע ה-JavaScript ב-gzip המורד בכל עמוד, בממוצע על פני כל העמודים והשפות.
- **זליגת שפות % (Locale leak %)**: אחוז המחרוזות המתורגמות ב-JS השייכות לשפות שהמשתמש **אינו** צופה בהן כעת.
- **זליגת עמודים % (Page leak %)**: אחוז המחרוזות המתורגמות ב-JS השייכות לעמודים שהמשתמש **אינו** נמצא בהם כעת.
- **ממוצע קומפוננטה (Component avg)**: ממוצע הגודל ב-gzip של כל קומפוננטה שקומפלה בנפרד.
- **זמן תגובה E2E (E2E reactivity)**: הזמן שעובר מרגע בחירת שפה חדשה ועד עדכון `html[lang]` ב-DOM (נמדד ב-Playwright, ממוצע של 5 חזרות).
- **משך Hydration**: משך שלב ה-hydration של React.

> הנתונים להלן נמדדו בהרצה מיום **2026-09-12** עם `next-i18next` 16.3.0 (`react-i18next` 17.0.13, `i18next` 26.4.2) ו-`@intlayer/next-i18next` 9.5.1. אפליקציית הבדיקה מכילה כמה עשרות מחרוזות לכל שפה, כך שאחוזי הזליגה מתארים **דפוס מבני**: הם גדלים ככל שהתוכן מתרחב, בעוד שעלות זמן הריצה נשארת קבועה.

### תוצאות ב-Next.js

בחרו את המדדים והספריות שמעניינים אתכם:

<I18nBenchmark framework="nextjs" packages="next-i18next,@intlayer/next-i18next,next-intlayer" vertical/>

| הגדרה                        | אסטרטגיה       | גודל ספרייה (gz) | ממוצע JS לדף (gz) | זליגת שפות | זליגת עמודים | ממוצע קומפוננטה (gz) |   תגובת E2E |   Hydration |
| ---------------------------- | -------------- | ---------------: | ----------------: | ---------: | -----------: | -------------------: | ----------: | ----------: |
| **בסיס** (ללא i18n)          | -              |           0.0 KB |          141.0 KB |       0.0% |         0.0% |               0.9 KB |     13.4 ms |     11.8 ms |
| `next-i18next`               | static         |          19.7 KB |          218.5 KB |       0.0% |        89.8% |              78.5 KB |     16.4 ms |     15.6 ms |
| `next-i18next`               | dynamic        |          19.7 KB |          169.5 KB |      50.0% |        89.8% |              26.1 KB |     15.4 ms |     27.7 ms |
| `next-i18next`               | scoped-static  |          19.7 KB |          220.1 KB |       0.0% |        89.8% |              78.9 KB |     16.4 ms |     14.7 ms |
| `next-i18next`               | scoped-dynamic |          19.7 KB |          163.4 KB |       0.0% |         0.0% |              27.1 KB |     15.9 ms |     15.1 ms |
| **`@intlayer/next-i18next`** | static         |       **9.4 KB** |      **150.7 KB** |   **0.0%** |     **0.0%** |           **9.7 KB** | **10.7 ms** | **11.3 ms** |
| **`@intlayer/next-i18next`** | dynamic        |       **9.4 KB** |      **150.7 KB** |   **0.0%** |     **0.0%** |           **9.7 KB** | **11.9 ms** | **10.6 ms** |
| `next-intlayer` (מקורי)      | static         |           5.5 KB |          141.3 KB |       0.0% |         0.0% |               8.5 KB |     15.5 ms |     16.9 ms |
| `next-intlayer` (מקורי)      | dynamic        |           5.5 KB |          141.3 KB |       0.0% |         0.0% |               6.9 KB |     15.3 ms |     15.9 ms |

**כיצד לנתח את הנתונים**

- **68 KB פחות בכל עמוד ביחס לתצורה הבסיסית.** ייבוא של `resources: { en, fr, ... }` שולח כל שפה וכל namespace בכל עמוד: **218.5 KB**. בניית אותן קומפוננטות עם המתאם מגיעה ל-**150.7 KB**. היא גם עוקפת את התצורה הממוטבת ביותר של `next-i18next` (163.4 KB) ב-12.7 KB, מכיוון שזמן הריצה של `i18next` לבדו שוקל 19.7 KB לעומת 9.4 KB.
- **זליגת התוכן יורדת ל-0% מבלי לערוך קומפוננטות.** כל תצורות `next-i18next` (למעט זו שתוחמת באופן ידני קפדני) מדליפות כ-90% מהמחרוזות מדפים זרים. תצורת `dynamic` מציגה בעיה נוספת: היא אינה מצמצמת את זליגת העמודים וסובלת מ-**50% זליגת שפות**, כיוון שה-backend מושך את כל ה-namespace. המתאם מגיע ל-0% / 0% ישירות מהקוד הפשוט.
- **קומפוננטות קטנות פי 8.** קומפוננטת `useTranslation()` המקומפלת בנפרד שוקלת בממוצע **78.5 KB** כאשר `resources` מוטמעים בה ו-**26-27 KB** עם backend, כיוון ש-`t` קשור ל-store הגלובלי. עם המתאם היא שוקלת בממוצע **9.7 KB** בלבד.
- **Hydration והחלפת שפה מהירים יותר.** זמן ה-hydration יורד מ-15.6 ms ל-**11.3 ms** (ומ-27.7 ms בתצורת `dynamic`, שבה טעינת ה-backend מעכבת את הרינדור הראשוני). החלפת שפה יורדת מ-15-16 ms ל-**11-12 ms**.
- **המתאם אינו זמן הריצה המקורי.** ספריית `next-intlayer` המקורית מגיעה ל-**141.3 KB** (+0.3 KB בלבד מעל אפליקציית הבסיס). המתאם נושא את מעטפת ה-API של `i18next` (דיאלקט האינטרפולציה, סיומות ריבוי והקשר, ניתוח תגיות `<Trans>`) מעל ליבת Intlayer: 9.4 KB ו-+9.4 KB לדף מעל הגרסה המקורית. הוא מהווה את הגשר, לא את נקודת הסיום.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> הטבלה המלאה מופיעה ב[דוח ביצועי Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md).

- [דוח ביצועי Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)

### תוצאות ב-TanStack Start (`react-i18next`)

עבור Vite ו-TanStack Start, ה-benchmark מודד את `react-i18next` הרגילה מול `intlayer`:

| ספרייה              | אסטרטגיה | גודל ספרייה (gz) | ממוצע JS לדף (gz) | זליגת שפות | זליגת עמודים | ממוצע קומפוננטה (gz) |  תגובת E2E | Hydration |
| ------------------- | -------- | ---------------: | ----------------: | ---------: | -----------: | -------------------: | ---------: | --------: |
| **בסיס** (ללא i18n) | -        |           0.0 KB |          111.0 KB |       0.0% |         0.0% |               0.7 KB |     8.1 ms |   21.6 ms |
| `react-i18next`     | dynamic  |          18.4 KB |          136.4 KB |      23.1% |        89.8% |              24.8 KB |   123.1 ms |   32.9 ms |
| **`intlayer`**      | dynamic  |       **5.0 KB** |      **118.6 KB** |   **0.0%** |     **0.0%** |           **6.3 KB** | **3.6 ms** |   14.1 ms |

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> הטבלה המלאה ב[דוח ביצועי TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md).

- [דוח ביצועי TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)

> נתוני הבסיס של `react-i18next` ב-TanStack Start מופיעים במאמר [i18next מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18next_vs_intlayer.md): 127-184 KB לכל עמוד והחלפת שפה של 123-185 ms כאשר ה-backend נטען בעצלות.

- [i18next מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18next_vs_intlayer.md)

## מדוע המספרים משתנים

![קומפיילר Intlayer מחלץ תוכן מקומפוננטות](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

שום דבר בתיקיית `components/` לא השתנה, כך שהחיסכון נובע אך ורק ממה ש-`useTranslation` מקושר אליו.

**עם `i18next`**, הקישור נעשה למופע הגלובלי. כל מה שנטען לתוכו (כל השפות ב-`static`, או כל ה-namespace בשפה הפעילה ב-`dynamic`) נגיש מכל קומפוננטה שקוראת ל-`useTranslation()`. ה-bundler אינו יכול לפצל מעבר למה שהמופע מחזיק, וספריית זמן הריצה אינה יודעת באילו מפתחות הקומפוננטה תשתמש בפועל.

```bash
.
├── next-i18next.config.js
├── public/locales
│   ├── en/translation.json           # מחרוזות של כל העמודים
│   └── fr/translation.json
├── i18n/i18n.ts                      # i18n.use(initReactI18next).init({ resources })
└── components
    ├── AppProviders.tsx              # <I18nextProvider i18n={i18n}>
    └── About.tsx                     # useTranslation(); t("about.title")
```

כל מה שהמופע מחזיק נשלח לכל עמוד, והבזבוז גדל בשני צירים במקביל, עמודים ושפות:

![זליגת תוכן תיאורטית לפי ארכיטקטורה](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

**עם `@intlayer/next-i18next`**, הקישור מתבצע מול המילון עצמו. התוסף `syncJSON` הופך כל קובץ namespace למילון; שלב האופטימיזציה מעביר לקומפוננטה ישירות את המילון שהיא ציינה, כייבוא שה-bundler יכול לעקוב אחריו ולפצל אותו לכל דף ולכל שפה.

```bash
.
├── intlayer.config.ts                # syncJSON({ format: "i18next", source: ... })
├── public/locales
│   ├── en/translation.json           # ללא שינוי, עדיין מקור האמת
│   └── fr/translation.json
├── .intlayer/                        # נוצר אוטומטית: מילון לכל namespace, לכל שפה
└── components
    ├── AppProviders.tsx              # <IntlayerClientProvider locale={locale}>
    └── About.tsx                     # useTranslation(); t("about.title")  ← ללא שינוי
```

הקובץ `i18n/i18n.ts` וייבוא ה-`resources` שלו הופכים לקוד מת שאינו נשלח. משם מגיע החיסכון של 68 KB.

## הגירה בשלושה שלבים

<Steps>
<Step number={1} title="התקנה">

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

הפקודה מזהה את `i18next` / `react-i18next` / `next-i18next`, מתקינה את `intlayer`, את חבילת הפריימוורק המתאימה (`next-intlayer` או `react-intlayer`), את מתאם ה-`@intlayer/*` המתאים ואת `@intlayer/sync-json-plugin`, ומכינה מראש את `intlayer.config.ts`. השאירו את החבילות המקוריות מותקנות: הן peer dependencies ומספקות את הגדרות הטיפוסים.

</Step>
<Step number={2} title="כיוון Intlayer לקובצי השפה שלכם">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "i18next",
  },
  plugins: [
    syncJSON({
      // דיאלקט i18next: {{name}}, $t(key), key_one / key_other, key_male
      format: "i18next",
      // קובץ אחד לכל namespace: `useTranslation("about")` → about.json
      source: ({ locale, key }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

אם ברשותכם קובץ `translation.json` יחיד לכל שפה (ה-namespace ברירת המחדל של i18next), הגדירו `splitKeys: false` כך שהקובץ כולו יישאר מילון אחד וקריאה פשוטה ל-`useTranslation()` תמשיך לפעול כסדרה.

</Step>
<Step number={3} title="הוספת התוסף">

<Tabs>
<Tab label="Next.js">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { withI18next } from "@intlayer/next-i18next/plugin";

const nextConfig: NextConfig = {};

export default withI18next(nextConfig);
```

ב-App Router, קומפוננטות לקוח מקבלות את השפה ממקטע `[locale]`. ה-`I18nextProvider` של המתאם אינו מקבל שפה כ-prop, לכן החליפו אותו פעם אחת בקובץ ה-provider שלכם:

```tsx fileName="components/AppProviders.tsx"
"use client";

import { IntlayerClientProvider } from "next-intlayer";
import type { LocalesValues } from "intlayer";

export const AppProviders = ({
  locale,
  children,
}: {
  locale: LocalesValues;
  children: React.ReactNode;
}) => (
  <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
);
```

כל קומפוננטה מתחתיו ממשיכה לקרוא ל-`useTranslation()` כרגיל.

</Tab>
<Tab label="Vite / TanStack Start">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

הפונקציה `reactI18nextVitePlugin()` עוטפת את `vite-intlayer` ומגדירה aliases עבור `react-i18next` ו-`i18next`. עבור פרויקטים שאינם React, הפונקציה `i18nextVitePlugin()` מתוך `@intlayer/i18next/plugin` מגדירה alias עבור `i18next` לבדו.

</Tab>
</Tabs>

</Step>
</Steps>

### מה ניתן למחוק לאחר מכן

| קובץ / תבנית                                           | סיבה                                                               |
| ------------------------------------------------------ | ------------------------------------------------------------------ |
| `resources: { en, fr, ... }` וייבויי ה-JSON            | מתעלמים מהם במתאם. כאן הסתתרו ה-68 KB                              |
| `i18next-http-backend`, `i18next-resources-to-backend` | אין שום דבר לשלוף בזמן ריצה                                        |
| `i18next-browser-languagedetector`                     | זיהוי שפה מנוהל על ידי ניתוב Intlayer (קידומת URL, עוגייה, header) |
| `serverSideTranslations()` ב-`getStaticProps`          | מחזיר מבנה ריק; אינו מזיק, אך מיותר                                |
| `next-i18next.config.js`                               | אינו נקרא. השפות מוגדרות ב-`intlayer.config.ts`                    |
| רשימות `ns: [...]` לכל עמוד                            | הקומפיילר מזהה ושולף namespaces ברמת הקומפוננטה                    |

### מה מרוויחים מעבר להקטנת הנפח

- **מפתחות מוקלדים (Typed keys).** הקריאה `useTranslation("about")` מוקלדת מול מילון `about` המקומפל; קריאה ל-`t("does.not.exist")` מייצרת שגיאת TypeScript במקום להחזיר את שם המפתח.
- **`npx intlayer test`** מכשיל את ה-CI אם חסר מפתח בשפה כלשהי. הפקודה **`npx intlayer fill`** מתרגמת את המפתחות החסרים בעזרת מפתח ה-API שלכם (OpenAI, Anthropic, Mistral, Gemini...) וכותבת אותם ישירות אל `locales/{lng}/{ns}.json`.
- **העורך הויזואלי וה-CMS** פועלים על אותם קובצי JSON, כך שעורכים יכולים לעדכן תרגומים בממשק ויזואלי והקבצים מתעדכנים.
- **מעבר הדרגתי ל-`.content.ts`.** כל קומפוננטה יכולה לעבור מ-`useTranslation("about")` ל-`useIntlayer("about")` עם קובץ תוכן צמוד. קובצי JSON ומילוני `.content.ts` מתקיימים זה לצד זה ללא בעיה.

## מגבלות שכדאי להכיר

<AccordionGroup>
<Accordion header="תוספי Backends וגלאים אינם פעילים">

הקריאה `i18n.use(HttpBackend)` מפעילה את פונקציית ה-`init` של התוסף ותו לא. אם האפליקציה שלכם הסתמכה על משיכת תרגומים מ-CMS בזמן ריצה לפי בקשה, זרימה זו אינה נתמכת; השתמשו ב-[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) או בפקודות `intlayer pull` / `push` במקום זאת. זיהוי שפה מנוהל דרך הגדרות הניתוב של Intlayer (קידומת URL, עוגייה, header).

- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
<Accordion header="המאפיין resources מוזנח, לא ממוזג">

בשונה ממתאמים אחרים, `@intlayer/i18next` אינו משתמש ב-`resources` מוטמע כ-fallback. כל מפתח חייב להתקיים במילונים המסונכרנים, דבר ש-`intlayer test` מאמת.

</Accordion>
<Accordion header="ב-App Router נדרש עדכון של ה-Provider">

קובץ אחד בלבד, כפי שהודגם לעיל. ב-Pages Router עם `appWithTranslation` אין צורך בשום שינוי.

</Accordion>
<Accordion header="הקובץ next-i18next.config.js אינו נקרא">

מאפיינים כמו `localePath`, `fallbackLng`, `reloadOnPrerender` אינם רלוונטיים; הגדרות השפות וה-fallback מגיעות מ-`intlayer.config.ts`.

</Accordion>
<Accordion header="המתאם אינו חינמי לחלוטין">

הוא מוסיף 9.4 KB של זמן ריצה ו-+9.4 KB לכל עמוד בהשוואה ל-`next-intlayer` המקורית. ברגע שכל הקומפוננטות עברו ל-`useIntlayer`, ניתן להסירו.

</Accordion>
</AccordionGroup>

## השוואת תכונות

מעבר לגודל בבייטים, מה שכל אפשרות מעניקה לכם:

| תכונה                                         | `i18next` / `react-i18next` / `next-i18next` | מתאמי `@intlayer/*`              | Intlayer מקורי                    |
| --------------------------------------------- | -------------------------------------------- | -------------------------------- | --------------------------------- |
| **קריאות `t()`, `useTranslation`, `<Trans>`** | ✅                                           | ✅ ללא שינוי                     | ❌ מעבר ל-`useIntlayer`           |
| **גודל זמן ריצה (gzip, Next.js)**             | 19.7 KB                                      | 9.4 KB                           | 5.5 KB                            |
| **זליגת עמודים ללא ניהול namespaces ידני**    | ~90%                                         | 0%                               | 0%                                |
| **מפתחות מוקלדים**                            | ⚠️ הצהרה ידנית                               | ✅ ממילונים מקומפלים             | ✅ נוצרים אוטומטית                |
| **תוספי Runtime backends וגלאים**             | ✅ אקוסיסטם מלא                              | ❌ מושבתים                       | ❌ אינו רלוונטי, שימוש ב-CMS      |
| **תוכן ממוקם לצד קומפוננטות**                 | ❌ JSON מרוכז                                | ⚠️ שילוב של JSON ו-`.content.ts` | ✅ `.content.ts` לצד כל קומפוננטה |
| **בדיקת תרגומים חסרים ב-CI**                  | ⚠️ אינו מובנה                                | ✅ `npx intlayer test`           | ✅ `npx intlayer test`            |
| **תרגום באמצעות בינה מלאכותית (AI)**          | ❌ ללא                                       | ✅ `npx intlayer fill`           | ✅ `npx intlayer fill`            |
| **עורך ויזואלי / CMS**                        | ❌ דרך פלטפורמות חיצוניות                    | ✅ פועל על אותו ה-JSON           | ✅ כן                             |
| **אקוסיסטם / קהילה**                          | ✅ גדולה מאוד                                | ⚠️ קטנה יותר, צומחת במהירות      | ⚠️ קטנה יותר, צומחת במהירות       |

> גודלי זמן הריצה נלקחו מתוך הרצת Next.js שתוארה לעיל.

## מתי להשתמש בכל אפשרות?

<AccordionGroup>
<Accordion header="להישאר עם i18next">

האפליקציה שלכם תלויה ב-backends בזמן ריצה (תרגומים המוגשים מ-CMS לפי בקשה בזמן אמת), באקוסיסטם התוספים הייחודי, או בפלטפורמה שאינה React שאינה נתמכת על ידי המתאמים.

</Accordion>
<Accordion header="להשתמש ב-@intlayer/*">

אתם עובדים עם `react-i18next` / `next-i18next` ורוצים לחסוך 68 KB, להקטין קומפוננטות פי 8, לקבל 0% זליגת תוכן, מפתחות מוקלדים ובדיקות CI מבלי לשכתב את הקוד. זוהי נקודת הכניסה האידיאלית לבסיס קוד קיים של `i18next`.

</Accordion>
<Accordion header="מעבר מלא ל-Intlayer מקורי (next-intlayer / react-intlayer)">

עבור פרויקטים חדשים, או לאחר שהמתאם השלים את מטרתו. זוהי האפשרות הקלה ביותר (5.5 KB, +0.3 KB לדף מעל אפליקציית הבסיס) והיא מאפשרת שימוש בקומפוננטות שרת סינכרוניות ובקובצי `.content.ts` מקומיים לכל קומפוננטה. התחילו עם [Intlayer עם Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md) או [עם Vite ו-React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+react.md).

- [Intlayer עם Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)
- [עם Vite ו-React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+react.md)

</Accordion>
</AccordionGroup>

## שאלות נפוצות

<FAQ>

<Question title="מאיפה מגיע החיסכון של 68 KB?">

מתוך `resources: { en, fr, ... }`. התצורה הבסיסית של `next-i18next` מייבאת את קובצי ה-JSON של כל השפות לתוך `init()`, כך שכל דף נושא את כל ה-namespaces בכל השפות: **218.5 KB** לדף. המתאם אינו כולל בלוק זה ב-bundle; הוא מגיש לכל קומפוננטה אך ורק את המילון הספציפי שהיא צריכה, בשפה הפעילה בלבד.

</Question>

<Question title="האם קומפוננטות <Trans> ממשיכות לעבוד כרגיל?">

כן, כולל `components`, תגיות ממוספרות כגון `<1>...</1>` ו-`values`. כנ"ל לגבי `{{interpolation}}`, קינון `$t(key)`, צורות ריבוי `key_one` / `key_other` (המוערכות באמצעות `Intl.PluralRules`), סיומות הקשר ו-`returnObjects`.

</Question>

<Question title="מה אם אני משתמש בקובץ translation.json יחיד לכל שפה?">

הגדירו `splitKeys: false` בתוסף `syncJSON`. הקובץ כולו יישאר מילון יחיד וקריאה פשוטה ל-`useTranslation()` תמשיך להיפתר מתוכו.

</Question>

<Question title="האם זה זהה להגירה מלאה ל-Intlayer?">

לא, זהו גשר מעבר. המתאם שומר על ה-API של `i18next` ועולה 9.4 KB של זמן ריצה; ספריית `next-intlayer` המקורית שוקלת 5.5 KB ומוסיפה קומפוננטות שרת סינכרוניות וקובצי `.content.ts` מקומיים. תוכלו להעביר קומפוננטות בהדרגה, כיוון שמילוני JSON ו-`.content.ts` מתקיימים במקביל.

</Question>

<Question title="האם מתרגמים יכולים להמשיך לעבוד באותו אופן?">

כן. הקבצים `locales/{lng}/{ns}.json` נשארים מקור האמת: `syncJSON` קורא אותם לפי דיאלקט i18next וכותב תרגומים בחזרה כאשר ה-CLI או ה-CMS מעדכנים אותם.

</Question>

</FAQ>

## השוואות קשורות

סדרת מתאמי התאימות:

- [next-intl מול @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-intl_vs_intlayer-next-intl.md)
- [Lingui מול @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/lingui_vs_intlayer-lingui.md)
- [vue-i18n מול @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/vue-i18n_vs_intlayer-vue-i18n.md)

השוואת ספריות ראש בראש:

- [i18next מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18next_vs_intlayer.md)
- [next-i18next מול next-intl מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next מול react-intl מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/react-i18next_vs_react-intl_vs_intlayer.md)
- [האם i18next מיושנת?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/is_i18next_outdated.md)

תיעוד רלוונטי:

- [אופטימיזציה של Bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)
- [קומפיילר Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)
- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)
- [תרגום בבינה מלאכותית (AI)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/autoFill.md)

מתאמי תאימות:

- [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/i18next.md)
- [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/react-i18next.md)
- [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/next-i18next.md)

מדריכי הגירה:

- [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md)
- [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_react-i18next_to_intlayer.md)
- [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_next-i18next_to_intlayer.md)

דוחות ביצועים (Benchmarks):

- [סקירת ביצועי i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)
- [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)
- [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/vue.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/solid.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/svelte.md)

> כדי להבין מהיכן הגיעו ספריות אלו, קראו על ההיסטוריה של בינאום ב-JavaScript.

- [ההיסטוריה של בינאום ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md)

## סיכום

`i18next` היא ספריית זמן הריצה הכבדה ביותר במבחן ביצועים זה, והמתאמים מסירים את רוב התקורה הזו מבלי לדרוש מכם לעזוב את ה-API שלה. באותה אפליקציית Next.js מושג חיסכון של **68 KB פחות בכל עמוד** לעומת התצורה הפשוטה, **12.7 KB פחות** מהתצורה הממוטבת ביותר ידנית, **קומפוננטות קטנות פי 8**, **0% זליגת תוכן** וקיצור של **4 ms בזמן ה-hydration**, וכל זאת תמורת קובץ קונפיגורציה, שורת תוסף ועדכון של קובץ provider בודד. תוספי backends וגלאים מנוטרלים בצורה בטוחה, `resources` מוזנח לטובת מילונים מקומפלים, וספריית `next-intlayer` המקורית נותרת קלה יותר ב-9 KB נוספים.

כל הנתונים הגולמיים, אפליקציות הבדיקה והסקריפטים זמינים ב-[מאגר Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). הריצו אותם בעצמכם.

עיינו ב[מסמך 'מדוע לבחור ב-Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md) לפרטים נוספים.

- [מדוע לבחור ב-Intlayer? יתרונות על פני ספריות i18n אחרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)
