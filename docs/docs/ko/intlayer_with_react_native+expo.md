---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: "Expo + React Native i18n - 앱을 번역하는 완전 가이드"
description: "i18next는 이제 그만. 2026년 다국어 (i18n) Expo + React Native 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO, 성능을 최적화하세요."
keywords:
  - 국제화
  - 문서
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
    changes: "Solid useIntlayer API 사용법을 직접 속성 액세스로 업데이트"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init 명령어 추가"
  - version: 5.5.10
    date: 2025-06-29
    changes: "초기 이력"
author: aymericzip
---

# Expo 및 React Native 앱 번역하기 | 국제화(i18n)

<Tabs defaultTab="code">
  <Tab label="코드" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="데모" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="데모 - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-react-native-template)을 참조하세요.

## 대안보다 Intlayer를 선택해야 하는 이유는 무엇입니까?

'react-native-localize' 또는 'i18next'와 같은 주요 솔루션과 비교할 때 Intlayer는 다음과 같은 통합 최적화가 제공되는 솔루션입니다.

<AccordionGroup>

<Accordion header="전체 React 네이티브 적용 범위">

Intlayer는 **구성 요소 수준 콘텐츠 범위 지정**, **TypeScript 지원** 및 모바일 앱에서 국제화(i18n) 확장에 필요한 모든 기능을 제공하여 React Native 및 Expo와 완벽하게 작동하도록 최적화되었습니다.

</Accordion>

<Accordion header="유지관리성">

애플리케이션 콘텐츠의 범위를 지정하면 대규모 애플리케이션의 **유지 관리가 용이해집니다**. 전체 콘텐츠 코드베이스를 검토해야 하는 정신적 부담 없이 단일 기능 폴더를 복제하거나 삭제할 수 있습니다. 또한 Intlayer는 **완전히 유형**되어 콘텐츠의 정확성을 보장합니다.

</Accordion>

<Accordion header="AI 에이전트">

