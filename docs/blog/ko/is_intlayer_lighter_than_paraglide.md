---
createdAt: 2026-09-23
updatedAt: 2026-09-23
priority: 8
title: Intlayer는 Paraglide보다 가벼운가요?
description: Paraglide는 코드가 저장소 내부로 생성되기 때문에 i18n 벤치마크에서 거의 무료처럼 보입니다. 그 용량이 실제로 어디로 가는지, 노드별 로케일 조회가 성능을 저하시키는 이유, 그리고 Intlayer의 동적 로딩이 모든 언어 대신 단 하나의 로케일만 번들에 포함시키는 방식을 살펴봅니다.
keywords:
  - Paraglide
  - Intlayer
  - 국제화
  - i18n
  - Bundle size
  - Tree shaking
  - Benchmark
  - Blog
slugs:
  - blog
  - is-intlayer-lighter-than-paraglide
author: aymericzip
---

# Intlayer는 Paraglide보다 가벼운가요?

네, 그렇습니다.

`Paraglide`는 가장 가벼운 i18n 솔루션으로 널리 알려져 있으며, 얼핏 보면 [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md) 결과도 이에 동의하는 것처럼 보입니다. 라이브러리 크기가 거의 0에 가깝기 때문입니다. 하지만 라이브러리 크기가 0이라고 해서 브라우저로 전송되는 바이트가 0이라는 의미는 아닙니다. 그 바이트들이 해당 지표가 측정하지 않는 다른 위치에 존재한다는 뜻일 뿐입니다.

<TOC/>

## 핵심 요약

**라이브러리 크기가 사라진 것이 아니라 숨겨진 것입니다:**

Paraglide는 런타임과 메시지 함수를 사용자의 코드베이스 내부에 생성합니다. 이 코드는 브라우저로 전송되지만, 라이브러리가 아닌 _사용자의_ 코드로 집계됩니다.

**Provider가 없다고 해서 공짜 이득은 아닙니다:**

모든 `m.my_key()` 호출은 컨텍스트에서 한 번만 읽는 대신, 렌더링되는 노드마다 독립적으로 쿠키나 스토리지를 직접 읽어 로케일을 결정합니다.

**동적 로딩(Dynamic Loading) 부재:**

Paraglide는 메시지의 모든 로케일을 클라이언트 번들로 가져옵니다. 반면 Intlayer에서 `importMode: 'dynamic'` 또는 `'fetch'`를 사용하면 현재 렌더링 중인 단 하나의 로케일만 로드합니다.

**Tree Shaking이 보장되지 않습니다:**

일부 벤치마크 환경에서는 Paraglide가 홍보하는 Tree Shaking이 적용되지 않았습니다. 자체 번들을 반드시 확인해 보시기 바랍니다.

## Paraglide의 용량은 실제로 어디로 가는가?

벤치마크 보고서의 "라이브러리 크기" 지표는 콘텐츠가 추가되기 전, 빈 컴포넌트에서 각 i18n 라이브러리의 Provider와 훅(hook) 용량만을 측정합니다.

| 라이브러리 (TanStack Start)   | 라이브러리 크기 (gz) | 라이브러리 크기 (min) |
| ----------------------------- | -------------------- | --------------------- |
| `@inlang/paraglide-js@2.15.1` | 1.8 KB               | 4.5 KB                |
| `react-intlayer@9.5.1`        | 5.0 KB               | 15.2 KB               |

이 수치만 따로 떼어놓고 보면 Paraglide가 이기는 것처럼 보입니다. 하지만 Paraglide는 컴파일러입니다. `messages/*.json` 파일을 읽어 프로젝트 저장소에 `paraglide/` 폴더를 생성하고, 여기에 `runtime.js`(로케일 감지, 쿠키 및 스토리지 전략, URL 현지화)와 메시지당 하나의 JavaScript 함수를 생성합니다.

```bash
src/paraglide/
├── runtime.js      # 로케일 감지, 전략, URL 헬퍼
├── server.js
├── messages.js     # 모든 메시지 재내보내기
└── messages/
    ├── _index.js
    ├── en.js
    └── fr.js
```

이 코드는 사용자의 `src/` 폴더에 위치하고 상대 경로로 가져오기 때문에, 번들러는 이를 `node_modules` 패키지가 아니라 애플리케이션 자체 코드로 분류합니다. 결과적으로 라이브러리 크기 열에는 거의 아무것도 나타나지 않지만, 동일한 로직이 페이지 번들에 그대로 포함되어 브라우저로 전송됩니다.

코드 생성 자체가 나쁜 접근법은 아닙니다. 생성된 런타임에는 설정에 필요한 로직(접두사 전략, 쿠키 vs 로컬 스토리지 등)만 포함됩니다. Intlayer는 빌드 시점에 환경 변수를 주입하여 설정에서 사용하지 않는 분기를 번들러가 자동으로 제거하는 방식으로 동일한 결과를 달성합니다. 두 방식 모두 `i18next`나 `next-intl`보다 3배에서 10배 더 가볍습니다.

따라서 공정한 비교 기준은 라이브러리 크기가 아닙니다. **페이지당 실제로 전송되는 JavaScript의 양**입니다.

## 실측된 페이지 용량

TanStack Start 앱, 10개 페이지, `en` 및 `fr` 라우트 측정, gzip 압축:

| 구성                               | 페이지 JS 평균 (gz) | 베이스 대비 | 로케일 누수 | 타 페이지 누수 |
| ---------------------------------- | ------------------- | ----------- | ----------- | -------------- |
| 베이스 (i18n 없음)                 | 111.0 KB            | -           | 0.0%        | 0.0%           |
| `paraglide` (모든 전략)            | 125.1 KB            | +14.1 KB    | 49.7%       | 0.0%           |
| `intlayer` (`importMode: static`)  | 125.8 KB            | +14.8 KB    | 50.0%       | 0.0%           |
| `intlayer` (`importMode: dynamic`) | **118.6 KB**        | **+7.6 KB** | **0.0%**    | **0.0%**       |

Next.js 16 App Router, 동일 애플리케이션:

| 구성               | 페이지 JS 평균 (gz) | 베이스 대비 |
| ------------------ | ------------------- | ----------- |
| 베이스 (i18n 없음) | 141.0 KB            | -           |
| `paraglide-next`   | 155.3 KB            | +14.3 KB    |
| `next-intlayer`    | **141.3 KB**        | **+0.3 KB** |

<I18nBenchmark framework="tanstack" vertical/>

