---
createdAt: 2026-01-20
updatedAt: 2026-01-22
title: Contenido HTML
description: Aprende a declarar y utilizar contenido HTML con componentes personalizados en Intlayer. Sigue esta documentación para incrustar contenido enriquecido tipo HTML con reemplazo dinámico de componentes en tu proyecto internacionalizado.
keywords:
  - HTML
  - Componentes Personalizados
  - Contenido Enriquecido
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - concept
  - content
  - html
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Agregar HTMLRenderer / useHTMLRenderer / utilidad renderHTML
  - version: 8.0.0
    date: 2026-01-20
    changes: Agregar soporte para parsing HTML
---

# Contenido HTML / HTML en Intlayer

Intlayer admite contenido HTML, lo que permite incrustar contenido enriquecido y estructurado dentro de los diccionarios. Este contenido se puede renderizar con etiquetas HTML estándar o reemplazarse por componentes personalizados en tiempo de ejecución.

## Declarar contenido HTML

Puedes declarar contenido HTML mediante la función `html` o simplemente como una cadena de texto.

<Tabs>
  <Tab label="Envoltura Manual" value="manual-wrapping">
    Utiliza la función `html` para declarar explícitamente contenido HTML. Esto garantiza que las etiquetas estándar se mapeen correctamente incluso si la detección automática está desactivada.

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
  <Tab label="Detección Automática" value="automatic-detection">
    Si la cadena contiene etiquetas HTML comunes (por ejemplo, `<p>`, `<div>`, `<strong>`, etc.), Intlayer la transformará automáticamente.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      content: {
        myHtmlContent: "<p>Hello <strong>World</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="Archivos Externos" value="external-files">
    Importa contenido HTML desde archivos. Ten en cuenta que actualmente la función `file()` devuelve una cadena, que se detectará automáticamente como HTML si contiene etiquetas.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: html(file("./content.en.html")),
          fr: html(file("./content.fr.html")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## Renderizado de HTML

El renderizado puede ser gestionado automáticamente por el sistema de contenido de Intlayer o manualmente mediante herramientas especializadas.

### Renderizado Automático (usando `useIntlayer`)

Cuando accedes al contenido a través de `useIntlayer`, los nodos HTML ya están preparados para el renderizado.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    Los nodos HTML se pueden renderizar directamente como JSX. Las etiquetas estándar funcionan automáticamente.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    Utiliza el método `.use()` para proporcionar componentes personalizados o sobrescribir etiquetas:

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    En Vue, el contenido HTML se puede renderizar mediante el componente integrado `component`.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    Utiliza `.use()` para sobrescribir:
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte renderiza los nodos HTML como cadenas de texto. Utiliza `{@html}` para renderizarlo.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact admite nodos HTML directamente en el JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid admite nodos HTML directamente en el JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular utiliza la directiva `[innerHTML]` para renderizar contenido HTML.

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

    Utiliza el método `.use()` para proporcionar componentes personalizados o sobrescribir etiquetas:

    ```typescript
    content().myHtmlContent.use({
      p: { class: "prose" },
      CustomLink: { href: "/details" },
    })
    ```

  </Tab>
</Tabs>

## Configuración Global con `HTMLProvider`

Puedes configurar el renderizado de HTML de forma global para toda tu aplicación. Esto es ideal para definir componentes personalizados que deben estar disponibles en todo el contenido HTML.

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

### Renderizado Manual y Herramientas Avanzadas

Si necesitas renderizar cadenas de HTML sin procesar o tener más control sobre el mapeo de componentes, utiliza las siguientes herramientas.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### Componente `<HTMLRenderer />`
    Renderiza una cadena HTML con componentes específicos.

    ```tsx
    import { HTMLRenderer } from "react-intlayer";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    Obtén una función de renderizado preconfigurada.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hello <strong>World</strong></p>");
    ```

    #### Utilidad `renderHTML()`

    Utilidad independiente para renderizar fuera de los componentes.

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

    #### Utilidad `renderHTML()`

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

    #### Utilidad `renderHTML()`

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

    #### Utilidad `renderHTML()`

    ```tsx
    import { renderHTML } from "solid-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Servicio `IntlayerMarkdownService`
    Renderiza una cadena HTML utilizando el servicio.

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

## Referencia de Opciones

Estas opciones se pueden pasar a `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer` y `renderHTML`.

| Opción       | Tipo                  | Por Defecto | Descripción                                                                                                                                 |
| :----------- | :-------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `components` | `Record<string, any>` | `{}`        | Un mapa de etiquetas HTML o nombres de componentes personalizados a componentes.                                                            |
| `renderHTML` | `Function`            | `null`      | Una función de renderizado personalizada para reemplazar completamente el parser HTML predeterminado (Solo para proveedores de Vue/Svelte). |

> Nota: Para React y Preact, las etiquetas HTML estándar se proporcionan automáticamente. Solo necesitas pasar la prop `components` si deseas sobrescribirlas o agregar componentes personalizados.
