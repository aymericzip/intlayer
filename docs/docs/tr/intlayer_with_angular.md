---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Angular uygulamanızı nasıl çevirirsiniz – i18n rehberi 2025
description: Angular web sitenizi çok dilli hale getirmeyi keşfedin. Dokümantasyonu takip ederek uluslararasılaştırma (i18n) yapın ve çevirin.
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
# applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Intlayer ile Angular çevirin | Uluslararasılaştırma (i18n)

> Bu paket geliştirme aşamasındadır. Daha fazla bilgi için [soruna](https://github.com/aymericzip/intlayer/issues/116) bakın. Sorunu beğenerek Angular için Intlayer'a olan ilginizi gösterin

<!-- GitHub'da [Uygulama Şablonu](https://github.com/aymericzip/intlayer-angular-template)'na bakın. -->

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- **Bileşen düzeyinde bildirimsel sözlükler kullanarak çevirileri kolayca yönetin**.
- **Meta verileri, rotaları ve içeriği dinamik olarak yerelleştirin**.
- **Otomatik oluşturulan türlerle TypeScript desteği sağlayın**, otomatik tamamlama ve hata algılamayı iyileştirin.
- **Dinamik yerel algılama ve değiştirme gibi gelişmiş özelliklerden yararlanın**.

---

## Angular Uygulamasında Intlayer'ı Kurmak İçin Adım Adım Kılavuz

### Adım 1: Bağımlılıkları Yükleyin

Gerekli paketleri npm kullanarak yükleyin:

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

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilasyon ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **angular-intlayer**
  Intlayer'ı Angular uygulamasıyla entegre eden paket. Angular uluslararasılaştırması için bağlam sağlayıcıları ve hook'lar sağlar.

- **@intlayer/webpack**

  Intlayer'ı Webpack ile entegre eden paket. Angular CLI tarafından içerik bildirim dosyalarını oluşturmak ve geliştirme modunda izlemek için kullanılır.

### Adım 2: Projenizi Yapılandırın

Uygulamanızın dillerini yapılandırmak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Diğer yerel ayarlarınız
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
      // Diğer yerel ayarlarınız
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
      // Diğer yerel ayarlarınız
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'ler, ara yazılım yönlendirmesi, çerez adları, içerik bildirimlerinizin konumu ve uzantısı ayarlayabilir, Intlayer günlüklerini konsolda devre dışı bırakabilir ve daha fazlasını yapabilirsiniz. Kullanılabilir parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

### Adım 3: Intlayer'ı Angular Yapılandırmanızda Entegre Edin

Angular CLI ile Intlayer'ı entegre etmek için oluşturucunuza bağlı olarak iki seçeneğiniz vardır: `esbuild` veya `webpack`.

#### Seçenek 1: esbuild Kullanarak (Önerilen)

Öncelikle, özel esbuild oluşturucusunu kullanmak için `angular.json`'unuzu değiştirin. `build` yapılandırmasını güncelleyin:

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application",
          "options": {
            "plugins": ["./esbuild/intlayer-plugin.ts"]
          }
        }
      }
    }
  }
}
```

> `angular.json`'da `your-app-name`'i projenizin gerçek adıyla değiştirdiğinizden emin olun.

Ardından, projenizin kökünde bir `esbuild/intlayer-plugin.ts` dosyası oluşturun:

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
      logger("Intlayer esbuild plugin started", {
        level: "info",
      });

      if (build.initialOptions.watch && !isWatching) {
        logger("Watch mode enabled. Starting watcher...", {
          level: "info",
        });
        watch(configuration);
        isWatching = true;
      }

      try {
        await prepareIntlayer(configuration);
      } catch (error) {
        logger(`Error in Intlayer esbuild plugin: ${error}`, {
          level: "error",
        });
      }
    });
  },
};

export default intlayer;
```

> esbuild için `intlayer`, Intlayer'ın oluşturma başlamadan önce hazırlanmasını ve geliştirme modunda değişiklikleri izlemesini sağlar.

