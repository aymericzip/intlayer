---
createdAt: 2026-10-03
updatedAt: 2026-10-03
priority: 8
title: ICU MessageFormat이 JavaScript에 맞지 않는 이유
description: "ICU MessageFormat은 Java와 C++을 위해 설계되었습니다. 브라우저에서 완전한 지원을 제공하려면 약 10KB의 파서 코드가 필요합니다. 이러한 비용이 발생하는 이유와 대안을 알아봅니다."
keywords:
  - icu message format
  - icu messageformat
  - icu messageformat javascript
  - icu 번들 크기
  - bundle size
  - intl-messageformat
  - next-intl precompile
  - i18n 복수형
  - Intl.PluralRules
  - Blog
slugs:
  - blog
  - why-icu-is-not-made-for-js
author: aymericzip
---

# ICU MessageFormat이 JavaScript에 맞지 않는 이유

ICU MessageFormat은 훌륭한 표준입니다. 완결성을 갖추고 있으며 번역가들에게 친숙하고, 대부분의 번역 관리 시스템(TMS)에서 지원합니다. 문제는 이 포맷이 고안된 실행 환경(runtime)에 있습니다. ICU는 C++과 Java에서 유래했는데, 이들 환경에서는 완전한 메시지 파서와 포매터가 전체 프로그램 크기 대비 거의 부담이 되지 않습니다. 하지만 브라우저 번들에서는 사용자가 페이지를 로드할 때마다 이 비용을 그대로 지불해야 합니다.

이 글에서는 ICU의 기원과 복수형 처리에 있어 문법이 무거워지는 이유, 그리고 완전한 호환성을 유지하는 것이 JavaScript i18n 라이브러리를 무겁게 만드는 원인을 살펴봅니다. 문법 자체를 확인해야 한다면 [ICU Message Format 레퍼런스](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/icu_message_format.md)를 먼저 확인해 보세요.

- [ICU Message Format 레퍼런스](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/icu_message_format.md)

<TOC/>

## IBM에서 유니코드 컨소시엄까지

ICU는 _International Components for Unicode_의 약자입니다. 그 메시지 문법은 Java에서 출발했습니다. Apple과 IBM의 합작 회사였던 Taligent는 JDK 1.1(1997)의 국제화 클래스들을 작성했으며, 여기에는 `java.text.MessageFormat`이 포함되어 있었습니다. IBM은 이를 ICU4J로 지속해서 발전시켰고, C/C++로 포팅한 ICU4C를 1999년에 오픈소스로 공개했습니다. 2016년 ICU는 기반 로케일 데이터를 관리하는 CLDR과 함께 유니코드 컨소시엄(Unicode Consortium) 산하로 이관되었습니다.

### 초기 사용 목적

주요 대상은 서버 및 데스크톱 소프트웨어였습니다. Java 엔터프라이즈 애플리케이션, IBM 제품군, 그리고 훗날의 운영체제 등이 여기에 해당합니다. 메시지는 `ResourceBundle`을 통해 로드되는 Java `.properties` 파일이나 C/C++용 ICU 전용 리소스 번들 형식에 저장되었습니다.

```properties fileName="messages_fr.properties"
inbox.unread={count, plural, one {# message non lu} other {# messages non lus}}
```

```java
String pattern = bundle.getString("inbox.unread");
String text = new MessageFormat(pattern, Locale.FRENCH)
    .format(Map.of("count", 5)); // "5 messages non lus"
```

초기 JDK 버전에는 `plural`이 없었습니다. 숫자 범위를 사용하는 `choice`(`{0,choice,0#no files|1#one file|1<{0} files}`)를 사용했는데, 이는 영어처럼 복수형을 처리하는 언어에만 들어맞았습니다. ICU는 2008년(ICU 4.0)에 CLDR 규칙을 기반으로 한 `plural`을 도입했고, 2010년(ICU 4.4)에 `select`를 추가했습니다.

### `.po`와의 차이점

ICU는 종종 gettext와 혼동되지만 둘은 완전히 다른 계보를 따릅니다. `.po` 파일은 GNU gettext(C, Linux, 이후 PHP 및 Python)에서 유래했습니다. `.po` 항목은 단순한 `msgid` / `msgstr` 쌍을 가지며, 복수형은 파일 헤더의 C 표현식(`Plural-Forms: nplurals=2; plural=(n > 1);`)을 통해 결정됩니다. 메시지 문자열 내부에는 분기 로직이 없습니다. 반면 ICU는 분기 로직을 문자열 자체에 내장하므로, 단일 메시지 안에서 `plural`, `select`, 숫자 포맷팅을 자유롭게 결합할 수 있습니다.

