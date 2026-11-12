---
createdAt: 2024-08-13
updatedAt: 2026-11-03
priority: 8
title: "שכתוב כתובות מותאם אישית: נתיבים מקומיים (Custom URL Rewrites)"
description: "למדו כיצד להגדיר ולהשתמש בשכתוב כתובות URL מותאם אישית ב-Intlayer כדי להגדיר נתיבים ספציפיים לשפה."
keywords:
  - שכתוב כתובות
  - Custom URL Rewrites
  - ניתוב
  - בינאום
  - i18n
slugs:
  - doc
  - concept
  - custom_url_rewrites
history:
  - version: 8.0.0
    date: 2026-01-25
    changes: "מימוש שכתוב כתובות URL מרכזי עם מעצבים ספציפיים ל-framework ו-hook של useRewriteURL."
author: aymericzip
---

# מימוש שכתוב כתובות URL מותאם אישית

Intlayer תומך בשכתוב כתובות URL מותאם אישית (custom URL rewrites), מה שמאפשר לכם להגדיר נתיבים ספציפיים לשפה השונים ממבנה ברירת המחדל `/locale/path`. הדבר מאפשר כתובות כגון `/about` עבור אנגלית ו-`/a-propos` עבור צרפתית תוך שמירה על לוגיקת האפליקציה הפנימית קנונית (canonical).

## הגדרות (Configuration)

שכתובים מותאמים אישית מוגדרים בסעיף `routing` בקובץ `intlayer.config.ts` שלכם באמצעות מעצבים (formatters) ספציפיים לכל framework. מעצבים אלו מספקים את התחביר המדויק עבור הנתב המועדף עליכם.

