---
createdAt: 2026-04-24
updatedAt: 2026-05-31
title: "Astro + Lit i18n - Guia completo para traduzir um aplicativo Astro + Lit"
description: "Sem mais i18next. O guia 2026 para criar uma aplicação Astro + Lit multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
keywords:
  - internacionalização
  - documentação
  - Intlayer
  - Astro
  - Lit
  - Web Components
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - lit
  applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Atualizar o uso da API useIntlayer do Solid para acesso direto a propriedades"
  - version: 8.7.7
    date: 2026-04-24
    changes: "Documentação inicial para Astro + Lit"
---

# Traduza o seu site Astro + Lit com o Intlayer | Internacionalização (i18n)

## Índice

<TOC/>

## Por que Intlayer em vez de alternativas?

Comparado com soluções principais como `astro-i18n` ou `i18next`, Intlayer é uma solução que vem com otimizações integradas como:

<AccordionGroup>

<Accordion header="Cobertura completa do Astro">

O Intlayer é otimizado para funcionar perfeitamente com o Astro, oferecendo **roteamento multilíngue**, **mapa do site** e todos os recursos necessários para dimensionar a internacionalização (i18n).

</Accordion>

<Accordion header="Tamanho do bundle">

Em vez de carregar arquivos JSON enormes em suas páginas, carregue apenas o conteúdo necessário. O Intlayer ajuda a **reduzir o tamanho do bundle e das páginas em até 50%**.

</Accordion>

<Accordion header="Manutenção">

Definir o escopo do conteúdo do seu aplicativo **facilita a manutenção** de aplicativos de grande escala. Você pode duplicar ou excluir uma única pasta de recursos sem o fardo mental de revisar toda a base de código de seu conteúdo. Além disso, o Intlayer é **totalmente tipado (fully typed)** para garantir a precisão do seu conteúdo.

</Accordion>

<Accordion header="Agente de IA">

