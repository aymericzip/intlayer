---
createdAt: 2024-08-11
updatedAt: 2026-09-23
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
slugs:
  - doc
  - concept
  - cli
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "upgrade 명령어 추가"
  - version: 9.5.6
    date: 2026-09-21
    changes: "init infra 명령어 추가"
  - version: 9.5.2
    date: 2026-09-12
    changes: "`ci` 명령어를 `--ci` 플래그로 대체"
  - version: 9.0.0
    date: 2026-06-11
    changes: "scan 명령어 추가"
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
author: aymericzip
---

# Intlayer CLI - 다국어 웹사이트를 위한 모든 Intlayer CLI 명령어

## 목차

<TOC/>

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

이 패키지는 `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`과 같은 모든 Intlayer 파일을 트랜스파일합니다. [Intlayer 선언 파일 선언 방법 알아보기](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

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

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/login" />
</TechGrid>

> `intlayer login`은 모든 자격 있는 명령어가 사용하는 **액세스 키**(`clientId` / `clientSecret`)를 발급합니다. 시크릿은 서버 측 자격증명이며 클라이언트 번들에 도달하지 않습니다 — [액세스 키 안전 유지](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/login.md#keeping-the-access-key-safe)를 참조하세요.

### 핵심 명령어

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/build" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/watch" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/standalone" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/version" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/list_projects" />
</TechGrid>

### 딕셔너리 관리

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/push" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/pull" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/test" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/list" />
</TechGrid>

### 컴포넌트 관리

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract" />
</TechGrid>

### 구성

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/init" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/infra" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/upgrade" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/configuration" />
</TechGrid>

### 문서 관리

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/doc-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/doc-review" />
</TechGrid>

### 에디터 및 라이브 동기화 (Live Sync)

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/editor" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/live" />
</TechGrid>

### 감사 및 진단

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/scan" />
</TechGrid>

### 개발 도구

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/sdk" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/debug" />
</TechGrid>

## `package.json`에서 Intlayer 명령어 사용하기

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:infra": "npx intlayer init infra",
  "intlayer:upgrade": "npx intlayer upgrade",
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
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **참고**: 다음과 같은 짧은 별칭을 사용할 수도 있습니다:
>
> - `npx intlayer list`: `npx intlayer content list` 대신 사용
> - `npx intlayer test`: `npx intlayer content test` 대신 사용
> - `npx intlayer projects-list` 또는 `npx intlayer pl`: `npx intlayer projects list` 대신 사용
