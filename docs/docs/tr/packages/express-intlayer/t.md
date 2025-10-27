---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: t Fonksiyonu Dokümantasyonu | express-intlayer
description: express-intlayer paketi için t fonksiyonunun nasıl kullanılacağını görün
keywords:
  - t
  - çeviri
  - Intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Express
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Dokümantasyon: `express-intlayer` Paketinde `t` Fonksiyonu

`express-intlayer` paketindeki `t` fonksiyonu, Express uygulamanızda yerelleştirilmiş yanıtlar sağlamak için temel yardımcıdır. Kullanıcının tercih ettiği dile göre içeriği dinamik olarak seçerek uluslararasılaştırmayı (i18n) basitleştirir.

---

## Genel Bakış

`t` fonksiyonu, verilen bir dil seti için çevirileri tanımlamak ve almak için kullanılır. İstemcinin istek ayarlarına göre (örneğin `Accept-Language` başlığı) döndürülecek uygun dili otomatik olarak belirler. Tercih edilen dil mevcut değilse, yapılandırmanızda belirtilen varsayılan yerel ayara zarif bir şekilde geri döner.

---

## Temel Özellikler

- **Dinamik Yerelleştirme**: İstemci için en uygun çeviriyi otomatik olarak seçer.
- **Varsayılan Yerel Ayara Geri Dönme**: İstemcinin tercih ettiği dil mevcut değilse, kullanıcı deneyimini sürdürmek için varsayılan yerel ayara geri döner.
- **Hafif ve Hızlı**: Yüksek performanslı uygulamalar için tasarlanmış, minimum ek yük sağlar.
- **Katı Mod Desteği**: Güvenilir davranış için bildirilen yerel ayarlara katı uyumu zorunlu kılar.

---

## Fonksiyon İmzası

```typescript
t(translations: Record<string, string>): string;
```

### Parametreler

- `translations`: Anahtarların yerel kodlar (örneğin `en`, `fr`, `es-MX`) ve değerlerin karşılık gelen çevrilmiş dizeler olduğu bir nesne.

### Döndürür

- İstemcinin tercih ettiği dildeki içeriği temsil eden bir dize.

---

## Uluslararasılaştırma İstek İşleyicisini Yükleme

`express-intlayer` tarafından sağlanan uluslararasılaştırma işlevinin doğru çalışmasını sağlamak için, Express uygulamanızın başında uluslararasılaştırma ara yazılımını **yüklemeniz gerekir**. Bu, `t` fonksiyonunu etkinleştirir ve yerel algılama ve çeviri işlemenin düzgün yapılmasını sağlar.

Tüm yolların uluslararasılaştırmadan faydalanmasını sağlamak için `app.use(intlayer())` ara yazılımını uygulamanızdaki **herhangi bir yoldan önce** yerleştirin:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Uluslararasılaştırma istek işleyicisini yükle
app.use(intlayer());

// Ara yazılım yükledikten sonra yollarınızı tanımlayın
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Uluslararasılaştırma istek işleyicisini yükle
app.use(intlayer());

// Ara yazılım yükledikten sonra yollarınızı tanımlayın
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// Uluslararasılaştırma istek işleyicisini yükle
app.use(intlayer());

// Ara yazılım yükledikten sonra yollarınızı tanımlayın
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### Neden Gerekli

- **Yerel Algılama**: `intlayer` ara yazılımı, başlıklara, çerezlere veya diğer yapılandırılmış yöntemlere göre kullanıcının tercih ettiği yerel ayarı algılamak için gelen istekleri işler.
- **Çeviri Bağlamı**: `t` fonksiyonunun doğru çalışması için gerekli bağlamı kurar, çevirilerin doğru dilde döndürülmesini sağlar.
- **Hata Önleme**: Bu ara yazılım olmadan, `t` fonksiyonunu kullanmak, gerekli yerel bilgileri mevcut olmadığı için çalışma zamanı hatalarına neden olur.

---

## Kullanım Örnekleri

### Temel Örnek

Farklı dillerde yerelleştirilmiş içerik sunun:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**İstemci İstekleri:**

- `Accept-Language: fr` ile bir istemci `Bienvenue!` alır.
- `Accept-Language: es` ile bir istemci `¡Bienvenido!` alır.
- `Accept-Language: de` ile bir istemci `Welcome!` alır (varsayılan yerel ayar).

