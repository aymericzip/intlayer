---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: React-intl JSON çevirilerinizi Intlayer kullanarak nasıl otomatikleştirirsiniz
description: React uygulamalarında gelişmiş uluslararasılaştırma için Intlayer ve react-intl ile JSON çevirilerinizi otomatikleştirin.
keywords:
  - react-intl
  - Intlayer
  - Uluslararasılaştırma
  - Blog
  - i18n
  - JavaScript
  - React
  - FormatJS
slugs:
  - blog
  - intlayer-with-react-intl
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: loadJSON eklentisi eklendi
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSON eklentisine geçildi
---

# React-intl JSON çevirilerinizi Intlayer kullanarak nasıl otomatikleştirirsiniz

## İçindekiler

<TOC/>

## Intlayer Nedir?

**Intlayer**, geleneksel i18n çözümlerinin eksikliklerini gidermek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma kütüphanesidir. React uygulamalarında içerik yönetimine modern bir yaklaşım sunar.

react-intl ile somut bir karşılaştırma için [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/react-i18next_vs_react-intl_vs_intlayer.md) blog yazımıza bakabilirsiniz.

## Neden Intlayer'ı react-intl ile Birleştirmelisiniz?

Intlayer mükemmel bir bağımsız i18n çözümü sunarken (bkz. [React entegrasyon rehberimiz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+react.md)), react-intl ile birleştirmek isteyebileceğiniz birkaç neden olabilir:

1. **Mevcut kod tabanı**: Yerleşik bir react-intl uygulamanız var ve Intlayer'ın geliştirilmiş geliştirici deneyimine kademeli olarak geçmek istiyorsunuz.
2. **Eski gereksinimler**: Projeniz mevcut react-intl eklentileri veya iş akışları ile uyumluluk gerektiriyor.
3. **Ekip aşinalığı**: Ekibiniz react-intl ile rahat ancak daha iyi içerik yönetimi istiyor.
4. **Intlayer özelliklerini kullanma**: İçerik beyanı, çeviri otomasyonu, çevirilerin test edilmesi ve daha fazlası gibi Intlayer özelliklerini kullanmak istiyorsunuz.

**Bunun için, Intlayer react-intl için bir adaptör olarak uygulanabilir; böylece JSON çevirilerinizi CLI veya CI/CD boru hatlarında otomatikleştirebilir, çevirilerinizi test edebilir ve daha fazlasını yapabilirsiniz.**

Bu rehber, react-intl ile uyumluluğu korurken Intlayer'ın üstün içerik beyan sistemi nasıl kullanılacağını gösterir.

## Intlayer'ı react-intl ile Kurmak için Adım Adım Rehber

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

- **intlayer**: Uluslararasılaştırma yönetimi, içerik beyanı ve derleme için temel kütüphane
- **@intlayer/sync-json-plugin**: Intlayer içerik beyanlarını react-intl uyumlu JSON formatına aktarmak için eklenti

### Adım 2: JSON'u sarmak için Intlayer eklentisini uygulayın

Desteklenen yerel ayarları tanımlamak için bir Intlayer yapılandırma dosyası oluşturun:

**Eğer react-intl için JSON sözlüklerini de dışa aktarmak istiyorsanız**, `syncJSON` eklentisini ekleyin:

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
      format: "icu",
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON` eklentisi JSON'u otomatik olarak saracaktır. İçerik mimarisini değiştirmeden JSON dosyalarını okuyup yazacaktır.

Eğer bu JSON'un intlayer içerik beyan dosyaları (`.content` dosyaları) ile birlikte var olmasını istiyorsanız, Intlayer şu şekilde ilerleyecektir:

    1. Hem JSON hem de içerik beyan dosyalarını yükler ve bunları bir intlayer sözlüğüne dönüştürür.
    2. JSON ile içerik beyan dosyaları arasında çakışma varsa, Intlayer tüm sözlükleri birleştirme işlemi yapar. Bu işlem, eklentilerin önceliğine ve içerik beyan dosyasının önceliğine bağlıdır (hepsi yapılandırılabilir).

CLI kullanılarak JSON'un çevirisi yapılırsa veya CMS kullanılırsa, Intlayer JSON dosyasını yeni çevirilerle güncelleyecektir.

`syncJSON` eklentisi hakkında daha fazla ayrıntı için lütfen [syncJSON eklenti dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) bakınız.

### (İsteğe Bağlı) Adım 3: Bileşen başına JSON çevirilerini uygulama

Varsayılan olarak, Intlayer hem JSON hem de içerik beyan dosyalarını yükler, birleştirir ve senkronize eder. Daha fazla bilgi için [içerik beyan dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakabilirsiniz. Ancak isterseniz, Intlayer eklentisi kullanarak kod tabanınızda herhangi bir yerde yerelleştirilmiş JSON'un bileşen bazında yönetimini de uygulayabilirsiniz.

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
     * src içindeki {key}.i18n.json desenine uyan tüm JSON dosyalarını yükler
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Bu JSON dosyalarının `./locales/en/${key}.json` dosyalarından öncelikli olmasını sağlar
    }),
    /**
     * locales dizinindeki JSON dosyalarını yükler ve çıktı ile çevirileri geri yazar
     */
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Bu, `src` dizininde `{key}.i18n.json` desenine uyan tüm JSON dosyalarını yükler ve bunları Intlayer sözlükleri olarak kullanır.

## Git Yapılandırması

Otomatik oluşturulan Intlayer dosyalarını göz ardı etmek önerilir:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları göz ardı et
.intlayer
```

Bu dosyalar derleme süreciniz sırasında yeniden oluşturulabilir ve sürüm kontrolüne dahil edilmesi gerekmez.

### VS Code Eklentisi

Geliştirici deneyimini iyileştirmek için resmi **Intlayer VS Code Eklentisi**ni yükleyin:

[VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
