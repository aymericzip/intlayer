---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "i18next vs Intlayer: 2026 Karşılaştırma ve Benchmark Testi"
description: "Next.js ve TanStack Start üzerinde Intlayer ile karşılaştırılan react-i18next ve next-i18next ölçümleri. Paket boyutu, içerik sızıntısı, dil değiştirme tepki süresi ve geliştirici deneyimi."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - Uluslararasılaştırma
  - i18n
  - Benchmark
  - Paket boyutu
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - i18next-vs-intlayer
author: aymericzip
---

# i18next VS Intlayer | React & Next.js Uluslararasılaştırma (i18n) Benchmark Karşılaştırması

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`i18next`, JavaScript ekosisteminde en yaygın kullanılan i18n kütüphanesidir. `react-i18next` ve `next-i18next` aracılığıyla çok sayıda React ve Next.js uygulamasını destekler. Intlayer ise derleyici tabanlı ve bileşen kapsamlı (component-scoped) modern bir alternatiftir.

Bu makale iki aracı özellik listeleri yerine somut ölçümlerle karşılaştırır. Rakamlar, her kütüphaneyle aynı uygulamayı oluşturan ve tarayıcının gerçekte ne indirdiğini kaydeden açık kaynaklı bir test paketi olan [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) projesinden alınmıştır.

<TOC/>

> **Özet (tl;dr)**: `i18next`, bu benchmark testindeki en ağır çalışma zamanıdır (runtime): Standart (naive) kurulumda Next.js üzerinde sayfa başına **+77 KB gzip**, tam ad alanı (namespace) ve tembel yükleme (lazy-loading) optimizasyonundan sonra bile **+22 KB** ek yük getirir. Intlayer ise yalnızca **+0.3 KB** ekler. Tamamen izole edilmiş (scoped) kurulum dışındaki tüm `i18next` yapılandırmaları, **kullanıcının bulunmadığı diğer sayfaların çeviri metinlerinin yaklaşık %90'ını sızdırır**; Intlayer ise varsayılan olarak **%0** sızıntı ile çalışır. Tembel yüklenen bir backend ile dil değiştirmek `react-i18next` ile **123-185 ms** sürerken Intlayer ile yalnızca **3-4 ms** sürmüştür. `i18next` API'sini koruyan `@intlayer/next-i18next` uyumluluk adaptörü, sayfa boyutunu orijinalin **218.5 KB** seviyesinden **150.7 KB** seviyesine düşürmüştür.

## Kısaca Özet

- **i18next / react-i18next / next-i18next** - Olgun, zengin eklenti ekosistemine sahip ve çatıdan bağımsız (framework-agnostic). Ad alanları, dil algılayıcıları, arka uçlar, eklenti üzerinden ICU ve zengin içerikler için `<Trans>` desteği sunar. İçerikler `locales/{lng}/{ns}.json` altında merkezi olarak toplanır. Güçlüdür ancak her optimizasyonu (ad alanı ayrımı, sayfa bazlı yükleme, tip güvenliği) geliştiricinin manuel olarak yapılandırmasını ve sürdürmesini gerektirir.
- **Intlayer** - Bileşen odaklı içerik modeli. `.content.ts` sözlükleri doğrudan hizmet ettikleri bileşenin yanında yer alır; derleme zamanı derleyicisi bileşen ve dil bazında ağaç budama (tree-shaking) ve tembel yükleme uygular, içerikten katı TypeScript tipleri otomatik oluşturulur ve eksik çeviriler derleme anında hata verir. Dahili middleware, SEO yardımcıları, Görsel Editör / CMS ve yapay zeka destekli çeviri sunar.

| Kütüphane               | GitHub Yıldızları                                                                                                                                                                  | Toplam Commit                                                                                                                                                                          | Son Commit                                                                                                                                              | İlk Sürüm   | NPM Sürümü                                                                                                            | NPM İndirmeleri                                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`   | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     | Nisan 2024  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           |
| `i18next/i18next`       | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)             | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             | Ocak 2012   | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             |
| `i18next/react-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/react-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) | Aralık 2015 | [![npm](https://img.shields.io/npm/v/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) | [![npm downloads](https://img.shields.io/npm/dm/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) |
| `i18next/next-i18next`  | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   | Kasım 2018  | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   |

> Rozetler otomatik olarak güncellenir. Değerler zamanla değişiklik gösterebilir.

## Özellik Karşılaştırması

| Özellik                                          | Intlayer (`react-intlayer` / `next-intlayer`)                                       | i18next (`react-i18next` / `next-i18next`)                                  |
| ------------------------------------------------ | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Bileşen yanında çeviri tanımlama**             | ✅ Evet, her bileşenle aynı dizinde `.content.ts`                                   | ❌ Hayır, `locales/{lng}/{ns}.json` altında merkezi yapı                    |
| **TypeScript entegrasyonu**                      | ✅ İçerikten otomatik olarak üretilen katı tipler                                   | ⚠️ Temel; katı anahtarlar için `CustomTypeOptions` genişletmesi gereklidir  |
| **Eksik çeviri tespiti**                         | ✅ TypeScript hatası + derleme anında hata/uyarı                                    | ⚠️ Çalışma zamanı yedeği (`saveMissing`, anahtarın kendisini döndürme)      |
| **Zengin içerik (JSX / Markdown / bileşenler)**  | ✅ Doğrudan yerel destek                                                            | ⚠️ Numaralı etiketlerle `<Trans>` bileşeni                                  |
| **ICU desteği**                                  | ⚠️ Geliştirilme aşamasında                                                          | ⚠️ Eklenti ile (`i18next-icu`)                                              |
| **Çoğullaştırma (Pluralization)**                | ✅ Numaralandırma (enum) tabanlı açık modeller                                      | ✅ `_one` / `_other` sonekleri (Intl.PluralRules)                           |
| **Biçimlendirme (tarih, sayı, para birimi)**     | ✅ `useNumber`, `useDate`, ... (yerel Intl desteği)                                 | ⚠️ İnterpolasyon biçimlendiricileri veya manuel `Intl.*` çağrıları          |
| **Yerelleştirilmiş yönlendirme ve middleware**   | ✅ Yerleşik proxy/middleware desteği, `getMultilingualUrls`                         | ⚠️ Çekirdeğe dahil değil; özel middleware veya üçüncü taraf araçlar gerekir |
| **SEO yardımcıları (hreflang, sitemap, robots)** | ✅ Yerleşik yardımcılar                                                             | ❌ Manuel kurulum gerekir                                                   |
| **Eşzamanlı sunucu bileşenleri (RSC)**           | ✅ `next-intlayer/server` altındaki `useIntlayer` tüm sunucu bileşenlerinde çalışır | ⚠️ Sayfa seviyesinde `getFixedT` çağrısı yapıp `t`'yi Props ile aktarma     |
| **Tree-shaking (yalnızca kullanılan içerik)**    | ✅ Bileşen ve dil bazında derleyici tarafından otomatik yapılır                     | ⚠️ Manuel: ad alanları + sayfa başına `ns` listesi + arka uç yapılandırması |
| **Tembel yükleme (Lazy loading)**                | ✅ `importMode: 'dynamic'` (tek satırlık yapılandırma)                              | ✅ Arka uç eklentileri aracılığıyla (`i18next-resources-to-backend` vb.)    |
| **Kullanılmayan içeriğin temizlenmesi**          | ✅ Kullanılmayan sözlükler derleme anında elenir                                    | ❌ Yerleşik destek yok                                                      |
| **Eksik çeviri testleri (CLI / CI)**             | ✅ `npx intlayer content test`                                                      | ⚠️ `i18next-parser` veya harici araçlar                                     |
| **Yapay zeka destekli çeviri**                   | ✅ Yerleşik, kendi API anahtarlarınızı kullanır                                     | ❌ Yok (Locize ayrı ve ücretli bir platformdur)                             |
| **Görsel Editör / CMS**                          | ✅ Ücretsiz Görsel Editör + isteğe bağlı CMS                                        | ❌ Yok (Locize veya harici sistemler gerektirir)                            |
| **MCP Sunucusu & Agent Skills**                  | ✅ Desteklenir                                                                      | ❌ Desteklenmez                                                             |
| **Ekosistem ve topluluk**                        | ⚠️ Daha yeni ancak hızla büyüyor                                                    | ✅ En büyük ve en olgun ekosistem                                           |

## Benchmark Testi

### Neler Ölçüldü?

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) test paketi, her kütüphane ile **birebir aynı uygulamayı** inşa eder: **10 sayfa** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 dil** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), özdeş bileşenler ve özdeş içerik. Sayfalar İngilizce (`en`) ve Fransızca (`fr`) olarak test edilir. Her kütüphane dört farklı **yükleme stratejisi** ile değerlendirilir:

| Strateji           | Açıklama                                                                                 | Tipik Kullanım Alanı                     |
| ------------------ | ---------------------------------------------------------------------------------------- | ---------------------------------------- |
| **static**         | Tüm diller ve tüm sayfalar tek pakette toplanır (`init()` içinde satır içi `resources`)  | Hızlı prototipler, yapay zeka kodları    |
| **dynamic**        | Yalnızca aktif dil arka uçtan yüklenir, ancak tüm ad alanları tek seferde gelir          | Çoğu standart proje                      |
| **scoped-static**  | Rota başına bir ad alanı ayrılır, tümü baştan ana pakete dahil edilir                    | Nadir görülen yapılandırmalar            |
| **scoped-dynamic** | Rota başına ad alanı + arka uç tembel yükleme. Yalnızca mevcut sayfa ve mevcut dil gelir | Katı performans bütçesi olan uygulamalar |

Intlayer için ayrı bir "scoped" varyantına ihtiyaç yoktur: Derleyici, içeriği **bileşen düzeyinde** otomatik olarak izole eder; bu nedenle `static` ve `dynamic` satırları zaten en iyi düzeyde optimize edilmiştir.

Her derleme için kaydedilen metrikler:

- **Lib size**: Yalnızca i18n kütüphanesini içe aktaran boş bir bileşenin gzip boyutu. Çalışma zamanının sabit maliyeti.
- **Page JS**: Sayfa başına indirilen ortalama JavaScript gzip boyutu (tüm sayfalar ve diller genelinde).
- **Locale leak %**: İndirilen JS içerisindeki, kullanıcının **görüntülemediği** bir dile ait çeviri metinlerinin oranı.
- **Page leak %**: İndirilen JS içerisindeki, kullanıcının **bulunmadığı** diğer sayfalara ait çeviri metinlerinin oranı.
- **Component avg**: İzole olarak derlenen her bir bileşenin ortalama gzip boyutu.
- **E2E reactivity**: Yeni bir dil seçimi ile DOM'da `html[lang]` etiketinin güncellenmesi arasındaki gerçek süre (Playwright, 5 deneme ortalaması).
- **Hydration**: React hidrasyon (hydration) aşamasının süresi.

> Aşağıdaki veriler `next-i18next` 16.3.0, `react-i18next` 17.0.13 ve `intlayer` 9.5.1 sürümleriyle yapılan **2026-09-12** tarihli test çalıştırmasından alınmıştır. Test uygulaması bilinçli olarak kompakt tutulmuştur; bu nedenle sızıntı yüzdeleri **yapısal bir örüntüyü** temsil eder: İçeriğiniz büyüdükçe sızıntı katlanarak artarken çalışma zamanı maliyeti sabit kalır.

### Next.js Sonuçları (`next-i18next`)

İlgilendiğiniz metrikleri ve kütüphaneleri seçin:

<I18nBenchmark framework="nextjs" vertical/>

| Kütüphane                         | Strateji       | Lib size (gz) | Page JS avg (gz) | Dil Sızıntısı | Sayfa Sızıntısı | Bileşen Ort. (gz) | E2E Tepki Süresi | Hydration |
| --------------------------------- | -------------- | ------------: | ---------------: | ------------: | --------------: | ----------------: | ---------------: | --------: |
| **base** (i18n yok)               | -              |        0.0 KB |         141.0 KB |          0.0% |            0.0% |            0.9 KB |          13.4 ms |   11.8 ms |
| `next-i18next`                    | static         |       19.7 KB |         218.5 KB |          0.0% |           89.8% |           78.5 KB |          16.4 ms |   15.6 ms |
| `next-i18next`                    | dynamic        |       19.7 KB |         169.5 KB |         50.0% |           89.8% |           26.1 KB |          15.4 ms |   27.7 ms |
| `next-i18next`                    | scoped-static  |       19.7 KB |         220.1 KB |          0.0% |           89.8% |           78.9 KB |          16.4 ms |   14.7 ms |
| `next-i18next`                    | scoped-dynamic |       19.7 KB |         163.4 KB |          0.0% |            0.0% |           27.1 KB |          15.9 ms |   15.1 ms |
| **`next-intlayer`**               | static         |    **5.5 KB** |     **141.3 KB** |      **0.0%** |        **0.0%** |        **8.5 KB** |      **15.5 ms** |   16.9 ms |
| **`next-intlayer`**               | dynamic        |    **5.5 KB** |     **141.3 KB** |      **0.0%** |        **0.0%** |        **6.9 KB** |      **15.3 ms** |   15.9 ms |
| `@intlayer/next-i18next` (uyumlu) | static         |        9.4 KB |         150.7 KB |          0.0% |            0.0% |            9.7 KB |          10.7 ms |   11.3 ms |
| `@intlayer/next-i18next` (uyumlu) | dynamic        |        9.4 KB |         150.7 KB |          0.0% |            0.0% |            9.7 KB |          11.9 ms |   10.6 ms |

