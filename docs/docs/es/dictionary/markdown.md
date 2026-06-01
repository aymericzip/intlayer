---
createdAt: 2025-02-07
updatedAt: 2026-05-19
title: Markdown
description: Aprenda cómo declarar y usar contenido Markdown en su sitio web multilingüe con Intlayer. Siga los pasos de esta documentación en línea para integrar Markdown sin problemas en su proyecto.
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
  - version: 8.11.0
    date: 2026-05-28
    changes: "Permitir el preanálisis del AST de Markdown para SSR / hidratación"
  - version: 8.10.0
    date: 2026-05-19
    changes: "Se agregó soporte para archivos `.content.md`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Se agregó el objeto plugin `intlayerMarkdown`; use `app.use(intlayerMarkdown)` en lugar de `app.use(installIntlayerMarkdown)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Se movió la importación de `{{framework}}-intlayer` a `{{framework}}-intlayer/markdown`"
  - version: 8.0.0
    date: 2026-01-22
    changes: "Se agregó la utilidad MarkdownRenderer / useMarkdownRenderer / renderMarkdown y la opción forceInline"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Decoración automática de contenido markdown, soporte para MDX y SSR"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historial inicializado"
---

# Markdown / Contenido de Texto Enriquecido

Intlayer admite contenido de texto enriquecido definido mediante la sintaxis Markdown. Esto le permite escribir y mantener fácilmente contenido con formato enriquecido, como blogs, artículos y mucho más.

## Declarar Contenido Markdown

Puede declarar contenido Markdown usando la función `md` o simplemente como una cadena de texto (si contiene sintaxis Markdown).

<Tabs>
  <Tab label=".content.md" value=".content.md">
    A partir de la versión `8.10.0`, puede declarar contenido Markdown directamente en archivos `.content.md`. Intlayer detectará y analizará automáticamente el contenido Markdown.

    ```md fileName="markdown-file.en.content.md"
    ---
    key: my-markdown-content
    description: Mi contenido
    locale: en
    ---

    # Mi contenido

    Aquí hay un ejemplo de contenido markdown
    ```

    El campo `locale` en el front-matter es el campo que define el idioma del contenido. Es opcional. Si no se proporciona, Intlayer utilizará el idioma por defecto, que también se usa como idioma de respaldo si no hay traducción disponible para un idioma específico.

    Ejemplo de estructura de archivos:

    ```text
    content
    ├── markdown-file.en.content.md
    ├── markdown-file.fr.content.md
    └── markdown-file.es.content.md
    ```

    Puede agregar en el front-matter cualquier propiedad definida en la [Definición del Diccionario](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md)

  </Tab>
  <Tab label="Envoltura Manual" value="manual-wrapping">
    Use la función `md` para declarar explícitamente contenido Markdown. Esto es útil si desea asegurarse de que una cadena se trate como Markdown incluso si no contiene sintaxis evidente.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## Mi título \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="Archivos Externos" value="external-files">
    Importe archivos `.md` directamente usando la función `file`.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          es: md(file("./myMarkdown.es.md")),
        }),
      },
    };
    ```

  </Tab>

  <Tab label="Detección Automática" value="automatic-detection">
    Si la cadena contiene indicadores comunes de Markdown (como encabezados, listas, enlaces, etc.), Intlayer la transformará automáticamente.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Habilitar detección automática de contenido Markdown - Se puede configurar globalmente en intlayer.config.ts
      content: {
        myMarkdownContent: "## Mi título \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
</Tabs>

## Renderización de Markdown

Intlayer proporciona dos formas independientes de renderizar Markdown:

1. **A través de `useIntlayer`**
   — Intlayer transforma automáticamente el nodo `md` en la salida nativa del framework (JSX, VNode, cadena HTML).
   - El Frontmatter se analiza y expone como `.metadata`. Puede anular la renderización en dos niveles — globalmente con `MarkdownProvider` (o el equivalente en el framework) y localmente por nodo con `.use()`. Ambos pueden combinarse; `.use()` tiene prioridad sobre `MarkdownProvider`, el cual tiene prioridad sobre el predeterminado.

2. **Utilidades auxiliares** — `<MarkdownRenderer />`, `useMarkdownRenderer()`, y `renderMarkdown()` son herramientas independientes que aceptan **únicamente cadenas Markdown puras**. Son independientes de `useIntlayer` y no funcionan con los nodos decorados que este retorna.

La renderización de Markdown admite **MDX** — use cualquier componente JSX/framework por su nombre directamente dentro de su Markdown.

### 1. Renderización Automática (a través de `useIntlayer`)

<Tabs group="framework">
  <Tab label="React" value="react">
    Los nodos Markdown se pueden renderizar directamente como JSX.

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
          MyButton: (props) => <button {...props} />, // Componente MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Si `MarkdownProvider` no está presente, Intlayer renderizará el markdown usando el analizador por defecto de Markdown a JSX.

    También puede proporcionar anulaciones locales para nodos específicos utilizando el método `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Puede recuperar el Markdown como cadena:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Y puede acceder a los metadatos de su markdown así:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    Los nodos Markdown se pueden renderizar directamente como JSX.

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
          MyButton: (props) => <button {...props} />, // Componente MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Si `MarkdownProvider` no está presente, Intlayer renderizará el markdown usando el analizador por defecto de Markdown a JSX.

    También puede proporcionar anulaciones locales para nodos específicos utilizando el método `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Puede recuperar el Markdown como cadena:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Y puede acceder a los metadatos de su markdown así:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    En Vue, el contenido Markdown se puede renderizar usando la etiqueta incorporada `component` o directamente como un nodo.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

    Configure globalmente a través del plugin `intlayerMarkdown` (admite componentes MDX personalizados):

    ```ts fileName="main.ts"
    import { intlayerMarkdown } from "vue-intlayer/markdown";

    app.use(intlayerMarkdown, {
      components: {
        h1: (props) => h('h1', { style: { color: 'green' } }, props.children),
        MyButton: (props) => h('button', props), // Componente MDX
      },
    });
    ```

    > Si el plugin `intlayerMarkdown` no está instalado, Intlayer renderizará utilizando el compilador predeterminado.

    También puede proporcionar anulaciones locales para nodos específicos usando el método `.use()`:

    ```vue
    <component :is="myMarkdownContent.use({
      h1: (props) => h('h1', { style: { color: 'red' } }, props.children),
    })" />
    ```

    Puede recuperar el Markdown como cadena:

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    Y puede acceder a los metadatos de su markdown así:

    ```vue
    <component :is="myMarkdownContent.metadata" />
    <component :is="myMarkdownContent.metadata.title" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte renderiza el Markdown como una cadena HTML por defecto. Use `{@html}` para renderizarlo.

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

    > Si `MarkdownProvider` no está presente, Intlayer renderizará el markdown usando el compilador por defecto.

    También puede proporcionar anulaciones locales para nodos específicos usando el método `.use()`:

    ```svelte
    {@html $content.myMarkdownContent.use({ ... })}
    ```

    Puede recuperar el Markdown como cadena:

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    Y puede acceder a los metadatos de su markdown así:

    ```svelte
    {$content.myMarkdownContent.metadata}
    {$content.myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact soporta los nodos Markdown directamente en JSX.

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
          MyButton: (props) => <button {...props} />, // Componente MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Si `MarkdownProvider` no está presente, Intlayer renderizará el markdown usando el analizador predeterminado de Markdown a JSX.

    También puede proporcionar anulaciones locales para nodos específicos usando el método `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Puede recuperar el Markdown como cadena:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Y puede acceder a los metadatos de su markdown así:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid soporta los nodos Markdown directamente en JSX.

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
          MyButton: (props) => <button {...props} />, // Componente MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Si `MarkdownProvider` no está presente, Intlayer renderizará el markdown usando el analizador predeterminado de Markdown a JSX.

    También puede proporcionar anulaciones locales para nodos específicos usando el método `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    Puede recuperar el Markdown como cadena:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Y puede acceder a los metadatos de su markdown así:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
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

    > Si el proveedor IntlayerMarkdown no está configurado, Intlayer renderizará utilizando el compilador predeterminado.

    También puede proporcionar anulaciones locales para nodos específicos usando el método `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

    Puede recuperar el Markdown como cadena:

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    Y puede acceder a los metadatos de su markdown así:

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. Utilidades Auxiliares (Solo Cadenas Markdown)

Estas utilidades renderizan **únicamente cadenas Markdown puras** y son independientes de `useIntlayer`. Úselas cuando necesite renderizar Markdown de fuentes que no sean sus diccionarios.

