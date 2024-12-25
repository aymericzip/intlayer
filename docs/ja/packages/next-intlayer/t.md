# Documentation: `t` Function in `next-intlayer`

`next-intlayer` パッケージの `t` 関数は、あなたの Next.js アプリケーション内でインライン国際化を行うための基本的なツールです。これにより、コンポーネント内で直接翻訳を定義でき、現在のロケールに基づいてローカライズされたコンテンツを表示するのが簡単になります。

---

## 概要

`t` 関数は、コンポーネント内で直接異なるロケールの翻訳を提供するために使用されます。サポートされている各ロケールの翻訳を含むオブジェクトを渡すことにより、`t` は Next.js アプリケーション内の現在のロケールコンテキストに基づいて適切な翻訳を返します。

---

## 主な機能

- **インライン翻訳**: 別のコンテンツ宣言を必要としないクイックなインラインテキストに最適です。
- **自動ロケール選択**: 現在のロケールに対応する翻訳を自動的に返します。
- **TypeScriptサポート**: TypeScriptを使用する際の型安全性と自動補完を提供します。
- **簡単な統合**: Next.jsのクライアントおよびサーバーコンポーネントの中でシームレスに機能します。

---

## 関数シグネチャ

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### パラメータ

- `translations`: キーがロケールコード（例：`en`, `fr`, `es`）であり、値が対応する翻訳された文字列であるオブジェクト。

### 戻り値

- 現在のロケールに対する翻訳コンテンツを表す文字列。

---

## 使用例

### クライアントコンポーネントでの `t` の使用

クライアントサイドコンポーネントで `t` を使用する際は、コンポーネントファイルの最上部に `'use client';` 指令を含める必要があります。

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer";

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

### サーバーコンポーネントでの `t` の使用

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

### 属性内でのインライン翻訳

`t` 関数は、JSX属性内でのインライン翻訳に特に便利です。
`alt`、`title`、`href`、または `aria-label` などの属性をローカライズする際は、属性内で直接 `t` を使用できます。

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

### TypeScript統合

`t` 関数は TypeScript を使用する際に型安全であり、必要なロケールがすべて提供されていることを保証します。

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### ロケール検出とコンテキスト

`next-intlayer` では、現在のロケールはコンテキストプロバイダー `IntlayerClientProvider` および `IntlayerServerProvider` を通じて管理されます。これらのプロバイダーがコンポーネントをラップし、`locale` プロップが正しく渡されていることを確認してください。

#### 例:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* ここにコンポーネントを追加 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* ここにコンポーネントを追加 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* ここにコンポーネントを追加 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## 一般的なエラーとトラブルシューティング

### `t` が未定義または不正確な翻訳を返す

- **原因**: 現在のロケールが正しく設定されていない、または現在のロケールの翻訳が欠落しています。
- **解決策**:
  - `IntlayerClientProvider` または `IntlayerServerProvider` が適切な `locale` で正しく設定されていることを確認してください。
  - 翻訳オブジェクトがすべての必要なロケールを含んでいることを確認してください。

### TypeScriptでの翻訳の欠如

- **原因**: 翻訳オブジェクトが必要なロケールを満たしておらず、TypeScriptエラーが発生しています。
- **解決策**: `IConfigLocales` 型を使用して翻訳を完全にすることを強制してください。

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' が欠落していると TypeScript エラーが発生します [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' が欠落していると TypeScript エラーが発生します [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' が欠落していると TypeScript エラーが発生します [!code error]
};

const text = t(translations);
```

---

## 効率的な使用のためのヒント

1. **シンプルなインライン翻訳には `t` を使用**: コンポーネント内で直接小さなテキストを翻訳するのに最適です。
2. **構造化されたコンテンツには `useIntlayer` を選択**: より複雑な翻訳やコンテンツ再利用については、宣言ファイルでコンテンツを定義し、`useIntlayer` を使用します。
3. **一貫したロケール提供**: アプリケーション全体で、適切なプロバイダーを介してロケールが一貫して提供されることを確認してください。
4. **TypeScriptを活用**: TypeScript タイプを使用して欠落している翻訳を検出し、型安全性を確保します。

---

## 結論

`next-intlayer` の `t` 関数は、Next.js アプリケーション内でインライン翻訳を管理するための強力で便利なツールです。これを効果的に統合することにより、アプリの国際化機能を強化し、世界中のユーザーにより良い体験を提供します。

詳細な使用法や高度な機能については、[next-intlayerドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md)を参照してください。

---

**注意**: 現在のロケールがコンポーネントに正しく渡されることを確実にするために、`IntlayerClientProvider` と `IntlayerServerProvider` を適切に設定してください。これは、`t` 関数が正しい翻訳を返すために重要です。
