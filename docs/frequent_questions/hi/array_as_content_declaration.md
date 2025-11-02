---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: क्या मैं सामग्री घोषणा के रूप में एक एरे का उपयोग कर सकता हूँ?
description: जानिए कि सामग्री घोषणा के रूप में एक एरे का उपयोग कैसे करें।
keywords:
  - array
  - content
  - declaration
  - intlayer
slugs:
  - frequent-questions
  - array-as-content-declaration
---

# क्या मैं सामग्री घोषणा के रूप में एक एरे का उपयोग कर सकता हूँ?

हाँ, आप सामग्री घोषणा के रूप में एक एरे का उपयोग कर सकते हैं।

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

फिर आप इस तरह सामग्री का उपयोग कर सकते हैं:

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

`.value` आपको सामग्री का मान प्राप्त करने की अनुमति देता है, जो `IntlayerNode` द्वारा लिपटा नहीं होता है।
