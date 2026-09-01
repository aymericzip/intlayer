---
createdAt: 2025-04-18
updatedAt: 2026-06-23
title: "Vite + Svelte i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "Artık i18next yok. 2026 yılı için çok dilli (i18n) Vite + Svelte uygulaması oluşturma kılavuzu. Yapay zeka ajanlarıyla çevirin ve bundle boyutu, SEO ve performansı optimize edin."
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
applicationShowcase: https://intlayer-vite-svelte-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init komutu ekle"
  - version: 5.5.11
    date: 2025-11-19
    changes: "Doküman güncellendi"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
author: aymericzip
---

# Intlayer kullanarak Vite ve Svelte web sitenizi çevirin | Uluslararasılaştırma (i18n)

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-svelte-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-svelte-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-svelte-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## İçindekiler

<TOC/>

## Neden alternatifler yerine Intlayer?

"svelte-i18n" veya "i18next" gibi ana çözümlerle karşılaştırıldığında Intlayer, aşağıdaki gibi entegre optimizasyonlarla gelen bir çözümdür:

<AccordionGroup>
<Accordion header="Tam Svelte kapsamı">

Intlayer, **bileşen düzeyinde içerik kapsamı**, **reaktif çeviriler** ve uluslararasılaştırmayı (i18n) ölçeklendirmek için gereken tüm özellikleri sunarak Svelte ile mükemmel çalışacak şekilde optimize edilmiştir.

</Accordion>

<Accordion header="Bundle boyutu">

Sayfalarınıza çok büyük JSON dosyaları yüklemek yerine yalnızca gerekli içeriği yükleyin. Intlayer **bundle ve sayfa boyutlarınızı %50'ye kadar azaltmanıza** yardımcı olur.

</Accordion>

<Accordion header="Sürdürülebilirlik">

Uygulamanızın içeriğinin kapsamını belirlemek, büyük ölçekli uygulamalar için **bakımı kolaylaştırır**. İçerik kod tabanınızın tamamını gözden geçirmenin zihinsel yükü olmadan, tek bir özellik klasörünü çoğaltabilir veya silebilirsiniz. Ayrıca Intlayer, içeriğinizin doğruluğunu sağlamak için **tamamen tiplendirilmiş (fully typed)tır**.

</Accordion>

<Accordion header="Yapay Zeka Temsilcisi">

İçeriğin bir arada konumlandırılması **Büyük Dil Modellerinin (LLM'ler) ihtiyaç duyduğu bağlamı azaltır**. Intlayer ayrıca eksik çevirileri test etmek için **CLI** gibi bir araç paketiyle birlikte gelir**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** ve **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)**, geliştirici deneyimini (DX) yapay zeka için daha da sorunsuz hale getirmek için ajanlar.

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

## Vite ve Svelte Uygulamasında Intlayer Kurulum Adım Adım Rehberi

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı nasıl uluslararasılaştırırsınız"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub'da [Uygulama Şablonuna](https://github.com/aymericzip/intlayer-vite-svelte-template) bakın.

<Steps>

<Step number={1} title="Bağımlılıkları Yükleyin">

Gerekli paketleri npm kullanarak yükleyin:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` bayrağı isteğe bağlıdır. Bir yapay zeka aracısıysanız `intlayer-cli init` kullanın.

> Bu komut ortamınızı algılayacak ve gerekli paketleri yükleyecektir. Örneğin:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer**

  Konfigürasyon yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), transpile etme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **svelte-intlayer**
  Intlayer'ı Svelte uygulamasıyla entegre eden paket. Svelte uluslararasılaştırması için context sağlayıcıları ve hook'lar sunar.

- **vite-intlayer**  
  Intlayer'ı [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production) ile entegre etmek için Vite eklentisini içerir; ayrıca kullanıcının tercih ettiği dili tespit etmek, çerezleri yönetmek ve URL yönlendirmelerini işlemek için middleware sağlar.

</Step>

<Step number={2} title="Projenizin Konfigürasyonu">

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

</Step>

<Step number={3} title="Intlayer'ı Vite Konfigürasyonunuza Entegre Edin">

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

</Step>

<Step number={4} title="İçeriğinizi Beyan Edin">

Çevirileri depolamak için içerik beyanlarınızı oluşturun ve yönetin:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> İçerik bildirimleriniz, uygulamanızda `contentDir` dizinine (varsayılan olarak `./src`) dahil edildiği sürece herhangi bir yerde tanımlanabilir. Ve içerik bildirim dosya uzantısıyla eşleşmelidir (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Daha fazla detay için, [içerik bildirim dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakabilirsiniz.

</Step>

<Step number={5} title="Kodunuzda Intlayer'ı Kullanın">

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- İçeriği basit içerik olarak render et -->
<h1>{$content.title}</h1>
<!-- İçeriği editör kullanarak düzenlenebilir şekilde render etmek için -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- İçeriği string olarak render etmek için -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>

> Eğer uygulamanız zaten mevcutsa, binlerce bileşeni bir saniye içinde dönüştürmek için [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md)'ı [extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) ile birlikte kullanabilirsiniz.
```

> Uygulamanız zaten varsa, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) ve [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) kullanarak binlerce bileşeni bir saniyede dönüştürebilirsiniz.

