---
createdAt: 2024-03-07
updatedAt: 2026-06-23
title: "Vite + React i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "Artık i18next yok. 2026 yılı için çok dilli (i18n) Vite + React uygulaması oluşturma kılavuzu. Yapay zeka ajanlarıyla çevirin ve bundle boyutu, SEO ve performansı optimize edin."
keywords:
  - Uluslararasılaştırma
  - Belgeler
  - Intlayer
  - Vite
  - React
  - Derleyici
  - AI
slugs:
  - doc
  - environment
  - vite-and-react
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "İlk sürüm"
author: aymericzip
---

# Mevcut bir Vite ve React uygulamasını sonradan nasıl çok dilli (i18n) hale getirirsiniz (i18n rehberi 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Vite ve React için en iyi i18n çözümü? Intlayer'ı keşfedin" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı nasıl uluslararasılaştırırsınız"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-react-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-react-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub üzerindeki [Uygulama Şablonunu](https://github.com/aymericzip/intlayer-vite-react-template) görün.

## İçindekiler

<TOC/>

## Mevcut bir uygulamayı uluslararasılaştırmak neden zordur?

Sadece bir dil için oluşturulmuş bir uygulamaya birden fazla dil eklemeyi denediyseniz, bu acıyı bilirsiniz. Bu sadece "zor" değil, aynı zamanda sıkıcıdır. Her dosyayı taramanız, her metin dizesini avlamanız ve bunları ayrı sözlük dosyalarına taşımanız gerekir.

Sonra riskli kısım gelir: tüm bu metni, düzeninizi veya mantığınızı bozmadan kod kancalarıyla (hooks) değiştirmek. Bu, yeni özellik geliştirmeyi haftalarca durduran ve bitmek bilmeyen bir yeniden yapılandırma gibi hissettiren bir iş türüdür.

## Intlayer Derleyicisi Nedir?

**Intlayer Derleyicisi**, bu manuel angarya işi atlamak için oluşturuldu. Dizeleri manuel olarak çıkarmak yerine, derleyici bunu sizin yerinize yapar. Kodunuzu tarar, metni bulur ve perde arkasında sözlükleri oluşturmak için AI kullanır.
Ardından, gerekli i18n kancalarını enjekte etmek için derleme sırasında kodunuzu değiştirir. Temel olarak, uygulamanızı sanki tek dilliymiş gibi yazmaya devam edersiniz ve derleyici çok dilli dönüşümü otomatik olarak halleder.

> Derleyici Belgeleri: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md)

### Sınırlamalar

Derleyici, **build zamanında** kod analizi ve dönüşümü (kancaların yerleştirilmesi ve sözlüklerin oluşturulması) gerçekleştirdiği için uygulamanızın **derleme sürecini yavaşlatabilir**.

Geliştirme sırasında bu etkiyi azaltmak için derleyiciyi [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) modunda çalışacak şekilde yapılandırabilir veya gerekmediğinde devre dışı bırakabilirsiniz.

---

## Vite ve React Uygulamasında Intlayer Kurulumu İçin Adım Adım Kılavuz

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
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**
  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilasyon ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **react-intlayer**
  Intlayer'ı React uygulamasıyla entegre eden paket. React uluslararasılaştırması için bağlam sağlayıcıları (context providers) ve kancalar sağlar.

- **vite-intlayer**
  Intlayer'ı [Vite paketleyici](https://vite.dev/guide/why.html#why-bundle-for-production) ile entegre etmek için Vite eklentisinin yanı sıra kullanıcının tercih ettiği dili algılamak, çerezleri yönetmek ve URL yönlendirmesini işlemek için ara yazılımı (middleware) içerir.

</Step>

<Step number={2} title="Projenizi Yapılandırın">

