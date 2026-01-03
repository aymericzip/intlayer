---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Empujar Diccionarios
description: Aprende cómo empujar tus diccionarios al editor y CMS de Intlayer.
keywords:
  - Empujar
  - Diccionarios
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - push
---

# Empujar Diccionarios

```bash
npx intlayer dictionary push
```

Si el [editor de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) está instalado, también puedes empujar diccionarios al editor. Este comando permitirá que los diccionarios estén disponibles para [el editor](https://app.intlayer.org/). De esta manera, puedes compartir tus diccionarios con tu equipo y editar tu contenido sin modificar el código de tu aplicación.

## Alias:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

## Argumentos:

**Opciones de diccionario:**

- **`-d`, `--dictionaries`**: ids de los diccionarios a empujar. Si no se especifica, se empujarán todos los diccionarios.

  > Ejemplo: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: ids de los diccionarios a empujar (alias de --dictionaries).

  > Ejemplo: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**Opciones de configuración:**

- **`--base-dir`**: Especifica el directorio base del proyecto. Para obtener la configuración de intlayer, el comando buscará el archivo `intlayer.config.{ts,js,json,cjs,mjs}` en el directorio base.

  > Ejemplo: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Deshabilita la caché.

  > Ejemplo: `npx intlayer build --no-cache`

**Opciones de variables de entorno:**

- **`--env`**: Especifica el entorno (por ejemplo, `development`, `production`). Útil en caso de que uses variables de entorno en tu archivo de configuración de intlayer.
- **`--env-file`**: Proporciona un archivo de entorno personalizado para cargar variables. Útil en caso de que uses variables de entorno en tu archivo de configuración de intlayer.

  > Ejemplo: `npx intlayer dictionary push --env-file .env.production.local`

  > Ejemplo: `npx intlayer dictionary push --env production`

**Opciones de salida:**

- **`-r`, `--delete-locale-dictionary`**: Omite la pregunta que solicita eliminar los directorios de locales una vez que los diccionarios son enviados, y los elimina. Por defecto, si el diccionario está definido localmente, sobrescribirá el contenido de los diccionarios remotos.

  > Ejemplo: `npx intlayer dictionary push -r`

  > Ejemplo: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Omite la pregunta que solicita eliminar los directorios de locales una vez que los diccionarios son enviados, y los conserva. Por defecto, si el diccionario está definido localmente, sobrescribirá el contenido de los diccionarios remotos.

  > Ejemplo: `npx intlayer dictionary push -k`

  > Ejemplo: `npx intlayer dictionary push --keep-locale-dictionary`

**Opciones de preparación:**

- **`--build`**: Construye los diccionarios antes de enviarlos para asegurar que el contenido esté actualizado. True forzará la construcción, false la omitirá, undefined permitirá usar la caché de la construcción.

**Opciones de registro:**

- **`--verbose`**: Habilita el registro detallado para depuración. (por defecto true usando CLI)

**Opciones de Git:**

- **`--git-diff`**: Solo ejecuta en diccionarios que incluyen cambios desde la base (por defecto `origin/main`) hasta la rama actual (por defecto: `HEAD`).
- **`--git-diff-base`**: Especifica la referencia base para git diff (por defecto `origin/main`).
- **`--git-diff-current`**: Especifica la referencia actual para git diff (por defecto: `HEAD`).
- **`--uncommitted`**: Incluye cambios no confirmados.
- **`--unpushed`**: Incluye cambios no enviados.
- **`--untracked`**: Incluye archivos no rastreados.

  > Ejemplo: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Ejemplo: `npx intlayer dictionary push --uncommitted --unpushed --untracked`
