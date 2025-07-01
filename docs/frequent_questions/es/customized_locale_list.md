---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: ¿Cómo personalizar la lista de locales?
description: Aprende cómo personalizar la lista de locales.
keywords:
  - locales
  - lista
  - intlayer
  - configuración
  - availableLocales
  - defaultLocale
  - useLocale
  - hook
  - locale
  - lista
slugs:
  - doc
  - faq
  - lista-de-locales-personalizada
---

# ¿Es posible bloquear un tipo de idioma, como inglés? Estoy agregando inglés en mis diccionarios pero no quiero que el inglés esté disponible en el sitio web todavía

Sí, puedes bloquear un tipo de idioma, como inglés, usando la opción `availableLocales` en la configuración de Intlayer.

```ts
import { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  locales: [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH],
  availableLocales: [Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.FRENCH,
};
```

o

```ts
import { IntlayerConfig } from "intlayer";

const locales = [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH];

const config: IntlayerConfig = {
  locales,
  availableLocales: locales.filter((locale) => locale !== Locales.ENGLISH),
  defaultLocale: Locales.FRENCH,
};
```

Esta configuración cambiará los tipos de tu función `t()` para incluir solo los locales disponibles.

La opción availableLocales es opcional, si no la proporcionas, todos los locales estarán disponibles.

Ten cuidado, todos los locales incluidos en la opción `availableLocales` deben estar incluidos en la opción `locales`.

Ten en cuenta que si usas el hook `useLocale`, la opción `availableLocales` se utilizará para establecer el acceso a la lista de locales.

```ts
import { useLocale } from "intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // [Locales.FRENCH, Locales.SPANISH]
```
