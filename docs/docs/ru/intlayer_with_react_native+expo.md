---
createdAt: 2025-06-18
updatedAt: 2026-08-30
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
  - version: 9.0.0
    date: 2026-06-25
    changes: "Импорт провайдеров и хуков напрямую из react-native-intlayer; react-intlayer больше не нужен как прямая зависимость"
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
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
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

## Содержание

<TOC/>

## Почему Intlayer, а не альтернативы?

По сравнению с основными решениями, такими как `react-native-localize` или `i18next`, Intlayer — это решение, включающее такие интегрированные оптимизации, как:

<AccordionGroup>

<Accordion header="Полная поддержка React Native">

Intlayer оптимизирован для идеальной работы с React Native и Expo, предлагая **определение контента на уровне компонентов**, **поддержку TypeScript** и все необходимые функции для масштабирования интернационализации (i18n) в мобильных приложениях.

</Accordion>

<Accordion header="Поддерживаемость">

Организация контента по отдельным областям (scoping) **упрощает сопровождение** крупных приложений. Вы можете скопировать или удалить папку с функцией без необходимости просматривать всю кодовую базу контента. Кроме того, Intlayer **полностью типизирован (fully typed)**, что обеспечивает точность вашего контента.

</Accordion>

<Accordion header="ИИ-агент">

Совместное размещение контента **сокращает контекст, необходимый** для больших языковых моделей (LLM). Intlayer также поставляется с набором инструментов, таких как **CLI** для проверки отсутствующих переводов, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** и **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**, чтобы сделать опыт разработчика (DX) ещё более комфортным для ИИ-агентов.

</Accordion>

<Accordion header="Автоматизация">

Используйте автоматизацию для перевода в вашем CI/CD-пайплайне с помощью LLM по вашему выбору за счёт вашего провайдера ИИ. Intlayer также предлагает **компилятор** для автоматизации извлечения контента, а также [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), чтобы помочь **переводить в фоновом режиме**.

</Accordion>

<Accordion header="Производительность">

Подключение больших JSON-файлов к компонентам может привести к проблемам с производительностью и реактивностью. Intlayer оптимизирует загрузку контента во время сборки (build time).

</Accordion>

<Accordion header="Масштабирование с не-разработчиками">

