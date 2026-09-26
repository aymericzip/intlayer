---
createdAt: 2026-09-16
updatedAt: 2026-09-16
priority: 8
title: "2026'da Doğru Vue i18n Kütüphanesi Nasıl Seçilir"
description: Vue ve Nuxt uluslararasılaştırması için bir karar rehberi. vue-i18n, @nuxtjs/i18n, fluent-vue, Paraglide ve Intlayer'ı karşılaştırmadan önce yanıtlanması gereken sorular ve her seçimin bundle boyutu, typing ve SSR payload açısından maliyeti.
keywords:
  - vue i18n
  - vue uluslararasılaştırma
  - vue-i18n
  - nuxt i18n
  - fluent-vue
  - Paraglide
  - Intlayer
  - i18n kütüphane karşılaştırması
slugs:
  - blog
  - how-to-pick-vue-i18n-library
author: aymericzip
---

# Doğru Vue i18n kütüphanesi nasıl seçilir

"Vue i18n" hem genel bir terim hem de neredeyse herkesin yüklediği kütüphanenin adıdır. Bu durum aynı anda hem kullanışlı hem de yanıltıcıdır: `vue-i18n` iyi bir varsayılandır, ancak tek seçenek değildir ve seçimi yönlendirmesi gereken sorular (SSR var mı yok mu, kaç sayfa var, çevirileri kim yazıyor) `npm install` öncesinde nadiren sorulur.

Bu rehber önce bu soruları sorar, ardından sade Vite + Vue ve Nuxt için yanıtları uygun kütüphanelerle eşleştirir.

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## İçindekiler

<TOC/>

## Kütüphaneleri karşılaştırmadan önce yanıtlanması gereken altı soru

1. **Vite SPA mı yoksa Nuxt mı?** Bir SPA'da katalog maliyeti bir JS bundle problemidir. Nuxt'ta ise aynı zamanda bir HTML payload problemidir, çünkü mesajlar SSR durumuna serialize edilir ve hydrate edilir. Çoğu "vue-i18n yavaş" bildirimi bu nedenle Nuxt uygulamalarından gelir.
2. **Çevirileri kim yazıyor?** Geliştiriciler, bir TMS, ICU string'leri teslim eden bir ajans veya bir AI pipeline'ı. `vue-i18n` ICU değil, kendi pipe ile ayrılmış çoğul sözdizimini kullanır. String'ler dışarıdan geliyorsa bu önemlidir.
3. **Kaç dil ve sayfa var?** İki dil ve beş sayfa her şeyi tek seferde gönderebilir. On dil ve kırk route bunu yapamaz ve yükleme stratejisi ana maliyet haline gelir.
4. **Key'lerde type'lara ihtiyacınız var mı?** `createI18n`'e bir mesaj schema generic'i iletmediğiniz sürece `t("cart.totl")` `vue-i18n` içinde derlenir ve bu schema, lazy load edilen kataloglarla çakışır.
5. **İçerik ne barındırıyor?** Yalnızca UI etiketleri mi, yoksa markdown, cümle içi link'ler ve dil bazlı bloklar mı? Zengin içerik, `t()` fonksiyonunun string döndürmesinin hantallaştığı yerdir.
6. **CSP bir kısıtlama mı?** Varsayılan `vue-i18n` build'i mesajları tarayıcıda `new Function` ile derler. Yalnızca runtime build'leri build time sırasında ön derleme yapmak için `@intlify/unplugin-vue-i18n` gerektirir.

Yanıtları not edin. Aşağıdaki her şey bunlara atıfta bulunacaktır.

## Tek resimde genel manzara

Vue ekosisteminde React'e kıyasla daha az i18n kütüphanesi vardır ve bunlar farklı mimari dalgalardan gelir.

