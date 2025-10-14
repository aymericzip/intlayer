---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Nest backend uygulamanızı nasıl çevirirsiniz – i18n rehberi 2025
description: NestJS backend'inizi çok dilli hale getirmeyi öğrenin. Dokümantasyonu takip ederek uluslararasılaştırma (i18n) yapın ve çevirin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - NestJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - nest
applicationTemplate: https://github.com/AydinTheFirst/nestjs-intlayer
author: AydinTheFirst
history:
  - version: 5.8.0
    date: 2025-09-09
    changes: İlk doküman
---

# Intlayer ile Nest backend çevirin | Uluslararasılaştırma (i18n)

`express-intlayer`, Express uygulamaları için güçlü bir uluslararasılaştırma (i18n) middleware'idir ve istemcinin tercihlerine göre yerelleştirilmiş yanıtlar sağlayarak backend hizmetlerinizi küresel olarak erişilebilir hale getirmek için tasarlanmıştır. NestJS Express üzerine inşa edildiğinden, `express-intlayer`'ı NestJS uygulamalarınıza sorunsuz bir şekilde entegre ederek çok dilli içeriği etkili bir şekilde yönetebilirsiniz.

## Backend'inizi Neden Uluslararasılaştırasınız?

Backend'inizi uluslararasılaştırmak, küresel bir kitleye etkili bir şekilde hizmet etmek için gereklidir. Uygulamanızın her kullanıcının tercih ettiği dilde içerik ve mesajlar sunmasına izin verir. Bu yetenek, kullanıcı deneyimini geliştirir ve farklı dilsel geçmişlere sahip insanlara daha erişilebilir ve ilgili hale getirerek uygulamanızın erişimini genişletir.

### Pratik Kullanım Durumları

- **Backend Hatalarını Kullanıcının Dilinde Gösterme**: Bir hata oluştuğunda, mesajları kullanıcının ana dilinde göstermek anlayışı iyileştirir ve hayal kırıklığını azaltır. Bu, toast'lar veya modal'lar gibi ön uç bileşenlerinde gösterilebilecek dinamik hata mesajları için özellikle yararlıdır.

- **Çok Dilli İçerik Alma**: Bir veritabanından içerik çeken uygulamalar için uluslararasılaştırma, bu içeriği kullanıcının tercih ettiği dilde sunabilmenizi sağlar. Bu, ürün açıklamaları, makaleler ve diğer içerikleri kullanıcının tercih ettiği dilde görüntülemesi gereken e-ticaret siteleri veya içerik yönetim sistemleri gibi platformlar için çok önemlidir.

- **Çok Dilli E-posta Gönderme**: İşlem e-postaları, pazarlama kampanyaları veya bildirimler olsun, e-postaları alıcının dilinde göndermek etkileşimi ve etkinliği önemli ölçüde artırabilir.

- **Çok Dilli Push Bildirimleri**: Mobil uygulamalar için, push bildirimlerini kullanıcının tercih ettiği dilde göndermek etkileşimi ve elde tutmayı artırabilir. Bu kişisel dokunuş, bildirimleri daha ilgili ve eyleme geçirilebilir hale getirebilir.

- **Diğer İletişimler**: SMS mesajları, sistem uyarıları veya kullanıcı arayüzü güncellemeleri gibi backend'den gelen herhangi bir iletişim biçimi, kullanıcının dilinde olmakla fayda sağlar, netlik sağlar ve genel kullanıcı deneyimini geliştirir.

Backend'i uluslararasılaştırarak, uygulamanız sadece kültürel farklılıklara saygı göstermez, aynı zamanda küresel pazar ihtiyaçlarına daha iyi uyum sağlar ve hizmetlerinizi dünya çapında ölçeklendirmenin anahtar adımı haline gelir.

## Başlarken

### Yeni Bir NestJS Projesi Oluşturun

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Kurulum

`express-intlayer`'ı kullanmaya başlamak için paketi npm kullanarak yükleyin:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### tsconfig.json'u Yapılandırın

Intlayer'ı TypeScript ile kullanmak için `tsconfig.json`'unuzun ES modüllerini destekleyecek şekilde ayarlandığından emin olun. Bunu `module` ve `moduleResolution` seçeneklerini `nodenext` olarak ayarlayarak yapabilirsiniz.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... diğer seçenekler
  },
}
```

### Kurulum

Proje kökünde bir `intlayer.config.ts` oluşturarak uluslararasılaştırma ayarlarını yapılandırın:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

### İçeriğinizi Bildirin

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> İçerik bildirimleriniz, `contentDir` dizinine dahil edildiği sürece uygulamanızın herhangi bir yerinde tanımlanabilir (varsayılan olarak `./src`). Ve içerik bildirim dosyası uzantısıyla eşleşmelidir (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Daha fazla detay için [içerik bildirim dokümantasyonuna](/doc/concept/content) bakın.

### Express Middleware Kurulumu

Uluslararasılaştırmayı yönetmek için `express-intlayer` middleware'ini NestJS uygulamanıza entegre edin:

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // Tüm yollara uygula
  }
}
```

### Hizmetlerinizde veya Denetleyicilerinizde Çevirileri Kullanın

Artık hizmetlerinizde veya denetleyicilerinizde çevirilere erişmek için `getIntlayer` fonksiyonunu kullanabilirsiniz:

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet;
  }
}
```

### Uyumluluk

`express-intlayer` tamamen uyumludur:

- React uygulamaları için [`react-intlayer`](/doc/packages/react-intlayer)
- Next.js uygulamaları için [`next-intlayer`](/doc/packages/next-intlayer)
- Vite uygulamaları için [`vite-intlayer`](/doc/packages/vite-intlayer)

Ayrıca tarayıcılar ve API istekleri dahil çeşitli ortamlarda herhangi bir uluslararasılaştırma çözümüyle sorunsuz çalışır. Middleware'i başlık veya çerezler aracılığıyla yerel ayarları algılayacak şekilde özelleştirebilirsiniz:

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

Varsayılan olarak, `express-intlayer` istemcinin tercih ettiği dili belirlemek için `Accept-Language` başlığını yorumlayacaktır.

> Yapılandırma ve gelişmiş konular hakkında daha fazla bilgi için [dokümantasyonumuzu](/doc/concept/configuration) ziyaret edin.

### TypeScript'i Yapılandırın

`express-intlayer`, uluslararasılaştırma sürecini geliştirmek için TypeScript'in güçlü yeteneklerinden yararlanır. TypeScript'in statik yazımı, her çeviri anahtarının hesaba katılmasını sağlar, eksik çeviri riskini azaltır ve sürdürülebilirliği iyileştirir.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Otomatik oluşturulan türlerin (varsayılan olarak ./types/intlayer.d.ts) tsconfig.json dosyanıza dahil edildiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  include: [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri dahil et
  ],
}
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyimini iyileştirmek için resmi **Intlayer VS Code Uzantısı**'nı yükleyebilirsiniz.

[VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- Çeviri anahtarları için **Otomatik tamamlama**.
- Eksik çeviriler için **Gerçek zamanlı hata algılama**.
- Çevrilmiş içeriğin **Satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **Hızlı eylemler**.

Uzantının nasıl kullanılacağı hakkında daha fazla detay için [Intlayer VS Code Uzantısı dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakın.

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaları yok saymanız önerilir. Bu, onları Git deposunuza commit etmenizi önler.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yok say
.intlayer
```
