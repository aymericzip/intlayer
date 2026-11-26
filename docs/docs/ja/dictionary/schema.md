---
createdAt: 2026-11-25
updatedAt: 2026-11-25
priority: 8
title: "スキーマで辞書を検証する (Zod)"
description: "intlayer.config.ts で Zod スキーマを宣言して辞書に紐づけ、ビルド時にすべてのロケールを検証し、エディタでコンテンツに型を付けます。"
keywords:
  - スキーマ
  - Zod
  - バリデーション
  - 辞書
  - コンテンツ宣言
  - 型安全
  - Intlayer
slugs:
  - doc
  - concept
  - content
  - schema
history:
  - version: 9.9.0
    date: 2026-11-25
    changes: "ドキュメントの初版"
author: aymericzip
---

# スキーマで辞書を検証する

スキーマは、辞書コンテンツの期待される構造を記述します。`intlayer.config.ts` で一度だけ宣言して名前を付け、その名前を `schema` フィールドで任意の辞書に紐づけます。

すると Intlayer は次のことを行います。

- 辞書のビルド時に、すべてのロケールについて辞書を**検証**し、各エラーをロケールとフィールドパス付きで報告します。
- エディタで辞書のコンテンツに**型を付け**、フィールドの欠落や型の誤りをビルド前に検出します。

スキーマは、複数の辞書が同じ構造を共有する必要がある場合（SEO メタデータ、商品カード、CMS 風のエントリなど）や、各翻訳の最大文字数のように TypeScript では表現できない制約をコンテンツに課したい場合に役立ちます。

<Steps>
<Step number={1} title="設定でスキーマを宣言する">

[Zod](https://zod.dev) をインストールします。

```bash packageManager="npm"
npm install zod --save-dev
```

```bash packageManager="pnpm"
pnpm add zod --save-dev
```

```bash packageManager="yarn"
yarn add zod --dev
```

```bash packageManager="bun"
bun add zod --dev
```

次に、`schemas` キーの下にスキーマを宣言します。各キーが、辞書から参照する名前になります。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(10).max(60),
      description: z.string().min(50).max(160),
    }),
    "product-card": z.object({
      name: z.string(),
      price: z.number().positive(),
      tags: z.array(z.string()),
    }),
  },
};

export default config;
```

</Step>
<Step number={2} title="辞書にスキーマを紐づける">

辞書の `schema` フィールドに、設定で宣言した名前のいずれかを指定します。

```typescript fileName="src/about/aboutMetadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutMetadataContent = {
  key: "about-metadata",
  schema: "seo-metadata",
  content: {
    title: t({
      en: "About us | Our story",
      fr: "À propos | Notre histoire",
      es: "Sobre nosotros | Nuestra historia",
    }),
    description: t({
      en: "Discover the team, the mission and the values behind our product.",
      fr: "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
      es: "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
    }),
  },
} satisfies Dictionary<undefined, "seo-metadata">;

export default aboutMetadataContent;
```

```json5 fileName="src/about/aboutMetadata.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-metadata",
  "schema": "seo-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About us | Our story",
        "fr": "À propos | Notre histoire",
        "es": "Sobre nosotros | Nuestra historia",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover the team, the mission and the values behind our product.",
        "fr": "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
        "es": "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
      },
    },
  },
}
```

同じスキーマを必要なだけ多くの辞書に紐づけられます。

</Step>
<Step number={3} title="ビルドしてレポートを確認する">

検証は Intlayer が辞書をビルドするたびに実行されます。`npx intlayer build` でも、dev モードと build モードのバンドラープラグイン経由でも同様です。翻訳がスキーマに違反すると、Intlayer はロケール、フィールドパス、Zod のメッセージをログに出力します。

```bash
[intlayer] Local dictionary about-metadata has invalid content according to schema seo-metadata for locale French (fr) - src/about/aboutMetadata.content.ts
[intlayer] ✗ Error: about-metadata - French (fr) - title: Too big: expected string to have <=60 characters
```

`intlayer build` を一度だけ実行すると、スキーマ名が未登録の場合や検証に失敗した場合にビルドが失敗します。監視モードでは、内容が修正されるまで無効な辞書はビルドから除外されます。

</Step>
</Steps>

<AccordionGroup>
<Accordion header="Markdown のフロントマター">

Markdown を表示する前に、`title`、`description`、`date`、`tags` などの frontmatter フィールドを検証します。必須項目と想定される型は辞書のビルド時に確認され、不正なメタデータはロケールとフィールドのパスとともに報告されます。

</Accordion>
<Accordion header="SEO メタデータ">

ページタイトルや説明、canonical URL、ソーシャル画像、インデックス指定に使うメタデータを検証します。スキーマでタイトルを1〜60文字に制限し、説明を160文字以内にし、URLの形式も確認できます。ロケールのコンテンツに問題があれば、ページ表示時のエラーになる前に検出されます。

</Accordion>
<Accordion header="共通の構造化コンテンツ">

商品、ナビゲーション項目、メールテンプレートなど、同じ構造を持つ辞書に同じスキーマを適用します。フィールドの欠落や型の誤りがある辞書はビルド時に無効となり、整合性のないコンテンツがアプリに入るのを防ぎます。

</Accordion>
</AccordionGroup>

## スキーマからコンテンツに型を付ける

`Dictionary` のジェネリクスパラメータによって、TypeScript が辞書をどれだけ厳密にチェックするかが決まります。

| 宣言                                                    | `schema` フィールド               | `content` フィールド            |
| ------------------------------------------------------- | --------------------------------- | ------------------------------- |
| `satisfies Dictionary`                                  | 補完される、未知の名前はエラー    | TypeScript ではチェックされない |
| `satisfies Dictionary<undefined, "seo-metadata">`       | `"seo-metadata"` である必要がある | スキーマから型付け              |
| `satisfies Dictionary<{ cta: string }, "seo-metadata">` | `"seo-metadata"` である必要がある | スキーマと独自の型から型付け    |

型付きスキーマでは、各フィールドはプレーンな値か、その値を生成するコンテンツノードのどちらも受け付けるため、`t()` は引き続き使えます。

```typescript fileName="src/product/productCard.content.ts"
import { t, type Dictionary } from "intlayer";

