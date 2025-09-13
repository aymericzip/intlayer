---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: @intlayer/webpack - Intlayer i18n için Webpack Eklentisi
description: Intlayer uluslararasılaştırmasının Webpack tabanlı uygulamalarla sorunsuz entegrasyonu için Webpack yapılandırması ve eklentisi sağlayan NPM paketi.
keywords:
  - intlayer
  - webpack
  - plugin
  - configuration
  - i18n
  - JavaScript
  - NPM
  - bundler
slugs:
  - doc
  - package
  - @intlayer_webpack
---

# @intlayer/webpack: Uygulamanızda Intlayer Webpack Eklentisini kullanmak için NPM Paketi

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir paket paketidir. React, Next.js ve Express.js gibi çerçevelerle uyumludur.

**`@intlayer/webpack`** paketi, Webpack tabanlı bir uygulamayı Intlayer ile çalışır hale getirmek için bir Webpack yapılandırması sağlamak için kullanılır. Paket ayrıca mevcut bir Webpack uygulamasına eklenecek bir eklenti sağlar.

## Kullanım

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
      // Seçenekler
    }),
  ],
};
```

## Kurulum

Gerekli paketi tercih ettiğiniz paket yöneticisi kullanarak yükleyin:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |
