---
createdAt: 2026-04-20
updatedAt: 2026-05-18
title: 2026'da Vue için En İyi i18n Çözümü - Benchmark Raporu
description: vue-i18n, fluent-vue ve Intlayer gibi Vue uluslararasılaştırma (i18n) kütüphanelerini karşılaştırın. Paket boyutu, sızıntı ve reaktivite üzerine ayrıntılı performans raporu.
keywords:
  - benchmark
  - i18n
  - intl
  - vue
  - performans
  - intlayer
slugs:
  - doc
  - benchmark
  - vue
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-vue-template
history:
  - version: 8.9.8
    date: 2026-05-18
    changes: "GitHub yıldız karşılaştırması ekle"
  - version: 8.7.12
    date: 2026-01-06
    changes: "Benchmark başlatıldı"
---

# Vue i18n Kütüphaneleri — 2026 Benchmark Raporu

Bu sayfa, Vue üzerindeki i18n çözümleri için bir benchmark raporudur.

## İçindekiler

<Toc/>

## İnteraktif Benchmark

<I18nBenchmark framework="vite-vue" vertical/>

## Sonuç referansı:

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> [Tam kıyaslama verilerini görün](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md)

Tüm benchmark deposunu [burada](https://github.com/intlayer-org/benchmark-i18n/tree/main) görebilirsiniz.

## Giriş

Uluslararasılaştırma çözümleri, bir Vue uygulamasındaki en ağır bağımlılıklar arasındadır. Ana risk, gereksiz içerik göndermektir: tek bir rota paketinde diğer sayfalar ve diğer diller için çeviriler.

Uygulamanız büyüdükçe, bu sorun istemciye gönderilen JavaScript'i hızla büyütebilir ve navigasyonu yavaşlatabilir.

Pratikte, en az optimize edilmiş uygulamalar için, uluslararasılaştırılmış bir sayfa i18n olmayan sürümden birkaç kat daha ağır olabilir.

Diğer etki geliştirici deneyimi (DX) üzerindedir: içeriği nasıl tanımladığınız, tipler, namespace organizasyonu, dinamik yükleme ve dil değiştiğinde reaktivite.

## TL;DR

- **Intlayer**: Yerel kapsam (scoping) ve dinamik yükleme ile en hafif çözüm (v8.7.12).
- **vue-i18n**: Zengin bir ekosisteme sahip endüstri standardı, ancak büyük uygulamalarda önemli ölçüde ağırlaşabilir ve kod bölme (code-splitting) için optimize edilmesi zor olabilir.
- **fluent-vue**: Yenilikçi mesaj organizasyonu ancak tip güvenliğinden yoksundur ve son derece ağır bir çözüm olduğu ortaya çıkmıştır.

## Uygulamanızı test edin

i18n sızıntı sorunlarını hızlıca tespit etmek için [burada](https://intlayer.org/i18n-seo-scanner) mevcut olan ücretsiz bir tarayıcı kurdum.

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Sorun

Çok dilli bir uygulamanın maliyetini sınırlamak için iki kaldıraç esastır:

- İçeriği sayfa / namespace bazında bölün, böylece ihtiyacınız olmadığında tüm sözlükleri yüklemezsiniz.
- Doğru dili dinamik olarak, yalnızca gerektiğinde yükleyin.

Bu yaklaşımların teknik sınırlarını anlamak:

**Dinamik yükleme**

Dinamik yükleme olmadan, çoğu çözüm mesajları ilk render'dan itibaren bellekte tutar ve bu da birçok rota ve dile sahip uygulamalar için önemli bir yük ekler.

Dinamik yükleme ile bir ödünleşimi kabul edersiniz: daha az başlangıç JS'i, ancak bazen dil değiştirirken ek bir istek.

**İçerik bölme (Splitting)**

`const { t } = useI18n()` + `t('a.b.c')` etrafında inşa edilen söz dizimleri çok kullanışlıdır ancak genellikle çalışma zamanında büyük JSON nesnelerini tutmayı teşvik eder. Bu model, kütüphane sayfa başına gerçek bir bölme stratejisi sunmadıkça tree-shaking'i zorlaştırır.

## Araştırma Metodolojisi

Bu benchmark için aşağıdaki kütüphaneleri karşılaştırdık:

- `Base App` (i18n kütüphanesi yok)
- `vue-intlayer` (v8.7.12)
- `vue-i18n` (v11.4.0)
- `fluent-vue` (v3.8.2)

Framework, **10 sayfa** ve **10 dilden** oluşan çok dilli bir uygulamaya sahip `Vue`'dur.

**Dört yükleme stratejisini** karşılaştırdık:

| Strateji            | Namespace yok (global)                         | Namespace var (kapsamlı/scoped)                                          |
| :------------------ | :--------------------------------------------- | :----------------------------------------------------------------------- |
| **Statik yükleme**  | **Static**: Başlangıçta her şey bellekte.      | **Scoped static**: Namespace'e göre bölünmüş; başlangıçta her şey yüklü. |
| **Dinamik yükleme** | **Dynamic**: Dil başına istek üzerine yükleme. | **Scoped dynamic**: Namespace ve dil başına hassas yükleme.              |

## Strateji özeti

- **Static**: Basit; başlangıç yüklemesinden sonra ağ gecikmesi yok. Dezavantajı: büyük paket boyutu.
- **Dynamic**: Başlangıç ağırlığını azaltır (lazy-loading). Birçok diliniz olduğunda idealdir.
- **Scoped static**: Karmaşık ek ağ istekleri olmadan kodu düzenli tutar (mantıksal ayrım).
- **Scoped dynamic**: _Kod bölme_ ve performans için en iyi yaklaşım. Yalnızca geçerli görünüm ve aktif dil için gerekenleri yükleyerek belleği minimize eder.

### Neyi ölçtüm:

Her yığın için gerçek bir tarayıcıda aynı çok dilli uygulamayı çalıştırdım, ardından ağda gerçekte neyin göründüğünü ve işlerin ne kadar sürdüğünü not ettim. Boyutlar, insanların gerçekte ne indirdiğine ham kaynak sayımlarından daha yakın olduğu için **normal web sıkıştırmasından sonra** rapor edilir.

- **Uluslararasılaştırma kütüphanesi boyutu**: Paketleme, tree-shaking ve minifikasyondan sonra, i18n kütüphanesinin boyutu boş bir bileşendeki provider'lar + composable'lar kodunun boyutudur. Çeviri dosyalarının yüklenmesini içermez. İçeriğiniz devreye girmeden önce kütüphanenin ne kadar "pahalı" olduğunu yanıtlar.

- **Sayfa başına JavaScript**: Her benchmark rotası için, tarayıcının o ziyaret için çektiği script miktarı, paketteki sayfalar (ve diller) genelinde ortalaması alınmıştır. Ağır sayfalar yavaş sayfalardır.

- **Diğer dillerden sızıntı (Leakage)**: Aynı sayfanın ancak denetlenen sayfada yanlışlıkla yüklenecek olan başka bir dildeki içeriğidir. Bu içerik gereksizdir ve kaçınılmalıdır (örneğin: `/en/about` sayfa paketindeki `/fr/about` sayfa içeriği).

- **Diğer rotalardan sızıntı**: Uygulamadaki **diğer ekranlar** için de aynı fikir: yalnızca bir sayfa açtığınızda metinlerinin gelip gelmediği (örneğin: `/en/contact` sayfa paketindeki `/en/about` sayfa içeriği). Yüksek puan, zayıf bölme veya aşırı geniş paketlere işaret eder.

- **Ortalama bileşen paket boyutu**: Yaygın UI parçaları, devasa bir uygulama sayısının içinde saklanmak yerine **tek tek** ölçülür. Uluslararasılaştırmanın günlük bileşenleri sessizce şişirip şişirmediğini gösterir. Örneğin, bileşeniniz yeniden render edilirse, tüm bu verileri bellekten yükleyecektir. Herhangi bir bileşene devasa bir JSON eklemek, bileşenlerinizin performansını yavaşlatacak büyük bir kullanılmayan veri deposu bağlamak gibidir.

- **Dil değiştirme hızı**: Uygulamanın kendi kontrolünü kullanarak dili değiştiriyorum ve sayfanın net bir şekilde değiştiği ana kadar geçen süreyi ölçüyorum (bir ziyaretçinin fark edeceği şey).

- **Dil değişikliğinden sonra render işi**: Daha hassas bir takip: geçiş başladıktan sonra arayüzün yeni dil için yeniden çizilmek için ne kadar çaba sarf ettiği. "Hissedilen" süre ve framework maliyeti farklılaştığında kullanışlıdır.

- **İlk sayfa yükleme süresi**: Navigasyondan tarayıcının test ettiğim senaryolar için sayfayı tamamen yüklendi kabul ettiği ana kadar. Soğuk başlangıçları karşılaştırmak için iyidir.

- **Hidrasyon süresi (Hydration)**: İstemcinin sunucu HTML'ini etkileşimli bir arayüze dönüştürmek için harcadığı süre. Tablolardaki tire, bu uygulamanın bu benchmark'ta güvenilir bir hidrasyon figürü sağlamadığı anlamına gelir.

## GitHub Yıldızları

GitHub yıldızları, bir projenin popülerliğinin, topluluk güveninin ve uzun vadeli alakasının güçlü bir göstergesidir. Teknik kalitenin doğrudan bir ölçüsü olmasa da, kaç geliştiricinin projeyi yararlı bulduğunu, ilerlemesini takip ettiğini ve benimseme olasılığını yansıtır. Bir projenin değerini tahmin etmek için yıldızlar, alternatifler arasındaki çekişi karşılaştırmaya yardımcı olur ve ekosistem büyümesi hakkında içgörüler sağlar.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Cfluent-vue%2Ffluent-vue%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&fluent-vue/fluent-vue&aymericzip/intlayer)

## Detaylı sonuçlar

### 1 — Kaçınılması gereken çözümler

> Vue ekosisteminde kaçınılması gereken net bir çözüm yoktur.

### 2 — Kabul edilebilir çözümler

**(vue-i18n)** (`vue-i18n@11.4.0`):

- **vue-i18n** tartışmasız Vue için en çok kullanılan i18n kütüphanesidir, birçok özelliği ve devasa bir ekosistemi vardır. Ancak kaputun altında çözüm oldukça ağırdır. vue-i18n mesajlar için lazy loading entegre etse bile, kapsam (scoping) özelliği eksiktir. Klasik bir Vue SPA uygulaması durumunda sorun yoktur, ancak @nuxt/i18n kullanan bir nuxt uygulaması için, tüm sayfalardan gelen mesajların tek bir sayfaya dahil edilmesine yol açar. 10'dan fazla sayfa içeren büyük bir nuxt uygulaması için bu gerçekten sorunlu olabilir.

Paket çok ağırdır (~24.3kb, bu da `vue-intlayer`'ın yaklaşık 9 katıdır).

**(fluent-vue)** (`fluent-vue@0.5.0`):

- **fluent-vue** .ftl formatı aracılığıyla yenilikçi bir girişim sunar. Mesaj organizasyonu harikadır, başlaması daha kolaydır. Ancak pratikte tip güvenliği eksikliği hata riskini artırır ve hata ayıklaması hızla zaman alıcı hale gelebilir. Dahası, bu çözüm mesajları her sayfada her dildeki tüm içeriğin yüklenmesini zorlayan bir vite eklentisi kullanarak yükler. Ek olarak, bu son derece ağır bir çözümdür (~92.7kb, bu da `vue-intlayer`'ın yaklaşık 34 katıdır).

### 3 — Öneriler

**(Intlayer)** (`vue-intlayer@8.7.12`):

Kendi çözümüm olduğu için tarafsızlık adına `vue-intlayer`'ı kişisel olarak yargılamayacağım.
