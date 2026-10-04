---
createdAt: 2026-09-02
updatedAt: 2026-10-03
priority: 8
title: "Formato de Mensagens ICU: Sintaxe, Plurais e Select"
description: Uma referência prática sobre o ICU MessageFormat, interpolação de argumentos, ramificações plural e select, categorias de plural do CLDR por idioma e erros comuns.
keywords:
  - formato de mensagem icu
  - icu messageformat
  - regras de plural cldr
  - categorias de plural
  - selectordinal
  - pluralizacao i18n
  - sintaxe de mensagens
slugs:
  - blog
  - icu-message-format
author: aymericzip
---

# Formato de Mensagens ICU: a sintaxe e as armadilhas comuns

O ICU MessageFormat é uma sintaxe de strings que permite que uma tradução contenha sua própria lógica condicional: plurais, formas de gênero, formatação de números e datas. Ele existe porque a gramática pertence ao tradutor, e não ao desenvolvedor que escreve `if (count === 1)`. Este artigo aborda a sintaxe, os aspectos dependentes do idioma que quebram implementações ingênuas e como o ecossistema JS lida com essas necessidades.

## Índice

<TOC/>

## O problema, de forma prática

Eis o código que praticamente todo mundo escreve primeiro:

```ts
const label = count + " " + (count === 1 ? t("item") : t("items"));
```

Isso funciona em inglês, mas falha em quase todos os outros idiomas:

- **Russo e polonês** precisam de três ou quatro formas, e não duas.
- **Japonês** precisa de apenas uma, e o espaço concatenado está incorreto.
- **Árabe** precisa de seis formas, e o próprio número deve ser renderizado no sistema numérico do locale.
- **Francês** insere um espaço fixo antes de certas pontuações, algo que a concatenação `+ " "` destrói.

O problema mais profundo é que a frase foi fragmentada. O tradutor se depara com `item` e `items` sem contexto e sem a capacidade de reordenar a estrutura da frase. O ICU MessageFormat resolve isso mantendo a frase inteira em uma única string traduzível e concedendo ao tradutor os operadores lógicos adequados.

## Argumentos simples

A menor unidade é um placeholder entre chaves simples:

```text
Hello, {name}!
```

Ao fornecer `{ name: "Alice" }` durante a formatação, obtém-se `Hello, Alice!`. As chaves são os únicos caracteres especiais. Para imprimir uma chave literal, envolva-a entre aspas simples: `'{'`.

Esse é todo o recurso de interpolação. Tudo o mais no ICU é construído sobre essa base.

## Plural

`plural` seleciona um ramo com base em um valor numérico:

```text
{count, plural,
  one {You have one unread message}
  other {You have # unread messages}
}
```

Três pontos fundamentais a compreender:

- **`#`** é substituído pelo valor formatado de `count`, adaptado ao locale. Dessa forma, `1234` se torna `1,234` em `en-US` e `1.234` em `pt-BR`.
- **`other` é obrigatório.** Qualquer implementação de ICU lançará um erro ou falhará na validação sem ele. É o fallback quando nenhuma categoria coincide.
- **`=0`, `=1`, … correspondem a valores exatos** e são avaliados _antes_ das categorias do CLDR. Use-os para textos específicos ("Nenhuma mensagem"), e não como substituto de `one`.

```text
{count, plural,
  =0 {No unread messages}
  one {One unread message}
  other {# unread messages}
}
```

### offset

`offset:n` subtrai `n` do valor antes da seleção de categoria e da substituição de `#`. Isso atende ao padrão "Alice e outras 3 pessoas curtiram isto":

```text
{count, plural, offset:1
  =0 {No one liked this}
  =1 {{name} liked this}
  one {{name} and one other liked this}
  other {{name} and # others liked this}
}
```

Com `count: 4`, `#` exibe `3`. `offset` é muito útil, mas o nível de suporte varia entre runtimes, portanto teste seu ambiente antes de utilizá-lo amplamente.

## As categorias de plural dependem do idioma

