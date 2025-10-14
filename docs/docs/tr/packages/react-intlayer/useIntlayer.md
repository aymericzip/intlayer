---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: useIntlayer Hook Dokümantasyonu | react-intlayer
description: react-intlayer paketi için useIntlayer hook'unun nasıl kullanılacağını görün
keywords:
  - useIntlayer
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
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# React Entegrasyonu: `useIntlayer` Hook Dokümantasyonu

Bu bölüm, React uygulamalarında içerik yerelleştirmesini etkinleştirmek için `useIntlayer` hook'unun nasıl kullanılacağına ilişkin detaylı rehberlik sağlar.

## React'te `useIntlayer` İçe Aktarma

`useIntlayer` hook'u, bağlama göre içe aktararak React uygulamalarına entegre edilebilir:

- **İstemci Bileşeni:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // İstemci tarafı React bileşenlerinde kullanılır
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // İstemci tarafı React bileşenlerinde kullanılır
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // İstemci tarafı React bileşenlerinde kullanılır
  ```

- **Sunucu Bileşeni:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // Sunucu tarafı React bileşenlerinde kullanılır
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // Sunucu tarafı React bileşenlerinde kullanılır
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // Sunucu tarafı React bileşenlerinde kullanılır
  ```

## Parametreler

Hook iki parametre kabul eder:

1. **`key`**: Yerelleştirilmiş içerik almak için sözlük anahtarı.
2. **`locale`** (isteğe bağlı): İstenen yerel ayar. Belirtilmezse, bağlamın yerel ayarına varsayılan olur.

## Sözlük

Tüm sözlük anahtarları, tür güvenliğini geliştirmek ve hataları önlemek için içerik bildirim dosyalarında bildirilmelidir. [Kurulum talimatlarını burada](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/get_started.md) bulabilirsiniz.

## React'te Örnek Kullanım

React bileşeninde `useIntlayer` hook'unun gösterimi:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useIntlayer } from "react-intlayer/server";

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
} = require("react-intlayer/server");

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Özellik İşleme

Özellikleri yerelleştirirken, içerik değerlerine uygun şekilde erişin:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Ek Kaynaklar

- **Intlayer Görsel Düzenleyici**: Daha sezgisel içerik yönetimi için görsel düzenleyici dokümantasyonuna [burada](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) bakın.

Bu bölüm, React uygulamalarında `useIntlayer` hook'unun entegrasyonuna özel olarak odaklanır, yerelleştirme sürecini basitleştirir ve farklı yerel ayarlar arasında içerik tutarlılığını sağlar.
