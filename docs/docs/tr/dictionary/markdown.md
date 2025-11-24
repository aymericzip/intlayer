---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Markdown
description: Intlayer ile çok dilli web sitenizde Markdown içeriği nasıl bildireceğinizi ve kullanacağınızı öğrenin. Bu çevrimiçi dokümantasyonun adımlarını takip ederek Markdown'ı projenize sorunsuz bir şekilde entegre edin.
keywords:
  - Markdown
  - Uluslararasılaştırma
  - Dokümantasyon
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
    changes: Geçmiş başlatıldı
---

# Markdown / Zengin Metin İçeriği

## Markdown Nasıl Çalışır

Intlayer, Markdown sözdizimi kullanılarak tanımlanan zengin metin içeriğini destekler. Bu, bir Markdown dizesini Intlayer tarafından yönetilebilecek bir biçime dönüştüren `md` fonksiyonu aracılığıyla gerçekleştirilir. Markdown kullanarak bloglar, makaleler ve daha fazlası gibi zengin biçimlendirmeye sahip içeriği kolayca yazabilir ve bakımını yapabilirsiniz.

[Intlayer Görsel Düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) ve [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) her ikisi de Markdown içerik yönetimini destekler.

Bir React uygulamasıyla entegre edildiğinde, Markdown içeriğini HTML'ye dönüştürmek için bir Markdown oluşturma sağlayıcısı kullanabilirsiniz (örneğin [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)). Bu, Markdown'da içerik yazarken uygulamanızda düzgün görüntülenmesini sağlar.

## Markdown İçeriğini Ayarlama

Intlayer projenizde Markdown içeriğini ayarlamak için, `md` fonksiyonunu kullanan bir içerik sözlüğü tanımlayın.

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Başlığım \n\nLorem Ipsum"),
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
    myMarkdownContent: md("## Başlığım \n\nLorem Ipsum"),
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
    myMarkdownContent: md("## Başlığım \n\nLorem Ipsum"),
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
      "markdown": "## Başlığım \n\nLorem Ipsum"
    }
  }
}
```

## (Çok dilli) `.md` dosyasını içe aktarma

Markdown dosyanız bir `.md` dosyasıysa, JavaScript tarafından sağlanan farklı içe aktarma formatlarını veya Intlayer'ı kullanarak içe aktarabilirsiniz.

[`file` fonksiyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/file.md) aracılığıyla içe aktarmayı önceliklendirmeniz önerilir, çünkü bu, Intlayer'ın dosyanın konumuna göre yolları düzgün bir şekilde yönetmesine ve bu dosyanın Görsel Düzenleyici / CMS ile entegrasyonunu sağlamasına izin verir.

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// Bu bildirim, TypeScript'in Markdown (.md) dosyalarını modüller olarak tanımalarına ve içe aktarmalarına izin verir.
// Bu olmadan, TypeScript Markdown dosyalarını içe aktarmaya çalışırken hata verir,
// çünkü yerel olarak kod dışı dosya içe aktarmalarını desteklemez.

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
// - Harici Markdown dosyalarını (.md) içe aktarma sadece `file` düğümü veya JS veya TS bildirim dosyaları kullanılarak mümkündür.
// - Harici Markdown içeriğini getirme sadece JS veya TS bildirim dosyaları kullanılarak mümkündür.

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

## React Intlayer ile Markdown Kullanma

Bir React uygulamasında Markdown içeriğini oluşturmak için, `react-intlayer` paketinden `useIntlayer` hook'unu bir Markdown oluşturma sağlayıcısıyla birlikte kullanabilirsiniz. Bu örnekte, Markdown'ı HTML'ye dönüştürmek için [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) paketini kullanıyoruz.

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

Bu uygulamada:

- `MarkdownProvider`, uygulamayı (veya ilgili kısmını) sarar ve bir `renderMarkdown` fonksiyonu kabul eder. Bu fonksiyon, `markdown-to-jsx` paketini kullanarak Markdown dizelerini JSX'e dönüştürmek için kullanılır.
- `useIntlayer` hook'u, `"app"` anahtarlı sözlükten Markdown içeriğini (`myMarkdownContent`) almak için kullanılır.
- Markdown içeriği doğrudan bileşende oluşturulur ve Markdown oluşturma sağlayıcı tarafından işlenir.

### Next Intlayer ile Markdown Kullanma

`next-intlayer` paketini kullanarak uygulama yukarıdakine benzer. Tek fark, `renderMarkdown` fonksiyonunun bir istemci bileşeninde `MarkdownProvider` bileşenine geçirilmesidir.

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

## Ek Kaynaklar

- [Intlayer CLI Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
- [React Intlayer Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)
- [Next Intlayer Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)
- [markdown-to-jsx on npm](https://www.npmjs.com/package/markdown-to-jsx)

Bu kaynaklar, çeşitli içerik türleri ve çerçevelerle Intlayer'ın kurulumu ve kullanımı hakkında daha fazla bilgi sağlar.
