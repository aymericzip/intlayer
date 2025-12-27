---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer ve vue-i18n
description: Kapsamlı bir Vue.js uluslararasılaştırma çözümü için Intlayer'ı vue-i18n ile entegre edin
keywords:
  - vue-i18n
  - Intlayer
  - Uluslararasılaştırma
  - Blog
  - Vue.js
  - Nuxt
  - JavaScript
  - Vue
slugs:
  - blog
  - intlayer-with-vue-i18n
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: loadJSON eklentisi eklendi
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSON eklentisine geçiş ve kapsamlı yeniden yazım
---

# vue-i18n ve Intlayer ile Vue.js Uluslararasılaştırması (i18n)

<iframe title="vue-i18n JSON çevirilerinizi Intlayer kullanarak nasıl otomatikleştirirsiniz" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## İçindekiler

<TOC/>

## Intlayer Nedir?

**Intlayer**, geleneksel i18n çözümlerinin eksikliklerini gidermek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma kütüphanesidir. Vue.js ve Nuxt uygulamalarında içerik yönetimine modern bir yaklaşım sunar.

Vue-i18n ile somut bir karşılaştırma için [vue-i18n vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/vue-i18n_vs_intlayer.md) blog yazımıza bakabilirsiniz.

## Neden Intlayer'ı vue-i18n ile Birleştirmelisiniz?

Intlayer mükemmel bir bağımsız i18n çözümü sunarken (bkz. [Vue.js entegrasyon rehberimiz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+vue.md)), onu vue-i18n ile birleştirmek isteyebileceğiniz birkaç neden olabilir:

1. **Mevcut kod tabanı**: Yerleşik bir vue-i18n uygulamanız var ve Intlayer'ın geliştirilmiş geliştirici deneyimine kademeli olarak geçmek istiyorsunuz.
2. **Eski gereksinimler**: Projeniz mevcut vue-i18n eklentileri veya iş akışları ile uyumluluk gerektiriyor.
3. **Ekip aşinalığı**: Ekibiniz vue-i18n ile rahat ancak daha iyi içerik yönetimi istiyor.
4. **Intlayer özelliklerini kullanma**: İçerik beyanı, çeviri otomasyonu, çevirilerin test edilmesi ve daha fazlası gibi Intlayer özelliklerini kullanmak istiyorsunuz.

**Bunun için, Intlayer vue-i18n için bir adaptör olarak uygulanabilir; bu, JSON çevirilerinizi CLI veya CI/CD boru hatlarında otomatikleştirmenize, çevirilerinizi test etmenize ve daha fazlasına yardımcı olur.**

Bu rehber, Intlayer'ın üstün içerik beyan sistemi avantajlarından yararlanırken vue-i18n ile uyumluluğu nasıl koruyacağınızı gösterir.

---

## Intlayer'ı vue-i18n ile Kurmak İçin Adım Adım Rehber

### Adım 1: Bağımlılıkları Yükleyin

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketleri yükleyin:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
```

**Paket açıklamaları:**

- **intlayer**: İçerik beyanı ve yönetimi için temel kütüphane
- **@intlayer/sync-json-plugin**: Intlayer içerik beyanlarını vue-i18n JSON formatına senkronize etmek için eklenti

### Adım 2: JSON'u sarmak için Intlayer eklentisini uygulayın

Desteklenen yerel ayarları tanımlamak için bir Intlayer yapılandırma dosyası oluşturun:

**Eğer ayrıca vue-i18n için JSON sözlükleri dışa aktarmak istiyorsanız**, `syncJSON` eklentisini ekleyin:

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
      format: "vue-i18n",
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON` eklentisi JSON'u otomatik olarak sarar. İçerik mimarisini değiştirmeden JSON dosyalarını okur ve yazar.

Eğer JSON'un intlayer içerik beyan dosyaları (`.content` dosyaları) ile birlikte var olmasını istiyorsanız, Intlayer şu şekilde ilerler:

    1. Hem JSON hem de içerik beyan dosyalarını yükler ve bunları bir intlayer sözlüğüne dönüştürür.
    2. JSON ile içerik beyan dosyaları arasında çakışma varsa, Intlayer tüm sözlükleri birleştirir. Bu işlem, eklentilerin ve içerik beyan dosyasının önceliklerine bağlıdır (tümü yapılandırılabilir).

CLI kullanılarak JSON'un çevrilmesi için değişiklik yapılırsa veya CMS kullanılırsa, Intlayer JSON dosyasını yeni çevirilerle günceller.

`syncJSON` eklentisi hakkında daha fazla detay görmek için lütfen [syncJSON eklenti dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) bakınız.

---

### (İsteğe Bağlı) Adım 3: Bileşen başına JSON çevirilerini uygulama

Varsayılan olarak, Intlayer hem JSON hem de içerik beyan dosyalarını yükler, birleştirir ve senkronize eder. Daha fazla detay için [içerik beyan dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakabilirsiniz. Ancak isterseniz, Intlayer eklentisi kullanarak kod tabanınızda herhangi bir yerde yerelleştirilmiş JSON'un bileşen bazında yönetimini de uygulayabilirsiniz.

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
     * src içindeki, {key}.i18n.json desenine uyan tüm JSON dosyalarını yükler
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
      format: "vue-i18n",
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Bu, `src` dizinindeki `{key}.i18n.json` desenine uyan tüm JSON dosyalarını yükler ve bunları Intlayer sözlükleri olarak kullanır.

---

## Git Yapılandırması

Oluşturulan dosyaları sürüm kontrolünden hariç tutun:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

Bu dosyalar derleme sürecinde otomatik olarak yeniden oluşturulur ve depoza gönderilmesine gerek yoktur.

### VS Code Eklentisi

Geliştirici deneyimini iyileştirmek için resmi **Intlayer VS Code Eklentisi**ni yükleyin:

[VS Code Marketplace'ten Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

[VS Code Marketinden Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
