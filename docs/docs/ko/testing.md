---
createdAt: 2025-03-01
updatedAt: 2025-09-20
title: 콘텐츠 테스트하기
description: Intlayer로 콘텐츠를 테스트하는 방법을 알아보세요.
keywords:
  - 테스트
  - Intlayer
  - 국제화
  - CMS
  - 콘텐츠 관리 시스템
  - 비주얼 에디터
slugs:
  - doc
  - testing
---

# 콘텐츠 테스트하기

이 가이드는 사전이 완전한지 자동으로 확인하고, 배포 전에 누락된 번역을 잡아내며, 앱에서 현지화된 UI를 테스트하는 방법을 보여줍니다.

---

## 테스트할 수 있는 항목

- **누락된 번역**: 필수 로케일이 사전에서 누락된 경우 CI 실패 처리.
- **현지화된 UI 렌더링**: 특정 로케일 제공자와 함께 컴포넌트를 렌더링하고, 표시된 텍스트/속성을 검증.
- **빌드 시 감사**: CLI를 통해 로컬에서 빠른 감사를 실행.

---

## 빠른 시작: CLI를 통한 감사

프로젝트 루트에서 감사를 실행하세요:

```bash
npx intlayer content test
```

유용한 플래그:

- `--env-file [path]`: 파일에서 환경 변수를 로드합니다.
- `-e, --env [name]`: 환경 프로필을 선택합니다.
- `--base-dir [path]`: 해석을 위한 앱 기본 디렉터리를 설정합니다.
- `--verbose`: 자세한 로그를 표시합니다.
- `--prefix [label]`: 로그 라인에 접두사를 붙입니다.

참고: CLI는 상세 보고서를 출력하지만 실패 시 비영(0이 아닌) 종료 코드를 반환하지 않습니다. CI 게이팅을 위해, 아래 단위 테스트를 추가하여 필수 로케일 누락이 0임을 확인하세요.

---

## 프로그래밍 방식 테스트 (Vitest/Jest)

Intlayer CLI API를 사용하여 필수 로케일에 누락된 번역이 없는지 확인하세요.

```ts file=i18n.test.ts
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("번역", () => {
  it("필수 로케일이 누락되지 않음", () => {
    const result = listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      // 테스트가 로컬 또는 CI에서 실패할 때 도움이 됨
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Jest 동등 코드:

```ts file=i18n.test.ts
import { listMissingTranslations } from "intlayer/cli";

test("필수 로케일이 누락되지 않음", () => {
  const result = listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    // eslint-disable-next-line no-console
    console.log(result.missingTranslations);
  }

  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

작동 방식:

- Intlayer는 구성(locales, requiredLocales)과 선언된 사전을 읽고 다음을 보고합니다:
  - `missingTranslations`: 키별로 어떤 로케일이 누락되었고 어떤 파일에서 누락되었는지.
  - `missingLocales`: 누락된 모든 로케일의 합집합.
  - `missingRequiredLocales`: `requiredLocales`로 제한된 부분집합 (또는 `requiredLocales`가 설정되지 않은 경우 모든 로케일).

---

## 지역화된 UI 테스트 (React / Next.js)

Intlayer 프로바이더 하에 컴포넌트를 렌더링하고 화면에 보이는 내용을 검증합니다.

React 예제 (Testing Library):

```tsx
import { IntlayerProvider } from "react-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("renders localized title in English", () => {
  render(
    <IntlayerProvider locale="en-US">
      <MyComponent />
    </IntlayerProvider>
  );

  expect(screen.getByText("Expected English title")).toBeInTheDocument();
});
```

Next.js (앱 라우터) 예제: 프레임워크 래퍼 사용:

```tsx
import { IntlayerClientProvider } from "next-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyPage } from "./MyPage";

test("프랑스어로 현지화된 제목을 렌더링합니다", () => {
  render(
    <IntlayerClientProvider locale="fr-FR">
      <MyPage />
    </IntlayerClientProvider>
  );
  expect(
    screen.getByRole("heading", { name: "Titre attendu" })
  ).toBeInTheDocument();
});
```

팁:

- 속성(예: `aria-label`)에 대한 원시 문자열 값이 필요할 때는 React에서 `useIntlayer`가 반환하는 `.value` 필드에 접근하세요.
- 단위 테스트 및 정리를 쉽게 하기 위해 사전을 컴포넌트와 함께 배치하세요.

---

## 지속적 통합

필수 번역이 누락되었을 때 빌드를 실패하게 하는 테스트를 추가하세요.

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "vitest run -c"
  }
}
```

GitHub Actions 예제:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:i18n
```

선택 사항: 테스트와 함께 사람이 읽기 쉬운 요약을 위해 CLI 감사를 실행하세요:

```bash
npx intlayer content test --verbose
```

---

## 문제 해결

- Intlayer 구성에 `locales` 및 (선택적으로) `requiredLocales`가 정의되어 있는지 확인하세요.
- 앱이 동적 또는 원격 사전을 사용하는 경우, 사전이 사용 가능한 환경에서 테스트를 실행하세요.
- 혼합 모노레포의 경우, CLI가 올바른 애플리케이션 루트를 가리키도록 `--base-dir`을 사용하세요.

---

## 문서 이력

| 버전  | 날짜       | 변경 사항   |
| ----- | ---------- | ----------- |
| 6.0.0 | 2025-09-20 | 테스트 도입 |
