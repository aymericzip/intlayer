# Paquete intlayer-cli

## Instalar el Paquete

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

## Paquete intlayer-cli

El paquete `intlayer-cli` tiene como objetivo transpilar tus declaraciones de [intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/readme_es.md) en diccionarios.

Este paquete transpilará todos los archivos intlayer, tales como `src/**/*.content.{ts|js|mjs|cjs|json}`. [Ve cómo declarar tus archivos de declaración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/readme_es.md).

Para interpretar diccionarios intlayer puedes usar intérpretes, como [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/react-intlayer/readme_es.md), o [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/next-intlayer/readme_es.md).

## Soporte de Archivos de Configuración

Intlayer acepta múltiples formatos de archivos de configuración:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Para ver cómo configurar los locales disponibles u otros parámetros, consulta la [documentación de configuración aquí](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_es.md).

## Ejecutar comandos de intlayer

Para construir tus diccionarios, puedes ejecutar los comandos:

```bash
npx intlayer build
```

o en modo de observación

```bash
npx intlayer build --watch
```

## Usa comandos de intlayer en tu `package.json`:

```json
"scripts": {
  "transpile": "npx intlayer build",
  "transpile:watch": "npx intlayer build --watch"
}
```
