---
createdAt: 2026-11-24
updatedAt: 2026-11-24
priority: 8
title: "ngx-translate vs Angular i18n vs Transloco vs Intlayer (2026)"
description: "ngx-translate, @angular/localize, Transloco ou Intlayer? Compare as bibliotecas i18n do Angular: troca de idioma em runtime, tipagem, lazy loading, plurais e SSR."
keywords:
  - ngx-translate
  - Transloco
  - angular i18n
  - "@angular/localize"
  - internacionalização angular
  - ngx-translate vs transloco
  - Intlayer
  - comparação de bibliotecas i18n
slugs:
  - blog
  - ngx-translate-vs-angular-i18n-vs-transloco-vs-intlayer
author: aymericzip
---

# ngx-translate vs Angular i18n vs Transloco vs Intlayer

O Angular é o único grande framework que traz o seu próprio i18n, e adota a abordagem oposta à das bibliotecas que a comunidade construiu em torno dele. O `@angular/localize` traduz em tempo de build e gera uma aplicação por idioma. O `ngx-translate` e o Transloco traduzem em runtime a partir de arquivos JSON. O Intlayer compila o conteúdo no build, mas mantém uma única aplicação que troca de idioma em runtime.

Este artigo compara as quatro no que decide a escolha na prática: como o idioma muda, onde o conteúdo vive, o que o compilador detecta e o que é carregado no navegador.

## Índice

<TOC/>

## A versão curta

- **`@angular/localize`** (Angular i18n): sem custo em runtime e ICU nativo, mas um build e um deploy por locale, e trocar de idioma recarrega a aplicação.
- **`ngx-translate`**: a opção runtime mais antiga e simples. Um arquivo JSON por locale carregado via HTTP, chaves sem tipagem, plurais por meio de plugin.
- **Transloco**: a opção runtime pensada para aplicações maiores. Os scopes carregam as traduções por funcionalidade, e um ecossistema de plugins cobre ICU, formatação por locale e extração de chaves.
- **Intlayer**: conteúdo declarado junto a cada componente, tipado no build, dividido por componente e por locale, com troca de idioma em runtime. Exige um builder esbuild personalizado.

> Para ver de onde vem cada biblioteca, leia a [história do i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/history_of_i18n.md).

- [história do i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/history_of_i18n.md)

## Build ou runtime: a decisão que divide o campo

O **`@angular/localize`** insere as traduções nos templates compilados. `ng build --localize` gera `dist/app/en`, `dist/app/fr` e assim por diante, cada um contendo apenas o seu idioma. Nada é baixado e nada é interpretado em runtime, o que o torna a opção mais rápida depois de carregado. O custo é operacional: N builds para testar, N pastas para publicar, uma regra no servidor ou na CDN para encaminhar `/fr/` ao build certo, e um carregamento completo da página quando o usuário troca de idioma. O `ng serve` também executa uma única locale por vez.

O **`ngx-translate` e o Transloco** mantêm um único build. Um serviço baixa `fr.json` quando a locale muda e cada pipe ou diretiva é renderizada de novo. A troca é instantânea, mas a primeira renderização espera a requisição HTTP, as chaves são strings simples, e com SSR o loader precisa funcionar também no servidor (URLs absolutas ou um loader de sistema de arquivos, mais `TransferState` para não baixar duas vezes).

O **Intlayer** também mantém um único build, mas o conteúdo é compilado dentro do bundle em vez de baixado como JSON bruto. `useIntlayer()` retorna um Signal, então uma troca de locale atualiza os componentes que o leem, sem recarregar.

Um detalhe do Angular é fácil de perder com bibliotecas runtime: `DatePipe`, `CurrencyPipe` e `DecimalPipe` leem `LOCALE_ID`, que é fixado no bootstrap. Trocar de idioma com o `ngx-translate` não muda o formato de datas e preços. O Transloco resolve isso com `@jsverse/transloco-locale`, o Intlayer com `useDate`, `useNumber` e `useCurrency`, que seguem a locale ativa. O `@angular/localize` não tem o problema, pois cada build tem o seu próprio `LOCALE_ID`. O [guia de formatação de datas, horas e números](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/date_time_number_formatting_locales.md) cobre o lado do `Intl`.

- [guia de formatação de datas, horas e números](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/date_time_number_formatting_locales.md)

## Comparação de funcionalidades

