# Documentation: `t` 関数 in `next-intlayer`

`next-intlayer` パッケージの `t` 関数は、Next.js アプリケーション内でのインライン国際化の基本的なツールです。これは、コンポーネント内で翻訳を直接定義することを可能にし、現在のロケールに基づいてローカライズされたコンテンツを簡単に表示できます。

---

## 概要

`t` 関数は、コンポーネント内で異なるロケールの翻訳を提供するために使用されます。それぞれのサポートされたロケールの翻訳を含むオブジェクトを渡すことで、`t` は Next.js アプリケーション内の現在のロケールコンテキストに基づいて適切な翻訳を返します。

---

## 主な機能

- **インライン翻訳**: 別々のコンテンツ宣言を必要としない迅速なインラインテキストに最適です。
- **自動ロケール選択**: 現在のロケールに対応する翻訳を自動的に返します。
- **TypeScript サポート**: TypeScript と共に使用する際に型安全性と自動補完を提供します。
- **簡単な統合**: Next.js のクライアントおよびサーバーコンポーネントの両方内でシームレスに機能します。

---

## 関数シグネチャ

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### パラメーター

- `translations`: キーがロケールコード（例: `en`, `fr`, `es`）で、値が対応する翻訳文字列のオブジェクト。

### 戻り値

- 現在のロケールの翻訳されたコンテンツを表す文字列。

---

## 使用例

### クライアントコンポーネントでの `t` の使用

クライアントサイドのコンポーネントで `t` を使用する場合は、コンポーネントファイルの先頭に `'use client';` ディレクティブを含める必要があります。

```tsx
"use client";

import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is the content of a client component example",
          fr: "Ceci est le contenu d'un exemple de composant client",
          es: "Este es el contenido d un ejemplo de componente cliente",
        })}
      </p>
    </div>
  );
};
```

### サーバーコンポーネントでの `t` の使用

```tsx
import { t } from "next-intlayer/server";

export const ServerComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is the content of a server component example",
          fr: "Ceci est le contenu d'un exemple de composant serveur",
          es: "Este es el contenido de un ejemplo de componente servidor",
        })}
      </p>
    </div>
  );
};
```

### 属性のインライン翻訳

`t` 関数は、JSX 属性内でのインライン翻訳に特に便利です。
`alt`、`title`、`href`、または `aria-label` のような属性のローカライズに、属性内で直接 `t` を使用できます。

```tsx
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

`t` 関数は TypeScript とともに使用する際に型安全であり、必要なすべてのロケールが提供されていることを保証します。

```typescript
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### ロケール検出とコンテキスト

`next-intlayer` では、現在のロケールはコンテキストプロバイダーを通じて管理されます: `IntlayerClientProvider` と `IntlayerServerProvider`。これらのプロバイダーがあなたのコンポーネントを包み、`locale` プロパティが正しく渡されることを確認してください。

#### 例:

```tsx
import { IntlayerClientProvider } from "next-intlayer";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* コンポーネントをここに配置 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## 一般的なエラーとトラブルシューティング

### `t` が未定義または間違った翻訳を返す

- **原因**: 現在のロケールが正しく設定されていない、または現在のロケールの翻訳が欠落しています。
- **解決策**:
  - `IntlayerClientProvider` または `IntlayerServerProvider` が適切な `locale` で正しく設定されていることを確認します。
  - 翻訳オブジェクトが必要なすべてのロケールを含んでいることを確認してください。

### TypeScript の翻訳が欠落している

- **原因**: 翻訳オブジェクトが必要なロケールを満たしておらず、TypeScript エラーが発生しています。
- **解決策**: `IConfigLocales` 型を使用して翻訳の完全性を強制してください。

```typescript
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' が欠落すると TypeScript エラーが発生します
};

const text = t(translations);
```

---

## 効果的な使用のためのヒント

1. **シンプルなインライン翻訳には `t` を使用**: テキストを直接コンポーネント内で翻訳するのに最適です。
2. **構造化されたコンテンツには `useIntlayer` を優先**: より複雑な翻訳やコンテンツの再利用が必要な場合は、宣言ファイルにコンテンツを定義し、`useIntlayer` を使用します。
3. **ロケールの一貫した提供**: 適切なプロバイダーを通じて、アプリケーション全体でロケールが一貫して提供されていることを確認してください。
4. **TypeScriptを活用**: TypeScript 型を使用して欠落した翻訳を捕捉し、型安全性を確保します。

---

## 結論

`next-intlayer` の `t` 関数は、Next.js アプリケーションにおけるインライン翻訳を管理するための強力で便利なツールです。効果的に統合することで、アプリの国際化機能を強化し、世界中のユーザーにとってより良い体験を提供します。

詳細な使用法や高度な機能については、[next-intlayer ドキュメンテーション](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md)を参照してください。

---

**注意**: `IntlayerClientProvider` と `IntlayerServerProvider` を適切に設定し、現在のロケールがコンポーネントに正しく渡されるようにしてください。これは、`t` 関数が正しい翻訳を返すために重要です。
