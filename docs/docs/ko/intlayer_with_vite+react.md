---
createdAt: 2024-03-07
updatedAt: 2026-06-23
title: "Vite + React i18n - 앱을 번역하는 완전 가이드"
description: "i18next는 이제 그만. 2026년 다국어 (i18n) Vite + React 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO, 성능을 최적화하세요."
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Vite
  - React
  - i18n
  - 자바스크립트
slugs:
  - doc
  - environment
  - vite-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
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

# Intlayer로 Vite 및 React 번역하기 | 국제화(i18n)

## 목차

<TOC/>

## 왜 다른 대안들 대신 Intlayer를 선택해야 하나요?

react-i18next나 i18next와 같은 주요 솔루션과 비교했을 때, Intlayer는 다음과 같은 통합된 최적화 기능을 제공하는 솔루션입니다:

<AccordionGroup>

<Accordion header="완벽한 Vite 및 React 지원">

Intlayer는 **컴포넌트 수준의 콘텐츠 스코핑**, **지연 로드(lazy-loaded) 번역**, 그리고 국제화(i18n) 확장에 필요한 모든 기능을 제공하여 Vite 및 React와 완벽하게 작동하도록 최적화되어 있습니다.

</Accordion>

<Accordion header="번들 크기">

페이지에 방대한 JSON 파일을 로드하는 대신, 필요한 콘텐츠만 로드하세요. Intlayer는 **번들 및 페이지 크기를 최대 50%까지 줄이는 데** 도움을 줍니다.

</Accordion>

<Accordion header="유지보수성">

애플리케이션의 콘텐츠를 스코핑하면 대규모 애플리케이션의 **유지보수가 용이해집니다**. 전체 콘텐츠 codebase를 검토해야 한다는 심리적 부담 없이 단일 기능 폴더를 복제하거나 삭제할 수 있습니다. 또한, Intlayer는 콘텐츠의 정확성을 보장하기 위해 **완벽한 타입 지정(fully typed)**을 지원합니다.

</Accordion>

<Accordion header="AI 에이전트">

콘텐츠를 같은 위치에 배치(Co-locating)하면 대규모 언어 모델(LLM)에 필요한 문맥이 줄어듭니다. Intlayer는 또한 누락된 번역을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)**, 그리고 **[에이전트 스킬(agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**과 같은 도구 모음을 제공하여 AI 에이전트의 개발자 경험(DX)을 더욱 원활하게 만듭니다.

</Accordion>

<Accordion header="자동화">

AI 제공업체의 비용으로 원하는 LLM을 사용하여 CI/CD 파이프라인에서 번역을 자동화하세요. Intlayer는 또한 콘텐츠 추출을 자동화하는 **컴파일러**뿐만 아니라, **백그라운드에서 번역**을 도와주는 [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)을 제공합니다.

</Accordion>

<Accordion header="성능">

방대한 JSON 파일을 컴포넌트에 연결하면 성능 및 반응성 문제가 발생할 수 있습니다. Intlayer는 빌드 타임에 콘텐츠 로딩을 최적화합니다.

</Accordion>

<Accordion header="비개발자와의 확장성">

단순한 i18n 솔루션 그 이상으로, Intlayer는 **자체 호스팅 가능한 [시각적 편집기(visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)**와 **[전체 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)**를 제공하여 다국어 콘텐츠를 **실시간**으로 관리할 수 있게 도와주며, 번역가, 카피라이터 및 기타 팀원과의 협업을 원활하게 만듭니다. 콘텐츠는 로컬 및/또는 원격으로 저장할 수 있습니다.

</Accordion>
</AccordionGroup>

---

## 대안보다 Intlayer를 선택해야 하는 이유는 무엇입니까?

'react-i18next' 또는 'i18next'와 같은 주요 솔루션과 비교할 때 Intlayer는 다음과 같은 통합 최적화가 제공되는 솔루션입니다.

<AccordionGroup>

<Accordion header="전체 Vite 및 React 적용 범위">

Intlayer는 **구성 요소 수준 콘텐츠 범위 지정**, **지연 로드 번역** 및 국제화 확장(i18n)에 필요한 모든 기능을 제공하여 Vite 및 React와 완벽하게 작동하도록 최적화되었습니다.

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

<Steps>

<Step number={8} title="로케일이 변경될 때 URL 변경하기" isOptional={true}>

로케일이 변경될 때 URL을 변경하려면, `useLocale` 훅에서 제공하는 `onLocaleChange` 속성을 사용할 수 있습니다. 동시에, `react-router-dom`의 `useLocation`과 `useNavigate` 훅을 사용하여 URL 경로를 업데이트할 수 있습니다.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // 현재 URL 경로를 가져옵니다. 예: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 업데이트된 로케일로 URL을 구성합니다
      // 예: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URL 경로를 업데이트합니다
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* 로케일 - 예: FR */}
              {localeItem}
            </span>
            <span>
              {/* 해당 로케일에서의 언어명 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일에서의 언어명 - 예: Francés (현재 로케일이 Locales.SPANISH일 때) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 된 언어명 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> 문서 참고:
>
> - [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 속성](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 속성](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 속성](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 속성](https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-current)

아래는 추가 설명과 개선된 코드 예제가 포함된 업데이트된 **9단계**입니다:

---

#### Hook 구현하기

HTML 속성을 관리하기 위한 커스텀 hook을 생성합니다. 이 hook은 로케일 변경을 감지하고 그에 따라 속성을 업데이트합니다:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 현재 로케일을 기반으로 HTML <html> 요소의 `lang` 및 `dir` 속성을 업데이트합니다.
 * - `lang`: 브라우저와 검색 엔진에 페이지의 언어를 알립니다.
 * - `dir`: 올바른 읽기 순서를 보장합니다 (예: 영어의 경우 'ltr', 아랍어의 경우 'rtl').
 *
 * 이 동적 업데이트는 올바른 텍스트 렌더링, 접근성 및 SEO에 필수적입니다.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 언어 속성을 현재 로케일로 업데이트합니다.
    document.documentElement.lang = locale;

    // 현재 로케일을 기반으로 텍스트 방향을 설정합니다.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

#### 훅 구현하기

HTML 속성을 관리하는 커스텀 훅을 만듭니다. 이 훅은 로케일 변경을 감지하여 속성을 적절히 업데이트합니다:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 현재 로케일에 따라 HTML <html> 요소의 `lang` 및 `dir` 속성을 업데이트합니다.
 * - `lang`: 브라우저와 검색 엔진에 페이지의 언어를 알립니다.
 * - `dir`: 올바른 읽기 순서(예: 영어는 'ltr', 아랍어는 'rtl')를 보장합니다.
 *
 * 이 동적 업데이트는 올바른 텍스트 렌더링, 접근성 및 SEO에 필수적입니다.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 현재 로케일로 언어 속성을 업데이트합니다.
    document.documentElement.lang = locale;

    // 현재 로케일에 따라 텍스트 방향을 설정합니다.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

</Step>

<Step number={10} title="지역화된 링크 컴포넌트 만들기" isOptional={true}>

애플리케이션의 내비게이션이 현재 로케일을 준수하도록 하려면, 커스텀 `Link` 컴포넌트를 만들 수 있습니다. 이 컴포넌트는 내부 URL에 자동으로 현재 언어 접두사를 붙여줍니다. 예를 들어, 프랑스어 사용자가 "About" 페이지로 가는 링크를 클릭하면 `/about` 대신 `/fr/about`로 리디렉션됩니다.

이 동작은 여러 가지 이유로 유용합니다:

- **SEO 및 사용자 경험**: 지역화된 URL은 검색 엔진이 언어별 페이지를 올바르게 색인화하도록 돕고, 사용자가 선호하는 언어로 된 콘텐츠를 제공합니다.
- **일관성**: 애플리케이션 전반에 걸쳐 지역화된 링크를 사용함으로써 내비게이션이 현재 로케일 내에서 유지되어 예기치 않은 언어 전환을 방지합니다.
- **유지보수성**: 로컬라이제이션 로직을 단일 컴포넌트에 중앙 집중화하면 URL 관리를 단순화하여 애플리케이션이 성장함에 따라 코드베이스를 더 쉽게 유지보수하고 확장할 수 있습니다.

아래는 TypeScript로 구현한 로컬라이즈된 `Link` 컴포넌트입니다:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps extends DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> {}

/**
 * 주어진 URL이 외부 링크인지 확인하는 유틸리티 함수입니다.
 * URL이 http:// 또는 https://로 시작하면 외부 링크로 간주합니다.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 현재 로케일에 따라 href 속성을 조정하는 커스텀 Link 컴포넌트입니다.
 * 내부 링크의 경우 `getLocalizedUrl`을 사용하여 URL 앞에 로케일을 붙입니다 (예: /fr/about).
 * 이를 통해 내비게이션이 동일한 로케일 컨텍스트 내에서 이루어지도록 보장합니다.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // 링크가 내부 링크이고 유효한 href가 제공된 경우, 로케일이 적용된 URL을 가져옵니다.
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

#### 작동 방식

- **외부 링크 감지**:  
  헬퍼 함수 `checkIsExternalLink`는 지정된 URL이 외부 링크인지 여부를 판단합니다. 외부 링크는 현지화할 필요가 없으므로 변경되지 않은 상태로 유지됩니다.

- **현재 로케일 가져오기**:  
  `useLocale` 훅은 현재 로케일(예: 프랑스어의 경우 `fr`)을 제공합니다.

- **URL 현지화**:  
  내부 링크(즉, 외부 링크가 아닌 링크)의 경우, `getLocalizedUrl`을 사용하여 현재 로케일로 URL 접두사를 자동으로 붙입니다. 즉, 사용자가 프랑스어 환경인 경우 `/about`을 `href`로 전달하면 `/fr/about`으로 변환됩니다.

- **링크 반환**:  
  이 컴포넌트는 로컬라이즈된 URL이 적용된 `<a>` 요소를 반환하여 내비게이션이 로케일과 일치하도록 보장합니다.

애플리케이션 전반에 이 `Link` 컴포넌트를 통합함으로써, 일관되고 언어를 인식하는 사용자 경험을 유지하는 동시에 개선된 SEO 및 사용성 이점을 누릴 수 있습니다.

</Step>

<Step number={11} title="컴포넌트 콘텐츠 추출" isOptional={true}>

기존 코드베이스가 있는 경우 수천 개의 파일을 변환하는 데 시간이 많이 걸릴 수 있습니다.

이 프로세스를 용이하게 하기 위해 Intlayer는 컴포넌트를 변환하고 콘텐츠를 추출하기 위한 [컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md) / [추출기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)를 제안합니다.

설정하려면 `intlayer.config.ts` 파일에 `compiler` 섹션을 추가할 수 있습니다.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 나머지 구성
  compiler: {
    /**
     * 컴파일러 활성화 여부를 나타냅니다.
     */
    enabled: true,

    /**
     * 출력 파일 경로를 정의합니다.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 변환 후 컴포넌트를 저장할지 여부를 나타냅니다. 그렇게 하면 컴파일러를 한 번만 실행하여 앱을 변환한 다음 제거할 수 있습니다.
     */
    saveComponents: false,

    /**
     * 사전 키 접두사
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='추출 명령'>

컴포넌트를 변환하고 콘텐츠를 추출하기 위해 추출기를 실행합니다

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
 <Tab value='Babel 컴파일러'>

`vite.config.ts`를 업데이트하여 `intlayerCompiler` 플러그인을 포함합니다.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // 컴파일러 플러그인을 추가합니다
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
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### (선택) 사이트맵과 robots.txt(빌드 시 생성)

Intlayer는 `generateSitemap`과 `getMultilingualUrls`로 크롤러용 다국어 `sitemap.xml`과 `robots.txt`를 만들어 `public/`에 자동으로 쓸 수 있습니다. 보통 Vite 실행 **전에** 작은 Node 스크립트를 돌립니다(예: npm `predev` / `prebuild`).

#### 사이트맵

Intlayer 사이트맵 생성기는 로케일 설정을 반영하고 크롤러용 메타데이터를 포함합니다.

> 생성된 사이트맵은 `xhtml:link`(hreflang)를 지원합니다. 단순 URL 나열이 아니라 각 페이지의 모든 언어 버전을 양방향으로 연결합니다(예: `/about`, `/fr/about`, `/about?lang=fr` - 라우팅 모드에 따름).

#### Robots.txt

`getMultilingualUrls`로 `Disallow`가 민감 경로의 모든 현지화 변형에 적용되도록 하세요.

#### 1. 프로젝트 루트에 `generate-seo.mjs` 추가

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

스크립트가 `intlayer`를 import하려면 패키지가 설치되어 있어야 합니다. 프로덕션에서는 환경 변수 `SITE_URL`을 설정하세요(CI 등).

> Node ESM에는 `generate-seo.mjs` 사용을 권장합니다. `generate-seo.js`를 쓰면 `package.json`의 `"type": "module"` 등으로 ESM을 켜세요.

#### 2. Vite 전에 스크립트 실행

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

pnpm이나 yarn을 쓰면 명령을 맞게 바꾸세요. CI에서 호출해도 됩니다.

### TypeScript 설정

Intlayer는 TypeScript의 이점을 활용하고 codebase를 더욱 강력하게 만들기 위해 module augmentation을 사용합니다.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript 설정에 자동 생성된 타입이 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 설정
  "include": [
    // ... 기존 TypeScript 설정
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### Git 설정

Intlayer에 의해 생성된 파일들을 무시할 것을 권장합니다. 이를 통해 해당 파일들이 Git 리포지토리에 커밋되는 것을 방지할 수 있습니다.

이를 위해, `.gitignore` 파일에 다음 내용을 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시
.intlayer
```

### VS Code 확장 프로그램

Intlayer와 함께하는 개발 환경을 개선하기 위해 공식 **Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code 마켓플레이스에서 설치하기](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음을 제공합니다:

- 번역 키에 대한 **자동 완성(Autocompletion)**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업(Quick actions)**.

확장 프로그램 사용법에 대한 자세한 내용은 [Intlayer VS Code 확장 프로그램 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

### 더 나아가기

더 나아가려면 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.
