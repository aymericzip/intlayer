---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: hono-intlayer Paket Dokümantasyonu
description: Intlayer için Hono ara yazılımı, çeviri fonksiyonları ve yerel ayar algılama sağlar.
keywords:
  - hono-intlayer
  - hono
  - ara yazılım
  - uluslararasılaştırma
  - i18n
slugs:
  - doc
  - packages
  - hono-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Tüm dışa aktarmalar için birleştirilmiş dokümantasyon
---

# hono-intlayer Paketi

`hono-intlayer` paketi, uluslararasılaştırmayı yönetmek için Hono uygulamaları için bir ara yazılım (middleware) sağlar. Kullanıcının yerel ayarını algılar ve bağlam nesnesini doldurur.

## Kurulum

```bash
npm install hono-intlayer
```

## Dışa Aktarmalar

### Ara Yazılım

İçe Aktar:

```tsx
import { intlayer } from "hono-intlayer";
```

| Fonksiyon  | Açıklama                                                                                                                                                                                                                                                              | İlgili Doküman                                                                                               |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `intlayer` | Intlayer'ı Hono uygulamanıza entegre eden Hono ara yazılımı. Depolamadan (çerezler, başlıklar) yerel ayar algılamayı yönetir, bağlamı `t`, `getIntlayer` ve `getDictionary` ile doldurur ve istek yaşam döngüsü sırasında programlı erişim için CLS ad alanını kurar. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/hono-intlayer/intlayer.md) |

### Fonksiyonlar

İçe Aktar:

```tsx
import { t, getIntlayer, getDictionary } from "hono-intlayer";
```

| Fonksiyon       | Açıklama                                                                                                                                                                                                                                  | İlgili Doküman                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `t`             | Hono'daki geçerli yerel ayar için içeriği alan genel çeviri fonksiyonu. CLS'yi (Async Local Storage) kullanır ve `intlayer` ara yazılımı tarafından yönetilen bir istek bağlamı içinde kullanılmalıdır. Bağlam üzerinden de erişilebilir. | [çeviri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/translation.md) |
| `getIntlayer`   | Oluşturulan beyandan anahtarına göre bir sözlük alır ve belirtilen yerel ayar için içeriğini döndürür. `getDictionary`'nin optimize edilmiş sürümüdür. İstek bağlamına erişmek için CLS kullanır. Bağlam üzerinden de erişilebilir.       | -                                                                                                 |
| `getDictionary` | Sözlük nesnelerini işler ve belirtilen yerel ayar için içeriği döndürür. `t()` çevirilerini, numaralandırmaları, markdown'u, HTML'yi vb. işler. İstek bağlamına erişmek için CLS kullanır. Bağlam üzerinden de erişilebilir.              | -                                                                                                 |
