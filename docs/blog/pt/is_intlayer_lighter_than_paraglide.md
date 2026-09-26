---
createdAt: 2026-09-23
updatedAt: 2026-09-23
priority: 8
title: O Intlayer é mais leve que o Paraglide?
description: O Paraglide parece quase gratuito nos benchmarks de i18n porque seu código é gerado diretamente no seu repositório. Veja para onde esse peso realmente vai, por que a resolução de locale por nó consome recursos e como o carregamento dinâmico do Intlayer envia apenas um idioma em vez de todos.
keywords:
  - Paraglide
  - Intlayer
  - Internacionalização
  - i18n
  - Bundle size
  - Tree shaking
  - Benchmark
  - Blog
slugs:
  - blog
  - is-intlayer-lighter-than-paraglide
author: aymericzip
---

# O Intlayer é mais leve que o Paraglide?

Sim.

O `Paraglide` tem uma boa reputação por ser a solução de i18n mais leve disponível, e à primeira vista o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md) concorda: o tamanho de sua biblioteca é próximo de zero. Mas um tamanho de biblioteca de zero não significa zero bytes enviados. Significa apenas que os bytes residem onde a métrica não olha.

<TOC/>

## Principais conclusões

**O tamanho da biblioteca está oculto, não eliminado:**

O Paraglide gera sua runtime e funções de mensagens diretamente na sua codebase. Esse código é enviado ao navegador, mas é contabilizado como _seu_ código, não como o da biblioteca.

**Não ter provider não é um ganho gratuito:**

Cada chamada a `m.my_key()` resolve o locale por conta própria, lendo o cookie ou o storage para cada nó renderizado, em vez de ler uma única vez a partir de um contexto.

**Sem carregamento dinâmico:**

O Paraglide importa todos os idiomas de uma mensagem no bundle do seu cliente. O Intlayer com `importMode: 'dynamic'` ou `'fetch'` carrega apenas o idioma que está sendo renderizado.

**O tree shaking não é garantido:**

Em alguns de nossos benchmarks, o tree shaking divulgado pelo Paraglide não teve efeito. Verifique o seu próprio bundle.

## Para onde vai o peso do Paraglide?

Nos relatórios de benchmark, a métrica "tamanho da biblioteca" mede o provider e os hooks de cada biblioteca de i18n em um componente vazio, antes de qualquer conteúdo ser adicionado.

| Biblioteca (TanStack Start)   | Tam lib (gz) | Tam lib (min) |
| ----------------------------- | ------------ | ------------- |
| `@inlang/paraglide-js@2.15.1` | 1.8 KB       | 4.5 KB        |
| `react-intlayer@9.5.1`        | 5.0 KB       | 15.2 KB       |

Analisado isoladamente, o Paraglide vence. Mas o Paraglide é um compilador: ele lê seus arquivos `messages/*.json` e escreve uma pasta `paraglide/` no seu repositório, contendo um arquivo `runtime.js` (detecção de locale, estratégias de cookies e storage, localização de URLs) e uma função JavaScript por mensagem.

```bash
src/paraglide/
├── runtime.js      # detecção de locale, estratégias, helpers de URL
├── server.js
├── messages.js     # reexporta todas as mensagens
└── messages/
    ├── _index.js
    ├── en.js
    └── fr.js
```

Como esse código fica na sua pasta `src/` e você o importa através de um caminho relativo, o bundler o atribui à sua aplicação, e não a um pacote em `node_modules`. A coluna de tamanho da biblioteca exibe quase nada, enquanto a mesma lógica continua sendo enviada no bundle da sua página.

Gerar código não é uma má ideia em si: a runtime gerada inclui apenas a lógica que sua configuração precisa (estratégia de prefixo, cookie vs. local storage, etc.). O Intlayer alcança o mesmo resultado de maneira diferente, injetando variáveis de ambiente em tempo de build para que o bundler descarte as ramificações que sua configuração não utiliza. Ambas as abordagens acabam sendo de 3 a 10 vezes mais leves do que `i18next` ou `next-intl`.

Portanto, a comparação justa não é o tamanho da biblioteca. É **o JavaScript realmente enviado por página**.

## Peso por página, medido

Aplicação TanStack Start, 10 páginas, medido nas rotas `en` e `fr`, comprimido com gzip:

