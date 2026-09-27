---
createdAt: 2025-05-20
updatedAt: 2026-09-27
priority: 4
title: Puis-je utiliser un tableau comme déclaration de contenu ?
description: "Oui : un tableau peut être une déclaration de contenu dans Intlayer. Comment le déclarer, traduire chaque élément et le lire dans vos composants."
keywords:
  - tableau
  - contenu
  - déclaration
  - intlayer
slugs:
  - frequent-questions
  - array-as-content-declaration
author: aymericzip
---

# Puis-je utiliser un tableau comme déclaration de contenu ?

Oui, vous pouvez utiliser un tableau comme déclaration de contenu.

```ts
import { t, type Dictionary } from "intlayer";

// Exemple de contenu utilisant un tableau pour la déclaration
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

Ensuite, vous pouvez utiliser le contenu de cette manière :

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

`.value` vous permet d'obtenir la valeur du contenu, non encapsulée par un `IntlayerNode`.
