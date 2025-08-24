---
createdAt: 2024-08-13
updatedAt: 2025-08-20
title: Formatteurs
description: Utilitaires de formatage sensibles à la locale basés sur Intl pour les nombres, pourcentages, devises, dates, temps relatifs, unités et notation compacte. Inclut un helper Intl mis en cache.
keywords:
  - Formatteurs
  - Intl
  - Nombre
  - Devise
  - Pourcentage
  - Date
  - Temps Relatif
  - Unités
  - Compact
  - Internationalisation
slugs:
  - doc
  - formatters
---

# Formatteurs Intlayer

## Vue d'ensemble

Intlayer fournit un ensemble d'aides légères construites au-dessus des API natives `Intl`, ainsi qu'un wrapper `Intl` mis en cache pour éviter de reconstruire à plusieurs reprises des formatteurs lourds. Ces utilitaires sont entièrement sensibles à la locale et peuvent être utilisés depuis le package principal `intlayer`.

### Import

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

Si vous utilisez React, des hooks sont également disponibles ; voir `react-intlayer/format`.

## Intl mis en cache

L'`Intl` exporté est un wrapper léger et mis en cache autour de l'`Intl` global. Il mémorise les instances de `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, ce qui évite de reconstruire le même formateur à plusieurs reprises.

Comme la construction des formatteurs est relativement coûteuse, cette mise en cache améliore les performances sans changer le comportement. Le wrapper expose la même API que l'`Intl` natif, donc l'utilisation est identique.

- La mise en cache est par processus et transparente pour les appelants.

> Si `Intl.DisplayNames` n'est pas disponible dans l'environnement, un seul avertissement destiné aux développeurs est affiché (envisagez un polyfill).

Exemple :

```ts
import { Intl } from "intlayer";

const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"
```

## Formatteurs

Tous les helpers ci-dessous sont exportés depuis `intlayer`.

### `number(value, options?)`

Formate une valeur numérique en utilisant le regroupement et les décimales adaptés à la locale.

- **value** : `number | string`
- **options** : `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Exemples :

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (en en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

Formate un nombre en chaîne de pourcentage.

Comportement : les valeurs supérieures à 1 sont interprétées comme des pourcentages entiers et normalisées (par exemple, `25` → `25%`, `0.25` → `25%`).

- **value** : `number | string`
- **options** : `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Exemples :

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23,7%"
```

### `currency(value, options?)`

Formate une valeur en devise localisée. Par défaut, la devise est `USD` avec deux chiffres fractionnaires.

- **value** : `number | string`
- **options** : `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Champs courants : `currency` (ex. `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

Exemples :

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1 234,50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

Formate une valeur de date/heure avec `Intl.DateTimeFormat`.

- **date** : `Date | string | number`
- **optionsOrPreset** : `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` ou l'un des préréglages :
  - Préréglages : `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

Exemples :

```ts
import { date } from "intlayer";

date(new Date(), "short"); // par ex., "02/08/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

Formate le temps relatif entre deux instants avec `Intl.RelativeTimeFormat`.

- Passez "now" comme premier argument et la cible comme second pour obtenir une formulation naturelle.
- **from** : `Date | string | number`
- **to** : `Date | string | number` (par défaut `new Date()`)
- **options** : `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - L'`unit` par défaut est `"second"`.

Exemples :

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "dans 3 jours"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "il y a 2 heures"
```

### `units(value, options?)`

Formate une valeur numérique en une chaîne d'unité localisée en utilisant `Intl.NumberFormat` avec `style: 'unit'`.

- **value** : `number | string`
- **options** : `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Champs courants : `unit` (par exemple, `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - Valeurs par défaut : `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

Exemples :

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (dépendant de la locale)
```

### `compact(value, options?)`

Formate un nombre en utilisant la notation compacte (par exemple, `1.2K`, `1M`).

- **value** : `number | string`
- **options** : `Intl.NumberFormatOptions & { locale?: LocalesValues }` (utilise `notation: 'compact'` en interne)

Exemples :

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

## Notes

- Tous les helpers acceptent des entrées de type `string` ; elles sont converties en interne en nombres ou dates.
- La locale par défaut est celle configurée dans `internationalization.defaultLocale` si elle n'est pas fournie.
- Ces utilitaires sont des wrappers légers ; pour un formatage avancé, utilisez directement les options standard d'`Intl`.

## Points d'entrée et réexportations (`@index.ts`)

Les formateurs résident dans le package core et sont réexportés depuis des packages de plus haut niveau pour garder des imports ergonomiques à travers les environnements d'exécution :

Exemples :

```ts
// Code de l'application (recommandé)
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

Composants client :

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
// ou dans les applications Next.js
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

Composants serveur (ou runtime React Server) :

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
// ou dans les applications Next.js
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

> Ces hooks prendront en compte la locale depuis le `IntlayerProvider` ou `IntlayerServerProvider`

## Historique de la documentation

| Version | Date       | Modifications                            |
| ------- | ---------- | ---------------------------------------- |
| 5.8.0   | 2025-08-18 | Ajout de la documentation des formatters |
