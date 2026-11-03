---
createdAt: 2025-03-13
updatedAt: 2026-11-03
priority: 8
title: "הטמעה (Insertion): משתנים בתוכן מתורגם"
description: "הכנס ערכים דינמיים למחרוזות מתורגמות באמצעות צומת insert() של Intlayer ו-{{placeholders}}, עם בדיקת טיפוסים מהצהרת התוכן שלך."
keywords:
  - הטמעה
  - תוכן דינמי
  - מצייני מקום
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - insertion
history:
  - version: 8.0.0
    date: 2026-01-18
    changes: "עיטור אוטומטי של תוכן הטמעה"
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תוכן הטמעה / Insertion ב-Intlayer

## כיצד Insertion עובד

ב-Intlayer, תוכן הטמעה (insertion) מושג באמצעות הפונקציה `insert`, אשר מזהה שדות מצייני מקום (placeholders) במחרוזת (כגון `{{name}}` או `{{age}}`) שניתן להחליף באופן דינמי בזמן ריצה. גישה זו מאפשרת ליצור מחרוזות גמישות דמויות תבנית שבהן חלקים ספציפיים מהתוכן נקבעים על פי נתונים המועברים מהאפליקציה שלך.

בעת שילוב עם React Intlayer או Next Intlayer, תוכל פשוט לספק את אובייקט הנתונים המכיל את הערכים עבור כל מציין מקום, ו-Intlayer ירנדר אוטומטית את התוכן כאשר מצייני המקום מוחלפים בערכיהם.

## הגדרת תוכן הטמעה

כדי להגדיר תוכן הטמעה בפרויקט Intlayer שלך, צור מודול תוכן הכולל את הגדרות ההטמעה שלך.

<Tabs>
  <Tab label="עטיפה ידנית" value="manual-wrapping">
    השתמש בפונקציה `insert` כדי להצהיר במפורש על תוכן הטמעה.

    ```typescript fileName="**/*.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
    import { insert, type Dictionary } from "intlayer";

    const myInsertionContent = {
      key: "my_key",
      content: {
        myInsertion: insert(
          "Hello, my name is {{name}} and I am {{age}} years old!"
        ),
      },
    } satisfies Dictionary;

    export default myInsertionContent;
    ```

    ```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
    {
      "$schema": "https://intlayer.org/schema.json",
      "key": "my_key",
      "content": {
        "myInsertion": {
          "nodeType": "insertion",
          "insertion": "Hello, my name is {{name}} and I am {{age}} years old!",
        },
      },
    }
    ```

  </Tab>
  <Tab label="זיהוי אוטומטי" value="automatic-detection">
    אם המחרוזת מכילה מזהי הטמעה נפוצים (כמו `{{name}}`), Intlayer ימיר אותה אוטומטית.

    ```typescript fileName="**/*.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
    import { type Dictionary } from "intlayer";

    const myInsertionContent = {
      key: "my_key",
      content: {
        myInsertion: "Hello, my name is {{name}} and I am {{age}} years old!",
      },
    } satisfies Dictionary;

    export default myInsertionContent;
    ```

    ```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
    {
      "$schema": "https://intlayer.org/schema.json",
      "key": "my_key",
      "content": {
        "myInsertion": "Hello, my name is {{name}} and I am {{age}} years old!",
      },
    }
    ```

  </Tab>
</Tabs>

## שימוש בתוכן הטמעה עם React Intlayer

כדי להשתמש בתוכן הטמעה בתוך רכיב React, ייבא והשתמש ב-hook‏ `useIntlayer` מתוך החבילה `react-intlayer`. ה-hook שולף את התוכן עבור המפתח שצוין ומאפשר לך להעביר אובייקט הממפה כל מציין מקום בתוכן שלך לערך שברצונך להציג.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* פלט: "Hello, my name is John and I am 30 years old!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* ניתן לעשות שימוש חוזר באותה הטמעה עם ערכים שונים */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

## משאבים נוספים

למידע מפורט יותר על הגדרות ושימוש, עיין במשאבים הבאים:

- [תיעוד Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md)
- [תיעוד React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_create_react_app.md)
- [תיעוד Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_15.md)

משאבים אלה מציעים תובנות נוספות לגבי ההגדרה והשימוש ב-Intlayer בסביבות ובפריימוורקים שונים.
