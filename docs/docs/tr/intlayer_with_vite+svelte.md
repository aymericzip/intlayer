---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Vite ve Svelte uygulamanızı nasıl çevirirsiniz – i18n rehberi 2026
description: Vite ve Svelte web sitenizi çok dilli hale nasıl getireceğinizi keşfedin. Uluslararasılaştırma (i18n) ve çeviri için dokümantasyonu takip edin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Vite
  - Svelte
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-svelte
applicationTemplate: https://github.com/aymericzip/intlayer-vite-svelte-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: init komutu ekle
  - version: 5.5.11
    date: 2025-11-19
    changes: Doküman güncellendi
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Intlayer kullanarak Vite ve Svelte web sitenizi çevirin | Uluslararasılaştırma (i18n)

## İçindekiler

<TOC/>

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- **Bileşen seviyesinde deklaratif sözlükler kullanarak çevirileri kolayca yönetmek.**
- **Meta verileri, rotaları ve içeriği dinamik olarak yerelleştirmek.**
- **Otomatik oluşturulan tiplerle TypeScript desteğini sağlamak, böylece otomatik tamamlama ve hata tespitini geliştirmek.**
- **Dinamik dil algılama ve değiştirme gibi gelişmiş özelliklerden faydalanmak.**

---

## Vite ve Svelte Uygulamasında Intlayer Kurulum Adım Adım Rehberi

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı nasıl uluslararasılaştırırsınız"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub'da [Uygulama Şablonuna](https://github.com/aymericzip/intlayer-vite-svelte-template) bakın.

### Adım 1: Bağımlılıkları Yükleyin

Gerekli paketleri npm kullanarak yükleyin:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bunx intlayer init
```

- **intlayer**

  Konfigürasyon yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), transpile etme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_cli.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **svelte-intlayer**
  Intlayer'ı Svelte uygulamasıyla entegre eden paket. Svelte uluslararasılaştırması için context sağlayıcıları ve hook'lar sunar.

- **vite-intlayer**  
  Intlayer'ı [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production) ile entegre etmek için Vite eklentisini içerir; ayrıca kullanıcının tercih ettiği dili tespit etmek, çerezleri yönetmek ve URL yönlendirmelerini işlemek için middleware sağlar.

### Adım 2: Projenizin Konfigürasyonu

Uygulamanızın dillerini yapılandırmak için bir konfigürasyon dosyası oluşturun:

```typescript fileName="intlayer.config.ts"
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

> Bu konfigürasyon dosyası aracılığıyla, yerelleştirilmiş URL'ler, middleware yönlendirmesi, çerez isimleri, içerik beyanlarınızın konumu ve uzantısı, Intlayer loglarının konsolda devre dışı bırakılması ve daha fazlasını ayarlayabilirsiniz. Mevcut parametrelerin tam listesi için [konfigürasyon dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakınız.

### Adım 3: Intlayer'ı Vite Konfigürasyonunuza Entegre Edin

Konfigürasyonunuza intlayer eklentisini ekleyin.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer()],
});
```

> `intlayer()` Vite eklentisi, Intlayer'ı Vite ile entegre etmek için kullanılır. İçerik beyan dosyalarının oluşturulmasını sağlar ve geliştirme modunda bunları izler. Vite uygulaması içinde Intlayer ortam değişkenlerini tanımlar. Ayrıca, performansı optimize etmek için takma adlar (alias) sağlar.

### Adım 4: İçeriğinizi Beyan Edin

Çevirileri depolamak için içerik beyanlarınızı oluşturun ve yönetin:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// İçerik sözlüğü tipi tanımı
const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// İçerik sözlüğü tipi tanımı
const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
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
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola mundo"
      }
    }
  }
}
```

