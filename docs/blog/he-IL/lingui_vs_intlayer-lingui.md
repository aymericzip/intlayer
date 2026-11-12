---
createdAt: 2026-09-13
updatedAt: 2026-11-03
priority: 8
title: "Lingui מול @intlayer/lingui: אותם מאקרואים, זמן ריצה שונה"
description: "יישום React שומר על מאקרואי Lingui שלו, המוגשים באמצעות מתאם @intlayer/lingui. מדידת גודל קומפוננטה, הידרציה (hydration), דליפות ו-JavaScript לכל דף."
keywords:
  - Lingui
  - "@intlayer/lingui"
  - Intlayer
  - מתאם תאימות
  - הגירה
  - בינאום
  - i18n
  - Benchmark
  - גודל bundle
  - בלוג
  - React
  - TanStack Start
  - Vite
slugs:
  - blog
  - lingui-vs-intlayer-lingui
author: aymericzip
---

# Lingui מול @intlayer/lingui: אותם מאקרואים, זמן ריצה שונה

`@intlayer/lingui` הוא מתאם תאימות (compat adapter) עבור `@lingui/core` ו-`@lingui/react`. קריאות ה-`` t`...` ``, ה-`<Trans>`, ה-`useLingui()` וה-`i18n._()` שלכם נשארות בדיוק כפי שהן; המאקרואים ממשיכים להתקמפל; מה שמשתנה הוא המקור שממנו מגיעות ההודעות בזמן ריצה. במקום קטלוג מקומפל יחיד לכל שפה, כל מוקד קריאה בקוד (call site) מקושר למילון Intlayer שקומפל במיוחד עבורו.

מאמר זה בוחן את השינוי הזה על אותו יישום TanStack Start, שנבנה פעם אחת עם Lingui ופעם שנייה עם המתאם. הנתונים מגיעים מ-[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). להשוואה בין שתי הספריות כספריות עצמאיות, קראו את [Lingui מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/lingui_vs_intlayer.md). מאמר זה עוסק במה שהמתאם משנה, והיכן הוא אינו מסייע.

- [Lingui מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/lingui_vs_intlayer.md)

<TOC/>

> **תקציר (tl;dr)**: באותו יישום TanStack Start, המתאם `@intlayer/lingui` קיצץ את גודל הקומפוננטה הממוצע מ-**85.5 KB ל-12.8 KB** ב-gzip, קיצר את משך ההידרציה (hydration) מ-**28 ms ל-19.7 ms**, והאיץ את החלפת השפה מ-**5.9 ms ל-2.9 ms**, מבלי לגעת במאקרואים כלל. בהגדרה הפשוטה והנאיבית (שבה כל הקטלוגים נטענים מראש) הוא ביטל גם **90% דליפת דפים** וחסך 12 KB לכל דף. לעומת זאת, בהגדרה של טעינה עצלה (lazy loading) הוא מעביר **137 KB לדף לעומת 115 KB** ב-Lingui המקורית: המתאם מפענח ICU בזמן ריצה בעוד ש-Lingui מספקת מערכי טוקנים מקומפלים מראש. דליפת שפת המקור (~9-10%) זהה בשני הצדדים, משום שהיא נובעת מברירת המחדל `message` המוטמעת בתוך הקומפוננטות ולא מזמן הריצה. המתאם הוא תוסף Vite ונמדד על TanStack Start.

## מהו בעצם `@intlayer/lingui`

Lingui היא שילוב של קומפיילר וזמן ריצה (runtime). מאקרואים בקוד המקור שלכם מחולצים לקטלוג `.po` (או JSON) לכל שפה, מתקמפלים למודול JS לכל שפה, ונטענים לתוך מופע `I18n` גלובלי באמצעות `i18n.load()` + `i18n.activate()`. כל קריאה ל-`useLingui()` נרשמת למופע זה; כל קריאת `_()` מחפשת את המזהה שלה בתוך הקטלוג הפעיל.

