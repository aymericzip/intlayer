---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: Documentación del Middleware de Hono intlayer | hono-intlayer
description: Vea cómo usar el middleware intlayer para el paquete hono-intlayer
keywords:
  - intlayer
  - hono
  - middleware
  - Intlayer
  - Internacionalización
  - Documentación
slugs:
  - doc
  - packages
  - hono-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Inicio de la doc
---

# Documentación del Middleware de Hono intlayer

El middleware `intlayer` para Hono detecta el idioma del usuario y rellena el objeto de contexto con las funciones de Intlayer. También permite el uso de funciones de traducción globales dentro del contexto de la solicitud.

## Uso

```ts
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());

app.get("/", async (c) => {
  const t = c.get("t");
  const content = t({
    en: "Hello",
    fr: "Bonjour",
  });

  return c.text(content);
});
```

## Descripción

El middleware realiza las siguientes tareas:

1. **Detección de idioma**: Analiza la solicitud (encabezados, cookies, etc.) para determinar el idioma preferido del usuario.
2. **Relleno del contexto**: Añade datos de Intlayer al contexto de Hono, accesibles a través de `c.get()`. Esto incluye:
   - `locale`: El idioma detectado.
   - `t`: Una función de traducción.
   - `getIntlayer`: Una función para recuperar diccionarios.
   - `getDictionary`: Una función para procesar objetos de diccionario.
3. **Gestión del contexto**: Utiliza `cls-hooked` para gestionar un contexto asíncrono, permitiendo que las funciones globales de Intlayer (`t`, `getIntlayer`, `getDictionary`) accedan al idioma específico de la solicitud sin pasar el objeto de contexto.
