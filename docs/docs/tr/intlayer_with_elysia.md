---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: "Elysia i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "i18next artık değil. 2026 kılavuzu: çok dilli (i18n) Elysia uygulaması oluşturma. AI ajanlarıyla çeviri yapın ve bundle boyutunu, SEO'yu ve performansı optimize edin."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# Intlayer Kullanarak Elysia Backend Web Sitenizi Çevirme | Uluslararasılaştırma (i18n)

`elysia-intlayer` Elysia uygulamaları için güçlü bir uluslararasılaştırma (i18n) eklentisidir ve istemcinin tercihlerine dayalı olarak yerelleştirilmiş yanıtlar sağlayarak backend hizmetlerinizi küresel olarak erişilebilir hale getirmeye yönelik tasarlanmıştır.

> GitHub'da paket uygulamasını görüntüleyin: https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer

### Pratik Kullanım Senaryoları

- **Backend Hatalarını Kullanıcının Dilinde Görüntüleme**: Bir hata oluştuğunda, mesajları kullanıcının ana dilinde görüntülemek anlayışı iyileştirir ve hayal kırıklığını azaltır. Bu, toast veya modal gibi ön-uç bileşenlerinde gösterilebilecek dinamik hata mesajları için özellikle faydalıdır.
- **Çok Dilli İçerik Alma**: Bir veritabanından içerik çeken uygulamalar için uluslararasılaştırma, bu içeriği birden fazla dilde sunabileceğinizi sağlar. Bu, ürün açıklamaları, makaleler ve diğer içeriği kullanıcı tarafından tercih edilen dilde görüntülemesi gereken e-ticaret siteleri veya içerik yönetim sistemleri gibi platformlar için çok önemlidir.
- **Çok Dilli E-posta Gönderme**: İşlemsel e-postalar, pazarlama kampanyaları veya bildirimler olsun, alıcının dilinde e-posta göndermek katılımı ve etkinliği önemli ölçüde artırabilir.
- **Çok Dilli Push Bildirimleri**: Mobil uygulamalar için, push bildirimlerini kullanıcının tercih ettiği dilde göndermek etkileşimi ve tutunduğunu artırabilir. Bu kişisel dokunuş, bildirimleri daha ilgili ve işlem yapılabilir hissettirebilir.
- **Diğer İletişimler**: Backend'den gelen SMS mesajları, sistem uyarıları veya kullanıcı arayüzü güncellemeleri gibi her türlü iletişim, kullanıcının dilinde olmasından fayda sağlar, netliği sağlar ve genel kullanıcı deneyimini iyileştirir.

Backend'i uluslararasılaştırarak, uygulamanız yalnızca kültürel farklılıklara saygı göstermekle kalmaz, aynı zamanda global pazar ihtiyaçlarıyla daha iyi uyumlanır ve bu, hizmetlerinizi dünya çapında ölçeklendirmenin önemli bir adımıdır.

## Başlangıç

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Bkz. [Uygulama Şablonu](https://github.com/aymericzip/intlayer-elysia-template) GitHub'da.

### Kurulum

`elysia-intlayer` kullanmaya başlamak için npm kullanarak paketi kurun:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` bayrağı isteğe bağlıdır. Bir AI ajanı iseniz `intlayer-cli init` komutunu kullanın.

> Bu komut ortamınızı algılayacak ve gerekli paketleri kuracaktır. Örneğin:

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

### Kurulum

Proje kök dizininde `intlayer.config.ts` dosyası oluşturarak uluslararasılaştırma ayarlarını yapılandırın:

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

### İçeriğinizi Bildirin

Çevirileri depolamak için içerik bildirimlerini oluşturun ve yönetin:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      tr: "İngilizce'de döndürülen içerik örneği",
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
        "tr": "İngilizce'de döndürülen içerik örneği",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> İçerik bildirimleriniz, `contentDir` dizinine dahil oldukları sürece (varsayılan olarak `./src`) uygulamanızın herhangi bir yerinde tanımlanabilir. Ve içerik bildirimi dosya uzantısıyla eşleşmelidir (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Daha fazla ayrıntı için [içerik bildirimi belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

### Elysia Uygulaması Kurulumu

Elysia uygulamanızı `elysia-intlayer` kullanacak şekilde kurun:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // Uluslararasılaştırma eklentisini yükle
  .use(intlayer())
  // Rotalar
  .get("/t_example", () =>
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(`Listening on http://${app.server?.hostname}:${app.server?.port}`);
```

Eklenti ayrıca rota bağlamına bir `intlayer` nesnesi enjekte eder. Bağımsız helper'lar yerine açık bir bağımlılık istediğinizde bunu tercih edin:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) => ({
  // Bu istek için kullanılan locale, `Accept-Language` üzerinden anlaşıldı veya depolamadan okundu
  locale: intlayer.locale,
  greeting: intlayer.t({
    en: "Hello",
    fr: "Bonjour",
  }),
  content: intlayer.getIntlayer("index").exampleOfContent,
}));
```

> Rota bağlamı `locale`, `defaultLocale`, `locale_storage` (istemci tarafından açıkça ayarlanan locale), `locale_detected` (başlıklardan anlaşılan locale), `t`, `getIntlayer` ve `getDictionary` alanlarını sunar.

### Uyumluluk

`elysia-intlayer` tamamen uyumludur:

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/index.md)>) React uygulamaları için
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/index.md)>) Next.js uygulamaları için
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/index.md)>) Vite uygulamaları için

Ayrıca, tarayıcılar ve API istekleri dahil olmak üzere çeşitli ortamlarda herhangi bir uluslararasılaştırma çözümüyle sorunsuz bir şekilde çalışır. Middleware'i özelleştirerek locale'i başlıklar veya çerezler aracılığıyla algılayabilirsiniz:

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

Varsayılan olarak, `elysia-intlayer` müşterinin tercih ettiği dili belirlemek için `Accept-Language` başlığını yorumlar.

> Yapılandırma ve ileri konular hakkında daha fazla bilgi için lütfen [dokumentasyonumuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) ziyaret edin.

### TypeScript'i Yapılandırma

`elysia-intlayer`, uluslararasılaştırma sürecini geliştirmek için TypeScript'in güçlü yeteneklerinden yararlanır. TypeScript'in statik yazı sistemi, her çeviri anahtarının dikkate alınmasını sağlayarak eksik çevirilerin riskini azaltır ve bakımlanabilirliği artırır.

Otomatik olarak oluşturulan türlerin (varsayılan olarak ./types/intlayer.d.ts konumunda) tsconfig.json dosyanıza dahil edildiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri dahil et
  ],
}
```

### VS Code Extension

Intlayer ile geliştirme deneyiminizi iyileştirmek için, resmi **Intlayer VS Code Extension**'ı yükleyebilirsiniz.

[VS Code Marketplace'ten Yükle](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu extension şunları sağlar:

- **Autocompletion** çeviri anahtarları için.
- **Real-time hata tespiti** eksik çeviriler için.
- **Inline previews** çevrilen içeriğin.
- **Quick actions** çevirileri kolayca oluşturmak ve güncellemek için.

Extension'ın nasıl kullanılacağı hakkında daha fazla bilgi için, [Intlayer VS Code Extension dokumentasyonuna](https://intlayer.org/doc/vs-code-extension) bakınız.

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaları yoksaymak önerilir. Bu, bunları Git deponuza işlemekten kaçınmanızı sağlar.

Bunu yapmak için, `.gitignore` dosyanıza aşağıdaki yönergeleri ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```
