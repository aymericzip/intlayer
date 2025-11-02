---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Como internacionalizar sua aplicação Next.js usando next-i18next
description: Configure i18n com next-i18next: melhores práticas e dicas de SEO para apps Next.js multilíngues, cobrindo internacionalização, organização de conteúdo e configuração técnica.
slugs:
  - blog
  - nextjs-internationalization-using-next-i18next
applicationTemplate: https://github.com/aymericzip/next-i18next-template
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Versão inicial
---

# Como internacionalizar sua aplicação Next.js usando next-i18next em 2025

## Índice

<TOC/>

## O que é next-i18next?

**next-i18next** é uma solução popular de internacionalização (i18n) para aplicações Next.js. Embora o pacote original `next-i18next` tenha sido projetado para o Pages Router, este guia mostra como implementar o i18next com o moderno **App Router** usando diretamente `i18next` e `react-i18next`.

Com essa abordagem, você pode:

- **Organizar traduções** usando namespaces (por exemplo, `common.json`, `about.json`) para uma melhor gestão de conteúdo.
- **Carregar traduções de forma eficiente** carregando apenas os namespaces necessários para cada página, reduzindo o tamanho do bundle.
- **Suportar componentes tanto do servidor quanto do cliente** com o devido tratamento de SSR e hidratação.
- **Garantir suporte ao TypeScript** com configuração de locale e chaves de tradução tipadas de forma segura.
- **Otimizar para SEO** com metadados apropriados, sitemap e internacionalização do robots.txt.

> Como alternativa, você também pode consultar o [guia next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_with_next-intl.md), ou usar diretamente o [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md).

> Veja a comparação em [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-i18next_vs_next-intl_vs_intlayer.md).

## Práticas que você deve seguir

Antes de mergulharmos na implementação, aqui estão algumas práticas que você deve seguir:

- **Defina os atributos `lang` e `dir` no HTML**
- **Defina os atributos HTML `lang` e `dir`**  
  No seu layout, calcule `dir` usando `getLocaleDirection(locale)` e defina `<html lang={locale} dir={dir}>` para acessibilidade e SEO adequados.
- **Separe as mensagens por namespace**  
  Organize os arquivos JSON por localidade e namespace (por exemplo, `common.json`, `about.json`) para carregar apenas o que você precisa.
- **Minimize o payload do cliente**  
  Nas páginas, envie apenas os namespaces necessários para o `NextIntlClientProvider` (por exemplo, `pick(messages, ['common', 'about'])`).
- **Prefira páginas estáticas**  
  Use páginas estáticas o máximo possível para melhor desempenho e SEO.
- **I18n em componentes de servidor**  
  Componentes de servidor, como páginas ou todos os componentes que não são marcados como `client`, são estáticos e podem ser pré-renderizados em tempo de build. Portanto, teremos que passar as funções de tradução para eles como props.
- **Configure os tipos do TypeScript**
- Para suas localidades, garanta a segurança de tipos em toda a sua aplicação.
- **Proxy para redirecionamento**  
  Use um proxy para lidar com a detecção de localidade e roteamento, redirecionando o usuário para a URL apropriada com prefixo de localidade.
- **Internacionalização dos seus metadados, sitemap, robots.txt**  
  Internacionalize seus metadados, sitemap, robots.txt usando a função `generateMetadata` fornecida pelo Next.js para garantir uma melhor descoberta pelos motores de busca em todas as localidades.
- **Localize os Links**  
  Localize os Links usando o componente `Link` para redirecionar o usuário para a URL apropriada com prefixo de localidade. É importante garantir a descoberta das suas páginas em todas as localidades.
- **Automatize testes e traduções**  
  Automatizar testes e traduções ajuda a economizar tempo na manutenção da sua aplicação multilíngue.

> Veja nossa documentação listando tudo o que você precisa saber sobre internacionalização e SEO: [Internacionalização (i18n) com next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/internationalization_and_SEO.md).

---

## Guia Passo a Passo para Configurar o i18next em uma Aplicação Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/next-i18next-template?embed=1&ctl=1&file=src/app/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como Internacionalizar sua aplicação usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> Veja [Application Template](https://github.com/aymericzip/next-i18next-template) no GitHub.

Aqui está a estrutura do projeto que vamos criar:

```bash
.
├── i18n.config.ts
└── src # Src é opcional
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── types
    │   └── i18next.d.ts
    ├── app
    │   ├── proxy.ts
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Grupo de Rotas para não poluir todas as páginas com mensagens da home)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend
```

- **i18next**: O framework principal de internacionalização que gerencia o carregamento e a gestão das traduções.
- **react-i18next**: Bindings do React para i18next que fornecem hooks como `useTranslation` para componentes cliente.
- **i18next-resources-to-backend**: Um plugin que permite o carregamento dinâmico dos arquivos de tradução, permitindo carregar apenas os namespaces que você precisa.

### Passo 2: Configure Seu Projeto

Crie um arquivo de configuração para definir os seus locales suportados, o locale padrão e funções auxiliares para a localização de URLs. Este arquivo serve como a fonte única de verdade para a sua configuração i18n e garante segurança de tipos em toda a sua aplicação.

Centralizar a configuração dos seus locales previne inconsistências e facilita a adição ou remoção de locales no futuro. As funções auxiliares garantem uma geração consistente de URLs para SEO e roteamento.

```ts fileName="i18n.config.ts"
// Defina os locales suportados como um array const para segurança de tipos
// A asserção 'as const' faz o TypeScript inferir tipos literais ao invés de string[]
export const locales = ["en", "fr"] as const;

// Extraia o tipo Locale do array de locales
// Isso cria um tipo união: "en" | "fr"
export type Locale = (typeof locales)[number];

// Define o locale padrão usado quando nenhum locale é especificado
export const defaultLocale: Locale = "en";

// Idiomas da direita para a esquerda que precisam de tratamento especial na direção do texto
export const rtlLocales = ["ar", "he", "fa", "ur"] as const;

// Verifica se um locale requer direção de texto RTL (da direita para a esquerda)
// Usado para idiomas como Árabe, Hebraico, Persa e Urdu
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// Gera um caminho localizado para um dado locale e caminho
// Caminhos do locale padrão não possuem prefixo (ex: "/about" ao invés de "/en/about")
// Outros locales são prefixados (ex: "/fr/about")
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// URL base para URLs absolutas (usada em sitemaps, metadados, etc.)
const ORIGIN = "https://example.com";

// Gera uma URL absoluta com prefixo de locale
// Usado para metadados SEO, sitemaps e URLs canônicas
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}

// Usado para definir o cookie de locale no navegador
export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 ano
    "SameSite=Lax",
  ].join("; ");
}
```

### Passo 3: Centralizar Namespaces de Tradução

Crie uma fonte única de verdade para cada namespace que sua aplicação expõe. Reutilizar essa lista mantém o código do servidor, cliente e ferramentas sincronizados e desbloqueia a tipagem forte para os helpers de tradução.

```ts fileName="src/i18n.namespaces.ts"
export const namespaces = ["common", "about"] as const;

export type Namespace = (typeof namespaces)[number];
```

### Passo 4: Tipar Fortemente as Chaves de Tradução com TypeScript

Aumente o `i18next` para apontar para seus arquivos de idioma canônicos (geralmente em inglês). O TypeScript então infere as chaves válidas por namespace, assim as chamadas para `t()` são verificadas de ponta a ponta.

```ts fileName="src/types/i18next.d.ts"
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/locales/en/common.json");
      about: typeof import("@/locales/en/about.json");
    };
  }
}
```

> Dica: Armazene esta declaração em `src/types` (crie a pasta se ela não existir). O Next.js já inclui `src` no `tsconfig.json`, então a extensão é detectada automaticamente. Caso contrário, adicione o seguinte ao seu arquivo `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": ["src/types/**/*.ts"],
}
```

Com isso configurado, você pode contar com autocompletar e verificações em tempo de compilação:

```tsx
import { useTranslation, type TFunction } from "react-i18next";

const { t } = useTranslation("about");

// OK, tipado: t("counter.increment")
// ERRO, erro de compilação: t("doesNotExist")
export type AboutTranslator = TFunction<"about">;
```

