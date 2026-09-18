---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "2026'da Doğru React i18n Kütüphanesini Seçme Rehberi"
description: React uluslararasılaştırması için karar rehberi. react-i18next, react-intl, Lingui, use-intl, Paraglide ve Intlayer'ı karşılaştırmadan önce yanıtlanması gereken sorular ve her seçeneğin bundle boyutu, typing ve bakım maliyetleri.
keywords:
  - react i18n
  - react internationalization
  - react-i18next
  - react-intl
  - Lingui
  - use-intl
  - Paraglide
  - Intlayer
  - i18n kütüphane karşılaştırması
slugs:
  - blog
  - how-to-pick-react-i18n-library
author: aymericzip
---

# Doğru React i18n kütüphanesi nasıl seçilir

React yerleşik bir i18n primitive'i sunmaz. İlk gün seçtiğiniz kütüphane, çevirilerin nasıl saklanacağını, bundle'a nasıl ulaşacağını ve önümüzdeki birkaç yıl boyunca iş yükünün ne kadarının size kalacağını belirler. Çoğu ekip popülariteye göre seçim yapar, ardından 2.000 anahtara ulaştığında trade-off'ları keşfeder.

Bu rehber tersi bir yaklaşım izler: önce projeniz hakkında birkaç soruyu yanıtlayın, ardından bu yanıtları uygun kütüphanelerle eşleştirin. Bu rehber düz React (Vite, React Router, TanStack Start) projelerine odaklanır. Next.js'in kendine has kısıtlamaları vardır ve bunlar [Next.js karşılaştırması](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/next-i18next_vs_next-intl_vs_intlayer.md) yazısında ele alınmıştır.

