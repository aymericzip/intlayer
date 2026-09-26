---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Documentación del hook useIntlayer | remix-intlayer
description: Vea cómo utilizar el hook useIntlayer en aplicaciones Remix 3 para acceder a contenido localizado por clave.
keywords:
  - useIntlayer
  - diccionario
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
slugs:
  - doc
  - packages
  - remix-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Documentación del hook useIntlayer

El hook `useIntlayer` te permite recuperar contenido localizado de un diccionario de Intlayer por clave en aplicaciones Remix 3.

Lee automáticamente la locale activa del contexto de solicitud actual (a través de `AsyncLocalStorage`), por lo que no necesitas propagar la locale a través de controladores de ruta, plantillas de vista o componentes.

## Uso

### En controladores de ruta

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/welcome", () => {
  const content = useIntlayer("home");

  return Response.json({
    title: content.title,
    subtitle: content.subtitle,
  });
});
```

### En plantillas de vista / componentes

```tsx fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `
    <main>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </main>
  `;
};
```

## Parámetros

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: La clave única del diccionario (tal como se define en tus archivos de declaración `.content.ts`).
2. **`localeOrSelector`** (opcional): Una locale específica o un objeto selector (`{ item }`, `{ variant }`, opcionalmente con `locale`). Si se proporciona, anula la locale detectada del contexto de la solicitud.

## Descripción

El hook realiza las siguientes tareas:

1. **Recuperación de la locale del contexto**: Detecta la locale actual del alcance `AsyncLocalStorage` vinculado a la solicitud establecido por el middleware `intlayer()`.
2. **Recuperación del diccionario**: Obtiene el diccionario precompilado correspondiente a la clave proporcionada.
3. **Procesamiento de traducción**: Resuelve traducciones, enumeraciones, markdown y contenido condicional para la locale resuelta.
4. **Manejo de respaldo**: Si se llama fuera de un contexto de solicitud HTTP activo, recurre limpiamente a la `defaultLocale` configurada.

## Documentación relacionada

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/useDictionary.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/useLocale.md)
