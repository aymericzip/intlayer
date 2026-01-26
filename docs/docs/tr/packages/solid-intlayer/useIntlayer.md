---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: useIntlayer Hook Dokümantasyonu | solid-intlayer
description: solid-intlayer paketi için useIntlayer hook'unun nasıl kullanılacağını görün
keywords:
  - useIntlayer
  - sözlük
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
  - useIntlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# useIntlayer Hook Dokümantasyonu

`useIntlayer` hook'u, anahtarı kullanarak bir sözlükten yerelleştirilmiş içeriği almanıza olanak tanır. Solid'de bu hook, locale değiştiğinde otomatik olarak güncellenen reaktif bir **accessor** fonksiyonu döner.

## Kullanım

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my_dictionary_key");

  return (
    <div>
      <h1>{content().title}</h1>
      <p>{content().description}</p>
    </div>
  );
};
```

## Açıklama

Hook şu görevleri yerine getirir:

1. **Locale Detection**: `IntlayerProvider` bağlamındaki mevcut locale'i kullanır.
2. **Dictionary Injection**: Sağlanan anahtara karşılık gelen sözlüğün içeriğini, Intlayer derleyicisi tarafından oluşturulan optimize edilmiş bildirimleri kullanarak otomatik olarak enjekte eder.
3. **Reactivity**: Global locale durumu değiştiğinde otomatik olarak yeniden değerlendiren bir Solid accessor (`Accessor<T>`) döner.
4. **Çeviri İşleme**: tespit edilen locale'e göre içeriği çözer, sözlükte bulunan `t()`, `enu()`, vb. tanımları işler.

## Parametreler

- **key**: İçerik bildirim dosyalarınızda tanımlandığı şekilde, sözlüğün benzersiz anahtarı.
- **locale** (isteğe bağlı): Geçerli locale'i geçersiz kılar.

## Döndürür

Yerelleştirilmiş içeriği döndüren bir accessor fonksiyonu (`() => Content`).
