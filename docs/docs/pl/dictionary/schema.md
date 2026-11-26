---
createdAt: 2026-11-25
updatedAt: 2026-11-25
priority: 8
title: "Walidacja słowników za pomocą schematów (Zod)"
description: "Zadeklaruj schematy Zod w intlayer.config.ts i podepnij je do słowników, aby walidować każdą lokalizację podczas builda i typować treść w edytorze."
keywords:
  - Schemat
  - Zod
  - Walidacja
  - Słownik
  - Deklaracja zawartości
  - Bezpieczeństwo typów
  - Intlayer
slugs:
  - doc
  - concept
  - content
  - schema
history:
  - version: 9.9.0
    date: 2026-11-25
    changes: "Inicjalizacja dokumentacji"
author: aymericzip
---

# Walidacja słowników za pomocą schematów

Schemat opisuje oczekiwany kształt zawartości słownika. Deklarujesz go raz w `intlayer.config.ts`, nadajesz mu nazwę, a następnie podpinasz tę nazwę do dowolnego słownika przez pole `schema`.

Intlayer wtedy:

- **Waliduje** słownik dla każdej lokalizacji podczas budowania słowników i zgłasza każdy błąd wraz z lokalizacją i ścieżką pola.
- **Typuje** zawartość słownika w edytorze, dzięki czemu brakujące pole lub pole o złym typie zostaje wykryte przed buildem.

Schematy przydają się, gdy kilka słowników musi mieć tę samą strukturę (metadane SEO, karty produktów, wpisy w stylu CMS), albo gdy treść musi spełniać ograniczenia, których TypeScript nie potrafi wyrazić, na przykład maksymalną długość każdego tłumaczenia.

<AccordionGroup>
<Accordion header="Metadane Markdown">

Weryfikuj pola frontmatter, takie jak `title`, `description`, `date` i `tags`, przed renderowaniem Markdown. Wymagane pola i oczekiwane typy są sprawdzane podczas budowania słowników. Błędne metadane są zgłaszane wraz z lokalizacją i ścieżką pola.

</Accordion>
<Accordion header="Metadane SEO strony">

Weryfikuj metadane używane do wyświetlania tytułów i opisów stron, kanonicznych adresów URL, obrazów społecznościowych i dyrektyw indeksowania. Schemat może wymagać tytułu o długości od 1 do 60 znaków, ograniczyć opis do 160 znaków i sprawdzać poprawność adresów URL. Nieprawidłowa treść lokalizacji zostanie odrzucona, zanim spowoduje błąd wyświetlania strony.

</Accordion>
<Accordion header="Współdzielona treść strukturalna">

Przypisz ten sam schemat słownikom o wspólnej strukturze, takim jak produkty, elementy nawigacji czy szablony e-maili. Brak pola lub wartość niewłaściwego typu unieważnia słownik podczas budowania, pomagając zatrzymać niespójną treść przed dotarciem do aplikacji.

</Accordion>
</AccordionGroup>

<Steps>
<Step number={1} title="Zadeklaruj schematy w konfiguracji">

Zainstaluj [Zod](https://zod.dev):

```bash packageManager="npm"
npm install zod --save-dev
```

```bash packageManager="pnpm"
pnpm add zod --save-dev
```

```bash packageManager="yarn"
yarn add zod --dev
```

```bash packageManager="bun"
bun add zod --dev
```

Następnie zadeklaruj schematy pod kluczem `schemas`. Każdy klucz to nazwa, do której będziesz się odwoływać w słownikach.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(10).max(60),
      description: z.string().min(50).max(160),
    }),
    "product-card": z.object({
      name: z.string(),
      price: z.number().positive(),
      tags: z.array(z.string()),
    }),
  },
};

export default config;
```

</Step>
<Step number={2} title="Podepnij schemat do słownika">

Ustaw pole `schema` słownika na jedną z nazw zadeklarowanych w konfiguracji.

```typescript fileName="src/about/aboutMetadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutMetadataContent = {
  key: "about-metadata",
  schema: "seo-metadata",
  content: {
    title: t({
      en: "About us | Our story",
      fr: "À propos | Notre histoire",
      es: "Sobre nosotros | Nuestra historia",
    }),
    description: t({
      en: "Discover the team, the mission and the values behind our product.",
      fr: "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
      es: "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
    }),
  },
} satisfies Dictionary<undefined, "seo-metadata">;

