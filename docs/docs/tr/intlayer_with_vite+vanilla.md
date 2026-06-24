---
createdAt: 2026-03-23
updatedAt: 2026-06-23
title: "Vite + Vanilla JS i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "Artık i18next yok. 2026 yılı için çok dilli (i18n) Vite + Vanilla JS uygulaması oluşturma kılavuzu. Yapay zeka ajanlarıyla çevirin ve bundle boyutu, SEO ve performansı optimize edin."
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
applicationShowcase: https://intlayer-vite-vanilla.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 8.4.10
    date: 2026-03-23
    changes: "Başlangıç geçmişi"
author: aymericzip
---

# Intlayer kullanarak Vite ve Vanilla JS web sitenizi çevirin | Uluslararasılaştırma (i18n)

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-vanilla.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## İçindekiler

<TOC/>

## Neden alternatifler yerine Intlayer?

'i18next' veya 'i18n.js' gibi ana çözümlerle karşılaştırıldığında Intlayer, aşağıdaki gibi entegre optimizasyonlarla gelen bir çözümdür:

<AccordionGroup>

<Accordion header="Tam Vite kapsamı">

Intlayer, **çerçeveden bağımsız içerik yönetimi**, **TypeScript desteği** ve uluslararasılaştırmayı (i18n) ölçeklendirmek için gereken tüm özellikleri sunarak Vite ile mükemmel çalışacak şekilde optimize edilmiştir.

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

## Bir Vite ve Vanilla JS Uygulamasında Intlayer Kurulumu İçin Adım Adım Kılavuz

<Steps>

<Step number={1} title="Bağımlılıkları Yükleyin">

npm kullanarak gerekli paketleri yükleyin:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> `--interactive` bayrağı isteğe bağlıdır. Bir yapay zeka aracısıysanız `intlayer-cli init` kullanın.

> Bu komut ortamınızı algılayacak ve gerekli paketleri yükleyecektir. Örneğin:

```bash packageManager="npm"
npm install intlayer vanilla-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer vanilla-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer vanilla-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer vanilla-intlayer
bun add vite-intlayer --dev
```

- **intlayer**
  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), transpilasyon ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **vanilla-intlayer**
  Intlayer'ı saf JavaScript / TypeScript uygulamalarıyla entegre eden paket. Bir pub/sub singleton (`IntlayerClient`) ve geri çağırma tabanlı yardımcılar (`useIntlayer`, `useLocale`, vb.) sağlar, böylece uygulamanızın herhangi bir bölümü bir UI çerçevesine bağlı kalmadan yerel ayar değişikliklerine tepki verebilir.

- **vite-intlayer**
  Intlayer'ı [Vite paketleyici](https://vite.dev/guide/why.html#why-bundle-for-production) ile entegre etmek için Vite eklentisini ve kullanıcının tercih ettiği yerel ayarı algılamak, çerezleri yönetmek ve URL yönlendirmesini işlemek için ara yazılımı içerir.

</Step>

<Step number={2} title="Projenizin Yapılandırılması">

Ugulamanızın dillerini yapılandırmak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'leri, ara yazılım yönlendirmesini, çerez adlarını, içerik bildirimlerinizin konumunu ve uzantısını ayarlayabilir, konsoldaki Intlayer günlüklerini devre dışı bırakabilir ve daha fazlasını yapabilirsiniz. Mevcut parametrelerin tam listesi için [yapılandırma belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

</Step>

<Step number={3} title="Intlayer'ı Vite Yapılandırmanıza Entegre Edin">

Yapılandırmanıza intlayer eklentisini ekleyin.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

> `intlayer()` Vite eklentisi, Intlayer'ı Vite ile entegre etmek için kullanılır. İçerik bildirimi dosyalarının oluşturulmasını sağlar ve bunları geliştirme modunda izler. Vite uygulaması içinde Intlayer ortam değişkenlerini tanımlar. Ayrıca, performansı optimize etmek için takma adlar (aliases) sağlar.

</Step>

<Step number={4} title="Giriş noktanızda Intlayer'ı başlatın">

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

</Step>

<Step number={5} title="İçeriğinizi Bildirin">

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> İçerik bildirimleriniz, `contentDir` dizinine (varsayılan olarak `./src`) dahil oldukları sürece uygulamanızın herhangi bir yerinde tanımlanabilir. Ve içerik bildirimi dosyası uzantısıyla eşleşir (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Daha fazla ayrıntı için [içerik bildirimi belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

</Step>

<Step number={6} title="JavaScript'inizde Intlayer Kullanın">

`vanilla-intlayer`, `react-intlayer` yüzey API'sini yansıtır: `useIntlayer(key, locale?)` doğrudan çevrilmiş içeriği döndürür. Yerel ayar değişikliklerine abone olmak için sonuç üzerinde `.onChange()` işlevini zincirleyin - bir React yeniden oluşturmasının açık eşdeğeri.

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

</Step>

<Step number={7} title="İçeriğinizin dilini değiştirin" isOptional={true}>

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

</Step>

<Step number={8} title="Markdown ve HTML içeriği oluşturun" isOptional={true}>

Intlayer `md()` ve `html()` içerik bildirimlerini destekler. Vanilla JS'de, derlenmiş çıktı `innerHTML` aracılığıyla ham HTML olarak eklenir.

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

</Step>

<Step number={9} title="Uygulamanıza yerelleştirilmiş Yönlendirme ekleyin" isOptional={true}>

Her dil için benzersiz yollar oluşturmak için (SEO için yararlıdır), sunucu tarafı yerel ayar algılaması için Vite yapılandırmanızda `intlayerProxy` kullanabilirsiniz.

İlk olarak, Vite yapılandırmanıza `intlayerProxy` ekleyin:

> Üretimde `intlayerProxy` kullanmak için `vite-intlayer`'ı `devDependencies`'dan `dependencies`'e taşımanız gerektiğini unutmayın.

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // ilk sıraya yerleştirilmelidir
    intlayer(),
  ],
});
```

</Step>

<Step number={10} title="Yerel ayar değiştiğinde URL'yi değiştirin" isOptional={true}>

Yerel ayar değiştiğinde tarayıcı URL'sini güncellemek için Intlayer'ı yükledikten sonra `useRewriteURL()` işlevini çağırın:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useRewriteURL } from "vanilla-intlayer";

installIntlayer();

// URL'yi hemen ve sonraki her yerel ayar değişikliğinde yeniden yazar.
// Temizlik için bir abonelikten çıkma işlevi döndürür.
const stopRewriteURL = useRewriteURL();
```

</Step>

<Step number={11} title="HTML Dil ve Yön Özniteliklerini Değiştirin" isOptional={true}>

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

</Step>

<Step number={12} title="Yerel ayar başına sözlükleri tembel yükleyin" isOptional={true}>

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

> Her yerel ayarın paketi yalnızca o yerel ayar etkinleştirildiğinde getirilir ve sonuç önbelleğe alınır - aynı yerel ayara sonraki geçişler anlıktır.

</Step>

<Step number={13} title="Bileşenlerinizin içeriğini dışa aktarın" isOptional={true}>

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
bun x intlayer extract
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