### Passo 5: Configurar a Inicialização do i18n no Lado do Servidor

Crie uma função de inicialização do lado do servidor que carrega traduções para componentes do servidor. Esta função cria uma instância separada do i18next para renderização do lado do servidor, garantindo que as traduções sejam carregadas antes da renderização.

Componentes do servidor precisam de sua própria instância do i18next porque eles são executados em um contexto diferente dos componentes do cliente. Pré-carregar traduções no servidor evita o flash de conteúdo não traduzido e melhora o SEO ao garantir que os motores de busca vejam o conteúdo traduzido.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces, type Namespace } from "@/i18n.namespaces";

// Configurar carregamento dinâmico de recursos para o i18next
// Esta função importa dinamicamente arquivos JSON de tradução com base no locale e namespace
// Exemplo: locale="fr", namespace="about" -> importa "@/locales/fr/about.json"
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

const DEFAULT_NAMESPACES = [
  namespaces[0],
] as const satisfies readonly Namespace[];

/**
 * Inicializa a instância do i18next para renderização no lado do servidor
 *
 * @returns Instância do i18next inicializada pronta para uso no servidor
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = DEFAULT_NAMESPACES
) {
  // Cria uma nova instância do i18next (separada da instância do lado do cliente)
  const i18n = createInstance();

  // Inicializa com integração React e carregador backend
  await i18n
    .use(initReactI18next) // Habilita suporte a hooks do React
    .use(backend) // Habilita carregamento dinâmico de recursos
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // Carrega apenas os namespaces especificados para melhor desempenho
      defaultNS: "common", // Namespace padrão quando nenhum é especificado
      interpolation: { escapeValue: false }, // Não escapar HTML (React lida com proteção XSS)
      react: { useSuspense: false }, // Desabilita Suspense para compatibilidade SSR
      returnNull: false, // Retorna string vazia ao invés de null para chaves ausentes
      initImmediate: false, // Adiar a inicialização até que os recursos sejam carregados (SSR mais rápido)
    });
  return i18n;
}
```

### Passo 6: Criar o Provedor i18n no Lado do Cliente

Crie um componente provedor no cliente que envolva sua aplicação com o contexto do i18next. Este provedor recebe traduções pré-carregadas do servidor para evitar o flash de conteúdo não traduzido (FOUC) e evitar buscas duplicadas.

Componentes do cliente precisam de sua própria instância do i18next que roda no navegador. Ao aceitar recursos pré-carregados do servidor, garantimos uma hidratação suave e evitamos o flash de conteúdo. O provedor também gerencia mudanças de locale e carregamento dinâmico de namespaces.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";

// Configurar carregamento dinâmico de recursos para o lado do cliente
// Mesmo padrão do lado do servidor, mas esta instância roda no navegador
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // Recursos pré-carregados do servidor (previne FOUC - Flash de Conteúdo Não Traduzido)
  // Formato: { namespace: translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * Provedor i18n do lado cliente que envolve o app com o contexto i18next
 * Recebe recursos pré-carregados do servidor para evitar re-busca das traduções
 */
export default function I18nProvider({
  locale,
  namespaces = [allNamespaces[0]] as const,
  resources,
  children,
}: Props) {
  // Cria a instância i18n uma vez usando o inicializador lazy do useState
  // Isso garante que a instância seja criada apenas uma vez, não a cada renderização
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();

    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // Se recursos forem fornecidos (do servidor), use-os para evitar busca no cliente
        // Isso previne FOUC e melhora a performance no carregamento inicial
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // Impede que valores indefinidos sejam retornados
      });

    return i18nInstance;
  });

  // Atualiza o idioma quando a prop locale mudar
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // Garante que todos os namespaces necessários sejam carregados no cliente
  // Usando join("|") como dependência para comparar arrays corretamente
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [namespaces.join("|"), i18n]);

  // Fornece a instância i18n para todos os componentes filhos via contexto React
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

### Passo 7: Definir Rotas Dinâmicas por Locale

