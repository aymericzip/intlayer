---
createdAt: 2026-03-23
updatedAt: 2026-03-23
title: Vite + Lit i18n - 2026'da bir Lit uygulaması nasıl çevrilir
description: Vite ve Lit web sitenizi nasıl çok dilli hale getireceğinizi keşfedin. Uluslararasılaştırmak (i18n) ve çevirmek için belgeleri takip edin.
keywords:
  - Uluslararasılaştırma
  - Belgeler
  - Intlayer
  - Vite
  - Lit
  - Web Bileşenleri
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-lit
applicationTemplate: https://github.com/aymericzip/intlayer-vite-lit-template
history:
  - version: 8.4.10
    date: 2026-03-23
    changes: "Init history"
---

# Intlayer kullanarak Vite ve Lit web sitenizi çevirin | Uluslararasılaştırma (i18n)

## İçindekiler

<TOC/>

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- Bileşen düzeyinde bildirimsel sözlükler kullanarak **çevirileri kolayca yönetin**.
- Metadataları, rotaları ve içeriği **dinamik olarak yerelleştirin**.
- Otomatik oluşturulan tiplerle **TypeScript desteğini sağlayın**, otomatik tamamlama ve hata algılamayı iyileştirin.
- Dinamik dil algılama ve değiştirme gibi **gelişmiş özelliklerden yararlanın**.

---

## Vite ve Lit Uygulamasında Intlayer Kurulumu İçin Adım Adım Kılavuz

### Adım 1: Bağımlılıkları Yükleyin

Gerekli paketleri npm kullanarak yükleyin:

```bash packageManager="npm"
npm install intlayer lit-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer lit-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer lit-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer lit-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), transpilasyon ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **lit-intlayer**
  Intlayer'ı Lit uygulamalarıyla entegre eden paket. Dil değiştiğinde LitElement'lerin otomatik olarak yeniden oluşturulması için `ReactiveController` tabanlı kancalar (`useIntlayer`, `useLocale` vb.) sağlar.

- **vite-intlayer**
  Intlayer'ı [Vite paketleyici](https://vite.dev/guide/why.html#why-bundle-for-production) ile entegre etmek için Vite eklentisini ve kullanıcının tercih ettiği dili algılamayı, çerezleri yönetmeyi ve URL yönlendirmesini işlemeyi sağlayan ara yazılımı içerir.

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
      // Diğer dilleriniz
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
      // Diğer dilleriniz
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
      // Diğer dilleriniz
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'ler, ara yazılım yönlendirmesi, çerez adları, içerik bildirimlerinizin konumu ve uzantısı, konsoldaki Intlayer günlüklerini devre dışı bırakma ve daha fazlasını ayarlayabilirsiniz. Kullanılabilir parametrelerin tam listesi için [yapılandırma belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

### Adım 3: Intlayer'ı Vite Yapılandırmanıza Entegre Edin

Yapılandırmanıza intlayer eklentisini ekleyin.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [intlayer()],
});
```

> `intlayer()` Vite eklentisi, Intlayer'ı Vite ile entegre etmek için kullanılır. İçerik bildirimi dosyalarının oluşturulmasını sağlar ve bunları geliştirme modunda izler. Vite uygulaması içinde Intlayer ortam değişkenlerini tanımlar. Ayrıca performansı optimize etmek için takma adlar (aliases) sağlar.

### Adım 4: Giriş Noktasında Intlayer'ı Başlatın

Herhangi bir özel öğe kaydedilmeden **önce** `installIntlayer()` işlevini çağırın, böylece ilk öğe bağlandığında küresel dil tekili hazır olur.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "lit-intlayer";

// Herhangi bir LitElement DOM'a bağlanmadan önce çağrılmalıdır.
installIntlayer();

// Özel öğelerinizi içe aktarın ve kaydedin.
import "./my-element.js";
```

Ayrıca `md()` içerik bildirimlerini (Markdown) kullanıyorsanız, markdown oluşturucuyu da yükleyin:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "lit-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./my-element.js";
```

### Adım 5: İçeriğinizi Bildirin

Çevirileri saklamak için içerik bildirimlerinizi oluşturun ve yönetin:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Lit",
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "litLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Lit logo",
        "fr": "Logo Lit",
        "es": "Logo Lit"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is {{count}}",
        "fr": "le compte est {{count}}",
        "es": "el recuento es {{count}}"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Lit logos to learn more",
        "fr": "Cliquez sur les logos Vite et Lit pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Lit para obtener más información"
      }
    }
  }
}
```

> İçerik bildirimleriniz, `contentDir` dizinine (varsayılan olarak `./src`) dahil edildikleri ve içerik bildirimi dosyası uzantısıyla (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) eşleştikleri sürece uygulamanızın herhangi bir yerinde tanımlanabilir.
>
> Daha fazla ayrıntı için [içerik bildirimi belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

### Adım 6: LitElement'inizde Intlayer'ı Kullanın

Bir `LitElement` içinde `useIntlayer` kullanın. Aktif dil değiştiğinde otomatik olarak yeniden oluşturma işlemini tetikleyen bir `ReactiveController` proxy'si döndürür — ekstra kurulum gerekmez.

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { useIntlayer } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;

  // useIntlayer kendisini bir ReactiveController olarak kaydeder.
  // Dil değiştiğinde öğe otomatik olarak yeniden oluşturulur.
  private content = useIntlayer(this, "app");

  override render() {
    const { content } = this;

    return html`
      <h1>${content.title}</h1>

      <img src="/vite.svg" alt=${content.viteLogo.value} />
      <img src="/lit.svg" alt=${content.litLogo.value} />

      <button @click=${() => this.count++}>
        ${content.count({ count: this.count })}
      </button>

      <p>${content.readTheDocs}</p>
    `;
  }
}
```

> [!NOTE]
> Yerel bir HTML özniteliğinde (örneğin `alt`, `aria-label`, `title`) çevrilmiş dizeye ihtiyacınız olduğunda, yaprak düğüm üzerinde `.value` işlevini çağırın:
>
> ```typescript
> html`<img alt=${content.viteLogo.value} />`;
> ```

### (İsteğe Bağlı) Adım 7: İçeriğinizin Dilini Değiştirin

İçeriğinizin dilini değiştirmek için `useLocale` denetleyicisi tarafından sunulan `setLocale` yöntemini kullanın.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

### (İsteğe Bağlı) Adım 8: Markdown ve HTML İçeriğini Oluşturun

Intlayer `md()` ve `html()` içerik bildirimlerini destekler. Lit'te, derlenmiş çıktı `unsafeHTML` yönergesi aracılığıyla ham HTML olarak enjekte edilir.

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/my-element.ts` and save to test **HMR**",
        fr: "Modifiez `src/my-element.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/my-element.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

Derlenmiş HTML'yi öğenizde oluşturun:

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { useIntlayer } from "lit-intlayer";
import { compileMarkdown } from "lit-intlayer/markdown";

@customElement("my-element")
export class MyElement extends LitElement {
  private content = useIntlayer(this, "app");

  override render() {
    return html`
      <div class="edit-note">
        ${unsafeHTML(compileMarkdown(String(this.content.editNote)))}
      </div>
    `;
  }
}
```

> [!TIP]
> `String(content.editNote)`, `IntlayerNode` üzerinde ham Markdown dizesini döndüren `toString()` işlevini çağırır. Bir HTML dizesi almak için bunu `compileMarkdown` işlevine geçirin, ardından Lit'in `unsafeHTML` yönergesiyle oluşturun.

### (İsteğe Bağlı) Adım 9: Uygulamanıza Yerelleştirilmiş Yönlendirme Ekleyin

Her dil için benzersiz rotalar oluşturmak (SEO için yararlıdır), Intlayer'ın `localeMap` / `localeFlatMap` yardımcılarını ve sunucu tarafı dil algılama için `intlayerProxy` Vite eklentisini içeren bir istemci tarafı yönlendirici kullanabilirsiniz.

İlk olarak, Vite yapılandırmanıza `intlayerProxy` ekleyin:

> Üretimde `intlayerProxy` kullanmak için `vite-intlayer` paketini `devDependencies`'tan `dependencies`'a taşımanız gerektiğini unutmayın.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

module.exports = defineConfig({
  plugins: [intlayer()],
});
```

### (İsteğe Bağlı) Adım 10: Dil Değiştiğinde URL'yi Değiştirin

Dil değiştiğinde tarayıcı URL'sini güncellemek için dil değiştiriciyle birlikte `useRewriteURL` kullanın:

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale, useRewriteURL } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  // Dil değiştiğinde geçerli URL'yi otomatik olarak yeniden yazar.
  private _rewriteURL = useRewriteURL(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

### (İsteğe Bağlı) Adım 11: HTML Dil ve Yön Özniteliklerini Değiştirin

Erişilebilirlik ve SEO için `<html>` etiketinin `lang` ve `dir` özniteliklerini geçerli dille eklenecek şekilde güncelleyin.

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  private locale = useLocale(this, {
    onLocaleChange: (loc) => {
      document.documentElement.lang = loc;
      document.documentElement.dir = getHTMLTextDir(loc);
    },
  });

  override render() {
    return html`<!-- içeriğiniz -->`;
  }
}
```

### (İsteğe Bağlı) Adım 12: Bileşenlerinizin İçeriğini Çıkarın

Mevcut bir kod tabanınız varsa, binlerce dosyayı dönüştürmek zaman alıcı olabilir.

Bu süreci kolaylaştırmak için Intlayer, bileşenlerinizi dönüştürmek ve içeriği çıkarmak için bir [derleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) / [çıkarıcı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) önerir.

Kurulumu yapmak için `intlayer.config.ts` dosyanıza bir `compiler` bölümü ekleyebilirsiniz:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Yapılandırmanızın geri kalanı
  compiler: {
    /**
     * Derleyicinin etkinleştirilip etkinleştirilmeyeceğini belirtir.
     */
    enabled: true,

    /**
     * Çıktı dosyaları yolunu tanımlar
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Bileşenlerin dönüştürüldükten sonra kaydedilip kaydedilmeyeceğini belirtir.
     * Bu sayede derleyici, uygulamayı dönüştürmek için yalnızca bir kez çalıştırılabilir ve ardından kaldırılabilir.
     */
    saveComponents: false,

    /**
     * Sözlük anahtarı öneki
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract komutu'>

Bileşenlerinizi dönüştürmek ve içeriği çıkarmak için çıkarıcıyı çalıştırın

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

 </Tab>
 <Tab value='Babel derleyicisi'>

`intlayerCompiler` eklentisini dahil etmek için `vite.config.ts` dosyanızı güncelleyin:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Derleyici eklentisini ekler
  ],
});
```

```bash packageManager="npm"
npm run build # Veya npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Veya pnpm run dev
```

```bash packageManager="yarn"
yarn build # Veya yarn dev
```

```bash packageManager="bun"
bun run build # Veya bun run dev
```

 </Tab>
</Tabs>

### TypeScript Yapılandırması

TypeScript yapılandırmanızın otomatik oluşturulan tipleri içerdiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

> `experimentalDecorators` ve `useDefineForClassFields: false`, dekoratör desteği için Lit tarafından gereklidir.

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların yoksayılması önerilir. Bu, bunları Git deponuza göndermenizi önler.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```bash
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Uzantısını** yükleyebilirsiniz.

[VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- Çeviri anahtarları için **otomatik tamamlama**.
- Eksik çeviriler için **gerçek zamanlı hata algılama**.
- Çevrilmiş içeriğin **satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **hızlı işlemler**.

Uzantının nasıl kullanılacağı hakkında daha fazla ayrıntı için [Intlayer VS Code Uzantısı belgelerine](https://intlayer.org/doc/vs-code-extension) bakın.

---

### Daha Fazlasına Gidin

Daha ileri gitmek için [görsel düzenleyiciyi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak içeriğinizi dışsallaştırabilirsiniz.
