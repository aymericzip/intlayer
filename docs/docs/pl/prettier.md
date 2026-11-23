---
createdAt: 2026-11-03
updatedAt: 2026-11-22
priority: 6
title: Plugin Prettier x Oxfmt | Sortowanie tłumaczeń Intlayer i poprawka .value
description: "Sortuj locale w t(), plural(), enu() i select() w deklaracjach treści oraz dodawaj .value tam, gdzie treść jest używana jako string, aby typy działały z edytorem wizualnym. Działa z Prettier i oxfmt."
keywords:
  - Intlayer
  - Prettier
  - oxfmt
  - Formatowanie
  - Sortowanie tłumaczeń
  - Sortowanie ustawień regionalnych
  - i18n
  - Internacjonalizacja
  - plural
  - enumeration
  - select
  - Edytor wizualny
  - IntlayerNode
slugs:
  - doc
  - prettier
history:
  - version: 9.8.5
    date: 2026-11-22
    changes: "Dodano przepisywanie na .value dla treści użytej jako string"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Początkowa historia"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Dodano użycie z oxfmt"
author: aymericzip
---

# Wtyczka Prettier x Oxfmt

`prettier-plugin-intlayer` robi dwie rzeczy za każdym razem, gdy Prettier formatuje plik:

1. **Sortuje tłumaczenia** w stałej kolejności. Diffy pozostają małe, konflikty przy merge są rzadsze, a brakujący locale łatwo zauważyć.
2. **Dodaje `.value`** tam, gdzie treść jest używana jako string, aby typy pozostały poprawne po włączeniu edytora wizualnego.

```ts
// przed
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// po
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Instalacja

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

```bash packageManager="npm"
npm install --save-dev prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier-plugin-intlayer
```

Wymaga Prettier w wersji 3 lub nowszej.

Jeśli Twój projekt korzysta już z Prettier, polecenie `intlayer init prettier` automatycznie zainstaluje wtyczkę i doda ją do konfiguracji.

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt nie potrafi wczytywać wtyczek zewnętrznych, dlatego sortowanie odbywa się przez Prettier. Zainstaluj Prettier obok oxfmt. Służy on tylko do sortowania deklaracji zawartości, a oxfmt nadal formatuje Twój projekt.

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

Wymaga Prettier w wersji 3 lub nowszej. `intlayer init` konfiguruje wtyczkę tylko w projektach, które już używają Prettier, więc skonfiguruj ją ręcznie, jak pokazano poniżej.

  </Tab>
</Tabs>

## Użycie

Wtyczka działa z Prettier oraz z [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

Dodaj wtyczkę do konfiguracji Prettier:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

Aby sortować tylko deklaracje treści, użyj override. Przepisywanie `.value` nie działa wtedy na Twoich komponentach:

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

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

Skrypt formatowania uruchamia dwa narzędzia, każde z jednym zadaniem:

1. **Prettier** uruchamia plugin. Pierwszy glob sortuje deklaracje treści, drugi dodaje `.value` w komponentach. Usuń drugi glob, jeśli chcesz tylko sortować.
2. **oxfmt** formatuje cały projekt, łącznie z deklaracjami zawartości.

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" \"src/**/*.{ts,tsx,js,jsx}\" && oxfmt"
  }
}
```

Zachowaj tę kolejność. oxfmt zastępuje formatowanie Prettier własnym, ale nigdy nie zmienia kolejności kluczy obiektów, więc posortowana kolejność zostaje zachowana.

Ta konfiguracja ma kilka ograniczeń:

- **Formatowanie przy zapisie.** Edytor formatujący przez oxfmt nie uruchamia pluginu. Zamiast tego uruchom skrypt `format`.
- **Tryb check.** Nie używaj `prettier --check` na plikach sformatowanych przez oxfmt: formatowanie się różni, więc zgłasza każdy plik. Aby sprawdzić kolejność w CI, uruchom skrypt `format` i przerwij job, jeśli pojawią się zmiany:

```bash
npm run format && git diff --exit-code
```

  </Tab>
</Tabs>

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
  zero: "No jobs",
  one: "{{count}} job",
  other: "{{count}} jobs",
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

### Identyczne tłumaczenia

W plikach `*.content.*` wywołanie `t()`, w którym wszystkie locale zawierają ten sam ciąg, jest zastępowane tym ciągiem. Zwykły ciąg jest zwracany dla każdej locale, więc wynik się nie zmienia.

```ts
// przed
nextjs: t({ en: "Next.js", fr: "Next.js", es: "Next.js" }),

// po
nextjs: "Next.js",
```

`t()` z jedną locale, argumentem typu (`t<string>()`), komentarzem lub wartościami innymi niż ciągi zostaje zachowane. Ustaw `intlayerCollapseIdenticalTranslations: false`, aby to wyłączyć.

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

## Treść użyta jako string

Przy włączonym [edytorze wizualnym](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) (`editor.enabled: true`) pole zwracane przez `useIntlayer` lub `getIntlayer` jest renderowalnym węzłem, a nie stringiem. Przekazanie go do atrybutu natywnego elementu lub wywołanie na nim metody stringa nie przechodzi już type-checku. Template literals, konkatenacja i `String()` przyjmują dowolny typ i pozostają bez zmian. Plugin dodaje `.value`, które zawiera string niezależnie od tego, czy edytor jest włączony.

```tsx
// przed
const content = useIntlayer("home");
const upper = content.name.toUpperCase();
<img alt={content.alt} />;
<h1>{content.title.value}</h1>;

// po
const upper = content.name.value.toUpperCase();
<img alt={content.alt.value} />;
<h1>{content.title}</h1>;
```

Przepisywane:

- metody stringa: `content.name.toUpperCase()`
- atrybuty natywnych elementów: `<img alt={content.alt} />`

Pozostawiane bez zmian, bo przyjmują węzeł:

- dzieci JSX: `<h1>{content.title}</h1>`
- propsy komponentów: `<Card title={content.title} />`
- tagged templates: `` html`<h1>${content.title}</h1>` `` (Lit)

Dotyczy to komponentów, a nie deklaracji treści, więc plugin musi działać na plikach komponentów. Zmienna, której nazwa jest ponownie zadeklarowana w innym miejscu pliku, jest pomijana. Szablony Vue i Svelte nie są przepisywane: użyj dla nich [reguły ESLint `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md), która też ma autofix.

Usuwa też `.value` z dziecka JSX: `<h1>{content.title.value}</h1>` staje się `<h1>{content.title}</h1>`, aby edytor wizualny mógł zaznaczyć tekst. Dotyczy React, Next.js, Preact, Solid i React Native.

Wyłącz za pomocą `intlayerNodeValueAccess: false`.

## Opcje

| Opcja                                   | Domyślnie | Opis                                                                                                             |
| --------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`                 | `["en"]`  | Ustawienia regionalne umieszczane na początku w `t()`, w tej kolejności. Przekaż `[]`, aby posortować wszystkie. |
| `intlayerSortContentKeys`               | `false`   | W plikach `*.content.*` sortuje także klucze zawartości słownika i obiekty zagnieżdżone.                         |
| `intlayerCollapseIdenticalTranslations` | `true`    | W plikach `*.content.*` zastępuje `t()`, w którym wszystkie locale zawierają ten sam ciąg, tym ciągiem.          |
| `intlayerNodeValueAccess`               | `true`    | Dodaje `.value` tam, gdzie treść jest używana jako string (`alt={content.alt}`, `content.name.toUpperCase()`).   |

## Co pozostaje bez zmian

- Obiekty zawierające operator rozproszenia (`...base`), klucz obliczany (`[key]`), metodę lub zduplikowany klucz.
- Mapy `plural()` z kluczem, który nie jest kategorią CLDR.
- Mapy `enu()`, których nowa kolejność zmieniłaby wynikowy tekst.
- Wywołania innych funkcji o nazwach takich samych jak helpery, ale z argumentem innym niż obiekt.

Komentarze przenoszą się razem z kluczem, do którego należą.

## Obsługiwane parsery

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` oraz `jsonc`. Bloki `<script>` plików Vue, Svelte i Astro są formatowane za pomocą tych parserów.

> **Znane ograniczenie.** Prettier uruchamia tylko jedną wtyczkę na dany parser. Jeśli inna wtyczka również zastępuje parsery JavaScript/TypeScript (na przykład `prettier-plugin-tailwindcss`), tylko ostatnia wymieniona wtyczka zostanie zastosowana do tych plików. Ogranicz `prettier-plugin-intlayer` do plików `*.content.*` za pomocą reguły override, aby uniknąć konfliktów. W oxfmt klasy Tailwind są sortowane przez wbudowaną opcję `sortTailwindcss`, więc ten konflikt nie występuje. W takim przypadku użyj [reguły ESLint `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md) dla `.value` w komponentach.
