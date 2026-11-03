---
createdAt: 2026-06-22
updatedAt: 2026-11-03
priority: 5
title: תיעוד ה-Composable usePathname | vue-intlayer
description: "השתמש ב-usePathname ב-Vue כדי לקרוא את הנתיב הנוכחי ללא מקטע השפה שלו, כ-computed ref עבור ניווט מותאם שפה."
keywords:
  - usePathname
  - pathname
  - locale
  - נתיב
  - שפה
  - Intlayer
  - בינאום
  - תיעוד
  - Vue
  - JavaScript
slugs:
  - doc
  - packages
  - vue-intlayer
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

# שילוב ב-Vue: תיעוד ה-Composable `usePathname`

ה-composable `usePathname` מחזיר את נתיב הדפדפן הנוכחי ללא מקטע השפה, כ-`ComputedRef<string>` תגובתי. הוא שימושי לבניית ניווט מותאם שפה (לדוגמה, קביעה איזה פריט ניווט פעיל כעת) מבלי להסיר ידנית את קידומת השפה.

## ייבוא `usePathname` ב-Vue

```typescript
import { usePathname } from "vue-intlayer";
```

## סקירה כללית

`usePathname` קורא את `window.location.pathname`, מסיר את קידומת השפה באמצעות `getPathWithoutLocale`, ומתעדכן אוטומטית כאשר הדפדפן מפעיל אירוע `popstate` (ניווט אחורה/קדימה). התוצאה נחשפת כ-`ComputedRef<string>` כך שהיא משתלבת באופן טבעי עם מערכת התגובתיות של Vue.

## שימוש

```vue fileName="src/components/NavItem.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const props = defineProps<{
  href: string;
  label: string;
}>();

const pathname = usePathname();
</script>

<template>
  <a :href="href" :aria-current="pathname === href ? 'page' : undefined">
    {{ label }}
  </a>
</template>
```

## ערך מוחזר

| טיפוס                 | תיאור                                                       |
| --------------------- | ----------------------------------------------------------- |
| `ComputedRef<string>` | ‏Computed ref תגובתי המכיל את הנתיב הנוכחי ללא קידומת השפה. |

## התנהגות

- **הסרת שפה (Locale stripping)**: מסיר את מקטע השפה הפותח (לדוגמה `/fr/dashboard` ← `/dashboard`).
- **תגובתיות (Reactive)**: מתעדכן אוטומטית באירועי `popstate` (ניווט אחורה/קדימה בדפדפן).
- **בטוח ל-SSR**: מחזיר מחרוזת ריקה `""` כאשר `window` אינו זמין.
- **ניקוי (Cleanup)**: מאזין ה-`popstate` מוסר אוטומטית כאשר הרכיב מוסר מזיכרון ה-DOM (`onUnmounted`).

## דוגמה

```vue fileName="src/components/Sidebar.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Settings" },
];

const pathname = usePathname();
</script>

<template>
  <nav>
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :style="{ fontWeight: pathname === link.href ? 'bold' : 'normal' }"
    >
      {{ link.label }}
    </a>
  </nav>
</template>
```

## תיעוד קשור

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/vue-intlayer/exports.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getPathWithoutLocale.md)
