---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs Intlayer: 2026 Benchmark"
description: vue-i18n ve Intlayer aynı Vite + Vue 3 uygulamasında ölçüldü. Kütüphane boyutu, sayfa başına JavaScript, içerik sızıntısı, bileşen boyutu ve locale değiştirme reaktivitesi, rakamların açıklamasıyla birlikte.
keywords:
  - vue-i18n
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n VS Intlayer | Vue Uluslararasılaştırma (i18n) Benchmark'ı

`vue-i18n`, Vue için referans i18n kütüphanesidir. Intlayer ise derleyici tabanlı, bileşen kapsamlı bir alternatiftir ve bir Vue entegrasyonu (`vue-intlayer`) sunar. [Özelliklerini ve geliştirici deneyimlerini](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/vue-i18n_vs_intlayer.md) zaten karşılaştırmıştık. Bu yazı, uygulama derlendikten sonra her birinin neye mal olduğuna bakıyor.

Veriler, her kütüphaneyle aynı uygulamayı derleyen ve tarayıcının gerçekte ne indirip çalıştırdığını kaydeden açık kaynaklı bir paket olan [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)'dan geliyor.

<TOC/>

> **tl;dr**: Aynı Vite + Vue 3 uygulamasında `vue-i18n`, i18n'siz uygulamanın **41,3 KB**'ına karşılık sayfa başına **134,9 KB** gzip'lenmiş JavaScript gönderiyor. Intlayer **57,1 KB** gönderiyor. `vue-i18n` runtime'ı tek başına **24,3 KB gzip** (Intlayer'ın 3,9 KB'ının 6 katı), her sayfa **diğer sayfaların dizelerinin %90'ını** taşıyor ve izole derlenen bir bileşen, global mesaj ağacına bağlı olduğu için **196 KB** sürüklüyor. `@intlayer/vue-i18n` adaptörü `vue-i18n` API'sini koruyor ve sayfa başına **47,0 KB** ölçtü.

## Kısaca

- **vue-i18n** - Vue 2 / Vue 3 için fiili i18n kütüphanesi ve `@nuxtjs/i18n`'in çekirdeği. ICU tarzı mesajlar, SFC `<i18n>` blokları, `v-t` direktifi, `d()` / `n()` biçimlendiricileri, geniş ekosistem. Mesajlar `createI18n()` sırasında global bir örneğe kaydedilir; locale başına lazy loading manuel bir `setLocaleMessage()` desenidir ve rota başına bölme sizin inşa etmeniz gereken bir şeydir.
- **Intlayer** - Bileşen merkezli içerik modeli. `.content.ts` sözlükleri hizmet ettikleri bileşenin yanında durur, derleme zamanı derleyicisi (`vite-intlayer`) bunları bileşen ve locale başına tree-shake eder ve lazy load eder, içeriğinizden katı TypeScript tipleri üretilir ve eksik çeviriler derleme zamanında hata verir. Router / SEO yardımcıları, Görsel Düzenleyici / CMS ve yapay zeka destekli çeviri ile gelir.

| Kütüphane             | GitHub Yıldızları                                                                                                                                                              | Toplam Commit                                                                                                                                                                      | Son Commit                                                                                                                                          | İlk Sürüm  | NPM Sürümü                                                                                                  | NPM İndirmeleri                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Nisan 2024 | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | Ara 2016   | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> Rozetler otomatik olarak güncellenir. Anlık görüntüler zamanla değişecektir.

## Yan yana özellik karşılaştırması

