---
createdAt: 2025-09-04
updatedAt: 2026-06-23
title: "React Router v7 i18n - 앱을 번역하는 완전 가이드"
description: "i18next는 이제 그만. 2026년 다국어 (i18n) React Router v7 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO, 성능을 최적화하세요."
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
  - react-router-v7-fs-routes
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-template
applicationShowcase: https://intlayer-react-router-v7.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API 사용법을 직접 속성 액세스로 업데이트"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init 명령어 추가"
  - version: 6.1.5
    date: 2025-10-03
    changes: "문서 업데이트"
  - version: 5.8.2
    date: 2025-09-04
    changes: "React Router v7 지원 추가"
author: aymericzip
---

# Intlayer로 React Router v7 번역하기 | 국제화(i18n)

이 가이드는 React Router v7 프로젝트에서 로케일 인식 라우팅, TypeScript 지원 및 최신 개발 방식을 활용하여 **Intlayer**를 통합해 원활한 국제화(i18n)를 구현하는 방법을 보여줍니다.

클라이언트 사이드 라우팅의 경우 [Intlayer와 React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_react_router_v7.md) 가이드를 참조하세요.

## 목차

<TOC/>

## 대안보다 Intlayer를 선택해야 하는 이유는 무엇입니까?

'react-i18next' 또는 'i18next'와 같은 주요 솔루션과 비교할 때 Intlayer는 다음과 같은 통합 최적화가 제공되는 솔루션입니다.

<AccordionGroup>

<Accordion header="전체 React Router 적용 범위">

Intlayer는 **로케일 인식 라우팅**, **로케일 감지를 위한 미들웨어** 및 국제화 확장(i18n)에 필요한 모든 기능을 제공하여 React Router와 완벽하게 작동하도록 최적화되었습니다.

</Accordion>

<Accordion header="번들 크기">

대용량 JSON 파일을 페이지에 로드하는 대신 필요한 콘텐츠만 로드하세요. Intlayer는 **번들 및 페이지 크기를 최대 50%** 줄이는 데 도움이 됩니다.

</Accordion>

<Accordion header="유지관리성">

애플리케이션 콘텐츠의 범위를 지정하면 대규모 애플리케이션의 **유지 관리가 용이해집니다**. 전체 콘텐츠 코드베이스를 검토해야 하는 정신적 부담 없이 단일 기능 폴더를 복제하거나 삭제할 수 있습니다. 또한 Intlayer는 **완전히 유형**되어 콘텐츠의 정확성을 보장합니다.

</Accordion>

<Accordion header="AI 에이전트">

콘텐츠를 같은 위치에 배치하면 LLM(대형 언어 모델)에 **필요한 컨텍스트가 줄어듭니다**. Intlayer에는 누락된 번역을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 및 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**, AI 에이전트를 위한 개발자 경험(DX)을 더욱 원활하게 만듭니다.

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

## React Router v7 애플리케이션에서 Intlayer 설정 단계별 가이드

<Steps>

<Step number={1} title="의존성 설치">

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

  </Tab>
</Tabs>

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` 플래그는 선택 사항입니다. AI 에이전트인 경우 `intlayer-cli init`를 사용하세요.

> 이 명령은 환경을 감지하고 필요한 패키지를 설치합니다. 예를 들어:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

- **intlayer**  
  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일링 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **react-intlayer**  
  Intlayer를 React 애플리케이션과 통합하는 패키지로, React 국제화를 위한 컨텍스트 제공자와 훅을 제공합니다.

- **vite-intlayer**  
  Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Vite 플러그인과, 사용자의 선호 로케일 감지, 쿠키 관리, URL 리디렉션 처리를 위한 미들웨어를 포함합니다.

- **@react-router/fs-routes**
  React Router v7을 위한 파일 시스템 기반 라우팅을 활성화하는 패키지입니다.

</Step>

<Step number={2} title="프로젝트 구성">

애플리케이션의 언어를 구성하기 위한 config 파일을 생성합니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> 이 구성 파일을 통해 로컬라이즈된 URL, 미들웨어 리다이렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자, Intlayer 로그 비활성화 등을 설정할 수 있습니다. 사용 가능한 모든 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Step>

<Step number={3} title="Vite 설정에 Intlayer 통합">

intlayer 플러그인을 설정에 추가하세요:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [reactRouter(), intlayer()],
});
```

`intlayer()` Vite 플러그인은 Intlayer를 Vite와 통합하는 데 사용됩니다. 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. Vite 애플리케이션 내에서 Intlayer 환경 변수를 정의합니다. 또한 성능을 최적화하기 위해 별칭을 제공합니다.

</Step>

<Step number={4} title="React Router v7 파일 시스템 라우트 구성">

