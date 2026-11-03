---
createdAt: 2026-09-19
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק useLocale | remix-intlayer
description: גלה כיצד להשתמש בהוק useLocale ביישומי Remix כדי לקבל את שפת הבקשה הנוכחית, שפת ברירת המחדל והשפות הזמינות.
keywords:
  - useLocale
  - שפה
  - locale
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - remix-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "התחלת תיעוד"
author: aymericzip
---

# תיעוד ההוק useLocale

ההוק `useLocale` מתוך `remix-intlayer` מספק גישה לשפת בקשת ה-HTTP המטופלת כעת, יחד עם שפת ברירת המחדל והשפות הזמינות שהוגדרו לפרויקט.

## שימוש

ברכיב Remix (לדוגמה בורר שפה):

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { Link } from "@remix-run/react";
import { useLocale } from "remix-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales } = useLocale();
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <nav>
      <ul>
        {availableLocales.map((localeItem) => (
          <li key={localeItem} className="p-1">
            <Link
              href={getLocalizedUrl(pathWithoutLocale, localeItem)}
              aria-current={localeItem === locale ? "page" : undefined}
            >
              {localeItem.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

במטפל נתיב (Route handler):

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/locale-info", () => {
  const { locale, defaultLocale, availableLocales } = useLocale();

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

## ערכים מוחזרים

ההוק מחזיר אובייקט מטיפוס `UseLocaleResult`:

| מאפיין             | טיפוס               | תיאור                                                    |
| ------------------ | ------------------- | -------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | השפה שפוענחה עבור הבקשה הנוכחית.                         |
| `defaultLocale`    | `DeclaredLocales`   | שפת ברירת המחדל לגיבוי שהוגדרה ב-`intlayer.config.ts`.   |
| `availableLocales` | `DeclaredLocales[]` | מערך של כל השפות הזמינות שהוגדרו ב-`intlayer.config.ts`. |

## תיאור

1. **פענוח תחום לבקשה (Request-Scoped Resolution)**: בבקשה פעילה המטופלת על ידי ה-middleware של `intlayer()`, ההוק `useLocale` קורא את השפה המפוענחת מתוך אחסון הבקשה.
2. **נסיגה חלקה (Graceful Fallback)**: אם נקרא מחוץ לקונטקסט בקשה (כגון במהלך סקריפטים של אתחול או חבילות בדיקה), ברירת המחדל שלו היא ה-`defaultLocale` שהוגדר.

## תיעוד קשור

- [תוכנת תיווך `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/remix-intlayer/intlayerMiddleware.md)
- [הוק `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/remix-intlayer/useIntlayer.md)
- [הוק `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/remix-intlayer/useDictionary.md)
