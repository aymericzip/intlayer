---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del Plugin intlayer para Fastify | fastify-intlayer
description: Cómo usar el plugin intlayer para el paquete fastify-intlayer
keywords:
  - intlayer
  - fastify
  - plugin
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
slugs:
  - doc
  - packages
  - fastify-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documento inicial
---

# Documentación del Plugin intlayer para Fastify

El plugin `intlayer` para Fastify detecta la locale del usuario y decora el objeto `request` con funciones de Intlayer. También permite el uso de funciones globales de traducción dentro del contexto de la petición.

## Uso

```ts
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

fastify.register(intlayer);

fastify.get("/", async (req, reply) => {
  const content = req.intlayer.t({
    es: "Hola",
    en: "Hello",
    fr: "Bonjour",
  });

  return content;
});
```

## Descripción

El plugin realiza las siguientes tareas:

1. **Detección de locale**: Analiza la request (headers, cookies, etc.) para determinar el locale preferido del usuario.
2. **Decoración de la request**: Añade una propiedad `intlayer` al objeto `FastifyRequest`, que contiene:
   - `locale`: El locale detectado.
   - `t`: Una función de traducción.
   - `getIntlayer`: Una función para obtener diccionarios.
3. **Gestión del contexto**: Usa `cls-hooked` para gestionar un contexto asíncrono, permitiendo que las funciones globales de Intlayer accedan al locale específico de la request.