| Özellik                                               | `vue-intlayer` (Intlayer)                                       | `vue-i18n`                                                                       |
| ----------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Bileşenlere yakın çeviriler**                       | ✅ Evet, `.content.ts` her bileşenle aynı yerde                 | ✅ SFC `<i18n>` blokları ile (isteğe bağlı); global kataloglar yaygın kurulumdur |
| **TypeScript entegrasyonu**                           | ✅ İçerikten otomatik üretilen katı tipler                      | ✅ İyi tipler; katı anahtar güvenliği şema tipleme ve disiplin gerektirir        |
| **Eksik çeviri tespiti**                              | ✅ TypeScript hatası + derleme zamanı hata/uyarısı              | ⚠️ Runtime fallback + konsol uyarısı                                             |
| **Zengin içerik (bileşenler / Markdown)**             | ✅ Doğrudan destek                                              | ⚠️ `<i18n-t>` bileşen interpolasyonu; Markdown harici eklentilerle               |
| **ICU desteği**                                       | ⚠️ Devam ediyor                                                 | ✅ Evet                                                                          |
| **Biçimlendirme (tarih, sayı, para birimi)**          | ✅ Intl tabanlı biçimlendiriciler                               | ✅ `datetimeFormats` / `numberFormats` ile `d()` / `n()`                         |
| **Yerelleştirilmiş yönlendirme**                      | ✅ Vue Router / Nuxt için yardımcılar, `getMultilingualUrls`    | ⚠️ Çekirdekte değil (`@nuxtjs/i18n` veya özel router kurulumu)                   |
| **SEO yardımcıları (hreflang, sitemap, robots)**      | ✅ Yerleşik yardımcılar                                         | ❌ Çekirdekte değil                                                              |
| **Tree-shaking (yalnızca kullanılan içeriği gönder)** | ✅ Bileşen başına, locale başına, derleyici tarafından otomatik | ⚠️ Manuel: katalogları böl, rota başına `setLocaleMessage()`                     |
| **Lazy loading**                                      | ✅ `importMode: 'dynamic'` (tek satır yapılandırma)             | ✅ Manuel `import()` + `setLocaleMessage()`                                      |
| **Kullanılmayan içeriği temizleme**                   | ✅ Ölü sözlükler derleme zamanında atılır                       | ❌ Yerleşik değil                                                                |
| **Eksik çevirileri test etme (CLI / CI)**             | ✅ `npx intlayer content test`                                  | ⚠️ Üçüncü taraf (`vue-i18n-extract`)                                             |
| **Yapay zeka destekli çeviri**                        | ✅ Yerleşik, kendi sağlayıcı anahtarlarınızı kullanır           | ❌ Hayır                                                                         |
| **Görsel Düzenleyici / CMS**                          | ✅ Ücretsiz Görsel Düzenleyici + isteğe bağlı CMS               | ❌ Hayır (harici yerelleştirme platformları)                                     |
| **MCP sunucusu ve Agent Skills**                      | ✅ Evet                                                         | ❌ Hayır                                                                         |
| **Ekosistem / topluluk**                              | ⚠️ Daha küçük ama hızla büyüyor                                 | ✅ Vue ekosisteminde büyük ve olgun                                              |

## Benchmark

### Ne ölçüldü

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) paketi, her kütüphaneyle **aynı Vite + Vue 3 uygulamasını** derler: **10 sayfa** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locale** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), aynı bileşenler ve aynı içerik. Sayfalar `en` ve `fr` dillerinde ölçülür.

Her iki kütüphane de çoğu Vue projesinin yayınladığı **static** yapılandırmada test edildi: `vue-i18n` için her locale'in JSON'u içe aktarılıp `createI18n({ messages })`'a geçirildi; Intlayer için varsayılan `importMode: 'static'`. Bu modda Intlayer da tüm locale'leri paketler, ancak derleyici içeriği yine de **bileşen başına** kapsamlandırır, dolayısıyla bir sayfa yalnızca render ettiği bileşenlerin sözlüklerini taşır.

Her derleme için paket şunları kaydeder:

- **Lib size**: Yalnızca i18n kütüphanesini içe aktaran boş bir bileşenin gzip boyutu. Runtime'ın sabit maliyeti.
- **Page JS**: Sayfa başına indirilen gzip JavaScript, tüm sayfalar ve locale'ler üzerinden ortalaması alınmış.
- **Locale leak %**: İndirilen JS'de bulunan çevrilmiş dizelerden, kullanıcının görüntüle**me**diği bir locale'e ait olanların payı (`en` ve `fr` üzerinde parmak izi alındığından %50, "diğer ölçülen locale tamamen mevcut" anlamına gelir; 10 locale paketlendiğinde gerçek israf daha yüksektir).
- **Page leak %**: İndirilen JS'de bulunan çevrilmiş dizelerden, kullanıcının **bulunmadığı** bir sayfaya ait olanların payı.
- **Component avg**: İzole derlenen her bileşenin ortalama gzip boyutu. Tek bir bileşenin ne kadar i18n runtime'ı ve katalog sürüklediğini gösterir.
- **E2E reactivity**: Yeni bir locale seçilmesi ile DOM'da `html[lang]`'in güncellenmesi arasındaki gerçek süre (Playwright, 5 yineleme).
- **Page load**: `PerformanceNavigationTiming.duration`.