A co-localização de conteúdo **reduz o contexto necessário** pelos Large Language Models (LLMs). O Intlayer também vem com um conjunto de ferramentas, como uma **CLI** para testar traduções ausentes,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, e **[habilidades do agente](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, para tornar a experiência do desenvolvedor (DX) ainda mais tranquila para os agentes de IA.

</Accordion>

<Accordion header="Automação">

Use a automação para traduzir seu pipeline de CI/CD usando o LLM de sua escolha às custas de seu provedor de IA. O Intlayer também oferece um **compilador** para automatizar a extração de conteúdo, bem como uma [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) para ajudar a **traduzir em segundo plano**.

</Accordion>

<Accordion header="Desempenho">

Conectar arquivos JSON enormes a componentes pode levar a problemas de desempenho e reatividade. O Intlayer otimiza o carregamento do seu conteúdo no momento da construção.

</Accordion>

<Accordion header="Escalonamento sem nenhum desenvolvedor">

Mais do que apenas uma solução i18n, o Intlayer fornece um **[editor visual] auto-hospedado(https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** e um **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** para ajudá-lo a gerenciar seu conteúdo multilíngue em **tempo real**, facilitando a colaboração com tradutores, redatores e outros membros da equipe. O conteúdo pode ser armazenado local e/ou remotamente.

</Accordion>
</AccordionGroup>

---

## Guia passo a passo para configurar o Intlayer no Astro + Lit

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como internacionalizar sua aplicação com o Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Confira o [modelo da aplicação](https://github.com/aymericzip/intlayer-astro-template) no GitHub.

<Steps>

<Step number={1} title="Instalar Dependências">

Instale os pacotes necessários usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install intlayer astro-intlayer lit lit-intlayer @astrojs/lit

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

bun x intlayer init
```

- **intlayer**
  O pacote principal que fornece ferramentas de i18n para gerenciamento de configuração, traduções, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **astro-intlayer**
  Inclui o plugin de integração do Astro para vincular o Intlayer ao [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), bem como o middleware para detectar o idioma preferido do usuário, gerenciar cookies e lidar com redirecionamentos de URL.

- **lit**
  Pacote principal do Lit para criar Web Components rápidos e leves.

- **lit-intlayer**
  Pacote para integrar o Intlayer em aplicações Lit. Ele fornece hooks baseados em `ReactiveController` (`useIntlayer`, `useLocale`, etc.) que instruem automaticamente o LitElement a renderizar novamente quando o idioma muda.

- **@astrojs/lit**
  Integração oficial do Astro que permite o uso de custom elements Lit dentro de páginas Astro.

</Step>

<Step number={2} title="Configurar seu Projeto">

Crie um arquivo de configuração para definir os idiomas da sua aplicação:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.PORTUGUESE,
      // Seus outros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Através deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamentos de middleware, nomes de cookies, localização e extensões de declarações de conteúdo, desativar logs do Intlayer no console e muito mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Step>

<Step number={3} title="Integrar o Intlayer na sua configuração do Astro">

Adicione o plugin `intlayer` e a integração do Lit à sua configuração do Astro.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import lit from "@astrojs/lit";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), lit()],
});
```

> O plugin de integração `intlayer()` é usado para integrar o Intlayer ao Astro. Ele garante a geração dos arquivos de declaração de conteúdo e os monitora em modo de desenvolvimento. Ele define variáveis de ambiente do Intlayer dentro da aplicação Astro e fornece aliases para otimizar o desempenho.

> A integração `lit()` permite o uso de custom elements Lit dentro de páginas Astro.

</Step>

<Step number={4} title="Declarar seu conteúdo">

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```typescript fileName="src/components/lit/app.content.ts"
import { t, type Dictionary } from "intlayer";

const litDemoContent = {
  key: "lit-demo",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      pt: "Olá Mundo",
    }),
    description: t({
      en: "Welcome to my multilingual Astro + Lit site.",
      fr: "Bienvenue sur mon site Astro + Lit multilingue.",
      es: "Bienvenido a mi sitio Astro + Lit multilingüe.",
      pt: "Bem-vindo ao meu site Astro + Lit multilíngue.",
    }),
  },
} satisfies Dictionary;

export default litDemoContent;
```

> As declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que estejam incluídas no `contentDir` (por padrão `./src`) e correspondam à extensão do arquivo de declaração de conteúdo (por padrão `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Para mais informações, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

</Step>

<Step number={5} title="Usar o conteúdo no Astro">

Você pode consumir os dicionários diretamente nos seus arquivos `.astro` usando os ajudantes principais exportados do `intlayer`. Você também deve adicionar metadados de SEO (como hreflang e links canônicos) a cada página. Os custom elements Lit são importados via um `<script>` no cliente e colocados no corpo da página.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getHTMLTextDir,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { greeting } = getIntlayer("lit-demo", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{greeting}</title>

    <!-- Link Canônico -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Links Hreflang -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <!-- Custom element Lit - recebe a localidade detectada pelo servidor como uma propriedade -->
    <lit-demo locale={locale}></lit-demo>
  </body>
</html>

<script>
  import "../../components/lit/LitDemo";
</script>
```

> Se você quiser usar seu conteúdo em un atributo de `string`, como `alt`, `title`, `href`, `aria-label`, etc., você pode usar o valor da função, como:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> **Nota sobre a configuração de roteamento:**
> A estrutura de diretórios que você usa depende da configuração `middleware.routing` no `intlayer.config.ts`:
>
> - **`prefix-no-default` (padrão):** mantém o idioma padrão na raiz (sem prefixo) e adiciona prefixos aos outros. Use `[...locale]` para capturar todos os casos.
> - **`prefix-all`:** todos os URLs recebem um prefixo de idioma. Você pode usar o padrão `[locale]` se não precisar lidar com a raiz separadamente.
> - **`search-param` ou `no-prefix`:** não são necessários diretórios de idioma. O idioma é tratado via parâmetros de consulta ou cookies.

</Step>

<Step number={6} title="Criar um componente Custom Element de Lit">

Crie um custom element Lit. Chame `installIntlayer` no `connectedCallback` usando o atributo `locale` do servidor para inicializar o singleton de tradução no lado do cliente.

```typescript fileName="src/components/lit/LitDemo.ts"
import { LitElement, html } from "lit";
import { installIntlayer, useIntlayer, useLocale } from "lit-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

class LitDemo extends LitElement {
  static properties = {
    locale: { type: String },
  };

  locale: LocalesValues = "en" as LocalesValues;

  private _content = useIntlayer(this, "lit-demo");
  private _localeCtrl = useLocale(this, {
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  override connectedCallback() {
    super.connectedCallback();
    // Inicializa com a localidade detectada pelo servidor
    installIntlayer({ locale: this.locale as any });
  }

  override render() {
    const { greeting, description } = this._content;
    const {
      locale: currentLocale,
      availableLocales,
      setLocale,
    } = this._localeCtrl;

    return html`
      <div>
        <h1>${greeting}</h1>
        <p>${description}</p>
        <!-- Seletor de idioma renderizado dentro do LitElement -->
        <div class="locale-switcher">
          <span class="switcher-label">Mudar idioma:</span>
          <div class="locale-buttons">
            ${availableLocales.map(
              (localeItem) => html`
                <button
                  class="locale-btn ${localeItem === currentLocale
                    ? "active"
                    : ""}"
                  ?disabled=${localeItem === currentLocale}
                  @click=${() => setLocale(localeItem)}
                >
                  <span class="ls-own-name">${getLocaleName(localeItem)}</span>
                  <span class="ls-current-name"
                    >${getLocaleName(localeItem, currentLocale)}</span
                  >
                  <span class="ls-code">${localeItem.toUpperCase()}</span>
                </button>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("lit-demo", LitDemo);
```

> O atributo `locale` é passado da página Astro (detecção no servidor) e usado para inicializar o `installIntlayer` no `connectedCallback`, definindo o idioma inicial para todos os hooks `ReactiveController` dentro do elemento.

> `useIntlayer` é registrado como um `ReactiveController`. Ele solicita automaticamente uma nova renderização do elemento quando o idioma muda, portanto, nenhuma lógica de inscrição adicional é necessária.

</Step>

<Step number={7} title="Adicionar um Seletor de Idioma">

A funcionalidade de troca de idioma está integrada diretamente no método `render()` do custom element Lit (veja o passo 6 acima). Ela usa o `useLocale` do `lit-intlayer` e navega para a URL localizada quando um usuário seleciona um novo idioma:

```typescript fileName="src/components/lit/LitDemo.ts"
// Dentro da classe LitElement, após a configuração do useLocale no passo 6:

private _localeCtrl = useLocale(this, {
  onLocaleChange: (newLocale: LocalesValues) => {
    // Navega para a URL localizada ao mudar de idioma
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});

override render() {
  const { locale: currentLocale, availableLocales, setLocale } = this._localeCtrl;

  return html`
    <div class="locale-switcher">
      <span class="switcher-label">Mudar idioma:</span>
      <div class="locale-buttons">
        ${availableLocales.map(
          (localeItem) => html`
            <button
              class="locale-btn ${localeItem === currentLocale ? "active" : ""}"
              ?disabled=${localeItem === currentLocale}
              @click=${() => setLocale(localeItem)}
            >
              <span class="ls-own-name">${getLocaleName(localeItem)}</span>
              <span class="ls-current-name">${getLocaleName(localeItem, currentLocale)}</span>
              <span class="ls-code">${localeItem.toUpperCase()}</span>
            </button>
          `
        )}
      </div>
    </div>
  `;
}
```

> **Nota sobre a reatividade do Lit:**
> `useLocale` retorna um `ReactiveController`. Quando o `setLocale` é chamado, o controlador solicita automaticamente uma nova renderização, atualizando o estado do botão ativo sem a necessidade de manipulação manual do DOM.

> **Nota sobre persistência:**
> O uso de `onLocaleChange` para redirecionar via `window.location.href` garante que a nova URL linguística seja visitada, permitindo que o middleware do Intlayer defina o cookie de idioma e lembre da preferência do usuário em visitas futuras.

</Step>

<Step number={8} title="Sitemap e Robots.txt">

O Intlayer oferece utilitários para criar dinamicamente o seu sitemap localizado e os arquivos robots.txt.

#### Sitemap

O Intlayer vem com um gerador de sitemap integrado para ajudá-lo a criar facilmente um sitemap para sua aplicação. Ele cuida das rotas localizadas e adiciona os metadados necessários para os mecanismos de busca.

> O sitemap gerado pelo Intlayer suporta o namespace `xhtml:link` (Hreflang XML Extensions). Ao contrário dos geradores de sitemap padrão que apenas listam URLs brutos, o Intlayer cria automaticamente os links bidirecionais necessários entre todas as versões de idioma de uma página (por exemplo, `/about`, `/about?lang=fr` e `/about?lang=es`). Isso garante que os mecanismos de busca indexem e sirvam corretamente a versão de idioma certa para o público certo.

Crie `src/pages/sitemap.xml.ts` para gerar um sitemap que inclua todas as suas rotas localizadas.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

Crie `src/pages/robots.txt.ts` para controlar o rastreamento dos motores de busca.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

</Step>

<Step number={15} title="Extrair o conteúdo dos seus componentes" isOptional={true}>

Se você tiver uma base de código existente, transformar milhares de arquivos pode ser demorado.

Para facilitar esse processo, o Intlayer propõe um [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) / [extrator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md) para transformar seus componentes e extrair o conteúdo.

Para configurá-lo, você pode adicionar uma seção `compiler` no seu arquivo `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Resto da sua configuração
  compiler: {
    /**
     * Indica se o compilador deve ser ativado.
     */
    enabled: true,

    /**
     * Define o caminho dos arquivos de saída
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indica se os componentes devem ser salvos após serem transformados. Dessa forma, o compilador pode ser executado apenas uma vez para transformar o aplicativo e depois removido.
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

<Tabs>
 <Tab value='Comando de extração'>

Execute o extrator para transformar seus componentes e extrair o conteúdo

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Compilador Babel'>

Atualize seu `vite.config.ts` para incluir o plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adiciona o plugin do compilador
  ],
});
```

```bash packageManager="npm"
npm run build # Ou npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

---

</Step>

</Steps>

### Configuração do TypeScript

O Intlayer usa o aumento de módulos (module augmentation) para aproveitar o TypeScript, tornando sua base de código mais robusta. Se você usar a sintaxe de decoradores, certifique-se de habilitar `experimentalDecorators` nas suas opções de compilador.

![Preenchimento automático](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Erro de tradução](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Certifique-se de que sua configuração do TypeScript inclua os tipos gerados automaticamente.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ...
    experimentalDecorators: true,
    useDefineForClassFields: false, // Necessário para suporte a decoradores no Lit
  },
  "include": [
    // ... sua configuração existente do TypeScript
    ".intlayer/**/*.ts", // Incluir tipos gerados automaticamente
  ],
}
```

### Configuração do Git

Recomenda-se ignorar os arquivos gerados pelo Intlayer. Isso evita committá-los no seu repositório Git.

Para fazer isso, adicione as seguintes instruções ao seu arquivo `.gitignore`:

```bash
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```

### Extensão do VS Code

Para melhorar sua experiência de desenvolvimento com o Intlayer, você pode instalar a **extensão oficial do Intlayer para VS Code**.

[Instalação pelo VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão fornece:

- **Preenchimento automático** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Visualização inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais informações sobre o uso da extensão, consulte a [documentação da Extensão do VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Aprofunde seu conhecimento

Se quiser saber mais, você também pode implementar o [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou usar o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) para externalizar seu conteúdo.
