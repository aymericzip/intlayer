---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: SEO ve Uluslararasılaştırma
description: Çok dilli web sitenizi arama motorları için optimize etmeyi ve SEO'nuzu iyileştirmeyi öğrenin.
keywords:
  - SEO
  - Intlayer
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - SEO-and-i18n
---

# SEO & I18n: Web Sitenizi Çok Dilli Yapmanın Nihai Rehberi

Dünya çapında daha fazla kullanıcıya ulaşmak mı istiyorsunuz? Web sitenizi çok dilli yapmak, kitleinizi genişletmenin ve SEO'nuzu (Arama Motoru Optimizasyonu) iyileştirmenin en iyi yollarından biridir. Bu blog yazısında, uluslararası SEO'nun temellerini, genellikle **i18n** (uluslararasılaştırmanın kısaltması) olarak adlandırılanı, açık ve anlaşılır terimlerle açıklayacağız. Almanız gereken temel kararları, `hreflang` gibi teknik unsurları nasıl kullanacağınızı öğreneceksiniz ve **Intlayer** gibi araçların Next.js projelerinizde çok dilli yapmayı nasıl basitleştirebileceğini göreceksiniz.

---

## 1. Web Sitenizi Çok Dilli Yapmak Ne Anlama Geliyor?

Çok dilli bir web sitesi, içeriğini birden fazla dilde sunar. Örneğin, İngilizce bir sürümünüz (`example.com/en/`), Fransızca bir sürümünüz (`example.com/fr/`) ve İspanyolca bir sürümünüz (`example.com/es/`) olabilir. Bu yaklaşım, arama motorlarının kullanıcıların tercihlerine veya coğrafi konumlarına göre doğru dil sürümünü göstermesini sağlar.

Bunu doğru yaptığınızda, İngilizce konuşmayanlar için çok daha kullanıcı dostu bir deneyim yaratırsınız, bu da daha iyi etkileşim, daha yüksek dönüşüm oranları ve farklı bölgelerde iyileştirilmiş SEO anlamına gelir.

---

## 2. Doğru URL Yapısını Seçmek

Birden fazla dil sürümüne karar verirseniz, sitenizin URL'lerini açık ve tutarlı bir şekilde organize etmeniz gerekir. Her dil (veya bölge) internette kendi benzersiz "adresine" sahip olmalıdır. Aşağıda çok dilli web sitelerini yapılandırmanın üç yaygın yolu vardır:

