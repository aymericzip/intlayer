---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Introducción
description: Descubre cómo funciona Intlayer. Ve los pasos que usa Intlayer en tu aplicación. Descubre qué hacen los diferentes paquetes.
keywords:
  - Introducción
  - Comenzar
  - Intlayer
  - Aplicación
  - Paquetes
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Historial inicial
---

# Documentación de Intlayer

¡Bienvenido a la documentación oficial de Intlayer! Aquí encontrarás todo lo que necesitas para integrar, configurar y dominar Intlayer para todas tus necesidades de internacionalización (i18n), ya sea que trabajes con Next.js, React, Vite, Express u otro entorno de JavaScript.

## Introducción

### ¿Qué es Intlayer?

**Intlayer** es una biblioteca de internacionalización diseñada específicamente para desarrolladores de JavaScript. Permite la declaración de tu contenido en cualquier parte de tu código. Convierte la declaración de contenido multilingüe en diccionarios estructurados para integrarlos fácilmente en tu código. Usando TypeScript, **Intlayer** hace que tu desarrollo sea más sólido y eficiente.

Intlayer también proporciona un editor visual opcional que te permite editar y gestionar tu contenido fácilmente. Este editor es particularmente útil para desarrolladores que prefieren una interfaz visual para la gestión de contenido, o para equipos que generan contenido sin tener que preocuparse por el código.

### Ejemplo de uso

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// contenidoDelComponente representa el contenido traducido del componente
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// contenidoDelComponente representa el contenido traducido del componente
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
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

## Características Principales

Intlayer ofrece una variedad de características diseñadas para satisfacer las necesidades del desarrollo web moderno. A continuación, se presentan las características clave, con enlaces a la documentación detallada de cada una:

- **Soporte de Internacionalización**: Mejora el alcance global de tu aplicación con soporte integrado para internacionalización.
- **Editor Visual**: Mejora tu flujo de trabajo de desarrollo con plugins de editor diseñados para Intlayer. Consulta la [Guía del Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md).
- **Flexibilidad de Configuración**: Personaliza tu configuración con amplias opciones detalladas en la [Guía de Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).
- **Herramientas Avanzadas de CLI**: Gestiona tus proyectos de manera eficiente usando la interfaz de línea de comandos de Intlayer. Explora las capacidades en la [Documentación de Herramientas CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md).

## Conceptos Básicos

### Diccionario

Organiza tu contenido multilingüe cerca de tu código para mantener todo consistente y fácil de mantener.

- **[Comenzando](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md)**  
  Aprende los conceptos básicos para declarar tu contenido en Intlayer.

- **[Traducción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation.md)**  
  Comprende cómo se generan, almacenan y utilizan las traducciones en tu aplicación.

- **[Enumeración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/enumeration.md)**  
  Gestiona fácilmente conjuntos de datos repetidos o fijos en varios idiomas.

- **[Condición](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/conditional.md)**  
  Aprende a usar lógica condicional en Intlayer para crear contenido dinámico.

- **[Inserción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/insertion.md)**  
  Descubre cómo insertar valores en una cadena usando marcadores de posición de inserción.

- **[Obtención de Funciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/function_fetching.md)**  
  Aprende cómo obtener contenido dinámicamente con lógica personalizada para adaptarse al flujo de trabajo de tu proyecto.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/markdown.md)**  
  Aprende a usar Markdown en Intlayer para crear contenido enriquecido.

- **[Incrustaciones de Archivos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/file_embeddings.md)**  
  Descubre cómo incrustar archivos externos en Intlayer para usarlos en el editor de contenido.

- **[Anidamiento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/nesting.md)**  
  Comprende cómo anidar contenido en Intlayer para crear estructuras complejas.

### Entornos e Integraciones

Hemos construido Intlayer pensando en la flexibilidad, ofreciendo una integración perfecta con los frameworks y herramientas de construcción más populares:

- **[Intlayer con Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md)**
- **[Intlayer con Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_14.md)**
- **[Intlayer con Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_page_router.md)**
- **[Intlayer con React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md)**
- **[Intlayer con Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md)**
- **[Intlayer con React Native y Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_react_native+expo.md)**
- **[Intlayer con Lynx y React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_lynx+react.md)**
- **[Intlayer con Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_express.md)**

Cada guía de integración incluye las mejores prácticas para usar las funcionalidades de Intlayer, como **renderizado del lado del servidor**, **enrutamiento dinámico** o **renderizado del lado del cliente**, para que puedas mantener una aplicación rápida, optimizada para SEO y altamente escalable.

## Contribuciones y Retroalimentación

Valoramos el poder del código abierto y el desarrollo impulsado por la comunidad. Si deseas proponer mejoras, agregar una nueva guía o corregir cualquier problema en nuestra documentación, no dudes en enviar un Pull Request o abrir un issue en nuestro [repositorio de GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**¿Listo para traducir tu aplicación de manera más rápida y eficiente?** Sumérgete en nuestra documentación para comenzar a usar Intlayer hoy mismo. Experimenta un enfoque robusto y optimizado para la internacionalización que mantiene tu contenido organizado y a tu equipo más productivo.

---
