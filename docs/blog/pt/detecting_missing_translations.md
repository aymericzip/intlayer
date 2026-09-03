---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Como detectar traduções ausentes antes dos seus usuários"
description: Traduções ausentes falham em silêncio. Por que o fallback as esconde, as quatro camadas de detecção que funcionam e como quebrar o build em chaves não traduzidas.
keywords:
  - encontrar traduções ausentes
  - chaves de tradução ausentes
  - auditoria i18n
  - strings não traduzidas
  - cobertura de tradução
  - lint i18n
slugs:
  - blog
  - detecting-missing-translations
author: aymericzip
---

# Como detectar traduções ausentes antes dos seus usuários

Uma tradução ausente quase nunca lança um erro explícito. Dependendo da sua configuração, ela exibe o texto em inglês para um usuário no Japão, ou imprime `checkout.summary.total` diretamente na tela em produção. Ambas as situações chegam ao ar, passam pela revisão de código sem alertas e acabam sendo descobertas por um cliente antes de você.

## Sumário

<TOC/>

## Isso se aplica independentemente da biblioteca que você usa

Nada do que está aqui é exclusivo de uma stack específica. As camadas de detecção funcionam da mesma forma no i18next, react-i18next, next-intl, react-intl, vue-i18n, next-translate ou Lingui, porque todas resolvem chaves da mesma forma e falham pelo mesmo motivo.

As ferramentas também são portáveis. Se suas mensagens estão hoje em catálogos JSON, o [plugin Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) aponta o Intlayer para esses arquivos, disponibilizando comandos de auditoria, preenchimento e teste sem exigir migração de conteúdo ou alteração de imports:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // ou "icu" para next-intl / react-intl
    }),
  ],
};

export default config;
```

Se desejar manter a API em tempo de execução inalterada, os [adaptadores de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) criam aliases para `useTranslation`, `$t` e funções correspondentes no nível do empacotador. Em qualquer caso, encare os comandos abaixo como uma implementação prática do conceito, não como uma obrigatoriedade.

## Por que elas são invisíveis

Toda biblioteca de i18n resolve chaves pela mesma cadeia: busca no locale ativo, recorre ao locale padrão por fallback e, se isso falhar, retorna a própria chave literal. Essa última etapa é onde mora o perigo. Não há erro, não há aviso em produção e nenhum teste falha, porque nada no pipeline considera uma chave ausente como um evento anormal.

O fallback piora o cenário em vez de ajudar. Uma página que renderiza silenciosamente em inglês parece perfeita para um desenvolvedor anglófono e para todos os testes automatizados. O bug só é perceptível para o usuário que não compreende o resultado.

Assim, a questão não é "como lidar com traduções ausentes em tempo de execução". É "como tornar impossível fazer o merge de uma tradução ausente".

## As quatro camadas onde você pode pegá-las

Cada camada detecta o que as outras deixam passar. Você vai querer usar mais de uma.

| Camada         | Detecta                                       | Deixa passar                                  |
| :------------- | :-------------------------------------------- | :-------------------------------------------- |
| Tipos          | Chaves que não existem de forma alguma        | Chave existente, mas sem tradução em `ja`     |
| Linter         | Strings literais nunca enviadas para tradução | Chaves ausentes em um catálogo                |
| Auditoria      | Cobertura de idiomas em cada chave declarada  | Textos que nunca foram marcados para tradução |
| Testes de tela | Chaves resolvidas mas renderizadas errado     | Tudo que não for coberto por um teste         |

A lacuna mais comum nas equipes está na terceira linha: elas sabem que suas chaves são válidas, mas nada confere se todos os dezoito idiomas possuem valor atribuído.

## Camada 1: torne a chave um tipo, não uma string solta

`t("checkout.summry.total")` é um erro de digitação que compila normalmente. Se as chaves forem strings puras, cada renomeação representa um risco em produção e cada exclusão deixa chaves órfãs.

Chaves tipadas transformam isso em erro de compilação. O `react-i18next` oferece suporte via declaration merging, o `next-intl` infere da estrutura de mensagens, o Lingui gera IDs do texto original e o Intlayer cria tipos estritos dos arquivos de declaração. Todos cumprem o papel; o que muda é a complexidade de configuração.

Essa camada é necessária, mas não suficiente. Os tipos descrevem a estrutura do catálogo padrão. Eles não garantem se o coreano possui valor preenchido para aquela chave.

## Camada 2: faça lint das strings que nunca viraram chaves

A tradução que você não encontra frequentemente é aquela que nunca foi externalizada. Um texto hardcoded em um componente é invisível para qualquer auditoria de catálogo, porque para as ferramentas essa string simplesmente não existe.

O plugin ESLint do Intlayer resolve isso com `no-raw-text`, acompanhado de `no-unused-content` para a situação inversa: conteúdo declarado que não é mais lido por nada.

```js fileName="eslint.config.mjs"
import intlayer from "@intlayer/eslint-plugin";