#### Seçenek 2: Webpack Kullanarak

Öncelikle, özel Webpack oluşturucusunu kullanmak için `angular.json`'unuzu değiştirin. `build` ve `serve` yapılandırmalarını güncelleyin:

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

> `angular.json`'da `your-app-name`'i projenizin gerçek adıyla değiştirdiğinizden emin olun.

Ardından, projenizin kökünde bir `webpack.config.js` dosyası oluşturun:

```javascript fileName="webpack.config.js"
const { IntlayerWebpackPlugin } = require("@intlayer/webpack");

module.exports = {
  plugins: [new IntlayerWebpackPlugin()],
};
```

> `IntlayerWebpackPlugin`, Intlayer'ı Webpack ile entegre etmek için kullanılır. İçerik bildirim dosyalarının oluşturulmasını ve geliştirme modunda izlenmesini sağlar. Uygulama içinde Intlayer ortam değişkenlerini tanımlar. Ek olarak, performansı optimize etmek için takma adlar sağlar.

### Adım 4: İçeriğinizi Bildirin

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

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

> İçerik bildirimleriniz uygulamanızda herhangi bir yerde tanımlanabilir, yeter ki `contentDir` dizinine dahil edilsinler (varsayılan olarak `./src`). Ve içerik bildirim dosyası uzantısıyla eşleşsinler (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Daha fazla detay için [içerik bildirimi dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md) bakın.

### Adım 5: Kodunuzda Intlayer'ı Kullanın

Angular uygulamanız genelinde Intlayer'ın uluslararasılaştırma özelliklerini kullanmak için, bir bileşen içinde `useIntlayer` fonksiyonunu kullanmanız gerekir. Bu fonksiyon, `angular-intlayer`'dan kullanılabilir ve çevirilerinize reaktif sinyaller olarak erişim sağlar.

`IntlayerProvider` uygulamanın kökünde kayıtlıdır, bu yüzden onu modülünüzün sağlayıcılarına eklemeniz gerekmez.

Bileşen sınıfınızda içerik sözlüklerinize erişin:

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

Intlayer içeriği bir `Signal` olarak döndürülür, bu yüzden şablonunuzda değerlere sinyali çağırarak erişirsiniz: `content().title`.

### (İsteğe Bağlı) Adım 6: İçeriğinizin Dilini Değiştirin

İçeriğinizin dilini değiştirmek için, `useLocale` fonksiyonu tarafından sağlanan `setLocale` fonksiyonunu kullanabilirsiniz. Bu, uygulamanın yerel ayarını ayarlamanıza ve içeriği buna göre güncellemenize izin verir.

Diller arasında geçiş yapmak için bir bileşen oluşturun:

```typescript fileName="src/app/components/locale-switcher.component.ts"
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

  // getLocaleName'i şablona göster
  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
```

Ardından, bu bileşeni `app.component.ts`'nizde kullanın:

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
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://angular.dev/" target="_blank">
        <img
          src="/assets/angular.svg"
          class="logo angular"
          alt="Angular logo"
        />
      </a>
    </div>
    <app-hello-world />
  `,
})
export class AppComponent {}
```

### (İsteğe Bağlı) Adım 7: Uygulamanıza Yerelleştirilmiş Yönlendirme Ekleyin

Angular uygulamasında yerelleştirilmiş yönlendirme eklemek, yerel öneklerle Angular Router kullanmayı içerir. Bu, SEO için yararlı olan her dil için benzersiz rotalar oluşturur.

Örnek:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Öncelikle `@angular/router`'ın yüklü olduğundan emin olun.

Ardından, `app.routes.ts`'de yerel tabanlı yönlendirmeyi işleyen bir yönlendirici yapılandırması oluşturun.

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

Ardından, yönlendiriciyi `app.config.ts`'nizde sağlayın.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

### (İsteğe Bağlı) Adım 8: Yerel Ayar Değiştiğinde URL'yi Değiştirin

Kullanıcı dili değiştirdiğinde URL'yi otomatik olarak güncellemek için, Angular'ın Router'ını kullanacak şekilde `LocaleSwitcher` bileşenini değiştirebilirsiniz:

```typescript fileName="src/app/components/locale-switcher.component.ts"
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
```

### (İsteğe Bağlı) Adım 9: HTML Dil ve Yön Özniteliklerini Değiştirin

Uygulamanız birden fazla dili desteklediğinde, `<html>` etiketinin `lang` ve `dir` özniteliklerini geçerli yerel ayarla eşleşecek şekilde güncellemek çok önemlidir.

Bunu otomatik olarak işlemek için bir servis oluşturabilirsiniz.

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

  // Bu yöntem, uygulamanın kök bileşeninde çağrılarak servisin başlatılmasını sağlayabilir.
  init() {}
}
```

Ardından, bu servisi ana `AppComponent`'ınızda enjekte edin ve başlatın:

```typescript fileName="src/app/app.component.ts"
import { Component, inject } from "@angular/core";
// ... diğer içe aktarmalar
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

