---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Intlayer Dokümantasyonu - JavaScript İçin Tam i18n Rehberi
description: JavaScript, React, Next.js, Express ve daha fazla çerçeve için modern uluslararasılaştırma kütüphanesi Intlayer için tam dokümantasyon.
keywords:
  - intlayer
  - internationalization
  - i18n
  - JavaScript
  - React
  - Next.js
  - documentation
  - translation
  - multilingual
slugs:
  - doc
  - index
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Intlayer Dokümantasyonu

Resmi **Intlayer** dokümantasyonuna hoş geldiniz! Burada, **Next.js**, **React**, **Vite**, **Express** veya başka bir JavaScript ortamında çalışıp çalışmadığınızdan bağımsız olarak, tüm uluslararasılaştırma (i18n) ihtiyaçlarınız için Intlayer'ı entegre etmek, yapılandırmak ve ustalaşmak için ihtiyacınız olan her şeyi bulacaksınız.

Intlayer, uygulamanızı çevirmek için esnek, modern bir yaklaşım sunar. Belgelerimiz, kurulum ve kurulumdan **AI destekli çeviri**, **TypeScript** tanımlar ve **sunucu bileşeni** desteği gibi gelişmiş özelliklere kadar sizi yönlendirecek, sorunsuz, çok dilli bir deneyim yaratmanızı sağlayacak.

---

## Başlarken

- **[Giriş](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/introduction.md)**  
  Intlayer'ın nasıl çalıştığına, temel özelliklerine ve i18n için neden devrim yarattığına genel bir bakış elde edin.

- **[Intlayer Nasıl Çalışır](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/how_works_intlayer.md)**  
  Mimari tasarıma dalın ve Intlayer'ın içerik bildiriminden çeviri teslimine kadar her şeyi nasıl yönettiğini öğrenin.

- **[Konfigürasyon](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)**  
  Intlayer'ı projenizin ihtiyaçlarına göre özelleştirin. Ara yazılım seçeneklerini, dizin yapılarını ve gelişmiş ayarları keşfedin.

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)**  
  Komut satırı aracımızı kullanarak içeriği ve çevirileri yönetin. İçeriği itmeyi ve çekmeyi, çevirileri otomatikleştirmeyi ve daha fazlasını keşfedin.

- **[Intlayer Düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**  
  Geliştirici olmayanlarla işbirliğini basitleştirin ve ücretsiz, sezgisel CMS'mizde doğrudan çevirilerinizi AI ile güçlendirin.

---

## Temel Kavramlar

### Sözlük

Çok dilli içeriğinizi kodunuzun yakınında organize edin, böylece her şey tutarlı ve sürdürülebilir kalır.

- **[Başlarken](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)**  
  Intlayer'da içeriğinizi bildirmenin temellerini öğrenin.

- **[Çeviri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/translation.md)**  
  Çevirilerin uygulamanızda nasıl oluşturulduğunu, depolandığını ve kullanıldığını anlayın.

- **[Numaralandırma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/enumeration.md)**  
  Çeşitli dillerde tekrarlanan veya sabit veri kümelerini kolayca yönetin.

- **[Koşul](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/conditional.md)**  
  Intlayer'da dinamik içerik oluşturmak için koşullu mantığı nasıl kullanacağınızı öğrenin.

- **[Cinsiyet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/gender.md)**  
  Intlayer'da dinamik içerik oluşturmak için cinsiyet mantığını nasıl kullanacağınızı öğrenin.

- **[Ekleme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/insertion.md)**
  Ekleme yer tutucuları kullanarak bir dizeye değer eklemeyi keşfedin.

- **[Fonksiyon Getirme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/function_fetching.md)**  
  Projenizin iş akışına uyacak şekilde özel mantıkla içeriği dinamik olarak nasıl getireceğinizi görün.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md)**  
  Zengin içerik oluşturmak için Intlayer'da Markdown'ı nasıl kullanacağınızı öğrenin.

- **[Dosya gömme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/file_embeddings.md)**  
  İçerik düzenleyicide kullanmak için Intlayer'da harici dosyaları nasıl gömeceğinizi keşfedin.

- **[İç içe yerleştirme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/nesting.md)**  
  Karmaşık yapılar oluşturmak için Intlayer'da içeriği nasıl iç içe yerleştireceğinizi anlayın.

---

## Ortamlar ve Entegrasyonlar

Intlayer'ı esneklik göz önünde bulundurarak oluşturduk, popüler çerçeveler ve yapı araçları arasında sorunsuz entegrasyon sunuyoruz:

- **[Intlayer ile Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)**
- **[Intlayer ile Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md)**
- **[Intlayer ile Next.js Sayfa Yönlendirici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md)**
- **[Intlayer ile React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)**
- **[Intlayer ile Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md)**
- **[Intlayer ile React Native ve Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react_native+expo.md)**
- **[Intlayer ile Lynx ve React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_lynx+react.md)**
- **[Intlayer ile Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_express.md)**

Her entegrasyon rehberi, **sunucu tarafında işleme**, **dinamik yönlendirme** veya **istemci tarafında işleme** gibi Intlayer özelliklerini kullanmak için en iyi uygulamaları içerir, böylece hızlı, SEO dostu ve yüksek düzeyde ölçeklenebilir bir uygulama koruyabilirsiniz.

---

## Paketler

Intlayer'ın modüler tasarımı, belirli ortamlar ve ihtiyaçlar için özel paketler sunar:

### `intlayer`

i18n kurulumunuzu yapılandırmak ve yönetmek için temel yardımcı fonksiyonlar.

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getTranslation.md)**
- **[getEnumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getEnumeration.md)**

### `express-intlayer`

**Express** tabanlı uygulamalarda Intlayer'ı kullanın:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/express-intlayer/t.md)**  
  Sunucu rotalarınız ve görünümleriniz için minimal, basit bir çeviri yardımcısı.

### `react-intlayer`

Güçlü kancalarla **React** uygulamalarınızı geliştirin:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

**Next.js** ile sorunsuz entegrasyon:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useLocale.md)**

---

## Ek Kaynaklar

- **[Blog: Intlayer ve i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_i18next.md)**  
  Intlayer'ın popüler **i18next** kütüphanesiyle nasıl tamamlandığını ve karşılaştırıldığını öğrenin.

- **[YouTube'da Canlı Eğitim](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  Kapsamlı bir demo izleyin ve Intlayer'ı gerçek zamanlı olarak nasıl entegre edeceğinizi öğrenin.

---

## Katkıda Bulunma ve Geri Bildirim

Açık kaynak ve topluluk odaklı geliştirmenin gücüne değer veriyoruz. Belgelerimizde iyileştirmeler önermek, yeni bir rehber eklemek veya herhangi bir sorunu düzeltmek isterseniz, [GitHub deposumuzda](https://github.com/aymericzip/intlayer/blob/main/docs/docs) bir Pull Request gönderin veya bir sorun açın.

**Uygulamanızı daha hızlı ve verimli bir şekilde çevirmeye hazır mısınız?** Bugün Intlayer'ı kullanmaya başlamak için belgelerimize dalın. İçeriğinizi organize tutan ve ekibinizi daha üretken kılan sağlam, akıcı bir uluslararasılaştırma yaklaşımı deneyimleyin.