</Step>

<Step number={6} title="İçeriğinizin dilini değiştirin" isOptional={true}>

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from "svelte-intlayer";

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

</Step>

<Step number={7} title="Markdown Render Etme" isOptional={true}>

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

</Step>

<Step number={8} title="intlayer editör / CMS kurulumu" isOptional={true}>

intlayer editörünü kurmak için [intlayer editör dokümantasyonunu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) takip etmelisiniz.

intlayer CMS'i kurmak için [intlayer CMS dokümantasyonunu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) takip etmelisiniz.

</Step>

<Step number={7} title="Uygulamanıza yerelleştirilmiş Yönlendirme ekleyin" isOptional={true}>

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
import { useIntlayer } from "svelte-intlayer";
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

> Intlayer v9 sürümünden itibaren, `intlayerProxy()` doğrudan `intlayer()` eklentisine entegre edilmiştir ve `routing.enableProxy` seçeneği (`varsayılan olarak true`) aracılığıyla varsayılan olarak etkinleştirilmiştir. Aşağıda gösterildiği gibi ayrı olarak kaydetmek artık isteğe bağlıdır — geriye dönük uyumluluk ve eklenti sırasını kontrol etmesi gereken kurulumlar için tutulur. Devre dışı bırakmak için `routing.enableProxy: false` değerini ayarlayın. [v9 sürüm notlarına](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/releases/v9.md) bakın.

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

  plugins: [intlayerProxy(), // should be placed first
 svelte(), intlayer()],
});
```

</Step>

<Step number={8} title="Dil değiştiğinde URL'yi değiştirme" isOptional={true}>

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

</Step>

<Step number={9} title="Bileşenlerinizin içeriğini çıkarın" isOptional={true}>

SEO için, rotalarınızı locale ile ön ek olarak kullanmanız önerilir (örneğin, `/about`, `/fr/about`).

```svelte fileName="src/lib/components/Link.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

  export let href = "";
  const { locale } = useLocale();

  // URL'yi önek eklemek için yardımcı
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

</Step>

<Step number={10} title="Bileşenlerinizin içeriğini çıkarın" isOptional={true}>

Mevcut bir kod tabanınız varsa, binlerce dosyayı dönüştürmek zaman alıcı olabilir.

Bu süreci kolaylaştırmak için Intlayer, bileşenlerinizi dönüştürmek ve içeriği çıkarmak için bir [derleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) / [çıkarıcı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) sunar.

