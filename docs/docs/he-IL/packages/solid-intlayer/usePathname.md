---
createdAt: 2026-06-22
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק usePathname | solid-intlayer
description: "השתמש ב-usePathname ב-Solid כדי לקרוא את הנתיב הנוכחי ללא מקטע השפה שלו, כ-accessor עבור ניווט מותאם שפה."
keywords:
  - usePathname
  - pathname
  - locale
  - נתיב
  - שפה
  - Intlayer
  - בינאום
  - תיעוד
  - Solid
  - Solid.js
  - JavaScript
slugs:
  - doc
  - packages
  - solid-intlayer
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

# שילוב ב-Solid: תיעוד ההוק `usePathname`

ההוק `usePathname` מחזיר את נתיב הדפדפן הנוכחי ללא מקטע השפה, כ-`Accessor<string>` של Solid. הוא שימושי לבניית ניווט מותאם שפה (לדוגמה, קביעה איזה פריט ניווט פעיל כעת) מבלי להסיר ידנית את קידומת השפה.

## ייבוא `usePathname` ב-Solid

```typescript
import { usePathname } from "solid-intlayer";
```

## סקירה כללית

`usePathname` יוצר signal תגובתי המאותחל מתוך `window.location.pathname`, מסיר את קידומת השפה באמצעות `getPathWithoutLocale`, ומעדכן את ה-signal בכל פעם שהדפדפן מפעיל אירוע `popstate` (ניווט אחורה/קדימה). מאזין האירועים מנוקה אוטומטית באמצעות `onCleanup`.

## שימוש

```tsx fileName="src/components/NavItem.tsx"
import type { Component } from "solid-js";
import { usePathname } from "solid-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: Component<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();

  return (
    <a href={href} aria-current={pathname() === href ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## ערך מוחזר

| טיפוס              | תיאור                                                                      |
| ------------------ | -------------------------------------------------------------------------- |
| `Accessor<string>` | ‏Accessor של Solid (getter תגובתי) המחזיר את הנתיב הנוכחי ללא קידומת השפה. |

## התנהגות

- **הסרת שפה (Locale stripping)**: מסיר את מקטע השפה הפותח (לדוגמה `/fr/dashboard` ← `/dashboard`).
- **תגובתיות (Reactive)**: מתעדכן אוטומטית באירועי `popstate` (ניווט אחורה/קדימה בדפדפן).
- **בטוח ל-SSR**: מחזיר מחרוזת ריקה `""` כאשר `window` אינו זמין.
- **ניקוי (Cleanup)**: מאזין ה-`popstate` מוסר אוטומטית דרך `onCleanup` של Solid.

## דוגמה

```tsx fileName="src/components/Sidebar.tsx"
import type { Component } from "solid-js";
import { For } from "solid-js";
import { usePathname } from "solid-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Settings" },
];

const Sidebar: Component = () => {
  const pathname = usePathname();

  return (
    <nav>
      <For each={links}>
        {({ href, label }) => (
          <a
            href={href}
            style={{ "font-weight": pathname() === href ? "bold" : "normal" }}
          >
            {label}
          </a>
        )}
      </For>
    </nav>
  );
};

export default Sidebar;
```

## תיעוד קשור

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/solid-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getPathWithoutLocale.md)
