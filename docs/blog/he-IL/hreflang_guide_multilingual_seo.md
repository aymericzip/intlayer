---
createdAt: 2026-08-29
updatedAt: 2026-11-03
priority: 8
title: "Hreflang, מדריך ל-SEO רב-לשוני"
description: "מהו hreflang, הכללים שמנועי חיפוש אוכפים, מדוע x-default כמעט תמיד מוגדר שגוי, וכיצד לייצר תגיות נכונות ב-Next.js וב-TanStack Start."
keywords:
  - hreflang
  - SEO
  - בינאום
  - Intlayer
  - i18n
  - מפת אתר
  - קנוניקל
  - Next.js
  - TanStack Start
slugs:
  - blog
  - hreflang-guide-multilingual-seo
author: aymericzip
---

# Hreflang: המדריך ל-SEO רב-לשוני

תרגמתם את האפליקציה שלכם. השקתם נתיבים כמו `/en`, `/fr`, `/es`. אך משתמשים צרפתים עדיין מגיעים לעמוד באנגלית.

תרגום הוא החצי הקל. החצי המורכב הוא להסביר למנועי החיפוש שהעמודים הללו הם **אותו העמוד בשפה אחרת**, ולא שלושה מסמכים שונים המתחרים זה בזה. זה בדיוק תפקידו של `hreflang`, וזהו המקום שבו אתרים רב-לשוניים רבים מאבדים תנועת גולשים בשקט.

## מהו hreflang בפועל

הערה (annotation) בעמוד האומרת: _לכתובת URL זו קיימות גרסאות מקבילות שם, עבור השפות הללו._

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="es" href="https://example.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

התגית משיגה שתי מטרות: הצגת הגרסה הנכונה למשתמש המתאים, ואיחוד כל השפות לאשכול (cluster) אחד במקום שיתחרו זו בזו כתוכן משוכפל.

חשוב להבהיר מה היא אינה: **היא אינה הפניה (redirect)**, אלא רמז, ו-Google עשויה לעקוף אותה. **היא אינה מקדמת דירוג (ranking boost)**, אלא משנה _איזו_ גרסה תדורג, ולא _האם_ תדורגו. בנוסף, Bing מתעלם ממנה לחלוטין ומסתמך במקום זאת על `content-language` ועל מיקוד גאוגרפי.

## היכן להצהיר עליה

קיימים שלושה מיקומים אפשריים, וכולם תקניים. בחרו באחד והתמידו בו, הצהרה על אותו אשכול בשני מקומות שונים מובילה לסטיות ולחוסר התאמה.

**תגית `<head>` ב-HTML** היא הבחירה הנפוצה ביותר. אזהרה אחת: תגיות המוזרקות לאחר ה-hydration אינן אמינות. אם הפריימוורק שלכם מוסיף אותן רק בצד הלקוח, ייתכן שהזחלן לעולם לא יראה אותן.

**מפת אתר ב-XML (Sitemap)** עדיפה בקנה מידה גדול. עשר שפות על פני 5,000 עמודים משמעותן 50,000 אלמנטים של `<link>` הנשלחים לדפדפנים ללא צורך; במפת אתר זה עולה לעמודים שלכם אפס בתים.

**כותרת HTTP מסוג `Link`** היא האפשרות היחידה עבור קבצים שאינם HTML, כגון מסמכי PDF.

## הכללים

### הפניה עצמית והדדיות (Self-reference and reciprocity)

אשכול התגיות בעמוד `/fr/about` חייב לכלול `hreflang="fr"` המצביע על `/fr/about`. בנוסף, אם `/about` מצביע על `/fr/about`, העמוד `/fr/about` חייב להצביע בחזרה. Google מגדירה הפניה חד-כיוונית כ"תגית ללא חזרה" (no return tag) ומתעלמת ממנה לחלוטין.

בפועל, המשמעות היא ש**כל עמוד באשכול חייב לשלוח בדיוק את אותו סט קישורים**. יצירתם מתוך רשימת שפות משותפת אחת אינה עניין של נוחות בלבד, אלא הדרך היחידה להישאר מדויקים ברגע שיש לכם יותר משתי שפות.

### כתובות URL מוחלטות, תמיד

```html
<!-- מתעלמים מכך בשקט -->
<link rel="alternate" hreflang="fr" href="/fr/about" />

<!-- תקין -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
```

