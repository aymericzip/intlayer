---
createdAt: 2026-08-23
updatedAt: 2026-09-28
priority: 5
title: Documentación de la función getIntlayerAsync | intlayer
description: "Usa getIntlayerAsync para cargar y leer el contenido de un diccionario para una sola locale, sin incluir los demás idiomas."
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
  - version: 9.5.12
    date: 2026-09-28
    changes: "Sin locale, espera la locale de la solicitud (headers y cookies de Next.js)"
  - version: 9.4.0
    date: 2026-08-23
    changes: "Documentación inicial"
author: aymericzip
---

# Documentación: Función `getIntlayerAsync` en `intlayer`

## Descripción

La función `getIntlayerAsync` selecciona un diccionario por su clave y resuelve su contenido para una localidad determinada, **cargando solo esa localidad**.

Es la contraparte asincrónica de [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayer.md), destinada a los lugares donde se lee un diccionario fuera del renderizado, constructores de rutas `head` / metadatos, loaders, funciones de servidor.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayer.md)

Mientras que `getIntlayer` carga el diccionario fusionado que contiene todas las localidades, los [plugins de construcción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) reescriben esta llamada en `getDictionaryAsync(loaderMap, key, locale)`, apuntando a los fragmentos por localidad en `.intlayer/dynamic_dictionaries/`. El bundle por lo tanto solo carga la localidad realmente solicitada.

- [plugins de construcción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md)

Sin esos plugins, una construcción no optimizada, la llamada se resuelve a través del registro de diccionarios sincrónico en su lugar: el mismo contenido, sin la división por localidad.

**Características Clave:**

- Las mismas claves tipadas, selectores y contenido devuelto que `getIntlayer`
- Carga solo el fragmento de localidad solicitado en construcciones optimizadas
- Las llamadas concurrentes para el mismo fragmento comparten una única carga
- Seguro de usar en constructores de metadatos `async`, loaders y funciones de servidor

## Firma de Función

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Requerido
  localeOrSelector?: LocalesValues | DictionarySelector, // Opcional
  plugins?: Plugins[]                         // Opcional
): Promise<DeepTransformContent<...>>
```

## Parámetros

- `key: DictionaryKeys`
  - **Descripción**: La clave del diccionario a leer, tal como se declara en tus archivos de contenido.
  - **Tipo**: `DictionaryKeys`, una unión de cada clave de diccionario declarada.
  - **Requerido**: Sí

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Descripción**: La locale para interpretar el contenido, o un objeto selector para [diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md).
    - `'fr'`: una locale
    - `{ item: 2 }`: un elemento de [colección](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/collections.md) (omite `item` para obtener cada elemento como un array)
    - `{ variant: 'black-friday' }`: una [variante](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/variants.md) nombrada (omite para la `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }`: una variante estructurada
    - Cualquier selector puede llevar una locale: `{ item: 2, locale: 'fr' }`
  - **Tipo**: `LocalesValues | DictionarySelector`
  - **Requerido**: No (opcional). Si se omite, se resuelve como en [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayer.md) (locale de la solicitud, luego locale almacenada, luego `defaultLocale`). Al ser asíncrona, también puede esperar la locale de la solicitud cuando solo se puede leer de forma asíncrona: en los Server Components de Next.js, `generateMetadata` y los route handlers, lee los `headers()` y `cookies()` de la solicitud, como `getLocale()` de `next-intlayer/server`. Esa lectura hace que la ruta pase a renderizado dinámico, por lo que solo ocurre si `IntlayerProvider` no ha proporcionado ya la locale.

- `plugins: Plugins[]`
  - **Descripción**: Transformadores de nodos personalizados que reemplazan los plugins base del intérprete. Solo uso avanzado.
  - **Tipo**: `Plugins[]`
  - **Requerido**: No (opcional)

### Devoluciones

- **Tipo**: `Promise<Content>`, una promesa que se resuelve al contenido interpretado del diccionario, tipado desde tu declaración.

## Ejemplo de uso

### Uso Básico

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

## `getIntlayer` vs `getIntlayerAsync`

|                     | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                                |
| ------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Devuelve            | El contenido                                                                                                    | Una promesa del contenido                         |
| Diccionario cargado | El diccionario fusionado (todas las locales)                                                                    | El chunk de la locale solicitada únicamente       |
| Mejor para          | Renderizado, rutas de código sincrónicas                                                                        | Metadatos, loaders, funciones del servidor        |
| ¿Requiere plugin?   | No                                                                                                              | No, la división por locale requiere plugins build |

Ambos aceptan los mismos argumentos y devuelven el mismo contenido: cambiar de uno a otro solo cambia **cuándo** y **cuánto** se carga.

## Funciones Relacionadas

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayer.md)
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getDictionaryAsync.md)
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocale.md)

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