`@intlayer/lingui` שומרת על המאקרואים ועל ה-API ומחליפה את מנגנון אחזור הקטלוג:

1. **כינויי ייבוא (Import aliasing):** התוסף `lingui()` מתוך `@intlayer/lingui/plugin` עוטף את `vite-intlayer` ומוסיף רשומות ב-`resolve.alias` כך ש-`@lingui/core` ו-`@lingui/react` מנותבים ל-`@intlayer/lingui`. הייבואים שלכם אינם משתנים.
2. **קטלוגים כמקור האמת:** תוסף `syncJSON` (או `syncPO` עבור קובצי `.po`) קורא את הקטלוגים הקיימים שלכם והופך אותם למילוני Intlayer, תוך כתיבת תרגומים בחזרה אליהם כאשר ה-CLI או ה-CMS מעדכנים אותם. באמצעות `splitKeys: "key-prefix"`, קטלוג שטוח של מזהים עם נקודות (`footer.github`, `hero.title`) הופך למילון קטן נפרד לכל קידומת במקום קובץ יחיד של 244 KB.
3. **קישור ברמת מוקד הקריאה (Call-site binding):** שלב האופטימיזציה של Intlayer אוסף את המזהים המועברים לפונקציות `_`, `t` ו-`<Trans>` בכל קובץ, ומעביר את המילונים התואמים לקומפוננטה. `<Trans id="hero.title">` נקשר בעצמו; `useLingui()` נקשר לכל קידומת המשמשת בקובץ. מזהים ללא נקודה (מזהים מוצפנים ב-hash, ‏`mockBanner`) מנותבים חזרה למילון `messages` הבודד של Lingui.

```tsx fileName="src/components/Hero.tsx"
// הקוד שלכם, ללא שינוי
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";

const Hero = () => {
  const { _ } = useLingui();
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle">Every byte counts</Trans>
    </section>
  );
};
```

```tsx fileName="מה שהקומפיילר מפיק (בגרסה מופשטת)"
import _dicHash_hero from "../.intlayer/dictionaries/hero.mjs";
import {
  useDictionary as useLingui,
  TransDictionary as Trans,
} from "@intlayer/lingui";

const Hero = () => {
  const { _ } = useLingui(_dicHash_hero);
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle" dictionary={_dicHash_hero}>
        Every byte counts
      </Trans>
    </section>
  );
};
```

הקומפוננטה אינה ניגשת עוד למופע הגלובלי ולקטלוג המלא שמאחוריו. היא ניגשת אך ורק ל-`hero`. זו הסיבה המרכזית לכך שעמודת גודל הקומפוננטה להלן צונחת פי 7.

## מה המתאם שומר, ממה הוא מתעלם ומה אינו מוחלף

| ה-API של Lingui                                            | עם `@intlayer/lingui`                                                                                      |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| מאקרואי `` t`...` ``, `msg`, `plural`, `select`, `<Trans>` | ✅ נשמרים. השאירו את `@lingui/babel-plugin-lingui-macro` או `@lingui/swc-plugin` בבנייה, לפני שלב Intlayer |
| `useLingui()` → `{ i18n, _, t }`                           | ✅ נשמר. עובד גם מחוץ ל-provider (השפה נגזרת מ-`react-intlayer`)                                           |
| `i18n._(id, values)`, `i18n.t()`                           | ✅ נשמר. מזהים מפורשים ומזהי hash מפוענחים שניהם                                                           |
| צורות רבים ב-ICU, ‏`select`, ‏`selectordinal`, ‏`#`        | ✅ נשמרים, באמצעות מפענח ה-ICU של Intlayer                                                                 |
| `i18n.date()`, `i18n.number()`, `formats`                  | ✅ נשמרים, מגובים ב-`Intl` המקורי                                                                          |
| `I18nProvider`                                             | ✅ נשמר. עוטף `IntlayerProvider`; מאזין ל-`i18n.on("change")` כך ש-`activate()` עדיין מפעיל רינדור מחדש    |
| `i18n.activate(locale)`                                    | ✅ נשמר                                                                                                    |
| `i18n.load(locale, messages)` / `loadAndActivate()`        | ⚠️ מתקבל כ-**ברירת מחדל בזמן ריצה**. מילונים מקומפלים קודמים; אזהרת פיתוח מציעה להסיר את הייבוא            |
| `setupI18n({ messages, missing })`                         | ⚠️ ‏`messages` ממוזגים כברירת מחדל בזמן ריצה; מ-`missing` מתעלמים                                          |
| `lingui extract` / `lingui compile`                        | ✅ עדיין זרימת העבודה שלכם. כוונו את `syncPO` / `syncJSON` אל הקטלוגים שחולצו                              |
| `defaultComponent` ב-`I18nProvider`                        | ⚠️ נשמר ב-context, אך אינו מוחל בעת רינדור                                                                 |
| Next.js                                                    | ❌ התוסף עוטף את `vite-intlayer`. מיועד ל-Vite, TanStack Start ו-React Router בלבד                         |

