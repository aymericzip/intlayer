---
docName: ci_cd
url: https://intlayer.org/doc/concept/ci-cd
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/CI_CD.md
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: CI/CD 통합
description: 자동화된 콘텐츠 관리 및 배포를 위해 Intlayer를 CI/CD 파이프라인에 통합하는 방법을 알아보세요.
keywords:
  - CI/CD
  - 지속적 통합
  - 지속적 배포
  - 자동화
  - 국제화
  - 문서화
  - Intlayer
---

# CI/CD 파이프라인에서 번역 자동 생성

Intlayer는 콘텐츠 선언 파일에 대한 번역을 자동으로 생성할 수 있도록 합니다. 워크플로우에 따라 이를 달성하는 여러 가지 방법이 있습니다.

## CMS 사용하기

Intlayer를 사용하면 로컬에서는 단일 로케일만 선언하고 모든 번역은 CMS를 통해 원격으로 관리하는 워크플로우를 채택할 수 있습니다. 이를 통해 콘텐츠와 번역이 코드베이스와 완전히 분리되어 콘텐츠 편집자에게 더 많은 유연성을 제공하며, 변경 사항을 적용하기 위해 애플리케이션을 다시 빌드할 필요 없이 핫 콘텐츠 리로딩이 가능합니다.

### 예제 구성

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // 선택적 로케일은 원격으로 관리됩니다
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // 원격 콘텐츠가 우선권을 가짐

    applicationURL: process.env.APPLICATION_URL, // CMS에서 사용하는 애플리케이션 URL

    clientId: process.env.INTLAYER_CLIENT_ID, // CMS 자격 증명
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "This is a test application", // 일관된 번역 생성을 돕습니다
  },
};

export default config;
```

CMS에 대해 더 알아보려면 [공식 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 참조하세요.

## Husky 사용하기

[Husky](https://typicode.github.io/husky/)를 사용하여 로컬 Git 워크플로우에 번역 생성 기능을 통합할 수 있습니다.

### 예제 구성

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // 선택적 로케일은 원격에서 처리됩니다
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // 자신의 API 키를 사용하세요

    applicationContext: "This is a test application", // 일관된 번역 생성을 보장하는 데 도움을 줍니다
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # 사전이 최신 상태인지 확인하기 위해
npx intlayer fill --unpushed --mode fill    # 누락된 내용만 채우며, 기존 내용을 업데이트하지 않습니다.
```

> Intlayer CLI 명령어 및 사용법에 대한 자세한 내용은 [CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)를 참조하세요.

> 저장소에 여러 앱이 있고 각각 별도의 intlayer 인스턴스를 사용하는 경우, 다음과 같이 `--base-dir` 인수를 사용할 수 있습니다:

```bash fileName=".husky/pre-push"
# 앱 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# 앱 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## GitHub Actions 사용하기

Intlayer는 사전 내용을 자동 채우기 및 검토할 수 있는 CLI 명령어를 제공합니다. 이는 GitHub Actions를 사용하여 CI/CD 워크플로우에 통합할 수 있습니다.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer 자동 채우기
on:
  push:
    branches: [ main ]
    paths:
      - 'src/**'
  pull_request:
    branches: [ main ]
    paths:
      - 'src/**'
  workflow_dispatch: {}

concurrency:
  group: 'autofill-${{ github.ref }}'
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      INTLAYER_CLIENT_ID: ${{ secrets.INTLAYER_CLIENT_ID }}
      INTLAYER_CLIENT_SECRET: ${{ secrets.INTLAYER_CLIENT_SECRET }}
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

    steps:
      - name: ⬇️ 저장소 체크아웃
        uses: actions/checkout@v3
        with:
          persist-credentials: true

      - name: 🟢 Node.js 설정
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 의존성 설치
        run: npm ci

      - name: ⚙️ Intlayer 프로젝트 빌드
        run: npx intlayer build

      - name: 🤖 누락된 번역 자동 채우기
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 번역 PR 생성 또는 업데이트
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: auto-fill missing translations [skip ci]
          branch: auto-translations
          title: chore: update missing translations
          labels: translation, automated
```

> Husky와 마찬가지로, 모노레포의 경우 `--base-dir` 인수를 사용하여 각 앱을 순차적으로 처리할 수 있습니다.

> 기본적으로 `--git-diff` 인수는 기본 브랜치(기본값 `origin/main`)에서 현재 브랜치(기본값 `HEAD`)까지의 변경 사항을 포함하는 사전만 필터링합니다.

> Intlayer CLI 명령어 및 사용법에 대한 자세한 내용은 [CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)를 참조하세요.

## 문서 이력

- 5.5.10 - 2025-06-29: 이력 초기화
