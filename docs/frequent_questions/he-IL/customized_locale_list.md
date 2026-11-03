---
createdAt: 2025-05-20
updatedAt: 2026-11-03
priority: 4
title: כיצד להתאים אישית את רשימת השפות?
description: "התאם אישית את רשימת השפות ש-Intlayer תומכת בהן ב-intlayer.config.ts, כולל וריאנטים אזוריים ושפת ברירת המחדל."
keywords:
  - locales
  - שפות
  - list
  - רשימה
  - intlayer
  - configuration
  - הגדרות
  - availableLocales
  - defaultLocale
  - useLocale
  - hook
  - locale
slugs:
  - frequent-questions
  - customized-locale-list
author: aymericzip
---

# האם אפשר לחסום סוג שפה, למשל אנגלית? אני מוסיף אנגלית למילונים שלי אך עדיין לא רוצה שאנגלית תהיה זמינה באתר

כן, ניתן לחסום סוג שפה, כמו אנגלית, באמצעות האפשרות `availableLocales` בהגדרות של Intlayer.

```ts
import { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  locales: [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH],
  availableLocales: [Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.FRENCH,
};
```

או

```ts
import { IntlayerConfig } from "intlayer";

const locales = [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH];

const config: IntlayerConfig = {
  locales,
  availableLocales: locales.filter((locale) => locale !== Locales.ENGLISH),
  defaultLocale: Locales.FRENCH,
};
```

הגדרה זו תשנה את הטיפוסים (types) של פונקציית ה-`t()` שלך כך שתכלול אך ורק את השפות הזמינות.

האפשרות `availableLocales` היא אופציונלית, אם אינך מספק אותה, כל השפות יהיו זמינות.

שים לב, כל השפות הנכללות באפשרות `availableLocales` חייבות להיכלל גם באפשרות `locales`.

שים לב שאם אתה משתמש ב-hook בשם `useLocale`, האפשרות `availableLocales` תשמש לקביעת הגישה לרשימת השפות.

```ts
import { useLocale } from "react-intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // [Locales.FRENCH, Locales.SPANISH]
```
