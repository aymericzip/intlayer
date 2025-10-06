---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Angularアプリを翻訳する方法 – i18nガイド 2025
description: Angularを使ったウェブサイトを多言語対応にする方法を学びましょう。国際化（i18n）と翻訳のためにドキュメントに従ってください。
keywords:
  - 国際化
  - ドキュメンテーション
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
# applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
---

# IntlayerでAngularを翻訳する | 国際化（i18n）

> このパッケージは開発中です。詳細は[issue](https://github.com/aymericzip/intlayer/issues/116)をご覧ください。Angular向けIntlayerに関心がある場合は、issueに「いいね」をして応援してください

<!-- See [Application Template](https://github.com/aymericzip/intlayer-angular-template) on GitHub. -->

## Intlayerとは？

**Intlayer** は、最新のウェブアプリケーションにおける多言語対応を簡素化するために設計された、革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使うと、以下が可能になります：

- **コンポーネントレベルで宣言的な辞書を使い、翻訳を簡単に管理**できます。
- **メタデータ、ルート、コンテンツを動的にローカライズ**できます。
- **自動生成される型情報によりTypeScriptのサポートを確保**し、オートコンプリートやエラー検出を向上させます。
- **動的なロケール検出や切り替えなどの高度な機能**を利用できます。

---

## AngularアプリケーションでIntlayerをセットアップするステップバイステップガイド

### ステップ1: 依存パッケージのインストール

npmを使って必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer angular-intlayer @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/webpack
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/webpack
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)のための国際化ツールを提供するコアパッケージです。

- **angular-intlayer**

  IntlayerをAngularアプリケーションと統合するパッケージです。Angularの国際化のためのコンテキストプロバイダーとフックを提供します。

- **@intlayer/webpack**
  IntlayerをWebpackと統合するパッケージです。Angular CLIによって、コンテンツ宣言ファイルのビルドおよび開発モードでの監視に使用されます。

### ステップ 2: プロジェクトの設定

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> この設定ファイルを通じて、ローカライズされたURLの設定、ミドルウェアのリダイレクション、クッキー名、コンテンツ宣言の場所や拡張子の指定、コンソール上のIntlayerログの無効化などを行うことができます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ3: Angular設定へのIntlayerの統合

IntlayerをAngular CLIに統合するには、ビルダーに応じて`esbuild`か`webpack`の2つのオプションがあります。

#### オプション1: esbuildの使用（推奨）

まず、`angular.json`を修正してカスタムesbuildビルダーを使用するようにします。`build`設定を更新してください。

> `angular.json` の `your-app-name` を実際のプロジェクト名に置き換えることを忘れないでください。

次に、プロジェクトのルートに `esbuild/intlayer-plugin.ts` ファイルを作成します。

```typescript fileName="esbuild/intlayer-plugin.ts"
import { prepareIntlayer, watch } from "@intlayer/chokidar";
import { getConfiguration, logger } from "@intlayer/config";
import type { Plugin } from "esbuild";

const intlayer: Plugin = {
  name: "intlayer-esbuild-plugin",
  setup(build) {
    const configuration = getConfiguration();
    let isWatching = false;

    build.onStart(async () => {
      logger("Intlayer esbuild プラグインが開始されました", {
        level: "info",
      });

      if (build.initialOptions.watch && !isWatching) {
        logger("ウォッチモードが有効です。ウォッチャーを開始します...", {
          level: "info",
        });
        watch(configuration);
        isWatching = true;
      }

      try {
        await prepareIntlayer(configuration);
      } catch (error) {
        logger(`Intlayer esbuild プラグインでエラーが発生しました: ${error}`, {
          level: "error",
        });
      }
    });
  },
};

export default intlayer;
```

> esbuild用の`intlayer`は、ビルド開始前にIntlayerを準備し、開発モードでの変更を監視します。

#### オプション 2: Webpackの使用

まず、`angular.json` を修正してカスタム Webpack ビルダーを使用するようにします。`build` と `serve` の設定を更新してください。

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.js"
            }
          }
        },
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server"
        }
      }
    }
  }
}
```

> `angular.json` 内の `your-app-name` は、実際のプロジェクト名に置き換えてください。

次に、プロジェクトのルートに `webpack.config.js` ファイルを作成します。

```javascript fileName="webpack.config.js"
const { IntlayerWebpackPlugin } = require("@intlayer/webpack");

