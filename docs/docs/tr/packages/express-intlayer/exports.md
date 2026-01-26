---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: express-intlayer Paket Dokümantasyonu
description: Intlayer için Express ara yazılımı; çeviri fonksiyonları ve yerel algılama sağlar.
keywords:
  - express-intlayer
  - express
  - middleware
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - express-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Tüm dışa aktarımlar için birleştirilmiş dokümantasyon
---

# express-intlayer Paketi

`express-intlayer` paketi, Express uygulamaları için uluslararasılaştırmayı yönetmek üzere bir middleware sağlar. Kullanıcının yerel ayarını algılar ve çeviri fonksiyonları sunar.

## Kurulum

```bash
npm install express-intlayer
```

## Dışa Aktarımlar

### Ara Yazılım (Middleware)

İçe Aktarma:

```tsx
import "express-intlayer";
```

| Fonksiyon  | Açıklama                                                                                                                                                                                                                                                                                                                        | İlgili Doküman                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Kullanıcının yerel ayarını algılayan ve Intlayer verileriyle `res.locals`'ı dolduran Express middleware'i. Çerezler/başlıklar (cookies/headers) üzerinden yerel tespitini yapar, `t`, `getIntlayer` ve `getDictionary`'i `res.locals` içine enjekte eder ve istek yaşam döngüsüne erişim için CLS ad alanını (namespace) kurar. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/express-intlayer/intlayer.md) |

### Fonksiyonlar

İçe aktar:

```tsx
import "express-intlayer";
```

| Fonksiyon       | Açıklama                                                                                                                                                                                              | İlgili Doküman                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Geçerli locale için içeriği alan çeviri fonksiyonu. `intlayer` middleware'i tarafından yönetilen istek yaşam döngüsü içinde çalışır. İstek bağlamına erişmek için CLS (Async Local Storage) kullanır. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/translation.md) |
| `getIntlayer`   | Üretilmiş deklarasyondaki anahtarıyla bir dictionary alır ve belirtilen locale için içeriğini döner. `getDictionary`'in optimize edilmiş versiyonu. İstek bağlamına erişmek için CLS kullanır.        | -                                                                                                      |
| `getDictionary` | Dictionary objelerini işler ve belirtilen locale için içeriğini döner. `t()` çevirilerini, enumerasyonları, markdown'u, HTML'i vb. işler. İstek bağlamına erişmek için CLS kullanır.                  | -                                                                                                      |
