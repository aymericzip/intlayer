---
createdAt: 2024-03-07
updatedAt: 2026-11-03
priority: 8
title: "הפיכת רכיב React או Next.js לרב-לשוני"
description: למדו כיצד להצהיר ולשלוף תוכן מתורגם כדי לבנות רכיב React או Next.js רב-לשוני באמצעות Intlayer.
keywords:
  - i18n
  - רכיב
  - react
  - רב-לשוני
  - next.js
  - intlayer
slugs:
  - doc
  - component
  - i18n
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
author: aymericzip
---

# כיצד להפוך רכיב לרב-לשוני (i18n) באמצעות Intlayer

מדריך זה מציג את הצעדים המינימליים הדרושים כדי להפוך רכיב ממשק משתמש (UI) לרב-לשוני בשתי סביבות נפוצות:

- React (Vite/SPA)
- Next.js (App Router)

תחילה תצהירו על התוכן שלכם, ולאחר מכן תשילפו אותו בתוך הרכיב שלכם.

## 1) הצהרת התוכן (משותף עבור React ו-Next.js)

צרו קובץ הצהרת תוכן לצד הרכיב שלכם. פעולה זו שומרת על התרגומים בסמוך למקום שבו הם נמצאים בשימוש ומאפשרת בטיחות טיפוסים (type safety).

```ts fileName="component.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      he: "שלום",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    description: t({
      he: "רכיב React רב-לשוני",
      en: "A multilingual React component",
      fr: "Un composant React multilingue",
      es: "Un componente React multilingüe",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

גם פורמט JSON נתמך אם אתם מעדיפים קובצי תצורה.

```json fileName="component.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "he": "שלום",
        "en": "Hello",
        "fr": "Bonjour",
        "es": "Hola"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "he": "רכיב React רב-לשוני",
        "en": "A multilingual React component",
        "fr": "Un composant React multilingue",
        "es": "Un componente React multilingüe"
      }
    }
  }
}
```

## 2) שליפת התוכן שלכם

### מקרה א': אפליקציית React (Vite/SPA)

הגישה המוגדרת כברירת מחדל: שימוש ב-`useIntlayer` לשליפה לפי מפתח. זה שומר על רכיבים קומפקטיים ובעלי טיפוסיות.

```tsx fileName="ComponentExample.tsx"
import { useIntlayer } from "react-intlayer";

export function ComponentExample() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

רינדור בצד שרת או מחוץ ל-provider: השתמשו ב-`react-intlayer/server` והעבירו `locale` מפורש במידת הצורך.

```tsx fileName="ServerRenderedExample.tsx"
import { useIntlayer } from "react-intlayer/server";

export function ServerRenderedExample({ locale }: { locale: string }) {
  const content = useIntlayer("component-example", locale);
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

חלופה: `useDictionary` יכול לקרוא אובייקט מוצהר שלם אם אתם מעדיפים למקם את המבנה ישירות באתר הקריאה.

```tsx fileName="ComponentWithDictionary.tsx"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

export function ComponentWithDictionary() {
  const { title, description } = useDictionary(componentContent);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

### מקרה ב': Next.js (App Router)

העדיפו רכיבי שרת (Server Components) למען בטיחות נתונים וביצועים. השתמשו ב-`useIntlayer` מתוך `next-intlayer/server` בקובצי שרת, וב-`useIntlayer` מתוך `next-intlayer` ברכיבי לקוח.

```tsx fileName="app/[locale]/example/ServerComponent.tsx"
import { useIntlayer } from "next-intlayer/server";

export default function ServerComponent() {
  const content = useIntlayer("component-example");
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

```tsx fileName="app/[locale]/example/ClientComponent.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function ClientComponent() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

טיפ: עבור מטא-דאטה של הדף ו-SEO, תוכלו גם לשלוף תוכן באמצעות `getIntlayer` ולייצר כתובות URL רב-לשוניות דרך `getMultilingualUrls`.

## מדוע גישת הרכיבים של Intlayer היא הטובה ביותר

- **מיקום משותף (Collocation)**: הצהרות תוכן שוכנות בסמוך לרכיבים, מה שמפחית חוסר עקביות ומשפר שימוש חוזר במערכות עיצוב.
- **בטיחות טיפוסים (Type safety)**: מפתחות ומבנים הם בעלי טיפוסיות חזקה; תרגומים חסרים צפים בזמן הבנייה ולא בזמן ריצה.
- **מוכוון שרת (Server-first)**: עובד באופן טבעי ברכיבי שרת לאבטחה וביצועים טובים יותר; ה-hooks בצד הלקוח נשארים ארגונומיים ופשוטים.
- **Tree-shaking**: רק תוכן שנמצא בשימוש על ידי הרכיב נארז ב-bundle, מה ששומר על גודל נתונים קטן באפליקציות גדולות.
- **חוויית מפתח (DX) וכלים**: middleware מובנה, עזרי SEO, ועורך ויזואלי/תרגומי AI אופציונליים מייעלים את העבודה היומיומית.

ראו את ההשוואות והדפוסים בסקירה הממוקדת ב-Next.js: https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/next-i18next_vs_next-intl_vs_intlayer.md

## מדריכים והפניות קשורים

- הגדרת React (Vite): https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_vite+react.md
- React Router v7: https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_react_router_v7.md
- TanStack Start: https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_tanstack.md
- הגדרת Next.js: https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_16.md
- מדוע Intlayer מול next-intl מול next-i18next: https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/next-i18next_vs_next-intl_vs_intlayer.md

דפים אלו כוללים הגדרה מלאה מקצה לקצה, providers, ניתוב ועזרי SEO.
