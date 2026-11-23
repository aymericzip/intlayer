---
createdAt: 2026-11-03
updatedAt: 2026-11-22
priority: 6
title: Plugin Prettier x Oxfmt | Ordenar traducciones Intlayer y corregir .value
description: "Ordena los locales de t(), plural(), enu() y select() en tus declaraciones de contenido, y añade .value donde el contenido se usa como string para mantener los tipos con el editor visual. Compatible con Prettier y oxfmt."
keywords:
  - Intlayer
  - Prettier
  - oxfmt
  - Formateo
  - Ordenar traducciones
  - Ordenar locales
  - i18n
  - Internacionalización
  - plural
  - enumeration
  - select
  - Editor visual
  - IntlayerNode
slugs:
  - doc
  - prettier
history:
  - version: 9.8.5
    date: 2026-11-22
    changes: "Añadida la reescritura .value para contenido usado como string"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Historial inicial"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Añadido el uso con oxfmt"
author: aymericzip
---

# Plugin de Prettier x Oxfmt

`prettier-plugin-intlayer` hace dos cosas cada vez que Prettier formatea un archivo:

1. **Ordena tus traducciones** en un orden fijo. Los diffs siguen siendo pequeños, los conflictos de merge son menos frecuentes y un locale ausente se detecta fácilmente.
2. **Añade `.value`** donde el contenido se usa como string, para que tus tipos sigan siendo válidos al activar el editor visual.

```ts
// antes
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// después
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Instalación

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

```bash packageManager="npm"
npm install --save-dev prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier-plugin-intlayer
```

Requiere Prettier 3 o superior.

Si tu proyecto ya utiliza Prettier, `intlayer init prettier` instala el plugin y lo añade a tu configuración por ti.

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt no puede cargar plugins de terceros, así que la ordenación pasa por Prettier. Instala Prettier junto a oxfmt. Solo se usa para ordenar tus declaraciones de contenido; oxfmt sigue formateando tu proyecto.

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

Requiere Prettier 3 o superior. `intlayer init` solo configura el plugin en proyectos que ya usan Prettier, así que configúralo a mano como se muestra a continuación.

  </Tab>
</Tabs>

## Uso

El plugin funciona con Prettier y con [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

Añade el plugin a tu configuración de Prettier:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

Para ordenar solo tus declaraciones de contenido, usa un override. La reescritura `.value` deja entonces de aplicarse a tus componentes:

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

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

El script de formateo ejecuta dos herramientas, cada una con una sola tarea:

1. **Prettier** ejecuta el plugin. El primer glob ordena tus declaraciones de contenido, el segundo añade `.value` en tus componentes. Elimina el segundo glob si solo quieres ordenar.
2. **oxfmt** formatea todo el proyecto, incluidas las declaraciones de contenido.

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" \"src/**/*.{ts,tsx,js,jsx}\" && oxfmt"
  }
}
```

Mantén este orden. oxfmt sustituye el formato escrito por Prettier por el suyo, pero nunca reordena las claves de los objetos, así que el orden se conserva.

Esta configuración tiene algunos límites:

- **Formatear al guardar.** Un editor que formatea con oxfmt no ejecuta el plugin. Ejecuta el script `format` en su lugar.
- **Modo check.** No uses `prettier --check` en archivos formateados por oxfmt: el formato difiere, así que señala todos los archivos. Para comprobar el orden en CI, ejecuta el script `format` y haz fallar el job si hay cambios:

```bash
npm run format && git diff --exit-code
```

  </Tab>
</Tabs>

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
  zero: "No jobs",
  one: "{{count}} job",
  other: "{{count}} jobs",
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

### Traducciones idénticas

En los archivos `*.content.*`, un `t()` cuyas locales contienen todas la misma cadena se sustituye por esa cadena. Una cadena simple se sirve a todas las locales, así que el resultado no cambia.

```ts
// antes
nextjs: t({ en: "Next.js", fr: "Next.js", es: "Next.js" }),

// después
nextjs: "Next.js",
```

