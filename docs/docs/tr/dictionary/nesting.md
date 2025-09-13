---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Sözlüklerin iç içe yerleştirilmesi
description: Intlayer'da içerik iç içe yerleştirmeyi kullanarak çok dilli içeriğinizi yeniden kullanmayı ve yapılandırmayı verimli bir şekilde nasıl yapacağınızı öğrenin. Bu dokümantasyonu takip ederek projenizde iç içe yerleştirmeyi sorunsuz bir şekilde uygulayın.
keywords:
  - İç İçe Yerleştirme
  - İçerik Yeniden Kullanılabilirliği
  - Dokümantasyon
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - nesting
---

# İç İçe Yerleştirme / Alt İçerik Referansı

## İç İçe Yerleştirme Nasıl Çalışır

Intlayer'da iç içe yerleştirme, `nest` fonksiyonu aracılığıyla gerçekleştirilir ve başka bir sözlükten içeriği referans almanıza ve yeniden kullanmanıza olanak sağlar. İçeriği çoğaltmak yerine, mevcut bir içerik modülünü anahtarına göre işaret edebilirsiniz.

## İç İçe Yerleştirmeyi Ayarlama

Intlayer projenizde iç içe yerleştirmeyi ayarlamak için, önce yeniden kullanmak istediğiniz temel içeriği tanımlayın. Ardından, ayrı bir içerik modülünde, o içeriği içe aktarmak için `nest` fonksiyonunu kullanın.

### Temel Sözlük

Aşağıda, başka bir sözlükte iç içe yerleştirilecek temel sözlük örneği verilmiştir:

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary } from "intlayer";

const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
} satisfies Dictionary;

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

module.exports = firstDictionary;
```

```json fileName="firstDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_first_dictionary",
  "content": {
    "content": "content",
    "subContent": {
      "contentNumber": 0,
      "contentString": "string"
    }
  }
}
```

### Nest ile Referans Alma

Şimdi, yukarıdaki içeriği referans almak için `nest` fonksiyonunu kullanan başka bir içerik modülü oluşturun. Tüm içeriği veya belirli bir iç içe değeri referans alabilirsiniz:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat="typescript"
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // Tüm sözlüğü referans alır:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // Belirli bir iç içe değeri referans alır:
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.mjs" contentDeclarationFormat="esm"
import { nest } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { nest } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

module.exports = myNestingContent;
```

```json fileName="secondDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_second_dictionary",
  "content": {
    "fullNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary"
      }
    },
    "partialNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary",
        "path": "subContent.contentNumber"
      }
    }
  }
}
```

İkinci parametre olarak, o içerik içindeki iç içe bir değere giden bir yol belirtebilirsiniz. Yol sağlanmadığında, referans alınan sözlüğün tüm içeriği döndürülür.

## React Intlayer ile İç İçe Yerleştirmeyi Kullanma

Bir React bileşeninde iç içe yerleştirilmiş içeriği kullanmak için, `react-intlayer` paketinden `useIntlayer` hook'unu kullanın. Bu hook, belirtilen anahtara göre doğru içeriği alır. İşte nasıl kullanılacağına dair bir örnek:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Tam İç İçe Yerleştirilmiş İçerik: {JSON.stringify(fullNestedContent)}
        {/* Çıktı: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Kısmi İç İçe Yerleştirilmiş Değer: {partialNestedContent}
        {/* Çıktı: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Tam İç İçe Yerleştirilmiş İçerik: {JSON.stringify(fullNestedContent)}
        {/* Çıktı: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Kısmi İç İçe Yerleştirilmiş Değer: {partialNestedContent}
        {/* Çıktı: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.cjx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Tam İç İçe Yerleştirilmiş İçerik: {JSON.stringify(fullNestedContent)}
        {/* Çıktı: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Kısmi İç İçe Yerleştirilmiş Değer: {partialNestedContent}
        {/* Çıktı: 0 */}
      </p>
    </div>
  );
};

module.exports = NestComponent;
```

## Ek Kaynaklar

Yapılandırma ve kullanım hakkında daha detaylı bilgi için aşağıdaki kaynaklara başvurun:

- [Intlayer CLI Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md)
- [React Intlayer Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)
- [Next Intlayer Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)

Bu kaynaklar, farklı ortamlar ve çeşitli çerçevelerde Intlayer'ın kurulumu ve kullanımı hakkında daha fazla bilgi sağlar.

## Dokümantasyon Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |

```

```
