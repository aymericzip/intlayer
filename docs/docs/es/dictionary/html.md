---
createdAt: 2026-01-20
updatedAt: 2026-01-22
title: Contenido HTML
description: Aprende a declarar y usar contenido HTML con componentes personalizados en Intlayer. Sigue esta documentación para incrustar contenido enriquecido tipo HTML con reemplazo dinámico de componentes en tu proyecto internacionalizado.
keywords:
  - HTML
  - Componentes personalizados
  - Contenido enriquecido
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

Intlayer admite contenido HTML, lo que te permite incrustar contenido enriquecido y estructurado dentro de tus diccionarios. Este contenido puede renderizarse con etiquetas HTML estándar o reemplazarse por componentes personalizados en tiempo de ejecución.

## Cómo funciona HTML

Intlayer v8 detecta de forma inteligente las etiquetas HTML en tus cadenas de contenido. Si una cadena se identifica como HTML (contiene etiquetas), se transforma automáticamente en un nodo HTML.

<Columns>
<Column title="Comportamiento en v7 (envoltura manual)">

```typescript fileName="htmlDictionary.content.ts"
import { html } from "intlayer";

export default {
  key: "app",
  content: {
    text: html("<p>Hello <strong>World</strong></p>"),
  },
};
```

</Column>
<Column title="Comportamiento en v8 (detección automática)">

```typescript fileName="htmlDictionary.content.ts"
export default {
  key: "app",
  content: {
    text: "<p>Hola <strong>Mundo</strong></p>",
  },
};
```

</Column>
</Columns>

---

## Declarar contenido HTML

Puedes declarar contenido HTML usando la función `html` o simplemente como una cadena.

<Tabs>
  <Tab label="Envoltura manual">
    Usa la función `html` para declarar explícitamente contenido HTML. Esto asegura que las etiquetas estándar se mapeen correctamente incluso si la detección automática está desactivada.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      content: {
        myHtmlContent: html("<p>Hola <strong>Mundo</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="Detección automática">
    Si la cadena contiene etiquetas HTML comunes (p. ej., `<p>`, `<div>`, `<strong>`, etc.), Intlayer la transformará automáticamente.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      content: {
        myHtmlContent: "<p>Hola <strong>Mundo</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="Archivos externos">
    Importa contenido HTML desde archivos. Ten en cuenta que actualmente la función `file()` devuelve una cadena, la cual será detectada automáticamente como HTML si contiene etiquetas.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          es: html(file("./content.es.html")),
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

El renderizado puede manejarse automáticamente mediante el sistema de contenido de Intlayer o manualmente usando herramientas especializadas.

### Renderizado automático (usando `useIntlayer`)

Cuando accedes al contenido mediante `useIntlayer`, los nodos HTML ya están preparados para renderizarse.

<Tabs group="framework">
  <Tab label="React / Next.js">
    Los nodos HTML pueden renderizarse directamente como JSX. Las etiquetas estándar funcionan automáticamente.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    Usa el método `.use()` para proporcionar componentes personalizados o sobreescribir etiquetas:

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue">
    En Vue, el contenido HTML se puede renderizar usando el componente incorporado `component`.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    Usa `.use()` para anular:
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte">
    Svelte renderiza los nodos HTML como cadenas. Usa `{@html}` para renderizarlos.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact">
    Preact admite nodos HTML directamente en el JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
</Tabs>

## Configuración global con `HTMLProvider`

Puedes configurar el renderizado de HTML de forma global para toda tu aplicación. Esto es ideal para definir componentes personalizados que deberían estar disponibles en todo el contenido HTML.

<Tabs group="framework">
  <Tab label="React / Next.js">
  
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
  <Tab label="Vue">
  
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
  <Tab label="Svelte">
   
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
  <Tab label="Preact">
   
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
</Tabs>

---

### Renderizado Manual y Herramientas Avanzadas

Si necesitas renderizar cadenas HTML sin procesar o tener un control más fino sobre el mapeo de componentes, utiliza las siguientes herramientas.

<Tabs group="framework">
  <Tab label="React / Next.js">
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
  <Tab label="Vue">
   
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
  <Tab label="Svelte">
  
    #### Componente `<HTMLRenderer />`
   
    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

  </Tab>
  <Tab label="Preact">
   
    #### Componente `<HTMLRenderer />`
   
    ```tsx
    import { HTMLRenderer } from "preact-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

  </Tab>
</Tabs>

---

## Referencia de opciones

Estas opciones se pueden pasar a `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer` y `renderHTML`.

| Opción       | Tipo                  | Predeterminado | Descripción                                                                                                                              |
| :----------- | :-------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`           | Un mapa que asocia etiquetas HTML o nombres de componentes personalizados a componentes.                                                 |
| `renderHTML` | `Function`            | `null`         | Una función de renderizado personalizada para reemplazar completamente el parser HTML por defecto (Solo para proveedores de Vue/Svelte). |

> Nota: Para React y Preact, las etiquetas HTML estándar se proporcionan automáticamente. Solo necesita pasar la prop `components` si desea sobrescribirlas o agregar componentes personalizados.
