---
createdAt: 2025-11-20
updatedAt: 2026-08-30
title: "SvelteKit i18n - Guia completo para traduzir seu aplicativo"
description: "Sem mais i18next. O guia 2026 para criar uma aplicação SvelteKit multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - SvelteKit
  - JavaScript
  - SSR
slugs:
  - doc
  - environment
  - sveltekit
applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
applicationShowcase: https://intlayer-sveltekit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Atualizar o uso da API useIntlayer do Solid para acesso direto a propriedades"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Adicionar comando init"
  - version: 7.1.10
    date: 2025-11-20
    changes: "Histórico inicial"
author: aymericzip
---

# Traduza seu site SvelteKit usando Intlayer | Internacionalização (i18n)

<Tabs defaultTab="code">
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-sveltekit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-sveltekit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-sveltekit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Índice

<TOC/>

## Por que Intlayer em vez de alternativas?

Comparado com soluções principais como `svelte-i18n` ou `i18next`, Intlayer é uma solução que vem com otimizações integradas como:

<AccordionGroup>
<Accordion header="Cobertura completa do SvelteKit">

O Intlayer é otimizado para funcionar perfeitamente com o SvelteKit, oferecendo **roteamento multilíngue**, **suporte SSR** e todos os recursos necessários para dimensionar a internacionalização (i18n).

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

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação SvelteKit

Veja [Application Template](https://github.com/aymericzip/intlayer-sveltekit-template) no GitHub.

Para começar, crie um novo projeto SvelteKit. Aqui está a estrutura final que iremos criar:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

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
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer**: O pacote principal de i18n.
- **svelte-intlayer**: Fornece context providers e stores para Svelte/SvelteKit.
- **vite-intlayer**: O plugin do Vite para integrar as declarações de conteúdo com o processo de build.

</Step>

<Step number={2} title="Configuração do seu projeto">

Crie um arquivo de configuração na raiz do seu projeto:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

</Step>

<Step number={3} title="Integre o Intlayer na sua Configuração do Vite">

Atualize seu `vite.config.ts` para incluir o plugin Intlayer. Este plugin gerencia a transpiração dos seus arquivos de conteúdo.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // a ordem importa, Intlayer deve ser colocado antes do SvelteKit
});
```

</Step>

<Step number={4} title="Declare Seu Conteúdo">

Crie seus arquivos de declaração de conteúdo em qualquer lugar dentro da sua pasta `src` (por exemplo, `src/lib/content` ou junto aos seus componentes). Esses arquivos definem o conteúdo traduzível para sua aplicação usando a função `t()` para cada locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

</Step>

<Step number={5} title="Utilize o Intlayer em Seus Componentes">

Agora você pode usar a função `useIntlayer` em qualquer componente Svelte. Ela retorna um store reativo que se atualiza automaticamente quando a localidade muda. A função respeitará automaticamente a localidade atual (tanto durante SSR quanto na navegação no lado do cliente).

para acessar seu valor reativo (por exemplo, `$content.title`).

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section" corresponde à chave definida no Passo 4
  const content = useIntlayer("hero-section");
</script>

<!-- Renderizar conteúdo como conteúdo simples  -->
<h1>{$content.title}</h1>
<!-- Para renderizar o conteúdo editável usando o editor -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- Para renderizar o conteúdo como uma string -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

</Step>

<Step number={6} title="Configurar o roteamento" isOptional={true}>

Os passos a seguir mostram como configurar o roteamento baseado em locale no SvelteKit. Isso permite que suas URLs incluam o prefixo do locale (ex.: `/en/about`, `/fr/about`) para melhor SEO e experiência do usuário.

```bash
.
└─── src
    ├── app.d.ts                  # Definir o tipo de locale
    ├── hooks.server.ts           # Gerenciar o roteamento do locale
    ├── lib
    │   └── getLocale.ts          # Verificar o locale a partir do header, cookies
    ├── params
    │   └── locale.ts             # Definir o parâmetro do locale
    └── routes
        ├── [[locale=locale]]     # Envolver em um grupo de rotas para definir o locale
        │   ├── +layout.svelte    # Layout local para a rota
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # Layout raiz para fontes e estilos globais
```

</Step>

<Step number={7} title="Gerenciar a Detecção de Locale no Lado do Servidor">

No SvelteKit, o servidor precisa saber o locale do usuário para renderizar o conteúdo correto durante o SSR. Usamos `hooks.server.ts` para detectar o locale a partir da URL ou dos cookies.

Crie ou modifique `src/hooks.server.ts`:

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // Verifica se o caminho atual já começa com uma localidade (ex: /fr, /en)
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // Se NÃO houver localidade presente na URL (ex: usuário visita "/"), redireciona
  if (targetPathname !== pathname) {
    return new Response(undefined, {
      headers: { Location: targetPathname },
      status: 307, // Redirecionamento temporário
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", detectedLocale),
  });
};
```

