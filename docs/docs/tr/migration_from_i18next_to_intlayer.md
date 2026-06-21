---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "i18next'ten Intlayer'a Geçiş | Uluslararasılaştırma (i18n)"
description: "JavaScript/TypeScript uygulamanızı i18next'ten Intlayer'a nasıl taşıyacağınızı adım adım, mevcut kodunuzu bozmadan öğrenin. Sorunsuz bir geçiş için @intlayer/i18next uyumluluk adaptörünü kullanın."
keywords:
  - i18next
  - intlayer
  - geçiş
  - migration
  - uluslararasılaştırma
  - i18n
  - JavaScript
  - Node.js
slugs:
  - doc
  - migration
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# i18next'ten Intlayer'a Geçiş

## Neden i18next'ten Intlayer'a geçmelisiniz?

<AccordionGroup>

<Accordion header="Paket Boyutu (Bundle Size)">

Sayfalarınıza devasa JSON dosyalarını yüklemek yerine yalnızca gerekli içeriği yükleyin. Intlayer, **paket ve sayfa boyutunuzu %50'ye kadar azaltmanıza** yardımcı olur.

</Accordion>

<Accordion header="Sürdürülebilirlik">

Uygulamanızın içeriğini kapsamlandırmak (scoping), büyük ölçekli uygulamaları **sürdürmesi kolay** hale getirir. Tüm içerik kod tabanınızı gözden geçirme yükü olmadan bir özellik dizinini silebilir veya kopyalayabilirsiniz. Ayrıca, Intlayer içeriğinizin doğruluğunu garanti etmek için **sıkı bir şekilde yazılmıştır (strongly typed)**.

Intlayer aynı zamanda i18n ekosisteminde **en aktif şekilde geliştirilen** çözümdür — sorunlar hızlıca çözülür, yeni framework adaptörleri düzenli olarak yayınlanır ve çekirdek API, üretimdeki gerçek geri bildirimlere dayanarak sürekli olarak iyileştirilir.

</Accordion>

<Accordion header="Yapay Zeka (AI) Ajanları">

