---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "react-i18next / i18next'ten Intlayer'a Geçiş | Uluslararasılaştırma (i18n)"
description: "React veya Next.js uygulamanızı react-i18next veya i18next'ten Intlayer'a nasıl taşıyacağınızı adım adım, mevcut kodunuzu bozmadan öğrenin. Sorunsuz bir geçiş için @intlayer/react-i18next ve @intlayer/i18next uyumluluk adaptörlerini kullanın."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - geçiş
  - migration
  - uluslararasılaştırma
  - i18n
  - Next.js
  - React
  - JavaScript
slugs:
  - doc
  - migration
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# react-i18next / i18next'ten Intlayer'a Geçiş

## Neden react-i18next / i18next'ten Intlayer'a geçmelisiniz?

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

`react-i18next` / `i18next`'ten Intlayer'a geçiş yapmak için birbirini tamamlayan iki strateji vardır:

1. **Uyumluluk Adaptörü (Mevcut uygulamalar için önerilir)** — `@intlayer/react-i18next` (React bileşenleri için) ve/veya `@intlayer/i18next` (kök `i18n` örneği (instance) için) paketlerini kurun. Bu paketler arka planda tüm çeviri işlerini Intlayer'a devrederek `react-i18next` / `i18next` ile **tam olarak aynı API'yi** sunar. Mevcut `useTranslation`, `Trans`, `withTranslation`, `i18next.t()` kullanımınız dokunulmadan kalır; değişen tek şey içe aktarma yoludur.

2. **Tam Geçiş** — `react-i18next` API'lerini kademeli olarak Intlayer'ın yerel (native) araçlarıyla (`useIntlayer`, `IntlayerProvider`) değiştirin ve içeriğinizi bileşenlerinizin yanındaki `.content.ts` dosyalarında tutun (colocate).

Bu kılavuz, öncelikle **Strateji 1'i** (doğrudan eklenebilir uyumluluk adaptörü) kapsar ve ardından isteğe bağlı tam geçişten bahseder.

---

## İçindekiler

<TOC/>

---

## Hızlı Geçiş

Aşağıdaki adımlar, mevcut `react-i18next` uygulamanızı hiçbir bileşen kodunu değiştirmeden Intlayer üzerinde çalıştırmak için gereken minimum işlemlerdir.

<Steps>

<Step number={1} title="Bağımlılıkları Kurun">

Temel Intlayer paketlerini ve uyumluluk adaptörünü kurun:

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
bun x intlayer init
```

> `react-i18next` ve `i18next`'i güvenle yüklü bırakabilirsiniz; uyumluluk adaptörü bunları TypeScript türleri için `devDependency` / `peerDependency` olarak kullanır. `package.json` dosyanızdaki herhangi bir eş bağımlılığı (peer dependency) değiştirmeniz gerekmez.

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
      // react-i18next yer tutucu sentaksıyla eşleşir: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`**, bir dili JSON dosya yolunuza eşler. **`location`**, Intlayer izleyicisine (watcher) değişiklikler için hangi klasörü izlemesi gerektiğini söyler. `format: 'i18next'` seçeneği, `{{name}}` gibi yer tutucuların (placeholder) doğru bir şekilde çözümlenmesini garanti eder.

</Step>

<Step number={3} title="Intlayer Eklentilerini Paketleyiciye (Bundler) Ekleyin">

Mevcut bundler yapılandırmanızı uyumluluk eklentisiyle sarmalayın. Bu işlem, temel Intlayer eklentisini dâhil eder, içerik izlemeyi etkinleştirir ve en önemlisi **modül takma adları (alias) enjekte eder**. Böylece `import … from 'react-i18next'` (ve `'i18next'`) komutları derleme aşamasında şeffaf bir şekilde `@intlayer/react-i18next` / `@intlayer/i18next` adresine yönlendirilir. Kaynak kodunda hiçbir değişiklik yapmanıza gerek yoktur.

**Vite İçin:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

> `reactI18nextVitePlugin()`, `vite-intlayer` altındaki normal `intlayer()` eklentisini sarmalar ve `react-i18next` / `i18next` takma adlarını (alias) otomatik olarak ekler. Düzenli `intlayer()` `vite-intlayer` eklentisini kullanmak sözlükleri derler ancak alias **eklemez**; bu durumda içe aktarmaları manuel olarak `@intlayer/*` olarak yeniden adlandırmanız gerekir (Adım 4'e bakın).

**Next.js İçin:**

Eğer `next-i18next` (Pages Router entegrasyonu) kullanıyorsanız, `@intlayer/next-i18next` ve `next-intlayer` kurun:

```bash packageManager="npm"
npm install @intlayer/next-i18next next-intlayer
```

Sonra uyumluluk eklentisini `next.config.ts` dosyanıza ekleyin (bu, `next-i18next` / `react-i18next` / `i18next` için takma ad (alias) enjekte edecektir):

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  /* diğer yapılandırma ayarlarınız */
};

export default withIntlayer(nextConfig);
```

> **`i18next.init()` veya manuel provider çağrıları artık gerekli değildir.** Intlayer tüm sözlükleri **derleme (build)** zamanında derler ve çalışma zamanında (runtime) yükleme adımını ortadan kaldırır. Alias yönlendirmesiyle sarmalanmış Provider başlatma (initialization) işlemini kendi halleder.

</Step>

</Steps>

Hızlı geçiş bu kadar. Uygulamanız artık `react-i18next` içe aktarmalarınız ve API'niz olduğu gibi kalarak Intlayer üzerinde çalışmaktadır.

> **Türetilmiş (Typed) çeviri anahtarları — otomatik olarak.** Intlayer sözlüklerinizi derlediğinde, `useTranslation` ve `getFixedT` kendi gerçek içeriğiniz için tür güvenli (typed) hale gelir. Anahtarlar IDE'nizde otomatik tamamlanır (autocomplete) ve geçersiz yollar, ekstra bir yapılandırma olmadan derleme (compile) anında TypeScript hatalarına neden olur.
>
> ```tsx
> // 'about' kayıtlı bir sözlüktür → t() sadece geçerli yolları kabul eder
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ otomatik tamamlandı
> t("does.not.exist"); // ✗ TypeScript Hatası
>
> // Sunucu (Server) Tarafı (i18next örneği)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ tür güvenli (typed)
> ```

---

## Tam Geçiş

Aşağıdaki adımlar isteğe bağlıdır ve kademeli olarak yapılabilir. Bunlar, görsel editör, CMS, türetilmiş (typed) içerik dosyaları, AI çeviri otomasyonu gibi Intlayer özelliklerinin tam kapsamlı kullanımını sağlar.

<Steps>

<Step number={4} title="İçe Aktarmaları Açıkça Yeniden Adlandırın (İsteğe Bağlı)" isOptional={true}>

Intlayer eklentisi takma adlama (aliasing) işlemlerini bundler düzeyinde çoktan halleder. Bağımlılığı kaynak dosyalarınızda açık tutmayı tercih ederseniz, içe aktarma yollarını manuel olarak yeniden adlandırabilirsiniz:

| Öncesi                                             | Sonrası                                                      |
| -------------------------------------------------- | ------------------------------------------------------------ |
| `import { useTranslation } from 'react-i18next'`   | `import { useTranslation } from '@intlayer/react-i18next'`   |
| `import { Trans } from 'react-i18next'`            | `import { Trans } from '@intlayer/react-i18next'`            |
| `import { withTranslation } from 'react-i18next'`  | `import { withTranslation } from '@intlayer/react-i18next'`  |
| `import { I18nextProvider } from 'react-i18next'`  | `import { I18nextProvider } from '@intlayer/react-i18next'`  |
| `import { initReactI18next } from 'react-i18next'` | `import { initReactI18next } from '@intlayer/react-i18next'` |
| `import i18next from 'i18next'`                    | `import i18next from '@intlayer/i18next'`                    |
| `import { createInstance } from 'i18next'`         | `import { createInstance } from '@intlayer/i18next'`         |
| `import { t } from 'i18next'`                      | `import { t } from '@intlayer/i18next'`                      |

Next.js (`next-i18next`) İçin:

| Öncesi                                                                         | Sonrası                                                           |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |

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

Uyumluluk adaptörü kullanılmaya başlandığında, aşağıdaki standart `react-i18next` / `i18next` tekrarlayan kodları (boilerplate) kaldırılabilir:

| Dosya / Desen                          | Neden artık gerekli değil?                                                                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `i18next.init()` çağrıları             | Intlayer Provider her şeyi otomatik olarak başlatır; çalışma zamanında (runtime) bir yükleme adımı yoktur.                                                                |
| `I18nextProvider` / `initReactI18next` | Intlayer eklentisi enjeksiyon (injection) ve başlatma (bootstrapping) adımlarını arka planda kendi halleder.                                                              |
| JSON dil paketleri (`locales/*.json`)  | JSON paketleri yalnızca `syncJSON` eklentisini kullanmaya devam etmeniz durumunda gereklidir. `.content.ts` dosyalarına geçtikten sonra JSON klasörünü kaldırabilirsiniz. |

Bir adım öteye geçmeye hazır olduğunuzda, Intlayer **kod tabanınızın herhangi bir yerindeki (varsayılan olarak `./src` altındaki herhangi bir yerde) tüm `.content.ts` ve `.content.json` dosyalarını otomatik olarak keşfeder**. Sadece `MyComponent.tsx`'in yanına bir `my-component.content.ts` dosyası bırakın, Intlayer onu ek bir yapılandırma olmadan derleme (build) sırasında yakalayacaktır. Ne içe aktarmaya, ne kayda, ne de merkezi bir indeks dosyasına ihtiyaç vardır. Bu sayede çeviriler sayfalar ve bileşenlerinizle en kolay şekilde bir arada tutulur (colocation).

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
- **React İle Intlayer** — React için tam kurulum rehberi: [intlayer_with_vite+react.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+react.md)
- **Next.js İle Intlayer** — Next.js için tam kurulum rehberi: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md)
