---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: @intlayer/chokidar - Intlayer i18n için Dosya İzleme
description: Intlayer için dosya izleme yetenekleri sağlayan NPM paketi, uluslararasılaştırma içeriği için otomatik güncellemeler ve sıcak yeniden yükleme sağlar.
keywords:
  - intlayer
  - chokidar
  - file watching
  - hot reload
  - i18n
  - JavaScript
  - NPM
  - development
slugs:
  - doc
  - package
  - @intlayer_chokidar
---

# @intlayer/chokidar: Intlayer bildirim dosyalarını sözlüklere taramak ve oluşturmak için NPM Paketi

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir paket paketidir. React, Next.js ve Express.js gibi çerçevelerle uyumludur.

**`@intlayer/chokidar`** paketi, [chokidar](https://github.com/paulmillr/chokidar) kullanarak Intlayer bildirim dosyalarını sözlüklere taramak ve oluşturmak için kullanılır ve [Intlayer yapılandırmasına](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) göre.

## Kullanım

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Intlayer sözlüklerini oluştur

watch({ persistent: true }); // Yapılandırma dosyalarındaki değişiklikleri izle
```

## Kurulum

Gerekli paketi tercih ettiğiniz paket yöneticisi kullanarak yükleyin:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |
