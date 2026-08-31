---
createdAt: 2024-08-11
updatedAt: 2026-08-30
title: "Create React App i18n - Guia completo para traduzir seu aplicativo"
description: "Sem mais i18next. O guia 2026 para criar uma aplicação Create React App multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Create React App
  - CRA
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - create-react-app
applicationTemplate: https://github.com/aymericzip/intlayer-react-cra-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Atualizar o uso da API useIntlayer do Solid para acesso direto a propriedades"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Adicionar comando init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Histórico inicial"
author: aymericzip
---

# Traduza seu Create React App com Intlayer | Internacionalização (i18n)

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-cra-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como Internacionalizar sua aplicação usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Consulte [Application Template](https://github.com/aymericzip/intlayer-react-cra-template) no GitHub.

## O que é Intlayer?

Em comparação com soluções principais como `react-i18next` ou `i18next`, Intlayer é uma solução que vem com otimizações integradas, tais como:

<AccordionGroup>

<Accordion header="Cobertura completa do React">

**Intlayer** é uma biblioteca inovadora e de código aberto para internacionalização (i18n), projetada para simplificar o suporte multilíngue em aplicações web modernas.

</Accordion>

Com o Intlayer, você pode:

Em vez de carregar ficheiros JSON massivos nas suas páginas, carregue apenas o conteúdo necessário. O Intlayer ajuda a **reduzir o tamanho do seu bundle e das páginas em até 50%**.

</Accordion>

<Accordion header="Manutenibilidade">

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte ao TypeScript** com tipos autogerados, melhorando a autocompletação e a detecção de erros.
- **Aproveitar recursos avançados**, como detecção dinâmica de localidade e troca de idiomas.

</Accordion>

<Accordion header="AI Agent">

Co-locating content **reduz o contexto necessário** por Large Language Models (LLMs). Intlayer também vem com uma suite de ferramentas, como uma **CLI** para testar traduções ausentes,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)**, e **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**, para tornar a experiência do desenvolvedor (DX) ainda mais suave para agentes de IA.

</Accordion>

<Accordion header="Automação">

Use automation para traduzir no seu pipeline CI/CD usando o LLM da sua escolha ao custo do seu provedor de IA. Intlayer também oferece um **compiler** para automatizar a extração de conteúdo, bem como uma [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) para ajudar a **traduzir em background**.

</Accordion>

<Accordion header="Performance">

Conectar arquivos JSON massivos a componentes pode levar a problemas de desempenho e reatividade. Intlayer otimiza o carregamento de seu conteúdo no tempo de build.

</Accordion>

<Accordion header="Dimensionamento com none-dev">

Muito mais do que uma solução i18n, o Intlayer fornece um **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) auto-hospedado** e um **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)** para ajudá-lo a gerenciar seu conteúdo multilíngue em **tempo real**, tornando a colaboração com tradutores, redatores e outros membros da equipe perfeita. O conteúdo pode ser armazenado localmente e/ou remotamente.

</Accordion>
</AccordionGroup>

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação React

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
npm install intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="bun"
bun add intlayer react-intlayer react-scripts-intlayer
```

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **react-intlayer**

  O pacote que integra o Intlayer com a aplicação React. Ele fornece provedores de contexto e hooks para internacionalização no React.

- **react-scripts-intlayer**

Inclui os comandos e plugins `react-scripts-intlayer` para integrar o Intlayer com a aplicação baseada no Create React App. Esses plugins são baseados no [craco](https://craco.js.org/) e incluem configuração adicional para o empacotador [Webpack](https://webpack.js.org/).

</Step>

<Step number={2} title="Configuração do seu projeto">

Crie um arquivo de configuração para configurar os idiomas da sua aplicação:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Por meio deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamento de middleware, nomes de cookies, a localização e extensão de suas declarações de conteúdo, desativar logs do Intlayer no console e muito mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Step>

<Step number={3} title="Integrar o Intlayer na Configuração do CRA">

Altere seus scripts para usar o react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> Os scripts `react-scripts-intlayer` são baseados no [CRACO](https://craco.js.org/). Você também pode implementar sua própria configuração baseada no plugin craco do intlayer. [Veja o exemplo aqui](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

</Step>

<Step number={4} title="Declarar Seu Conteúdo">

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="src/app.content.tsx" codeFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to reload
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para recargar
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies Dictionary;

export default appContent;
```

> Suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que estejam incluídas no diretório `contentDir` (por padrão, `./src`). E correspondam à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

