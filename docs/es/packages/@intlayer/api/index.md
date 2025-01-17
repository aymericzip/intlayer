# @intlayer/api: Paquete NPM para interactuar con la API de Intlayer

**Intlayer** es un conjunto de paquetes diseñado específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

El paquete **`@intlayer/api`** es un SDK (Kit de Desarrollo de Software) para interactuar con la API de Intlayer. Proporciona un conjunto de funciones para auditar la declaración de contenido, interactuar con organizaciones, proyectos y usuarios, etc.

## Uso

```ts
import { intlayerAPI } from "@intlayer/api";

// Obtener API del usuario
intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## Instalación

Instala el paquete necesario utilizando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```
