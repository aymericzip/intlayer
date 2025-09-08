---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: t Fonksiyonu Dokümantasyonu | next-intlayer
description: next-intlayer paketi için t fonksiyonunun nasıl kullanılacağını görün
keywords:
  - t
  - çeviri
  - Intlayer
  - next-intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - t
---

# Dokümantasyon: `next-intlayer` Paketinde `t` Fonksiyonu

`next-intlayer` paketindeki `t` fonksiyonu, Next.js uygulamanızda satır içi uluslararasılaştırma için temel bir araçtır. Bileşenlerinizde doğrudan çevirileri tanımlamanıza olanak tanır, mevcut yerel ayara göre yerelleştirilmiş içeriği görüntülemeyi basitleştirir.

---

## Genel Bakış

`t` fonksiyonu, bileşenlerinizde farklı yerel ayarlar için çevirileri doğrudan sağlamak için kullanılır. Desteklenen her yerel ayar için çeviriler içeren bir nesne geçirerek, `t` Next.js uygulamanızdaki mevcut yerel bağlamına göre uygun çeviriyi döndürür.

---

## Temel Özellikler

- **Satır İçi Çeviriler**: Ayrı bir içerik bildirimi gerektirmeyen hızlı, satır içi metin için idealdir.
- **Otomatik Yerel Seçim**: Mevcut yerel ayara karşılık gelen çeviriyi otomatik olarak döndürür.
- **TypeScript Desteği**: TypeScript ile kullanıldığında tür güvenliği ve otomatik tamamlama sağlar.
- **Kolay Entegrasyon**: Next.js'te hem istemci hem de sunucu bileşenlerinde sorunsuz çalışır.

---

## Fonksiyon İmzası

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parametreler

- `translations`: Anahtarların yerel kodlar (örneğin `en`, `fr`, `es`) ve değerlerin karşılık gelen çevrilmiş dizeler olduğu bir nesne.

### Döndürür

- Mevcut yerel ayar için çevrilmiş içeriği temsil eden bir dize.

---

## Kullanım Örnekleri

### İstemci Bileşeninde `t` Kullanımı

İstemci tarafı bileşeninde `t` kullanırken, dosyanızın en üstüne `'use client';` yönergesini eklediğinizden emin olun.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer";

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    })}
  </p>
);
```

### Sunucu Bileşeninde `t` Kullanımı

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

### Özelliklerde Satır İçi Çeviriler

`t` fonksiyonu, JSX özelliklerinde satır içi çeviriler için özellikle kullanışlıdır.
`alt`, `title`, `href` veya `aria-label` gibi özellikleri yerelleştirirken, `t`'yi doğrudan özellik içinde kullanabilirsiniz.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Gelişmiş Konular

### TypeScript Entegrasyonu

`t` fonksiyonu TypeScript ile kullanıldığında tür güvenlidir, tüm gerekli yerel ayarların sağlandığından emin olur.

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Yerel Algılama ve Bağlam

`next-intlayer`'da, mevcut yerel ayar bağlam sağlayıcıları aracılığıyla yönetilir: `IntlayerClientProvider` ve `IntlayerServerProvider`. Bileşenlerinizi bu sağlayıcıların sardığından ve `locale` özelliğinin doğru şekilde geçirildiğinden emin olun.

#### Örnek:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Bileşenleriniz burada */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Bileşenleriniz burada */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Bileşenleriniz burada */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Yaygın Hatalar ve Sorun Giderme

### `t` Tanımsız veya Yanlış Çeviri Döndürüyor

- **Neden**: Mevcut yerel ayar doğru şekilde ayarlanmamış veya mevcut yerel ayar için çeviri eksik.
- **Çözüm**:
  - `IntlayerClientProvider` veya `IntlayerServerProvider`'ın uygun `locale` ile doğru şekilde kurulduğunu doğrulayın.
  - Çeviriler nesnenizin gerekli tüm yerel ayarları içerdiğinden emin olun.

### TypeScript'te Eksik Çeviriler

- **Neden**: Çeviriler nesnesi gerekli yerel ayarları karşılamıyor, TypeScript hatalarına yol açıyor.
- **Çözüm**: Çevirilerinizin eksiksizliğini zorunlu kılmak için `IConfigLocales` türünü kullanın.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Eksik 'es' TypeScript hatasına neden olur [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Eksik 'es' TypeScript hatasına neden olur [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Eksik 'es' TypeScript hatasına neden olur [!code error]
};

const text = t(translations);
```

---

## Etkili Kullanım İçin İpuçları

1. **Basit Satır İçi Çeviriler İçin `t` Kullanın**: Bileşenlerinizde doğrudan küçük metin parçalarını çevirmek için idealdir.
2. **Yapılandırılmış İçerik İçin `useIntlayer` Tercih Edin**: Daha karmaşık çeviriler ve içerik yeniden kullanımı için, içeriği bildirim dosyalarında tanımlayın ve `useIntlayer` kullanın.
3. **Tutarlı Yerel Sağlama**: Uygulamanızda yerel ayarınızın uygun sağlayıcılar aracılığıyla tutarlı şekilde sağlandığından emin olun.
4. **TypeScript'i Kullanın**: Eksik çevirileri yakalamak ve tür güvenliğini sağlamak için TypeScript türlerini kullanın.

---

## Sonuç

`next-intlayer`'daki `t` fonksiyonu, Next.js uygulamalarınızda satır içi çevirileri yönetmek için güçlü ve kullanışlı bir araçtır. Bunu etkili bir şekilde entegre ederek, uygulamanızın uluslararasılaştırma yeteneklerini geliştirir, dünya çapındaki kullanıcılar için daha iyi bir deneyim sağlar.

Daha detaylı kullanım ve gelişmiş özellikler için [next-intlayer dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) bakın.

---

**Not**: `t` fonksiyonunun doğru çevirileri döndürmesi için mevcut yerel ayarınızın bileşenlerinize doğru şekilde aktarıldığından emin olun. Bu, `IntlayerClientProvider` ve `IntlayerServerProvider`'ı düzgün şekilde kurmak için çok önemlidir.

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |
