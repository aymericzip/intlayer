---
createdAt: 2024-08-11
updatedAt: 2025-07-11
title: CLI
description: Descubre cómo usar el CLI de Intlayer para gestionar tu sitio web multilingüe. Sigue los pasos en esta documentación en línea para configurar tu proyecto en pocos minutos.
keywords:
  - CLI
  - Interfaz de Línea de Comandos
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 5.5.11
    date: 2025-07-11
    changes: Actualización de la documentación de parámetros de comandos CLI
  - version: 5.5.10
    date: 2025-06-29
    changes: Historial inicial
---

# Intlayer CLI

## Instalar Paquete

Instala los paquetes necesarios usando npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> Si el paquete `intlayer` ya está instalado, el CLI se instala automáticamente. Puedes omitir este paso.

## Paquete intlayer-cli

El paquete `intlayer-cli` tiene como objetivo transpilar tus [declaraciones de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md) en diccionarios.

Este paquete transpilará todos los archivos de intlayer, tales como `src/**/*.content.{ts|js|mjs|cjs|json}`. [Consulta cómo declarar tus archivos de declaración Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Para interpretar los diccionarios de intlayer puedes usar intérpretes, como [react-intlayer](https://www.npmjs.com/package/react-intlayer), o [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Soporte para Archivos de Configuración

Intlayer acepta múltiples formatos de archivo de configuración:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Para ver cómo configurar los locales disponibles u otros parámetros, consulta la [documentación de configuración aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

## Ejecutar comandos de intlayer

### Construir diccionarios

Para construir tus diccionarios, puedes ejecutar los comandos:

```bash
npx intlayer build
```

o en modo observación

```bash
npx intlayer build --watch
```

Este comando buscará tus archivos de contenido de declaración por defecto en `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. Y construirá los diccionarios en el directorio `.intlayer`.

##### Alias:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### Enviar diccionarios

```bash
npx intlayer dictionary push
```

Si tienes instalado el [editor de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md), también puedes enviar los diccionarios al editor. Este comando permitirá que los diccionarios estén disponibles en [el editor](https://intlayer.org/dashboard). De esta manera, puedes compartir tus diccionarios con tu equipo y editar tu contenido sin modificar el código de tu aplicación.

##### Alias:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### Argumentos:

**Opciones de diccionario:**

- **`-d`, `--dictionaries`**: IDs de los diccionarios a enviar. Si no se especifica, se enviarán todos los diccionarios.

  > Ejemplo: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

**Opciones de configuración:**

- **`--base-dir`**: Especifica el directorio base del proyecto. Para obtener la configuración de intlayer, el comando buscará el archivo `intlayer.config.{ts,js,json,cjs,mjs}` en el directorio base.

  > Ejemplo: `npx intlayer dictionary push --env-file .env.production.local`

**Opciones de variables de entorno:**

- **`--env`**: Especifica el entorno (por ejemplo, `development`, `production`). Útil en caso de que uses variables de entorno en tu archivo de configuración de intlayer.
- **`--env-file`**: Proporciona un archivo de entorno personalizado desde el cual cargar variables. Útil en caso de que uses variables de entorno en tu archivo de configuración de intlayer.

  > Ejemplo: `npx intlayer dictionary push --env-file .env.production.local`

  > Ejemplo: `npx intlayer dictionary push --env production`

**Opciones de salida:**

- **`-r`, `--delete-locale-dictionary`**: Omitir la pregunta que solicita eliminar los directorios de locales una vez que los diccionarios se han enviado, y eliminarlos. Por defecto, si el diccionario está definido localmente, sobrescribirá el contenido de los diccionarios remotos.

  > Ejemplo: `npx intlayer dictionary push -r`

  > Ejemplo: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Omitir la pregunta que solicita eliminar los directorios de locales una vez que los diccionarios se han enviado, y mantenerlos. Por defecto, si el diccionario está definido localmente, sobrescribirá el contenido de los diccionarios remotos.

  > Ejemplo: `npx intlayer dictionary push -k`

  > Ejemplo: `npx intlayer dictionary push --keep-locale-dictionary`

**Opciones de registro:**

- **`--verbose`**: Habilitar el registro detallado para depuración.

**Opciones de Git:**

- **`--git-diff`**: Ejecutar solo en diccionarios que incluyan cambios desde la base (por defecto `origin/main`) hasta la rama actual (por defecto: `HEAD`).
- **`--git-diff-base`**: Especificar la referencia base para el diff de git (por defecto `origin/main`).
- **`--git-diff-current`**: Especificar la referencia actual para el diff de git (por defecto `HEAD`).
- **`--uncommitted`**: Incluir cambios no confirmados.
- **`--unpushed`**: Incluir cambios no enviados.
- **`--untracked`**: Incluir archivos no rastreados.

  > Ejemplo: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Ejemplo: `npx intlayer dictionary push --uncommitted --unpushed --untracked`

### Descargar diccionarios remotos

```bash
npx intlayer pull
```

Si el [editor de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) está instalado, también puedes descargar diccionarios desde el editor. De esta manera, puedes sobrescribir el contenido de tus diccionarios según las necesidades de tu aplicación.

##### Alias:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### Argumentos:

**Opciones de diccionario:**

- **`-d, --dictionaries`**: IDs de los diccionarios a descargar. Si no se especifica, se descargarán todos los diccionarios.

  > Ejemplo: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

**Opciones de configuración:**

- **`--base-dir`**: Especifica el directorio base para el proyecto. Para obtener la configuración de intlayer, el comando buscará el archivo `intlayer.config.{ts,js,json,cjs,mjs}` en el directorio base.

  > Ejemplo: `npx intlayer dictionary push --env-file .env.production.local`

**Opciones de variables de entorno:**

- **`--env`**: Especifica el entorno (por ejemplo, `development`, `production`).
- **`--env-file`**: Proporciona un archivo de entorno personalizado para cargar variables.
- **`--base-dir`**: Especifica el directorio base para el proyecto. Para obtener la configuración de intlayer, el comando buscará el archivo `intlayer.config.{ts,js,json,cjs,mjs}` en el directorio base.

  > Ejemplo: `npx intlayer dictionary push --env-file .env.production.local`

  > Ejemplo: `npx intlayer dictionary push --env production`

**Opciones de salida:**

- **`--new-dictionaries-path`**: Ruta al directorio donde se guardarán los nuevos diccionarios. Si no se especifica, los nuevos diccionarios se guardarán en el directorio `./intlayer-dictionaries` del proyecto. Si en el contenido de tu diccionario se especifica un campo `filePath`, los diccionarios no considerarán este argumento y se guardarán en el directorio `filePath` especificado.

**Opciones de registro:**

- **`--verbose`**: Habilita el registro detallado para depuración.

##### Ejemplo:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Rellenar / auditar / traducir diccionarios

```bash
npx intlayer fill
```

Este comando analiza tus archivos de declaración de contenido en busca de posibles problemas como traducciones faltantes, inconsistencias estructurales o incompatibilidades de tipos. Si encuentra algún problema, **intlayer fill** propondrá o aplicará actualizaciones para mantener tus diccionarios consistentes y completos.

##### Alias:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### Argumentos:

**Opciones de lista de archivos:**

- **`-f, --file [files...]`**: Una lista de archivos específicos de declaración de contenido para auditar. Si no se proporciona, se auditarán todos los archivos `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` descubiertos según la configuración de tu archivo.

  > Ejemplo: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Filtra los diccionarios basándose en claves. Si no se proporciona, se auditarán todos los diccionarios.

  > Ejemplo: `npx intlayer dictionary fill -k key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Excluye diccionarios basándose en claves. Si no se proporciona, se auditarán todos los diccionarios.

  > Ejemplo: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--path-filter [pathFilters...]`**: Filtra diccionarios basándose en un patrón glob para rutas de archivos.

  > Ejemplo: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Opciones de salida de entrada:**

- **`--source-locale [sourceLocale]`**: La localización origen desde la cual traducir. Si no se especifica, se usará la localización predeterminada de tu configuración.

- **`--output-locales [outputLocales...]`**: Locales de destino para traducir. Si no se especifica, se usarán todas las locales de tu configuración excepto la local de origen.

- **`--mode [mode]`**: Modo de traducción: 'complete' (completo), 'review' (revisión) o 'missing-only' (solo faltantes). El valor predeterminado es 'missing-only'.

**Opciones de Git:**

- **`--git-diff`**: Ejecutar solo en diccionarios que incluyan cambios desde la base (por defecto `origin/main`) hasta la rama actual (por defecto: `HEAD`).
- **`--git-diff-base`**: Especificar la referencia base para el diff de git (por defecto `origin/main`).
- **`--git-diff-current`**: Especificar la referencia actual para el diff de git (por defecto: `HEAD`).
- **`--uncommitted`**: Incluir cambios no confirmados.
- **`--unpushed`**: Incluir cambios no enviados.
- **`--untracked`**: Incluir archivos no rastreados.

  > Ejemplo: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Ejemplo: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**Opciones de IA:**

- **`--model [model]`**: El modelo de IA a utilizar para la traducción (por ejemplo, `gpt-3.5-turbo`).
- **`--provider [provider]`**: El proveedor de IA a utilizar para la traducción.
- **`--temperature [temperature]`**: Configuración de temperatura para el modelo de IA.
- **`--api-key [apiKey]`**: Proporciona tu propia clave API para el servicio de IA.
- **`--custom-prompt [prompt]`**: Proporciona un prompt personalizado para tus instrucciones de traducción.
- **`--application-context [applicationContext]`**: Proporciona contexto adicional para la traducción de IA.

  > Ejemplo: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "Mi aplicación es una tienda de gatos"`

**Opciones de variables de entorno:**

- **`--env`**: Especificar el entorno (por ejemplo, `development`, `production`).
- **`--env-file [envFile]`**: Proporcionar un archivo de entorno personalizado para cargar variables.

  > Ejemplo: `npx intlayer fill --env-file .env.production.local`

  > Ejemplo: `npx intlayer fill --env production`

**Opciones de configuración:**

- **`--base-dir`**: Especificar el directorio base para el proyecto.

  > Ejemplo: `npx intlayer fill --base-dir ./src`

**Opciones de registro:**

- **`--verbose`**: Habilitar registros detallados para depuración.

##### Ejemplo:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Este comando traducirá el contenido del inglés al francés y español para todos los archivos de declaración de contenido en el directorio `src/home/` usando el modelo GPT-3.5 Turbo.

### Gestionar Configuración

#### Obtener Configuración

El comando `configuration get` recupera la configuración actual de Intlayer, particularmente las configuraciones de localización. Esto es útil para verificar tu configuración.

```bash
npx intlayer configuration get
```

##### Alias:

- `npx intlayer config get`
- `npx intlayer conf get`

##### Argumentos:

- **`--env`**: Especificar el entorno (por ejemplo, `development`, `production`).
- **`--env-file`**: Proporcionar un archivo de entorno personalizado para cargar variables desde él.
- **`--base-dir`**: Especifica el directorio base para el proyecto.
- **`--verbose`**: Habilita el registro detallado para depuración.

#### Enviar Configuración

El comando `configuration push` sube tu configuración al CMS y editor de Intlayer. Este paso es necesario para habilitar el uso de diccionarios remotos en el Editor Visual de Intlayer.

```bash
npx intlayer configuration push
```

##### Alias:

- `npx intlayer config push`
- `npx intlayer conf push`

##### Argumentos:

- **`--env`**: Especifica el entorno (por ejemplo, `development`, `production`).
- **`--env-file`**: Proporciona un archivo de entorno personalizado para cargar variables.
- **`--base-dir`**: Especifica el directorio base para el proyecto.
- **`--verbose`**: Habilita el registro detallado para depuración.

Al enviar la configuración, su proyecto queda completamente integrado con el CMS de Intlayer, lo que permite una gestión fluida de los diccionarios entre equipos.

### Gestión de Documentación

Los comandos `doc` proporcionan herramientas para gestionar y traducir archivos de documentación en múltiples locales.

#### Traducir Documentación

El comando `doc translate` traduce automáticamente archivos de documentación desde un locale base a locales destino utilizando servicios de traducción por IA.

```bash
npx intlayer doc translate
```

##### Argumentos:

**Opciones de lista de archivos:**

- **`--doc-pattern [docPattern...]`**: Patrones glob para coincidir con los archivos de documentación a traducir.

  > Ejemplo: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Patrones glob para excluir de la traducción.

  > Ejemplo: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Omitir el archivo si ha sido modificado antes del tiempo dado.

  - Puede ser un tiempo absoluto como "2025-12-05" (cadena o Date)
  - Puede ser un tiempo relativo en ms `1 * 60 * 60 * 1000` (1 hora)
  - Esta opción verifica la hora de actualización del archivo usando el método `fs.stat`. Por lo tanto, podría verse afectada por Git u otras herramientas que modifiquen el archivo.

  > Ejemplo: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Omitir el archivo si ha sido modificado dentro del tiempo dado.

  - Puede ser una hora absoluta como "2025-12-05" (cadena o Date)
  - Puede ser una hora relativa en ms `1 * 60 * 60 * 1000` (1 hora)
  - Esta opción verifica la hora de actualización del archivo usando el método `fs.stat`. Por lo tanto, podría verse afectada por Git u otras herramientas que modifiquen el archivo.

  > Ejemplo: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

**Opciones de salida de entrada:**

- **`--locales [locales...]`**: Locales de destino para traducir la documentación.

  > Ejemplo: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: Locale de origen desde el cual traducir.

  > Ejemplo: `npx intlayer doc translate --base-locale en`

**Opciones de procesamiento de archivos:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Número de archivos a procesar simultáneamente para la traducción.

  > Ejemplo: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**Opciones de IA:**

- **`--model [model]`**: El modelo de IA a utilizar para la traducción (por ejemplo, `gpt-3.5-turbo`).
- **`--provider [provider]`**: El proveedor de IA a utilizar para la traducción.
- **`--temperature [temperature]`**: Configuración de temperatura para el modelo de IA.
- **`--api-key [apiKey]`**: Proporciona tu propia clave API para el servicio de IA.
- **`--application-context [applicationContext]`**: Proporciona contexto adicional para la traducción de IA.
- **`--custom-prompt [prompt]`**: Personaliza el prompt base utilizado para la traducción. (Nota: Para la mayoría de los casos de uso, se recomienda en su lugar la opción `--custom-instructions`, ya que proporciona un mejor control sobre el comportamiento de la traducción).

  > Ejemplo: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Mi aplicación es una tienda de gatos"`

**Opciones de variables de entorno:**

- **`--env`**: Especifica el entorno (por ejemplo, `development`, `production`).
- **`--env-file [envFile]`**: Proporciona un archivo de entorno personalizado desde el cual cargar variables.
- **`--base-dir`**: Especifica el directorio base para el proyecto.

  > Ejemplo: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Opciones de registro:**

- **`--verbose`**: Habilitar el registro detallado para depuración.

  > Ejemplo: `npx intlayer doc translate --verbose`

**Opciones de instrucciones personalizadas:**

- **`--custom-instructions [customInstructions]`**: Instrucciones personalizadas añadidas al prompt. Útil para aplicar reglas específicas respecto al formato, traducción de URLs, etc.

  - Puede ser un tiempo absoluto como "2025-12-05" (cadena o Date)
  - Puede ser un tiempo relativo en ms `1 * 60 * 60 * 1000` (1 hora)
  - Esta opción verifica la hora de actualización del archivo usando el método `fs.stat`. Por lo tanto, podría verse afectada por Git u otras herramientas que modifiquen el archivo.

  > Ejemplo: `npx intlayer doc translate --custom-instructions "Evitar traducir URLs y mantener el formato markdown"`

  > Ejemplo: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Opciones de Git:**

- **`--git-diff`**: Ejecutar solo en diccionarios que incluyan cambios desde la base (por defecto `origin/main`) hasta la rama actual (por defecto: `HEAD`).
- **`--git-diff-base`**: Especificar la referencia base para el git diff (por defecto `origin/main`).
- **`--git-diff-current`**: Especificar la referencia actual para el git diff (por defecto: `HEAD`).
- **`--uncommitted`**: Incluir cambios no confirmados.
- **`--unpushed`**: Incluir cambios no enviados.
- **`--untracked`**: Incluir archivos no rastreados.

  > Ejemplo: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Ejemplo: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> Ten en cuenta que la ruta del archivo de salida se determinará reemplazando los siguientes patrones
>
> - `/{{baseLocale}}/` por `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` por `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` por `_{{locale}}.`
> - `{{baseLocale}}_` por `{{locale}}_`
> - `.{{baseLocaleName}}.` por `.{{localeName}}.`
>
> Si no se encuentra el patrón, el archivo de salida añadirá `.{{locale}}` en la extensión del archivo. Por ejemplo, `./my/file.md` se traducirá a `./my/file.fr.md` para el idioma francés.

#### Revisar Documentación

El comando `doc review` analiza los archivos de documentación para verificar la calidad, consistencia y completitud entre diferentes locales.

```bash
npx intlayer doc review
```

Puede usarse para revisar archivos que ya están traducidos y para comprobar si la traducción es correcta.

Para la mayoría de los casos de uso,

- prefiera usar `doc translate` cuando la versión traducida de este archivo no esté disponible.
- prefiera usar `doc review` cuando la versión traducida de este archivo ya exista.

> Tenga en cuenta que el proceso de revisión consume más tokens de entrada que el proceso de traducción para revisar el mismo archivo en su totalidad. Sin embargo, el proceso de revisión optimizará los fragmentos a revisar y omitirá las partes que no hayan cambiado.

##### Argumentos:

El comando `doc review` acepta los mismos argumentos que `doc translate`, permitiéndole revisar archivos de documentación específicos y aplicar controles de calidad.

Si activaste una de las opciones de git, el comando solo revisará la parte de los archivos que están siendo modificados. El script procesará dividiendo el archivo en fragmentos y revisará cada fragmento. Si no hay cambios en el fragmento, el script lo omitirá para acelerar el proceso de revisión y limitar el costo de la API del proveedor de IA.

## Usa los comandos de intlayer en tu `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

## SDK de CLI

El SDK de CLI es una biblioteca que te permite usar el CLI de Intlayer en tu propio código.

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
```

Ejemplo de uso:

```ts
import {
  push,
  pull,
  fill,
  build,
  docTranslate,
  docReview,
} from "@intlayer/cli";

push();
// ...
pull();
// ...
fill();
// ...
build();
// ...
docTranslate();
// ...
docReview();
// ...
```

## Depurar comando intlayer

### 1. **Asegúrate de estar usando la última versión**

Ejecuta:

```bash
npx intlayer --version                  # versión actual de intlayer en el locale
npx intlayer@latest --version           # versión más reciente de intlayer
```

### 2. **Verifica si el comando está registrado**

Puedes verificar con:

```bash
npx intlayer --help                     # Muestra la lista de comandos disponibles e información de uso
npx intlayer dictionary build --help    # Muestra la lista de opciones disponibles para un comando
```

### 3. **Reinicia tu terminal**

A veces es necesario reiniciar el terminal para que reconozca nuevos comandos.

### 4. **Limpia la caché de npx (si estás atascado con una versión antigua)**

```bash
npx clear-npx-cache
```
