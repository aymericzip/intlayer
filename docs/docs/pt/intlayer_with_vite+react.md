---
docName: intlayer_with_react_native_and_expo
url: https://intlayer.org/doc/environment/react-native-and-expo
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md
createdAt: 2025-03-07
updatedAt: 2025-03-07
title: Traduza o seu aplicativo móvel React Native e Expo (i18n)
description: Descubra como tornar seu site que utiliza React Native e Expo com Page Router multilíngue. Siga a documentação para internacionalizar (i18n) e traduzi-lo.
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Vite
  - React
  - React Native
  - JavaScript
---

# Começando com Internacionalização (i18n) com Intlayer, Vite e React

<iframe title="Vite + React: Build a Multilingual App from Scratch using Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Veja [Application Template](https://github.com/aymericzip/intlayer-vite-react-template) no GitHub.

## O que é Intlayer?

**Intlayer** é uma biblioteca de internacionalização (i18n) inovadora e de código aberto, projetada para simplificar o suporte multilíngue em aplicações web modernas.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte ao TypeScript** com tipos autogerados, melhorando a autocompletação e a detecção de erros.
- **Aproveitar recursos avançados**, como detecção e troca dinâmica de localidade.

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação Vite e React

### Passo 1: Instale as Dependências

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install --save-dev vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add --save-dev vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add --save-dev vite-intlayer
```

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md).

- **react-intlayer**
  O pacote que integra o Intlayer com a aplicação React. Ele fornece provedores de contexto e hooks para internacionalização no React.

- **vite-intlayer**
  Inclui o plugin Vite para integrar o Intlayer com o [empacotador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), bem como middleware para detectar a localidade preferida do usuário, gerenciar cookies e lidar com redirecionamento de URLs.

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

> Através deste arquivo de configuração, você pode configurar URLs localizados, redirecionamento de middleware, nomes de cookies, a localização e extensão das suas declarações de conteúdo, desativar logs do Intlayer no console e muito mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

### Passo 3: Integre o Intlayer na Configuração do Vite

Adicione o plugin intlayer na sua configuração.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

> O plugin `intlayerPlugin()` do Vite é usado para integrar o Intlayer com o Vite. Ele garante a construção de arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Define variáveis de ambiente do Intlayer dentro da aplicação Vite. Além disso, fornece aliases para otimizar o desempenho.

### Passo 4: Declare Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      pt: "Logo do Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      pt: "Logo do React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      pt: "a contagem é ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      pt: (
        <>
          Edite <code>src/App.tsx</code> e salve para testar o HMR
        </>
      ),
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
      pt: "Clique nos logos do Vite e React para saber mais",
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obter mais informações",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      pt: "Logo do Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      pt: "Logo do React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      pt: "a contagem é ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // Não se esqueça de importar React se você usar um nó React no seu conteúdo
        pt: (
          <>
            Edite <code>src/App.tsx</code> e salve para testar o HMR
          </>
        ),
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
      pt: "Clique nos logos do Vite e React para saber mais",
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obter mais informações",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      pt: "Logo do Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      pt: "Logo do React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      pt: "a contagem é ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit:
      t <
      ReactNode >
      {
        // Não esqueça de importar React se você usar um nó React em seu conteúdo
        pt: (
          <>
            Edite <code>src/App.tsx</code> e salve para testar o HMR
          </>
        ),
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
      pt: "Clique nos logotipos do Vite e React para saber mais",
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

export default appContent;
```

```json fileName="src/app.content.mjs" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite",
        "pt": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React",
        "pt": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React",
        "pt": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "pt": "a contagem é "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR",
        "pt": "Edite src/App.tsx e salve para testar o HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información",
        "pt": "Clique nos logotipos do Vite e React para saber mais"
      }
    }
  }
}
```

> Suas declarações de conteúdo podem ser definidas em qualquer lugar de sua aplicação, desde que estejam incluídas no diretório `contentDir` (por padrão, `./src`). E correspondam à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md).

> Se o seu arquivo de conteúdo incluir código TSX, você deve considerar importar `import React from "react";` em seu arquivo de conteúdo.

### Etapa 5: Utilize o Intlayer no Seu Código

Acesse seus dicionários de conteúdo em toda a sua aplicação:

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

> Se você quiser usar seu conteúdo em um atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., você deve chamar o valor da função, como:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Para saber mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useIntlayer.md).

### (Opcional) Etapa 6: Alterar o idioma do seu conteúdo

Para alterar o idioma do seu conteúdo, você pode usar a função `setLocale` fornecida pelo hook `useLocale`. Esta função permite definir o idioma da aplicação e atualizar o conteúdo de acordo.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.Portuguese)}>
      Alterar idioma para Português
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
    <button onClick={() => setLocale(Locales.Portuguese)}>
      Alterar idioma para Português
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

### (Opcional) Etapa 7: Adicione roteamento localizado à sua aplicação

O objetivo desta etapa é criar rotas únicas para cada idioma. Isso é útil para SEO e URLs amigáveis para SEO.
Exemplo:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Por padrão, as rotas não são prefixadas para o idioma padrão. Se você quiser prefixar o idioma padrão, pode definir a opção `middleware.prefixDefault` como `true` na sua configuração. Consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md) para mais informações.

Para adicionar roteamento localizado à sua aplicação, você pode criar um componente `LocaleRouter` que envolve as rotas da sua aplicação e gerencia o roteamento baseado no idioma. Aqui está um exemplo usando [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Importando dependências e funções necessárias
// Funções utilitárias e tipos do 'intlayer'
import { type Locales, configuration, getPathWithoutLocale } from "intlayer";
import type { FC, PropsWithChildren } from "react"; // Tipos do React para componentes funcionais e props
import { IntlayerProvider } from "react-intlayer"; // Provedor para o contexto de internacionalização
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componentes do Router para gerenciar navegação

// Desestruturando a configuração do Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Um componente que gerencia a localização e envolve os filhos com o contexto de idioma apropriado.
 * Ele gerencia a detecção e validação de idioma baseada na URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Obtém o caminho atual da URL

  // Determina o idioma atual, retornando ao padrão se não for fornecido
  const currentLocale = locale ?? defaultLocale;

  // Remove o prefixo do idioma do caminho para construir um caminho base
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

    // Envolve os filhos com o IntlayerProvider e define o idioma atual
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
      // Redireciona para o caminho sem o prefixo do idioma
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envolve os filhos com o IntlayerProvider e define o idioma atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Um componente de roteador que configura rotas específicas de idioma.
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
            // Padrão de rota para capturar o idioma (ex.: /en/, /fr/) e corresponder a todos os caminhos subsequentes
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Envolve os filhos com o gerenciamento de idioma
          />
        ))}

      {
        // Se o prefixo do idioma padrão estiver desativado, renderiza os filhos diretamente no caminho raiz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Envolve os filhos com o gerenciamento de idioma
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Importando dependências e funções necessárias
// Funções utilitárias e tipos do 'intlayer'
import { configuration, getPathWithoutLocale } from "intlayer";
import { IntlayerProvider } from "react-intlayer"; // Provedor para o contexto de internacionalização
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Componentes do Router para gerenciar navegação

// Desestruturando a configuração do Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Um componente que gerencia a localização e envolve os filhos com o contexto de idioma apropriado.
 * Ele gerencia a detecção e validação de idioma baseada na URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Obtém o caminho atual da URL

  // Determina o idioma atual, retornando ao padrão se não for fornecido
  const currentLocale = locale ?? defaultLocale;

  // Remove o prefixo do idioma do caminho para construir um caminho base
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

    // Envolve os filhos com o IntlayerProvider e define o idioma atual
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
      // Redireciona para o caminho sem o prefixo do idioma
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envolve os filhos com o IntlayerProvider e define o idioma atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Ele usa React Router para gerenciar a navegação e renderizar componentes localizados.
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
            // Padrão de rota para capturar o idioma (ex.: /en/, /fr/) e corresponder a todos os caminhos subsequentes
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Envolve os filhos com o gerenciamento de idioma
          />
        ))}

      {
        // Se o prefixo do idioma padrão estiver desativado, renderize os filhos diretamente no caminho raiz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Envolve os filhos com o gerenciamento de idioma
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Importando dependências e funções necessárias
const { configuration, getPathWithoutLocale } = require("intlayer"); // Funções utilitárias e tipos de 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Provedor para o contexto de internacionalização
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Componentes de roteador para gerenciar navegação

// Desestruturando configuração do Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Um componente que lida com a localização e envolve os filhos com o contexto de idioma apropriado.
 * Ele gerencia a detecção e validação de idioma baseada em URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Obtém o caminho atual da URL

  // Determina o idioma atual, retornando ao padrão se não for fornecido
  const currentLocale = locale ?? defaultLocale;

  // Remove o prefixo do idioma do caminho para construir um caminho base
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

    // Envolve os filhos com o IntlayerProvider e define o idioma atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault é falso, o idioma padrão não é prefixado.
     * Certifique-se de que o idioma atual é válido e não o idioma padrão.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Exclui o idioma padrão
        )
        .includes(currentLocale) // Verifica se o idioma atual está na lista de idiomas válidos
    ) {
      // Redireciona para o caminho sem o prefixo de idioma
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envolve os filhos com o IntlayerProvider e define o idioma atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Um componente de roteador que configura rotas específicas para o idioma.
 * Ele usa React Router para gerenciar a navegação e renderizar componentes localizados.
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
            // Padrão de rota para capturar o idioma (ex.: /en/, /fr/) e corresponder a todos os caminhos subsequentes
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Envolve os filhos com o gerenciamento de idioma
          />
        ))}

      {
        // Se o prefixo do idioma padrão estiver desativado, renderize os filhos diretamente no caminho raiz
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Envolve os filhos com o gerenciamento de idioma
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Então, você pode usar o componente `LocaleRouter` em sua aplicação:

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

Paralelamente, você também pode usar o `intLayerMiddlewarePlugin` para adicionar roteamento no lado do servidor à sua aplicação. Este plugin detectará automaticamente o idioma atual com base na URL e definirá o cookie de idioma apropriado. Se nenhum idioma for especificado, o plugin determinará o idioma mais apropriado com base nas preferências de idioma do navegador do usuário. Se nenhum idioma for detectado, ele redirecionará para o idioma padrão.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {5,10} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Opcional) Etapa 8: Alterar a URL quando o idioma muda

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
      // Construa a URL com o locale atualizado
      // Exemplo: /pt/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Atualize o caminho da URL
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
              {/* Locale - ex.: PT */}
              {localeItem}
            </span>
            <span>
              {/* Idioma no próprio Locale - ex.: Português */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma no Locale atual - ex.: Portugués com o locale atual definido como Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em Inglês - ex.: Portuguese */}
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
  const { pathname, search } = useLocation(); // Obtenha o caminho atual da URL. Exemplo: /pt/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construa a URL com o locale atualizado
      // Exemplo: /pt/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Atualize o caminho da URL
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
              {/* Locale - ex.: PT */}
              {localeItem}
            </span>
            <span>
              {/* Idioma no próprio Locale - ex.: Português */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma no Locale atual - ex.: Portugués com o locale atual definido como Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em Inglês - ex.: Portuguese */}
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
  const { pathname, search } = useLocation(); // Obtenha o caminho atual da URL. Exemplo: /pt/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construa a URL com o locale atualizado
      // Exemplo: /pt/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Atualize o caminho da URL
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
              {/* Locale - ex.: PT */}
              {localeItem}
            </span>
            <span>
              {/* Idioma no próprio Locale - ex.: Português */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma no Locale atual - ex.: Portugués com o locale atual definido como Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em Inglês - ex.: Portuguese */}
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
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

---

### (Opcional) Passo 9: Alterar os Atributos de Idioma e Direção do HTML

Quando sua aplicação suporta múltiplos idiomas, é crucial atualizar os atributos `lang` e `dir` da tag `<html>` para corresponder ao locale atual. Fazer isso garante:

- **Acessibilidade**: Leitores de tela e tecnologias assistivas dependem do atributo `lang` correto para pronunciar e interpretar o conteúdo com precisão.
- **Renderização de Texto**: O atributo `dir` (direção) garante que o texto seja renderizado na ordem correta (ex.: da esquerda para a direita para o inglês, da direita para a esquerda para o árabe ou hebraico), essencial para a legibilidade.
- **SEO**: Motores de busca utilizam o atributo `lang` para determinar o idioma da sua página, ajudando a fornecer o conteúdo localizado correto nos resultados de busca.

Ao atualizar esses atributos dinamicamente quando o locale muda, você garante uma experiência consistente e acessível para os usuários em todos os idiomas suportados.

#### Implementando o Hook

Crie um hook personalizado para gerenciar os atributos HTML. O hook escuta as mudanças de locale e atualiza os atributos de acordo:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**

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

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

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

#### Usando o Hook em Sua Aplicação

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

- Garantir que o atributo **idioma** (`lang`) reflita corretamente o idioma atual, o que é importante para SEO e comportamento do navegador.
- Ajustar a **direção do texto** (`dir`) de acordo com o idioma, melhorando a legibilidade e usabilidade para idiomas com diferentes ordens de leitura.
- Proporcionar uma experiência mais **acessível**, já que tecnologias assistivas dependem desses atributos para funcionar de forma otimizada.

### (Opcional) Etapa 10: Criando um Componente de Link Localizado

Para garantir que a navegação da sua aplicação respeite o idioma atual, você pode criar um componente `Link` personalizado. Este componente automaticamente adiciona o prefixo do idioma atual às URLs internas. Por exemplo, quando um usuário que fala francês clica em um link para a página "Sobre", ele é redirecionado para `/pt/about` em vez de `/about`.

Esse comportamento é útil por várias razões:

- **SEO e Experiência do Usuário**: URLs localizadas ajudam os motores de busca a indexar páginas específicas de idioma corretamente e fornecem aos usuários conteúdo no idioma preferido.
- **Consistência**: Usando um link localizado em toda a aplicação, você garante que a navegação permaneça no idioma atual, evitando mudanças inesperadas de idioma.
- **Manutenibilidade**: Centralizar a lógica de localização em um único componente simplifica o gerenciamento de URLs, tornando seu código mais fácil de manter e expandir à medida que sua aplicação cresce.

Abaixo está a implementação de um componente `Link` localizado em TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

/**
 * Função utilitária para verificar se uma URL fornecida é externa.
 * Se a URL começar com http:// ou https://, ela é considerada externa.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Um componente Link personalizado que adapta o atributo href com base no idioma atual.
 * Para links internos, ele usa `getLocalizedUrl` para prefixar a URL com o idioma (por exemplo, /pt/about).
 * Isso garante que a navegação permaneça no mesmo contexto de idioma.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Se o link for interno e um href válido for fornecido, obtenha a URL localizada.
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { forwardRef } from "react";

/**
 * Função utilitária para verificar se uma URL fornecida é externa.
 * Se a URL começar com http:// ou https://, ela é considerada externa.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Um componente Link personalizado que adapta o atributo href com base no idioma atual.
 * Para links internos, ele usa `getLocalizedUrl` para prefixar a URL com o idioma (por exemplo, /pt/about).
 * Isso garante que a navegação permaneça no mesmo contexto de idioma.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {

const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Se o link for interno e um href válido for fornecido, obtenha a URL localizada.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return (
    <a href={hrefI18n} ref={ref} {...props}>
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("react-intlayer");
const { forwardRef } = require("react");

/**
 * Função utilitária para verificar se uma URL fornecida é externa.
 * Se a URL começar com http:// ou https://, ela é considerada externa.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Um componente Link personalizado que adapta o atributo href com base no idioma atual.
 * Para links internos, ele usa `getLocalizedUrl` para prefixar a URL com o idioma (por exemplo, /pt/sobre).
 * Isso garante que a navegação permaneça dentro do mesmo contexto de idioma.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Se o link for interno e um href válido for fornecido, obtenha a URL localizada.
  const localizedHref = isExternalLink ? href : getLocalizedUrl(href, locale);

  return (
    <a
      href={localizedHref}
      ref={ref}
      {...props}
      aria-current={isExternalLink ? "external" : undefined}
    >
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

#### Como Funciona

- **Detectando Links Externos**:  
  A função auxiliar `checkIsExternalLink` determina se uma URL é externa. Links externos permanecem inalterados porque não precisam de localização.

- **Recuperando o Idioma Atual**:  
  O hook `useLocale` fornece o idioma atual (por exemplo, `pt` para Português).

- **Localizando a URL**:  
  Para links internos (ou seja, não externos), `getLocalizedUrl` é usado para prefixar automaticamente a URL com o idioma atual. Isso significa que, se o usuário estiver em Português, passar `/sobre` como o `href` transformará para `/pt/sobre`.

- **Retornando o Link**:  
  O componente retorna um elemento `<a>` com a URL localizada, garantindo que a navegação seja consistente com o idioma.

Ao integrar este componente `Link` em toda a sua aplicação, você mantém uma experiência de usuário coerente e sensível ao idioma, além de se beneficiar de melhorias em SEO e usabilidade.

### Configurar TypeScript

O Intlayer usa a ampliação de módulos para aproveitar os benefícios do TypeScript e tornar sua base de código mais robusta.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Certifique-se de que sua configuração do TypeScript inclua os tipos gerados automaticamente.

```json5 fileName="tsconfig.json"
{
  // ... Suas configurações existentes do TypeScript
  "include": [
    // ... Suas configurações existentes do TypeScript
    ".intlayer/**/*.ts", // Inclua os tipos gerados automaticamente
  ],
}
```

### Configuração do Git

Recomenda-se ignorar os arquivos gerados pelo Intlayer. Isso permite evitar que eles sejam adicionados ao seu repositório Git.

Para fazer isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext
# Ignore os arquivos gerados pelo Intlayer
.intlayer
```

### Explore Mais

Para explorar mais, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).
