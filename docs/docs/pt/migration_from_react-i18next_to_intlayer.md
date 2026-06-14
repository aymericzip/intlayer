---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrando de react-i18next / i18next para Intlayer | Internacionalização (i18n)"
description: "Aprenda como migrar sua aplicação React ou Next.js de react-i18next ou i18next para Intlayer — passo a passo, sem quebrar o seu código existente. Use os adaptadores de compatibilidade @intlayer/react-i18next e @intlayer/i18next para uma transição suave."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migração
  - internacionalização
  - i18n
  - Next.js
  - React
  - JavaScript
slugs:
  - doc
  - migration
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrando de react-i18next / i18next para Intlayer

## Por que migrar de react-i18next / i18next para Intlayer?

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

## Estratégias de Migração

Existem duas estratégias complementares para migrar de `react-i18next` / `i18next` para o Intlayer:

1. **Adaptador de Compatibilidade (Recomendado para apps existentes)** — Instale o `@intlayer/react-i18next` (para compilação em componentes React) e/ou inclua na mesma jogada o pacote com foco na área do `i18n` geral `@intlayer/i18next`. Esses pacotes expõem **exatamente a mesma API** do `react-i18next` / `i18next`, mas delegam todo o trabalho de tradução, por baixo dos panos, para o Intlayer. Mantenha intactas as suas chamadas existentes relacionadas ao `useTranslation`, `Trans`, `withTranslation` e `i18next.t()` — o que muda exclusivamente serão os caminhos listados em suas importações.

2. **Migração Completa** — Substitua progressivamente com calma o legado vindo das APIs originadas no ecossistema do `react-i18next` pelas opções dos hooks modernos do Intlayer (ex: `useIntlayer`, `IntlayerProvider`) enquanto paralelamente vai colocalizando todo modelo mantenedor de seus dados por detrás de diretórios contendo sua extensão em novo formato padrão `.content.ts` próximos em hierarquia de pastas diretamente onde pertencem no conjunto ao lado dos seus devidos componentes.

Este guia cobre primeiro a **Estratégia 1** (adaptador de compatibilidade) e, em seguida, detalha a migração completa opcional.

---

## Índice

<TOC/>

---

## Migração Rápida

As etapas a seguir são o mínimo necessário para executar seu aplicativo `react-i18next` existente no Intlayer, sem alterar o código de nenhum componente.

<Steps>

<Step number={1} title="Instale as Dependências">

Instale o pacote principal do Intlayer e o adaptador de compatibilidade:

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
bun x intlayer init
```

> Mantenha em segurança os seus pacotes ligados diretamente de base instalados na aplicação vinda da estrutura original como o seu `react-i18next` acompanhado ainda paralelamente do `i18next` presentes no decorrer de tudo que fará. O novo adaptador encarregado na compatibilização com ele faz proveito exigindo tais referências com ligações que visam fins relacionados à averiguação do compilador TypeScript enquanto classificados de forma branda seja no modo das conhecidas marcações opcionais tratadas por opções designadas pelas extensões denominadas em formato de rótulos tanto pela vertente de `devDependencies` ou via preenchimento sob o arranjo de modelo atrelado por características na modelagem visual de exigência e suporte de classes associadas referidas por via das `peerDependencies`. Em sumo e no final do percurso de execução prática, em tempo nenhum por parte deste ou aquele momento, a menor que seja uma obrigatória modificação se mostrará pedida e passará exigindo ter ou haver edição prévia nas dependências originadas em base à sua antiga raiz contida sob a sua grade de pares inserida lá mesmo perante arquivos definidores de referências presentes nos módulos contidos no final com a exata terminação e nome por parte da listagem no seu base e raiz `package.json`.

</Step>

<Step number={2} title="Configure o Intlayer">

O comando `intlayer init` cria um arquivo inicial `intlayer.config.ts`. Atualize-o para corresponder aos seus locales existentes e direcione o plugin `syncJSON` para seus arquivos de mensagens:

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
      // Corresponde à sintaxe de espaço reservado do react-i18next: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** mapeia um locale para o caminho de seu arquivo JSON. **`location`** diz ao observador (watcher) do Intlayer qual pasta monitorar para alterações. A opção `format: 'i18next'` garante que os espaços reservados como `{{name}}` sejam interpretados corretamente.

</Step>

<Step number={3} title="Adicione os plugins do Intlayer ao seu bundler">

Insira ao redor no centro global contendo sua forma inicial já estabelecida englobada a respeito e encargo atrelado à parte e seção dos dados descritores voltados à moldar seu agrupador que compila tudo engatando então, para junto daquele conjunto e ambiente, toda base construída no modelo feito no pacote designado à trazer uma tradução suave por base de ser um adaptante facilitador nas vias deste compatibilizador final e auxiliar. Ao integrar ele perfeitamente aos demais, ocorrerá de forma orgânica as definições automáticas contidas baseando as ligações intrínsecas essenciais ao passo a compor internamente para todo funcionamento o emparelhamento com monitoração dos conteúdos em si. O processo crucial por aqui acontece então garantindo na retaguarda de todo código principal e ao longo e tempo voltados a etapa do próprio momento exato do processo visando a checagem no Build-Time que uma injeção perfeitamente clara de alias no âmbito estruturado sobre os módulos transcorra sem incidentes. Sendo isso de suma utilidade já que ele faz automaticamente chamadas que estiverem originárias nos antigos moldes provenientes da sua herança antiga utilizando caminhos parecidos vindos num padrão referenciado que cita um `import … from 'react-i18next'` (inclusive no outro sendo pelo lado direto ao referir-se perante uso focado ao contido do chamado vindo a requerer o `'i18next'`) sejam interceptadas fluindo tranquilamente guiadas com transparência a passarem e repassarem a frente direcionadas para caírem num retorno certeiro e bem referenciado focando unicamente recair sua totalidade visando e retornando num fluxo para os emparelhamentos dos caminhos novos referenciados por vias dos padrões usando as vias criadas ao designar os caminhos `@intlayer/react-i18next` e bem em conjunto, também o que leva no padrão ao outro designado como parte no caminho `@intlayer/i18next`. Ao concluir as averiguações em campo visando o período completo deste percurso por todo o momento decorrente, o ponto focado no encerramento garante tranquilidade demonstrando claramente ser impossível exigirem ter de se executar intervenção manual buscando forçar com que se repasse alterando o que é seu por essência originada do código e base na via de código-fonte.

**Para Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

> O `reactI18nextVitePlugin()` encapsula o plugin `intlayer()` do `vite-intlayer` e adiciona automaticamente os aliases para `react-i18next` / `i18next`. Usar o plugin comum `intlayer()` do pacote originado pelo empacotamento advindo pela base focada a integração focada em fornecer as chaves para os mecanismos voltados à compilação oriunda pela origem proveniente em cima de quem engloba a formatação em uso para compilar junto a ele seus dicionários (isso no arranjo base designado por nós na essência da extensão base em cima das raízes vindas pelo intermédio voltado perante as tratativas visando suporte direto perante ambiente `vite-intlayer`), fará sem falta o seu trabalho perfeitamente. Contudo, fique bem claro de cara, a mesma ação proveniente da formatação crua **não fará ali de brinde e presente as ligações encarregadas em anexar por tabela os aliases** — O que acaba exigindo nesse contexto o seu devido trabalho operando para tratar em re-renomeações e renomeações da totalidade e conjunções provindas num agrupamento generalizado focando para as vias de sua base manual mirando a todos retornos perante todas frentes baseadas na invocação onde há e constem nas vias os caminhos aos caminhos baseados na estrutura chamando pelos prefixos sob base inicial do `@intlayer/*` (Consulte para mais e melhores detalhes no passo subsequente da Etapa 4).

**Para Next.js:**

Se você usa `next-i18next` (integração Pages Router), instale `@intlayer/next-i18next` e `next-intlayer`:

```bash packageManager="npm"
npm install @intlayer/next-i18next next-intlayer
```

Em seguida, adicione o plugin de compatibilidade ao seu `next.config.ts` (ele injetará os aliases de `next-i18next` / `react-i18next` / `i18next`):

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  /* Suas opções de configuração */
};

