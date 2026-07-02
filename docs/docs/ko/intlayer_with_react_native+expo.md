---
createdAt: 2025-06-18
updatedAt: 2026-06-25
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
  - version: 9.0.0
    date: 2026-06-25
    changes: "프로바이더와 훅을 react-native-intlayer에서 직접 가져오기; react-intlayer는 더 이상 직접 의존성으로 필요하지 않음"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API 사용법을 직접 속성 액세스로 업데이트"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init 명령어 추가"
  - version: 6.1.6
    date: 2025-10-02
    changes: "디버그 섹션 추가"
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
  title="Demo CodeSandbox - Intlayer를 사용하여 애플리케이션을 국제화하는 방법"
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

## 목차

<TOC/>

## 대안 대비 Intlayer를 선택하는 이유

`react-native-localize`나 `i18next`와 같은 주요 솔루션과 비교했을 때, Intlayer는 다음과 같은 통합 최적화 기능을 갖춘 솔루션입니다:

<AccordionGroup>

<Accordion header="완전한 React Native 지원">

Intlayer는 React Native와 Expo에서 완벽하게 작동하도록 최적화되어 있으며, **컴포넌트 수준의 콘텐츠 범위 지정**, **TypeScript 지원**, 그리고 모바일 앱에서 국제화(i18n)를 확장하는 데 필요한 모든 기능을 제공합니다.

</Accordion>

<Accordion header="유지 보수성">

애플리케이션의 콘텐츠 범위를 지정하면 대규모 애플리케이션의 **유지 보수가 용이**해집니다. 전체 콘텐츠 코드베이스를 검토해야 하는 부담 없이 단일 기능 폴더를 복제하거나 삭제할 수 있습니다. 또한 Intlayer는 콘텐츠의 정확성을 보장하기 위해 **완전히 타입이 지정**되어 있습니다.

</Accordion>

<Accordion header="AI 에이전트">

콘텐츠를 함께 배치하면 대형 언어 모델(LLM)에 필요한 **컨텍스트가 줄어**듭니다. Intlayer는 누락된 번역을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, **[에이전트 스킬](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)** 등의 도구 모음을 제공하여 AI 에이전트를 위한 개발자 경험(DX)을 더욱 원활하게 합니다.

</Accordion>

<Accordion header="자동화">

AI 제공업체 비용으로 원하는 LLM을 사용하여 CI/CD 파이프라인에서 자동화로 번역하세요. Intlayer는 콘텐츠 추출을 자동화하는 **컴파일러**와 **백그라운드에서 번역**을 도와주는 [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)도 제공합니다.

</Accordion>

<Accordion header="성능">

대용량 JSON 파일을 컴포넌트에 연결하면 성능 및 반응성 문제가 발생할 수 있습니다. Intlayer는 빌드 시 콘텐츠 로딩을 최적화합니다.

</Accordion>

<Accordion header="비개발자와의 확장">

단순한 i18n 솔루션 이상으로, Intlayer는 번역사, 카피라이터, 기타 팀원들과의 협업을 원활하게 하는 **자체 호스팅 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**와 **[완전한 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**를 제공하여 다국어 콘텐츠를 **실시간**으로 관리할 수 있게 합니다. 콘텐츠는 로컬 및/또는 원격으로 저장할 수 있습니다.

</Accordion>

<Accordion header="번들 크기">

페이지에 대용량 JSON 파일을 로드하는 대신 필요한 콘텐츠만 로드하세요. Intlayer는 **번들 및 뷰 크기를 최대 50%까지 줄이는** 데 도움을 줍니다.

</Accordion>
</AccordionGroup>

<Steps>

<Step number={1} title="의존성 설치">

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-react-native-template)을 참조하세요.

React Native 프로젝트에서 다음 패키지들을 설치하세요:

```bash packageManager="npm"
npx intlayer@canary init --interactive    # v9
# npx intlayer init                       # v8
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive   # v9
# pnpm dlx intlayer init                      # v8
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive   # v9
# yarn dlx intlayer init                      # v8
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive   # v9
# bunx intlayer init                      # v8
```

> `--interactive` 플래그는 선택 사항입니다. AI 에이전트인 경우 `intlayer-cli init`를 사용하세요.

> 이 명령은 환경을 감지하고 필요한 패키지를 설치합니다. 예를 들어:

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

### 패키지

- **intlayer**  
  구성, 사전 콘텐츠, 유형 생성 및 CLI 명령을 위한 핵심 i18n 툴킷입니다.

- **react-native-intlayer**  
  로케일을 얻고 전환하기 위해 사용할 컨텍스트 프로바이더와 React 훅, React Native 폴리필, 그리고 Intlayer를 React Native 번들러와 통합하기 위한 Metro 플러그인을 제공하는 React Native 통합입니다. `react-intlayer`의 모든 것을 재내보내므로 React Native 앱에서는 이 단일 패키지만 필요합니다.

---

</Step>

<Step number={2} title="Intlayer 구성 생성">

프로젝트 루트(또는 적절한 곳)에 **Intlayer 구성** 파일을 생성하세요. 예시:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
/**
 * Locales 타입을 사용할 수 없는 경우, tsconfig.json에서 moduleResolution을 "bundler"로 설정해 보세요
 */
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... 필요한 다른 로케일 추가
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

이 구성에서 다음을 설정할 수 있습니다:

