# next-i18next VS next-intl VS Intlayer | Next.js Internationalization (i18n)

아래는 **Next.js 애플리케이션**을 국제화(i18n)하기 위한 **세 가지 인기 라이브러리**인 **next-intl**, **next-i18next**, 그리고 **Intlayer**의 간결한 비교입니다.

이 문서는 주요 기준을 강조합니다:

1. **아키텍처** (번역을 구성 요소에 가깝게 유지)
2. **TypeScript 지원**
3. **누락된 번역 관리**
4. **서버 구성 요소 지원**
5. **Next.js에 대한 향상된 라우팅 및 미들웨어**
6. **설정의 간단함**

이 가이드는 또한 **Intlayer**에 대한 **심층 분석**을 제공하며, 특히 **App Router** 및 **Server Components**를 포함한 Next.js 13+에 대한 강력한 선택인 이유를 보여줍니다.

---

## 각 라이브러리 개요

### 1. next-intl

**주요 초점**: 경량화된 방식으로 빠르고 쉽게 설정할 수 있는 로컬화.

- **아키텍처**: 번역을 하나의 폴더(예: `locales/`)에 함께 배치하도록 장려하지만 여러 전략도 허용합니다. “구성 요소별 번역” 아키텍처를 엄격히 강제하지는 않습니다.
- **TypeScript 지원**: 기본 TypeScript 통합. 일부 타입 정의가 존재하지만, 번역 파일에서 TypeScript 정의를 자동 생성하는 데 중점을 두지 않습니다.
- **누락된 번역**: 기본적인 폴백 메커니즘. 기본적으로 키 또는 기본 로케일 문자열로 폴백됩니다. 고급 누락된 번역 검사를 위한 강력한 도구는 제공되지 않습니다.
- **서버 구성 요소 지원**: 일반적으로 Next.js 13+와 함께 작동하지만, 패턴이 깊은 서버측 사용(예: 복잡한 동적 라우팅을 가진 서버 구성 요소)에 덜 전문화되어 있습니다.
- **라우팅 및 미들웨어**: 미들웨어 지원이 가능하지만 제한적입니다. 일반적으로 로케일 감지를 위해 Next.js `Middleware`에 의존하거나, 로케일 경로 재작성을 위해 수동 구성이 필요합니다.
- **설정의 간단함**: 매우 직관적입니다. 최소한의 보일러플레이트가 필요합니다.

**사용 시기**: 더 간단한 접근 방식을 원하거나 번역을 보다 전통적인 방식(로케일 JSON 파일이 있는 하나의 폴더)으로 관리하는 데 편한 경우입니다.

---

### 2. next-i18next

**주요 초점**: `i18next`를 기반으로 하는 검증된 솔루션으로, Next.js 프로젝트에 널리 채택되었습니다.

- **아키텍처**: 번역을 `public/locales` 폴더에 주로 정리합니다. 번역을 각각의 구성 요소에 “가까이” 유지하도록 특별히 설계되지는 않았지만, 다른 구조를 수동으로 채택할 수는 있습니다.
- **TypeScript 지원**: 합리적인 TypeScript 커버리지지만, 타입이 지정된 번역 및 후크에 대해 사용자 정의 구성이 필요합니다.
- **누락된 번역**: i18next는 보간/폴백을 제공합니다. 그러나 누락된 번역 감지는 일반적으로 추가 설정이나 서드파티 플러그인이 필요합니다.
- **서버 구성 요소 지원**: Next.js 13과 함께 사용하는 기본적인 방법은 문서화되어 있지만, 고급 사용(예: 서버 구성 요소와의 깊은 통합, 동적 경로 생성)은 번거로울 수 있습니다.
- **라우팅 및 미들웨어**: Next.js `Middleware`와 로케일 하위 경로 재작성에 크게 의존합니다. 더 복잡한 설정의 경우, 고급 i18next 구성을 들어가야 할 수 있습니다.
- **설정의 간단함**: i18next에 익숙한 사람들에게는 친숙한 접근 방식입니다. 그러나 고급 i18n 기능이 필요할 때 보일러플레이트가 더 많이 발생할 수 있습니다(네임스페이스, 여러 대체 로케일 등).

**사용 시기**: 이미 `i18next` 생태계에 헌신했거나 기존의 i18next 기반 번역이 있는 경우입니다.

---

### 3. Intlayer

**주요 초점**: Next.js **App Router**(12, 13, 14, 15) 전용으로 특별히 설계된 현대적인 오픈 소스 i18n 라이브러리로, **Server Components** 및 **Turbopack**에 대한 기본 지원이 있습니다.

#### 주요 장점

