# react-intlayer: Paquete NPM para internacionalizar (i18n) una aplicación React

**Intlayer** es un conjunto de paquetes diseñado específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

**El paquete `react-intlayer`** te permite internacionalizar tu aplicación React. Proporciona proveedores de contexto y hooks para la internacionalización de React.

## ¿Por qué internacionalizar tu aplicación React?

El internacionalizar tu aplicación React es esencial para atender eficazmente a una audiencia global. Permite que tu aplicación entregue contenido y mensajes en el idioma preferido de cada usuario. Esta capacidad mejora la experiencia del usuario y amplía el alcance de tu aplicación al hacerla más accesible y relevante para personas de diferentes antecedentes lingüísticos.

## ¿Por qué integrar Intlayer?

- **Gestión de Contenido Impulsada por JavaScript**: Aprovecha la flexibilidad de JavaScript para definir y gestionar tu contenido de manera eficiente.
- **Entorno Seguro para Tipos**: Aprovecha TypeScript para asegurarte de que todas tus definiciones de contenido sean precisas y sin errores.
- **Archivos de Contenido Integrados**: Mantén tus traducciones cerca de sus respectivos componentes, mejorando la mantenibilidad y claridad.

## Instalación

Instala el paquete necesario utilizando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install react-intlayer
```

```bash packageManager="yarn"
yarn add react-intlayer
```

```bash packageManager="pnpm"
pnpm add react-intlayer
```

## Ejemplo de uso

Con Intlayer, puedes declarar tu contenido de manera estructurada en cualquier lugar de tu código.

Por defecto, Intlayer escanea archivos con la extensión `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> Puedes modificar la extensión predeterminada configurando la propiedad `contentDir` en el [archivo de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── Component1
        │   ├── index.content.ts
        │   └── index.tsx
        └── Component2
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.mjs
        │   └── index.mjx
        └── Component2
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.cjs
        │   └── index.cjx
        └── Component2
            ├── index.content.cjs
            └── index.cjx
```

### Declara tu contenido

`react-intlayer` está diseñado para trabajar con el paquete [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/index.md). `intlayer` es un paquete que permite declarar tu contenido en cualquier lugar de tu código. Convierte declaraciones de contenido multilingües en diccionarios estructurados que integran sin problemas en tu aplicación.

Aquí hay un ejemplo de declaración de contenido:

```tsx filePath="src/Component1/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Menos de un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
  },
} satisfies Dictionary;

export default component1Content;
```

```jsx filePath="src/Component1/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Menos de un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
  },
};

export default component1Content;
```

```jsx filePath="src/Component1/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Menos de un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
  },
};

module.exports = component1Content;
```

```json filePath="src/Component1/index.content.json" codeFormat="json"
{
  "key": "component-1",
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
        "<-1": "Menos de un coche",
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

### Utiliza el Contenido en tu Código

Una vez que hayas declarado tu contenido, puedes usarlo en tu código. Aquí hay un ejemplo de cómo usar el contenido en un componente de React:

```tsx {4,7} fileName="src/components/Component1Example.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const Component1Example: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Crear declaración de contenido relacionada

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "react-intlayer";

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Crear declaración de contenido relacionada

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("react-intlayer");

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Crear declaración de contenido relacionada

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Dominando la internacionalización de tu aplicación React

Intlayer proporciona muchas características para ayudarte a internacionalizar tu aplicación React.

**Para aprender más sobre estas características, consulta la guía [Internacionalización de React (i18n) con Intlayer y Vite y React](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_vite+react.md) para la aplicación Vite y React, o la guía [Internacionalización de React (i18n) con Intlayer y React (CRA)](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md) para la aplicación Create React.**

## Funciones proporcionadas por el paquete `react-intlayer`

El paquete `react-intlayer` también proporciona algunas funciones para ayudarte a internacionalizar tu aplicación.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/useIntlayerAsync.md)
