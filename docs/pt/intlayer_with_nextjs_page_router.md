# Começando com Internacionalização (i18n) usando Intlayer e Next.js com Page Router

## O que é o Intlayer?

**Intlayer** é uma biblioteca de internacionalização (i18n) inovadora e de código aberto, projetada para simplificar o suporte multilíngue em aplicações web modernas. O Intlayer se integra perfeitamente com o mais recente framework **Next.js**, incluindo seu tradicional **Page Router**.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte ao TypeScript** com tipos autogerados, melhorando a autocompletação e a detecção de erros.
- **Aproveitar recursos avançados**, como detecção e troca dinâmica de localidade.

> O Intlayer é compatível com Next.js 12, 13, 14 e 15. Se você estiver usando o Next.js App Router, consulte o [guia do App Router](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_14.md). Para o Next.js 15, siga este [guia](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md).

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação Next.js Usando Page Router

### Passo 1: Instale as Dependências

Instale os pacotes necessários usando seu gerenciador de pacotes preferido:

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

  O pacote principal que fornece ferramentas de internacionalização para gerenciamento de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md), transpiração e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md).

- **next-intlayer**

  O pacote que integra o Intlayer com o Next.js. Ele fornece provedores de contexto e hooks para internacionalização no Next.js. Além disso, inclui o plugin Next.js para integrar o Intlayer com [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), bem como middleware para detectar a localidade preferida do usuário, gerenciar cookies e lidar com redirecionamento de URLs.

### Passo 2: Configure Seu Projeto

Crie um arquivo de configuração para definir os idiomas suportados pela sua aplicação:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
// Configuração do Intlayer
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
// Configuração do Intlayer
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
// Configuração do Intlayer
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
// Integração do Intlayer com Next.js
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sua configuração existente do Next.js
};

export default withIntlayer(nextConfig);
```

> O plugin `withIntlayer()` do Next.js é usado para integrar o Intlayer com o Next.js. Ele garante a construção de arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Define variáveis de ambiente do Intlayer nos ambientes [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Além disso, fornece aliases para otimizar o desempenho e garante compatibilidade com componentes do servidor.

### Passo 4: Configure Middleware para Detecção de Localidade

Configure o middleware para detectar e lidar automaticamente com a localidade preferida do usuário:

```typescript fileName="src/middleware.ts" codeFormat="typescript"
// Middleware para detecção de localidade
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
// Middleware para detecção de localidade
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
// Middleware para detecção de localidade
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

1.  **Crie Páginas Específicas para Localidades:**

    Renomeie o arquivo da sua página principal para incluir o segmento dinâmico `[locale]`.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **Atualize `_app.tsx` para Lidar com Localização:**

        Modifique seu `_app.tsx` para incluir provedores do Intlayer.

        ```tsx fileName="src/pages/_app.tsx" codeFormat="typescript"

    // Configuração do App com Intlayer
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

    // Configuração do App com Intlayer
    import { IntlayerClientProvider } from "next-intlayer";

        const App = ({ Component, pageProps }) => (
          <IntlayerClientProvider locale={locale}>
            <Component {...pageProps} />
          </IntlayerClientProvider>
        );

        export default App;
        ```

        ```jsx fileName="src/pages/_app.csx" codeFormat="commonjs"

    // Configuração do App com Intlayer
    const { IntlayerClientProvider } = require("next-intlayer");

        const App = ({ Component, pageProps }) => (
          <IntlayerClientProvider locale={locale}>
            <Component {...pageProps} />
          </IntlayerClientProvider>
        );

        module.exports = App;
        ```

3.  **Configure `getStaticPaths` e `getStaticProps`:**

        No seu `[locale]/index.tsx`, defina os caminhos e as propriedades para lidar com diferentes localidades.

        ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"

    // Configuração de rotas dinâmicas
    import type { FC } from "react";
    import type { GetStaticPaths, GetStaticProps } from "next";
    import { type Locales, getConfiguration } from "intlayer";

const HomePage: FC = () => <div>{/_ Seu conteúdo aqui _/}</div>;

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

> `getStaticPaths` e `getStaticProps` garantem que sua aplicação pré-construa as páginas necessárias para todos os idiomas no Next.js Page Router. Essa abordagem reduz o cálculo em tempo de execução e melhora a experiência do usuário. Para mais detalhes, consulte a documentação do Next.js sobre [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) e [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props).

### Passo 6: Declare Seu Conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      pt: "Bem-vindo ao Meu Site",
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      pt: "Comece editando esta página.",
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        pt: "Comece editando esta página.",
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        pt: "Comece editando esta página.",
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = homeContent;
```

```json fileName="src/pages/[locale]/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "pt": "Comece editando esta página.",
        "en": "Get started by editing this page.",
        "fr": "Commencez par éditer cette page.",
        "es": "Comience por editar esta página."
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "pt": "src/app/page.tsx",
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

Para mais informações sobre como declarar conteúdo, consulte o [guia de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md).

### Passo 7: Utilize o Conteúdo no Seu Código

Acesse seus dicionários de conteúdo em toda a aplicação para exibir o conteúdo traduzido.

```tsx {2,6} fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage: FC = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* Componentes adicionais */}
    </div>
  );
};

// ... Resto do código, incluindo getStaticPaths e getStaticProps

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* Componentes adicionais */}
    </div>
  );
};

// ... Resto do código, incluindo getStaticPaths e getStaticProps

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");
const { ComponentExample } = require("@components/ComponentExample");

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* Componentes adicionais */}
    </div>
  );
};

// ... Resto do código, incluindo getStaticPaths e getStaticProps
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // Certifique-se de ter uma declaração de conteúdo correspondente

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // Certifique-se de ter uma declaração de conteúdo correspondente

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // Certifique-se de ter uma declaração de conteúdo correspondente

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Ao usar traduções em atributos `string` (por exemplo, `alt`, `title`, `href`, `aria-label`), chame o

> valor da função da seguinte forma:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Para saber mais sobre o hook `useIntlayer`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/next-intlayer/useIntlayer.md).

### (Opcional) Etapa 8: Internacionalizar Seus Metadados

Para internacionalizar metadados como títulos e descrições de páginas, use a função `getStaticProps` em conjunto com a função `getTranslation` do Intlayer.

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslation, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // Os metadados podem ser usados no head ou em outros componentes conforme necessário
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Conteúdo adicional */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = <T,>(content: IConfigLocales<T>) => getTranslation(content, locale);

  const metadata = {
    title: t({
      pt: "Meu Site",
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      pt: "Bem-vindo ao meu site.",
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... Resto do código incluindo getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslation, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

const HomePage = ({ metadata }) => {
  // Os metadados podem ser usados no head ou em outros componentes conforme necessário
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Conteúdo adicional */}
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = (content) =>
    getTranslation(content, locale);

  const metadata = {
    title: t({
      pt: "Meu Site",
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      pt: "Bem-vindo ao meu site.",
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... Resto do código incluindo getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { GetStaticPaths, GetStaticProps } = require("next");
const { type IConfigLocales, getTranslation, Locales } = require("intlayer");
const { useIntlayer } = require("next-intlayer");

const HomePage = ({ metadata }) => {
  // Os metadados podem ser usados no head ou em outros componentes conforme necessário
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Conteúdo adicional */}
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  const t = (content) =>
    getTranslation(content, locale);

  const metadata = {
    title: t({
      pt: "Meu Site",
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      pt: "Bem-vindo ao meu site.",
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};

// ... Resto do código incluindo getStaticPaths
```

### (Opcional) Etapa 9: Alterar o Idioma do Seu Conteúdo

Para alterar o idioma do seu conteúdo no Next.js, a maneira recomendada é usar o componente `Link` para redirecionar os usuários para a página localizada apropriada. O componente `Link` permite o pré-carregamento da página, o que ajuda a evitar um recarregamento completo da página.

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat="typescript"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* Locale - ex.: FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma no próprio Locale - ex.: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma no Locale atual - ex.: Francés com o locale atual definido como Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em Inglês - ex.: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="esm"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* Locale - ex.: FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma no próprio Locale - ex.: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma no Locale atual - ex.: Francés com o locale atual definido como Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em Inglês - ex.: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="commonjs"
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocalePageRouter } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <select>
      {availableLocales.map((localeItem) => (
        <option value={localeItem} key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Localidade - ex. FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma na sua própria Localidade - ex. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma na Localidade atual - ex. Francés com a localidade atual definida como Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em Inglês - ex. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        </option>
      ))}
    </select>
  );
};
```

> A API `useLocalePageRouter` é a mesma que `useLocale`. Para saber mais sobre o hook `useLocale`, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/next-intlayer/useLocale.md).

> Referências da documentação:
>
> - [Hook `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getLocaleName.md)
> - [Hook `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getLocalizedUrl.md)
> - [Hook `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getHTMLTextDir.md)
> - [Atributo `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [Atributo `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [Atributo `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [Atributo `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Opcional) Etapa 10: Criando um Componente de Link Localizado

Para garantir que a navegação da sua aplicação respeite a localidade atual, você pode criar um componente `Link` personalizado. Este componente automaticamente adiciona um prefixo aos URLs internos com o idioma atual. Por exemplo, quando um usuário que fala francês clica em um link para a página "Sobre", ele é redirecionado para `/fr/about` em vez de `/about`.

Esse comportamento é útil por várias razões:

- **SEO e Experiência do Usuário**: URLs localizados ajudam os motores de busca a indexar corretamente as páginas específicas de idioma e fornecem aos usuários conteúdo no idioma preferido.
- **Consistência**: Usando um link localizado em toda a aplicação, você garante que a navegação permaneça na localidade atual, evitando mudanças inesperadas de idioma.
- **Manutenibilidade**: Centralizar a lógica de localização em um único componente simplifica o gerenciamento de URLs, tornando sua base de código mais fácil de manter e expandir à medida que sua aplicação cresce.

Abaixo está a implementação de um componente `Link` localizado em TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * Função utilitária para verificar se um URL é externo.
 * Se o URL começar com http:// ou https://, ele é considerado externo.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Um componente de Link personalizado que adapta o atributo href com base na localidade atual.
 * Para links internos, ele usa `getLocalizedUrl` para prefixar o URL com a localidade (ex.: /fr/about).
 * Isso garante que a navegação permaneça no mesmo contexto de localidade.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Se o link for interno e um href válido for fornecido, obtenha o URL localizado.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
'use client';

import { getLocalizedUrl } from 'intlayer';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { useLocale } from 'next-intlayer';
import { forwardRef, PropsWithChildren, type ForwardedRef } from 'react';

/**
 * Função utilitária para verificar se um URL é externo.
 * Se o URL começar com http:// ou https://, ele é considerado externo.
 */
export const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');

/**
 * Um componente de Link personalizado que adapta o atributo href com base na localidade atual.
 * Para links internos, ele usa `getLocalizedUrl` para prefixar o URL com a localidade (ex.: /fr/about).
 * Isso garante que a navegação permaneça no mesmo contexto de localidade.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Se o link for interno e um href válido for fornecido, obtenha o URL localizado.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
'use client';

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");
const { forwardRef } = require("react");

/**
 * Função utilitária para verificar se um URL é externo.
 * Se o URL começar com http:// ou https://, ele é considerado externo.
 */
const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');


const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Se o link for interno e um href válido for fornecido, obtenha o URL localizado.
  const hrefI18n: NextLinkProps['href'] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

#### Como Funciona

- **Detectando Links Externos**:  
  A função auxiliar `checkIsExternalLink` determina se um URL é externo. Links externos permanecem inalterados porque não precisam de localização.

- **Recuperando a Localidade Atual**:  
  O hook `useLocale` fornece a localidade atual (ex.: `fr` para francês).

- **Localizando o URL**:  
  Para links internos (ou seja, não externos), `getLocalizedUrl` é usado para prefixar automaticamente o URL com a localidade atual. Isso significa que, se o usuário estiver em francês, passar `/about` como `href` será transformado em `/fr/about`.

- **Retornando o Link**:  
  O componente retorna um elemento `<a>` com o URL localizado, garantindo que a navegação seja consistente com a localidade.

### (Opcional) Passo 11: Otimize o tamanho do seu bundle

Ao usar o `next-intlayer`, os dicionários são incluídos no bundle de cada página por padrão. Para otimizar o tamanho do bundle, o Intlayer fornece um plugin SWC opcional que substitui inteligentemente as chamadas `useIntlayer` usando macros. Isso garante que os dicionários sejam incluídos apenas nos bundles das páginas que realmente os utilizam.

Para habilitar essa otimização, instale o pacote `@intlayer/swc`. Uma vez instalado, o `next-intlayer` detectará automaticamente e usará o plugin:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

> Nota: Esta otimização só está disponível em Next.js 13 e superior.

> Nota: Este pacote não é instalado por padrão porque o plugin SWC ainda está em fase experimental no Next.js. Isso pode mudar no futuro.

### Configurar TypeScript

O Intlayer utiliza a ampliação de módulos para aproveitar os benefícios do TypeScript e tornar sua base de código mais robusta.

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

Para manter seu repositório limpo e evitar o commit de arquivos gerados, é recomendado ignorar os arquivos criados pelo Intlayer.

Adicione as seguintes linhas ao seu arquivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignore os arquivos gerados pelo Intlayer
.intlayer
```

## Recursos Adicionais

- **Documentação do Intlayer:** [Repositório no GitHub](https://github.com/aymericzip/intlayer)
- **Guia do Dicionário:** [Dicionário](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md)
- **Documentação de Configuração:** [Guia de Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md)

Seguindo este guia, você pode integrar efetivamente o Intlayer em sua aplicação Next.js usando o Page Router, permitindo suporte robusto e escalável à internacionalização para seus projetos web.

### Avance Mais

Para ir além, você pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_visual_editor.md) ou externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_CMS.md).
