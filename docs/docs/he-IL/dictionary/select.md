---
createdAt: 2026-07-30
updatedAt: 2026-11-03
priority: 8
title: "תוכן מבוסס Select ב-Intlayer"
description: "בחר תוכן מתוך ערך מחרוזת שרירותי באמצעות צומת select של Intlayer, חלופה דמוית switch עבור סטטוסים, תפקידים או וריאציות."
keywords:
  - תוכן מבוסס Select
  - תוכן Switch
  - ICU select
  - רינדור דינמי
  - תיעוד
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - select
history:
  - version: 9.1.0
    date: 2026-07-30
    changes: "הצגת תוכן מבוסס select"
author: aymericzip
---

# תוכן מבוסס Select / Select ב-Intlayer

## כיצד Select עובד

ב-Intlayer, תוכן מבוסס select מושג באמצעות הפונקציה `select`, הממפה ערכי מחרוזת שרירותיים לתוכן המתאים להם. זהו המקביל להודעת ICU מסוג `{value, select, …}`, או למשפט `switch` בקוד האפליקציה שלך.

השתמש ב-`select` כאשר המבחין (discriminant) הוא מחרוזת חופשית, סטטוס, תוכנית (plan), פלטפורמה, או תפקיד (role). עבור מבחינים אחרים, Intlayer מספק צמתים ייעודיים:

| מבחין (Discriminant) | צומת       |
| :------------------- | :--------- |
| כמות                 | `enu()`    |
| בוליאני              | `cond()`   |
| מגדר                 | `gender()` |
| כל ערך מחרוזת אחר    | `select()` |

## הגדרת תוכן מבוסס Select

כדי להגדיר תוכן מבוסס select בפרויקט Intlayer שלך, צור מודול תוכן הכולל את הגדרות ה-select שלך. להלן דוגמאות בפורמטים שונים:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // אופציונלי
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "publishStatus": {
      "nodeType": "select",
      "select": {
        "draft": "This post is a draft",
        "published": "This post is live",
        "scheduled": "This post is scheduled",
        "fallback": "Unknown status", // אופציונלי
      },
    },
  },
}
```

> אם לא הוצהר על `fallback`, המפתח האחרון שהוצהר ייבחר כ-fallback כאשר הערך שסופק אינו תואם לאף מקרה שהוגדר, בדיוק כמו החוזה של `cond()` ו-`gender()`.

### בטיחות טיפוסים (Type safety)

הארגומנט המתקבל מוסק מתוך המקרים שהוצהרו:

- ללא `fallback`, רק המקרים שהוצהרו מתקבלים, ושגיאת כתיב מהווה שגיאת טיפוס (type error).
- עם `fallback`, כל מחרוזת מתקבלת (ה-fallback מכסה את הערכים שאינם תואמים) בעוד שהמקרים שהוצהרו עדיין נהנים מהשלמה אוטומטית (autocomplete).

## מדוע לא להשתמש באובייקט רגיל?

זה מפתה להצהיר על אובייקט רגיל ולאנדקס אותו באמצעות הערך בזמן ריצה:

```tsx
// ❌ אל תעשה זאת
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

הקומפיילר של Intlayer מנתח את קוד המקור שלך כדי לקצץ (prune) תוכן שאינו בשימוש ולמזער (minify) את המפתחות שנותרו. גישה מחושבת דינמית (`obj[expr]`) אינה ניתנת לפענוח סטטי, ולכן כל הענף מסומן כ-opaque: הוא נשמר ב-bundle והמפתחות שלו נשארים ללא מזעור.

באמצעות `select()`, פענוח המקרה מתרחש בתוך קריאת פונקציה במקום כגישה למאפיין. הקומפיילר מזהה גישה סטטית לשדה בודד ומבצע אופטימיזציה לצומת בדיוק כמו `enu()`, `cond()` או `gender()`:

