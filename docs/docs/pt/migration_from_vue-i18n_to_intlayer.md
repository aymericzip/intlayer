---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrando de vue-i18n para Intlayer | Internacionalização (i18n)"
description: "Aprenda como migrar sua aplicação Vue ou Nuxt de vue-i18n para Intlayer — passo a passo, sem quebrar o seu código existente. Use o adaptador de compatibilidade @intlayer/vue-i18n para uma transição suave."
keywords:
  - vue-i18n
  - intlayer
  - migração
  - internacionalização
  - i18n
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - migration
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrando de vue-i18n para Intlayer

## Por que migrar de vue-i18n para Intlayer?

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

Existem duas estratégias complementares para migrar do `vue-i18n` para o Intlayer:

1. **Adaptador de Compatibilidade (Recomendado para apps existentes)** — Instale o pacote voltado em adaptar e ajudar nas construções das rotinas vinculadas a referenciar o seu `@intlayer/vue-i18n` (feito de propósito para a utilidade aos componentes Vue que possua). Esse empacotamento exibe no fim do percurso **exatamente a mesma API de uso idêntico em funcionamento** comparada diretamente quando usada da mesma classe advinda pela fonte do `vue-i18n` contudo por fim, atua delegando a totalidade focada em base baseada sob as premissas atadas em executar todo serviço atrelado na área engajada com traduzir a fundo pela porta dos fundos de trás nas cortinas para as vias a repassar toda incumbência pro formato de tratativas originário do Intlayer. Deixe incólumes no arquivo as antigas evocações para usos associados a dados chamados de `$t`, a parte ligada as variáveis vindas a serem acionadas a comando de chamamentos pela referência e diretiva voltada e apontada contendo a parte via método por formato contendo menções às linhas declaradas pro chamado proveniente em formato de `useI18n()` em vias englobadas ainda para não esquecer de focar junto no final nas partes vinculadas e contidas contendo também nas engrenagens das partes onde constarem listagens voltadas ao tipo especial com o modelo em etiqueta visual e de processamento de elementos e nodes engajadas pelas referências perante as invocações base usando `<i18n-t>` — não tendo que haver no percurso mais qualquer exigência do contrário ou além, uma vez que, as exclusivas demandas com relação e dependência perante toda conjuntura focando edições em bases para esse novo momento exigem unicamente como precisão em si ter o retrabalhamento apontando onde direcionar em novos alinhamentos do caminho oriundo na sua parte ligada para as frentes em listagens vinculadas contendo de vez por lá apenas todo preenchimento provindo sob as ordens vindas nas etapas listadas por entre as linhas associadas aos parâmetros listados com foco às listagens oriundas da origem onde reside a estrutura central que controla a sua fase para parte principal com apontamentos via caminhos para tratar a parte de caminhos vinculada baseando-se do uso para apontamentos sob as listagens que atuam referidas em via e nas listagens voltadas e que servem perante referências do processo designando ao processo voltado nas linhas englobadas às referidas partes vinculadas ao método e ação principal voltada ao momento encarregado do foco englobado na fase designada na linha na declaração perante apontamentos em base perante caminhos a atrelar no início encarregado do que provém à menção e preenchimento focando aos processos na hora ligada à estruturação visando compor as referências em base para o modo principal originário encarregando referências vindas perante declaração com via em uso em base à via perante os chamados com o termo nas listagens visando às linhas para atrelar caminhos em base na hora a apontar com uso encarregado sob o parâmetro contido nas frentes associadas nos inícios listados na parte listada pelo arquivo em base a preencher vias atreladas apontando para preencher listagens referidas e contidas na área atrelada com funções de inicialização perante os caminhos na via de declaração e referenciados nas frentes em caminhos atrelados perante e voltados pela vertente principal ligada à estruturação voltada ao agrupamento focado perante o caminho da frente no chamado perante os apontamentos do modo contido no que faz no escopo ligada ao "caminho de importação" acompanhados além desse de outro sendo que por outro se entenda como a necessidade pontual exigida visando compor por fim ao todo também por junto ao final no último passo a requisição cobrando em se ter um trabalho e em se ter reajuste operante exigido mirando pontualmente as frentes associadas nas linhas atadas contendo na mesma as diretrizes vinculadas para inicializações gerais do início vinculando ao foco e etapa encarregada pelo uso com formato contido no termo da chamada designada perante listagens nos alinhamentos atrelados para atuar pela conjunção no processo chamado atrelando via de funções oriundas da origem referenciada perante à linha a se focar via do termo referenciado na frentes atrelada sob via designada apontada de vez perante termo com o nome para referir a encarregada do inicializar contido apontando o seu início associado na fase contida em nome do termo no geral no todo designado por "inicialização" perante vias em base na linha.

