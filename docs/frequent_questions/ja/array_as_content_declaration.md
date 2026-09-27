---
createdAt: 2025-05-20
updatedAt: 2026-09-27
priority: 4
title: 配列をコンテンツ宣言として使えますか？
description: "はい、Intlayer では配列をコンテンツ宣言にできます。宣言方法、各項目の翻訳、コンポーネントからの読み取り方を解説します。"
keywords:
  - 配列
  - コンテンツ
  - 宣言
  - intlayer
slugs:
  - frequent-questions
  - array-as-content-declaration
author: aymericzip
---

# 配列をコンテンツ宣言として使えますか？

はい、配列をコンテンツ宣言として使うことができます。

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

その後、次のようにコンテンツを使用できます：

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

`.value` は、`IntlayerNode` にラップされていないコンテンツの値を取得することを可能にします。
