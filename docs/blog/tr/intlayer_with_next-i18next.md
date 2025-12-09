---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer ve next-i18next
description: Kapsamlı bir Next.js uluslararasılaştırma çözümü için Intlayer'ı next-i18next ile entegre edin
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Uluslararasılaştırma
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: loadJSON eklentisi eklendi
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSON eklentisine geçiş ve kapsamlı yeniden yazım
---

# next-i18next ve Intlayer ile Next.js Uluslararasılaştırması (i18n)

<iframe title="next-i18next JSON çevirilerinizi Intlayer kullanarak nasıl otomatikleştirirsiniz" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## İçindekiler

<TOC/>

## next-i18next nedir?

**next-i18next**, Next.js uygulamaları için en popüler uluslararasılaştırma (i18n) çerçevelerinden biridir. Güçlü **i18next** ekosistemi üzerine inşa edilmiştir ve Next.js projelerinde çevirilerin yönetimi, yerelleştirme ve dil değiştirme için kapsamlı bir çözüm sunar.

Ancak, next-i18next bazı zorluklarla birlikte gelir:

- **Karmaşık yapılandırma**: next-i18next kurulumu, birden fazla yapılandırma dosyası gerektirir ve sunucu tarafı ile istemci tarafı i18n örneklerinin dikkatli kurulmasını gerektirir.
- **Dağınık çeviriler**: Çeviri dosyaları genellikle bileşenlerden ayrı dizinlerde saklanır, bu da tutarlılığı korumayı zorlaştırır.
- **Manuel isim alanı yönetimi**: Geliştiricilerin isim alanlarını manuel olarak yönetmesi ve çeviri kaynaklarının doğru şekilde yüklenmesini sağlaması gerekir.
  /// **Sınırlı tür güvenliği**: TypeScript desteği ek yapılandırma gerektirir ve çeviriler için otomatik tür oluşturma sağlamaz.

## Intlayer Nedir?

**Intlayer**, geleneksel i18n çözümlerinin eksikliklerini gidermek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma kütüphanesidir. Next.js uygulamalarında içerik yönetimi için modern bir yaklaşım sunar.

next-intl ile somut bir karşılaştırma için [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md) blog yazımıza bakabilirsiniz.

## Neden Intlayer'ı next-i18next ile Birleştirmelisiniz?

Intlayer mükemmel bir bağımsız i18n çözümü sunarken (bkz. [Next.js entegrasyon rehberimiz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md)), birkaç nedenle next-i18next ile birleştirmek isteyebilirsiniz:

1. **Mevcut kod tabanı**: Yerleşik bir next-i18next uygulamanız var ve Intlayer'ın geliştirilmiş geliştirici deneyimine kademeli olarak geçmek istiyorsunuz.
2. **Eski gereksinimler**: Projeniz mevcut i18next eklentileri veya iş akışları ile uyumluluk gerektiriyor.
3. **Ekip aşinalığı**: Ekibiniz next-i18next ile rahat ancak daha iyi içerik yönetimi istiyor.

Bunun için, Intlayer, JSON çevirilerinizi CLI veya CI/CD boru hatlarında otomatikleştirmeye, çevirilerinizi test etmeye ve daha fazlasına yardımcı olmak için next-i18next için bir adaptör olarak uygulanabilir.

Bu rehber, Intlayer'ın üstün içerik beyan sistemi avantajlarından yararlanırken next-i18next ile uyumluluğu nasıl koruyacağınızı gösterir.

---

## Intlayer'ı next-i18next ile Kurmak İçin Adım Adım Rehber

### Adım 1: Bağımlılıkları Yükleyin

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketleri yükleyin:

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

- **intlayer**: İçerik beyanı ve yönetimi için temel kütüphane
- **@intlayer/sync-json-plugin**: Intlayer içerik beyanlarını i18next JSON formatına senkronize etmek için eklenti

### Adım 2: JSON'u sarmak için Intlayer eklentisini uygulayın

Desteklenen yerel ayarları tanımlamak için bir Intlayer yapılandırma dosyası oluşturun:

**Eğer i18next için JSON sözlüklerini de dışa aktarmak istiyorsanız**, `syncJSON` eklentisini ekleyin:

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
typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON` eklentisi JSON'u otomatik olarak saracaktır. İçerik mimarisini değiştirmeden JSON dosyalarını okuyup yazacaktır.

Eğer bu JSON'un intlayer içerik beyan dosyaları (`.content` dosyaları) ile birlikte var olmasını istiyorsanız, Intlayer şu şekilde ilerleyecektir:

    1. Hem JSON hem de içerik beyan dosyalarını yükleyip bunları bir intlayer sözlüğüne dönüştürür.
    2. JSON ile içerik beyan dosyaları arasında çakışma varsa, Intlayer tüm sözlükleri birleştirme işlemi yapar. Bu işlem, eklentilerin önceliğine ve içerik beyan dosyasının önceliğine bağlıdır (tümü yapılandırılabilir).

JSON'i çevirmek için CLI kullanılarak veya CMS kullanılarak değişiklikler yapılırsa, Intlayer yeni çevirilerle JSON dosyasını güncelleyecektir.

`syncJSON` eklentisi hakkında daha fazla ayrıntı için lütfen [syncJSON eklenti dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) bakınız.

---

### (İsteğe Bağlı) Adım 3: Bileşen başına JSON çevirilerini uygulama

Varsayılan olarak, Intlayer hem JSON hem de içerik beyan dosyalarını yükler, birleştirir ve senkronize eder. Daha fazla ayrıntı için [içerik beyan dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakınız. Ancak isterseniz, Intlayer eklentisi kullanarak, kod tabanınızın herhangi bir yerinde yerelleştirilmiş JSON'un bileşen bazında yönetimini de uygulayabilirsiniz.

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
     * src içindeki ve {key}.i18n.json desenine uyan tüm JSON dosyalarını yükler
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Bu JSON dosyalarının `./public/locales/en/${key}.json` dosyalarından öncelikli olmasını sağlar
    }),
    /**
     * Yerel dizindeki JSON dosyalarına çıktıyı ve çevirileri geri yazacak ve yükleyecek
     */
    syncJSON({
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Bu, `src` dizinindeki `{key}.i18n.json` desenine uyan tüm JSON dosyalarını yükleyecek ve bunları Intlayer sözlükleri olarak kullanacaktır.

---

## Git Yapılandırması

Oluşturulan dosyaları sürüm kontrolünden hariç tutun:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

Bu dosyalar derleme sürecinde otomatik olarak yeniden oluşturulur ve depoza gönderilmesine gerek yoktur.

### VS Code Eklentisi

Geliştirici deneyimini iyileştirmek için resmi **Intlayer VS Code Uzantısı**nı yükleyin:

[VS Code Marketinden Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
