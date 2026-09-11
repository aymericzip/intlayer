---
createdAt: 2026-09-09
updatedAt: 2026-09-10
title: "JavaScript i18n Tarihi: 2011'den 2026'ya"
description: "2011'den 2026'ya frontend uluslararasılaştırmasının gelişimini keşfedin. React, Vue, Next.js, Angular, Svelte ve Solid ekosistemlerindeki sürüm tarihleri, mimari zorluklar ve temel yenilikler."
keywords:
  - i18n tarihi
  - JavaScript uluslararasılaştırma
  - React i18n
  - Next.js i18n
  - Vue i18n
  - Angular i18n
  - Svelte i18n
  - Solid i18n
  - i18next
  - intlayer
slugs:
  - blog
  - history-of-js-internationalization
author: aymericzip
---

# JavaScript Uluslararasılaştırma (i18n) Tarihi

Uluslararasılaştırma yeni bir kavram değildir. JavaScript ve modern web dünyasından çok önce yazılımlar zaten birden fazla dil, para birimi, tarih biçimi ve bölgesel kuralı yönetmek zorundaydı. GEM ve Mac OS gibi ilk grafik arayüzlü işletim sistemleri 1980'lerde bu gereksinimlerin birçoğunu çözmüştü.

Aynı ilkeler zamanla backend çatılarına da taşındı. Ruby on Rails, Django, Java platformları ve PHP uygulamaları uluslararasılaştırma konusunda kendi yaklaşımlarını geliştirdi. Temel sorular oldukça netti:

- Çeviriler nerede saklanmalı?
- Tarihler, sayılar ve para birimleri nasıl biçimlendirilmeli?
- Çoğul ifadeler ve dilbilgisi farklılıkları nasıl ele alınmalı?
- Kullanıcıya hangi dilin gösterileceğine nasıl karar verilmeli?

Sayfanın tamamı sunucu tarafından oluşturulduğunda bu süreç anlaşılırdı. Uygulama ilgili çevirileri yükler, HTML kodunu üretir ve tarayıcıya gönderirdi.

> PHP ve GNU gettext, daha sonra JavaScript ve JSX ekosisteminde yaygınlaşan `t()` yardımcı fonksiyonunun öncüsü olmuştur.

Ardından JavaScript tarayıcıda ağırlığını artırmaya başladı.

Uygulamalar sunucu taraflı sayfalardan karmaşık Tek Sayfalı Uygulamalara (SPA) dönüştükçe uluslararasılaştırma da frontend tarafının bir sorumluluğu haline geldi. Tarayıcının sayfayı yeniden yüklemeden çevirileri çekmesi, dilleri anlık değiştirmesi, değerleri biçimlendirmesi, çoğul kurallarını işletmesi ve arayüzü güncellemesi gerekti.

Bu durum temel bir soruyu beraberinde getirdi:

**Her kullanıcıya devasa çeviri verileri ve ağır çalışma zamanı kodları indirtmeden çok dilli bir uygulama nasıl inşa edilir?**

Bu soru, JavaScript i18n ekosistemini on yılı aşkın bir süre boyunca şekillendirdi.

Çözümler köklü biçimde dönüştü: küresel JavaScript nesneleri ve `t('anahtar')` çağrılarından çerçeveye özgü kütüphanelere, derleme zamanı metin çıkarımına, TypeScript ile üretilen katı türlere, Server Components mimarisine, tree-shaking'e ve nihayetinde çevirilerin doğrudan build aşamasında optimize JavaScript koduna dönüştürüldüğü derleyici tabanlı yaklaşımlara ulaştık.

Bu makale, 2011'den 2026'ya uzanan bu süreci ele almaktadır: her araç neslinin çözmeye çalıştığı sorunlar, nelerin işe yaradığı, nelerin yetersiz kaldığı ve modern frontend mimarilerinin günümüz i18n çözümlerini nasıl etkilediği.

![JavaScript Uluslararasılaştırma Kütüphaneleri Ekosistemi](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.png?raw=true)

## İçindekiler

<TOC/>

## İlk Dönem Web: 2016 Öncesinde JavaScript Uluslararasılaştırması

