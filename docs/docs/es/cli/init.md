---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Inicializar Intlayer
description: Aprenda cómo inicializar Intlayer en su proyecto.
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "Agregar opción --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Agregar comando init"
---

# Inicializar Intlayer

```bash
npx intlayer init
```

El comando `init` configura automáticamente Intlayer en su proyecto ajustando los archivos y configuraciones necesarios. Es la forma recomendada de comenzar con Intlayer.

## Alias:

- `npx intlayer init`

## Argumentos:

- `--project-root [projectRoot]` - Opcional. Especifique el directorio raíz del proyecto. Si no se proporciona, el comando buscará la raíz del proyecto comenzando desde el directorio de trabajo actual.
- `--no-gitignore` - Opcional. Omite la actualización automática del archivo `.gitignore`. Si se establece esta bandera, `.intlayer` no se agregará a `.gitignore`.

## Qué hace:

El comando `init` realiza las siguientes tareas de configuración:

1. **Valida la estructura del proyecto** - Asegura que se encuentra en un directorio de proyecto válido con un archivo `package.json`.
2. **Actualiza el `.gitignore`** - Agrega `.intlayer` a su archivo `.gitignore` para excluir los archivos generados del control de versiones (puede omitirse con `--no-gitignore`).
3. **Configura TypeScript** - Actualiza todos los archivos `tsconfig.json` para incluir las definiciones de tipos de Intlayer (`.intlayer/**/*.ts`).
4. **Crea el archivo de configuración** - Genera un `intlayer.config.ts` (para proyectos TypeScript) o `intlayer.config.mjs` (para proyectos JavaScript) con la configuración predeterminada.
5. **Actualiza la configuración de Vite** - Si se detecta un archivo de configuración de Vite, agrega la importación del complemento `vite-intlayer`.
6. **Actualiza la configuración de Next.js** - Si se detecta un archivo de configuración de Next.js, agrega la importación del complemento `next-intlayer`.

## Ejemplos:

### Inicialización básica:

```bash
npx intlayer init
```

Esto inicializará Intlayer en el directorio actual, detectando automáticamente la raíz del proyecto.

### Inicializar con una raíz de proyecto personalizada:

```bash
npx intlayer init --project-root ./my-project
```

Esto inicializará Intlayer en el directorio especificado.

### Inicializar sin actualizar el .gitignore:

```bash
npx intlayer init --no-gitignore
```

Esto establecerá todos los archivos de configuración pero no modificará su `.gitignore`.

## Ejemplo de salida:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Notas:

- El comando es idempotente: puede ejecutarlo varias veces de forma segura. Omitirá los pasos que ya estén configurados.
- Si ya existe un archivo de configuración, no se sobrescribirá.
- Se omiten los archivos de configuración de TypeScript sin una matriz `include` (por ejemplo, configuraciones de estilo de solución con referencias).
- El comando se cerrará con un error si no se encuentra ningún `package.json` en la raíz del proyecto.
