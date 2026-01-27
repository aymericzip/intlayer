---
createdAt: 2026-01-20
updatedAt: 2026-01-22
title: Contenu HTML
description: Apprenez à déclarer et à utiliser du contenu HTML avec des composants personnalisés dans Intlayer. Suivez cette documentation pour intégrer du contenu riche de type HTML avec un remplacement dynamique de composants dans votre projet internationalisé.
keywords:
  - HTML
  - Composants Personnalisés
  - Contenu Riche
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
    changes: Ajouter HTMLRenderer / useHTMLRenderer / utilitaire renderHTML
  - version: 8.0.0
    date: 2026-01-20
    changes: Ajouter le support du parsing HTML
---

# Contenu HTML / HTML dans Intlayer

Intlayer prend en charge le contenu HTML, vous permettant d'intégrer du contenu riche et structuré dans vos dictionnaires. Ce contenu peut être rendu avec des balises HTML standard ou remplacé par des composants personnalisés à l'exécution.

## Comment fonctionne le HTML

Intlayer v8 détecte intelligemment les balises HTML dans vos chaînes de contenu. Si une chaîne est identifiée comme HTML (contient des balises), elle est automatiquement transformée en un nœud HTML.

<Columns>
<Column title="Comportement v7 (Enveloppement manuel)">

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
<Column title="Comportement v8 (Détection automatique)">

```typescript fileName="htmlDictionary.content.ts"
export default {
  key: "app",
  content: {
    text: "<p>Hello <strong>World</strong></p>",
  },
};
```

</Column>
</Columns>

---

## Déclarer du contenu HTML

Vous pouvez déclarer du contenu HTML à l'aide de la fonction `html` ou simplement sous forme de chaîne de caractères.

<Tabs>
  <Tab label="Enveloppement Manuel">
    Utilisez la fonction `html` pour déclarer explicitement du contenu HTML. Cela garantit que les balises standard sont mappées correctement même si la détection automatique est désactivée.

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
  <Tab label="Détection Automatique">
    Si la chaîne contient des balises HTML courantes (par exemple, `<p>`, `<div>`, `<strong>`, etc.), Intlayer la transformera automatiquement.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      content: {
        myHtmlContent: "<p>Hello <strong>World</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="Fichiers Externes">
    Importez du contenu HTML à partir de fichiers. Notez qu'actuellement la fonction `file()` renvoie une chaîne, qui sera automatiquement détectée comme HTML si elle contient des balises.

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

## Rendu du HTML

Le rendu peut être géré automatiquement par le système de contenu d'Intlayer ou manuellement à l'aide d'outils spécialisés.

### Rendu Automatique (en utilisant `useIntlayer`)

Lorsque vous accédez au contenu via `useIntlayer`, les nœuds HTML sont déjà préparés pour le rendu.

<Tabs group="framework">
  <Tab label="React / Next.js">
    Les nœuds HTML peuvent être rendus directement en JSX. Les balises standard fonctionnent automatiquement.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    Utilisez la méthode `.use()` pour fournir des composants personnalisés ou remplacer des balises :

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue">
    Dans Vue, le contenu HTML peut être rendu à l'aide du composant intégré `component`.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    Utilisez `.use()` pour les remplacements :
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte">
    Svelte rend les nœuds HTML sous forme de chaînes de caractères. Utilisez `{@html}` pour les rendre.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact">
    Preact prend en charge les nœuds HTML directement dans le JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid">
    Solid prend en charge les nœuds HTML directement dans le JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular">
    Angular utilise la directive `[innerHTML]` pour rendre le contenu HTML.

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

    Utilisez la méthode `.use()` pour fournir des composants personnalisés ou remplacer des balises :

    ```typescript
    content().myHtmlContent.use({
      p: { class: "prose" },
      CustomLink: { href: "/details" },
    })
    ```

  </Tab>
</Tabs>

## Configuration Globale avec `HTMLProvider`

Vous pouvez configurer le rendu HTML globalement pour l'ensemble de votre application. C'est idéal pour définir des composants personnalisés qui doivent être disponibles dans tout le contenu HTML.

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
  <Tab label="Solid">
   
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
  <Tab label="Angular">

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

### Rendu Manuel et Outils Avancés

Si vous avez besoin de rendre des chaînes HTML brutes ou si vous voulez plus de contrôle sur le mappage des composants, utilisez les outils suivants.

<Tabs group="framework">
  <Tab label="React / Next.js">
    #### Composant `<HTMLRenderer />`
    Rendre une chaîne HTML avec des composants spécifiques.

    ```tsx
    import { HTMLRenderer } from "react-intlayer";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    Obtenir une fonction de rendu pré-configurée.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hello <strong>World</strong></p>");
    ```

    #### Utilitaire `renderHTML()`

    Utilitaire autonome pour le rendu en dehors des composants.

    ```tsx
    import { renderHTML } from "react-intlayer";

    const jsx = renderHTML("<p>Hello</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue">
   
    #### Composant `<HTMLRenderer />`
   
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
  
    #### Composant `<HTMLRenderer />`
   
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

    #### Utilitaire `renderHTML()`

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer";
    </script>

    {@html renderHTML("<p>Hello World</p>")}
    ```

  </Tab>
  <Tab label="Preact">
   
    #### Composant `<HTMLRenderer />`
   
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

    #### Utilitaire `renderHTML()`

    ```tsx
    import { renderHTML } from "preact-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid">
   
    #### Composant `<HTMLRenderer />`
   
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

    #### Utilitaire `renderHTML()`

    ```tsx
    import { renderHTML } from "solid-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular">
    #### Service `IntlayerMarkdownService`
    Rendre une chaîne HTML à l'aide du service.

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

## Référence des Options

Ces options peuvent être passées à `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer` et `renderHTML`.

| Option       | Type                  | Défaut | Description                                                                                                              |
| :----------- | :-------------------- | :----- | :----------------------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`   | Une carte des balises HTML ou des noms de composants personnalisés vers les composants.                                  |
| `renderHTML` | `Function`            | `null` | Une fonction de rendu personnalisée pour remplacer complètement le parseur HTML par défaut (uniquement pour Vue/Svelte). |

> Note : Pour React et Preact, les balises HTML standard sont fournies automatiquement. Vous n'avez besoin de passer la prop `components` que si vous souhaitez les remplacer ou ajouter des composants personnalisés.
