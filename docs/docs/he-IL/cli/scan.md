---
createdAt: 2026-06-11
updatedAt: 2026-11-03
priority: 5
title: "intlayer scan: ביקורת i18n ו-SEO של אתר אינטרנט"
description: למד כיצד להשתמש בפקודת scan של Intlayer CLI כדי למדוד את גודל הדף ולבצע ביקורת על תקינות ה-i18n וה-SEO של כל אתר אינטרנט.
keywords:
  - Scan
  - סריקה
  - SEO
  - i18n
  - Audit
  - ביקורת
  - CLI
  - Intlayer
  - Page size
  - גודל דף
  - Bundle
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 9.5.11
    date: 2026-09-26
    changes: "זיהוי אסטרטגיית ניתוב ומחסנית ה-i18n (ספריות, מערכות TMS), הוספת בדיקות הדדיות של hreflang, תגית og:locale ובורר שפות, מעקב אחר מפות אתר ב-robots.txt, אינדקסי מפות אתר ומפות אתר דחוסות"
  - version: 9.5.2
    date: 2026-09-12
    changes: "הוספת דגל `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "הוספת פקודת scan"
author: aymericzip
---

# סריקת אתר אינטרנט (Scan Website)

הפקודה `scan` טוענת כתובת URL ציבורית, מודדת את גודל הדף הכולל ומבצעת ביקורת על תקינות ה-i18n וה-SEO של הדף. היא מפיקה דוח עם ציון (0 עד 100) המכסה מאפייני HTML, קישורים קנוניים (canonical), תגיות hreflang וקישורי החזרה שלהן, robots.txt, מפות אתר (sitemaps), קישורים פנימיים מותאמים לשפה ומשקל שפות בבאנדל ה-JavaScript.

