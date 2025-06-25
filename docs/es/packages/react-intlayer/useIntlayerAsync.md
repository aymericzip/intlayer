---
docName: package__react-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/react-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentación del hook useIntlayerAsync | react-intlayer
description: Descubre cómo usar el hook useIntlayerAsync para el paquete react-intlayer
keywords:
  - useIntlayerAsync
  - diccionario
  - clave
  - Intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
---

# Integración con React: Documentación del Hook `useIntlayerAsync`

El hook `useIntlayerAsync` extiende la funcionalidad de `useIntlayer` al no solo devolver diccionarios pre-renderizados, sino también al obtener actualizaciones de manera asincrónica, lo que lo hace ideal para aplicaciones que actualizan frecuentemente su contenido localizado después del renderizado inicial.

## Descripción General

- **Carga Asincrónica de Diccionarios:**  
  En el montaje inicial, `useIntlayerAsync` primero devuelve cualquier diccionario de locales pre-obtenido o incluido estáticamente (como lo haría `useIntlayer`) y luego obtiene y combina asincrónicamente cualquier diccionario remoto nuevo disponible.
- **Gestión del Estado de Progreso:**  
  El hook también proporciona un estado `isLoading`, que indica cuándo se está obteniendo un diccionario remoto. Esto permite a los desarrolladores mostrar indicadores de carga o estados de esqueleto para una experiencia de usuario más fluida.

## Configuración del Entorno

Intlayer proporciona un sistema de Gestión de Fuentes de Contenido (CSM) sin cabeza que permite a los no desarrolladores gestionar y actualizar el contenido de la aplicación sin problemas. Usando el panel intuitivo de Intlayer, tu equipo puede editar texto localizado, imágenes y otros recursos sin modificar directamente el código. Esto simplifica el proceso de gestión de contenido, fomenta la colaboración y asegura que las actualizaciones puedan realizarse de manera rápida y sencilla.

Para comenzar con Intlayer:

1. **Regístrate y obtén un token de acceso** en [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **Agrega las credenciales a tu archivo de configuración:**  
   En tu proyecto de React, configura el cliente de Intlayer con tus credenciales:

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

3. **Sube un nuevo diccionario de locales a Intlayer:**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   Este comando sube tus diccionarios de contenido iniciales, haciéndolos disponibles para la obtención y edición asincrónica a través de la plataforma Intlayer.

## Importando `useIntlayerAsync` en React

En tus componentes de React, importa `useIntlayerAsync`:

```ts codeFormat="typescript"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="esm"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="commonjs"
const { useIntlayerAsync } = require("react-intlayer");
```

## Parámetros

1. **`key`**:  
   **Tipo**: `DictionaryKeys`  
   La clave del diccionario utilizada para identificar el bloque de contenido localizado. Esta clave debe estar definida en tus archivos de declaración de contenido.

2. **`locale`** (opcional):  
   **Tipo**: `Locales`  
   El locale específico que deseas apuntar. Si se omite, el hook utiliza el locale del contexto actual de Intlayer.

3. **`isRenderEditor`** (opcional, por defecto `true`):  
   **Tipo**: `boolean`  
   Determina si el contenido debe estar listo para renderizarse con la superposición del editor de Intlayer. Si se establece en `false`, los datos del diccionario devueltos excluirán las características específicas del editor.

## Valor de Retorno

El hook devuelve un objeto de diccionario que contiene contenido localizado claveado por `key` y `locale`. También incluye un booleano `isLoading` que indica si actualmente se está obteniendo un diccionario remoto.

## Ejemplo de Uso en un Componente de React

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const ComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("El contenido se está cargando...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Cargando…</h1>
          <p>Por favor espera mientras se actualiza el contenido.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("El contenido se está cargando...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Cargando…</h1>
          <p>Por favor espera mientras se actualiza el contenido.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useIntlayerAsync } = require("react-intlayer");

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("El contenido se está cargando...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Cargando…</h1>
          <p>Por favor espera mientras se actualiza el contenido.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

**Puntos Clave:**

- En el renderizado inicial, `title` y `description` provienen del diccionario de locales pre-obtenido o incrustado estáticamente.
- Mientras `isLoading` es `true`, una solicitud en segundo plano obtiene un diccionario actualizado.
- Una vez que la obtención se completa, `title` y `description` se actualizan con el contenido más reciente, y `isLoading` vuelve a `false`.

## Manejo de Localización de Atributos

También puedes obtener valores de atributos localizados para varias propiedades HTML (por ejemplo, `alt`, `title`, `aria-label`):

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Archivos de Diccionario

Todas las claves de contenido deben definirse en tus archivos de declaración de contenido para garantizar la seguridad de tipos y prevenir errores en tiempo de ejecución. Estos archivos habilitan la validación de TypeScript, asegurando que siempre hagas referencia a claves y locales existentes.

Las instrucciones para configurar archivos de declaración de contenido están disponibles [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md).

## Más Información

- **Editor Visual de Intlayer:**  
  Integra con el editor visual de Intlayer para gestionar y editar contenido directamente desde la interfaz de usuario. Más detalles [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md).

---

**En resumen**, `useIntlayerAsync` es un poderoso hook de React diseñado para mejorar la experiencia del usuario y mantener la frescura del contenido al combinar diccionarios pre-renderizados o pre-obtenidos con actualizaciones asincrónicas de diccionarios. Aprovechando `isLoading` y las declaraciones de contenido basadas en TypeScript, puedes integrar sin problemas contenido dinámico y localizado en tus aplicaciones React.
