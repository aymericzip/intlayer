# Introdução à Internacionalização (i18n) com Intlayer, Vite e Preact

> Este pacote está em desenvolvimento. Veja o [issue](https://github.com/aymericzip/intlayer/issues/118) para mais informações. Mostre seu interesse no Intlayer para Preact curtindo o issue.

Veja o [Template de Aplicação](https://github.com/aymericzip/intlayer-vite-preact-template) no GitHub.

## O que é o Intlayer?

**Intlayer** é uma biblioteca de internacionalização (i18n) inovadora e de código aberto, projetada para simplificar o suporte multilíngue em aplicações web modernas.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte ao TypeScript** com tipos autogerados, melhorando a autocompletação e a detecção de erros.
- **Aproveitar recursos avançados**, como detecção dinâmica de localidade e troca de idiomas.

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação Vite e Preact

### Passo 1: Instale as Dependências

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npm install intlayer preact-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer vite-intlayer
```

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md), transpilações e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md).

- **preact-intlayer**
  O pacote que integra o Intlayer com a aplicação Preact. Ele fornece provedores de contexto e hooks para internacionalização no Preact.

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

> Através deste arquivo de configuração, você pode configurar URLs localizados, redirecionamento de middleware, nomes de cookies, a localização e extensão de suas declarações de conteúdo, desativar logs do Intlayer no console e muito mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

### Passo 3: Integre o Intlayer na Configuração do Vite

Adicione o plugin intlayer na sua configuração.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

> O plugin `intlayerPlugin()` do Vite é usado para integrar o Intlayer com o Vite. Ele garante a construção de arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Ele define variáveis de ambiente do Intlayer dentro da aplicação Vite. Além disso, fornece aliases para otimizar o desempenho.

### Passo 4: Declare Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      pt: "Logotipo do Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      pt: "Logotipo do Preact",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      pt: "o contador é ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      pt: "Edite src/app.tsx e salve para testar HMR",
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      pt: "Clique nos logotipos do Vite e Preact para saber mais",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";
// import { h } from 'preact'; // Necessário se você usar JSX diretamente em .mjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      pt: "Logotipo do Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      pt: "Logotipo do Preact",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      pt: "o contador é ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      pt: "Edite src/app.jsx e salve para testar o HMR",
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      pt: "Clique nos logotipos do Vite e Preact para saber mais",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // Necessário se você usar JSX diretamente em .cjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      pt: "Logotipo do Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      pt: "Logotipo do Preact",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      pt: "a contagem é ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      pt: "Edite src/app.tsx e salve para testar HMR",
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      pt: "Clique nos logos do Vite e Preact para saber mais",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "pt": "Logo do Vite",
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "pt": "Logo do Preact",
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "pt": "Vite + Preact",
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "pt": "a contagem é ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "pt": "Edite src/app.tsx e salve para testar HMR",
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "pt": "Clique nos logos do Vite e Preact para saber mais",
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> Suas declarações de conteúdo podem ser definidas em qualquer lugar do seu aplicativo, desde que sejam incluídas no diretório `contentDir` (por padrão, `./src`). E correspondam à extensão do arquivo de declaração de conteúdo (por padrão, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md).

> Se o seu arquivo de conteúdo incluir código TSX, talvez seja necessário importar `import { h } from "preact";` ou garantir que sua pragma JSX esteja configurada corretamente para o Preact.

### Passo 5: Utilize o Intlayer no Seu Código

Acesse seus dicionários de conteúdo em todo o seu aplicativo:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // Supondo que você tenha um preact.svg
import viteLogo from "/vite.svg";
import "./app.css"; // Supondo que seu arquivo CSS seja nomeado app.css
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.jsx" codeFormat="esm"
import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

```jsx {5,9} fileName="src/app.cjsx" codeFormat="commonjs"
const { useState } = require("preact/hooks");
const preactLogo = require("./assets/preact.svg");
const viteLogo = require("/vite.svg");
require("./app.css");
const { IntlayerProvider, useIntlayer } = require("preact-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

> Nota: No Preact, `className` é tipicamente escrito como `class`.

> Para saber mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useIntlayer.md) (A API é semelhante para `preact-intlayer`).

### (Opcional) Passo 6: Alterar o idioma do seu conteúdo

Para alterar o idioma do seu conteúdo, você pode usar a função `setLocale` fornecida pelo hook `useLocale`. Essa função permite definir o locale do aplicativo e atualizar o conteúdo de acordo.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.PORTUGUESE)}>
      Alterar idioma para Português

