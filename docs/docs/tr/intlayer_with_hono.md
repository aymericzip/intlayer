---
createdAt: 2025-08-23
updatedAt: 2026-05-31
priority: 9
title: "Hono i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "Hono'da Intlayer kurulumu: middleware ile her istekte locale algılama, API yanıtlarını çevirme; Node, Bun veya edge runtime'larda çalışır."
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
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init komutu ekle"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmişi başlat"
author: aymericzip
---

# Intlayer kullanarak Hono arka uç web sitenizi çevirin

`hono-intlayer`, Hono uygulamaları için güçlü bir uluslararasılaştırma (i18n) ara yazılımıdır. İstemcinin tercihlerine göre yerelleştirilmiş yanıtlar sağlayarak arka uç hizmetlerinizi küresel olarak erişilebilir kılmak için tasarlanmıştır.

## Pratik Kullanım Durumları

- **Arka Uç Hatalarını Kullanıcının Dilinde Görüntüleme**: Bir hata oluştuğunda, mesajların kullanıcının ana dilinde görüntülenmesi anlayışı artırır ve hayal kırıklığını azaltır. Bu, özellikle toastlar veya modallar gibi ön uç bileşenlerinde gösterilebilecek dinamik hata mesajları için yararlıdır.

- **Çok Dilli İçerik Getirme**: Veri tabanından içerik çeken uygulamalar için uluslararasılaştırma, bu içeriği birden fazla dilde sunabilmenizi sağlar. Bu, ürün açıklamalarını, makaleleri ve diğer içerikleri kullanıcının tercih ettiği dilde görüntülemesi gereken e-ticaret siteleri veya içerik yönetim sistemleri gibi platformlar için çok önemlidir.

- **Çok Dilli E-postalar Gönderme**: İster işlemsel e-postalar, ister pazarlama kampanyaları veya bildirimler olsun, e-postaları alıcının dilinde göndermek katılımı ve etkinliği önemli ölçüde artırabilir.

- **Çok Dilli Anlık Bildirimler**: Mobil uygulamalar için, anlık bildirimleri kullanıcının tercih ettiği dilde göndermek etkileşimi ve elde tutmayı artırabilir. Bu kişisel dokunuş, bildirimlerin daha alakalı ve harekete geçirici hissedilmesini sağlayabilir.

- **Diğer İletişimler**: SMS mesajları, sistem uyarıları veya kullanıcı arayüzü güncellemeleri gibi arka uçtan gelen her türlü iletişim biçimi, kullanıcının dilinde olmaktan yararlanarak netlik sağlar ve genel kullanıcı deneyimini geliştirir.

Arka ucu uluslararasılaştırarak, uygulamanız yalnızca kültürel farklılıklara saygı duymakla kalmaz, aynı zamanda küresel pazar ihtiyaçlarıyla daha iyi uyum sağlar ve bu da hizmetlerinizi dünya çapında ölçeklendirmede kilit bir adım haline gelir.

## Başlarken

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-hono-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-hono-template) on GitHub.

### Kurulum

`hono-intlayer` kullanmaya başlamak için paketi npm kullanarak yükleyin:

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
npm install intlayer hono-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
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

```typescript fileName="src/index.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

```javascript fileName="src/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      tr: "İngilizce olarak döndürülen içeriğin örneği",
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

> İçerik beyanlarınız, `contentDir` dizinine (varsayılan olarak `./src`) dahil edildikleri sürece uygulamanızın herhangi bir yerinde tanımlanabilir. Ve içerik beyanı dosya uzantısıyla (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) eşleşmelidir.

> Daha fazla ayrıntı için [içerik beyanı dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

- [içerik beyanı dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md)

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

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/exports.md)
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/exports.md)
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/exports.md)

Ayrıca, tarayıcılar ve API istekleri dahil olmak üzere çeşitli ortamlardaki herhangi bir uluslararasılaştırma çözümüyle sorunsuz bir şekilde çalışır. Ara yazılımı başlıklar veya çerezler aracılığıyla yerel ayarı algılayacak şekilde özelleştirebilirsiniz:

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