## מבחן הביצועים (Benchmark)

### מה נבדק

חבילת [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) בונה **את אותו יישום בדיוק** בכל הגדרה: **10 דפים** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 שפות** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), קומפוננטות זהות ותוכן זהה. הדפים נמדדים בשפות `en` ו-`fr`.

Lingui נבנתה בארבע אסטרטגיות טעינה שונות, החל מייבוא מראש של כל הקטלוגים המקומפלים (`static`) ועד לקטלוג יחיד לנתיב בטעינה עצלה (`scoped-dynamic`). המתאם נבנה על **אותן קומפוננטות בדיוק**, כאשר שונו רק `vite.config.ts` ו-`intlayer.config.ts`. שורת ה-`static` שלו כוללת את כל השפות בחבילה; שורת ה-`dynamic` שלו (`importMode: 'dynamic'`) טוענת את השפה הפעילה לפי דרישה. אין גרסת "scoped" ייעודית, משום ששלב האופטימיזציה תוחם ומבודד את הסקופ לכל מוקד קריאה באופן אוטומטי.

לכל בנייה, חבילת הבדיקות מודדת:

- **גודל ספרייה (Lib size)**: משקל ב-gzip של קומפוננטה ריקה שמייבאת רק את ספריית ה-i18n.
- **ממוצע JS לדף (Page JS)**: משקל JavaScript ב-gzip המורד לכל דף, בממוצע על פני כל הדפים והשפות.
- **אחוז דליפת שפה (Locale leak %)**: חלקן של מחרוזות מתורגמות ב-JS שהורד השייכות לשפה שהמשתמש **אינו** צופה בה.
- **אחוז דליפת דפים (Page leak %)**: חלקן של מחרוזות מתורגמות ב-JS שהורד השייכות לדף שהמשתמש **אינו** נמצא בו.
- **ממוצע לקומפוננטה (Component avg)**: משקל ממוצע ב-gzip של כל קומפוננטה כשהיא מקומפלת בבידוד.
- **תגובתיות מקצה לקצה (E2E reactivity)**: זמן שעון בין בחירת שפה חדשה לעדכון של `html[lang]` ב-DOM (נבדק עם Playwright, ממוצע של 5 חזרות).
- **הידרציה (Hydration)**: משך שלב ההידרציה ב-React.

> הנתונים להלן מגיעים מהרצה מיום **12 בספטמבר 2026** עם `@lingui/react` 6.6.0 ו-`@intlayer/lingui` 9.5.1. יישום הבדיקה קטן במכוון (עשרות בודדות של מחרוזות לכל שפה), ולכן אחוזי הדליפה מתארים **דפוס עקרוני**: הם צומחים ככל שהתוכן גדל, בעוד שעלות זמן הריצה נשארת קבועה.

### תוצאות ב-TanStack Start