> 전체 데이터는 [TanStack Start 벤치마크 보고서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)와 [Next.js 벤치마크 보고서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md)에서 확인할 수 있습니다. 모든 번들은 [벤치마크 저장소](https://github.com/intlayer-org/benchmark-i18n)에서 직접 분석할 수 있습니다.

두 가지 주목할 만한 점이 드러납니다:

- `static` 모드에서 Intlayer는 Paraglide와 사실상 동일한 양의 콘텐츠를 전송합니다(125.8 KB vs. 125.1 KB). 이는 자연스러운 결과입니다. 둘 다 페이지에서 사용하는 메시지의 모든 로케일을 포함하기 때문입니다.
- Paraglide는 동적 모드를 지원하지 않으므로 어떤 전략을 사용하든 125.1 KB로 유지됩니다. 위의 표에 있는 모든 행이 정적 방식에 해당합니다.

## Provider 부재: 좋아 보이지만 실상은 그렇지 않은 설계

Paraglide에는 Provider가 없습니다. 메시지를 가져와 바로 호출하기만 하면 됩니다:

```tsx fileName="Hero.tsx"
import { m } from "../paraglide/messages.js";

export const Hero = () => (
  <section>
    <h1>{m.hero_title()}</h1>
    <p>{m.hero_description()}</p>
    <button>{m.hero_cta()}</button>
  </section>
);
```

컨텍스트도, 래퍼도, 훅도 없습니다. 겉보기에는 훨씬 단순해 보입니다. 그러나 로케일 정보는 여전히 어디선가 읽어와야 합니다. 생성된 각 메시지 함수는 대략 다음과 같이 생겼습니다(단순화한 코드):

```js fileName="paraglide/messages/_index.js"
export const hero_title = (inputs = {}, options = {}) => {
  const locale = options.locale ?? getLocale(); // 매 호출마다 실행됨

  if (locale === "en") return en.hero_title(inputs);
  if (locale === "fr") return fr.hero_title(inputs);
  // ...로케일별 분기
};
```

그리고 `getLocale()`은 설정된 전략(쿠키, 로컬 스토리지, URL, 기본 로케일)을 순회하며 현재 로케일을 찾습니다. 즉, 렌더링되는 모든 텍스트 노드(`<>{m.my_key()}</>`)가 브라우저의 `document.cookie` 읽기를 포함하여 자체적으로 로케일 확인 로직을 수행합니다. 200개의 번역 문자열이 있는 페이지는 렌더링당 200번의 로케일 조회를 실행하고, 리렌더링마다 이를 반복합니다.

반면 Provider 기반 라이브러리는 로케일을 **단 한 번만** 읽어 컨텍스트(또는 시그널, 스토어)에 저장하고, 각 노드는 이미 메모리에 저장된 값을 참조합니다. Provider의 크기는 수백 바이트에 불과합니다. 이를 생략하면 렌더링마다 CPU 오버헤드가 발생하며, 이는 벤치마크 결과에 뚜렷하게 반영됩니다. TanStack Start에서 Paraglide의 페이지 로드 및 언어 전환 속도는 Intlayer에 일관되게 뒤처집니다(페이지 로드 22.1 ms vs 14.6 ms, E2E 반응 속도 4.3 ms vs 3.2 ms).

## 개발자 경험 (Developer Experience)

Paraglide의 원본 소스는 JSON이지만, 개발자가 JSON을 직접 가져오지는 않습니다. 컴파일러가 생성한 `.js` 파일을 가져옵니다:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "hero_title": "Ship your app in every language"
}
```

```json fileName="messages/ko.json"
{
  "hero_title": "모든 언어로 앱을 배포하세요"
}
```

```tsx fileName="Hero.tsx"
// 컴파일러가 JSON을 바탕으로 다시 생성한 이후에만 사용 가능
import { m } from "../paraglide/messages.js";

export const Hero = () => <h1>{m.hero_title()}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      ko: "모든 언어로 앱을 배포하세요",
      en: "Ship your app in every language",
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

이러한 개발 워크플로우에는 단점이 따릅니다:

- JSON 파일이 변경될 때마다 import가 정상 인식되거나 타입이 갱신되기 전에 재생성 과정을 거쳐야 합니다.
- 생성된 `paraglide/` 폴더를 Git에 커밋하거나(텍스트를 변경하는 PR마다 생성 파일 충돌 발생) Git에서 무시해야(타입 체크, 테스트, CI 작업 전에 매번 생성 단계 필수) 합니다.
- 모든 문자열이 함수 호출로 변환됩니다. 단순한 고정 값으로 충분한 곳을 포함하여 모든 곳에서 상수가 `m.key()`로 바뀝니다.

## Tree Shaking: 자체 번들을 점검하세요

Paraglide의 핵심 장점은 각 메시지가 독립적인 export이므로 사용되지 않는 메시지가 Tree Shaking으로 제거된다는 점입니다. Svelte + Vite 벤치마크에서는 이 기능이 설명대로 잘 작동했습니다.

