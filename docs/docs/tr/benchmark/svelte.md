---
createdAt: 2026-04-20
updatedAt: 2026-05-18
title: 2026'da Svelte için En İyi i18n Çözümü - Benchmark Raporu
description: svelte-i18n, Paraglide ve Intlayer gibi Svelte uluslararasılaştırma (i18n) kütüphanelerini karşılaştırın. Paket boyutu, sızıntı ve reaktivite üzerine ayrıntılı performans raporu.
keywords:
  - benchmark
  - i18n
  - intl
  - svelte
  - performans
  - intlayer
slugs:
  - doc
  - benchmark
  - svelte
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-svelte-template
history:
  - version: 8.9.8
    date: 2026-05-18
    changes: "GitHub yıldız karşılaştırması ekle"
  - version: 8.7.12
    date: 2026-01-06
    changes: "Benchmark başlatıldı"
---

# Svelte i18n Kütüphaneleri - 2026 Benchmark Raporu

Bu sayfa, Svelte üzerindeki i18n çözümleri için bir benchmark raporudur.

## İçindekiler

<Toc/>

## İnteraktif Benchmark

<I18nBenchmark framework="vite-svelte" vertical/>

## Sonuç referansı:

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_svelte.md"
width="100%"
height="600px"
style="border:none;"
/>

> [Tam kıyaslama verilerini görün](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_svelte.md)

