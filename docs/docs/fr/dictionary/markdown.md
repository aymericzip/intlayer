---
createdAt: 2025-02-07
updatedAt: 2026-05-19
title: Markdown
description: Découvrez comment déclarer et utiliser du contenu Markdown sur votre site multilingue avec Intlayer. Suivez les étapes de cette documentation en ligne pour intégrer facilement Markdown à votre projet.
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
  - version: 8.10.0
    date: 2026-05-19
    changes: "Ajout de la prise en charge des fichiers `.content.md`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Ajout de l'objet plugin `intlayerMarkdown` ; utilisez `app.use(intlayerMarkdown)` au lieu de `app.use(installIntlayerMarkdown)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Déplacement de l'import depuis `{{framework}}-intlayer` vers `{{framework}}-intlayer/markdown`"
  - version: 8.0.0
    date: 2026-01-22
    changes: "Ajout de MarkdownRenderer / useMarkdownRenderer / renderMarkdown et de l'option forceInline"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Décoration automatique du contenu markdown, prise en charge de MDX et SSR"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initialisation de l'historique"
---

# Markdown / Contenu Texte Riche

Intlayer prend en charge le contenu texte riche défini à l'aide de la syntaxe Markdown. Cela vous permet de rédiger et de gérer facilement du contenu avec une mise en forme avancée, comme des blogs, des articles, et bien plus encore.

## Déclarer du Contenu Markdown

Vous pouvez déclarer du contenu Markdown en utilisant la fonction `md` ou simplement comme une chaîne de caractères (si elle contient de la syntaxe Markdown).

<Tabs>
  <Tab label=".content.md" value=".content.md">
    Depuis la version `8.10.0`, vous pouvez déclarer du contenu Markdown directement dans des fichiers `.content.md`. Intlayer détectera et analysera automatiquement le contenu Markdown.

    ```md fileName="markdown-file.en.content.md"
    ---
    key: my-markdown-content
    description: Mon contenu
    locale: en
    ---

    # Mon contenu

    Voici un exemple de contenu markdown
    ```

    Le champ front-matter `locale` permet de définir la langue du contenu. Il est optionnel. S'il n'est pas fourni, Intlayer utilisera la langue par défaut, qui sert également de langue de secours si aucune traduction n'est disponible pour une langue spécifique.

    Exemple de structure de fichiers :

    ```text
    content/
    ├── en/
    │   └── markdown-file.en.content.md
    ├── fr/
    │   └── markdown-file.fr.content.md
    └── es/
        └── markdown-file.es.content.md
    ```

    Vous pouvez ajouter dans le front-matter n'importe quelle propriété définie dans la [Définition du dictionnaire](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md)

  </Tab>
  <Tab label="Encapsulation Manuelle" value="manual-wrapping">
    Utilisez la fonction `md` pour déclarer explicitement du contenu Markdown. Cela est utile si vous voulez vous assurer qu'une chaîne est traitée comme du Markdown même si elle ne contient pas de syntaxe évidente.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## Mon titre \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="Fichiers Externes" value="external-files">
    Importez des fichiers `.md` directement en utilisant la fonction `file`.

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

  <Tab label="Détection Automatique" value="automatic-detection">
    Si la chaîne de caractères contient des indicateurs Markdown courants (comme des en-têtes, des listes, des liens, etc.), Intlayer la transformera automatiquement.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Activer la détection automatique du Markdown - Peut être défini globalement dans intlayer.config.ts
      content: {
        myMarkdownContent: "## Mon titre \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
</Tabs>

---

## Rendu Markdown

Intlayer propose deux manières indépendantes de rendre du Markdown :

1. **Via `useIntlayer`**
   — Intlayer transforme automatiquement le nœud `md` dans le format natif du framework (JSX, VNode, chaîne HTML).
   - Le frontmatter est analysé et exposé sous `.metadata`. Vous pouvez remplacer le rendu à deux niveaux — globalement avec `MarkdownProvider` (ou l'équivalent du framework) et localement par nœud avec `.use()`. Les deux peuvent être combinés ; `.use()` est prioritaire sur `MarkdownProvider`, qui est lui-même prioritaire sur le rendu par défaut.

2. **Utilitaires d'aide** — `<MarkdownRenderer />`, `useMarkdownRenderer()` et `renderMarkdown()` sont des outils indépendants qui n'acceptent que **des chaînes Markdown brutes**. Ils sont indépendants de `useIntlayer` et ne fonctionnent pas avec les nœuds décorés qu'il retourne.

Le rendu Markdown prend en charge **MDX** — utilisez n'importe quel composant JSX/framework par son nom directement dans votre Markdown.

### 1. Rendu Automatique (via `useIntlayer`)

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    Les nœuds Markdown peuvent être rendus directement sous forme de JSX.

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
          MyButton: (props) => <button {...props} />, // Composant MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Si `MarkdownProvider` n'est pas présent, Intlayer rendra le markdown en utilisant le parser par défaut de Markdown vers JSX.

    Vous pouvez également fournir des remplacements locaux pour des nœuds spécifiques en utilisant la méthode `.use()` :

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Vous pouvez récupérer le Markdown sous forme de chaîne de caractères :

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Et vous pouvez accéder aux métadonnées de votre markdown comme ceci :

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    Dans Vue, le contenu Markdown peut être rendu en utilisant la balise `component` intégrée ou directement comme un nœud.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

    Configurez globalement via le plugin `intlayerMarkdown` (prend en charge les composants personnalisés MDX) :

    ```ts fileName="main.ts"
    import { intlayerMarkdown } from "vue-intlayer/markdown";

    app.use(intlayerMarkdown, {
      components: {
        h1: (props) => h('h1', { style: { color: 'green' } }, props.children),
        MyButton: (props) => h('button', props), // Composant MDX
      },
    });
    ```

    > Si le plugin `intlayerMarkdown` n'est pas installé, Intlayer effectuera le rendu avec le compilateur par défaut.

    Vous pouvez également fournir des remplacements locaux pour des nœuds spécifiques en utilisant la méthode `.use()` :

    ```vue
    <component :is="myMarkdownContent.use({
      h1: (props) => h('h1', { style: { color: 'red' } }, props.children),
    })" />
    ```

    Vous pouvez récupérer le Markdown sous forme de chaîne de caractères :

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    Et vous pouvez accéder aux métadonnées de votre markdown comme ceci :

    ```vue
    <component :is="myMarkdownContent.metadata" />
    <component :is="myMarkdownContent.metadata.title" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte rend le Markdown sous forme de chaîne HTML par défaut. Utilisez `{@html}` pour le rendre.

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

    > Si `MarkdownProvider` n'est pas présent, Intlayer rendra le markdown avec le compilateur par défaut.

    Vous pouvez également fournir des remplacements locaux pour des nœuds spécifiques en utilisant la méthode `.use()` :

    ```svelte
    {@html $content.myMarkdownContent.use({ ... })}
    ```

    Vous pouvez récupérer le Markdown sous forme de chaîne de caractères :

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    Et vous pouvez accéder aux métadonnées de votre markdown comme ceci :

    ```svelte
    {$content.myMarkdownContent.metadata}
    {$content.myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact prend en charge les nœuds Markdown directement en JSX.

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
          MyButton: (props) => <button {...props} />, // Composant MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Si `MarkdownProvider` n'est pas présent, Intlayer rendra le markdown en utilisant le parser par défaut de Markdown vers JSX.

    Vous pouvez également fournir des remplacements locaux pour des nœuds spécifiques en utilisant la méthode `.use()` :

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Vous pouvez récupérer le Markdown sous forme de chaîne de caractères :

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Et vous pouvez accéder aux métadonnées de votre markdown comme ceci :

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid prend en charge les nœuds Markdown directement en JSX.

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
          MyButton: (props) => <button {...props} />, // Composant MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Si `MarkdownProvider` n'est pas présent, Intlayer rendra le markdown en utilisant le parser par défaut de Markdown vers JSX.

    Vous pouvez également fournir des remplacements locaux pour des nœuds spécifiques en utilisant la méthode `.use()` :

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    Vous pouvez récupérer le Markdown sous forme de chaîne de caractères :

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Et vous pouvez accéder aux métadonnées de votre markdown comme ceci :

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular utilise la directive `[innerHTML]` pour afficher le contenu Markdown.

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

    > Si le fournisseur IntlayerMarkdown n'est pas configuré, Intlayer effectuera le rendu avec le compilateur par défaut.

    Vous pouvez également fournir des remplacements locaux pour des nœuds spécifiques en utilisant la méthode `.use()` :

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

    Vous pouvez récupérer le Markdown sous forme de chaîne de caractères :

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    Et vous pouvez accéder aux métadonnées de votre markdown comme ceci :

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. Utilitaires d'aide (Chaînes Markdown Uniquement)

Ces utilitaires rendent **des chaînes Markdown brutes** et sont indépendants de `useIntlayer`. Utilisez-les lorsque vous devez afficher du Markdown provenant de sources autres que vos dictionnaires.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    #### Composant `<MarkdownRenderer />`

    Rend une chaîne Markdown avec des options spécifiques.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Mon Titre"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Obtenez une fonction de rendu préconfigurée.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Mon Titre");
    ```

    #### Utilitaire `renderMarkdown()`
    Utilitaire autonome pour le rendu en dehors des composants.

    ```tsx
    import { renderMarkdown } from "react-intlayer/markdown";

    const jsx = renderMarkdown("# Mon Titre", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### Composant `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer/markdown";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# Mon Titre" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### Composant `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer/markdown";
    </script>

    <MarkdownRenderer forceBlock={true} value="# Mon Titre" />
    ```

    #### Hook `useMarkdownRenderer()`

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer/markdown";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# Mon Titre")}
    ```

    #### Utilitaire `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer/markdown";
    </script>

    {@html renderMarkdown("# Mon Titre")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### Composant `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Mon Titre"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Mon Titre")}</div>;
    ```

    #### Utilitaire `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer/markdown";

    return <div>{renderMarkdown("# Mon Titre")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### Composant `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Mon Titre"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Mon Titre")}</div>;
    ```

    #### Utilitaire `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer/markdown";

    return <div>{renderMarkdown("# Mon Titre")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Service `IntlayerMarkdownService`
    Rend une chaîne Markdown en utilisant le service.

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

---

## Configuration Globale avec `MarkdownProvider`

Le `MarkdownProvider` (ou son équivalent dans un framework) configure le pipeline de rendu Markdown pour toute votre application. Cela s'applique aussi bien au rendu automatique `useIntlayer` qu'aux utilitaires d'aide. Les options définies ici sont les options par défaut — `.use()` les remplace au niveau du nœud.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

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

    > MDX est pris en charge — tout nom de composant utilisé dans votre Markdown (ex. `<MyCustomJSXComponent />`) est résolu par rapport à la correspondance dans `components`.

    Vous pouvez également utiliser votre propre rendu de markdown :

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

    > L'import dynamique de votre système de rendu Markdown est un bon moyen de réduire la taille du bundle de votre application.

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

    Vous pouvez également utiliser votre propre rendu de markdown :

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

    > L'import dynamique de votre système de rendu Markdown est un bon moyen de réduire la taille du bundle de votre application.

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

    Vous pouvez également utiliser votre propre rendu de markdown :

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

    > L'import dynamique de votre système de rendu Markdown est un bon moyen de réduire la taille du bundle de votre application.

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

    Vous pouvez également utiliser votre propre rendu de markdown :

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

    > L'import dynamique de votre système de rendu Markdown est un bon moyen de réduire la taille du bundle de votre application.

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

    Vous pouvez également utiliser votre propre rendu de markdown :

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

    > L'import dynamique de votre système de rendu Markdown est un bon moyen de réduire la taille du bundle de votre application.

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

    > L'import dynamique de votre système de rendu Markdown est un bon moyen de réduire la taille du bundle de votre application.

  </Tab>
</Tabs>