![History of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Runtime sözlükleri (2015 - 2019): vue-i18n, @nuxt/i18n">

`vue-i18n` 2015 yılında ortaya çıktı ve o zamandan beri varsayılan oldu. `@nuxt/i18n` bunu dil bazlı routing, SEO etiketleri ve dil başına lazy loading ile sarar. Mesajlar render fonksiyonlarına derlenir; unplugin eklerseniz build time'da, aksi takdirde tarayıcıda derlenir.

</Accordion>
<Accordion header="Alternatif formatlar (2020): fluent-vue">

Mozilla Fluent `.ftl` dosyaları, gramere duyarlı varyantlarla daha kullanıcı dostu bir mesaj sözdizimi getirdi. Key type'ları yoktur ve Vite eklentisi her dili her sayfaya yükler.

</Accordion>
<Accordion header="Compiler ve birlikte konumlandırılmış içerik (2024 - 2026): Paraglide, Intlayer">

Paraglide mesaj başına bir fonksiyon üretir ve bundler'ın geri kalanını tree-shake etmesine izin verir. Intlayer içeriği bileşen başına `.content.ts` dosyalarında tanımlar, type'lar üretir ve yalnızca bir route'un render ettiği içeriği sunar.

</Accordion>
</AccordionGroup>

[JavaScript i18n tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md) her dalgayı ayrıntılı olarak ele almaktadır.

## En önemli karar: içerik nerede yaşar ve ne zaman yüklenir

İki yapısal tercih, kurulumlar arasındaki bundle farkının çoğunu açıklar:

- **Merkezi veya scoped içerik.** Uygulama için tek bir `locales/en.json` veya bileşen başına bir tanımlama.
- **Statik veya dinamik import.** Başlangıçta her şey veya aktif dil (ve ideal olarak aktif route) talep üzerine getirilir.

Grafik, sayfa başına yaklaşık 30 KB metin içeren, 1 ila 10 dile çevrilmiş, 1 ila 10 sayfalık teorik bir uygulama için payload'u tahmin etmektedir.

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`vue-i18n` dinamik ekseni destekler: bir `import()` sonrasında `setLocaleMessage`, kimsenin okumadığı dokuz dili göndermeyi bıraktığınız anlamına gelir. Size sağlamadığı şey ise sayfa eksenidir. Bir dil kataloğu tek bir nesnedir ve onu yüklemek her sayfanın metnini yükler. Bir SPA'da bunu kimse fark etmez. Nuxt'ta, `@nuxtjs/i18n` ve ondan fazla sayfa ile her route diğer tüm route'ların string'lerini iki kez taşır: JS chunk'ında ve SSR payload'unda.

[Vue benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/vue.md) bunu "diğer route'lardan sızıntı" ve "diğer dillerden sızıntı" olarak ölçer. 3. soruya cevabınız "çok sayıda sayfa" ise, bu bölüm her türlü API tercihinden daha ağır basar. [Bileşen bazlı ve merkezi i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/per-component_vs_centralized_i18n.md) yazısı, aynı dengenin bakım tarafını ele alır.

## Adaylar

Kütüphane boyutları [Vue benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/vue.md) çalışmasından alınmıştır: 10 sayfalık, 10 dilli bir uygulamada, bundling, tree-shaking ve minification sonrasında boş bir bileşendeki plugin artı composable. İçerik ayrı olarak ölçülür.

| Kütüphane      | İçerik modeli                                                     | Tip güvenliği                   | Mesaj formatı                       | Route başına bölme      | Kütüphane boyutu                                    |
| :------------- | :---------------------------------------------------------------- | :------------------------------ | :---------------------------------- | :---------------------- | :-------------------------------------------------- |
| `vue-i18n`     | Dil başına merkezi kataloglar, isteğe bağlı SFC `<i18n>` blokları | 2/5 — Schema generic ile opt-in | Kendine ait (pipe)                  | Hayır                   | ~24.3 kB                                            |
| `@nuxtjs/i18n` | `vue-i18n` ile aynı, artı routing ve SEO etiketleri               | 2/5 — Aynı                      | Aynı                                | Hayır, sadece dile göre | ~24.3 kB                                            |
| `fluent-vue`   | `.ftl` dosyaları (Mozilla Fluent)                                 | 1/5 — Yok                       | Fluent                              | Hayır                   | ~29.7 kB                                            |
| Paraglide      | inlang projesi, üretilen fonksiyonlar                             | 3.5/5 — Üretilen                | Kendine ait                         | Tree-shaking ile        | Sıfıra yakın (kod tabanında üretilen kod sayesinde) |
| Intlayer       | Bileşen başına bir `.content.ts`                                  | 5/5 — Üretilen, varsayılan açık | Intlayer (+ ICU, i18next, vue-i18n) | Evet, bileşen bazlı     | ~3.9 kB                                             |

> Rakamlar benchmark sürümlerindeki anlık bir görüntüdür. Yalnızca boyuta göre karar vermeden önce kendi uygulamanızda çalıştırın.
> Tip güvenliği: 5/5; anahtarların, parametrelerin ve her locale'in, URL biçimlendirici ve yardımcılar (helpers) dahil olmak üzere manuel kurulum olmadan kontrol edildiği anlamına gelir.

Paraglide'ın sıfıra yakın kütüphane boyutu yapısı gereğidir: runtime repository'nizin içine üretilir, bu da her push öncesi yeniden üretim adımı ve üretilen dosyalarda merge conflict anlamına gelir. Intlayer `vite-intlayer`'a (veya Nuxt modülüne) ihtiyaç duyar, bu nedenle build adımı olmadan çalışamaz.

## Yanıtlarınızı bir kütüphaneyle eşleştirin

<AccordionGroup>
<Accordion header="Vite SPA, küçük ekip, az sayıda dil">

Composition modunda (`legacy: false`) `vue-i18n`, runtime-only build göndermek için `@intlify/unplugin-vue-i18n` ile birlikte. Dilleri `import()` ile lazy load edin. Bu, çoğu küçük uygulamayı kapsar ve topluluk yanıtları her yerdedir. SFC `<i18n>` blokları mesajları bileşenle birlikte konumlandırır, bu yardımcı olur; ancak bunların etrafındaki extraction ve TMS araçları JSON kataloglarına göre daha zayıftır, bu nedenle ekibin hangisini kullanacağına erkenden karar verin.

</Accordion>
<Accordion header="Dil bazlı routing, sitemap ve hreflang içeren Nuxt">

`@nuxtjs/i18n` size routing stratejisini, `hreflang` etiketlerini ve dil tespitini kod yazmadan sağlar; bu bile tek başına az sayfalı içerik siteleri için onu haklı çıkarır. Sınırı dil başına katalog yapısıdır: on civarı sayfayı geçtikten sonra SSR payload her route'un metnini taşır. Sizin durumunuz buysa, `vue-i18n`'i route bazlı mesajlarla manuel olarak bağlayın veya scoped içeriğe geçin. [Nuxt i18n yazısı](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/list_i18n_technologies/frameworks/nuxt.md) önce routing stratejisi seçimini ele alır.

</Accordion>
<Accordion header="Çeviriler bir TMS'den veya ICU teslim eden bir ajanstan geliyor">

`vue-i18n`'in çoğul sözdizimi (`"no item | one item | {count} items"`) ICU değildir ve taşınabilir değildir. Çevirmenlere bunun bildirilmesi gerekir ve bir TMS export'u bunu üretmez. Ya ilk katalog oluşmadan önce format üzerinde anlaşın ya da formatı sağlayıcınızla eşleşen bir kütüphane seçin. Intlayer'ın ICU desteği kısmidir, bu nedenle bugün ICU string'leri alıyorsanız bunu da bir engel olarak değerlendirin.

</Accordion>
<Accordion header="Büyük uygulama, çok sayıda route, bundle veya SSR payload bütçesi">

Build time'da derlenen scoped içeriği tercih edin. Paraglide buraya Vite üzerinde vadedildiği gibi çalışan tree-shaking ile ulaşır. Intlayer buraya bileşen başına tanımlamalarla ulaşır ve yalnızca route'un render ettiği içeriği sunar. `vue-i18n` ile mesajları elle route'a göre bölebilirsiniz, ancak hiçbir şey bunu zorlamaz ve global bir namespace import eden paylaşılan bir bileşen bunu sessizce bozar.

</Accordion>
<Accordion header="Type safety tartışılmaz bir gerekliliktir">

`vue-i18n`, `createI18n`'e bir schema generic geçilerek type'landırılabilir. Çalışır, ancak kataloglar lazy load edildiği anda bozulur, çünkü schema henüz orada olmayabilecek mesajları tanımlar. Bunu yönetmek istemiyorsanız, type'ları içerikten üretilen bir kütüphane seçin: Paraglide veya Intlayer. [Eksik çevirileri tespit etme](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/detecting_missing_translations.md) yazısı, her birinin build time sırasında neleri yakaladığını karşılaştırır.

</Accordion>
<Accordion header="İçerik UI etiketlerinden fazlasıdır">

Markdown sayfaları, ortasında `<RouterLink>` bulunan cümleler, dil bazlı bileşenler. `vue-i18n`, bileşen interpolasyonu için çalışan ancak ayrıntılı olan `<i18n-t>` bileşenine sahiptir. Intlayer'ın içerik node'ları doğrudan markdown, HTML ve iç içe nesneleri kabul eder, bu da uygulama içerik ağırlıklı olduğunda daha iyi uyum sağlar.

</Accordion>
<Accordion header="Çeviriler yapay zeka tarafından üretilecek">

Bu durumda merkezi JSON'ın varlığını haklı çıkaracak bir kullanıcısı kalmaz. Birlikte konumlandırılmış içerik ve eksik dilleri dolduran bir CLI en kısa yoldur. Intlayer'ın `fill` komutu kendi API anahtarınızla (OpenAI, Anthropic, Mistral, Gemini) çalışır ve yalnızca değişenleri yeniden çevirir.

</Accordion>
</AccordionGroup>

## Her kütüphanenin yetersiz kaldığı yönler

- **`vue-i18n`**: grubun en ağırı, kendine ait çoğul formatı, type'lar opt-in ve lazy loading ile kırılgandır, route başına scoping yoktur, kullanılmayan key'ler sessizce birikir. Vue 3 uygulamasında `legacy: true` bırakmak Vue 2 uyumluluk katmanını korur ve `useI18n()` type desteğini kaybettirir.
- **`@nuxtjs/i18n`**: yukarıdakilerin tümünü devralır ve bir düzine route aşıldığında SSR payload her sayfanın string'lerini taşır.
- **`fluent-vue`**: güzel mesaj sözdizimi, key type'ları yok ve Vite eklentisi tüm dillerdeki tüm içeriği her sayfaya yükler. Benchmark'taki en ağır kütüphanedir.
- **Paraglide**: repo'ya commit edilen üretilmiş dosyalar, her push öncesi yeniden üretim ve dil reaktif bir store yerine her mesaj çağrısında cookie veya storage'dan okunur, bu da dil değişiminde ek maliyet yaratır.
- **Intlayer**: zorunlu build eklentisi, daha küçük ekosistem, kısmi ICU desteği ve tasarım gereği codebase geneline yayılmış içerik, bu yüzden bir çevirmen için tek bir JSON export etmek araç gerektirir.

## Her seçeneğin kodda görünümü

Aynı bileşen, bir başlık ve çoğul içeren bir sepet özeti, her adayla yazılmıştır. İlginç olan kısım template değil, içeriğin nerede yaşadığı ve `vue-tsc`'nin bu konuda ne bildiğidir.

<Tabs defaultTab="vue-i18n">
  <Tab label="vue-i18n" value="vue-i18n">

  <Tabs group="locale">
  <Tab value="en" label="İngilizce">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "no item | one item | {count} items"
  }
}
```

  </Tab>
  <Tab value="fr" label="Fransızca">

```json fileName="src/locales/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "aucun article | un article | {count} articles"
  }
}
```

  </Tab>
  <Tab value="es" label="İspanyolca">

```json fileName="src/locales/es.json"
{
  "cart": {
    "title": "Tu carrito",
    "items": "ningún artículo | un artículo | {count} artículos"
  }
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{ count: number }>();
const { t } = useI18n();
</script>

<template>
  <section>
    <h2>{{ t("cart.title") }}</h2>
    <p>{{ t("cart.items", { count: props.count }, props.count) }}</p>
  </section>
</template>
```

Pipe ile ayrılmış çoğullar vue-i18n'in kendi formatıdır, ICU değildir. `createI18n`'e bir mesaj schema generic'i iletmediğiniz sürece `t` herhangi bir string'i kabul eder.

  </Tab>
  <Tab label="fluent-vue" value="fluent-vue">

  <Tabs group="locale">
  <Tab value="en" label="İngilizce">

```ftl fileName="src/locales/en.ftl"
cart-title = Your cart
cart-items = { $count ->
    [one] { $count } item
   *[other] { $count } items
}
```

  </Tab>
  <Tab value="fr" label="Fransızca">

```ftl fileName="src/locales/fr.ftl"
cart-title = Votre panier
cart-items = { $count ->
    [one] { $count } article
   *[other] { $count } articles
}
```

  </Tab>
  <Tab value="es" label="İspanyolca">

```ftl fileName="src/locales/es.ftl"
cart-title = Tu carrito
cart-items = { $count ->
    [one] { $count } artículo
   *[other] { $count } artículos
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useFluent } from "fluent-vue";

const props = defineProps<{ count: number }>();
const { $t } = useFluent();
</script>

<template>
  <section>
    <h2>{{ $t("cart-title") }}</h2>
    <p>{{ $t("cart-items", { count: props.count }) }}</p>
  </section>
</template>
```

Fluent sözdizimi çoğulları ve gramer varyantlarını iyi yönetir. Mesaj id'leri type tanımlanmamış string'lerdir ve Vite eklentisi her dili her sayfaya paketler.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="İngilizce">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="Fransızca">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="İspanyolca">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { m } from "../paraglide/messages.js";

const props = defineProps<{ count: number }>();
</script>

<template>
  <section>
    <h2>{{ m.cart_title() }}</h2>
    <p>{{ m.cart_items({ count: props.count }) }}</p>
  </section>
</template>
```

Her mesaj üretilmiş, type tanımlı bir fonksiyondur, bu nedenle eksik bir key bir import hatasıdır. `paraglide/` klasörü repo'nuza üretilir ve her değişiklikte yeniden üretilir.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      tr: "Sepetiniz",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: t({
      tr: plural({ one: "{{count}} ürün", other: "{{count}} ürün" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const props = defineProps<{ count: number }>();
const { title, items } = useIntlayer("cart-summary");
</script>

<template>
  <section>
    <h2><title /></h2>
    <p>{{ items(props.count) }}</p>
  </section>
</template>
```

Tüm diller bileşenin yanındaki tek bir dosyada. Type'lar build sırasında üretilir, bu sayede `title` otomatik tamamlanır ve bir yazım hatası `vue-tsc`'yi patlatır. `<title />` görsel editörün hedefleyebileceği bir node render eder; `{{ items(props.count) }}` düz string döndürür.

  </Tab>
</Tabs>

Halihazırda `vue-i18n` kullanıyor musunuz? [`@intlayer/vue-i18n` compat adaptörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/vue-i18n.md), paketi bundler düzeyinde alias'lar, böylece Intlayer içeriği sunarken `useI18n()`, `$t`, pipe çoğulları ve `v-t` çalışmaya devam eder. [Geçiş rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_vue-i18n_to_intlayer.md) sonrasında adaptörden çıkışı kapsar ve bir de [Nuxt'a özel rehber](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_nuxtjs_i18n_to_intlayer.md) bulunmaktadır.

## Karar vermeden önce

Bir özellik tablosu size bir kütüphanenin bugün ne yaptığını söyler. Bu maddeler ise onunla yaşamanın nasıl bir şey olacağını anlatır.

**Repository aktivitesini kontrol edin.**

Commit'ler, issue yanıt süresi ve son minor sürümün bu yıl çıkıp çıkmadığı. Bakımı yapılmayan sağlam bir tasarım, gerçekleşmeyi bekleyen bir migrasyondur.

**npm indirmelerine göre seçim yapmayın.**

En çok yüklenen kütüphane ilk çıkan kütüphanedir, 2026 Vue codebase'ine en uygun olan değil. İndirmeler uyumu değil, geçmişi ölçer.

![Tier list of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Bakımını üstlenen kişiye kimin ödeme yaptığını ve ne sattıklarını sorun.**

`vue-i18n`, `next-intl` ve `svelte-i18n` gibi Crowdin tarafından desteklenmektedir. `i18next`, Locize tarafından desteklenmektedir. Tolgee, Paraglide (inlang) ve Intlayer'ın her biri kendi platformunu işletmektedir. Geliri barındırılan çeviri olan bir sağlayıcının, araç zinciriniz içinde çeviriyi ücretsiz hale getirmek için pek bir nedeni yoktur. Intlayer, CLI aracılığıyla kendi API anahtarınızla yapay zeka çevirisi sunan ve self-host edebileceğiniz bir CMS sağlayan tek seçenektir.

**Yapay zeka ajanlarına hazır mı?**

Ajanlar i18n ile hâlâ zorlanıyor: dilleri unutuyorlar, key uyduruyorlar ve mesaj sözdizimlerini karıştırıyorlar. Kütüphane, ajanın içeriği listeleyebilmesi, doldurabilmesi ve test edebilmesi için [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md) veya bir [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md) sunuyor mu? Ve içerik yükleme varsayılan olarak optimize edilmiş mi, yoksa birinin her çeyrekte namespace'leri ve lazy import'ları gözden geçirmesi mi gerekiyor?

**Kutudan çıktığı gibi Type safety.**

"Ekstra yapılandırmayla type eklenebilir" değil, "temiz bir kurulumda yanlış bir key `tsc`'yi patlatır". Var olmayan bir key ile ve bir çevirisi eksik olan bir dilde ne olduğunu kontrol edin.

**Kullanılmayan içeriğin tespiti.**

Kataloglar yalnızca büyür. Intlayer'ın build işlemi kullanılmayan alanları temizler ve bunları loglar (`build.purge`). Paraglide buraya mimarisiyle ulaşır, çünkü çağrılmayan bir mesaj fonksiyonu tree-shake edilir. Diğer her şey temizliği size bırakır.

**Developer experience (Geliştirici deneyimi).**

İlk çevrilmiş string'e kadar kurulum süresi, hover sırasında çeviriyi gösteren ve tanımlamaya atlayan bir [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md) veya [VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md), doldurma, test etme ve push işlemleri için bir [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md), bileşenlerinizdeki sabit kodlanmış dizeleri çıkaran ve böylece her dizeyi anahtar anahtar yönetmenizi gerektirmeyen bir [derleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) veya çıkarıcı ve geliştirici olmayanların bir pull request olmadan içeriği düzenlemesinin bir yolu ([görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)).

## Sıkça Sorulan Sorular

<FAQ>

<Question title="vue-i18n 2026'da hâlâ doğru varsayılan mı?">

Çoğu Vue uygulaması için evet. Ekosistem en büyüğüdür, dokümantasyon kapsamlıdır ve maliyetler öngörülebilirdir: ağır bir runtime, özel bir çoğul formatı ve kendi başınıza inşa edip savunmanız gereken route bazlı scoping.

</Question>

<Question title="Nuxt'ta @nuxtjs/i18n mi kullanmalıyım yoksa vue-i18n'i elle mi bağlamalıyım?">

Routing yapınız sıra dışı değilse veya uygulamanız az sayıda sayfaya sahip değilse modülü kullanın. Elle bağlamak; dil route'larını, middleware'i, `hreflang`'i ve sitemap'i kendiniz yeniden oluşturmanız anlamına gelir ve bunlar göründüklerinden daha zahmetlidir.

</Question>

<Question title="Compiler tabanlı bir kütüphaneye ihtiyacım var mı?">

Yalnızca bundle boyutu, SSR payload'u, üretilen type'lar veya build time eksik key kontrolleri gerçek gereksinimler ise. [Compiler ve deklaratif i18n karşılaştırması](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/compiler_vs_declarative_i18n.md) yazısı, derleyicilerin size ne sağladığını ve nerelerde yanılabileceğini açıklar.

</Question>

<Question title="Kütüphane seçimi SEO'yu etkiler mi?">

Dolaylı olarak. Tarayıcı botları routing, `hreflang`, `<html lang>` ve metnin sunucu tarafından render edilen HTML içinde olup olmadığı ile ilgilenir. [hreflang rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/hreflang_guide_multilingual_seo.md) içeriğine göz atın.

</Question>

</FAQ>

## Daha fazlası

- [Vue i18n benchmark: bundle boyutu, sızıntı ve dil değiştirme süreleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/vue.md)
- [Vue i18n: vue-i18n nasıl çalışır ve nerede zorlar](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/list_i18n_technologies/frameworks/vue.md) ve [Nuxt i18n yazısı](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/list_i18n_technologies/frameworks/nuxt.md)
- [vue-i18n ve Intlayer karşılaştırması, özellik özellik](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/vue-i18n_vs_intlayer.md) ve [vue-i18n ve Intlayer benchmark karşılaştırması](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/vue-i18n_vs_intlayer_benchmark.md)
- [vue-i18n artık eskidi mi?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/is_vue-i18n_outdated.md)
- [JavaScript i18n tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md)
- [Compiler ve deklaratif i18n karşılaştırması](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/compiler_vs_declarative_i18n.md)
- [Bileşen bazlı ve merkezi i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/per-component_vs_centralized_i18n.md)
- [Vite + Vue uygulamasında i18n kurulumu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+vue.md) ve [Nuxt uygulamasında i18n kurulumu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nuxt.md)
- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/how_to_pick_react_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/how_to_pick_svelte_i18n_library.md) ve [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/how_to_pick_solid_i18n_library.md) için aynı rehber
