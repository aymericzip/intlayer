---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Kullanıcılarınızdan Önce Eksik Çevirileri Tespit Etme Yöntemleri"
description: Eksik çeviriler sessizce hata verir. Geri dönüş mekanizmasının (fallback) bunları neden gizlediğini, gerçekten işe yarayan dört tespit katmanını ve çevrilmemiş anahtarlarda derlemeyi nasıl durduracağınızı öğrenin.
keywords:
  - eksik çevirileri bul
  - eksik çeviri anahtarları
  - i18n denetimi
  - çevrilmemiş metinler
  - çeviri kapsamı
  - i18n lint
slugs:
  - blog
  - detecting-missing-translations
author: aymericzip
---

# Kullanıcılarınızdan Önce Eksik Çevirileri Tespit Etme Yöntemleri

Eksik bir çeviri neredeyse hiçbir zaman bir istisna fırlatmaz. Kurulumunuza bağlı olarak ya Japon bir kullanıcıya İngilizce metni gösterir ya da canlı sayfada `checkout.summary.total` yazdırır. Her ikisi de yayına alınır, kod incelemesinden sorunsuz geçer ve sizin yerinize bir müşteri tarafından fark edilir.

## İçindekiler

<TOC/>

## Hangi kütüphaneyi kullanırsanız kullanın geçerlidir

Buradaki hiçbir şey tek bir yığına özgü değildir. Aşağıdaki tespit katmanları i18next, react-i18next, next-intl, react-intl, vue-i18n, next-translate veya Lingui üzerinde aynı şekilde çalışır, çünkü hepsi anahtarları aynı mantıkla çözer ve aynı şekilde hata verir.

Araçlar da taşınabilirdir. Mesajlarınız bugün JSON kataloglarında duruyorsa, [Sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) Intlayer'ı bu dosyalara yönlendirir, böylece içeriğinizi taşımadan veya tek bir import değiştirmeden denetim, doldurma ve test komutlarını kullanabilirsiniz:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // veya next-intl / react-intl için "icu"
    }),
  ],
};

export default config;
```

Çalışma zamanı API'sinin de aynı kalmasını istiyorsanız, [uyumluluk adaptörleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md) paketleyici düzeyinde `useTranslation`, `$t` ve türevlerini takma adlandırır. Her halükarda, aşağıdaki komutları bir zorunluluk olarak değil, fikrin somut bir uygulaması olarak değerlendirin.

## Neden görünmezdirler?

Her i18n kütüphanesi bir anahtarı aynı zincirle çözer: aktif dili ara, varsayılan dile geri dön (fallback) ve bu da başarısız olursa anahtarın kendisini döndür. İşte bu son adım asıl sorundur. Bir hata oluşmaz, canlı ortamda uyarı verilmez ve hiçbir test başarısız olmaz; çünkü ardışık düzendeki hiçbir mekanizma eksik bir anahtarı anormal olarak değerlendirmez.

Geri dönüş mekanizması durumu düzeltmek yerine daha da kötüleştirir. Sessizce İngilizce render edilen bir sayfa, İngilizce konuşan bir geliştiriciye ve otomatik kontrollerinize tamamen sorunsuz görünür. Hata yalnızca sonucu okuyamayan kişiye görünür.

Bu nedenle soru "çalışma anında eksik çevirileri nasıl yönetirim" değil, "eksik bir çevirinin birleştirilmesini (merge) nasıl imkansız hale getiririm" olmalıdır.

## Bunları yakalayabileceğiniz dört katman

Her katman diğerlerinin gözden kaçırdığı bir şeyi yakalar. Birden fazlasına ihtiyacınız vardır.

| Katman          | Yakaladıkları                                    | Kaçırdıkları                                    |
| :-------------- | :----------------------------------------------- | :---------------------------------------------- |
| Tipler (Types)  | Hiç var olmayan anahtarlar                       | Var olan ancak `ja` dilinde çevrilmemiş anahtar |
| Linter          | Çeviriye hiç gönderilmemiş sabit dizeler         | Bir katalogdan eksik olan anahtarlar            |
| Denetim (Audit) | Tanımlanmış her anahtardaki dil kapsamı          | Hiç çevrilebilir hale getirilmemiş metinler     |
| Render testleri | Çözümlenen ancak yanlış render edilen anahtarlar | Test kapsamına alınmamış tüm sayfalar           |

Çoğu ekibin yaşadığı açık üçüncü satırdır: anahtarlarının geçerli olduğunu bilirler, ancak on sekiz dilin tamamının gerçekten bir değere sahip olup olmadığını hiçbir şey denetlemez.

## Katman 1: Anahtarı bir dize değil, bir tip yapın

`t("checkout.summry.total")` derlenen bir yazım hatasıdır. Anahtarlarınız düz dizelerse, her yeniden adlandırma canlı ortam için bir risk ve her silme işlemi yetim bir anahtar bırakır.

Tiplere ayrılmış anahtarlar bunu bir derleme hatasına dönüştürür. `react-i18next` bunu declaration merging ile destekler, `next-intl` mesaj yapınızdan çıkarım yapar, Lingui kaynak metinden ID'ler türetir ve Intlayer bildirim dosyalarından sıkı tipler üretir. Hepsi işe yarar; farklı olan ne kadar yapılandırma kodu yazmanız gerektiğidir.

Bu katman gereklidir ancak yeterli değildir. Tipler varsayılan kataloğunuzun yapısını açıklar. Korecede bu anahtar için bir değer olup olmadığı hakkında hiçbir şey söylemezler.

## Katman 2: Hiç anahtar olmamış dizeleri denetleyin (Lint)

Bulamadığınız çeviri genellikle hiç dışa aktarılmamış olandır. Bir bileşene sabit kodlanmış bir etiket, katalog tabanlı her denetim için görünmezdir; çünkü araçlar açısından o dize mevcut değildir.

Intlayer'ın ESLint eklentisi bunu `no-raw-text` ile ve ters durum için `no-unused-content` ile karşılar: bildirilmiş ancak artık hiçbir şey tarafından okunmayan içerik.

```js fileName="eslint.config.mjs"
import intlayer from "@intlayer/eslint-plugin";

export default [
  intlayer.configs.recommended,
  {
    rules: {
      "@intlayer/no-raw-text": "error",
      "@intlayer/no-unused-content": "warn",
    },
  },
];
```

`no-unused-content`, katalogların sonsuza kadar büyümesini engelleyen kuraldır. Kullanılmayan anahtarlar bir doğruluk hatası değildir, ancak çeviri faturasını gereksiz yere artıran şeydir. Kuralların tam listesi [ESLint eklenti dokümantasyonunda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/eslint.md).

## Katman 3: Dil kapsamını denetleyin (Audit)

Asıl soruya cevap veren katman budur. Intlayer bunu bir CLI komutu olarak sunar:

```bash packageManager="npm"
npx intlayer content test
```

Yapılandırılmış dillerinizi ve tanımlı sözlüklerinizi okur, ardından hangi anahtarların hangi dillerde ve hangi dosyada eksik olduğunu raporlar.

Bunu herhangi bir yere bağlamadan önce bilmeye değer bir ayrıntı: **CLI bir rapor yazdırır ancak başarısızlık durumunda sıfır olmayan bir kodla çıkmaz.** Kırmızı bir derleme bekleyerek bunu bir ardışık düzene eklerseniz, kimsenin okumadığı bir metin yığınıyla birlikte yeşil bir derleme alırsınız. Derlemeyi durdurmak için aşağıda ele alınan programatik API'yi kullanın.

## Katman 4: Test paketinde bunu doğrulayın (Assert)

`listMissingTranslations()` size aynı denetimi veri olarak verir, bu da bir derleme kapısı (build gate) için tam olarak istediğiniz şeydir.

```ts fileName="i18n.test.ts"
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("has no missing required locales", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Üç alan döner ve aralarındaki ayrım önemlidir:

- `missingTranslations`: anahtar başına, hangi dillerin ve hangi dosyadan eksik olduğu. Test başarısız olduğunda yazdıracağınız şey budur.
- `missingLocales`: her anahtardaki eksik dillerin birleşimi.
- `missingRequiredLocales`: yapılandırmanızdaki `requiredLocales` ile sınırlı eksikler (veya ayarlamadıysanız tüm diller).

## `requiredLocales` kapıyı uygulanabilir kılan ayardır

On sekiz dilde yayın yapmak, dağıtım gerçekleştirmek için on sekiz dilin tümünün tamamlanması gerektiği anlamına gelmez. Çoğu ekipte yayını engelleyen bir katman ve kademeli tamamlanan bir katman bulunur.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.JAPANESE,
      Locales.POLISH,
    ],
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

