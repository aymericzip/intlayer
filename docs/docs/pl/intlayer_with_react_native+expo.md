---
createdAt: 2025-06-18
updatedAt: 2025-10-02
title: Jak przetłumaczyć swoją aplikację React Native i Expo – przewodnik i18n 2025
description: Dowiedz się, jak uczynić swoją stronę React Native i Expo wielojęzyczną. Postępuj zgodnie z dokumentacją, aby zinternacjonalizować (i18n) i przetłumaczyć ją.
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
history:
  - version: 6.1.6
    date: 2025-10-02
    changes: Dodano sekcję debugowania
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Przetłumacz swoją stronę React Native i Expo za pomocą Intlayer | Internacjonalizacja (i18n)

## Spis treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to **innowacyjna, open-source’owa biblioteka do internacjonalizacji (i18n)**, która upraszcza wsparcie wielojęzyczne w nowoczesnych aplikacjach. Działa w wielu środowiskach JavaScript/TypeScript, **w tym w React Native** (poprzez pakiet `react-intlayer`).

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentu.
- **Zapewnić wsparcie TypeScript** dzięki automatycznie generowanym typom.
- **Dynamicznie lokalizować** zawartość, w tym **łańcuchy UI** (a w React dla weba może także lokalizować metadane HTML itd.).
- **Korzystać z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i przełączanie lokalizacji.

---

## Krok 1: Instalacja zależności

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-react-native-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-react-native-template) na GitHub.

W swoim projekcie React Native zainstaluj następujące pakiety:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install --save-dev react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add --save-dev react-native-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add --save-dev react-native-intlayer
```

### Pakiety

- **intlayer**  
  Podstawowe narzędzie i18n do konfiguracji, zawartości słownika, generowania typów oraz poleceń CLI.

- **react-intlayer**  
  Integracja z React, która dostarcza dostawców kontekstu oraz hooki React, których użyjesz w React Native do pobierania i przełączania lokalizacji.

- **react-native-intlayer**  
  Integracja z React Native, która dostarcza wtyczkę Metro do integracji Intlayer z bundlerem React Native.

---

## Krok 2: Utwórz konfigurację Intlayer

W katalogu głównym projektu (lub w dowolnym wygodnym miejscu) utwórz plik **konfiguracji Intlayer**. Może on wyglądać tak:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
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

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```js fileName="intlayer.config.js" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

W ramach tej konfiguracji możesz:

- Skonfigurować swoją **listę obsługiwanych lokalizacji**.
- Ustawić **domyślną** lokalizację.
- Później możesz dodać bardziej zaawansowane opcje (np. logi, niestandardowe katalogi z zawartością itp.).
- Zobacz [dokumentację konfiguracji Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md) po więcej informacji.

## Krok 3: Dodaj wtyczkę Metro

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

## Krok 4: Dodaj dostawcę Intlayer

Aby utrzymać synchronizację języka użytkownika w całej aplikacji, musisz opakować swój komponent root w komponent `IntlayerProvider` z `react-native-intlayer`.

> Upewnij się, że używasz providera z `react-native-intlayer` zamiast `react-intlayer`. Eksport z `react-native-intlayer` zawiera polyfille dla web API.

Dodatkowo, musisz dodać funkcję `intlayerPolyfill` do swojego pliku `index.js`, aby zapewnić prawidłowe działanie Intlayer.

```tsx fileName="app/_layout.tsx" codeFormat="typescript"
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

```jsx fileName="app/_layout.mjx" codeFormat="esm"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
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

```jsx fileName="app/_layout.cjx" codeFormat="commonjs"
const { Stack } = require("expo-router");
const { getLocales } = require("expo-localization");
const { IntlayerProvider } = require("react-native-intlayer");

const getDeviceLocale = () => getLocales()[0]?.languageTag;

// Główny layout aplikacji
const RootLayout = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

module.exports = RootLayout;
```

## Krok 5: Zadeklaruj swoją zawartość

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

Przykład (TypeScript z węzłami TSX dla React Native):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
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

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";
import { ReactNode } from "react";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
};

module.exports = appContent;
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

## Krok 4: Użyj Intlayer w swoich komponentach

Użyj hooka `useIntlayer` w komponentach potomnych, aby uzyskać zlokalizowaną zawartość.

### Przykład

```tsx fileName="app/(tabs)/index.tsx" codeFormat="typescript"
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-intlayer";
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

```jsx fileName="app/(tabs)/index.content.msx" codeFormat="esm"
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const HomeScreen = () => {
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

```jsx fileName="app/(tabs)/index.content.csx" codeFormat="commonjs"
const { Image, StyleSheet, Platform } = require("react-native");
const { useIntlayer } = require("intlayer");
const { HelloWave } = require("@/components/HelloWave");
const ParallaxScrollView = require("@/components/ParallaxScrollView");
const { ThemedText } = require("@/components/ThemedText");
const { ThemedView } = require("@/components/ThemedView");

const HomeScreen = () => {
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

module.exports = HomeScreen;
```

> Kiedy używasz `content.someKey` w właściwościach opartych na łańcuchach znaków (np. `title` przycisku lub `children` komponentu `Text`), **wywołaj `content.someKey.value`**, aby uzyskać właściwy łańcuch znaków.

---

## (Opcjonalny) Krok 5: Zmiana lokalizacji aplikacji

Aby zmienić lokalizację z poziomu komponentów, możesz użyć metody `setLocale` hooka `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

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

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher = () => {
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

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { View, Text, TouchableOpacity, StyleSheet } = require("react-native");
const { getLocaleName } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
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

```plaintext
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
- **Polecenia CLI**: Poznaj [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md) do zadań takich jak **wyodrębnianie tłumaczeń** lub **sprawdzanie brakujących kluczy**.

Ciesz się tworzeniem swoich aplikacji **React Native** z pełnym wsparciem i18n dzięki **Intlayer**!

---

### Debugowanie

React Native może być mniej stabilny niż React Web, dlatego zwróć szczególną uwagę na zgodność wersji.

Intlayer jest przede wszystkim skierowany do Web Intl API; na React Native musisz dołączyć odpowiednie polyfille.

Lista kontrolna:

- Używaj najnowszych wersji `intlayer`, `react-intlayer` oraz `react-native-intlayer`.
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