> Se o seu arquivo de conteúdo incluir código TSX, você deve considerar importar `import React from "react";` no seu arquivo de conteúdo.

</Step>

<Step number={5} title="Utilize o Intlayer no Seu Código">

Acesse seus dicionários de conteúdo em toda a sua aplicação:

```tsx {4,7} fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

> Nota: Se você quiser usar seu conteúdo em um atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., você deve chamar o valor da função, como:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```
>
> Para saber mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useIntlayer.md).

> Para saber mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useIntlayer.md).

</Step>

<Step number={6} title="Alterar o idioma do seu conteúdo" isOptional={true}>

Para alterar o idioma do seu conteúdo, você pode usar a função `setLocale` fornecida pelo hook `useLocale`. Essa função permite definir o idioma da aplicação e atualizar o conteúdo de acordo.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

> Para saber mais sobre o hook `useLocale`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useLocale.md).

</Step>

<Step number={7} title="Adicionar Rotas Localizadas à sua aplicação" isOptional={true}>

O objetivo deste passo é criar rotas únicas para cada idioma. Isso é útil para SEO e URLs amigáveis para SEO.
Exemplo:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Por padrão, as rotas não são prefixadas para o idioma padrão. Se você quiser prefixar o idioma padrão, pode definir a opção `middleware.prefixDefault` como `true` na sua configuração. Consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md) para mais informações.

