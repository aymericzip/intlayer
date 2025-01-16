# intlayer-cli: Paquete NPM para usar el Intlayer CLI

**Intlayer** es un conjunto de paquetes diseñado específicamente para desarrolladores de JavaScript. Es compatible con marcos como React, React y Express.js.

El **`intlayer-cli`** paquete es un paquete NPM que consume el paquete `@intlayer/cli` y lo hace disponible para las interfaces de línea de comandos de `intlayer`.

> Ten en cuenta que este paquete no es necesario si el paquete [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/es/packages/intlayer/index.md) está instalado. En comparación con el paquete `intlayer`, el paquete `intlayer-cli` es un paquete más ligero que solo contiene la herramienta CLI, sin dependencias de `@intlayer/core`.

## Instalación

Instala el paquete necesario usando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

## Uso

Aquí hay un ejemplo de cómo usar el paquete `intlayer-cli`:

```bash
npx intlayer build
```

## Comandos de CLI

Intlayer proporciona una herramienta CLI para:

- auditar tus declaraciones de contenido y completar traducciones faltantes
- construir diccionarios a partir de tus declaraciones de contenido
- empujar y tirar diccionarios distantes de tu CMS a tu proyecto local

Consulta [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md) para más información.
