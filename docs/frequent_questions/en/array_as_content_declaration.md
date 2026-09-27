---
createdAt: 2025-05-20
updatedAt: 2026-09-27
priority: 4
title: Can I use an array as a content declaration?
description: "Yes: an array can be a content declaration in Intlayer. How to declare it, translate each item and read it back from your components."
keywords:
  - array
  - content
  - declaration
  - intlayer
slugs:
  - frequent-questions
  - array-as-content-declaration
author: aymericzip
---

# Can I use an array as a content declaration?

Yes, you can use an array as a content declaration.

```ts
import { t, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  content: {
    test: t({
      en: ["Test", "Test2", "Test3"],
      fr: ["Test", "Test2", "Test3"],
      es: ["Test", "Test2", "Test3"],
    }),
  },
};

export default exampleContent;
```

Then you can use the content like this:

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

`.value` allows you to get the value of the content, not wrapped by a `IntlayerNode`.
