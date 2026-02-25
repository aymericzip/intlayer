---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Vite ve React i18n - Mevcut bir uygulamayı çok dilli bir uygulamaya dönüştürün (i18n rehberi 2026)
description: Intlayer Compiler kullanarak mevcut Vite ve React uygulamanızı nasıl çok dilli hale getireceğinizi keşfedin. Uluslararasılaştırma (i18n) ve AI ile çeviri için belgeleri takip edin.
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
  - ortam
  - vite-ve-react
  - derleyici
  - AI
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: İlk sürüm
---

# Mevcut bir Vite ve React uygulamasını sonradan nasıl çok dilli (i18n) hale getirirsiniz (i18n rehberi 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Vite ve React için en iyi i18n çözümü? Intlayer'ı keşfedin" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı nasıl uluslararasılaştırırsınız"
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

> Derleyici Belgeleri: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md)

### Sınırlamalar

Derleyici, **derleme zamanında** kod analizi ve dönüşümü (kancaların yerleştirilmesi ve sözlüklerin oluşturulması) gerçekleştirdiği için uygulamanızın **derleme sürecini yavaşlatabilir**.

Geliştirme sırasında bu etkiyi azaltmak için derleyiciyi [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) modunda çalışacak şekilde yapılandırabilir veya gerekmediğinde devre dışı bırakabilirsiniz.

---

## Vite ve React Uygulamasında Intlayer Kurulumu İçin Adım Adım Kılavuz

### Adım 1: Bağımlılıkları Yükleyin

Gerekli paketleri npm kullanarak yükleyin:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilasyon ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **react-intlayer**
  Intlayer'ı React uygulamasıyla entegre eden paket. React uluslararasılaştırması için bağlam sağlayıcıları (context providers) ve kancalar sağlar.

- **vite-intlayer**
  Intlayer'ı [Vite paketleyici](https://vite.dev/guide/why.html#why-bundle-for-production) ile entegre etmek için Vite eklentisinin yanı sıra kullanıcının tercih ettiği dili algılamak, çerezleri yönetmek ve URL yönlendirmesini işlemek için ara yazılımı (middleware) içerir.

### Adım 2: Projenizi Yapılandırın

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
    enabled: true, // Geliştirme modu üzerindeki etkiyi sınırlamak için 'build-only' olarak ayarlanabilir
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Ön ek comp- yok
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

### Adım 3: Intlayer'ı Vite Yapılandırmanıza Entegre Edin

Yapılandırmanıza intlayer eklentisini ekleyin.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerCompiler } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerCompiler()],
});
```

> `intlayer()` Vite eklentisi, Intlayer'ı Vite ile entegre etmek için kullanılır. İçerik bildirimi dosyalarının oluşturulmasını sağlar ve bunları geliştirme modunda izler. Vite uygulaması içinde Intlayer ortam değişkenlerini tanımlar. Ek olarak, performansı optimize etmek için takma adlar (aliases) sağlar.

> `intlayerCompiler()` Vite eklentisi, bileşenden içerik çıkarmak ve `.content` dosyalarını yazmak için kullanılır.

### Adım 4: Kodunuzu Derleyin

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

### (İsteğe Bağlı) Adım 6: İçeriğinizin dilini değiştirin

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
