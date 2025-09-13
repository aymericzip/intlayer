---
createdAt: 2025-09-07
updatedAt: 2025-09-07
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
---

# react-Intl VS react-i18next VS intlayer | React Uluslararasılaştırma (i18n)

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

> **tl;dr**: Üçü de bir React uygulamasını yerelleştirebilir. **Bileşen kapsamlı içerik**, **katı TypeScript türleri**, **derleme zamanı eksik anahtar kontrolleri**, **ağaç sallanan sözlükler** ve yerleşik düzenleme araçları (Görsel Düzenleyici/CMS + isteğe bağlı AI çeviri) istiyorsanız, **Intlayer** modüler React kod tabanları için en kapsamlı seçimdir.

---

## Yüksek düzey konumlandırma

- **react-intl** - ICU-ilk, standartlara uygun formatlama (tarihler/sayılar/çoğullar) olgun bir API ile. Kataloglar genellikle merkezi; anahtar güvenliği ve derleme zamanı doğrulama büyük ölçüde sizin sorumluluğunuzdur.
- **react-i18next** - Son derece popüler ve esnek; ad alanları, detektörler ve birçok eklenti (ICU, arka uçlar). Güçlü, ancak yapılandırma projeler büyüdükçe yayılabilir.
- **Intlayer** - React için bileşen merkezli içerik modeli, **katı TS yazımı**, **derleme zamanı kontrolleri**, **ağaç sallama**, artı **Görsel Düzenleyici/CMS** ve **AI destekli çeviriler**. React Router, Vite, CRA vb. ile çalışır.

---

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

---

## Derinlemesine karşılaştırma

### 1) Mimari ve ölçeklenebilirlik

- **react-intl / react-i18next**: Çoğu kurulum dil başına **merkezi yerel klasörleri** korur, bazen **ad alanlarına** göre bölünür (i18next). Başlangıçta iyi çalışır ancak uygulamalar büyüdükçe paylaşılan bir yüzey alanı haline gelir.
- **Intlayer**: Hizmet ettikleri UI ile birlikte **bileşen başına (veya özellik başına) sözlükleri** teşvik eder. Bu, sahipliği net tutar, bileşenlerin çoğaltılmasını/migrasyonunu kolaylaştırır ve ekip arası anahtar karmaşasını azaltır. Kullanılmayan içerik daha kolay tespit edilir ve kaldırılır.

**Neden önemli:** Modüler içerik modüler UI'yi yansıtır. Büyük React kod tabanları, çeviriler bileşenlerle birlikte yaşadığında daha temiz kalır.

---

### 2) TypeScript ve güvenlik

- **react-intl**: Sağlam yazımlar, ancak **otomatik anahtar yazımı yok**; güvenlik desenlerini kendiniz uygularsınız.
- **react-i18next**: Hook'lar için güçlü yazımlar; **katı anahtar yazımı** genellikle ekstra yapılandırma veya oluşturucular gerektirir.
- **Intlayer**: İçeriğinizden **katı türler oluşturur**. IDE otomatik tamamlama ve **derleme zamanı hataları** çalışma zamanından önce yazım hatalarını ve eksik anahtarları yakalar.

**Neden önemli:** Başarısızlıkları **sol** (derleme/CI) kaydırmak üretim sorunlarını azaltır ve geliştirici geri bildirim döngülerini hızlandırır.

---

### 3) Eksik çeviri işleme

- **react-intl / react-i18next**: **Çalışma zamanı geri dönüşlerine** varsayılan (anahtar yankısı veya varsayılan yerel). Linting/eklentiler ekleyebilirsiniz, ancak derlemede garanti edilmez.
- **Intlayer**: Gerekli yerel/anahtarlar eksik olduğunda **derleme zamanı algılama** ile uyarılar veya hatalar.

**Neden önemli:** Eksik dizeler üzerinde CI başarısızlığı, "gizem İngilizce"nin İngilizce olmayan UI'lere sızmasını önler.

---

### 4) Zengin içerik ve formatlama

- **react-intl**: Çoğullar, seçerler, tarihler/sayılar ve mesaj kompozisyonu için mükemmel **ICU** desteği. JSX kullanılabilir, ancak zihinsel model mesaj merkezli kalır.
- **react-i18next**: Esnek enterpolasyon ve öğeler/bileşenler gömmek için **`<Trans>`**; ICU eklenti aracılığıyla mevcut.
- **Intlayer**: İçerik dosyaları **zengin düğümler** (JSX/Markdown/bileşenler) ve **meta veri** içerebilir. Formatlama Intl altında kullanılır; çoğul desenler ergonomiktir.

**Neden önemli:** Karmaşık UI metinleri (bağlantılar, kalın parçalar, satır içi bileşenler), kütüphane React düğümlerini temiz bir şekilde benimsediğinde daha kolaydır.