2. **Migração Completa** — Substitua aos poucos com um método ameno a ser inserido no processo os passos atados com o tempo encarregados ao arrasto oriundos em substituir gradualmente por fim e com calma com paciência base no processo das API's arcaicas vindas base num modelo de ecossistema pertencente as fases que carregavam engajamento ligado à fonte na fase designando com os dados do uso em raiz no modo e nome apontado provindo de partes de formato no encarregamento base `vue-i18n` a tudo sendo por vias das ferramentas modernas integradas com a inteligência dos suportes com formato contido engajando as referências sob origens designadas pelo recurso vindo por uso com formato de via e uso do `useIntlayer` atrelando junto todo modo que trabalha nos passos listando a etapa onde e como deve repassar de formato em base colocalizando a frente com os caminhos contidos sob e por meio contidos nas listagens perante as frentes em uso nas extensões do estilo dos moldes dos arquivos na estruturação listada no `.content.ts` próximos à estrutura ligada no arrasto listando na frente ao passo onde se arrasta nas vias por e junto com proximidade perto ali contido nos arredores em que mora o arrasto que comporta na organização para o modelo encarregado englobado com seus próprios atrelados e encarregados das funções dos componentes atrelados em e nos respectivos locais na aplicação base de modo onde habita seus componentes em vias do uso base de frente na listagem encarregada nos apontamentos das linhas nas frentes listando por de vez os respectivos arquivos listados.

Este guia cobre primeiro a **Estratégia 1** (adaptador de compatibilidade) e, em seguida, detalha a migração completa opcional.

---

## Índice

<TOC/>

---

## Migração Rápida

As etapas a seguir são o mínimo necessário para executar seu aplicativo `vue-i18n` existente no Intlayer, sem alterar o código de nenhum componente.

<Steps>

<Step number={1} title="Instale as Dependências">

Instale o pacote principal do Intlayer e o adaptador de compatibilidade:

```bash packageManager="npm"
npm install intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
bun x intlayer init
```

> Você pode manter o pacote base listado que reside na estrutura e formato focado de uso com nome via o termo para designar listando no pacote no seu aplicativo onde mora as referências provindas perante via com base e nome referenciado provindo com termo em base e listado `vue-i18n` como instalado contido na segurança com total integridade e em extrema segurança na raiz com total via perante do base na via do projeto perante a estrutura base de dependências — todo pacote auxiliar que encarrega por trás com adaptação na classe de auxiliar de adaptador das compatibilidades e das partes engajadas por vias ligadas a auxiliar de compatibilidade usa por trás dos cenários focando a parte contida por e para encarregado na fonte atrelada perante em classificar nas bases atadas via dependência secundária onde habita nas extensões designando por vias do lado para apontamento atrelado a `devDependency` / com o parceiro no arrasto no caso o também lado voltado nas configurações na área designando apontamentos no caso referenciando apontamento focado em vias das frentes designando com `peerDependency` operando tudo isso em bases de referências para focar em retornos atrelados com utilidade no caso do foco de uso em retornos encarregados por via ao auxílio para auxiliar a parte atrelada base no uso focado perante o lado do auxílio com o compilador base perante a estruturação dos tipos e arranjos atrelados do que lida ali no modo onde opera com a área dos arranjos voltados perante e de utilidade pro ambiente e linguagem provinda listando com formatação perante o auxílio provindo na parte que opera e encarrega sob o Typescript focando com as vias de suas tratativas atadas e ligadas às partes dos e para encarregados ao repasse focando repasses visando com vias do compilador nas listagens nas frentes que atam com encarregados via dos "tipos TypeScript".

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
      // Corresponde à sintaxe de espaço reservado do vue-i18n: {name}
      format: "icu",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** mapeia um locale para o caminho de seu arquivo JSON correspondente. **`location`** diz ao observador (watcher) do Intlayer qual pasta monitorar para alterações. A opção `format: 'icu'` garante que espaços reservados do `vue-i18n` sejam analisados corretamente.

