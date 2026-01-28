---
createdAt: 2026-01-20
updatedAt: 2026-01-22
title: Conteúdo HTML
description: Aprenda como declarar e usar conteúdo HTML com componentes personalizados no Intlayer. Siga esta documentação para incorporar conteúdo rico semelhante a HTML com substituição dinâmica de componentes no seu projeto internacionalizado.
keywords:
  - HTML
  - Custom Components
  - Rich Content
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
    changes: Adicionar HTMLRenderer / useHTMLRenderer / utilitário renderHTML
  - version: 8.0.0
    date: 2026-01-20
    changes: Adicionar suporte ao parsing de HTML
---

# Conteúdo HTML / HTML no Intlayer

O Intlayer suporta conteúdo HTML, permitindo que você incorpore conteúdo rico e estruturado dentro dos seus dicionários. Esse conteúdo pode ser renderizado com tags HTML padrão ou substituído por componentes personalizados em tempo de execução.

## Declarando Conteúdo HTML

Você pode declarar conteúdo HTML usando la função `html` ou simplesmente como uma string.

<Tabs>
  <Tab label="Envolvimento Manual" value="manual-wrapping">
    Use a função `html` para declarar explicitamente conteúdo HTML. Isso garante que as tags padrão sejam mapeadas corretamente mesmo se a detecção automática estiver desabilitada.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      content: {
        myHtmlContent: html("<p>Hello <strong>World</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="Detecção Automática" value="automatic-detection">
    Se a string contiver tags HTML comuns (por exemplo, `<p>`, `<div>`, `<strong>`, etc.), o Intlayer irá transformá-la automaticamente.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      content: {
        myHtmlContent: "<p>Olá <strong>Mundo</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="Arquivos Externos" value="external-files">
    Importe conteúdo HTML de arquivos. Note que atualmente a função `file()` retorna uma string, que será detectada automaticamente como HTML se contiver tags.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: html(file("./content.en.html")),
          fr: html(file("./content.fr.html")),
          pt: html(file("./content.pt.html")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

### O Nó `html()`

A função `html()` é um novo recurso no Intlayer v8 que permite definir explicitamente conteúdo HTML em seus dicionários. Embora o Intlayer possa frequentemente detectar automaticamente o conteúdo HTML, o uso da função `html()` oferece várias vantagens:

- **Segurança de Tipos**: A função `html()` permite definir as props esperadas para componentes personalizados, proporcionando melhor autocompletar e verificação de tipos em seu editor.
- **Declaração Explícita**: Garante que uma string seja sempre tratada como HTML, mesmo que não contenha tags HTML padrão que acionariam a detecção automática.
- **Definição de Componentes Personalizados**: Você pode passar um segundo argumento para `html()` para definir os componentes personalizados e seus tipos de props esperados.

```typescript
import { html } from "intlayer";

const myContent = html(
  "<MyCustomComponent title='Olá'>Mundo</MyCustomComponent>",
  {
    MyCustomComponent: {
      title: "string",
      children: "node",
    },
  }
);
```

Ao usar o método `.use()` em um nó HTML, os componentes que você fornecer serão verificados em relação à definição fornecida na função `html()` (se disponível).

---

## Renderização de HTML

A renderização pode ser feita automaticamente pelo sistema de conteúdo do Intlayer ou manualmente usando ferramentas especializadas.

### Renderização automática (usando `useIntlayer`)

Quando você acessa conteúdo via `useIntlayer`, os nós HTML já estão preparados para renderização.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    Os nós HTML podem ser renderizados diretamente como JSX. As tags padrão funcionam automaticamente.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    Use o método `.use()` para fornecer componentes personalizados ou sobrescrever tags:

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    No Vue, o conteúdo HTML pode ser renderizado usando o built-in `component`.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    Use `.use()` para sobrescrever:
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    O Svelte renderiza nós HTML como strings. Use `{@html}` para renderizá-los.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact suporta nós HTML diretamente no JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid suporta nós HTML diretamente no JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular utiliza a diretiva `[innerHTML]` para renderizar conteúdo HTML.

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

    Use o método `.use()` para fornecer componentes personalizados ou sobrescrever tags:

    ```typescript
    content().myHtmlContent.use({
      p: { class: "prose" },
      CustomLink: { href: "/details" },
    })
    ```

  </Tab>
</Tabs>

## Configuração Global com `HTMLProvider`

Você pode configurar a renderização de HTML globalmente para toda a sua aplicação. Isso é ideal para definir componentes personalizados que devem estar disponíveis em todo o conteúdo HTML.

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

### Renderização Manual e Ferramentas Avançadas

Se precisar renderizar strings HTML brutas ou tiver mais controlo sobre o mapeamento de componentes, use as seguintes ferramentas.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### Componente `<HTMLRenderer />`
    Renderize uma string HTML con componentes específicos.

    ```tsx
    import { HTMLRenderer } from "react-intlayer";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    Obtenha uma função de renderização pré-configurada.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hello <strong>World</strong></p>");
    ```

    #### Utilitário `renderHTML()`

    Utilitário independente para renderização fora de componentes.

    ```tsx
    import { renderHTML } from "react-intlayer";

    const jsx = renderHTML("<p>Hello</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue" value="vue">
   
    #### Componente `<HTMLRenderer />`
   
    ```vue
    <script setup>
    import { HTMLRenderer } from "vue-intlayer";
    </script>

    <template>
      <HTMLRenderer content="<p>Hello World</p>" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
  
    #### Componente `<HTMLRenderer />`
   
    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

    #### Hook `useHTMLRenderer()`

    ```svelte
    <script lang="ts">
    import { useHTMLRenderer } from "svelte-intlayer";
    const render = useHTMLRenderer();
    </script>

    {@html render("<p>Hello World</p>")}
    ```

    #### Utilitário `renderHTML()`

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer";
    </script>

    {@html renderHTML("<p>Hello World</p>")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
   
    #### Componente `<HTMLRenderer />`
   
    ```tsx
    import { HTMLRenderer } from "preact-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    ```tsx
    import { useHTMLRenderer } from "preact-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### Utilitário `renderHTML()`

    ```tsx
    import { renderHTML } from "preact-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
   
    #### Componente `<HTMLRenderer />`
   
    ```tsx
    import { HTMLRenderer } from "solid-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    ```tsx
    import { useHTMLRenderer } from "solid-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### Utilitário `renderHTML()`

    ```tsx
    import { renderHTML } from "solid-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Serviço `IntlayerMarkdownService`
    Renderize uma string HTML utilizando o serviço.

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

## Referência de Opções

Essas opções podem ser passadas para `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer` e `renderHTML`.

| Opção        | Tipo                  | Padrão | Descrição                                                                                                                       |
| :----------- | :-------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------ |
| `components` | `Record<string, any>` | `{}`   | Um mapa que associa tags HTML ou nomes de componentes personalizados aos componentes.                                           |
| `renderHTML` | `Function`            | `null` | Uma função de renderização personalizada para substituir completamente o parser HTML padrão (Apenas para providers Vue/Svelte). |

> Nota: Para React e Preact, as tags HTML padrão são fornecidas automaticamente. Você só precisa passar a prop `components` se quiser sobrescrevê-las ou adicionar componentes personalizados.
