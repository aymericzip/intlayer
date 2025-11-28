---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Intlayer kullanarak next-intl JSON çevirilerinizi nasıl otomatikleştirirsiniz
description: Next.js uygulamalarında gelişmiş uluslararasılaştırma için Intlayer ve next-intl ile JSON çevirilerinizi otomatikleştirin.
keywords:
  - Intlayer
  - next-intl
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-intl
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: loadJSON eklentisi eklendi
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSON eklentisine geçildi
---

# Intlayer kullanarak next-intl JSON çevirilerinizi nasıl otomatikleştirirsiniz

## Intlayer nedir?

**Intlayer**, geleneksel i18n çözümlerinin eksikliklerini gidermek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma kütüphanesidir. Next.js uygulamalarında içerik yönetimi için modern bir yaklaşım sunar.

Next-intl ile somut bir karşılaştırma için [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md) blog yazımıza bakın.

## Neden Intlayer'ı next-intl ile Birleştirmelisiniz?

Intlayer mükemmel bir bağımsız i18n çözümü sunarken (bakınız [Next.js entegrasyon rehberimiz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md)), birkaç nedenle next-intl ile birleştirmek isteyebilirsiniz:

1. **Mevcut kod tabanı**: Yerleşik bir next-intl uygulamanız var ve Intlayer'ın geliştirilmiş geliştirici deneyimine kademeli olarak geçmek istiyorsunuz.
2. **Eski gereksinimler**: Projeniz mevcut next-intl eklentileri veya iş akışları ile uyumluluk gerektiriyor.
3. **Takım aşinalığı**: Ekibiniz next-intl ile rahat çalışıyor ancak daha iyi içerik yönetimi istiyor.
4. **Intlayer özelliklerini kullanma**: İçerik beyanı, çeviri otomasyonu, çevirileri test etme ve daha fazlası gibi Intlayer özelliklerini kullanmak istiyorsunuz.

**Bunun için, Intlayer, JSON çevirilerinizi CLI veya CI/CD boru hatlarında otomatikleştirmeye, çevirilerinizi test etmeye ve daha fazlasına yardımcı olmak için next-intl için bir adaptör olarak uygulanabilir.**

Bu rehber, Intlayer'ın üstün içerik beyan sistemi avantajlarından yararlanırken next-intl ile uyumluluğu nasıl koruyacağınızı gösterir.

## İçindekiler

<TOC/>

## Intlayer'ı next-intl ile Kurmak için Adım Adım Rehber

### Adım 1: Bağımlılıkları Yükleyin

Gerekli paketleri yükleyin:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin
```

**Paket açıklamaları:**

- **intlayer**: Uluslararasılaştırma yönetimi, içerik beyanı ve oluşturma için temel kütüphane
- **@intlayer/sync-json-plugin**: Intlayer içerik beyanlarını next-intl uyumlu JSON formatına aktarmak için eklenti

### Adım 2: JSON'u sarmak için Intlayer eklentisini uygulayın

Desteklenen yerellerinizi tanımlamak için bir Intlayer yapılandırma dosyası oluşturun:

**Eğer next-intl için JSON sözlüklerini de dışa aktarmak istiyorsanız**, `syncJSON` eklentisini ekleyin:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON` eklentisi JSON'u otomatik olarak sarar. İçerik mimarisini değiştirmeden JSON dosyalarını okur ve yazar.

Eğer JSON dosyalarının intlayer içerik beyan dosyaları (`.content` dosyaları) ile birlikte var olmasını istiyorsanız, Intlayer şu şekilde ilerler:

    1. Hem JSON hem de içerik beyan dosyalarını yükler ve bunları intlayer sözlüğüne dönüştürür.
    2. JSON ile içerik beyan dosyaları arasında çakışma varsa, Intlayer tüm sözlükleri birleştirme işlemi yapacaktır. Bu, eklentilerin önceliğine ve içerik beyan dosyasının önceliğine bağlıdır (tüm ayarlar yapılandırılabilir).

JSON'u çevirmek için CLI kullanılarak veya CMS aracılığıyla değişiklikler yapılırsa, Intlayer JSON dosyasını yeni çevirilerle güncelleyecektir.

`syncJSON` eklentisi hakkında daha fazla ayrıntı için lütfen [syncJSON eklentisi dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) bakınız.

### (İsteğe Bağlı) Adım 3: Bileşen başına JSON çevirilerini uygulama

Varsayılan olarak, Intlayer hem JSON hem de içerik beyan dosyalarını yükler, birleştirir ve senkronize eder. Daha fazla ayrıntı için lütfen [içerik beyan dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın. Ancak isterseniz, Intlayer eklentisi kullanarak, kod tabanınızın herhangi bir yerinde yerelleştirilmiş JSON'un bileşen bazında yönetimini de uygulayabilirsiniz.

Bunun için `loadJSON` eklentisini kullanabilirsiniz.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mevcut JSON dosyalarınızı Intlayer sözlükleri ile senkronize tutun
  plugins: [
    /**
     * src dizininde {key}.i18n.json desenine uyan tüm JSON dosyalarını yükler
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Bu JSON dosyalarının `./locales/en/${key}.json` dosyalarından öncelikli olmasını sağlar
    }),
    /**
     * locales dizinindeki JSON dosyalarını yükler ve çıktı ile çevirileri bu dosyalara geri yazar
     */
    syncJSON({
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Bu, `src` dizininde `{key}.i18n.json` desenine uyan tüm JSON dosyalarını yükleyecek ve bunları Intlayer sözlükleri olarak kullanacaktır.

## Git Yapılandırması

Otomatik oluşturulan Intlayer dosyalarını göz ardı etmeniz önerilir:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları göz ardı et
.intlayer
```

Bu dosyalar, derleme süreciniz sırasında yeniden oluşturulabilir ve sürüm kontrolüne dahil edilmesine gerek yoktur.

### VS Code Eklentisi

Geliştirici deneyimini iyileştirmek için resmi **Intlayer VS Code Eklentisi**ni yükleyin:

[VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
