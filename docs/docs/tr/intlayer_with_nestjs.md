---
createdAt: 2025-09-09
updatedAt: 2026-05-31
title: "NestJS i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "Artık i18next yok. 2026 yılı için çok dilli (i18n) NestJS uygulaması oluşturma kılavuzu. Yapay zeka ajanlarıyla çevirin ve bundle boyutu, SEO ve performansı optimize edin."
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
author:
  name: AydinTheFirst
  github: AydinTheFirst
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init komutu ekle"
  - version: 5.8.0
    date: 2025-09-09
    changes: "İlk doküman"
---

# Intlayer Kullanarak Nest Backend Web Sitenizi Çevirme | Uluslararasılaştırma (i18n)

`express-intlayer`, Express uygulamaları için güçlü bir uluslararasılaştırma (i18n) middleware'idir. İstemcinin tercihlerine dayalı olarak yerelleştirilmiş yanıtlar sağlayarak backend hizmetlerinizi küresel olarak erişilebilir hale getirmek için tasarlanmıştır. NestJS, Express üzerine inşa edildiğinden, `express-intlayer`'ı NestJS uygulamalarınıza sorunsuzca entegre edebilir ve çok dilli içeriği etkili bir şekilde yönetebilirsiniz.

tical Use Cases

- **Arka Uç Hatalarını Kullanıcının Dilinde Göstermek**: Bir hata oluştuğunda, mesajları kullanıcının ana dilinde göstermek anlayışı artırır ve hayal kırıklığını azaltır. Bu, toast veya modal gibi ön uç bileşenlerinde gösterilebilecek dinamik hata mesajları için özellikle yararlıdır.

- **Çok Dilli İçerik Alma**: Bir veritabanından içerik çeken uygulamalar için, uluslararasılaştırma bu içeriği birden fazla dilde sunmanızı sağlar. Bu, ürün açıklamaları, makaleler ve diğer içeriği kullanıcının tercih ettiği dilde görüntülemesi gereken e-ticaret siteleri veya içerik yönetim sistemleri gibi platformlar için çok önemlidir.

- **Çok Dilli E-postalar Gönderme**: İşlem e-postaları, pazarlama kampanyaları veya bildirimler olsun, e-postaları alıcının dilinde göndermek katılımı ve etkinliği önemli ölçüde artırabilir.

- **Çok Dilli Push Bildirimleri**: Mobil uygulamalar için, push bildirimlerini kullanıcının tercih ettiği dilde göndermek etkileşimi ve kullanıcı alıkanlığını artırabilir. Bu kişisel dokunuş, bildirimleri daha alakalı ve harekete geçirilebilir hale getirebilir.

- **Diğer İletişimler**: SMS mesajları, sistem uyarıları veya kullanıcı arayüzü güncellemeleri gibi backend'den gelen her türlü iletişim, kullanıcının dilinde olmasından yararlanır ve netliği sağlar, genel kullanıcı deneyimini iyileştirir.

Backend'i uluslararasılaştırarak, uygulamanız sadece kültürel farklılıklara saygı göstermekle kalmaz, aynı zamanda küresel pazar ihtiyaçlarıyla daha iyi uyumlanır ve bu da hizmetlerinizi dünya çapında ölçeklendirmenin kilit adımını oluşturur.

## Başlarken

### Yeni Bir NestJS Projesi Oluşturun

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Kurulum

`express-intlayer`'ı kullanmaya başlamak için paketi npm kullanarak yükleyin:

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

> `--interactive` bayrağı isteğe bağlıdır. Bir yapay zeka aracısıysanız `intlayer-cli init` kullanın.

> Bu komut ortamınızı algılayacak ve gerekli paketleri yükleyecektir. Örneğin:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

