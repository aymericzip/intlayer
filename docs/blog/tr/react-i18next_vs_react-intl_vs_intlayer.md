---
createdAt: 2025-09-07
updatedAt: 2026-09-27
priority: 9
title: react-i18next vs react-intl vs Intlayer
description: react-i18next'i next-intl ve Intlayer ile React uygulamasının uluslararasılaştırması (i18n) için entegre edin
keywords:
  - next-intl
  - react-i18next
  - Intlayer
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - react-i18next-vs-react-intl-vs-intlayer
author: aymericzip
---

# react-Intl VS react-i18next VS intlayer

Bu rehber, **React** için üç yerleşik i18n seçeneğini karşılaştırır: **react-intl** (FormatJS), **react-i18next** (i18next) ve **Intlayer**.
**Düz React** uygulamalarına (örneğin, Vite, CRA, SPA) odaklanıyoruz. Next.js kullanıyorsanız, özel Next.js karşılaştırmamıza bakın.

Şunları değerlendiriyoruz:

- Mimari ve içerik organizasyonu
- TypeScript ve güvenlik
- Eksik çeviri işleme
- Zengin içerik ve formatlama yetenekleri
- Performans ve yükleme davranışı
- Geliştirici deneyimi (DX), araçlar ve bakım
- SEO/yönlendirme (çerçeve bağımlı)

<TOC/>

> **tl;dr**: Üçü de bir React uygulamasını yerelleştirebilir. **Bileşen kapsamlı içerik**, **katı TypeScript türleri**, **derleme zamanı eksik anahtar kontrolleri**, **ağaç sallanan sözlükler** ve yerleşik düzenleme araçları (Görsel Düzenleyici/CMS + isteğe bağlı AI çeviri) istiyorsanız, **Intlayer** modüler React kod tabanları için en kapsamlı seçimdir.

## Yüksek düzey konumlandırma

- **react-intl** - ICU-ilk, standartlara uygun formatlama (tarihler/sayılar/çoğullar) olgun bir API ile. Kataloglar genellikle merkezi; anahtar güvenliği ve derleme zamanı doğrulama büyük ölçüde sizin sorumluluğunuzdur.
- **react-i18next** - Son derece popüler ve esnek; ad alanları, detektörler ve birçok eklenti (ICU, arka uçlar). Güçlü, ancak yapılandırma projeler büyüdükçe yayılabilir.
- **Intlayer** - React için bileşen merkezli içerik modeli, **katı TS yazımı**, **derleme zamanı kontrolleri**, **ağaç sallama**, artı **Görsel Düzenleyici/CMS** ve **AI destekli çeviriler**. React Router, Vite, CRA vb. ile çalışır.

> Bu kütüphanelerin nereden geldiğini anlamak için JavaScript i18n tarihini okuyun.

- [JavaScript i18n tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md)

## Özellik matrisi (React odaklı)

