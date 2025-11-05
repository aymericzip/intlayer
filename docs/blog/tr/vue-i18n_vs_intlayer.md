---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: vue-i18n vs Intlayer
description: vue-i18n'i Intlayer ile Vue/Nuxt uygulamalarında uluslararasılaştırma (i18n) için karşılaştırın
keywords:
  - vue-i18n
  - Intlayer
  - Internationalization
  - i18n
  - Blog
  - Vue
  - Nuxt
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer
---

# vue-i18n VS Intlayer | Vue Uluslararasılaştırma (i18n)

Bu rehber, **Vue 3** (ve **Nuxt**) için iki popüler i18n seçeneğini karşılaştırır: **vue-i18n** ve **Intlayer**.
Modern Vue araçlarına (Vite, Composition API) odaklanıyoruz ve şunları değerlendiriyoruz:

1. **Mimari ve içerik organizasyonu**
2. **TypeScript ve güvenlik**
3. **Eksik çeviri işleme**
4. **Yönlendirme ve URL stratejisi**
5. **Performans ve yükleme davranışı**
6. **Geliştirici deneyimi (DX), araçlar ve bakım**
7. **SEO ve büyük proje ölçeklenebilirliği**

<TOC/>

> **tl;dr**: İkisi de Vue uygulamalarını yerelleştirebilir. **Bileşen kapsamlı içerik**, **katı TypeScript türleri**, **derleme zamanı eksik anahtar kontrolleri**, **ağaç sallanan sözlükler** ve **pil dahil yönlendirici/SEO yardımcıları** artı **Görsel Düzenleyici ve AI çevirileri** istiyorsanız, **Intlayer** daha kapsamlı, modern seçimdir.

---

## Yüksek düzey konumlandırma

- **vue-i18n** - Vue için de-facto i18n kütüphanesi. Esnek mesaj formatlaması (ICU tarzı), yerel mesajlar için SFC `<i18n>` blokları ve büyük bir ekosistem. Güvenlik ve büyük ölçekli bakım çoğunlukla sizin sorumluluğunuzdur.
- **Intlayer** - Vue/Vite/Nuxt için bileşen merkezli içerik modeli, **katı TS yazımı**, **derleme zamanı kontrolleri**, **ağaç sallama**, **yönlendirici ve SEO yardımcıları**, isteğe bağlı **Görsel Düzenleyici/CMS** ve **AI destekli çeviriler**.

---

## Yan Yana Özellik Karşılaştırması (Vue odaklı)

