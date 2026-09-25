---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "Lingui vs @intlayer/lingui: 동일한 매크로, 다른 런타임"
description: "React 앱이 Lingui 매크로를 유지한 채 @intlayer/lingui 호환 어댑터를 통해 제공할 때 일어나는 변화. 컴포넌트 크기, 하이드레이션, 누수율 및 페이지당 JavaScript 용량을 동일한 TanStack Start 코드베이스에서 측정하고, 어댑터가 불리한 부분까지 함께 분석합니다."
keywords:
  - Lingui
  - "@intlayer/lingui"
  - Intlayer
  - 호환 어댑터
  - 마이그레이션
  - 국제화
  - i18n
  - 벤치마크
  - 번들 크기
  - 블로그
  - React
  - TanStack Start
  - Vite
slugs:
  - blog
  - lingui-vs-intlayer-lingui
author: aymericzip
---

# Lingui VS @intlayer/lingui | 동일한 매크로, 다른 런타임

`@intlayer/lingui`는 `@lingui/core` 및 `@lingui/react`를 위한 호환 어댑터입니다. 기존의 `` t`...` ``, `<Trans>`, `useLingui()`, `i18n._()` 호출은 그대로 유지되며, 매크로 역시 정상 컴파일됩니다. 변화하는 것은 런타임에 메시지를 가져오는 경로입니다. 언어별 단일 통합 카탈로그 대신, 각 호출 위치는 해당 위치만을 위해 컴파일된 Intlayer 딕셔너리에 바인딩됩니다.

본 글에서는 동일한 TanStack Start 애플리케이션을 Lingui 단독 및 어댑터 적용 구성으로 각각 빌드하여 측정한 결과를 살펴봅니다. 수치는 [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)을 기반으로 합니다. 라이브러리 간의 직접적인 기능 비교는 [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/lingui_vs_intlayer.md)를 참조하십시오. 이 글은 어댑터가 가져오는 실질적 변화와 이점이 없는 영역을 집중적으로 다룹니다.

<TOC/>

> **요약 (tl;dr)**: 동일한 TanStack Start 앱에서 `@intlayer/lingui`는 매크로를 전혀 수정하지 않고도 평균 컴포넌트 크기를 **85.5 KB에서 12.8 KB**(gzip)로 줄였고, 하이드레이션 시간을 **28 ms에서 19.7 ms**로, 언어 전환 시간을 **5.9 ms에서 2.9 ms**로 단축했습니다. 모든 카탈로그를 초기에 불러오는 단순 구성에서는 **90%의 페이지 누수**를 제거하고 페이지당 12 KB를 절감했습니다. 하지만 지연 로딩 구성에서는 일반 Lingui의 115 KB 대비 **페이지당 137 KB**를 전송합니다. Lingui가 빌드 시점에 사전 컴파일된 토큰 배열을 전송하는 반면, 어댑터는 런타임에 ICU를 해석하기 때문입니다. 소스 언어 누수율(~9-10%)은 런타임이 아닌 컴포넌트에 내장된 `message` 폴백에서 발생하므로 양쪽 모두 동일합니다. 본 어댑터는 Vite 플러그인이며 TanStack Start 환경에서 측정되었습니다.

## `@intlayer/lingui`란 무엇인가

Lingui는 컴파일러와 런타임으로 구성됩니다. 소스 코드의 매크로는 언어별 `.po`(또는 JSON) 카탈로그로 추출되고, 언어별 JS 모듈로 컴파일된 뒤, `i18n.load()` + `i18n.activate()`를 통해 전역 `I18n` 인스턴스에 로드됩니다. 모든 `useLingui()`는 해당 인스턴스를 구독하며, 모든 `_()` 호출은 활성화된 카탈로그에서 ID를 검색합니다.

`@intlayer/lingui`는 매크로와 API 구조를 그대로 유지하면서 카탈로그 검색 과정을 대체합니다:

