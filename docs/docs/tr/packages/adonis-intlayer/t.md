---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: t Fonksiyonu Belgeleri | adonis-intlayer
description: adonis-intlayer paketi için t fonksiyonunun nasıl kullanılacağını görün
keywords:
  - t
  - çeviri
  - Intlayer
  - Uluslararasılaştırma
  - Belgeler
  - AdonisJS
  - JavaScript
slugs:
  - doc
  - packages
  - adonis-intlayer
  - t
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: İlk belgeler
---

# Belgeler: `adonis-intlayer` içinde `t` Fonksiyonu

`adonis-intlayer` paketindeki `t` fonksiyonu, AdonisJS uygulamanızda yerelleştirilmiş yanıtlar sağlamak için temel yardımcı programdır. Kullanıcının tercih ettiği dile göre içeriği dinamik olarak seçerek uluslararasılaştırmayı (i18n) basitleştirir.

---

## Genel Bakış

`t` fonksiyonu, belirli bir dil seti için çevirileri tanımlamak ve almak için kullanılır. `Accept-Language` başlığı gibi istemcinin istek ayarlarına bağlı olarak döndürülecek uygun dili otomatik olarak belirler. Tercih edilen dil mevcut değilse, yapılandırmanızda belirtilen varsayılan yerel ayara zarif bir şekilde geri döner.

---

## Ana Özellikler

- **Dinamik Yerelleştirme**: İstemci için otomatik olarak en uygun çeviriyi seçer.
- **Varsayılan Yerel Ayara Geri Dönüş**: İstemcinin tercih ettiği dil mevcut değilse varsayılan bir yerel ayara geri döner ve kullanıcı deneyiminde süreklilik sağlar.
- **Asenkron Bağlam**: Async Local Storage kullanarak AdonisJS istek yaşam döngüsü içinde sorunsuz bir şekilde çalışır.
- **TypeScript Desteği**: Çevirileriniz için tür güvenliğini zorunlu kılar.

---

## Fonksiyon İmzası

```typescript
t(translations: Record<string, any>): any;
```

### Parametreler

- `translations`: Anahtarların yerel ayar kodları (örn. `en`, `fr`, `es`) ve değerlerin ilgili çevrilmiş içerik olduğu bir nesne.

### Döndürür

- İstemcinin tercih ettiği dili temsil eden içerik.

---

## Middleware'i Yükleme

`t` fonksiyonunun doğru çalışmasını sağlamak için, AdonisJS uygulamanıza `intlayer` middleware'ini kaydetmeniz **gerekir**.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

---

## Kullanım Örnekleri

### Temel Örnek

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Welcome!",
    fr: "Bienvenue!",
    es: "¡Bienvenido!",
  });
});
```

### Denetleyicilerde Kullanım

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
      })
    );
  }
}
```

---

## Gelişmiş Konular

### Geri Dönüş Mekanizması

Tercih edilen bir yerel ayar mevcut değilse, `t` fonksiyonu `intlayer.config.ts` dosyanızda tanımlanan varsayılan yerel ayara geri dönecektir.

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### TypeScript Entegrasyonu

`t` fonksiyonu, tanımlanmış sözlüklerle kullanıldığında tür güvenlidir. Daha fazla ayrıntı için [TypeScript belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.
