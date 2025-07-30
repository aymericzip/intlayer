---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Kann ich ein Array als Inhaltsdeklaration verwenden?
description: Erfahren Sie, wie Sie ein Array als Inhaltsdeklaration verwenden können.
keywords:
  - array
  - inhalt
  - deklaration
  - intlayer
slugs:
  - doc
  - faq
  - array-as-content-declaration
---

# Kann ich ein Array als Inhaltsdeklaration verwenden?

Ja, Sie können ein Array als Inhaltsdeklaration verwenden.

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

Dann können Sie den Inhalt so verwenden:

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

`.value` ermöglicht es Ihnen, den Wert des Inhalts zu erhalten, ohne dass er von einem `IntlayerNode` umschlossen ist.
