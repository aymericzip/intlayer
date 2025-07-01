---
docName: package__next-intlayer__t
url: https://intlayer.org/doc/packages/next-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: t 関数のドキュメント | next-intlayer
description: next-intlayer パッケージの t 関数の使い方を説明します
keywords:
  - t
  - 翻訳
  - Intlayer
  - next-intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
---

# ドキュメント: `next-intlayer` の `t` 関数

`next-intlayer` パッケージの `t` 関数は、Next.js アプリケーション内でのインライン国際化の基本的なツールです。コンポーネント内で直接翻訳を定義できるため、現在のロケールに基づいたローカライズされたコンテンツを簡単に表示できます。

---

## 概要

`t` 関数は、コンポーネント内で異なるロケールの翻訳を直接提供するために使用されます。サポートされている各ロケールの翻訳を含むオブジェクトを渡すことで、Next.js アプリケーションの現在のロケールコンテキストに基づいて適切な翻訳を返します。

---

## 主な特徴

- **インライン翻訳**: 別途コンテンツ宣言を必要としない、素早くインラインでテキストを表示するのに最適です。
- **自動ロケール選択**: 現在のロケールに対応する翻訳を自動的に返します。
- **TypeScript サポート**: TypeScript 使用時に型安全性とオートコンプリートを提供します。
- **簡単な統合**: Next.js のクライアントコンポーネントとサーバーコンポーネントの両方でシームレスに動作します。

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

### クライアントコンポーネントでの `t` の使用

`'use client';` ディレクティブをクライアントサイドコンポーネントで `t` を使用する際には、コンポーネントファイルの先頭に必ず含めてください。

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
      es: "Este es le contenido d un ejemplo de componente cliente",
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

### 属性内のインライン翻訳

`t` 関数は、JSX属性内のインライン翻訳に特に便利です。
`alt`、`title`、`href`、`aria-label` のような属性をローカライズする際に、属性内で直接 `t` を使用できます。

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

`t` 関数は TypeScript と共に使用すると型安全であり、必要なすべてのロケールが提供されていることを保証します。

```typescript codeFormat="typescript"
typescript;
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### ロケール検出とコンテキスト

`next-intlayer` では、現在のロケールはコンテキストプロバイダーである `IntlayerClientProvider` と `IntlayerServerProvider` を通じて管理されます。これらのプロバイダーがコンポーネントをラップし、`locale` プロパティが正しく渡されていることを確認してください。

#### 例:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* ここにコンポーネントを配置 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* ここにコンポーネントを配置 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* ここにコンポーネントを配置 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## よくあるエラーとトラブルシューティング

### `t` が未定義または誤った翻訳を返す場合

- **原因**: 現在のロケールが正しく設定されていないか、現在のロケールの翻訳が存在しない。
- **解決策**:
  - `IntlayerClientProvider` または `IntlayerServerProvider` が適切な `locale` で正しく設定されていることを確認してください。
  - 翻訳オブジェクトに必要なすべてのロケールが含まれていることを確認してください。

### TypeScriptでの翻訳の欠落

- **原因**: 翻訳オブジェクトが必要なロケールを満たしておらず、TypeScriptのエラーが発生する。
- **解決策**: `IConfigLocales` 型を使用して翻訳の完全性を強制してください。

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es'が欠落しているとTypeScriptエラーが発生します [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es'が欠落しているとTypeScriptエラーが発生します [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es'が欠落しているとTypeScriptエラーが発生します [!code error]
};

const text = t(translations);
```

---

## 効果的な使用のためのヒント

1. **シンプルなインライン翻訳には `t` を使用する**: コンポーネント内で小さなテキストを直接翻訳するのに最適です。
2. **構造化されたコンテンツには `useIntlayer` を推奨**：より複雑な翻訳やコンテンツの再利用には、宣言ファイルでコンテンツを定義し、`useIntlayer` を使用してください。
3. **一貫したロケールの提供**：適切なプロバイダーを通じて、アプリケーション全体でロケールが一貫して提供されていることを確認してください。
4. **TypeScript を活用**：TypeScript の型を利用して、翻訳の欠落を検出し、型の安全性を確保しましょう。

---

## 結論

`next-intlayer` の `t` 関数は、Next.js アプリケーション内でインライン翻訳を管理するための強力で便利なツールです。これを効果的に統合することで、アプリの国際化機能が向上し、世界中のユーザーにより良い体験を提供できます。

より詳細な使用方法や高度な機能については、[next-intlayer ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を参照してください。

---

**注意**: `IntlayerClientProvider` と `IntlayerServerProvider` を適切に設定し、現在のロケールがコンポーネントに正しく渡されるようにしてください。これは、`t` 関数が正しい翻訳を返すために非常に重要です。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
