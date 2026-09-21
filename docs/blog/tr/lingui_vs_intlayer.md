---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "Lingui ve Intlayer Karşılaştırması: 2026 Kıyaslama Testi"
description: "Next.js ve TanStack Start üzerinde ölçülen derleyici tabanlı iki i18n kütüphanesi. Paket boyutu, içerik sızıntısı, bileşen boyutu, hidrasyon, dil değiştirme tepkiselliği ve geliştirici deneyimi."
keywords:
  - Lingui
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Compiler
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - lingui-vs-intlayer
author: aymericzip
---

# Lingui ve Intlayer Karşılaştırması | React & Next.js Uluslararasılaşma (i18n) Testi

Lingui ve Intlayer, bu karşılaştırmada saf bir çalışma zamanı (runtime) yerine bir **derleyiciye (compiler)** dayanan iki kütüphanedir. Lingui derleme sırasında makrolardan mesajları çıkarır ve her dil için kataloglar derler. Intlayer ise bileşen başına sözlükler derler ve bunları dil başına tree-shake eder. Kağıt üzerinde birbirine çok yakın görünmelidirler. Ancak sayılar nerede ayrıştıklarını açıkça ortaya koyuyor.

Veriler, her kütüphaneyle aynı uygulamayı oluşturan ve tarayıcının gerçekte ne indirdiğini ve çalıştırdığını kaydeden açık kaynaklı bir test paketi olan [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) projesinden gelmektedir.

<TOC/>

> **Özetle (tl;dr)**: Lingui, ham sayfa başına JavaScript konusunda Intlayer'a en yakın olanıdır: TanStack Start üzerinde tembel yükleme (lazy loading) yapılandırıldıktan sonra **115-120 KB** vs **118.6 KB**, Next.js üzerinde **148.6 KB** vs **141.3 KB**. Ancak fark diğer alanlarda açılmaktadır: yalıtılmış olarak derlenen bir Lingui bileşeni Intlayer'ın **6-8 KB** değerine karşılık **58-153 KB** yer kaplar, hidrasyon **11-14 ms** yerine **28-34 ms** sürer, kaynak dil yedeği her optimize kurulumda `fr` sayfalarına `en` dizgilerinin **%3-15'ini** sızdırır ve optimize edilmiş kuruluma ulaşmak, katalogları rota başına manuel olarak ayıklamak, derlemek ve seçmek anlamına gelir. Intlayer ise buna hiçbir yapılandırma gerektirmeden ulaşır.

## Kısaca

- **Lingui** - Makro tabanlı (`` t`...` ``, `<Trans>`, `msg`), ICU MessageFormat, `.po` / JSON katalogları, `lingui extract` + `lingui compile` iş akışı. Mesaj kimliklerini kısa hash'lere derler, dil başına dinamik katalog yüklemeyi destekler. Köklü, çatıdan bağımsız (framework-agnostic), `.po` çevresinde güçlü çevirmen araçları geçmişine sahip.
- **Intlayer** - Bileşen odaklı içerik modeli. `.content.ts` sözlükleri hizmet ettikleri bileşenin hemen yanında bulunur, derleme zamanı derleyicisi bunları bileşen ve dil başına tree-shake ve tembel yükleme yapar, içeriğinizden katı TypeScript tipleri oluşturulur ve eksik çeviriler derleme zamanında hata verir. Ara yazılım (middleware), SEO yardımcıları, Görsel Düzenleyici / CMS ve yapay zeka destekli çeviri ile birlikte gelir.

