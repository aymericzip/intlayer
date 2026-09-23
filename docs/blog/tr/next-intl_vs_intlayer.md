---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl ve Intlayer Karşılaştırması: 2026 Kıyaslama Testi"
description: "Next.js App Router ve TanStack Start üzerinde next-intl ve Intlayer karşılaştırması. Paket boyutu, içerik sızıntısı, bileşen boyutu, hidrasyon ve geliştirici deneyimi."
keywords:
  - next-intl
  - use-intl
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer
author: aymericzip
---

# next-intl ve Intlayer Karşılaştırması | React & Next.js Uluslararasılaşma (i18n) Testi

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`next-intl`, Next.js için en popüler i18n kütüphanesidir. Intlayer ise derleyici tabanlı, bileşen kapsamlı bir alternatiftir. Her ikisi de bir App Router uygulamasını yerelleştirir. Soru, uygulama derlendikten sonra her birinin maliyetinin ne olduğudur.

Bu makale bir kılavuz değildir. Her kütüphaneyle aynı uygulamayı derleyen ve tarayıcının gerçekte ne indirip çalıştırdığını ölçen açık kaynaklı bir karşılaştırma paketi olan [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) verileriyle desteklenen bir karşılaştırmadır.

<TOC/>

> **tl;dr**: Aynı Next.js uygulamasında, `next-intl` her sayfaya **+12.6 KB gzip** JavaScript eklerken, Intlayer için bu **+0.3 KB**'dir. Ekstra bir çalışma olmadan, `next-intl` her sayfayla birlikte **diğer sayfaların dizgilerinin yaklaşık %90'ını** gönderir. `next-intl` ile %0 sızıntıya ulaşmak ad alanı kapsamlandırması ve sayfa başına `pick(messages, [...])` gerektirir. Intlayer, derleyicisi içeriği bileşen başına kapsamlandırdığı için varsayılan olarak %0'a ulaşır. Intlayer çıktısıyla `next-intl` API'sini korumak istiyorsanız, `@intlayer/next-intl` bağdaştırıcısı orijinalin **153.6 KB** değerine karşılık sayfa başına **147.5 KB** olarak ölçülmüştür.

## Kısaca

- **next-intl** - Next.js topluluk standardı. Dil başına merkezi JSON sözlükleri, tam ICU MessageFormat desteği ve Next.js istek işleme ile yönlendirme mekanizmasına derin entegrasyon.
- **Intlayer** - Bileşen odaklı içerik modeli. `.content.ts` dosyaları doğrudan bileşenlerin yanında bulunur, derleme zamanı derleyicisi bunları bileşen ve dil başına tree-shake ve tembel yükleme yapar, katı TypeScript tiplerini otomatik üretir.

| Kütüphane             | GitHub Yıldızları                                                                                                                                                              | Toplam Commit                                                                                                                                                                      | Son Commit                                                                                                                                          | İlk Sürüm  | NPM Sürümü                                                                                                    | NPM İndirmeleri                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Nisan 2024 | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   |
| `amannn/next-intl`    | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       | Mart 2021  | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) |

> Rozetler otomatik olarak güncellenir.

## Özellik karşılaştırması

| Özellik                                         | Intlayer (`react-intlayer` / `next-intlayer`)                                       | next-intl (`next-intl` / `use-intl`)                                                |
| ----------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Bileşenlerin yanında çeviriler**              | ✅ Evet, `.content.ts` her bileşenin hemen yanında bulunur                          | ❌ `messages/` dizininde merkezi JSON sözlükleri                                    |
| **TypeScript entegrasyonu**                     | ✅ İçerikten otomatik üretilen katı tipler                                          | ⚠️ Manuel `global.d.ts` kurulumuyla desteklenir                                     |
| **Eksik çeviri tespiti**                        | ✅ TypeScript hatası + derleme zamanı hatası/uyarısı                                | ⚠️ Çalışma zamanında eksik anahtarı döndürür veya yapılandırmaya göre hata fırlatır |
| **Zengin içerik (JSX / Markdown / bileşenler)** | ✅ Doğrudan destek                                                                  | ⚠️ Eşleme bileşenleri ile `t.rich()` üzerinden                                      |
| **ICU MessageFormat desteği**                   | ⚠️ Geliştirilmekte                                                                  | ✅ Evet, tam ICU desteği                                                            |
| **Eşzamanlı sunucu bileşenleri**                | ✅ `next-intlayer/server` altındaki `useIntlayer` alt sunucu bileşenlerinde çalışır | ❌ Asenkron sunucu ebeveyninden props yoluyla çevirilerin aktarılmasını gerektirir  |
| **Tree-shaking**                                | ✅ Bileşen ve dil başına derleyici tarafından otomatik                              | ⚠️ Ad alanlarını manuel bölmeyi ve `pick()` kullanmayı gerektirir                   |
| **Tembel yükleme (Lazy loading)**               | ✅ Tek satır yapılandırma (`importMode: 'dynamic'`)                                 | ⚠️ `getRequestConfig` içinde manuel dinamik import gerektirir                       |
| **Görsel Düzenleyici / CMS**                    | ✅ Ücretsiz Görsel Düzenleyici + isteğe bağlı CMS                                   | ❌ Yok                                                                              |
| **Yapay zeka destekli çeviri**                  | ✅ Yerleşik, kendi sağlayıcı anahtarlarınızı kullanır                               | ❌ Yok                                                                              |
| **MCP sunucusu ve Ajan Becerileri**             | ✅ Evet                                                                             | ❌ Yok                                                                              |

