---
createdAt: 2025-08-06
updatedAt: 2026-08-06
title: "Solid Start i18n - Guia completo para traduzir seu aplicativo"
description: "Sem mais i18next. O guia de 2026 para criar uma aplicação SolidStart multilíngue (i18n). Roteamento de localidade renderizado no servidor, hreflang, mapa do site e tradução assistida por IA."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - SolidStart
  - Solid
  - i18n
  - TypeScript
  - Locale Routing
  - Sitemap
slugs:
  - doc
  - environment
  - solid-start
applicationTemplate: https://github.com/aymericzip/intlayer-solid-start-template
history:
  - version: 9.1.3
    date: 2025-08-06
    changes: "Initial history"
author: aymericzip
---

# Traduza seu site SolidStart usando Intlayer | Internacionalização (i18n)

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">

<iframe title="A melhor solução i18n para Vite e Solid? Descubra o Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como internacionalizar sua aplicação com o Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Índice

<TOC/>

Este guia cobre uma aplicação SolidStart **renderizada no servidor**: a detecção de localidade acontece na requisição, as páginas são renderizadas no servidor no idioma correto e os sinais de `<html lang>`, `hreflang` e mapa do site (sitemap) que os motores de busca precisam são emitidos no lado do servidor.

## Por que Intlayer em vez de alternativas?

Comparado a soluções principais como `@solid-primitives/i18n` ou `i18next`, o Intlayer é uma solução que vem com otimizações integradas, tais como:

<AccordionGroup>

<Accordion header="Cobertura completa do Solid">

O Intlayer é otimizado para funcionar perfeitamente com o Solid, oferecendo **escopo de conteúdo no nível do componente**, **traduções reativas** e todos os recursos necessários para dimensionar a internacionalização (i18n).

</Accordion>

<Accordion header="Tamanho do bundle">

Em vez de carregar arquivos JSON enormes em suas páginas, carregue apenas o conteúdo necessário. O Intlayer ajuda a **reduzir o tamanho do seu bundle e das páginas em até 50%**.

</Accordion>

<Accordion header="Manutenibilidade">

Definir o escopo do conteúdo do seu aplicativo **facilita a manutenção** para aplicações de grande escala. Você pode duplicar ou excluir uma única pasta de recurso sem o fardo mental de revisar toda a sua base de código de conteúdo. Além disso, o Intlayer é **totalmente tipado** para garantir a precisão do seu conteúdo.

</Accordion>

<Accordion header="Agente de IA">

A co-localização de conteúdo **reduz o contexto necessário** pelos Grandes Modelos de Linguagem (LLMs). O Intlayer também vem com um conjunto de ferramentas, como uma **CLI** para testar traduções ausentes, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** e **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**, para tornar a experiência do desenvolvedor (DX) ainda mais tranquila para agentes de IA.

</Accordion>

<Accordion header="Automação">

Use a automação para traduzir em seu pipeline de CI/CD usando o LLM de sua escolha ao custo do seu provedor de IA. O Intlayer também oferece um **compilador** para automatizar a extração de conteúdo, bem como uma [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) para ajudar a **traduzir em segundo plano**.

</Accordion>

<Accordion header="Desempenho">

Conectar arquivos JSON massivos a componentes pode levar a problemas de desempenho e reatividade. O Intlayer otimiza o carregamento do seu conteúdo no momento do build.

</Accordion>

<Accordion header="Escalonamento com não desenvolvedores">

Mais do que apenas uma solução de i18n, o Intlayer fornece um **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) auto-hospedado** e um **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** para ajudá-lo a gerenciar seu conteúdo multilíngue em **tempo real**, tornando a colaboração com tradutores, redatores e outros membros da equipe perfeita. O conteúdo pode ser armazenado localmente e/ou remotamente.

</Accordion>
</AccordionGroup>

---

## Guia passo a passo para configurar o Intlayer em uma aplicação SolidStart

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
npm install intlayer solid-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer solid-intlayer vite-intlayer
```

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **solid-intlayer**

  O pacote que integra o Intlayer com aplicações Solid. Ele fornece provedores de contexto e hooks para a internacionalização no Solid.

- **vite-intlayer**

  Inclui o plugin do Vite para integrar o Intlayer ao [empacotador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), bem como o manipulador de roteamento de localidade que detecta a localidade preferida do usuário, gerencia cookies e lida com o redirecionamento de URL.

> `vite-intlayer` é uma preocupação do lado do servidor aqui, não apenas em tempo de build: ele fornece o manipulador de requisições executado pelo servidor Nitro do SolidStart. Mantê-lo em `dependencies` é o padrão seguro — você só deve movê-lo para `devDependencies` se implantar o diretório `.output` compilado, onde o Nitro insere o manipulador inline.

</Step>

<Step number={2} title="Configuração do seu projeto">

Crie um arquivo de configuração para configurar os idiomas do seu aplicativo:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Suas outras localidades
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
  },
};

export default config;
```

