---
createdAt: 2026-03-31
updatedAt: 2026-03-31
title: Vanilla JS i18n - 2026 yılında bir Vanilla JS uygulaması nasıl çevrilir?
description: Vanilla JS web sitenizi nasıl çok dilli hale getireceğinizi keşfedin. Uluslararasılaştırma (i18n) ve çeviri için belgeleri takip edin.
keywords:
  - Uluslararasılaştırma
  - Belgeler
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
history:
  - version: 8.4.10
    date: 2026-03-31
    changes: "Geçmişi başlat"
---

# Vanilla JS web sitenizi Intlayer kullanarak çevirin | Uluslararasılaştırma (i18n)

## İçindekiler

<TOC/>

## Intlayer nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- **Çevirileri kolayca yönetin**: Bileşen düzeyinde bildirimsel sözlükler kullanın.
- **Meta verileri, rotaları ve içeriği dinamik olarak yerelleştirin**.
- **TypeScript desteğini garanti edin**: Otomatik olarak oluşturulan türlerle otomatik tamamlama ve hata algılamayı iyileştirin.
- **Gelişmiş özelliklerden yararlanın**: Dinamik dil algılama ve değiştirme gibi.

Bu kılavuz, bir **paket yöneticisi veya paketleyici** (Vite, Webpack vb.) kullanmadan bir Vanilla JavaScript uygulamasında Intlayer'ın nasıl kullanılacağını gösterir.

Uygulamanız bir paketleyici (Vite gibi) kullanıyorsa, bunun yerine [Vite + Vanilla JS Kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+vanilla.md)'nu takip etmenizi öneririz.

Bağımsız paketi (standalone bundle) kullanarak, Intlayer'ı tek bir JavaScript dosyası aracılığıyla doğrudan HTML dosyalarınıza aktarabilirsiniz; bu da onu eski projeler veya basit statik siteler için mükemmel kılar.

---

## Vanilla JS Uygulamasında Intlayer Kurulumu İçin Adım Adım Kılavuz

### Adım 1: Bağımlılıkları Yükleyin

Gerekli paketleri npm kullanarak yükleyin:

```bash packageManager="npm"
# intlayer ve vanilla-intlayer'ın bağımsız bir paketini oluşturun
# Bu dosya HTML dosyanıza aktarılacaktır
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Yapılandırma dosyası ile intlayer'ı başlatın
npx intlayer init --no-gitignore

# Sözlükleri oluşturun
npx intlayer build
```

```bash packageManager="pnpm"
# intlayer ve vanilla-intlayer'ın bağımsız bir paketini oluşturun
# Bu dosya HTML dosyanıza aktarılacaktır
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Yapılandırma dosyası ile intlayer'ı başlatın
pnpm intlayer init --no-gitignore

# Sözlükleri oluşturun
pnpm intlayer build
```

```bash packageManager="yarn"
# intlayer ve vanilla-intlayer'ın bağımsız bir paketini oluşturun
# Bu dosya HTML dosyanıza aktarılacaktır
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# intlayer yapılandırma dosyasını, varsa TypeScript'i ve ortam değişkenlerini başlatın
yarn intlayer init --no-gitignore

# Sözlükleri oluşturun
yarn intlayer build
```

```bash packageManager="bun"
# intlayer ve vanilla-intlayer'ın bağımsız bir paketini oluşturun
# Bu dosya HTML dosyanıza aktarılacaktır
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Yapılandırma dosyası ile intlayer'ı başlatın
bun x intlayer init --no-gitignore

# Sözlükleri oluşturun
bun x intlayer build
```

- **intlayer**
  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), transpilation ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **vanilla-intlayer**
  Intlayer'ı saf JavaScript / TypeScript uygulamalarıyla entegre eden paket. Uygulamanızın herhangi bir bölümünün bir UI çerçevesine bağımlı olmadan dil değişikliklerine tepki verebilmesi için bir pub/sub singleton (`IntlayerClient`) ve geri çağırma tabanlı yardımcılar (`useIntlayer`, `useLocale` vb.) sağlar.

> `intlayer standalone` CLI'nın oluşturduğu paket (bundling), yapılandırmanıza özel kullanılmayan paketleri, dilleri ve temel olmayan mantığı (yönlendirmeler veya önekler gibi) tree-shaking (gereksiz kod temizleme) yoluyla kaldırarak optimize edilmiş bir yapı sunar.

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

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'ler, middleware yönlendirmesi, çerez adları, içerik bildirimlerinizin konumu ve uzantısı, konsoldaki Intlayer günlüklerini devre dışı bırakma ve daha fazlasını ayarlayabilirsiniz. Mevcut parametrelerin tam listesi için [yapılandırma belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

