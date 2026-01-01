---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Fastify backend'inizi nasıl çevirirsiniz – i18n rehberi 2026
description: Fastify backend'inizi çok dilli hale getirmenin yollarını keşfedin. Uluslararasılaştırma (i18n) ve çeviri için dokümantasyonu takip edin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Fastify
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: init komutu eklendi
  - version: 7.6.0
    date: 2025-12-31
    changes: Geçmiş başlatıldı
---

# Fastify backend sitenizi Intlayer ile çevirin | Uluslararasılaştırma (i18n)

`fastify-intlayer`, Fastify uygulamaları için güçlü bir uluslararasılaştırma (i18n) eklentisidir; istemci tercihlerine göre yerelleştirilmiş yanıtlar sağlayarak backend servislerinizi küresel olarak erişilebilir hale getirmek için tasarlanmıştır.

### Pratik Kullanım Örnekleri

- **Kullanıcının Dilinde Backend Hatalarını Gösterme**: Bir hata oluştuğunda, mesajları kullanıcının ana dilinde göstermek anlayışı artırır ve kullanıcı sıkıntısını azaltır. Bu, özellikle toast veya modal gibi ön yüz bileşenlerinde gösterilebilecek dinamik hata mesajları için kullanışlıdır.

`fastify-intlayer`, Fastify uygulamaları için güçlü bir uluslararasılaştırma (i18n) eklentisidir; istemcinin tercihleri doğrultusunda yerelleştirilmiş yanıtlar sunarak backend servislerinizi küresel olarak erişilebilir kılmak için tasarlanmıştır.

### Pratik Kullanım Senaryoları

- **Kullanıcının Dilinde Backend Hatalarını Gösterme**: Bir hata oluştuğunda, mesajların kullanıcının ana dilinde gösterilmesi anlayışı artırır ve hayal kırıklığını azaltır. Bu, özellikle toasts veya modallar gibi ön yüz bileşenlerinde gösterilebilecek dinamik hata mesajları için çok yararlıdır.
- **Çok Dilli İçerik Alma**: Database'den içerik çeken uygulamalar için uluslararasılaştırma, bu içeriği birden fazla dilde sunmanızı sağlar. Bu, e-commerce siteleri veya content management systems gibi ürün açıklamalarını, makaleleri ve diğer içerikleri kullanıcının tercih ettiği dilde göstermek zorunda olan platformlar için kritiktir.
- **Çok Dilli E-Posta Gönderimi**: İster transactional e-postalar, ister pazarlama kampanyaları veya bildirimler olsun, alıcının dilinde e-posta göndermek etkileşimi ve etkinliği önemli ölçüde artırabilir.
- **Çok Dilli Push Bildirimleri**: Mobil uygulamalarda, kullanıcının tercih ettiği dilde push bildirimleri göndermek etkileşimi ve kullanıcı elde tutmayı artırabilir. Bu kişisel dokunuş, bildirimlerin daha ilgili ve uygulanabilir hissettirmesini sağlar.
- **Diğer İletişimler**: SMS mesajları, sistem uyarıları veya kullanıcı arayüzü güncellemeleri gibi backend'den gelen her türlü iletişim, kullanıcının dilinde olduğunda netlik sağlar ve genel kullanıcı deneyimini iyileştirir.

Backend'i uluslararasılaştırarak, uygulamanız yalnızca kültürel farklılıklara saygı göstermekle kalmaz, aynı zamanda küresel pazar ihtiyaçlarıyla daha iyi uyum sağlar; bu da hizmetlerinizi dünya çapında ölçeklendirmenin önemli bir adımıdır.

## Başlarken

### Kurulum

`fastify-intlayer`'ı kullanmaya başlamak için paketi npm ile kurun:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init

```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init

```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init

```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
bunx intlayer init

```

### Kurulum

Uluslararasılaştırma ayarlarını proje kök dizininizde bir `intlayer.config.ts` oluşturarak yapılandırın:

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

/** @type {import('intlayer').IntlayerConfig} - Intlayer yapılandırma türü */
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

/** @type {import('intlayer').IntlayerConfig} - Intlayer yapılandırma türü */
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

### İçeriğinizi Tanımlayın

