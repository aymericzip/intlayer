---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Arquivo
description: Aprenda como incorporar arquivos externos no seu dicionário de conteúdo usando a função `file`. Esta documentação explica como o Intlayer vincula e gerencia o conteúdo de arquivos dinamicamente.
keywords:
  - Arquivo
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Histórico inicial"
author: aymericzip
---

# Conteúdo de Arquivo / Incorporando Arquivos no Intlayer

## Como Funciona a Incorporação de Arquivos

No Intlayer, a função `file` permite incorporar o conteúdo de arquivos externos em um dicionário. Essa abordagem garante que o Intlayer reconheça o arquivo de origem, possibilitando uma integração perfeita com o Editor Visual do Intlayer e o CMS. Diferentemente dos métodos diretos de leitura de arquivos como `import`, `require` ou `fs`, o uso de `file` associa o arquivo ao dicionário, permitindo que o Intlayer acompanhe e atualize o conteúdo dinamicamente quando o arquivo for editado.

## Configurando o Conteúdo do Arquivo

Para incorporar o conteúdo de um arquivo no seu projeto Intlayer, utilize a função `file` em um módulo de conteúdo. Abaixo estão exemplos demonstrando diferentes implementações.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myFile": {
      "nodeType": "file",
      "value": "./path/to/file.txt",
    },
  },
}
```

## Usando Conteúdo de Arquivo no React Intlayer

<Tabs group="framework">
  <Tab label="React" value="react">

To use embedded file content in a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This retrieves the content from the specified key and allows it to be displayed dynamically.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use embedded file content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To use embedded file content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myFile } = useIntlayer("my_key");
</script>

<template>
  <div>
    <pre>{{ myFile }}</pre>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use embedded file content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <pre>{$content.myFile}</pre>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use embedded file content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To use embedded file content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const FileComponent: Component = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use embedded file content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-file",
  template: `
    <div>
      <pre>{{ content().myFile }}</pre>
    </div>
  `,
})
export class FileComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use embedded file content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("file-content")!.textContent = newContent.myFile;
});

// Initial render
document.getElementById("file-content")!.textContent = content.myFile;
```

  </Tab>
</Tabs>

## Exemplo de Markdown Multilíngue

Para suportar arquivos Markdown editáveis multilíngues, você pode usar `file` em combinação com `t()` e `md()` para definir diferentes versões de idioma de um arquivo de conteúdo Markdown.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        pt: file("src/components/test.pt.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

Esta configuração permite que o conteúdo seja recuperado dinamicamente com base na preferência de idioma do usuário. Quando usado no Editor Visual Intlayer ou CMS, o sistema reconhecerá que o conteúdo vem dos arquivos Markdown especificados e garantirá que eles permaneçam editáveis.

## Como o Intlayer Trata o Conteúdo de Arquivos

A função `file` é baseada no módulo `fs` do Node.js para ler o conteúdo do arquivo especificado e inseri-lo no dicionário. Quando usada em conjunto com o Editor Visual Intlayer ou CMS, o Intlayer pode rastrear a relação entre o dicionário e o arquivo. Isso permite que o Intlayer:

- Reconheça que o conteúdo se origina de um arquivo específico.
- Atualize automaticamente o conteúdo do dicionário quando o arquivo vinculado for editado.
- Garantir a sincronização entre o arquivo e o dicionário, preservando a integridade do conteúdo.

## Recursos Adicionais

Para mais detalhes sobre a configuração e uso da incorporação de arquivos no Intlayer, consulte os seguintes recursos:

- [Documentação do Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md)
- [Documentação do React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_create_react_app.md)
- [Documentação do Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_15.md)
- [Documentação de Conteúdo Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md)
- [Documentação do Conteúdo de Tradução](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation.md)

Estes recursos fornecem mais informações sobre incorporação de arquivos, gerenciamento de conteúdo e a integração do Intlayer com vários frameworks.
