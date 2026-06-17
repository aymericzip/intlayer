---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Revisar Documento
description: Aprende cómo revisar archivos de documentación para calidad, consistencia y completitud en diferentes locales.
keywords:
  - Revisión
  - Documento
  - Documentación
  - IA
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
author: aymericzip
---

# Revisar Documento

El comando `doc review` analiza archivos de documentación para calidad, consistencia y completitud en diferentes locales.

## Puntos clave:

- Divide archivos markdown grandes en fragmentos para mantenerse dentro de los límites de la ventana de contexto del modelo de IA.
- Optimiza los fragmentos a revisar y omite las partes que ya están traducidas y no han cambiado.
- Procesa archivos, fragmentos y locales en paralelo usando un sistema de cola para aumentar la velocidad.

```bash packageManager="npm"
npx intlayer doc review
```

```bash packageManager="yarn"
yarn intlayer doc review
```

```bash packageManager="pnpm"
pnpm intlayer doc review
```

```bash packageManager="bun"
bun x intlayer doc review
```

Se puede usar para revisar archivos que ya están traducidos y para verificar si la traducción es correcta.

Para la mayoría de los casos de uso,

- prefiere usar `doc translate` cuando la versión traducida de este archivo no está disponible.
- prefiere usar `doc review` cuando la versión traducida de este archivo ya existe.

> Ten en cuenta que el proceso de revisión consume más tokens de entrada que el proceso de traducción para revisar el mismo archivo en su totalidad. Sin embargo, el proceso de revisión optimizará los fragmentos a revisar y omitirá las partes que no hayan cambiado.

## Argumentos:

**Opciones de lista de archivos:**

- **`--doc-pattern [docPattern...]`**: Patrones glob para coincidir con archivos de documentación a revisar.

  > Ejemplo: `npx intlayer doc review --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Patrones glob para excluir archivos de la revisión.

  > Ejemplo: `npx intlayer doc review --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Omitir el archivo si ha sido modificado antes del tiempo dado.
  - Puede ser un tiempo absoluto como "2025-12-05" (string o Date)
  - Puede ser un tiempo relativo en ms `1 * 60 * 60 * 1000` (1 hora)
  - Esta opción verifica la hora de actualización del archivo usando el método `fs.stat`. Por lo tanto, podría verse afectada por Git u otras herramientas que modifiquen el archivo.

  > Ejemplo: `npx intlayer doc review --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Omitir el archivo si ha sido modificado dentro del tiempo dado.
  - Puede ser un tiempo absoluto como "2025-12-05" (string o Date)
  - Puede ser un tiempo relativo en ms `1 * 60 * 60 * 1000` (1 hora)
  - Esta opción verifica la hora de actualización del archivo usando el método `fs.stat`. Por lo tanto, podría verse afectada por Git u otras herramientas que modifiquen el archivo.

  > Ejemplo: `npx intlayer doc review --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Omitir el archivo si ya existe.

  > Ejemplo: `npx intlayer doc review --skip-if-exists`

**Opciones de modo de revisión:**

- **`--log`**: Modo de solo registro. No traduce con IA; en su lugar, registra los bloques que necesitan atención (con números de línea y contenido) para los locales base y destino, para ayudar a otro agente a generar las traducciones.

  > Ejemplo: `npx intlayer doc review --log`

**Opciones de salida de entrada:**

- **`--locales [locales...]`**: Locales de destino para revisar la documentación.

  > Ejemplo: `npx intlayer doc review --locales fr es de`

- **`--base-locale [baseLocale]`**: Locale de origen (documento base) contra el cual comparar.

  > Ejemplo: `npx intlayer doc review --base-locale en`

**Opciones de procesamiento de archivos:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Número de archivos a procesar simultáneamente para la revisión.

  > Ejemplo: `npx intlayer doc review --nb-simultaneous-file-processed 5`

**Opciones de IA:**

- **`--model [model]`**: El modelo de IA a usar para la revisión (por ejemplo, `gpt-3.5-turbo`).
- **`--provider [provider]`**: El proveedor de IA a usar para la revisión.
- **`--temperature [temperature]`**: Configuración de temperatura para el modelo de IA.
- **`--api-key [apiKey]`**: Proporciona tu propia clave API para el servicio de IA.
- **`--application-context [applicationContext]`**: Proporciona contexto adicional para la revisión de IA.
- **`--data-serialization [dataSerialization]`**: El formato de serialización de datos a utilizar para las funciones de IA de Intlayer. Opciones: `json` (estándar, confiable), `toon` (menos tokens, menos consistente).
- **`--custom-prompt [prompt]`**: Personaliza el prompt base utilizado para la revisión. (Nota: Para la mayoría de los casos, se recomienda usar la opción `--custom-instructions` en su lugar, ya que proporciona un mejor control.)

  > Ejemplo: `npx intlayer doc review --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Mi aplicación es una tienda de gatos"`

**Opciones de variables de entorno:**

- **`--env`**: Especifica el entorno (por ejemplo, `development`, `production`).
- **`--env-file [envFile]`**: Proporciona un archivo de entorno personalizado para cargar variables.
- **`--base-dir`**: Especifica el directorio base para el proyecto.
- **`--no-cache`**: Desactiva la caché.

  > Ejemplo: `npx intlayer doc review --base-dir ./docs --env-file .env.production.local`

**Opciones de registro:**

- **`--verbose`**: Habilita el registro detallado para depuración. (por defecto es true usando CLI)

  > Ejemplo: `npx intlayer doc review --verbose`

**Opciones de instrucciones personalizadas:**

- **`--custom-instructions [customInstructions]`**: Instrucciones personalizadas añadidas al prompt. Útil para aplicar reglas específicas respecto al formato, traducción de URLs, etc.

  > Ejemplo: `npx intlayer doc review --custom-instructions "Evitar traducir URLs y mantener el formato markdown"`

  > Ejemplo: `npx intlayer doc review --custom-instructions "$(cat ./instructions.md)"`

**Opciones de Git:**

- **`--git-diff`**: Ejecutar solo en archivos que incluyan cambios desde la base (por defecto `origin/main`) hasta la rama actual (por defecto: `HEAD`).
- **`--git-diff-base`**: Especificar la referencia base para git diff (por defecto `origin/main`).
- **`--git-diff-current`**: Especificar la referencia actual para git diff (por defecto: `HEAD`).
- **`--uncommitted`**: Incluir cambios no confirmados.
- **`--unpushed`**: Incluir cambios no enviados.
- **`--untracked`**: Incluir archivos no rastreados.

  > Ejemplo: `npx intlayer doc review --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Ejemplo: `npx intlayer doc review --uncommitted --unpushed --untracked`

> Tenga en cuenta que la ruta del archivo de salida se determinará reemplazando los siguientes patrones:
>
> - `/{{baseLocale}}/` por `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` por `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` por `_{{locale}}.`
> - `{{baseLocale}}_` por `{{locale}}_`
> - `.{{baseLocaleName}}.` por `.{{localeName}}.`
>
> Si no se encuentra el patrón, el archivo de salida añadirá `.{{locale}}` a la extensión del archivo. `./my/file.md` se revisará y actualizará a `./my/file.fr.md` para el locale francés.