Com `prefix-no-default`, a localidade padrão é servida a partir de URLs sem prefixo:

```plaintext
/            /about          → Inglês   (localidade padrão)
/fr          /fr/about       → Francês
/es          /es/about       → Espanhol
```

> Através deste arquivo de configuração, você pode configurar URLs localizados, redirecionamento de middleware, nomes de cookies, a localização e extensão das suas declarações de conteúdo, desativar logs do Intlayer no console e muito mais. Para obter uma lista completa dos parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>

<Step number={3} title="Integrar o Intlayer na sua configuração do Vite">

Adicione o plugin do Intlayer à sua configuração:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
```

> O plugin `intlayer()` do Vite compila seus arquivos de declaração de conteúdo, os observa no modo de desenvolvimento e define as variáveis de ambiente do Intlayer dentro da aplicação. Ele também fornece aliases que otimizam o desempenho.

### O roteamento de localidade vem com o plugin

O SolidStart roda no [Nitro](https://nitro.build), e o `intlayer()` registra seu manipulador de roteamento de localidade diretamente no pipeline do servidor Nitro (através da opção `routing.enableProxy`, `true` por padrão). Nada mais para configurar: em um servidor compilado, cada requisição é inspecionada antes de chegar ao roteador, e

- a localidade é lida do prefixo da URL, depois do cookie `INTLAYER_LOCALE`, e depois do cabeçalho `Accept-Language`;
- uma URL sem prefixo é redirecionada para sua contraparte localizada quando a localidade resolvida não for a padrão (`/` → `/fr`);
- uma URL com prefixo redundante é redirecionada de volta para sua forma canônica (`/en/about` → `/about`);
- o cookie de localidade é gravado de volta na resposta.

</Step>

<Step number={4} title="Declarar Seu Conteúdo">

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="src/contents/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world!",
      fr: "Bonjour le monde !",
      es: "¡Hola mundo!",
    }),
    metaTitle: "SolidStart + Intlayer",
    metaDescription: t({
      en: "A SolidStart application internationalized with Intlayer.",
      fr: "Une application SolidStart internationalisée avec Intlayer.",
      es: "Una aplicación SolidStart internacionalizada con Intlayer.",
    }),
    documentation: t({
      en: "Visit start.solidjs.com to learn how to build SolidStart apps.",
      fr: "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
      es: "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/contents/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home-page",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello world!",
        "fr": "Bonjour le monde !",
        "es": "¡Hola mundo!"
      }
    },
    "metaTitle": "SolidStart + Intlayer",
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "A SolidStart application internationalized with Intlayer.",
        "fr": "Une application SolidStart internationalisée avec Intlayer.",
        "es": "Una aplicación SolidStart internacionalizada con Intlayer."
      }
    },
    "documentation": {
      "nodeType": "translation",
      "translation": {
        "en": "Visit start.solidjs.com to learn how to build SolidStart apps.",
        "fr": "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
        "es": "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart."
      }
    }
  }
}
```

> ⚠️ **Aviso específico do SolidStart**: cada arquivo `.ts` / `.tsx` em `src/routes` torna-se uma rota, e um arquivo `.content.ts` possui uma exportação padrão, portanto seria interpretado como uma página. Mantenha as declarações de conteúdo das suas **páginas** fora do diretório de rotas (`src/contents/` funciona bem). O conteúdo dos **componentes** pode permanecer co-localizado, já que `src/components` não é verificado pelo roteador baseado no sistema de arquivos.

> Suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que estejam incluídas no diretório `contentDir` (por padrão, `./src`) e correspondam à extensão de arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Para obter mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

</Step>

<Step number={5} title="Adicionar roteamento localizado">

O objetivo desta etapa é dar a cada idioma sua própria URL, que é o que os motores de busca indexam.

Mova suas páginas para um **segmento dinâmico opcional**. No roteador baseado no sistema de arquivos do SolidStart, `[[locale]]` é compilado para o padrão de caminho `:locale?`:

```plaintext
src/routes/
  [[locale]].tsx          ← layout que valida o segmento
  [[locale]]/
    index.tsx             → /        e /fr        e /es
    about.tsx             → /about   e /fr/about  e /es/about
  [...404].tsx            → captura de erros para qualquer outra coisa
```

O único trabalho do arquivo de layout é restringir o segmento a uma localidade configurada:

```tsx fileName="src/routes/[[locale]].tsx" codeFormat="typescript"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

`@solidjs/router` expande `:locale?` em dois padrões — um com o segmento e outro sem — e os testa por especificidade decrescente. `matchFilters` é o que faz a diferença entre uma configuração funcional e uma confusa:

| URL         | Sem `matchFilters`                                        | Com `matchFilters`                            |
| ----------- | --------------------------------------------------------- | --------------------------------------------- |
| `/fr/about` | Página "sobre" em francês                                 | Página "sobre" em francês                     |
| `/about`    | Página "sobre" (segmento estático vence)                  | Página "sobre"                                |
| `/unknown`  | **Página inicial**, silenciosamente, com `locale=unknown` | Nenhuma correspondência → cai no 404 genérico |

> Prefira `[locale]` (obrigatório) em vez de `[[locale]]` se você usar o modo de roteamento `'prefix-all'`, e remova o segmento completamente para `'no-prefix'` ou `'search-params'`.

</Step>

<Step number={6} title="Fornecer a localidade para sua aplicação">

A URL é a fonte única de verdade para a localidade: o middleware já redirecionou a requisição para o seu caminho localizado, então ler o caminho no layout raiz mantém a renderização no servidor e a hidratação no cliente em conformidade, e atualiza a localidade gratuitamente a cada navegação no lado do cliente.

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import { createEffect, type ParentProps, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Nav } from "~/components/Nav";
import "./app.css";

const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // O servidor renderiza <html> no entry-server.tsx; navegações no lado do cliente
  // entre localidades devem atualizar os atributos por conta própria.
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
```

> O `IntlayerProvider` reage à sua prop `locale`, portanto passar a chamada do acessador `locale()` dentro do JSX é suficiente — o Solid o compila para um getter, e toda a árvore é renderizada novamente no novo idioma quando a URL muda.

</Step>

<Step number={7} title="Definir os atributos lang e dir do HTML no servidor">

O elemento `<html>` é renderizado pelo `entry-server.tsx`, fora do `Router`. Em vez disso, leia a localidade a partir da URL da requisição:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const url = getRequestEvent()?.request.url ?? "/";
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
```

Os crawlers agora recebem o idioma correto logo no primeiro byte:

```html
<html dir="ltr" lang="fr"></html>
```

</Step>

<Step number={8} title="Utilizar o Intlayer em suas páginas">

Acesse seus dicionários de conteúdo em toda a sua aplicação:

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { Meta, Title } from "@solidjs/meta";
import { useIntlayer } from "solid-intlayer";
import Counter from "~/components/Counter";

export default function Home() {
  const content = useIntlayer("home-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
```

> No Solid, `useIntlayer` retorna conteúdo reativo (ex.: `content`). Você pode acessar suas propriedades diretamente.

> Se você quiser usar seu conteúdo em um atributo do tipo `string`, como `alt`, `title`, `href`, `aria-label`, etc., você pode usar o valor da função, como:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Para saber mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md).

Os nós de conteúdo não estão limitados a traduções simples. Um contador pluralizado, por exemplo:

```typescript fileName="src/components/Counter.content.ts" codeFormat="typescript"
import { type Dictionary, plural, t } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    clicks: plural({
      one: t({
        en: "{{count}} click",
        fr: "{{count}} clic",
        es: "{{count}} clic",
      }),
      other: t({
        en: "{{count}} clicks",
        fr: "{{count}} clics",
        es: "{{count}} clics",
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("counter");

  return (
    <button onClick={() => setCount(count() + 1)} type="button">
      {content.clicks(count())}
    </button>
  );
}
```

`plural()` seleciona a categoria através do `Intl.PluralRules` para a localidade ativa, de modo que idiomas com mais de duas formas no plural funcionem sem código adicional.

</Step>

<Step number={9} title="Criar um componente de Link Localizado">

Crie um componente `Link` personalizado que adiciona automaticamente o prefixo do idioma atual às URLs internas:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { ParentComponent } from "solid-js";

export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

```tsx fileName="src/components/Nav.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Nav: Component = () => {
  const content = useIntlayer("nav");

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
```

