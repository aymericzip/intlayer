---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: adonis-intlayer Paketi Belgeleri
description: Çeviri fonksiyonları ve yerel ayar tespiti sağlayan Intlayer için AdonisJS middleware'i.
keywords:
  - adonis-intlayer
  - adonisjs
  - middleware
  - uluslararasılaştırma
  - i18n
slugs:
  - doc
  - packages
  - adonis-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: İlk belgeler
---

# adonis-intlayer Paketi

`adonis-intlayer` paketi, AdonisJS uygulamalarının uluslararasılaştırmayı yönetmesi için bir middleware sağlar. Kullanıcının yerel ayarını algılar ve çeviri fonksiyonları sağlar.

## Kurulum

```bash
npm install adonis-intlayer
```

## Dışa Aktarımlar

### Middleware

Paket, uluslararasılaştırmayı yönetmek için bir AdonisJS middleware'i sağlar.

| Fonksiyon            | Açıklama                                                                                                                                                                                                                                                                 | İlgili Doküman                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `IntlayerMiddleware` | Kullanıcının yerel ayarını algılayan ve istek bağlamını Intlayer verileriyle dolduran AdonisJS middleware'i. Ayrıca istek yaşam döngüsü erişimi için bir CLS (Async Local Storage) ad alanı kurarak `t`, `getIntlayer` vb. küresel fonksiyonların kullanılmasını sağlar. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/adonis-intlayer/intlayer.md) |

### Fonksiyonlar

| Fonksiyon       | Açıklama                                                                                                                                                                                                   | İlgili Doküman                                                                                         |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Geçerli yerel ayar için içeriği getiren çeviri fonksiyonu. `intlayer` middleware tarafından yönetilen istek yaşam döngüsü içinde çalışır. İstek bağlamına erişmek için CLS (Async Local Storage) kullanır. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/translation.md) |
| `getIntlayer`   | Üretilen beyandan anahtarına göre bir sözlük alır ve belirtilen yerel ayar için içeriğini döndürür. `getDictionary`'nin optimize edilmiş sürümü. İstek bağlamına erişmek için CLS kullanır.                | -                                                                                                      |
| `getDictionary` | Sözlük nesnelerini işler ve belirtilen yerel ayar için içerik döndürür. `t()` çevirilerini, numaralandırmaları, markdown, HTML vb. işler. İstek bağlamına erişmek için CLS kullanır.                       | -                                                                                                      |
| `getLocale`     | CLS kullanarak istek bağlamından geçerli yerel ayarı alır.                                                                                                                                                 | -                                                                                                      |