1. **아키텍처**

   - **번역을 구성 요소 바로 옆에 배치**하도록 장려합니다. 각 페이지나 구성 요소는 자체 `.content.ts` (또는 JSON) 파일을 가질 수 있어 거대한 번역 폴더를 뒤지는 일이 없습니다.
   - 이는 특히 대규모 코드베이스에서 코드의 **모듈화 및 유지보수성**을 높여줍니다.

2. **TypeScript 지원**

   - **자동 생성된 타입 정의**: 콘텐츠를 정의하는 순간 Intlayer는 자동 완성 및 번역 오류 포착을 제공하는 타입을 생성합니다.
   - 누락된 키와 같은 런타임 오류를 최소화하고 IDE에서 직접 고급 **자동 완성**을 제공합니다.

3. **누락된 번역 관리**

   - 빌드 중에 Intlayer는 **누락된 번역 키를 감지**하고 경고 또는 오류를 발생시킬 수 있습니다.
   - 이를 통해 모든 언어로 누락된 텍스트가 실수로 배포되는 일을 방지합니다.

4. **서버 구성 요소에 최적화됨**

   - Next.js **App Router**와 새로운 **서버 구성 요소** 패러다임과 완전히 호환됩니다.
   - **서버 컨텍스트를 격리**하기 위한 특수 제공자(`IntlayerServerProvider`, `IntlayerClientProvider`)를 제공합니다 (Next.js 13+에서 중요합니다).

