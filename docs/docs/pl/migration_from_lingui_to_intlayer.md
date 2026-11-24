---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migracja z Lingui do Intlayer"
description: "Przenieś aplikację React z Lingui do Intlayer krok po kroku. Makra Lingui, useLingui i <Trans> działają dalej dzięki compat adapterowi @intlayer/lingui."
keywords:
  - lingui
  - "@lingui/react"
  - "@lingui/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - React
  - Vite
slugs:
  - doc
  - migration
  - lingui
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migracja z Lingui do Intlayer

## Dlaczego warto przejść z Lingui na Intlayer?

<AccordionGroup>
<Accordion header="Rozmiar bundla">

Lingui ładuje jeden skompilowany katalog na locale, zawierający wszystkie komunikaty aplikacji. Intlayer dzieli treść na słowniki i dostarcza tylko to, czego używa dana strona, co **zmniejsza rozmiar bundli i stron nawet o 50%**.

</Accordion>
<Accordion header="Łatwość utrzymania">

Słowniki Intlayer są **w pełni typowane** i mogą leżeć obok komponentów, które z nich korzystają. Nie trzeba pamiętać o krokach `extract` / `compile`: słowniki buduje plugin bundlera.

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

1. **Compat adapter (zalecany dla istniejących aplikacji)**: zainstaluj `@intlayer/lingui`. Udostępnia to samo API co `@lingui/core` i `@lingui/react` (`i18n`, `setupI18n`, `I18nProvider`, `useLingui`, `Trans`) i serwuje komunikaty ze słowników Intlayer. Twoje makra (`` t`…` ``, `<Trans>`, `msg`, `plural`) kompilują się dokładnie tak jak wcześniej.
2. **Pełna migracja**: stopniowo zastępuj wywołania Lingui przez `useIntlayer` i pliki `.content.ts` obok komponentów.

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
npm install intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

> Pozostaw zainstalowane `@lingui/core`, `@lingui/react` i plugin makr (`@lingui/babel-plugin-lingui-macro` lub `@lingui/swc-plugin`). Makra nadal działają, a packages Lingui dostarczają typy TypeScript.

</Step>
<Step number={2} title="Konfiguracja Intlayer">

Intlayer traktuje Twoje katalogi Lingui jako źródło prawdy. Przy domyślnej strukturze Lingui (`src/locales/{locale}/messages.po`) wskaż je pluginowi `syncPO`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      // ./src/locales/en/messages.po → dictionary `messages`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

<Accordion header="Użycie katalogów JSON">

Z `@lingui/format-json` użyj `syncJSON` z formatem ICU:

```typescript fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

// ...
plugins: [
  syncJSON({
    format: "icu",
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
],
```

</Accordion>

> Używaj jawnych id komunikatów (`t({ id: "hero.title", message: "Welcome" })` lub `<Trans id="hero.title">`). Id generowane z tekstu źródłowego nie są rozwiązywane w katalogach.

</Step>
<Step number={3} title="Zastąpienie pluginu Vite od Lingui">

Zamień `@lingui/vite-plugin` na `@intlayer/lingui/plugin`. Nazwa pozostaje `lingui()`: plugin uruchamia build Intlayer i tworzy aliasy `@lingui/core` i `@lingui/react` na `@intlayer/lingui`, bez zmian w plikach źródłowych.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin"; // was "@lingui/vite-plugin"

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

> Zostaw plugin makr w pluginie React (Babel lub `@lingui/swc-plugin`), aby makra były kompilowane do wywołań `i18n._()`, zanim Intlayer je rozwiąże.

</Step>
</Steps>

Twoje komponenty działają dalej bez zmian:

```tsx fileName="src/Hero.tsx"
import { Trans, useLingui } from "@lingui/react/macro";

export const Hero = ({ name }: { name: string }) => {
  const { t } = useLingui();

  return (
    <header>
      <h1>{t({ id: "hero.title", message: "Welcome" })}</h1>
      <Trans id="hero.greeting">Hello {name}</Trans>
    </header>
  );
};
```

Zmiana locale nadal odbywa się przez `i18n.activate(locale)`, które aktualizuje każdego konsumenta `useLingui()`.

## Pełna migracja

<Steps>
<Step number={4} title="Usunięcie ładowania katalogów w runtime" isOptional={true}>

Komunikaty pochodzą teraz ze słowników Intlayer kompilowanych podczas buildu. Wywołania `i18n.load()` / `i18n.loadAndActivate()` służą tylko jako fallback i wyświetlają ostrzeżenie w trybie deweloperskim. Zastąp je przez `i18n.activate(locale)` i usuń krok `lingui compile`. Zachowaj `lingui extract`, aby zbierać nowe id komunikatów.

</Step>
<Step number={5} title="Jawna zmiana nazw importów (opcjonalnie)" isOptional={true}>

Plugin Vite już obsługuje aliasy. Aby zależność była jawna:

| Przed                                              | Po                                                    |
| -------------------------------------------------- | ----------------------------------------------------- |
| `import { i18n } from '@lingui/core'`              | `import { i18n } from '@intlayer/lingui'`             |
| `import { setupI18n } from '@lingui/core'`         | `import { setupI18n } from '@intlayer/lingui'`        |
| `import { I18nProvider } from '@lingui/react'`     | `import { I18nProvider } from '@intlayer/lingui'`     |
| `import { useLingui, Trans } from '@lingui/react'` | `import { useLingui, Trans } from '@intlayer/lingui'` |

</Step>
<Step number={6} title="Przeniesienie treści do plików .content.ts" isOptional={true}>

Nowe komponenty mogą używać natywnej treści Intlayer obok istniejących wywołań Lingui:

```typescript fileName="src/hero.content.ts"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default heroContent;
```

```tsx fileName="src/Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

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

Uzupełnione tłumaczenia są zapisywane z powrotem w Twoich katalogach Lingui. Konfigurację AI opisuje [dokumentacja CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

</Step>
</Steps>

## Co możesz usunąć po migracji

| Plik / wzorzec                                 | Dlaczego nie jest już potrzebny                           |
| ---------------------------------------------- | --------------------------------------------------------- |
| `i18n.load()` / dynamiczne importy katalogów   | Słowniki kompiluje i ładuje Intlayer.                     |
| `lingui compile` i skompilowane katalogi `.js` | Intlayer buduje słowniki bezpośrednio z Twoich katalogów. |
| `@lingui/vite-plugin`                          | Zastąpiony przez `lingui()` z `@intlayer/lingui/plugin`.  |

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

- [Compat adapter dla Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/lingui.md)
- [Plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md)
- [Intlayer z Vite i React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+react.md)
- [Edytor wizualny Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
