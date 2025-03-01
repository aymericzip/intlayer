# Markdown / Contenido de Texto Enriquecido

## Cómo Funciona Markdown

Intlayer admite contenido de texto enriquecido definido utilizando la sintaxis de Markdown. Esto se logra a través de la función `md`, que convierte una cadena de Markdown en un formato que puede ser gestionado por Intlayer. Al usar Markdown, puedes escribir y mantener contenido con formato enriquecido de manera sencilla, como blogs, artículos y más.

[El editor visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md) y el [CMS de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_CMS.md) admiten la gestión de contenido en Markdown.

Cuando se integra con una aplicación React, puedes usar un proveedor de renderizado de Markdown (como [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) para renderizar el contenido de Markdown a HTML. Esto te permite escribir contenido en Markdown mientras aseguras que se muestre correctamente en tu aplicación.

## Configuración de Contenido Markdown

Para configurar contenido Markdown en tu proyecto Intlayer, define un diccionario de contenido que utilice la función `md`.

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

// Definición del diccionario de contenido con Markdown
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Definición del diccionario de contenido con Markdown
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Definición del diccionario de contenido con Markdown
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
};

module.exports = markdownDictionary;
```

```json fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "markdown",
      "markdown": "## My title \n\nLorem Ipsum"
    }
  }
}
```

## Uso de Markdown con React Intlayer

Para renderizar el contenido de Markdown en una aplicación React, puedes aprovechar el hook `useIntlayer` del paquete `react-intlayer` junto con un proveedor de renderizado de Markdown. En este ejemplo, usamos el paquete [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) para convertir el Markdown en HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
import { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

// Componente para renderizar contenido Markdown
const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// Proveedor de Markdown para la aplicación
export const AppProvider: FC = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);
```

```jsx fileName="App.jsx" codeFormat="esm"
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

// Componente para renderizar contenido Markdown
const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// Proveedor de Markdown para la aplicación
export const AppProvider = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);
```

```jsx fileName="App.jsx" codeFormat="commonjs"
const { useIntlayer, MarkdownProvider } = require("react-intlayer");
const Markdown = require("markdown-to-jsx");

// Componente para renderizar contenido Markdown
const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// Proveedor de Markdown para la aplicación
AppProvider = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);

module.exports = {
  AppProvider,
};
```

En esta implementación:

- El `MarkdownProvider` envuelve la aplicación (o la parte relevante de ella) y acepta una función `renderMarkdown`. Esta función se utiliza para convertir cadenas de Markdown en JSX utilizando el paquete `markdown-to-jsx`.
- El hook `useIntlayer` se utiliza para recuperar el contenido de Markdown (`myMarkdownContent`) del diccionario con la clave `"app"`.
- El contenido de Markdown se renderiza directamente en el componente, y el renderizado de Markdown es manejado por el proveedor.

## Recursos Adicionales

- [Documentación de Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md)
- [Documentación de React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md)
- [Documentación de Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md)
- [markdown-to-jsx en npm](https://www.npmjs.com/package/markdown-to-jsx)

Estos recursos proporcionan más información sobre cómo configurar y usar Intlayer con varios tipos de contenido y frameworks.