Em seguida, crie um helper para obter a localidade do usuário a partir do evento da requisição:

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * Obtém a localidade do usuário a partir do evento de requisição.
 * Esta função é usada no hook `handle` em `src/hooks.server.ts`.
 *
 * Primeiro, tenta obter a localidade do armazenamento do Intlayer (cookies ou cabeçalhos personalizados).
 * Se a localidade não for encontrada, recorre à negociação "Accept-Language" do navegador.
 *
 * @param event - O evento de requisição do SvelteKit
 * @returns A localidade do usuário
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // Tenta obter a localidade do armazenamento do Intlayer (Cookies ou cabeçalhos)
  const storedLocale = getLocaleFromStorage({
    // Acesso aos cookies do SvelteKit
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // Acesso aos headers do SvelteKit
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // Recurso de fallback para a negociação "Accept-Language" do navegador
  const negotiatorHeaders: Record<string, string> = {};

  // Converte o objeto Headers do SvelteKit para um Record<string, string> simples
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // Verifica a localidade a partir do header `Accept-Language`
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // Retorna a localidade padrão se nenhuma correspondência for encontrada
  return defaultLocale;
};
```

> `getLocaleFromStorage` verificará o locale a partir do header ou cookie dependendo da sua configuração. Veja [Configuração](https://intlayer.org/doc/concept/configuration) para mais detalhes.

> A função `localeDetector` tratará o header `Accept-Language` e retornará a melhor correspondência.

Se o locale não estiver configurado, queremos retornar um erro 404. Para facilitar, podemos criar uma função `match` para verificar se o locale é válido:

```ts fileName="/src/params/locale.ts"import { defaultLocale, locales, type Locale } from "intlayer";
export const match = (param: Locale = defaultLocale): boolean =>
  locales.includes(param);
```

> **Nota:** Certifique-se de que seu arquivo `src/app.d.ts` inclua a definição do locale:
>
> ```typescript
> declare global {
>   namespace App {
>     interface Locals {
>       locale: import("intlayer").Locale;
>     }
>   }
> }
> ```

Para o arquivo `+layout.svelte`, podemos remover tudo, para manter apenas conteúdo estático, não relacionado à i18n:

```svelte fileName="src/+layout.svelte"
<script lang="ts">
	 import './layout.css';

    let { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
    /*  */
	}
</style>
```

Em seguida, crie uma nova página e layout dentro do grupo `[[locale=locale]]`:

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { defaultLocale, type Locale } from "intlayer";

export const prerender = true;

// Use o tipo genérico Load
export const load: Load = ({ params }) => {
  const locale: Locale = (params.locale as Locale) ?? defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from "svelte-intlayer";
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// Inicializar o Intlayer com a locale da rota
  $effect(() => {
      setupIntlayer(data.locale);
  });
	// Usar o dicionário de conteúdo do layout
	const layoutContent = useIntlayer('layout');
</script>

<Header />

<main>
	{@render children()}
</main>

<footer>
	<p>
		{$layoutContent.footer.prefix.value}{' '}
		<a href="https://svelte.dev/docs/kit">{$layoutContent.footer.linkLabel.value}</a>{' '}
		{$layoutContent.footer.suffix.value}
	</p>
</footer>

<style>
  /*  */
</style>
```

```ts fileName="src/routes/[[locale=locale]]/+page.ts"
export const prerender = true;
```

```svelte fileName="src/routes/[[locale=locale]]/+page.svelte"
<script lang="ts">
	import { useIntlayer } from "svelte-intlayer";

	// Usar o dicionário de conteúdo da home
	const homeContent = useIntlayer('home');
</script>

<svelte:head>
	<title>{$homeContent.title.value}</title>
</svelte:head>

<section>
	<h1>
		{$homeContent.title}
	</h1>
</section>

<style>
  /*  */
</style>
```

</Step>

<Step number={8} title="Links Internacionalizados" isOptional={true}>

Para SEO, é recomendado prefixar suas rotas com a localidade (ex: `/en/about`, `/fr/about`). Este componente automaticamente prefixa qualquer link com a localidade atual.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

  let { href = "" } = $props();
  const { locale } = useLocale();

  // Auxiliar para prefixar URL com a localidade atual
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

Se você usar `goto` do SvelteKit, pode usar a mesma lógica com `getLocalizedUrl` para navegar para a URL localizada:

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // Navega para /en/about ou /fr/about dependendo da localidade
```

</Step>

<Step number={9} title="Seletor de Idioma" isOptional={true}>

Para permitir que os usuários mudem de idioma, atualize a URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from "svelte-intlayer";
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (newLocale) => {
      const localizedPath = getLocalizedUrl($page.url.pathname, newLocale);
      goto(localizedPath);
    },
  });
</script>

<ul class="locale-list">
  {#each availableLocales as localeEl}
    <li>
      <a
        href={getLocalizedUrl($page.url.pathname, localeEl)}
        onclick={(e) => {
          e.preventDefault();
          setLocale(localeEl); // Vai definir a localidade na store e disparar onLocaleChange
        }}
        class:active={$locale === localeEl}
      >
        {getLocaleName(localeEl)}
      </a>
    </li>
  {/each}
</ul>

<style>
  /* */
</style>
```

</Step>

<Step number={10} title="Adicionar proxy backend" isOptional={true}>

Para adicionar um proxy backend à sua aplicação SvelteKit, você pode usar a função `intlayerProxy` fornecida pelo plugin `vite-intlayer`. Este plugin detectará automaticamente a melhor localidade para o usuário com base na URL, cookies e preferências de idioma do navegador.

> Desde o Intlayer v9, `intlayerProxy()` está agrupado diretamente no plugin `intlayer()` e habilitado por padrão através da opção `routing.enableProxy` (`true` por padrão). Registrá-lo separadamente, como mostrado abaixo, agora é opcional — é mantido para compatibilidade retroativa e para configurações que precisam controlar a ordem dos plugins. Configure `routing.enableProxy: false` para desativar. Consulte as [notas de lançamento da v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/releases/v9.md).

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    sveltekit(),
  ],],
});
```

</Step>

<Step number={11} title="Configurar o editor / CMS do intlayer" isOptional={true}>

Para configurar o editor do intlayer, você deve seguir a [documentação do editor intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md).

Para configurar o CMS do intlayer, você deve seguir a [documentação do CMS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

Para poder visualizar o seletor do editor intlayer, você deverá usar a sintaxe de componente no seu conteúdo intlayer.

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- Renderizar conteúdo como conteúdo simples -->
  <h1>{$content.title}</h1>

  <!-- Renderizar conteúdo como um componente (requerido pelo editor) -->
  {@const Component = $content.component}<Component />
</div>
```

