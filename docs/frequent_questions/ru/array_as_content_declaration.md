---
createdAt: 2025-05-20
updatedAt: 2026-09-27
priority: 4
title: Можно ли использовать массив в качестве объявления контента?
description: "Да: массив может быть объявлением контента в Intlayer. Как его объявить, перевести каждый элемент и прочитать в компонентах."
keywords:
  - массив
  - контент
  - объявление
  - intlayer
slugs:
  - frequent-questions
  - array-as-content-declaration
author: aymericzip
---

# Можно ли использовать массив в качестве объявления контента?

Да, вы можете использовать массив в качестве объявления контента.

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

Затем вы можете использовать контент следующим образом:

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

`.value` позволяет получить значение контента, не обёрнутое в `IntlayerNode`.