### (İsteğe Bağlı) Adım 10: Yerelleştirilmiş Bağlantı Yönergesi Oluşturun

Uygulamanızın gezinmesinin geçerli yerel ayarı saygı göstermesini sağlamak için özel bir yönerge oluşturabilirsiniz. Bu yönerge dahili URL'leri otomatik olarak geçerli dille önekler.

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

Kullanmak için, bağlantı etiketlerinize `appLocalizedLink` yönergesini ekleyin ve bileşeninizde içe aktardığınızdan emin olun.

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

### (İsteğe Bağlı) Adım 11: Markdown Oluşturun

Intlayer Markdown içeriği oluşturmayı destekler. Markdown'ı zengin HTML'ye dönüştürmek için [markdown-it](https://github.com/markdown-it/markdown-it)'i entegre edebilirsiniz.

Öncelikle `markdown-it`'i yükleyin:

```bash
npm install markdown-it
# ve türlerini
npm install -D @types/markdown-it
```

Ardından, `app.config.ts`'nizde `INTLAYER_MARKDOWN_TOKEN`'u yapılandırın.

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

Varsayılan olarak, Intlayer işlenmiş HTML'yi bir dize olarak döndürür. `[innerHTML]` kullanarak bağlarsanız, güvenlik etkilerinden (XSS) haberdar olun. Her zaman içeriğinizin güvenilir bir kaynaktan olduğundan emin olun.

Daha karmaşık senaryolar için, HTML'yi güvenli bir şekilde oluşturmak üzere bir boru oluşturabilirsiniz.

### TypeScript'i Yapılandırın

Intlayer, kod tabanınızı daha güçlü hale getirmek için modül genişletmesi kullanır ve TypeScript avantajlarından yararlanır.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript yapılandırmanızın otomatik oluşturulan türleri içerdiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri dahil edin
  ],
}
```

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaları yok saymanız önerilir. Bu, onları Git deponuza commit etmenizi önler.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext
# Intlayer tarafından oluşturulan dosyaları yok say
.intlayer
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Uzantısı**'nı yükleyebilirsiniz.

[VS Code Marketplace'ten Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- **Çeviri anahtarları için otomatik tamamlama**.
- **Eksik çeviriler için gerçek zamanlı hata algılama**.
- **Çevrilmiş içeriğin satır içi önizlemeleri**.
- **Çevirileri kolayca oluşturmak ve güncellemek için hızlı eylemler**.

Uzantının nasıl kullanılacağı hakkında daha fazla detay için [Intlayer VS Code Uzantısı dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakın.

---

### Daha Fazla Gidin

Daha fazla gitmek için [görsel düzenleyiciyi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) uygulayabilir veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) kullanarak harici hale getirebilirsiniz.

---
