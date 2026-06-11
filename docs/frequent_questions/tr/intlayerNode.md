---
createdAt: 2026-05-07
updatedAt: 2026-05-07
title: IntlayerNode tipi. Nedir bu?
description: IntlayerNode tipi nedir? Neden dizgim bir IntlayerNode&lt;string&gt; olarak dönüştürülüyor?
keywords:
  - Giriş
  - Başlarken
  - Intlayer
  - Uygulama
  - Paketler
slugs:
  - frequent-questions
  - intlayer-node
history:
  - version: 8.9.0
    date: 2026-05-07
    changes: "Doküman başlatıldı"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# IntlayerNode tipi nedir?

`IntlayerNode<T>` tipi, `next-intlayer`, `react-intlayer`, `vue-intlayer`, `preact-intlayer`, `solid-intlayer`, `angular-intlayer`, `svelte-intlayer`, `lit-intlayer` ve `vanilla-intlayer` gibi intlayer paketleri tarafından sağlanan özel bir tiptir.

## Kullanım örneği

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Preact",
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Preact"
  }
}
```

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

```tsx fileName="src/App.tsx"
import { useIntlayer } from "react-intlayer";

const AppContent = () => {
  const { title } = useIntlayer("app");

  return title; // şu tipi döndürür: IntlayerNode&lt;string&gt;
};
```

  </Tab>

// Todo Diğer framework'leri docs/docs/tr/dictionary/markdown.md'de olduğu gibi sekme olarak ekleyin
</Tabs>

### Intlayer neden bir IntlayerNode ekler?

Intlayer, CMS / Görsel Düzenleyici bağlamında Görsel Düzenleyici Seçicilerini (Selectors) oluşturabilmek için bir IntlayerNode ekler.

![Görsel Düzenleyici demosu](https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/visual_editor.gif?raw=true)

Bir IntlayerNode; zenginleştirilmiş bir React/Vue/Preact/Solid/Angular/Svelte/Lit/Vanilla düğümüdür, ancak aynı zamanda temel ilkel (primitive) düğümün özelliklerine erişim de sağlar.

Örneğin:

```js
const content = useIntlayer("app");

// String Durumu
content.title; // IntlayerNode&lt;string&gt; döndürür
content.title.value; // Temel içeriği döndürür, burada bir string

content.title.toString(); // String döndürür
content.title.toLowerCase(); // String döndürür
String(content.title); // String döndürür
content.title.toUpperCase(); // Büyük harfe çevrilmiş string döndürür
content.title.replace("a", "b"); // Değiştirilmiş string döndürür
// ...
```

> Bir IntlayerNode'un özelliklerine erişmek çalışacaktır ancak Görsel Düzenleyici'de seçicileri görüntüleme yeteneğini bozacaktır.

> IntlayerNode ayrıca sayıları veya `IntlayerNode<number>` gibi diğer tipleri de sarmalayabilir.
