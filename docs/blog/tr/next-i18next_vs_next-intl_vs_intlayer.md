---
createdAt: 2025-09-07
updatedAt: 2026-05-31
title: "next-i18next vs next-intl vs Intlayer - Eksiksiz çeviri rehberi: next-i18next vs next-intl vs Intlayer: 2026 Comparison"
description: Bundle boyutu, SEO, performans ve sürdürülebilirlik için en iyi çözüm. Next.js web sitesini'ınızı 2026'da çok dilli yapın, LLM çevirisi, Agent Skills & MCP.
keywords:
  - next-intl
  - next-i18next
  - Intlayer
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - next-i18next-vs-next-intl-vs-intlayer
author: aymericzip
---

# next-i18next VS next-intl VS intlayer | Next.js Uluslararasılaştırma (i18n)

![next-i18next VS next-intl VS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.png?raw=true)

Bu rehber, **Next.js** için yaygın olarak kullanılan üç i18n seçeneğini karşılaştırır: **next-intl**, **next-i18next** ve **Intlayer**.
**Next.js 13+ App Router**'a (React Server Components ile) odaklanıyoruz ve şunları değerlendiriyoruz:

1. **Mimari ve içerik organizasyonu**
2. **TypeScript ve güvenlik**
3. **Eksik çeviri işleme**
4. **Yönlendirme ve ara yazılım**
5. **Performans ve yükleme davranışı**
6. **Geliştirici deneyimi (DX), araçlar ve bakım**
7. **SEO ve büyük proje ölçeklenebilirliği**

<TOC/>

> **tl;dr**: Üçü de bir Next.js uygulamasını yerelleştirebilir. **Bileşen kapsamlı içerik**, **katı TypeScript türleri**, **derleme zamanı eksik anahtar kontrolleri**, **ağaç sallanan sözlükler** ve **birinci sınıf App Router + SEO yardımcıları** istiyorsanız, **Intlayer** en kapsamlı, modern seçimdir.

---

## Yüksek düzey konumlandırma

- **next-intl** - Hafif, doğrudan mesaj formatlaması ile sağlam Next.js desteği. Merkezi kataloglar yaygındır; DX basittir, ancak güvenlik ve büyük ölçekli bakım çoğunlukla sizin sorumluluğunuzdur.
- **next-i18next** - Next.js'te i18next. Eklentiler aracılığıyla olgun ekosistem ve özellikler (örneğin, ICU), ancak yapılandırma ayrıntılı olabilir ve kataloglar projeler büyüdükçe merkezi olmaya eğilimlidir.
- **Intlayer** - Next.js için bileşen merkezli içerik modeli, **katı TS yazımı**, **derleme zamanı kontrolleri**, **ağaç sallama**, **yerleşik ara yazılım ve SEO yardımcıları**, isteğe bağlı **Görsel Düzenleyici/CMS** ve **AI destekli çeviriler**.

---

## Yan Yana Özellik Karşılaştırması (Next.js odaklı)

