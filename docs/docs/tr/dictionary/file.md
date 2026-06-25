---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Dosya
description: `file` fonksiyonunu kullanarak içerik sözlüğünüzde harici dosyaları nasıl gömeceğinizi öğrenin. Bu dokümantasyon, Intlayer'ın dosya içeriğini nasıl bağladığını ve dinamik olarak yönettiğini açıklar.
keywords:
  - Dosya
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
  - file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
author: aymericzip 
---

# Dosya İçeriği / Intlayer'da Dosyaları Gömme

## Dosya Gömme Nasıl Çalışır

Intlayer'da `file` fonksiyonu, harici dosya içeriğini bir sözlüğe gömmeyi sağlar. Bu yaklaşım, Intlayer'ın kaynak dosyayı tanımasını sağlar ve Intlayer Görsel Düzenleyici ve CMS ile sorunsuz entegrasyonu sağlar. Doğrudan `import`, `require` veya `fs` dosya okuma yöntemlerinden farklı olarak, `file` kullanmak dosyayı sözlükle ilişkilendirir ve Intlayer'ın dosya düzenlendiğinde içeriği dinamik olarak takip etmesine ve güncellemesine izin verir.

## Dosya İçeriğini Ayarlama

Intlayer projenizde dosya içeriğini gömmek için, bir içerik modülünde `file` fonksiyonunu kullanın. Aşağıda farklı uygulamaları gösteren örnekler verilmiştir.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myFile": {
      "nodeType": "file",
      "value": "./path/to/file.txt",
    },
  },
}
```

## React Intlayer ile Dosya İçeriğini Kullanma

<Tabs group="framework">
  <Tab label="React" value="react">

To use embedded file content in a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This retrieves the content from the specified key and allows it to be displayed dynamically.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use embedded file content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To use embedded file content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myFile } = useIntlayer("my_key");
</script>

<template>
  <div>
    <pre>{{ myFile }}</pre>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use embedded file content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <pre>{$content.myFile}</pre>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use embedded file content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To use embedded file content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const FileComponent: Component = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use embedded file content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-file",
  template: `
    <div>
      <pre>{{ content().myFile }}</pre>
    </div>
  `,
})
export class FileComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use embedded file content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("file-content")!.textContent = newContent.myFile;
});

// Initial render
document.getElementById("file-content")!.textContent = content.myFile;
```

  </Tab>
</Tabs>

## Çok Dilli Markdown Örneği

Düzenlenebilir çok dilli Markdown dosyalarını desteklemek için, farklı dil sürümlerindeki bir Markdown içerik dosyasını tanımlamak üzere `file`'ı `t()` ve `md()` ile birlikte kullanabilirsiniz.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

Bu kurulum, içeriğin kullanıcının dil tercihine göre dinamik olarak alınmasına izin verir. Intlayer Görsel Düzenleyici veya CMS'de kullanıldığında, sistem içeriğin belirtilen Markdown dosyalarından geldiğini tanır ve düzenlenebilir kalmasını sağlar.

## Farklı yol türleri

`file` fonksiyonunu kullanırken, yerleştirmek istediğiniz dosyayı belirtmek için farklı yol türlerini kullanabilirsiniz.

- `file("./path/to/file.txt")` - Geçerli dosyaya göre göreli yol
- `file("path/to/file.txt")` - Proje kök dizinine göre göreli yol
- `file("/users/username/path/to/file.txt")` - Mutlak yol

## Intlayer Dosya İçeriğini Nasıl Yönetir

`file` fonksiyonu, belirtilen dosyanın içeriğini okumak ve sözlüğe eklemek için Node.js'in `fs` modülüne dayanır. Intlayer Görsel Düzenleyici veya CMS ile birlikte kullanıldığında, Intlayer sözlük ile dosya arasındaki ilişkiyi takip edebilir. Bu, Intlayer'ın şunları yapmasına izin verir:

- İçeriğin belirli bir dosyadan geldiğini tanımak.
- Bağlantılı dosya düzenlendiğinde sözlük içeriğini otomatik olarak güncellemek.
- Dosya ve sözlük arasında senkronizasyonu sağlamak ve içeriğin bütünlüğünü korumak.

## Ek Kaynaklar

Intlayer'da dosya gömmenin yapılandırılması ve kullanımı hakkında daha fazla ayrıntı için aşağıdaki kaynaklara başvurun:

- [Intlayer CLI Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
- [React Intlayer Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)
- [Next Intlayer Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)
- [Markdown İçerik Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md)
- [Çeviri İçerik Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/translation.md)

Bu kaynaklar, dosya gömmesi, içerik yönetimi ve çeşitli çerçevelerle Intlayer'ın entegrasyonu hakkında daha fazla bilgi sağlar.
