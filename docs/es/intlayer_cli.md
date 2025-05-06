# Intlayer CLI

## Instalar el paquete

Instala los paquetes necesarios usando npm:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

> Si el paquete `intlayer` ya está instalado, el CLI se instala automáticamente. Puedes omitir este paso.

## Paquete intlayer-cli

El paquete `intlayer-cli` tiene como objetivo transpilar tus [declaraciones de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md) en diccionarios.

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

Para ver cómo configurar los locales disponibles u otros parámetros, consulta la [documentación de configuración aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

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

Si el [editor de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md) está instalado, también puedes enviar diccionarios al editor. Este comando permitirá que los diccionarios estén disponibles en [el editor](https://intlayer.org/dashboard). De esta manera, puedes compartir tus diccionarios con tu equipo y editar tu contenido sin modificar el código de tu aplicación.

##### Argumentos:

- `-d`, `--dictionaries`: ids de los diccionarios a enviar. Si no se especifica, se enviarán todos los diccionarios.
  > Ejemplo: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Omite la pregunta que solicita eliminar los directorios de locales una vez que los diccionarios se han enviado, y los elimina. Por defecto, si el diccionario está definido localmente, sobrescribirá el contenido de los diccionarios distantes.
  > Ejemplo: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Omite la pregunta que solicita eliminar los directorios de locales una vez que los diccionarios se han enviado, y los conserva. Por defecto, si el diccionario está definido localmente, sobrescribirá el contenido de los diccionarios distantes.
  > Ejemplo: `npx intlayer dictionary push -k`

### Descargar diccionarios distantes

```bash
npx intlayer dictionary pull
```

Si el [editor de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md) está instalado, también puedes descargar diccionarios desde el editor. De esta manera, puedes sobrescribir el contenido de tus diccionarios según las necesidades de tu aplicación.

##### Argumentos:

- `-d, --dictionaries`: Ids de los diccionarios a descargar. Si no se especifica, se descargarán todos los diccionarios.
  > Ejemplo: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Ruta al directorio donde se guardarán los nuevos diccionarios. Si no se especifica, los nuevos diccionarios se guardarán en el directorio `./intlayer-dictionaries` del proyecto. Si un campo `filePath` está especificado en el contenido de tu diccionario, los diccionarios no considerarán este argumento y se guardarán en el directorio especificado en `filePath`.

##### Ejemplo:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Auditar diccionarios

```bash
npx intlayer audit
```

Este comando analiza tus archivos de declaración de contenido en busca de posibles problemas como traducciones faltantes, inconsistencias estructurales o desajustes de tipo. Si encuentra algún problema, **intlayer audit** propondrá o aplicará actualizaciones para mantener tus diccionarios consistentes y completos.

##### Argumentos:

- **`-f, --files [files...]`**  
  Una lista de archivos específicos de declaración de contenido para auditar. Si no se proporciona, se auditarán todos los archivos `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` descubiertos.

- **`--exclude [excludedGlobs...]`**  
  Patrones de globs para excluir de la auditoría (por ejemplo, `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  El modelo de ChatGPT a usar para la auditoría (por ejemplo, `gpt-3.5-turbo`).

- **`-p, --custom-prompt [prompt]`**  
  Proporciona un prompt personalizado para tus instrucciones de auditoría.

- **`-l, --async-limit [asyncLimit]`**  
  Número máximo de archivos a procesar de manera concurrente.

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  Proporciona tu propia clave API de OpenAI para evitar la autenticación OAuth2.

##### Ejemplo:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

Este comando ignorará cualquier archivo bajo `tests/**` y usará el modelo `gpt-3.5-turbo` para auditar los archivos de declaración de contenido descubiertos. Si se encuentran problemas, como traducciones faltantes, se corregirán in situ, preservando la estructura original del archivo.

### Gestionar configuración

#### Obtener configuración

El comando `get configuration` recupera la configuración actual de Intlayer, particularmente los ajustes de locales. Esto es útil para verificar tu configuración.

```bash
npx intlayer config get
```

##### Argumentos:

- **`--env`**: Especifica el entorno (por ejemplo, `development`, `production`).
- **`--env-file`**: Proporciona un archivo de entorno personalizado para cargar variables.
- **`--verbose`**: Habilita el registro detallado para depuración.

#### Enviar configuración

El comando `push configuration` sube tu configuración al CMS y editor de Intlayer. Este paso es necesario para habilitar el uso de diccionarios distantes en el Editor Visual de Intlayer.

```bash
npx intlayer config push
```

##### Argumentos:

- **`--env`**: Especifica el entorno (por ejemplo, `development`, `production`).
- **`--env-file`**: Proporciona un archivo de entorno personalizado para cargar variables.
- **`--verbose`**: Habilita el registro detallado para depuración.

Al enviar la configuración, tu proyecto se integra completamente con el CMS de Intlayer, permitiendo una gestión fluida de diccionarios entre equipos.

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
