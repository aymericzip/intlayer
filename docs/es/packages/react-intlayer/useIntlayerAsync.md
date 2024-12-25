# Integración de React: Documentación del Hook `useIntlayerAsync`

El hook `useIntlayerAsync` extiende la funcionalidad de `useIntlayer` al no solo regresar diccionarios pre-renderizados, sino también al obtener actualizaciones de manera asincrónica, lo que lo hace ideal para aplicaciones que actualizan frecuentemente su contenido localizado después del render inicial.

## Descripción general

- **Carga Asincrónica de Diccionarios:**  
  En la primera carga, `useIntlayerAsync` primero devuelve cualquier diccionario de locales pre-fetch o empaquetado estáticamente (al igual que lo haría `useIntlayer`) y luego obtiene y fusiona asincrónicamente cualquier diccionario remoto que esté disponible.
- **Gestión del Estado de Progreso:**  
  El hook también proporciona un estado `isLoading`, que indica cuándo se está obteniendo un diccionario remoto. Esto permite a los desarrolladores mostrar indicadores de carga o estados de esqueleto para una experiencia de usuario más suave.

## Configuración del Entorno

Intlayer proporciona un sistema de Gestión de Contenido Sin Cabeza (CSM) que permite a los no desarrolladores gestionar y actualizar el contenido de aplicaciones sin esfuerzo. Al usar el panel intuitivo de Intlayer, tu equipo puede editar texto localizado, imágenes y otros recursos sin modificar directamente el código. Esto simplifica el proceso de gestión de contenido, fomenta la colaboración y asegura que las actualizaciones se puedan realizar rápida y fácilmente.

Para comenzar con Intlayer:

1. **Regístrate y obtén un token de acceso** en [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **Agrega credenciales a tu archivo de configuración:**  
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
   const { type IntlayerConfig } = require("intlayer");

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

3. **Empuja un nuevo diccionario de locales a Intlayer:**

   ```bash
   npm intlayer push -d my-first-dictionary-key
   ```

   Este comando sube tus diccionarios de contenido inicial, haciéndolos disponibles para ser obtenidos y editados de manera asincrónica a través de la plataforma Intlayer.

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
   La clave del diccionario usada para identificar el bloque de contenido localizado. Esta clave debe estar definida en tus archivos de declaración de contenido.

2. **`locale`** (opcional):  
   **Tipo**: `Locales`  
   El locale específico que deseas apuntar. Si se omite, el hook usa el locale del contexto actual de Intlayer.

3. **`isRenderEditor`** (opcional, por defecto es `true`):  
   **Tipo**: `boolean`  
   Determina si el contenido debe estar listo para renderizarse con la superposición del editor de Intlayer. Si se establece en `false`, los datos del diccionario devueltos excluyen características específicas del editor.

## Valor de Retorno

El hook devuelve un objeto de diccionario que contiene contenido localizado indexado por `key` y `locale`. También incluye un booleano `isLoading` que indica si se está obteniendo actualmente un diccionario remoto.

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

- En la renderización inicial, `title` y `description` provienen del diccionario de locales pre-fetch o incrustado estáticamente.
- Mientras `isLoading` sea `true`, una solicitud en segundo plano obtiene un diccionario actualizado.
- Una vez que la obtención se completa, `title` y `description` se actualizan con el contenido más reciente y `isLoading` regresa a `false`.

## Manejo de Localización de Atributos

También puedes recuperar valores de atributos localizados para varias propiedades HTML (por ejemplo, `alt`, `title`, `aria-label`):

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Archivos de Declaración de Contenido

Todas las claves de contenido deben estar definidas en tus archivos de declaración de contenido para asegurar la seguridad de tipo y prevenir errores en tiempo de ejecución. Estos archivos permiten la validación de TypeScript, asegurando que siempre referencias claves y locales existentes.

Las instrucciones para configurar archivos de declaración de contenido están disponibles [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/content_declaration/get_started.md).

## Más Información

- **Editor Visual de Intlayer:**  
  Integra con el editor visual de Intlayer para gestionar y editar contenido directamente desde la interfaz de usuario. Más detalles [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_editor.md).

---

**En resumen**, `useIntlayerAsync` es un poderoso hook de React diseñado para mejorar la experiencia del usuario y mantener la frescura del contenido al fusionar diccionarios pre-renderizados o pre-fetch con actualizaciones de diccionarios asincrónicas. Aprovechando `isLoading` y declaraciones de contenido basadas en TypeScript, puedes integrar sin problemas contenido dinámico y localizado en tus aplicaciones de React.
