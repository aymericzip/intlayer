---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Paket Dokümantasyonu | vite-intlayer
description: vite-intlayer paketinin nasıl kullanılacağını görün
keywords:
  - Intlayer
  - vite-intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - vite-intlayer
---

# vite-intlayer: Vite uygulamasını uluslararasılaştırmak (i18n) için NPM Paketi

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir paket paketidir. React, React ve Express.js gibi çerçevelerle uyumludur.

**`vite-intlayer` paketi**, Vite uygulamanızı uluslararasılaştırmanızı sağlar. Yapılandırmayı ortam değişkenleri aracılığıyla [Vite bundler](https://vitejs.dev/guide/why.html#why-bundle-for-production)'a ayarlamak için Vite eklentisini içerir. Ayrıca, kullanıcının tercih ettiği yerel ayarı algılamak ve [yapılandırmada](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) belirtildiği gibi kullanıcıyı uygun URL'ye yönlendirmek için ara yazılım sağlar.

## Neden Vite Uygulamanızı Uluslararasılaştırasınız?

Vite uygulamanızı uluslararasılaştırmak, küresel bir kitleye etkili bir şekilde hizmet etmek için gereklidir. Uygulamanızın her kullanıcının tercih ettiği dilde içerik ve mesajlar sunmasına izin verir. Bu yetenek, kullanıcı deneyimini geliştirir ve uygulamanızın farklı dilsel geçmişlere sahip insanlara daha erişilebilir ve ilgili hale getirerek erişimini genişletir.

## Yapılandırma

`vite-intlayer` paketi, [`react-intlayer` paketi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/index.md) ve [`intlayer` paketi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/index.md) ile sorunsuz çalışır. Daha fazla bilgi için ilgili dokümantasyona bakın.

## Kurulum

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketi yükleyin:

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## Kullanım Örneği

Eklentileri vite yapılandırmanıza nasıl dahil edeceğinize dair bir örnek görün.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intlayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intlayerMiddlewarePlugin()],
});
```

> `intlayerPlugin()` Vite eklentisi, Intlayer'ı Vite ile entegre etmek için kullanılır. İçerik bildirim dosyalarının oluşturulmasını sağlar ve geliştirme modunda onları izler. Vite uygulamasında Intlayer ortam değişkenlerini tanımlar. Ek olarak, performansı optimize etmek için takma adlar sağlar.

> `intlayerMiddlewarePlugin()` uygulamanıza sunucu tarafı yönlendirme ekler. Bu eklenti, URL'ye göre mevcut yerel ayarı otomatik olarak algılayacak ve uygun yerel ayar çerezini ayarlayacaktır. Yerel ayar belirtilmezse, eklenti kullanıcının tarayıcı dil tercihlerine göre en uygun yerel ayarı belirleyecektir. Yerel ayar algılanmazsa, varsayılan yerel ayara yönlendirecektir.

## Vite uygulamanızın uluslararasılaştırmasını ustalaşın

Intlayer, Vite uygulamanızı uluslararasılaştırmanıza yardımcı olacak birçok özellik sağlar.

**Bu özellikler hakkında daha fazla bilgi için [React Internationalization (i18n) with Intlayer and Vite and React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md) kılavuzuna Vite ve React uygulaması için bakın.**

## Dokümantasyon Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |

```

```