export default [
  intlayer.configs.recommended,
  {
    rules: {
      "@intlayer/no-raw-text": "error",
      "@intlayer/no-unused-content": "warn",
    },
  },
];
```

`no-unused-content` evita que catálogos cresçam descontroladamente. Chaves mortas não quebram o código, mas inflam desnecessariamente os custos com agências de tradução. Confira a lista completa na [documentação do plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md).

## Camada 3: auditar a cobertura de idiomas

Esta é a camada que responde à pergunta central. O Intlayer a fornece como um comando de CLI:

```bash packageManager="npm"
npx intlayer content test
```

Ele examina os idiomas configurados e os dicionários declarados, relatando quais chaves estão ausentes em quais idiomas e em qual arquivo.

Um detalhe indispensável antes de conectar em suas esteiras: **a CLI imprime um relatório mas finaliza com código zero.** Se você colocar isso na esteira esperando que quebre a compilação, terá um build verde com um bloco de texto que ninguém lerá. Para bloqueio real, utilize a API programática mostrada abaixo.

## Camada 4: asserções explícitas na suíte de testes

`listMissingTranslations()` retorna a mesma auditoria em formato de dados, ideal para construir um gate de build.

```ts fileName="i18n.test.ts"
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("não possui locales obrigatórios ausentes", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Três campos são retornados com distinções fundamentais:

- `missingTranslations`: detalhamento por chave sobre quais idiomas faltam e em qual arquivo. É isso que você exibe se o teste falhar.
- `missingLocales`: a união de idiomas faltantes em todas as chaves.
- `missingRequiredLocales`: restrito às `requiredLocales` da sua configuração, ou todos os idiomas caso não tenha definido o parâmetro.

## `requiredLocales` é o ajuste que torna o gate sustentável

Oferecer suporte a dezoito idiomas não significa que todos os dezoito precisem estar 100% prontos para você realizar um deploy. A maioria das equipes possui uma camada crítica que impede o lançamento e uma camada flexível que é completada gradualmente.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.JAPANESE,
      Locales.POLISH,
    ],
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Sem `requiredLocales`, todo idioma configurado é obrigatório e seu build permanecerá vermelho até que a última tradução seja entregue. É assim que as equipes acabam desligando a checagem por completo, o que é pior do que não tê-la.

## Encontrando as omissões já em produção

As camadas acima previnem novos problemas. Para uma aplicação já lançada, duas táticas funcionam muito bem.

**Pseudolocalização.** Utilize um idioma fictício no qual todas as strings sejam modificadas, por exemplo `[!!! Ĉĥéçķöũţ !!!]`. Qualquer elemento que continue em inglês normal está hardcoded. Isso revela em dez minutos o que uma auditoria de catálogo não consegue ver por projeto.

**Rastrear o próprio site.** Se você serve URLs localizadas, faça requisições a uma amostra de páginas por idioma e busque no HTML strings do idioma padrão. Uma página sob `/ja/` contendo "Add to cart" indica uma tradução ausente ou um fallback inesperado.

```bash
curl -s https://example.com/ja/checkout | grep -c "Add to cart"
```

## Preenchendo as lacunas

Após localizar os pontos faltantes, `intlayer fill` preenche as entradas vazias, e a opção `autoFill` pode gerar arquivos por idioma conforme o conteúdo é declarado. Veja [autoFill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/autoFill.md).

Sejamos claros: traduções preenchidas automaticamente transformam uma falta _visível_ em uma falta _invisível_. A chave agora possui valor, o teste fica verde, mas nenhum humano leu aquele texto. Use isso para desbloquear entregas e direcione os textos importantes para revisão humana. É um suporte inicial, não um resultado definitivo.

## Erros comuns

- **Tratar fallback como garantia de segurança.** É apenas uma saída de emergência para renderização, não uma proteção. Uma página silenciosamente em inglês é um bug que não emite alertas.
- **Confiar no relatório da CLI para barrar a CI.** `intlayer content test` sai com código zero. Use asserções em testes automatizados.
- **Exigir todos os idiomas como obrigatórios.** O controle é desativado na primeira vez que atrasar um lançamento.
- **Auditar catálogos mas ignorar a tela renderizada.** Textos hardcoded são invisíveis em catálogos por definição.
- **Testar somente o idioma padrão.** O único idioma que com certeza nunca estará ausente.
- **Concluir o fluxo apenas com IA.** Auditoria no verde com textos crus jamais revisados.

## Para se aprofundar

- [Testar seu conteúdo: auditoria CLI, API programática e asserções de UI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/testing.md)
- [Regras do plugin ESLint, incluindo `no-raw-text` e `no-unused-content`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md)
- [autoFill: geração de arquivos de declaração por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/autoFill.md)
- [Referência de configuração: `locales`, `requiredLocales`, `defaultLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)
- [Relatórios de benchmark entre frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md)
- [Adaptador de compatibilidade i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/i18next.md)
- [O que a internacionalização realmente engloba](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/what_is_internationalization.md)
- [i18n por componente vs centralizada](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/per-component_vs_centralized_i18n.md)