| הגדרה                  | אסטרטגיה       | גודל ספרייה (gz) | ממוצע JS לדף (gz) | דליפת שפה | דליפת דפים | ממוצע לקומפוננטה (gz) | תגובתיות E2E |     הידרציה |
| ---------------------- | -------------- | ---------------: | ----------------: | --------: | ---------: | --------------------: | -----------: | ----------: |
| **בסיס** (ללא i18n)    | -              |           0.0 KB |          111.0 KB |      0.0% |       0.0% |                0.7 KB |       8.1 ms |     21.6 ms |
| Lingui                 | static         |          11.2 KB |          152.2 KB |     50.0% |      90.0% |               58.0 KB |       3.9 ms |     19.9 ms |
| Lingui                 | dynamic        |          11.2 KB |      **115.2 KB** |      9.3% |       0.0% |               85.5 KB |       5.9 ms |     28.0 ms |
| Lingui                 | scoped-static  |          11.2 KB |          120.8 KB |      4.0% |       0.0% |              147.9 KB |       7.1 ms |     33.9 ms |
| Lingui                 | scoped-dynamic |          11.2 KB |          120.2 KB |      8.6% |       0.0% |               83.7 KB |      42.1 ms |     32.9 ms |
| **`@intlayer/lingui`** | static         |      **10.3 KB** |          140.5 KB |     50.0% |   **0.0%** |           **14.9 KB** |   **3.3 ms** | **11.3 ms** |
| **`@intlayer/lingui`** | dynamic        |      **10.3 KB** |          137.0 KB |      9.9% |   **0.0%** |           **12.8 KB** |   **2.9 ms** | **19.7 ms** |
| `intlayer` (טבעי)      | static         |           5.0 KB |          125.8 KB |     50.0% |       0.0% |                8.1 KB |       3.2 ms |     11.5 ms |
| `intlayer` (טבעי)      | dynamic        |           5.0 KB |          118.6 KB |      0.0% |       0.0% |                6.3 KB |       3.6 ms |     14.1 ms |

**כיצד לקרוא את הנתונים**

- **קומפוננטות: קטנות פי 7.** זהו האפקט המרכזי של המתאם. קומפוננטת Lingui המקומפלת בבידוד שוקלת בממוצע **58-148 KB** בהתאם לאסטרטגיה, משום ש-`useLingui()` פונה למופע הגלובלי ולכל קטלוג שנטען אליו. אותה קומפוננטה עם המתאם שוקלת בממוצע **12.8-14.9 KB**: היא ניגשת רק למילונים שלה ולמפענח ה-ICU, ולא לשום דבר אחר.
- **הידרציה: מהירה יותר ב-8-14 ms.** הפעולות `i18n.load()` + `i18n.activate()` רצות בצד הלקוח לפני ש-React יכולה לבצע הידרציה; ככל שמערך ה-Lingui עושה יותר שימוש בטעינה עצלה, כך זה לוקח זמן רב יותר (28-34 ms). עם המתאם, המילונים מגיעים כייבואים רגילים שה-bundler כבר הטמיע בתוך ה-chunk של הדף: **11.3 ms** ב-`static`, ו-**19.7 ms** ב-`dynamic`.
- **החלפת שפה: מהירה פי 2, וללא השהיות חריגות.** מערך ה-`scoped-dynamic` של Lingui דורש **42 ms** לעדכון `html[lang]`, מפני שקטלוג הנתיב נדרש לרדת ברשת, להיטען ולהיות מופעל לפני שהשינוי מוצג. המתאם שומר על מהירות של **2.9-3.3 ms** בשני המצבים.
- **תיקון אוטומטי של המערך הנאיבי.** שימוש סטטי ב-Lingui שולח כל קטלוג לכל דף: 152.2 KB, עם 90% דליפת דפים. שימוש סטטי במתאם: 140.5 KB, עם 0% דליפת דפים, עבור אותן קומפוננטות בדיוק.
- **משקל לדף: Lingui מנצחת ב-`dynamic` ב-22 KB.** זהו נתון שיש להציג בכנות. Lingui מקמפלת הודעות למערכי טוקנים בזמן build ושולחת זמן ריצה של 11 KB שרק קורא אותם. המתאם שולח את מפענח ה-ICU של Intlayer (כ-15 KB יותר של `@intlayer/core` לעומת הבנייה הטבעית), את שכבת המתאם (~10 KB) ואת `react-intlayer` (~6 KB). ביישום זה, מדובר ב-**137.0 KB לעומת 115.2 KB**. אם משקל הבתים לדף הוא השיקול היחיד שלכם וכבר יישמתם טעינה עצלה ב-Lingui, המתאם לא יעזור לכם בנקודה זו.
- **דליפת שפה זהה בשני הצדדים.** 9.3% עבור Lingui, ו-9.9% עבור המתאם במצב `dynamic`. המקור הוא בקומפוננטות עצמן: `i18n._({ id: "careers-benefits.pay", message: "Top-of-market compensation" })` נושאת את טקסט המקור באנגלית כברירת מחדל, וכך גם פלט המאקרו אלא אם כן שדה ה-message מוסר. אנגלית זו מגיעה ל-chunk של `fr` ללא תלות בספרייה שמגישה את התרגום. לעומת זאת, `intlayer` הטבעית (בקובצי `.content.ts`, ללא מקור מוטבע) עומדת על 0%.

