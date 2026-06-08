---
createdAt: 2026-05-04
updatedAt: 2026-05-04
title: Plural
description: Descubre cómo declarar y utilizar contenido en plural adaptado a la configuración regional (basado en CLDR) en tu sitio web multilingüe. Sigue los pasos de esta documentación en línea para configurar tu proyecto en unos minutos.
keywords:
  - Plural
  - Pluralización
  - CLDR
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - plural
history:
  - version: 8.8.0
    date: 2026-05-04
    changes: "Init history"
---

# Contenido en Plural / El plural en Intlayer

## Cómo funciona el plural

En Intlayer, el contenido en plural se logra a través de la función `plural`, que asigna las categorías de plural de CLDR, `zero`, `one`, `two`, `few`, `many`, `other`, a su contenido correspondiente. La categoría correcta se selecciona automáticamente según la configuración regional activa y un valor de conteo, utilizando la API integrada de la plataforma [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules).

A diferencia de [`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/enumeration.md), que selecciona contenido según rangos numéricos que tú mismo defines, `plural` delega la selección a las reglas de CLDR. Esto es lo que lo hace escalable a idiomas con reglas de pluralización complejas, como el ruso, el polaco, el árabe o el galés, sin tener que escribir manualmente lógica de módulo.

## Cuándo usar `plural` vs `enu`

| Caso de uso                                                                                                  | Ayudante |
| ------------------------------------------------------------------------------------------------------------ | -------- |
| Formas plurales gramaticales adaptadas a la configuración regional (una manzana / dos manzanas / 5 manzanas) | `plural` |
| Rangos numéricos personalizados (`<5`, `>=10`) o categorías no pertenecientes a CLDR                         | `enu`    |

Si solo te diriges al inglés o español (que solo tienen `one` / `other`), cualquiera de los dos funciona. Para cualquier idioma con distinciones `few` / `many` / `two`, prefiere `plural`.

## Configuración del contenido en plural

Para configurar el contenido en plural en tu proyecto Intlayer, crea un módulo de contenido que utilice el ayudante `plural`. La categoría `other` es obligatoria y se utiliza como respaldo cuando una configuración regional no define una categoría más específica.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      es: plural({
        one: "{{count}} vacante",
        other: "{{count}} vacantes",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "total_openings",
  "content": {
    "totalOpenings": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} opening",
            "other": "{{count}} openings"
          }
        },
        "es": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} vacante",
            "other": "{{count}} vacantes"
          }
        }
      }
    }
  }
}
```

> Las categorías admitidas son `zero`, `one`, `two`, `few`, `many`, `other`. Solo necesitas declarar las categorías que utiliza tu idioma de destino; Intlayer recurre a `other` cuando no coincide ninguna categoría específica.
>
> El marcador de posición `{{count}}` se reemplaza automáticamente con el conteo que pases en runtime. También puedes incluir otros marcadores de posición (consulta [Marcadores de posición personalizados](#custom-placeholders) a continuación).

## Uso de contenido en plural con React Intlayer

Para usar contenido en plural dentro de un componente de React, recupéralo a través del gancho `useIntlayer` y llámalo con un conteo. La configuración regional activa y el conteo se combinan para elegir la categoría CLDR coincidente.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      {/* En inglés:                                   */}
      {/*  count=0  → "0 openings"   (other)           */}
      {/*  count=1  → "1 opening"    (one)             */}
      {/*  count=2  → "2 openings"   (other)           */}
      {/*  count=21 → "21 openings"  (other)           */}
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

Puedes llamar a la función devuelta de dos maneras equivalentes:

```tsx
totalOpenings(21); // forma abreviada: solo conteo
totalOpenings({ count: 21 }); // forma explícita
```

## Marcadores de posición personalizados

Las cadenas en plural pueden incluir marcadores de posición distintos de `{{count}}`. Pásalos en forma de objeto junto con `count`:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      one: "{{name}}, tienes {{count}} mensaje nuevo",
      other: "{{name}}, tienes {{count}} mensajes nuevos",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice, tienes 1 mensaje nuevo"

summary({ count: 7, name: "Alice" });
// → "Alice, tienes 7 mensajes nuevos"
```

## Categorías CLDR de un vistazo

Diferentes idiomas utilizan diferentes subconjuntos de las categorías CLDR. Algunos casos comunes:

| Idioma          | Categorías utilizadas                        |
| --------------- | -------------------------------------------- |
| Inglés (`en`)   | `one`, `other`                               |
| Francés (`fr`)  | `one`, `many`, `other`                       |
| Ruso (`ru`)     | `one`, `few`, `many`, `other`                |
| Polaco (`pl`)   | `one`, `few`, `many`, `other`                |
| Árabe (`ar`)    | `zero`, `one`, `two`, `few`, `many`, `other` |
| Japonés / Chino | solo `other`                                 |

No necesitas memorizar esto: declara las categorías para las que tienes traducciones e Intlayer recurrirá a `other` cuando sea necesario.

## Limitación

A diferencia de otros nodos, el nodo `plural` aún no se puede imbricar con nodos hijos.

Ejemplo:

Válido:

```ts
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      fr: plural({
        one: "{{count}} offre",
        other: "{{count}} offres",
      }),
    }),
```

Inválido:

```ts
totalOpenings: plural({
  one: t({
    en: "{{count}} opening",
    fr: "{{count}} offre",
  }),
  other: t({
    en: "{{count}} openings",
    fr: "{{count}} offres",
  }),
}),
```

## Recursos adicionales

Para obtener información más detallada sobre la configuración y el uso, consulta los siguientes recursos:

- [Documentación de Enumeración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/enumeration.md)
- [Documentación de Inserción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/insertion.md)
- [Documentación de la CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md)
- [Documentación de React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md)
- [Documentación de Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md)

Estos recursos ofrecen más información sobre la configuración y el uso de Intlayer en diversos entornos y marcos.
