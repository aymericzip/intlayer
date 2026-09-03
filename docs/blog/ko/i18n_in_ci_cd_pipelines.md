---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "품질 저하 없이 CI/CD 파이프라인에서 번역을 자동화하는 방법"
description: i18n을 자동화할 수 있는 3단계 (pre-push, pull request, 런타임). 커버리지를 기반으로 빌드를 제어(gate)하고, 안전하게 자동 채우기를 수행하며, 무한 커밋 루프를 방지하는 방법.
keywords:
  - 번역 자동화 ci
  - i18n ci cd
  - github actions 번역
  - husky pre-push
  - 지속적 현지화
  - 번역 파이프라인
slugs:
  - blog
  - i18n-in-ci-cd-pipelines
author: aymericzip
---

# 품질 저하 없이 CI/CD 파이프라인에서 번역을 자동화하는 방법

수동 번역은 빠른 배포 주기를 따라가지 못합니다. 누군가 금요일에 문자열을 추가하면 다음 스프린트까지 내보내기가 지연되고, 그사이 세 개 이상의 언어가 뒤처집니다. 자동화 자체는 어렵지 않습니다. 하지만 검증되지 않은 기계 번역 결과를 고객에게 무분별하게 노출하지 않으면서 안전하게 자동화하는 방법을 고민해야 합니다.

## 목차

<TOC/>

## 자동화를 위해 기존 코드를 마이그레이션할 필요는 없습니다

아래 파이프라인 구조와 도구는 특정 라이브러리에 종속되지 않습니다. 메시지가 i18next, next-intl, react-intl, vue-i18n 또는 next-translate를 위한 JSON 카탈로그 형태라면, [Sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)이 해당 파일을 제자리에서 직접 읽고 씁니다:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // 또는 next-intl / react-intl용 "icu"
    }),
  ],
};

export default config;
```

기존 애플리케이션의 import문은 그대로 유지됩니다. CI 작업이 기존 카탈로그를 채우고 검증하므로, 리뷰어가 보게 되는 변경 사항은 대규모 코드 전환이 아닌 `locales/fr/checkout.json` 파일의 변경일 뿐입니다. gettext 워크플로를 위한 [Sync PO 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-po.md)과 런타임 API를 유지해 주는 [호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)도 제공됩니다.

## 차단 검사(Gate)와 자동 완성(Fill) 분리하기

서로 다른 두 가지 작업이 자주 혼동되곤 합니다.

**게이트(Gate)**는 실패를 유발하는 검사입니다. 필수 로케일 번역이 누락되었을 때 빌드가 통과되지 못하도록 막는 역할을 하며, 어떤 파일도 수정하지 않습니다.

**필(Fill)**은 변경 작업입니다. 누락된 번역을 생성하고 이를 커밋합니다. 빌드를 실패시키지 않습니다.

Fill만 단독으로 실행하면 아무것도 차단되지 않아 검토되지 않은 AI 번역 결과가 프로덕션에 그대로 배포됩니다. 반대로 Gate만 실행하면 빌드가 빈번히 깨져 사람이 매번 수동으로 해결해야 합니다. 대부분의 팀에서는 두 가지를 서로 다른 트리거에 연결하는 방식을 선택합니다. 즉, Pull Request에서는 Fill을 실행하고, 릴리스 브랜치로 머지할 때 Gate를 적용합니다.

## 자동화를 적용할 수 있는 단계 비교

| 단계          | 트리거   | 적합한 용도                               | 비용                                   |
| :------------ | :------- | :---------------------------------------- | :------------------------------------- |
| Pre-push 훅   | 로컬 Git | 빠른 피드백, CI 실행 시간 소모 없음       | 개발자의 로컬 머신 및 개인 API 키 사용 |
| Pull request  | CI Job   | 머지 전 코드 리뷰, 시크릿의 안전한 중앙화 | CI 실행 시간 및 PR당 AI 모델 호출 비용 |
| 릴리스 브랜치 | CI Job   | 커버리지에 대한 엄격한 차단(Gate)         | 저렴함, AI 모델 호출 없음              |
| 런타임        | CMS      | 빌드 없이 실시간 콘텐츠 변경              | 호스팅 서비스 의존성                   |

## Pre-push: 가장 빠른 피드백 루프

Husky를 사용하면 코드가 로컬 머신을 벗어나기 전에 번역을 채워 넣을 수 있어, 새로운 문자열이 추가된 커밋과 동일한 푸시 내에 번역이 함께 포함됩니다.

```bash fileName=".husky/pre-push"
npx intlayer build
npx intlayer fill --unpushed --mode complete
```

`--unpushed`는 아직 푸시되지 않은 콘텐츠로 작업을 제한하므로 매번 푸시할 때 오랜 시간이 걸리지 않습니다. `--mode complete`는 값이 비어 있는 항목만 채우고 이미 번역된 항목은 덮어쓰지 않으므로 사람이 검토한 번역이 유실되지 않습니다.

모노레포의 경우 각 앱별로 범위를 지정합니다:

```bash fileName=".husky/pre-push"
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