하지만 다른 환경에서는 그렇지 못했습니다. [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md) 측정에서 Paraglide 페이지는 기본 앱보다 14 KB 무거웠던 반면, `next-intlayer`는 0.3 KB만 추가했습니다. TanStack Start의 이전 테스트에서도 다른 페이지의 메시지가 현재 라우트 번들에 섞여 들어가는 현상이 확인되었습니다.

Tree Shaking은 번들러(Turbopack, Rolldown, Rollup), 메시지 import 방식(`import { m }` vs. `import * as m`), 부수 효과(side effect) 분석에 크게 의존합니다. 번들 크기 때문에 Paraglide를 고려하고 있다면, 번들 분석기를 열어 프로젝트에서 실제로 Tree Shaking이 정상 작동하는지 확인하시기 바랍니다.

## 동적 로딩 부재

이것은 구조적인 한계입니다. Paraglide에는 한 번에 하나의 로케일만 로드할 수 있는 메커니즘이 없습니다. 모든 메시지 함수가 각 언어의 구현을 정적으로 가져오므로 모든 언어가 클라이언트 번들에 고스란히 포함됩니다.

2개 언어를 지원할 경우 번역 데이터의 절반이 낭비되며, 이는 위에서 측정한 ~50%의 로케일 누수와 정확히 일치합니다. 10개 언어의 경우 90%, 30개 언어의 경우 97%가 낭비됩니다.

이를 동적 로딩으로 바꾼다고 해결되지는 않습니다. 메시지마다 별도의 함수가 존재하므로, 각 함수를 지연 로딩하면 수천 번의 네트워크 요청이 발생하게 됩니다.

Intlayer는 전역 또는 딕셔너리별로 유연한 선택권을 제공합니다:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic", // 'static' | 'dynamic' | 'fetch'
  },
};

export default config;
```

| `importMode` | 클라이언트로 전송되는 내용                 | vs. Paraglide                     |
| ------------ | ------------------------------------------ | --------------------------------- |
| `static`     | 페이지에서 사용하는 딕셔너리의 모든 로케일 | 이론적으로 동일한 용량            |
| `dynamic`    | 현재 로케일만 딕셔너리 단위로 지연 로드    | N개 로케일 기준 **N배 더 가벼움** |
| `fetch`      | 현재 로케일만 Live Sync API를 통해 가져옴  | N개 로케일 기준 **N배 더 가벼움** |

[빌드 변환](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)과 `importMode: 'static'`을 사용하면, Intlayer는 이론상 Paraglide와 완전히 동일한 크기의 콘텐츠를 전송합니다. `'dynamic'` 또는 `'fetch'` 모드에서는 현재 로케일에 필요한 내용만 가져오므로, N개 언어를 지원하는 애플리케이션의 경우 번역 페이로드가 Paraglide 대비 N분의 1로 줄어듭니다.

## Paraglide가 여전히 유용한 경우

<AccordionGroup>
<Accordion header="지원 언어가 적은 Svelte + Vite 환경">

스택이 Svelte + Vite 기반이고 2~3개 언어만 지원한다면, Tree Shaking이 정상 작동하여 추가 언어로 인한 오버헤드가 적습니다.

</Accordion>
<Accordion header="기존 inlang 워크플로우를 사용하는 팀">

이미 inlang 생태계(Fink, Sherlock, 메시지 포맷 플러그인)를 활용하고 있는 팀이라면 Paraglide와 원활하게 통합할 수 있습니다.

</Accordion>
</AccordionGroup>

## 실제 애플리케이션에서 테스트해 보세요

무료 [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner)를 통해 프로덕션 애플리케이션의 번들 크기와 로케일 누수를 확인해 보세요:

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

Intlayer 설정 방법:

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

## 추가 자료

- [TanStack Start i18n 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)
- [Next.js i18n 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md)
- [번들 최적화 및 `importMode`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)
- [React i18n 라이브러리 선택 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/how_to_pick_react_i18n_library.md)
- [컴파일러 기반 국제화의 장단점](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/compiler_vs_declarative_i18n.md)
