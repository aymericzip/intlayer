---
createdAt: 2025-11-24
updatedAt: 2025-11-24
title: Derleyici Tabanlı ve Deklaratif i18n Karşılaştırması
description: '"Sihirli" derleyici tabanlı uluslararasılaştırma ile açık deklaratif içerik yönetimi arasındaki mimari ödünleşimleri keşfetmek.'
keywords:
  - Intlayer
  - Uluslararasılaştırma
  - Blog
  - Next.js
  - JavaScript
  - React
  - i18n
  - Derleyici
  - Deklaratif
slugs:
  - blog
  - compiler-vs-declarative-i18n
---

# Derleyici Tabanlı i18n İçin ve Karşı Argümanlar

On yıldan fazla süredir web uygulamaları geliştiriyorsanız, Uluslararasılaştırmanın (i18n) her zaman bir sürtüşme noktası olduğunu bilirsiniz. Genellikle kimsenin yapmak istemediği bir görevdir—metinleri çıkarmak, JSON dosyalarını yönetmek ve çoğul kurallarıyla uğraşmak.

Son zamanlarda, bu acıyı ortadan kaldırmayı vaat eden yeni bir **"Derleyici tabanlı" i18n araçları** dalgası ortaya çıktı. Sunum çok cazip: **Sadece bileşenlerinizde metni yazın ve geri kalanını derleme aracı halletsin.** Anahtar yok, import yok, sadece sihir.

Ancak yazılım mühendisliğindeki tüm soyutlamalarda olduğu gibi, sihrin de bir bedeli vardır.

Bu blog yazısında, deklaratif kütüphanelerden derleyici tabanlı yaklaşımlara geçişi, beraberinde getirdikleri gizli mimari borçları ve neden "sıkıcı" yolun profesyonel uygulamalar için hâlâ en iyi yol olabileceğini inceleyeceğiz.

## Uluslararasılaştırmanın Kısa Tarihi

Nerede olduğumuzu anlamak için, nereden başladığımıza bakmalıyız.

2011–2012 yıllarında, JavaScript ortamı oldukça farklıydı. Bildiğimiz bundlerlar (Webpack, Vite) ya yoktu ya da çok erken aşamalardaydı. Tarayıcıda scriptleri birbirine yapıştırıyorduk. Bu dönemde, **i18next** gibi kütüphaneler doğdu.

O zamanlar problemi çözmenin tek yolu vardı: **Çalışma Zamanı Sözlükleri**. Belleğe devasa bir JSON nesnesi yüklüyordunuz ve bir fonksiyon anahtarları anında arıyordu. Bu yöntem güvenilirdi, açıktı ve her yerde çalışıyordu.

Bugüne hızlıca gelirsek, Abstract Syntax Tree (AST) yapısını milisaniyeler içinde analiz edebilen güçlü derleyicilere (SWC, Rust tabanlı bundlerlar) sahibiz. Bu güç yeni bir fikrin doğmasına yol açtı: _Neden anahtarları manuel olarak yönetiyoruz? Derleyici neden "Hello World" metnini görüp bizim için değiştirmesin?_

Böylece, Derleyici tabanlı i18n doğdu.