Günümüzün modern i18n araçlarının geldiği noktayı anlamak için 2011-2015 yılları arasındaki web geliştirme ortamını anımsamak faydalı olacaktır.

### Mantığın İstemciye Taşınması

2010'ların başında uluslararasılaştırma neredeyse tamamen sunucu tarafının sorumluluğundaydı. JavaScript çoğunlukla animasyonlar, form doğrulamaları ve jQuery ile yapılan küçük DOM eklentileri için kullanılıyordu.

Backbone.js, Knockout.js ve ilk AngularJS ile SPA mimarisinin yaygınlaşmasıyla birlikte render mantığı tarayıcıya taşındı. İstemci tarafındaki kodun artık yerelleştirilmiş tarihleri sunması, para birimlerini biçimlendirmesi, çoğul yapıları yönetmesi ve sayfayı yenilemeden metinleri değiştirmesi gerekiyordu.

Ancak 2011 yılının tarayıcı ortamı bu ihtiyaçları karşılayacak yerleşik altyapıya sahip değildi:

<AccordionGroup>
<Accordion header="Yerel Uluslararasılaştırma API'sinin Bulunmayışı">

ECMAScript Uluslararasılaştırma API'si (ECMA-402) standartları ancak Aralık 2012'de küresel `Intl` nesnesiyle netleşti. Tarayıcılar bu standardı yaygın olarak destekleyene kadar en basit tarih veya sayı biçimlendirmesi bile özel fonksiyonlar ya da ağır polyfill kütüphaneleri gerektiriyordu.

</Accordion>
<Accordion header="Modern Modül Paketleyicilerin Olmayışı">

Webpack gibi araçlar henüz emekleme aşamasındaydı ve tarayıcılarda yerel ES modülleri çalışmıyordu. Geliştiriciler betikleri `<script>` etiketleriyle ekliyor, çeviri sözlüklerini çoğunlukla `window.translations = { ... }` gibi küresel değişkenlere tanımlıyordu.

</Accordion>
<Accordion header="Monolitik JSON Dosyaları">

Çeviriler tek bir devasa JSON dosyasında toplanıyordu. Tokyo'dan ana sayfayı ziyaret eden bir kullanıcı, hesap ayarları, faturalandırma ve yönetim paneli gibi ihtiyaç duymadığı tüm sayfaların metinlerini de tek seferde indiriyordu.

</Accordion>
</AccordionGroup>

### İstemci Taraflı Kütüphanelerin İlk Dalgası

2012 ile 2015 yılları arasında modern istemci taraflı JavaScript i18n altyapısının temelleri atıldı:

<AccordionGroup>
<Accordion header="i18next (Ocak 2012)">

Jan Mühlemann tarafından geliştirilen `i18next`, JavaScript'te çalışma zamanında anahtar-değer sözlüğü yaklaşımının temelini oluşturdu. Anahtar hiyerarşisi, değişken interpolasyonu, çoğul kuralları ve dil algılayıcıları ile arka uçlar için modüler bir yapı sundu. Sade JavaScript ve erken dönem Node.js projelerinde hızla standart haline geldi.

</Accordion>
<Accordion header="vue-i18n (Mayıs 2014)">

Kazuya Kawaguchi (Kazupon) tarafından geliştirilen `vue-i18n`, uluslararasılaştırmayı Vue.js reaktivite modeline uyarlayarak şablon direktiflerini (`v-t`) ve `$t()` fonksiyonunu kullanıma sundu.

</Accordion>
<Accordion header="react-intl (Haziran 2014)">

Yahoo! bünyesindeki FormatJS projesinin bir parçası olarak hazırlanan `react-intl`, ICU MessageFormat ve tarayıcının `Intl` API standartlarını `<FormattedMessage>` ve `<FormattedDate>` gibi bildirimsel bileşenlerle React dünyasına taşıdı.

</Accordion>
<Accordion header="react-i18next (Aralık 2015)">

Jan Mühlemann, `i18next` kütüphanesini React topluluğuna kazandırdı. Dil değişimlerinde arayüzü güncellemek için Higher-Order Components (`withTranslation`) ve React bağlam (context) yapısını kullandı.

</Accordion>
</AccordionGroup>

### 2016 Öncesi Dönemin Kısıtları

