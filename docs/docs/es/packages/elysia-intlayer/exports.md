---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Documentación del paquete elysia-intlayer
description: Plugin de Elysia para Intlayer, que proporciona funciones de traducción y detección de locale.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Documentación unificada para todas las exportaciones"
author: aymericzip
---

# Paquete elysia-intlayer

El paquete `elysia-intlayer` proporciona un plugin para aplicaciones Elysia para gestionar la internacionalización. Detecta el locale del usuario e inyecta un objeto `intlayer` en el contexto de la ruta.

## Instalación

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> `elysia` es una peer dependency (`>=1.0.0`). Elysia está pensado para el runtime **Bun**.

## Exportaciones

### Plugin

Importación:

```ts
import { intlayer } from "elysia-intlayer";
```

| Función    | Descripción                                                                                                                                                                                                                                                                                                                                       | Documento relacionado                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Plugin de Elysia que integra Intlayer en tu aplicación Elysia. Gestiona la detección del locale desde el storage (cookies, headers) y luego desde `Accept-Language`, inyecta un objeto `intlayer` que expone `locale`, `t`, `getIntlayer` y `getDictionary` en el contexto de la ruta, y configura el contexto de request de `AsyncLocalStorage`. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/elysia-intlayer/intlayer.md) |

### Funciones

Importación:

```ts
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Función         | Descripción                                                                                                                                                                                                                                                                     | Documento relacionado                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Función de traducción global que recupera el contenido para el locale actual en Elysia. Usa `AsyncLocalStorage` para acceder al contexto de request configurado por el plugin `intlayer`, y recurre al locale por defecto fuera de él. También accesible mediante `intlayer.t`. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation.md) |
| `getIntlayer`   | Recupera un diccionario por su clave desde la declaración generada y devuelve su contenido para el locale actual. Versión optimizada de `getDictionary`. Usa `AsyncLocalStorage` para acceder al contexto de la request. También accesible mediante `intlayer.getIntlayer`.     | -                                                                                                      |
| `getDictionary` | Procesa objetos de diccionario y devuelve el contenido para el locale actual. Procesa traducciones `t()`, enumeraciones, markdown, HTML, etc. Usa `AsyncLocalStorage` para acceder al contexto de la request. También accesible mediante `intlayer.getDictionary`.              | -                                                                                                      |

### Tipos

Importación:

```ts
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Tipo                | Descripción                                                                                                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | Forma del objeto `intlayer` inyectado en cada contexto de ruta: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Firma de la función de traducción, que convierte un locale map en el contenido correspondiente al locale de la request actual.                                       |

## Uso

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { getDictionary, getIntlayer, intlayer, t } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // Cargar el plugin de internacionalización
  .use(intlayer())
  // Leer la locale y los helpers desde el contexto de la ruta
  .get("/", ({ intlayer }) => ({
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  // O usar los helpers standalone, ligados a la petición actual
  .get("/t_example", () =>
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> El plugin registra su contexto mediante un `derive` **global**, que Elysia tipa como `Partial<{ intlayer: IntlayerContext }>`. El valor siempre está presente en tiempo de ejecución para las rutas registradas después de `.use(intlayer())`, así que usa la aserción non-null (`intlayer!.locale`) — u optional chaining — para satisfacer a TypeScript en modo `strict`.

## Documentación relacionada

- [Elysia i18n - Guía completa para traducir tu aplicación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_elysia.md)
- [Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)
