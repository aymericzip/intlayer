---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: "Expo + React Native i18n - Повний посібник з перекладу вашого застосунку"
description: "Більше ніякого i18next. Посібник 2026 зі створення багатомовного (i18n) застосунку Expo + React Native. Перекладайте за допомогою ШІ-агентів та оптимізуйте розмір бандлу, SEO та продуктивність."
keywords:
  - Інтернаціоналізація
  - Документація
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
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Додано команду init"
  - version: 6.1.6
    date: 2025-10-02
    changes: "Додано розділ debug"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізація історії"
---

# Перекладіть ваш додаток Expo та React Native | Інтернаціоналізація (i18n)

<Tabs defaultTab="code">
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox, як інтернаціоналізувати ваш застосунок за допомогою Intlayer"
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

## Зміст

<TOC/>

## Чому варто обрати Intlayer, а не альтернативи?

Порівняно з основними рішеннями, такими як `react-native-localize` або `i18next`, Intlayer — це рішення, яке має такі інтегровані оптимізації, як:

<AccordionGroup>

<Accordion header="Повна підтримка React Native">

Intlayer оптимізовано для ідеальної роботи з React Native і Expo, пропонуючи **визначення вмісту на рівні компонентів**, **підтримку TypeScript** і всі функції, необхідні для масштабування інтернаціоналізації (i18n) у мобільних програмах.

</Accordion>

<Accordion header="Підтримуваність">

Організація вмісту за окремими областями (scoping) **полегшує технічне обслуговування** великомасштабних програм. Ви можете скопіювати або видалити окрему папку функцій без розумового навантаження перегляду всієї кодової бази вмісту. Крім того, Intlayer **повністю типізований (fully typed)**, щоб забезпечити точність вашого вмісту.

</Accordion>

<Accordion header="Агент AI">

