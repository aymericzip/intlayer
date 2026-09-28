---
createdAt: 2025-04-18
updatedAt: 2026-09-27
priority: 9
title: "Angular 22 i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "Vite kullanan Angular 22'de Intlayer kurulumu: bileşenlerin yanında tipli içerik, dil başına ayrı derleme olmadan locale değişimi ve SEO."
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
applicationTemplate: https://github.com/aymericzip/intlayer-angular-22-template
applicationShowcase: https://intlayer-angular-22-template.vercel.app/
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımı doğrudan özellik erişimine güncellendi"
  - version: 8.0.0
    date: 2026-01-26
    changes: "Kararlı sürüm yayınlandı"
  - version: 8.0.0
    date: 2025-12-30
    changes: "init komutu eklendi"
  - version: 5.5.10
    date: 2025-06-29
    changes: "İlk sürüm geçmişi"
author: aymericzip
---

# Angular 22 (Vite) web sitenizi Intlayer kullanarak çevirin

## İçindekiler

<TOC/>

## Neden alternatifler yerine Intlayer?

'ngx-translate' veya 'angular-l10n' gibi ana çözümlerle karşılaştırıldığında Intlayer, aşağıdaki gibi entegre optimizasyonlarla gelen bir çözümdür:

<AccordionGroup>
<Accordion header="Tam Açısal kapsama">

Intlayer, **bileşen düzeyinde içerik kapsamı**, **tembel yüklü çeviriler** ve uluslararasılaştırmayı (i18n) ölçeklendirmek için gereken tüm özellikleri sunarak Angular ile mükemmel çalışacak şekilde optimize edilmiştir.

</Accordion>
<Accordion header="Bundle boyutu">

Sayfalarınıza çok büyük JSON dosyaları yüklemek yerine yalnızca gerekli içeriği yükleyin. Intlayer **bundle ve sayfa boyutlarınızı %50'ye kadar azaltmanıza** yardımcı olur.

</Accordion>
<Accordion header="Sürdürülebilirlik">

Uygulamanızın içeriğinin kapsamını belirlemek, büyük ölçekli uygulamalar için **bakımı kolaylaştırır**. İçerik kod tabanınızın tamamını gözden geçirmenin zihinsel yükü olmadan, tek bir özellik klasörünü çoğaltabilir veya silebilirsiniz. Ayrıca Intlayer, içeriğinizin doğruluğunu sağlamak için **tamamen tiplendirilmiş (fully typed)tır**.

</Accordion>
<Accordion header="Yapay Zeka Temsilcisi">

