---
createdAt: 2025-09-07
updatedAt: 2025-12-30
title: Express backend uygulamanızı nasıl çevirirsiniz – i18n rehberi 2026
description: Express arka ucunuzu çok dilli hale getirmeyi keşfedin. Dokümantasyonu takip ederek uluslararasılaştırma (i18n) yapın ve çevirin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Express
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - express
applicationTemplate: https://github.com/aymericzip/intlayer-express-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: init komutu ekle
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Intlayer ile Express backend çevirin | Uluslararasılaştırma (i18n)

`express-intlayer`, Express uygulamaları için güçlü bir uluslararasılaştırma (i18n) ara yazılımıdır ve istemcinin tercihlerine göre yerelleştirilmiş yanıtlar sağlayarak arka uç hizmetlerinizi küresel olarak erişilebilir hale getirmek için tasarlanmıştır.

## Neden Arka Ucunuzu Uluslararasılaştırasınız?

Arka ucunuzu uluslararasılaştırmak, küresel bir kitleye etkili bir şekilde hizmet vermek için gereklidir. Bu, uygulamanızın her kullanıcının tercih ettiği dilde içerik ve mesajlar sunmasına izin verir. Bu yetenek, kullanıcı deneyimini geliştirir ve uygulamanızı farklı dilsel geçmişlere sahip insanlara daha erişilebilir ve ilgili hale getirerek uygulamanızın erişimini genişletir.

### Pratik Kullanım Durumları

- **Arka Uç Hatalarını Kullanıcının Dilinde Görüntüleme**: Bir hata oluştuğunda, mesajları kullanıcının ana dilinde görüntülemek anlayışı iyileştirir ve hayal kırıklığını azaltır. Bu, tostlar veya modallar gibi ön uç bileşenlerinde gösterilebilecek dinamik hata mesajları için özellikle yararlıdır.

- **Çok Dilli İçerik Alma**: Bir veritabanından içerik çeken uygulamalar için uluslararasılaştırma, bu içeriği kullanıcının tercih ettiği dilde sunabilmenizi sağlar. Bu, ürün açıklamaları, makaleler ve diğer içerikleri kullanıcının tercih ettiği dilde görüntülemesi gereken e-ticaret siteleri veya içerik yönetim sistemleri için çok önemlidir.

- **Çok Dilli E-postalar Gönderme**: İşlem e-postaları, pazarlama kampanyaları veya bildirimler olsun, e-postaları alıcının dilinde göndermek etkileşimi ve etkinliği önemli ölçüde artırabilir.

- **Çok Dilli Push Bildirimleri**: Mobil uygulamalar için, push bildirimlerini kullanıcının tercih ettiği dilde göndermek etkileşimi ve elde tutmayı artırabilir. Bu kişisel dokunuş, bildirimleri daha ilgili ve eyleme geçirilebilir hale getirebilir.

- **Diğer İletişimler**: SMS mesajları, sistem uyarıları veya kullanıcı arayüzü güncellemeleri gibi arka uçtan gelen herhangi bir iletişim biçimi, netliği sağlamak ve genel kullanıcı deneyimini geliştirmek için kullanıcının dilinde olmak faydasını görür.

Arka ucu uluslararasılaştırarak, uygulamanız sadece kültürel farklılıklara saygı göstermekle kalmaz, aynı zamanda küresel pazar ihtiyaçlarıyla daha iyi uyum sağlar ve hizmetlerinizi dünya çapında ölçeklendirmede önemli bir adım haline getirir.

## Başlarken

### Kurulum

`express-intlayer` kullanmaya başlamak için paketi npm kullanarak yükleyin:

```bash packageManager="npm"
npm install intlayer express-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer express-intlayer
bunx intlayer init
```

### Kurulum

Uluslararasılaştırma ayarlarını proje kökünde bir `intlayer.config.ts` oluşturarak yapılandırın:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
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
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
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
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### İçeriğinizi Bildirin

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> İçerik bildirimleriniz uygulamanızda herhangi bir yerde tanımlanabilir, yeter ki `contentDir` dizinine dahil edilsinler (varsayılan olarak `./src`). Ve içerik bildirim dosyası uzantısıyla eşleşsinler (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Daha fazla detay için [içerik bildirimi dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md) bakın.

### Express Uygulaması Kurulumu

Express uygulamanızı `express-intlayer` kullanacak şekilde ayarlayın:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app: Express = express();

// Uluslararasılaştırma istek işleyicisini yükle
app.use(intlayer());

// Rotalar
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// Sunucuyu başlat
app.listen(3000, () => console.log(`Port 3000'de dinleniyor`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app = express();

// Uluslararasılaştırma istek işleyicisini yükle
app.use(intlayer());

// Rotalar
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// Sunucuyu başlat
app.listen(3000, () => console.log(`Port 3000'de dinleniyor`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t, getDictionary, getIntlayer } = require("express-intlayer");
const dictionaryExample = require("./index.content");

const app = express();

// Uluslararasılaştırma istek işleyicisini yükle
app.use(intlayer());

// Rotalar
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// Sunucuyu başlat
app.listen(3000, () => console.log(`Port 3000'de dinleniyor`));
```

### Uyumluluk

`express-intlayer` tamamen uyumludur:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/index.md) React uygulamaları için
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/index.md) Next.js uygulamaları için
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/index.md) Vite uygulamaları için

Ayrıca, tarayıcılar ve API istekleri dahil olmak üzere çeşitli ortamlarda herhangi bir uluslararasılaştırma çözümüyle sorunsuz çalışır. Yerel ayarı başlık veya çerezler aracılığıyla algılamak için ara yazılımı özelleştirebilirsiniz:

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

Varsayılan olarak, `express-intlayer` istemcinin tercih ettiği dili belirlemek için `Accept-Language` başlığını yorumlayacaktır.

> Yapılandırma ve gelişmiş konular hakkında daha fazla bilgi için [dokümantasyonumuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) ziyaret edin.

### TypeScript'i Yapılandırın

`express-intlayer`, uluslararasılaştırma sürecini geliştirmek için TypeScript'in güçlü yeteneklerinden yararlanır. TypeScript'in statik yazımı, her çeviri anahtarının hesaba katıldığını sağlar, eksik çeviri riskini azaltır ve sürdürülebilirliği iyileştirir.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Otomatik oluşturulan türlerin (varsayılan olarak ./types/intlayer.d.ts) tsconfig.json dosyanızda dahil edildiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri dahil edin
  ],
}
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Uzantısı**'nı yükleyebilirsiniz.

[VS Code Marketplace'ten Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- **Çeviri anahtarları için otomatik tamamlama**.
- **Eksik çeviriler için gerçek zamanlı hata algılama**.
- **Çevrilmiş içeriğin satır içi önizlemeleri**.
- **Çevirileri kolayca oluşturmak ve güncellemek için hızlı eylemler**.

Uzantının nasıl kullanılacağı hakkında daha fazla detay için [Intlayer VS Code Uzantısı dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakın.

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaları yok saymanız önerilir. Bu, onları Git deponuza commit etmenizi önler.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yok say
.intlayer
```