## Karşılaştırmalı test

### Neler ölçüldü?

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) test paketi, her kütüphane ile **aynı uygulamayı** derler: **10 sayfa** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 dil** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), özdeş bileşenler ve özdeş içerik. Sayfalar `en` ve `fr` dillerinde ölçülür. Her kütüphane dört **yükleme stratejisi** ile test edilmiştir:

| Strateji           | Açıklama                                                                                  | Kimler kullanır                          |
| ------------------ | ----------------------------------------------------------------------------------------- | ---------------------------------------- |
| **static**         | Her dil ve her sayfa baştan paketlenir ve yüklenir                                        | Hızlı prototipler, yapay zeka kodları    |
| **dynamic**        | Yalnızca etkin dil yüklenir, ancak tüm sayfalar birlikte gelir                            | Projelerin büyük çoğunluğu               |
| **scoped-static**  | Rota başına ad alanları, tembel yükleme yok                                               | Nadir                                    |
| **scoped-dynamic** | Rota başına ad alanları + tembel yükleme. Yalnızca geçerli dilin geçerli sayfası iletilir | Katı performans bütçesi olan uygulamalar |

Intlayer'ın "scoped" varyantı yoktur: derleyici içeriği otomatik olarak **bileşen başına** sınırlar, bu nedenle `static` ve `dynamic` satırları zaten kapsamlandırılmıştır.

Her derleme için şunlar kaydedilir:

- **Kütüphane boyutu (Lib size)**: Yalnızca i18n kütüphanesini içe aktaran boş bir bileşenin gzip boyutu.
- **Sayfa JS (Page JS)**: Sayfa başına indirilen gzip sıkıştırmalı JavaScript.
- **Dil sızıntısı % (Locale leak %)**: Kullanıcının görüntülemediği bir dile ait dizgilerin oranı.
- **Sayfa sızıntısı % (Page leak %)**: Kullanıcının üzerinde bulunmadığı bir sayfaya ait dizgilerin oranı.
- **Bileşen ortalaması (Component avg)**: Yalıtılmış olarak derlenen her bileşenin ortalama gzip boyutu.
- **E2E tepkisellik**: Dil değişiminden DOM'daki `html[lang]` güncellenmesine kadar geçen süre.
- **Hidrasyon**: React hidrasyon aşamasının süresi.

> Aşağıdaki veriler `next-intl` 4.14.2 ve `intlayer` 9.5.1 ile **2026-09-12** tarihindeki çalıştırmadan alınmıştır.

### Next.js (App Router) Sonuçları

İlgilendiğiniz metrikleri ve kütüphaneleri seçin:

<I18nBenchmark framework="nextjs" vertical/>

