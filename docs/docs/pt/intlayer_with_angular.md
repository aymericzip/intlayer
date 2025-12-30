---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Como traduzir seu Angular – guia i18n 2026
description: Descubra como tornar seu site com Angular multilíngue. Siga a documentação para internacionalizá-lo (i18n) e traduzi-lo.
keywords:
  - Internacionalização
  - Documentação
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
    changes: Adicionar comando init
  - version: 5.5.10
    date: 2025-06-29
    changes: Histórico inicial
---

# Traduza seu Angular com Intlayer | Internacionalização (i18n)

> Este pacote está em desenvolvimento. Veja a [issue](https://github.com/aymericzip/intlayer/issues/116) para mais informações. Demonstre seu interesse pelo Intlayer para Angular curtindo a issue

<!-- Veja o [Modelo de Aplicação](https://github.com/aymericzip/intlayer-angular-template) no GitHub. -->

## O que é o Intlayer?

**Intlayer** é uma biblioteca inovadora e open-source de internacionalização (i18n) projetada para simplificar o suporte multilíngue em aplicações web modernas.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte ao TypeScript** com tipos gerados automaticamente, melhorando o autocompletar e a detecção de erros.
- **Aproveitar recursos avançados**, como detecção e troca dinâmica de localidade.

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação Angular

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando npm:

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

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md), transpiração e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md).

- **angular-intlayer**
  O pacote que integra o Intlayer com aplicações Angular. Ele fornece provedores de contexto e hooks para internacionalização no Angular.

- **@intlayer/webpack**
  O pacote que integra o Intlayer com o Webpack. Ele é usado pelo Angular CLI para construir arquivos de declaração de conteúdo e monitorá-los no modo de desenvolvimento.

### Passo 2: Configuração do seu projeto

Crie um arquivo de configuração para configurar os idiomas da sua aplicação:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Seus outros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

O pacote que integra o Intlayer com o Webpack. Ele é usado pelo Angular CLI para construir arquivos de declaração de conteúdo e monitorá-los no modo de desenvolvimento.

### Passo 2: Configuração do seu projeto

Crie um arquivo de configuração para configurar os idiomas da sua aplicação:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Seus outros idiomas
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
      // Seus outros idiomas
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
      // Seus outros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Através deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamento via middleware, nomes de cookies, a localização e extensão das suas declarações de conteúdo, desabilitar logs do Intlayer no console, e muito mais. Para uma lista completa dos parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

### Passo 3: Integre o Intlayer na Configuração do Seu Angular

Para integrar o Intlayer com o Angular CLI, você tem duas opções dependendo do seu builder: `esbuild` ou `webpack`.

#### Opção 1: Usando esbuild (Recomendado)

Primeiro, modifique seu `angular.json` para usar o builder customizado esbuild. Atualize a configuração de `build`:

> Através deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamento de middleware, nomes de cookies, a localização e extensão das suas declarações de conteúdo, desabilitar logs do Intlayer no console e muito mais. Para uma lista completa dos parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

### Passo 3: Integre o Intlayer na sua Configuração Angular

Para integrar o Intlayer com o Angular CLI, você tem duas opções dependendo do seu builder: `esbuild` ou `webpack`.

#### Opção 1: Usando esbuild (Recomendado)

Primeiro, modifique seu `angular.json` para usar o builder customizado esbuild. Atualize a configuração `build`:

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
```

> Certifique-se de substituir `your-app-name` pelo nome real do seu projeto no `angular.json`.

Em seguida, crie um arquivo `esbuild/intlayer-plugin.ts` na raiz do seu projeto:

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
      logger("Plugin Intlayer para esbuild iniciado", {
        level: "info",
      });

      if (build.initialOptions.watch && !isWatching) {
        logger("Modo watch ativado. Iniciando watcher...", {
          level: "info",
        });
        watch(configuration);
        isWatching = true;
      }

      try {
        await prepareIntlayer(configuration);
      } catch (error) {
        logger(`Erro no plugin Intlayer para esbuild: ${error}`, {
          level: "error",
        });
      }
    });
  },
};

export default intlayer;
```

> O `intlayer` para esbuild garante que o Intlayer seja preparado antes do início da build e monitora alterações no modo de desenvolvimento.

#### Opção 2: Usando Webpack

Primeiro, modifique seu `angular.json` para usar o construtor customizado do Webpack. Atualize as configurações de `build` e `serve`:

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

> Certifique-se de substituir `your-app-name` pelo nome real do seu projeto no `angular.json`.

Em seguida, crie um arquivo `webpack.config.js` na raiz do seu projeto:

> O `IntlayerWebpackPlugin` é usado para integrar o Intlayer com o Webpack. Ele garante a construção dos arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Define variáveis de ambiente do Intlayer dentro da aplicação. Além disso, fornece aliases para otimizar o desempenho.

