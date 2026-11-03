---
createdAt: 2025-05-20
updatedAt: 2026-11-03
priority: 4
title: האם ניתן להשתמש במערך כהצהרת תוכן?
description: "כן: מערך יכול לשמש כהצהרת תוכן ב-Intlayer. כיצד להצהיר עליו, לתרגם כל פריט ולקרוא אותו בחזרה מתוך הרכיבים שלך."
keywords:
  - מערך
  - array
  - תוכן
  - content
  - הצהרה
  - declaration
  - intlayer
slugs:
  - frequent-questions
  - array-as-content-declaration
author: aymericzip
---

# האם ניתן להשתמש במערך כהצהרת תוכן?

כן, ניתן להשתמש במערך (array) כהצהרת תוכן.

```ts
import { t, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  content: {
    test: t({
      "he-IL": ["בדיקה", "בדיקה2", "בדיקה3"],
      en: ["Test", "Test2", "Test3"],
      fr: ["Test", "Test2", "Test3"],
      es: ["Test", "Test2", "Test3"],
    }),
  },
};

export default exampleContent;
```

לאחר מכן תוכל להשתמש בתוכן כך:

```tsx
import { useIntlayer } from "react-intlayer";

const Example = () => {
  const content = useIntlayer("example");

  return (
    <div>
      {content.test.map((item) => (
        <div key={item.value}>{item}</div>
      ))}
    </div>
  );
};
```

```vue
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("example");
</script>

<template>
  <div>
    <div v-for="item in content.test" :key="item.value">
      {{ item }}
    </div>
  </div>
</template>
```

`.value` מאפשר לך לקבל את הערך של התוכן, כשהוא אינו עטוף ב-`IntlayerNode`.
