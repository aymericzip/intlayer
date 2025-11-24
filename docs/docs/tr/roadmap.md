---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Yol Haritası
description: Intlayer'ın yol haritasını keşfedin. Intlayer'ın uyguladığı ve uygulamayı planladığı tüm özellikleri görün.
keywords:
  - Yol Haritası
  - Intlayer
  - Uluslararasılaştırma
  - CMS
  - İçerik Yönetim Sistemi
  - Görsel Düzenleyici
slugs:
  - doc
  - roadmap
history:
  - version: 5.5.10
    date: 2025-06-30
    changes: Preact ve Nuxt desteği, MCP Sunucusu, CLI güncellemesi eklendi
  - version: 5.5.11
    date: 2025-06-29
    changes: `docs` komutları eklendi
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Intlayer: Özellik Genel Bakışı & Yol Haritası

Intlayer, uygulamalarınızda içeriği bildirme, yönetme ve güncelleme şeklinizi kolaylaştırmak için tasarlanmış bir içerik yönetimi ve uluslararasılaştırma çözümüdür. Merkezi veya dağıtılmış içerik bildirimi, kapsamlı uluslararasılaştırma seçenekleri, Markdown desteği, koşullu oluşturma, TypeScript/JavaScript/JSON entegrasyonu ve daha fazlası gibi güçlü özellikler sunar. Aşağıda Intlayer'ın şu anda sağladığı kapsamlı bir genel bakış, ardından yaklaşan yol haritası özellikleri bulunmaktadır.

---

## Mevcut Özellikler

### 1. İçerik Bildirimi

#### Merkezi veya Dağıtılmış

- **Merkezi**: i18next'e benzer şekilde, uygulamanızın tabanında tüm içeriğinizi tek, büyük bir dosyada bildirin, böylece her şeyi tek bir yerde yönetebilirsiniz.
- **Dağıtılmış**: Alternatif olarak, içeriğinizi bileşen veya özellik düzeyinde ayrı dosyalara bölerek daha iyi sürdürülebilirlik sağlayın. Bu, içeriğinizi ilgili koda (bileşenler, testler, Storybook vb.) yakın tutar. Bir bileşeni kaldırmak, ilişkili içeriğin de kaldırılmasını sağlar, böylece kod tabanınızı kalabalık hale getiren kalan verilerden kaçınırsınız.

> Kaynaklar:
>
> - [İçerik Bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)

### 2. Uluslararasılaştırma

- **230 dil ve yerel ayar** desteği (Fransızca (Fransa), İngilizce (Kanada), İngilizce (BK), Portekizce (Portekiz) vb. bölgesel varyantlar dahil).
- Tüm bu yerel ayarlar için çevirileri tek bir yerden kolayca yönetin.

> Kaynaklar:
>
> - [Uluslararasılaştırma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/translation.md)

### 3. Markdown Desteği

- Paragraflar, başlıklar, bağlantılar vb. ile metni otomatik olarak biçimlendirmenize izin veren **Markdown** kullanarak içerik bildirin.
- Blog yazıları, makaleler, dokümantasyon sayfaları veya zengin metin biçimlendirmesinin gerekli olduğu herhangi bir senaryo için idealdir.

> Kaynaklar:
>
> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md)

### 4. Harici dosya desteği

- TXT, HTML, JSON, YAML veya CSV gibi metin formatında harici dosyalardan içerik içe aktarın.
- Intlayer Görsel Düzenleyici ve CMS ile sorunsuz entegrasyon sağlamak için bir sözlükte harici dosya içeriğini gömmek üzere `file` fonksiyonunu kullanın.
- Kaynak dosya değiştirildiğinde içeriğin Intlayer içinde otomatik olarak güncellenmesini sağlayan dinamik içerik güncellemelerini destekler.
- Dil özel Markdown dosyalarını dinamik olarak bağlayarak çok dilli içerik yönetimini etkinleştirir.

> Kaynaklar:
>
> - [Dosya İçerik Gömme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/file.md)

### 5. Dinamik İçerik & Fonksiyon Alma

