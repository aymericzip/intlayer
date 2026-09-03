---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Automatizando traduções em CI/CD sem entregar textos ruins"
description: Três locais para automatizar i18n, pre-push, pull request e runtime. Como barrar um build por cobertura, preencher com segurança e evitar o loop de commits no CI.
keywords:
  - automatizar traduções ci
  - i18n ci cd
  - github actions traduções
  - husky pre-push
  - localização contínua
  - pipeline de tradução
slugs:
  - blog
  - i18n-in-ci-cd-pipelines
author: aymericzip
---

# Automatizando traduções em CI/CD sem entregar textos ruins

A tradução manual não resiste ao ritmo acelerado de lançamentos. Alguém adiciona uma string na sexta-feira, a exportação só ocorre no próximo sprint, e três outros idiomas já estão defasados. Automatizar o fluxo é simples. Automatizar sem publicar silenciosamente conteúdo gerado por máquina para seus usuários é a parte que realmente exige atenção.

## Sumário

<TOC/>

## Você não precisa migrar para automatizar

Os formatos de pipeline descritos abaixo são independentes de biblioteca, assim como as ferramentas. Se suas mensagens residem em catálogos JSON para i18next, next-intl, react-intl, vue-i18n ou next-translate, o [plugin Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) lê e escreve esses arquivos diretamente no local:

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

Sua aplicação continua importando o que sempre importou. Os jobs de CI então preenchem e protegem seus catálogos existentes, e o diff exibido ao revisor é uma simples alteração em `locales/fr/checkout.json`, e não uma migração estrutural. Há também o [plugin Sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md) para fluxos gettext e [adaptadores de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) para manter sua API em tempo de execução inalterada.

## Separe o bloqueio (gate) do preenchimento (fill)

Duas tarefas distintas são constantemente confundidas.

Um **gate** é uma verificação que falha. Ele determina que esta compilação não deve ser lançada porque idiomas obrigatórios estão ausentes. Ele não escreve nenhum arquivo.

Um **fill** é uma mutação. Ele gera as traduções ausentes e realiza o commit delas. Ele nunca quebra um build.

Executar apenas o fill significa que nada é bloqueado e textos gerados por máquina chegam à produção sem revisão. Executar apenas o gate faz com que o build fique vermelho e um humano precise intervir a cada push. A maioria das equipes precisa de ambos acionados em momentos distintos: fill em pull requests, gate ao realizar o merge na branch de lançamento.

## Onde a automação pode residir

| Etapa          | Gatilho   | Indicado para                          | Custo                                            |
| :------------- | :-------- | :------------------------------------- | :----------------------------------------------- |
| Hook pre-push  | Git local | Feedback rápido, zero minutos de CI    | Roda na máquina do dev com sua própria chave API |
| Pull request   | Job de CI | Revisão pré-merge, segredos protegidos | Minutos de CI mais chamadas de modelo por PR     |
| Branch release | Job de CI | Bloqueio estrito de cobertura          | Econômico, sem chamadas a modelos                |
| Runtime        | CMS       | Mudanças de texto sem recompilar       | Dependência de serviço hospedado                 |

## Pre-push: o ciclo mais ágil

O Husky executa o preenchimento antes do código sair da máquina local, fazendo com que as traduções cheguem no mesmo push em que as novas strings foram adicionadas.

```bash fileName=".husky/pre-push"
npx intlayer build
npx intlayer fill --unpushed --mode complete
```

`--unpushed` restringe a execução ao conteúdo que ainda não foi enviado ao repositório remoto, evitando lentidão a cada push. `--mode complete` preenche apenas o que está faltando sem reescrever entradas que já possuem valor, assegurando que uma tradução revisada nunca seja sobrescrita.

Em um monorepo, delimite o escopo de cada aplicação:

```bash fileName=".husky/pre-push"
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

A desvantagem é evidente: cada desenvolvedor precisa de uma chave de API, e o custo recai sobre quem faz o push. Por isso, a maioria dos times migra essa etapa para o CI à medida que a equipe cresce.

## Pull request: preencher onde a revisão acontece

O mesmo fluxo no GitHub Actions, delimitado pelo diff:

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  pull_request:
    branches: ["main"]

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      AI_PROVIDER: openai
      AI_MODEL: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npx intlayer build
      - run: npx intlayer fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
      - name: Commit
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .
            git commit -m "chore: auto-fill missing translations [skip ci]"
            git push origin HEAD:${{ github.head_ref }}
          fi
```

Quatro detalhes são cruciais aqui:

