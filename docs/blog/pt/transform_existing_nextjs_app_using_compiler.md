---
createdAt: 2026-01-10
updatedAt: 2026-09-06
priority: 8
title: "Como tornar multilíngue (i18n) uma aplicação Next.js existente a posteriori (Guia i18n 2026)"
description: "O guia de 2026 para tornar uma aplicação Next.js existente multilíngue (i18n) sem refatorações exaustivas. Conheça a extração automática, tradução com IA e roteamento com Intlayer."
keywords:
  - Next.js i18n
  - Internacionalização
  - Traduzir app Next.js existente
  - Next.js 16
  - Intlayer
  - Multilíngue
  - React i18n
  - Compilador
  - Tradução IA
  - SEO
slugs:
  - blog
  - transform-existing-nextjs-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "Update to Next.js >= 9.4.0 architecture"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Initial release"
author: aymericzip
---

# Como tornar multilíngue (i18n) uma aplicação Next.js existente a posteriori (Guia i18n 2026)

Adicionar internacionalização (i18n) a um projeto Next.js desde o primeiro dia é relativamente simples. Mas o que acontece quando você já tem uma aplicação Next.js madura e em produção em um único idioma e precisa torná-la multilíngue **a posteriori**?

Com bibliotecas tradicionais como `next-intl` ou `next-i18next`, a tarefa é exaustiva:

- Caçar textos estáticos em centenas de arquivos JSX/TSX.
- Criar manualmente arquivos JSON aninhados e inventar chaves (`pages.dashboard.header.title`, etc.).
- Substituir textos por hooks de tradução (`t('...')`).
- Reestruturar toda a pasta `app/` em `app/[locale]/...`, quebrando URLs existentes e SEO.

Em 2026, você não precisa reescrever sua aplicação. Com o **Intlayer**, você adiciona internacionalização em minutos através de extração automatizada, tradução assistida por IA e roteamento flexível.

> Procurando o guia técnico passo a passo para o Next.js 16 App Router? Veja a nossa documentação: [Traduzir Next.js 16 com Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md).

## Índice

<TOC/>

## O dilema da adaptação: Por que internacionalizar uma aplicação existente é difícil

Ao adaptar uma aplicação Next.js existente, os desenvolvedores encontram 3 grandes problemas:

1. **Impacto no código**: Extrair textos manualmente para JSONs exige modificar quase todos os arquivos de componentes.
2. **Imposição de rotas**: Bibliotecas tradicionais exigem mover suas páginas para `[locale]`.
3. **Tradução repetitiva**: Traduzir dezenas de idiomas exige copiar e colar incansavelmente.

O Intlayer resolve isso com **extração assistida por compilador**, **dicionários declarativos** e **roteamento não invasivo**.

## Extração automatizada de conteúdo (sem busca manual)

### Opção A: Extrator via CLI (`npx intlayer extract`)

Execute o extrator do Intlayer diretamente no projeto:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm dlx intlayer extract
```

```bash packageManager="yarn"
yarn dlx intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

Ele analisa seus componentes e cria arquivos `.content.ts` declarativos ao lado de cada componente.

### Opção B: Compilador Intlayer (Extração em tempo de build)

Escreva texto comum em seus componentes. No build, o compilador extrai o texto e injeta o conteúdo traduzido automaticamente:

```tsx fileName="src/app/page.tsx"
// Write normal React code. The compiler extracts the text automatically
export default function HomePage() {
  return (
    <section>
      <h1>Welcome to our platform</h1>
      <p>Start exploring our modern features today.</p>
    </section>
  );
}
```

Nos bastidores, o Intlayer constrói o dicionário e vincula o componente ao seu conteúdo localizado, eliminando totalmente a refatoração manual.

Nesse caso, será gerado um arquivo `src/app/page.content.ts` com o seguinte conteúdo:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({ en: "Welcome to our platform" }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
    }),
  },
};

export default content;
```

## Tradução assistida por IA com seu LLM preferido

Traduza rapidamente com OpenAI, Anthropic, DeepSeek ou Mistral usando sua própria chave de API:

```bash packageManager="npm"
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
yarn dlx intlayer fill
```

```bash packageManager="bun"
bunx intlayer fill
```

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext:
      "Painel SaaS para produtividade e colaboração de equipes",
  },
};

export default config;
```

A execução de `npx intlayer fill` preenche suas declarações `.content.ts` com as traduções para todas as línguas configuradas:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
      pt: "Bem-vindo à nossa plataforma",
    }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
      pt: "Comece a explorar nossos recursos modernos hoje mesmo.",
    }),
  },
};

export default content;
```

Como o Intlayer fornece um `applicationContext` de alto nível para o LLM, as traduções geradas preservam nuances técnicas, o tom da marca e o contexto gramatical muito melhor do que ferramentas automatizadas tradicionais.

Para verificar se nenhuma string foi esquecida antes de enviar para produção:

```bash
npx intlayer test
```

## Roteamento multilíngue sem quebrar URLs existentes

O Intlayer oferece suporte a:

- **Search Params / Cookies (`search-params`)**: Mantenha sua estrutura intacta sem mover nada para `[locale]`.
- **Modo prefixo (`prefix` / `prefix-all-locales`)**: Suporte total a rotas amigáveis para SEO.

Configure sua integração com o Next.js em segundos:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* Your existing Next.js config */};

export default withIntlayer(nextConfig);
```

Envolva seu root layout com `IntlayerProvider`:

```tsx fileName="src/app/layout.tsx"
import type { ReactNode } from "react";
import { IntlayerProvider } from "next-intlayer";
import { getLocale } from "next-intlayer/server";
import { getHTMLTextDir } from "intlayer";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
}
```

## SEO multilíngue

Gere metadados localizados e tags `hreflang` facilmente para indexação global:

```tsx fileName="src/app/page.tsx"
import type { Metadata } from "next";
import { getLocale } from "next-intlayer/server";
import { getIntlayer } from "intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const content = getIntlayer("home-page-metadata", locale);

  return {
    title: content.title,
    description: content.description,
  };
};
```

## Aprofunde-se: Pronto para a implementação completa?

Para o passo a passo técnico completo com middleware, geração estática (`generateStaticParams`) e Server Components, veja a documentação detalhada:

👉 **[Guia completo para traduzir Next.js 16 com Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md)**

## Perguntas Frequentes (FAQ)

<FAQ>

<Question title="Posso tornar meu app Next.js multilíngue sem mover arquivos para app/[locale]?">

Sim. O Intlayer suporta `routing.mode: "search-params"` e detecção por cookies/headers sem alterar sua estrutura de pastas.

</Question>
<Question title="Preciso substituir manualmente todos os textos do meu app?">

Não. Utilize `npx intlayer extract` ou o compilador do Intlayer para extração automática.

</Question>
<Question title="Como o Intlayer reduz o tamanho do bundle comparado ao next-intl?">

Através de declarações modulares por componente e eliminação de código não utilizado durante o build.

</Question>
<Question title="Posso usar IA para traduzir os componentes existentes?">

Sim. O comando `npx intlayer fill` conecta seu projeto a LLMs para preenchimento de traduções com contexto.

</Question>
</FAQ>
