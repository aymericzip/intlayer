---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Archivo
description: Aprende cómo incrustar archivos externos en tu diccionario de contenido usando la función `file`. Esta documentación explica cómo Intlayer enlaza y gestiona el contenido de archivos dinámicamente.
keywords:
  - Archivo
  - Internacionalización
  - Documentación
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
    changes: "Historial inicial"
author: aymericzip
---

# Contenido de Archivo / Incrustar Archivos en Intlayer

## Cómo Funciona la Incrustación de Archivos

En Intlayer, la función `file` permite incrustar contenido de archivos externos en un diccionario. Este enfoque asegura que Intlayer reconozca el archivo fuente, facilitando una integración fluida con el Editor Visual de Intlayer y el CMS. A diferencia de los métodos directos de lectura de archivos como `import`, `require` o `fs`, el uso de `file` asocia el archivo con el diccionario, permitiendo que Intlayer rastree y actualice el contenido dinámicamente cuando el archivo es editado.

## Configuración del Contenido de Archivo

Para incrustar contenido de archivo en tu proyecto Intlayer, utiliza la función `file` en un módulo de contenido. A continuación, se muestran ejemplos que demuestran diferentes implementaciones.

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

## Uso del Contenido de Archivo en React Intlayer

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

## Ejemplo de Markdown Multilingüe

Para soportar archivos Markdown editables multilingües, puedes usar `file` en combinación con `t()` y `md()` para definir diferentes versiones en distintos idiomas de un archivo de contenido Markdown.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "mi_clave_multilingue",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

Esta configuración permite que el contenido se recupere dinámicamente según la preferencia de idioma del usuario. Cuando se utiliza en el Editor Visual de Intlayer o en el CMS, el sistema reconocerá que el contenido proviene de los archivos Markdown especificados y garantizará que permanezcan editables.

## Cómo Intlayer Maneja el Contenido de Archivos

La función `file` se basa en el módulo `fs` de Node.js para leer el contenido del archivo especificado e insertarlo en el diccionario. Cuando se usa junto con el Editor Visual de Intlayer o el CMS, Intlayer puede rastrear la relación entre el diccionario y el archivo. Esto permite a Intlayer:

- Reconocer que el contenido se origina de un archivo específico.
- Actualizar automáticamente el contenido del diccionario cuando se edita el archivo vinculado.
- Asegurar la sincronización entre el archivo y el diccionario, preservando la integridad del contenido.

## Recursos Adicionales

Para más detalles sobre la configuración y el uso de la incrustación de archivos en Intlayer, consulte los siguientes recursos:

- [Documentación CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md)
- [Documentación de React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md)
- [Documentación de Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md)
- [Documentación de Contenido Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/markdown.md)
- [Documentación de Contenido de Traducción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation.md)

Estos recursos ofrecen una visión más profunda sobre la incrustación de archivos, la gestión de contenido y la integración de Intlayer con varios frameworks.
