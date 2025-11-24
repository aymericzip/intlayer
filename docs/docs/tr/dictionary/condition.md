---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Koşullu İçerik
description: Intlayer'da koşullu içeriği kullanarak belirli koşullara göre içeriği dinamik olarak nasıl görüntüleyeceğinizi öğrenin. Bu dokümantasyonu takip ederek projenizde koşulları verimli bir şekilde uygulayın.
keywords:
  - Koşullu İçerik
  - Dinamik Oluşturma
  - Dokümantasyon
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - condition
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Koşullu İçerik / Intlayer'da Koşul

## Koşul Nasıl Çalışır

Intlayer'da koşullu içerik, `cond` fonksiyonu aracılığıyla gerçekleştirilir ve belirli koşulları (genellikle boolean değerler) karşılık gelen içeriklerine eşler. Bu yaklaşım, verilen koşula göre içeriği dinamik olarak seçmenizi sağlar. React Intlayer veya Next Intlayer ile entegre edildiğinde, çalışma zamanında sağlanan koşula göre uygun içerik otomatik olarak seçilir.

## Koşullu İçeriği Ayarlama

Intlayer projenizde koşullu içeriği ayarlamak için, koşullu tanımlarınızı içeren bir içerik modülü oluşturun. Aşağıda çeşitli formatlarda örnekler verilmiştir.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "doğru olduğunda içeriğim",
      false: "yanlış olduğunda içeriğim",
      fallback: "koşul başarısız olduğunda içeriğim", // İsteğe bağlı
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { cond } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "doğru olduğunda içeriğim",
      false: "yanlış olduğunda içeriğim",
      fallback: "koşul başarısız olduğunda içeriğim", // İsteğe bağlı
    }),
  },
};

export default myConditionalContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { cond } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "doğru olduğunda içeriğim",
      false: "yanlış olduğunda içeriğim",
      fallback: "koşul başarısız olduğunda içeriğim", // İsteğe bağlı
    }),
  },
};

module.exports = myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "doğru olduğunda içeriğim",
        "false": "yanlış olduğunda içeriğim",
        "fallback": "koşul başarısız olduğunda içeriğim", // İsteğe bağlı
      },
    },
  },
}
```

> Eğer hiçbir fallback bildirilmezse, koşul doğrulanmazsa bildirilen son anahtar fallback olarak alınacaktır.

## React Intlayer ile Koşullu İçeriği Kullanma

Bir React bileşeninde koşullu içeriği kullanmak için, `react-intlayer` paketinden `useIntlayer` hook'unu içe aktarın ve kullanın. Bu hook, belirtilen anahtar için içeriği getirir ve uygun çıktıyı seçmek için bir koşul geçmenizi sağlar.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Çıktı: doğru olduğunda içeriğim */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Çıktı: yanlış olduğunda içeriğim */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Çıktı: koşul başarısız olduğunda içeriğim */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Çıktı: koşul başarısız olduğunda içeriğim */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Çıktı: doğru olduğunda içeriğim */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Çıktı: yanlış olduğunda içeriğim */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Çıktı: koşul başarısız olduğunda içeriğim */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Çıktı: koşul başarısız olduğunda içeriğim */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Çıktı: doğru olduğunda içeriğim */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Çıktı: yanlış olduğunda içeriğim */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Çıktı: koşul başarısız olduğunda içeriğim */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Çıktı: koşul başarısız olduğunda içeriğim */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

module.exports = ConditionalComponent;
```

## Ek Kaynaklar

Yapılandırma ve kullanım hakkında daha detaylı bilgi için aşağıdaki kaynaklara başvurun:

- [Intlayer CLI Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
- [React Intlayer Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)
- [Next Intlayer Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)

Bu kaynaklar, çeşitli ortamlar ve çerçevelerde Intlayer'ın kurulumu ve kullanımı hakkında daha fazla bilgi sunar.
