---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Plugin de Prettier | Ordenar traducciones de Intlayer
description: "Ordena las locales de t(), las categorías de plural(), las condiciones de enu(), los casos de select() y las claves de tus declaraciones de contenido con prettier-plugin-intlayer."
keywords:
  - Intlayer
  - Prettier
  - Formateo
  - Ordenar traducciones
  - Ordenar locales
  - i18n
  - Internacionalización
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "Historial inicial"
author: aymericzip
---

# Plugin de Prettier

`prettier-plugin-intlayer` organiza las claves de tus traducciones en un orden fijo cada vez que Prettier formatea un archivo. Las diferencias (diffs) se mantienen pequeñas, los conflictos de fusión se vuelven más raros y una locale faltante resulta fácil de detectar.

```ts
// antes
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// después
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Instalación

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

Requiere Prettier 3 o superior.

Si tu proyecto ya utiliza Prettier, `intlayer init prettier` instala el plugin y lo añade a tu configuración por ti.

## Uso

Añade el plugin a tu configuración de Prettier:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

Para aplicarlo únicamente a tus declaraciones de contenido, utiliza una regla de anulación (override):

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

## Qué se ordena

### `t()`: locales

Las locales fijadas aparecen primero (`en` por defecto). Las demás locales siguen en orden alfabético.

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()`: orden CLDR

Las categorías van desde la cantidad más pequeña hasta la alternativa (fallback): `zero`, `one`, `two`, `few`, `many`, `other`.

```ts
plural({
  one: "{{count}} вакансия",
  few: "{{count}} вакансии",
  many: "{{count}} вакансий",
  other: "{{count}} вакансий",
});
```

### `enu()`: umbrales ascendentes

Las condiciones se ordenan según su número y luego por operador (`<1`, `<=1`, `1`, `>=1`, `>1`). `fallback` va al final.

```ts
enu({
  "<-1": "Menos de menos un auto",
  "0": "Ningún auto",
  "2": "Dos autos",
  ">=3": "Muchos autos",
  fallback: "Algunos autos",
});
```

En tiempo de ejecución, prevalece la primera condición coincidente. El plugin aplica el nuevo orden únicamente cuando cada cantidad sigue resolviendo al mismo contenido. Cuando el orden decide el resultado, el objeto se deja tal como se escribió. Por ejemplo, en `{ '<1': …, '<=-2.3': … }` la clave `'<1'` captura todo número negativo.

### `select()`: alfabético

Los casos se ordenan alfabéticamente y `fallback` se coloca al final.

```ts
select({
  draft: "Esta publicación es un borrador",
  published: "Esta publicación está publicada",
  scheduled: "Esta publicación está programada",
  fallback: "Estado desconocido",
});
```

Sin una clave `fallback` o `other`, el último caso se utiliza como respaldo. Ese caso permanece al final y solo se ordenan los casos que lo preceden.

### Archivos `.content.json`

La forma serializada se ordena de la misma manera: `{ "nodeType": "translation", "translation": { … } }`, así como los nodos `plural`, `enumeration` y `select`.

### Claves de contenido (opcional)

Con `intlayerSortContentKeys: true`, el plugin también ordena las claves de `content` del diccionario alfabéticamente en cada nivel de anidamiento. Esto solo se aplica en archivos `*.content.*`.

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

El ordenamiento continúa a través de cada asistente (`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…) para acceder a los objetos dentro de ellos. La estructura interna de cada asistente conserva su orden. Las claves pasadas a `cond()` y `gender()` nunca se reordenan, ya que su última clave funciona como fallback. Los campos adyacentes a `content` (`key`, `title`, `locale`…) se mantienen intactos.

## Opciones

| Opción                    | Predeterminado | Descripción                                                                                           |
| ------------------------- | -------------- | ----------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`   | `["en"]`       | Locales que se mantienen primero en `t()`, en este orden. Pasa `[]` para ordenar todas las locales.   |
| `intlayerSortContentKeys` | `false`        | En archivos `*.content.*`, también ordena las claves de contenido del diccionario y objetos anidados. |

## Qué se deja sin cambios

- Objetos que contienen una propagación (`...base`), una clave calculada (`[key]`), un método o una clave duplicada.
- Asignaciones `plural()` con una clave que no pertenezca a las categorías CLDR.
- Asignaciones `enu()` cuyo nuevo orden cambiaría el contenido resuelto.
- Llamadas a cualquier otra función con un nombre coincidente con el de un asistente pero que reciba un argumento que no sea un objeto.

Los comentarios se mueven junto con la clave a la que pertenecen.

## Parsers compatibles

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` y `jsonc`. Los bloques `<script>` de archivos Vue, Svelte y Astro se formatean con estos parsers.

> **Limitación conocida.** Prettier ejecuta un único plugin por parser. Si otro plugin también reemplaza los parsers de JavaScript/TypeScript (por ejemplo `prettier-plugin-tailwindcss`), solo el último listado se aplicará a esos archivos. Limita `prettier-plugin-intlayer` a archivos `*.content.*` mediante un override para evitar el conflicto.
