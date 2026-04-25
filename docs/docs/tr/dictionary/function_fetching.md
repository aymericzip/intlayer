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
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
---

# Fonksiyon Getirme

Intlayer, içerik modüllerinizde senkron veya asenkron içerik fonksiyonları bildirmenize izin verir. Uygulama oluşturulduğunda, Intlayer bu fonksiyonları çalıştırarak fonksiyonun sonucunu elde eder. Dönüş değeri bir JSON nesnesi veya dize veya sayı gibi basit bir değer olmalıdır.

> Uyarı: fonksiyon getirme şu anda JSON içerik bildiriminde ve uzak içerik bildirim dosyalarında mevcut değildir.

## Fonksiyon Bildirimleri

Basit bir senkron fonksiyon getirme içeriği örneği:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "Bu, bir fonksiyon tarafından oluşturulan içeriktir",
  },
} satisfies Dictionary;

export default functionContent;
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

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
JSON dosyasından içerik getirmenin bir yolu yok, bunun yerine .ts veya .js dosyası kullanın
```

Bu durumda, `fakeFetch` fonksiyonu sunucu yanıt süresini simüle etmek için bir gecikme taklit eder. Intlayer asenkron fonksiyonu çalıştırır ve sonucu `text` anahtarı için içerik olarak kullanır.

## React Bileşenlerinde Fonksiyon Tabanlı İçeriği Kullanma

Bir React bileşeninde fonksiyon tabanlı içeriği kullanmak için, `react-intlayer`'dan `useIntlayer`'ı içe aktarmanız ve içeriği almak için içerik ID'si ile çağırmanız gerekir. İşte bir örnek:

```typescript fileName="**/*.jsx" codeFormat={["typescript", "esm", "commonjs"]}
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
