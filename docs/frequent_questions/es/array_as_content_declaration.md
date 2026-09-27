---
createdAt: 2025-05-20
updatedAt: 2026-09-27
priority: 4
title: ¿Puedo usar un arreglo como declaración de contenido?
description: "Sí: un array puede ser una declaración de contenido en Intlayer. Cómo declararlo, traducir cada elemento y leerlo desde tus componentes."
keywords:
  - arreglo
  - contenido
  - declaración
  - intlayer
slugs:
  - frequent-questions
  - array-as-content-declaration
author: aymericzip
---

# ¿Puedo usar un arreglo como declaración de contenido?

Sí, puedes usar un arreglo como declaración de contenido.

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

Luego puedes usar el contenido así:

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

`.value` te permite obtener el valor del contenido, no envuelto por un `IntlayerNode`.
