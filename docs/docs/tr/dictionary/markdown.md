---
createdAt: 2025-02-07
updatedAt: 2026-01-22
title: Markdown
description: Intlayer ile çok dilli web sitenizde Markdown içeriği nasıl bildireceğinizi ve kullanacağınızı öğrenin. Bu çevrimiçi dokümantasyonun adımlarını takip ederek Markdown'ı projenize sorunsuz bir şekilde entegre edin.
keywords:
  - Markdown
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - markdown
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: MarkdownRenderer / useMarkdownRenderer / renderMarkdown yardımcı araçları ve forceInline seçeneği eklendi
  - version: 8.0.0
    date: 2026-01-18
    changes: Markdown içeriğinin otomatik olarak süslenmesi, MDX ve SSR desteği
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Markdown / Zengin Metin İçeriği

Intlayer, Markdown sözdizimi kullanılarak tanımlanan zengin metin içeriğini destekler. Bu, bloglar, makaleler ve daha fazlası gibi zengin biçimlendirmeye sahip içeriği kolayca yazmanıza ve sürdürmenize olanak tanır.

## Markdown Nasıl Çalışır

Intlayer v8, içerik dizelerinizdeki Markdown sözdizimini akıllıca algılar. Bir dize Markdown olarak tanımlanırsa, otomatik olarak bir Markdown düğümüne dönüştürülür.

