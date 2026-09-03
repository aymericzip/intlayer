---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Formatando datas e números por idioma com Intl"
description: Você provavelmente não precisa de uma biblioteca externa de formatação. Como o Intl lida com datas, números, moedas e listas por localidade, o custo de cache e o bug de timezone em produção.
keywords:
  - formatar data por localidade
  - Intl.DateTimeFormat
  - Intl.NumberFormat
  - toLocaleDateString
  - formato moeda locale
  - formato tempo relativo
slugs:
  - blog
  - date-time-number-formatting-locales
author: aymericzip
---

# Formatando datas e números por idioma com Intl

Traduzir strings de texto é apenas a metade visível da internacionalização. A outra metade, responsável pela maioria dos relatos de bugs, é a formatação: um usuário na Alemanha vendo `1,234.56` em vez de `1.234,56`, um usuário no Japão vendo `08/02/2026` e lendo como agosto, ou uma data que renderiza diferente no servidor e no navegador, derrubando a página na hidratação do React.

Nada disso requer bibliotecas externas. A API nativa `Intl` já está presente em qualquer ambiente moderno de execução.

## Sumário

<TOC/>

## Comece deletando suas funções helper caseiras de data

Quase todo repositório possui uma função `formatDate` escrita antes de qualquer planejamento para internacionalização. Ela fixa uma ordem arbitrária, um separador e quase sempre nomes de meses em inglês.

```ts
// O código que você deve apagar:
const formatDate = (d: Date) =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
```

`Intl.DateTimeFormat` a substitui por completo e entrega o resultado correto para cada localidade:

```ts
new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(date);
// "2. August 2026"
new Intl.DateTimeFormat("ja-JP", { dateStyle: "long" }).format(date);
// "2026年8月2日"
```

O mesmo vale para valores numéricos. `toFixed(2)` produz `1234.56` em qualquer lugar, o que é incorreto na maior parte da Europa.

## O que a API `Intl` engloba

| API                       | Quando utilizar                                            |
| :------------------------ | :--------------------------------------------------------- |
| `Intl.DateTimeFormat`     | Datas e horários, com presets `dateStyle` / `timeStyle`    |
| `Intl.NumberFormat`       | Decimais, moedas, porcentagens, unidades, notação compacta |
| `Intl.RelativeTimeFormat` | "há 3 dias", "em 2 horas"                                  |
| `Intl.ListFormat`         | "a, b e c" versus "a, b, and c"                            |
| `Intl.PluralRules`        | Identificar categorias de plural para números              |
| `Intl.Collator`           | Ordenação alfabética linguística correta de strings        |

`Intl.Collator` é o mais esquecido. Um simples `array.sort()` sobre strings utiliza a ordenação de code points do Unicode, fazendo caracteres com acentos ficarem depois de `z` e colocando o `ö` sueco na posição errada. Sempre que ordenar listas visíveis para os usuários, use um collator.

```ts
["zebra", "édouard", "apple"].sort(new Intl.Collator("pt").compare);
// ["apple", "édouard", "zebra"]
```

## Prefira presets a opções montadas manualmente

`dateStyle` e `timeStyle` deixam o locale decidir a ordem e os separadores lógicos. Especificar `year`, `month` e `day` separadamente dá um controle raramente desejável, pois a ordem correta varia de acordo com a região e você acaba sobrescrevendo os dados do CLDR com suas próprias suposições.

```ts
// A localidade decide a estrutura:
new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(d);

// Você forçou a estrutura e estará incorreto em outras regiões:
new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(d);
```

Defina componentes explícitos apenas quando o layout visual exigir rigorosamente uma largura fixa, como em uma coluna estreita de tabela.

## Instanciar formatadores é custoso

Este é o detalhe de desempenho mais crítico. Criar um `Intl.NumberFormat` carrega dados pesados de localidade na memória, sendo um processo muito mais custoso do que a chamada subsequente a `.format()`. Fazer isso em um loop de renderização sobre mil linhas cria um gargalo expressivo.

```ts
// Recria o formatador a cada linha:
rows.map((r) => new Intl.NumberFormat(locale).format(r.total));

// Cria uma única vez e reutiliza:
const nf = new Intl.NumberFormat(locale);
rows.map((r) => nf.format(r.total));
```

`toLocaleDateString()` e `toLocaleString()` escondem o mesmo problema: cada execução cria um novo formatador. Funcionam para um valor pontual, mas são péssimos para listas.

Armazene-os em cache com base na combinação de localidade e opções:

```ts
const cache = new Map<string, Intl.NumberFormat>();

const getNumberFormat = (
  locale: string,
  options: Intl.NumberFormatOptions = {}
) => {
  const key = `${locale}:${JSON.stringify(options)}`;
  let formatter = cache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    cache.set(key, formatter);
  }
  return formatter;
};
```

## O bug de fuso horário que só surge em produção

Esse problema já custou tardes inteiras de trabalho. O servidor renderiza a data no SSR, o navegador hidrata o componente no cliente, e o React acusa um erro de hydration mismatch porque os dois ambientes produziram textos conflitantes.