export default aboutMetadataContent;
```

```json5 fileName="src/about/aboutMetadata.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-metadata",
  "schema": "seo-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About us | Our story",
        "fr": "À propos | Notre histoire",
        "es": "Sobre nosotros | Nuestra historia",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover the team, the mission and the values behind our product.",
        "fr": "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
        "es": "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
      },
    },
  },
}
```

Ten sam schemat można podpiąć do dowolnej liczby słowników.

</Step>
<Step number={3} title="Uruchom build i przeczytaj raport">

Walidacja uruchamia się przy każdym budowaniu słowników: przez `npx intlayer build` lub przez plugin twojego bundlera w trybie dev i build. Jeśli tłumaczenie łamie schemat, Intlayer wypisuje lokalizację, ścieżkę pola i komunikat Zod:

```bash
[intlayer] Local dictionary about-metadata has invalid content according to schema seo-metadata for locale French (fr) - src/about/aboutMetadata.content.ts
[intlayer] ✗ Error: about-metadata - French (fr) - title: Too big: expected string to have <=60 characters
```

Jednorazowe wywołanie `intlayer build` kończy się błędem, jeśli schemat jest nieznany lub walidacja się nie powiedzie. W trybie obserwacji Intlayer pomija nieprawidłowy słownik do czasu poprawienia jego zawartości.

</Step>
</Steps>

## Typowanie zawartości na podstawie schematu

Parametry generyczne `Dictionary` decydują, jak ściśle TypeScript sprawdza słownik:

| Deklaracja                                              | Pole `schema`                           | Pole `content`                      |
| ------------------------------------------------------- | --------------------------------------- | ----------------------------------- |
| `satisfies Dictionary`                                  | Autouzupełniane, nieznana nazwa to błąd | Nie sprawdzane przez TypeScript     |
| `satisfies Dictionary<undefined, "seo-metadata">`       | Musi mieć wartość `"seo-metadata"`      | Typowane ze schematu                |
| `satisfies Dictionary<{ cta: string }, "seo-metadata">` | Musi mieć wartość `"seo-metadata"`      | Typowane ze schematu i twojego typu |

Przy typowanym schemacie każde pole przyjmuje zwykłą wartość albo węzeł zawartości, który tę wartość zwraca, więc `t()` nadal jest dozwolone:

```typescript fileName="src/product/productCard.content.ts"
import { t, type Dictionary } from "intlayer";

const productCardContent = {
  key: "product-card",
  schema: "product-card",
  content: {
    name: t({ en: "Running shoes", fr: "Chaussures de course" }),
    price: "89", // ❌ Type 'string' is not assignable to type 'number'
    tags: ["sport", "outdoor"],
  },
} satisfies Dictionary<undefined, "product-card">;

export default productCardContent;
```

> Intlayer generuje te typy z twoich schematów Zod w `.intlayer/types` przy każdym budowaniu słowników. Typowany jest tylko kształt: ograniczenia takie jak `.min()`, `.max()` czy `.regex()` są sprawdzane podczas builda.

## Co jest walidowane

Dla każdej lokalizacji z `internationalization.locales` Intlayer rozwiązuje zawartość słownika dla tej lokalizacji, a następnie waliduje wynik. Schemat opisuje więc końcową wartość pola (`title: string`), a nie węzeł `t()` przechowujący tłumaczenia.

- **Brakujące tłumaczenia**: przy domyślnym `strictMode` brakujące tłumaczenie przed walidacją jest zastępowane domyślną lokalizacją. Przy `strictMode: "strict"` brakujące tłumaczenie powoduje błąd wymaganego pola.
- **Inne węzły zawartości**: `enu()`, `plural()`, `cond()`, `gender()`, `select()` i `insert()` są rozwiązywane do funkcji, a `md()` lub `html()` do węzłów. Deklaruj takie pola przez `z.any()`, a ograniczenia trzymaj na polach rozwiązywanych do zwykłych wartości.
- **Nie walidowane**: zawartość zwracana przez funkcję lub Promise ([function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/function_fetching.md)) oraz słowniki pobierane z [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

## Użycie innej biblioteki walidacji

Wpisy `schemas` nie są związane z Zod. Działa każdy obiekt udostępniający zgodną z Zod metodę `safeParse(data)`, o ile zwraca `{ success: true }` lub `{ success: false, error: { issues } }`, gdzie każdy issue ma tablicę `path` i `message`. Typowanie zawartości jest generowane tylko ze schematów Zod: przy innej bibliotece zawartość podpiętych słowników ma typ `any`.

## Często zadawane pytania

<FAQ>

<Question title="Czy błąd schematu zatrzymuje mój build?">

Jednorazowe wywołanie `intlayer build` kończy się błędem, jeśli słownik nie jest zgodny ze swoim schematem. W trybie obserwacji Intlayer rejestruje błędy i pomija nieprawidłowy słownik, dopóki go nie poprawisz i nie zapiszesz.

</Question>
<Question title="Czy kilka słowników może współdzielić ten sam schemat?">

Tak. Schemat jest wskazywany po nazwie, więc może się do niego odwoływać dowolna liczba słowników. To główny przypadek użycia: wymuszenie jednej struktury dla wszystkich metadanych stron, wpisów produktów czy szablonów e-maili.

</Question>
<Question title="Co się stanie, jeśli nazwa schematu nie istnieje?">

TypeScript zgłosi błąd, gdy tylko zadeklarowany jest co najmniej jeden schemat, bo pole `schema` przyjmuje tylko zadeklarowane nazwy. W przypadku pliku JSON Intlayer zgłasza nieznaną nazwę schematu podczas budowania i odrzuca słownik.

</Question>
<Question title="Czy walidowana jest każda lokalizacja, czy tylko domyślna?">

Każda lokalizacja z `internationalization.locales`. Raport wskazuje lokalizację z błędem, więc łatwo znaleźć tłumaczenie, które jest za długie tylko po niemiecku.

</Question>

</FAQ>

## Zobacz także

- [Pliki deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md)
- [Konfiguracja](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)
- [Tłumaczenie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/translation.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
