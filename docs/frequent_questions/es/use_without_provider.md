---
createdAt: 2026-09-28
updatedAt: 2026-09-28
priority: 4
title: "¿Puedo usar Intlayer sin un provider global?"
description: "Leer el contenido de Intlayer sin montar un provider, cómo se resuelve la locale en el servidor y en el navegador, y la diferencia de rendimiento con un provider."
keywords:
  - provider
  - IntlayerProvider
  - getIntlayer
  - getIntlayerAsync
  - useIntlayer
  - locale
  - rendimiento
  - hidratación
  - intlayer
slugs:
  - frequent-questions
  - use-without-provider
author: aymericzip
---

# ¿Puedo usar Intlayer sin un provider global?

Sí. `getIntlayer` y `getDictionary` son funciones simples que no necesitan ningún provider, y `useIntlayer` también funciona fuera de uno.

```ts
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Sin locale
```

## ¿Qué locale se usa?

Una locale pasada explícitamente siempre tiene prioridad. Si no, la locale se resuelve en este orden:

1. **La locale de la solicitud en curso**, en el servidor, cuando una integración de Intlayer la gestiona: los middlewares de `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer`, `elysia-intlayer`, `remix-intlayer` y `astro-intlayer`, o `IntlayerProvider` en los React Server Components.
2. **La locale almacenada en el navegador** (cookie, `localStorage`, `sessionStorage`), la que persiste tu selector de idioma.
3. **La `defaultLocale`** de tu configuración.

Cada solicitud se resuelve a partir de sus propias cookies y headers, y se conserva en un ámbito propio de la solicitud. Usuarios simultáneos con locales distintas nunca comparten locale.

La misma resolución se aplica a `getDictionary`, a las llamadas reescritas por la [optimización del build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md), y a `useIntlayer` y `useDictionaryDynamic` renderizados fuera de un provider.

- [optimización del build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md)

### Server Components de Next.js

En Next.js, la locale de la solicitud solo se puede leer de forma asíncrona, mediante `headers()` y `cookies()`. Usa [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayerAsync.md), que la espera igual que `getLocale()` de `next-intlayer/server`:

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayerAsync.md)

```tsx
import { getIntlayerAsync } from "intlayer";

export const generateMetadata = async () => {
  const { title } = await getIntlayerAsync("app"); // Locale de la solicitud

  return { title };
};
```

Leer los headers hace que la ruta pase a renderizado dinámico. Cuando `IntlayerProvider` ya proporciona la locale, los headers no se leen y la ruta sigue siendo estática.

## Rendimiento: con o sin provider

El contenido es el mismo. La diferencia está en la reactividad y el coste de renderizado.

|                         | Con un provider                                                   | Sin provider                                                                                                                               |
| ----------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Cambio de locale        | Los componentes se vuelven a renderizar en el sitio, sin recargar | Nada se vuelve a renderizar; la nueva locale aparece en la siguiente llamada (navegación, recarga)                                         |
| Coste de una lectura    | Lectura del contexto y suscripción a la locale                    | Una llamada a función memoizada, mismo objeto para la misma `key + locale`                                                                 |
| Coste de un cambio      | Nuevo renderizado de cada consumidor                              | Ninguno                                                                                                                                    |
| Renderizado en servidor | El servidor y el navegador renderizan la misma locale             | Fuera de una integración de solicitud, el servidor renderiza la `defaultLocale` y el navegador la almacenada: posible error de hidratación |
| Bundle                  | El código del provider                                            | Unos 100 bytes (gzip) para leer la locale almacenada, en caché hasta el siguiente cambio                                                   |

Mantén el provider en aplicaciones interactivas que cambian de locale en el sitio o renderizan en el servidor. Prescinde de él en backends, scripts, páginas estáticas cuya locale viene de la URL (pásala explícitamente) o código que lee el contenido una sola vez.

Consulta [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayer.md) para más detalles.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayer.md)
