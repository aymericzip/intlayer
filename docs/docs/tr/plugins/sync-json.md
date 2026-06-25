---
createdAt: 2025-03-13
updatedAt: 2026-06-21
title: JSON Senkronizasyon Eklentisi
description: Intlayer sözlüklerini üçüncü taraf i18n JSON dosyalarıyla (i18next, next-intl, react-intl, vue-i18n ve daha fazlası) senkronize edin. Mevcut i18n yapınızı koruyarak Intlayer ile mesajlarınızı yönetin, çevirin ve test edin.
keywords:
  - Intlayer
  - JSON Senkronizasyonu
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - çeviriler
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 9.0.0
    date: 2026-06-21
    changes: "next-intl / react-intl tek dosya düzenleri için splitKeys seçeneği eklendi (üst düzey ad alanı anahtarı başına bir sözlük)"
  - version: 7.5.0
    date: 2025-12-13
    changes: "ICU ve i18next format desteği eklendi"
  - version: 6.1.6
    date: 2025-10-05
    changes: "İlk JSON Senkronizasyon Eklentisi dokümantasyonu"
author: aymericzip
---

# JSON Senkronizasyonu (i18n köprüleri) - ICU / i18next desteği ile JSON Senkronizasyonu

<iframe title="JSON çevirilerinizi Intlayer ile nasıl senkronize tutarsınız" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer'ı mevcut i18n yapınıza bir eklenti olarak kullanın. Bu eklenti, JSON mesajlarınızı Intlayer sözlükleriyle senkronize tutar, böylece:

- i18next, next-intl, react-intl, vue-i18n, next-translate, nuxt-i18n, Solid-i18next, svelte-i18n vb. kullanmaya devam edebilirsiniz.
- Uygulamanızı yeniden yapılandırmadan Intlayer (CLI, CI, sağlayıcılar, CMS) ile mesajlarınızı yönetip çevirebilirsiniz.
- Her ekosistemi hedefleyen eğitimler ve SEO içerikleri sunabilir, aynı zamanda Intlayer'ı JSON yönetim katmanı olarak önerebilirsiniz.

Notlar ve mevcut kapsam:

- CMS'ye dışa aktarma, çeviriler ve klasik metinler için çalışır.
- Henüz eklemeler, çoğullar/ICU veya diğer kütüphanelerin gelişmiş çalışma zamanı özellikleri desteklenmemektedir.
- Görsel editör, üçüncü taraf i18n çıktıları için henüz desteklenmemektedir.

### Bu eklenti ne zaman kullanılmalı

- Zaten bir i18n kütüphanesi kullanıyor ve mesajları JSON dosyalarında saklıyorsunuz.
- Rendering çalışma zamanınızı değiştirmeden AI destekli doldurma, CI'da test ve içerik operasyonları yapmak istiyorsunuz.

## Kurulum

```bash
pnpm add -D @intlayer/sync-json-plugin
# veya
npm i -D @intlayer/sync-json-plugin
```

## Plugins

Bu paket iki eklenti sağlar:

- `loadJSON`: JSON dosyalarını Intlayer sözlüklerine yükler.
  - Bu eklenti, bir kaynaktan JSON dosyalarını yüklemek için kullanılır ve Intlayer sözlüklerine yüklenecektir. Tüm kod tabanını tarayabilir ve belirli JSON dosyalarını arayabilir.
    Bu eklenti şu durumlarda kullanılabilir:
    - JSON'larınızın belirli bir konumda yüklenmesini zorunlu kılan bir i18n kütüphanesi kullanıyorsanız (örn: `next-intl`, `i18next`, `react-intl`, `vue-i18n`, vb.), ancak içerik bildirimlerinizi kod tabanınızda istediğiniz yere yerleştirmek istiyorsanız.
    - Mesajlarınızı uzak bir kaynaktan (örn: bir CMS, bir API, vb.) almak ve mesajlarınızı JSON dosyalarında saklamak istiyorsanız da kullanılabilir.

  > Arka planda, bu eklenti tüm kod tabanını tarayacak ve belirli JSON dosyalarını arayacak ve bunları Intlayer sözlüklerine yükleyecektir.
  > Bu eklentinin çıktıyı ve çevirileri JSON dosyalarına geri yazmayacağını unutmayın.

- `syncJSON`: JSON dosyalarını Intlayer sözlükleriyle senkronize eder.
  - Bu eklenti, JSON dosyalarını Intlayer sözlükleriyle senkronize etmek için kullanılır. Verilen konumu tarayabilir ve belirli JSON dosyaları için desene uyan JSON'u yükleyebilir. Bu eklenti, başka bir i18n kütüphanesi kullanırken Intlayer'ın faydalarından yararlanmak istiyorsanız kullanışlıdır.

## Her iki eklentiyi de kullanma

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mevcut JSON dosyalarınızı Intlayer sözlükleriyle senkronize tutun
  plugins: [
    /**
     * src dizinindeki {key}.i18n.json desenine uyan tüm JSON dosyalarını yükleyecektir
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Bu JSON dosyalarının `./locales/en/${key}.json` adresindeki dosyalara göre öncelikli olmasını sağlar
      format: "intlayer", // JSON içeriğinin formatı
    }),
    /**
     * Çıktıyı ve çevirileri locales dizinindeki JSON dosyalarına yükleyecek ve yazacaktır
     */
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
      format: "i18next",
    }),
  ],
};

export default config;
```

## `syncJSON` plugin

### Hızlı başlangıç

Eklentiyi `intlayer.config.ts` dosyanıza ekleyin ve mevcut JSON yapınıza işaret edin.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mevcut JSON dosyalarınızı Intlayer sözlükleriyle senkronize tutun
  plugins: [
    syncJSON({
      // Yerel başına, ad alanı başına düzen (örneğin, next-intl, ad alanları ile i18next)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "icu",
    }),
  ],
};

export default config;
```

Alternatif: her yerel için tek dosya (i18next/react-intl yapılandırmalarında yaygın):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
      format: "i18next",
    }),
  ],
};

export default config;
```

#### Nasıl çalışır

- Okuma: eklenti, `source` yapıcınızdan JSON dosyalarını keşfeder ve bunları Intlayer sözlükleri olarak yükler.
- Yazma: derlemeler ve doldurmalar sonrası, yerelleştirilmiş JSON'u aynı yollara yazar (biçimlendirme sorunlarını önlemek için sonuna yeni satır ekleyerek).
- Otomatik doldurma: eklenti, her sözlük için bir `autoFill` yolu belirtir. `intlayer fill` komutunu çalıştırmak, JSON dosyalarınızdaki yalnızca eksik çevirileri varsayılan olarak günceller.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // zorunlu
  location?: string, // isteğe bağlı etiket, varsayılan: "plugin"
  priority?: number, // isteğe bağlı öncelik, çakışma çözümü için, varsayılan: 0
  format?: 'intlayer' | 'icu' | 'i18next', // isteğe bağlı formatlayıcı, Intlayer runtime uyumluluğu için kullanılır
  splitKeys?: boolean, // isteğe bağlı, tek bir dosyayı üst düzey anahtar başına bir sözlüğe böler (otomatik algılanır)
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

JSON dosyalarını senkronize ederken sözlük içeriği için kullanılacak formatlayıcıyı belirtir. Bu, Intlayer runtime ile uyumlu farklı mesaj formatlama sözdizimlerini kullanmanıza olanak tanır.

- `undefined`: Hiçbir formatlayıcı kullanılmayacak, JSON içeriği olduğu gibi kullanılacak.
- `'intlayer'`: Varsayılan Intlayer formatlayıcısı (varsayılan).
- `'icu'`: ICU mesaj formatlamasını kullanır (react-intl, vue-i18n gibi kütüphanelerle uyumlu).
- `'i18next'`: i18next mesaj formatlamasını kullanır (i18next, next-i18next, Solid-i18next ile uyumlu).

> Bir formatlayıcı kullanmanın JSON içeriğinizi girdi ve çıktıda dönüştüreceğini unutmayın. ICU çoğulları gibi karmaşık JSON kuralları için, ayrıştırma girdi ve çıktı arasında 1'e 1 eşleme garanti edemeyebilir.
> Intlayer runtime kullanmıyorsanız, bir formatlayıcı ayarlamamayı tercih edebilirsiniz.

**Örnek:**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // Uyumluluk için i18next formatlaması kullan
}),
```

#### `splitKeys` (boolean)

**İlk düzey anahtarları ad alanları olan** tek bir JSON dosyasının, tüm dosyayı tutan tek bir sözlük yerine, üst düzey anahtar başına bir sözlük haline gelip gelmeyeceğini kontrol eder.

Bu, `next-intl` ve `react-intl` gibi kütüphanelerin ad alanı modeline uyar; burada bir `messages/{locale}.json` dosyası, ilk düzey anahtarlarıyla birden çok ad alanını gruplandırır ve her biri bağımsız olarak ele alınır (örneğin, `useTranslations('Hero')` `Hero` sözlüğüne çözümlenir).

- `undefined` (varsayılan): **otomatik algılanır** — `source` deseninde `{key}` segmenti yoksa dosya bölünür (bir dosya her ad alanını tutar), aksi takdirde tek bir sözlük olarak kalır (anahtar başına bir dosya).
- `true`: her üst düzey anahtarı her zaman kendi sözlüğüne böler.
- `false`: asla bölmez; tüm dosya tek bir sözlük haline gelir.

Tek bir `messages/{locale}.json` dosyası verildiğinde:

```json fileName="messages/en.json"
{
  "Hero": { "title": "Full-stack developer" },
  "Nav": { "work": "Work", "about": "About" },
  "About": { "lead": "I build apps end to end." }
}
```

```ts fileName="intlayer.config.ts"
syncJSON({
  format: "icu",
  source: ({ locale }) => `./messages/${locale}.json`,
  // splitKeys: true, // desenin `{key}` segmenti olmadığı için ima edilir
}),
```

Bu, üç sözlük (`Hero`, `Nav` ve `About`) üretir, böylece `useTranslations('Hero')` (next-intl) doğru şekilde çözümlenir. Geri yazma işleminde, tüm ad alanları aynı yerel başına dosyada yeniden birleştirilir.

> `source` içinde açık `{key}` segmentini koruduğunuzda (örneğin, `./locales/${locale}/${key}.json`), her dosya zaten bir ad alanıdır, bu nedenle bölme varsayılan olarak devre dışıdır.

### Multiple JSON sources and priority

Farklı JSON kaynaklarını senkronize etmek için birden fazla `syncJSON` eklentisi ekleyebilirsiniz. Bu, projenizde birden fazla i18n kütüphanesi veya farklı JSON yapıları olduğunda faydalıdır.

#### Öncelik sistemi

Birden fazla eklenti aynı sözlük anahtarını hedeflediğinde, `priority` parametresi hangi eklentinin öncelikli olduğunu belirler:

- Daha yüksek öncelik numaraları, daha düşük olanlara karşı kazanır
- `.content` dosyalarının varsayılan önceliği `0`'dır
- Eklentilerin varsayılan önceliği `0`'dır
- Aynı önceliğe sahip eklentiler, yapılandırmada göründükleri sırayla işlenir

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Birincil JSON kaynağı (en yüksek öncelik)
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // Yedek JSON kaynağı (daha düşük öncelik)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Eski JSON kaynağı (en düşük öncelik)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Load JSON plugin

### Hızlı başlangıç

Mevcut JSON dosyalarını Intlayer sözlükleri olarak almak için eklentiyi `intlayer.config.ts` dosyanıza ekleyin. Bu eklenti salt okunurdur (diske yazma yapmaz):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Kaynak ağacınızın herhangi bir yerinde bulunan JSON mesajlarını alın
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // Eklenti örneği başına tek bir yerel yükleyin (yapılandırma varsayılan yereline ayarlanır)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternatif: yerel başına düzen, yine salt okunur (yalnızca seçilen yerel yüklenir):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadJSON({
      // Bu desenden yalnızca Locales.FRENCH için dosyalar yüklenecektir
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### Nasıl çalışır

- Keşfet: `source` yapıcınızdan bir glob oluşturur ve eşleşen JSON dosyalarını toplar.
- Al: her JSON dosyasını sağlanan `locale` ile bir Intlayer sözlüğü olarak yükler.
- Salt okunur: çıktı dosyalarını yazmaz veya biçimlendirmez; gidiş-dönüş senkronizasyonuna ihtiyacınız varsa `syncJSON` kullanın.
- Otomatik doldurmaya hazır: `fill` deseni tanımlar, böylece `intlayer content fill` eksik anahtarları CLI aracılığıyla doldurabilir.

### API

