---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: 2026년에도 i18next를 계속 써야 할까요?
description: i18next는 수많은 웹사이트를 지원하지만, 2011년에 설계된 런타임 아키텍처는 한계를 보이기 시작했습니다. 번들 크기, 트리 쉐이킹 제약, 정체된 혁신을 분석합니다.
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - 국제화
  - i18n
  - 번들 크기
  - 블로그
slugs:
  - blog
  - is-i18next-outdated
author: aymericzip
---

# 2026년에도 i18next를 계속 써야 할까요?

`i18next`는 React 컴포넌트, Webpack 번들링, TypeScript가 대세가 되기 훨씬 전인 2011년에 출시되었습니다. 뛰어난 유연성과 범용성 덕분에 생태계를 장악했고, 거의 모든 기술 스택을 위한 플러그인과 StackOverflow의 풍부한 레퍼런스를 구축했습니다.

이 프로젝트는 방치된 것이 아니며, 정기적으로 패치가 배포되고 있습니다. 하지만 오래된 런타임 엔진을 단순히 유지보수하는 것과 현대 프론트엔드 아키텍처에 맞춰 혁신하는 것은 전혀 다른 문제입니다.

최근 몇 년 동안 프론트엔드는 빌드 타임 컴파일, React Server Components (RSC), 공격적인 트리 쉐이킹, AI 기반 자동화 파이프라인으로 전환되었습니다. 그러나 i18next의 코어는 10년 전과 동일합니다. 클라이언트 측에서 문자열 키를 매핑하는 런타임 싱글톤 구조입니다.

<TOC/>

## 핵심 요약

**유지보수 중심의 운영:**

지난 1년간 `next-i18next`는 약 63개의 커밋(주 1회 수준), `react-i18next`는 약 157개의 커밋을 기록했으며 대부분 의존성 업데이트와 마이너 버그 수정에 머물렀습니다.

**무거운 런타임 오버헤드:**

`react-i18next`와 `next-i18next`는 번역 텍스트를 하나도 렌더링하기 전에 약 17~18 KB (gzip 기준, Minified 시 약 60 KB)를 클라이언트에 주입합니다. 이는 `next-intlayer`(~4.7 KB) 대비 약 4배에 달합니다.

**심각한 콘텐츠 누수:**

기본적인 정적 설정 환경에서 페이지로 전송되는 번역 데이터의 최대 **89.8%**가 다른 라우트나 사용되지 않는 언어의 데이터입니다.

**트리 쉐이킹 불가능:**

`t("home.hero.title")`와 같은 동적 문자열 호출은 번들러가 정적으로 분석할 수 없어, 전체 JSON 파일이 클라이언트 번들에 고스란히 포함됩니다.

**비즈니스 모델의 한계:**

메인테이너들은 상용 번역 플랫폼인 Locize를 운영합니다. CLI에 무료 로컬 AI 번역 파이프라인을 직접 내장하는 것은 그들의 핵심 수익 모델과 직접적으로 충돌합니다.

## 유지보수 vs. 활발한 진화

GitHub 스타 수는 과거의 누적 인기를 반영할 뿐, 현재의 아키텍처 발전 속도를 보여주지는 못합니다.

