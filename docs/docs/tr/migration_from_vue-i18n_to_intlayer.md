---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "vue-i18n'den Intlayer'a Geçiş | Uluslararasılaştırma (i18n)"
description: "Vue veya Nuxt uygulamanızı vue-i18n'den Intlayer'a nasıl taşıyacağınızı adım adım, mevcut kodunuzu bozmadan öğrenin. Sorunsuz bir geçiş için @intlayer/vue-i18n uyumluluk adaptörünü kullanın."
keywords:
  - vue-i18n
  - intlayer
  - geçiş
  - migration
  - uluslararasılaştırma
  - i18n
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - migration
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# vue-i18n'den Intlayer'a Geçiş

## Neden vue-i18n'den Intlayer'a geçmelisiniz?

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

`vue-i18n`'den Intlayer'a geçiş yapmak için birbirini tamamlayan iki strateji vardır:

1. **Uyumluluk Adaptörü (Mevcut uygulamalar için önerilir)** — `@intlayer/vue-i18n` paketini kurun (Vue bileşenleri için). Bu paket arka planda tüm çeviri işlerini Intlayer'a devrederek `vue-i18n` ile **tam olarak aynı API'yi** sunar. Mevcut `$t`, `useI18n()` ve `<i18n-t>` kullanımınız dokunulmadan kalır; değişen tek şey içe aktarma yolu ve başlatma (initialization) ayarlarıdır.

2. **Tam Geçiş** — `vue-i18n` API'lerini kademeli olarak Intlayer'ın yerel (native) kancasıyla (`useIntlayer`) değiştirin ve içeriğinizi bileşenlerinizin yanındaki `.content.ts` dosyalarında tutun (colocate).

Bu kılavuz, öncelikle **Strateji 1'i** (doğrudan eklenebilir uyumluluk adaptörü) kapsar ve ardından isteğe bağlı tam geçişten bahseder.

---

## İçindekiler

<TOC/>

---

## Hızlı Geçiş

Aşağıdaki adımlar, mevcut `vue-i18n` uygulamanızı hiçbir bileşen kodunu değiştirmeden Intlayer üzerinde çalıştırmak için gereken minimum işlemlerdir.

<Steps>

<Step number={1} title="Bağımlılıkları Kurun">

Temel Intlayer paketlerini ve uyumluluk adaptörünü kurun:

```bash packageManager="npm"
npm install intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
bun x intlayer init
```

> `vue-i18n`'i güvenle yüklü bırakabilirsiniz; uyumluluk adaptörü onu TypeScript türleri için `devDependency` / `peerDependency` olarak kullanır.

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
      // vue-i18n yer tutucu sentaksıyla eşleşir: {name}
      format: "icu",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`**, bir dili JSON dosya yolunuza eşler. **`location`**, Intlayer izleyicisine (watcher) değişiklikler için hangi klasörü izlemesi gerektiğini söyler. `format: 'icu'` seçeneği, `vue-i18n` yer tutucularının (placeholder) doğru bir şekilde çözümlenmesini garanti eder.

</Step>

<Step number={3} title="Intlayer Eklentilerini Paketleyiciye (Bundler) Ekleyin">

Mevcut bundler yapılandırmanızı uyumluluk eklentisiyle sarmalayın. Bu işlem, temel Intlayer eklentisini dâhil eder, içerik izlemeyi etkinleştirir ve en önemlisi **modül takma adları (alias) enjekte eder**. Böylece `import … from 'vue-i18n'` çağrıları derleme aşamasında şeffaf bir şekilde `@intlayer/vue-i18n` adresine yönlendirilir. Kaynak kodunda hiçbir değişiklik yapmanıza gerek yoktur.

**Vite İçin:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

> `vueI18nVitePlugin()`, `vite-intlayer` altındaki normal `intlayer()` eklentisini sarmalar ve `vue-i18n` takma adlarını (alias) otomatik olarak ekler. Düzenli `intlayer()` `vite-intlayer` eklentisini kullanmak sözlükleri derler ancak alias **eklemez**; bu durumda içe aktarmaları manuel olarak `@intlayer/vue-i18n` olarak yeniden adlandırmanız gerekir (Adım 4'e bakın).

**Nuxt İçin:**

Eğer `@nuxtjs/i18n` (Nuxt entegrasyonu) kullanıyorsanız, `nuxt-intlayer` paketini yükleyip `nuxt.config.ts` dosyanıza ekleyin:

```bash packageManager="npm"
npm install nuxt-intlayer
```

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
  // @nuxtjs/i18n modülü güvenle kaldırılabilir
});
```

> **`createI18n()` veya manuel provider çağrıları artık gerekli değildir.** Intlayer tüm sözlükleri **derleme (build)** zamanında derler ve çalışma zamanında (runtime) yükleme adımını ortadan kaldırır. Alias yönlendirmesiyle sarmalanmış Provider başlatma (initialization) işlemini kendi halleder.

</Step>

</Steps>

Hızlı geçiş bu kadar. Uygulamanız artık `vue-i18n` içe aktarmalarınız ve API'niz olduğu gibi kalarak Intlayer üzerinde çalışmaktadır.

> **Türetilmiş (Typed) çeviri anahtarları — otomatik olarak.** Intlayer sözlüklerinizi derlediğinde, `useI18n`'e `namespace` seçeneğini iletirseniz kendi gerçek içeriğiniz için tür güvenli (typed) hale gelir. Anahtarlar IDE'nizde otomatik tamamlanır (autocomplete) ve geçersiz yollar, ekstra bir yapılandırma olmadan derleme (compile) anında TypeScript hatalarına neden olur.
>
> ```ts
> // 'about' kayıtlı bir sözlüktür
> const { t } = useI18n({ namespace: "about" });
> t("counter.label"); // ✓ otomatik tamamlandı
> t("does.not.exist"); // ✗ TypeScript Hatası
> ```

---

## Tam Geçiş

Aşağıdaki adımlar isteğe bağlıdır ve kademeli olarak yapılabilir. Bunlar, görsel editör, CMS, türetilmiş (typed) içerik dosyaları, AI çeviri otomasyonu gibi Intlayer özelliklerinin tam kapsamlı kullanımını sağlar.

<Steps>

<Step number={4} title="İçe Aktarmaları Açıkça Yeniden Adlandırın (İsteğe Bağlı)" isOptional={true}>

Intlayer eklentisi takma adlama (aliasing) işlemlerini bundler düzeyinde çoktan halleder. Bağımlılığı kaynak dosyalarınızda açık tutmayı tercih ederseniz, içe aktarma yollarını manuel olarak yeniden adlandırabilirsiniz:

| Öncesi                                  | Sonrası                                           |
| --------------------------------------- | ------------------------------------------------- |
| `import { useI18n } from 'vue-i18n'`    | `import { useI18n } from '@intlayer/vue-i18n'`    |
| `import { createI18n } from 'vue-i18n'` | `import { createI18n } from '@intlayer/vue-i18n'` |

Bunlar **doğrudan değişimlerdir**; fonksiyon çağırma şeklinizde, argümanlarda veya dönüş türlerinde hiçbir değişiklik gerekmez.

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
      format: "icu",
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

Uyumluluk adaptörü kullanılmaya başlandığında, aşağıdaki standart `vue-i18n` tekrarlayan kodları (boilerplate) kaldırılabilir:

| Dosya / Desen                         | Neden artık gerekli değil?                                                                                                                                                |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `createI18n()` çağrıları              | Intlayer Provider her şeyi otomatik olarak başlatır; çalışma zamanında (runtime) bir yükleme adımı yoktur.                                                                |
| Vue eklenti kaydı (`app.use(i18n)`)   | Intlayer eklentisi enjeksiyonu kendi halleder.                                                                                                                            |
| JSON dil paketleri (`locales/*.json`) | JSON paketleri yalnızca `syncJSON` eklentisini kullanmaya devam etmeniz durumunda gereklidir. `.content.ts` dosyalarına geçtikten sonra JSON klasörünü kaldırabilirsiniz. |

Bir adım öteye geçmeye hazır olduğunuzda, Intlayer **kod tabanınızın herhangi bir yerindeki (varsayılan olarak `./src` altındaki herhangi bir yerde) tüm `.content.ts` ve `.content.json` dosyalarını otomatik olarak keşfeder**. Sadece `MyComponent.vue`'nun yanına bir `my-component.content.ts` dosyası bırakın, Intlayer onu ek bir yapılandırma olmadan derleme (build) sırasında yakalayacaktır. Ne içe aktarmaya, ne kayda, ne de merkezi bir indeks dosyasına ihtiyaç vardır. Bu sayede çeviriler sayfalar ve bileşenlerinizle en kolay şekilde bir arada tutulur (colocation).

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
- **Vue İle Intlayer** — Vue için tam kurulum rehberi: [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+vue.md)
- **Nuxt İle Intlayer** — Nuxt için tam kurulum rehberi: [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nuxt.md)
