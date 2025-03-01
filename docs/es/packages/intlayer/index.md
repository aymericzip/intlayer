# intlayer: Paquete NPM para Gestionar Diccionario Multilingüe (i18n)

**Intlayer** es un conjunto de paquetes diseñados específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, Next.js y Express.js.

**El paquete `intlayer`** te permite declarar tu contenido en cualquier parte de tu código. Convierte las declaraciones de contenido multilingüe en diccionarios estructurados que se integran perfectamente en tu aplicación. Con TypeScript, **Intlayer** mejora tu desarrollo proporcionando herramientas más fuertes y eficientes.

## ¿Por qué integrar Intlayer?

- **Gestión de Contenido Impulsada por JavaScript**: Aprovecha la flexibilidad de JavaScript para definir y gestionar tu contenido de manera eficiente.
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
// Configuración de internacionalización
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
// Configuración de internacionalización
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
// Configuración de internacionalización
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

Por defecto, Intlayer escanea archivos con la extensión `.content.{ts,tsx,js,jsx,mjs,cjs}`.

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

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
// Declaración de contenido
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Menos de menos un coche",
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

```jsx filePath="src/ClientComponent/index.content.mjs" codeFormat="esm"
// Declaración de contenido
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
      "<-1": "Menos de menos un coche",
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

```jsx filePath="src/ClientComponent/index.content.cjs" codeFormat="commonjs"
// Declaración de contenido
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
      "<-1": "Menos de menos un coche",
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

```json filePath="src/ClientComponent/index.content.json" codeFormat="json"
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
        "<-1": "Menos de menos un coche",
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

### Construir tus diccionarios

Puedes construir tus diccionarios utilizando el [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md).

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Este comando escanea todos los archivos `*.content.*`, los compila y escribe los resultados en el directorio especificado en tu **`intlayer.config.ts`** (por defecto, `./.intlayer`).

Un resultado típico podría ser:

```bash
.
└── .intlayer
    ├── dictionary  # Contiene el diccionario de tu contenido
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # Contiene el punto de entrada de tu diccionario para ser usado en tu aplicación
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # Contiene las definiciones de tipos generadas automáticamente de tu diccionario
        ├── intlayer.d.ts  # Contiene las definiciones de tipos generadas automáticamente de Intlayer
        ├── client-component.d.ts
        └── server-component.d.ts
```

### Construir recursos para i18next

Intlayer puede configurarse para construir diccionarios para [i18next](https://www.i18next.com/). Para ello, necesitas agregar la siguiente configuración a tu archivo `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
// Configuración para i18next
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
// Configuración para i18next
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
// Configuración para i18next
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

Por ejemplo, el archivo **es/client-component.json** podría verse así:

```json filePath="intlayer/dictionary/es/client-component.json"
{
  "myTranslatedContent": "Hola Mundo",
  "zero_numberOfCar": "Sin coches",
  "one_numberOfCar": "Un coche",
  "two_numberOfCar": "Dos coches",
  "other_numberOfCar": "Algunos coches"
}
```
