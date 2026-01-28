---
createdAt: 2025-02-07
updatedAt: 2026-01-22
title: Markdown
description: Aprenda a declarar y usar contenido Markdown en su sitio web multilingüe con Intlayer. Siga los pasos de esta documentación en línea para integrar Markdown de manera fluida en su proyecto.
keywords:
  - Markdown
  - Internacionalización
  - Documentación
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
    changes: Agregar MarkdownRenderer / useMarkdownRenderer / utilidad renderMarkdown y opción forceInline
  - version: 8.0.0
    date: 2026-01-18
    changes: Decoración automática de contenido markdown, soporte para MDX y SSR
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicializar historial
---

# Markdown / Contenido de Texto Enriquecido

Intlayer admite contenido de texto enriquecido definido mediante la sintaxis Markdown. Esto le permite escribir y mantener fácilmente contenido con un formato enriquecido, como blogs, artículos y más.

## Parte 1: Declarar Contenido Markdown

Puede declarar contenido Markdown mediante la función `md` o simplemente como una cadena (si contiene sintaxis Markdown).

<Tabs>
  <Tab label="Envoltura Manual" value="manual-wrapping">
    Utilice la función `md` para declarar explícitamente contenido Markdown. Esto es útil si desea asegurarse de que una cadena se trate como Markdown incluso si no contiene una sintaxis obvia.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## My title \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="Detección Automática" value="automatic-detection">
    Si la cadena contiene indicadores comunes de Markdown (como encabezados, listas, enlaces, etc.), Intlayer la transformará automáticamente.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Habilitar la detección automática de contenido Markdown - Se puede configurar globalmente en intlayer.config.ts
      content: {
        myMarkdownContent: "## My title \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
  <Tab label="Archivos Externos" value="external-files">
    Importe archivos `.md` directamente mediante la función `file`.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          fr: md(file("./myMarkdown.fr.md")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## Parte 2: Renderizado de Markdown

El renderizado puede ser gestionado automáticamente por el sistema de contenido de Intlayer o manualmente mediante herramientas especializadas.

### 1. Renderizado Automático (usando `useIntlayer`)

Cuando accede al contenido a través de `useIntlayer`, los nodos Markdown ya están preparados para el renderizado.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    Los nodos Markdown se pueden renderizar directamente como JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

    También puede proporcionar sobrescrituras locales para nodos específicos mediante el método `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    En Vue, el contenido Markdown se puede renderizar mediante el componente integrado `component` o directamente como un nodo.

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
  <Tab label="Svelte" value="svelte">
    Svelte renderiza Markdown como una cadena HTML por defecto. Utilice `{@html}` para renderizarlo.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myMarkdownContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact admite nodos Markdown directamente en el JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid admite nodos Markdown directamente en el JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular utiliza la directiva `[innerHTML]` para renderizar contenido Markdown.

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

    También puede proporcionar sobrescrituras locales para nodos específicos mediante el método `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

  </Tab>
</Tabs>

### 2. Renderizado Manual y Herramientas Avanzadas

Si necesita renderizar cadenas de Markdown sin procesar o tener más control sobre el proceso de renderizado, utilice las siguientes herramientas.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    #### Componente `<MarkdownRenderer />`

    Renderiza una cadena Markdown con opciones específicas.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Obtenga una función de renderizado preconfigurada.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# My Title");
    ```

    #### Utilidad `renderMarkdown()`
    Utilidad independiente para renderizar fuera de los componentes.

    ```tsx
    import { renderMarkdown } from "react-intlayer";

    const jsx = renderMarkdown("# My Title", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### Componente `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# My Title" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### Componente `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer";
    </script>

    <MarkdownRenderer forceBlock={true} value="# My Title" />
    ```

    #### Hook `useMarkdownRenderer()`

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# My Title")}
    ```

    #### Utilidad `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer";
    </script>

    {@html renderMarkdown("# My Title")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### Componente `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# My Title")}</div>;
    ```

    #### Utilidad `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### Componente `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# My Title")}</div>;
    ```

    #### Utilidad `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Servicio `IntlayerMarkdownService`
    Renderiza una cadena Markdown mediante el servicio.

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

## Configuración Global con `MarkdownProvider`

Puede configurar el renderizado de Markdown de forma global para toda su aplicación. Esto evita pasar las mismas props a cada renderizador.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

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
  <Tab label="Vue" value="vue">

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
  <Tab label="Svelte" value="svelte">

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
  <Tab label="Preact" value="preact">

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
  <Tab label="Solid" value="solid">

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
  <Tab label="Angular" value="angular">

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

## Referencia de Opciones

Estas opciones se pueden pasar a `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer` y `renderMarkdown`.

| Opción                | Tipo        | Por Defecto | Descripción                                                                                                   |
| :-------------------- | :---------- | :---------- | :------------------------------------------------------------------------------------------------------------ |
| `forceBlock`          | `boolean`   | `false`     | Obliga a que la salida esté envuelta en un elemento de nivel de bloque (p. ej., `<div>`).                     |
| `forceInline`         | `boolean`   | `false`     | Obliga a que la salida esté envuelta en un elemento en línea (p. ej., `<span>`).                              |
| `tagfilter`           | `boolean`   | `true`      | Habilita el filtro de etiquetas de GitHub para mejorar la seguridad al eliminar etiquetas HTML peligrosas.    |
| `preserveFrontmatter` | `boolean`   | `false`     | Si es `true`, no se eliminará el frontmatter al principio de la cadena Markdown.                              |
| `components`          | `Overrides` | `{}`        | Un mapa de etiquetas HTML a componentes personalizados (p. ej., `{ h1: MyHeading }`).                         |
| `wrapper`             | `Component` | `null`      | Un componente personalizado para envolver el Markdown renderizado.                                            |
| `renderMarkdown`      | `Function`  | `null`      | Una función de renderizado personalizada para reemplazar completamente el compilador de Markdown por defecto. |
