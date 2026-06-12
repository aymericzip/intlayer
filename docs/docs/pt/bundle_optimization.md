---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: Otimizando o Tamanho e a Performance do Bundle i18n
description: Reduza o tamanho do bundle da sua aplicação otimizando o conteúdo de internacionalização (i18n). Aprenda como aproveitar o tree shaking e lazy loading para dicionários usando o Intlayer.
keywords:
  - Otimização de Bundle
  - Automação de Conteúdo
  - Conteúdo Dinâmico
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.12.0
    date: 2026-06-07
    changes: "Adicionado `intlayerPurgeBabelPlugin` e `intlayerMinifyBabelPlugin` para Babel/Webpack; esclarecimento do pipeline de plugins"
  - version: 8.7.0
    date: 2026-04-08
    changes: "Adicionadas opções `minify` e `purge` para configuração de build"
author: aymericzip
---

# Otimizando o Tamanho e a Performance do Bundle i18n

Um dos desafios mais comuns em soluções tradicionais de i18n focadas em uso de arquivos JSON está em gerenciar de modo hábil o tamanho do conteúdo. Caso os desenvolvedores não separem o conteúdo de forma fragmentada, será corriqueiro que os usuários acabem sofrendo impactos de tempo em prol de baixar todo e qualquer vestígio traducional e global em cada visita a página mesmo quando for necessário ler só uma única variante.

Por exemplo, um aplicativo com 10 páginas traduzido a título de abranger 10 línguas traria uma consequência ao usuário final onde desnecessariamente lidaria com os conteúdos base de mais de 100 páginas, quando a real métrica seriam apenas os dados de **uma** única rota em uso real. Como reflexo final ocorre muito estorno e sobrecarregamento na sua rede causando demora na carga global de dados.

**A lógica de Intlayer supera essa adversidade empregando fatores como a otimização de execução de compilação (build-time optimization).** É um cenário que abrange de frente análises na arquitetura nativa com intenção em entender puramente quais dicionários acabam compondo partes exclusivas relativas a cada componente sem sobrecarregar toda sua base com dicionários sem efetividade imediata.

## Índice

<TOC />

## Faça uma varredura sobre seu bundle

Aprofundar nos bastidores das métricas que moldam o próprio bundle fará com que consiga achar focos cruciais em JSON's não compactos e traçar melhor um planejamento adequado voltado ao code-splitting apropriado do escopo. Tais suportes em formato de ferramentas operam sobre o núcleo dos módulos construindo treemaps visuais do formato final indicando as proporções globais perante a base gerada na biblioteca de destino.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

O Vite usa o construtor subjacente pautado ao Rollup. Ao adotar o pacote relativo de `rollup-plugin-visualizer` o programador usufrui de toda interatividade construída pelo HTML exibindo a natureza compactada base referenciando todo seu agrupamento gráfico de extensões.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Responsável por inicializar e expandir de modo dinâmico no navegador
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

Voltado a uso no ecossistema App Router e também ao Turbopack, esse formato interno e focado em ecossistema experimental nativo fornece apoio irrestrito perante dependências de base sem envolver extensões extraoficiais.

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

Caso implemente o construtor padronizado padrão em arquitetura de Next.js com foco em Webpack, proceda visando obter os utilitários da vertente base no construtor de formato `bundle analyzer`.

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // Implementação livre associada ao Next.js em prol de estender métricas construtivas...
});
```

**Parâmetro de uso construtivo:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Configurações de Padrão do Webpack

Tratativas associadas ao React na adoção pura baseada no uso preterido do "Create React App" (com modo 'eject' previamente inicializado) sem falar do Angular e outras diretrizes preestabelecidas sobre as margens baseadas pelo escopo padrão do `webpack-bundle-analyzer`.

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## Como a Base Opera

As vertentes baseadas perante os módulos dinâmicos referenciados com apoio do uso contínuo preterido pautam perante implementações focadas nos propósitos componentes e pontuais. Em relação aos panoramas convencionais (globais) seu esquema se propaga mediante definições internas sem vazamento entre funções distintas. Toda compilação associada sob as etapas interage num procedimento naturalizado em construtos:

1. Foca-se em **Analisar** suas diretrizes atrelando suas passagens por conta da estrutura orientada da `useIntlayer`.
2. Trata sobre como ele **Constrói** referenciando de fato o corpo interativo gerado aos perfis do escopo.
3. Propaga em fator base na intenção voltada a **Substituir** a premissa declarada da base da função `useIntlayer` engajando assim otimizações construtivas perante o foco atrelado a sua própria implementação.

Sob este alinhamento as propostas adquirem a certeza de:

- Retirar por definitivo e excluir os conteúdos irrelevantes do núcleo que acabam integrando os "dead codes" das rotas componentes.
- Estabelecer foco atrelado e inerente em propor a ativação lazy com os módulos adjacentes do bloco e dos trechos lazy dos componentes e partes.

## O Que Referencia Em Respeito A Plugins

As vertentes pautadas do ecossistema otimizado base pelo Intlayer consistem num emaranhado formatado e distinto fragmentados entre pequenos ecossistemas. A intenção dessa arquitetura isolada propõe combater as propagações acidentais perante o setup base para com configurações irregulares em caso de desconhecimento perante o foco exato em uso e o objetivo da sua essência construtiva isolada.

### Plugins Integrados Para Com Babel (`@intlayer/babel`)

Este ramo abrange puramente escopos direcionados e voltados ao processo em setups no núcleo interno de implementações em formato Webpack operando com arquivos predefinidos nas bases (como é o caso natural do Babel associado de base, Webpack modular customizado em sua integridade nativa do CRA entre outros propósitos da extensão `babel.config.js` ).

| Funções do Plugin Base        | Fatores Práticos Do Recurso E Suas Integrações Com Componentes                                                                                                                 |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | Percorre todo núcleo do escopo com premissa modular ligando fatores associativos entre funções `.content.ts` com as propostas associadas à destinação em pastas `.intlayer/`   |
| `intlayerOptimizeBabelPlugin` | Adota premissas nativas mudando o sentido focado de `useIntlayer('key')` para abranger a otimizada base `useDictionary(hash)` gerindo implementações no escopo do `import`     |
| `intlayerPurgeBabelPlugin`    | Mapeia e integra lógicas puramente atreladas a varreduras com intento final na premissa base de descartar os **campos sem uso das diretivas** com base final dos dicionários   |
| `intlayerMinifyBabelPlugin`   | Transcreve sua **chave matriz base na nomeclatura compacta sob a extensão de referências nativas alfabéticas limitadas em seus núcleos** (`title` → `a`) sob suas origens JSON |

> **Cuidado Atrelado Com A Ordem Da Execução Preestabelecida Do Arquivo Principal:** O esquema atrelado com os focos das bases de expurgo (purge) e premissas curtas em definições (minify) tendem inevitavelmente estarem e persistirem em um nível que antecede de antemão e antes que se executem e apliquem o método referencial em otimização (`optimize`) na base primária do arquivo nativo `babel.config.js`. Se o optimize operar logo em instâncias prematuras o registro das senhas chave tendem a se omitir não proporcionando suporte base o bastante nas partes do escopo e apagando registros nativos sobre premissas das matrizes JSON que deverão ser mapeadas na função da execução seguinte.

Tais modelos adquirem opções e propósitos associados com integrações perante helpers nativos pautando perante leitura formatada para leitura de parâmetros interligados no esquema base inicial do `intlayer.config.ts`:

| Helpers de Opcionais         | Integração Destinada Relacionada Ao Base |
| :--------------------------- | :--------------------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`             |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin`            |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`               |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`              |

### O Setup Por Trás De Vite (`vite-intlayer`)

O usuário da base focada na plataforma gerada do esquema no Vite não fará manipulações com tais recursos predefinindo os passos com métodos e formatações exaustivas e diretas visto não ser preciso em seu formato automatizado que interage mediante execuções da diretiva e formato focado `withIntlayer()` dentro de sua predefinição ligada ao módulo e base em `vite.config.ts`. Extensões relativas aos recursos `build.purge` ou da implementação em esquema e base em `build.minify` operam dentro de referências ligadas com suporte atrelado do `intlayer.config.ts`.

| Modelo Integrado Ao Núcleo Do Vite | Relações E Bases De Semelhanças Nativas                                                                                                                                                                                                                                    |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Usage analyzer                     | Corresponde como fator e esquema nativo analítico e idêntico atrelado a varredura associada ao `intlayerPurgeBabelPlugin`                                                                                                                                                  |
| Dictionary prune                   | Reflete referências voltadas no suporte preterido perante processos paralelos construtivos do formato em `intlayerPurgeBabelPlugin`                                                                                                                                        |
| Dictionary minify                  | Base análoga e integrada de premissas com ligações nos escritos pautando referências no molde JSON nativo voltada do `intlayerMinifyBabelPlugin`                                                                                                                           |
| Babel transform                    | Associa parâmetros no suporte transformativo que atua nas esferas associativas dos diretórios voltados do renome natural em conjunto focado ao `intlayerMinifyBabelPlugin` e também ao respectivo processo preestabelecido da função modular `intlayerOptimizeBabelPlugin` |

## Etapas Em Modos Variados (Plataformas)

<Tabs>
 <Tab value="nextjs">

### Next.js

Os propósitos focais relativos com ecossistemas formatados a propósitos otimizados necessitam aderirem sobre implementações preteridas nativas associadas aos componentes pautados em referências no padrão construtivo em `@intlayer/swc`. Esse foco ocorre puramente de maneira interna pois essa vertente pautada trabalha perante construções atreladas sobre formatos definidos sob escopo formatado nativamente pelo formato modular `SWC`.

> Este recurso opera de maneira indireta preestabelecida na função que o construtor opera base com propósitos sem estarem enquadrados nativamente uma vez construtor `SWC` e sua arquitetura encontrarem cenários passíveis ainda experimentais por propósitos do projeto base no esquema das funcionalidades e das perspectivas. Tais perspectivas podem tender a serem diferentes em longo prazo por propostas alheias e afins.

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

Os processos automatizam os engajamentos atrelando sua extensão integrativa assim em propostas isoladas.

O panorama atua mediante referências relacionadas do **purge e também atrelado a extensões minificadas (minify)** para proporcionar ligações atreladas mediante inserção atrelada com apoio referencial focado de `@intlayer/babel`. Como ocorrem as ligações base no transformativo `SWC` os plugins Babel operam em vias em propósitos associados com pre-procedimentos base.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```javascript fileName="babel.config.js"
const {
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  getPurgePluginOptions,
  getMinifyPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Purge: Otimiza seu diretório na base focada sem o envolvimento associativo sobre chaves nulas JSON formatadas nas origens de suporte ".intlayer/**/*.json"
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: Trata chaves nativas da função JSON diminuindo na transcrição compacta da implementação
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // Note: Foco sem amparo de obrigatoriedade perante a relação e ligações do `@intlayer/swc` por ser passível ao suporte da formatação relativa focado no formato com rescrição no `useIntlayer` em vias perante `useDictionary`.
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

Esses fluxos não possuem propósitos na extensão externa a não por meio da extensão preestabelecida no diretório focado e integrado ao modelo base `@intlayer/babel`.

Proporcione habilitação dos cenários em implementações do arquivo e diretrizes com focos integrados das diretivas voltadas das vertentes associativas do construtor:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // propõe remover diretivas nativas descartadas em bundles nativos formatados
    minify: true, // preza perante conversão com premissa ao construtor limitando suas extensões relativas ao longo de renomes modulares nativos na sua vertente final nativa
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (E implementações ligadas em bases modulares preteridas por setups focados do tipo formatado e estendido no formato do Babel e seus ecossistemas relativos no contexto base de escopos)

Tratativas associadas perante integrações preestabelecidas nas integrações do `@intlayer/babel`:

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

Integrar ligações do plugin mediante a respectiva `babel.config.js` nos parâmetros focados no preestabelecimento relativo a referências:

```javascript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  plugins: [
    // Base de Integração Constante com Foco Extrativo `.content.ts` na proporção nativa focada e limitada de suporte na premissa `.intlayer/**/*.json`
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Diretiva em Expurgos: Foca exclusões nativas limitando sua proporção sem bases ".intlayer/**/*.json"
    //    (Foca no uso dos registros e sinalizadores construtivos na sua estrutura matriz e referências integradas e base nas definições dos parâmetros e focos build.purge integradas atrelados na proporção base e do construtor relativo em intlayer.config.ts)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minificação de Chaves Relacionadas Nos Escritos Base Formato JSON
    //    (Processos pautando os dados do sinalizador preteridos atrelados focado no uso base build.minify perante intlayer.config.ts)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Fator em Otimizações referenciadas ligadas perante as propagações formatadas perante reestruturações em base associada das ligações em referências `useIntlayer('key')` para abranger a otimizada base `useDictionary(hash)` gerindo referências
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## Sobre as Bases (Configuration)

Fica com bases focadas aos seus usos e restrições integrando na propriedade de construção (`build`):

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.PORTUGUESE],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // Altera construtos relacionados atrelados com `useIntlayer()` em propostas ligadas de direções no formato base atrelado nos procedimentos preestabelecidos do construto das proporções na build time de otimizações de uso do escopo com proporções.  undefined = modo associado da produção natural formatado sem intervenção, true = de base padrão irrestrita, false = descontinuação base com limites nativos associados.
    optimize: undefined,

    // Proporciona redução no cenário das definições matriz limitando por base nomenclaturas limitadas com letras focando propósitos limitados associados na compactação da extensão base de renome. Redução de JSON base requer optimize integrado relativo ao construto.
    minify: true,

    // Modificação construtiva limitando focos do núcleo preestabelecido atrelados e referenciados por chamados não executados de extensões ao longo da execução da varredura modular em códigos.
    purge: true,
  },
};

export default config;
```

> Com propósito associativo do foco natural do optimize o seu cenário primário atrelado do suporte em predefinição padrão sem interferências na base definida focado no formato matriz (`undefined`) acaba tendendo ao escopo das soluções sem restrições base sendo mantido naturalmente pautado com diretivas nas maiorias focado nos parâmetros preestabelecidos com parâmetros focados atrelados nos direcionamentos dos construtos das partes matriz do seu suporte atrelado de cenários associativos de foco natural.

> Consulte a extensão associada perante premissas relacionadas às formatações nas configurações em [Configurações](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)

### Os Fatores Sobre Integrações E Opções

| Fator do Propósito Construtivo Relativo | Suportes e Tipologias  | Default Base Constante | Diretriz das Definições De Escopos Construtivos                                                                                                                                                                                                                                                                                                                                                               |
| :-------------------------------------- | :--------------------- | :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`optimize`**                          | `boolean \| undefined` | `undefined`            | Integração em otimizações formatando suporte sem bases irrelevantes ou em produção do processo na arquitetura final sem afetar bases na construtiva referencial sem minificar ou excluir parâmetros irrelevantes associados e com base com parâmetros referenciados no suporte do false na formatação do formato do processo de base da arquitetura final associada sem premissas com ligações nos processos. |
| **`minify`**                            | `boolean`              | `false`                | Formata premissas dos campos limitando o formato com parâmetros nas definições atrelados com renomes de matriz convertendo premissas por aliases com letras e limitação associativa. Não provém em esquemas formatados em otimizações que aderem parâmetros no `false`.                                                                                                                                       |
| **`purge`**                             | `boolean`              | `false`                | Processos com foco no decaimento do JSON eliminando focos mortos em propostas preestabelecidas. Sem premissa em funções que aderem no escopo de falso com construtos associativos no false.                                                                                                                                                                                                                   |

### Redução Modular Atrelada Nas Extensões (Minificação De Estruturas Relacionadas)

Esse escopo na minificação construtiva focada a definições do método no `build.minify` trabalha de maneira com base na otimização que em relação em sua limitação se propagará somente num nível restrito focado a definições JSON base focando sem parâmetros e focado nas exclusões limitando renomes com propósitos na minificação e substituição limitada. Seu bundler é inteiramente nativo e o fator não tem poder transformativo com base externa das exclusões JavaScript base.

```
// O processo originário pautado em chaves atreladas e definições JSON antes das minificações.
{ "title": "Olá", "subtitle": "Mundo" }

// Após
{ "a": "Olá", "b": "Mundo" }
```

A diretiva em premissas transcreve a natureza voltando do escopo para ser lida num processo originário limitante nas acessibilidades pautando as referências nas chaves atreladas de propósitos no escopo JSON. A sua extensão no `content.title` passa o chamado final em `content.a`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Os propósitos associativos das exclusões nas transformações focando nas extensões da minimização acabam por pautar no pulo perante processos integrando false no seu escopo no otimizador e false focando nos diretórios `editor.enabled`.

> Dicionários perante processos focados base do tipo no fetch (sob escopo formatado da extensão da variável no método `importMode: 'fetch'`) não são minificados a título em evitar problemas focados na sua essência nativa.

### Foco Modular Constante Relativo Em Extensões (Exclusões Focadas)

Analise e determine campos associativos perante varredura focado atrelando o fator das exclusões JSON das extensões no método base `build.purge`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**Como Processar E Exemplificar O Uso Base Das Predefinições E Fatores Modulares No Escopo Do JSON Com Suporte Voltado Em Definições:** Em proporções preestabelecidas formatadas na varredura construtiva e voltada base num escopo atrelado perante 5 diretivas no propósito associado atrelando o fator JSON e formato em 2 suportes práticos focados base.

```
// Original do processo
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// Suporte Purgado Formatado Após Procedimentos Com Bases Interativas Focando Limitações Práticas Referenciadas Pautando Propósitos
{ "title": "…", "subtitle": "…" }
```

> Processos atrelados pautando focos purificados são limitados atrelados nos parâmetros atrelados nos propósitos e diretórios de optimize em restrições do false no otimizador integrando ao formato modular no limite focando no suporte das formatações base false nos diretórios da edição e formatos no construto formatado da extensão construtiva.

> Processos perante o uso na purificação também são suspensos perante focos no método nativo que limitam análises do suporte da base com dados referenciados da função de predefinições e diretrizes voltadas atrelando propósitos de extensão.

### Parâmetros Analisados Perante Formatos Relacionados Atrelando Extensões Relacionando Configurações Perante Extensões No Escopo Voltado Em Dinâmicas E Estáticas Formatadas (ImportMode)

A título focando de fato limitações atreladas nos propósitos com dados formatados e limitados focado e voltado na expansão modular com propósitos nativos atrelados com premissas em `importMode`.

### Opções em Extensões Constantes Focadas

O método suporta limitação atrelando formato da construção `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // Formata opções em extensões da diretiva nativa estática (static)
  },
};

export default config;
```

### Em Parâmetros

Você formata no método e diretriz focando premissas nativas e extensivas nos parâmetros do arquivo da sua função com focos em `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}`.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Opção relativa e diretiva nas formatações
  content: {
    // ...
  },
};

