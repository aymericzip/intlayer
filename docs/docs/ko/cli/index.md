---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: CLI - 다국어 웹사이트를 위한 모든 Intlayer CLI 명령어
description: Intlayer CLI를 사용하여 다국어 웹사이트를 관리하는 방법을 알아보세요. 이 온라인 문서의 단계를 따라 몇 분 만에 프로젝트를 설정하세요.
keywords:
  - CLI
  - 명령어 인터페이스
  - 국제화
  - 문서
  - Intlayer
  - Next.js
  - JavaScript
  - React
slug:
  - doc
  - concept
  - cli
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "standalone 명령어 추가"
  - version: 7.5.11
    date: 2026-01-06
    changes: "CI 명령어 추가"
  - version: 7.5.11
    date: 2026-01-06
    changes: "프로젝트 목록(list projects) 명령어 추가"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init 명령어 추가"
  - version: 7.2.3
    date: 2025-11-22
    changes: "extract 명령어 추가"
  - version: 7.1.0
    date: 2025-11-05
    changes: "translate 명령어에 skipIfExists 옵션 추가"
  - version: 6.1.4
    date: 2025-01-27
    changes: "CLI 인수 및 명령어 별칭 추가"
  - version: 6.1.3
    date: 2025-10-05
    changes: "명령어에 build 옵션 추가"
  - version: 6.1.2
    date: 2025-09-26
    changes: "version 명령어 추가"
  - version: 6.1.0
    date: 2025-09-26
    changes: "CLI를 통해 verbose 옵션 기본값을 true로 설정"
  - version: 6.1.0
    date: 2025-09-23
    changes: "watch 명령어 및 with 옵션 추가"
  - version: 6.0.1
    date: 2025-09-23
    changes: "editor 명령어 추가"
  - version: 6.0.0
    date: 2025-09-17
    changes: "content test 및 list 명령어 추가"
  - version: 5.5.11
    date: 2025-07-11
    changes: "CLI 명령어 매개변수 문서 업데이트"
  - version: 5.5.10
    date: 2025-06-29
    changes: "기록 초기화"
---

# Intlayer CLI - 다국어 웹사이트를 위한 모든 Intlayer CLI 명령어

---

## 목차

<TOC/>

---

## 패키지 설치

npm을 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> `intlayer` 패키지가 이미 설치되어 있다면 CLI가 자동으로 설치됩니다. 이 단계는 건너뛸 수 있습니다.

## intlayer-cli 패키지

`intlayer-cli` 패키지는 [Intlayer 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)을 딕셔너리로 트랜스파일하는 데 사용됩니다.

이 패키지는 `src/**/*.content.{ts|js|mjs|cjs|json}`과 같은 모든 Intlayer 파일을 트랜스파일합니다. [Intlayer 선언 파일 선언 방법 알아보기](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Intlayer 딕셔너리를 해석하려면 [react-intlayer](https://www.npmjs.com/package/react-intlayer) 또는 [next-intlayer](https://www.npmjs.com/package/next-intlayer)와 같은 해석기를 사용할 수 있습니다.

## 설정 파일 지원

Intlayer는 여러 설정 파일 형식을 허용합니다:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

사용 가능한 언어 또는 기타 매개변수를 구성하는 방법은 [여기에서 구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

## Intlayer 명령어 실행

### 인증

- **[로그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/login.md)** - Intlayer CMS에 인증하고 액세스 자격 증명을 가져옵니다.

### 핵심 명령어

- **[딕셔너리 빌드 (Build)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/build.md)** - 콘텐츠 선언 파일에서 딕셔너리를 빌드합니다.
- **[딕셔너리 감시 (Watch)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/watch.md)** - 변경 사항을 감시하고 딕셔너리를 자동으로 빌드합니다.
- **[독립 실행형 번들 생성 (Standalone)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/standalone.md)** - Intlayer 및 지정된 패키지를 포함하는 독립 실행형 JavaScript 번들을 생성합니다.
- **[CLI 버전 확인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/version.md)** - 설치된 Intlayer CLI 버전을 확인합니다.
- **[프로젝트 목록 (List Projects)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/list_projects.md)** - 디렉토리 또는 git 저장소의 모든 Intlayer 프로젝트를 나열합니다.

### 딕셔너리 관리

- **[딕셔너리 푸시 (Push)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/push.md)** - 딕셔너리를 Intlayer 에디터 및 CMS로 전송합니다.
- **[딕셔너리 풀 (Pull)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/pull.md)** - Intlayer 에디터 및 CMS에서 딕셔너리를 가져옵니다.
- **[딕셔너리 채우기 (Fill)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md)** - AI를 사용하여 딕셔너리를 채우고 감사하며 번역합니다.
- **[누락된 번역 테스트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/test.md)** - 누락된 번역을 테스트하고 식별합니다.
- **[콘텐츠 선언 파일 목록](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/list.md)** - 프로젝트의 모든 콘텐츠 선언 파일을 나열합니다.

### 컴포넌트 관리

- **[문자열 추출 (Extract)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)** - 컴포넌트 근처의 .content 파일로 컴포넌트에서 문자열을 추출합니다.

### 구성

- **[Intlayer 초기화 (Init)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/init.md)** - 자동 구성을 사용하여 프로젝트에 Intlayer를 설정합니다.
- **[구성 관리](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/configuration.md)** - Intlayer 구성을 가져오고 CMS로 전송합니다.

### 문서 관리

- **[문서 번역](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/doc-translate.md)** - AI를 사용하여 문서 파일을 자동으로 번역합니다.
- **[문서 검토](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/doc-review.md)** - 품질과 일관성을 위해 문서 파일을 검토합니다.

### 에디터 및 라이브 동기화 (Live Sync)

- **[에디터 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/editor.md)** - Intlayer 에디터 명령어를 사용합니다.
- **[라이브 동기화 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/live.md)** - 라이브 동기화를 사용하여 런타임에 CMS의 콘텐츠 변경 사항을 반영합니다.

### CI/CD 및 자동화

- **[CI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/ci.md)** - CI/CD 파이프라인을 위해 자동으로 주입된 자격 증명으로 Intlayer 명령어를 실행합니다.

### 개발 도구

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/sdk.md)** - 자체 코드에서 Intlayer CLI SDK를 사용합니다.
- **[Intlayer 명령어 디버그](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/debug.md)** - Intlayer CLI 문제를 디버그하고 해결합니다.

## `package.json`에서 Intlayer 명령어 사용하기

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **참고**: 다음과 같은 짧은 별칭을 사용할 수도 있습니다:
>
> - `npx intlayer list`: `npx intlayer content list` 대신 사용
> - `npx intlayer test`: `npx intlayer content test` 대신 사용
> - `npx intlayer projects-list` 또는 `npx intlayer pl`: `npx intlayer projects list` 대신 사용
