---
createdAt: 2026-10-03
updatedAt: 2026-11-03
priority: 8
title: "מדוע ICU MessageFormat לא נועד עבור JavaScript"
description: "ICU MessageFormat נבנה במקור עבור Java ו-C++. בדפדפן, תמיכה מלאה מוסיפה כ-10 KB של קוד מנתח (parser). מהיכן מגיעה עלות זו, ואילו חלופות קיימות."
keywords:
  - icu message format
  - icu messageformat
  - icu messageformat javascript
  - icu bundle size
  - גודל חבילה
  - bundle size
  - intl-messageformat
  - next-intl precompile
  - ריבוי i18n
  - i18n pluralization
  - Intl.PluralRules
  - בלוג
  - Blog
slugs:
  - blog
  - why-icu-is-not-made-for-js
author: aymericzip
youtubeVideo: https://www.youtube.com/watch?v=7VtLdbtV1us&t=864s
---

# מדוע ICU MessageFormat לא נועד עבור JavaScript

<iframe title="הכול על i18n: המדריך המלא לבינאום ווב" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/7VtLdbtV1us?autoplay=0&amp;start=864&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

ICU MessageFormat הוא תקן מוצלח. הוא שלם, מתרגמים מכירים אותו, ורוב מערכות ניהול התרגום (TMS) יודעות לקרוא אותו. הבעיה טמונה בסביבת הריצה שעבורה הוא תוכנן. ICU מקורו ב-C++ וב-Java, שפות שבהן מנתח (parser) ומעצב הודעות מלא מהווים עלות זניחה ביחס לשאר התוכנית. בחבילת דפדפן (browser bundle), עלות זו משולמת בכל טעינת דף מחדש.

פוסט זה בוחן מהיכן מגיע ICU, מדוע התחביר שלו כבד עבור צורות ריבוי (plurals), ומדוע תאימות מלאה מוסיפה משקל לכל ספריית i18n ב-JavaScript. אם אתם זקוקים לתחביר עצמו, קראו תחילה את [מדריך התחביר של ICU Message Format](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/icu_message_format.md).

- [מדריך התחביר של ICU Message Format](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/icu_message_format.md)

<TOC/>

## מ-IBM ועד ל-Unicode Consortium

ICU מייצג את ראשי התיבות _International Components for Unicode_. תחביר ההודעות שלו החל ב-Java: חברת Taligent, מיזם משותף של Apple ו-IBM, כתבה את מחלקות הבינאום של JDK 1.1 (1997), כולל `java.text.MessageFormat`. חברת IBM המשיכה לפתח אותן כ-ICU4J, הסבה אותן ל-C/C++ כ-ICU4C, ושחררה את הפרויקט כקוד פתוח בשנת 1999. בשנת 2016 עבר ICU לאחריות ה-Unicode Consortium, שמתחזק גם את CLDR, מאגר נתוני השפות והאזורים שעליו הוא מתבסס.

### לשם מה הוא שימש

קהל היעד היה תוכנות שרת ותוכנות שולחניות (desktop): יישומי Java ארגוניים, מוצרי IBM ומאוחר יותר מערכות הפעלה. הודעות נשמרו בקובצי `.properties` של Java שנטענו באמצעות `ResourceBundle`, או בפורמט resource bundle הייעודי של ICU עבור C/C++:

```properties fileName="messages_fr.properties"
inbox.unread={count, plural, one {# message non lu} other {# messages non lus}}
```

```java
String pattern = bundle.getString("inbox.unread");
String text = new MessageFormat(pattern, Locale.FRENCH)
    .format(Map.of("count", 5)); // "5 messages non lus"
```

גרסת ה-JDK המקורית כלל לא כללה את `plural`. היא השתמשה ב-`choice`, עם טווחים מספריים (`{0,choice,0#no files|1#one file|1<{0} files}`), מה שהתאים רק לשפות בעלות מנגנון ריבוי דומה לאנגלית. ICU הוסיפה את `plural` על בסיס כללי CLDR בשנת 2008 (ICU 4.0) ואת `select` בשנת 2010 (ICU 4.4).

### לא פורמט `.po`

