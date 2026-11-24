---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "ngx-translate から Intlayer への移行"
description: "Angular アプリを ngx-translate から Intlayer へ段階的に移行します。compat adapter @intlayer/ngx-translate により、translate パイプ、translate ディレクティブ、TranslateService はそのまま動作します。"
keywords:
  - ngx-translate
  - "@ngx-translate/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - Angular
slugs:
  - doc
  - migration
  - ngx-translate
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# ngx-translate から Intlayer への移行

## ngx-translate から Intlayer に移行する理由

<AccordionGroup>
<Accordion header="HTTP ローダー不要">

ngx-translate は `TranslateHttpLoader` を通じてランタイムにロケールファイルを取得するため、初回レンダリングが遅れます。Intlayer はビルド時に辞書をコンパイルするので、翻訳はすぐに利用できます。

</Accordion>
<Accordion header="保守性">

キーは辞書に対して **型付け** されており、無効なキーはビルド時にエラーになります。コンテンツは、それを使うコンポーネントの隣に配置できます。

</Accordion>
<Accordion header="AI エージェント">

コンポーネントの隣に置かれたコンテンツは、LLM に **必要なコンテキストを減らします**。Intlayer には、翻訳漏れをテストする **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**、**[MCP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**、**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)** が用意されています。

</Accordion>
<Accordion header="自動化">

CI/CD パイプラインで好きな LLM を使って不足しているメッセージを翻訳したり、[Web プラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) でバックグラウンドで翻訳したりできます。

</Accordion>
<Accordion header="非開発者とのスケール">

Intlayer はセルフホスト可能な **[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)** と **[フル機能の CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)** を提供し、翻訳者やコピーライターがリアルタイムでコンテンツを編集できます。

</Accordion>
</AccordionGroup>

> これらのライブラリの成り立ちを知るには、[JavaScript i18n の歴史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/history_of_i18n.md) をお読みください。

## 移行戦略

1. **Compat adapter（既存アプリに推奨）**: `@intlayer/ngx-translate` をインストールします。`@ngx-translate/core` と同じ API（`provideTranslateService`、`TranslateService`、`TranslatePipe`、`TranslateDirective`、`TranslateModule`）を公開し、メッセージを Intlayer の辞書から提供します。テンプレートは変更不要です。
2. **完全移行**: ngx-translate の呼び出しを、`angular-intlayer` の `useIntlayer` とコンポーネントの隣に置いた `.content.ts` ファイルに少しずつ置き換えます。

## 目次

<TOC/>

## クイック移行

<Steps>
<Step number={1} title="依存関係のインストール">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> `--interactive` フラグは任意です。AI エージェントの場合は `intlayer-cli init` を使用してください。

このコマンドは環境を検出し、必要な package をインストールします。例:

```bash packageManager="npm"
npm install intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
npm install -D @angular-builders/custom-esbuild
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
pnpm add -D @angular-builders/custom-esbuild
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
yarn add -D @angular-builders/custom-esbuild
```

```bash packageManager="bun"
bun add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
bun add -D @angular-builders/custom-esbuild
```

> `@ngx-translate/core` はインストールしたままにしてください。TypeScript の型を提供します。`@ngx-translate/http-loader` は削除できます。

</Step>
<Step number={2} title="Intlayer の設定">

`syncJSON` プラグインを既存の翻訳ファイルに向けます。namespace ごとに 1 ファイル（`src/i18n/en/home.json`）の場合、各ファイルが 1 つの辞書になります。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // matches ngx-translate placeholder syntax: {{name}}
      format: "i18next",
      // ./src/i18n/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/i18n/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `'home.title' | translate` は辞書 `home` の `title` フィールドに解決されます。ロケールごとに 1 ファイル（`src/assets/i18n/en.json`）でネストしたキーを使っている場合は、代わりに `source: ({ locale }) => \`./src/assets/i18n/${locale}.json\`` を使ってください。トップレベルの各キーが辞書になります。

</Step>
<Step number={3} title="esbuild プラグインを追加する">

Angular CLI は `@angular-builders/custom-esbuild` を通じて esbuild プラグインを受け付けます。プラグインファイルを作成します。

```typescript fileName="esbuild.plugins.ts"
import { ngxTranslateEsbuildPlugin } from "@intlayer/ngx-translate/esbuild";

export default [ngxTranslateEsbuildPlugin()];
```

