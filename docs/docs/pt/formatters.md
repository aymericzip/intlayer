---
createdAt: 2024-08-13
updatedAt: 2025-08-20
title: Formatadores
description: Utilitários de formatação sensíveis à localidade baseados em Intl para números, percentagens, moeda, datas, tempo relativo, unidades e notação compacta. Inclui um helper Intl em cache.
keywords:
  - Formatadores
  - Intl
  - Número
  - Moeda
  - Percentagem
  - Data
  - Tempo Relativo
  - Unidades
  - Compacto
  - Lista
  - Internacionalização
slugs:
  - doc
  - formatters
history:
  - version: 5.8.0
    date: 2025-08-20
    changes: "Adicionados formatadores para Vue"
  - version: 5.8.0
    date: 2025-08-18
    changes: "Adicionada documentação dos formatadores"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Adicionar documentação do formatador de listas"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Adicionar utilitários adicionais do Intl (DisplayNames, Collator, PluralRules)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Adicionar utilitários de locale (getLocaleName, getLocaleLang, getLocaleFromPath, etc.)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Adicionar utilitários para manipulação de conteúdo (getContent, getTranslation, getIntlayer, etc.)"
author: aymericzip
---

# Formatadores Intlayer

## Visão Geral

O Intlayer fornece um conjunto de helpers leves construídos sobre as APIs nativas `Intl`, além de um wrapper `Intl` em cache para evitar a construção repetida de formatadores pesados. Esses utilitários são totalmente sensíveis à localidade e podem ser usados a partir do pacote principal `intlayer`.

## Intl em Cache

O `Intl` exportado é um wrapper leve e em cache em torno do `Intl` global. Ele memoiza instâncias de `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, `ListFormat`, `DisplayNames`, `Collator` e `PluralRules`, o que evita reconstruir o mesmo formatador repetidamente.

Como a construção do formatador é relativamente dispendiosa, este cache melhora o desempenho sem alterar o comportamento. O wrapper expõe a mesma API do `Intl` nativo, portanto o uso é idêntico.

- O cache é por processo e transparente para os chamadores.

> Se `Intl.DisplayNames` não estiver disponível no ambiente, um único aviso para desenvolvedores é exibido (considere um polyfill).

Exemplos:

```ts
import { Intl } from "intlayer";

// Formatação de números
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// Nomes exibidos para idiomas, regiões, etc.
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Ordenação para sorting
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (igual)

// Regras de plural
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

## React Formatters

### `Intl.DisplayNames`

Para nomes localizados de idiomas, regiões, moedas e scripts:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

### Hooks Disponíveis

Todos os hooks usam automaticamente a locale de `IntlayerProvider` ou `IntlayerServerProvider`.

| Hook                | Description                            | Example Output                |
| ------------------- | -------------------------------------- | ----------------------------- |
| `useNumber()`       | Formatar números com agrupamento       | `"123,456.789"`               |
| `useCurrency()`     | Formatar valores de moeda              | `"€1,234.50"`                 |
| `usePercentage()`   | Formatar percentagens                  | `"25%"`                       |
| `useDate()`         | Formatar datas e horas                 | `"Aug 2, 2025"`               |
| `useRelativeTime()` | Formatar tempo relativo                | `"in 3 days"`                 |
| `useUnit()`         | Formatar valores com unidades          | `"5 kilometers"`              |
| `useCompact()`      | Formatar números em notação compacta   | `"1.2K"`                      |
| `useList()`         | Formatar arrays como listas            | `"apple, banana, and orange"` |
| `useIntl()`         | Obter objeto `Intl` vinculado à locale | Acesso completo à API `Intl`  |

### `Intl.Collator`

Para comparação e ordenação de strings sensíveis ao local:

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base",
  numeric: true,
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

### `Intl.PluralRules`

Para determinar formas plurais em diferentes locais:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## Utilitários de Localidade

### `getLocaleName(displayLocale, targetLocale?)`

