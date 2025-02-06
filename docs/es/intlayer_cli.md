# Intlayer CLI

## Instalar Paquete

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

> Si el paquete `intlayer` ya está instalado, el cli se instalará automáticamente. Puedes omitir este paso.

## Paquete intlayer-cli

El paquete `intlayer-cli` tiene como objetivo transpilar tus [declaraciones de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md) en diccionarios.

Este paquete transpilará todos los archivos de intlayer, como `src/**/*.content.{ts|js|mjs|cjs|json}`. [Consulta cómo declarar tus archivos de declaración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Para interpretar diccionarios de intlayer puedes utilizar intérpretes, como [react-intlayer](https://www.npmjs.com/package/react-intlayer) o [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## Soporte para Archivos de Configuración

Intlayer acepta múltiples formatos de archivos de configuración:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Para ver cómo configurar los locales disponibles, o otros parámetros, consulta la [documentación de configuración aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

## Ejecutar comandos de intlayer

### Construir diccionarios

Para construir tus diccionarios, puedes ejecutar los comandos:

```bash
npx intlayer build
```

o en modo de vigilancia

```bash
npx intlayer build --watch
```

Este comando buscará tus archivos de contenido de declaración por defecto como `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. Y construirá los diccionarios en el directorio `.intlayer`.

### Empujar diccionarios

```bash
npx intlayer dictionary push
```

Si el [editor de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_editor.md) está instalado, también puedes empujar diccionarios al editor. Este comando hará que los diccionarios estén disponibles para [el editor](https://intlayer.org/dashboard). De esta manera, puedes compartir tus diccionarios con tu equipo y editar tu contenido sin editar el código de tu aplicación.

##### Argumentos:

- `-d`, `--dictionaries`: ids de los diccionarios a extraer. Si no se especifica, se empujarán todos los diccionarios.
  > Ejemplo: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Salta la pregunta que pregunta si deseas eliminar los directorios locales una vez que se han empujado los diccionarios, y los elimina. Por defecto, si el diccionario está definido localmente, sobreescribirá el contenido de los diccionarios lejanos.
  > Ejemplo: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Salta la pregunta que pregunta si deseas eliminar los directorios locales una vez que se han empujado los diccionarios, y los mantiene. Por defecto, si el diccionario está definido localmente, sobreescribirá el contenido de los diccionarios lejanos.
  > Ejemplo: `npx intlayer dictionary push -k`

### Extraer diccionarios lejanos

```bash
npx intlayer dictionary pull
```

Si el [editor de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_editor.md) está instalado, también puedes extraer diccionarios del editor. De esta manera, puedes sobrescribir el contenido de tus diccionarios para las necesidades de tu aplicación.

##### Argumentos:

- `-d, --dictionaries`: Ids de los diccionarios a extraer. Si no se especifica, se extraerán todos los diccionarios.
  > Ejemplo: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: Ruta al directorio donde se guardarán los nuevos diccionarios. Si no se especifica, los nuevos diccionarios se guardarán en el directorio `./intlayer-dictionaries` del proyecto. Si un campo `filePath` está especificado en el contenido de tu diccionario, los diccionarios no considerarán este argumento y se guardarán en el directorio `filePath` especificado.

##### Ejemplo:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Auditar diccionarios

```bash
npx intlayer audit
```

Este comando analiza tus archivos de declaración de contenido en busca de problemas potenciales, como traducciones faltantes, inconsistencias estructurales o desajustes de tipos. Si encuentra algún problema, **intlayer audit** propondrá o aplicará actualizaciones para mantener tus diccionarios consistentes y completos.

##### Argumentos:

- **`-f, --files [files...]`**  
  Una lista de archivos de declaración de contenido específicos para auditar. Si no se proporciona, se auditarán todos los archivos descubridos `*.content.{ts,js,mjs,cjs,tsx,jsx,json}`.

- **`--exclude [excludedGlobs...]`**  
  Patrón de globs a excluir de la auditoría (p. ej., `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  El modelo de ChatGPT a utilizar para la auditoría (p. ej., `gpt-3.5-turbo`).

- **`-p, --custom-prompt [prompt]`**  
  Proporciona un aviso personalizado para tus instrucciones de auditoría.

- **`-l, --async-limit [asyncLimit]`**  
  Número máximo de archivos a procesar simultáneamente.

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  Proporciona tu propia clave de API de OpenAI para evitar la autenticación OAuth2.

##### Ejemplo:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

Este comando ignorará cualquier archivo bajo `tests/**` y usará el modelo `gpt-3.5-turbo` para auditar los archivos de declaración de contenido descubiertos. Si se encuentran problemas, como traducciones faltantes, se corregirán in situ, preservando la estructura del archivo original.

## Usa los comandos de intlayer en tu `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```
