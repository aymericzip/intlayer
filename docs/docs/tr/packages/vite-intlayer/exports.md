---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: vite-intlayer Paket Dokümantasyonu
description: Intlayer için Vite eklentisi, sözlük alias'ları ve watcher'lar sağlar.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Tüm dışa aktarımlar için birleşik dokümantasyon
---

# vite-intlayer Paketi

`vite-intlayer` paketi, Intlayer'ı Vite tabanlı uygulamanıza entegre etmek için bir Vite eklentisi sağlar.

## Kurulum

```bash
npm install vite-intlayer
```

## Dışa Aktarımlar

### Eklenti

İçe Aktarma:

```tsx
import "vite-intlayer";
```

| Function             | Description                                                                           | Related Doc                                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `intlayer`           | Intlayer'ı build sürecine entegre eden ana Vite eklentisi.                            | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/intlayer.md)           |
| `intlayerPlugin`     | (**Kullanımdan Kaldırıldı**) `intlayer` için takma ad.                                | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/intlayer.md)           |
| `intlayerProxy`      | Yerel tespiti ve yönlendirmeyi işlemek için geliştirme middleware eklentisi.          | -                                                                                                                      |
| `intlayerMiddleware` | (**Kullanımdan Kaldırıldı**) `intlayerProxy` için takma ad.                           | -                                                                                                                      |
| `intlayerPrune`      | Derleme sırasında kullanılmayan sözlükleri tree-shake yapmak ve budamak için eklenti. | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/intlayerPrune.md) |
