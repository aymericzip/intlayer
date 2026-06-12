---
createdAt: 2026-05-10
updatedAt: 2026-05-10
title: Sync PO eklentisi
description: Intlayer sözlüklerini Gettext PO dosyalarıyla senkronize edin. Mesajlarınızı yönetmek, çevirmek ve test etmek için Intlayer'ı kullanırken mevcut i18n yapınızı koruyun.
keywords:
  - Intlayer
  - Sync PO
  - Gettext
  - i18n
  - çeviriler
slugs:
  - doc
  - plugin
  - sync-po
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 8.9.4
    date: 2026-05-10
    changes: "Sync PO eklentisi ilk dokümantasyonu"
author: aymericzip
---

# Sync PO (i18n köprüleri) - ICU / i18next desteğiyle Sync PO

Intlayer'ı mevcut i18n yığınınız için bir eklenti olarak kullanın. Bu eklenti, Gettext PO mesajlarınızı Intlayer sözlükleriyle senkronize tutar, böylece şunları yapabilirsiniz:

- Mevcut PO tabanlı çeviri iş akışınızı koruyun.
- Uygulamanızı yeniden yapılandırmadan mesajlarınızı Intlayer (CLI, CI, sağlayıcılar, CMS) ile yönetin ve çevirin.
- PO yönetim katmanı olarak Intlayer'ı önerirken, her ekosistemi hedefleyen öğreticiler ve SEO içerikleri sunun.

Notlar ve mevcut kapsam:

- CMS'ye dışsallaştırma, çeviriler ve klasik metinler için çalışır.
- PO girişlerinin kendisinde eklemeler, çoğullar/ICU veya diğer kütüphanelerin gelişmiş çalışma zamanı özellikleri için henüz destek yoktur.
- Görsel düzenleyici henüz üçüncü taraf i18n çıktıları için desteklenmemektedir.

### Bu eklenti ne zaman kullanılmalı?

- Çevirileriniz için zaten Gettext PO dosyalarını kullanıyorsanız.
- İşleme çalışma zamanınızı değiştirmeden yapay zeka destekli doldurma, CI'da test ve içerik operasyonları istiyorsanız.

## Kurulum

```bash
pnpm add -D @intlayer/sync-po-plugin
# veya
npm i -D @intlayer/sync-po-plugin
```

## Eklentiler

Bu paket iki eklenti sunar:

- `loadPO`: PO dosyalarını Intlayer sözlüklerine yükler.
  - Bu eklenti, bir kaynaktan PO dosyalarını yüklemek için kullanılır ve Intlayer sözlüklerine yüklenecektir. Tüm kod tabanını tarayabilir ve belirli PO dosyalarını arayabilir.
    Bu eklenti şu durumlarda kullanılabilir:
    - PO dosyalarınızın yükleneceği belirli bir konumu zorunlu kılan bir i18n kütüphanesi kullanıyorsanız ancak içerik bildiriminizi kod tabanınızda istediğiniz yere yerleştirmek istiyorsanız.
    - Mesajlarınızı uzak bir kaynaktan (örneğin: bir CMS, bir API vb.) getirmek ve mesajlarınızı PO dosyalarında saklamak istiyorsanız.

  > Arka planda, bu eklenti tüm kod tabanını tarayacak ve belirli PO dosyalarını arayacak ve bunları Intlayer sözlüklerine yükleyecektir.
  > Bu eklentinin çıktıyı ve çevirileri PO dosyalarına geri yazmayacağını unutmayın.

- `syncPO`: PO dosyalarını Intlayer sözlükleriyle senkronize eder.
  - Bu eklenti, PO dosyalarını Intlayer sözlükleriyle senkronize etmek için kullanılır. Verilen konumu tarayabilir ve belirli PO dosyaları için kalıpla eşleşen PO'ları yükleyebilir. Bu eklenti, başka bir i18n kütüphanesi kullanırken Intlayer'ın avantajlarından yararlanmak istiyorsanız yararlıdır.

