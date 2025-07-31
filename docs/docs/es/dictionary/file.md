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
---

# Contenido de Archivo / Incrustar Archivos en Intlayer

## Cómo Funciona la Incrustación de Archivos

En Intlayer, la función `file` permite incrustar contenido de archivos externos en un diccionario. Este enfoque asegura que Intlayer reconozca el archivo fuente, facilitando una integración fluida con el Editor Visual de Intlayer y el CMS. A diferencia de los métodos directos de lectura de archivos como `import`, `require` o `fs`, el uso de `file` asocia el archivo con el diccionario, permitiendo que Intlayer rastree y actualice el contenido dinámicamente cuando el archivo es editado.

## Configuración del Contenido de Archivo

Para incrustar contenido de archivo en tu proyecto Intlayer, utiliza la función `file` en un módulo de contenido. A continuación, se muestran ejemplos que demuestran diferentes implementaciones.

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

Para usar contenido de archivo incrustado en un componente React, importa y utiliza el hook `useIntlayer` del paquete `react-intlayer`. Esto recupera el contenido de la clave especificada y permite mostrarlo dinámicamente.

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

Para soportar archivos Markdown editables multilingües, puedes usar `file` en combinación con `t()` y `md()` para definir diferentes versiones en distintos idiomas de un archivo de contenido Markdown.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file, t, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

Esta configuración permite que el contenido se recupere dinámicamente según la preferencia de idioma del usuario. Cuando se utiliza en el Editor Visual de Intlayer o en el CMS, el sistema reconocerá que el contenido proviene de los archivos Markdown especificados y garantizará que permanezcan editables.

## Cómo Intlayer Maneja el Contenido de Archivos

La función `file` se basa en el módulo `fs` de Node.js para leer el contenido del archivo especificado e insertarlo en el diccionario. Cuando se usa junto con el Editor Visual de Intlayer o el CMS, Intlayer puede rastrear la relación entre el diccionario y el archivo. Esto permite a Intlayer:

- Reconocer que el contenido se origina de un archivo específico.
- Actualizar automáticamente el contenido del diccionario cuando se edita el archivo vinculado.
- Asegurar la sincronización entre el archivo y el diccionario, preservando la integridad del contenido.

## Recursos Adicionales

Para más detalles sobre la configuración y el uso de la incrustación de archivos en Intlayer, consulte los siguientes recursos:

- [Documentación CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md)
- [Documentación de React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md)
- [Documentación de Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md)
- [Documentación de Contenido Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/markdown.md)
- [Documentación de Contenido de Traducción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation.md)

Estos recursos ofrecen una visión más profunda sobre la incrustación de archivos, la gestión de contenido y la integración de Intlayer con varios frameworks.

## Historial del Documento

- 5.5.10 - 2025-06-29: Historial inicial
