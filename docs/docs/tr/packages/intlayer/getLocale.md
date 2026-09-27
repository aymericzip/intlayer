---
createdAt: 2026-01-21
updatedAt: 2026-09-27
priority: 5
title: getLocale Fonksiyon Dokümantasyonu | intlayer
description: "getLocale ile URL veya yol gibi bir dizgeden locale'i algılayın, bulunamazsa varsayılan locale'e dönün."
keywords:
  - getLocale
  - çeviri
  - Intlayer
  - intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
slugs:
  - doc
  - packages
  - intlayer
  - getLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Doküman başlatıldı"
author: aymericzip
---

# getLocale Fonksiyon Dokümantasyonu

getLocale fonksiyonu, bir URL veya yol gibi verilen bir dizgiden (string) locale bilgisini tespit etmenizi sağlar.

## Kullanım

```ts
import { getLocale } from "intlayer";

const locale = getLocale("/fr/about");

// Çıktı: 'fr'
```

## Parametreler

| Parametre | Tür      | Açıklama                              |
| --------- | -------- | ------------------------------------- |
| `path`    | `string` | Locale'u çıkarmak için yol veya dize. |

## Döndürülen Değer

Algılanan locale veya hiçbir locale tespit edilmezse varsayılan locale döndürülür.