파일 시스템 기반 라우트를 `flatRoutes`로 사용하도록 라우팅 구성을 설정합니다:

```typescript fileName="app/routes.ts"
import type { RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
import { configuration } from "intlayer";

const routes: RouteConfig = flatRoutes({
  // 콘텐츠 선언 파일이 경로로 처리되지 않도록 무시
  ignoredRouteFiles: configuration.content.fileExtensions.map(
    (fileExtension) => `**/*${fileExtension}`
  ),
});

export default routes;
```

> `@react-router/fs-routes`의 `flatRoutes` 함수는 파일 시스템 기반 라우팅을 활성화하며, `routes/` 디렉토리의 파일 구조가 애플리케이션의 경로를 결정합니다. `ignoredRouteFiles` 옵션은 Intlayer 콘텐츠 선언 파일(`.content.ts` 등)이 라우트 파일로 처리되지 않도록 합니다.

</Step>

<Step number={5} title="레이아웃 컴포넌트 생성">

파일 시스템 라우팅을 사용할 때는 평탄한 명명 규칙을 사용하며, 여기서 점(`.`)은 경로 세그먼트를 나타내고 괄호 `()`는 선택적 세그먼트를 나타냅니다.

`app/routes/` 디렉토리에 다음 파일들을 생성하세요:

#### 파일 구조

```bash
app/
├── root.tsx                         # 로케일 경로를 위한 레이아웃 래퍼
└──routes/
    ├── ($locale)._index.tsx         # 홈 페이지 (/, /es, 등)
    ├── ($locale)._index.content.ts  # 홈 페이지 콘텐츠
    ├── ($locale).about.tsx          # About 페이지 (/about, /es/about, 등)
    └── ($locale).about.content.ts   # About 페이지 콘텐츠
```

명명 규칙:

- `($locale)` - 로케일 파라미터를 위한 선택적 동적 세그먼트
- `_layout` - 자식 경로를 래핑하는 레이아웃 경로
- `_index` - 인덱스 경로 (부모 경로에서 렌더링)
- `.` (점) - 경로 세그먼트 구분 (예: `($locale).about` → `/:locale?/about`)

#### Layout 컴포넌트

```tsx fileName="app/root.tsx"
import { getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "react-intlayer";
import {
  isRouteErrorResponse,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import type { Route } from "./+types/root";

import "./app.css";

// ... 변경되지 않은 App, links 및 ErrorBoundary 코드

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);

  return { locale };
}

export function Layout({
  children,
}: { children: React.ReactNode } & Route.ComponentProps) {
  const data = useLoaderData<typeof loader>();
  const { locale } = data ?? {};

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

#### 루트 레이아웃

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

</Step>

<Step number={6} title="콘텐츠 선언">

콘텐츠 선언을 생성하고 관리하여 번역을 저장합니다. 콘텐츠 파일을 경로 파일 옆에 배치합니다:

```tsx fileName="app/routes/($locale)._index.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      ko: "React Router v7 + Intlayer에 오신 것을 환영합니다",
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      ko: "React Router v7과 Intlayer를 사용하여 다국어 애플리케이션을 쉽게 구축하세요.",
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      ko: "저희에 대해 알아보기",
      en: "Learn About Us",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

```tsx fileName="app/routes/($locale).about.content.ts"
import { t, type Dictionary } from "intlayer";

const aboutContent = {
  key: "about",
  content: {
    title: t({
      ko: "우리에 대해",
      en: "About Us",
      es: "Sobre Nosotros",
      fr: "À propos de nous",
    }),
    content: t({
      ko: "이것은 정보 페이지의 내용입니다.",
      en: "This is the about page content.",
      es: "Este es el contenido de la página de información.",
      fr: "Ceci est le contenu de la page à propos.",
    }),
    homeLink: t({
      ko: "홈",
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default aboutContent;
```

> 콘텐츠 선언은 `contentDir` 디렉토리에 포함되는 한 애플리케이션의 어느 곳에나 정의할 수 있습니다(기본값: `./app`). 그리고 콘텐츠 선언 파일 확장자와 일치해야 합니다(기본값: `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> `useIntlayer` 훅에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)를 참조하세요.

> 기존 앱이 있는 경우 [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md) 및 [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)를 사용하여 수천 개의 컴포넌트를 한 번에 변환할 수 있습니다.

</Step>

<Step number={7} title="로케일 인식 컴포넌트 생성">

로케일 인식 네비게이션을 위한 `LocalizedLink` 컴포넌트를 생성합니다:

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale),
  };
};

export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

로컬라이즈된 경로로 이동하려면 `useLocalizedNavigate` hook을 사용할 수 있습니다:

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "react-intlayer";
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

</Step>

<Step number={9} title="로케일 스위처 컴포넌트 만들기">

사용자가 언어를 변경할 수 있도록 컴포넌트를 만드세요:

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  Locales,
} from "intlayer";
import { setLocaleInStorage, useIntlayer, useLocale } from "react-intlayer";
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
            onClick={() => setLocale(localeItem)}
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

</Step>

<Step number={10} title="HTML 속성 관리 추가 (선택 사항)" isOptional={true}>

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

이 hook은 이미 Step 5에서 보여진 레이아웃 컴포넌트(`($locale)._layout.tsx`)에서 사용되고 있습니다.

</Step>

<Step number={10} title="미들웨어 추가">

`intlayerProxy`를 사용하여 애플리케이션에 서버 측 라우팅을 추가할 수도 있습니다. 이 플러그인은 URL을 기반으로 현재 로케일을 자동으로 감지하고 적절한 로케일 쿠키를 설정합니다. 로케일이 지정되지 않은 경우 플러그인은 사용자의 브라우저 언어 기본 설정을 기반으로 가장 적절한 로케일을 결정합니다. 로케일이 감지되지 않으면 기본 로케일로 리디렉션됩니다.

> `intlayerProxy`를 프로덕션에서 사용하려면 `vite-intlayer` 패키지를 `devDependencies`에서 `dependencies`로 변경해야 합니다.

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

</Step>

<Step number={11} title="컴포넌트에서 콘텐츠 추출" isOptional={true}>

기존 codebase가 있는 경우, 수천 개의 파일을 변환하는 것은 시간이 걸릴 수 있습니다.

이 과정을 쉽게 하기 위해 Intlayer는 컴포넌트를 변환하고 콘텐츠를 추출하기 위한 [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)를 제공합니다.

이를 설정하려면 `intlayer.config.ts` 파일에 `compiler` 섹션을 추가할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * 컴파일러를 활성화할지 여부를 나타냅니다.
     */
    enabled: true,

    /**
     * 출력 파일 경로를 정의합니다.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 변환된 후 컴포넌트를 저장할지 여부를 나타냅니다.
     *
     * - `true`인 경우, 컴파일러는 컴포넌트 파일을 디스크에 다시 작성합니다. 따라서 변환이 영구적이며, 컴파일러는 다음 프로세스에서 변환을 건너뜁니다. 이렇게 하면 컴파일러가 앱을 변환할 수 있으며, 그 후 제거할 수 있습니다.
     *
     * - `false`인 경우, 컴파일러는 `useIntlayer()` 함수 호출을 빌드 출력의 코드에만 주입하고 기본 codebase를 그대로 유지합니다. 변환은 메모리에서만 수행됩니다.
     */
    saveComponents: false,

    /**
     * 딕셔너리 키 접두사
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

extractor를 실행하여 컴포넌트를 변환하고 콘텐츠를 추출합니다

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babel compiler'>

> v9 이후로, `intlayerCompiler`가 `intlayer` 플러그인에 포함되어 있습니다. 따라서 수동으로 추가할 필요가 없습니다.

`vite.config.ts`를 업데이트하여 `intlayerCompiler` 플러그인을 포함하세요:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // 컴파일러 플러그인 추가
  ],
});
```

```bash packageManager="npm"
npm run build # 또는 npm run dev
```

```bash packageManager="pnpm"
pnpm run build # 또는 pnpm run dev
```

```bash packageManager="yarn"
yarn build # 또는 yarn dev
```

```bash packageManager="bun"
bun run build # 또는 bun run dev
```

 </Tab>
</Tabs>

---

</Step>

</Steps>

## Configure TypeScript

Intlayer uses module augmentation to get benefits of TypeScript and make your codebase stronger.

Ensure your TypeScript configuration includes the autogenerated types:

```json5 fileName="tsconfig.json"
{
  // ... your existing configurations
  include: [
    // ... your existing includes
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

---

## Git Configuration

It is recommended to ignore the files generated by Intlayer. This allows you to avoid committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시
.intlayer
```

---

## VS Code Extension

To improve your development experience with Intlayer, you can install the official **Intlayer VS Code Extension**.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Autocompletion** for translation keys.
- **Real-time error detection** for missing translations.
- **Inline previews** of translated content.
- **Quick actions** to easily create and update translations.

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

---

## Go Further

To go further, you can implement the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) or externalize your content using the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

---

## 문서 참조

- [Intlayer 문서](https://intlayer.org)
- [React Router v7 문서](https://reactrouter.com/)
- [useIntlayer 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)
- [useLocale 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)
- [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)
- [설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)

이 포괄적인 가이드는 Intlayer를 React Router v7과 통합하여 로케일 인식 라우팅과 TypeScript 지원이 포함된 완전한 국제화 애플리케이션을 구축하는 데 필요한 모든 것을 제공합니다.
