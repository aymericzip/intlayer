---
createdAt: 2026-01-21
updatedAt: 2026-01-21
priority: 5
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
  - version: 9.0.0
    date: 2026-06-25
    changes: "Dışa aktarma dizini güncellendi – proxy ve compiler artık intlayer() içinde birleştirildi; intlayerProxy, intlayerCompiler, intlayerMinify belgeleri eklendi"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Tüm dışa aktarımlar için birleşik dokümantasyon"
author: aymericzip
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

| Function                   | Description                                                                                                                                                                      | Related Doc                                                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`                 | Ana Vite eklentisi. Sözlükleri hazırlar, takma adları yapılandırır, geliştirme sunucusu izleyicilerini başlatır ve (v9'dan beri) proxy ve derleyiciyi paketler.                  | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/intlayer.md)                 |
| `intlayerPlugin`           | (**Kullanımdan kaldırıldı**) `intlayer` için takma ad.                                                                                                                           | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/intlayer.md)                 |
| `intLayerPlugin`           | (**Kullanımdan kaldırıldı**) `intlayer` için takma ad.                                                                                                                           | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/intlayer.md)                 |
| `intlayerProxy`            | Yerel ayar yönlendirme ara yazılımı eklentisi (algılama, yönlendirme, yeniden yazma). v9'dan beri `intlayer()` içine dahil edilmiştir – yalnızca gerekirse ayrı olarak kaydedin. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerMiddleware`       | (**Kullanımdan kaldırıldı**) `intlayerProxy` için takma ad.                                                                                                                      | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/intlayerProxy.md)       |
| `intLayerMiddlewarePlugin` | (**Kullanımdan kaldırıldı**) `intlayerProxy` için takma ad.                                                                                                                      | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerCompiler`         | Bileşenlerden satır içi içerik bildirimlerini çıkarır ve bunları sözlüklere yazar. v9'dan beri `intlayer()` içinde paketlenmiştir.                                               | [intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/intlayerCompiler.md) |
| `intlayerPrune`            | Üretim paketinden kullanılmayan sözlük alanlarını tree-shake yapar.                                                                                                              | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/intlayerPrune.md)       |
| `intlayerMinify`           | Derlenmiş sözlük JSON dosyalarını küçültür ve isteğe bağlı olarak alan adlarını kısaltır.                                                                                        | [intlayerMinify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/intlayerMinify.md)     |

### Utilities

| Export                       | Description                                                                                     | Related Doc                                                                                                            |
| ---------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `createIntlayerProxyHandler` | Framework-agnostic Node.js `(req, res, next)` middleware'i locale-routing logic'i ile döndürür. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/intlayerProxy.md) |

### Türler

| Export                       | Açıklama                                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerPluginOptions`      | `intlayer()` tarafından kabul edilen seçenekler. `GetConfigurationOptions` öğesini `compatCallers` ve `proxy` ile genişletir.         |
| `IntlayerProxyPluginOptions` | `intlayerProxy()` ve `createIntlayerProxyHandler()` tarafından kabul edilen seçenekler. `ignore` ve `configOptions` öğelerini içerir. |
| `IntlayerCompilerOptions`    | `intlayerCompiler()` tarafından kabul edilen seçenekler. `configOptions` ve `compilerConfig` öğelerini içerir.                        |
| `CompatCallerConfig`         | `@intlayer/babel` öğesinden yeniden dışa aktarılan. Alan kullanımı analizi için compat-adapter çağrı deseni tanımlar.                 |
