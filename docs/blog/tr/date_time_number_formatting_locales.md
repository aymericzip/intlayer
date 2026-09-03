---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Intl ile Dillere Göre Tarih ve Sayı Formatlama"
description: Muhtemelen ayrı bir formatlama kütüphanesine ihtiyacınız yok. Intl'in dillere göre tarih, sayı, para birimi ve listeleri nasıl işlediğini, önbelleğe alma maliyetini ve canlı ortamdaki saat dilimi hatasını öğrenin.
keywords:
  - dile göre tarih formatla
  - Intl.DateTimeFormat
  - Intl.NumberFormat
  - toLocaleDateString
  - yerel para birimi formatı
  - göreceli zaman formatı
slugs:
  - blog
  - date-time-number-formatting-locales
author: aymericzip
---

# Intl ile Dillere Göre Tarih ve Sayı Formatlama

Metin dizelerini çevirmek uluslararasılaştırmanın (i18n) yalnızca görünen yarısıdır. Sürekli hata bildirimleri üreten diğer yarısı ise formatlamadır: Alman bir kullanıcının `1.234,56` yerine `1,234.56` görmesi, Japon bir kullanıcının `08/02/2026` tarihini Ağustos olarak okuması veya bir tarihin sunucuda ve istemcide farklı render edilerek React hidrasyon hatasıyla sayfayı çökertmesi.

Bunların hiçbiri için harici bir kütüphaneye ihtiyacınız yoktur. `Intl` API'si hedeflediğiniz tüm modern çalışma zamanlarında yerel olarak mevcuttur.

## İçindekiler

<TOC/>

## Kendi yazdığınız tarih yardımcı fonksiyonlarını silerek başlayın

Neredeyse her kod tabanında, yerelleştirme düşünülmeden önce yazılmış bir `formatDate` fonksiyonu bulunur. Bu fonksiyonlar belirli bir sırayı, bir ayırıcıyı ve genellikle İngilizce ay adlarını koda sabitler.

```ts
// Silinmesi gereken kod:
const formatDate = (d: Date) =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
```

`Intl.DateTimeFormat` bunun yerini eksiksiz alır ve her dilde doğru sonucu üretir:

```ts
new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(date);
// "2. August 2026"
new Intl.DateTimeFormat("ja-JP", { dateStyle: "long" }).format(date);
// "2026年8月2日"
```

Aynı durum sayılar için de geçerlidir. `toFixed(2)` her yerde `1234.56` üretir, bu da Avrupa'nın büyük bölümünde hatalıdır.

## `Intl` Neleri Kapsar?

| API                       | Kullanım Amacı                                              |
| :------------------------ | :---------------------------------------------------------- |
| `Intl.DateTimeFormat`     | Tarih ve saatler (`dateStyle` / `timeStyle` hazır ayarları) |
| `Intl.NumberFormat`       | Ondalıklar, para birimi, yüzde, birimler, kompakt gösterim  |
| `Intl.RelativeTimeFormat` | "3 gün önce", "2 saat içinde"                               |
| `Intl.ListFormat`         | "a, b ve c" listelemeleri                                   |
| `Intl.PluralRules`        | Bir sayının hangi çoğul kategorisine girdiğini belirleme    |
| `Intl.Collator`           | Dizeleri dile uygun kurallarla doğru sıralama               |

`Intl.Collator` en sık unutulan araçtır. Dizeler üzerinde düz `array.sort()` çağırmak Unicode kod noktası sırasını kullanır, bu da noktalı ve aksanlı harflerin `z` harfinden sonraya atılmasına ve İsveççe `ö` harfinin yanlış yere gitmesine yol açar. Kullanıcıya gösterilen listeleri sıralarken mutlaka collator kullanın.

```ts
["zebra", "édouard", "apple"].sort(new Intl.Collator("tr").compare);
// ["apple", "édouard", "zebra"]
```

## Elle oluşturulan seçenekler yerine hazır ayarları (presets) tercih edin

`dateStyle` ve `timeStyle`, sıranın ve ayırıcıların dile göre otomatik belirlenmesini sağlar. `year`, `month` ve `day` parametrelerini tek tek belirtmek, genellikle istememeniz gereken bir kontrol sağlar; çünkü doğru sıralama bölgeye göre değişir ve CLDR verilerini kendi varsayımlarınızla ezmiş olursunuz.

```ts
// Biçimi dil belirler:
new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(d);

// Biçimi siz belirlersiniz ve başka ülkelerde hatalı olur:
new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(d);
```

Yalnızca dar bir tablo sütunu gibi tasarımın kesinlikle sabit bir genişlik gerektirdiği durumlarda bileşenleri açıkça belirtin.

## Formatlayıcı nesneleri oluşturmak maliyetlidir

Performans açısından dikkat edilmesi gereken asıl detay budur. Bir `Intl.NumberFormat` oluşturmak yerel dil verilerini yüklemeyi gerektirir ve bu işlem ardından gelen `.format()` çağrısından çok daha maliyetlidir. Bunu bir render döngüsünde bin satır üzerinde tekrarlamak ciddi yavaşlamaya neden olur.

```ts
// Her satırda formatlayıcıyı yeniden oluşturur (yavaş):
rows.map((r) => new Intl.NumberFormat(locale).format(r.total));

// Bir kez oluştur ve yeniden kullan (hızlı):
const nf = new Intl.NumberFormat(locale);
rows.map((r) => nf.format(r.total));
```

`toLocaleDateString()` ve `toLocaleString()` fonksiyonlarının içinde de aynı sorun gizlidir: her çağrı yeni bir formatlayıcı oluşturur. Tek bir değer için sorun olmasa da listeler için yanlıştır.

Dil ve seçenek kombinasyonuna göre önbelleğe alın:

```ts
const cache = new Map<string, Intl.NumberFormat>();

const getNumberFormat = (
  locale: string,
  options: Intl.NumberFormatOptions = {}
) => {
  const key = `${locale}:${JSON.stringify(options)}`;
  let formatter = cache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    cache.set(key, formatter);
  }
  return formatter;
};
```

## Yalnızca canlı ortamda ortaya çıkan saat dilimi (timezone) hatası

Bu hata geliştiricilerin günlerini tüketebilir. Sunucu SSR sırasında tarihi render eder, tarayıcı istemcide hidrasyonu gerçekleştirir ve iki taraf farklı metinler ürettiği için React bir hydration mismatch hatası fırlatır.

Bunun nedeni, açıkça belirtmediğinizde `Intl.DateTimeFormat`'ın sistem saat dilimini kullanmasıdır. Canlı sunucunuz UTC saat diliminde çalışırken yerel geliştirme makineniz yerel saat dilimindedir. Bu nedenle hata yerelde görünmez ve yalnızca canlı ortamda ortaya çıkar.

```ts
// UTC sunucu ile yerel saatteki tarayıcı uyuşmaz. Hidrasyon hatası:
new Intl.DateTimeFormat(locale, { dateStyle: "short" }).format(d);

// Her iki ortam tam olarak uyuşur:
new Intl.DateTimeFormat(locale, { dateStyle: "short", timeZone: "UTC" }).format(
  d
);
```

Üç uygulanabilir yaklaşım:

- Sunucuda **saat dilimini sabitleyin** ve açıkça iletin. Kararlı ve belirleyicidir, ancak herkes UTC görür.
- **Yalnızca istemcide render edin**, sunucu geçişinde sabit bir yer tutucu (placeholder) kullanın. Kullanıcıya göre doğrudur, ancak hafif bir görsel sıçrama yaratır.
- **Kullanıcının saat dilimini saklayın** ve her iki tarafa da iletin. En iyi sonuçtur ancak daha fazla iş gerektirir.

Hangisini seçerseniz seçin, hem sunucuda hem istemcide render edilen her tarih için `timeZone` parametresini her zaman açıkça iletin. Saat dilimi belirtilmemiş bir tarih iki farklı değere sahip bir tarihtir.

## Para birimi bir dile değil, para birimi koduna ihtiyaç duyar

Dil ve para birimi bağımsız kavramlardır. `fr-FR` otomatik olarak euro anlamına gelmez: Fransa'daki bir kullanıcı USD faturasına bakıyor olabilir.

```ts
new Intl.NumberFormat("fr-FR", { style: "currency", currency: "USD" }).format(
  1234.5
);
// "1 234,50 $US"
```

Dil ayırıcıları, basamak gruplamasını ve simge yerleşimini yönetir. Para birimi ise verilerinizden gelir. Birini diğerinden çıkarmak muhasebe hatalarına yol açar.

Ayrıca `currencyDisplay` seçeneğine dikkat edin. Dolar simgesini paylaşan birden fazla para biriminin bulunduğu arayüzlerde `"code"` seçeneği ABD, Kanada ve Avustralya dolarları arasındaki belirsizliği ortadan kaldırır.

## Göreceli zaman mutlak zamandan daha kolay okunur

Yakın zamandaki olaylar için "2 saat önce" ifadesi sabit bir zaman damgasından çok daha etkilidir ve `Intl.RelativeTimeFormat` bunu doğal bir şekilde yerelleştirir.

```ts
new Intl.RelativeTimeFormat("tr", { numeric: "auto" }).format(-1, "day");
// "dün"
```

`numeric: "auto"`, "1 gün önce" yerine "dün" ifadesini üreten ayardır.

## Intlayer Neler Ekler?

Intlayer bu API'leri önbellekli yardımcı fonksiyonlarla sarar, böylece yukarıdaki Map önbelleğini kendiniz yönetmek zorunda kalmazsınız ve aktif dil her çağrıda iletilmek yerine varsayılan olarak uygulanır.

```ts
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
} from "intlayer";

number(1234.5); // "1.234,5"
currency(1234.5, { currency: "EUR" }); // "1.234,50 €"
date(new Date(), "short");
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 saat önce"
units(5, { unit: "kilometer", unitDisplay: "long" }); // "5 kilometre"
compact(1200); // "1,2 B"
list(["elma", "muz", "portakal"]); // "elma, muz ve portakal"
```

`date()` fonksiyonu hazır ayarları da kabul eder (`"short"`, `"long"`, `"dateOnly"`, `"timeOnly"`, `"full"`). React ve Vue karşılıkları hook ve composable olarak mevcuttur ve aktif dili doğrudan bağlamdan çözer.

Platform API'si üzerinde bir önbellekleme ve dil varsayılanı katmanıdır; asıl formatlama mantığı tamamen `Intl` tarafından yürütülür. Ayrıntılı imzalar [formatlayıcı dokümantasyonunda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/formatters.md).

## Sık yapılan hatalar

- **Dil belirtilmeden `toLocaleDateString()` çağırmak.** Sunucudaki kapsayıcı ayarlarına bağlı olan varsayılan dili kullanır.
- **Döngü içinde önbelleksiz formatlama.** Formatlayıcının oluşturulması maliyetin çoğunu oluşturur.
- **İzomorfik tarihlerde `timeZone` belirtmemek.** Yerelde asla tekrarlanamayan hidrasyon hatası üretir.
- **Dilden para birimi türetmek.** `fr-FR` her zaman euro demek değildir.
- **Kullanıcıya gösterilen metinlerde düz `sort()` kullanmak.** Her zaman `Intl.Collator` kullanın.
- **Ay veya gün adlarını koda gömmek.** Bunlar zaten her dil için CLDR içinde mevcuttur.
- **Göreceli zamanda `numeric: "always"` bırakmak.** Her dilde "dün" sözcüğü varken "1 gün önce" sonucunu üretir.

## İleri okuma

- [Formatlayıcılar ve dil yardımcıları: `number`, `currency`, `date`, `relativeTime`, `list`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/formatters.md)
- [Yapılandırma referansı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)
- [Frameworkler arası kıyaslama raporları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md)
- [react-intl uyumluluk adaptörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/react-intl.md)
- [ICU mesaj formatı: çoğullar, select ve sayı iskeletleri](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/icu_message_format.md)
- [Formatlayıcı ve çoğul kapsamı dahil çevirileri test etme](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_testing_strategies.md)
- [Uluslararasılaştırmanın gerçekte neleri kapsadığı](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/what_is_internationalization.md)
