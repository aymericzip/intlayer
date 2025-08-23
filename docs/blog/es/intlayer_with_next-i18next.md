---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Intlayer y next-i18next
description: Integra Intlayer con next-i18next para una aplicación Next.js
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Internacionalización
  - Blogumentación
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
---

# Next.js Internacionalización (i18n) con next-i18next y Intlayer

Tanto next-i18next como Intlayer son frameworks de internacionalización (i18n) de código abierto diseñados para aplicaciones de Next.js. Son ampliamente utilizados para gestionar traducciones, localización y cambio de idioma en proyectos de software.

Ambas soluciones incluyen tres nociones principales:

1. **Declaración de Contenido**: El método para definir el contenido traducible de tu aplicación.
   - Nombrado `resource` en el caso de `i18next`, la declaración de contenido es un objeto JSON estructurado que contiene pares clave-valor para traducciones en uno o varios idiomas. Consulta la [documentación de i18next](https://www.i18next.com/translation-function/essentials) para más información.
   - Nombrado `archivo de declaración de contenido` en el caso de `Intlayer`, la declaración de contenido puede ser un archivo JSON, JS o TS que exporta los datos estructurados. Consulta la [documentación de Intlayer](https://intlayer.org/fr/doc/concept/content) para más información.

2. **Utilidades**: Herramientas para construir e interpretar declaraciones de contenido en la aplicación, como `getI18n()`, `useCurrentLocale()`, o `useChangeLocale()` para next-i18next, y `useIntlayer()` o `useLocale()` para Intlayer.

3. **Plugins y Middleware**: Características para gestionar la redirección de URL, optimización de empaquetado, y más, como `next-i18next/middleware` para next-i18next o `intlayerMiddleware` para Intlayer.

## Intlayer vs. i18next: Principales Diferencias

Para explorar las diferencias entre i18next e Intlayer, consulta nuestra publicación de blog [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18next_vs_next-intl_vs_intlayer.md).

## Cómo Generar Diccionarios de next-i18next con Intlayer

### ¿Por qué Usar Intlayer con next-i18next?

Los archivos de declaración de contenido de Intlayer generalmente ofrecen una mejor experiencia de desarrollador. Son más flexibles y mantenibles debido a dos ventajas principales:

1. **Colocación Flexible**: Un archivo de declaración de contenido de Intlayer se puede colocar en cualquier lugar del árbol de archivos de la aplicación, simplificando la gestión de componentes duplicados o eliminados sin dejar declaraciones de contenido no utilizadas.

   Ejemplos de estructuras de archivos:

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # Archivo de declaración de contenido
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # Archivo de declaración de contenido
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # Archivo de declaración de contenido
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # Archivo de declaración de contenido
               └── index.jsx
   ```

2. **Traducciones Centralizadas**: Intlayer almacena todas las traducciones en un solo archivo, asegurando que no falte ninguna traducción. Al usar TypeScript, las traducciones faltantes se detectan automáticamente y se informan como errores.

### Instalación

```bash packageManager="npm"
npm install intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add intlayer i18next next-i18next i18next-resources-to-backend
```

### Configurando Intlayer para Exportar Diccionarios de i18next

> La exportación de recursos de i18next no asegura una compatibilidad 1:1 con otros frameworks. Se recomienda adherirse a una configuración basada en Intlayer para minimizar problemas.

Para exportar recursos de i18next, configura Intlayer en un archivo `intlayer.config.ts`. Ejemplos de configuraciones:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

Aquí está la continuación y corrección de las partes restantes de tu documento:

---

### Importando Diccionarios en tu Configuración de i18next

Para importar los recursos generados en tu configuración de i18next, utiliza `i18next-resources-to-backend`. A continuación se muestran ejemplos:

```typescript fileName="i18n/client.ts" codeFormat="typescript"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language: string, namespace: string) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

### Declaración de Contenido

Ejemplos de archivos de declaración de contenido en varios formatos:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-content",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### Construye los Recursos de next-i18next

Para construir los recursos de next-i18next, ejecuta el siguiente comando:

```bash packageManager="npm"
npx run intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Esto generará recursos en el directorio `./i18next/resources`. La salida esperada:

```bash
.
└── i18next
    └── resources
       └── en
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

Nota: El espacio de nombres de i18next corresponde a la clave de declaración de Intlayer.

### Implementar el Plugin de Next.js

Una vez configurado, implementa el plugin de Next.js para reconstruir tus recursos de i18next cada vez que los archivos de declaración de contenido de Intlayer se actualicen.

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Usando Contenido en Componentes de Next.js

Después de implementar el plugin de Next.js, puedes usar el contenido en tus componentes:

```typescript fileName="src/components/myComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

const IndexPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};

export default IndexPage;
```

```jsx fileName="src/components/myComponent/index.mjx" codeFormat="esm"
import { useTranslation } from "react-i18next";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```

```jsx fileName="src/components/myComponent/index.cjx" codeFormat="commonjs"
const { useTranslation } = require("react-i18next");

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```