Çevirileri depolamak için içerik tanımlamalarınızı oluşturun ve yönetin:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      tr: "İngilizce döndürülen içeriğin örneği",
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
      tr: "İngilizce döndürülen içeriğin örneği",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;


/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      tr: "Döndürülen içeriğin Türkçe örneği",
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
      tr: "Döndürülen içeriğin Türkçe örneği",
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
        "tr": "İngilizce döndürülen içerik örneği",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> İçerik beyanlarınızı, uygulamanızda `contentDir` dizinine (varsayılan olarak `./src`) dahil edildikleri sürece istediğiniz yere tanımlayabilirsiniz. Ve içerik beyanı dosya uzantısıyla eşleşmelidir (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Daha fazla ayrıntı için [içerik beyanı belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

### Fastify Uygulama Kurulumu

Fastify uygulamanızı `fastify-intlayer` kullanacak şekilde ayarlayın:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Uluslararasılaştırma eklentisini yükle
await fastify.register(intlayer);

// Rotalar
fastify.get("/t_example", async (_req, reply) => {
  return t({
    tr: "Döndürülen içeriğin Türkçe örneği",
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Sunucuyu başlat
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Uluslararasılaştırma eklentisini yükle
await fastify.register(intlayer);

// Rotalar
fastify.get("/t_example", async (_req, reply) => {
  return t({
    tr: "İngilizce döndürülen içerik örneği",
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Sunucuyu başlat
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// async/await için sunucu başlatma sarmalayıcısı
const start = async () => {
  try {
    // Uluslararasılaştırma eklentisini yükle
    await fastify.register(intlayer);

    // Rotalar
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        tr: "Dönen içeriğe örnek (Türkçe)",
        en: "Example of returned content in English",
        fr: "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)",
      });
    });

    fastify.get("/getIntlayer_example", async (_req, reply) => {
      return getIntlayer("index").exampleOfContent;
    });

    fastify.get("/getDictionary_example", async (_req, reply) => {
      return getDictionary(dictionaryExample).exampleOfContent;
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Uyumluluk

`fastify-intlayer` şu paketlerle tamamen uyumludur:

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/index.md)>) React uygulamaları için
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/index.md)>) Next.js uygulamaları için

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/index.md)>) React uygulamaları için
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/index.md)>) Next.js uygulamaları için
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/index.md)>) Vite uygulamaları için

Ayrıca tarayıcılar ve API istekleri dahil olmak üzere çeşitli ortamlarda herhangi bir uluslararasılaştırma çözümü ile sorunsuz çalışır. Middleware'i başlıklar (headers) veya çerezler aracılığıyla locale tespit edecek şekilde özelleştirebilirsiniz:

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

Varsayılan olarak, `fastify-intlayer` istemcinin tercih ettiği dili belirlemek için `Accept-Language` başlığını yorumlar.

> Yapılandırma ve gelişmiş konular hakkında daha fazla bilgi için [dökümantasyonumuza](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

### TypeScript'i Yapılandırma

`fastify-intlayer`, uluslararasılaştırma sürecini geliştirmek için TypeScript'in güçlü yeteneklerinden yararlanır. TypeScript'in statik tiplendirmesi, her çeviri anahtarının hesaba katılmasını sağlar, eksik çeviriler riskini azaltır ve bakım kolaylığını artırır.

Otomatik oluşturulan tiplerin (varsayılan olarak ./types/intlayer.d.ts konumunda) tsconfig.json dosyanıza dahil edildiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan tipleri dahil edin
  ],
}
```

### VS Code Uzantısı

Geliştirici deneyiminizi Intlayer ile iyileştirmek için resmi **Intlayer VS Code Uzantısı**nı yükleyebilirsiniz.

[VS Code Marketplace'ten Yükle](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- **Çeviri anahtarları için otomatik tamamlama.**
- **Eksik çeviriler için gerçek zamanlı hata tespiti.**
- **Çevrilmiş içeriğin satır içi önizlemeleri.**
- **Çevirileri kolayca oluşturup güncellemek için hızlı eylemler.**

Uzantının nasıl kullanılacağıyla ilgili daha fazla ayrıntı için [Intlayer VS Code Uzantısı dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakın.

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların yoksayılması önerilir. Bu, bunları Git havuzunuza göndermekten kaçınmanızı sağlar.

Bunu yapmak için .gitignore dosyanıza aşağıdaki satırları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```
