# Intlayer: Una forma más cercana de traducir tu aplicación

**Intlayer** es una biblioteca de internacionalización diseñada específicamente para desarrolladores de JavaScript. Permite la declaración de tu contenido en cualquier parte de tu código. Convierte la declaración de contenido multilingüe en diccionarios estructurados para integrarlos fácilmente en tu código. Usando TypeScript, **Intlayer** hace que tu desarrollo sea más sólido y eficiente.

## Ejemplo de uso

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── MyComponent
        ├── index.content.mjs
        └── index.js
```

```tsx fileName="./Components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

// Ejemplo de contenido del componente
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

// Ejemplo de contenido del componente
/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

// Ejemplo de contenido del componente
/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./Components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

// Ejemplo del componente
export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

// Ejemplo del componente
const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

// Ejemplo del componente
const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## ¿Por qué elegir Intlayer?

- **Gestión de contenido impulsada por JavaScript**: Aprovecha la flexibilidad de JavaScript para definir y gestionar tu contenido de manera eficiente.
- **Entorno seguro con tipos**: Utiliza TypeScript para garantizar que todas tus definiciones de contenido sean precisas y sin errores.
- **Archivos de contenido integrados**: Mantén tus traducciones cerca de sus respectivos componentes, mejorando la mantenibilidad y claridad.
- **Configuración simplificada**: Ponte en marcha rápidamente con una configuración mínima, especialmente optimizada para proyectos de Next.js.
- **Soporte para componentes del servidor**: Perfectamente adecuado para componentes del servidor de Next.js, asegurando un renderizado del lado del servidor fluido.
- **Enrutamiento mejorado**: Soporte completo para el enrutamiento de aplicaciones de Next.js, adaptándose perfectamente a estructuras de aplicaciones complejas.
- **Interoperabilidad**: Permite la interoperabilidad con [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_next-intl.md), y [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_react-intl.md).
