---
createdAt: 2026-09-02
updatedAt: 2026-11-03
priority: 8
title: "עיצוב תאריכים ומספרים לפי שפה ואזור (Locale) באמצעות Intl"
description: "האם אתם זקוקים לספריית עיצוב (formatting)? כיצד Intl מעצב תאריכים, מספרים, מטבעות ורשימות לפי locale, עלות ה-caching, ובאג אזור זמן (timezone) שמופיע רק ב-production."
keywords:
  - עיצוב תאריך לפי locale
  - Intl.DateTimeFormat
  - Intl.NumberFormat
  - toLocaleDateString
  - עיצוב מטבע לפי locale
  - עיצוב זמן יחסי
slugs:
  - blog
  - date-time-number-formatting-locales
author: aymericzip
youtubeVideo: https://www.youtube.com/watch?v=7VtLdbtV1us&t=864s
---

# עיצוב תאריכים ומספרים לפי שפה ואזור (Locale) באמצעות Intl

<iframe title="הכול על i18n: המדריך המלא לבינאום ווב" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/7VtLdbtV1us?autoplay=0&amp;start=864&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

תרגום מחרוזות הוא החצי הגלוי של i18n. החצי שמייצר את מרבית דיווחי הבאגים הוא העיצוב (formatting): משתמש גרמני שרואה `1,234.56` במקום `1.234,56`, משתמש יפני שרואה `08/02/2026` וקורא זאת כחודש אוגוסט, או תאריך שמרונדר באופן שונה בשרת ובדפדפן ומפיל את העמוד במהלך ה-hydration.

אף אחד מהמקרים הללו אינו דורש ספרייה חיצונית. ה-API המובנה `Intl` קיים בכל סביבת ריצה מודרנית.

## תוכן העניינים

<TOC/>

## התחילו במחיקת פונקציית העזר (Helper) לתאריכים שלכם

כמעט בכל בסיס קוד יש פונקציית `formatDate` שנכתבה עוד לפני שמישהו חשב על locales. היא מקבעת סדר מסוים, תו מפריד, ובדרך כלל שמות חודשים באנגלית.

```ts
// הדבר שכדאי למחוק.
const formatDate = (d: Date) =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
```

האובייקט `Intl.DateTimeFormat` מחליף אותה ופועל נכון בכל locale:

```ts
new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(date);
// "2. August 2026"
new Intl.DateTimeFormat("ja-JP", { dateStyle: "long" }).format(date);
// "2026年8月2日"
```

אותו עיקרון חל גם על מספרים. הקריאה `toFixed(2)` מייצרת `1234.56` בכל מקום, וזה שגוי ברוב מדינות אירופה.

## מה ש-`Intl` מכסה

| API                       | שימוש עיקרי                                                                  |
| :------------------------ | :--------------------------------------------------------------------------- |
| `Intl.DateTimeFormat`     | תאריכים וזמנים, עם הגדרות מוכנות מראש של `dateStyle` / `timeStyle`           |
| `Intl.NumberFormat`       | מספרים עשרוניים, מטבעות, אחוזים, יחידות מידה, רישום מקוצר (compact notation) |
| `Intl.RelativeTimeFormat` | "לפני 3 ימים", "בעוד שעתיים"                                                 |
| `Intl.ListFormat`         | חיבור רשימות ("א, ב ו-ג" לעומת "a, b, and c")                                |
| `Intl.PluralRules`        | לאיזו קטגוריית ריבוי (plural category) שייך מספר נתון                        |
| `Intl.Collator`           | מיון מחרוזות בצורה נכונה לפי חוקי השפה                                       |

האובייקט `Intl.Collator` הוא הרכיב שרבים נוטים לשכוח. הפעלת `array.sort()` על מחרוזות משתמשת בסדר ה-code points, כך שתווים עם ניקוד או הטעמות ממוינים אחרי `z`, והאות השוודית `ö` מגיעה למקום הלא נכון. אם אתם ממיינים רשימות המוצגות למשתמש, מיינו תמיד באמצעות collator.

```ts
["zebra", "édouard", "apple"].sort(new Intl.Collator("fr").compare);
// ["apple", "édouard", "zebra"]
```

## העדיפו הגדרות מוכנות מראש (Presets) על פני אפשרויות בהתאמה ידנית

המאפיינים `dateStyle` ו-`timeStyle` מאפשרים ל-locale לקבוע את הסדר ואת התווים המפרידים. פירוט ידני של `year`, `month` ו-`day` מעניק שליטה שבדרך כלל מוטב להימנע ממנה, מכיוון שהסדר הנכון משתנה לפי אזור ושפה, ובהגדרה ידנית אתם דורסים את נתוני CLDR על סמך הנחות משלכם.

