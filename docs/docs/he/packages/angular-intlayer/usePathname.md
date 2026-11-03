---
createdAt: 2026-06-22
updatedAt: 2026-11-03
priority: 5
title: "תיעוד ה-Hook usePathname | angular-intlayer"
description: "השתמש ב-usePathname ב-Angular כדי לקרוא את שם הנתיב הנוכחי ללא מקטע השפה שלו, כ-Signal עבור ניווט מותאם שפה."
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - בינאום
  - תיעוד
  - Angular
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - angular-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "הוספת פונקציית העזר usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# אינטגרציית Angular: תיעוד ה-Hook `usePathname`

ה-Hook `usePathname` מחזיר את שם הנתיב (pathname) הנוכחי בדפדפן כאשר מקטע השפה מוסר, כ-Angular `Signal<string>`. הוא שימושי לבניית ניווט מותאם שפה (לדוגמה, קביעה איזה פריט ניווט פעיל) מבלי שתצטרך להסיר ידנית את קידומת השפה.

## ייבוא `usePathname` ב-Angular

```typescript
import { usePathname } from "angular-intlayer";
```

## סקירה כללית

`usePathname` קורא את `window.location.pathname`, מסיר את קידומת השפה באמצעות `getPathWithoutLocale`, ומעדכן את ה-signal בכל פעם שהדפדפן מעורר אירוע `popstate` (ניווט קדימה/אחורה). הוא משתמש ב-`DestroyRef` של Angular כדי לנקות את מאזין האירועים באופן אוטומטי כאשר הרכיב מושמד.

## שימוש

```typescript fileName="src/app/nav-item.component.ts"
import { Component, input } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-nav-item",
  template: `
    <a
      [href]="href()"
      [attr.aria-current]="pathname() === href() ? 'page' : null"
    >
      {{ label() }}
    </a>
  `,
})
export class NavItemComponent {
  readonly href = input.required<string>();
  readonly label = input.required<string>();

  readonly pathname = usePathname();
}
```

## ערך מוחזר

| טיפוס            | תיאור                                                    |
| ---------------- | -------------------------------------------------------- |
| `Signal<string>` | Angular signal המכיל את שם הנתיב הנוכחי ללא קידומת השפה. |

## התנהגות

- **הסרת שפה (Locale stripping)**: מסיר את מקטע השפה המוביל (למשל, `/fr/dashboard` ← `/dashboard`).
- **ריאקטיבי**: מתעדכן אוטומטית באירועי `popstate` (ניווט אחורה / קדימה בדפדפן).
- **בטוח ל-SSR**: מחזיר `""` כאשר `window` אינו זמין.
- **ניקוי (Cleanup)**: מאזין ה-`popstate` מוסר באמצעות `DestroyRef.onDestroy` כאשר הרכיב המארח מושמד.

## דוגמה

```typescript fileName="src/app/sidebar.component.ts"
import { Component } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-sidebar",
  template: `
    <nav>
      @for (link of links; track link.href) {
        <a
          [href]="link.href"
          [style.font-weight]="pathname() === link.href ? 'bold' : 'normal'"
        >
          {{ link.label }}
        </a>
      }
    </nav>
  `,
})
export class SidebarComponent {
  readonly links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/settings", label: "Settings" },
  ];

  readonly pathname = usePathname();
}
```

## תיעוד קשור

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/angular-intlayer/exports.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getPathWithoutLocale.md)
