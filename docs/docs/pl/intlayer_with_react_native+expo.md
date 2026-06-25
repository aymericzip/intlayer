---
createdAt: 2025-06-18
updatedAt: 2026-06-25
title: "Expo + React Native i18n - Kompletny przewodnik po tłumaczeniu swojej aplikacji"
description: "Koniec z i18next. Przewodnik 2026 do budowania wielojęzycznej (i18n) aplikacji Expo + React Native. Tłumacz z agentami AI i optymalizuj rozmiar bundle, SEO i wydajność."
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - React Native
  - Expo
  - JavaScript
slugs:
  - doc
  - environment
  - react-native-and-expo
applicationTemplate: https://github.com/aymericzip/intlayer-react-native-template
applicationShowcase: https://intlayer-react-native.vercel.app
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Importowanie providerów i hooków bezpośrednio z react-native-intlayer; react-intlayer nie jest już potrzebny jako bezpośrednia zależność"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualizacja użycia API useIntlayer w Solid do bezpośredniego dostępu do właściwości"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Dodaj polecenie init"
  - version: 6.1.6
    date: 2025-10-02
    changes: "Dodano sekcję debugowania"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Przetłumacz swoją aplikację Expo i React Native | Internacjonalizacja (i18n)

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Spis treści

<TOC/>

## Dlaczego Intlayer zamiast alternatyw?

W porównaniu do głównych rozwiązań, takich jak `react-native-localize` czy `i18next`, Intlayer jest rozwiązaniem wyposażonym w zintegrowane optymalizacje, takie jak:

<AccordionGroup>

<Accordion header="Pełne pokrycie React Native">

Intlayer jest zoptymalizowany do doskonałej współpracy z React Native i Expo, oferując **zakres treści na poziomie komponentów**, **obsługę TypeScript** i wszystkie funkcje potrzebne do skalowania internacjonalizacji (i18n) w aplikacjach mobilnych.

</Accordion>

<Accordion header="Łatwość konserwacji">

Określanie zakresu zawartości aplikacji **ułatwia konserwację** aplikacji na dużą skalę. Możesz powielić lub usunąć pojedynczy folder funkcji bez obciążania psychicznego koniecznością przeglądania całej bazy kodu zawartości. Dodatkowo Intlayer jest **w pełni typowany**, aby zapewnić dokładność treści.

</Accordion>

<Accordion header="Agent AI">

