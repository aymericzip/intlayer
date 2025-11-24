---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Transformar Componentes
description: Aprende cómo transformar componentes existentes para usar Intlayer.
keywords:
  - Transformar
  - Componentes
  - Migración
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - transform
---

# Transformar componentes

```bash
npx intlayer transform
```

Este comando analiza tus archivos de código para ayudar a migrar componentes existentes a usar Intlayer. Soporta selección interactiva de archivos o la selección específica de archivos.

## Alias:

- `npx intlayer trans`

## Argumentos:

**Opciones de selección de archivos:**

- **`-f, --file [files...]`**: Lista de archivos específicos para transformar. Si no se proporciona, el CLI escaneará archivos que coincidan (`**/*.{tsx,jsx,vue,svelte,ts,js}`) y te pedirá seleccionar cuáles transformar.

  > Ejemplo: `npx intlayer transform -f src/components/MyComponent.tsx`

**Opciones de salida:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Directorio para guardar los archivos generados de declaración de contenido.

  > Ejemplo: `npx intlayer transform -o src/content`

- **`--code-only`**: Solo transforma el código del componente (no escribe la declaración de contenido).

  > Ejemplo: `npx intlayer transform --code-only`

- **`--declaration-only`**: Solo genera la declaración de contenido (no reescribe el componente).

  > Ejemplo: `npx intlayer transform --declaration-only`

**Opciones de configuración:**

- **`--base-dir`**: Especifica el directorio base para el proyecto.
- **`--env`**: Especifica el entorno.
- **`--env-file`**: Proporciona un archivo de entorno personalizado.
- **`--verbose`**: Habilita el registro detallado.

**Plugins requeridos:**

El comando transform funciona sin plugins adicionales en archivos TypeScript / JSX. Sin embargo, requiere que los siguientes plugins estén instalados para proyectos Vue y Svelte:

- **`@intlayer/vue-transformer`**: Para archivos Vue.
- **`@intlayer/svelte-transformer`**: Para archivos Svelte.
