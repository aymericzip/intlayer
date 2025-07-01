---
docName: intlayer_with_react_native_and_expo
url: https://intlayer.org/doc/environment/react-native-and-expo
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_react_native+expo.md
createdAt: 2025-06-18
updatedAt: 2025-06-29
title: React Native 및 Expo 웹사이트 번역하기 (i18n)
description: React Native 및 Expo 웹사이트를 다국어로 만드는 방법을 알아보세요. 국제화(i18n) 및 번역을 위한 문서를 따라가세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - React Native
  - Expo
  - JavaScript
---

# Intlayer와 React Native로 국제화(i18n) 시작하기

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-react-native-template)을 참조하세요.

## Intlayer란 무엇인가요?

**Intlayer**는 현대 애플리케이션에서 다국어 지원을 간소화하는 **혁신적이고 오픈 소스인 국제화(i18n) 라이브러리**입니다. JavaScript/TypeScript 환경에서 널리 사용되며, **React Native**에서도 (`react-intlayer` 패키지를 통해) 작동합니다.

Intlayer를 사용하면 다음을 할 수 있습니다:

- 컴포넌트 수준에서 선언적 사전을 사용하여 **번역을 쉽게 관리**할 수 있습니다.
- 자동 생성된 타입으로 **TypeScript 지원을 보장**합니다.
- **UI 문자열**을 포함한 콘텐츠를 **동적으로 현지화**할 수 있습니다 (웹용 React에서는 HTML 메타데이터 등도 현지화할 수 있습니다).
- 동적 로케일 감지 및 전환과 같은 **고급 기능**을 활용할 수 있습니다.

---

## 1단계: 의존성 설치

React Native 프로젝트에서 다음 패키지들을 설치하세요:

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

### 패키지

- **intlayer**  
  구성, 사전 내용, 타입 생성 및 CLI 명령어를 위한 핵심 i18n 툴킷입니다.

- **react-intlayer**  
  React Native에서 로케일을 얻고 전환하는 데 사용할 컨텍스트 제공자와 React 훅을 제공하는 React 통합 패키지입니다.

- **react-native-intlayer**  
  Intlayer를 React Native 번들러와 통합하기 위한 Metro 플러그인을 제공하는 React Native 통합 패키지입니다.

---

## 2단계: Intlayer 구성 파일 생성

프로젝트 루트(또는 편리한 위치)에 **Intlayer 구성** 파일을 생성하세요. 다음과 같이 보일 수 있습니다:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
/**
 * Locales 타입을 사용할 수 없는 경우, tsconfig.json에서 moduleResolution을 "bundler"로 설정해 보세요.
 */
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... 필요한 다른 로케일을 추가하세요
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
      // ... 필요한 다른 로케일을 추가하세요
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

이 구성 내에서 다음을 할 수 있습니다:

- 지원하는 **로케일 목록**을 구성합니다.
- **기본** 로케일을 설정합니다.
- 나중에 더 고급 옵션(예: 로그, 사용자 지정 콘텐츠 디렉터리 등)을 추가할 수 있습니다.
  /// 더 자세한 내용은 [Intlayer 구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

## 3단계: Metro 플러그인 추가

Metro는 React Native용 번들러입니다. `react-native init` 명령어로 생성된 React Native 프로젝트의 기본 번들러입니다. Metro와 함께 Intlayer를 사용하려면 `metro.config.js` 파일에 플러그인을 추가해야 합니다:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## 4단계: Intlayer 프로바이더 추가

애플리케이션 전반에서 사용자 언어를 동기화 상태로 유지하려면, 루트 컴포넌트를 `react-intlayer`에서 제공하는 `IntlayerProvider` 컴포넌트로 감싸야 합니다.

또한, Intlayer가 제대로 작동할 수 있도록 `index.js` 파일에 `intlayerPolyfill` 함수를 추가해야 합니다.

````tsx fileName="app/_layout.tsx" codeFormat="typescript"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProviderContent } from "react-intlayer";
import { intlayerPolyfill } from "react-native-intlayer";
import { type FC } from "react";

intlayerPolyfill();

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProviderContent defaultLocale={getDeviceLocale()}>
      <Stack>
`IntlayerProvider` 컴포넌트를 `react-intlayer`에서 가져와서 루트 컴포넌트를 감싸야 애플리케이션 전반에 걸쳐 사용자 언어를 동기화할 수 있습니다.

또한, `index.js` 파일에 `intlayerPolyfill` 함수를 추가하여 Intlayer가 제대로 작동하도록 해야 합니다.

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
    <IntlayerProviderContent defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

export default RootLayout;
````

```jsx fileName="app/_layout.mjx" codeFormat="esm"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProviderContent } from "react-intlayer";
import { intlayerPolyfill } from "react-native-intlayer";

intlayerPolyfill();

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
  return (
    <IntlayerProviderContent defaultLocale={getDeviceLocale()}>
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
    <IntlayerProviderContent defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

module.exports = RootLayout;
```

## 5단계: 콘텐츠 선언하기

````

```jsx fileName="app/_layout.cjx" codeFormat="commonjs"
const { Stack } = require("expo-router");
const { getLocales } = require("expo-localization");
const { IntlayerProviderContent } = require("react-intlayer");
const { intlayerPolyfill } = require("react-native-intlayer");

intlayerPolyfill();

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
  return (
    <IntlayerProviderContent defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

module.exports = RootLayout;
````

## 5단계: 콘텐츠 선언하기

프로젝트 내 어디에서나(일반적으로 `src/` 내) **콘텐츠 선언** 파일을 생성하세요. Intlayer가 지원하는 확장자 형식을 사용할 수 있습니다:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- 기타

예시 (React Native용 TSX 노드를 포함한 TypeScript):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * "app" 도메인용 콘텐츠 사전
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

> 콘텐츠 선언에 대한 자세한 내용은 [Intlayer 콘텐츠 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)를 참조하세요.

---

## 4단계: 컴포넌트에서 Intlayer 사용하기

하위 컴포넌트에서 `useIntlayer` 훅을 사용하여 현지화된 콘텐츠를 가져옵니다.

### 예제

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
    flexDirection: "row", // 행 방향 배치
    alignItems: "center", // 중앙 정렬
    gap: 8, // 요소 간 간격
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

> 문자열 기반 props(예: 버튼의 `title` 또는 `Text` 컴포넌트의 `children`)에서 `content.someKey`를 사용할 때는, 실제 문자열을 얻기 위해 **`content.someKey.value`를 호출하세요**.

---

## (선택 사항) 5단계: 앱 로케일 변경하기

컴포넌트 내에서 로케일을 전환하려면, `useLocale` 훅의 `setLocale` 메서드를 사용할 수 있습니다:

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

이 코드는 Intlayer 콘텐츠를 사용하는 모든 컴포넌트의 리렌더링을 트리거하며, 이제 새로운 로케일에 대한 번역을 표시합니다.

> 자세한 내용은 [`useLocale` 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)를 참조하세요.

## TypeScript 구성하기 (TypeScript를 사용하는 경우)

Intlayer는 자동 완성 기능을 향상시키고 번역 오류를 잡기 위해 숨겨진 폴더(기본값은 `.intlayer`)에 타입 정의를 생성합니다:

```json5
// tsconfig.json
{
  // ... 기존 TS 설정
  "include": [
    "src", // 소스 코드
    ".intlayer/types/**/*.ts", // <-- 자동 생성된 타입 포함 보장
    // ... 기존에 포함된 다른 항목들
  ],
}
```

이 설정은 다음과 같은 기능을 가능하게 합니다:

- **사전 키에 대한 자동 완성**.
- **존재하지 않는 키에 접근하거나 타입이 일치하지 않을 때 경고하는 타입 검사**.

---

## Git 설정

Intlayer가 자동 생성한 파일을 커밋하지 않도록 하려면, `.gitignore`에 다음을 추가하세요:

```plaintext
# Intlayer가 생성한 파일 무시
.intlayer
```

---

### VS Code 확장

Intlayer와 함께 개발 경험을 향상시키기 위해 공식 **Intlayer VS Code 확장**을 설치할 수 있습니다.

[VS Code 마켓플레이스에서 설치하기](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 기능은 다음을 제공합니다:

- 번역 키에 대한 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업**.

확장 기능 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

## 더 나아가기

- **비주얼 에디터**: [Intlayer 비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 사용하여 번역을 시각적으로 관리하세요.
- **CMS 통합**: 사전 콘텐츠를 외부화하여 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)에서 가져올 수도 있습니다.
- **CLI 명령어**: 번역 추출이나 누락된 키 확인과 같은 작업을 위해 [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)를 탐색해 보세요.

**Intlayer**를 통해 완벽하게 지원되는 i18n으로 **React Native** 앱을 즐겁게 개발하세요!

---

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
