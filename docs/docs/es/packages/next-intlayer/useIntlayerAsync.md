---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación del Hook useIntlayerAsync | next-intlayer
description: Vea cómo usar el hook useIntlayerAsync para el paquete next-intlayer
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
slugs:
  - doc
  - packages
  - next-intlayer
  - useIntlayerAsync
---

# Integración con Next.js: Documentación del Hook `useIntlayerAsync`

El hook `useIntlayerAsync` extiende la funcionalidad de `useIntlayer` al no solo devolver diccionarios pre-renderizados, sino también al obtener actualizaciones de forma asíncrona, lo que lo hace ideal para aplicaciones que actualizan frecuentemente su contenido localizado después del renderizado inicial.

## Resumen

- **Carga asíncrona de diccionarios:**  
  En el lado del cliente, `useIntlayerAsync` primero devuelve el diccionario de localización pre-renderizado (igual que `useIntlayer`) y luego obtiene y fusiona de forma asíncrona cualquier diccionario remoto nuevo disponible.
- **Gestión del estado de progreso:**  
  El hook también proporciona un estado `isLoading`, que indica cuándo se está obteniendo un diccionario remoto. Esto permite a los desarrolladores mostrar indicadores de carga o estados esqueleto para una experiencia de usuario más fluida.

## Configuración del entorno

Intlayer proporciona un sistema de Gestión de Fuentes de Contenido (CSM) sin interfaz (headless) que permite a personas no desarrolladoras gestionar y actualizar el contenido de la aplicación de manera fluida. Usando el panel intuitivo de Intlayer, tu equipo puede editar textos localizados, imágenes y otros recursos sin modificar directamente el código. Esto agiliza el proceso de gestión de contenido, fomenta la colaboración y asegura que las actualizaciones se puedan realizar rápida y fácilmente.

Para comenzar con Intlayer, primero deberás registrarte y obtener un token de acceso en el [panel de control](https://intlayer.org/dashboard). Una vez que tengas tus credenciales, añádelas a tu archivo de configuración como se muestra a continuación:

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
// Configuración para Intlayer
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
// Configuración para Intlayer
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

Después de configurar tus credenciales, puedes enviar un nuevo diccionario de localización a Intlayer ejecutando:

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

Este comando sube tus diccionarios de contenido iniciales, haciéndolos disponibles para su obtención y edición asíncrona a través de la plataforma Intlayer.

## Importando `useIntlayerAsync` en Next.js

Dado que `useIntlayerAsync` está destinado para componentes **del lado del cliente**, lo importarás desde el mismo punto de entrada del cliente que `useIntlayer`:

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

Asegúrate de que el archivo que importa esté anotado con `"use client"` en la parte superior, si estás usando Next.js App Router con componentes de servidor y cliente separados.

## Parámetros

1. **`key`**:  
   **Tipo**: `DictionaryKeys`  
   La clave del diccionario usada para identificar el bloque de contenido localizado. Esta clave debe estar definida en tus archivos de declaración de contenido.

2. **`locale`** (opcional):  
   **Tipo**: `Locales`  
   La localización específica a la que deseas dirigirte. Si se omite, el hook usa la localización del contexto del cliente.

3. **`isRenderEditor`** (opcional, por defecto `true`):  
   **Tipo**: `boolean`  
   Determina si el contenido debe estar listo para renderizarse con la superposición del editor Intlayer. Si se establece en `false`, los datos del diccionario devueltos excluirán las características específicas del editor.

## Valor de Retorno

El hook devuelve un objeto diccionario que contiene contenido localizado identificado por `key` y `locale`. También incluye un booleano `isLoading` que indica si actualmente se está obteniendo un diccionario remoto.

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

**Puntos clave:**

- En la renderización inicial, `title` y `description` provienen del diccionario de locales pre-renderizado.

- Mientras `isLoading` sea `true`, se realiza una solicitud remota en segundo plano para obtener un diccionario actualizado.
- Una vez que la obtención finaliza, `title` y `description` se actualizan con el contenido más reciente, y `isLoading` vuelve a `false`.

## Manejo de la Localización de Atributos

Al igual que con `useIntlayer`, puedes obtener valores localizados para atributos de HTML diversos (por ejemplo, `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Archivos de Diccionario

Todas las claves de contenido deben estar definidas en tus archivos de declaración de contenido para garantizar la seguridad de tipos y evitar errores en tiempo de ejecución. Estos archivos permiten la validación con TypeScript, asegurando que siempre hagas referencia a claves y locales existentes.

Las instrucciones para configurar los archivos de declaración de contenido están disponibles [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md).

## Información adicional

- **Editor Visual de Intlayer:**  
  Integra con el editor visual de Intlayer para gestionar y editar contenido directamente desde la interfaz de usuario. Más detalles [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md).

---

**En resumen**, `useIntlayerAsync` es un potente hook del lado del cliente diseñado para mejorar la experiencia del usuario y mantener la frescura del contenido al combinar diccionarios pre-renderizados con actualizaciones asíncronas de diccionarios. Aprovechando `isLoading` y las declaraciones de contenido basadas en TypeScript, puedes integrar de manera fluida contenido dinámico y localizado en tus aplicaciones Next.js.

## Historial de la documentación

- 5.5.10 - 2025-06-29: Historial inicial
