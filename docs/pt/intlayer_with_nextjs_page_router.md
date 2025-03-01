# Introdução à Internacionalização (i18n) com Intlayer e Next.js usando Page Router

## O que é o Intlayer?

**Intlayer** é uma biblioteca inovadora e de código aberto para internacionalização (i18n) projetada para simplificar o suporte multilíngue em aplicações web modernas. O Intlayer integra-se perfeitamente com o mais recente framework **Next.js**, incluindo seu tradicional **Page Router**.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte ao TypeScript** com tipos autogerados, melhorando a autocompletação e a detecção de erros.
- **Aproveitar recursos avançados**, como detecção e troca dinâmica de localidade.

> O Intlayer é compatível com Next.js 12, 13, 14 e 15. Se você estiver usando o Next.js App Router, consulte o [guia do App Router](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_14.md). Para o Next.js 15, siga este [guia](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md).

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação Next.js Usando Page Router

### Passo 1: Instale as Dependências

Instale os pacotes necessários usando o gerenciador de pacotes de sua preferência:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

- **intlayer**

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md).

- **next-intlayer**

  O pacote que integra o Intlayer com o Next.js. Ele fornece provedores de contexto e hooks para internacionalização no Next.js. Além disso, inclui o plugin Next.js para integrar o Intlayer com o [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), bem como middleware para detectar a localidade preferida do usuário, gerenciar cookies e lidar com redirecionamento de URLs.

### Passo 2: Configure Seu Projeto

Crie um arquivo de configuração para definir os idiomas suportados pela sua aplicação:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Adicione outras localidades aqui
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
      // Adicione outras localidades aqui
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
      // Adicione outras localidades aqui
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Por meio deste arquivo de configuração, você pode configurar URLs localizados, redirecionamento de middleware, nomes de cookies, a localização e extensão de suas declarações de conteúdo, desativar logs do Intlayer no console e muito mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

### Passo 3: Integre o Intlayer com a Configuração do Next.js

Modifique sua configuração do Next.js para incorporar o Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sua configuração existente do Next.js
};

export default withIntlayer(nextConfig);
```

> O plugin `withIntlayer()` do Next.js é usado para integrar o Intlayer com o Next.js. Ele garante a construção de arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Define variáveis de ambiente do Intlayer nos ambientes [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Além disso, fornece aliases para otimizar o desempenho e garante compatibilidade com componentes do servidor.

### Passo 4: Configure o Middleware para Detecção de Localidade

Configure o middleware para detectar e lidar automaticamente com a localidade preferida do usuário:

```typescript fileName="src/middleware.ts" codeFormat="typescript"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
const { intlayerMiddleware } = require("next-intlayer/middleware");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { middleware: intlayerMiddleware, config };
```

> Adapte o parâmetro `matcher` para corresponder às rotas da sua aplicação. Para mais detalhes, consulte a [documentação do Next.js sobre configuração do matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

### Passo 5: Defina Rotas Dinâmicas de Localidade

Implemente roteamento dinâmico para servir conteúdo localizado com base na localidade do usuário.

1.  **Crie Páginas Específicas para Localidade:**

    Renomeie o arquivo da sua página principal para incluir o segmento dinâmico `[locale]`.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **Atualize `_app.tsx` para Lidar com Localização:**

    Modifique seu `_app.tsx` para incluir provedores do Intlayer.

    ```tsx fileName="src/pages/_app.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { AppProps } from "next/app";
    import { IntlayerClientProvider } from "next-intlayer";

    const App = FC<AppProps>({ Component, pageProps }) => {
      const { locale } = pageProps;

      return (
        <IntlayerClientProvider locale={locale}>
          <Component {...pageProps} />
        </IntlayerClientProvider>
      );
    }

    export default MyApp;
    ```

    ```jsx fileName="src/pages/_app.mjx" codeFormat="esm"
    import { IntlayerClientProvider } from "next-intlayer";

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    export default App;
    ```

    ```jsx fileName="src/pages/_app.csx" codeFormat="commonjs"
    const { IntlayerClientProvider } = require("next-intlayer");

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    module.exports = App;
    ```

3.  **Configure `getStaticPaths` e `getStaticProps`:**

    No seu `[locale]/index.tsx`, defina os caminhos e propriedades para lidar com diferentes localidades.

    ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { GetStaticPaths, GetStaticProps } from "next";
    import { type Locales, getConfiguration } from "intlayer";

    const HomePage: FC = () => <div>{/* Seu conteúdo aqui */}</div>;

    export const getStaticPaths: GetStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps: GetStaticProps = ({ params }) => {
      const locale = params?.locale as string;

      return {
        props: {
          locale,
        },
      };
    };

    export default HomePage;
    ```

    ```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
    import { getConfiguration } from "intlayer";
    import { ComponentExample } from "@components/ComponentExample";

    const HomePage = () => <div>{/* Seu conteúdo aqui */}</div>;

    export const getStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps = ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };
    ```

    ```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
    const { getConfiguration } = require("intlayer");
    const { ComponentExample } = require("@components/ComponentExample");

    const HomePage = () => <div>{/* Seu conteúdo aqui */}</div>;

    const getStaticPaths = async () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    const getStaticProps = async ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };

    module.exports = {
      getStaticProps,
      getStaticPaths,
      default: HomePage,
    };
    ```

> `getStaticPaths` e `getStaticProps` garantem que sua aplicação pré-construa as páginas necessárias para todas as localidades no Next.js Page Router. Essa abordagem reduz a computação em tempo de execução e melhora a experiência do usuário. Para mais detalhes, consulte a documentação do Next.js sobre [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) e [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props).

### Passo 6: Declare Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
      pt: "Bem-vindo ao meu site",
    }),
    description: t({
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
      pt: "Comece editando esta página.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```
