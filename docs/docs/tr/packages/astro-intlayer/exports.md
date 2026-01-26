---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: astro-intlayer Paket Dokümantasyonu
description: Intlayer için Astro entegrasyonu; locale tabanlı yönlendirme ve sözlük yönetimi için kurulum sağlar.
keywords:
  - astro-intlayer
  - astro
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Tüm dışa aktarımlar için birleştirilmiş dokümantasyon
---

# astro-intlayer Paketi

`astro-intlayer` paketi, Intlayer'ı Astro uygulamalarına entegre etmek için gerekli araçları sağlar. Locale tabanlı yönlendirme ve sözlük yönetimini yapılandırır.

## Kurulum

```bash
npm install astro-intlayer
```

## Dışa Aktarımlar

### Entegrasyon

`astro-intlayer` paketi, projenizde Intlayer'ı yapılandırmak için bir Astro entegrasyonu sağlar.

İçe aktarma:

```tsx
import "astro-intlayer";
```

veya `astro.config.mjs` dosyasına ekleyerek:

```ts
export default defineConfig({
  integrations: [intlayer()],
});
```

| Fonksiyon  | Açıklama                                        |
| ---------- | ----------------------------------------------- |
| `intlayer` | Projenizde Intlayer'ı kuran Astro entegrasyonu. |
