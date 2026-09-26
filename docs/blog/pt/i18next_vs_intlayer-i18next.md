---
createdAt: 2026-09-13
updatedAt: 2026-09-22
priority: 8
title: "i18next vs @intlayer/i18next: Mesma API, Outro Bundle"
description: O que muda quando uma aplicação React ou Next.js mantém suas chamadas de i18next, react-i18next e next-i18next mas as executa através dos adaptadores @intlayer/i18next. JavaScript por página, tamanho de componentes, vazamento de conteúdo e hidratação medidos no mesmo código, além do que os adaptadores mantêm, ignoram e não substituem.
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - "@intlayer/i18next"
  - "@intlayer/react-i18next"
  - "@intlayer/next-i18next"
  - Intlayer
  - Adaptador de compatibilidade
  - Migração
  - Internacionalização
  - i18n
  - Benchmark
  - Tamanho de bundle
  - Blog
  - Next.js
  - React
slugs:
  - blog
  - i18next-vs-intlayer-i18next
author: aymericzip
---

# i18next VS @intlayer/i18next | Mesma API, Outro Bundle

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/i18next`, `@intlayer/react-i18next` e `@intlayer/next-i18next` são adaptadores de compatibilidade. Eles expõem a API do `i18next` que seu código já utiliza (`useTranslation`, `t()`, `<Trans>`, `i18n.changeLanguage()`, `getFixedT`, `serverSideTranslations`...) e a fornecem a partir de dicionários compilados pelo Intlayer. Os componentes não mudam. O runtime abaixo deles sim.

Este artigo analisa essa substituição na mesma aplicação Next.js, construída uma vez com `next-i18next` e outra com `@intlayer/next-i18next`. Os dados são do [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Para comparar `i18next` e Intlayer como bibliotecas completas, leia [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18next_vs_intlayer.md). Este artigo se concentra no que o adaptador transforma quando você preserva seu código como está.

<TOC/>

> **tl;dr**: Na mesma aplicação Next.js, substituir `next-i18next` por `@intlayer/next-i18next` reduziu o JavaScript por página de **218.5 KB para 150.7 KB** gzip (setup básico) e superou o setup do `next-i18next` totalmente otimizado (163.4 KB) em **12.7 KB**. O componente médio caiu de **78.5 KB para 9.7 KB**, o vazamento de strings para outras páginas foi de **~90% para 0%**, a hidratação de **15.6 ms para 11.3 ms** e o runtime de **19.7 KB para 9.4 KB**. Nenhum componente foi editado; apenas um arquivo de provider foi ajustado. Plugins do `i18next` (backends, detectores de idioma) são aceitos mas não realizam nada: não há mais nada para carregar ou detectar em tempo de execução.

## O que é o `@intlayer/i18next`

O `i18next` é um runtime. `i18n.init({ resources })` ou um plugin de backend carrega `locales/{lng}/{ns}.json` em uma instância global; `useTranslation("about")` inscreve o componente nela; `t("title")` busca a chave no momento da renderização. Namespaces, carregamento sob demanda (lazy loading), listas de namespaces por página e segurança de tipos ficam sob sua responsabilidade de configuração e manutenção.

Os adaptadores preservam a API e substituem a instância:

1. **Aliases de importação.** `createNextI18nPlugin()` do `@intlayer/next-i18next/plugin` (ou `withI18next`) envolve o `withIntlayer` e cria aliases no Webpack / Turbopack para que `next-i18next`, `react-i18next` e `i18next` resolvam para os pacotes `@intlayer/*`. No Vite, o `reactI18nextVitePlugin()` do `@intlayer/react-i18next/plugin` tem o mesmo papel. Nenhuma importação precisa ser renomeada.
2. **JSON como fonte de verdade.** O plugin `syncJSON` lê seus arquivos existentes `locales/{lng}/{ns}.json` com `format: "i18next"` (garantindo que `{{name}}`, aninhamento `$t()`, `_one` / `_other` e sufixos de contexto sejam interpretados adequadamente) e regrava as traduções quando a CLI ou o CMS as atualizam.
3. **Vinculação no ponto de chamada.** A etapa de otimização do Intlayer reescreve `useTranslation("about")` em uma chamada que recebe o dicionário `about` diretamente, no idioma ativo. O componente deixa de acessar a store global.

```tsx fileName="components/About.tsx"
// Seu código, inalterado
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="O que o compilador emite (simplificado)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslation } from "@intlayer/react-i18next";

const About = () => {
  const { t } = useTranslation(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Essa transformação é a razão pela qual as colunas de tamanho de componente e vazamento de página caem drasticamente nos dados abaixo.

## O que os adaptadores mantêm, ignoram e não substituem

| API do `i18next`                                                                | Com `@intlayer/*`                                                                                                     |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useTranslation("ns")`, `useTranslation("ns", { keyPrefix })`                   | ✅ Mantido. Vinculado ao dicionário `ns` em tempo de compilação; tipado com seu conteúdo                              |
| `t("key", { name })`, `{{interpolation}}`, aninhamento `$t(key)`                | ✅ Mantido                                                                                                            |
| Plurais `key_one` / `key_other`, contexto `key_male`, `returnObjects`           | ✅ Mantido. Plurais calculados com `Intl.PluralRules`                                                                 |
| `<Trans>` com `components`, tags numeradas `<1>...</1>`, `values`               | ✅ Mantido                                                                                                            |
| `withTranslation`, `Translation`, `I18nContext`                                 | ✅ Mantido                                                                                                            |
| `i18n.changeLanguage()`, `i18n.language`, `i18n.dir()`, `on("languageChanged")` | ✅ Mantido. `changeLanguage` controla o idioma do Intlayer                                                            |
| `getFixedT(lng, ns, keyPrefix)`, `i18n.exists()`, `hasLoadedNamespace()`        | ✅ Mantido                                                                                                            |
| `i18n.use(Backend).use(LanguageDetector).init({...})`                           | ⚠️ `use()` executa o `init` do plugin e encerra; backends e detectores não têm nada para carregar ou detectar         |
| `init({ resources })`, `addResourceBundle()`                                    | ⚠️ `resources` é **ignorado** com alerta de desenvolvimento; remova imports de JSON para obter ganhos reais de bundle |
| `I18nextProvider i18n={i18n}`                                                   | ⚠️ Renderiza um `IntlayerProvider`; a prop `i18n` é ignorada. No App Router, passe o locale (veja abaixo)             |
| `serverSideTranslations(locale, ["common"])` (next-i18next)                     | ⚠️ Retorna a estrutura esperada e não carrega nada. Seguro de manter, seguro de remover                               |
| `appWithTranslation(App)` (next-i18next)                                        | ✅ Mantido                                                                                                            |
| `next-i18next.config.js`                                                        | ⚠️ Não é lido. Os idiomas são configurados no `intlayer.config.ts`                                                    |
| `useTranslation()` sem namespace                                                | ✅ Opera contra o dicionário geral `translation` do arquivo inteiro (`splitKeys: false`)                              |

## O benchmark

### O que foi medido

A suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) compila **a mesma aplicação** em cada ambiente: **10 páginas** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), componentes idênticos e conteúdo idêntico. As páginas são avaliadas em `en` e `fr`.

O `next-i18next` foi configurado em quatro estratégias de carregamento, desde o JSON de cada idioma importado em `resources` (`static`) até um namespace por rota, carregado de forma diferida via backend (`scoped-dynamic`). O adaptador foi testado sobre **os mesmos componentes do setup inicial**, com alterações limitadas a `next.config.ts`, `intlayer.config.ts` e ao arquivo do provider. Ele não possui variante "scoped" manual: o compilador define o escopo do conteúdo por componente.

Para cada compilação, registram-se:

- **Tamanho da lib**: tamanho gzip de um componente vazio que apenas importa a biblioteca de i18n.
- **JS por página**: média de JavaScript gzip transferido por página em todas as rotas e locales.
- **% de vazamento de locale**: parcela de strings traduzidas no JS que pertence a um idioma que o usuário **não** está visualizando.
- **% de vazamento de página**: parcela de strings traduzidas no JS que pertence a uma página em que o usuário **não** está navegando.
- **Média por componente**: tamanho médio gzip de cada componente compilado de forma isolada.
- **Reatividade E2E**: intervalo de tempo real entre selecionar um novo idioma e a alteração de `html[lang]` no DOM (Playwright, 5 repetições).
- **Hidratação**: tempo de duração da fase de hidratação do React.

> Os dados abaixo resultam da execução de **12/09/2026** com `next-i18next` 16.3.0 (`react-i18next` 17.0.13, `i18next` 26.4.2) e `@intlayer/next-i18next` 9.5.1. A aplicação de teste foi projetada com escopo enxuto propositalmente (algumas dezenas de strings por idioma), portanto os percentuais de vazamento ilustram um **comportamento**: expandem-se proporcionalmente ao crescimento do conteúdo enquanto o custo do runtime permanece estático.

### Resultados no Next.js

Escolha as métricas e as bibliotecas que importam para você:

<I18nBenchmark framework="nextjs" vertical/>

| Setup                        | Estratégia     | Tamanho lib (gz) | Média JS pág (gz) | Vazamento locale | Vazamento pág | Média comp (gz) | Reatividade E2E |  Hidratação |
| ---------------------------- | -------------- | ---------------: | ----------------: | ---------------: | ------------: | --------------: | --------------: | ----------: |
| **base** (sem i18n)          | -              |           0.0 KB |          141.0 KB |             0.0% |          0.0% |          0.9 KB |         13.4 ms |     11.8 ms |
| `next-i18next`               | static         |          19.7 KB |          218.5 KB |             0.0% |         89.8% |         78.5 KB |         16.4 ms |     15.6 ms |
| `next-i18next`               | dynamic        |          19.7 KB |          169.5 KB |            50.0% |         89.8% |         26.1 KB |         15.4 ms |     27.7 ms |
| `next-i18next`               | scoped-static  |          19.7 KB |          220.1 KB |             0.0% |         89.8% |         78.9 KB |         16.4 ms |     14.7 ms |
| `next-i18next`               | scoped-dynamic |          19.7 KB |          163.4 KB |             0.0% |          0.0% |         27.1 KB |         15.9 ms |     15.1 ms |
| **`@intlayer/next-i18next`** | static         |       **9.4 KB** |      **150.7 KB** |         **0.0%** |      **0.0%** |      **9.7 KB** |     **10.7 ms** | **11.3 ms** |
| **`@intlayer/next-i18next`** | dynamic        |       **9.4 KB** |      **150.7 KB** |         **0.0%** |      **0.0%** |      **9.7 KB** |     **11.9 ms** | **10.6 ms** |
| `next-intlayer` (nativo)     | static         |           5.5 KB |          141.3 KB |             0.0% |          0.0% |          8.5 KB |         15.5 ms |     16.9 ms |
| `next-intlayer` (nativo)     | dynamic        |           5.5 KB |          141.3 KB |             0.0% |          0.0% |          6.9 KB |         15.3 ms |     15.9 ms |

**Como interpretar os dados**

- **68 KB a menos por página em relação ao setup básico.** `resources: { en, fr, ... }` despacha todos os idiomas e namespaces para cada rota: **218.5 KB**. O build com o adaptador cai para **150.7 KB**. Supera também a configuração mais elaborada do `next-i18next` (163.4 KB, namespace único por rota, carregado sob demanda) em 12.7 KB, pois a própria biblioteca `i18next` consome 19.7 KB contra 9.4 KB.
- **O vazamento atinge 0% sem intervenção em componentes.** Cada configuração do `next-i18next`, à exceção da modularizada manualmente, entrega ~90% de strings de rotas distintas. A linha `dynamic` é pior na prática do que aparenta: preserva o vazamento entre páginas e adiciona **50% de vazamento de idioma**, dado que o backend busca todo o namespace `translation` do locale ativo. O adaptador estabelece 0% / 0% a partir do código original.
- **Componentes: 8x mais enxutos.** Um componente com `useTranslation()` isolado consome **78.5 KB** com `resources` inlined e **26-27 KB** com backend, já que `t` continua preso à store global. No adaptador, a média cai para **9.7 KB**.
- **Hidratação e alternância de idioma aceleradas.** A hidratação cai de 15.6 ms para **11.3 ms** (e de 27.7 ms no modo `dynamic`, no qual o carregamento do backend reside no caminho crítico). A troca de idioma cai de 15-16 ms para **11-12 ms**.
- **O adaptador é diferente do runtime nativo.** O `next-intlayer` crava **141.3 KB**, meros +0.3 KB acima do app sem i18n. O adaptador suporta as particularidades da API do `i18next` (expressões de interpolação, sufixos de plural e contexto, tags `<Trans>`) sobre o núcleo do Intlayer: 9.4 KB e +9.4 KB por página em relação ao nativo. Atua como transição, não como destino final.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabela completa, cada biblioteca e cada estratégia, no [relatório de benchmark do Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md).

> O adaptador `react-i18next` no Vite / TanStack Start não constou desta rodada de testes. A medição para `react-i18next` no TanStack Start pode ser verificada em [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18next_vs_intlayer.md): 127-184 KB por página e 123-185 ms na troca de idioma com backend sob demanda.

## O motivo da mudança nos indicadores

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Nenhum arquivo em `components/` foi alterado, logo o ganho advém da entidade à qual `useTranslation` se acopla.

**Com o `i18next`**, a ligação é feita na instância global. Qualquer recurso alocado nela (todos os idiomas em `static`, o namespace completo do idioma ativo em `dynamic`) torna-se acessível para qualquer componente chamador de `useTranslation()`. O bundler não consegue fragmentar abaixo do volume contido na instância, e o runtime não é capaz de prever quais chaves serão demandadas em renderização.

```bash
.
├── next-i18next.config.js
├── public/locales
│   ├── en/translation.json           # strings de todas as páginas
│   └── fr/translation.json
├── i18n/i18n.ts                      # i18n.use(initReactI18next).init({ resources })
└── components
    ├── AppProviders.tsx              # <I18nextProvider i18n={i18n}>
    └── About.tsx                     # useTranslation(); t("about.title")
```

Tudo o que a instância contém é enviado para todas as páginas, e o desperdício cresce em dois eixos, páginas e idiomas:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

**Com o `@intlayer/next-i18next`**, a ligação é feita diretamente com o dicionário. O plugin `syncJSON` transforma cada arquivo de namespace em um dicionário; o ciclo de otimização repassa ao componente apenas o dicionário declarado, na forma de import que o empacotador rastreia e separa por página e locale.

```bash
.
├── intlayer.config.ts                # syncJSON({ format: "i18next", source: ... })
├── public/locales
│   ├── en/translation.json           # inalterado, continua como fonte da verdade
│   └── fr/translation.json
├── .intlayer/                        # gerado: um dicionário por namespace, por locale
└── components
    ├── AppProviders.tsx              # <IntlayerClientProvider locale={locale}>
    └── About.tsx                     # useTranslation(); t("about.title")  ← inalterado
```

O arquivo `i18n/i18n.ts` e sua importação de `resources` tornam-se código inerte. É daí que procedem os 68 KB de alívio.

## Migração em três etapas

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

O comando identifica `i18next` / `react-i18next` / `next-i18next`, instala o `intlayer`, o pacote do framework (`next-intlayer` ou `react-intlayer`), o respectivo adaptador `@intlayer/*` e o `@intlayer/sync-json-plugin`, além de preencher o `intlayer.config.ts`. Conserve as dependências originais instaladas: elas operam como peer dependencies e entregam as tipagens.

</Step>
<Step number={2} title="Aponte o Intlayer para seus arquivos de tradução">

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
    format: "i18next",
  },
  plugins: [
    syncJSON({
      // dialeto i18next: {{name}}, $t(key), key_one / key_other, key_male
      format: "i18next",
      // Um arquivo por namespace: `useTranslation("about")` → about.json
      source: ({ locale, key }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

Caso você mantenha um único arquivo `translation.json` por locale (o namespace padrão do i18next), configure `splitKeys: false` para que o arquivo integral permaneça como um único dicionário e invocações diretas de `useTranslation()` prossigam sem falhas.

</Step>
<Step number={3} title="Adicione o plugin">

<Tabs>
<Tab label="Next.js">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { withI18next } from "@intlayer/next-i18next/plugin";

const nextConfig: NextConfig = {};

export default withI18next(nextConfig);
```

No App Router, componentes de cliente identificam o idioma pelo segmento `[locale]`. O `I18nextProvider` do adaptador não aceita locale como propriedade, logo substitua-o uma única vez no arquivo de provider:

```tsx fileName="components/AppProviders.tsx"
"use client";

import { IntlayerClientProvider } from "next-intlayer";
import type { LocalesValues } from "intlayer";

export const AppProviders = ({
  locale,
  children,
}: {
  locale: LocalesValues;
  children: React.ReactNode;
}) => (
  <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
);
```

Todos os componentes abaixo continuam invocando `useTranslation()`.

</Tab>
<Tab label="Vite / TanStack Start">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

O `reactI18nextVitePlugin()` encapsula o `vite-intlayer` e define os aliases para `react-i18next` e `i18next`. Para projetos sem React, `i18nextVitePlugin()` do `@intlayer/i18next/plugin` provê o alias somente para `i18next`.

</Tab>
</Tabs>

</Step>
</Steps>

### O que você pode remover em seguida

| Arquivo / padrão                                       | Motivo                                                                                       |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `resources: { en, fr, ... }` e importações JSON        | Ignorados pelo adaptador. Era aqui que se concentravam os 68 KB                              |
| `i18next-http-backend`, `i18next-resources-to-backend` | Não há nada a carregar dinamicamente                                                         |
| `i18next-browser-languagedetector`                     | A identificação é controlada pelo roteamento do Intlayer (prefixo de URL, cookie, cabeçalho) |
| `serverSideTranslations()` em `getStaticProps`         | Devolve um objeto vazio; inofensivo, mas inútil                                              |
| `next-i18next.config.js`                               | Não é consultado. Idiomas residem no `intlayer.config.ts`                                    |
| Listas de `ns: [...]` por página                       | O compilador detecta os namespaces por componente                                            |

### O que você ganha além da redução em bytes

- **Tipagem estrita de chaves.** `useTranslation("about")` valida chaves contra o dicionário `about` compilado; `t("does.not.exist")` gera um erro do compilador TypeScript em vez de retornar a string crua.
- **`npx intlayer test`** bloqueia a integração contínua (CI) se faltar qualquer tradução em qualquer idioma. **`npx intlayer fill`** traduz pendências com sua própria chave de provedor (OpenAI, Anthropic, Mistral, Gemini...) e as salva em `locales/{lng}/{ns}.json`.
- **Editor Visual e CMS** atuam diretamente no mesmo JSON, permitindo que editores atualizem textos por interface gráfica enquanto os arquivos Git são versionados.
- **Migração gradual para `.content.ts`.** Cada componente pode migrar de `useTranslation("about")` para `useIntlayer("about")` adotando um arquivo de conteúdo co-localizado. Dicionários JSON e `.content.ts` operam juntos harmonicamente.

## Limitações importantes antes de iniciar

<AccordionGroup>
<Accordion header="Backends e detectores são inertes">

`i18n.use(HttpBackend)` chama o init do plugin e nada mais. Se o seu aplicativo dependia de buscar traduções de um CMS em tempo de execução, esse fluxo desaparece; use o [CMS do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) ou os comandos `intlayer pull` / `push`. A detecção de idioma passa a ser a configuração de roteamento do Intlayer (prefixo de URL, cookie, cabeçalho).

</Accordion>
<Accordion header="resources é ignorado, não mesclado">

Ao contrário de outros adaptadores, o `@intlayer/i18next` não usa `resources` em linha como fallback. Cada chave deve existir nos dicionários sincronizados, o que o `intlayer test` verifica.

</Accordion>
<Accordion header="O App Router requer edição do provider">

Apenas um arquivo, mostrado acima. O Pages Router com `appWithTranslation` não requer nada.

</Accordion>
<Accordion header="next-i18next.config.js não é lido">

`localePath`, `fallbackLng`, `reloadOnPrerender` e semelhantes não têm equivalente; idiomas e fallback vêm de `intlayer.config.ts`.

</Accordion>
<Accordion header="O adaptador não é gratuito">

9.4 KB de runtime e +9.4 KB por página em relação ao `next-intlayer`. Assim que cada componente migrar para o `useIntlayer`, remova-o.

</Accordion>
</AccordionGroup>

## Quando utilizar cada alternativa?

<AccordionGroup>
<Accordion header="Permanecer no i18next">

Seu aplicativo depende de backends em tempo de execução (traduções servidas por um CMS no momento da requisição), do ecossistema de plugins ou de um destino não-React não coberto pelos adaptadores.

</Accordion>
<Accordion header="Usar @intlayer/*">

Você está no `react-i18next` / `next-i18next` e quer os 68 KB economizados, componentes 8 vezes menores, 0% de vazamento, chaves tipadas e verificações no CI sem reescrever o código. Este é o ponto de entrada para uma base de código `i18next` existente.

</Accordion>
<Accordion header="Tornar-se nativo (next-intlayer / react-intlayer)">

Para novos projetos, ou assim que o adaptador cumprir seu papel. Possui o runtime mais leve (5.5 KB, +0.3 KB por página) e desbloqueia Server Components síncronos e arquivos `.content.ts` por componente. Comece com [Intlayer com Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md) ou [com Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="De onde vêm os 68 KB?">

De `resources: { en, fr, ... }`. A configuração padrão do `next-i18next` importa o JSON de cada idioma no `init()`, portanto, cada página carrega cada namespace em cada idioma: **218.5 KB** por página. O adaptador nunca empacota esse bloco; ele entrega a cada componente apenas o dicionário nomeado, no idioma ativo.

</Question>

<Question title="Meus componentes <Trans> continuam funcionando?">

Sim, com `components`, tags numeradas `<1>...</1>` e `values`. O mesmo vale para `{{interpolation}}`, aninhamento `$t(key)`, plurais `key_one` / `key_other` (avaliados com `Intl.PluralRules`), sufixos de contexto e `returnObjects`.

</Question>

<Question title="E se eu usar um único translation.json por idioma?">

Defina `splitKeys: false` no plugin `syncJSON`. Todo o arquivo permanece como um único dicionário e um `useTranslation()` simples continuará resolvendo contra ele.

</Question>

<Question title="Isso é o mesmo que migrar para o Intlayer?">

Não, é a ponte. O adaptador mantém a API do `i18next` e custa 9.4 KB de runtime; o `next-intlayer` nativo custa 5.5 KB e adiciona Server Components síncronos e arquivos `.content.ts` co-localizados. Você pode migrar componente por componente, já que os dicionários JSON e `.content.ts` coexistem.

</Question>

<Question title="Os tradutores podem continuar trabalhando como fazem hoje?">

Sim. `locales/{lng}/{ns}.json` permanece a fonte da verdade: o `syncJSON` o lê com o dialeto do i18next e grava as traduções de volta quando a CLI ou o CMS os atualiza.

</Question>

</FAQ>

## Comparações relacionadas

Mesma série de adaptadores:

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-intl_vs_intlayer-next-intl.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/lingui_vs_intlayer-lingui.md)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/vue-i18n_vs_intlayer-vue-i18n.md)

Bibliotecas comparadas diretamente:

- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18next_vs_intlayer.md), same benchmark
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/react-i18next_vs_react-intl_vs_intlayer.md)
- [Is i18next outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/is_i18next_outdated.md)

Documentação de referência:

- Compat adapters: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/i18next.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/next-i18next.md)
- Migration guides: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_next-i18next_to_intlayer.md)
- [Next.js benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md) and [TanStack Start benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md)
- [Bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) and [the Intlayer compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md)
- [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) and [AI translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/autoFill.md)

## Conclusão

O `i18next` figura como o runtime mais pesado deste benchmark, e os adaptadores cortam a maior parte dessa carga sem exigir que você abandone sua API habitual. Na mesma aplicação Next.js, isso representa **68 KB a menos por página** comparado à configuração inicial, **12.7 KB a menos** em relação à opção mais otimizada manualmente, **componentes 8x mais leves**, **0% de vazamento** e **4 ms a menos de hidratação**, demandando apenas um arquivo de configuração, uma inclusão de plugin e um ajuste no provider. Backends e detectores tornam-se inócuos, `resources` é descartado ao invés de incorporado, e a implementação nativa do `next-intlayer` preserva outros 9 KB de leveza adicional.

A totalidade dos dados brutos, aplicações de teste e scripts encontra-se publicada no [repositório do Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom).

Consulte o documento [Por que Intlayer?](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md) para aprofundar.
