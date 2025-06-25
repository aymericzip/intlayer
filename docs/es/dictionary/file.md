---
docName: dictionary__file
url: /doc/concept/content/file
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/file.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: Archivo
description: Aprenda a incorporar archivos externos en su diccionario de contenido utilizando la función `file`. Esta documentación explica cómo Intlayer vincula y administra dinámicamente el contenido de los archivos.
keywords:
  - Archivo
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Contenido de Archivo / Archivo en Intlayer

## Cómo Funciona la Incrustación de Archivos

En Intlayer, la función `file` permite incrustar contenido de archivos externos en un diccionario. Este enfoque asegura que Intlayer reconozca el archivo fuente, permitiendo una integración fluida con el Editor Visual y el CMS de Intlayer. A diferencia de los métodos directos de `import`, `require` o lectura de archivos con `fs`, el uso de `file` asocia el archivo con el diccionario, permitiendo que Intlayer rastree y actualice el contenido dinámicamente cuando se edita el archivo.

## Configuración del Contenido del Archivo

Para incrustar contenido de archivos en tu proyecto de Intlayer, utiliza la función `file` en un módulo de contenido. A continuación, se muestran ejemplos que demuestran diferentes implementaciones.

### Implementación en TypeScript

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

### Implementación en Módulo ECMAScript (ESM)

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

export default myFileContent;
```

### Implementación en CommonJS

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

module.exports = myFileContent;
```

### Configuración en JSON

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

## Uso del Contenido del Archivo en React Intlayer

Para usar contenido de archivo incrustado en un componente React, importa y utiliza el hook `useIntlayer` del paquete `react-intlayer`. Esto recupera el contenido de la clave especificada y permite que se muestre dinámicamente.

```tsx fileName="**/*.tsx" codeFormat="typescript"
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

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

module.exports = FileComponent;
```

## Ejemplo de Markdown Multilingüe

Para soportar archivos Markdown editables multilingües, puedes usar `file` en combinación con `t()` y `md()` para definir diferentes versiones de idioma de un archivo de contenido Markdown.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        es: file("src/components/test.es.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file, t, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        es: file("src/components/test.es.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
      })
    ),
  },
};

export default myMultilingualContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file, t, md } = require("intlayer");

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        es: file("src/components/test.es.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
      })
    ),
  },
};
```

Esta configuración permite que el contenido se recupere dinámicamente según la preferencia de idioma del usuario. Cuando se utiliza en el Editor Visual o CMS de Intlayer, el sistema reconocerá que el contenido proviene de los archivos Markdown especificados y asegurará que permanezcan editables.

## Cómo Maneja Intlayer el Contenido de Archivos

La función `file` se basa en el módulo `fs` de Node.js para leer el contenido del archivo especificado e insertarlo en el diccionario. Cuando se utiliza junto con el Editor Visual o CMS de Intlayer, Intlayer puede rastrear la relación entre el diccionario y el archivo. Esto permite que Intlayer:

- Reconozca que el contenido proviene de un archivo específico.
- Actualice automáticamente el contenido del diccionario cuando se edite el archivo vinculado.
- Asegure la sincronización entre el archivo y el diccionario, preservando la integridad del contenido.

## Recursos Adicionales

Para más detalles sobre la configuración y el uso de la incrustación de archivos en Intlayer, consulta los siguientes recursos:

- [Documentación de Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md)
- [Documentación de React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md)
- [Documentación de Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md)
- [Documentación de Contenido Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/markdown.md)
- [Documentación de Contenido de Traducción](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/translation.md)

Estos recursos proporcionan más información sobre la incrustación de archivos, la gestión de contenido y la integración de Intlayer con varios frameworks.