Obtém o nome localizado de uma localidade em outra localidade:

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

- **displayLocale**: O locale para o qual obter o nome
- **targetLocale**: O locale para exibir o nome (padrão é displayLocale)

### Composables Disponíveis

Todos os composables retornam computed refs que usam automaticamente a locale do `IntlayerProvider` injetado.

| Composable          | Descrição                              | Exemplo de Saída              |
| ------------------- | -------------------------------------- | ----------------------------- |
| `useNumber()`       | Formatar números com agrupamento       | `"123,456.789"`               |
| `useCurrency()`     | Formatar valores de moeda              | `"€1,234.50"`                 |
| `usePercentage()`   | Formatar percentuais                   | `"25%"`                       |
| `useDate()`         | Formatar datas e horas                 | `"Aug 2, 2025"`               |
| `useRelativeTime()` | Formatar tempo relativo                | `"in 3 days"`                 |
| `useUnit()`         | Formatar valores com unidades          | `"5 kilometers"`              |
| `useCompact()`      | Formatar números em notação compacta   | `"1.2K"`                      |
| `useList()`         | Formatar arrays como listas            | `"apple, banana, and orange"` |
| `useIntl()`         | Obter objeto `Intl` vinculado à locale | Acesso completo à API `Intl`  |

### Exemplo Completo

```vue
<script setup>
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "vue-intlayer/format";

const number = useNumber();
const currency = useCurrency();
const date = useDate();
const percentage = usePercentage();
const compact = useCompact();
const list = useList();
const relativeTime = useRelativeTime();
const unit = useUnit();
</script>

<template>
  <div>
    <p>{{ number.value(123456.789) }}</p>
    <p>{{ currency.value(1234.5, { currency: "EUR" }) }}</p>
    <p>{{ date.value(new Date(), "short") }}</p>
    <p>{{ percentage.value(0.25) }}</p>
    <p>{{ compact.value(1200) }}</p>
    <p>{{ list.value(["apple", "banana", "orange"]) }}</p>
    <p>{{ relativeTime.value(new Date(), new Date(Date.now() + 86400000)) }}</p>
    <p>{{ unit.value(5, { unit: "kilometer" }) }}</p>
  </div>
</template>
```

### `getLocaleLang(locale?)`

Extrai o código de idioma de uma string de locale:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

- **locale**: O locale do qual extrair o idioma (padrão é o locale atual)

## Formatadores Vanilla JS / Node.js

Para contextos sem framework, importe formatadores diretamente do `intlayer`. Observe que você deve passar o locale manualmente.

### `getLocaleFromPath(inputUrl)`

Extrai o segmento de locale de uma URL ou pathname:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (locale padrão)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

- **inputUrl**: A string completa da URL ou caminho para processar
- **returns**: O locale detectado ou o locale padrão se nenhum locale for encontrado

### Funções de Formatter

#### `number(value, options?)`

Formata um valor numérico usando agrupamento e decimais compatíveis com a localidade.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
number(123456.789); // "123,456.789" (em en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

#### `percentage(value, options?)`