| Kütüphane             | GitHub Yıldızları                                                                                                                                                              | Toplam Commit                                                                                                                                                                      | Son Commit                                                                                                                                          | İlk Sürüm   | NPM Sürümü                                                                                                          | NPM İndirmeleri                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Nisan 2024  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `lingui/js-lingui`    | [![GitHub Repo stars](https://img.shields.io/github/stars/lingui/js-lingui?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/lingui/js-lingui/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/lingui/js-lingui?style=for-the-badge&label=commits)](https://github.com/lingui/js-lingui/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/lingui/js-lingui?style=for-the-badge)](https://github.com/lingui/js-lingui/commits)       | Aralık 2016 | [![npm](https://img.shields.io/npm/v/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) | [![npm downloads](https://img.shields.io/npm/dm/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) |

> Rozetler otomatik olarak güncellenir. Anlık görüntüler zaman içinde değişebilir.

## Yan yana özellik karşılaştırması

| Özellik                                               | Intlayer (`react-intlayer` / `next-intlayer`)                                       | Lingui (`@lingui/core` / `@lingui/react`)                                                           |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Bileşenlerin yanında çeviriler**                    | ✅ Evet, `.content.ts` her bileşenle birlikte bulunur                               | ⚠️ Kaynak dizgiler makrolar aracılığıyla JSX içinde satır içi; çeviriler merkezi `.po` dosyalarında |
| **TypeScript entegrasyonu**                           | ✅ İçerikten otomatik üretilen katı tipler                                          | ⚠️ Makrolar tiplendirilmiştir; mesaj kimlikleri tiplendirilmemiştir, eksik girişler yakalanmaz      |
| **Eksik çeviri tespiti**                              | ✅ TypeScript hatası + derleme zamanı hatası/uyarısı                                | ⚠️ `lingui extract` istatistik bildirir; çalışma zamanı sessizce kaynak metne geri döner            |
| **Zengin içerik (JSX / Markdown / bileşenler)**       | ✅ Doğrudan destek                                                                  | ✅ İçiçe bileşenlerle `<Trans>`                                                                     |
| **ICU desteği**                                       | ⚠️ Geliştirilmekte                                                                  | ✅ Evet (`plural`, `select`, `selectOrdinal` makroları)                                             |
| **Biçimlendirme (tarih, sayı, para birimi)**          | ✅ `useNumber`, `useDate`, ... (arka planda Intl)                                   | ✅ `i18n.date()`, `i18n.number()`                                                                   |
| **Yerelleştirilmiş yönlendirme ve ara yazılım**       | ✅ Yerleşik proxy/ara yazılım, `getMultilingualUrls`                                | ❌ Çekirdeğin parçası değil                                                                         |
| **SEO yardımcıları (hreflang, sitemap, robots)**      | ✅ Yerleşik yardımcılar                                                             | ❌ Manuel                                                                                           |
| **Eşzamanlı sunucu bileşenleri**                      | ✅ `next-intlayer/server` altındaki `useIntlayer` tüm sunucu bileşenlerinde çalışır | ⚠️ İstek başına bir `I18n` örneği gerektirir, prop ile aktarılır veya `setI18n` ile atanır          |
| **Tree-shaking (yalnızca kullanılan içeriği iletme)** | ✅ Bileşen ve dil başına, derleyici tarafından otomatik                             | ⚠️ `lingui compile` ile dil başına; rota başına manuel katalog ayrımı gerektirir                    |
| **Tembel yükleme (Lazy loading)**                     | ✅ `importMode: 'dynamic'` (tek satır yapılandırma)                                 | ⚠️ Derlenmiş katalogların manuel `import()` edilmesi + `i18n.load()` / `i18n.activate()`            |
| **Kullanılmayan içeriği temizleme**                   | ✅ Kullanılmayan sözlükler derleme zamanında atılır                                 | ✅ `lingui extract --clean` kullanılmayan mesajları temizler                                        |
| **Eksik çevirileri test etme (CLI / CI)**             | ✅ `npx intlayer content test`                                                      | ⚠️ `lingui extract` istatistikleri (varsayılan olarak hata kodu döndürmez)                          |
| **Derleme hattı (Build pipeline)**                    | ✅ Tek bir eklenti (`@intlayer/swc` / `@intlayer/babel` / `vite-intlayer`)          | ⚠️ Makro eklentisi (Babel veya SWC) + `extract` + `compile` adımları                                |
| **Yapay zeka destekli çeviri**                        | ✅ Yerleşik, kendi sağlayıcı anahtarlarınızı kullanır                               | ❌ Yok                                                                                              |
| **Görsel Düzenleyici / CMS**                          | ✅ Ücretsiz Görsel Düzenleyici + isteğe bağlı CMS                                   | ❌ Yok (`.po` harici TMS sistemleriyle çalışır)                                                     |
| **MCP sunucusu ve Ajan Becerileri**                   | ✅ Evet                                                                             | ❌ Yok                                                                                              |
| **Ekosistem / topluluk**                              | ⚠️ Daha küçük ancak hızla büyüyor                                                   | ✅ Köklü, çatıdan bağımsız                                                                          |

## Karşılaştırmalı test

### Neler ölçüldü?

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) test paketi, her kütüphane ile **birebir aynı uygulamayı** derler: **10 sayfa** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 dil** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), özdeş bileşenler ve özdeş içerik. Sayfalar `en` ve `fr` dillerinde ölçülür. Her kütüphane, en basit kurulumdan en uygun kuruluma kadar dört **yükleme stratejisi** ile uygulanmıştır:

