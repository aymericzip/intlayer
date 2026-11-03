---
createdAt: 2025-05-20
updatedAt: 2026-11-03
priority: 4
title: כיצד להגדיר ניתוב מבוסס דומיין?
description: "הגש כל שפה מתוך דומיין ייעודי משלה באמצעות ניתוב מבוסס דומיין של Intlayer, המוגדר ב-intlayer.config.ts כאשר הפניות מטופלות עבורך."
keywords:
  - domain
  - דומיין
  - routing
  - ניתוב
  - intlayer
  - configuration
  - הגדרות
  - middleware
  - react-router
  - vue-router
  - next.js
  - vite
  - framework
slugs:
  - frequent-questions
  - domain-routing
author: aymericzip
---

# כיצד להגדיר ניתוב מבוסס דומיין עם Intlayer במקום נתיבי `/[locale]/`?

## תשובה קצרה

ניתוב מבוסס דומיין פשוט יותר מניתוב מבוסס נתיב (`example.com/[locale]/`), מכיוון שניתן לוותר על כל הגדרות ה-middleware והניתוב. כל מה שצריך הוא לפרוס את האפליקציה שלך לכל דומיין שפה ולהגדיר משתנה סביבה אחד לכל דומיין.

## צעד אחר צעד

1. **בצע פריסה נפרדת לכל דומיין** (`example.com`, `exemple.fr`, `ejemplo.es`, ...).
2. בכל פריסה, הגדר את `LOCALE` (ואת משתני הסביבה הרגילים של Intlayer) לשפה שאותו דומיין אמור להגיש.
3. הפנה למשתנה זה כ-`defaultLocale` בקובץ `intlayer.config.[ts|js]`.

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: process.env.LOCALE, // 👈 הדומיין קובע את השפה
  },
  // ... שאר ההגדרות שלך
};

export default config;
```

זה הכל. זה עובד באותו אופן עבור **Next.js**, **Vite + React**, **Vite + Vue** וכו'.

## מה אם כל הדומיינים פונים לאותה הפריסה?

אם כל הדומיינים מצביעים על אותו ה-bundle של האפליקציה, תצטרך לזהות את ה-host בזמן ריצה (runtime) ולהעביר את השפה באופן ידני דרך ה-provider.

### עבור Next.js

```tsx
// src/IntlayerProvider.tsx
import {
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
} from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import type { FC } from "react";

export const IntlayerProvider: FC<IntlayerClientProviderProps> = ({
  children,
  locale,
}) => {
  const resolvedLocale = locale ?? getLocaleFromHostname();
  return (
    <IntlayerServerProvider locale={resolvedLocale}>
      <IntlayerClientProvider locale={resolvedLocale}>
        {children}
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

### עבור Vue

```ts
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import { router } from "./routes";

const app = createApp(App);
app.use(router);
installIntlayer(app, getLocaleFromHostname());
app.mount("#app");
```

החלף את `getLocaleFromHostname()` בלוגיקת האיתור שלך.

## עדכון בורר השפה שלך

כאשר משתמשים בניתוב מבוסס דומיין, החלפת שפה פירושה מעבר לדומיין אחר:

```ts
const { locale } = useLocale();

function changeLanguage(target: Locale) {
  window.location.href = domainForLocale[target];
}
```

## יתרונות של ניתוב מבוסס דומיין

1. **הגדרה פשוטה יותר**: אין צורך להגדיר את `intlayerProxy`, `generateStaticParams`, `react-router` או `vue-router`.
2. **SEO טוב יותר**: לכל שפה יש דומיין משלה.
3. **כתובות URL נקיות יותר**: ללא קידומת שפה בנתיב.
4. **תחזוקה קלה יותר**: פריסת כל שפה מתבצעת באופן עצמאי.
