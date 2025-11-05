---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: هل يمكنني استخدام مصفوفة كإعلان محتوى؟
description: تعلّم كيفية استخدام مصفوفة كإعلان محتوى.
keywords:
  - مصفوفة
  - محتوى
  - إعلان
  - intlayer
slugs:
  - frequent-questions
  - array-as-content-declaration
---

# هل يمكنني استخدام مصفوفة كإعلان محتوى؟

نعم، يمكنك استخدام مصفوفة كإعلان محتوى.

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

ثم يمكنك استخدام المحتوى بهذه الطريقة:

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

`.value` تتيح لك الحصول على قيمة المحتوى، وليس مغلفة بواسطة `IntlayerNode`.
