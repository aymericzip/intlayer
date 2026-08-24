---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Documentación del Plugin intlayer para Elysia | elysia-intlayer
description: Descubre cómo usar el plugin intlayer del paquete elysia-intlayer
keywords:
  - intlayer
  - elysia
  - plugin
  - Intlayer
  - Internacionalización
  - Documentación
slugs:
  - doc
  - packages
  - elysia-intlayer
  - intlayer
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Inicialización de la documentación"
author: aymericzip
---

# Documentación del Plugin intlayer para Elysia

El plugin `intlayer` para Elysia detecta el locale del usuario e inyecta un objeto `intlayer` en el contexto de la ruta. También permite el uso de funciones globales de traducción dentro del contexto de la request.

## Uso

```ts
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer.t({
    es: "Hola",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

Los mismos helpers están disponibles como exports independientes, por lo que puedes llamarlos sin desestructurar el contexto de la ruta:

```ts
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    es: "Hola",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

## Descripción

El plugin realiza las siguientes tareas:

1. **Detección de locale**: Lee el locale establecido explícitamente por el cliente desde el storage (cookie, header), y luego recurre al locale negociado a partir del header `Accept-Language`.
2. **Inyección en el contexto**: Añade una propiedad `intlayer` al contexto de ruta de Elysia, que contiene:
   - `locale`: El locale a usar para esta request; `locale_storage` tiene prioridad sobre `locale_detected`.
   - `locale_storage`: El locale solicitado explícitamente por el cliente mediante una cookie o un header.
   - `locale_detected`: El locale negociado a partir de los headers de la request.
   - `defaultLocale`: El locale configurado como fallback en `intlayer.config.ts`.
   - `t`: Una función de traducción.
   - `getIntlayer`: Una función para recuperar diccionarios por clave.
   - `getDictionary`: Una función para procesar objetos de diccionario.
3. **Gestión del contexto**: Usa `AsyncLocalStorage` para gestionar un contexto asíncrono, permitiendo que las funciones globales de Intlayer (`t`, `getIntlayer`, `getDictionary`) accedan al locale específico de la request sin tener que pasar el objeto de contexto.

> A diferencia de los plugins de Intlayer basados en Node, `elysia-intlayer` se apoya en `AsyncLocalStorage` en lugar de `cls-hooked`, porque `cls-hooked` depende de `async_hooks.createHook`, que Bun no implementa.

El contexto de la request se libera una vez que la respuesta se ha mapeado, de modo que los helpers independientes nunca se resuelven contra una request ya finalizada. Cuando se llaman fuera de una request gestionada por el plugin, recurren al locale por defecto configurado.

## Configuración

El plugin lee tu archivo `intlayer.config.ts`. Puedes personalizar la cookie y el header usados para la detección del locale:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

> Para más información sobre la configuración, visita la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).