- **`fetch-depth: 0`** é indispensável para o funcionamento de `--git-diff`. Um clone raso não possui base de comparação e nada é preenchido silenciosamente.
- **`[skip ci]` na mensagem de commit** impede que o workflow entre em loop infinito. Sem isso, o job commita, aciona uma nova execução, que commita novamente, esgotando o limite de CI durante a noite.
- **`concurrency` com `cancel-in-progress`** impede que pushes simultâneos tentem alterar os mesmos arquivos ao mesmo tempo.
- **`--git-diff`** restringe o preenchimento às alterações do PR. Se for omitido, todo o catálogo será retraduzido em cada execução.

As traduções chegam como um commit na branch do PR, permitindo que o revisor inspecione o diff. Essa é a grande vantagem em relação a rodar o preenchimento após o merge.

## Branch de release: o gate de validação

O gate não requer acesso a modelos de IA e deve ser rápido.

```yaml fileName=".github/workflows/ci.yml"
- run: npm run test:i18n
```

Apoiado por um teste com asserções explícitas de cobertura em vez de simples relatórios no terminal:

```ts fileName="i18n.test.ts"
import { listMissingTranslations } from "intlayer/cli";

test("não possui locales obrigatórios ausentes", async () => {
  const result = await listMissingTranslations();
  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }
  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

`npx intlayer content test` imprime um relatório mas sai com código zero, portanto apenas informa sem interromper a esteira. Use-o localmente; use a asserção no CI. Mais detalhes em [detectar traduções ausentes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/detecting_missing_translations.md).

## `requiredLocales` torna o gate sustentável

Um gate que exija todas as dezoito línguas completas trava qualquer entrega até que o idioma mais lento fique pronto, acabando por ser desativado em menos de um mês.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Declare as línguas atendidas e defina como obrigatórias apenas as que realmente devem bloquear um deploy. O restante é completado de modo assíncrono sem reter os lançamentos.

## Gerenciando traduções fora do repositório

A outra abordagem consiste em manter um idioma base no código e administrar os demais remotamente via CMS com Live Sync. As alterações de texto não exigem novo build, separando o ciclo de edição do ritmo de deploys de código.

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
};

export default config;
```

Essa solução é ideal para equipes onde profissionais não técnicos cuidam dos textos. Trata-se de uma troca: ganha-se autonomia editorial mas perde-se a propriedade de que um checkout do git reflete fielmente o que o app renderiza. Detalhes na [documentação do CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

Lembre-se de que `clientSecret` é uma credencial do servidor. Deve permanecer nos segredos do CI e nas variáveis de ambiente do backend, nunca exposta em bundles de cliente.

## A limitação real

Tudo o que foi exposto automatiza a _cobertura_, não a _qualidade_. Um preenchimento automático transforma uma ausência explícita em um texto presente sem revisão: o teste passa porque a chave tem valor, mas ninguém o leu.

Isso é admissível em ferramentas internas, changelogs ou idiomas em fase beta. Não é tolerável em páginas de preços, termos legais ou avisos de falha no pagamento. Encaminhe essas áreas para revisão humana e utilize `--mode complete` para nunca sobrescrever strings já revisadas.

Forneça contexto ao modelo para que o resultado mantenha a coerência:

```ts
ai: {
  applicationContext: "App de faturamento B2B. Tom formal. Nunca traduzir o nome do produto.",
}
```

## Erros comuns

- **Esquecer `[skip ci]` no auto-commit.** O job se reexecuta em loop indefinidamente.
- **Clone raso com `--git-diff`.** Sem base de diff, nada é preenchido e nenhum erro é emitido.
- **Preencher todo o catálogo a cada execução.** Limite com `--git-diff` ou `--unpushed` para controlar a conta.
- **Usar o relatório da CLI como gate.** Ele encerra sempre com código 0.
- **Tornar todas as línguas obrigatórias.** O gate é desativado no primeiro deploy bloqueado.
- **Um job de fill sem gate em lugar nenhum.** Nada falha e textos crus de IA vão direto para a produção.
- **Chaves de API de modelos no repositório.** Devem ficar nos segredos do CI, assim como o `clientSecret`.

## Para se aprofundar

- [CI/CD: autogeração de traduções com Husky, GitHub Actions e o CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/CI_CD.md)
- [Testando seu conteúdo e bloqueando builds por cobertura](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/testing.md)
- [autoFill: geração de arquivos de declaração por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/autoFill.md)
- [Referência de configuração: `locales`, `requiredLocales`, `editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)
- [Relatórios de benchmark entre frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md)
- [Adaptador de compatibilidade i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/i18next.md)
- [Como detectar traduções ausentes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/detecting_missing_translations.md)
- [Como testar traduções sem testes frágeis](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_testing_strategies.md)
