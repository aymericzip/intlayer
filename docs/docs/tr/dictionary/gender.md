---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Cinsiyete Dayalı İçerik
description: Intlayer'da cinsiyete dayalı içeriği kullanarak cinsiyete göre içeriği dinamik olarak nasıl görüntüleyeceğinizi öğrenin. Bu dokümantasyonu takip ederek projenizde cinsiyete özel içeriği verimli bir şekilde uygulayın.
keywords:
  - Cinsiyete Dayalı İçerik
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
  - gender
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: Cinsiyete dayalı içerik tanıtıldı
---

# Cinsiyete Dayalı İçerik / Intlayer'da Cinsiyet

## Cinsiyet Nasıl Çalışır

Intlayer'da cinsiyete dayalı içerik, belirli cinsiyet değerlerini ('male', 'female') karşılık gelen içeriklerine eşleyen `gender` fonksiyonu aracılığıyla gerçekleştirilir. Bu yaklaşım, verilen cinsiyete göre içeriği dinamik olarak seçmenizi sağlar. React Intlayer veya Next Intlayer ile entegre edildiğinde, çalışma zamanında sağlanan cinsiyete göre uygun içerik otomatik olarak seçilir.

## Cinsiyete Dayalı İçeriği Ayarlama

Intlayer projenizde cinsiyete dayalı içeriği ayarlamak için, cinsiyete özel tanımlarınızı içeren bir içerik modülü oluşturun. Aşağıda çeşitli formatlarda örnekler verilmiştir.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "erkek kullanıcılar için içeriğim",
      female: "kadın kullanıcılar için içeriğim",
      fallback: "cinsiyet belirtilmediğinde içeriğim", // İsteğe bağlı
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { gender } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "erkek kullanıcılar için içeriğim",
      female: "kadın kullanıcılar için içeriğim",
      fallback: "cinsiyet belirtilmediğinde içeriğim", // İsteğe bağlı
    }),
  },
};

export default myGenderContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { gender } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "erkek kullanıcılar için içeriğim",
      female: "kadın kullanıcılar için içeriğim",
      fallback: "cinsiyet belirtilmediğinde içeriğim", // İsteğe bağlı
    }),
  },
};

module.exports = myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "erkek kullanıcılar için içeriğim",
        "female": "kadın kullanıcılar için içeriğim",
        "fallback": "cinsiyet belirtilmediğinde içeriğim", // İsteğe bağlı
      },
    },
  },
}
```

> Eğer hiçbir fallback bildirilmezse, cinsiyet belirtilmezse veya tanımlanan herhangi bir cinsiyetle eşleşmezse bildirilen son anahtar fallback olarak alınacaktır.

## React Intlayer ile Cinsiyete Dayalı İçeriği Kullanma

Bir React bileşeninde cinsiyete dayalı içeriği kullanmak için, `react-intlayer` paketinden `useIntlayer` hook'unu içe aktarın ve kullanın. Bu hook, belirtilen anahtar için içeriği getirir ve uygun çıktıyı seçmek için bir cinsiyet geçmenizi sağlar.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Çıktı: erkek kullanıcılar için içeriğim */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Çıktı: kadın kullanıcılar için içeriğim */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Çıktı: erkek kullanıcılar için içeriğim */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Çıktı: kadın kullanıcılar için içeriğim */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Çıktı: cinsiyet belirtilmediğinde içeriğim */
          myGender("")
        }
      </p>
      <p>
        {
          /* Çıktı: cinsiyet belirtilmediğinde içeriğim */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Çıktı: erkek kullanıcılar için içeriğim */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Çıktı: kadın kullanıcılar için içeriğim */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Çıktı: erkek kullanıcılar için içeriğim */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Çıktı: kadın kullanıcılar için içeriğim */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Çıktı: cinsiyet belirtilmediğinde içeriğim */
          myGender("")
        }
      </p>
      <p>
        {
          /* Çıktı: cinsiyet belirtilmediğinde içeriğim */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Çıktı: erkek kullanıcılar için içeriğim */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Çıktı: kadın kullanıcılar için içeriğim */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Çıktı: erkek kullanıcılar için içeriğim */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Çıktı: kadın kullanıcılar için içeriğim */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Çıktı: cinsiyet belirtilmediğinde içeriğim */
          myGender("")
        }
      </p>
      <p>
        {
          /* Çıktı: cinsiyet belirtilmediğinde içeriğim */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

module.exports = GenderComponent;
```

## Ek Kaynaklar

Yapılandırma ve kullanım hakkında daha detaylı bilgi için aşağıdaki kaynaklara başvurun:

- [Intlayer CLI Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md)
- [React Intlayer Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)
- [Next Intlayer Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)

Bu kaynaklar, çeşitli ortamlar ve çerçevelerde Intlayer'ın kurulumu ve kullanımı hakkında daha fazla bilgi sunar.
