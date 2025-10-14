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
    changes: Adicionados formatadores para Vue
  - version: 5.8.0
    date: 2025-08-18
    changes: Adicionada documentação dos formatadores
  - version: 5.8.0
    date: 2025-08-20
    changes: Adicionar documentação do formatador de listas
  - version: 5.8.0
    date: 2025-08-20
    changes: Adicionar utilitários adicionais do Intl (DisplayNames, Collator, PluralRules)
  - version: 5.8.0
    date: 2025-08-20
    changes: Adicionar utilitários de locale (getLocaleName, getLocaleLang, getLocaleFromPath, etc.)
  - version: 5.8.0
    date: 2025-08-20
    changes: Adicionar utilitários para manipulação de conteúdo (getContent, getTranslation, getIntlayer, etc.)
---

# Formatadores Intlayer

## Visão Geral

O Intlayer fornece um conjunto de helpers leves construídos sobre as APIs nativas `Intl`, além de um wrapper `Intl` em cache para evitar a construção repetida de formatadores pesados. Esses utilitários são totalmente sensíveis à localidade e podem ser usados a partir do pacote principal `intlayer`.

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
  list,
  getLocaleName,
  getLocaleLang,
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedUrl,
  getHTMLTextDir,
  getContent,
  getTranslation,
  getIntlayer,
  getIntlayerAsync,
} from "intlayer";
```

Se estiver a usar React, os hooks também estão disponíveis; veja `react-intlayer/format`.

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

## Utilitários adicionais do Intl

Além dos auxiliares de formatadores, você também pode usar diretamente o wrapper Intl em cache para outros recursos do Intl:

### `Intl.DisplayNames`

Para nomes localizados de idiomas, regiões, moedas e scripts:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

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

### `getLocaleLang(locale?)`

Extrai o código de idioma de uma string de locale:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

- **locale**: O locale do qual extrair o idioma (padrão é o locale atual)

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

### `getPathWithoutLocale(inputUrl, locales?)`

Remove o segmento de locale de uma URL ou caminho:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
getPathWithoutLocale("https://example.com/en/about"); // "https://example.com/about"
```

- **inputUrl**: A string completa da URL ou caminho para processar
- **locales**: Array opcional de locales suportados (padrão para os locales configurados)
- **returns**: A URL sem o segmento de locale

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

Gera uma URL localizada para o locale atual:

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

- **url**: A URL original para localizar
- **currentLocale**: O locale atual
- **locales**: Array opcional de locales suportados (padrão para os locales configurados)
- **defaultLocale**: Locale padrão opcional (padrão para o locale padrão configurado)
- **prefixDefault**: Se deve prefixar o locale padrão (padrão para o valor configurado)

### `getHTMLTextDir(locale?)`

Retorna a direção do texto para um locale:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

- **locale**: O locale para obter a direção do texto (padrão para o locale atual)
- **returns**: `"ltr"`, `"rtl"` ou `"auto"`

## Utilitários para Manipulação de Conteúdo

### `getContent(node, nodeProps, locale?)`

Transforma um nó de conteúdo com todos os plugins disponíveis (tradução, enumeração, inserção, etc.):

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

- **node**: O nó de conteúdo a ser transformado
- **nodeProps**: Propriedades para o contexto da transformação
- **locale**: Locale opcional (padrão para o locale padrão configurado)

### `getTranslation(languageContent, locale?, fallback?)`

Extrai conteúdo para um locale específico a partir de um objeto de conteúdo multilíngue:

```ts
import { getTranslation } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    de: "Hallo",
  },
  "fr",
  true
); // "Bonjour"
```

- **languageContent**: Objeto que mapeia locales para conteúdo
- **locale**: Locale alvo (padrão para o locale padrão configurado)
- **fallback**: Se deve retornar ao locale padrão (padrão é true)

### `getIntlayer(dictionaryKey, locale?, plugins?)`

Recupera e transforma conteúdo de um dicionário pela chave:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

- **dictionaryKey**: A chave do dicionário a ser recuperada
- **locale**: Locale opcional (padrão para o locale padrão configurado)
- **plugins**: Array opcional de plugins de transformação personalizados

### `getIntlayerAsync(dictionaryKey, locale?, plugins?)`

Recupera conteúdo de um dicionário remoto de forma assíncrona:

```ts
import { getIntlayerAsync } from "intlayer";

const content = await getIntlayerAsync("common", "fr");
```

- **dictionaryKey**: A chave do dicionário a ser recuperada
- **locale**: Locale opcional (padrão para o locale padrão configurado)
- **plugins**: Array opcional de plugins de transformação personalizados

## Formatadores

Todos os helpers abaixo são exportados de `intlayer`.

### `number(value, options?)`

Formata um valor numérico usando agrupamento e decimais sensíveis ao locale.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Exemplos:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (em en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

Formata um número como uma string percentual.

Comportamento: valores maiores que 1 são interpretados como percentuais inteiros e normalizados (ex.: `25` → `25%`, `0.25` → `25%`).

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

## Notas

- Todos os helpers aceitam entradas do tipo `string`; elas são internamente convertidas para números ou datas.
- O locale padrão é o configurado em `internationalization.defaultLocale`, caso não seja fornecido.
- Essas utilidades são wrappers simples; para formatações avançadas, utilize diretamente as opções padrão do `Intl`.

## Pontos de entrada e re-exportações (`@index.ts`)

Os formatadores estão no pacote core e são re-exportados por pacotes de nível superior para manter as importações ergonômicas em diferentes runtimes:

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
  list,
  Intl,
  getLocaleName,
  getLocaleLang,
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedUrl,
  getHTMLTextDir,
  getContent,
  getTranslation,
  getIntlayer,
  getIntlayerAsync,
} from "intlayer";
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
