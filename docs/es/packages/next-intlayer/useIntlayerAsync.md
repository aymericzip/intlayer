# Integración de Next.js: Documentación del Hook `useIntlayerAsync`

El hook `useIntlayerAsync` extiende la funcionalidad de `useIntlayer` al no solo devolver diccionarios pre-renderizados, sino también al obtener actualizaciones de manera asíncrona, lo que lo hace ideal para aplicaciones que actualizan frecuentemente su contenido localizado después del renderizado inicial.

## Visión General

- **Carga Asíncrona de Diccionarios:**  
  En el lado del cliente, `useIntlayerAsync` primero devuelve el diccionario de localización pre-renderizado (igual que `useIntlayer`) y luego obtiene y fusiona cualquier diccionario remoto nuevo disponible de manera asíncrona.
- **Gestión del Estado de Progreso:**  
  El hook también proporciona un estado `isLoading`, que indica cuándo se está obteniendo un diccionario remoto. Esto permite a los desarrolladores mostrar indicadores de carga o estados de esqueleto para una experiencia de usuario más fluida.

## Configuración del Entorno

Intlayer proporciona un sistema de Gestión de Fuentes de Contenido (CSM) sin cabeza que permite a los no desarrolladores gestionar y actualizar el contenido de la aplicación sin problemas. Al utilizar el panel intuitivo de Intlayer, tu equipo puede editar texto localizado, imágenes y otros recursos sin modificar directamente el código. Esto agiliza el proceso de gestión de contenido, fomenta la colaboración y asegura que las actualizaciones se puedan realizar de manera rápida y sencilla.

Para comenzar con Intlayer, primero necesitarás registrarte y obtener un token de acceso en [https://intlayer.org/dashboard](https://intlayer.org/dashboard). Una vez que tengas tus credenciales, añádelas a tu archivo de configuración como se muestra a continuación:

```typescript
import { type IntlayerConfig } from 'intlayer';

export default {
  ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

Después de configurar tus credenciales, puedes enviar un nuevo diccionario de localización a Intlayer ejecutando:

```bash
npm intlayer push -d my-first-dictionary-key
```

Este comando sube tus diccionarios de contenido iniciales, haciéndolos disponibles para la obtención asíncrona y la edición a través de la plataforma Intlayer.

## Importando `useIntlayerAsync` en Next.js

Dado que `useIntlayerAsync` está destinado a componentes **del lado del cliente**, lo importarás desde el mismo punto de entrada del cliente que `useIntlayer`:

```tsx
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

Asegúrate de que el archivo de importación esté anotado con `"use client"` en la parte superior, si estás utilizando el enrutador de aplicaciones de Next.js con componentes del servidor y del cliente separados.

## Parámetros

1. **`key`**:  
   **Tipo**: `DictionaryKeys`  
   La clave del diccionario utilizada para identificar el bloque de contenido localizado. Esta clave debe estar definida en tus archivos de declaración de contenido.

2. **`locale`** (opcional):  
   **Tipo**: `Locales`  
   La localización específica que deseas dirigir. Si se omite, el hook utiliza la localización del contexto del cliente.

3. **`isRenderEditor`** (opcional, predeterminado en `true`):  
   **Tipo**: `boolean`  
   Determina si el contenido debe estar listo para renderizarse con la superposición del editor de Intlayer. Si se establece en `false`, los datos del diccionario devuelto excluirán características específicas del editor.

## Valor de Retorno

El hook devuelve un objeto diccionario que contiene contenido localizado indexado por `key` y `locale`. También incluye un booleano `isLoading` que indica si se está obteniendo actualmente un diccionario remoto.

## Ejemplo de Uso en Next.js

### Ejemplo de Componente del Lado del Cliente

```tsx
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample = () => {
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

- En el renderizado inicial, `title` y `description` provienen del diccionario de localización pre-renderizado.
- Mientras `isLoading` sea `true`, se hace una petición remota en segundo plano para obtener un diccionario actualizado.
- Una vez que la obtención se completa, `title` y `description` se actualizan con el contenido más reciente y `isLoading` regresa a `false`.

## Manejo de Localización de Atributos

Al igual que con `useIntlayer`, puedes recuperar valores de atributos localizados para diversas propiedades HTML (por ejemplo, `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Archivos de Declaración de Contenido

Todas las claves de contenido deben estar definidas en tus archivos de declaración de contenido para la seguridad de tipo y para prevenir errores en tiempo de ejecución. Estos archivos permiten la validación de TypeScript, asegurando que siempre referencias claves y localizaciones existentes.

Las instrucciones para configurar los archivos de declaración de contenido están disponibles [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/content_declaration/get_started.md).

## Más Información

- **Editor Visual de Intlayer:**  
  Integra con el editor visual de Intlayer para gestionar y editar contenido directamente desde la interfaz de usuario. Más detalles [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_editor.md).

---

**En resumen**, `useIntlayerAsync` es un poderoso hook del lado del cliente diseñado para mejorar la experiencia del usuario y mantener la frescura del contenido al combinar diccionarios pre-renderizados con actualizaciones de diccionarios asíncronas. Al aprovechar `isLoading` y las declaraciones de contenido basadas en TypeScript, puedes integrar sin problemas contenido dinámico y localizado en tus aplicaciones de Next.js.
