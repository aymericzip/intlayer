---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: תיעוד הפונקציה t | react-intlayer
description: "השתמש בפונקציה t מתוך react-intlayer כדי להגדיר תרגומים מוטבעים (inline) ברכיבי ה-React שלך, ללא צורך בקובץ תוכן נפרד."
keywords:
  - t
  - תרגום
  - Intlayer
  - בינאום
  - תיעוד
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "התחלת היסטוריה"
author: aymericzip
---

# תיעוד: פונקציית `t` ב-`react-intlayer`

הפונקציה `t` בחבילת `react-intlayer` היא כלי בסיסי לבינאום מוטבע (inline) בתוך יישום ה-React שלך. היא מאפשרת לך להגדיר תרגומים ישירות בתוך הרכיבים שלך, מה שמקל על הצגת תוכן מותאם שפתית בהתבסס על השפה הנוכחית.

## סקירה כללית

הפונקציה `t` משמשת לאספקת תרגומים עבור שפות שונות ישירות ברכיבים שלך. על ידי העברת אובייקט המכיל תרגומים עבור כל שפה נתמכת, `t` מחזירה את התרגום המתאים בהתבסס על קונטקסט השפה הנוכחי ביישום ה-React שלך.

## תכונות מרכזיות

- **תרגומים מוטבעים (Inline Translations)**: אידיאלי עבור טקסט קצר ומהיר שאינו דורש הצהרת תוכן נפרדת.
- **בחירת שפה אוטומטית**: מחזירה אוטומטית את התרגום המתאים לשפה הנוכחית.
- **תמיכה ב-TypeScript**: מספקת בטיחות טיפוסים והשלמה אוטומטית בשימוש עם TypeScript.
- **שילוב קל ופשוט**: פועלת בצורה חלקה בתוך רכיבי React.

## חתימת הפונקציה

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### פרמטרים

- `translations`: אובייקט שבו המפתחות הם קודי שפה (לדוגמה `he`, `en`, `fr`, `es`) והערכים הם מחרוזות התרגום המתאימות.

### ערך מוחזר

- מחרוזת המייצגת את התוכן המתורגם עבור השפה הנוכחית.

## דוגמאות שימוש

### שימוש בסיסי ב-`t` בתוך רכיב

```tsx fileName="src/components/ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          he: "זוהי דוגמה לרכיב",
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
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
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  he: "ברוכים הבאים",
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### זיהוי שפה וקונטקסט

ב-`react-intlayer`, השפה הנוכחית מנוהלת באמצעות `IntlayerProvider`. ודא שספק זה עוטף את הרכיבים שלך ושמאפיין ה-`locale` מועבר כהלכה.

#### דוגמה:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* הרכיבים שלך כאן */}</IntlayerProvider>
);
```

## שגיאות נפוצות ופתרון בעיות

### `t` מחזירה ערך Undefined או תרגום שגוי

- **סיבה**: השפה הנוכחית אינה מוגדרת כראוי, או שהתרגום עבור השפה הנוכחית חסר.
- **פתרון**:
  - ודא ש-`IntlayerProvider` מוגדר כראוי עם ה-`locale` המתאים.
  - ודא שאובייקט התרגומים שלך כולל את כל השפות הנדרשות.

### תרגומים חסרים ב-TypeScript

- **סיבה**: אובייקט התרגומים אינו מכיל את כל השפות הנדרשות, מה שמוביל לשגיאות TypeScript.
- **פתרון**: השתמש בטיפוס `IConfigLocales` כדי לאכוף את שלמות התרגומים שלך.

```typescript codeFormat={["typescript", "esm", "commonjs"]}
const translations: IConfigLocales<string> = {
  he: "טקסט",
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // השמטת 'es' תגרום לשגיאת TypeScript
};

const text = t(translations);
```

## טיפים לשימוש יעיל

1. **השתמש ב-`t` עבור תרגומים מוטבעים פשוטים**: אידיאלי לתרגום קטעי טקסט קטנים ישירות בתוך הרכיבים שלך.
2. **העדף את `useIntlayer` עבור תוכן מובנה**: עבור תרגומים מורכבים יותר ושימוש חוזר בתוכן, הגדר תוכן בקובצי הצהרה והשתמש ב-`useIntlayer`.
3. **אספקת שפה עקבית**: ודא שהשפה שלך מסופקת באופן עקבי לאורך כל היישום באמצעות ה-`IntlayerProvider`.
4. **נצל את היתרונות של TypeScript**: השתמש בטיפוסי TypeScript כדי לזהות תרגומים חסרים ולהבטיח בטיחות טיפוסים.

## סיכום

הפונקציה `t` ב-`react-intlayer` היא כלי רב-עוצמה ונוח לניהול תרגומים מוטבעים ביישומי ה-React שלך. על ידי שילובה ביעילות, תוכל לשפר את יכולות הבינאום של היישום שלך ולהעניק חוויה טובה יותר למשתמשים בכל רחבי העולם.

למידע נוסף על שימוש מתקדם ותכונות נוספות, עיין ב-[תיעוד react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md).

- [תיעוד react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)

**הערה**: זכור להגדיר את ה-`IntlayerProvider` שלך כראוי כדי להבטיח שהשפה הנוכחית מועברת בצורה תקינה לרכיבים שלך. הדבר חיוני כדי שהפונקציה `t` תחזיר את התרגומים הנכונים.
