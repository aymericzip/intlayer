---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Czy mogę użyć tablicy jako deklaracji zawartości?
description: Dowiedz się, jak używać tablicy jako deklaracji zawartości.
keywords:
  - tablica
  - zawartość
  - deklaracja
  - intlayer
slugs:
  - frequent-questions
  - array-as-content-declaration
---

# Czy mogę użyć tablicy jako deklaracji zawartości?

Tak, możesz użyć tablicy jako deklaracji zawartości.

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

Następnie możesz użyć zawartości w ten sposób:

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

`.value` pozwala na uzyskanie wartości zawartości, nieopakowanej przez `IntlayerNode`.
