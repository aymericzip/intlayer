---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrando do next-intl para Intlayer | Internacionalização (i18n)"
description: "Aprenda como migrar seu aplicativo Next.js do next-intl para Intlayer — passo a passo, sem quebrar o seu código existente. Use o adaptador de compatibilidade @intlayer/next-intl para uma transição suave."
keywords:
  - next-intl
  - intlayer
  - migração
  - internacionalização
  - i18n
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - migration
  - next-intl
history:
  - version: 8.13.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrando do next-intl para Intlayer

## Por que migrar do next-intl para Intlayer?

<AccordionGroup>

<Accordion header="Tamanho do pacote (Bundle size)">

Em vez de carregar enormes arquivos JSON em suas páginas, carregue apenas o conteúdo necessário. Intlayer ajuda você a **reduzir o tamanho do pacote e da página em até 50%**.

</Accordion>

<Accordion header="Manutenibilidade">

Criar escopos para o conteúdo da sua aplicação torna aplicações em larga escala **fáceis de manter**. Você pode duplicar ou excluir um diretório de recursos inteiro sem o esforço mental de revisar toda a sua base de código de conteúdo. Além disso, Intlayer é **fortemente tipado** para garantir a precisão do seu conteúdo.

Intlayer também é a solução **desenvolvida mais ativamente** no ecossistema i18n — problemas são corrigidos rapidamente, novos adaptadores de frameworks são lançados regularmente e a API principal é continuamente refinada com base em feedback do mundo real em produção.

</Accordion>

<Accordion header="Agentes de IA">

A co-localização do conteúdo **reduz o contexto necessário** para Modelos de Linguagem de Grande Escala (LLMs). O Intlayer também oferece um conjunto de ferramentas como uma **CLI** para testar traduções ausentes, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)** e **[Habilidades de Agente](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)** para tornar a Experiência do Desenvolvedor (DX) muito mais suave para agentes de IA.

</Accordion>

<Accordion header="Automação">

Automatize as traduções em seu pipeline de CI/CD usando o LLM de sua preferência pelo custo do seu provedor de IA. O Intlayer também oferece um **compilador** para automatizar a extração de conteúdo, bem como uma [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) para auxiliar com **tradução em segundo plano**.

</Accordion>

<Accordion header="Desempenho">

Conectar enormes arquivos JSON aos componentes pode levar a problemas de desempenho e reatividade. O Intlayer otimiza o carregamento do conteúdo no momento do build (build time).

</Accordion>

<Accordion header="Escalabilidade com não desenvolvedores">

Muito mais que apenas uma solução i18n, o Intlayer fornece um **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)** auto-hospedável e um **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)** para ajudá-lo a gerenciar seu conteúdo multilíngue em **tempo real**, tornando perfeita a colaboração com tradutores, redatores e outros membros da equipe. O conteúdo pode ser armazenado local e/ou remotamente.

</Accordion>

</AccordionGroup>

---

## Estratégia de Migração

A abordagem recomendada para aplicativos existentes é usar o **adaptador de compatibilidade**: Instale `@intlayer/next-intl`. Ele expõe **exatamente a mesma API** do `next-intl`, mas delega todo o trabalho de tradução, por baixo dos panos, ao Intlayer.

Você mantém intactos o `useTranslations`, o `getTranslations`, o `NextIntlClientProvider` e os demais usos em seus arquivos atuais — **a única coisa que muda é o caminho da importação**. Não há necessidade de refatorar assinaturas de funções de chamadas, estrutura de propriedades ou design dos componentes.

Com o tempo, você pode opcionalmente migrar arquivos individuais para o formato `.content.ts` mais rico do Intlayer para destravar o editor visual, CMS e o escopo no nível do componente — mas este passo é totalmente opcional e pode ser feito de modo incremental.

---

## Índice

<TOC/>

---

## Migração Rápida

As etapas a seguir são o mínimo necessário para executar seu aplicativo `next-intl` existente no Intlayer, sem fazer alterações na sua base de código.

<Steps>

<Step number={1} title="Instale as Dependências">

Instale os pacotes principais do Intlayer e o adaptador de compatibilidade `@intlayer/next-intl`:

```bash packageManager="npm"
npm install intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
bun x intlayer init
```

> Mantenha o `next-intl` instalado — ele ainda é exigido para o **roteamento de URL** (`createNavigation`, `createMiddleware`, `Link`, `redirect`, `usePathname`, `useRouter`). O adaptador de compatibilidade **não** substitui a camada de roteamento.

</Step>

<Step number={2} title="Configure o Intlayer">

O comando `intlayer init` cria um arquivo inicial `intlayer.config.ts`. Atualize-o para corresponder aos seus locales existentes e direcione o plugin `syncJSON` aos seus arquivos de mensagens:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Adicione todos os seus locales existentes aqui
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // 'icu' corresponde à sintaxe de espaço reservado ICU do next-intl: {name}, {count, plural, ...}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