לעיתים קרובות מבלבלים בין ICU לבין gettext, אך מדובר במסורות נפרדות לחלוטין. קובצי `.po` מקורם ב-GNU gettext (C, Linux, ולאחר מכן PHP ו-Python). רשומת `.po` מכילה צמדי `msgid` / `msgstr` פשוטים, וצורות ריבוי נבחרות על ידי ביטוי בשפת C בכותרת הקובץ (`Plural-Forms: nplurals=2; plural=(n > 1);`). אין התפצלות בתוך ההודעה עצמה. לעומת זאת, ICU שם את ההתפצלות בתוך המחרוזת עצמה, כך שהודעה אחת יכולה לשלב `plural`, `select` ועיצוב מספרים יחדיו.

### היכן ICU רץ כיום

ICU4C מוטמעת כיום ב-Android, iOS, macOS, Windows, Node.js ובמנועי ה-JavaScript של Chrome ו-Firefox. ממשקי ה-`Intl` בדפדפנים מבוססים עליה במידה רבה. לכן, הדפדפן כבר מכיל בתוכו את כללי הריבוי ואת עיצוב המספרים והתאריכים של ICU. מה שהוא אינו מכיל הוא מנתח ההודעות (message parser): ההצעה `Intl.MessageFormat` ב-TC39 נמצאת עדיין בשלבים מוקדמים, מבוססת על תחביר MessageFormat 2 החדש יותר ואינה תואמת לאחור ל-ICU MessageFormat 1.

היסטוריה זו מסבירה את התכנון:

- **היא מיועדת לסביבות שרת ודסקטופ.** ניתוח מחרוזת הודעה בזמן ריצה הוא זול מאוד בסביבות אלו, והספרייה מותקנת פעם אחת במערכת ההפעלה, ולא מורדת ברשת על ידי כל גולש.
- **זהו שפת תחום ייעודית (DSL) בתוך מחרוזת.** התפצלויות, עיצוב מספרים, תאריכים וקינונים חיים כולם בתוך תחביר אחד שמתרגם יכול לערוך מבלי לגעת בקוד.
- **היא שואפת לשלמות מקסימלית.** לכל מקרה דקדוקי שמתרגם עשוי להזדקק לו יש אופרטור ייעודי.

אף אחד מאלה אינו טעות. הם פשוט מניחים סביבת ריצה שאינה תואמת לדפדפן האינטרנט.

## צורות ריבוי הן מסורבלות ומילוליות מדי

המבנה הנפוץ ביותר ב-ICU הוא גם העמוס ביותר. ספירה הכוללת מקרה אפס נראית כך:

```text
{count, plural,
  =0 {No unread messages}
  one {# unread message}
  other {# unread messages}
}
```

זהו שם הארגומנט, מילת המפתח `plural`, תווית לכל ענף, סוגריים מסולסלים מקוננים, והסימן `#` כתו מיוחד שפועל רק בתוך ענפי ריבוי. הוסיפו נושא בעל מגדר וההודעה הופכת למקוננת:

```text
{gender, select,
  female {{count, plural,
    one {She has # unread message}
    other {She has # unread messages}
  }}
  male {{count, plural,
    one {He has # unread message}
    other {He has # unread messages}
  }}
  other {{count, plural,
    one {They have # unread message}
    other {They have # unread messages}
  }}
}
```

תשע מתוך חמש עשרה השורות הן תחביר בלבד. פולנית, למשל, זקוקה לארבעה ענפי ריבוי בכל אחד משלושת ענפי המגדר הללו, כך שהמחרוזת המתורגמת הופכת לגוש סוגריים מסולסלים שבו סוגר `}` חסר בודד שובר את ההודעה כולה, לעיתים קרובות רק בזמן ריצה.

ב-JavaScript אותו מבנה יכול להיות נתונים טהורים: אובייקט שהמפתחות שלו הם קטגוריות ריבוי, הנבדקות על ידי מערכת הטיפוסים והעורך, ללא שום צורך ב-parser בין הקובץ לערך.

## שלמות מגיעה עם מחיר כבד

ICU מכסה מגוון עצום של מקרים:

- `plural` עם התאמות מדויקות (`=0`) ו-`offset:`
- `selectordinal`, עם טבלת סודרים (ordinals) ייעודית של CLDR
- `select`, הניתן לקינון בכל עומק
- ארגומנטי `number`, `date` ו-`time`, בשמות מסורתיים (`number, currency`) ובשלדים (`::currency/EUR compact-short`)
- כללי ציטוט ומילוט (`'{'`, `''`)
- תגיות טקסט עשיר במימושים מסוימים (`<b>…</b>`)