Kurulum için `intlayer.config.ts` dosyanıza bir `compiler` bölümü ekleyebilirsiniz:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Yapılandırmanızın geri kalanı
  compiler: {
    /**
     * Derleyicinin etkinleştirilip etkinleştirilmeyeceğini belirtir.
     */
    enabled: true,

    /**
     * Çıktı dosyalarının yolunu tanımlar
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Bileşenlerin dönüştürüldükten sonra kaydedilip kaydedilmeyeceğini belirtir. Bu sayede derleyici, uygulamayı dönüştürmek için yalnızca bir kez çalıştırılabilir ve ardından kaldırılabilir.
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
 <Tab value='Çıkarma komutu'>

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
bun x intlayer extract
```

 </Tab>
 <Tab value='Babel derleyicisi'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

`vite.config.ts` dosyanızı `intlayerCompiler` eklentisini içerecek şekilde güncelleyin:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # Veya npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### (İsteğe bağlı) Sitemap ve robots.txt (build zamanı üretimi)

Intlayer, `generateSitemap` ve `getMultilingualUrls` ile tarayıcılar için çok dilli `sitemap.xml` ve `robots.txt` üretip bunları `public/` klasörüne otomatik yazmanıza yardımcı olur. Genelde Vite’tan **önce** küçük bir Node betiği çalıştırılır (ör. npm `predev` / `prebuild` kancaları).

#### Sitemap

Intlayer sitemap oluşturucusu yerel ayarlarınıza uyar ve tarayıcılar için metadata ekler.

> Üretilen sitemap `xhtml:link` (hreflang) ad alanını destekler. Düz URL listesi yerine, her sayfanın tüm dil sürümleri çift yönlü bağlanır (ör. `/about`, `/fr/about` veya `/about?lang=fr` - yönlendirme moduna bağlı).

#### Robots.txt

`getMultilingualUrls` kullanarak `Disallow` kurallarının hassas yolların tüm yerelleştirilmiş varyantlarını kapsamasını sağlayın.

#### 1. Proje köküne `generate-seo.mjs` ekleyin

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

Betik `intlayer` içe aktarabilmeli; paket kurulu olmalı. Üretimde ortam değişkeni `SITE_URL` ayarlayın (ör. CI).

> Node ESM için `generate-seo.mjs` tercih edin. `generate-seo.js` kullanıyorsanız `package.json` içinde `"type": "module"` veya ESM’yi başka şekilde etkinleştirin.

#### 2. Betiği Vite’tan önce çalıştırın

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

pnpm veya yarn kullanıyorsanız komutları uyarlayın. CI’dan da çağrılabilir.

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların göz ardı edilmesi önerilir. Bu, bu dosyaların Git deposuna eklenmesini önlemenizi sağlar.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```bash
#  Intlayer tarafından oluşturulan dosyaları göz ardı et
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

## Sıkça Sorulan Sorular

<FAQ>

<Question title="Vite ve Svelte uygulamasını uluslararasılaştırmak için hangi farklı çözümler mevcuttur?">

Vite'ın i18n konusunda özel bir tercihi yoktur, bu nedenle seçenekler Svelte ekosistemindekilerdir:

- **`svelte-i18n`** veya **`typesafe-i18n`**: Svelte store'larına dayalı çözümler.
- **`Intlayer`**: bileşen yanında bildirim, derleme zamanı derlemesi, Svelte reaktivitesi ile tam entegrasyon ve AI çeviri sunan modern çözüm.

Bkz. [neden Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md).

</Question>

<Question title="i18n Svelte paket boyutuma ne kadar ekler?">

Ad alanı tabanlı bir yapılandırmaya kıyasla çok daha az, çünkü bir sayfa render etmediği bir kataloğu asla indirmez. Derleme zamanı derleyicisi `useIntlayer` çağrılarını bileşenin kullandığı kesin sözlük girişleriyle değiştirir ve [dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md) geri kalanını yerel başına böler. Intlayer paket boyutunu %50'ye kadar azaltır. Bkz. [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) ve [kıyaslama](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md).

</Question>

<Question title="svelte-i18n veya typesafe-i18n'den bileşenlerimi yeniden yazmadan geçiş yapabilir miyim?">

Büyük ölçüde evet. [Svelte I18n geçiş kılavuzunu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/svelte-i18n.md) izleyin.

</Question>

<Question title="Mevcut JSON çeviri dosyalarımı koruyabilir miyim?">

Evet. [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md), `/messages/{locale}/{namespace}.json` dosyalarınızı doğruluk kaynağı olarak tutar ve her iki yönde Intlayer sözlükleri üretir. [sync PO eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md) gettext katalogları için aynısını yapar ve [yerel başına dosyalar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/per_locale_file.md), yerelleri tek bir dosyada gruplamak yerine içeriği dile göre ayırmanıza olanak tanır.

</Question>

<Question title="İçeriğimi anahtar anahtar taşımak zorunda mıyım?">

Hayır. `npx intlayer extract` komutunu çalıştırın; Intlayer bileşenlerinizi okur, kullanıcıya dönük dizeleri çıkarır ve her birinin yanına bir `.content` dosyası yazar, böylece dizeleri tek tek kopyalamak yerine bir diff incelersiniz.

Tam otomatik bir süreç için [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) derleme sırasında aynı işlemi yapar: her değişiklikte kaynak kodunu tarar, sözlükleri üretir ve HMR ile senkronize tutar.

Derleyiciyi açmadan önce bilmeye değer iki sınır vardır. Statik analiz ile çalışır, bu nedenle API hata kodları veya CMS alanları gibi yalnızca çalışma zamanında var olan dizeler ulaşılamaz kalır. Ayrıca, `className="active"` veya durum kodu gibi uygulama mantığından kullanıcıya yönelik metinleri ayırt etmesi gerekir; bu da büyük bir kod tabanında birkaç ek açıklama gerektirir. [Extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) sizi döngüde tutarak her ikisinden de kaçınır.

</Question>

<Question title="Hangi editör ve AI aracı araçları mevcuttur?">

Beş araç, hepsi isteğe bağlı:

- **[VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)**: bir `useIntlayer` anahtarından onu tanımlayan içerik dosyasına atlayın, bileşenden içerik çıkarın ve komut paletinden build, fill, test, push ve pull komutlarını çalıştırın.
- **[LSP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**: LSP destekleyen tüm editörlerde tanıma gitme, tüm referansları bulma, çevrilmiş değerlerin fareyle üzerine gelindiğinde önizlemesi ve otomatik tamamlama. `i18next`, `react-i18next`, `next-intl` ve `use-intl` çağrılarını da çözer.
- **[MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)**: Intlayer dokümantasyonunu ve CLI'sini Cursor, VS Code, Claude Desktop, Claude Code ve ChatGPT'ye sunar.
- **[Ajan becerileri (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)**: `intlayer-config`, `intlayer-cli` ve `intlayer-content` gibi odaklanmış beceriler.
- **[ESLint eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/eslint.md)**: `no-raw-text` kuralı doğrudan kodlanmış metinleri işaretler.

</Question>

<Question title="Svelte bileşeninde çevrilmiş içeriği nasıl kullanırım?">

Bileşeninizde `useIntlayer` çağırın ve dönen içeriği okuyun. Değer reaktiftir, bu nedenle yereli değiştirmek onu kullanan bileşenleri sayfa yenilenmeden yeniden render eder.

</Question>

<Question title="Intlayer, Vite geliştirme sunucusu ve HMR ile çalışır mı?">

Evet. Vite eklentisi `.content.ts` dosyalarınızı izler ve kaydettiğinizde sözlükleri yeniden derler, böylece değişiklikler geliştirme sunucusunu yeniden başlatmadan görünür.

</Question>

<Question title="Yerelleştirilmiş yönlendirmeyi nasıl kurarım?">

Bu kılavuzdaki adımlar yerelleştirilmiş rotaları ve dil değiştiğinde URL'nin yeniden yazılmasını kapsar. `routing.mode` ayarı URL şemasını belirler: `"prefix-no-default"` (varsayılan: `/about` ve `/tr/about`), `"prefix-all"`, `"no-prefix"` veya `"search-params"`. Bkz. [yapılandırma referansı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md).

</Question>

<Question title="Arapça veya İbranice gibi sağdan sola dilleri nasıl desteklerim?">

`getHTMLTextDir` bir yerel için `ltr`, `rtl` veya `auto` döndürür; böylece aktif yerelden kök öğede `lang` ve `dir` bağlayabilir ve CSS mantıksal özelliklerinizin gerisini halletmesine izin verebilirsiniz.

</Question>

<Question title="İstemci tarafında render edilen Vite uygulamasında SEO meta verilerini nasıl yönetirim?">

Aktif yerelden `html` öğesinde `lang` ve `dir` ayarlayın ve `getMultilingualUrls` ile her bildirilen yerel için `hreflang` alternatifleri yayınlayın. Güvenilir şekilde taranması gereken sayfalar için önceden render edilmiş veya SSR kurulumunu tercih edin.

</Question>

<Question title="Uygulamayı AI ile otomatik olarak nasıl çevirebilirim?">

`npx intlayer fill` komutunu çalıştırın. Eksik çevirileri seçtiğiniz LLM ile kendi sağlayıcınız ve API anahtarınızı kullanarak tamamlar ve `--git-diff` işlemi daldaki değişikliklerle sınırlar. Bkz. [fill komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md) ve [CI/CD entegrasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/CI_CD.md).

</Question>

<Question title="Intlayer çoğulları, cinsiyeti ve zengin metni (rich text) destekliyor mu?">

Evet: [çoğul biçimleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/plurial.md), [cinsiyete dayalı içerik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/gender.md), koşullar, [eklemeler (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/markdown.md) ve [biçimlendiriciler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/formatters.md).

</Question>

<Question title="Çevirmenler koda dokunmadan içeriği nasıl düzenleyebilir?">

Kendi altyapınızda çalışan ve herkesin metinleri çalışan uygulamada yerinde düzenlemesine olanak tanıyan [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) veya içeriği kod dağıtımı olmadan güncellenebilecek şekilde dışsallaştıran [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) aracılığıyla.

</Question>

<Question title="Intlayer ücretsiz ve açık kaynaklı mı?">

Evet, ticari kullanım dahil Apache 2.0 lisansı altındadır. Barındırılan CMS isteğe bağlı ücretli bir hizmettir ve ayrıca [kendi sunucunuzda barındırılabilir (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md).

</Question>

</FAQ>
