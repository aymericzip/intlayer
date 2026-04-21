---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: 2026'da TanStack Start için En İyi i18n Çözümü - Benchmark Raporu
description: react-i18next, use-intl ve Intlayer gibi TanStack Start uluslararasılaştırma kütüphanelerini karşılaştırın. Paket boyutu, sızıntı ve reaktivite üzerine ayrıntılı performans raporu.
keywords:
  - benchmark
  - i18n
  - intl
  - tanstack
  - performans
  - intlayer
slugs:
  - doc
  - benchmark
  - tanstack
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-tanstack-start-template
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Benchmark başlatıldı"
---

# TanStack Start i18n Kütüphaneleri — 2026 Benchmark Raporu

Bu sayfa, TanStack Start üzerindeki i18n çözümleri için hazırlanan bir kıyaslama (benchmark) raporudur.

## İçindekiler

<Toc/>

## Etkileşimli Benchmark

<I18nBenchmark framework="tanstack" vertical/>

## Sonuçlar Referansı:

<iframe 
  src="https://github.com/intlayer-org/benchmark-i18n/blob/main/report/scripts/summarize-tanstack.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://github.com/intlayer-org/benchmark-i18n/blob/main/report/scripts/summarize-tanstack.md

Benchmark deposunun tamamını [buradan](https://github.com/intlayer-org/benchmark-i18n/tree/main) inceleyebilirsiniz.

## Giriş

Uluslararasılaştırma çözümleri, bir React uygulamasındaki en ağır bağımlılıklardan biridir. TanStack Start'ta ana risk, gereksiz içerik gönderilmesidir: tek bir rotanın paketinde diğer sayfaların ve diğer yerel ayarların (locale) çevirilerinin bulunması.

Siteniz büyüdükçe, bu sorun istemciye gönderilen JavaScript miktarını hızla artırabilir ve navigasyonu yavaşlatabilir.

Pratikte, en az optimize edilmiş uygulamalar için uluslararasılaştırılmış bir sayfa, i18n bulunmayan sürüme göre birkaç kat daha ağır olabilir.

Diğer bir etki ise geliştirici deneyimidir (DX): içeriği nasıl tanımladığınız, tipler, ad alanı (namespace) organizasyonu, dinamik yükleme ve yerel ayar değiştiğinde verilen reaktif yanıt.

## Uygulamanızı Test Edin

i18n sızıntısı (leakage) sorunlarını hızlıca tespit etmek için [buradan](https://intlayer.org/i18n-seo-scanner) erişilebilen ücretsiz bir tarayıcı hazırladım.

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Sorun

Çok dilli bir uygulamanın maliyetini sınırlamak için iki kaldıraç esastır:

- İçeriği sayfa / ad alanı bazında bölün, böylece ihtiyacınız olmadığında tüm sözlükleri yüklemezsiniz.
- Doğru yerel ayarı yalnızca gerektiğinde dinamik olarak yükleyin.

Bu yaklaşımların teknik sınırlarını anlamak:

**Dinamik yükleme**

Dinamik yükleme olmadan, çoğu çözüm mesajları ilk render'dan itibaren bellekte tutar ve bu da çok sayıda rota ve yerel ayara sahip uygulamalar için önemli bir ek yük oluşturur.

Dinamik yükleme ile bir ödün vermeyi kabul edersiniz: daha az başlangıç JS'i, ancak bazen dil değiştirirken ek bir istek.

**İçerik bölme (Content splitting)**

`const t = useTranslation()` + `t('a.b.c')` etrafında oluşturulan sözdizimleri çok kullanışlıdır ancak genellikle çalışma zamanında büyük JSON nesnelerinin tutulmasını teşvik eder. Kütüphane gerçek bir sayfa başına bölme stratejisi sunmadığı sürece bu model tree-shaking işlemini zorlaştırır.

## Metodoloji

Bu benchmark için aşağıdaki kütüphaneleri karşılaştırdık:

- `Base App` (i18n kütüphanesi yok)
- `react-intlayer` (v8.7.5-canary.0)
- `react-i18next` (v17.0.2)
- `use-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `@inlang/paraglide-js` (v2.15.1)
- `tolgee` (v7.0.0)
- `react-intl` (v10.1.1)
- `wuchale` (v0.22.11)
- `gt-react` (vlatest)
- `lingo.dev` (v0.133.9)

Framework, **10 sayfa** ve **10 dilden** oluşan çok dilli bir uygulamaya sahip `TanStack Start`tır.

**Dört yükleme stratejisini** karşılaştırdık:

| Strateji            | Ad alanı yok (global)                         | Ad alanı var (scoped)                                              |
| :------------------ | :-------------------------------------------- | :----------------------------------------------------------------- |
| **Statik yükleme**  | **Static**: Başlangıçta her şey bellekte.     | **Scoped static**: Ad alanına bölünmüş; her şey başlangıçta yüklü. |
| **Dinamik yükleme** | **Dynamic**: İstek üzerine dile göre yükleme. | **Scoped dynamic**: Ad alanına ve dile göre ayrıntılı yükleme.     |

## Strateji özeti

- **Static**: Basit; ilk yüklemeden sonra ağ gecikmesi yok. Dezavantajı: büyük paket boyutu.
- **Dynamic**: Başlangıç ağırlığını azaltır (lazy-loading). Çok sayıda yerel ayara sahip olduğunuzda idealdir.
- **Scoped static**: Karmaşık ek ağ istekleri olmadan kodu düzenli tutar (mantıksal ayrım).
- **Scoped dynamic**: Kod bölme (code-splitting) ve performans için en iyi yaklaşım. Yalnızca geçerli görünümün ve aktif dilin ihtiyaç duyduğu şeyi yükleyerek bellek kullanımını en aza indirir.

## Sonuçlar Detaylı

### 1 — Kaçınılması gereken çözümler

`gt-react` veya `lingo.dev` gibi bazı çözümler den kaçınılması gereken seçeneklerdir. Bu çözümler satıcı kısıtlamasını kod tabanınızı kirletmekle birleştirir. Daha da kötüsü: uygulamak için saatler harcanmasına rağmen TanStack Start üzerinde düzgün çalıştıklarını göremedim (Next.js'teki `gt-next`e benzer şekilde).

Karşılaşılan sorunlar:

**(General Translation)** (`gt-react@latest`):

- Yaklaşık 110kb'lık bir uygulama için `gt-react` 440kb'tan fazla ek veri ekleyebilir (aynı benchmark'taki Next.js uygulamasında görülen miktar).
- General Translation ile yapılan ilk derlemede `Quota Exceeded, please upgrade your plan` mesajı.
- Çeviriler render edilmiyor; kütüphanede bir hata gibi görünen `Error: <T> used on the client-side outside of <GTProvider>` hatası alıyorum.
- **gt-tanstack-start-react** uygulanırken kütüphaneyle ilgili bir [sorun](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) ile de karşılaştım: `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser` hatası uygulamayı bozdu. Bildirildikten sonra 24 saat içinde düzeltildi.
- Bu kütüphaneler `initializeGT()` fonksiyonu aracılığıyla bir antipaten (anti-pattern) kullanarak paketin temiz bir şekilde tree-shake edilmesini engeller.

**(Lingo.dev)** (`lingo.dev@0.133.9`):

- AI kotası aşıldı (veya sunucu bağımlılığını engelliyor), bu da ödeme yapmadan derleme / yayınlamayı riskli hale getiriyor.
- Derleyici, çevrilmiş içeriğin neredeyse %40'ını kaçırıyordu. Çalışması için tüm `.map` yapılarını düz bileşen bloklarına yeniden yazmak zorunda kaldım.
- CLI'ları hatalı ve yapılandırma dosyasını sebepsiz yere sıfırlıyordu.
- Derleme sırasında, yeni içerik eklendiğinde oluşturulan JSON'ları tamamen siliyordu. Sonuç olarak, birkaç anahtarın yüzlerce mevcut anahtarı sildiği bir durumla karşılaşabilirsiniz.
- TanStack Start üzerinde kütüphane ile reaktivite sorunları yaşadım: yerel ayar değiştiğinde çalışması için sağlayıcının (provider) zorla yeniden render edilmesini gerektirdi.

### 2 — Deneysel çözümler

**(Wuchale)** (`wuchale@0.22.11`):

`Wuchale`'nin arkasındaki fikir ilginç ancak henüz uygulanabilir bir çözüm değil. Reaktivite sorunlarıyla karşılaştım ve TanStack Start üzerinde uygulamanın çalışması için sağlayıcının zorla yeniden render edilmesini gerektirdi. Dokümantasyon da oldukça belirsiz, bu da alışma sürecini zorlaştırıyor.

### 3 — Kabul edilebilir çözümler

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

`Paraglide` yenilikçi ve iyi düşünülmüş bir yaklaşım sunuyor. Buna rağmen, bu benchmark'ta şirketlerinin reklamını yaptığı tree-shaking benim Next.js uygulamamda veya TanStack Start için çalışmadı. İş akışı ve DX de diğer seçeneklerden daha karmaşık. Şahsen her push öncesinde JS dosyalarını yeniden oluşturmak zorunda kalmaktan hoşlanmıyorum, bu da PR'ler üzerinden geliştiriciler için sürekli merge çelişkisi riski yaratıyor.

**(Tolgee)** (`tolgee@7.0.0`):

`Tolgee` daha önce bahsedilen sorunların çoğunu ele alıyor. Benzer yaklaşımlara sahip diğer araçlara göre başlamasının daha zor olduğunu gördüm. Tip güvenliği sağlamıyor, bu da eksik anahtarların derleme zamanında yakalanmasını çok zorlaştırıyor. Eksik anahtar algılama özelliği eklemek için Tolgee'nin API'larını kendi API'larımla sarmak zorunda kaldım.

TanStack Start üzerinde de reaktivite problemlerim oldu: yerel ayar değiştiğinde, sağlayıcıyı yeniden render etmeye zorlamam ve yerel ayar değişikliği olaylarına abone olmam gerekiyordu, böylece başka bir dildeki yükleme düzgün davrandı.

**(use-intl)** (`use-intl@4.9.1`):

`use-intl`, React ekosistemindeki en popüler "intl" parçasıdır ( `next-intl` ile aynı aileden) ve genellikle AI asistanları tarafından önerilir; ancak bence performans odaklı bir ortamda bu yanlış bir yaklaşımdır. Başlamak oldukça basittir. Pratikte, sızıntıyı optimize etme ve sınırlama süreci oldukça karmaşıktır. Aynı şekilde, dinamik yükleme + ad alanı oluşturma + TypeScript tiplerini birleştirmek geliştirmeyi çok yavaşlatır.

TanStack Start'ta Next.js'e özgü tuzaklardan ( `setRequestLocale`, statik render) kaçınırsınız, ancak temel sorun aynıdır: sıkı disiplin olmazsa, paket hızla çok fazla mesaj taşır ve rota başına ad alanı bakımı zahmetli hale gelir.

**(react-i18next)** (`react-i18next@17.0.2`):

`react-i18next` muhtemelen en popüler seçenektir çünkü JavaScript uygulama i18n ihtiyaçlarını karşılayan ilklerden biridir. Ayrıca belirli sorunlar için geniş bir topluluk eklenti setine sahiptir.

Yine de, `t('a.b.c')` üzerine kurulu teknoloji yığınlarıyla aynı büyük dezavantajları paylaşır: optimizasyonlar mümkündür ancak çok zaman alıcıdır ve büyük projeler kötü uygulamalara (ad alanları + dinamik yükleme + tipler) düşme riski taşır.

Mesaj formatları da farklıdır: `use-intl` ICU MessageFormat kullanırken, `i18next` kendi formatını kullanır — bu da bunları karıştırdığınızda araçları veya geçişleri karmaşıklaştırır.

**(Lingui)** (`@lingui/core@5.3.0`):

`Lingui` sık sık övülür. Şahsen `lingui extract` / `lingui compile` iş akışını diğer yaklaşımlardan daha karmaşık buldum ve bu TanStack Start benchmark'ında net bir avantaj göremedim. Ayrıca AI'ları şaşırtan tutarsız sözdizimleri fark ettim (örneğin `t()`, `t''`, `i18n.t()`, `<Trans>`).

**(react-intl)** (`react-intl@10.1.1`):

`react-intl`, Format.js ekibinin performans odaklı bir uygulamasıdır. DX "verbose" kalır: `const intl = useIntl()` + `intl.formatMessage({ id: "xx.xx" })` karmaşıklık, ek JavaScript yükü ekler ve global i18n örneğini React ağacındaki birçok düğüme bağlar.

### 4 — Öneriler

Bu TanStack Start benchmark'ının `next-translate` (Next.js eklentisi + `getStaticProps`) için doğrudan bir karşılığı yoktur. Gerçekten olgun bir ekosisteme sahip bir `t()` API'si isteyen ekipler için `react-i18next` ve `use-intl` "makul" seçenekler olmaya devam ediyor — ancak sızıntıyı önlemek için optimizasyon yapmaya çok zaman ayırmaya hazırlıklı olun.

**(Intlayer)** (`react-intlayer@8.7.5-canary.0`):

Nesnellik adına kendi çözümüm olan `react-intlayer` hakkında kişisel olarak yorum yapmayacağım.

### Kişisel Not

Bu not kişiseldir ve benchmark sonuçlarını etkilemez. Yine de i18n dünyasında, çevrilmiş içerik için genellikle `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` gibi bir desen etrafında fikir birliği görülür.

React uygulamalarında, bir React düğümü (ReactNode) olarak bir fonksiyon enjekte etmek bence bir antipatendir. Ayrıca, kaçınılabilir bir karmaşıklık ve (zar zor fark edilse bile) JavaScript yürütme yükü ekler.