**Sonuçların Analizi**

- **Çalışma zamanı maliyeti**: `i18next` çekirdeği ile `react-i18next` birlikte test edilen en ağır çalışma zamanıdır: Boş bir bileşen için **19.7 KB gzip** yer tutarken, `next-intlayer` yalnızca 5.5 KB tüketir.
- **Standart kurulum maliyetlidir**: `init()` içine `resources` doğrudan yerleştirildiğinde **sayfa başına 218.5 KB** boyuta ulaşılır; bu da temel uygulamaya göre +77.5 KB fazlalıktır. Her sayfa tüm ad alanlarını taşımak zorunda kalır.
- **Manuel optimizasyon zahmetlidir**: Bir arka uca (`dynamic`) geçmek 49 KB tasarruf sağlar ancak **başka sayfalara ait metinlerin %90'ını sızdırmaya devam eder** ve bu kurulumda indirilen metinlerin yarısı yanlış dile aittir. Rota bazlı ad alanlarına (`scoped-dynamic`) geçildiğinde sızıntı %0'a inse de ulaşılan **163.4 KB** boyutu, hiçbir manuel ayar gerektirmeyen Intlayer'ın (141.3 KB) **sayfa başına 22.4 KB üzerindedir**.
- **Bileşen boyutu**: `useTranslation()` kullanan bir bileşen 26-79 KB boyutunda derlenirken, aynı bileşen `useIntlayer()` ile yalnızca 6.9 KB yer kaplar.
- **Hidrasyon gecikmesi**: `dynamic` kurulumunda hidrasyon süresi 27.7 ms'ye yükselir; çünkü React hidrasyona başlamadan önce istemcide i18next örneğinin başlatılması ve arka uçtan veri alması gerekir.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tüm kütüphaneler ve her strateji için tam tablo [Next.js kıyaslama raporunda](https://intlayer.org/tr/doc/benchmark/nextjs).

### TanStack Start Sonuçları (`react-i18next`)

Next.js'e özgü yapılandırmaları dışarıda bırakmak adına TanStack Start üzerinde doğrudan `react-i18next` ile yapılan ölçümler:

<I18nBenchmark framework="tanstack" vertical/>

| Kütüphane           | Strateji       | Lib size (gz) | Page JS avg (gz) | Dil Sızıntısı | Sayfa Sızıntısı | Bileşen Ort. (gz) | E2E Tepki Süresi | Hydration |
| ------------------- | -------------- | ------------: | ---------------: | ------------: | --------------: | ----------------: | ---------------: | --------: |
| **base** (i18n yok) | -              |        0.0 KB |         111.0 KB |          0.0% |            0.0% |            0.7 KB |           8.1 ms |   21.6 ms |
| `react-i18next`     | static         |       18.4 KB |         180.3 KB |         50.0% |           89.8% |           24.3 KB |          12.9 ms |   85.1 ms |
| `react-i18next`     | dynamic        |       18.4 KB |         136.4 KB |         23.1% |           89.8% |           24.8 KB |         123.1 ms |   32.9 ms |
| `react-i18next`     | scoped-static  |       18.4 KB |         184.2 KB |         50.7% |           89.8% |           25.3 KB |         185.1 ms |   25.2 ms |
| `react-i18next`     | scoped-dynamic |       18.4 KB |         127.2 KB |          0.0% |            0.0% |           26.7 KB |          17.6 ms |   11.3 ms |
| **`intlayer`**      | static         |    **5.0 KB** |     **125.8 KB** |         50.0% |        **0.0%** |        **8.1 KB** |       **3.2 ms** |   11.5 ms |
| **`intlayer`**      | dynamic        |    **5.0 KB** |     **118.6 KB** |      **0.0%** |        **0.0%** |        **6.3 KB** |       **3.6 ms** |   14.1 ms |