İçeriğin bir arada konumlandırılması **Büyük Dil Modellerinin (LLM'ler) ihtiyaç duyduğu bağlamı azaltır**. Intlayer ayrıca eksik çevirileri test etmek için **CLI** gibi bir araç paketiyle birlikte gelir**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)** ve **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)**, geliştirici deneyimini (DX) yapay zeka için daha da sorunsuz hale getirmek için ajanlar.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)

</Accordion>
<Accordion header="Otomasyon">

Maliyeti AI sağlayıcınıza ait olmak üzere seçtiğiniz LLM'yi kullanarak CI/CD işlem hattınızda çeviri yapmak için otomasyonu kullanın. Intlayer ayrıca içerik çıkarmayı otomatikleştirmek için bir **derleyici** ve **arka planda çeviri yapmaya** yardımcı olacak bir [web platformu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) sunar.

- [web platformu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)

</Accordion>
<Accordion header="Performans">

Büyük JSON dosyalarını bileşenlere bağlamak performans ve tepkime sorunlarına yol açabilir. Intlayer, içerik yüklemenizi derleme sırasında optimize eder.

</Accordion>
<Accordion header="Non-dev ile ölçeklendirme">

Bir i18n çözümünden çok daha fazlası olan Intlayer, **kendi kendine barındırılan bir [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)** ve **[tam CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)** çok dilli içeriğinizi **gerçek zamanlı** olarak yönetmenize yardımcı olarak çevirmenler, metin yazarları ve diğer ekip üyeleriyle işbirliğini kusursuz hale getirir. İçerik yerel olarak ve/veya uzaktan depolanabilir.

- [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)
- [tam CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## Intlayer'ı Bir Angular Uygulamasına Kurmak İçin Adım Adım Kılavuz

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-22-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Uygulamanızı Intlayer kullanarak nasıl uluslararasılaştırabilirsiniz"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-angular-22-template.vercel.app/"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-angular-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub'da [Uygulama Şablonunu](https://github.com/aymericzip/intlayer-angular-22-template) görüntüleyin.

<Steps>
<Step number={1} title="Bağımlılıkları Yükleyin">

Gerekli paketleri npm kullanarak kurun:

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

> `--interactive` bayrağı isteğe bağlıdır. Bir yapay zeka aracısıysanız `intlayer-cli init` kullanın.

> Bu komut ortamınızı algılayacak ve gerekli paketleri yükleyecektir. Örneğin:

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-esbuild --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-esbuild --save-dev
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-esbuild --save-dev
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-esbuild --dev
```

- **intlayer**

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), dönüştürme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için uluslararasılaştırma araçları sağlayan çekirdek paket.

- **angular-intlayer**
  Intlayer'ı Angular uygulamasıyla bütünleştiren paket. Angular uluslararasılaştırması için bağlam sağlayıcılar ve kancalar sunar.

- **@angular-builders/custom-esbuild**
  Angular CLI'nin esbuild yapılandırmasını özelleştirmek için gereklidir.

</Step>
<Step number={2} title="Projenizin Yapılandırması">

### Mimari

Bu mimaride, `angular-intlayer` her bileşenin içeriğini `useIntlayer` sinyali aracılığıyla okuyabilmesi için `src/app/app.config.ts` içinde kaydedilen `provideIntlayer()` işlevini sağlar. Angular CLI özel esbuild derleyicisine geçirilir ve `esbuild.plugins.ts`, içerik bildirimlerinizi izlemek ve yeniden derlemek için Intlayer eklentisini derleme sürecine kaydeder. İçerik bildirimleri `src/app/` içinde bileşenlerin yanında yer alır.

```bash
.
├── src
│   ├── app
│   │   ├── app.component.html        # Root template reading the content signal
│   │   ├── app.component.ts          # Root component using useIntlayer
│   │   ├── app.config.ts             # Application config with provideIntlayer()
│   │   ├── app.content.ts            # App content declaration
│   │   └── locale-switcher.component.ts
│   └── main.ts
├── angular.json                      # Custom esbuild builder for build and serve
├── esbuild.plugins.ts                # intlayerEsbuildPlugin() from angular-intlayer/esbuild
├── intlayer.config.ts
├── package.json
└── tsconfig.json
```

### Yapılandırma

Uygulamanızın dillerini yapılandırmak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Diğer dilleriniz
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Bu yapılandırma dosyası aracılığıyla yerelleştirilmiş URL'ler, ara yazılım yönlendirmesi, çerez adları, içerik bildirimlerinizin konumu ve uzantısı oluşturabilir, konsoldaki Intlayer günlüklerini devre dışı bırakabilir ve daha fazlasını yapabilirsiniz. Kullanılabilir parametrelerin tam listesi için [yapılandırma belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) başvurun.

- [yapılandırma belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)

</Step>
<Step number={3} title="Intlayer'ı Angular Yapılandırmanıza Entegre Edin">

Intlayer'ı Angular CLI ile bütünleştirmek için özel bir oluşturucu (builder) kullanmanız gerekir. Bu kılavuz, Vite/esbuild kullandığınızı (Angular 22 projeleri için varsayılan) varsaymaktadır.

Öncelikle, `angular.json` dosyanızı özel esbuild oluşturucuyu kullanacak şekilde değiştirin. `build` ve `serve` yapılandırmalarını güncelleyin:

```json5 fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application", // replace "@angular/build:application"
          "options": {
            "define": {
              "process.env": "{}",
            },
            "plugins": ["./esbuild.plugins.ts"],
            "browser": "src/main.ts",
            // ...
          },
        },
        "serve": {
          "builder": "@angular-builders/custom-esbuild:dev-server", // replace "@angular/build:dev-server"
          "options": {
            "prebundle": {
              "exclude": [
                "intlayer",
                "angular-intlayer",
                "@intlayer/config/built",
                "@intlayer/core"
              ]
          },
        },
      },
    },
  },
}
```

> `angular.json` içindeki `your-app-name` ifadesini projenizin gerçek adıyla değiştirdiğinizden emin olun.

Ardından, projenizin kök dizininde bir `esbuild.plugins.ts` dosyası oluşturun:

```typescript fileName="esbuild.plugins.ts"
import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";

