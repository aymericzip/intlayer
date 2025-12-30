---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Comment traduire votre Angular – guide i18n 2026
description: Découvrez comment rendre votre site web avec Angular multilingue. Suivez la documentation pour l’internationaliser (i18n) et le traduire.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
# applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Ajouter la commande init
  - version: 5.5.10
    date: 2025-06-29
    changes: Historique initial
---

# Traduire votre Angular avec Intlayer | Internationalisation (i18n)

> Ce package est en cours de développement. Consultez le [problème](https://github.com/aymericzip/intlayer/issues/116) pour plus d’informations. Montrez votre intérêt pour Intlayer pour Angular en aimant ce problème.

<!-- Voir le [Modèle d’Application](https://github.com/aymericzip/intlayer-angular-template) sur GitHub. -->

## Qu’est-ce qu’Intlayer ?

**Intlayer** est une bibliothèque d’internationalisation (i18n) innovante et open-source conçue pour simplifier la prise en charge multilingue dans les applications web modernes.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer la prise en charge de TypeScript** avec des types générés automatiquement, améliorant l’autocomplétion et la détection d’erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement dynamiques de la locale.

---

## Guide étape par étape pour configurer Intlayer dans une application Angular

### Étape 1 : Installer les dépendances

Installez les paquets nécessaires avec npm :

```bash packageManager="npm"
npm install intlayer angular-intlayer @intlayer/webpack
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/webpack
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/webpack
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer @intlayer/webpack
bunx intlayer init
```

- **intlayer**

  Le package principal qui fournit des outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md), la transpilation, et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md).

- **angular-intlayer**
  Le package qui intègre Intlayer avec une application Angular. Il fournit des fournisseurs de contexte et des hooks pour l'internationalisation Angular.

- **@intlayer/webpack**
  Le package qui intègre Intlayer avec Webpack. Il est utilisé par l’Angular CLI pour construire les fichiers de déclaration de contenu et les surveiller en mode développement.

### Étape 2 : Configuration de votre projet

Créez un fichier de configuration pour définir les langues de votre application :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Grâce à ce fichier de configuration, vous pouvez configurer des URL localisées, la redirection via middleware, les noms de cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et bien plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer dans votre configuration Angular

Pour intégrer Intlayer avec l'Angular CLI, vous avez deux options selon votre builder : `esbuild` ou `webpack`.

#### Option 1 : Utiliser esbuild (recommandé)

Commencez par modifier votre `angular.json` pour utiliser le builder esbuild personnalisé. Mettez à jour la configuration `build` :

````json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
> Grâce à ce fichier de configuration, vous pouvez configurer des URL localisées, la redirection via middleware, les noms de cookies, l’emplacement et l’extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et bien plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer dans votre configuration Angular

Pour intégrer Intlayer avec Angular CLI, vous avez deux options selon votre builder : `esbuild` ou `webpack`.

#### Option 1 : Utiliser esbuild (recommandé)

Commencez par modifier votre `angular.json` pour utiliser le builder personnalisé esbuild. Mettez à jour la configuration `build` :

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application",
          "options": {
            "plugins": ["./esbuild/intlayer-plugin.ts"]
          }
        }
      }
    }
  }
}
````

> Veillez à remplacer `your-app-name` par le nom réel de votre projet dans `angular.json`.

Ensuite, créez un fichier `esbuild/intlayer-plugin.ts` à la racine de votre projet :

```typescript fileName="esbuild/intlayer-plugin.ts"
import { prepareIntlayer, watch } from "@intlayer/chokidar";
import { getConfiguration, logger } from "@intlayer/config";
import type { Plugin } from "esbuild";

const intlayer: Plugin = {
  name: "intlayer-esbuild-plugin",
  setup(build) {
    const configuration = getConfiguration();
    let isWatching = false;

    build.onStart(async () => {
      logger("Plugin Intlayer esbuild démarré", {
        level: "info",
      });

      if (build.initialOptions.watch && !isWatching) {
        logger("Mode surveillance activé. Démarrage du watcher...", {
          level: "info",
        });
        watch(configuration);
        isWatching = true;
      }

      try {
        await prepareIntlayer(configuration);
      } catch (error) {
        logger(`Erreur dans le plugin Intlayer esbuild : ${error}`, {
          level: "error",
        });
      }
    });
  },
};

export default intlayer;
```

