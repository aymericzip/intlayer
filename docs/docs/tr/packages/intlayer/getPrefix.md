---
createdAt: 2025-11-16
updatedAt: 2025-11-16
title: getPrefix Fonksiyon Dokümantasyonu | intlayer
description: intlayer paketi için getPrefix fonksiyonunun nasıl kullanılacağını görün
keywords:
  - getPrefix
  - prefix
  - Intlayer
  - intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getPrefix
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: İlk dokümantasyon
---

# Dokümantasyon: `intlayer` İçindeki `getPrefix` Fonksiyonu

## Açıklama

`getPrefix` fonksiyonu, yönlendirme modu yapılandırmasına bağlı olarak verilen bir locale için URL ön ekini belirler. Locale'i varsayılan locale ile karşılaştırır ve esnek URL yapısı için üç farklı ön ek formatını içeren bir nesne döner.

**Temel Özellikler:**

- İlk parametre olarak bir locale alır (zorunlu)
- `defaultLocale` ve `mode` içeren isteğe bağlı `options` nesnesi
- `prefix` ve `localePrefix` özelliklerine sahip bir nesne döner
- Tüm yönlendirme modlarını destekler: `prefix-no-default`, `prefix-all`, `no-prefix` ve `search-params`
- Locale ön eklerinin ne zaman ekleneceğini belirlemek için hafif bir yardımcı araç

---

## Fonksiyon İmzası

```typescript
getPrefix(
  locale: Locales,               // Zorunlu
  options?: {                    // İsteğe bağlı
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): GetPrefixResult

type GetPrefixResult = {
  prefix: string;   // örn. 'fr/' veya ''
  localePrefix?: Locale; // örn. 'fr' veya tanımsız
}
```

---

## Parametreler

- `locale: Locales`
  - **Açıklama**: Ön ek oluşturulacak locale. Değer falsy ise (undefined, null, boş string), fonksiyon boş string döner.
  - **Tür**: `Locales`
  - **Zorunlu**: Evet

- `options?: object`
  - **Açıklama**: Ön ek belirleme için yapılandırma nesnesi.
  - **Tür**: `object`
  - **Zorunlu**: Hayır (İsteğe bağlı)

  - `options.defaultLocale?: Locales`
    - **Açıklama**: Uygulamanın varsayılan locale'i. Sağlanmazsa, proje yapılandırmanızdaki varsayılan locale kullanılır.
    - **Tür**: `Locales`
    - **Varsayılan**: [`Proje Yapılandırması`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Açıklama**: Locale işlemleri için URL yönlendirme modu. Sağlanmazsa, proje yapılandırmanızdaki yapılandırılmış modu kullanır.
    - **Tür**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Varsayılan**: [`Proje Yapılandırması`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md#middleware)
    - **Modlar**:
      - `prefix-no-default`: Locale varsayılan locale ile eşleştiğinde boş string döner
      - `prefix-all`: Varsayılan dahil tüm localeler için ön ek döner
      - `no-prefix`: Boş string döner (URL'lerde ön ek yok)
      - `search-params`: Boş string döner (locale sorgu parametrelerinde)

### Dönüş Değeri

- **Tür**: `GetPrefixResult`
- **Açıklama**: Üç farklı ön ek formatı içeren bir nesne:
  - `prefix`: Sonunda eğik çizgi olan yol ön eki (örneğin, `'fr/'`, `''`)
  - `localePrefix`: Eğik çizgisiz locale tanımlayıcısı (örneğin, `'fr'`, `undefined`)

---

## Örnek Kullanım

### Temel Kullanım

```typescript codeFormat="typescript"
import { getPrefix, Locales } from "intlayer";

// İngilizce locale için ön eki kontrol et
getPrefix(Locales.ENGLISH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Döner: { prefix: 'en/', localePrefix: 'en' }

// Fransızca locale için ön eki kontrol et
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Döner: { prefix: 'fr/', localePrefix: 'fr' }
```

```javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Döner: { prefix: '', localePrefix: undefined }
```

```javascript codeFormat="commonjs"
const { getPrefix, Locales } = require("intlayer");

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Döner: { prefix: '', localePrefix: undefined }
```

### Farklı Yönlendirme Modları

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all: Her zaman prefix döner
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// Döner: { prefix: '/en', localePrefix: 'en' }

// prefix-no-default: Locale varsayılanla eşleştiğinde prefix yok
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Döner: { prefix: '', localePrefix: undefined }

// prefix-no-default: Locale varsayılanla farklıysa prefix döner
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Döner: { prefix: 'fr/', localePrefix: 'fr' }

// no-prefix & search-params: Hiçbir zaman prefix döndürmez
getPrefix(Locales.ENGLISH, { mode: "no-prefix" });
// Döner: { prefix: '', localePrefix: undefined }

getPrefix(Locales.ENGLISH, { mode: "search-params" });
// Döner: { prefix: '', localePrefix: undefined }
```

### Pratik Örnek

```typescript
import { getPrefix, Locales } from "intlayer";

// Belirli bir locale için uygun prefix ile URL'ler oluştur
const locale = Locales.FRENCH;
const { prefix, localePrefix } = getPrefix(locale, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});

// Yol oluşturmak için prefix kullanımı
const url1 = `/${prefix}about`.replace(/\/+/g, "/");
// Sonuç: "/fr/about"

// Locale tanımlaması için localePrefix kullanımı
console.log(`Mevcut locale: ${localePrefix}`);
// Çıktı: "Mevcut locale: fr"
```

---

## İlgili Fonksiyonlar

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocalizedUrl.md): Belirli bir locale için lokalize URL oluşturur
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getMultilingualUrls.md): Tüm yapılandırılmış locale'ler için URL'ler oluşturur

---

## TypeScript

```typescript
type GetPrefixResult = {
  prefix: string; // Sonunda eğik çizgi olan yol öneki (örneğin, 'fr/' veya '')
  localePrefix?: Locale; // Eğik çizgi olmadan locale tanımlayıcısı (örneğin, 'fr' veya tanımsız)
};

function getPrefix(
  locale: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
  }
): GetPrefixResult;
```
