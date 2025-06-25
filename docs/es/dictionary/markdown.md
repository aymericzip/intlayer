---
docName: dictionary__markdown
url: /doc/concept/content/markdown
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/markdown.md
createdAt: 2025-02-7
updatedAt: 2025-02-7
title: Markdown
description: Descubre cómo declarar y utilizar contenido Markdown en tu sitio web multilingüe con Intlayer. Sigue los pasos de esta documentación en línea para integrar Markdown sin problemas en tu proyecto.
keywords:
  - Markdown
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Contenido Markdown / Markdown en Intlayer

## Cómo Funciona Markdown

Intlayer admite contenido de texto enriquecido definido mediante la sintaxis de Markdown. Esto se logra a través de la función `md`, que convierte una cadena de Markdown en un formato que puede ser gestionado por Intlayer. Al usar Markdown, puedes escribir y mantener contenido con formato enriquecido fácilmente, como blogs, artículos y más.

[El editor visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md) y el [CMS de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_CMS.md) admiten la gestión de contenido en Markdown.

Cuando se integra con una aplicación React, puedes usar un proveedor de renderizado de Markdown (como [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) para renderizar el contenido de Markdown en HTML. Esto te permite escribir contenido en Markdown mientras aseguras que se muestre correctamente en tu aplicación.

## Configuración de Contenido Markdown

Para configurar contenido Markdown en tu proyecto de Intlayer, define un diccionario de contenido que utilice la función `md`.

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

// Definición del diccionario de contenido con Markdown
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Mi título \n\nLorem Ipsum"),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Mi título \n\nLorem Ipsum"),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Mi título \n\nLorem Ipsum"),
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
      "markdown": "## Mi título \n\nLorem Ipsum"
    }
  }
}
```

## Importar archivo `.md` (multilingüe)

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// Esta declaración permite que TypeScript reconozca e importe archivos Markdown (.md) como módulos.
// Sin esto, TypeScript lanzaría un error al intentar importar archivos Markdown,
// ya que no admite de forma nativa la importación de archivos no relacionados con código.

declare module "*.md";
```

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";
import { readFileSync } from "fs";
import { resolve } from "path";

import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

// Diccionario de contenido con soporte multilingüe
const markdownDictionary = {
  key: "app",
  content: {
    contentImport: t({
      es: md(markdown_es),
      en: md(markdown_en),
      fr: md(markdown_fr),
    }),
    contentRequire: md(require("./myMarkdown.md")),
    contentAsyncImport: md(
      import("./myMarkdown.md").then((module) => module.default)
    ),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md, t } from "intlayer";
import { readFileSync } from "fs";
import { resolve } from "path";

import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    contentImport: t({
      es: md(markdown_es),
      en: md(markdown_en),
      fr: md(markdown_fr),
    }),
    contentRequire: md(require("./myMarkdown.md")),
    contentAsyncImport: md(
      import("./myMarkdown.md").then((module) => module.default)
    ),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md, t } = require("intlayer");

const markdown_en = require("./myMarkdown.en.md");
const markdown_fr = require("./myMarkdown.fr.md");
const markdown_es = require("./myMarkdown.es.md");

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    contentImport: t({
      es: md(markdown_es),
      en: md(markdown_en),
      fr: md(markdown_fr),
    }),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
};

module.exports = markdownDictionary;
```

```jsonc fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
// - Importar archivos externos Markdown (.md) solo es posible utilizando archivos de declaración JS o TS.
// - Obtener contenido Markdown externo solo es posible utilizando archivos de declaración JS o TS.

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "translation",
      "translation": {
        "es": {
          "nodeType": "markdown",
          "markdown": "# Mi Markdown\n\nEsto es un contenido Markdown.",
        },
        "en": {
          "nodeType": "markdown",
          "markdown": "# My Markdown\n\nThis is a Markdown content.",
        },
        "fr": {
          "nodeType": "markdown",
          "markdown": "# Mon Markdown\n\nC'est un contenu Markdown.",
        },
      },
    },
  },
}
```

## Usar Markdown con React Intlayer

Para renderizar el contenido Markdown en una aplicación React, puedes usar el hook `useIntlayer` del paquete `react-intlayer` junto con un proveedor de renderizado de Markdown. En este ejemplo, usamos el paquete [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) para convertir el Markdown en HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

// Componente principal para renderizar contenido Markdown
const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

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

// Componente principal para renderizar contenido Markdown
const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

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

// Componente principal para renderizar contenido Markdown
const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

AppProvider = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);

  AppProvider,
};
```

En esta implementación:

- El `MarkdownProvider` envuelve la aplicación (o la parte relevante de ella) y acepta una función `renderMarkdown`. Esta función se utiliza para convertir cadenas de Markdown en JSX utilizando el paquete `markdown-to-jsx`.
- El hook `useIntlayer` se utiliza para recuperar el contenido de Markdown (`myMarkdownContent`) del diccionario con la clave `"app"`.
- El contenido de Markdown se renderiza directamente en el componente, y el renderizado de Markdown es manejado por el proveedor.

### Usando Markdown con Next Intlayer

La implementación utilizando el paquete `next-intlayer` es similar a la anterior. La única diferencia es que la función `renderMarkdown` debe pasarse al componente `MarkdownProvider` en un componente cliente.

```tsx title="src/providers/IntlayerMarkdownProvider.tsx" codeFormat="typescript"
"use client";

import type { FC, PropsWithChildren } from "react";
import { MarkdownProvider } from "next-intlayer";

const renderMarkdown = (markdown: string) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
```

```jsx title="src/providers/IntlayerMarkdownProvider.msx" codeFormat="esm"
"use client";

import { MarkdownProvider } from "next-intlayer";

const renderMarkdown = (markdown) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

export const IntlayerMarkdownProvider = ({ children }) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
```

```jsx title="src/providers/IntlayerMarkdownProvider.csx" codeFormat="commonjs"
"use client";

const { MarkdownProvider } = require("next-intlayer");

const renderMarkdown = (markdown) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

const IntlayerMarkdownProvider = ({ children }) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
```

## Recursos Adicionales

- [Documentación de Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md)
- [Documentación de React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md)
- [Documentación de Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md)
- [markdown-to-jsx en npm](https://www.npmjs.com/package/markdown-to-jsx)

Estos recursos proporcionan información adicional sobre cómo configurar y usar Intlayer con varios tipos de contenido y frameworks.