次に `angular.json` で参照します。

```json5 fileName="angular.json"
{
  "architect": {
    "build": {
      "builder": "@angular-builders/custom-esbuild:application",
      "options": {
        "plugins": ["./esbuild.plugins.ts"],
        // ... your existing options
      },
    },
    "serve": {
      "builder": "@angular-builders/custom-esbuild:dev-server",
    },
  },
}
```

このプラグインは Intlayer のビルドを実行し、`@ngx-translate/core` を `@intlayer/ngx-translate` に解決するため、ソースファイルの変更は不要です。

> Vite（Analog）でビルドしていますか？ 代わりに `@intlayer/ngx-translate/plugin` の `ngxTranslateVitePlugin()` を使ってください。

</Step>
<Step number={4} title="HTTP ローダーを削除する">

`provideTranslateService()` は残し、`loader` オプションを外します。メッセージは Intlayer の辞書から提供されます。

```typescript fileName="src/app/app.config.ts"
import type { ApplicationConfig } from "@angular/core";
import { provideTranslateService } from "@ngx-translate/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideTranslateService({
      lang: "en",
      fallbackLang: "en",
    }),
  ],
};
```

> 翻訳はローダーを経由しなくなったため、`TranslateHttpLoader` と `@ngx-translate/http-loader` は削除できます。

</Step>
</Steps>

テンプレートとサービスはそのまま動作し続けます。

```html fileName="src/app/app.html"
<h1>{{ 'home.title' | translate }}</h1>
<p [translate]="'home.greeting'" [translateParams]="{ name: 'Ada' }"></p>
<h2 translate>home.serviceSection</h2>
```

```typescript fileName="src/app/app.ts"
import { Component, inject } from "@angular/core";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  imports: [TranslatePipe],
  templateUrl: "./app.html",
})
export class App {
  private readonly translate = inject(TranslateService);

  readonly message = this.translate.instant("home.title");

  switchTo = (lang: string) => this.translate.use(lang);
}
```

## 完全移行

<Steps>
<Step number={5} title="import の明示的なリネーム（任意）" isOptional={true}>

エイリアスはすでに esbuild プラグインが処理しています。依存関係を明示したい場合:

| 変更前                                                          | 変更後                                                              |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { TranslateService } from '@ngx-translate/core'`        | `import { TranslateService } from '@intlayer/ngx-translate'`        |
| `import { TranslatePipe } from '@ngx-translate/core'`           | `import { TranslatePipe } from '@intlayer/ngx-translate'`           |
| `import { provideTranslateService } from '@ngx-translate/core'` | `import { provideTranslateService } from '@intlayer/ngx-translate'` |

</Step>
<Step number={6} title="コンテンツを .content.ts ファイルに移す" isOptional={true}>

新しいコンポーネントでは、既存の ngx-translate の呼び出しと並行してネイティブの Intlayer コンテンツを使えます。`app.config.ts` で `provideTranslateService()` の隣に `angular-intlayer` の `provideIntlayer()` を登録してから、次のようにします。

```typescript fileName="src/app/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```typescript fileName="src/app/home.component.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  template: `<h1>{{ content().title }}</h1>`,
})
export class HomeComponent {
  content = useIntlayer("home");
}
```

</Step>
<Step number={7} title="AI による翻訳を有効にする" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

補完された翻訳は JSON ファイルに書き戻されます。AI の設定については [CLI のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md) を参照してください。

</Step>
</Steps>

## 移行後に削除できるもの

| ファイル / パターン                               | 不要になる理由                                 |
| ------------------------------------------------- | ---------------------------------------------- |
| `TranslateHttpLoader` / カスタムローダー          | 辞書は Intlayer がコンパイルして読み込みます。 |
| `@ngx-translate/http-loader`                      | ランタイムに翻訳ファイルを取得しなくなります。 |
| `provideHttpClient()`（翻訳だけに使っている場合） | 同じ理由です。                                 |

## TypeScript の設定

生成された型を `tsconfig.json` に含めます。

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Git の設定

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [ngx-translate compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/ngx-translate.md)
- [sync JSON プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)
- [Angular で Intlayer を使う](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_angular_21.md)
- [Intlayer ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)
