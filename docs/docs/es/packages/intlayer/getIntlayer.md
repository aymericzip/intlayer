---
createdAt: 2026-08-23
updatedAt: 2026-09-28
priority: 5
title: Documentación de la Función getIntlayer | intlayer
description: "Usa getIntlayer para leer el contenido de un diccionario para una locale en cualquier lugar, el equivalente agnóstico del hook useIntlayer."
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
  - version: 9.5.12
    date: 2026-09-28
    changes: "Sin locale, se resuelve la locale de la solicitud o la locale almacenada antes que la locale por defecto"
  - version: 9.4.0
    date: 2026-08-23
    changes: "Documentación inicial"
author: aymericzip
---

# Documentación: Función `getIntlayer` en `intlayer`

## Descripción

La función `getIntlayer` selecciona un diccionario por su clave y devuelve su contenido interpretado para una locale determinada. Es el equivalente agnóstico del framework del hook `useIntlayer`: mismo contenido, mismos selectores, pero utilizable en cualquier lugar donde un contexto de React no esté disponible, scripts de Node, funciones de servidor, cargadores de rutas, constructores de metadatos, manejadores de Express/Fastify, pruebas.

Lee los diccionarios generados por Intlayer en `.intlayer/`, por lo que el argumento `key` está tipado y autocompletado a partir de tus propias declaraciones de contenido, y el objeto devuelto está completamente tipado hasta cada hoja.

**Características principales:**

- Claves de diccionario tipadas y contenido devuelto tipado
- Interpreta cada nodo de contenido (`t()`, `enu()`, `cond()`, `insert()`, `nest()`, `md()`, `html()`, `file()`, `gender()`)
- Acepta una locale u un objeto selector (colecciones, variantes)
- Los resultados se memorizan por `key + locale + selector`
- Se retrocede a un proxy seguro en desarrollo cuando falta un diccionario, en lugar de fallar

## Firma de función

```typescript
getIntlayer(
  key: DictionaryKeys,                        // Requerido
  localeOrSelector?: LocalesValues | DictionarySelector, // Opcional
  plugins?: Plugins[]                         // Opcional
): DeepTransformContent<...>
```

## Parámetros

- `key: DictionaryKeys`
  - **Descripción**: La clave del diccionario a leer, tal como se declara en tus archivos de contenido.
  - **Tipo**: `DictionaryKeys`, una unión de todas las claves de diccionario declaradas.
  - **Requerido**: Sí

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Descripción**: La locale con la que interpretar el contenido, o un objeto selector para [diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md).
    - `'fr'`: una locale
    - `{ item: 2 }`: un elemento de una [colección](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/collections.md) (omite `item` para obtener todos los elementos como un array)
    - `{ variant: 'black-friday' }`: una [variante](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/variants.md) con nombre (omítela para la `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }`: una variante estructurada
    - Cualquier selector puede llevar una locale: `{ item: 2, locale: 'fr' }`
  - **Tipo**: `LocalesValues | DictionarySelector`
  - **Requerido**: No (opcional). Si se omite, consulta [Sin locale](#sin-locale).

- `plugins: Plugins[]`
  - **Descripción**: Transformadores de nodos personalizados que reemplazan los plugins base del intérprete. Solo para uso avanzado; omítelo para conservar el comportamiento por defecto.
  - **Tipo**: `Plugins[]`
  - **Requerido**: No (opcional)

### Retorna

- **Tipo**: El contenido interpretado del diccionario, tipado desde tu declaración.
- **Descripción**: Un objeto plano que refleja el campo `content` de tu diccionario, donde cada nodo de Intlayer ha sido resuelto a su valor final para la locale solicitada.

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

Cuando no se pasa ninguna locale, `getIntlayer` no recurre directamente a la locale por defecto. Resuelve, en orden:

1. **La locale de la solicitud en curso**, en el servidor, cuando una integración de Intlayer la gestiona: los middlewares `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer` y `elysia-intlayer`, los middlewares `remix-intlayer` y `astro-intlayer`, y `IntlayerProvider` / `setLocale` en los React Server Components. Cada solicitud se resuelve a partir de sus propias cookies y headers, así que usuarios simultáneos nunca comparten locale.
2. **La locale almacenada en el navegador** (cookie, `localStorage`, `sessionStorage`), la que persiste un selector de idioma.
3. **La `defaultLocale`** declarada en tu [configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

- [configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Locale de la solicitud, si no la almacenada, si no la locale por defecto
```

La misma resolución se aplica a `getDictionary`, a las llamadas que reescriben los [plugins de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md), y a `useIntlayer` / `useDictionaryDynamic` renderizados fuera de un provider. Una locale pasada explícitamente siempre tiene prioridad.

- [plugins de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md)

> `getIntlayer` no es reactiva: tras un cambio de locale, vuelve a llamarla para leer la nueva locale. En una página renderizada en el servidor, una llamada hecha fuera de cualquier provider renderiza la locale por defecto en el servidor y la locale almacenada en el navegador, lo que puede provocar un error de hidratación. En ese caso, monta el provider de tu framework o pasa la locale.

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

## Notas de Comportamiento

### Caché

Los resultados se memorizan en un caché a nivel de módulo, con clave `key + locale + selector`. Llamar a `getIntlayer("app", "fr")` repetidamente interpreta el diccionario una sola vez y devuelve el mismo objeto después.

### Diccionarios faltantes

En desarrollo, solicitar una clave que no tiene un diccionario generado registra una advertencia una vez y devuelve un proxy de respaldo seguro: leer `content.title` produce la cadena `"app.title"` en lugar de lanzar una excepción. Esto mantiene una página utilizable mientras se corrige la declaración faltante. Ejecuta la compilación de Intlayer (o el servidor de desarrollo) para que se genere el diccionario.

### Tamaño del bundle

`getIntlayer` lee el diccionario fusionado, que contiene **todos** los locales. En bundles del cliente, los [plugins de compilación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) reescriben la llamada para que solo se envíe el contenido requerido. Cuando lees contenido fuera de la renderización (metadatos, loaders, funciones de servidor) y deseas que un único local se cargue bajo demanda, utiliza [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayerAsync.md) en su lugar.

- [plugins de compilación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md)
- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayerAsync.md)

## Funciones Relacionadas

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayerAsync.md)
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getDictionary.md)
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useIntlayer.md)

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