export default [intlayerEsbuildPlugin()];
```

> `intlayerEsbuildPlugin` işlevi, esbuild'i Intlayer ile yapılandırır. İçerik beyan dosyalarını işlemek için eklentiyi yerleştirir ve optimum performans için takma adlar kurar.

> **NX kullanıcıları**: NX'in Angular derleyicileri, eklenti dosyalarını Node'un yerel ESM çözünürlüğü aracılığıyla yükler ve TypeScript eklenti dosyalarını anında derlemez. Bunun yerine bir `.mjs` dosyası kullanın ve `angular.json` dosyasındaki `plugins` referansını buna göre güncelleyin:
>
> ```javascript fileName="esbuild.plugins.mjs"
> import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";
>
> export default [intlayerEsbuildPlugin()];
> ```
>
> Ardından `angular.json` içinde `"./esbuild.plugins.ts"` yerine `"./esbuild.plugins.mjs"` değerini gösterin.

</Step>
<Step number={4} title="İçeriğinizi Bildirin">

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
    exploreDocs: t({
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      en: "Learn with Tutorials",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "CLI Docs",
    angularLanguageService: t({
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

> İçerik bildirimleriniz, `contentDir` dizinine (varsayılan olarak `./src`) eklendiği sürece uygulamanızın herhangi bir yerinde tanımlanabilir. Ayrıca içerik bildirimi dosya uzantısıyla (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) eşleşmelidir.

> Daha fazla ayrıntı için [içerik bildirimi belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

- [içerik bildirimi belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md)

</Step>
<Step number={5} title="Kodunuzda Intlayer'dan Yararlanın">

Tüm Angular uygulamanız boyunca Intlayer'ın uluslararasılaştırma özelliklerinden yararlanmak için, Intlayer'ı uygulamanızın yapılandırmasında sağlamanız gerekir.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // Intlayer sağlayıcısını buraya ekleyin
  ],
};
```

Ardından, herhangi bir bileşende `useIntlayer` işlevini kullanabilirsiniz.

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

Ve şablonunuzda:

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Intlayer içeriği bir `Signal` olarak döndürülür, böylece değerlere sinyali çağırarak erişebilirsiniz: `content().title`.

</Step>
<Step number={6} title="İçeriğinizin dilini değiştirin" isOptional={true}>

İçeriğinizin dilini değiştirmek için, `useLocale` işlevinin sağladığı `setLocale` işlevini kullanabilirsiniz. Bu, uygulamanın yerel ayarını belirlemenize ve içeriği buna göre güncellemenize olanak tanır.

Diller arasında geçiş yapmak için bir bileşen oluşturun:

```typescript fileName="src/app/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { useLocale } from "angular-intlayer";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="locale-switcher">
      <select
        [value]="locale()"
        (change)="setLocale($any($event.target).value)"
      >
        @for (loc of availableLocales; track loc) {
          <option [value]="loc">{{ loc }}</option>
        }
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

Sonra bu bileşeni `app.component.ts` dosyanızda kullanın:

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "./locale-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LocaleSwitcherComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

</Step>

</Steps>

### TypeScript'i Yapılandırın

Intlayer, TypeScript'in faydalarından yararlanmak ve kod tabanınızı daha güçlü kılmak için modül büyütme (Module Augmentation) kullanır.

![Otomatik tamamlama](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Çeviri hatası](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

TypeScript yapılandırmanızın otomatik oluşturulmuş türleri içerdiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri dahil et
  ],
}
```

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaları yoksaymanız önerilir. Bu, onları Git deponuza işlemenizi engeller.

Bunu yapmak için, `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```bash
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi geliştirmek için resmi **Intlayer VS Code Extension**'ı kurabilirsiniz.