### Hataları İşleme

Hata mesajlarını birden fazla dilde sağlayın:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### Yerel Varyantları Kullanma

Yerel ayara özel varyantlar için çeviriler belirtin:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## Gelişmiş Konular

### Geri Dönme Mekanizması

Tercih edilen yerel mevcut değilse, `t` fonksiyonu yapılandırmada tanımlanan varsayılan yerel ayara geri döner:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {5-6} fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript {5-6} fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Örneğin:

- `defaultLocale` `Locales.CHINESE` ise ve bir istemci `Locales.DUTCH` isterse, döndürülen çeviri `Locales.CHINESE` değerine varsayılan olur.
- `defaultLocale` tanımlanmamışsa, `t` fonksiyonu `Locales.ENGLISH` değerine geri döner.

---

### Katı Mod Zorunluluk

`t` fonksiyonunu bildirilen yerel ayarlara katı uyumu zorunlu kılmak için yapılandırın:

| Mod         | Davranış                                                                                                   |
| ----------- | ---------------------------------------------------------------------------------------------------------- |
| `strict`    | Tüm bildirilen yerel ayarlar için çeviriler sağlanmalıdır. Eksik yerel ayarlar hata atar.                  |
| `inclusive` | Bildirilen yerel ayarlar için çeviriler gereklidir. Eksik yerel ayarlar uyarı tetikler ancak kabul edilir. |
| `loose`     | Bildirilen olmayan herhangi bir mevcut yerel ayar kabul edilir.                                            |

Yapılandırma Örneği:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Mevcut yapılandırmanız
  internationalization: {
    // ... Mevcut uluslararasılaştırma yapılandırmanız
    strictMode: "strict", // Katı modu zorunlu kıl
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Mevcut yapılandırmanız
  internationalization: {
    // ... Mevcut uluslararasılaştırma yapılandırmanız
    strictMode: "strict", // Katı modu zorunlu kıl
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Mevcut yapılandırmanız
  internationalization: {
    // ... Mevcut uluslararasılaştırma yapılandırmanız
    strictMode: "strict", // Katı modu zorunlu kıl
  },
};

module.exports = config;
```

---

### TypeScript Entegrasyonu

`t` fonksiyonu TypeScript ile kullanıldığında tür güvenlidir. Tür güvenli çeviriler nesnesi tanımlayın:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { type LanguageContent } from "express-intlayer";

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { type LanguageContent } = require("express-intlayer");

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### Yaygın Hatalar ve Sorun Giderme

| Sorun                     | Neden                                    | Çözüm                                                                 |
| ------------------------- | ---------------------------------------- | --------------------------------------------------------------------- |
| `t` fonksiyonu çalışmıyor | Ara yazılım yüklenmemiş                  | `app.use(intlayer())` öğesinin yollar öncesi eklendiğinden emin olun. |
| Eksik çeviriler hatası    | Tüm yerel ayarlar olmadan katı mod etkin | Tüm gerekli çevirileri sağlayın.                                      |

---

## Etkili Kullanım İçin İpuçları

1. **Çevirileri Merkezi Hale Getirin**: Bakım kolaylığını artırmak için merkezi bir modül veya JSON dosyaları kullanarak çevirileri yönetin.
2. **Çevirileri Doğrulayın**: Gereksiz geri dönmeyi önlemek için her dil varyantının karşılık gelen bir çeviriye sahip olduğundan emin olun.
3. **Ön Uç i18n ile Birleştirin**: Uygulamada sorunsuz bir kullanıcı deneyimi için ön uç uluslararasılaştırmayla senkronize edin.
4. **Performansı Ölçün**: Minimum etkiyi sağlamak için çeviriler ekledikten sonra uygulamanızın yanıt sürelerini test edin.

---

## Sonuç

`t` fonksiyonu, arka uç uluslararasılaştırması için güçlü bir araçtır. Bunu etkili bir şekilde kullanarak, küresel bir kitle için daha kapsayıcı ve kullanıcı dostu bir uygulama oluşturabilirsiniz. Gelişmiş kullanım ve detaylı yapılandırma seçenekleri için [dokümantasyona](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.
