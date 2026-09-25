---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "Lingui vs @intlayer/lingui: Mesmas Macros, Runtime Diferente"
description: O que muda quando uma aplicação React mantém suas macros Lingui, mas as distribui através do adaptador de compatibilidade @intlayer/lingui. Tamanho dos componentes, hidratação, vazamento e JavaScript por página medidos no mesmo código TanStack Start, incluindo os pontos em que o adaptador perde.
keywords:
  - Lingui
  - "@intlayer/lingui"
  - Intlayer
  - Adaptador de compatibilidade
  - Migração
  - Internacionalização
  - i18n
  - Benchmark
  - Tamanho de bundle
  - Blog
  - React
  - TanStack Start
  - Vite
slugs:
  - blog
  - lingui-vs-intlayer-lingui
author: aymericzip
---

# Lingui VS @intlayer/lingui | Mesmas Macros, Runtime Diferente

`@intlayer/lingui` é um adaptador de compatibilidade para `@lingui/core` e `@lingui/react`. Suas chamadas a `` t`...` ``, `<Trans>`, `useLingui()` e `i18n._()` permanecem rigorosamente as mesmas; as macros continuam compilando; o que muda é de onde as mensagens se originam em tempo de execução. Em vez de um catálogo compilado por idioma, cada ponto de chamada é vinculado a um dicionário Intlayer compilado especialmente para ele.

