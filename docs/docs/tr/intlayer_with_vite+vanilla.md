---
createdAt: 2026-03-23
updatedAt: 2026-03-23
title: i18n Vite + Vanilla JS - 2026'da bir Vanilla JS uygulaması nasıl çevrilir
description: Vite ve Vanilla JS web sitenizi nasıl çok dilli hale getireceğinizi keşfedin. Uluslararasılaştırma (i18n) ve çeviri için belgeleri takip edin.
keywords:
  - Uluslararasılaştırma
  - Belgeler
  - Intlayer
  - Vite
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vite-and-vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vanilla-template
history:
  - version: 8.4.10
    date: 2026-03-23
    changes: "Init history"
---

# Intlayer kullanarak Vite ve Vanilla JS web sitenizi çevirin | Uluslararasılaştırma (i18n)

## İçindekiler

<TOC/>

## Intlayer nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- Bileşen düzeyinde bildirimsel sözlükler kullanarak **çevirileri kolayca yönetin**.
- Metadataları, rotaları ve içeriği **dinamik olarak yerelleştirin**.
- Otomatik olarak oluşturulan türlerle **TypeScript desteği sağlayın**, bu da otomatik tamamlamayı ve hata algılamayı iyileştirir.
- Dinamik yerel ayar algılama ve değiştirme gibi **gelişmiş özelliklerden yararlanın**.

---

## Bir Vite ve Vanilla JS Uygulamasında Intlayer Kurulumu İçin Adım Adım Kılavuz

### Adım 1: Bağımlılıkları Yükleyin

npm kullanarak gerekli paketleri yükleyin:

```bash packageManager="npm"
npm install intlayer vanilla-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vanilla-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vanilla-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vanilla-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), transpilasyon ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **vanilla-intlayer**
  Intlayer'ı saf JavaScript / TypeScript uygulamalarıyla entegre eden paket. Bir pub/sub singleton (`IntlayerClient`) ve geri çağırma tabanlı yardımcılar (`useIntlayer`, `useLocale`, vb.) sağlar, böylece uygulamanızın herhangi bir bölümü bir UI çerçevesine bağlı kalmadan yerel ayar değişikliklerine tepki verebilir.

- **vite-intlayer**
  Intlayer'ı [Vite paketleyici](https://vite.dev/guide/why.html#why-bundle-for-production) ile entegre etmek için Vite eklentisini ve kullanıcının tercih ettiği yerel ayarı algılamak, çerezleri yönetmek ve URL yönlendirmesini işlemek için ara yazılımı içerir.

### Adım 2: Projenizin Yapılandırılması

Ugulamanızın dillerini yapılandırmak için bir yapılandırma dosyası oluşturun:

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

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'leri, ara yazılım yönlendirmesini, çerez adlarını, içerik bildirimlerinizin konumunu ve uzantısını ayarlayabilir, konsoldaki Intlayer günlüklerini devre dışı bırakabilir ve daha fazlasını yapabilirsiniz. Mevcut parametrelerin tam listesi için [yapılandırma belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

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

> `intlayer()` Vite eklentisi, Intlayer'ı Vite ile entegre etmek için kullanılır. İçerik bildirimi dosyalarının oluşturulmasını sağlar ve bunları geliştirme modunda izler. Vite uygulaması içinde Intlayer ortam değişkenlerini tanımlar. Ayrıca, performansı optimize etmek için takma adlar (aliases) sağlar.

### Adım 4: Giriş noktanızda Intlayer'ı başlatın

Küresel yerel ayar singleton'ının hazır olması için herhangi bir içerik işlenmeden **önce** `installIntlayer()` işlevini çağırın.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "vanilla-intlayer";

// Herhangi bir i18n içeriği işlenmeden önce çağrılmalıdır.
installIntlayer();

// Uygulama modüllerinizi içe aktarın ve çalıştırın.
import "./app.js";
```

Ayrıca `md()` içerik bildirimlerini (Markdown) kullanıyorsanız, markdown oluşturucuyu da yükleyin:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "vanilla-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./app.js";
```

### Adım 5: İçeriğinizi Bildirin

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Daha fazlasını öğrenmek için Vite logosuna tıklayın",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { insert, t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Daha fazlasını öğrenmek için Vite logosuna tıklayın",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { insert, t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Daha fazlasını öğrenmek için Vite logosuna tıklayın",
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
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Daha fazlasını öğrenmek için Vite logosuna tıklayın"
      }
    }
  }
}
```