> **Derleyici tabanlı i18n örnekleri:**
>
> - Paraglide (Her mesajı küçük bir ESM fonksiyonuna derleyen ve kullanılmayan yerellerin ve anahtarların bundlerlar tarafından otomatik olarak atılmasını sağlayan tree-shaken modüller. Mesajları string-anahtar araması yapmak yerine fonksiyon olarak import edersiniz.)
> - LinguiJS (Mesaj makrolarını, örneğin `<Trans>`, derleme zamanında sade JS fonksiyon çağrılarına dönüştüren makrodan-fonksiyona derleyici. Çok küçük bir çalışma zamanı ayak izi ile ICU/MessageFormat sözdizimi sağlar.)
> - Lingo.dev (React uygulamanızın derlemesi sırasında çevrilmiş içeriği doğrudan enjekte ederek yerelleştirme sürecini otomatikleştirmeye odaklanır. AI kullanarak çevirileri otomatik oluşturabilir ve doğrudan CI/CD süreçlerine entegre olabilir.)
> - Wuchale (.svelte dosyalarındaki satır içi metni çıkaran ve bunu sıfır-sarmalayıcı çeviri fonksiyonlarına derleyen Svelte-öncelikli bir ön işlemci. String anahtarlarından kaçınır ve içerik çıkarma mantığını ana uygulama çalışma zamanından tamamen ayırır.)
> - Intlayer (Bileşenlerinizi ayrıştıran, tiplenmiş sözlükler üreten ve isteğe bağlı olarak kodu açık Intlayer içeriği kullanacak şekilde yeniden yazabilen Derleyici / Extract CLI. Amaç, bildirimsel, çerçeveden bağımsız bir çekirdek tutarken derleyiciyi hız için kullanmaktır.)