### Passo 4: Declare Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

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
      pt: "Parabéns! Seu aplicativo está em execução. 🎉",
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
    exploreDocs: t({
      pt: "Explore a Documentação",
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      pt: "Aprenda com Tutoriais",
      en: "Learn with Tutorials",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "Documentação CLI",
    angularLanguageService: t({
      pt: "Serviço de Linguagem Angular",
      en: "Angular Language Service",
      fr: "Service de Langage Angular",
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

> Suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que estejam incluídas no diretório `contentDir` (por padrão, `./src`). E correspondam à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md).

### Passo 5: Utilize o Intlayer no Seu Código

Para utilizar os recursos de internacionalização do Intlayer em toda a sua aplicação Angular, você precisa usar a função `useIntlayer` dentro de um componente. Essa função, disponível no `angular-intlayer`, fornece acesso às suas traduções como sinais reativos.

`IntlayerProvider` está registrado na raiz da aplicação, portanto, você não precisa adicioná-lo aos provedores do seu módulo.

Acesse seus dicionários de conteúdo na classe do seu componente:

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

O conteúdo do Intlayer é retornado como um `Signal`, então você acessa os valores chamando o signal no seu template: `content().title`.

### (Opcional) Passo 6: Alterar o idioma do seu conteúdo

Para alterar o idioma do seu conteúdo, você pode usar a função `setLocale` fornecida pela função `useLocale`. Isso permite definir o locale da aplicação e atualizar o conteúdo de acordo.

Crie um componente para alternar entre idiomas:

```typescript fileName="src/app/components/locale-switcher.component.ts"
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

  // Expor getLocaleName para o template
  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
```

Então, use este componente no seu `app.component.ts`:

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
        <img src="/vite.svg" class="logo" alt="Logotipo do Vite" />
      </a>
      <a href="https://angular.dev/" target="_blank">
        <img
          src="/assets/angular.svg"
          class="logo angular"
          alt="Logotipo do Angular"
        />
      </a>
    </div>
    <app-hello-world />
  `,
})
export class AppComponent {}
```

### (Opcional) Passo 7: Adicione roteamento localizado à sua aplicação

Adicionar roteamento localizado em uma aplicação Angular envolve usar o Angular Router com prefixos de localidade. Isso cria rotas únicas para cada idioma, o que é útil para SEO.

Exemplo:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Primeiro, certifique-se de que o `@angular/router` está instalado.

Em seguida, crie uma configuração de roteador que lide com roteamento baseado em localidade em `app.routes.ts`.

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

Em seguida, você precisa fornecer o roteador no seu `app.config.ts`.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

### (Opcional) Passo 8: Alterar a URL quando o idioma mudar

Para atualizar automaticamente a URL quando o usuário mudar o idioma, você pode modificar o componente `LocaleSwitcher` para usar o Router do Angular:

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

### (Opcional) Passo 9: Alterar os atributos de idioma e direção do HTML

Quando sua aplicação suporta múltiplos idiomas, é fundamental atualizar os atributos `lang` e `dir` da tag `<html>` para corresponder ao locale atual.

Você pode criar um serviço para fazer isso automaticamente.

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

  // Este método pode ser chamado no componente raiz da aplicação para garantir que o serviço seja inicializado.
  init() {}
}
```

Em seguida, injete e inicialize este serviço no seu componente principal `AppComponent`:

```typescript fileName="src/app/app.component.ts"
import { Component, inject } from "@angular/core";
// ... outros imports
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

### (Opcional) Passo 10: Criando uma Diretiva de Link Localizado

Para garantir que a navegação da sua aplicação respeite o idioma atual, você pode criar uma diretiva personalizada. Essa diretiva adiciona automaticamente o prefixo do idioma atual às URLs internas.

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

Para usá-lo, adicione a diretiva `appLocalizedLink` às suas tags de âncora e certifique-se de importá-la no seu componente.

```typescript fileName="src/app/app.component.ts"
// ...
import { LocalizedLinkDirective } from "./directives/localized-link.directive";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [/*...,*/ LocalizedLinkDirective],
  template: ` <a href="/home" appLocalizedLink>Home</a> `,
})
export class AppComponent {}
```

### (Opcional) Passo 11: Renderizar Markdown

O Intlayer suporta a renderização de conteúdo Markdown. Para converter Markdown em HTML enriquecido, você pode integrar o [markdown-it](https://github.com/markdown-it/markdown-it).

Primeiro, instale o `markdown-it`:

```bash
npm install markdown-it
# e seus tipos
npm install -D @types/markdown-it
```

Em seguida, configure o `INTLAYER_MARKDOWN_TOKEN` no seu `app.config.ts`.

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
  providers: [provideIntlayerMarkdown(md)],
};
```

Por padrão, o Intlayer retornará o HTML renderizado como uma string. Se você usar `[innerHTML]` para vinculá-lo, esteja ciente das implicações de segurança (XSS). Sempre certifique-se de que seu conteúdo seja de uma fonte confiável.

Para cenários mais complexos, você pode criar um pipe para renderizar o HTML com segurança.

### Configurar o TypeScript

O Intlayer usa a ampliação de módulos para aproveitar os benefícios do TypeScript e tornar sua base de código mais robusta.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Certifique-se de que sua configuração do TypeScript inclua os tipos gerados automaticamente.

```json5 fileName="tsconfig.json"
{
  // ... Suas configurações existentes do TypeScript
  "include": [
    // ... Suas configurações existentes do TypeScript
    ".intlayer/**/*.ts", // Incluir os tipos gerados automaticamente
  ],
}
```

### Configuração do Git

É recomendável ignorar os arquivos gerados pelo Intlayer. Isso permite evitar que eles sejam commitados no seu repositório Git.

Para isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```

### Extensão do VS Code

Para melhorar sua experiência de desenvolvimento com o Intlayer, você pode instalar a **Extensão oficial do Intlayer para VS Code**.

[Instalar no VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
Esta extensão oferece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Visualizações inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Ir Além

Para ir além, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

---
