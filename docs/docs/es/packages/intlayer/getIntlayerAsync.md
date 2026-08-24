---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Documentación de la función getIntlayerAsync | intlayer
description: Consulta cómo utilizar la función getIntlayerAsync del paquete intlayer
keywords:
  - getIntlayerAsync
  - dictionary
  - dynamic import
  - metadata
  - bundle optimization
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getIntlayerAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentación: Función `getIntlayerAsync` en `intlayer`

## Descripción

La función `getIntlayerAsync` selecciona un diccionario por su clave y resuelve su contenido para una localidad determinada, **cargando solo esa localidad**.

Es la contraparte asincrónica de [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayer.md), destinada a los lugares donde se lee un diccionario fuera del renderizado — constructores de rutas `head` / metadatos, loaders, funciones de servidor.

Mientras que `getIntlayer` carga el diccionario fusionado que contiene todas las localidades, los [plugins de construcción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) reescriben esta llamada en `getDictionaryAsync(loaderMap, key, locale)`, apuntando a los fragmentos por localidad en `.intlayer/dynamic_dictionaries/`. El bundle por lo tanto solo carga la localidad realmente solicitada.

Sin esos plugins — una construcción no optimizada — la llamada se resuelve a través del registro de diccionarios sincrónico en su lugar: el mismo contenido, sin la división por localidad.

**Características Clave:**

- Las mismas claves tipadas, selectores y contenido devuelto que `getIntlayer`
- Carga solo el fragmento de localidad solicitado en construcciones optimizadas
- Las llamadas concurrentes para el mismo fragmento comparten una única carga
- Seguro de usar en constructores de metadatos `async`, loaders y funciones de servidor

---

## Firma de Función

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Requerido
  localeOrSelector?: LocalesValues | DictionarySelector, // Opcional
  plugins?: Plugins[]                         // Opcional
): Promise<DeepTransformContent<...>>
```

---

## Parámetros

- `key: DictionaryKeys`
  - **Description**: La clave del diccionario a leer, tal como se declara en tus archivos de contenido.
  - **Type**: `DictionaryKeys` — una unión de cada clave de diccionario declarada.
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: La locale para interpretar el contenido, o un objeto selector para [diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md).
    - `'fr'` — una locale
    - `{ item: 2 }` — un elemento de [colección](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/collections.md) (omite `item` para obtener cada elemento como un array)
    - `{ variant: 'black-friday' }` — una [variante](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/variants.md) nombrada (omite para la `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — una variante estructurada
    - Cualquier selector puede llevar una locale: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — por defecto la `defaultLocale` configurada.

- `plugins: Plugins[]`
  - **Description**: Transformadores de nodos personalizados que reemplazan los plugins base del intérprete. Solo uso avanzado.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Devoluciones

- **Type**: `Promise<Content>` — una promesa que se resuelve al contenido interpretado del diccionario, tipado desde tu declaración.

---

## Ejemplo de uso

### Uso Básico

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

### En una ruta `head` de TanStack Start

Porque el chunk de locale se carga bajo demanda, `head` se vuelve `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayerAsync } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale } = params;

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

### En una `generateMetadata` de Next.js

```tsx fileName="src/app/[locale]/page.tsx"
import { getIntlayerAsync } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description } = await getIntlayerAsync(
    "page-metadata",
    locale
  );

  return { title, description };
};
```

### En una función de servidor

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { getCookie, getIntlayerAsync, getLocale } from "intlayer";

export const getLocalizedContent = createServerFn().handler(async () => {
  const locale = await getLocale({
    getCookie: (name) => getCookie(name, getRequestHeader("cookie")),
    getHeader: (name) => getRequestHeader(name),
  });

  const content = await getIntlayerAsync("app", locale);

  return { locale, content };
});
```

---

## `getIntlayer` vs `getIntlayerAsync`

|                     | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Devuelve            | El contenido                                                                                                    | Una promesa del contenido                          |
| Diccionario cargado | El diccionario fusionado (todas las locales)                                                                    | El chunk de la locale solicitada únicamente        |
| Mejor para          | Renderizado, rutas de código sincrónicas                                                                        | Metadatos, loaders, funciones del servidor         |
| ¿Requiere plugin?   | No                                                                                                              | No — la división por locale requiere plugins build |

Ambos aceptan los mismos argumentos y devuelven el mismo contenido: cambiar de uno a otro solo cambia **cuándo** y **cuánto** se carga.

---

## Funciones Relacionadas

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayer.md): Equivalente síncrono que lee el diccionario combinado.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getDictionaryAsync.md): La función de nivel inferior que los plugins de compilación reescriben en esta llamada.
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocale.md): Detecta el locale de una solicitud entrante.

---

## TypeScript

```typescript
function getIntlayerAsync<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
