---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer live: sincronizar contenido del CMS"
description: "Usa Live Sync de Intlayer para aplicar los cambios hechos en el CMS a tu aplicación en ejecución, sin reconstruirla ni redesplegarla."
keywords:
  - Live Sync
  - CMS
  - Tiempo de ejecución
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - live
author: aymericzip
---

# Comandos de Live Sync

Live Sync permite que tu aplicación refleje los cambios en el contenido del CMS en runtime. No se requiere reconstrucción ni redeploy. Cuando está habilitado, las actualizaciones se transmiten a un servidor de Live Sync que actualiza los diccionarios que tu aplicación lee. Consulta [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) para más detalles.

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

## Argumentos:

**Opciones de configuración:**

- **`--base-dir`**: Especifica el directorio base del proyecto. Para obtener la configuración de intlayer, el comando buscará el archivo `intlayer.config.{ts,js,json,cjs,mjs}` en el directorio base.

- **`--no-cache`**: Desactiva la caché.

  > Ejemplo: `npx intlayer dictionary push --env-file .env.production.local`

- **`--ci`**: Ejecuta el comando en cada proyecto Intlayer del monorepo (o solo en el actual si se ejecuta desde un directorio de proyecto). Se pueden inyectar credenciales por proyecto mediante `INTLAYER_PROJECT_CREDENTIALS`, un objeto JSON que asocia cada ruta de proyecto a `{ "clientId", "clientSecret" }`.

  > Ejemplo: `npx intlayer live --ci`

**Opciones de registro:**

- **`--verbose`**: Habilita el registro detallado para depuración. (por defecto está activado usando CLI)
