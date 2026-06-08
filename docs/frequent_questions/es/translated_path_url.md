---
createdAt: 2025-05-20
updatedAt: 2026-01-22
title: ¿Puedo traducir la ruta de la URL?
description: Aprende cómo traducir la ruta de la URL.
keywords:
  - array
  - contenido
  - declaración
  - intlayer
  - middleware
  - proxy
  - reescritura
  - prefijo
  - locale
  - url
slugs:
  - frequent-questions
  - translated-path-url
---

# ¿Es posible traducir las URLs?

¡Sí! Intlayer admite reescrituras de URL personalizadas, que le permiten definir rutas específicas por idioma. Por ejemplo:

```bash
en -> /product
fr -> /fr/produit
es -> /es/producto
```

Para implementar esto, puede configurar la sección `routing` en su archivo `intlayer.config.ts`.

Para más información sobre cómo implementar esta característica, consulte la [documentación de Reescrituras de URL Personalizadas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md).

También puede usar las funciones `getMultilingualUrl` y `getLocalizedUrl` para generar estas URLs de forma programática, y respetarán sus reglas de reescritura.

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/produit (si está configurado)
```
