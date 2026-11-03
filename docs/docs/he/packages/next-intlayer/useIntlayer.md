---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק useIntlayer | next-intlayer
description: "השתמש ב-useIntlayer ב-Next.js כדי לקרוא את התוכן המתורגם של מילון לפי מפתח ברכיבי לקוח וברכיבי שרת."
keywords:
  - useIntlayer
  - מילון
  - מפתח
  - Intlayer
  - בינאום
  - תיעוד
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useIntlayer
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "עדכון לארכיטקטורת Next.js >= 9.4.0"
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון שימוש ב-API של Solid useIntlayer לגישה ישירה למאפיינים"
  - version: 5.5.10
    date: 2025-06-29
    changes: "התחלת היסטוריה"
author: aymericzip
---

# שילוב ב-Next.js: תיעוד ההוק `useIntlayer`

ההוק `useIntlayer` מותאם במיוחד עבור יישומי Next.js כדי לאחזר ולנהל תוכן מתורגם ביעילות. תיעוד זה מתמקד באופן השימוש בהוק בתוך פרויקטי Next.js, תוך הבטחת שיטות עבודה מומלצות לבינאום.

## ייבוא `useIntlayer` ב-Next.js

בהתאם לשאלה אם אתה עובד על רכיבי צד-לקוח או צד-שרת ביישום Next.js, תוכל לייבא את ההוק `useIntlayer` באופן הבא:

- **רכיב לקוח (Client Component):**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // משמש ברכיבי צד-לקוח
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // משמש ברכיבי צד-לקוח
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // משמש ברכיבי צד-לקוח
  ```

- **רכיב שרת (Server Component):**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // משמש ברכיבי צד-שרת
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // משמש ברכיבי צד-שרת
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // משמש ברכיבי צד-שרת
  ```

## פרמטרים

1. **`key`**: מזהה מחרוזת עבור מפתח המילון שממנו ברצונך לאחזר תוכן.
2. **`locale`** (אופציונלי): שפה ספציפית לשימוש. אם הושמטה, ברירת המחדל של ההוק היא השפה המוגדרת בקונטקסט הלקוח או השרת.

## קובצי מילון

חשוב מאוד שכל מפתחות התוכן יוגדרו בתוך קובצי הצהרת תוכן כדי למנוע שגיאות בזמן ריצה ולהבטיח בטיחות טיפוסים. גישה זו גם מקלה על שילוב TypeScript לצורך אימות בזמן הידור.

הנחיות להגדרת קובצי הצהרת תוכן זמינות [כאן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md).

- [קובצי הצהרת תוכן (.content.ts)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md)

## דוגמת שימוש ב-Next.js

להלן כיצד ניתן ליישם את ההוק `useIntlayer` בתוך דף Next.js כדי לטעון באופן דינמי תוכן מתורגם בהתבסס על השפה הנוכחית של היישום:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat={["typescript", "esm"]}
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer } from "next-intlayer";
import { useIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  const content = useIntlayer("homepage", locale);

  return (
    <IntlayerProvider locale={locale}>
      <p>{content.introduction}</p>
      <ClientComponentExample />
      <ServerComponentExample />
    </IntlayerProvider>
  );
};
```

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat={["typescript", "esm"]}
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

 </Tab>
</Tabs>

```tsx fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use-client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## טיפול בלוקליזציה של מאפיינים (Attributes)

כדי לתרגם מאפיינים כגון `alt`, `title`, `href`, `aria-label` וכו', ודא שאתה ניגש לתוכן בצורה נכונה:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
<img src={content.image.src.toString()} alt={content.image.alt.toString()} />
<img src={String(content.image.src)} alt={String(content.image.alt)} />
```

## מידע נוסף

- **העורך הוויזואלי של Intlayer**: למד כיצד להשתמש בעורך הוויזואלי לניהול תוכן קל יותר [כאן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md).

תיעוד זה מתאר את השימוש בהוק `useIntlayer` ספציפית בתוך סביבות Next.js, ומספק פתרון איתן לניהול בינאום בכל יישומי ה-Next.js שלך.
