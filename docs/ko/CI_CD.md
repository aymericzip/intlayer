# CI/CD 파이프라인에서 번역 자동 생성

Intlayer는 콘텐츠 선언 파일에 대한 번역을 자동으로 생성할 수 있습니다. 워크플로우에 따라 이를 달성하는 여러 가지 방법이 있습니다.

## CMS 사용

Intlayer를 사용하면 로컬에서 단일 로케일만 선언하고, 모든 번역은 CMS를 통해 원격으로 관리하는 워크플로우를 채택할 수 있습니다. 이를 통해 콘텐츠와 번역이 코드베이스에서 완전히 분리되어 콘텐츠 편집자에게 더 많은 유연성을 제공하며, 애플리케이션을 다시 빌드하지 않고도 변경 사항을 적용할 수 있는 핫 콘텐츠 리로딩을 가능하게 합니다.

### 예제 구성

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // 선택적 로케일은 원격으로 관리됩니다.
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // 원격 콘텐츠가 우선 순위를 가집니다.

    applicationURL: process.env.APPLICATION_URL, // CMS에서 사용하는 애플리케이션 URL

    clientId: process.env.INTLAYER_CLIENT_ID, // CMS 자격 증명
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "This is a test application", // 일관된 번역 생성을 보장하는 데 도움을 줍니다.
  },
};

export default config;
```

CMS에 대한 자세한 내용은 [공식 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_CMS.md)를 참조하세요.

## Husky 사용

[Husky](https://typicode.github.io/husky/)를 사용하여 로컬 Git 워크플로우에 번역 생성을 통합할 수 있습니다.

### 예제 구성

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // 선택적 로케일은 원격으로 처리됩니다.
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // 자신의 API 키를 사용하세요.

    applicationContext: "This is a test application", // 일관된 번역 생성을 보장하는 데 도움을 줍니다.
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # 사전이 최신 상태인지 확인
npx intlayer fill --unpushed --mode fill    # 누락된 콘텐츠만 채우고, 기존 콘텐츠는 업데이트하지 않음
```

> Intlayer CLI 명령과 사용법에 대한 자세한 내용은 [CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)를 참조하세요.

> 저장소에 여러 앱이 있고 각각 별도의 intlayer 인스턴스를 사용하는 경우, 다음과 같이 `--base-dir` 인수를 사용할 수 있습니다:

```bash fileName=".husky/pre-push"
# 앱 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# 앱 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## GitHub Actions 사용

Intlayer는 사전 채우기 및 사전 콘텐츠 검토를 위한 CLI 명령을 제공합니다. 이를 GitHub Actions를 사용하여 CI/CD 워크플로우에 통합할 수 있습니다.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
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
          commit-message: chore: 누락된 번역 자동 채우기 [skip ci]
          branch: auto-translations
          title: chore: 누락된 번역 업데이트
          labels: translation, automated
```

> Husky와 마찬가지로 모노레포의 경우 `--base-dir` 인수를 사용하여 각 앱을 순차적으로 처리할 수 있습니다.

> 기본적으로 `--git-diff` 인수는 기본(기본값 `origin/main`)에서 현재 브랜치(기본값: `HEAD`)까지의 변경 사항이 포함된 사전을 필터링합니다.

> Intlayer CLI 명령과 사용법에 대한 자세한 내용은 [CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)를 참조하세요.
