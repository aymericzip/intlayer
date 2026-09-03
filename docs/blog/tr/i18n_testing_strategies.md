---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Kırılgan Testler Yazmadan Çevirileri Test Etme Yöntemleri"
description: Çok dilli bir uygulamada nelerin test edilmeye değer olduğu ve nelerin olmadığı. Provider tabanlı render testleri, sahte yerelleştirme (pseudolocalization), RTL ve çoğul kapsamı ile anlık görüntü (snapshot) tuzağı.
keywords:
  - çeviri testi
  - i18n testi
  - testing library i18n
  - sahte yerelleştirme
  - dil sağlayıcı testi
  - snapshot test i18n
slugs:
  - blog
  - i18n-testing-strategies
author: aymericzip
---

# Kırılgan Testler Yazmadan Çevirileri Test Etme Yöntemleri

Çoğu i18n test paketi iki nedenden biriyle başarısız olur. Ya doğrudan metin içeriğini doğrularlar, böylece ufak bir kelime değişikliği elli testi bozar ve ekip testleri silmek zorunda kalır. Ya da her şeyi yalnızca varsayılan dilde render ederler, bu da diğer on yedi dil hakkında hiçbir şey kanıtlamaz. Her iki yaklaşım da aynı yere varır: kimsenin güvenmediği bir test paketi.

## İçindekiler

<TOC/>

## Desenler kütüphaneden bağımsızdır

Aşağıdaki her desen her türlü i18n yığınında çalışır. Sağlayıcıyı `I18nextProvider`, `NextIntlClientProvider` veya `IntlProvider` ile değiştirseniz bile testler tamamen aynı kalır; çünkü bir kütüphane API'sini değil, render edilen çıktıyı doğrularlar.

Kapsam araçları da taşınabilir: Mevcut kataloglarınıza yönlendirilmiş [Sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) veya mevcut içe aktarmalarınızı takma adlandıran bir [uyumluluk adaptörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md) ile kapsam doğrulaması doğrudan mevcut JSON dosyalarınıza karşı çalışır.

## Aslında neyi test ettiğinize karar verin

Çeviri kalitesi kod testiyle doğrulanamaz. Hiçbir assertion Almanca metnin doğal olup olmadığını size söyleyemez ve aksini iddia etmek test paketinizi sabit kodlanmış dizelerle doldurur.

Mekanik olarak test edilmeye değer olanlar şunlardır:

| Test edilmeye değer                       | Test edilmeye değmez                 |
| :---------------------------------------- | :----------------------------------- |
| Gerekli her dilin bir değeri olması       | İfadenin ne kadar zarif olduğu       |
| Doğru dilin bileşene ulaşması             | Her etiketin tam metin kopyası       |
| Çoğulların her kategori için çözümlenmesi | Çevirmenin işini iyi yapıp yapmadığı |
| RTL dillerinin yön ve aynalama ayarları   | Her dildeki her dize                 |
| Biçimlendirilmiş tarih ve sayıların dili  | `Intl` motorunun iç doğruluğu        |

Kapsam denetimi bileşen testlerinizde değil, tek bir veri odaklı testte yapılmalıdır. Bu konu [eksik çevirileri tespit etme](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/detecting_missing_translations.md) yazısında ayrıntılı olarak ele alınmıştır; bu yazı diğer konulara odaklanır.

## Sağlayıcı altında render edin ve role göre sorgulayın

Temel desen, bileşeni bir dil sağlayıcısı içine yerleştirmek ve metin yerine rol veya test id üzerinden sorgulama yapmaktır.

```tsx fileName="CartSummary.test.tsx"
import { render, screen } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";
import { CartSummary } from "./CartSummary";

test("özet başlığını Fransızca render eder", () => {
  render(
    <IntlayerProvider locale="fr-FR">
      <CartSummary />
    </IntlayerProvider>
  );

  expect(screen.getByRole("heading")).toBeInTheDocument();
});
```

