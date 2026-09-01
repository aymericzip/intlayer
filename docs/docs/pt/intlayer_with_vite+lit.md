---
createdAt: 2026-03-23
updatedAt: 2026-08-30
title: "Vite + Lit i18n - Guia completo para traduzir seu aplicativo"
description: "Sem mais i18next. O guia 2026 para criar uma aplicação Vite + Lit multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Vite
  - Lit
  - Web Components
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-lit
applicationTemplate: https://github.com/aymericzip/intlayer-vite-lit-template
applicationShowcase: https://intlayer-vite-lit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Atualizar o uso da API useIntlayer do Solid para acesso direto a propriedades"
  - version: 8.4.10
    date: 2026-03-23
    changes: "Histórico inicial"
author: aymericzip
---

# Traduza o seu website Vite e Lit usando Intlayer | Internacionalização (i18n)

<Tabs defaultTab="code">
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-lit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-lit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-lit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Tabela de Conteúdos

<TOC/>

## Por que Intlayer em vez de alternativas?

Comparado com soluções principais como `lit-localize` ou `i18next`, Intlayer é uma solução que vem com otimizações integradas como:

<AccordionGroup>
<Accordion header="Cobertura total iluminada">

O Intlayer é otimizado para funcionar perfeitamente com o Lit, oferecendo **escopo de conteúdo em nível de componente da Web**, **suporte a TypeScript** e todos os recursos necessários para dimensionar a internacionalização (i18n).

</Accordion>

<Accordion header="Tamanho do bundle">

Em vez de carregar arquivos JSON enormes em suas páginas, carregue apenas o conteúdo necessário. O Intlayer ajuda a **reduzir o tamanho do bundle e das páginas em até 50%**.

</Accordion>

<Accordion header="Manutenção">

Definir o escopo do conteúdo do seu aplicativo **facilita a manutenção** de aplicativos de grande escala. Você pode duplicar ou excluir uma única pasta de recursos sem o fardo mental de revisar toda a base de código de seu conteúdo. Além disso, o Intlayer é **totalmente tipado (fully typed)** para garantir a precisão do seu conteúdo.

</Accordion>

<Accordion header="Agente de IA">

A co-localização de conteúdo **reduz o contexto necessário** pelos Large Language Models (LLMs). O Intlayer também vem com um conjunto de ferramentas, como uma **CLI** para testar traduções ausentes,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)**, e **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**, para tornar a experiência do desenvolvedor (DX) ainda mais tranquila para os agentes de IA.

</Accordion>

<Accordion header="Automação">

Use a automação para traduzir seu pipeline de CI/CD usando o LLM de sua escolha às custas de seu provedor de IA. O Intlayer também oferece um **compilador** para automatizar a extração de conteúdo, bem como uma [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) para ajudar a **traduzir em segundo plano**.

</Accordion>

<Accordion header="Desempenho">

Conectar arquivos JSON enormes a componentes pode levar a problemas de desempenho e reatividade. O Intlayer otimiza o carregamento do seu conteúdo no momento da construção.

</Accordion>

<Accordion header="Escalonamento sem nenhum desenvolvedor">

Mais do que apenas uma solução i18n, o Intlayer fornece um **[editor visual] auto-hospedado(https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)** e um **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)** para ajudá-lo a gerenciar seu conteúdo multilíngue em **tempo real**, facilitando a colaboração com tradutores, redatores e outros membros da equipe. O conteúdo pode ser armazenado local e/ou remotamente.

</Accordion>
</AccordionGroup>

---

