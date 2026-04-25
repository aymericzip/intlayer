---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Fastify i18n - 2026'da Bir Fastify Uygulaması Nasıl Çevrilir?
description: Fastify backend'inizi nasıl çok dilli hale getireceğinizi keşfedin. Uluslararasılaştırma (i18n) ve çeviri için belgeleri takip edin.
keywords:
  - Uluslararasılaştırma
  - Belgeler
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
    changes: "init komutu eklendi"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Geçmiş başlatıldı"
---

# Intlayer Kullanarak Fastify Backend Web Sitenizi Çevirin | Uluslararasılaştırma (i18n)

`fastify-intlayer`, Fastify uygulamaları için güçlü bir uluslararasılaştırma (i18n) eklentisidir ve istemcinin tercihlerine göre yerelleştirilmiş yanıtlar sağlayarak backend hizmetlerinizi küresel olarak erişilebilir kılmak için tasarlanmıştır.

> GitHub'daki paket uygulamasını inceleyin: https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer

### Pratik Kullanım Durumları

- **Backend Hatalarını Kullanıcının Dilinde Görüntüleme**: Bir hata oluştuğunda, mesajların kullanıcının ana dilinde görüntülenmesi anlayışı artırır ve hayal kırıklığını azaltır. Bu, özellikle toast'lar veya modal'lar gibi front-end bileşenlerinde gösterilebilecek dinamik hata mesajları için yararlıdır.
- **Çok Dilli İçeriği Alma**: Bir veritabanından içerik çeken uygulamalar için uluslararasılaştırma, bu içeriği birden fazla dilde sunabilmenizi sağlar. Bu, ürün açıklamalarını, makaleleri ve diğer içerikleri kullanıcının tercih ettiği dilde görüntülemesi gereken e-ticaret siteleri veya içerik yönetim sistemleri gibi platformlar için çok önemlidir.
- **Çok Dilli E-postalar Gönderme**: İster işlemsel e-postalar, ister pazarlama kampanyaları veya bildirimler olsun, e-postaları alıcının dilinde göndermek etkileşimi ve etkinliği önemli ölçüde artırabilir.
- **Çok Dilli Push Bildirimleri**: Mobil uygulamalar için, bir kullanıcının tercih ettiği dilde push bildirimleri göndermek etkileşimi ve elde tutmayı artırabilir. Bu kişisel dokunuş, bildirimlerin daha alakalı ve uygulanabilir hissettirmesini sağlayabilir.
- **Diğer İletişimler**: SMS mesajları, sistem uyarıları veya kullanıcı arayüzü güncellemeleri gibi backend'den gelen her türlü iletişim, kullanıcının dilinde olmaktan yararlanır, netlik sağlar ve genel kullanıcı deneyimini iyileştirir.

Backend'i uluslararasılaştırarak, uygulamanız yalnızca kültürel farklılıklara saygı duymakla kalmaz, aynı zamanda küresel pazar ihtiyaçlarıyla daha iyi uyum sağlar ve bu da hizmetlerinizi dünya çapında ölçeklendirmede kilit bir adım haline getirir.

## Başlarken

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-fastify-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı nasıl uluslararasılaştırırsınız?"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub'daki [Uygulama Şablonu](https://github.com/aymericzip/intlayer-fastify-template)'nu inceleyin.

### Kurulum

`fastify-intlayer` kullanmaya başlamak için paketi npm kullanarak yükleyin:

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
bun x intlayer init

```

### Kurulum

Proje kök dizininizde bir `intlayer.config.ts` oluşturarak uluslararasılaştırma ayarlarını yapılandırın:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

### İçeriğinizi Tanımlayın

Çevirileri saklamak için içerik bildirimlerinizi oluşturun ve yönetin:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> İçerik tanımlamalarınız, `contentDir` dizinine (varsayılan olarak `./src`) dahil edildikleri sürece uygulamanızın herhangi bir yerinde tanımlanabilir. Ve içerik tanımlama dosyası uzantısıyla eşleşmelidir (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Daha fazla ayrıntı için [içerik bildirim belgeleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md)ne bakın.

### Fastify Uygulama Kurulumu

Fastify uygulamanızı `fastify-intlayer` kullanacak şekilde kurun:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Uluslararasılaştırma eklentisini yükle
await fastify.register(intlayer);

// Rotalar
fastify.get("/t_example", async (_req, reply) => {
  return t({
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

### Uyumluluk

`fastify-intlayer`, şunlarla tam uyumludur:

- React uygulamaları için [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/index.md)
- Next.js uygulamaları için [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/index.md)
- Vite uygulamaları için [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/index.md)

Ayrıca tarayıcılar ve API istekleri dahil olmak üzere çeşitli ortamlardaki her türlü uluslararasılaştırma çözümüyle sorunsuz bir şekilde çalışır. Middleware'i üstbilgiler veya tanımlama bilgileri aracılığıyla yerel ayarı algılayacak şekilde özelleştirebilirsiniz:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

Varsayılan olarak `fastify-intlayer`, istemcinin tercih ettiği dili belirlemek için `Accept-Language` üstbilgisini yorumlayacaktır.

> Yapılandırma ve gelişmiş konular hakkında daha fazla bilgi için [belgelerimiz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)i ziyaret edin.

### TypeScript'i Yapılandırma

`fastify-intlayer`, uluslararasılaştırma sürecini iyileştirmek için TypeScript'in güçlü yeteneklerinden yararlanır. TypeScript'in statik tiplemesi, her çeviri anahtarının hesaba katılmasını sağlar, eksik çeviri riskini azaltır ve bakımı iyileştirir.

Otomatik olarak oluşturulan türlerin (varsayılan olarak ./types/intlayer.d.ts konumunda) tsconfig.json dosyanıza dahil edildiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik olarak oluşturulan türleri dahil et
  ],
}
```

### VS Code Eklentisi

Intlayer ile geliştirme deneyiminizi geliştirmek için resmi **Intlayer VS Code Extension**'ı yükleyebilirsiniz.

[VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu eklenti şunları sağlar:

- Çeviri anahtarları için **otomatik tamamlama**.
- Eksik çeviriler için **gerçek zamanlı hata algılama**.
- Çevrilmiş içeriğin **satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **hızlı eylemler**.

Eklentinin kullanımı hakkında daha fazla ayrıntı için [Intlayer VS Code Extension belgeleri](https://intlayer.org/doc/vs-code-extension)ne bakın.

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların yoksayılması önerilir. Bu, onları Git deponuza göndermenizi önlemenizi sağlar.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer

```