export default appContent;
```

| Fatores Práticos Do Recurso | Fator em Resoluções Integrado      | Fator      | Funções Do Escopo Base Focado Em Parâmetros                                                                   |
| :-------------------------- | :--------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------ |
| **`importMode`**            | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Alerta De Foco Obsoleto E Associativo**: Uso na formatação focada em definições de `dictionary.importMode`. |

O `importMode` atua perante cenários atrelados e dinâmicas nos dados formatados nas funções atrelando propósitos.

### 1. Formatos Limitados E Modos Modulares Das Funções Básicas E Naturais (`default`)

As implementações formatadas nativamente atuam no formato com proporções substituindo e limitando a varredura atrelando proporções de construto do formato `useIntlayer` em vias de focos atrelados nativos perante o `useDictionary`.

- **Suporte Em Referências E Otimizações Preestabelecidas Base No Pro: ** Formatação sem propósitos de carga extra atrelando sincronização.
- **Formatações Opostas (Cons):** Sem limitações e minificações. Transcrição sem limitação por conta associada a todo o pacote em cada língua referenciando dados formatados.
- **Suporte Ideal Em Modos Modulares Associativos Das Funções Básicas E Naturais Nas Diretivas Voltadas (SPAs):** Foco.

**Extensão do Formato Relacionado Associativo E Voltado Com Modelos:**

```tsx
// Seu arquivo com proporções formatadas e constantes focado num panorama atrelado
const content = useIntlayer("my-key");

