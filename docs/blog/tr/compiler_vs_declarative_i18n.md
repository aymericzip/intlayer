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

On yıldan fazla süredir web uygulamaları geliştiriyorsanız, Uluslararasılaştırmanın (i18n) her zaman bir zorluk noktası olduğunu bilirsiniz. Genellikle kimsenin yapmak istemediği bir görevdir—metinleri çıkarmak, JSON dosyalarını yönetmek ve çoğul ek kurallarıyla uğraşmak.

Son zamanlarda, bu acıyı ortadan kaldırmayı vaat eden yeni bir "Derleyici tabanlı" i18n araç dalgası ortaya çıktı. Teklif cazip: **Sadece bileşenlerinizde metni yazın, gerisini derleme aracı halletsin.** Anahtar yok, import yok, sadece sihir.

Ancak yazılım mühendisliğindeki tüm soyutlamalarda olduğu gibi, sihrin de bir bedeli vardır.

Bu blog yazısında, deklaratif kütüphanelerden derleyici tabanlı yaklaşımlara geçişi, getirdikleri gizli mimari borçları ve neden "sıkıcı" yolun profesyonel uygulamalar için hala en iyi yol olabileceğini inceleyeceğiz.

## Çevirinin Kısa Tarihi

Nerede olduğumuzu anlamak için, başladığımız yere bakmamız gerekiyor.

2011–2012 yıllarında, JavaScript dünyası oldukça farklıydı. Bildiğimiz bundlerlar (Webpack, Vite) ya yoktu ya da çok erken aşamalardaydı. Tarayıcıda scriptleri birbirine yapıştırıyorduk. Bu dönemde, **i18next** gibi kütüphaneler doğdu.

O zamanlar problemi çözmenin tek yolu vardı: **Çalışma Zamanı Sözlükleri**. Büyük bir JSON nesnesini belleğe yüklüyordunuz ve bir fonksiyon anahtarları anında arıyordu. Bu yöntem güvenilir, açık ve her yerde çalışıyordu.

Bugüne hızlıca gelirsek. Milisaniyeler içinde Abstract Syntax Tree (AST) çözümleyebilen güçlü derleyicilerimiz var (SWC, Rust tabanlı bundlerlar). Bu güç yeni bir fikrin doğmasına yol açtı: _Neden anahtarları manuel olarak yönetiyoruz? Derleyici neden "Hello World" metnini görüp bizim için değiştirmesin?_

Böylece, Derleyici tabanlı i18n doğdu.

## Derleyicinin Cazibesi ("Sihirli" Yaklaşım)

Bu yeni yaklaşımın popüler olmasının bir nedeni var. Bir geliştirici için deneyim inanılmazdır.

### 1. Hız ve "Akış"

İşin içindeyken, bir değişken adı (`home_hero_title_v2`) düşünmek için durmak akışınızı bozar. Derleyici yaklaşımıyla, `<p>Welcome back</p>` yazarsınız ve devam edersiniz. Sürtünme sıfırdır.

### 2. Miras Kurtarma Görevi

5.000 bileşenli ve hiç çevirisi olmayan devasa bir kod tabanını devraldığınızı hayal edin. Bunu manuel anahtar tabanlı bir sistemle sonradan uyarlamak aylar süren bir kabus olur. Derleyici tabanlı bir araç, tek bir dosyaya elle dokunmanıza gerek kalmadan binlerce metni anında çıkaran bir kurtarma stratejisi olarak görev yapar.

### 3. Yapay Zeka Çağı

Bu, göz ardı etmememiz gereken modern bir avantajdır. AI kodlama asistanları (Copilot veya ChatGPT gibi) doğal olarak standart JSX/HTML üretir. Özel çeviri anahtarı şemanızı bilmezler.

- **Deklaratif:** AI'nın çıktısını, metni anahtarlarla değiştirmek için yeniden yazmanız gerekir.
- **Derleyici:** AI'nın kodunu kopyalayıp yapıştırırsınız ve sadece çalışır.

## Gerçeklik Kontrolü: Neden "Sihir" Tehlikelidir

"Sihir" çekici olsa da, soyutlama sızar. İnsan niyetini anlaması için bir derleme aracına güvenmek mimari kırılganlık getirir.

### 1. Sezgisel Kırılganlık (Tahmin Oyunu)

Derleyici, içeriğin ne olduğunu ve kodun ne olduğunu tahmin etmek zorundadır.

- `className="active"` çevrilir mi? Bu bir string.
- `status="pending"` çevrilir mi?
- `<MyComponent errorMessage="An error occurred" />` çevrilir mi?
- `"AX-99"` gibi bir ürün kimliği çevrilir mi?

Sonuç olarak, derleyiciyle "mücadele" etmek zorunda kalırsınız ve uygulama mantığınızı bozmasını önlemek için `// ignore-translation` gibi özel yorumlar eklersiniz.

### 2. Dinamik Veri Sert Sınırı

Derleyici çıkarımı **statik analiz**e dayanır. Kararlı bir ID oluşturmak için kodunuzda literal stringi görmesi gerekir.
API'niz `server_error` gibi bir hata kodu stringi dönerse, derleyici bunu derleme zamanında bilmediği için çeviremezsiniz. Dinamik veriler için yalnızca çalışma zamanı "runtime-only" ikinci bir sistem kurmak zorunda kalırsınız.

### 3. "Parça Patlaması" ve Ağ Şelaleleri

Ağaç sarsma (tree-shaking) için, derleyici araçları genellikle çevirileri bileşen bazında böler.