| Özellik                                              | `react-intlayer` (Intlayer)                                                                                                                                     | `react-i18next` (i18next)                                                                                            | `react-intl` (FormatJS)                                                                            |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Bileşenlere Yakın Çeviriler**                      | ✅ Evet, içerik her bileşenle birlikte yerleştirilir                                                                                                            | ❌ Hayır                                                                                                             | ❌ Hayır                                                                                           |
| **TypeScript Entegrasyonu**                          | ✅ Gelişmiş, otomatik olarak oluşturulan katı türler                                                                                                            | ⚠️ Temel; güvenlik için ekstra yapılandırma                                                                          | ✅ İyi, ancak daha az katı                                                                         |
| **Eksik Çeviri Algılama**                            | ✅ TypeScript hata vurgulaması ve derleme zamanı hata/uyarı                                                                                                     | ⚠️ Çoğunlukla çalışma zamanında geri dönüş dizeleri                                                                  | ⚠️ Geri dönüş dizeleri                                                                             |
| **Zengin İçerik (JSX/Markdown/bileşenler)**          | ✅ Doğrudan destek                                                                                                                                              | ⚠️ Sınırlı / sadece enterpolasyon                                                                                    | ⚠️ ICU sözdizimi, gerçek JSX değil                                                                 |
| **AI destekli Çeviri**                               | ✅ Evet, birden fazla AI sağlayıcısını destekler. Kendi API anahtarlarınızı kullanarak kullanılabilir. Uygulamanızın bağlamını ve içerik kapsamını dikkate alır | ❌ Hayır                                                                                                             | ❌ Hayır                                                                                           |
| **Görsel Düzenleyici**                               | ✅ Evet, yerel Görsel Düzenleyici + isteğe bağlı CMS; kod tabanı içeriğini dışa aktarabilir; gömülebilir                                                        | ❌ Hayır / harici yerelleştirme platformları aracılığıyla mevcut                                                     | ❌ Hayır / harici yerelleştirme platformları aracılığıyla mevcut                                   |
| **Yerelleştirilmiş Yönlendirme**                     | ✅ Evet, kutudan çıkar çıkmaz yerelleştirilmiş yolları destekler (Next.js ve Vite ile çalışır)                                                                  | ⚠️ Yerleşik değil, eklentiler gerektirir (örneğin `next-i18next`) veya özel yönlendirici yapılandırması              | ❌ Hayır, sadece mesaj formatlaması, yönlendirme manuel olmalı                                     |
| **Dinamik Yol Oluşturma**                            | ✅ Evet                                                                                                                                                         | ⚠️ Eklenti/ekosistem veya manuel kurulum                                                                             | ❌ Sağlanmadı                                                                                      |
| **Çoğullaştırma**                                    | ✅ Numaralandırma tabanlı desenler                                                                                                                              | ✅ Yapılandırılabilir (i18next-icu gibi eklentiler)                                                                  | ✅ (ICU)                                                                                           |
| **Formatlama (tarihler, sayılar, para birimleri)**   | ✅ Optimize edilmiş formatlayıcılar (Intl altında)                                                                                                              | ⚠️ Eklentiler veya özel Intl kullanımı aracılığıyla                                                                  | ✅ ICU formatlayıcıları                                                                            |
| **İçerik Formatı**                                   | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml WIP)                                                                                                                | ⚠️ .json                                                                                                             | ✅ .json, .js                                                                                      |
| **ICU desteği**                                      | ⚠️ WIP                                                                                                                                                          | ⚠️ Eklenti aracılığıyla (i18next-icu)                                                                                | ✅ Evet                                                                                            |
| **SEO Yardımcıları (hreflang, site haritası)**       | ✅ Yerleşik araçlar: site haritası, robots.txt, meta veri için yardımcılar                                                                                      | ⚠️ Topluluk eklentileri/manuel                                                                                       | ❌ Çekirdek değil                                                                                  |
| **Ekosistem / Topluluk**                             | ⚠️ Daha küçük ama hızlı büyüyen ve reaktif                                                                                                                      | ✅ En büyük ve olgun                                                                                                 | ✅ Büyük                                                                                           |
| **Sunucu Tarafı Oluşturma ve Sunucu Bileşenleri**    | ✅ Evet, SSR / React Server Components için kolaylaştırılmış                                                                                                    | ⚠️ Sayfa düzeyinde desteklenir ancak alt sunucu bileşenleri için t-fonksiyonlarını bileşen ağacında geçmeniz gerekir | ❌ Desteklenmiyor, alt sunucu bileşenleri için t-fonksiyonlarını bileşen ağacında geçmeniz gerekir |
| **Ağaç sallama (yalnızca kullanılan içeriği yükle)** | ✅ Evet, Babel/SWC eklentileri aracılığıyla derleme zamanında bileşen başına                                                                                    | ⚠️ Genellikle hepsini yükler (ad alanları/kod bölme ile iyileştirilebilir)                                           | ⚠️ Genellikle hepsini yükler                                                                       |
| **Tembel yükleme**                                   | ✅ Evet, yerel / sözlük başına                                                                                                                                  | ✅ Evet (örneğin, arka uçlar/ad alanları isteğe bağlı)                                                               | ✅ Evet (bölünmüş yerel paketler)                                                                  |
| **Kullanılmayan içeriği temizle**                    | ✅ Evet, derleme zamanında sözlük başına                                                                                                                        | ❌ Hayır, sadece manuel ad alanı segmentasyonu aracılığıyla                                                          | ❌ Hayır, tüm beyan edilen mesajlar paketlenir                                                     |
| **Büyük Projelerin Yönetimi**                        | ✅ Modüler teşvik eder, tasarım sistemi için uygundur                                                                                                           | ⚠️ İyi dosya disiplini gerektir                                                                                      | ⚠️ Merkezi kataloglar büyük olabilir                                                               |

## Derinlemesine karşılaştırma

### 1) Mimari ve ölçeklenebilirlik

- **react-intl / react-i18next**: Çoğu kurulum dil başına **merkezi yerel klasörleri** korur, bazen **ad alanlarına** göre bölünür (i18next). Başlangıçta iyi çalışır ancak uygulamalar büyüdükçe paylaşılan bir yüzey alanı haline gelir.
- **Intlayer**: Hizmet ettikleri UI ile birlikte **bileşen başına (veya özellik başına) sözlükleri** teşvik eder. Bu, sahipliği net tutar, bileşenlerin çoğaltılmasını/migrasyonunu kolaylaştırır ve ekip arası anahtar karmaşasını azaltır. Kullanılmayan içerik daha kolay tespit edilir ve kaldırılır.

**Neden önemli:** Modüler içerik modüler UI'yi yansıtır. Büyük React kod tabanları, çeviriler bileşenlerle birlikte yaşadığında daha temiz kalır.

### 2) TypeScript ve güvenlik

- **react-intl**: Sağlam yazımlar, ancak **otomatik anahtar yazımı yok**; güvenlik desenlerini kendiniz uygularsınız.
- **react-i18next**: Hook'lar için güçlü yazımlar; **katı anahtar yazımı** genellikle ekstra yapılandırma veya oluşturucular gerektirir.
- **Intlayer**: İçeriğinizden **katı türler oluşturur**. IDE otomatik tamamlama ve **derleme zamanı hataları** çalışma zamanından önce yazım hatalarını ve eksik anahtarları yakalar.

**Neden önemli:** Başarısızlıkları **sol** (derleme/CI) kaydırmak üretim sorunlarını azaltır ve geliştirici geri bildirim döngülerini hızlandırır.

### 3) Eksik çeviri işleme

- **react-intl / react-i18next**: **Çalışma zamanı geri dönüşlerine** varsayılan (anahtar yankısı veya varsayılan yerel). Linting/eklentiler ekleyebilirsiniz, ancak derlemede garanti edilmez.
- **Intlayer**: Gerekli yerel/anahtarlar eksik olduğunda **derleme zamanı algılama** ile uyarılar veya hatalar.

**Neden önemli:** Eksik dizeler üzerinde CI başarısızlığı, "gizem İngilizce"nin İngilizce olmayan UI'lere sızmasını önler.

### 4) Zengin içerik ve formatlama

- **react-intl**: Çoğullar, seçerler, tarihler/sayılar ve mesaj kompozisyonu için mükemmel **ICU** desteği. JSX kullanılabilir, ancak zihinsel model mesaj merkezli kalır.
- **react-i18next**: Esnek enterpolasyon ve öğeler/bileşenler gömmek için **`<Trans>`**; ICU eklenti aracılığıyla mevcut.
- **Intlayer**: İçerik dosyaları **zengin düğümler** (JSX/Markdown/bileşenler) ve **meta veri** içerebilir. Formatlama Intl altında kullanılır; çoğul desenler ergonomiktir.

**Neden önemli:** Karmaşık UI metinleri (bağlantılar, kalın parçalar, satır içi bileşenler), kütüphane React düğümlerini temiz bir şekilde benimsediğinde daha kolaydır.

### 5) Performans ve yükleme davranışı

