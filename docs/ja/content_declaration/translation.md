# 翻訳

## 翻訳の定義

`intlayer` の `t` 関数は、複数の言語でコンテンツを宣言することを可能にします。この関数は型安全性を確保し、欠落している翻訳がある場合にはエラーを発生させます。この機能は特に TypeScript 環境で便利です。

### TypeScript の使用

以下は、翻訳付きのコンテンツを宣言する方法の例です。

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

interface Content {
  welcomeMessage: string;
}

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
      ja: "私たちのアプリケーションへようこそ",
    }),
  },
} satisfies DeclarationContent<Content>;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
      ja: "私たちのアプリケーションへようこそ",
    }),
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
      ja: "私たちのアプリケーションへようこそ",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "key": "multi_lang",
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación",
        "ja": "私たちのアプリケーションへようこそ"
      }
    }
  }
}
```

## ロケールの設定

適切な翻訳処理を確保するために、`intlayer.config.ts`で受け入れられるロケールを設定できます。この設定により、アプリケーションがサポートする言語を定義できます。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.JAPANESE,
    ],
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.JAPANESE,
    ],
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.JAPANESE,
    ],
  },
};

module.exports = config;
```

## React コンポーネントでの翻訳の使用

`react-intlayer`を使用すると、React コンポーネントで翻訳を使用できます。以下はその例です。

```jsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

module.exports = MyComponent;
```

このコンポーネントは、アプリケーション内の現在のロケールに基づいた対応する翻訳を取得します。

## カスタムコンテンツオブジェクト

`intlayer`は翻訳のためにカスタムコンテンツオブジェクトをサポートしており、型安全性を確保しながらより複雑な構造を定義できます。以下はカスタムオブジェクトを使用した例です。

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

interface ICustomContent {
  title: string;
  content: string;
}

const customContent = {
  key: "custom_content",
  content: {
    profileText: t<ICustomContent>({
      en: {
        title: "Page Title",
        content: "Page Content",
      },
      fr: {
        title: "Titre de la Page",
        content: "Contenu de la Page",
      },
      es: {
        title: "Título de la Página",
        content: "Contenido de la Página",
      },
      ja: {
        title: "ページタイトル",
        content: "ページ内容",
      },
    }),
  },
} satisfies DeclarationContent;

export default customContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

export default {
  key: "custom_content",
  content: {
    profileText:
      t <
      ICustomContent >
      {
        en: {
          title: "Page Title",
          content: "Page Content",
        },
        fr: {
          title: "Titre de la Page",
          content: "Contenu de la Page",
        },
        es: {
          title: "Título de la Página",
          content: "Contenido de la Página",
        },
        ja: {
          title: "ページタイトル",
          content: "ページ内容",
        },
      },
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "custom_content",
  content: {
    profileText:
      t <
      ICustomContent >
      {
        en: {
          title: "Page Title",
          content: "Page Content",
        },
        fr: {
          title: "Titre de la Page",
          content: "Contenu de la Page",
        },
        es: {
          title: "Título de la Página",
          content: "Contenido de la Página",
        },
        ja: {
          title: "ページタイトル",
          content: "ページ内容",
        },
      },
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "key": "custom_content",
  "content": {
    "profileText": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "title": "Page Title",
          "content": "Page Content"
        },
        "fr": {
          "title": "Titre de la Page",
          "content": "Contenu de la Page"
        },
        "es": {
          "title": "Título de la Página",
          "content": "Contenido de la Página"
        },
        "ja": {
          "title": "ページタイトル",
          "content": "ページ内容"
        }
      }
    }
  }
}
```
