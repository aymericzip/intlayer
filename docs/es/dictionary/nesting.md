---
docName: dictionary__nesting
url: /doc/concept/content/nesting
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/nesting.md
createdAt: 2025-02-7
updatedAt: 2025-02-7
title: Anidación del diccionario
description: Descubre cómo usar la anidación de contenido en Intlayer para reutilizar y estructurar tu contenido multilingüe de manera eficiente. Sigue esta documentación para implementar la anidación sin problemas en tu proyecto.
keywords:
  - Nesting
  - Reutilización de contenido
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Anidación / Referencia de Subcontenido

## Cómo Funciona la Anidación

En Intlayer, la anidación se logra a través de la función `nest`, que permite referenciar y reutilizar contenido de otro diccionario. En lugar de duplicar contenido, puedes apuntar a un módulo de contenido existente mediante su clave.

## Configuración de la Anidación

Para configurar la anidación en tu proyecto de Intlayer, primero defines el contenido base que deseas reutilizar. Luego, en un módulo de contenido separado, utilizas la función `nest` para importar ese contenido.

### Diccionario Base

A continuación, se muestra un ejemplo de un diccionario base para anidar en otro diccionario:

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="firstDictionary.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

module.exports = firstDictionary;
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

### Referenciando con Nest

Ahora, crea otro módulo de contenido que utilice la función `nest` para referenciar el contenido anterior. Puedes referenciar el contenido completo o un valor específico anidado:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat="typescript"
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // Referencia el diccionario completo:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // Referencia un valor específico anidado:
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.mjs" contentDeclarationFormat="esm"
import { nest } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { nest } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

module.exports = myNestingContent;
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

Como segundo parámetro, puedes especificar una ruta a un valor anidado dentro de ese contenido. Cuando no se proporciona una ruta, se devuelve el contenido completo del diccionario referenciado.

## Usando Anidación con React Intlayer

Para usar contenido anidado en un componente de React, utiliza el hook `useIntlayer` del paquete `react-intlayer`. Este hook recupera el contenido correcto basado en la clave especificada. Aquí tienes un ejemplo de cómo usarlo:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Contenido Anidado Completo: {JSON.stringify(fullNestedContent)}
        {/* Salida: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Valor Anidado Parcial: {partialNestedContent}
        {/* Salida: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Contenido Anidado Completo: {JSON.stringify(fullNestedContent)}
        {/* Salida: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Valor Anidado Parcial: {partialNestedContent}
        {/* Salida: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.cjx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Contenido Anidado Completo: {JSON.stringify(fullNestedContent)}
        {/* Salida: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Valor Anidado Parcial: {partialNestedContent}
        {/* Salida: 0 */}
      </p>
    </div>
  );
};

module.exports = NestComponent;
```

## Recursos Adicionales

Para obtener información más detallada sobre la configuración y el uso, consulta los siguientes recursos:

- [Documentación de Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md)
- [Documentación de React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md)
- [Documentación de Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md)

Estos recursos proporcionan más información sobre la configuración y el uso de Intlayer en diferentes entornos y con varios frameworks.