1. **임포트 별칭 지정(Import Aliasing).** `@intlayer/lingui/plugin`의 `lingui()` 플러그인은 `vite-intlayer`를 래핑하고 `resolve.alias`를 추가하여 `@lingui/core` 및 `@lingui/react`가 `@intlayer/lingui`로 해석되도록 합니다. 기존 코드의 import 문은 수정할 필요가 없습니다.
2. **단일 진실 공급원으로서의 카탈로그.** `syncJSON` 플러그인(`.po` 파일용 `syncPO` 포함)은 기존 카탈로그를 읽어 Intlayer 딕셔너리로 변환하며, CLI나 CMS에서 번역이 업데이트되면 다시 파일에 역반영합니다. `splitKeys: "key-prefix"` 설정을 통해 점으로 구분된 플랫 카탈로그(`footer.github`, `hero.title`)가 단일 244 KB 파일 대신 접두사별 소형 딕셔너리들로 분할됩니다.
3. **호출 위치별 바인딩.** Intlayer 최적화 패스는 각 파일에서 `_`, `t`, `<Trans>`에 전달된 ID들을 수집하여 해당 컴포넌트에 일치하는 딕셔너리만 전달합니다. `<Trans id="hero.title">`은 독립적으로 바인딩되며, `useLingui()`는 파일 내에서 사용된 모든 접두사에 바인딩됩니다. 점이 없는 ID(해시된 ID, `mockBanner` 등)는 Lingui의 단일 `messages` 폴백 딕셔너리를 참조합니다.

```tsx fileName="src/components/Hero.tsx"
// 기존 코드 (변경 없음)
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";

const Hero = () => {
  const { _ } = useLingui();
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle">Every byte counts</Trans>
    </section>
  );
};
```

```tsx fileName="컴파일러 출력 결과 (단순화됨)"
import _dicHash_hero from "../.intlayer/dictionaries/hero.mjs";
import {
  useDictionary as useLingui,
  TransDictionary as Trans,
} from "@intlayer/lingui";

const Hero = () => {
  const { _ } = useLingui(_dicHash_hero);
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle" dictionary={_dicHash_hero}>
        Every byte counts
      </Trans>
    </section>
  );
};
```

컴포넌트는 더 이상 전역 인스턴스와 그 뒤의 거대한 카탈로그 전체에 접근하지 않습니다. 오직 `hero`에만 접근합니다. 이것이 바로 아래 표에서 컴포넌트 크기가 7배 줄어드는 핵심 이유입니다.

## 어댑터가 유지하는 것, 무시하는 것, 대체하지 않는 것

| Lingui API                                                | `@intlayer/lingui` 사용 시                                                                                      |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `` t`...` ``, `msg`, `plural`, `select`, `<Trans>` 매크로 | ✅ 유지. Intlayer 패스 전에 `@lingui/babel-plugin-lingui-macro` 또는 `@lingui/swc-plugin`을 빌드에 유지하십시오 |
| `useLingui()` → `{ i18n, _, t }`                          | ✅ 유지. Provider 외부에서도 동작 가능 (`react-intlayer`로부터 로케일 추출)                                     |
| `i18n._(id, values)`, `i18n.t()`                          | ✅ 유지. 명시적 ID와 해시 ID 모두 해석                                                                          |
| ICU 복수형, `select`, `selectordinal`, `#`                | ✅ 유지, Intlayer의 ICU 리졸버를 통해 지원                                                                      |
| `i18n.date()`, `i18n.number()`, `formats`                 | ✅ 유지, 네이티브 `Intl` 기반 동작                                                                              |
| `I18nProvider`                                            | ✅ 유지. `IntlayerProvider`를 래핑하며 `activate()` 시 리렌더링을 위해 `i18n.on("change")`를 청취               |
| `i18n.activate(locale)`                                   | ✅ 유지                                                                                                         |
| `i18n.load(locale, messages)` / `loadAndActivate()`       | ⚠️ **런타임 폴백**으로 수용. 컴파일된 딕셔너리가 우선하며 개발 경고로 코드 제거 권장                            |
| `setupI18n({ messages, missing })`                        | ⚠️ `messages`는 폴백으로 병합되며 `missing`은 무시됨                                                            |
| `lingui extract` / `lingui compile`                       | ✅ 기존 워크플로우 유지. 추출된 카탈로그를 `syncPO` / `syncJSON`에 연결                                         |
| `I18nProvider`의 `defaultComponent`                       | ⚠️ 컨텍스트에 저장되나 렌더링 시 적용되지 않음                                                                  |
| Next.js                                                   | ❌ 본 플러그인은 `vite-intlayer`를 래핑함. Vite, TanStack Start 및 React Router 전용                            |

## 벤치마크 테스트