```ts
// ה-locale קובע את המבנה.
new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(d);

// אתם קבעתם את המבנה, וסביר להניח שזה שגוי באזורים מסוימים.
new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(d);
```

השתמשו ברכיבים מפורשים רק כאשר העיצוב מחייב מבנה קבוע באופן מהותי, לדוגמה עמודת טבלה שחייבת להישאר צרה.

## יצירת formatters היא פעולה יקרה

זהו פרט הביצועים החשוב ביותר. בניית מופע של `Intl.NumberFormat` כוללת טעינה של נתוני locale, והיא יקרה משמעותית מקריאת ה-`format()` שבאה בעקבותיה. ביצוע פעולה זו בתוך פונקציית רינדור או בלולאה הרצה על פני אלף שורות גורר עלות מורגשת.

```ts
// בונה מחדש את ה-formatter בכל שורה ושורה.
rows.map((r) => new Intl.NumberFormat(locale).format(r.total));

// בונים פעם אחת, ומשתמשים שוב ושוב.
const nf = new Intl.NumberFormat(locale);
rows.map((r) => nf.format(r.total));
```

פונקציות כמו `toLocaleDateString()` ו-`toLocaleString()` מסתירות בתוכן את אותה הבעיה בדיוק: כל קריאה בונה מופע חדש של formatter. הן מתאימות לערך בודד אך שגויות לחלוטין בעיבוד רשימות.

בצעו שמירה במטמון (Cache) לפי השילוב של ה-locale וה-options, שכן הם אלה המגדירים את ה-formatter:

```ts
const cache = new Map<string, Intl.NumberFormat>();

const getNumberFormat = (
  locale: string,
  options: Intl.NumberFormatOptions = {}
) => {
  const key = `${locale}:${JSON.stringify(options)}`;
  let formatter = cache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    cache.set(key, formatter);
  }
  return formatter;
};
```

## באג אזור הזמן (Timezone) שמופיע רק ב-Production

באג זה עלול לבזבז שעות עבודה רבות. השרת מרנדר תאריך, הדפדפן מבצע hydration, ו-React זורק שגיאת hydration mismatch מכיוון ששני הצדדים ייצרו טקסט שונה.

הסיבה לכך היא ש-`Intl.DateTimeFormat` משתמש באזור הזמן המקומי של הסביבה כאשר לא מוגדר אזור זמן במפורש. שרת ה-production שלכם פועל ב-UTC, בעוד שהמחשב הנייד שלכם אינו כזה. כתוצאה מכך, הבאג בלתי נראה בסביבה המקומית ומשתחזר אך ורק ב-production, שזהו התרחיש הגרוע ביותר.

```ts
// שרת ב-UTC ודפדפן ב-UTC+9 מייצרים פלט שונה. שגיאת hydration mismatch.
new Intl.DateTimeFormat(locale, { dateStyle: "short" }).format(d);

// שני הצדדים מסכימים על אותו הפלט.
new Intl.DateTimeFormat(locale, { dateStyle: "short", timeZone: "UTC" }).format(
  d
);
```

קיימות שלוש גישות ישימות לפתרון:

- **קיבוע אזור זמן (Pin a timezone)** בשרת והעברתו במפורש. פתרון נכון ודטרמיניסטי, אך כל המשתמשים יראו UTC.
- **רינדור בצד הלקוח בלבד (Client-only render)**, עם placeholder יציב עבור מעבר השרת. מדויק עבור כל משתמש, אך גורר הבהוב קל (flash).
- **שמירת אזור הזמן של המשתמש** והעברתו בשני הצדדים. התוצאה הטובה ביותר, אך דורשת את כמות העבודה הגדולה ביותר.

ללא קשר לגישה שתבחרו, העבירו תמיד `timeZone` במפורש עבור כל תאריך המרונדר הן בשרת והן בלקוח. תאריך ללא אזור זמן מוגדר הוא תאריך בעל שני ערכים שונים.

## מטבע זקוק לקוד מטבע, לא לשפה ואזור (Locale)

שפה ואזור (locale) ומטבע הם שני דברים נפרדים לחלוטין. `fr-FR` אינו מעיד בהכרח על אירו: משתמש צרפתי יכול לצפות בחשבונית הנקובה בדולר ארה"ב (USD).

```ts
new Intl.NumberFormat("fr-FR", { style: "currency", currency: "USD" }).format(
  1234.5
);
// "1 234,50 $US"
```