|                           | `@angular/localize`                                    | `ngx-translate`                                    | Transloco                                                | Intlayer                                                                        |
| :------------------------ | :----------------------------------------------------- | :------------------------------------------------- | :------------------------------------------------------- | :------------------------------------------------------------------------------ |
| **Tradução aplicada**     | No build, embutida                                     | Em runtime                                         | Em runtime                                               | Compilada no build, resolvida em runtime                                        |
| **Builds por release**    | Um por locale                                          | Um                                                 | Um                                                       | Um                                                                              |
| **Troca de idioma**       | Recarrega em outro build                               | Instantânea                                        | Instantânea                                              | Instantânea                                                                     |
| **Onde o conteúdo vive**  | Texto de origem nos templates, traduções em XLIFF/JSON | Um JSON por locale                                 | Um JSON por locale, mais um por scope                    | `.content.ts` (ou JSON) junto a cada componente, ou centralizado                |
| **Plurais / ICU**         | ✅ ICU nativo nos templates                            | ⚠️ Plugin (`ngx-translate-messageformat-compiler`) | ⚠️ Plugin (`@jsverse/transloco-messageformat`)           | ✅ `plural()` com regras CLDR, ⚠️ strings ICU parcial                           |
| **Chaves tipadas**        | Não se aplica, o texto de origem é a mensagem          | ❌ Não                                             | ❌ Não, o Keys Manager encontra chaves ausentes pela CLI | ✅ Geradas, uma chave errada quebra o `ng build`                                |
| **Traduções ausentes**    | Aviso no build, ou erro com `i18nMissingTranslation`   | Mostra a chave bruta em runtime                    | Idioma de fallback em runtime, verificação na CLI        | Sinalizadas pelo TypeScript, `intlayer test` no CI                              |
| **Lazy loading**          | Desnecessário, cada build contém uma locale            | Arquivo de locale inteiro, divisão manual          | ✅ Por scope (rota ou componente)                        | ✅ Por componente e por locale                                                  |
| **Signals**               | Não se aplica, o texto é estático                      | Pipe e Observables                                 | `translateSignal()`                                      | `useIntlayer()` retorna um Signal                                               |
| **Configuração do build** | `ng add @angular/localize`, locales no `angular.json`  | Nenhuma                                            | Nenhuma                                                  | `@angular-builders/custom-esbuild` e um plugin esbuild                          |
| **Fluxo dos tradutores**  | ✅ XLIFF, o formato que as ferramentas de TMS esperam  | JSON                                               | JSON                                                     | `.content.ts`/JSON, plugins de sync, editor visual, preenchimento por IA na CLI |

Algumas linhas precisam de contexto.

**IDs de mensagem no `@angular/localize`.** Sem um ID personalizado (`i18n="@@cartTitle"`), o ID de cada mensagem é um hash do seu texto de origem. Corrija um erro de digitação no texto em inglês e todas as traduções dessa mensagem ficam órfãs até os tradutores refazê-las. Defina IDs personalizados desde o primeiro dia.

**Dividir com o `ngx-translate`.** O loader padrão baixa o `fr.json` inteiro, então cada página carrega as strings de todas as outras. Dá para dividir por funcionalidade com um loader personalizado ou várias instâncias de `TranslateService`, mas nada obriga isso. O artigo [i18n por componente vs centralizado](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/per-component_vs_centralized_i18n.md) trata desse compromisso.

- [i18n por componente vs centralizado](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/per-component_vs_centralized_i18n.md)

**Scopes no Transloco.** Um scope é uma pasta de arquivos JSON (`i18n/cart/en.json`) carregada quando uma rota ou componente o fornece. É o mais próximo do conteúdo por componente que as bibliotecas runtime oferecem, e funciona bem enquanto os componentes compartilhados não acessarem o scope de outra funcionalidade.

**O builder do Intlayer.** A Angular CLI não expõe plugins do esbuild, então o Intlayer precisa do `@angular-builders/custom-esbuild` no `angular.json`. É uma mudança pequena, mas é um builder de terceiros que precisa acompanhar as atualizações do Angular. O [guia de configuração para Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_angular_21.md) mostra a configuração completa.

- [guia de configuração para Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_angular_21.md)

## Atividade de commits

O `@angular/localize` vive no monorepo `angular/angular`, então sua contagem de commits não é comparável e fica de fora.

<GithubCommits repositories="ngx-translate/core,jsverse/transloco,aymericzip/intlayer" />

## Downloads no npm

<NpmDownloads packages="@angular/localize,@ngx-translate/core,@jsverse/transloco,angular-intlayer" period="last-6-months" />

Os downloads medem mais a história do que as escolhas atuais: o `ngx-translate` continua instalado em toda aplicação iniciada antes de o Transloco existir, e os assistentes de IA continuam a sugeri-lo porque ele domina o código com que foram treinados. O Transloco passou de `@ngneat/transloco` para `@jsverse/transloco` em 2024, e o scope antigo ainda é baixado.

## O mesmo componente com cada biblioteca

Um resumo do carrinho com um título e um plural. O template quase não muda, o que muda é onde as strings vivem e o que o compilador sabe sobre elas.

