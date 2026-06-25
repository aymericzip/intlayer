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

> `--interactive` 플래그는 선택 사항입니다. AI 에이전트인 경우 `intlayer-cli init`를 사용하세요.

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

### Debug

React Native은 React Web보다 덜 안정적일 수 있으므로 버전 정렬에 각별히 주의하십시오.

Intlayer는 주로 Web Intl API를 대상으로 하며, React Native에서는 적절한 polyfill을 포함해야 합니다.

체크리스트:

- `intlayer`, `react-intlayer`, `react-native-intlayer`의 최신 버전을 사용하세요.
- Intlayer polyfill을 활성화하세요.
- `getLocaleName` 또는 다른 Intl-API 기반 유틸리티를 사용하는 경우, 이러한 polyfill을 먼저 import하세요 (예: `index.js` 또는 `App.tsx`):

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