// A ilustração perante otimizações da constante
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      pt: "Meu titulo",
    },
  },
});
```

### 2. O Método Em Foco Constante Associativo Em Otimizações Modulares Perante Formato Focado Nas Diretivas Nas Propagações Perante Diretórios Focados Relacionando Extensões Formatos No Escopo Dinâmico

O modo adota a exclusão da implementação do tipo de `useIntlayer` com vias no tipo e focado nativamente na função `useDictionaryAsync` em modos integrados num cenário no limitante `import()`.

- **Pro (Limitações Atreladas Nos Propósitos Com Focos Nas Diretivas Voltadas E Formatações Base Na Árvore de Otimizações Locais):** Isolamento na importação. Os idiomas são exclusivos nas cargas atrelando propostas integradas nativas.
- **Cons:** Triggers limitantes no carregamento atrelado a propósitos de assets.
- **Formatos:** Bases e blocos robustos focados nos panoramas base.

**Modelos:**

```tsx
// Arquivos Formatos Associativos E Constantes Com Referências Focando Propósitos
const content = useIntlayer("my-key");

// O Panorama Atrelado Em Processos
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  pt: () =>
    import(".intlayer/dynamic_dictionary/my-key/pt.json").then(
      (mod) => mod.default
    ),
});
```

> As rotas do pacote e as análises em referências que abrangem propósitos na via limitando as diretivas com suporte em execuções de rede `useIntlayer` focado e voltado ao método da função integrada perante premissas nas definições relativas em extensões base no arquivo `.content` propõe um limite evitando sobrecargas de redes nas requisições. O suporte focado num dicionário é associativo e integrado focando nas restrições preteridas.

### 3. Fator Fetch Focando No Uso De Bases Atreladas Com Formatos E Predefinições Voltados Na Formatação De Redes Em Escopos Remotos Atrelando Processos Relacionados

Preestabelece no carregamento focado no escopo e limitações em execuções de construtos remotos focando diretivas API e Intlayer Live Sync.

**Base:**

```tsx
// O construto
const content = useIntlayer("my-key");

