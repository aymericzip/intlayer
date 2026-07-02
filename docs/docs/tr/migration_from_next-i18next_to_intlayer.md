---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "next-i18next'ten Intlayer'a Geçiş | Uluslararasılaştırma (i18n)"
description: "Next.js uygulamanızı next-i18next'ten Intlayer'a nasıl taşıyacağınızı adım adım, mevcut kodunuzu bozmadan öğrenin. Sorunsuz bir geçiş için @intlayer/next-i18next uyumluluk adaptörünü kullanın."
keywords:
  - next-i18next
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
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# next-i18next'ten Intlayer'a Geçiş

## Neden next-i18next'ten Intlayer'a geçmelisiniz?

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

`next-i18next`, `react-i18next` ve `i18next` üzerine kurulu olduğundan, Intlayer'a geçiş için birbirini tamamlayan iki strateji vardır:

1. **Uyumluluk Adaptörü (Mevcut uygulamalar için önerilir)** — `@intlayer/next-i18next`, `@intlayer/react-i18next` ve `@intlayer/i18next` paketlerini kurun. Bu paketler arka planda tüm çeviri işlerini Intlayer'a devrederek eskisi ile **tam olarak aynı API'leri** sunar. Mevcut `useTranslation`, `appWithTranslation`, `serverSideTranslations` çağrılarınız ve Next.js Sayfa Yönlendirici (Pages Router) yapılarınız dokunulmadan kalır; değişen tek şey kurulum ve yapılandırma şeklidir.

2. **Tam Geçiş** — `next-i18next` API'lerini kademeli olarak Intlayer'ın yerel (native) kancalarıyla (`useIntlayer`) değiştirin ve içeriğinizi bileşenlerinizin yanındaki `.content.ts` dosyalarında tutun (colocate).

Bu kılavuz, öncelikle **Strateji 1'i** (doğrudan eklenebilir uyumluluk adaptörü) kapsar ve ardından isteğe bağlı tam geçişten bahseder.

---

## İçindekiler

<TOC/>

---

## Hızlı Geçiş

Aşağıdaki adımlar, mevcut Next.js (Pages Router) uygulamanızı hiçbir sayfa veya bileşen kodunu değiştirmeden Intlayer üzerinde çalıştırmak için gereken minimum işlemlerdir.

<Steps>

<Step number={1} title="Bağımlılıkları Kurun">

Temel Intlayer paketlerini ve uyumluluk adaptörlerini kurun:

```bash packageManager="npm"
npx intlayer@canary init --interactive    # v9
# npx intlayer init                       # v8
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive   # v9
# pnpm dlx intlayer init                      # v8
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive   # v9
# yarn dlx intlayer init                      # v8
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive   # v9
# bunx intlayer init                      # v8
```

> `--interactive` bayrağı isteğe bağlıdır. Bir yapay zeka aracısıysanız `intlayer-cli init` kullanın.

> Bu komut ortamınızı algılayacak ve gerekli paketleri yükleyecektir. Örneğin:

```bash packageManager="npm"
npm install intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> Geçiş sürecinde ve alias'lar çözümlenene kadar `next-i18next`, `react-i18next` ve `i18next` kurulumlarını güvenle koruyabilirsiniz.

</Step>

<Step number={2} title="Intlayer'ı Yapılandırın">

`intlayer init` komutu başlangıç olarak bir `intlayer.config.ts` dosyası oluşturur. Bunu mevcut yerel ayarlarınıza (locales) uyacak şekilde güncelleyin ve mesaj dosyalarınızı (genellikle `public/locales` dizininde bulunur) `syncJSON` eklentisine işaret edin:

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
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

> **`source`**, bir dili ve namespace'i (`key`) JSON dosya yolunuza eşler. **`location`**, Intlayer izleyicisine (watcher) değişiklikler için hangi klasörü izlemesi gerektiğini söyler. `format: 'i18next'` seçeneği, `next-i18next` yer tutucularının doğru bir şekilde çözümlenmesini garanti eder.

</Step>

<Step number={3} title="Next.js Yapılandırmanızı Güncelleyin">

Mevcut `next.config.ts` (veya `.js`) dosyanızı `@intlayer/next-i18next/plugin` tarafından sağlanan `createNextI18nPlugin` fonksiyonuyla sarın. Bu sarmalayıcı (wrapper) fonksiyon, `withIntlayer`ı uygular **ve eşzamanlı olarak** `next-i18next` / `react-i18next` / `i18next` → `@intlayer/*` takma adlarını (alias) enjekte eder; böylece `import { useTranslation } from 'next-i18next'` şeklindeki çağrılarınız yapı (build) aşamasında şeffaf bir şekilde yeniden yönlendirilir. Kod tabanınızda hiçbir değişiklik yapmanız gerekmez.

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";
// next-i18next.config.js'den gelen i18n yapılandırma içe aktarması kaldırılabilir
// import { i18n } from './next-i18next.config';

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  // Intlayer yerleşik Next.js i18n yönlendirmesini (routing) kendi altında yönetir,
  // bu yüzden i18n nesnesini burada iletmenize gerek kalmaz.
};

export default withIntlayer(nextConfig);
```

> **`next-i18next.config.js` dosyasına artık ihtiyacınız yok.** Intlayer tüm sözlükleri **derleme (build)** zamanında derler, dil tespitini, yönlendirmeyi ve sözlük yüklemesini sorunsuz bir şekilde ele alır.
>
> `next-intlayer/server`'dan saf `withIntlayer` eklentisini mi tercih ediyorsunuz? Bu yöntemi kullanırsanız sözlükler derlenecektir ancak `next-i18next` / `react-i18next` / `i18next` takma adları (aliases) **eklenmeyecektir**; bu durumda içe aktarmaları `@intlayer/*` şeklinde manuel olarak yeniden adlandırmanız gerekecektir (Adım 4'e bakın).

</Step>

</Steps>

Hızlı geçiş bu kadar. Next.js uygulamanız artık, `useTranslation`, `serverSideTranslations` ve `appWithTranslation` çağrılarınızı olduğu gibi koruyarak Intlayer üzerinde çalışmaktadır.

> **Türetilmiş (Typed) çeviri anahtarları — otomatik olarak.** Intlayer sözlüklerinizi derlediğinde, `useTranslation` ve `getFixedT` kendi gerçek içeriğiniz için tür güvenli (typed) hale gelir. Anahtarlar IDE'nizde otomatik tamamlanır (autocomplete) ve geçersiz yollar, ekstra bir yapılandırma olmadan derleme (compile) anında TypeScript hatalarına neden olur.
>
> ```tsx
> // Pages Router — 'about' kayıtlı bir sözlük isim alanıdır (namespace)
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ otomatik tamamlandı
> t("does.not.exist"); // ✗ TypeScript Hatası
>
> // getStaticProps / getServerSideProps (i18next örneği)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ tür güvenli
> ```

---

## Tam Geçiş

Aşağıdaki adımlar isteğe bağlıdır ve kademeli olarak yapılabilir. Bunlar, görsel editör, CMS, türetilmiş (typed) içerik dosyaları, AI çeviri otomasyonu gibi Intlayer özelliklerinin tam kapsamlı kullanımını sağlar.

<Steps>

<Step number={4} title="İçe Aktarmaları Açıkça Yeniden Adlandırın (İsteğe Bağlı)" isOptional={true}>

Intlayer eklentisi takma adlama (aliasing) işlemlerini bundler düzeyinde çoktan halleder. Bağımlılığı kaynak dosyalarınızda açık tutmayı tercih ederseniz, içe aktarma yollarını manuel olarak yeniden adlandırabilirsiniz:

| Öncesi                                                                         | Sonrası                                                           |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |
| `import { useTranslation } from 'react-i18next'`                               | `import { useTranslation } from '@intlayer/react-i18next'`        |

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
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
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

Uyumluluk adaptörü kullanılmaya başlandığında, aşağıdaki standart `next-i18next` tekrarlayan kodları (boilerplate) kaldırılabilir:

| Dosya / Desen                                | Neden artık gerekli değil?                                                                                                                                                |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `next-i18next.config.js`                     | Intlayer, `intlayer.config.ts` temelinde yönlendirmeyi, sözlük yüklemeyi ve dil ayarlamalarını içsel olarak yönetir.                                                      |
| `package.json` içerisindeki `next-i18next`   | Tamamen `@intlayer/next-i18next` ve takma adlarla (aliases) değiştirildi.                                                                                                 |
| JSON dil paketleri (`public/locales/*.json`) | JSON paketleri yalnızca `syncJSON` eklentisini kullanmaya devam etmeniz durumunda gereklidir. `.content.ts` dosyalarına geçtikten sonra JSON klasörünü kaldırabilirsiniz. |

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
- **Next.js (Pages Router) ile Intlayer** — Next.js için tam kurulum rehberi: [intlayer_with_nextjs_page_router.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_page_router.md)
