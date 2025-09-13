---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: intlayer-cli - Uluslararasılaştırma için Komut Satırı Aracı
description: Intlayer için komut satırı arayüzü paketi, çevirileri yönetmek, sözlükler oluşturmak ve uluslararasılaştırma iş akışlarını otomatikleştirmek için araçlar sağlar.
keywords:
  - intlayer
  - CLI
  - komut satırı
  - uluslararasılaştırma
  - i18n
  - araçlar
  - NPM
  - otomasyon
slugs:
  - doc
  - package
  - intlayer-cli
---

# intlayer-cli: Intlayer CLI'sini kullanmak için NPM Paketi

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir paket paketidir. React, React ve Express.js gibi çerçevelerle uyumludur.

**`intlayer-cli`** paketi, `@intlayer/cli` paketini tüketen ve `intlayer` komut satırı arayüzlerine kullanılabilir hale getiren bir NPM paketidir.

> Bu paketin [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/en/packages/intlayer/index.md) paketi yüklüyse gerekli olmadığına dikkat edin. `intlayer` paketiyle karşılaştırıldığında, `intlayer-cli` paketi `@intlayer/core` bağımlılıkları olmadan sadece CLI aracını içeren daha hafif bir pakettir.

## Kurulum

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketi yükleyin:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## Kullanım

`intlayer-cli` paketinin nasıl kullanılacağına dair bir örnek:

```bash
npx intlayer dictionaries build
```

## CLI komutları

Intlayer, şunları yapmak için bir CLI aracı sağlar:

- içerik bildirimlerinizi denetleyin ve eksik çevirileri tamamlayın
- içerik bildirimlerinizden sözlükler oluşturun
- uzak sözlükleri CMS'nizden yerel projenize itin ve çekin

Daha fazla bilgi için [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md)'ye danışın.

## Dokümantasyon Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |

```

```
