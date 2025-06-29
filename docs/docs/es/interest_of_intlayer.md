---
docName: interest_of_intlayer
url: https://intlayer.org/doc/concept/interest
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/interest_of_intlayer.md
createdAt: 2024-08-14
updatedAt: 2025-06-29
title: Interés de Intlayer
description: Descubra los beneficios y ventajas de usar Intlayer en sus proyectos. Comprenda por qué Intlayer se destaca entre otros frameworks.
keywords:
  - Beneficios
  - Ventajas
  - Intlayer
  - Framework
  - Comparación
---

# Intlayer: Una forma personalizada de traducir tu sitio web

**Intlayer** es una biblioteca de internacionalización diseñada específicamente para desarrolladores JavaScript. Permite declarar tu contenido en cualquier parte de tu código. Convierte la declaración de contenido multilingüe en diccionarios estructurados para integrarse fácilmente en tu código. Usando TypeScript, **Intlayer** hace que tu desarrollo sea más robusto y eficiente.

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

- **Gestión de contenido basada en JavaScript**: Aprovecha la flexibilidad de JavaScript para definir y gestionar tu contenido de manera eficiente.
- **Entorno con tipos seguros**: Utiliza TypeScript para garantizar que todas tus definiciones de contenido sean precisas y sin errores.
- **Archivos de contenido integrados**: Mantén tus traducciones cerca de sus respectivos componentes, mejorando la mantenibilidad y claridad.
- **Configuración simplificada**: Comienza rápidamente con una configuración mínima, especialmente optimizada para proyectos Next.js.
- **Soporte para componentes de servidor**: Perfectamente adaptado para componentes de servidor Next.js, asegurando un renderizado del lado del servidor fluido.
- **Enrutamiento mejorado**: Soporte completo para el enrutamiento de aplicaciones Next.js, adaptándose perfectamente a estructuras de aplicación complejas.
- **Base de código organizada**: Mantén tu base de código más organizada: 1 componente = 1 diccionario en la misma carpeta.
- **Tipos TypeScript automáticos**: Los tipos TypeScript se implementan automáticamente, evitando la rotura del código debido a claves renombradas o eliminadas.
- **Traducción automática en CI**: Rellena automáticamente tus traducciones en tu CI usando tu propia clave API de OpenAI, eliminando la necesidad de una plataforma L10n.
- **Integración de servidor MCP**: Proporciona un servidor MCP (Model Context Protocol) para automatización IDE, habilitando gestión de contenido y flujos de trabajo i18n sin problemas directamente dentro de tu entorno de desarrollo. [Aprender más](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md).
- **Soporte para Markdown**: Importa e interpreta archivos markdown para contenido multilingüe como políticas de privacidad.
- **Editor visual y CMS gratuitos**: Un editor visual y CMS gratuitos están disponibles si necesitas trabajar con redactores de contenido para tus traducciones, eliminando nuevamente la necesidad de una plataforma de localización y permitiendo la externalización del contenido desde la base de código.
- **Recuperación de contenido simplificada**: No es necesario llamar a tu función `t` para cada pieza de contenido; recupera todo tu contenido directamente usando un solo hook.
- **Implementación consistente**: La misma implementación para componentes de cliente y servidor, no es necesario pasar tu función `t` a través de cada componente de servidor.
- **Contenido tree-shakable**: El contenido es tree-shakable, lo que aligera el bundle final.
- **Renderizado estático no bloqueante**: Intlayer no bloquea el renderizado estático como lo hace `next-intl`.
- **Interoperabilidad**: Permite la interoperabilidad con [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_next-intl.md), y [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react-intl.md).