1. Ülke Kodu Üst Düzey Alan Adları (ccTLD'ler)
   - Örnek: `example.fr`, `example.de`
   - **Artıları:** Arama motorlarına içeriğin hangi ülkeyi hedeflediğini güçlü bir sinyal gönderir (örneğin, `.fr` = Fransa).
   - **Eksileri:** Birden fazla alan adını yönetmek daha pahalı ve karmaşık olabilir.

2. **Alt Alan Adları**
   - **Örnek:** `fr.example.com`, `de.example.com`
   - **Artıları:** Her dil kendi alt alan adında "yaşar", dilleri eklemek veya kaldırmak nispeten kolaydır.
   - **Eksileri:** Arama motorları bazen alt alan adlarını ayrı siteler olarak değerlendirir, bu da ana alan adınızın otoritesini zayıflatabilir.

3. **Alt Dizinler (Alt Klasörler)**
   - **Örnek:** `example.com/fr/`, `example.com/de/`
   - **Artıları:** Yönetmesi kolaydır ve tüm trafik bir ana alan adına yönlendirilir.
   - **Eksileri:** ccTLD'ler kadar güçlü bir yerel SEO sinyali değildir (ancak doğru yapılırsa hala çok etkilidir).

> **İpucu:** Küresel bir markanız varsa ve işleri basit tutmak istiyorsanız, alt dizinler genellikle en iyisidir. Sadece bir veya iki ana ülkeyi hedefliyorsanız ve her birini gerçekten vurgulamak istiyorsanız, ccTLD'ler yol olabilir.

---

## 3. Hreflang ile Dil Hedeflemeyi Usta Düzeyine Getirmek

### 3.1. Hreflang Nedir?

Birden fazla dilde aynı veya çok benzer içeriğiniz olduğunda, Google gibi arama motorları hangi sürümü kullanıcıya gösterecekleri konusunda karışabilir. **Hreflang**, arama motorlarına belirli bir sayfanın hangi dil (ve bölge) için tasarlandığını ve alternatif dil/bölge sayfalarının ne olduğunu söyleyen bir HTML özelliğidir.

### 3.2. Bu Neden Önemli?

1. **Yinelenen içerik** sorunlarını önler (arama motorları aynı içeriği birden fazla kez yayınladığınızı düşündüğünde).
2. **Fransız kullanıcıların Fransızca sürümü**, **İspanyol kullanıcıların İspanyolca sürümü** görmesini sağlar ve benzeri.
3. Genel kullanıcı deneyimini iyileştirir, bu da daha iyi etkileşim ve daha yüksek SEO sıralaması anlamına gelir.

### 3.3. `<head>` Etiketinde Hreflang Nasıl Kullanılır

HTML'nizde şuna benzer bir şey ekleyeceksiniz:

```html
<link rel="alternate" hreflang="en" href="https://example.com/en" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr" />
<link rel="alternate" hreflang="es" href="https://example.com/es" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en" />
```

- **`hreflang="en"`**: Sayfanın İngilizce sürümünü belirtir.
- **`hreflang="fr"`**: Sayfanın Fransızca sürümünü belirtir.
- **`hreflang="es"`**: Sayfanın İspanyolca sürümünü belirtir.
- **`hreflang="x-default"`**: Diğer diller kullanıcının tercihleriyle eşleşmediğinde bir "yedek" dil veya varsayılan URL.

> **Hızlı Not:** Bu etiketlerdeki URL'lerin doğrudan son sayfaya yönlendirdiğinden emin olun, **ekstra yönlendirme olmadan**.

---

## 4. İçeriği Gerçekten "Yerel" Yapmak (Sadece Çevrilmiş Değil)

### 4.1. Yerelleştirme vs. Çeviri

- **Çeviri**, metni bir dilden diğerine kelime kelime dönüştürmek anlamına gelir.
- **Yerelleştirme**, içeriğin formatını, para birimini, ölçümleri ve kültürel referansları yerel bir kitle için uyarlamak anlamına gelir. Örneğin, Fransa'yı hedefliyorsanız, `$` yerine `€` kullanır ve yerel tatilleri veya bölgeye özgü ayrıntıları bahsedebilirsiniz.

### 4.2. Yinelenen İçerikten Kaçınmak

İyi çevirilere rağmen, arama motorları yapısı çok benzer görünüyorsa sitenizi yinelenen içerik için işaretleyebilir. Hreflang, bu sayfaların kopya olmadığını, dil varyasyonları olduğunu açıklar.

---

## 5. Teknik SEO Gereklilikleri

### 5.1. Dil Bildirimleri (`lang` ve `dir`)

HTML etiketinizde dili şöyle bildirebilirsiniz:

```html
<html lang="en"></html>
```

- **`lang="en"`** tarayıcıların ve yardımcı teknolojilerin dili anlamasına yardımcı olur.

Sağdan sola diller için (Arapça veya İbranice gibi), şunu ekleyin:

```html
<html dir="rtl" lang="ar"></html>
```

- **`dir="rtl"`** metin yönünün sağdan sola olduğundan emin olur.

### 5.2. Kurallı Etiketler

Kurallı etiketler, yakın kopya sayfalarınız varsa arama motorlarına hangi sayfanın "orijinal" veya birincil sürüm olduğunu söyler. Genellikle çok dilli siteler için **kendi kendine referans veren** bir kurallı etiketiniz olur.

```html
<link rel="canonical" href="https://example.com/fr/produits" />
```

---

## 6. Birden Fazla Dilde Sayfa İçi SEO

### 6.1. Başlık & Meta Açıklamaları

- Her dil için **çevrilmiş ve optimize edilmiş**.
- Her pazar için **anahtar kelime araştırması** yapın çünkü İngilizce'de insanlar ne arıyorsa Fransızca veya İspanyolca'da farklı olabilir.

### 6.2. Başlıklar (H1, H2, H3)

Başlıklarınız her bölgenin **yerel ifadeleri** veya **anahtar kelimelerini** yansıtmalıdır. Orijinal İngilizce başlığınızı Google Translate'ten geçirmeyin ve işin bittiğini düşünmeyin.

### 6.3. Görseller & Medya

- Gerekirse alt metni, açıklamaları ve dosya adlarını yerelleştirin.
- Hedef kültürle rezonansa giren görseller kullanın.

---

## 7. Dil Değiştirme & Kullanıcı Deneyimi

### 7.1. Otomatik Yönlendirme mi Yoksa Dil Seçici mi?

- **Otomatik Yönlendirme** (IP veya tarayıcı ayarlarına göre) uygun olabilir ama gezginleri veya VPN kullanıcılarını yanlış sürüme gönderebilir.
- **Bir Dil Seçici** genellikle daha şeffaftır, kullanıcılar yanlış algılanan dil yanlışsa kendi dillerini seçebilir.

İşte basitleştirilmiş bir Next.js + Intlayer örneği:

```tsx
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // Geçerli URL yolunu al. Örnek: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Güncellenmiş yerel ile URL'yi oluştur
      // Örnek: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URL yolunu güncelle
      navigate(pathWithLocale);
    },
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={locale === localeItem ? "x-default" : localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Yerel - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Kendi Yerelinde Dil - örn. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Geçerli Yerel Ayarlı Dil - örn. Francés, geçerli yerel Locales.SPANISH olarak ayarlı */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce'de Dil - örn. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

### 7.2. Tercihleri Saklamak

- Kullanıcınızın dil seçimini bir **çerez** veya **oturumda** kaydedin.
- Bir sonraki ziyaretlerinde sitenize otomatik olarak tercih ettikleri dili yükleyebilirsiniz.

---

## 8. Yerel Geri Bağlantılar Oluşturmak

**Geri bağlantılar** (dış sitelerden sitenize bağlantılar) önemli bir SEO faktörü olmaya devam ediyor. Çok dilli bir site çalıştırdığınızda şunları göz önünde bulundurun:

- Yerel haber sitelerine, bloglara veya forumlara ulaşın. Örneğin, Fransızca alt dizininize işaret eden bir `.fr` alan adı, yerel Fransızca SEO'nuzu artırabilir.
- Her dil için geri bağlantıları izleyin ve hangi bölgelerin daha fazla PR/pazarlama çabasına ihtiyacı olduğunu görün.

---

## 9. Çok Dilli Sitenizi İzleme ve Bakım

### 9.1. Google Analytics & Search Console

- Verilerinizi her dil dizini için segmentleyin (`/en/`, `/fr/`, `/es/`).
- Her dil temelinde **tarama hatalarına**, **yinelenen içerik işaretlerine** ve **dizinleme sorunlarına** dikkat edin.

### 9.2. Düzenli İçerik Güncellemeleri

- Çevirileri taze tutun. İngilizce'de bir ürün açıklamasını değiştirirseniz, Fransızca, İspanyolca vb.'de güncelleyin.
- Güncel olmayan çeviriler müşteriler için kafa karıştırıcı olabilir ve kullanıcı güvenini zedeleyebilir.

---

## 10. Kaçınılması Gereken Yaygın Tuzaklar

1. **Makine Çevrilmiş İçerik**
   İnsan incelemesi olmadan otomatik çeviriler hatalarla dolu olabilir.

2. **Yanlış veya Eksik `hreflang` Etiketleri**
   Etiketleriniz eksik veya yanlış kodlara sahipse, arama motorları dil sürümlerini kendileri belirleyemez.

3. **Sadece JavaScript ile Dil Değiştirme**
   Google her dil için benzersiz URL'leri tarayamazsa, sayfalarınız doğru yerel arama sonuçlarında görünmeyebilir.

4. **Kültürel Nüansları Göz Ardı Etmek**
   Bir ülkede işe yarayan bir şaka veya ifade başka bir ülkede saldırgan veya anlamsız olabilir.

---

## Sonuç

Web sitenizi çok dilli yapmak, metni çevirmekten daha fazlasını içerir. URL'leri etkili bir şekilde yapılandırmak, arama motorlarının doğru sürümü sunmasına yardımcı olmak için `hreflang` etiketlerini kullanmak ve yerelleştirilmiş görseller, dil seçiciler ve tutarlı navigasyon ile mükemmel bir kullanıcı deneyimi sağlamakla ilgilidir. Bu en iyi uygulamaları takip etmek, küresel pazarlarda başarı için sizi hazırlayacak, kullanıcı memnuniyetini artıracak ve sonuçta bölgeler genelinde daha iyi SEO sonuçları sunacaktır.

Next.js kullanıyorsanız (özellikle Next.js 13+'da App Router), **Intlayer** gibi bir araç bu süreci tamamen basitleştirebilir. Yerelleştirilmiş site haritaları oluşturmaktan `hreflang` bağlantılarını otomatik olarak işlemeye, dil algılamaya ve daha fazlasına kadar her şeyi yardımcı olur, böylece kaliteli çok dilli içerik oluşturmaya odaklanabilirsiniz.

**Küresel olmaya hazır mısınız?** Bu SEO ve i18n stratejilerini şimdi uygulayın ve dünya çapından yeni ziyaretçilerin sitenizle keşfetmesini ve etkileşim kurmasını izleyin!