> **`source`** mapeia um locale para o caminho do arquivo JSON correspondente. **`location`** diz ao observador (watcher) do Intlayer qual pasta monitorar para alterações. A opção `format: 'icu'` garante que espaços reservados ICU como `{name}` e `{count, plural, one {# item} other {# items}}` sejam analisados corretamente.

> Veja a [Documentação de Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md) para a lista completa das opções disponíveis.

</Step>

<Step number={3} title="Integre o plugin do Intlayer ao Next.js">

Envolva a sua configuração existente do Next.js com `createNextIntlPlugin` proveniente de `@intlayer/next-intl/plugin`. Este pacote aplica o `withIntlayer` **e simultaneamente** registra o alias de `next-intl` → `@intlayer/next-intl`:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* Suas opções de configuração existentes */
};

export default withIntlayer(nextConfig);
```

> O `createNextIntlPlugin()` encapsula o `withIntlayer`, detecta automaticamente o **Webpack** ou o **Turbopack**, anexa o observador de conteúdo (watcher), pré-compila os dicionários e, mais importante, **injetar aliases de módulos**, para que as chamadas atuais ao `import … from 'next-intl'` redirecionem de maneira transparente ao `@intlayer/next-intl` em tempo de build. A importação de roteamento `next-intl/routing` continuará a apontar para o pacote real. Não é necessário mudar o código-fonte.
>
> Você prefere utilizar o plugin puro `withIntlayer` de `next-intlayer/server`? Ele compilará seus dicionários, mas **não** adicionará o alias para `next-intl` — dessa forma, será preciso renomear as importações para `@intlayer/next-intl` de forma manual (veja a Etapa 4).

> **`getRequestConfig` ou carregar arquivos de mensagens não são mais necessários.** Com o `next-intl`, você teria que criar um arquivo `src/i18n.ts` que carregava pacotes de mensagens JSON para cada requisição utilizando `getRequestConfig`. Como o Intlayer compila todos os dicionários no **momento do build** (build-time), não há uma etapa de carregamento de mensagens por requisição. Pode excluir com segurança esse arquivo (ou manter apenas as partes referentes ao roteamento, se você continuar usando `createNavigation`).

</Step>

</Steps>

Isso é tudo para a migração rápida. Seu aplicativo agora está sendo executado no Intlayer, mantendo intatas as importações de `next-intl` e a API.

> **Chaves de tradução tipadas — automaticamente.** Com a compilação de dicionários realizada pelo Intlayer, o `useTranslations` e `getTranslations` tornam-se tipados no seu conteúdo autêntico. As chaves receberão preenchimento automático (autocompletar) dentro do IDE e quaisquer caminhos que não estejam corretos acabarão apontando como erros do TypeScript no período de compilação — sem que haja a necessidade de uma configuração à parte para isso.
>
> ```tsx
> // Componente no lado cliente (Client component) — 'about' é uma chave configurada no dicionário
> const t = useTranslations("about");
> t("counter.label"); // ✓ autocompletar
> t("does.not.exist"); // ✗ erro do TypeScript
>
> // Componente no lado servidor (Server component)
> const t = await getTranslations("about");
> t("counter.label"); // ✓ tipado
> ```

---

## Migração Completa

As etapas a seguir são opcionais e podem ser feitas gradativamente. Elas desbloqueiam o conjunto completo das funcionalidades do Intlayer: editor visual, CMS, arquivos de conteúdo tipados, automação de tradução por IA e muito mais.

<Steps>

<Step number={4} title="Renomeie Explícitamente as Importações (Opcional)" isOptional={true}>

O wrapper `createNextIntlPlugin()` já realiza o apelido (aliasing) do `next-intl` → `@intlayer/next-intl` do lado do empacotador. Caso decida deixar evidente a dependência explícita dentro dos seus arquivos fonte (e em troca disso, utilizar o plugin padrão do `withIntlayer` puro), você poderá mudar as configurações de localidade com as suas próprias mãos:

| Antes                                                | Depois                                                         |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| `import { useTranslations } from 'next-intl'`        | `import { useTranslations } from '@intlayer/next-intl'`        |
| `import { useLocale } from 'next-intl'`              | `import { useLocale } from '@intlayer/next-intl'`              |
| `import { NextIntlClientProvider } from 'next-intl'` | `import { NextIntlClientProvider } from '@intlayer/next-intl'` |
| `import { getTranslations } from 'next-intl/server'` | `import { getTranslations } from '@intlayer/next-intl/server'` |
| `import { getLocale } from 'next-intl/server'`       | `import { getLocale } from '@intlayer/next-intl/server'`       |
| `import { setLocale } from 'next-intl/server'`       | `import { setLocale } from '@intlayer/next-intl/server'`       |
| `import { getMessages } from 'next-intl/server'`     | `import { getMessages } from '@intlayer/next-intl/server'`     |

> Sempre preserve o que diz respeito às importações ligadas a rotas provindas diretamente do verdadeiro `next-intl` — o adaptador mantido para assegurar a compatibilidade **não substitui** o tratamento nas rotas da URL do next-intl:
>
> ```ts
> // ✅ Mantenha essas provindas do verdadeiro 'next-intl'
> import { createNavigation } from "next-intl/routing";
> import { createMiddleware } from "next-intl/server";
> import { defineRouting } from "next-intl/routing";
> ```
>
> Alternativamente, usar o `defineRouting` do `@intlayer/next-intl/routing` possibilita a inserção e mesclagem auto-gerada dos seus ambientes na `intlayer.config.ts`.

</Step>

<Step number={5} title="Habilite a Automação de Tradução por IA" isOptional={true}>

Logo que o sistema do Intlayer tiver sido devidamente ajustado, utilize a sua CLI (Interface de Linha de Comando) no intuito de inserir automaticamente os espaços em falta providenciados com o seu LLM (Large Language Model) predileto:

```bash packageManager="npm"
# Testar traduções ausentes (adicionar ao CI)
npx intlayer test

