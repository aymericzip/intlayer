---
createdAt: 2025-02-07
updatedAt: 2026-11-03
priority: 8
title: "תוכן מותנה ב-Intlayer"
description: "הצג תוכן שונה על בסיס תנאי בוליאני באמצעות צומת cond() של Intlayer, המוגדר פעם אחת ומפוענח בזמן רינדור."
keywords:
  - תוכן מותנה
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
  - condition
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תוכן מותנה / Condition ב-Intlayer

## כיצד Condition עובד

ב-Intlayer, תוכן מותנה מושג באמצעות הפונקציה `cond`, אשר ממפה תנאים ספציפיים (בדרך כלל ערכים בוליאניים) לתוכן המתאים להם. גישה זו מאפשרת לבחור תוכן בצורה דינמית על בסיס תנאי נתון. בעת שילוב עם React Intlayer או Next Intlayer, התוכן המתאים נבחר אוטומטית בהתאם לתנאי המסופק בזמן ריצה (runtime).

## הגדרת תוכן מותנה

כדי להגדיר תוכן מותנה בפרויקט Intlayer שלך, צור מודול תוכן הכולל את הגדרות התנאי שלך. להלן דוגמאות בפורמטים שונים.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "my content when it's true",
      false: "my content when it's false",
      fallback: "my content when the condition fails", // אופציונלי
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "my content when it's true",
        "false": "my content when it's false",
        "fallback": "my content when the condition fails", // אופציונלי
      },
    },
  },
}
```

> אם לא מוגדר fallback, המפתח האחרון שהוצהר ייבחר כ-fallback אם התנאי אינו מתקיים.

## שימוש בתוכן מותנה

<Tabs group="framework">
  <Tab label="React" value="react">

כדי להשתמש בתוכן מותנה בתוך רכיב React, ייבא והשתמש ב-hook‏ `useIntlayer` מתוך החבילה `react-intlayer`. ה-hook שולף את התוכן עבור המפתח שצוין ומאפשר להעביר תנאי כדי לבחור את הפלט המתאים.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* פלט: my content when it's true */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* פלט: my content when it's false */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* פלט: my content when the condition fails */
          myCondition("")
        }
      </p>
      <p>
        {
          /* פלט: my content when the condition fails */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

כדי להשתמש בתוכן מותנה ב-Client Components של Next.js, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

כדי להשתמש בתוכן מותנה ברכיבי Vue, אחזר אותו באמצעות ה-composable‏ `useIntlayer`. הנה דוגמה:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myCondition } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ myCondition(true) }}</p>
    <p>{{ myCondition(false) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

כדי להשתמש בתוכן מותנה ברכיבי Svelte, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הגישה ל-store מתבצעת עם `$`. הנה דוגמה:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.myCondition(true)}</p>
  <p>{$content.myCondition(false)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

כדי להשתמש בתוכן מותנה ברכיבי Preact, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

כדי להשתמש בתוכן מותנה ברכיבי SolidJS, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const ConditionalComponent: Component = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

כדי להשתמש בתוכן מותנה ברכיבי Angular, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-conditional",
  template: `
    <div>
      <p>{{ content().myCondition(true) }}</p>
      <p>{{ content().myCondition(false) }}</p>
    </div>
  `,
})
export class ConditionalComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

כדי להשתמש בתוכן מותנה עם `vanilla-intlayer`, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("true-content")!.textContent =
    newContent.myCondition(true);
  document.getElementById("false-content")!.textContent =
    newContent.myCondition(false);
});

// רינדור ראשוני
document.getElementById("true-content")!.textContent =
  content.myCondition(true);
document.getElementById("false-content")!.textContent =
  content.myCondition(false);
```

  </Tab>
</Tabs>

## משאבים נוספים

למידע מפורט יותר על הגדרות ושימוש, עיין במשאבים הבאים:

- [תיעוד Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md)
- [תיעוד React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_create_react_app.md)
- [תיעוד Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_15.md)

משאבים אלה מציעים תובנות נוספות לגבי ההגדרה והשימוש ב-Intlayer בסביבות ובפריימוורקים שונים.