import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Alterar idioma para Inglês
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Alterar idioma para Inglês
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> Para saber mais sobre o hook `useLocale`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useLocale.md) (A API é semelhante para `preact-intlayer`).

### (Opcional) Etapa 7: Adicione roteamento localizado à sua aplicação

O objetivo desta etapa é criar rotas únicas para cada idioma. Isso é útil para SEO e URLs amigáveis para SEO.
Exemplo:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Por padrão, as rotas não são prefixadas para o idioma padrão. Se você deseja prefixar o idioma padrão, pode definir a opção `middleware.prefixDefault` como `true` na sua configuração. Consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md) para mais informações.

Para adicionar roteamento localizado à sua aplicação, você pode criar um componente `LocaleRouter` que envolve as rotas da sua aplicação e gerencia o roteamento baseado no idioma. Aqui está um exemplo usando [preact-iso](https://github.com/preactjs/preact-iso):

Primeiro, instale o `preact-iso`:

```bash packageManager="npm"
npm install preact-iso
```

```bash packageManager="pnpm"
pnpm add preact-iso
```

```bash packageManager="yarn"
yarn add preact-iso
```

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { type Locales, configuration, getPathWithoutLocale } from "intlayer";
import { ComponentChildren, FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";

const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate: FunctionalComponent<{ to: string; replace?: boolean }> = ({
  to,
  replace,
}) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Um componente que gerencia a localização e envolve os filhos com o contexto de idioma apropriado.
 * Ele gerencia a detecção e validação de idioma baseada na URL.
 */
const AppLocalized: FunctionalComponent<{
  children: ComponentChildren;
  locale?: Locales;
}> = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

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
          (loc) => loc.toString() !== defaultLocale.toString() // Exclui o idioma padrão
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

const RouterContent: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1] as Locales;

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Um componente de roteador que configura rotas específicas para idiomas.
 * Ele usa preact-iso para gerenciar a navegação e renderizar componentes localizados.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
// Importando dependências e funções necessárias
import { configuration, getPathWithoutLocale } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { h } from "preact"; // Necessário para JSX

// Desestruturando configuração do Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Um componente que gerencia a localização e envolve os filhos com o contexto de idioma apropriado.
 * Ele gerencia a detecção e validação de idioma baseada na URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

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
---

* Quando middleware.prefixDefault é falso, o locale padrão não é prefixado.
     * Certifique-se de que o locale atual é válido e não é o locale padrão.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Excluir o locale padrão
        )
        .includes(currentLocale) // Verificar se o locale atual está na lista de locales válidos
    ) {
      // Redirecionar para o caminho sem prefixo de locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envolver os filhos com o IntlayerProvider e definir o locale atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Um componente de roteador que configura rotas específicas para locales.
 * Ele usa preact-iso para gerenciar a navegação e renderizar componentes localizados.
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
// Importando dependências e funções necessárias
const { configuration, getPathWithoutLocale } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, useLocation } = require("preact-iso");
const { useEffect } = require("preact/hooks");
const { h } = require("preact"); // Necessário para JSX