| Özellik                                              | `next-intlayer` (Intlayer)                                                                                                                                      | `next-intl`                                                                                                          | `next-i18next`                                                                                                       |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Bileşenlere Yakın Çeviriler**                      | ✅ Evet, içerik her bileşenle birlikte yerleştirilir                                                                                                            | ❌ Hayır                                                                                                             | ❌ Hayır                                                                                                             |
| **TypeScript Entegrasyonu**                          | ✅ Gelişmiş, otomatik olarak oluşturulan katı türler                                                                                                            | ✅ İyi                                                                                                               | ⚠️ Temel                                                                                                             |
| **Eksik Çeviri Algılama**                            | ✅ TypeScript hata vurgulaması ve derleme zamanı hata/uyarı                                                                                                     | ⚠️ Çalışma zamanı geri dönüşü                                                                                        | ⚠️ Çalışma zamanı geri dönüşü                                                                                        |
| **Zengin İçerik (JSX/Markdown/bileşenler)**          | ✅ Doğrudan destek                                                                                                                                              | ❌ Zengin düğümler için tasarlanmamış                                                                                | ⚠️ Sınırlı                                                                                                           |
| **AI destekli Çeviri**                               | ✅ Evet, birden fazla AI sağlayıcısını destekler. Kendi API anahtarlarınızı kullanarak kullanılabilir. Uygulamanızın bağlamını ve içerik kapsamını dikkate alır | ❌ Hayır                                                                                                             | ❌ Hayır                                                                                                             |
| **Görsel Düzenleyici**                               | ✅ Evet, yerel Görsel Düzenleyici + isteğe bağlı CMS; kod tabanı içeriğini dışa aktarabilir; gömülebilir                                                        | ❌ Hayır / harici yerelleştirme platformları aracılığıyla mevcut                                                     | ❌ Hayır / harici yerelleştirme platformları aracılığıyla mevcut                                                     |
| **Yerelleştirilmiş Yönlendirme**                     | ✅ Evet, kutudan çıkar çıkmaz yerelleştirilmiş yolları destekler (Next.js ve Vite ile çalışır)                                                                  | ✅ Yerleşik, App Router `[locale]` segmentini destekler                                                              | ✅ Yerleşik                                                                                                          |
| **Dinamik Yol Oluşturma**                            | ✅ Evet                                                                                                                                                         | ✅ Evet                                                                                                              | ✅ Evet                                                                                                              |
| **Çoğullaştırma**                                    | ✅ Numaralandırma tabanlı desenler                                                                                                                              | ✅ İyi                                                                                                               | ✅ İyi                                                                                                               |
| **Formatlama (tarihler, sayılar, para birimleri)**   | ✅ Optimize edilmiş formatlayıcılar (Intl altında)                                                                                                              | ✅ İyi (Intl yardımcıları)                                                                                           | ✅ İyi (Intl yardımcıları)                                                                                           |
| **İçerik Formatı**                                   | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml WIP)                                                                                                                | ✅ .json, .js, .ts                                                                                                   | ⚠️ .json                                                                                                             |
| **ICU desteği**                                      | ⚠️ WIP                                                                                                                                                          | ✅ Evet                                                                                                              | ⚠️ Eklenti aracılığıyla (`i18next-icu`)                                                                              |
| **SEO Yardımcıları (hreflang, site haritası)**       | ✅ Yerleşik araçlar: site haritası, robots.txt, meta veri için yardımcılar                                                                                      | ✅ İyi                                                                                                               | ✅ İyi                                                                                                               |
| **Ekosistem / Topluluk**                             | ⚠️ Daha küçük ama hızlı büyüyen ve reaktif                                                                                                                      | ✅ İyi                                                                                                               | ✅ İyi                                                                                                               |
| **Sunucu Tarafı Oluşturma ve Sunucu Bileşenleri**    | ✅ Evet, SSR / React Server Components için kolaylaştırılmış                                                                                                    | ⚠️ Sayfa düzeyinde desteklenir ancak alt sunucu bileşenleri için t-fonksiyonlarını bileşen ağacında geçmeniz gerekir | ⚠️ Sayfa düzeyinde desteklenir ancak alt sunucu bileşenleri için t-fonksiyonlarını bileşen ağacında geçmeniz gerekir |
| **Ağaç sallama (yalnızca kullanılan içeriği yükle)** | ✅ Evet, Babel/SWC eklentileri aracılığıyla derleme zamanında bileşen başına                                                                                    | ⚠️ Kısmi                                                                                                             | ⚠️ Kısmi                                                                                                             |
| **Tembel yükleme**                                   | ✅ Evet, yerel / sözlük başına                                                                                                                                  | ✅ Evet (rota/yere göre), ad alanı yönetimi gerektir                                                                 | ✅ Evet (rota/yere göre), ad alanı yönetimi gerektir                                                                 |
| **Kullanılmayan içeriği temizle**                    | ✅ Evet, derleme zamanında sözlük başına                                                                                                                        | ❌ Hayır, ad alanı yönetimi ile manuel olarak yönetilebilir                                                          | ❌ Hayır, ad alanı yönetimi ile manuel olarak yönetilebilir                                                          |
| **Büyük Projelerin Yönetimi**                        | ✅ Modüler teşvik eder, tasarım sistemi için uygundur                                                                                                           | ✅ Kurulumla modüler                                                                                                 | ✅ Kurulumla modüler                                                                                                 |

---

## Derinlemesine karşılaştırma

### 1) Mimari ve ölçeklenebilirlik

