---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Extraer cadenas
description: Aprende cómo extraer cadenas de tus componentes a un archivo .content ubicado cerca del componente.
keywords:
  - Extraer
  - Componentes
  - Migración
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - extract
---

# Extraer cadenas

```bash
npx intlayer extract
```

Este comando analiza tus archivos de código para extraer cadenas de los componentes a un archivo .content ubicado junto al componente. Admite selección interactiva de archivos o la especificación de archivos concretos.

## Alias:

- `npx intlayer ext`

## Argumentos:

**Opciones de selección de archivos:**

- **`-f, --file [files...]`**: Lista de archivos específicos para extraer. Si no se proporciona, el CLI escaneará para archivos coincidentes (`**/*.{tsx,jsx,vue,svelte,ts,js}`) y te pedirá que selecciones cuáles extraer.

  > Ejemplo: `npx intlayer extract -f src/components/MyComponent.tsx`

**Opciones de salida:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Directorio para guardar los archivos de declaración de contenido generados.

  > Ejemplo: `npx intlayer extract -o src/content`

- **`--code-only`**: Extraer solo el código del componente (no escribir declaración de contenido).

  > Ejemplo: `npx intlayer extract --code-only`

- **`--declaration-only`**: Generar solo la declaración de contenido (no reescribir el componente).

  > Ejemplo: `npx intlayer extract --declaration-only`

**Opciones de configuración:**

- **`--base-dir`**: Especificar el directorio base del proyecto.
- **`--env`**: Especificar el entorno.
- **`--env-file`**: Proporcionar un archivo de entorno personalizado.
- **`--verbose`**: Habilitar el registro detallado.

**Plugins requeridos:**

El comando `extract` funciona sin plugins adicionales en archivos TypeScript / JSX. Sin embargo, requiere que se instalen los siguientes plugins para proyectos Vue y Svelte:

- **`@intlayer/vue-transformer`**: Para archivos Vue.
- **`@intlayer/svelte-transformer`**: Para archivos Svelte.
