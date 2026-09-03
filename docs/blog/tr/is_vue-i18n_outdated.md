---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: vue-i18n 2026'da Güncelliğini Yitirdi mi?
description: vue-i18n on yıl boyunca Vue ve Nuxt uygulamalarının standardı oldu. Fakat benchmarklarımızda web üzerindeki en ağır i18n çalışma zamanı çıktı. İşte nedenleri.
keywords:
  - vue-i18n
  - Intlayer
  - Uluslararasılaştırma
  - i18n
  - Vue
  - Nuxt
  - Paket boyutu
  - Blog
slugs:
  - blog
  - is-vue-i18n-outdated
author: aymericzip
---

# vue-i18n 2026'da Güncelliğini Yitirdi mi?

Vue topluluğunda `vue-i18n` kadar geniş kabul görmüş çok az kütüphane vardır. Vue 2 döneminden bu yana Kazupon tarafından sürdürülen bu araç, `@nuxtjs/i18n` paketine altyapı sağlar ve çok dilli Vue projelerinin varsayılan seçeneğidir.

Buna rağmen 2026 benchmark testlerimiz çarpıcı bir gerçeği ortaya çıkardı: **`vue-i18n`, test edilen tüm frontend frameworkleri arasında en ağır yerelleştirme çalışma zamanı oldu.**

Vite + Vue ile oluşturulan 31.5 KB boyutundaki yalın bir tabana `vue-i18n` eklendiğinde, sayfa başına düşen ortalama JavaScript miktarı **136.4 KB** seviyesine fırlayarak dört katından fazla büyüdü.

Hafifliğiyle tanınan bir framework nasıl oldu da bu denli ağır bir i18n yapısına ulaştı? Ve klasik çalışma zamanı modeli günümüzde halen geçerli mi?

<TOC/>

## Öne Çıkanlar

**Test edilen en ağır çalışma zamanı:**

Metin eklenmeden önce **24.3 KB gzipped (83.2 KB minified)** olan boyutuyla `vue-i18n`, `intlayer`'ın 2.7 KB'lık çalışma zamanından yaklaşık **9 kat daha ağırdır**.

**Sayfa yükünde %330 artış:**

`vue-i18n`, 31.5 KB boyutundaki başlangıç sayfasını 136.4 KB'a çıkardı. Intlayer ise 59.3 KB üreterek **%56 daha az sayfa yükü** sağladı.

**Tarayıcıda saklanan derleyici:**

Paketleyicide özel alias tanımlanmadığı sürece `vue-i18n`, metinleri çalışma anında ayrıştırmak için istemciye tam bir mesaj derleyicisi gönderir.

**Bakım sıklığı:**

Geçtiğimiz yıl boyunca `vue-i18n` yaklaşık 259 commit aldı; bunlar hata çözümleri ve Vue sürümleriyle uyum üzerine yoğunlaştı.

**Modern araç eksikliği:**

Language Server (LSP), yapay zeka MCP sunucuları veya komut satırı çeviri süreçleri için resmi yerleşik destek bulunmuyor.

## Bakım vs. Modern Araçlar

