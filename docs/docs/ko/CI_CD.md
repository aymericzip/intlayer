---
createdAt: 2025-05-20
updatedAt: 2025-08-13
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
slugs:
  - doc
  - concept
  - ci-cd
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "초기 기록"
---

# CI/CD 파이프라인에서 번역 자동 생성

Intlayer는 콘텐츠 선언 파일에 대한 번역을 자동으로 생성할 수 있도록 합니다. 워크플로우에 따라 이를 달성하는 여러 가지 방법이 있습니다.

## CMS 사용하기

Intlayer를 사용하면 로컬에서는 단일 로케일만 선언하고 모든 번역은 CMS를 통해 원격으로 관리하는 워크플로우를 채택할 수 있습니다. 이를 통해 콘텐츠와 번역이 코드베이스와 완전히 분리되어 콘텐츠 편집자에게 더 많은 유연성을 제공하며, 핫 콘텐츠 리로딩이 가능해져(변경 사항 적용을 위해 애플리케이션을 다시 빌드할 필요 없음) 편리합니다.

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
    dictionaryPriorityStrategy: "distant_first", // 원격 콘텐츠가 우선순위를 가집니다

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

[Husky](https://typicode.github.io/husky/)를 사용하여 로컬 Git 워크플로우에 번역 생성 과정을 통합할 수 있습니다.

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

    applicationContext: "This is a test application", // 일관된 번역 생성을 돕습니다
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # 사전이 최신 상태인지 확인합니다
npx intlayer fill --unpushed --mode fill    # 누락된 내용만 채우며, 기존 내용을 업데이트하지 않습니다
```

> Intlayer CLI 명령어 및 사용법에 대한 자세한 내용은 [CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 참조하세요.

> 저장소에 여러 앱이 있고 각각 별도의 intlayer 인스턴스를 사용하는 경우, `--base-dir` 인수를 다음과 같이 사용할 수 있습니다:

```bash fileName=".husky/pre-push"
# 앱 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# 앱 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## GitHub Actions 사용하기

Intlayer는 사전 내용을 자동으로 채우고 검토할 수 있는 CLI 명령어를 제공합니다. 이는 GitHub Actions를 사용하여 CI/CD 워크플로우에 통합할 수 있습니다.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer 자동 채우기
# 이 워크플로우의 트리거 조건
on:
  pull_request:
    branches:
      - "main"

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
      # OpenAI
      AI_MODEL: openai
      AI_PROVIDER: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}

    steps:
      # 1단계: 저장소에서 최신 코드 가져오기
      - name: ⬇️ 저장소 체크아웃
        uses: actions/checkout@v4
        with:
          persist-credentials: true # PR 생성을 위한 자격 증명 유지
          fetch-depth: 0 # 차이 분석을 위한 전체 git 히스토리 가져오기

      # 2단계: Node.js 환경 설정
      - name: 🟢 Node.js 설정
        uses: actions/setup-node@v4
        with:
          node-version: 20 # 안정성을 위해 Node.js 20 LTS 사용

      # 3단계: 프로젝트 의존성 설치
      - name: 📦 의존성 설치
        run: npm install

      # 4단계: 번역 관리를 위해 Intlayer CLI 전역 설치
      - name: 📦 Intlayer 설치
        run: npm install -g intlayer-cli

      # 5단계: 번역 파일 생성을 위해 Intlayer 프로젝트 빌드
      - name: ⚙️ Intlayer 프로젝트 빌드
        run: npx intlayer build

      # 6단계: AI를 사용하여 누락된 번역 자동 채우기
      - name: 🤖 누락된 번역 자동 채우기
        run: npx intlayer fill --git-diff --mode fill --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY

      # 7단계: 변경 사항이 있는지 확인하고 커밋하기
      - name: � 변경 사항 확인
        id: check-changes
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            echo "has-changes=true" >> $GITHUB_OUTPUT
          else
            echo "has-changes=false" >> $GITHUB_OUTPUT
          fi

      # 8단계: 변경 사항이 있으면 커밋하고 푸시하기
      - name: 📤 변경 사항 커밋 및 푸시
        if: steps.check-changes.outputs.has-changes == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "chore: 누락된 번역 자동 채우기 [skip ci]"
          git push origin HEAD:${{ github.head_ref }}
```

환경 변수를 설정하려면 GitHub → 설정 → Secrets and variables → Actions로 이동하여 비밀을 추가하세요.

> Husky와 마찬가지로, 모노레포의 경우 `--base-dir` 인수를 사용하여 각 앱을 순차적으로 처리할 수 있습니다.

> 기본적으로 `--git-diff` 인수는 기본 브랜치(기본값 `origin/main`)에서 현재 브랜치(기본값: `HEAD`)로 변경된 사전을 필터링합니다.

> Intlayer CLI 명령어 및 사용법에 대한 자세한 내용은 [CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 참조하세요.