Este artigo mede essa troca na mesma aplicação TanStack Start, construída uma vez com o Lingui e outra com o adaptador. Os números são provenientes do [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Para avaliar as duas bibliotecas diretamente, leia [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/lingui_vs_intlayer.md). Este texto foca nas transformações proporcionadas pelo adaptador e nas situações em que ele não traz vantagens.

<TOC/>

> **tl;dr**: Na mesma aplicação TanStack Start, o `@intlayer/lingui` reduziu o componente médio de **85,5 KB para 12,8 KB** gzip, a hidratação de **28 ms para 19,7 ms**, e a troca de idioma de **5,9 ms para 2,9 ms**, sem alterar nenhuma macro. Na configuração simples (todos os catálogos carregados no início), ele também eliminou **90% do vazamento de página** e 12 KB por página. No entanto, na configuração com lazy loading ele entrega **137 KB por página contra 115 KB** do Lingui puro: o adaptador resolve ICU em runtime enquanto o Lingui entrega arrays de tokens pré-compilados. O vazamento do idioma de origem (~9-10%) é idêntico em ambos os lados, pois decorre do fallback `message` embutido nos componentes, não do runtime. O adaptador é um plugin do Vite; os testes foram realizados com TanStack Start.

## O que é o `@intlayer/lingui`

O Lingui combina um compilador e um runtime. As macros no código-fonte são extraídas para um catálogo `.po` (ou JSON) por idioma, compiladas em um módulo JS por idioma e carregadas em uma instância global `I18n` via `i18n.load()` + `i18n.activate()`. Cada `useLingui()` se inscreve nessa instância; cada chamada a `_()` busca seu identificador no catálogo ativo.

O `@intlayer/lingui` mantém as macros e a API, substituindo a busca no catálogo central:

1. **Aliasing de importações.** O plugin `lingui()` do pacote `@intlayer/lingui/plugin` envolve o `vite-intlayer` e injeta aliases em `resolve.alias` para que `@lingui/core` e `@lingui/react` apontem para `@intlayer/lingui`. Suas importações não mudam.
2. **Catálogos como fonte da verdade.** O plugin `syncJSON` (ou `syncPO` para arquivos `.po`) processa seus catálogos existentes e os converte em dicionários Intlayer, regravando as traduções quando a CLI ou o CMS realizam atualizações. Com `splitKeys: "key-prefix"`, um catálogo plano de IDs pontuados (`footer.github`, `hero.title`) é transformado em pequenos dicionários por prefixo em vez de um arquivo único de 244 KB.
3. **Vinculação no ponto de chamada.** A etapa de otimização do Intlayer coleta os IDs passados a `_`, `t` e `<Trans>` em cada arquivo e entrega ao componente apenas os dicionários correspondentes. `<Trans id="hero.title">` vincula-se de forma autônoma; `useLingui()` vincula-se a todos os prefixos utilizados no arquivo. IDs sem ponto (IDs com hash, `mockBanner`) recorrem ao dicionário único de fallback `messages` do Lingui.

```tsx fileName="src/components/Hero.tsx"
// Seu código, inalterado
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";

const Hero = () => {
  const { _ } = useLingui();
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle">Every byte counts</Trans>
    </section>
  );
};
```

```tsx fileName="O que o compilador gera (simplificado)"
import _dicHash_hero from "../.intlayer/dictionaries/hero.mjs";
import {
  useDictionary as useLingui,
  TransDictionary as Trans,
} from "@intlayer/lingui";

const Hero = () => {
  const { _ } = useLingui(_dicHash_hero);
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle" dictionary={_dicHash_hero}>
        Every byte counts
      </Trans>
    </section>
  );
};
```

O componente não precisa mais se comunicar com a instância global nem com o catálogo monolítico subjacente. Ele acessa diretamente `hero`. Essa é a razão de o tamanho dos componentes cair em 7 vezes na tabela a seguir.

## O que o adaptador mantém, ignora e não substitui

| API do Lingui                                             | Com `@intlayer/lingui`                                                                                       |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Macros `` t`...` ``, `msg`, `plural`, `select`, `<Trans>` | ✅ Mantido. Conserve `@lingui/babel-plugin-lingui-macro` ou `@lingui/swc-plugin` no build, antes do Intlayer |
| `useLingui()` → `{ i18n, _, t }`                          | ✅ Mantido. Funciona fora de providers também (idioma derivado de `react-intlayer`)                          |
| `i18n._(id, values)`, `i18n.t()`                          | ✅ Mantido. Resolve tanto IDs explícitos quanto com hash                                                     |
| Plurais ICU, `select`, `selectordinal`, `#`               | ✅ Mantido, por meio do resolvedor ICU do Intlayer                                                           |
| `i18n.date()`, `i18n.number()`, `formats`                 | ✅ Mantido, baseado na API nativa `Intl`                                                                     |
| `I18nProvider`                                            | ✅ Mantido. Envolve um `IntlayerProvider`; escuta `i18n.on("change")` para que `activate()` gere re-render   |
| `i18n.activate(locale)`                                   | ✅ Mantido                                                                                                   |
| `i18n.load(locale, messages)` / `loadAndActivate()`       | ⚠️ Aceito como **fallback em runtime**. Dicionários compilados prevalecem; aviso em dev sugere a remoção     |
| `setupI18n({ messages, missing })`                        | ⚠️ `messages` são mescladas como fallback; `missing` é ignorado                                              |
| `lingui extract` / `lingui compile`                       | ✅ Mantém seu fluxo de trabalho. Aponte `syncPO` / `syncJSON` para os catálogos extraídos                    |
| `defaultComponent` no `I18nProvider`                      | ⚠️ Armazenado no contexto, não aplicado na renderização                                                      |
| Next.js                                                   | ❌ O plugin envolve `vite-intlayer`. Exclusivo para Vite, TanStack Start e React Router                      |

## O benchmark

### O que foi medido

A suíte [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) compila **a mesma aplicação** em cada configuração: **10 páginas** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 idiomas** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componentes idênticos e conteúdo rigorosamente equivalente. As páginas são avaliadas em `en` e `fr`.

O Lingui foi analisado em quatro estratégias de carregamento: da importação inicial de todos os catálogos compilados (`static`) até um catálogo por rota carregado sob demanda (`scoped-dynamic`). O adaptador foi testado sobre os **mesmos componentes**, modificando apenas `vite.config.ts` e `intlayer.config.ts`. Sua linha `static` agrupa todos os idiomas; sua linha `dynamic` (`importMode: 'dynamic'`) carrega o idioma ativo conforme necessário. Não há versão "scoped": a otimização segmenta por ponto de chamada automaticamente.

Para cada compilação, registram-se:

- **Lib size**: tamanho gzip de um componente vazio que importa apenas a biblioteca de i18n.
- **Page JS**: JavaScript gzip transferido por página, com média ponderada em todas as páginas e idiomas.
- **Locale leak %**: proporção de strings traduzidas no JS baixado pertencentes a um idioma que o usuário **não** está visualizando.
- **Page leak %**: proporção de strings traduzidas no JS baixado pertencentes a uma página onde o usuário **não** está navegando.
- **Component avg**: tamanho gzip médio de cada componente compilado isoladamente.
- **E2E reactivity**: tempo decorrido entre selecionar um novo idioma e o DOM atualizar `html[lang]` (Playwright, 5 iterações).
- **Hydration**: duração da fase de hidratação do React.

> Os números abaixo referem-se à execução de **2026-09-12** com `@lingui/react` 6.6.0 e `@intlayer/lingui` 9.5.1. O aplicativo de teste é compacto de forma deliberada (algumas dezenas de strings por idioma), portanto as porcentagens de vazamento descrevem um **comportamento estrutural**: elas crescem proporcionalmente ao volume de texto enquanto o custo do runtime permanece constante.

### Resultados no TanStack Start

| Configuração           | Estratégia     | Lib size (gz) | Page JS méd (gz) | Vazamento idioma | Vazamento página | Componente méd (gz) | Reatividade E2E |  Hidratação |
| ---------------------- | -------------- | ------------: | ---------------: | ---------------: | ---------------: | ------------------: | --------------: | ----------: |
| **base** (sem i18n)    | -              |        0,0 KB |         111,0 KB |             0,0% |             0,0% |              0,7 KB |          8,1 ms |     21,6 ms |
| Lingui                 | static         |       11,2 KB |         152,2 KB |            50,0% |            90,0% |             58,0 KB |          3,9 ms |     19,9 ms |
| Lingui                 | dynamic        |       11,2 KB |     **115,2 KB** |             9,3% |             0,0% |             85,5 KB |          5,9 ms |     28,0 ms |
| Lingui                 | scoped-static  |       11,2 KB |         120,8 KB |             4,0% |             0,0% |            147,9 KB |          7,1 ms |     33,9 ms |
| Lingui                 | scoped-dynamic |       11,2 KB |         120,2 KB |             8,6% |             0,0% |             83,7 KB |         42,1 ms |     32,9 ms |
| **`@intlayer/lingui`** | static         |   **10,3 KB** |         140,5 KB |            50,0% |         **0,0%** |         **14,9 KB** |      **3,3 ms** | **11,3 ms** |
| **`@intlayer/lingui`** | dynamic        |   **10,3 KB** |         137,0 KB |             9,9% |         **0,0%** |         **12,8 KB** |      **2,9 ms** | **19,7 ms** |
| `intlayer` (nativo)    | static         |        5,0 KB |         125,8 KB |            50,0% |             0,0% |              8,1 KB |          3,2 ms |     11,5 ms |
| `intlayer` (nativo)    | dynamic        |        5,0 KB |         118,6 KB |             0,0% |             0,0% |              6,3 KB |          3,6 ms |     14,1 ms |

**Como interpretar os dados**

- **Componentes: 7x menores.** Este é o impacto central do adaptador. Um componente Lingui compilado de forma independente pesa em média de **58 a 148 KB**, já que `useLingui()` acessa a instância global e todos os catálogos nela carregados. O mesmo componente sob o adaptador pesa entre **12,8 e 14,9 KB**: ele importa unicamente seus próprios dicionários e o resolvedor ICU.
- **Hidratação: 8 a 14 ms mais rápida.** `i18n.load()` + `i18n.activate()` rodam no cliente antes de o React poder hidratar; quanto mais lazy for a configuração do Lingui, mais lenta é essa etapa (28 a 34 ms). Com o adaptador, os dicionários já estão presentes como imports diretos inclusos no chunk da página: **11,3 ms** em modo `static`, **19,7 ms** em modo `dynamic`.
- **Mudança de idioma: 2x mais ágil, sem travamentos.** A configuração otimizada `scoped-dynamic` do Lingui demora **42 ms** para atualizar `html[lang]`, porque o catálogo da rota precisa ser requisitado, carregado e ativado antes que a alteração apareça. O adaptador permanece entre **2,9 e 3,3 ms** em ambas as modalidades.
- **A abordagem simples é corrigida sem retrabalho.** O Lingui estático carrega todos os catálogos em todas as rotas: 152,2 KB e 90% de vazamento de página. O adaptador estático: 140,5 KB, 0% de vazamento de página, nos mesmos componentes.
- **Bytes por página: o Lingui vence em `dynamic` por 22 KB.** Esse ponto precisa ser observado com total clareza. O Lingui compila mensagens para arrays de tokens durante o build e utiliza um runtime enxuto de 11 KB que apenas os percorre. O adaptador distribui o motor ICU do Intlayer (cerca de 15 KB a mais de `@intlayer/core` em relação ao build nativo), a camada do adaptador (~10 KB) e o `react-intlayer` (~6 KB). Nesta aplicação, isso resulta em **137,0 KB contra 115,2 KB**. Se a sua prioridade máxima for exclusivamente o volume de bytes por página e você já usa Lingui com carregamento lazy, o adaptador não trará ganhos nesse índice.
- **O vazamento de idioma é semelhante nos dois sistemas.** 9,3% no Lingui, 9,9% no adaptador em modo `dynamic`. Isso decorre do código dos próprios componentes: `i18n._({ id: "careers-benefits.pay", message: "Top-of-market compensation" })` carrega a string inglesa de fallback, e a saída das macros faz o mesmo caso o campo message não seja expurgado. Esse conteúdo em inglês segue para o chunk `fr` independentemente do runtime. O Intlayer nativo (`.content.ts`, sem strings embutidas no componente) alcança 0%.

## Por que os números mudam e por que um deles permanece

Dois aspectos explicam essas diferenças: **ao que o componente está vinculado** e **o formato em que as mensagens transitam**.

**Vinculação.** No Lingui, a unidade básica é o idioma. O arquivo `messages.mjs` de `fr` é um módulo único; qualquer componente que importe a instância associada passa a ter acesso a tudo, impedindo uma separação mais profunda pelo bundler. Com o adaptador, a unidade passa a ser o ponto de chamada: `hero` e `footer` são importações separadas, divididas e carregadas conforme a demanda de cada componente. Daí surgem os ganhos de tamanho, hidratação e vazamento de página.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en/messages.mjs              # saída de lingui compile, uma por idioma
    │   └── fr/messages.mjs
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")
```

```bash
.
├── intlayer.config.ts                   # syncJSON({ splitKeys: "key-prefix" })
├── .intlayer/                           # gerado: um dicionário por prefixo de ID, por idioma
└── src
    ├── locales
    │   ├── en/messages.json             # inalterado, preservado como fonte da verdade
    │   └── fr/messages.json
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")  ← inalterado
```

**Formato.** A compilação do Lingui converte `{count, plural, one {# item} other {# items}}` em um array de tokens; o runtime jamais processa sintaxe ICU diretamente. O adaptador preserva a mensagem como texto e delega a análise ao resolvedor ICU do Intlayer. Trata-se de um custo fixo de cerca de 15 KB assumido uma única vez por página, justificando a perda da linha `dynamic` em bytes brutos mesmo vencendo em todas as outras áreas. O Intlayer nativo elimina esse peso pois seus dicionários em `.content.ts` empregam nós `enu()` / `insert()` pré-resolvidos no build.

## Migração em três passos

<Steps>
<Step number={1} title="Instalação">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

O comando reconhece o Lingui, consulta o `lingui.config.ts` para optar por `syncPO` (catálogos `.po`) ou `syncJSON` (catálogos JSON), instala `intlayer`, `react-intlayer`, `@intlayer/lingui` e o respectivo plugin de sincronização, além de atualizar o `vite.config.ts` trocando `@lingui/vite-plugin` pelo plugin do adaptador. Mantenha `@lingui/core`, `@lingui/react` e seu plugin de macros instalados: as macros continuam funcionando normalmente e o adaptador reaproveita os tipos do Lingui.

</Step>
<Step number={2} title="Conectar o Intlayer aos seus catálogos">

Para catálogos JSON (`format: "minimal"` no `lingui.config.ts`):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./src/locales/${locale}/${key}.json`,
      // Agrupa IDs com ponto pelo primeiro segmento: `footer.github` → dicionário `footer`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

Para catálogos `.po`, substitua `syncJSON` por `syncPO` do pacote `@intlayer/sync-po-plugin` mantendo a mesma estrutura `source` com extensão `.po`. Acesse a [documentação do plugin Sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md).

`splitKeys: "key-prefix"` é o fator determinante para a redução no tamanho dos componentes. O catálogo retém sua estrutura linear; a divisão opera apenas nos dicionários gerados internamente, e a sincronização reconstitui as chaves perfeitamente.

</Step>
<Step number={3} title="Adicionar o plugin">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact({
      // Mantenha seu plugin de macro; ele precisa rodar antes da etapa do Intlayer
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

`lingui()` integra o `vite-intlayer` (monitoramento de arquivos, compilação de dicionários, otimização) e redireciona os imports de `@lingui/core` e `@lingui/react` para o adaptador. Basta compilar para usufruir dos novos resultados.

</Step>
</Steps>

### O que você pode remover em seguida

| Arquivo / padrão                                     | Motivo                                                                                        |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `await import(\`./locales/${locale}/messages.mjs\`)` | Dicionários são importados diretamente pelos componentes. `i18n.load()` vira um mero fallback |
| `i18n.load()` / `i18n.loadAndActivate()`             | Mantenha `i18n.activate(locale)`; elimine o carregamento explícito de catálogos               |
| `lingui compile` no script de build                  | Apenas se adotou JSON / `.po` como fonte primária e não importa mais módulos compilados       |

### O que você ganha além dos bytes

- **Detecção de traduções faltantes.** O comando `npx intlayer test` interrompe o pipeline de CI se faltar uma chave em qualquer idioma; `lingui extract` apenas exibe estatísticas descritivas.
- **`npx intlayer fill`** preenche as chaves pendentes com o provedor de IA preferido (OpenAI, Anthropic, Mistral, Gemini...) e as devolve diretamente aos seus catálogos.
- **Editor Visual e CMS** conectam-se a esses mesmos dicionários, possibilitando que pessoas sem perfil técnico gerenciem os arquivos `.po` e JSON através de uma interface intuitiva.
- **Migração gradual para `.content.ts`.** Cada componente pode ser migrado pontualmente de `useLingui()` para `useIntlayer("hero")` com arquivo de conteúdo co-localizado quando você quiser. Os dois modelos coexistem sem atritos.

## Limitações para observar antes de começar

- **O custo adicional em `dynamic`.** Como detalhado anteriormente: espere cerca de +20 KB por página em relação a uma aplicação Lingui com lazy loading em projetos menores. Essa diferença não aumenta conforme o conteúdo cresce (depende do parser, não dos catálogos), mas tampouco desaparece.
- **Persistência do vazamento do idioma de origem.** Descritores de mensagens e macros compiladas gravam o texto original em inglês como fallback. Caso deseje eliminá-lo por completo, a solução é limpar o campo `message` ou migrar os componentes para `.content.ts`.
- **`i18n.load()` atua como fallback, não como fluxo principal.** Continuar importando catálogos compilados enquanto chama `load()` carregará o bundle antigo junto com o novo. Remova essas importações.
- **Suporte focado em Vite.** Não há plugin de Next.js para `@intlayer/lingui`. Aplicações Next.js usando Lingui devem avaliar diretamente o [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md).
- **`defaultComponent` não tem efeito.** Se você depende dele para envolver cada `<Trans>`, adicione esse componente manualmente em volta das suas chamadas.

## Qual solução escolher?

- **Continue no Lingui** caso já opere em `scoped-dynamic`, seu foco primordial seja estritamente o tamanho em bytes por página e um atraso de 42 ms na troca de idioma e 30 ms na hidratação sejam plenamente aceitáveis no seu caso.
- **Adote `@intlayer/lingui`** caso já utilize Lingui e deseje componentes mais enxutos, hidratação veloz, transições imediatas de idioma, 0% de vazamento de página em estruturas simples, chaves tipadas, testes em CI e tradução assistida por IA, sem ter que reescrever macros. É a melhor porta de entrada para projetos existentes.
- **Migre para Intlayer nativo (`react-intlayer`)** à medida que os componentes forem sendo reformulados. É a única alternativa da tabela que atinge **0% de vazamento de idioma**, 5 KB de runtime e apenas +7,6 KB por página sobre o app base.

## Comparações relacionadas

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/lingui_vs_intlayer.md) (comparação aprofundada das duas bibliotecas, mesmo benchmark)
- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-intl_vs_intlayer-next-intl.md) (série de adaptadores de compatibilidade)
- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18next_vs_intlayer-i18next.md) (série de adaptadores de compatibilidade)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/vue-i18n_vs_intlayer-vue-i18n.md) (série de adaptadores de compatibilidade)
- [Referência do adaptador de compatibilidade: Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/lingui.md)
- [Compilador vs i18n declarativo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/compiler_vs_declarative_i18n.md)

## Conclusão

O `@intlayer/lingui` reconfigura o destino ao qual cada chamada do Lingui é associada: em vez de apontar para a instância global e seu catálogo único por idioma, ela se conecta a um dicionário compilado exclusivamente para aquele componente. Na mesma aplicação TanStack Start, isso representa **componentes 7 vezes menores**, **hidratação 8 a 14 ms mais rápida**, **mudança de idioma 2 vezes mais ágil** e sem quedas bruscas de desempenho, sem alterar uma linha das suas macros. Ele preserva os fallbacks declarados nos componentes (o vazamento do idioma original se mantém) e analisa ICU em tempo de execução (a configuração dinâmica adiciona cerca de 20 KB por página em relação ao Lingui puro). Identifique qual métrica é essencial para o seu projeto antes de decidir.

Todos os dados detalhados, projetos de teste e scripts podem ser conferidos no [repositório Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Fique à vontade para rodar os testes localmente.

Consulte a documentação ['Por que o Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md) para explorar mais detalhes.
