---
createdAt: 2024-03-07
updatedAt: 2026-05-31
title: "Astro i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "Artık i18next yok. 2026 yılı için çok dilli (i18n) Astro uygulaması oluşturma kılavuzu. Yapay zeka ajanlarıyla çevirin ve bundle boyutu, SEO ve performansı optimize edin."
keywords:
  - uluslararasılaştırma
  - dokümantasyon
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init komutu eklendi"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Astro entegrasyonu, konfigürasyon ve kullanım güncellemesi"
---

# Astro Sitenizi Intlayer ile Çevirin | Uluslararasılaştırma (i18n)

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Uygulamanızı Intlayer ile nasıl uluslararasılaştırırsınız"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## İçindekiler

<TOC/>

## Neden alternatifler yerine Intlayer?

'astro-i18n' veya 'i18next' gibi ana çözümlerle karşılaştırıldığında Intlayer, aşağıdaki gibi entegre optimizasyonlarla gelen bir çözümdür:

<AccordionGroup>

<Accordion header="Tam Astro kapsamı">

Intlayer, **çok dilli yönlendirme**, **site haritası** ve uluslararasılaştırmayı (i18n) ölçeklendirmek için gereken tüm özellikleri sunarak Astro ile mükemmel çalışacak şekilde optimize edilmiştir.

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

## Astro'da Intlayer'ı Yapılandırmak İçin Adım Adım Kılavuz

GitHub'daki [uygulama şablonuna](https://github.com/aymericzip/intlayer-astro-template) göz atın.

<Steps>

<Step number={1} title="Bağımlılıkları Yükleyin">

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketleri yükleyin:

```bash packageManager="npm"
npm install intlayer astro-intlayer
# opsiyonel: React islands desteği eklemek isterseniz
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# opsiyonel: React islands desteği eklemek isterseniz
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# opsiyonel: React islands desteği eklemek isterseniz
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Konfigürasyon yönetimi, çeviriler, [içerik deklarasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), transpilasyon ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için i18n araçları sağlayan temel paket.

- **astro-intlayer**
  Intlayer'ı [Vite paketleyici](https://vite.dev/guide/why.html#why-bundle-for-production) ile bağlamak için Astro entegrasyon eklentisi; ayrıca kullanıcının tercih ettiği dili algılamak, çerezleri yönetmek ve URL yönlendirmelerini işlemek için ara yazılım (middleware) içerir.

</Step>

<Step number={2} title="Projenizi Yapılandırın">

Uygulamanızın dillerini tanımlamak için bir konfigürasyon dosyası oluşturun:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.TURKISH,
      // Diğer dilleriniz
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Bu konfigürasyon dosyası aracılığıyla yerelleştirilmiş URL'leri, ara yazılım yönlendirmelerini, çerez adlarını, içerik deklarasyonlarının konumunu ve uzantılarını yapılandırabilir, konsoldaki Intlayer günlüklerini devre dışı bırakabilir ve daha fazlasını yapabilirsiniz. Kullanılabilir parametrelerin tam listesi için [konfigürasyon dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

</Step>

<Step number={3} title="Intlayer'ı Astro konfigürasyonunuza entegre edin">

Astro konfigürasyonunuza `intlayer` eklentisini ekleyin.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> `intlayer()` entegrasyon eklentisi, Intlayer'ı Astro ile entegre etmek için kullanılır. İçerik deklarasyon dosyalarının oluşturulmasını sağlar ve bunları geliştirme modunda izler. Astro uygulaması içinde Intlayer ortam değişkenlerini tanımlar ve performansı optimize etmek için takma adlar (aliases) sağlar.

</Step>

<Step number={4} title="İçeriğinizi Deklare Edin">

Çevirileri saklamak için içerik deklarasyonlarınızı oluşturun ve yönetin:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      tr: "Merhaba Dünya",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> İçerik deklarasyonları, `contentDir` (varsayılan olarak `./src`) içinde yer aldıkları ve içerik deklarasyon dosyası uzantısıyla (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) eşleştikleri sürece uygulamanızın herhangi bir yerinde tanımlanabilir.

> Daha fazla bilgi için [içerik deklarasyon dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

</Step>

<Step number={5} title="Astro'da İçeriği Kullanma">

Sözlükleri doğrudan `.astro` dosyalarınızda, `intlayer`'dan dışa aktarılan temel yardımcıları kullanarak tüketebilirsiniz.

```astro fileName="src/pages/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  defaultLocale,
  localeMap,
  getHTMLTextDir,
  type LocalesValues,
} from "intlayer";
import LocaleSwitcher from "../components/LocaleSwitcher.astro";

// Get the current locale from the URL (e.g. /es/about -> 'es')
const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;

// Get the content for the 'app' dictionary
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Canonical link: Tells search engines which is the primary version of this page -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Tell Google about all localized versions -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <!-- x-default: Fallback for users in unmatched languages -->
    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <h1>{title}</h1>
    </main>
  </body>
</html>
```

</Step>

<Step number={6} title="Yerelleştirilmiş Yönlendirme">

Yerelleştirilmiş sayfaları sunmak için dinamik rota segmentleri oluşturun (örneğin `src/pages/[locale]/index.astro`):

```astro fileName="src/pages/[locale]/index.astro"
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Astro entegrasyonu, geliştirme sırasında dile duyarlı yönlendirme ve ortam tanımlamalarına yardımcı olan bir Vite ara yazılımı ekler. Ayrıca diller arasında bağlantı kurmak için kendi mantığınızı veya `intlayer` araçlarını (örneğin `getLocalizedUrl`) kullanabilirsiniz.

</Step>

<Step number={7} title="Favori Framework'ünüzü Kullanmaya Devam Edin">

Seçtiğiniz framework'ü kullanarak uygulamanızı oluşturmaya devam edin.

- Intlayer + React: [React ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+react.md)
- Intlayer + Vue: [Vue ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Svelte ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Solid ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Preact ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+preact.md)
  </Step>

<Step number={17} title="Bileşenlerinizin içeriğini çıkarın" isOptional={true}>

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

`vite.config.ts` dosyanızı `intlayerCompiler` eklentisini içerecek şekilde güncelleyin:

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

---

</Step>

</Steps>

### TypeScript Yapılandırması

Intlayer, kod tabanınızı daha sağlam hale getirmek için TypeScript'ten yararlanmak amacıyla modül artırımı (module augmentation) kullanır.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation Error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript yapılandırmanızın otomatik olarak oluşturulan türleri içerdiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... mevcut TypeScript yapılandırmanız
  "include": [
    // ... mevcut TypeScript yapılandırmanız
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri dahil edin
  ],
}
```

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların yoksayılması önerilir. Bu, onları Git deponuza göndermenizi engeller.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyin:

```bash
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi iyileştirmek için **resmi Intlayer VS Code uzantısını** yükleyebilirsiniz.

[VS Code Marketplace'ten Kurulum](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- Çeviri anahtarları için **otomatik tamamlama**.
- Eksik çeviriler için **gerçek zamanlı hata algılama**.
- Çevrilmiş içeriğin **satır içi önizlemesi**.
- Kolayca çeviri oluşturmak ve güncellemek için **hızlı eylemler**.

Uzantı kullanımı hakkında daha fazla bilgi için [VS Code Uzantısı dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakın.

---

### Bilginizi Derinleştirin

Daha fazlasını öğrenmek isterseniz, içeriğinizi dış kaynaklara aktarmak için [Görsel Editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)'ü uygulayabilir veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanabilirsiniz.