`getByRole("heading")` ile sorgulamak metin değişikliklerine karşı dirençlidir. `getByText("Récapitulatif")` ise metin değiştiğinde bozulur. Birebir metin eşleşmesini yalnızca dizenin kendisi test konusu olduğunda kullanın, bu da oldukça nadirdir.

`aria-label` gibi nitelikler için render edilebilir bir düğüm yerine ham dizeye ihtiyacınız vardır. React'ta `useIntlayer` girişleri bunun için bir `.value` alanı sunar.

## Testleri diller arasında parametrelendirin

Her dil için ayrı test yazmaktansa, tüm diller üzerinde çalışan tek bir test mantığı çok daha değerlidir.

```tsx fileName="direction.test.tsx"
import { getHTMLTextDir } from "intlayer";
import { render } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";

describe.each(["en", "fr", "ja", "ar"])("dil %s", (locale) => {
  it("anahtar adına geri dönmeden render edilir", () => {
    const { container } = render(
      <IntlayerProvider locale={locale}>
        <CartSummary />
      </IntlayerProvider>
    );

    // Anahtarın render edilmesi aramanın başarısız olduğunu gösterir.
    expect(container.textContent).not.toMatch(/^[a-z]+(\.[a-z]+)+$/);
  });

  it("doğru metin yönünü ayarlar", () => {
    expect(getHTMLTextDir(locale)).toBe(locale === "ar" ? "rtl" : "ltr");
  });
});
```

İlk assertion zahmetsiz ve genel bir kazançtır: Arama başarısız olduğunda kütüphaneniz anahtarı yazdırırsa, DOM içinde `cart.summary.title` gibi bir kalıp yer alır. Bu, tek bir dizeyi belirtmeden bütün bir hata sınıfını yakalar.

## Sahte yerelleştirme (Pseudolocalization) katalogların göremediğini bulur

Her dizeyi dönüştüren sahte bir dil ekleyin; örneğin `Checkout` ifadesini `[!!! Çĥéçķöũţ !!!]` haline getirin. Ardından sayfayı bu dilde render edin.

Halen standart İngilizce görünen her metin doğrudan koda gömülmüştür. Hiçbir katalog tabanlı denetim bunu göremez çünkü araçlar açısından o dize henüz mevcut değildir. Köşeli ayraçlar ikinci bir işe yarar: Metni yaklaşık yüzde 30 uzatarak, Almanca desteği gelmeden önce tasarımın taşacağı yerleri açığa çıkarır.

Bu hata görsel olarak fark edildiğinden, bunu birim test yerine görsel veya uçtan uca (E2E) test olarak çalıştırmak en doğrusudur.

## Çoğullar dil başına değil, kategori başına test gerektirir

Çoğul hataları genellikle gizli kalır çünkü İngilizcede yalnızca iki biçim vardır ve çoğu geliştirici yalnızca bunları dener. Lehçede dört, Arapçada altı çoğul kategorisi bulunur.

```ts fileName="plural.test.ts"
// Arapça zero, one, two, few, many, other kategorilerini kapsar.
describe.each([0, 1, 2, 3, 11, 100])("sayı %i", (count) => {
  it("Arapçada boş olmayan bir dize üretir", () => {
    expect(formatItems(count, "ar")).not.toBe("");
  });
});
```

Her yerde sadece 1 ve 2'yi test etmek yerine en karmaşık diliniz için her CLDR kategorisine denk gelen sayıları seçin. `Intl.PluralRules` bir sayının hangi kategoriye girdiğini söyler, böylece tahmin yürütmek zorunda kalmazsınız. Kategoriler hakkında daha fazla bilgi için [ICU mesaj formatı makalesine](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/icu_message_format.md) göz atın.

## Anlık görüntü (Snapshot) tuzağı

