---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migracja z svelte-i18n do Intlayer"
description: "Przenieś aplikację Svelte lub SvelteKit z svelte-i18n do Intlayer krok po kroku. Stores $_, $date i $number działają dalej dzięki compat adapterowi @intlayer/svelte-i18n."
keywords:
  - svelte-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Svelte
  - SvelteKit
  - Vite
slugs:
  - doc
  - migration
  - svelte-i18n
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migracja z svelte-i18n do Intlayer

## Dlaczego warto przejść z svelte-i18n na Intlayer?

<AccordionGroup>
<Accordion header="Rozmiar bundla">

svelte-i18n rejestruje całe pliki locale przy starcie. Intlayer dostarcza tylko słowniki używane przez daną stronę, co **zmniejsza rozmiar bundli i stron nawet o 50%**.

</Accordion>
<Accordion header="Łatwość utrzymania">

Klucze są **typowane** względem Twoich słowników: nieprawidłowe klucze kończą się błędem podczas buildu. Treść może leżeć obok komponentów, które z niej korzystają.

</Accordion>
<Accordion header="Agent AI">

Treść obok komponentów **zmniejsza potrzebny kontekst** dla LLM. Intlayer udostępnia **CLI** do wykrywania brakujących tłumaczeń, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**, **[serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)** oraz **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**.

</Accordion>
<Accordion header="Automatyzacja">

Tłumacz brakujące komunikaty w pipeline CI/CD za pomocą wybranego LLM albo w tle przez [platformę webową](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

</Accordion>
<Accordion header="Skalowanie z osobami nietechnicznymi">

Intlayer udostępnia self-hosted **[edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)** i **[pełny CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)**, dzięki którym tłumacze i copywriterzy edytują treść w czasie rzeczywistym.

</Accordion>
</AccordionGroup>

> Aby zrozumieć, skąd wzięły się te biblioteki, przeczytaj [historię i18n w JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/history_of_i18n.md).

## Strategie migracji

1. **Compat adapter (zalecany dla istniejących aplikacji)**: zainstaluj `@intlayer/svelte-i18n`. Udostępnia to samo API co `svelte-i18n` (`init`, `locale`, `$_` / `$t`, `$json`, `$date`, `$time`, `$number`, `getLocaleFromNavigator`…) i serwuje komunikaty ze słowników Intlayer. ICU MessageFormat działa jak wcześniej.
2. **Pełna migracja**: stopniowo zastępuj stores svelte-i18n przez `useIntlayer` z `svelte-intlayer` i pliki `.content.ts` obok komponentów.

## Spis treści

<TOC/>

## Szybka migracja

<Steps>
<Step number={1} title="Instalacja zależności">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> Flaga `--interactive` jest opcjonalna. Użyj `intlayer-cli init`, jeśli jesteś agentem AI.

Polecenie wykrywa Twoje środowisko i instaluje potrzebne packages, na przykład:

```bash packageManager="npm"
npm install intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

> Pozostaw `svelte-i18n` zainstalowany: dostarcza typy TypeScript.

</Step>
<Step number={2} title="Konfiguracja Intlayer">

Wskaż pluginowi `syncJSON` istniejące pliki z komunikatami. Przy jednym pliku na namespace (`src/locales/en/home.json`) każdy plik staje się słownikiem:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // svelte-i18n uses ICU MessageFormat
      format: "icu",
      // ./src/locales/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `$_('home.title')` jest rozwiązywane do pola `title` słownika `home`. Jeśli używasz jednego pliku na locale (`src/locales/en.json`) z zagnieżdżonymi namespaces, użyj zamiast tego `source: ({ locale }) => \`./src/locales/${locale}.json\``: każdy klucz najwyższego poziomu staje się słownikiem.

</Step>
<Step number={3} title="Dodanie pluginu Vite">

`svelteI18nVitePlugin()` uruchamia build Intlayer i tworzy alias `svelte-i18n` na `@intlayer/svelte-i18n`, bez zmian w plikach źródłowych.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteI18nVitePlugin } from "@intlayer/svelte-i18n/plugin";

export default defineConfig({
  plugins: [svelte(), svelteI18nVitePlugin()],
});
```

> W SvelteKit dodaj `svelteI18nVitePlugin()` po `sveltekit()` w tej samej tablicy `plugins`.

</Step>
<Step number={4} title="Uproszczenie konfiguracji i18n">

Zachowaj `init()`, ale usuń `register()` i `addMessages()`: komunikaty pochodzą ze słowników Intlayer.

```typescript fileName="src/lib/i18n.ts"
import { getLocaleFromNavigator, init } from "svelte-i18n";

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

</Step>
</Steps>

Twoje komponenty działają dalej bez zmian:

```svelte fileName="src/App.svelte"
<script lang="ts">
  import { _, date, number } from "svelte-i18n";
</script>

<h1>{$_("home.title")}</h1>
<p>{$_("home.greeting", { values: { name: "Ada" } })}</p>
<p>{$date(new Date(), { format: "long" })}</p>
<p>{$number(1234.5, { style: "currency", currency: "EUR" })}</p>
```

Ustawienie `$locale = 'fr'` zmienia język zarówno dla stores svelte-i18n, jak i dla `useIntlayer`.

## Pełna migracja

<Steps>
<Step number={5} title="Jawna zmiana nazw importów (opcjonalnie)" isOptional={true}>

Plugin Vite już obsługuje aliasy. Aby zależność była jawna:

| Przed                                        | Po                                                     |
| -------------------------------------------- | ------------------------------------------------------ |
| `import { _, t } from 'svelte-i18n'`         | `import { _, t } from '@intlayer/svelte-i18n'`         |
| `import { locale } from 'svelte-i18n'`       | `import { locale } from '@intlayer/svelte-i18n'`       |
| `import { init } from 'svelte-i18n'`         | `import { init } from '@intlayer/svelte-i18n'`         |
| `import { date, number } from 'svelte-i18n'` | `import { date, number } from '@intlayer/svelte-i18n'` |

</Step>
<Step number={6} title="Przeniesienie treści do plików .content.ts" isOptional={true}>

Nowe komponenty mogą używać natywnej treści Intlayer obok istniejących wywołań svelte-i18n:

```typescript fileName="src/lib/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```svelte fileName="src/lib/Home.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("home");
</script>

<h1>{$content.title}</h1>
```

</Step>
<Step number={7} title="Włączenie tłumaczenia przez AI" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Uzupełnione tłumaczenia są zapisywane z powrotem w Twoich plikach JSON. Konfigurację AI opisuje [dokumentacja CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

</Step>
</Steps>

## Co możesz usunąć po migracji

| Plik / wzorzec                           | Dlaczego nie jest już potrzebny                      |
| ---------------------------------------- | ---------------------------------------------------- |
| Wywołania `register()` / `addMessages()` | Słowniki kompiluje i ładuje Intlayer.                |
| `waitLocale()` przed renderowaniem       | Komunikaty są dostępne od razu po ustawieniu locale. |

## Konfiguracja TypeScript

Dodaj wygenerowane typy do `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Konfiguracja Git

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [Compat adapter dla svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/svelte-i18n.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md)
- [Intlayer z Vite i Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+svelte.md)
- [Intlayer z SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_svelte_kit.md)
- [Edytor wizualny Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)