| Kütüphane                      | Strateji       | Kütüphane Boyutu (gz) | Ort. Sayfa JS (gz) | Dil Sızıntısı | Sayfa Sızıntısı | Ort. Bileşen (gz) | E2E Tepkisellik | Hidrasyon |
| ------------------------------ | -------------- | --------------------: | -----------------: | ------------: | --------------: | ----------------: | --------------: | --------: |
| **Temel uygulama** (i18n yok)  | -              |                0.0 KB |           141.0 KB |          0.0% |            0.0% |            0.9 KB |         13.4 ms |   11.8 ms |
| `next-intl`                    | static         |               14.7 KB |           153.6 KB |          4.2% |           89.8% |           21.8 KB |         16.0 ms |   14.7 ms |
| `next-intl`                    | dynamic        |               14.7 KB |           153.6 KB |          9.7% |           89.9% |           21.8 KB |         15.6 ms |   14.8 ms |
| `next-intl`                    | scoped-static  |               14.7 KB |           153.6 KB |          0.0% |            0.0% |           80.1 KB |         17.9 ms |   17.4 ms |
| `next-intl`                    | scoped-dynamic |               14.7 KB |           153.6 KB |          0.0% |            0.0% |           22.9 KB |         17.8 ms |   16.8 ms |
| **`next-intlayer`**            | static         |            **5.5 KB** |       **141.3 KB** |      **0.0%** |        **0.0%** |        **8.5 KB** |     **15.5 ms** |   16.9 ms |
| **`next-intlayer`**            | dynamic        |            **5.5 KB** |       **141.3 KB** |      **0.0%** |        **0.0%** |        **6.9 KB** |     **15.3 ms** |   15.9 ms |
| `@intlayer/next-intl` (uyumlu) | static         |                8.0 KB |           147.5 KB |          0.0% |            0.0% |            8.1 KB |         14.5 ms |   12.8 ms |
| `@intlayer/next-intl` (uyumlu) | dynamic        |                8.0 KB |           148.7 KB |          0.0% |            0.0% |            8.1 KB |         11.7 ms |   12.8 ms |

**Sonuçlar nasıl okunmalı?**

