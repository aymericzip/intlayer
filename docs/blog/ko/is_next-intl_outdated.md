---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: 2026년에도 next-intl을 계속 써야 할까요?
description: next-intl은 Next.js App Router의 표준으로 자리잡았습니다. 하지만 런타임 번들 오버헤드와 수동 네임스페이스 관리라는 부담은 여전히 남아 있습니다.
keywords:
  - next-intl
  - Intlayer
  - 국제화
  - i18n
  - Next.js
  - 번들 크기
  - 블로그
  - JavaScript
slugs:
  - blog
  - is-next-intl-outdated
author: aymericzip
---

# 2026년에도 next-intl을 계속 써야 할까요?

Vercel이 App Router를 발표하며 Pages Router의 내장 i18n 기능을 배제했을 때, `next-intl`은 그 공백을 훌륭히 메웠습니다. Jan Amann의 명쾌한 문서화와 기민한 App Router 지원 덕분에 커뮤니티의 기본 선택지로 자리잡았습니다.

그렇다면 오늘날 왜 그 적합성을 다시 논의해야 할까요?

**지난 3년간 웹 프론트엔드 아키텍처는 비약적으로 발전했으나, `next-intl`의 기본 접근법은 제자리에 머물렀기 때문입니다.**

Next.js가 React Server Components (RSC), 스트리밍, 컴파일러 수준의 최적화로 나아가는 동안, `next-intl`은 여전히 국제화를 런타임의 문제로 다룹니다. 대용량 JSON 객체를 클라이언트 프로바이더로 내려주고, 브라우저에서 ICU 포매터를 구동하며, 번들 크기를 줄이기 위해 수동 네임스페이스 분할에 의존합니다.

<TOC/>

## 핵심 요약

**안정화 단계로 접어든 개발 속도:**

지난 12개월 동안 `next-intl`의 커밋 수는 약 187개로, 대부분 Next.js 버전 대응과 마이너 버그 수정 위주였습니다.

**클라이언트 런타임 오버헤드:**

`NextIntlClientProvider`와 `useTranslations()`를 조합하면 텍스트를 하나도 표시하기 전에 약 12.8 KB (gzip 기준, Minified 시 51 KB)의 스크립트가 추가됩니다. 이는 `next-intlayer` (4.3 KB) 대비 약 3배에 해당합니다.

**90%에 달하는 불필요한 번역 누수:**

일반적인 구성에서 **특정 페이지로 전달되는 번역 데이터의 89.8%가 다른 라우트의 내용**입니다. `/contact`에 방문해도 `/pricing`이나 관리자 대시보드의 문구까지 함께 다운로드됩니다.

**수동 네임스페이스 관리 부담:**

번들이 비대해지는 것을 막으려면 라우트별로 네임스페이스를 일일이 손으로 쪼개야 하므로, 프로덕션에서 문구가 누락될 위험이 커집니다.

**상업적 파트너십의 영향:**

Crowdin의 공식 파트너이기 때문에, CLI 자체에 무료 로컬 AI 번역 도구를 직접 탑재할 유인이 적습니다.

## 유지보수 vs. 현대적 도구 비교

최근 12개월간의 커밋 활동:

| 저장소                | 스타                                                                                                                                                   | 전체 커밋                                                                                                                                                           | 연간 커밋                                                                                                                                                          | 최근 커밋                                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `amannn/next-intl`    | [![stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=stars)](https://github.com/amannn/next-intl/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/amannn/next-intl?style=for-the-badge&label=%2Fyear)](https://github.com/amannn/next-intl/commits)       | [![last](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

최근 12개월간의 작업 내역:

- `amannn/next-intl`: **187 커밋** (Next.js 호환성 유지 및 소규모 수정).
- `aymericzip/intlayer`: **4,343 커밋** (컴파일러 최적화, IDE 확장, MCP 서버, AI 번역 엔진 개발 등).

[![Star History Chart](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#amannn/next-intl&aymericzip/intlayer)

성숙한 라이브러리는 안정감을 줍니다. 하지만 i18n 환경은 달라졌습니다. 빌드 시 미사용 텍스트를 걸러내고, CI에서 LLM이 번역을 수행하며, 에디터는 Language Server (LSP) 및 AI 어시스턴트와 밀접하게 연동됩니다. 런타임 처리에 갇힌 아키텍처는 이러한 진보를 온전히 누리기 어렵습니다.

## Next.js 16 App Router 성능 측정

10개 라우트와 10개 언어로 구성된 일반적인 App Router 애플리케이션 측정 결과:

<I18nBenchmark framework="nextjs" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> 프로덕션 환경의 실제 브라우저에서 gzip 압축을 적용하여 측정했습니다. 자세한 내용은 [Next.js 벤치마크 보고서](https://intlayer.org/ko/doc/benchmark/nextjs)를 확인하세요.

### 라이브러리 기본 번들 크기

번역 텍스트를 불러오기 전 클라이언트에 로드되는 기본 크기:

| 라이브러리             | Gzip 기준  | Minified 기준 |
| ---------------------- | ---------- | ------------- |
| `next-intl@4.9.1`      | 12.8 KB    | 51.0 KB       |
| `next-intlayer@8.7.12` | **4.3 KB** | **13.3 KB**   |

### 페이지 크기 및 번역 데이터 누수

| 구성               | 평균 페이지 JS (gz) | 타 언어 누수율 | 타 페이지 누수율 | 평균 컴포넌트 (gz) |
| ------------------ | ------------------- | -------------- | ---------------- | ------------------ |
| 기본(i18n 없음)    | 150.8 KB            | 0.0%           | 0.0%             | 0.7 KB             |
| `next-intl` (정적) | 163.5 KB            | 4.2%           | **89.8%**        | 20.5 KB            |
| `next-intl` (동적) | 163.4 KB            | 9.7%           | **89.9%**        | 20.5 KB            |
| `next-intlayer`    | **152.1 KB**        | **0.0%**       | **0.0%**         | **7.2 KB**         |

### 페이지 간 데이터 누수가 발생하는 원인

전형적인 `next-intl` 프로젝트에서는 루트 레이아웃에서 전체 메시지를 한 번에 불러옵니다.

```tsx fileName="app/[locale]/layout.tsx"
export default async function RootLayout({ children, params }) {
  const messages = await getMessages();

  return (
    <html>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

`messages`를 최상위 클라이언트 프로바이더로 전달하기 때문에, 브라우저는 모든 라우트에서 애플리케이션 전체의 번역 데이터를 다운로드하게 됩니다. `/login` 페이지만 방문하는 사용자도 FAQ, 약관, 관리자 대시보드 문구를 함께 내려받게 됩니다.

JSON을 네임스페이스별로 나누어 일부 해소할 수 있으나, 어떤 라우트에 어떤 네임스페이스가 필요한지 수작업으로 관리하는 것은 매우 번거롭고 실수가 발생하기 쉽습니다.

Intlayer는 정적 분석을 통해 이 문제를 해결합니다. [Intlayer 컴파일러](https://intlayer.org/ko/doc/compiler)가 각 라우트에서 실제로 호출되는 문구만 번들링하므로 페이지 간 누수율이 **0.0%**가 됩니다.

## next-intl에서 트리 쉐이킹이 동작하지 않는 이유

라이브러리 API가 런타임에 동적으로 문자열 키를 찾는 구조로 되어 있기 때문입니다.

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```tsx fileName="UserProfile.tsx"
"use client";

import { useTranslations } from "next-intl";

export function UserProfile() {
  const t = useTranslations("UserProfile");

  return <h2>{t("heading")}</h2>;
}
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```tsx fileName="UserProfile.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function UserProfile() {
  const { heading } = useIntlayer("user-profile");

  return <h2>{heading}</h2>;
}
```

  </Tab>
</Tabs>

Turbopack이나 Webpack은 `UserProfile` 내에서 어떤 키가 실제로 쓰이는지 사전에 알 수 없습니다. 누락 오류를 막기 위해 **번들러는 해당 네임스페이스 전체를 클라이언트 청크에 포함**시킵니다. 반면 Intlayer는 구조 분해된 프로퍼티를 통해 컴파일러가 실제 참조를 추적하고, 쓰이지 않는 문구를 깔끔히 제외합니다. 자세한 내용은 [번들 최적화](https://intlayer.org/ko/doc/concept/bundle-optimization)를 참고하세요.

## 개발자 경험 (DX)의 차이

### 격리된 JSON vs. 컴포넌트와 함께 배치

`next-intl`에서는 문구가 코드에서 멀리 떨어진 `messages/` 디렉터리에 머뭅니다. Intlayer는 콘텐츠 선언 파일을 컴포넌트 바로 곁에 둘 수 있습니다.

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "authModal": {
    "title": "Sign in to your account",
    "submitButton": "Continue"
  }
}
```

```json fileName="messages/ko.json"
{
  "authModal": {
    "title": "계정에 로그인하세요",
    "submitButton": "계속하기"
  }
}
```

```tsx fileName="AuthModal.tsx"
import { useTranslations } from "next-intl";

export const AuthModal = () => {
  const t = useTranslations("authModal");
  return (
    <form>
      <h2>{t("title")}</h2>
      <button type="submit">{t("submitButton")}</button>
    </form>
  );
};
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="AuthModal.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "auth-modal",
  content: {
    title: t({
      en: "Sign in to your account",
      ko: "계정에 로그인하세요",
    }),
    submitButton: t({
      en: "Continue",
      ko: "계속하기",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="AuthModal.tsx"
import { useIntlayer } from "next-intlayer";

export const AuthModal = () => {
  const { title, submitButton } = useIntlayer("auth-modal");
  return (
    <form>
      <h2>{title}</h2>
      <button type="submit">{submitButton}</button>
    </form>
  );
};
```

  </Tab>
</Tabs>

`AuthModal.tsx`를 이동하거나 삭제하면 연결된 콘텐츠 정의도 함께 이동되거나 삭제됩니다.

### 단순 자동완성 vs. 엄격한 타입 검증

`next-intl`에서 `IntlMessages`를 오버라이드하면 기본 언어 파일을 기준으로 에디터 자동완성을 지원합니다.

```ts fileName="global.d.ts"
import en from "./messages/en.json";

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
```

하지만 검증 대상은 기본 언어에 한정됩니다. 만약 `ko.json`에서 키가 하나 빠져 있더라도 TypeScript는 에러를 내지 않고 빌드는 정상 통과하며, 실제 사용자에게는 빈 문자열이 노출됩니다.

Intlayer는 모든 콘텐츠 선언 파일로부터 직접 타입을 생성합니다. [`strictMode`](https://intlayer.org/ko/doc/concept/configuration)를 켜두면 어떤 언어에서든 번역이 누락되었을 때 컴파일 에러가 발생해 문제를 사전에 차단합니다.

### 도구 생태계 및 AI 연동

| 기능                       | `next-intl` | Intlayer                                                               |
| -------------------------- | ----------- | ---------------------------------------------------------------------- |
| **VS Code 확장 프로그램**  | ❌ 없음     | ✅ [공식 확장 프로그램](https://intlayer.org/ko/doc/vs-code-extension) |
| **Language Server (LSP)**  | ❌ 없음     | ✅ [전용 LSP 탑재](https://intlayer.org/ko/doc/lsp)                    |
| **AI 에이전트용 MCP 서버** | ❌ 없음     | ✅ [MCP 서버 내장](https://intlayer.org/ko/doc/mcp-server)             |
| **에이전트 스킬 세트**     | ❌ 없음     | ✅ [사전 제작된 스킬](https://intlayer.org/ko/doc/agent_skills)        |
| **인컨텍스트 비주얼 CMS**  | ❌ 없음     | ✅ [무료 오픈소스 CMS](https://intlayer.org/ko/doc/concept/editor)     |

LSP와 MCP 서버가 갖춰져 있어 AI 코딩 어시스턴트가 프로젝트의 번역 구조를 완벽히 이해하고 오차 없는 코드 생성과 업데이트를 수행합니다.

## Crowdin 파트너십의 시사점

`next-intl`은 Crowdin과 공식 파트너 관계를 맺고 있습니다. 스폰서십은 오픈소스 지속성에 큰 도움이 되지만 개발 우선순위에도 영향을 줍니다. 외부 상용 번역 관리 시스템(TMS)과의 연동을 중심으로 설계되었기 때문에, CLI 자체에 무료 로컬 AI 번역 기능을 내장할 동기가 약합니다.

Intlayer는 이러한 기능들을 기본적으로 제공합니다.

**로컬 AI 자동 채우기 (`intlayer fill`):**

보유 중인 OpenAI, Anthropic, Mistral, Gemini API 키를 통해 누락된 번역을 자동으로 채워 넣습니다.

**자체 호스팅 비주얼 CMS:**

[Intlayer CMS](https://intlayer.org/ko/doc/concept/cms)를 이용해 비개발 직군도 웹에서 문구를 직접 수정하고 Git에 곧바로 반영할 수 있습니다.

**자유로운 오픈소스 라이선스:**

전체 툴체인이 Apache 2.0 라이선스로 제공됩니다.

## next-intl이 여전히 적합한 환경

<AccordionGroup>
<Accordion header="복잡한 ICU MessageFormat 문법이 필수적인 경우">

다중 중첩된 복수형이나 서수 분기 등 정교한 ICU 문법을 폭넓게 쓰고 있다면, 성숙한 `next-intl`의 파서가 안정적입니다.

</Accordion>
<Accordion header="기존 Crowdin 파이프라인 중심의 워크플로우">

조직 차원에서 이미 번역 프로세스가 Crowdin에 맞춰져 있다면 매끄럽게 어우러집니다.

</Accordion>
<Accordion header="안정적으로 운영 중인 프로덕션 서비스">

현재 시스템이 무리 없이 작동하고 번들 크기가 비즈니스상 치명적이지 않다면 무리해서 재구축할 이유는 없습니다.

</Accordion>
</AccordionGroup>

## 기존 next-intl 설정을 어떻게 개선할 수 있을까요?

Intlayer는 `next-intl`의 주요 함수 및 훅 시그니처(`useTranslations`, `getTranslations`, 라우팅 헬퍼 등)를 그대로 보존하는 드롭인 호환성 패키지를 제공합니다. 컴파일러 수준의 최적화를 얻기 위해 컴포넌트를 처음부터 다시 작성할 필요가 없습니다.

설정은 단 한 줄의 명령어로 완료됩니다:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

이 대화형 CLI는 다음 작업을 자동으로 수행합니다:

1. `@intlayer/next-intl` 호환성 패키지를 설치합니다.
2. 번들러 별칭(alias)을 구성하여 기존 임포트 구문(`next-intl`, `next-intl/server`)이 Intlayer로 원활하게 연결되도록 처리하므로, `package.json`에서 기존 라이브러리를 안전하게 제거할 수 있습니다.
3. 에디터 내 언어 서버(LSP) 진단, 빌드 타임 트리 셰이킹(라우트 간 번역 데이터 누수 원천 차단), 로컬 AI 번역 워크플로우를 대규모 리팩토링 없이 즉시 활성화합니다.

단계별 세부 내용은 다음 가이드를 참고하세요:

- **간편한 호환성 지원:** [`next-intl` 호환성 레이어](https://intlayer.org/ko/doc/compatibility/next-intl)를 통해 기존 `useTranslations` 코드를 그대로 유지한 채 번들 최적화를 도입할 수 있습니다.
- **단계별 마이그레이션 가이드:** 기존 JSON 파일을 타입 안전한 구조로 변환하는 [next-intl 마이그레이션 가이드](https://intlayer.org/ko/doc/migration/next-intl)를 참고하세요.
- **점진적 하이브리드 구성:** UI 렌더링에는 `next-intl`을 유지하면서, [Intlayer와 next-intl을 함께 사용](https://intlayer.org/ko/blog/intlayer-with-next-intl)하여 로컬 AI 번역 기능만 가져올 수도 있습니다.

무료 [i18n SEO 스캐너](https://intlayer.org/i18n-seo-scanner)를 통해 현재 웹사이트의 번들 누수와 크기를 측정해 보세요:

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## 함께 읽어볼 만한 글

- [Next.js i18n 벤치마크: 성능 심층 비교 분석](https://intlayer.org/ko/doc/benchmark/nextjs)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/ko/blog/next-i18next-vs-next-intl-vs-intlayer)
- [2026년에도 i18next를 계속 써야 할까요?](https://intlayer.org/ko/blog/is-i18next-outdated)
- [컴파일러 기반 i18n 아키텍처의 장점](https://intlayer.org/ko/blog/compiler-vs-declarative-i18n)
