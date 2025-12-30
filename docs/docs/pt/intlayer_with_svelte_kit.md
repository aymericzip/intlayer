---
createdAt: 2025-11-20
updatedAt: 2025-11-20
title: Como traduzir sua aplicação SvelteKit – guia i18n 2025
description: Descubra como tornar seu site SvelteKit multilíngue. Siga a documentação para internacionalizar (i18n) e traduzir usando Server-Side Rendering (SSR).
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
history:
  - version: 7.1.10
    date: 2025-11-20
    changes: Histórico inicial
---

# Traduza seu site SvelteKit usando Intlayer | Internacionalização (i18n)

## Índice

<TOC/>

## O que é o Intlayer?

**Intlayer** é uma biblioteca inovadora e open-source de internacionalização (i18n) projetada para simplificar o suporte multilíngue em aplicações web modernas. Ela funciona perfeitamente com as capacidades de Server-Side Rendering (SSR) do **SvelteKit**.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte ao TypeScript** com tipos gerados automaticamente.
- **Aproveitar o SSR do SvelteKit** para uma internacionalização amigável ao SEO.

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação SvelteKit

Para começar, crie um novo projeto SvelteKit. Aqui está a estrutura final que iremos criar:

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-sveltekit-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

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

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bunx intlayer init
```

- **intlayer**: O pacote principal de i18n.
- **svelte-intlayer**: Fornece context providers e stores para Svelte/SvelteKit.
- **vite-intlayer**: O plugin do Vite para integrar as declarações de conteúdo com o processo de build.

### Passo 2: Configuração do seu projeto

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

### Passo 3: Integre o Intlayer na sua Configuração do Vite

Atualize seu `vite.config.ts` para incluir o plugin Intlayer. Este plugin gerencia a transpiração dos seus arquivos de conteúdo.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // a ordem importa, Intlayer deve ser colocado antes do SvelteKit
});
```

### Passo 4: Declare Seu Conteúdo

Crie seus arquivos de declaração de conteúdo em qualquer lugar dentro da sua pasta `src` (por exemplo, `src/lib/content` ou junto aos seus componentes). Esses arquivos definem o conteúdo traduzível para sua aplicação usando a função `t()` para cada locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
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

### Passo 5: Utilize o Intlayer em Seus Componentes

### Passo 5: Utilize o Intlayer em Seus Componentes

Agora você pode usar a função `useIntlayer` em qualquer componente Svelte. Ela retorna uma store reativa que atualiza automaticamente quando o locale muda. A função respeitará automaticamente o locale atual (tanto durante SSR quanto na navegação do lado do cliente).

> **Nota:** `useIntlayer` retorna uma store do Svelte, então você precisa usar o prefixo `---
> createdAt: 2025-11-20
> updatedAt: 2025-11-20
> title: Como traduzir sua aplicação SvelteKit – guia i18n 2025
> description: Descubra como tornar seu site SvelteKit multilíngue. Siga a documentação para internacionalizar (i18n) e traduzir usando Server-Side Rendering (SSR).
> keywords:

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
  history:
- version: 7.1.10
  date: 2025-11-20
  changes: Histórico inicial

---

# Traduza seu site SvelteKit usando Intlayer | Internacionalização (i18n)

## Índice

<TOC/>

## O que é o Intlayer?

**Intlayer** é uma biblioteca inovadora e open-source de internacionalização (i18n) projetada para simplificar o suporte multilíngue em aplicações web modernas. Ela funciona perfeitamente com as capacidades de Server-Side Rendering (SSR) do **SvelteKit**.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte ao TypeScript** com tipos gerados automaticamente.
- **Aproveitar o SSR do SvelteKit** para uma internacionalização amigável ao SEO.

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação SvelteKit

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

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bunx intlayer init
```

- **intlayer**: O pacote principal de i18n.
- **svelte-intlayer**: Fornece context providers e stores para Svelte/SvelteKit.
- **vite-intlayer**: O plugin do Vite para integrar as declarações de conteúdo com o processo de build.

### Passo 2: Configuração do seu projeto

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

### Passo 3: Integre o Intlayer na sua Configuração do Vite

Atualize seu `vite.config.ts` para incluir o plugin Intlayer. Este plugin gerencia a transpiração dos seus arquivos de conteúdo.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // a ordem importa, Intlayer deve ser colocado antes do SvelteKit
});
```

### Passo 4: Declare Seu Conteúdo

Crie seus arquivos de declaração de conteúdo em qualquer lugar dentro da sua pasta `src` (por exemplo, `src/lib/content` ou junto aos seus componentes). Esses arquivos definem o conteúdo traduzível para sua aplicação usando a função `t()` para cada locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
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

### Passo 5: Utilize o Intlayer em Seus Componentes

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
<h1><svelte:component this={$content.title} /></h1>
<!-- Para renderizar o conteúdo como uma string -->
<div aria-label={$content.title.value}></div>
```

### (Opcional) Passo 6: Configurar o roteamento

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

### Passo 7: Gerenciar a Detecção de Locale no Lado do Servidor (Hooks)

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

> `getLocaleFromStorage` verificará o locale a partir do header ou cookie dependendo da sua configuração. Veja [Configuração](https://intlayer.org/doc/configuration) para mais detalhes.

> A função `localeDetector` tratará o header `Accept-Language` e retornará a melhor correspondência.

Se o locale não estiver configurado, queremos retornar um erro 404. Para facilitar, podemos criar uma função `match` para verificar se o locale é válido:

```ts fileName="/src/params/locale.ts"
import { configuration, type Locale } from "intlayer";

export const match = (
  param: Locale = configuration.internationalization.defaultLocale
): boolean => {
  return configuration.internationalization.locales.includes(param);
};
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
import { configuration, type Locale } from "intlayer";

export const prerender = true;

// Use o tipo genérico Load
export const load: Load = ({ params }) => {
  const locale: Locale =
    (params.locale as Locale) ??
    configuration.internationalization.defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from 'svelte-intlayer';
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
	import { useIntlayer } from 'svelte-intlayer';

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

### (Opcional) Passo 8: Links Internacionalizados

Para SEO, é recomendado prefixar suas rotas com a localidade (ex: `/en/about`, `/fr/about`). Este componente automaticamente prefixa qualquer link com a localidade atual.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from 'svelte-intlayer';

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

### (Opcional) Passo 9: Seletor de Idioma

Para permitir que os usuários mudem de idioma, atualize a URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from 'svelte-intlayer';
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

### (Opcional) Passo 10: Adicionar proxy backend

Para adicionar um proxy backend à sua aplicação SvelteKit, você pode usar a função `intlayerProxy` fornecida pelo plugin `vite-intlayer`. Este plugin detectará automaticamente a melhor localidade para o usuário com base na URL, cookies e preferências de idioma do navegador.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerProxy(), sveltekit()],
});
```

### (Opcional) Passo 11: Configurar o editor / CMS do intlayer

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
  <svelte:component this={$content.component} />
</div>
```

### Configuração do Git

É recomendado ignorar os arquivos gerados pelo Intlayer.

```plaintext fileName=".gitignore"
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```

---

### Ir Além

Para poder visualizar o seletor do editor intlayer, você terá que usar a sintaxe de componente no seu conteúdo intlayer.

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- Renderizar conteúdo como conteúdo simples -->
  <h1>{$content.title}</h1>

  <!-- Renderizar conteúdo como um componente (requerido pelo editor) -->
  <svelte:component this={$content.component} />
</div>
```

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