Bu araçlar çok dilli istemci uygulamalarının önünü açsa da dönemin teknik kısıtları belirgin sorunlar yarattı:

<AccordionGroup>
<Accordion header="Kırılgan Metin Anahtarları">

`t('marketing.landing.hero.cta')` gibi aramalar statik bir kontrol sağlamıyordu. Anahtardaki bir yazım hatası derleme sırasında fark edilmiyor, canlı ortamda boşluklara veya çevrilememiş ham anahtar adlarına neden oluyordu.

</Accordion>
<Accordion header="Çalışma Zamanı Ayrıştırma Yükü">

ICU mesaj sözdizimini yorumlamak ve düzenli ifadelerle değişkenleri yerleştirmek, özellikle mobil cihazlarda işlemci kaynaklarını gereksiz yere tüketiyordu.

</Accordion>
<Accordion header="Büyük Paket Boyutları">

Rotalara veya bileşenlere göre kod bölme (code splitting) yapılmadığı için uygulamanın tüm yerelleştirilmiş metinleri tek seferde yükleniyor, ilk açılış süresini uzatıyordu.

</Accordion>
<Accordion header="Geliştirici ve Çevirmen Arasındaki Kopukluk">

Sözlükler, onları kullanan bileşenlerden uzakta merkezi JSON dosyalarında tutulduğundan sahipsiz kalan veya eksik bırakılan çeviriler sıkça karşılaşılan bir durum haline geliyordu.

</Accordion>
</AccordionGroup>

## Çerçeveler Dönemi: Ekosistemlere Göre Gelişim

2016 ile 2026 yılları arasında frontend mimarisi kökten değişti. TypeScript endüstri standardına dönüştü, bileşen yapıları olgunlaştı, Webpack, Vite ve Turbopack gibi paketleyiciler kod bölmeyi yaygınlaştırdı, React Server Components render işlemlerini yeniden sunucuya yönlendirdi ve derleyiciler uygulama kodunu doğrudan analiz etmeye başladı.

Aşağıdaki sekmeler, farklı ekosistemlerin bu gereksinimlere nasıl yanıt verdiğini özetlemektedir. Bu ortamlar genelinde `react-intlayer` ve ilgili diğer sürümler (`next-intlayer`, `vue-intlayer`, `angular-intlayer`, `svelte-intlayer` ve `solid-intlayer`), her bir çatının çalışma zamanına özel yüksek performanslı çözümler sunmaktadır.

<Tabs>

<Tab label="Core JavaScript" value="javascript">

| İlk Çıkış    | Kütüphane                            | Çözmeyi Amaçladığı Problem                                                                                                       | Temel Yenilik                                                                                                                                 |
| ------------ | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Ocak 2012    | `i18next`                            | Tarayıcı ve Node.js için herhangi bir çatıya bağımlı olmadan çalışma zamanı sözlük aramasını standartlaştırmak.                  | Çekirdek çeviri motorunu yükleyicilerden, dil algılayıcılardan ve önbellekten ayıran modüler eklenti mimarisi.                                |
| Şubat 2021   | `typesafe-i18n`                      | Tiplenmemiş metin anahtarlarından kaynaklanan sessiz çalışma zamanı hatalarını ve bozuk değişken yerleşimlerini engellemek.      | Çeviri nesnelerinden doğrudan üretilen, çalışma zamanı bağımlılığı olmayan tam tipli çeviri fonksiyonları.                                    |
| Ekim 2023    | `paraglide` (`@inlang/paraglide-js`) | Çalışma zamanı sözlük aramalarını, ağır ayrıştırıcıları ve gereksiz paket şişkinliğini ortadan kaldırmak.                        | Mesajları doğrudan tree-shaking uyumlu saf ECMAScript modüllerine ve JavaScript fonksiyonlarına derlemek.                                     |
| Nisan 2024   | `intlayer`                           | Yönetimi güç isim alanlarını kaldırmak, sayfalar arası metin sızıntısını önlemek, git çakışmalarını azaltmak ve TypeScript tipi. | `.content` dosyalarını doğrudan bileşenlerin yanına konumlandırma, otomatik tip üretimi, dahili görsel CMS ve yapay zeka CLI çeviri araçları. |
| Haziran 2025 | `wuchale`                            | Geliştirme esnasında metinleri elle çıkarma ve yapay çeviri anahtarları tanımlama külfetini ortadan kaldırmak.                   | Satır içi metinleri algılayıp build esnasında ek kod sarmalayıcısı olmadan yerelleştirilmiş fonksiyonlara dönüştüren AST ön işlemcisi.        |

