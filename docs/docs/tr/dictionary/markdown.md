---
createdAt: 2025-02-07
updatedAt: 2026-05-19
title: Markdown
description: Intlayer ile çok dilli web sitenizde Markdown içeriğini nasıl bildireceğinizi ve kullanacağınızı öğrenin. Projenize Markdown'ı sorunsuz bir şekilde entegre etmek için bu çevrimiçi belgelerdeki adımları izleyin.
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
  - version: 8.10.0
    date: 2026-05-19
    changes: "`.content.md` dosyaları için destek eklendi"
  - version: 8.5.0
    date: 2026-03-24
    changes: "`intlayerMarkdown` eklenti nesnesi eklendi; `app.use(installIntlayerMarkdown)` yerine `app.use(intlayerMarkdown)` kullanın"
  - version: 8.5.0
    date: 2026-03-24
    changes: "İçe aktarma işlemi `{{framework}}-intlayer` konumundan `{{framework}}-intlayer/markdown` konumuna taşındı"
  - version: 8.0.0
    date: 2026-01-22
    changes: "MarkdownRenderer / useMarkdownRenderer / renderMarkdown yardımcı programı ve forceInline seçeneği eklendi"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Markdown içeriğinin otomatik dekorasyonu, MDX ve SSR desteği"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
---

# Markdown / Zengin Metin İçeriği

Intlayer, Markdown sözdizimi kullanılarak tanımlanan zengin metin içeriğini destekler. Bu, bloglar, makaleler ve daha fazlası gibi zengin biçimlendirilmiş içerikleri kolayca yazmanıza ve sürdürmenize olanak tanır.

## Markdown İçeriğini Bildirme

Markdown içeriğini `md` işlevini kullanarak veya basitçe bir dize olarak (Markdown sözdizimi içeriyorsa) bildirebilirsiniz.

