---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Wtyczka Prettier | Sortowanie tłumaczeń Intlayer
description: "Sortuj ustawienia regionalne w t(), kategorie plural(), warunki enu(), przypadki select() oraz klucze deklaracji zawartości za pomocą prettier-plugin-intlayer."
keywords:
  - Intlayer
  - Prettier
  - Formatowanie
  - Sortowanie tłumaczeń
  - Sortowanie ustawień regionalnych
  - i18n
  - Internacjonalizacja
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "Początkowa historia"
author: aymericzip
---

# Wtyczka Prettier

`prettier-plugin-intlayer` układa klucze Twoich tłumaczeń w stałej kolejności przy każdym formatowaniu pliku przez Prettier. Różnice w kodzie (diffs) pozostają małe, konflikty scalania (merge conflicts) stają się rzadsze, a brakujące ustawienie regionalne można natychmiast zauważyć.

```ts
// przed
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// po
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Instalacja

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

Wymaga Prettier w wersji 3 lub nowszej.

Jeśli Twój projekt korzysta już z Prettier, polecenie `intlayer init prettier` automatycznie zainstaluje wtyczkę i doda ją do konfiguracji.

## Użycie

Dodaj wtyczkę do konfiguracji Prettier:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

Aby zastosować ją wyłącznie do deklaracji zawartości, użyj nadpisania (override):

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

## Co podlega sortowaniu

### `t()`: ustawienia regionalne (locales)

Przypięte ustawienia regionalne występują jako pierwsze (domyślnie `en`). Pozostałe ustawienia regionalne są sortowane alfabetycznie.

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()`: kolejność CLDR

Kategorie układają się od najmniejszej ilości do wartości zapasowej (fallback): `zero`, `one`, `two`, `few`, `many`, `other`.

```ts
plural({
  one: "{{count}} вакансия",
  few: "{{count}} вакансии",
  many: "{{count}} вакансий",
  other: "{{count}} вакансий",
});
```

### `enu()`: rosnące progi

Warunki są sortowane według wartości liczbowej, a następnie według operatora (`<1`, `<=1`, `1`, `>=1`, `>1`). Wartość `fallback` znajduje się na końcu.

```ts
enu({
  "<-1": "Less than minus one car",
  "0": "No cars",
  "2": "Two cars",
  ">=3": "Many cars",
  fallback: "Some cars",
});
```

W czasie wykonywania wygrywa pierwszy pasujący warunek. Wtyczka stosuje nową kolejność tylko wtedy, gdy każda wartość liczbowa nadal daje dokładnie taką samą zawartość. Jeśli kolejność decyduje o wyniku, obiekt pozostaje bez zmian. Na przykład w `{ '<1': …, '<=-2.3': … }` klucz `'<1'` obejmuje każdą liczbę ujemną.

### `select()`: alfabetycznie

Przypadki są sortowane alfabetycznie, a `fallback` znajduje się na końcu.

```ts
select({
  draft: "This post is a draft",
  published: "This post is live",
  scheduled: "This post is scheduled",
  fallback: "Unknown status",
});
```

Bez klucza `fallback` lub `other` ostatni przypadek służy jako fallback. Ten przypadek pozostaje na końcu i tylko przypadki przed nim są sortowane.

### Pliki `.content.json`

Forma zserializowana jest sortowana w ten sam sposób: `{ "nodeType": "translation", "translation": { … } }`, jak również węzły `plural`, `enumeration` oraz `select`.

### Klucze zawartości (opcjonalnie)

Po włączeniu `intlayerSortContentKeys: true` wtyczka sortuje również klucze `content` słownika alfabetycznie na każdym poziomie zagnieżdżenia. Dotyczy to wyłącznie plików `*.content.*`.

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

Sortowanie przechodzi przez każdą funkcję pomocniczą (`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…), aby dotrzeć do obiektów wewnątrz nich. Wewnętrzna mapa kluczy każdego helpera zachowuje swój porządek. Klucze przekazywane do `cond()` i `gender()` nigdy nie zmieniają kolejności, ponieważ ich ostatni klucz służy jako fallback. Pola znajdujące się obok `content` (`key`, `title`, `locale`…) pozostają nienaruszone.

## Opcje

| Opcja                     | Domyślnie | Opis                                                                                                             |
| ------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`   | `["en"]`  | Ustawienia regionalne umieszczane na początku w `t()`, w tej kolejności. Przekaż `[]`, aby posortować wszystkie. |
| `intlayerSortContentKeys` | `false`   | W plikach `*.content.*` sortuje także klucze zawartości słownika i obiekty zagnieżdżone.                         |

## Co pozostaje bez zmian

- Obiekty zawierające operator rozproszenia (`...base`), klucz obliczany (`[key]`), metodę lub zduplikowany klucz.
- Mapy `plural()` z kluczem, który nie jest kategorią CLDR.
- Mapy `enu()`, których nowa kolejność zmieniłaby wynikowy tekst.
- Wywołania innych funkcji o nazwach takich samych jak helpery, ale z argumentem innym niż obiekt.

Komentarze przenoszą się razem z kluczem, do którego należą.

## Obsługiwane parsery

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` oraz `jsonc`. Bloki `<script>` plików Vue, Svelte i Astro są formatowane za pomocą tych parserów.

> **Znane ograniczenie.** Prettier uruchamia tylko jedną wtyczkę na dany parser. Jeśli inna wtyczka również zastępuje parsery JavaScript/TypeScript (na przykład `prettier-plugin-tailwindcss`), tylko ostatnia wymieniona wtyczka zostanie zastosowana do tych plików. Ogranicz `prettier-plugin-intlayer` do plików `*.content.*` za pomocą reguły override, aby uniknąć konfliktów.
