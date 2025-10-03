---
createdAt: 2025-09-04
updatedAt: 2025-09-04
title: React Router v7에서 Intlayer로 시작하는 국제화(i18n)
description: Intlayer를 사용하여 React Router v7 애플리케이션에 국제화(i18n)를 추가하는 방법을 배우세요. 로케일 인식 라우팅으로 앱을 다국어 지원으로 만드는 종합 가이드입니다.
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
applicationTemplate: https://github.com/AydinTheFirst/react-router-intlayer
author: AydinTheFirst
---

# Intlayer와 React Router v7로 시작하는 국제화(i18n)

이 가이드는 React Router v7 프로젝트에서 로케일 인식 라우팅, TypeScript 지원 및 최신 개발 방식을 활용하여 **Intlayer**를 원활한 국제화(i18n) 통합에 사용하는 방법을 보여줍니다.

## Intlayer란 무엇인가요?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적이고 오픈 소스인 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면 다음을 할 수 있습니다:

- **컴포넌트 수준에서 선언적 사전을 사용하여 번역을 쉽게 관리**할 수 있습니다.
- **메타데이터, 라우트 및 콘텐츠를 동적으로 현지화**할 수 있습니다.
- **자동 생성된 타입으로 TypeScript 지원을 보장**하여 자동 완성 및 오류 감지를 향상시킵니다.
- **동적 로케일 감지 및 전환과 같은 고급 기능**을 활용할 수 있습니다.
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
  Intlayer를 React 애플리케이션과 통합하는 패키지입니다. React 국제화를 위한 컨텍스트 프로바이더와 훅을 제공합니다.

- **vite-intlayer**  
  Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Vite 플러그인과, 사용자의 선호 로케일 감지, 쿠키 관리, URL 리디렉션 처리를 위한 미들웨어를 포함합니다.

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위한 설정 파일을 만드세요:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true, // URL에 항상 기본 로케일 접두사 추가
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true,
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
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true,
  },
};

module.exports = config;
```

> 이 구성 파일을 통해 지역화된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자 설정, 콘솔에서 Intlayer 로그 비활성화 등 다양한 설정을 할 수 있습니다. 사용 가능한 모든 매개변수 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### 3단계: React Router v7 라우트 구성

로케일 인식 라우트로 라우팅 구성을 설정하세요:

```typescript fileName="app/routes.ts" codeFormat="typescript"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/", "routes/page.tsx"), // 루트 페이지 - 로케일로 리디렉션
    route("/:lang", "routes/[lang]/page.tsx"), // 로케일별 홈 페이지
    route("/:lang/about", "routes/[lang]/about/page.tsx"), // 로케일별 소개 페이지
  ]),
] satisfies RouteConfig;
```

### 4단계: Vite 구성에 Intlayer 통합

intlayer 플러그인을 구성에 추가하세요:

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayerMiddleware, intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer(), intlayerMiddleware()],
});
```

> `intlayer()` Vite 플러그인은 Intlayer를 Vite와 통합하는 데 사용됩니다. 이 플러그인은 콘텐츠 선언 파일을 빌드하고 개발 모드에서 이를 모니터링합니다. 또한 Vite 애플리케이션 내에서 Intlayer 환경 변수를 정의하며, 성능 최적화를 위해 별칭(alias)도 제공합니다.

### 5단계: 레이아웃 컴포넌트 생성

루트 레이아웃과 로케일별 레이아웃을 설정하세요:

#### 루트 레이아웃

```tsx fileName="app/routes/layout.tsx" codeFormat="typescript"
tsx fileName="app/routes/layout.tsx" codeFormat="typescript"
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

export default function RootLayout() {
  return (
    <IntlayerProvider>
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
      tr: "React Router v7 + Intlayer'a Hoş Geldiniz",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      tr: "React Router v7 ve Intlayer kullanarak kolayca çok dilli uygulamalar geliştirin.",
    }),
    aboutLink: t({
      en: "Learn About Us",
      tr: "Hakkımızda Öğrenin",
    }),
    homeLink: t({
      en: "Home",
      tr: "Ana Sayfa",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> 콘텐츠 선언은 애플리케이션 내 어디에서든 정의할 수 있으며, `contentDir` 디렉토리(기본값: `./app`)에 포함되면 자동으로 인식됩니다. 또한 콘텐츠 선언 파일 확장자(기본값: `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)를 참조하세요.

### 7단계: 로케일 인식 컴포넌트 생성

로케일 인식 내비게이션을 위한 `LocalizedLink` 컴포넌트를 만드세요:

```tsx fileName="app/components/localized-link.tsx" codeFormat="typescript"
// app/components/localized-link.tsx
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import React from "react";
import { Link, useLocation } from "react-router";

type RouterLinkProps = React.ComponentProps<typeof Link>;

export default function LocalizedLink({ to, ...props }: RouterLinkProps) {
  const { locale } = useLocale();
  const location = useLocation();

  const isExternal = (path: string) =>
    /^([a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith("mailto:");

  if (typeof to === "string") {
    if (to.startsWith("/") && !isExternal(to)) {
      return <Link to={getLocalizedUrl(to, locale)} {...props} />;
    }
    return <Link to={to} {...props} />;
  }

  if (to && typeof to === "object") {
    const pathname = (to as { pathname?: string }).pathname;
    if (pathname && pathname.startsWith("/") && !isExternal(pathname)) {
      return (
        <Link
          to={{ ...to, pathname: getLocalizedUrl(pathname, locale) }}
          {...props}
        />
      );
    }
    return <Link to={to} {...props} />;
  }

  return (
    <Link
      to={getLocalizedUrl(location.pathname + location.search, locale)}
      {...props}
    />
  );
}
```