<Tabs>
  <Tab label=".content.md" value=".content.md">
    Sürüm `8.10.0`'dan itibaren Markdown içeriğini doğrudan `.content.md` dosyalarında bildirebilirsiniz. Intlayer, Markdown içeriğini otomatik olarak algılar ve ayrıştırır.

    ```md fileName="markdown-file.en.content.md"
    ---
    key: my-markdown-content
    description: İçeriğim
    locale: en
    ---

    # İçeriğim

    İşte bir markdown içerik örneği
    ```

    `locale` ön madde alanı, içeriğin yerel ayarını tanımlayan alandır. İsteğe bağlıdır. Sağlanmazsa, Intlayer varsayılan yerel ayarı kullanacaktır; bu, belirli bir yerel ayar için çeviri mevcut değilse aynı zamanda geri dönüş yerel ayarı olarak da kullanılır.

    Dosya yapısı örneği:

    ```text
    content/
    ├── en/
    │   └── markdown-file.en.content.md
    ├── fr/
    │   └── markdown-file.fr.content.md
    └── es/
        └── markdown-file.es.content.md
    ```

    Ön maddeye [Sözlük Tanımı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bölümünde tanımlanan özellikleri ekleyebilirsiniz.

  </Tab>
  <Tab label="Manuel Sarma" value="manual-wrapping">
    Markdown içeriğini açıkça bildirmek için `md` işlevini kullanın. Bu, belirgin bir sözdizimi içermese bile bir dizenin Markdown olarak ele alınmasını sağlamak istiyorsanız kullanışlıdır.

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
  <Tab label="Harici Dosyalar" value="external-files">
    `.md` dosyalarını doğrudan `file` işlevini kullanarak içe aktarın.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          tr: md(file("./myMarkdown.tr.md")),
        }),
      },
    };
    ```

  </Tab>

  <Tab label="Otomatik Algılama" value="automatic-detection">
    Dize ortak Markdown göstergeleri (başlıklar, listeler, bağlantılar vb.) içeriyorsa, Intlayer bunu otomatik olarak dönüştürecektir.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Markdown içeriğinin otomatik algılanmasını etkinleştir - intlayer.config.ts dosyasında global olarak ayarlanabilir
      content: {
        myMarkdownContent: "## Başlığım \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
</Tabs>

## Markdown'u İşleme (Rendering)

Intlayer, Markdown'ı işlemek için iki bağımsız yol sağlar:

1. **`useIntlayer` aracılığıyla**
   — Intlayer, `md` düğümünü çerçevenin yerel çıktısına (JSX, VNode, HTML dizesi) otomatik olarak dönüştürür.
   - Frontmatter ayrıştırılır ve `.metadata` olarak sunulur. İşlemeyi iki düzeyde geçersiz kılabilirsiniz — `MarkdownProvider` (veya çerçeve eşdeğeri) ile global olarak ve `.use()` ile düğüm başına yerel olarak. Her ikisi de birleştirilebilir; `.use()`, `MarkdownProvider`'dan önceliklidir ve o da varsayılandan önceliklidir.

2. **Yardımcı araçlar** — `<MarkdownRenderer />`, `useMarkdownRenderer()` ve `renderMarkdown()`, **yalnızca ham Markdown dizelerini** kabul eden bağımsız araçlardır. `useIntlayer`'dan bağımsızdırlar ve döndürdüğü süslenmiş düğümlerle çalışmazlar.

Markdown oluşturma **MDX**'i destekler — Markdown'ınızın içinde doğrudan adıyla herhangi bir JSX/çerçeve bileşenini kullanın.

### 1. Otomatik İşleme (`useIntlayer` aracılığıyla)

<Tabs group="framework">
  <Tab label="React" value="react">
    Markdown düğümleri doğrudan JSX olarak işlenebilir.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";
    import { MarkdownProvider } from "react-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");

      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // MDX Bileşeni
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > `MarkdownProvider` mevcut değilse, Intlayer varsayılan Markdown - JSX ayrıştırıcısını kullanarak markdown'ı oluşturacaktır.

    Ayrıca `.use()` yöntemini kullanarak belirli düğümler için yerel geçersiz kılmalar sağlayabilirsiniz:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Markdown'ı bir dize olarak alabilirsiniz:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Ve markdown meta verilerinize şu şekilde erişebilirsiniz:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    Markdown düğümleri doğrudan JSX olarak işlenebilir.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "next-intlayer";
    import { MarkdownProvider } from "next-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");

      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // MDX Bileşeni
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > `MarkdownProvider` mevcut değilse, Intlayer varsayılan Markdown - JSX ayrıştırıcısını kullanarak markdown'ı oluşturacaktır.

    Ayrıca `.use()` yöntemini kullanarak belirli düğümler için yerel geçersiz kılmalar sağlayabilirsiniz:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Markdown'ı bir dize olarak alabilirsiniz:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Ve markdown meta verilerinize şu şekilde erişebilirsiniz:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    Vue'da, Markdown içeriği yerleşik `component` etiketi kullanılarak veya doğrudan bir düğüm olarak oluşturulabilir.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

    `intlayerMarkdown` eklentisi aracılığıyla global olarak yapılandırın (MDX özel bileşenlerini destekler):

    ```ts fileName="main.ts"
    import { intlayerMarkdown } from "vue-intlayer/markdown";

    app.use(intlayerMarkdown, {
      components: {
        h1: (props) => h('h1', { style: { color: 'green' } }, props.children),
        MyButton: (props) => h('button', props), // MDX Bileşeni
      },
    });
    ```

    > `intlayerMarkdown` eklentisi yüklü değilse, Intlayer varsayılan derleyiciyi kullanarak oluşturacaktır.

    Ayrıca `.use()` yöntemini kullanarak belirli düğümler için yerel geçersiz kılmalar sağlayabilirsiniz:

    ```vue
    <component :is="myMarkdownContent.use({
      h1: (props) => h('h1', { style: { color: 'red' } }, props.children),
    })" />
    ```

    Markdown'ı bir dize olarak alabilirsiniz:

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    Ve markdown meta verilerinize şu şekilde erişebilirsiniz:

    ```vue
    <component :is="myMarkdownContent.metadata" />
    <component :is="myMarkdownContent.metadata.title" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte, Markdown'ı varsayılan olarak bir HTML dizesi olarak oluşturur. Oluşturmak için `{@html}` kullanın.

    ```svelte fileName="App.svelte"
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    import { MarkdownProvider } from "svelte-intlayer/markdown";
    import MyHeading from "./MyHeading.svelte";

    const content = useIntlayer("app");
    </script>

    <MarkdownProvider components={{ h1: MyHeading }}>
      {@html $content.myMarkdownContent}
    </MarkdownProvider>
    ```

    > `MarkdownProvider` mevcut değilse, Intlayer varsayılan derleyiciyi kullanarak markdown'ı oluşturacaktır.

    Ayrıca `.use()` yöntemini kullanarak belirli düğümler için yerel geçersiz kılmalar sağlayabilirsiniz:

    ```svelte
    {@html $content.myMarkdownContent.use({ ... })}
    ```

    Markdown'ı bir dize olarak alabilirsiniz:

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    Ve markdown meta verilerinize şu şekilde erişebilirsiniz:

    ```svelte
    {$content.myMarkdownContent.metadata}
    {$content.myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact, JSX'teki Markdown düğümlerini doğrudan destekler.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";
    import { MarkdownProvider } from "preact-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // MDX Bileşeni
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > `MarkdownProvider` mevcut değilse, Intlayer varsayılan Markdown - JSX ayrıştırıcısını kullanarak markdown'ı oluşturacaktır.

    Ayrıca `.use()` yöntemini kullanarak belirli düğümler için yerel geçersiz kılmalar sağlayabilirsiniz:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Markdown'ı bir dize olarak alabilirsiniz:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Ve markdown meta verilerinize şu şekilde erişebilirsiniz:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid, JSX'teki Markdown düğümlerini doğrudan destekler.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";
    import { MarkdownProvider } from "solid-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
          MyButton: (props) => <button {...props} />, // MDX Bileşeni
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > `MarkdownProvider` mevcut değilse, Intlayer varsayılan Markdown - JSX ayrıştırıcısını kullanarak markdown'ı oluşturacaktır.

    Ayrıca `.use()` yöntemini kullanarak belirli düğümler için yerel geçersiz kılmalar sağlayabilirsiniz:

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    Markdown'ı bir dize olarak alabilirsiniz:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Ve markdown meta verilerinize şu şekilde erişebilirsiniz:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular, Markdown içeriğini oluşturmak için `[innerHTML]` yönergesini kullanır.

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

    > IntlayerMarkdown sağlayıcısı yapılandırılmamışsa, Intlayer varsayılan derleyiciyi kullanarak oluşturacaktır.

    Ayrıca `.use()` yöntemini kullanarak belirli düğümler için yerel geçersiz kılmalar sağlayabilirsiniz:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

    Markdown'ı bir dize olarak alabilirsiniz:

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    Ve markdown meta verilerinize şu şekilde erişebilirsiniz:

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. Yardımcı Araçlar (Yalnızca Markdown Dizeleri)

Bu yardımcı programlar **yalnızca ham Markdown dizelerini** oluşturur ve `useIntlayer`'dan bağımsızdır. Markdown'ı sözlükleriniz dışındaki kaynaklardan oluşturmanız gerektiğinde bunları kullanın.

<Tabs group="framework">
  <Tab label="React" value="react">
  
    #### `<MarkdownRenderer />` Bileşeni

    Belirli seçeneklerle bir Markdown dizesini oluşturur.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Başlığım"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Kancası

    Önceden yapılandırılmış bir oluşturucu işlevi alın.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Başlığım");
    ```

    #### `renderMarkdown()` Yardımcı Programı
    Bileşenler dışında oluşturmak için bağımsız yardımcı program.

    ```tsx
    import { renderMarkdown } from "react-intlayer/markdown";

    const jsx = renderMarkdown("# Başlığım", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
  
    #### `<MarkdownRenderer />` Bileşeni

    Belirli seçeneklerle bir Markdown dizesini oluşturur.

    ```tsx
    import { MarkdownRenderer } from "next-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Başlığım"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Kancası

    Önceden yapılandırılmış bir oluşturucu işlevi alın.

    ```tsx
    import { useMarkdownRenderer } from "next-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Başlığım");
    ```

    #### `renderMarkdown()` Yardımcı Programı
    Bileşenler dışında oluşturmak için bağımsız yardımcı program.

    ```tsx
    import { renderMarkdown } from "next-intlayer/markdown";

    const jsx = renderMarkdown("# Başlığım", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### `<MarkdownRenderer />` Bileşeni

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer/markdown";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# Başlığım" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### `<MarkdownRenderer />` Bileşeni

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer/markdown";
    </script>

    <MarkdownRenderer forceBlock={true} value="# Başlığım" />
    ```

    #### `useMarkdownRenderer()` Kancası

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer/markdown";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# Başlığım")}
    ```

    #### `renderMarkdown()` Yardımcı Programı

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer/markdown";
    </script>

    {@html renderMarkdown("# Başlığım")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### `<MarkdownRenderer />` Bileşeni

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Başlığım"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Kancası

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Başlığım")}</div>;
    ```

    #### `renderMarkdown()` Yardımcı Programı

    ```tsx
    import { renderMarkdown } from "preact-intlayer/markdown";

    return <div>{renderMarkdown("# Başlığım")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### `<MarkdownRenderer />` Bileşeni

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Başlığım"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Kancası

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Başlığım")}</div>;
    ```

    #### `renderMarkdown()` Yardımcı Programı

    ```tsx
    import { renderMarkdown } from "solid-intlayer/markdown";

    return <div>{renderMarkdown("# Başlığım")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### `IntlayerMarkdownService` Hizmeti
    Hizmeti kullanarak bir Markdown dizesini oluşturur.

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer/markdown";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderMarkdown(markdown: string) {
        return this.markdownService.renderMarkdown(markdown);
      }
    }
    ```

  </Tab>