Escrever `href="/about"` uma única vez agora produz `/about`, `/fr/about` ou `/es/about`, dependendo da localidade ativa — sem necessidade de adicionar prefixos manualmente em suas páginas.

</Step>

<Step number={10} title="Criar um componente Seletor de Localidade">

Renderize o seletor como **âncoras reais** em vez de um `<select>`: cada idioma da página atual se torna um link rastreável que pode ser aberto em uma nova guia, algo que um controle baseado apenas em JavaScript não pode oferecer.

`getPathWithoutLocale` remove o segmento de localidade do caminho atual, e `getLocalizedUrl` o reconstrói para a localidade de destino, para que os links sigam seu modo de roteamento sem codificar nada permanentemente. A navegação é o que altera a localidade renderizada — a rota `[[locale]]` a deriva da URL —, enquanto `setLocale` persiste a escolha no cookie `INTLAYER_LOCALE`, para que uma visita posterior a uma URL sem localidade seja resolvida para o mesmo idioma.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { A, useLocation } from "@solidjs/router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "solid-intlayer";
import { type Component, For } from "solid-js";

export const LocaleSwitcher: Component = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  // Caminho canônico (sem localidade) da página exibida no momento
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // Correspondência exata apenas, para que o link da localidade padrão não seja marcado
              // como ativo em todas as páginas
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // Garante que o botão "voltar" do navegador retorne à página anterior
              replace
            >
              {/* Idioma em sua própria localidade - ex.: Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
```

> No Solid, `locale` retornado por `useLocale` é um **acessador de sinal**. Use `locale()` (com parênteses) para ler seu valor atual de forma reativa.
>
> `getLocaleName(localeItem)` renderiza cada idioma em seu próprio idioma — `English / Français / Español`. Passe um segundo argumento para traduzir os nomes no idioma exibido no momento: `getLocaleName(localeItem, locale())` resulta em `English / French / Spanish` em inglês, `anglais / français / espagnol` em francês.
>
> O `<A>` já define `aria-current="page"` no link correspondente à URL atual, portanto não há nada a adicionar. `replace` é lido do atributo renderizado pelo roteador: ele substitui a entrada no histórico em vez de adicionar uma nova, de modo que o botão "voltar" do navegador retorna à página visitada antes da troca, e não à mesma página no idioma anterior.
>
> `dir` e `hreflang` em cada link mantêm os nomes dos idiomas da direita para a esquerda orientados corretamente e informam às tecnologias assistivas e crawlers para qual idioma cada link aponta.
>
> Para saber mais sobre o hook `useLocale`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="Emitir links canônicos e hreflang" isOptional={true}>

As anotações `hreflang` informam aos motores de busca que `/about`, `/fr/about` e `/es/about` são a mesma página em idiomas diferentes. `getMultilingualUrls` as deriva a partir do caminho canônico (sem localidade), seguindo o seu modo de roteamento, para que nada seja codificado manualmente:

```tsx fileName="src/components/AlternateLinks.tsx" codeFormat="typescript"
import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from "intlayer";
import { type Component, For } from "solid-js";

export type AlternateLinksProps = {
  /** URL absoluta da página sendo renderizada. */
  url: string;
};

export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
```

Renderize-o no cabeçalho do documento, onde a URL da requisição está disponível:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
import { AlternateLinks } from "~/components/AlternateLinks";

// … dentro do <head>, ao lado das outras tags meta:
<AlternateLinks url={url} />;
```

`GET /fr/about` então serve:

```html
<link href="https://example.com/fr/about" rel="canonical" />
<link href="https://example.com/about" hreflang="en" rel="alternate" />
<link href="https://example.com/fr/about" hreflang="fr" rel="alternate" />
<link href="https://example.com/es/about" hreflang="es" rel="alternate" />
<link href="https://example.com/about" hreflang="x-default" rel="alternate" />
```

> **Nota sobre `@solidjs/meta`**: no momento em que este artigo foi escrito, `<Title>` e `<Meta>` do `@solidjs/meta` são aplicados no cliente após a hidratação, mas **não** são emitidos no `<head>` renderizado no servidor no SolidStart v2. Até que isso seja corrigido upstream, renderize as tags que os crawlers devem ver sem JavaScript — `canonical`, `hreflang` e, se necessário, `title` / `description` — diretamente no `entry-server.tsx`, como mostrado acima.

</Step>

<Step number={12} title="Gerenciar páginas não encontradas" isOptional={true}>