### Adım 3: Paketi HTML'inize Aktarın

`intlayer.js` paketini oluşturduktan sonra, onu HTML dosyanıza aktarabilirsiniz:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />

    <!-- Paketi içeri aktarın -->
    <script src="./intlayer.js" defer></script>
    <!-- Ana betiğinizi içeri aktarın -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

Paket, `Intlayer` ve `VanillaIntlayer` nesnelerini `window` üzerinde küresel nesneler olarak ortaya çıkarır.

### Adım 4: Giriş Noktanızda Intlayer'ı Başlatın

`src/main.js` dosyanızda, herhangi bir içerik oluşturulmadan **önce** `installIntlayer()` işlevini çağırın, böylece küresel dil singleton'ı hazır olur.

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// Herhangi bir i18n içeriği oluşturulmadan önce çağrılmalıdır.
installIntlayer();
```

Markdown oluşturucuyu da kullanmak istiyorsanız, `installIntlayerMarkdown()` işlevini çağırın:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

### Adım 5: İçeriğinizi Bildirin

Çevirileri saklamak için içerik bildirimlerinizi oluşturun ve yönetin:

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
      es: "Daha fazla bilgi edinmek için Vite logosuna tıklayın",
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
      es: "Daha fazla bilgi edinmek için Vite logosuna tıklayın",
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
      es: "Daha fazla bilgi edinmek için Vite logosuna tıklayın",
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
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> İçerik bildirimleriniz, `contentDir` dizinine (varsayılan olarak `./src`) dahil edildikleri sürece uygulamanızın herhangi bir yerinde tanımlanabilir. Ve içerik bildirimi dosya uzantısıyla (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) eşleşir.
>
> Daha fazla ayrıntı için [içerik bildirimi belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

### Adım 6: JavaScript'inizde Intlayer Kullanın

`window.VanillaIntlayer` nesnesi API yardımcıları sağlar: `useIntlayer(key, locale?)` verilen anahtar için çevrilmiş içeriği döndürür.

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// Mevcut dil için başlangıç içeriğini alın.
// Dil her değiştiğinde bildirim almak için .onChange()'i bağlayın.
const content = useIntlayer("app").onChange((newContent) => {
  // Yalnızca etkilenen DOM düğümlerini yeniden oluşturun veya yamalayın
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// İlk oluşturma
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> Yaprak değerlere `String()` içine sararak dize olarak erişin; bu, düğümün `toString()` yöntemini çağırır ve çevrilmiş metni döndürür.
>
> Yerel bir HTML özelliği (örneğin `alt`, `aria-label`) için değere ihtiyacınız olduğunda doğrudan `.value` kullanın:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

### (İsteğe Bağlı) Adım 7: İçeriğinizin dilini değiştirin

İçeriğinizin dilini değiştirmek için `useLocale` tarafından sunulan `setLocale` işlevini kullanın.

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Dil");

  const render = (currentLocale) => {
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

  select.addEventListener("change", () => setLocale(select.value));

  // Dil başka bir yerden değiştiğinde açılır menüyü senkronize tutun
  return subscribe((newLocale) => render(newLocale));
}
```

### (İsteğe Bağlı) Adım 8: HTML Dil ve Yön Özniteliklerini Değiştirin

Erişilebilirlik ve SEO için `<html>` etiketinin `lang` ve `dir` özniteliklerini geçerli dile uyacak şekilde güncelleyin.

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

### (İsteğe Bağlı) Adım 9: Dil başına sözlükleri geç yükleme (Lazy-load)

Sözlükleri dile göre geç yüklemek istiyorsanız `useDictionaryDynamic` kullanabilirsiniz. Başlangıçtaki `intlayer.js` dosyasında tüm çevirileri paketlemek istemiyorsanız bu yararlıdır.

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> Not: `useDictionaryDynamic`, sözlüklerin ayrı ESM dosyaları olarak mevcut olmasını gerektirir. Bu yaklaşım genellikle sözlükleri sunan bir web sunucunuz varsa kullanılır.

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

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi geliştirmek için resmi **Intlayer VS Code Uzantısını** yükleyebilirsiniz.

[VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- Çeviri anahtarları için **otomatik tamamlama**.
- Eksik çeviriler için **gerçek zamanlı hata algılama**.
- Çevrilmiş içeriğin **satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **hızlı eylemler**.

Uzantının nasıl kullanılacağına ilişkin daha fazla ayrıntı için [Intlayer VS Code Uzantısı belgelerine](https://intlayer.org/doc/vs-code-extension) bakın.

---

### Daha İleri Gidin

Daha ileri gitmek için [görsel düzenleyiciyi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak içeriğinizi dışsallaştırabilirsiniz.