| Configuração                       | JS pág médio (gz) | Acima da base | Vazamento locale | Vazamento outras págs |
| ---------------------------------- | ----------------- | ------------- | ---------------- | --------------------- |
| Base (sem i18n)                    | 111.0 KB          | -             | 0.0%             | 0.0%                  |
| `paraglide` (qualquer estratégia)  | 125.1 KB          | +14.1 KB      | 49.7%            | 0.0%                  |
| `intlayer` (`importMode: static`)  | 125.8 KB          | +14.8 KB      | 50.0%            | 0.0%                  |
| `intlayer` (`importMode: dynamic`) | **118.6 KB**      | **+7.6 KB**   | **0.0%**         | **0.0%**              |

Next.js 16 App Router, mesma aplicação:

| Configuração     | JS pág médio (gz) | Acima da base |
| ---------------- | ----------------- | ------------- |
| Base (sem i18n)  | 141.0 KB          | -             |
| `paraglide-next` | 155.3 KB          | +14.3 KB      |
| `next-intlayer`  | **141.3 KB**      | **+0.3 KB**   |

<I18nBenchmark framework="tanstack" vertical/>

> Dados completos no [relatório de benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md) e no [relatório de benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md). Cada bundle pode ser inspecionado no [repositório do benchmark](https://github.com/intlayer-org/benchmark-i18n).

Dois pontos se destacam:

- No modo `static`, o Intlayer envia praticamente o mesmo conteúdo que o Paraglide (125.8 KB vs. 125.1 KB). Isso é esperado: ambos incluem todos os idiomas das mensagens que uma página utiliza.
- O Paraglide permanece em 125.1 KB independentemente da estratégia, pois não possui um modo dinâmico. Cada linha na tabela acima corresponde à opção estática.

## Sem Provider: uma ideia que parece boa, mas não é

O Paraglide não requer provider. Você importa uma mensagem e a executa:

```tsx fileName="Hero.tsx"
import { m } from "../paraglide/messages.js";

export const Hero = () => (
  <section>
    <h1>{m.hero_title()}</h1>
    <p>{m.hero_description()}</p>
    <button>{m.hero_cta()}</button>
  </section>
);
```

Sem contexto, sem wrapper, sem hook. Parece mais simples. Porém, o locale ainda precisa vir de algum lugar. Cada função de mensagem gerada se parece com isto (simplificado):

```js fileName="paraglide/messages/_index.js"
export const hero_title = (inputs = {}, options = {}) => {
  const locale = options.locale ?? getLocale(); // resolvido a cada chamada

  if (locale === "en") return en.hero_title(inputs);
  if (locale === "fr") return fr.hero_title(inputs);
  // ...uma ramificação por locale
};
```

E `getLocale()` percorre as estratégias configuradas (cookie, local storage, URL, locale padrão) para identificar o locale atual. Assim, cada nó de texto renderizado (`<>{m.my_key()}</>`) executa sua própria resolução de locale, incluindo ler `document.cookie` no navegador. Uma página com 200 strings traduzidas resolve o locale 200 vezes por renderização, e novamente a cada nova renderização.

Uma biblioteca baseada em provider lê o locale **uma única vez**, o armazena em um contexto (ou sinal, ou store), e cada nó lê um valor já residente na memória. O provider custa algumas centenas de bytes. Deixar de usá-lo consome ciclos de CPU a cada renderização, o que se reflete no benchmark: os tempos de carregamento de página e troca de idioma do Paraglide ficam sistematicamente atrás dos do Intlayer no TanStack Start (22.1 ms vs. 14.6 ms no carregamento de página, 4.3 ms vs. 3.2 ms na reatividade E2E).

## Experiência do Desenvolvedor (DX)

A fonte da verdade do Paraglide é o JSON, mas você nunca importa o JSON diretamente. Você importa o arquivo `.js` gerado:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "hero_title": "Ship your app in every language"
}
```

```json fileName="messages/pt.json"
{
  "hero_title": "Publique seu app em todos os idiomas"
}
```

```tsx fileName="Hero.tsx"
// Existe apenas após o compilador regenerá-lo a partir do JSON
import { m } from "../paraglide/messages.js";

