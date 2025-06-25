---
docName: package__next-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/next-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentación del hook useIntlayerAsync | next-intlayer
description: Descubre cómo usar el hook useIntlayerAsync para el paquete next-intlayer
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

# Integración con Next.js: Documentación del Hook `useIntlayerAsync`

El hook `useIntlayerAsync` extiende la funcionalidad de `useIntlayer` al no solo devolver diccionarios pre-renderizados, sino también al obtener actualizaciones de manera asincrónica, lo que lo hace ideal para aplicaciones que actualizan frecuentemente su contenido localizado después del renderizado inicial.

## Resumen

- **Carga Asincrónica de Diccionarios:**  
  En el lado del cliente, `useIntlayerAsync` primero devuelve el diccionario de locales pre-renderizado (al igual que `useIntlayer`) y luego obtiene y fusiona asincrónicamente cualquier diccionario remoto nuevo disponible.
- **Gestión del Estado de Progreso:**  
  El hook también proporciona un estado `isLoading`, que indica cuándo se está obteniendo un diccionario remoto. Esto permite a los desarrolladores mostrar indicadores de carga o estados de esqueleto para una experiencia de usuario más fluida.

## Configuración del Entorno

Intlayer proporciona un sistema de gestión de contenido sin cabeza (CSM) que permite a personas no desarrolladoras gestionar y actualizar el contenido de la aplicación de manera fluida. Usando el panel intuitivo de Intlayer, tu equipo puede editar texto localizado, imágenes y otros recursos sin modificar directamente el código. Esto simplifica el proceso de gestión de contenido, fomenta la colaboración y asegura que las actualizaciones puedan realizarse de manera rápida y sencilla.

Para comenzar con Intlayer, primero necesitas registrarte y obtener un token de acceso en [https://intlayer.org/dashboard](https://intlayer.org/dashboard). Una vez que tengas tus credenciales, agrégalas a tu archivo de configuración como se muestra a continuación:

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

Después de configurar tus credenciales, puedes subir un nuevo diccionario de locales a Intlayer ejecutando:

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

Este comando sube tus diccionarios de contenido iniciales, haciéndolos disponibles para la obtención y edición asincrónica a través de la plataforma Intlayer.

## Importando `useIntlayerAsync` en Next.js

Dado que `useIntlayerAsync` está diseñado para componentes del **lado del cliente**, lo importarás desde el mismo punto de entrada del cliente que `useIntlayer`:

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

Asegúrate de que el archivo de importación esté anotado con `"use client"` en la parte superior, si estás usando el App Router de Next.js con componentes de servidor y cliente separados.

## Parámetros

1. **`key`**:  
   **Tipo**: `DictionaryKeys`  
   La clave del diccionario utilizada para identificar el bloque de contenido localizado. Esta clave debe estar definida en tus archivos de declaración de contenido.

2. **`locale`** (opcional):  
   **Tipo**: `Locales`  
   El locale específico que deseas apuntar. Si se omite, el hook utiliza el locale del contexto del cliente.

3. **`isRenderEditor`** (opcional, por defecto `true`):  
   **Tipo**: `boolean`  
   Determina si el contenido debe estar listo para renderizarse con la superposición del editor de Intlayer. Si se establece en `false`, los datos del diccionario devueltos excluirán las características específicas del editor.

## Valor de Retorno

El hook devuelve un objeto de diccionario que contiene contenido localizado identificado por `key` y `locale`. También incluye un booleano `isLoading` que indica si actualmente se está obteniendo un diccionario remoto.

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

- En el renderizado inicial, `title` y `description` provienen del diccionario de locales pre-renderizado.
- Mientras `isLoading` es `true`, se realiza una solicitud remota en segundo plano para obtener un diccionario actualizado.
- Una vez que se completa la obtención, `title` y `description` se actualizan con el contenido más reciente, y `isLoading` vuelve a `false`.

## Gestión de Atributos Localizados

Al igual que con `useIntlayer`, puedes recuperar valores de atributos localizados para varias propiedades HTML (por ejemplo, `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Archivos de Diccionario

Todas las claves de contenido deben definirse en tus archivos de declaración de contenido para garantizar la seguridad de tipos y prevenir errores en tiempo de ejecución. Estos archivos permiten la validación de TypeScript, asegurando que siempre hagas referencia a claves y locales existentes.

Las instrucciones para configurar archivos de declaración de contenido están disponibles [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md).

## Más Información

- **Editor Visual de Intlayer:**  
  Integra con el editor visual de Intlayer para gestionar y editar contenido directamente desde la interfaz de usuario. Más detalles [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md).

---

**En resumen**, `useIntlayerAsync` es un poderoso hook del lado del cliente diseñado para mejorar la experiencia del usuario y mantener la frescura del contenido al combinar diccionarios pre-renderizados con actualizaciones asincrónicas de diccionarios. Aprovechando `isLoading` y las declaraciones de contenido basadas en TypeScript, puedes integrar contenido dinámico y localizado sin problemas en tus aplicaciones Next.js.