```tsx
// ✅ עשה זאת
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## שימוש בתוכן מבוסס Select

<Tabs group="framework">
  <Tab label="React" value="react">

כדי להשתמש בתוכן מבוסס select בתוך רכיב React, ייבא והשתמש ב-hook‏ `useIntlayer` מתוך החבילה `react-intlayer`. ה-hook שולף את התוכן עבור המפתח שצוין ומאפשר לך להעביר ערך כדי לבחור את הפלט המתאים:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* פלט: This post is a draft */
          publishStatus("draft")
        }
      </p>
      <p>
        {
          /* פלט: This post is live */
          publishStatus("published")
        }
      </p>
      <p>
        {
          /* פלט: Unknown status */
          publishStatus("archived")
        }
      </p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

כדי להשתמש בתוכן מבוסס select ב-Client Components של Next.js, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Vue" value="vue">

כדי להשתמש בתוכן מבוסס select ברכיבי Vue, אחזר אותו באמצעות ה-composable‏ `useIntlayer`. הנה דוגמה:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { publishStatus } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ publishStatus("draft") }}</p>
    <p>{{ publishStatus("published") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

כדי להשתמש בתוכן מבוסס select ברכיבי Svelte, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הגישה ל-store מתבצעת עם `$`. הנה דוגמה:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.publishStatus("draft")}</p>
  <p>{$content.publishStatus("published")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

כדי להשתמש בתוכן מבוסס select ברכיבי Preact, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Solid" value="solid">

כדי להשתמש בתוכן מבוסס select ברכיבי SolidJS, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const PostStatus: Component = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Angular" value="angular">

כדי להשתמש בתוכן מבוסס select ברכיבי Angular, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-post-status",
  template: `
    <div>
      <p>{{ content().publishStatus("draft") }}</p>
      <p>{{ content().publishStatus("published") }}</p>
    </div>
  `,
})
export class PostStatusComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

כדי להשתמש בתוכן מבוסס select עם `vanilla-intlayer`, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("status")!.textContent =
    newContent.publishStatus("draft");
});

// רינדור ראשוני
document.getElementById("status")!.textContent = content.publishStatus("draft");
```

  </Tab>
</Tabs>

## שילוב Select עם צמתים אחרים

כל מקרה מחזיק צומת תוכן מלא, כך ש-`select` משתלב בצורה חלקה עם `t()`, `insert()`, `md()` ואחרים:

```typescript fileName="**/*.content.ts" codeFormat="typescript"
import { insert, select, t, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: insert(
        t({
          he: "{{name}} שמר/ה טיוטה",
          en: "{{name}} saved a draft",
          fr: "{{name}} a enregistré un brouillon",
        })
      ),
      published: insert(
        t({
          he: "{{name}} פרסם/ה את הפוסט",
          en: "{{name}} published the post",
          fr: "{{name}} a publié l’article",
        })
      ),
      fallback: insert(
        t({
          he: "{{name}} עדכן/ה את הפוסט",
          en: "{{name}} updated the post",
          fr: "{{name}} a mis à jour l’article",
        })
      ),
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```tsx
publishStatus("draft")({ name: "Alice" }); // פלט: Alice שמר/ה טיוטה
```

## הגירה מ-ICU `select`

הודעות המשתמשות בארגומנט `select` של ICU מיובאות כצומתי `select`:

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

הופך ל:

```typescript
select({
  draft: "draft",
  published: "published",
  fallback: "Unknown",
});
```

מקרה ה-`other` של ICU מקבל את השם `fallback`, שהוא השם המקובל ב-Intlayer עבור תפיסת ברירת מחדל (catch-all). הארגומנט השני שומר את שם משתנה ה-ICU כך שההודעה ניתנת לייצוא חוזר בדיוק לאותה מחרוזת ICU.

> הודעת `select` של ICU שמקריה הם ערכי מגדר (`male` / `female` / `other`) מיובאת במקום זאת כצומת [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md).

- [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md)

## משאבים נוספים

למידע מפורט יותר על הגדרות ושימוש, עיין במשאבים הבאים:

- [תיעוד Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md)
- [תיעוד React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_create_react_app.md)
- [תיעוד Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_15.md)

משאבים אלה מציעים תובנות נוספות לגבי ההגדרה והשימוש ב-Intlayer בסביבות ובפריימוורקים שונים.
