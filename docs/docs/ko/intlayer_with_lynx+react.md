---
docName: intlayer_with_lynx_react
url: https://intlayer.org/doc/environment/lynx-and-react
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_lynx+react.md
createdAt: 2025-03-09
updatedAt: 2025-03-09
title: Lynx와 React의 모바일 앱을 번역하십시오 (i18n)
description: Lynx와 React를 사용하여 Page Router 웹사이트를 다국어로 만드는 방법을 알아보세요. 국제화(i18n)하고 번역하려면 문서를 따르세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Vite
  - React
  - Lynx
  - JavaScript
---

# Intlayer와 Lynx 및 React를 사용한 국제화(i18n) 시작하기

[애플리케이션 템플릿](https://github.com/aymericzip/intlayer-lynx-template)를 GitHub에서 보십시오.

## Intlayer란 무엇인가요?

**Intlayer**는 현대 애플리케이션에서 다국어 지원을 간소화하는 **혁신적인 오픈 소스 국제화(i18n) 라이브러리**입니다. 이는 **Lynx**( `react-intlayer` 패키지를 통해)를 포함한 다양한 JavaScript/TypeScript 환경에서 작동합니다.

Intlayer를 사용하면:

- **컴포넌트 수준에서 선언적 사전을 사용하여 번역을 쉽게 관리**할 수 있습니다.
- **자동 생성된 타입으로 TypeScript 지원을 보장**합니다.
- **UI 문자열**을 포함한 콘텐츠를 **동적으로 지역화**할 수 있습니다(웹용 React에서는 HTML 메타데이터 등도 지역화 가능).
- **동적 로케일 감지 및 전환**과 같은 고급 기능을 활용할 수 있습니다.

---

## 1단계: 종속성 설치

Lynx 프로젝트에서 다음 패키지를 설치하세요:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
```

### 패키지

- **intlayer**  
  구성, 사전 콘텐츠, 타입 생성 및 CLI 명령어를 위한 핵심 i18n 도구입니다.

- **react-intlayer**  
  Lynx에서 로케일을 가져오고 전환하는 데 사용할 컨텍스트 제공자 및 React 훅을 제공하는 React 통합입니다.

- **lynx-intlayer**  
  Lynx 번들러와 Intlayer를 통합하기 위한 플러그인을 제공하는 Lynx 통합입니다.

---

## 2단계: Intlayer 구성 파일 생성

프로젝트 루트(또는 편리한 위치)에 **Intlayer 구성** 파일을 생성하세요. 다음과 같이 보일 수 있습니다:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
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

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

이 구성 파일에서 다음을 수행할 수 있습니다:

- **지원되는 로케일 목록**을 구성합니다.
- **기본 로케일**을 설정합니다.
- 나중에 더 고급 옵션(예: 로그, 사용자 지정 콘텐츠 디렉토리 등)을 추가할 수 있습니다.
- [Intlayer 구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

## 3단계: Lynx 번들러에 Intlayer 플러그인 추가

Lynx에서 Intlayer를 사용하려면 `lynx.config.ts` 파일에 플러그인을 추가해야 합니다:

```ts fileName="lynx.config.ts"
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... 다른 플러그인
    pluginIntlayerLynx(),
  ],
});
```

## 4단계: Intlayer 제공자 추가

애플리케이션 전반에서 사용자 언어를 동기화하려면 `react-intlayer`의 `IntlayerProvider` 컴포넌트로 루트 컴포넌트를 감싸야 합니다.

또한, Intlayer가 제대로 작동할 수 있도록 `intlayerPolyfill` 함수 파일을 추가해야 합니다.

```tsx fileName="src/index.tsx"
import { root } from "@lynx-js/react";

import { App } from "./App.js";
import { IntlayerProvider } from "react-intlayer";
import { intlayerPolyfill } from "lynx-intlayer";

intlayerPolyfill();

root.render(
  <IntlayerProvider>
    <App />
  </IntlayerProvider>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
```

## 5단계: 콘텐츠 선언

프로젝트 내 어디에서나 **콘텐츠 선언** 파일을 생성하세요(일반적으로 `src/` 내). Intlayer가 지원하는 확장 형식을 사용할 수 있습니다:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- 등등.

예시 (Lynx용 TSX 노드를 사용하는 TypeScript):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      ko: "Lynx에서",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      ko: "로고를 누르고 즐기세요!",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        ko: "편집",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        ko: "업데이트를 확인하세요!",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      ko: "Lynx에서",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      ko: "로고를 누르고 즐기세요!",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        ko: "편집",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        ko: "업데이트를 확인하세요!",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      ko: "Lynx에서",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      ko: "로고를 누르고 즐기세요!",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        ko: "편집",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        ko: "업데이트를 확인하세요!",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "React",
    "subtitle": {
      "nodeType": "translation",
      "translation": {
        "ko": "Lynx에서",
        "en": "on Lynx",
        "fr": "sur Lynx",
        "es": "en Lynx"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "ko": "로고를 누르고 즐기세요!",
        "en": "Tap the logo and have fun!",
        "fr": "Appuyez sur le logo et amusez-vous!",
        "es": "¡Toca el logo y diviértete!"
      }
    },
    "hint": [
      {
        "nodeType": "translation",
        "translation": {
          "ko": "편집",
          "en": "Edit",
          "fr": "Modifier",
          "es": "Editar"
        }
      },
      " src/App.tsx ",
      {
        "nodeType": "translation",
        "translation": {
          "en": "to see updates!",
          "fr": "pour voir les mises à jour!",
          "es": "para ver actualizaciones!",
          "ko": "업데이트를 확인하세요!"
        }
      }
    ]
  }
}
```

> 콘텐츠 선언에 대한 자세한 내용은 [Intlayer의 콘텐츠 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/get_started.md)를 참조하세요.

---

## 단계 4: 컴포넌트에서 Intlayer 사용하기

`useIntlayer` 훅을 자식 컴포넌트에서 사용하여 로컬라이즈된 콘텐츠를 가져옵니다.

```tsx fileName="src/App.tsx"
import { useCallback, useState } from "@lynx-js/react";
import { useIntlayer } from "react-intlayer";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { LocaleSwitcher } from "./components/LocaleSwitcher.jsx";

export const App = () => {
  const [alterLogo, setAlterLogo] = useState(false);
  const { title, subtitle, description, hint } = useIntlayer("app");

  const onTap = useCallback(() => {
    // 배경만 변경
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">{title}</text>
          <text className="Subtitle">{subtitle}</text>
        </view>
        <view className="Content">
          <image src={arrow} className="Arrow" />
          <text className="Description">{description}</text>
          <text className="Hint">
            {hint[0]}
            <text style={{ fontStyle: "italic" }}>{hint[1]}</text>
            {hint[2]}
          </text>
        </view>
        <LocaleSwitcher />
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  );
};
```

> 문자열 기반 속성(예: 버튼의 `title` 또는 `Text` 컴포넌트의 `children`)에서 `content.someKey`를 사용할 때, **`content.someKey.value`를 호출**하여 실제 문자열을 가져오세요.

---

## (선택 사항) 단계 5: 앱 로케일 변경하기

컴포넌트 내에서 로케일을 전환하려면 `useLocale` 훅의 `setLocale` 메서드를 사용할 수 있습니다:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales, locale } = useLocale();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {availableLocales.map((localeEl) => (
        <text
          key={localeEl}
          style={{
            color: localeEl === locale ? "#fff" : "#888",
            fontSize: "12px",
          }}
          bindtap={() => setLocale(localeEl)}
        >
          {getLocaleName(localeEl)}
        </text>
      ))}
    </view>
  );
};
```

이 작업은 Intlayer 콘텐츠를 사용하는 모든 컴포넌트를 다시 렌더링하며, 새로운 로케일에 대한 번역을 표시합니다.

> 자세한 내용은 [`useLocale` 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useLocale.md)를 참조하세요.

## TypeScript 구성 (TypeScript를 사용하는 경우)

Intlayer는 자동 완성 기능을 개선하고 번역 오류를 감지하기 위해 숨겨진 폴더(기본적으로 `.intlayer`)에 타입 정의를 생성합니다:

```json5
// tsconfig.json
{
  // ... 기존 TS 구성
  "include": [
    "src", // 소스 코드
    ".intlayer/types/**/*.ts", // <-- 자동 생성된 타입 포함
    // ... 이미 포함된 다른 항목
  ],
}
```

이로 인해 다음과 같은 기능이 가능합니다:

- **사전 키에 대한 자동 완성**.
- **타입 검사**를 통해 존재하지 않는 키에 접근하거나 타입이 일치하지 않을 경우 경고.

---

## Git 구성

Intlayer에 의해 자동 생성된 파일을 커밋하지 않으려면 `.gitignore`에 다음을 추가하세요:

```plaintext
# Intlayer가 생성한 파일 무시
.intlayer
```

---

## 더 알아보기

- **시각적 편집기**: [Intlayer 시각적 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_visual_editor.md)를 사용하여 번역을 시각적으로 관리하세요.
- **CMS 통합**: 사전 콘텐츠를 외부화하고 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_CMS.md)에서 가져올 수도 있습니다.
- **CLI 명령어**: **번역 추출** 또는 **누락된 키 확인**과 같은 작업을 위한 [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)를 탐색하세요.
