---
createdAt: 2026-06-12
updatedAt: 2026-06-26
title: Dinamik sözlükler
description: Intlayer'in dinamik sözlük özelliklerine — koleksiyonlar ve varyantlar — genel bakış; esnek, çalışma zamanında yönlendirilen i18n içeriği oluşturmak için.
keywords:
  - Dinamik sözlükler
  - Koleksiyonlar
  - Varyantlar
  - Intlayer
  - Uluslararasılaştırma
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Dinamik sözlükler özelliğinin yayımlanması"
  - version: 9.1.0
    date: 2026-06-26
    changes: "Dinamik kayıtlar varyantlara birleştirildi — `variant` artık bir dize veya nesne kabul ediyor"
author: aymericzip
---

# Dinamik sözlükler

Intlayer, anahtar başına tek bir statik sözlüğün ötesine geçen içeriği ifade etmek için iki mekanizmayı destekler. Her biri içerik dosyasında bir **üst düzey meta veri alanı** aracılığıyla bildirilir; sarmalayıcı bir fonksiyona gerek yoktur.

| Özellik                                                                                                            | Meta veri alanı                           | `useIntlayer` içindeki seçici                     |
| ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ------------------------------------------------- |
| [Koleksiyonlar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/collections.md) | `item: N`                                 | `{ item: N }`                                     |
| [Varyantlar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/variants.md)       | `variant: "name"` _veya_ `variant: { … }` | `{ variant: "name" }` _veya_ `{ variant: { … } }` |

Her ikisi de locale argümanıyla birlikte çalışır ve `importMode` aracılığıyla seçici / tembel yüklemeyi destekler.

## Hangisini ne zaman kullanmalı

- **Koleksiyonlar** — ayrı dosyalarda yönetilen sıralı öğe listesi (SSS girdileri, blog gönderileri, ürünler).
- **Varyantlar** — adlandırılmış veya yapılandırılmış içerik alternatifleri:
  - A/B testleri, sezonluk afişler veya özellik bayrakları için bir **dize** varyantı;
  - CMS kayıtları, kullanıcıya özel metin veya bir alan kümesiyle adreslenen herhangi bir içerik için bir **nesne** varyantı (eski "dinamik kayıtlar").

> Önceki sürümler kayda dayalı içerik için ayrı bir `meta` alanı sunuyordu. Bu, `variant` içine birleştirildi: `meta` kullanmak yerine `variant`'a bir **nesne** geçirin.

## Seçici belirsizlik giderme

Bir anahtar her iki boyutu da aynı anda bildirebilir (ör. her öğesinin bir varyantı olan bir koleksiyon). Bunlar şu sırayla çözümlenir:

```
variant → item
```

Böylece variant × item anahtarında `{ variant: "promo" }`, tüm promo öğelerini bir dizi olarak döndürür ve `{ item: 2 }` eklemek bunu tek bir girdiye daraltır.