> Aşağıdaki rakamlar `vue-i18n` 11.4.0 ve `intlayer` 9.5.0 / 9.5.1 ile **2026-09-12** tarihli çalıştırmadan gelmektedir. Test uygulaması kasıtlı olarak küçüktür (locale başına birkaç düzine dize), bu nedenle sızıntı yüzdeleri bir **desen** tanımlar: içeriğinizle birlikte büyürler, runtime maliyeti ise sabit kalır.

### Vite + Vue 3 üzerindeki sonuçlar

| Kütüphane                     | Strateji | Lib size (gz) | Lib size (min) | Page JS ort. (gz) | Locale leak | Page leak | Component ort. (gz) | E2E reaktivite | Page load |
| ----------------------------- | -------- | ------------: | -------------: | ----------------: | ----------: | --------: | ------------------: | -------------: | --------: |
| **base** (i18n yok)           | -        |        0,0 KB |         0,0 KB |           41,3 KB |        %0,0 |         - |              1,1 KB |         1,8 ms |   10,8 ms |
| `vue-i18n`                    | static   |       24,3 KB |        83,2 KB |          134,9 KB |       %50,0 |     %90,0 |            196,0 KB |         2,8 ms |   13,6 ms |
| **`vue-intlayer`**            | static   |    **3,9 KB** |    **11,1 KB** |       **57,1 KB** |       %56,8 |  **%0,0** |          **7,7 KB** |     **4,5 ms** |   13,8 ms |
| `@intlayer/vue-i18n` (compat) | static   |        7,9 KB |        23,2 KB |           47,0 KB |       %15,0 |      %0,0 |              8,4 KB |         1,5 ms |    9,3 ms |

> Temel uygulamanın page-leak sütunu boş bırakılmıştır: i18n kütüphanesi olmadan parmak izi, paylaşılan chunk'lardaki sabit kodlanmış dizeleri yakalar ve sayı anlamlı değildir.

**Nasıl okunmalı**

- **Runtime maliyeti.** `vue-i18n`, tüm benchmark'taki en ağır runtime'lardan biri: yalnızca onu içe aktaran boş bir bileşen için **24,3 KB gzip / 83,2 KB minified**. `vue-intlayer` 3,9 KB gzip'e mal oluyor. Bu fark, kaç dizeniz olursa olsun her sayfada ödeniyor.
- **Sayfa başına JavaScript.** i18n'siz uygulama 41,3 KB. `vue-i18n` bunu üç katından fazlasına, **134,9 KB**'a çıkarıyor; Intlayer **57,1 KB**'da kalıyor, +15,8 KB, bunun çoğu paketlenen on locale (bir sonraki noktaya bakın).
- **Sızıntı.** `createI18n({ messages: { en, fr, ... } })` ile her sayfa tüm locale'leri ve tüm sayfaların dizelerini gönderir: **%50 locale sızıntısı** (parmak izi alınan iki locale'de) ve **%90 sayfa sızıntısı**. Intlayer'ın `static` modu da tüm locale'leri paketler (dolayısıyla karşılaştırılabilir locale sızıntısı rakamı) ama **%0 sayfa sızıntısına** sahiptir: bir sayfa yalnızca render ettiği bileşenlerin sözlüklerini çeker. `importMode: 'dynamic'`'e geçmek locale sızıntısını da ortadan kaldırır; bu yapılandırma bu Vue çalıştırmasının parçası değildi.
- **Bileşen boyutu mimarinin kendini gösterdiği yer.** `useI18n()` çağıran bir bileşen ortalama **196 KB**'a derlenir, çünkü `t()` her locale'in her mesajını tutan global örneğe bağlıdır. Aynı bileşen `useIntlayer()` ile **7,7 KB**'a derlenir: yalnızca kendi sözlüğüne ulaşır.
- **Reaktivite** her ikisi için de sorun değil (2-5 ms). Mesajlar bellekte olduğunda Vue'nun reaktivite sistemi locale değiştirmeyi ucuz hale getirir.
- **`@intlayer/vue-i18n`**, drop-in adaptör, `vue-i18n` API'sini korur ve uygulama koduna dokunulmadan **sayfa başına 47,0 KB** ve **bileşen başına 8,4 KB** ölçtü.