단점도 명확합니다. 모든 개발자가 API 키를 가지고 있어야 하며 비용 부담이 푸시를 수행하는 사람에게 발생합니다. 그렇기 때문에 팀 규모가 커지면 대개 이 작업을 CI로 이전합니다.

## Pull request: 리뷰가 일어나는 곳에서 자동 완성하기

GitHub Actions를 통해 변경된 diff에 대해서만 동일한 작업을 수행합니다:

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  pull_request:
    branches: ["main"]

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      AI_PROVIDER: openai
      AI_MODEL: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npx intlayer build
      - run: npx intlayer fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
      - name: Commit
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .
            git commit -m "chore: auto-fill missing translations [skip ci]"
            git push origin HEAD:${{ github.head_ref }}
          fi
```

여기에는 4가지 필수적인 설정이 있습니다:

- **`fetch-depth: 0`**: `--git-diff`가 작동하기 위해 반드시 필요합니다. Shallow clone은 비교할 베이스가 없어 아무것도 채우지 않고 넘어갑니다.
- **커밋 메시지의 `[skip ci]`**: 워크플로가 무한 재귀 실행되는 것을 막아줍니다. 이 문구가 없으면 커밋이 새 실행을 트리거하고 그 실행이 다시 커밋하여 밤새 CI 크레딧을 낭비하게 됩니다.
- **`cancel-in-progress`가 포함된 `concurrency`**: 두 번의 동시 푸시가 같은 파일을 덮어쓰며 경쟁하는 것을 방지합니다.
- **`--git-diff`**: PR에서 변경된 사항으로만 대상을 좁힙니다. 이를 생략하면 매 실행마다 전체 카탈로그를 다시 번역하게 됩니다.

자동 생성된 번역이 PR 브랜치에 커밋으로 남기 때문에 리뷰어가 diff를 통해 눈으로 확인할 수 있습니다. 이것이 머지 후가 아니라 PR 단계에서 수행하는 핵심 이유입니다.

## 릴리스 브랜치: Gate 단계

Gate는 모델 호출이 필요 없으며 빠르게 실행되어야 합니다.

```yaml fileName=".github/workflows/ci.yml"
- run: npm run test:i18n
```

터미널 출력에만 의존하지 않고 테스트 코드로 커버리지를 직접 단언(assert)합니다:

```ts fileName="i18n.test.ts"
import { listMissingTranslations } from "intlayer/cli";

test("필수 로케일에 누락된 번역이 없다", async () => {
  const result = await listMissingTranslations();
  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }
  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

`npx intlayer content test`는 리포트를 출력하지만 종료 코드 0을 반환하므로 정보 제공용일 뿐 빌드를 막지 못합니다. 로컬에서는 이 CLI를 쓰고, CI에서는 테스트 어설션을 활용하세요. 자세한 내용은 [누락된 번역 감지하기](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/detecting_missing_translations.md)를 참고하세요.

## `requiredLocales`로 지속 가능한 검사 유지하기

18개 언어가 모두 완료되어야만 통과하는 Gate는 가장 느린 언어가 완성될 때까지 모든 릴리스를 막아버려, 결국 한 달도 안 되어 비활성화되고 맙니다.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

서비스하는 모든 로케일을 등록하되, 릴리스를 차단해야 하는 핵심 언어만 `requiredLocales`로 지정하세요. 나머지 언어는 비동기적으로 완성해 나가며 배포 일정을 지연시키지 않습니다.

## 번역 데이터를 저장소에서 완전히 분리하기

또 다른 모델은 코드에는 기본 언어 하나만 선언하고, 나머지는 Live Sync가 지원되는 CMS를 통해 원격으로 관리하는 것입니다. 이렇게 하면 콘텐츠가 바뀌어도 애플리케이션을 다시 빌드할 필요가 없어 콘텐츠 수정 주기와 코드 배포 주기가 완전히 분리됩니다.

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
};