| Strateji           | Açıklama                                                                         | Kimler kullanır                                       |
| ------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **static**         | Her dilin derlenmiş kataloğu baştan içe aktarılır ve yüklenir                    | Hızlı prototipler, yapay zeka tarafından üretilen kod |
| **dynamic**        | Yalnızca etkin dilin kataloğu `import()` ile alınır, ancak tüm sayfaları içerir  | Projelerin büyük çoğunluğu                            |
| **scoped-static**  | Rota başına bir katalog, tümü baştan paketlenir                                  | Nadir                                                 |
| **scoped-dynamic** | Rota başına bir katalog + tembel `import()`. Yalnızca geçerli sayfa, geçerli dil | Katı performans bütçesi olan uygulamalar              |

Intlayer'ın "scoped" varyantı yoktur: derleyici içeriği otomatik olarak **bileşen başına** sınırlar, bu nedenle `static` ve `dynamic` satırları zaten kapsamlandırılmıştır.

Her derleme için test paketi şunları kaydeder:

- **Kütüphane boyutu (Lib size)**: Yalnızca i18n kütüphanesini içe aktaran boş bir bileşenin gzip boyutu. Çalışma zamanının sabit maliyeti.
- **Sayfa JS (Page JS)**: Sayfa başına indirilen gzip sıkıştırmalı JavaScript, tüm sayfalar ve diller üzerinden ortalaması alınır.
- **Dil sızıntısı % (Locale leak %)**: İndirilen JS içinde bulunan ve kullanıcının **görüntülemediği** bir dile ait olan çevrilmiş dizgilerin oranı (`en` ve `fr` üzerinde ölçülmüştür, dolayısıyla %50 "ölçülen diğer dil tamamen mevcuttur" anlamına gelir; 10 dil paketlendiğinde gerçek israf çok daha yüksektir).
- **Sayfa sızıntısı % (Page leak %)**: İndirilen JS içinde bulunan ve kullanıcının üzerinde **olmadığı** bir sayfaya ait olan çevrilmiş dizgilerin oranı.
- **Bileşen ortalaması (Component avg)**: Yalıtılmış olarak derlenen her bileşenin ortalama gzip boyutu. Tek bir bileşenin ne kadar i18n çalışma zamanı ve katalog getirdiğini gösterir.
- **Uçtan uca tepkisellik (E2E reactivity)**: Yeni bir dil seçilmesi ile DOM'daki `html[lang]` etiketinin güncellenmesi arasındaki süre (Playwright, 5 yineleme).
- **Hidrasyon (Hydration)**: React hidrasyon aşamasının süresi.

> Aşağıdaki sayılar, `@lingui/react` 6.6.0 ve `intlayer` 9.5.1 ile **2026-09-12** tarihindeki çalıştırmadan alınmıştır. Test uygulaması kasıtlı olarak küçüktür (dil başına birkaç düzine dize), bu nedenle sızıntı yüzdeleri bir **kalıbı** tanımlar: içeriğiniz büyüdükçe artarlar ancak çalışma zamanı sabit kalır.

### Next.js Sonuçları