> İçerik bildirimleriniz, `contentDir` dizinine (varsayılan olarak `./src`) dahil oldukları sürece uygulamanızın herhangi bir yerinde tanımlanabilir. Ve içerik bildirimi dosyası uzantısıyla eşleşir (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> Daha fazla ayrıntı için [içerik bildirimi belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

### Adım 6: JavaScript'inizde Intlayer Kullanın

`vanilla-intlayer`, `react-intlayer` yüzey API'sini yansıtır: `useIntlayer(key, locale?)` doğrudan çevrilmiş içeriği döndürür. Yerel ayar değişikliklerine abone olmak için sonuç üzerinde `.onChange()` işlevini zincirleyin — bir React yeniden oluşturmasının açık eşdeğeri.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

// Mevcut yerel ayar için başlangıç içeriğini alın.
// Yerel ayar her değiştiğinde bildirim almak için .onChange() işlevini zincirleyin.
const content = useIntlayer("app").onChange((newContent) => {
  // Yalnızca etkilenen DOM düğümlerini yeniden oluşturun veya yamalayın
  document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
    newContent.title
  );
  document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
    String(newContent.readTheDocs);
});

// Başlangıç oluşturma
document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
  content.title
);
document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
  String(content.readTheDocs);
```

> Yaprak değerleri `String()` içine sararak onlara dize olarak erişin, bu da düğümün `toString()` yöntemini çağırır ve çevrilmiş metni döndürür.
>
> Yerel bir HTML özelliği (örn. `alt`, `aria-label`) için değere ihtiyacınız olduğunda, doğrudan `.value` kullanın:
>
> ```typescript
> img.alt = content.viteLogoLabel.value;
> ```

### (İsteğe Bağlı) Adım 7: İçeriğinizin dilini değiştirin

İçeriğinizin dilini değiştirmek için `useLocale` tarafından sunulan `setLocale` işlevini kullanın.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { getLocaleName } from "intlayer";
import { useLocale } from "vanilla-intlayer";

export function setupLocaleSwitcher(container: HTMLElement): () => void {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Language");

  const render = (currentLocale: string) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value as any));

  // Başka bir yerden yerel ayar değiştiğinde açılır menüyü senkronize tutun
  return subscribe((newLocale) => render(newLocale));
}
```

### (İsteğe Bağlı) Adım 8: Markdown ve HTML içeriği oluşturun

Intlayer `md()` ve `html()` içerik bildirimlerini destekler. Vanilla JS'de, derlenmiş çıktı `innerHTML` aracılığıyla ham HTML olarak eklenir.

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/main.ts` and save to test **HMR**",
        fr: "Modifiez `src/main.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/main.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

HTML'yi derleyin ve ekleyin:

```typescript fileName="src/main.ts" codeFormat="typescript"
import {
  compileMarkdown,
  installIntlayerMarkdown,
  useIntlayer,
} from "vanilla-intlayer";

installIntlayerMarkdown();

const content = useIntlayer("app").onChange((newContent) => {
  const el = document.querySelector<HTMLDivElement>(".edit-note")!;
  el.innerHTML = compileMarkdown(String(newContent.editNote));
});

document.querySelector<HTMLDivElement>(".edit-note")!.innerHTML =
  compileMarkdown(String(content.editNote));
```

> [!TIP]
> `String(content.editNote)`, `IntlayerNode` üzerinde ham Markdown dizesini döndüren `toString()` işlevini çağırır. Bir HTML dizesi almak için bunu `compileMarkdown`'a geçirin, ardından `innerHTML` aracılığıyla ayarlayın.

> [!WARNING]
> `innerHTML`'i yalnızca güvenilir içerikle kullanın. Markdown kullanıcı girişinden geliyorsa, önce onu temizleyin (örn. DOMPurify ile). Bir temizleme oluşturucusunu dinamik olarak yükleyebilirsiniz:
>
> ```typescript
> import { installIntlayerMarkdownDynamic } from "vanilla-intlayer";
>
> await installIntlayerMarkdownDynamic(async () => {
>   const DOMPurify = await import("dompurify");
>   return (markdown) => DOMPurify.sanitize(compileMarkdown(markdown));
> });
> ```

### (İsteğe Bağlı) Adım 9: Uygulamanıza yerelleştirilmiş Yönlendirme ekleyin

