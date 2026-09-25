---
createdAt: 2024-08-11
updatedAt: 2026-09-23
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
  - version: 9.5.8
    date: 2026-09-23
    changes: "upgrade komutunu ekle"
  - version: 9.5.6
    date: 2026-09-21
    changes: "init infra komutunu ekle"
  - version: 9.5.2
    date: 2026-09-12
    changes: "`ci` komutu `--ci` bayrağıyla değiştirildi"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Scan komutu eklendi"
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
author: aymericzip
---

# Intlayer CLI - Çok dilli web siteniz için tüm Intlayer CLI komutları

## İçindekiler

<TOC/>

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

Bu paket, `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}` gibi tüm intlayer dosyalarını dönüştürür. [Intlayer bildirim dosyalarınızı nasıl bildireceğinizi görün](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

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

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/login" />
</TechGrid>

> `intlayer login` bir **erişim anahtarı** (`clientId` / `clientSecret`) verir ve her kimlik bilgili komut bu anahtarı kullanır. Gizli anahtar, sunucu tarafı bir kimlik bilgisidir ve hiçbir zaman istemci paketinize ulaşmaz — [Erişim anahtarını güvenli tutma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/login.md#keeping-the-access-key-safe) bölümüne bakın.

### Temel Komutlar

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/build" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/watch" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/standalone" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/version" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/list_projects" />
</TechGrid>

### Sözlük Yönetimi

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/push" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/pull" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/test" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/list" />
</TechGrid>

### Bileşen Yönetimi

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract" />
</TechGrid>

### Yapılandırma

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/init" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/infra" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/upgrade" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/configuration" />
</TechGrid>

### Belge Yönetimi

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/doc-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/doc-review" />
</TechGrid>

### Düzenleyici ve Canlı Senkronizasyon (Live Sync)

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/editor" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/live" />
</TechGrid>

### Denetim & Teşhis

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/scan" />
</TechGrid>

### Geliştirici Araçları

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/sdk" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/debug" />
</TechGrid>

## `package.json` dosyanızda intlayer komutlarını kullanın

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:infra": "npx intlayer init infra",
  "intlayer:upgrade": "npx intlayer upgrade",
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
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **Not**: Daha kısa takma adları da kullanabilirsiniz:
>
> - `npx intlayer content list` yerine `npx intlayer list`
> - `npx intlayer content test` yerine `npx intlayer test`
> - `npx intlayer projects list` yerine `npx intlayer projects-list` veya `npx intlayer pl`
