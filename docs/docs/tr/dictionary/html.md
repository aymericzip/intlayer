---
createdAt: 2026-01-20
updatedAt: 2026-01-22
title: HTML İçeriği
description: Intlayer içinde HTML içeriğini nasıl tanımlayıp özel bileşenlerle kullanacağınızı öğrenin. Bu dokümantasyonu izleyerek çok dilli projenizde dinamik bileşen değiştirme ile zengin HTML benzeri içeriği entegre edin.
keywords:
  - HTML
  - Özel Bileşenler
  - Zengin İçerik
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Vue
  - Svelte
  - Solid
  - Angular
slugs:
  - doc
  - concept
  - content
  - html
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: HTMLRenderer / useHTMLRenderer / renderHTML yardımcı araçları eklendi
  - version: 8.0.0
    date: 2026-01-20
    changes: HTML ayrıştırma desteği eklendi
---

# HTML İçeriği / Intlayer içinde HTML

Intlayer, sözlükleriniz içinde zengin, yapılandırılmış içerik gömmenize olanak tanıyan HTML içeriğini destekler. Bu içerik, standart HTML etiketleriyle render edilebilir veya çalışma zamanında özel bileşenlerle değiştirilebilir.

## HTML İçeriğini Tanımlama

HTML içeriğini `html` fonksiyonunu kullanarak veya basitçe bir string olarak tanımlayabilirsiniz.

