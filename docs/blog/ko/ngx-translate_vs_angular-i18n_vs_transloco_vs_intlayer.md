---
createdAt: 2026-11-24
updatedAt: 2026-11-25
priority: 8
title: "ngx-translate vs Angular i18n vs Transloco vs Intlayer 비교 (2026)"
description: "Angular i18n 라이브러리 ngx-translate, @angular/localize, Transloco, Intlayer의 런타임 언어 전환, 타입 안전성, 지연 로딩, 복수형, SSR을 비교합니다."
keywords:
  - ngx-translate
  - Transloco
  - Angular i18n
  - "@angular/localize"
  - Angular 국제화
  - ngx-translate Transloco 비교
  - Intlayer
  - i18n 라이브러리 비교
slugs:
  - blog
  - ngx-translate-vs-angular-i18n-vs-transloco-vs-intlayer
author: aymericzip
---

# ngx-translate vs Angular i18n vs Transloco vs Intlayer

Angular는 자체 i18n을 제공하는 유일한 주요 프레임워크이며, 커뮤니티 라이브러리와 반대되는 방식을 택합니다. `@angular/localize`는 빌드 시 번역하여 언어마다 앱을 만듭니다. `ngx-translate`와 Transloco는 JSON 파일에서 런타임에 번역합니다. Intlayer는 빌드 시 콘텐츠를 컴파일하지만, 런타임에 언어를 전환하는 단일 앱을 유지합니다.

이 글은 실제 선택을 좌우하는 언어 전환 방식, 콘텐츠 위치, 컴파일러가 감지하는 문제, 브라우저가 로드하는 항목을 비교합니다.

## 목차

<TOC/>

## 빠른 요약

- **`@angular/localize`** (Angular i18n): 런타임 비용이 없고 ICU를 기본 지원하지만, 로케일마다 빌드와 배포가 필요하며 언어 전환 시 앱을 다시 로드합니다.
- **`ngx-translate`**: 가장 오래되고 단순한 런타임 방식입니다. 로케일별 JSON 파일을 HTTP로 로드하며, 키에 타입이 없고 복수형은 플러그인으로 처리합니다.
- **Transloco**: 큰 앱을 위한 런타임 방식입니다. 스코프로 기능별 번역을 로드하며, 플러그인이 ICU, 로케일별 서식, 키 추출을 제공합니다.
- **Intlayer**: 컴포넌트 옆에 콘텐츠를 선언하고 빌드 시 타입을 생성합니다. 컴포넌트와 로케일별로 분할하며 런타임 전환을 지원합니다. 커스텀 esbuild builder가 필요합니다.

> 각 라이브러리의 배경은 [JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)를 참고하세요.

- [JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)

## 빌드 시점과 런타임: 방식을 가르는 선택

**`@angular/localize`**는 번역을 컴파일된 템플릿에 인라인합니다. `ng build --localize`는 `dist/app/en`, `dist/app/fr` 등을 출력하며, 각각 한 언어만 포함합니다. 런타임에 가져오거나 해석할 것이 없어 로드 이후에는 가장 빠릅니다. 대신 N개의 빌드를 테스트하고 N개의 폴더를 배포해야 하며, `/fr/`을 해당 폴더로 보내는 서버나 CDN 규칙이 필요합니다. 언어를 바꾸면 페이지 전체를 다시 로드하고, `ng serve`도 한 번에 한 로케일만 실행합니다.

**`ngx-translate`와 Transloco**는 빌드 하나를 유지합니다. 로케일이 바뀌면 서비스가 `fr.json`을 가져오고 각 pipe나 디렉티브가 다시 렌더링됩니다. 전환은 즉시 이루어지지만 첫 렌더링은 HTTP 요청을 기다리고, 키는 일반 문자열입니다. SSR에서는 loader가 서버에서도 작동해야 합니다. 절대 URL이나 파일 시스템 loader를 사용하고, `TransferState`로 중복 요청을 방지합니다.

**Intlayer**도 단일 빌드이지만 원시 JSON을 가져오는 대신 콘텐츠를 번들에 컴파일합니다. `useIntlayer()`가 Signal을 반환하므로 로케일이 바뀌면 이를 읽는 컴포넌트가 새로고침 없이 갱신됩니다.

