---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: useLocale Hook Dokümantasyonu | react-intlayer
description: react-intlayer paketi için useLocale hook'unun nasıl kullanılacağını görün
keywords:
  - useLocale
  - sözlük
  - anahtar
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
  - useLocale
---

# React Entegrasyonu: `useLocale` Hook Dokümantasyonu

Bu bölüm, `react-intlayer` kütüphanesinden `useLocale` hook'una ilişkin kapsamlı detaylar sağlar, React uygulamalarında yerel ayar yönetimini yönetmek için tasarlanmıştır.

## React'te `useLocale` İçe Aktarma

`useLocale` hook'unu React uygulamanıza entegre etmek için ilgili paketten içe aktarın:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // React bileşenlerinde yerel ayar yönetimi için kullanılır
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // React bileşenlerinde yerel ayar yönetimi için kullanılır
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // React bileşenlerinde yerel ayar yönetimi için kullanılır
```

## Genel Bakış

`useLocale` hook'u, React bileşenlerinde yerel ayar ayarlarına erişmek ve bunları değiştirmek için kolay bir yol sağlar. Mevcut yerel ayara, varsayılan yerel ayara, tüm kullanılabilir yerel ayarlara ve uygulama bağlamında yerel ayar ayarlarını güncellemek için işlevlere erişim sağlar.

## Kullanım

React bileşeninde `useLocale` hook'unu nasıl kullanabileceğiniz:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Mevcut Yerel Ayar: {locale}</h1>
      <p>Varsayılan Yerel Ayar: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Mevcut Yerel Ayar: {locale}</h1>
      <p>Varsayılan Yerel Ayar: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Mevcut Yerel Ayar: {locale}</h1>
      <p>Varsayılan Yerel Ayar: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

## Parametreler ve Dönüş Değerleri

`useLocale` hook'unu çağırdığınızda, aşağıdaki özellikleri içeren bir nesne döndürür:

- **`locale`**: React bağlamında ayarlanan mevcut yerel ayar.
- **`defaultLocale`**: Yapılandırmada tanımlanan birincil yerel ayar.
- **`availableLocales`**: Yapılandırmada tanımlanan tüm kullanılabilir yerel ayarların listesi.
- **`setLocale`**: Uygulamanın bağlamında mevcut yerel ayarı güncellemek için bir işlev.

## Örnek

Bu örnek, `useLocale` hook'unu kullanarak uygulamanın yerel ayarını dinamik olarak değiştirmek için bir yerel ayar değiştirici oluşturan bir bileşeni gösterir:

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

## Sonuç

`react-intlayer`'dan `useLocale` hook'u, React uygulamalarınızda yerel ayarları yönetmek için önemli bir araçtır, uygulamanızı çeşitli uluslararası kitlelere uyarlamak için gereken işlevselliği sağlar.

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |
