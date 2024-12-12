# Começando a Internacionalização (i18n) com Intlayer e Next.js usando Page Router

## O que é Intlayer?

**Intlayer** é uma biblioteca de internacionalização (i18n) inovadora e de código aberto, projetada para simplificar o suporte multilíngue em aplicações web modernas. O Intlayer se integra perfeitamente ao framework **Next.js** mais recente, incluindo seu **Page Router** tradicional.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte a TypeScript** com tipos gerados automaticamente, melhorando a autocompletação e a detecção de erros.
- **Beneficiar-se de recursos avançados**, como detecção e troca dinâmica de idioma.

> Nota: O Intlayer é compatível com Next.js 12, 13, 14 e 15. Se você estiver usando o Next.js App Router, consulte o [guia do App Router](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_14.md). Para Next.js 15, siga este [guia](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md).

---

## Guia Passo a Passo para Configurar o Intlayer em uma Aplicação Next.js Usando Page Router

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando seu gerenciador de pacotes preferido:

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### Passo 2: Configure Seu Projeto

Crie um arquivo de configuração para definir os idiomas suportados por sua aplicação:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Adicione seus outros idiomas aqui
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Para uma lista completa de opções de configuração disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

### Passo 3: Integre o Intlayer com a Configuração do Next.js

Modifique sua configuração do Next.js para incorporar o Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sua configuração existente do Next.js
};

export default withIntlayer(nextConfig);
```

### Passo 4: Configure Middleware para Detecção de Idioma

Configure middleware para detectar e tratar automaticamente o idioma preferido do usuário:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Passo 5: Defina Rotas Dinâmicas de Idioma

Implemente roteamento dinâmico para servir conteúdo localizado com base no idioma do usuário.

1. **Crie Páginas Específicas de Idioma:**

   Renomeie o arquivo da sua página principal para incluir o segmento dinâmico `[locale]`.

   ```bash
   mv src/pages/index.tsx src/pages/[locale]/index.tsx
   ```

2. **Atualize `_app.tsx` para Lidar com Localização:**

   Modifique seu `_app.tsx` para incluir os provedores do Intlayer.

   ```tsx
   // src/pages/_app.tsx

   import { AppProps } from "next/app";
   import { IntlayerClientProvider } from "next-intlayer";
   import { IntlayerServerProvider } from "next-intlayer/server";
   import intlayerConfig from "../../intlayer.config";

   function MyApp({ Component, pageProps }: AppProps) {
     const { locale } = pageProps;

     return (
       <IntlayerClientProvider locale={locale}>
         <Component {...pageProps} />
       </IntlayerClientProvider>
     );
   }

   export default MyApp;
   ```

3. **Configure `getStaticPaths` e `getStaticProps`:**

   No seu `[locale]/index.tsx`, defina os caminhos e propriedades para lidar com diferentes idiomas.

   ```tsx
   // src/pages/[locale]/index.tsx

   import { GetStaticPaths, GetStaticProps } from "next";
   import { useIntlayer } from "next-intlayer";
   import { Locales } from "intlayer";

   const HomePage = () => {
     return <div>{/* Seu conteúdo aqui */}</div>;
   };

   export const getStaticPaths: GetStaticPaths = async () => {
     const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH]; // Adicione seus idiomas aqui

     const paths = locales.map((locale) => ({
       params: { locale },
     }));

     return { paths, fallback: false };
   };

   export const getStaticProps: GetStaticProps = async ({ params }) => {
     const locale = params?.locale as string;

     return {
       props: {
         locale,
       },
     };
   };

   export default HomePage;
   ```

### Passo 6: Declare Seu Conteúdo

Crie e gerencie seus dicionários de conteúdo para armazenar traduções.

```tsx
// src/pages/[locale]/home.content.ts
import { t, type DeclarationContent } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies DeclarationContent;

export default homeContent;
```

Para mais informações sobre a declaração de conteúdo, consulte o [guia de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md).

### Passo 7: Utilize Conteúdo em Seu Código

Acesse seus dicionários de conteúdo em toda a sua aplicação para exibir conteúdo traduzido.

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { useIntlayer } from "next-intlayer";
import { Locales } from "intlayer";
import { ComponentExample } from "@component/ComponentExample";

const HomePage = () => {
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

```tsx
// src/components/ComponentExample.tsx

import { useIntlayer } from "next-intlayer";

export const ComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Certifique-se de ter uma declaração de conteúdo correspondente

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> **Nota:** Ao usar traduções em atributos `string` (por exemplo, `alt`, `title`, `href`, `aria-label`), chame o valor da função da seguinte forma:

```tsx
<img src={content.image.src.value} alt={content.image.value} />
```

### (Opcional) Passo 8: Internacionalize Seus Metadados

Para internacionalizar metadados como títulos e descrições de página, use a função `getStaticProps` em conjunto com a função `getTranslationContent` do Intlayer.

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // Os metadados podem ser usados no cabeçalho ou em outros componentes conforme necessário
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

  const t = <T,>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
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

### (Opcional) Passo 9: Mudar o Idioma do Seu Conteúdo

Para permitir que os usuários troquem de idioma dinamicamente, use a função `setLocale` fornecida pelo hook `useLocale`.

```tsx
// src/components/LanguageSwitcher.tsx

import { Locales } from "intlayer";
import { useLocalePageRouter } from "next-intlayer";

const LanguageSwitcher = () => {
  const { setLocale } = useLocalePageRouter();

  return (
    <div>
      <button onClick={() => setLocale(Locales.ENGLISH)}>English</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>Français</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>Español</button>
      {/* Adicione mais botões para idiomas adicionais */}
    </div>
  );
};

export default LanguageSwitcher;
```

### Configurar TypeScript

O Intlayer usa a ampliação de módulo para melhorar as capacidades do TypeScript, proporcionando melhor segurança de tipo e autocompletação.

1. **Certifique-se de que o TypeScript Inclui Tipos Gerados Automaticamente:**

   Atualize seu `tsconfig.json` para incluir os tipos gerados automaticamente.

   ```json
   // tsconfig.json

   {
     "compilerOptions": {
       // Suas configurações existentes do TypeScript
     },
     "include": [
       "src",
       "types" // Inclua os tipos gerados automaticamente
     ]
   }
   ```

2. **Exemplo dos Benefícios do TypeScript:**

   ![Exemplo de Autocompletação](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![Exemplo de Erro de Tradução](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### Configuração do Git

Para manter seu repositório limpo e evitar o commit de arquivos gerados, é recomendável ignorar arquivos criados pelo Intlayer.

1. **Atualize o `.gitignore`:**

   Adicione as seguintes linhas ao seu arquivo `.gitignore`:

   ```gitignore
   # Ignorar os arquivos gerados pelo Intlayer
   .intlayer
   ```

## Recursos Adicionais

- **Documentação do Intlayer:** [Repositório do GitHub](https://github.com/aymericzip/intlayer)
- **Guia de Declaração de Conteúdo:** [Declaração de Conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md)
- **Documentação de Configuração:** [Guia de Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md)

Ao seguir este guia, você poderá integrar efetivamente o Intlayer em sua aplicação Next.js usando o Page Router, permitindo um suporte à internacionalização robusto e escalável para seus projetos web.