> Le `intlayer` pour esbuild garantit que Intlayer est préparé avant le démarrage de la compilation et surveille les changements en mode développement.

#### Option 2 : Utilisation de Webpack

Tout d'abord, modifiez votre fichier `angular.json` pour utiliser le builder Webpack personnalisé. Mettez à jour les configurations `build` et `serve` :

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.js"
            }
          }
        },
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server"
        }
      }
    }
  }
}
```

> Veillez à remplacer `your-app-name` par le nom réel de votre projet dans `angular.json`.

Ensuite, créez un fichier `webpack.config.js` à la racine de votre projet :

```javascript fileName="webpack.config.js"
const { IntlayerWebpackPlugin } = require("@intlayer/webpack");

module.exports = {
  plugins: [new IntlayerWebpackPlugin()],
};
```

> Le `IntlayerWebpackPlugin` est utilisé pour intégrer Intlayer avec Webpack. Il assure la génération des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer dans l'application. De plus, il fournit des alias pour optimiser les performances.

### Étape 4 : Déclarez Votre Contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations ! Votre application fonctionne. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
    exploreDocs: t({
      en: "Explore the Docs",
      fr: "Explorer la documentation",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      en: "Learn with Tutorials",
      fr: "Apprendre avec des tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "Documentation CLI",
    angularLanguageService: t({
      en: "Angular Language Service",
      fr: "Service de langage Angular",
      es: "Servicio de Lenguaje Angular",
    }),
    angularDevTools: "Angular DevTools",
    github: "Github",
    twitter: "Twitter",
    youtube: "Youtube",
  },
} satisfies Dictionary;

export default appContent;
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application dès qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Pour plus de détails, référez-vous à la [documentation sur la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md).

### Étape 5 : Utiliser Intlayer dans votre code

Pour utiliser les fonctionnalités d'internationalisation d'Intlayer dans toute votre application Angular, vous devez utiliser la fonction `useIntlayer` au sein d'un composant. Cette fonction, disponible depuis `angular-intlayer`, donne accès à vos traductions sous forme de signaux réactifs.

`IntlayerProvider` est enregistré à la racine de l'application, vous n'avez donc pas besoin de l'ajouter aux providers de votre module.

Accédez à vos dictionnaires de contenu dans la classe de votre composant :

```typescript fileName="src/app/hello-world.component.ts"
import { Component, signal } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-hello-world",
  standalone: true,
  template: `
    <h1>{{ content().title }}</h1>

    <div class="card">
      <button type="button" (click)="increment()">
        {{ content().count }} {{ count() }}
      </button>
      <p [innerHTML]="content().edit"></p>
    </div>

    <p class="read-the-docs">{{ content().readTheDocs }}</p>
  `,
})
export class HelloWorldComponent {
  content = useIntlayer("helloworld");
  count = signal(0);