- **Sonuç:** 50 küçük bileşene sahip tek bir sayfa görüntülemesi, küçük çeviri parçaları için **50 ayrı HTTP isteği** tetikleyebilir. HTTP/2 olsa bile, bu durum tek, optimize edilmiş bir dil paketi yüklemeye kıyasla uygulamanızın yavaş hissetmesine neden olan bir ağ şelalesi oluşturur.

### 4. Çalışma Zamanı Performans Yükü

Çevirilerin reaktif olmasını sağlamak (yani dil değiştirdiğinizde anında güncellenmesi için), derleyici genellikle _her_ bileşene durum yönetimi (state management) hook'ları enjekte eder.

- **Maliyet:** Eğer 5.000 öğeden oluşan bir liste render ederseniz, yalnızca metin için 5.000 `useState` ve `useEffect` hook'u başlatıyorsunuz demektir. Bu, deklaratif kütüphanelerin (genellikle tek bir Context sağlayıcı kullanan) tasarruf ettiği bellek ve CPU döngülerini tüketir.

## Tuzak: Vendor Lock-in (Tedarikçi Bağımlılığı)

Bu, derleyici tabanlı i18n'nin muhtemelen en tehlikeli yönüdür.

Deklaratif bir kütüphanede, kaynak kodunuz açık niyet içerir. Anahtarlar size aittir. Kütüphane değiştirirseniz, sadece import'u değiştirirsiniz.

Derleyici tabanlı bir yaklaşımda, **kaynak kodunuz sadece İngilizce metindir.** "Çeviri mantığı" sadece build eklentisinin yapılandırması içinde vardır.
Eğer o kütüphane bakım dışı kalırsa veya ihtiyaçlarınızı karşılamaz hale gelirse, sıkışıp kalırsınız. Kaynak kodunuzda hiç çeviri anahtarı olmadığından kolayca "eject" yapamazsınız. Göç etmek için tüm uygulamanızı manuel olarak yeniden yazmanız gerekir.

## Diğer Taraf: Deklaratif Yaklaşımın Riskleri

Adil olmak gerekirse, geleneksel deklaratif yöntem de mükemmel değildir. Kendi "kendi ayağına sıkma" sorunları vardır.

1.  **Namespace Cehennemi:** Hangi JSON dosyalarının yükleneceğini (`common.json`, `dashboard.json`, `footer.json`) genellikle manuel olarak yönetmeniz gerekir. Birini unutursanız, kullanıcı ham anahtarları görür.
2.  **Aşırı Yükleme:** Dikkatli yapılandırma yapılmazsa, başlangıç yüklemesinde _tüm_ sayfalarınız için _tüm_ çeviri anahtarlarınızı yanlışlıkla yüklemek çok kolaydır ve bu da paket boyutunuzu şişirir.
3.  **Senkronizasyon Kayması:** Bir bileşeni kullanan anahtarlar silindikten sonra bile JSON dosyasında kalması yaygındır. Çeviri dosyalarınız "zombi anahtarlarla" dolarak sonsuz şekilde büyür.

## Intlayer Orta Yolu

İşte **Intlayer** gibi araçların yenilik yapmaya çalıştığı yer burasıdır. Intlayer, derleyicilerin güçlü olduğunu ancak örtük sihrin tehlikeli olduğunu anlar.

Intlayer benzersiz bir **`transform` komutu** sunar. Gizli derleme adımında sadece sihir yapmak yerine, aslında **bileşen kodunuzu yeniden yazabilir**. Metninizi tarar ve kod tabanınızda açık içerik beyanları ile değiştirir.

Bu size her iki dünyanın en iyisini sunar:

1.  **Detaylılık:** Çevirilerinizi bileşenlerinize yakın tutarsınız (modülerliği ve tree-shaking'i geliştirir).
2.  **Güvenlik:** Çeviri, gizli derleme zamanı sihri değil, açık kod haline gelir.
3.  **Kilitlenme Yok:** Kod, depo içinde standart bir deklaratif yapıya dönüştürüldüğünden, mantığı bir webpack eklentisinde gizlememiş olursunuz.

## Sonuç

Peki, hangisini seçmelisiniz?

**Eğer Junior Geliştirici, Tek Kurucu ya da bir MVP geliştiriyorsanız:**
Derleyici tabanlı yaklaşım geçerli bir seçimdir. Çok hızlı ilerlemenizi sağlar. Dosya yapıları veya anahtarlar hakkında endişelenmenize gerek yoktur. Sadece inşa edersiniz. Teknik borç "Gelecekteki Siz" için bir sorundur.

**Eğer Profesyonel, Kurumsal Düzeyde Bir Uygulama Geliştiriyorsanız:**
Sihir genellikle kötü bir fikirdir. Kontrole ihtiyacınız vardır.

- Backendlerden dinamik verileri yönetmeniz gerekir.
- Düşük donanımlı cihazlarda performansı garanti etmeniz gerekir (hook patlamalarını önleyerek).
- Belirli bir derleme aracına sonsuza kadar bağımlı kalmadığınızdan emin olmanız gerekir.

Profesyonel uygulamalar için, **Deklaratif İçerik Yönetimi** (Intlayer veya yerleşik kütüphaneler gibi) altın standart olmaya devam eder. Bu, endişelerinizi ayırır, mimarinizi temiz tutar ve uygulamanızın birden fazla dili konuşma yeteneğinin, niyetlerinizi tahmin eden "kara kutu" bir derleyiciye bağlı olmamasını sağlar.