```bash packageManager="bun"
bun add intlayer express-intlayer
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

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### İçeriğinizi Bildirin

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

> İçerik bildirimleriniz, `contentDir` dizinine dahil edildiği sürece uygulamanızın herhangi bir yerinde tanımlanabilir (varsayılan olarak `./src`). Ve içerik bildirim dosyası uzantısıyla eşleşmelidir (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

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
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
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

## Sıkça Sorulan Sorular

<FAQ>

<Question title="NestJS uygulamasını uluslararasılaştırmak için hangi farklı çözümler mevcuttur?">

- **`nestjs-i18n`**: popüler NestJS modülü, JSON ve YAML dosyaları kullanır.
- **`Intlayer`**: bağımlılık enjeksiyonu (DI) ve interceptor mimarisine tam uyumlu, derleme zamanında tiplenen, AI çevirili ve ön yüzle ortak sözlük paylaşan modern çözüm.

Arka ucu uluslararasılaştırmanın temel nedeni, bir kullanıcının okuduğu metinlerin büyük bir kısmının hiçbir zaman ön yüzden geçmemesidir: API hata mesajları, işlemsel e-postalar, anlık bildirimler, SMS ve PDF dışa aktarımları. Bunlar, oturum başına değil istek başına çözümlenen alıcının diline ihtiyaç duyar.

Bkz. [neden Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md).

</Question>

<Question title="i18n NestJS sunucu paket boyutuma ne kadar ekler?">

Geleneksel JSON kataloglarına kıyasla çok daha az. Intlayer derleyicisi derleme zamanında optimize eder ve sunucu tarafında her istek için tüm sözlükleri bellekten tekrar ayrıştırmaz, böylece bellek ayak izi ve soğuk başlatma süreleri minimumda kalır. Bkz. [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md).

</Question>

<Question title="nestjs-i18n'den handler'larımı ve servislerimi yeniden yazmadan geçiş yapabilir miyim?">

Büyük ölçüde evet. [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) mevcut çeviri dosyalarınızı korurken Intlayer sözlükleri üretir.

</Question>

<Question title="Mevcut JSON çeviri dosyalarımı koruyabilir miyim?">

Evet. [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md), `/messages/{locale}/{namespace}.json` dosyalarınızı doğruluk kaynağı olarak tutar ve her iki yönde Intlayer sözlükleri üretir. [sync PO eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md) gettext katalogları için aynısını yapar ve [yerel başına dosyalar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/per_locale_file.md), yerelleri tek bir dosyada gruplamak yerine içeriği dile göre ayırmanıza olanak tanır.

</Question>

<Question title="İçeriğimi anahtar anahtar taşımak zorunda mıyım?">

Hayır. `npx intlayer extract` komutunu çalıştırın; Intlayer kaynak dosyalarınızı okur, kullanıcıya dönük dizeleri çıkarır ve her birinin yanına bir `.content` dosyası yazar, böylece dizeleri tek tek kopyalamak yerine bir diff incelersiniz. Bkz. [extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md).

Tam otomatik bir süreç için [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) derleme sırasında aynı işlemi yapar ve sözlükleri her değişiklikte otomatik üretir.

</Question>

<Question title="Hangi editör ve AI aracı araçları mevcuttur?">

Beş araç, hepsi isteğe bağlı:

- **[VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)**: bir anahtardan onu tanımlayan içerik dosyasına atlayın ve komut paletinden build, fill, test, push ve pull komutlarını çalıştırın.
- **[LSP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**: LSP destekleyen tüm editörlerde tanıma gitme, tüm referansları bulma, çevrilmiş değerlerin fareyle üzerine gelindiğinde önizlemesi ve otomatik tamamlama. `i18next` çağrılarını da çözer.
- **[MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)**: Intlayer dokümantasyonunu ve CLI'sini Cursor, VS Code, Claude Desktop, Claude Code ve ChatGPT'ye sunar.
- **[Ajan becerileri (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)**: `intlayer-config`, `intlayer-cli` ve `intlayer-content` gibi odaklanmış beceriler.
- **[ESLint eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/eslint.md)**: `no-raw-text` kuralı doğrudan kodlanmış metinleri işaretler.

</Question>

<Question title="Gelen isteklerde istemcinin dili nasıl algılanır?">

Bir NestJS Interceptor veya Middleware gelen istek başlıklarını ve çerezleri çözümler, dili istek kapsamına bağlar.

</Question>

<Question title="Aynı içerik bildirimleri hem API yanıtlarıma hem de web ön yüzüme hizmet verebilir mi?">

Evet, monorepo veya paylaşılan paketlerde bu en büyük avantajlardan biridir. Bildirilen bir sözlük hem arka uçta (e-posta, hata kodları, API yanıtları) hem de ön uçta (React, Vue, Svelte vb.) doğrudan içe aktarılabilir. Böylece ön yüz ve arka uç aynı metinler için tek bir doğruluk kaynağı kullanır.

</Question>

<Question title="Intlayer istek işlemeyi yavaşlatır mı?">

Hayır. Dil algılama hafif bir middleware içinde gerçekleştirilir (çerez, sorgu veya Accept-Language başlığı taranır). Sözlükler derleme zamanında derlenip bellekte hazır tutulduğundan, istek anında disk okuması veya şablon ayrıştırması yapılmaz.

</Question>

<Question title="Hata yanıtlarını, e-postaları ve push bildirimlerini nasıl yerelleştiririm?">

İstek bağlamındaki yerel dil bilgisine göre `getIntlayer` veya `t()` fonksiyonunu çağırarak. Kullanıcının tercih ettiği dil profilde veya veritabanında saklanıyorsa, istek dışı arka plan işlerinde de hedef yerel açıkça fonksiyona iletilebilir.

</Question>

<Question title="Intlayer NestJS bağımlılık enjeksiyonu (DI) ile nasıl çalışır?">

Intlayer servisleri veya interceptor'ları NestJS IoC konteynerine enjekte edilebilir, böylece denetleyicilerinizde (controllers) ve sağlayıcılarınızda (providers) yerel dili kolayca yönetebilirsiniz.

</Question>

<Question title="NestJS DTO doğrulama mesajlarını yerelleştirebilir miyim?">

Evet. `class-validator` özel dekoratörlerinde veya exception filter'larında Intlayer `t()` veya `getIntlayer()` işlevini çağırarak hata mesajlarını yerelleştirebilirsiniz.

</Question>

<Question title="Uygulamayı AI ile otomatik olarak nasıl çevirebilirim?">

`npx intlayer fill` komutunu çalıştırın. Eksik çevirileri seçtiğiniz LLM ile kendi sağlayıcınız ve API anahtarınızı kullanarak tamamlar ve `--git-diff` işlemi daldaki değişikliklerle sınırlar. Bkz. [fill komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md) ve [CI/CD entegrasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/CI_CD.md).

</Question>

<Question title="Intlayer çoğulları, cinsiyeti ve zengin metni (rich text) destekliyor mu?">

Evet: [çoğul biçimleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/plurial.md), [cinsiyete dayalı içerik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/gender.md), koşullar, [eklemeler (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/insertion.md) ve [biçimlendiriciler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/formatters.md).

</Question>

<Question title="Teknik olmayan ekip üyeleri kod değiştirmeden e-posta şablonlarını ve hata mesajlarını nasıl düzenleyebilir?">

İki seçenek mevcuttur: içeriği kod tabanından ayıran ve ekibin metinleri doğrudan web üzerinden düzenlemesini sağlayan [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) veya yerel içerik dosyalarını web arayüzü üzerinden düzenleyip depoya commit oluşturan [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md).

</Question>

<Question title="Intlayer ücretsiz ve açık kaynaklı mı?">

Evet, ticari kullanım dahil Apache 2.0 lisansı altındadır. Barındırılan CMS isteğe bağlı ücretli bir hizmettir ve ayrıca [kendi sunucunuzda barındırılabilir (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md).

</Question>

</FAQ>
