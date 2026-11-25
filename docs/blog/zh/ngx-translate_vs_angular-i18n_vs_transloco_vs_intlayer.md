---
createdAt: 2026-11-24
updatedAt: 2026-11-25
priority: 8
title: "ngx-translate、Angular i18n、Transloco 与 Intlayer 对比（2026）"
description: "Angular 国际化该选 ngx-translate、@angular/localize、Transloco 还是 Intlayer？比较运行时语言切换、类型安全、懒加载、复数和 SSR。"
keywords:
  - ngx-translate
  - Transloco
  - Angular i18n
  - "@angular/localize"
  - Angular 国际化
  - ngx-translate 与 Transloco 对比
  - Intlayer
  - i18n 库对比
slugs:
  - blog
  - ngx-translate-vs-angular-i18n-vs-transloco-vs-intlayer
author: aymericzip
---

# ngx-translate、Angular i18n、Transloco 与 Intlayer 对比

Angular 是唯一自带 i18n 的主流框架，其方案与社区库截然不同。`@angular/localize` 在构建时翻译，每种语言生成一个应用。`ngx-translate` 和 Transloco 在运行时读取 JSON 翻译。Intlayer 在构建时编译内容，但只保留一个可在运行时切换语言的应用。

本文从实际选择的关键出发比较四者：如何切换语言、内容存放在哪里、编译器能发现什么，以及浏览器加载哪些内容。

## 目录

<TOC/>

## 快速概览

- **`@angular/localize`**（Angular i18n）：无运行时开销，原生支持 ICU，但每个 locale 需要独立构建和部署，切换语言会重新加载应用。
- **`ngx-translate`**：历史最久、最简单的运行时方案。通过 HTTP 加载每个 locale 的 JSON 文件，键无类型，复数依赖插件。
- **Transloco**：面向较大应用的运行时方案。scope 按功能加载翻译，插件提供 ICU、本地化格式和键提取。
- **Intlayer**：内容与组件相邻，构建时生成类型，按组件和 locale 拆分，支持运行时切换。需要自定义 esbuild builder。

> 想了解这些库的来历，可阅读 [JavaScript i18n 的历史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/history_of_i18n.md)。

- [JavaScript i18n 的历史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/history_of_i18n.md)

## 构建时还是运行时：决定方案分野的选择

**`@angular/localize`** 将翻译内联到编译后的模板。`ng build --localize` 输出 `dist/app/en`、`dist/app/fr` 等目录，每个只包含一种语言。运行时无需请求或解释翻译，因此加载后速度最快。代价在运维：测试 N 次构建、部署 N 个目录，配置服务器或 CDN 将 `/fr/` 路由到对应目录，用户切换语言时还需整页加载。`ng serve` 也只能同时运行一个 locale。

**`ngx-translate` 和 Transloco** 只需一次构建。locale 改变时，服务请求 `fr.json`，各个 pipe 或指令随之重新渲染。切换即时生效，但首次渲染要等待 HTTP 请求，键是普通字符串。使用 SSR 时，loader 也必须能在服务器运行，可采用绝对 URL 或文件系统 loader，并通过 `TransferState` 避免重复请求。

**Intlayer** 同样只需一次构建，但内容编译进 bundle，而非以原始 JSON 下载。`useIntlayer()` 返回 Signal，因此 locale 改变时，读取它的组件会更新，无需刷新。

运行时库有个容易忽略的 Angular 细节：`DatePipe`、`CurrencyPipe` 和 `DecimalPipe` 读取的 `LOCALE_ID` 在启动时就已固定。使用 `ngx-translate` 切换语言不会改变日期和价格格式。Transloco 用 `@jsverse/transloco-locale` 解决，Intlayer 则提供跟随当前 locale 的 `useDate`、`useNumber` 和 `useCurrency`。`@angular/localize` 每个构建有自己的 `LOCALE_ID`，没有这个问题。`Intl` 相关内容见[日期、时间和数字格式指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/date_time_number_formatting_locales.md)。

- [日期、时间和数字格式指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/date_time_number_formatting_locales.md)

## 功能对比

