---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Comandos de Live Sync
description: Aprende a usar Live Sync para reflejar cambios en el contenido del CMS en tiempo de ejecución.
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
---

# Comandos de Live Sync

Live Sync permite que tu aplicación refleje los cambios en el contenido del CMS en tiempo de ejecución. No se requiere reconstrucción ni redeploy. Cuando está habilitado, las actualizaciones se transmiten a un servidor de Live Sync que actualiza los diccionarios que tu aplicación lee. Consulta [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) para más detalles.

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

**Opciones de registro:**

- **`--verbose`**: Habilita el registro detallado para depuración. (por defecto está activado usando CLI)