Uma rota curinga (splat route) na raiz de `src/routes` captura todos os caminhos que não corresponderam ao segmento de localidade — incluindo prefixos de localidade inválidos rejeitados por `matchFilters`. Como a localidade ainda vem da URL através do layout raiz, a página 404 é exibida no idioma do visitante:

```tsx fileName="src/routes/[...404].tsx" codeFormat="typescript"
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "~/components/LocalizedLink";

export default function NotFound() {
  const content = useIntlayer("not-found-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
```

| Requisição        | Resultado                                     |
| ----------------- | --------------------------------------------- |
| `/xx`             | `404` — `xx` não é uma localidade configurada |
| `/nonexistent`    | `404` na localidade padrão                    |
| `/fr/nonexistent` | `404` em francês (`Page introuvable`)         |

</Step>

<Step number={13} title="Gerar um mapa do site (sitemap) multilíngue" isOptional={true}>

O gerador de mapa do site do Intlayer expande cada caminho em uma entrada por localidade e conecta as alternativas `xhtml:link` entre elas, de modo que a rota precisa apenas listar os caminhos canônicos e sem localidade.

> Ao contrário de geradores básicos que apenas emitem URLs planas, o Intlayer conecta links bidirecionais entre cada variante localizada de cada página, o que ajuda os motores de busca a relacionar URLs localizadas e servir a correta para o público certo.

O SolidStart transforma um arquivo que exporta um método HTTP em uma rota de API e remove a extensão `.ts` do caminho — portanto `src/routes/sitemap.xml.ts` é servido em `/sitemap.xml`:

```typescript fileName="src/routes/sitemap.xml.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export const GET = (_event: APIEvent) => {
  const sitemap = generateSitemap(
    [
      { path: "/", changefreq: "daily", priority: 1.0 },
      { path: "/about", changefreq: "monthly", priority: 0.8 },
    ],
    { siteUrl: SITE_URL }
  );

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

```xml fileName="output of GET /sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/about"/>
  </url>
</urlset>
```

> Rotas de API não oferecem suporte a parâmetros opcionais, portanto mantenha este arquivo na raiz de `src/routes`, fora do segmento `[[locale]]`. O sitemap já contém todas as localidades.

Você pode construir um `robots.txt` da mesma forma com `getMultilingualUrls`, para que as entradas `Disallow` cubram todas as grafias localizadas de um caminho sensível:

```typescript fileName="src/routes/robots.txt.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const disallowedPaths = ["/admin", "/private"].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
```

</Step>

<Step number={14} title="Obter a localidade em suas funções de servidor" isOptional={true}>

Você pode querer acessar a localidade atual de dentro de uma função de servidor ou de uma rota de API.

Em uma configuração baseada em prefixo como esta, **a URL é soberana**: `getLocaleFromPath` lê o prefixo da URL da requisição. `getLocale` é o recurso de fallback para requisições que não possuem prefixo de localidade — ele inspeciona o cookie `INTLAYER_LOCALE`, depois o cabeçalho `x-intlayer-locale` e, em seguida, negocia o `Accept-Language`.

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { createAsync } from "@solidjs/router";
import { getCookie, getIntlayer, getLocale, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

const loadLocalizedData = async () => {
  "use server";

  const request = getRequestEvent()?.request;

  const locale =
    getLocaleFromPath(request?.url) ??
    (await getLocale({
      // Obter o cookie da requisição (padrão: 'INTLAYER_LOCALE')
      getCookie: (name) =>
        getCookie(name, request?.headers.get("cookie") ?? ""),
      // Obter o cabeçalho da requisição (padrão: 'x-intlayer-locale'),
      // recorrendo à negociação de Accept-Language
      getHeader: (name) => request?.headers.get(name) ?? undefined,
    }));

  // Obter algum conteúdo fora de um componente usando getIntlayer()
  const content = getIntlayer("home-page", locale);

  return { locale, title: String(content.title) };
};

export default function Page() {
  const data = createAsync(() => loadLocalizedData());

  return <p>{data()?.title}</p>;
}
```

> Não confie apenas no `getLocale` aqui: o cookie de localidade só é gravado quando um visitante altera ativamente o idioma, portanto uma primeira visita a `/fr/...` seria resolvida para a localidade padrão.

</Step>

<Step number={15} title="Extrair o conteúdo dos seus componentes" isOptional={true}>

Se você possui uma base de código existente, transformar milhares de arquivos pode exigir muito tempo.

Para facilitar esse processo, o Intlayer propõe um [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) / [extrator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md) para transformar seus componentes e extrair o conteúdo.

Para configurá-lo, você pode adicionar uma seção `compiler` no seu arquivo `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Restante da sua configuração
  compiler: {
    /**
     * Indica se o compilador deve estar ativado.
     */
    enabled: true,

    /**
     * Define o caminho dos arquivos de saída
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indica se os componentes devem ser salvos após serem transformados.
     *
     * - Se `true`, o compilador reescreverá o arquivo do componente no disco. Assim, a transformação será permanente e o compilador pulará a transformação no próximo processo. Dessa forma, o compilador pode transformar o app e depois ser removido.
     *
     * - Se `false`, o compilador injetará a chamada da função `useIntlayer()` no código apenas na saída do build e manterá a base de código original intacta. A transformação será feita apenas em memória.
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

> Mova os arquivos de conteúdo gerados das suas páginas para fora de `src/routes` posteriormente, pelo motivo explicado na etapa 5.

 </Tab>
 <Tab value='Compilador Babel'>

> A partir da v9, o `intlayerCompiler` está incluído no plugin `intlayer`. Portanto, você não precisa adicioná-lo manualmente.

Atualize seu `vite.config.ts` para incluir o plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    solidStart({ middleware: "src/middleware.ts" }),
    nitro(),
    intlayer(),
    intlayerCompiler(), // Adiciona o plugin do compilador
  ],
});
```

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

<Step number={16} title="Configurar o TypeScript">

O Intlayer usa aumentação de módulo para obter os benefícios do TypeScript e tornar sua base de código mais sólida.

Garanta que sua configuração do TypeScript inclua os tipos gerados automaticamente:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... suas configurações existentes
  },
  include: [
    "src",
    "*.ts",
    ".intlayer/**/*.ts", // Inclui os tipos gerados automaticamente
  ],
}
```

As chaves do dicionário e os caminhos de conteúdo agora são verificados no momento da compilação:

```tsx
useIntlayer("home-page"); // ✅
useIntlayer("hom-page"); // ❌ Argument of type '"hom-page"' is not assignable to parameter of type 'keyof __DictionaryRegistry'
```

</Step>

</Steps>

---

## Verificando sua configuração

Faça o build e inicie o servidor, depois verifique se estas requisições se comportam como esperado:

```bash
npm run build
node .output/server/index.mjs
```

| Requisição                              | Resposta esperada                            |
| --------------------------------------- | -------------------------------------------- |
| `GET /`                                 | `200` — Inglês                               |
| `GET /` com `Accept-Language: fr`       | `302` → `/fr`                                |
| `GET /` com cookie `INTLAYER_LOCALE=es` | `302` → `/es`                                |
| `GET /fr`                               | `200` — Francês, `<html lang="fr">`          |
| `GET /fr/about`                         | `200` — Página "sobre" em francês            |
| `GET /en/about`                         | `302` → `/about` (redirecionamento canônico) |
| `GET /xx`                               | `404`                                        |
| `GET /fr/nonexistent`                   | `404` em francês                             |
| `GET /sitemap.xml`                      | `200` — sitemap XML multilíngue              |

As linhas que renderizam uma página se comportam de forma idêntica em `vite dev`. As três linhas de redirecionamento só se aplicam a um servidor compilado, a menos que você mesmo registre o manipulador como um middleware — consulte a etapa 3.

> Execute o servidor de dev no Node (`vite dev`) em vez de no Bun (`bun --bun vite dev`): a SSR do SolidStart atualmente falha no ambiente de execução do Bun com `Expected a Response object, but received 'NodeResponse'`. Isso não tem relação com o Intlayer — reproduz-se no template padrão — e afeta apenas o servidor de desenvolvimento, não o `vite build`.

---

## Configuração do Git

É recomendado ignorar os arquivos gerados pelo Intlayer. Isso permite evitar o commit deles no seu repositório Git.

Para fazer isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```

---

## Extensão do VS Code

Para melhorar sua experiência de desenvolvimento com o Intlayer, você pode instalar a **Extensão Oficial do Intlayer para VS Code**.

[Instalar a partir do VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão oferece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Visualizações inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

---

## Ir Mais Longe

Para ir mais longe, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

---

## Referências de Documentação

- [Documentação do Intlayer](https://intlayer.org)
- [Documentação do SolidStart](https://start.solidjs.com)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md)
- [Declaração de Conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)
- [Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
