# Integración de React: Documentación del Hook `useIntlayerAsync`

El hook `useIntlayerAsync` extiende la funcionalidad de `useIntlayer` al no solo devolver diccionarios pre-renderizados, sino también al obtener actualizaciones de manera asíncrona, lo que lo hace ideal para aplicaciones que actualizan frecuentemente su contenido localizado después del renderizado inicial.

## Descripción General

- **Carga Asíncrona de Diccionarios:**  
  En la primera carga, `useIntlayerAsync` primero devuelve cualquier diccionario de locale pre-obtenido o empaquetado de forma estática (tal como lo haría `useIntlayer`) y luego obtiene y fusiona asíncronamente cualquier nuevo diccionario remoto disponible.
- **Gestión del Estado de Progreso:**  
  El hook también proporciona un estado `isLoading`, que indica cuándo se está obteniendo un diccionario remoto. Esto permite a los desarrolladores mostrar indicadores de carga o estados de esqueleto para una experiencia de usuario más fluida.

## Configuración del Entorno

Intlayer proporciona un sistema de Gestión de Fuente de Contenidos (CSM) sin cabezas que permite a los no desarrolladores gestionar y actualizar el contenido de la aplicación sin problemas. Al usar el panel intuitivo de Intlayer, tu equipo puede editar texto localizado, imágenes y otros recursos sin modificar el código directamente. Esto agiliza el proceso de gestión de contenido, fomenta la colaboración y garantiza que las actualizaciones se puedan realizar de manera rápida y sencilla.

Para empezar con Intlayer:

1. **Regístrate y obtén un token de acceso** en [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **Agrega credenciales a tu archivo de configuración:**  
   En tu proyecto de React, configura el cliente de Intlayer con tus credenciales:

   ```typescript
   import { type IntlayerConfig } from 'intlayer';

   export default {
     ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   } satisfies  IntlayerConfig
   ```

3. **Envía un nuevo diccionario de locale a Intlayer:**

   ```bash
   npm intlayer push -d my-first-dictionary-key
   ```

   Este comando sube tus diccionarios de contenido iniciales, haciéndolos disponibles para la carga y edición asíncronas a través de la plataforma Intlayer.

## Importando `useIntlayerAsync` en React

En tus componentes de React, importa `useIntlayerAsync`:

```tsx
import { useIntlayerAsync } from "react-intlayer";
```

## Parámetros

1. **`key`**:  
   **Tipo**: `DictionaryKeys`  
   La clave del diccionario utilizada para identificar el bloque de contenido localizado. Esta clave debe estar definida en tus archivos de declaración de contenido.

2. **`locale`** (opcional):  
   **Tipo**: `Locales`  
   El locale específico que deseas apuntar. Si se omite, el hook usa el locale del contexto actual de Intlayer.

3. **`isRenderEditor`** (opcional, por defecto `true`):  
   **Tipo**: `boolean`  
   Determina si el contenido debe estar listo para renderizar con la superposición del editor de Intlayer. Si se establece en `false`, los datos del diccionario devuelto excluirán características específicas del editor.

## Valor de Retorno

El hook devuelve un objeto de diccionario que contiene contenido localizado indexado por `key` y `locale`. También incluye un booleano `isLoading` que indica si se está obteniendo actualmente un diccionario remoto.

## Ejemplo de Uso en un Componente de React

```tsx
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const AsyncClientComponentExample = () => {
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
          <p>Por favor, espera mientras se actualiza el contenido.</p>
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

- En el renderizado inicial, `title` y `description` provienen del diccionario de locale pre-obtenido o incrustado de forma estática.
- Mientras `isLoading` es `true`, se realiza una solicitud en segundo plano para obtener un diccionario actualizado.
- Una vez que se completa la obtención, `title` y `description` se actualizan con el contenido más reciente, y `isLoading` vuelve a `false`.

## Manejo de la Localización de Atributos

También puedes recuperar valores de atributos localizados para varias propiedades HTML (por ejemplo, `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Archivos de Declaración de Contenido

Todas las claves de contenido deben estar definidas en tus archivos de declaración de contenido para garantizar la seguridad de tipos y prevenir errores en tiempo de ejecución. Estos archivos permiten la validación por TypeScript, asegurando que siempre hagas referencia a claves y locales existentes.

Instrucciones para configurar archivos de declaración de contenido están disponibles [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/content_declaration/get_started.md).

## Más Información

- **Editor Visual de Intlayer:**  
  Integra con el editor visual de Intlayer para gestionar y editar contenido directamente desde la interfaz. Más detalles [aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_editor.md).

---

**En resumen**, `useIntlayerAsync` es un poderoso hook de React diseñado para mejorar la experiencia del usuario y mantener la frescura del contenido al fusionar diccionarios pre-renderizados o pre-obtenidos con actualizaciones de diccionarios asíncronas. Al aprovechar `isLoading` y las declaraciones de contenido basadas en TypeScript, puedes integrar sin problemas contenido localizado y dinámico en tus aplicaciones de React.