Varsayılan olarak, `hono-intlayer` istemcinin tercih ettiği dili belirlemek için `Accept-Language` başlığını yorumlayacaktır.

> Yapılandırma ve gelişmiş konular hakkında daha fazla bilgi için [dokümantasyonumuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) ziyaret edin.

- [Intlayer yapılandırması (intlayer.config.ts)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)

### TypeScript Yapılandırması

`hono-intlayer`, uluslararasılaştırma sürecini geliştirmek için TypeScript'in sağlam yeteneklerinden yararlanır. TypeScript'in statik tiplemesi, her çeviri anahtarının hesaba katılmasını sağlayarak eksik çeviri riskini azaltır ve bakımı iyileştirir.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

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

- [VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- Çeviri anahtarları için **otomatik tamamlama**.
- Eksik çeviriler için **gerçek zamanlı hata algılama**.
- Çevrilmiş içeriğin **satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **hızlı eylemler**.

Uzantının nasıl kullanılacağı hakkında daha fazla ayrıntı için [Intlayer VS Code Uzantısı dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md) bakın.

- [Intlayer VS Code Uzantısı dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların yoksayılması önerilir. Bu, onları Git deponuza göndermekten kaçınmanızı sağlar.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

## Sıkça Sorulan Sorular

<FAQ>

<Question title="Hono uygulamasını uluslararasılaştırmak için hangi farklı çözümler mevcuttur?">

Hono'nun kendine ait bir i18n katmanı yoktur, bu nedenle seçenekler bir ara yazılıma (middleware) manuel olarak bağlanan `i18next` gibi genel bir kütüphane veya ara yazılımı sizin için kaydeden, istek başına yerel ayarı çözen ve ön ucunuzla aynı bildirilen içeriği paylaşan `hono-intlayer` aracılığıyla `Intlayer`dır.

Arka ucu uluslararasılaştırmanın temel nedeni, kullanıcının okuduğu metnin büyük bir kısmının ön uçtan asla geçmemesidir: API hata mesajları, işlemsel e-postalar, anlık bildirimler, SMS ve PDF dışa aktarmaları. Bunlar, oturum başına yerine istek başına çözülen alıcının diline ihtiyaç duyar.

Bkz. [neden Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md).

- [neden Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md)

</Question>
<Question title="i18n Hono sunucu paket boyutuma ne kadar ekler?">

Çok az. Sözlükler önceden derlenir ve yalnızca bildirdiğiniz yerel ayarlar dahil edilir, bu nedenle açılışta katalog yüklemesi ve istek yolunda dosya okuması yoktur. Bu, paket boyutunun soğuk başlatma süresini belirlediği serverless ve edge dağıtımlarında en çok önem taşır. Bkz. [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md).

- [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md)

</Question>
<Question title="`i18next`'ten handler'larımı yeniden yazmadan geçiş yapabilir miyim?">

Evet, ve iki yol vardır. İçeriği [i18next geçiş rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_i18next_to_intlayer.md) ile aşamalı olarak taşıyabilirsiniz. Ya da mevcut API'nizi tamamen koruyabilirsiniz: [uyumluluk adaptörleri (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md), `i18next` ile birebir aynı API'yi sunar ancak Intlayer sözlükleriyle beslenir; böylece yalnızca import'lar değişir, handler kodu değişmez.

- [i18next geçiş rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_i18next_to_intlayer.md)
- [uyumluluk adaptörleri (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md)

</Question>
<Question title="Mevcut JSON çeviri dosyalarımı koruyabilir miyim?">

Evet. [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md), `/messages/{locale}/{namespace}.json` dosyalarınızı doğruluk kaynağı olarak tutar ve her iki yönde Intlayer sözlükleri üretir. [sync PO eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md) gettext katalogları için aynısını yapar ve [yerel başına dosyalar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/per_locale_file.md), yerelleri tek bir dosyada gruplamak yerine içeriği dile göre ayırmanıza olanak tanır.

- [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md)
- [sync PO eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md)
- [yerel başına dosyalar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/per_locale_file.md)

</Question>
<Question title="İçeriğimi anahtar anahtar taşımak zorunda mıyım?">

Hayır. `npx intlayer extract` komutunu çalıştırın; Intlayer kaynak dosyalarınızı okur, kullanıcıya dönük dizeleri çıkarır ve her birinin yanına bir `.content` dosyası yazar, böylece dizeleri bir kataloğa tek tek kopyalamak yerine bir diff incelersiniz. Bkz. [extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md).

- [extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md)

Aynı projenin ön uç tarafında [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) daha da ileri gider ve sözlükleri derleme zamanında JSX, TSX, Vue veya Svelte kaynağınızdan üretir; böylece uygulamanın iki yarısı, elle yönetilen hiçbir anahtar olmadan tek bir içerik katmanını paylaşır.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md)

</Question>
<Question title="Hangi editör ve AI ajan araçları mevcuttur?">

Beş araç, hepsi isteğe bağlı:

- **[VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)**: bir `useIntlayer` anahtarından onu tanımlayan içerik dosyasına atlayın, bir bileşenden içerik çıkarın ve komut paletinden veya özel bir Intlayer sekmesinden build, fill, test, push ve pull komutlarını çalıştırın.
- **[LSP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**: LSP destekleyen her editörde aynı farkındalık: tanıma gitme, tüm referansları bulma, çevrilmiş değerin fareyle üzerine gelindiğinde önizlemesi, anahtar ve alanların otomatik tamamlanması ve bir anahtar hiçbir yerde tanımlanmadığında uyarı. Ayrıca `i18next`, `react-i18next`, `next-intl` ve `use-intl` çağrılarını da çözer; bu da geçiş sırasında yardımcı olur.
- **[MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)**: Intlayer dokümantasyonunu ve CLI'sini Cursor, VS Code, Claude Desktop, Claude Code ve ChatGPT'ye sunar; böylece asistan tahmin etmek yerine güncel dokümantasyona dayanarak yanıt verir ve `intlayer fill` gibi komutları kendisi çalıştırabilir.
- **[Ajan becerileri (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)**: `intlayer-config`, `intlayer-cli` ve `intlayer-content` gibi odaklanmış beceriler ile her framework için bir beceri; ajana yönlendirme kurulumunuzu ve içerik düğümü türlerini öğretir.
- **[ESLint eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/eslint.md)**: `no-raw-text` doğrudan kodlanmış metinleri işaretler; statik sözlük anahtarları ve kullanılmayan içerik için ek kurallar da vardır.

</Question>
<Question title="Intlayer hangi dilde yanıt vereceğini nasıl bilir?">

Varsayılan olarak `hono-intlayer`, gelen isteğin `Accept-Language` başlığını okur ve bildirilen en yakın yerel ayarı seçer, gerekirse varsayılan yerel ayarınıza geri döner. Kaynağı `routing.storage` ile değiştirebilirsiniz; örneğin özel bir başlık veya ön ucunuzun ayarladığı bir çerez kullanarak API'nin, tarayıcının bildirdiği dil yerine kullanıcının gerçekten seçtiği dilde yanıt vermesini sağlayabilirsiniz. Bkz. [yapılandırma referansı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md).

- [yapılandırma referansı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)

</Question>
<Question title="Yerel ayar her istek için izole mi?">

Evet. Middleware etkin yerel ayarı isteğin kapsamıyla sınırlar, bu nedenle farklı dillerdeki iki eşzamanlı istek hiçbir zaman birbirinin yerel ayarını okumaz. `t()` ve `getIntlayer()` fonksiyonlarını, her fonksiyona bir yerel ayar argümanı geçirmeden bir servis içinden güvenle çağırabilmenizi sağlayan da budur.

</Question>
<Question title="İşlemsel e-postaları alıcının dilinde nasıl gönderirim?">

E-posta içeriğini diğer içerikler gibi bir içerik dosyasında bildirin, ardından istek yerel ayarı yerine alıcının kayıtlı yerel ayarı için `getIntlayer` ile çözümleyin. Bu, dilin kullanıcı kaydına ait olduğu ve başlık okunacak gelen bir isteğin bulunmadığı işler (jobs) ve kuyruklar için önemlidir.

</Question>
<Question title="API hata mesajlarını nasıl yerelleştiririm?">

Mesajı, hatanın oluşturulduğu noktada `t()` ile sarın. Etkin istek yerel ayarı onu çözümler; böylece istemci doğrudan gösterebileceği bir mesaj alır ve ön ucunuzun hata kodları için paralel bir kataloğa ihtiyacı kalmaz.

</Question>
<Question title="Cloudflare Workers, Deno veya Bun gibi edge çalışma ortamlarında çalışır mı?">

Hono bunların hepsini hedefler ve Intlayer, içeriği çalışma zamanında diskten katalog dosyaları okuyarak değil, derleme zamanında derlenen sözlüklerden çözümler; edge ortamlarında genellikle bozulan da bu disk okumasıdır. İçeriğin worker ile birlikte paketlenmesi için `dictionary.importMode` değerini varsayılan `"static"` olarak bırakın.

</Question>
<Question title="Arka uç içeriğini AI ile otomatik olarak nasıl çevirebilirim?">

`npx intlayer fill` komutunu çalıştırın; eksik çevirileri kendi sağlayıcınız ve API anahtarınızla, seçtiğiniz LLM kullanarak tamamlar. Yalnızca dalda değişen içeriği çevirmek için `--git-diff` ekleyin. Bkz. [fill komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md) ve [CI/CD entegrasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/CI_CD.md).

- [fill komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md)
- [CI/CD entegrasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/CI_CD.md)

</Question>
<Question title="Intlayer sunucu tarafında çoğulları, cinsiyeti ve enterpolasyonlu değerleri destekliyor mu?">

Evet: [çoğul biçimleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/plurial.md), [cinsiyete dayalı içerik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/gender.md), koşullar, enterpolasyonlu değerler için [eklemeler (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/insertion.md), e-posta gövdeleri için [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/markdown.md) ve sayılar, tarihler ve para birimleri için [biçimlendiriciler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/formatters.md).

- [çoğul biçimleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/plurial.md)
- [cinsiyete dayalı içerik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/gender.md)
- [eklemeler (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/markdown.md)
- [biçimlendiriciler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/formatters.md)

</Question>
<Question title="Sunucu tarafında TypeScript otomatik tamamlama alır mıyım?">

Evet. Intlayer sözlüklerinizin tiplerini `./types/intlayer.d.ts` içine üretir; bu nedenle var olmayan bir anahtar çalışma zamanında boş bir dize değil, bir derleme hatası olur. Bildirilen bir yerel ayarda içerik eksik olduğunda derlemeyi başarısız kılmak için CI'da `npx intlayer test` çalıştırın.

</Question>
<Question title="Ön uç ve arka uç aynı içeriği paylaşabilir mi?">

Evet, olağan kurulum da budur. `hono-intlayer`, aynı bildirilen içerik üzerinde `react-intlayer`, `next-intlayer` ve `vite-intlayer` ile birlikte çalışır; böylece hem bir API yanıtında hem de bir sayfada kullanılan bir etiket yalnızca bir kez bildirilir. Bkz. [Intlayer nasıl çalışır](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/how_works_intlayer.md).

- [Intlayer nasıl çalışır](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/how_works_intlayer.md)

</Question>
<Question title="Intlayer ücretsiz ve açık kaynaklı mı?">

Evet, ticari kullanım dahil Apache 2.0 lisansı altındadır. Barındırılan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) isteğe bağlı ücretli bir hizmettir ve ayrıca [kendi sunucunuzda barındırılabilir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md).

- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)
- [kendi sunucunuzda barındırma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md)

</Question>

</FAQ>
