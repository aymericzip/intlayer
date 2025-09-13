---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: İçerik bildirimi olarak dizi kullanabilir miyim?
description: İçerik bildirimi olarak dizi nasıl kullanılır, öğrenin.
keywords:
  - dizi
  - içerik
  - bildirim
  - intlayer
slugs:
  - doc
  - faq
  - array-as-content-declaration
---

# İçerik bildirimi olarak dizi kullanabilir miyim?

Evet, içerik bildirimi olarak bir dizi kullanabilirsiniz.

```ts
import { t, type Dictionary } from "intlayer";

const ornekIcerik = {
  key: "ornek",
  content: {
    test: t({
      en: ["Test", "Test2", "Test3"],
      fr: ["Test", "Test2", "Test3"],
      es: ["Test", "Test2", "Test3"],
    }),
  },
};

export default ornekIcerik;
```

Daha sonra içeriği şu şekilde kullanabilirsiniz:

```tsx
import { useIntlayer } from "react-intlayer";

const Ornek = () => {
  const content = useIntlayer("ornek");

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

const content = useIntlayer("ornek");
</script>

<template>
  <div>
    <div v-for="item in content.test" :key="item.value">
      {{ item }}
    </div>
  </div>
</template>
```

`.value` ile, içeriğin IntlayerNode ile sarmalanmamış gerçek değerini alabilirsiniz.
