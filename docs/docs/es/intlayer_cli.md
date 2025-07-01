---
createdAt: 2024-08-11
updatedAt: 2025-06-29
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
---

# CLI de Intlayer

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

Este paquete transpilará todos los archivos de intlayer, como `src/**/*.content.{ts|js|mjs|cjs|json}`. [Consulta cómo declarar tus archivos de declaración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Para interpretar los diccionarios de intlayer puedes usar intérpretes, como [react-intlayer](https://www.npmjs.com/package/react-intlayer) o [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Soporte para Archivo de Configuración

Intlayer acepta múltiples formatos de archivo de configuración:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Para ver cómo configurar los locales disponibles u otros parámetros, consulta la [documentación de configuración aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

## SDK de CLI

El SDK de CLI es una biblioteca que te permite usar la CLI de Intlayer en tu propio código.

```bash packageManager="npm"
npm install @intlayer/cli -D
```

```bash packageManager="yarn"
yarn add @intlayer/cli -D
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli -D
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

### Empujar diccionarios

```bash
npx intlayer dictionary push
```

Si tienes instalado el [editor de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md), también puedes subir los diccionarios al editor. Este comando permitirá poner los diccionarios a disposición de [el editor](https://intlayer.org/dashboard). De esta manera, puedes compartir tus diccionarios con tu equipo y editar tu contenido sin modificar el código de tu aplicación.

##### Alias:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### Argumentos:

- `-d`, `--dictionaries`: IDs de los diccionarios que se desean subir. Si no se especifica, se subirán todos los diccionarios.
  > Ejemplo: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Omitir la pregunta que solicita eliminar los directorios de locales una vez que los diccionarios son enviados, y eliminarlos. Por defecto, si el diccionario está definido localmente, sobrescribirá el contenido de los diccionarios remotos.
  > Ejemplo: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Omitir la pregunta que solicita eliminar los directorios de locales una vez que los diccionarios son enviados, y conservarlos. Por defecto, si el diccionario está definido localmente, sobrescribirá el contenido de los diccionarios remotos.
  > Ejemplo: `npx intlayer dictionary push -k`
- `--env`: Especificar el entorno (por ejemplo, `development`, `production`).
- `--env-file`: Proporcionar un archivo de entorno personalizado para cargar variables.
- `--base-dir`: Especificar el directorio base para el proyecto.
- `--verbose`: Habilita el registro detallado para depuración.
- `--git-diff`: Ejecuta solo en diccionarios que incluyen cambios desde la base (por defecto `origin/main`) hasta la rama actual (por defecto: `HEAD`).
- `--git-diff-base`: Especifica la referencia base para git diff (por defecto `origin/main`).
- `--git-diff-current`: Especifica la referencia actual para git diff (por defecto: `HEAD`).
- `--uncommitted`: Incluye cambios no confirmados.
- `--unpushed`: Incluye cambios no enviados.
- `--untracked`: Incluye archivos no rastreados.

### Extraer diccionarios remotos

```bash
npx intlayer pull
```

Si el [editor intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) está instalado, también puedes extraer diccionarios desde el editor. De esta manera, puedes sobrescribir el contenido de tus diccionarios según las necesidades de tu aplicación.

##### Alias:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### Argumentos:

- `-d, --dictionaries`: IDs de los diccionarios a extraer. Si no se especifica, se extraerán todos los diccionarios.
  > Ejemplo: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: Ruta al directorio donde se guardarán los nuevos diccionarios. Si no se especifica, los nuevos diccionarios se guardarán en el directorio `./intlayer-dictionaries` del proyecto. Si en el contenido de tu diccionario se especifica un campo `filePath`, los diccionarios no considerarán este argumento y se guardarán en el directorio `filePath` especificado.
- `--env`: Especifica el entorno (por ejemplo, `development`, `production`).
- `--env-file`: Proporciona un archivo de entorno personalizado para cargar variables.
- `--base-dir`: Especifica el directorio base para el proyecto.
- `--verbose`: Habilita el registro detallado para depuración.

##### Ejemplo:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Rellenar / auditar / traducir diccionarios

```bash
npx intlayer fill
```

Este comando analiza tus archivos de declaración de contenido en busca de posibles problemas, como traducciones faltantes, inconsistencias estructurales o incompatibilidades de tipo. Si encuentra algún problema, **intlayer fill** propondrá o aplicará actualizaciones para mantener tus diccionarios consistentes y completos.

##### Alias:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### Argumentos:

- `-f, --file [files...]`
  Una lista de archivos específicos de declaración de contenido para auditar. Si no se proporciona, se auditarán todos los archivos `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` descubiertos.

- `--exclude [excludedGlobs...]`
  Patrón de globs para excluir de la auditoría (por ejemplo, `--exclude "src/test/**"`).

- `--source-locale [sourceLocale]`
  El locale de origen desde el cual traducir. Si no se especifica, se usará el locale predeterminado de tu configuración.

- `--output-locales [outputLocales...]`
  Locales de destino a los cuales traducir. Si no se especifica, se usarán todos los locales de tu configuración excepto el locale de origen.

- `--mode [mode]`
  Modo de traducción: 'complete', 'review' o 'missing-only'. El valor predeterminado es 'missing-only'.

- `--git-diff`
  Filtra los diccionarios que incluyen cambios desde la base (por defecto `origin/main`) hasta la rama actual (por defecto: `HEAD`).

- `--git-diff-base`
  Especifica la referencia base para git diff (por defecto `origin/main`).

- `--git-diff-current`
  Especifica la referencia actual para git diff (por defecto: `HEAD`).

- `--uncommitted`
  Filtra los diccionarios que incluyen cambios no confirmados.

- `--unpushed`
  Filtra diccionarios que incluyen cambios no enviados.

- `--untracked`
  Filtra diccionarios que incluyen archivos no rastreados.

- `--keys [keys...]`
  Filtra diccionarios basados en claves especificadas.

- `--excluded-keys [excludedKeys...]`
  Excluye diccionarios basados en claves especificadas.

- `--path-filter [pathFilters...]`
  Filtra diccionarios basados en un patrón glob para rutas de archivos.

- `--model [model]`
  El modelo de IA a usar para la traducción (por ejemplo, `gpt-3.5-turbo`).

- `--provider [provider]`
  El proveedor de IA a usar para la traducción.

- `--temperature [temperature]`
  Configuración de temperatura para el modelo de IA.

- `--api-key [apiKey]`
  Proporciona tu propia clave API para el servicio de IA.

- `--custom-prompt [prompt]`
  Proporciona un prompt personalizado para tus instrucciones de traducción.
- `--application-context [applicationContext]`
  Proporciona contexto adicional para la traducción por IA.

- `--env`
  Especifica el entorno (por ejemplo, `development`, `production`).

- `--env-file [envFile]`
  Proporciona un archivo de entorno personalizado para cargar variables.

- `--base-dir`
  Especifica el directorio base para el proyecto.

- `--verbose`
  Activa el registro detallado para depuración.

##### Ejemplo:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Este comando traducirá el contenido del inglés al francés y español para todos los archivos de declaración de contenido en el directorio `src/home/` usando el modelo GPT-3.5 Turbo.

### Gestionar Configuración

#### Obtener Configuración

El comando `configuration get` recupera la configuración actual para Intlayer, particularmente los ajustes de localización. Esto es útil para verificar tu configuración.

```bash
npx intlayer configuration get
```

##### Alias:

- `npx intlayer config get`
- `npx intlayer conf get`

##### Argumentos:

- **`--env`**: Especifica el entorno (por ejemplo, `development`, `production`).
- **`--env-file`**: Proporciona un archivo de entorno personalizado para cargar variables.
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
- **`--base-dir`**: Especifica el directorio base del proyecto.
- **`--verbose`**: Activa el registro detallado para depuración.

Al enviar la configuración, tu proyecto queda completamente integrado con el CMS de Intlayer, permitiendo una gestión fluida del diccionario entre equipos.

### Gestión de Documentación

Los comandos `doc` proporcionan herramientas para gestionar y traducir archivos de documentación en múltiples locales.

#### Traducir Documentación

El comando `doc translate` traduce automáticamente los archivos de documentación desde una localidad base a localidades objetivo utilizando servicios de traducción AI.

```bash
npx intlayer doc translate
```

##### Argumentos:

- **`--doc-pattern [docPattern...]`**: Patrones glob para coincidir con los archivos de documentación a traducir.
  > Ejemplo: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`
- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Patrones glob para excluir de la traducción.
  > Ejemplo: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`
- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Número de archivos a procesar simultáneamente para la traducción.
  > Ejemplo: `npx intlayer doc translate --nb-simultaneous-file-processed 5`
- **`--locales [locales...]`**: Locales de destino para traducir la documentación.
  > Ejemplo: `npx intlayer doc translate --locales fr es de`
- **`--base-locale [baseLocale]`**: Locale de origen desde el cual traducir.
  > Ejemplo: `npx intlayer doc translate --base-locale en`
- **`--model [model]`**: El modelo de IA a usar para la traducción (por ejemplo, `gpt-3.5-turbo`).
- **`--provider [provider]`**: El proveedor de IA a usar para la traducción.
- **`--temperature [temperature]`**: Configuración de temperatura para el modelo de IA.
- **`--api-key [apiKey]`**: Proporciona tu propia clave API para el servicio de IA.
- **`--custom-prompt [prompt]`**: Proporciona un prompt personalizado para las instrucciones de traducción.
- **`--application-context [applicationContext]`**: Proporciona contexto adicional para la traducción por IA.
- **`--env`**: Especifica el entorno (por ejemplo, `development`, `production`).
- **`--env-file [envFile]`**: Proporciona un archivo de entorno personalizado para cargar variables.
- **`--base-dir`**: Especifica el directorio base para el proyecto.
- **`--verbose`**: Habilita el registro detallado para depuración.
- **`--custom-instructions [customInstructions]`**: Instrucciones personalizadas añadidas al prompt. Útil para aplicar reglas específicas respecto al formato, traducción de URLs, etc.

##### Ejemplo:

```bash
npx intlayer doc translate
  --doc-pattern "docs/en/**/*.md"
  --base-locale en --locales fr es
  --model chatgpt-4o-latest
  --custom-instructions "$(cat ./instructions.md)"
```

> Nota que la ruta del archivo de salida se determinará reemplazando los siguientes patrones
>
> - `/{{baseLocale}}/` por `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` por `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` por `_{{locale}}.`
> - `{{baseLocale}}_` por `{{locale}}_`
> - `.{{baseLocaleName}}.` por `.{{localeName}}.`
>
> Si el patrón no se encuentra, el archivo de salida añadirá `.{{locale}}` en la extensión del archivo. Por ejemplo, `./my/file.md` se traducirá a `./my/file.fr.md` para la configuración regional francesa.

#### Revisar Documentación

El comando `doc review` analiza los archivos de documentación para verificar calidad, consistencia y completitud en diferentes configuraciones regionales.

```bash
npx intlayer doc review
```

##### Argumentos:

El comando `doc review` acepta los mismos argumentos que `doc translate`, permitiéndote revisar archivos de documentación específicos y aplicar controles de calidad.

##### Ejemplo:

```bash
npx intlayer doc review
 --doc-pattern "docs/es/**/*.md"
 --locales fr es de
 --model chatgpt-4o-latest
 --custom-instructions "$(cat ./instructions.md)"
```

## Usar comandos de intlayer en tu `package.json`

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

## Depurar comando intlayer

### 1. **Asegúrate de usar la última versión**

Ejecuta:

```bash
npx intlayer --version                  # versión actual de intlayer para la configuración regional
npx intlayer@latest --version           # última versión disponible de intlayer
```

### 2. **Verificar si el comando está registrado**

Puedes verificar con:

```bash
npx intlayer --help                     # Muestra la lista de comandos disponibles e información de uso
npx intlayer dictionary build --help    # Muestra la lista de opciones disponibles para un comando
```

### 3. **Reinicia tu terminal**

A veces es necesario reiniciar el terminal para que reconozca los nuevos comandos.

### 4. **Limpia la caché de npx (si estás atascado con una versión antigua)**

```bash
npx clear-npx-cache
```

## Historial de la documentación

- 5.5.10 - 2025-06-29: Historial inicial