Uygulamanızın dillerini yapılandırmak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.TURKISH,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    /**
     * Derleyicinin etkinleştirilip etkinleştirilmeyeceğini belirtir.
     */
    enabled: true,

    /**
     * Optimize edilmiş sözlükler für çıktı dizini.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Oluşturulan dosyaya yalnızca içeriği yerleştirin, anahtar olmadan.
     */
    noMetadata: false,

    /**
     * Sözlük anahtar öneki
     */
    dictionaryKeyPrefix: "", // Remove base prefix

    /**
     * Bileşenlerin dönüştürüldükten sonra kaydedilip kaydedilmeyeceğini belirtir.
     * Bu şekilde, derleyici uygulamayı dönüştürmek için yalnızca bir kez çalıştırılabilir ve ardından kaldırılabilir.
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Bu uygulama bir harita uygulamasıdır", // Not: bu uygulama açıklamasını özelleştirebilirsiniz
  },
};

export default config;
```

> **Not**: Ortam değişkenlerinizde `OPEN_AI_API_KEY` anahtarının ayarlandığından emin olun.

> Bu yapılandırma dosyası aracılığıyla yerelleştirilmiş URL'ler, ara yazılım yönlendirmesi, çerez adları, içerik bildirimlerinizin konumu ve uzantısı gibi ayarları yapabilir, konsoldaki Intlayer günlüklerini devre dışı bırakabilir ve daha fazlasını yapabilirsiniz. Mevcut parametrelerin tam listesi için [yapılandırma belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

</Step>

<Step number={3} title="Intlayer'ı Vite Yapılandırmanıza Entegre Edin">

Yapılandırmanıza intlayer eklentisini ekleyin.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> `intlayer()` Vite eklentisi, Intlayer'ı Vite ile entegre etmek için kullanılır. İçerik bildirimi dosyalarının oluşturulmasını sağlar ve bunları geliştirme modunda izler. Vite uygulaması içinde Intlayer ortam değişkenlerini tanımlar. Ek olarak, performansı optimize etmek için takma adlar (aliases) sağlar.

> `intlayerCompiler()` Vite eklentisi, bileşenden içerik çıkarmak ve `.content` dosyalarını yazmak için kullanılır.

</Step>

<Step number={4} title="Kodunuzu Derleyin">

Sadece bileşenlerinizi varsayılan dilinizde sabit kodlu dizelerle yazın. Derleyici gerisini halleder.

Sayfanızın nasıl görünebileceğine dair örnek:

<Tabs>
 <Tab value="Kod">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logosu" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logosu" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          sayı: {count}
        </button>
        <p>
          HMR'yi test etmek için <code>src/App.tsx</code> dosyasını düzenleyin
          ve kaydedin
        </p>
      </div>
      <p className="read-the-docs">
        Daha fazlasını öğrenmek için Vite ve React logolarına tıklayın
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="Çıktı">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      tr: {
        viteLogo: "Vite logosu",
        reactLogo: "React logosu",
        title: "Vite + React",
        countButton: "sayı:",
        editMessage: "Düzenle",
        hmrMessage: "ve HMR'yi test etmek için kaydedin",
        readTheDocs: "Daha fazlasını öğrenmek için Vite ve React logolarına tıklayın",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- **`IntlayerProvider`**, alt bileşenlere dili sağlamak için kullanılır.

</Step>

<Step number={6} title="İçeriğinizin dilini değiştirin" isOptional={true}>

İçeriğinizin dilini değiştirmek için `useLocale` kancası tarafından sağlanan `setLocale` işlevini kullanabilirsiniz. Bu işlev, uygulamanın dilini ayarlamanıza ve içeriği buna göre güncellemenize olanak tanır.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Dili İngilizce Yap
    </button>
  );
};
```

> `useLocale` kancası hakkında daha fazla bilgi edinmek için [belgelere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md) bakın.

</Step>

<Step number={7} title="Eksik çevirileri doldur" isOptional={true}>

Intlayer, eksik çevirileri doldurmanıza yardımcı olacak bir CLI aracı sağlar. Kodunuzdaki eksik çevirileri test etmek ve doldurmak için `intlayer` komutunu kullanabilirsiniz.

```bash packageManager="npm"
npx intlayer test         # Eksik çeviri olup olmadığını test edin
```

```bash packageManager="yarn"
yarn intlayer test         # Eksik çeviri olup olmadığını test edin
```

```bash packageManager="pnpm"
pnpm intlayer test         # Eksik çeviri olup olmadığını test edin
```

```bash packageManager="bun"
bun x intlayer test         # Eksik çeviri olup olmadığını test edin
```

```bash packageManager="npm"
npx intlayer fill         # Eksik çevirileri doldurun
```

```bash packageManager="yarn"
yarn intlayer fill         # Eksik çevirileri doldurun
```

```bash packageManager="pnpm"
pnpm intlayer fill         # Eksik çevirileri doldurun
```

```bash packageManager="bun"
bun x intlayer fill         # Eksik çevirileri doldurun
```

> Daha fazla ayrıntı için [CLI belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/ci.md) bakın.
> </Step>

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

Intlayer tarafından oluşturulan dosyaların yoksayılması önerilir. Bu, onları Git deponuza göndermenizi engeller.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

### VS Code Eklentisi

Intlayer ile geliştirme deneyiminizi geliştirmek için resmi **Intlayer VS Code Eklentisini** yükleyebilirsiniz.

[VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu eklenti şunları sağlar:

- Çeviri anahtarları için **otomatik tamamlama**.
- Eksik çeviriler için **gerçek zamanlı hata algılama**.
- Çevrilmiş içeriğin **satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **hızlı eylemler**.

Eklentinin nasıl kullanılacağına ilişkin daha fazla ayrıntı için [Intlayer VS Code Eklentisi belgelerine](https://intlayer.org/doc/vs-code-extension) bakın.

### Daha Fazlası

Daha ileri gitmek için [görsel düzenleyiciyi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) uygulayabilir veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) kullanarak içeriğinizi dışsallaştırabilirsiniz.
