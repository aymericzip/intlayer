---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: t Fonksiyonu Dokümantasyonu | hono-intlayer
description: hono-intlayer paketi için t fonksiyonunun nasıl kullanılacağını görün
keywords:
  - t
  - çeviri
  - Intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Hono
  - JavaScript
slugs:
  - doc
  - packages
  - hono-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmişi başlat
---

# Dokümantasyon: `hono-intlayer` Paketinde `t` Fonksiyonu

`hono-intlayer` paketindeki `t` fonksiyonu, Hono uygulamanızda yerelleştirilmiş yanıtlar sağlamak için temel yardımcı araçtır. Kullanıcının tercih ettiği dile göre içeriği dinamik olarak seçerek uluslararasılaştırmayı (i18n) basitleştirir.

---

## Genel Bakış

`t` fonksiyonu, belirli bir dil seti için çevirileri tanımlamak ve almak için kullanılır. `Accept-Language` başlığı gibi istemcinin istek ayarlarına bağlı olarak döndürülecek uygun dili otomatik olarak belirler. Tercih edilen dil mevcut değilse, yapılandırmanızda belirtilen varsayılan yerel ayara zarif bir şekilde geri döner.

---

## Temel Özellikler

- **Dinamik Yerelleştirme**: İstemci için en uygun çeviriyi otomatik olarak seçer.
- **Varsayılan Yerel Ayara Geri Dönme**: İstemcinin tercih ettiği dil mevcut değilse varsayılan bir yerel ayara geri dönerek kullanıcı deneyiminde süreklilik sağlar.
- **Hafif ve Hızlı**: Yüksek performanslı uygulamalar için tasarlanmıştır ve minimum ek yük sağlar.
- **Katı Mod Desteği**: Güvenilir davranış için beyan edilen yerel ayarlara sıkı sıkıya bağlılığı zorunlu kılar.

---

## Fonksiyon İmzası

```typescript
t(translations: Record<string, string>): string;
```

### Parametreler

- `translations`: Anahtarların yerel ayar kodları (örneğin, `en`, `fr`, `tr`) ve değerlerin karşılık gelen çevrilmiş dizeler olduğu bir nesne.

### Geri Dönüş Değeri

- İstemcinin tercih ettiği dildeki içeriği temsil eden bir dize.

---

## Uluslararasılaştırma İstek İşleyicisini Yükleme

`hono-intlayer` tarafından sağlanan uluslararasılaştırma işlevinin doğru çalışmasını sağlamak için, Hono uygulamanızın başında uluslararasılaştırma ara yazılımını (middleware) yüklemeniz **gerekir**. Bu, `t` fonksiyonunu etkinleştirir ve yerel ayar algılama ve çevirinin düzgün şekilde işlenmesini sağlar.

`app.use("*", intlayer())` ara yazılımını, uygulamanızdaki **herhangi bir rotadan önce** yerleştirerek tüm rotaların uluslararasılaştırmadan yararlanmasını sağlayın:

```typescript {6} fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Uluslararasılaştırma istek işleyicisini yükle
app.use("*", intlayer());

// Ara yazılımı yükledikten sonra rotalarınızı tanımlayın
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      tr: "Merhaba Dünya!",
    })
  );
});
```

```javascript {6} fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Uluslararasılaştırma istek işleyicisini yükle
app.use("*", intlayer());

// Ara yazılımı yükledikten sonra rotalarınızı tanımlayın
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      tr: "Merhaba Dünya!",
    })
  );
});
```

```javascript {6} fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t } = require("hono-intlayer");

const app = new Hono();

// Uluslararasılaştırma istek işleyicisini yükle
app.use("*", intlayer());

// Ara yazılımı yükledikten sonra rotalarınızı tanımlayın
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      tr: "Merhaba Dünya!",
    })
  );
});
```

### Bu Neden Gereklidir?

- **Yerel Ayar Algılama**: `intlayer` ara yazılımı, başlıklar, çerezler veya diğer yapılandırılmış yöntemlere dayalı olarak kullanıcının tercih ettiği yerel ayarı algılamak için gelen istekleri işler.
- **Çeviri Bağlamı**: `t` fonksiyonunun doğru çalışması için gerekli bağlamı kurarak çevirilerin doğru dilde döndürülmesini sağlar.
- **Hata Önleme**: Bu ara yazılım olmadan, `t` fonksiyonunu kullanmak, gerekli yerel ayar bilgileri mevcut olmayacağı için çalışma zamanı hatalarına neden olur.

---

## Kullanım Örnekleri

### Temel Örnek

Farklı dillerde yerelleştirilmiş içerik sunun:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      tr: "Hoş geldiniz!",
    })
  );
});
```

**İstemci İstekleri:**

- `Accept-Language: fr` olan bir istemci `Bienvenue!` alır.
- `Accept-Language: tr` olan bir istemci `Hoş geldiniz!` alır.
- `Accept-Language: de` olan bir istemci `Welcome!` (varsayılan yerel ayar) alır.

### Hataları Yönetme

Birden fazla dilde hata mesajları sağlayın:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      tr: "Beklenmedik bir hata oluştu.",
    }),
    500
  );
});
```

---

### Yerel Ayar Varyantlarını Kullanma

Yerel ayara özgü varyantlar için çeviriler belirtin:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (c) => {
  return c.text(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      tr: "Merhaba!",
    })
  );
});
```

---

## Gelişmiş Konular

### Geri Dönüş Mekanizması

Tercih edilen bir yerel ayar mevcut değilse, `t` fonksiyonu yapılandırmada tanımlanan varsayılan yerel ayara geri döner:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.TURKISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

---

### Katı Mod Zorunluluğu

`t` fonksiyonunu beyan edilen yerel ayarlara sıkı sıkıya bağlılığı zorunlu kılacak şekilde yapılandırın:

| Mod         | Davranış                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------- |
| `strict`    | Beyan edilen tüm yerel ayarlar için çeviri sağlanmalıdır. Eksik yerel ayarlar hata fırlatır.      |
| `inclusive` | Beyan edilen yerel ayarların çevirileri olmalıdır. Eksik olanlar uyarı tetikler ama kabul edilir. |
| `loose`     | Beyan edilmemiş olsa bile mevcut herhangi bir yerel ayar kabul edilir.                            |

---

### TypeScript Entegrasyonu

`t` fonksiyonu, TypeScript ile kullanıldığında tip güvenlidir. Tip güvenli bir çeviri nesnesi tanımlayın:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "hono-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  tr: "Günaydın!",
};

app.get("/morning", (c) => {
  return c.text(t(translations));
});
```

---

### Yaygın Hatalar ve Sorun Giderme

| Sorun                     | Neden                                    | Çözüm                                                               |
| ------------------------- | ---------------------------------------- | ------------------------------------------------------------------- |
| `t` fonksiyonu çalışmıyor | Ara yazılım yüklenmemiş                  | Rotalardan önce `app.use("*", intlayer())` eklendiğinden emin olun. |
| Eksik çeviri hatası       | Tüm yerel ayarlar olmadan katı mod etkin | Gerekli tüm çevirileri sağlayın.                                    |

---

## Sonuç

`t` fonksiyonu, arka uç uluslararasılaştırması için güçlü bir araçtır. Bunu etkili bir şekilde kullanarak küresel bir kitle için daha kapsayıcı ve kullanıcı dostu bir uygulama oluşturabilirsiniz. Gelişmiş kullanım ve ayrıntılı yapılandırma seçenekleri için [dokümantasyona](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.
