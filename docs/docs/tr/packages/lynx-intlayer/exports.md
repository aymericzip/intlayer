---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: lynx-intlayer Paket Dokümantasyonu
description: Lynx için Intlayer desteği; locale desteği için polyfill'ler sağlar.
keywords:
  - lynx-intlayer
  - lynx
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - lynx-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Tüm dışa aktarımlar için birleştirilmiş dokümantasyon
---

# lynx-intlayer Paketi

The `lynx-intlayer` package provides the necessary tools to integrate Intlayer into Lynx applications.

## Kurulum

```bash
npm install lynx-intlayer
```

## Dışa Aktarımlar

### Polyfill

İçe Aktarma:

```tsx
import "lynx-intlayer";
```

| Fonksiyon          | Açıklama                                                                        |
| ------------------ | ------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Lynx'in Intlayer'ı desteklemesi için gerekli polyfill'leri uygulayan fonksiyon. |

### Rsbuild Eklentisi

`lynx-intlayer` paketi, Intlayer'ı Lynx build sürecine entegre etmek için bir Rsbuild eklentisi sağlar.

Import:

```tsx
import "lynx-intlayer";
```

| Function             | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `pluginIntlayerLynx` | Intlayer'ı Lynx build sürecine entegre eden Rsbuild eklentisi. |