- **next-intl / next-i18next**: Yerel başına **merkezi kataloglara** varsayılan (i18next'te **ad alanları** artı). Başlangıçta iyi çalışır, ancak artan bağlantı ve anahtar karmaşasıyla genellikle büyük bir paylaşılan yüzey alanı haline gelir.
- **Intlayer**: **Bileşen başına** (veya özellik başına) sözlükleri **hizmet ettikleri kodla birlikte** teşvik eder. Bu, bilişsel yükü azaltır, UI parçalarının çoğaltılmasını/migrasyonunu kolaylaştırır ve ekip arası çatışmaları azaltır. Kullanılmayan içerik doğal olarak daha kolay tespit edilir ve temizlenir.

**Neden önemli:** Büyük kod tabanlarında veya tasarım sistemi kurulumlarında, **modüler içerik** monolitik kataloglardan daha iyi ölçeklenir.

---

## Bundle boyutları & bağımlılıkları

Uygulamayı derledikten sonra, bundle tarayıcının sayfayı render etmek için yükleyeceği JavaScripttir. Bu nedenle bundle boyutu, uygulama performansı için önemlidir.

Çok dilli bir uygulama bundle'ı bağlamında önemli iki bileşen vardır:

- Uygulama kodu
- Tarayıcı tarafından yüklenen içerik

## Uygulama Kodu

Uygulama kodunun önemi bu durumda minimumdur. Üç çözümün tamamı tree-shakable'dır, yani kodun kullanılmayan kısımları bundle'a dahil edilmez.

Burada üç çözümle çok dilli bir uygulama için tarayıcı tarafından yüklenen JavaScript bundle boyutunun karşılaştırması yer almaktadır.

Uygulamada herhangi bir formater'a ihtiyacımız yoksa, tree-shaking sonrasında dışa aktarılan fonksiyonların listesi şu şekildedir:

- **next-intlayer**: `useIntlayer`, `useLocale`, `NextIntlClientProvider`, (Bundle boyutu 180.6 kB -> 15.24 kB (gzip))
- **next-intl**: `useTranslations`, `useLocale`, `NextIntlClientProvider`, (Bundle boyutu 101.3 kB -> 31.4 kB (gzip))
- **next-i18next**: `useTranslation`, `useI18n`, `I18nextProvider`, (Bundle boyutu 80.7 kB -> 25.5 kB (gzip))

Bu fonksiyonlar sadece React context/state etrafında wrapper'lar olduğundan, i18n kütüphanesinin bundle boyutuna toplam etkisi minimumdur.

## İçerik ve Çeviriler

Bu kısım genellikle geliştiriciler tarafından göz ardı edilir, ancak 10 dilde 10 sayfadan oluşan bir uygulamayı düşünelim. Her sayfanın hesaplamayı basitleştirmek için %100 benzersiz içerik içerdiğini varsayalım (gerçekte, sayfalar arasında çok sayıda içerik redundant'dır, örneğin sayfa başlığı, başlık, alt bilgi vb.).

Bir kullanıcı `/fr/about` sayfasını ziyaret etmek istediğinde, belirli bir dildeki bir sayfanın içeriğini yükleyecektir. İçerik optimizasyonunu göz ardı etmek, gereksiz olarak %8.200 `((1 + (((10 pages - 1) × (10 languages - 1)))) × 100)` uygulama içeriğini yüklemek anlamına gelir. Sorunu görüyor musunuz? Bu içerik metin olmaya devam etse de ve muhtemelen sitenizin resimlerini optimize etmeyi düşünmeyi tercih etseniz de, gereksiz içeriği dünya çapında gönderiyor ve kullanıcıların bilgisayarlarının bunu işlemesi için hiçbir şey yapmıyorsunuz.

İki önemli sorun:

- **Rota ile bölme:**

  > `/about` sayfasındaysam, `/home` sayfasının içeriğini yüklemek istemiyorum

- **Locale ile bölme:**

  > `/fr/about` sayfasındaysam, `/en/about` sayfasının içeriğini yüklemek istemiyorum

Yine de, üç çözümün tümü bu sorunlardan haberdar ve bu optimizasyonları yönetmeye izin verir. Üç çözüm arasındaki fark DX (Developer Experience)'dir.

`next-intl` ve `next-i18next` çevirileri yönetmek için merkezi bir yaklaşım kullanır ve JSON'in locale ve alt dosyalara göre bölünmesine izin verir. `next-i18next`'de, JSON dosyalarını 'namespace' olarak adlandırırız; `next-intl` iletileri bildirmeye izin verir. `intlayer`'da, JSON dosyalarını 'dictionaries' olarak adlandırırız.

- `next-intl` durumunda, `next-i18next` gibi, içerik sayfa/layout düzeyinde yüklenir, ardından bu içerik bir context provider'a yüklenir. Bu, geliştiricinin her sayfa için yüklenecek JSON dosyalarını manuel olarak yönetmesi gerektiği anlamına gelir.

> Pratikte, bu, geliştiricilerin genellikle bu optimizasyonu atlamasını ve basitlik için tüm içeriği sayfanın context provider'ına yüklemeyi tercih etmesini ifade eder.

- `intlayer` durumunda, tüm içerik uygulamada yüklenir. Ardından bir plugin (`@intlayer/babel` / `@intlayer/swc`) yalnızca sayfada kullanılan içeriği yükleyerek bundle'ı optimize etmeyi üstlenir. Geliştirici bu nedenle yüklenecek sözlükleri manuel olarak yönetmesi gerekmez. Bu, daha iyi optimizasyon, daha iyi bakım sağlaması ve geliştirme zamanını azaltır.

Uygulama büyüdükçe (özellikle birden fazla geliştirici uygulamada çalıştığında), JSON dosyalarından artık kullanılmayan içeriği kaldırmayı unutmak yaygındır.

> Tüm JSON'in tüm durumlarda yüklendiğini unutmayın (next-intl, next-i18next, intlayer).

Bu nedenle Intlayer'ın yaklaşımı daha performanslıdır: bir component artık kullanılmıyorsa, sözlüğü bundle'a yüklenmez.

Kütüphanenin fallback'leri nasıl işlediği de önemlidir. Uygulamanın varsayılan olarak İngilizcede olduğunu ve kullanıcının `/fr/about` sayfasını ziyaret ettiğini düşünelim. Çeviriler Fransızca'da eksikse, İngilizce fallback'i dikkate alacağız.

`next-intl` ve `next-i18next` durumunda, kütüphane geçerli locale ile ilgili JSON'in yüklenmesini gerektirir, aynı zamanda fallback locale de. Böylece, tüm içeriğin çevrildiğini göz önünde bulundurarak, her sayfa %100 gereksiz içerik yükleyecektir. **Buna karşılık, `intlayer` fallback'i sözlük derleme zamanında işler. Bu nedenle, her sayfa yalnızca kullanılan içeriği yükleyecektir.**

> Not: `intlayer` kullanarak bundle'ı optimize etmek için, `intlayer.config.ts` dosyasında `importMode: 'dynamic'` seçeneğini ayarlamanız gerekir. Ve `@intlayer/babel` / `@intlayer/swc` plugin'inin kurulu olduğundan emin olun (varsayılan olarak `vite-intlayer` kullanılarak kurulur).

İşte bir vite + react uygulamasında `intlayer` kullanarak bundle boyutu optimizasyonunun etkisine bir örnek:

| Optimize edilmiş bundle                                                                               | Optimize edilmemiş bundle                                                                                                |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| ![optimized bundle](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) | ![no optimized bundle](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) |

---

### 2) TypeScript ve güvenlik

- **next-intl**: Sağlam TypeScript desteği, ancak **anahtarlar varsayılan olarak katı şekilde yazılmaz**; güvenliği manuel olarak sürdüreceksiniz.
- **next-i18next**: Hook'lar için temel yazımlar; **katı anahtar yazımı ekstra araç/yapılandırma gerektirir**.
- **Intlayer**: İçeriğinizden **katı türler oluşturur**. **IDE otomatik tamamlama** ve **derleme zamanı hataları** dağıtım öncesi yazım hatalarını ve eksik anahtarları yakalar.

**Neden önemli:** Güçlü yazım, başarısızlıkları **sol** (CI/derleme) yerine **sağ** (çalışma zamanı) kaydırır.

---

### 3) Eksik çeviri işleme

- **next-intl / next-i18next**: **Çalışma zamanı geri dönüşlerine** güvenir (örneğin, anahtarı göster veya varsayılan yerel). Derleme başarısız olmaz.
- **Intlayer**: **Derleme zamanı algılama** ile eksik yerel veya anahtarlar için **uyarılar/hatalar**.

**Neden önemli:** Derleme sırasında boşlukları yakalamak, üretimde "gizemli dizeler"i önler ve katı sürüm kapılarıyla uyumlu hale getirir.

---

### 4) Yönlendirme, ara yazılım ve URL stratejisi

- Üçü de App Router'da **Next.js yerelleştirilmiş yönlendirme** ile çalışır.
- **Intlayer**, **i18n ara yazılımı** (üstbilgi/çerezler aracılığıyla yerel algılama) ve yerelleştirilmiş URL'ler ve `<link rel="alternate" hreflang="…">` etiketleri oluşturmak için **yardımcılarla** daha da ileri gider.

**Neden önemli:** Daha az özel yapıştırıcı katman; yerel genelinde **tutarlı UX** ve **temiz SEO**.

---

### 5) Sunucu Bileşenleri (RSC) uyumu

- **Hepsi** Next.js 13+'yı destekler.
- **Intlayer**, RSC için tasarlanmış tutarlı API ve sağlayıcılarla **sunucu/istemci sınırını** yumuşatır, böylece formatlayıcıları veya t-fonksiyonlarını bileşen ağaçları aracılığıyla taşımazsınız.

**Neden önemli:** Hibrit ağaçlarda daha temiz zihinsel model ve daha az uç durum.

---

## Lokalizasyon platformları (TMS) ile entegrasyon

Büyük kuruluşlar genellikle **Crowdin**, **Phrase**, **Lokalise**, **Localizely** veya **Localazy** gibi Çeviri Yönetim Sistemlerine (TMS) güvenir.

- **Şirketlerin neden önem verdiği**
  - **İşbirliği & roller**: Birden fazla aktör söz konusudur: geliştiriciler, ürün müdürleri, çevirmenler, gözden geçirenler, pazarlama ekipleri.
  - **Ölçek & verimlilik**: sürekli lokalizasyon, bağlam içi inceleme.

- **next-intl / next-i18next**
  - Tipik olarak **merkezi JSON katalogları** kullanır, bu nedenle TMS ile dışa/içe aktarma işlemi açıktır.
  - Olgun ekosistemler ve yukarıdaki platformlar için örnekler/entegrasyonlar.

- **Intlayer**
  - **Merkezi olmayan, bileşen başına sözlükler** teşvik eder ve **TypeScript/TSX/JS/JSON/MD** içeriğini destekler.
  - Bu, koddaki modülarite iyileştirir, ancak bir araç merkezi, düz JSON dosyaları beklediğinde plug‑and‑play TMS entegrasyonunu daha zor hale getirebilir.
  - Intlayer alternatifler sağlar: **AI destekli çeviriler** (kendi sağlayıcı anahtarlarınızı kullanarak), **Görsel Editör/CMS** ve **CLI/CI** iş akışları boşlukları yakalamak ve önceden doldurmak için.

> Not: `next-intl` ve `i18next` ayrıca TypeScript kataloglarını kabul eder. Ekibiniz mesajları `.ts` dosyalarında depoluyorsa veya bunları özelliğe göre merkezi olmayan hale getirirse, benzer TMS sürtünme yaşayabilirsiniz. Ancak, birçok `next-intl` kurulumu `locales/` klasöründe merkezi kalır ve bu, TMS için JSON'a yeniden düzenlemek biraz daha kolaydır.

---

## Geliştirici Deneyimi

Bu bölüm üç çözüm arasında derinlemesine bir karşılaştırma yapmaktadır. Her çözüm için 'başlangıç' belgelerinde açıklanan basit durumlar yerine, gerçek bir proje benzeri gerçek bir kullanım durumunu göz önünde bulunduracağız.

### Uygulama Yapısı

Uygulama yapısı, codebase'iniz için iyi bir bakım alabilirliği sağlamak açısından önemlidir.

<Tabs defaultTab="next-intl" group='techno'>

  <Tab label="next-i18next" value="next-i18next">

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

  </Tab>
  <Tab label="next-intl" value="next-intl">

```bash
.
├── i18n.ts
├── locales
│   ├── en
│   │  ├── home.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── home.json
│   │  └── navbar.json
│   └── es
│      ├── home.json
│      └── navbar.json
└── src
    ├── middleware.ts
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       └── home.tsx
    └── components
        └── Navbar
            └── index.tsx
```

  </Tab>
  <Tab label="intlayer" value="intlayer">

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── home
    │           ├── index.tsx
    │           └── index.content.ts
    └── components
        └── Navbar
            ├── index.tsx
            └── index.content.ts
```

  </Tab>
</Tabs>

### 6) Performans ve yükleme davranışı

- **next-intl / next-i18next**: **Ad alanları** ve **rota düzeyinde bölmeler** aracılığıyla kısmi kontrol; disiplin kayarsa kullanılmayan dizeleri paketleme riski.
- **Intlayer**: **Derleme zamanında ağaç sallar** ve **sözlük/yere göre tembel yükler**. Kullanılmayan içerik gönderilmez.

**Neden önemli:** Özellikle çok yerel sitelerde daha küçük paketler ve daha hızlı başlatma.

---

#### Kurulum ve İçerik Yükleme

Daha önce bahsedildiği gibi, her JSON dosyasının kodunuza nasıl import edildiğini optimize etmelisiniz.
Kütüphanenin içerik yüklemesini nasıl işlediği önemlidir.

<Tabs defaultTab="next-intl" group='techno'>
  <Tab label="next-i18next" value="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// JSON kaynaklarını src/locales/<locale>/<namespace>.json dosyasından yükle
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
}
```

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: bundle }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? params.locale
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// Sayfa için statik render'ı zorla
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

  </Tab>
   <Tab label="next-intl" value="next-intl">

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // Yalnızca layout/pages'in ihtiyaç duyduğu namespace'leri yükle
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Bu sunucu render'ı (RSC) için aktif request locale'ini ayarla
  unstable_setRequestLocale(locale);

  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Mesajlar sunucu tarafında yüklenir. Yalnızca gerekli olanı istemciye gönder.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Kesinlikle sunucu tarafında çeviriler/biçimlendirme
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

  </Tab>
  <Tab label="intlayer" value="intlayer">

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import {
  IntlayerClientProvider,
  generateStaticParams,
  type NextLayoutIntlayer,
} from "next-intlayer";

export const dynamic = "force-static";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LandingLayout;
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { PageContent } from "@components/PageContent";
import type { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { ClientComponent, ServerComponent } from "@components";

const LandingPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const { title } = useIntlayer("about", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main>
        <h1>{title}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </IntlayerServerProvider>
  );
};

export default LandingPage;
```

  </Tab>
</Tabs>

### 7) DX, araçlar ve bakım

- **next-intl / next-i18next**: Genellikle çeviriler ve düzenleme iş akışları için harici platformları bağlayacaksınız.
- **Intlayer**: **Ücretsiz Görsel Düzenleyici** ve **isteğe bağlı CMS** (Git dostu veya dışa aktarılmış) gönderir. Artı içerik yazımı için **VSCode uzantısı** ve kendi sağlayıcı anahtarlarınızı kullanarak **AI destekli çeviriler**.

**Neden önemli:** Operasyon maliyetini düşürür ve geliştiriciler ile içerik yazarları arasındaki döngüyü kısaltır.

---

### İstemci bileşeninde kullanım

Bir sayaç renderlayan istemci bileşeninin örneğini alalım.

<Tabs defaultTab="next-intl" group='techno'>
  <Tab label="next-i18next" value="next-i18next">

**Çeviriler (`src/locales/...` altında namespace başına bir JSON)**

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**İstemci bileşeni (yalnızca gerekli namespace'i yükler)**

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // Intl.NumberFormat örneğini oluştur
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

> Sayfa/provider'ın yalnızca ihtiyaç duyduğunuz namespace'leri içerdiğinden emin olun (örneğin `about`).
> React < 19 kullanıyorsanız, `Intl.NumberFormat` gibi ağır formatter'ları memoize edin.

  </Tab>
  <Tab label="next-intl" value="next-intl">

**Çeviriler (şekil yeniden kullanılır; bunları next-intl mesajlarına istediğiniz şekilde yükleyin)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**İstemci bileşeni**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // İç içe nesneye doğrudan kapsam ver
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> Sayfa istemci mesajına "about" mesajını eklemeyi unutmayın

  </Tab>
  <Tab label="intlayer" value="intlayer">

**İçerik**

```ts fileName="src/components/ClientComponentExample/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ tr: "Sayaç", en: "Counter", fr: "Compteur" }),
    increment: t({ tr: "Artır", en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

**İstemci bileşeni**

```tsx fileName="src/components/ClientComponentExample/index.tsx"
"use client";

import React, { useState } from "react";
import { useNumber, useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const [count, setCount] = useState(0);
  const { label, increment } = useIntlayer("counter"); // diziler döndürür
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((count) => count + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

  </Tab>
</Tabs>

## Hangisini ne zaman seçmeli?

- **next-intl**'i seçin eğer **minimal** bir çözüm istiyorsanız, merkezi kataloglarla rahatınız ve uygulamanız **küçük ila orta boy**.
- **next-i18next**'i seçin eğer **i18next'in eklenti ekosistemine** ihtiyacınız varsa (örneğin, eklentiler aracılığıyla gelişmiş ICU kuralları) ve ekibiniz zaten i18next'i biliyorsa, esnekliği için **daha fazla yapılandırma** kabul ederek.
- **Intlayer**'ı seçin eğer **bileşen kapsamlı içerik**, **katı TypeScript**, **derleme zamanı garantileri**, **ağaç sallama** ve **pil dahil** yönlendirme/SEO/düzenleyici araçlarını takdir ediyorsanız - özellikle **Next.js App Router**, tasarım sistemleri ve **büyük, modüler kod tabanları** için.

---

### Bir sunucu bileşeninde kullanım

Bir UI bileşeninin durumunu ele alacağız. Bu bileşen bir sunucu bileşenidir ve bir istemci bileşeninin alt öğesi olarak eklenebilir olmalıdır. (sayfa (sunucu bileşeni) -> istemci bileşeni -> sunucu bileşeni). Bu bileşen bir istemci bileşeninin alt öğesi olarak eklenebileceğinden, asenkron olamaz.

<Tabs defaultTab="next-intl" group='techno'>
  <Tab label="next-i18next" value="next-i18next">

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

  </Tab>
  <Tab label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
  formatter: Intl.NumberFormat;
};

const ServerComponent = ({
  t,
  locale,
  count,
  formatter,
}: ServerComponentProps) => {
  const formatted = formatter.format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

> Sunucu bileşeni asenkron olamayacağından, çeviriler ve biçimlendirici işlevini prop olarak iletmeniz gerekir.
>
> Sayfa / yerleşimde:
>
> - `import { getTranslations, getFormatter } from "next-intl/server";`
> - `const t = await getTranslations("about.counter");`
> - `const formatter = await getFormatter().then((formatter) => formatter.number());`

  </Tab>
  <Tab label="intlayer" value="intlayer">

```tsx fileName="src/components/ServerComponent.tsx"
import { useIntlayer, useNumber } from "next-intlayer/server";

type ServerComponentProps = {
  count: number;
};

const ServerComponent = ({ count }: ServerComponentProps) => {
  const { label, increment } = useIntlayer("counter");
  const { number } = useNumber();

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

> Intlayer, `next-intlayer/server` aracılığıyla **sunucu açısından güvenli** kancaları ortaya koymaktadır. Çalışması için `useIntlayer` ve `useNumber`, istemci kancaları gibi benzer kanca benzeri söz dizimine sahiptir, ancak altyapıda sunucu bağlamına (`IntlayerServerProvider`) bağlıdır.

### Metadata / Sitemap / Robots

İçerik çevirisi harika. Ama insanlar genellikle uluslararasılaştırmanın ana hedefinin web sitenizi dünyaya daha görünür hale getirmek olduğunu unuturlar. I18n, web sitenizin görünürlüğünü iyileştirmek için inanılmaz bir kaldıraçtır.

İşte çok dilli SEO ile ilgili iyi uygulamaların bir listesi.

- `<head>` etiketinde hreflang meta etiketlerini ayarlayın
  > Arama motorlarının sayfada hangi dillerin mevcut olduğunu anlamasına yardımcı olur
- sitemap.xml içinde `http://www.w3.org/1999/xhtml` XML şemasını kullanarak tüm sayfa çevirilerini listeleyin
  >
- robots.txt içindeki ön ekli sayfaları hariç tutmayı unutmayın (örneğin `/dashboard`, `/fr/dashboard`, `/es/dashboard`)
  >
- en yerelleştirilmiş sayfaya yönlendirmek için özel bir Link bileşeni kullanın (örneğin Fransızca `<a href="/fr/about">A propos</a>`)
  >

Geliştiriciler genellikle sayfalarını yerel ayarlar arasında düzgün şekilde referans vermeyi unuturlar.

<Tabs defaultTab="next-intl" group='techno'>
 
  <Tab label="next-i18next" value="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

type GenerateMetadataParams = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: GenerateMetadataParams): Promise<Metadata> => {
  const { locale } = await params;

  // src/locales içinden doğru JSON paketini içeri aktar
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};

export default async function AboutPage() {
  return <h1>About</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export const sitemap = (): MetadataRoute.Sitemap => {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
};
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export const robots = (): MetadataRoute.Robots => {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
};
```

  </Tab>
  <Tab label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

const localizedPath = (locale: string, path: string) => {
  return locale === defaultLocale ? path : "/" + locale + path;
};

type GenerateMetadataParams = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: GenerateMetadataParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
};

// ... Sayfanın geri kalanının kodu
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export const sitemap = (): MetadataRoute.Sitemap => {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
};
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export const robots = (): MetadataRoute.Robots => {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
};
```

  </Tab>
  <Tab label="intlayer" value="intlayer">

```typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Sayfanın geri kalanının kodu
```

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]),
  },
  host: "https://example.com",
  sitemap: "https://example.com/sitemap.xml",
});

