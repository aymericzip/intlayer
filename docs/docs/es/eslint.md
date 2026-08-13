---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: Plugin de ESLint | Reglas de lint para Intlayer
description: Detecta cadenas hardcodeadas y llamadas dinámicas que el compilador de Intlayer no puede optimizar, con eslint-plugin-intlayer. Funciona con ESLint y oxlint, en React, Vue, Svelte, Angular y Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Lint
  - i18n
  - Internacionalización
  - no-raw-text
  - Cadenas hardcodeadas
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "Historial inicial"
author: aymericzip
---

# Plugin de ESLint x OXLint

`eslint-plugin-intlayer` detecta los dos tipos de error de i18n que TypeScript no puede ver:

1. **Texto hardcodeado** que nunca llegó a un diccionario.
2. **Llamadas dinámicas** que pasan el chequeo de tipos y se ejecutan, pero que el compilador de Intlayer no puede optimizar.

Las claves de diccionario desconocidas, las rutas de campo desconocidas y las locales faltantes ya son errores de compilación, así que el plugin no las repite.

## Instalación

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

Requiere ESLint 9 o posterior (flat config).

## Uso

El plugin funciona tanto en ESLint como en [oxlint](https://oxc.rs): las mismas reglas, las mismas opciones.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

O habilita las reglas una por una:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  {
    plugins: { intlayer },
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

Dos advertencias: el soporte de plugins JS de oxlint sigue en alpha, y oxlint no soporta parsers personalizados — así que los archivos `.vue`, `.svelte`, `.astro` y los templates de Angular no se analizan allí. Ejecuta oxlint sobre tus archivos JS/TS/JSX y mantén ESLint para el resto.

  </Tab>
</Tabs>

### Configuraciones

| Configuración   | `no-raw-text`                    | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | -------------------------------- | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                             | error                   | error                     | off                      |
| `strict`        | error (+ literales fuera de JSX) | error                   | error                     | error                    |
| `contract-only` | off                              | error                   | error                     | off                      |

`recommended` mantiene `no-raw-text` en `warn` a propósito: apuntarlo a una codebase existente hace aflorar todas las cadenas sin traducir de golpe, lo que no debería romper tu build el primer día.

`enforce-adapter-import` está desactivada por defecto — actívala explícitamente si la quieres.

## Reglas

### `no-raw-text`

Reporta el texto dirigido al usuario que no está declarado en un diccionario. Usa la misma detección que `intlayer extract`, así que los nombres de marca, las clases CSS y los identificadores técnicos se ignoran.

```jsx
// ✗ Reportado
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Correcto
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Los archivos de declaración de contenido (`*.content.ts`, …) se omiten.

Para corregir un archivo entero de una vez, ejecuta `npx intlayer extract` y deja que el compilador mueva las cadenas a un diccionario por ti.

**Opciones**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Atributos cuyo valor es texto dirigido al usuario.
      // Por defecto: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Elementos cuyo contenido nunca es texto dirigido al usuario.
      // Por defecto: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Expresiones regulares para texto que nunca debe reportarse.
      ignorePatterns: ["^Powered by"],

      // Reportar también literales de cadena fuera del markup. Por defecto: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Exige que la clave de diccionario sea un literal de cadena.

El compilador solo puede precargar un diccionario cuando puede leer la clave directamente en el sitio de la llamada. Con una clave computada omite silenciosamente la optimización y empaqueta todos los diccionarios.

```typescript
// ✗ Reportado
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Una variable sigue sin ser un literal
const key = "home";
useIntlayer(key);

// ✓ Correcto
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Esto aplica a `useIntlayer`, `getIntlayer` y a cada adaptador compat (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Exige que el campo que lees de un diccionario sea conocido estáticamente.

El compilador elimina los campos cuyo uso no ve. Un acceso computado le resulta invisible, por lo que la lectura puede devolver `undefined` en tiempo de ejecución.

```typescript
// ✗ Reportado
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Correcto
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Prefiere el adaptador compat `@intlayer/*` frente al paquete original. El original solo resuelve a Intlayer cuando el alias del bundler está configurado; el adaptador siempre lo hace. Corregible automáticamente con `--fix`.

```typescript
// ✗ Reportado
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Correcto
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## Frameworks

Todas las reglas funcionan en todas las integraciones de Intlayer, incluso dentro de los templates de Vue, Svelte y Angular. Solo necesitas indicarle a ESLint qué parser lee cada tipo de archivo.

| Framework                 | Archivos          | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Templates de Angular      | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

Instala solo los parsers que tu proyecto necesite.

> **Limitación conocida.** En los templates de Vue y Angular, una expresión como `{{ content[key] }}` no es comprobada por `no-dynamic-field-access`. Las lecturas dinámicas escritas en el bloque de script se detectan con normalidad.
