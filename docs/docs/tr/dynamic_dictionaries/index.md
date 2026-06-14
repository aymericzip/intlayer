---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Dinamik Sözlükler
description: Esnek, çalışma zamanı odaklı i18n içeriği oluşturmak için Intlayer'ın üç dinamik sözlük özelliğine — koleksiyonlar, varyantlar ve dinamik kayıtlar — genel bakış.
keywords:
  - Dinamik Sözlükler
  - Koleksiyonlar
  - Varyantlar
  - Dinamik Kayıtlar
  - Intlayer
  - Uluslararasılaştırma
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Dinamik sözlükler özelliğinin sürümü"
author: aymericzip
---

# Dinamik Sözlükler

Intlayer, anahtar başına tek bir statik sözlüğün ötesine geçen içeriği ifade etmek için üç mekanizmayı destekler. Her biri içerik dosyasındaki bir **üst düzey meta veri alanı** aracılığıyla bildirilir; herhangi bir sarıcı (wrapper) fonksiyona ihtiyaç duyulmaz.

| Özellik                                                                                                                   | Meta veri alanı   | `useIntlayer` seçici  |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------- | --------------------- |
| [Koleksiyonlar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/collections.md)        | `item: N`         | `{ item: N }`         |
| [Varyantlar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/variants.md)              | `variant: "name"` | `{ variant: "name" }` |
| [Dinamik Kayıtlar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/dynamic_content.md) | `meta: { id, … }` | `{ id, … }`           |

Her üçü de dil (locale) bağımsız değişkeni ile birleşir ve `importMode` aracılığıyla seçici / tembel (lazy) yüklemeyi destekler.

## Hangisi ne zaman kullanılmalı

- **Koleksiyonlar** — ayrı dosyalarda yönetilen sıralı öğe listesi (SSS girişleri, blog yazıları, ürünler).
- **Varyantlar** — A/B testleri, dönemsel afişler veya özellik bayrakları (feature flags) için adlandırılmış içerik alternatifleri.
- **Dinamik kayıtlar** — çalışma zamanında opak bir kimlik (ID) ile getirilen içerik (CMS kayıtları, kullanıcıya özel metinler).

## Seçici Çözümleme Önceliği

Bir sözlükte birden fazla seçici mevcut olduğunda, çözümleme sırası şöyledir:

```
variant → meta → item
```