- **Çalışma zamanı maliyeti.** Temel uygulama sayfa başına 141.0 KB'dir. `next-intl` bunu 153.6 KB'ye çıkarırken (**her sayfada +12.6 KB gzip**), Intlayer yalnızca 141.3 KB (**+0.3 KB**) yer kaplar.
- **İçerik sızıntısı.** En yaygın kurulumlarda (`static` ve `dynamic`), `next-intl` tüm `en.json` istemci sağlayıcısına girdiği için her sayfada **diğer sayfaların içeriğinin yaklaşık %90'ını** gönderir. Bunu %0'a indirmek zahmetli manuel ad alanı ayrımı gerektirir; Intlayer ise bunu varsayılan olarak sunar.
- **Bileşen boyutu.** `useTranslations()` çağıran bir bileşen ortalama 21.8 KB derlenirken, `useIntlayer()` kullanan aynı bileşen sadece 6.9 KB tutar.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tüm kütüphaneler ve stratejiler için tam tablo, [Next.js kıyaslama raporunda](https://intlayer.org/tr/doc/benchmark/nextjs).

### TanStack Start (`use-intl`) Sonuçları

`use-intl`, `next-intl`'in framework bağımsız çekirdeğidir. Aynı API, aynı mesaj formatı. TanStack Start üzerinde `intlayer` ile karşılaştırmak, denklemin Next.js'e özgü kısımlarını ortadan kaldırır.

| Kütüphane                     | Strateji       | Kütüphane Boyutu (gz) | Ort. Sayfa JS (gz) | Dil Sızıntısı | Sayfa Sızıntısı | Ort. Bileşen (gz) | E2E Tepkisellik |
| ----------------------------- | -------------- | --------------------: | -----------------: | ------------: | --------------: | ----------------: | --------------: |
| **Temel uygulama** (i18n yok) | -              |                0.0 KB |           111.0 KB |          0.0% |            0.0% |            0.7 KB |          8.1 ms |
| `use-intl`                    | static         |               14.1 KB |           179.8 KB |         50.0% |           89.8% |           76.0 KB |          6.7 ms |
| `use-intl`                    | dynamic        |               14.1 KB |           119.4 KB |          0.0% |           89.8% |           75.9 KB |          7.0 ms |
| `use-intl`                    | scoped-static  |               14.1 KB |           128.7 KB |          0.0% |            0.0% |           87.1 KB |         20.9 ms |
| `use-intl`                    | scoped-dynamic |               14.1 KB |           128.7 KB |          0.0% |            0.0% |           87.1 KB |         13.3 ms |
| **`intlayer`**                | static         |            **5.0 KB** |       **125.8 KB** |         50.0% |        **0.0%** |        **8.1 KB** |      **3.2 ms** |
| **`intlayer`**                | dynamic        |            **5.0 KB** |       **118.6 KB** |      **0.0%** |        **0.0%** |        **6.3 KB** |      **3.6 ms** |
| `@intlayer/use-intl` (uyumlu) | dynamic        |                7.3 KB |           129.7 KB |          0.0% |            0.0% |            9.3 KB |          8.7 ms |

**Sonuçlar nasıl okunmalı?**

- Basit `use-intl` kurulumu, temel uygulamaya göre **sayfa başına 68.8 KB daha fazla JS** iletir.
- `dynamic` modda `use-intl` 119.4 KB değerine inse de **%89.8 sayfa sızıntısını** sürdürür.
- Mimari fark en çok **bileşen boyutunda** göze çarpar: `use-intl` ile 76-87 KB, Intlayer ile 6-8 KB.
- **Dil değiştirme hızı** Intlayer ile 2-4 kat daha seridir (3 ms vs 7-21 ms).

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tam tablo [TanStack Start kıyaslama raporunda](https://intlayer.org/tr/doc/benchmark/tanstack).

## Neden bu fark var? Merkezi kataloglar vs derlenmiş sözlükler

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`next-intl` geleneksel modeli izler: dil başına bir JSON, `getRequestConfig` içinde yüklenir, `NextIntlClientProvider`'a aktarılır ve `t("namespace.key")` ile okunur.

```bash
.
├── messages
│   ├── en.json
│   └── fr.json
└── src
    ├── i18n
    │   ├── request.ts
    │   └── routing.ts
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                └── page.tsx
```

Çalışma zamanı bir sayfanın hangi anahtarları kullanacağını bilemez, bu yüzden tüm kataloğu göndermek en güvenli yoldur.

Bunu başaramamanın maliyeti aynı anda iki eksende büyür: sayfalar ve yerel ayarlar:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Intlayer bu sorumluluğu tersine çevirir. İçerik doğrudan ilgili bileşenin yanında tanımlanır:

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                ├── page.tsx
                └── page.content.ts
    └── components
        └── Counter
            ├── index.tsx
            └── index.content.ts
```

Derleme sırasında derleyici, hangi bileşenin hangi sözlüğü içe aktardığını tespit eder ve yalnızca etkin dil için gereken sözlükleri paketler.

> `dynamic` satırının verilerini elde etmek için `intlayer.config.ts` dosyasında `dictionary.importMode: 'dynamic'` ayarını yapın. [Paket optimizasyonu belgesine](https://intlayer.org/tr/doc/concept/bundle-optimization) göz atın.

## Geliştirici deneyimi

### İstemci bileşeni (Client component)

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/ClientCounter.tsx"
"use client";

import { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

export const Counter = () => {
  const t = useTranslations("counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")} onClick={() => setCount((c) => c + 1)}>
        {t("increment")}
      </button>
    </div>
  );
};
```

> Bu bileşeni oluşturan her sayfada `NextIntlClientProvider`'a iletilen mesajlara `counter` ad alanını eklemeyi unutmayın.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

Sayfada kayıt edilecek hiçbir şey yok: bileşen kendi içeriğini kendisi getirir.

</Tab>
</Tabs>
### Eşzamanlı sunucu bileşenleri

Tasarım sistemi bileşenleri (navbar, footer, kartlar) genellikle istemci bileşenlerinin alt öğeleri olarak işlenen sunucu bileşenleridir, dolayısıyla `async` olamazlar.

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  formattedCount: string;
};

export const ServerCounter = ({ t, formattedCount }: ServerCounterProps) => (
  <div>
    <p>{formattedCount}</p>
    <button aria-label={t("label")}>{t("increment")}</button>
  </div>
);
```

Sayfanın `await getTranslations("counter")` ve `await getFormatter()` çalıştırması, ardından sonuçları props olarak aşağı aktarması gerekir. Bileşen artık bağımsız değildir.

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

</Tab>
</Tabs>
### Meta veriler (Metadata)

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

const localizedPath = (locale: string, path: string) =>
  locale === routing.defaultLocale ? path : `/${locale}${path}`;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};
```

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("about-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};
```

</Tab>
</Tabs>

## next-intl API'sini koruyun, Intlayer verimini elde edin

Yukarıdaki performans verilerine ulaşmak için bileşenlerinizi sıfırdan yazmanız gerekmez. `@intlayer/next-intl` doğrudan tak-çalıştır bir adaptördür: `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()` ve ICU çoğul yapılarını korur, bunları Intlayer derleyicisi tarafından derlenen Intlayer sözlüklerinden sunar.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

Testlerde, aynı uygulamanın uyumluluk derlemesi, uygulama koduna dokunulmadan sayfa başına **153.6 KB'den 147.5 KB'ye**, bileşen başına **21.8 KB'den 8.1 KB'ye** ve sayfa sızıntısında **%90'dan %0'a** geriledi. Mevcut `messages/{locale}.json` dosyalarınız [JSON eşitleme eklentisi](https://intlayer.org/tr/doc/compatibility/next-intl) ile tek doğruluk kaynağı olarak kalabilir.

Ayrıntılı adımlar için [next-intl geçiş kılavuzuna](https://intlayer.org/tr/doc/migration/next-intl) göz atın.

## Hangisi ne zaman tercih edilmeli?

<AccordionGroup>
<Accordion header="next-intl'i seçin">

Next.js için ekosistem standardını istiyorsanız, ICU MessageFormat'a güveniyorsanız, uygulamanız küçük veya orta ölçekliyse veya merkezi JSON bekleyen bir çeviri platformuyla (Crowdin, Phrase, Lokalise...) entegre oluyorsanız. Performans önemliyse katalogları ad alanlarına bölmek ve sayfa başına `pick()` ile mesaj seçmek için zaman ayırın.

</Accordion>
<Accordion header="Intlayer'ı seçin">

**Bileşen kapsamlı içerik**, **katı TypeScript**, **derleme zamanı eksik anahtar hataları**, **zahmetsiz tree-shaking ve lazy loading**, eşzamanlı sunucu bileşenleri ve yerleşik düzenleme araçları ([Görsel Düzenleyici](https://intlayer.org/tr/doc/concept/editor), [CMS](https://intlayer.org/tr/doc/concept/cms), [yapay zeka çevirisi](https://intlayer.org/tr/doc/concept/auto-fill), [MCP sunucusu](https://intlayer.org/tr/doc/mcp-server)) istiyorsanız. Özellikle büyük, modüler kod tabanları ve tasarım sistemleri için uygundur.

</Accordion>
<Accordion header="@intlayer/next-intl'i seçin">

Zaten `next-intl` kullanıyorsanız ve kodu yeniden yazmadan paket boyutu kazanımı istiyorsanız. [Uyumluluk bağdaştırıcısı](https://intlayer.org/tr/doc/compatibility/next-intl) içe aktarmalarınızı ve `messages/{locale}.json` dosyanızı tek gerçek kaynak olarak korur. [next-intl vs @intlayer/next-intl](https://intlayer.org/tr/blog/next-intl-vs-intlayer-next-intl) içinde yan yana ölçülmüştür.

</Accordion>
</AccordionGroup>

## SSS

<FAQ>

<Question title="next-intl, Intlayer'dan daha mı yavaş?">

Render sırasında değil. Fark tarayıcıya ne gönderildiğindedir: `next-intl` her sayfada **+12.6 KB gzip** çalışma zamanı maliyeti getirir ve standart kurulumlarda her sayfayla birlikte yabancı sayfa dizelerinin yaklaşık %90'ını gönderir. Dil değiştirme ve hidrasyon Next.js'de benzerdir (15-18 ms); TanStack Start'ta `use-intl`, Intlayer'ın 3-4 ms'sine karşılık 7-21 ms sürer.

</Question>

<Question title="next-intl ile %0 sızıntıya ulaşabilir miyim?">

Evet, `scoped-dynamic` kurulumuyla: `messages/{locale}.json` dosyasını rota başına bir ad alanına bölün, ardından her sayfada `pick(messages, [...])` kullanın ve bileşenler taşındıkça bu eşlemeyi doğru tutun. Kıyaslamadaki `scoped-*` satırları tam olarak bu çalışmayı temsil eder. Intlayer derleyici içeriği bileşen bazında kapsadığı için buna gerek kalmadan %0'a ulaşır. Bkz. [paket optimizasyonu](https://intlayer.org/tr/doc/concept/bundle-optimization).

</Question>

<Question title="Geçiş yapmak için bileşenlerimi yeniden yazmam gerekir mi?">

Hayır. `@intlayer/next-intl`, `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()`, ICU çoğulları ve gezinme yardımcılarını korur ve bunları derlenmiş sözlüklerden sunar. `next.config.ts` içinde tek satırlık eklenti. [next-intl geçiş kılavuzunda](https://intlayer.org/tr/doc/migration/next-intl) adım adım anlatılmıştır.

</Question>

<Question title="Intlayer, ICU MessageFormat'ı destekliyor mu?">

Yerel API'de ICU desteği üzerinde çalışılmaktadır. Uyumluluk bağdaştırıcıları (`@intlayer/next-intl`, `@intlayer/use-intl`) ICU'yu çalıştırır: çoğullar, `select`, `selectordinal`, `#` ve `{ts, date, long}` Intlayer'ın ICU çözücüsünden geçer. Ayrıntılar için [ICU mesaj formatı](https://intlayer.org/tr/blog/icu-message-format) sayfasına bakın.

</Question>

<Question title="messages/{locale}.json dosyalarımı saklayabilir miyim?">

Evet. [JSON senkronizasyon eklentisi](https://intlayer.org/tr/doc/compatibility/next-intl) bunları okur, en üst düzey anahtarlarını sözlüklere böler ve CLI veya CMS bunları güncellediğinde çevirileri aynı dosyalara yazar. Çevirmenlerinizin iş akışı değişmez.

</Question>

</FAQ>

## İlgili karşılaştırmalar

Aynı kıyaslama, diğer kütüphaneler:

- [i18next vs Intlayer](https://intlayer.org/tr/blog/i18next-vs-intlayer)
- [Lingui vs Intlayer](https://intlayer.org/tr/blog/lingui-vs-intlayer)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/tr/blog/vue-i18n-vs-intlayer-benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/tr/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/tr/blog/react-i18next-vs-react-intl-vs-intlayer)

next-intl hakkında daha fazlası:

- [next-intl vs @intlayer/next-intl](https://intlayer.org/tr/blog/next-intl-vs-intlayer-next-intl), bağdaştırıcı aynı uygulama üzerinde ölçüldü
- [Is next-intl outdated?](https://intlayer.org/tr/blog/is-next-intl-outdated)
- [Using Intlayer with next-intl](https://intlayer.org/tr/blog/intlayer-with-next-intl)
- [How to internationalize a Next.js app with next-intl](https://intlayer.org/tr/blog/nextjs-internationalization-using-next-intl)

Referans belgeleri:

- [Next.js kıyaslama raporu](https://intlayer.org/tr/doc/benchmark/nextjs) ve [TanStack Start kıyaslama raporu](https://intlayer.org/tr/doc/benchmark/tanstack)
- [Uyumluluk bağdaştırıcısı: next-intl](https://intlayer.org/tr/doc/compatibility/next-intl) ve [geçiş kılavuzu](https://intlayer.org/tr/doc/migration/next-intl)
- [Paket optimizasyonu](https://intlayer.org/tr/doc/concept/bundle-optimization) ve [Intlayer derleyicisi](https://intlayer.org/tr/doc/compiler)
- [Bileşen bazlı ve merkezi i18n](https://intlayer.org/tr/blog/per-component-vs-centralized-i18n)
- [Derleyici güdümlü ve bildirimsel i18n](https://intlayer.org/tr/blog/compiler-vs-declarative-i18n)

## GitHub Yıldızları

GitHub yıldızları, bir projenin popülaritesinin ve topluluk güveninin önemli bir göstergesidir.

[![Yıldız Geçmişi Grafiği](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#amannn/next-intl&aymericzip/intlayer)

## Sonuç

`next-intl`, Next.js üzerinde güvenilir ve sağlam bir kütüphanedir. Ancak merkezi katalog modeli optimizasyon yükünü geliştiriciye bırakır: basit bir kurulum diğer sayfaların içeriğinin yaklaşık %90'ını sızdırır ve çalışma zamanının kendisi her sayfada +12.6 KB gzip ekler.

Intlayer bu yükü derleyiciye devreder. Bileşen başına sözlükler, dil başına tembel yükleme ve gereksiz içeriklerin temizlenmesi otomatik derleme çıktısıdır. Aynı uygulamadaki sonuç: **sayfa başına +0.3 KB**, **%0 sızıntı**, **3 kat daha küçük bileşenler** ve TanStack Start üzerinde **2-4 kat daha hızlı dil değişimi**.

Tüm ham veriler, test uygulamaları ve betikler [Benchmark Bloom deposunda](https://github.com/intlayer-org/benchmark-bloom) yer almaktadır.

Daha fazla ayrıntı için ['Neden Intlayer?' belgesine](https://intlayer.org/tr/doc/why) bakın.
