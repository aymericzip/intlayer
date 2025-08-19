---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación del Paquete | next-intlayer
description: Vea cómo usar el paquete next-intlayer
keywords:
  - Intlayer
  - next-intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
---

# next-intlayer: Paquete NPM para internacionalizar (i18n) una aplicación Next.js

**Intlayer** es un conjunto de paquetes diseñados específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, Next.js y Express.js.

**El paquete `next-intlayer`** te permite internacionalizar tu aplicación Next.js. Proporciona proveedores de contexto y hooks para la internacionalización en Next.js. Además, incluye el plugin de Next.js para integrar Intlayer con [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), así como middleware para detectar la configuración regional preferida del usuario, gestionar cookies y manejar la redirección de URLs.

## ¿Por qué internacionalizar tu aplicación Next.js?

Internacionalizar tu aplicación Next.js es esencial para atender eficazmente a una audiencia global. Permite que tu aplicación entregue contenido y mensajes en el idioma preferido de cada usuario. Esta capacidad mejora la experiencia del usuario y amplía el alcance de tu aplicación al hacerla más accesible y relevante para personas de diferentes orígenes lingüísticos.

## ¿Por qué integrar Intlayer?

- **Gestión de contenido impulsada por JavaScript**: Aprovecha la flexibilidad de JavaScript para definir y gestionar tu contenido de manera eficiente.
- **Entorno con tipado seguro**: Utiliza TypeScript para garantizar que todas tus definiciones de contenido sean precisas y libres de errores.
- **Archivos de contenido integrados**: Mantén tus traducciones cerca de sus respectivos componentes, mejorando la mantenibilidad y claridad.

## Instalación

Instala el paquete necesario usando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install next-intlayer
```

```bash packageManager="yarn"
yarn add next-intlayer
```

```bash packageManager="pnpm"
pnpm add next-intlayer
```

## Ejemplo de uso

Con Intlayer, puedes declarar tu contenido de manera estructurada en cualquier parte de tu base de código.

Por defecto, Intlayer busca archivos con la extensión `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> Puedes modificar la extensión por defecto configurando la propiedad `contentDir` en el [archivo de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.ts
        │   └── index.tsx
        └── ServerComponent
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.mjs
        │   └── index.mjx
        └── ServerComponent
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.cjs
        │   └── index.cjx
        └── ServerComponent
            ├── index.content.cjs
            └── index.cjx
```

### Declara tu contenido

`next-intlayer` está diseñado para funcionar con el paquete [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/index.md). `intlayer` es un paquete que te permite declarar tu contenido en cualquier parte de tu código. Convierte las declaraciones de contenido multilingüe en diccionarios estructurados que se integran perfectamente en tu aplicación.

Aquí tienes un ejemplo de declaración de contenido:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    numberOfCar: enu({
      "<-1": "Menos que menos un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
  },
};

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    numberOfCar: enu({
      "<-1": "Menos que menos un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
  },
};

module.exports = clientComponentContent;
```

```json fileName="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Menos que menos un coche",
        "-1": "Menos un coche",
        "0": "Sin coches",
        "1": "Un coche",
        ">5": "Algunos coches",
        ">19": "Muchos coches"
      }
    }
  }
}
```

### Utiliza el contenido en tu código

Una vez que hayas declarado tu contenido, puedes usarlo en tu código. Aquí tienes un ejemplo de cómo usar el contenido en un componente React:

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Crear declaración de contenido relacionada

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Crear declaración de contenido relacionada

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Crear declaración de contenido relacionada

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Dominando la internacionalización de tu aplicación Next.js

Intlayer ofrece muchas funcionalidades para ayudarte a internacionalizar tu aplicación Next.js. Aquí están algunas de las características clave:

- **Internacionalización de componentes del servidor**: Intlayer te permite internacionalizar tus componentes del servidor de la misma manera que tus componentes del cliente. Esto significa que puedes usar las mismas declaraciones de contenido para ambos, componentes del cliente y del servidor.
- **Middleware para la detección de la configuración regional**: Intlayer proporciona un middleware para detectar la configuración regional preferida del usuario. Este middleware se utiliza para detectar la configuración regional preferida del usuario y redirigirlo a la URL apropiada según lo especificado en la [configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).
- **Internacionalización de metadatos**: Intlayer ofrece una forma de internacionalizar tus metadatos, como el título de tu página, utilizando la función `generateMetadata` proporcionada por Next.js. Puedes usar la función `getTranslation` para traducir tus metadatos.
- **Internacionalización de sitemap.xml y robots.txt**: Intlayer te permite internacionalizar tus archivos sitemap.xml y robots.txt. Puedes usar la función `getMultilingualUrls` para generar URLs multilingües para tu sitemap.
- **Internacionalización de URLs**: Intlayer te permite internacionalizar tus URLs utilizando la función `getMultilingualUrls`. Esta función genera URLs multilingües para tu sitemap.

**Para aprender más sobre estas características, consulta la guía [Internacionalización (i18n) de Next.js con Intlayer y Next.js 15 App Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md).**

## Funciones proporcionadas por el paquete `next-intlayer`

El paquete `next-intlayer` también proporciona algunas funciones para ayudarte a internacionalizar tu aplicación.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useLocale.md)

## Historial de la documentación

- 5.5.10 - 2025-06-29: Historial inicial
