---
createdAt: 2026-09-02
updatedAt: 2026-11-03
priority: 8
title: "כיצד לזהות תרגומים חסרים לפני שהמשתמשים שלכם יגלו אותם"
description: תרגומים חסרים נכשלים בשקט. מדוע מנגנון fallback מסתיר אותם, ארבע שכבות הזיהוי שבאמת עובדות, וכיצד להכשיל build בגלל מפתח לא מתורגם.
keywords:
  - מציאת תרגומים חסרים
  - מפתחות תרגום חסרים
  - ביקורת i18n
  - מחרוזות לא מתורגמות
  - כיסוי תרגום
  - i18n lint
slugs:
  - blog
  - detecting-missing-translations
author: aymericzip
---

# כיצד לזהות תרגומים חסרים לפני שהמשתמשים שלכם יגלו אותם

תרגום חסר כמעט אף פעם אינו זורק שגיאה (throw). בהתאם להגדרות שלכם, המערכת תציג מחרוזת באנגלית למשתמש יפני, או שתדפיס `checkout.summary.total` בעמוד פעיל ב-production. שני המקרים עולים לגרסה חיה, שניהם עוברים code review, ושניהם מתגלים על ידי לקוח במקום על ידיכם.

## תוכן העניינים

<TOC/>

## הדבר נכון לכל ספרייה שבה תשתמשו

שום דבר כאן אינו ייחודי למחסנית טכנולוגית (stack) אחת. שכבות הזיהוי המפורטות להלן עובדות באותו האופן ב-i18next, react-i18next, next-intl, react-intl, vue-i18n, next-translate או Lingui, מכיוון שכולן פותרות מפתחות באותה צורה וכולן נכשלות באותה דרך.

גם כלי העבודה ניידים. אם ההודעות שלכם שמורות כיום בקטלוגי JSON, [תוסף Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) מחבר את Intlayer לקבצים אלה, כך שתקבלו את פקודות הביקורת (audit), המילוי (fill) והבדיקות מבלי להעביר את התוכן שלכם ומבלי לשנות שורת ייבוא (import) אחת:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // או "icu" עבור next-intl / react-intl
    }),
  ],
};

export default config;
```

- [תוסף Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)

אם תרצו שגם ה-API בזמן ריצה יישאר זהה לחלוטין, [מתאמי התאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md) מספקים כינויים (aliasing) ל-`useTranslation`, `$t` ודומיהם ברמת ה-bundler. בכל מקרה, התייחסו לפקודות שלהלן כאל מימוש אפשרי אחד של הרעיון, ולא כדרישת חובה.

- [מתאמי תאימות (Compat Adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md)

## מדוע הם בלתי נראים

כל ספריית i18n פותרת מפתח דרך אותה שרשרת שלבים: בדיקה של ה-locale הפעיל, מעבר לברירת מחדל (fallback), ואם גם זה נכשל, החזרה של המפתח עצמו. השלב האחרון הזה הוא הבעיה. אין שגיאה, אין אזהרה ב-production, ואין טסט שנכשל, מכיוון ששום רכיב בצינור העבודה אינו מתייחס למפתח חסר כאל תקלה חריגה.

מנגנון הנסיגה (fallback) מחמיר את המצב במקום לתקן אותו. עמוד שמתרנדר בשקט באנגלית נראה תקין לחלוטין למפתח דובר אנגלית ולכל בדיקה אוטומטית שקיימת אצלכם. הבאג נראה רק לאדם שאינו מסוגל לקרוא את התוצאה.

לכן השאלה אינה "כיצד לטפל בתרגומים חסרים בזמן ריצה". השאלה היא "כיצד למנוע לחלוטין אפשרות למזג (merge) קוד עם תרגום חסר".

## ארבעת המקומות שבהם ניתן לתפוס אותם

כל שכבה תופסת דברים שהשכבות האחרות מפספסות. מומלץ להשתמש ביותר משכבה אחת.

| שכבה            | מה היא תופסת                                       | מה היא מפספסת                     |
| :-------------- | :------------------------------------------------- | :-------------------------------- |
| טיפוסים (Types) | מפתחות שאינם קיימים כלל                            | מפתח שקיים אך אינו מתורגם ב-`ja`  |
| Lint            | מחרוזות מקודדות (hardcoded) שמעולם לא נשלחו לתרגום | מפתחות שחסרים מתוך קטלוג          |
| ביקורת (Audit)  | כיסוי locales לרוחב כל המפתחות המוצהרים            | טקסט שמעולם לא הוגדר כניתן לתרגום |
| בדיקות רינדור   | מפתחות שנפתרים בהצלחה אך מרונדרים שגוי             | כל מה שאינו מכוסה על ידי בדיקה    |

הפער שקיים אצל מרבית הצוותים נמצא בשורה השלישית: הם יודעים שהמפתחות שלהם תקינים, אך שום דבר אינו מוודא שבכל 18 השפות אכן מוגדר ערך.

## שכבה 1: הפכו את המפתח לטיפוס, לא למחרוזת

הקריאה `t("checkout.summry.total")` היא שגיאת כתיב שעוברת קומפילציה. אם המפתחות שלכם הם מחרוזות פשוטות, כל שינוי שם מהווה סיכון בזמן ריצה וכל מחיקה משאירה מפתח יתום.

מפתחות מוגדרי טיפוסים (Typed keys) הופכים שגיאה כזו לשגיאת בנייה (build error). הספרייה `react-i18next` תומכת בכך באמצעות declaration merging, הספרייה `next-intl` מסיקה טיפוסים ממבנה ההודעות שלכם, Lingui גוזרת מזהים מטקסט המקור, ו-Intlayer מייצר טיפוסים מקובצי ההצהרה. כולן עובדות; ההבדל הוא רק בכמות ההגדרות הידניות הנדרשת.

שכבה זו הכרחית אך אינה מספקת. טיפוסים מתארים את המבנה של קטלוג ברירת המחדל שלכם. הם אינם אומרים דבר לגבי השאלה האם בקוריאנית קיים ערך עבור אותו מפתח.

## שכבה 2: בדיקת lint למחרוזות שמעולם לא הפכו למפתחות

התרגום שאינכם מוצאים הוא לעיתים קרובות זה שמעולם לא הוצא החוצה. תווית מקודדת (hardcoded) בתוך רכיב בלתי נראית לכל ביקורת מבוססת קטלוג, מכיוון שמבחינת כלי העבודה היא פשוט אינה קיימת.

תוסף ה-ESLint של Intlayer מכסה זאת באמצעות הכלל `no-raw-text`, ובנוסף מספק את `no-unused-content` למקרה ההפוך: תוכן שהוצהר אך אינו נקרא עוד על ידי אף רכיב.

```js fileName="eslint.config.mjs"
import intlayer from "@intlayer/eslint-plugin";

