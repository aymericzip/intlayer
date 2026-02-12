---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer-cli Paketi
description: Sözlükleri oluşturma ve denetleme komutları sağlayan Intlayer için CLI aracı.
keywords:
  - intlayer-cli
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Tüm dışa aktarımlar için belgelerin birleştirilmesi
---

# intlayer-cli Paketi

`intlayer-cli` paketi, Intlayer sözlüklerini ve yapılandırmasını yönetmek için bir dizi komut sağlar.

## Kurulum

```bash
npm install intlayer-cli
```

## Dışa Aktarımlar

### CLI Komutları (Fonksiyonlar)

Paket, CLI komutlarını çalıştıran fonksiyonları dışa aktarır.

| Fonksiyon  | Açıklama                                          |
| ---------- | ------------------------------------------------- |
| `build`    | Intlayer sözlüklerini oluşturur.                  |
| `audit`    | Sözlükleri eksik çeviriler için denetler.         |
| `liveSync` | Sözlükleri gerçek zamanlı olarak senkronize eder. |
| `pull`     | Uzak kaynaktan sözlükleri çeker.                  |
| `push`     | Sözlükleri uzak kaynağa gönderir.                 |
| `test`     | Sözlükler üzerinde testleri çalıştırır.           |
| `extract`  | Sözlükleri formatlar arasında dönüştürür.         |