### 측정 대상

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) 테스트 제품군은 각 구성에서 **동일한 애플리케이션**을 빌드합니다: **10개 페이지**(home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10개 언어**(`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), 동일한 컴포넌트 및 동일한 콘텐츠. 페이지 측정은 `en`과 `fr`을 대상으로 진행되었습니다.

Lingui는 컴파일된 모든 카탈로그를 초기에 가져오는 정적 구성(`static`)부터 라우트별 카탈로그를 지연 로드하는 구성(`scoped-dynamic`)까지 네 가지 로딩 전략으로 빌드되었습니다. 어댑터는 **동일한 컴포넌트**를 바탕으로 `vite.config.ts`와 `intlayer.config.ts`만 변경하여 측정했습니다. `static` 행은 모든 언어를 번들링하며, `dynamic` 행(`importMode: 'dynamic'`)은 활성 언어를 온디맨드로 로드합니다. 최적화 단계에서 호출 위치별 스코프를 자동 적용하므로 별도의 "scoped" 버전은 없습니다.

각 빌드별로 다음 지표를 기록합니다:

- **Lib size**: i18n 라이브러리만 임포트하는 빈 컴포넌트의 gzip 크기.
- **Page JS**: 전체 페이지 및 언어 평균으로 페이지당 다운로드된 gzip JavaScript 크기.
- **Locale leak %**: 다운로드된 JS 중 사용자가 보고 있지 **않은** 언어에 속한 문자열의 비율.
- **Page leak %**: 다운로드된 JS 중 사용자가 위치하지 **않은** 페이지에 속한 문자열의 비율.
- **Component avg**: 개별 컴포넌트를 독립 빌드했을 때의 평균 gzip 크기.
- **E2E reactivity**: 새 언어를 선택한 시점부터 DOM에서 `html[lang]`이 업데이트될 때까지의 실측 소요 시간(Playwright, 5회 반복).
- **Hydration**: React 하이드레이션 단계 소요 시간.

> 아래 수치는 `@lingui/react` 6.6.0 및 `@intlayer/lingui` 9.5.1을 사용한 **2026-09-12** 실행 결과입니다. 테스트 애플리케이션은 간결하게 설계되었으므로(언어당 수십 개 문자열), 누수율은 콘텐츠 규모가 커질수록 두드러지는 **구조적 패턴**을 보여줍니다.

### TanStack Start 측정 결과

| 구성                   | 전략           | Lib size (gz) | Page JS 평균 (gz) | 언어 누수율 | 페이지 누수율 | 컴포넌트 평균 (gz) | E2E 반응성 | 하이드레이션 |
| ---------------------- | -------------- | ------------: | ----------------: | ----------: | ------------: | -----------------: | ---------: | -----------: |
| **base** (i18n 없음)   | -              |        0.0 KB |          111.0 KB |        0.0% |          0.0% |             0.7 KB |     8.1 ms |      21.6 ms |
| Lingui                 | static         |       11.2 KB |          152.2 KB |       50.0% |         90.0% |            58.0 KB |     3.9 ms |      19.9 ms |
| Lingui                 | dynamic        |       11.2 KB |      **115.2 KB** |        9.3% |          0.0% |            85.5 KB |     5.9 ms |      28.0 ms |
| Lingui                 | scoped-static  |       11.2 KB |          120.8 KB |        4.0% |          0.0% |           147.9 KB |     7.1 ms |      33.9 ms |
| Lingui                 | scoped-dynamic |       11.2 KB |          120.2 KB |        8.6% |          0.0% |            83.7 KB |    42.1 ms |      32.9 ms |
| **`@intlayer/lingui`** | static         |   **10.3 KB** |          140.5 KB |       50.0% |      **0.0%** |        **14.9 KB** | **3.3 ms** |  **11.3 ms** |
| **`@intlayer/lingui`** | dynamic        |   **10.3 KB** |          137.0 KB |        9.9% |      **0.0%** |        **12.8 KB** | **2.9 ms** |  **19.7 ms** |
| `intlayer` (네이티브)  | static         |        5.0 KB |          125.8 KB |       50.0% |          0.0% |             8.1 KB |     3.2 ms |      11.5 ms |
| `intlayer` (네이티브)  | dynamic        |        5.0 KB |          118.6 KB |        0.0% |          0.0% |             6.3 KB |     3.6 ms |      14.1 ms |

**지표 분석**

- **컴포넌트 크기: 7배 감소.** 이것이 어댑터의 가장 뚜렷한 효과입니다. 독립적으로 컴파일된 Lingui 컴포넌트는 전략에 따라 평균 **58~148 KB**에 달합니다. `useLingui()`가 전역 인스턴스와 거기에 로드된 전체 카탈로그를 참조하기 때문입니다. 어댑터를 적용한 동일 컴포넌트는 평균 **12.8~14.9 KB**에 불과하며, 자체 딕셔너리와 ICU 리졸버만 참조합니다.
- **하이드레이션: 8~14 ms 단축.** `i18n.load()` + `i18n.activate()`는 React 하이드레이션 전에 클라이언트에서 실행되어야 하므로, Lingui 구성이 지연 로드될수록 시간이 더 소요됩니다(28~34 ms). 어댑터 구성에서는 번들러가 이미 페이지 청크에 배치한 정적 임포트로 전달되어 `static` 모드에서 **11.3 ms**, `dynamic` 모드에서 **19.7 ms**를 기록합니다.
- **언어 전환: 2배 빠르고 지연 절벽 없음.** Lingui의 최적화 설정인 `scoped-dynamic`은 라우트 카탈로그를 요청하고 로드하여 활성화할 때까지 화면이 업데이트되지 않아 `html[lang]` 갱신에 **42 ms**가 걸립니다. 어댑터는 두 모드 모두에서 안정적으로 **2.9~3.3 ms**를 유지합니다.
- **단순 구성의 누수 자동 해결.** 정적 Lingui는 모든 카탈로그를 모든 페이지에 포함하여 152.2 KB와 90%의 페이지 누수가 발생합니다. 반면 정적 어댑터는 동일 컴포넌트에서 140.5 KB 및 0%의 페이지 누수를 달성합니다.
- **페이지당 용량: `dynamic` 모드에서 Lingui가 22 KB 우세.** 이 부분은 명확히 인식해야 합니다. Lingui는 빌드 시 메시지를 토큰 배열로 변환하고 이를 순회하는 11 KB짜리 가벼운 런타임만 배포합니다. 어댑터는 Intlayer의 ICU 리졸버(네이티브 빌드 대비 약 15 KB 추가되는 `@intlayer/core`), 어댑터 계층(~10 KB), `react-intlayer`(~6 KB)를 포함합니다. 이 애플리케이션에서는 **137.0 KB 대 115.2 KB**가 됩니다. 페이지당 전송량 절감이 유일한 목표이며 이미 지연 로딩 Lingui를 최적화해 사용 중이라면 어댑터가 이 지표를 낮춰주지는 못합니다.
- **언어 누수율은 양쪽이 유사함.** `dynamic` 모드에서 Lingui는 9.3%, 어댑터는 9.9%입니다. 이는 컴포넌트 코드 자체에 기인합니다: `i18n._({ id: "careers-benefits.pay", message: "Top-of-market compensation" })`는 영문 원문을 폴백으로 포함하며, 매크로 출력물도 message 필드가 제거되지 않는 한 원문을 유지합니다. 이 영문 텍스트는 런타임에 관계없이 `fr` 청크에 포함됩니다. 인라인 원문이 없는 네이티브 Intlayer(`.content.ts`)만이 0%를 달성합니다.

## 수치가 변화하는 이유와 유지되는 이유

이 결과들을 결정하는 핵심 요인은 **컴포넌트가 무엇에 바인딩되는가**와 **메시지가 어떤 형태로 전송되는가**의 두 가지입니다.

**바인딩 방식.** Lingui에서 분할의 기본 단위는 '언어(로케일)'입니다. `fr`용 `messages.mjs`는 단일 모듈이므로, 해당 인스턴스를 임포트하는 컴포넌트는 전체 내용에 접근하게 되어 번들러가 언어 단위 미만으로 세분화할 수 없습니다. 반면 어댑터에서는 단위가 '호출 위치'가 됩니다. `hero`와 `footer`는 독립된 임포트로 분리되어 컴포넌트별로 온디맨드 로드됩니다. 이것이 컴포넌트 크기, 하이드레이션, 페이지 누수 개선을 만들어냅니다.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en/messages.mjs              # lingui compile 결과물, 언어별 1개
    │   └── fr/messages.mjs
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")
```

```bash
.
├── intlayer.config.ts                   # syncJSON({ splitKeys: "key-prefix" })
├── .intlayer/                           # 생성됨: 언어별, ID 접두사별 딕셔너리
└── src
    ├── locales
    │   ├── en/messages.json             # 변경 없음, 단일 진실 공급원 유지
    │   └── fr/messages.json
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")  ← 변경 없음
```

**전송 포맷.** Lingui의 컴파일 과정은 `{count, plural, one {# item} other {# items}}`를 토큰 배열로 변환하므로 런타임에서 ICU 파싱이 필요 없습니다. 어댑터는 메시지를 텍스트로 보관하고 Intlayer의 ICU 리졸버를 통해 해석합니다. 이는 페이지당 1회 지불되는 약 15 KB의 고정 비용이며, `dynamic` 행이 다른 모든 항목에서 앞서면서도 바이트 용량에서 밀리는 이유입니다. 네이티브 Intlayer는 `.content.ts` 딕셔너리가 빌드 시점에 사전 해결되는 `enu()` / `insert()` 노드를 사용하므로 이 비용을 피할 수 있습니다.

## 3단계 마이그레이션

<Steps>
<Step number={1} title="설치">

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

이 명령어는 Lingui를 감지하고 `lingui.config.ts`를 분석하여 `syncPO`(`.po` 카탈로그) 또는 `syncJSON`(JSON 카탈로그)을 선택하며, `intlayer`, `react-intlayer`, `@intlayer/lingui` 및 해당 동기화 플러그인을 설치합니다. 또한 `vite.config.ts`의 `@lingui/vite-plugin`을 어댑터 플러그인으로 자동 교체합니다. `@lingui/core`, `@lingui/react` 및 매크로 플러그인은 그대로 유지하십시오. 매크로는 계속 컴파일되며 어댑터는 Lingui의 타입을 재활용합니다.

</Step>
<Step number={2} title="카탈로그와 Intlayer 연결">

JSON 카탈로그의 경우 (`lingui.config.ts`에서 `format: "minimal"`):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./src/locales/${locale}/${key}.json`,
      // 점으로 구분된 ID를 첫 번째 세그먼트별로 그룹화: `footer.github` → 딕셔너리 `footer`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

`.po` 카탈로그의 경우, `syncJSON` 대신 `@intlayer/sync-po-plugin`의 `syncPO`를 사용하고 `.po` 확장자가 포함된 동일한 `source` 패턴을 지정합니다. 자세한 내용은 [Sync PO 플러그인 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-po.md)를 참조하십시오.

`splitKeys: "key-prefix"` 설정이 바로 컴포넌트 크기를 획기적으로 줄여주는 핵심 요소입니다. 카탈로그 원본 파일은 플랫 구조를 유지하며, 분할은 자동 생성된 딕셔너리에만 적용되고, 역방향 동기화를 통해 키들이 안전하게 다시 통합됩니다.

</Step>
<Step number={3} title="플러그인 등록">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact({
      // 매크로 플러그인을 유지하십시오. Intlayer 패스 전에 실행되어야 합니다.
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

`lingui()`는 `vite-intlayer`(콘텐츠 감시, 딕셔너리 컴파일, 최적화 패스)를 내포하며 `@lingui/core`와 `@lingui/react`를 어댑터로 리다이렉트하는 별칭을 제공합니다. 이제 빌드하면 위의 개선 수치가 그대로 적용됩니다.

</Step>
</Steps>

### 마이그레이션 후 삭제 가능한 항목

| 파일 / 패턴                                          | 이유                                                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `await import(\`./locales/${locale}/messages.mjs\`)` | 컴포넌트가 직접 필요한 딕셔너리를 임포트합니다. `i18n.load()`는 폴백으로 전환됩니다        |
| `i18n.load()` / `i18n.loadAndActivate()`             | `i18n.activate(locale)`만 유지하고 카탈로그 수동 로딩 코드는 제거합니다                    |
| 빌드 스크립트 내 `lingui compile`                    | JSON 또는 `.po`를 원본으로 사용하고 컴파일된 모듈을 더 이상 임포트하지 않는 경우 제거 가능 |

### 바이트 절감 외에 얻는 이점

- **누락된 번역 감지.** `npx intlayer test`는 특정 언어에서 키가 누락되었을 때 CI 빌드를 실패시킵니다. (`lingui extract`는 통계만 출력)
- **`npx intlayer fill`**을 통한 자동 채우기. 원하는 AI 제공업체(OpenAI, Anthropic, Mistral, Gemini 등)를 통해 누락된 번역을 채우고 카탈로그에 자동 저장합니다.
- **Visual Editor 및 CMS 연동.** 동일한 딕셔너리를 기반으로 동작하므로 비개발자도 직관적인 UI에서 `.po` 및 JSON 파일을 손쉽게 편집할 수 있습니다.
- **`.content.ts`로의 점진적 전환.** 원하는 컴포넌트를 언제든 `useLingui()`에서 로컬 콘텐츠 파일 기반의 `useIntlayer("hero")`로 전환할 수 있습니다. 두 종류의 딕셔너리는 충돌 없이 공존합니다.

## 시작 전 알아두어야 할 한계점

- **`dynamic` 모드의 페이지별 오버헤드.** 앞서 언급했듯, 소규모 앱의 지연 로딩 Lingui 대비 약 +20 KB/페이지의 추가 용량이 발생합니다. 이 차이는 콘텐츠 양에 따라 커지지는 않지만(카탈로그가 아닌 리졸버 크기 때문), 줄어들지도 않습니다.
- **소스 언어 누수 유지.** 메시지 디스크립터 및 매크로 출력에는 폴백용 영문 텍스트가 포함됩니다. 이를 완전히 제거하려면 `message` 필드를 정리하거나 컴포넌트를 `.content.ts`로 이전해야 합니다.
- **`i18n.load()`는 폴백용임.** 컴파일된 카탈로그를 계속 임포트하면서 `load()`를 호출하면 이전 번들과 새 번들이 중복 로드됩니다. 해당 임포트 코드를 제거하십시오.
- **Vite 환경 전용.** `@intlayer/lingui`는 Next.js 플러그인을 제공하지 않습니다. Lingui 기반 Next.js 프로젝트는 [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md)의 직접 도입을 검토해야 합니다.
- **`defaultComponent` 미적용.** `<Trans>` 컴포넌트를 일괄 래핑하기 위해 이 기능에 의존했다면 컴포넌트 코드에 직접 래퍼를 명시하십시오.

## 어떤 선택이 가장 적합한가?

- **Lingui 유지가 적합한 경우**: 이미 `scoped-dynamic` 환경을 구축했고, 평가 기준이 페이지당 바이트 수에 집중되어 있으며, 42 ms 언어 전환 지연과 30 ms 하이드레이션이 앱 요구사항에 부합하는 경우.
- **`@intlayer/lingui` 선택이 적합한 경우**: Lingui를 이미 사용 중이며 매크로를 수정하지 않고 더 가벼운 컴포넌트, 빠른 하이드레이션과 언어 전환, 단순 구성에서의 페이지 누수 제거, 타입 안정적인 ID, CI 검증 및 AI 번역 자동화를 적용하고자 하는 경우.
- **네이티브 Intlayer(`react-intlayer`) 선택이 적합한 경우**: 컴포넌트 리팩토링을 본격적으로 시작하는 경우. 벤치마크 표에서 **언어 누수 0%**, 5 KB 런타임, 베이스 앱 대비 단 +7.6 KB/페이지 증가만을 기록한 유일한 솔루션입니다.

## 관련 비교 자료

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/lingui_vs_intlayer.md) (동일 벤치마크 기반의 두 라이브러리 직접 비교)
- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/next-intl_vs_intlayer-next-intl.md) (호환 어댑터 비교 시리즈)
- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18next_vs_intlayer-i18next.md) (호환 어댑터 비교 시리즈)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/vue-i18n_vs_intlayer-vue-i18n.md) (호환 어댑터 비교 시리즈)
- [호환 어댑터 레퍼런스: Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/lingui.md)
- [컴파일러 기반 vs 선언형 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/compiler_vs_declarative_i18n.md)

## 결론

`@intlayer/lingui`는 Lingui 호출 위치가 바인딩되는 대상을 완전히 혁신합니다. 전역 인스턴스와 언어별 거대 카탈로그 대신, 해당 컴포넌트 전용으로 컴파일된 개별 딕셔너리에 바인딩됩니다. 동일한 TanStack Start 앱에서 매크로를 단 한 줄도 고치지 않고 **컴포넌트 7배 축소**, **하이드레이션 8~14 ms 단축**, **언어 전환 속도 2배 향상**과 42 ms 지연 제거를 이뤄냅니다. 컴포넌트에 내장된 기본 텍스트는 유지되므로 소스 언어 누수는 남으며, 런타임에 ICU를 해석하므로 동적 모드에서 순수 Lingui 대비 약 20 KB/페이지의 용량이 추가됩니다. 팀의 성능 목표와 예산에 맞추어 최적의 구성을 선택하십시오.

모든 원시 측정 데이터, 테스트 앱 및 스크립트는 [Benchmark Bloom 저장소](https://github.com/intlayer-org/benchmark-bloom)에서 확인하실 수 있습니다. 직접 실행해 보시기 바랍니다.

더 자세한 정보는 ['왜 Intlayer인가?' 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)를 참고하시기 바랍니다.