Wspólna lokalizacja treści **zmniejsza potrzebny kontekst** dzięki modelom dużego języka (LLM). Intlayer zawiera także zestaw narzędzi, takich jak **CLI** do sprawdzania brakujących tłumaczeń, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** i **[umiejętności agenta](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, aby praca programisty (DX) była jeszcze płynniejsza dla agentów AI.

</Accordion>

<Accordion header="Automatyzacja">

Korzystaj z automatyzacji, aby tłumaczyć w swoim potoku CI/CD przy użyciu wybranego LLM na koszt dostawcy sztucznej inteligencji. Intlayer oferuje także **kompilator** do automatyzacji ekstrakcji treści, a także [platformę internetową](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), która pomaga **tłumaczyć w tle**.

</Accordion>

<Accordion header="Wydajność">

Łączenie ogromnych plików JSON z komponentami może prowadzić do problemów z wydajnością i reaktywnością. Intlayer optymalizuje ładowanie treści w czasie kompilacji.

</Accordion>

<Accordion header="Skalowanie bez użycia dewelopera">

Więcej niż tylko rozwiązanie i18n, Intlayer zapewnia **samodzielny [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** i **[pełny CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, który pomoże Ci zarządzać wielojęzyczną treścią w **czasie rzeczywistym**, dzięki czemu współpraca z tłumaczami, copywriterami i innymi członkami zespołu będzie płynna. Treść może być przechowywana lokalnie i/lub zdalnie.

</Accordion>

<Accordion header="Rozmiar bundle'a">

Zamiast ładować ogromne pliki JSON na swoje strony, ładuj tylko niezbędną treść. Intlayer pomaga **zmniejszyć rozmiary pakietów i wyświetleń nawet o 50%**.

</Accordion>
</AccordionGroup>

<Steps>

<Step number={1} title="Zainstaluj zależności">

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-react-native-template) w GitHub.

Z projektu React Native zainstaluj następujące pakiety:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> Flaga `--interactive` jest opcjonalna. Użyj `intlayer-cli init`, jeśli jesteś agentem AI.

> To polecenie wykryje Twoje środowisko i zainstaluje wymagane pakiety. Na przykład:

```bash packageManager="npm"
npm install intlayer react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-native-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-native-intlayer
```

```bash packageManager="bun"
bun add intlayer react-native-intlayer
```

### Pakiety

- **intlayer**  
  Podstawowe narzędzie i18n do konfiguracji, zawartości słownika, generowania typów oraz poleceń CLI.

- **react-native-intlayer**  
  Integracja z React Native, która dostarcza dostawców kontekstu oraz hooki React do pobierania i przełączania lokalizacji, polyfille dla React Native oraz wtyczkę Metro do integracji Intlayer z bundlerem React Native. Reeksportuje wszystko z `react-intlayer`, więc w aplikacji React Native potrzebny jest tylko ten jeden pakiet.

---

</Step>

<Step number={2} title="Utwórz konfigurację Intlayer">

W katalogu głównym projektu (lub w dowolnym wygodnym miejscu) utwórz plik **konfiguracji Intlayer**. Może on wyglądać tak:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
/**
 * Jeśli typy Locales nie są dostępne, spróbuj ustawić moduleResolution na "bundler" w swoim tsconfig.json
 */
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Dodaj inne potrzebne lokalizacje
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

W ramach tej konfiguracji możesz:

- Skonfigurować swoją **listę obsługiwanych lokalizacji**.
- Ustawić **domyślną** lokalizację.
- Później możesz dodać bardziej zaawansowane opcje (np. logi, niestandardowe katalogi z zawartością itp.).
- Zobacz [dokumentację konfiguracji Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md) po więcej informacji.

</Step>

<Step number={3} title="Dodaj wtyczkę Metro">

Metro to bundler dla React Native. Jest to domyślny bundler dla projektów React Native tworzonych za pomocą polecenia `react-native init`. Aby używać Intlayer z Metro, musisz dodać wtyczkę do pliku `metro.config.js`:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

> Uwaga: `configMetroIntlayer` to funkcja zwracająca promise. Użyj `configMetroIntlayerSync`, jeśli chcesz użyć jej synchronicznie lub uniknąć IIFE (Immediately Invoked Function Expression).
> Uwaga: `configMetroIntlayerSync` nie pozwala na budowanie słowników intlayer podczas uruchamiania serwera

</Step>

<Step number={4} title="Dodaj dostawcę Intlayer">

Aby utrzymać synchronizację języka użytkownika w całej aplikacji, musisz opakować swój komponent root w komponent `IntlayerProvider` z `react-native-intlayer`.

> Zawsze importuj z `react-native-intlayer`. Jego `IntlayerProvider` zawiera polyfille dla web API używanego przez Intlayer, a pakiet reeksportuje wszystkie hooki i narzędzia z `react-intlayer`.

Dodatkowo, musisz dodać funkcję `intlayerPolyfill` do swojego pliku `index.js`, aby zapewnić prawidłowe działanie Intlayer.

```tsx fileName="app/_layout.tsx" codeFormat={["typescript", "esm"]}
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";
import { type FC } from "react";

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

export default RootLayout;
```

</Step>

<Step number={5} title="Zadeklaruj swoją zawartość">

Utwórz pliki **deklaracji zawartości** w dowolnym miejscu w swoim projekcie (zwykle w katalogu `src/`), używając dowolnego z formatów rozszerzeń obsługiwanych przez Intlayer:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- itd.

> **Expo Router (web): trzymaj pliki `.content.*` poza katalogiem `app/`.** Expo Router traktuje każdy plik JavaScript/TypeScript wewnątrz `app/` jako ścieżkę (route). W sieci web odkrywanie ścieżek skanuje system plików bezpośrednio i **nie** honoruje `resolver.blockList` z Metro, więc współistniejący plik `*.content.ts` jest rejestrowany jako ścieżka. Plik taki jak `app/(tabs)/_layout.content.ts` jest nawet parsowany jako układ (layout - część `.content` jest czytana jako przyrostek platformy), co koliduje z prawdziwym `_layout.tsx` i wyrzuca błąd:
>
> ```
> The layouts "./(tabs)/_layout.content.ts" and "./(tabs)/_layout.tsx" conflict on the route "/(tabs)/_layout.content". Remove or rename one of these files.
> ```
>
> Umieść swoje deklaracje w katalogu poza `app/` (na przykład `content/` lub `src/content/`). Intlayer odkrywa pliki `.content.*` w dowolnym miejscu w projekcie, a słowniki są odnoszone przez ich `key`, więc nie są potrzebne żadne zmiany importów. W aplikacjach natywnych nie jest to wymagane (`blockList` z Metro już je ukrywa), ale używanie katalogu innego niż `app/` zapewnia działanie na obu platformach.

Przykład (TypeScript z węzłami TSX dla React Native):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * Słownik treści dla naszej domeny "app"
 */
import { t, type Dictionary } from "intlayer";

const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
} satisfies Dictionary;

export default homeScreenContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> Szczegóły dotyczące deklaracji zawartości znajdziesz w [dokumentacji Intlayer dotyczącej zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

---

</Step>

<Step number={6} title="Użyj Intlayer w swoich komponentach">

Użyj hooka `useIntlayer` w komponentach potomnych, aby uzyskać zlokalizowaną zawartość.

### Przykład

```tsx fileName="app/(tabs)/index.tsx" codeFormat={["typescript", "esm"]}
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-native-intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { type FC } from "react";

const HomeScreen = (): FC => {
  const { title, steps } = useIntlayer("home-screen");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title}</ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default HomeScreen;
```

> Kiedy używasz `content.someKey` w właściwościach opartych na łańcuchach znaków (np. `title` przycisku lub `children` komponentu `Text`), **wywołaj `content.someKey.value`**, aby uzyskać właściwy łańcuch znaków.

> Jeśli Twoja aplikacja już istnieje, możesz użyć [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) w połączeniu z [poleceniem extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md), aby przekonwertować tysiące komponentów w jedną sekundę.

---

</Step>

<Step number={7} title="Zmiana lokalizacji aplikacji" isOptional={true}>

Aby zmienić lokalizację z poziomu komponentów, możesz użyć metody `setLocale` hooka `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-native-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales } = useLocale();

  return (
    <View style={styles.container}>
      {availableLocales.map((locale) => (
        <TouchableOpacity
          key={locale}
          style={styles.button}
          onPress={() => setLocale(locale)}
        >
          <Text style={styles.text}>{getLocaleName(locale)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
```

To powoduje ponowne renderowanie wszystkich komponentów korzystających z zawartości Intlayer, teraz wyświetlając tłumaczenia dla nowej lokalizacji.

> Zobacz [`useLocale` docs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md) po więcej szczegółów.

</Step>

</Steps>

## Konfiguracja TypeScript (jeśli używasz TypeScript)

Intlayer generuje definicje typów w ukrytym folderze (domyślnie `.intlayer`), aby poprawić autouzupełnianie i wykrywać błędy tłumaczeń:

```json5
// tsconfig.json
{
  // ... twoja istniejąca konfiguracja TS
  "include": [
    "src", // twój kod źródłowy
    ".intlayer/types/**/*.ts", // <-- upewnij się, że uwzględnione są automatycznie generowane typy
    // ... wszystko inne, co już uwzględniasz
  ],
}
```

To umożliwia funkcje takie jak:

- **Autouzupełnianie** dla kluczy słownika.
- **Sprawdzanie typów**, które ostrzega, jeśli odwołujesz się do nieistniejącego klucza lub typ jest niezgodny.

---

## Konfiguracja Git

Aby uniknąć zatwierdzania automatycznie generowanych plików przez Intlayer, dodaj następujące wpisy do swojego `.gitignore`:

```bash
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

---

### Rozszerzenie VS Code

Aby poprawić swoje doświadczenie deweloperskie z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie oferuje:

- **Autouzupełnianie** dla kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podglądy w linii** przetłumaczonej zawartości.
- **Szybkie akcje** do łatwego tworzenia i aktualizowania tłumaczeń.

Aby uzyskać więcej informacji o korzystaniu z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Idź dalej

- **Edytor wizualny**: Użyj [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) do wizualnego zarządzania tłumaczeniami.
- **Integracja z CMS**: Możesz również zewnętrznie przechowywać i pobierać zawartość swojego słownika z [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).
- **Polecenia CLI**: Poznaj [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md) do zadań takich jak **wyodrębnianie tłumaczeń** lub **sprawdzanie brakujących kluczy**.

Ciesz się tworzeniem swoich aplikacji **React Native** z pełnym wsparciem i18n dzięki **Intlayer**!

---

### Debugowanie

React Native może być mniej stabilny niż React Web, dlatego zwróć szczególną uwagę na zgodność wersji.

Intlayer jest przede wszystkim skierowany do Web Intl API; na React Native musisz dołączyć odpowiednie polyfille.

Lista kontrolna:

- Używaj najnowszych wersji `intlayer` oraz `react-native-intlayer`.
- Włącz polyfill Intlayer.
- Jeśli używasz `getLocaleName` lub innych narzędzi opartych na API Intl, zaimportuj te polyfille wcześnie (na przykład w `index.js` lub `App.tsx`):

```ts
import "intl";
import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-displaynames/polyfill";
import "@formatjs/intl-listformat/polyfill";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-datetimeformat/polyfill";
```

- Sprawdź konfigurację Metro (aliasy resolvera, wtyczki assetów, ścieżki w `tsconfig`), jeśli moduły nie mogą zostać rozwiązane.

---
