---
docName: intlayer_with_create_react_app
url: https://intlayer.org/doc/environment/create-react-app
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Traduza o seu site Create React App (CRA) (i18n)
description: Descubra como tornar seu site Create React App (CRA) multilíngue. Siga a documentação para internacionalizar (i18n) e traduzi-lo.
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Create React App
  - CRA
  - JavaScript
  - React
---

# Introdução à Internacionalização (i18n) com Intlayer e React Create App

Consulte [Application Template](https://github.com/aymericzip/intlayer-react-cra-template) no GitHub.

## O que é Intlayer?

**Intlayer** é uma biblioteca inovadora e de código aberto para internacionalização (i18n), projetada para simplificar o suporte multilíngue em aplicações web modernas.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte ao TypeScript** com tipos autogerados, melhorando a autocompletação e a detecção de erros.
- **Aproveitar recursos avançados**, como detecção dinâmica de localidade e troca de idiomas.

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação React

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npm install intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
```

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md).

- **react-intlayer**

  O pacote que integra o Intlayer com a aplicação React. Ele fornece provedores de contexto e hooks para internacionalização no React.

- **react-scripts-intlayer**

Inclui os comandos e plugins `react-scripts-intlayer` para integrar o Intlayer com a aplicação baseada no Create React App. Esses plugins são baseados no [craco](https://craco.js.org/) e incluem configuração adicional para o empacotador [Webpack](https://webpack.js.org/).

### Passo 2: Configuração do seu projeto

Crie um arquivo de configuração para configurar os idiomas da sua aplicação:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

> Por meio deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamento de middleware, nomes de cookies, a localização e extensão de suas declarações de conteúdo, desativar logs do Intlayer no console e muito mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

### Passo 3: Integrar o Intlayer na Configuração do CRA

Altere seus scripts para usar o react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> Os scripts `react-scripts-intlayer` são baseados no [CRACO](https://craco.js.org/). Você também pode implementar sua própria configuração baseada no plugin craco do intlayer. [Veja o exemplo aqui](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Passo 4: Declarar Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

> Os scripts `react-scripts-intlayer` são baseados no [CRACO](https://craco.js.org/). Você também pode implementar sua própria configuração baseada no plugin craco do intlayer. [Veja o exemplo aqui](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Passo 4: Declarar Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
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

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
        pt: "Aprenda React",
      }),
    },
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
      pt: "Comece editando",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
        pt: "Aprenda React",
      }),
    },
  },
};

module.exports = appContent;
```

> Suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que estejam incluídas no diretório `contentDir` (por padrão, `./src`). E correspondam à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md).

> Se o seu arquivo de conteúdo incluir código TSX, você deve considerar importar `import React from "react";` no seu arquivo de conteúdo.

### Passo 5: Utilize o Intlayer no Seu Código

Acesse seus dicionários de conteúdo em toda a sua aplicação:

```tsx {4,7} fileName="src/App.tsx"  codeFormat="typescript"
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

```jsx {3,6} fileName="src/App.mjx" codeFormat="esm"
import "./App.css";
import logo from "./logo.svg";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
const AppContent = () => {
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

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

```jsx {3,6} fileName="src/App.csx" codeFormat="commonjs"
require("./App.css");
const logo = require("./logo.svg");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
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

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

> Nota: Se você quiser usar seu conteúdo em um atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., você deve chamar o valor da função, como:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```
>
> Para saber mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useIntlayer.md).

### (Opcional) Passo 6: Alterar o idioma do seu conteúdo

Para alterar o idioma do seu conteúdo, você pode usar a função `setLocale` fornecida pelo hook `useLocale`. Essa função permite definir o idioma da aplicação e atualizar o conteúdo de acordo.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
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

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Alterar idioma para Inglês
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Alterar idioma para Inglês
    </button>
  );
};
```

> Para saber mais sobre o hook `useLocale`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useLocale.md).

### (Opcional) Passo 7: Adicionar Rotas Localizadas à sua aplicação

O objetivo deste passo é criar rotas únicas para cada idioma. Isso é útil para SEO e URLs amigáveis para SEO.
Exemplo:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Por padrão, as rotas não são prefixadas para o idioma padrão. Se você quiser prefixar o idioma padrão, pode definir a opção `middleware.prefixDefault` como `true` na sua configuração. Consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md) para mais informações.

Para adicionar rotas localizadas à sua aplicação, você pode criar um componente `LocaleRouter` que encapsula as rotas da sua aplicação e gerencia o roteamento baseado no idioma. Aqui está um exemplo usando o [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
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

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Importação de dependências e funções necessárias
import { configuration, getPathWithoutLocale } from "intlayer"; // Funções utilitárias e tipos do 'intlayer'
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
 * Ele gerencia a detecção e validação de idioma baseada na URL.
 */
const AppLocalized = ({ children, locale }) => {
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
export const LocaleRouter = ({ children }) => (
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

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Importação de dependências e funções necessárias
const { configuration, getPathWithoutLocale } = require("intlayer"); // Funções utilitárias e tipos do 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Provedor para contexto de internacionalização
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Componentes de roteamento para gerenciar navegação

// Desestruturação da configuração do Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Um componente que gerencia a localização e encapsula os filhos com o contexto de idioma apropriado.
 * Ele gerencia a detecção e validação de idioma baseada em URL.
 */
const AppLocalized = ({ children, locale }) => {
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
const LocaleRouter = ({ children }) => (
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

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... Seu componente AppContent

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.mjx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... Seu componente AppContent

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.cjx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... Seu componente AppContent

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

### (Opcional) Passo 8: Alterar a URL quando o idioma muda

Para alterar a URL quando o idioma muda, você pode usar a prop `onLocaleChange` fornecida pelo hook `useLocale`. Paralelamente, você pode usar os hooks `useLocation` e `useNavigate` do `react-router-dom` para atualizar o caminho da URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
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

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
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

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
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

### (Opcional) Passo 9: Alterar os Atributos de Idioma e Direção do HTML

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

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Atualiza os atributos `lang` e `dir` do elemento HTML <html> com base no idioma atual.
 * - `lang`: Informa navegadores e motores de busca sobre o idioma da página.
 * - `dir`: Garante a ordem de leitura correta (por exemplo, 'ltr' para inglês, 'rtl' para árabe).
 *
 * Essa atualização dinâmica é essencial para renderização de texto adequada, acessibilidade e SEO.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Atualiza o atributo de idioma para o idioma atual.
    document.documentElement.lang = locale;

    // Define a direção do texto com base no idioma atual.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Usando o Hook na Sua Aplicação

Integre o hook no seu componente principal para que os atributos HTML sejam atualizados sempre que o idioma mudar:

```tsx fileName="src/App.tsx" codeFormat="typescript"
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

```jsx fileName="src/App.msx" codeFormat="esm"
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent = () => {
  // Aplica o hook para atualizar os atributos lang e dir da tag <html> com base no idioma.
  useI18nHTMLAttributes();

  // ... Resto do seu componente
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.csx" codeFormat="commonjs"
const { FC } = require("react");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./App.css");

const AppContent = () => {
  // Aplica o hook para atualizar os atributos lang e dir da tag <html> com base no idioma.
  useI18nHTMLAttributes();

  // ... Resto do seu componente
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

Ao aplicar essas alterações, sua aplicação irá:

- Garantir que o atributo **language** (`lang`) reflita corretamente o idioma atual, o que é importante para SEO e para o comportamento do navegador.
- Ajustar a **direção do texto** (`dir`) de acordo com o idioma, melhorando a legibilidade e usabilidade para idiomas com diferentes ordens de leitura.
- Proporcionar uma experiência mais **acessível**, pois tecnologias assistivas dependem desses atributos para funcionar de forma otimizada.

### Configurar TypeScript

O Intlayer usa a ampliação de módulos para obter os benefícios do TypeScript e tornar sua base de código mais robusta.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)
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
[Instalar a partir do VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão oferece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Visualizações inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da extensão Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

### Avançar

Para avançar, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

## Histórico do Documento

- 5.5.10 - 2025-06-29: Histórico inicial