  increment() {
    this.count.update((value) => value + 1);
  }
}
```

Le contenu Intlayer est retourné sous forme de `Signal`, vous accédez donc aux valeurs en appelant le signal dans votre template : `content().title`.

### (Optionnel) Étape 6 : Changer la langue de votre contenu

Pour changer la langue de votre contenu, vous pouvez utiliser la fonction `setLocale` fournie par la fonction `useLocale`. Cela vous permet de définir la locale de l'application et de mettre à jour le contenu en conséquence.

Créez un composant pour basculer entre les langues :

````typescript fileName="src/app/components/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { getLocaleName } from "intlayer";
import { useLocale } from "angular-intlayer";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="locale-switcher">
      <select [ngModel]="locale()" (ngModelChange)="changeLocale($event)">
        <option *ngFor="let loc of availableLocales" [value]="loc">
          {{ getLocaleName(loc) }}
        </option>
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  localeInfo = useLocale();
  locale = this.localeInfo.locale;
  availableLocales = this.localeInfo.availableLocales;

  // Expose getLocaleName to the template
  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
Ensuite, utilisez ce composant dans votre `app.component.ts` :

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { HelloWorldComponent } from "./hello-world.component";
import { LocaleSwitcherComponent } from "./components/locale-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HelloWorldComponent, LocaleSwitcherComponent],
  template: `
    <div>
      <app-locale-switcher />
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Logo Vite" />
      </a>
      <a href="https://angular.dev/" target="_blank">
        <img
          src="/assets/angular.svg"
          class="logo angular"
          alt="Logo Angular"
        />
      </a>
    </div>
    <app-hello-world />
  `,
})
export class AppComponent {}
````

### (Optionnel) Étape 7 : Ajouter un routage localisé à votre application

Ajouter un routage localisé dans une application Angular consiste à utiliser le routeur Angular avec des préfixes de locale. Cela crée des routes uniques pour chaque langue, ce qui est utile pour le référencement (SEO).

Exemple :

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Tout d'abord, assurez-vous d'avoir installé `@angular/router`.

Ensuite, créez une configuration de routeur qui gère le routage basé sur la locale dans `app.routes.ts`.

```typescript fileName="src/app/app.routes.ts"
import { Routes } from "@angular/router";
import { configuration, localeFlatMap } from "intlayer";
import { HomeComponent } from "./home/home.component";
import { RootComponent } from "./root/root.component";

const { defaultLocale } = configuration.internationalization;

export const routes: Routes = [
  localeFlatMap((localizedData) => [
    {
      path: `${localizedData.urlPrefix}`,
      component: RootComponent,
      data: { locale: localizedData.locale },
    },
    {
      path: `${localizedData.urlPrefix}/home`,
      component: HomeComponent,
      data: { locale: localizedData.locale },
    },
  ]),
  { path: "**", redirectTo: `/${defaultLocale}/home` },
];
```

Ensuite, vous devez fournir le routeur dans votre fichier `app.config.ts`.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

### (Optionnel) Étape 8 : Modifier l’URL lorsque la langue change

Pour mettre à jour automatiquement l’URL lorsque l’utilisateur change de langue, vous pouvez modifier le composant `LocaleSwitcher` pour utiliser le Router d’Angular :

```typescript fileName="src/app/components/locale-switcher.component.ts"
import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "angular-intlayer";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="locale-switcher">
      <select [ngModel]="locale()" (ngModelChange)="changeLocale($event)">
        <option *ngFor="let loc of availableLocales" [value]="loc">
          {{ getLocaleName(loc) }}
        </option>
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  private router = inject(Router);

  localeInfo = useLocale({
    onLocaleChange: (newLocale) => {
      const currentPath = this.router.url;
      const localizedPath = getLocalizedUrl(currentPath, newLocale);
      this.router.navigateByUrl(localizedPath);
    },
  });

  locale = this.localeInfo.locale;
  availableLocales = this.localeInfo.availableLocales;

  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
```

### (Optionnel) Étape 9 : Modifier les attributs lang et dir de la balise HTML

Lorsque votre application prend en charge plusieurs langues, il est essentiel de mettre à jour les attributs `lang` et `dir` de la balise `<html>` pour qu'ils correspondent à la locale actuelle.

Vous pouvez créer un service pour gérer cela automatiquement.

```typescript fileName="src/app/services/i18n-html-attributes.service.ts"
import { Injectable, effect } from "@angular/core";
import { useLocale } from "angular-intlayer";
import { getHTMLTextDir } from "intlayer";

@Injectable({
  providedIn: "root",
})
export class I18nHtmlAttributesService {
  private localeInfo = useLocale();

  constructor() {
    effect(() => {
      const newLocale = this.localeInfo.locale();
      if (newLocale) {
        document.documentElement.lang = newLocale;
        document.documentElement.dir = getHTMLTextDir(newLocale);
      }
    });
  }