A causa: `Intl.DateTimeFormat` assume o fuso horário padrão do sistema quando nenhum é especificado. Seu servidor de produção opera em UTC, enquanto sua máquina de desenvolvimento local está em outro fuso. Com isso, o erro fica invisível localmente e só aparece em produção.

```ts
// Servidor em UTC e navegador em UTC+9 divergem. Erro de hidratação.
new Intl.DateTimeFormat(locale, { dateStyle: "short" }).format(d);

// Ambos se alinham de forma consistente:
new Intl.DateTimeFormat(locale, { dateStyle: "short", timeZone: "UTC" }).format(
  d
);
```

Três soluções viáveis:

- **Fixar o fuso horário** no servidor e passá-lo explicitamente. Seguro e determinístico, mas todos veem horário em UTC.
- **Renderizar apenas no cliente**, com um placeholder estável durante o SSR. Preciso para cada usuário, com um leve salto visual.
- **Salvar o fuso do usuário** e passá-lo em ambos os lados. A melhor experiência, exigindo um pouco mais de infraestrutura.

Qualquer que seja sua escolha, informe sempre `timeZone` de forma explícita em qualquer data renderizada tanto no servidor quanto no cliente. Uma data sem fuso explícito é uma data com dois valores contraditórios.

## Moeda precisa de moeda, não de locale

Localidade e moeda são conceitos independentes. `fr-FR` não significa euro: um usuário na França pode perfeitamente estar analisando uma fatura em dólares americanos.

```ts
new Intl.NumberFormat("fr-FR", { style: "currency", currency: "USD" }).format(
  1234.5
);
// "1 234,50 $US"
```

O locale governa os separadores, o agrupamento de dígitos e a posição do símbolo. A moeda vem dos seus dados. Presumir uma a partir da outra gera inconsistências financeiras.

Fique atento também a `currencyDisplay`. Em interfaces com múltiplas moedas que compartilham o símbolo de cifrão, `"code"` elimina a ambiguidade entre dólares americanos, canadenses e australianos.

## Tempo relativo soa mais natural que tempo absoluto

Para ocorrências recentes, "há 2 horas" é muito mais claro do que um timestamp bruto, e `Intl.RelativeTimeFormat` lida com isso de maneira nativa.

```ts
new Intl.RelativeTimeFormat("pt", { numeric: "auto" }).format(-1, "day");
// "ontem"
```

`numeric: "auto"` entrega "ontem" em vez de "há 1 dia". Sem isso, você recebe a expressão puramente numérica, que soa artificial.

## O que o Intlayer adiciona

O Intlayer encapsula essas APIs em utilitários com cache embutido para poupar o gerenciamento manual do Map acima, e aplica a localidade ativa como padrão sem obrigar você a passá-la a cada chamada.

```ts
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
} from "intlayer";

number(1234.5); // "1.234,5"
currency(1234.5, { currency: "EUR" }); // "1.234,50 €"
date(new Date(), "short");
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "há 2 horas"
units(5, { unit: "kilometer", unitDisplay: "long" }); // "5 quilômetros"
compact(1200); // "1,2 mil"
list(["maçã", "banana", "laranja"]); // "maçã, banana e laranja"
```

A função `date()` também suporta presets (`"short"`, `"long"`, `"dateOnly"`, `"timeOnly"`, `"full"`), eliminando a necessidade de objetos de opções nos casos comuns. Equivalentes para React e Vue estão disponíveis como hooks e composables, resolvendo a localidade ativa diretamente do contexto.

Trata-se de uma camada ágil de cache e resolução padrão sobre as APIs da plataforma. A formatação em si continua sendo 100% `Intl`. Consulte as assinaturas completas na [documentação de formatadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md).

## Erros comuns

- **`toLocaleDateString()` sem definir locale.** Usa o locale do ambiente hospedeiro, que no servidor reflete a imagem do contêiner.
- **Formatar dentro de laços de repetição.** O custo reside na instanciação do formatador. Crie uma vez e reutilize.
- **Omitir `timeZone` em datas isomórficas.** Gera erros de hidratação impossíveis de reproduzir localmente.
- **Deduzir a moeda a partir do locale.** `fr-FR` não garante valores em euros.
- **Chamar `sort()` simples em textos de interface.** Use sempre `Intl.Collator`.
- **Escrever nomes de meses ou dias fixos no código.** O CLDR já armazena tudo em todas as línguas.
- **Manter `numeric: "always"` em tempo relativo.** Gera "há 1 dia" onde todo idioma possui uma palavra como ontem.

## Para se aprofundar

- [Formatadores e utilitários de locale: `number`, `currency`, `date`, `relativeTime`, `list`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md)
- [Referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)
- [Relatórios de benchmark entre frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md)
- [Adaptador de compatibilidade react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/react-intl.md)
- [Formato de mensagens ICU: plurais, select e skeletons numéricos](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/icu_message_format.md)
- [Como testar traduções, cobrindo formatadores e plurais](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_testing_strategies.md)
- [O que a internacionalização realmente abrange](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/what_is_internationalization.md)