<Tabs>
  <Tab label="Elle Sarma" value="manual-wrapping">
    HTML içeriğini açıkça bildirmek için `html` fonksiyonunu kullanın. Bu, otomatik algılama devre dışı olsa bile standart etiketlerin doğru şekilde eşlenmesini sağlar.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      contentAutoTransformation: true, // yapılandırma dosyasında ayarlanabilir
      content: {
        myHtmlContent:  html("<p>Merhaba <strong>Dünya</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="Otomatik Algılama" value="automatic-detection">
    Dize yaygın HTML etiketleri içeriyorsa (ör. `<p>`, `<div>`, `<strong>` vb.), Intlayer bunu otomatik olarak dönüştürür.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // yapılandırma dosyasında ayarlanabilir
      content: {
        myHtmlContent:  "<p>Merhaba <strong>Dünya</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="Harici Dosyalar" value="external-files">
    HTML içeriğini dosyalardan içe aktarın. `file()` fonksiyonunun şu anda bir string döndürdüğünü ve eğer etiketler içeriyorsa bunun HTML olarak otomatik algılanacağını unutmayın.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: html(file("./content.en.html")),
          fr: html(file("./content.fr.html")),
          tr: html(file("./content.tr.html")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

### `html()` Düğümü

`html()` fonksiyonu, Intlayer v8'de sözlüklerinizde HTML içeriğini açıkça tanımlamanıza olanak tanıyan yeni bir özelliktir. Intlayer genellikle HTML içeriğini otomatik olarak algılayabilse de, `html()` fonksiyonunu kullanmak birkaç avantaj sağlar:

- **Tür Güvenliği**: `html()` fonksiyonu, özel bileşenler için beklenen propları tanımlamanıza olanak tanıyarak editörünüzde daha iyi otomatik tamamlama ve tür denetimi sağlar.
- **Açık Bildirim**: Otomatik algılamayı tetikleyecek standart HTML etiketleri içermese bile bir dizenin her zaman HTML olarak değerlendirilmesini sağlar.
- **Özel Bileşen Tanımlama**: Özel bileşenleri ve beklenen prop türlerini tanımlamak için `html()` fonksiyonuna ikinci bir argüman geçirebilirsiniz.

```typescript
import { html } from "intlayer";

const myContent = html(
  "<MyCustomComponent title='Merhaba'>Dünya</MyCustomComponent>",
  {
    MyCustomComponent: {
      title: "string",
      children: "node",
    },
  }
);
```

Bir HTML düğümü üzerinde `.use()` yöntemini kullanırken, sağladığınız bileşenler `html()` fonksiyonunda sağlanan tanıma (varsa) göre kontrol edilecektir.

---

## HTML'i Render Etme

Render işlemi Intlayer'ın içerik sistemi tarafından otomatik olarak veya özel araçlar kullanılarak manuel olarak yapılabilir.

### Otomatik Renderleme ( `useIntlayer` kullanarak)

`useIntlayer` aracılığıyla içeriğe eriştiğinizde, HTML düğümleri render için zaten hazırlanmıştır.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    HTML düğümleri doğrudan JSX olarak render edilebilir. Standart etiketler otomatik olarak çalışır.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    Özelleştirilmiş bileşen sağlamak veya etiketleri geçersiz kılmak için `.use()` metodunu kullanın:

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    Vue'de, HTML içeriği `component` yerleşik bileşeni kullanılarak render edilebilir.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    Override'lar için `.use()` kullanın:
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte, HTML düğümlerini string olarak render eder. Bunu render etmek için `{@html}` kullanın.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact, HTML düğümlerini JSX içinde doğrudan destekler.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid, HTML düğümlerini JSX içinde doğrudan destekler.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular, HTML içeriğini oluşturmak için `[innerHTML]` direktifini kullanır.

    ```typescript fileName="app.component.ts"
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-root",
      template: `<div [innerHTML]="content().myHtmlContent"></div>`,
    })
    export class AppComponent {
      content = useIntlayer("app");
    }
    ```

    Özelleştirilmiş bileşen sağlamak veya etiketleri geçersiz kılmak için `.use()` metodunu kullanın:

    ```typescript
    content().myHtmlContent.use({
      p: { class: "prose" },
      CustomLink: { href: "/details" },
    })
    ```

  </Tab>
</Tabs>

## `HTMLProvider` ile Genel Yapılandırma

HTML render'lamasını tüm uygulamanız için global olarak yapılandırabilirsiniz. Bu, tüm HTML içeriğinde kullanılabilir olması gereken özel bileşenleri tanımlamak için idealdir.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "react-intlayer";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
          CustomLink: ({ children }) => <a href="/details">{children}</a>,
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

  </Tab>
  <Tab label="Vue" value="vue">
  
    ```typescript fileName="main.ts"
    import { createApp, h } from "vue";
    import { installIntlayer, installIntlayerHTML } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(installIntlayer);
    app.use(installIntlayerHTML, {
      components: {
        p: (props, { slots }) => h("p", { class: "prose", ...props }, slots.default?.()),
        CustomLink: (props, { slots }) => h("a", { href: "/details", ...props }, slots.default?.()),
      },
    });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
   
    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { HTMLProvider } from "svelte-intlayer";
      import MyCustomP from "./MyCustomP.svelte";
    </script>

    <HTMLProvider
      components={{
        p: MyCustomP,
      }}
    >
      <slot />
    </HTMLProvider>
    ```

  </Tab>
  <Tab label="Preact" value="preact">
   
    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "preact-intlayer";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">
   
    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "solid-intlayer";

    export const AppProvider = (props) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
        }}
      >
        {props.children}
      </HTMLProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerMarkdownProvider({
          components: {
            p: { class: "prose" },
            CustomLink: { href: "/details" },
          },
        }),
      ],
    };
    ```

  </Tab>
</Tabs>

---

### Manuel Renderlama ve Gelişmiş Araçlar

Ham HTML string'lerini render etmeniz gerekiyorsa veya bileşen eşlemesinde daha fazla kontrole ihtiyacınız varsa, aşağıdaki araçları kullanın.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### `<HTMLRenderer />` Bileşeni
    Belirli bileşenlerle bir HTML stringini render edin.

    ```tsx
    import { HTMLRenderer } from "react-intlayer";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Merhaba Dünya</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook
    Ön yapılandırılmış bir renderer fonksiyonu alın.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Merhaba <strong>Dünya</strong></p>");
    ```

    #### `renderHTML()` Yardımcı Aracı

    Bileşenlerin dışında render yapmak için bağımsız yardımcı araç.

    ```tsx
    import { renderHTML } from "react-intlayer";

    const jsx = renderHTML("<p>Merhaba</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue" value="vue">
   
    #### `<HTMLRenderer />` Bileşeni
   
    ```vue
    <script setup>
    import { HTMLRenderer } from "vue-intlayer";
    </script>

    <template>
      <HTMLRenderer content="<p>Merhaba Dünya</p>" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
  
    #### `<HTMLRenderer />` Bileşeni
   
    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer";
    </script>

    <HTMLRenderer value="<p>Merhaba Dünya</p>" />
    ```

    #### `useHTMLRenderer()` Hook

    ```svelte
    <script lang="ts">
    import { useHTMLRenderer } from "svelte-intlayer";
    const render = useHTMLRenderer();
    </script>

    {@html render("<p>Merhaba Dünya</p>")}
    ```

    #### `renderHTML()` Yardımcı Aracı

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer";
    </script>

    {@html renderHTML("<p>Merhaba Dünya</p>")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
   
    #### `<HTMLRenderer />` Bileşeni
   
    ```tsx
    import { HTMLRenderer } from "preact-intlayer";

    <HTMLRenderer>
      {"<p>Merhaba Dünya</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook

    ```tsx
    import { useHTMLRenderer } from "preact-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Merhaba Dünya</p>")}</div>;
    ```

    #### `renderHTML()` Yardımcı Aracı

    ```tsx
    import { renderHTML } from "preact-intlayer";

    return <div>{renderHTML("<p>Merhaba Dünya</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
   
    #### `<HTMLRenderer />` Bileşeni
   
    ```tsx
    import { HTMLRenderer } from "solid-intlayer";

    <HTMLRenderer>
      {"<p>Merhaba Dünya</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook

    ```tsx
    import { useHTMLRenderer } from "solid-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Merhaba Dünya</p>")}</div>;
    ```

    #### `renderHTML()` Yardımcı Aracı

    ```tsx
    import { renderHTML } from "solid-intlayer";

    return <div>{renderHTML("<p>Merhaba Dünya</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### `IntlayerMarkdownService` Servisi
    Servisi kullanarak bir HTML dizesini oluşturun.

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderHTML(html: string) {
        return this.markdownService.renderMarkdown(html);
      }
    }
    ```

  </Tab>
</Tabs>

---

## Seçenekler Referansı

Bu seçenekler `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer` ve `renderHTML`'e iletilebilir.

| Seçenek      | Tür                   | Varsayılan | Açıklama                                                                                                                    |
| :----------- | :-------------------- | :--------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`       | HTML etiketlerini veya özel bileşen isimlerini bileşenlere eşleyen bir harita.                                              |
| `renderHTML` | `Function`            | `null`     | Varsayılan HTML ayrıştırıcısını tamamen değiştirmek için özel bir render fonksiyonu (Sadece Vue/Svelte sağlayıcıları için). |

> Not: React ve Preact için standart HTML etiketleri otomatik olarak sağlanır. Bunları geçersiz kılmak veya özel bileşenler eklemek istiyorsanız yalnızca `components` prop'unu geçirmeniz yeterlidir.
