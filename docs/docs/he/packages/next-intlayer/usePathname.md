---
createdAt: 2026-06-22
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק usePathname | next-intlayer
description: "השתמש ב-usePathname ב-Next.js כדי לקרוא את הנתיב הנוכחי ללא מקטע השפה שלו, עבור ניווט מותאם שפה וקישורים פעילים."
keywords:
  - usePathname
  - pathname
  - locale
  - נתיב
  - Intlayer
  - בינאום
  - תיעוד
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "הוספת כלי העזר usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "אתחול היסטוריה"
author: aymericzip
---

# שילוב ב-Next.js: תיעוד ההוק `usePathname`

ההוק `usePathname` מחזיר את נתיב ה-Next.js הנוכחי לאחר הסרת מקטע השפה. הוא שימושי לבניית ניווט מותאם שפה (לדוגמה, קביעה איזה פריט ניווט פעיל כעת) מבלי שתצטרך להסיר ידנית את קידומת השפה.

## ייבוא `usePathname` ב-Next.js

```typescript
import { usePathname } from "next-intlayer";
```

## סקירה כללית

`usePathname` עוטף את `usePathname()` המובנה של Next.js מ-`next/navigation`, מצרף פרמטרי חיפוש (search params), ומסיר את קידומת השפה באמצעות `getPathWithoutLocale`. הוא מרנדר מחדש בכל ניווט בצד הלקוח. ההוק זמין רק ברכיבי לקוח (דורש `"use client"`).

## שימוש

```tsx fileName="src/components/NavItem.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FC<NavItemProps> = ({ href, label }) => {
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

| טיפוס    | תיאור                                                                  |
| -------- | ---------------------------------------------------------------------- |
| `string` | הנתיב הנוכחי ללא קידומת השפה ופרמטרי שאילתה לאחר הסרת פרמטר השפה שלהם. |

## התנהגות

- **הסרת שפה (Locale stripping)**: מסיר את מקטע השפה הפותח (לדוגמה `/en/dashboard` ← `/dashboard`).
- **הסרת פרמטרי חיפוש**: מסיר גם את פרמטר השאילתה `?locale=...` כאשר נעשה שימוש במצב ניתוב של search-params.
- **תגובתיות (Reactive)**: מתעדכן בכל ניווט בצד הלקוח דרך Next.js App Router.
- **בטוח ל-SSR**: מחזיר את נתיב צד-השרת במהלך הרינדור הראשון, ולאחר מכן מסנכרן פרמטרי חיפוש בלקוח.

## השוואה עם `useLocale`

`useLocale` מ-`next-intlayer` כבר חושף את `pathWithoutLocale` כחלק מהערך המוחזר שלו. השתמש ב-`usePathname` כאשר אתה זקוק רק לנתיב ואינך זקוק לפונקציונליות החלפת שפה.

```tsx codeFormat={["typescript", "esm"]}
// כאשר אתה זקוק גם למצב השפה וגם לנתיב:
import { useLocale } from "next-intlayer";
const { locale, pathWithoutLocale } = useLocale();

// כאשר אתה זקוק רק לנתיב:
import { usePathname } from "next-intlayer";
const pathname = usePathname();
```

## דוגמה

```tsx fileName="src/components/Sidebar.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Settings" },
];

const Sidebar: FC = () => {
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

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/next-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getPathWithoutLocale.md)