- **react-intl / react-i18next**: Genellikle **katalog bölme** ve **tembel yükleme** yi manuel olarak yönetirsiniz (ad alanları/dinamik içe aktarmalar). Etkili ancak disiplin gerektirir.
- **Intlayer**: Kullanılmayan sözlükleri **ağaç sallar** ve **sözlük başına/yere göre tembel yükleme** yi kutudan çıkarır.

**Neden önemli:** Daha küçük paketler ve daha az kullanılmayan dize başlatma ve navigasyon performansını iyileştirir.

Aşağıdaki grafik, sayfa başına yaklaşık 30 KB metin içeren, 1 ila 10 sayfadan oluşan ve 1 ila 10 dile çevrilmiş teorik bir uygulamanın içerik yükünü tahmin eder. İçeriği locale bazında dinamik yüklemek dil eksenini ortadan kaldırır, içeriği bileşen veya rota bazında sınırlamak sayfa eksenini ortadan kaldırır ve yalnızca ikisinin birleşimi yükü sabit tutar.

![Mimariye göre teorik içerik sızıntısı](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

#### React üzerinde benchmark sonuçları (TanStack Start / Vite)

TanStack Start üzerinde standart React implementasyonlarını ölçen [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) verileri:

<I18nBenchmark framework="tanstack" vertical/>

| Library            | Strategy | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity | Hydration |
| ------------------ | -------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (no i18n) | -        |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |         8.1 ms |   21.6 ms |
| `react-i18next`    | dynamic  |       18.4 KB |         136.4 KB |       23.1% |     89.8% |            24.8 KB |       123.1 ms |   32.9 ms |
| **`intlayer`**     | dynamic  |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** |     **3.6 ms** |   14.1 ms |

<ClickToOpenIframe
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
  width="100%"
  height="600px"
  style="border:none;"
/>

> Tam tablo için [TanStack Start benchmark raporu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md) ve [i18n Benchmark Genel Bakış](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md) sayfalarına bakın.

- [TanStack Start benchmark raporu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md)
- [i18n Benchmark Genel Bakış](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md)

### 6) DX, araçlar ve bakım

- **react-intl / react-i18next**: Geniş topluluk ekosistemi; düzenleme iş akışları için genellikle harici yerelleştirme platformlarını benimser.
- **Intlayer**: **Ücretsiz Görsel Düzenleyici** ve **isteğe bağlı CMS** gönderir (içeriği Git'te tutun veya dışa aktarın). Ayrıca içerik yazımı için **VSCode uzantısı** ve kendi sağlayıcı anahtarlarınızı kullanarak **AI destekli çeviri**.

**Neden önemli:** Yerleşik araçlar geliştiriciler ve içerik yazarları arasındaki döngüyü kısaltır - daha az yapıştırıcı kod, daha az satıcı bağımlılığı.

## Hangisini ne zaman seçmeli?

- **react-intl**'i seçin eğer **ICU-ilk** mesaj formatlaması istiyorsanız, standartlara uygun bir API ile ve ekibiniz katalogları ve güvenlik kontrollerini manuel olarak sürdürmekle rahat.
- **react-i18next**'i seçin eğer **i18next'in ekosisteminin genişliğine** ihtiyacınız varsa (detektörler, arka uçlar, ICU eklentisi, entegrasyonlar) ve esnekliği kazanmak için daha fazla yapılandırma kabul ediyorsanız.
- **Intlayer**'ı seçin eğer **bileşen kapsamlı içerik**, **katı TypeScript**, **derleme zamanı garantileri**, **ağaç sallama** ve **pil dahil** düzenleme araçlarını takdir ediyorsanız - özellikle **büyük, modüler** React uygulamaları, tasarım sistemleri vb. için.

## `react-intl` ve `react-i18next` ile birlikte çalışabilirlik

`intlayer`, `react-intl` ve `react-i18next` ad alanlarınızı yönetmenize de yardımcı olabilir.

`intlayer` kullanarak, içeriğinizi favori i18n kütüphanenizin formatında beyan edebilirsiniz ve intlayer ad alanlarınızı istediğiniz konumda oluşturacaktır (örnek: `/messages/{{locale}}/{{namespace}}.json`).

## Ek kaynaklar ve benchmark'lar

- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18next_vs_intlayer-i18next.md)
- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/next-intl_vs_intlayer.md)
- [Bundle optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md)
- [Intlayer derleyicisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md)