Para adicionar rotas localizadas à sua aplicação, você pode criar um componente `LocaleRouter` que encapsula as rotas da sua aplicação e gerencia o roteamento baseado no idioma. Aqui está um exemplo usando o [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat={["typescript", "esm"]}
// Importação de dependências e funções necessárias
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // Funções utilitárias e tipos do 'intlayer'
// Funções utilitárias e tipos do 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Tipos React para componentes funcionais e props
import { IntlayerProvider } from "react-intlayer"; // Provedor para contexto de internacionalização
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componentes de roteamento para gerenciar navegação

// Desestruturação da configuração do Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Um componente que gerencia a localização e encapsula os filhos com o contexto de idioma apropriado.
 * Ele gerencia a detecção e validação do idioma baseada na URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Obtém o caminho atual da URL

  // Determina o idioma atual, retornando ao padrão se não for fornecido
  const currentLocale = locale ?? defaultLocale;

  // Remove o prefixo de idioma do caminho para construir um caminho base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Caminho atual da URL
  );

  /**
   * Se middleware.prefixDefault for verdadeiro, o idioma padrão deve sempre ser prefixado.
   */
  if (middleware.prefixDefault) {
    // Valida o idioma
    if (!locale || !locales.includes(locale)) {
      // Redireciona para o idioma padrão com o caminho atualizado
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Substitui a entrada atual do histórico pela nova
        />
      );
    }

    // Encapsula os filhos com o IntlayerProvider e define o idioma atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault é falso, o idioma padrão não é prefixado.
     * Garante que o idioma atual seja válido e não o idioma padrão.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Exclui o idioma padrão
        )
        .includes(currentLocale) // Verifica se o idioma atual está na lista de idiomas válidos
    ) {
      // Redireciona para o caminho sem prefixo de idioma
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Encapsula os filhos com o IntlayerProvider e define o idioma atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Um componente de roteador que configura rotas específicas para idiomas.
 * Ele usa o React Router para gerenciar a navegação e renderizar componentes localizados.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Padrão de rota para capturar o idioma (por exemplo, /en/, /fr/) e corresponder a todos os caminhos subsequentes
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Encapsula os filhos com gerenciamento de idioma
          />
        ))}

      {
        // Se o prefixo do idioma padrão estiver desativado, renderiza os filhos diretamente no caminho raiz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Encapsula os filhos com gerenciamento de idioma
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Em seguida, você pode usar o componente `LocaleRouter` na sua aplicação:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... Seu componente AppContent

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

</Step>

<Step number={8} title="Alterar a URL quando o idioma muda" isOptional={true}>

Para alterar a URL quando o idioma muda, você pode usar a prop `onLocaleChange` fornecida pelo hook `useLocale`. Paralelamente, você pode usar os hooks `useLocation` e `useNavigate` do `react-router-dom` para atualizar o caminho da URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // Obtém o caminho atual da URL. Exemplo: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Constrói a URL com o idioma atualizado
      // Exemplo: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Atualiza o caminho da URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Idioma - ex: FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma no próprio idioma - ex: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma no idioma atual - ex: Francés com idioma atual definido como Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em inglês - ex: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> Referências da documentação:
>
> - [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useLocale.md)
> - [Hook `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocaleName.md)
> - [Hook `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocalizedUrl.md)
> - [Hook `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getHTMLTextDir.md)
> - [Atributo `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [Atributo `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [Atributo `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [Atributo `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={9} title="Alterar os Atributos de Idioma e Direção do HTML" isOptional={true}>

Quando sua aplicação suporta vários idiomas, é crucial atualizar os atributos `lang` e `dir` da tag `<html>` para corresponder ao idioma atual. Isso garante:

- **Acessibilidade**: Leitores de tela e tecnologias assistivas dependem do atributo `lang` correto para pronunciar e interpretar o conteúdo com precisão.
- **Renderização de Texto**: O atributo `dir` (direção) garante que o texto seja renderizado na ordem correta (por exemplo, da esquerda para a direita para inglês, da direita para a esquerda para árabe ou hebraico), o que é essencial para a legibilidade.
- **SEO**: Os motores de busca usam o atributo `lang` para determinar o idioma da sua página, ajudando a servir o conteúdo localizado correto nos resultados de busca.

Ao atualizar esses atributos dinamicamente quando o idioma muda, você garante uma experiência consistente e acessível para os usuários em todos os idiomas suportados.

#### Implementando o Hook

Crie um hook personalizado para gerenciar os atributos HTML. O hook escuta as mudanças de idioma e atualiza os atributos de acordo:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
/**
 * Atualiza os atributos `lang` e `dir` do elemento HTML <html> com base no idioma atual.
 * - `lang`: Informa navegadores e motores de busca sobre o idioma da página.
 * - `dir`: Garante a ordem de leitura correta (por exemplo, 'ltr' para inglês, 'rtl' para árabe).
 *
 * Essa atualização dinâmica é essencial para renderização de texto adequada, acessibilidade e SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Atualiza o atributo de idioma para o idioma atual.
    document.documentElement.lang = locale;

    // Define a direção do texto com base no idioma atual.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

#### Usando o Hook na Sua Aplicação

Integre o hook no seu componente principal para que os atributos HTML sejam atualizados sempre que o idioma mudar:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Aplica o hook para atualizar os atributos lang e dir da tag <html> com base no idioma.
  useI18nHTMLAttributes();

  // ... Resto do seu componente
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

Ao aplicar essas alterações, sua aplicação irá:

- Garantir que o atributo **language** (`lang`) reflita corretamente o idioma atual, o que é importante para SEO e para o comportamento do navegador.
- Ajustar a **direção do texto** (`dir`) de acordo com o idioma, melhorando a legibilidade e usabilidade para idiomas com diferentes ordens de leitura.
- Proporcionar uma experiência mais **acessível**, pois tecnologias assistivas dependem desses atributos para funcionar de forma otimizada.
  </Step>

</Steps>

### Configurar TypeScript

O Intlayer usa a ampliação de módulos para obter os benefícios do TypeScript e tornar sua base de código mais robusta.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Certifique-se de que sua configuração do TypeScript inclua os tipos autogerados.

```json5 fileName="tsconfig.json"
{
  // ... Suas configurações existentes do TypeScript
  "include": [
    // ... Suas configurações existentes do TypeScript
    ".intlayer/**/*.ts", // Inclua os tipos autogerados
  ],
}
```

### Configuração do Git

Recomenda-se ignorar os arquivos gerados pelo Intlayer. Isso permite evitar que eles sejam enviados para o seu repositório Git.

Para fazer isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignore os arquivos gerados pelo Intlayer
.intlayer
```

### Extensão VS Code

Para melhorar sua experiência de desenvolvimento com Intlayer, você pode instalar a extensão oficial **Intlayer VS Code Extension**.

Para melhorar sua experiência de desenvolvimento com o Intlayer, você pode instalar a **Extensão oficial do Intlayer para VS Code**.
[Instale a partir do VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão oferece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Visualizações inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da extensão Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

### Avançar

Para avançar, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

## Perguntas Frequentes

<FAQ>

<Question title="Quais são as diferentes soluções disponíveis para internacionalizar um projeto Create React App?">

- **`react-i18next` / `i18next`**: a mais difundida, com namespaces JSON carregados em tempo de execução.
- **`react-intl`** e **`Lingui`**: formato de mensagem ICU, baseado em extração.
- **`Intlayer`**: a solução mais avançada. O conteúdo pode ser declarado em qualquer lugar da sua base de código ([ao lado de cada componente ou centralizado](https://intlayer.org/blog/per-component-vs-centralized-i18n)) e compilado em tempo de build através de `react-scripts-intlayer`, totalmente tipado, com tradução por IA, editor visual e CMS.

Como o Create React App empacota sua própria configuração do webpack, a integração se dá por meio da substituição direta do `react-scripts` por `react-scripts-intlayer`, em vez de um plugin registrado manualmente. Consulte [por que Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md) e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md).

</Question>

<Question title="Quanto a i18n adiciona ao tamanho do bundle do meu React?">

Muito menos do que uma configuração baseada em namespaces, porque uma página nunca baixa um catálogo que não renderiza. O compilador em tempo de build substitui as chamadas `useIntlayer` pelas entradas exatas que o componente utiliza. Assim, chaves e idiomas não utilizados são descartados, e os [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md) dividem o restante por locale. Comparado às alternativas habituais, o Intlayer reduz o tamanho do bundle e da página em até 50%. Consulte [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md).

</Question>

<Question title="Posso migrar do react-i18next ou react-intl sem reescrever meus componentes?">

Sim, e existem dois caminhos. Você pode migrar o conteúdo progressivamente com o [guia de migração do react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_react-i18next_to_intlayer.md) ou o [guia de migração do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md). Ou você pode manter sua API atual integralmente: os [adaptadores de compatibilidade (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) expõem exatamente a mesma interface que `react-i18next`, `react-intl` e `i18next`, mas servidos pelos dicionários do Intlayer, alterando apenas os imports sem tocar no código dos componentes.

</Question>

<Question title="Posso manter meus arquivos de tradução JSON existentes?">

Sim. O [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus arquivos `/messages/{locale}/{namespace}.json` como fonte de verdade e gera dicionários Intlayer a partir deles, em ambas as direções. O [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md) faz o mesmo para catálogos gettext, e os [arquivos por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md) permitem dividir o conteúdo por idioma em vez de agrupar todos os locales em um único arquivo.

</Question>

<Question title="Preciso mover meu conteúdo chave por chave?">

Não. Execute `npx intlayer extract` e o Intlayer lê seus componentes, extrai as strings voltadas para o usuário e escreve um arquivo `.content` ao lado de cada um, para que você revise um diff em vez de copiar strings para um catálogo uma a uma.

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

<Question title="O Create React App foi descontinuado. Devo migrar para o Vite primeiro?">

Se você já planeja essa migração, faça-a primeiro e siga o [guia do Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md): o plugin do Vite possui suporte ativo contínuo e compilações muito mais rápidas. Se ainda não puder migrar de imediato, este guia funciona perfeitamente, e as declarações de conteúdo não mudam entre as configurações, portanto modernizar a ferramenta de build mais tarde não exigirá reescrever sua camada de i18n.

</Question>

<Question title="Como configuro o roteamento localizado em um projeto Create React App?">

Os passos 7 e 8 cobrem rotas localizadas e reescrita de URL na mudança de idioma. Se não desejar o locale no caminho da URL, defina `routing.mode` como `"no-prefix"` ou `"search-params"` para que ele seja resolvido a partir de cookies ou parâmetros de busca. Consulte a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Question>

<Question title="Como lido com metadados de SEO em um app React renderizado exclusivamente no cliente?">

Defina os atributos `lang` e `dir` no elemento `html` a partir do locale ativo, como mostrado no passo 9, e emita alternativas `hreflang` para cada locale declarado com `getMultilingualUrls`, incluindo `x-default`. Como o Create React App envia apenas um shell de página renderizado no cliente, prefira uma solução pré-renderizada ou renderizada no servidor como [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_tanstack.md) ou [React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_react_router_v7.md) para páginas que precisam de indexação rigorosa por robôs de busca.

</Question>

<Question title="Como dou suporte a idiomas da direita para a esquerda (RTL), como Árabe ou Hebraico?">

O passo 9 aborda isso. A função `getHTMLTextDir` retorna `ltr`, `rtl` ou `auto` para um locale, permitindo vincular `lang` e `dir` no elemento raiz a partir do locale ativo e deixando que as propriedades lógicas do CSS tratem da orientação do layout.

</Question>

<Question title="Como traduzo o app automaticamente com IA?">

Execute `npx intlayer fill`. Ele preenche traduções ausentes com o LLM de sua preferência, usando sua própria chave de API e provedor, e o parâmetro `--git-diff` limita o processo ao conteúdo alterado na branch. Consulte o [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md) e a [integração CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/CI_CD.md).

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
