# Translation

## Defining Translations

`intlayer`の`t`関数を使用すると、複数の言語でコンテンツを宣言できます。この関数は型安全性を確保し、翻訳が不足している場合にエラーを発生させます。これは特にTypeScript環境で便利です。

### Using TypeScript

TypeScriptファイルで翻訳付きのコンテンツを宣言する方法の例は次のとおりです：

```typescript
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
    }),
  },
} satisfies DeclarationContent<Content>;
```

### Using ECMAScript Modules

ECMAScriptモジュールを使用している場合、宣言は次のようになります：

```javascript
import { t } from "intlayer";

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
};
```

### Using CommonJS Modules

CommonJSセットアップでは、次のように翻訳を宣言できます：

```javascript
const { t } = require("intlayer");

module.exports = {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
};
```

### Using JSON

JSONベースの宣言では、次のように翻訳を定義できます：

```json
{
  "key": "multi_lang",
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación"
      }
    }
  }
}
```

## Configuration for Locales

正しい翻訳処理を確保するために、`intlayer.config.ts`で受け入れられるロケールを設定できます。この構成では、アプリケーションがサポートする言語を定義できます：

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## Using Translations in React Components

`react-intlayer`を使用すると、Reactコンポーネントで翻訳を利用できます。以下はその例です：

```jsx
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

このコンポーネントは、アプリケーションで設定された現在のロケールに基づいて対応する翻訳を取得します。

## Custom Content Objects

`intlayer`は、翻訳用のカスタムコンテンツオブジェクトをサポートしており、型安全性を保ちながらより複雑な構造を定義できます。以下はカスタムオブジェクトの例です：

```typescript
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
    }),
  },
} satisfies DeclarationContent;

export default customContent;
```