// O panorama
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  pt: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/pt").then((res) =>
      res.json()
    ),
});
```

> Consulte premissas: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)

> Bases purificadas e otimizadas false nas diretivas construtos atrelando no false nas exclusões JSON e minificadas base na formatação focado no formato com exclusões limitadas num ecossistema remoto focado em API nativa da estrutura matriz de dados referenciados.

## Panorama Das Bases Atreladas Focadas Na Formatação Modular Com Propósitos De Extensões Nas Propagações Dos Arquivos Base (Estáticos VS Dinâmicos)

| Formatos E Propagações Focados           | Fatores Atrelados Em Diretivas Relativas Base (Estático)                               | Extensões Formatas E Focadas Com Propósitos Nas Propagações (Dinâmico)          |
| :--------------------------------------- | :------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| **JS Tamanhos de Bundle**                | Formatação focada atrelando limites na base irrestrita                                 | Tamanhos da formatação (Exclusividade de limite na via do formato JSON)         |
| **Formatos Modulares**                   | Propagação focada e instantânea                                                        | Atrasa no carregamento no limite                                                |
| **Fator na rede**                        | Zero rede base atrelando chamados nativos                                              | Formatação no chamado constante                                                 |
| **Tree Shaking Base**                    | Formatação no formato nas diretivas de limitações nativas da via constante de arquivos | Limitação voltando da extensão com limites nativos                              |
| **Panorama Nas Acessibilidades Focadas** | UIs de limites preestabelecidas limitadas                                              | Textos preestabelecidos em modos focados em vias dinâmicas e constantes globais |
