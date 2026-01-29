---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: Hono i18n - Hono uygulamanızı nasıl çevirirsiniz – kılavuz 2026
description: Hono arka ucunuzu nasıl çok dilli hale getireceğinizi keşfedin. Uluslararasılaştırmak (i18n) ve çevirmek için dokümantasyonu izleyin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Hono
  - JavaScript
  - Arka Uç
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: init komutu ekle
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmişi başlat
---

# Intlayer kullanarak Hono arka uç web sitenizi çevirin | Uluslararasılaştırma (i18n)

`hono-intlayer`, Hono uygulamaları için güçlü bir uluslararasılaştırma (i18n) ara yazılımıdır. İstemcinin tercihlerine göre yerelleştirilmiş yanıtlar sağlayarak arka uç hizmetlerinizi küresel olarak erişilebilir kılmak için tasarlanmıştır.

### Pratik Kullanım Durumları

- **Arka Uç Hatalarını Kullanıcının Dilinde Görüntüleme**: Bir hata oluştuğunda, mesajların kullanıcının ana dilinde görüntülenmesi anlayışı artırır ve hayal kırıklığını azaltır. Bu, özellikle toastlar veya modallar gibi ön uç bileşenlerinde gösterilebilecek dinamik hata mesajları için yararlıdır.

- **Çok Dilli İçerik Getirme**: Veri tabanından içerik çeken uygulamalar için uluslararasılaştırma, bu içeriği birden fazla dilde sunabilmenizi sağlar. Bu, ürün açıklamalarını, makaleleri ve diğer içerikleri kullanıcının tercih ettiği dilde görüntülemesi gereken e-ticaret siteleri veya içerik yönetim sistemleri gibi platformlar için çok önemlidir.

- **Çok Dilli E-postalar Gönderme**: İster işlemsel e-postalar, ister pazarlama kampanyaları veya bildirimler olsun, e-postaları alıcının dilinde göndermek katılımı ve etkinliği önemli ölçüde artırabilir.

- **Çok Dilli Anlık Bildirimler**: Mobil uygulamalar için, anlık bildirimleri kullanıcının tercih ettiği dilde göndermek etkileşimi ve elde tutmayı artırabilir. Bu kişisel dokunuş, bildirimlerin daha alakalı ve harekete geçirici hissedilmesini sağlayabilir.

- **Diğer İletişimler**: SMS mesajları, sistem uyarıları veya kullanıcı arayüzü güncellemeleri gibi arka uçtan gelen her türlü iletişim biçimi, kullanıcının dilinde olmaktan yararlanarak netlik sağlar ve genel kullanıcı deneyimini geliştirir.

Arka ucu uluslararasılaştırarak, uygulamanız yalnızca kültürel farklılıklara saygı duymakla kalmaz, aynı zamanda küresel pazar ihtiyaçlarıyla daha iyi uyum sağlar ve bu da hizmetlerinizi dünya çapında ölçeklendirmede kilit bir adım haline gelir.

## Başlarken

### Kurulum

`hono-intlayer` kullanmaya başlamak için paketi npm kullanarak yükleyin:

```bash packageManager="npm"
npm install intlayer hono-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
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
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
      Locales.TURKISH,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### İçeriğinizi Beyan Edin

Çevirileri depolamak için içerik beyanlarınızı oluşturun ve yönetin:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      tr: "Türkçe olarak döndürülen içerik örneği",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

> İçerik beyanlarınız, `contentDir` dizinine (varsayılan olarak `./src`) dahil edildikleri sürece uygulamanızın herhangi bir yerinde tanımlanabilir. Ve içerik beyanı dosya uzantısıyla (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) eşleşmelidir.

> Daha fazla ayrıntı için [içerik beyanı dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

### Hono Uygulama Kurulumu

Hono uygulamanızı `hono-intlayer` kullanacak şekilde kurun:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// Uluslararasılaştırma istek işleyicisini yükle
app.use("*", intlayer());

// Rotalar
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      tr: "Türkçe olarak döndürülen içerik örneği",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

### Uyumluluk

`hono-intlayer` şunlarla tam uyumludur:

- React uygulamaları için [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/index.md)
- Next.js uygulamaları için [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/index.md)
- Vite uygulamaları için [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/index.md)

Ayrıca, tarayıcılar ve API istekleri dahil olmak üzere çeşitli ortamlardaki herhangi bir uluslararasılaştırma çözümüyle sorunsuz bir şekilde çalışır. Ara yazılımı başlıklar veya çerezler aracılığıyla yerel ayarı algılayacak şekilde özelleştirebilirsiniz:

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

Varsayılan olarak, `hono-intlayer` istemcinin tercih ettiği dili belirlemek için `Accept-Language` başlığını yorumlayacaktır.

> Yapılandırma ve gelişmiş konular hakkında daha fazla bilgi için [dokümantasyonumuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) ziyaret edin.

### TypeScript Yapılandırması

`hono-intlayer`, uluslararasılaştırma sürecini geliştirmek için TypeScript'in sağlam yeteneklerinden yararlanır. TypeScript'in statik tiplemesi, her çeviri anahtarının hesaba katılmasını sağlayarak eksik çeviri riskini azaltır ve bakımı iyileştirir.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Otomatik oluşturulan tiplerin (varsayılan olarak ./types/intlayer.d.ts) tsconfig.json dosyanıza dahil edildiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan tipleri dahil et
  ],
}
```

### VS Code Uzantısı

Intlayer geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Uzantısını** yükleyebilirsiniz.

[VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- Çeviri anahtarları için **otomatik tamamlama**.
- Eksik çeviriler için **gerçek zamanlı hata algılama**.
- Çevrilmiş içeriğin **satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **hızlı eylemler**.

Uzantının nasıl kullanılacağı hakkında daha fazla ayrıntı için [Intlayer VS Code Uzantısı dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakın.

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların yoksayılması önerilir. Bu, onları Git deponuza göndermekten kaçınmanızı sağlar.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```