  // Cette méthode peut être appelée dans le composant racine de l'application pour s'assurer que le service est initialisé.
  init() {}
}
```

Ensuite, injectez et initialisez ce service dans votre composant principal `AppComponent` :

```typescript fileName="src/app/app.component.ts"
import { Component, inject } from "@angular/core";
// ... autres imports
import { I18nHtmlAttributesService } from "./services/i18n-html-attributes.service";

@Component({
  // ...
})
export class AppComponent {
  constructor() {
    inject(I18nHtmlAttributesService).init();
  }
}
```

### (Optionnel) Étape 10 : Création d'une directive de lien localisée

Pour garantir que la navigation de votre application respecte la langue actuelle, vous pouvez créer une directive personnalisée. Cette directive préfixe automatiquement les URL internes avec la langue courante.

```typescript fileName="src/app/directives/localized-link.directive.ts"
import { Directive, Input, HostBinding, inject } from "@angular/core";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "angular-intlayer";

@Directive({
  selector: "a[appLocalizedLink]",
  standalone: true,
})
export class LocalizedLinkDirective {
  @Input("href") originalHref: string = "";

  private localeInfo = useLocale();

  @HostBinding("href")
  get localizedHref(): string {
    const locale = this.localeInfo.locale();
    const isExternalLink = /^https?:\/\//.test(this.originalHref);
    if (isExternalLink || !this.originalHref) {
      return this.originalHref;
    }

    return getLocalizedUrl(this.originalHref, locale);
  }
}
```

Pour l'utiliser, ajoutez la directive `appLocalizedLink` à vos balises d'ancrage et assurez-vous de l'importer dans votre composant.

```typescript fileName="src/app/app.component.ts"
// ...
import { LocalizedLinkDirective } from "./directives/localized-link.directive";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [/*...,*/ LocalizedLinkDirective],
  template: ` <a href="/home" appLocalizedLink>Accueil</a> `,
})
export class AppComponent {}
```

### (Optionnel) Étape 11 : Rendre du Markdown

Intlayer prend en charge le rendu du contenu Markdown. Pour convertir du Markdown en HTML enrichi, vous pouvez intégrer [markdown-it](https://github.com/markdown-it/markdown-it).

Commencez par installer `markdown-it` :

```bash
npm install markdown-it
# et ses types
npm install -D @types/markdown-it
```

Ensuite, configurez le `INTLAYER_MARKDOWN_TOKEN` dans votre fichier `app.config.ts`.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { createIntlayerMarkdownProvider } from "angular-intlayer/markdown";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    createIntlayerMarkdownProvider((markdown) => md.render(markdown)),
  ],
};
```

Par défaut, Intlayer renverra le HTML rendu sous forme de chaîne de caractères. Si vous utilisez `[innerHTML]` pour le lier, soyez conscient des implications en matière de sécurité (XSS). Assurez-vous toujours que votre contenu provient d'une source fiable.

Pour des scénarios plus complexes, vous pouvez créer un pipe pour rendre le HTML en toute sécurité.

### Configurer TypeScript

Intlayer utilise l'augmentation de module pour bénéficier de TypeScript et renforcer votre base de code.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assurez-vous que votre configuration TypeScript inclut les types générés automatiquement.

```json5 fileName="tsconfig.json"
{
  // ... Vos configurations TypeScript existantes
  "include": [
    // ... Vos configurations TypeScript existantes
    ".intlayer/**/*.ts", // Inclure les types générés automatiquement
  ],
}
```

### Configuration Git

Il est recommandé d’ignorer les fichiers générés par Intlayer. Cela vous permet d’éviter de les commettre dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes dans votre fichier `.gitignore` :

```plaintext
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l’**extension officielle Intlayer pour VS Code**.

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
Cette extension offre :

- **Autocomplétion** pour les clés de traduction.
- **Détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l'utilisation de l'extension, consultez la [documentation de l'extension Intlayer pour VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Aller plus loin

Pour aller plus loin, vous pouvez implémenter l’[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

---
