---
createdAt: 2025-09-07
updatedAt: 2026-05-31
title: "Express i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "Artık i18next yok. 2026 yılı için çok dilli (i18n) Express uygulaması oluşturma kılavuzu. Yapay zeka ajanlarıyla çevirin ve bundle boyutu, SEO ve performansı optimize edin."
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
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init komutu ekle"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
author: aymericzip
---

# Intlayer ile Express backend çevirin | Uluslararasılaştırma (i18n)

`express-intlayer`, Express uygulamaları için güçlü bir uluslararasılaştırma (i18n) ara yazılımıdır ve istemcinin tercihlerine göre yerelleştirilmiş yanıtlar sağlayarak arka uç hizmetlerinizi küresel olarak erişilebilir hale getirmek için tasarlanmıştır.

### Pratik Kullanım Durumları

- **Arka Uç Hatalarını Kullanıcının Dilinde Görüntüleme**: Bir hata oluştuğunda, mesajları kullanıcının ana dilinde görüntülemek anlayışı iyileştirir ve hayal kırıklığını azaltır. Bu, tostlar veya modallar gibi ön uç bileşenlerinde gösterilebilecek dinamik hata mesajları için özellikle yararlıdır.

- **Çok Dilli İçerik Alma**: Bir veritabanından içerik çeken uygulamalar için uluslararasılaştırma, bu içeriği kullanıcının tercih ettiği dilde sunabilmenizi sağlar. Bu, ürün açıklamaları, makaleler ve diğer içerikleri kullanıcının tercih ettiği dilde görüntülemesi gereken e-ticaret siteleri veya içerik yönetim sistemleri için çok önemlidir.

- **Çok Dilli E-postalar Gönderme**: İşlem e-postaları, pazarlama kampanyaları veya bildirimler olsun, e-postaları alıcının dilinde göndermek etkileşimi ve etkinliği önemli ölçüde artırabilir.

- **Çok Dilli Push Bildirimleri**: Mobil uygulamalar için, push bildirimlerini kullanıcının tercih ettiği dilde göndermek etkileşimi ve elde tutmayı artırabilir. Bu kişisel dokunuş, bildirimleri daha ilgili ve eyleme geçirilebilir hale getirebilir.

- **Diğer İletişimler**: SMS mesajları, sistem uyarıları veya kullanıcı arayüzü güncellemeleri gibi arka uçtan gelen herhangi bir iletişim biçimi, netliği sağlamak ve genel kullanıcı deneyimini geliştirmek için kullanıcının dilinde olmak faydasını görür.

Arka ucu uluslararasılaştırarak, uygulamanız sadece kültürel farklılıklara saygı göstermekle kalmaz, aynı zamanda küresel pazar ihtiyaçlarıyla daha iyi uyum sağlar ve hizmetlerinizi dünya çapında ölçeklendirmede önemli bir adım haline getirir.

## Başlarken

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-express-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-express-template) on GitHub.

### Kurulum

`express-intlayer` kullanmaya başlamak için paketi npm kullanarak yükleyin:

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

### Kurulum

Uluslararasılaştırma ayarlarını proje kökünde bir `intlayer.config.ts` oluşturarak yapılandırın:

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

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

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

> İçerik bildirimleriniz uygulamanızda herhangi bir yerde tanımlanabilir, yeter ki `contentDir` dizinine dahil edilsinler (varsayılan olarak `./src`). Ve içerik bildirim dosyası uzantısıyla eşleşsinler (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Daha fazla detay için [içerik bildirimi dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md) bakın.

### Express Uygulaması Kurulumu

Express uygulamanızı `express-intlayer` kullanacak şekilde ayarlayın:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

### Uyumluluk

`express-intlayer` tamamen uyumludur:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/index.md) React uygulamaları için
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/index.md) Next.js uygulamaları için
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/index.md) Vite uygulamaları için

Ayrıca, tarayıcılar ve API istekleri dahil olmak üzere çeşitli ortamlarda herhangi bir uluslararasılaştırma çözümüyle sorunsuz çalışır. Yerel ayarı başlık veya çerezler aracılığıyla algılamak için ara yazılımı özelleştirebilirsiniz:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

## Sıkça Sorulan Sorular

<FAQ>

<Question title="Express uygulamasını uluslararasılaştırmak için hangi farklı çözümler mevcuttur?">

- **`i18next` / `i18next-http-middleware`**: yaygın çalışma zamanı çözümü, JSON dosyaları gerektirir.
- **Elle yazılmış sözlükler**: tip denetimi ve otomatik araç desteği bulunmaz.
- **`Intlayer`**: `express-intlayer` middleware'i ile tam entegrasyon, TypeScript tip desteği, AI destekli çeviri, editoryal CMS ve ön yüzle paylaşımlı sözlük mimarisi.

Bkz. [neden Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md).

</Question>

<Question title="i18n Express sunucu paket boyutuma ne kadar ekler?">

Geleneksel JSON kataloglarına kıyasla çok daha az. Intlayer derleyicisi derleme zamanında optimize eder ve sunucu tarafında her istek için tüm sözlükleri bellekten tekrar ayrıştırmaz, böylece bellek ayak izi ve soğuk başlatma süreleri minimumda kalır. Bkz. [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md).

</Question>

<Question title="i18next veya diğer arka uç i18n kütüphanelerinden handler'larımı yeniden yazmadan geçiş yapabilir miyim?">

Evet. Aşamalı geçiş yapabilir veya uyumluluk adaptörlerini kullanarak mevcut API'lerinizi koruyabilirsiniz.

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

`app.use(intlayer())` middleware'i istekleri sırasıyla URL ön eki, tanımlama bilgisi (cookie), `Accept-Language` başlığı ve son olarak varsayılan dil üzerinden analiz eder. Algılanan yerel `req.locale` üzerinde saklanır.

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

<Question title="Özel bir dil algılayıcı kullanabilir miyim?">

Evet. Özel bir middleware yazarak oturum verilerinden veya kullanıcı veritabanı profilinden yerel dil bilgisini çekip `req.locale` nesnesine atayabilirsiniz.

</Question>

<Question title="Express rotalarımda yerelleştirilmiş URL ön eklerini nasıl kullanırım?">

Intlayer yönlendirme seçenekleri aracılığıyla veya rotalarınıza `/:locale/` segmenti ekleyerek. `validatePrefix` geçerli dilleri doğrular.

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