> Referans olarak, aynı çalıştırma `fluent-vue`'yu sayfa başına 171,8 KB, 29,7 KB runtime ve bileşen başına 217 KB olarak ölçtü.

## Fark neden? Global örnek vs derlenmiş sözlükler

`vue-i18n` bir runtime'dır. `createI18n()`, locale başına bir mesaj ağacı tutan global bir örnek oluşturur; `useI18n()` her bileşeni ona bağlar; `t("footer.github")` anahtarı render zamanında arar. SFC `<i18n>` bloklarını, `v-t`'yi ve runtime mesaj yüklemeyi mümkün kılan şey budur ve her bileşenin bağımlılık grafiğinin tüm ağacı içermesinin nedeni de budur:

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── ...                        # locale başına bir dosya, tüm sayfalar içinde
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts
    └── components
        └── Footer.vue             # const { t } = useI18n(); t("footer.github")
```

Optimize etmek, `en.json`'u rota başına dosyalara **sizin** bölmeniz, bir router guard'ında `setLocaleMessage()`'ı **sizin** çağırmanız ve bileşenler taşındıkça rota-dosya eşlemesini **sizin** doğru tutmanız anlamına gelir. Runtime bunu sizin için yapamaz çünkü bir bileşenin hangi anahtarları isteyeceği hakkında hiçbir fikri yoktur.

Intlayer bu bilgiyi derlemeye taşır. İçerik bileşenin yanında bildirilir ve `vite-intlayer` hangi bileşenin hangi sözlüğü içe aktardığını çözer:

```bash
.
├── intlayer.config.ts
└── src
    ├── main.ts                    # createApp(App).use(intlayer)
    └── components
        └── Footer
            ├── Footer.vue         # useIntlayer("footer")
            └── Footer.content.ts
```

Derleyici, sözlük ve locale başına, o bileşenin ihtiyaç duyduğu JSON'u tam olarak üretir ve hiçbir şeyin içe aktarmadığı sözlükleri atar. Rota başına kapsamlandırma, bileşen başına kapsamlandırmanın bir sonucudur, bir görev değil.

> Kullanılmayan locale'leri de atmak için `intlayer.config.ts` içinde `dictionary.importMode: 'dynamic'` ayarlayın. [Bundle optimizasyonu dokümanına](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) bakın.

## Geliştirici deneyimi

### Kurulum

**vue-i18n**

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, fr },
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

createApp(App).use(router).use(i18n).mount("#app");
```

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

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), vue()],
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import router from "./router";

createApp(App).use(intlayer).use(router).mount("#app");
```

### Bileşen

**vue-i18n**

```json fileName="locales/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```vue fileName="src/components/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ n(count) }}</p>
    <button :aria-label="t('counter.label')" @click="count++">
      {{ t("counter.increment") }}
    </button>
  </div>
</template>
```

`t('counter.label')`, mesaj şemasını kendiniz tipleyene kadar bir string'dir; bir yazım hatası anahtarı render eder.

**Intlayer**

```ts fileName="src/components/Counter/Counter.content.ts"
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

```vue fileName="src/components/Counter/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";
import { useNumber } from "vue-intlayer/format";

const { label, increment } = useIntlayer("counter");
const number = useNumber();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ number.value(count) }}</p>
    <button :aria-label="label" @click="count++">
      {{ increment }}
    </button>
  </div>
</template>
```

`label` ve `increment` tiplidir; bir yazım hatası TypeScript hatasıdır, eksik bir Fransızca değer derleme hatasıdır.

### Locale başına lazy loading

**vue-i18n**

```ts fileName="src/i18n.ts"
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
});

export const loadLocaleMessages = async (locale: string) => {
  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  await nextTick();
  i18n.global.locale.value = locale;
};
```

Ardından bir router guard'ından `loadLocaleMessages()` çağırın ve sayfa başına kapsamlandırma istiyorsanız `locales/{locale}.json`'u rota başına kendiniz bölün.

