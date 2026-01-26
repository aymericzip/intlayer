---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer-cli Paket Dokümantasyonu
description: Intlayer için CLI aracı, sözlükleri oluşturma ve denetleme komutları sağlar.
keywords:
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Tüm dışa aktarımlar için birleştirilmiş dokümantasyon
---

# intlayer-cli Paketi

`intlayer-cli` paketi, Intlayer sözlüklerini ve yapılandırmasını yönetmek için bir dizi komut sağlar.

## Kurulum

```bash
npm install intlayer-cli
```

## Dışa Aktarılanlar

### CLI Komutları (Fonksiyonlar)

Paket, CLI komutlarını çalıştıran fonksiyonları dışa aktarır; bu sayede Intlayer işlemlerini programlı olarak tetikleyebilirsiniz.

İçe Aktarma:

```tsx
import "intlayer-cli";
```

| Function       | Description                                              |
| -------------- | -------------------------------------------------------- |
| `build`        | Intlayer sözlüklerini oluşturur.                         |
| `audit`        | Eksik çeviriler için sözlükleri denetler.                |
| `liveSync`     | Sözlükleri gerçek zamanlı olarak senkronize eder.        |
| `pull`         | Sözlükleri uzak bir kaynaktan çeker.                     |
| `push`         | Sözlükleri uzak bir kaynağa gönderir.                    |
| `test`         | Sözlükler üzerinde testleri çalıştırır.                  |
| `transform`    | Sözlükleri formatlar arasında dönüştürür.                |
| `fill`         | Eksik çevirileri AI kullanarak sözlüklere doldurur.      |
| `reviewDoc`    | Uluslararasılaştırma için dokümantasyonu gözden geçirir. |
| `translateDoc` | Dokümantasyonu AI kullanarak çevirir.                    |