export default [
  intlayer.configs.recommended,
  {
    rules: {
      "@intlayer/no-raw-text": "error",
      "@intlayer/no-unused-content": "warn",
    },
  },
];
```

הכלל `no-unused-content` הוא זה שמונע מהקטלוגים לגדול לנצח. מפתחות מתים אינם באג של נכונות קוד, אך הם הסיבה לכך שחשבונית ספק התרגום שלכם גבוהה בהרבה ממה שהיא צריכה להיות. רשימת הכללים המלאה זמינה ב-[תיעוד תוסף ה-ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md).

- [תיעוד תוסף ה-ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md)

## שכבה 3: ביקורת כיסוי שפות (Audit locale coverage)

זוהי השכבה שעונה על השאלה המעשית. Intlayer מספק אותה כפקודת CLI מובנית:

```bash packageManager="npm"
npx intlayer content test
```

הפקודה קוראת את ה-locales המוגדרים ואת המילונים המוצהרים, ולאחר מכן מדווחת אילו מפתחות חסרים באילו שפות ובאיזה קובץ.

פרט אחד שחשוב לדעת לפני שמחברים אותה לכלי אוטומציה: **ה-CLI מדפיס דוח אך אינו יוצא עם קוד שגיאה (non-zero) במקרה של כשל.** אם תשלבו אותו ב-pipeline בציפייה לקבל build אדום, תקבלו build ירוק עם חומת טקסט שאף אחד לא קורא. לצורך חסימת בנייה (gating), השתמשו ב-API הפרוגרמטי המוסבר להלן.

## שכבה 4: אימות בתוך מערך הבדיקות (Test Suite)

הפונקציה `listMissingTranslations()` מספקת לכם את אותם נתוני ביקורת במבנה נתונים, שזה בדיוק מה שאתם צריכים כדי לחסום build בבדיקות.

```ts fileName="i18n.test.ts"
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("has no missing required locales", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

שלושה שדות מוחזרים באובייקט, וההבחנה ביניהם חשובה:

- `missingTranslations`: פירוט לפי מפתח, אילו locales חסרים ובאיזה קובץ. זה המידע שכדאי להדפיס כאשר הבדיקה נכשלת.
- `missingLocales`: איחוד כל השפות החסרות לרוחב כל המפתחות.
- `missingRequiredLocales`: מוגבל לשפות המוגדרות תחת `requiredLocales` בקונפיגורציה שלכם, או לכל השפות אם לא הגדרתם זאת.

## שפות נדרשות (Required Locales) הן מנגנון הבקרה היעיל ביותר

השקה של שמונה עשרה שפות אינה מחייבת שכל השמונה עשרה יהיו שלמות ב-100% כדי לפרוס גרסה. לרוב הצוותים יש שכבת שפות שחוסמת שחרור גרסה ושכבה אחרת הפועלת על בסיס מאמץ מרבי (best-effort).

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.JAPANESE,
      Locales.POLISH,
    ],
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

ללא הגדרת `requiredLocales`, כל locale שמוצהר נחשב כחובה, וה-build שלכם יישאר אדום עד שהשפה האחרונה תתורגם במלואה. כך בדרך כלל צוותים מוצאים את עצמם מבטלים את הבדיקה לחלוטין, מה שגרוע בהרבה מאי-הפעלתה מלכתחילה.

## מציאת מחרוזות שכבר הגיעו ל-Production

השכבות שלעיל מונעות חוסרים חדשים. עבור אפליקציה שכבר עלתה לאוויר, שני כלים יכולים לסייע.

**פסאודו-לוקליזציה (Pseudolocalization):** הפעילו שפה שבה כל מחרוזת עוברת טרנספורמציה, למשל `[!!! Ĉĥéçķöũţ !!!]`. כל מה שמתרנדר באנגלית רגילה הוא מחרוזת מקודדת (hardcoded). הדבר מגלה בעשר דקות מה שביקורת קטלוג אינה מסוגלת לראות מבנית, מכיוון שהיא בודקת את העמוד המרונדר ולא את הקטלוג.

**סריקת האתר שלכם (Crawl):** אם אתם מגישים כתובות URL מותאמות לשפה, בצעו פנייה למדגם עמודים בכל שפה וחפשו ב-HTML מחרוזות משפת ברירת המחדל שלכם. עמוד תחת `/ja/` המכיל "Add to cart" מעיד על תרגום חסר או על fallback שלא הייתם מודעים אליו.

```bash
curl -s https://example.com/ja/checkout | grep -c "Add to cart"
```

## השלמת הפערים (Filling the gaps)

ברגע שאתם יודעים מה חסר, הפקודה `intlayer fill` מאכלסת את הרשומות הריקות, והאפשרות `autoFill` מסוגלת לייצר קבצים לכל שפה בעת הצהרת התוכן. עיינו ב-[תיעוד autoFill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/autoFill.md).

- [תיעוד autoFill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/autoFill.md)

חשוב להסתכל על הדברים בעיניים פקוחות: תרגומים שנוצרו אוטומטית במכונה הופכים פער _גלוי_ לפער _בלתי נראה_. למפתח יש כעת ערך, כך שדוח הביקורת הופך לירוק, ואף אחד לא בודק את הניסוח. השתמשו בזה כדי לשחרר חסימת גרסה, ולאחר מכן העבירו את הפלט לבדיקת עין אנושית עבור כל טקסט שהלקוח קורא לפני קבלת החלטה. זהו פיגום עבודה, לא פתרון סופי.

## טעויות נפוצות

- **התייחסות ל-fallback כאל יתרון (feature).** זוהי אסטרטגיית רינדור, לא רשת ביטחון. עמוד באנגלית שמוצג בשקט הוא באג שאינו מדווח לאף גורם.
- **הסתמכות על דוח ה-CLI לחסימת CI.** הפקודה `intlayer content test` יוצאת עם קוד 0 בכל מקרה. בצעו assertions בבדיקות אוטומטיות.
- **הגדרת כל השפות כחובה.** הבדיקה תבוטל בפעם הראשונה שגרסה תיחסם בגלל שפה שתרגומה טרם הסתיים.
- **ביקורת קטלוגים אך ללא בדיקת העמוד המרונדר בפועל.** מחרוזות מקודדות אינן גלויות לביקורת קטלוג מעצם הגדרתן.
- **בדיקת שפת ברירת המחדל בלבד בטסטים.** זו השפה היחידה שמלכתחילה אינה יכולה להיות חסרה.
- **הסתמכות עיוורת על תרגום מכונה לסגירת הפער.** ביקורת ירוקה, ניסוחים לא מבוקרים.

## קריאה נוספת

- [בדיקת התוכן שלכם: ביקורת CLI, API תכנותי ובדיקות ממשק משתמש](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/testing.md)
- [כללי תוסף ESLint, כולל `no-raw-text` ו-`no-unused-content`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md)
- [autoFill: יצירת קובצי הצהרות לפי locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/autoFill.md)
- [מדריך הגדרות קונפיגורציה: `locales`, `requiredLocales`, `defaultLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)
- [דוחות Benchmark בין פריימוורקים שונים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)
- [מתאם תאימות מהיר עבור i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/i18next.md)
- [מה בינאום מכסה בפועל](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/what_is_internationalization.md)
- [i18n ברמת הרכיב לעומת מרוכז](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/per-component_vs_centralized_i18n.md)