Intlayer, içerik tesliminde esneklik ve uyarlanabilirlik sağlamak için dinamik içeriği ekleme ve yönetme çeşitli yöntemleri sağlar. Bu, dinamik içerik ekleme, koşullu oluşturma, numaralandırma, iç içe geçme ve fonksiyon alma işlevlerini içerir.

1. Dinamik İçerik Ekleme

   Yer tutucular ({{name}}, {{age}} vb.) ile içerik tanımlamak için insert fonksiyonunu kullanın.

   Kullanıcı girişi, API yanıtları veya diğer dinamik veri kaynaklarına dayalı olarak uyarlanan şablon benzeri içeriği etkinleştirir.

   TypeScript, ESM, CommonJS ve JSON yapılandırmalarıyla sorunsuz çalışır.

   useIntlayer kullanarak React Intlayer ve Next Intlayer ile kolayca entegre olur.

2. Koşullu Oluşturma

   Dil veya kimlik doğrulama durumu gibi kullanıcıya özel koşullara dayalı olarak uyarlanan içerik tanımlayın.

   İçeriği birden fazla dosya arasında çoğaltmadan kişiselleştirilmiş deneyimler oluşturun.

3. Numaralandırma & Çoğullaştırma

   Sayısal değerlere, aralıklara veya özel anahtarlara dayalı içerik varyasyonları tanımlamak için enu fonksiyonunu kullanın.

   Verilen değere göre doğru ifadenin otomatik seçimini sağlar.

   Tahmin edilebilir davranış sağlamak için sıralama kurallarını destekler.

4. İç İçe Geçme & Alt İçerik Referanslama

   Başka bir sözlükten içerik referanslamak ve yeniden kullanmak için nest fonksiyonunu kullanın, çoğaltmayı azaltın.

   Daha iyi sürdürülebilirlik için yapılandırılmış ve hiyerarşik içerik yönetimini destekler.

5. Fonksiyon Alma

   Intlayer, içeriğin hem senkron hem de asenkron içerik alma için fonksiyonlar olarak bildirilmesine izin verir.

   Senkron Fonksiyonlar: İçerik oluşturma zamanında dinamik olarak oluşturulur.

   Asenkron Fonksiyonlar: Harici kaynaklardan (API'ler, veritabanları vb.) veri dinamik olarak alır.

   Entegrasyon: TypeScript, ESM ve CommonJS ile çalışır ancak JSON veya uzak içerik dosyalarında desteklenmez.

### 6. İçerik Bildirim Formatları

Intlayer içerik bildirmek için **TypeScript** (ayrıca JavaScript) ve **JSON**'u destekler.

- **TypeScript**:
  - İçerik yapınızın doğru olmasını ve hiçbir çevirinin eksik olmadığını sağlar.
  - Sıkı veya daha esnek doğrulama modları sunar.
  - Değişkenlerden, fonksiyonlardan veya harici API'lerden dinamik veri almaya izin verir.

- **JSON**:
  - Standartlaştırılmış formatı nedeniyle görsel düzenleyiciler gibi harici araçlarla entegrasyonu kolaylaştırır.

  > Kaynaklar:
  >
  > - [İçerik Bildirim Formatları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)

### 7. Temizleme, paket optimizasyonu ve dinamik içe aktarmalar

- Intlayer, paketinizi optimize etmek ve performansı artırmak için `Babel` ve `SWC` eklentilerini entegre eder. İçe aktarmaları değiştirir, pakete sadece kullanılan sözlüklerin içe aktarılmasına izin verir.
- Seçeneği etkinleştirerek, Intlayer ayrıca mevcut yerel ayar için sözlük içeriğini dinamik olarak içe aktarmaya izin verir.

> Kaynaklar:
>
> - [Oluşturma Yapılandırması](https://intlayer.org/doc/concept/configuration#build-configuration)

---

## Çerçeveler & Ortamlarla Entegrasyon

### 1. Next.js

#### a. Sunucu ve İstemci Bileşenleri

- Hem sunucu hem de istemci bileşenleri için **birleşik içerik yönetimi yaklaşımı** sağlar.
- Diğer çözümlere kıyasla uygulanmasını basitleştiren sunucu bileşenleri için yerleşik bağlam sunar.

#### b. Meta veriler, Site Haritaları ve robots.txt

- Meta veriler, site haritaları veya `robots.txt` dosyaları oluşturmak için içeriği dinamik olarak almak ve enjekte etmek.

#### c. Ara Yazılım

- Kullanıcıları tercih ettikleri dile göre içeriğe **yönlendirmek** için bir ara yazılım ekleyin.

#### d. Turbopack ve Webpack Uyumluluğu

- Yeni Next.js Turbopack ile tam uyumlu, geleneksel Webpack ile birlikte.

> Kaynaklar:
>
> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)

### 2. Vite

- Next.js'e benzer şekilde, Intlayer'ı Vite ile entegre edebilir ve kullanıcıları tercih ettikleri dile göre içeriğe yönlendirmek için bir **ara yazılım** kullanabilirsiniz.

> Kaynaklar:
>
> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md)

