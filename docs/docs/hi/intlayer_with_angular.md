---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: अपना Angular ऐप कैसे अनुवाद करें – i18n गाइड 2025
description: जानें कि Angular की वेबसाइट को बहुभाषी कैसे बनाएं। इसे अंतर्राष्ट्रीय (i18n) और अनुवादित करने के लिए प्रलेखन का पालन करें।
keywords:
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: प्रारंभिक इतिहास
---

# Intlayer के साथ अपना Angular अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

> यह पैकेज विकासाधीन है। अधिक जानकारी के लिए [issue](https://github.com/aymericzip/intlayer/issues/116) देखें। Angular के लिए Intlayer में अपनी रुचि दिखाने के लिए इस issue को लाइक करें।

<!-- See [Application Template](https://github.com/aymericzip/intlayer-angular-template) on GitHub. -->

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

Intlayer के साथ, आप कर सकते हैं:

- **घोषणात्मक शब्दकोशों का उपयोग करके अनुवादों का आसानी से प्रबंधन करें** जो कंपोनेंट स्तर पर होते हैं।
- **मेटाडेटा, रूट्स, और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **स्वचालित रूप से उत्पन्न प्रकारों के साथ TypeScript समर्थन सुनिश्चित करें**, जिससे ऑटोकंप्लीशन और त्रुटि पहचान में सुधार होता है।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील लोकल डिटेक्शन और स्विचिंग।

---

## Angular एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

### चरण 1: निर्भरताएँ स्थापित करें

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer angular-intlayer @intlayer/webpack
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/webpack
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/webpack
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer @intlayer/webpack
bunx intlayer init
```

- **intlayer**

  यह मुख्य पैकेज है जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md), ट्रांसपाइलेशन, और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md) के लिए अंतरराष्ट्रीयकरण उपकरण प्रदान करता है।

- **angular-intlayer**
  यह पैकेज Intlayer को Angular एप्लिकेशन के साथ एकीकृत करता है। यह Angular अंतरराष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है।

- **@intlayer/webpack**
- **@intlayer/webpack**

  वह पैकेज जो Intlayer को Webpack के साथ एकीकृत करता है। इसे Angular CLI द्वारा कंटेंट डिक्लेरेशन फ़ाइलों को बनाने और विकास मोड में उनकी निगरानी के लिए उपयोग किया जाता है।

### चरण 2: अपने प्रोजेक्ट का कॉन्फ़िगरेशन

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
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
      // आपके अन्य स्थानीय भाषाएँ
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
      // आपके अन्य स्थानीय भाषाएँ
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर रीडायरेक्शन, कुकी नाम, आपकी सामग्री घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग को अक्षम कर सकते हैं, और भी बहुत कुछ। उपलब्ध सभी पैरामीटर की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

### चरण 3: अपने Angular कॉन्फ़िगरेशन में Intlayer को एकीकृत करें

Angular CLI के साथ Intlayer को एकीकृत करने के लिए, आपके पास आपके बिल्डर के आधार पर दो विकल्प हैं: `esbuild` या `webpack`।

#### विकल्प 1: esbuild का उपयोग करना (अनुशंसित)

सबसे पहले, अपने `angular.json` को संशोधित करें ताकि कस्टम esbuild बिल्डर का उपयोग किया जा सके। `build` कॉन्फ़िगरेशन को अपडेट करें:

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

> सुनिश्चित करें कि `your-app-name` को आपके प्रोजेक्ट के वास्तविक नाम से `angular.json` में बदल दिया गया है।

इसके बाद, अपने प्रोजेक्ट की रूट में `esbuild/intlayer-plugin.ts` फ़ाइल बनाएं:

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
      logger("Intlayer esbuild प्लगइन शुरू हो गया", {
        level: "info",
      });

      if (build.initialOptions.watch && !isWatching) {
        logger("वॉच मोड सक्षम है। वॉचर शुरू किया जा रहा है...", {
          level: "info",
        });
        watch(configuration);
        isWatching = true;
      }

      try {
        await prepareIntlayer(configuration);
      } catch (error) {
        logger(`Intlayer esbuild प्लगइन में त्रुटि: ${error}`, {
          level: "error",
        });
      }
    });
  },
};

export default intlayer;
```

> esbuild के लिए `intlayer` यह सुनिश्चित करता है कि Intlayer बिल्ड शुरू होने से पहले तैयार हो और विकास मोड में परिवर्तनों के लिए वॉच करे।

#### विकल्प 2: Webpack का उपयोग करना

सबसे पहले, अपने `angular.json` को कस्टम Webpack बिल्डर का उपयोग करने के लिए संशोधित करें। `build` और `serve` कॉन्फ़िगरेशन को अपडेट करें:

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

> सुनिश्चित करें कि `your-app-name` को आपके प्रोजेक्ट के वास्तविक नाम से `angular.json` में बदल दिया गया है।

इसके बाद, अपने प्रोजेक्ट की रूट डायरेक्टरी में एक `webpack.config.js` फ़ाइल बनाएं:

```javascript fileName="webpack.config.js" codeFormat="commonjs"
const { IntlayerWebpackPlugin } = require("@intlayer/webpack");

module.exports = {
  plugins: [new IntlayerWebpackPlugin()],
};
```

> `IntlayerWebpackPlugin` का उपयोग Intlayer को Webpack के साथ एकीकृत करने के लिए किया जाता है। यह कंटेंट घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह एप्लिकेशन के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

### चरण 4: अपनी सामग्री घोषित करें

अनुवाद संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएं और प्रबंधित करें:

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
      hi: "बधाई हो! आपका ऐप चल रहा है। 🎉",
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
    exploreDocs: t({
      hi: "डॉक्स एक्सप्लोर करें",
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      hi: "ट्यूटोरियल के साथ सीखें",
      en: "Learn with Tutorials",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "CLI Docs",
    angularLanguageService: t({
      hi: "एंगुलर भाषा सेवा",
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

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हों (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)।

> अधिक विवरण के लिए, [सामग्री घोषणा प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md) देखें।

### चरण 5: अपने कोड में Intlayer का उपयोग करें

अपने Angular एप्लिकेशन में Intlayer की अंतरराष्ट्रीयकरण सुविधाओं का उपयोग करने के लिए, आपको एक कॉम्पोनेंट के भीतर `useIntlayer` फ़ंक्शन का उपयोग करना होगा। यह फ़ंक्शन, जो `angular-intlayer` से उपलब्ध है, आपको प्रतिक्रियाशील सिग्नल के रूप में अपने अनुवादों तक पहुँच प्रदान करता है।

`IntlayerProvider` एप्लिकेशन की रूट में पंजीकृत है, इसलिए आपको इसे अपने मॉड्यूल के providers में जोड़ने की आवश्यकता नहीं है।

अपने कंपोनेंट क्लास में अपनी सामग्री शब्दकोशों तक पहुँचें:

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

Intlayer सामग्री एक `Signal` के रूप में लौटाई जाती है, इसलिए आप टेम्पलेट में सिग्नल को कॉल करके मानों तक पहुँचते हैं: `content().title`।

### (वैकल्पिक) चरण 6: अपनी सामग्री की भाषा बदलें

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` फ़ंक्शन द्वारा प्रदान किया गया `setLocale` फ़ंक्शन उपयोग कर सकते हैं। यह आपको एप्लिकेशन की लोकल सेट करने और सामग्री को तदनुसार अपडेट करने की अनुमति देता है।

भाषाओं के बीच स्विच करने के लिए एक कॉम्पोनेंट बनाएं:

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

  // टेम्पलेट के लिए getLocaleName को एक्सपोज़ करें
  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
```

फिर, इस कंपोनेंट का उपयोग अपने `app.component.ts` में करें:

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

### (वैकल्पिक) चरण 7: अपने एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ें

Angular एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ने के लिए Angular Router का उपयोग स्थानीय उपसर्गों (locale prefixes) के साथ किया जाता है। इससे प्रत्येक भाषा के लिए अद्वितीय रूट बनते हैं, जो SEO के लिए उपयोगी होता है।

उदाहरण:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

सबसे पहले, सुनिश्चित करें कि आपके पास `@angular/router` इंस्टॉल है।

फिर, `app.routes.ts` में एक राउटर कॉन्फ़िगरेशन बनाएं जो स्थानीयकृत रूटिंग को संभाले।

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

फिर, आपको अपने `app.config.ts` में राउटर प्रदान करना होगा।

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

### (वैकल्पिक) चरण 8: जब भाषा बदले तो URL बदलें

जब उपयोगकर्ता भाषा बदलता है, तो URL को स्वचालित रूप से अपडेट करने के लिए, आप `LocaleSwitcher` कॉम्पोनेंट को Angular के Router का उपयोग करने के लिए संशोधित कर सकते हैं:

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

### (वैकल्पिक) चरण 9: HTML भाषा और दिशा विशेषताओं को स्विच करें

जब आपका एप्लिकेशन कई भाषाओं का समर्थन करता है, तो यह आवश्यक है कि `<html>` टैग के `lang` और `dir` गुणों को वर्तमान लोकल के अनुसार अपडेट किया जाए।

आप एक सेवा बना सकते हैं जो इसे स्वचालित रूप से संभाले।

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

  // इस मेथड को ऐप के रूट कंपोनेंट में कॉल किया जा सकता है ताकि यह सुनिश्चित किया जा सके कि सेवा इनिशियलाइज़ हो गई है।
  init() {}
}
```

फिर, इस सेवा को अपने मुख्य `AppComponent` में इंजेक्ट और इनिशियलाइज़ करें:

```typescript fileName="src/app/app.component.ts"
import { Component, inject } from "@angular/core";
// ... अन्य इम्पोर्ट्स
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

### (वैकल्पिक) चरण 10: एक स्थानीयकृत लिंक डायरेक्टिव बनाना

अपने एप्लिकेशन की नेविगेशन को वर्तमान लोकल के अनुसार सुनिश्चित करने के लिए, आप एक कस्टम डायरेक्टिव बना सकते हैं। यह डायरेक्टिव स्वचालित रूप से आंतरिक URL को वर्तमान भाषा के साथ प्रीफिक्स करता है।

यदि यह एक बाहरी लिंक है या `this.originalHref` मौजूद नहीं है, तो इसे वैसे ही लौटाएं।

```typescript
if (isExternalLink || !this.originalHref) {
  return this.originalHref;
}

return getLocalizedUrl(this.originalHref, locale);
```

इसे उपयोग करने के लिए, अपने एंकर टैग में `appLocalizedLink` निर्देश जोड़ें और सुनिश्चित करें कि आपने इसे अपने कंपोनेंट में आयात किया है।

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

### (वैकल्पिक) चरण 11: मार्कडाउन रेंडर करें

Intlayer Markdown सामग्री को रेंडर करने का समर्थन करता है। Markdown को समृद्ध HTML में परिवर्तित करने के लिए, आप [markdown-it](https://github.com/markdown-it/markdown-it) को एकीकृत कर सकते हैं।

सबसे पहले, `markdown-it` इंस्टॉल करें:

```bash
npm install markdown-it
# और इसके प्रकार
npm install -D @types/markdown-it
```

इसके बाद, अपने `app.config.ts` में `INTLAYER_MARKDOWN_TOKEN` को कॉन्फ़िगर करें।

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

डिफ़ॉल्ट रूप से, Intlayer रेंडर किए गए HTML को एक स्ट्रिंग के रूप में लौटाएगा। यदि आप इसे बाइंड करने के लिए `[innerHTML]` का उपयोग करते हैं, तो सुरक्षा संबंधी प्रभावों (XSS) के प्रति सावधान रहें। हमेशा सुनिश्चित करें कि आपकी सामग्री विश्वसनीय स्रोत से है।

अधिक जटिल परिदृश्यों के लिए, आप HTML को सुरक्षित रूप से रेंडर करने के लिए एक पाइप बना सकते हैं।

### TypeScript कॉन्फ़िगर करें

Intlayer TypeScript के लाभ प्राप्त करने और आपके कोडबेस को मजबूत बनाने के लिए मॉड्यूल ऑगमेंटेशन का उपयोग करता है।

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में ऑटो-जेनरेटेड टाइप्स शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // ऑटो-जनरेटेड टाइप्स शामिल करें
  ],
}
```

### Git कॉन्फ़िगरेशन

यह अनुशंसित है कि Intlayer द्वारा जनरेट की गई फाइलों को अनदेखा किया जाए। इससे आप उन्हें अपने Git रिपॉजिटरी में कमिट करने से बच सकते हैं।

इसके लिए, आप अपनी `.gitignore` फाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext
# Intlayer द्वारा जनरेट की गई फाइलों को अनदेखा करें
.intlayer
```

### VS Code एक्सटेंशन

अपने Intlayer विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS Code मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
यह एक्सटेंशन प्रदान करता है:

- **अनुवाद कुंजियों के लिए ऑटोकम्प्लीशन**।
- **मिसिंग अनुवादों के लिए रियल-टाइम त्रुटि पता लगाना**।
- **अनुवादित सामग्री के इनलाइन पूर्वावलोकन**।
- **अनुवादों को आसानी से बनाने और अपडेट करने के लिए त्वरित क्रियाएं**।

एक्सटेंशन का उपयोग कैसे करें, इसके लिए अधिक विवरण के लिए देखें [Intlayer VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension)।

---

### आगे बढ़ें

आगे बढ़ने के लिए, आप [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या अपनी सामग्री को [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके बाहरी कर सकते हैं।

---
