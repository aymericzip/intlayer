# Markdown / Contenido Enriquecido

## Cómo Funciona Markdown

Intlayer admite contenido enriquecido definido utilizando la sintaxis de Markdown. Esto se logra a través de la función `md`, que convierte una cadena de texto Markdown en un formato que puede ser gestionado por Intlayer. Utilizando Markdown, puedes escribir y mantener contenido con formato enriquecido fácilmente, como blogs, artículos y más.

[El editor visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md) y el [CMS de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_CMS.md) admiten la gestión de contenido en Markdown.

Cuando se integra con una aplicación React, puedes usar un proveedor de renderizado Markdown (como [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) para renderizar el contenido Markdown en HTML. Esto te permite escribir contenido en Markdown mientras aseguras que se visualice correctamente en tu aplicación.

## Configuración de Contenido Markdown

Para configurar contenido Markdown en tu proyecto Intlayer, define un diccionario de contenido que utilice la función `md`.

### Ejemplo en TypeScript

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

// Ejemplo de contenido Markdown en un diccionario
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Mi título \n\nLorem Ipsum"),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

### Ejemplo en JavaScript (ESM)

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Ejemplo de contenido Markdown en uso con módulo ESM
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Mi título \n\nLorem Ipsum"),
  },
};

export default markdownDictionary;
```

### Ejemplo en CommonJS

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Ejemplo de contenido Markdown usando CommonJS
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Mi título \n\nLorem Ipsum"),
  },
};

module.exports = markdownDictionary;
```

### Ejemplo en JSON

Cuando se utiliza JSON, el contenido Markdown se define estableciendo un `nodeType` (por ejemplo, `"markdown"`) y proporcionando la cadena de texto Markdown. Por ejemplo:

```json fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "markdown",
      "markdown": "## Mi título \n\nLorem Ipsum"
    }
  }
}
```

## Uso de Markdown con React Intlayer

Para renderizar el contenido Markdown en una aplicación React, puedes utilizar el hook `useIntlayer` del paquete `react-intlayer` junto con un proveedor de renderizado Markdown. En este ejemplo, utilizamos el paquete [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) para convertir el Markdown en HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
import { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import { LocaleRouter } from "./Router";
import Markdown from "markdown-to-jsx";
import "./App.css";

const AppContent: FC = () => {
  // Obtención de contenido Markdown desde Intlayer usando el hook
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

const App: FC = () => (
  <LocaleRouter>
    <MarkdownProvider
      renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
    >
      <AppContent />
    </MarkdownProvider>
  </LocaleRouter>
);

export default App;
```

En esta implementación:

- El `MarkdownProvider` envuelve la aplicación (o la parte relevante de ella) y acepta una función `renderMarkdown`. Esta función se utiliza para convertir cadenas de texto Markdown a JSX utilizando el paquete `markdown-to-jsx`.
- El hook `useIntlayer` se utiliza para recuperar el contenido Markdown (`myMarkdownContent`) del diccionario con la clave `"app"`.
- El contenido Markdown se renderiza directamente en el componente, y el renderizado Markdown es manejado por el proveedor.

## Recursos Adicionales

- [Documentación de Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md)
- [Documentación de React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md)
- [Documentación de Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md)
- [markdown-to-jsx en npm](https://www.npmjs.com/package/markdown-to-jsx)

Estos recursos brindan más información sobre cómo configurar y usar Intlayer con distintos tipos de contenido y frameworks.
