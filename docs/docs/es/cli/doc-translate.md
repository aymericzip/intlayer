---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Traducir Documento
description: Aprende cómo traducir automáticamente archivos de documentación usando servicios de traducción AI.
keywords:
  - Traducir
  - Documento
  - Documentación
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-translate
---

# Traducir Documento

El comando `doc translate` traduce automáticamente archivos de documentación desde un locale base a locales destino usando servicios de traducción AI.

```bash
npx intlayer doc translate
```

## Argumentos:

**Opciones de lista de archivos:**

- **`--doc-pattern [docPattern...]`**: Patrones glob para coincidir con archivos de documentación a traducir.

  > Ejemplo: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Patrones glob para excluir archivos de la traducción.

  > Ejemplo: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Omitir el archivo si ha sido modificado antes del tiempo dado.
  - Puede ser un tiempo absoluto como "2025-12-05" (string o Date)
  - Puede ser un tiempo relativo en ms `1 * 60 * 60 * 1000` (1 hora)
  - Esta opción verifica la hora de actualización del archivo usando el método `fs.stat`. Por lo tanto, podría verse afectada por Git u otras herramientas que modifiquen el archivo.

  > Ejemplo: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Omitir el archivo si ha sido modificado dentro del tiempo dado.
  - Puede ser un tiempo absoluto como "2025-12-05" (string o Date)
  - Puede ser un tiempo relativo en ms `1 * 60 * 60 * 1000` (1 hora)
  - Esta opción verifica la hora de actualización del archivo usando el método `fs.stat`. Por lo tanto, podría verse afectada por Git u otras herramientas que modifiquen el archivo.

  > Ejemplo: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Omitir el archivo si ya existe.

  > Ejemplo: `npx intlayer doc translate --skip-if-exists`

**Opciones de salida de entrada:**

- **`--locales [locales...]`**: Locales de destino para traducir la documentación.

  > Ejemplo: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: Locale de origen desde el cual traducir.

  > Ejemplo: `npx intlayer doc translate --base-locale en`

**Opciones de procesamiento de archivos:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Número de archivos a procesar simultáneamente para la traducción.

  > Ejemplo: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**Opciones de IA:**

- **`--model [model]`**: El modelo de IA a usar para la traducción (por ejemplo, `gpt-3.5-turbo`).
- **`--provider [provider]`**: El proveedor de IA a usar para la traducción.
- **`--temperature [temperature]`**: Configuración de temperatura para el modelo de IA.
- **`--api-key [apiKey]`**: Proporciona tu propia clave API para el servicio de IA.
- **`--application-context [applicationContext]`**: Proporciona contexto adicional para la traducción de IA.
- **`--custom-prompt [prompt]`**: Personaliza el prompt base utilizado para la traducción. (Nota: Para la mayoría de los casos, se recomienda usar la opción `--custom-instructions` en su lugar, ya que proporciona un mejor control sobre el comportamiento de la traducción.)

  > Ejemplo: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Mi aplicación es una tienda de gatos"`

**Opciones de variables de entorno:**

- **`--env`**: Especifica el entorno (por ejemplo, `development`, `production`).
- **`--env-file [envFile]`**: Proporciona un archivo de entorno personalizado para cargar variables.
- **`--base-dir`**: Especifica el directorio base para el proyecto.
- **`--no-cache`**: Desactiva la caché.

  > Ejemplo: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Opciones de registro:**

- **`--verbose`**: Habilita el registro detallado para depuración. (por defecto es true usando CLI)

  > Ejemplo: `npx intlayer doc translate --verbose`

**Opciones de instrucciones personalizadas:**

- **`--custom-instructions [customInstructions]`**: Instrucciones personalizadas añadidas al prompt. Útil para aplicar reglas específicas respecto al formato, traducción de URLs, etc.
  - Puede ser un tiempo absoluto como "2025-12-05" (string o Date)
  - Puede ser un tiempo relativo en ms `1 * 60 * 60 * 1000` (1 hora)
  - Esta opción verifica la fecha de actualización del archivo usando el método `fs.stat`. Por lo tanto, podría verse afectada por Git u otras herramientas que modifiquen el archivo.

  > Ejemplo: `npx intlayer doc translate --custom-instructions "Evitar traducir URLs y mantener el formato markdown"`

  > Ejemplo: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Opciones de Git:**

- **`--git-diff`**: Ejecutar solo en diccionarios que incluyan cambios desde la base (por defecto `origin/main`) hasta la rama actual (por defecto: `HEAD`).
- **`--git-diff-base`**: Especificar la referencia base para git diff (por defecto `origin/main`).
- **`--git-diff-current`**: Especificar la referencia actual para git diff (por defecto: `HEAD`).
- **`--uncommitted`**: Incluir cambios no confirmados.
- **`--unpushed`**: Incluir cambios no enviados.
- **`--untracked`**: Incluir archivos no rastreados.

  > Ejemplo: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Ejemplo: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> Tenga en cuenta que la ruta del archivo de salida se determinará reemplazando los siguientes patrones
>
> - `/{{baseLocale}}/` por `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` por `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` por `_{{locale}}.`
> - `{{baseLocale}}_` por `{{locale}}_`
> - `.{{baseLocaleName}}.` por `.{{localeName}}.`
>
> Si no se encuentra el patrón, el archivo de salida añadirá `.{{locale}}` a la extensión del archivo. `./my/file.md` se traducirá a `./my/file.fr.md` para el locale francés.
