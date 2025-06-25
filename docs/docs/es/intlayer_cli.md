---
docName: intlayer_cli
url: https://intlayer.org/doc/concept/cli
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: CLI
description: Descubra cómo usar la CLI Intlayer para gestionar su sitio web multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.
keywords:
  - CLI
  - Interfaz de Línea de Comandos
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Intlayer CLI

## Instalar el paquete

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

Para interpretar los diccionarios de intlayer puedes usar intérpretes, como [react-intlayer](https://www.npmjs.com/package/react-intlayer), o [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Soporte de archivo de configuración

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
npx intlayer dictionaries build
```

o en modo observación

```bash
npx intlayer dictionaries build --watch
```

Este comando encontrará tus archivos de contenido de declaración por defecto como `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. Y construirá los diccionarios en el directorio `.intlayer`.

### Enviar diccionarios

```bash
npx intlayer dictionary push
```

Si el [editor de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) está instalado, también puedes enviar diccionarios al editor. Este comando permitirá que los diccionarios estén disponibles en [el editor](https://intlayer.org/dashboard). De esta manera, puedes compartir tus diccionarios con tu equipo y editar tu contenido sin modificar el código de tu aplicación.

##### Argumentos:

- `-d`, `--dictionaries`: ids de los diccionarios a enviar. Si no se especifica, se enviarán todos los diccionarios.
  > Ejemplo: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Omitir la pregunta que solicita eliminar los directorios de locales una vez que los diccionarios se hayan enviado, y eliminarlos. Por defecto, si el diccionario está definido localmente, sobrescribirá el contenido de los diccionarios remotos.
  > Ejemplo: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Omitir la pregunta que solicita eliminar los directorios de locales una vez que los diccionarios se hayan enviado, y mantenerlos. Por defecto, si el diccionario está definido localmente, sobrescribirá el contenido de los diccionarios remotos.
  > Ejemplo: `npx intlayer dictionary push -k`
- `--env`: Especificar el entorno (por ejemplo, `development`, `production`).
- `--env-file`: Proporcionar un archivo de entorno personalizado para cargar las variables.
- `--base-dir`: Especificar el directorio base del proyecto.
- `--verbose`: Habilitar el registro detallado para depuración.
- `--git-diff`: Ejecutar solo en diccionarios con cambios no enviados.
- `--git-diff-base`: Especificar la referencia base para git diff.
- `--git-diff-current`: Especificar la referencia actual para git diff.
- `--uncommitted`: Incluir cambios no confirmados.
- `--unpushed`: Incluir cambios no enviados.
- `--untracked`: Incluir archivos no rastreados.

### Obtener diccionarios remotos

```bash
npx intlayer dictionary pull
```

Si el [editor intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) está instalado, también puedes obtener diccionarios desde el editor. De esta manera, puedes sobrescribir el contenido de tus diccionarios para las necesidades de tu aplicación.

##### Argumentos:

- `-d, --dictionaries`: Ids de los diccionarios a obtener. Si no se especifica, se obtendrán todos los diccionarios.
  > Ejemplo: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: Ruta al directorio donde se guardarán los nuevos diccionarios. Si no se especifica, los nuevos diccionarios se guardarán en el directorio `./intlayer-dictionaries` del proyecto. Si se especifica un campo `filePath` en el contenido de tu diccionario, los diccionarios no considerarán este argumento y se guardarán en el directorio especificado por `filePath`.
- `--env`: Especificar el entorno (por ejemplo, `development`, `production`).
- `--env-file`: Proporcionar un archivo de entorno personalizado para cargar las variables.
- `--base-dir`: Especificar el directorio base del proyecto.
- `--verbose`: Habilitar el registro detallado para depuración.

##### Ejemplo:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Auditar diccionarios

```bash
npx intlayer audit
```

Esta comando analiza tus archivos de declaración de contenido en busca de problemas potenciales como traducciones faltantes, inconsistencias estructurales o incompatibilidades de tipo. Si encuentra algún problema, **intlayer audit** propondrá o aplicará actualizaciones para mantener tus diccionarios consistentes y completos.

##### Argumentos:

- **`-f, --files [files...]`**  
  Una lista de archivos de declaración de contenido específicos para auditar. Si no se proporciona, se auditarán todos los archivos `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` descubiertos.

- **`--exclude [excludedGlobs...]`**  
  Patrones glob para excluir de la auditoría (por ejemplo, `--exclude "src/test/**"`).

- **`--source-locale [sourceLocale]`**  
  La localización fuente desde la cual traducir. Si no se especifica, se utilizará la localización predeterminada de tu configuración.

- **`--output-locales [outputLocales...]`**  
  Localizaciones objetivo hacia las cuales traducir. Si no se especifican, se utilizarán todas las localizaciones de tu configuración excepto la localización fuente.

- **`--mode [mode]`**  
  Modo de traducción: 'complete', 'review', o 'missing-only'. Por defecto, 'missing-only'.

- **`--git-diff`**  
  Ejecutar solo en diccionarios con cambios no enviados en el repositorio git.

- **`--git-diff-base`**  
  Especificar la referencia base para git diff.

- **`--git-diff-current`**  
  Especificar la referencia actual para git diff.

- **`--uncommitted`**  
  Incluir cambios no confirmados.

- **`--unpushed`**  
  Incluir cambios no enviados.

- **`--untracked`**  
  Incluir archivos no rastreados.

- **`--keys [keys...]`**  
  Filtrar diccionarios basados en claves específicas.

- **`--excluded-keys [excludedKeys...]`**  
  Excluir diccionarios basados en claves específicas.

- **`--path-filter [pathFilters...]`**  
  Filtrar diccionarios basados en patrón glob para rutas de archivos.

- **`--model [model]`**  
  El modelo de IA a utilizar para la traducción (por ejemplo, `gpt-3.5-turbo`).

- **`--provider [provider]`**  
  El proveedor de IA a utilizar para la traducción.

- **`--temperature [temperature]`**  
  Configuración de temperatura para el modelo de IA.

- **`--api-key [apiKey]`**  
  Proporcionar tu propia clave API para el servicio de IA.

- **`--custom-prompt [prompt]`**  
  Proporcionar un prompt personalizado para tus instrucciones de traducción.

- **`--application-context [applicationContext]`**  
  Proporcionar contexto adicional para la traducción IA.

- **`--env`**  
  Especificar el entorno (por ejemplo, `development`, `production`).

- **`--env-file [envFile]`**  
  Proporcionar un archivo de entorno personalizado para cargar las variables.

- **`--base-dir`**  
  Especificar el directorio base del proyecto.

- **`--verbose`**  
  Habilitar el registro detallado para depuración.

##### Ejemplo:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Esta comando traducirá el contenido del inglés al francés y español para todos los archivos de declaración de contenido en el directorio `src/home/` utilizando el modelo GPT-3.5 Turbo.

### Gestionar la configuración

#### Obtener configuración

La comando `get configuration` recupera la configuración actual para Intlayer, particularmente la configuración de localización. Esto es útil para verificar tu configuración.

```bash
npx intlayer config get
```

##### Argumentos:

- **`--env`**: Especificar el entorno (por ejemplo, `development`, `production`).
- **`--env-file`**: Proporcionar un archivo de entorno personalizado para cargar las variables.
- **`--base-dir`**: Especificar el directorio base del proyecto.
- **`--verbose`**: Habilitar el registro detallado para depuración.

#### Enviar configuración

La comando `push configuration` sube tu configuración al CMS y editor de Intlayer. Este paso es necesario para habilitar el uso de diccionarios remotos en el editor visual de Intlayer.

```bash
npx intlayer config push
```

##### Argumentos:

- **`--env`**: Especificar el entorno (por ejemplo, `development`, `production`).
- **`--env-file`**: Proporcionar un archivo de entorno personalizado para cargar las variables.
- **`--base-dir`**: Especificar el directorio base del proyecto.
- **`--verbose`**: Habilitar el registro detallado para depuración.

Al enviar la configuración, tu proyecto está completamente integrado con el CMS de Intlayer, permitiendo una gestión fluida de diccionarios entre equipos.

## Usar comandos de intlayer en tu `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer dictionaries build",
  "intlayer:watch": "npx intlayer dictionaries build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```

## Depurar el comando intlayer

### 1. **Asegúrese de usar la última versión**

Ejecute:

```bash
npx intlayer --version                  # versión local actual de intlayer
npx intlayer@latest --version          # última versión de intlayer
```

### 2. **Verifique si el comando está registrado**

Puede verificar con:

```bash
npx intlayer --help      # Muestra una lista de comandos disponibles e información de uso
```

### 3. **Reinicie su terminal**

A veces es necesario reiniciar el terminal para reconocer nuevos comandos.

### 4. **Limpie la caché de npx (si está atascado con una versión anterior)**

```bash
npx clear-npx-cache
```