const productCardContent = {
  key: "product-card",
  schema: "product-card",
  content: {
    name: t({ en: "Running shoes", fr: "Chaussures de course" }),
    price: "89", // ❌ Type 'string' is not assignable to type 'number'
    tags: ["sport", "outdoor"],
  },
} satisfies Dictionary<undefined, "product-card">;

export default productCardContent;
```

> Intlayer は辞書をビルドするたびに、Zod スキーマからこれらの型を `.intlayer/types` に生成します。型付けされるのは構造のみで、`.min()`、`.max()`、`.regex()` などの制約はビルド時にチェックされます。

## 検証される内容

`internationalization.locales` に列挙された各ロケールについて、Intlayer はそのロケールで辞書コンテンツを解決し、その結果を検証します。そのため、スキーマは翻訳を保持する `t()` ノードではなく、フィールドの最終的な値（`title: string`）を記述します。

- **欠落している翻訳**: デフォルトの `strictMode` では、欠落した翻訳は検証前にデフォルトロケールへフォールバックします。`strictMode: "strict"` では、欠落した翻訳により必須フィールドが失敗します。
- **その他のコンテンツノード**: `enu()`、`plural()`、`cond()`、`gender()`、`select()`、`insert()` は関数に解決され、`md()` や `html()` はノードに解決されます。これらのフィールドは `z.any()` で宣言し、制約はプレーンな値に解決されるフィールドに設定してください。
- **検証されないもの**: 関数や Promise で提供されるコンテンツ（[function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/function_fetching.md)）と、[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) から取得される辞書。

## 別のバリデーションライブラリを使う

`schemas` のエントリは Zod に限定されません。Zod 互換の `safeParse(data)` メソッドを持つオブジェクトであれば、`{ success: true }` または `{ success: false, error: { issues } }` を返す限り動作します（各 issue は `path` 配列と `message` を持ちます）。コンテンツの型は Zod スキーマからのみ生成されるため、別のライブラリを使う場合、紐づけた辞書のコンテンツは `any` として型付けされます。

## よくある質問

<FAQ>

<Question title="スキーマエラーでビルドは止まりますか？">

`intlayer build` を一度だけ実行すると、辞書がスキーマに一致しない場合にビルドが失敗します。監視モードでは、Intlayer はエラーを記録し、辞書を修正して保存するまでビルドから除外します。

</Question>
<Question title="複数の辞書で同じスキーマを共有できますか？">

はい。スキーマは名前で参照されるため、任意の数の辞書から参照できます。これが主なユースケースで、すべてのページメタデータ、商品エントリ、メールテンプレートに同じ構造を強制できます。

</Question>
<Question title="スキーマ名が存在しない場合はどうなりますか？">

少なくとも 1 つのスキーマが宣言されていれば、`schema` フィールドは宣言済みの名前しか受け付けないため、TypeScript がエラーを報告します。JSON ファイルで未登録のスキーマ名を指定すると、Intlayer はビルド時にエラーを報告し、その辞書を除外します。

</Question>
<Question title="すべてのロケールが検証されますか？それともデフォルトのみですか？">

`internationalization.locales` に列挙されたすべてのロケールです。レポートには失敗したロケールが示されるため、ドイツ語だけ長すぎる翻訳も簡単に見つけられます。

</Question>

</FAQ>

## 関連ドキュメント

- [コンテンツ宣言ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)
- [設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)
- [翻訳](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/translation.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)