| 저장소                  | 스타                                                                                                                                                       | 전체 커밋                                                                                                                                                               | 연간 커밋                                                                                                                                                              | 최근 커밋                                                                                                                                        |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `i18next/i18next`       | [![stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=stars)](https://github.com/i18next/i18next/stargazers)             | [![commits](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![yearly](https://img.shields.io/github/commit-activity/y/i18next/i18next?style=for-the-badge&label=%2Fyear)](https://github.com/i18next/i18next/commits)             | [![last](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             |
| `i18next/react-i18next` | [![stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=stars)](https://github.com/i18next/react-i18next/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/i18next/react-i18next?style=for-the-badge&label=%2Fyear)](https://github.com/i18next/react-i18next/commits) | [![last](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) |
| `i18next/next-i18next`  | [![stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=stars)](https://github.com/i18next/next-i18next/stargazers)   | [![commits](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![yearly](https://img.shields.io/github/commit-activity/y/i18next/next-i18next?style=for-the-badge&label=%2Fyear)](https://github.com/i18next/next-i18next/commits)   | [![last](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   |
| `aymericzip/intlayer`   | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits)     | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     |

최근 12개월간의 개발 활동:

| 프로젝트        | 누적 커밋 수 | 최근 12개월 | 집중 영역                                |
| --------------- | ------------ | ----------- | ---------------------------------------- |
| `next-i18next`  | 1,311        | **63**      | Next.js 호환성 유지 및 패치              |
| `react-i18next` | 1,988        | **157**     | 타입 정의 및 유지보수                    |
| `i18next` core  | 2,626        | **259**     | 마이너 패치                              |
| Intlayer        | 7,156        | **4,343**   | 컴파일러, IDE 툴링, AI 번역 엔진 개발 등 |

[![Star History Chart](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

성숙한 라이브러리는 안정성을 제공합니다. 하지만 i18n 도구의 패러다임은 완전히 바뀌었습니다. 빌드 타임에 불필요한 콘텐츠를 제거하고, CI에서 LLM으로 자동 번역하며, Language Server (LSP)와 AI 에이전트를 IDE에 통합합니다. 런타임에 전적으로 의존하는 아키텍처는 이러한 현대적 기술을 수용하기 어렵습니다.

## 번들 영향 측정

<I18nBenchmark framework="tanstack" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> 프로덕션 빌드 환경에서 10개 라우트, 10개 언어, gzip 압축 기준으로 측정되었습니다. 세부 사항은 [i18n 벤치마크 보고서](https://intlayer.org/ko/doc/benchmark)를 참조하세요.

### 라이브러리 기본 오버헤드

번역 텍스트를 추가하기 전의 순수 라이브러리 크기:

| 라이브러리             | Gzip 기준  | Minified 기준 |
| ---------------------- | ---------- | ------------- |
| `next-i18next@16.0.5`  | 17.8 KB    | 61.2 KB       |
| `react-i18next@17.0.2` | 17.3 KB    | 59.8 KB       |
| `intlayer@8.7.12`      | **4.7 KB** | **12.8 KB**   |

### 페이지 크기 및 불필요한 데이터 누수

React / TanStack Start (정적 전략) 환경 측정:

| 라이브러리            | 평균 페이지 JS (gz) | 언어 누수율 | 타 페이지 누수율 | 평균 컴포넌트 (gz) | 하이드레이션 |
| --------------------- | ------------------- | ----------- | ---------------- | ------------------ | ------------ |
| `react-i18next`       | 180.3 KB            | **50.0%**   | **89.8%**        | 24.3 KB            | 85.1 ms      |
| Intlayer              | **127.8 KB**        | 50.0%       | **0.8%**         | **7.1 KB**         | **24.1 ms**  |
| Intlayer (scoped dyn) | **118.1 KB**        | **0.0%**    | **0.8%**         | **4.6 KB**         | 23.7 ms      |

Next.js 환경 측정:

| 라이브러리      | 평균 페이지 JS (gz) | 타 페이지 누수율 | 평균 컴포넌트 (gz) |
| --------------- | ------------------- | ---------------- | ------------------ |
| 기본(i18n 없음) | 150.8 KB            | 0.0%             | 0.7 KB             |
| `next-i18next`  | **227.5 KB**        | **89.8%**        | 24.5 KB            |
| `next-intlayer` | **152.1 KB**        | **0.0%**         | **7.2 KB**         |

### 측정 결과 주요 분석

**페이지 무게 증가:**

Next.js에서 `next-i18next`는 기본 앱 대비 **76.7 KB (gzip)**를 추가합니다 (+50%). 반면 `next-intlayer`는 단 1.3 KB만 추가합니다.

**번역 콘텐츠 누수:**

기본 설정 상태에서는 특정 라우트에 로드되는 텍스트의 약 **90%**가 다른 페이지의 데이터입니다. 네임스페이스를 수동으로 쪼개는 것은 유지보수가 까다롭고 누락 실수가 빈번합니다.

**하이드레이션 지연:**

`react-i18next` 컴포넌트의 하이드레이션에는 **85 ms**가 걸렸으나, Intlayer는 **24 ms**였습니다. 거대한 JSON 트리를 클라이언트 컴포넌트로 주입하는 구조가 초기 상호작용 속도를 늦춥니다.

## i18next가 무거운 이유

### 런타임 기능의 비대화

모든 것을 브라우저에서 실행하기 때문에 보간 로직, 복수형 처리 규칙, 컨텍스트 파서, 포매터, 이벤트 버스 등 모든 모듈을 사전에 로드해야 합니다. 단순한 문장 하나를 보여주는 데에도 전체 엔진 비용이 발생합니다.

### 동적 키 참조로 인한 트리 쉐이킹 불가

`"hero.title"` 키가 런타임에 동적으로 평가되므로, 번들러는 실제로 어떤 텍스트가 쓰이는지 알 수 없습니다. 결과적으로 사용되지 않는 텍스트까지 번들에 남게 됩니다.

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="i18next" value="i18next">

```tsx fileName="Component.tsx"
const { t } = useTranslation("home");

return <h1>{t("hero.title")}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```tsx fileName="Hero.tsx"
const { title } = useIntlayer("hero");

return <h1>{title}</h1>;
```

  </Tab>
</Tabs>

[Intlayer 컴파일러](https://intlayer.org/ko/doc/compiler)는 `Hero.tsx`가 실제로 참조하는 필드만 분석하여 사용되지 않는 번역을 클라이언트 번들 생성 전에 완전히 제거합니다. 자세한 내용은 [번들 최적화](https://intlayer.org/ko/doc/concept/bundle-optimization)를 참조하세요.

## 개발자 경험 (DX) 비교

### 격리된 JSON vs. 컴포넌트와 함께 배치

i18next는 번역 텍스트를 코드와 떨어진 별도의 JSON 폴더에 보관합니다. 반면 Intlayer는 콘텐츠 선언 파일을 컴포넌트 바로 옆에 둘 수 있습니다.

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="i18next" value="i18next">

```json fileName="locales/en/hero.json"
{
  "title": "Ship in every language"
}
```

```json fileName="locales/ko/hero.json"
{
  "title": "모든 언어로 출시하세요"
}
```

```tsx fileName="Hero.tsx"
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { t } = useTranslation("hero");
  return <h1>{t("title")}</h1>;
};
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      en: "Ship in every language",
      ko: "모든 언어로 출시하세요",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");
  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

`Hero.tsx` 컴포넌트를 이동하거나 삭제하면 콘텐츠 선언 파일도 함께 이동되거나 삭제됩니다.

### 단순 자동완성 vs. 엄격한 타입 안전성

`CustomTypeOptions`를 정의하면 에디터 자동완성은 지원되지만, 실제 번역이 빠짐없이 채워졌는지는 검증하지 못합니다. `ko/hero.json`에서 키를 지워도 빌드는 통과하며, 런타임에 폴백 텍스트만 표시됩니다.

Intlayer는 선언된 콘텐츠를 기반으로 직접 타입을 생성합니다. [`strictMode`](https://intlayer.org/ko/doc/concept/configuration)를 활성화하면 특정 언어에서 번역이 누락되었을 때 즉시 빌드 에러를 발생시킵니다.

### 툴링 생태계 비교

| 기능                      | i18next 생태계     | Intlayer                                                               |
| ------------------------- | ------------------ | ---------------------------------------------------------------------- |
| **VS Code 확장 프로그램** | 서드파티만 존재    | ✅ [공식 확장 프로그램](https://intlayer.org/ko/doc/vs-code-extension) |
| **Language Server (LSP)** | ❌ 없음            | ✅ [전용 LSP 내장](https://intlayer.org/ko/doc/lsp)                    |
| **AI용 MCP 서버**         | ❌ 없음            | ✅ [MCP 서버 내장](https://intlayer.org/ko/doc/mcp-server)             |
| **AI 에이전트 스킬**      | ❌ 없음            | ✅ [사전 빌드된 스킬 제공](https://intlayer.org/ko/doc/agent_skills)   |
| **인컨텍스트 비주얼 CMS** | Locize (유료 SaaS) | ✅ [무료 & 오픈소스](https://intlayer.org/ko/doc/concept/editor)       |

LSP와 MCP 서버가 내장되어 있어 AI 코딩 어시스턴트가 프로젝트의 다국어 구조를 정확히 이해하고 정밀한 제안을 제공할 수 있습니다.

## 번역 워크플로우와 Locize 모델

Locize는 i18next 제작진이 운영하는 상용 서비스입니다. 오픈소스의 지속 가능성은 중요하지만, 이 구조는 이해 상충을 유발합니다. 유료 SaaS 번역 플랫폼으로 수익을 창출하는 주체가 CLI에 완전 무료 로컬 AI 번역 도구를 제공할 유인은 부족합니다.

Intlayer는 개방형 방식을 지향합니다.

- [`intlayer fill`](https://intlayer.org/ko/doc/concept/auto-fill)은 본인의 OpenAI, Anthropic, Mistral, Gemini API 키를 활용해 터미널이나 CI에서 누락된 번역을 자동으로 채워줍니다.
- [Intlayer CMS](https://intlayer.org/ko/doc/concept/cms)는 오픈소스로 제공되며 Docker Compose를 통해 자체 호스팅할 수 있습니다.
- 컴파일러, CLI, 에디터, CMS 모두 Apache 2.0 라이선스로 배포됩니다.

## 지금도 i18next가 유효한 경우는?

<AccordionGroup>
<Accordion header="안정적으로 구동 중인 레거시 프로젝트">

현재 애플리케이션이 문제없이 실행 중이고 번들 크기가 비즈니스에 큰 지장을 주지 않는다면 굳이 급하게 마이그레이션할 필요는 없습니다.

</Accordion>
<Accordion header="비표준 플랫폼 환경">

광범위한 플러그인 생태계를 통해 Electron, 구형 jQuery 스택, 맞춤형 네이티브 브리지 등 현대 컴파일러가 기본 지원하지 않는 특수 환경에 대응할 수 있습니다.

</Accordion>
<Accordion header="방대한 커뮤니티 데이터">

오랜 세월 축적된 StackOverflow와 GitHub 이슈 기록 덕분에 특이한 버그나 설정 문제의 해결책을 쉽게 찾을 수 있습니다.

</Accordion>
</AccordionGroup>

## 기존 i18next 설정을 개선하는 방법은?

Intlayer는 i18next 라이브러리(`i18next`, `react-i18next`, `next-i18next`)의 함수 시그니처를 그대로 재현하는 드롭인 호환성 패키지를 제공합니다. 컴포넌트를 완전히 새로 작성하지 않고도 컴파일러 기반 최신 아키텍처의 장점을 즉시 누릴 수 있습니다.

설정은 단 한 줄의 명령어로 완료됩니다.

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

이 대화형 CLI는 다음 작업을 자동으로 수행합니다.

1. `@intlayer/i18next` 호환성 패키지를 설치합니다.
2. 번들러 별칭(alias)을 구성하여 기존 임포트(`useTranslation`, `Trans`, `t`)가 Intlayer를 가리키도록 설정하므로, 기존 라이브러리를 `package.json`에서 안전하게 제거할 수 있습니다.
3. 에디터 언어 서버(LSP) 진단, 빌드 시 트리 쉐이킹(번들 최적화), 로컬 AI 자동 번역 워크플로를 즉시 활성화합니다.

단계별 가이드는 다음 문서를 확인하세요.

- **호환성 레이어:** [i18next](https://intlayer.org/ko/doc/compatibility/i18next), [react-i18next](https://intlayer.org/ko/doc/compatibility/react-i18next), [next-i18next](https://intlayer.org/ko/doc/compatibility/next-i18next) 호환성 레이어를 사용해 기존 코드를 유지하면서 빌드 파이프라인을 현대화합니다.
- **사전 마이그레이션 가이드:** JSON 파일을 타입 안전한 사전으로 변환합니다. [i18next 마이그레이션](https://intlayer.org/ko/doc/migration/i18next), [react-i18next 마이그레이션](https://intlayer.org/ko/doc/migration/react-i18next), [next-i18next 마이그레이션](https://intlayer.org/ko/doc/migration/next-i18next).
- **점진적 하이브리드 운영:** 런타임으로 i18next를 유지하면서, [Intlayer와 i18next를 결합](https://intlayer.org/ko/blog/intlayer-with-i18next)하여 타입 검사와 로컬 AI 번역 기능만 도입합니다.

무료 [i18n SEO 스캐너](https://intlayer.org/i18n-seo-scanner)로 운영 중인 사이트의 번들 누수와 크기를 진단해 보세요.

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## 관련 글 보기

- [Next.js i18n 벤치마크: 성능 심층 분석](https://intlayer.org/ko/doc/benchmark/nextjs)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/ko/blog/react-i18next-vs-react-intl-vs-intlayer)
- [2026년에도 next-intl을 계속 써야 할까요?](https://intlayer.org/ko/blog/is-next-intl-outdated)
- [컴파일러 기반 i18n과 선언적 아키텍처의 차이](https://intlayer.org/ko/blog/compiler-vs-declarative-i18n)