</Tab>

<Tab label="React" value="react">

| İlk Çıkış    | Kütüphane        | Çözmeyi Amaçladığı Problem                                                                                                | Temel Yenilik                                                                                                                                       |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Haziran 2014 | `react-intl`     | React içinde sayı, tarih, para birimi ve karmaşık çoğul ifadelerin biçimlendirilmesini standartlaştırmak.                 | ICU MessageFormat ve ECMA-402 standartlarını hayata geçiren bildirimsel bileşenler (`<FormattedMessage>`, `<FormattedDate>`).                       |
| Aralık 2015  | `react-i18next`  | React için reaktif arayüz güncellemelerini destekleyen doğal bir `i18next` entegrasyonu sunmak.                           | React ile birlikte gelişim: Higher-Order Components yapısından `<Trans>` JSX interpolasyonuna ve `useTranslation` kancasına geçiş.                  |
| Ocak 2018    | `@lingui/react`  | Çalışma zamanında çalışan ICU ayrıştırıcılarının paket boyutuna getirdiği yükü hafifletmek.                               | `<Trans>` ve `t` yapılarını derleme sırasında kompakt indeksli dizilere dönüştüren Babel/SWC makroları.                                             |
| Aralık 2020  | `use-intl`       | Geleneksel React i18n kütüphanelerine kıyasla hafif, kanca odaklı ve tip güvenli bir alternatif sağlamak.                 | Derin TypeScript entegrasyonuna sahip ergonomik `useTranslations` ve `useFormatter` kancaları.                                                      |
| Şubat 2021   | `@tolgee/react`  | Geliştiriciler, çevirmenler ve tasarımcılar arasındaki geri bildirim sürecini hızlandırmak.                               | Kullanıcıların Alt tuşuyla metne tıklayıp yerinde düzenleme yapmasına ve anlık ekran görüntüsü almasına olanak tanıyan tarayıcı içi düzenleme.      |
| Nisan 2024   | `react-intlayer` | Merkezi JSON dosyaları ve karmaşık isim alanları olmadan React yaşam döngüsüne özel yüksek performanslı bir çözüm sunmak. | React render süreçlerine optimize `useIntlayer` kancası, otomatik TypeScript tipleri, bileşen bazlı tree-shaking ve doğrudan görsel CMS eşitlemesi. |
| Temmuz 2024  | `gt-react`       | Manuel dosya dışa aktarımlarını ve çeviri bakım süreçlerini otomatikleştirmek.                                            | Bulut tabanlı çeviri süreçleriyle doğrudan React bileşenleri içerisinde otomatik yapay zeka yerelleştirmesi.                                        |
| Ağustos 2025 | `@wuchale/jsx`   | JSX yazarken elle anahtar tanımlama ve yinelenen kancalar kullanma ihtiyacını ortadan kaldırmak.                          | Ham JSX metin düğümlerini otomatik olarak çıkarıp yerelleştirilmiş karşılıklarına dönüştüren AST dönüşümü.                                          |

</Tab>

<Tab label="Next.js" value="nextjs">