כדאי להבין את הסיבה לכך ולא רק לשנן. התגית `hreflang` היא הפניה בין מסמכים: מנועי חיפוש בונים אשכול שהמפתח שלו הוא כתובת URL, המשותפת לכל עמוד בו. נתיב יחסי תקף אך ורק ביחס למסמך שבו הוא נמצא, ולכן אינו יכול לבטא זאת. הוא גם אינו יכול לחצות שמות מארחים (hosts), בעוד שגרסה חלופית עושה זאת לעיתים קרובות כאשר שפה מוגשת תחת `example.fr` או `fr.example.com`. במפת אתר או בכותרת HTTP אין כלל מסמך בסיס שביחס אליו ניתן לפענח את הנתיב.

לכך יש השלכה ישירה בקוד. הפונקציה `getLocalizedUrl("/about", "fr")` מחזירה `/fr/about`, קלט יחסי מוביל לפלט יחסי. עבור `hreflang` עליכם להזין כתובת URL מוחלטת:

```ts
getLocalizedUrl("/about", "fr"); // → "/fr/about"          ❌ ייזרק
getLocalizedUrl("https://example.com/about", "fr"); // → "https://example.com/fr/about"  ✅
```

החריג היחיד הוא פריימוורק שפותר ערכים יחסיים עבורכם לפני הרינדור: למשל, Next.js מרחיב נתיבי `alternates` יחסיים מול `metadataBase`. זה תקין, אך הכלל חל על ה-**HTML המופק בפועל**, לכן בדקו תמיד באמצעות `curl` ולא דרך ה-DevTools.

### קודי שפה

תקן ISO 639-1 עבור השפה, ותקן ISO 3166-1 Alpha 2 עבור האזור האופציונלי: `fr`, `fr-CA`, `pt-BR`.

שתי מלכודות מפילות כמעט את כולם: אזור בלבד אינו תקין, הערך `hreflang="ca"` מייצג קטלאנית ולא קנדה; עליכם לציין `en-CA` או `fr-CA`. בנוסף, הקוד `en-UK` אינו קיים: קוד המדינה של בריטניה הוא `GB`, ולכן יש להשתמש ב-`en-GB`.

הוסיפו אזור רק כאשר אתם מגישים באמת תוכן שונה לאותו אזור, כגון מחירים שונים או הודעות משפטיות שונות. ציון `fr` ו-`fr-FR` עבור תוכן זהה מייצר רעש מיותר בלבד.

### x-default

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

אחד המושגים שנשכחים בתדירות הגבוהה ביותר, ואינם מובנים כהלכה, הוא `x-default`, פחות מ-30% מהאפליקציות מממשות אותו כראוי.

זהו ה-fallback עבור משתמשים ששפתם אינה תואמת לאף אחת מהשפות באשכול שלכם. דובר הולנדית באתר המציע אנגלית, צרפתית וספרדית אינו תואם לאף רשומה; ללא `x-default`, מנוע החיפוש יבחר גרסה עבורו בעצמו.

הטעות הנפוצה נעוצה בהבנת המשמעות: `x-default` **אינו "הגרסה באנגלית"** ו**אינו "שפת ברירת המחדל"**, למרות שלעיתים קרובות הוא מצביע לשם. משמעותו היא _העמוד המיועד למשתמשים שהאשכול אינו מכסה_. מסיבה זו לגיטימי לחלוטין, ולעיתים קרובות אף עדיף, להפנות אותו לעמוד בחירת שפה או לעמוד נחיתה בעל הפניה גאוגרפית במקום ל-`/en`. אם אין לכם עמוד כזה, שפת ברירת המחדל הראשית שלכם היא הבחירה ההגיונית.

שני דברים שיש לזכור: `x-default` הוא רשומה נוספת בסט, ולא תחליף לרשומה בעלת ההפניה העצמית, וכמו כל רשומה אחרת הוא חייב להופיע בצורה זהה בכל עמוד באשכול.

## מלכודת ה-Canonical

כל עמוד מותאם שפה חייב להיות **ה-canonical של עצמו**:

```html
<!-- בעמוד https://example.com/fr/about -->
<link rel="canonical" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="en" href="https://example.com/about" />
```

הפניית ה-canonical של כל שפה לגרסה האנגלית במקום זאת:

```html
<!-- בעמוד https://example.com/fr/about  -  פוגע בעמוד -->
<link rel="canonical" href="https://example.com/about" />
```

מודיעה למנוע החיפוש שהעמוד הצרפתי הוא תוכן משוכפל שאין לאנדקס אותו, בעוד ש-`hreflang` טוען שזהו העמוד שיש להציג למשתמשים צרפתים. האותות סותרים זה את זה, תגית ה-canonical מנצחת, והעמודים הצרפתיים שלכם נפלטים מאינדקס החיפוש.

**תגית Canonical היא הפניה עצמית לכל שפה. תגית `hreflang` מתארת את האשכול השלם.**

## בחירת מבנה כתובות URL

התגית `hreflang` מסמנת כתובות URL, ולכן המבנה קודם לכל.

| מבנה                           | דוגמה             | פשרה מרכזית                                          |
| ------------------------------ | ----------------- | ---------------------------------------------------- |
| **תת-תיקיות (Subdirectories)** | `example.com/fr/` | דומיין יחיד, סמכות משותפת, אות גאוגרפי חלש יותר      |
| **תת-דומיינים (Subdomains)**   | `fr.example.com`  | קל להוסיף או להסיר שפה, עלול להיתפס כאתר נפרד        |
| **ccTLDs**                     | `example.fr`      | האות החזק ביותר למדינה, בניית סמכות נפרדת לכל דומיין |

תת-תיקיות הן ברירת המחדל הנכונה עבור מרבית הפרויקטים. פנו ל-ccTLDs רק כאשר אתם פועלים בפועל כעסקים נפרדים בכל מדינה ומדינה.

המבנה האחד שיש להימנע ממנו: הגשת שפות שונות ב**אותה כתובת URL** על בסיס `Accept-Language` או כתובת IP. זחלנים יראו גרסה אחת ויאנדקסו גרסה אחת בלבד; כל שאר השפות יישארו בלתי נראות.

> Intlayer תומכת בכל שלושת המבנים באמצעות `routing.mode` ו-`routing.domains`. עיינו ב-[דומיינים מותאמים אישית](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/custom_domains.md) וב-[מדריך הקונפיגורציה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [דומיינים מותאמים אישית](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/custom_domains.md)
- [מדריך קונפיגורציה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

## מימוש בפועל

כתיבה ידנית של תגיות אלו אינה שורדת הוספה של שפה נוספת. גזרו אותן תמיד מתוך רשימת השפות המוגדרת שלכם.

<Steps>
<Step number={1} title="הפקת האשכול בכל עמוד">

אותו סט קישורים בכל מקום, canonical לכל שפה, כתובות URL מוחלטות, ו-`x-default` כלול.

<Tabs>

<Tab label="Next.js" value="nextjs">

ה-Metadata API של Next.js חושף את `alternates.languages`, והפונקציה `getMultilingualUrls` בונה את כל הרשומה מתוך השפות שהוגדרו:

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

const SITE_URL = "https://example.com";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  /**
   * getMultilingualUrls(`${SITE_URL}/about`) מחזירה:
   * {
   *   en: 'https://example.com/about',
   *   fr: 'https://example.com/fr/about',
   *   es: 'https://example.com/es/about',
   * }
   */
  const multilingualUrls = getMultilingualUrls(`${SITE_URL}/about`);

  return {
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": `${SITE_URL}/about` },
    },
  };
};
```

מדריך מלא: [מדריך בינאום ב-Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md).

- [מדריך בינאום ב-Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)

</Tab>

<Tab label="TanStack Start" value="tanstack">

פונקציית ה-`head` של הנתיב בונה את הקישורים. הפונקציה `localeMap` רצה על פני השפות המוגדרות שלכם, כך שהוספת שפה לקונפיגורציה מוסיפה אותה בכל המקומות בו-זמנית:

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getLocalizedUrl, localeMap } from "intlayer";

const SITE_URL = "https://example.com";

export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const url = `${SITE_URL}/about`;

    return {
      links: [
        { rel: "canonical", href: getLocalizedUrl(url, locale) },

        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(url, mapLocale),
        })),

        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(url, defaultLocale),
        },
      ],
    };
  },
});
```

פונקציית `head` רצה בשרת, כך שהתגיות מגיעות ישירות ב-HTML הראשוני. מדריך מלא: [מדריך בינאום ב-TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md).

- [מדריך בינאום ב-TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md)

</Tab>

</Tabs>

</Step>
<Step number={2} title="או העברת הכל למפת האתר (Sitemap)">

באתרים גדולים, מומלץ להרחיק את הסימונים הללו מתוך קוד העמודים לחלוטין. הפונקציה `generateSitemap` מפיקה חלופות `xhtml:link` לכל רשומה, תוך קריאת השפות ומצב הניתוב מתוך הקונפיגורציה שלכם:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { generateSitemap } from "intlayer";