<Tabs group='routers'>
  <Tab label="Next.js" value="nextjs">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nextjsRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-no-default",
        rewrite: nextjsRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="React Router" value="reactrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { reactRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: reactRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="TanStack Router" value="tanstackrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { tanstackRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: tanstackRouterRewrite({
          "/$locale/about": {
            fr: "/$locale/a-propos",
            es: "/$locale/acerca-de",
          },
          "/$locale/products/$id": {
            fr: "/$locale/produits/$id",
            es: "/$locale/productos/$id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Vue Router" value="vuerouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { vueRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: vueRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="SvelteKit" value="sveltekit">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { svelteKitRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: svelteKitRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Solid Router" value="solidrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { solidRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: solidRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Nuxt" value="nuxt">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nuxtRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: nuxtRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
</Tabs>

### מעצבים זמינים (Available Formatters)

Intlayer מספק מעצבים עבור כל שלדי הפיתוח המובילים:

- `nextjsRewrite`: עבור Next.js App Router. תומך ב-`[slug]`, ב-`[...slug]` (1+), וב-`[[...slug]]` (0+).
- `svelteKitRewrite`: עבור SvelteKit. תומך ב-`[slug]`, ב-`[...path]` (0+), וב-`[[optional]]` (0-1).
- `reactRouterRewrite`: עבור React Router. תומך ב-`:slug` וב-`*` (0+).
- `vueRouterRewrite`: עבור Vue Router 4. תומך ב-`:slug`, ב-`:slug?` (0-1), ב-`:slug*` (0+), וב-`:slug+` (1+).
- `solidRouterRewrite`: עבור Solid Router. תומך ב-`:slug` וב-`*slug` (0+).
- `tanstackRouterRewrite`: עבור TanStack Router. תומך ב-`$slug` וב-`*` (0+).
- `nuxtRewrite`: עבור Nuxt 3. תומך ב-`[slug]` וב-`[...slug]` (0+).
- `viteRewrite`: מעצב גנרי לכל פרויקט מבוסס Vite. מנרמל את התחביר עבור ה-proxy של Vite.

### תבניות מתקדמות

Intlayer מנרמל תבניות אלו פנימית לתחביר אחיד, מה שמאפשר התאמה ויצירה מתוחכמות של נתיבים:

- **מקטעים אופציונליים**: נתמכים באמצעות `[[optional]]` (ב-SvelteKit) או `:slug?` (ב-Vue/React).
- **תפיסת הכל (אפס או יותר, Catch-all)**: `[[...slug]]` (ב-Next.js), `[...path]` (ב-SvelteKit/Nuxt), או `*` (ב-React/TanStack) מאפשרים התאמה למספר מקטעים.
- **תפיסת הכל חובה (אחד או יותר)**: `[...slug]` (ב-Next.js) או `:slug+` (ב-Vue) מבטיחים שלפחות מקטע אחד קיים.

## תיקון URL בצד הלקוח: `useRewriteURL`

כדי להבטיח ששורת הכתובות בדפדפן תשקף תמיד את ה-URL המקומי והיפה, Intlayer מספק את ה-hook‏ `useRewriteURL`. ה-hook מעדכן את ה-URL באופן שקט באמצעות `window.history.replaceState` כאשר משתמש נוחת בנתיב קנוני.

### שימוש בשלדי פיתוח

<Tabs group='framework'>
  <Tab label="Next.js" value="nextjs">

    ```tsx
    'use client';

    import { useRewriteURL } from "next-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // מתקן אוטומטית את /fr/about ל-/fr/a-propos
      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="React Router" value="reactrouter">

    ```tsx
    'use client';

    import { useRewriteURL } from "react-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // מתקן אוטומטית את /fr/about ל-/fr/a-propos

      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="Vue" value="vue">

    ```vue
    <script setup>
    import { useRewriteURL } from "vue-intlayer";

    useRewriteURL();
    </script>
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx
    import { useRewriteURL } from "solid-intlayer";

    const Layout = (props) => {
      useRewriteURL();
      return <>{props.children}</>;
    };
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte
    <script>
    import { useRewriteURL } from "svelte-intlayer";

    useRewriteURL();
    </script>
    ```

  </Tab>
</Tabs>

## אינטגרציית נתב ושרתי Proxy

שרתי ה-Proxy של Intlayer בצד השרת (ב-Vite וב-Next.js) מטפלים אוטומטית בשכתובים מותאמים אישית כדי להבטיח עקביות ב-SEO.

1. **שכתובים פנימיים (Internal Rewrites)**: כאשר משתמש מבקר ב-`/fr/a-propos`, הפרוקסי ממפה זאת פנימית ל-`/fr/about` כדי שה-framework שלכם יתאים לנתיב הנכון.
2. **הפניות סמכותיות (Authoritative Redirects)**: אם משתמש מקליד ידנית `/fr/about`, הפרוקסי מנפיק הפניית 301/302 אל `/fr/a-propos`, מה שמבטיח שמנועי חיפוש יאנדקסו רק גרסה אחת של הדף.

### אינטגרציה עם Next.js

אינטגרציית Next.js מנוהלת במלואה דרך ה-middleware של `intlayerProxy`.

```typescript fileName="middleware.ts"
import { intlayerProxy } from "next-intlayer/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerProxy(request);
}
```

### אינטגרציה עם Vite

עבור SolidJS, Vue ו-Svelte, תוסף ה-Vite של `intlayerProxy` מנהל את השכתובים בזמן פיתוח.

> החל מ-Intlayer v9, ה-`intlayerProxy()` ארוז ישירות בתוך התוסף `intlayer()` ומופעל כברירת מחדל דרך האפשרות `routing.enableProxy` (`true` כברירת מחדל). רישומו בנפרד כפי שמוצג להלן הוא כעת אופציונלי. הוא נשמר לצורך תאימות לאחור ועבור מערכות שצריכות לשלוט בסדר התוספים. הגדירו `routing.enableProxy: false` כדי לבטל. עיינו ב[הערות שחרור גרסה v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/releases/v9.md).

- [הערות שחרור גרסה v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/releases/v9.md)

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

## תכונות מרכזיות

### 1. שכתובים בריבוי הקשרים (Multi-Context Rewrites)

כל מעצב מייצר `RewriteObject` המכיל כללים ייעודיים עבור צרכנים שונים:

- `url`: מותאם ליצירת URL בצד הלקוח (מסיר מקטעי שפה).
- `nextjs`: משמר את `[locale]` עבור ה-middleware של Next.js.
- `vite`: משמר את `:locale` עבור ה-proxies של Vite.

### 2. נרמול תבניות אוטומטי

Intlayer מנרמל פנימית את כל תחבירי התבניות (למשל המרת `[param]` ל-`:param`) כך שההתאמה נשארת עקבית ללא תלות ב-framework המקור.

### 3. כתובות URL סמכותיות עבור SEO

על ידי אכיפת הפניות מנתיבים קנוניים לכינויים מותאמים, Intlayer מונע בעיות של תוכן משוכפל ומשפר את יכולת הגילוי של האתר במנועי חיפוש.

## כלי עזר מרכזיים

- `getLocalizedUrl(url, locale)`: מייצר כתובת URL מותאמת לשפה תוך התחשבות בכללי השכתוב.
- `getCanonicalPath(path, locale)`: מפענח כתובת URL מקומית בחזרה לנתיב הקנוני הפנימי שלה.
- `getRewritePath(pathname, locale)`: מזהה אם יש צורך לתקן pathname לכינוי המקומי המעוצב שלו.
