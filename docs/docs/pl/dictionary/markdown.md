---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Markdown
description: Dowiedz się, jak deklarować i używać zawartości Markdown na swojej wielojęzycznej stronie internetowej z Intlayer. Postępuj zgodnie z krokami w tej dokumentacji online, aby bezproblemowo zintegrować Markdown z Twoim projektem.
keywords:
  - Markdown
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - markdown
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Markdown / Zawartość tekstu sformatowanego

## Jak działa Markdown

Intlayer obsługuje zawartość tekstu sformatowanego zdefiniowaną za pomocą składni Markdown. Osiąga się to poprzez funkcję `md`, która konwertuje łańcuch Markdown na format, którym może zarządzać Intlayer. Korzystając z Markdown, możesz łatwo pisać i utrzymywać treści z bogatym formatowaniem, takie jak blogi, artykuły i inne.

[Edytor wizualny Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) oraz [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md) oba wspierają zarządzanie zawartością Markdown.

Po integracji z aplikacją React możesz użyć dostawcy renderującego Markdown (takiego jak [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)), aby wyrenderować zawartość Markdown do HTML. Pozwala to pisać treści w Markdown, jednocześnie zapewniając ich poprawne wyświetlanie w Twojej aplikacji.

## Konfiguracja zawartości Markdown

Aby skonfigurować zawartość Markdown w swoim projekcie Intlayer, zdefiniuj słownik zawartości, który wykorzystuje funkcję `md`.

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

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
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Mój tytuł \n\nLorem Ipsum"),
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
    myMarkdownContent: md("## Mój tytuł \n\nLorem Ipsum"),
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
      "markdown": "## Mój tytuł \n\nLorem Ipsum"
    }
  }
}
```

## Importowanie (wielojęzyczne) pliku `.md`

Jeśli Twój plik Markdown to plik `.md`, możesz go importować, korzystając z różnych formatów importu udostępnianych przez JavaScript lub Intlayer.

Zaleca się priorytetowe korzystanie z importu za pomocą funkcji [`file`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/file.md), ponieważ pozwala to Intlayer na prawidłowe zarządzanie ścieżkami względem lokalizacji pliku oraz zapewnia integrację tego pliku z Edytorem Wizualnym / CMS.

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// To deklaracja pozwala TypeScript rozpoznawać i importować pliki Markdown (.md) jako moduły.
// Bez tego TypeScript zgłosiłby błąd podczas próby importu plików Markdown,
// ponieważ natywnie nie obsługuje importów plików niebędących kodem.

declare module "*.md";
```

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, file, t, type Dictionary } from "intlayer";
import { readFileSync } from "fs";
import { resolve } from "path";

import markdown from "./myMarkdown.md";

const markdownDictionary = {
  key: "app",
  content: {
    contentMultilingualFile: t({
      en: md(file("./myMarkdown.en.md")),
      fr: md(file("./myMarkdown.fr.md")),
      es: md(file("./myMarkdown.es.md")),
    }),

    contentImport: md(markdown),
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
import { md, file, t } from "intlayer";
import { readFileSync } from "fs";
import { resolve } from "path";

import markdown from "./myMarkdown.md";

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    contentMultilingualFile: t({
      en: md(file("./myMarkdown.en.md")),
      fr: md(file("./myMarkdown.fr.md")),
      es: md(file("./myMarkdown.es.md")),
    }),

    contentImport: md(markdown),
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
const { md, file, t } = require("intlayer");

const markdown_en = require("./myMarkdown.en.md");
const markdown_fr = require("./myMarkdown.fr.md");
const markdown_es = require("./myMarkdown.es.md");

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    contentMultilingualFile: t({
      en: md(file("./myMarkdown.en.md")),
      fr: md(file("./myMarkdown.fr.md")),
      es: md(file("./myMarkdown.es.md")),
    }),

    contentImport: md(markdown),
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
// - Importowanie zewnętrznych plików Markdown (.md) jest możliwe tylko przy użyciu węzła `file` lub plików deklaracji JS lub TS.
// - Pobieranie zewnętrznej zawartości Markdown jest możliwe tylko przy użyciu plików deklaracji JS lub TS.

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "": {
      "nodeType": "file",
      "file": "./myMarkdown.md"
    }
  },

  "contentMultilingualFile": {
    "nodeType": "translation",
    "translation": {
      "en": {
        "nodeType": "markdown",
        "markdown": {
          "nodeType": "file",
          "file": "./myMarkdown.en.md"
        }
      },
      "fr": {
        "nodeType": "markdown",
        "markdown": {
          "nodeType": "file",
          "file": "./myMarkdown.fr.md"
        }
// - Importowanie zewnętrznych plików Markdown (.md) jest możliwe tylko za pomocą węzła `file` lub plików deklaracji JS lub TS.
// - Pobieranie zewnętrznej zawartości Markdown jest możliwe tylko za pomocą plików deklaracji JS lub TS.

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "": {
        "nodeType": "file",
        "file": "./myMarkdown.md",
      },
    },

    "contentMultilingualFile": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "markdown",
          "markdown": {
            "nodeType": "file",
            "file": "./myMarkdown.en.md",
          },
        },
        "fr": {
          "nodeType": "markdown",
          "markdown": {
            "nodeType": "file",
            "file": "./myMarkdown.fr.md",
          },
        },
        "es": {
          "nodeType": "markdown",
          "markdown": {
            "nodeType": "file",
            "file": "./myMarkdown.es.md",
          },
        },
      },
    },
  },
}
```

## Używanie Markdown z React Intlayer

Aby renderować zawartość Markdown w aplikacji React, możesz wykorzystać hook `useIntlayer` z pakietu `react-intlayer` wraz z dostawcą renderowania Markdown. W tym przykładzie używamy pakietu [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx), aby przekonwertować Markdown na HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

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

module.exports = {
  AppProvider,
};
```

W tej implementacji:

- `MarkdownProvider` otacza aplikację (lub odpowiednią jej część) i przyjmuje funkcję `renderMarkdown`. Funkcja ta służy do konwersji łańcuchów Markdown na JSX za pomocą pakietu `markdown-to-jsx`.
- Hook `useIntlayer` jest używany do pobierania zawartości Markdown (`myMarkdownContent`) ze słownika pod kluczem `"app"`.
- Zawartość Markdown jest renderowana bezpośrednio w komponencie, a renderowanie Markdown jest obsługiwane przez providera.

### Używanie Markdown z Next Intlayer

Implementacja z użyciem pakietu `next-intlayer` jest podobna do powyższej. Jedyną różnicą jest to, że funkcja `renderMarkdown` powinna być przekazana do komponentu `MarkdownProvider` w komponencie klienta.

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

## Dodatkowe zasoby

- [Dokumentacja Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md)
- [Dokumentacja React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md)
- [Dokumentacja Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)
- [markdown-to-jsx na npm](https://www.npmjs.com/package/markdown-to-jsx)

Te zasoby dostarczają dodatkowych informacji na temat konfiguracji i używania Intlayer z różnymi typami treści i frameworkami.
