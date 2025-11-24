---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Ekleme
description: İçeriğinizde ekleme yer tutucularını nasıl bildireceğinizi ve kullanacağınızı öğrenin. Bu dokümantasyon, önceden tanımlanmış içerik yapıları içinde değerleri dinamik olarak ekleme adımlarında size rehberlik eder.
keywords:
  - Ekleme
  - Dinamik İçerik
  - Yer Tutucular
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - insertion
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Ekleme İçeriği / Intlayer'da Ekleme

## Ekleme Nasıl Çalışır

Intlayer'da ekleme içeriği, `insertion` fonksiyonu aracılığıyla gerçekleştirilir ve bir dizedeki yer tutucu alanlarını (örneğin `{{name}}` veya `{{age}}`) çalışma zamanında dinamik olarak değiştirilebilir olarak tanımlar. Bu yaklaşım, uygulamanızdan geçirilen verilere göre içeriğin belirli bölümlerinin belirlendiği esnek, şablon benzeri dizeler oluşturmanıza olanak sağlar.

React Intlayer veya Next Intlayer ile entegre edildiğinde, her yer tutucu için değerleri içeren veri nesnesini sağlamanız yeterlidir ve Intlayer yer tutucuların değiştirildiği içerikle otomatik olarak işler.

## Ekleme İçeriğini Ayarlama

Intlayer projenizde ekleme içeriğini ayarlamak için, ekleme tanımlarınızı içeren bir içerik modülü oluşturun. Aşağıda çeşitli formatlarda örnekler verilmiştir.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Merhaba, adım {{name}} ve {{age}} yaşındayım!"),
  },
} satisfies Dictionary;

export default myInsertionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { insert } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Merhaba, adım {{name}} ve {{age}} yaşındayım!"),
  },
};

export default myInsertionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { insert } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Merhaba, adım {{name}} ve {{age}} yaşındayım!"),
  },
};

module.exports = myInsertionContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myInsertion": {
      "nodeType": "insertion",
      "insertion": "Merhaba, adım {{name}} ve {{age}} yaşındayım!",
    },
  },
}
```

## React Intlayer ile Ekleme İçeriğini Kullanma

Bir React bileşeninde ekleme içeriğini kullanmak için, `react-intlayer` paketinden `useIntlayer` hook'unu içe aktarın ve kullanın. Bu hook, belirtilen anahtar için içeriği alır ve içeriğinizdeki her yer tutucuyu görüntülemek istediğiniz değere eşleyen bir nesne geçmenizi sağlar.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Çıktı: "Merhaba, adım John ve 30 yaşındayım!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Aynı eklemeyi farklı değerlerle yeniden kullanabilirsiniz */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Çıktı: "Merhaba, adım John ve 30 yaşındayım!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Aynı eklemeyi farklı değerlerle yeniden kullanabilirsiniz */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Çıktı: "Merhaba, adım John ve 30 yaşındayım!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Aynı eklemeyi farklı değerlerle yeniden kullanabilirsiniz */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## Ek Kaynaklar

Yapılandırma ve kullanım hakkında daha detaylı bilgi için aşağıdaki kaynaklara başvurun:

- [Intlayer CLI Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
- [React Intlayer Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)
- [Next Intlayer Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)

Bu kaynaklar, çeşitli ortamlar ve çerçevelerde Intlayer'ın kurulumu ve kullanımı hakkında daha fazla bilgi sunar.
