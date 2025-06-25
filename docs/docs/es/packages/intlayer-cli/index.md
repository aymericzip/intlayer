# intlayer-cli: Paquete NPM para usar el CLI de Intlayer

**Intlayer** es un conjunto de paquetes diseñados específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

El paquete **`intlayer-cli`** es un paquete NPM que consume el paquete `@intlayer/cli` y lo hace disponible para las interfaces de línea de comandos de `intlayer`.

> Tenga en cuenta que este paquete no es necesario si el paquete [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/es/packages/intlayer/index.md) está instalado. En comparación con el paquete `intlayer`, el paquete `intlayer-cli` es un paquete más ligero que solo contiene la herramienta CLI, sin dependencias de `@intlayer/core`.

## Instalación

Instale el paquete necesario utilizando su gestor de paquetes preferido:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## Uso

Aquí un ejemplo de cómo usar el paquete `intlayer-cli`:

```bash
npx intlayer dictionaries build
```

## Comandos CLI

Intlayer proporciona una herramienta CLI para:

- auditar sus declaraciones de contenido y completar traducciones faltantes
- construir diccionarios a partir de sus declaraciones de contenido
- enviar y recibir diccionarios remotos desde su CMS a su proyecto local

Consulte [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md) para más información.
