---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI
description: Intlayer CLI를 사용하여 다국어 웹사이트를 관리하는 방법을 알아보세요. 이 온라인 문서의 단계를 따라 몇 분 만에 프로젝트를 설정할 수 있습니다.
keywords:
  - CLI
  - 명령줄 인터페이스
  - 국제화
  - 문서
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 7.2.3
    date: 2025-11-22
    changes: transform 명령어 추가
  - version: 7.1.0
    date: 2025-11-05
    changes: translate 명령어에 skipIfExists 옵션 추가
  - version: 6.1.4
    date: 2025-01-27
    changes: CLI 인수 및 명령어에 별칭 추가
  - version: 6.1.3
    date: 2025-10-05
    changes: 명령어에 build 옵션 추가
  - version: 6.1.2
  date: 2025-09-26
  changes: version 명령어 추가
- version: 6.1.0
  date: 2025-09-26
  changes: CLI를 사용하여 verbose 옵션의 기본값을 true로 설정
- version: 6.1.0
  date: 2025-09-23
  changes: watch 명령어 및 with 옵션 추가
- version: 6.0.1
  date: 2025-09-23
  changes: editor 명령어 추가
- version: 6.0.0
  date: 2025-09-17
  changes: content test 및 list 명령어 추가
- version: 5.5.11
  date: 2025-07-11
  changes: CLI 명령어 매개변수 문서 업데이트
- version: 5.5.10
  date: 2025-06-29
  changes: 히스토리 초기화
---

# Intlayer CLI

---

## 목차

<TOC/>

---

## 패키지 설치

npm을 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> `intlayer` 패키지가 이미 설치되어 있다면, CLI는 자동으로 설치됩니다. 이 단계는 건너뛸 수 있습니다.

## intlayer-cli 패키지

`intlayer-cli` 패키지는 여러분의 [intlayer 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)을 사전(dictionaries)으로 변환하기 위한 도구입니다.

이 패키지는 `src/**/*.content.{ts|js|mjs|cjs|json}`와 같은 모든 intlayer 파일을 변환합니다. [Intlayer 선언 파일을 선언하는 방법을 확인하세요](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

intlayer 사전을 해석하려면 [react-intlayer](https://www.npmjs.com/package/react-intlayer) 또는 [next-intlayer](https://www.npmjs.com/package/next-intlayer)와 같은 인터프리터를 사용할 수 있습니다.

## 구성 파일 지원

Intlayer는 여러 구성 파일 형식을 지원합니다:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

사용 가능한 로케일이나 기타 매개변수를 구성하는 방법은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

## intlayer 명령 실행

### 핵심 명령

- **[사전 빌드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/build.md)** - 콘텐츠 선언 파일에서 사전을 빌드합니다.
- **[사전 감시](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/watch.md)** - 변경 사항을 감시하고 자동으로 사전을 빌드합니다.
- **[CLI 버전 확인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/version.md)** - 설치된 Intlayer CLI 버전을 확인합니다.

### 사전 관리

- **[사전 푸시](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/push.md)** - 사전을 Intlayer 에디터와 CMS로 푸시합니다.
- **[사전 가져오기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/pull.md)** - Intlayer 에디터와 CMS에서 사전을 가져옵니다
- **[사전 채우기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md)** - AI를 사용하여 사전을 채우고, 감사하며, 번역합니다
- **[누락된 번역 테스트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/test.md)** - 누락된 번역을 테스트하고 식별합니다
- **[콘텐츠 선언 파일 목록](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/list.md)** - 프로젝트 내 모든 콘텐츠 선언 파일을 나열합니다

### 컴포넌트 관리

- **[컴포넌트 변환](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/transform.md)** - 기존 컴포넌트를 Intlayer를 사용하도록 변환

### 구성

- **[구성 관리](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/configuration.md)** - Intlayer 구성을 CMS에서 가져오고 푸시

### 문서 관리

- **[문서 번역](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/doc-translate.md)** - AI를 사용하여 문서 파일 자동 번역
- **[문서 검토](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/doc-review.md)** - 품질과 일관성을 위한 문서 파일 검토

### 에디터 및 라이브 동기화

- **[에디터 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/editor.md)** - Intlayer 에디터 명령어 사용하기
- **[라이브 싱크 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/live.md)** - 런타임에 CMS 콘텐츠 변경 사항을 반영하는 라이브 싱크 사용하기

### 개발 도구

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/sdk.md)** - 자신의 코드에서 Intlayer CLI SDK 사용하기
- **[Intlayer 명령어 디버그](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/debug.md)** - Intlayer CLI 문제 디버그 및 문제 해결하기

## `package.json`에서 intlayer 명령어 사용하기

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:transform": "npx intlayer transform",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **참고**: 다음과 같은 짧은 별칭도 사용할 수 있습니다:
>
> - `npx intlayer list` 는 `npx intlayer content list` 대신 사용
> - `npx intlayer test` 는 `npx intlayer content test` 대신 사용
