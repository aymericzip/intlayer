# Начало работы с интернационализацией (i18n) с Intlayer и React Native

## Что такое Intlayer?

**Intlayer** — это **инновационная, открытая библиотека интернационализации (i18n)**, которая упрощает поддержку нескольких языков в современных приложениях. Она работает в различных средах JavaScript/TypeScript, **включая React Native** (через пакет `react-intlayer`).

С помощью Intlayer вы можете:

- **Легко управлять переводами**, используя декларативные словари на уровне компонентов.
- **Обеспечить поддержку TypeScript** с помощью автоматически генерируемых типов.
- **Динамически локализовать** контент, включая **строки пользовательского интерфейса** (а в React для веб также можно локализовать HTML-метаданные и т. д.).
- **Использовать расширенные функции**, такие как динамическое определение и переключение локали.

---

## Шаг 1: Установите зависимости

В вашем проекте React Native установите следующие пакеты:

```bash
npm install intlayer react-intlayer react-native-intlayer
```

```bash
pnpm add intlayer react-intlayer react-native-intlayer
```

```bash
yarn add intlayer react-intlayer react-native-intlayer
```

### Пакеты

- **intlayer**  
  Основной инструмент i18n для конфигурации, содержания словарей, генерации типов и команд CLI.

- **react-intlayer**  
  Интеграция с React, предоставляющая провайдеры контекста и хуки React, которые вы будете использовать в React Native для получения и переключения локалей.

- **react-native-intlayer**  
  Интеграция с React Native, предоставляющая плагин Metro для интеграции Intlayer с бандлером React Native.

---

## Шаг 2: Создайте конфигурацию Intlayer

В корне вашего проекта (или в любом удобном месте) создайте файл **конфигурации Intlayer**. Он может выглядеть так:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Добавьте любые другие локали, которые вам нужны
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
      // ... Добавьте любые другие локали, которые вам нужны
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

В этой конфигурации вы можете:

- Настроить **список поддерживаемых локалей**.
- Установить **локаль по умолчанию**.
- Позже вы можете добавить более сложные параметры (например, логи, пользовательские директории контента и т. д.).
- См. [документацию по конфигурации Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md) для получения дополнительной информации.

## Шаг 3: Добавьте плагин Metro

Metro — это бандлер для React Native. Это бандлер по умолчанию для проектов React Native, созданных с помощью команды `react-native init`. Чтобы использовать Intlayer с Metro, вам нужно добавить плагин в ваш файл `metro.config.js`:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Шаг 4: Добавьте провайдер Intlayer

Чтобы синхронизировать язык пользователя по всему приложению, вам нужно обернуть ваш корневой компонент в компонент `IntlayerProvider` из `react-intlayer`.

Обертайте ваш **корневой** или верхнеуровневый компонент с помощью `IntlayerProvider` из `react-intlayer`.

Также вам нужно добавить функцию `intlayerPolyfill` в ваш файл `index.js`, чтобы Intlayer работал корректно.

```tsx fileName="app/_layout.tsx" codeFormat="typescript"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProviderContent } from "react-intlayer";
import { intlayerPolyfill } from "react-native-intlayer";
import { type FC } from "react";

intlayerPolyfill();

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProviderContent locale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

export default RootLayout;
```

```jsx fileName="app/_layout.mjx" codeFormat="esm"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProviderContent } from "react-intlayer";
import { intlayerPolyfill } from "react-native-intlayer";

intlayerPolyfill();

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
  return (
    <IntlayerProviderContent locale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

export default RootLayout;
```

```jsx fileName="app/_layout.cjx" codeFormat="commonjs"
const { Stack } = require("expo-router");
const { getLocales } = require("expo-localization");
const { IntlayerProviderContent } = require("react-intlayer");
const { intlayerPolyfill } = require("react-native-intlayer");

intlayerPolyfill();

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
  return (
    <IntlayerProviderContent locale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

module.exports = RootLayout;
```

## Шаг 5: Объявите ваш контент

Создайте файлы **объявления контента** в любом месте вашего проекта (обычно в `src/`), используя любой из форматов расширений, поддерживаемых Intlayer:

- `.content.ts`
- `.content.mjs`
- `.content.cjs`
- `.content.json`
- и т. д.

Пример (TypeScript с узлами TSX для React Native):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * Словарь контента для нашего домена "app"
 */
import { t, type Dictionary } from "intlayer";

const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      ru: "Добро пожаловать!",
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
      ru: "Добро пожаловать!",
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
      ru: "Добро пожаловать!",
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

        "ru": "Добро пожаловать!",
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> Для получения подробной информации о декларациях контента, смотрите [документацию по контенту Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md).

---

## Шаг 4: Использование Intlayer в ваших компонентах

Оборачивайте ваш **корневой** или верхнеуровневый компонент с помощью `IntlayerProvider` из `react-intlayer`. Затем используйте хук `useIntlayer` в дочерних компонентах для получения локализованного контента.

### Пример

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
const { useIntlayer } = require("react-intlayer");
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

> При использовании `content.someKey` в строковых свойствах (например, `title` кнопки или `children` компонента `Text`), **вызывайте `content.someKey.value`**, чтобы получить фактическую строку.

---

## (Опционально) Шаг 5: Изменение локали приложения

Чтобы переключить локали из ваших компонентов, вы можете использовать метод `setLocale` хука `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type FC } from "react";
import { Button } from "react-native";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="Переключиться на французский"
      onPress={() => {
        setLocale(Locales.FRENCH);
      }}
    />
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="Переключиться на французский"
      onPress={() => {
        setLocale(Locales.FRENCH);
      }}
    />
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="Переключиться на французский"
      onPress={() => {
        setLocale(Locales.FRENCH);
      }}
    />
  );
};
```

Это вызовет повторный рендер всех компонентов, использующих контент Intlayer, теперь с переводами для новой локали.

> Смотрите [документацию по `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/useLocale.md) для получения дополнительной информации.

## Настройка TypeScript (если вы используете TypeScript)

Intlayer генерирует определения типов в скрытой папке (по умолчанию `.intlayer`) для улучшения автодополнения и выявления ошибок перевода:

```json5
// tsconfig.json
{
  // ... ваш существующий TS конфиг
  "include": [
    "src", // ваш исходный код
    ".intlayer", // <-- убедитесь, что автоматически сгенерированные типы включены
    // ... все остальное, что вы уже включаете
  ],
}
```

Это позволяет использовать такие функции, как:

- **Автодополнение** для ключей словаря.
- **Проверка типов**, которая предупреждает, если вы обращаетесь к несуществующему ключу или несоответствующему типу.

---

## Конфигурация Git

Чтобы избежать коммита автоматически сгенерированных файлов Intlayer, добавьте следующее в ваш `.gitignore`:

```plaintext
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

---

## Узнайте больше

- **Визуальный редактор**: Используйте [визуальный редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_visual_editor.md) для управления переводами визуально.
- **Интеграция с CMS**: Вы также можете вынести и получать контент вашего словаря из [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_CMS.md).
- **CLI-команды**: Изучите [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md) для выполнения задач, таких как **извлечение переводов** или **проверка отсутствующих ключей**.

Наслаждайтесь созданием ваших приложений на **React Native** с полной поддержкой i18n через **Intlayer**!
