---
createdAt: 2025-02-07
updatedAt: 2026-01-22
title: Markdown
description: Apprenez à déclarer et à utiliser du contenu Markdown dans votre site Web multilingue avec Intlayer. Suivez les étapes de cette documentation en ligne pour intégrer Markdown de manière transparente dans votre projet.
keywords:
  - Markdown
  - Internationalisation
  - Documentation
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
    changes: Ajouter MarkdownRenderer / useMarkdownRenderer / utilitaire renderMarkdown et option forceInline
  - version: 8.0.0
    date: 2026-01-18
    changes: Décoration automatique du contenu markdown, support MDX et SSR
  - version: 5.5.10
    date: 2025-06-29
    changes: Initialisation de l'historique
---

# Markdown / Contenu Riche en Texte

Intlayer prend en charge le contenu riche en texte défini à l'aide de la syntaxe Markdown. Cela vous permet d'écrire et de maintenir facilement du contenu avec une mise en forme riche, comme des blogs, des articles, et plus encore.

## Comment fonctionne le Markdown

Intlayer v8 détecte intelligemment la syntaxe Markdown dans vos chaînes de contenu. Si une chaîne est identifiée comme du Markdown, elle est automatiquement transformée en un nœud Markdown.

<Columns>
  <Column title="Comportement v7 (Enveloppement manuel)">

    ```typescript fileName="markdownDictionary.content.ts"
    import { md } from "intlayer";

    export default {
      key: "app",
      content: {
        text: md("## My title \n\nLorem Ipsum"),
      },
    };
    ```

  </Column>
  <Column title="Comportement v8 (Détection automatique)">

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Activer la détection automatique du contenu Markdown - Peut être défini globalement dans intlayer.config.ts
      content: {
        text: "## My title \n\nLorem Ipsum",
      },
    };
    ```

  </Column>
</Columns>

---

## Partie 1 : Déclarer du contenu Markdown

Vous pouvez déclarer du contenu Markdown à l'aide de la fonction `md` ou simplement sous forme de chaîne de caractères (si elle contient la syntaxe Markdown).

<Tabs>
  <Tab label="Enveloppement Manuel">
    Utilisez la fonction `md` pour déclarer explicitement du contenu Markdown. Cela est utile si vous voulez vous assurer qu'une chaîne est traitée comme du Markdown même si elle ne contient pas de syntaxe évidente.

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
  <Tab label="Détection Automatique">
    Si la chaîne contient des indicateurs Markdown courants (comme des titres, des listes, des liens, etc.), Intlayer la transformera automatiquement.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Activer la détection automatique du contenu Markdown - Peut être défini globalement dans intlayer.config.ts
      content: {
        myMarkdownContent: "## My title \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
  <Tab label="Fichiers Externes">
    Importez des fichiers `.md` directement à l'aide de la fonction `file`.

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

## Partie 2 : Rendu du Markdown

Le rendu peut être géré automatiquement par le système de contenu d'Intlayer ou manuellement à l'aide d'outils spécialisés.

### 1. Rendu Automatique (en utilisant `useIntlayer`)

Lorsque vous accédez au contenu via `useIntlayer`, les nœuds Markdown sont déjà préparés pour le rendu.

<Tabs group="framework">
  <Tab label="React / Next.js">
    Les nœuds Markdown peuvent être rendus directement en JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

    Vous pouvez également fournir des surcharges locales pour des nœuds spécifiques à l'aide de la méthode `.use()` :

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    })}
    ```

  </Tab>
  <Tab label="Vue">
    Dans Vue, le contenu Markdown peut être rendu à l'aide du composant intégré `component` ou directement sous forme de nœud.

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
    Svelte rend le Markdown sous forme de chaîne HTML par défaut. Utilisez `{@html}` pour le rendre.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myMarkdownContent}
    ```

  </Tab>
  <Tab label="Preact">
    Preact prend en charge les nœuds Markdown directement dans le JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid">
    Solid prend en charge les nœuds Markdown directement dans le JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular">
    Angular utilise la directive `[innerHTML]` pour rendre le contenu Markdown.

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

    Vous pouvez également fournir des surcharges locales pour des nœuds spécifiques à l'aide de la méthode `.use()` :

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

  </Tab>
</Tabs>

### 2. Rendu Manuel et Outils Avancés

Si vous avez besoin de rendre des chaînes Markdown brutes ou si vous voulez plus de contrôle sur le processus de rendu, utilisez les outils suivants.

<Tabs group="framework">
  <Tab label="React / Next.js">
  
    #### Composant `<MarkdownRenderer />`

    Rendre une chaîne Markdown avec des options spécifiques.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Obtenir une fonction de rendu pré-configurée.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# My Title");
    ```

    #### Utilitaire `renderMarkdown()`
    Utilitaire autonome pour le rendu en dehors des composants.

    ```tsx
    import { renderMarkdown } from "react-intlayer";

    const jsx = renderMarkdown("# My Title", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue">

    #### Composant `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# My Title" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte">

    #### Composant `<MarkdownRenderer />`

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

    #### Utilitaire `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer";
    </script>

    {@html renderMarkdown("# My Title")}
    ```

  </Tab>
  <Tab label="Preact">
    #### Composant `<MarkdownRenderer />`

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

    #### Utilitaire `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Solid">
    #### Composant `<MarkdownRenderer />`

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

    #### Utilitaire `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Angular">
    #### Service `IntlayerMarkdownService`
    Rendre une chaîne Markdown à l'aide du service.

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

## Configuration Globale avec `MarkdownProvider`

Vous pouvez configurer le rendu Markdown globalement pour l'ensemble de votre application. Cela évite de passer les mêmes props à chaque moteur de rendu.

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

## Référence des Options

Ces options peuvent être passées à `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer`, et `renderMarkdown`.

| Option                | Type        | Défaut  | Description                                                                                             |
| :-------------------- | :---------- | :------ | :------------------------------------------------------------------------------------------------------ |
| `forceBlock`          | `boolean`   | `false` | Force la sortie à être enveloppée dans un élément de niveau bloc (par exemple, `<div>`).                |
| `forceInline`         | `boolean`   | `false` | Force la sortie à être enveloppée dans un élément en ligne (par exemple, `<span>`).                     |
| `tagfilter`           | `boolean`   | `true`  | Active le filtre de balises GitHub pour une sécurité accrue en supprimant les balises HTML dangereuses. |
| `preserveFrontmatter` | `boolean`   | `false` | Si `true`, le frontmatter au début de la chaîne Markdown ne sera pas supprimé.                          |
| `components`          | `Overrides` | `{}`    | Une carte des balises HTML vers des composants personnalisés (par exemple, `{ h1: MyHeading }`).        |
| `wrapper`             | `Component` | `null`  | Un composant personnalisé pour envelopper le Markdown rendu.                                            |
| `renderMarkdown`      | `Function`  | `null`  | Une fonction de rendu personnalisée pour remplacer complètement le compilateur Markdown par défaut.     |