![React i18n kütüphane ekosistemi](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## İçindekiler

<TOC/>

## Kütüphaneleri karşılaştırmadan önce yanıtlanması gereken altı soru

Hangi satırların sizin için önemli olduğunu bilmeden bir özellik tablosu işe yaramaz. Öncelikle bunları gözden geçirin.

1. **Uygulama nasıl render ediliyor?** Yalnızca SPA, hydration ile SSR veya React Server Components. Context tabanlı hook'lar bir SPA'da her yerde çalışır. RSC ile bir hook, metin render eden her bileşende `"use client"` kullanımını zorunlu kılar, bu nedenle sunucu tarafı bir API'ye de ihtiyacınız olacaktır.
2. **Çevirileri kim yazıyor?** Geliştiriciler, bir TMS kullanan şirket içi bir ekip, ICU dosyaları teslim eden bir ajans veya bir AI pipeline'ı. Bu durum, herhangi bir API detayından çok katalog formatını belirler.
3. **Kaç locale ve sayfa var?** İki locale ve beş sayfa her şeyi tek seferde sunabilir. On locale ve elli route bunu kaldıramaz ve yükleme stratejisi ana maliyet haline gelir.
4. **Anahtarlarda type kontrolüne ihtiyacınız var mı?** `t("checkout.totl")` ifadesindeki bir yazım hatası, typeları kendiniz bağlamadığınız sürece her anahtar tabanlı kütüphanede derlenir. Bunun kabul edilebilir olup olmadığına karar verin.
5. **Dize ne içeriyor?** Düz metin, çoğullar veya ortasında bir `<Link>` bulunan cümleler. Zengin içerik, çoğu API'nin hantallaştığı yerdir.
6. **Proje ne kadar süre yaşayacak?** Üç aylık bir prototip ile beş yıllık bir ürün aynı miktarda build aracına ihtiyaç duymaz.

Yanıtları bir yere not edin. Aşağıdaki her şey bunlara atıfta bulunacaktır.

## Tek bir resimde genel görünüm

JavaScript i18n dünyasının on beş yılı dört mimari dalgaya sığar ve karşılaştıracağınız React kütüphaneleri bu farklı dalgalardan gelir.

![JavaScript i18n kütüphanelerinin tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Runtime sözlükleri (2011 - 2017): i18next, react-intl">

Belleğe yüklenen JSON katalogları, çalışma zamanında aranan `t("a.b")`, tarayıcıda ayrıştırılan ICU veya özel bir sözdizimi. En büyük ekosistemler, en ağır runtime'lar, typelar ise isteğe bağlı (opt-in).

</Accordion>
<Accordion header="Compile-time makroları (2018 - 2021): Lingui, typesafe-i18n">

Build sırasında ayıklanan mesajlar, kompakt kataloglara derleme, type güvenli argümanlar. Daha küçük bundle'lar karşılığında ekstra bir derleme adımı (`extract`, `compile`).

</Accordion>
<Accordion header="Server-first (2022 - 2024): use-intl / next-intl">

SSR ve Server Components etrafında tasarlanmıştır. Sunucuda render edin, client'a yalnızca ihtiyaç duyduğu kısmı hydrate edin. Hâlâ anahtar tabanlı ve merkezi.

</Accordion>
<Accordion header="Derleyici ve birlikte konumlandırılmış (colocated) içerik (2024 - 2026): Paraglide, Intlayer, wuchale">

İçerik, tree-shakable fonksiyonlara veya bileşen başına sözlüklere derlenir. Typelar otomatik oluşturulur, eksik çeviriler derlemeyi durdurur ve AI çevirisi CLI üzerinden çalışır.

</Accordion>
</AccordionGroup>

[JavaScript i18n tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md), her dalganın bir öncekinin sorunlarına nasıl yanıt verdiğini ayrıntılı olarak açıklamaktadır.

## En önemli karar: içerik nerede yaşar ve ne zaman yüklenir

Her React i18n kütüphanesi aynı yapıya sahiptir: bir store, bir provider, bir hook. Provider ne alırsa alsın, client bundle'ında veya hydration payload'ında son bulur. Dolayısıyla iki yapısal seçenek şunlardır:

- **Merkezi veya kapsamlı (scoped) içerik.** Uygulama için tek bir `en.json` ya da bileşen başına (veya namespace başına) bir bildirim.
- **Statik veya dinamik import.** Başlangıçta paketlenen her şey veya isteğe bağlı olarak yüklenen aktif locale ve route.

Aşağıdaki grafik, sayfa başına yaklaşık 30 KB metin içeren, 1 ila 10 sayfadan oluşan ve 1 ila 10 dile çevrilmiş teorik bir uygulamanın payload boyutunu tahmin etmektedir.

![Mimariye göre teorik içerik sızıntısı](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Statik import'lara sahip merkezi içerik her iki eksende de büyür: 10 sayfa çarpı 10 locale, her sayfada 300 KB metin demektir. Dinamik import'lar locale eksenini ortadan kaldırır. Scoping sayfa eksenini ortadan kaldırır. Yalnızca bu ikisinin kombinasyonu grafiği sabit tutar.

Bu bir kütüphane özelliği değil, bir disiplin özelliğidir. `react-i18next` namespace'ler ve lazy backend'ler ile sınırlandırılabilir. `use-intl` route başına bölünebilir. Ancak hiçbir şey bunu zorlamaz ve `t("common:cta")` çağıran paylaşılan bir `<Button>`, `common` namespace'ini sessizce her route'un bağımlılığı haline getirir. [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md) bunu "diğer route'lardan sızıntı" ve "diğer locale'lerden sızıntı" olarak ölçer ve kütüphaneler arasındaki farkın çoğu buradan kaynaklanır.

3. soruya yanıtınız "çok sayıda locale, çok sayıda sayfa" olduysa, bu bölüme herhangi bir API tercihinden daha fazla önem verin. [Bileşen bazlı vs merkezi i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/per-component_vs_centralized_i18n.md) yazısı, aynı tercihin bakım tarafını daha derinlemesine inceler.

## Adaylar

Kütüphane boyutları [TanStack Start benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md) çalışmasından alınmıştır: boş bir bileşende provider artı hook, bundling, tree-shaking ve minification sonrası, 10 sayfa ve 10 locale. İçerik ayrıca ölçülür.

| Kütüphane               | Dalga        | İçerik modeli                                 | Tip güvenliği                      | Mesaj formatı                 | Kütüphane boyutu                                    |
| :---------------------- | :----------- | :-------------------------------------------- | :--------------------------------- | :---------------------------- | :-------------------------------------------------- |
| `react-i18next`         | Runtime      | Merkezi JSON, namespace'ler                   | 2/5 — Opt-in (`CustomTypeOptions`) | i18next (suffix çoğullar)     | ~18.4 kB                                            |
| `react-intl` (FormatJS) | Runtime      | Merkezi JSON, ICU                             | 2/5 — Opt-in (extraction + union)  | ICU                           | ~15.3 kB                                            |
| `use-intl`              | Server-first | Merkezi JSON, ICU                             | 2/5 — Opt-in (declaration merging) | ICU                           | ~14.1 kB                                            |
| `@tolgee/react`         | Runtime      | Merkezi, bağlam içi (in-context) düzenleme    | 1/5 — Yok                          | ICU                           | ~11.1 kB                                            |
| Lingui                  | Macro        | Kod içinde kaynak metin, derlenmiş kataloglar | 2/5 — İyi, derleyiciden gelir      | Makrolar ile ICU              | ~11.8 kB                                            |
| Paraglide               | Compiler     | inlang projesi, üretilen fonksiyonlar         | 3.5/5 — Üretilmiş (Generated)      | Kendine ait                   | Sıfıra yakın (kod tabanında üretilen kod sayesinde) |
| Intlayer                | Compiler     | Bileşen başına `.content.ts`                  | 5/5 — Üretilmiş, varsayılan açık   | Intlayer (+ ICU, i18next, PO) | ~5.0 kB                                             |

> Rakamlar, benchmark sırasındaki sürümlerin anlık bir görüntüsüdür ve yeni sürümlerle değişebilir. Yalnızca boyuta göre karar vermeden önce benchmark'ı kendi uygulamanızda çalıştırın.
> Tip güvenliği: 5/5; anahtarların, parametrelerin ve her locale'in, URL biçimlendirici ve yardımcılar (helpers) dahil olmak üzere manuel kurulum olmadan kontrol edildiği anlamına gelir.

Tablonun göstermediği iki nokta var. `Paraglide`, kodları doğrudan deponuza (repo) ürettiği için neredeyse hiçbir kütüphane kodu içermez; bu da her commit öncesinde bir yeniden üretim adımı ve üretilen dosyalarda merge conflict'leri anlamına gelir. `Intlayer` ise bir bundler eklentisi (`vite-intlayer` veya eşdeğeri) gerektirir, bu nedenle build adımı olmayan bir kurulumda çalışamaz.

## Yanıtlarınızı bir kütüphaneyle eşleştirin

<AccordionGroup>
<Accordion header="Prototip, küçük ekip, az sayıda locale">

Çalışan en basit seçeneği seçin ve aşırı yatırım yapmayın. Locale başına tek bir JSON ile `react-i18next` gayet uygundur ve Stack Overflow'daki on yıllık yanıtlar size zaman kazandıracaktır. İhtiyacınız olana kadar namespace'leri atlayın. Prototip bir ürüne dönüşürse, kapsamlı (scoped) içeriğe geçiş için bütçe ayırın; [react-i18next uyumluluk adaptörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/react-i18next.md) bu geçişi aşamalı hale getirir.

</Accordion>
<Accordion header="Çeviriler bir ajans veya ICU formatını destekleyen bir TMS'den geliyor">

Katalog formatınız sizin yerinize belirlenmiştir. `react-intl` yerel olarak ICU destekler ve FormatJS extraction araçları bu pipeline için oluşturulmuştur. `use-intl` de ICU okur. `react-i18next`, ICU eklentisine ve aksi takdirde kendi çoğul anahtarlarına ihtiyaç duyar. Intlayer'ın ICU desteği henüz kısmi aşamadadır, bu nedenle bugün doğrudan ICU dizeleri alıyorsanız, bu özellik tamamlanana kadar bunu bir engel olarak değerlendirin.

</Accordion>
<Accordion header="Büyük uygulama, çok sayıda route, bundle bütçesi kritik">

Sözleşmeye göre değil, varsayılan olarak kapsamlı (scoped) içeriği ve dinamik yüklemeyi tercih edin. `Lingui` ve `Paraglide` derleme yoluyla buna ulaşır. Intlayer, bileşen başına bildirimlerle buna ulaşır ve derleyici yalnızca bir route'un render ettiği içeriği gönderir. `react-i18next` veya `use-intl` ile namespace ve lazy-loading stratejisini ilk günden planlayın ve code review'larda zorunlu kılın, çünkü araçlar bunu otomatik olarak yapmayacaktır.

</Accordion>
<Accordion header="Type güvenliği vazgeçilmezdir">

Her anahtar tabanlı kütüphane type güvenli hale getirilebilir, ancak neredeyse hiçbiri varsayılan olarak böyle değildir. Lazy yüklenen namespace'ler karşısında ayakta kalması gereken declaration merging yapılarıyla uğraşmak istemiyorsanız, typeların içerikten otomatik üretildiği bir kütüphane seçin: `Lingui`, `Paraglide` veya Intlayer. [Eksik çevirileri algılama](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/detecting_missing_translations.md) yazısı, her birinin derleme zamanında neleri yakaladığını karşılaştırır.

</Accordion>
<Accordion header="Çok sayıda zengin içerik: markdown, cümle içi bağlantılar, locale başına bileşenler">

Zengin düğümler, bir dize döndüren `t()` fonksiyonunun yetersiz kaldığı yerdir. `react-i18next` ve `Lingui` `<Trans>` bileşenine, `react-intl` zengin metin etiketlerine sahiptir; hepsi de düz dize durumuna göre daha hantaldır. Intlayer'ın içerik düğümleri doğrudan JSX, markdown ve iç içe objeleri kabul eder; bu da içeriğin yalnızca UI etiketlerinden ibaret olmadığı durumlar için daha iyi bir çözümdür.

</Accordion>
<Accordion header="Çeviriler AI tarafından üretilecek, geliştiriciler tarafından incelenecek">

Bu durumda, içeri aktarılacak bir TMS bulunmadığından merkezi bir JSON artık bir gereklilik değildir. Birlikte konumlandırılmış içerik ve eksik locale'leri dolduran bir CLI en kısa yoldur. Intlayer'ın `fill` komutu kendi API anahtarınızla (OpenAI, Anthropic, Mistral, Gemini) çalışır ve yalnızca değişen kısımları çevirir. Paraglide ve Tolgee kendi planlarıyla barındırılan alternatifler sunar.

</Accordion>
<Accordion header="Daha sonra Next.js App Router'a geçebilirsiniz">

React context, sunucu/istemci sınırını geçemez. Yalnızca istemci hook'u üzerine kurulu kütüphaneler (`react-i18next`, `react-intl`), RSC'yi benimsediğiniz gün paralel bir sunucu API'sine ihtiyaç duyacaktır. `use-intl` (`next-intl` olarak) ve Intlayer (`next-intlayer` olarak) bu ayrıma zaten sahiptir. Bir deseni standartlaştırmadan önce [Next.js i18n yazısını](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/list_i18n_technologies/frameworks/nextjs.md) okuyun.

</Accordion>
</AccordionGroup>

## Her kütüphanenin yetersiz kaldığı noktalar

Her seçeneğin sınırları vardır, dürüst limitler:

- **`react-i18next`**: Grubun en ağırı, kendine has çoğul formatı, typeların bakımını sizin yapmanız gerekir, ölü anahtarlar sessizce birikir.
- **`react-intl`**: Ayrıntılı (verbose) DX (`useIntl()` ardından `formatMessage({ id })`), birçok düğüme bağlı global instance.
- **`use-intl`**: Başlaması basit, optimize etmesi zahmetli. Namespace'ler, dinamik yükleme ve typelar bir araya geldiğinde geliştirmeyi oldukça yavaşlatır.
- **`Lingui`**: Ekstra `extract` / `compile` derleme adımı, hem insanları hem de AI asistanlarını karıştıran birkaç örtüşen sözdizimi (`t()`, tagged template, `i18n.t()`, `<Trans>`).
- **`Paraglide`**: Depoda üretilen dosyalar, React benchmark'ında tree-shaking etkili olmadı ve locale bir store yerine her düğümde depolamadan (storage) okunur.
- **`Tolgee`**: Anahtar typeları yok, alışması daha zor, öne çıkan satış noktası in-context düzenleme.
- **`Intlayer`**: Zorunlu build eklentisi, daha küçük ekosistem, kısmi ICU desteği, içerik tasarım gereği kod tabanına yayıldığından bir çevirmen için tek bir JSON dışa aktarmak araç gerektirir.
- **`gt-react`, `lingo.dev`**: Benchmark'ta önerilmedi: derlemede kota hataları, satıcı bağımlılığı (vendor lock-in) ve provider'ı zorla yeniden render etmeyi gerektiren reaktivite sorunları.

## Her seçeneğin kodda görünümü

Aynı bileşen, başlık ve çoğul içeren bir sepet özeti, her aday ile yazılmıştır. İlginç olan kısım bileşen değil, içeriğin nerede yaşadığı ve type checker'ın bunun hakkında ne bildiğidir.

<Tabs defaultTab="react-i18next">
  <Tab label="react-i18next" value="react-i18next">

  <Tabs group="locale">
  <Tab value="en" label="İngilizce">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

  </Tab>
  <Tab value="fr" label="Fransızca">

```json fileName="public/locales/fr/cart.json"
{
  "title": "Votre panier",
  "items_one": "{{count}} article",
  "items_other": "{{count}} articles"
}
```

  </Tab>
  <Tab value="es" label="İspanyolca">

```json fileName="public/locales/es/cart.json"
{
  "title": "Tu carrito",
  "items_one": "{{count}} artículo",
  "items_other": "{{count}} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { t } = useTranslation("cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Çoğullar, `Intl.PluralRules` aracılığıyla çözümlenen son ek (suffix) anahtarlarıdır. `CustomTypeOptions` tanımlamadığınız sürece `t`, `(key: string) => string` tipindedir, bu yüzden `t("titel")` başarıyla derlenir.

  </Tab>
  <Tab label="react-intl" value="react-intl">

  <Tabs group="locale">
  <Tab value="en" label="İngilizce">

```json fileName="src/locales/en.json"
{
  "cart.title": "Your cart",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="Fransızca">

```json fileName="src/locales/fr.json"
{
  "cart.title": "Votre panier",
  "cart.items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  <Tab value="es" label="İspanyolca">

```json fileName="src/locales/es.json"
{
  "cart.title": "Tu carrito",
  "cart.items": "{count, plural, one {# artículo} other {# artículos}}"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const intl = useIntl();

  return (
    <section>
      <h2>
        <FormattedMessage id="cart.title" />
      </h2>
      <p>{intl.formatMessage({ id: "cart.items" }, { count })}</p>
    </section>
  );
};
```

Çoğu TMS platformunun dışa aktardığı uçtan uca ICU. `id` üzerindeki typelar, kutudan çıktığı gibi değil, `formatjs` extraction adımı ve üretilen bir union sayesinde gelir.

  </Tab>
  <Tab label="use-intl" value="use-intl">

  <Tabs group="locale">
  <Tab value="en" label="İngilizce">

```json fileName="messages/en.json"
{
  "Cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="Fransızca">

```json fileName="messages/fr.json"
{
  "Cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  <Tab value="es" label="İspanyolca">

```json fileName="messages/es.json"
{
  "Cart": {
    "title": "Tu carrito",
    "items": "{count, plural, one {# artículo} other {# artículos}}"
  }
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslations } from "use-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const t = useTranslations("Cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Next.js binding'leri olmadan `next-intl` ile aynı yapı. `AppConfig` mesaj tipiyle genişletildikten sonra anahtarlar type güvenli hale gelir; namespace'leri bölmek sizin sorumluluğunuzdadır.

  </Tab>
  <Tab label="Lingui" value="lingui">

  <Tabs group="locale">
  <Tab value="en" label="İngilizce">

```po fileName="src/locales/en/messages.po"
msgid "Your cart"
msgstr "Your cart"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# item} other {# items}}"
```

  </Tab>
  <Tab value="fr" label="Fransızca">

```po fileName="src/locales/fr/messages.po"
msgid "Your cart"
msgstr "Votre panier"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# article} other {# articles}}"
```

  </Tab>
  <Tab value="es" label="İspanyolca">

```po fileName="src/locales/es/messages.po"
msgid "Your cart"
msgstr "Tu carrito"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# artículo} other {# artículos}}"
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { Plural, Trans } from "@lingui/react/macro";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>
      <Trans>Your cart</Trans>
    </h2>
    <p>
      <Plural value={count} one="# item" other="# items" />
    </p>
  </section>
);
```

Kaynak dil bileşenin içinde yer alır; diğer locale'ler `lingui extract` sonrasında hashlenmiş id'ler altında `.po` dosyalarında yaşar. `extract` veya `compile` adımlarını unutmak sessizce İngilizceye geri dönülmesine neden olur.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="İngilizce">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="Fransızca">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="İspanyolca">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { m } from "../paraglide/messages.js";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count })}</p>
  </section>
);
```

Her mesaj üretilmiş ve type güvenli bir fonksiyondur, bu nedenle eksik bir anahtar bir import hatası oluşturur. `paraglide/` klasörü deponuzda üretilir ve her değişiklikte yeniden derlenir.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      tr: "Sepetiniz",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: t({
      tr: plural({ one: "{{count}} ürün", other: "{{count}} ürün" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { title, items } = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{title}</h2>
      <p>{items(count)}</p>
    </section>
  );
};
```

Tüm locale'ler bileşenin yanındaki tek bir dosyada bulunur. Typelar derleme sırasında üretilir, böylece `title` otomatik tamamlanır ve bir yazım hatası declaration merging olmadan `tsc` derlemesini durdurur. Klasörü silmek dizeleri de siler.

  </Tab>
</Tabs>

Halihazırda `react-i18next`, `react-intl` veya `Lingui` kullanıyor musunuz? Uyumluluk adaptörleri ([react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/react-i18next.md), [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/react-intl.md), [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/lingui.md)), import'ları bundler düzeyinde alias haline getirir; böylece siz bileşen bazında geçiş yaparken mevcut API çalışmaya devam eder. [Geçiş rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_react-i18next_to_intlayer.md) geri kalan detayları kapsar.

## Karar vermeden önce

Bir özellik tablosu bir kütüphanenin bugün ne yaptığını gösterir. Bu maddeler ise onunla yaşamanın nasıl bir şey olacağını anlatır.

**Repository aktivitesini kontrol edin.**

Commitler, issue yanıt süreleri ve son minör sürümün bu yıl çıkıp çıkmadığı. Bakımı yapılmayan iyi bir mimari, ertelenmiş bir göç sürecidir.

**npm indirme sayılarına göre seçim yapmayın.**

En çok indirilen kütüphane, 2026 React kod tabanına en uygun olan değil, ilk yayınlanan kütüphanedir. İndirmeler uyumu değil, geçmişi ölçer.

![JavaScript i18n kütüphaneleri tier list](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Kütüphaneyi kimin finanse ettiğini ve ne sattıklarını sorun.**

`i18next`, Locize tarafından desteklenmektedir. `next-intl` / `use-intl`, `vue-i18n`, `svelte-i18n` ve Lingui, Crowdin tarafından desteklenmektedir. Tolgee, Paraglide (inlang) ve Intlayer kendi platformlarını yürütmektedir. Geliri barındırılan çevirilerden gelen bir sağlayıcının, araç zinciriniz içinde çeviriyi ücretsiz hale getirmek için çok az nedeni vardır. Intlayer, kendi API anahtarınızla CLI üzerinden AI çevirisi sunan ve self-host edebileceğiniz bir CMS sağlayan tek seçenektir.

**AI agent kullanımına hazır mı?**

Agent'lar i18n konusunda hâlâ zorlanmaktadır: locale'leri unuturlar, anahtarlar uydururlar ve mesaj sözdizimlerini karıştırırlar. Kütüphane, agent'ın içeriği listelemesi, doldurması ve test etmesi için [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md) veya bir [MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md) sunuyor mu? İçerik yüklemesi varsayılan olarak optimize edilmiş mi, yoksa birinin her çeyrekte namespace'leri ve lazy import'ları gözden geçirmesi mi gerekiyor?

**Kutudan çıktığı gibi Type Güvenliği.**

"Ekstra yapılandırmayla type güvenli hale getirilebilir" değil, "yanlış bir anahtar temiz bir kurulumda `tsc` derlemesini durdurur". Var olmayan bir anahtarda ve bir çevirisi eksik olan bir locale durumunda ne olduğunu kontrol edin.

**Kullanılmayan içeriğin tespiti.**

Kataloglar sadece büyür. Intlayer'ın derleme adımı kullanılmayan alanları temizler ve bunları loglar (`build.purge`). Paraglide çağrılmayan mesaj fonksiyonunu tree-shaking ile elediğinden mimari olarak buna ulaşır. Diğer tüm kütüphaneler temizlik işini size bırakır.

**Geliştirici deneyimi (DX).**

İlk çevrilmiş dizeye kadar geçen kurulum süresi, fareyle üzerine gelindiğinde çeviriyi gösteren ve bildirime atlayan bir [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md) veya [VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md), doldurma, test etme ve push için bir [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md), bileşenlerinizdeki sabit kodlanmış dizeleri çıkaran ve böylece her dizeyi anahtar anahtar yönetmenizi gerektirmeyen bir [derleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) veya çıkarıcı ve geliştirici olmayanların bir pull request açmadan içeriği düzenlemesi için bir yol ([görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)).

## Sıkça Sorulan Sorular

<FAQ>

<Question title="react-i18next 2026'da hâlâ iyi bir varsayılan seçenek mi?">

Çoğu ekip için evet. En büyük ekosisteme ve internette en fazla yanıta sahiptir. Maliyetleri gerçektir ancak öngörülebilirdir: en ağır runtime, özel bir çoğul formatı, kendiniz kurup korumanız gereken type güvenliği ve scoping.

</Question>

<Question title="Derleyici tabanlı (compiler-based) bir kütüphaneye ihtiyacım var mı?">

Yalnızca bundle boyutu, üretilen typelar veya derleme zamanında eksik anahtar kontrolleri gereksinimleriniz arasındaysa. İki locale içeren küçük bir uygulama için runtime kütüphanesi daha basittir. [Derleyici vs bildirimsel i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/compiler_vs_declarative_i18n.md) yazısı, derleyicilerin size ne sağladığını ve neleri yanlış yapabileceğini açıklamaktadır.

</Question>

<Question title="Daha sonra her bileşeni yeniden yazmadan kütüphaneyi değiştirebilir miyim?">

Kısmen. Anahtar tabanlı kütüphaneler, bir uyumluluk adaptörünün bir API'yi diğerine eşlemesine yetecek kadar benzer yapıdadır; Intlayer adaptörleri de bu şekilde çalışır. Mesaj formatları (ICU vs i18next vs helper'lar) otomatik olarak dönüştürülmez, bu nedenle çoğullar ve enterpolasyon düzenleyeceğiniz kısım olacaktır.

</Question>

<Question title="Kütüphane seçimi SEO'yu etkiler mi?">

Dolaylı olarak. Crawler'ların gördüğü şey; yönlendirme, `hreflang`, `<html lang>` ve metnin sunucu tarafından render edilen HTML'de olup olmadığına göre belirlenir. Bazı kütüphaneler bunun için helper'lar sunar, çoğu ise bunu size bırakır. [hreflang rehberine](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/hreflang_guide_multilingual_seo.md) göz atın.

</Question>

</FAQ>

## Daha fazlası

- [i18n kütüphane benchmark'ı: bundle boyutu, sızıntı ve locale geçiş süreleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md) ve [TanStack Start raporu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md)
- [React i18n: provider modeli nasıl çalışır ve maliyeti nedir](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/list_i18n_technologies/frameworks/react.md)
- [Özellik özellik: react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/react-i18next_vs_react-intl_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/next-i18next_vs_next-intl_vs_intlayer.md)
- [JavaScript i18n tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md)
- [Derleyici vs bildirimsel i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/compiler_vs_declarative_i18n.md)
- [Bileşen bazlı vs merkezi i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/per-component_vs_centralized_i18n.md)
- [Build zamanında bundle optimizasyonu nasıl çalışır](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md)
- [Vite + React uygulamasında i18n kurulumu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+react.md)
- Aynı rehber: [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/how_to_pick_vue_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/how_to_pick_svelte_i18n_library.md) ve [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/how_to_pick_solid_i18n_library.md)