Veja [Application Template](https://github.com/aymericzip/intlayer-vite-lit-template) no GitHub.

## Guia Passo-a-Passo para Configurar o Intlayer numa Aplicação Vite e Lit

<Steps>

<Step number={1} title="Instalar Dependências">

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> a flag `--interactive` é opcional. Use `intlayer-cli init` se você for um agente de IA.

> Este comando detectará seu ambiente e instalará os pacotes necessários. Por exemplo:

```bash packageManager="npm"
npm install intlayer lit-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer lit-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer lit-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer lit-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gestão de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **lit-intlayer**
  O pacote que integra o Intlayer com aplicações Lit. Fornece hooks baseados em `ReactiveController` (`useIntlayer`, `useLocale`, etc.) para que os LitElements sejam renderizados novamente de forma automática quando o idioma muda.

- **vite-intlayer**
  Inclui o plugin Vite para integrar o Intlayer com o [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), bem como middleware para detetar o idioma preferido do utilizador, gerir cookies e lidar com redirecionamento de URL.

</Step>

<Step number={2} title="Configuração do seu projeto">

Crie um ficheiro de configuração para configurar os idiomas da sua aplicação:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Os seus outros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Através deste ficheiro de configuração, pode configurar URLs localizados, redirecionamento de middleware, nomes de cookies, a localização e extensão das suas declarações de conteúdo, desativar os logs do Intlayer na consola e muito mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Step>

<Step number={3} title="Integrar o Intlayer na sua Configuração Vite">

Adicione o plugin intlayer na sua configuração.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> O plugin Vite `intlayer()` é usado para integrar o Intlayer com o Vite. Garante a construção dos ficheiros de declaração de conteúdo e monitoriza-os em modo de desenvolvimento. Define variáveis de ambiente do Intlayer dentro da aplicação Vite. Adicionalmente, fornece pseudónimos para otimizar o desempenho.

</Step>

<Step number={4} title="Inicializar o Intlayer no seu ponto de entrada">

Chame `installIntlayer()` **antes** de quaisquer elementos personalizados serem registados para que o singleton global de idioma esteja pronto quando o primeiro elemento se ligar.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "lit-intlayer";

// Deve ser chamado antes de qualquer LitElement ser ligado ao DOM.
installIntlayer();

// Importe e registe os seus elementos personalizados.
import "./my-element.js";
```

Se também usar declarações de conteúdo `md()` (Markdown), instale também o renderizador de markdown:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "lit-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./my-element.js";
```

</Step>

<Step number={5} title="Declarar o Seu Conteúdo">

Crie e gira as suas declarações de conteúdo para armazenar traduções:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Lit",
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "litLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Lit logo",
        "fr": "Logo Lit",
        "es": "Logo Lit"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is {{count}}",
        "fr": "le compte est {{count}}",
        "es": "el recuento es {{count}}"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Lit logos to learn more",
        "fr": "Cliquez sur les logos Vite et Lit pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Lit para obtener más información"
      }
    }
  }
}
```

> As suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que sejam incluídas no diretório `contentDir` (por padrão, `./src`) e correspondam à extensão do ficheiro de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

</Step>

<Step number={6} title="Utilizar o Intlayer no seu LitElement">

Use o `useIntlayer` dentro de um `LitElement`. Ele retorna um proxy `ReactiveController` que ativa automaticamente re-renderizações sempre que o idioma ativo muda - não é necessária configuração extra.

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { useIntlayer } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;

  // useIntlayer regista-se como um ReactiveController.
  // O elemento é renderizado novamente de forma automática quando o idioma muda.
  private content = useIntlayer(this, "app");

  override render() {
    const { content } = this;

    return html`
      <h1>${content.title}</h1>

      <img src="/vite.svg" alt=${content.viteLogo.value} />
      <img src="/lit.svg" alt=${content.litLogo.value} />

      <button @click=${() => this.count++}>
        ${content.count({ count: this.count })}
      </button>

      <p>${content.readTheDocs}</p>
    `;
  }
}
```

> Quando precisar da string traduzida num atributo HTML nativo (ex: `alt`, `aria-label`, `title`), chame `.value` no nó folha:
>
> ```typescript
> html`<img alt=${content.viteLogo.value} />`;
> html`<img alt=${content.viteLogo.toString()} />`;
> html`<img alt=${String(content.viteLogo)} />`;
> ```

</Step>

<Step number={7} title="Alterar o idioma do seu conteúdo" isOptional={true}>

Para alterar o idioma do seu conteúdo, use o método `setLocale` exposto pelo controlador `useLocale`.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

</Step>

<Step number={8} title="Renderizar conteúdo Markdown e HTML" isOptional={true}>

O Intlayer suporta declarações de conteúdo `md()` e `html()`. No Lit, a saída compilada é injetada como HTML bruto através da diretiva `unsafeHTML`.

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/my-element.ts` and save to test **HMR**",
        fr: "Modifiez `src/my-element.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/my-element.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

Renderize o HTML compilado no seu elemento:

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { useIntlayer } from "lit-intlayer";
import { compileMarkdown } from "lit-intlayer/markdown";

@customElement("my-element")
export class MyElement extends LitElement {
  private content = useIntlayer(this, "app");

  override render() {
    return html`
      <div class="edit-note">
        ${unsafeHTML(compileMarkdown(String(this.content.editNote)))}
      </div>
    `;
  }
}
```

> [!TIP]
> `String(content.editNote)` chama `toString()` no `IntlayerNode`, que retorna a string Markdown bruta. Passe-a para `compileMarkdown` para obter uma string HTML, e depois renderize-a com a diretiva `unsafeHTML` do Lit.

</Step>

<Step number={9} title="Adicionar Localized Routing à sua aplicação" isOptional={true}>

Para criar rotas únicas para cada idioma (útil para SEO), pode usar um router do lado do cliente juntamente com os ajudantes `localeMap` / `localeFlatMap` do Intlayer, e o plugin Vite `intlayerProxy` para deteção de idioma do lado do servidor.

Primeiro, adicione o `intlayerProxy` à sua configuração Vite:

> Note que para usar o `intlayerProxy` em produção, precisa de mover o `vite-intlayer` de `devDependencies` para `dependencies`.

> Desde o Intlayer v9, `intlayerProxy()` está agrupado diretamente no plugin `intlayer()` e habilitado por padrão através da opção `routing.enableProxy` (`true` por padrão). Registrá-lo separadamente conforme mostrado abaixo agora é opcional — é mantido para compatibilidade com versões anteriores e para configurações que precisam controlar a ordem dos plugins. Defina `routing.enableProxy: false` para desativar. Veja as [notas de lançamento v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/releases/v9.md).

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={10} title="Alterar o URL quando o idioma muda" isOptional={true}>

Para atualizar o URL do navegador quando o idioma muda, use o `useRewriteURL` juntamente com o seletor de idioma:

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale, useRewriteURL } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  // Re-escreve automaticamente o URL atual quando o idioma muda.
  private _rewriteURL = useRewriteURL(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

</Step>

<Step number={11} title="Alternar os Atributos de Idioma e Direção HTML" isOptional={true}>

Atualize os atributos `lang` e `dir` da tag `<html>` para corresponderem ao idioma atual para acessibilidade e SEO.

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  private locale = useLocale(this, {
    onLocaleChange: (loc) => {
      document.documentElement.lang = loc;
      document.documentElement.dir = getHTMLTextDir(loc);
    },
  });

  override render() {
    return html`<!-- o seu conteúdo -->`;
  }
}
```

</Step>

<Step number={12} title="Extrair o conteúdo dos seus componentes" isOptional={true}>

Se tiver uma base de código existente, transformar milhares de ficheiros pode ser demorado.

Para facilitar este processo, o Intlayer propõe um [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) / [extrator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md) para transformar os seus componentes e extrair o conteúdo.

