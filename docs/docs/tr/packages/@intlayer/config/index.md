---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: @intlayer/config - Intlayer için Yapılandırma Yönetimi
description: Farklı ortamlarda uluslararasılaştırma ayarları için Intlayer yapılandırmasını almak ve ortam değişkenlerini tanımlamak üzere NPM paketi.
keywords:
  - intlayer
  - configuration
  - environment
  - settings
  - i18n
  - JavaScript
  - NPM
  - variables
slugs:
  - doc
  - package
  - @intlayer_config
---

# @intlayer/config: Intlayer yapılandırmasını almak için NPM Paketi

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir paket paketidir. React, Next.js ve Express.js gibi çerçevelerle uyumludur.

**`@intlayer/config`** paketi, Intlayer'ın yapılandırmasını almanıza ve mevcut ortama ilişkin ortam değişkenlerini tanımlamanıza olanak tanıyan bir NPM paketidir.

## Kurulum

Gerekli paketi tercih ettiğiniz paket yöneticisi kullanarak yükleyin:

```bash packageManager="npm"
npm install @intlayer/config
```

```bash packageManager="pnpm"
pnpm add @intlayer/config
```

```bash packageManager="yarn"
yarn add @intlayer/config
```

## Kullanım

### Intlayer yapılandırmasını dosya sistemi kullanarak oku

Örnek:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config";

const config: IntlayerConfig = getConfiguration();

console.log(config);
// Çıktı:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> Bu fonksiyon `fs` paketlerini kullanır ve sadece sunucu tarafında çalışır.

### Intlayer yapılandırmasını ortam değişkenlerini kullanarak oku

Örnek:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config/client";

const config: IntlayerConfig = getConfiguration({
  env: "production",
});

console.log(config);
// Çıktı:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> Bu fonksiyon, ortam değişkenleri tanımlanmamışsa hiçbir şey döndürmez.

### Ortam değişkenlerini tanımla

1. Bir yapılandırma dosyası oluşturun.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    /* ... */
  },
  middleware: {
    /* ... */
  },
  content: {
    /* ... */
  },
  editor: {
    /* ... */
  },
};

export default config;
```

> Daha fazla detay için [Intlayer yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

2. Ortam değişkenlerini tanımlayın.

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// Tüm yapılandırma değerlerini ortam değişkenleri olarak biçimlendirin
const env = formatEnvVariable();

// Her biçimlendirilmiş ortam değişkenini process.env'ye ayarlayın
Object.assign(process.env, env);
```

3. Yapılandırma dosyasını içe aktarın.

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |
