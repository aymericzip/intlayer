---
createdAt: 2026-01-20
updatedAt: 2026-09-21
priority: 8
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
  - Remix
  - Astro
slugs:
  - doc
  - concept
  - content
  - html
history:
  - version: 8.5.0
    date: 2026-03-24
    changes: "Add `intlayerHTML` plugin object; use `app.use(intlayerHTML)` instead of `app.use(installIntlayerHTML)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "déplacer l'importation de {{framework}}-intlayer vers {{framework}}-intlayer/html"
  - version: 8.0.0
    date: 2026-01-22
    changes: "Ajouter HTMLRenderer / useHTMLRenderer / utilitaire renderHTML"
  - version: 8.0.0
    date: 2026-01-20
    changes: "Ajouter le support du parsing HTML"
author: aymericzip
---

# Contenu HTML / HTML dans Intlayer

Intlayer prend en charge le contenu HTML, vous permettant d'intégrer du contenu riche et structuré dans vos dictionnaires. Ce contenu peut être rendu avec des balises HTML standard ou remplacé par des composants personnalisés à l'exécution.

## Déclarer du contenu HTML

Vous pouvez déclarer du contenu HTML à l'aide de la fonction `html` ou simplement sous forme de chaîne de caractères.

<Tabs>
  <Tab label="Enveloppement Manuel" value="manual-wrapping">
    Utilisez la fonction `html` pour déclarer explicitement du contenu HTML. Cela garantit que les balises standard sont mappées correctement même si la détection automatique est désactivée.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      contentAutoTransformation: true, // peut être défini dans le fichier de configuration
      content: {
        myHtmlContent:  html("<p>Hello <strong>World</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="Détection Automatique" value="automatic-detection">
    Si la chaîne contient des balises HTML courantes (par exemple, `<p>`, `<div>`, `<strong>`, etc.), Intlayer la transformera automatiquement.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // peut être défini dans le fichier de configuration
      content: {
        myHtmlContent:  "<p>Hello <strong>World</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="Fichiers Externes" value="external-files">
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

### Le nœud `html()`

La fonction `html()` est une nouvelle fonctionnalité d'Intlayer v8 qui vous permet de définir explicitement du contenu HTML dans vos dictionnaires. Bien qu'Intlayer puisse souvent détecter automatiquement le contenu HTML, l'utilisation de la fonction `html()` offre plusieurs avantages :

- **Sécurité de typage** : La fonction `html()` vous permet de définir les props attendues pour les composants personnalisés, offrant une meilleure autocomplétion et une vérification de type dans votre éditeur.
- **Déclaration explicite** : Elle garantit qu'une chaîne est toujours traitée comme du HTML, même si elle ne contient pas de balises HTML standard qui déclencheraient l'auto-détection.
- **Définition de composants personnalisés** : Vous pouvez passer un deuxième argument à `html()` pour définir les composants personnalisés et leurs types de props attendus.

```typescript
import { html } from "intlayer";

const myContent = html(
  "<MyCustomComponent title='Bonjour'>Monde</MyCustomComponent>",
  {
    MyCustomComponent: {
      title: "string",
      children: "node",
    },
  }
);
```

Lors de l'utilisation de la méthode `.use()` sur un nœud HTML, les composants que vous fournissez seront vérifiés par rapport à la définition fournie dans la fonction `html()` (si disponible).

## Rendu du HTML

Le rendu peut être géré automatiquement par le système de contenu d'Intlayer ou manuellement à l'aide d'outils spécialisés.

### Rendu Automatique (en utilisant `useIntlayer`)

Lorsque vous accédez au contenu via `useIntlayer`, les nœuds HTML sont déjà préparés pour le rendu.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
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
  <Tab label="Vue" value="vue">
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
  <Tab label="Svelte" value="svelte">
    Svelte rend les nœuds HTML sous forme de chaînes de caractères. Utilisez `{@html}` pour les rendre.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact prend en charge les nœuds HTML directement dans le JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid prend en charge les nœuds HTML directement dans le JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
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
  <Tab label="Remix" value="remix">
    Dans Remix 3, les nœuds HTML sont résolus en une chaîne HTML. Injectez-la avec la prop `innerHTML` de Remix JSX, ou avec `html.raw` dans une vue `html-template`.

    ```tsx fileName="src/views/home.tsx"
    import { useIntlayer } from "remix-intlayer";

    export const HomePage = () => () => {
      const { myHtmlContent } = useIntlayer("app");

      return <div innerHTML={myHtmlContent.value} />;
    };
    ```

    ```ts fileName="src/views/home.ts"
    import { html } from "remix/html-template";
    import { useIntlayer } from "remix-intlayer";

    export const renderHomePage = () => {
      const { myHtmlContent } = useIntlayer("app");

      return html.raw`<div>${myHtmlContent.value}</div>`;
    };
    ```

    > Remix échappe les valeurs interpolées par défaut. `innerHTML` et `html.raw` sont les deux mécanismes d'exclusion, ce dont une chaîne HTML a besoin.

    Utilisez la méthode `.use()` pour surcharger des balises ou mapper des composants personnalisés. Les surcharges sont des fonctions renvoyant une chaîne HTML :

    ```tsx
    <div
      innerHTML={myHtmlContent.use({
        p: ({ children }) => `<p class="prose">${children}</p>`,
        CustomLink: ({ children }) => `<a href="/details">${children}</a>`,
      })}
    />
    ```

  </Tab>
  <Tab label="Astro" value="astro">
    Dans Astro, les nœuds HTML sont résolus en une chaîne HTML. Injectez-la avec la directive `set:html` dans le template, ou avec `innerHTML` dans un `<script>` côté client.

    ```astro fileName="src/pages/index.astro"
    ---
    import { useIntlayer } from "astro-intlayer";

    const { myHtmlContent } = useIntlayer("app");
    ---

    <div set:html={myHtmlContent.value} />
    ```

    ```astro fileName="src/components/Content.astro"
    <div id="content"></div>

    <script>
      import { useIntlayer } from "astro-intlayer";

      const { myHtmlContent } = useIntlayer("app");

      document.querySelector("#content")!.innerHTML = myHtmlContent.value;
    </script>
    ```

    > Astro échappe les `{expressions}` par défaut. `set:html` est le mécanisme d'exclusion, ce dont une chaîne HTML a besoin.

    Utilisez la méthode `.use()` pour surcharger des balises ou mapper des composants personnalisés. Les surcharges sont des fonctions renvoyant une chaîne HTML :

    ```astro
    <div
      set:html={myHtmlContent.use({
        p: ({ children }) => `<p class="prose">${children}</p>`,
        CustomLink: ({ children }) => `<a href="/details">${children}</a>`,
      })}
    />
    ```

  </Tab>
</Tabs>

## Configuration Globale avec `HTMLProvider`

Vous pouvez configurer le rendu HTML globalement pour l'ensemble de votre application. C'est idéal pour définir des composants personnalisés qui doivent être disponibles dans tout le contenu HTML.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "react-intlayer/html";

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

    Vous pouvez également utiliser votre propre moteur de rendu HTML :

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "react-intlayer/html";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        renderHTML={async (html) => {
          const { renderHTML } = await import('react-intlayer/html');
          return renderHTML(html);
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

    > L'importation dynamique de votre moteur de rendu HTML est un bon moyen de réduire la taille du bundle de votre application.

  </Tab>
  <Tab label="Vue" value="vue">

    ```typescript fileName="main.ts"
    import { createApp, h } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerHTML } from "vue-intlayer/html";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerHTML, {
      components: {
        p: (props, { slots }) => h("p", { class: "prose", ...props }, slots.default?.()),
        CustomLink: (props, { slots }) => h("a", { href: "/details", ...props }, slots.default?.()),
      },
    });

    app.mount("#app");
    ```

    Vous pouvez également utiliser votre propre moteur de rendu HTML :

    ```typescript fileName="main.ts"
    import { createApp, h } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerHTML } from "vue-intlayer/html";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerHTML, {
      renderHTML: async (html) => {
        const { renderHTML } = await import('vue-intlayer/html');
        return renderHTML(html);
      },
    });

    app.mount("#app");
    ```

    > L'importation dynamique de votre moteur de rendu HTML est un bon moyen de réduire la taille du bundle de votre application.

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { HTMLProvider } from "svelte-intlayer/html";
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

    Vous pouvez également utiliser votre propre moteur de rendu HTML :

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { HTMLProvider } from "svelte-intlayer/html";
    </script>

    <HTMLProvider
      renderHTML={async (html) => {
        const { renderHTML } = await import('svelte-intlayer/html');
        return renderHTML(html);
      }}
    >
      <slot />
    </HTMLProvider>
    ```

    > L'importation dynamique de votre moteur de rendu HTML est un bon moyen de réduire la taille du bundle de votre application.

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "preact-intlayer/html";

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

    Vous pouvez également utiliser votre propre moteur de rendu HTML :

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "preact-intlayer/html";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        renderHTML={async (html) => {
          const { renderHTML } = await import('preact-intlayer/html');
          return renderHTML(html);
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

    > L'importation dynamique de votre moteur de rendu HTML est un bon moyen de réduire la taille du bundle de votre application.

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "solid-intlayer/html";

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

    Vous pouvez également utiliser votre propre moteur de rendu HTML :

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "solid-intlayer/html";

    export const AppProvider = (props) => (
      <HTMLProvider
        renderHTML={async (html) => {
          const { renderHTML } = await import('solid-intlayer/html');
          return renderHTML(html);
        }}
      >
        {props.children}
      </HTMLProvider>
    );
    ```

    > L'importation dynamique de votre moteur de rendu HTML est un bon moyen de réduire la taille du bundle de votre application.

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerHTMLProvider } from "angular-intlayer/html";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerHTMLProvider({
          components: {
            p: { class: "prose" },
            CustomLink: { href: "/details" },
          },
        }),
      ],
    };
    ```

    Vous pouvez également utiliser votre propre moteur de rendu HTML :

    ```typescript fileName="app.config.ts"
    import { createIntlayerHTMLProvider } from "angular-intlayer/html";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerHTMLProvider({
          renderHTML: async (html) => {
            const { renderHTML } = await import('angular-intlayer/html');
            return renderHTML(html);
          },
        }),
      ],
    };
    ```

    > L'importation dynamique de votre moteur de rendu HTML est un bon moyen de réduire la taille du bundle de votre application.

  </Tab>
  <Tab label="Remix" value="remix">

    Remix n'a pas d'arbre de composants pour contenir un provider, la configuration est donc installée une seule fois, en tant que singleton, au démarrage du serveur. Elle configure le renderer renvoyé par `useHTMLRenderer()`. Les nœuds `html` renvoyés par `useIntlayer` sont rendus tels quels ; surchargez leurs balises par nœud avec `.use()`.

    ```typescript fileName="src/router.ts"
    import { installIntlayerHTML } from "remix-intlayer/html";

    installIntlayerHTML({
      renderHTML: (html) => html.replaceAll("<p>", '<p class="prose">'),
    });
    ```

    > Utilisez `installIntlayerHTMLDynamic(async () => …)` pour charger le renderer lui-même de manière paresseuse ; le chargeur ne s'exécute qu'au premier appel.

  </Tab>
  <Tab label="Astro" value="astro">

    Astro n'a pas d'arbre de composants pour contenir un provider, la configuration est donc installée une seule fois, en tant que singleton, dans le middleware (serveur) et dans un `<script>` côté client (navigateur). Elle configure le renderer renvoyé par `useHTMLRenderer()`. Les nœuds `html` renvoyés par `useIntlayer` sont rendus tels quels ; surchargez leurs balises par nœud avec `.use()`.

    ```typescript fileName="src/middleware.ts"
    import { installIntlayerHTML } from "astro-intlayer/html";
    import { defineMiddleware } from "astro:middleware";

    // S'exécute une fois au démarrage du serveur ; le middleware Intlayer lui-même est
    // enregistré par l'intégration, en amont de ce fichier.
    installIntlayerHTML({
      renderHTML: (html) => html.replaceAll("<p>", '<p class="prose">'),
    });

    export const onRequest = defineMiddleware((_context, next) => next());
    ```

    > Utilisez `installIntlayerHTMLDynamic(async () => …)` pour charger le renderer lui-même de manière paresseuse ; le chargeur ne s'exécute qu'au premier appel.

  </Tab>
</Tabs>

### Rendu Manuel et Outils Avancés

Si vous avez besoin de rendre des chaînes HTML brutes ou si vous voulez plus de contrôle sur le mappage des composants, utilisez les outils suivants.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### Composant `<HTMLRenderer />`
    Rendre une chaîne HTML avec des composants spécifiques.

    ```tsx
    import { HTMLRenderer } from "react-intlayer/html";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    Obtenir une fonction de rendu pré-configurée.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer/html";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hello <strong>World</strong></p>");
    ```

    #### Utilitaire `renderHTML()`

    Utilitaire autonome pour le rendu en dehors des composants.

    ```tsx
    import { renderHTML } from "react-intlayer/html";

    const jsx = renderHTML("<p>Hello</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### Composant `<HTMLRenderer />`

    ```vue
    <script setup>
    import { HTMLRenderer } from "vue-intlayer/html";
    </script>

    <template>
      <HTMLRenderer content="<p>Hello World</p>" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### Composant `<HTMLRenderer />`

    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer/html";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

    #### Hook `useHTMLRenderer()`

    ```svelte
    <script lang="ts">
    import { useHTMLRenderer } from "svelte-intlayer/html";
    const render = useHTMLRenderer();
    </script>

    {@html render("<p>Hello World</p>")}
    ```

    #### Utilitaire `renderHTML()`

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer/html";
    </script>

    {@html renderHTML("<p>Hello World</p>")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    #### Composant `<HTMLRenderer />`

    ```tsx
    import { HTMLRenderer } from "preact-intlayer/html";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    ```tsx
    import { useHTMLRenderer } from "preact-intlayer/html";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### Utilitaire `renderHTML()`

    ```tsx
    import { renderHTML } from "preact-intlayer/html";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    #### Composant `<HTMLRenderer />`

    ```tsx
    import { HTMLRenderer } from "solid-intlayer/html";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    ```tsx
    import { useHTMLRenderer } from "solid-intlayer/html";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### Utilitaire `renderHTML()`

    ```tsx
    import { renderHTML } from "solid-intlayer/html";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Service `IntlayerHTMLService`
    Rendre une chaîne HTML à l'aide du service.

    ```typescript
    import { IntlayerHTMLService } from "angular-intlayer/html";

    export class MyComponent {
      constructor(private markdownService: IntlayerHTMLService) {}

      renderHTML(html: string) {
        return this.markdownService.renderHTML(html);
      }
    }
    ```

  </Tab>
  <Tab label="Remix" value="remix">
    #### Hook `useHTMLRenderer()`

    Obtenez une fonction de rendu préconfigurée par `installIntlayerHTML()`. Elle renvoie une chaîne HTML.

    ```tsx
    import { useHTMLRenderer } from "remix-intlayer/html";

    const renderHTML = useHTMLRenderer();

    return <div innerHTML={renderHTML("<p>Hello <strong>World</strong></p>")} />;
    ```

    #### Utilitaire `renderHTML()`

    Utilitaire autonome qui ignore la configuration globale.

    ```tsx
    import { renderHTML } from "remix-intlayer/html";

    const html = renderHTML("<p>Hello</p>");
    ```

  </Tab>
  <Tab label="Astro" value="astro">
    #### Hook `useHTMLRenderer()`

    Obtenez une fonction de rendu préconfigurée par `installIntlayerHTML()`. Elle renvoie une chaîne HTML.

    ```astro
    ---
    import { useHTMLRenderer } from "astro-intlayer/html";

    const renderHTML = useHTMLRenderer();
    ---

    <div set:html={renderHTML("<p>Hello <strong>World</strong></p>")} />
    ```

    #### Utilitaire `renderHTML()`

    Utilitaire autonome qui ignore la configuration globale.

    ```astro
    ---
    import { renderHTML } from "astro-intlayer/html";

    const html = renderHTML("<p>Hello</p>");
    ---

    <div set:html={html} />
    ```

  </Tab>
</Tabs>

## Référence des Options

Ces options peuvent être passées à `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer` et `renderHTML`.

| Option       | Type                  | Défaut | Description                                                                                                                            |
| :----------- | :-------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`   | Une carte des balises HTML ou des noms de composants personnalisés vers les composants.                                                |
| `renderHTML` | `Function`            | `null` | Une fonction de rendu personnalisée pour remplacer complètement le parseur HTML par défaut (fournisseurs Vue, Svelte, Remix et Astro). |

> Note : Pour React et Preact, les balises HTML standard sont fournies automatiquement. Vous n'avez besoin de passer la prop `components` que si vous souhaitez les remplacer ou ajouter des composants personnalisés.