Para configurá-lo, pode adicionar uma secção `compiler` no seu ficheiro `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Restante da sua configuração
  compiler: {
    /**
     * Indica se o compilador deve estar habilitado.
     */
    enabled: true,

    /**
     * Define o caminho dos ficheiros de saída
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indica se os componentes devem ser guardados após serem transformados.
     * Dessa forma, o compilador pode ser executado apenas uma vez para transformar a app, e depois pode ser removido.
     */
    saveComponents: false,

    /**
     * Prefixo da chave do dicionário
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

</Step>

</Steps>

### (Opcional) Sitemap e robots.txt (geração no build)

A Intlayer expõe utilitários - `generateSitemap` e `getMultilingualUrls` - para formatar um `sitemap.xml` multilíngue e um `robots.txt` prontos para crawlers e os gravar automaticamente em `public/`. Normalmente corre um pequeno script Node **antes** do Vite (por exemplo hooks npm `predev` / `prebuild`) para que os ficheiros existam no build ou no servidor de desenvolvimento.

#### Sitemap

O gerador de sitemaps da Intlayer respeita as suas línguas e inclui os metadados habituais.

> O sitemap suporta o espaço de nomes `xhtml:link` (hreflang). Em vez de listar apenas URLs soltas, a Intlayer liga de forma bidireccional todas as versões localizadas de cada página (por exemplo `/about`, `/fr/about` ou `/about?lang=fr` consoante o modo de rotas).

#### Robots.txt

Use `getMultilingualUrls` para que as regras `Disallow` cubram todas as variantes localizadas de caminhos sensíveis.

#### 1. Criar `generate-seo.mjs` na raiz do projeto

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

O pacote `intlayer` tem de estar instalado. Defina `SITE_URL` no ambiente em produção (por exemplo na CI).

> Prefira `generate-seo.mjs` para ESM no Node. Se usar `generate-seo.js`, garanta `"type": "module"` no `package.json` ou execute o Node com ESM.

#### 2. Executar o script antes do Vite

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Ajuste os comandos se usar pnpm ou yarn. Também pode invocar o script a partir da CI ou de outro passo do pipeline.

### Configurar TypeScript

Certifique-se de que a sua configuração TypeScript inclui os tipos autogerados.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

> `experimentalDecorators` e `useDefineForClassFields: false` são exigidos pelo Lit para suporte a decoradores.

### Configuração Git

Recomenda-se ignorar os ficheiros gerados pelo Intlayer. Isso permite-lhe evitar submetê-los para o seu repositório Git.

Para fazer isso, pode adicionar as seguintes instruções ao seu ficheiro `.gitignore`:

```bash
# Ignorar os ficheiros gerados pelo Intlayer
.intlayer
```

### Extensão VS Code

Para melhorar a sua experiência de desenvolvimento com o Intlayer, pode instalar a **Extensão oficial Intlayer VS Code**.

[Instalar a partir do VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão fornece:

- **Autocompletar** para chaves de tradução.
- **Deteção de erros em tempo real** para traduções em falta.
- **Pré-visualizações inline** de conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Ir Mais Longe

Para ir mais longe, pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar o seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

## Perguntas Frequentes

<FAQ>

<Question title="Quais são as diferentes soluções disponíveis para internacionalizar um aplicativo Vite e Lit?">

O Vite não impõe nenhuma solução de i18n, portanto a escolha vem do ecossistema Lit:

- **`@lit/localize`**: a opção oficial, baseada na extração XLIFF e um bundle compilado por locale, exigindo o modo de tempo de execução para trocar de idioma dinamicamente.
- **Dicionário manual** importado em cada elemento: sem dependências, mas sem tipagem nem ferramentas auxiliares.
- **`Intlayer`**: a solução mais avançada. O conteúdo pode ser declarado em qualquer lugar da sua base de código ([ao lado de cada componente ou centralizado](https://intlayer.org/blog/per-component-vs-centralized-i18n)) e compilado pelo plugin Vite em tempo de build, totalmente tipado, com tradução por IA, editor visual e CMS.

O ganho específico no Vite é que as traduções são resolvidas e submetidas a tree-shaking em tempo de compilação em vez de serem buscadas como JSON em tempo de execução, de modo que uma página envia apenas as entradas que renderiza. Consulte [por que Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md) e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md).

</Question>

<Question title="Quanto a i18n adiciona ao tamanho do bundle do meu app Lit?">

Muito menos do que uma configuração baseada em namespaces, porque uma página nunca baixa um catálogo que não renderiza. O compilador em tempo de build substitui as chamadas `useIntlayer` pelas entradas exatas do dicionário usadas pelo componente, descartando chaves e idiomas não utilizados, enquanto os [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md) dividem o restante por locale. Comparado às alternativas tradicionais, o Intlayer reduz o tamanho do bundle e da página em até 50%. Consulte [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md).

</Question>

<Question title="Posso migrar do @lit/localize sem reescrever meus elementos?">

Em grande parte, sim. Siga a [visão geral dos adaptadores de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) para migrar o conteúdo. Você também pode migrar gradualmente: o [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus catálogos JSON existentes como fonte de verdade e gera dicionários Intlayer a partir deles, mantendo ambas as camadas sincronizadas enquanto você migra elementos individualmente.

</Question>

<Question title="Posso manter meus arquivos de tradução JSON existentes?">

Sim. O [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus arquivos `/messages/{locale}/{namespace}.json` como fonte de verdade e gera dicionários Intlayer a partir deles, em ambas as direções. O [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md) faz o mesmo para catálogos gettext, e os [arquivos por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md) permitem dividir o conteúdo por idioma em vez de agrupar todos os locales em um único arquivo.

</Question>

<Question title="Preciso mover meu conteúdo chave por chave?">

Não. Execute `npx intlayer extract` e o Intlayer lê seus componentes, extrai as strings voltadas para o usuário e escreve um arquivo `.content` ao lado de cada um, para que você revise um diff em vez de copiar strings para um catálogo uma a uma. O passo 12 deste guia detalha esse processo.

Para um fluxo de trabalho totalmente automatizado, o [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) faz o mesmo em tempo de build: ele analisa seu código JSX, TSX, Vue e Svelte a cada alteração, gera os dicionários e os mantém sincronizados via hot module replacement, dispensando completamente a manutenção manual de chaves.

Dois limites são importantes considerar: o compilador opera por análise estática, de modo que strings criadas apenas em tempo de execução (como códigos de erro de API ou campos dinâmicos de CMS) ficam fora de alcance. Além disso, ele precisa distinguir texto visível de lógicas de aplicação como `className="active"` ou status codes, exigindo algumas anotações em bases de código extensas. O [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md) evita ambos mantendo você no controle.

</Question>

<Question title="Quais ferramentas de editor e agentes de IA estão disponíveis?">

Cinco ferramentas, todas opcionais:

- **[Extensão VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)**: navegue de uma chave `useIntlayer` diretamente para o arquivo de conteúdo que a declara, extraia conteúdo de um componente e execute build, fill, test, push e pull pela paleta de comandos ou pela aba dedicada do Intlayer.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**: a mesma inteligência em qualquer editor compatível com LSP, com ir para definição, localizar referências, pré-visualizações de valores traduzidos ao passar o mouse, autocompletar e alertas para chaves não declaradas. Também resolve chamadas de `i18next`, `react-i18next`, `next-intl` e `use-intl`, facilitando a migração.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)**: expõe a documentação e a CLI do Intlayer para Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT, permitindo que os assistentes respondam com base na documentação atualizada e executem comandos como `intlayer fill`.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**: habilidades focadas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, além de uma por framework, ensinando ao agente suas regras de roteamento e tipos de nós.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md)**: a regra `no-raw-text` identifica strings hardcoded, com regras adicionais para chaves estáticas e conteúdo não utilizado.

</Question>

<Question title="Como uso conteúdo traduzido em um componente Lit?">

Acesse o conteúdo dentro do método `render` do seu `LitElement` por meio da integração Intlayer, conforme exibido no passo 6. Mudar o locale dispara uma atualização direta dos elementos que o consomem, portanto alternar o idioma não requer o recarregamento da página nem o envio de um segundo bundle.

</Question>

<Question title="O Intlayer funciona com o servidor de desenvolvimento do Vite e hot reload?">

Sim. O plugin Vite `intlayer()` observa seus arquivos `.content.ts` e recompila os dicionários afetados ao salvar, permitindo que as edições apareçam sem reiniciar o servidor de desenvolvimento. Além disso, as definições de tipo são atualizadas no mesmo instante para manter o autocompletar sincronizado.

</Question>

<Question title="Como configuro o roteamento localizado?">

Os passos 9 e 10 cobrem as rotas localizadas e a reescrita da URL na mudança de locale. O `routing.mode` define o formato da URL: `"prefix-no-default"` (o padrão, `/about` e `/pt/about`), `"prefix-all"`, `"no-prefix"` (resolvido por cookie, cabeçalho ou domínio) ou `"search-params"` (`/about?locale=pt`). Consulte a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Question>

<Question title="Como suporto idiomas da direita para a esquerda como árabe ou hebraico?">

O passo 11 aborda isso. A função `getHTMLTextDir` retorna `ltr`, `rtl` ou `auto` para um determinado locale, permitindo que você vincule `lang` e `dir` no elemento raiz a partir do locale ativo e deixe as propriedades CSS lógicas cuidarem do restante do layout.

</Question>

<Question title="Como gerencio metadados de SEO em um app Vite renderizado no cliente?">

Defina os atributos `lang` e `dir` no elemento `html` a partir do locale ativo e emita tags `hreflang` alternativas para cada locale declarado usando `getMultilingualUrls`, incluindo a entrada `x-default`. Para páginas com alta necessidade de indexação rápida por buscadores, prefira uma solução pré-renderizada ou renderizada no servidor.

</Question>

<Question title="Como traduzo o app automaticamente com IA?">

Execute `npx intlayer fill`. Ele preenche traduções pendentes com o LLM de sua preferência, usando seu provedor e chave de API próprios, e a opção `--git-diff` limita o processo ao conteúdo modificado na branch atual. Consulte o [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md) e a [integração CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/CI_CD.md).

</Question>

<Question title="O Intlayer suporta plurais, gênero e rich text?">

Sim: [formas plurais](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/plurial.md), [conteúdo baseado em gênero](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/gender.md), condições, [inserções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md) e [formatadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md) para números, datas e moedas.

</Question>

<Question title="Como tradutores podem editar o conteúdo sem tocar no código?">

Por meio do [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md), que roda em sua própria infraestrutura e permite editar textos diretamente no app em execução, ou pelo [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md), que externaliza o conteúdo para que ele possa ser alterado sem novos deploys.

</Question>

<Question title="O Intlayer é gratuito e de código aberto?">

Sim, sob a licença Apache 2.0, uso comercial incluído. O CMS hospedado é um serviço opcional pago que também pode ser [auto hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

</Question>

</FAQ>