// Desestruturando configuração do Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Um componente que gerencia a localização e envolve os filhos com o contexto de locale apropriado.
 * Ele gerencia a detecção e validação de locale baseada em URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Determinar o locale atual, retornando ao padrão se não fornecido
  const currentLocale = locale ?? defaultLocale;

  // Remover o prefixo de locale do caminho para construir um caminho base
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Caminho atual da URL
  );

  /**
   * Se middleware.prefixDefault for verdadeiro, o locale padrão deve sempre ser prefixado.
   */
  if (middleware.prefixDefault) {
    // Validar o locale
    if (!locale || !locales.includes(locale)) {
      // Redirecionar para o locale padrão com o caminho atualizado
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Substituir a entrada atual do histórico pela nova
        />
      );
    }

    // Envolver os filhos com o IntlayerProvider e definir o locale atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Quando middleware.prefixDefault é falso, o locale padrão não é prefixado.
     * Certifique-se de que o locale atual é válido e não é o locale padrão.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Excluir o locale padrão
        )
        .includes(currentLocale) // Verificar se o locale atual está na lista de locales válidos
    ) {
      // Redirecionar para o caminho sem prefixo de locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Envolver os filhos com o IntlayerProvider e definir o locale atual
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Um componente de roteador que configura rotas específicas para locales.
 * Ele usa preact-iso para gerenciar a navegação e renderizar componentes localizados.
 */
const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);

module.exports = { LocaleRouter };
```

Então, você pode usar o componente `LocaleRouter` em sua aplicação:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
// ... Seu componente AppContent (definido no Passo 5)

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";
// ... Seu componente AppContent (definido no Passo 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");
// ... Seu componente AppContent (definido no Passo 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

Paralelamente, você também pode usar o `intLayerMiddlewarePlugin` para adicionar roteamento no lado do servidor à sua aplicação. Este plugin detectará automaticamente o locale atual com base na URL e definirá o cookie de locale apropriado. Se nenhum locale for especificado, o plugin determinará o locale mais apropriado com base nas preferências de idioma do navegador do usuário. Se nenhum locale for detectado, ele redirecionará para o locale padrão.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Opcional) Passo 8: Alterar a URL quando o locale muda

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url; // preact-iso fornece a URL completa
      // Constrói a URL com o idioma atualizado
      // Exemplo: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // Atualiza o caminho da URL
      route(pathWithLocale, true); // true para substituir
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // A navegação programática após definir o idioma será tratada por onLocaleChange
            }}
            key={localeItem}
          >
            <span>
              {/* Idioma - ex.: FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma no próprio idioma - ex.: Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma no idioma atual - ex.: Francés com o idioma atual definido como Locales.SPANISH */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em inglês - ex.: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import { h } from "preact"; // Para JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { useLocation, route } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { h } = require("preact"); // Para JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

module.exports = LocaleSwitcher;
```

> Referências da documentação:

> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useLocale.md) (A API é semelhante para `preact-intlayer`)

> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getLocaleName.md)

> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getLocalizedUrl.md)

> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getHTMLTextDir.md)

> - [`hreflang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=pt)

> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)

> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)

> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

> - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

Abaixo está o **Passo 9** atualizado com explicações adicionais e exemplos de código refinados:

---

### (Opcional) Passo 9: Alterar os Atributos de Idioma e Direção do HTML

Quando sua aplicação suporta múltiplos idiomas, é crucial atualizar os atributos `lang` e `dir` da tag `<html>` para corresponder ao idioma atual. Fazer isso garante:

- **Acessibilidade**: Leitores de tela e tecnologias assistivas dependem do atributo `lang` correto para pronunciar e interpretar o conteúdo com precisão.
- **Renderização de Texto**: O atributo `dir` (direção) garante que o texto seja renderizado na ordem correta (por exemplo, da esquerda para a direita para inglês, da direita para a esquerda para árabe ou hebraico), essencial para a legibilidade.
- **SEO**: Os motores de busca usam o atributo `lang` para determinar o idioma da sua página, ajudando a exibir o conteúdo localizado correto nos resultados de busca.

Ao atualizar esses atributos dinamicamente quando o idioma muda, você garante uma experiência consistente e acessível para os usuários em todos os idiomas suportados.

#### Implementando o Hook

Crie um hook personalizado para gerenciar os atributos HTML. O hook escuta as mudanças de idioma e atualiza os atributos de forma correspondente:

import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/\*\*

- Atualiza os atributos `lang` e `dir` do elemento HTML <html> com base no idioma atual.
- - `lang`: Informa navegadores e motores de busca sobre o idioma da página.
- - `dir`: Garante a ordem de leitura correta (por exemplo, 'ltr' para inglês, 'rtl' para árabe).
-
- Essa atualização dinâmica é essencial para renderização de texto adequada, acessibilidade e SEO.
  \*/
  export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

useEffect(() => {
// Atualiza o atributo de idioma para o idioma atual.
document.documentElement.lang = locale;

    // Define a direção do texto com base no idioma atual.
    document.documentElement.dir = getHTMLTextDir(locale);

}, [locale]);
};

````

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Atualiza os atributos `lang` e `dir` do elemento HTML <html> com base no idioma atual.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
````

```jsx fileName="src/hooks/useI18nHTMLAttributes.cjsx" codeFormat="commonjs"
const { useEffect } = require("preact/hooks");
const { useLocale } = require("preact-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Atualiza os atributos `lang` e `dir` do elemento HTML <html> com base no idioma atual.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Usando o Hook na Sua Aplicação

Integre o hook no seu componente principal para que os atributos HTML sejam atualizados sempre que o idioma mudar:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // useIntlayer já importado se AppContent precisar
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Definição de AppContent do Passo 5

const AppWithHooks: FunctionalComponent = () => {
  // Aplica o hook para atualizar os atributos lang e dir da tag <html> com base no idioma.
  useI18nHTMLAttributes();

  // Supondo que AppContent seja o componente principal de exibição de conteúdo do Passo 5
  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { IntlayerProvider } from "preact-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Definição de AppContent do Passo 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { IntlayerProvider } = require("preact-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./app.css");
// Definição de AppContent do Passo 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

module.exports = App;
```

Ao aplicar essas alterações, sua aplicação irá:

- Garantir que o atributo **idioma** (`lang`) reflita corretamente o idioma atual, o que é importante para SEO e comportamento do navegador.
- Ajustar a **direção do texto** (`dir`) de acordo com o idioma, melhorando a legibilidade e usabilidade para idiomas com ordens de leitura diferentes.
- Proporcionar uma experiência mais **acessível**, já que tecnologias assistivas dependem desses atributos para funcionar de forma ideal.

### (Opcional) Passo 10: Criando um Componente de Link Localizado

Para garantir que a navegação da sua aplicação respeite o idioma atual, você pode criar um componente de `Link` personalizado. Este componente automaticamente adiciona o prefixo do idioma atual às URLs internas.

Esse comportamento é útil por vários motivos:

- **SEO e Experiência do Usuário**: URLs localizadas ajudam os motores de busca a indexar corretamente as páginas específicas de cada idioma e fornecem aos usuários conteúdo no idioma preferido.
- **Consistência**: Usando um link localizado em toda a aplicação, você garante que a navegação permaneça no idioma atual, evitando mudanças inesperadas de idioma.
- **Manutenibilidade**: Centralizar a lógica de localização em um único componente simplifica o gerenciamento de URLs.

Para Preact com `preact-iso`, tags padrão `<a>` são normalmente usadas para navegação, e o `preact-iso` gerencia o roteamento. Se você precisar de navegação programática ao clicar (por exemplo, para realizar ações antes de navegar), pode usar a função `route` de `useLocation`. Veja como criar um componente de âncora personalizado que localiza URLs:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocation, route } from "preact-intlayer"; // Supondo que useLocation e route possam ser do preact-iso via preact-intlayer se reexportados, ou importados diretamente
// Se não forem reexportados, importe diretamente: import { useLocation, route } from "preact-iso";
import type { JSX } from "preact"; // Para HTMLAttributes
import { forwardRef } from "preact/compat"; // Para encaminhar refs

export interface LocalizedLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean; // Opcional: para substituir o estado do histórico
}

/**
 * Função utilitária para verificar se uma URL é externa.
 * Se a URL começar com http:// ou https://, é considerada externa.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Um componente de Link personalizado que adapta o atributo href com base no idioma atual.
 * Para links internos, ele usa `getLocalizedUrl` para adicionar o prefixo do idioma à URL (por exemplo, /pt/sobre).
 * Isso garante que a navegação permaneça dentro do contexto do idioma atual.
 * Ele usa uma tag padrão <a>, mas pode acionar navegação no cliente usando o `route` do preact-iso.
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation(); // do preact-iso
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href && // Garante que href está definido
        event.button === 0 && // Clique esquerdo
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey && // Verificação de modificadores padrão
        !props.target // Não direcionando para uma nova aba/janela
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          // Navega apenas se a URL for diferente
          route(hrefI18n, replace); // Usa o route do preact-iso
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";

import { useLocation, route } from "preact-iso"; // Importar de preact-iso
import { forwardRef } from "preact/compat";
import { h } from "preact"; // Para JSX

export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

export const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { useLocation, route } = require("preact-iso"); // Importar de preact-iso
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // Para JSX

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);

module.exports = { LocalizedLink, checkIsExternalLink };
```

#### Como Funciona

- **Detectando Links Externos**:  
  A função auxiliar `checkIsExternalLink` determina se uma URL é externa. Links externos permanecem inalterados.
- **Recuperando o Idioma Atual**:  
  O hook `useLocale` fornece o idioma atual.
- **Localizando a URL**:  
  Para links internos, `getLocalizedUrl` adiciona o prefixo do idioma atual à URL.
- **Navegação no Lado do Cliente**:  
  A função `handleClick` verifica se é um link interno e se a navegação padrão deve ser evitada. Se sim, utiliza a função `route` do `preact-iso` (obtida via `useLocation` ou importada diretamente) para realizar a navegação no lado do cliente. Isso proporciona um comportamento semelhante a uma SPA sem recarregar a página inteira.
- **Retornando o Link**:  
  O componente retorna um elemento `<a>` com a URL localizada e o manipulador de clique personalizado.

### Configurar TypeScript

O Intlayer utiliza a ampliação de módulos para aproveitar os benefícios do TypeScript e tornar sua base de código mais robusta.

![texto alternativo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![texto alternativo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Certifique-se de que sua configuração do TypeScript inclua os tipos gerados automaticamente.

```json5 fileName="tsconfig.json"
{
  // ... Suas configurações existentes do TypeScript
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Recomendado para Preact 10+
    // ...
  },
  "include": [
    // ... Suas configurações existentes do TypeScript
    ".intlayer/**/*.ts", // Inclua os tipos gerados automaticamente
  ],
}
```

> Certifique-se de que seu `tsconfig.json` esteja configurado para Preact, especialmente `jsx` e `jsxImportSource` ou `jsxFactory`/`jsxFragmentFactory` para versões mais antigas do Preact, caso não esteja usando os padrões do `preset-vite`.

### Configuração do Git

Recomenda-se ignorar os arquivos gerados pelo Intlayer. Isso permite evitar que sejam adicionados ao seu repositório Git.

Para isso, você pode adicionar as seguintes instruções ao seu arquivo `.gitignore`:

```plaintext
# Ignore os arquivos gerados pelo Intlayer
.intlayer
```

### Extensão do VS Code

Para melhorar sua experiência de desenvolvimento com o Intlayer, você pode instalar a **Extensão Oficial do Intlayer para VS Code**.

[Instale no VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão fornece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Pré-visualizações inline** de conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão do Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Vá Além

## Para ir além, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_CMS.md).