콘텐츠를 같은 위치에 배치하면 LLM(대형 언어 모델)에 **필요한 컨텍스트가 줄어듭니다**. Intlayer에는 누락된 번역을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 및 **[agent)와 같은 도구 모음도 함께 제공됩니다. 기술](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, AI 에이전트를 위한 개발자 경험(DX)을 더욱 원활하게 만듭니다.

</Accordion>

<Accordion header="오토메이션">

AI 공급자의 비용으로 선택한 LLM을 사용하여 CI/CD 파이프라인을 번역하려면 자동화를 사용하세요. Intlayer는 또한 콘텐츠 추출을 자동화하는 **컴파일러**와 **백그라운드에서 번역**을 돕는 [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)을 제공합니다.

</Accordion>

<Accordion header="성능">

대규모 JSON 파일을 구성 요소에 연결하면 성능 및 반응성 문제가 발생할 수 있습니다. Intlayer는 빌드 시 콘텐츠 로딩을 최적화합니다.

</Accordion>

<Accordion header="개발자가 없는 경우 확장">

Intlayer는 단순한 i18n 솔루션 그 이상으로 관리에 도움이 되는 **자체 호스팅 [비주얼 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** 및 **[전체 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**를 제공합니다. 다국어 콘텐츠를 **실시간**으로 제공하여 번역가, 카피라이터, 기타 팀원과 원활하게 협업할 수 있습니다. 콘텐츠는 로컬 및/또는 원격으로 저장될 수 있습니다.

</Accordion>

<Accordion header="번들 크기">

대용량 JSON 파일을 페이지에 로드하는 대신 필요한 콘텐츠만 로드하세요. Intlayer는 **번들 및 보기 크기를 최대 50%** 줄이는 데 도움이 됩니다.

</Accordion>
</AccordionGroup>

## 1단계: 종속성 설치

GitHub의 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-react-native-template)을 참조하세요.

React Native 프로젝트에서 다음 패키지를 설치하십시오.

``bash packageManager="npm"
npm 설치 내부층 반응 내부층
npm install --save-dev 반응 네이티브-intlayer
npx 내부층 초기화

```

``bash packageManager="pnpm"
pnpm 내부층 추가 반응 내부층
pnpm add --save-dev 반응 네이티브-인레이어
pnpm 내부층 초기화
```

``bash packageManager="원사"
원사 내부층 추가 반응 내부층
원사 추가 --save-dev 반응 네이티브 내부층
원사 내부층 초기화

```

``bash packageManager="bun"
빵 내부 층 추가 반응 내부 층
bun add --dev 반응 네이티브-인레이어
롤빵 x 내부층 초기화
```

### 패키지

- **중층**  
  구성, 사전 콘텐츠, 유형 생성 및 CLI 명령을 위한 핵심 i18n 툴킷입니다.

- **반응 내부층**  
  로케일을 얻고 전환하기 위해 React Native에서 사용할 컨텍스트 공급자와 React 후크를 제공하는 React 통합입니다.

- **반응 네이티브 삽입층**  
  Intlayer를 React Native 번들러와 통합하기 위한 Metro 플러그인을 제공하는 React Native 통합입니다.

---

## 1단계: 의존성 설치

React Native 프로젝트에서 다음 패키지들을 설치하세요:

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

> 이 명령은 환경을 감지하고 필요한 패키지를 설치합니다. 예를 들어:

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

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

애플리케이션 전체에서 사용자 언어를 동기화하려면 루트 컴포넌트를 `react-intlayer-native`의 `IntlayerProvider` 컴포넌트로 감싸야 합니다.

> `react-intlayer` 대신 `react-native-intlayer`의 프로바이더를 사용해야 합니다. `react-native-intlayer`의 내보내기에는 웹 API용 폴리필이 포함되어 있습니다.

````tsx fileName="app/_layout.tsx" codeFormat={["typescript", "esm"]}
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";
import { type FC } from "react";


const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
`IntlayerProvider` 컴포넌트를 `react-intlayer`에서 가져와서 루트 컴포넌트를 감싸야 애플리케이션 전반에 걸쳐 사용자 언어를 동기화할 수 있습니다.

또한, `index.js` 파일에 `intlayerPolyfill` 함수를 추가하여 Intlayer가 제대로 작동하도록 해야 합니다.

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
````

## 5단계: 콘텐츠 선언하기

````

```jsx fileName="app/_layout.cjx" codeFormat="commonjs"
const { Stack } = require("expo-router");
const { getLocales } = require("expo-localization");
const { IntlayerProvider } = require("react-native-intlayer");


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

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> 콘텐츠 선언에 대한 자세한 내용은 [Intlayer 콘텐츠 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

---

## 4단계: 컴포넌트에서 Intlayer 사용하기

하위 컴포넌트에서 `useIntlayer` 훅을 사용하여 현지화된 콘텐츠를 가져옵니다.

### 예제

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
    flexDirection: "row", // 행 방향 배치
    alignItems: "center", // 중앙 정렬
    gap: 8, // 요소 간 간격
  },
});

export default HomeScreen;
```

> 문자열 기반 props(예: 버튼의 `title` 또는 `Text` 컴포넌트의 `children`)에서 `content.someKey`를 사용할 때는, 실제 문자열을 얻기 위해 **`content.someKey.value`를 호출하세요**.

---

## (선택 사항) 5단계: 앱 로케일 변경하기

컴포넌트 내에서 로케일을 전환하려면, `useLocale` 훅의 `setLocale` 메서드를 사용할 수 있습니다:

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

```bash
#  Intlayer가 생성한 파일 무시
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
- **CLI 명령어**: 번역 추출이나 누락된 키 확인과 같은 작업을 위해 [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 탐색해 보세요.

**Intlayer**를 통해 완벽하게 지원되는 i18n으로 **React Native** 앱을 즐겁게 개발하세요!

---