---

### 5) Performans ve yükleme davranışı

- **react-intl / react-i18next**: Genellikle **katalog bölme** ve **tembel yükleme** yi manuel olarak yönetirsiniz (ad alanları/dinamik içe aktarmalar). Etkili ancak disiplin gerektirir.
- **Intlayer**: Kullanılmayan sözlükleri **ağaç sallar** ve **sözlük başına/yere göre tembel yükleme** yi kutudan çıkarır.

**Neden önemli:** Daha küçük paketler ve daha az kullanılmayan dize başlatma ve navigasyon performansını iyileştirir.

---

### 6) DX, araçlar ve bakım

- **react-intl / react-i18next**: Geniş topluluk ekosistemi; düzenleme iş akışları için genellikle harici yerelleştirme platformlarını benimser.
- **Intlayer**: **Ücretsiz Görsel Düzenleyici** ve **isteğe bağlı CMS** gönderir (içeriği Git'te tutun veya dışa aktarın). Ayrıca içerik yazımı için **VSCode uzantısı** ve kendi sağlayıcı anahtarlarınızı kullanarak **AI destekli çeviri**.

**Neden önemli:** Yerleşik araçlar geliştiriciler ve içerik yazarları arasındaki döngüyü kısaltır - daha az yapıştırıcı kod, daha az satıcı bağımlılığı.

---

## Hangisini ne zaman seçmeli?

- **react-intl**'i seçin eğer **ICU-ilk** mesaj formatlaması istiyorsanız, standartlara uygun bir API ile ve ekibiniz katalogları ve güvenlik kontrollerini manuel olarak sürdürmekle rahat.
- **react-i18next**'i seçin eğer **i18next'in ekosisteminin genişliğine** ihtiyacınız varsa (detektörler, arka uçlar, ICU eklentisi, entegrasyonlar) ve esnekliği kazanmak için daha fazla yapılandırma kabul ediyorsanız.
- **Intlayer**'ı seçin eğer **bileşen kapsamlı içerik**, **katı TypeScript**, **derleme zamanı garantileri**, **ağaç sallama** ve **pil dahil** düzenleme araçlarını takdir ediyorsanız - özellikle **büyük, modüler** React uygulamaları, tasarım sistemleri vb. için.

---

## `react-intl` ve `react-i18next` ile birlikte çalışabilirlik

`intlayer`, `react-intl` ve `react-i18next` ad alanlarınızı yönetmenize de yardımcı olabilir.

`intlayer` kullanarak, içeriğinizi favori i18n kütüphanenizin formatında beyan edebilirsiniz ve intlayer ad alanlarınızı istediğiniz konumda oluşturacaktır (örnek: `/messages/{{locale}}/{{namespace}}.json`).

Daha fazla detay için [`dictionaryOutput` ve `i18nextResourcesDir` seçeneklerine](https://intlayer.org/doc/concept/configuration#content-configuration) bakın.

---

## GitHub YILDIZLARI

GitHub yıldızları, bir projenin popülaritesinin, topluluk güveninin ve uzun vadeli öneminin güçlü bir göstergesidir. Teknik kalitenin doğrudan bir ölçüsü olmasa da, kaç geliştiricinin projeyi yararlı bulduğunu, ilerlemesini takip ettiğini ve muhtemelen benimsediğini yansıtır. Bir projenin değerini tahmin etmek için yıldızlar, alternatifler arasındaki çekişmeyi karşılaştırmaya ve ekosistem büyümesine ilişkin içgörüler sağlamaya yardımcı olur.

## [![Yıldız Geçmişi Grafiği](https://api.star-history.com/svg?repos=formatjs/formatjs&repos=i18next/react-i18next&repos=aymericzip/intlayer&type=Date)](https://www.star-history.com/#formatjs/formatjs&i18next/react-i18next&aymericzip/intlayer)

## Sonuç

Üç kütüphane de React'i etkili bir şekilde yerelleştirir. Farklılaştırıcı, **güvenli, ölçeklenebilir** bir kurulum elde etmek için ne kadar **altyapı** inşa etmeniz gerektiğidir:

- **Intlayer** ile, **modüler içerik**, **katı TS yazımı**, **derleme zamanı güvenliği**, **ağaç sallanan paketler** ve **düzenleme araçları** varsayılanlardır - görevler değildir.
- Ekibiniz çok yerel, bileşen odaklı React uygulamalarında **bakım ve hızı** takdir ediyorsa, Intlayer bugün **en kapsamlı** geliştirici ve içerik iş akışını sunar.

Daha fazla detay için ['Neden Intlayer?' dokümantasyonuna](https://intlayer.org/doc/why) bakın.
