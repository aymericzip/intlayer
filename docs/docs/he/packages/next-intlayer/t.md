---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: תיעוד הפונקציה t | next-intlayer
description: "השתמש בפונקציה t מתוך next-intlayer כדי להגדיר תרגומים מוטבעים (inline) ברכיבי ה-Next.js שלך, ללא צורך בקובץ תוכן נפרד."
keywords:
  - t
  - תרגום
  - Intlayer
  - next-intlayer
  - בינאום
  - תיעוד
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - t
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "עדכון לארכיטקטורת Next.js >= 9.4.0"
  - version: 5.5.10
    date: 2025-06-29
    changes: "התחלת היסטוריה"
author: aymericzip
---

# תיעוד: פונקציית `t` ב-`next-intlayer`

הפונקציה `t` בחבילת `next-intlayer` היא כלי בסיסי לבינאום מוטבע (inline) בתוך יישום ה-Next.js שלך. היא מאפשרת לך להגדיר תרגומים ישירות בתוך הרכיבים שלך, מה שמקל על הצגת תוכן מותאם שפתית בהתבסס על השפה הנוכחית.

## סקירה כללית

הפונקציה `t` משמשת לאספקת תרגומים עבור שפות שונות ישירות ברכיבים שלך. על ידי העברת אובייקט המכיל תרגומים עבור כל שפה נתמכת, `t` מחזירה את התרגום המתאים בהתבסס על קונטקסט השפה הנוכחי ביישום ה-Next.js שלך.

## תכונות מרכזיות

- **תרגומים מוטבעים (Inline Translations)**: אידיאלי עבור טקסט קצר ומהיר שאינו דורש הצהרת תוכן נפרדת.
- **בחירת שפה אוטומטית**: מחזירה אוטומטית את התרגום המתאים לשפה הנוכחית.
- **תמיכה ב-TypeScript**: מספקת בטיחות טיפוסים והשלמה אוטומטית בשימוש עם TypeScript.
- **שילוב פשוט**: פועלת בצורה חלקה הן ברכיבי לקוח והן ברכיבי שרת ב-Next.js.

## חתימת הפונקציה

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### פרמטרים

- `translations`: אובייקט שבו המפתחות הם קודי שפה (לדוגמה `he`, `en`, `fr`, `es`) והערכים הם מחרוזות התרגום המתאימות.

### ערך מוחזר

- מחרוזת המייצגת את התוכן המתורגם עבור השפה הנוכחית.

## דוגמאות שימוש

### שימוש ב-`t` ברכיב לקוח (Client Component)

ודא שאתה כולל את ההנחיה `'use client';` בראש קובץ הרכיב שלך בעת שימוש ב-`t` ברכיב צד-לקוח.

```tsx codeFormat={["typescript", "esm", "commonjs"]}
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      he: "זהו תוכן של דוגמת רכיב לקוח",
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

### שימוש ב-`t` ברכיב שרת (Server Component)

```tsx codeFormat={["typescript", "esm", "commonjs"]}
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      he: "זהו תוכן של דוגמת רכיב שרת",
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

### תרגומים מוטבעים במאפיינים (Attributes)

הפונקציה `t` שימושית במיוחד עבור תרגומים מוטבעים במאפייני JSX. בעת התאמת מאפיינים כמו `alt`, `title`, `href` או `aria-label`, ניתן להשתמש ב-`t` ישירות בתוך המאפיין.

```jsx
<button
  aria-label={t({
    he: "שלח",
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    he: "שלח",
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      he: "נוף יפה",
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

## נושאים מתקדמים

### שילוב עם TypeScript

הפונקציה `t` בטוחה מבחינת טיפוסים בשימוש עם TypeScript, ומבטיחה שכל השפות הנדרשות מסופקות.

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  he: "ברוכים הבאים",
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### זיהוי שפה וקונטקסט

ב-`next-intlayer`, השפה הנוכחית מנוהלת באמצעות ספקי קונטקסט: `IntlayerClientProvider` ו-`IntlayerServerProvider` (או פשוט `IntlayerProvider` עבור גרסאות Intlayer >= 9.4). ודא שספקים אלה עוטפים את הרכיבים שלך ושמאפיין ה-`locale` מועבר כהלכה.

#### דוגמה:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx codeFormat={["typescript", "esm", "commonjs"]}
import type { FC, ReactNode } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales; children: ReactNode }> = ({
  locale,
  children,
}) => <IntlayerProvider locale={locale}>{children}</IntlayerProvider>;
```

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx codeFormat={["typescript", "esm", "commonjs"]}
import type { FC, ReactNode } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales; children: ReactNode }> = ({
  locale,
  children,
}) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

 </Tab>
</Tabs>

## שגיאות נפוצות ופתרון בעיות

### `t` מחזירה ערך Undefined או תרגום שגוי

- **סיבה**: השפה הנוכחית אינה מוגדרת כראוי, או שהתרגום עבור השפה הנוכחית חסר.
- **פתרון**:
  - ודא ש-`IntlayerProvider` (או `IntlayerClientProvider`/`IntlayerServerProvider`) מוגדר כראוי עם ה-`locale` המתאים.
  - ודא שאובייקט התרגומים שלך כולל את כל השפות הנדרשות.

### תרגומים חסרים ב-TypeScript

- **סיבה**: אובייקט התרגומים אינו מכיל את כל השפות הנדרשות, מה שמוביל לשגיאות TypeScript.
- **פתרון**: השתמש בטיפוס `IConfigLocales` כדי לאכוף את שלמות התרגומים שלך.

```typescript codeFormat={["typescript", "esm", "commonjs"]}
const translations: IConfigLocales<string> = {
  he: "טקסט",
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // השמטת 'es' תגרום לשגיאת TypeScript [!code error]
};

const text = t(translations);
```

## טיפים לשימוש יעיל

1. **השתמש ב-`t` עבור תרגומים מוטבעים פשוטים**: אידיאלי לתרגום קטעי טקסט קטנים ישירות בתוך הרכיבים שלך.
2. **העדף את `useIntlayer` עבור תוכן מובנה**: עבור תרגומים מורכבים יותר ושימוש חוזר בתוכן, הגדר תוכן בקובצי הצהרה והשתמש ב-`useIntlayer`.
3. **אספקת שפה עקבית**: ודא שהשפה שלך מסופקת באופן עקבי לאורך כל היישום באמצעות הספקים המתאימים.
4. **נצל את היתרונות של TypeScript**: השתמש בטיפוסי TypeScript כדי לזהות תרגומים חסרים ולהבטיח בטיחות טיפוסים.

## סיכום

הפונקציה `t` ב-`next-intlayer` היא כלי רב-עוצמה ונוח לניהול תרגומים מוטבעים ביישומי ה-Next.js שלך. על ידי שילובה ביעילות, תוכל לשפר את יכולות הבינאום של היישום שלך ולהעניק חוויה טובה יותר למשתמשים בכל רחבי העולם.

למידע נוסף על שימוש מתקדם ותכונות נוספות, עיין ב-[תיעוד next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md).

- [תיעוד next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)

**הערה**: זכור להגדיר את ה-`IntlayerProvider` (או `IntlayerClientProvider` ו-`IntlayerServerProvider`) שלך כראוי כדי להבטיח שהשפה הנוכחית מועברת בצורה תקינה לרכיבים שלך. הדבר חיוני כדי שהפונקציה `t` תחזיר את התרגומים הנכונים.
