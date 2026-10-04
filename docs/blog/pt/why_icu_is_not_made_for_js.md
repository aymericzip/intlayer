---
createdAt: 2026-10-03
updatedAt: 2026-10-03
priority: 8
title: Por que o ICU MessageFormat não foi feito para JavaScript
description: "O ICU MessageFormat foi criado para Java e C++. No navegador, o suporte completo inclui cerca de 10 KB de código de parser. De onde vem esse custo e quais são as alternativas."
keywords:
  - icu message format
  - icu messageformat
  - icu messageformat javascript
  - tamanho de bundle icu
  - bundle size
  - intl-messageformat
  - next-intl precompile
  - pluralização i18n
  - Intl.PluralRules
  - Blog
slugs:
  - blog
  - why-icu-is-not-made-for-js
author: aymericzip
---

# Por que o ICU MessageFormat não foi feito para JavaScript

O ICU MessageFormat é um excelente padrão. É abrangente, os tradutores o conhecem bem e a maioria dos sistemas de gerenciamento de tradução (TMS) sabe como interpretá-lo. O problema central é o ambiente de execução para o qual ele foi concebido. O ICU surgiu no C++ e no Java, ecossistemas em que um parser e formatador completo representa um custo insignificante frente ao restante da aplicação. No bundle de um navegador, esse preço é pago em cada carregamento de página.

Este artigo analisa a origem do ICU, explica por que sua sintaxe é pesada para plurais e demonstra por que a compatibilidade integral adiciona peso desnecessário a qualquer biblioteca i18n em JavaScript. Se você precisa consultar a sintaxe em si, leia primeiro a [referência do ICU Message Format](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/icu_message_format.md).

- [Referência do ICU Message Format](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/icu_message_format.md)

<TOC/>

## Da IBM ao Consórcio Unicode

ICU significa _International Components for Unicode_. A sintaxe de mensagens nasceu no Java: a Taligent, uma joint venture entre Apple e IBM, desenvolveu as classes de internacionalização do JDK 1.1 (1997), incluindo `java.text.MessageFormat`. A IBM deu continuidade ao projeto com o ICU4J, fez o porte para C/C++ com o ICU4C e abriu o código-fonte em 1999. Em 2016, o ICU passou para o controle do Consórcio Unicode, que também gerencia o CLDR, o repositório de dados de localização do qual depende.

### Para que era utilizado originalmente

O foco eram softwares para servidores e desktops: aplicações corporativas em Java, produtos da IBM e, mais tarde, sistemas operacionais. As mensagens ficavam armazenadas em arquivos `.properties` do Java carregados via `ResourceBundle`, ou no formato próprio de pacotes de recursos do ICU para C/C++:

```properties fileName="messages_fr.properties"
inbox.unread={count, plural, one {# message non lu} other {# messages non lus}}
```

```java
String pattern = bundle.getString("inbox.unread");
String text = new MessageFormat(pattern, Locale.FRENCH)
    .format(Map.of("count", 5)); // "5 messages non lus"
```

A versão inicial do JDK não continha `plural`. Utilizava `choice`, com intervalos numéricos (`{0,choice,0#no files|1#one file|1<{0} files}`), o que só atendia a idiomas cujos plurais funcionam de maneira idêntica ao inglês. O ICU adicionou `plural` com base nas regras do CLDR em 2008 (ICU 4.0) e `select` em 2010 (ICU 4.4).

### A diferença em relação ao `.po`

É comum confundir o ICU com o gettext, mas são vertentes distintas. Arquivos `.po` provêm do GNU gettext (C, Linux, depois PHP e Python). Uma entrada `.po` contém pares simples de `msgid` / `msgstr`, e os plurais são resolvidos por uma expressão em C no cabeçalho do arquivo (`Plural-Forms: nplurals=2; plural=(n > 1);`). Não existem ramificações dentro do texto. O ICU, por outro lado, coloca as ramificações dentro da própria string, permitindo que uma única mensagem combine `plural`, `select` e formatação numérica.

### Onde o ICU roda hoje

O ICU4C está integrado ao Android, iOS, macOS, Windows, Node.js e aos motores de JavaScript do Chrome e Firefox. As APIs `Intl` dos navegadores são amplamente construídas sobre ele. Dessa forma, o navegador já inclui as regras de plural e formatações de números e datas do ICU. O que ele não inclui é o parser de mensagens: a API `Intl.MessageFormat` permanece como uma proposta TC39 em estágio inicial, baseada na nova sintaxe MessageFormat 2 e incompatível com o ICU MessageFormat 1.

Esse histórico explica as escolhas de design:

- **Foco em runtimes de servidor e desktop.** Fazer o parsing de uma string no runtime é muito barato nesses ambientes, e a biblioteca fica instalada de forma centralizada no sistema operacional, não precisando ser baixada por cada visitante.
- **É uma DSL dentro de uma string.** Ramificações, formatação de números, datas e aninhamento convivem em uma única sintaxe que o tradutor pode editar sem mexer em código.
- **Busca pela completude.** Qualquer detalhe gramatical que um tradutor possa precisar possui um operador dedicado.

Nenhuma dessas decisões foi errada. Elas apenas assumiram um ambiente de execução diferente do navegador web.

## Plurais são excessivamente prolixos

A estrutura mais comum do ICU é também a mais poluída visualmente. Uma contagem com caso zero é descrita assim:

```text
{count, plural,
  =0 {No unread messages}
  one {# unread message}
  other {# unread messages}
}
```

Isso exige o nome do argumento, a palavra-chave `plural`, um rótulo para cada caso, chaves aninhadas e `#` como um caractere especial que só funciona dentro de blocos de plural. Ao adicionar um sujeito com gênero, a estrutura se aninha ainda mais:

```text
{gender, select,
  female {{count, plural,
    one {She has # unread message}
    other {She has # unread messages}
  }}
  male {{count, plural,
    one {He has # unread message}
    other {He has # unread messages}
  }}
  other {{count, plural,
    one {They have # unread message}
    other {They have # unread messages}
  }}
}
```

Nove das quinze linhas servem apenas de estrutura sintática. O polonês necessita de quatro ramificações de plural para cada uma das três opções de gênero, transformando a string traduzida em um bloco denso de chaves onde uma única `}` ausente invalida toda a mensagem, muitas vezes apenas perceptível em runtime.

No JavaScript, essa mesma estrutura pode ser expressa diretamente como dados: um objeto cujas chaves correspondem às categorias de plural, validado pelo sistema de tipos e pelo editor, sem qualquer parser intermediário entre o arquivo e o valor em memória.

## Abrangência completa tem seu preço

O ICU suporta uma quantidade enorme de recursos:

- `plural` com correspondências exatas (`=0`) e modificadores (`offset:`)
- `selectordinal`, com sua própria tabela ordinal no CLDR
- `select`, com suporte a aninhamento ilimitado
- Argumentos `number`, `date` e `time`, no formato tradicional (`number, currency`) ou com skeletons (`::currency/EUR compact-short`)
- Regras de escape e aspas (`'{'`, `''`)
- Tags de rich-text em várias implementações (`<b>…</b>`)

Uma biblioteca que promete compatibilidade 1:1 com ICU precisa incluir todos esses módulos, pois não pode saber em tempo de build quais recursos suas mensagens realmente utilizam. Na prática, isso exige:

1. **Um parser** que transforma a string em uma AST, lidando com erros de sintaxe e chaves inválidas.
2. **Um parser de skeletons** para a sintaxis `::` de números e datas, que atua como uma pequena linguagem própria.
3. **Um formatador** que percorre a AST e conecta cada nó com `Intl.PluralRules`, `Intl.NumberFormat` e `Intl.DateTimeFormat`.

A terceira parte é leve, porque o JavaScript moderno já traz a lógica do CLDR integrada ao `Intl`. Já as duas primeiras existem unicamente para ler uma sintaxe textual. No `intl-messageformat` da FormatJS, implementação de referência que fundamenta `react-intl` e `next-intl`, isso representa cerca de **10 KB de JavaScript compactado** enviado a cada visitante, antes mesmo de qualquer mensagem própria.

A maioria dos projetos utiliza uma fração mínima desses recursos: interpolação `{name}` e alguns blocos de `plural`. Mesmo assim, continuam baixando o parser completo para skeletons, ordinais e offsets, já que uma string processada em runtime impede que o bundler remova o que não é usado.

## O next-intl enfrentou o mesmo dilema

Não se trata apenas de uma questão teórica. O `next-intl`, uma das bibliotecas baseadas em ICU mais utilizadas, chegou à mesma conclusão. Na versão 4.8 (janeiro de 2026), adicionou uma opção experimental chamada `precompile`. Ela analisa mensagens ICU durante o build gerando uma AST compacta e substitui o parser de runtime por um avaliador reduzido. O projeto reporta uma **redução de cerca de 9 KB de JavaScript compactado** com esse recurso ativado.

Esse compromisso também revela os limites da abordagem: `t.raw` não funciona com pré-compilação, pois a string ICU bruta deixa de existir em tempo de execução. A partir do momento em que o navegador não faz o parsing da string, você já não está mais enviando ICU real. Você envia uma representação compilada, e a sintaxe de string passa a ser apenas o formato inicial de escrita.

Nesse estágio, a pergunta é inevitável: se o navegador nunca lê a string, por que desenvolvedores e tradutores deveriam continuar escrevendo nela?

## Como é uma abordagem nativa em JavaScript

O JavaScript já resolve a parte mais complexa nativamente. O `Intl.PluralRules` sabe que o polonês possui quatro categorias cardinais e que o inglês tem quatro ordinais. O `Intl.NumberFormat` e o `Intl.DateTimeFormat` cuidam de moedas, unidades, formatos compactos e calendários. O que resta é apenas escolher uma ramificação e inserir valores, o que requer pouquíssimas linhas quando a estrutura é tratada como dado e não como string.

Esse é o modelo adotado pelo Intlayer. O direcionamento de fluxo é uma função dentro de uma declaração de conteúdo tipada, na qual cada localidade declara unicamente as categorias exigidas por sua gramática:

```typescript fileName="**/*.content.ts"
import { gender, plural, t, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox",
  content: {
    unread: t({
      pt: plural({
        one: "{{count}} mensagem não lida",
        other: "{{count}} mensagens não lidas",
      }),
      en: plural({
        one: "{{count}} unread message",
        other: "{{count}} unread messages",
      }),
      pl: plural({
        one: "{{count}} nieprzeczytana wiadomość",
        few: "{{count}} nieprzeczytane wiadomości",
        many: "{{count}} nieprzeczytanych wiadomości",
        other: "{{count}} nieprzeczytanej wiadomości",
      }),
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx"
const { unread } = useIntlayer("inbox");

unread(5); // Locale em polonês → "5 nieprzeczytanych wiadomości"
```

O que muda em comparação com o ICU:

- **Nenhum parser no bundle.** A estrutura já é um objeto nativo ao alcançar o navegador. A função `plural` escolhe a chave certa através do `Intl.PluralRules`, que o navegador já disponibiliza nativamente.
- **Erros identificados no build.** Uma ramificação ausente ou uma chave com erro de digitação gera um erro de tipagem estática, evitando falhas em produção.
- **A formatação fica desacoplada da mensagem.** Números, datas e moedas são tratados por [hooks de formatação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md) que consomem a API `Intl` diretamente, dispensando o processamento de skeletons.
- **Recursos não usados têm custo zero.** Se nenhuma mensagem utilizar `gender`, o bundler o remove através de tree-shaking.

- [Hooks de formatação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md)

Existem pontos de atenção legítimos: requer uma etapa de build, os arquivos de conteúdo são código em vez de strings puras, e algumas plataformas de TMS formatadas estritamente para ICU não conseguem ler arquivos de declaração TypeScript diretamente.

## Quando o ICU ainda é a escolha certa

O ICU permanece como a melhor opção nos seguintes casos:

- **Seu fluxo de tradução é inteiramente baseado nele.** Diversas ferramentas de TMS importam e exportam strings ICU, e os tradutores estão acostumados com essa sintaxe.
- **As mensagens são compartilhadas entre diferentes plataformas.** Usar o mesmo catálogo de traduções para alimentar um app iOS, um app Android e uma aplicação web é uma justificativa forte para manter um padrão comum.
- **Você já possui um catálogo extenso em ICU.** Reescrever milhares de mensagens raramente se justifica por si só.

Nesse último cenário, não é obrigatório escolher entre uma reescrita completa ou manter um parser pesado. O [adaptador de compatibilidade com react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/react-intl.md) do Intlayer consegue interpretar strings ICU pré-existentes (`plural`, `select`, `selectordinal`, `#`, formatos antigos de `number` / `date` / `time`), permitindo uma migração progressiva e mantendo o custo do ICU apenas nos textos legados que realmente precisem dele.

- [Adaptador de compatibilidade com react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/react-intl.md)

## Conclusão

O ICU MessageFormat solucionou um problema real: regras gramaticais pertencem aos tradutores e não a verificações condicionais como `if (count === 1)` espalhadas pelo código da aplicação. Ele funcionou muito bem em ambientes onde o parsing em tempo de execução tem custo desprezível. No navegador web, contudo, a compatibilidade total exige distribuir um parser com recursos que a maioria dos projetos nunca usará, levando as próprias bibliotecas baseadas em ICU a adotarem pré-compilação para contornar essa questão.

O JavaScript já disponibiliza todas as regras do CLDR através do `Intl`. O que se busca em um formato i18n moderno é sua estrutura lógica de seleção condicional, e essa estrutura pode ser representada com excelência na forma de dados tipados.

## Para se aprofundar

- [ICU Message Format: sintaxe, plurais e select](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/icu_message_format.md)
- [Conteúdo plural no Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/plurial.md)
- [Conteúdo baseado em select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/select.md)
- [Benchmark de bibliotecas i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md)
- [O next-intl está desatualizado?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/is_next-intl_outdated.md)