### 오늘날 ICU가 실행되는 위치

ICU4C는 Android, iOS, macOS, Windows, Node.js, 그리고 Chrome과 Firefox의 JavaScript 엔진에 기본 탑재되어 있습니다. 브라우저의 표준 `Intl` API는 대규모로 이를 기반 삼아 동작합니다. 즉, 브라우저는 이미 ICU의 복수형 규칙과 숫자, 날짜 포맷 기능을 내장하고 있습니다. 브라우저에 없는 것은 메시지 파서뿐입니다. `Intl.MessageFormat`은 아직 TC39 초기 제안 단계에 머물러 있으며, 새로운 MessageFormat 2 문법을 바탕으로 설계되어 ICU MessageFormat 1과는 호환되지 않습니다.

이러한 역사적 배경은 설계상의 결정들을 명확히 설명해 줍니다.

- **서버 및 데스크톱 런타임을 지향합니다.** 런타임에 문자열 메시지를 파싱하는 비용이 거의 없으며, 라이브러리는 시스템에 한 번 설치될 뿐 방문자마다 네트워크로 다운로드하지 않습니다.
- **문자열 내부의 DSL 구조입니다.** 조건 분기, 숫자 서식, 날짜, 중첩 구조가 모두 하나의 문법 안에 있어 번역가가 코드를 건드리지 않고 수정할 수 있습니다.
- **철저한 완결성을 추구합니다.** 번역가가 필요로 할 수 있는 모든 문법적 케이스에 대해 전용 연산자를 지원합니다.

이 중 어느 것도 잘못된 설계가 아닙니다. 단지 브라우저라는 특수한 런타임을 염두에 두지 않았을 뿐입니다.

## 복수형 문법의 장황함

ICU에서 가장 흔하게 쓰이는 구문은 동시에 가장 번잡한 구문이기도 합니다. 0개의 케이스를 포함하는 카운트 표현은 다음과 같습니다.

```text
{count, plural,
  =0 {No unread messages}
  one {# unread message}
  other {# unread messages}
}
```

인자 이름, `plural` 키워드, 각 분기별 라벨, 중첩된 중괄호, 그리고 복수형 블록 내부에서만 동작하는 특수 토큰 `#`이 사용됩니다. 여기에 주어의 성별(gender)까지 추가되면 중첩은 더욱 깊어집니다.

```text
{gender, select,
  female {{count, plural,
    one {She has # unread message}
    other {She has # unread messages}
  }}
  male {{count, plural,
    one {He has # unread message}
    other {He has # unread messages}
  }}
  other {{count, plural,
    one {They have # unread message}
    other {They have # unread messages}
  }}
}
```

총 15줄 중 9줄이 단순 문법 구조를 위해 소비됩니다. 폴란드어의 경우 이 세 가지 성별 각각에 대해 4개의 복수형 분기가 필요하므로, 번역 문자열은 중괄호가 빽빽한 블록이 되며 닫는 괄호 하나만 빠져도 전체 메시지가 깨집니다. 이는 흔히 런타임에서야 발견되곤 합니다.

JavaScript 환경에서는 동일한 구조를 순수한 데이터로 표현할 수 있습니다. 키가 복수형 카테고리에 매핑된 객체 형태로 작성하면 타입 시스템과 에디터의 검증을 즉시 받을 수 있으며, 파일과 결과 값 사이에 별도의 파서가 개입할 필요가 없습니다.

## 완결성이 수반하는 비용

ICU는 매우 광범위한 기능을 포괄합니다.

- 정확한 일치(`=0`) 및 오프셋(`offset:`)을 지원하는 `plural`
- 고유한 CLDR 서수 테이블을 갖춘 `selectordinal`
- 깊이에 제한이 없는 `select` 중첩
- 레거시 스타일(`number, currency`) 및 스켈레톤(`::currency/EUR compact-short`) 형태의 `number`, `date`, `time` 인자
- 이스케이프 및 따옴표 규칙(`'{'`, `''`)
- 일부 구현체에서 지원하는 리치 텍스트 태그(`<b>…</b>`)