export default robots;
```

  </Tab>
</Tabs>

> Intlayer, sitemap'iniz için çok dilli URL'ler oluşturmak için bir `getMultilingualUrls` işlevi sağlar.

### Yerel ayar yönlendirmesi için Middleware

<Tabs defaultTab="next-intl" group='techno'>
  <Tab label="next-i18next" value="next-i18next">

Yerel ayar algılaması ve yönlendirmesini işlemek için bir middleware ekleyin:

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // dosya uzantılarını hariç tut

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (l) => pathname === "/" + l || pathname.startsWith("/" + l + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // Bu yollarla başlayan ve dosya uzantısı olan yolları hariç tut
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

  </Tab>
  <Tab label="next-intl" value="next-intl">

Yerel ayar algılaması ve yönlendirmesini işlemek için bir middleware ekleyin:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // API, Next iç bileşenleri ve statik varlıkları atla
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

  </Tab>
  <Tab label="intlayer" value="intlayer">

Intlayer, `next-intlayer` paket yapılandırması aracılığıyla yerleşik middleware işleme sağlar.

```ts fileName="src/middleware.ts"
import { intlayerProxy } from "next-intlayer/proxy";

export const middleware = intlayerProxy();

// bu middleware'i yalnızca app dizinindeki dosyalara uygula
export const config = {
  matcher: "/((?!api|_next|static|.*\\..*).*)",
};
```

Middleware'in kurulumu `intlayer.config.ts` dosyasında merkezileştirilmiştir.

  </Tab>
</Tabs>

## `next-intl` ve `next-i18next` ile birlikte çalışabilirlik

`intlayer`, `next-intl` ve `next-i18next` ad alanlarınızı yönetmenize de yardımcı olabilir.

`intlayer` kullanarak, içeriğinizi favori i18n kütüphanenizin formatında beyan edebilirsiniz ve intlayer ad alanlarınızı istediğiniz konumda oluşturacaktır (örnek: `/messages/{{locale}}/{{namespace}}.json`).

---

## Ve kazanan…

Basit değil. Her seçeneğin avantaj ve dezavantajları var. İşte benim görüşüm:

<Columns>
  <Column>

**next-i18next**

- olgun, özellikleri bol, çok sayıda topluluk eklentisi, ancak daha yüksek kurulum maliyeti. **i18next'in eklenti ekosistemini** (örneğin, eklentiler aracılığıyla gelişmiş ICU kuralları) ihtiyacınız varsa ve ekibiniz zaten i18next'i biliyorsa, esneklik için **daha fazla yapılandırmayı** kabul edin.

  </Column>
  <Column>

**next-intl**

- en basit, hafif, size dayatılan daha az karar. **Minimal** bir çözüm istiyorsanız, merkezi kataloglar ile rahat iseniz ve uygulamanız **küçükten orta ölçeğe** ise.

  </Column>
  <Column>

**Intlayer**

- modern Next.js için oluşturulmuş, modüler içerik, tip güvenliği, araçlar ve daha az boilerplate ile. **Bileşen kapsamlı içerik**, **kesin TypeScript**, **derleme zamanı garantileri**, **tree-shaking** ve **pil dahil** yönlendirme/SEO/editör araçlarını değer veriyorsanız - özellikle **Next.js App Router**, tasarım sistemleri ve **büyük, modüler kod tabanları** için.

  </Column>
</Columns>

Minimal kurulumu tercih ederseniz ve bazı manuel bağlantıları kabul ederseniz, next-intl iyi bir seçimdir. Tüm özelliklere ihtiyacınız varsa ve karmaşıklığa aldırmıyorsanız, next-i18next işe yarar. Ancak modern, ölçeklenebilir, modüler bir çözüm istiyorsanız ve dahili araçlarla, Intlayer bunu size kutusundan çıkar halde sağlamayı amaçlar.

> **Kurumsal ekipler için alternatif**: **Crowdin**, **Phrase** veya diğer profesyonel çeviri yönetim sistemleri gibi yerleşik yerelleştirme platformları ile mükemmel çalışan, kanıtlanmış bir çözüme ihtiyacınız varsa, olgun ekosistem ve kanıtlanmış entegrasyonları için **next-intl** veya **next-i18next** göz önünde bulundurun.

> **Gelecek yol haritası**: Intlayer ayrıca **i18next** ve **next-intl** çözümleri üzerinde çalışan eklentileri geliştirmeyi planlıyor. Bu, uygulamanızın kodunda bu yerleşik çözümler tarafından sağlanan güvenlik ve kararlılığı korurken, Intlayer'ın otomasyon, sözdizimi ve içerik yönetimi avantajlarını size verecektir.

## GitHub YILDIZLARI

GitHub yıldızları, bir projenin popülaritesinin, topluluk güveninin ve uzun vadeli öneminin güçlü bir göstergesidir. Teknik kalitenin doğrudan bir ölçüsü olmasa da, kaç geliştiricinin projeyi yararlı bulduğunu, ilerlemesini takip ettiğini ve muhtemelen benimsediğini yansıtır. Bir projenin değerini tahmin etmek için yıldızlar, alternatifler arasındaki çekişmeyi karşılaştırmaya ve ekosistem büyümesine ilişkin içgörüler sağlamaya yardımcı olur.

[![Yıldız Geçmişi Grafiği](https://api.star-history.com/chart?repos=i18next/next-i18next%2Camannn/next-intl%2Caymericzip/intlayer&type=date&legend=top-left)](https://www.star-history.com/#i18next/next-i18next&amannn/next-intl&aymericzip/intlayer)

---

## Sonuç

Üç kütüphane de temel yerelleştirmede başarılı. Fark, **modern Next.js'te** sağlam, ölçeklenebilir bir kurulum elde etmek için **ne kadar iş yapmanız gerektiğidir**:

- **Intlayer** ile, **modüler içerik**, **katı TS**, **derleme zamanı güvenliği**, **ağaç sallanan paketler** ve **birinci sınıf App Router + SEO araçları** **varsayılanlardır**, görevler değildir.
- Ekibiniz çok yerel, bileşen odaklı bir uygulamada **bakım ve hızı** takdir ediyorsa, Intlayer bugün **en kapsamlı** deneyimi sunar.

Daha fazla detay için ['Neden Intlayer?' dokümantasyonuna](https://intlayer.org/doc/why) bakın.
