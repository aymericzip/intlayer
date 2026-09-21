---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "i18next vs @intlayer/i18next: Aynı API, Farklı Paket Boyutu"
description: Bir React veya Next.js uygulaması i18next, react-i18next ve next-i18next çağrılarını koruyup bunları @intlayer/i18next bağdaştırıcıları aracılığıyla sunduğunda ne değişir? Aynı kod üzerinde ölçülen sayfa başına JavaScript, bileşen boyutu, metin sızıntısı ve hidrasyon performansı.
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - "@intlayer/i18next"
  - "@intlayer/react-i18next"
  - "@intlayer/next-i18next"
  - Intlayer
  - Uyumluluk bağdaştırıcısı
  - Geçiş
  - Uluslararasılaştırma
  - i18n
  - Kıyaslama
  - Paket boyutu
  - Blog
  - Next.js
  - React
slugs:
  - blog
  - i18next-vs-intlayer-i18next
author: aymericzip
---

# i18next VS @intlayer/i18next | Aynı API, Farklı Paket Boyutu

`@intlayer/i18next`, `@intlayer/react-i18next` ve `@intlayer/next-i18next` uyumluluk bağdaştırıcılarıdır. Kodunuzun zaten kullanmakta olduğu `i18next` API'sini (`useTranslation`, `t()`, `<Trans>`, `i18n.changeLanguage()`, `getFixedT`, `serverSideTranslations`...) doğrudan sunar ve Intlayer tarafından derlenen sözlüklerden besler. Bileşenleriniz değişmez; yalnızca altlarındaki çalışma zamanı (runtime) değişir.

Bu makale, biri `next-i18next` ve diğeri `@intlayer/next-i18next` ile oluşturulmuş aynı Next.js uygulaması üzerindeki bu değişimi ölçmektedir. Veriler [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) projesinden alınmıştır. `i18next` ve Intlayer'ı bağımsız kütüphaneler olarak karşılaştırmak için [i18next vs Intlayer](https://intlayer.org/tr/blog/i18next-vs-intlayer) makalesini okuyabilirsiniz. Bu yazı ise kodunuzu olduğu gibi koruduğunuzda bağdaştırıcının neleri değiştirdiğine odaklanmaktadır.

<TOC/>

> **Özet (tl;dr)**: Aynı Next.js uygulamasında `next-i18next` yerine `@intlayer/next-i18next` kullanılması, sayfa başına indirilen gzip JavaScript boyutunu **218.5 KB'tan 150.7 KB'a** düşürmüş (temel yapılandırmada) ve tamamen optimize edilmiş `next-i18next` kurulumunu (163.4 KB) **12.7 KB** farkla geride bırakmıştır. Ortalama bileşen boyutu **78.5 KB'tan 9.7 KB'a** inmiş, diğer sayfalara ait metin sızıntısı **~%90'dan %0'a** düşmüş, hidrasyon süresi **15.6 ms'den 11.3 ms'ye** gerilemiş ve çalışma zamanı boyutu **19.7 KB'tan 9.4 KB'a** çekilmiştir. Hiçbir bileşen kodu değiştirilmemiş; yalnızca tek bir sağlayıcı (provider) dosyası güncellenmiştir. `i18next` eklentileri (arka uçlar, dil algılayıcıları) kabul edilir ancak hiçbir işlem yapmaz: çalışma zamanında yüklenecek veya algılanacak bir fazlalık kalmamıştır.

## `@intlayer/i18next` Nedir

`i18next` bir çalışma zamanı kütüphanesidir. `i18n.init({ resources })` veya bir arka uç eklentisi `locales/{lng}/{ns}.json` dosyasını genel bir örneğe (global instance) yükler; `useTranslation("about")` bileşeni buna abone yapar; `t("title")` ise anahtarı render anında arar. Ad alanları (namespaces), tembel yükleme (lazy loading), sayfa başına ad alanı listeleri ve tip güvenliği tamamen sizin yapılandırmanız ve yönetmeniz gereken unsurlardır.