|                      | `@angular/localize`                                       | `ngx-translate`                                | Transloco                                  | Intlayer                                                |
| :------------------- | :-------------------------------------------------------- | :--------------------------------------------- | :----------------------------------------- | :------------------------------------------------------ |
| **应用翻译的时机**   | 构建时内联                                                | 运行时                                         | 运行时                                     | 构建时编译，运行时解析                                  |
| **每次发布的构建数** | 每个 locale 一个                                          | 一个                                           | 一个                                       | 一个                                                    |
| **切换 locale**      | 重新加载另一个构建                                        | 即时                                           | 即时                                       | 即时                                                    |
| **内容位置**         | 模板中放原文，XLIFF/JSON 中放翻译                         | 每个 locale 一个 JSON                          | 每个 locale 一个 JSON，另按 scope 拆分     | 组件旁的 `.content.ts` 或 JSON，也可集中管理            |
| **复数 / ICU**       | ✅ 模板原生 ICU                                           | ⚠️ 插件 `ngx-translate-messageformat-compiler` | ⚠️ 插件 `@jsverse/transloco-messageformat` | ✅ `plural()` 遵循 CLDR，⚠️ 部分支持 ICU 字符串         |
| **键的类型**         | 不适用，原文就是消息                                      | ❌ 无                                          | ❌ 无，Keys Manager 从 CLI 检查缺失键      | ✅ 自动生成，错误键使 `ng build` 失败                   |
| **缺失翻译**         | 构建警告，或用 `i18nMissingTranslation` 报错              | 运行时显示原始键                               | 运行时回退语言，CLI 检查                   | TypeScript 提示，CI 中用 `intlayer test`                |
| **懒加载**           | 无需，每个构建只有一种语言                                | 加载完整 locale 文件，手动拆分                 | ✅ 按 scope（路由或组件）                  | ✅ 按组件和 locale                                      |
| **Signals**          | 不适用，文本静态                                          | Pipe 与 Observable                             | `translateSignal()`                        | `useIntlayer()` 返回 Signal                             |
| **构建配置**         | `ng add @angular/localize`，在 `angular.json` 配置 locale | 无                                             | 无                                         | `@angular-builders/custom-esbuild` 和 esbuild 插件      |
| **翻译人员工作流**   | ✅ TMS 通常支持的 XLIFF                                   | JSON                                           | JSON                                       | `.content.ts`/JSON、同步插件、可视化编辑器、CLI AI 补全 |

有几项需要补充说明。

**`@angular/localize` 的消息 ID。** 不设置自定义 ID（`i18n="@@cartTitle"`）时，ID 是原文的哈希。修改英文中的一个拼写错误，该消息的所有翻译都会失去关联，直到译者重新处理。应从一开始就设置自定义 ID。

**`ngx-translate` 的拆分。** 默认 loader 下载完整的 `fr.json`，每个页面都携带其他页面的文本。可通过自定义 loader 或多个 `TranslateService` 实例按功能拆分，但没有强制约束。取舍见[按组件与集中式 i18n 对比](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/per-component_vs_centralized_i18n.md)。

- [按组件与集中式 i18n 对比](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/per-component_vs_centralized_i18n.md)

**Transloco 的 scope。** scope 是一个 JSON 文件目录（如 `i18n/cart/en.json`），在路由或组件提供它时加载。这是运行时库最接近组件级内容的方案，只要共享组件不访问其他功能的 scope，就能很好地工作。

**Intlayer 的 builder。** Angular CLI 不开放 esbuild 插件，因此需要在 `angular.json` 中使用 `@angular-builders/custom-esbuild`。改动虽小，但 Angular 升级时也需维护第三方 builder 的兼容性。完整配置见 [Angular 安装指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_angular_21.md)。

- [Angular 安装指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_angular_21.md)

## 提交活跃度

`@angular/localize` 位于 `angular/angular` monorepo 中，提交数无法直接比较，因此不纳入。

<GithubCommits repositories="ngx-translate/core,jsverse/transloco,aymericzip/intlayer" />

## npm 下载量

<NpmDownloads packages="@angular/localize,@ngx-translate/core,@jsverse/transloco,angular-intlayer" period="last-6-months" />

下载量更多反映历史，而非当前选择：Transloco 出现前创建的应用仍在安装 `ngx-translate`，AI 助手也因训练代码中它占主导而不断推荐它。Transloco 在 2024 年从 `@ngneat/transloco` 迁移至 `@jsverse/transloco`，旧 scope 至今仍有下载。

## 用各个库实现同一个组件

示例是带标题和复数文本的购物车摘要。模板几乎不变，变化在于字符串的位置，以及编译器对它们的了解。