```ts
loadJSON({
  // JSON'unuza giden yolları oluşturun. Yapınızda yerel segment yoksa `locale` isteğe bağlıdır
  source: ({ key, locale }) => string,

  // Bu eklenti örneği tarafından yüklenen sözlükler için hedef yerel
  // configuration.internationalization.defaultLocale varsayılanına ayarlanır
  locale?: Locale,

  // Kaynağı tanımlamak için isteğe bağlı etiket
  location?: string, // varsayılan: "plugin"

  // Diğer kaynaklara karşı çakışma çözümü için kullanılan öncelik
  priority?: number, // varsayılan: 0

  // JSON içeriği için isteğe bağlı formatlayıcı
  format?: 'intlayer' | 'icu' | 'i18next', // varsayılan: 'intlayer'

  // Tek bir dosyayı üst düzey anahtar başına bir sözlüğe böler (otomatik algılanır)
  splitKeys?: boolean,
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

JSON dosyalarını yüklerken sözlük içeriği için kullanılacak formatlayıcıyı belirtir. Bu, çeşitli i18n kütüphaneleriyle uyumlu farklı mesaj formatlama sözdizimlerini kullanmanıza olanak tanır.

- `'intlayer'`: Varsayılan Intlayer formatlayıcısı (varsayılan).
- `'icu'`: ICU mesaj formatlamasını kullanır (react-intl, vue-i18n gibi kütüphanelerle uyumlu).
- `'i18next'`: i18next mesaj formatlamasını kullanır (i18next, next-i18next, Solid-i18next ile uyumlu).

**Örnek:**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // Uyumluluk için ICU formatlaması kullan
}),
```

#### `splitKeys` (boolean)

[`syncJSON`](#splitkeys-boolean) ile aynı davranış: tek bir JSON dosyası, ilk düzey anahtarlarıyla birden çok ad alanını gruplandırdığında, her üst düzey anahtar kendi sözlüğü haline gelir.

- `undefined` (varsayılan): **otomatik algılanır** — `source` deseninde `{key}` segmenti yoksa bölünür, aksi takdirde tek bir sözlük olur.
- `true` / `false`: bölmeyi zorlar veya devre dışı bırakır.

```ts
loadJSON({
  source: ({ locale }) => `./messages/${locale}.json`,
  format: "icu",
  // splitKeys otomatik etkinleştirildi: `Hero`, `Nav`, `About`, … her biri bir sözlük haline gelir
}),
```

### Behavior and conventions

- `source` maskeniz bir yerel yer tutucusu içeriyorsa, yalnızca seçilen `locale` için dosyalar alınır.
- Maskenizde `{key}` segmenti yoksa, dosyanın her üst düzey anahtarı varsayılan olarak kendi sözlüğü haline gelir (bkz. [`splitKeys`](#splitkeys-boolean)). Bunun yerine tüm dosyayı tek bir `index` sözlüğü olarak yüklemek için `splitKeys: false` olarak ayarlayın.
- Anahtarlar, `source` yapıcınızdaki `{key}` yer tutucusunun yerine geçirilerek dosya yollarından türetilir.
- Eklenti yalnızca keşfedilen dosyaları kullanır ve eksik yerelleri veya anahtarları uydurmaz.
- `fill` yolu, `source`'unuzdan çıkarılır ve CLI aracılığıyla eksik değerleri güncellemek için kullanılır.

## Conflict resolution

Aynı çeviri anahtarı birden fazla JSON kaynağında mevcutsa:

1. En yüksek önceliğe sahip eklenti nihai değeri belirler
2. Daha düşük öncelikli kaynaklar, eksik anahtarlar için yedek olarak kullanılır
3. Bu, eski çevirileri korumanıza ve yeni yapılara kademeli olarak geçiş yapmanıza olanak tanır

## CLI

Eşzamanlanmış JSON dosyaları diğer `.content` dosyaları gibi kabul edilecektir. Bu, tüm intlayer komutlarının eşzamanlanmış JSON dosyaları için de kullanılabilir olduğu anlamına gelir. Şunları içerir:

- Eksik çevirilerin olup olmadığını test etmek için `intlayer content test`
- Eşzamanlanmış JSON dosyalarını listelemek için `intlayer content list`
- Eksik çevirileri doldurmak için `intlayer content fill`
- Eşzamanlanmış JSON dosyalarını göndermek için `intlayer content push`
- Eşzamanlanmış JSON dosyalarını çekmek için `intlayer content pull`

Daha fazla detay için [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) sayfasına bakınız.

## Sınırlamalar (mevcut)

- Üçüncü taraf kütüphaneler hedeflendiğinde ekleme veya çoğul/ICU desteği yoktur.
- Görsel editör henüz Intlayer dışı çalışma zamanları için mevcut değildir.
- Sadece JSON senkronizasyonu; JSON olmayan katalog formatları desteklenmemektedir.

## Neden bu önemli

- Yerleşik i18n çözümlerini önerebilir ve Intlayer'ı bir eklenti olarak konumlandırabiliriz.
- JSON yönetimi için Intlayer öneren eğitimlerle onların SEO/anahtar kelimelerinden faydalanırız.
- Hedef kitlesini “yeni projeler”den “zaten i18n kullanan herhangi bir ekip”e genişletir.