Bağdaştırıcılar API'yi korur ve genel örneğin yerini alır:

1. **İçe aktarma takma adları (Import aliasing).** `@intlayer/next-i18next/plugin` paketindeki `createNextI18nPlugin()` (veya `withI18next`), `withIntlayer`'ı sarar ve Webpack / Turbopack takma adları ekleyerek `next-i18next`, `react-i18next` ve `i18next` çağrılarının `@intlayer/*` karşılıklarına yönlendirilmesini sağlar. Vite üzerinde `@intlayer/react-i18next/plugin` içindeki `reactI18nextVitePlugin()` aynı görevi üstlenir. Hiçbir import ifadesini yeniden adlandırmanız gerekmez.
2. **Tek doğruluk kaynağı olarak JSON.** `syncJSON` eklentisi mevcut `locales/{lng}/{ns}.json` dosyalarınızı `format: "i18next"` ayarıyla okur (`{{name}}`, `$t()` iç içe geçmesi, `_one` / `_other` ve bağlam sonekleri sorunsuz çözümlenir) ve CLI ya da CMS güncelleme yaptığında çevirileri dosyalara geri yazar.
3. **Çağrı yerinde bağlama.** Intlayer optimizasyon adımı, `useTranslation("about")` çağrısını doğrudan etkin dildeki `about` sözlüğünü alan bir çağrıya dönüştürür. Bileşen artık genel depoya (global store) erişmeyi bırakır.

