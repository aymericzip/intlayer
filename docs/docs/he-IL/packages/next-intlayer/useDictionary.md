---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק useDictionary | next-intlayer
description: "השתמש ב-useDictionary ב-Next.js כדי לפרש אובייקט מילון שאתה מגדיר בעצמך, עם תרגומים מפוענחים עבור השפה הנוכחית."
keywords:
  - useDictionary
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
  - useDictionary
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "עדכון לארכיטקטורת Next.js >= 9.4.0"
  - version: 5.5.10
    date: 2025-06-29
    changes: "התחלת היסטוריה"
author: aymericzip
---

# שילוב ב-React: תיעוד ההוק `useDictionary`

סעיף זה מספק הנחיות מפורטות לשימוש בהוק `useDictionary` ביישומי React, ומאפשר טיפול יעיל בתוכן מתורגם ללא עורך ויזואלי.

## ייבוא `useDictionary` ב-React

ניתן לשלב את ההוק `useDictionary` ביישומי React על ידי ייבואו בהתאם לקונטקסט:

- **רכיב לקוח (Client Component):**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // לשימוש ברכיבי React צד-לקוח
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // לשימוש ברכיבי React צד-לקוח
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // לשימוש ברכיבי React צד-לקוח
  ```

- **רכיב שרת (Server Component):**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // לשימוש ברכיבי React צד-שרת
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // לשימוש ברכיבי React צד-שרת
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // לשימוש ברכיבי React צד-שרת
  ```

## פרמטרים

ההוק מקבל שני פרמטרים:

1. **`dictionary`**: אובייקט מילון מוצהר המכיל תוכן מותאם לשפות עבור מפתחות ספציפיים.
2. **`locale`** (אופציונלי): השפה הרצויה. ברירת המחדל היא שפת הקונטקסט הנוכחי אם לא צוינה אחרת.

## מילון

כל אובייקטי המילון צריכים להיות מוצהרים בקובצי תוכן מובנים כדי להבטיח בטיחות טיפוסים ולמנוע שגיאות בזמן ריצה. ניתן למצוא את [הוראות ההגדרה כאן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md). להלן דוגמה להצהרת תוכן:

```typescript fileName="component.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      he: "דוגמת רכיב לקוח",
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      he: "זהו תוכן של דוגמת רכיב לקוח",
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies Dictionary;

export default exampleContent;
```

- [קובצי הצהרת תוכן (.content.ts)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)

## דוגמת שימוש ברכיב לקוח של React

להלן דוגמה לאופן השימוש בהוק `useDictionary` ברכיב React:

```tsx fileName="ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## דוגמת שימוש ברכיב שרת של React

אם אתה משתמש בהוק `useDictionary` מחוץ ל-`IntlayerProvider` (או `IntlayerServerProvider` עבור Intlayer < 9.4), יש לספק את השפה במפורש כפרמטר בעת רינדור הרכיב:

```tsx fileName="ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## הערות על מאפיינים (Attributes)

בשונה משילובים המשתמשים בעורכים ויזואליים, מאפיינים כמו `buttonTitle.value` אינם חלים כאן. במקום זאת, גש ישירות למחרוזות המתורגמות כפי שהוצהרו בתוכן שלך.

```jsx
<button title={content.title}>{content.content}</button>
```

## טיפים נוספים

- **בטיחות טיפוסים (Type Safety)**: השתמש תמיד ב-`Dictionary` כדי להגדיר את המילונים שלך ולהבטיח בטיחות טיפוסים.
- **עדכוני בינאום**: בעת עדכון תוכן, ודא שכל השפות עקביות כדי למנוע תרגומים חסרים.

תיעוד זה מתמקד בשילוב של ההוק `useDictionary`, ומספק גישה יעילה לניהול תוכן מתורגם ללא תלות בפונקציונליות של עורך ויזואלי.
