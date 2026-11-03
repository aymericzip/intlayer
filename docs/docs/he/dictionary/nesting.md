---
createdAt: 2025-02-07
updatedAt: 2026-11-03
priority: 8
title: "קינון (Nesting): שימוש חוזר בתוכן בין מילונים"
description: "הפנה ממילון אחד לאחר באמצעות צומת nest() של Intlayer כדי לעשות שימוש חוזר בתוכן משותף ללא שכפול תרגומים."
keywords:
  - קינון
  - שימוש חוזר בתוכן
  - תיעוד
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - nesting
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# קינון / הפניה לתת-תוכן ב-Intlayer

## כיצד קינון עובד

ב-Intlayer, קינון מושג באמצעות הפונקציה `nest`, המאפשרת לך להפנות לתוכן ממילון אחר ולעשות בו שימוש חוזר. במקום לשכפל תוכן, תוכל להצביע על מודול תוכן קיים לפי המפתח שלו.

## הגדרת קינון

כדי להגדיר קינון בפרויקט Intlayer שלך, תחילה תגדיר את תוכן הבסיס שבו תרצה לעשות שימוש חוזר. לאחר מכן, במודול תוכן נפרד, תשתמש בפונקציה `nest` כדי לייבא תוכן זה.

### מילון בסיס

להלן דוגמה למילון בסיס להטמעה במילון אחר:

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary } from "intlayer";

const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
} satisfies Dictionary;

export default firstDictionary;
```

```json fileName="firstDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_first_dictionary",
  "content": {
    "content": "content",
    "subContent": {
      "contentNumber": 0,
      "contentString": "string"
    }
  }
}
```

### הפניה באמצעות Nest

כעת, צור מודול תוכן נוסף המשתמש בפונקציה `nest` כדי להפנות לתוכן לעיל. תוכל להפנות לתוכן המלא או לערך מקונן ספציפי:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // הפניה למילון המלא:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // הפניה לערך מקונן ספציפי:
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
```

```json fileName="secondDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_second_dictionary",
  "content": {
    "fullNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary"
      }
    },
    "partialNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary",
        "path": "subContent.contentNumber"
      }
    }
  }
}
```

כפרמטר שני, תוכל לציין נתיב לערך מקונן בתוך אותו תוכן. כאשר לא מסופק נתיב, מוחזר התוכן המלא של המילון המופנה.

## שימוש בקינון

<Tabs group="framework">
  <Tab label="React" value="react">

כדי להשתמש בתוכן מקונן ברכיב React, השתמש ב-hook‏ `useIntlayer` מתוך החבילה `react-intlayer`. ה-hook שולף את התוכן הנכון על פי המפתח שצוין. להלן דוגמה לשימוש בו:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

כדי להשתמש בתוכן מקונן ב-Client Components של Next.js, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

כדי להשתמש בתוכן מקונן ברכיבי Vue, אחזר אותו באמצעות ה-composable‏ `useIntlayer`. הנה דוגמה:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { fullNestedContent, partialNestedContent } = useIntlayer(
  "key_of_my_second_dictionary"
);
</script>

<template>
  <div>
    <p>Full Nested Content: {{ JSON.stringify(fullNestedContent) }}</p>
    <p>Partial Nested Value: {{ partialNestedContent }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

כדי להשתמש בתוכן מקונן ברכיבי Svelte, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הגישה ל-store מתבצעת עם `$`. הנה דוגמה:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("key_of_my_second_dictionary");
</script>

<div>
  <p>Full Nested Content: {JSON.stringify($content.fullNestedContent)}</p>
  <p>Partial Nested Value: {$content.partialNestedContent}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

כדי להשתמש בתוכן מקונן ברכיבי Preact, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

כדי להשתמש בתוכן מקונן ברכיבי SolidJS, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const NestComponent: Component = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

כדי להשתמש בתוכן מקונן ברכיבי Angular, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-nest",
  template: `
    <div>
      <p>
        Full Nested Content: {{ JSON.stringify(content().fullNestedContent) }}
      </p>
      <p>Partial Nested Value: {{ content().partialNestedContent }}</p>
    </div>
  `,
})
export class NestComponent {
  content = useIntlayer("key_of_my_second_dictionary");
  JSON = JSON;
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

כדי להשתמש בתוכן מקונן עם `vanilla-intlayer`, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("key_of_my_second_dictionary").onChange(
  (newContent) => {
    document.getElementById("nested")!.textContent =
      newContent.partialNestedContent;
  }
);

// רינדור ראשוני
document.getElementById("nested")!.textContent = content.partialNestedContent;
```

  </Tab>
</Tabs>

## משאבים נוספים

למידע מפורט יותר על הגדרות ושימוש, עיין במשאבים הבאים:

- [תיעוד Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md)
- [תיעוד React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_create_react_app.md)
- [תיעוד Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_15.md)

משאבים אלה מספקים תובנות נוספות לגבי ההגדרה והשימוש ב-Intlayer בסביבות ובפריימוורקים שונים.
