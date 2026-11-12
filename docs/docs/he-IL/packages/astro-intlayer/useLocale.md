---
createdAt: 2026-09-19
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק useLocale | astro-intlayer
description: גלה כיצד להשתמש בהוק useLocale ביישומי Astro כדי לגשת לשפה הנוכחית ולנהל אותה.
keywords:
  - useLocale
  - שפה
  - locale
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - astro-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "התחלת תיעוד"
author: aymericzip
---

# תיעוד ההוק useLocale

ההוק `useLocale` מתוך `astro-intlayer` מספק גישה לשפת הבקשה הנוכחית, לשפת ברירת המחדל שהוגדרה ולכל השפות הזמינות ביישומי Astro.

הוא מתנהג בעקביות הן ב-frontmatter של `.astro` המרונדר בשרת והן בבלוקי `<script>` בצד הלקוח.

## שימוש

### ב-Frontmatter של רכיב (מרונדר בשרת)

```astro fileName="src/layouts/Layout.astro"
---
import { useLocale } from "astro-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

const { locale, defaultLocale, availableLocales } = useLocale();
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<!DOCTYPE html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <title>Astro + Intlayer</title>
  </head>
  <body>
    <header>
      <span>Current: {locale}</span>
      <span>Default: {defaultLocale}</span>
      <nav>
        <ul>
          {availableLocales.map((localeItem) => (
            <li key={localeItem} className="p-1">
              <a
                href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                aria-current={localeItem === locale ? "page" : undefined}
              >
                {localeItem.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    <slot />
  </body>
</html>
```

### ב-`<script>` של הלקוח (אינטראקטיבי)

```astro fileName="src/components/LocaleSwitcher.astro"
---
import { useLocale } from "astro-intlayer";

const { locale, availableLocales } = useLocale();
---

<select id="locale-select">
  {availableLocales.map((loc) => (
    <option value={loc} selected={loc === locale}>
      {loc.toUpperCase()}
    </option>
  ))}
</select>

<script>
  import { useLocale, setLocaleInStorage } from "astro-intlayer";

  const { setLocale } = useLocale();

  document.getElementById("locale-select")?.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    setLocale(target.value);
  });
</script>
```

## ערכים מוחזרים

ההוק מחזיר אובייקט מטיפוס `UseLocaleResult`:

| מאפיין             | טיפוס                                  | תיאור                                                                             |
| ------------------ | -------------------------------------- | --------------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`                      | השפה הפעילה.                                                                      |
| `defaultLocale`    | `DeclaredLocales`                      | שפת ברירת המחדל לגיבוי שהוגדרה ב-`intlayer.config.ts`.                            |
| `availableLocales` | `DeclaredLocales[]`                    | מערך של כל השפות הנתמכות שהוגדרו לפרויקט.                                         |
| `setLocale`        | `(locale: LocalesValues) => void`      | פונקציה לעדכון השפה. (אינטראקטיבית ב-`<script>` של הלקוח, מציגה אזהרה במהלך SSR). |
| `subscribe`        | `(callback: () => void) => () => void` | הרשמה כמנוי לשינויי שפה בצד הלקוח.                                                |

## התנהגות שרת לעומת לקוח

- **במהלך SSR / רינדור שרת**: בקשה מרונדרת פעם אחת עם פרמטרים קבועים. קריאה ל-`setLocale()` במהלך רינדור שרת אינה משפיעה ומציגה אזהרה; החלפת שפה צריכה להתבצע בלקוח או על ידי ניווט ל-URL של שפת היעד.
- **בסקריפטים של הלקוח**: `setLocale` מעדכן את חנות הלקוח ומעדכן עוגיות שמורות או local storage בהתאם לתצורת ה-Intlayer שלך.

## תיעוד קשור

- [אינטגרציית `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/astro-intlayer/intlayer.md)
- [הוק `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/astro-intlayer/useIntlayer.md)
- [הוק `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/astro-intlayer/useDictionary.md)
