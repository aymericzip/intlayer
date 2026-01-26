---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: IntlayerProvider Bileşen Dokümantasyonu | solid-intlayer
description: solid-intlayer paketindeki IntlayerProvider bileşeninin nasıl kullanılacağını görün
keywords:
  - IntlayerProvider
  - sağlayıcı
  - Intlayer
  - intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - IntlayerProvider
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# IntlayerProvider Bileşen Dokümantasyonu

`IntlayerProvider`, Solid uygulamanıza uluslararasılaştırma (i18n) bağlamını sağlayan kök bileşendir. Mevcut locale (yerel ayar) durumunu yönetir ve tüm alt bileşenlerin çevirilere erişebilmesini garanti eder.

## Kullanım

```tsx
import { IntlayerProvider } from "solid-intlayer";

const App = () => (
  <IntlayerProvider>
    <MyComponent />
  </IntlayerProvider>
);
```

## Açıklama

`IntlayerProvider` aşağıdaki görevleri yerine getirir:

1. **Durum Yönetimi**: Geçerli yerel ayarı başlatır ve saklar; reaktivite için signals kullanır.
2. **Yerel Ayarın Belirlenmesi**: Başlangıç `locale`'ini çerezler, tarayıcı tercihleri veya varsayılan yapılandırmaya göre belirler.
3. **Bağlam Sağlama**: `locale` ve `setLocale` fonksiyonunu `useIntlayer` veya `useLocale` gibi hook'lar aracılığıyla herhangi bir bileşenin kullanımına sunar.
4. **Kalıcılık**: Kullanıcının tercihlerini oturumlar arasında korumak için `locale` değişikliklerini çerezler veya localStorage ile otomatik olarak senkronize eder.

## Özellikler

- **locale** (isteğe bağlı): Geçerli locale'i manuel olarak ayarlar.
  /// **defaultLocale** (isteğe bağlı): Yapılandırmadaki varsayılan dili geçersiz kılar.
  /// **setLocale** (isteğe bağlı): Özel bir dil ayarlayıcı fonksiyon sağlar.
  /// **disableEditor** (isteğe bağlı): Görsel editör entegrasyonunu devre dışı bırakır.
  /// **isCookieEnabled** (isteğe bağlı): Çerez kalıcılığını etkinleştirir veya devre dışı bırakır.
