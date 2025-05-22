# intlayer: Paquete NPM para Gestionar Diccionario Multilingüe (i18n)

**Intlayer** es un conjunto de paquetes diseñados específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, Next.js y Express.js.

**El paquete `intlayer`** te permite declarar tu contenido en cualquier parte de tu código. Convierte declaraciones de contenido multilingüe en diccionarios estructurados que se integran perfectamente en tu aplicación. Con TypeScript, **Intlayer** mejora tu desarrollo al proporcionar herramientas más sólidas y eficientes.

## ¿Por qué integrar Intlayer?

- **Gestión de Contenido Potenciada por JavaScript**: Aprovecha la flexibilidad de JavaScript para definir y gestionar tu contenido de manera eficiente.
- **Entorno Seguro con Tipos**: Utiliza TypeScript para garantizar que todas tus definiciones de contenido sean precisas y sin errores.
- **Archivos de Contenido Integrados**: Mantén tus traducciones cerca de sus respectivos componentes, mejorando la mantenibilidad y claridad.

## Instalación

Instala el paquete necesario utilizando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer
```

```bash packageManager="yarn"
yarn add intlayer
```

### Configurar Intlayer

Intlayer proporciona un archivo de configuración para configurar tu proyecto. Coloca este archivo en la raíz de tu proyecto.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
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
};

module.exports = config;
```

> Para una lista completa de parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

## Ejemplo de uso

Con Intlayer, puedes declarar tu contenido de manera estructurada en cualquier parte de tu base de código.

Por defecto, Intlayer busca archivos con la extensión `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> Puedes modificar la extensión predeterminada configurando la propiedad `contentDir` en el [archivo de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
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
    ├── ClientComponent
    │   ├── index.content.cjs
    │   └── index.cjx
    └── ServerComponent
        ├── index.content.cjs
        └── index.cjx
```

### Declarar tu contenido

Aquí tienes un ejemplo de declaración de contenido:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
// Importar funciones y tipos necesarios de Intlayer
import { t, type Dictionary } from "intlayer";

// Declaración del contenido del componente cliente
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World", // Traducción en inglés
      fr: "Bonjour le monde", // Traducción en francés
      es: "Hola Mundo", // Traducción en español
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car", // Menos de menos un coche
      "-1": "Minus one car", // Menos un coche
      "0": "No cars", // Sin coches
      "1": "One car", // Un coche
      ">5": "Some cars", // Algunos coches
      ">19": "Many cars", // Muchos coches
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
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
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
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
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
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        "0": "No cars",
        "1": "One car",
        ">5": "Some cars",
        ">19": "Many cars"
      }
    }
  }
}
```

### Construir tus diccionarios

Puedes construir tus diccionarios utilizando el [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md).

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Este comando escanea todos los archivos `*.content.*`, los compila y escribe los resultados en el directorio especificado en tu **`intlayer.config.ts`** (por defecto, `./.intlayer`).

Una salida típica podría ser:

```bash
.
└── .intlayer
    ├── dictionary  # Contiene el diccionario de tu contenido
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # Contiene el punto de entrada de tu diccionario para ser usado en tu aplicación
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # Contiene las definiciones de tipos autogeneradas de tu diccionario
        ├── intlayer.d.ts  # Contiene las definiciones de tipos autogeneradas de Intlayer
        ├── client-component.d.ts
        └── server-component.d.ts
```

### Construir recursos para i18next

Intlayer puede configurarse para construir diccionarios para [i18next](https://www.i18next.com/). Para ello, necesitas agregar la siguiente configuración a tu archivo `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Indica a Intlayer que genere archivos de mensajes para i18next
    dictionaryOutput: ["i18next"],

    // El directorio donde Intlayer escribirá tus archivos JSON de mensajes
    i18nextResourcesDir: "./i18next/resources",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Indica a Intlayer que genere archivos de mensajes para i18next
    dictionaryOutput: ["i18next"],

    // El directorio donde Intlayer escribirá tus archivos JSON de mensajes
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Indica a Intlayer que genere archivos de mensajes para i18next
    dictionaryOutput: ["i18next"],

    // El directorio donde Intlayer escribirá tus archivos JSON de mensajes
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> Para una lista completa de parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

Salida:

```bash
.
└── i18next
    └── resources
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Por ejemplo, el archivo **en/client-component.json** podría verse así:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Some cars"
}
```

### Construir diccionarios para next-intl

Intlayer puede configurarse para construir diccionarios para [i18next](https://www.i18next.com/) o [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl). Para ello, necesitas agregar la siguiente configuración a tu archivo `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Indica a Intlayer que genere archivos de mensajes para next-intl
    dictionaryOutput: ["next-intl"],

    // El directorio donde Intlayer escribirá tus archivos JSON de mensajes
    nextIntlMessagesDir: "./i18next/messages",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Indica a Intlayer que genere archivos de mensajes para next-intl
    dictionaryOutput: ["next-intl"],

    // El directorio donde Intlayer escribirá tus archivos JSON de mensajes
    nextIntlMessagesDir: "./i18next/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Indica a Intlayer que genere archivos de mensajes para next-intl
    dictionaryOutput: ["next-intl"],

    // El directorio donde Intlayer escribirá tus archivos JSON de mensajes
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> Para una lista completa de parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

Salida:

```bash
.
└── intl
    └── messages
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Por ejemplo, el archivo **en/client-component.json** podría verse así:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Some cars"
}
```

## Herramientas CLI

Intlayer proporciona una herramienta CLI para:

- auditar tus declaraciones de contenido y completar traducciones faltantes
- construir diccionarios a partir de tus declaraciones de contenido
- subir y descargar diccionarios remotos desde tu CMS a tu proyecto local

Consulta [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md) para más información.

## Usar Intlayer en tu aplicación

Una vez declarado tu contenido, puedes consumir tus diccionarios de Intlayer en tu aplicación.

Intlayer está disponible como un paquete para tu aplicación.

### Aplicación React

Para usar Intlayer en tu aplicación React, puedes usar [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/index.md).

### Aplicación Next.js

Para usar Intlayer en tu aplicación Next.js, puedes usar [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/next-intlayer/index.md).

### Aplicación Express

Para usar Intlayer en tu aplicación Express, puedes usar [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/express-intlayer/index.md).

## Funciones proporcionadas por el paquete `intlayer`

El paquete `intlayer` también proporciona algunas funciones para ayudarte a internacionalizar tu aplicación.

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getConfiguration.md)
- [`getTranslation()`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getTranslation.md)
- [`getEnumeration()`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getEnumeration.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/getPathWithoutLocale.md)