런타임 라이브러리에서 놓치기 쉬운 Angular의 특성이 있습니다. `DatePipe`, `CurrencyPipe`, `DecimalPipe`가 읽는 `LOCALE_ID`는 부트스트랩 시 고정됩니다. `ngx-translate`로 언어를 바꿔도 날짜와 가격 서식은 변하지 않습니다. Transloco는 `@jsverse/transloco-locale`로, Intlayer는 현재 로케일을 따르는 `useDate`, `useNumber`, `useCurrency`로 해결합니다. `@angular/localize`는 빌드마다 별도 `LOCALE_ID`가 있어 이 문제가 없습니다. `Intl`에 관한 내용은 [날짜·시간·숫자 서식 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/date_time_number_formatting_locales.md)를 참고하세요.

- [날짜·시간·숫자 서식 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/date_time_number_formatting_locales.md)

## 기능 비교

|                      | `@angular/localize`                                    | `ngx-translate`                                    | Transloco                                      | Intlayer                                                          |
| :------------------- | :----------------------------------------------------- | :------------------------------------------------- | :--------------------------------------------- | :---------------------------------------------------------------- |
| **번역 적용**        | 빌드 시 인라인                                         | 런타임                                             | 런타임                                         | 빌드 시 컴파일, 런타임에 해석                                     |
| **릴리스별 빌드 수** | 로케일마다 하나                                        | 하나                                               | 하나                                           | 하나                                                              |
| **로케일 전환**      | 다른 빌드로 페이지 재로드                              | 즉시                                               | 즉시                                           | 즉시                                                              |
| **콘텐츠 위치**      | 원문은 템플릿, 번역은 XLIFF/JSON                       | 로케일별 JSON                                      | 로케일별 JSON 및 스코프별 JSON                 | 컴포넌트 옆 `.content.ts`/JSON 또는 중앙 관리                     |
| **복수형 / ICU**     | ✅ 템플릿 기본 ICU                                     | ⚠️ `ngx-translate-messageformat-compiler` 플러그인 | ⚠️ `@jsverse/transloco-messageformat` 플러그인 | ✅ CLDR 기반 `plural()`, ⚠️ ICU 문자열 부분 지원                  |
| **키 타입**          | 해당 없음, 원문이 메시지                               | ❌ 없음                                            | ❌ 없음, Keys Manager로 누락 키 CLI 검사       | ✅ 자동 생성, 잘못된 키는 `ng build` 실패                         |
| **누락된 번역**      | 빌드 경고 또는 `i18nMissingTranslation` 설정으로 오류  | 런타임에 원시 키 표시                              | 런타임 대체 언어, CLI 검사                     | TypeScript로 감지, CI의 `intlayer test`                           |
| **지연 로딩**        | 불필요, 빌드마다 한 로케일                             | 전체 로케일 파일, 수동 분할                        | ✅ 스코프별 (라우트 또는 컴포넌트)             | ✅ 컴포넌트 및 로케일별                                           |
| **Signals**          | 해당 없음, 정적 텍스트                                 | Pipe와 Observable                                  | `translateSignal()`                            | `useIntlayer()`가 Signal 반환                                     |
| **빌드 설정**        | `ng add @angular/localize`, `angular.json` 로케일 설정 | 없음                                               | 없음                                           | `@angular-builders/custom-esbuild` 및 esbuild 플러그인            |
| **번역자 작업**      | ✅ TMS에서 사용하는 XLIFF                              | JSON                                               | JSON                                           | `.content.ts`/JSON, 동기화 플러그인, 시각적 편집기, CLI AI 채우기 |

몇 가지는 설명이 더 필요합니다.

**`@angular/localize`의 메시지 ID.** 커스텀 ID (`i18n="@@cartTitle"`)가 없으면 각 메시지 ID는 원문의 해시입니다. 영어 오타 하나만 고쳐도 해당 메시지의 모든 번역이 연결을 잃어 번역자가 다시 처리해야 합니다. 처음부터 커스텀 ID를 지정하세요.

**`ngx-translate`의 분할.** 기본 loader가 `fr.json` 전체를 다운로드하므로 모든 페이지가 다른 페이지의 문자열도 가져옵니다. 커스텀 loader나 여러 `TranslateService` 인스턴스로 기능별 분할이 가능하지만 강제되지는 않습니다. [컴포넌트별 i18n과 중앙 집중식 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/per-component_vs_centralized_i18n.md)에서 장단점을 다룹니다.

- [컴포넌트별 i18n과 중앙 집중식 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/per-component_vs_centralized_i18n.md)

