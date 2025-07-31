---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/api - SDK para la integración con la API de Intlayer
description: Paquete NPM que proporciona un Kit de Desarrollo de Software (SDK) para interactuar con la API de Intlayer para auditoría de contenido, organizaciones, proyectos y gestión de usuarios.
keywords:
  - intlayer
  - API
  - SDK
  - integración
  - auditoría de contenido
  - organizaciones
  - proyectos
  - JavaScript
slugs:
  - doc
  - packages
  - intlayer
  - api
---

# @intlayer/api: Paquete NPM para interactuar con la API de Intlayer

**Intlayer** es un conjunto de paquetes diseñados específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

**`@intlayer/api`** es un SDK (Kit de Desarrollo de Software) para interactuar con la API de Intlayer. Proporciona un conjunto de funciones para auditar la declaración de contenido, interactuar con organizaciones, proyectos y usuarios, etc.

## Uso

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## Instalación

Instale el paquete necesario usando su gestor de paquetes preferido:

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

## Historial de la documentación

- 5.5.10 - 2025-06-29: Historial inicial
