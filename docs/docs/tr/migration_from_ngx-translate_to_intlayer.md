---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "ngx-translate'den Intlayer'a geçiş"
description: "Bir Angular uygulamasını adım adım ngx-translate'den Intlayer'a taşıyın. translate pipe'ı, translate direktifi ve TranslateService @intlayer/ngx-translate compat adapter'ı ile çalışmaya devam eder."
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

# ngx-translate'den Intlayer'a geçiş

## Neden ngx-translate'den Intlayer'a geçmeli?

<AccordionGroup>
<Accordion header="HTTP loader yok">

ngx-translate locale dosyalarını çalışma zamanında `TranslateHttpLoader` ile indirir ve bu ilk render'ı geciktirir. Intlayer sözlükleri build sırasında derler, böylece çeviriler hemen kullanılabilir.

</Accordion>
<Accordion header="Sürdürülebilirlik">

Anahtarlar sözlüklerinize göre **tiplidir**: geçersiz anahtarlar build sırasında hata verir. İçerik, onu kullanan bileşenlerin yanında durabilir.

</Accordion>
<Accordion header="Yapay zeka ajanı">

Bileşenlerin yanındaki içerik, LLM'ler için **gereken bağlamı azaltır**. Intlayer eksik çevirileri test etmek için bir **CLI**, bir **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**, bir **[MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)** ve **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)** sunar.

</Accordion>
<Accordion header="Otomasyon">

Eksik mesajları CI/CD pipeline'ınızda seçtiğiniz LLM ile ya da arka planda [web platformu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) ile çevirin.

</Accordion>
<Accordion header="Geliştirici olmayanlarla ölçeklenme">

Intlayer, çevirmenlerin ve metin yazarlarının içeriği gerçek zamanlı düzenleyebilmesi için self-hosted bir **[görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)** ve **[tam bir CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)** sunar.

</Accordion>
</AccordionGroup>

> Bu kütüphanelerin nereden geldiğini anlamak için [JavaScript i18n tarihini](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md) okuyun.

## Geçiş stratejileri

1. **Compat adapter (mevcut uygulamalar için önerilir)**: `@intlayer/ngx-translate` kurun. `@ngx-translate/core` ile aynı API'yi (`provideTranslateService`, `TranslateService`, `TranslatePipe`, `TranslateDirective`, `TranslateModule`) sunar ve mesajları Intlayer sözlüklerinden sağlar. Template'leriniz değişmeden kalır.
2. **Tam geçiş**: ngx-translate çağrılarını kademeli olarak `angular-intlayer` içindeki `useIntlayer` ve bileşenlerinizin yanındaki `.content.ts` dosyalarıyla değiştirin.

## İçindekiler

<TOC/>

## Hızlı geçiş

<Steps>
<Step number={1} title="Bağımlılıkları kurun">

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

> `--interactive` flag'i isteğe bağlıdır. Bir yapay zeka ajanıysanız `intlayer-cli init` kullanın.

Komut ortamınızı algılar ve gerekli package'ları kurar, örneğin:

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

> `@ngx-translate/core` kurulu kalsın: TypeScript tiplerini sağlar. `@ngx-translate/http-loader` kaldırılabilir.

</Step>
<Step number={2} title="Intlayer'ı yapılandırın">

`syncJSON` plugin'ini mevcut çeviri dosyalarınıza yönlendirin. Namespace başına bir dosya ile (`src/i18n/en/home.json`), her dosya bir sözlük olur:

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

> `'home.title' | translate`, `home` sözlüğünün `title` alanına çözümlenir. Locale başına tek dosya (`src/assets/i18n/en.json`) ve iç içe anahtarlar kullanıyorsanız bunun yerine `source: ({ locale }) => \`./src/assets/i18n/${locale}.json\`` kullanın: her üst düzey anahtar bir sözlük olur.

</Step>
<Step number={3} title="esbuild plugin'ini ekleyin">

Angular CLI, esbuild plugin'lerini `@angular-builders/custom-esbuild` aracılığıyla kabul eder. Bir plugin dosyası oluşturun:

```typescript fileName="esbuild.plugins.ts"
import { ngxTranslateEsbuildPlugin } from "@intlayer/ngx-translate/esbuild";

export default [ngxTranslateEsbuildPlugin()];
```

Ardından `angular.json` içinde bu dosyaya referans verin:

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

Plugin, Intlayer build'ini çalıştırır ve `@ngx-translate/core`'u `@intlayer/ngx-translate`'e çözümler; kaynak dosyalarınızda değişiklik gerekmez.

> Vite (Analog) ile mi build ediyorsunuz? Bunun yerine `@intlayer/ngx-translate/plugin` içindeki `ngxTranslateVitePlugin()` kullanın.

</Step>
<Step number={4} title="HTTP loader'ı kaldırın">

`provideTranslateService()` kalsın, ancak `loader` seçeneğini kaldırın: mesajlar Intlayer sözlüklerinden gelir.

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

> Çeviriler artık bir loader'dan geçmez, bu yüzden `TranslateHttpLoader` ve `@ngx-translate/http-loader` kaldırılabilir.

</Step>
</Steps>

Template'leriniz ve servisleriniz değişmeden çalışmaya devam eder:

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

## Tam geçiş

<Steps>
<Step number={5} title="Import'ları açıkça yeniden adlandırma (isteğe bağlı)" isOptional={true}>

esbuild plugin'i alias'ları zaten yönetir. Bağımlılığı açık hale getirmek için:

| Önce                                                            | Sonra                                                               |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { TranslateService } from '@ngx-translate/core'`        | `import { TranslateService } from '@intlayer/ngx-translate'`        |
| `import { TranslatePipe } from '@ngx-translate/core'`           | `import { TranslatePipe } from '@intlayer/ngx-translate'`           |
| `import { provideTranslateService } from '@ngx-translate/core'` | `import { provideTranslateService } from '@intlayer/ngx-translate'` |

</Step>
<Step number={6} title="İçeriği .content.ts dosyalarına taşıyın" isOptional={true}>

Yeni bileşenler, mevcut ngx-translate çağrılarının yanında yerel Intlayer içeriğini kullanabilir. `app.config.ts` içinde `provideTranslateService()` yanına `angular-intlayer` içindeki `provideIntlayer()` öğesini kaydedin, ardından:

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
<Step number={7} title="Yapay zeka destekli çeviriyi etkinleştirin" isOptional={true}>

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

Doldurulan çeviriler JSON dosyalarınıza geri yazılır. Yapay zeka yapılandırması için [CLI dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) bakın.

</Step>
</Steps>

## Geçişten sonra silebilecekleriniz

| Dosya / kalıp                                                  | Neden artık gerekli değil                            |
| -------------------------------------------------------------- | ---------------------------------------------------- |
| `TranslateHttpLoader` / özel loader'lar                        | Sözlükler Intlayer tarafından derlenir ve yüklenir.  |
| `@ngx-translate/http-loader`                                   | Çeviri dosyaları artık çalışma zamanında indirilmez. |
| `provideHttpClient()` (yalnızca çeviriler için kullanılıyorsa) | Aynı neden.                                          |

## TypeScript'i yapılandırın

Üretilen tipleri `tsconfig.json` dosyanıza ekleyin:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Git yapılandırması

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [ngx-translate compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/ngx-translate.md)
- [Sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md)
- [Angular ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_angular_21.md)
- [Intlayer görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)
