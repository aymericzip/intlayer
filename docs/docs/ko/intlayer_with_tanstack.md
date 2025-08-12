---
createdAt: 2025-08-11
updatedAt: 2025-08-11
title: TanStack Start (React)에서 Intlayer 시작하기
description: Intlayer를 사용하여 TanStack Start 앱에 i18n 추가하기 — 컴포넌트 수준 사전, 지역화된 URL, SEO 친화적 메타데이터.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - TanStack Start
  - TanStack Router
  - React
  - i18n
  - 자바스크립트
slugs:
  - doc
  - environment
  - tanstack-start
---

# Intlayer와 TanStack Start (React)로 국제화(i18n) 시작하기

## Intlayer란 무엇인가요?

**Intlayer**는 React 앱을 위한 오픈 소스 i18n 툴킷입니다. 다음을 제공합니다:

- **TypeScript 안전성을 갖춘 컴포넌트 로컬 사전**.
- **동적 메타데이터 및 라우트** (SEO 준비 완료).
- **런타임 로케일 전환** (로케일 감지/유지 도우미 포함).
- **Vite 플러그인** 빌드 타임 변환 및 개발자 경험 향상용.

이 가이드는 Intlayer를 **TanStack Start** 프로젝트에 연결하는 방법을 보여줍니다 (TanStack Start는 내부적으로 Vite와 TanStack Router를 라우팅/SSR에 사용합니다).

---

## 1단계: 의존성 설치

```bash
# npm
npm i intlayer react-intlayer
npm i -D vite-intlayer

# pnpm
pnpm add intlayer react-intlayer
pnpm add -D vite-intlayer

# yarn
yarn add intlayer react-intlayer
yarn add -D vite-intlayer
```

- **intlayer**: 코어 (설정, 사전, CLI/변환).
- **react-intlayer**: React용 `<IntlayerProvider>` 및 훅.
- **vite-intlayer**: Vite 플러그인, 선택적 미들웨어 포함 (로케일 감지/리다이렉트용, 개발 및 SSR/미리보기에서 작동; 프로덕션 SSR 시 `dependencies`로 이동).

---

## 2단계: Intlayer 구성

프로젝트 루트에 `intlayer.config.ts` 파일을 생성하세요:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  // contentDir, contentFileExtensions, 미들웨어 옵션 등도 조정할 수 있습니다.
};

export default config;
```

CommonJS/ESM 변형은 `cjs`/`mjs`를 선호하는 경우 원본 문서와 동일합니다.

> 전체 구성 참조는 Intlayer의 구성 문서를 참고하세요.

---

## 3단계: Vite 플러그인 추가 (및 선택적 미들웨어)

**TanStack Start는 Vite를 사용하므로**, Intlayer의 플러그인을 `vite.config.ts`에 추가하세요:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [
    react(),
    intlayerPlugin(),
    // 선택 사항이지만 로케일 감지, 쿠키 및 리디렉션에 권장됩니다:
    intLayerMiddlewarePlugin(),
  ],
});
```

> SSR을 배포하는 경우, 미들웨어가 프로덕션에서 실행되도록 `vite-intlayer`를 `dependencies`로 이동하세요.

---

## 4단계: 콘텐츠 선언하기

