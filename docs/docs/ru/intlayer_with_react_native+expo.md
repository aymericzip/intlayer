---
createdAt: 2025-06-18
updatedAt: 2025-06-29
title: Как перевести ваше React Native and Expo – руководство i18n 2025
description: Узнайте, как сделать ваш сайт на React Native и Expo многоязычным. Следуйте документации для интернационализации (i18n) и перевода.
keywords:
  - Интернационализация
  - Документация
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
  - version: 5.5.10
    date: 2025-06-29
    changes: Инициализация истории
---

# Переведите ваш React Native and Expo с Intlayer | Интернационализация (i18n)

Смотрите [Шаблон приложения](https://github.com/aymericzip/intlayer-react-native-template) на GitHub.

## Что такое Intlayer?

**Intlayer** - это **инновационная, открытая библиотека интернационализации (i18n)**, которая упрощает поддержку многоязычности в современных приложениях. Она работает во многих средах JavaScript/TypeScript, **включая React Native** (через пакет `react-intlayer`).

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Обеспечить поддержку TypeScript** с помощью автогенерируемых типов.
- **Динамически локализовать** контент, включая **строки пользовательского интерфейса** (а в React для веба также можно локализовать HTML-метаданные и т.д.).
- **Воспользоваться расширенными возможностями**, такими как динамическое определение и переключение локали.

---

## Шаг 1: Установка зависимостей

В вашем проекте React Native установите следующие пакеты:

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

### Пакеты

- **intlayer**  
  Основной набор инструментов i18n для конфигурации, содержимого словарей, генерации типов и команд CLI.

- **react-intlayer**  
  Интеграция с React, предоставляющая провайдеры контекста и React-хуки, которые вы будете использовать в React Native для получения и переключения локалей.

- **react-native-intlayer**  
  Интеграция с React Native, предоставляющая плагин Metro для интеграции Intlayer с бандлером React Native.

---

## Шаг 2: Создайте конфигурацию Intlayer

В корне вашего проекта (или в любом удобном месте) создайте файл **конфигурации Intlayer**. Он может выглядеть так:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
/**
 * Если типы Locales недоступны, попробуйте установить moduleResolution в "bundler" в вашем tsconfig.json
 */
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Добавьте любые другие необходимые локали
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
      // ... Добавьте любые другие необходимые локали
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

- Настроить ваш **список поддерживаемых локалей**.
- Установить **локаль по умолчанию**.
- Позже вы сможете добавить более продвинутые опции (например, логи, пользовательские директории контента и т.д.).
- Подробнее смотрите в [документации по конфигурации Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

## Шаг 3: Добавьте плагин Metro

Metro - это сборщик для React Native. Он является сборщиком по умолчанию для проектов React Native, созданных с помощью команды `react-native init`. Чтобы использовать Intlayer с Metro, необходимо добавить плагин в файл `metro.config.js`:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Шаг 4: Добавьте провайдер Intlayer

Чтобы синхронизировать язык пользователя во всем приложении, необходимо обернуть корневой компонент в компонент `IntlayerProvider` из `react-intlayer-native`.

> Убедитесь, что вы используете провайдер из `react-native-intlayer`, а не из `react-intlayer`. Экспорт из `react-native-intlayer` включает полифилы для веб-API.

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

// Получаем локаль устройства
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

module.exports = RootLayout;
```

## Шаг 5: Объявите Ваш Контент

Создайте файлы **объявления контента** в любом месте вашего проекта (обычно внутри `src/`), используя любой из форматов расширений, поддерживаемых Intlayer:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- и т.д.

Пример (TypeScript с TSX узлами для React Native):

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
// Словарь контента для домашнего экрана
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
// Словарь контента для домашнего экрана
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

> Для подробностей о декларациях контента смотрите [документацию Intlayer по контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md).

---

## Шаг 4: Использование Intlayer в ваших компонентах

Используйте хук `useIntlayer` в дочерних компонентах для получения локализованного контента.

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
    gap: 8, // отступ между элементами
  },
});

module.exports = HomeScreen;
```

> При использовании `content.someKey` в строковых пропсах (например, в `title` кнопки или в `children` компонента `Text`), **вызывайте `content.someKey.value`**, чтобы получить фактическую строку.

---

## (Необязательно) Шаг 5: Изменение локали приложения

Для переключения локалей изнутри ваших компонентов вы можете использовать метод `setLocale` хука `useLocale`:

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
    flexDirection: "row", // направление по оси X
    justifyContent: "center", // выравнивание по центру по основной оси
    alignItems: "center", // выравнивание по центру по поперечной оси
    gap: 8, // промежуток между элементами
  },
  button: {
    paddingVertical: 6, // вертикальные отступы
    paddingHorizontal: 12, // горизонтальные отступы
    borderRadius: 6, // радиус скругления углов
    backgroundColor: "#ddd", // цвет фона кнопки
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
    flexDirection: "row", // направление элементов по горизонтали
    justifyContent: "center", // выравнивание по центру по основной оси
    alignItems: "center", // выравнивание по центру по поперечной оси
    gap: 8, // промежуток между элементами
  },
  button: {
    paddingVertical: 6, // вертикальные отступы внутри кнопки
    paddingHorizontal: 12, // горизонтальные отступы внутри кнопки
    borderRadius: 6, // радиус скругления углов
    backgroundColor: "#ddd", // цвет фона кнопки
  },
  text: {
    fontSize: 14, // размер шрифта
    fontWeight: "500", // толщина шрифта
    color: "#333", // цвет текста
  },
});
```

Это вызывает повторный рендер всех компонентов, использующих контент Intlayer, теперь отображая переводы для новой локали.

> Подробнее смотрите в документации [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md).

## Настройка TypeScript (если вы используете TypeScript)

Intlayer генерирует определения типов в скрытой папке (по умолчанию `.intlayer`), чтобы улучшить автодополнение и выявлять ошибки перевода:

```json5
// tsconfig.json
{
  // ... ваша существующая конфигурация TS
  "include": [
    "src", // ваш исходный код
    ".intlayer/types/**/*.ts", // <-- убедитесь, что включены автоматически сгенерированные типы
    // ... всё остальное, что вы уже включаете
  ],
}
```

Это обеспечивает такие возможности, как:

- **Автодополнение** для ключей вашего словаря.
- **Проверка типов**, которая предупреждает, если вы обращаетесь к несуществующему ключу или тип не совпадает.

---

## Конфигурация Git

Чтобы избежать коммита автоматически сгенерированных файлов Intlayer, добавьте следующее в ваш `.gitignore`:

```plaintext
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

---

### Расширение VS Code

Чтобы улучшить опыт разработки с Intlayer, вы можете установить официальное **Расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей переводов.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный просмотр** переведённого контента.
- **Быстрые действия** для удобного создания и обновления переводов.

Для получения дополнительной информации о том, как использовать расширение, обратитесь к [документации расширения Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Продвинутые возможности

- **Визуальный редактор**: Используйте [Визуальный редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) для визуального управления переводами.
- **Интеграция с CMS**: Вы также можете вынести и получать содержимое вашего словаря из [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).
- **Команды CLI**: Изучите [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md) для таких задач, как **извлечение переводов** или **проверка отсутствующих ключей**.

Наслаждайтесь созданием ваших приложений на **React Native** с полноценной поддержкой i18n через **Intlayer**!

---