### 3. Express

- Express üzerine inşa edilmiş arka uç servislerinde içeriği yönetin ve uluslararasılaştırın.
- E-postaları, hata mesajlarını, push bildirimlerini vb. yerelleştirilmiş metinle kişiselleştirin.

> Kaynaklar:
>
> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_express.md)

### 4. React Native

- Mobil uygulamalarınızı yönetmek ve uluslararasılaştırmak için Intlayer'ı React Native ile entegre edin.
- Hem iOS hem de Android platformlarını destekler.

> Kaynaklar:
>
> - [React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react_native.md)

### 5. Lynx

- Mobil uygulamalarınızı yönetmek ve uluslararasılaştırmak için Intlayer'ı Lynx ile entegre edin.
- Hem iOS hem de Android platformlarını destekler.

> Kaynaklar:
>
> - [Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_lynx.md)

### 6. Vue

- Vite / Vue.js uygulamalarınızı yönetmek ve uluslararasılaştırmak için Intlayer'ı Vue ile entegre edin.

> Kaynaklar:
>
> - [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vue.md)

### 7. Nuxt

- Nuxt / Vue.js uygulamalarınızı yönetmek ve uluslararasılaştırmak için Intlayer'ı Nuxt ile entegre edin.
- Hem sunucu hem de istemci bileşenlerini destekler.
- Kullanıcıları tercih ettikleri dile göre içeriğe yönlendirmek için yönlendirme ve ara yazılımı entegre eder.

> Kaynaklar:
>
> - [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nuxt.md)

### 8. Preact

- Preact uygulamalarınızı yönetmek ve uluslararasılaştırmak için Intlayer'ı Preact ile entegre edin.

> Kaynaklar:
>
> - [Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_preact.md)

---

## Görsel Düzenleyiciler ve CMS

### 1. Yerel Görsel Düzenleyici

- Sayfadaki öğeleri doğrudan seçerek uygulama içeriğinizi düzenlemenizi sağlayan **ücretsiz, yerel bir görsel düzenleyici**.
- Yardımcı olmak için AI özelliklerini entegre eder:
  - Çeviri oluşturma veya düzeltme
  - Sözdizimi ve yazım kontrolü
  - İyileştirmeler önerme
- Yerel olarak barındırılabilir veya uzak bir sunucuda dağıtılabilir.

> Kaynaklar:
>
> - [Görsel Düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)

### 2. Intlayer CMS (Uzak)

- Kod tabanınıza dokunmadan uygulama içeriğini çevrimiçi yönetmenizi sağlayan **barındırılan bir CMS** çözümü.
- İçerik bildirme, çeviri yönetimi ve sözdizimi veya yazım hatalarını düzeltme için AI destekli özellikler sağlar.
- Canlı uygulama arayüzünüz aracılığıyla içeriğinizle etkileşim kurun.

> Kaynaklar:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)

---

## IDE Uzantıları

- Yerel ve uzak çevirileri yönetmek için ana IDE'ler için **grafiksel arayüz** sağlayan uzantılar.
- Özellikler bileşenler için içerik bildirim dosyaları otomatik oluşturma, Intlayer CMS ile doğrudan entegrasyon ve gerçek zamanlı doğrulamayı içerebilir.

