---
createdAt: 2026-09-02
updatedAt: 2026-11-03
priority: 8
title: "כיצד לבדוק תרגומים מבלי לכתוב בדיקות שבריריות"
description: מה כדאי לבדוק באפליקציית i18n ומה לא. בדיקות רינדור מבוססות Provider, פסאודו-לוקליזציה, כיסוי RTL וריבוי (plurals), ומלכודת ה-snapshots.
keywords:
  - בדיקת תרגומים
  - בדיקות i18n
  - testing library i18n
  - פסאודו-לוקליזציה
  - בדיקת locale provider
  - snapshot test i18n
slugs:
  - blog
  - i18n-testing-strategies
author: aymericzip
---

# כיצד לבדוק תרגומים מבלי לכתוב בדיקות שבריריות

מרבית מערכי הבדיקות של i18n נכשלים באחת משתי דרכים. או שהם מבצעים assertions על טקסט מילולי מדויק, כך שכל שינוי ניסוח שובר חמישים בדיקות והצוות פשוט מוחק אותן. או שהם מרנדרים הכל ב-locale ברירת המחדל, ובכך אינם מוכיחים דבר לגבי שבע עשרה השפות האחרות. שתי הגישות מובילות לאותה תוצאה: מערך בדיקות שאף אחד לא סומך עליו.

## תוכן עניינים

<TOC/>

## התבניות אינן תלויות בספרייה ספציפית

כל תבנית להלן פועלת בכל סטאק של i18n. החליפו את ה-provider ב-`I18nextProvider`, `NextIntlClientProvider` או `IntlProvider` והבדיקות יישארו זהות לחלוטין, מכיוון שהן בודקות את הפלט המרונדר ולא את ה-API של הספרייה.

גם כלי בדיקת הכיסוי ניתנים להתאמה: עם [תוסף Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) המכוון לקטלוגים הקיימים שלכם, או [compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md) שיוצר alias לייבוא הנוכחי שלכם, בדיקת הכיסוי מתבצעת ישירות מול ה-JSON שכבר קיים אצלכם.

- [תוסף Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md)

## החליטו מה אתם באמת בודקים

איכות התרגום אינה בדיקה אוטומטית. שום assertion לא יגיד לכם האם הגרמנית נשמעת טבעית, והעמדת פנים אחרת היא הדרך הבטוחה לקבל מערך בדיקות עמוס במחרוזות מקודדות (hardcoded).

מה ששווה לבדוק הוא הצד המכני:

| שווה לבדוק                                     | לא שווה לבדוק                       |
| :--------------------------------------------- | :---------------------------------- |
| לכל locale נדרש קיים ערך                       | האם הניסוח מוצלח                    |
| ה-locale הנכון מגיע לקומפוננטה                 | הטקסט המדויק של כל תווית            |
| צורות ריבוי (Plurals) נפתרות עבור כל קטגוריה   | שהמתרגם עשה את עבודתו               |
| שפות RTL מגדירות כיווניות והיפוך               | כל מחרוזת בכל locale                |
| תאריכים ומספרים מעוצבים משתמשים ב-locale הנכון | התקינות של מימוש `Intl` של צד שלישי |

בדיקת כיסוי שייכת לבדיקה אחת מונעת נתונים (data-driven test), ולא לבדיקות הקומפוננטה שלכם. נושא זה מוסבר במאמר על [זיהוי תרגומים חסרים](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/detecting_missing_translations.md); פוסט זה מתמקד בכל השאר.

- [זיהוי תרגומים חסרים](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/detecting_missing_translations.md)

## רנדרו תחת Provider, בצעו Assertion על Role

התבנית המרכזית היא לטעון (mount) את הקומפוננטה בתוך locale provider ולבצע שאילתות לפי role או test id במקום לפי טקסט מילולי.

```tsx fileName="CartSummary.test.tsx"
import { render, screen } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";
import { CartSummary } from "./CartSummary";

test("renders the summary heading in French", () => {
  render(
    <IntlayerProvider locale="fr-FR">
      <CartSummary />
    </IntlayerProvider>
  );

  expect(screen.getByRole("heading")).toBeInTheDocument();
});
```

