---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: t Fonksiyonu Dokümantasyonu | react-intlayer
description: react-intlayer paketi için t fonksiyonunun nasıl kullanılacağını görün
keywords:
  - t
  - çeviri
  - Intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - t
---

# Dokümantasyon: `react-intlayer`'da `t` Fonksiyonu

`react-intlayer` paketindeki `t` fonksiyonu, React uygulamanızda satır içi uluslararasılaştırma için temel bir araçtır. Bileşenlerinizde doğrudan yerelleştirilmiş içerik görüntülemeyi kolaylaştırır.

---

## Genel Bakış

`t` fonksiyonu, mevcut yerel ayara göre çevirileri döndürmek için bileşenlerinizde doğrudan yerel ayar kodları (örneğin, `en`, `fr`, `es`) ile çeviriler içeren bir nesne geçirerek kullanılır.

---

## Temel Özellikler

- **Satır İçi Çeviriler**: Görsel düzenleyici olmadan hızlı, satır içi metin için idealdir.
- **Otomatik Yerel Ayar Seçimi**: Mevcut yerel ayara karşılık gelen çeviriyi otomatik olarak döndürür.
- **TypeScript Desteği**: TypeScript ile kullanıldığında tür güvenliği ve otomatik tamamlama sağlar.
- **Kolay Entegrasyon**: React bileşenlerinde sorunsuz çalışır.

---

## Fonksiyon İmzası

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parametreler

- `translations`: Anahtarları yerel ayar kodları (örneğin, `en`, `fr`, `es`) ve değerleri karşılık gelen çevrilmiş dizeler olan bir nesne.

### Döndürür

- Mevcut yerel ayar için çevrilmiş içeriği temsil eden bir dize.

---

## Kullanım Örnekleri

### Bileşende `t`'nin Temel Kullanımı

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { t } from "react-intlayer";

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### Özelliklerde Satır İçi Çeviriler

`t` fonksiyonu, JSX özelliklerinde satır içi çeviriler için özellikle kullanışlıdır. `alt`, `title`, `href` veya `aria-label` gibi özellikleri yerelleştirirken, özelliği doğrudan JSX içinde kullanabilirsiniz.

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

`t` fonksiyonu, TypeScript ile kullanıldığında tür güvenlidir, gerekli tüm yerel ayarların sağlandığından emin olur.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Yerel Ayar Algılama ve Bağlam

`react-intlayer`'da, mevcut yerel ayar `IntlayerProvider` aracılığıyla yönetilir. Bileşenlerinizi saran sağlayıcının doğru şekilde ayarlandığından ve `locale` özelliğinin doğru geçirildiğinden emin olun.

#### Örnek:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Bileşenleriniz burada */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Bileşenleriniz burada */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Bileşenleriniz burada */}
  </IntlayerProvider>
);
```

---

## Yaygın Hatalar ve Sorun Giderme

### `t` Tanımsız veya Yanlış Çeviri Döndürüyor

- **Neden**: Mevcut yerel ayar doğru ayarlanmamış veya mevcut yerel ayar için çeviri eksik.
- **Çözüm**:
  - `IntlayerProvider`'ın doğru şekilde ayarlandığından emin olun.
  - Çeviriler nesnenizin gerekli tüm yerel ayarları içerdiğinden emin olun.

### TypeScript'te Eksik Çeviriler

- **Neden**: Çeviriler nesnesi gerekli yerel ayarları karşılamıyor, TypeScript hatalarına yol açıyor.
- **Çözüm**: Eksik çevirileri yakalamak için `IConfigLocales` türünü kullanın.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' eksik, TypeScript hatasına yol açar
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' eksik, TypeScript hatasına yol açar
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' eksik, TypeScript hatasına yol açar
};

const text = t(translations);
```

---

## Etkili Kullanım İçin İpuçları

1. **Basit Satır İçi Çeviriler İçin `t` Kullanın**: Bileşenlerinizde küçük metin parçalarını çevirmek için idealdir.
2. **Yapılandırılmış İçerik İçin `useIntlayer`'ı Tercih Edin**: Daha karmaşık çeviriler ve içerik yeniden kullanımı için içerik bildirim dosyalarında tanımlayın ve `useIntlayer`'ı kullanın.
3. **Tutarlı Yerel Ayar Sağlama**: Uygulamanız genelinde yerel ayarınızın `IntlayerProvider` aracılığıyla tutarlı şekilde sağlandığından emin olun.
4. **TypeScript'ten Yararlanın**: Eksik çevirileri yakalamak ve tür güvenliğini sağlamak için TypeScript türlerini kullanın.

---

## Sonuç

`react-intlayer`'daki `t` fonksiyonu, React uygulamalarınızda satır içi çevirileri yönetmek için güçlü ve kullanışlı bir araçtır. Etkili bir şekilde entegre ederek, uygulamanızın uluslararasılaştırma yeteneklerini geliştirir, dünya çapındaki kullanıcılara daha iyi bir deneyim sağlar.

Daha detaylı kullanım ve gelişmiş özellikler için [react-intlayer dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) bakın.

---

**Not**: `t` fonksiyonunun doğru çevirileri döndürmesi için `IntlayerProvider`'ınızı doğru şekilde ayarladığınızdan emin olun. Bu, bileşenlerinize mevcut yerel ayarın doğru geçirilmesi için çok önemlidir.

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |
