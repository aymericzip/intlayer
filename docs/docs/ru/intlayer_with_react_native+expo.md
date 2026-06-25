---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: "Expo + React Native i18n - Полное руководство по переводу вашего приложения"
description: "Больше никакого i18next. Руководство 2026 по созданию многоязычного (i18n) приложения Expo + React Native. Переводите с помощью ИИ-агентов и оптимизируйте размер бандла, SEO и производительность."
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
applicationShowcase: https://intlayer-react-native.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Обновление использования API useIntlayer в Solid для прямого доступа к свойствам"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Добавить команду init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Инициализация истории"
author: aymericzip
---

# Переведите ваше приложение Expo и React Native | Интернационализация (i18n)

<Tabs defaultTab="code">
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Смотрите [Шаблон приложения](https://github.com/aymericzip/intlayer-react-native-template) на GitHub.

## Шаг 1. Установите зависимости

См. [Шаблон приложения](https://github.com/aymericzip/intlayer-react-native-template) на GitHub.

Из вашего проекта React Native установите следующие пакеты:

```bash packageManager="npm"
npm установить intlayer
npm install --save-dev реагирование-native-intlayer
Инициализация промежуточного слоя npx
```

```bash packageManager="pnpm"
pnpm добавить промежуточный слой
pnpm добавить --save-dev реагирование-native-intlayer
инициализация промежуточного слоя pnpm
```

```bash packageManager="yarn"
пряжа добавить промежуточный слой
пряжа добавить --save-dev
инициализация промежуточного слоя пряжи
```

```bash packageManager="булочка"
булочка добавить промежуточный слой
булочка добавить --dev response-native-intlayer
инициализация промежуточного слоя булочки x
```

### Пакеты

- **промежуточный слой**  
  Базовый набор инструментов i18n для настройки, содержимого словаря, генерации типов и команд CLI.

- **реакция-intlayer**  
  Интеграция React, которая предоставляет поставщиков контекста и перехватчики React, которые вы будете использовать в React Native для получения и переключения локалей.

- **реагировать-родной-intlayer**  
  Интеграция React Native, предоставляющая плагин Metro для интеграции Intlayer с упаковщиком React Native.

---

<Steps>

<Step number={1} title="Установка зависимостей">

В вашем проекте React Native установите следующие пакеты:

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

> флаг `--interactive` не является обязательным. Используйте `intlayer-cli init`, если вы являетесь ИИ-агентом.

> Эта команда определит вашу среду и установит необходимые пакеты. Например:

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

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add --dev react-native-intlayer
```

### Пакеты

- **intlayer**  
  Основной набор инструментов i18n для конфигурации, содержимого словарей, генерации типов и команд CLI.

- **react-intlayer**  
  Интеграция с React, предоставляющая провайдеры контекста и React-хуки, которые вы будете использовать в React Native для получения и переключения локалей.

- **react-native-intlayer**  
  Интеграция с React Native, предоставляющая плагин Metro для интеграции Intlayer с бандлером React Native.

---

</Step>

<Step number={2} title="Создайте конфигурацию Intlayer">

В корне вашего проекта (или в любом удобном месте) создайте файл **конфигурации Intlayer**. Он может выглядеть так:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

В этой конфигурации вы можете:

- Настроить ваш **список поддерживаемых локалей**.
- Установить **локаль по умолчанию**.
- Позже вы сможете добавить более продвинутые опции (например, логи, пользовательские директории контента и т.д.).
- Подробнее смотрите в [документации по конфигурации Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Step>

<Step number={3} title="Добавьте плагин Metro">

Metro - это сборщик для React Native. Он является сборщиком по умолчанию для проектов React Native, созданных с помощью команды `react-native init`. Чтобы использовать Intlayer с Metro, необходимо добавить плагин в файл `metro.config.js`:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

</Step>

<Step number={4} title="Добавьте провайдер Intlayer">

Чтобы синхронизировать язык пользователя во всем приложении, необходимо обернуть корневой компонент в компонент `IntlayerProvider` из `react-intlayer-native`.

> Убедитесь, что вы используете провайдер из `react-native-intlayer`, а не из `react-intlayer`. Экспорт из `react-native-intlayer` включает полифилы для веб-API.

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

<Step number={5} title="Объявите Ваш Контент">

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

> **Expo Router (веб): держите файлы `.content.*` вне директории `app/`.** Expo Router рассматривает каждый файл JavaScript/TypeScript внутри `app/` как маршрут. В веб-версии поиск маршрутов сканирует файловую систему напрямую и **не** учитывает `resolver.blockList` от Metro, поэтому находящийся рядом `*.content.ts` регистрируется как маршрут. Файл, такой как `app/(tabs)/_layout.content.ts`, даже парсится как макет (часть `.content` читается как суффикс платформы), что конфликтует с реальным `_layout.tsx` и вызывает ошибку:
>
> ```
> The layouts "./(tabs)/_layout.content.ts" and "./(tabs)/_layout.tsx" conflict on the route "/(tabs)/_layout.content". Remove or rename one of these files.
> ```
>
> Размещайте свои объявления в директории вне `app/` (например, `content/` или `src/content/`). Intlayer обнаруживает файлы `.content.*` в любом месте проекта, а словари ссылаются по их `key`, поэтому изменения импортов не требуются. В нативных приложениях это не обязательно (`blockList` от Metro уже скрывает их), но использование другой директории помимо `app/` обеспечивает работу обеих платформ.

Пример (TypeScript с TSX узлами для React Native):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> Для подробностей о декларациях контента смотрите [документацию Intlayer по контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

---

</Step>

<Step number={6} title="Использование Intlayer в ваших компонентах">

Используйте хук `useIntlayer` в дочерних компонентах для получения локализованного контента.

### Пример

```tsx fileName="app/(tabs)/index.tsx" codeFormat={["typescript", "esm"]}
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

> При использовании `content.someKey` в строковых пропсах (например, в `title` кнопки или в `children` компонента `Text`), **вызывайте `content.someKey.value`**, чтобы получить фактическую строку.

> Если ваше приложение уже существует, вы можете использовать [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) в сочетании с [командой extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md), чтобы преобразовать тысячи компонентов за одну секунду.

---

</Step>

<Step number={7} title="Изменение локали приложения">

Для переключения локалей изнутри ваших компонентов вы можете использовать метод `setLocale` хука `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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

Это вызывает повторный рендер всех компонентов, использующих контент Intlayer, теперь отображая переводы для новой локали.

> Подробнее смотрите в документации [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md).

</Step>

</Steps>

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

```bash
#  Игнорировать файлы, сгенерированные Intlayer
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
- **Команды CLI**: Изучите [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md) для таких задач, как **извлечение переводов** или **проверка отсутствующих ключей**.

Наслаждайтесь созданием ваших приложений на **React Native** с полноценной поддержкой i18n через **Intlayer**!

---

### Отладка

React Native может быть менее стабильным, чем React Web, поэтому обратите особое внимание на выравнивание версий.

Intlayer в основном ориентирован на Web Intl API; в React Native вы должны включить соответствующие polyfills.

Контрольный список:

- Используйте последние версии `intlayer`, `react-intlayer` и `react-native-intlayer`.
- Включите Intlayer polyfill.
- Если вы используете `getLocaleName` или другие утилиты на основе Intl API, импортируйте эти polyfills рано (например, в `index.js` или `App.tsx`):

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

- Проверьте конфигурацию Metro (resolver aliases, asset plugins, пути `tsconfig`), если модули не разрешаются.

---