| İlk Çıkış   | Kütüphane                                   | Çözmeyi Amaçladığı Problem                                                                                                 | Temel Yenilik                                                                                                                                              |
| ----------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kasım 2018  | `next-i18next`                              | Next.js Pages Router üzerinde istemci tarafında istek zincirleri yaratmadan `i18next` ile SSR ve SSG desteği sağlamak.     | Yerelleştirilmiş isim alanlarını sayfa proplarına aktaran `serverSideTranslations` ve `appWithTranslation` fonksiyonları.                                  |
| Aralık 2019 | `next-translate`                            | Pages Router projelerinde yapılandırmayı basitleştirmek ve paket boyutunu düşürmek.                                        | Yalnızca ilgili sayfanın ihtiyaç duyduğu çeviri isim alanlarını otomatik olarak enjekte eden Webpack loader eklentisi.                                     |
| Kasım 2020  | `next-intl`                                 | Uluslararasılaştırmayı App Router, React Server Components (RSC) ve akışlı (streaming) SSR mimarisine göre yeniden kurmak. | İstemci tarafında zorunlu JavaScript çalıştırmadan Next.js App Router middleware, Server Actions ve asenkron Server Components ile doğrudan entegrasyon.   |
| Temmuz 2022 | `next-international`                        | Next.js için istemci paketine minimum yük getirerek TypeScript tip güvenliğini en üst düzeye çıkarmak.                     | App Router ve Pages Router için hafif adaptörlerle birlikte kapsamı sınırlandırılmış anahtarlar için katı tip üretimi.                                     |
| Nisan 2024  | `paraglide-next` (`@inlang/paraglide-next`) | Next.js App Router ve Pages Router için çalışma zamanı kütüphanesi gerektirmeyen derlenmiş mesajlar sunmak.                | RSC ve istemci paketlerinde çalışma zamanı JSON ayrıştırmasını önleyen, tree-shaking uyumlu mesaj fonksiyonlarıyla eşleştirilmiş middleware yönlendirmesi. |
| Nisan 2024  | `next-intlayer`                             | `t()` fonksiyonlarını veya sözlükleri bileşenler arasında prop olarak aktarma zorunluluğunu ortadan kaldırmak.             | Prop-drilling yapmadan senkron Server Components içinde doğrudan `useIntlayer` çağrısı, gecikmesiz sunucu render'ı, rotalama ara yazılımı ve canlı CMS.    |
| Eylül 2024  | `gt-next`                                   | Yapay zeka ile Next.js projelerinde çok dilli içerik üretimini ve dinamik rota yönetimini otomatikleştirmek.               | Bulut tabanlı makine çevirisini Next.js edge ara yazılımı ve önbellek katmanlarıyla birleştiren App Router entegrasyonu.                                   |

</Tab>

<Tab label="Vue & Nuxt" value="vue">

| İlk Çıkış    | Kütüphane      | Çözmeyi Amaçladığı Problem                                                                                     | Temel Yenilik                                                                                                                                               |
| ------------ | -------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mayıs 2014   | `vue-i18n`     | Vue uygulamaları için doğal ve reaktif bir uluslararasılaştırma deneyimi sunmak.                               | Vue reaktivite sistemine tam uyum, şablon direktifleri (`v-t`), `$t` yardımcıları ve Single-File Component içinde `<i18n>` özel blokları.                   |
| Kasım 2017   | `@nuxt/i18n`   | Nuxt üzerinde yerelleştirilmiş URL rotaları, SEO hreflang etiketleri ve SSR hidrasyonunu yönetmek.             | Yerelleştirilmiş rotaları (önek, alan adı) üreten, SEO meta etiketlerini yöneten ve dil parçalarını tembel (lazy) yükleyen tam kapsamlı yönlendirme modülü. |
| Ağustos 2019 | `fluent-vue`   | Vue projelerinde karmaşık gramer cinsiyetlerini, durum eklerini ve asimetrik dil yapılarını desteklemek.       | Dildeki incelikler için karmaşık koşullu mantıklar yazma zorunluluğunu ortadan kaldıran Mozilla Project Fluent sözdizimi entegrasyonu.                      |
| Nisan 2025   | `vue-intlayer` | Vue 3 Composition API ve Nuxt için küresel kapsamı kirletmeden çalışan yerel bir Intlayer entegrasyonu sunmak. | Vue 3 reaktivite takibine uygun `useIntlayer` composable'ı, bileşen bazlı izolasyon, eksiksiz TypeScript otomatik tamamlama ve görsel editör uyumluluğu.    |

</Tab>

<Tab label="Angular" value="angular">