### 8단계: 페이지에서 Intlayer 사용하기

애플리케이션 전반에서 콘텐츠 사전을 접근하세요:

#### 루트 리디렉션 페이지

```tsx fileName="app/routes/page.tsx" codeFormat="typescript"
import { useLocale } from "react-intlayer";
import { Navigate } from "react-router";

export default function Page() {
  const { locale } = useLocale();

  return <Navigate replace to={locale} />;
}
```

#### 지역화된 홈 페이지

```tsx fileName="app/routes/[lang]/page.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";
import LocalizedLink from "~/components/localized-link";

export default function Page() {
  const content = useIntlayer("page");

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <nav style={{ marginTop: "2rem" }}>
        <LocalizedLink
          to="/about"
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          {content.aboutLink}
        </LocalizedLink>
      </nav>
    </div>
  );
}
```

> `useIntlayer` 훅에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)를 참조하세요.

### 9단계: 로케일 전환기 컴포넌트 만들기

사용자가 언어를 변경할 수 있도록 컴포넌트를 만듭니다:

```tsx fileName="app/components/locale-switcher.tsx" codeFormat="typescript"
import { getLocalizedUrl, getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router";

export default function LocaleSwitcher() {
  const { locale, availableLocales, setLocale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLocaleChange = (newLocale: string) => {
    const localizedUrl = getLocalizedUrl(
      location.pathname + location.search,
      newLocale
    );
    setLocale(newLocale);
    navigate(localizedUrl);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <label htmlFor="locale-select">언어 선택: </label>
      <select
        id="locale-select"
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        style={{ padding: "0.25rem", marginLeft: "0.5rem" }}
      >
        {availableLocales.map((availableLocale) => (
          <option key={availableLocale} value={availableLocale}>
            {getLocaleName(availableLocale)}
          </option>
        ))}
      </select>
    </div>
  );
}
```

> `useLocale` 훅에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)를 참조하세요.

### 10단계: HTML 속성 관리 추가 (선택 사항)

HTML의 lang 및 dir 속성을 관리하는 훅을 만듭니다:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
// app/hooks/useI18nHTMLAttributes.tsx
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

```tsx fileName="app/root.tsx" codeFormat="typescript"
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // 훅을 임포트합니다

export default function RootLayout() {
  useI18nHTMLAttributes(); // 훅을 호출합니다

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### 11단계: 애플리케이션 빌드 및 실행

콘텐츠 사전을 빌드하고 애플리케이션을 실행하세요:

```bash packageManager="npm"
# Intlayer 사전 빌드
npm run intlayer:build

# 개발 서버 시작
npm run dev
```

```bash packageManager="pnpm"
# Intlayer 사전 빌드
pnpm intlayer:build

# 개발 서버 시작
pnpm dev
```

```bash packageManager="yarn"
# Intlayer 사전 빌드
yarn intlayer:build

# 개발 서버 시작
yarn dev
```

### 12단계: TypeScript 구성 (선택 사항)

Intlayer는 모듈 확장을 사용하여 TypeScript의 이점을 활용하고 코드베이스를 더욱 견고하게 만듭니다.

TypeScript 구성에 자동 생성된 타입이 포함되어 있는지 확인하세요:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... 기존 TypeScript 구성
  },
  include: [
json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... 기존 TypeScript 설정
  },
  include: [
    // ... 기존 포함 항목
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### Git 설정

Intlayer가 생성하는 파일들은 Git 저장소에 커밋하지 않도록 무시하는 것이 권장됩니다.

이를 위해 `.gitignore` 파일에 다음 내용을 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer가 생성한 파일 무시
.intlayer
```

---

## 프로덕션 배포

애플리케이션을 배포할 때:

1. **애플리케이션 빌드:**

   ```bash
   npm run build
   ```

2. **Intlayer 사전 빌드:**

   ```bash
   npm run intlayer:build
   ```

3. **프로덕션에서 미들웨어를 사용할 경우 `vite-intlayer`를 dependencies로 이동:**

   ```bash
   npm install vite-intlayer --save
   ```

귀하의 애플리케이션은 이제 다음을 지원합니다:

- **URL 구조**: `/en`, `/en/about`, `/tr`, `/tr/about`
- 브라우저 환경 설정에 따른 **자동 로케일 감지**
- React Router v7과 함께하는 **로케일 인식 라우팅**
- 자동 생성 타입을 통한 **TypeScript 지원**
- 적절한 로케일 처리를 포함한 **서버 사이드 렌더링**

## VS Code 확장 프로그램

Intlayer와 함께 개발 경험을 향상시키기 위해 공식 **Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code 마켓플레이스에서 설치하기](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음을 제공합니다:

- 번역 키에 대한 **자동 완성**
- 누락된 번역에 대한 **실시간 오류 감지**
- 번역된 콘텐츠의 **인라인 미리보기**
- **빠른 작업**으로 번역을 쉽게 생성하고 업데이트할 수 있습니다.

확장 기능 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

## 더 나아가기

더 나아가려면 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

---

## 문서 참고

- [Intlayer 문서](https://intlayer.org)
- [React Router v7 문서](https://reactrouter.com/)
- [useIntlayer 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)
- [useLocale 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)
- [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)
- [설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)

이 포괄적인 가이드는 React Router v7과 Intlayer를 통합하여 로케일 인식 라우팅과 TypeScript 지원이 포함된 완전한 국제화 애플리케이션을 구축하는 데 필요한 모든 내용을 제공합니다.

## 문서 이력

| 버전  | 날짜      | 변경 사항              |
| ----- | --------- | ---------------------- |
| 5.8.2 | 2025-09-4 | React Router v7용 추가 |