<Columns>
  <Column title="v7 davranışı (Manuel sarmalama)">

    ```typescript fileName="markdownDictionary.content.ts"
    import { md } from "intlayer";

    export default {
      key: "app",
      content: {
        text: md("## Başlığım \n\nLorem Ipsum"),
      },
    };
    ```

  </Column>
  <Column title="v8 davranışı (Otomatik algılama)">

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Markdown içeriğinin otomatik olarak algılanmasını etkinleştir - intlayer.config.ts dosyasında küresel olarak ayarlanabilir
      content: {
        text: "## Başlığım \n\nLorem Ipsum",
      },
    };
    ```

  </Column>
</Columns>

---

## Bölüm 1: Markdown İçeriğini Tanımlama

Markdown içeriğini `md` fonksiyonunu kullanarak veya sadece bir string olarak (Markdown sözdizimi içeriyorsa) tanımlayabilirsiniz.

<Tabs>
  <Tab label="Elle Sarma">
    Markdown içeriğini açıkça bildirmek için `md` fonksiyonunu kullanın. Bu, bir dizenin belirgin bir sözdizimi içermese bile Markdown olarak işlenmesini sağlamak istediğinizde yararlıdır.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## Başlığım \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="Otomatik Algılama">
    Dize yaygın Markdown göstergelerini (başlıklar, listeler, bağlantılar vb.) içeriyorsa, Intlayer bunu otomatik olarak dönüştürecektir.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Markdown içeriğinin otomatik olarak algılanmasını etkinleştir - intlayer.config.ts dosyasında küresel olarak ayarlanabilir
      content: {
        myMarkdownContent: "## Başlığım \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
  <Tab label="Harici Dosyalar">
    `.md` dosyalarını `file` fonksiyonunu kullanarak doğrudan içe aktarın.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          fr: md(file("./myMarkdown.fr.md")),
          tr: md(file("./myMarkdown.tr.md")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## Bölüm 2: Markdown'ı Render Etme

Render işlemi Intlayer'ın içerik sistemi tarafından otomatik olarak veya özel araçlar kullanılarak manuel olarak yapılabilir.

### 1. Otomatik Renderleme ( `useIntlayer` kullanarak)

`useIntlayer` aracılığıyla içeriğe eriştiğinizde, Markdown düğümleri render için zaten hazırlanmıştır.

<Tabs group="framework">
  <Tab label="React / Next.js">
    Markdown düğümleri doğrudan JSX olarak render edilebilir.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

    Ayrıca `.use()` metodunu kullanarak belirli düğümler için yerel override'lar sağlayabilirsiniz:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    })}
    ```

  </Tab>
  <Tab label="Vue">
    Vue'de, Markdown içeriği `component` yerleşik bileşeni kullanılarak veya doğrudan bir düğüm olarak render edilebilir.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte">
    Svelte, Markdown'ı varsayılan olarak bir HTML stringi olarak render eder. Bunu render etmek için `{@html}` kullanın.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myMarkdownContent}
    ```

  </Tab>
  <Tab label="Preact">
    Preact, Markdown düğümlerini JSX içinde doğrudan destekler.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid">
    Solid, Markdown düğümlerini JSX içinde doğrudan destekler.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular">
    Angular, Markdown içeriğini oluşturmak için `[innerHTML]` direktifini kullanır.

    ```typescript fileName="app.component.ts"
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-root",
      template: `<div [innerHTML]="content().myMarkdownContent"></div>`,
    })
    export class AppComponent {
      content = useIntlayer("app");
    }
    ```

    Ayrıca `.use()` metodunu kullanarak belirli düğümler için yerel override'lar sağlayabilirsiniz:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

  </Tab>
</Tabs>

### 2. Manuel Renderlama ve Gelişmiş Araçlar

Ham Markdown string'lerini render etmeniz gerekiyorsa veya render süreci üzerinde daha fazla kontrole ihtiyacınız varsa, aşağıdaki araçları kullanın.

<Tabs group="framework">
  <Tab label="React / Next.js">
  
    #### `<MarkdownRenderer />` Bileşeni

    Belirli seçeneklerle bir Markdown stringini render edin.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Başlığım"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook
    Ön yapılandırılmış bir renderer fonksiyonu alın.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Başlığım");
    ```

    #### `renderMarkdown()` Yardımcı Aracı
    Bileşenlerin dışında render yapmak için bağımsız yardımcı araç.

    ```tsx
    import { renderMarkdown } from "react-intlayer";

    const jsx = renderMarkdown("# Başlığım", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue">

    #### `<MarkdownRenderer />` Bileşeni

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# Başlığım" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte">

    #### `<MarkdownRenderer />` Bileşeni

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer";
    </script>

    <MarkdownRenderer forceBlock={true} value="# Başlığım" />
    ```

    #### `useMarkdownRenderer()` Hook

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# Başlığım")}
    ```

    #### `renderMarkdown()` Yardımcı Aracı

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer";
    </script>

    {@html renderMarkdown("# Başlığım")}
    ```

  </Tab>
  <Tab label="Preact">
    #### `<MarkdownRenderer />` Bileşeni

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# Başlığım"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# Başlığım")}</div>;
    ```

    #### `renderMarkdown()` Yardımcı Aracı

    ```tsx
    import { renderMarkdown } from "preact-intlayer";

    return <div>{renderMarkdown("# Başlığım")}</div>;
    ```

  </Tab>
  <Tab label="Solid">
    #### `<MarkdownRenderer />` Bileşeni

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# Başlığım"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# Başlığım")}</div>;
    ```

    #### `renderMarkdown()` Yardımcı Aracı

    ```tsx
    import { renderMarkdown } from "solid-intlayer";

    return <div>{renderMarkdown("# Başlığım")}</div>;
    ```

  </Tab>
  <Tab label="Angular">
    #### `IntlayerMarkdownService` Servisi
    Servisi kullanarak bir Markdown dizesini oluşturun.

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderMarkdown(markdown: string) {
        return this.markdownService.renderMarkdown(markdown);
      }
    }
    ```

  </Tab>
</Tabs>

---

## `MarkdownProvider` ile Genel Yapılandırma

Markdown render'lamasını tüm uygulamanız için global olarak yapılandırabilirsiniz. Bu, her renderer'a aynı prop'ları geçirme zorunluluğunu ortadan kaldırır.

<Tabs group="framework">
  <Tab label="React / Next.js">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
          a: ({ href, children }) => <Link to={href}>{children}</Link>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Vue">

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(installIntlayer);
    app.use(installIntlayerMarkdown, {
      forceBlock: true,
      tagfilter: true,
      components: {
        h1: {
          component: "h1",
          props: { class: "text-2xl font-bold" },
        },
      },
    });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer";
      import MyHeading from "./MyHeading.svelte";
    </script>

    <MarkdownProvider
      forceBlock={true}
      tagfilter={true}
      components={{
        h1: MyHeading,
      }}
    >
      <slot />
    </MarkdownProvider>
    ```

  </Tab>
  <Tab label="Preact">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Solid">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer";

    export const AppProvider = (props) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: (props) => <h1 className="text-2xl font-bold">{props.children}</h1>,
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerMarkdownProvider({
          components: {
            h1: { class: "text-2xl font-bold" },
          },
        }),
      ],
    };
    ```

  </Tab>
</Tabs>

---

## Seçenekler Referansı

Bu seçenekler `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer` ve `renderMarkdown`'a iletilebilir.

| Seçenek               | Tür         | Varsayılan | Açıklama                                                                                                |
| :-------------------- | :---------- | :--------- | :------------------------------------------------------------------------------------------------------ |
| `forceBlock`          | `boolean`   | `false`    | Çıktıyı bir blok düzeyinde öğe (örneğin `<div>`) içine sarılmaya zorlar.                                |
| `forceInline`         | `boolean`   | `false`    | Çıktıyı bir satır içi öğe (örneğin `<span>`) içine sarılmaya zorlar.                                    |
| `tagfilter`           | `boolean`   | `true`     | Tehlikeli HTML etiketlerini ayıklayarak güvenliği artırmak için GitHub Etiket Filtresini etkinleştirir. |
| `preserveFrontmatter` | `boolean`   | `false`    | `true` ise, Markdown dizesinin başındaki frontmatter ayıklanmaz.                                        |
| `components`          | `Overrides` | `{}`       | HTML etiketlerini özel bileşenlere eşleyen bir harita (örneğin, `{ h1: MyHeading }`).                   |
| `wrapper`             | `Component` | `null`     | Oluşturulan Markdown'ı sarmalamak için özel bir bileşen.                                                |
| `renderMarkdown`      | `Function`  | `null`     | Varsayılan Markdown derleyicisini tamamen değiştirmek için özel bir render fonksiyonu.                  |