| İlk Çıkış   | Kütüphane           | Çözmeyi Amaçladığı Problem                                                                                                 | Temel Yenilik                                                                                                                                           |
| ----------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Şubat 2017  | `ngx-translate`     | Her dil için ayrı paketler derlemeden Angular üzerinde çalışma zamanında dinamik çeviri desteği sağlamak.                  | Dinamik dil yükleme ve anlık geçiş imkanı veren `TranslateService` servisi ve `translate` boru hattı (pipe).                                            |
| Temmuz 2019 | `@ngneat/transloco` | Önceki Angular i18n kütüphanelerindeki performans tıkanıklıklarını, yetersiz kapsam yönetimini ve eksik özellikleri aşmak. | Yapısal direktif (`*transloco`), tembel yüklenen modüller için ayrılmış çeviriler, SSR desteği ve metin çıkarma CLI aracı.                              |
| Eylül 2019  | `@angular/localize` | Her dil için TypeScript kodunu yeniden derlemeyi önlemek üzere Angular'ın yerleşik i18n sistemini modernleştirmek.         | Ivy derleyicisinde hızlı bir derleme sonrası adım olarak işlenen etiketli şablon dizgileri (`$localize`).                                               |
| Şubat 2021  | `@tolgee/ngx`       | Arayüz bağlamında ortaklaşa çeviri yapmayı ve ekran görüntüsü almayı Angular süreçlerine dahil etmek.                      | Doğrudan tarayıcıda metin düzenleme olanağı sunan ve Tolgee ile bağlantılı çalışan Angular pipe ve direktifleri.                                        |
| Nisan 2025  | `angular-intlayer`  | Modern Angular (Signals, standalone bileşenler ve SSR) için yerel bir Intlayer çözümü sunmak.                              | Angular değişiklik algılama mekanizmasına uygun Signal tabanlı reaktif içerik yönetimi, standalone bağımlılık enjeksiyonu ve doğrudan CMS entegrasyonu. |

</Tab>

<Tab label="Svelte & SvelteKit" value="svelte">

| İlk Çıkış   | Kütüphane         | Çözmeyi Amaçladığı Problem                                                                               | Temel Yenilik                                                                                                                                          |
| ----------- | ----------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Temmuz 2018 | `svelte-i18n`     | Svelte store mekanizmasına uygun, reaktif bir uluslararasılaştırma kütüphanesi sağlamak.                 | Dil değiştiğinde DOM üzerinde noktasal güncellemeler sağlayan store tabanlı `$t` fonksiyonu.                                                           |
| Aralık 2021 | `sveltekit-i18n`  | SvelteKit projelerinde SSR ve rotaya dayalı çeviri yüklemelerini düzenli biçimde yönetmek.               | Yalnızca aktif rota için gereken çevirileri ve biçimlendiricileri getiren modüler yükleyici mimarisi.                                                  |
| Kasım 2021  | `@tolgee/svelte`  | Svelte uygulamalarında arayüz içi yerelleştirme deneyimi sunmak.                                         | Tolgee arayüz katmanıyla entegre çalışan Svelte store bağlamları ve otomatik ekran görüntüsü üretimi.                                                  |
| Nisan 2025  | `svelte-intlayer` | Svelte 5 ve SvelteKit için özel olarak geliştirilmiş yüksek performanslı bir Intlayer uyarlaması sunmak. | Svelte 5 Runes (`$state`) yapısına uygun reaktif bağlar, bileşen düzeyinde `.content` tanımları, sıfır yapılandırmalı build eklentileri ve görsel CMS. |
| Temmuz 2025 | `@wuchale/svelte` | Svelte bileşenlerinde sözlük tanımlama ve `$t` fonksiyonlarını içe aktarma tekrarını ortadan kaldırmak.  | Şablonları derleme sırasında inceleyen ve metin düğümlerini ek sarmalayıcı olmadan yerelleştirilmiş çıktılara dönüştüren Svelte ön işlemcisi.          |

</Tab>

<Tab label="SolidJS" value="solid">

| İlk Çıkış    | Kütüphane                | Çözmeyi Amaçladığı Problem                                                                         | Temel Yenilik                                                                                                             |
| ------------ | ------------------------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Eylül 2021   | `@solid-primitives/i18n` | SolidJS'in ince taneli reaktivite yapısıyla örtüşen doğal bir i18n ilkesi sunmak.                  | Sanal DOM veya gereksiz render olmadan DOM düğümlerini güncelleyen Signal tabanlı çeviri çözücü.                          |
| Nisan 2025   | `solid-intlayer`         | SolidJS ve SolidStart için özel olarak geliştirilmiş performans odaklı bir Intlayer çözümü sunmak. | Sanal DOM yükü olmadan çalışan Signal uyumlu bağlar, tam TypeScript şema tamamlama desteği ve görsel editör entegrasyonu. |
| Haziran 2026 | `@lingui/solid`          | Derleme zamanında makro metin çıkarımını ve ICU MessageFormat desteğini SolidJS dünyasına taşımak. | Solid'in reaktif yapısına uyarlanan ve iletileri çalışma zamanı için kompakt yapılara dönüştüren makro dönüşümleri.       |

