---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Documentación de la función getDictionaryAsync | intlayer
description: Ve cómo usar la función getDictionaryAsync para el paquete intlayer
keywords:
  - getDictionaryAsync
  - dictionary
  - dynamic dictionaries
  - loader map
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
  - getDictionaryAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentación: Función `getDictionaryAsync` en `intlayer`

## Descripción

La función `getDictionaryAsync` carga un **único chunk de locale** de un diccionario y devuelve su contenido interpretado.

Es el contraparte de [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getDictionary.md) para los mapas de loader por locale emitidos en `.intlayer/dynamic_dictionaries/`: en lugar de recibir un diccionario que contiene todos los locales, recibe el mapa de loader y espera solo el chunk que el locale solicitado necesita.

> En el código de aplicación normalmente llamas [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayerAsync.md), no esta función. Los [plugins de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) reescriben cada llamada `getIntlayerAsync('key', locale)` en una `getDictionaryAsync(loaderMap, 'key', locale)`. `getDictionaryAsync` se exporta para loaders personalizados y para herramientas que construyen sus propios mapas de loader.

**Características Principales:**

- Carga solo el chunk de locale que se solicita
- Soporta mapas de loader simples (`locale → loader`) y calificados (`locale → qualifierId → loader`)
- Deduplica cargas concurrentes del mismo chunk y cachea el contenido resuelto
- Las cargas fallidas se evictan del caché para que una llamada posterior reintente el chunk

---

## Firma de la función

```typescript
getDictionaryAsync(
  dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap, // Requerido
  key: string,                                           // Requerido
  localeOrSelector?: LocalesValues | DictionarySelector, // Opcional
  plugins?: Plugins[]                                    // Opcional
): Promise<DeepTransformContent<...>>
```

---

## Parámetros

- `dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap`
  - **Description**: El mapa de cargadores por locale. Los mapas simples asocian un locale con un cargador; los mapas calificados (utilizados por colecciones y variantes) asocian un locale con un id de calificador, luego con un cargador. Para un mapa calificado, solo se cargan los chunk(s) que el selector apunta.
  - **Type**: `PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap`
  - **Required**: Yes

- `key: string`
  - **Description**: La clave del diccionario, utilizada para namespace del caché de chunks.
  - **Type**: `string`
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: El locale para interpretar el contenido, o un objeto selector (`{ item }`, `{ variant }`, opcionalmente con `locale`). Ver [diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md).
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Transformadores de nodos. Por defecto el conjunto base del intérprete.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Retorna

- **Type**: `Promise<Content>` — una promesa que se resuelve al contenido interpretado del chunk cargado.
- **Description**: Se resuelve a `null` cuando el mapa no emite ningún chunk para la locale solicitada ni para ninguno de sus fallbacks, reflejando cómo se resuelve una coordenada calificada faltante.

---

## Ejemplo de Uso

### Con un mapa de cargador generado

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionaryAsync } from "intlayer";
import appLoaderMap from "../.intlayer/dynamic_dictionaries/app";

const { title } = await getDictionaryAsync(appLoaderMap, "app", "fr");
```

### Con un mapa de cargadores personalizado

```typescript
import { getDictionaryAsync } from "intlayer";

const loaderMap = {
  en: () => import("./banner.en.json").then((mod) => mod.default),
  fr: () => import("./banner.fr.json").then((mod) => mod.default),
};

const banner = await getDictionaryAsync(loaderMap, "banner", "fr");
```

### Con un selector en un mapa calificado

```typescript
import { getDictionaryAsync } from "intlayer";

const promoBanner = await getDictionaryAsync(bannerLoaderMap, "banner", {
  variant: "black-friday",
  locale: "fr",
});
```

---

## Notas de comportamiento

### Almacenamiento en caché y deduplicación

El caché almacena la **promise** de cada triple `key + locale + selector`, por lo que las llamadas concurrentes para el mismo chunk esperan una única carga. Una carga rechazada se elimina del caché, por lo que un chunk que falla se reintenta en la siguiente llamada en lugar de reproducir el mismo error indefinidamente.

### Fallback de locale

Un mapa de loader simple se recorre a lo largo de la misma cadena de fallback que en modo síncrono: primero la locale solicitada, luego sus fallbacks, y luego `null` si ninguno emitió un chunk.

---

## Funciones Relacionadas

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayerAsync.md): La función que las aplicaciones llaman; los plugins de compilación la reescriben en `getDictionaryAsync`.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getDictionary.md): Contraparte síncrona que toma un diccionario completo.
- [Diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md): Colecciones y variantes, y los mapas de cargadores que generan.

---

## TypeScript

```typescript
function getDictionaryAsync<
  const T extends Dictionary,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionaryLoaders: PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap,
  key: string,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    T["content"],
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
