---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Documentación de la Función getIntlayer | intlayer
description: Ve cómo usar la función getIntlayer para el paquete intlayer
keywords:
  - getIntlayer
  - dictionary
  - content
  - selector
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
  - getIntlayer
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentación: Función `getIntlayer` en `intlayer`

## Descripción

La función `getIntlayer` selecciona un diccionario por su clave y devuelve su contenido interpretado para una locale determinada. Es el equivalente agnóstico del framework del hook `useIntlayer`: mismo contenido, mismos selectores, pero utilizable en cualquier lugar donde un contexto de React no esté disponible — scripts de Node, funciones de servidor, cargadores de rutas, constructores de metadatos, manejadores de Express/Fastify, pruebas.

Lee los diccionarios generados por Intlayer en `.intlayer/`, por lo que el argumento `key` está tipado y autocompletado a partir de tus propias declaraciones de contenido, y el objeto devuelto está completamente tipado hasta cada hoja.

**Características principales:**

- Claves de diccionario tipadas y contenido devuelto tipado
- Interpreta cada nodo de contenido (`t()`, `enu()`, `cond()`, `insert()`, `nest()`, `md()`, `html()`, `file()`, `gender()`)
- Acepta una locale u un objeto selector (colecciones, variantes)
- Los resultados se memorizan por `key + locale + selector`
- Se retrocede a un proxy seguro en desarrollo cuando falta un diccionario, en lugar de fallar

---

## Firma de función

```typescript
getIntlayer(
  key: DictionaryKeys,                        // Requerido
  localeOrSelector?: LocalesValues | DictionarySelector, // Opcional
  plugins?: Plugins[]                         // Opcional
): DeepTransformContent<...>
```

---

## Parámetros

- `key: DictionaryKeys`
  - **Description**: The key of the dictionary to read, as declared in your content files.
  - **Type**: `DictionaryKeys` — a union of every declared dictionary key.
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: The locale to interpret the content with, or a selector object for [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md).
    - `'fr'` — a locale
    - `{ item: 2 }` — a [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/collections.md) item (omit `item` to get every item as an array)
    - `{ variant: 'black-friday' }` — a named [variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/variants.md) (omit for the `default` one)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — a structured variant
    - Any selector can carry a locale: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Custom node transformers replacing the base interpreter plugins. Advanced use only; omit it to keep the default behaviour.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Retorna

- **Type**: El contenido interpretado del diccionario, tipado desde tu declaración.
- **Description**: Un objeto plano que refleja el campo `content` de tu diccionario, donde cada nodo de Intlayer ha sido resuelto a su valor final para la locale solicitada.

---

## Ejemplo de uso

### Uso Básico

```typescript fileName="src/app.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      es: "Hola",
      en: "Hello",
      fr: "Bonjour",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app", "es"); // "Hola"
```

### Sin locale

Omitir el locale interpreta el contenido con el `defaultLocale` declarado en tu [configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Interpretado con el locale por defecto
```

### Dentro de un manejador del servidor

```typescript fileName="src/routes/greeting.ts" codeFormat="typescript"
import { getIntlayer, getLocale } from "intlayer";

export const greetingHandler = async (request: Request) => {
  const locale = await getLocale({
    getHeader: (name) => request.headers.get(name) ?? undefined,
  });

  const { title } = getIntlayer("app", locale);

  return Response.json({ title });
};
```

### Con un selector (colecciones y variantes)

```typescript
import { getIntlayer } from "intlayer";

// Un elemento único de la colección
const secondPost = getIntlayer("blog-post", { item: 2, locale: "fr" });

// Todos los elementos de la colección, como un array ordenado
const allPosts = getIntlayer("blog-post", { locale: "fr" });

// Una variante nombrada
const banner = getIntlayer("banner", { variant: "black-friday", locale: "fr" });
```

---

## Notas de Comportamiento

### Caché

Los resultados se memorizan en un caché a nivel de módulo, con clave `key + locale + selector`. Llamar a `getIntlayer("app", "fr")` repetidamente interpreta el diccionario una sola vez y devuelve el mismo objeto después.

### Diccionarios faltantes

En desarrollo, solicitar una clave que no tiene un diccionario generado registra una advertencia una vez y devuelve un proxy de respaldo seguro: leer `content.title` produce la cadena `"app.title"` en lugar de lanzar una excepción. Esto mantiene una página utilizable mientras se corrige la declaración faltante. Ejecuta la compilación de Intlayer (o el servidor de desarrollo) para que se genere el diccionario.

### Tamaño del bundle

`getIntlayer` lee el diccionario fusionado, que contiene **todos** los locales. En bundles del cliente, los [plugins de compilación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) reescriben la llamada para que solo se envíe el contenido requerido. Cuando lees contenido fuera de la renderización (metadatos, loaders, funciones de servidor) y deseas que un único local se cargue bajo demanda, utiliza [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayerAsync.md) en su lugar.

---

## Funciones Relacionadas

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayerAsync.md): Contraparte asincrónica que carga un único chunk de locale.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getDictionary.md): Interpreta un objeto de diccionario que pasas tú mismo, en lugar de uno buscado por clave.
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useIntlayer.md): El equivalente del hook de React, leyendo el locale del provider.

---

## TypeScript

```typescript
function getIntlayer<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
