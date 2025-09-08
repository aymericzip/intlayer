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
---

# Dosya İçeriği / Intlayer'da Dosyaları Gömme

## Dosya Gömme Nasıl Çalışır

Intlayer'da `file` fonksiyonu, harici dosya içeriğini bir sözlüğe gömmeyi sağlar. Bu yaklaşım, Intlayer'ın kaynak dosyayı tanımasını sağlar ve Intlayer Görsel Düzenleyici ve CMS ile sorunsuz entegrasyonu sağlar. Doğrudan `import`, `require` veya `fs` dosya okuma yöntemlerinden farklı olarak, `file` kullanmak dosyayı sözlükle ilişkilendirir ve Intlayer'ın dosya düzenlendiğinde içeriği dinamik olarak takip etmesine ve güncellemesine izin verir.

## Dosya İçeriğini Ayarlama

Intlayer projenizde dosya içeriğini gömmek için, bir içerik modülünde `file` fonksiyonunu kullanın. Aşağıda farklı uygulamaları gösteren örnekler verilmiştir.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

export default myFileContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

module.exports = myFileContent;
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

Bir React bileşeninde gömülü dosya içeriğini kullanmak için, `react-intlayer` paketinden `useIntlayer` hook'unu içe aktarın ve kullanın. Bu, belirtilen anahtardan içeriği alır ve dinamik olarak görüntülenmesine izin verir.

```tsx fileName="**/*.tsx" codeFormat="typescript"
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

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

module.exports = FileComponent;
```

## Çok Dilli Markdown Örneği

Düzenlenebilir çok dilli Markdown dosyalarını desteklemek için, farklı dil sürümlerindeki bir Markdown içerik dosyasını tanımlamak üzere `file`'ı `t()` ve `md()` ile birlikte kullanabilirsiniz.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file, t, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
};

export default myMultilingualContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file, t, md } = require("intlayer");

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
};
```

Bu kurulum, içeriğin kullanıcının dil tercihine göre dinamik olarak alınmasına izin verir. Intlayer Görsel Düzenleyici veya CMS'de kullanıldığında, sistem içeriğin belirtilen Markdown dosyalarından geldiğini tanır ve düzenlenebilir kalmasını sağlar.

## Intlayer Dosya İçeriğini Nasıl Yönetir

`file` fonksiyonu, belirtilen dosyanın içeriğini okumak ve sözlüğe eklemek için Node.js'in `fs` modülüne dayanır. Intlayer Görsel Düzenleyici veya CMS ile birlikte kullanıldığında, Intlayer sözlük ile dosya arasındaki ilişkiyi takip edebilir. Bu, Intlayer'ın şunları yapmasına izin verir:

- İçeriğin belirli bir dosyadan geldiğini tanımak.
- Bağlantılı dosya düzenlendiğinde sözlük içeriğini otomatik olarak güncellemek.
- Dosya ve sözlük arasında senkronizasyonu sağlamak ve içeriğin bütünlüğünü korumak.

## Ek Kaynaklar

Intlayer'da dosya gömmenin yapılandırılması ve kullanımı hakkında daha fazla ayrıntı için aşağıdaki kaynaklara başvurun:

- [Intlayer CLI Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md)
- [React Intlayer Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)
- [Next Intlayer Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)
- [Markdown İçerik Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md)
- [Çeviri İçerik Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/translation.md)

Bu kaynaklar, dosya gömmesi, içerik yönetimi ve çeşitli çerçevelerle Intlayer'ın entegrasyonu hakkında daha fazla bilgi sağlar.

## Dokümantasyon Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |

```

```
