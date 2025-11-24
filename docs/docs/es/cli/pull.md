---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Extraer Diccionarios
description: Aprende cómo extraer diccionarios desde el editor y CMS de Intlayer.
keywords:
  - Extraer
  - Diccionarios
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - pull
---

# Extraer Diccionarios Remotos

```bash
npx intlayer pull
```

Si tienes instalado el [editor de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md), también puedes extraer diccionarios desde el editor. De esta forma, puedes sobrescribir el contenido de tus diccionarios según las necesidades de tu aplicación.

## Alias:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

## Argumentos:

**Opciones de diccionario:**

- **`-d, --dictionaries`**: Ids de los diccionarios a extraer. Si no se especifica, se extraerán todos los diccionarios.

  > Ejemplo: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: Ids de los diccionarios a extraer (alias de --dictionaries).

  > Ejemplo: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**Opciones de configuración:**

- **`--base-dir`**: Especifica el directorio base para el proyecto. Para obtener la configuración de intlayer, el comando buscará el archivo `intlayer.config.{ts,js,json,cjs,mjs}` en el directorio base.

  > Ejemplo: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Desactiva la caché.

  > Ejemplo: `npx intlayer build --no-cache`

**Opciones de variables de entorno:**

- **`--env`**: Especifica el entorno (por ejemplo, `development`, `production`).
- **`--env-file`**: Proporciona un archivo de entorno personalizado para cargar variables.
- **`--base-dir`**: Especifica el directorio base para el proyecto. Para obtener la configuración de intlayer, el comando buscará el archivo `intlayer.config.{ts,js,json,cjs,mjs}` en el directorio base.

  > Ejemplo: `npx intlayer dictionary push --env-file .env.production.local`

  > Ejemplo: `npx intlayer dictionary push --env production`

**Opciones de salida:**

- **`--new-dictionaries-path`** : Ruta al directorio donde se guardarán los nuevos diccionarios. Si no se especifica, los nuevos diccionarios se guardarán en el directorio `./intlayer-dictionaries` del proyecto. Si se especifica un campo `filePath` en el contenido de tu diccionario, los diccionarios no considerarán este argumento y se guardarán en el directorio `filePath` especificado.

**Opciones de registro:**

- **`--verbose`**: Habilita el registro detallado para depuración. (por defecto es true usando la CLI)

## Ejemplo:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```
