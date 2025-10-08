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
  - Temps relatif
  - Unités
  - Compact
  - Liste
  - Internationalisation
slugs:
  - doc
  - formatters
---

# Formatteurs Intlayer

## Vue d'ensemble

Intlayer fournit un ensemble d'aides légères construites sur les API natives `Intl`, ainsi qu'un wrapper `Intl` mis en cache pour éviter de reconstruire à plusieurs reprises des formatteurs lourds. Ces utilitaires sont entièrement sensibles à la locale et peuvent être utilisés depuis le package principal `intlayer`.

### Importation

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

Si vous utilisez React, des hooks sont également disponibles ; voir `react-intlayer/format`.

## Intl mis en cache

L'`Intl` exporté est un wrapper léger et mis en cache autour de l'`Intl` global. Il mémorise les instances de `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, `ListFormat`, `DisplayNames`, `Collator` et `PluralRules`, ce qui évite de reconstruire plusieurs fois le même formateur.

Parce que la construction des formateurs est relativement coûteuse, cette mise en cache améliore les performances sans changer le comportement. Le wrapper expose la même API que l'`Intl` natif, donc l'utilisation est identique.

- La mise en cache est par processus et transparente pour les appelants.

> Si `Intl.DisplayNames` n'est pas disponible dans l'environnement, un seul avertissement destiné aux développeurs est affiché (envisagez un polyfill).

Exemples :

```ts
import { Intl } from "intlayer";

// Formatage des nombres
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// Noms affichés pour les langues, régions, etc.
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Collation pour le tri
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (égal)

// Règles de pluriel
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

## Utilitaires Intl supplémentaires

Au-delà des helpers de formatage, vous pouvez également utiliser directement le wrapper Intl mis en cache pour d'autres fonctionnalités Intl :

### `Intl.DisplayNames`

Pour les noms localisés des langues, régions, devises et scripts :

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

### `Intl.Collator`

Pour la comparaison et le tri de chaînes sensibles à la locale :

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

Pour déterminer les formes plurielles dans différentes locales :

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## Utilitaires de locale

### `getLocaleName(displayLocale, targetLocale?)`

Obtient le nom localisé d'une locale dans une autre locale :

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

- **displayLocale** : La locale pour laquelle obtenir le nom
- **targetLocale** : La locale dans laquelle afficher le nom (par défaut displayLocale)

### `getLocaleLang(locale?)`

Extrait le code langue d'une chaîne locale :

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

- **locale** : La locale dont extraire la langue (par défaut la locale courante)

### `getLocaleFromPath(inputUrl)`

Extrait le segment de locale d'une URL ou d'un chemin :

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (locale par défaut)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

- **inputUrl** : La chaîne complète de l'URL ou le chemin à traiter
- **returns** : La locale détectée ou la locale par défaut si aucune locale n'est trouvée

### `getPathWithoutLocale(inputUrl, locales?)`

Supprime le segment de locale d'une URL ou d'un chemin :

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
getPathWithoutLocale("https://example.com/en/about"); // "https://example.com/about"
```

- **inputUrl** : La chaîne complète de l'URL ou le chemin à traiter
- **locales** : Tableau optionnel des locales supportées (par défaut les locales configurées)
- **returns** : L’URL sans le segment de locale

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

Génère une URL localisée pour la locale courante :

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

- **url** : L’URL originale à localiser
- **currentLocale** : La locale courante
- **locales** : Tableau optionnel des locales supportées (par défaut les locales configurées)
- **defaultLocale** : Locale par défaut optionnelle (par défaut la locale par défaut configurée)
- **prefixDefault** : Indique s’il faut préfixer la locale par défaut (par défaut la valeur configurée)

### `getHTMLTextDir(locale?)`

Retourne la direction du texte pour une locale :

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

- **locale** : La locale pour laquelle obtenir la direction du texte (par défaut la locale courante)
- **returns** : `"ltr"`, `"rtl"`, ou `"auto"`

## Utilitaires de gestion de contenu

### `getContent(node, nodeProps, locale?)`

Transforme un nœud de contenu avec tous les plugins disponibles (traduction, énumération, insertion, etc.) :

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

- **node** : Le nœud de contenu à transformer
- **nodeProps** : Propriétés pour le contexte de transformation
- **locale** : Locale optionnelle (par défaut la locale par défaut configurée)

### `getTranslation(languageContent, locale?, fallback?)`

Extrait le contenu pour une locale spécifique à partir d'un objet de contenu multilingue :

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

- **languageContent** : Objet associant les locales au contenu
- **locale** : Locale cible (par défaut la locale par défaut configurée)
- **fallback** : Indique s'il faut revenir à la locale par défaut (par défaut à true)

### `getIntlayer(dictionaryKey, locale?, plugins?)`

Récupère et transforme le contenu d'un dictionnaire par clé :

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

- **dictionaryKey** : La clé du dictionnaire à récupérer
- **locale** : Locale optionnelle (par défaut la locale configurée par défaut)
- **plugins** : Tableau optionnel de plugins de transformation personnalisés

### `getIntlayerAsync(dictionaryKey, locale?, plugins?)`

Récupère de manière asynchrone le contenu d'un dictionnaire distant :

```ts
import { getIntlayerAsync } from "intlayer";

const content = await getIntlayerAsync("common", "fr");
```

- **dictionaryKey** : La clé du dictionnaire à récupérer
- **locale** : Locale optionnelle (par défaut la locale configurée par défaut)
- **plugins** : Tableau optionnel de plugins de transformation personnalisés

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
number("1000000", { locale: "fr" }); // "1 000 000"
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

Formate une valeur en devise localisée. Par défaut en `USD` avec deux chiffres fractionnaires.

- **value** : `number | string`
- **options** : `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Champs communs : `currency` (ex. : `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

Exemples :

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

Formate une valeur date/heure avec `Intl.DateTimeFormat`.

- **date** : `Date | string | number`
- **optionsOrPreset** : `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` ou l’un des préréglages :
  - Préréglages : `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

Exemples :

```ts
import { date } from "intlayer";

date(new Date(), "short"); // ex. : "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

Formate un temps relatif entre deux instants avec `Intl.RelativeTimeFormat`.

- Passez "now" comme premier argument et la cible comme second pour obtenir une formulation naturelle.
- **from** : `Date | string | number`
- **to** : `Date | string | number` (par défaut `new Date()`)
- **options** : `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - L’`unit` par défaut est `"second"`.

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

Formate une valeur numérique en chaîne localisée avec une unité en utilisant `Intl.NumberFormat` avec `style: 'unit'`.

- **value** : `number | string`
- **options** : `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Champs communs : `unit` (par exemple, `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
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

### `list(values, options?)`

Formate un tableau de valeurs en une chaîne de liste localisée en utilisant `Intl.ListFormat`.

- **values** : `(string | number)[]`
- **options** : `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Champs communs : `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)
  - Valeurs par défaut : `type: 'conjunction'`, `style: 'long'`

Exemples :

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

## Notes

- Tous les helpers acceptent des entrées de type `string` ; elles sont converties en interne en nombres ou en dates.
- La locale par défaut est celle configurée dans `internationalization.defaultLocale` si elle n'est pas fournie.
- Ces utilitaires sont des wrappers légers ; pour un formatage avancé, utilisez directement les options standard de `Intl`.

## Points d'entrée et réexportations (`@index.ts`)

Les formateurs résident dans le package core et sont réexportés depuis des packages de niveau supérieur pour garder des imports ergonomiques à travers les environnements d'exécution :

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

Composants client :

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
} from "react-intlayer/server/format";
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

### Vue

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
} from "vue-intlayer/format";
```

> Ces composables prendront en compte la locale depuis le `IntlayerProvider` injecté

## Historique de la documentation

| Version | Date       | Modifications                            |
| ------- | ---------- | ---------------------------------------- |
| 5.8.0   | 2025-08-20 | Ajout des formateurs vue                 |
| 5.8.0   | 2025-08-18 | Ajout de la documentation des formateurs |

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
} from "vue-intlayer/format";
```

> Ces composables prendront en compte la locale depuis le `IntlayerProvider` injecté

## Historique de la documentation

| Version | Date       | Modifications                                                                             |
| ------- | ---------- | ----------------------------------------------------------------------------------------- |
| 5.8.0   | 2025-08-20 | Ajout des formateurs vue                                                                  |
| 5.8.0   | 2025-08-18 | Ajout de la documentation des formateurs                                                  |
| 5.8.0   | 2025-08-20 | Ajout de la documentation du formateur de liste                                           |
| 5.8.0   | 2025-08-20 | Ajout d'utilitaires Intl supplémentaires (DisplayNames, Collator, PluralRules)            |
| 5.8.0   | 2025-08-20 | Ajout d'utilitaires de locale (getLocaleName, getLocaleLang, getLocaleFromPath, etc.)     |
| 5.8.0   | 2025-08-20 | Ajout d'utilitaires de gestion de contenu (getContent, getTranslation, getIntlayer, etc.) |