| Özellik                                                 | **Intlayer**                                                                                   | **vue-i18n**                                                                             |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Bileşenlere yakın çeviriler**                         | ✅ Evet, bileşen başına birlikte yerleştirilmiş içerik (örneğin, `MyComp.content.ts`)          | ✅ Evet, SFC `<i18n>` blokları aracılığıyla (isteğe bağlı)                               |
| **TypeScript entegrasyonu**                             | ✅ Gelişmiş, otomatik olarak oluşturulan **katı** türler ve anahtar otomatik tamamlama         | ✅ İyi yazımlar; **katı anahtar güvenliği ekstra kurulum/disiplin gerektirir**           |
| **Eksik çeviri algılama**                               | ✅ **Derleme zamanı** uyarılar/hatalar ve TS yüzeyleme                                         | ⚠️ Çalışma zamanı geri dönüşleri/uyarılar                                                |
| **Zengin içerik (bileşenler/Markdown)**                 | ✅ Zengin düğümler ve Markdown içerik dosyaları için doğrudan destek                           | ⚠️ Sınırlı (bileşenler `<i18n-t>` aracılığıyla, Markdown harici eklentiler aracılığıyla) |
| **AI destekli çeviri**                                  | ✅ Kendi AI sağlayıcı anahtarlarınızı kullanarak yerleşik iş akışları                          | ❌ Yerleşik değil                                                                        |
| **Görsel Düzenleyici / CMS**                            | ✅ Ücretsiz Görsel Düzenleyici ve isteğe bağlı CMS                                             | ❌ Yerleşik değil (harici platformları kullanın)                                         |
| **Yerelleştirilmiş yönlendirme**                        | ✅ Yerelleştirilmiş yollar, URL'ler ve `hreflang` oluşturmak için Vue Router/Nuxt yardımcıları | ⚠️ Çekirdek değil (Nuxt i18n veya özel Vue Router kurulumunu kullanın)                   |
| **Dinamik yol oluşturma**                               | ✅ Evet                                                                                        | ❌ Sağlanmadı (Nuxt i18n sağlar)                                                         |
| **Çoğullaştırma ve formatlama**                         | ✅ Numaralandırma desenleri; Intl tabanlı formatlayıcılar                                      | ✅ ICU tarzı mesajlar; Intl formatlayıcıları                                             |
| **İçerik formatları**                                   | ✅ `.ts`, `.js`, `.json`, `.md`, `.txt` (YAML WIP)                                             | ✅ `.json`, `.js` (artı SFC `<i18n>` blokları)                                           |
| **ICU desteği**                                         | ⚠️ WIP                                                                                         | ✅ Evet                                                                                  |
| **SEO yardımcıları (site haritası, robots, meta veri)** | ✅ Yerleşik yardımcılar (çerçeve agnostik)                                                     | ❌ Çekirdek değil (Nuxt i18n/topluluk)                                                   |
| **SSR/SSG**                                             | ✅ Vue SSR ve Nuxt ile çalışır; statik oluşturmayı engellemez                                  | ✅ Vue SSR/Nuxt ile çalışır                                                              |
| **Ağaç sallama (yalnızca kullanılan içeriği gönder)**   | ✅ Derleme zamanında bileşen başına                                                            | ⚠️ Kısmi; manuel kod bölme/zaman uyumsuz mesajlar gerektirir                             |
| **Tembel yükleme**                                      | ✅ Yerel / sözlük başına                                                                       | ✅ Zaman uyumsuz yerel mesajlar desteklenir                                              |
| **Kullanılmayan içeriği temizle**                       | ✅ Evet (derleme zamanı)                                                                       | ❌ Yerleşik değil                                                                        |
| **Büyük proje bakımı**                                  | ✅ Modüler teşvik eder, tasarım sistemi dostu yapı                                             | ✅ Olası, ancak güçlü dosya/ad alanı disiplini gerektirir                                |
| **Ekosistem / topluluk**                                | ⚠️ Daha küçük ama hızlı büyüyen                                                                | ✅ Vue ekosisteminde büyük ve olgun                                                      |

---

## Derinlemesine karşılaştırma

### 1) Mimari ve ölçeklenebilirlik

- **vue-i18n**: Ortak kurulumlar yerel başına **merkezi kataloglar** kullanır (isteğe bağlı olarak dosyalara/ad alanlarına bölünür). SFC `<i18n>` blokları yerel mesajlara izin verir ancak ekipler projeler büyüdükçe paylaşılan kataloglara geri döner.
- **Intlayer**: Hizmet ettikleri bileşenle birlikte **bileşen başına sözlükleri** teşvik eder. Bu, ekip arası çatışmaları azaltır, içeriği keşfedilebilir tutar ve doğal olarak kayma/kullanılmayan anahtarları sınırlandırır.

**Neden önemli:** Büyük Vue uygulamalarında veya tasarım sistemlerinde, **modüler içerik** monolitik kataloglardan daha iyi ölçeklenir.

---

### 2) TypeScript ve güvenlik

- **vue-i18n**: İyi TS desteği; **katı anahtar yazımı** genellikle özel şemalar/genel türler ve dikkatli kurallar gerektirir.
- **Intlayer**: İçeriğinizden **katı türler oluşturur**, **IDE otomatik tamamlama** ve yazım/eksik anahtarlar için **derleme zamanı hataları** sağlar.

**Neden önemli:** Güçlü yazım, sorunları **çalışma zamanından önce** yakalar.

---

### 3) Eksik çeviri işleme

- **vue-i18n**: **Çalışma zamanı** uyarılar/geri dönüşler (örneğin, yerel veya anahtara geri dön).
- **Intlayer**: Yerel ve anahtarlar genelinde **derleme zamanı** algılama ile uyarılar/hatalar.

**Neden önemli:** Derleme zamanı uygulaması, üretim UI'sini temiz ve tutarlı tutar.

---

### 4) Yönlendirme ve URL stratejisi (Vue Router/Nuxt)

- **İkisi de** yerelleştirilmiş yollarla çalışabilir.
- **Intlayer**, **yerelleştirilmiş yollar oluşturmak**, **yerel önekleri yönetmek** ve SEO için **`<link rel="alternate" hreflang>`** yaymak için yardımcılar sağlar. Nuxt ile, çerçevenin yönlendirmesini tamamlar.

