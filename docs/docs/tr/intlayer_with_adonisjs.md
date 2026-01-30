---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: AdonisJS i18n - AdonisJS uygulamanızı nasıl çevirirsiniz – kılavuz 2026
description: AdonisJS backend'inizi nasıl çok dilli hale getireceğinizi keşfedin. Uluslararasılaştırmak (i18n) ve çevirmek için belgeleri takip edin.
keywords:
  - Uluslararasılaştırma
  - Belgeler
  - Intlayer
  - AdonisJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonisjs-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: Geçmişi başlat
---

# Intlayer kullanarak AdonisJS backend web sitenizi çevirin | Uluslararasılaştırma (i18n)

`adonis-intlayer`, AdonisJS uygulamaları için tasarlanmış güçlü bir uluslararasılaştırma (i18n) paketidir. Müşterinin tercihlerine göre yerelleştirilmiş yanıtlar sunarak backend hizmetlerinizi küresel olarak erişilebilir hale getirmek için tasarlanmıştır.

### Pratik Kullanım Durumları

- **Backend Hatalarını Kullanıcının Dilinde Görüntüleme**: Bir hata oluştuğunda, mesajları kullanıcının ana dilinde görüntülemek anlamayı artırır ve hayal kırıklığını azaltır. Bu, özellikle toastlar veya modallar gibi front-end bileşenlerinde gösterilebilecek dinamik hata mesajları için yararlıdır.

- **Çok Dilli İçerik Alma**: Veritabanından içerik çeken uygulamalar için uluslararasılaştırma, bu içeriği birden fazla dilde sunabilmenizi sağlar. Bu, ürün açıklamalarını, makaleleri ve diğer içerikleri kullanıcının tercih ettiği dilde görüntülemesi gereken e-ticaret siteleri veya içerik yönetim sistemleri gibi platformlar için çok önemlidir.

- **Çok Dilli E-postalar Gönderme**: İster işlemsel e-postalar, ister pazarlama kampanyaları veya bildirimler olsun, e-postaları alıcının dilinde göndermek etkileşimi ve etkililiği önemli ölçüde artırabilir.

- **Çok Dilli Push Bildirimleri**: Mobil uygulamalar için, kullanıcının tercih ettiği dilde push bildirimleri göndermek etkileşimi ve elde tutmayı artırabilir. Bu kişisel dokunuş, bildirimlerin daha alakalı ve harekete geçirici hissettirmesini sağlayabilir.

- **Diğer İletişimler**: SMS mesajları, sistem uyarıları veya kullanıcı arayüzü güncellemeleri gibi backend'den gelen her türlü iletişim biçimi, kullanıcının dilinde olmaktan yararlanır, netlik sağlar ve genel kullanıcı deneyimini iyileştirir.

Backend'i uluslararasılaştırarak, uygulamanız sadece kültürel farklılıklara saygı duymakla kalmaz, aynı zamanda küresel pazar ihtiyaçlarıyla daha iyi uyum sağlar ve hizmetlerinizi dünya çapında ölçeklendirmede önemli bir adım atar.

## Başlarken

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-adonisjs-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-adonisjs-template) on GitHub.

### Kurulum

`adonis-intlayer` kullanmaya başlamak için paketi npm kullanarak yükleyin:

```bash packageManager="npm"
npm install intlayer adonis-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
bunx intlayer init
```

### Kurulum

Proje kök dizininizde bir `intlayer.config.ts` oluşturarak uluslararasılaştırma ayarlarını yapılandırın:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### İçeriğinizi Tanımlayın

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

```typescript fileName="app/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      tr: "Türkçe olarak döndürülen içerik örneği",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="app/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      tr: "Türkçe olarak döndürülen içerik örneği",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="app/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      tr: "Türkçe olarak döndürülen içerik örneği",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "tr": "Türkçe olarak döndürülen içerik örneği",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> İçerik bildirimleriniz, `contentDir` dizinine (varsayılan olarak `./src` veya `./app`) dahil edildikleri sürece uygulamanızın herhangi bir yerinde tanımlanabilir. Ve içerik bildirimi dosya uzantısıyla (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) eşleşmelidir.

> Daha fazla ayrıntı için [içerik bildirimi belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

### AdonisJS Uygulama Kurulumu

AdonisJS uygulamanızı `adonis-intlayer` kullanacak şekilde ayarlayın.

#### Middleware'i kaydedin

Öncelikle, uygulamanıza `intlayer` middleware'ini kaydetmeniz gerekir.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### Rotalarınızı tanımlayın

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    tr: "Türkçe olarak döndürülen içerik örneği",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### Fonksiyonlar

`adonis-intlayer`, uygulamanızda uluslararasılaştırmayı yönetmek için birkaç fonksiyon dışa aktarır:

- `t(content, locale?)`: Temel çeviri fonksiyonu.
- `getIntlayer(key, locale?)`: Sözlüklerinizden anahtara göre içerik alır.
- `getDictionary(dictionary, locale?)`: Belirli bir sözlük nesnesinden içerik alır.
- `getLocale()`: İstek bağlamından geçerli yereli alır.

#### Denetleyicilerde (Controllers) Kullanım

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
        tr: "Denetleyiciden merhaba",
      })
    );
  }
}
```

### Uyumluluk

`adonis-intlayer` şunlarla tam uyumludur:

- React uygulamaları için [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/index.md)
- Next.js uygulamaları için [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/index.md)
- Vite uygulamaları için [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/index.md)

Ayrıca tarayıcılar ve API istekleri dahil olmak üzere çeşitli ortamlardaki tüm uluslararasılaştırma çözümleriyle sorunsuz çalışır. Middleware'i başlıklar veya çerezler aracılığıyla yereli algılayacak şekilde özelleştirebilirsiniz:

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

Varsayılan olarak, `adonis-intlayer` müşterinin tercih ettiği dili belirlemek için `Accept-Language` başlığını yorumlayacaktır.

> Yapılandırma ve gelişmiş konular hakkında daha fazla bilgi için [belgelerimizi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) ziyaret edin.

### TypeScript'i Yapılandırın

`adonis-intlayer`, uluslararasılaştırma sürecini geliştirmek için TypeScript'in sağlam yeteneklerinden yararlanır. TypeScript'in statik tiplemesi, her çeviri anahtarının hesaba katılmasını sağlayarak eksik çeviri riskini azaltır ve bakımı iyileştirir.

![Otomatik tamamlama](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Çeviri hatası](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Otomatik olarak oluşturulan türlerin (varsayılan olarak ./types/intlayer.d.ts konumunda) tsconfig.json dosyanıza dahil edildiğinden emin olun.

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

Intlayer ile geliştirme deneyiminizi geliştirmek için resmi **Intlayer VS Code Uzantısını** yükleyebilirsiniz.

[VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- Çeviri anahtarları için **otomatik tamamlama**.
- Eksik çeviriler için **gerçek zamanlı hata algılama**.
- Çevrilmiş içeriğin **satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **hızlı eylemler**.

Uzantının nasıl kullanılacağına ilişkin daha fazla ayrıntı için [Intlayer VS Code Uzantısı belgelerine](https://intlayer.org/tr/doc/vs-code-extension) bakın.

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların yoksayılması önerilir. Bu, onları Git deponuza göndermenizi engeller.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```