```tsx fileName="components/About.tsx"
// Kodunuz, tamamen aynı
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="Derleyicinin ürettiği kod (basitleştirilmiş)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslation } from "@intlayer/react-i18next";

const About = () => {
  const { t } = useTranslation(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Aşağıdaki tablolarda görülen bileşen boyutu küçülmesi ve sayfa sızıntısının sıfırlanmasının temel nedeni işte bu derleme zamanı dönüşümüdür.

## Bağdaştırıcıların Koruduğu, Yok Saydığı ve Değiştirmediği Özellikler

| `i18next` API                                                                   | `@intlayer/*` ile Durumu                                                                                              |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useTranslation("ns")`, `useTranslation("ns", { keyPrefix })`                   | ✅ Korundu. Derleme anında `ns` sözlüğüne bağlanır; içeriğinize göre tiplendirilir                                    |
| `t("key", { name })`, `{{interpolation}}`, `$t(key)` iç içe kullanımı           | ✅ Korundu                                                                                                            |
| `key_one` / `key_other` çoğulları, `key_male` bağlamı, `returnObjects`          | ✅ Korundu. Çoğullar `Intl.PluralRules` ile hesaplanır                                                                |
| `components`, numaralı etiketler `<1>...</1>`, `values` içeren `<Trans>`        | ✅ Korundu                                                                                                            |
| `withTranslation`, `Translation`, `I18nContext`                                 | ✅ Korundu                                                                                                            |
| `i18n.changeLanguage()`, `i18n.language`, `i18n.dir()`, `on("languageChanged")` | ✅ Korundu. `changeLanguage` Intlayer dilini yönetir                                                                  |
| `getFixedT(lng, ns, keyPrefix)`, `i18n.exists()`, `hasLoadedNamespace()`        | ✅ Korundu                                                                                                            |
| `i18n.use(Backend).use(LanguageDetector).init({...})`                           | ⚠️ `use()` eklentinin `init` fonksiyonunu çağırır ve biter; arka uçların ve algılayıcıların yapacağı bir işlem kalmaz |
| `init({ resources })`, `addResourceBundle()`                                    | ⚠️ `resources` bir uyarı ile **yok sayılır**; paket boyutu kazanımları için JSON importlarını kaldırın                |
| `I18nextProvider i18n={i18n}`                                                   | ⚠️ Bir `IntlayerProvider` oluşturur; `i18n` özelliği yok sayılır. App Router'da dili doğrudan iletin (aşağıya bakın)  |
| `serverSideTranslations(locale, ["common"])` (next-i18next)                     | ⚠️ Beklenen nesne yapısını döner ve hiçbir şey yüklemez. Tutulması zararsız, silinmesi güvenlidir                     |
| `appWithTranslation(App)` (next-i18next)                                        | ✅ Korundu                                                                                                            |
| `next-i18next.config.js`                                                        | ⚠️ Okunmaz. Diller `intlayer.config.ts` dosyasından alınır                                                            |
| Ad alanı belirtilmemiş yalın `useTranslation()`                                 | ✅ Dosyanın tamamını kapsayan `translation` sözlüğüne karşı çalışır (`splitKeys: false`)                              |

## Kıyaslama Testi (Benchmark)

### Neler Ölçüldü

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) test paketi, her yapılandırma için **birebir aynı uygulamayı** derler: **10 sayfa** (ana sayfa, hakkımızda, blog, kariyer, iletişim, SSS, fiyatlandırma, ürünler, ayarlar, ekip), **10 dil** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), özdeş bileşenler ve özdeş içerik. Sayfalar `en` ve `fr` dillerinde test edilmiştir.

`next-i18next`, her dilin JSON dosyasının `resources` içine gömülmesinden (`static`), arka uç aracılığıyla rota başına dinamik yüklemeye (`scoped-dynamic`) kadar dört farklı stratejiyle derlenmiştir. Bağdaştırıcı ise **temel kurulumla aynı bileşenler** üzerinde, sadece `next.config.ts`, `intlayer.config.ts` ve sağlayıcı dosyası güncellenerek test edilmiştir. Manuel bir "scoped" varyantına ihtiyaç duymaz: derleyici her bileşenin içeriğini otomatik olarak izole eder.

Her derleme için şu metrikler kaydedilmiştir:

- **Kütüphane boyutu (Lib size)**: Yalnızca i18n kütüphanesini içe aktaran boş bir bileşenin gzip boyutu.
- **Sayfa JS (Page JS)**: Tüm sayfalar ve diller genelinde sayfa başına indirilen ortalama gzip JavaScript boyutu.
- **Dil sızıntısı % (Locale leak %)**: İndirilen JS içinde kullanıcının o an **görüntülemediği** bir dile ait çeviri metinlerinin oranı.
- **Sayfa sızıntısı % (Page leak %)**: İndirilen JS içinde kullanıcının o an **bulunmadığı** bir sayfaya ait çeviri metinlerinin oranı.
- **Bileşen ortalaması (Component avg)**: Yalıtılmış olarak derlenen her bir bileşenin ortalama gzip boyutu.
- **Uçtan uca tepkisellik (E2E reactivity)**: Yeni bir dil seçilmesi ile DOM'daki `html[lang]` etiketinin güncellenmesi arasındaki gerçek süre (Playwright, 5 tekrar).
- **Hidrasyon (Hydration)**: React hidrasyon aşamasının süresi.

> Aşağıdaki değerler **12-09-2026** tarihli test çalıştırmasından alınmıştır (`next-i18next` 16.3.0, `react-i18next` 17.0.13, `i18next` 26.4.2 ve `@intlayer/next-i18next` 9.5.1). Test uygulaması yalın tutulmuştur, bu nedenle sızıntı oranları bir **örüntüyü** yansıtır: içerik büyüdükçe sızıntı miktarı katlanarak artarken çalışma zamanı maliyeti sabit kalır.

### Next.js Sonuçları

| Yapılandırma                 | Strateji       | Kütüphane (gz) | Sayfa JS Ort (gz) | Dil Sızıntısı | Sayfa Sızıntısı | Bileşen Ort (gz) |   E2E Tepki |   Hidrasyon |
| ---------------------------- | -------------- | -------------: | ----------------: | ------------: | --------------: | ---------------: | ----------: | ----------: |
| **base** (i18n yok)          | -              |         0.0 KB |          141.0 KB |          0.0% |            0.0% |           0.9 KB |     13.4 ms |     11.8 ms |
| `next-i18next`               | static         |        19.7 KB |          218.5 KB |          0.0% |           89.8% |          78.5 KB |     16.4 ms |     15.6 ms |
| `next-i18next`               | dynamic        |        19.7 KB |          169.5 KB |         50.0% |           89.8% |          26.1 KB |     15.4 ms |     27.7 ms |
| `next-i18next`               | scoped-static  |        19.7 KB |          220.1 KB |          0.0% |           89.8% |          78.9 KB |     16.4 ms |     14.7 ms |
| `next-i18next`               | scoped-dynamic |        19.7 KB |          163.4 KB |          0.0% |            0.0% |          27.1 KB |     15.9 ms |     15.1 ms |
| **`@intlayer/next-i18next`** | static         |     **9.4 KB** |      **150.7 KB** |      **0.0%** |        **0.0%** |       **9.7 KB** | **10.7 ms** | **11.3 ms** |
| **`@intlayer/next-i18next`** | dynamic        |     **9.4 KB** |      **150.7 KB** |      **0.0%** |        **0.0%** |       **9.7 KB** | **11.9 ms** | **10.6 ms** |
| `next-intlayer` (yerel)      | static         |         5.5 KB |          141.3 KB |          0.0% |            0.0% |           8.5 KB |     15.5 ms |     16.9 ms |
| `next-intlayer` (yerel)      | dynamic        |         5.5 KB |          141.3 KB |          0.0% |            0.0% |           6.9 KB |     15.3 ms |     15.9 ms |

**Verilerin Değerlendirilmesi**

- **Temel kuruluma göre sayfa başına 68 KB tasarruf.** `resources: { en, fr, ... }` yaklaşımı her sayfada tüm dilleri ve tüm ad alanlarını taşır: **218.5 KB**. Aynı bileşenlerin bağdaştırıcı ile derlenmesi sonucu bu değer **150.7 KB** seviyesine iner. Yalnızca `i18next` çalışma zamanının 19.7 KB (bağdaştırıcının 9.4 KB) olması sayesinde, `next-i18next`'in en titiz optimizasyonundan (163.4 KB) bile 12.7 KB daha hafiftir.
- **Bileşenlere dokunmadan sızıntı %0'a düşer.** Elle tamamen izole edilen senaryo haricinde, tüm `next-i18next` varyantları ~%90 oranında diğer sayfalara ait metinleri indirir. `dynamic` seçeneği ise sayfa sızıntısını çözmediği gibi, dil başına arka uç tüm `translation` ad alanını çektiğinden **%50 dil sızıntısı** ekler. Bağdaştırıcı, mevcut kodunuzla doğrudan %0 / %0 seviyesine ulaşır.
- **Bileşenler 8 kat küçülür.** İzole derlenen bir `useTranslation()` bileşeni, `t` genel depoya bağlı olduğu için inlined `resources` ile ortalama **78.5 KB**, arka uç ile **26-27 KB** tutar. Bağdaştırıcı ile bu değer ortalama **9.7 KB**'a geriler.
- **Daha hızlı hidrasyon ve dil değiştirme.** Hidrasyon süresi 15.6 ms'den **11.3 ms**'ye iner (`dynamic` kurgusunda arka uç sorgusu kritik yolda olduğu için 27.7 ms sürer). Dil değiştirme süresi de 15-16 ms'den **11-12 ms**'ye düşer.
- **Bağdaştırıcı yerel çalışma zamanının aynısı değildir.** Yerel `next-intlayer` **141.3 KB** ile temel uygulamanın sadece +0.3 KB üzerindedir. Bağdaştırıcı, Intlayer çekirdeği üzerinde `i18next` API katmanını (enterpolasyon kuralları, çoğul ve bağlam çözümlemeleri, `<Trans>` etiket ayrıştırması) barındırdığı için yerel sürüme göre +9.4 KB ek yük getirir. Bu bir geçiş köprüsüdür, nihai durak değildir.

> Vite / TanStack Start üzerindeki `react-i18next` bağdaştırıcısı bu test serisine dahil edilmemiştir. TanStack Start için temel referans [i18next vs Intlayer](https://intlayer.org/tr/blog/i18next-vs-intlayer) yazısında incelenebilir.

## Rakamların Değişme Sebebi

`components/` klasöründeki kodlar hiç değişmedi; tüm kazanımlar `useTranslation` fonksiyonunun neye bağlandığından kaynaklanmaktadır.

**`i18next` ile**, bağlama genel örneğe (global instance) yapılır. İçine yüklenen her veri (`static` modunda tüm diller, `dynamic` modunda etkin dilin tüm ad alanı) `useTranslation()` çağıran her bileşenden erişilebilir durumdadır. Paketleyici bu örneğin içeriğini daha küçük parçalara bölemez ve çalışma zamanı render anında hangi anahtarların isteneceğini bilemez.

```bash
.
├── next-i18next.config.js
├── public/locales
│   ├── en/translation.json           # her sayfanın metinleri
│   └── fr/translation.json
├── i18n/i18n.ts                      # i18n.use(initReactI18next).init({ resources })
└── components
    ├── AppProviders.tsx              # <I18nextProvider i18n={i18n}>
    └── About.tsx                     # useTranslation(); t("about.title")
```

**`@intlayer/next-i18next` ile**, bağlama doğrudan sözlüğe yapılır. `syncJSON` her ad alanı dosyasını bir sözlüğe dönüştürür; optimizasyon adımı ise bileşene yalnızca bildirdiği sözlüğü verir. Bu içe aktarım paketleyici tarafından kolayca izlenebilir, sayfa ve dil bazında eksiksiz olarak bölünebilir.

```bash
.
├── intlayer.config.ts                # syncJSON({ format: "i18next", source: ... })
├── public/locales
│   ├── en/translation.json           # değişmedi, tek gerçeklik kaynağı olmaya devam ediyor
│   └── fr/translation.json
├── .intlayer/                        # otomatik oluşturulur: ad alanı ve dil başına bir sözlük
└── components
    ├── AppProviders.tsx              # <IntlayerClientProvider locale={locale}>
    └── About.tsx                     # useTranslation(); t("about.title")  ← değişmedi
```

`i18n/i18n.ts` dosyası ve onun `resources` aktarımı atıl koda dönüşür. 68 KB'lık tasarruf buradan elde edilir.

## Üç Adımda Geçiş

<Steps>
<Step number={1} title="Kurulum">

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

Komut projedeki `i18next` / `react-i18next` / `next-i18next` varlığını tespit eder, `intlayer`, ilgili framework paketi (`next-intlayer` veya `react-intlayer`), uygun `@intlayer/*` bağdaştırıcısı ve `@intlayer/sync-json-plugin` paketlerini yükleyip `intlayer.config.ts` dosyasını yapılandırır. Orijinal paketleri projede tutun: bunlar eş bağımlılık (peer dependency) olarak işlev görür ve tipleri sağlar.

</Step>
<Step number={2} title="Intlayer'ı dil dosyalarınıza yönlendirin">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "i18next",
  },
  plugins: [
    syncJSON({
      // i18next sözdizimi: {{name}}, $t(key), key_one / key_other, key_male
      format: "i18next",
      // Ad alanı başına bir dosya: `useTranslation("about")` → about.json
      source: ({ locale, key }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

Dil başına tek bir `translation.json` dosyanız varsa (i18next'in varsayılan ad alanı), `splitKeys: false` ayarlayın; böylece tüm dosya tek bir sözlük olarak kalır ve parametresiz `useTranslation()` çağrıları sorunsuz çözümlenir.

</Step>
<Step number={3} title="Eklentiyi ekleyin">

<Tabs>
<Tab label="Next.js">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { withI18next } from "@intlayer/next-i18next/plugin";

const nextConfig: NextConfig = {};

export default withI18next(nextConfig);
```

App Router mimarisinde istemci bileşenleri dili `[locale]` segmentinden alır. Bağdaştırıcının `I18nextProvider` bileşeni dil parametresi almaz, bu nedenle sağlayıcı dosyanızda tek seferlik bir değişiklik yapın:

```tsx fileName="components/AppProviders.tsx"
"use client";

import { IntlayerClientProvider } from "next-intlayer";
import type { LocalesValues } from "intlayer";

export const AppProviders = ({
  locale,
  children,
}: {
  locale: LocalesValues;
  children: React.ReactNode;
}) => (
  <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
);
```

Bunun altındaki tüm bileşenler `useTranslation()` çağrısını olduğu gibi sürdürür.

</Tab>
<Tab label="Vite / TanStack Start">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

`reactI18nextVitePlugin()`, `vite-intlayer`'ı sarmalar ve `react-i18next` ile `i18next` için takma ad tanımlar. React dışı projelerde `@intlayer/i18next/plugin` içindeki `i18nextVitePlugin()` yalnızca `i18next` için yönlendirme yapar.

</Tab>
</Tabs>

</Step>
</Steps>

### Geçişten Sonra Neleri Silebilirsiniz

| Dosya / Yapı                                           | Neden Silinebilir                                                              |
| ------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `resources: { en, fr, ... }` ve JSON importları        | Bağdaştırıcı tarafından yok sayılır. 68 KB fazlalık tam olarak buradaydı       |
| `i18next-http-backend`, `i18next-resources-to-backend` | Çalışma zamanında ağ üzerinden çekilecek bir şey kalmaz                        |
| `i18next-browser-languagedetector`                     | Dil algılama Intlayer'ın yönlendirmesiyle (URL öneki, çerez, başlık) yönetilir |
| `getStaticProps` içindeki `serverSideTranslations()`   | Boş bir nesne döner; kalması zararsız, silinmesi temizlik sağlar               |
| `next-i18next.config.js`                               | Okunmaz. Tüm dil ayarları `intlayer.config.ts` içindedir                       |
| Sayfa başına `ns: [...]` listeleri                     | Derleyici gerekli ad alanlarını bileşen düzeyinde kendisi belirler             |

### Boyut Tasarrufunun Ötesindeki Kazanımlar

- **Tiplendirilmiş anahtarlar.** `useTranslation("about")` derlenmiş `about` sözlüğüne göre tiplendirilir; `t("does.not.exist")` gibi hatalı bir anahtar metin döndürmek yerine doğrudan TypeScript derleme hatası verir.
- **`npx intlayer test`** herhangi bir dilde eksik anahtar olduğunda CI sürecini durdurur. **`npx intlayer fill`** ise kendi sağlayıcı anahtarınızla (OpenAI, Anthropic, Mistral, Gemini...) eksik anahtarları otomatik çevirip `locales/{lng}/{ns}.json` dosyasına yazar.
- **Görsel Düzenleyici ve CMS** aynı JSON üzerinde çalıştığı için çevirmenler arayüz üzerinden düzenleme yapabilir ve dosyalar Git ortamında güncellenir.
- **`.content.ts` formatına kademeli geçiş.** İsteyen herhangi bir bileşen, yanına eklenecek içerik dosyasıyla `useTranslation("about")` yerine `useIntlayer("about")` kullanımına geçebilir. JSON ve `.content.ts` sözlükleri sorunsuz bir arada yaşar.

## Başlamadan Önce Bilinmesi Gereken Kısıtlamalar

- **Arka uçlar ve algılayıcılar devre dışıdır.** `i18n.use(HttpBackend)` yalnızca eklentinin `init` fonksiyonunu çağırır. Uygulamanız çalışma zamanında CMS'ten dinamik çeviri çekmeye bağımlıysa bu akış sonlanır; bunun yerine Intlayer CMS'i veya `intlayer pull` / `push` komutlarını tercih edin.
- **`resources` birleştirilmez, yok sayılır.** Bazı diğer bağdaştırıcıların aksine, `@intlayer/i18next` satır içi `resources` nesnesini bir yedekleme mekanizması olarak kullanmaz. Her anahtarın senkronize sözlüklerde fiilen bulunması şarttır (bu durum `intlayer test` ile doğrulanır).
- **App Router sağlayıcı düzenlemesi gerektirir.** Yukarıda gösterilen tek bir dosya. `appWithTranslation` kullanan Pages Router projelerinde hiçbir değişiklik gerekmez.
- **`next-i18next.config.js` dikkate alınmaz.** `localePath`, `fallbackLng`, `reloadOnPrerender` gibi parametreler çalışmaz; diller ve varsayılanlar `intlayer.config.ts` içinde tanımlanmalıdır.
- **Bağdaştırıcının da bir boyutu vardır.** `next-intlayer`'a kıyasla çalışma zamanında 9.4 KB ve sayfa başına +9.4 KB ek yük getirir. Tüm bileşenler `useIntlayer`'a geçtiğinde bağdaştırıcıyı kaldırabilirsiniz.

## Hangi Çözüm Ne Zaman Tercih Edilmeli?

- **`i18next` ile devam edin**: Uygulamanız çalışma zamanı arka uçlarına (istek anında CMS'ten sunulan çeviriler), özel eklenti ekosistemine veya bağdaştırıcıların kapsamadığı React dışı bir ortama zorunlu olarak bağımlıysa.
- **`@intlayer/*` kullanın**: Halihazırda `react-i18next` / `next-i18next` kullanıyorsanız ve kodunuzu yeniden yazmadan 68 KB tasarruf, 8 kat daha küçük bileşenler, %0 sızıntı, tiplendirilmiş anahtarlar ve CI doğrulaması elde etmek istiyorsanız. Mevcut `i18next` projeleri için en pratik yükseltme yoludur.
- **Yerel mimariye (`next-intlayer` / `react-intlayer`) geçin**: Yeni projeler için veya bağdaştırıcı geçişi tamamlandıktan sonra. En hafif alternatiftir (5.5 KB, sayfa başına +0.3 KB) ve senkron Server Components ile bileşen düzeyinde `.content.ts` kullanımının önünü açar.

## İlgili Karşılaştırmalar

- [i18next vs Intlayer](https://intlayer.org/tr/blog/i18next-vs-intlayer) (kütüphane bazlı doğrudan kıyaslama, aynı test verileri)
- [next-intl vs @intlayer/next-intl](https://intlayer.org/tr/blog/next-intl-vs-intlayer-next-intl) (aynı bağdaştırıcı serisi)
- [Lingui vs @intlayer/lingui](https://intlayer.org/tr/blog/lingui-vs-intlayer-lingui) (aynı bağdaştırıcı serisi)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/tr/blog/vue-i18n-vs-intlayer-vue-i18n) (aynı bağdaştırıcı serisi)
- Geçiş rehberleri: [i18next](https://intlayer.org/tr/doc/migration/i18next), [react-i18next](https://intlayer.org/tr/doc/migration/react-i18next), [next-i18next](https://intlayer.org/tr/doc/migration/next-i18next)
- Bağdaştırıcı referansları: [i18next](https://intlayer.org/tr/doc/compatibility/i18next), [react-i18next](https://intlayer.org/tr/doc/compatibility/react-i18next), [next-i18next](https://intlayer.org/tr/doc/compatibility/next-i18next)

## Sonuç

`i18next` bu kıyaslamadaki en ağır çalışma zamanıdır ve bağdaştırıcılar, alıştığınız API'den ayrılmanızı istemeden bu yükün büyük kısmını ortadan kaldırır. Aynı Next.js uygulamasında, bir yapılandırma dosyası, bir eklenti satırı ve tek bir sağlayıcı düzenlemesiyle **sayfa başına 68 KB daha az yük**, elle optimize edilmiş en iyi sürümden bile **12.7 KB daha küçük boyut**, **8 kat daha ufak bileşenler**, **%0 sızıntı** ve **4 ms daha hızlı hidrasyon** elde edilir.

Tüm ham ölçüm verileri, test uygulamaları ve betikler [Benchmark Bloom deposunda](https://github.com/intlayer-org/benchmark-bloom) açıkça paylaşılmıştır.

Daha fazla ayrıntı için [Neden Intlayer?](https://intlayer.org/tr/doc/why) belgesini inceleyebilirsiniz.