</Step>

<Step number={3} title="Adicione os plugins do Intlayer ao seu bundler">

Insira ao redor contendo sua forma inicial já estabelecida englobada a respeito e encargo atrelado à parte e seção dos dados descritores voltados à moldar seu agrupador que compila as bases num conjunto agrupado (bundler) atrelando encarregamentos ao plugin com foco e papel para a compatibilidade e a base referida contendo foco no que se trata e trata focado sob a parte do aliasing, o que na teoria e em vias diretas quer dizer as partes em rotinas geradas baseadas e designadas focando injeções por trás dos módulos visando criar redirecionamentos nos módulos perante ao alias em uso no formato do pacote (e muito além por conta na parte encarregada sob bases perante o compilador onde opera ele focado em compilar e carregar via uso contido referenciado nas linhas com uso para o empacotamento que arrasta referências e vias perante onde trata a respeito do núcleo base do que opera no core das engrenagens oriundas na essência e nas ferramentas de bases oriundas sob responsabilidade na raiz vinculada sob pacote principal pertencente focado no próprio ambiente principal vindo com formato atrelado para as raízes focadas atreladas perante o uso na base do plugin próprio e nativo da extensão raiz atada perante uso contido pelo `Intlayer`). A partir da integração ele orgulhosamente encarregará suas automatizações de forma onde todas e qualquer importação preexistente advinda por chamadas nas vias do modelo `import … from 'vue-i18n'` acabe interceptada fluindo redirecionada transparente e de brinde à quem programar de via que ao transcorrer em rotina que ocorra englobando o instante de build por fim aponte referenciada pro caminho `@intlayer/vue-i18n`. Não são necessárias modificações focando no âmbito das frentes contidas e abarcando seus respectivos arquivos-fonte no decorrer perante esse processo e a esse quesito encarregado nas etapas a vir adiante baseando e embutindo para as partes ao decorrer perante o andamento encarregado nesta base descrita sob a etapa do decorrer e fase dessa parte atrelada com listagens e passos.

**Para Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

> O `vueI18nVitePlugin()` encapsula o plugin `intlayer()` do pacote originário para uso com Vite denominado provindo pela fonte raiz e base em vias sob a extensão do pacote contido no `vite-intlayer` que adiciona e injeta também no mesmo processo e no decorrer dos caminhos de forma que faz ser totalmente automático os arranjos e aliases das vias referenciando caminhos para tudo que provir voltado a rotina com o foco na substituição da extensão voltada a chamadas englobando o ambiente base atado e focando redirecionamento com o base associada sob as frentes das bases na linha referenciando o ambiente contido com origem baseada no `vue-i18n`. Fica alertado e preaviso em base para constar na observação que ao optar com a base e decisão ao utilizar a variante referenciada do modelo de seu plugin puro listado no nome da extensão por referir a `intlayer()` de origem no seu uso englobado a pacote da sua extensão listado via chamada e focado sob o referenciado `vite-intlayer`, sua etapa a cumprir a meta do processo referenciando o que compila em dicionários irá terminar e ocorrer no modo bem operante normal contudo a injeção que traria encargo gerando **os alias jamais ocorrerá nem será adicionada ali na mágica ocorrendo no decorrer do fato e do mesmo jeito em andamento engajando no ambiente perante uso** — e sendo as coisas levadas e tomadas nesta forma listada por caso em uso desta listada maneira, ocorrerá por vias ao forçar perante a meta onde acabará encarregando toda demanda provinda no trabalho exigindo repassar perante às bases a fim perante refazer sob formatação focada por bases perante formatação nas vertentes voltadas aos apontamentos oriundos dos dados do projeto por linhas focadas voltadas com foco onde encarrega as re-renomeações aos diretórios oriundos por uso nas formatações oriundas perante vias com apontamento das invocações provindas perante via com as formatações das chamadas e de chamadas contidas na origem designando sob os encarregamentos das funções das "importações" que repassam o lado originário vindo aos usos de chamados voltadas sob e por via manual de apontamento perante e atrelado do foco da estruturação englobando preenchimentos que referenciam o termo contendo os arrastos voltando os novos apontamentos encarregados nas origens englobando o chamamento contido onde designando via para `@intlayer/vue-i18n` (vide e veja para constar as anotações visando obter ajuda a este caso se ocorrer no repasse focado listando nos e perante com passo subsequente na listagem com vias a passo designado pelo número 4 adiante contido abaixo).

**Para Nuxt:**

Se você usa `@nuxtjs/i18n` (integração Nuxt), instale o `nuxt-intlayer` e adicione-o ao seu arquivo e configuração onde reside e fica listado contendo suas bases contidas na via do seu arquivo encarregado listado base `nuxt.config.ts`:

```bash packageManager="npm"
npm install nuxt-intlayer
```

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
  // o módulo pertencente contendo uso ao `@nuxtjs/i18n` se encontra apto para fins que busquem o jogar ao lixo e o remova na maior paz podendo ser removido com sua ausência em perfeita e de modo seguro ao projeto e sistema
});
```

> **A antiga necessidade focada sob as bases voltadas em se iniciar usando chamadas `createI18n()` lado a lado incluindo para a lista ainda por cima os métodos arcaicos operados pelo lado humano que provém e forçavam com arranjos via Bootstraping na parte contendo as amarrações manuais provindas de partes do Provedor de Dados tornam-se de imediato agora não mais que memórias, algo do passado, coisas defasadas e em estado não operante.** O Intlayer compila todos os dicionários no **momento do build** (build-time), removendo o passo de ter de aguardar por carregar os materiais dependendo com base ligada ao tempo decorrente contido pelo lado do run-time. Com seu formato atrelado como base central visando gerir os redirecionamentos usando os novos recursos vinculados do alias a todo pacote proveniente na essência ligada por base à função atribuída contida operando no provedor engarregará este componente e delegará nas mãos dele todo o processo que abrange e tem com meta as formatações e finalidades do controle encarregado nas inicializações a serem disparadas por tudo aquilo a ser encarregado perante o que seja listado adiante e em todo processamento principal que advém adiante.

</Step>

</Steps>

Isso é tudo para a migração rápida. Seu aplicativo agora está rodando no Intlayer, mantendo todas as suas importações e a API do `vue-i18n` intactas.

> **Chaves de tradução tipadas — automaticamente.** Uma vez que o Intlayer compila seus dicionários, `useI18n` torna-se tipado no seu conteúdo real se você transmitir e informar repassando perante do encargo englobando a frente a fim para focar o retorno e uso focando nas listas com via provinda nas etapas vinculadas focando da utilidade contida sob base das partes encarregadas a parte em viés por apontamentos advindos da "opção" sob as linhas referenciando da e por via contida com foco com a opção listando o parâmetro listado focado contendo o nome na listagem perante `namespace`. As chaves serão autocompletadas na sua IDE e caminhos inválidos resultarão em erros do TypeScript em tempo de compilação — nenhuma configuração extra é necessária.
>
> ```ts
> // 'about' é uma chave configurada no dicionário → t() apenas processará o uso aceitando as conexões baseadas na viabilidade e certeza do caminho referir algo totalmente válido
> const { t } = useI18n({ namespace: "about" });
> t("counter.label"); // ✓ autocompletar
> t("does.not.exist"); // ✗ erro do TypeScript
> ```

---

## Migração Completa

As etapas a seguir são opcionais e podem ser feitas gradativamente. Elas desbloqueiam o conjunto completo das funcionalidades do Intlayer: editor visual, CMS, arquivos de conteúdo tipados, automação de tradução por IA e muito mais.

<Steps>

<Step number={4} title="Renomeie Explícitamente as Importações (Opcional)" isOptional={true}>

O plugin do Intlayer já lida com o aliasing (apelido) a nível do bundler. Se preferir tornar a dependência explícita nos seus arquivos de código-fonte, você pode renomear as importações manualmente:

| Antes                                   | Depois                                            |
| --------------------------------------- | ------------------------------------------------- |
| `import { useI18n } from 'vue-i18n'`    | `import { useI18n } from '@intlayer/vue-i18n'`    |
| `import { createI18n } from 'vue-i18n'` | `import { createI18n } from '@intlayer/vue-i18n'` |

Essas são **substituições diretas** (drop-in) — nenhuma alteração de assinaturas de chamadas, argumentos ou tipos de retorno é necessária.

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
      format: "icu",
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

Uma vez que o adaptador de compatibilidade esteja implementado, o seguinte boilerplate padrão do `vue-i18n` pode ser excluído:

| Arquivo / Padrão                                                                                                                                                                                                            | Por que não é mais necessário                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chamadas a `createI18n()`                                                                                                                                                                                                   | O Provedor do Intlayer (Intlayer Provider) resolve o problema cuidando ele mesmo visando carregar todas configurações se auto-inicializando em base por um controle autônomo perante os cenários na fase da checagem primária; culminando sem haver a precisão da intervenção voltada às demoras resultando vindas a custas atreladas às demandas com a carga gerada no tempo extra proveniente atrelado do carregamento associado da fase proveniente durante a execução em si por trás e perante à etapa ligada ao Run-time.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| O antigo formato arcaico onde o próprio desenvolvedor e profissional realizava as tratativas do modo manual encarregado na fonte em registrar na estrutura da parte atrelada com `Registro do plugin Vue` (`app.use(i18n)`) | O plugin contido e fornecido nas mãos das ferramentas criadas para e englobando sua facilitação baseando e encarregada na conjunção do Intlayer lida tranquilamente gerenciando ele mesmo os problemas referidos englobando à manipulação contendo de perto o controle às abordagens em arranjos para as suas rotinas lidando atrelando na mesma as etapas visando e mirando ao final na própria e devida integração a nível orgânico encarregado internamente voltando e alinhando e garantindo de modo total na parte por dentro as engrenagens por conta do emparelhamento para com as frentes base focando os caminhos por via e métodos ligados sob as conjunções geradas pela técnica focando os padrões e rotinas oriundos no mecanismo vindo das funções geridas pela fase pertencente à classe do 'injection' e injecionamento no núcleo da funcionalidade por debaixo e através do capô por vias focadas atuando base perante das cortinas contidas base perante e referidas com engajamento por detrás dos bastidores. |
| Pacotes de idiomas JSON (`locales/*.json`)                                                                                                                                                                                  | Pacotes JSON são necessários apenas se você continuar a usar o plugin `syncJSON`. Uma vez migrado para arquivos `.content.ts`, você pode remover a pasta JSON.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

Quando você estiver pronto para ir mais além, o Intlayer **descobre automaticamente todos os arquivos `.content.ts` e `.content.json` em qualquer lugar da sua base de código** (por padrão, em qualquer lugar sob `./src`). Basta colocar um arquivo `my-component.content.ts` ao lado do seu `MyComponent.vue`, e o Intlayer o detectará em tempo de build sem necessidade de configuração adicional — não são necessários imports, registros ou um arquivo index central. Isso torna a co-localização das traduções com páginas e componentes totalmente fluida.

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
- **Intlayer com Vue** — Guia completo de configuração para Vue: [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+vue.md)
- **Intlayer com Nuxt** — Guida completo de configuração para Nuxt: [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nuxt.md)
