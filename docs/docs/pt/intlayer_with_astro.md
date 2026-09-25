---
createdAt: 2024-03-07
updatedAt: 2026-09-21
title: "Astro i18n - Guia completo para traduzir seu aplicativo"
description: "Sem mais i18next. O guia 2026 para criar uma aplicação Astro multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
keywords:
  - internacionalização
  - documentação
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Adicionados os hooks useIntlayer / useLocale e o middleware Astro.locals ao astro-intlayer"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Atualizar o uso da API useIntlayer do Solid para acesso direto a propriedades"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Adicionado comando init"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Atualização da integração do Astro, configuração e uso"
author: aymericzip
---

# Traduza o seu site Astro com o Intlayer | Internacionalização (i18n)

<Tabs defaultTab="code">
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como internacionalizar sua aplicação com o Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

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

## Guia passo a passo para configurar o Intlayer no Astro

Confira o [modelo da aplicação](https://github.com/aymericzip/intlayer-astro-template) no GitHub.

<Steps>
<Step number={1} title="Instalar Dependências">

Instale os pacotes necessários usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> a flag `--interactive` é opcional. Use `intlayer-cli init` se você for um agente de IA.

> Este comando detectará seu ambiente e instalará os pacotes necessários. Por exemplo:

```bash packageManager="npm"
npm install intlayer astro-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
```

```bash packageManager="bun"
bun add intlayer astro-intlayer
```

- **intlayer**
  O pacote principal que fornece ferramentas de i18n para gerenciamento de configuração, traduções, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **astro-intlayer**
  Inclui o plugin de integração do Astro para integrar o Intlayer com o [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), um middleware que resolve o locale de cada requisição em `Astro.locals.intlayer`, e os hooks `useIntlayer` / `useDictionary` / `useLocale`. O mesmo caminho de importação resolve para a implementação de servidor no seu frontmatter `.astro` e para a de cliente (suportada por `vanilla-intlayer`) em blocos `<script>`.

</Step>
<Step number={2} title="Configurar seu Projeto">

### Arquitetura

Nesta arquitetura, a integração `intlayer()` registrada em `astro.config.ts` compila seus dicionários e adiciona um middleware que resolve a localidade de cada requisição e a expõe em `Astro.locals.intlayer`. As páginas ficam sob um segmento rest `src/pages/[...locale]/`, para que a localidade padrão seja servida sem prefixo e cada outra localidade tenha sua própria URL dedicada. Os arquivos `.astro` leem o conteúdo com os hooks `useIntlayer` / `useLocale` do `astro-intlayer`, e as declarações de conteúdo são colocadas ao lado dos seus componentes em `src/`.

```bash
.
├── src
│   ├── app.content.tsx               # App content declaration
│   ├── components
│   │   └── LocaleSwitcher.astro      # Locale switcher component
│   └── pages
│       ├── [...locale]
│       │   └── index.astro           # Localized page (rest param also serves the default locale)
│       ├── robots.txt.ts             # robots.txt endpoint
│       └── sitemap.xml.ts            # Localized sitemap endpoint
├── astro.config.ts                   # Astro config with the intlayer() integration
├── intlayer.config.ts
├── package.json
└── tsconfig.json
```

### Configuração

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

Adicione o plugin `intlayer` à sua configuração do Astro.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> O plugin de integração `intlayer()` é usado para integrar o Intlayer ao Astro. Ele garante a geração dos arquivos de declaração de conteúdo e os monitora em modo de desenvolvimento. Ele define variáveis de ambiente do Intlayer dentro da aplicação Astro e fornece aliases para otimizar o desempenho.

</Step>
<Step number={4} title="Declarar seu conteúdo">

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      pt: "Olá Mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> As declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que estejam incluídas no `contentDir` (por padrão `./src`) e correspondam à extensão do arquivo de declaração de conteúdo (por padrão `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para mais informações, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

</Step>
<Step number={5} title="Usar o conteúdo no Astro">

Consuma seus dicionários em arquivos `.astro` com os hooks exportados pelo `astro-intlayer`. Eles compartilham as assinaturas do `react-intlayer`: `useIntlayer("key")` retorna o conteúdo de um dicionário e `useLocale()` o locale atual, sem necessidade de passar argumentos.

O locale vem do middleware `astro-intlayer`, que a integração registra à frente do seu próprio `src/middleware.ts`. Ele o resolve para cada requisição, a partir do prefixo da URL, depois do locale persistido pelo cliente (cookie ou cabeçalho), depois de `Accept-Language`, e o armazena em `Astro.locals.intlayer`. Páginas pré-renderizadas usam apenas a URL, pois são renderizadas uma única vez para cada visitante.

Você também deve adicionar metadados de SEO como hreflang e links canônicos a cada página e incluir um seletor de idiomas para permitir que os usuários mudem de idioma.

```astro fileName="src/pages/index.astro"
---
import { useIntlayer, useLocale } from "astro-intlayer";
import {
  getLocalizedUrl,
  defaultLocale,
  localeMap,
  getHTMLTextDir,
} from "intlayer";
import LocaleSwitcher from "../components/LocaleSwitcher.astro";

// Locale resolvido pelo middleware (ex. /pt/about -> 'pt')
const { locale } = useLocale();

// Conteúdo do dicionário 'app' para este locale
const { title } = useIntlayer("app");
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Canonical link: Tells search engines which is the primary version of this page -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Tell Google about all localized versions -->
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

    <!-- x-default: Fallback for users in unmatched languages -->
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
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <h1>{title}</h1>
    </main>
  </body>
</html>
```

> `Astro.locals.intlayer` também expõe `locale`, `defaultLocale` e `availableLocales` aos seus próprios middlewares e endpoints. Passe um locale ou seletor como segundo argumento (`useIntlayer("app", "fr")`, `useIntlayer("faq", { item: 2 })`) para sobrescrever o locale da requisição em uma chamada.

</Step>
<Step number={6} title="Roteamento Localizado">

Crie segmentos de rota dinâmicos para servir páginas localizadas (por exemplo, `src/pages/[locale]/index.astro`):

```astro fileName="src/pages/[locale]/index.astro"
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

> **Nota sobre Configuração de Roteamento:**
> A estrutura de diretórios que você usa depende da configuração `middleware.routing` em seu `intlayer.config.ts`:
>
> - **`prefix-no-default` (padrão):** Mantém a locale padrão na raiz (sem prefixo) e prefixia as outras. Use `[...locale]` para capturar todos os casos.
> - **`prefix-all`:** Todos os URLs são prefixados com a locale. Você pode usar `[locale]` padrão se não precisar manipular a raiz separadamente.
> - **`search-param` ou `no-prefix`:** Nenhuma pasta de locale é necessária. A locale é manipulada via parâmetros de busca ou cookies.

</Step>
<Step number={7} title="Add a Locale Switcher">

A integração do Astro adiciona um middleware Vite que ajuda no roteamento sensível ao idioma e nas definições de ambiente durante o desenvolvimento. Você também pode criar links entre idiomas usando sua própria lógica ou ferramentas do `intlayer`, como o `getLocalizedUrl`.

```astro fileName="src/components/LocaleSwitcher.astro"
---
import { useLocale } from "astro-intlayer";
import { getLocaleName, getLocalizedUrl, getPathWithoutLocale } from "intlayer";

const { locale, availableLocales } = useLocale();
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<nav aria-label="Languages">
  <ul>
    {
      availableLocales.map((localeItem) => (
        <li key={localeItem} class="p-1">
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            data-locale={localeItem}
            aria-current={localeItem === locale ? "page" : undefined}
          >
            {getLocaleName(localeItem)}
          </a>
        </li>
      ))
    }
  </ul>
</nav>

<script>
  // No navegador, o mesmo import resolve para a implementação do cliente
  import { useLocale } from "astro-intlayer";
  import { getLocalizedUrl, type LocalesValues } from "intlayer";

  // Salva a escolha no cookie de locale e navega para a URL localizada
  const { setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });

  const localeLinks = document.querySelectorAll("[data-locale]");

  localeLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const locale = link.getAttribute("data-locale") as LocalesValues;

      event.preventDefault();
      setLocale(locale);
    });
  });
</script>

<style>
  nav {
    display: flex;
    gap: 1rem;
  }
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 0.5rem;
  }
  a[aria-current="page"] {
    font-weight: bold;
    text-decoration: underline;
  }
</style>
```

> **Nota sobre persistência:**
> `setLocale` do `useLocale` do lado do cliente salva a preferência de idioma do usuário em um cookie. Isso permite que o Intlayer lembre da escolha e redirecione automaticamente o usuário para seu idioma preferido em visitas futuras: páginas renderizadas sob demanda (um adaptador com `output: 'server'` ou `prerender = false`) são redirecionadas pelo middleware Intlayer antes que qualquer HTML seja enviado, enquanto páginas pré-renderizadas, servidas como arquivos estáticos, são redirecionadas por um pequeno script que a integração injeta em cada página. Defina `routing.enableProxy` como `false` para desativar ambos. No `astro dev`, o cookie é ignorado como fonte de redirecionamento, a menos que `routing.enableProxy` esteja definido como `true`, para que um cookie antigo não sequestre as páginas em que você está trabalhando.
>
> **Intercompatibilidade servidor / cliente:**
> `astro-intlayer` resolve para seus hooks de servidor no frontmatter (lendo `Astro.locals`) e para os hooks de cliente do `vanilla-intlayer` em blocos `<script>` e ilhas, com os mesmos nomes e formato de conteúdo. `setLocale` e `onChange` atuam apenas no cliente, chame `installIntlayer()` lá uma vez para inicializar o armazenamento do cliente. `astro-intlayer/client` expõe a entrada do cliente explicitamente.

</Step>
<Step number={8} title="Sitemap e Robots.txt">

Intlayer fornece utilitários para gerar sitemaps localizados e arquivos robots.txt dinamicamente.

#### Sitemap

O Intlayer vem com um gerador de sitemap integrado para ajudá-lo a criar um sitemap para sua aplicação facilmente. Ele manipula rotas localizadas e adiciona os metadados necessários para mecanismos de busca.

> O sitemap gerado pelo Intlayer suporta o namespace `xhtml:link` (Extensões XML Hreflang). Ao contrário dos geradores de sitemap padrão que apenas listam URLs brutas, o Intlayer cria automaticamente os links bidirecionais necessários entre todas as versões de idioma de uma página (por exemplo, `/about`, `/about?lang=fr` e `/about?lang=es`). Isso garante que os mecanismos de busca indexem corretamente e sirvam a versão correta do idioma para o público certo.

Crie `src/pages/sitemap.xml.ts` para gerar um sitemap que inclua todas as suas rotas localizadas.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, {
    siteUrl: "https://example.com",
  });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

Crie `src/pages/robots.txt.ts` para controlar o rastreamento de mecanismos de busca.

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
<Step number={9} title="Continue usando seu framework favorito">

Continue usando seu framework favorito para construir sua aplicação.

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_astro_react" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_astro_vue" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_astro_svelte" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_astro_solid" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_astro_preact" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_astro_lit" />
</TechGrid>

</Step>

<Step number={15} title="Extraia o conteúdo de seus componentes" isOptional={true}>

Se você tem uma codebase existente, transformar milhares de arquivos pode ser demorado.

Para facilitar esse processo, o Intlayer oferece um [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md) para transformar seus componentes e extrair o conteúdo.

Para configurá-lo, você pode adicionar uma seção `compiler` em seu arquivo `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Resto da sua configuração
  compiler: {
    /**
     * Indica se o compiler deve estar habilitado.
     */
    enabled: true,

    /**
     * Define o caminho dos arquivos de saída
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indica se os componentes devem ser salvos após serem transformados.
     *
     * - Se `true`, o compiler reescreverá o arquivo do componente no disco. Então a transformação será permanente, e o compiler ignorará a transformação para o próximo processo. Dessa forma, o compiler pode transformar a aplicação, e então pode ser removido.
     *
     * - Se `false`, o compiler injetará a chamada da função `useIntlayer()` no código apenas na saída da build, e manterá a codebase base intacta. A transformação será feita apenas na memória.
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
 <Tab value='Babel compiler'>

Compile sua aplicação para transformar seus componentes e extrair o conteúdo

```bash packageManager="npm"
npm run build # Ou npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Ou pnpm run dev
```

```bash packageManager="yarn"
yarn build # Ou yarn dev
```

```bash packageManager="bun"
bun run build # Ou bun run dev
```

 </Tab>
</Tabs>

</Step>

</Steps>

### Configuração do TypeScript

O Intlayer usa o aumento de módulos (module augmentation) para aproveitar o TypeScript, tornando sua base de código mais robusta.

![Preenchimento automático](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Erro de tradução](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

Certifique-se de que sua configuração do TypeScript inclua os tipos gerados automaticamente.

```json5 fileName="tsconfig.json"
{
  // ... sua configuração existente do TypeScript
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

### Aprofunde seu conhecimento

Se quiser saber mais, você também pode implementar o [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou usar o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) para externalizar seu conteúdo.

## Perguntas Frequentes

<FAQ>

<Question title="Quais são as diferentes soluções disponíveis para internacionalizar um site Astro?">

O Astro inclui uma opção `i18n` a nível de roteamento que lida com prefixos de locale e redirecionamentos, mas não gerencia o conteúdo em si, necessitando de uma camada de mensagens:

- **`i18n` integrado do Astro** com dicionários manuais em JSON ou TypeScript: sem dependências, porém sem tipagem, sem suporte a plurais e sem ferramentas auxiliares.
- **`i18next`** ou **`vue-i18n` / `svelte-i18n`** dentro de ilhas: uma biblioteca completa por framework de ilha, cada uma com seu próprio catálogo.
- **`Intlayer`**: uma camada única de conteúdo compartilhada entre páginas Astro e todos os frameworks de ilhas, compilada em tempo de build, totalmente tipada, com tradução por IA, editor visual e CMS.

O ganho específico no Astro é que o mesmo dicionário atende a uma página `.astro` e a ilhas em React, Vue, Svelte, Solid, Preact ou Lit, dispensando uma biblioteca de i18n por runtime de ilha. Consulte [por que Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md).

</Question>
<Question title="Quanto a i18n adiciona ao tamanho do bundle do Astro?">

Muito menos do que uma configuração baseada em namespaces, porque uma página nunca baixa um catálogo que não renderiza. As páginas Astro são renderizadas em tempo de build, portanto enviam HTML traduzido e nenhum dicionário; apenas as ilhas recebem dados. O compilador em tempo de build resolve as chamadas de conteúdo para as entradas exatas que o componente utiliza, e os [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md) dividem o restante por locale. Comparado às alternativas habituais, o Intlayer reduz o tamanho do bundle e da página em até 50%. Consulte [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md).

</Question>
<Question title="Posso migrar do i18next ou de dicionários manuais sem reescrever meus componentes?">

Em grande parte, sim. Siga o [guia de migração do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md) para migrar o conteúdo. Você também pode migrar gradualmente: o [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus catálogos JSON existentes como fonte de verdade e gera dicionários Intlayer a partir deles, mantendo ambas as camadas sincronizadas enquanto você migra componentes um a um.

</Question>
<Question title="Posso manter meus arquivos de tradução JSON existentes?">

Sim. O [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus arquivos `/messages/{locale}/{namespace}.json` como fonte de verdade e gera dicionários Intlayer a partir deles, em ambas as direções. O [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md) faz o mesmo para catálogos gettext, e os [arquivos por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md) permitem dividir o conteúdo por idioma em vez de agrupar todos os locales em um único arquivo.

</Question>
<Question title="Preciso mover meu conteúdo chave por chave?">

Não. Execute `npx intlayer extract` e o Intlayer lê seus componentes, extrai as strings voltadas para o usuário e escreve um arquivo `.content` ao lado de cada um, para que você revise um diff em vez de copiar strings para um catálogo uma a uma. O passo 15 deste guia detalha esse processo.

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
<Question title="O Intlayer funciona dentro de ilhas do Astro?">

Sim. O `astro-intlayer` gerencia o lado `.astro`, e cada framework de ilhas tem seu próprio binding, de modo que a ilha recebe o locale ativo diretamente da página sem precisar resolvê-lo novamente. Existem guias dedicados para [Astro + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_astro_react.md), [Astro + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_astro_vue.md) e [Astro + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_astro_svelte.md), entre outros.

</Question>
<Question title="O conteúdo traduzido é entregue como HTML estático?">

Sim. O Astro renderiza páginas em tempo de build por padrão, e o Intlayer resolve o conteúdo durante essa renderização, de modo que as páginas localizadas são HTML estático puro. Apenas as ilhas que precisam alternar o locale em tempo de execução recebem um dicionário, e apenas para o locale que estão renderizando.

</Question>
<Question title="Como configuro o roteamento localizado e um seletor de idiomas?">

Os passos 6 e 7 deste guia explicam isso. O `routing.mode` controla se o locale padrão recebe prefixo (`"prefix-no-default"`), se todos os locales recebem (`"prefix-all"`) ou se o locale fica fora do caminho da URL (`"no-prefix"` ou `"search-params"`). A função `getLocalizedUrl` reescreve o caminho atual para o idioma de destino, mantendo o usuário na mesma página ao trocar de idioma.

</Question>
<Question title="Como gero um sitemap localizado e tags hreflang?">

O passo 8 cobre o `sitemap.xml` e o `robots.txt`. A função `getMultilingualUrls` cria as alternativas de URL para cada locale declarado, incluindo a entrada `x-default`, permitindo que os mecanismos de busca entreguem a versão de idioma correta da página.

</Question>
<Question title="Como traduzo um site Astro automaticamente com IA?">

Execute `npx intlayer fill`. Ele preenche traduções ausentes com o LLM de sua escolha, utilizando seu próprio provedor e chave de API, e o argumento `--git-diff` limita o processo ao conteúdo modificado na branch. Consulte o [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md) e a [integração CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/CI_CD.md).

</Question>
<Question title="O Intlayer suporta plurais, gênero e conteúdo em Markdown?">

Sim: [formas plurais](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/plurial.md), [conteúdo baseado em gênero](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/gender.md), condições, [inserções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion.md) e [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md), o que é ideal no Astro para páginas de conteúdo longo. [Formatadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md) tratam números, datas e moedas.

</Question>
<Question title="Como tradutores podem editar o conteúdo sem tocar no código?">

Por meio do [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md), que roda em sua própria infraestrutura e permite editar textos diretamente no app em execução, ou pelo [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md), que externaliza o conteúdo para que ele possa ser alterado sem novos deploys.

</Question>
<Question title="O Intlayer é gratuito e de código aberto?">

Sim, sob a licença Apache 2.0, uso comercial incluído. O CMS hospedado é um serviço opcional pago que também pode ser [auto hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

</Question>

</FAQ>