**Transloco의 스코프.** 스코프는 JSON 파일 폴더 (`i18n/cart/en.json`)로, 라우트나 컴포넌트가 제공할 때 로드됩니다. 런타임 라이브러리 중 컴포넌트별 콘텐츠에 가장 가깝습니다. 공유 컴포넌트가 다른 기능의 스코프에 접근하지 않는 한 잘 작동합니다.

**Intlayer의 builder.** Angular CLI가 esbuild 플러그인을 노출하지 않아 `angular.json`에 `@angular-builders/custom-esbuild`가 필요합니다. 작은 변경이지만 Angular 업그레이드에 맞춰 서드파티 builder도 관리해야 합니다. 전체 설정은 [Angular 설정 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_angular_21.md)를 참고하세요.

- [Angular 설정 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_angular_21.md)

## 커밋 활동

`@angular/localize`는 `angular/angular` 모노레포에 있어 커밋 수를 직접 비교할 수 없으므로 제외했습니다.

<GithubCommits repositories="ngx-translate/core,jsverse/transloco,aymericzip/intlayer" />

## npm 다운로드 수

<NpmDownloads packages="@angular/localize,@ngx-translate/core,@jsverse/transloco,angular-intlayer" period="last-6-months" />

다운로드 수는 현재의 선택보다 역사를 반영합니다. Transloco 이전에 시작한 앱은 여전히 `ngx-translate`를 설치하고, AI 도우미도 학습 코드에 많다는 이유로 계속 추천합니다. Transloco는 2024년에 `@ngneat/transloco`에서 `@jsverse/transloco`로 옮겼으며 이전 스코프도 아직 다운로드됩니다.

## 각 라이브러리로 같은 컴포넌트 구현하기

제목과 복수형을 포함하는 장바구니 요약입니다. 템플릿은 거의 같지만 문자열의 위치와 컴파일러가 아는 정보가 달라집니다.

<Tabs defaultTab="angular-localize">
  <Tab label="@angular/localize" value="angular-localize">

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2 i18n="@@cartTitle">Your cart</h2>
      <p i18n="@@cartItems">
        {count(), plural, one {{{ count() }} item} other {{{ count() }} items}}
      </p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

```bash
ng extract-i18n --output-path src/locale
ng build --localize
```

```xml fileName="src/locale/messages.fr.xlf"
<trans-unit id="cartTitle" datatype="html">
  <source>Your cart</source>
  <target>Votre panier</target>
</trans-unit>
<trans-unit id="cartItems" datatype="html">
  <source>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> item} other {<x id="INTERPOLATION"/> items}}</source>
  <target>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> article} other {<x id="INTERPOLATION"/> articles}}</target>
</trans-unit>
```

영문은 템플릿에 남습니다. 번역자는 추출된 XLIFF를 작업하며, 로케일마다 별도 빌드를 생성합니다. TypeScript 문자열은 `$localize` 태그를 사용합니다.

  </Tab>
  <Tab label="ngx-translate" value="ngx-translate">
  <Tabs group="locale">
  <Tab value="en" label="영어">

