---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Documentación de la función getDictionary | intlayer
description: Consulta cómo usar la función getDictionary para el paquete intlayer
keywords:
  - getDictionary
  - dictionary
  - interpreter
  - content
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
  - getDictionary
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentación: Función `getDictionary` en `intlayer`

## Descripción

La función `getDictionary` interpreta un objeto de diccionario **que tú mismo pasas** y devuelve su contenido resuelto para una locale determinada. Recorre el contenido en una sola pasada y aplica cada plugin intérprete según sea necesario, resolviendo traducciones `t()`, enumeraciones, condiciones, inserciones, anidamiento, markdown, HTML y nodos de archivo.

A diferencia de [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayer.md), que busca un diccionario por clave en el registro generado, `getDictionary` toma el diccionario en sí. Esto la convierte en la herramienta correcta para contenido construido en tiempo de ejecución, obtenido de una API o CMS, o declarado en línea en una prueba.

**Características principales:**

- Funciona con cualquier objeto que siga la estructura del diccionario (`{ key, content }`)
- También acepta un grupo de diccionario calificado (colecciones, variantes) junto con un selector
- Totalmente tipado: el objeto devuelto refleja el `content` que pasaste
- Acepta plugins intérpretes personalizados

---

## Firma de Función

```typescript
getDictionary(
  dictionary: Dictionary | QualifiedDictionaryGroup, // Requerido
  localeOrSelector?: LocalesValues | DictionarySelector, // Opcional
  plugins?: Plugins[]                                // Opcional
): DeepTransformContent<...>
```

---

## Parámetros

- `dictionary: Dictionary | QualifiedDictionaryGroup`
  - **Description**: El diccionario (o grupo de diccionario calificado) a interpretar.
  - **Type**: `Dictionary | QualifiedDictionaryGroup`
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: La locale para interpretar el contenido, o un objeto selector (`{ item }`, `{ variant }`, opcionalmente con `locale`). Ver [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md).
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Un array de transformadores de nodos que definen cómo se interpretan los nodos reconocidos. Si se omite, se utiliza el conjunto predeterminado de plugins de intérprete.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Retorna

- **Type**: El contenido interpretado del diccionario.
- **Description**: El `content` que pasaste, con cada nodo de Intlayer resuelto para la locale solicitada. Para un grupo de colección sin un selector `item`, se devuelve una matriz ordenada de entradas interpretadas; `null` se devuelve cuando el selector no apunta a nada.

---

## Ejemplo de uso

### Uso Básico

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionary, t } from "intlayer";

const content = getDictionary(
  {
    key: "my_key",
    content: {
      greeting: t({
        es: "Hola",
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  },
  "fr"
);

console.log(content.greeting); // "Bonjour"
```

### Interpretación de contenido obtenido en tiempo de ejecución

```typescript
import { getDictionary, type Dictionary } from "intlayer";

const remoteDictionary: Dictionary = await fetch("/api/cms/banner").then(
  (res) => res.json()
);

const banner = getDictionary(remoteDictionary, "fr");
```

### Con un selector

```typescript
import { getDictionary } from "intlayer";

// Un grupo de diccionario calificado se resuelve en una única entrada…
const secondItem = getDictionary(blogPostGroup, { item: 2, locale: "fr" });

// …o en un array ordenado cuando no se proporciona `item`
const allItems = getDictionary(blogPostGroup, { locale: "fr" });
```

---

## Funciones Relacionadas

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getIntlayer.md): Misma interpretación, pero el diccionario se busca por clave en el registro generado.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getDictionaryAsync.md): Contraparte para mapas de cargadores por locale.
- [`useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useDictionary.md): El equivalente del hook de React, leyendo el locale del proveedor.

---

## TypeScript

```typescript
function getDictionary<
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