module.exports = {
  plugins: [new IntlayerWebpackPlugin()],
};
```

> `IntlayerWebpackPlugin` は Intlayer を Webpack と統合するために使用されます。これにより、コンテンツ宣言ファイルのビルドが保証され、開発モードでの監視が行われます。また、アプリケーション内で Intlayer の環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスも提供します。

### ステップ4: コンテンツを宣言する

翻訳を格納するためのコンテンツ宣言を作成および管理します:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    congratulations: t({
      ja: "おめでとうございます！アプリが動作しています。🎉",
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
    exploreDocs: t({
      ja: "ドキュメントを探検する",
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      ja: "チュートリアルで学ぶ",
      en: "Learn with Tutorials",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "CLIドキュメント",
    angularLanguageService: t({
      ja: "Angular言語サービス",
      en: "Angular Language Service",
      fr: "Service de Langage Angular",
      es: "Servicio de Lenguaje Angular",
    }),
    angularDevTools: "Angular DevTools",
    github: "Github",
    twitter: "Twitter",
    youtube: "Youtube",
  },
} satisfies Dictionary;

export default appContent;
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれていれば、アプリケーションのどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）に一致している必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)を参照してください。

### ステップ5: コード内でIntlayerを利用する

Angularアプリケーション全体でIntlayerの国際化機能を利用するには、コンポーネント内で `useIntlayer` 関数を使用する必要があります。この関数は `angular-intlayer` から提供されており、リアクティブなシグナルとして翻訳にアクセスできます。
`IntlayerProvider` はアプリケーションのルートに登録されているため、モジュールの providers に追加する必要はありません。

コンポーネントクラスでコンテンツ辞書にアクセスします:

```typescript fileName="src/app/hello-world.component.ts"
import { Component, signal } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-hello-world",
  standalone: true,
  template: `
    <h1>{{ content().title }}</h1>

    <div class="card">
      <button type="button" (click)="increment()">
        {{ content().count }} {{ count() }}
      </button>
      <p [innerHTML]="content().edit"></p>
    </div>

    <p class="read-the-docs">{{ content().readTheDocs }}</p>
  `,
})
export class HelloWorldComponent {
  content = useIntlayer("helloworld");
  count = signal(0);

  increment() {
    this.count.update((value) => value + 1);
  }
}
```

Intlayerのコンテンツは`Signal`として返されるため、テンプレート内でシグナルを呼び出すことで値にアクセスします：`content().title`。

### （オプション）ステップ6：コンテンツの言語を変更する

コンテンツの言語を変更するには、`useLocale`関数が提供する`setLocale`関数を使用します。これにより、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

言語を切り替えるコンポーネントを作成します：

````typescript fileName="src/app/components/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { getLocaleName } from "intlayer";
import { useLocale } from "angular-intlayer";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="locale-switcher">
      <select [ngModel]="locale()" (ngModelChange)="changeLocale($event)">
        <option *ngFor="let loc of availableLocales" [value]="loc">
          {{ getLocaleName(loc) }}
        </option>
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  localeInfo = useLocale();
  locale = this.localeInfo.locale;
  availableLocales = this.localeInfo.availableLocales;

  // テンプレートで getLocaleName を公開する
  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
次に、このコンポーネントを `app.component.ts` で使用します。

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { HelloWorldComponent } from "./hello-world.component";
import { LocaleSwitcherComponent } from "./components/locale-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HelloWorldComponent, LocaleSwitcherComponent],
  template: `
    <div>
      <app-locale-switcher />
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite ロゴ" />
      </a>
      <a href="https://angular.dev/" target="_blank">
        <img
          src="/assets/angular.svg"
          class="logo angular"
          alt="Angular ロゴ"
        />
      </a>
    </div>
    <app-hello-world />
  `,
})
export class AppComponent {}
````

### （オプション）ステップ7：アプリケーションにローカライズされたルーティングを追加する

Angularアプリケーションにローカライズされたルーティングを追加するには、Angular Routerを使用してロケールプレフィックスを付けます。これにより、各言語ごとにユニークなルートが作成され、SEOに役立ちます。

例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

まず、`@angular/router`がインストールされていることを確認してください。

次に、`app.routes.ts`でロケールベースのルーティングを処理するルーター設定を作成します。

```typescript fileName="src/app/app.routes.ts"
import { Routes } from "@angular/router";
import { configuration, localeFlatMap } from "intlayer";
import { HomeComponent } from "./home/home.component";
import { RootComponent } from "./root/root.component";

const { defaultLocale } = configuration.internationalization;

export const routes: Routes = [
  localeFlatMap((localizedData) => [
    {
      path: `${localizedData.urlPrefix}`,
      component: RootComponent,
      data: { locale: localizedData.locale },
    },
    {
      path: `${localizedData.urlPrefix}/home`,
      component: HomeComponent,
      data: { locale: localizedData.locale },
    },
  ]),
  { path: "**", redirectTo: `/${defaultLocale}/home` },
];
```

次に、`app.config.ts`でルーターを提供する必要があります。

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

### （オプション）ステップ8：ロケール変更時にURLを変更する

ユーザーが言語を変更したときにURLを自動的に更新するには、`LocaleSwitcher` コンポーネントをAngularのRouterを使うように変更できます。

````typescript fileName="src/app/components/locale-switcher.component.ts"
import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "angular-intlayer";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="locale-switcher">
      <select [ngModel]="locale()" (ngModelChange)="changeLocale($event)">
        <option *ngFor="let loc of availableLocales" [value]="loc">
          {{ getLocaleName(loc) }}
        </option>
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  private router = inject(Router);

  localeInfo = useLocale({
    onLocaleChange: (newLocale) => {
      const currentPath = this.router.url;
      const localizedPath = getLocalizedUrl(currentPath, newLocale);
      this.router.navigateByUrl(localizedPath);
    },
  });

  locale = this.localeInfo.locale;
  availableLocales = this.localeInfo.availableLocales;

  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
### （オプション）ステップ9: HTMLの言語属性と方向属性を切り替える

アプリケーションが複数の言語をサポートしている場合、`<html>`タグの`lang`属性と`dir`属性を現在のロケールに合わせて更新することが重要です。

これを自動的に処理するサービスを作成できます。

```typescript fileName="src/app/services/i18n-html-attributes.service.ts"
import { Injectable, effect } from "@angular/core";
import { useLocale } from "angular-intlayer";
import { getHTMLTextDir } from "intlayer";

