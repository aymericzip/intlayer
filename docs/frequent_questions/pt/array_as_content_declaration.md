---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Posso usar um array como declaração de conteúdo?
description: Aprenda como usar um array como declaração de conteúdo.
keywords:
  - array
  - conteúdo
  - declaração
  - intlayer
slugs:
  - doc
  - faq
  - array-as-content-declaration
---

# Posso usar um array como declaração de conteúdo?

Sim, você pode usar um array como declaração de conteúdo.

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

Então você pode usar o conteúdo assim:

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

`.value` permite obter o valor do conteúdo, não envolvido por um `IntlayerNode`.
