---
createdAt: 2026-08-23
updatedAt: 2026-08-24
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
    date: 2026-08-24
    changes: "Kılavuzu Elysia şablonuyla hizalar (context tipleme, Bun kurulumu, scriptler)"
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# Intlayer Kullanarak Elysia Backend Web Sitenizi Çevirme | Uluslararasılaştırma (i18n)

`elysia-intlayer` Elysia uygulamaları için güçlü bir uluslararasılaştırma (i18n) eklentisidir ve istemcinin tercihlerine dayalı olarak yerelleştirilmiş yanıtlar sağlayarak backend hizmetlerinizi küresel olarak erişilebilir hale getirmeye yönelik tasarlanmıştır.

> GitHub'da [paket uygulamasını görüntüleyin](https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer).

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

> Elysia **Bun** runtime'ını hedefler. `elysia-intlayer`, Node tabanlı Intlayer pluginlerinin kullandığı `cls-hooked` kütüphanesi yerine `AsyncLocalStorage`'a dayanır; çünkü Bun `async_hooks.createHook` fonksiyonunu implemente etmez.

### Kurulum

Proje kök dizininde `intlayer.config.ts` dosyası oluşturarak uluslararasılaştırma ayarlarını yapılandırın:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    /**
     * İstenen locale bulunamazsa fallback olarak kullanılan varsayılan locale.
     */
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
      es: "Ejemplo de contenido devuelto en español",
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
        "es": "Ejemplo de contenido devuelto en español"
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
import { intlayer } from "elysia-intlayer";