Configure o roteamento dinâmico para os locales criando um diretório `[locale]` na sua pasta app. Isso permite que o Next.js gerencie o roteamento baseado em locale, onde cada locale se torna um segmento da URL (ex.: `/en/about`, `/fr/about`).

Usar rotas dinâmicas permite que o Next.js gere páginas estáticas para todos os locales no momento da build, melhorando a performance e SEO. O componente layout define os atributos HTML `lang` e `dir` com base no locale, o que é crucial para acessibilidade e compreensão pelos motores de busca.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

// Desativar parâmetros dinâmicos - todos os locais devem ser conhecidos em tempo de build
// Isso garante a geração estática para todas as rotas de localidade
export const dynamicParams = false;

/**
 * Gera parâmetros estáticos para todos os locais em tempo de build
 * Next.js irá pré-renderizar páginas para cada localidade retornada aqui
 * Exemplo: [{ locale: "en" }, { locale: "fr" }]
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Componente de layout raiz que gerencia atributos HTML específicos do local
 * Define o atributo lang e a direção do texto (ltr/rtl) com base no local
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  /// Validar o locale a partir dos parâmetros da URL
  /// Se um locale inválido for fornecido, usar o locale padrão
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  /// Determinar a direção do texto com base no locale
  /// Idiomas RTL como o árabe precisam de dir="rtl" para renderização correta do texto
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

### Passo 8: Crie Seus Arquivos de Tradução

Crie arquivos JSON para cada locale e namespace. Essa estrutura permite organizar as traduções de forma lógica e carregar apenas o que você precisa para cada página.

Organizar traduções por namespace (por exemplo, `common.json`, `about.json`) permite a divisão de código e reduz o tamanho do bundle. Você carrega apenas as traduções necessárias para cada página, melhorando o desempenho.

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Next.js i18n App",
  "appDescription": "Example Next.js application with internationalization using i18next"
}
```

```json fileName="src/locales/fr/common.json"
{
  "appTitle": "Application Next.js i18n",
  "appDescription": "Exemple d'application Next.js avec internationalisation utilisant i18next"
}
```

```json fileName="src/locales/en/home.json"
{
  "title": "Home",
  "description": "Home page description",
  "welcome": "Welcome",
  "greeting": "Hello, world!",
  "aboutPage": "About Page",
  "documentation": "Documentation"
}
```

```json fileName="src/locales/pt/home.json"
{
  "title": "Início",
  "description": "Descrição da página inicial",
  "welcome": "Bem-vindo",
  "greeting": "Olá, mundo!",
  "aboutPage": "Página Sobre",
  "documentation": "Documentação"
}
```

```json fileName="src/locales/pt/about.json"
{
  "title": "Sobre",
  "description": "Descrição da página Sobre",
  "counter": {
    "label": "Contador",
    "increment": "Incrementar",
    "description": "Clique no botão para aumentar o contador"
  }
}
```

### Passo 9: Utilize Traduções nas Suas Páginas

Crie um componente de página que inicialize o i18next no servidor e passe as traduções tanto para os componentes do servidor quanto para os do cliente. Isso garante que as traduções sejam carregadas antes da renderização e evita o piscar de conteúdo.

A inicialização no lado do servidor carrega as traduções antes da página ser renderizada, melhorando o SEO e prevenindo o FOUC (Flash of Unstyled Content). Ao passar os recursos pré-carregados para o provedor do cliente, evitamos buscas duplicadas e garantimos uma hidratação suave.

```tsx fileName="src/app/[locale]/about/index.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";
import type { ResourceLanguage } from "i18next";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

/**
 * Componente de página do servidor que gerencia a inicialização do i18n
 * Pré-carrega traduções no servidor e as passa para componentes cliente
 */
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // Define quais namespaces de tradução esta página precisa
  // Reutiliza a lista centralizada para segurança de tipo e autocompletar
  const pageNamespaces = allNamespaces;

  // Inicializa o i18next no servidor com os namespaces necessários
  // Isso carrega arquivos JSON de tradução no lado do servidor
  const i18n = await initI18next(locale, pageNamespaces);

  // Obter uma função de tradução fixa para o namespace "about"
  // getFixedT fixa o namespace, então usa-se t("title") em vez de t("about:title")
  const tAbout = i18n.getFixedT(locale, "about");

  // Extrair os pacotes de tradução da instância i18n
  // Esses dados são passados para o I18nProvider para hidratar o i18n no cliente
  // Evita FOUC (Flash of Untranslated Content) e evita buscas duplicadas
  const resources = Object.fromEntries(
    pageNamespaces.map((ns) => [ns, i18n.getResourceBundle(locale, ns)])
  ) satisfies Record<Namespace, ResourceLanguage>;

  return (
    <I18nProvider
      locale={locale}
      namespaces={pageNamespaces}
      resources={resources}
    >
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

### Passo 10: Usar Traduções em Componentes Cliente

Componentes cliente podem usar o hook `useTranslation` para acessar traduções. Este hook fornece acesso à função de tradução e à instância i18n, permitindo traduzir conteúdo e acessar informações de locale.

Componentes cliente precisam de hooks do React para acessar traduções. O hook `useTranslation` integra-se perfeitamente com o i18next e fornece atualizações reativas quando o locale muda.

> Certifique-se de que a página/provider inclua apenas os namespaces que você precisa (ex: `about`).  
> Se você usar React < 19, memorize formatadores pesados como `Intl.NumberFormat`.

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Exemplo de componente cliente usando hooks do React para traduções
 * Pode usar hooks como useState, useEffect e useTranslation
 */
const ClientComponent = () => {
  // O hook useTranslation fornece acesso à função de tradução e à instância i18n
  // Especifica o namespace para carregar apenas as traduções do namespace "about"
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // Cria um formatador de números sensível à localidade
  // i18n.language fornece a localidade atual (ex: "en", "fr")
  // Intl.NumberFormat formata números conforme as convenções da localidade
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Formatar número usando formatação específica do locale */}
      <p className="text-5xl font-bold text-white m-0">
        {numberFormat.format(count)}
      </p>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

### Passo 11: Usar Traduções em Componentes de Servidor

Componentes server não podem usar React hooks, então eles recebem traduções via props de seus componentes pai. Essa abordagem mantém os componentes server síncronos e permite que sejam aninhados dentro de componentes client.

Componentes server que podem ser aninhados sob limites client precisam ser síncronos. Ao passar strings traduzidas e informações de locale como props, evitamos operações assíncronas e garantimos uma renderização adequada.

```tsx fileName="src/components/ServerComponent.tsx"
import type { TFunction } from "i18next";

type ServerComponentProps = {
  // Função de tradução passada do componente server pai
  // Componentes server não podem usar hooks, então as traduções vêm via props
  t: TFunction<"about">;
  locale: string;
  count: number;
};

/**
 * Exemplo de componente server - recebe traduções via props
 * Pode ser aninhado dentro de componentes client (componentes server assíncronos)
 * Não pode usar React hooks, então todos os dados devem vir das props ou operações assíncronas
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // Formata número no servidor usando locale
  // Isso é executado no servidor durante SSR, melhorando o carregamento inicial da página
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-bold text-white m-0">{formatted}</p>
      {/* Usa a função de tradução passada como prop */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-semibold text-white">
          {t("counter.label")}
        </span>
        <span className="text-sm opacity-80 italic">
          {t("counter.description")}
        </span>
      </div>
    </div>
  );
};

export default ServerComponent;
```

---

### (Opcional) Passo 12: Alterar o idioma do seu conteúdo

Para alterar o idioma do seu conteúdo no Next.js, a forma recomendada é usar URLs prefixadas com o locale e links do Next.js. O exemplo abaixo lê o locale atual da rota, remove-o do pathname e renderiza um link para cada locale disponível.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n.config";

export default function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const activeLocale = (params?.locale as Locale | undefined) ?? defaultLocale;

  const getLocaleLabel = (locale: Locale): string => {
    try {
      const displayNames = new Intl.DisplayNames([locale], {
        type: "language",
      });
      return displayNames.of(locale) ?? locale.toUpperCase();
    } catch {
      return locale.toUpperCase();
    }
  };

  const basePath = useMemo(() => {
    if (!pathname) return "/";

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "/";

    const maybeLocale = segments[0] as Locale;

    if ((locales as readonly string[]).includes(maybeLocale)) {
      const rest = segments.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }

    return pathname;
  }, [pathname]);

  return (
    <nav aria-label="Seletor de idioma">
      {(locales as readonly Locale[]).map((locale) => {
        const isActive = locale === activeLocale;

        const href =
          locale === defaultLocale ? basePath : `/${locale}${basePath}`;

        return (
          <Link
            key={locale}
            href={href}
            aria-current={isActive ? "page" : undefined}
            onClick={() => {
              document.cookie = getCookie(locale);
            }}
          >
            {getLocaleLabel(locale)}
          </Link>
        );
      })}
    </nav>
  );
}
```

### (Opcional) Passo 13: Construir um componente Link localizado

Reutilizar URLs localizadas em toda a sua aplicação mantém a navegação consistente e otimizada para SEO. Envolva o `next/link` em um pequeno helper que prefixa rotas internas com o locale ativo, enquanto deixa URLs externas intactas.

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import NextLink, { type LinkProps } from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps, PropsWithChildren } from "react";
import {
  defaultLocale,
  type Locale,
  locales,
  localizedPath,
} from "@/i18n.config";

const isExternal = (href: string) => /^https?:\/\//.test(href);

type LocalizedLinkProps = PropsWithChildren<
  Omit<LinkProps, "href"> &
    Omit<ComponentProps<"a">, "href"> & { href: string; locale?: Locale }
>;

export default function LocalizedLink({
  href,
  locale,
  children,
  ...props
}: LocalizedLinkProps) {
  const params = useParams();
  const fallback = (params?.locale as Locale | undefined) ?? defaultLocale;
  const normalizedLocale = (locales as readonly string[]).includes(fallback)
    ? ((locale ?? fallback) as Locale)
    : defaultLocale;

  const normalizedPath = href.startsWith("/") ? href : `/${href}`;
  const localizedHref = isExternal(href)
    ? href
    : localizedPath(normalizedLocale, normalizedPath);

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
```

