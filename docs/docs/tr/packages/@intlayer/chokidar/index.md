---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: @intlayer/chokidar - File Watching for Intlayer i18n
description: NPM package providing file watching capabilities for Intlayer, enabling automatic updates and hot reloading for internationalization content.
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

# @intlayer/chokidar: Intlayer beyan dosyalarını sözlüklere taramak ve oluşturmak için NPM Paketi

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir paket paketidir. React, React ve Express.js gibi çerçevelerle uyumludur.

**`@intlayer/chokidar`** paketi, [chokidar](https://github.com/paulmillr/chokidar) kullanarak Intlayer beyan dosyalarını taramak ve sözlüklere oluşturmak için kullanılır ve [Intlayer yapılandırmasına](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) göre yapılır.

## Kullanım

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Intlayer sözlüklerini oluştur

watch({ persistent: true }); // Yapılandırma dosyalarındaki değişiklikleri izle
```

## Kurulum

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketi yükleyin:

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
