---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Vite i18n: imports glob, chunks e mensagens em tempo de compilação"
description: O que realmente é específico do Vite no i18n. Catálogos lazy com import.meta.glob, por que a divisão por rota raramente divide, lacunas de HMR e plugins no build.
keywords:
  - vite i18n
  - import.meta.glob
  - vite code splitting
  - lazy load traduções
  - vite plugin i18n
  - rollup chunks
slugs:
  - blog
  - i18n-technologies
  - build-tools
  - vite
author: aymericzip
---

# Vite i18n: os aspectos próprios do Vite, não do seu framework

A maioria dos tutoriais de "Vite i18n" são, na verdade, tutoriais de React ou Vue que por acaso utilizam o Vite. Este artigo aborda a camada inferior: como os catálogos são importados, o que o Rollup faz com eles e por que o carregamento assíncrono (lazy loading) que você implementou provavelmente não é tão lazy quanto você imagina.

## Sumário

<TOC/>

## A importação estática é o padrão, e ela é síncrona

A configuração mais comum importa cada catálogo no topo de um módulo:

```ts fileName="src/i18n.ts"
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ja from "./locales/ja.json";
```

Isso inclui três catálogos diretamente no chunk de entrada principal, em todas as páginas, para todos os visitantes. É aceitável para dois idiomas e algumas dezenas de textos. A partir de dez idiomas, torna-se o maior custo evitável em todo o bundle.

## `import.meta.glob` e a opção que quase todo mundo configura errado

A importação por padrão (glob import) do Vite é a solução usual:

```ts
const catalogs = import.meta.glob("./locales/*.json");

export const loadCatalog = async (locale: string) => {
  const load = catalogs[`./locales/${locale}.json`];
  return (await load()) as Record<string, string>;
};
```

O carregamento assíncrono é o padrão: cada entrada é uma função que retorna uma importação dinâmica, e o Rollup gera um chunk separado por arquivo. Adicionar `{ eager: true }` embute todos os arquivos diretamente no módulo que importa, anulando exatamente a separação desejada:

```ts
// Todos os idiomas no chunk de entrada. Quase nunca o que você deseja:
const catalogs = import.meta.glob("./locales/*.json", { eager: true });
```

A armadilha é que ambas as abordagens funcionam em desenvolvimento, pois o Vite serve módulos de forma avulsa sem empacotamento. A diferença só aparece no diretório `dist`. Faça o teste com `npx vite build && npx vite preview` e inspecione o que o chunk principal realmente carrega.

## A divisão por rota raramente divide os catálogos

Este é o comportamento que mais surpreende os desenvolvedores. Você organiza seus catálogos por tela:

```
locales/en/home.json
locales/en/checkout.json
```

Em seguida, duas rotas diferentes importam `checkout.json`, e o Rollup eleva esse arquivo a um chunk compartilhado que é carregado em ambas as páginas. A divisão de chunks do Rollup é orientada pelo grafo de módulos e não pelos nomes das pastas: qualquer módulo acessível a partir de mais de um ponto de entrada torna-se compartilhado. Adicionar uma terceira rota não muda nada, e uma quarta pode reorganizar a separação de forma imprevista.

Portanto, a divisão de idiomas por rota só se sustenta se o grafo de importação for estritamente disjunto. Se o tamanho do bundle for prioritário, meça com ferramentas em vez de fazer suposições:

```bash
npx vite build && npx vite-bundle-visualizer
```

Caso precise forçar os limites dos chunks, `build.rollupOptions.output.manualChunks` é a saída, ao custo de manutenção manual contínua.

## Catálogos não recarregam com Hot Reload (HMR)

Altere um componente e o Vite o atualiza instantaneamente. Altere `locales/fr.json` e, dependendo de como foi importado, nada acontece. O JSON importado dinamicamente não possui um limite de HMR nativo, de modo que o grafo de módulos não sabe como invalidar os consumidores.

Muitos desenvolvedores contornam isso reiniciando o servidor de dev a cada alteração de texto, sem perceber que isso pode ser evitado. A solução compete ao plugin de i18n: ele precisa escutar a atualização de HMR e injetar as novas mensagens no app em execução. Ao avaliar uma biblioteca, verifique se o respectivo plugin do Vite contempla essa funcionalidade.

## `define` fixa o idioma no código compilado

É tentador definir o idioma padrão em tempo de build:

```ts fileName="vite.config.ts"
export default defineConfig({
  define: {
    __DEFAULT_LOCALE__: JSON.stringify(process.env.LOCALE ?? "en"),
  },
});
```

