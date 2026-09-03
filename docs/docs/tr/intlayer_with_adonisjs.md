---
createdAt: 2025-08-23
updatedAt: 2026-05-31
title: "AdonisJS i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "Artık i18next yok. 2026 yılı için çok dilli (i18n) AdonisJS uygulaması oluşturma kılavuzu. Yapay zeka ajanlarıyla çevirin ve bundle boyutu, SEO ve performansı optimize edin."
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
applicationTemplate: https://github.com/aymericzip/intlayer-adonis-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 8.0.0
    date: 2025-12-30
    changes: "Geçmişi başlat"
author: aymericzip
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
  src="https://ide.intlayer.org/aymericzip/intlayer-adonis-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-adonis-template) on GitHub.

### Kurulum

`adonis-intlayer` kullanmaya başlamak için paketi npm kullanarak yükleyin:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> `--interactive` bayrağı isteğe bağlıdır. Bir yapay zeka aracısıysanız `intlayer-cli init` kullanın.

> Bu komut ortamınızı algılayacak ve gerekli paketleri yükleyecektir. Örneğin:

```bash packageManager="npm"
npm install intlayer adonis-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
```

### Kurulum

Proje kök dizininizde bir `intlayer.config.ts` oluşturarak uluslararasılaştırma ayarlarını yapılandırın:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

### İçeriğinizi Tanımlayın

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

```typescript fileName="app/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> İçerik bildirimleriniz, `contentDir` dizinine (varsayılan olarak `./src` veya `./app`) dahil edildikleri sürece uygulamanızın herhangi bir yerinde tanımlanabilir. Ve içerik bildirimi dosya uzantısıyla (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) eşleşmelidir.

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
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
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

## Sıkça Sorulan Sorular

<FAQ>

<Question title="AdonisJS uygulamasını uluslararasılaştırmak için hangi farklı çözümler mevcuttur?">

- **`@adonisjs/i18n`**: resmi AdonisJS i18n paketi.
- **`Intlayer`**: hem arka uç hem de modern ön yüz entegrasyonu sunan, TypeScript tipli, AI çevirili, editoryal CMS destekli gelişmiş çözüm.

Arka ucu uluslararasılaştırmanın temel nedeni, bir kullanıcının okuduğu metinlerin büyük bir kısmının hiçbir zaman ön yüzden geçmemesidir: API hata mesajları, işlemsel e-postalar, anlık bildirimler, SMS ve PDF dışa aktarımları. Bunlar, oturum başına değil istek başına çözümlenen alıcının diline ihtiyaç duyar.

Bkz. [neden Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md).

</Question>

<Question title="i18n AdonisJS sunucu paket boyutuma ne kadar ekler?">

Geleneksel JSON kataloglarına kıyasla çok daha az. Intlayer derleyicisi derleme zamanında optimize eder ve sunucu tarafında her istek için tüm sözlükleri bellekten tekrar ayrıştırmaz, böylece bellek ayak izi ve soğuk başlatma süreleri minimumda kalır. Bkz. [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md).

</Question>

<Question title="@adonisjs/i18n'den handler'larımı yeniden yazmadan geçiş yapabilir miyim?">

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

AdonisJS HTTP middleware'i `HttpContext` üzerinden çerez ve başlıkları inceler, yereli `ctx.locale` üzerinde saklar.

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

<Question title="Intlayer Edge şablonları (EdgeJS) ile çalışır mı?">

Evet. Intlayer yardımcılarını Edge global değişkenlerine bağlayarak `.edge` şablonlarınızda doğrudan yerelleştirilmiş metinleri render edebilirsiniz.

</Question>

<Question title="VineJS doğrulama mesajlarını nasıl yerelleştiririm?">

VineJS özel hata mesajı tanımlayıcılarında Intlayer `t()` veya `getIntlayer()` işlevini çağırarak kullanıcı diline uygun hata metinleri üretebilirsiniz.

</Question>

<Question title="AdonisJS rotalarında yerel segmentlerini nasıl yönetirim?">

AdonisJS rota gruplarında `prefix('/:locale')` tanımlayarak ve yerel doğrulama middleware'i uygulayarak.

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
