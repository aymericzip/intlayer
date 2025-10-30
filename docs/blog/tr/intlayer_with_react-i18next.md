---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Intlayer kullanarak react-i18next JSON çevirilerinizi nasıl otomatikleştirirsiniz
description: React uygulamalarında gelişmiş uluslararasılaştırma için Intlayer ve react-i18next ile JSON çevirilerinizi otomatikleştirin.
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - Uluslararasılaştırma
  - i18n
  - Blog
  - React
  - JavaScript
  - TypeScript
  - İçerik Yönetimi
slugs:
  - blog
  - intlayer-with-react-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSON eklentisine geçiş
---

# Intlayer kullanarak react-i18next JSON çevirilerinizi nasıl otomatikleştirirsiniz

## Intlayer nedir?

**Intlayer**, geleneksel i18n çözümlerinin eksikliklerini gidermek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma kütüphanesidir. React uygulamalarında içerik yönetimine modern bir yaklaşım sunar.

react-i18next ile somut bir karşılaştırma için [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/react-i18next_vs_react-intl_vs_intlayer.md) blog yazımıza bakabilirsiniz.

## Neden Intlayer'ı react-i18next ile Birleştirmelisiniz?

Intlayer mükemmel bir bağımsız i18n çözümü sunarken (bakınız [React entegrasyon rehberimiz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md)), react-i18next ile birkaç nedenle birleştirmek isteyebilirsiniz:

1. **Mevcut kod tabanı**: Yerleşik bir react-i18next uygulamanız var ve Intlayer'ın geliştirilmiş geliştirici deneyimine kademeli olarak geçmek istiyorsunuz.
2. **Eski gereksinimler**: Projeniz mevcut react-i18next eklentileri veya iş akışları ile uyumluluk gerektiriyor.
3. **Ekip aşinalığı**: Ekibiniz react-i18next ile rahat ancak daha iyi içerik yönetimi istiyor.

**Bunun için, Intlayer react-i18next için bir adaptör olarak uygulanabilir; bu sayede JSON çevirilerinizi CLI veya CI/CD boru hatlarında otomatikleştirebilir, çevirilerinizi test edebilir ve daha fazlasını yapabilirsiniz.**

Bu rehber, Intlayer'ın üstün içerik beyan sistemi avantajlarından yararlanırken react-i18next ile uyumluluğu nasıl koruyacağınızı gösterir.

## İçindekiler

<TOC/>

## Intlayer'ı react-i18next ile Kurmak İçin Adım Adım Rehber

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
- **@intlayer/sync-json-plugin**: Intlayer içerik beyanlarını react-i18next uyumlu JSON formatına dışa aktarmak için eklenti

### Adım 2: JSON'u sarmak için Intlayer eklentisini uygulayın

Desteklediğiniz yerel ayarları tanımlamak için bir Intlayer yapılandırma dosyası oluşturun:

**Eğer react-i18next için JSON sözlüklerini de dışa aktarmak istiyorsanız**, `syncJSON` eklentisini ekleyin:

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

Eğer JSON'un intlayer içerik beyan dosyaları (`.content` dosyaları) ile birlikte var olmasını isterseniz, Intlayer şu şekilde ilerler:

    1. Hem JSON hem de içerik beyan dosyalarını yükler ve bunları bir intlayer sözlüğüne dönüştürür.
    2. JSON ile içerik beyan dosyaları arasında çakışma varsa, Intlayer tüm sözlükleri birleştirme işlemini gerçekleştirir. Bu, eklentilerin önceliğine ve içerik beyan dosyasının önceliğine bağlıdır (tümü yapılandırılabilir).

JSON'u çevirmek için CLI kullanılarak veya CMS aracılığıyla değişiklikler yapılırsa, Intlayer JSON dosyasını yeni çevirilerle günceller.

`syncJSON` eklentisi hakkında daha fazla ayrıntı için lütfen [syncJSON eklentisi dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) bakınız.

## Git Yapılandırması

Otomatik oluşturulan Intlayer dosyalarını göz ardı etmek önerilir:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

Bu dosyalar, derleme süreciniz sırasında yeniden oluşturulabilir ve sürüm kontrolüne dahil edilmesi gerekmez.

### VS Code Eklentisi

Geliştirici deneyimini iyileştirmek için resmi **Intlayer VS Code Eklentisi**ni yükleyin:

[VS Code Marketinden yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