Her dil için benzersiz yollar oluşturmak için (SEO için yararlıdır), sunucu tarafı yerel ayar algılaması için Vite yapılandırmanızda `intlayerProxy` kullanabilirsiniz.

İlk olarak, Vite yapılandırmanıza `intlayerProxy` ekleyin:

> Üretimde `intlayerProxy` kullanmak için `vite-intlayer`'ı `devDependencies`'dan `dependencies`'e taşımanız gerektiğini unutmayın.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // ilk sıraya yerleştirilmelidir
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // ilk sıraya yerleştirilmelidir
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

module.exports = defineConfig({
  plugins: [
    intlayerProxy(), // ilk sıraya yerleştirilmelidir
    intlayer(),
  ],
});
```

### (İsteğe Bağlı) Adım 10: Yerel ayar değiştiğinde URL'yi değiştirin

Yerel ayar değiştiğinde tarayıcı URL'sini güncellemek için Intlayer'ı yükledikten sonra `useRewriteURL()` işlevini çağırın:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useRewriteURL } from "vanilla-intlayer";

installIntlayer();

// URL'yi hemen ve sonraki her yerel ayar değişikliğinde yeniden yazar.
// Temizlik için bir abonelikten çıkma işlevi döndürür.
const stopRewriteURL = useRewriteURL();
```

### (İsteğe Bağlı) Adım 11: HTML Dil ve Yön Özniteliklerini Değiştirin

Erişilebilirlik ve SEO için `<html>` etiketinin `lang` ve `dir` özniteliklerini mevcut yerel ayara uyacak şekilde güncelleyin.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";
import { installIntlayer, useLocale } from "vanilla-intlayer";

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

### (İsteğe Bağlı) Adım 12: Yerel ayar başına sözlükleri tembel yükleyin (Lazy-load)

Büyük uygulamalar için her yerel ayarın sözlüğünü kendi yığınına bölmek isteyebilirsiniz. Vite'in dinamik `import()` işleviyle birlikte `useDictionaryDynamic` kullanın:

```typescript fileName="src/app.ts" codeFormat="typescript"
import { installIntlayer, useDictionaryDynamic } from "vanilla-intlayer";

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1")!.textContent = String(content.title);
});
```

> Her yerel ayarın paketi yalnızca o yerel ayar etkinleştirildiğinde getirilir ve sonuç önbelleğe alınır — aynı yerel ayara sonraki geçişler anlıktır.

### (İsteğe Bağlı) Adım 13: Bileşenlerinizin içeriğini dışa aktarın

Mevcut bir kod tabanınız varsa, binlerce dosyayı dönüştürmek zaman alıcı olabilir.

Bu süreci kolaylaştırmak için Intlayer, bileşenlerinizi dönüştürmek ve içeriği dışa aktarmak için bir [derleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) / [ayıştırıcı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) önerir.

Kurulum için `intlayer.config.ts` dosyanıza bir `compiler` bölümü ekleyebilirsiniz:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Geri kalan yapılandırmanız
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
     * Dönüştürüldükten sonra bileşenlerin kaydedilip kaydedilmeyeceğini belirtir.
     * Bu şekilde, derleyici uygulamayı dönüştürmek için yalnızca bir kez çalıştırılabilir ve ardından kaldırılabilir.
     */
    saveComponents: false,

    /**
     * Sözlük anahtarı ön eki
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract komutu'>

Bileşenlerinizi dönüştürmek ve içeriği ayıklamak için ayıştırıcıyı çalıştırın

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
npm run build # veya npm run dev
```

```bash packageManager="pnpm"
pnpm run build # veya pnpm run dev
```

```bash packageManager="yarn"
yarn build # veya yarn dev
```

```bash packageManager="bun"
bun run build # veya bun run dev
```

 </Tab>
</Tabs>

### TypeScript'i Yapılandırın

TypeScript yapılandırmanızın otomatik olarak oluşturulan türleri içerdiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların yoksayılması önerilir. Bu, onları Git deponuza göndermekten kaçınmanıza olanak tanır.

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
- Çevirileri kolayca oluşturmak ve güncellemek için **hızlı eylemler**.

Uzantının nasıl kullanılacağına dair daha fazla ayrıntı için [Intlayer VS Code Uzantısı belgelerine](https://intlayer.org/doc/vs-code-extension) bakın.

---

### Daha Fazlasına Gidin

Daha ileri gitmek için [görsel düzenleyiciyi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak içeriğinizi dışsallaştırabilirsiniz.