Se conserva un `t()` con una sola locale, un argumento de tipo (`t<string>()`), un comentario o valores que no son cadenas. Usa `intlayerCollapseIdenticalTranslations: false` para desactivarlo.

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

## Contenido usado como string

Con el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) activado (`editor.enabled: true`), un campo devuelto por `useIntlayer` o `getIntlayer` es un nodo renderizable, no un string. Pasarlo a un atributo de un elemento nativo o llamar a un método de string sobre él ya no compila. Los template literals, la concatenación y `String()` aceptan cualquier tipo y se mantienen igual. El plugin añade `.value`, que contiene el string esté o no activado el editor.

```tsx
// antes
const content = useIntlayer("home");
const upper = content.name.toUpperCase();
<img alt={content.alt} />;
<h1>{content.title.value}</h1>;

// después
const upper = content.name.value.toUpperCase();
<img alt={content.alt.value} />;
<h1>{content.title}</h1>;
```

Se reescriben:

- métodos de string: `content.name.toUpperCase()`
- atributos de elementos nativos: `<img alt={content.alt} />`

Se dejan intactos, porque aceptan un nodo:

- hijos JSX: `<h1>{content.title}</h1>`
- props de componente: `<Card title={content.title} />`
- tagged templates: `` html`<h1>${content.title}</h1>` `` (Lit)

Esto afecta a los componentes, no a las declaraciones de contenido, así que el plugin debe ejecutarse sobre tus archivos de componentes. Una variable cuyo nombre se declara de nuevo en otra parte del archivo se omite. Las plantillas de Vue y Svelte no se reescriben: usa para ellas la [regla ESLint `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md), que también tiene autofix.

También elimina `.value` de un hijo JSX: `<h1>{content.title.value}</h1>` pasa a ser `<h1>{content.title}</h1>`, para que el editor visual pueda seleccionar el texto. Se aplica a React, Next.js, Preact, Solid y React Native.

Desactívalo con `intlayerNodeValueAccess: false`.

## Opciones

| Opción                                  | Predeterminado | Descripción                                                                                                     |
| --------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`                 | `["en"]`       | Locales que se mantienen primero en `t()`, en este orden. Pasa `[]` para ordenar todas las locales.             |
| `intlayerSortContentKeys`               | `false`        | En archivos `*.content.*`, también ordena las claves de contenido del diccionario y objetos anidados.           |
| `intlayerCollapseIdenticalTranslations` | `true`         | En los archivos `*.content.*`, sustituye un `t()` cuyas locales contienen todas la misma cadena por esa cadena. |
| `intlayerNodeValueAccess`               | `true`         | Añade `.value` donde el contenido se usa como string (`alt={content.alt}`, `content.name.toUpperCase()`).       |

## Qué se deja sin cambios

- Objetos que contienen una propagación (`...base`), una clave calculada (`[key]`), un método o una clave duplicada.
- Asignaciones `plural()` con una clave que no pertenezca a las categorías CLDR.
- Asignaciones `enu()` cuyo nuevo orden cambiaría el contenido resuelto.
- Llamadas a cualquier otra función con un nombre coincidente con el de un asistente pero que reciba un argumento que no sea un objeto.

Los comentarios se mueven junto con la clave a la que pertenecen.

## Parsers compatibles

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` y `jsonc`. Los bloques `<script>` de archivos Vue, Svelte y Astro se formatean con estos parsers.

> **Limitación conocida.** Prettier ejecuta un único plugin por parser. Si otro plugin también reemplaza los parsers de JavaScript/TypeScript (por ejemplo `prettier-plugin-tailwindcss`), solo el último listado se aplicará a esos archivos. Limita `prettier-plugin-intlayer` a archivos `*.content.*` mediante un override para evitar el conflicto. Con oxfmt, las clases de Tailwind se ordenan con su opción integrada `sortTailwindcss`, así que este conflicto no aplica. En ese caso, usa la [regla ESLint `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md) para `.value` en los componentes.
