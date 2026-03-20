---
createdAt: 2026-03-20
updatedAt: 2026-03-20
title: Jak skonfigurować Intlayer z Storybook
description: Dowiedz się, jak uczynić swój system projektowania wielojęzycznym, używając Intlayer z Storybook — kompiluj deklaracje treści, dodaj przełącznik języka i przeglądaj komponenty w dowolnym języku.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Storybook
  - React
  - i18n
  - TypeScript
  - Vite
  - Webpack
slugs:
  - doc
  - storybook
history:
  - version: 8.4.5
    date: 2026-03-20
    changes: Init doc
---

# Intlayer z Storybook

## Spis treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna biblioteka internacjonalizacji (i18n) typu open-source, zaprojektowana w celu uproszczenia obsługi wielojęzyczności w nowoczesnych aplikacjach internetowych. Działa na **poziomie komponentów** — każdy komponent posiada własne deklaracje treści — co pozwala na przechowywanie tłumaczeń w tym samym miejscu, co kod, który ich używa.

Dzięki Intlayer możesz:

- **Zarządzać tłumaczeniami deklaratywnie** za pomocą plików treści dla poszczególnych komponentów.
- **Korzystać z pełnego wsparcia TypeScript** dzięki automatycznie generowanym typom i autouzupełnianiu w środowisku IDE.
- **Przełączać języki w czasie rzeczywistym** bez konieczności przeładowywania strony.
- **Automatycznie tłumaczyć treści** dzięki wbudowanym integracjom z dostawcami AI.

---

## Dlaczego warto używać Intlayer z Storybook?

Storybook to standardowe narzędzie branżowe do tworzenia i dokumentowania komponentów interfejsu użytkownika w izolacji. Połączenie go z Intlayer pozwala na:

- **Podgląd każdego języka** bezpośrednio w środowisku Storybook za pomocą przełącznika na pasku narzędzi.
- **Wykrywanie brakujących tłumaczeń** przed ich wdrożeniem do produkcji.
- **Dokumentowanie komponentów wielojęzycznych** przy użyciu rzeczywistych, bezpiecznych pod kątem typów treści zamiast zakodowanych na sztywno ciągów znaków.

---

## Konfiguracja krok po kroku

<Tabs>
<Tab value="Vite Setup">

### Krok 1: Instalacja zależności

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

| Pakiet           | Rola                                                          |
| ---------------- | ------------------------------------------------------------- |
| `intlayer`       | Rdzeń — konfiguracja, kompilacja treści, interfejs CLI        |
| `react-intlayer` | Powiązania React — `IntlayerProvider`, hook `useIntlayer`     |
| `vite-intlayer`  | Wtyczka Vite — monitoruje i kompiluje pliki deklaracji treści |

---

### Krok 2: Tworzenie konfiguracji Intlayer

Utwórz plik `intlayer.config.ts` w katalogu głównym projektu (lub wewnątrz pakietu systemu projektowania):

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // dodaj więcej języków w razie potrzeby
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // miejsce przechowywania plików *.content.ts
  },
};

export default config;
```

> Pełną listę opcji znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

---

### Krok 3: Dodawanie wtyczki Vite do Storybook

Hook `viteFinal` w Storybook pozwala na rozszerzenie wewnętrznej konfiguracji Vite. Zaimportuj i dodaj wtyczkę `intlayer()` w tym miejscu:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …pozostałe wtyczki
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(baseConfig, { configType }) {
    const env = {
      command: configType === "DEVELOPMENT" ? "serve" : "build",
      mode: configType === "DEVELOPMENT" ? "development" : "production",
    } as const;

    const viteConfig = defineConfig(() => ({
      plugins: [intlayer()],
    }));

    return mergeConfig(baseConfig, viteConfig(env));
  },
};

export default config;
```

Wtyczka `intlayer()` monitoruje pliki `*.content.ts` i automatycznie przebudowuje słowniki przy każdej zmianie podczas pracy w Storybook.

---

### Krok 4: Dodawanie dekoratora `IntlayerProvider` i przełącznika języków

