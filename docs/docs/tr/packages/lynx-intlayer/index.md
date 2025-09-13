---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Package Documentation | lynx-intlayer
description: See how to use the lynx-intlayer package
keywords:
  - Intlayer
  - lynx-intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - lynx-intlayer
---

# lynx-intlayer: Bir Lynx uygulamasını uluslararasılaştırın (i18n)

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir paket paketidir. React, React ve Express.js gibi çerçevelerle uyumludur.

**`lynx-intlayer` paketi**, Vite uygulamanızı uluslararasılaştırmanıza izin verir. Yapılandırmayı ortam değişkenleri aracılığıyla [Lynx bundler](https://lynxjs.org/index.html)'a ayarlamak için Metro eklentisini içerir.

## Neden Lynx Uygulamanızı Uluslararasılaştırasınız?

Lynx uygulamanızı uluslararasılaştırmak, küresel bir kitleye etkili bir şekilde hizmet etmek için gereklidir. Uygulamanızın her kullanıcının tercih ettiği dilde içerik ve mesajlar sunmasına izin verir. Bu yetenek, kullanıcı deneyimini geliştirir ve uygulamanızın farklı dilsel geçmişlere sahip insanlara daha erişilebilir ve ilgili hale getirerek erişimini genişletir.

## Yapılandırma

`lynx-intlayer` paketi, [`react-intlayer` paketi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/index.md) ve [`intlayer` paketi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/index.md) ile sorunsuz çalışır. Daha fazla bilgi için ilgili dokümantasyona bakın.

## Kurulum

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketi yükleyin:

```bash packageManager="npm"
npm install lynx-intlayer
```

```bash packageManager="yarn"
yarn add lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add lynx-intlayer
```

## Kullanım Örneği

Eklentilerin vite yapılandırmanıza nasıl dahil edileceğine dair bir örnek görün.

```ts
// lynx.config.ts
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... diğer eklentiler
    pluginIntlayerLynx(),
  ],
});
```

## Vite uygulamanızın uluslararasılaştırmasını ustalaşın

Intlayer, Vite uygulamanızı uluslararasılaştırmanıza yardımcı olacak birçok özellik sağlar.

**Bu özellikler hakkında daha fazla bilgi edinmek için, Lynx Uygulaması için [React Internationalization (i18n) with Intlayer and Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_lynx+react.md) kılavuzuna bakın.**

## Intlayer Hakkında Okuyun

- [Intlayer Website](https://intlayer.org)
- [Intlayer Documentation](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [Sorularınızı akıllı dokümantasyonumuza sorun](https://intlayer.org/doc/chat)

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |
