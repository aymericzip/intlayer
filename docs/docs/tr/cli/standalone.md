---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: Bağımsız Paket (Standalone Bundle)
description: Uygulama içeriğinin bağımsız bir JavaScript paketini nasıl oluşturacağınızı öğrenin.
keywords:
  - Standalone
  - Paket
  - CLI
  - Intlayer
  - Düzenleyici
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "Standalone komut dokümantasyonu başlatıldı"
---

# Bağımsız Paket (Standalone Bundle)

`standalone` komutu, Intlayer ve belirtilen diğer paketleri içeren bağımsız bir JavaScript paketi oluşturmanıza olanak tanır. Bu, basit bir HTML/JS uygulaması gibi paket yöneticisi veya paketleyici bulunmayan ortamlarda Intlayer'ı kullanmak için özellikle yararlıdır.

Paket, istenen paketleri ve bağımlılıklarını herhangi bir web projesine kolayca aktarılabilecek tek bir dosyada birleştirmek için [esbuild](https://esbuild.github.io/) kullanır.

## Kullanım

```bash
npx intlayer standalone --packages [paketler...] [seçenekler]
```

## Seçenekler

- `-o, --outfile [outfile]` - İsteğe bağlı. Çıktı dosyası adı. Varsayılan: `intlayer-bundle.js`.
- `--packages [paketler...]` - Gerekli. Pakete dahil edilecek paketlerin listesi (örneğin: `intlayer`, `vanilla-intlayer`).
- `--version [version]` - İsteğe bağlı. Paketlenmesi gereken paketlerin sürümü. Belirtilmezse, varsayılan olarak Intlayer CLI sürümü kullanılır.
- `--minify` - İsteğe bağlı. Çıktının küçültülüp küçültülmeyeceği. Varsayılan: `true`.
- `--platform [platform]` - İsteğe bağlı. Paket için hedef platform (örneğin: `browser`, `node`). Varsayılan: `browser`.
- `--format [format]` - İsteğe bağlı. Paket için çıktı formatı (örneğin: `esm`, `cjs`, `iife`). Varsayılan: `esm`.

## Genel Seçenekler

- `--env-file [envFile]` - Ortam dosyası.
- `-e, --env [env]` - Ortam.
- `--base-dir [baseDir]` - Temel dizin.
- `--no-cache` - Önbelleği devre dışı bırak.
- `--verbose` - Ayrıntılı çıktı.

## Örnekler:

### Vanilla JS için bir paket oluşturma:

```bash
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

Bu, hem `intlayer` hem de `vanilla-intlayer` paketlerini içeren, küçültülmüş ve ESM formatında, bir `<script>` etiketi aracılığıyla bir tarayıcıda kullanıma hazır bir `intlayer.js` dosyası oluşturacaktır.

### Belirli bir sürümü paketleme:

```bash
npx intlayer standalone --packages intlayer --version 8.6.4
```

### Farklı bir formatta paketleme:

```bash
npx intlayer standalone --packages intlayer --format iife
```

## Ne yapar:

1. **Geçici bir ortam oluşturur** - Bağımlılıkları yönetmek için geçici bir dizin kurar.
2. **Paketleri yükler** - İstenen paketleri ve bağımlılıklarını yüklemek için `npm` veya `bun` (varsa) kullanır.
3. **Giriş noktası oluşturur** - İstenen tüm paketleri dışa aktaran ve tarayıcıda çalıştırıldığında bunları küresel değişkenler olarak sunan geçici bir giriş noktası dosyası oluşturur.
4. **esbuild ile paketler** - Her şeyi tek bir dosyada birleştirmek için esbuild kullanır ve isteğe göre küçültme ve formatlama uygular.
5. **Dosyayı oluşturur** - Sonuç paketini belirtilen çıktı yoluna yazar.

## Küresel Değişkenler

Paket bir tarayıcıda yüklendiğinde, istenen paketleri `window` nesnesi üzerinde küresel değişkenler olarak sunar. Değişken adları paket adlarından türetilir (örneğin: `intlayer`, `Intlayer` olur; `vanilla-intlayer`, `VanillaIntlayer` olur).

```javascript
// Paketten Intlayer'a erişim
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```