Este é o ponto onde mais ocorrem equívocos. Os nomes de categorias `zero`, `one`, `two`, `few`, `many`, `other` não são compartimentos universais presentes em todas as línguas. Cada locale utiliza um _subconjunto_, definido pelas [regras de plural do CLDR](https://cldr.unicode.org/index/cldr-spec/plural-rules), e essas regras são gramaticais, não puramente matemáticas.

| Idioma  | Tag  | Categorias utilizadas            | Total |
| ------- | ---- | -------------------------------- | ----- |
| Japonês | `ja` | other                            | 1     |
| Chinês  | `zh` | other                            | 1     |
| Inglês  | `en` | one, other                       | 2     |
| Alemão  | `de` | one, other                       | 2     |
| Francês | `fr` | one, many, other                 | 3     |
| Tcheco  | `cs` | one, few, many, other            | 4     |
| Polonês | `pl` | one, few, many, other            | 4     |
| Russo   | `ru` | one, few, many, other            | 4     |
| Árabe   | `ar` | zero, one, two, few, many, other | 6     |
| Galês   | `cy` | zero, one, two, few, many, other | 6     |

Duas consequências que costumam surpreender:

- **`one` não significa estritamente "1".** Em russo, `one` abrange 1, 21, 31, 101: qualquer número terminado em 1, exceto os que terminam em 11. Em francês, `0` é classificado como `one`.
- **Adicionar uma categoria ao arquivo original em inglês não surte efeito.** O texto em inglês precisa apenas de `one` e `other`. A tradução em polonês exige quatro ramos, e essa estrutura pertence à string polonesa, não à inglesa. Qualquer padrão que obrigue todos os idiomas a compartilharem o mesmo conjunto de chaves causará conflitos.

É possível testar o comportamento real do seu runtime sem instalar nada:

```ts
new Intl.PluralRules("pl").select(2); // "few"
new Intl.PluralRules("pl").select(5); // "many"
new Intl.PluralRules("ru").select(21); // "one"
new Intl.PluralRules("ar").select(0); // "zero"
```

O `Intl.PluralRules` disponibiliza os dados do CLDR em todos os navegadores modernos e no Node. Bibliotecas com suporte a CLDR quase invariavelmente consultam essa API por baixo dos panos.

## select e selectordinal

`select` cria ramificações a partir de uma string arbitrária: um gênero, um papel de usuário, um status ou um plano de assinatura.

```text
{gender, select,
  female {She updated her profile}
  male {He updated his profile}
  other {They updated their profile}
}
```

As chaves são comparadas literalmente e `other` também é obrigatório neste caso. `select` é a escolha ideal sempre que a gramática de uma oração depender de um valor enumerado, já que os idiomas divergem sobre quais enums alteram sua estrutura.

`selectordinal` possui a mesma estrutura que `plural`, mas adota as regras de plural **ordinal**, que pertencem a uma tabela distinta dos números cardinais:

```text
{rank, selectordinal,
  one {#st place}
  two {#nd place}
  few {#rd place}
  other {#th place}
}
```

O inglês adota quatro categorias ordinais (1st, 2nd, 3rd, 4th), embora utilize apenas duas cardinais. Essa assimetria explica por que os dois operadores operam separadamente.

## Argumentos de números, datas e horas

O ICU consegue formatar os valores que interpola diretamente:

```text
Total: {price, number, currency}
Published {publishedAt, date, long} at {publishedAt, time, short}
Conversion: {rate, number, percent}
```

O formato contemporâneo é o **skeleton**, introduzido no ICU 60 e identificado pelo prefixo `::`. Skeletons oferecem muito mais expressividade do que os estilos legados:

```text
{price, number, ::currency/EUR}
{value, number, ::percent scale/100}
{amount, number, ::compact-short}
{distance, number, ::unit/kilometer unit-width-narrow}
```

O suporte a skeletons varia entre as ferramentas. O FormatJS oferece suporte completo, enquanto outros runtimes aceitam apenas os formatos tradicionais `number, currency` ou `date, long`. Verifique o suporte a `::` no seu ambiente antes de publicar em produção.

## Aninhamento e limites de legibilidade

O ICU é combinável. Um ramo de plural pode conter um select, que por sua vez pode abrigar outro plural:

```text
{hostGender, select,
  female {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    =1 {{host} invites {guest} to her party}
    other {{host} invites {guest} and # other people to her party}
  }}
  other {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    other {{host} invites {guest} and # other people to their party}
  }}
}
```

Este é o exemplo clássico de ICU e também a maior justificativa contra o aninhamento profundo. A partir de dois níveis, os tradutores começam a cometer erros de chaves e os editores TMS perdem eficiência. Evite ultrapassar dois níveis; caso precise de um terceiro, divida a sentença em duas mensagens separadas.

## Como as bibliotecas JS tratam o ICU

| Biblioteca            | Suporte a ICU          | O que você realmente escreve                                                 |
| --------------------- | ---------------------- | ---------------------------------------------------------------------------- |
| react-intl (FormatJS) | Nativo, completo       | Strings ICU, incluindo skeletons e tags rich-text                            |
| next-intl             | Nativo                 | Strings ICU, via `intl-messageformat` do FormatJS                            |
| i18next               | Requer plugin          | Sufixos de chave `key_one` / `key_other` e `{{name}}`; ICU via `i18next-icu` |
| vue-i18n              | Parcial / proprietário | Interpolação `{name}` e ramos de plural separados por pipes                  |
| Angular (`$localize`) | Subconjunto            | ICU `plural` / `select` dentro de templates, extraído para XLIFF             |

Algumas observações importantes para a leitura da tabela:

- **A sintaxe padrão do i18next não é ICU**, o que não é necessariamente um defeito. Os sufixos (`item_one`, `item_few`) se mapeiam para as categorias do `Intl.PluralRules` e são frequentemente mais fáceis de editar em JSON simples. No entanto, `select` e ramificações aninhadas não fazem parte desse núcleo, exigindo o `i18next-icu` ou lógica manual no código.
- **Os plurais por pipe do vue-i18n** utilizam, por padrão, uma função de regra customizada por locale, e não categorias CLDR. O formato funciona, mas a regra fica na configuração do app e não nos dados.
- **O FormatJS é a referência** no universo JS. Quando desenvolvedores citam "ICU MessageFormat" em JavaScript, normalmente se referem ao padrão suportado pelo FormatJS.
- **O suporte completo a ICU tem um custo de bundle.** O parser e o manuseio de skeletons adicionam cerca de 10 KB de JavaScript compactado. Veja [por que o ICU não foi feito para JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/why_icu_is_not_made_for_js.md).

## Como o Intlayer lida com isso

O Intlayer não adota uma DSL baseada em strings. Os operadores condicionais são funções dentro de arquivos tipados de declaração de conteúdo, permitindo que cada locale defina unicamente as categorias exigidas por sua própria gramática:

```typescript fileName="**/*.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      pt: plural({
        one: "{{count}} vaga aberta",
        other: "{{count}} vagas abertas",
      }),
      pl: plural({
        one: "{{count}} oferta",
        few: "{{count}} oferty",
        many: "{{count}} ofert",
        other: "{{count}} ofert",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```tsx fileName="**/*.tsx"
const { totalOpenings } = useIntlayer("total_openings");

totalOpenings(5); // Locale polonês → "5 ofert"
```

O mapeamento para os conceitos do ICU é direto:

| Construção ICU                | Intlayer                                     |
| ----------------------------- | -------------------------------------------- |
| `{name}`                      | `insert("Hello {{name}}")` ou autodetecção   |
| `{count, plural, …}`          | `plural({ one, few, many, other })`          |
| `{value, select, …}`          | `select({ draft, published, fallback })`     |
| ramo de gênero em `select`    | `gender({ male, female, fallback })`         |
| ramo booleano em `select`     | `cond({ true, false })`                      |
| faixas numéricas (não-CLDR)   | `enu({ "0": …, ">5": …, fallback: … })`      |
| `{n, number, ::currency/EUR}` | `useCurrency()(1234.5, { currency: "EUR" })` |

O `plural` delega a seleção de categorias ao `Intl.PluralRules`, aplicando a tabela CLDR demonstrada acima sem desvios. A formatação permanece desacoplada: números, datas, moedas e listas são processados através de [hooks de formatação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md), em vez de embutidos na mensagem textual.

- [hooks de formatação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md)

Limitações objetivas:

- O Intlayer exige uma etapa de build: o compilador extrai as declarações durante a compilação. Para cenários com carregamento de JSON simples em tempo de execução, o modelo é diferente.
- O nó `plural` ainda não permite aninhar um `t()` diretamente dentro de seus ramos: você envolve o `plural` com o `t()`, e não o oposto.
- O ecossistema é mais jovem que o do i18next, dispondo de menos integrações prontas para TMS e discussões comunitárias.

Para bases de código que já contam com strings ICU, o [adaptador de compatibilidade do react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/react-intl.md) analisa esses formatos nativamente: `plural`, `select`, `selectordinal`, `#` e os argumentos legados `number`, `date`, `time`. Skeletons e `offset:` não são suportados por esse analisador e devem ser verificados na migração. O [adaptador do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/i18next.md) resolve as convenções de sufixo (`key_one`, `key_male`) via `Intl.PluralRules`.

- [adaptador de compatibilidade do react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/react-intl.md)
- [adaptador do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/i18next.md)

## Erros frequentes

- **Fixar lógica de plural no código JS.** A expressão `count === 1 ? a : b` produz resultados incorretos para 8 dos 10 idiomas listados na tabela acima. Quando o operador ternário fica no código, nenhum tradutor consegue ajustá-lo.
- **Concatenar fragmentos traduzidos.** A ordem das palavras, as concordâncias e o espaçamento antes da pontuação dependem do locale. Mantenha a sentença completa em uma única string.
- **Omitir `other`.** Trata-se de uma exigência da especificação, e não de uma convenção opcional. A maioria dos parsers rejeitará a mensagem e os restantes nada renderizarão.
- **Assumir que as categorias se replicam igualmente.** O fato de o texto original em inglês usar `one` e `other` não significa que o arquivo polonês terá dois ramos. Permita que cada locale declare seus próprios ramos. Veja [declaração de conteúdo por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md).
- **Usar `=1` onde se pretendia `one`.** `=1` intercepta apenas o valor exato 1. Em russo, 21 exige a categoria `one`, e a regra `=1` nunca será acionada para ele.
- **Inserir `#` fora de uma ramificação de plural.** Ele só possui significado especial dentro de `plural` ou `selectordinal`. Em qualquer outro local, será tratado como caractere literal.
- **Esquecer que `#` já vem formatado.** Caso precise do valor bruto sem separadores numéricos do locale, interpole o argumento pelo nome.

## Próximos passos

- [Por que o ICU não foi feito para JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/why_icu_is_not_made_for_js.md)
- [Conteúdo com plural no Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/plurial.md)
- [Conteúdo baseado em select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/select.md)
- [Placeholders de inserção](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion.md)
- [Benchmark de bibliotecas de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/react-i18next_vs_react-intl_vs_intlayer.md)
- [O que é internacionalização?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/what_is_internationalization.md)
