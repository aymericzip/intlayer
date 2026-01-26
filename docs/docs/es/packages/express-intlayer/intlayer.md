---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del middleware intlayer para Express | express-intlayer
description: Vea cómo usar el middleware intlayer del paquete express-intlayer
keywords:
  - intlayer
  - express
  - middleware
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
slugs:
  - doc
  - packages
  - express-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Inicialización de la documentación
---

# Documentación del middleware intlayer para Express

El middleware `intlayer` para Express detecta la configuración regional del usuario y proporciona funciones de traducción a través del objeto `res.locals`. También habilita el uso de las funciones `t` y `getIntlayer` en todos tus manejadores de solicitud.

## Uso

```ts
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

app.use(intlayer());

app.get("/", (req, res) => {
  const content = res.locals.t({
    en: "Hello",
    fr: "Bonjour",
  });

  res.send(content);
});
```

## Descripción

La middleware realiza las siguientes tareas:

1. **Detección de locale**: Comprueba cookies, cabeceras (como `Accept-Language`) y parámetros de la URL para determinar la locale del usuario.
2. **Configuración del contexto**: puebla `res.locals` con:
   - `locale`: La locale detectada.
   - `t`: Una función de traducción vinculada a la locale detectada.
   - `getIntlayer`: Una función para recuperar diccionarios vinculados a la locale detectada.
3. **Almacenamiento local asíncrono**: configura un contexto que permite el uso de las funciones globales `t` y `getIntlayer` importadas desde `express-intlayer` dentro del flujo de la solicitud.
