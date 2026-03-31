---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: CLI - Çok dilli web siteniz için tüm Intlayer CLI komutları
description: Çok dilli web sitenizi yönetmek için Intlayer CLI'yı nasıl kullanacağınızı keşfedin. Projenizi birkaç dakika içinde kurmak için bu çevrimiçi belgelerdeki adımları izleyin.
keywords:
  - CLI
  - Komut Satırı Arayüzü
  - Uluslararasılaştırma
  - Belgeler
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "Standalone komutu eklendi"
  - version: 7.5.11
    date: 2026-01-06
    changes: "CI komutu eklendi"
  - version: 7.5.11
    date: 2026-01-06
    changes: "list projects komutu eklendi"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Init komutu eklendi"
  - version: 7.2.3
    date: 2025-11-22
    changes: "Extract komutu eklendi"
  - version: 7.1.0
    date: 2025-11-05
    changes: "Translate komutuna skipIfExists seçeneği eklendi"
  - version: 6.1.4
    date: 2025-01-27
    changes: "CLI bağımsız değişkenleri ve komutları için takma adlar eklendi"
  - version: 6.1.3
    date: 2025-10-05
    changes: "Komutlara build seçeneği eklendi"
  - version: 6.1.2
    date: 2025-09-26
    changes: "Version komutu eklendi"
  - version: 6.1.0
    date: 2025-09-26
    changes: "CLI üzerinden verbose seçeneği varsayılan olarak true olarak ayarlandı"
  - version: 6.1.0
    date: 2025-09-23
    changes: "Watch komutu ve with seçeneği eklendi"
  - version: 6.0.1
    date: 2025-09-23
    changes: "Editor komutu eklendi"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Content test ve list komutları eklendi"
  - version: 5.5.11
    date: 2025-07-11
    changes: "CLI komut parametre belgeleri güncellendi"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
---

# Intlayer CLI - Çok dilli web siteniz için tüm Intlayer CLI komutları

---

## İçindekiler

<TOC/>

---

## Paketi Yükle

Gerekli paketleri npm kullanarak yükleyin:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> `intlayer` paketi zaten yüklüyse, CLI otomatik olarak yüklenir. Bu adımı atlayabilirsiniz.

## intlayer-cli paketi

`intlayer-cli` paketi, [intlayer bildirimlerinizi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) sözlüklere dönüştürmek (transpile) için tasarlanmıştır.

Bu paket, `src/**/*.content.{ts|js|mjs|cjs|json}` gibi tüm intlayer dosyalarını dönüştürür. [Intlayer bildirim dosyalarınızı nasıl bildireceğinizi görün](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Intlayer sözlüklerini yorumlamak için [react-intlayer](https://www.npmjs.com/package/react-intlayer) veya [next-intlayer](https://www.npmjs.com/package/next-intlayer) gibi yorumlayıcılar kullanabilirsiniz.

## Yapılandırma Dosyası Desteği

Intlayer birden fazla yapılandırma dosyası biçimini kabul eder:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Mevcut dillerin veya diğer parametrelerin nasıl yapılandırılacağını öğrenmek için [buradaki yapılandırma belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

## Intlayer Komutlarını Çalıştırma

### Kimlik Doğrulama

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/login.md)** - Intlayer CMS ile kimlik doğrulaması yapın ve erişim kimlik bilgilerini alın

### Temel Komutlar

- **[Build Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/build.md)** - İçerik bildirimi dosyalarından sözlüklerinizi oluşturun
- **[Watch Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/watch.md)** - Değişiklikleri izleyin ve sözlükleri otomatik olarak yeniden oluşturun
- **[Create Standalone Bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/standalone.md)** - Intlayer ve belirtilen paketleri içeren bağımsız bir JavaScript paketi oluşturun
- **[Check CLI Version](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/version.md)** - Kurulu Intlayer CLI sürümünü kontrol edin
- **[List Projects](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/list_projects.md)** - Bir dizindeki veya git deposundaki tüm Intlayer projelerini listeleyin

### Sözlük Yönetimi

- **[Push Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/push.md)** - Sözlükleri Intlayer düzenleyicisine ve CMS'ye gönderin
- **[Pull Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/pull.md)** - Intlayer düzenleyicisinden ve CMS'den sözlükleri alın
- **[Fill Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md)** - Yapay zeka kullanarak sözlükleri doldurun, denetleyin ve çevirin
- **[Test Missing Translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/test.md)** - Eksik çevirileri test edin ve belirleyin
- **[List Content Declaration Files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/list.md)** - Projenizdeki tüm içerik bildirimi dosyalarını listeleyin

### Bileşen Yönetimi

- **[Extract Strings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md)** - Bileşenlerden dizeleri bileşenin yanındaki bir .content dosyasına çıkarın

### Yapılandırma

- **[Initialize Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/init.md)** - Otomatik yapılandırma ile projenizde Intlayer'ı kurun
- **[Manage Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/configuration.md)** - Intlayer yapılandırmanızı alın ve CMS'ye gönderin

### Belge Yönetimi

- **[Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/doc-translate.md)** - Yapay zeka kullanarak belge dosyalarını otomatik olarak çevirin
- **[Review Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/doc-review.md)** - Belge dosyalarını kalite ve tutarlılık açısından inceleyin

### Düzenleyici ve Canlı Senkronizasyon (Live Sync)

- **[Editor Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/editor.md)** - Intlayer düzenleyici komutlarını kullanın
- **[Live Sync Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/live.md)** - CMS'den gelen içerik değişikliklerini çalışma zamanında uygulamak için Live Sync'i kullanın

### CI/CD ve Otomasyon

- **[CI Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/ci.md)** - CI/CD hatları için otomatik olarak eklenen kimlik bilgileriyle Intlayer komutlarını çalıştırın

### Geliştirici Araçları

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/sdk.md)** - Kendi kodunuzda Intlayer CLI SDK'sını kullanın
- **[Debug Intlayer Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/debug.md)** - Intlayer CLI sorunlarını ayıklayın ve düzeltin

## `package.json` dosyanızda intlayer komutlarını kullanın

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Not**: Daha kısa takma adları da kullanabilirsiniz:
>
> - `npx intlayer content list` yerine `npx intlayer list`
> - `npx intlayer content test` yerine `npx intlayer test`
> - `npx intlayer projects list` yerine `npx intlayer projects-list` veya `npx intlayer pl`
