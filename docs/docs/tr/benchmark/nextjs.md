---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: 2026'da Next.js için En İyi i18n Çözümü - Benchmark Raporu
description: next-intl, next-i18next ve Intlayer gibi Next.js uluslararasılaştırma (i18n) kütüphanelerini karşılaştırın. Paket boyutu, sızıntı ve reaktivite üzerine ayrıntılı performans raporu.
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - performans
  - intlayer
slugs:
  - doc
  - benchmark
  - nextjs
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Benchmark başlatıldı"
---

# Next.js i18n Kütüphaneleri — 2026 Benchmark Raporu

Bu sayfa, Next.js üzerindeki i18n çözümleri için hazırlanan bir kıyaslama (benchmark) raporudur.

## İçindekiler

<Toc/>

## Etkileşimli Benchmark

<I18nBenchmark framework="nextjs" vertical/>

## Sonuçlar Referansı:

<iframe 
  src="https://github.com/intlayer-org/benchmark-i18n/blob/main/report/scripts/summarize-nextjs.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://github.com/intlayer-org/benchmark-i18n/blob/main/report/scripts/summarize-nextjs.md

Benchmark deposunun tamamını [buradan](https://github.com/intlayer-org/benchmark-i18n) inceleyebilirsiniz.

## Giriş

Uluslararasılaştırma kütüphanelerinin uygulamanız üzerinde ağır bir etkisi vardır. Ana risk, kullanıcı tek bir sayfayı ziyaret ettiğinde her sayfa ve her dil için içerik yüklenmesidir.

Uygulamanız büyüdükçe, paket boyutu eksponansiyel olarak artabilir ve bu durum performansı fark edilir şekilde düşürebilir.

Örnek olarak, en kötü durumlarda, uluslararasılaştırıldıktan sonra sayfanız neredeyse 4 kat daha büyük hale gelebilir.

i18n kütüphanelerinin bir başka etkisi de geliştirme sürecinin yavaşlamasıdır. Bileşenleri farklı dillerde çok dilli içeriğe dönüştürmek zaman alıcı bir iştir.

Sorun zor olduğu için birçok çözüm mevcuttur; bazıları DX'e (geliştirici deneyimi) odaklanırken, diğerleri performans veya ölçeklenebilirliğe odaklanır.

Intlayer tüm bu boyutlarda optimizasyon yapmaya çalışır.

## Uygulamanızı Test Edin

Bu sorunları ortaya çıkarmak için [buradan](https://intlayer.org/i18n-seo-scanner) deneyebileceğiniz ücretsiz bir tarayıcı oluşturdum.

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Sorun

Çok dilli bir uygulamanın paketiniz üzerindeki etkisini sınırlamanın iki ana yolu vardır:

- JSON'unuzu (veya içeriğinizi) dosyalar / değişkenler / ad alanları (namespaces) arasında bölmek, böylece paketleyici (bundler), belirli bir sayfa için kullanılmayan içeriği "tree-shake" yaparak temizleyebilir.
- Sayfa içeriğinizi dinamik olarak yalnızca kullanıcının dilinde yüklemek.

Bu yaklaşımların teknik sınırları:

**Dinamik yükleme**

Webpack veya Turbopack ile `[locale]/page.tsx` gibi rotalar tanımlasanız ve `generateStaticParams` tanımlanmış olsa bile, paketleyici `locale` değişkenini statik bir sabit olarak görmez. Bu durum, her sayfaya tüm dillerdeki içeriklerin dahil edilmesine neden olabilir. Bunu sınırlamanın ana yolu, içeriği dinamik bir içe aktarma (örneğin `import('./locales/${locale}.json')`) aracılığıyla yüklemektir.

Derleme sırasında Next.js her yerel ayar (locale) için bir JS paketi (örneğin `./locales_fr_12345.js`) oluşturur. Site istemciye gönderildikten sonra sayfa çalıştığında, tarayıcı gereken JS dosyası için ek bir HTTP isteği yapar.

> Aynı sorunu çözmenin başka bir yolu da JSON'u dinamik olarak yüklemek için `fetch()` kullanmaktır. `Tolgee`, JSON dosyaları `/public` altında olduğunda bu şekilde çalışır. İçerik yüklemek için `getStaticProps` kullanan `next-translate` de benzer bir mantığa sahiptir. Akış aynıdır: Tarayıcı, varlığı yüklemek için ek bir HTTP isteği yapar.

**İçerik bölme (Content splitting)**

`const t = useTranslation()` + `t('nesnem.alt-nesnem.anahtarim')` gibi bir sözdizimi kullanıyorsanız, kütüphanenin anahtarı çözümleyebilmesi için genellikle tüm JSON dosyasının pakette olması gerekir. Bu durumda, sayfada kullanılmasa bile içeriğin büyük bir kısmı gönderilir.

Bunu hafifletmek için bazı kütüphaneler sayfa başına hangi ad alanlarının yükleneceğini belirtmenizi ister — örneğin `next-i18next`, `next-intl`, `lingui`, `next-translate`, `next-international`.

Buna karşılık `Paraglide`, derlemeden önce JSON'u `const en_my_var = () => 'değerim'` gibi düz sembollere dönüştürmek için ek bir adım ekler. Teorik olarak bu, sayfadaki kullanılmayan içeriğin tree-shake edilmesini sağlar. Göreceğimiz gibi bu yöntemin hala ödün vermesi gereken yanları vardır.

Son olarak `Intlayer`, derleme zamanı (build-time) optimizasyonu uygulayarak `useIntlayer('key')` ifadesinin doğrudan ilgili içerikle değiştirilmesini sağlar.

## Metodoloji

Bu benchmark için aşağıdaki kütüphaneleri karşılaştırdık:

- `Base App` (i18n kütüphanesi yok)
- `next-intlayer` (v8.7.5)
- `next-i18next` (v16.0.5)
- `next-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `next-translate` (v3.1.2)
- `next-international` (v1.3.1)
- `@inlang/paraglide-js` (v2.15.1)
- `tolgee` (v7.0.0)
- `@lingo.dev/compiler` (v0.4.0)
- `wuchale` (v0.22.11)
- `gt-next` (v6.16.5)

Next.js'in `16.2.4` sürümünü App Router ile kullandım.

**10 sayfa** ve **10 dilden** oluşan çok dilli bir uygulama geliştirdim.

**Dört yükleme stratejisini** karşılaştırdım:

| Strateji            | Ad alanı yok (global)                         | Ad alanı var (scoped)                                              |
| :------------------ | :-------------------------------------------- | :----------------------------------------------------------------- |
| **Statik yükleme**  | **Static**: Başlangıçta her şey bellekte.     | **Scoped static**: Ad alanına bölünmüş; her şey başlangıçta yüklü. |
| **Dinamik yükleme** | **Dynamic**: İstek üzerine dile göre yükleme. | **Scoped dynamic**: Ad alanına ve dile göre ayrıntılı yükleme.     |

## Strateji özeti

- **Static**: Basit; ilk yüklemeden sonra ağ gecikmesi yok. Dezavantajı: büyük paket boyutu.
- **Dynamic**: Başlangıç ağırlığını azaltır (lazy-loading). Çok sayıda dile sahip olduğunuzda idealdir.
- **Scoped static**: Karmaşık ek ağ istekleri olmadan kodu düzenli tutar (mantıksal ayrım).
- **Scoped dynamic**: Kod bölme (code-splitting) ve performans için en iyi yaklaşım. Yalnızca geçerli görünümün ve aktif dilin ihtiyaç duyduğu şeyi yükleyerek bellek kullanımını en aza indirir.

### Neleri ölçtüm:

Her teknoloji yığını için aynı çok dilli uygulamayı gerçek bir tarayıcıda çalıştırdım, ardından ağ üzerinden gerçekte ne gönderildiğini ve işlemlerin ne kadar sürdüğünü kaydettim. Boyutlar, ham kaynak kod miktarından ziyade kullanıcıların gerçekte indirdiği boyuta daha yakın olduğu için **normal web sıkıştırmasından sonraki** değerler olarak raporlanmıştır.

- **Uluslararasılaştırma kütüphanesi boyutu**: Paketleme, tree-shaking ve küçültme işlemlerinden sonra i18n kütüphanesinin boyutu; yani boş bir bileşendeki sağlayıcılar (örneğin `NextIntlClientProvider`) + hook'lar (örneğin `useTranslations`) kodunun boyutudur. Çeviri dosyalarının yüklenmesini içermez. İçeriğiniz devreye girmeden önce kütüphanenin ne kadar "ağır" olduğunu gösterir.

- **Sayfa başına JavaScript**: Benchmark rotasının her biri için tarayıcının o ziyaret için çektiği script miktarı; paketteki sayfaların (ve raporun bunları birleştirdiği dillerdeki) ortalamasıdır. Ağır sayfalar yavaş sayfalardır.

- **Diğer dillerden sızıntı (Leakage from other locales)**: Aynı sayfanın ancak başka bir dildeki içeriğinin, incelenen sayfada yanlışlıkla yüklenmesidir. Bu içerik gereksizdir ve kaçınılmalıdır (örneğin `/en/about` sayfası paketinde bulunan `/fr/about` sayfası içeriği).

- **Diğer rotalardan sızıntı**: Uygulamadaki **diğer ekranlar** için aynı kavram: sadece bir sayfa açtığınızda diğer sayfaların metinlerinin gelip gelmediği (örneğin `/en/contact` sayfası paketindeki `/en/about` sayfası içeriği). Yüksek puan, zayıf bölme veya aşırı geniş paketlere işaret eder.

- **Ortalama bileşen paket boyutu**: Ortak UI parçaları, tek bir devasa uygulama numarası içinde saklanmak yerine **tek tek** ölçülür. Uluslararasılaştırmanın günlük bileşenleri sessizce şişirip şişirmediğini gösterir. Örneğin, bileşeniniz yeniden render edilirse tüm bu verileri bellekten yükleyecektir. Herhangi bir bileşene devasa bir JSON eklemek, bileşenlerinizin performansını yavaşlatacak büyük bir kullanılmayan veri deposu bağlamak gibidir.

- **Dil değiştirme reaktivity'si**: Uygulamanın kendi kontrolünü kullanarak dili değiştiriyorum ve sayfa net bir şekilde değişene kadar geçen süreyi tutuyorum; bir laboratuvar mikro-adımı değil, ziyaretçinin fark edeceği süredir.

- **Dil değişikliğinden sonra render çalışması**: Daha dar kapsamlı bir takip: geçiş başladıktan sonra arayüzün yeni dil için yeniden çizilmesinin ne kadar çaba gerektirdiği. "Hissedilen" zaman ile framework maliyeti farklılaştığında kullanışlıdır.

- **İlk sayfa yükleme süresi**: Navigasyondan tarayıcının sayfayı tamamen yüklendi kabul etmesine kadar geçen süredir. Soğuk başlangıçları (cold starts) karşılaştırmak için iyidir.

- **Hidrasyon (Hydration) süresi**: Uygulama bunu sunduğunda, istemcinin sunucu HTML'ini gerçekten tıklanabilir bir şeye dönüştürmek için harcadığı süre. Tablolardaki tire işareti (-), bu uygulamanın benchmark içinde güvenilir bir hidrasyon figürü sağlamadığı anlamına gelir.

## Sonuçlar Detaylı

### 1 — Kaçınılması gereken çözümler

`gt-next` veya `lingo.dev` gibi bazı çözümlerden açıkça kaçınılmalıdır. Bu çözümler, satıcı kısıtlamasını (vendor lock-in) kod tabanınızı kirletmekle birleştirir. Uygulamak için saatler harcanmasına rağmen, ne TanStack Start'ta ne de Next.js'te düzgün çalıştıklarını göremedim.

Karşılaşılan sorunlar:

**(General Translation)** (`gt-next@6.16.5`):

- 110kb'lık bir uygulama için `gt-react` 440kb'tan fazla ek veri ekler.
- General Translation ile yapılan ilk derlemede `Quota Exceeded, please upgrade your plan` mesajı.
- Çeviriler render edilmiyor; kütüphanede bir hata gibi görünen `Error: <T> used on the client-side outside of <GTProvider>` hatası alıyorum.
- **gt-tanstack-start-react** uygulanırken kütüphaneyle ilgili bir [sorun](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) ile de karşılaştım: `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser` hatası uygulamayı bozdu. Sorun bildirildikten sonra 24 saat içinde düzeltildi.
- Kütüphane Next.js sayfalarının statik render edilmesini engelliyor.

**(Lingo.dev)** (`@lingo.dev/compiler@0.4.0`):

- AI kotası aşıldı ve derleme tamamen engellendi; yani ödeme yapmadan doğrudan yayına giremezsiniz.
- Derleyici, çevrilmiş içeriğin neredeyse %40'ını kaçırıyordu. Çalışması için tüm `.map` yapılarını düz bileşen bloklarına yeniden yazmak zorunda kaldım.
- CLI'ları oldukça hatalı ve yapılandırma dosyasını sebepsiz yere sıfırlıyordu.
- Derleme sırasında, yeni içerik eklendiğinde oluşturulan JSON'ları tamamen siliyordu. Sonuç olarak, birkaç anahtar 300'den fazla mevcut anahtarı yok edebiliyordu.

### 2 — Deneysel çözümler

**(Wuchale)** (`wuchale@0.22.11`):

`Wuchale`'nin arkasındaki fikir ilginç ancak henüz uygulanabilir değil. Reaktivite sorunlarıyla karşılaştım ve uygulamayı çalıştırabilmek için sağlayıcının (provider) zorla yeniden render edilmesini gerektirdi. Dokümantasyon da oldukça belirsiz, bu da alışma sürecini zorlaştırıyor.

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

`Paraglide` yenilikçi ve iyi düşünülmüş bir yaklaşım sunuyor. Buna rağmen, bu benchmark'ta reklamı yapılan tree-shaking benim Next.js veya TanStack Start kurulumlarımda çalışmadı. İş akışı ve DX diğer seçeneklerden daha karmaşık.
Şahsen her push öncesinde JS dosyalarını yeniden oluşturmak zorunda kalmaktan hoşlanmıyorum, bu da PR'ler üzerinden sürekli merge çelişkisi riski yaratıyor. Araç ayrıca Next.js'ten ziyade Vite'e daha fazla odaklanmış gibi görünüyor.
Son olarak, diğer çözümlerle karşılaştırıldığında Paraglide, içeriği render etmek için mevcut dili almak üzere bir store (örneğin React context) kullanmaz. Ayrıştırılan her düğüm için localStorage / cookie vb. üzerinden dili sorgular. Bu, bileşen reaktivitesini etkileyen gereksiz mantık yürütülmesine yol açar.

### 3 — Kabul edilebilir çözümler

**(Tolgee)** (`tolgee@7.0.0`):

`Tolgee` daha önce bahsedilen sorunların çoğunu ele alıyor. Benzer araçlara göre benimsenmesinin daha zor olduğunu gördüm. Tip güvenliği (type safety) sağlamıyor, bu da eksik anahtarların derleme zamanında yakalanmasını zorlaştırıyor. Eksik anahtar algılama özelliği eklemek için Tolgee'nin fonksiyonlarını kendi fonksiyonlarımla sarmak zorunda kaldım.

**(Next Intl)** (`next-intl@4.9.1`):

`next-intl` şu anki en popüler seçenek ve AI asistanlarının en çok önerdiği kütüphane; ancak bence performans odaklı bakıldığında bu yanlış bir öneri. Başlamak kolaydır; pratikte sızıntıyı sınırlamak için optimizasyon karmaşıktır. Dinamik yükleme + ad alanı oluşturma + TypeScript tiplerini birleştirmek geliştirmeyi çok yavaşlatır. Paket de oldukça ağırdır ( `NextIntlClientProvider` + `useTranslations` için yaklaşık 13kb, bu `next-intlayer`ın 2 katından fazlasıdır). **next-intl** eskiden Next.js sayfalarının statik render edilmesini engelliyordu. `setRequestLocale()` adında bir yardımcı sunar. Bu, `en.json` / `fr.json` gibi merkezi dosyalar için kısmen çözülmüş gibi görünse de, içerik `en/shared.json` / `fr/shared.json` / `es/shared.json` gibi ad alanlarına bölündüğünde statik render hala bozuluyor.

**(Next I18next)** (`next-i18next@16.0.5`):

`next-i18next` muhtemelen en popüler seçenektir çünkü JavaScript uygulama i18n çözümleri arasında ilklerden biridir. Birçok topluluk eklentisine sahiptir. `next-intl` ile aynı büyük dezavantajlara sahiptir. Paket özellikle ağırdır ( `I18nProvider` + `useTranslation` için yaklaşık 18kb, `next-intlayer`ın yaklaşık 3 katı).

Mesaj formatları da farklıdır: `next-intl` ICU MessageFormat kullanırken, `i18next` kendi formatını kullanır.

**(Next International)** (`next-international@1.3.1`):

`next-international` da yukarıdaki sorunları ele alıyor ancak `next-intl` veya `next-i18next`ten çok da farklı değil. Ad alanına özel çeviriler için `scopedT()` içeriyor — ancak bunu kullanmanın paket boyutu üzerinde neredeyse hiç etkisi yok.

**(Lingui)** (`@lingui/core@5.3.0`):

`Lingui` sık sık övülür. Şahsen `lingui extract` / `lingui compile` iş akışını alternatiflerden daha karmaşık buldum ve net bir avantaj göremedim. Ayrıca AI'ları şaşırtan tutarsız sözdizimleri fark ettim (örneğin `t()`, `t''`, `i18n.t()`, `<Trans>`).

### 4 — Öneriler

**(Next Translate)** (`next-translate@3.1.2`):

`t()` stili bir API seviyorsanız `next-translate` ana önerimdir. `next-translate-plugin` aracılığıyla zarif bir şekilde çalışır ve Webpack / Turbopack yükleyicisi ile `getStaticProps` üzerinden ad alanlarını yükler. Ayrıca buradaki en hafif seçenektir (~2.5kb). Yapılandırmada sayfa veya rota başına ad alanı tanımlamak iyi düşünülmüştür ve **next-intl** veya **next-i18next** gibi ana alternatiflerden daha kolay bakımı yapılır. `3.1.2` sürümünde statik render'ın çalışmadığını ve Next.js'in dinamik render'a geri döndüğünü fark ettim.

**(Intlayer)** (`next-intlayer@8.7.5`):

Nesnellik adına kendi çözümüm olan `next-intlayer` hakkında kişisel olarak yorum yapmayacağım.

### Kişisel Not

Bu not kişiseldir ve benchmark sonuçlarını etkilemez. i18n dünyasında, çevrilmiş içerik için genellikle `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` gibi bir desen etrafında fikir birliği görülür.

React uygulamalarında, bir React düğümü (ReactNode) olarak bir fonksiyon enjekte etmek bence bir antipatendir. Ayrıca, kaçınılabilir bir karmaşıklık ve (zar zor fark edilse bile) JavaScript yürütme yükü ekler.