사전(dictionary)을 기본 `contentDir`인 `./src` 아래 아무 곳에나 배치하세요. 예시:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ko: "Vite 로고",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ko: "React 로고",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),
    title: t({
      ko: "TanStack Start + React",
      en: "TanStack Start + React",
      fr: "TanStack Start + React",
      es: "TanStack Start + React",
    }),
    count: t({
      ko: "카운트는 ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t<ReactNode>({
      ko: (
        <>
          <code>src/routes/index.tsx</code>를 편집하고 저장하여 HMR을
          테스트하세요
        </>
      ),
      en: (
        <>
          Edit <code>src/routes/index.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/routes/index.tsx</code> et enregistrez pour tester
          HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/routes/index.tsx</code> y guarda para probar HMR
        </>
      ),
    }),
    readTheDocs: t({
      en: "Click the logos to learn more",
      fr: "Cliquez sur les logos pour en savoir plus",
      es: "Haz clic en los logotipos para saber más",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

JSON/ESM/CJS 변형은 원본 문서와 동일하게 작동합니다.

> TSX 콘텐츠인가요? 설정에 따라 `import React from "react"`를 잊지 마세요.

---

## 5단계: TanStack Start를 Intlayer로 감싸기

TanStack Start에서는 **루트 경로(root route)**가 프로바이더를 설정하기에 적합한 위치입니다.

```tsx fileName="src/routes/__root.tsx"
import {
  Outlet,
  createRootRoute,
  Link as RouterLink,
} from "@tanstack/react-router";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppShell() {
  // 최상위에서 사전을 사용하는 예:
  const content = useIntlayer("app");

  return (
    <div>
      <nav className="flex gap-3 p-3">
        <RouterLink to="/">홈</RouterLink>
        <RouterLink to="/about">소개</RouterLink>
      </nav>
      <main className="p-6">
        <h1>{content.title}</h1>
        <Outlet />
      </main>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      <AppShell />
    </IntlayerProvider>
  ),
});
```

그런 다음 페이지에서 콘텐츠를 사용하세요:

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";
import reactLogo from "../assets/react.svg";

export const Route = createFileRoute("/")({
  component: () => {
    const content = useIntlayer("app");
    return (
      <>
        <button>{content.count}0</button>
        <p>{content.edit}</p>
        <img
          src={reactLogo}
          alt={content.reactLogo.value}
          width={48}
          height={48}
        />
        <p className="opacity-70">{content.readTheDocs}</p>
      </>
    );
  },
});
```

> 문자열 속성(`alt`, `title`, `aria-label` 등)은 `.value`가 필요합니다:
>
> ```jsx
> <img alt={c.reactLogo.value} />
> ```

---

## (선택 사항) 6단계: 로케일 전환 (클라이언트)

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcher() {
  const { setLocale } = useLocale();
  return (
    <div className="flex gap-2">
      <button onClick={() => setLocale(Locales.ENGLISH)}>영어</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>프랑스어</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>스페인어</button>
    </div>
  );
}
```

---

## (선택 사항) 7단계: 지역화된 라우팅 (SEO 친화적 URL)

TanStack Start에는 **두 가지 좋은 패턴**이 있습니다. 하나를 선택하세요.

동적 세그먼트 폴더 `src/routes/$locale/`를 생성하여 URL이 `/:locale/...` 형식이 되도록 합니다. `$locale` 레이아웃에서 `params.locale`을 검증하고, `<IntlayerProvider locale=...>`를 설정한 후 `<Outlet />`을 렌더링합니다. 이 방법은 간단하지만, 나머지 라우트들은 `$locale` 하위에 마운트되며, 기본 로케일 접두사를 원하지 않는 경우 별도의 접두사 없는 트리가 필요합니다.

---

## (선택 사항) 8단계: 로케일 전환 시 URL 업데이트

패턴 A (basepath)에서는 로케일을 전환하면 **다른 basepath로 이동**하는 것을 의미합니다:

```tsx fileName="src/components/LocaleSwitcherNavigate.tsx"
import { useRouter } from "@tanstack/react-router";
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcherNavigate() {
  const router = useRouter();
  const { locale, setLocale } = useLocale();

  const change = async (next: Locales) => {
    if (next === locale) return;
    const nextPath = getLocalizedUrl(
      window.location.pathname + window.location.search,
      next
    );
    await router.navigate({ to: nextPath }); // 기록을 유지합니다
    setLocale(next);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => change(Locales.ENGLISH)}>English</button>
      <button onClick={() => change(Locales.FRENCH)}>Français</button>
      <button onClick={() => change(Locales.SPANISH)}>Español</button>
    </div>
  );
}
```

---

## (선택 사항) 9단계: `<html lang>` 및 `dir` (TanStack Start 문서)

TanStack Start는 사용자 정의가 가능한 **Document**(루트 HTML 셸)를 제공합니다. 접근성 및 SEO를 위해 `lang`과 `dir`을 설정하세요:

```tsx fileName="src/routes/__root.tsx" {4,15}
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { IntlayerProvider } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

function Document({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* ... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      {/* 서버에서 로케일을 계산하는 경우 Document에 전달하세요; 그렇지 않으면 클라이언트가 하이드레이션 후 수정합니다 */}
      <Document locale={document?.documentElement?.lang || "en"}>
        <Outlet />
      </Document>
    </IntlayerProvider>
  ),
});
```

클라이언트 측 수정을 위해, 다음과 같은 작은 훅을 유지할 수도 있습니다:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale; // 문서의 언어 속성을 현재 로케일로 설정
    document.documentElement.dir = getHTMLTextDir(locale); // 문서의 텍스트 방향 설정
  }, [locale]);
};
```

---

## (선택 사항) 10단계: 지역화된 Link 컴포넌트

TanStack Router는 `<Link/>`를 제공하지만, 내부 URL에 자동으로 접두사를 붙이는 일반 `<a>` 태그가 필요할 경우:

```tsx fileName="src/components/Link.tsx"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const isExternal = (href?: string) => /^https?:\/\//.test(href ?? "");

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const hrefI18n =
      href && !isExternal(href) ? getLocalizedUrl(href, locale) : href;
    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);
Link.displayName = "Link";
```

> 패턴 A(basepath)를 사용하는 경우, TanStack의 `<Link to="/about" />`는 이미 `basepath`를 통해 `/fr/about`로 해결되므로, 커스텀 링크는 선택 사항입니다.

---

## TypeScript

Intlayer가 생성한 타입을 포함하세요:

```json5 fileName="tsconfig.json"
{
  "include": ["src", ".intlayer/**/*.ts"],
}
```

---

## Git

Intlayer가 생성한 아티팩트를 무시하세요:

```gitignore
.intlayer
```

---

## VS 코드 확장

- **Intlayer VS 코드 확장** → 자동완성, 오류, 인라인 미리보기, 빠른 작업.
  마켓플레이스: `intlayer.intlayer-vs-code-extension`

---

## 더 나아가기

- 비주얼 에디터
- CMS 모드
- 엣지/어댑터에서의 로케일 감지

---

## 문서 이력

| 버전  | 날짜       | 변경 사항                |
| ----- | ---------- | ------------------------ |
| 1.0.0 | 2025-08-11 | TanStack Start 적응 추가 |
