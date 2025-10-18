---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: t 関数ドキュメント | react-intlayer
description: react-intlayer パッケージの t 関数の使い方を参照してください
keywords:
  - t
  - 翻訳
  - Intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴初期化
---

# ドキュメント: `react-intlayer` の `t` 関数

`react-intlayer` パッケージの `t` 関数は、React アプリケーション内でのインライン国際化の基本的なツールです。コンポーネント内で直接翻訳を定義できるため、現在のロケールに基づいてローカライズされたコンテンツを簡単に表示できます。

---

## 概要

`t` 関数は、異なるロケールの翻訳をコンポーネント内で直接提供するために使用されます。サポートされている各ロケールの翻訳を含むオブジェクトを渡すことで、`t` は React アプリケーションの現在のロケールコンテキストに基づいて適切な翻訳を返します。

---

## 主な特徴

- **インライン翻訳**: 別途コンテンツ宣言を必要としない、迅速なインラインテキストに最適です。
- **自動ロケール選択**: 現在のロケールに対応する翻訳を自動的に返します。
- **TypeScript サポート**: TypeScript 使用時に型安全性とオートコンプリートを提供します。
- **簡単な統合**: React コンポーネント内でシームレスに動作します。

---

## 関数シグネチャ

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### パラメータ

- `translations`: キーがロケールコード（例: `en`, `fr`, `es`）、値が対応する翻訳文字列のオブジェクト。

### 戻り値

- 現在のロケールに対応する翻訳済みコンテンツの文字列。

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

`t` 関数は、JSXの属性内でのインライン翻訳に特に便利です。`alt`、`title`、`href`、`aria-label` のような属性をローカライズする際に、属性内で直接 `t` を使用できます。

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
      en: "美しい風景",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## 高度なトピック

### TypeScriptとの統合

`t`関数はTypeScriptで使用すると型安全であり、必要なすべてのロケールが提供されていることを保証します。

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

`react-intlayer` では、現在のロケールは `IntlayerProvider` を通じて管理されます。このプロバイダーがコンポーネントをラップし、`locale` プロパティが正しく渡されていることを確認してください。

#### 例:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* ここにコンポーネントを配置 */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* ここにコンポーネントを配置 */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* ここにコンポーネントを配置 */}
  </IntlayerProvider>
);
```

---

## よくあるエラーとトラブルシューティング

### `t` が undefined または誤った翻訳を返す

- **原因**: 現在のロケールが正しく設定されていないか、現在のロケールの翻訳が欠落している。
- **解決策**:
  - `IntlayerProvider` が適切な `locale` で正しく設定されていることを確認する。
  - 翻訳オブジェクトに必要なすべてのロケールが含まれていることを確認する。

### TypeScriptでの翻訳欠落

- **原因**: 翻訳オブジェクトが必要なロケールを満たしておらず、TypeScriptのエラーが発生する。
- **解決策**: `IConfigLocales` 型を使用して翻訳の完全性を強制する。

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' が欠落するとTypeScriptエラーになる
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

1. **シンプルなインライン翻訳には `t` を使用する**：コンポーネント内で小さなテキストを直接翻訳するのに最適です。
2. **構造化されたコンテンツには `useIntlayer` を優先する**：より複雑な翻訳やコンテンツの再利用には、宣言ファイルでコンテンツを定義し、`useIntlayer` を使用します。
3. **一貫したロケールの提供**: `IntlayerProvider` を通じて、アプリケーション全体でロケールが一貫して提供されていることを確認してください。
4. **TypeScriptの活用**: TypeScriptの型を使用して、翻訳の欠落を検出し、型の安全性を確保しましょう。

---

## 結論

`react-intlayer` の `t` 関数は、Reactアプリケーション内でインライン翻訳を管理するための強力で便利なツールです。これを効果的に統合することで、アプリの国際化機能を強化し、世界中のユーザーにより良い体験を提供できます。

より詳細な使用方法や高度な機能については、[react-intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を参照してください。

---

**注意**: `IntlayerProvider` を適切に設定し、現在のロケールがコンポーネントに正しく渡されるようにしてください。これは、`t` 関数が正しい翻訳を返すために非常に重要です。
