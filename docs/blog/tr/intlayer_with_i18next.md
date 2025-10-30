---
createdAt: 2024-12-24
updatedAt: 2025-10-29
title: i18next JSON çevirilerinizi Intlayer ile nasıl otomatikleştirirsiniz
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
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSON eklentisine geçiş
---

# i18next JSON çevirilerinizi Intlayer ile nasıl otomatikleştirirsiniz

## Intlayer nedir?

**Intlayer**, geleneksel i18n çözümlerinin eksikliklerini gidermek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma kütüphanesidir. JavaScript uygulamalarında içerik yönetimine modern bir yaklaşım sunar.

i18next ile somut bir karşılaştırma için [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/next-i18next_vs_next-intl_vs_intlayer.md) blog yazımıza bakabilirsiniz.

## Neden Intlayer'ı i18next ile Birleştirmelisiniz?

Intlayer mükemmel bir bağımsız i18n çözümü sunarken (bakınız [Next.js entegrasyon rehberimiz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md)), birkaç nedenle i18next ile birleştirmek isteyebilirsiniz:

1. **Mevcut kod tabanı**: Yerleşik bir i18next uygulamanız var ve Intlayer'ın geliştirilmiş geliştirici deneyimine kademeli olarak geçmek istiyorsunuz.
2. **Eski gereksinimler**: Projeniz mevcut i18next eklentileri veya iş akışları ile uyumluluk gerektiriyor.
3. **Ekip aşinalığı**: Ekibiniz i18next ile rahat ancak daha iyi içerik yönetimi istiyor.

**Bunun için, Intlayer i18next için bir adaptör olarak uygulanabilir; bu, JSON çevirilerinizi CLI veya CI/CD boru hatlarında otomatikleştirmenize, çevirilerinizi test etmenize ve daha fazlasına yardımcı olur.**

Bu rehber, Intlayer'ın üstün içerik beyan sistemi avantajlarından yararlanırken i18next ile uyumluluğu nasıl koruyacağınızı gösterir.

## İçindekiler

<TOC/>

## Adım Adım Intlayer'ı i18next ile Kurma Rehberi

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

**Paket açıklamaları:**

- **intlayer**: Uluslararasılaştırma yönetimi, içerik beyanı ve derleme için temel kütüphane
- **@intlayer/sync-json-plugin**: Intlayer içerik beyanlarını i18next uyumlu JSON formatına aktarmak için eklenti

### Adım 2: JSON'u sarmak için Intlayer eklentisini uygulayın

Desteklenen yerel ayarları tanımlamak için bir Intlayer yapılandırma dosyası oluşturun:

**Ayrıca i18next için JSON sözlükleri dışa aktarmak istiyorsanız**, `syncJSON` eklentisini ekleyin:

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
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON` eklentisi JSON'u otomatik olarak sarar. İçerik mimarisini değiştirmeden JSON dosyalarını okur ve yazar.

Eğer JSON dosyalarının intlayer içerik beyan dosyaları (`.content` dosyaları) ile birlikte var olmasını istiyorsanız, Intlayer şu şekilde ilerler:

    1. Hem JSON hem de içerik beyan dosyalarını yükler ve bunları intlayer sözlüğüne dönüştürür.
    2. JSON ile içerik beyan dosyaları arasında çakışma varsa, Intlayer tüm sözlükleri birleştirme işlemi yapar. Bu, eklentilerin önceliğine ve içerik beyan dosyasının önceliğine bağlıdır (hepsi yapılandırılabilir).

CLI kullanılarak JSON çevirisi yapılırsa veya CMS kullanılırsa, Intlayer JSON dosyasını yeni çevirilerle günceller.

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

[VS Code Marketplace'ten Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
