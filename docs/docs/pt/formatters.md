---
createdAt: 2024-08-13
updatedAt: 2025-08-20
title: Formatadores
description: Utilitários de formatação sensíveis à localidade baseados no Intl para números, percentuais, moeda, datas, tempo relativo, unidades e notação compacta. Inclui um helper Intl com cache.
keywords:
  - Formatadores
  - Intl
  - Número
  - Moeda
  - Percentual
  - Data
  - Tempo Relativo
  - Unidades
  - Compacto
  - Internacionalização
slugs:
  - doc
  - formatters
---

# Formatadores Intlayer

## Visão Geral

O Intlayer fornece um conjunto de helpers leves construídos sobre as APIs nativas `Intl`, além de um wrapper `Intl` com cache para evitar a construção repetida de formatadores pesados. Esses utilitários são totalmente sensíveis à localidade e podem ser usados a partir do pacote principal `intlayer`.

### Importação

```ts
import {
  Intl,
  number,
  percentage,
  currency,
  date,
  relativeTime,
  units,
  compact,
} from "intlayer";
```

Se você estiver usando React, hooks também estão disponíveis; veja `react-intlayer/format`.

## Intl com Cache

O `Intl` exportado é um wrapper leve com cache em torno do `Intl` global. Ele memoiza instâncias de `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, o que evita reconstruir o mesmo formatador repetidamente.

Como a construção do formatador é relativamente custosa, esse cache melhora a performance sem alterar o comportamento. O wrapper expõe a mesma API do `Intl` nativo, então o uso é idêntico.

- O cache é por processo e transparente para os chamadores.

> Se `Intl.DisplayNames` não estiver disponível no ambiente, um único aviso para desenvolvedores é exibido (considere usar um polyfill).

Exemplo:

```ts
import { Intl } from "intlayer";

const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"
```

## Formatadores

Todos os helpers abaixo são exportados do `intlayer`.

### `number(value, options?)`

Formata um valor numérico usando agrupamento e decimais sensíveis ao local.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Exemplos:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (em en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

Formata um número como uma string percentual.

Comportamento: valores maiores que 1 são interpretados como percentagens inteiras e normalizados (por exemplo, `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Exemplos:

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### `currency(value, options?)`

Formata um valor como moeda localizada. O padrão é `USD` com duas casas decimais.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Campos comuns: `currency` (por exemplo, `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

Exemplos:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1.234,50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
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

## Notas

- Todos os helpers aceitam entradas do tipo `string`; elas são internamente convertidas para números ou datas.
- O locale padrão é o configurado em `internationalization.defaultLocale` caso não seja fornecido.
- Essas utilidades são wrappers simples; para formatações avançadas, utilize as opções padrão do `Intl`.

## Pontos de entrada e reexportações (`@index.ts`)

Os formatadores estão no pacote core e são reexportados por pacotes de nível superior para manter os imports ergonômicos em diferentes runtimes:

Exemplos:

```ts
// Código da aplicação (recomendado)
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  Intl,
} from "intlayer";
```

### React

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
} from "intlayer/server/format";
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

> Esses hooks considerarão o locale do `IntlayerProvider` ou `IntlayerServerProvider`

## Histórico da documentação

| Versão | Data       | Alterações                             |
| ------ | ---------- | -------------------------------------- |
| 5.8.0  | 2025-08-18 | Adiciona documentação dos formatadores |