`define` executa uma substituição de texto literal durante a compilação. O valor injetado no build é o valor final entregue, forçando um build separado para cada idioma. Essa é uma estratégia válida, adotada por exemplo pela solução nativa de i18n do Angular, mas não é o que você quer se um único deploy precisa atender a todos os idiomas.

Para valores que variam por requisição, mantenha-os fora do `define` e resolva-os em tempo de execução.

## Movendo o parsing de mensagens para o tempo de compilação

Qualquer solução madura neste ecossistema adota a mesma diretriz: parar de processar mensagens no navegador.

| Plugin                       | O que move para o tempo de compilação                                  |
| :--------------------------- | :--------------------------------------------------------------------- |
| `@intlify/unplugin-vue-i18n` | Compila mensagens do vue-i18n em funções de render (bundle só runtime) |
| Lingui (macro + plugin)      | Extrai e compila catálogos, substitui macros por IDs de mensagem       |
| Paraglide (inlang)           | Compila cada mensagem em sua própria função tree-shakable              |
| `vite-intlayer`              | Constrói dicionários por componente, purga e minifica campos sem uso   |

O ganho é duplo: o compilador de mensagens em runtime deixa de ser enviado no bundle e as entradas não utilizadas podem ser eliminadas estaticamente. O custo correspondente é que tanto seu servidor local quanto a CI precisam executar o plugin, e comandos isolados como `tsc` ou executores de teste sem Vite exigirão ajustes de configuração.

O vue-i18n é o exemplo mais nítido: sem o `@intlify/unplugin-vue-i18n`, você envia um compilador que chama `new Function`, gastando bytes à toa e abrindo brechas contra políticas de Content Security Policy (CSP).

## SSR: nunca armazene o idioma no escopo de um módulo

Se você utiliza SSR, seja por um framework ou via `vite-plugin-ssr`, a regra indispensável é esta: uma variável no nível do módulo guardando o idioma atual é compartilhada entre todas as requisições concorrentes daquele processo do servidor.

```ts
// Seguro no navegador. Um vazamento grave entre requisições no servidor:
export let currentLocale = "en";
```

Dois usuários acessando o servidor ao mesmo tempo disputarão uma condição de corrida, e um deles receberá o idioma do outro. Isso não se manifesta em desenvolvimento porque você é o único usuário. Resolva o idioma por requisição e repasse-o explicitamente por contexto ou pelo armazenamento de requisição do seu framework.

## O plugin Vite do Intlayer

O Intlayer disponibiliza um único plugin que gerencia o build de dicionários, a observação de alterações em desenvolvimento e a esteira de otimização:

```ts fileName="vite.config.ts"
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

A reescrita de importações, o purge e a minificação vêm ativados por padrão. Os dois parâmetros essenciais ficam no arquivo `intlayer.config.ts`:

```ts fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // descarta campos de conteúdo que nenhum componente utiliza
    minify: true, // renomeia as chaves de conteúdo para apelidos curtos
  },
};

export default config;
```

Como o conteúdo é declarado por componente em vez de concentrado em arquivos globais gigantes, o processo de purge atua sobre um grafo de dependências real, garantindo uma limpeza segura. O compromisso é o mencionado: o plugin passa a ser obrigatório em qualquer ambiente de compilação, incluindo CI e suítes de teste. Mais detalhes em [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md).

## Erros comuns

- **`{ eager: true }` em um glob que deveria ser assíncrono.** Funciona localmente, embute todos os idiomas em produção.
- **Achar que a hierarquia de pastas define os chunks.** O Rollup respeita imports, não diretórios. Avalie o bundle real.
- **Reiniciar o servidor de dev para ver uma tradução atualizada.** Sinal de ausência de handler de HMR.
- **Colocar o idioma em `define`.** Obriga a gerar um build independente por idioma.
- **Armazenar idioma no módulo com SSR.** Causa vazamento de dados entre usuários concorrentes.
- **Testar métricas de performance no servidor de dev.** Módulos avulsos não refletem o comportamento do bundle final.

## Para se aprofundar

- [Otimização de bundle: purge, minificação e o que chega ao navegador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md)
- [Relatórios de benchmark entre frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md)
- [Referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)
- [Configurar Intlayer com Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md)
- [Adaptador de compatibilidade i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/i18next.md)
- [React i18n: como funciona o modelo de provedores](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/list_i18n_technologies/frameworks/react.md)
- [Vue i18n: funcionamento e limitações](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/list_i18n_technologies/frameworks/vue.md)
- [i18n por componente vs centralizada](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/per-component_vs_centralized_i18n.md)
