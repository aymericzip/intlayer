# ドキュメント: `t` 関数 in `react-intlayer`

`react-intlayer` パッケージの `t` 関数は、React アプリケーション内でインライン国際化を行うための基本的なツールです。これにより、コンポーネント内で直接翻訳を定義でき、現在のロケールに基づいてローカライズされたコンテンツを表示することが簡単になります。

---

## 概要

`t` 関数は、コンポーネント内で異なるロケールの翻訳を提供するために使用されます。各サポートされているロケールの翻訳を含むオブジェクトを渡すことによって、`t` は React アプリケーション内の現在のロケールコンテキストに基づいて適切な翻訳を返します。

---

## 主な機能

- **インライン翻訳**: 別のコンテンツ宣言を必要としない迅速なインラインテキストに最適です。
- **自動ロケール選択**: 現在のロケールに対応する翻訳を自動的に返します。
- **TypeScript サポート**: TypeScript と共に使用する際に、型安全性と自動補完を提供します。
- **簡単な統合**: React コンポーネント内でシームレスに機能します。

---

## 関数シグネチャ

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### パラメータ

- `translations`: キーがロケールコード（例: `en`, `fr`, `es`）で、値がそれに対応する翻訳された文字列のオブジェクトです。

### 戻り値

- 現在のロケールの翻訳されたコンテンツを表す文字列。

---

## 使用例

### コンポーネント内での `t` の基本的な使用法

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

### 属性内のインライン翻訳

`t` 関数は、JSX 属性内でのインライン翻訳に特に便利です。`alt`、`title`、`href`、または `aria-label` のような属性をローカライズする際に、属性内で直接 `t` を使用できます。

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

## 高度なトピック

### TypeScript 統合

`t` 関数は TypeScript と共に使用されると型安全性を提供し、必要なロケールがすべて提供されていることを保証します。

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

### ロケール検出とコンテキスト

`react-intlayer` では、現在のロケールが `IntlayerProvider` を通じて管理されます。このプロバイダーがコンポーネントをラップし、`locale` プロップが正しく渡されていることを確認してください。

#### 例:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* コンポーネントはここに置いてください */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* コンポーネントはここに置いてください */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* コンポーネントはここに置いてください */}
  </IntlayerProvider>
);
```

---

## 一般的なエラーとトラブルシューティング

### `t` が未定義または誤った翻訳を返す

- **原因**: 現在のロケールが正しく設定されていないか、現在のロケールに対する翻訳が欠落しています。
- **解決策**:
  - `IntlayerProvider` が適切な `locale` で正しく設定されていることを確認します。
  - 翻訳オブジェクトに必要なすべてのロケールが含まれていることを確認してください。

### TypeScript で翻訳が欠落している

- **原因**: 翻訳オブジェクトが必要なロケールを満たしていないために TypeScript エラーが発生しています。
- **解決策**: `IConfigLocales` 型を使用して翻訳の完全性を強制します。

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' が欠落していると TypeScript エラーが発生します
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' が欠落していると TypeScript エラーが発生します
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' が欠落していると TypeScript エラーが発生します
};

const text = t(translations);
```

---

## 効果的な使用のためのヒント

1. **シンプルなインライン翻訳には `t` を使用**: 直接コンポーネント内で小さなテキストを翻訳するのに最適です。
2. **構造化されたコンテンツには `useIntlayer` を推奨**: より複雑な翻訳やコンテンツの再利用には、宣言ファイルでコンテンツを定義し、`useIntlayer` を使用します。
3. **一貫したロケール提供**: アプリケーション全体で `IntlayerProvider` を通じて一貫してロケールを提供してください。
4. **TypeScript を活用**: TypeScript の型を使用して、欠落している翻訳を検出し、型の安全性を確保します。

---

## 結論

`react-intlayer` の `t` 関数は、React アプリケーション内でインライン翻訳を管理するための強力で便利なツールです。これを効果的に統合することで、アプリの国際化機能を強化し、世界中のユーザーにより良い体験を提供します。

詳細な使用法や高度な機能については、[react-intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md) を参照してください。

---

**注意**: 現在のロケールがコンポーネントに正しく渡されるように `IntlayerProvider` を適切に設定することを忘れないでください。これは、`t` 関数が正しい翻訳を返すために重要です。