> **Bildirimsel i18n örneği:**
>
> - i18next / react-i18next / next-i18next (Çalışma zamanı JSON sözlükleri ve kapsamlı bir eklenti ekosistemi kullanan olgun endüstri standardı)
> - react-intl (FormatJS kütüphanesinin bir parçası olup, standart ICU mesaj sözdizimi ve sıkı veri biçimlendirmeye odaklanır)
> - next-intl (Özellikle Next.js için optimize edilmiş olup App Router ve React Server Components ile entegrasyon sağlar)
> - vue-i18n / @nuxt/i18n (Bileşen düzeyinde çeviri blokları ve sıkı reaktivite entegrasyonu sunan standart Vue ekosistemi çözümü)
> - svelte-i18n (Reaktif, çalışma zamanı çevirileri için Svelte mağazalarının etrafında hafif bir sarmalayıcı)
> - angular-translate (Derleme zamanında birleştirme yerine çalışma zamanı anahtar aramalarına dayanan eski dinamik çeviri kütüphanesi)
> - angular-i18n (Angular'ın yerel, derleme sırasında XLIFF dosyalarını doğrudan şablonlara birleştiren önceden derleme yaklaşımı)
> - Tolgee (Bildirimsel kodu, kullanıcı arayüzünde doğrudan "tıklayarak çeviri" düzenlemesi için bağlam içi bir SDK ile birleştirir)
> - Intlayer (Bileşen başına yaklaşım, yerel tree-shaking ve TypeScript doğrulamasını mümkün kılan içerik bildirim dosyalarını kullanır)

## Intlayer Derleyicisi

**Intlayer** temelde içeriğinize **bildirimsel bir yaklaşımı** teşvik eden bir çözüm olmasına rağmen, geliştirmeyi hızlandırmak veya hızlı prototiplemeyi kolaylaştırmak için bir derleyici içerir.

Intlayer derleyicisi, React, Vue veya Svelte bileşenlerinizin yanı sıra diğer JavaScript/TypeScript dosyalarının AST'sini (Soyut Sözdizim Ağacı) tarar. Görevi, sabit kodlanmış dizeleri tespit etmek ve bunları özel `.content` bildirimlerine çıkarmaktır.

> Daha fazla detay için dokümantasyona göz atın: [Intlayer Derleyici Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md)

## Derleyicinin Cazibesi ("Sihirli" Yaklaşım)

Bu yeni yaklaşımın popüler olmasının bir nedeni var. Bir geliştirici için deneyim inanılmazdır.

### 1. Hız ve "Akış"

İşin içindeyken, anlamsal bir değişken adı (`home_hero_title_v2`) düşünmek için durmak akışınızı bozar. Derleyici yaklaşımıyla, `<p>Welcome back</p>` yazarsınız ve devam edersiniz. Sürtünme sıfırdır.

### 2. Miras Kurtarma Görevi

Büyük, 5.000 bileşenli ve hiç çevirisi olmayan devasa bir kod tabanını devraldığınızı hayal edin. Bunu manuel anahtar tabanlı bir sistemle sonradan uyarlamak aylar süren bir kabus olur. Derleyici tabanlı bir araç ise, tek bir dosyaya elle dokunmanıza gerek kalmadan binlerce metni anında çıkaran bir kurtarma stratejisi olarak çalışır.

### 3. Yapay Zeka Çağı

Göz ardı etmememiz gereken modern bir avantajdır bu. Yapay zeka kodlama asistanları (Copilot veya ChatGPT gibi) doğal olarak standart JSX/HTML üretirler. Özel çeviri anahtarı şemanızı bilmezler.

- **Deklaratif:** Yapay zekanın çıktısını, metni anahtarlarla değiştirmek için yeniden yazmanız gerekir.
- **Derleyici:** Yapay zekanın kodunu kopyalayıp yapıştırırsınız, ve bu sadece çalışır.

## Gerçeklik Kontrolü: Neden "Sihir" Tehlikelidir

"Sihir" çekici olsa da, soyutlama sızar. İnsan niyetini anlaması için bir derleme aracına güvenmek mimari kırılganlık getirir.

### Sezgisel Kırılganlık (Tahmin Oyunu)

Derleyici, içeriğin ne olduğunu ve kodun ne olduğunu tahmin etmek zorundadır. Bu, aracın "karşısında savaşmanıza" neden olan uç durumlara yol açar.

Bu senaryoları düşünün:

- `<span className="active"></span>` çıkarılır mı? (Bir string, ama muhtemelen bir sınıf).
- `<span status="pending"></span>` çıkarılır mı? (Bir prop değeri).
- `<span>{"Hello World"}</span>` çıkarılır mı? (Bir JS ifadesi).
- `<span>Hello {name}. How are you?</span>` çıkarılır mı? (İnterpolasyon karmaşıktır).
- `<span aria-label="Image of cat"></span>` çıkarılır mı? (Erişilebilirlik öznitelikleri çeviri gerektirir).
- `<span data-testid="my-element"></span>` çıkarılır mı? (Test ID'leri ÇEVRİLMEMELİDİR).
- `<MyComponent errorMessage="An error occurred" />` çıkarılır mı?
- `<p>This is a paragraph{" "}\n containing multiple lines</p>` çıkarılır mı?
- `<p>{getStatusMessage()}</p>` fonksiyon sonucu çıkarılır mı?
- `<div>{isLoading ? "The page is loading" : <MyComponent/>} </div>` çıkarılır mı?
- `<span>AX-99</span>` gibi bir ürün ID'si çıkarılır mı?

Sonuç olarak, uygulama mantığınızın bozulmasını önlemek için belirli yorumlar (örneğin `// ignore-translation`) veya belirli prop'lar (örneğin `data-compiler-ignore="true"`) eklemek zorunda kalırsınız.

### Intlayer bu karmaşıklığı nasıl ele alıyor?

Intlayer, bir alanın çeviri için çıkarılıp çıkarılmayacağını tespit etmek için karma bir yaklaşım kullanır ve yanlış pozitifleri en aza indirmeye çalışır:

1.  **AST Analizi:** Eleman türünü kontrol eder (örneğin, bir `reactNode`, bir `label` veya bir `title` prop'u arasında ayrım yapar).
2.  **Desen Tanıma:** Dizgenin büyük harfle başlayıp başlamadığını veya boşluk içerip içermediğini tespit eder; bu, dizgenin muhtemelen bir kod tanımlayıcısı değil, insan tarafından okunabilir metin olduğunu gösterir.

### Dinamik Veri Zorunlu Sınırı

Compiler çıkarımı **statik analiz**e dayanır. Kararlı bir ID oluşturmak için kodunuzdaki literal dizgeyi görmesi gerekir.
Eğer API'niz `server_error` gibi bir hata kodu stringi döndürüyorsa, bunu bir derleyici ile çeviremezsiniz çünkü derleyici, bu stringin derleme zamanında var olduğunu bilmez. Dinamik veriler için yalnızca çalışma zamanı "runtime-only" bir sistem kurmak zorunda kalırsınız.

### Parçalama Eksikliği

Bazı derleyiciler, çevirileri sayfa bazında parçalara ayırmaz. Eğer derleyiciniz her dil için büyük bir JSON dosyası oluşturuyorsa (örneğin, `./lang/en.json`, `./lang/fr.json` vb.), tek bir ziyaret edilen sayfa için tüm sayfalarınızın içeriğini yüklemeniz muhtemeldir. Ayrıca, içeriğinizi kullanan her bileşen, muhtemelen gereğinden çok daha fazla içerikle yüklenir ve bu da performans sorunlarına yol açabilir.

Ayrıca çevirilerinizi dinamik olarak yüklerken dikkatli olun. Eğer bu yapılmazsa, mevcut dilin yanı sıra tüm diller için içerik yüklersiniz.

> Problemi açıklamak için, 10 sayfa ve 10 dilin (tamamen benzersiz) olduğu bir siteyi düşünün. 99 ek sayfa için içerik yüklersiniz (10 × 10 - 1).

### "Chunk Patlaması" ve Ağ Şelaleleri

Chunking sorununu çözmek için bazı çözümler, bileşen başına veya hatta anahtar başına chunking sunar. Ancak sorun yalnızca kısmen çözülür. Bu çözümlerin satış noktası genellikle "İçeriğiniz tree-shaken olur." demektir.

Gerçekten de, içeriği statik olarak yüklerseniz, çözümünüz kullanılmayan içeriği tree-shake yapar, ancak yine de uygulamanızla birlikte tüm dillerden içerik yüklersiniz.

Peki neden dinamik olarak yüklemiyorsunuz? Evet, bu durumda gerekli olandan daha fazla içerik yüklersiniz, ancak bunun da bazı dezavantajları vardır.

İçeriği dinamik olarak yüklemek, her içerik parçasını kendi chunk'ında izole eder ve bu chunk yalnızca bileşen render edildiğinde yüklenir. Bu, her metin bloğu için bir HTTP isteği yapacağınız anlamına gelir. Sayfanızda 1.000 metin bloğu mu var? → Sunucularınıza 1.000 HTTP isteği. Ve zararı sınırlamak ve uygulamanızın ilk render süresini optimize etmek için, birden fazla Suspense sınırı veya Skeleton Loader eklemeniz gerekecektir.

> Not: Next.js ve SSR ile bile, bileşenleriniz yüklemeden sonra hala hydrate edilir, bu yüzden HTTP istekleri yine de yapılacaktır.

Çözüm mü? `i18next`, `next-intl` veya `intlayer` gibi kapsamlı içerik bildirimleri yapmanıza olanak tanıyan bir çözüm benimsemek.

> Not: `i18next` ve `next-intl`, paket boyutunuzu optimize etmek için her sayfa için namespace / mesaj importlarını manuel olarak yönetmenizi gerektirir. Paketinizin kullanılmayan çevirilerle kirlenip kirlenmediğini tespit etmek için `rollup-plugin-visualizer` (vite), `@next/bundle-analyzer` (next.js) veya `webpack-bundle-analyzer` (React CRA / Angular / vb.) gibi bir paket analizörü kullanmalısınız.

### Çalışma Zamanı Performans Yükü

Çevirileri reaktif hale getirmek (yani dil değiştirdiğinizde anında güncellenmelerini sağlamak) için derleyici genellikle her bileşene durum yönetimi hook'ları enjekte eder.

- **Maliyet:** Eğer 5.000 öğelik bir liste render ederseniz, yalnızca metin için 5.000 `useState` ve `useEffect` hook'u başlatıyorsunuz demektir. React, tüm 5.000 tüketiciyi aynı anda tanımlayıp yeniden render etmek zorundadır. Bu, geçiş sırasında kullanıcı arayüzünü donduran büyük bir "Ana İş Parçacığı" tıkanıklığına neden olur. Bu durum, deklaratif kütüphanelerin (genellikle tek bir Context sağlayıcı kullanan) tasarruf ettiği bellek ve CPU döngülerini tüketir.

> Not: Bu sorun React dışındaki diğer frameworkler için de benzerdir.

## Tuzak: Vendor Lock-in

Çeviri anahtarlarının çıkarılmasına veya taşınmasına izin veren bir i18n çözümü seçerken dikkatli olun.

Deklaratif bir kütüphane durumunda, kaynak kodunuz açıkça çeviri niyetinizi içerir: bunlar sizin anahtarlarınızdır ve onları kontrol edersiniz. Kütüphaneleri değiştirmek isterseniz, genellikle sadece import'u güncellemeniz yeterlidir.

Derleyici yaklaşımıyla, kaynak kodunuz sadece düz İngilizce metin olabilir, çeviri mantığının hiçbir izi yoktur: her şey derleme aracı yapılandırmasında gizlidir. Eğer o eklenti bakımsız kalırsa veya çözümleri değiştirmek isterseniz, takılıp kalabilirsiniz. “Eject” etmek için kolay bir yol yoktur: kodunuzda kullanılabilir anahtarlar yoktur ve yeni bir kütüphane için tüm çevirilerinizi yeniden oluşturmanız gerekebilir.

Bazı çözümler ayrıca çeviri oluşturma hizmetleri sunar. Krediniz bitti mi? Çeviri de yok.

Derleyiciler genellikle metni hashler (örneğin, `"Hello World"` -> `x7f2a`). Çeviri dosyalarınız `{ "x7f2a": "Hola Mundo" }` gibi görünür. Tuzak: Eğer kütüphaneler arasında geçiş yaparsanız, yeni kütüphane `"Hello World"` anahtarını görür ve onu arar. Ancak bulamaz çünkü çeviri dosyanız hashlerle (`x7f2a`) doludur.

### Platform Bağımlılığı

Derleyici tabanlı bir yaklaşım seçerek, kendinizi altta yatan platforma bağlarsınız. Örneğin, belirli derleyiciler tüm bundler'lar (Vite, Turbopack veya Metro gibi) için mevcut değildir. Bu, gelecekteki geçişleri zorlaştırabilir ve tüm uygulamalarınızı kapsamak için birden fazla çözüm benimsemeniz gerekebilir.

## Diğer Taraf: Deklaratif Yaklaşımın Riskleri

Adil olmak gerekirse, geleneksel deklaratif yöntem de mükemmel değildir. Kendi "tuzağı" vardır.

1.  **Namespace Cehennemi:** Hangi JSON dosyalarının yükleneceğini (`common.json`, `dashboard.json`, `footer.json`) genellikle manuel olarak yönetmeniz gerekir. Birini unutursanız, kullanıcı ham anahtarları görür.
2.  **Aşırı Yükleme:** Dikkatli yapılandırma yapılmadığında, başlangıç yüklemesinde _tüm_ sayfalarınız için _tüm_ çeviri anahtarlarınızı yanlışlıkla yüklemek çok kolaydır ve bu da paket boyutunuzu şişirir.
3.  **Senkronizasyon Kayması:** Bir bileşen kullanımdan kaldırıldıktan sonra bile, anahtarların JSON dosyasında kalması yaygındır. Çeviri dosyalarınız sonsuz şekilde büyür ve "zombi anahtarlarla" dolar.

## Intlayer'ın Orta Yolu

İşte **Intlayer** gibi araçların yenilik yapmaya çalıştığı yer burasıdır. Intlayer, derleyicilerin güçlü olduğunu ancak örtük sihrin tehlikeli olduğunu anlar.

Intlayer, her iki yaklaşımın avantajlarından faydalanmanızı sağlayan karma bir yöntem sunar: deklaratif içerik yönetimi ve geliştirme süresini kısaltmak için kendi derleyicisiyle uyumluluk.

Ve hatta Intlayer derleyicisini kullanmasanız bile, Intlayer bir `transform` komutu sunar (VSCode uzantısı kullanılarak da erişilebilir). Gizli derleme adımında sadece sihir yapmak yerine, aslında **bileşen kodunuzu yeniden yazabilir**. Metninizi tarar ve kod tabanınızdaki açık içerik beyanlarıyla değiştirir.

Bu size her iki dünyanın en iyisini sunar:

1.  **Detaylılık:** Çevirilerinizi bileşenlerinize yakın tutarsınız (modülerliği ve tree-shaking'i geliştirir).
2.  **Güvenlik:** Çeviri, gizli derleme zamanı sihri değil, açık kod haline gelir.
3.  **Kilitlenme Yok:** Kod, depo içinde deklaratif bir yapıya dönüştürüldüğünden, içerik beyanlarınızı oluşturmak için kolayca tab tuşuna basabilir veya IDE'nizin copilot'unu kullanabilirsiniz; mantığı bir webpack eklentisinde gizlemiyorsunuz.

## Sonuç

Peki, hangisini seçmelisiniz?

**Eğer bir MVP (Minimum Viable Product) geliştiriyorsanız veya hızlı ilerlemek istiyorsanız:**
Derleyici tabanlı yaklaşım geçerli bir seçimdir. Çok hızlı ilerlemenizi sağlar. Dosya yapıları veya anahtarlar hakkında endişelenmenize gerek yoktur. Sadece inşa edersiniz. Teknik borç, "Gelecekteki Siz" için bir sorundur.

**Eğer Junior Geliştiriciyseniz veya optimizasyona önem vermiyorsanız:**
En az manuel yönetim istiyorsanız, derleyici tabanlı yaklaşım muhtemelen en iyisidir. Anahtarları veya çeviri dosyalarını kendiniz yönetmenize gerek kalmaz—sadece metni yazarsınız ve derleyici geri kalanını otomatikleştirir. Bu, kurulum çabasını ve manuel adımlara bağlı yaygın i18n hatalarını azaltır.

**Eğer zaten binlerce bileşeni yeniden düzenlemeyi gerektiren mevcut bir projeyi uluslararasılaştırıyorsanız:**
Derleyici tabanlı bir yaklaşım burada pragmatik bir seçim olabilir. İlk çıkarım aşaması haftalar veya aylar süren manuel çalışmayı kurtarabilir. Ancak, Intlayer'ın `transform` komutu gibi bir aracı kullanmayı düşünün; bu araç dizeleri çıkarabilir ve bunları açık beyan edici içerik deklarasyonlarına dönüştürebilir. Bu, otomasyon hızını sağlarken, beyan edici yaklaşımın güvenliği ve taşınabilirliğini korur. İki dünyanın en iyisini elde edersiniz: uzun vadeli mimari borç olmadan hızlı ilk geçiş.

**Profesyonel, Kurumsal Düzeyde Bir Uygulama Geliştiriyorsanız:**
Sihir genellikle kötü bir fikirdir. Kontrole ihtiyacınız var.

- Backend'lerden gelen dinamik verileri yönetmeniz gerekir.
- Düşük donanımlı cihazlarda performansı sağlamanız gerekir (hook patlamalarını önleyerek).
- Belirli bir build aracına sonsuza dek bağlı kalmadığınızdan emin olmanız gerekir.

Profesyonel uygulamalar için, **Deklaratif İçerik Yönetimi** (Intlayer veya yerleşik kütüphaneler gibi) altın standart olmaya devam eder. Bu, endişelerinizi ayırır, mimarinizi temiz tutar ve uygulamanızın çoklu dil desteğinin, niyetlerinizi tahmin eden "kara kutu" bir derleyiciye bağlı olmamasını sağlar.
