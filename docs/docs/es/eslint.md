---
createdAt: 2026-08-12
updatedAt: 2026-08-13
title: Plugin de ESLint | Reglas de lint para Intlayer
description: Detecta cadenas hardcodeadas, llamadas dinámicas que el compilador de Intlayer no puede optimizar y contenido de diccionario sin usar, con eslint-plugin-intlayer. Funciona con ESLint y oxlint, en React, Vue, Svelte, Angular y Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Lint
  - i18n
  - Internacionalización
  - no-raw-text
  - Cadenas hardcodeadas
  - Traducciones sin usar
  - Contenido muerto
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

`eslint-plugin-intlayer` detecta los tipos de error de i18n que TypeScript no puede ver:

1. **Texto hardcodeado** que nunca llegó a un diccionario.
2. **Llamadas dinámicas** que pasan el chequeo de tipos y se ejecutan, pero que el compilador de Intlayer no puede optimizar.
3. **Contenido muerto** — diccionarios y campos que nada en el proyecto lee (opcional mediante activación).

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

Requiere ESLint 9 o posterior (flat config). ESLint 10 es compatible.

## Uso

El plugin funciona tanto en ESLint como en [oxlint](https://oxc.rs): las mismas reglas, las mismas opciones.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

O expande una configuración y define tú mismo las severidades:

```javascript fileName="eslint.config.mjs"
import intlayer from "eslint-plugin-intlayer";

export default [
  ...intlayer.configs.recommended,
  {
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
      "intlayer/no-unused-content": "warn",
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

Dos advertencias: el soporte de plugins JS en oxlint aún está en fase alfa, y oxlint no admite parsers personalizados; por lo tanto, los archivos `.vue`, `.svelte`, `.astro` y las plantillas de Angular no se analizan allí. Ejecuta oxlint sobre tus archivos JS/TS/JSX y mantén ESLint para el resto.

`no-unused-content` se omite intencionadamente arriba: necesita el directorio de trabajo y la ruta del archivo analizado del contexto de la regla, lo cual el puente alfa de plugins JS no garantiza. Ejecútala bajo ESLint.

  </Tab>
</Tabs>

### Configuraciones

| Configuración   | `no-raw-text`                    | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | -------------------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                             | error                   | error                     | off                      | off                 |
| `strict`        | error (+ literales fuera de JSX) | error                   | error                     | error                    | off                 |
| `contract-only` | off                              | error                   | error                     | off                      | off                 |

`recommended` mantiene deliberadamente `no-raw-text` en `warn`: apuntarla a una base de código existente detecta todas las cadenas no traducidas de golpe, lo cual no debería romper tu compilación desde el primer día.

`enforce-adapter-import` está desactivada por defecto — actívala explícitamente si la deseas.

`no-unused-content` está desactivada en todas las configuraciones, incluida `strict`. Es la única regla que lee tu configuración de Intlayer y recorre tus archivos fuente desde el disco, por lo que activarla debe ser una elección deliberada en lugar de algo que un ajuste preestablecido haga por ti.

## Reglas

### `no-raw-text`

Informa sobre el texto orientado al usuario que no está declarado en un diccionario. Utiliza la misma detección que `intlayer extract`, por lo que se ignoran nombres de marcas, clases CSS e identificadores técnicos.

```jsx
// ✗ Reportado
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Correcto
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Los archivos de declaración de contenido (`*.content.ts`, …) se ignoran.

Para corregir un archivo completo de una vez, ejecuta `npx intlayer extract` y deja que el compilador mueva las cadenas a un diccionario por ti.

**Opciones**

```javascript fileName="eslint.config.mjs"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Atributos cuyo valor es texto orientado al usuario.
      // Por defecto: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Elementos cuyo contenido nunca es texto orientado al usuario.
      // Por defecto: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Expresiones regulares para texto que nunca se debe reportar.
      ignorePatterns: ["^Powered by"],

      // También reportar literales de cadena fuera del marcado. Por defecto: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Requiere que la clave del diccionario sea un literal de cadena.

El compilador solo puede precargar un diccionario cuando puede leer la clave directamente en el punto de llamada. Con una clave calculada, omite silenciosamente la optimización e incluye todos los diccionarios en el empaquetado.

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

Esto se aplica a `useIntlayer`, `getIntlayer` y a todos los adaptadores de compatibilidad (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Requiere que el campo que lees de un diccionario sea conocido estáticamente.

El compilador elimina los campos que no ve utilizados. Un acceso dinámico le resulta invisible, por lo que la lectura puede devolver `undefined` en tiempo de ejecución.

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

Prefiere el adaptador de compatibilidad `@intlayer/*` sobre el paquete original. El original solo se resuelve a Intlayer cuando el alias del empaquetador está configurado; el adaptador siempre lo hace. Corregible automáticamente con `--fix`.

```typescript
// ✗ Reportado
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Correcto
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**Desactivada por defecto.** Informa sobre contenido que nada en tu proyecto lee, además de claves de diccionario declaradas en más de un lugar.

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ Reportado si ninguna llamada en el proyecto solicita "home"
  content: {
    title: t({ es: "Título", en: "Title" }),

    // ✗ Reportado si nada lee `hero`
    hero: {
      subtitle: t({ es: "Subtítulo", en: "Subtitle" }),
    },
  },
};
```

A diferencia de las otras reglas, esta no puede responder solo a partir del archivo evaluado: un campo no se usa únicamente en relación con todo el proyecto. En la primera declaración de contenido de una ejecución de lint, carga tu configuración de Intlayer, busca los archivos fuente que declara dicha configuración (`build.traversePattern`, `compiler.transformPattern`) y ejecuta el mismo analizador de uso que alimenta `@intlayer/lsp` y el tachado de "no utilizado" en la extensión de VS Code. El resultado se almacena en caché durante `cacheTtl` milisegundos, por lo que el escaneo ocurre una vez por ejecución en lugar de una vez por archivo.

**Opciones**

```javascript fileName="eslint.config.mjs"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // Reportar claves de diccionario que nada referencia. Por defecto: true
      reportUnusedDictionaries: true,

      // Reportar campos de contenido que nada lee. Por defecto: true
      reportUnusedFields: true,

      // Reportar claves declaradas en más de un lugar. Por defecto: true
      reportDuplicateKeys: true,

      // Expresiones regulares para rutas de campos que nunca se deben reportar.
      ignoreFields: ["^meta"],

      // Raíz del proyecto desde donde comienza el escaneo. Por defecto: directorio de trabajo de ESLint
      baseDir: process.cwd(),

      // Tiempo que se reutiliza un escaneo de proyecto, en ms. Por defecto: 30000
      cacheTtl: 30000,
    },
  ],
}
```

Reduce `cacheTtl` cuando ejecutes lint desde un servidor de editor de larga duración y quieras que tus ediciones se reflejen antes; configura `baseDir` cuando una sola ejecución de lint abarque varios proyectos de Intlayer en un monorepo.

> **Tiende al silencio.** Un falso positivo aquí eliminaría una traducción, por lo que no se reporta nada cuando el diccionario se consume de una manera que el análisis no puede rastrear: el objeto de contenido pasado en su totalidad, una función de traducción vinculada a partir de él (`const t = useTranslations("home")`), una declaración alcanzada mediante una importación directa (`useDictionary(myDictionary)`), un `nest()` de otro diccionario, o una lista de campos hecha no exhaustiva por un spread. Los componentes de un solo archivo (`.vue`, `.svelte`, `.astro`) se consideran como si usaran cada campo de los diccionarios que mencionan, ya que sus bloques de script no se analizan aquí.

`reportDuplicateKeys` lee los diccionarios no fusionados que la compilación escribe bajo `.intlayer/`, por lo que permanece silenciosa hasta que el proyecto se haya compilado al menos una vez. Dos declaraciones que comparten una clave se fusionan, lo cual es un patrón legítimo; el reporte existe porque un campo definido en ambos lados conserva silenciosamente solo uno de los dos valores.

El analizador se carga desde `@intlayer/lsp`, que se distribuye como ESM. Por lo tanto, la regla necesita una versión de Node que pueda hacer `require()` de un módulo ES: Node 20.19+ o 22.12+. En versiones anteriores no reporta nada en lugar de fallar la ejecución del lint.

## Frameworks

Todas las reglas funcionan en todas las integraciones de Intlayer, incluso dentro de plantillas de Vue, Svelte y Angular. Solo necesitas indicarle a ESLint qué parser lee cada tipo de archivo.

| Framework                 | Archivos          | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Plantillas de Angular     | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs"
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

> **Limitación conocida.** En plantillas de Vue y Angular, una expresión como `{{ content[key] }}` no se verifica con `no-dynamic-field-access`. Las lecturas dinámicas escritas en el bloque script se detectan normalmente.