Спільне розміщення вмісту **зменшує контекст, необхідний** для великих мовних моделей (LLM). Intlayer також постачається з набором інструментів, наприклад **CLI** для перевірки відсутніх перекладів,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** і **[навички агента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, щоб зробити роботу розробника (DX) ще зручнішою для агентів ШІ.

</Accordion>

<Accordion header="Автоматизація">

Використовуйте автоматизацію для перекладу в конвеєрі CI/CD за допомогою LLM за вашим вибором за рахунок вашого постачальника штучного інтелекту. Intlayer також пропонує **компілятор** для автоматизації екстракція вмісту, а також [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), щоб допомогти **перекладати у фоновому режимі**.

</Accordion>

<Accordion header="Продуктивність">

Підключення великих файлів JSON до компонентів може призвести до проблем з продуктивністю та реакцією. Intlayer оптимізує завантаження вмісту під час збірки (build time).

</Accordion>

<Accordion header="Співпраця з не-розробниками">

Більше ніж просто рішення i18n, Intlayer пропонує **власний [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** і **[повний CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, щоб допомогти вам керувати своїм багатомовним вмістом у **реальному часі**, спрощуючи співпрацю з перекладачами, копірайтерами та іншими членами команди. Контент можна зберігати локально та/або віддалено.

</Accordion>

<Accordion header="Розмір бандлу">

Замість того, щоб завантажувати великі файли JSON на свої сторінки, завантажуйте лише необхідний вміст. Intlayer допомагає **зменшити ваш пакет і розмір перегляду до 50%**.

</Accordion>
</AccordionGroup>

<Steps>

<Step number={1} title="Встановіть залежності">

Перегляньте [Шаблон програми](https://github.com/aymericzip/intlayer-react-native-template) на GitHub.

Зі свого проекту React Native встановіть такі пакети:

```bash packageManager="npm"
npm встановити intlayer react-intlayer
npm install --save-dev react-native-intlayer
npx intlayer ініціал
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add --save-dev react-native-intlayer
pnpm intlayer ініціал
```

```bash packageManager="пряжа"
пряжа add intlayer react-intlayer
yarn add --save-dev react-native-intlayer
yarn intlayer ініц
```

```bash packageManager="булочка"
bun add intlayer react-intlayer
bun add --dev react-native-intlayer
bun x intlayer init
```

### Пакети

- **внутрішній шар**  
  Основний набір інструментів i18n для налаштування, вмісту словника, генерації типів і команд CLI.

- **react-intlayer**  
  Інтеграція React, яка надає постачальників контексту та хуки React, які ви використовуватимете в React Native для отримання та перемикання локалей.

- **react-native-intlayer**  
  Інтеграція React Native, яка надає плагін Metro для інтеграції Intlayer із React Native bundler.

---

</Step>

<Step number={2} title="Встановіть залежності">

Перегляньте [шаблон застосунку](https://github.com/aymericzip/intlayer-react-native-template) на GitHub.

У вашому проекті React Native встановіть такі пакети:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install --save-dev react-native-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add --save-dev react-native-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add --save-dev react-native-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add --dev react-native-intlayer
bun x intlayer init
```

### Пакети

- **intlayer**  
  Основний i18n-набір інструментів для конфігурації, вмісту словників, генерації типів та команд CLI.

- **react-intlayer**  
  Інтеграція для React, яка надає провайдери контексту та React hooks, які ви використовуватимете в React Native для отримання та перемикання локалей.

- **react-native-intlayer**  
  Інтеграція для React Native, яка забезпечує плагін Metro для інтеграції Intlayer з бандлером React Native.

---

</Step>

<Step number={3} title="Створіть конфігурацію Intlayer">

У корені вашого проєкту (або в будь-якому зручному місці) створіть файл **Intlayer config**. Він може виглядати так:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
/**
 * Якщо типи Locales недоступні, спробуйте встановити moduleResolution у "bundler" у вашому tsconfig.json
 */
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Додайте будь-які інші локалі, які вам потрібні
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

У цій конфігурації ви можете:

- Налаштувати ваш **список підтримуваних локалей**.
- Встановіть локаль за **замовчуванням**.
- Пізніше ви зможете додати більш просунуті опції (наприклад, логи, користувацькі директорії контенту тощо).
- Див. [документацію конфігурації Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md) для детальнішої інформації.

</Step>

<Step number={4} title="Додайте плагін Metro">

Metro, це бандлер для React Native. Він є бандлером за замовчуванням для проєктів React Native, створених за допомогою команди `react-native init`. Щоб використовувати Intlayer з Metro, потрібно додати плагін у файл `metro.config.js`:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

> Примітка: `configMetroIntlayer`, це функція, яка повертає проміс. Використовуйте `configMetroIntlayerSync`, якщо хочете виконувати це синхронно, або уникайте IFFE (Immediately Invoked Function Expression).
> Примітка: `configMetroIntlayerSync` не дозволяє будувати словники intlayer під час запуску сервера

</Step>

<Step number={5} title="Додайте провайдер Intlayer">

Щоб синхронізувати мову користувача по всьому застосунку, потрібно обгорнути кореневий компонент компонентом `IntlayerProvider` з `react-intlayer-native`.

> Переконайтеся, що використовуєте провайдер з `react-native-intlayer`, а не з `react-intlayer`. Експорт з `react-native-intlayer` включає поліфіли для Web API.

Також потрібно додати функцію `intlayerPolyfill` у ваш файл `index.js`, щоб забезпечити правильну роботу Intlayer.

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

<Step number={6} title="Оголосіть свій контент">

Створіть файли **декларації контенту** у будь-якому місці вашого проєкту (зазвичай у `src/`), використовуючи будь-який з форматів розширень, які підтримує Intlayer:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- тощо.

Приклад (TypeScript із TSX-нодами для React Native):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * Словник контенту для нашого домену "app"
 */
import { t, type Dictionary } from "intlayer";

const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      uk: "Ласкаво просимо!",
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
        "uk": "Ласкаво просимо!",
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> Для детальної інформації про декларації контенту див. [документацію Intlayer щодо контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

---

</Step>

<Step number={7} title="Використання Intlayer у ваших компонентах">

Використовуйте хук `useIntlayer` у дочірніх компонентах, щоб отримувати локалізований контент.

### Приклад

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

> Якщо ваш застосунок уже існує, ви можете скористатися [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) у поєднанні з [командой extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md), щоб перетворити тисячі компонентів за одну секунду.

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

> Коли ви використовуєте `content.someKey` у властивостях, які очікують рядок (наприклад, `title` кнопки або `children` компонента `Text`), **викликайте `content.someKey.value`**, щоб отримати фактичний рядок.

---

</Step>

<Step number={8} title="Змінити локаль додатку">

Щоб перемикати локалі зсередини ваших компонентів, ви можете використовувати метод `setLocale` хука `useLocale`:

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

Це спричиняє повторний рендер (re-render) усіх компонентів, що використовують контент Intlayer, тепер вони відображають переклади для нової локалі.

> Див. документацію по [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useLocale.md) для докладніших відомостей.

</Step>

</Steps>

## Налаштування TypeScript (якщо ви використовуєте TypeScript)

Intlayer генерує визначення типів у прихованій теці (за замовчуванням `.intlayer`), щоб покращити автодоповнення та виявляти помилки перекладів:

```json5
// tsconfig.json
{
  // ... ваша існуюча конфігурація TS
  "include": [
    "src", // ваш вихідний код
    ".intlayer/types/**/*.ts", // <-- переконайтеся, що згенеровані типи включені
    // ... все інше, що ви вже включаєте
  ],
}
```

Це дозволяє такі можливості, як:

- **Autocompletion** для ключів вашого словника.
- **Type checking**, що попереджає, якщо ви звертаєтеся до неіснуючого ключа або є невідповідність типів.

---

## Git Configuration

Щоб уникнути коміту автоматично згенерованих Intlayer файлів, додайте наступне до вашого `.gitignore`:

```bash
#  Ігнорувати файли, згенеровані Intlayer
.intlayer
```

---

### Розширення для VS Code

Щоб покращити досвід розробки з Intlayer, ви можете встановити офіційне **Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Autocompletion** для ключів перекладу.
- **Real-time error detection** для відсутніх перекладів.
- **Inline previews** перекладеного вмісту.
- **Quick actions** для простого створення та оновлення перекладів.

Для детальнішого опису використання розширення зверніться до [документації Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

## Додаткові ресурси

- **Visual Editor**: Використовуйте [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) для візуального керування перекладами.
- **CMS Integration**: Ви також можете винести та отримувати вміст вашого словника з [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).
- **CLI Commands**: Ознайомтеся з [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md) для завдань, таких як **extracting translations** або **checking missing keys**.

Насолоджуйтесь створенням ваших додатків на **React Native** з повноцінною i18n за допомогою **Intlayer**!

---

### Налагодження

React Native може бути менш стабільним, ніж React для Web, тому приділяйте особливу увагу узгодженню версій.

Intlayer в першу чергу орієнтований на Web Intl API; на React Native потрібно підключити відповідні polyfills.

Контрольний список:

- Використовуйте останні версії `intlayer`, `react-intlayer` та `react-native-intlayer`.
- Увімкніть Intlayer polyfill.
- Якщо ви використовуєте `getLocaleName` або інші утиліти на базі Intl API, імпортуйте ці polyfills на ранньому етапі (наприклад, в `index.js` або `App.tsx`):

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

- Перевірте вашу конфігурацію Metro (resolver aliases, asset plugins, `tsconfig` paths), якщо модулі не вдається розв'язати.

---
