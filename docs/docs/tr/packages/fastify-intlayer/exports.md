---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: fastify-intlayer Paket Dokümantasyonu
description: Intlayer için Fastify eklentisi; çeviri fonksiyonları ve yerel dil algılama sağlar.
keywords:
  - fastify-intlayer
  - fastify
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - fastify-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Tüm dışa aktarımlar için birleştirilmiş dokümantasyon
---

# fastify-intlayer Paketi

`fastify-intlayer` paketi, Fastify uygulamaları için uluslararasılaştırmayı (internationalization / i18n) yönetmek üzere bir plugin sağlar. Kullanıcının locale'ini algılar ve request nesnesini dekorlar.

## Kurulum

```bash
npm install fastify-intlayer
```

## Dışa Aktarımlar

### Eklenti

İçe aktarma:

```tsx
import "fastify-intlayer";
```

| Fonksiyon  | Açıklama                                                                                                                                                                                                                                                                                                                                | İlgili Doküman                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Fastify eklentisi; Intlayer'ı Fastify uygulamanıza entegre eder. Yerel ayar (locale) tespitini depolamadan (cookies, headers) gerçekleştirir, istek (request) nesnesini `t`, `getIntlayer` ve `getDictionary` içeren `intlayer` verisiyle dekore eder ve istek yaşam döngüsü sırasında programatik erişim için CLS namespace'ini kurar. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/fastify-intlayer/intlayer.md) |

### Fonksiyonlar

İçe aktarma:

```tsx
import "fastify-intlayer";
```

| Fonksiyon       | Açıklama                                                                                                                                                                                                                                                           | İlgili Doküman                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`             | Fastify'de geçerli locale için içeriği getiren global çeviri fonksiyonu. CLS (Async Local Storage) kullanır ve `intlayer` eklentisi tarafından yönetilen bir istek bağlamı içinde kullanılmalıdır. Ayrıca `req.intlayer.t` üzerinden de erişilebilir.              | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/translation.md) |
| `getIntlayer`   | Oluşturulmuş deklarasyondan anahtarına göre bir sözlüğü alır ve belirtilen locale için içeriğini döner. `getDictionary`'nin optimize edilmiş versiyonudur. İstek bağlamına erişmek için CLS kullanır. Ayrıca `req.intlayer.getIntlayer` üzerinden de erişilebilir. | -                                                                                                      |
| `getDictionary` | Sözlük nesnelerini işler ve belirtilen locale için içeriği döndürür. `t()` çevirilerini, enumları, markdown'ı, HTML'i vb. işler. İstek bağlamına erişmek için CLS kullanır. Ayrıca `req.intlayer.getDictionary` üzerinden de erişilebilir.                         | -                                                                                                      |
