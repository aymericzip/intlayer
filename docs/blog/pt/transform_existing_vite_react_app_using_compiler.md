---
createdAt: 2024-03-07
updatedAt: 2026-09-06
title: "Como tornar multilíngue (i18n) uma aplicação Vite e React existente a posteriori (Guia i18n 2026)"
description: "O guia de 2026 para tornar uma aplicação Vite e React existente multilíngue (i18n) sem refatorações exaustivas. Conheça a extração automática, tradução com IA e bundles otimizados com Intlayer."
keywords:
  - Vite i18n
  - React i18n
  - Internacionalização
  - Traduzir app Vite existente
  - Traduzir app React existente
  - Intlayer
  - Multilíngue
  - Compilador
  - Tradução IA
  - SEO
slugs:
  - blog
  - transform-existing-react-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
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

# Como tornar multilíngue (i18n) uma aplicação Vite e React existente a posteriori (Guia i18n 2026)

Adicionar internacionalização (i18n) a um projeto Vite e React desde o primeiro dia é relativamente simples. Mas o que acontece quando você já tem uma aplicação madura e em produção em um único idioma e precisa torná-la multilíngue **a posteriori**?

Com bibliotecas tradicionais como `react-i18next` ou `react-intl`, o processo costuma ser exaustivo:

- Caçar manualmente textos estáticos em centenas de arquivos JSX e TSX.
- Criar arquivos JSON aninhados e inventar chaves de tradução arbitrárias (`components.header.title`, etc.).
- Substituir textos da interface por chamadas complexas a hooks (`t('...')`).
- Reestruturar o roteamento no cliente, o gerenciamento de estado e a lógica de troca de idioma.

Em 2026, você não precisa reescrever sua aplicação. Com o **Intlayer**, você adiciona internacionalização em uma aplicação Vite e React existente em minutos através de extração automatizada, tradução assistida por IA e integração fluida.

> Procurando o guia técnico passo a passo para Vite e React? Veja a nossa documentação: [Traduzir Vite e React com Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md).

## Índice

<TOC/>

## O dilema da adaptação: Por que internacionalizar uma aplicação existente é difícil

Ao adaptar uma aplicação Vite e React existente, os desenvolvedores encontram 3 grandes obstáculos:

1. **Impacto na base de código**: Extrair manualmente textos para dicionários JSON exige editar quase todos os componentes. Isso gera diffs imensos no Git, conflitos de mesclagem e riscos de regressão visual.
2. **Custo de gerenciar chaves**: Criar chaves como `dashboard.hero.ctaButton` para cada trecho textual atrasa o desenvolvimento e eleva a carga cognitiva a cada ajuste na UI.
3. **Trabalho repetitivo de tradução**: Após extrair as strings, traduzir dicionários para 5, 10 ou 20 idiomas exige infinitos copia e cola ou serviços de tradução externos dispendiosos.

O Intlayer soluciona esses desafios no nível arquitetural através de **extração assistida por compilador**, **dicionários declarativos no nível do componente** e **integração nativa com o Vite**.

## Extração automatizada de conteúdo (sem busca manual de textos)

Em vez de extrair manualmente cada string do seu JSX, o Intlayer disponibiliza duas abordagens simples:

### Opção A: O extrator via CLI (`npx intlayer extract`)

Você pode rodar a ferramenta de extração do Intlayer diretamente na sua base de código:

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

Esse comando analisa seus componentes React, detecta textos visíveis ao usuário e gera automaticamente arquivos de declaração de conteúdo (`.content.ts`) ao lado de cada componente. A lógica permanece declarativa, limpa e com tipagem segura, sem precisar inventar chaves manualmente.

### Opção B: O compilador Intlayer (Extração no momento do build)

Com o compilador Intlayer ativo na configuração, você continua escrevendo seus componentes com texto comum no idioma padrão. No momento do build, o compilador extrai o texto e injeta o conteúdo localizado automaticamente:

```tsx fileName="src/App.tsx"
// Escreva código React comum. O compilador extrai os textos automaticamente
export default function App() {
  return (
    <section>
      <h1>Bem-vindo à nossa plataforma</h1>
      <p>Comece a explorar nossos recursos modernos hoje mesmo.</p>
    </section>
  );
}
```

Nos bastidores, o Intlayer monta o dicionário e vincula o componente ao seu conteúdo localizado, eliminando totalmente qualquer refatoração manual.

Neste caso, ele gera um arquivo de declaração `src/App.content.ts` com a seguinte estrutura:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    bemVindoANossaPlataforma: t({
      pt: "Bem-vindo à nossa plataforma",
    }),
    comeceAExplorarNossosRecursos: t({
      pt: "Comece a explorar nossos recursos modernos hoje mesmo.",
    }),
  },
};

