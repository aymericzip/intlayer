---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 我可以使用数组作为内容声明吗？
description: 了解如何使用数组作为内容声明。
keywords:
  - 数组
  - 内容
  - 声明
  - intlayer
slugs:
  - doc
  - faq
  - array-as-content-declaration
---

# 我可以使用数组作为内容声明吗？

是的，您可以使用数组作为内容声明。

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

然后您可以这样使用内容：

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

`.value` 允许您获取内容的值，而不是被 `IntlayerNode` 包装的内容。