</Step>

<Step number={1} title="Extrair o conteúdo dos seus componentes" isOptional={true}>

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

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Atualize seu `vite.config.ts` para incluir o plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
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
</Step>

</Steps>

### Configuração do Git

É recomendado ignorar os arquivos gerados pelo Intlayer.

```plaintext fileName=".gitignore"
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```

---

### Ir Além

- **Editor Visual**: Integre o [Editor Visual Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) para editar traduções diretamente pela interface.
- **CMS**: Externalize o gerenciamento do seu conteúdo usando o [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

## Perguntas Frequentes

<FAQ>

<Question title="Quais são as diferentes soluções disponíveis para internacionalizar um aplicativo SvelteKit?">

- **`svelte-i18n`** e **`typesafe-i18n`**: catálogos de mensagens baseados em stores, conectados manualmente nas funções load.
- **`Paraglide`**: mensagens compiladas com forte suporte a tipos, porém focado apenas na camada de mensagens.
- **`Intlayer`**: a solução mais avançada. O conteúdo pode ser declarado em qualquer lugar da sua base de código ([ao lado de cada componente ou centralizado](https://intlayer.org/blog/per-component-vs-centralized-i18n)) e compilado em tempo de build, com roteamento com suporte a locales, detecção de idioma no servidor, tradução por IA, editor visual e CMS.

No SvelteKit a diferença se destaca nas partes de servidor: detecção de locale nos hooks, links localizados e a integração com o editor já vêm prontos na biblioteca, sem precisar serem configurados do zero a cada projeto. Consulte [por que Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md) e o [benchmark Svelte i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/svelte.md).

</Question>

<Question title="Quanto a i18n adiciona ao tamanho do bundle do meu app SvelteKit?">

Muito menos do que uma configuração baseada em namespaces, porque uma página nunca baixa um catálogo que não renderiza. O markup renderizado no servidor (SSR) resolve suas mensagens diretamente no servidor, e o compilador em tempo de build substitui as chamadas `useIntlayer` pelas entradas exatas que o componente utiliza. Assim, chaves e idiomas não utilizados são descartados, e os [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md) dividem o restante por locale. Comparado às soluções tradicionais, o Intlayer reduz o tamanho do bundle e da página em até 50%. Consulte [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/svelte.md).

</Question>

<Question title="Posso migrar do svelte-i18n ou typesafe-i18n sem reescrever meus componentes?">

Em grande parte, sim. Siga o [guia de migração do Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/svelte-i18n.md) para migrar seu conteúdo. Você também pode migrar gradualmente: o [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus catálogos JSON existentes como fonte de verdade e gera dicionários Intlayer a partir deles, mantendo ambas as camadas sincronizadas enquanto você migra componentes um a um.

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

<Question title="O Intlayer funciona com renderização no servidor (SSR) do SvelteKit e pré-renderização?">

Sim. O passo 7 cobre a detecção de locale no servidor em `hooks.server.ts`, garantindo que a resposta HTML inicial já seja entregue no idioma correto, facilitando a indexação por motores de busca e rastreadores sociais. Rotas pré-renderizadas resolvem seu conteúdo em tempo de build.

</Question>

<Question title="Como configuro rotas localizadas e links internacionalizados?">

Os passos 6 e 8 cobrem isso. Um segmento de locale na árvore de rotas combinado com `getLocalizedUrl` para os links mantém a navegação dentro do idioma ativo, enquanto o `routing.mode` define se o idioma padrão recebe prefixo na URL. Consulte a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Question>

<Question title="Como construo um seletor de idiomas no Svelte?">

O passo 9 demonstra a implementação do componente. A store `useLocale` expõe o locale ativo, os idiomas disponíveis e uma função para atualizar a escolha e persistir o valor em cookie, enquanto `getLocalizedUrl` reescreve a URL atual permitindo que a troca de idioma mantenha o usuário na mesma página.

</Question>

<Question title="Como traduzo um aplicativo SvelteKit automaticamente com IA?">

Execute `npx intlayer fill`. Ele preenche traduções ausentes com o LLM de sua preferência, usando sua própria chave de API e provedor, e `--git-diff` restringe o processamento às alterações da branch atual. Consulte o [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md) e a [integração CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/CI_CD.md).

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
