# Intlayer Documentación

Bienvenido a la Documentación de Intlayer. Esta guía proporciona una visión general de Intlayer, sus principales características y cómo utilizar eficazmente estos documentos para mejorar su experiencia de desarrollo.

## Introducción

### ¿Qué es Intlayer?

**Intlayer** es una biblioteca de internacionalización diseñada específicamente para desarrolladores de JavaScript. Permite la declaración de su contenido en cualquier parte de su código. Convierte la declaración de contenido multilingüe en diccionarios estructurados para integrarse fácilmente en su código. Usando TypeScript, **Intlayer** fortalece y hace más eficiente su desarrollo.

Intlayer también proporciona un editor visual opcional que le permite editar y gestionar su contenido fácilmente. Este editor es particularmente útil para los desarrolladores que prefieren una interfaz visual para la gestión de contenido, o para equipos generando contenido sin tener que preocuparse por el código.

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

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
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

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Características Principales

Intlayer ofrece una variedad de características adaptadas para satisfacer las necesidades del desarrollo web moderno. A continuación se presentan las características clave, con enlaces a la documentación detallada para cada una:

- **Soporte de Internacionalización**: Mejore el alcance global de su aplicación con soporte integrado para la internacionalización.
- **Editor Visual**: Mejore su flujo de trabajo de desarrollo con complementos de editor diseñados para Intlayer. Consulte la [Guía del Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_editor.md).
- **Flexibilidad de Configuración**: Personalice su configuración con opciones de configuración extensas detalladas en la [Guía de Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).
- **Herramientas CLI Avanzadas**: Gestione sus proyectos de manera eficiente utilizando la interfaz de línea de comandos de Intlayer. Explore las capacidades en la [Documentación de Herramientas CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md).
- **Compatibilidad con i18n**: Intlayer funciona sin problemas con otras bibliotecas de internacionalización. Consulte la [Guía i18n](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_i18next.md) para más información.

### Plataformas Soportadas

Intlayer está diseñado para trabajar de manera fluida con aplicaciones de Next.js y React. También es compatible con Vite y Create React App.

- **Integración con Next.js**: Utilice el poder de Next.js dentro de Intlayer para el rendering del lado del servidor y la generación de sitios estáticos. Los detalles están disponibles en nuestra [Guía de Integración de Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md).
- **Integración con Vite y React**: Aproveche Vite dentro de Intlayer para el rendering del lado del servidor y la generación de sitios estáticos. Los detalles están disponibles en nuestra [Guía de Integración de Vite y React](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_vite+react.md).
- **Integración con Create React App**: Utilice el poder de Create React App dentro de Intlayer para el rendering del lado del servidor y la generación de sitios estáticos. Los detalles están disponibles en nuestra [Guía de Integración de Create React App](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md).

### Cómo Utilizar Esta Documentación

Para aprovechar al máximo esta documentación:

1. **Navegue a las Secciones Relevantes**: Utilice los enlaces proporcionados arriba para ir directamente a las secciones que abordan sus necesidades.
2. **Ejemplos Interactivos**: Donde sea posible, utilice ejemplos interactivos para ver cómo funcionan las características en tiempo real.
3. **Comentarios y Contribuciones**: Su retroalimentación es valiosa. Si tiene sugerencias o correcciones, considere contribuir a la documentación.