ספרייה שטוענת לתאימות 1:1 עם ICU חייבת לספק את כל המנגנונים הללו, מכיוון שאינה יכולה לדעת בזמן הבנייה באילו תכונות ההודעות שלכם ישתמשו. בפועל המשמעות היא:

1. **מנתח (Parser)** שהופך את מחרוזת ההודעה לעץ תחבירי (AST), כולל טיפול בשגיאות של סוגריים פגומים.
2. **מנתח שלדים (Skeleton parser)** עבור תחביר המספרים והתאריכים של `::`, המהווה שפה קטנה בפני עצמה.
3. **מעצב (Formatter)** הסורק את ה-AST וממפה כל צומת אל `Intl.PluralRules`, `Intl.NumberFormat` ו-`Intl.DateTimeFormat`.

החלק השלישי הוא דק מאוד, שכן ב-JavaScript מודרני לוגיקת ה-CLDR כבר מובנית בתוך `Intl`. שני החלקים הראשונים קיימים אך ורק כדי לפענח תחביר. ב-`intl-messageformat` מבית FormatJS, מימוש הייחוס שעליו בנויות `react-intl` ו-`next-intl`, מדובר בכ-**10 KB של JavaScript מכווץ** הנשלחים לכל גולש, עוד לפני מחרוזת התוכן הראשונה שלכם.

רוב האפליקציות משתמשות בחלק זעיר בלבד: אינטרפולציה של `{name}` וכמה בלוקים של `plural`. הן עדיין מורידות את ה-parser עבור שלדים, סודרים ו-offsets, מכיוון ששום דבר במחרוזת המנותחת בזמן ריצה אינו מאותת ל-bundler מה ניתן להסיר (tree-shaking).

## next-intl נתקלה באותה בעיה בדיוק

אין מדובר בחשש תיאורטי בלבד. `next-intl`, אחת הספריות הנפוצות ביותר המבוססות על ICU, הגיעה לאותה מסקנה. בגרסה 4.8 (ינואר 2026) היא הוסיפה אפשרות ניסיונית בשם `precompile` המנתחת הודעות ICU בזמן בנייה לתוך AST קומפקטי ומחליפה את ה-parser בזמן ריצה במעריך (evaluator) קטן. הפרויקט מדווח על כ-**9 KB של JavaScript מכווץ שנחסכו** על ידי הפעלת הדגל.

הפשרה מדגימה את גבולות הגישה: `t.raw` אינו עובד עם precompilation, מכיוון שמחרוזת ה-ICU הגולמית אינה קיימת עוד בזמן ריצה. ברגע שמפסיקים לנתח בדפדפן, אינכם שולחים עוד ICU. אתם שולחים ייצוג מקומפל שלו, ותחביר המחרוזת נותר רק פורמט הכתיבה.

בשלב זה נשאלת השאלה המתבקשת: אם הדפדפן לעולם אינו קורא את המחרוזת, מדוע שמפתחים ומתרגמים יכתבו אותה כך מלכתחילה?

## כיצד נראית גישה מותאמת אישית ל-JavaScript (JS-Native)

JavaScript כבר מספקת את החלק המורכב. `Intl.PluralRules` יודע שלפולנית יש ארבע קטגוריות כמותיות ולאנגלית ארבע קטגוריות סידוריות. `Intl.NumberFormat` ו-`Intl.DateTimeFormat` מטפלים במטבעות, יחידות, סימון מקוצר ולוחות שנה. מה שנותר הוא לבחור ענף ולהזריק ערכים, פעולה הדורשת שורות קוד בודדות ברגע שהמבנה הוא נתונים ולא מחרוזת.

זהו בדיוק המודל שבו משתמשת Intlayer. פיצול תנאים הוא פונקציה בתוך הצהרת תוכן בעלת טיפוסים, וכל שפה מצהירה אך ורק על הקטגוריות שהדקדוק שלה דורש:

