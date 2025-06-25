---
docName: package__react-intlayer__t
url: https://intlayer.org/doc/packages/react-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: t関数のドキュメント | react-intlayer
description: react-intlayerパッケージ用のt関数の使い方を見てください
keywords:
  - t
  - 翻訳
  - Intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
---

# ドキュメント: `t` 関数 in `react-intlayer`

`react-intlayer` パッケージの `t` 関数は、React アプリケーション内でインライン国際化を行うための基本ツールです。コンポーネント内で直接翻訳を定義できるため、現在のロケールに基づいてローカライズされたコンテンツを簡単に表示できます。

---

## 概要

`t` 関数は、コンポーネント内で直接異なるロケールの翻訳を提供するために使用されます。サポートされている各ロケールの翻訳を含むオブジェクトを渡すことで、現在の React アプリケーションのロケールコンテキストに基づいて適切な翻訳を返します。

---

## 主な特徴

- **インライン翻訳**: 別のコンテンツ宣言を必要としない、簡単なインラインテキストに最適です。
- **自動ロケール選択**: 現在のロケールに対応する翻訳を自動的に返します。
- **TypeScript サポート**: TypeScript を使用する際に型安全性とオートコンプリートを提供します。
- **簡単な統合**: React コンポーネント内でシームレスに動作します。

---

## 関数シグネチャ

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### パラメータ

- `translations`: キーがロケールコード（例: `en`, `fr`, `es`）、値が対応する翻訳文字列であるオブジェクト。

### 戻り値

- 現在のロケールに対応する翻訳コンテンツを表す文字列。

---

## 使用例

### コンポーネントでの基本的な `t` の使用

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

### 属性内でのインライン翻訳

`t` 関数は、JSX 属性内でのインライン翻訳に特に便利です。`alt`、`title`、`href`、`aria-label` などの属性をローカライズする際に、`t` を直接属性内で使用できます。

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

`t` 関数は TypeScript と一緒に使用する際に型安全であり、すべての必要なロケールが提供されていることを保証します。

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

`react-intlayer` では、現在のロケールは `IntlayerProvider` を通じて管理されます。このプロバイダーがコンポーネントをラップし、`locale` プロップが正しく渡されていることを確認してください。

#### 例:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Your components here */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Your components here */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Your components here */}
  </IntlayerProvider>
);
```

---

## よくあるエラーとトラブルシューティング

### `t` が未定義または間違った翻訳を返す

- **原因**: 現在のロケールが正しく設定されていない、または現在のロケールの翻訳が不足している。
- **解決策**:
  - `IntlayerProvider` が適切な `locale` で正しく設定されていることを確認してください。
  - 翻訳オブジェクトに必要なすべてのロケールが含まれていることを確認してください。

### TypeScript での翻訳不足

- **原因**: 翻訳オブジェクトが必要なロケールを満たしておらず、TypeScript エラーが発生する。
- **解決策**: `IConfigLocales` 型を使用して翻訳の完全性を保証します。

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' が不足していると TypeScript エラーが発生します
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' が不足していると TypeScript エラーが発生します
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' が不足していると TypeScript エラーが発生します
};

const text = t(translations);
```

---

## 効果的な使用のためのヒント

1. **簡単なインライン翻訳には `t` を使用**: コンポーネント内で直接小さなテキストを翻訳するのに最適です。
2. **構造化されたコンテンツには `useIntlayer` を推奨**: より複雑な翻訳やコンテンツの再利用には、宣言ファイルでコンテンツを定義し、`useIntlayer` を使用します。
3. **一貫したロケール提供**: アプリケーション全体でロケールが一貫して提供されるように、`IntlayerProvider` を使用してください。
4. **TypeScript を活用**: TypeScript 型を使用して翻訳不足を検出し、型安全性を確保します。

---

## 結論

`react-intlayer` の `t` 関数は、React アプリケーションでインライン翻訳を管理するための強力で便利なツールです。これを効果的に統合することで、アプリの国際化機能を強化し、世界中のユーザーにより良い体験を提供できます。

詳細な使用方法や高度な機能については、[react-intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md) を参照してください。

---

**注意**: `IntlayerProvider` を適切に設定し、現在のロケールがコンポーネントに正しく渡されるようにしてください。これにより、`t` 関数が正しい翻訳を返すことが保証されます。
