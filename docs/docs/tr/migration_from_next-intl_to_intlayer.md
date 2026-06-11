---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "next-intl'den Intlayer'a Geçiş | Uluslararasılaştırma (i18n)"
description: "Next.js uygulamanızı next-intl'den Intlayer'a nasıl taşıyacağınızı adım adım, mevcut kodunuzu bozmadan öğrenin. Sorunsuz bir geçiş için @intlayer/next-intl uyumluluk adaptörünü kullanın."
keywords:
  - next-intl
  - intlayer
  - geçiş
  - migration
  - uluslararasılaştırma
  - i18n
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - migration
  - next-intl
history:
  - version: 8.13.0
    date: 2026-06-05
    changes: "Init history"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# next-intl'den Intlayer'a Geçiş

## Neden next-intl'den Intlayer'a geçmelisiniz?

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

## Geçiş Stratejisi

Mevcut uygulamalar için önerilen yaklaşım, **uyumluluk adaptörünü** kullanmaktır: `@intlayer/next-intl` paketini kurun. Bu paket, arka planda tüm çeviri işini Intlayer'a devrederek `next-intl` ile **tamamen aynı API'yi** sunar.

`useTranslations`, `getTranslations`, `NextIntlClientProvider` vb. mevcut dosyalarınızda olduğu gibi kalır; **değişen tek şey içe aktarma yoludur**. Herhangi bir çağrı sentaksını, özellik (props) adını veya bileşen kurgunuzu değiştirmeniz gerekmez.

Zamanla, görsel editör, CMS ve bileşen düzeyi bağlamından (scoping) yararlanmak için bağımsız dosyaları yavaş yavaş Intlayer'ın daha güçlü `.content.ts` biçimine dönüştürebilirsiniz—fakat bu adım tamamen isteğe bağlıdır ve adım adım uygulanabilir.

---

## İçindekiler

<TOC/>

---

## Hızlı Geçiş

Aşağıdaki adımlar, mevcut `next-intl` uygulamanızı herhangi bir kod değişikliği yapmadan Intlayer üzerinde çalıştırmak için gereken minimum işlemlerdir.

<Steps>

<Step number={1} title="Bağımlılıkları Kurun">

Temel Intlayer paketlerini ve `@intlayer/next-intl` uyumluluk adaptörünü kurun:

```bash packageManager="npm"
npm install intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
bun x intlayer init
```

> `next-intl`'i yüklü bırakın; **URL yönlendirmesi (routing)** için (`createNavigation`, `createMiddleware`, `Link`, `redirect`, `usePathname`, `useRouter`) gereklidir. Uyumluluk adaptörü yönlendirme katmanını **değiştirmez**.

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
      // 'icu', next-intl'nin ICU yer tutucu formatıyla eşleşir: {name}, {count, plural, ...}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

> **`source`**, bir dili JSON dosya yolunuza eşler. **`location`**, Intlayer izleyicisine (watcher) değişiklikler için hangi klasörü izlemesi gerektiğini söyler. `format: 'icu'` seçeneği, `{name}` ve `{count, plural, one {# item} other {# items}}` gibi ICU yer tutucularının (placeholder) doğru bir şekilde çözümlenmesini garanti eder.

> Mevcut tüm seçeneklerin tam listesi için [Yapılandırma Dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) göz atın.

</Step>

<Step number={3} title="Intlayer Eklentisini Next.js'e Entegre Edin">

Mevcut Next.js konfigürasyonunuzu `@intlayer/next-intl/plugin` paketindeki `createNextIntlPlugin` fonksiyonu ile sarmalayın. Bu eklenti `withIntlayer` kuralını uygular **ve eşzamanlı olarak** `next-intl` → `@intlayer/next-intl` takma ad (alias) enjeksiyonunu otomatik olarak kaydeder:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* Mevcut Next.js seçenekleriniz */
};

export default withIntlayer(nextConfig);
```

> `createNextIntlPlugin()`, `withIntlayer`'ı sarmalar, **Webpack** veya **Turbopack**'i otomatik algılar, içerik izleyicisini bağlar, sözlükleri ön derler ve en önemlisi **modül takma adları (alias) enjekte eder**. Böylece mevcut `import … from 'next-intl'` çağrıları derleme aşamasında otomatik olarak `@intlayer/next-intl` adresine yönlendirilir. `next-intl/routing` gibi yönlendirme içe aktarmaları gerçek pakete yönlendirilmeye devam edecektir. Kaynak kodunda hiçbir değişiklik yapmanıza gerek yoktur.
>
> Eğer saf `withIntlayer` (sadece `next-intlayer/server` kullanarak) eklentisini tercih ederseniz, bu durumda sözlükleriniz derlenecektir ancak takma adlar (aliases) **eklenmeyecektir**. İçe aktarmaları `@intlayer/next-intl` olarak manuel olarak yeniden adlandırmanız gerekecektir (Adım 4'e bakın).

> **`getRequestConfig` yapılandırması ya da mesaj yüklemek artık gerekli değildir.** `next-intl` için `src/i18n.ts` adında, `getRequestConfig` üzerinden her istek (request) için JSON mesaj paketlerini yükleyen bir dosya oluşturmanız gerekirdi. Intlayer tüm sözlükleri **derleme (build)** anında derlediği için istek (request) başı ayrı mesaj yükleme adımına ihtiyaç kalmamaktadır. Bu dosyayı güvenle silebilirsiniz (eğer `createNavigation` için kullanıyorsanız sadece yönlendirme (routing) satırlarını tutabilirsiniz).

</Step>

</Steps>

Hızlı geçiş bu kadar. Uygulamanız artık `next-intl` içe aktarmalarınız ve API'niz olduğu gibi kalarak Intlayer üzerinde çalışmaktadır.

> **Türetilmiş (Typed) çeviri anahtarları — otomatik olarak.** Intlayer sözlüklerinizi derlediğinde, `useTranslations` ve `getTranslations` özellikleri, kendi gerçek içeriğiniz için tam anlamıyla tür güvenli (typed) hale gelir. IDE'nizdeki anahtarlar otomatik tamamlanacak (autocomplete) ve geçersiz yollar herhangi bir ilave yapılandırma gerektirmeden derleme zamanında TypeScript hatası üretecektir.
>
> ```tsx
> // İstemci bileşeni (Client component) — 'about' kayıtlı bir sözlük anahtarıdır
> const t = useTranslations("about");
> t("counter.label"); // ✓ otomatik tamamlandı
> t("does.not.exist"); // ✗ TypeScript Hatası
>
> // Sunucu bileşeni (Server component)
> const t = await getTranslations("about");
> t("counter.label"); // ✓ tür güvenli (typed)
> ```

---

## Tam Geçiş

Aşağıdaki adımlar isteğe bağlıdır ve kademeli olarak yapılabilir. Bunlar, görsel editör, CMS, türetilmiş (typed) içerik dosyaları, AI çeviri otomasyonu gibi Intlayer özelliklerinin tam kapsamlı kullanımını sağlar.

<Steps>

<Step number={4} title="İçe Aktarmaları Açıkça Yeniden Adlandırın (İsteğe Bağlı)" isOptional={true}>

`createNextIntlPlugin()` sarmalayıcısı (wrapper) bundler tarafında `next-intl` → `@intlayer/next-intl` takma adlamasını (aliasing) otomatik gerçekleştirir. Bağımlılığı kaynak dosyalarınızda açık tutmayı tercih ederseniz (ve karşılığında standart saf `withIntlayer` eklentisini kullanmak isterseniz), içe aktarmaları manuel olarak şu şekilde değiştirebilirsiniz:

| Öncesi                                               | Sonrası                                                        |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| `import { useTranslations } from 'next-intl'`        | `import { useTranslations } from '@intlayer/next-intl'`        |
| `import { useLocale } from 'next-intl'`              | `import { useLocale } from '@intlayer/next-intl'`              |
| `import { NextIntlClientProvider } from 'next-intl'` | `import { NextIntlClientProvider } from '@intlayer/next-intl'` |
| `import { getTranslations } from 'next-intl/server'` | `import { getTranslations } from '@intlayer/next-intl/server'` |
| `import { getLocale } from 'next-intl/server'`       | `import { getLocale } from '@intlayer/next-intl/server'`       |
| `import { setLocale } from 'next-intl/server'`       | `import { setLocale } from '@intlayer/next-intl/server'`       |
| `import { getMessages } from 'next-intl/server'`     | `import { getMessages } from '@intlayer/next-intl/server'`     |

> Yönlendirme ile ilgili içe aktarmaların her zaman gerçek `next-intl`'den geldiğinden emin olun — uyumluluk adaptörü next-intl'nin URL yönlendirme işleyişini **değiştirmez**:
>
> ```ts
> // ✅ Bunları gerçek 'next-intl' paketinden almayı sürdürün
> import { createNavigation } from "next-intl/routing";
> import { createMiddleware } from "next-intl/server";
> import { defineRouting } from "next-intl/routing";
> ```
>
> Alternatif olarak, `@intlayer/next-intl/routing` içindeki `defineRouting`'i kullanmak, ortamları `intlayer.config.ts` dosyanızla otomatik olarak birleştirebilir.

</Step>

<Step number={5} title="AI Çeviri Otomasyonunu Etkinleştirin" isOptional={true}>

Intlayer yapılandırıldığında, seçtiğiniz bir LLM modeliyle eksik çevirileri otomatik olarak doldurmak için CLI'yı kullanabilirsiniz:

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

`OPENAI_API_KEY` (veya desteklenen başka bir anahtar) değişkeninizi yerel `.env` dosyanıza ekleyin ve sonrasında `intlayer.config.ts` dosyanızı güncelleyin:

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
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
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

`@intlayer/next-intl` kullanılmaya başlandığında, aşağıdaki standart `next-intl` tekrarlayan kodları (boilerplate) kaldırılabilir:

| Dosya / Desen                                                           | Neden artık gerekli değil?                                                                                                                                                         |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/i18n.ts` içindeki `getRequestConfig` dosyanız (Dışa aktarma dahil) | Intlayer, derleme (build) zamanında içeriği derler. İstek-başı (per-request) JSON yüklemesi tamamen ortadan kalkar. Sadece `createNavigation` ayarlamaları için saklayabilirsiniz. |
| Düzen (Layout) dosyalarınızdaki `getMessages()` çağrıları               | `@intlayer/next-intl` sağlayıcısından (provider) gelen `NextIntlClientProvider`, derlenmiş çıktıları otomatik okur; `messages` öğesi prop olarak zorunlu olmaktan çıkar.           |
| JSON paket yükleyicileri (`messages/*.json`)                            | JSON paketleri yalnızca `syncJSON` eklentisini kullanmaya devam etmeniz durumunda gereklidir. `.content.ts` dosyalarına geçtikten sonra JSON klasörünü kaldırabilirsiniz.          |

Bir adım öteye geçmeye hazır olduğunuzda, Intlayer **kod tabanınızın herhangi bir yerindeki (varsayılan olarak `./src` altındaki herhangi bir yerde) tüm `.content.ts` ve `.content.json` dosyalarını otomatik olarak keşfeder**. Sadece `about/page.tsx`'in yanına bir `about.content.ts` dosyası bırakın, Intlayer onu ek bir yapılandırma olmadan derleme (build) sırasında yakalayacaktır. Ne içe aktarmaya, ne kayda, ne de merkezi bir indeks dosyasına ihtiyaç vardır. Bu sayede çeviriler sayfalar ve bileşenlerinizle en kolay şekilde bir arada tutulur (colocation).

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
- **Next.js İle Intlayer** — Next.js için tam kurulum rehberi: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md)
