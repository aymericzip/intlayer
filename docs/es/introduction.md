# Documentación de Intlayer

¡Bienvenido a la documentación oficial de Intlayer! Aquí encontrarás todo lo que necesitas para integrar, configurar y dominar Intlayer para todas tus necesidades de internacionalización (i18n), ya sea que estés trabajando con Next.js, React, Vite, Express u otro entorno de JavaScript.

## Introducción

### ¿Qué es Intlayer?

**Intlayer** es una biblioteca de internacionalización diseñada específicamente para desarrolladores de JavaScript. Permite la declaración de tu contenido en cualquier lugar de tu código. Convierte la declaración de contenido multilingüe en diccionarios estructurados para integrarlos fácilmente en tu código. Usando TypeScript, **Intlayer** hace que tu desarrollo sea más sólido y eficiente.

Intlayer también proporciona un editor visual opcional que te permite editar y gestionar tu contenido fácilmente. Este editor es particularmente útil para desarrolladores que prefieren una interfaz visual para la gestión de contenido o para equipos que generan contenido sin preocuparse por el código.

### Ejemplo de uso

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
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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

/** @type {import('intlayer').Dictionary} */
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

## Principales Características

Intlayer ofrece una variedad de características diseñadas para satisfacer las necesidades del desarrollo web moderno. A continuación, se presentan las características clave, con enlaces a documentación detallada para cada una:

- **Soporte de Internacionalización**: Mejora el alcance global de tu aplicación con soporte integrado para internacionalización.
- **Editor Visual**: Mejora tu flujo de trabajo de desarrollo con complementos de editor diseñados para Intlayer. Consulta la [Guía del Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md).
- **Flexibilidad de Configuración**: Personaliza tu configuración con amplias opciones detalladas en la [Guía de Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).
- **Herramientas CLI Avanzadas**: Gestiona tus proyectos de manera eficiente utilizando la interfaz de línea de comandos de Intlayer. Explora las capacidades en la [Documentación de Herramientas CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md).

## Conceptos Básicos

### Diccionario

Organiza tu contenido multilingüe cerca de tu código para mantener todo consistente y fácil de mantener.

- **[Comienza Aquí](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/get_started.md)**  
  Aprende los conceptos básicos de la declaración de contenido en Intlayer.

- **[Traducción](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/translation.md)**  
  Comprende cómo se generan, almacenan y utilizan las traducciones en tu aplicación.

- **[Enumeración](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/enumeration.md)**  
  Gestiona fácilmente conjuntos repetidos o fijos de datos en varios idiomas.

- **[Obtención de Funciones](https://github.com/aymericzip/intlayer/blob/main/docs/es/dictionary/function_fetching.md)**  
  Observa cómo obtener contenido dinámicamente con lógica personalizada para adaptarse al flujo de trabajo de tu proyecto.

### Entornos e Integraciones

Hemos diseñado Intlayer con flexibilidad en mente, ofreciendo integración fluida con frameworks y herramientas de construcción populares:

- **[Intlayer con Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md)**
- **[Intlayer con Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_14.md)**
- **[Intlayer con Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_page_router.md)**
- **[Intlayer con React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md)**
- **[Intlayer con Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_vite+react.md)**
- **[Intlayer con Express](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_express.md)**

Cada guía de integración incluye las mejores prácticas para usar las características de Intlayer, como **renderizado del lado del servidor**, **enrutamiento dinámico** o **renderizado del lado del cliente**, para que puedas mantener una aplicación rápida, amigable con SEO y altamente escalable.

## Contribuciones y Comentarios

Valoramos el poder del desarrollo de código abierto y basado en la comunidad. Si deseas proponer mejoras, agregar una nueva guía o corregir cualquier problema en nuestra documentación, no dudes en enviar un Pull Request o abrir un issue en nuestro [repositorio de GitHub](https://github.com/aymericzip/intlayer/blob/main/docs).

**¿Listo para traducir tu aplicación de manera más rápida y eficiente?** Sumérgete en nuestra documentación para comenzar a usar Intlayer hoy. Experimenta un enfoque robusto y optimizado para la internacionalización que mantiene tu contenido organizado y a tu equipo más productivo.