</Tab>

</Tabs>

## JavaScript i18n Alanında Dört Mimari Dönem

![JavaScript i18n Kütüphanelerinin Tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.png?raw=true)

On beş yıllık gelişimi incelediğimizde JavaScript uluslararasılaştırma tarihini dört belirgin mimari döneme ayırabiliriz:

<AccordionGroup>
<Accordion header="1. Çalışma Zamanı Sözlükleri Dönemi (2011 - 2017)">

Bu döneme `i18next`, `react-intl` ve `vue-i18n` öncülük etti. Uygulamalar statik JSON dosyalarını belleğe yüklüyor ve çalışma zamanı fonksiyonları nesne içindeki metin anahtarlarını arıyordu. Çoğullaştırma ve değişken yerleştirme işlemleri tarayıcıda düzenli ifadeler ve istemci taraflı ICU ayrıştırıcılarıyla çözülüyordu.

</Accordion>
<Accordion header="2. Derleme Zamanı Makroları ve Tip Güvenliği Dönemi (2018 - 2021)">

Bu süreç `lingui`, `next-translate`, `transloco` ve `typesafe-i18n` ile şekillendi. Geliştiriciler çalışma zamanı ayrıştırmasının getirdiği performans kaybını ve tiplenmemiş anahtarların kırılganlığını fark etti. Babel makroları derleme sırasında metinleri çıkardı, paketleyici eklentileri sözlükleri sayfa bazında böldü ve TypeScript derleyicileri çeviri parametrelerini doğrulamaya başladı.

</Accordion>
<Accordion header="3. Server Components ve Akışlı Render Dönemi (2022 - 2024)">

Bu dönemi `next-intl`, `next-international` ve ilk RSC adaptörleri belirledi. React Server Components ve Next.js App Router ile birlikte temel amaç, istemciye ağır i18n motorları veya gereksiz sözlükler göndermeden yerelleştirilmiş içeriği doğrudan sunucuda üretmek oldu.

</Accordion>
<Accordion header="4. Modern Derleyiciler ve Bütünleşik İçerik Dönemi (2024 - 2026)">

Bu aşama `paraglide`, `intlayer` ve `wuchale` tarafından temsil edilmektedir. Modern araçlar uluslararasılaştırmayı salt bir metin değiştirme işi olarak değil, kapsamlı bir içerik mimarisi olarak ele alır. Derleyiciler iletileri tree-shaking uyumlu kod fonksiyonlarına dönüştürür, içerik tanımları bileşenlerin yanında durur, görsel düzenleyiciler ve yapay zeka süreçleri geliştirme akışına entegre edilir. Bu modelde Intlayer, içerik tanımını ve tip üretimini çalışma zamanından ayırarak her çatının reaktivitesine göre hazırlanmış adaptörler (`react-intlayer`, `next-intlayer`, `vue-intlayer`, `angular-intlayer`, `svelte-intlayer` ve `solid-intlayer`) sunar.

</Accordion>
</AccordionGroup>

## Sonuç: Geliştirici Deneyimi, Performans ve Yapay Zekanın Etkisi

On beş yıl ve dört mimari dalga boyunca JavaScript uluslararasılaştırmasının temel hedefi değişmedi: geliştirici deneyimi (DX) ile kod tabanının sürdürülebilirliğini korurken istemci tarafında en yüksek performansı sağlamak.

Küresel değişkenler ve yönetimi zor JSON dosyalarıyla başlayan bu yolculuk, bileşenle birlikte barınan içeriklere, otomatik TypeScript kontrollerine, gecikmesiz sunucu render'ına ve derleme tabanlı optimizasyonlara evrildi.

### Yapay Zeka Dönüşümü ve Geleneksel Çeviri Sistemleri

