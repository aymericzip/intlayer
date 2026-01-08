---
createdAt: 2024-12-24
updatedAt: 2025-11-01
title: i18next JSON çevirilerinizi Intlayer kullanarak nasıl otomatikleştirirsiniz
description: JavaScript uygulamalarında gelişmiş uluslararasılaştırma için Intlayer ve i18next ile JSON çevirilerinizi otomatikleştirin.
keywords:
  - Intlayer
  - i18next
  - Uluslararasılaştırma
  - i18n
  - Yerelleştirme
  - Çeviri
  - React
  - Next.js
  - JavaScript
  - TypeScript
  - Geçiş
  - Entegrasyon
slugs:
  - blog
  - intlayer-with-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: loadJSON eklentisi eklendi
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSON eklentisine geçildi
---

# i18next JSON çevirilerinizi Intlayer kullanarak nasıl otomatikleştirirsiniz

<iframe title="i18next JSON çevirilerinizi Intlayer kullanarak nasıl otomatikleştirirsiniz" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Intlayer nedir?

**Intlayer**, geleneksel i18n çözümlerinin eksikliklerini gidermek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma kütüphanesidir. JavaScript uygulamalarında içerik yönetimi için modern bir yaklaşım sunar.

i18next ile somut bir karşılaştırma için [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/next-i18next_vs_next-intl_vs_intlayer.md) blog yazımıza bakabilirsiniz.

## Neden Intlayer'ı i18next ile Birleştirmelisiniz?

Intlayer mükemmel bir bağımsız i18n çözümü sunarken (bakınız [Next.js entegrasyon rehberimiz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md)), aşağıdaki nedenlerle i18next ile birleştirmek isteyebilirsiniz:

1. **Mevcut kod tabanı**: Yerleşik bir i18next uygulamanız var ve Intlayer'ın geliştirilmiş geliştirici deneyimine kademeli olarak geçmek istiyorsunuz.
2. **Eski gereksinimler**: Projeniz mevcut i18next eklentileri veya iş akışları ile uyumluluk gerektiriyor.
3. **Ekip aşinalığı**: Ekibiniz i18next ile rahat ancak daha iyi içerik yönetimi istiyor.
4. **Intlayer özelliklerini kullanmak**: İçerik beyanı, çeviri anahtarlarının yönetimi, çeviri durumu ve daha fazlası gibi Intlayer özelliklerini kullanmak istiyorsunuz.

**Bunun için, Intlayer, JSON çevirilerinizi CLI veya CI/CD boru hatlarında otomatikleştirmeye, çevirilerinizi test etmeye ve daha fazlasına yardımcı olmak amacıyla i18next için bir adaptör olarak uygulanabilir.**

Bu rehber, Intlayer'ın üstün içerik beyan sistemi avantajlarından yararlanırken i18next ile uyumluluğu nasıl koruyacağınızı gösterir.

## İçindekiler

<TOC/>

## Intlayer'ı i18next ile Kurmak için Adım Adım Rehber

### Adım 1: Bağımlılıkları Yükleyin

Gerekli paketleri yükleyin:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

**Paket açıklamaları:**

- **intlayer**: Uluslararasılaştırma yönetimi, içerik beyanı ve derleme için temel kütüphane
- **@intlayer/sync-json-plugin**: Intlayer içerik beyanlarını i18next uyumlu JSON formatına aktarmak için eklenti

### Adım 2: JSON'u sarmak için Intlayer eklentisini uygulayın

Desteklenen yerel ayarları tanımlamak için bir Intlayer yapılandırma dosyası oluşturun:

**Ayrıca i18next için JSON sözlüklerini dışa aktarmak istiyorsanız**, `syncJSON` eklentisini ekleyin:

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
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON` eklentisi JSON'u otomatik olarak sarar. İçerik mimarisini değiştirmeden JSON dosyalarını okur ve yazar.

Eğer bu JSON dosyalarının intlayer içerik beyan dosyaları (`.content` dosyaları) ile birlikte var olmasını istiyorsanız, Intlayer şu şekilde ilerler:

1. Hem JSON hem de içerik beyan dosyalarını yükler ve bunları bir intlayer sözlüğüne dönüştürür.
2. JSON ile içerik beyan dosyaları arasında çakışma varsa, Intlayer tüm sözlükleri birleştirir. Bu işlem, eklentilerin ve içerik beyan dosyasının önceliklerine bağlıdır (tüm öncelikler yapılandırılabilir).

JSON'u çevirmek için CLI veya CMS kullanılarak değişiklik yapılırsa, Intlayer JSON dosyasını yeni çevirilerle günceller.

`syncJSON` eklentisi hakkında daha fazla detay görmek için lütfen [syncJSON eklenti dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) bakınız.

### (İsteğe Bağlı) Adım 3: Bileşen başına JSON çevirilerini uygulama

Varsayılan olarak, Intlayer hem JSON hem de içerik beyan dosyalarını yükler, birleştirir ve senkronize eder. Daha fazla detay için [içerik beyan dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakabilirsiniz. Ancak isterseniz, bir Intlayer eklentisi kullanarak, kod tabanınızın herhangi bir yerinde yerelleştirilmiş JSON’un bileşen başına yönetimini de uygulayabilirsiniz.

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
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Bu, `src` dizininde `{key}.i18n.json` desenine uyan tüm JSON dosyalarını yükleyecek ve bunları Intlayer sözlükleri olarak kullanacaktır.

---

## Git Yapılandırması

Otomatik oluşturulan Intlayer dosyalarını görmezden gelmeniz önerilir:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları görmezden gel
.intlayer
```

Bu dosyalar derleme süreciniz sırasında yeniden oluşturulabilir ve sürüm kontrolüne dahil edilmesi gerekmez.

### VS Code Eklentisi

Geliştirici deneyimini iyileştirmek için resmi **Intlayer VS Code Eklentisi**ni yükleyin:

[VS Code Marketplace'ten Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