<Tabs defaultTab="angular-localize">
  <Tab label="@angular/localize" value="angular-localize">

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2 i18n="@@cartTitle">Your cart</h2>
      <p i18n="@@cartItems">
        {count(), plural, one {{{ count() }} item} other {{{ count() }} items}}
      </p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

```bash
ng extract-i18n --output-path src/locale
ng build --localize
```

```xml fileName="src/locale/messages.fr.xlf"
<trans-unit id="cartTitle" datatype="html">
  <source>Your cart</source>
  <target>Votre panier</target>
</trans-unit>
<trans-unit id="cartItems" datatype="html">
  <source>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> item} other {<x id="INTERPOLATION"/> items}}</source>
  <target>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> article} other {<x id="INTERPOLATION"/> articles}}</target>
</trans-unit>
```

O texto em inglês fica no template. Os tradutores trabalham no XLIFF extraído, e cada locale vira o seu próprio build. As strings em TypeScript usam a tag `$localize`.

  </Tab>
  <Tab label="ngx-translate" value="ngx-translate">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/i18n/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/i18n/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-cart-summary",
  imports: [TranslatePipe],
  template: `
    <section>
      <h2>{{ "cart.title" | translate }}</h2>
      <p>{{ "cart.items" | translate: { count: count() } }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

O plural ICU só funciona com `ngx-translate-messageformat-compiler`, o parser padrão apenas substitui `{{count}}`. `"cart.titel"` compila e mostra a chave bruta em runtime.

  </Tab>
  <Tab label="Transloco" value="transloco">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/i18n/cart/en.json"
{
  "title": "Your cart",
  "items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/i18n/cart/fr.json"
{
  "title": "Votre panier",
  "items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { provideTranslocoScope, TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: "app-cart-summary",
  imports: [TranslocoDirective],
  providers: [provideTranslocoScope("cart")],
  template: `
    <section *transloco="let t; prefix: 'cart'">
      <h2>{{ t("title") }}</h2>
      <p>{{ t("items", { count: count() }) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

O scope `cart` é baixado quando o componente é renderizado pela primeira vez. Plurais ICU precisam de `@jsverse/transloco-messageformat`. As chaves não são tipadas, o `transloco-keys-manager` relata as ausentes e as não utilizadas.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/app/cart-summary/cart-summary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ pt: "Seu carrinho", en: "Your cart", fr: "Votre panier" }),
    items: t({
      pt: plural({ one: "{{count}} item", other: "{{count}} itens" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2>{{ content().title }}</h2>
      <p>{{ content().items(count()) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
  content = useIntlayer("cart-summary");
}
```

Todas as locales ficam em um arquivo ao lado do componente. Os tipos são gerados no build, então `content().titel` quebra o `ng build`, e uma locale ausente em `t()` é sinalizada no editor.

  </Tab>
</Tabs>

## Qual combina com a sua aplicação

<AccordionGroup>
<Accordion header="Site público, poucas interações, SEO em primeiro lugar">

`@angular/localize`. Cada locale é um build separado com a sua própria URL, as páginas pré-renderizadas já chegam traduzidas e não há runtime de i18n para carregar. O custo de um build por locale é baixo quando a aplicação é basicamente conteúdo e as trocas de idioma são raras. Combine com tags `hreflang` corretas, veja o [guia de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/hreflang_guide_multilingual_seo.md).

- [guia de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/hreflang_guide_multilingual_seo.md)

</Accordion>
<Accordion header="Dashboard ou SaaS em que os usuários trocam de idioma dentro da aplicação">

Uma opção runtime. Recarregar em outro build perde o estado em memória, e um menu de idiomas que recarrega a aplicação parece quebrado. O `ngx-translate` basta para uma aplicação pequena com duas ou três locales. O Transloco é a escolha runtime mais segura a partir de uma dúzia de funcionalidades, graças aos scopes.

</Accordion>
<Accordion header="As traduções vêm de um TMS ou de uma agência">

O `@angular/localize` exporta XLIFF, que todo TMS lê, e o texto de origem no template dá contexto real aos tradutores. O JSON do `ngx-translate` e do Transloco também tem amplo suporte. Verifique se o seu fornecedor lida com plurais ICU antes de escolher uma biblioteca runtime, já que ambas precisam de um plugin para isso.

</Accordion>
<Accordion header="Aplicação grande, muitas rotas lazy, orçamento de bundle">

Scopes do Transloco ou Intlayer. Ambos evitam enviar as strings de todas as funcionalidades para todas as rotas. A diferença está na imposição: um scope do Transloco é uma convenção, um dicionário do Intlayer só entra no bundle onde `useIntlayer()` o importa. Veja [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md).

- [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md)
- [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md)

</Accordion>
<Accordion header="Type safety é um requisito">

Somente o Intlayer tipa as chaves de fábrica. Com `ngx-translate` e Transloco, um erro de digitação numa chave compila e aparece em produção como uma chave bruta. O Transloco Keys Manager pode detectá-lo no CI, o que é melhor que nada, mas não equivale a um erro de compilação. O artigo [detectar traduções ausentes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/detecting_missing_translations.md) compara as abordagens.

- [detectar traduções ausentes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/detecting_missing_translations.md)

</Accordion>
<Accordion header="As traduções serão produzidas por IA">

Conteúdo colocalizado mais uma CLI que preenche as locales ausentes é o caminho mais curto. O [comando `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md) do Intlayer roda com a sua própria chave de API e só retraduz o que mudou. Com catálogos XLIFF ou JSON, você terá de programar o mesmo ciclo por conta própria.

- [comando `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md)

</Accordion>
</AccordionGroup>

## Onde cada uma fica a desejar

- **`@angular/localize`**: um build e um deploy por locale, recarregamento ao trocar de idioma, IDs com hash que deixam traduções órfãs quando o texto de origem muda, e nenhuma forma de carregar traduções de um CMS depois do build sem truques no bootstrap.
- **`ngx-translate`**: chaves sem tipagem, plurais e ICU por plugin, o arquivo de locale completo em cada página, um pipe impuro reavaliado a cada detecção de mudanças, e nenhum tratamento de `LOCALE_ID` para datas e números.
- **Transloco**: chaves sem tipagem, ICU por plugin e scopes que são uma convenção e não uma garantia. Vários plugins para montar o que o `@angular/localize` entrega nativamente.
- **Intlayer**: um builder de terceiros no `angular.json`, uma comunidade Angular menor que as outras três, suporte parcial a ICU e conteúdo espalhado pelo codebase por design, então exportar um único arquivo para um tradutor exige o [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) ou a CLI.

- [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md)

## Migrando do ngx-translate

O [adaptador de compatibilidade `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/ngx-translate.md) mantém `TranslateService`, o pipe `translate` e a diretiva `[translate]` funcionando enquanto o Intlayer serve o conteúdo, de modo que os templates podem ser migrados um a um. O [guia de migração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_ngx-translate_to_intlayer.md) explica o passo a passo. Para Transloco ou `@angular/localize`, o [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) pode manter os catálogos JSON existentes como fonte da verdade durante a migração.

- [adaptador de compatibilidade `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/ngx-translate.md)
- [guia de migração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_ngx-translate_to_intlayer.md)
- [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md)

## Perguntas frequentes

<FAQ>

<Question title="O ngx-translate ainda é mantido?">

Sim. Depois de anos de pouca atividade, o projeto ganhou um novo mantenedor em 2024 e desde então lançou APIs standalone como `provideTranslateService`. O design não mudou: JSON em runtime, chaves em string, plurais por plugin.

</Question>

<Question title="ngx-translate ou Transloco para uma nova aplicação Angular?">

Transloco, a menos que a aplicação seja pequena. Ele cobre o que o `ngx-translate` faz e acrescenta scopes, helpers de signals, orientações para SSR e ferramentas para as chaves. As duas APIs são parecidas o bastante para que trocar depois seja em grande parte mecânico, mas não há motivo para começar pela mais simples se a aplicação vai crescer.

</Question>

<Question title="O @angular/localize consegue trocar de idioma sem recarregar?">

Não como foi projetado. As traduções são embutidas no build, então outro idioma significa outro build. Dá para chamar `loadTranslations()` antes do bootstrap para carregar traduções em runtime, mas trocar de idioma ainda exige reiniciar a aplicação.

</Question>

<Question title="Qual opção é melhor para o SEO do Angular?">

A biblioteca importa menos que o roteamento: uma URL por locale, tags `hreflang`, `<html lang>` e HTML traduzido renderizado no servidor. O `@angular/localize` consegue isso quase de graça, já que cada locale é um build separado. As bibliotecas runtime precisam de SSR e rotas localizadas para igualar. Veja [internacionalização e SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/internationalization_and_SEO.md).

- [internacionalização e SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/internationalization_and_SEO.md)

</Question>

<Question title="O Intlayer funciona com Analog?">

Sim, por meio do Vite. Veja o [guia do Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_analog.md).

- [guia do Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_analog.md)

</Question>

</FAQ>

## Para ir além

- [Configurar o Intlayer no Angular 22](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_angular_21.md)
- [Configurar o Intlayer no Angular 19](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_angular_19.md)
- [Benchmarks de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md)
- [Compilador vs i18n declarativo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/compiler_vs_declarative_i18n.md)
- [Formato de mensagens ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/icu_message_format.md)
- [Adaptadores de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md)

A mesma comparação para

- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/how_to_pick_react_i18n_library.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/how_to_pick_vue_i18n_library.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/how_to_pick_svelte_i18n_library.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/how_to_pick_solid_i18n_library.md)