# Preencher traduções ausentes usando IA
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Acrescente o `OPENAI_API_KEY` (ou de quem você preferir) em seu registro `.env` local e prolongue/estenda também a base do seu arquivo `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // padrão
    // model: "gpt-4o-mini",   // padrão
  },
};

export default config;
```

> Dê uma lida atenta nos conteúdos incluídos na [Documentação da CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md) no propósito de verificar o leque inteiro em torno destas aberturas em seu dispor.

</Step>

</Steps>

---

## O que pode ser excluído pós-migração

Logo que o `@intlayer/next-intl` estiver configurado, as estruturas do tipo boilerplate que dizem respeito ao seu app rodando `next-intl` podem então seguir rumo a exclusão:

| Arquivo / Padrão                                                                                  | Por que não é mais necessário                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sua exportação contendo `getRequestConfig` dentro do `src/i18n.ts`                                | O Intlayer finaliza a compilação dos seus conteúdos através da técnica de "Build-Time". O per-request das interações é cortado de modo eficiente por via dessas definições. Deixe tudo como está se unicamente houver as utilidades associadas aos comandos do tipo `createNavigation` por lá.                                                                                                                                    |
| Fazendo o Call em `loadMessages()` / `getMessages()` que são embutidos pelos seus layout's        | O Provider batizado de `NextIntlClientProvider` o qual adentra originário provido através do `@intlayer/next-intl` lerá este output com dados de saídas compiladas; resultando em uma desnecessária dependência pelas "Props" denominadas `messages`.                                                                                                                                                                             |
| Qualquer carregamento das fontes localizadas do `locales/{locale}/*.json` dentro desse seu design | Os pacotes que trabalham utilizando a configuração e arquitetura via JSON (JSON bundle's) seguem sendo demandados restritamente durante o tempo aonde prosseguir acionado de preferência por você o plugin `syncJSON`. Terminando assim as respectivas transições para as abordagens voltadas aos estilos com finalizações `.content.ts`, basta apenas mandar fora a pasta contendo esse antigo método de armazenamento via JSON. |

Quando você estiver pronto para ir mais além, o Intlayer **descobre automaticamente todos os arquivos `.content.ts` e `.content.json` em qualquer lugar da sua base de código** (por padrão, em qualquer lugar sob `./src`). Basta colocar um arquivo `about.content.ts` ao lado do seu `about/page.tsx`, e o Intlayer o detectará em tempo de build sem necessidade de configuração adicional — não são necessários imports, registros ou um arquivo index central. Isso torna a co-localização das traduções com páginas e componentes totalmente fluida.

---

## Configuração do TypeScript

O Intlayer usa aumento de módulo (module augmentation) para fornecer IntelliSense completo no TypeScript (autocompletar) para as chaves de tradução. Certifique-se de que o seu arquivo `tsconfig.json` inclua os tipos gerados automaticamente:

```json5 fileName="tsconfig.json"
{
  // ... Suas configurações existentes de TypeScript
  "include": [
    // ... Suas configurações existentes de TypeScript
    ".intlayer/**/*.ts", // Inclui os tipos gerados automaticamente
  ],
}
```

---

## Configuração do Git

Adicione o diretório gerado pelo Intlayer ao seu `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora arquivos gerados pelo Intlayer
.intlayer
```

---

## Explore Além

- **Editor Visual** — Gerencie traduções visualmente no seu navegador: [Editor Visual Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)
- **CMS** — Externalize o conteúdo e gerencie remotamente: [CMS do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)
- **Extensão para VS Code** — Obtenha autocompletar de tradução e detecção de erros em tempo real: [Extensão do VS Code para o Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)
- **Referência da CLI** — Lista completa de comandos da CLI: [CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md)
- **Intlayer com Next.js** — Guia completo de configuração para Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md)
