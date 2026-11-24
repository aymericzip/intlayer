---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migracja z react-intl (FormatJS) do Intlayer"
description: "Przenieś aplikację React z react-intl do Intlayer krok po kroku. useIntl, FormattedMessage i wszystkie komponenty Formatted* działają dalej dzięki compat adapterowi @intlayer/react-intl."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - internationalization
  - i18n
  - ICU
  - React
  - Vite
slugs:
  - doc
  - migration
  - react-intl
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migracja z react-intl (FormatJS) do Intlayer

## Dlaczego warto przejść z react-intl na Intlayer?

<AccordionGroup>
<Accordion header="Rozmiar bundla">

W react-intl wszystkie komunikaty danego locale są przekazywane do `IntlProvider`, więc każda strona niesie cały katalog. Intlayer dostarcza tylko słowniki używane przez daną stronę, co **zmniejsza rozmiar bundli i stron nawet o 50%**.

</Accordion>
<Accordion header="Łatwość utrzymania">

Id komunikatów są **typowane** względem Twoich słowników: nieprawidłowe id kończą się błędem podczas buildu. Treść może leżeć obok komponentów, które z niej korzystają.

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

1. **Compat adapter (zalecany dla istniejących aplikacji)**: zainstaluj `@intlayer/react-intl`. Udostępnia to samo API co `react-intl` (`IntlProvider`, `useIntl`, `FormattedMessage`, `FormattedNumber`, `FormattedDate`, `defineMessages`, `createIntl`…) i serwuje komunikaty ze słowników Intlayer. ICU MessageFormat, liczby mnogie, select i tagi rich text działają jak wcześniej.
2. **Pełna migracja**: stopniowo zastępuj wywołania react-intl przez `useIntlayer` i pliki `.content.ts` obok komponentów.

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
npm install intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

> Pozostaw `react-intl` zainstalowany: dostarcza typy TypeScript.

</Step>
<Step number={2} title="Konfiguracja Intlayer">

Wskaż pluginowi `syncJSON` istniejące pliki z komunikatami. Katalogi react-intl to płaskie mapy id z kropkami:

```json fileName="src/lang/en.json"
{
  "home.title": "Welcome",
  "home.greeting": "Hello {name}",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

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
      // react-intl uses ICU MessageFormat
      format: "icu",
      source: ({ locale }) => `./src/lang/${locale}.json`,
      // 'home.title' → dictionary `home`, key `title`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

> Pierwszy segment każdego id (`home`) staje się słownikiem Intlayer, więc każda strona ładuje tylko słowniki, których używa. Gdy Intlayer zapisuje tłumaczenia z powrotem, plik zachowuje płaską strukturę.

</Step>
<Step number={3} title="Dodanie pluginu Vite">

`reactIntlVitePlugin()` uruchamia build Intlayer i tworzy alias `react-intl` na `@intlayer/react-intl`, bez zmian w plikach źródłowych.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactIntlVitePlugin } from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

> Używasz innego bundlera? Zmień importy na `@intlayer/react-intl` (patrz krok 5) i użyj pluginu Intlayer dla swojego bundlera, na przykład `withIntlayer` z `next-intlayer` dla Next.js.

</Step>
<Step number={4} title="Przestań przekazywać komunikaty do IntlProvider">

`IntlProvider` działa dalej, ale komunikaty ładuje teraz Intlayer. Usuń prop `messages` i import katalogu:

```tsx fileName="src/main.tsx"
import { IntlProvider } from "react-intl";

export const App = ({ locale }: { locale: string }) => (
  <IntlProvider locale={locale} defaultLocale="en">
    <Home />
  </IntlProvider>
);
```

> Jeśli `messages` nadal jest przekazywany, zostanie zignorowany, a w trybie deweloperskim pojawi się ostrzeżenie.

</Step>
</Steps>

Twoje komponenty działają dalej bez zmian, z typowanymi id:

```tsx fileName="src/Home.tsx"
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

export const Home = () => {
  const intl = useIntl();

  return (
    <main>
      <h1>{intl.formatMessage({ id: "home.title" })}</h1>
      <FormattedMessage id="home.greeting" values={{ name: "Ada" }} />
      <FormattedNumber value={42} style="currency" currency="EUR" />
    </main>
  );
};
```

## Pełna migracja

<Steps>
<Step number={5} title="Jawna zmiana nazw importów (opcjonalnie)" isOptional={true}>

Plugin Vite już obsługuje aliasy. Aby zależność była jawna:

| Przed                                           | Po                                                        |
| ----------------------------------------------- | --------------------------------------------------------- |
| `import { IntlProvider } from 'react-intl'`     | `import { IntlProvider } from '@intlayer/react-intl'`     |
| `import { useIntl } from 'react-intl'`          | `import { useIntl } from '@intlayer/react-intl'`          |
| `import { FormattedMessage } from 'react-intl'` | `import { FormattedMessage } from '@intlayer/react-intl'` |
| `import { defineMessages } from 'react-intl'`   | `import { defineMessages } from '@intlayer/react-intl'`   |
| `import { createIntl } from 'react-intl'`       | `import { createIntl } from '@intlayer/react-intl'`       |

</Step>
<Step number={6} title="Przeniesienie treści do plików .content.ts" isOptional={true}>

Nowe komponenty mogą używać natywnej treści Intlayer obok istniejących wywołań react-intl:

```typescript fileName="src/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```tsx fileName="src/Home.tsx"
import { useIntlayer } from "react-intlayer";

export const Home = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
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

| Plik / wzorzec                               | Dlaczego nie jest już potrzebny                                    |
| -------------------------------------------- | ------------------------------------------------------------------ |
| Prop `messages` i ładowanie katalogu         | Słowniki kompiluje i ładuje Intlayer.                              |
| Krok `formatjs compile`                      | Intlayer parsuje komunikaty ICU bezpośrednio z plików JSON.        |
| Generowanie id przez `babel-plugin-formatjs` | Używaj jawnych id z kropkami, aby każde id odpowiadało słownikowi. |

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

- [Compat adapter dla react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/react-intl.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md)
- [Intlayer z Vite i React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+react.md)
- [Migracja z react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_react-i18next_to_intlayer.md)
- [Edytor wizualny Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)
