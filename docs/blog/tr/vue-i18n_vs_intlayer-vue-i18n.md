---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "vue-i18n vs @intlayer/vue-i18n: Aynı API, Farklı Bundle"
description: Bir Vue 3 uygulaması vue-i18n çağrılarını tuttuğunda ancak @intlayer/vue-i18n compat adapter aracılığıyla sunduğunda neler değişiyor. Aynı Vite + Vue kodunda sayfa başına JavaScript, runtime boyutu, component boyutu ve sızıntı ölçüldü; adapter'ın ne tuttuğu, ne yoksaydığı ve neyi değiştiremeyeceği.
keywords:
  - vue-i18n
  - "@intlayer/vue-i18n"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
slugs:
  - blog
  - vue-i18n-vs-intlayer-vue-i18n
author: aymericzip
---

# vue-i18n VS @intlayer/vue-i18n | Aynı API, Farklı Bundle

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

`@intlayer/vue-i18n`, bir uyumluluk adaptörüdür: `vue-i18n` API'sini (`createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t`, `v-t`, `i18n.global.locale`...) ortaya çıkarır ve bunu Intlayer tarafından derlenmiş sözlüklerden sunar. `.vue` dosyalarınız değişmez. `t("footer.github")`'nin bağlı olduğu şey değişir.

Bu makale, aynı Vite + Vue 3 uygulamasında bu değişimi ölçer; bir kez `vue-i18n` ile ve bir kez adapter ile oluşturulmuştur. Sayılar [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) kaynağından gelmektedir. `vue-i18n` ve Intlayer'ı kütüphaneler olarak karşılaştırmak için [vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer) ve [vue-i18n vs Intlayer benchmark](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark) makalesini okuyun. Bu makale, bileşenlerinizi olduğu gibi tuttuğunuzda adapterın ne değiştirdiği hakkındadır.

<TOC/>

> **tl;dr**: Aynı Vite + Vue 3 uygulamasında, `vue-i18n` yerine `@intlayer/vue-i18n` kullanmak sayfa başına JavaScript'i gzip olarak **134.9 KB'den 47.0 KB'ye** düşürdü (i18n olmadan uygulama 41.3 KB ağırlığında), runtime'ı **24.3 KB'den 7.9 KB'ye**, ortalama component'i **196 KB'den 8.4 KB'ye** ve yabancı sayfa string sızıntısını **%90'dan %0'a** indirdi, hiçbir `.vue` dosyası düzenlenmedi. `createI18n({ messages })` fallback olarak çalışmaya devam eder; yukarıdaki sayıları elde etmek için JSON imports'ları kaldırın. SFC `<i18n>` blokları ve runtime `setLocaleMessage()`, bu özelliklerin aktarılmayan iki özelliğidir.

## `@intlayer/vue-i18n` nedir

`vue-i18n` bir çalışma zamanıdır. `createI18n({ messages: { en, fr, ... } })` her yerel ayarın tüm mesajlarını tutan genel bir örnek oluşturur; `useI18n()` her bileşeni buna bağlar; `t("footer.github")` render zamanında ağacı dolaşır. Bu tasarım, SFC `<i18n>` bloklarını ve `setLocaleMessage()` mümkün kılan şeydir ve aynı zamanda her bileşenin bağımlılık grafiğinin tüm ağacı içermesinin nedenidir.

`@intlayer/vue-i18n` API'yi korur ve ağacı değiştirir:

1. **İçe aktarma takma adı.** `@intlayer/vue-i18n/plugin` içindeki `vueI18nVitePlugin()`, `vite-intlayer`'ı sarmalanır ve `vue-i18n`'in `@intlayer/vue-i18n` olarak çözülmesi için bir `resolve.alias` ekler. Hiçbir içe aktarma yeniden adlandırılmaz.
2. **JSON as source of truth.** The `syncJSON` plugin reads your existing `locales/{locale}.json` with `format: "vue-i18n"` (so `{name}`, `{0}` list interpolation and `"car | cars"` pipe plurals are parsed correctly) and writes translations back when the CLI or the CMS updates them.
3. **Call-site binding.** The Intlayer optimize pass rewrites `useI18n()` call sites so the component receives the dictionaries its keys name, in the active locale, as imports the bundler can trace and split.

```vue fileName="src/components/Footer.vue"
<!-- Kodunuz, değiştirilmemiş -->
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <a href="https://github.com/intlayer-org/benchmark-bloom">{{
    t("footer.github")
  }}</a>
</template>
```

```ts fileName="Derleyicinin yayınladığı şey (basitleştirilmiş)"
import _dicHash_footer from "../.intlayer/dictionaries/footer.mjs";
import { useDictionary as useI18n } from "@intlayer/vue-i18n";

const { t } = useI18n(_dicHash_footer);
```

Bileşen artık global mesaj ağacına ulaşmıyor. Yalnızca `footer`'a ulaşıyor. Bu nedenle aşağıdaki bileşen boyutu sütunu 196 KB'den 8 KB'ye düşüyor.

## Adaptörün ne tuttuğu, ne görmezden geldiği ve ne değiştirmediği

| `vue-i18n` API                                                      | `@intlayer/vue-i18n` ile                                                                                                              |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `useI18n()` → `{ t, d, n, te, tm, rt, locale, availableLocales }`   | ✅ Korundu. `t` anahtarları sözlüklerinize göre yazılmıştır                                                                           |
| `t("key", { name })`, `t("key", [a, b])`, `t("key", count)`         | ✅ Korundu. `{name}`, `{0}` ve pipe ile ayrılmış çoğullar daha önce olduğu gibi çözülür                                               |
| `d(date, "long")`, `n(value, "currency")`                           | ✅ Korundu. `createI18n()` öğesinden `datetimeFormats` / `numberFormats` yerine getirilir, yerel `Intl` ile desteklenir               |
| `i18n.global.locale.value = "fr"`                                   | ✅ Korundu. Intlayer'in istemcisi tarafından desteklenen bir `WritableComputedRef`; reaktivite önceki gibi davranır                   |
| `$t`, `$tc`, `$te`, `$tm`, `$rt`, `$d`, `$n`, `$i18n` (Options API) | ✅ Korundu. `app.use(i18n)` tarafından `app.config.globalProperties` üzerine kaydedildi                                               |
| `v-t` directive                                                     | ✅ Korundu                                                                                                                            |
| `legacy: true`                                                      | ✅ Kabul edildi                                                                                                                       |
| `createI18n({ messages })`                                          | ⚠️ `messages` bir **runtime fallback** olarak kullanılır ve dev uyarısı gösterilir. Bundle kazançları için JSON importlarını kaldırın |
| `setLocaleMessage()`, `mergeLocaleMessage()`                        | ❌ Uyarı gösterilir ve hiçbir şey yapmaz. Runtime message yükleme, build-time sözlükleri ile değiştirilir                             |
| SFC `<i18n>` custom blocks                                          | ❌ Okunmaz. Bu mesajları locale JSON'a (veya bileşenin yanındaki `.content.ts`'e) taşıyın                                             |
| `@nuxtjs/i18n`                                                      | ⚠️ Ayrı adapter, bkz. [Nuxt compat docu](https://intlayer.org/doc/compatibility/nuxtjs-i18n)                                          |

## Benchmark

### Ölçülen içerik

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) paketi, **aynı Vite + Vue 3 uygulamasını** her setup ile derler: **10 sayfa** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locale** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), özdeş bileşenler ve özdeş içerik. Sayfalar `en` ve `fr` dilinde ölçülür.

Her ikisi de **static** konfigürasyonda derlenmiştir; çoğu Vue projesinin sevk ettiği konfigürasyon: `vue-i18n` için, her locale'in JSON'u import edilip `createI18n({ messages })` öğesine iletilir; adapter için, `vite.config.ts` ve `intlayer.config.ts` değiştirilmiş aynı bileşenler ve `messages` import'u kaldırılmıştır. Referans için native `vue-intlayer` dahil edilmiştir.

Her derleme için, suite şunları kaydeder:

- **Kütüphane boyutu**: i18n kütüphanesini yalnızca içe aktaran boş bir bileşenin gzip (ve küçültülmüş) boyutu.
- **Sayfa JS**: sayfa başına indirilen gzip JavaScript, tüm sayfalar ve locale'ler üzerinde ortalama.
- **Locale sızıntısı %**: indirilen JS'teki çevrilmiş dizelerin kullanıcının **görüntülemediği** bir locale'e ait olan yüzdesi.
- **Sayfa sızıntısı %**: indirilen JS'teki çevrilmiş dizelerin kullanıcının **bulunmadığı** bir sayfaya ait olan yüzdesi.
- **Bileşen ortalaması**: izolasyon halinde derlenen her bileşenin ortalama gzip boyutu.
- **E2E tepkisellik**: yeni bir locale seçimi ile DOM'da `html[lang]` güncellemesi arasındaki duvar saati zamanı (Playwright, 5 yineleme).
- **Sayfa yükleme**: `PerformanceNavigationTiming.duration`.

> Aşağıdaki rakamlar **2026-09-12** tarihinde `vue-i18n` 11.4.0 ve `@intlayer/vue-i18n` 9.5.1 ile yapılan çalıştırmadan gelmiştir. Test uygulaması kasıtlı olarak küçüktür (locale başına birkaç düzine string), bu nedenle sızıntı yüzdeleri bir **pattern** açıklar: içeriğiniz büyüdükçe artar, ancak runtime maliyeti sabit kalır.

### Vite + Vue 3 Sonuçları

İlgilendiğiniz metrikleri ve kütüphaneleri seçin:

<I18nBenchmark framework="vite-vue" vertical/>

| Kurulum                  | Strategi | Lib size (gz) | Lib size (min) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |  Page load |
| ------------------------ | -------- | ------------: | -------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ---------: |
| **base** (i18n yok)      | -        |        0.0 KB |         0.0 KB |          41.3 KB |        0.0% |         - |             1.1 KB |         1.8 ms |    10.8 ms |
| `vue-i18n`               | static   |       24.3 KB |        83.2 KB |         134.9 KB |       50.0% |     90.0% |           196.0 KB |         2.8 ms |    13.6 ms |
| **`@intlayer/vue-i18n`** | static   |    **7.9 KB** |    **23.2 KB** |      **47.0 KB** |   **15.0%** |  **0.0%** |         **8.4 KB** |     **1.5 ms** | **9.3 ms** |
| `vue-intlayer` (native)  | static   |        3.9 KB |        11.1 KB |          57.1 KB |       56.8% |      0.0% |             7.7 KB |         4.5 ms |    13.8 ms |
| `vue-intlayer` (native)  | dynamic  |        3.9 KB |        11.1 KB |          59.8 KB |       50.0% |      0.0% |             6.5 KB |         4.0 ms |    15.8 ms |

> Temel uygulamanın page-leak sütunu boş bırakılmıştır: i18n kütüphanesi olmadan, parmak izi alma paylaşılan chunk'lardaki sabit kodlanmış stringleri alır ve sayı anlamlı değildir.

**Nasıl okunur**

- **Sayfa başına 88 KB daha az, aynı bileşenler.** `vue-i18n`, 41.3 KB uygulamayı **134.9 KB** olarak alır. Aynı bileşenlerin adapter derlemesi **47.0 KB** ile sonuçlanır, temel uygulamadan 5.7 KB üstündedir. Farkın çoğu, `createI18n({ messages })` tarafından her sayfaya çekilen 74.9 KB `src/locales` ve adaptörün asla bir blok olarak paketlemediği şeydir.
- **Runtime 3 kat küçülüyor.** Sadece `vue-i18n` içe aktaran boş bir component **24.3 KB gzip / 83.2 KB minified** maliyetlidir: `@intlify/core-base`, mesaj derleyicisi ve runtime. Adapter **7.9 KB / 23.2 KB** maliyetlidir, çoğunluğu Intlayer'ın core'u artı `vue-i18n` API surface'idir.
- **Componentler: 23 kat daha küçük.** İzolasyon halinde derlenen bir `useI18n()` component ortalaması **196 KB**'dir, çünkü `t` her locale'in her mesajını tutan instance'a bağlıdır. Adapter ile aynı component ortalaması **8.4 KB**'dir: kendi sözlüğüne ulaşır.
- **Sızıntı.** `vue-i18n`, her yerel ayarı ve her sayfanın dizelerini her sayfada gönderir: %50 yerel ayar sızıntısı (iki parmakli yerel ayarda; on yerel ayar paketlenmiş olsa bile gerçek harcama daha yüksektir), %90 sayfa sızıntısı. Adapter, her bileşen yalnızca kendi sözlüklerini içe aktardığından sayfa sızıntısını **%0**'a düşürür. Bu `static` çalıştırmada yerel ayar sızıntısı %15'tedir; `importMode: 'dynamic'` bunu kaldıran ayardır ve bu yapılandırma bu Vue çalıştırmasının bir parçası değildi.
- **Reaktivite ve sayfa yükü.** Yerel ayar değiştirme her ikisi için de ucuzdur (1,5-2,8 ms); Vue'nin reaktivite sistemi mesajlar bellekte olduktan sonra bunu sağlar. Sayfa yükü 13,6 ms'den **9,3 ms**'ye gider; ayrıştırılacak 88 KB daha az JavaScript ile uyumludur.
- **Yerel satırlar hakkında.** `vue-intlayer` bu çalıştırmada `static` modunda her yerel ayarı paketledi ve 3,9 KB çalışma zamanı ile 57,1 KB'ye ulaştı; adaptörün senkronize edilen sözlükleri daha az yabancı yerel ayar dizesi içeriyordu, bu nedenle sayfa başına daha düşük rakam. Yerel çalışma zamanı üçünün en hafifi olmaya devam ediyor ve `.content.ts` modeli SFC `<i18n>` bloklarının eşdeğerini bulduğu yerdir.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tüm tablo, her kütüphane ve her strateji, [Vue kıyaslama raporunda](https://intlayer.org/tr/doc/benchmark/vue).

## Sayılar neden değişiyor

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

`src/components/` içinde hiçbir şey değişmedi, bu nedenle kazançlar `useI18n` bağlı olduğu şeyden geliyor.

**`vue-i18n` ile**, bağlama global örnek olur. `createI18n({ messages: { en, fr, ... } })` her şeyi içeren tek bir importtur; `useI18n()` çağıran her bileşen tümüne erişebilir, bu nedenle bundler örneğin altında bölemez. Optimize etmek, _siz_ `en.json` dosyasını rota tarafından bölmeniz, bir router guard içinde `setLocaleMessage()` çağırmanız ve bileşenler hareket ettikçe rota-dosya haritasını doğru tutmanız anlamına gelir. İsraf aynı anda iki eksende büyür, sayfalar ve diller:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── locales
│   ├── en.json                    # her sayfanın stringleri
│   └── fr.json
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts                    # app.use(i18n)
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")
```

**`@intlayer/vue-i18n` ile**, binding sözlüktür. `syncJSON` her `en.json` dosyasının üst düzey anahtarını bir sözlüğe dönüştürür; optimize işlemi komponente adlarını verdiği anahtarları, bundler'ın izlediği ve sayfa başına böldüğü importlar olarak geçirir.

```bash
.
├── intlayer.config.ts             # syncJSON({ format: "vue-i18n", source: ... })
├── locales
│   ├── en.json                    # unchanged, still the source of truth
│   └── fr.json
├── .intlayer/                     # generated: one dictionary per top-level key, per locale
└── src
    ├── i18n.ts                    # createI18n({})   ← messages import removed
    ├── main.ts                    # app.use(i18n)    ← unchanged
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")  ← unchanged
```

`i18n.ts` dosyasındaki `messages` import'ı silinecek tek satırdır. Bu 88 KB'dir.

## Üç adımda geçiş

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

Komut `vue-i18n`'i algılar, `intlayer`, `vue-intlayer`, `@intlayer/vue-i18n` ve `@intlayer/sync-json-plugin`'i kurar ve `intlayer.config.ts`'i önceden doldurur. `vue-i18n`'i kurulu tutun: bu bir peer bağımlılığıdır ve türleri sağlar.

</Step>
<Step number={2} title="Intlayer'ı yerel dosyalarınıza yönlendirin">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" her yerel ayarı paketler; "dynamic" aktif olanı talep üzerine yükler
    importMode: "dynamic",
    format: "vue-i18n",
  },
  plugins: [
    syncJSON({
      // vue-i18n lehçesi: {name}, {0}, "car | cars"
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

`locales/{locale}.json` bulunduğu yerde kalır. Her üst düzey anahtar (`footer`, `hero`...) bir sözlük haline gelir.

</Step>
<Step number={3} title="Eklentiyi ekleyin ve mesaj importunu kaldırın">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";

// Önce: createI18n({ locale: "en", messages: { en, fr, es } })
export const i18n = createI18n({ locale: "en" });
```

`vueI18nVitePlugin()` eklentisi `vite-intlayer`'ı (içerik izleme, sözlük derleme, optimize geçişi) sarmaladığından ve `vue-i18n`'i adaptöre alias ettiğinden; `messages` importunu kaldırmak 88 KB'lik tasarrufu sağlar; bunu bırakmak uygulamanın çalışmasını devam ettirse de hem eski hem de yeni versiyonu yükler.

</Step>
</Steps>

### Sonra silebileceğiniz şeyler

| Dosya / pattern                                    | Nedeni                                                                                 |
| -------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `import en from "./locales/en.json"` ve benzerleri | Adapter tarafından yalnızca fallback olarak kullanılır. 88 KB'ın geldiği yer burasıdır |
| Router guards içindeki `setLocaleMessage()`        | İşlevsiz. Route başına yükleme artık derleyicinin işidir                               |
| `@intlify/unplugin-vue-i18n`                       | Gerekli değildir: mesajları önceden derler ve SFC blokları adapter tarafından okunmaz  |
| SFC `<i18n>` blokları                              | Okunmaz; bunları locale JSON'ına veya bileşen başına `.content.ts` dosyasına taşıyın   |

### Baytların ötesinde neler kazanırsınız

- **Yazılı anahtarlar.** `t("footer.github")` derlenmiş `footer` sözlüğüne karşı yazılıdır; yanlış bir yol, metni anahtar olarak render etmek yerine bir TypeScript hatasıdır.
- **`npx intlayer test`** herhangi bir locale'de eksik bir anahtar için CI'yi başarısız kılar. **`npx intlayer fill`** eksik olanları kendi sağlayıcı anahtarınızla (OpenAI, Anthropic, Mistral, Gemini...) çevirir ve bunları `locales/{locale}.json` dosyasına geri yazar.
- **Visual Editor ve CMS** aynı JSON üzerinde çalışır, bu nedenle geliştirici olmayanlar bir UI aracılığıyla düzenler ve dosyalar güncellenir.
- **`.content.ts` dosyasına kademeli geçiş.** Herhangi bir component, bir co-located content dosyası ile `useI18n()` öğesinden `useIntlayer("footer")` öğesine geçebilir. JSON ve `.content.ts` sözlükleri bir arada bulunur ve birleşir.