ICU와 1:1 호환을 제공하려는 라이브러리는 빌드 시점에 메시지가 어떤 기능을 사용할지 알 수 없으므로 이 모든 기능을 빠짐없이 번들에 포함해야 합니다. 이는 실제로 다음을 의미합니다.

1. 문자열을 AST로 변환하고 잘못된 중괄호 오류를 처리하는 **파서**
2. 숫자와 날짜의 `::` 문법을 해석하는 독립적인 소형 언어 파서인 **스켈레톤 파서**
3. AST를 순회하며 각 노드를 `Intl.PluralRules`, `Intl.NumberFormat`, `Intl.DateTimeFormat`에 연결하는 **포매터**

세 번째 요소는 매우 가볍습니다. 최신 JavaScript 환경의 `Intl` 객체에 이미 CLDR 로직이 구현되어 있기 때문입니다. 반면 앞선 두 요소는 오직 텍스트 문법을 해석하기 위해 존재합니다. `react-intl`과 `next-intl`의 기반인 FormatJS의 `intl-messageformat`의 경우, 프로젝트 고유 메시지가 전송되기도 전에 **약 10KB의 압축된 JavaScript 코드**가 모든 방문자에게 다운로드됩니다.

대부분의 웹 애플리케이션은 `{name}` 치환과 소수의 `plural` 블록 정도만 사용합니다. 그럼에도 런타임에 파싱되는 문자열 구조 탓에 번들러가 사용되지 않는 코드를 판별하여 제거할 수 없으므로, 스켈레톤, 서수, 오프셋 파서까지 통째로 내려받게 됩니다.

## next-intl도 마주한 같은 문제

이는 이론적인 우려에 그치지 않습니다. 가장 널리 사용되는 ICU 기반 라이브러리 중 하나인 `next-intl` 역시 동일한 결론에 도달했습니다. 4.8 버전(2026년 1월)에서는 빌드 시점에 ICU 메시지를 분석하여 압축된 AST로 변환하고 런타임 파서를 가벼운 평가기(evaluator)로 교체하는 실험적 `precompile` 옵션을 도입했습니다. 해당 프로젝트에서는 이 플래그를 활성화함으로써 **약 9KB의 압축된 JavaScript 코드를 절감**했다고 보고했습니다.

하지만 이러한 절충안은 해당 접근법의 한계 또한 드러냅니다. 사전 컴파일을 적용하면 런타임에 원본 ICU 문자열이 더 이상 존재하지 않으므로 `t.raw`를 사용할 수 없게 됩니다. 브라우저에서 파싱을 중단하는 순간, 실제로 전송되는 것은 더 이상 진정한 ICU가 아닙니다. 이미 컴파일된 표현형을 전송하는 것이며, 문자열 문법은 작성 시점에만 쓰이는 포맷으로 전락합니다.

그렇다면 자연스럽게 의문이 생깁니다. 브라우저가 직접 읽지도 않는 문자열 문법을 개발자와 번역가가 굳이 복잡하게 작성해야 할 이유가 있을까요?

## JavaScript 네이티브 접근 방식

JavaScript는 이미 까다로운 문제들을 네이티브하게 해결해 두었습니다. `Intl.PluralRules`는 폴란드어에 4개의 기수 카테고리가 있고 영어에 4개의 서수 카테고리가 있다는 것을 정확히 알고 있습니다. `Intl.NumberFormat`과 `Intl.DateTimeFormat`은 통화, 단위, 축약 표기, 달력 체계를 완벽히 처리합니다. 남은 작업은 적절한 분기를 선택하고 값을 대입하는 것뿐이며, 구조가 문자열이 아닌 데이터로 표현된다면 단 몇 줄의 코드로 해결됩니다.

이것이 바로 Intlayer가 채택한 모델입니다. 분기 처리는 타입 안전성이 보장된 콘텐츠 선언 내부의 함수로 구현되며, 각 로케일은 해당 언어의 문법에 필요한 카테고리만 명시합니다.

```typescript fileName="**/*.content.ts"
import { gender, plural, t, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox",
  content: {
    unread: t({
      ko: plural({
        other: "{{count}}개의 읽지 않은 메시지",
      }),
      en: plural({
        one: "{{count}} unread message",
        other: "{{count}} unread messages",
      }),
      pl: plural({
        one: "{{count}} nieprzeczytana wiadomość",
        few: "{{count}} nieprzeczytane wiadomości",
        many: "{{count}} nieprzeczytanych wiadomości",
        other: "{{count}} nieprzeczytanej wiadomości",
      }),
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx"
const { unread } = useIntlayer("inbox");

unread(5); // 폴란드어 로케일 → "5 nieprzeczytanych wiadomości"
```

