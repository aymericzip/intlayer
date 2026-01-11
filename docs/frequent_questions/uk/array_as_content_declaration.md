---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Чи можна використовувати масив як декларацію контенту?
description: Дізнайтеся, як використовувати масив як декларацію контенту.
keywords:
  - масив
  - вміст
  - оголошення
  - intlayer
slugs:
  - frequent-questions
  - array-as-content-declaration
---

# Чи можна використовувати масив як декларацію контенту?

Так — ви можете використовувати масив як декларацію контенту.

```ts
import { t, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  content: {
    test: t({
      uk: ["Тест", "Тест2", "Тест3"],
      en: ["Test", "Test2", "Test3"],
      fr: ["Test", "Test2", "Test3"],
      es: ["Test", "Test2", "Test3"],
    }),
  },
};

export default exampleContent;
```

Далі ви можете використовувати контент ось так:

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

.value дозволяє отримати значення контенту, яке не обгорнуте в `IntlayerNode`.