```typescript fileName="**/*.content.ts"
import { gender, plural, t, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox",
  content: {
    unread: t({
      "he-IL": plural({
        one: "הודעה אחת שלא נקראה",
        other: "{{count}} הודעות שלא נקראו",
      }),
      en: plural({
        one: "{{count}} unread message",
        other: "{{count}} unread messages",
      }),
      pl: plural({
        one: "{{count}} nieprzeczytana wiadomość",
        few: "{{count}} nieprzeczytane wiadomości",
        many: "{{count}} nieprzeczytanych wiadomości",
        other: "{{count}} nieprzeczyטanej wiadomości",
      }),
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx"
const { unread } = useIntlayer("inbox");

unread(5); // בשפה העברית ← "5 הודעות שלא נקראו"
```

מה משתנה בהשוואה ל-ICU:

- **ללא parser בחבילה (bundle).** המבנה מגיע לדפדפן כאובייקט מוכן. הפונקציה `plural` בוחרת מפתח באמצעות `Intl.PluralRules`, שכבר קיים בדפדפן.
- **שגיאות מועברות לזמן הבנייה.** ענף חסר או מפתח שגוי הם שגיאת טיפוסים (type error), ולא מחרוזת שבורה המתגלה רק בסביבת ייצור.
- **עיצוב נשאר מחוץ להודעה.** מספרים, תאריכים ומטבעות מעובדים דרך [hooks ייעודיים לעיצוב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md) שעוטפים ישירות את `Intl`, כך שאין צורך לנתח שפת שלדים (skeletons).
- **תכונות שאינן בשימוש אינן עולות דבר.** אם אף הודעה אינה משתמשת ב-`gender`, ה-bundler משמיט אותה לחלוטין.

- [hooks לעיצוב נתונים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)

כמובן שישנן גם חסרונות ממשיים: נדרש שלב בנייה (build step), קובצי התוכן הם קוד ולא מחרוזות טקסט פשוטות, וכלי TMS מסוימים מצפים למחרוזות ICU ולא יקראו ישירות קובצי הצהרת תוכן.

## מתי ICU הוא עדיין הבחירה הנכונה

ICU נשארת הבחירה העדיפה כאשר:

- **צינור התרגום שלכם בנוי סביבו.** כלי TMS רבים מייבאים ומייצאים מחרוזות ICU, ומתרגמים מיומנים בעבודה עם תחביר זה.
- **ההודעות משותפות בין פלטפורמות שונות.** אותו קטלוג המזין אפליקציית iOS, אפליקציית Android ואתר ווב הוא סיבה מצוינת להישאר עם פורמט אחיד וסטנדרטי.
- **כבר קיים קטלוג ICU גדול ומבוסס.** שכתוב של אלפי הודעות לעיתים נדירות מצדיק את עצמו בפני עצמו.

במקרה האחרון, אינכם חייבים לבחור בין שכתוב לבין השארת ה-parser בזמן ריצה. [מתאם תאימות react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/react-intl.md) של Intlayer קורא מחרוזות ICU קיימות (`plural`, `select`, `selectordinal`, `#`, ותחביר ישן של `number` / `date` / `time`), ומאפשר לכם להגר בהדרגה ולשלם את עלות ה-ICU רק במקומות שבהם ההודעות הישנות עדיין זקוקות לו.

- [מתאם תאימות react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/react-intl.md)

## סיכום

ICU MessageFormat פתר בעיה אמיתית: דקדוק שייך למתרגמים, ולא ל-`if (count === 1)` בקוד האפליקציה. הוא פתר אותה עבור סביבות ריצה שבהן ניתוח של שפת מחרוזות אינו עולה דבר. בדפדפן, תאימות מלאה פירושה שליחת parser עבור תכונות שרוב האפליקציות אינן צריכות לעולם, וספריות מבוססות ICU נאלצות כעת לקמפל את הודעותיהן מראש כדי לחמוק מכך.

ל-JavaScript כבר יש את כללי CLDR מובנים בתוך `Intl`. מה שהיא צריכה מפורמט i18n הוא מבנה ההתפצלות, ואת זה ניתן לבטא בצורה הטובה ביותר כנתונים (data).

## להעמקה נוספת

- [פורמט הודעות ICU: תחביר, ריבוי ו-select](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/icu_message_format.md)
- [תוכן ריבוי ב-Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md)
- [תוכן מבוסס Select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/select.md)
- [מבחן ביצועים לספריות i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)
- [האם next-intl מיושנת?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/is_next-intl_outdated.md)
