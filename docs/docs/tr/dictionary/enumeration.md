---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Numaralandırma
description: Çok dilli web sitenizde numaralandırmaları nasıl bildireceğinizi ve kullanacağınızı keşfedin. Bu çevrimiçi dokümantasyonun adımlarını takip ederek projenizi birkaç dakikada kurun.
keywords:
  - Numaralandırma
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
  - enumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Numaralandırma / Çoğullaştırma

## Numaralandırma Nasıl Çalışır

Intlayer'da numaralandırma, `enu` fonksiyonu aracılığıyla gerçekleştirilir ve belirli anahtarları karşılık gelen içeriklerine eşler. Bu anahtarlar sayısal değerleri, aralıkları veya özel tanımlayıcıları temsil edebilir. React Intlayer veya Next Intlayer ile kullanıldığında, uygun içerik uygulamanın yerel ayarına ve tanımlanan kurallara göre otomatik olarak seçilir.

## Numaralandırmayı Ayarlama

Intlayer projenizde numaralandırmayı ayarlamak için, numaralandırma tanımlarını içeren bir içerik modülü oluşturmanız gerekir. İşte araba sayısı için basit bir numaralandırma örneği:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Eksi bir arabadan az",
      "-1": "Eksi bir araba",
      "0": "Araba yok",
      "1": "Bir araba",
      ">5": "Bazı arabalar",
      ">19": "Çok araba",
      "fallback": "Fallback değeri", // İsteğe bağlı
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Eksi bir arabadan az",
      "-1": "Eksi bir araba",
      "0": "Araba yok",
      "1": "Bir araba",
      ">5": "Bazı arabalar",
      ">19": "Çok araba",
      "fallback": "Fallback değeri", // İsteğe bağlı
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Eksi bir arabadan az",
      "-1": "Eksi bir araba",
      "0": "Araba yok",
      "1": "Bir araba",
      ">5": "Bazı arabalar",
      ">19": "Çok araba",
      "fallback": "Fallback değeri", // İsteğe bağlı
    }),
  },
};

module.exports = carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Eksi bir arabadan az",
        "-1": "Eksi bir araba",
        "0": "Araba yok",
        "1": "Bir araba",
        ">5": "Bazı arabalar",
        ">19": "Çok araba",
        "fallback": "Fallback değeri" // İsteğe bağlı
      }
    }
  }
}
```

Bu örnekte, `enu` çeşitli koşulları belirli içeriklere eşler. Bir React bileşeninde kullanıldığında, Intlayer verilen değişkene göre uygun içeriği otomatik olarak seçebilir.

> Bildirim sırası Intlayer numaralandırmalarında önemlidir. İlk geçerli bildirim alınacak olanıdır. Birden fazla koşul uygularsa, beklenmedik davranışlardan kaçınmak için doğru sıralandığından emin olun.

> Eğer hiçbir fallback bildirilmezse, hiçbir anahtar eşleşmezse fonksiyon `undefined` döndürür.

## React Intlayer ile Numaralandırmayı Kullanma

Bir React bileşeninde numaralandırmayı kullanmak için, `react-intlayer` paketinden `useIntlayer` hook'unu kullanabilirsiniz. Bu hook, belirtilen ID'ye göre doğru içeriği alır. İşte nasıl kullanılacağına dair bir örnek:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Çıktı: Araba yok
        }
      </p>
      <p>
        {
          numberOfCar(6) // Çıktı: Bazı arabalar
        }
      </p>
      <p>
        {
          numberOfCar(20) // Çıktı: Çok araba
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Çıktı: Fallback değeri
        }
      </p>
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Çıktı: Araba yok
        }
      </p>
      <p>
        {
          numberOfCar(6) // Çıktı: Bazı arabalar
        }
      </p>
      <p>
        {
          numberOfCar(20) // Çıktı: Çok araba
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Çıktı: Fallback değeri
        }
      </p>
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Çıktı: Araba yok
        }
      </p>
      <p>
        {
          numberOfCar(6) // Çıktı: Bazı arabalar
        }
      </p>
      <p>
        {
          numberOfCar(20) // Çıktı: Çok araba
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Çıktı: Fallback değeri
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

Bu örnekte, bileşen araba sayısına göre çıktısını dinamik olarak ayarlar. Doğru içerik, belirtilen aralığa göre otomatik olarak seçilir.

## Ek Kaynaklar

Yapılandırma ve kullanım hakkında daha detaylı bilgi için aşağıdaki kaynaklara başvurun:

- [Intlayer CLI Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md)
- [React Intlayer Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)
- [Next Intlayer Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)

Bu kaynaklar, farklı ortamlar ve çeşitli çerçevelerde Intlayer'ın kurulumu ve kullanımı hakkında daha fazla bilgi sağlar.