- [VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- Çeviri anahtarları için **otomatik tamamlama**.
- Eksik çeviriler için **gerçek zamanlı hata algılama**.
- Çevrilmiş içeriğin **satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **hızlı eylemler**.

Uzantının nasıl kullanılacağına dair daha fazla ayrıntı için [Intlayer VS Code Uzantı belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md) başvurun.

- [Intlayer VS Code Uzantı belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)

### Daha İleri Gidin

Daha ileri gitmek için [görsel düzenleyiciyi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak içeriğinizi dışsallaştırabilirsiniz.

- [görsel düzenleyiciyi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)

## Sıkça Sorulan Sorular

<FAQ>

<Question title="Angular uygulamasını uluslararasılaştırmak için hangi farklı çözümler mevcuttur?">

- **Yerleşik `@angular/localize`**: dil başına derleme.
- **`ngx-translate`** ve **`Transloco`**: çalışma zamanı katalogları.
- **`Intlayer`**: Standalone bileşenler, Signal girdileri ve Vite tabanlı yeni derleme mimarisi ile tam uyumlu modern çözüm.

Bkz. [neden Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md).

- [neden Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md)

</Question>
<Question title="i18n Angular paket boyutuma ne kadar ekler?">

Ad alanı tabanlı bir kuruluma kıyasla çok daha az, çünkü bir sayfa render etmediği bir sözlüğü asla indirmez. Derleme zamanı derleyicisi `useIntlayer` çağrılarını bileşenin kullandığı kesin kayıtlarla değiştirir ve [dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md) geri kalanını diller arasında böler. Intlayer paket boyutunu %50'ye kadar azaltır. Bkz. [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) ve [kıyaslama](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md).

- [dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md)
- [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md)
- [kıyaslama](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md)

</Question>
<Question title="`ngx-translate`, `Transloco` veya `@angular/localize`'dan şablonlarımı yeniden yazmadan geçiş yapabilir miyim?">

Büyük ölçüde evet. İçeriği taşımak için [ngx-translate geçiş kılavuzunu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/ngx-translate.md) veya [Transloco geçiş kılavuzunu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/transloco.md) izleyin. Kademeli olarak da geçiş yapabilirsiniz: [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) mevcut JSON kataloglarınızı doğruluk kaynağı olarak tutar ve Intlayer sözlüklerini bunlardan üretir; böylece şablonları tek tek taşırken iki katman senkronize kalır.

- [ngx-translate geçiş kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/ngx-translate.md)
- [Transloco geçiş kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/transloco.md)
- [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md)

</Question>
<Question title="Mevcut JSON çeviri dosyalarımı koruyabilir miyim?">

Evet. [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md), `/messages/{locale}/{namespace}.json` dosyalarınızı doğruluk kaynağı olarak tutar ve her iki yönde Intlayer sözlükleri üretir. [sync PO eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md) gettext katalogları için aynısını yapar ve [yerel başına dosyalar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/per_locale_file.md), yerelleri tek bir dosyada gruplamak yerine içeriği dile göre ayırmanıza olanak tanır.

- [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md)
- [sync PO eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md)
- [yerel başına dosyalar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/per_locale_file.md)

</Question>
<Question title="İçeriğimi anahtar anahtar taşımak zorunda mıyım?">

Hayır. `npx intlayer extract` komutunu çalıştırın; Intlayer kaynak dosyalarınızı okur, kullanıcıya dönük dizeleri çıkarır ve her birinin yanına bir `.content` dosyası yazar, böylece dizeleri tek tek kopyalamak yerine bir diff incelersiniz. Bkz. [extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md).

- [extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md)

Tam otomatik bir akış için [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) derleme sırasında aynı işlemi yapar ve sözlükleri her değişiklikte otomatik üretir.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md)

</Question>
<Question title="Hangi editör ve AI aracı araçları mevcuttur?">

Beş araç, hepsi isteğe bağlı:

- **[VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)**: bir `useIntlayer` anahtarından onu tanımlayan içerik dosyasına atlayın, bileşenden içerik çıkarın ve komut paletinden build, fill, test, push ve pull komutlarını çalıştırın.
- **[LSP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**: LSP destekleyen tüm editörlerde tanıma gitme, tüm referansları bulma, çevrilmiş değerlerin fareyle üzerine gelindiğinde önizlemesi ve otomatik tamamlama. `i18next`, `react-i18next`, `next-intl` ve `use-intl` çağrılarını da çözer.
- **[MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)**: Intlayer dokümantasyonunu ve CLI'sini Cursor, VS Code, Claude Desktop, Claude Code ve ChatGPT'ye sunar.
- **[Ajan becerileri (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)**: `intlayer-config`, `intlayer-cli` ve `intlayer-content` gibi odaklanmış beceriler.
- **[ESLint eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/eslint.md)**: `no-raw-text` kuralı doğrudan kodlanmış metinleri işaretler.

</Question>
<Question title="Intlayer Angular signals ve standalone bileşenleri destekliyor mu?">

Evet. İçerik signal'ler aracılığıyla sunulur, bu nedenle locale değiştiğinde şablon sayfa yeniden yüklenmeden yeniden render edilir ve provider diğer standalone provider'lar gibi kaydedilir.

</Question>
<Question title="Her dil için ayrı bir build gerekir mi?">

Hayır. Bu `@angular/localize` modelidir. Intlayer ile tek bir build tüm tanımlı locale'lere hizmet eder, aktif dil çalışma zamanında URL'den, bir cookie'den veya `Accept-Language` başlığından belirlenir ve yalnızca görüntülenen locale'in içeriği indirilir.

</Question>
<Question title="Dili çalışma zamanında nasıl değiştiririm?">

Bu konu 6. adımda ele alınıyor. `useLocale` aktif locale'i, tanımlı locale'leri ve seçimi kalıcı hale getiren bir setter'ı sunar; `getLocalizedUrl` ise mevcut yolu yeniden yazar, böylece kullanıcı dil değiştirdikten sonra aynı rotada kalır.

</Question>
<Question title="Bir Angular uygulamasını AI ile otomatik olarak nasıl çevirebilirim?">

Eksik çevirileri seçtiğiniz LLM ile, kendi sağlayıcınızı ve API anahtarınızı kullanarak dolduran `npx intlayer fill` komutunu çalıştırın. `--git-diff` çalıştırmayı daldaki değişen içerikle sınırlar. Bkz. [fill komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md) ve [CI/CD entegrasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/CI_CD.md).

- [fill komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md)
- [CI/CD entegrasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/CI_CD.md)

</Question>
<Question title="Intlayer çoğulları, cinsiyeti ve zengin metni (rich text) destekliyor mu?">

Evet: [çoğul biçimler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/plurial.md), [cinsiyete dayalı içerik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/gender.md), koşullar, [eklemeler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/markdown.md) ve sayılar, tarihler ve para birimleri için [biçimlendiriciler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/formatters.md).

- [çoğul biçimler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/plurial.md)
- [cinsiyete dayalı içerik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/gender.md)
- [eklemeler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/markdown.md)
- [biçimlendiriciler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/formatters.md)

</Question>
<Question title="Eksik çevirileri yayınlamadan önce nasıl yakalarım?">

CI'da `npx intlayer test` komutunu çalıştırın. Tanımlı bir locale'de içerik eksik olduğunda build'i başarısız kılar. [VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md) aynı hataları siz yazarken bildirir. Bkz. [içeriğinizi test etme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/testing.md).

- [VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)
- [içeriğinizi test etme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/testing.md)

</Question>
<Question title="Çevirmenler koda dokunmadan içeriği nasıl düzenleyebilir?">

Kendi altyapınızda çalışan ve herkesin çalışan uygulama üzerinde metni yerinde düzenlemesine olanak tanıyan [görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) ya da içeriği dışsallaştırarak dağıtım yapmadan değiştirilebilmesini sağlayan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) aracılığıyla.

- [görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)

</Question>
<Question title="Intlayer ücretsiz ve açık kaynaklı mı?">

Evet, ticari kullanım dahil Apache 2.0 lisansı altında. Barındırılan CMS, isteğe bağlı ücretli bir hizmettir ve [kendi sunucunuzda barındırılabilir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md).

- [kendi sunucunuzda barındırma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md)

</Question>

</FAQ>