| Depo                  | Yıldızlar                                                                                                                                              | Toplam commit                                                                                                                                                       | Yıllık commit                                                                                                                                                      | Son commit                                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlify/vue-i18n`    | [![stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/intlify/vue-i18n?style=for-the-badge&label=%2Fyear)](https://github.com/intlify/vue-i18n/commits)       | [![last](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

Son on iki ay:

- `intlify/vue-i18n`: **259 commit** (Vue 3 ve Nuxt için periyodik bakım).
- `aymericzip/intlayer`: **4.343 commit** (derleyici optimizasyonları, LSP araçları ve yapay zeka entegrasyonları).

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

Köklü bir kütüphane istikrar sağlar. Fakat günümüz web mimarisi derleme anında AST dönüşümleri, ölü kod temizliği ve yapay zeka destekli yerelleştirme kullanır. Yalnızca çalışma zamanında çalışan bir sistemin bu yenilikleri benimsemesi zordur.

## Vite + Vue Performans Sonuçları

Vite ve Vue 3 ile kurulan 10 sayfalık ve 10 dilli bir yapıda ölçülmüştür:

<I18nBenchmark framework="vite-vue" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Gerçek tarayıcı ortamlarında gzip sıkıştırmasıyla test edilmiştir. Verilerin tamamı [Vue benchmark dokümantasyonunda](https://intlayer.org/tr/doc/benchmark/vue).

### Temel Kütüphane Yükü

Çeviri metinleri eklenmeden önceki ilk ağırlık:

| Kütüphane         | Gzipped    | Minified   |
| ----------------- | ---------- | ---------- |
| `vue-i18n@11.4.0` | 24.3 KB    | 83.2 KB    |
| `intlayer@8.7.12` | **2.7 KB** | **7.6 KB** |

Sırf `vue-i18n` çalışma zamanı **24.3 KB gzipped** yer kaplar, bu da neredeyse Vue'nun kendi çekirdeğine denktir. Intlayer ise yalnızca **2.7 KB** ekler.

### Sayfa Ağırlığı ve Veri Sızıntısı

| Kurulum          | Ort. sayfa JS (gz) | Dil sızıntısı | Diğer sayfa sızıntısı | Ort. bileşen (gz) |
| ---------------- | ------------------ | ------------- | --------------------- | ----------------- |
| Temel (i18n yok) | 31.5 KB            | 0.0%          | 90.0%                 | 0.9 KB            |
| `vue-i18n`       | **136.4 KB**       | 50.2%         | 90.0%                 | 196.0 KB          |
| Intlayer         | **59.3 KB**        | 51.1%         | **0.0%**              | **6.5 KB**        |

### Önemli Gözlemler

**Ciddi oransal şişkinlik:**

Vue tabanı son derece hafif (~31 KB) olduğundan, `vue-i18n` sayfa boyutunu dört katından fazlasına çıkarır.

**Diğer sayfalara veri sızıntısı:**

Varsayılan ayarlarda bir rotaya gönderilen **çevirilerin %90'ı** diğer sayfalara aittir. Intlayer bu gereksiz yükü tamamen ayıklayarak **%0.0'a** indirir.

**Tekil bileşen boyutu:**

Yerel kapsamda derlenen bileşenler, sözlüklerin tekrar etmesi sebebiyle `vue-i18n` ile ortalama 196 KB tutarken, Intlayer'da bu değer **6.5 KB** olmuştur.

## vue-i18n Neden Ağır?

### Tarayıcıya Taşınan AST Derleyicisi

`vue-i18n` kendi mesaj formatı derleyicisini barındırır. Çoğul kuralları ve değişkenler çalışma zamanında Abstract Syntax Tree (AST) yapılarına dönüştürülür.

Bunun önüne geçmek için bundler konfigürasyonunda `vue-i18n/dist/vue-i18n.runtime.esm-bundler.js` adresine alias yönlendirmesi yapmak ve dosyaları `@intlify/unplugin-vue-i18n` ile önceden derlemek zorunludur. Çoğu proje bu ayarı gözden kaçırır.

### Monolitik Özellik Yapısı

`vue-i18n`, sayı ve tarih motorları, bağlantılı mesajlar, Options API köprüleri (`$t`, `v-t`) ve reaktif vekiller içerir. `<script setup>` içinde sadece yalın metinler çevirmek isteseniz dahi tüm mekanizmayı yüklersiniz.

### Dinamik Anahtarlar Tree-Shaking'i Önler

`"home.hero.title"` çalışma anında yorumlandığı için derleyiciler hangi metinlerin kullanıldığını anlayamaz. Kullanılmayan çeviriler pakette yer kaplamaya devam eder.

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("home.hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

[Intlayer derleyicisi](https://intlayer.org/tr/doc/compiler) kullanılan özellikleri tam olarak belirler ve istemci paketini oluşturmadan önce gereksiz verileri ayıklar. Detaylar için [paket optimizasyonu](https://intlayer.org/tr/doc/concept/bundle-optimization) sayfasına bakın.

## Geliştirici Deneyimi

### Dağınık Kataloglar vs. Birlikte Konumlandırma

`vue-i18n` yapısında metinler ayrı bir `locales/` dizinindedir. Intlayer ise içerik dosyalarını bileşenlerin hemen yanı başında tutar:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="locales/en.json"
{
  "hero": {
    "title": "Ship in every language"
  }
}
```

```json fileName="locales/tr.json"
{
  "hero": {
    "title": "Her dilde yayına alın"
  }
}
```

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      en: "Ship in every language",
      tr: "Her dilde yayına alın",
    }),
  },
} satisfies Dictionary;
```

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

`Hero.vue` silindiğinde veya taşındığında, içerik dosyası da onunla birlikte işlem görür.

### Otomatik Tamamlama vs. Kesin Eksiksizlik

`DefineLocaleMessage` temel şemaya göre editörde ipuçları sağlar. Ancak tüm dillerin eksiksiz olduğunu garanti etmez. `tr.json` içinden bir anahtarı silmeniz derleme esnasında hata oluşturmaz.

Intlayer ile sözlükler titizlikle kontrol edilir. [`strictMode`](https://intlayer.org/tr/doc/concept/configuration) ayarı açıldığında eksik bir çeviri doğrudan build hatasına dönüşür.

### Geliştirici ve Yapay Zeka Araçları

| Özellik                     | `vue-i18n`               | Intlayer                                                                 |
| --------------------------- | ------------------------ | ------------------------------------------------------------------------ |
| **VS Code Eklentisi**       | Üçüncü taraf (i18n Ally) | ✅ [Resmi eklenti](https://intlayer.org/tr/doc/vs-code-extension)        |
| **Language Server (LSP)**   | ❌ Yok                   | ✅ [Özel LSP](https://intlayer.org/tr/doc/lsp)                           |
| **Yapay Zeka MCP Sunucusu** | ❌ Yok                   | ✅ [Entegre MCP sunucusu](https://intlayer.org/tr/doc/mcp-server)        |
| **Ajan Becerileri**         | ❌ Yok                   | ✅ [Kullanıma hazır beceriler](https://intlayer.org/tr/doc/agent_skills) |
| **Görsel CMS**              | ❌ Yok                   | ✅ [Ücretsiz ve Açık Kaynak](https://intlayer.org/tr/doc/concept/editor) |

## Çeviri Süreçleri

`vue-i18n` yerleşik bir çeviri komutuna sahip değildir. Dosyalar genelde Crowdin veya Phrase gibi dış platformlara aktarılır.

Intlayer bu araçları standart olarak sunar:

**Yerel Yapay Zeka ile Doldurma (`intlayer fill`):**

Eksik anahtarları kendi OpenAI, Anthropic, Mistral veya Gemini anahtarlarınızla tamamlar.

**Kendi Altyapınızda Barındırılabilir Görsel CMS:**

[Intlayer CMS](https://intlayer.org/tr/doc/concept/cms) ile teknik olmayan ekip üyelerinin doğrudan Git'e yansıyacak şekilde metin düzenlemesini sağlayın.

**Açık Kaynak Lisansı:**

Tüm araç seti Apache 2.0 lisansına sahiptir.

## vue-i18n Hangi Koşullarda Halen Uygundur?

<AccordionGroup>
<Accordion header="Mevcut Nuxt 2/3 Uygulamaları">

Sayfa rotalarınız `@nuxtjs/i18n` ile derinden bütünleşmişse, yapıyı değiştirmek her zaman şart değildir.

</Accordion>
<Accordion header="Özel ICU Biçimlendirmeleri">

Zincirleme mesajlar veya çok özel tarih ve çoğul kuralları kullanıyorsanız.

</Accordion>
<Accordion header="Küçük Hobi Projeleri">

Paket boyutunun kullanıcı deneyimini doğrudan etkilemediği senaryolarda.

</Accordion>
</AccordionGroup>

## Mevcut vue-i18n Yapılandırmamı Nasıl Geliştirebilirim?

Intlayer, `vue-i18n` ve `@nuxtjs/i18n` kütüphanelerinin fonksiyon imzalarını (`useI18n`, `$t`, `<i18n-t>`) birebir koruyan doğrudan uyumluluk paketleri sunar. Hafif ve derleyici odaklı bir mimarinin avantajlarından faydalanmak için şablonlarınızı veya composable yapılarınızı sıfırdan yazmanız gerekmez.

Kurulum tek bir komutla tamamlanır:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

Bu etkileşimli CLI aracı:

1. `@intlayer/vue-i18n` veya `@intlayer/nuxt-i18n` uyumluluk paketini yükler.
2. Vite veya Nuxt paketleyici takma adlarını (alias) yapılandırarak mevcut import'larınızın ve şablon etiketlerinizin doğrudan Intlayer'a yönlendirilmesini sağlar; böylece `vue-i18n` kütüphanesini `package.json` dosyasından kaldırabilirsiniz.
3. Editörde Dil Sunucusu (LSP) teşhislerini hemen aktif hale getirir, 24 KB'lık AST ayrıştırıcısını istemci paketinden tamamen çıkarır ve kapsamlı bir kod düzenlemesi gerekmeden yerel yapay zeka çeviri süreçlerini kullanıma sunar.

Ayrıntılı adımlar için hazırladığımız kılavuzları inceleyin:

- **Kolay Uyumluluk:** [`vue-i18n` uyumluluk katmanı](https://intlayer.org/tr/doc/compatibility/vue-i18n) veya [`@nuxtjs/i18n`](https://intlayer.org/tr/doc/compatibility/nuxtjs-i18n) ile mevcut şablonlarınızı koruyun.
- **Rehberli Geçiş:** JSON dosyalarınızı kılavuzlarımız yardımıyla dönüştürün: [vue-i18n üzerinden](https://intlayer.org/tr/doc/migration/vue-i18n) veya [@nuxtjs/i18n üzerinden](https://intlayer.org/tr/doc/migration/nuxtjs-i18n).
- **Hibrit Düzen:** Arayüzde `vue-i18n` çalıştırmaya devam ederken, tip güvenliği ve yerel yapay zeka çevirisi için [Intlayer'ı vue-i18n ile birleştirin](https://intlayer.org/tr/blog/intlayer-with-vue-i18n).

Uygulamanızı ücretsiz [i18n SEO Tarayıcısı](https://intlayer.org/i18n-seo-scanner) ile analiz edin:

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## İlgili Makaleler

- [Vue & Vite i18n Benchmark: Kapsamlı Değerlendirme](https://intlayer.org/tr/doc/benchmark/vue)
- [vue-i18n vs Intlayer Karşılaştırması](https://intlayer.org/tr/blog/vue-i18n-vs-intlayer)
- [next-intl 2026'da Güncelliğini Yitirdi mi?](https://intlayer.org/tr/blog/is-next-intl-outdated)
- [Derleyici Odaklı vs Bildirime Dayalı i18n Mimarisi](https://intlayer.org/tr/blog/compiler-vs-declarative-i18n)
