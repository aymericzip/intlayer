---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Documentación del Middleware AdonisJS Intlayer | adonis-intlayer
description: Vea cómo usar el middleware intlayer para el paquete adonis-intlayer
keywords:
  - intlayer
  - adonisjs
  - middleware
  - Intlayer
  - Internacionalización
  - Documentación
slugs:
  - doc
  - packages
  - adonis-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Documentación inicial
---

# Documentación del Middleware AdonisJS Intlayer

El middleware `intlayer` para AdonisJS detecta el locale del usuario y proporciona funciones de traducción a través del contexto de la solicitud. También habilita el uso de funciones de traducción globales dentro del flujo de la solicitud.

## Uso

```ts fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

```ts fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Hello",
    fr: "Bonjour",
  });
});
```

## Descripción

El middleware realiza las siguientes tareas:

1. **Detección de Locale**: Analiza la solicitud (encabezados, cookies, etc.) para determinar el locale preferido del usuario.
2. **Configuración del Contexto**: Rellena el contexto de la solicitud con información del locale.
3. **Async Local Storage**: Utiliza `cls-hooked` para gestionar un contexto asíncrono, permitiendo que las funciones globales de Intlayer como `t`, `getIntlayer` y `getDictionary` accedan al locale específico de la solicitud sin tener que pasarlo manualmente.

> Nota: Para usar cookies para la detección del locale, asegúrese de que `@adonisjs/cookie` esté configurado y se use en su aplicación.
