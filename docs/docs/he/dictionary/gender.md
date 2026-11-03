---
createdAt: 2025-07-27
updatedAt: 2026-11-03
priority: 8
title: "תוכן מבוסס מגדר ב-Intlayer"
description: "התאם הודעות למגדר הקורא באמצעות צומת gender() של Intlayer: וריאציות עבור זכר, נקבה וברירת מחדל המוגדרות במקום אחד."
keywords:
  - תוכן מבוסס מגדר
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
  - gender
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: "הצגת תוכן מבוסס מגדר"
author: aymericzip
---

# תוכן מבוסס מגדר / Gender ב-Intlayer

## כיצד Gender עובד

ב-Intlayer, תוכן מבוסס מגדר מושג באמצעות הפונקציה `gender`, הממפה ערכי מגדר ספציפיים ('male', 'female') לתוכן המתאים להם. גישה זו מאפשרת לך לבחור תוכן בצורה דינמית בהתבסס על מגדר נתון. בעת שילוב עם React Intlayer או Next Intlayer, התוכן המתאים נבחר אוטומטית בהתאם למגדר המסופק בזמן ריצה (runtime).

## הגדרת תוכן מבוסס מגדר

כדי להגדיר תוכן מבוסס מגדר בפרויקט Intlayer שלך, צור מודול תוכן הכולל את הגדרות המגדר שלך. להלן דוגמאות בפורמטים שונים:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "my content for male users",
      female: "my content for female users",
      fallback: "my content when gender is not specified", // אופציונלי
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "my content for male users",
        "female": "my content for female users",
        "fallback": "my content when gender is not specified", // אופציונלי
      },
    },
  },
}
```

> אם לא מוגדר fallback, המפתח האחרון שהוצהר ייבחר כ-fallback אם המגדר אינו מצוין או אינו תואם לאף מגדר שהוגדר.

## שימוש בתוכן מבוסס מגדר

<Tabs group="framework">
  <Tab label="React" value="react">

כדי להשתמש בתוכן מבוסס מגדר בתוך רכיב React, ייבא והשתמש ב-hook‏ `useIntlayer` מתוך החבילה `react-intlayer`. ה-hook שולף את התוכן עבור המפתח שצוין ומאפשר לך להעביר מגדר כדי לבחור את הפלט המתאים:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* פלט: my content for male users */
          myGender("male")
        }
      </p>
      <p>
        {
          /* פלט: my content for female users */
          myGender("female")
        }
      </p>
      <p>
        {
          /* פלט: my content for male users */
          myGender("m")
        }
      </p>
      <p>
        {
          /* פלט: my content for female users */
          myGender("f")
        }
      </p>
      <p>
        {
          /* פלט: my content when gender is not specified */
          myGender("")
        }
      </p>
      <p>
        {
          /* פלט: my content when gender is not specified */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

כדי להשתמש בתוכן מבוסס מגדר ב-Client Components של Next.js, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

כדי להשתמש בתוכן מבוסס מגדר ברכיבי Vue, אחזר אותו באמצעות ה-composable‏ `useIntlayer`. הנה דוגמה:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myGender } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ myGender("male") }}</p>
    <p>{{ myGender("female") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

כדי להשתמש בתוכן מבוסס מגדר ברכיבי Svelte, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הגישה ל-store מתבצעת עם `$`. הנה דוגמה:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.myGender("male")}</p>
  <p>{$content.myGender("female")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

כדי להשתמש בתוכן מבוסס מגדר ברכיבי Preact, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

כדי להשתמש בתוכן מבוסס מגדר ברכיבי SolidJS, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const GenderComponent: Component = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

כדי להשתמש בתוכן מבוסס מגדר ברכיבי Angular, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-gender",
  template: `
    <div>
      <p>{{ content().myGender("male") }}</p>
      <p>{{ content().myGender("female") }}</p>
    </div>
  `,
})
export class GenderComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

כדי להשתמש בתוכן מבוסס מגדר עם `vanilla-intlayer`, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("gender-male")!.textContent =
    newContent.myGender("male");
  document.getElementById("gender-female")!.textContent =
    newContent.myGender("female");
});

// רינדור ראשוני
document.getElementById("gender-male")!.textContent = content.myGender("male");
document.getElementById("gender-female")!.textContent =
  content.myGender("female");
```

  </Tab>
</Tabs>

## משאבים נוספים

למידע מפורט יותר על הגדרות ושימוש, עיין במשאבים הבאים:

- [תיעוד Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md)
- [תיעוד React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_create_react_app.md)
- [תיעוד Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_15.md)

משאבים אלה מציעים תובנות נוספות לגבי ההגדרה והשימוש ב-Intlayer בסביבות ובפריימוורקים שונים.