Anlık görüntüler ve i18n iyi bir ikili değildir. Yerelleştirilmiş bir bileşenin anlık görüntüsü içerideki her dizeyi kaydeder: bir çevirmen Portekizcedeki bir yazım hatasını düzelttiğinde, hiçbir incelemecinin anlayamayacağı bir dosyada yeşil yanan test kırmızıya döner. Bir süre sonra geliştiriciler diff'i okumadan `-u` çalıştırmaya başlar ve snapshot testleri tüm anlamını yitirir.

Snapshot kullanmak istiyorsanız, bunu yalnızca tek bir dilde alın ve içerik denetimi yerine yapısal bir kontrol olarak değerlendirin. Dile özgü her şey açık assertion ifadelerinde yer almalıdır.

## Yalnızca render işlemini değil, dil anlaşmasını da test edin

Canlı ortamdaki en yaygın i18n hatası çevirinin eksik olması değildir. Yanlış dilin seçilmesidir: URL `/fr/` derken istemci `navigator.language` okur ve uyuşmazlık yaşanır.

Çözümleme sırasını bileşenlerden bağımsız, saf bir fonksiyon olarak doğrudan test edin:

```ts fileName="locale-resolution.test.ts"
it("kaydedilen tercihe göre URL'yi önceler", () => {
  expect(resolveLocale({ url: "/fr/about", stored: "de", header: "ja" })).toBe(
    "fr"
  );
});

it("URL'de önek olmadığında başlığa (header) geri döner", () => {
  expect(resolveLocale({ url: "/about", stored: null, header: "ja" })).toBe(
    "ja"
  );
});
```

Bu, çoğu projede eksik olan en yüksek değerli i18n testidir ve herhangi bir DOM gerektirmez.

## Neyi nerede çalıştırmalı

- **Unit**: Dil seçimi mantığı, formatlayıcılar, çoğul kategorileri. Hızlıdır, DOM gerektirmez.
- **Bileşen**: Her dil için bir kez sağlayıcı tabanlı render, roller ve ham anahtar olmaması denetimi.
- **Kapsam**: Gerekli dillerde eksik olmadığını doğrulayan veri odaklı test.
- **Görsel veya E2E**: Sahte yerelleştirme geçişi ve bir RTL sayfası; çünkü bu hatalar görseldir.

İlk üçünü her commit'te CI hattında tutun. Sonuncusunu her push yerine gecelik derlemelerde çalıştırmak daha ekonomiktir.

## Sık yapılan hatalar

- **Her yerde birebir metni doğrulamak.** Test paketinin birkaç ay içinde silinmesini garantiler.
- **Yerelleştirilmiş bileşenlerin anlık görüntüsünü almak.** Çevirmenler derlemeyi bozar, incelemeciler kontrol etmeden onaylar.
- **Yalnızca varsayılan dili test etmek.** Asla eksik olamayacak tek dili test etmiş olursunuz.
- **Çoğullar için yalnızca 1 ve 2'yi test etmek.** İngilizcede bulunmayan tüm kategorileri kaçırır.
- **i18n kütüphanesini mock ile devre dışı bırakmak.** O zaman yalnızca mock nesnenizin dize döndürdüğünü test edersiniz.
- **Dil anlaşma mantığını asla test etmemek.** Gerçek dünyadaki en yaygın sorun ve test etmesi en kolay olanıdır.

## İleri okuma

- [İçeriğinizi test etme: CLI denetimi, programatik API ve UI doğrulamaları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/testing.md)
- [ESLint eklentisi: Sabit kodlanmış dizeleri ve kullanılmayan içerikleri yakalama](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/eslint.md)
- [Formatlayıcılar ve dil yardımcıları (`getHTMLTextDir` dahil)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/formatters.md)
- [Frameworkler arası benchmark raporları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md)
- [react-i18next uyumluluk adaptörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/react-i18next.md)
- [Eksik çevirileri tespit etme](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/detecting_missing_translations.md)
- [ICU mesaj biçimi: Çoğullar, select ve iskeletler](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/icu_message_format.md)
