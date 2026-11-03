---
createdAt: 2026-06-22
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק usePathname | preact-intlayer
description: "השתמש ב-usePathname ב-Preact כדי לקרוא את הנתיב הנוכחי ללא מקטע השפה שלו, עבור ניווט מותאם שפה וקישורים פעילים."
keywords:
  - usePathname
  - pathname
  - locale
  - נתיב
  - שפה
  - Intlayer
  - בינאום
  - תיעוד
  - Preact
  - JavaScript
slugs:
  - doc
  - packages
  - preact-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "הוספת כלי העזר usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "התחלת היסטוריה"
author: aymericzip
---

# שילוב ב-Preact: תיעוד ההוק `usePathname`

ההוק `usePathname` מחזיר את נתיב הדפדפן הנוכחי ללא מקטע השפה. הוא שימושי לבניית ניווט מותאם שפה (לדוגמה, קביעה איזה פריט ניווט פעיל כעת) מבלי להסיר ידנית את קידומת השפה.

## ייבוא `usePathname` ב-Preact

```typescript
import { usePathname } from "preact-intlayer";
```

## סקירה כללית

`usePathname` קורא את `window.location.pathname`, מסיר את קידומת השפה באמצעות `getPathWithoutLocale`, ומרנדר מחדש את הרכיב בכל פעם שהדפדפן מפעיל אירוע `popstate` (ניווט אחורה/קדימה). הוא מחזיר מחרוזת ריקה במהלך רינדור בצד השרת.

## שימוש

```tsx fileName="src/components/NavItem.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FunctionComponent<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## ערך מוחזר

| טיפוס    | תיאור                                                            |
| -------- | ---------------------------------------------------------------- |
| `string` | הנתיב הנוכחי ללא קידומת השפה. מחרוזת ריקה במהלך רינדור בצד השרת. |

## התנהגות

- **הסרת שפה (Locale stripping)**: מסיר את מקטע השפה הפותח (לדוגמה `/en/dashboard` ← `/dashboard`).
- **תגובתיות (Reactive)**: מתעדכן אוטומטית באירועי `popstate` (ניווט אחורה/קדימה בדפדפן).
- **בטוח ל-SSR**: מחזיר מחרוזת ריקה `""` כאשר `window` אינו זמין.
- **ניקוי (Cleanup)**: מאזין ה-`popstate` מוסר אוטומטית כאשר הרכיב מוסר מזיכרון ה-DOM (unmounts).

## דוגמה

```tsx fileName="src/components/Sidebar.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Settings" },
];

const Sidebar: FunctionComponent = () => {
  const pathname = usePathname();

  return (
    <nav>
      {links.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          style={{ fontWeight: pathname === href ? "bold" : "normal" }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};

export default Sidebar;
```

## תיעוד קשור

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/preact-intlayer/exports.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getPathWithoutLocale.md)