## מדוע המספרים משתנים, ומדוע חלקם לא

שני גורמים קובעים את העמודות הללו: **למה הקומפוננטה קשורה**, ו**באיזה פורמט ההודעות מועברות**.

**קישור (Binding):** ב-Lingui, יחידת הבסיס היא השפה (locale). הקובץ `messages.mjs` עבור `fr` הוא מודול יחיד; כל קומפוננטה שמייבאת את המופע שטען אותו מקבלת גישה לכולו, ולכן ה-bundler אינו יכול לפצל מתחת לרמת השפה. עם המתאם, יחידת הבסיס היא מוקד הקריאה: `hero` ו-`footer` הם ייבואים נפרדים, המפוצלים ונטענים בעצלות לכל קומפוננטה. זהו כל ההסבר לגודל הקומפוננטה, להידרציה ולדליפת הדפים.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en/messages.mjs              # lingui compile output, אחד לכל שפה
    │   └── fr/messages.mjs
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")
```

```bash
.
├── intlayer.config.ts                   # syncJSON({ splitKeys: "key-prefix" })
├── .intlayer/                           # נוצר אוטומטית: מילון אחד לכל קידומת מזהה, לכל שפה
└── src
    ├── locales
    │   ├── en/messages.json             # ללא שינוי, עדיין מקור האמת
    │   └── fr/messages.json
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")  ← ללא שינוי
```

**פורמט (Format):** שלב הקימפול של Lingui הופך ביטוי כמו `{count, plural, one {# item} other {# items}}` למערך טוקנים; זמן הריצה לעולם אינו מנתח תחביר ICU. המתאם שומר את ההודעה כטקסט ומפענח אותה באמצעות מפענח ה-ICU של Intlayer. זהו משקל קבוע של כ-15 KB שאתם משלמים פעם אחת לדף, והסיבה לכך ששורת ה-`dynamic` מפסידה בבתים בעוד שהיא מנצחת בכל שאר המדדים. Intlayer הטבעית נמנעת מכך משום שמילוני `.content.ts` משתמשים בצמתי `enu()` / `insert()` שהקומפיילר פותר מבעוד מועד.

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

הפקודה מזהה את Lingui, קוראת את `lingui.config.ts` כדי לבחור בין `syncPO` (עבור קטלוגי `.po`) או `syncJSON` (עבור קטלוגי JSON), מתקינה את `intlayer`, `react-intlayer`, `@intlayer/lingui` ואת תוסף הסנכרון התואם, ומחליפה את `@lingui/vite-plugin` בתוסף המתאם ב-`vite.config.ts` אם אתם משתמשים בו. השאירו את `@lingui/core`, `@lingui/react` ותוסף המאקרו מותקנים: המאקרואים ממשיכים להתקמפל, והמתאם משתמש בטיפוסים של Lingui.

</Step>
<Step number={2} title="כיוון Intlayer אל הקטלוגים שלכם">

עבור קטלוגי JSON ‏(`format: "minimal"` ב-`lingui.config.ts`):

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
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./src/locales/${locale}/${key}.json`,
      // קיבוץ מזהים עם נקודות לפי המקטע הראשון: `footer.github` ← מילון `footer`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

עבור קטלוגי `.po`, החליפו את `syncJSON` ב-`syncPO` מתוך `@intlayer/sync-po-plugin` עם אותה תבנית `source` וסיומת `.po`. ראו את [תיעוד תוסף Sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md).

- [תיעוד תוסף Sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md)

ההגדרה `splitKeys: "key-prefix"` היא הגורם לירידה הדרמטית בגודל הקומפוננטה. קובץ הקטלוג שומר על מבנהו השטוח; הפיצול קיים אך ורק במילונים שנוצרו, ופעולת הכתיבה בחזרה מאחדת מחדש את המזהים.

</Step>
<Step number={3} title="הוספת התוסף">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact({
      // השאירו את תוסף המאקרו; הוא חייב לרוץ לפני שלב Intlayer
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

התוסף `lingui()` עוטף את `vite-intlayer` (מעקב תוכן, קימפול מילונים, שלב האופטימיזציה) ומפנה כינויים של `@lingui/core` ו-`@lingui/react` אל המתאם. בצעו build, והתוצאות שלעיל שלכם.

</Step>
</Steps>

### מה ניתן למחוק לאחר מכן

| קובץ / דפוס                                          | סיבה                                                                                    |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `await import(\`./locales/${locale}/messages.mjs\`)` | המילונים מיובאים ישירות על ידי הקומפוננטות המשתמשות בהם. `i18n.load()` הופך לגיבוי בלבד |
| `i18n.load()` / `i18n.loadAndActivate()`             | השאירו את `i18n.activate(locale)`; מחקו את טעינת הקטלוגים                               |
| `lingui compile` בסקריפט הבנייה                      | רק אם עברתם ל-JSON / `.po` כמקור ואתם כבר לא מייבאים מודולים מקומפלים                   |

### מה מרוויחים מעבר לחיסכון בבתים

- **זיהוי תרגומים חסרים:** הפקודה `npx intlayer test` מכשילה את ה-CI כאשר בשפה מסוימת חסר מזהה; `lingui extract` רק מדווחת על סטטיסטיקות.
- **`npx intlayer fill`** מתרגמת את הרשומות החסרות עם הספק לבחירתכם (OpenAI, Anthropic, Mistral, Gemini...) וכותבת אותן בחזרה לקטלוג שלכם.
- **העורך החזותי וה-CMS** פועלים על אותם מילונים, כך שניתן לערוך קובצי `.po` / JSON דרך ממשק משתמש על ידי אנשים שאינם מפתחים.
- **מעבר הדרגתי ל-`.content.ts`:** קומפוננטה יכולה לעבור מ-`useLingui()` ל-`useIntlayer("hero")` עם קובץ תוכן צמוד מתי שתרצו. שני סוגי המילונים מתקיימים יחד ומתמזגים.

## מגבלות שיש להכיר לפני שמתחילים

- **עלות הדפים במצב `dynamic`:** כפי שהוסבר לעיל, צפו לתוספת של כ-20 KB לדף לעומת מערך Lingui בטעינה עצלה ביישום קטן. הפער אינו גדל עם התוכן (זהו המפענח, לא הקטלוגים), אך הוא גם אינו קטן.
- **דליפת שפת המקור נשארת:** תיאורי הודעות ופלט מאקרו מטמיעים את מקור האנגלית כברירת מחדל. אם זה מפריע לכם, הפתרון הוא הסרת שדה ה-`message` או העברת הקומפוננטה ל-`.content.ts`, ולא המתאם.
- **`i18n.load()` הוא גיבוי, לא הנתיב הראשי:** אם תמשיכו לייבא קטלוגים מקומפלים ולקרוא ל-`load()`, תקבלו גם את ה-bundle הישן וגם את החדש. הסירו את הייבואים הישנים.
- **Vite בלבד:** אין תוסף Next.js עבור `@intlayer/lingui`. פרויקטי Next.js המשתמשים ב-Lingui צריכים לבחון מעבר ישיר ל-[`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md).
- **`defaultComponent` אינו מוחל:** אם אתם מסתמכים עליו כדי לעטוף כל `<Trans>`, הוסיפו את המעטפת באופן מפורש.

## מתי להשתמש בכל אפשרות?

- **הישארו עם Lingui** אם אתם כבר מריצים את הגדרת `scoped-dynamic`, התקציב שלכם הוא משקל הבתים לדף, והחלפת שפה של 42 ms והידרציה של 30 ms מקובלות ביישום שלכם.
- **השתמשו ב-`@intlayer/lingui`** אם אתם משתמשים ב-Lingui ורוצים קומפוננטות קטנות יותר, הידרציה והחלפת שפה מהירות יותר, 0% דליפת דפים במערך הנאיבי, מזהים בעלי טיפוסים, בדיקות CI ומילוי ב-AI, מבלי לגעת באף מאקרו. זוהי נקודת הכניסה המושלמת לבסיס קוד קיים של Lingui.
- **עברו ל-Intlayer טבעי (`react-intlayer`)** כאשר הקומפוננטות מועברות ממילא. זהו המערך היחיד בטבלה עם **0% דליפת שפה**, זמן ריצה של 5 KB ותוספת של 7.6 KB בלבד לדף מעל יישום הבסיס.

## השוואות קשורות

- [Lingui מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/lingui_vs_intlayer.md)
- [next-intl מול @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-intl_vs_intlayer-next-intl.md)
- [i18next מול @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18next_vs_intlayer-i18next.md)
- [vue-i18n מול @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/vue-i18n_vs_intlayer-vue-i18n.md)
- [תיעוד מתאם תאימות: Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/lingui.md)
- [בינאום מונחה קומפיילר מול בינאום הצהרתי](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/compiler_vs_declarative_i18n.md)

> כדי להבין את מקורן של ספריות אלו, קראו על ההיסטוריה של בינאום ב-JavaScript.

- [ההיסטוריה של בינאום ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md)

## סיכום

`@intlayer/lingui` משנה את הגורם שאליו קשור מוקד הקריאה של Lingui: ממופע גלובלי והקטלוג שלו לכל שפה, למילון שקומפל במיוחד עבור אותה קומפוננטה. באותו יישום TanStack Start התוצאה היא **קומפוננטות קטנות פי 7**, **8-14 ms פחות זמן הידרציה**, **החלפת שפה מהירה פי 2** וללא השהיית 42 ms, מבלי לערוך אף מאקרו. המתאם אינו משנה את מה שהקומפוננטות שלכם מטמיעות בתוכן, כך שדליפת שפת המקור נשארת, והוא מפענח ICU בזמן ריצה, כך שהגדרת טעינה עצלה שולחת כ-20 KB יותר לדף מאשר Lingui המקורית. הכירו את המספרים ומשמעותם לפני שתבחרו.

כל הנתונים הגולמיים, יישומי הבדיקה והסקריפטים זמינים במאגר [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). הריצו אותם בעצמכם.

עיינו במסמך ['למה Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md) לפרטים נוספים.

- [למה Intlayer? יתרונות על פני ספריות i18n אחרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)
