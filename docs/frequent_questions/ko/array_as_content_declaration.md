---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 배열을 콘텐츠 선언으로 사용할 수 있나요?
description: 배열을 콘텐츠 선언으로 사용하는 방법을 알아보세요.
keywords:
  - 배열
  - 콘텐츠
  - 선언
  - intlayer
slugs:
  - doc
  - faq
  - array-as-content-declaration
---

# 배열을 콘텐츠 선언으로 사용할 수 있나요?

네, 배열을 콘텐츠 선언으로 사용할 수 있습니다.

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

그런 다음 다음과 같이 콘텐츠를 사용할 수 있습니다:

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

`.value`는 `IntlayerNode`로 래핑되지 않은 콘텐츠의 값을 가져올 수 있게 해줍니다.