İçeriğin (kod ile) bir arada bulunması (colocation), Büyük Dil Modelleri (LLM'ler) için **gerekli bağlamı azaltır**. Intlayer ayrıca eksik çevirileri test etmek için bir **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)** ve yapay zeka ajanları için Geliştirici Deneyimini (DX) çok daha pürüzsüz hale getiren **[Ajan Yetenekleri (Agent Skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)** gibi bir dizi araç sunar.

</Accordion>

<Accordion header="Otomasyon">

Seçtiğiniz bir LLM'yi kullanarak, CI/CD süreçlerinizdeki çevirileri kendi AI sağlayıcınızın maliyeti üzerinden otomatikleştirin. Intlayer ayrıca içerik çıkarma işlemini otomatikleştiren bir **derleyici** ve **arka planda çeviriye** yardımcı olmak için bir [web platformu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) sunar.

</Accordion>

<Accordion header="Performans">

Büyük JSON dosyalarını bileşenlere bağlamak, performans ve reaktivite sorunlarına yol açabilir. Intlayer, derleme (build) zamanında içeriğin yüklenmesini optimize eder.

</Accordion>

<Accordion header="Geliştirici Olmayanlarla Ölçeklenebilirlik">

Basit bir i18n çözümünden çok daha fazlası olan Intlayer, çok dilli içeriğinizi **gerçek zamanlı** olarak yönetmenize yardımcı olan kendi barındırdığınız (self-hosted) bir **[görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)** ve **[tam donanımlı bir CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)** sağlar. Bu, çevirmenler, metin yazarları ve ekibin diğer üyeleriyle sorunsuz bir işbirliği sağlar. İçerik yerel ve/veya uzak bir sunucuda barındırılabilir.

</Accordion>

</AccordionGroup>

---

## Geçiş Stratejileri

`i18next`'ten Intlayer'a geçiş yapmak için birbirini tamamlayan iki strateji vardır:

1. **Uyumluluk Adaptörü (Mevcut uygulamalar için önerilir)** — `@intlayer/i18next` paketini kurun. Bu paket, arka planda tüm çeviri işini Intlayer'a devrederek `i18next` ile **tamamen aynı API'yi** sunar. Mevcut `i18next.t()`, `i18next.changeLanguage()` ve `createInstance()` çağrılarınız dokunulmadan kalır; değişen tek şey içe aktarma yolu ve başlatma (initialization) ayarlarıdır.

2. **Tam Geçiş** — `i18next` API'lerini kademeli olarak Intlayer'ın yerel (native) araçlarıyla değiştirin ve içeriğinizi bileşenlerinizin yanındaki `.content.ts` dosyalarında tutun (colocate).

Bu kılavuz, öncelikle **Strateji 1'i** (doğrudan eklenebilir uyumluluk adaptörü) kapsar ve ardından isteğe bağlı tam geçişten bahseder.

---

## İçindekiler

<TOC/>

---

## Hızlı Geçiş

Aşağıdaki adımlar, mevcut `i18next` uygulamanızı herhangi bir kod değişikliği yapmadan Intlayer üzerinde çalıştırmak için gereken minimum işlemlerdir.

<Steps>

<Step number={1} title="Bağımlılıkları Kurun">

Temel Intlayer paketi ile uyumluluk adaptörünü kurun:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> `--interactive` bayrağı isteğe bağlıdır. Bir yapay zeka aracısıysanız `intlayer-cli init` kullanın.

> Bu komut ortamınızı algılayacak ve gerekli paketleri yükleyecektir. Örneğin:

```bash packageManager="npm"
npm install intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

> `i18next` kurulumunu güvenle yerinde bırakabilirsiniz; uyumluluk adaptörü TypeScript türleri için onu bir `devDependency` / `peerDependency` olarak kullanır.

</Step>

<Step number={2} title="Intlayer'ı Yapılandırın">

`intlayer init` komutu başlangıç olarak bir `intlayer.config.ts` dosyası oluşturur. Bunu mevcut yerel ayarlarınıza (locales) uyacak şekilde güncelleyin ve mesaj dosyalarınızı `syncJSON` eklentisine işaret edin:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Mevcut diğer dillerinizi (locales) buraya ekleyin
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // i18next yer tutucu sentaksıyla eşleşir: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`**, bir yerel ayarı JSON dosya yolunuza eşler. **`location`**, Intlayer izleyicisine (watcher) değişiklikler için hangi klasörü izlemesi gerektiğini söyler. `format: 'i18next'` seçeneği, `{{name}}` gibi yer tutucuların (placeholder) doğru bir şekilde çözümlenmesini garanti eder.

</Step>

<Step number={3} title="Paketleyici (Bundler) Alias'ını Güncelleyin (Opsiyonel)">

Bir bundler (Vite, Webpack, esbuild) kullanıyorsanız, `import ... from 'i18next'` komutunun otomatik olarak `@intlayer/i18next` adresine çözümlenmesini sağlayan bir modül takma adı (alias) enjekte edebilirsiniz. Bu, kod tabanınızdaki içe aktarma yollarını manuel olarak değiştirme zorunluluğunu ortadan kaldırır.

**Vite İçin:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import i18nextVitePlugin from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

> `i18nextVitePlugin()`, `vite-intlayer` altındaki normal `intlayer()` eklentisini sarmalar ve `i18next` → `@intlayer/i18next` alias'ını otomatik olarak ekler. Düzenli `intlayer()` `vite-intlayer` eklentisini kullanmak sözlükleri derler ancak alias **eklemez**; bu durumda içe aktarmaları manuel olarak `@intlayer/i18next` olarak yeniden adlandırmanız gerekir (sonraki adıma bakın).

</Step>

</Steps>

Hızlı geçiş bu kadar. Uygulamanız artık `i18next` içe aktarmalarınız ve API'nizi olduğu gibi koruyarak Intlayer üzerinde çalışmaktadır.

---

## Tam Geçiş

Aşağıdaki adımlar isteğe bağlıdır ve kademeli olarak yapılabilir. Bunlar, görsel editör, CMS, türetilmiş (typed) içerik dosyaları, AI çeviri otomasyonu gibi Intlayer özelliklerinin tam kapsamlı kullanımını sağlar.

<Steps>

<Step number={4} title="İçe Aktarmaları Açıkça Yeniden Adlandırın (İsteğe Bağlı)" isOptional={true}>

Bağımlılığı kaynak dosyalarınızda açık tutmayı veya içe aktarma alias'ı oluşturan bir bundler eklentisi kullanmamayı tercih ederseniz, içe aktarma yollarını manuel olarak yeniden adlandırabilirsiniz:

| Öncesi                                     | Sonrası                                              |
| ------------------------------------------ | ---------------------------------------------------- |
| `import i18next from 'i18next'`            | `import i18next from '@intlayer/i18next'`            |
| `import { createInstance } from 'i18next'` | `import { createInstance } from '@intlayer/i18next'` |
| `import { t } from 'i18next'`              | `import { t } from '@intlayer/i18next'`              |

Bunlar **doğrudan değişimlerdir**; fonksiyon çağırma şeklinizde, parametrelerde veya dönüş türlerinde değişiklik gerekmez.

</Step>

<Step number={5} title="AI Çeviri Otomasyonunu Etkinleştirin" isOptional={true}>

Intlayer yapılandırıldığında, eksik çevirileri otomatik olarak doldurmak için CLI'yı kullanabilirsiniz:

```bash packageManager="npm"
# Eksik çevirileri test et (CI'a ekleyin)
npx intlayer test

# Eksik çevirileri AI kullanarak doldur
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

AI yapılandırmanızı `intlayer.config.ts` dosyasına ekleyin:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // varsayılan
    // model: "gpt-4o-mini",   // varsayılan
  },
};

export default config;
```

> Mevcut tüm seçenekleri incelemek için [Intlayer CLI Dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) göz atın.

</Step>

</Steps>

---

## Geçişten Sonra Silinebilecekler

Uyumluluk adaptörü kullanılmaya başlandığında, aşağıdaki standart `i18next` tekrarlayan kodları (boilerplate) kaldırılabilir:

| Dosya / Desen                         | Neden artık gerekli değil?                                                                                                                                                |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `i18next.init()` çağrıları            | Intlayer her şeyi otomatik olarak başlatır; çalışma zamanında (runtime) bir yükleme adımı yoktur.                                                                         |
| `i18next.use(...)`                    | Intlayer, i18next eklentilerini, arka uçlarını veya dil tespit edicilerini kullanmaz.                                                                                     |
| JSON dil paketleri (`locales/*.json`) | JSON paketleri yalnızca `syncJSON` eklentisini kullanmaya devam etmeniz durumunda gereklidir. `.content.ts` dosyalarına geçtikten sonra JSON klasörünü kaldırabilirsiniz. |

Bir adım öteye geçmeye hazır olduğunuzda, Intlayer **kod tabanınızın herhangi bir yerindeki (varsayılan olarak `./src` altındaki herhangi bir yerde) tüm `.content.ts` ve `.content.json` dosyalarını otomatik olarak keşfeder**. Sadece kodunuzun yanına bir `my-component.content.ts` dosyası bırakın, Intlayer onu ek bir yapılandırma olmadan derleme (build) sırasında yakalayacaktır. Ne içe aktarmaya, ne kayda, ne de merkezi bir indeks dosyasına ihtiyaç vardır. Bu sayede çeviriler bileşenlerinizle en kolay şekilde bir arada tutulur (colocation).

---

## TypeScript Kurulumu

Intlayer, çeviri anahtarlarınız için kapsamlı TypeScript IntelliSense'i (otomatik tamamlama) sağlamak için modül genişletme (module augmentation) özelliğini kullanır. `tsconfig.json` dosyanızın otomatik oluşturulan türleri içerdiğinden emin olun:

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri içeriğe dahil edin
  ],
}
```

---

## Git Yapılandırması

Intlayer tarafından oluşturulan dizini `.gitignore` dosyanıza ekleyin:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

---

## Daha Fazlasını Keşfedin

- **Görsel Editör** — Çevirileri doğrudan tarayıcınızda görsel olarak yönetin: [Intlayer Görsel Editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)
- **CMS** — İçeriği projenizden ayırın ve uzaktan yönetin: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)
- **VS Code Eklentisi** — Otomatik tamamlama ve anında hata tespiti (hover) edinin: [Intlayer VS Code Eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)
- **CLI Referansı** — CLI komutlarının tam listesi: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md)