export default content;
```

## Tradução assistida por IA com seu LLM favorito

Após a extração, traduzir o conteúdo para dezenas de idiomas não deve levar dias. O Intlayer traz uma CLI de tradução integrada com IA compatível com OpenAI, Anthropic, DeepSeek ou Mistral usando suas próprias chaves de API:

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

Configure seus idiomas e provedor de IA no arquivo `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.PORTUGUESE,
    ],
    defaultLocale: Locales.PORTUGUESE,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext:
      "Aplicação SaaS moderna e painel administrativo construídos com Vite e React",
  },
};

export default config;
```

Executar `npx intlayer fill` preenche suas declarações com traduções precisas para todos os idiomas configurados:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    bemVindoANossaPlataforma: t({
      pt: "Bem-vindo à nossa plataforma",
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
    }),
    comeceAExplorarNossosRecursos: t({
      pt: "Comece a explorar nossos recursos modernos hoje mesmo.",
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
    }),
  },
};

export default content;
```

Como o Intlayer passa o `applicationContext` para o modelo, as traduções respeitam o contexto técnico, o tom da marca e a gramática muito melhor do que ferramentas genéricas.

Para validar se nenhum texto ficou sem tradução antes do deploy em produção:

```bash
npx intlayer test
```

## Integração com Vite e configuração do Provider

Integrar o Intlayer ao Vite requer apenas adicionar o plugin no `vite.config.ts` e envolver o componente raiz com o `IntlayerProvider`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> A partir do Intlayer v9, o compilador está incluído diretamente no plugin `intlayer()` e é ativado automaticamente ao definir `compiler.enabled` no `intlayer.config.ts`.

Envolva sua aplicação com o `IntlayerProvider` no componente raiz:

```tsx fileName="src/App.tsx"
import { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { MainContent } from "./MainContent";

const App: FC = () => {
  return (
    <IntlayerProvider>
      <MainContent />
    </IntlayerProvider>
  );
};

export default App;
```

### Alterando o idioma dinamicamente

Alterne o idioma facilmente em qualquer componente usando o hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locales)}
    >
      {availableLocales.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## SEO Multilíngue (Sitemap e Robots.txt)

O Intlayer inclui geradores como `generateSitemap` e `getMultilingualUrls` para criar arquivos `sitemap.xml` e `robots.txt` multilíngues otimizados para motores de busca em builds estáticos do Vite:

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.SITE_URL || "https://example.com").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, {
  siteUrl: "https://example.com",
});
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: https://example.com/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);
console.log("Arquivos SEO gerados com sucesso.");
```

Adicione um script `prebuild` no seu `package.json` para rodar este passo antes de `vite build`:

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Aprofundamento: Pronto para o passo a passo completo?

Este artigo ofereceu uma visão geral de como internacionalizar uma aplicação Vite e React existente em 2026 sem complicações de refatoração.

Se você está pronto para configurar cada parte do seu projeto em detalhes, incluindo tipagem rigorosa em TypeScript, dicionários dinâmicos e editor visual, acesse nosso guia completo:

👉 **[Guia completo para traduzir Vite e React com Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md)**

## Perguntas Frequentes (FAQ)

<FAQ>

<Question title="Posso tornar minha aplicação Vite e React multilíngue sem refatorar manualmente todas as strings?">

Sim. Você pode usar `npx intlayer extract` para detectar e extrair automaticamente textos fixos em arquivos de declaração de conteúdo, ou utilizar o compilador Intlayer para transformar os componentes no build enquanto continua escrevendo JSX comum.

</Question>
<Question title="Como o Intlayer reduz o tamanho do bundle Vite em comparação com react-i18next ou react-intl?">

O Intlayer utiliza definições de dicionário por componente e otimização por macros no build. Os seus bundles recebem somente os campos exatos demandados pelos componentes em exibição, ao invés de arquivos JSON inteiros. Dicionários dinâmicos também permitem carregar idiomas sob demanda.

</Question>
<Question title="Posso usar IA para traduzir meus componentes existentes em múltiplos idiomas?">

Sim. A CLI do Intlayer possui o comando `npx intlayer fill`, que se conecta ao seu provedor de IA favorito (OpenAI, Anthropic, Mistral, DeepSeek) para gerar traduções contextuais em todos os idiomas configurados.

</Question>
<Question title="Posso migrar do react-i18next ou react-intl sem reescrever meus componentes?">

Sim. O Intlayer conta com adaptadores de compatibilidade para `react-i18next` e `react-intl`, além de plugins dedicados para sincronizar seus arquivos JSON de tradução já existentes (`sync-json`).

</Question>

</FAQ>
