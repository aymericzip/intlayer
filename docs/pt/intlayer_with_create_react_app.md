# Começando a Internacionalização (i18n) com Intlayer e React Create App

## O que é o Intlayer?

**Intlayer** é uma biblioteca inovadora e de código aberto de internacionalização (i18n) projetada para simplificar o suporte multilíngue em aplicações web modernas.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte a TypeScript** com tipos gerados automaticamente, melhorando a autocompletação e a detecção de erros.
- **Beneficiar-se de recursos avançados**, como detecção e troca dinâmica de localidade.

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação React

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npm install intlayer react-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
```

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md), transpiração e [comandos do CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md).

- **react-intlayer**

  O pacote que integra o Intlayer com a aplicação React. Fornece provedores de contexto e ganchos para a internacionalização em React. Além disso, inclui o plugin para integrar o Intlayer com a aplicação baseada no Create React App.

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
      // Suas outras localizações
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
      // Suas outras localizações
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
      // Suas outras localizações
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Através deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamento de middleware, nomes de cookies, a localização e a extensão das suas declarações de conteúdo, desativar logs do Intlayer no console, e mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

### Passo 3: Integrar o Intlayer na Sua Configuração CRA

Altere seus scripts para usar o react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

> Os scripts `react-intlayer` são baseados no [craco](https://craco.js.org/). Você também pode implementar sua própria configuração com base no plugin craco do intlayer. [Veja um exemplo aqui](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Passo 4: Declarar Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Edite <code>src/App.tsx</code> e salve para recarregar
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
        en: "Aprenda React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies DeclarationContent;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Comece a editar",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Aprenda React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Comece a editar",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Aprenda React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

module.exports = appContent;
```

> Suas declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação assim que forem incluídas no diretório `contentDir` (por padrão, `./src`). E corresponder à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md).
> Se seu arquivo de conteúdo incluir código TSX, você deve considerar importar `import React from "react";` em seu arquivo de conteúdo.

### Passo 5: Utilizar o Intlayer no Seu Código

Acesse seus dicionários de conteúdo ao longo de sua aplicação:

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
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Para saber mais sobre o gancho `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useIntlayer.md).

### (Opcional) Passo 6: Mudar o idioma do seu conteúdo

Para mudar o idioma do seu conteúdo, você pode usar a função `setLocale` fornecida pelo gancho `useLocale`. Esta função permite que você defina a localidade da aplicação e atualize o conteúdo de acordo.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Mudar idioma para inglês
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
      Mudar idioma para inglês
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
      Mudar idioma para inglês
    </button>
  );
};
```

> Para saber mais sobre o gancho `useLocale`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useLocale.md).

### (Opcional) Passo 7: Adicionar Roteamento localizado à sua aplicação

O objetivo deste passo é criar rotas exclusivas para cada idioma. Isso é útil para SEO e URLs amigáveis para SEO.
Exemplo:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Por padrão, as rotas não são prefixadas para a localidade padrão. Se você quiser prefixar a localidade padrão, pode definir a opção `middleware.prefixDefault` como `true` em sua configuração. Veja a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md) para mais informações.