Plik `preview` w Storybook to odpowiednie miejsce, aby opakować każdą historię w `IntlayerProvider` i udostępnić przełącznik języków na pasku narzędzi:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // Opakuj każdą historię w IntlayerProvider
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  // Udostępnij przełącznik języków na pasku narzędzi Storybook
  globalTypes: {
    locale: {
      description: "Aktywny język",
      defaultValue: "en",
      toolbar: {
        title: "Język",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

> Wartości `locale` muszą odpowiadać językom zadeklarowanym w `intlayer.config.ts`.

</Tab>
<Tab value="Webpack Setup">

### Krok 1: Instalacja zależności

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install @intlayer/webpack --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add @intlayer/webpack --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add @intlayer/webpack --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add @intlayer/webpack --dev
```

---

### Krok 2: Tworzenie konfiguracji Intlayer

Utwórz plik `intlayer.config.ts` w katalogu głównym projektu:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"],
  },
};

export default config;
```

---

### Krok 3: Konfiguracja Webpack dla Storybook

W przypadku konfiguracji Storybook opartych na Webpack (np. `@storybook/react-webpack5`), rozszerz konfigurację za pomocą `webpackFinal`, aby dodać aliasy i loader Intlayer:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-webpack5";
import { IntlayerWebpackPlugin } from "@intlayer/webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (baseConfig) => {
    baseConfig.plugins = [
      ...(baseConfig.plugins ?? []),
      new IntlayerWebpackPlugin(),
    ];
    return baseConfig;
  },
};

export default config;
```

---

### Krok 4: Dodawanie dekoratora `IntlayerProvider` i przełącznika języków

Podobnie jak w przypadku konfiguracji Vite — dodaj dekorator i globalny typ języka w `.storybook/preview.tsx`:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  globalTypes: {
    locale: {
      description: "Aktywny język",
      defaultValue: "en",
      toolbar: {
        title: "Język",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

</Tab>
</Tabs>

---

## Deklarowanie treści

Utwórz plik `*.content.ts` obok każdego komponentu. Intlayer automatycznie wykryje go podczas kompilacji.

```typescript fileName="src/components/CopyButton/CopyButton.content.ts" codeFormat="typescript"
import { type Dictionary, t } from "intlayer";

const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
} satisfies Dictionary;

export default copyButtonContent;
```

```javascript fileName="src/components/CopyButton/CopyButton.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
};

export default copyButtonContent;
```

```javascript fileName="src/components/CopyButton/CopyButton.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
};

module.exports = copyButtonContent;
```

> Więcej informacji na temat formatów deklaracji i dostępnych funkcji znajdziesz w [dokumentacji deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

---

## Używanie `useIntlayer` w komponencie

```tsx fileName="src/components/CopyButton/index.tsx" codeFormat="typescript"
"use client";

import { type FC } from "react";
import { useIntlayer } from "react-intlayer";

type CopyButtonProps = {
  content: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ content }) => {
  const { label } = useIntlayer("copy-button");

  return (
    <button
      onClick={() => navigator.clipboard.writeText(content)}
      aria-label={label.value}
      title={label.value}
    >
      Kopiuj
    </button>
  );
};
```

`useIntlayer` zwraca skompilowany słownik dla bieżącego języka, dostarczanego przez najbliższy komponent `IntlayerProvider`. Przełączenie języka na pasku narzędzi Storybook automatycznie odświeży historię z zaktualizowanymi tłumaczeniami.

---

## Pisanie historii dla komponentów zinternacjonalizowanych

Dzięki zastosowaniu dekoratora `IntlayerProvider` Twoje historie działają dokładnie tak, jak wcześniej. Pasek narzędzi kontroluje aktywny język dla całego obszaru roboczego:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

/** Domyślna historia — przełącz język na pasku narzędzi, aby zobaczyć tłumaczenia. */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** Renderuje przycisk wewnątrz bloku kodu, co jest częstym przypadkiem użycia w rzeczywistych projektach. */
export const InsideCodeBlock: Story = {
  render: (args) => (
    <div style={{ position: "relative", display: "inline-block" }}>
      <pre style={{ background: "#1e1e1e", color: "#fff", padding: "1rem" }}>
        <code>{args.content}</code>
      </pre>
      <CopyButton
        content={args.content}
        style={{ position: "absolute", top: 8, right: 8 }}
      />
    </div>
  ),
  args: {
    content: "npx intlayer init",
  },
};
```

> Każda historia dziedziczy parametr globalny `locale` z paska narzędzi, więc możesz zweryfikować każdy język bez modyfikacji kodu historii.

---

## Testowanie tłumaczeń w historiach

Użyj funkcji `play` w Storybook, aby upewnić się, że renderowany jest poprawny przetłumaczony tekst dla danego języka:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const AccessibleLabel: Story = {
  args: { content: "Hello World" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Sprawdź, czy przycisk posiada niepustą nazwę dostępności (accessible name)
    await expect(button).toHaveAccessibleName();
    // Sprawdź, czy przycisk nie jest wyłączony
    await expect(button).not.toBeDisabled();
    // Sprawdź dostępność klawiatury
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## Dodatkowe zasoby

- [Dokumentacja konfiguracji Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)
- [Dokumentacja deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md)
- [Dokumentacja CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
- [Dokumentacja Storybook](https://storybook.js.org/docs)
