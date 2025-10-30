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
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSON eklentisine geçiş ve kapsamlı yeniden yazım
---

# next-i18next ve Intlayer ile Next.js Uluslararasılaştırması (i18n)

## İçindekiler

<TOC/>

## next-i18next nedir?

**next-i18next**, Next.js uygulamaları için en popüler uluslararasılaştırma (i18n) çerçevelerinden biridir. Güçlü **i18next** ekosistemi üzerine inşa edilmiştir ve Next.js projelerinde çevirilerin yönetimi, yerelleştirme ve dil değiştirme için kapsamlı bir çözüm sunar.

Ancak, next-i18next bazı zorluklarla birlikte gelir:

- **Karmaşık yapılandırma**: next-i18next kurulumu, birden fazla yapılandırma dosyası gerektirir ve sunucu tarafı ile istemci tarafı i18n örneklerinin dikkatli kurulmasını gerektirir.
- **Dağınık çeviriler**: Çeviri dosyaları genellikle bileşenlerden ayrı dizinlerde saklanır, bu da tutarlılığı korumayı zorlaştırır.
- **Manuel isim alanı yönetimi**: Geliştiricilerin isim alanlarını manuel olarak yönetmesi ve çeviri kaynaklarının doğru şekilde yüklenmesini sağlaması gerekir.
- **Sınırlı tür güvenliği**: TypeScript desteği ek yapılandırma gerektirir ve çeviriler için otomatik tür oluşturma sağlamaz.

## Intlayer Nedir?

**Intlayer**, geleneksel i18n çözümlerinin eksikliklerini gidermek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma kütüphanesidir. Next.js uygulamalarında içerik yönetimine modern bir yaklaşım sunar.

next-intl ile somut bir karşılaştırma için [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/next-i18next_vs_next-intl_vs_intlayer.md) blog yazımıza bakabilirsiniz.

## Neden Intlayer ile next-i18next Birlikte Kullanılır?

Intlayer mükemmel bir bağımsız i18n çözümü sunarken (bkz. [Next.js entegrasyon rehberimiz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md)), birkaç nedenle next-i18next ile birleştirmek isteyebilirsiniz:

1. **Mevcut kod tabanı**: Yerleşik bir next-i18next uygulamanız var ve Intlayer'ın geliştirilmiş geliştirici deneyimine kademeli olarak geçmek istiyorsunuz.
2. **Eski gereksinimler**: Projeniz mevcut i18next eklentileri veya iş akışları ile uyumluluk gerektiriyor.
3. **Ekip aşinalığı**: Ekibiniz next-i18next ile rahat ancak daha iyi içerik yönetimi istiyor.

**Bunun için, Intlayer, CLI veya CI/CD boru hatlarında JSON çevirilerinizi otomatikleştirmeye, çevirilerinizi test etmeye ve daha fazlasına yardımcı olmak için next-i18next için bir adaptör olarak uygulanabilir.**

Bu rehber, Intlayer'ın üstün içerik beyan sistemi avantajlarından yararlanırken next-i18next ile uyumluluğu nasıl koruyacağınızı gösterir.

---

## Intlayer'ı next-i18next ile Kurmak için Adım Adım Rehber

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

**Paket açıklamaları:**

- **intlayer**: İçerik beyanı ve yönetimi için temel kütüphane
- **next-intlayer**: Next.js entegrasyon katmanı ve build eklentileri
- **i18next**: Temel i18n çerçevesi
- **next-i18next**: i18next için Next.js sarmalayıcısı
- **i18next-resources-to-backend**: i18next için dinamik kaynak yükleme
- **@intlayer/sync-json-plugin**: Intlayer içerik beyanlarını i18next JSON formatına senkronize eden eklenti

### Adım 2: JSON'u sarmak için Intlayer eklentisini uygulayın

Desteklediğiniz yerel ayarları tanımlamak için bir Intlayer yapılandırma dosyası oluşturun:

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
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON` eklentisi JSON'u otomatik olarak saracaktır. İçerik mimarisini değiştirmeden JSON dosyalarını okuyup yazar.

Eğer JSON dosyalarının intlayer içerik beyan dosyaları (`.content` dosyaları) ile birlikte var olmasını istiyorsanız, Intlayer şu şekilde ilerleyecektir:

    1. Hem JSON hem de içerik beyan dosyalarını yükler ve bunları bir intlayer sözlüğüne dönüştürür.
    2. JSON ile içerik beyan dosyaları arasında çakışma varsa, Intlayer tüm sözlükleri birleştirme işlemi yapacaktır. Bu işlem, eklentilerin önceliğine ve içerik beyan dosyasının önceliğine bağlıdır (tümü yapılandırılabilir).

CLI kullanılarak JSON çevirisi yapılırsa veya CMS kullanılırsa, Intlayer JSON dosyasını yeni çevirilerle güncelleyecektir.

`syncJSON` eklentisi hakkında daha fazla detay için lütfen [syncJSON eklenti dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) bakınız.

---

## Git Yapılandırması

Oluşturulan dosyaları sürüm kontrolünden hariç tutun:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
intl
```

Bu dosyalar, derleme süreci sırasında otomatik olarak yeniden oluşturulur ve depoza gönderilmesine gerek yoktur.

### VS Code Eklentisi

Geliştirici deneyimini iyileştirmek için resmi **Intlayer VS Code Eklentisi**ni yükleyin:

[VS Code Marketinden Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
