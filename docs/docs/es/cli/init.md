---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Inicializar Intlayer
description: Aprende a inicializar Intlayer en tu proyecto.
keywords:
  - Inicializar
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Agregar comando init
---

# Inicializar Intlayer

```bash
npx intlayer init
```

El comando `init` configura Intlayer automáticamente en tu proyecto ajustando los archivos y la configuración necesarios. Es la forma recomendada para comenzar con Intlayer.

## Alias:

- `npx intlayer init`

## Argumentos:

- `--project-root [projectRoot]` - Opcional. Especifica el directorio raíz del proyecto. Si no se proporciona, el comando buscará el directorio raíz del proyecto empezando desde el directorio de trabajo actual.

## Qué hace:

The `init` command performs the following setup tasks:

1. **Valida la estructura del proyecto** - Asegura que estés en un directorio de proyecto válido con un archivo `package.json`
2. **Actualiza `.gitignore`** - Agrega `.intlayer` a tu archivo `.gitignore` para excluir archivos generados del control de versiones
3. **Configura TypeScript** - Actualiza todos los archivos `tsconfig.json` para incluir las definiciones de tipos de Intlayer (`.intlayer/**/*.ts`)
4. **Crea archivo de configuración** - Genera un `intlayer.config.ts` (para proyectos TypeScript) o `intlayer.config.mjs` (para proyectos JavaScript) con la configuración por defecto
5. **Actualiza la configuración de Vite** - Si se detecta un archivo de configuración de Vite, añade la importación del plugin `vite-intlayer`
6. **Actualiza la configuración de Next.js** - Si se detecta un archivo de configuración de Next.js, agrega la importación del plugin `next-intlayer`

## Ejemplos:

### Inicialización básica:

```bash
npx intlayer init
```

Esto inicializará Intlayer en el directorio actual, detectando automáticamente la raíz del proyecto.

### Inicializar con raíz de proyecto personalizada:

```bash
npx intlayer init --project-root ./my-project
```

Esto inicializará Intlayer en el directorio especificado.

## Ejemplo de salida:

```bash
npx intlayer init
Comprobando la configuración de Intlayer...
✓ Agregado .intlayer a .gitignore
✓ Actualizado tsconfig.json para incluir los tipos de Intlayer
Creado intlayer.config.ts
✓ Inyectada la importación en vite.config.ts
✓ Inicialización de Intlayer completada.
```

## Notas:

- El comando es idempotente - puedes ejecutarlo varias veces de forma segura. Omitirá los pasos que ya estén configurados.
- Si ya existe un archivo de configuración, no será sobrescrito.
- Se omiten los archivos de configuración de TypeScript que no tienen un `include` array (p. ej., configuraciones solution-style con referencias).
- El comando finalizará con un error si no se encuentra un `package.json` en la raíz del proyecto.
