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

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer!.t({
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

> El plugin registra su contexto mediante un `derive` **global**, que Elysia tipa como `Partial<{ intlayer: IntlayerContext }>`. El valor siempre está presente en tiempo de ejecución para las rutas registradas después de `.use(intlayer())`, así que usa la aserción non-null (`intlayer!.t`) — u optional chaining — para satisfacer a TypeScript en modo `strict`.

Los mismos helpers están disponibles como exports independientes, por lo que puedes llamarlos sin desestructurar el contexto de la ruta:

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

## Descripción

El plugin realiza las siguientes tareas:

1. **Detección de locale**: Lee el locale establecido explícitamente por el cliente desde el storage (cookie, header), y luego recurre al locale negociado a partir del header `Accept-Language`.
2. **Inyección en el contexto**: Añade una propiedad `intlayer` al contexto de ruta de Elysia (ver la tabla Contexto de la ruta más abajo).
3. **Gestión del contexto**: Usa `AsyncLocalStorage` para gestionar un contexto asíncrono, permitiendo que las funciones globales de Intlayer (`t`, `getIntlayer`, `getDictionary`) accedan al locale específico de la request sin tener que pasar el objeto de contexto.
4. **Preparación de los diccionarios**: Llama a `prepareIntlayer` cuando se crea el plugin, de modo que los diccionarios se construyen al arrancar la aplicación.

### Contexto de la ruta

| Propiedad         | Tipo                   | Descripción                                                                                   |
| ----------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| `locale`          | `Locale`               | El locale a usar para esta request; `locale_storage` tiene prioridad sobre `locale_detected`. |
| `locale_storage`  | `Locale` (opcional)    | El locale solicitado explícitamente por el cliente mediante una cookie o un header.           |
| `locale_detected` | `Locale`               | El locale negociado a partir de los headers de la request.                                    |
| `defaultLocale`   | `Locale`               | El locale configurado como fallback en `intlayer.config.ts`.                                  |
| `t`               | `TranslateFunction`    | Una función de traducción.                                                                    |
| `getIntlayer`     | `typeof getIntlayer`   | Una función para recuperar diccionarios por clave.                                            |
| `getDictionary`   | `typeof getDictionary` | Una función para procesar objetos de diccionario.                                             |

> A diferencia de los plugins de Intlayer basados en Node, `elysia-intlayer` se apoya en `AsyncLocalStorage` en lugar de `cls-hooked`, porque `cls-hooked` depende de `async_hooks.createHook`, que Bun no implementa.

El contexto de la request se libera una vez que la respuesta se ha mapeado, de modo que los helpers independientes nunca se resuelven contra una request ya finalizada. Cuando se llaman fuera de una request gestionada por el plugin, recurren al locale por defecto configurado.

## Orden de resolución de la locale

Por defecto, el plugin resuelve la locale en este orden:

1. La cookie `INTLAYER_LOCALE`.
2. El header `x-intlayer-locale`.
3. La negociación del header `Accept-Language`.
4. La `defaultLocale` configurada.

```bash
# Negociada desde `Accept-Language`
curl -H "Accept-Language: fr" http://localhost:3000/
# Bonjour

# La cookie tiene prioridad sobre `Accept-Language`
curl -H "Accept-Language: fr" -H "Cookie: INTLAYER_LOCALE=es" http://localhost:3000/
# Hola

# El header tiene prioridad sobre `Accept-Language`
curl -H "Accept-Language: fr" -H "x-intlayer-locale: es" http://localhost:3000/
# Hola
```

## Configuración

El plugin lee tu archivo `intlayer.config.ts`. Puedes personalizar la cookie y el header usados para la detección del locale:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> Para más información sobre la configuración, visita la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

## Documentación relacionada

- [Documentación del paquete elysia-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/elysia-intlayer/exports.md)
- [Elysia i18n - Guía completa para traducir tu aplicación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_elysia.md)
