---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI
description: Çok dilli web sitenizi yönetmek için Intlayer CLI'nın nasıl kullanılacağını keşfedin. Projenizi birkaç dakika içinde kurmak için bu çevrimiçi dokümantördeki adımları izleyin.
keywords:
  - CLI
  - Komut Satırı Arayüzü
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 7.2.3
    date: 2025-11-22
    changes: Transform komutu eklendi
  - version: 7.1.0
    date: 2025-11-05
    changes: Translate komutuna skipIfExists seçeneği eklendi
  - version: 6.1.4
    date: 2025-01-27
    changes: CLI argümanları ve komutları için takma adlar eklendi
  - version: 6.1.3
    date: 2025-10-05
    changes: Komutlara build seçeneği eklendi
  - version: 6.1.2
    date: 2025-09-26
    changes: Versiyon komutu eklendi
  - version: 6.1.0
    date: 2025-09-26
    changes: CLI kullanılarak verbose seçeneği varsayılan olarak true yapıldı
  - version: 6.1.0
    date: 2025-09-23
    changes: watch komutu ve with seçeneği eklendi
  - version: 6.0.1
    date: 2025-09-23
    changes: editor komutu eklendi
  - version: 6.0.0
    date: 2025-09-17
    changes: content test ve list komutları eklendi
  - version: 5.5.11
    date: 2025-07-11
    changes: CLI komut parametreleri dokümantasyonu güncellendi
  - version: 5.5.10
    date: 2025-06-29
    changes: Başlangıç geçmişi
---

# Intlayer CLI

---

## İçindekiler

<TOC/>

---

## Paket Kurulumu

Gerekli paketleri npm kullanarak kurun:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> Eğer `intlayer` paketi zaten kuruluysa, cli otomatik olarak kurulur. Bu adımı atlayabilirsiniz.

## intlayer-cli paketi

`intlayer-cli` paketi, [intlayer deklarasyonlarınızı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) sözlükler haline dönüştürmeyi amaçlar.

Bu paket, `src/**/*.content.{ts|js|mjs|cjs|json}` gibi tüm intlayer dosyalarını dönüştürecektir. [Intlayer deklarasyon dosyalarınızı nasıl tanımlayacağınızı buradan görebilirsiniz](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Intlayer sözlüklerini yorumlamak için [react-intlayer](https://www.npmjs.com/package/react-intlayer) veya [next-intlayer](https://www.npmjs.com/package/next-intlayer) gibi yorumlayıcıları kullanabilirsiniz.

## Konfigürasyon Dosyası Desteği

Intlayer, birden fazla konfigürasyon dosyası formatını kabul eder:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Mevcut yerellerin veya diğer parametrelerin nasıl yapılandırılacağını görmek için [buradaki konfigürasyon dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakınız.

## Intlayer komutlarını çalıştırma

### Kimlik Doğrulama

- **[Giriş Yap](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/login.md)** - Intlayer CMS ile kimlik doğrulama yapın ve erişim kimlik bilgilerini alın

### Temel Komutlar

- **[Sözlükleri Derle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/build.md)** - İçerik beyan dosyalarından sözlüklerinizi derleyin
- **[Sözlükleri İzle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/watch.md)** - Değişiklikleri izleyin ve sözlükleri otomatik olarak derleyin
- **[CLI Sürümünü Kontrol Et](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/version.md)** - Yüklü Intlayer CLI sürümünü kontrol edin

### Sözlük Yönetimi

- **[Sözlükleri Gönder](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/push.md)** - Sözlükleri Intlayer editörüne ve CMS'e gönderin
- **[Sözlükleri Çek](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/pull.md)** - Sözlükleri Intlayer editöründen ve CMS'den çekin
- **[Sözlükleri Doldur](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md)** - Sözlükleri yapay zeka kullanarak doldurun, denetleyin ve çevirin
- **[Eksik Çevirileri Test Et](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/test.md)** - Eksik çevirileri test edin ve tespit edin
- **[İçerik Beyan Dosyalarını Listele](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/list.md)** - Projenizdeki tüm içerik beyan dosyalarını listeleyin

### Bileşen Yönetimi

- **[Bileşenleri Dönüştür](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/transform.md)** - Mevcut bileşenleri Intlayer kullanacak şekilde dönüştürün

### Konfigürasyon

- **[Konfigürasyonu Yönet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/configuration.md)** - Intlayer konfigürasyonunuzu CMS'ye alın ve gönderin

### Dokümantasyon Yönetimi

- **[Dokümanı Çevir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/doc-translate.md)** - Dokümantasyon dosyalarını yapay zeka kullanarak otomatik çevirin
- **[Dokümanı İncele](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/doc-review.md)** - Dokümantasyon dosyalarını kalite ve tutarlılık açısından inceleyin

### Editör & Canlı Senkronizasyon

- **[Editör Komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/editor.md)** - Intlayer editör komutlarını kullanın
- **[Canlı Senkronizasyon Komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/live.md)** - CMS içerik değişikliklerini çalışma zamanında yansıtmak için Canlı Senkronizasyonu kullanın

### Geliştirme Araçları

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/sdk.md)** - Kendi kodunuzda Intlayer CLI SDK'yı kullanın
- **[Intlayer Komutunu Hata Ayıkla](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/debug.md)** - Intlayer CLI sorunlarını hata ayıklayın ve giderin

## `package.json` dosyanızda intlayer komutlarını kullanın

```json fileName="package.json"
"scripts": {
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:transform": "npx intlayer transform",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Not**: Daha kısa takma adları da kullanabilirsiniz:
>
> - `npx intlayer list` yerine `npx intlayer content list`
> - `npx intlayer test` yerine `npx intlayer content test`