היא גם מדווחת כיצד האתר מקודד את השפה בכתובות ה-URL שלו (אסטרטגיית ניתוב) ובאיזה פריימוורק, ספריית i18n, מערכת ניהול תרגום (TMS) או פרוקסי תרגום נעשה שימוש. אותן בדיקות מפעילות גם את [סורק ה-i18n SEO המקוון](https://intlayer.org/i18n-seo-scanner) ואת תוסף הדפדפן של Intlayer ל-Chrome.

אין צורך בתלויות נוספות. כאשר [puppeteer](https://pptr.dev/) מותקן, הסריקה יכולה ללכוד מקטעי JavaScript הנטענים בטעינה עצלה (lazy-loaded chunks) לצורך ניתוח באנדל מדויק יותר; אחרת היא משתמשת כברירת מחדל בבדיקת סקריפטים הנטענים באופן מיידי ומוצהרים ב-HTML.

## שימוש

```bash packageManager="npm"
npx intlayer scan <url>
```

```bash packageManager="yarn"
yarn intlayer scan <url>
```

```bash packageManager="pnpm"
pnpm intlayer scan <url>
```

```bash packageManager="bun"
bun x intlayer scan <url>
```

### דוגמה

```bash packageManager="npm"
npx intlayer scan https://example.com
```

דוגמה לפלט:

```
🔍 Scanned https://example.com/fr (basic mode)

Score: 91/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: fr, en, es, de
Routing: locale prefix except for the default locale (every hreflang alternate but "en" starts with a locale segment, default locale: en)

Stack:
  Framework Next.js 15.1.0
  i18n library next-intl
  TMS Crowdin
Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ locale signals consistent (lang, URL, hreflang)
  ⚠ og:locale meta tag
      Missing <meta property="og:locale">: social previews default to en_US
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ hreflang alternates link back
  ✓ unused bundle locale content
  ✓ localized internal links
  ⚠ all internal links keep the locale
      2 internal links leave the "fr" locale (0 to another locale, 2 without locale)
        <a href="/pricing">Tarifs</a>
  ✓ crawlable language switcher
  ✓ robots.txt present
  ✓ robots.txt keeps localized URLs crawlable
  ✓ sitemap present
  ✓ sitemap lists every locale
  ✓ sitemap has alternate links
  ✓ sitemap has x-default

Bundle locale weight:
  Translations shipped: 120.50 KB
  Unused (other locales): 45.20 KB (37%)
```

## אפשרויות

### `<url>` (חובה)

כתובת ה-URL המלאה לסריקה (למשל `https://example.com`).

### `--no-deep`

השבתת הסריקה המעמיקה מבוססת הרינדור.

כברירת מחדל הפקודה מנסה להשתמש ב-[puppeteer](https://pptr.dev/) כדי לרנדר את הדף בדפדפן נטול ממשק (headless browser), ללכוד מקטעי JavaScript הנטענים בטעינה עצלה ולמדוד את גודל ההעברה האמיתי ברשת. אם puppeteer אינו מותקן, הפקודה עוברת אוטומטית למצב בסיסי.

העבר את `--no-deep` כדי לכפות מצב בסיסי גם כאשר puppeteer זמין.

> דוגמה: `npx intlayer scan https://example.com --no-deep`

### `--json`

הצגת תוצאת הסריקה המלאה כאובייקט JSON במקום דוח מעוצב. שימושי לצריכה תכנותית או לצינורות CI.

> דוגמה: `npx intlayer scan https://example.com --json`

### אפשרויות תצורה סטנדרטיות

- **`--base-dir`**: ספריית בסיס המשמשת לאיתור קובץ ה-`intlayer.config.*`.
- **`-e, --env`**: סביבת יעד (למשל `development`, `production`).
- **`--env-file`**: נתיב לקובץ `.env` מותאם אישית.
- **`--no-cache`**: השבתת מטמון התצורה.
- **`--ci`**: הרצת הפקודה בכל פרויקט Intlayer במונוריפו (או רק בנוכחי בהרצה מתוך תיקיית פרויקט). ניתן להזריק אישורים דרך `INTLAYER_PROJECT_CREDENTIALS`, מפת JSON של נתיב פרויקט ל-`{ "clientId", "clientSecret" }`.
- **`--verbose`**: הפעלת לוגים מפורטים (ברירת מחדל במצב CLI).
- **`--prefix`**: קידומת לוגים מותאמת אישית.

## אסטרטגיית ניתוב (Routing strategy)

תבנית השפה המשותפת על ידי חלופות ה-hreflang של הדף חושפת כיצד האתר מנתב את שפותיו. ללא חלופות, נעשה שימוש בכתובת ה-URL הנסרקת בלבד (ברמת ביטחון נמוכה).

| אסטרטגיה            | דוגמה                                  |
| ------------------- | -------------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`               |
| `prefix-no-default` | `/about` (שפת ברירת מחדל), `/fr/about` |
| `search-params`     | `/about?lang=fr`                       |
| `subdomain`         | `fr.example.com`                       |
| `domain`            | `example.fr`, `example.de`             |
| `no-prefix`         | כתובת URL אחת לכל שפה (cookie)         |

בדיקות קישורים, קישורים קנוניים, robots.txt ומפות אתר קוראות כל כתובת URL דרך אסטרטגיה זו. לדוגמה, קישור ללא קידומת הוא תקין בשפת ברירת המחדל של אתר בעל `prefix-no-default`, וקישור ללא `?lang=` עוזב את השפה באתר בעל `search-params`.

## מחסנית טכנולוגית שזוהתה (Detected stack)

פריימוורקים, ספריות i18n (כגון Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…), מערכות ניהול תרגום (Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS) ושרתי פרוקסי לתרגום (Weglot, Localize, GTranslate…) מזוהים מתוך ה-HTML, המשאבים הנטענים ובאנדלי ה-JavaScript. מצב Deep בודק גם משתנים גלובליים על גבי window ועוגיות (cookies).

## מה נבדק

| בדיקה                           | תיאור                                                                                  | משקל בציון |
| ------------------------------- | -------------------------------------------------------------------------------------- | ---------- |
| `html lang`                     | `<html lang>` קיים וכולל תגית BCP 47 חוקית                                             | 9          |
| `html dir`                      | `dir="rtl"` מוגדר עבור שפות הנכתבות מימין לשמאל (`ltr` הוא ברירת המחדל)                | 3          |
| `locale signals consistent`     | `<html lang>`, שפת ה-URL ורשומת ה-hreflang העצמית תואמות                               | 5          |
| `og:locale`                     | `og:locale` מוגדר ותואם ל-`<html lang>`                                                | 3          |
| `canonical`                     | קיים קישור קנוני ואינו מצביע על גרסת שפה אחרת                                          | 10         |
| `hreflang`                      | קיימות תגיות hreflang, עם קודים חוקיים, כתובות מוחלטות, ללא כפילויות ועם הפניה עצמית   | 9          |
| `x-default hreflang`            | קיימת חלופת hreflang מסוג `x-default`                                                  | 7          |
| `hreflang alternates link back` | החלופות מחזירות תשובת 200, אינן מופנות מחדש, מקשרות בחזרה ומצהירות על השפה             | 8          |
| `localized links`               | קישורים פנימיים מצביעים על שפת הדף                                                     | 8          |
| `all links keep the locale`     | אין קישור פנימי שמחליף או משמיט את השפה                                                | 6          |
| `language switcher`             | קיימים קישורי `<a href>` הניתנים לסריקה אל גרסאות השפה האחרות                          | 6          |
| `robots.txt present`            | הקובץ `/robots.txt` מחזיר תשובת 200                                                    | 10         |
| `robots.txt localized URLs`     | האתר או כתובות ה-URL המתורגמות שלו אינם חסומים עבור Googlebot                          | 8          |
| `sitemap present`               | מפת אתר נמצאה (הוראות `Sitemap:` ב-robots.txt,‏ `/sitemap.xml`,‏ `/sitemap_index.xml`) | 10         |
| `sitemap locale coverage`       | כל שפה רשומה, ורשומות עם חלופות רושמות גם את עצמן                                      | 9          |
| `sitemap alternates`            | מפת האתר מכילה קישורי חלופה של `hreflang`                                              | 8          |
| `sitemap x-default`             | מפת האתר מכילה `x-default` עבור hreflang                                               | 7          |
| `unused bundle content`         | באנדל ה-JS הראשי אינו כולל תרגומים של שפות אחרות                                       | 8          |

אזהרה מקבלת מחצית מהמשקל. הציון הסופי הוא הסכום המשוקלל של הבדיקות שרצו, מבוטא באחוזים (0 עד 100). בדיקות שנכשלות מדפיסות את הבעיות הראשונות שנמצאו; השתמש ב-`--json` לפרטים המלאים.

## שימוש בפונקציית scan באופן תכנותי

פונקציית `scan` מיוצאת גם מתוך `@intlayer/cli` כך שניתן לקרוא לה מתוך סקריפטים משלך:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

לגישה ברמה נמוכה יותר, פונקציית `scanWebsite` מתוך `@intlayer/engine/scan` מחזירה אובייקט `ScanResult` מובנה:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