5. **향상된 라우팅 및 미들웨어**

   - 자동 로케일 감지를 위한 전용 [**`intlayerMiddleware`**](#)와 고급 경로 생성을 제공하여 간단한 설정으로 동적으로 로컬 경로를 처리합니다 (예: `/en-US/about` 대 `/fr/about`).
   - 대체 언어 링크를 생성하기 위한 `getMultilingualUrls`와 같은 도우미 메서드를 제공합니다 (SEO에 유용합니다).

6. **간소화된 설정**
   - 로케일, 기본 로케일 및 통합 기본 설정을 정의하는 단일 구성 파일(`intlayer.config.ts`)이 필요합니다.
   - 콘텐츠에 대한 모든 환경 변수와 감시를 **주입하는** 래퍼 플러그인 `withIntlayer(nextConfig)`이 필요합니다.
   - **큰 폴백 구성 필요 없음**—시스템이 최소한의 마찰로 “그냥 작동”하도록 설계되었습니다.

> **결론**: Intlayer는 구성 요소 바로 옆에 번역을 유지하고, **강력한 TS 지원** 및 **쉬운 서버 측** 사용을 제공하며, **보일러플레이트를 크게 줄이는** 현대적인 솔루션입니다.

---

## 기능 나란히 비교

| **기능**                             | **next-intl**                            | **next-i18next**                               | **Intlayer**                                   |
| ------------------------------------- | ---------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| **번역을 구성 요소 근처에 유지**     | 부분적 - 일반적으로 한 개의 로케일 폴더  | 기본값 아님 - 종종 `public/locales`           | **예 - 권장 및 간단**                          |
| **TypeScript 자동 생성**              | 기본 TS 정의                            | 기본 TS 지원                                  | **예 - 고급 기능 제공**                        |
| **누락된 번역 감지**                  | 대부분 폴백 문자열                      | 대부분 폴백 문자열                            | **예 - 빌드 시 검사**                          |
| **서버 구성 요소 지원**               | 작동하지만 전문화되지 않음               | 지원되지만 다소 번거로울 수 있음              | **전문 제공자를 통한 완전 지원**               |
| **라우팅 및 미들웨어**                | Next 미들웨어와 수동 통합               | 재작성 구성을 통해 제공                        | **전용 i18n 미들웨어 + 고급 후크**            |
| **설정 복잡성**                       | 간단, 최소한의 구성                     | 전통적, 고급 사용 위해 번거로울 수 있음      | **하나의 구성 파일 및 플러그인**               |

---

## 왜 Intlayer인가?

**Next.js App Router**(버전 13, 14 또는 15)에서 **서버 구성 요소**를 이식하거나 구축하는 팀을 위해 Intlayer는 다음을 제공합니다:

1. **세련된 아키텍처**

   - 각 경로 또는 구성 요소는 자신의 번역을 보유합니다. 이것은 명확성과 유지 보수성을 촉진합니다.

2. **강력한 TypeScript 통합**

   - 컴파일러 수준의 안전을 확보하여 “오타가 포함된” 번역 키를 피할 수 있습니다.

3. **실제 누락된 번역 경고**

   - 키나 언어 번역을 잊으면 빌드 시 경고를 받게 되며(불완전한 UI를 배포하는 대신).

4. **내장된 고급 라우팅**

   - 자동 로케일 감지, 동적 경로 생성 및 간단한 지역화된 URL 관리를 제공합니다.
   - 표준 `intlayerMiddleware`는 깊은 사용자 지정 재작성이 필요하지 않습니다.

5. **원스톱 설정**

   - 최소한의 보일러플레이트: `intlayer.config.ts`를 정의하고 `next.config`를 `withIntlayer`로 래핑한 다음 공식 미들웨어를 추가하기만 하면 됩니다.
   - `IntlayerServerProvider`와 `IntlayerClientProvider`를 통해 **서버** 및 **클라이언트** 구성 요소에 대해 명확하고 직관적인 사용법을 제공합니다.

6. **SEO 친화적**
   - 내장 도우미(`getMultilingualUrls`, `hrefLang` 속성 등)를 통해 SEO 준수 페이지 및 사이트맵을 쉽게 생성할 수 있습니다.

---

## 예시: Intlayer 작동 방식

다음은 Next.js 15 프로젝트에서 Intlayer를 활용하는 방법을 간단히 보여주는 _아주_ 축약된 코드 스니펫입니다. 전체 세부 정보 및 코드 예제는 [전체 Intlayer 가이드를 확인하세요](#).

<details>
<summary>단계별 예시</summary>

1. **설치 및 구성**

   ```bash
   npm install intlayer next-intlayer
   ```

   ```ts
   // intlayer.config.ts
   import { Locales, type IntlayerConfig } from "intlayer";

   const config: IntlayerConfig = {
     internationalization: {
       locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
       defaultLocale: Locales.ENGLISH,
     },
   };
   export default config;
   ```

2. **플러그인 사용**

   ```ts
   // next.config.mjs
   import { withIntlayer } from "next-intlayer/server";

   /** @type {import('next').NextConfig} */
   const nextConfig = {};

   export default withIntlayer(nextConfig);
   ```

3. **미들웨어 추가**

   ```ts
   // src/middleware.ts
   export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

   export const config = {
     matcher:
       "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
   };
   ```

4. **지역화된 레이아웃 생성**

   ```tsx
   // src/app/[locale]/layout.tsx
   import { getHTMLTextDir } from "intlayer";
   import { NextLayoutIntlayer } from "next-intlayer";

   const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
     const { locale } = params;
     return (
       <html lang={locale} dir={getHTMLTextDir(locale)}>
         <body>{children}</body>
       </html>
     );
   };

   export { generateStaticParams } from "next-intlayer";
   export default LocaleLayout;
   ```

5. **콘텐츠 선언 및 사용**

   ```tsx
   // src/app/[locale]/page.content.ts
   import { t } from "intlayer";

   export default {
     key: "page",
     content: {
       getStarted: {
         main: t({
           en: "Get started by editing",
           fr: "Commencez par éditer",
           es: "Comience por editar",
         }),
         pageLink: "src/app/page.tsx",
       },
     },
   };
   ```

   ```tsx
   // src/app/[locale]/page.tsx
   import { IntlayerServerProvider } from "next-intlayer/server";
   import { IntlayerClientProvider, useIntlayer } from "next-intlayer";

   const PageContent = () => {
     const { content } = useIntlayer("page");
     return (
       <>
         <p>{content.getStarted.main}</p>
         <code>{content.getStarted.pageLink}</code>
       </>
     );
   };

   export default function Page({ params }) {
     return (
       <IntlayerServerProvider locale={params.locale}>
         <IntlayerClientProvider locale={params.locale}>
           <PageContent />
         </IntlayerClientProvider>
       </IntlayerServerProvider>
     );
   }
   ```

   </details>

---

## 결론

각 솔루션—**next-intl**, **next-i18next**, 및 **Intlayer**—은 다국어 Next.js 프로젝트에 효과적입니다. 그러나 **Intlayer**는 다음과 같은 점에서 한 걸음 더 나아갑니다:

- **구성 요소 수준의 번역 아키텍처 강력 추천**
- **Next.js 13+ 및 서버 구성 요소와 원활하게 통합**
- **안전한 코드 작성을 위한 강력한 TypeScript 자동 생성 제공**
- **누락된 번역을 빌드 시에 처리**
- **고급 라우팅 및 미들웨어와 함께 단일 구성 접근 방식을 제공**

**Next.js App Router**에 맞춰 현대적인 i18n 기능을 원하고 수동으로 폴백 논리, 경로 재작성 또는 복잡한 빌드 단계를 구성하지 않고도 완전한 타입 경험을 원한다면, **Intlayer**는 매력적인 선택입니다. 이는 설정 시간을 단축시킬 뿐만 아니라, 팀을 위한 번역의 유지 보수성과 확장성을 더욱 높여 줍니다.