</Tabs>

## `MarkdownProvider` ile Global Yapılandırma

`MarkdownProvider` (veya çerçeve eşdeğeri), tüm uygulamanız için Markdown oluşturma işlem hattını yapılandırır. Bu hem otomatik `useIntlayer` oluşturma işlemleri hem de yardımcı araçlar için geçerlidir. Burada ayarlanan seçenekler varsayılanlardır — `.use()` bunları düğüm düzeyinde geçersiz kılar.

<Tabs group="framework">
  <Tab label="React" value="react">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 style={{color: 'green'}} {...props} />,
          a: ({ href, ...props }) => <a style={{color: 'red'}} {...props} />,
          MyCustomJSXComponent: (props) => <span style={{color: 'red'}} {...props} />,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```


    > MDX desteklenir — Markdown'ınızın içinde kullanılan herhangi bir bileşen adı (örn. `<MyCustomJSXComponent />`) `components` haritasına göre çözümlenir.

    Kendi markdown oluşturucunuzu da kullanabilirsiniz:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          // Use dynamic import to reduce the bundle size of your application
          const { renderMarkdown } = await import('react-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Markdown oluşturucunuzu dinamik olarak içe aktarmak, uygulamanızın paket boyutunu azaltmanın harika bir yoludur.

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "next-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 style={{color: 'green'}} {...props} />,
          a: ({ href, ...props }) => <a style={{color: 'red'}} {...props} />,
          MyCustomJSXComponent: (props) => <span style={{color: 'red'}} {...props} />,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```


    > MDX desteklenir — Markdown'ınızın içinde kullanılan herhangi bir bileşen adı (örn. `<MyCustomJSXComponent />`) `components` haritasına göre çözümlenir.

    Kendi markdown oluşturucunuzu da kullanabilirsiniz:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "next-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          // Use dynamic import to reduce the bundle size of your application
          const { renderMarkdown } = await import('next-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Markdown oluşturucunuzu dinamik olarak içe aktarmak, uygulamanızın paket boyutunu azaltmanın harika bir yoludur.

  </Tab>
  <Tab label="Vue" value="vue">

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerMarkdown } from "vue-intlayer/markdown";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerMarkdown, {
      components: {
        h1: (props) =>
        h('h1', { style: { color: 'orange' }, ...props }, props.children),
        ComponentDemo: () => h('div', { style: { background: 'grey' } }, 'DEMO'),
        bold: (props) => h('strong', props),
        code: (props) => h('code', props),
      },
    });

    app.mount("#app");
    ```


    > MDX desteklenir — Markdown'ınızın içinde kullanılan herhangi bir bileşen adı (örn. `<MyCustomJSXComponent />`) `components` haritasına göre çözümlenir.

    Kendi markdown oluşturucunuzu da kullanabilirsiniz:

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerMarkdown } from "vue-intlayer/markdown";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerMarkdown, {
      renderMarkdown: async (md) => {
        const { renderMarkdown } = await import('vue-intlayer/markdown');
        return renderMarkdown(md);
      },
    });

    app.mount("#app");
    ```

    > Markdown oluşturucunuzu dinamik olarak içe aktarmak, uygulamanızın paket boyutunu azaltmanın harika bir yoludur.

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer/markdown";
      import MyHeading from "./MyHeading.svelte";
    </script>

    <MarkdownProvider
      components={{
        h1: MyHeading,
      }}
    >
      <slot />
    </MarkdownProvider>
    ```


    > MDX desteklenir — Markdown'ınızın içinde kullanılan herhangi bir bileşen adı (örn. `<MyCustomJSXComponent />`) `components` haritasına göre çözümlenir.

    Kendi markdown oluşturucunuzu da kullanabilirsiniz:

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer/markdown";
    </script>

    <MarkdownProvider
      renderMarkdown={async (md) => {
        const { renderMarkdown } = await import('svelte-intlayer/markdown');
        return renderMarkdown(md);
      }}
    >
      <slot />
    </MarkdownProvider>
    ```

    > Markdown oluşturucunuzu dinamik olarak içe aktarmak, uygulamanızın paket boyutunu azaltmanın harika bir yoludur.

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```


    > MDX desteklenir — Markdown'ınızın içinde kullanılan herhangi bir bileşen adı (örn. `<MyCustomJSXComponent />`) `components` haritasına göre çözümlenir.

    Kendi markdown oluşturucunuzu da kullanabilirsiniz:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          const { renderMarkdown } = await import('preact-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Markdown oluşturucunuzu dinamik olarak içe aktarmak, uygulamanızın paket boyutunu azaltmanın harika bir yoludur.

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer/markdown";

    export const AppProvider = (props) => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 className="text-2xl font-bold">{props.children}</h1>,
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```


    > MDX desteklenir — Markdown'ınızın içinde kullanılan herhangi bir bileşen adı (örn. `<MyCustomJSXComponent />`) `components` haritasına göre çözümlenir.

    Kendi markdown oluşturucunuzu da kullanabilirsiniz:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer/markdown";

    export const AppProvider = (props) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          const { renderMarkdown } = await import('solid-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```

    > Markdown oluşturucunuzu dinamik olarak içe aktarmak, uygulamanızın paket boyutunu azaltmanın harika bir yoludur.

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.module.ts"
    import { NgModule } from '@angular/core';
    import { IntlayerMarkdownModule } from 'angular-intlayer/markdown';

    @NgModule({
      imports: [
        IntlayerMarkdownModule.forRoot({
          renderMarkdown: async (md) => {
            const { renderMarkdown } = await import('angular-intlayer/markdown');
            return renderMarkdown(md);
          }
        })
      ]
    })
    export class AppModule {}
    ```

    > Markdown oluşturucunuzu dinamik olarak içe aktarmak, uygulamanızın paket boyutunu azaltmanın harika bir yoludur.

  </Tab>
</Tabs>

## Suspense

Intlayer Markdown oluşturucu dinamik olarak yüklenir. Optimize edilmiş olmasına rağmen, temel ayrıştırıcı parçası yaklaşık 55 kb'dir. Bunu senkron olarak yüklemek, ilk sayfa oluşturulmasını geciktirir ve First Contentful Paint'i (FCP) bozar.

UI engellemesini önlemek için, Intlayer React'in Suspense API'si ile entegre olur. Arka planda ayrıştırıcıyı getirir ve indirme sırasında bir Promise fırlatır.

Intlayer Markdown'ı oluşturan herhangi bir bileşeni bir `<Suspense>` sınırına sarın. Bu, parça indirilirken yerelleştirilmiş bir geri dönüş durumunu göstererek DOM'nizin geri kalanının anında oluşturulmasına izin verir.

Uyarı: Bir `<Suspense>` sınırı sağlamazsanız, React 55 kb'lik parça tam olarak yüklenene kadar kök seviyesinde askıya alınır veya tüm bileşen ağacının oluşturulmasını engeller.

<Tabs>
  <Tab label="Next.js" value="nextjs">

Next.js App Router'da, istemci bileşenleri için React `Suspense`'i veya sunucu bileşenleri için bir `loading.tsx` dosyası kullanabilirsiniz.

**İstemci Bileşeni:**

```tsx fileName="components/MyComponent.tsx"
"use client";
import { useIntlayer } from "next-intlayer";
import { Suspense } from "react";

const MyComponent = () => {
  const markdownContent = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

**`loading.tsx` ile Sunucu Bileşeni:**

```tsx fileName="app/loading.tsx"
export default function Loading() {
  return <div>Loading...</div>;
}
```

```tsx fileName="app/page.tsx"
import { useIntlayer } from "next-intlayer/server";

const MyPage = () => {
  const markdownContent = useIntlayer("my-markdown");
  return <div>{markdownContent}</div>;
};

export default MyPage;
```

  </Tab>

  <Tab label="React" value="react">

```tsx
import { useIntlayer } from "react-intlayer";
import { Suspense } from "react";

const MyComponent = () => {
  const markdownContent = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

  </Tab>
 
  <Tab label="Vue" value="vue">

Vue, yerleşik bir `<Suspense>` bileşenine sahiptir. Markdown içeriğini oluşturan bileşeni bir `<Suspense>` sınırına sarın.

```vue fileName="MyComponent.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { markdownContent } = useIntlayer("my-markdown");
</script>

<template>
  <Suspense>
    <component :is="markdownContent" />
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Svelte'nin bir Suspense API eşdeğeri yoktur. Markdown içeriğinin asenkron olarak oluşturulmasını işlemek için bir `{#await}` bloğu kullanın.

```svelte fileName="MyComponent.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my-markdown");
</script>

{#await $content.markdownContent}
  <div>Loading...</div>
{:then rendered}
  {@html rendered}
{/await}
```

  </Tab>
  <Tab label="Preact" value="preact">

Preact, `preact/compat` aracılığıyla React'in Suspense API'sini destekler.

```tsx fileName="MyComponent.tsx"
import { useIntlayer } from "preact-intlayer";
import { Suspense } from "preact/compat";

const MyComponent = () => {
  const markdownContent = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

  </Tab>
  <Tab label="Solid" value="solid">

Solid, `solid-js`'den kendi `<Suspense>` bileşenine sahiptir.

```tsx fileName="MyComponent.tsx"
import { useIntlayer } from "solid-intlayer";
import { Suspense } from "solid-js";

const MyComponent = () => {
  const { markdownContent } = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

  </Tab>
  <Tab label="Angular" value="angular">

Angular'da bir Suspense API'si yoktur. Geç yüklenen Markdown içeriğini işlemek için Angular'ın ertelenebilir görünümlerini (`@defer`) kullanın (Angular 17+ gerektirir).

```typescript fileName="my.component.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-my",
  template: `
    @defer {
      <div [innerHTML]="content().markdownContent"></div>
    } @loading {
      <div>Loading...</div>
    }
  `,
})
export class MyComponent {
  content = useIntlayer("my-markdown");
}
```

  </Tab>
</Tabs>

---

## Seçenek Referansı

Bu seçenekler `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer` ve `renderMarkdown`a iletilebilir.

| Option                | Type        | Default | Açıklama                                                                                               |
| :-------------------- | :---------- | :------ | :----------------------------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false` | Çıktının bir blok düzeyinde öğeye (örn. `<div>`) sarılmasını zorlar.                                   |
| `forceInline`         | `boolean`   | `false` | Çıktının bir satır içi öğeye (örn. `<span>`) sarılmasını zorlar.                                       |
| `tagfilter`           | `boolean`   | `true`  | Tehlikeli HTML etiketlerini kaldırarak güvenliği artırmak için GitHub Etiket Filtresini etkinleştirir. |
| `preserveFrontmatter` | `boolean`   | `false` | `true` ise, Markdown dizesinin başındaki frontmatter kaldırılmaz.                                      |
| `components`          | `Overrides` | `{}`    | HTML etiketlerinden özel bileşenlere bir eşleme (örn. `{ h1: MyHeading }`).                            |
| `wrapper`             | `Component` | `null`  | Oluşturulan Markdown'u sarmak için özel bir bileşen.                                                   |
| `renderMarkdown`      | `Function`  | `null`  | Varsayılan Markdown derleyicisini tamamen değiştirmek için özel bir oluşturma işlevi.                  |
