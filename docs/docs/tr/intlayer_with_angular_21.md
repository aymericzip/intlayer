---
createdAt: 2025-04-18
updatedAt: 2026-05-31
title: "Angular 21 i18n - Angular 21 uygulamasını çevirmek için eksiksiz kılavuz"
description: "Artık i18next yok. 2026 yılı için çok dilli (i18n) Angular 21 uygulaması oluşturma kılavuzu. Yapay zeka ajanlarıyla çevirin ve bundle boyutu, SEO ve performansı optimize edin."
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
applicationTemplate: https://github.com/aymericzip/intlayer-angular-21-template
applicationShowcase: https://intlayer-angular-21-template.vercel.app/
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
---

# Angular 21 (Vite) web sitenizi Intlayer kullanarak çevirin | Uluslararasılaştırma (i18n)

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

İçeriğin bir arada konumlandırılması **Büyük Dil Modellerinin (LLM'ler) ihtiyaç duyduğu bağlamı azaltır**. Intlayer ayrıca eksik çevirileri test etmek için **CLI** gibi bir araç paketiyle birlikte gelir**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** ve **[aracı becerileri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, geliştirici deneyimini (DX) yapay zeka için daha da sorunsuz hale getirmek için ajanlar.

</Accordion>

<Accordion header="Otomasyon">

Maliyeti AI sağlayıcınıza ait olmak üzere seçtiğiniz LLM'yi kullanarak CI/CD işlem hattınızda çeviri yapmak için otomasyonu kullanın. Intlayer ayrıca içerik çıkarmayı otomatikleştirmek için bir **derleyici** ve **arka planda çeviri yapmaya** yardımcı olacak bir [web platformu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) sunar.

</Accordion>

<Accordion header="Performans">

Büyük JSON dosyalarını bileşenlere bağlamak performans ve tepkime sorunlarına yol açabilir. Intlayer, içerik yüklemenizi derleme sırasında optimize eder.

</Accordion>

<Accordion header="Non-dev ile ölçeklendirme">

Bir i18n çözümünden çok daha fazlası olan Intlayer, **kendi kendine barındırılan bir [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** ve **[tam CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** çok dilli içeriğinizi **gerçek zamanlı** olarak yönetmenize yardımcı olarak çevirmenler, metin yazarları ve diğer ekip üyeleriyle işbirliğini kusursuz hale getirir. İçerik yerel olarak ve/veya uzaktan depolanabilir.

</Accordion>
</AccordionGroup>

---

## Intlayer'ı Bir Angular Uygulamasına Kurmak İçin Adım Adım Kılavuz

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-21-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Uygulamanızı Intlayer kullanarak nasıl uluslararasılaştırabilirsiniz"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-angular-21-template.vercel.app/"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-angular-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub'da [Uygulama Şablonunu](https://github.com/aymericzip/intlayer-angular-21-template) görüntüleyin.

<Steps>

<Step number={1} title="Bağımlılıkları Yükleyin">

Gerekli paketleri npm kullanarak kurun:

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-esbuild --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-esbuild --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-esbuild --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-esbuild --dev
bun x intlayer init
```

- **intlayer**

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), dönüştürme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için uluslararasılaştırma araçları sağlayan çekirdek paket.

- **angular-intlayer**
  Intlayer'ı Angular uygulamasıyla bütünleştiren paket. Angular uluslararasılaştırması için bağlam sağlayıcılar ve kancalar sunar.

- **@angular-builders/custom-esbuild**
  Angular CLI'nin esbuild yapılandırmasını özelleştirmek için gereklidir.

</Step>

<Step number={2} title="Projenizin Yapılandırması">

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

</Step>

<Step number={3} title="Intlayer'ı Angular Yapılandırmanıza Entegre Edin">

Intlayer'ı Angular CLI ile bütünleştirmek için özel bir oluşturucu (builder) kullanmanız gerekir. Bu kılavuz, Vite/esbuild kullandığınızı (Angular 21 projeleri için varsayılan) varsaymaktadır.

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

> İçerik bildirimleriniz, `contentDir` dizinine (varsayılan olarak `./src`) eklendiği sürece uygulamanızın herhangi bir yerinde tanımlanabilir. Ayrıca içerik bildirimi dosya uzantısıyla (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) eşleşmelidir.

> Daha fazla ayrıntı için [içerik bildirimi belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

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

![Çeviri hatası](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

[VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- Çeviri anahtarları için **otomatik tamamlama**.
- Eksik çeviriler için **gerçek zamanlı hata algılama**.
- Çevrilmiş içeriğin **satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **hızlı eylemler**.

Uzantının nasıl kullanılacağına dair daha fazla ayrıntı için [Intlayer VS Code Uzantı belgelerine](https://intlayer.org/doc/vs-code-extension) başvurun.

---

### Daha İleri Gidin

Daha ileri gitmek için [görsel düzenleyiciyi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak içeriğinizi dışsallaştırabilirsiniz.

---
