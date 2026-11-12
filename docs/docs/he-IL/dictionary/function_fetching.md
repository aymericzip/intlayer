---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 8
title: "שליפת תוכן באמצעות פונקציות: טעינת תוכן מפונקציות"
description: "הגדר תוכן Intlayer מפונקציות סינכרוניות או אסינכרוניות, למשל כדי לשלוף תרגומים מ-API בזמן בנייה."
keywords:
  - שליפת פונקציה
  - בינאום
  - תיעוד
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - function-fetching
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# שליפת תוכן באמצעות פונקציות (Function Fetching)

Intlayer מאפשר לך להגדיר פונקציות תוכן במודולי התוכן שלך, שיכולות להיות סינכרוניות או אסינכרוניות. בעת בניית האפליקציה, Intlayer מריץ פונקציות אלו כדי לקבל את תוצאת הפונקציה. ערך ההחזרה חייב להיות אובייקט JSON או ערך פשוט כגון מחרוזת או מספר.

> אזהרה: שליפת תוכן באמצעות פונקציה אינה זמינה כרגע בקובצי הגדרת תוכן מסוג JSON ובקובצי הגדרת תוכן מרוחקים.

## הצהרות פונקציה

הנה דוגמה לפונקציה סינכרונית פשוטה השולפת תוכן:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "This is the content rendered by a function",
  },
} satisfies Dictionary;

export default functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "This is the content rendered by a function"
  }
}
```

בדוגמה זו, המפתח `text` מכיל פונקציה המחזירה מחרוזת. ניתן לרנדר תוכן זה ברכיבי ה-React שלך באמצעות חבילות האינטגרציה של Intlayer כגון `react-intlayer`.

## שליפת תוכן באמצעות פונקציה אסינכרונית

בנוסף לפונקציות סינכרוניות, Intlayer תומך בפונקציות אסינכרוניות, המאפשרות לך לשלוף נתונים ממקורות חיצוניים או לדמות שליפת נתונים באמצעות נתוני מוק (mock data).

להלן דוגמה לפונקציה אסינכרונית המדמה שליפה משרת:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // המתנה של 200ms כדי לדמות שליפה מהשרת
  return await setTimeout(200).then(
    () => "This is the content fetched from the server"
  );
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies Dictionary;

export default asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
אין אפשרות לשלוף תוכן מקובץ JSON, השתמש בקובץ .ts או .js במקום זאת
```

במקרה זה, הפונקציה `fakeFetch` מדמה השהיה של זמן תגובת שרת. Intlayer מריץ את הפונקציה האסינכרונית ומשתמש בתוצאה כתוכן עבור המפתח `text`.

## שליפת תוכן מרוחק

ניתן גם להקצות Promise ישירות לשדה תוכן. Intlayer ממתין לו בעת בניית המילונים ומטמיע את הערך שנפתר:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import type { Dictionary } from "intlayer";

const remoteContent = {
  key: "remote_content",
  content: {
    externalContent: fetch("https://example.com").then((res) => res.json()),
  },
} satisfies Dictionary;

export default remoteContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
אין אפשרות לשלוף תוכן מקובץ JSON, השתמש בקובץ .ts או .js במקום זאת
```

> הבקשה רצה בזמן הבנייה (build time), כך שהנתונים שנשלפו הם תמונת מצב (snapshot) המוטמעת במילון. בנה מחדש את המילונים שלך כדי לרענן אותם.

## שימוש בתוכן מבוסס פונקציה ברכיבי React

כדי להשתמש בתוכן מבוסס פונקציה ברכיב React, עליך לייבא את `useIntlayer` מתוך `react-intlayer` ולקרוא לו עם מזהה התוכן כדי לאחזר את התוכן. הנה דוגמה:

```typescript fileName="**/*.jsx" codeFormat={["typescript", "esm", "commonjs"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* פלט: This is the content rendered by a function */}
      <p>{asyncFunctionContent.text}</p>
      {/* פלט: This is the content fetched from the server */}
    </div>
  );
};

export default MyComponent;
```
