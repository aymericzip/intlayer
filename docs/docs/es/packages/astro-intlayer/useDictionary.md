---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentación del hook useDictionary | astro-intlayer
description: Descubre cómo usar el hook useDictionary en componentes y scripts de Astro para resolver objetos de diccionario.
keywords:
  - useDictionary
  - dictionary
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - internacionalización
  - documentación
slugs:
  - doc
  - packages
  - astro-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Doc inicial"
author: aymericzip
---

# Documentación del hook useDictionary

El hook `useDictionary` resuelve un objeto de diccionario importado o en línea y devuelve su contenido para el locale actual en aplicaciones Astro.

A diferencia de `useIntlayer`, que recupera diccionarios por clave desde el registro global de diccionarios, `useDictionary` funciona directamente con un objeto de diccionario.

## Uso

```astro fileName="src/pages/index.astro"
---
import { useDictionary } from "astro-intlayer";
import homeContent from "../content/home.content";

const content = useDictionary(homeContent);
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

También puedes pasar diccionarios en línea definidos con `t()`:

```astro fileName="src/components/Footer.astro"
---
import { useDictionary } from "astro-intlayer";
import { t } from "intlayer";

const footer = useDictionary({
  key: "footer",
  content: {
    copyright: t({
      es: "Todos los derechos reservados.",
      en: "All rights reserved.",
      fr: "Tous droits réservés.",
    }),
  },
});
---

<footer>
  <p>{footer.copyright}</p>
</footer>
```

## Parámetros

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Un objeto de diccionario o grupo de diccionarios calificado.
2. **`localeOrSelector`** (opcional): Un locale específico o un objeto selector (`{ item }`, `{ variant }`, opcionalmente con `locale`).

## Descripción

El hook realiza las siguientes tareas:

1. **Detección de Locale**: En el servidor, obtiene el locale de `Astro.locals.intlayer`. En el navegador, utiliza el locale del store del cliente.
2. **Procesamiento de contenido**: Resuelve traducciones (`t()`), enumeraciones, condiciones y estructuras anidadas según el locale resuelto.
3. **Selectores**: Aplica cualquier selector de elemento o variante proporcionado en los argumentos.

## Documentación relacionada

- [Integración `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/useLocale.md)
