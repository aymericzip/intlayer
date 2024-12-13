# Documentation: `t` Function in `react-intlayer`

`react-intlayer` パッケージの `t` 関数は、React アプリケーション内でのインライン国際化のための基本的なツールです。コンポーネント内で直接翻訳を定義することができ、現在のロケールに基づいてローカライズされたコンテンツを表示するのが簡単です。

---

## 概要

`t` 関数は、コンポーネント内で異なるロケールの翻訳を提供するために使用されます。サポートされている各ロケールの翻訳を含むオブジェクトを渡すことで、`t` はReact アプリケーションの現在のロケールコンテキストに基づいて適切な翻訳を返します。

---

## 主な機能

- **インライン翻訳**: 別途コンテンツを宣言する必要のない、迅速なインラインテキストに最適です。
- **自動ロケール選択**: 現在のロケールに対応する翻訳を自動的に返します。
- **TypeScript サポート**: TypeScript を使用する際に型安全性とオートコンプリートを提供します。
- **簡単な統合**: React コンポーネント内でシームレスに動作します。

---

## 関数シグネチャ

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### パラメータ

- `translations`: キーがロケールコード（例: `en`, `fr`, `es`）であり、値が対応する翻訳された文字列であるオブジェクト。

### 戻り値

- 現在のロケールの翻訳されたコンテンツを表す文字列。

---

## 使用例

### コンポーネント内の `t` の基本的な使用法

```tsx
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

### 属性内のインライン翻訳

`t` 関数は、JSX の属性内でのインライン翻訳に特に便利です。`alt`、`title`、`href`、または `aria-label` のような属性をローカライズする際には、属性内で直接 `t` を使用できます。

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

`t` 関数は TypeScript を使用する際に型安全であり、すべての必須ロケールが提供されることを確実にします。

```typescript
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### ロケール検出とコンテキスト

`react-intlayer` では、現在のロケールは `IntlayerProvider` を通じて管理されます。このプロバイダーがコンポーネントをラップし、`locale` プロパティが正しく渡されることを確認してください。

#### 例:

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* ここにあなたのコンポーネント */}
  </IntlayerProvider>
);
```

---

## 一般的なエラーとトラブルシューティング

### `t` が未定義または不正確な翻訳を返す

- **原因**: 現在のロケールが正しく設定されていない、または現在のロケールに対する翻訳が欠けている。
- **解決策**:
  - `IntlayerProvider` が適切な `locale` で正しく設定されていることを確認してください。
  - 翻訳オブジェクトにすべての必要なロケールが含まれていることを確認してください。

### TypeScript での翻訳の欠如

- **原因**: 翻訳オブジェクトが必要なロケールを満たしていないため、TypeScript エラーが発生する。
- **解決策**: `IConfigLocales` 型を使用して翻訳の完全性を強制してください。

```typescript
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' が欠けていると TypeScript エラーが発生します
};

const text = t(translations);
```

---

## 効果的な使用のためのヒント

1. **簡単なインライン翻訳には `t` を使用**: コンポーネント内に直接小さなテキストを翻訳するのに最適です。
2. **構造化されたコンテンツには `useIntlayer` を推奨**: より複雑な翻訳とコンテンツの再利用に対しては、宣言ファイルにコンテンツを定義し、`useIntlayer` を使用します。
3. **一貫したロケールの提供**: `IntlayerProvider` を通じて、アプリケーション全体で一貫してロケールが提供されていることを確認してください。
4. **TypeScript を活用**: TypeScript の型を使用して翻訳の見逃しを検出し、型安全性を確保します。

---

## 結論

`react-intlayer` の `t` 関数は、React アプリケーションにおけるインライン翻訳を管理するための強力で便利なツールです。これを効果的に統合することで、アプリの国際化機能を向上させ、世界中のユーザーにより良い体験を提供します。

詳細な使用法や高度な機能については、[react-intlayer documentation](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md) を参照してください。

---

**注意**: `IntlayerProvider` を正しく設定して、現在のロケールがコンポーネントに正しく渡されることを確認することを忘れないでください。これは、`t` 関数が正しい翻訳を返すために重要です。
