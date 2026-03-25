---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Analog i18n - Analog uygulamasını çevirme 2026
description: Analog uygulamanızı nasıl çok dilli hale getireceğinizi keşfedin. Uluslararasılaştırma (i18n) ve tercüme etmek için dokümantasyonu takip edin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Analog
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - analog
applicationTemplate: https://github.com/aymericzip/intlayer-analog-template
history:
  - version: 8.0.4
    date: 2026-01-26
    changes: "Geçmişi başlat"
---

# Intlayer kullanarak Analog (Angular) uygulamanızı tercüme edin | Uluslararasılaştırma (i18n)

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-analog-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

## İçindekiler

<TOC/>

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- Bileşen düzeyinde bildirimsel sözlükler kullanarak **çevirileri kolayca yönetin**.
- Metaverileri, rotaları ve içeriği **dinamik olarak yerelleştirin**.
- Otomatik olarak oluşturulan türlerle **TypeScript desteği sağlayın**, otomatik tamamlamayı ve hata algılamayı geliştirin.
- Dinamik yerel ayar algılama ve değiştirme gibi **gelişmiş özelliklerden yararlanın**.

---

## Analog Uygulamasında Intlayer'ı Kurmak İçin Adım Adım Kılavuz

GitHub üzerindeki [Uygulama Şablonuna](https://github.com/aymericzip/intlayer-analog-template) bakın.

### Adım 1: Bağımlılıkları Yükleyin

Gerekli paketleri npm kullanarak yükleyin:

```bash packageManager="npm"
npm install intlayer angular-intlayer vite-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer vite-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer vite-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer vite-intlayer
bunx intlayer init
```

- **intlayer**

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), derleme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **angular-intlayer**
  Intlayer'ı Angular uygulamasıyla entegre eden paket. Angular uluslararasılaştırması için bağlam sağlayıcıları ve kancalar sunar.

- **vite-intlayer**
  Intlayer'ı Vite ile entegre eden paket. İçerik bildirim dosyalarını işlemek için bir eklenti sağlar ve optimum performans için takma adlar ayarlar.

### Adım 2: Projenizin Yapılandırılması

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

> Bu yapılandırma dosyası aracılığıyla yerelleştirilmiş URL'ler, ara yazılım yeniden yönlendirmesi, çerez adları, içerik bildirimlerinizin konumu ve uzantısı, konsoldaki Intlayer günlüklerini devre dışı bırakma ve daha fazlasını ayarlayabilirsiniz. Mevcut parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

### Adım 3: Intlayer'ı Vite Yapılandırmanıza Entegre Edin

Intlayer'ı Analog ile entegre etmek için `vite-intlayer` eklentisini kullanmanız gerekir.

`vite.config.ts` dosyanızı düzenleyin:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import analog from "@analogjs/platform";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    analog(),
    intlayer(), // Intlayer eklentisini ekleyin
  ],
}));
```

> `intlayer()` eklentisi Vite'ı Intlayer ile yapılandırır. İçerik bildirim dosyalarını işler ve optimum performans için takma adlar ayarlar.

### Adım 4: İçeriğinizi Bildirin

Çevirileri saklamak için içerik bildirimlerinizi oluşturun ve yönetin:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
      tr: "Merhaba",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
      tr: "Tebrikler! Uygulamanız çalışıyor. 🎉",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> İçerik bildirimleriniz, `contentDir` dizinine (varsayılan olarak `./src`) dahil edildikleri sürece uygulamanızın herhangi bir yerinde tanımlanabilir. Ve içerik bildirimi dosya uzantısıyla (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) eşleşmelidir.

> Daha fazla ayrıntı için [içerik bildirimi dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

### Adım 5: Kodunuzda Intlayer'ı Kullanın

Intlayer'ın uluslararasılaştırma özelliklerini Analog uygulamanız boyunca kullanmak için, uygulama yapılandırmanızda Intlayer'ı sağlamanız gerekir.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideIntlayer } from "angular-intlayer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideIntlayer(), // Intlayer sağlayıcısını buraya ekleyin
  ],
};
```

Ardından, herhangi bir bileşen içinde `useIntlayer` fonksiyonunu kullanabilirsiniz.

```typescript fileName="src/app/pages/index.page.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  standalone: true,
  template: `
    <div class="content">
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>
    </div>
  `,
})
export default class HomeComponent {
  content = useIntlayer("app");
}
```

Intlayer içeriği bir `Signal` olarak döndürülür, bu nedenle sinyali çağırarak değerlere erişirsiniz: `content().title`.

### (İsteğe Bağlı) Adım 6: İçeriğinizin dilini değiştirin

İçeriğinizin dilini değiştirmek için `useLocale` fonksiyonu tarafından sağlanan `setLocale` fonksiyonunu kullanabilirsiniz. Bu, uygulamanın yerel ayarını ayarlamanıza ve içeriği buna göre güncellemenize olanak tanır.

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

Ardından, bu bileşeni sayfalarınızda kullanın:

```typescript fileName="src/app/pages/index.page.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "../locale-switcher.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [LocaleSwitcherComponent],
  template: `
    <app-locale-switcher></app-locale-switcher>
    <div class="content">
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>
    </div>
  `,
})
export default class HomeComponent {
  content = useIntlayer("app");
}
```

### TypeScript'i Yapılandırın

Intlayer, TypeScript'in avantajlarından yararlanmak ve kod tabanınızı daha güçlü hale getirmek için modül büyütme (module augmentation) kullanır.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript yapılandırmanızın otomatik olarak oluşturulan türleri içerdiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik olarak oluşturulan türleri dahil edin
  ],
}
```

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların yoksayılması önerilir. Bu, onları Git deponuza göndermenizi engeller.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```bash
#  Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

### VS Code Eklentisi

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Eklentisini** yükleyebilirsiniz.

[VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu eklenti şunları sağlar:

- Çeviri anahtarları için **otomatik tamamlama**.
- Eksik çeviriler için **gerçek zamanlı hata algılama**.
- Çevrilmiş içeriğin **satır içi önizlemeleri**.
- Kolayca çeviri oluşturmak ve güncellemek için **hızlı eylemler**.

Eklentinin nasıl kullanılacağına dair daha fazla ayrıntı için [Intlayer VS Code Eklentisi dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakın.
