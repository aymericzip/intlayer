# Começando a Internacionalização (i18n) com Intlayer e Vite e React

## O que é Intlayer?

**Intlayer** é uma biblioteca de internacionalização (i18n) inovadora e de código aberto, projetada para simplificar o suporte multilíngue em aplicações web modernas.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar metadados**, rotas e conteúdo de forma dinâmica.
- **Garantir suporte TypeScript** com tipos gerados automaticamente, melhorando o autocompletar e a detecção de erros.
- **Beneficiar-se de recursos avançados**, como detecção e troca de localidade dinâmica.

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação Vite e React

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

  O pacote central que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md), transpiração e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md).

- **react-intlayer**
  O pacote que integra o Intlayer com a aplicação React. Ele fornece provedores de contexto e hooks para internacionalização em React. Além disso, inclui o plugin Vite para integrar o Intlayer com o [empacotador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), além de middleware para detectar a localidade preferida do usuário, gerenciar cookies e tratar redirecionamentos de URL.

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
      // Suas outras localidades
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
      // Suas outras localidades
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
      // Suas outras localidades
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Através deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamento de middleware, nomes de cookies, local e extensão das suas declarações de conteúdo, desativar logs do Intlayer no console e muito mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

### Passo 3: Integre o Intlayer na sua Configuração do Vite

Adicione o plugin intlayer à sua configuração.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin } = require("react-intlayer/vite");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

> O plugin `intlayerPlugin()` do Vite é utilizado para integrar o Intlayer com o Vite. Ele garante a construção de arquivos de declaração de conteúdo e os monitora em modo de desenvolvimento. Ele define variáveis de ambiente do Intlayer dentro da aplicação Vite. Além disso, fornece aliases para otimizar o desempenho.

### Passo 4: Declare Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      // Não se esqueça de importar o React se você usar um nó React em seu conteúdo
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies DeclarationContent;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // Não se esqueça de importar o React se você usar um nó React em seu conteúdo
        en: (
          <>
            Edit <code>src/App.tsx</code> and save to test HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
        ),
      },

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // Não se esqueça de importar o React se você usar um nó React em seu conteúdo
        en: (
          <>
            Edit <code>src/App.tsx</code> and save to test HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
        ),
      },

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> Suas declarações de conteúdo podem ser definidas em qualquer lugar na sua aplicação, assim que forem incluídas no diretório `contentDir` (por padrão, `./src`). E combinam com a extensão do arquivo de declaração de conteúdo (por padrão, `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md).
> Se seu arquivo de conteúdo incluir código TSX, você deve considerar importar `import React from "react";` no seu arquivo de conteúdo.

### Passo 5: Utilize o Intlayer no Seu Código

Acesse seus dicionários de conteúdo ao longo da sua aplicação:

```tsx {5,9} fileName="src/App.tsx" codeFormat="typescript"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.msx" codeFormat="esm"
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.csx" codeFormat="commonjs"
const { useState } = require("react");
const reactLogo = require("./assets/react.svg");
const viteLogo = require("/vite.svg");
require("./App.css");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

> Se você quiser usar seu conteúdo em um atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., deve chamar o valor da função, como:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Para saber mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useIntlayer.md).

### (Opcional) Passo 6: Mudar o idioma do seu conteúdo

Para mudar o idioma do seu conteúdo, você pode usar a função `setLocale` fornecida pelo hook `useLocale`. Essa função permite definir a localidade da aplicação e atualizar o conteúdo de acordo.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
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

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

> Para saber mais sobre o hook `useLocale`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useLocale.md).

### (Opcional) Passo 7: Adicionar Roteamento Localizado à sua aplicação

O objetivo deste passo é fazer rotas únicas para cada idioma. Isso é útil para SEO e URLs amigáveis ao SEO.
Exemplo:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Por padrão, as rotas não são prefixadas para a localidade padrão. Se você quiser prefixar a localidade padrão, pode definir a opção `middleware.prefixDefault` como `true` na sua configuração. Veja a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md) para mais informações.