Para adicionar roteamento localizado à sua aplicação, você pode criar um componente `LocaleRouter` que encapsula as rotas da sua aplicação e gerencia o roteamento baseado na localidade. Aqui está um exemplo usando [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Importando dependências e funções necessárias
import { Locales, getConfiguration } from "intlayer"; // Funções e tipos utilitários do 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Tipos do React para componentes funcionais e props
import { IntlayerProvider } from "react-intlayer"; // Provedor para contexto de internacionalização
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componentes de roteamento para gerenciamento de navegação

// Desestruturando a configuração do Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Um componente que gerencia a localização e envolve os filhos com o contexto de localidade apropriado.
 * Ele gerencia a detecção e validação de localidade baseada em URLs.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Obtém o caminho da URL atual
  const { locale } = useParams<{ locale: Locales }>(); // Extrai o parâmetro de localidade da URL

  // Determina a localidade atual, revertendo para a padrão se não fornecida
  const currentLocale = locale ?? defaultLocale;

  // Remove o prefixo da localidade do caminho para construir um caminho base
  const pathWithoutLocale = removeLocaleFromUrl(
    path // Caminho da URL atual
  );

  /**
   * Se middleware.prefixDefault for true, a localidade padrão deve sempre ser prefixada.
   */
  if (middleware.prefixDefault) {
    // Valida a localidade
    if (!locale || !locales.includes(locale)) {
      // Redireciona para a localidade padrão com o caminho atualizado
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Substitui a entrada atual do histórico pela nova
        />
      );
    }

    // Envolve os filhos com o IntlayerProvider e define a localidade atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault é falso, a localidade padrão não é prefixada.
     * Certifique-se de que a localidade atual é válida e não é a localidade padrão.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Exclui a localidade padrão
        )
        .includes(currentLocale) // Verifica se a localidade atual está na lista de localizações válidas
    ) {
      // Redireciona para o caminho sem prefixo de localidade
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Envolve os filhos com o IntlayerProvider e define a localidade atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Um componente de roteador que configura rotas específicas de localidade.
 * Ele usa o React Router para gerenciar a navegação e renderizar componentes localizados.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Padrão de rota para capturar a localidade (ex: /en/, /fr/) e corresponder a todos os caminhos subsequentes
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Envolve os filhos com o gerenciamento de localidade
      />

      {
        // Se o prefixo da localidade padrão estiver desativado, renderiza os filhos diretamente no caminho raiz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Envolve os filhos com o gerenciamento de localidade
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Importando dependências e funções necessárias
import { Locales, getConfiguration } from "intlayer"; // Funções e tipos utilitários do 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // Provedor para contexto de internacionalização
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componentes de roteamento para gerenciamento de navegação

// Desestruturando a configuração do Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Um componente que gerencia a localização e envolve os filhos com o contexto de localidade apropriado.
 * Ele gerencia a detecção e validação de localidade baseada em URLs.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Obtém o caminho da URL atual
  const { locale } = useParams(); // Extrai o parâmetro de localidade da URL

  // Determina a localidade atual, revertendo para a padrão se não fornecida
  const currentLocale = locale ?? defaultLocale;

  // Remove o prefixo da localidade do caminho para construir um caminho base
  const pathWithoutLocale = removeLocaleFromUrl(
    path // Caminho da URL atual
  );

  /**
   * Se middleware.prefixDefault for true, a localidade padrão deve sempre ser prefixada.
   */
  if (middleware.prefixDefault) {
    // Valida a localidade
    if (!locale || !locales.includes(locale)) {
      // Redireciona para a localidade padrão com o caminho atualizado
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Substitui a entrada atual do histórico pela nova
        />
      );
    }

    // Envolve os filhos com o IntlayerProvider e define a localidade atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault é falso, a localidade padrão não é prefixada.
     * Certifique-se de que a localidade atual é válida e não é a localidade padrão.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Exclui a localidade padrão
        )
        .includes(currentLocale) // Verifica se a localidade atual está na lista de localizações válidas
    ) {
      // Redireciona para o caminho sem prefixo de localidade
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Envolve os filhos com o IntlayerProvider e define a localidade atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Um componente de roteador que configura rotas específicas de localidade.
 * Ele usa o React Router para gerenciar a navegação e renderizar componentes localizados.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Padrão de rota para capturar a localidade (ex: /en/, /fr/) e corresponder a todos os caminhos subsequentes
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Envolve os filhos com o gerenciamento de localidade
      />

      {
        // Se o prefixo da localidade padrão estiver desativado, renderiza os filhos diretamente no caminho raiz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Envolve os filhos com o gerenciamento de localidade
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Importando dependências e funções necessárias
const { Locales, getConfiguration, getPathWithoutLocale } = require("intlayer"); // Funções e tipos utilitários do 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Provedor para contexto de internacionalização
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Componentes de roteamento para gerenciamento de navegação

// Desestruturando a configuração do Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Um componente que gerencia a localização e envolve os filhos com o contexto de localidade apropriado.
 * Ele gerencia a detecção e validação de localidade baseada em URLs.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Obtém o caminho da URL atual
  const { locale } = useParams(); // Extrai o parâmetro de localidade da URL

  // Determina a localidade atual, revertendo para a padrão se não fornecida
  const currentLocale = locale ?? defaultLocale;

  // Remove o prefixo da localidade do caminho para construir um caminho base
  const pathWithoutLocale = removeLocaleFromUrl(
    path // Caminho da URL atual
  );

  /**
   * Se middleware.prefixDefault for true, a localidade padrão deve sempre ser prefixada.
   */
  if (middleware.prefixDefault) {
    // Valida a localidade
    if (!locale || !locales.includes(locale)) {
      // Redireciona para a localidade padrão com o caminho atualizado
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Substitui a entrada atual do histórico pela nova
        />
      );
    }

    // Envolve os filhos com o IntlayerProvider e define a localidade atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault é falso, a localidade padrão não é prefixada.
     * Certifique-se de que a localidade atual é válida e não é a localidade padrão.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Exclui a localidade padrão
        )
        .includes(currentLocale) // Verifica se a localidade atual está na lista de localizações válidas
    ) {
      // Redireciona para o caminho sem prefixo de localidade
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Envolve os filhos com o IntlayerProvider e define a localidade atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Um componente de roteador que configura rotas específicas de localidade.
 * Ele usa o React Router para gerenciar a navegação e renderizar componentes localizados.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Padrão de rota para capturar a localidade (ex: /en/, /fr/) e corresponder a todos os caminhos subsequentes
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Envolve os filhos com o gerenciamento de localidade
      />

      {
        // Se o prefixo da localidade padrão estiver desativado, renderiza os filhos diretamente no caminho raiz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Envolve os filhos com o gerenciamento de localidade
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (Opcional) Passo 8: Mudar a URL quando a localidade muda

Para mudar a URL quando a localidade muda, você pode usar a propriedade `onLocaleChange` fornecida pelo gancho `useLocale`. Em paralelo, você pode usar os ganchos `useLocation` e `useNavigate` do `react-router-dom` para atualizar o caminho da URL.

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
  const location = useLocation(); // Obtém o caminho da URL atual. Exemplo: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Construa a URL com a localidade atualizada
    // Exemplo: /es/about com a localidade definida para espanhol
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Atualiza o caminho da URL
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Idioma em sua própria Localidade - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma na Localidade atual - e.g. Francés com a localidade atual definida para Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em Inglês - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Idioma em sua própria Localidade - e.g. FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const location = useLocation(); // Obtém o caminho da URL atual. Exemplo: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Construa a URL com a localidade atualizada
    // Exemplo: /es/about com a localidade definida para espanhol
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Atualiza o caminho da URL
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Idioma em sua própria Localidade - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma na Localidade atual - e.g. Francés com a localidade atual definida para Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em Inglês - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Idioma em sua própria Localidade - e.g. FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const location = useLocation(); // Obtém o caminho da URL atual. Exemplo: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Construa a URL com a localidade atualizada
    // Exemplo: /es/about com a localidade definida para espanhol
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Atualiza o caminho da URL
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Idioma em sua própria Localidade - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma na Localidade atual - e.g. Francés com a localidade atual definida para Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em Inglês - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Idioma em sua própria Localidade - e.g. FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> Referências da documentação:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### Configurar TypeScript

O Intlayer utiliza a augmentação de módulos para aproveitar os benefícios do TypeScript e tornar sua base de código mais forte.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Certifique-se de que sua configuração do TypeScript inclua os tipos gerados automaticamente.

```json5 fileName="tsconfig.json"
{
  // ... Suas configurações existentes do TypeScript
  "include": [
    // ... Suas configurações existentes do TypeScript
    "types", // Inclui os tipos gerados automaticamente
  ],
}
```

### Configuração do Git

É recomendável ignorar os arquivos gerados pelo Intlayer. Isto permite que você evite cometê-los ao seu repositório Git.

Para fazer isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```