Benchmark raporları:

- [i18n Benchmark Genel Bakış](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md)
- [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md)
- [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/nextjs.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/vue.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/solid.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/svelte.md)

## GitHub YILDIZLARI

GitHub yıldızları, bir projenin popülaritesinin, topluluk güveninin ve uzun vadeli öneminin güçlü bir göstergesidir. Teknik kalitenin doğrudan bir ölçüsü olmasa da, kaç geliştiricinin projeyi yararlı bulduğunu, ilerlemesini takip ettiğini ve muhtemelen benimsediğini yansıtır. Bir projenin değerini tahmin etmek için yıldızlar, alternatifler arasındaki çekişmeyi karşılaştırmaya ve ekosistem büyümesine ilişkin içgörüler sağlamaya yardımcı olur.

[![Yıldız Geçmişi Grafiği](https://api.star-history.com/chart?repos=formatjs/formatjs%2Ci18next/react-i18next%2Caymericzip/intlayer&type=date&legend=top-left)](https://star-history.com/#formatjs/formatjs&i18next/react-i18next&aymericzip/intlayer)

## Commit etkinliği

Yıldızlar popülerliği gösterir. Commit sayısı ise bir projeye ne kadar emek verildiğini gösterir. Bu yazı yazıldığında Intlayer yaklaşık 7.500 commit içeriyor; bu, burada karşılaştırılan kütüphanelerin çoğundan fazla ve `next-intl` ya da `next-i18next` kütüphanesinin yaklaşık 5 katı.

<GithubCommits repositories="formatjs/formatjs,i18next/react-i18next,aymericzip/intlayer" />

> Intlayer bir monorepo olduğundan bu sayı her framework paketini, CLI'yi ve dokümantasyonu kapsar. Commit sayısını kalitenin değil, etkinliğin bir göstergesi olarak okuyun.

## npm indirmeleri

<NpmDownloads packages="react-i18next,react-intl,react-intlayer" period="last-6-months" />

İndirme sayıları en iyi çözümleri değil, en eski çözümleri ödüllendirir. Yıllar önce yayımlanmış bir kütüphane, onu o zaman seçen her proje, her CI çalışması ve ona bağımlı her paket tarafından hâlâ kurulur. Bu sayı yeni bir tercihten çok ataleti ölçer.

Yapay zekâ asistanları bu etkiyi büyütür. `next-intl`, `i18next` ve `vue-i18n` eğitildikleri kodun her yerinde bulunduğu için, alternatifleri karşılaştırmadan bunları varsayılan olarak önerirler. Her öneri indirme sayısını artırır, bu da bir sonraki öneriyi besler. İndirme sayısına değil, benchmark sonuçlarına göre karşılaştırın.

## Sonuç

Üç kütüphane de React'i etkili bir şekilde yerelleştirir. Farklılaştırıcı, **güvenli, ölçeklenebilir** bir kurulum elde etmek için ne kadar **altyapı** inşa etmeniz gerektiğidir:

- **Intlayer** ile, **modüler içerik**, **katı TS yazımı**, **derleme zamanı güvenliği**, **ağaç sallanan paketler** ve **düzenleme araçları** varsayılanlardır - görevler değildir.
- Ekibiniz çok yerel, bileşen odaklı React uygulamalarında **bakım ve hızı** takdir ediyorsa, Intlayer bugün **en kapsamlı** geliştirici ve içerik iş akışını sunar.

Daha fazla detay için ['Neden Intlayer?' dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md) bakın.

- [Neden Intlayer? Diğer i18n kütüphanelerine göre avantajları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md)
