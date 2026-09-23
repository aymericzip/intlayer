---
createdAt: 2026-09-22
updatedAt: 2026-09-22
title: Chrome Uzantısı, i18n & SEO Tarayıcısı
description: Intlayer Chrome uzantısı ile herhangi bir web sitesinin i18n yapılandırmasını inceleyin. Framework'ü, i18n kütüphanesini, dilleri, hreflang ve SEO etiketlerini tespit edin ve tam bir i18n SEO denetimi gerçekleştirin.
keywords:
  - Chrome Uzantısı
  - i18n Tarayıcısı
  - hreflang Denetleyicisi
  - Çok Dilli SEO
  - Intlayer
  - Yerelleştirme
  - Geliştirme Araçları
slugs:
  - doc
  - chrome-extension
history:
  - version: 9.5.6
    date: 2026-09-22
    changes: "Başlangıç geçmişi"
author: aymericzip
---

# Chrome Uzantısı: i18n & SEO Tarayıcısı

## Genel Bakış

[**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc), **Intlayer**'ın resmi Chrome uzantısıdır. Bir sitenin uluslararasılaştırmayı nasıl yönettiğini görmek için herhangi bir web sitesinde açabilirsiniz: hangi framework ve i18n kütüphanesini kullandığını, hangi dilleri sunduğunu ve çok dilli SEO etiketlerinin doğru ayarlanıp ayarlanmadığını inceleyin.

Intlayer kullansın veya kullanmasın tüm web sitelerinde çalışır.

![Intlayer Chrome Uzantısı](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension.png?raw=true)

[Uzantı bağlantısı](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)

## Özellikler

- **Teknoloji tespiti**: framework'ü (Next.js, Nuxt, Astro, SvelteKit, Angular, Vue.js, Qwik, React, Gatsby, WordPress) ve i18n kütüphanesini (Intlayer, i18next, Vue I18n, @nuxtjs/i18n, Angular @angular/localize, next-intl / next-i18next, Weglot, Localize, WPML, Polylang) tanımlar. Her tespit, bunu tetikleyen genel değişken, çerez veya DOM işareti gibi kanıtları gösterir.
- **Diller (Locales)**: `lang` özniteliğinde, hreflang ve `og:locale` etiketlerinde, URL dil önekinde ve dil çerezlerinde veya depolama girdilerinde bulunan dilleri listeler.
- **SEO i18n etiketleri**: `html lang`, `html dir`, standart (canonical) bağlantı, hreflang etiketleri, `x-default`, `og:locale` ve yerelleştirilmiş dahili bağlantıların oranını kontrol eder.
- **Locale'ler arasında gezinme**: hreflang etiketlerine göre mevcut sayfayı tek tıkla yerelleştirilmiş sürümlerinden birine geçirir.
- **Site haritasında arama**: sitenin site haritasında listelenen tüm sayfalarda arama yapar ve bunları mevcut sekmede açar.
- **Tam denetim**: [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner) ile aynı denetimi çalıştırır ve canlı bir puan görüntüler.

## Kurulum

Chrome Web Mağazası'ndan [**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) eklentisini yükleyin ve ardından araç çubuğunuza sabitleyin.

Bu uzantı Chrome'da ve Chrome Web Mağazası uzantılarını destekleyen tüm Chromium tabanlı tarayıcılarda (Edge, Brave, Arc, Opera) çalışır.

## Kullanım

### Sayfayı inceleme

1. İncelemek istediğiniz web sitesini açın.
2. Araç çubuğundaki **Intlayer i18n Scanner** simgesine tıklayın.
3. Açılır pencere, geçerli sayfa için **Tespit edilen teknolojiler**, **Diller** ve **SEO i18n etiketleri** bölümlerini gösterir.

Tespit işlemi tarayıcınızda yerel olarak ve yalnızca geçerli sekmede çalışır.

### Locale'ler arasında gezinme

![Intlayer Chrome Uzantısı gezinme](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_navigation.png?raw=true)

**Gezin** bölümü, mevcut sayfanın hreflang etiketlerinden okunan **Yerelleştirilmiş sürümlerini** listeler. Bir locale'e tıklayarak o sürümü mevcut sekmede açın.

**Site haritası sayfaları** altında sitenin site haritasındaki URL'lerde arama yapın ve açmak için bir sonuca tıklayın.

### Tam denetim çalıştırma

![Intlayer Chrome Uzantısı denetim puanı](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_audit_score.png?raw=true)

**Tam denetim** bölümüne kaydırın ve **Tam i18n denetimini çalıştır**'a tıklayın. Sonuçlar her kontrol tamamlandıkça anlık olarak akar ve şu şekilde gruplandırılır:

- **Sayfa**: `html lang` ve `dir` öznitelikleri, geçerli dil, hreflang etiketleri, `x-default`, canonical bağlantı, yerelleştirilmiş dahili bağlantılar, dil seçici, bayrak simgeleri ve JavaScript paketinde yer alan kullanılmayan dil içeriği.
- **Robots.txt**: varlığı ve dil yollarının taranabilir kalıp kalmadığı.
- **Site Haritası (Sitemap)**: varlığı, listelenen her dil, alternatif bağlantılar ve `x-default`.
- **Alan Adı**: site genelinde keşfedilen dil sayısı.

Her kontrol başarılı, uyarı veya başarısız olarak işaretlenir ve puan, sayfanın genel i18n SEO sağlığını özetler.

## Gizlilik ve izinler

Uzantı minimum izin talep eder:

- **activeTab** ve **scripting**: algılayıcı yalnızca görüntülediğiniz sekmede ve yalnızca açılır pencereyi açtığınızda çalışır.
- **back.intlayer.org**: yalnızca tam bir denetim çalıştırdığınızda kullanılır. Geçerli sayfanın URL'si taranmak üzere Intlayer API'sine gönderilir.

Hiçbir tarama geçmişi toplanmaz ve arka planda hiçbir şey çalışmaz.

## SSS

<FAQ>

<Question title="Web sitesinin Intlayer kullanması gerekir mi?">

Hayır. Uzantı, hangi framework veya i18n kütüphanesini kullanırsa kullansın herhangi bir web sitesini inceler.

</Question>
<Question title="Bir teknoloji neden tespit edilemiyor?">

Tespit, sayfanın tarayıcıda sunduğu bilgilere dayanır: genel değişkenler, çerezler, meta etiketler ve DOM işaretleri. Bazı üretim derlemeleri bu işaretleri temizler, bu nedenle bir kütüphane görünür bir iz bırakmadan kullanılıyor olabilir.

</Question>
<Question title="Denetim tarafından bulunan sorunları nasıl düzeltebilirim?">

Çoğu kontrol, bir yönlendirme veya meta veri ayarıyla eşleşir. Intlayer ile hreflang, canonical, `x-default`, yerelleştirilmiş bağlantılar, site haritası ve robots.txt [yapılandırmanızdan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) oluşturulur. Framework'ünüz için entegrasyon kılavuzuna bakın, örneğin [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md), [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nuxt.md) veya [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_tanstack.md).

</Question>

</FAQ>

## İlgili araçlar

- [VS Code Eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)
- [MCP Sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)
- [LSP Sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)