export const Hero = () => <h1>{m.hero_title()}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      pt: "Publique seu app em todos os idiomas",
      en: "Ship your app in every language",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

Esse fluxo de desenvolvimento tem um custo:

- Cada alteração em um arquivo JSON exige regeneração antes que a importação resolva ou os tipos sejam atualizados.
- A pasta gerada `paraglide/` deve ser commitada (gerando conflitos de merge em arquivos gerados em cada PR que altere textos) ou ignorada (exigindo uma etapa de geração prévia a cada verificação de tipos, testes e job de CI).
- Cada string vira uma chamada de função. Constantes tornam-se `m.key()` em todos os lugares, inclusive onde um valor estático bastaria.

## Tree Shaking: verifique seu bundle

A promessa central do Paraglide é que mensagens não utilizadas sofrem tree shaking, já que cada mensagem é seu próprio export. No benchmark com Svelte + Vite, isso funciona conforme divulgado.

Em outros cenários, não funcionou. Em nossos testes no [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md), as páginas do Paraglide pesam 14 KB a mais do que a aplicação base, enquanto o `next-intlayer` adiciona apenas 0.3 KB. Execuções anteriores no TanStack Start também mostraram mensagens de outras páginas indo parar no bundle da rota.

O tree shaking depende do seu bundler (Turbopack, Rolldown, Rollup), de como as mensagens são importadas (`import { m }` vs. `import * as m`) e da análise de side effects. Se você optar pelo Paraglide pelo seu tamanho, abra seu visualizador de bundle e comprove se isso se mantém na sua aplicação.

## Sem carregamento dinâmico

Este é o limite estrutural. O Paraglide não possui uma forma de carregar um idioma por vez: cada função de mensagem importa estaticamente a implementação de cada idioma, portanto todos os idiomas acabam no bundle do seu cliente.

Com 2 idiomas, metade da sua carga de traduções é desperdiçada, o que equivale aos ~50% de vazamento de locale medidos acima. Com 10 idiomas, 90%. Com 30 idiomas, 97%.

Mudar para o carregamento dinâmico também não resolveria: com uma função por mensagem, carregar cada uma sob demanda resultaria em milhares de requisições.

O Intlayer permite que você escolha, globalmente ou por dicionário:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic", // 'static' | 'dynamic' | 'fetch'
  },
};

export default config;
```

| `importMode` | O que é enviado ao cliente                                  | vs. Paraglide                   |
| ------------ | ----------------------------------------------------------- | ------------------------------- |
| `static`     | Todos os idiomas dos dicionários usados pela página         | Teoricamente o mesmo conteúdo   |
| `dynamic`    | Apenas o idioma atual, carregado sob demanda por dicionário | **N vezes menor** com N idiomas |
| `fetch`      | Apenas o idioma atual, buscado através da Live Sync API     | **N vezes menor** com N idiomas |

Com a [transformação no build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e `importMode: 'static'`, o Intlayer carrega, em teoria, exatamente o mesmo conteúdo que o Paraglide. Com `'dynamic'` ou `'fetch'`, ele carrega apenas o que o idioma atual necessita: para um app em N idiomas, a carga de tradução é N vezes menor do que a do Paraglide.

## Onde o Paraglide ainda se encaixa

<AccordionGroup>
<Accordion header="Svelte + Vite com poucos idiomas">

Se a sua stack é Svelte com Vite e você suporta dois ou três idiomas, o tree shaking funciona como anunciado e o overhead de idiomas permanece pequeno.

</Accordion>
<Accordion header="Fluxo de trabalho inlang existente">

Se sua equipe já utiliza o ecossistema inlang (Fink, Sherlock, plugins de formato de mensagens), o Paraglide se integra a ele nativamente.

</Accordion>
</AccordionGroup>

## Teste na sua aplicação

Avalie o payload e os vazamentos de locale da sua aplicação em produção com o [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner) gratuito:

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

Para instalar o Intlayer:

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

## Leituras complementares

- [Benchmark de i18n TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md)
- [Benchmark de i18n Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md)
- [Otimização de bundle e `importMode`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md)
- [Como escolher uma biblioteca de i18n para React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/how_to_pick_react_i18n_library.md)
- [Por que escolher internacionalização orientada a compilador](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/compiler_vs_declarative_i18n.md)
