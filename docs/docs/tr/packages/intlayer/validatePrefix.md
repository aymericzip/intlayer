---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: validatePrefix Fonksiyon Dokümantasyonu | intlayer
description: intlayer paketindeki validatePrefix fonksiyonunun nasıl kullanılacağını görün
keywords:
  - validatePrefix
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - intlayer
  - validatePrefix
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# validatePrefix Fonksiyon Dokümantasyonu

`validatePrefix` fonksiyonu, verilen bir öneğin yapılandırmaya göre geçerli bir locale öneki olup olmadığını kontrol eder.

## Kullanım

```ts
import { validatePrefix } from "intlayer";

const isValid = validatePrefix("/fr");

// Output: true
```

## Parametreler

| Parametre | Tür      | Açıklama           |
| --------- | -------- | ------------------ |
| `prefix`  | `string` | Doğrulanacak önek. |

## Döndürülen Değer

`true` eğer önek geçerliyse, `false` aksi takdirde.