Formata um número como uma string de percentual. Valores maiores que 1 são normalizados (ex: `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

#### `currency(value, options?)`

Formata um valor como moeda localizada. Padrão é `USD`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Comuns: `currency`, `currencyDisplay` (`"symbol" | "code" | "name"`)

```ts
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

#### `date(date, optionsOrPreset?)`

Formata um valor de data/hora.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` or preset: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

```ts
date(new Date(), "short"); // e.g., "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

#### `relativeTime(from, to?, options?)`

Formata tempo relativo entre dois instantes.

- **from**: `Date | string | number`
- **to**: `Date | string | number` (padrão para `new Date()`)
- **options**: `{ locale?, unit?, numeric?, style? }`

```ts
const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "em 3 dias"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "há 2 horas"
```

#### `units(value, options?)`

Formata um valor numérico com uma unidade.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `unit` (e.g., `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)

```ts
units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"
```

#### `compact(value, options?)`

Formata um número usando notação compacta.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

#### `list(values, options?)`

Formata um array em uma string de lista localizada.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Common: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)

```ts
list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
```

## Formatadores

Todos os helpers abaixo são exportados de `intlayer`.

### Funcionalidades Intl Adicionais

#### `Intl.DisplayNames`

Para nomes localizados de idiomas, regiões, moedas e scripts:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

#### `Intl.Collator`

Para comparação e classificação de strings com reconhecimento de locale:

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base",
  numeric: true,
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

#### `Intl.PluralRules`

Para determinar formas plurais em diferentes locales:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## Utilitários de Locale

### `currency(value, options?)`

Formata um valor como moeda localizada. O padrão é `USD` com duas casas decimais.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Campos comuns: `currency` (por exemplo, `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

Exemplos:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

Formata um valor de data/hora com `Intl.DateTimeFormat`.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` ou um dos predefinidos:
  - Predefinidos: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

Exemplos:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // ex., "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

Formata o tempo relativo entre dois instantes com `Intl.RelativeTimeFormat`.

- Passe "now" como o primeiro argumento e o alvo como o segundo para obter uma frase natural.
- **from**: `Date | string | number`
- **to**: `Date | string | number` (padrão é `new Date()`)
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - O `unit` padrão é `"second"`.

Exemplos:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "em 3 dias"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "há 2 horas"
```

### `units(value, options?)`

Formata um valor numérico como uma string de unidade localizada usando `Intl.NumberFormat` com `style: 'unit'`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Campos comuns: `unit` (ex.: `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - Padrões: `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

Exemplos:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 quilômetros"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1.024B" (dependente do locale)
```

### `compact(value, options?)`

Formata um número usando notação compacta (ex.: `1.2K`, `1M`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (usa `notation: 'compact'` internamente)

Exemplos:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 milhão"
```

### `getHTMLTextDir(locale?)`

Retorna a direção do texto para uma localidade:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

## Utilitários de Tratamento de Conteúdo

### `list(values, options?)`

Formata um array de valores em uma string de lista localizada usando `Intl.ListFormat`.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Campos comuns: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)
  - Padrões: `type: 'conjunction'`, `style: 'long'`

Exemplos:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana e orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

### React

Componentes cliente:

```tsx
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "react-intlayer/format";
// ou em apps Next.js
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "next-intlayer/client/format";

const MyComponent = () => {
  const number = useNumber();
  const currency = useCurrency();
  const date = useDate();
  const percentage = usePercentage();
  const compact = useCompact();
  const list = useList();
  const relativeTime = useRelativeTime();
  const unit = useUnit();

  return (
    <div>
      <p>{number(123456.789)}</p>
      <p>{currency(1234.5, { currency: "EUR" })}</p>
      <p>{date(new Date(), "short")}</p>
      <p>{percentage(0.25)}</p>
      <p>{compact(1200)}</p>
      <p>{list(["apple", "banana", "orange"])}</p>
      <p>{relativeTime(new Date(), new Date() + 1000)}</p>
      <p>{unit(123456.789, { unit: "kilometer" })}</p>
    </div>
  );
};
```

Componentes servidor (ou runtime React Server):

```ts
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "react-intlayer/server/format";
// ou em apps Next.js
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "next-intlayer/server/format";
```

> Esses hooks irão considerar a localidade do `IntlayerProvider` ou `IntlayerServerProvider`

### Vue

Componentes cliente:

```ts
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "vue-intlayer/format";
```

> Esses composables irão considerar o locale do `IntlayerProvider` injetado

## Notas

- Todos os helpers aceitam entradas `string`; elas são internamente coagidas para números ou datas.
- Locale padrão é sua `internationalization.defaultLocale` configurada, se não fornecida.
- Esses utilitários são wrappers simples; para formatação avançada, passe pelas opções `Intl` padrão.
