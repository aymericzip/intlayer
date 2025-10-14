---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: useIntlayer Hook Dokümantasyonu | next-intlayer
description: next-intlayer paketi için useIntlayer hook'unun nasıl kullanılacağını görün
keywords:
  - useIntlayer
  - dictionary
  - key
  - Intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Next.js Entegrasyonu: `useIntlayer` Hook Dokümantasyonu

`useIntlayer` hook'u, Next.js uygulamalarında yerelleştirilmiş içeriği verimli bir şekilde almak ve yönetmek için tasarlanmıştır. Bu dokümantasyon, Next.js projelerinde hook'un nasıl kullanılacağına odaklanacak ve uygun yerelleştirme uygulamalarını sağlayacaktır.

## Next.js'te `useIntlayer` İçe Aktarma

Next.js uygulamanızda istemci tarafı veya sunucu tarafı bileşenlerde çalışıp çalışmadığınıza bağlı olarak, `useIntlayer` hook'unu aşağıdaki gibi içe aktarabilirsiniz:

- **İstemci Bileşeni:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // İstemci tarafı bileşenlerde kullanılır
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // İstemci tarafı bileşenlerde kullanılır
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // İstemci tarafı bileşenlerde kullanılır
  ```

- **Sunucu Bileşeni:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // Sunucu tarafı bileşenlerde kullanılır
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // Sunucu tarafı bileşenlerde kullanılır
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // Sunucu tarafı bileşenlerde kullanılır
  ```

## Parametreler

1. **`key`**: İçeriği almak istediğiniz sözlük anahtarının dize tanımlayıcısı.
2. **`locale`** (isteğe bağlı): Kullanılacak belirli bir yerel ayar. Atlanırsa, hook istemci veya sunucu bağlamında ayarlanan yerel ayara varsayılan olur.

## Sözlük Dosyaları

Çalışma zamanı hatalarını önlemek ve tür güvenliğini sağlamak için tüm içerik anahtarlarının içerik bildirim dosyalarında tanımlanması önemlidir. Bu yaklaşım ayrıca derleme zamanı doğrulaması için TypeScript entegrasyonunu kolaylaştırır.

İçerik bildirim dosyalarının kurulumu için talimatlar [burada](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/get_started.md) mevcuttur.

## Next.js'te Örnek Kullanım

İşte uygulamanın mevcut yerel ayarına göre yerelleştirilmiş içeriği dinamik olarak yüklemek için `useIntlayer` hook'unu bir Next.js sayfasında nasıl uygulayabileceğiniz:

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
const {
  ClientComponentExample,
} = require("@components/ClientComponentExample");
const {
  ServerComponentExample,
} = require("@components/ServerComponentExample");
const { IntlayerClientProvider } = require("next-intlayer");
const { useIntlayer } = require("next-intlayer/server");

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use-client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.msx" codeFormat="esm"
"use-client";

import { useIntlayer } from "next-intlayer";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use-client";

const { useIntlayer } = require("next-intlayer");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Özellik Yerelleştirmesi İşleme

`alt`, `title`, `href`, `aria-label` vb. gibi özellikleri yerelleştirmek için, içeriği doğru şekilde referans aldığınızdan emin olun:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Daha Fazla Bilgi

- **Intlayer Görsel Düzenleyici**: Daha kolay içerik yönetimi için görsel düzenleyicinin nasıl kullanılacağını öğrenin [burada](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md).

Bu dokümantasyon, Next.js ortamlarında `useIntlayer` hook'unun kullanımını özetler, Next.js uygulamalarınızda yerelleştirmeyi yönetmek için sağlam bir çözüm sağlar.
