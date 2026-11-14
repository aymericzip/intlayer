---
createdAt: 2026-09-02
updatedAt: 2026-11-03
priority: 8
title: "פורמט הודעות ICU: תחביר, צורות רבים ו-Select"
description: מדריך מעשי ל-ICU MessageFormat, אינטרפולציית ארגומנטים, פיצול צורות רבים (plurals) ו-select, קטגוריות רבים של CLDR לפי שפה, והטעויות הנפוצות.
keywords:
  - פורמט הודעות icu
  - icu message format
  - icu messageformat
  - כללי רבים של cldr
  - קטגוריות רבים
  - selectordinal
  - ריבוי i18n
  - תחביר הודעות
slugs:
  - blog
  - icu-message-format
author: aymericzip
youtubeVideo: https://www.youtube.com/watch?v=7VtLdbtV1us&t=864s
---

# פורמט הודעות ICU: התחביר, והמקומות שבהם אנשים נופלים

<iframe title="הכול על i18n: המדריך המלא לבינאום ווב" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/7VtLdbtV1us?autoplay=0&amp;start=864&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

ICU MessageFormat הוא תחביר מחרוזות המאפשר לתרגום להכיל לוגיקת פיצול (branching) משלו: צורות רבים, צורות מבוססות מגדר, ועיצוב מספרים ותאריכים. הוא נוצר משום שדקדוק שייך למתרגם, ולא למפתח שכותב `if (count === 1)`. פוסט זה מכסה את התחביר, את החלקים תלויי השפה ששוברים מימושים נאיביים, ואת האופן שבו האקוסיסטם של JS מתמודד איתו.

## תוכן עניינים

<TOC/>

## הבעיה, באופן מעשי

הנה הקוד שכמעט כולם כותבים בהתחלה:

```ts
const label = count + " " + (count === 1 ? t("item") : t("items"));
```

זה עובד באנגלית ונשבר בכל שפה אחרת:

- **רוסית ופולנית** זקוקות לשלוש או ארבע צורות, לא שתיים.
- **יפנית** זקוקה לצורה אחת, והרווח ששרשרתם שגוי.
- **ערבית** זקוקה לשש, ואת המספר עצמו יש לעצב במערכת המספרים של ה-locale.
- **צרפתית** מציבה רווח בלתי-שביר (non-breaking space) לפני סימני פיסוק מסוימים, שרצף ה-`+ " "` שלכם הרגע הרס.

הבעיה העמוקה יותר היא שהמשפט נחתך למקטעים. מתרגם רואה את `item` ו-`items` ללא הקשר וללא יכולת לשנות את סדר המילים במשפט. ICU MessageFormat פותר זאת על ידי שמירת המשפט כולו במחרוזת אחת שניתנת לתרגום, ומעניק למתרגם את אופרטורי הפיצול (branching operators).

## ארגומנטים פשוטים

היחידה הקטנה ביותר היא מציין מיקום (placeholder) בסוגריים מסולסלים בודדים:

```text
Hello, {name}!
```

מעבירים `{ name: "Alice" }` בזמן העיצוב ומקבלים `Hello, Alice!`. סוגריים מסולסלים הם התווים המיוחדים היחידים; כדי להדפיס סוגר מסולסל ליטרלי עוטפים אותו בגרשיים בודדים: `'{'`.

זהו כל מנגנון ה-"אינטרפולציה". כל השאר ב-ICU בנוי מעליו.

## צורות רבים (Plural)

`plural` בוחר ענף בהתבסס על מספר:

```text
{count, plural,
  one {You have one unread message}
  other {You have # unread messages}
}
```

שלושה דברים שכדאי לדעת:

- **`#`** מוחלף בערך המעוצב של `count`, מעוצב לפי ה-locale, כך ש-`1234` הופך ל-`1,234` ב-`en-US` ול-`1 234` ב-`fr-FR`.
- **`other` הוא שדה חובה.** כל מימוש ICU יזרוק שגיאה או ייכשל באימות בלעדיו. זהו ה-fallback כאשר שום קטגוריה אינה תואמת.
- **`=0`, `=1`, … מתאימים לערכים מדויקים** ונבדקים _לפני_ קטגוריות ה-CLDR. השתמשו בהם עבור ניסוחים ייעודיים למקרים מיוחדים ("No messages"), ולא כתחליף ל-`one`.

```text
{count, plural,
  =0 {No unread messages}
  one {One unread message}
  other {# unread messages}
}
```

### offset

`offset:n` מחסיר `n` מהערך לפני בחירת הקטגוריה ולפני החלפת ה-`#`. הוא נועד עבור דפוסים כמו "Alice and 3 others liked this":

```text
{count, plural, offset:1
  =0 {No one liked this}
  =1 {{name} liked this}
  one {{name} and one other liked this}
  other {{name} and # others liked this}
}
```

עם `count: 4`, ה-`#` ירונדר כ-`3`. `offset` הוא כלי שימושי באמת אך סובל מתמיכה חלקית בסביבות שונות, לכן כדאי לבדוק את ה-runtime שלכם לפני שמסתמכים עליו.

## קטגוריות רבים תלויות-שפה

זהו החלק שבו מפתחים רבים טועים. שמות הקטגוריות `zero`, `one`, `two`, `few`, `many`, `other` אינם דליים אוניברסליים שממלאים עבור כל שפה. כל locale משתמש ב_תת-קבוצה_, המוגדרת על ידי [כללי הרבים של CLDR](https://cldr.unicode.org/index/cldr-spec/plural-rules), והכללים הם דקדוקיים, לא אינטואיטיביים.

| שפה    | תגית | קטגוריות בשימוש                  | כמות |
| ------ | ---- | -------------------------------- | ---- |
| יפנית  | `ja` | other                            | 1    |
| סינית  | `zh` | other                            | 1    |
| אנגלית | `en` | one, other                       | 2    |
| גרמנית | `de` | one, other                       | 2    |
| צרפתית | `fr` | one, many, other                 | 3    |
| צ'כית  | `cs` | one, few, many, other            | 4    |
| פולנית | `pl` | one, few, many, other            | 4    |
| רוסית  | `ru` | one, few, many, other            | 4    |
| ערבית  | `ar` | zero, one, two, few, many, other | 6    |
| ולשית  | `cy` | zero, one, two, few, many, other | 6    |

שתי מסקנות שמפתיעות מפתחים:

- **`one` אינו אומר "1".** ברוסית, `one` כולל את 1, 21, 31, 101: כל מספר שמסתיים ב-1 למעט אלה שמסתיימים ב-11. בצרפתית, `0` נופל לתוך `one`.
- **הוספת קטגוריה למקור האנגלי אינה עושה דבר.** ההודעה באנגלית זקוקה רק ל-`one` ול-`other`; התרגום לפולנית זקוק לארבעה ענפים, והמבנה הזה חי במחרוזת הפולנית, לא באנגלית. כל פורמט שמאלץ את כל ה-locales לחלוק מבנה מפתחות אחיד יקשה עליכם כאן.

ניתן לבדוק מה ה-runtime בפועל מחזיר מבלי להתקין דבר:

```ts
new Intl.PluralRules("pl").select(2); // "few"
new Intl.PluralRules("pl").select(5); // "many"
new Intl.PluralRules("ru").select(21); // "one"
new Intl.PluralRules("ar").select(0); // "zero"
```

`Intl.PluralRules` מספק נתוני CLDR בכל דפדפן מודרני וב-Node. ספריה שטוענת לתמיכה בריבוי לפי CLDR כמעט תמיד קוראת לו מאחורי הקלעים.

## select ו-selectordinal

`select` מפצל ענפים לפי מחרוזת שרירותית: מגדר, תפקיד, סטטוס, מסלול מנוי.

```text
{gender, select,
  female {She updated her profile}
  male {He updated his profile}
  other {They updated their profile}
}
```

מפתחות מותאמים מילולית (literally) ו-`other` הוא שדה חובה גם כאן. `select` הוא הכלי הנכון בכל פעם שמבנה המשפט תלוי בערך enum, מכיוון ששפות שונות נבדלות באילו ערכי enum משפיעים על הדקדוק שלהן.

`selectordinal` בנוי באותו מבנה כמו `plural` אך משתמש בכללי רבים **סידוריים (ordinal)**, שהם טבלה שונה לחלוטין מזו של מספרי כמויות (cardinal):

```text
{rank, selectordinal,
  one {#st place}
  two {#nd place}
  few {#rd place}
  other {#th place}
}
```

אנגלית משתמשת בארבע קטגוריות סידוריות (1st, 2nd, 3rd, 4th) למרות שהיא משתמשת רק בשתיים עבור כמויות. חוסר הסימטריה הזה הוא בדיוק הסיבה ששני האופרטורים נפרדים.

## ארגומנטים של מספרים, תאריכים ושעות

ICU יכול לעצב את הערך שהוא משלב:

```text
Total: {price, number, currency}
Published {publishedAt, date, long} at {publishedAt, time, short}
Conversion: {rate, number, percent}
```

הצורה המודרנית היא ה-**skeleton**, שהוצגה ב-ICU 60 ומסומנת בקידומת `::`. סקלטונים הם בעלי כושר ביטוי עשיר בהרבה משמות הסגנונות הישנים (legacy):

```text
{price, number, ::currency/EUR}
{value, number, ::percent scale/100}
{amount, number, ::compact-short}
{distance, number, ::unit/kilometer unit-width-narrow}
```

התמיכה ב-skeletons היא החלק הכי לא אחיד באקוסיסטם. FormatJS מממש אותם; סביבות ריצה רבות אחרות מקבלות רק את צורות ה-legacy כגון `number, currency` או `date, long`. ודאו את התמיכה ב-`::` בסביבת הריצה שלכם לפני השקה לסביבת ייצור.

## קינון, והיכן שזה מפסיק להיות קריא

ICU תומך בהרכבה (composition). ענף plural יכול להכיל select, שיכול להכיל plural נוסף:

```text
{hostGender, select,
  female {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    =1 {{host} invites {guest} to her party}
    other {{host} invites {guest} and # other people to her party}
  }}
  other {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    other {{host} invites {guest} and # other people to their party}
  }}
}
```

זוהי הדוגמה הקלאסית ל-ICU, והיא גם הטיעון הקלאסי נגד קינון עמוק. שתי רמות הן הנקודה שבה מתרגמים מתחילים לטעות בסוגריים מסולסלים ושבה עורכי TMS מפסיקים לעזור. קננו לכל היותר שתי רמות; אם אתם זקוקים לרמה שלישית, פצלו את המשפט לשתי הודעות נפרדות.

## כיצד ספריות JS מתמודדות עם ICU

| ספריה                 | תמיכת ICU      | מה שכותבים בפועל                                                             |
| --------------------- | -------------- | ---------------------------------------------------------------------------- |
| react-intl (FormatJS) | מלאה, טבעית    | מחרוזות ICU, כולל skeletons ותגיות rich-text                                 |
| next-intl             | טבעית          | מחרוזות ICU, דרך `intl-messageformat` של FormatJS                            |
| i18next               | נדרש פלאגין    | מפתחות עם סיומות `key_one` / `key_other` ו-`{{name}}`; ICU דרך `i18next-icu` |
| vue-i18n              | חלקית / עצמאית | אינטרפולציה של `{name}` וענפי רבים מופרדים בקו אנכי (pipe)                   |
| Angular (`$localize`) | תת-קבוצה       | `plural` / `select` של ICU בתוך תבניות, מחולצים ל-XLIFF                      |

מספר הערות כדי שהטבלה לא תטעה:

- **התחביר המוגדר כברירת מחדל ב-i18next אינו ICU**, וזה לא בהכרח חיסרון. מפתחות סיומת (`item_one`, `item_few`) ממופים לקטגוריות `Intl.PluralRules` ולעיתים קלים יותר לעריכה עבור מתרגמים ב-JSON שטוח. אבל `select` ופיצולים מקוננים אינם חלק מכך, ולכן עליכם להוסיף את `i18next-icu` או לכתוב את הלוגיקה בקוד.
- **ענפי רבים מבוססי pipe ב-vue-i18n** משתמשים בפונקציית כלל לפי locale, ולא בקטגוריות CLDR כברירת מחדל. זה עובד, אך כלל הרבים חי בהגדרות האפליקציה במקום בנתונים עצמם.
- **FormatJS הוא מימוש הייחוס (reference implementation)** ב-JS. כשמדברים על "ICU MessageFormat" בהקשר של JS, בדרך כלל מתכוונים למה ש-FormatJS מקבל.
- **לתמיכה מלאה ב-ICU יש מחיר בנפח החבילה (bundle).** המנתח (parser) והטיפול ב-skeletons מוסיפים כ-10 KB של JavaScript דחוס. ראו [מדוע ICU אינו מיועד ל-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/why_icu_is_not_made_for_js.md).

## כיצד Intlayer מתמודדת עם זה

Intlayer אינה משתמשת ב-DSL מחרוזתי. אופרטורי הפיצול הם פונקציות בקובץ הצהרת תוכן, כך שהמבנה מקבל טיפוסיות (typed) וכל locale מצהיר רק על הקטגוריות שהדקדוק שלו דורש:

```typescript fileName="**/*.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      pl: plural({
        one: "{{count}} oferta",
        few: "{{count}} oferty",
        many: "{{count}} ofert",
        other: "{{count}} ofert",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```tsx fileName="**/*.tsx"
const { totalOpenings } = useIntlayer("total_openings");

totalOpenings(5); // Polish locale → "5 ofert"
```

המיפוי למושגי ICU הוא ישיר:

| מבנה ב-ICU                    | Intlayer                                     |
| ----------------------------- | -------------------------------------------- |
| `{name}`                      | `insert("Hello {{name}}")`, או זיהוי אוטומטי |
| `{count, plural, …}`          | `plural({ one, few, many, other })`          |
| `{value, select, …}`          | `select({ draft, published, fallback })`     |
| ענף מגדר של `select`          | `gender({ male, female, fallback })`         |
| ענף בוליאני של `select`       | `cond({ true, false })`                      |
| טווחי מספרים (שאינם CLDR)     | `enu({ "0": …, ">5": …, fallback: … })`      |
| `{n, number, ::currency/EUR}` | `useCurrency()(1234.5, { currency: "EUR" })` |

`plural` מאציל את בחירת הקטגוריה ל-`Intl.PluralRules`, כך שטבלת ה-CLDR למעלה חלה ללא שינוי. העיצוב נשאר מופרד: מספרים, תאריכים, מטבעות ורשימות עוברים דרך [הוקי המעצבים (formatter hooks)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md) במקום להיות מוטמעים במחרוזת ההודעה.

- [הוקי מעצבים (formatter hooks)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)

מגבלות גלויות:

- Intlayer דורשת שלב build; הקומפיילר מחלץ הצהרות בזמן הבנייה. אם אתם מעוניינים ב-JSON רגיל שנטען בזמן ריצה, מדובר במודל שונה.
- `plural` עדיין אינו יכול לקנן `t()` בתוך הענפים שלו; עוטפים את `plural` בתוך `t()`, ולא להיפך.
- האקוסיסטם קטן יותר מזה של i18next. פחות אינטגרציות TMS, פחות תשובות ב-StackOverflow.

אם אתם מגיעים מבסיס קוד שכבר מכיל מחרוזות ICU אמיתיות, [מתאם התאימות ל-react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/react-intl.md) מנתח אותן ישירות: `plural`, `select`, `selectordinal`, `#`, וארגומנטי ה-legacy של `number` / `date` / `time`. סקלטונים ו-`offset:` אינם מכוסים על ידי מפענח זה, לכן בדקו את ההודעות הללו כאשר אתם מבצעים מיגרציה. [מתאם i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/i18next.md) מפענח את תצורת הסיומות (`key_one`, `key_male`) מול `Intl.PluralRules` במקום זאת.

- [מתאם תאימות react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/react-intl.md)
- [מתאם i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/i18next.md)

## טעויות נפוצות

- **קידוד קשיח (hardcoding) של לוגיקת רבים ב-JS.** `count === 1 ? a : b` מייצר פלט שגוי עבור 8 מתוך 10 השפות בטבלה שלמעלה. ברגע שהאופרטור המשולש (ternary) נמצא בקוד, שום מתרגם אינו יכול לתקן זאת.
- **שרשור מקטעים מתורגמים.** סדר מילים, התאם דקדוקי וריווח פיסוק כולם תלויי locale. שמרו על המשפט שלם.
- **השמטת `other`.** זהו שדה חובה לפי המפרט, לא מוסכמה אופציונלית. רוב המנתחים ידחו את ההודעה; אלה שלא פשוט לא יציגו דבר.
- **הנחה שהקטגוריות שלכם מתאימות לכולם.** מקור באנגלית עם `one` / `other` אינו אומר שלקובץ בפולנית יהיו שני ענפים. אפשרו לכל locale להצהיר על הצורות שלו. ראו [הצהרת תוכן לפי locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md).
- **שימוש ב-`=1` כאשר התכוונתם ל-`one`.** `=1` מתאים רק לערך הליטרלי 1. ברוסית, 21 זקוק ל-`one`, ו-`=1` לעולם לא יופעל עבורו.
- **הצבת `#` מחוץ לענף plural.** הוא בעל משמעות מיוחדת רק בתוך `plural` / `selectordinal`. בכל מקום אחר הוא סולמית ליטרלית.
- **שכחה ש-`#` מעוצב.** אם אתם רוצים את המספר הגולמי, שלבו את הארגומנט לפי שמו במקום זאת.

בדקו ועצבו את הודעות ה-ICU שלכם באמצעות [מעצב הודעות ה-ICU](https://intlayer.org/icu-message-formatter) החינמי:

<ClickToOpenIframe src="https://intlayer.org/icu-message-formatter" width="100%" height="700px" style="border:none;"/>

## הרחבת קריאה

- [מעצב ועורך הודעות ICU (ICU Message Formatter & Editor)](https://intlayer.org/icu-message-formatter)
- [מדוע ICU אינו מיועד ל-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/why_icu_is_not_made_for_js.md)
- [תוכן רבים (Plural) ב-Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md)
- [תוכן מבוסס Select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/select.md)
- [מצייני מיקום להטמעה (Insertion placeholders)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md)
- [השוואת ביצועים של ספריות i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)
- [react-i18next לעומת react-intl לעומת Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/react-i18next_vs_react-intl_vs_intlayer.md)
- [מהי בינאום (Internationalization)?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/what_is_internationalization.md)