שאילתה באמצעות `getByRole("heading")` שורדת שינויי ניסוח בטקסט. `getByText("Récapitulatif")` לא תשרוד. השתמשו במחרוזת המילולית רק כאשר המחרוזת עצמה היא מושא הבדיקה, דבר שקורה לעיתים רחוקות.

עבור attributes כגון `aria-label` אתם זקוקים למחרוזת הגולמית במקום ל-renderable node. ב-React, רשומות `useIntlayer` חושפות שדה `.value` לשם כך.

## פרמטריזציה בין שפות שונות (Locales)

גוף בדיקה יחיד שרץ על פני כל ה-locales שווה הרבה יותר מבדיקה נפרדת לכל שפה.

```tsx fileName="direction.test.tsx"
import { getHTMLTextDir } from "intlayer";
import { render } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";

describe.each(["en", "fr", "ja", "ar"])("locale %s", (locale) => {
  it("renders without falling back to the key", () => {
    const { container } = render(
      <IntlayerProvider locale={locale}>
        <CartSummary />
      </IntlayerProvider>
    );

    // מפתח שמרונדר ישירות מעיד על כשל בשליפת התרגום.
    expect(container.textContent).not.toMatch(/^[a-z]+(\.[a-z]+)+$/);
  });

  it("sets the correct text direction", () => {
    expect(getHTMLTextDir(locale)).toBe(locale === "ar" ? "rtl" : "ltr");
  });
});
```

ה-assertion הראשון הוא רווח גנרי מהיר: אם השליפה נכשלת והספרייה מרנדרת את המפתח במקום ערך מתורגם, ה-DOM יכיל מבנה שנראה כמו `cart.summary.title`. זה תופס מחלקה שלמה של באגים מבלי לציין מחרוזת ספציפית אחת.

## פסאודו-לוקליזציה מגלה מה שקטלוגים מפספסים

הוסיפו locale מדומה שמשנה כל מחרוזת, למשל `Checkout` שהופך ל-`[!!! Çĥéçķöũţ !!!]`. לאחר מכן רנדרו דף באמצעותו.

כל מה שעדיין מופיע באנגלית רגילה הוא מחרוזת מקודדת ישירות (hardcoded), ושום בדיקה מבוססת קטלוג לא תוכל לזהות זאת, מכיוון שמבחינת הכלים המחרוזת פשוט אינה קיימת. הסוגריים המרובעים ממלאים תפקיד נוסף: הם מאריכים את הטקסט בכ-30 אחוזים, מה שחושף בעיות עימוד (layout) שנשברות בגרמנית עוד לפני שגרמנית נבדקת.

מומלץ להריץ בדיקה זו כחלק מסבב בדיקות ויזואליות או בדיקות מקצה לקצה (end-to-end) ולא כבדיקת יחידה, מכיוון שהכישלון הוא דבר שיש לראות בעין.

## צורות ריבוי דורשות בדיקה לכל קטגוריה, לא לכל שפה

באגים בריבוי נוטים להסתתר כי באנגלית יש רק שתי צורות ורוב המפתחים בודקים רק אותן. בפולנית יש ארבע צורות, ובערבית שש.

```ts fileName="plural.test.ts"
// ערבית מפעילה את הקטגוריות zero, one, two, few, many, other.
describe.each([0, 1, 2, 3, 11, 100])("count %i", (count) => {
  it("produces a non-empty string in Arabic", () => {
    expect(formatItems(count, "ar")).not.toBe("");
  });
});
```

בחרו כמויות שמפעילות כל קטגוריית CLDR עבור השפה התובענית ביותר שלכם, במקום לבדוק 1 ו-2 בלבד בכל מקום. `Intl.PluralRules` יספר לכם לאיזו קטגוריה שייך מספר מסוים, כך שתוכלו לגזור את קבוצת הבדיקה באופן מחושב במקום לנחש. פרטים נוספים על הקטגוריות נמצאים ב[פוסט על פורמט הודעות ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/icu_message_format.md).

- [הפוסט על פורמט הודעות ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/icu_message_format.md)

## מלכודת ה-Snapshots