Будучи больше, чем просто решением для i18n, Intlayer предлагает **собственный [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** и **[полноценную CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, чтобы помочь вам управлять многоязычным контентом в **реальном времени**, делая сотрудничество с переводчиками, копирайтерами и другими членами команды бесперебойным. Контент может храниться локально и/или удалённо.

</Accordion>

<Accordion header="Размер бандла">

Вместо загрузки огромных JSON-файлов на ваши страницы загружайте только необходимый контент. Intlayer помогает **уменьшить размер вашего бандла и представлений до 50%**.

</Accordion>
</AccordionGroup>

<Steps>

<Step number={1} title="Установите зависимости">

См. [Шаблон приложения](https://github.com/aymericzip/intlayer-react-native-template) на GitHub.

Из вашего проекта React Native установите следующие пакеты:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> Флаг `--interactive` не является обязательным. Используйте `intlayer-cli init`, если вы являетесь ИИ-агентом.

> Эта команда определит вашу среду и установит необходимые пакеты. Например:

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

### Пакеты

- **intlayer**  
  Основной набор инструментов i18n для конфигурации, содержимого словарей, генерации типов и команд CLI.

- **react-native-intlayer**  
  Интеграция с React Native, предоставляющая провайдеры контекста и React-хуки, которые вы будете использовать для получения и переключения локалей, полифилы React Native, а также плагин Metro для интеграции Intlayer с бандлером React Native. Он реэкспортирует всё из `react-intlayer`, поэтому в приложении React Native достаточно этого единственного пакета.

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

Metro — это сборщик для React Native. Он является сборщиком по умолчанию для проектов React Native, созданных с помощью команды `react-native init`. Чтобы использовать Intlayer с Metro, необходимо добавить плагин в файл `metro.config.js`:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

> Примечание: `configMetroIntlayer` — это асинхронная функция. Используйте `configMetroIntlayerSync`, если хотите использовать её синхронно, или избегайте IIFE (Immediately Invoked Function Expression).
> Примечание: `configMetroIntlayerSync` не позволяет собирать словари intlayer при запуске сервера

</Step>

<Step number={4} title="Добавьте провайдер Intlayer">

Чтобы синхронизировать язык пользователя по всему приложению, необходимо обернуть корневой компонент в компонент `IntlayerProvider` из `react-native-intlayer`.

> Всегда импортируйте из `react-native-intlayer`. Его `IntlayerProvider` включает полифилы для веб-API, используемого Intlayer, и пакет реэкспортирует все хуки и утилиты из `react-intlayer`.

Также необходимо добавить функцию `intlayerPolyfill` в ваш файл `index.js`, чтобы обеспечить корректную работу Intlayer.

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
- `.content.jsonc`
- `.content.json5`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.md`
- `.content.mdx`
- `.content.yaml`
- `.content.yml`
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

> При использовании `content.someKey` в строковых пропсах (например, в `title` кнопки или в `children` компонента `Text`), **вызывайте `content.someKey.value`**, чтобы получить фактическую строку.

> Если ваше приложение уже существует, вы можете использовать [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) в сочетании с [командой extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md), чтобы преобразовать тысячи компонентов за одну секунду.

---

</Step>

<Step number={7} title="Изменение локали приложения" isOptional={true}>

Для переключения локалей изнутри ваших компонентов вы можете использовать метод `setLocale` хука `useLocale`:

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
- **Команды CLI**: Изучите [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md) для таких задач, как **извлечение переводов** или **проверка отсутствующих ключей**.

Наслаждайтесь созданием ваших приложений на **React Native** с полноценной поддержкой i18n через **Intlayer**!

---

### Отладка

React Native может быть менее стабильным, чем React Web, поэтому обратите особое внимание на выравнивание версий.

Intlayer в основном ориентирован на Web Intl API; в React Native вы должны включить соответствующие полифилы.

Контрольный список:

- Используйте последние версии `intlayer` и `react-native-intlayer`.
- Включите Intlayer полифил.
- Если вы используете `getLocaleName` или другие утилиты на основе Intl API, импортируйте эти полифилы рано (например, в `index.js` или `App.tsx`):

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

## Часто задаваемые вопросы

<FAQ>

<Question title="Какие существуют решения для интернационализации приложения React Native или Expo?">

- **`i18n-js`** в паре с `expo-localization`: историческая связка, простой объект сообщений без типизации.
- **`react-i18next`**: стандарт экосистемы React, с пространствами имён JSON, загружаемыми во время выполнения.
- **`Intlayer`**: контент, объявленный рядом с каждым компонентом и скомпилированный плагином Metro во время сборки, полностью типизированный, с ИИ-переводом, визуальным редактором и CMS.

На мобильных устройствах аргумент о размере сильнее, чем в вебе, потому что всё упаковывается в приложение, а не загружается для каждой страницы. Компиляция контента по компонентам держит неиспользуемые языки и неиспользуемые ключи вне бандла. См. [почему Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md).

</Question>

<Question title="Насколько i18n увеличивает размер бандла моего приложения?">

Гораздо меньше, чем каталог во время выполнения, что важнее на мобильных, чем в вебе, потому что всё упаковывается в приложение, а не загружается для каждой страницы. Плагин Metro разрешает вызовы `useIntlayer` в точные записи, которые использует компонент, поэтому неиспользуемые ключи и неиспользуемые языки никогда не попадают в бинарник. По сравнению с обычными альтернативами Intlayer сокращает размер бандла до 50%. См. [оптимизацию бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md).

</Question>

<Question title="Могу ли я мигрировать с `i18n-js` или `react-i18next`, не переписывая свои компоненты?">

Да, и есть два пути. Вы можете мигрировать контент постепенно с помощью [руководства по миграции с i18n-js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/i18n-js.md) или [руководства по миграции с react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_react-i18next_to_intlayer.md). Или вы можете полностью сохранить свой текущий API: [адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md) предоставляют точно такой же API, как `react-i18next` и `react-intl`, но обслуживаемый словарями Intlayer, поэтому меняются импорты, а код компонентов — нет.

</Question>

<Question title="Могу ли я сохранить свои существующие файлы переводов JSON?">

Да. [Плагин синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) сохраняет ваши файлы `/messages/{locale}/{namespace}.json` как источник истины и генерирует из них словари Intlayer, в обоих направлениях. [Плагин синхронизации PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-po.md) делает то же самое для каталогов gettext, а [файлы по локали](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/per_locale_file.md) позволяют разделить контент по языкам вместо группировки локалей в одном файле.

</Question>

<Question title="Должен ли я переносить свой контент ключ за ключом?">

Нет. Запустите `npx intlayer extract`, и Intlayer прочитает ваши исходные файлы, извлечёт строки, видимые пользователю, и запишет файл `.content` рядом с каждым из них, так что вы просматриваете diff вместо копирования строк в каталог по одной. См. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md).

Для полностью автоматизированного конвейера [Компилятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) делает то же самое во время сборки на исходном коде JSX, TSX, Vue и Svelte, генерируя словари при каждом изменении, поэтому нет ключей, которые нужно поддерживать вручную. Он работает через статический анализ, поэтому строки, существующие только во время выполнения, остаются недоступными, и ему нужно несколько аннотаций, чтобы отличать текст, видимый пользователю, от логики приложения.

</Question>

<Question title="Какие инструменты для редактора и ИИ-агентов доступны?">

Пять компонентов, все опциональные:

- **[Расширение для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)**: переход от ключа `useIntlayer` к файлу контента, который его объявляет, извлечение контента из компонента и запуск build, fill, test, push и pull из палитры команд или отдельной вкладки Intlayer.
- **[LSP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)**: та же осведомлённость в любом редакторе, который говорит на LSP, с переходом к определению, поиском всех ссылок, предпросмотром переведённого значения при наведении, автодополнением ключей и полей и предупреждением, когда ключ нигде не объявлен. Он также разрешает вызовы `i18next`, `react-i18next`, `next-intl` и `use-intl`, что помогает при миграции.
- **[MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)**: предоставляет документацию и CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code и ChatGPT, чтобы ассистент отвечал по актуальной документации, а не гадал, и мог сам запускать команды вроде `intlayer fill`.
- **[Навыки агентов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**: сфокусированные навыки, такие как `intlayer-config`, `intlayer-cli` и `intlayer-content`, плюс по одному на фреймворк, которые обучают агента вашей настройке маршрутизации и типам узлов контента.
- **[Плагин ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md)**: `no-raw-text` помечает жёстко закодированные строки, с дополнительными правилами для статических ключей словаря и неиспользуемого контента.

</Question>

<Question title="Работает ли Intlayer с Expo и сборщиком Metro?">

Да. Шаг 3 добавляет плагин Metro, который компилирует ваши файлы `.content.ts` и регенерирует типы при сохранении, поэтому Fast Refresh подхватывает правки контента как любое другое изменение исходного кода. Это работает и в Expo Go, и в сборках для разработки.

</Question>

<Question title="Как определить язык устройства?">

Прочитайте её из `expo-localization` и передайте провайдеру Intlayer как начальную локаль, затем сохраните явный выбор пользователя. Intlayer откатывается к вашей локали по умолчанию, когда язык устройства не среди объявленных, поэтому приложение никогда не отображает пустую строку.

</Question>

<Question title="Как изменить язык приложения во время выполнения?">

Шаг 7 охватывает это. `useLocale` предоставляет активную локаль, объявленные локали и сеттер, а компоненты, читающие контент, перерисовываются немедленно, поэтому язык меняется без перезапуска приложения.

</Question>

<Question title="Как поддерживать языки с письмом справа налево, такие как арабский или иврит?">

Используйте `getHTMLTextDir`, чтобы узнать, является ли активная локаль языком с письмом справа налево, и примените это через `I18nManager` в React Native. Учтите, что React Native требует перезагрузки для полного переворота RTL-раскладки, поэтому большинство приложений запрашивают у пользователя один раз, когда он выбирает RTL-язык.

</Question>

<Question title="Как автоматически перевести приложение с помощью ИИ?">

Запустите `npx intlayer fill`, которая заполняет недостающие переводы с помощью выбранной вами LLM, используя ваш собственный провайдер и API-ключ, а `--git-diff` ограничивает запуск контентом, изменённым в ветке. См. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md) и [интеграцию CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/CI_CD.md).

</Question>

<Question title="Поддерживает ли Intlayer множественное число, род и форматированный текст?">

Да: [формы множественного числа](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/plurial.md), [контент на основе рода](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/gender.md), условия, [вставки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/markdown.md) и [форматтеры](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/formatters.md) для чисел, дат и валют.

</Question>

<Question title="Как переводчики могут редактировать контент, не касаясь кода?">

Через [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md), который работает на вашей собственной инфраструктуре и позволяет любому редактировать текст на месте в работающем приложении, или [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md), которая выносит контент вовне, чтобы он мог меняться без развёртывания.

</Question>

<Question title="Является ли Intlayer бесплатным и с открытым исходным кодом?">

Да, по лицензии Apache 2.0, включая коммерческое использование. Размещённая CMS — это необязательный платный сервис, который также можно [разместить самостоятельно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

</Question>

</FAQ>