| Kütüphane           | Strateji       | Kütüphane Boyutu (gz) | Ort. Sayfa JS (gz) | Dil Sızıntısı | Sayfa Sızıntısı | Ort. Bileşen (gz) | E2E Tepkisellik | Hidrasyon |
| ------------------- | -------------- | --------------------: | -----------------: | ------------: | --------------: | ----------------: | --------------: | --------: |
| **base** (i18n yok) | -              |                0.0 KB |           141.0 KB |          0.0% |            0.0% |            0.9 KB |         13.4 ms |   11.8 ms |
| Lingui              | static         |               11.9 KB |           207.4 KB |         50.0% |           90.0% |           73.3 KB |         15.3 ms |   15.2 ms |
| Lingui              | dynamic        |               11.9 KB |           145.4 KB |          2.8% |           89.9% |           19.9 KB |         15.7 ms |   12.7 ms |
| Lingui              | scoped-static  |               11.9 KB |           148.2 KB |          2.7% |           89.1% |           20.4 KB |         15.1 ms |   13.1 ms |
| Lingui              | scoped-dynamic |               11.9 KB |           148.6 KB |         14.8% |            0.0% |          152.6 KB |         16.1 ms |   14.8 ms |
| **`next-intlayer`** | static         |            **5.5 KB** |       **141.3 KB** |      **0.0%** |        **0.0%** |        **8.5 KB** |     **15.5 ms** |   16.9 ms |
| **`next-intlayer`** | dynamic        |            **5.5 KB** |       **141.3 KB** |      **0.0%** |        **0.0%** |        **6.9 KB** |     **15.3 ms** |   15.9 ms |

**Sonuçlar nasıl okunmalı?**

