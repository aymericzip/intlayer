---
createdAt: 2026-06-22
updatedAt: 2026-11-03
priority: 5
title: תיעוד הפונקציה usePathname | svelte-intlayer
description: "השתמש ב-usePathname ב-Svelte כדי לקרוא את הנתיב הנוכחי ללא מקטע השפה שלו, כחנות קריאה (readable store) עבור ניווט מותאם שפה."
keywords:
  - usePathname
  - pathname
  - locale
  - נתיב
  - שפה
  - Intlayer
  - בינאום
  - תיעוד
  - Svelte
  - JavaScript
slugs:
  - doc
  - packages
  - svelte-intlayer
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

# שילוב ב-Svelte: תיעוד `usePathname`

הפונקציה `usePathname` מחזירה את נתיב הדפדפן הנוכחי ללא מקטע השפה, כחנות קריאה (`Readable<string>`) של Svelte. היא שימושית לבניית ניווט מותאם שפה (לדוגמה, קביעה איזה פריט ניווט פעיל כעת) מבלי להסיר ידנית את קידומת השפה.

## ייבוא `usePathname` ב-Svelte

```typescript
import { usePathname } from "svelte-intlayer";
```

## סקירה כללית

`usePathname` יוצר חנות קריאה (readable store) של Svelte הקוראת מתוך `window.location.pathname`, מסירה את קידומת השפה באמצעות `getPathWithoutLocale`, ופולטת ערך חדש בכל פעם שהדפדפן מפעיל אירוע `popstate` (ניווט אחורה/קדימה). ניתן להירשם לחנות באמצעות תחביר ה-`$` ברכיבים.

## שימוש

```svelte fileName="src/components/NavItem.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  export let href: string;
  export let label: string;

  const pathname = usePathname();
</script>

<a {href} aria-current={$pathname === href ? "page" : undefined}>
  {label}
</a>
```

## ערך מוחזר

| טיפוס              | תיאור                                                        |
| ------------------ | ------------------------------------------------------------ |
| `Readable<string>` | חנות קריאה של Svelte המכילה את הנתיב הנוכחי ללא קידומת השפה. |

## התנהגות

- **הסרת שפה (Locale stripping)**: מסיר את מקטע השפה הפותח (לדוגמה `/fr/dashboard` ← `/dashboard`).
- **תגובתיות (Reactive)**: פולט ערך חדש בכל אירוע `popstate` (ניווט אחורה/קדימה בדפדפן).
- **בטוח ל-SSR**: מחזיר מחרוזת ריקה `""` כאשר `window` אינו זמין.
- **ניקוי (Cleanup)**: מאזין ה-`popstate` מוסר אוטומטית כאשר המנוי האחרון מבטל את הרישום.

## דוגמה

```svelte fileName="src/components/Sidebar.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/settings", label: "Settings" },
  ];

  const pathname = usePathname();
</script>

<nav>
  {#each links as link}
    <a
      href={link.href}
      style:font-weight={$pathname === link.href ? "bold" : "normal"}
    >
      {link.label}
    </a>
  {/each}
</nav>
```

## תיעוד קשור

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/svelte-intlayer/exports.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getPathWithoutLocale.md)
