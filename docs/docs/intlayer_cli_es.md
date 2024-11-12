# Intlayer CLI

## Instalación del Paquete

Instala los paquetes necesarios usando npm:

```bash
npm install intlayer-cli
```

```bash
yarn add intlayer-cli
```

```bash
pnpm add intlayer-cli
```

> Nota: si el paquete `intlayer` ya está instalado, el CLI se instala automáticamente. Puedes omitir este paso.

## Paquete intlayer-cli

El paquete `intlayer-cli` tiene como objetivo transpilar tus declaraciones de [intlayer](https://github.com/intlayer-org/intlayer/blob/main/packages/intlayer/readme.md) en diccionarios.

Este paquete transpilará todos los archivos de intlayer, tales como `src/**/*.content.{ts|js|mjs|cjs|json}`. [Consulta cómo declarar tus archivos de declaración Intlayer](https://github.com/intlayer-org/intlayer/blob/main/packages/intlayer/readme.md).

Para interpretar los diccionarios de intlayer, puedes utilizar intérpretes como [react-intlayer](https://github.com/intlayer-org/intlayer/blob/main/packages/react-intlayer/readme.md) o [next-intlayer](https://github.com/intlayer-org/intlayer/blob/main/packages/next-intlayer/readme.md).

## Soporte de Archivos de Configuración

Intlayer acepta múltiples formatos de archivos de configuración:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Para ver cómo configurar los idiomas disponibles u otros parámetros, consulta la [documentación de configuración aquí](https://github.com/intlayer-org/intlayer/blob/main/docs/docs/configuration_es.md).

## Ejecutar Comandos de Intlayer

### Crear diccionarios

Para crear tus diccionarios, puedes ejecutar los siguientes comandos:

```bash
npx intlayer build
```

o en modo observación

```bash
npx intlayer build --watch
```

Este comando buscará tus archivos de contenido de declaración en la ruta predeterminada `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` y generará los diccionarios en el directorio `.intlayer`.

### Subir diccionarios

```bash
npx intlayer push
```

Si tienes instalado el [editor intlayer](https://github.com/intlayer-org/intlayer/blob/main/docs/intlayer_editor_es.md), también puedes subir diccionarios al editor. Este comando permitirá que los diccionarios estén disponibles en el editor en [https://intlayer.org/dashboard/content](https://intlayer.org/dashboard/content). De esta forma, puedes compartir tus diccionarios con tu equipo y editar tu contenido sin modificar el código de tu aplicación.

##### Argumentos:

- `-d`, `--dictionaries`: IDs de los diccionarios a subir. Si no se especifica, se subirán todos los diccionarios.
  > Ejemplo: `npx intlayer push -d mi-diccionario-id mi-otro-diccionario-id`
- `-r`, `--deleteLocaleDictionary`: Omite la pregunta de eliminar los directorios de idiomas locales una vez que se suben los diccionarios y los elimina. Por defecto, si el diccionario está definido localmente, sobrescribirá el contenido de los diccionarios remotos.
  > Ejemplo: `npx intlayer push -r`
- `-k`, `--keepLocaleDictionary`: Omite la pregunta de eliminar los directorios de idiomas locales una vez que se suben los diccionarios y los conserva. Por defecto, si el diccionario está definido localmente, sobrescribirá el contenido de los diccionarios remotos.
  > Ejemplo: `npx intlayer push -k`

### Descargar diccionarios remotos

```bash
npx intlayer pull
```

Si tienes instalado el [editor intlayer](https://github.com/intlayer-org/intlayer/blob/main/docs/intlayer_editor_es.md), también puedes descargar diccionarios del editor. De esta forma, puedes sobrescribir el contenido de tus diccionarios para las necesidades de tu aplicación.

##### Argumentos:

- `-d, --dictionaries`: IDs de los diccionarios a descargar. Si no se especifica, se descargarán todos los diccionarios.
  > Ejemplo: `npx intlayer pull -d mi-diccionario-id mi-otro-diccionario-id`
- `--newDictionariesPath`: Ruta al directorio donde se guardarán los nuevos diccionarios. Si no se especifica, los nuevos diccionarios se guardarán en el directorio `./intlayer-dictionaries` del proyecto. Si se especifica un campo `filePath` en el contenido de tu diccionario, los diccionarios no considerarán este argumento y se guardarán en el directorio especificado en `filePath`.
  > Ejemplo: `npx intlayer pull --newDictionariesPath ./my-dictionaries`

## Usar comandos de intlayer en tu `package.json`:

```json
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull"
}
```