---

## MCP Sunucusu

- IDE'nizde entegre bir araç kullanarak içeriğinizi ve çevirilerinizi yönetmenizi sağlayan bir **MCP sunucusu**.

---

## Intlayer CLI

- **Çeviri ve dosya oluşturma**: İçerik dosyalarınızda eksik çeviriler oluşturmak ve tutarsızlıkları gözden geçirmek için denetimler çalıştırın.
- **Uzak Etkileşim**: Yerel içeriğinizi uzak CMS'ye gönderin veya uzak içeriği yerel uygulamanıza entegre etmek için çekin.
- **Dokümantasyon çevirisi ve gözden geçirme**: Dokümantasyonunuzu / dosyalarınızı vb. çevirin ve gözden geçirin.

> Kaynaklar:
>
> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)

---

## Ortamlar

- Intlayer'ı üretim, test ve yerel ortamlar arasında farklı şekilde yapılandırmak için **ortam değişkenleri** kullanın.
- Ortamınıza bağlı olarak hangi görsel düzenleyiciyi veya uzak CMS projesini hedefleyeceğinizi tanımlayın.

---

## Sıcak İçerik Güncellemeleri

- Uzak sözlükler ve Intlayer CMS kullanırken, yeniden dağıtım gerektirmeden uygulamanızın içeriğini **anında güncelleyin**.

> Kaynaklar:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)

---

## Yaklaşan Özellikler

### 1. A/B Testi & Kişiselleştirme

- **Çok Değişkenli Test**: Verilen bir içerik parçasının farklı sürümlerini test edin ve hangisinin en iyi performans gösterdiğini görün (ör. daha yüksek tıklama oranı).
- **Veri Güçlü Kişiselleştirme**: Kullanıcı demografisine (cinsiyet, yaş, konum vb.) veya diğer davranış kalıplarına göre farklı içerik görüntüleyin.
- **Otomatik Yineleme**: AI'nin otomatik olarak birden fazla sürüm test etmesine izin verin ve en iyi performansı seçin veya yönetici onayı için seçenekler önerin.

### 2. Sürümleme

- **İçerik sürümleme** ile içeriğinizin önceki sürümlerini geri yükleyin.
- Zaman içinde değişiklikleri takip edin ve gerekirse önceki durumlara geri dönün.

### 3. Otomatik Çeviri

- Uzak CMS kullanıcıları için, desteklenen herhangi bir dil için **tek tıklamayla çeviri oluşturma**.
- Sistem çevirileri arka planda oluşturacak ve ardından doğrulama veya düzenleme için sizi uyaracaktır.

### 4. SEO Geliştirmeleri

- **Anahtar kelimeleri analiz etme**, kullanıcı arama niyetini ve ortaya çıkan trendleri izleme araçları.
- Daha iyi sıralamalar için iyileştirilmiş içerik önerin ve uzun vadeli performansı takip edin.

### 5. Daha Fazla Çerçeve ile Uyumluluk

- **Solid, Svelte, Angular** ve daha fazlasını destekleme çabaları devam ediyor.
- Intlayer'ı **herhangi bir JavaScript destekli uygulama** ile uyumlu hale getirme hedefi.

---

## Sonuç

Intlayer, içerik yönetimi ve uluslararasılaştırma için tek duraklı bir çözüm olmayı hedefliyor. Esnekliğe (merkezi veya dağıtılmış dosyalar), geniş dil desteğine, modern çerçeveler ve paketleyicilerle kolay entegrasyona ve güçlü AI destekli özelliklere odaklanıyor. A/B testi, sürümleme ve otomatik çeviri gibi yeni yetenekler mevcut hale geldikçe, Intlayer içerik iş akışlarını basitleştirmeye ve farklı platformlarda kullanıcı deneyimlerini yükseltmeye devam edecektir.

Yaklaşan sürümler için bizi takip edin ve mevcut özellikleri keşfederek Intlayer'ın bugün içerik yönetimi süreçlerinizi nasıl merkezileştirebileceğini ve optimize edebileceğini görün!

---
