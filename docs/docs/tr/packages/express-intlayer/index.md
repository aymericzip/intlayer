---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Paket Dokümantasyonu | express-intlayer
description: express-intlayer paketinin nasıl kullanılacağını görün
keywords:
  - Intlayer
  - express-intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
---

# express-intlayer: Express.js uygulamasını uluslararasılaştırmak (i18n) için JavaScript Paketi

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir paket paketidir. React, Next.js ve Express.js gibi çerçevelerle uyumludur.

**`express-intlayer` paketi**, Express.js uygulamanızı uluslararasılaştırmanızı sağlar. Kullanıcının tercih ettiği yerel ayarı algılamak için bir ara yazılım sağlar ve kullanıcı için uygun sözlüğü döndürür.

## Neden Arka Uçunuzu Uluslararasılaştırasınız?

Arka ucunuzu uluslararasılaştırmak, küresel bir kitleye etkili bir şekilde hizmet etmek için gereklidir. Uygulamanızın her kullanıcının tercih ettiği dilde içerik ve mesajlar sunmasına izin verir. Bu yetenek, kullanıcı deneyimini geliştirir ve uygulamanızın farklı dilsel geçmişlere sahip insanlara daha erişilebilir ve ilgili hale getirerek erişimini genişletir.

### Pratik Kullanım Durumları

- **Arka Uç Hatalarını Kullanıcının Dilinde Görüntüleme**: Bir hata oluştuğunda, mesajları kullanıcının ana dilinde görüntülemek anlayışı geliştirir ve hayal kırıklığını azaltır. Bu, tostlar veya modallar gibi ön uç bileşenlerinde gösterilebilecek dinamik hata mesajları için özellikle yararlıdır.

- **Çok Dilli İçerik Alma**: Bir veritabanından içerik çeken uygulamalar için uluslararasılaştırma, bu içeriği birden fazla dilde sunabilmenizi sağlar. Bu, ürün açıklamaları, makaleler ve diğer içerikleri kullanıcının tercih ettiği dilde görüntülemesi gereken e-ticaret siteleri veya içerik yönetim sistemleri için kritiktir.

- **Çok Dilli E-postalar Gönderme**: İşlem e-postaları, pazarlama kampanyaları veya bildirimler olsun, alıcının dilinde e-posta göndermek etkileşimi ve etkinliği önemli ölçüde artırabilir.

- **Çok Dilli Push Bildirimleri**: Mobil uygulamalar için, push bildirimlerini kullanıcının tercih ettiği dilde göndermek etkileşimi ve elde tutmayı geliştirebilir. Bu kişisel dokunuş, bildirimleri daha ilgili ve eyleme geçirilebilir hale getirebilir.

- **Diğer İletişimler**: SMS mesajları, sistem uyarıları veya kullanıcı arayüzü güncellemeleri gibi arka uçtan gelen herhangi bir iletişim biçimi, kullanıcının dilinde olmak suretiyle netliği sağlar ve genel kullanıcı deneyimini geliştirir.

Arka ucu uluslararasılaştırarak, uygulamanız sadece kültürel farklılıklara saygı göstermez, aynı zamanda küresel pazar ihtiyaçlarına daha iyi uyum sağlar, hizmetlerinizi dünya çapında ölçeklendirmede önemli bir adım haline getirir.

## Neden Intlayer'ı entegre etmeli?

- **Tür Güvenli Ortam**: Tüm içerik tanımlarınızın doğru ve hatasız olmasını sağlamak için TypeScript'i kullanın.

## Kurulum

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketi yükleyin:

```bash
npm install express-intlayer
```

```bash
yarn add express-intlayer
```

```bash
pnpm add express-intlayer
```

### Intlayer'ı Yapılandırın

Intlayer, projenizi kurmak için bir yapılandırma dosyası sağlar. Bu dosyayı projenizin köküne yerleştirin.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Kullanılabilir parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

## Kullanım Örneği

Express uygulamanızı `express-intlayer` kullanacak şekilde ayarlayın:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Uluslararasılaştırma istek işleyicisini yükle
app.use(intlayer());

// Rotalar
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "İngilizce'de döndürülen içeriğin örneği",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

// Sunucuyu başlat
app.listen(3000, () => console.log(`Port 3000'de dinleniyor`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// Uluslararasılaştırma istek işleyicisini yükle
app.use(intlayer());

// Rotalar
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "İngilizce'de döndürülen içeriğin örneği",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Sunucuyu başlat
app.listen(3000, () => console.log(`Port 3000'de dinleniyor`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// Uluslararasılaştırma istek işleyicisini yükle
app.use(intlayer());

// Rotalar
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "İngilizce'de döndürülen içeriğin örneği",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Sunucuyu başlat
app.listen(3000, () => console.log(`Port 3000'de dinleniyor`));
```

### Uyumluluk

`express-intlayer` tamamen uyumludur:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/index.md) React uygulamaları için
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/index.md) Next.js uygulamaları için
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/index.md) Vite uygulamaları için

Ayrıca, tarayıcılar ve API istekleri dahil olmak üzere çeşitli ortamlarda herhangi bir uluslararasılaştırma çözümüyle sorunsuz çalışır. Ara yazılımı, yerel ayarı üst bilgiler veya çerezler aracılığıyla algılayacak şekilde özelleştirebilirsiniz:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Diğer yapılandırma seçenekleri
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Diğer yapılandırma seçenekleri
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Diğer yapılandırma seçenekleri
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

Varsayılan olarak, `express-intlayer` istemcinin tercih ettiği dili belirlemek için `Accept-Language` üst bilgisini yorumlayacaktır.

## `express-intlayer` paketi tarafından sağlanan fonksiyonlar

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/express-intlayer/t.md)

## Dokümantasyon Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |

```

```