```json fileName="public/i18n/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="프랑스어">

```json fileName="public/i18n/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-cart-summary",
  imports: [TranslatePipe],
  template: `
    <section>
      <h2>{{ "cart.title" | translate }}</h2>
      <p>{{ "cart.items" | translate: { count: count() } }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

ICU 복수형은 `ngx-translate-messageformat-compiler`가 있어야 작동하며, 기본 파서는 `{{count}}`만 치환합니다. `"cart.titel"`도 컴파일되지만 런타임에는 원시 키가 표시됩니다.

  </Tab>
  <Tab label="Transloco" value="transloco">
  <Tabs group="locale">
  <Tab value="en" label="영어">

```json fileName="public/i18n/cart/en.json"
{
  "title": "Your cart",
  "items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="프랑스어">

```json fileName="public/i18n/cart/fr.json"
{
  "title": "Votre panier",
  "items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { provideTranslocoScope, TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: "app-cart-summary",
  imports: [TranslocoDirective],
  providers: [provideTranslocoScope("cart")],
  template: `
    <section *transloco="let t; prefix: 'cart'">
      <h2>{{ t("title") }}</h2>
      <p>{{ t("items", { count: count() }) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

`cart` 스코프는 컴포넌트의 첫 렌더링 때 가져옵니다. ICU 복수형에는 `@jsverse/transloco-messageformat`이 필요합니다. 키에 타입은 없으며 `transloco-keys-manager`가 누락되거나 사용하지 않는 키를 보고합니다.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/app/cart-summary/cart-summary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ ko: "장바구니", en: "Your cart", fr: "Votre panier" }),
    items: t({
      ko: plural({ other: "{{count}}개 상품" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2>{{ content().title }}</h2>
      <p>{{ content().items(count()) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
  content = useIntlayer("cart-summary");
}
```

모든 로케일이 컴포넌트 옆 한 파일에 있습니다. 빌드 시 타입을 생성하므로 `content().titel`은 `ng build`를 실패시키고, `t()`에 없는 로케일은 편집기에서 감지됩니다.

  </Tab>
</Tabs>

## 앱에 맞는 선택

<AccordionGroup>
<Accordion header="상호작용이 적고 SEO가 중요한 공개 사이트">

`@angular/localize`가 맞습니다. 로케일마다 별도 URL과 빌드가 있고, 사전 렌더링된 페이지는 번역된 상태로 전달되며 i18n 런타임이 필요 없습니다. 콘텐츠 중심이고 언어 전환이 드물면 로케일별 빌드 부담도 적습니다. 올바른 `hreflang` 태그도 설정하세요. [hreflang 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/hreflang_guide_multilingual_seo.md)를 참고하세요.

- [hreflang 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/hreflang_guide_multilingual_seo.md)

</Accordion>
<Accordion header="앱 안에서 언어를 바꾸는 대시보드나 SaaS">

런타임 방식을 선택하세요. 다른 빌드를 다시 로드하면 메모리 상태가 사라지며, 언어 메뉴에서 앱 전체가 다시 로드되는 경험도 어색합니다. 두세 로케일의 작은 앱에는 `ngx-translate`로 충분합니다. 기능이 십여 개를 넘어가면 스코프를 제공하는 Transloco가 더 안정적인 선택입니다.

</Accordion>
<Accordion header="TMS나 번역 회사에서 번역을 받는 경우">

`@angular/localize`는 각종 TMS가 읽는 XLIFF를 내보내고, 템플릿의 원문이 번역자에게 맥락을 제공합니다. `ngx-translate`와 Transloco의 JSON도 널리 지원됩니다. 두 런타임 라이브러리 모두 ICU 복수형에 플러그인이 필요하므로, 선택 전에 번역 업체가 이를 처리하는지 확인하세요.

</Accordion>
<Accordion header="지연 라우트가 많고 번들 크기가 제한된 대형 앱">

Transloco 스코프 또는 Intlayer입니다. 둘 다 모든 기능의 문자열을 모든 라우트에 보내지 않습니다. 차이는 강제 여부입니다. Transloco 스코프는 규약이며, Intlayer 사전은 `useIntlayer()`가 가져오는 곳에만 번들로 포함됩니다. [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)와 [동적 사전](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)을 참고하세요.

- [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)
- [동적 사전](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)

</Accordion>
<Accordion header="타입 안전성이 필수인 경우">

Intlayer만 기본적으로 키에 타입을 제공합니다. `ngx-translate`와 Transloco에서는 키 오타도 컴파일되며 프로덕션에서 원시 키로 드러납니다. Transloco Keys Manager로 CI에서 감지할 수는 있지만 컴파일 오류와 같지는 않습니다. [누락된 번역 감지](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/detecting_missing_translations.md)에서 접근법을 비교합니다.

- [누락된 번역 감지](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/detecting_missing_translations.md)

</Accordion>
<Accordion header="AI로 번역을 생성할 예정인 경우">

컴포넌트 옆 콘텐츠와 누락 로케일을 채우는 CLI를 함께 쓰는 것이 가장 짧은 경로입니다. Intlayer의 [`fill` 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md)은 자신의 API 키로 실행되며 바뀐 부분만 다시 번역합니다. XLIFF나 JSON 카탈로그라면 같은 흐름을 직접 스크립트로 구현해야 합니다.

- [`fill` 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md)

</Accordion>
</AccordionGroup>

## 각 방식의 한계

- **`@angular/localize`**: 로케일별 빌드와 배포, 언어 변경 시 재로드, 원문 변경으로 연결을 잃는 해시 ID가 부담입니다. 빌드 후 CMS에서 번역을 로드하려면 부트스트랩 처리를 우회해야 합니다.
- **`ngx-translate`**: 키에 타입이 없고, 복수형과 ICU는 플러그인이 필요하며, 매 페이지에서 전체 로케일 파일을 가져옵니다. 비순수 pipe는 변경 감지마다 재평가하고 날짜와 숫자의 `LOCALE_ID`도 처리하지 않습니다.
- **Transloco**: 키에 타입이 없고 ICU는 플러그인이 필요하며, 스코프는 보장이 아닌 규약입니다. `@angular/localize`의 기본 기능을 얻으려면 여러 플러그인을 조합해야 합니다.
- **Intlayer**: `angular.json`에 서드파티 builder가 필요하며 Angular 커뮤니티는 다른 세 라이브러리보다 작습니다. ICU 지원도 부분적입니다. 콘텐츠가 코드 전반에 분산되는 설계이므로 번역자에게 한 파일로 내보내려면 [JSON 동기화 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)이나 CLI가 필요합니다.

- [JSON 동기화 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)

## ngx-translate에서 마이그레이션

[`@intlayer/ngx-translate` 호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/ngx-translate.md)는 Intlayer가 콘텐츠를 제공하면서도 `TranslateService`, `translate` pipe, `[translate]` 디렉티브를 유지하므로 템플릿을 하나씩 옮길 수 있습니다. [마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_ngx-translate_to_intlayer.md)를 따라가세요. Transloco나 `@angular/localize`에서는 [JSON 동기화 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)으로 기존 JSON 카탈로그를 마이그레이션 중에도 원본으로 유지할 수 있습니다.

- [`@intlayer/ngx-translate` 호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/ngx-translate.md)
- [마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_ngx-translate_to_intlayer.md)
- [JSON 동기화 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)

## 자주 묻는 질문

<FAQ>
<Question title="ngx-translate는 여전히 유지보수되나요?">

네. 수년간 활동이 적었지만 2024년에 새 유지보수자가 합류했고, 이후 `provideTranslateService` 같은 standalone API를 출시했습니다. 런타임 JSON, 문자열 키, 플러그인 기반 복수형이라는 설계는 그대로입니다.

</Question>
<Question title="새 Angular 앱에는 ngx-translate와 Transloco 중 어느 것이 좋나요?">

작은 앱이 아니라면 Transloco입니다. `ngx-translate` 기능에 스코프, Signal 도우미, SSR 가이드, 키 도구를 더합니다. API가 비슷해 나중에 바꾸는 작업은 대체로 기계적이지만, 성장할 앱이라면 처음부터 선택할 수 있습니다.

</Question>
<Question title="@angular/localize는 재로드 없이 언어를 바꿀 수 있나요?">

기본 설계로는 안 됩니다. 번역이 빌드 시 인라인되므로 다른 언어에는 다른 빌드가 필요합니다. 부트스트랩 전 `loadTranslations()`로 런타임에 번역을 가져올 수 있지만, 전환하려면 앱을 다시 시작해야 합니다.

</Question>
<Question title="Angular SEO에는 어떤 방식이 가장 좋나요?">

라이브러리보다 라우팅이 중요합니다. 로케일별 URL, `hreflang`, `<html lang>`, 번역된 서버 렌더링 HTML이 필요합니다. `@angular/localize`는 로케일별 별도 빌드이므로 쉽게 갖출 수 있습니다. 런타임 라이브러리는 SSR과 현지화된 라우트가 필요합니다. [국제화와 SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/internationalization_and_SEO.md)를 참고하세요.

- [국제화와 SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/internationalization_and_SEO.md)

</Question>
<Question title="Intlayer는 Analog에서 작동하나요?">

네, Vite를 통해 작동합니다. [Analog 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_analog.md)를 참고하세요.

- [Analog 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_analog.md)

</Question>
</FAQ>

## 더 알아보기

- [Angular 22에서 Intlayer 설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_angular_21.md)
- [Angular 19에서 Intlayer 설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_angular_19.md)
- [i18n 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)
- [컴파일러 방식과 선언형 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/compiler_vs_declarative_i18n.md)
- [ICU 메시지 형식](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/icu_message_format.md)
- [호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)

다른 프레임워크의 같은 비교:

- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/how_to_pick_react_i18n_library.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/how_to_pick_vue_i18n_library.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/how_to_pick_svelte_i18n_library.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/how_to_pick_solid_i18n_library.md)
