# Integración de Next.js: Documentación del Hook `useIntlayerAsync`

El hook `useIntlayerAsync` extiende la funcionalidad de `useIntlayer` al no solo devolver diccionarios pre-renderizados, sino también actualizarse de manera asíncrona, lo que lo hace ideal para aplicaciones que actualizan frecuentemente su contenido localizado después de la renderización inicial.

## Descripción General

- **Carga Asíncrona de Diccionarios:**  
  En el lado del cliente, `useIntlayerAsync` primero devuelve el diccionario de locale pre-renderizado (al igual que `useIntlayer`) y luego busca y fusiona asíncronamente cualquier diccionario remoto nuevo disponible.
- **Gestión del Estado de Progreso:**  
  El hook también proporciona un estado `isLoading`, que indica cuándo se está buscando un diccionario remoto. Esto permite a los desarrolladores mostrar indicadores de carga o estados de esqueleto para una experiencia de usuario más fluida.

## Configuración del Entorno

Intlayer proporciona un sistema de Gestión de Fuente de Contenido (CSM) sin cabeza que empodera a no desarrolladores para gestionar y actualizar contenido de aplicaciones sin esfuerzo. Al usar el panel intuitivo de Intlayer, su equipo puede editar texto localizado, imágenes y otros recursos sin modificar directamente el código. Esto simplifica el proceso de gestión de contenido, fomenta la colaboración y asegura que las actualizaciones se puedan realizar rápida y fácilmente.

Para comenzar con Intlayer, primero debe registrarse y obtener un token de acceso en [https://intlayer.org/dashboard](https://intlayer.org/dashboard). Una vez que tenga sus credenciales, agréguelas a su archivo de configuración como se muestra a continuación:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

export default {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

Después de configurar sus credenciales, puede enviar un nuevo diccionario de locale a Intlayer ejecutando:

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

Este comando sube sus diccionarios de contenido iniciales, haciéndolos disponibles para la carga y edición asíncronas a través de la plataforma Intlayer.

## Importando `useIntlayerAsync` en Next.js

Dado que `useIntlayerAsync` está destinado a componentes **del lado del cliente**, debe importarlo desde el mismo punto de entrada del cliente que `useIntlayer`:

```tsx codeFormat="typescript"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="esm"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="commonjs"
"use client";

const { useIntlayerAsync } = require("next-intlayer");
```

Asegúrese de que el archivo de importación esté anotado con `"use client"` en la parte superior, si está usando el enrutador de la aplicación de Next.js con componentes de servidor y cliente separados.

## Parámetros

1. **`key`**:  
   **Tipo**: `DictionaryKeys`  
   La clave del diccionario utilizada para identificar el bloque de contenido localizado. Esta clave debe definirse en sus archivos de declaración de contenido.

2. **`locale`** (opcional):  
   **Tipo**: `Locales`  
   El locale específico que desea dirigir. Si se omite, el hook utiliza el locale del contexto del cliente.

3. **`isRenderEditor`** (opcional, por defecto `true`):  
   **Tipo**: `boolean`  
   Determina si el contenido debe estar listo para la renderización con la superposición del editor de Intlayer. Si se establece en `false`, los datos del diccionario devuelto excluirán funciones específicas del editor.

## Valor de Retorno

El hook devuelve un objeto diccionario que contiene contenido localizado indexado por `key` y `locale`. También incluye un booleano `isLoading` que indica si se está buscando actualmente un diccionario remoto.

## Ejemplo de Uso en Next.js

### Ejemplo de Componente del Lado del Cliente

```tsx fileName="src/components/AsyncClientComponentExample.tsx" codeFormat="typescript"
"use client";

import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("El contenido se está cargando...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("El contenido se está cargando...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useEffect } = require("react");
const { useIntlayerAsync } = require("next-intlayer");

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("El contenido se está cargando...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

**Puntos Clave:**

- En la renderización inicial, `title` y `description` provienen del diccionario de locale pre-renderizado.
- Mientras `isLoading` es `true`, se realiza una solicitud remota en segundo plano para buscar un diccionario actualizado.
- Una vez que la búsqueda se completa, `title` y `description` se actualizan con el contenido más reciente, y `isLoading` vuelve a `false`.

## Manejo de Localización de Atributos

Al igual que `useIntlayer`, puede recuperar valores de atributo localizados para varias propiedades HTML (por ejemplo, `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Archivos de Declaración de Contenido

Todas las claves de contenido deben definirse en sus archivos de declaración de contenido para garantizar la seguridad de tipos y prevenir errores en tiempo de ejecución. Estos archivos permiten la validación de TypeScript, asegurando que siempre haga referencia a claves y locales existentes.

Las instrucciones para configurar archivos de declaración de contenido están disponibles [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/content_declaration/get_started.md).

## Más Información

- **Editor Visual de Intlayer:**  
  Integre con el editor visual de Intlayer para gestionar y editar contenido directamente desde la interfaz de usuario. Más detalles [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_editor.md).

---

**En resumen**, `useIntlayerAsync` es un poderoso hook del lado del cliente diseñado para mejorar la experiencia del usuario y mantener la frescura del contenido al combinar diccionarios pre-renderizados con actualizaciones asíncronas de diccionarios. Al aprovechar `isLoading` y declaraciones de contenido basadas en TypeScript, puede integrar sin problemas contenido dinámico y localizado en sus aplicaciones de Next.js.