**Neden önemli:** Daha az özel yapıştırıcı katman ve yerel genelinde **daha temiz SEO**.

---

### 5) Performans ve yükleme davranışı

- **vue-i18n**: Zaman uyumsuz yerel mesajları destekler; aşırı paketlemeyi önlemek sizin sorumluluğunuzdur (katalogları dikkatlice bölün).
- **Intlayer**: **Derleme zamanında ağaç sallar** ve **sözlük/yere göre tembel yükler**. Kullanılmayan içerik gönderilmez.

**Neden önemli:** Çok yerel Vue uygulamaları için daha küçük paketler ve daha hızlı başlatma.

---

### 6) Geliştirici deneyimi ve araçlar

- **vue-i18n**: Olgun dokümantasyon ve topluluk; genellikle düzenleme iş akışları için **harici yerelleştirme platformlarına** güveneceksiniz.
- **Intlayer**: **Ücretsiz Görsel Düzenleyici**, isteğe bağlı **CMS** (Git dostu veya dışa aktarılmış), **VSCode uzantısı**, **CLI/CI** yardımcıları ve kendi sağlayıcı anahtarlarınızı kullanarak **AI destekli çeviriler** gönderir.

**Neden önemli:** Daha düşük operasyon maliyeti ve geliştiriciler ile içerik yazarları arasındaki döngüyü kısaltır.

---

### 7) SEO, SSR ve SSG

- **İkisi de** Vue SSR ve Nuxt ile çalışır.
- **Intlayer**: Vue/Nuxt yapılarıyla iyi uyumlu, çerçeve agnostik **SEO yardımcıları** (site haritaları/meta veri/`hreflang`) ekler.

**Neden önemli:** Özel kablolama olmadan uluslararası SEO.

---

## Neden Intlayer? (Sorun ve yaklaşım)

Çoğu i18n yığını (**vue-i18n** dahil) **merkezi kataloglardan** başlar:

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
└── src
    └── components
        └── MyComponent.vue
```

Veya yerel klasörlerle:

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
└── src
    └── components
        └── MyComponent.vue
```

Bu, uygulamalar büyüdükçe geliştirmeyi yavaşlatır:

1. **Yeni bir bileşen için** uzak katalogları oluştur/düzenle, ad alanlarını bağla ve çevir (genellikle AI araçlarından manuel kopyala/yapıştır ile).
2. **Bileşenleri değiştirirken** paylaşılan anahtarları avla, çevir, yerel'leri senkronize tut, ölü anahtarları kaldır ve JSON yapılarını hizala.

**Intlayer**, içeriği **bileşen başına** kapsüller ve onu **kodun yanında** tutar, zaten CSS, hikayeler, testler ve dokümantasyonla yaptığımız gibi:

```bash
.
└── components
    └── MyComponent
        ├── MyComponent.content.ts
        └── MyComponent.vue
```

**İçerik beyanı** (bileşen başına):

```ts fileName="./components/MyComponent/MyComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    greeting: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

**Vue'da kullanım** (Composition API):

```vue fileName="./components/MyComponent/MyComponent.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer"; // Vue entegrasyonu
const { greeting } = useIntlayer("component-example");
</script>

<template>
  <span>{{ greeting }}</span>