Tüm benchmark deposunu [burada](https://github.com/intlayer-org/benchmark-i18n/tree/main) görebilirsiniz.

## Giriş

Uluslararasılaştırma çözümleri, bir Svelte uygulamasındaki en ağır bağımlılıklar arasındadır. Ana risk, gereksiz içerik göndermektir: tek bir rota paketinde diğer sayfalar ve diğer diller için çeviriler.

Uygulamanız büyüdükçe, bu sorun istemciye gönderilen JavaScript'i hızla büyütebilir ve navigasyonu yavaşlatabilir.

Pratikte, en az optimize edilmiş uygulamalar için, uluslararasılaştırılmış bir sayfa i18n olmayan sürümden birkaç kat daha ağır olabilir.

Diğer etki geliştirici deneyimi (DX) üzerindedir: içeriği nasıl tanımladığınız, tipler, namespace organizasyonu, dinamik yükleme ve dil değiştiğinde reaktivite.

## TL;DR

- **Intlayer**: En küçük ayak izine sahip en performans odaklı seçim (v8.7.12).
- **Paraglide**: Tree-shaking için güçlü bir rakip ancak daha karmaşık bir geliştirici deneyimine ve reaktivite yüküne sahip.
- **svelte-i18n**: Svelte için kapsamlı ve standart, ancak çok daha büyük paket ağırlığı taşıyor (~7x Intlayer).

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

`t('a.b.c')` etrafında inşa edilen söz dizimleri çok kullanışlıdır ancak genellikle çalışma zamanında büyük JSON nesnelerini tutmayı teşvik eder. Bu model, kütüphane sayfa başına gerçek bir bölme stratejisi sunmadıkça tree-shaking'i zorlaştırır.

## Araştırma Metodolojisi

Bu benchmark için aşağıdaki kütüphaneleri karşılaştırdık:

- `Base App` (i18n kütüphanesi yok)
- `svelte-intlayer` (v8.7.12)
- `svelte-i18n` (v4.0.1)
- `@inlang/paraglide-js` (v2.17.0)

Framework, **10 sayfa** ve **10 dilden** oluşan çok dilli bir uygulamaya sahip `Svelte`'dir.

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

## GitHub Yıldızları

GitHub yıldızları, bir projenin popülerliğinin, topluluk güveninin ve uzun vadeli alakasının güçlü bir göstergesidir. Teknik kalitenin doğrudan bir ölçüsü olmasa da, kaç geliştiricinin projeyi yararlı bulduğunu, ilerlemesini takip ettiğini ve benimseme olasılığını yansıtır. Bir projenin değerini tahmin etmek için yıldızlar, alternatifler arasındaki çekişi karşılaştırmaya yardımcı olur ve ekosistem büyümesi hakkında içgörüler sağlar.

[![Star History Chart](https://api.star-history.com/chart?repos=kaisermann%2Fsvelte-i18n%2Copral%2Fparaglide-js%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#kaisermann/svelte-i18n&opral/paraglide-js&aymericzip/intlayer)

## Detaylı sonuçlar

### 1 - Kaçınılması gereken çözümler

> Svelte ekosisteminde kaçınılması gereken net bir çözüm yoktur.

### 2 - Kabul edilebilir çözümler

**(Paraglide)** (`@inlang/paraglide-js@2.17.0`):

`Paraglide` yenilikçi ve iyi düşünülmüş bir yaklaşım sunuyor. Bir Vite + Svelte uygulaması bağlamında, şirketlerinin reklamını yaptığı tree-shaking beklendiği gibi çalıştı, bu harika.
Ancak React + TanStack Start durumunda tree-shaking beklendiği gibi çalışmadı, Next.js için de aynı durum geçerli. Bununla birlikte, Paraglide'ın Svelte ve TanStack Start projesindeki kullanımı bir kez daha kontrol edilmeye değer olacaktır.
İş akışı ve DX de diğer seçeneklerden daha karmaşıktır.
Kişisel olarak her push'tan önce JS dosyalarını yeniden oluşturmak zorunda kalmanın hayranı değilim, bu da PR'lar aracılığıyla sürekli bir birleştirme çakışması riski yaratıyor. Araç ayrıca Next.js'ten ziyade Vite'e daha fazla odaklanmış görünüyor.
Son olarak, diğer çözümlerle karşılaştırıldığında Paraglide, içeriği işlemek için geçerli dili almak için bir store (örneğin Svelte store) kullanmaz. Ayrıştırılan her düğüm için localStorage / cookie vb.'den dili isteyecektir. Bu, bileşen reaktivitesini etkileyen gereksiz mantık yürütülmesine yol açar.

> Paraglide üzerine not: çözüm, importlar için kod tabanınıza kod enjekte eder; sonuç olarak, benchmark raporundaki 'lib size' metriği neredeyse 0'dır. Kod üretimi iyi bir şeydir, çünkü kullanılan fonksiyon yalnızca gerekli mantığı (her yerde ön ek vs ön ek yok, çerez vs depolama vb.) içerecektir. Karşılaştırma yapıldığında, Intlayer bu filtrelemeyi mantığa bağlı olarak içeriği tree-shaking yapmaya zorlamak için build sırasında ortam değişkeni enjeksiyonları yoluyla gerçekleştirir. Bu sayede paraglide ve intlayer i18next veya next-intl'den 6 ila 10 kat daha hafif çözümler haline gelir.

**(svelte-i18n)** (`svelte-i18n@3.4.0`):

Bu çözüm, bir Svelte projesindeki tüm i18n ihtiyaçlarını karşılar. Ancak i18next veya diğer büyük i18n çözümlerinde olduğu gibi, biraz ağırdır (~15.9kb, bu da `svelte-intlayer`'ın yaklaşık 7 katıdır).

### 3 - Öneriler

**(Intlayer)** (`svelte-intlayer@8.7.12`):

Kendi çözümüm olduğu için tarafsızlık adına `svelte-intlayer`'ı kişisel olarak yargılamayacağım.

### Kişisel not

Bu not kişiseldir ve benchmark sonuçlarını etkilemez. Yine de, i18n dünyasında çevrilmiş içerik için genellikle `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` gibi bir desen etrafında fikir birliği görürsünüz.

Svelte uygulamalarında, bir fonksiyonu `Slot` olarak enjekte etmek benim görüşüme göre bir anti-desendir. Ayrıca kaçınılabilir bir karmaşıklık ve JavaScript yürütme yükü ekler (zar zor fark edilse bile).