`requiredLocales` olmadan, tanımlanan her dil zorunlu hale gelir ve son dil gelene kadar derlemeniz kırmızı kalır. Bu durum genellikle ekiplerin kontrolü tamamen devre dışı bırakmasına yol açar, bu da kontrole hiç sahip olmamaktan daha kötüdür.

## Canlı ortamda bulunan eksikleri yakalamak

Yukarıdaki katmanlar yeni boşlukları önler. Halihazırda yayında olan bir uygulama için iki yöntem işe yarar.

**Sahte yerelleştirme (Pseudolocalization).** Her dizenin dönüştürüldüğü bir test dili çalıştırın; örneğin `[!!! Ĉĥéçķöũţ !!!]`. Halen düz İngilizce görünen her metin doğrudan koda gömülüdür. Katalog yerine render edilmiş sayfayı test ettiğinden, katalog denetiminin yapısal olarak göremediği şeyleri on dakikada bulur.

**Kendi sitenizi tarayın.** Dile özgü URL'ler kullanıyorsanız, dil başına bir örnek çekin ve HTML içinde varsayılan dil dizelerinizi arayın. `/ja/` altında "Add to cart" içeren bir sayfa ya eksik bir çeviridir ya da farkında olmadığınız bir geri dönüştür (fallback).

```bash
curl -s https://example.com/ja/checkout | grep -c "Add to cart"
```

## Boşlukları doldurmak

Neyin eksik olduğunu bildikten sonra `intlayer fill` boş girişleri doldurur ve `autoFill` seçeneği içerik tanımlandıkça dil başına dosyalar oluşturabilir. Bkz. [autoFill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/autoFill.md).

Bu konuda net olmak gerekir: makineyle doldurulan çeviriler _görünür_ bir boşluğu _görünmez_ bir boşluğa dönüştürür. Anahtar artık bir değere sahiptir, denetim yeşile döner, ancak metni kimse okumamıştır. Bunu yayını açmak için bir iskele olarak kullanın, ardından bir müşterinin karar vermeden önce okuduğu kritik metinleri mutlaka bir insana yönlendirin.

## Sık yapılan hatalar

- **Geri dönüşü (fallback) bir güvenlik özelliği sanmak.** Bu bir acil durum render stratejisidir, güvenlik ağı değildir. Sessizce İngilizce çıkan bir sayfa hata bildirmeyen bir kusurdur.
- **CI'ı durdurmak için CLI raporuna güvenmek.** `intlayer content test` sıfır koduyla çıkar. Bir test içinde assertion kullanın.
- **Her dili zorunlu kılmak.** Bir sürüm yarım kalmış bir dil nedeniyle ilk kez engellendiğinde kontrol tamamen kaldırılır.
- **Katalogları denetleyip render edilen sayfayı hiç incelememek.** Sabit kodlanmış dizeler tanım gereği katalog denetiminde görünmezdir.
- **Testlerde yalnızca varsayılan dili kontrol etmek.** Asla eksik olamayacak tek dil odur.
- **Makine dolgusunun döngüyü kapatmasına izin vermek.** Yeşil denetim, incelenmemiş metinler.

## İleri okuma

- [İçeriğinizi test etme: CLI denetimi, programatik API ve UI doğrulamaları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/testing.md)
- [ESLint eklenti kuralları (`no-raw-text` ve `no-unused-content` dahil)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/eslint.md)
- [autoFill: dil başına bildirim dosyaları oluşturma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/autoFill.md)
- [Yapılandırma referansı: `locales`, `requiredLocales`, `defaultLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)
- [Frameworkler arası benchmark raporları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md)
- [i18next uyumluluk adaptörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/i18next.md)
- [Uluslararasılaştırmanın gerçekten neleri kapsadığı](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/what_is_internationalization.md)
- [Bileşen bazlı ve merkezi i18n karşılaştırması](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/per-component_vs_centralized_i18n.md)