Para adicionar roteamento localizado à sua aplicação, você pode criar um componente `LocaleRouter` que envolve as rotas da sua aplicação e lida com o roteamento baseado na localidade. Aqui está um exemplo usando [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Importando dependências e funções necessárias
import { Locales, getConfiguration } from "intlayer"; // Funções utilitárias e tipos do 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Tipos React para componentes funcionais e props
import { IntlayerProvider } from "react-intlayer"; // Provedor para o contexto de internacionalização
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componentes de roteador para gerenciar navegação

// Desestruturando configuração do Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Um componente que lida com a localização e envolve os filhos com o contexto de localidade apropriado.
 * Ele gerencia a detecção e validação da localidade baseada na URL.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Obtém o caminho atual da URL
  const { locale } = useParams<{ locale: Locales }>(); // Extrai o parâmetro de localidade da URL

  // Determina a localidade atual, reverter para a padrão se não fornecida
  const currentLocale = locale ?? defaultLocale;

  // Remove o prefixo da localidade do caminho para construir um caminho base
  const pathWithoutLocale = removeLocaleFromUrl(
    path // Caminho atual da URL
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
     * Quando middleware.prefixDefault é false, a localidade padrão não é prefixada.
     * Garante que a localidade atual seja válida e não a padrão.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Exclui a localidade padrão
        )
        .includes(currentLocale) // Verifica se a localidade atual está na lista de localidades válidas
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
 * Um componente de roteador que configura rotas específicas para localidades.
 * Ele usa o React Router para gerenciar a navegação e renderizar componentes localizados.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Padrão de rota para capturar a localidade (por exemplo, /en/, /fr/) e combinar todos os caminhos subsequentes
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Envolve filhos com gerenciamento de localidade
      />

      {
        // Se prefixar a localidade padrão estiver desabilitado, renderiza os filhos diretamente no caminho raiz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Envolve filhos com gerenciamento de localidade
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Importando dependências e funções necessárias
import { Locales, getConfiguration } from "intlayer"; // Funções utilitárias e tipos do 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // Provedor para o contexto de internacionalização
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componentes de roteador para gerenciar navegação

// Desestruturando configuração do Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Um componente que lida com a localização e envolve os filhos com o contexto de localidade apropriado.
 * Ele gerencia a detecção e validação da localidade baseada na URL.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Obtém o caminho atual da URL
  const { locale } = useParams(); // Extrai o parâmetro de localidade da URL

  // Determina a localidade atual, reverter para a padrão se não fornecida
  const currentLocale = locale ?? defaultLocale;

  // Remove o prefixo da localidade do caminho para construir um caminho base
  const pathWithoutLocale = removeLocaleFromUrl(
    path // Caminho atual da URL
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
     * Quando middleware.prefixDefault é false, a localidade padrão não é prefixada.
     * Garante que a localidade atual seja válida e não a padrão.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Exclui a localidade padrão
        )
        .includes(currentLocale) // Verifica se a localidade atual está na lista de localidades válidas
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
 * Um componente de roteador que configura rotas específicas para localidades.
 * Ele usa o React Router para gerenciar a navegação e renderizar componentes localizados.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Padrão de rota para capturar a localidade (por exemplo, /en/, /fr/) e combinar todos os caminhos subsequentes
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Envolve filhos com gerenciamento de localidade
      />

      {
        // Se prefixar a localidade padrão estiver desabilitado, renderiza os filhos diretamente no caminho raiz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Envolve filhos com gerenciamento de localidade
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Importando dependências e funções necessárias
const { Locales, getConfiguration, getPathWithoutLocale } = require("intlayer"); // Funções utilitárias e tipos do 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Provedor para o contexto de internacionalização
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Componentes de roteador para gerenciar navegação

// Desestruturando configuração do Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Um componente que lida com a localização e envolve os filhos com o contexto de localidade apropriado.
 * Ele gerencia a detecção e validação da localidade baseada na URL.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Obtém o caminho atual da URL
  const { locale } = useParams(); // Extrai o parâmetro de localidade da URL

  // Determina a localidade atual, reverter para a padrão se não fornecida
  const currentLocale = locale ?? defaultLocale;

  // Remove o prefixo da localidade do caminho para construir um caminho base
  const pathWithoutLocale = removeLocaleFromUrl(
    path // Caminho atual da URL
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
     * Quando middleware.prefixDefault é false, a localidade padrão não é prefixada.
     * Garante que a localidade atual seja válida e não a padrão.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Exclui a localidade padrão
        )
        .includes(currentLocale) // Verifica se a localidade atual está na lista de localidades válidas
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
 * Um componente de roteador que configura rotas específicas para localidades.
 * Ele usa o React Router para gerenciar a navegação e renderizar componentes localizados.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Padrão de rota para capturar a localidade (por exemplo, /en/, /fr/) e combinar todos os caminhos subsequentes
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Envolve filhos com gerenciamento de localidade
      />

      {
        // Se prefixar a localidade padrão estiver desabilitado, renderiza os filhos diretamente no caminho raiz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Envolve filhos com gerenciamento de localidade
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Em paralelo, você também pode usar o `intLayerMiddlewarePlugin` para adicionar roteamento do lado do servidor à sua aplicação. Este plugin detectará automaticamente a localidade atual com base na URL e definirá o cookie de localidade apropriado. Se nenhuma localidade for especificada, o plugin determinará a localidade mais apropriada com base nas preferências de idioma do navegador do usuário. Se nenhuma localidade for detectada, ele redirecionará para a localidade padrão.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {5,10} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const {
  intlayerPlugin,
  intLayerMiddlewarePlugin,
} = require("react-intlayer/vite");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Opcional) Passo 8: Mudar a URL quando a localidade muda

Para mudar a URL quando a localidade muda, você pode usar a propriedade `onLocaleChange` fornecida pelo hook `useLocale`. Em paralelo, você pode usar os hooks `useLocation` e `useNavigate` do `react-router-dom` para atualizar o caminho da URL.

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
  const location = useLocation(); // Obtém o caminho atual da URL. Exemplo: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Construa a URL com a localidade atualizada
    // Exemplo: /es/about com a localidade definida como Espanhol
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
              {/* Idioma na sua própria Localidade - por exemplo, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma na Localidade atual - por exemplo, Francés com localidade atual definida como Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em Inglês - por exemplo, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Idioma na sua própria Localidade - por exemplo, FR */}
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
  const location = useLocation(); // Obtém o caminho atual da URL. Exemplo: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Construa a URL com a localidade atualizada
    // Exemplo: /es/about com a localidade definida como Espanhol
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
              {/* Idioma na sua própria Localidade - por exemplo, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma na Localidade atual - por exemplo, Francés com localidade atual definida como Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em Inglês - por exemplo, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Idioma na sua própria Localidade - por exemplo, FR */}
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
  const location = useLocation(); // Obtém o caminho atual da URL. Exemplo: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Construa a URL com a localidade atualizada
    // Exemplo: /es/about com a localidade definida como Espanhol
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
              {/* Idioma na sua própria Localidade - por exemplo, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma na Localidade atual - por exemplo, Francés com localidade atual definida como Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em Inglês - por exemplo, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Idioma na sua própria Localidade - por exemplo, FR */}
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

O Intlayer usa a ampliação de módulo para obter benefícios do TypeScript e tornar sua base de código mais robusta.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Certifique-se de que sua configuração TypeScript inclua os tipos gerados automaticamente.

```json5 fileName="tsconfig.json"
{
  // sua configuração personalizada
  "include": [
    "src",
    "types", // <- Inclua os tipos gerados automaticamente
  ],
}
```

### Configuração do Git

É recomendável ignorar os arquivos gerados pelo Intlayer. Isso permite evitar o envio deles para o seu repositório Git.

Para isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```