## Başlamadan önce bilmeniz gereken sınırlamalar

<AccordionGroup>
<Accordion header="SFC <i18n> blokları okunmaz">

Mesajlarınız bileşenlerin içindeyse, yerel ayarlara ait dosyalara veya üretilen tiplerle aynı mantıkta olan `.content.ts` dosyasına taşınmalıdır.

</Accordion>
<Accordion header="Çalışma zamanı mesaj yükleme kaldırıldı">

`setLocaleMessage()` ve `mergeLocaleMessage()` bir uyarı verip geri döner. Çalışma zamanında bir CMS'ten çekilen çeviriler, [Intlayer CMS](https://intlayer.org/tr/doc/concept/cms) veya `intlayer pull` / `push` komutlarını gerektirir.

</Accordion>
<Accordion header="messages bir yedek seçenektir, ücretsiz değildir">

`createI18n()` içindeki JSON içe aktarmalarını tutmak, pakette 75 KB tutmaya devam eder. `intlayer test` başarıyla geçtikten sonra bunları silin.

</Accordion>
<Accordion header="Adaptör yerel çalışma zamanı değildir">

`vue-intlayer` için 3.9 KB iken adaptör için 7.9 KB. Her bileşen `useIntlayer` kullanımına geçtikten sonra kaldırın.

</Accordion>
</AccordionGroup>

## Hangisini ne zaman kullanmalı?

<AccordionGroup>
<Accordion header="vue-i18n'de kalın">

Uygulamanız SFC `<i18n>` bloklarına veya çalışma zamanı `setLocaleMessage()` akışlarına bağımlıysa ya da sayfa başına 90 KB kitleniz için bir endişe kaynağı değilse.

</Accordion>
<Accordion header="@intlayer/vue-i18n kullanın">

`vue-i18n` kullanıyorsanız ve hiçbir `.vue` dosyasını düzenlemeden 88 KB tasarruf, 23 kat daha küçük bileşenler, %0 sayfa sızıntısı, tiplenmiş anahtarlar ve CI denetimleri istiyorsanız. Mevcut bir `vue-i18n` kod tabanı için giriş noktası budur.

</Accordion>
<Accordion header="Yerel kullanıma geçin (vue-intlayer)">

