---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Tôi có thể sử dụng mảng làm khai báo nội dung không?
description: Tìm hiểu cách sử dụng mảng làm khai báo nội dung.
keywords:
  - mảng
  - nội dung
  - khai báo
  - intlayer
slugs:
  - frequent-questions
  - array-as-content-declaration
---

# Tôi có thể sử dụng mảng làm khai báo nội dung không?

Có, bạn có thể sử dụng mảng làm khai báo nội dung.

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

Sau đó bạn có thể sử dụng nội dung như sau:

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

`.value` cho phép bạn lấy giá trị của nội dung, không bị bao bọc bởi một `IntlayerNode`.
