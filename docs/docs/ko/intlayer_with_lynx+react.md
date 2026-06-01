---
createdAt: 2025-03-09
updatedAt: 2026-05-31
title: "Lynx + React i18n - 완전한 번역 가이드: Lynx"
description: 번들 크기, SEO, 성능 및 유지보수성을 위한 최고의 솔루션. 2026년에 Lynx and React 모바일 앱를 다국어로 만드세요, LLM 번역, Agent Skills & MCP.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Vite
  - React
  - Lynx
  - JavaScript
slugs:
  - doc
  - environment
  - lynx-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-lynx-template
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
---

# Intlayer로 Lynx and React mobile app 번역하기 | 국제화(i18n)

[애플리케이션 템플릿](https://github.com/aymericzip/intlayer-lynx-template)을 GitHub에서 확인하세요.

## 대안보다 Intlayer를 선택해야 하는 이유는 무엇입니까?

'react-native-localize' 또는 'i18next'와 같은 주요 솔루션과 비교할 때 Intlayer는 다음과 같은 통합 최적화가 제공되는 솔루션입니다.

<AccordionGroup>
<Accordion header="전체 Lynx 적용 범위">

Intlayer는 **구성 요소 수준 콘텐츠 범위 지정**, **TypeScript 지원** 및 국제화 확장(i18n)에 필요한 모든 기능을 제공하여 Lynx 및 React와 완벽하게 작동하도록 최적화되었습니다.

</Accordion>
<Accordion header="번들 크기">

대용량 JSON 파일을 페이지에 로드하는 대신 필요한 콘텐츠만 로드하세요. Intlayer는 **번들 및 페이지 크기를 최대 50%** 줄이는 데 도움이 됩니다.

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
</AccordionGroup>

---

## 1단계: 종속성 설치

Lynx 프로젝트에서 다음 패키지를 설치하세요:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer lynx-intlayer
bun x intlayer init
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

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

이 구성 파일에서 다음을 수행할 수 있습니다:

- **지원되는 로케일 목록**을 구성합니다.
- **기본 로케일**을 설정합니다.
- 나중에 더 고급 옵션(예: 로그, 사용자 지정 콘텐츠 디렉토리 등)을 추가할 수 있습니다.
- 자세한 내용은 [Intlayer 구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

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

예시:

```tsx fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
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
        "ko": "업데이트를 확인하세요!",
        "en": "to see updates!",
        "fr": "pour voir les mises à jour!",
        "es": "para ver actualizaciones!"
      }
    }
  ]
}
```

> 콘텐츠 선언에 대한 자세한 내용은 [Intlayer의 콘텐츠 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

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

> 자세한 내용은 [`useLocale` 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)를 참조하세요.

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

```bash
#  Intlayer가 생성한 파일 무시
.intlayer
```

---

### VS Code 확장

Intlayer와 함께 개발 경험을 향상시키려면 공식 **Intlayer VS Code 확장**을 설치할 수 있습니다.

[VS Code 마켓플레이스에서 설치하기](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장은 다음 기능을 제공합니다:

- 번역 키에 대한 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업**.
  확장 프로그램 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

## 더 알아보기

- **시각적 편집기**: [Intlayer 시각적 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 사용하여 번역을 시각적으로 관리하세요.
- **CMS 통합**: 사전 콘텐츠를 외부화하고 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)에서 가져올 수도 있습니다.
- **CLI 명령어**: **번역 추출** 또는 **누락된 키 확인**과 같은 작업을 위한 [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 탐색하세요.

---