Yeni projeler için veya adaptör görevini tamamladıktan sonra. En hafif çalışma zamanına (3.9 KB) ve `<i18n>` bloklarını tiplenmiş içerikle değiştiren bileşen başına `.content.ts` modeline sahiptir. [Vue ile Intlayer](https://intlayer.org/tr/doc/environment/vite-and-vue) veya [Nuxt ile](https://intlayer.org/tr/doc/environment/nuxt-and-vue) başlayın.

</Accordion>
</AccordionGroup>

## SSS

<FAQ>

<Question title=".vue dosyalarımı düzenlemem gerekiyor mu?">

Hayır. Kıyaslama derlemesi yalnızca `vite.config.ts`, `intlayer.config.ts` ve `src/i18n.ts` dosyasındaki `messages` içe aktarımını değiştirdi. Her `useI18n()`, `$t`, `v-t` ve Options API çağrısı olduğu gibi kaldı.

</Question>

<Question title="Bileşen boyutu neden 23 kat daha küçük?">

Çünkü `useI18n()` artık genel örneğe erişmeyi bırakır. `createI18n({ messages })` her yerel ayarın tüm mesajlarını tutar, bu nedenle tek başına derlenen bir bileşen 196 KB yük getirir. Adaptörle yalnızca kendi sözlüğüne erişir: 8.4 KB.

</Question>

<Question title="d() ve n() biçimlendirmeleri ne olacak?">

Korundu. `createI18n()` işlevine iletilen `datetimeFormats` ve `numberFormats` yapılandırmalarına uyulur ve yerel `Intl` API'si ile desteklenir. Bkz. [tarih, saat ve sayı biçimlendirmesi](https://intlayer.org/tr/blog/date-time-number-formatting-locales).

</Question>

<Question title="Nuxt ile çalışır mı?">

`@intlayer/vue-i18n` Vite + Vue hedefler. `@nuxtjs/i18n` için [Nuxt i18n uyumluluk adaptörünü](https://intlayer.org/tr/doc/compatibility/nuxtjs-i18n) kullanın ve yerel kurulum için [Nuxt ile Intlayer](https://intlayer.org/tr/doc/environment/nuxt-and-vue) sayfasına bakın.

</Question>

<Question title="Bileşen bileşen geçiş yapabilir miyim?">

Evet. Herhangi bir bileşen, aynı dizinde bulunan bir içerik dosyasıyla `useI18n()` kullanımından `useIntlayer("footer")` kullanımına geçebilir. JSON ve `.content.ts` sözlükleri bir arada var olur ve birleşir.

</Question>

</FAQ>

## İlgili karşılaştırmalar

Aynı adaptör serisi:

- [next-intl vs @intlayer/next-intl](https://intlayer.org/tr/blog/next-intl-vs-intlayer-next-intl)
- [i18next vs @intlayer/i18next](https://intlayer.org/tr/blog/i18next-vs-intlayer-i18next)
- [Lingui vs @intlayer/lingui](https://intlayer.org/tr/blog/lingui-vs-intlayer-lingui)

Doğrudan karşılaştırılan kütüphaneler:

- [vue-i18n vs Intlayer](https://intlayer.org/tr/blog/vue-i18n-vs-intlayer), features and DX
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/tr/blog/vue-i18n-vs-intlayer-benchmark)
- [Is vue-i18n outdated?](https://intlayer.org/tr/blog/is-vue-i18n-outdated)
- [How to pick a Vue i18n library](https://intlayer.org/tr/blog/how-to-pick-vue-i18n-library)

Referans belgeler:

- [Compat adapter: vue-i18n](https://intlayer.org/tr/doc/compatibility/vue-i18n) and [Nuxt i18n](https://intlayer.org/tr/doc/compatibility/nuxtjs-i18n)
- [Geçiş kılavuzu: vue-i18n'den Intlayer'a](https://intlayer.org/tr/doc/migration/vue-i18n)
- [Vue kıyaslama raporu](https://intlayer.org/tr/doc/benchmark/vue)
- [Paket optimizasyonu](https://intlayer.org/tr/doc/concept/bundle-optimization) ve [Intlayer derleyicisi](https://intlayer.org/tr/doc/compiler)
- [Görsel Düzenleyici](https://intlayer.org/tr/doc/concept/editor), [CMS](https://intlayer.org/tr/doc/concept/cms) ve [yapay zeka çevirisi](https://intlayer.org/tr/doc/concept/auto-fill)

## Sonuç

`@intlayer/vue-i18n`, `useI18n()` işlevini değiştirir: her yerel ayarın her mesajını tutan global bir instance'dan, o bileşen için derlenmiş bir sözlüğe. **88 KB daha küçük sayfa başına**, **3x daha küçük runtime**, **23x daha küçük bileşenler** ve **%0 sayfa sızıntısı** ile aynı Vite + Vue 3 uygulamasında, bir config dosyası, bir plugin satırı ve silinen bir import için. SFC `<i18n>` blokları ve runtime message yüklenmesi, taşımadığı iki şeydir ve native `vue-intlayer` runtime'ı boyutunun yarısı kalır.

Tüm ham veriler, test uygulamaları ve scriptler [Benchmark Bloom repository](https://github.com/intlayer-org/benchmark-bloom) içinde bulunmaktadır. Kendiniz çalıştırabilirsiniz.

Daha fazla ayrıntı için ['Neden Intlayer?' dokümantasyonuna](https://intlayer.org/tr/doc/why) bakınız.