<Tabs group="framework">
  <Tab label="React" value="react">
  
    #### Componente `<MarkdownRenderer />`

    Renderiza una cadena Markdown con opciones específicas.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Mi Título"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Obtenga una función de renderizado preconfigurada.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Mi Título");
    ```

    #### Utilidad `renderMarkdown()`
    Utilidad independiente para renderizar fuera de los componentes.

    ```tsx
    import { renderMarkdown } from "react-intlayer/markdown";

    const jsx = renderMarkdown("# Mi Título", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
  
    #### Componente `<MarkdownRenderer />`

    Renderiza una cadena Markdown con opciones específicas.

    ```tsx
    import { MarkdownRenderer } from "next-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Mi Título"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Obtenga una función de renderizado preconfigurada.

    ```tsx
    import { useMarkdownRenderer } from "next-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Mi Título");
    ```

    #### Utilidad `renderMarkdown()`
    Utilidad independiente para renderizar fuera de los componentes.

    ```tsx
    import { renderMarkdown } from "next-intlayer/markdown";

    const jsx = renderMarkdown("# Mi Título", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### Componente `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer/markdown";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# Mi Título" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### Componente `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer/markdown";
    </script>

    <MarkdownRenderer forceBlock={true} value="# Mi Título" />
    ```

    #### Hook `useMarkdownRenderer()`

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer/markdown";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# Mi Título")}
    ```

    #### Utilidad `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer/markdown";
    </script>

    {@html renderMarkdown("# Mi Título")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### Componente `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Mi Título"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Mi Título")}</div>;
    ```

    #### Utilidad `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer/markdown";

    return <div>{renderMarkdown("# Mi Título")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### Componente `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Mi Título"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Mi Título")}</div>;
    ```

    #### Utilidad `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer/markdown";

    return <div>{renderMarkdown("# Mi Título")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Servicio `IntlayerMarkdownService`
    Renderiza una cadena Markdown usando el servicio.

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

## Configuración Global con `MarkdownProvider`

`MarkdownProvider` (o su equivalente en el framework) configura el proceso de renderización Markdown para toda su aplicación. Esto se aplica tanto a la renderización automática de `useIntlayer` como a las utilidades auxiliares. Las opciones configuradas aquí son las predeterminadas — `.use()` las anula a nivel de nodo.

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


    > MDX es compatible — cualquier nombre de componente usado dentro de su Markdown (ej. `<MyCustomJSXComponent />`) se resuelve contra el mapeo de `components`.

    También puede usar su propio renderizador de markdown:

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

    > Importar su renderizador de Markdown dinámicamente es una buena manera de reducir el tamaño del bundle de su aplicación.

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


    > MDX es compatible — cualquier nombre de componente usado dentro de su Markdown (ej. `<MyCustomJSXComponent />`) se resuelve contra el mapeo de `components`.

    También puede usar su propio renderizador de markdown:

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

    > Importar su renderizador de Markdown dinámicamente es una buena manera de reducir el tamaño del bundle de su aplicación.

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


    > MDX es compatible — cualquier nombre de componente usado dentro de su Markdown (ej. `<MyCustomJSXComponent />`) se resuelve contra el mapeo de `components`.

    También puede usar su propio renderizador de markdown:

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

    > Importar su renderizador de Markdown dinámicamente es una buena manera de reducir el tamaño del bundle de su aplicación.

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


    > MDX es compatible — cualquier nombre de componente usado dentro de su Markdown (ej. `<MyCustomJSXComponent />`) se resuelve contra el mapeo de `components`.

    También puede usar su propio renderizador de markdown:

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

    > Importar su renderizador de Markdown dinámicamente es una buena manera de reducir el tamaño del bundle de su aplicación.

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


    > MDX es compatible — cualquier nombre de componente usado dentro de su Markdown (ej. `<MyCustomJSXComponent />`) se resuelve contra el mapeo de `components`.

    También puede usar su propio renderizador de markdown:

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

    > Importar su renderizador de Markdown dinámicamente es una buena manera de reducir el tamaño del bundle de su aplicación.

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


    > MDX es compatible — cualquier nombre de componente usado dentro de su Markdown (ej. `<MyCustomJSXComponent />`) se resuelve contra el mapeo de `components`.

    También puede usar su propio renderizador de markdown:

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

    > Importar su renderizador de Markdown dinámicamente es una buena manera de reducir el tamaño del bundle de su aplicación.

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

    > Importar su renderizador de Markdown dinámicamente es una buena manera de reducir el tamaño del bundle de su aplicación.

  </Tab>
</Tabs>

## Suspense

El renderizador de Markdown de Intlayer se carga dinámicamente. Aunque está optimizado, el fragmento (chunk) del analizador subyacente es de aproximadamente 55 kb. Cargar esto sincrónicamente retrasa la representación inicial de la página y degrada el First Contentful Paint (FCP).

Para evitar el bloqueo de la interfaz de usuario, Intlayer se integra con la API Suspense de React. Recupera el analizador en segundo plano y arroja una Promesa durante la descarga.

Envuelva cualquier componente que represente Intlayer Markdown en un límite `<Suspense>`. Esto muestra un estado de retroceso localizado mientras se descarga el fragmento, permitiendo que el resto de su DOM se represente de inmediato.

Advertencia: Si no proporciona un límite `<Suspense>`, React suspenderá en el nivel raíz o bloqueará la representación de todo el árbol de componentes hasta que el fragmento de 55 kb esté completamente cargado.

<Tabs>
  <Tab label="Next.js" value="nextjs">

En Next.js App Router, puede usar React `Suspense` para componentes del cliente o un archivo `loading.tsx` para componentes del servidor.

**Componente de cliente:**

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

**Componente de servidor con `loading.tsx`:**

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

Vue tiene un componente `<Suspense>` incorporado. Envuelva el componente que representa contenido Markdown en un límite `<Suspense>`.

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

Svelte no tiene un equivalente a la API Suspense. Utilice un bloque `{#await}` para manejar la representación asíncrona del contenido Markdown.

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

Preact admite la API Suspense de React a través de `preact/compat`.

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

Solid tiene su propio componente `<Suspense>` de `solid-js`.

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

Angular no tiene una API Suspense. Utilice las vistas diferibles de Angular (`@defer`) para manejar contenido Markdown cargado de forma diferida (requiere Angular 17+).

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

## Renderizado en el Lado del Servidor (SSR) e Hidratación

En comparación con otros analizadores de Markdown como remark / rehype, Intlayer Markdown no tiene dependencias y se ejecuta tanto en el cliente como en el servidor.

Sin embargo, Intlayer optimiza el análisis para frameworks de renderizado en el lado del servidor (SSR) (como Next.js App Router, React Router, Nuxt, SvelteKit, etc.).

En lugar de enviar cadenas Markdown crudas al cliente y analizarlas en el navegador (lo que incurre en una penalización de rendimiento), Intlayer le permite preanalizar el Markdown en un Árbol de Sintaxis Abstracta (AST) en el servidor.

Puede usar la función `parseMarkdown` del paquete Intlayer de su framework en el lado del servidor para generar un AST serializable (objeto `ParsedMarkdown`) y pasarlo directamente al frontend. Todas las utilidades de renderizado de Intlayer (como `<MarkdownRenderer>`, `useMarkdownRenderer`, etc.) aceptan automáticamente este objeto AST y lo renderizan sin problemas.

### Ejemplo en una Arquitectura Servidor/Cliente

<Tabs group="framework">
  <Tab label="React Router" value="react">

    ```tsx fileName="server.ts"
    import { parseMarkdown } from "react-intlayer/markdown";

    // 1. En el servidor: Analizar el markdown en un AST serializable
    export const loader = async () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // Devolver el AST como JSON al cliente
      return Response.json({ content: ast });
    };
    ```

    ```tsx fileName="client.tsx"
    import { useLoaderData } from "react-router";
    import { MarkdownRenderer } from "react-intlayer/markdown";

    // 2. En el cliente: Renderizar el AST directamente sin volver a analizar
    export default function Page() {
      const { content } = useLoaderData();

      // El renderizador acepta tanto una cadena cruda como el AST analizado
      return <MarkdownRenderer content={content} />;
    }
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="app/page.tsx"
    import { parseMarkdown } from "next-intlayer/markdown";
    import { MarkdownRenderer } from "next-intlayer/markdown";

    export default async function Page() {
      // 1. Analizar el markdown en un AST serializable en el servidor
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // 2. Renderizar el AST directamente
      // En un Componente de Servidor, esto funciona sin problemas y pasa el AST
    // directamente a los componentes de cliente subyacentes si es necesario.
      return <MarkdownRenderer content={ast} />;
    }
    ```

  </Tab>
  <Tab label="Vue / Nuxt" value="vue">

    ```vue fileName="pages/index.vue"
    <script setup lang="ts">
    import { parseMarkdown } from "vue-intlayer/markdown";
    import { MarkdownRenderer } from "vue-intlayer/markdown";

    // 1. Obtener y analizar el markdown en un AST en el servidor
    const { data: ast } = await useAsyncData('markdown', () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      return parseMarkdown(markdownString);
    });
    </script>

    <template>
      <!-- 2. En el cliente: Renderizar el AST directamente sin volver a analizar -->
      <MarkdownRenderer :content="ast" />
    </template>
    ```

  </Tab>
  <Tab label="SvelteKit" value="svelte">

    ```typescript fileName="+page.server.ts"
    import { parseMarkdown } from "svelte-intlayer/markdown";

    // 1. En el servidor: Analizar el markdown en un AST serializable
    export const load = async () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // Devolver el AST al cliente
      return { content: ast };
    };
    ```

    ```svelte fileName="+page.svelte"
    <script lang="ts">
      import { MarkdownRenderer } from "svelte-intlayer/markdown";
      export let data;
    </script>

    <!-- 2. En el cliente: Renderizar el AST directamente sin volver a analizar -->
    <MarkdownRenderer value={data.content} />
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    El SSR de Angular normalmente resuelve los datos en el servidor durante la carga inicial y se hidrata en el cliente. Puede usar solucionadores para pasar el AST.

    ```typescript fileName="app.resolver.ts"
    import { Injectable } from "@angular/core";
    import { Resolve } from "@angular/router";
    import { parseMarkdown, type ParsedMarkdown } from "angular-intlayer/markdown";

    @Injectable({ providedIn: "root" })
    export class MarkdownResolver implements Resolve<ParsedMarkdown> {
      resolve(): ParsedMarkdown {
        const markdownString = "## My title \n\nLorem Ipsum";
        // 1. En el servidor: Analizar el markdown en un AST serializable
        return parseMarkdown(markdownString);
      }
    }
    ```

    ```typescript fileName="app.component.ts"
    import { Component } from "@angular/core";
    import { ActivatedRoute } from "@angular/router";
    import { IntlayerMarkdownService, type ParsedMarkdown } from "angular-intlayer/markdown";

    @Component({
      selector: "app-root",
      template: `<div [innerHTML]="renderedMarkdown"></div>`,
    })
    export class AppComponent {
      renderedMarkdown: string = "";

      constructor(
        private route: ActivatedRoute,
        private markdownService: IntlayerMarkdownService
      ) {
        // 2. En el cliente: Renderizar el AST directamente sin volver a analizar
        this.route.data.subscribe((data) => {
          this.renderedMarkdown = this.markdownService.renderMarkdown(
            data.markdownAst
          ) as string;
        });
      }
    }
    ```

  </Tab>
</Tabs>

Este patrón garantiza que la lógica de análisis de Markdown se ejecute completamente en el servidor, lo que reduce significativamente el tiempo de ejecución en el cliente y mejora la velocidad de hidratación inicial.

## Referencia de opciones

Estas opciones se pueden pasar a `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer` y `renderMarkdown`.

| Option                | Type        | Default | Descripción                                                                                                      |
| :-------------------- | :---------- | :------ | :--------------------------------------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false` | Fuerza la salida para que esté envuelta en un elemento de nivel de bloque (ej. `<div>`).                         |
| `forceInline`         | `boolean`   | `false` | Fuerza la salida para que esté envuelta en un elemento en línea (ej. `<span>`).                                  |
| `tagfilter`           | `boolean`   | `true`  | Habilita el GitHub Tag Filter para mejorar la seguridad eliminando etiquetas HTML peligrosas.                    |
| `preserveFrontmatter` | `boolean`   | `false` | Si es `true`, no se eliminará el frontmatter al principio de la cadena Markdown.                                 |
| `components`          | `Overrides` | `{}`    | Un mapa de etiquetas HTML a componentes personalizados (ej. `{ h1: MyHeading }`).                                |
| `wrapper`             | `Component` | `null`  | Un componente personalizado para envolver el Markdown renderizado.                                               |
| `renderMarkdown`      | `Function`  | `null`  | Una función de renderizado personalizada para reemplazar completamente el compilador de Markdown predeterminado. |
