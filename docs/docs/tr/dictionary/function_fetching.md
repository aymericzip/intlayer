---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Fonksiyon Getirme
description: Çok dilli web sitenizde fonksiyon getirmeyi nasıl bildireceğinizi ve kullanacağınızı keşfedin. Bu çevrimiçi dokümantasyonun adımlarını takip ederek projenizi birkaç dakikada kurun.
keywords:
  - Fonksiyon Getirme
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
  - function-fetching
---

# Fonksiyon Getirme

Intlayer, içerik modüllerinizde senkron veya asenkron içerik fonksiyonları bildirmenize izin verir. Uygulama oluşturulduğunda, Intlayer bu fonksiyonları çalıştırarak fonksiyonun sonucunu elde eder. Dönüş değeri bir JSON nesnesi veya dize veya sayı gibi basit bir değer olmalıdır.

> Uyarı: fonksiyon getirme şu anda JSON içerik bildiriminde ve uzak içerik bildirim dosyalarında mevcut değildir.

## Fonksiyon Bildirimleri

Basit bir senkron fonksiyon getirme içeriği örneği:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "Bu, bir fonksiyon tarafından oluşturulan içeriktir",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Bu, bir fonksiyon tarafından oluşturulan içeriktir",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Bu, bir fonksiyon tarafından oluşturulan içeriktir",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "Bu, bir fonksiyon tarafından oluşturulan içeriktir"
  }
}
```

Bu örnekte, `text` anahtarı bir dize döndüren bir fonksiyon içerir. Bu içerik, `react-intlayer` gibi Intlayer'ın yorumlayıcı paketlerini kullanarak React bileşenlerinizde oluşturulabilir.

## Asenkron Fonksiyon Getirme

Senkron fonksiyonlara ek olarak, Intlayer harici kaynaklardan veri getirmenize veya sahte verilerle veri getirmeyi simüle etmenize izin veren asenkron fonksiyonları destekler.

Aşağıda, bir sunucu getirmesini simüle eden asenkron bir fonksiyon örneği verilmiştir:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Sunucudan getirmeyi simüle etmek için 200ms bekleyin
  return await setTimeout(200).then(() => "Bu, sunucudan getirilen içeriktir");
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies Dictionary;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // Sunucudan getirmeyi simüle etmek için 200ms bekleyin
  await setTimeout(200);
  return "Bu, sunucudan getirilen içeriktir";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // Sunucudan getirmeyi simüle etmek için 200ms bekleyin
  await setTimeout(200);
  return "Bu, sunucudan getirilen içeriktir";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
JSON dosyasından içerik getirmenin bir yolu yok, bunun yerine .ts veya .js dosyası kullanın
```

Bu durumda, `fakeFetch` fonksiyonu sunucu yanıt süresini simüle etmek için bir gecikme taklit eder. Intlayer asenkron fonksiyonu çalıştırır ve sonucu `text` anahtarı için içerik olarak kullanır.

## React Bileşenlerinde Fonksiyon Tabanlı İçeriği Kullanma

Bir React bileşeninde fonksiyon tabanlı içeriği kullanmak için, `react-intlayer`'dan `useIntlayer`'ı içe aktarmanız ve içeriği almak için içerik ID'si ile çağırmanız gerekir. İşte bir örnek:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Çıktı: Bu, bir fonksiyon tarafından oluşturulan içeriktir */}
      <p>{asyncFunctionContent.text}</p>
      {/* Çıktı: Bu, sunucudan getirilen içeriktir */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Çıktı: Bu, bir fonksiyon tarafından oluşturulan içeriktir */}
      <p>{asyncFunctionContent.text}</p>
      {/* Çıktı: Bu, sunucudan getirilen içeriktir */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Çıktı: Bu, bir fonksiyon tarafından oluşturulan içeriktir */}
      <p>{asyncFunctionContent.text}</p>
      {/* Çıktı: Bu, sunucudan getirilen içeriktir */}
    </div>
  );
};

module.exports = MyComponent;
```

## Dokümantasyon Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |

```

```