בדיקות Snapshot ו-i18n אינן שילוב מוצלח. Snapshot של קומפוננטה מתורגמת מקודד כל מחרוזת בתוכה, כך שמתרגם שמתקן שגיאת כתיב בפורטוגזית צובע באדום סוויטת בדיקות ירוקה, בתוך קובץ שאף סוקר קוד לא יכול להעריך באמת. אחרי הפעם השלישית, מישהו מריץ `-u` בלי לקרוא את ה-diff, וה-snapshots מפסיקים להיות בעלי משמעות.

אם אתם מעוניינים ב-snapshots, צלמו אותם ב-locale אחד בלבד, והתייחסו לכך כבדיקה מבנית ולא כבדיקת תוכן. כל מה שספציפי ל-locale שייך ל-assertions מפורשים.

## בדקו את ה-Negotiation, לא רק את הרינדור

הבאג הנפוץ ביותר בייצור (production) סביב i18n אינו מחרוזת חסרה. אלא בחירה של ה-locale הלא נכון: כתובת ה-URL מציינת `/fr/`, הלקוח קורא את `navigator.language`, והם אינם תואמים.

בדקו את סדר ההכרעה ישירות, כפונקציה טהורה, בנפרד מכל קומפוננטה:

```ts fileName="locale-resolution.test.ts"
it("prefers the URL over the stored preference", () => {
  expect(resolveLocale({ url: "/fr/about", stored: "de", header: "ja" })).toBe(
    "fr"
  );
});

it("falls back to the header when the URL has no prefix", () => {
  expect(resolveLocale({ url: "/about", stored: null, header: "ja" })).toBe(
    "ja"
  );
});
```

זוהי בדיקת ה-i18n בעלת הערך הגבוה ביותר שחסרה במרבית בסיסי הקוד, והיא אינה דורשת שום DOM.

## מה להריץ והיכן

- **בדיקות יחידה (Unit)**: הכרעת locale (negotiation), מעצבים (formatters), קטגוריות ריבוי. מהירות, ללא DOM.
- **בדיקות קומפוננטה (Component)**: רינדור יחיד מבוסס provider לכל locale, עם assertions על roles ועל היעדר מפתחות גולמיים.
- **כיסוי (Coverage)**: בדיקה יחידה מונעת נתונים המאמתת שאין שפות נדרשות חסרות.
- **ויזואלי או מקצה לקצה (End-to-end)**: סבב פסאודו-לוקליזציה ודף RTL אחד, מכיוון שכשלים אלו הם ויזואליים במהותם.

שמרו את שלוש הראשונות ב-pipeline בכל commit. האחרונה זולה להרצה לילית (nightly) ויקרה להרצה בכל push.

## טעויות נפוצות

- **ביצוע Assertions על טקסט מילולי בכל מקום.** מבטיח שמערך הבדיקות יימחק בתוך רבעון.
- **שימוש ב-Snapshots לקומפוננטות מתורגמות.** מתרגמים שוברים את ה-build, וסוקרים מאשרים את העדכון באופן עיוור.
- **בדיקת locale ברירת המחדל בלבד.** השפה האחת שמובטח שלא תחסר.
- **בדיקת 1 ו-2 בלבד עבור צורות ריבוי.** מפספסת כל קטגוריה שאינה קיימת באנגלית.
- **ביצוע Mock לספריית ה-i18n לחלוטין.** במצב זה אתם בודקים שה-mock שלכם מחזיר מחרוזות ותו לא.
- **אי-בדיקה של מנגנון ה-Negotiation.** הכשל הנפוץ ביותר בעולם האמיתי, והקל ביותר לבדיקה.

## להעמקה נוספת

- [בדיקת התוכן שלכם: בדיקת CLI, API תכנותי ו-Assertions ב-UI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/testing.md)
- [תוסף ESLint: תפיסת מחרוזות מקודדות ותוכן ללא שימוש](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md)
- [מעצבים (Formatters) וכלי עזר ל-locale, כולל `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)
- [דוחות ביצועים (Benchmarks) בין פריימוורקים שונים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)
- [מתאם compat תחליפי עבור react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/react-i18next.md)
- [כיצד למצוא תרגומים חסרים](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/detecting_missing_translations.md)
- [פורמט הודעות ICU: ריבוי, select ו-skeletons](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/icu_message_format.md)
