# Intlayer: Una forma más cercana de traducir tu aplicación

**Intlayer** es una biblioteca de internacionalización diseñada específicamente para desarrolladores de JavaScript. Permite la declaración de tu contenido en todas partes de tu código. Convierte la declaración de contenido multilingüe en diccionarios estructurados para integrarse fácilmente en tu código. Utilizando TypeScript, **Intlayer** fortalece y hace más eficiente tu desarrollo.

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

/** @type {import('intlayer').DeclarationContent} */
// Este es el contenido del ejemplo del componente
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

/** @type {import('intlayer').DeclarationContent} */
// Este es el contenido del ejemplo del componente
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

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## ¿Por qué elegir Intlayer?

- **Gestión de Contenidos Potenciada por JavaScript**: Aprovecha la flexibilidad de JavaScript para definir y gestionar tu contenido de manera eficiente.
- **Entorno Seguro de Tipos**: Aprovecha TypeScript para asegurar que todas tus definiciones de contenido sean precisas y sin errores.
- **Archivos de Contenido Integrados**: Mantén tus traducciones cerca de sus respectivos componentes, mejorando la mantenibilidad y claridad.
- **Configuración Simplificada**: Comienza rápidamente con una configuración mínima, especialmente optimizada para proyectos de Next.js.
- **Soporte para Componentes de Servidor**: Perfectamente adecuado para componentes de servidor de Next.js, asegurando un renderizado del lado del servidor sin problemas.
- **Enrutamiento Mejorado**: Soporte completo para el enrutamiento de aplicaciones de Next.js, adaptándose sin problemas a estructuras de aplicación complejas.
- **Interoperabilidad**: Permitir la interoperabilidad con i18next. (beta)
