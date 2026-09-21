---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentación del hook useDictionary | remix-intlayer
description: Vea cómo utilizar el hook useDictionary en aplicaciones Remix 3 para resolver objetos de diccionario para la locale de la solicitud actual.
keywords:
  - useDictionary
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
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Documentación del hook useDictionary

El hook `useDictionary` transforma un objeto de diccionario importado o inline y devuelve su contenido resuelto para la locale de la solicitud actual en aplicaciones Remix 3.

A diferencia de `useIntlayer`, que resuelve diccionarios por su clave de cadena desde el registro global de diccionarios, `useDictionary` acepta un objeto de diccionario directamente.

## Uso

```ts fileName="src/views/home.ts"
import { useDictionary } from "remix-intlayer";
import homeContent from "./home.content";

export const HomeView = () => {
  const content = useDictionary(homeContent);

  return `
    <div>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
  `;
};
```

También puedes pasar diccionarios inline definidos con `t()`:

```ts
import { useDictionary } from "remix-intlayer";
import { t } from "intlayer";

export const FooterView = () => {
  const content = useDictionary({
    key: "footer",
    content: {
      copyright: t({
        es: "Todos los derechos reservados.",
        en: "All rights reserved.",
        fr: "Tous droits réservés.",
      }),
    },
  });

  return `<footer>${content.copyright}</footer>`;
};
```

## Parámetros

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Un objeto de diccionario o grupo de diccionarios calificado.
2. **`localeOrSelector`** (opcional): Una locale específica o un objeto selector (`{ item }`, `{ variant }`, opcionalmente con `locale`).

## Descripción

El hook realiza las siguientes tareas:

1. **Detección de locale**: Lee la locale activa de la solicitud desde el almacenamiento `AsyncLocalStorage` creado por el middleware `intlayer()`.
2. **Resolución de contenido**: Evalúa traducciones (`t()`), enumeraciones, condiciones y estructuras anidadas según la locale resuelta.
3. **Procesamiento de selectores**: Aplica cualquier selector de elemento o variante proporcionado en los argumentos.

## Documentación relacionada

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/useLocale.md)
