---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: svelte-intlayer Package Documentation
description: Svelte-specific integration for Intlayer, providing setup functions and stores for Svelte applications.
keywords:
  - svelte-intlayer
  - svelte
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# svelte-intlayer Paketi

`svelte-intlayer` paketi, Intlayer'ı Svelte uygulamalarına entegre etmek için gerekli araçları sağlar. Çok dilli içeriği yönetmek için setup fonksiyonları ve store'lar içerir.

## Kurulum

```bash
npm install svelte-intlayer
```

## Dışa Aktarımlar

### Kurulum

İçe Aktarım:

```tsx
import "svelte-intlayer";
```

| Fonksiyon       | Açıklama                                               |
| --------------- | ------------------------------------------------------ |
| `setupIntlayer` | Svelte uygulamanızda Intlayer'ı kurmak için fonksiyon. |

### Mağaza

İçe aktar:

```tsx
import "svelte-intlayer";
```

| Store           | Açıklama                                         |
| --------------- | ------------------------------------------------ |
| `intlayerStore` | Geçerli Intlayer durumunu içeren Svelte store'u. |

### Hook'lar (Context)

İçe aktar:

```tsx
import "svelte-intlayer";
```

| Fonksiyon              | Açıklama                                                                                                                                          | İlgili Doküman                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`          | `useDictionary` tabanlıdır, ancak üretilen deklarasyondan optimize edilmiş bir sözlük sürümünü enjekte eder.                                      | -                                                                                                                        |
| `useDictionary`        | Anahtar, içerik (key, content) şeklinde görünen sözlük benzeri nesneleri işler. `t()` çevirilerini, enumerasyonları vb. işler.                    | -                                                                                                                        |
| `useDictionaryAsync`   | `useDictionary` ile aynı, ancak asenkron (asynchronous) sözlükleri işler.                                                                         | -                                                                                                                        |
| `useDictionaryDynamic` | `useDictionary` ile aynı, ancak dinamik sözlükleri işler.                                                                                         | -                                                                                                                        |
| `useLocale`            | Mevcut locale'i (yerel ayarı) ve bunu ayarlamak için bir fonksiyon döndürür.                                                                      | -                                                                                                                        |
| `useRewriteURL`        | URL yeniden yazımlarını yönetmek için istemci tarafı fonksiyon. Yerelleştirilmiş bir yeniden yazma kuralı varsa URL'yi otomatik olarak günceller. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/svelte-intlayer/useRewriteURL.md) |
| `useIntl`              | Mevcut locale için Intl nesnesini döndürür.                                                                                                       | -                                                                                                                        |

### Markdown

İçe aktar:

```tsx
import "svelte-intlayer";
```

| Function              | Açıklama                                                          |
| --------------------- | ----------------------------------------------------------------- |
| `setIntlayerMarkdown` | Svelte uygulamanızda markdown bağlamını ayarlamak için fonksiyon. |