Son yılların en belirleyici adımlarından biri, yapay zeka ile otomatik çeviri üretiminin geleneksel yerelleştirme platformlarının alışılageldik iş modellerini dönüştürmesi oldu.

Geçmişte metinleri monolitik JSON dosyalarında toplamak, Çeviri Yönetim Sistemleri (TMS) ile entegrasyonu kolaylaştırmak için yapılan bir tercihti. Tek bir merkezi dosya, dış çevirmenler ve üçüncü taraf sistemler için pratik bir veri aktarım alanı sağlıyordu. Ancak bu durum geliştiricilere ciddi mimari bedeller ödetiyordu: git birleştirmelerinde sürekli yaşanan çakışmalar, takibi kaybolan metinler, bileşen bağlamının yitirilmesi ve karmaşık isim alanları.

Üretken yapay zeka modelleri ve modern derleyiciler sayesinde Geliştirici Deneyimi (DX) yeniden ön plana çıktı. Derleme araçları ve CLI komutları, bileşenlerin yanında yer alan içerik dosyalarını otomatik olarak tespit edip doğrulayabiliyor ve çevirebiliyor. Böylece temiz bir mimariden ödün verme gerekliliği ortadan kalkıyor.

Ticari platformlar on yılı aşkın bir süre boyunca gelir modellerini bu manuel süreçler üzerine kurdu:

- **Locize** (`i18next` arkasındaki ticari platform) ve **Crowdin** (birçok açık kaynak projenin iş ortağı) gibi hizmetler, modellerini barındırılan çeviri depolama, kota sınırları ve kelime başına ücretlendirme üzerine kurguladı.
- Gelirleri hacme ve manuel iş adımlarına dayandığı için, geliştirici araçları içerisine doğrudan ve ek maliyetsiz otomasyon sunmak konusunda daha çekimser kaldılar.

### Yeni Yapay Zeka Çözümleri ve Doğrudan Sağlayıcı Maliyeti

Büyük Dil Modelleri çeviri maliyetlerini çok düşük seviyelere çekerken dilsel doğruluğu artırdıkça bu alanda yeni araçlar belirdi:

- Paraglide ile **linguo.dev** veya **General Translation** (`gt-react`, `gt-next`) gibi platformlar tescilli abonelik paketleri ve bulut aracıları sundu.
- Buna karşılık **Intlayer**, CLI aracılığıyla doğrudan yapay zeka çeviri desteği sunarak ekiplerin kendi API anahtarlarını (OpenAI, Anthropic, Mistral veya Google Gemini) bağlamalarına olanak tanır. Aracı komisyonu veya platform bağımlılığı olmadan, yalnızca seçtiğiniz yapay zeka sağlayıcısının doğrudan işlem maliyetiyle çalışırsınız.

### i18n'den Fazlası: Kapsamlı Çok Dilli İçerik Yönetimi

Günümüz web geliştirmesi, `"Gönder"` veya `"Giriş Yap"` gibi tekil kelimeleri çevirmenin çok ötesine geçti. Modern uygulamalar, kullanıcı deneyimi boyunca yapılandırılmış, esnek ve dinamik içeriklere ihtiyaç duyar.

Intlayer bu konuyu yalnızca metin anahtarı arayan bir araç olarak değil, kapsamlı bir çok dilli içerik sistemi olarak ele alır. Markdown belgeleri, HTML yapıları, iç içe geçmiş veri şemaları ve görsel CMS düzenlemesine verdiği yerel destekle kod düzeyindeki mühendisliği, yapay zeka süreçlerini ve içerik yönetimini tek bir çatıda birleştirir.

Daha ayrıntılı mimari karşılaştırmalar ve geçiş rehberleri için aşağıdaki kaynakları inceleyebilirsiniz:

- [Derleyici Yaklaşımı ve Bildirimsel i18n Karşılaştırması](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/compiler_vs_declarative_i18n.md)
- [Bileşen Düzeyinde i18n ve Merkezi i18n Karşılaştırması](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/per-component_vs_centralized_i18n.md)
- [Performans ve Karşılaştırmalı Testler](https://intlayer.org/doc/benchmark)
- [Intlayer Uyumluluk Adaptörleri](https://intlayer.org/doc/concept/compatibility)