const app = new Elysia()
  // Uluslararasılaştırma eklentisini yükle
  .use(intlayer())
  // Rotalar
  .get("/", ({ intlayer }) => ({
    // Bu istek için kullanılan locale, `Accept-Language` üzerinden anlaşıldı veya depolamadan okundu
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      tr: "Merhaba",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> Plugin, context'ini **global** bir `derive` üzerinden kaydeder ve Elysia bunu `Partial<{ intlayer: IntlayerContext }>` olarak tipler. `.use(intlayer())` sonrasında kaydedilen route'larda değer çalışma zamanında her zaman mevcuttur; bu yüzden `strict` modda TypeScript'i memnun etmek için non-null assertion (`intlayer!.locale`) veya optional chaining kullanın.

Route context şunları sunar:

| Özellik           | Açıklama                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------- |
| `locale`          | Bu istek için kullanılacak locale; `locale_storage`, `locale_detected`'a göre önceliklidir. |
| `locale_storage`  | İstemcinin bir çerez veya başlık aracılığıyla açıkça talep ettiği locale.                   |
| `locale_detected` | İstek başlıklarından müzakere edilen locale.                                                |
| `defaultLocale`   | `intlayer.config.ts` içinde fallback olarak yapılandırılan locale.                          |
| `t`               | Bir çeviri fonksiyonu.                                                                      |
| `getIntlayer`     | Sözlükleri anahtarına göre almak için bir fonksiyon.                                        |
| `getDictionary`   | Sözlük nesnelerini işlemek için bir fonksiyon.                                              |

Aynı helper'lar standalone export olarak da sunulur. Mevcut isteği `AsyncLocalStorage` üzerinden çözdükleri için context'i destructure etmeden çağırabilirsiniz:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  .use(intlayer())
  .get("/t_example", () =>
    t({
      tr: "İngilizce'de döndürülen içerik örneği",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);
```

> İstek bağlamı, yanıt map'lendiği anda serbest bırakılır; böylece bağımsız helper'lar hiçbir zaman sonlanmış bir isteğe karşı çözümlenmez. Eklentinin işlediği bir isteğin dışında çağrıldıklarında, yapılandırılmış varsayılan locale'e geri dönerler.

### Uygulamanızı Çalıştırın

Intlayer scriptlerini `package.json` dosyanıza ekleyin. `intlayer build`, içerik bildirimlerinizi `.intlayer` dizinine derler ve TypeScript tiplerini üretir:

```json fileName="package.json"
{
  "scripts": {
    "dev": "intlayer build && bun run --watch src/index.ts",
    "build": "intlayer build",
    "start": "bun run src/index.ts",
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Ardından sunucuyu başlatın:

```bash
bun run dev
```

`Accept-Language` ile locale müzakeresini test edin:

```bash
curl -H "Accept-Language: fr" http://localhost:3000/
# {"locale":"fr","greeting":"Bonjour","content":"Exemple de contenu renvoyé en français"}

curl -H "Accept-Language: es" http://localhost:3000/
# {"locale":"es","greeting":"Hola","content":"Ejemplo de contenido devuelto en español"}
```

> `bun run src/index.ts` öncesinde `intlayer build` kesinlikle zorunlu değildir: plugin, Elysia uygulaması açılırken de sözlükleri hazırlar. Önceden çalıştırmak, üretilen tipleri editörünüz için güncel tutar ve ilk istekteki build maliyetinden kaçınmanızı sağlar.

### Uyumluluk

`elysia-intlayer` tamamen uyumludur:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/index.md) React uygulamaları için
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/index.md) Next.js uygulamaları için
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/index.md) Vite uygulamaları için

Ayrıca, tarayıcılar ve API istekleri dahil olmak üzere çeşitli ortamlarda herhangi bir uluslararasılaştırma çözümüyle sorunsuz bir şekilde çalışır.

Varsayılan olarak plugin, locale'i şu sırayla çözer:

1. `INTLAYER_LOCALE` çerezi.
2. `x-intlayer-locale` header'ı.
3. `Accept-Language` header müzakeresi.

Locale tespiti için kullanılan çerezi ve header’ı özelleştirebilirsiniz:

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

## Sıkça Sorulan Sorular

<FAQ>

<Question title="Elysia uygulamasını uluslararasılaştırmak için hangi farklı çözümler mevcuttur?">

- **Temel sözlük nesneleri**: statik analiz ve araç desteğinden yoksundur.
- **`Intlayer`**: Bun ve Elysia için özel olarak optimize edilmiş, derleme zamanı derlemesi, katı TypeScript tipleri ve sıfır gecikme sunan modern çözüm.

Arka ucu uluslararasılaştırmanın temel nedeni, bir kullanıcının okuduğu metinlerin büyük bir kısmının hiçbir zaman ön yüzden geçmemesidir: API hata mesajları, işlemsel e-postalar, anlık bildirimler, SMS ve PDF dışa aktarımları. Bunlar, oturum başına değil istek başına çözümlenen alıcının diline ihtiyaç duyar.

Bkz. [neden Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md).

</Question>

<Question title="i18n Elysia sunucu paket boyutuma ne kadar ekler?">

Geleneksel JSON kataloglarına kıyasla çok daha az. Intlayer derleyicisi derleme zamanında optimize eder ve sunucu tarafında her istek için tüm sözlükleri bellekten tekrar ayrıştırmaz, böylece bellek ayak izi ve soğuk başlatma süreleri minimumda kalır. Bkz. [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md).

</Question>

<Question title="Diğer i18n kütüphanelerinden handler'larımı yeniden yazmadan geçiş yapabilir miyim?">

Evet. Aşamalı geçiş yapabilir ve JSON dosyalarınızı Intlayer ile otomatik senkronize edebilirsiniz.

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

Elysia eklentisi `onRequest` veya `derive` aşamasında başlıkları ve çerezleri okur, dili `context.locale` içine enjekte eder.

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

<Question title="Intlayer Bun çalışma zamanı ile tam uyumlu mu?">

Evet. Intlayer Bun üzerinde yerel olarak çalışır, hızlı paket yükleme ve anında TypeScript yürütme avantajlarından tam olarak faydalanır.

</Question>

<Question title="Elysia TypeBox şemalarında yerelleştirilmiş hata mesajları kullanabilir miyim?">

Evet. Şema doğrulama hatalarını yakalayan `onError` kancasında Intlayer ile zengin yerelleştirilmiş hata yanıtları döndürebilirsiniz.

</Question>

<Question title="URL tabanlı yerel yönlendirmesini nasıl yönetirim?">

Rotalarınızda `/:locale/` yol parametresi kullanarak ve bilinmeyen diller için 404 döndürerek.

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