- **지원되는 로케일 목록** 구성.
- **기본** 로케일 설정.
- 나중에 더 많은 고급 옵션(로그, 사용자 정의 콘텐츠 디렉토리 등)을 추가할 수 있습니다.
- 자세한 내용은 [Intlayer 구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Step>

<Step number={3} title="Metro 플러그인 추가">

Metro는 React Native의 번들러입니다. `react-native init` 명령으로 생성된 React Native 프로젝트의 기본 번들러입니다. Intlayer를 Metro와 함께 사용하려면 `metro.config.js` 파일에 플러그인을 추가해야 합니다:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

> 참고: `configMetroIntlayer`는 Promise 함수입니다. 동기적으로 사용하거나 IIFE(즉시 호출 함수 표현식)를 피하려면 `configMetroIntlayerSync`를 사용하세요.
> 참고: `configMetroIntlayerSync`는 서버 시작 시 intlayer 사전 빌드를 허용하지 않습니다.

</Step>

<Step number={4} title="Intlayer 프로바이더 추가">

애플리케이션 전체에서 사용자 언어를 동기화하려면 루트 컴포넌트를 `react-native-intlayer`의 `IntlayerProvider` 컴포넌트로 감싸야 합니다.

> 항상 `react-native-intlayer`에서 가져오세요. 이 패키지의 `IntlayerProvider`는 Intlayer가 사용하는 웹 API에 대한 폴리필을 포함하며, `react-intlayer`의 모든 훅과 유틸리티를 재내보냅니다.

또한 Intlayer가 올바르게 작동할 수 있도록 `index.js` 파일에 `intlayerPolyfill` 함수를 추가해야 합니다.

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

<Step number={5} title="콘텐츠 선언하기">

프로젝트 내 어디에서나(일반적으로 `src/` 내) **콘텐츠 선언** 파일을 생성하세요. Intlayer가 지원하는 확장자 형식을 사용할 수 있습니다:

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
- 기타

> **Expo Router (웹): `.content.*` 파일을 `app/` 디렉토리 외부에 보관하세요.** Expo Router는 `app/` 내의 모든 JavaScript/TypeScript 파일을 라우트로 취급합니다. 웹에서는 라우트 검색이 파일 시스템을 직접 스캔하며 Metro의 `resolver.blockList`를 **따르지 않으므로**, 함께 위치한 `*.content.ts`가 라우트로 등록됩니다. `app/(tabs)/_layout.content.ts`와 같은 파일은 레이아웃으로 파싱되기도 하며(`.content` 부분이 플랫폼 접미사로 읽힘), 이는 실제 `_layout.tsx`와 충돌하여 다음 오류를 발생시킵니다:
>
> ```
> The layouts "./(tabs)/_layout.content.ts" and "./(tabs)/_layout.tsx" conflict on the route "/(tabs)/_layout.content". Remove or rename one of these files.
> ```
>
> 선언을 `app/` 외부의 디렉토리(예: `content/` 또는 `src/content/`)에 배치하세요. Intlayer는 프로젝트 어디에서나 `.content.*` 파일을 발견하며 딕셔너리는 해당 `key`로 참조되므로 가져오기(import)를 변경할 필요가 없습니다. 네이티브에서는 이것이 필요하지 않지만(Metro의 `blockList`가 이미 숨김 처리함), `app/` 외부 디렉토리를 사용하면 두 플랫폼 모두 정상적으로 작동합니다.

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

</Step>

<Step number={6} title="컴포넌트에서 Intlayer 사용하기">

자식 컴포넌트에서 `useIntlayer` 훅을 사용하여 지역화된 콘텐츠를 가져오세요.

### 예시

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

> 문자열 기반 prop(예: 버튼의 `title` 또는 `Text` 컴포넌트의 `children`)에서 `content.someKey`를 사용할 때는 실제 문자열을 얻기 위해 **`content.someKey.value`를 호출**하세요.

> 앱이 이미 존재한다면 [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)와 [extract 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)를 사용하여 수천 개의 컴포넌트를 한 번에 변환할 수 있습니다.

---

</Step>

<Step number={7} title="앱 로케일 변경하기" isOptional={true}>

컴포넌트 내에서 로케일을 전환하려면 `useLocale` 훅의 `setLocale` 메서드를 사용할 수 있습니다:

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

이 코드는 Intlayer 콘텐츠를 사용하는 모든 컴포넌트의 리렌더링을 트리거하며, 이제 새로운 로케일에 대한 번역을 표시합니다.

> 자세한 내용은 [`useLocale` 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)를 참조하세요.

</Step>

</Steps>

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
- **CLI 명령어**: 번역 추출이나 누락된 키 확인과 같은 작업을 위해 [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 탐색해 보세요.

**Intlayer**를 통해 완벽하게 지원되는 i18n으로 **React Native** 앱을 즐겁게 개발하세요!

---

### Debug

React Native은 React Web보다 덜 안정적일 수 있으므로 버전 정렬에 각별히 주의하십시오.

Intlayer는 주로 Web Intl API를 대상으로 하며, React Native에서는 적절한 폴리필을 포함해야 합니다.

체크리스트:

- `intlayer`와 `react-native-intlayer`의 최신 버전을 사용하세요.
- Intlayer 폴리필을 활성화하세요.
- `getLocaleName` 또는 다른 Intl-API 기반 유틸리티를 사용하는 경우, 이러한 폴리필을 먼저 import하세요 (예: `index.js` 또는 `App.tsx`):

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

- 모듈을 확인할 수 없으면 Metro 구성(resolver aliases, asset plugins, `tsconfig` paths)을 확인하세요.

---