**Intlayer**

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  // ...
  dictionary: {
    importMode: "dynamic",
  },
};
```

## vue-i18n API'sini koruyun, Intlayer'ın çıktısını alın

`@intlayer/vue-i18n` bir drop-in adaptördür: `useI18n()`, `t()`, `d()`, `n()`, `{name}` ve `{0}` interpolasyonu, pipe çoğullar (`"car | cars"`), `v-t` ve `i18n.global.locale` çalışmaya devam eder, `vite-intlayer` tarafından derlenen Intlayer sözlüklerinden sunulur.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

Benchmark'ta aynı uygulamanın compat derlemesi, bileşenlere dokunulmadan sayfa başına **134,9 KB'dan 47,0 KB'a** ve bileşen başına **196 KB'dan 8,4 KB'a** düştü. Mevcut `locales/{locale}.json` dosyalarınız JSON senkronizasyon eklentisi aracılığıyla doğruluk kaynağı olarak kalabilir.

[vue-i18n geçiş rehberine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_vue-i18n_to_intlayer.md) ve [uyumluluk dokümanına](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/vue-i18n.md) bakın. Nuxt kullanıcıları [`@nuxtjs/i18n` uyumluluğu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/nuxtjs-i18n.md) üzerinden aynı yola sahiptir.

## Hangisini ne zaman seçmeli?

- **vue-i18n'i seçin**: standart Vue yaklaşımını istiyorsanız, ICU mesajlarına veya SFC `<i18n>` bloklarına güveniyorsanız, zaten `@nuxtjs/i18n` kullanıyorsanız veya bir çeviri platformu merkezi JSON bekliyorsa. Bundle boyutu önemliyse katalogları bölmek ve rota başına lazy load yapmak için zaman ayırın.
- **Intlayer'ı seçin**: **bileşen kapsamlı içerik**, **katı TypeScript**, **derleme zamanı eksik anahtar hataları**, **sıfır çabayla tree-shaking ve lazy loading** ve yerleşik editoryal araçlar (Görsel Düzenleyici, CMS, yapay zeka çevirisi, MCP sunucusu) istiyorsanız. Özellikle büyük, modüler Vue / Nuxt kod tabanları ve tasarım sistemleri için önemlidir.
- **`@intlayer/vue-i18n`'i seçin**: zaten `vue-i18n` üzerindeyseniz ve yeniden yazma olmadan bundle kazanımlarını istiyorsanız.

## İlgili karşılaştırmalar

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/next-intl_vs_intlayer.md) (aynı benchmark)
- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18next_vs_intlayer.md) (aynı benchmark)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/lingui_vs_intlayer.md) (aynı benchmark)
- [vue-i18n vs Intlayer (özellikler ve DX)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/vue-i18n_vs_intlayer.md)
- [vue-i18n eskidi mi?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/is_vue-i18n_outdated.md)

## GitHub Yıldızları

GitHub yıldızları, bir projenin popülerliğinin, topluluk güveninin ve uzun vadeli öneminin güçlü bir göstergesidir. Teknik kalitenin doğrudan bir ölçüsü olmasa da, kaç geliştiricinin projeyi yararlı bulduğunu, ilerlemesini takip ettiğini ve benimseme olasılığını yansıtır.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## Sonuç

`vue-i18n` olgun, esnek ve Vue ile derinden entegre. Benchmark, runtime öncelikli tasarımının bir Vite derlemesinde neye mal olduğunu gösteriyor: **24 KB gzip runtime**, i18n'siz 41 KB olan bir uygulama için **sayfa başına 134,9 KB**, her sayfada **%90 diğer sayfa içeriği** ve global mesaj ağacına bağlı oldukları için her biri **196 KB**'a ulaşan bileşenler.

Intlayer işi derleyiciye taşır. Bileşen başına sözlükler ve ölü içerik temizleme, birer derleme çıktısıdır, kural değil. Aynı uygulamada: **3,9 KB runtime**, **sayfa başına 57,1 KB**, **%0 sayfa sızıntısı**, **25 kat daha küçük** bileşenler. Ve yeniden yazma masada değilse, `@intlayer/vue-i18n` bileşenlere dokunmadan yolun büyük kısmını alır.

Tüm ham veriler, test uygulamaları ve script'ler [Benchmark Bloom deposunda](https://github.com/intlayer-org/benchmark-bloom). Kendiniz çalıştırın.

Daha fazla ayrıntı için ['Neden Intlayer?' dokümanına](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md) bakın.