## Her iki eklentinin kullanımı

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO, syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mevcut PO dosyalarınızı Intlayer sözlükleriyle senkronize tutun
  plugins: [
    /**
     * src içindeki {key}.i18n.po kalıbıyla eşleşen tüm PO dosyalarını yükleyecektir
     */
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      locale: Locales.ENGLISH,
      priority: 1, // Bu PO dosyalarının `./locales/en/${key}.po` adresindeki dosyalara göre öncelikli olmasını sağlar
    }),
    /**
     * Çıktıyı ve çevirileri yükleyecek ve locales dizinindeki PO dosyalarına geri yazacaktır
     */
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      priority: 0,
    }),
  ],
};

export default config;
```

## `syncPO` eklentisi

### Hızlı başlangıç

Eklentiyi `intlayer.config.ts` dosyanıza ekleyin ve mevcut PO yapınızı işaret edin.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mevcut PO dosyalarınızı Intlayer sözlükleriyle senkronize tutun
  plugins: [
    syncPO({
      // Dil başına, ad alanı başına düzen
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

Alternatif: dil başına tek dosya:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      source: ({ locale }) => `./locales/${locale}.po`,
    }),
  ],
};

export default config;
```

#### Nasıl çalışır?

- Okuma: Eklenti, `source` oluşturucunuzdan PO dosyalarını bulur ve bunları Intlayer sözlükleri olarak yükler.
- Yazma: Derlemelerden ve doldurmalardan sonra, yerelleştirilmiş PO'ları aynı yollara geri yazar (uygun Gettext başlıklarıyla).
- Otomatik Doldurma: Eklenti, her sözlük için bir `autoFill` yolu bildirir. `intlayer fill` komutunu çalıştırmak varsayılan olarak yalnızca PO dosyalarınızdaki eksik çevirileri günceller.

API:

```ts
syncPO({
  source: ({ key, locale }) => string, // gerekli
  location?: string, // isteğe bağlı etiket, varsayılan: "sync-po::path/to/source"
  priority?: number, // çakışma çözümü için isteğe bağlı öncelik, varsayılan: 0
});
```

### Birden fazla PO kaynağı ve öncelik

Farklı PO kaynaklarını senkronize etmek için birden fazla `syncPO` eklentisi ekleyebilirsiniz. Bu, projenizde birden fazla çeviri kaynağınız veya farklı PO yapılarınız olduğunda kullanışlıdır.

#### Öncelik sistemi

Birden fazla eklenti aynı sözlük anahtarını hedeflediğinde, `priority` parametresi hangi eklentinin öncelikli olduğunu belirler:

- Yüksek öncelik sayıları düşük olanlara göre önceliklidir
- `.content` dosyalarının varsayılan önceliği `0`'dır
- Eklentilerin varsayılan önceliği `0`'dır
- Aynı önceliğe sahip eklentiler yapılandırmada göründükleri sıraya göre işlenir

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Birincil PO kaynağı (en yüksek öncelik)
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      location: "main-translations",
      priority: 10,
    }),

    // Yedek PO kaynağı (düşük öncelik)
    syncPO({
      source: ({ locale }) => `./fallback-locales/${locale}.po`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Eski PO kaynağı (en düşük öncelik)
    syncPO({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.po`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Load PO eklentisi

### Hızlı başlangıç

Mevcut PO dosyalarını Intlayer sözlükleri olarak almak için eklentiyi `intlayer.config.ts` dosyanıza ekleyin. Bu eklenti salt okunurdur (diske yazma yapılmaz):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Kaynak ağacınızın herhangi bir yerinde bulunan PO mesajlarını alın
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      // Eklenti örneği başına tek bir dil yükle (yapılandırma defaultLocale değerine varsayılan olarak ayarlanır)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternatif: dil başına düzen, hala salt okunur (yalnızca seçilen dil yüklenir):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadPO({
      // Bu kalıptan yalnızca Locales.FRENCH dosyaları yüklenecektir
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### Nasıl çalışır?

- Keşfetme: `source` oluşturucunuzdan bir glob oluşturur ve eşleşen PO dosyalarını toplar.
- Alım: Her PO dosyasını sağlanan `locale` ile bir Intlayer sözlüğü olarak yükler.
- Salt Okunur: Çıktı dosyalarını yazmaz veya biçimlendirmez; gidiş-dönüş senkronizasyonuna ihtiyacınız varsa `syncPO` kullanın.
- Otomatik Doldurmaya Hazır: Eksik anahtarları doldurmak için `intlayer content fill` komutunun kullanabileceği bir `fill` yolu tanımlar.

### API

```ts
loadPO({
  // PO dosyalarınıza giden yolları oluşturun. Yapınızda dil segmenti yoksa `locale` isteğe bağlıdır
  source: ({ key, locale }) => string,

  // Bu eklenti örneği tarafından yüklenen sözlükler için hedef dil
  // configuration.internationalization.defaultLocale değerine varsayılan olarak ayarlanır
  locale?: Locale,

  // Kaynağı tanımlamak için isteğe bağlı etiket
  location?: string, // varsayılan: "plugin"

  // Diğer kaynaklara karşı çakışma çözümü için kullanılan öncelik
  priority?: number, // varsayılan: 0
});
```

### Davranış ve kurallar

- `source` maskeniz bir dil yer tutucusu içeriyorsa, yalnızca seçilen `locale` için dosyalar alınır.
- Maskenizde `{key}` segmenti yoksa sözlük anahtarı "index" olur.
- Anahtarlar, `source` oluşturucunuzdaki `{key}` yer tutucusunun değiştirilmesiyle dosya yollarından türetilir.
- Eklenti yalnızca bulunan dosyaları kullanır ve eksik dilleri veya anahtarları uydurmaz.
- `fill` yolu `source` değerinizden çıkarılır ve katılım sağladığınızda CLI aracılığıyla eksik değerleri güncellemek için kullanılır.

## Çakışma çözümü

Aynı çeviri anahtarı birden fazla PO kaynağında mevcut olduğunda:

1. En yüksek önceliğe sahip eklenti nihai değeri belirler
2. Düşük öncelikli kaynaklar eksik anahtarlar için geri dönüş olarak kullanılır
3. Bu, yeni yapılara kademeli olarak geçerken eski çevirileri korumanıza olanak tanır

## CLI

Senkronize edilmiş PO dosyaları diğer `.content` dosyaları gibi değerlendirilecektir. Bu, senkronize edilmiş PO dosyaları için tüm intlayer komutlarının kullanılabilir olacağı anlamına gelir. Şunlar dahildir:

- Eksik çeviri olup olmadığını test etmek için `intlayer content test`
- Senkronize edilmiş PO dosyalarını listelemek için `intlayer content list`
- Eksik çevirileri doldurmak için `intlayer content fill`
- Senkronize edilmiş PO dosyalarını göndermek (push) için `intlayer content push`
- Senkronize edilmiş PO dosyalarını çekmek (pull) için `intlayer content pull`

Daha fazla ayrıntı için [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) sayfasına bakın.

## Sınırlamalar (güncel)

- Üçüncü taraf kütüphaneleri hedeflerken ekleme veya çoğul/ICU desteği yoktur.
- Görsel düzenleyici henüz Intlayer dışı çalışma zamanları için mevcut değildir.
- Yalnızca PO senkronizasyonu; PO dışı katalog biçimleri desteklenmez.

## Bu neden önemli?

- Yerleşik i18n çözümlerini önerebilir ve Intlayer'ı bir eklenti olarak konumlandırabiliriz.
- PO'ları yönetmek için Intlayer'ı önererek sona eren öğreticilerle onların SEO/anahtar kelimelerinden yararlanırız.
- Adreslenebilir kitleyi "yeni projelerden", "zaten i18n kullanan herhangi bir ekibe" genişletir.