@Injectable({
  providedIn: "root",
})
export class I18nHtmlAttributesService {
  private localeInfo = useLocale();

  constructor() {
    effect(() => {
      const newLocale = this.localeInfo.locale();
      if (newLocale) {
        document.documentElement.lang = newLocale;
        document.documentElement.dir = getHTMLTextDir(newLocale);
      }
    });
  }

  // このメソッドは、サービスが初期化されることを保証するためにアプリのルートコンポーネントで呼び出すことができます。
  init() {}
}
````

次に、このサービスをメインの `AppComponent` に注入して初期化します。

```typescript fileName="src/app/app.component.ts"
import { Component, inject } from "@angular/core";
// ... その他のインポート
import { I18nHtmlAttributesService } from "./services/i18n-html-attributes.service";

@Component({
  // ...
})
export class AppComponent {
  constructor() {
    inject(I18nHtmlAttributesService).init();
  }
}
```

### （オプション）ステップ10：ローカライズされたリンクディレクティブの作成

アプリケーションのナビゲーションが現在のロケールを尊重するようにするために、カスタムディレクティブを作成できます。このディレクティブは、内部のURLに現在の言語を自動的にプレフィックスします。

```typescript fileName="src/app/directives/localized-link.directive.ts"
import { Directive, Input, HostBinding, inject } from "@angular/core";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "angular-intlayer";

@Directive({
  selector: "a[appLocalizedLink]",
  standalone: true,
})
export class LocalizedLinkDirective {
  @Input("href") originalHref: string = "";

  private localeInfo = useLocale();

  @HostBinding("href")
  get localizedHref(): string {
    const locale = this.localeInfo.locale();
    const isExternalLink = /^https?:\/\//.test(this.originalHref);
    if (isExternalLink || !this.originalHref) {
      return this.originalHref;
    }

    return getLocalizedUrl(this.originalHref, locale);
  }
}
```

これを使用するには、アンカータグに `appLocalizedLink` ディレクティブを追加し、コンポーネントでインポートしてください。

```typescript fileName="src/app/app.component.ts"
// ...
import { LocalizedLinkDirective } from "./directives/localized-link.directive";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [/*...,*/ LocalizedLinkDirective],
  template: ` <a href="/home" appLocalizedLink>Home</a> `,
})
export class AppComponent {}
```

### （オプション）ステップ11: Markdownのレンダリング

IntlayerはMarkdownコンテンツのレンダリングをサポートしています。MarkdownをリッチなHTMLに変換するには、[markdown-it](https://github.com/markdown-it/markdown-it)を統合できます。

まず、`markdown-it`をインストールします。

```bash
npm install markdown-it
# そして型定義も
npm install -D @types/markdown-it
```

次に、`app.config.ts`で`INTLAYER_MARKDOWN_TOKEN`を設定します。

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { createIntlayerMarkdownProvider } from "angular-intlayer/markdown";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    createIntlayerMarkdownProvider((markdown) => md.render(markdown)),
  ],
};
```

デフォルトでは、IntlayerはレンダリングされたHTMLを文字列として返します。`[innerHTML]`でバインドする場合は、セキュリティ上のリスク（XSS）に注意してください。常にコンテンツが信頼できるソースからのものであることを確認してください。

より複雑なシナリオでは、HTMLを安全にレンダリングするためのパイプを作成することもできます。

### TypeScriptの設定

Intlayerはモジュール拡張を利用してTypeScriptの利点を活かし、コードベースをより強固にします。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScriptの設定に自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存の TypeScript 設定
  "include": [
    // ... 既存の TypeScript 設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### Git 設定

Intlayer によって生成されたファイルは Git リポジトリにコミットしないように、無視することを推奨します。

そのためには、`.gitignore` ファイルに以下の記述を追加してください。

```plaintext
# Intlayer によって生成されたファイルを無視する
.intlayer
```

### VS Code 拡張機能

Intlayer の開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
この拡張機能は以下を提供します：

- 翻訳キーの**オートコンプリート**。
- 欠落している翻訳の**リアルタイムエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳の作成や更新を簡単に行うための**クイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code Extension ドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに進むには

さらに進むには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使ってコンテンツを外部化することができます。

---

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 初期履歴
