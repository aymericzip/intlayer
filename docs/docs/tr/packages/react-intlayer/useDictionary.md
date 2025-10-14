---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: useDictionary Hook Dokümantasyonu | react-intlayer
description: React uygulamalarında Intlayer ile useDictionary hook'unun verimli kullanımı için tam rehber.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - yerelleştirme
  - i18n
  - sözlük
  - çeviri
slugs:
  - doc
  - package
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# React Entegrasyonu: `useDictionary` Hook Dokümantasyonu

Bu bölüm, React uygulamalarında görsel düzenleyici olmadan yerelleştirilmiş içeriği verimli bir şekilde yönetmek için `useDictionary` hook'unun kullanımına ilişkin detaylı rehberlik sağlar.

## React'te `useDictionary` İçe Aktarma

`useDictionary` hook'u, bağlama göre içe aktararak React uygulamalarına entegre edilebilir:

- **İstemci Bileşeni:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // İstemci tarafı React bileşenlerinde kullanılır
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // İstemci tarafı React bileşenlerinde kullanılır
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // İstemci tarafı React bileşenlerinde kullanılır
  ```

- **Sunucu Bileşeni:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // Sunucu tarafı React bileşenlerinde kullanılır
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // Sunucu tarafı React bileşenlerinde kullanılır
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"; // Sunucu tarafı React bileşenlerinde kullanılır
  ```

## Parametreler

Hook iki parametre kabul eder:

1. **`dictionary`**: Belirli anahtarlar için yerelleştirilmiş içerik içeren bildirilen bir sözlük nesnesi.
2. **`locale`** (isteğe bağlı): İstenen yerel ayar. Belirtilmezse, mevcut bağlamın yerel ayarına varsayılan olur.

## Sözlük

Tüm sözlük nesneleri, tür güvenliğini sağlamak ve çalışma zamanı hatalarını önlemek için yapılandırılmış içerik dosyalarında bildirilmelidir. [Kurulum talimatlarını burada](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/get_started.md) bulabilirsiniz. İşte içerik bildirimi örneği:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
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

export default componentContent;
```

```javascript fileName="./component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
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

export default componentContent;
```

```javascript fileName="./component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
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

module.exports = componentContent;
```

```json fileName="./component.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente"
      }
    }
  }
}
```

## React'te Örnek Kullanım

Aşağıda `useDictionary` hook'unun bir React bileşeninde nasıl kullanılacağına ilişkin bir örnek verilmiştir:

```tsx fileName="./ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer");
const componentContent = require("./component.content");

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Sunucu Entegrasyonu

`useDictionary` hook'unu `IntlayerProvider` dışında kullanıyorsanız, bileşeni işlerken yerel ayar açıkça parametre olarak sağlanmalıdır:

```tsx fileName="./ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer/server";
import componentContent from "./component.content";

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer/server");
const componentContent = require("./component.content");

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

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