**Sonuçların Analizi**

- Standart `react-i18next` uygulaması temel uygulamaya kıyasla sayfa başına **+69 KB** fazla kod taşır ve hidrasyon **85 ms** (temelin 4 katı) sürer; çünkü tüm kaynak ağacı ilk render öncesinde istemcide işlenir ve kaydedilir.
- **Dil değişiminde gecikme**: Kaynaklar arka uç üzerinden tembel yüklendiğinde, dili değiştirmek `html[lang]` güncellenmeden önce bir ağ gidiş-dönüşü (round-trip) gerektirir: `dynamic` modunda **123 ms**, `scoped-static` modunda **185 ms**. Intlayer ise her iki modda da DOM'u **3-4 ms** içinde günceller; dil değişimi ağ çağrılarına takılmadan anında gerçekleşir.
- Tamamen optimize edilmiş `scoped-dynamic` yapılandırması 127.2 KB seviyesine inse de, Intlayer'ın `dynamic` satırından **+8.6 KB daha ağırdır** ve bu sonuca ulaşmak için rota-ad alanı eşleme haritası, arka uç yükleyicisi ve Suspense sınırları gerekmiştir.
- Intlayer'ın `static` modu, yalnızca ilgili sayfanın bileşenleri tarafından içe aktarılan sözlükleri paketlediği için zaten **%0 sayfa sızıntısına** sahiptir. `importMode: 'dynamic'` ayarını açmak dil sızıntısını da tamamen ortadan kaldırır.
- **Bileşen boyutu**: `react-i18next` ile bileşen başına 24-27 KB iken Intlayer ile 6-8 KB seviyesindedir.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tam tablo [TanStack Start kıyaslama raporunda](https://intlayer.org/tr/doc/benchmark/tanstack).

## Fark Nereden Kaynaklanıyor? Global Örnek vs Derlenmiş Sözlükler

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`i18next`, 2012 yılında bir çalışma zamanı kütüphanesi olarak tasarlandı: Global bir örnek kaynak deposunu tutar, eklentiler bunu genişletir ve `t()` render anında anahtarları arar. Bu yapı ona yüksek esneklik kazandırsa da performans açısından ağır bir yük getirir:

```bash
.
├── i18n.ts                      # createInstance().use(...).use(...).init({...})
└── src
    ├── locales
    │   ├── en
    │   │   ├── common.json
    │   │   ├── home.json
    │   │   └── about.json
    │   └── fr
    │       ├── common.json
    │       ├── home.json
    │       └── about.json
    ├── components
    │   └── Counter.tsx          # useTranslation("about") + t("counter.label")
    └── app
        └── [locale]
            └── about
                └── page.tsx     # ["common", "about"] gerektirdiğini bilmek zorundadır
```

Global örnek, bileşenin hangi anahtarlara ihtiyaç duyacağını önceden bilemez; bu nedenle yüklemesi söylenen tüm ad alanlarını bellekte tutar. Optimizasyon yapmak **sizin** katalogları bölmenizi, **sizin** her sayfanın ihtiyaç duyduğu ad alanlarını listelemenizi ve bileşenler taşındıkça bu listeyi elle güncellemenizi gerektirir.

Maliyet iki eksende birden büyür, sayfalar ve diller:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

[Benchmark notlarında](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md) ifade edildiği gibi: "Tip güvenliğini korurken hangi sayfaya hangi ad alanının dahil edileceğini tam olarak bilmek tam bir kabustur".

Intlayer global örneği tamamen ortadan kaldırır. İçerik doğrudan bileşenin yanında tanımlanır ve derleyici bağımlılık grafiğini derleme zamanında çözer:

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx        # useIntlayer("counter")
    │       └── index.content.ts
    └── app
        └── [locale]
            └── about
                ├── page.tsx
                └── page.content.ts
```

`@intlayer/swc` / `@intlayer/babel` hangi bileşenin hangi sözlüğü kullandığını tespit eder, yalnızca bunları ve yalnızca aktif dil için paketler, kullanılmayan içerikleri eler. "scoped-dynamic" kalıbı, ekibin yönetmek zorunda olduğu bir kural yerine derlemenin otomatik bir çıktısı haline gelir.

> `dynamic` satırındaki rakamları elde etmek için `intlayer.config.ts` dosyasında `dictionary.importMode: 'dynamic'` ayarını yapmanız yeterlidir. Ayrıntılar için [paket optimizasyonu kılavuzuna](https://intlayer.org/tr/doc/concept/bundle-optimization) bakın.

## Geliştirici Deneyimi (DX)

### Kurulum Karşılaştırması

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export const initI18next = async (
  locale: string,
  namespaces: string[] = ["common"]
) => {
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
};
```

Bunun yanı sıra istemci tarafı `I18nProvider`, `generateStaticParams` ve her sayfada ad alanı dizisi tanımlanmalıdır.

</Tab>
<Tab label="Intlayer" value="intlayer">

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

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

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

export default LocaleLayout;
```

</Tab>
</Tabs>

### İstemci Bileşeni (Client Component)

<Tabs defaultTab="intlayer" group="techno">
<Tab label="react-i18next" value="i18next">

```json fileName="src/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Counter = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);
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
```

> Bu bileşeni kullanan sayfa `about` ad alanını yüklemek zorundadır ve `CustomTypeOptions` genişletilmedikçe `t("counter.label")` düz bir metinden ibarettir.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
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

```tsx fileName="src/components/Counter/index.tsx"
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

`label` ve `increment` katı tiplere sahiptir; yazım hataları anında TypeScript hatası verir ve eksik çeviriler derlemeyi durdurur.

</Tab>
</Tabs>

### Eşzamanlı Sunucu Bileşeni (Server Component)

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

export const ServerCounter = ({ t, locale, count }: ServerCounterProps) => (
  <div>
    <p>{new Intl.NumberFormat(locale).format(count)}</p>
    <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
  </div>
);
```

Sayfa seviyesinde `i18n.getFixedT(locale, "about")` çağrılmalı ve `t` ile `locale` bileşene prop olarak aktarılmalıdır.

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

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

## i18next API'sini Koruyarak Intlayer Performansına Erişin

Yukarıdaki benchmark kazanımlarını elde etmek için bileşenlerinizi sıfırdan yeniden yazmak zorunda değilsiniz. `@intlayer/i18next`, `@intlayer/react-i18next` ve `@intlayer/next-i18next` uyumluluk adaptörleri tak-çalıştır niteliğindedir: `useTranslation`, `t()`, `<Trans>`, çoğullaştırmalar ve bağlam sonekleri Intlayer derleyicisi tarafından optimize edilen sözlükler üzerinden çalışmaya devam eder.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [reactI18nextVitePlugin()],
});
```

Benchmark testinde, aynı Next.js uygulamasının uyumluluk derlemesi kodlara dokunulmadan sayfa başına **218.5 KB'tan 150.7 KB'a**, bileşen başına **78.5 KB'tan 9.7 KB'a**, sayfa sızıntısı **~%90'dan %0'a** gerilemiş ve hidrasyon süresi 15.6 ms'den 11.3 ms'ye düşmüştür. Mevcut `locales/{lng}/{ns}.json` dosyalarınız JSON senkronizasyon eklentisi sayesinde ana kaynak olarak kalabilir.

Geçiş kılavuzlarına göz atın: [i18next](https://intlayer.org/tr/doc/migration/i18next), [react-i18next](https://intlayer.org/tr/doc/migration/react-i18next), [next-i18next](https://intlayer.org/tr/doc/migration/next-i18next).

## Hangisini Ne Zaman Seçmeli?

<AccordionGroup>
<Accordion header="i18next'i Seçin">

Geniş eklenti ekosistemine (özel algılayıcılar, arka uçlar, ICU, Locize) kesin olarak ihtiyacınız varsa, React dışı alanlarda da (Node servisleri, vanilla JS, diğer çatılar) yerelleştirme yapıyorsanız, ekibiniz bu araca zaten hakimse veya harici çeviri platformunuz `locales/{lng}/{ns}.json` biçimini zorunlu kılıyorsa. Ancak performans önemliyse ad alanlarını ve rota haritalarını yönetmek için zaman ayırmayı unutmayın.

</Accordion>
<Accordion header="Intlayer'ı Seçin">

**Bileşen düzeyinde içerik**, **katı TypeScript**, **derleme zamanı eksik anahtar hataları**, **zahmetsiz tree-shaking ve lazy loading**, anında dil değişimi, eşzamanlı sunucu bileşenleri ve yerleşik düzenleme araçları ([Görsel Düzenleyici](https://intlayer.org/tr/doc/concept/editor), [CMS](https://intlayer.org/tr/doc/concept/cms), [Yapay Zeka Çevirisi](https://intlayer.org/tr/doc/concept/auto-fill), [MCP Sunucusu](https://intlayer.org/tr/doc/mcp-server)) istiyorsanız. Özellikle büyük, modüler kod tabanları ve tasarım sistemleri için uygundur.

</Accordion>
<Accordion header="@intlayer/*-i18next Adaptörlerini Seçin">

Zaten i18next kullanıyorsanız ve bileşenleri yeniden yazmadan paket ve tepkisellik kazanımlarını elde etmek istiyorsanız. `locales/{lng}/{ns}.json` dosyalarınız gerçek kaynak olarak kalır. [i18next vs @intlayer/i18next](https://intlayer.org/tr/blog/i18next-vs-intlayer-i18next) makalesinde yan yana ölçülmüştür.

</Accordion>
</AccordionGroup>

## SSS (Sıkça Sorulan Sorular)

<FAQ>

<Question title="i18next neden diğer kütüphanelere göre çok daha ağırdır?">

Framework'ten bağımsız bir çalışma zamanı olarak tasarlandı: global bir örnek, bir eklenti hattı, bir kaynak deposu, bir anahtar çözümleyici. Bu esneklik her pakete derlenir. Yalnızca kütüphaneyi içe aktaran boş bir bileşen `next-i18next` ile **19.7 KB gzip**, `next-intlayer` ile **5.5 KB** maliyete sahiptir ve bu maliyet içeriğiniz ne olursa olsun her sayfada ödenir.

</Question>

<Question title="Bir backend ile lazy loading bunu çözer mi?">

Baytları çözer, gecikmeyi çözmez. `i18next-resources-to-backend`e geçmek sayfa başına ~49 KB kazandırır ancak dil geçişine bir ağ gidiş-dönüşü ekler: `dynamic` kurulumda **123 ms**, `scoped-static` kurulumda **185 ms**, Intlayer ile **3-4 ms**. Hidrasyon da 27.7 ms'ye fırlar çünkü React hidrasyon yapmadan önce örnek kendi backend'ini çözümler.

</Question>

<Question title="i18next ile %0 içerik sızıntısına ulaşabilir miyim?">

Evet, `scoped-dynamic` ile: rota başına bir namespace, bir kaynak backend'i ve elle tuttuğunuz bir sayfa-namespace haritası. Next.js'te sayfa başına 163.4 KB'a ulaşır; bu da hiçbir yapılandırma gerektirmeyen Intlayer'ın 141.3 KB değerinden hala **+22 KB** fazladır. Bkz. [paket optimizasyonu](https://intlayer.org/tr/doc/concept/bundle-optimization).

</Question>

<Question title="Geçiş yapmak için bileşenlerimi yeniden yazmam gerekir mi?">

Hayır. `@intlayer/i18next`, `@intlayer/react-i18next` ve `@intlayer/next-i18next`; `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, `_one` / `_other` çoğulları, bağlam son ekleri ve `returnObjects`i korur. `next.config.ts` veya `vite.config.ts` içine tek bir eklenti satırı yeterlidir. [next-i18next geçiş kılavuzunda](https://intlayer.org/tr/doc/migration/next-i18next) adım adım anlatılmıştır.

</Question>

<Question title="i18next eklentilerime ne olur?">

Backend'ler ve dil algılayıcılar kabul edilir ancak devre dışı kalır: çalışma zamanında yüklenecek veya algılanacak hiçbir şey kalmaz. Dil algılama, Intlayer'ın yönlendirme yapılandırmasına dönüşür (URL öneki, çerez, başlık). Uygulamanız istek anında bir CMS'den çevirileri alıyorsa, bunun yerine [Intlayer CMS](https://intlayer.org/tr/doc/concept/cms) veya `intlayer pull` / `push` kullanın.

</Question>

</FAQ>

## İlgili Karşılaştırmalar

Aynı kıyaslama, diğer kütüphaneler:

- [next-intl vs Intlayer](https://intlayer.org/tr/blog/next-intl-vs-intlayer)
- [Lingui vs Intlayer](https://intlayer.org/tr/blog/lingui-vs-intlayer)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/tr/blog/vue-i18n-vs-intlayer-benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/tr/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/tr/blog/react-i18next-vs-react-intl-vs-intlayer)

i18next hakkında daha fazlası:

- [i18next vs @intlayer/i18next](https://intlayer.org/tr/blog/i18next-vs-intlayer-i18next), aynı uygulamada ölçülen adaptörler
- [i18next modası geçti mi?](https://intlayer.org/tr/blog/is-i18next-outdated)
- [i18next ile Intlayer Kullanımı](https://intlayer.org/tr/blog/intlayer-with-i18next) ve [react-i18next ile](https://intlayer.org/tr/blog/intlayer-with-react-i18next)
- [next-i18next ile bir Next.js uygulamasını uluslararasılaştırma](https://intlayer.org/tr/blog/nextjs-internationalization-using-next-i18next)

Referans belgeleri:

- [Next.js kıyaslama raporu](https://intlayer.org/tr/doc/benchmark/nextjs) ve [TanStack Start kıyaslama raporu](https://intlayer.org/tr/doc/benchmark/tanstack)
- Uyumluluk adaptörleri: [i18next](https://intlayer.org/tr/doc/compatibility/i18next), [react-i18next](https://intlayer.org/tr/doc/compatibility/react-i18next), [next-i18next](https://intlayer.org/tr/doc/compatibility/next-i18next)
- Geçiş kılavuzları: [i18next](https://intlayer.org/tr/doc/migration/i18next), [react-i18next](https://intlayer.org/tr/doc/migration/react-i18next), [next-i18next](https://intlayer.org/tr/doc/migration/next-i18next)
- [Paket optimizasyonu](https://intlayer.org/tr/doc/concept/bundle-optimization) ve [Intlayer derleyicisi](https://intlayer.org/tr/doc/compiler)
- [Bileşen bazlı ve merkezi i18n](https://intlayer.org/tr/blog/per-component-vs-centralized-i18n)
- [Derleyici güdümlü ve bildirimsel i18n](https://intlayer.org/tr/blog/compiler-vs-declarative-i18n)

## GitHub Yıldızları

GitHub yıldızları bir projenin popülerliğini, topluluk güvenini ve uzun vadeli sürdürülebilirliğini yansıtır. Tek başına teknik kaliteyi kanıtlamasa da, kaç geliştiricinin projeyi faydalı bulduğunu ve benimsediğini gösterir.

[![Yıldız Geçmiş Grafiği](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

## Sonuç

`i18next` hak ettiği konuma sahiptir: Her ortamda çalışır, her senaryo için bir eklentisi vardır ve 10 yılı aşkın süredir geliştirilmektedir. Ancak bu benchmark, çalışma zamanı odaklı mimarinin getirdiği maliyeti açıkça göstermektedir. Standart yapılandırma **sayfa başına +70-77 KB gzip** ek yük getirmekte, **diğer sayfalara ait içeriğin ~%90'ını sızdırmakta** ve dil değişimi **100 ms'nin üzerinde** sürmektedir. Sızıntıyı sıfıra indirmek mümkündür ancak bu da karmaşık bir manuel takip gerektirir ve yine de Intlayer'dan **9-22 KB daha ağırdır**.

Intlayer bu iş yükünü derleyiciye devreder. Bileşen başına sözlükler, dil başına tembel yükleme ve gereksiz metinlerin ayıklanması derlemenin otomatik sonuçlarıdır. Aynı uygulamada: **Sayfa başına yalnızca +0.3 KB**, **%0 sızıntı**, **3 ila 10 kat daha küçük bileşenler** ve **3-4 ms içinde dil değişimi**.

Tüm ham veriler, test uygulamaları ve otomasyon komutları [Benchmark Bloom deposunda](https://github.com/intlayer-org/benchmark-bloom) herkese açıktır. Kendiniz test edebilirsiniz.

Daha fazla bilgi için ['Neden Intlayer?' dokümanını](https://intlayer.org/tr/doc/why) inceleyin.