const sitemap = generateSitemap(
  [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/about", changefreq: "monthly", priority: 0.8 },
  ],
  { siteUrl: "https://example.com" }
);
```

שתי אפשרויות שחשוב להכיר:

- `xhtmlLinks` (ברירת מחדל `true`): חלופות מופקות רק במקום שבו כתובות ה-URL של השפות אכן שונות. במצב `no-prefix` כל השפות חולקות כתובת URL אחת, ולכן הן מושמטות אלא אם `routing.domains` מגדיר שמות מארחים נפרדים לכל שפה.
- `entryPerLocale` (ברירת מחדל `false`): כברירת מחדל, רשומת `<url>` אחת נושאת את כל החלופות. שתי הצורות תקניות, אך רק כתובת URL המופיעה כ-`<loc>` נספרת ככזו שהוגשה (_submitted_) ב-Search Console; שפות המוגדרות כחלופות בלבד ניתנות לגילוי אך אינן משויכות למפת אתר ספציפית. הפעלת אפשרות זו מעניקה לכל URL מותאם שפה רשומה משלו עם סט החלופות המלא. פעולה זו מכפילה את כמות הרשומות במספר השפות, לכן שימו לב למגבלה של 50,000 כתובות URL / 50 MB ופצלו ל-sitemap index במידת הצורך.

</Step>
<Step number={3} title="אימות מה שהזחלן מקבל בפועל">

התגית `hreflang` נכשלת בשקט, לכן בדקו אותה במקום להניח שהיא עובדת.

בדקו את קוד המקור ולא את ה-inspector בדפדפן: הרצת `curl https://example.com/fr/about | grep hreflang` מציגה בדיוק מה שהזחלן מקבל; כלי ה-DevTools מציגים את ה-DOM לאחר שקוד ה-JavaScript כבר רץ. לאחר מכן, עקבו אחר כל קישור חלופי וודאו שהוא מצביע בחזרה עם סט קישורים זהה לחלוטין, ושאף אחד מהם אינו מבצע הפניה (redirect). דוח ה-International Targeting ב-Search Console תופס את שאר הבעיות לרוחב האתר כולו.

עבור סריקה ייעודית לרב-לשוניות, ה-[Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner) בודק תגיות חסרות, חלופות שבורות וקונפליקטים מול תגית canonical בכל העמודים המותאמים שלכם.

</Step>

</Steps>

## רשימת בדיקה (Checklist)

- [ ] לכל שפה יש כתובת URL ייחודית הניתנת לסריקה
- [ ] כל עמוד כולל הפניה עצמית, וכל הפניה היא הדדית
- [ ] אותו סט קישורים נשלח בכל עמוד ועמוד באשכול
- [ ] כל ערכי `href` הם כתובות מוחלטות ב-HTML המופק
- [ ] הקודים תואמים ל-ISO 639-1 ול-ISO 3166-1 Alpha 2 (`en-GB` ולא `en-UK`)
- [ ] התגית `x-default` קיימת ומצביעה לאן שמשתמשים ללא שפה תואמת צריכים להגיע
- [ ] תגית Canonical היא בעלת הפניה עצמית לכל שפה
- [ ] התגיות מרונדרות בשרת ולא מוזרקות לאחר ה-hydration
- [ ] ההצהרה מבוצעת במקום אחד בלבד
- [ ] אף קישור חלופי אינו מבצע הפניה (redirect)

## לסיכום

השימוש ב-`hreflang` פשוט אך אינו סולח על טעויות. תגית חזרה אחת חסרה, כתובת URL יחסית אחת, או תגית canonical אחת שחוצה שפות, והאשכול כולו נזרק ללא כל הודעת שגיאה. כל השגיאות הללו נובעות מכתיבה ידנית של התגיות.

גזרו את הסט מתוך רשימת שפות אחת, רנדרו אותו בצד השרת, שמרו על תגית canonical עם הפניה עצמית, והקדישו ל-`x-default` את תשומת הלב הראויה לו. עשו זאת פעם אחת נכון, ותקינות ה-SEO הרב-לשוני תפסיק להיות משימת תחזוקה מתמדת.

### קריאה נוספת

- [SEO ובינאום](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/internationalization_and_SEO.md)
- [השוואת SEO רב-לשוני ו-i18n ב-Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/nextjs-multilingual-seo-comparison.md)
- [מדריך בינאום ב-Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)
- [מדריך בינאום ב-TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md)
- [דומיינים מותאמים אישית לכל שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/custom_domains.md)
- [מדריך קונפיגורציה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)