ה-locale שולט בתווים המפרידים, בקיבוץ הספרות ובמיקום סימן המטבע. המטבע עצמו מגיע ישירות מהנתונים שלכם. גזירת האחד מהשני היא באג שמגיע עד למחלקת הנהלת חשבונות.

בנוסף, שימו לב למאפיין `currencyDisplay`. בממשק שבו מתקיימים מספר מטבעות במקביל, שימוש ב-`"code"` מונע בלבול בין דולר ארה"ב, דולר קנדי ודולר אוסטרלי.

## זמן יחסי קריא וטבעי יותר מזמן מוחלט

עבור אירועים שהתרחשו לאחרונה, הניסוח "לפני שעתיים" עדיף בהרבה על חותמת זמן מוחלטת, והאובייקט `Intl.RelativeTimeFormat` מתאים אותו נכון לשפה.

```ts
new Intl.RelativeTimeFormat("he", { numeric: "auto" }).format(-1, "day");
// "אתמול"
```

ההגדרה `numeric: "auto"` היא זו שמפיקה "אתמול" במקום "לפני יום 1". בלעדיה תקבלו את הצורה המספרית בכל שפה, מה שנראה מנוכר ומכני.

## מה Intlayer מוסיף

Intlayer עוטף את המנגנונים הללו בפונקציות עזר מובנות עם מטמון (cache), כך שלא תצטרכו לנהל את ה-Map בעצמכם, וה-locale הפעיל מוחל כברירת מחדל במקום שתידרשו להעביר אותו בכל קריאה.

```ts
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
} from "intlayer";

number(1234.5); // "1,234.5"
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
date(new Date(), "short");
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "לפני שעתיים"
units(5, { unit: "kilometer", unitDisplay: "long" }); // "5 קילומטרים"
compact(1200); // "1.2K"
list(["apple", "banana", "orange"]); // "apple, banana, ו-orange"
```

הפונקציה `date()` מקבלת גם הגדרות מוכנות מראש (`"short"`, `"long"`, `"dateOnly"`, `"timeOnly"`, `"full"`), כך שהמקרים הנפוצים אינם דורשים אובייקט אפשרויות. קיימות גרסאות מקבילות עבור React ו-Vue כ-hooks וכ-composables, אשר מזהות את ה-locale הפעיל ישירות מתוך ה-context במקום לקבל אותו כארגומנט.

חשוב להבהיר מה מהות המנגנון: שכבת caching וברירת מחדל של locale מעל ה-API הסטנדרטי של הפלטפורמה. התנהגות העיצוב היא של `Intl`, וכל הנאמר במאמר זה תקף בין אם תבחרו להשתמש בה ובין אם לאו. חתימות מלאות זמינות ב-[תיעוד פונקציות העיצוב (Formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md).

- [תיעוד פונקציות העיצוב (Formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)

## טעויות נפוצות

- **שימוש ב-`toLocaleDateString()` ללא ציון locale.** הפונקציה תשתמש ב-locale של סביבת הריצה, אשר בשרת נקבע לפי הגדרות הקונטיינר.
- **עיצוב בתוך לולאה.** עלות יצירת ה-formatter היא המרכיב הכבד ביותר. בנו אותו פעם אחת.
- **היעדר `timeZone` בתאריכים איזומורפיים (Isomorphic).** גורר שגיאת hydration mismatch שלעולם אינה משתחזרת במחשב המקומי שלכם.
- **גזירת מטבע מתוך ה-locale.** השפה `fr-FR` אינה בהכרח אירו.
- **הפעלת `sort()` על מחרוזות המוצגות למשתמש.** השתמשו ב-`Intl.Collator`.
- **קידוד ידני של שמות חודשים או ימים.** הם כבר קיימים ב-CLDR בכל שפה.
- **שימוש ב-`numeric: "always"` עבור זמן יחסי.** גורם להצגת "לפני יום 1" במקום שבו לכל שפה יש מילה ייעודית עבור "אתמול".

## קריאה נוספת

- [מעצבים וכלי עזר ל-locale: `number`, `currency`, `date`, `relativeTime`, `list`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)
- [מדריך הגדרות קונפיגורציה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)
- [דוחות Benchmark בין פריימוורקים שונים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)
- [מתאם תאימות מהיר עבור react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/react-intl.md)
- [פורמט הודעות ICU: ריבוי, select ותבניות מספרים](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/icu_message_format.md)
- [כיצד לבדוק תרגומים, כולל כיסוי formatters וריבוי](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_testing_strategies.md)
- [מה בינאום מכסה בפועל](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/what_is_internationalization.md)
