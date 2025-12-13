---
createdAt: 2025-03-13
updatedAt: 2025-12-13
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
  - version: 7.5.0
    date: 2025-12-13
    changes: ICU ve i18next format desteği eklendi
  - version: 6.1.6
    date: 2025-10-05
    changes: İlk JSON Senkronizasyon Eklentisi dokümantasyonu
---

# JSON Senkronizasyonu (i18n köprüleri) - ICU / i18next desteği ile JSON Senkronizasyonu

<iframe title="JSON çevirilerinizi Intlayer ile nasıl senkronize tutarsınız" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

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

## Hızlı başlangıç

Eklentiyi `intlayer.config.ts` dosyanıza ekleyin ve mevcut JSON yapınıza işaret edin.

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mevcut JSON dosyalarınızı Intlayer sözlükleriyle senkronize tutun
  plugins: [
    syncJSON({
      // Yerel başına, ad alanı başına düzen (örneğin, next-intl, ad alanları ile i18next)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
});
```

Alternatif: her yerel için tek dosya (i18next/react-intl yapılandırmalarında yaygın):

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### Nasıl çalışır

- Okuma: eklenti, `source` yapıcınızdan JSON dosyalarını keşfeder ve bunları Intlayer sözlükleri olarak yükler.
- Yazma: derlemeler ve doldurmalar sonrası, yerelleştirilmiş JSON'u aynı yollara yazar (biçimlendirme sorunlarını önlemek için sonuna yeni satır ekleyerek).
- Otomatik doldurma: eklenti, her sözlük için bir `autoFill` yolu belirtir. `intlayer fill` komutunu çalıştırmak, JSON dosyalarınızdaki yalnızca eksik çevirileri varsayılan olarak günceller.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // zorunlu
  location?: string, // isteğe bağlı etiket, varsayılan: "plugin"
  priority?: number, // isteğe bağlı öncelik, çakışma çözümü için, varsayılan: 0
  format?: 'intlayer' | 'icu' | 'i18next', // isteğe bağlı formatlayıcı, varsayılan: 'intlayer'
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

JSON dosyalarını senkronize ederken sözlük içeriği için kullanılacak formatlayıcıyı belirtir. Bu, çeşitli i18n kütüphaneleriyle uyumlu farklı mesaj formatlama sözdizimlerini kullanmanıza olanak tanır.

- `'intlayer'`: Varsayılan Intlayer formatlayıcısı (varsayılan).
- `'icu'`: ICU mesaj formatlamasını kullanır (react-intl, vue-i18n gibi kütüphanelerle uyumlu).
- `'i18next'`: i18next mesaj formatlamasını kullanır (i18next, next-i18next, Solid-i18next ile uyumlu).

**Örnek:**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // Uyumluluk için i18next formatlaması kullan
}),
```

## Birden fazla JSON kaynağı ve öncelik

Farklı JSON kaynaklarını senkronize etmek için birden fazla `syncJSON` eklentisi ekleyebilirsiniz. Bu, projenizde birden fazla i18n kütüphanesi veya farklı JSON yapıları olduğunda faydalıdır.

### Öncelik sistemi

Birden fazla eklenti aynı sözlük anahtarını hedeflediğinde, `priority` parametresi hangi eklentinin öncelikli olduğunu belirler:

- Daha yüksek öncelik numaraları, daha düşük olanlara karşı kazanır

- `.content` dosyalarının varsayılan önceliği `0`'dır
- Eklentilerin içerik dosyalarının varsayılan önceliği `-1`'dir
- Aynı önceliğe sahip eklentiler, yapılandırmada göründükleri sırayla işlenir

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
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
});
```

### Çakışma çözümü

Aynı çeviri anahtarı birden fazla JSON kaynağında mevcutsa:

1. En yüksek önceliğe sahip eklenti nihai değeri belirler
2. Daha düşük öncelikli kaynaklar, eksik anahtarlar için yedek olarak kullanılır
3. Bu, eski çevirileri korumanıza ve yeni yapılara kademeli olarak geçiş yapmanıza olanak tanır

## Entegrasyonlar

Aşağıda yaygın eşlemeler bulunmaktadır. Çalışma zamanınızı değiştirmeyin; sadece eklentiyi ekleyin.

### i18next

Tipik dosya düzeni: `./public/locales/{locale}/{namespace}.json` veya `./locales/{locale}/{namespace}.json`.

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

export default {
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};
```

### next-intl

Her yerel için JSON mesajları (genellikle `./messages/{locale}.json`) veya her ad alanı için.

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
  }),
];
```

Ayrıca bakınız: `docs/tr/intlayer_with_next-intl.md`.

### react-intl

Her yerel için tek JSON yaygındır:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### vue-i18n

Her yerel için ya da her ad alanı için tek bir dosya olabilir:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
];
```

## CLI

Eşzamanlanmış JSON dosyaları diğer `.content` dosyaları gibi kabul edilecektir. Bu, tüm intlayer komutlarının eşzamanlanmış JSON dosyaları için de kullanılabilir olduğu anlamına gelir. Şunları içerir:

- Eksik çevirilerin olup olmadığını test etmek için `intlayer content test`
- Eşzamanlanmış JSON dosyalarını listelemek için `intlayer content list`
- Eksik çevirileri doldurmak için `intlayer content fill`
- Eşzamanlanmış JSON dosyalarını göndermek için `intlayer content push`
- Eşzamanlanmış JSON dosyalarını çekmek için `intlayer content pull`

Daha fazla detay için [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_cli.md) sayfasına bakınız.

## Sınırlamalar (mevcut)

- Üçüncü taraf kütüphaneler hedeflendiğinde ekleme veya çoğul/ICU desteği yoktur.
- Görsel editör henüz Intlayer dışı çalışma zamanları için mevcut değildir.
- Sadece JSON senkronizasyonu; JSON olmayan katalog formatları desteklenmemektedir.

## Neden bu önemli

- Yerleşik i18n çözümlerini önerebilir ve Intlayer'ı bir eklenti olarak konumlandırabiliriz.
- JSON yönetimi için Intlayer öneren eğitimlerle onların SEO/anahtar kelimelerinden faydalanırız.
- Hedef kitlesini “yeni projeler”den “zaten i18n kullanan herhangi bir ekip”e genişletir.