- **Çalışma zamanı maliyeti.** Boş bir bileşen Lingui ile 11.9 KB gzip, Intlayer ile 5.5 KB yer kaplar. Sayfanın tamamında, Lingui'nin en iyi yapılandırması Intlayer'ın **+7.3 KB** üzerindedir (148.6'ya karşı 141.3 KB); Intlayer temel uygulamanın yalnızca **+0.3 KB** üzerindedir.
- **Basit kurulum maliyetlidir.** Derlenmiş her kataloğu baştan yüklemek **sayfa başına 207.4 KB** ile sonuçlanır; bu, temel uygulamanın +66 KB üzerindedir. Parmak izi alınan dizgilerin yarısı yanlış dile, %90'ı ise yanlış sayfaya aittir.
- **Dinamik yükleme dili düzeltir, sayfayı değil.** Dil başına bir katalog ile sayfa sızıntısı ~%90 seviyesinde kalır: tüm `fr` kataloğu her Fransızca sayfada gönderilir. %0 sayfa sızıntısına ulaşmak için `scoped-dynamic` kurulumu gerekir: rota başına bir katalog, ayrı ayrı çıkarılmış ve derlenmiş, her sayfada manuel olarak seçilmiş.
- **Kaynak dil yedeği sızdırır.** Optimize edilmiş kurulumlarda bile **`en` dizgilerinin %3-15'i `fr` sayfalarına gönderilir**. Lingui makroları kaynak mesajı yedek olarak hazır tutar, bu nedenle çevirinin yanında pakete girer. Intlayer ise yedekleri derleme sırasında çözer ve yalnızca etkin dili gönderir.
- **`scoped-dynamic` modunda bileşen boyutu aşırı büyür.** Yalıtılmış olarak derlenen her bileşenin ortalaması **152.6 KB** olur, çünkü her rotanın kataloğu onu içe aktaran bileşenden erişilebilir hale gelir. `useIntlayer()` kullanan aynı bileşenin ortalaması yalnızca **6.9 KB**'dır.

### TanStack Start Sonuçları

| Kütüphane                   | Strateji       | Kütüphane Boyutu (gz) | Ort. Sayfa JS (gz) | Dil Sızıntısı | Sayfa Sızıntısı | Ort. Bileşen (gz) | E2E Tepkisellik | Hidrasyon |
| --------------------------- | -------------- | --------------------: | -----------------: | ------------: | --------------: | ----------------: | --------------: | --------: |
| **base** (i18n yok)         | -              |                0.0 KB |           111.0 KB |          0.0% |            0.0% |            0.7 KB |          8.1 ms |   21.6 ms |
| Lingui                      | static         |               11.2 KB |           152.2 KB |         50.0% |           90.0% |           58.0 KB |          3.9 ms |   19.9 ms |
| Lingui                      | dynamic        |               11.2 KB |           115.2 KB |          9.3% |            0.0% |           85.5 KB |          5.9 ms |   28.0 ms |
| Lingui                      | scoped-static  |               11.2 KB |           120.8 KB |          4.0% |            0.0% |          147.9 KB |          7.1 ms |   33.9 ms |
| Lingui                      | scoped-dynamic |               11.2 KB |           120.2 KB |          8.6% |            0.0% |           83.7 KB |         42.1 ms |   32.9 ms |
| **`intlayer`**              | static         |            **5.0 KB** |       **125.8 KB** |         50.0% |        **0.0%** |        **8.1 KB** |      **3.2 ms** |   11.5 ms |
| **`intlayer`**              | dynamic        |            **5.0 KB** |       **118.6 KB** |      **0.0%** |        **0.0%** |        **6.3 KB** |      **3.6 ms** |   14.1 ms |
| `@intlayer/lingui` (uyumlu) | dynamic        |               10.3 KB |           137.0 KB |          9.9% |            0.0% |           12.8 KB |          2.9 ms |   19.7 ms |

**Sonuçlar nasıl okunmalı?**

- **Sayfa başına JavaScript konusunda Lingui kıl payı öndedir.** `dynamic` Lingui **115.2 KB** değerine ulaşarak Intlayer'ın 118.6 KB değerinin 3.4 KB altındadır. Lingui'nin hash kimlikli derlenmiş katalogları oldukça küçüktür ve TanStack Start yönlendiricisi rotaları o kadar iyi böler ki `dynamic` satırında sayfa sızıntısı zaten %0'dır.
- **Sayfa boyutunun dışındaki tüm diğer metriklerde üstünlük Intlayer'dadır.** Hidrasyon Lingui ile **28-34 ms** sürerken Intlayer ile **11-14 ms** sürer: React hidrasyonu tamamlamadan önce istemcide `i18n.load()` + `i18n.activate()` çalıştırılır. Tek başına derlenen bileşenler **6-8 KB** yerine **58-148 KB** yer tutar. Kaynak dil yedeği sebebiyle dil sızıntısı asla %0'a inmez (%4-9).
- **Optimize edilmiş kurulumda dil değiştirme yavaştır.** `scoped-dynamic` Lingui'nin `html[lang]` etiketini güncellemesi **42 ms** sürer: değişiklik görünür olmadan önce yeni rota kataloğunun getirilmesi, yüklenmesi ve etkinleştirilmesi gerekir. Intlayer ise her iki modda da **3-4 ms** içinde geçiş yapar.
- **Intlayer'ın `static` satırı zaten %0 sayfa sızıntısına sahiptir**, çünkü yalnızca sayfa bileşenlerinin içe aktardığı sözlükler paketlenir. Tek satırlık bir yapılandırma (`importMode: 'dynamic'`) dil sızıntısını da ortadan kaldırır.
- **`@intlayer/lingui`**, Lingui'nin makro sözdizimini korur ve bunu Intlayer sözlüklerinden sunar. Orijinal Lingui'ye göre daha küçük bileşenler (12.8 KB) ve daha hızlı hidrasyon elde etmek için sayfa boyutundan (137 KB) bir miktar ödün verir. Bu bir geçiş adımıdır, nihai hedef değildir.

## Neden bu fark var? İki derleyici, iki çalışma birimi

Her iki kütüphane de derleme yapar. Fark, **neyi** derlediklerindedir.

**Lingui katalogları derler.** Kaynak kodunuzdaki makrolar dil başına bir `.po` dosyasına ayıklanır, ardından dil başına bir JS modülüne derlenir. Temel birim **dildir**. Rota veya bileşen bazında daha fazla bölmek; birden fazla katalog oluşturmak, `lingui.config.ts` dosyasını her birini farklı dosya kümelerinden ayıklayacak şekilde yapılandırmak ve her rotada doğru olanı yüklemek anlamına gelir. Çalışma zamanı `I18n` örneği geneldir; her `useLingui()` çağrısı bileşeni buna bağlar.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en
    │   │   ├── messages.po
    │   │   └── messages.mjs             # lingui compile çıktısı
    │   └── fr
    │       ├── messages.po
    │       └── messages.mjs
    ├── components
    │   └── Counter.tsx                  # const { t } = useLingui(); t`Increment`
    └── routes
        └── $locale
            └── about.tsx                # await import(`../locales/${locale}/messages.mjs`)
```

**Intlayer sözlükleri derler.** Her `.content.ts` dosyası bir anahtara bağlı bir sözlüktür; derleyici hangi bileşenin hangi anahtarı içe aktardığını çözer ve sözlük ile dil başına tam olarak o bileşenin ihtiyaç duyduğu JSON'ı üretir. Temel birim **bileşendir**. Rota kapsamı bunun doğal bir sonucudur: bir sayfa yalnızca oluşturduğu bileşenlerin sözlüklerini çeker.

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx                # useIntlayer("counter")
    │       └── index.content.ts
    └── routes
        └── $locale
            ├── about.tsx
            └── about.content.ts
```

Bu nedenle `scoped-dynamic` modeli Intlayer için doğal bir derleme çıktısı iken, Lingui için zahmetli bir yapılandırma projesidir.

> `dynamic` satırının sayılarını elde etmek için `intlayer.config.ts` dosyasında `dictionary.importMode: 'dynamic'` ayarını yapın. [Paket optimizasyonu kılavuzuna](https://intlayer.org/tr/doc/concept/bundle-optimization) göz atın.

## Geliştirici deneyimi

### Kurulum

**Lingui**

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["en", "fr"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
```

```ts fileName="src/i18n.ts"
import { setupI18n } from "@lingui/core";

export const loadCatalog = async (locale: string) => {
  const { messages } = await import(`./locales/${locale}/messages.mjs`);
  const i18n = setupI18n();
  i18n.load(locale, messages);
  i18n.activate(locale);
  return i18n;
};
```

Ardından paketleyiciye `@lingui/babel-plugin-lingui-macro` (veya `@lingui/swc-plugin`) ekleyin, kaynak kodu düzenledikten sonra `lingui extract`, derlemeden önce `lingui compile` çalıştırın ve ağacı `<I18nProvider i18n={i18n}>` ile sarın.

**Intlayer**

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

`vite.config.ts` içine `intlayer()` (veya `next.config.ts` içine `withIntlayer()`) ekleyin ve ağacı `<IntlayerProvider>` ile sarın. Ayıklama veya derleme adımı yoktur: sözlükler paketleyici çalıştığında kendiliğinden oluşturulur.

### Bileşen

**Lingui**

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useLingui } from "@lingui/react/macro";
import { Trans } from "@lingui/react/macro";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{i18n.number(count)}</p>
      <button aria-label={t`Counter`} onClick={() => setCount((c) => c + 1)}>
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

İngilizce metin bileşenin içinde yaşar; Fransızca olanı ise `lingui extract` çalıştırıldıktan sonra `src/locales/fr/messages.po` içinde hash'lenmiş bir kimlik altında saklanır. Bunu çalıştırmayı veya `compile` etmeyi unutmak sessizce İngilizceye geri döner.

**Intlayer**

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
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { useNumber } from "react-intlayer/format";

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

Her iki dil de bileşenin yanında tek bir dosyada bulunur. Eksik bir `fr` değeri derleme hatasıdır, yanlış bir anahtar ise doğrudan TypeScript hatasıdır.

### Bileşenlerin dışında

Meta veriler, yükleyiciler (loaders), sunucu fonksiyonları: React ağacının bulunmadığı her yer.

**Lingui**

```ts fileName="src/routes/$locale/about.tsx"
import { setupI18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

const title = msg`About us`;

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { messages } = await import(
    `../../locales/${params.locale}/messages.mjs`
  );
  const i18n = setupI18n({
    locale: params.locale,
    messages: { [params.locale]: messages },
  });

  return { title: i18n._(title) };
};
```

Çağrı başına yeni bir `I18n` örneği, doğru kataloğun manuel olarak yüklenmesi ve `t` yerine `msg` + `i18n._()` kullanımı. [Test notlarında](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md) belirtildiği gibi, `t`, `` t` ` ``, `i18n.t()`, `msg` veya `<Trans>` yapılarının ne zaman kullanılacağını kestirmek her zaman sezgisel değildir.

**Intlayer**

```ts fileName="src/routes/$locale/about.tsx"
import { getIntlayer } from "intlayer";

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { title } = getIntlayer("about-metadata", params.locale);

  return { title };
};
```

## Lingui makrolarını koruyun, Intlayer sözlüklerine geçin

`@intlayer/lingui`, `@lingui/core` ve `@lingui/react` için doğrudan kullanılabilir bir uyumluluk adaptörüdür. Makrolar eskisi gibi derlenmeye devam eder; derlendikleri çalışma zamanı `i18n._()` çağrısı Intlayer sözlüklerinden beslenir ve `.po` senkronizasyon eklentileri mevcut kataloglarınızı kaynak olarak korur. ICU çoğul ve seçim ifadeleri birebir aynı şekilde işlenir.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [lingui()],
});
```

`@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` eklentisini Intlayer derleyicisinden önce çalışacak şekilde yapılandırmada tutun. [Lingui uyumluluk kılavuzuna](https://intlayer.org/tr/doc/compatibility/lingui) bakın.

## Hangisi ne zaman seçilmeli?

- **Lingui'yi seçin**: Tipli makrolarla **ICU MessageFormat** istiyorsanız, çevirmenleriniz mevcut bir TMS süreciyle **`.po`** dosyaları üzerinde çalışıyorsa, JSX içinde satır içi kaynak dizgileri tercih ediyorsanız ve ekibiniz ayıklama / derleme / katalog bölme iş akışını yönetmekten çekinmiyorsa. Tembel yükleme kurulduktan sonra sayfa başına JS boyutu oldukça rekabetçidir.
- **Intlayer'ı seçin**: **Bileşen kapsamlı içerik**, **katı TypeScript desteği**, **derleme zamanı eksik anahtar hataları**, **yapılandırmasız tree-shaking ve tembel yükleme**, hafif bileşenler, hızlı hidrasyon, anında dil değiştirme ve yerleşik yönetim araçları (Görsel Düzenleyici, CMS, yapay zeka çevirisi, MCP sunucusu) istiyorsanız. Özellikle modüler kod tabanları ve tasarım sistemleri için idealdir.
- **`@intlayer/lingui`'yi seçin**: Halihazırda Lingui kullanıyorsanız ve makrolara dokunmadan kademeli olarak Intlayer sözlüklerine geçmek istiyorsanız.

## İlgili karşılaştırmalar

- [next-intl ve Intlayer Karşılaştırması](https://intlayer.org/tr/blog/next-intl-vs-intlayer) (aynı test)
- [i18next ve Intlayer Karşılaştırması](https://intlayer.org/tr/blog/i18next-vs-intlayer) (aynı test)
- [vue-i18n ve Intlayer Kıyaslaması](https://intlayer.org/tr/blog/vue-i18n-vs-intlayer-benchmark) (aynı test)
- [Derleyici ve Bildirimsel i18n Karşılaştırması](https://intlayer.org/tr/blog/compiler-vs-declarative-i18n)

## GitHub Yıldızları

GitHub yıldızları, bir projenin popülaritesinin, topluluk güveninin ve uzun vadeli kalıcılığının önemli bir göstergesidir. Teknik kalitenin doğrudan bir ölçüsü olmasa da, projeyi kaç geliştiricinin faydalı bulduğunu ve gelişimini takip ettiğini gösterir.

[![Yıldız Geçmişi Grafiği](https://api.star-history.com/chart?repos=lingui%2Fjs-lingui%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#lingui/js-lingui&aymericzip/intlayer)

## Sonuç

Lingui, bu testteki en güçlü çalışma zamanı + derleyici hibrit kütüphanesidir. Hash'lenmiş derlenmiş katalogları, sayfa başına JavaScript boyutunu Intlayer'a sadece birkaç kilobayt mesafede tutar, hatta TanStack Start üzerinde biraz daha altına indirir. Yalnızca sayfa başına bayt dikkate alınsaydı, bu bir beraberlik olurdu.

Ancak metrikler bundan ibaret değildir. Lingui'nin derleyicisi dil düzeyinde durur; bunun altındaki her şey (rota başına kataloglar, tembel yükleme, yedeklerin paketten çıkarılması) manuel yapılandırma gerektirir. Karşılaştırma bu sınırın maliyetini net bir şekilde gösterir: **10-20 kat daha büyük bileşenler**, **2-3 kat daha yavaş hidrasyon**, asla sıfırlanmayan **%3-15 dil sızıntısı** ve optimize edilmiş modda **42 ms** süren dil değişimi. Intlayer'ın derleyicisi ise bileşen düzeyinde çalışır; bu sayede bu değerler hiçbir manuel yapılandırmaya ihtiyaç duymadan **6-8 KB**, **11-14 ms**, **%0** ve **3-4 ms** seviyesindedir.

Tüm ham veriler, test uygulamaları ve betikler [Benchmark Bloom deposunda](https://github.com/intlayer-org/benchmark-bloom) yer almaktadır. Kendiniz de test edebilirsiniz.

Daha fazla ayrıntı için ['Neden Intlayer?' belgesine](https://intlayer.org/tr/doc/why) başvurun.
