---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: useDictionary Hook Dokümantasyonu | next-intlayer
description: next-intlayer paketi için useDictionary hook'unun nasıl kullanılacağını görün
keywords:
  - useDictionary
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
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# React Entegrasyonu: `useDictionary` Hook Dokümantasyonu

Bu bölüm, görsel düzenleyici olmadan yerelleştirilmiş içeriği verimli bir şekilde yönetmek için React uygulamalarında `useDictionary` hook'unun kullanımına ilişkin detaylı rehberlik sağlar.

## React'te `useDictionary` İçe Aktarma

`useDictionary` hook'u, bağlama göre içe aktararak React uygulamalarına entegre edilebilir:

- **İstemci Bileşeni:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // İstemci tarafı React bileşenlerinde kullanılır
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // İstemci tarafı React bileşenlerinde kullanılır
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // İstemci tarafı React bileşenlerinde kullanılır
  ```

- **Sunucu Bileşeni:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // Sunucu tarafı React bileşenlerinde kullanılır
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // Sunucu tarafı React bileşenlerinde kullanılır
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // Sunucu tarafı React bileşenlerinde kullanılır
  ```

## Parametreler

Hook iki parametre kabul eder:

1. **`dictionary`**: Belirli anahtarlar için yerelleştirilmiş içerik içeren bildirilen bir sözlük nesnesi.
2. **`locale`** (isteğe bağlı): İstenen yerel ayar. Belirtilmezse, mevcut bağlamın yerel ayarına varsayılan olur.

## Sözlük

Tüm sözlük nesneleri, tür güvenliğini sağlamak ve çalışma zamanı hatalarını önlemek için yapılandırılmış içerik dosyalarında bildirilmelidir. [Kurulum talimatlarını burada](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/get_started.md) bulabilirsiniz. İşte içerik bildirimi örneği:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies Dictionary;

export default exampleContent;
```

```javascript fileName="component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

export default exampleContent;
```

```javascript fileName="component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = exampleContent;
```

## React İstemci Bileşeninde Örnek Kullanım

Aşağıda `useDictionary` hook'unun bir React bileşeninde nasıl kullanılacağına ilişkin bir örnek verilmiştir:

```tsx fileName="ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.mjs" codeFormat="esm"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import exampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.cjs" codeFormat="commonjs"
"use client";

const { useDictionary } = require("next-intlayer");
const exampleContent = require("./component.content");

const ClientComponentExample = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## React Sunucu Bileşeninde Örnek Kullanım

`useDictionary` hook'unu `IntlayerServerProvider` dışında kullanıyorsanız, bileşeni işlerken yerel ayar açıkça parametre olarak sağlanmalıdır:

```tsx fileName="ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.mjs" codeFormat="esm"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.cjs" codeFormat="commonjs"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Özellikler Hakkında Notlar

Görsel düzenleyiciler kullanan entegrasyonların aksine, `buttonTitle.value` gibi özellikler burada uygulanmaz. Bunun yerine, içeriği doğrudan bildirildiğiniz gibi erişin.

```jsx
<button title={content.title}>{content.content}</button>
```

## Ek İpuçları

- **Tür Güvenliği**: Tür güvenliğini sağlamak için her zaman sözlüklerinizi tanımlamak üzere `Dictionary` kullanın.
- **Yerelleştirme Güncellemeleri**: İçeriği güncellerken, eksik çevirileri önlemek için tüm yerel ayarların tutarlı olduğundan emin olun.

Bu dokümantasyon, `useDictionary` hook'unun entegrasyonuna odaklanır, görsel düzenleyici işlevlerine güvenmeden yerelleştirilmiş içeriği yönetmek için akıcı bir yaklaşım sağlar.