</template>
```

Bu yaklaşım:

- **Geliştirmeyi hızlandırır** (bir kez beyan et; IDE/AI otomatik tamamlar).
- **Kod tabanını temizler** (1 bileşen = 1 sözlük).
- **Çoğaltmayı/migrasyonu kolaylaştırır** (bir bileşeni ve içeriğini birlikte kopyala).
- **Ölü anahtarları önler** (kullanılmayan bileşenler içerik içe aktarmaz).
- **Yüklemeyi optimize eder** (tembel yüklenen bileşenler içeriklerini yanlarında getirir).

---

## Intlayer'ın ek özellikleri (Vue ilgili)

- **Çapraz çerçeve desteği**: Vue, Nuxt, Vite, React, Express vb. ile çalışır.
- **JavaScript destekli içerik yönetimi**: Tam esneklikle kodda beyan et.
- **Yerel başına beyan dosyası**: Tüm yerel'leri tohumla ve geri kalanını araçların oluşturmasına izin ver.
- **Tip güvenli ortam**: Otomatik tamamlama ile güçlü TS yapılandırması.
- **Basitleştirilmiş içerik alma**: Bir sözlük için tüm içeriği almak için tek bir hook/composable.
- **Düzenlenmiş kod tabanı**: Aynı klasörde 1 bileşen = 1 sözlük.
- **Gelişmiş yönlendirme**: **Vue Router/Nuxt** yerelleştirilmiş yolları ve meta veri için yardımcılar.
- **Markdown desteği**: Yerel başına uzak/yerel Markdown içe aktar; frontmatter'ı koda göster.
- **Ücretsiz Görsel Düzenleyici ve isteğe bağlı CMS**: Ücretli yerelleştirme platformu olmadan yazma; Git dostu senk.
- **Ağaç sallanabilir içerik**: Yalnızca kullanılanı gönderir; tembel yüklemeyi destekler.
- **Statik oluşturma dostu**: SSG'yi engellemez.
- **AI destekli çeviriler**: Kendi AI sağlayıcı/API anahtarınızı kullanarak 231 dile çevirin.
- **MCP sunucusu ve VSCode uzantısı**: IDE'nizde i18n iş akışlarını ve yazmayı otomatikleştirin.
- **Birlikte çalışabilirlik**: Gerektiğinde **vue-i18n**, **react-i18next** ve **react-intl** ile köprü kurar.

---

## Hangisini ne zaman seçmeli?

- **vue-i18n**'i seçin eğer **standart Vue yaklaşımını** istiyorsanız, katalogları/ad alanlarını kendiniz yönetmekle rahatınız ve uygulamanız **küçük ila orta boy**.
- **Intlayer**'ı seçin eğer **bileşen kapsamlı içerik**, **katı TypeScript**, **derleme zamanı garantileri**, **ağaç sallama** ve **pil dahil yönlendirme/SEO/düzenleyici araçlarını** takdir ediyorsanız - özellikle **büyük, modüler Vue/Nuxt kod tabanları**, tasarım sistemleri vb. için.

---

## vue-i18n ile birlikte çalışabilirlik

`intlayer`, `vue-i18n` ad alanlarınızı yönetmenize de yardımcı olabilir.

`intlayer` kullanarak, içeriğinizi favori i18n kütüphanenizin formatında beyan edebilirsiniz ve intlayer ad alanlarınızı istediğiniz konumda oluşturacaktır (örnek: `/messages/{{locale}}/{{namespace}}.json`).

Daha fazla detay için [`dictionaryOutput` ve `i18nextResourcesDir` seçeneklerine](https://intlayer.org/doc/concept/configuration#content-configuration) bakın.

---

## GitHub YILDIZLARI

GitHub yıldızları, bir projenin popülaritesinin, topluluk güveninin ve uzun vadeli öneminin güçlü bir göstergesidir. Teknik kalitenin doğrudan bir ölçüsü olmasa da, kaç geliştiricinin projeyi yararlı bulduğunu, ilerlemesini takip ettiğini ve muhtemelen benimsediğini yansıtır. Bir projenin değerini tahmin etmek için yıldızlar, alternatifler arasındaki çekişmeyi karşılaştırmaya ve ekosistem büyümesine ilişkin içgörüler sağlamaya yardımcı olur.

[![Yıldız Geçmişi Grafiği](https://api.star-history.com/svg?repos=intlify/vue-i18n&repos=aymericzip/intlayer&type=Date)](https://www.star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

---

## Sonuç

Hem **vue-i18n** hem de **Intlayer** Vue uygulamalarını iyi yerelleştirir. Fark, sağlam, ölçeklenebilir bir kurulum elde etmek için **ne kadar kendiniz inşa etmeniz gerektiğidir**:

- **Intlayer** ile, **modüler içerik**, **katı TS**, **derleme zamanı güvenliği**, **ağaç sallanan paketler** ve **yönlendirici/SEO/düzenleyici araçları** **kutudan çıkar**.
- Ekibiniz çok yerel, bileşen odaklı bir Vue/Nuxt uygulamasında **bakım ve hızı** takdir ediyorsa, Intlayer bugün **en kapsamlı** deneyimi sunar.

Daha fazla detay için ['Neden Intlayer?' dokümantasyonuna](https://intlayer.org/doc/why) bakın.
