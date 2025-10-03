---
createdAt: 2025-09-04
updatedAt: 2025-10-03
title: React Router v7에서 Intlayer로 시작하는 국제화(i18n)
description: Intlayer를 사용하여 React Router v7 애플리케이션에 국제화(i18n)를 추가하는 방법을 배우세요. 로케일 인식 라우팅으로 앱을 다국어로 만드는 종합 가이드를 따르세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - 로케일 라우팅
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7
---

# Intlayer와 React Router v7로 시작하는 국제화(i18n)

이 가이드는 React Router v7 프로젝트에서 로케일 인식 라우팅, TypeScript 지원 및 최신 개발 방식을 활용하여 **Intlayer**를 통합해 원활한 국제화(i18n)를 구현하는 방법을 보여줍니다.

## Intlayer란 무엇인가요?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적이고 오픈 소스인 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면 다음을 할 수 있습니다:

- **컴포넌트 수준에서 선언적 사전을 사용하여 번역을 쉽게 관리**할 수 있습니다.
- **메타데이터, 라우트 및 콘텐츠를 동적으로 현지화**할 수 있습니다.
- **자동 생성된 타입으로 TypeScript 지원을 보장**하여 자동 완성 및 오류 감지를 향상시킵니다.
- **동적 로케일 감지 및 전환과 같은 고급 기능을 활용**할 수 있습니다.
- **React Router v7의 구성 기반 라우팅 시스템을 사용하여 로케일 인식 라우팅 활성화**.

---

## React Router v7 애플리케이션에서 Intlayer 설정 단계별 가이드

### 1단계: 의존성 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

- **intlayer**  
  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md), 트랜스파일링 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)를 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **react-intlayer**  
  Intlayer를 React 애플리케이션과 통합하는 패키지로, React 국제화를 위한 컨텍스트 제공자와 훅을 제공합니다.

- **vite-intlayer**  
  Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Vite 플러그인과, 사용자의 선호 로케일 감지, 쿠키 관리, URL 리디렉션 처리를 위한 미들웨어를 포함합니다.

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위한 설정 파일을 만드세요:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // 기본 로케일 설정
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // 지원하는 로케일 목록
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // 기본 로케일 설정
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // 지원하는 로케일 목록
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

module.exports = config;
```

> 이 구성 파일을 통해 지역화된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자 설정, 콘솔에서 Intlayer 로그 비활성화 등 다양한 설정을 할 수 있습니다. 사용 가능한 모든 매개변수 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### 3단계: Vite 구성에 Intlayer 통합하기

구성에 intlayer 플러그인을 추가하세요:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer()],
});
```

> `intlayer()` Vite 플러그인은 Intlayer를 Vite와 통합하는 데 사용됩니다. 이 플러그인은 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. 또한 Vite 애플리케이션 내에서 Intlayer 환경 변수를 정의하며, 성능 최적화를 위한 별칭(alias)도 제공합니다.

### Step 4: React Router v7 라우트 구성

로케일 인식 라우트로 라우팅 구성을 설정하세요:

```typescript fileName="app/routes.ts"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/:lang?", "routes/page.tsx"), // 지역화된 홈 페이지
    route("/:lang?/about", "routes/about/page.tsx"), // 지역화된 소개 페이지
  ]),
] satisfies RouteConfig;
```

### 5단계: 레이아웃 컴포넌트 생성

루트 레이아웃과 로케일별 레이아웃을 설정하세요:

#### 루트 레이아웃

```tsx fileName="app/routes/layout.tsx"
import { IntlayerProvider } from "react-intlayer";
import { Outlet } from "react-router";

import type { Route } from "./+types/layout";

export default function RootLayout({ params }: Route.ComponentProps) {
  const { locale } = params;

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### 6단계: 콘텐츠 선언하기

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리하세요:

```tsx fileName="app/routes/[lang]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      en: "Learn About Us",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
    homeLink: t({
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> 콘텐츠 선언은 애플리케이션 내 어디서든 정의할 수 있으며, `contentDir` 디렉토리(기본값: `./app`)에 포함되면 자동으로 인식됩니다. 또한 콘텐츠 선언 파일 확장자(기본값: `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)를 참조하세요.

### 7단계: 로케일 인식 컴포넌트 생성

로케일 인식 내비게이션을 위한 `LocalizedLink` 컴포넌트를 생성합니다:

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

// 외부 링크인지 확인하는 함수
export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to; // 외부 링크면 그대로 반환
    }

    return getLocalizedUrl(to, locale); // 내부 링크면 로케일에 맞게 변환
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to; // 외부 링크면 그대로 반환
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale), // 내부 경로를 로케일에 맞게 변환
  };
};

export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

로컬라이즈된 경로로 이동하려는 경우, `useLocalizedNavigate` 훅을 사용할 수 있습니다:

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

### 8단계: 페이지에서 Intlayer 활용하기

애플리케이션 전반에서 콘텐츠 사전을 액세스하세요:

#### 현지화된 홈 페이지

```tsx fileName="app/routes/[lang]/page.tsx"
import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "~/components/localized-link";

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

> `useIntlayer` 훅에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)를 참조하세요.

### 9단계: 로케일 스위처 컴포넌트 만들기

사용자가 언어를 변경할 수 있도록 컴포넌트를 만드세요:

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { setLocaleCookie, useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            onClick={() => setLocaleCookie(localeItem)}
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* 로케일 - 예: FR */}
              {localeItem}
            </span>
            <span>
              {/* 해당 로케일의 언어 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일에서의 언어 - 예: 현재 로케일이 Locales.SPANISH일 때 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 된 언어 이름 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

> `useLocale` 훅에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)를 참조하세요.

### 10단계: HTML 속성 관리 추가 (선택 사항)

HTML의 lang 및 dir 속성을 관리하는 훅을 만듭니다:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx"
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

그런 다음 루트 컴포넌트에서 사용하세요:

```tsx fileName="app/routes/layout.tsx"
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // 훅을 가져옵니다

export default function RootLayout() {
  useI18nHTMLAttributes(); // 훅을 호출합니다

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### 11단계: 미들웨어 추가 (선택 사항)

`intlayerMiddleware`를 사용하여 애플리케이션에 서버 사이드 라우팅을 추가할 수도 있습니다. 이 플러그인은 URL을 기반으로 현재 로케일을 자동으로 감지하고 적절한 로케일 쿠키를 설정합니다. 로케일이 지정되지 않은 경우, 플러그인은 사용자의 브라우저 언어 설정을 기반으로 가장 적합한 로케일을 결정합니다. 로케일이 감지되지 않으면 기본 로케일로 리디렉션합니다.

> `intlayerMiddleware`를 프로덕션 환경에서 사용하려면 `vite-intlayer` 패키지를 `devDependencies`에서 `dependencies`로 변경해야 합니다.

```typescript {3,7} fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerMiddleware()],
});
```

---

## TypeScript 구성

Intlayer는 모듈 확장을 사용하여 TypeScript의 이점을 활용하고 코드베이스를 더욱 견고하게 만듭니다.

TypeScript 구성에 자동 생성된 타입이 포함되어 있는지 확인하세요:

```json5 fileName="tsconfig.json"
{
  // ... 기존 구성
  include: [
    // ... 기존 포함 항목
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

---

## Git 구성

Intlayer가 생성한 파일은 Git 저장소에 커밋하지 않도록 무시하는 것이 좋습니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer가 생성한 파일 무시
.intlayer
```

---

## VS 코드 확장

Intlayer 개발 경험을 향상시키기 위해 공식 **Intlayer VS 코드 확장**을 설치할 수 있습니다.

[VS 코드 마켓플레이스에서 설치하기](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장은 다음 기능을 제공합니다:

- 번역 키에 대한 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업**.

확장 사용 방법에 대한 자세한 내용은 [Intlayer VS 코드 확장 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

## 더 나아가기

더 나아가려면 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

---

## 문서 참조

- [Intlayer 문서](https://intlayer.org)
- [React Router v7 문서](https://reactrouter.com/)
- [useIntlayer 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)
- [useLocale 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)
- [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)
- [설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)

이 포괄적인 가이드는 Intlayer를 React Router v7과 통합하여 로케일 인식 라우팅과 TypeScript 지원이 포함된 완전한 국제화 애플리케이션을 구축하는 데 필요한 모든 것을 제공합니다.

## 문서 이력

| 버전  | 날짜       | 변경 사항                 |
| ----- | ---------- | ------------------------- |
| 6.1.5 | 2025-10-03 | 문서 업데이트             |
| 5.8.2 | 2025-09-04 | React Router v7 지원 추가 |