> Dica: Como `LocalizedLink` é um substituto direto, faça a migração gradualmente trocando os imports e deixando o componente lidar com URLs específicas de locale.

### (Opcional) Passo 14: Acessar o locale ativo dentro das Server Actions

Server Actions frequentemente precisam do locale atual para emails, logs ou integrações com terceiros. Combine o cookie de locale definido pelo seu proxy com o cabeçalho `Accept-Language` como fallback.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "@/i18n.config";

const KNOWN_LOCALES = new Set(locales as readonly string[]);

const normalize = (value: string | undefined): Locale | undefined => {
  if (!value) return undefined;
  const base = value.toLowerCase().split("-")[0];
  return KNOWN_LOCALES.has(base) ? (base as Locale) : undefined;
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieLocale = normalize(cookies().get("NEXT_LOCALE")?.value);

  if (cookieLocale) return cookieLocale;

  const headerLocale = normalize(headers().get("accept-language"));
  return headerLocale ?? defaultLocale;
}

// Exemplo de uma ação no servidor que usa a localidade atual
export async function stuffFromServer(formData: FormData) {
  const locale = await getCurrentLocale();

  // Use a localidade para efeitos colaterais localizados (emails, CRM, etc.)
  console.log(`Stuff from server with locale ${locale}`);
}
```

> Como o helper depende dos cookies e headers do Next.js, ele funciona em Route Handlers, Server Actions e outros contextos exclusivos do servidor.

### (Opcional) Passo 15: Internacionalize Seus Metadados

Traduzir o conteúdo é importante, mas o principal objetivo da internacionalização é tornar seu site mais visível para o mundo. I18n é uma alavanca incrível para melhorar a visibilidade do seu site por meio de SEO adequado.

Metadados devidamente internacionalizados ajudam os motores de busca a entender quais idiomas estão disponíveis em suas páginas. Isso inclui configurar meta tags hreflang, traduzir títulos e descrições, e garantir que URLs canônicas estejam corretamente definidas para cada localidade.

Aqui está uma lista de boas práticas relacionadas ao SEO multilíngue:

- Defina as meta tags hreflang na tag `<head>` para ajudar os motores de busca a entender quais idiomas estão disponíveis na página
- Liste todas as traduções das páginas no sitemap.xml usando o esquema XML `http://www.w3.org/1999/xhtml`
- Não se esqueça de excluir as páginas prefixadas do robots.txt (por exemplo, `/dashboard`, `/fr/dashboard`, `/es/dashboard`)
- Use um componente Link personalizado para redirecionar para a página mais localizada (por exemplo, em francês `<a href="/fr/about">À propos</a>`)

Os desenvolvedores frequentemente esquecem de referenciar corretamente suas páginas entre os diferentes locais. Vamos corrigir isso:

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * Gera metadados SEO para cada versão local da página
 * Esta função é executada para cada localidade no momento da build
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Importa dinamicamente o arquivo de tradução para esta localidade
  // Usado para obter o título e a descrição traduzidos para os metadados
  const messages = (await import(`@/locales/${locale}/about.json`)).default;

  // Cria o mapeamento hreflang para todas as localidades
  // Ajuda os motores de busca a entender as alternativas de idioma
  // Formato: { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // URL canônica para esta versão do locale
      canonical: absoluteUrl(locale, "/about"),
      // Alternativas de idioma para SEO (tags hreflang)
      // "x-default" especifica a versão padrão do locale
      languages: {
        ...languages,
        "x-default": absoluteUrl(defaultLocale, "/about"),
      },
    },
  };
}

export default async function AboutPage() {
  return <h1>Sobre</h1>;
}
```

### (Opcional) Passo 16: Internacionalize seu Sitemap

Gere um sitemap que inclua todas as versões de locale das suas páginas. Isso ajuda os motores de busca a descobrir e indexar todas as versões linguísticas do seu conteúdo.

Um sitemap devidamente internacionalizado garante que os motores de busca possam encontrar e indexar todas as versões linguísticas das suas páginas. Isso melhora a visibilidade nos resultados de busca internacionais.

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Obter um mapa de todos os locais e seus caminhos localizados
 *
 * Exemplo de saída:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ["x-default", formatterLocalizedPath(defaultLocale, path)],
  ]);

// Gerar sitemap com todas as variantes de locale para melhor SEO
// O campo alternates informa aos motores de busca sobre as versões de idioma
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

### (Opcional) Passo 17: Internacionalize seu robots.txt

Crie um arquivo robots.txt que gerencie corretamente todas as versões de locale das suas rotas protegidas. Isso garante que os motores de busca não indexem páginas de administração ou dashboard em nenhum idioma.

Configurar corretamente o robots.txt para todos os locales impede que motores de busca indexem páginas sensíveis em qualquer idioma. Isso é crucial para segurança e privacidade.

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// Gera caminhos para todos os locales (ex: /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `/${locale}${path}`),
];

const disallow = [...withAllLocales("/dashboard"), ...withAllLocales("/admin")];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### (Opcional) Passo 18: Configurar Middleware para Roteamento de Locale

Crie um proxy para detectar automaticamente o locale preferido do usuário e redirecioná-lo para a URL apropriada com prefixo de locale. Isso melhora a experiência do usuário ao mostrar o conteúdo no idioma preferido.

O middleware garante que os usuários sejam redirecionados automaticamente para o idioma preferido ao visitarem seu site. Ele também salva a preferência do usuário em um cookie para visitas futuras.

```ts fileName="src/proxy.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