export default config;
```

이 방식은 비개발자가 문구를 직접 관리하는 조직에 잘 맞습니다. 편집의 자율성을 얻는 대신, Git 체크아웃만으로 앱 렌더링 상태를 온전히 파악하기 어려워진다는 트레이드오프가 있습니다. 자세한 내용은 [CMS 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 확인하세요.

`clientSecret`은 서버 측 보안 자격 증명입니다. CI 시크릿이나 서버 환경 변수에서 관리해야 하며 클라이언트 번들에 노출되지 않도록 주의하세요.

## 솔직한 한계점

위의 모든 방법은 번역의 **존재(커버리지)**를 자동화하는 것이지 **품질**을 보장하는 것은 아닙니다. 자동 채우기는 눈에 띄는 빈자리를 눈에 띄지 않는 자리로 바꿉니다. 키에 값이 채워졌으므로 검사는 통과하지만 아무도 그 문장을 읽어보지 않았기 때문입니다.

내부용 도구, 변경 로그, 베타 로케일이라면 이것으로 충분할 수 있습니다. 하지만 가격 정책, 법적 고지, 결제 오류 메시지 등 고객의 결정에 직접적인 영향을 미치는 영역에는 적합하지 않습니다. 이런 중요한 문구는 반드시 사람의 검토를 거치도록 하고, `--mode complete`를 적용하여 검토된 텍스트가 덮어씌워지지 않도록 하세요.

모델에 맥락을 제공하여 일관된 결과를 얻을 수 있도록 설정하세요:

```ts
ai: {
  applicationContext: "B2B 청구 관리 앱. 정중한 어조 사용. 제품명은 절대로 번역하지 말 것.",
}
```

## 흔한 실수들

- **자동 커밋에 `[skip ci]` 누락.** 작업이 무한 루프를 돌며 크레딧을 낭비합니다.
- **`--git-diff` 사용 시 Shallow clone 적용.** 비교 기준이 없어 아무것도 채워지지 않고 오류도 나지 않습니다.
- **매 실행마다 전체 카탈로그 번역.** 비용 절감을 위해 `--git-diff`나 `--unpushed`로 범위를 좁히세요.
- **CLI 리포트를 Gate로 활용.** 항상 종료 코드 0으로 끝나 빌드가 멈추지 않습니다.
- **모든 로케일을 필수(required)로 설정.** 첫 릴리스 지연 발생 시 검사 자체가 제거될 위험이 큽니다.
- **Gate 없는 Fill 전용 작업.** 어떤 빌드도 실패하지 않아 검증되지 않은 기계 번역이 그대로 배포됩니다.
- **저장소에 모델 API 키 노출.** `clientSecret`과 마찬가지로 반드시 CI 시크릿에 보관해야 합니다.

## 더 알아보기

- [CI/CD: Husky, GitHub Actions, CMS를 통한 번역 자동 생성](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/CI_CD.md)
- [콘텐츠 테스트 및 커버리지 기반 빌드 차단](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/testing.md)
- [autoFill: 로케일별 선언 파일 자동 생성](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/autoFill.md)
- [설정 레퍼런스: `locales`, `requiredLocales`, `editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)
- [프레임워크 간 벤치마크 리포트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)
- [i18next 호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/i18next.md)
- [누락된 번역 감지하기](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/detecting_missing_translations.md)
- [깨지기 쉬운 테스트 없이 번역 검증하기](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_testing_strategies.md)
