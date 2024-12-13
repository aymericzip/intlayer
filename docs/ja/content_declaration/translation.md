# 翻訳

## 翻訳の定義

`intlayer` の `t` 関数を使用すると、複数の言語でコンテンツを宣言できます。この関数は型安全性を保証し、翻訳が欠けている場合にはエラーを発生させます。これは特に TypeScript 環境で有用です。

### TypeScript の使用

TypeScript ファイルで翻訳を使用してコンテンツを宣言する方法の例は次のとおりです：

```typescript
import { t, type DeclarationContent } from "intlayer";

const multiLangContent = {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies DeclarationContent;

export default multiLangContent;
```

### ECMAScript モジュールの使用

ECMAScript モジュールを使用している場合、宣言は次のようになります：

```javascript
import { t } from "intlayer";

const multiLangContent = {
  id: "multi_lang",
  welcomeMessage: t({
    en: "Welcome to our application",
    fr: "Bienvenue dans notre application",
    es: "Bienvenido a nuestra aplicación",
  }),
};

export default multiLangContent;
```

### CommonJS モジュールの使用

CommonJS セットアップでは、翻訳を次のように宣言できます：

```javascript
const { t } = require("intlayer");

const multiLangContent = {
  id: "multi_lang",
  welcomeMessage: t({
    en: "Welcome to our application",
    fr: "Bienvenue dans notre application",
    es: "Bienvenido a nuestra aplicación",
  }),
};

module.exports = multiLangContent;
```

### JSON の使用

JSON ベースの宣言では、翻訳を次のように定義できます：

```json
{
  "id": "multi_lang",
  "welcomeMessage": {
    "nodeType": "translation",
    "en": "Welcome to our application",
    "fr": "Bienvenue dans notre application",
    "es": "Bienvenido a nuestra aplicación"
  }
}
```

## ロケールの設定

適切な翻訳処理を確保するために、`intlayer.config.ts` で受け入れられるロケールを設定できます。この設定により、アプリケーションがサポートする言語を定義できます：

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## React コンポーネントでの翻訳の使用

`react-intlayer` を使用すると、React コンポーネントで翻訳を使用できます。例は次のとおりです：

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

このコンポーネントは、アプリケーションに設定されている現在のロケールに基づいて対応する翻訳を取得します。

## カスタムコンテンツオブジェクト

`intlayer` は、翻訳のためのカスタムコンテンツオブジェクトをサポートしており、型安全性を確保しながら、より複雑な構造を定義できます。カスタムオブジェクトの例は次のとおりです：

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