// Regex para corresponder a arquivos com extensões (ex.: .js, .css, .png)
// Usado para excluir ativos estáticos do roteamento de locale
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Extrai o locale do cabeçalho Accept-Language
 * Trata formatos como "fr-CA", "en-US", etc.
 * Retorna o locale padrão se o idioma do navegador não for suportado
 */
const pickLocale = (accept: string | null) => {
  // Obtém a primeira preferência de idioma (ex.: "fr-CA" de "fr-CA,en-US;q=0.9")
  const raw = accept?.split(",")[0] ?? defaultLocale;
  // Extrai o código base do idioma (ex.: "fr" de "fr-CA")
  const base = raw.toLowerCase().split("-")[0];
  // Verifica se suportamos este locale, caso contrário usa o padrão
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * Proxy do Next.js para detecção e roteamento de locale
 * Executa em toda requisição antes da renderização da página
 * Redireciona automaticamente para URLs com prefixo de locale quando necessário
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorar proxy para internos do Next.js, rotas API e arquivos estáticos
  // Estes não devem ter prefixo de locale
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Verificar se a URL já possui prefixo de locale
  // Exemplo: "/fr/about" ou "/en" retornaria true
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // Se não houver prefixo de localidade, detecta a localidade e redireciona
  if (!hasLocale) {
    // Tenta obter a localidade do cookie primeiro (preferência do usuário)
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // Usa a localidade do cookie se for válida, caso contrário detecta pelos cabeçalhos do navegador
    const locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : pickLocale(request.headers.get("accept-language"));

    // Clona a URL para modificar o pathname
    const url = request.nextUrl.clone();
    // Adiciona o prefixo de localidade ao pathname
    // Trata o caminho raiz especialmente para evitar barra dupla
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // Criar resposta de redirecionamento e definir cookie de localidade
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // Corresponder a todos os caminhos exceto:
    // - Rotas de API (/api/*)
    // - Internos do Next.js (/_next/*)
    // - Arquivos estáticos (/static/*)
    // - Arquivos com extensões (.*\\..*)
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

### (Opcional) Passo 19: Automatize Suas Traduções Usando o Intlayer

Intlayer é uma biblioteca **gratuita** e **open-source** projetada para auxiliar o processo de localização na sua aplicação. Enquanto o i18next gerencia o carregamento e a gestão das traduções, o Intlayer ajuda a automatizar o fluxo de trabalho das traduções.

Gerenciar traduções manualmente pode ser demorado e propenso a erros. O Intlayer automatiza o teste, a geração e o gerenciamento das traduções, economizando seu tempo e garantindo consistência em toda a sua aplicação.

O Intlayer permite que você:

- **Declare seu conteúdo onde quiser na sua codebase**  
  O Intlayer permite declarar seu conteúdo onde quiser na sua codebase usando arquivos `.content.{ts|js|json}`. Isso possibilita uma melhor organização do seu conteúdo, garantindo melhor legibilidade e manutenção da sua codebase.

- **Teste traduções faltantes**  
  O Intlayer fornece funções de teste que podem ser integradas no seu pipeline de CI/CD ou nos seus testes unitários. Saiba mais sobre [testar suas traduções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/testing.md).

- **Automatize suas traduções**,
  Intlayer fornece uma CLI e uma extensão para VSCode para automatizar suas traduções. Pode ser integrado ao seu pipeline de CI/CD. Saiba mais sobre [automatizar suas traduções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md).
  Você pode usar sua **própria chave de API e o provedor de IA de sua escolha**. Também oferece traduções contextuais, veja [preencher conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/autoFill.md).

- **Conectar conteúdo externo**
- **Automatize suas traduções**,  
  Intlayer fornece uma CLI e uma extensão para VSCode para automatizar suas traduções. Pode ser integrado ao seu pipeline de CI/CD. Saiba mais sobre [automatizar suas traduções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md).  
  Você pode usar sua **própria chave de API e o provedor de IA de sua escolha**. Também oferece traduções com contexto, veja [preencher conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/autoFill.md).

- **Conectar conteúdo externo**  
  Intlayer permite conectar seu conteúdo a um sistema externo de gerenciamento de conteúdo (CMS). Para buscá-lo de forma otimizada e inseri-lo em seus recursos JSON. Saiba mais sobre [busca de conteúdo externo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/function_fetching.md).

- **Editor visual**  
  Intlayer oferece um editor visual gratuito para editar seu conteúdo usando um editor visual. Saiba mais sobre [edição visual das suas traduções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md).

E mais. Para descobrir todos os recursos fornecidos pelo Intlayer, consulte a [documentação Interesse do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md).