> İçerik bildirimleriniz, uygulamanızda `contentDir` dizinine (varsayılan olarak `./src`) dahil edildiği sürece herhangi bir yerde tanımlanabilir. Ve içerik bildirim dosya uzantısıyla eşleşmelidir (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Daha fazla detay için, [içerik bildirim dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakabilirsiniz.

### Adım 5: Kodunuzda Intlayer'ı Kullanın

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- İçeriği basit içerik olarak render et -->
<h1>{$content.title}</h1>
<!-- İçeriği editör kullanarak düzenlenebilir şekilde render etmek için -->
<h1><svelte:component this={$content.title} /></h1>
<!-- İçeriği string olarak render etmek için -->
<div aria-label={$content.title.value}></div>
```

### (İsteğe bağlı) Adım 6: İçeriğinizin dilini değiştirin

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from 'svelte-intlayer';

// Dil bilgisi ve setLocale fonksiyonunu al
const { locale, availableLocales, setLocale } = useLocale();

// Dil değişikliğini yönet
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  setLocale(newLocale);
};
</script>

<div>
  <select value={$locale} on:change={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

### (İsteğe bağlı) Adım 7: Markdown Render Etme

Intlayer, Markdown içeriğini doğrudan Svelte uygulamanızda render etmeyi destekler. Varsayılan olarak, Markdown düz metin olarak işlenir. Markdown'u zengin HTML'ye dönüştürmek için `@humanspeak/svelte-markdown` veya başka bir markdown ayrıştırıcı entegre edebilirsiniz.

> `intlayer` paketi kullanarak markdown içeriğinin nasıl tanımlanacağını görmek için [markdown dokümanına](https://github.com/aymericzip/intlayer/tree/main/docs/tr/dictionary/markdown.md) bakınız.

```svelte fileName="src/App.svelte"
<script>
  import { setIntlayerMarkdown } from "svelte-intlayer";

  setIntlayerMarkdown((markdown) =>
   // markdown içeriğini bir string olarak render et
   return markdown;
  );
</script>

<h1>{$content.markdownContent}</h1>
```

> Markdown front-matter verilerinize `content.markdownContent.metadata.xxx` özelliğini kullanarak da erişebilirsiniz.

### (İsteğe bağlı) Adım 8: intlayer editör / CMS kurulumu

intlayer editörünü kurmak için [intlayer editör dokümantasyonunu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) takip etmelisiniz.

intlayer CMS'i kurmak için [intlayer CMS dokümantasyonunu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) takip etmelisiniz.

Paralel olarak, Svelte uygulamanızda, bir layout dosyasına veya uygulamanızın köküne aşağıdaki satırı eklemelisiniz:

```svelte fileName="src/layout.svelte"
import { useIntlayerEditor } from "svelte-intlayer";

useIntlayerEditor();
```

### (İsteğe bağlı) Adım 7: Uygulamanıza yerelleştirilmiş Yönlendirme ekleyin

Svelte uygulamanızda yerelleştirilmiş yönlendirmeyi yönetmek için, `svelte-spa-router` paketini ve Intlayer'ın `localeFlatMap` fonksiyonunu kullanarak her locale için rotalar oluşturabilirsiniz.

Öncelikle, `svelte-spa-router` paketini yükleyin:

```bash packageManager="npm"
npm install svelte-spa-router
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add svelte-spa-router
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add svelte-spa-router
yarn intlayer init
```

```bash packageManager="bun"
bun add svelte-spa-router
```

Sonra, rotalarınızı tanımlamak için bir `Router.svelte` dosyası oluşturun:

```svelte fileName="src/Router.svelte"
<script lang="ts">
import { localeFlatMap } from "intlayer";
import Router from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import App from "./App.svelte";

const routes = Object.fromEntries(
    localeFlatMap(({locale, urlPrefix}) => [
    [
        urlPrefix || '/',
        wrap({
            component: App as any,
            props: {
                locale,
            },
        }),
    ],
    ])
);
</script>

<Router {routes} />
```

`main.ts` dosyanızı, `App` yerine `Router` bileşenini mount edecek şekilde güncelleyin:

```typescript fileName="src/main.ts"
import { mount } from "svelte";
import Router from "./Router.svelte";

const app = mount(Router, {
  target: document.getElementById("app")!,
});

export default app;
```

Son olarak, `App.svelte` dosyanızı `locale` prop'unu alacak ve `useIntlayer` ile kullanacak şekilde güncelleyin:

```svelte fileName="src/App.svelte"
<script lang="ts">
import type { Locale } from 'intlayer';
import { useIntlayer } from 'svelte-intlayer';
import Counter from './lib/Counter.svelte';
import LocaleSwitcher from './lib/LocaleSwitcher.svelte';

export let locale: Locale;

$: content = useIntlayer('app', locale);
</script>

<main>
  <div class="locale-switcher-container">
    <LocaleSwitcher currentLocale={locale} />
  </div>

  <!-- ... uygulamanızın geri kalanı ... -->
</main>
```

#### Sunucu Tarafı Yönlendirmeyi Yapılandırma (Opsiyonel)

Paralel olarak, uygulamanıza sunucu tarafı yönlendirme eklemek için `intlayerProxy`'yi de kullanabilirsiniz. Bu eklenti, URL'ye göre mevcut locale'i otomatik olarak algılar ve uygun locale çerezini ayarlar. Eğer herhangi bir locale belirtilmemişse, eklenti kullanıcının tarayıcı dil tercihlerini baz alarak en uygun locale'i belirler. Hiçbir locale algılanamazsa, varsayılan locale'e yönlendirme yapar.

> Üretimde `intlayerProxy` kullanmak için, `vite-intlayer` paketini `devDependencies`'den `dependencies`'e geçirmeniz gerektiğini unutmayın.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { svelte } = require("@sveltejs/vite-plugin-svelte");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

### (İsteğe Bağlı) Adım 8: Dil değiştiğinde URL'yi değiştirme

Kullanıcıların dilleri değiştirmesine ve URL'yi buna göre güncellemesine izin vermek için bir `LocaleSwitcher` bileşeni oluşturabilirsiniz. Bu bileşen, `intlayer`'dan `getLocalizedUrl` ve `svelte-spa-router`'dan `push` fonksiyonlarını kullanacaktır.

```svelte fileName="src/lib/LocaleSwitcher.svelte"
<script lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";
import { push } from "svelte-spa-router";

export let currentLocale: string | undefined = undefined;

// Dil bilgilerini al
const { locale, availableLocales } = useLocale();

// Dil değişikliğini yönet
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  const currentUrl = window.location.pathname;
  const url = getLocalizedUrl( currentUrl, newLocale);
  push(url);
};
</script>

<div class="locale-switcher">
  <select value={currentLocale ?? $locale} onchange={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların göz ardı edilmesi önerilir. Bu, bu dosyaların Git deposuna eklenmesini önlemenizi sağlar.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext
# Intlayer tarafından oluşturulan dosyaları göz ardı et
.intlayer
```

### VS Code Eklentisi

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Eklentisi**ni yükleyebilirsiniz.

[VS Code Marketplace'ten Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu eklenti şunları sağlar:

- Çeviri anahtarları için **Otomatik tamamlama**.
- Eksik çeviriler için **Gerçek zamanlı hata tespiti**.
- Çevrilmiş içeriğin **Satır içi önizlemeleri**.
- Çevirileri kolayca oluşturup güncellemek için **Hızlı işlemler**.

Eklentinin nasıl kullanılacağı hakkında daha fazla bilgi için [Intlayer VS Code Eklentisi dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakabilirsiniz.

---

### Daha İleri Gitmek

Daha ileri gitmek için, [görsel editörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak dışa aktarabilirsiniz.