ICU와 비교했을 때 달라지는 점:

- **번들에 파서가 포함되지 않습니다.** 브라우저에 도달할 때 구조는 이미 완성된 JavaScript 객체입니다. `plural` 함수는 브라우저 내장 `Intl.PluralRules`를 사용해 키를 선택합니다.
- **오류를 빌드 시점에 발견합니다.** 분기 누락이나 키 오타는 TypeScript 컴파일 오류로 즉시 드러나므로 프로덕션 배포 후 장애가 발생하는 것을 방지합니다.
- **포맷팅이 메시지 외부로 분리됩니다.** 숫자, 날짜, 통화는 `Intl`을 직접 감싸는 [포매터 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/formatters.md)을 거치므로 스켈레톤 파서가 필요 없습니다.
- **사용하지 않는 기능은 번들 크기를 차지하지 않습니다.** 메시지에서 `gender`를 사용하지 않으면 번들러가 트리 셰이킹을 통해 완전히 제거합니다.

- [포매터 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/formatters.md)

물론 고려해야 할 점도 있습니다. 빌드 단계가 필수적이고, 콘텐츠 파일이 단순 텍스트가 아닌 코드 형태이며, ICU 문자열만을 기대하는 일부 레거시 TMS 도구는 TypeScript 선언 파일을 직접 해석하지 못할 수 있습니다.

## ICU가 여전히 유효한 선택인 경우

다음과 같은 상황에서는 여전히 ICU가 더 적합할 수 있습니다.

- **번역 파이프라인이 ICU 중심으로 완전히 구축된 경우.** 많은 TMS 도구가 ICU 문자열의 가져오기/내보내기를 지원하며 번역가들도 해당 문법에 익숙합니다.
- **메시지를 여러 플랫폼에서 공유하는 경우.** 단일 번역 카탈로그로 iOS 앱, Android 앱, 웹 애플리케이션을 동시에 지원해야 한다면 표준화된 단일 형식을 유지하는 것이 유리합니다.
- **이미 대규모 ICU 메시지 자산을 보유하고 있는 경우.** 수천 개의 메시지를 일일이 재작성하는 것은 그 자체만으로 비용 효율적이지 않을 수 있습니다.

마지막 상황에서도 전체 재작성과 무거운 런타임 파서 유지 중 하나를 양자택일할 필요는 없습니다. Intlayer의 [react-intl 호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/react-intl.md)는 기존 ICU 문자열(`plural`, `select`, `selectordinal`, `#`, 레거시 `number` / `date` / `time`)을 그대로 해석할 수 있으므로, 기존 메시지가 필요한 영역에만 ICU 비용을 한정하면서 점진적으로 마이그레이션할 수 있습니다.

- [react-intl 호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/react-intl.md)

## 결론

ICU MessageFormat은 의미 있는 문제를 해결했습니다. 문법 규칙 처리는 애플리케이션 코드의 `if (count === 1)`이 아니라 번역가의 영역이어야 한다는 점입니다. 문자열 DSL 파싱 비용이 문제 되지 않는 환경에서는 훌륭한 해결책이었습니다. 하지만 웹 브라우저 환경에서 완전한 호환성을 지원하려면 대부분의 프로젝트가 사용하지도 않을 파서 코드를 번들에 실어 보내야 하며, 이 때문에 ICU 기반 라이브러리들조차 사전 컴파일 기법을 도입하고 있습니다.

JavaScript는 이미 `Intl` 객체를 통해 CLDR 규칙을 충실히 제공하고 있습니다. 현대적인 i18n 포맷에 필요한 것은 조건 분기 구조뿐이며, 이는 타입이 지정된 데이터 형태로 훨씬 우아하게 표현될 수 있습니다.

## 더 알아보기

- [ICU Message Format: 문법, 복수형 및 select](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/icu_message_format.md)
- [Intlayer의 복수형 콘텐츠](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/plurial.md)
- [select 기반 조건부 콘텐츠](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/select.md)
- [i18n 라이브러리 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)
- [next-intl은 구식인가요?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/is_next-intl_outdated.md)