<Tabs defaultTab="angular-localize">
  <Tab label="@angular/localize" value="angular-localize">

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2 i18n="@@cartTitle">Your cart</h2>
      <p i18n="@@cartItems">
        {count(), plural, one {{{ count() }} item} other {{{ count() }} items}}
      </p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

```bash
ng extract-i18n --output-path src/locale
ng build --localize
```

```xml fileName="src/locale/messages.fr.xlf"
<trans-unit id="cartTitle" datatype="html">
  <source>Your cart</source>
  <target>Votre panier</target>
</trans-unit>
<trans-unit id="cartItems" datatype="html">
  <source>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> item} other {<x id="INTERPOLATION"/> items}}</source>
  <target>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> article} other {<x id="INTERPOLATION"/> articles}}</target>
</trans-unit>
```

英文保留在模板中。译者处理提取出的 XLIFF，每个 locale 对应一个独立构建。TypeScript 中的字符串使用 `$localize` 标签。

  </Tab>
  <Tab label="ngx-translate" value="ngx-translate">
  <Tabs group="locale">
  <Tab value="en" label="英语">

```json fileName="public/i18n/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="法语">

```json fileName="public/i18n/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-cart-summary",
  imports: [TranslatePipe],
  template: `
    <section>
      <h2>{{ "cart.title" | translate }}</h2>
      <p>{{ "cart.items" | translate: { count: count() } }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

ICU 复数仅在安装 `ngx-translate-messageformat-compiler` 后生效，默认解析器只替换 `{{count}}`。`"cart.titel"` 仍能编译，但运行时会显示原始键。

  </Tab>
  <Tab label="Transloco" value="transloco">
  <Tabs group="locale">
  <Tab value="en" label="英语">

```json fileName="public/i18n/cart/en.json"
{
  "title": "Your cart",
  "items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="法语">

```json fileName="public/i18n/cart/fr.json"
{
  "title": "Votre panier",
  "items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { provideTranslocoScope, TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: "app-cart-summary",
  imports: [TranslocoDirective],
  providers: [provideTranslocoScope("cart")],
  template: `
    <section *transloco="let t; prefix: 'cart'">
      <h2>{{ t("title") }}</h2>
      <p>{{ t("items", { count: count() }) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

首次渲染组件时加载 `cart` scope。ICU 复数需要 `@jsverse/transloco-messageformat`。键没有类型，`transloco-keys-manager` 可报告缺失和未使用的键。

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/app/cart-summary/cart-summary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ zh: "您的购物车", en: "Your cart", fr: "Votre panier" }),
    items: t({
      zh: plural({ other: "{{count}} 件商品" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2>{{ content().title }}</h2>
      <p>{{ content().items(count()) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
  content = useIntlayer("cart-summary");
}
```

所有 locale 都放在组件旁的同一个文件中。构建时生成类型，因此 `content().titel` 会使 `ng build` 失败，`t()` 中缺失 locale 也会在编辑器提示。

  </Tab>
</Tabs>

## 哪种适合你的应用

<AccordionGroup>
<Accordion header="公开网站，交互少，优先考虑 SEO">

选 `@angular/localize`。每个 locale 都有独立构建和 URL，预渲染页面已经翻译，无需加载 i18n 运行时。当应用主要展示内容、语言切换少时，每个 locale 独立构建的成本不高。还应正确配置 `hreflang`，见 [hreflang 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/hreflang_guide_multilingual_seo.md)。

- [hreflang 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/hreflang_guide_multilingual_seo.md)

</Accordion>
<Accordion header="用户需要在应用内切换语言的仪表盘或 SaaS">

选运行时方案。重新加载另一个构建会丢失内存状态，语言菜单触发整页刷新也影响体验。两三种语言的小应用用 `ngx-translate` 已足够；超过十几个功能后，有 scope 的 Transloco 更稳妥。

</Accordion>
<Accordion header="翻译来自 TMS 或翻译机构">

`@angular/localize` 导出的 XLIFF 可被各类 TMS 读取，模板原文也为译者提供上下文。`ngx-translate` 和 Transloco 的 JSON 同样得到广泛支持。选择运行时库前，应确认供应商能处理 ICU 复数，因为两者都需要插件。

</Accordion>
<Accordion header="大型应用，懒加载路由多，bundle 大小受限">

选择 Transloco scope 或 Intlayer，两者都避免向每个路由发送所有功能的文本。差别在约束：Transloco scope 是约定，Intlayer 字典只在 `useIntlayer()` 导入它的地方打包。见 [bundle 优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md)和[动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md)。

- [bundle 优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md)
- [动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md)

</Accordion>
<Accordion header="必须保证类型安全">

只有 Intlayer 开箱即用地为键提供类型。`ngx-translate` 和 Transloco 的键即使拼错也能编译，直到生产环境才显示原始键。Transloco Keys Manager 可在 CI 中发现问题，虽有帮助，却不同于编译错误。见[检测缺失翻译](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/detecting_missing_translations.md)。

- [检测缺失翻译](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/detecting_missing_translations.md)

</Accordion>
<Accordion header="将使用 AI 生成翻译">

组件旁的内容配合可补全缺失 locale 的 CLI，流程最短。Intlayer 的 [`fill` 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md)使用你自己的 API 密钥，只重新翻译改动过的内容。使用 XLIFF 或 JSON 目录时，需要自行编写同样的处理流程。

- [`fill` 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md)

</Accordion>
</AccordionGroup>

## 各自的不足

- **`@angular/localize`**：每个 locale 需要独立构建和部署，切换语言会刷新，原文变化后哈希 ID 使翻译失去关联，构建后从 CMS 加载翻译需要特殊的启动处理。
- **`ngx-translate`**：键无类型，复数和 ICU 依赖插件，每页加载完整 locale 文件，非纯 pipe 每次变更检测都重新求值，日期和数字不处理 `LOCALE_ID`。
- **Transloco**：键无类型，ICU 依赖插件，scope 是约定而非保证。要组合多个插件，才能实现 `@angular/localize` 原生具备的功能。
- **Intlayer**：`angular.json` 需配置第三方 builder，Angular 社区小于其他三者，ICU 支持不完整。内容有意分散在代码中，向译者导出单个文件需要 [JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md)或 CLI。

- [JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md)

## 从 ngx-translate 迁移

[`@intlayer/ngx-translate` 兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/ngx-translate.md)让 `TranslateService`、`translate` pipe 和 `[translate]` 指令继续工作，由 Intlayer 提供内容，因此可以逐个迁移模板。步骤见[迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_ngx-translate_to_intlayer.md)。从 Transloco 或 `@angular/localize` 迁移时，可通过 [JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md)继续以现有 JSON 目录为唯一数据源。

- [`@intlayer/ngx-translate` 兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/ngx-translate.md)
- [迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_ngx-translate_to_intlayer.md)
- [JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md)

## 常见问题

<FAQ>
<Question title="ngx-translate 还在维护吗？">

是的。经历数年低活跃度后，项目在 2024 年迎来新维护者，并推出 `provideTranslateService` 等 standalone API。设计依旧是运行时 JSON、字符串键，以及通过插件处理复数。

</Question>
<Question title="新的 Angular 应用该选 ngx-translate 还是 Transloco？">

除非应用很小，否则选 Transloco。它涵盖 `ngx-translate` 的功能，并增加 scope、Signal 辅助函数、SSR 指南和键管理工具。两者 API 接近，后续迁移多为机械替换，但若应用会增长，没必要从较简单的方案开始。

</Question>
<Question title="@angular/localize 能不刷新就切换语言吗？">

按其设计不能。翻译在构建时内联，换语言就意味着换构建。可在启动前调用 `loadTranslations()` 以在运行时加载翻译，但切换仍需重启应用。

</Question>
<Question title="哪种方案最适合 Angular SEO？">

路由比库更关键：每个 locale 一个 URL、`hreflang` 标签、`<html lang>` 和已翻译的服务端渲染 HTML。`@angular/localize` 每个 locale 独立构建，几乎自然具备这些条件。运行时库则需 SSR 和本地化路由。见[国际化与 SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/internationalization_and_SEO.md)。

- [国际化与 SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/internationalization_and_SEO.md)

</Question>
<Question title="Intlayer 支持 Analog 吗？">

支持，通过 Vite 集成。见 [Analog 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_analog.md)。

- [Analog 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_analog.md)

</Question>
</FAQ>

## 延伸阅读

- [在 Angular 22 中配置 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_angular_21.md)
- [在 Angular 19 中配置 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_angular_19.md)
- [i18n 基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md)
- [编译器与声明式 i18n 对比](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/compiler_vs_declarative_i18n.md)
- [ICU 消息格式](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/icu_message_format.md)
- [兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md)

其他框架的同类对比：

- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/how_to_pick_react_i18n_library.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/how_to_pick_vue_i18n_library.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/how_to_pick_svelte_i18n_library.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/how_to_pick_solid_i18n_library.md)