export default withIntlayer(nextConfig);
```

> **A antiga necessidade focada sob as bases voltadas em se iniciar usando chamadas `i18next.init()` lado a lado incluindo para a lista ainda por cima os métodos arcaicos operados pelo lado humano que provém e forçavam com arranjos via Bootstraping na parte contendo as amarrações do Provedor de Dados tornam-se de imediato agora não mais que memórias, algo do passado, coisas defasadas e em estado não operante.** O Intlayer compila todos os dicionários no **momento do build** (build-time), removendo o passo de ter de aguardar por carregar os materiais dependendo com base ligada ao tempo decorrente contido pelo lado do run-time. Com seu formato atrelado como base central visando gerir os redirecionamentos usando os novos recursos vinculados do alias a todo pacote proveniente na essência ligada por base à função atribuída contida operando no provedor engarregará este componente e delegará nas mãos dele todo o processo que abrange e tem com meta as formatações e finalidades do controle encarregado nas inicializações a serem disparadas por tudo aquilo a ser encarregado perante o que seja listado adiante e em todo processamento principal que advém adiante.

</Step>

</Steps>

Isso é tudo para a migração rápida. Seu aplicativo agora está rodando no Intlayer, mantendo todas as suas importações e a API do `react-i18next` intactas.

> **Chaves de tradução tipadas — automaticamente.** Uma vez que o Intlayer compila seus dicionários, `useTranslation` e `getFixedT` tornam-se tipados no seu conteúdo real. As chaves serão autocompletadas na sua IDE e caminhos inválidos resultarão em erros do TypeScript em tempo de compilação — nenhuma configuração extra é necessária.
>
> ```tsx
> // 'about' é uma chave configurada no dicionário → t() apenas processará o uso aceitando as conexões baseadas na viabilidade e certeza do caminho referir algo totalmente válido
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ autocompletar
> t("does.not.exist"); // ✗ erro do TypeScript
>
> // Componente no lado servidor (instância i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ tipado
> ```

---

## Migração Completa

As etapas a seguir são opcionais e podem ser feitas gradativamente. Elas desbloqueiam o conjunto completo das funcionalidades do Intlayer: editor visual, CMS, arquivos de conteúdo tipados, automação de tradução por IA e muito mais.

<Steps>

<Step number={4} title="Renomeie Explícitamente as Importações (Opcional)" isOptional={true}>

O plugin do Intlayer já lida com o aliasing (apelido) a nível do bundler. Se preferir tornar a dependência explícita nos seus arquivos de código-fonte, você pode renomear as importações manualmente:

| Antes                                              | Depois                                                       |
| -------------------------------------------------- | ------------------------------------------------------------ |
| `import { useTranslation } from 'react-i18next'`   | `import { useTranslation } from '@intlayer/react-i18next'`   |
| `import { Trans } from 'react-i18next'`            | `import { Trans } from '@intlayer/react-i18next'`            |
| `import { withTranslation } from 'react-i18next'`  | `import { withTranslation } from '@intlayer/react-i18next'`  |
| `import { I18nextProvider } from 'react-i18next'`  | `import { I18nextProvider } from '@intlayer/react-i18next'`  |
| `import { initReactI18next } from 'react-i18next'` | `import { initReactI18next } from '@intlayer/react-i18next'` |
| `import i18next from 'i18next'`                    | `import i18next from '@intlayer/i18next'`                    |
| `import { createInstance } from 'i18next'`         | `import { createInstance } from '@intlayer/i18next'`         |
| `import { t } from 'i18next'`                      | `import { t } from '@intlayer/i18next'`                      |

Para Next.js (`next-i18next`):

| Antes                                                                          | Depois                                                            |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |

</Step>

<Step number={5} title="Habilite a Automação de Tradução por IA" isOptional={true}>

Com o Intlayer configurado, você pode usar a CLI para preencher traduções ausentes automaticamente:

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

Adicione a configuração de IA ao seu `intlayer.config.ts`:

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
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
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

> Verifique a [Documentação da CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md) para explorar todas as opções disponíveis.

</Step>

</Steps>

---

## O que pode ser excluído pós-migração

Uma vez que o adaptador de compatibilidade esteja implementado, o seguinte boilerplate padrão do `react-i18next` / `i18next` pode ser excluído:

| Arquivo / Padrão                                                                                        | Por que não é mais necessário                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chamadas a `i18next.init()`                                                                             | O Provedor do Intlayer (Intlayer Provider) resolve o problema cuidando ele mesmo visando carregar todas configurações se auto-inicializando em base por um controle autônomo perante os cenários na fase da checagem primária; culminando sem haver a precisão da intervenção voltada às demoras resultando vindas a custas atreladas às demandas com a carga gerada no tempo extra proveniente atrelado do carregamento associado da fase proveniente durante a execução em si por trás e perante à etapa ligada ao Run-time.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Fazendo o Call que atrela `I18nextProvider` / ou ainda o antigo Call referenciando o `initReactI18next` | O plugin contido e fornecido nas mãos das ferramentas criadas para e englobando sua facilitação baseando e encarregada na conjunção do Intlayer lida tranquilamente gerenciando ele mesmo os problemas referidos englobando à manipulação contendo de perto o controle às abordagens em arranjos para as suas rotinas lidando atrelando na mesma as etapas visando e mirando ao final na própria e devida integração a nível orgânico encarregado internamente voltando e alinhando e garantindo de modo total na parte por dentro as engrenagens por conta do emparelhamento para com as frentes base focando os caminhos por via e métodos ligados sob as conjunções geradas pela técnica focando os padrões e rotinas oriundos no mecanismo vindo das funções geridas pela fase pertencente à classe do 'injection' misturando também o embutimento gerado perante os fluxos em vias referenciados sob os comandos por parte vinculada às referências em base contendo e gerando e moldando os arranjos pelo suporte e engajamento da vertente do mecanismo central a se focar via e encarregados das funções baseadas e tratadas como as fases na técnica de arrasto gerado no boot e início designadas no linguajar sob o agrupamento denominado e encarregado nos formatos baseados em métodos com raízes tratadas aos comandos voltados ao chamado de "bootstrapping" e etc. |
| Pacotes de idiomas JSON (`locales/*.json`)                                                              | Pacotes JSON são necessários apenas se você continuar a usar o plugin `syncJSON`. Uma vez migrado para arquivos `.content.ts`, você pode remover a pasta JSON.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

Quando você estiver pronto para ir mais além, o Intlayer **descobre automaticamente todos os arquivos `.content.ts` e `.content.json` em qualquer lugar da sua base de código** (por padrão, em qualquer lugar sob `./src`). Basta colocar um arquivo `my-component.content.ts` ao lado do seu `MyComponent.tsx`, e o Intlayer o detectará em tempo de build sem necessidade de configuração adicional — não são necessários imports, registros ou um arquivo index central. Isso torna a co-localização das traduções com páginas e componentes totalmente fluida.

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
- **Intlayer com React** — Guia completo de configuração para React: [intlayer_with_vite+react.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md)
- **Intlayer com Next.js** — Guida completo de configuração para Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md)
