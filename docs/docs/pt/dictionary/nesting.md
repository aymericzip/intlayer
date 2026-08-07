---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Aninhamento do dicionário
description: Descubra como usar o aninhamento de conteúdo no Intlayer para reutilizar e estruturar seu conteúdo multilíngue de forma eficiente. Siga esta documentação para implementar o aninhamento sem problemas no seu projeto.
keywords:
  - Nesting
  - Reutilização de conteúdo
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - nesting
author: aymericzip
---

# Aninhamento / Referência de Subconteúdo

## Como Funciona o Aninhamento

No Intlayer, o aninhamento é realizado através da função `nest`, que permite referenciar e reutilizar conteúdo de outro dicionário. Em vez de duplicar conteúdo, você pode apontar para um módulo de conteúdo existente usando sua chave.

## Configurando Nesting

Para configurar nesting no seu projeto Intlayer, você primeiro define o conteúdo base que deseja reutilizar. Depois, em um módulo de conteúdo separado, você usa a função `nest` para importar esse conteúdo.

### Dicionário Base

Abaixo está um exemplo de um dicionário base para aninhar em outro dicionário:

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary } from "intlayer";

const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
} satisfies Dictionary;

export default firstDictionary;
```

```json fileName="firstDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_first_dictionary",
  "content": {
    "content": "content",
    "subContent": {
      "contentNumber": 0,
      "contentString": "string"
    }
  }
}
```

### Referenciamento com Nest

Agora, crie outro módulo de conteúdo que usa a função `nest` para referenciar o conteúdo acima. Você pode referenciar todo o conteúdo ou um valor aninhado específico:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // Referencia todo o dicionário:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // Referencia um valor aninhado específico:
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
```

```json fileName="secondDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_second_dictionary",
  "content": {
    "fullNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary"
      }
    },
    "partialNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary",
        "path": "subContent.contentNumber"
      }
    }
  }
}
```

Como segundo parâmetro, você pode especificar um caminho para um valor aninhado dentro desse conteúdo. Quando nenhum caminho é fornecido, todo o conteúdo do dicionário referenciado é retornado.

## Configurando o Aninhamento

<Tabs group="framework">
  <Tab label="React" value="react">

To use nested content in a React component, leverage the `useIntlayer` hook from the `react-intlayer` package. This hook retrieves the correct content based on the specified key. Here's an example of how to use it:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use nested content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To use nested content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { fullNestedContent, partialNestedContent } = useIntlayer(
  "key_of_my_second_dictionary"
);
</script>

<template>
  <div>
    <p>Full Nested Content: {{ JSON.stringify(fullNestedContent) }}</p>
    <p>Partial Nested Value: {{ partialNestedContent }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use nested content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("key_of_my_second_dictionary");
</script>

<div>
  <p>Full Nested Content: {JSON.stringify($content.fullNestedContent)}</p>
  <p>Partial Nested Value: {$content.partialNestedContent}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use nested content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To use nested content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const NestComponent: Component = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use nested content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-nest",
  template: `
    <div>
      <p>
        Full Nested Content: {{ JSON.stringify(content().fullNestedContent) }}
      </p>
      <p>Partial Nested Value: {{ content().partialNestedContent }}</p>
    </div>
  `,
})
export class NestComponent {
  content = useIntlayer("key_of_my_second_dictionary");
  JSON = JSON;
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use nested content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("key_of_my_second_dictionary").onChange(
  (newContent) => {
    document.getElementById("nested")!.textContent =
      newContent.partialNestedContent;
  }
);

// Initial render
document.getElementById("nested")!.textContent = content.partialNestedContent;
```

  </Tab>
</Tabs>

## Recursos Adicionais

Para mais informações detalhadas sobre configuração e uso, consulte os seguintes recursos:

- [Documentação do CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md)
- [Documentação do React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_create_react_app.md)
- [Documentação do Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_15.md)

Esses recursos fornecem mais detalhes sobre a configuração e o uso do Intlayer em diferentes ambientes e com vários frameworks.
