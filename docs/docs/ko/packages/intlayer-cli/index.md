---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-cli - 국제화용 커맨드 라인 도구
description: 번역 관리, 사전 구축, 국제화 워크플로우 자동화를 위한 도구를 제공하는 Intlayer의 커맨드 라인 인터페이스 패키지입니다.
keywords:
  - intlayer
  - CLI
  - 커맨드 라인
  - 국제화
  - i18n
  - 도구
  - NPM
  - 자동화
slugs:
  - doc
  - package
  - intlayer-cli
---

# intlayer-cli: Intlayer CLI 사용을 위한 NPM 패키지

**Intlayer**는 자바스크립트 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React Native, Express.js와 같은 프레임워크와 호환됩니다.

**`intlayer-cli`** 패키지는 `@intlayer/cli` 패키지를 사용하며, `intlayer` 커맨드 라인 인터페이스에서 사용할 수 있도록 해주는 NPM 패키지입니다.

> [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/ko/packages/intlayer/index.md) 패키지가 설치되어 있다면 이 패키지는 필요하지 않습니다. `intlayer` 패키지와 비교했을 때, `intlayer-cli` 패키지는 `@intlayer/core` 의존성이 없는 CLI 도구만 포함하는 더 가벼운 패키지입니다.

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## 사용법

`intlayer-cli` 패키지를 사용하는 예시는 다음과 같습니다:

```bash
npx intlayer dictionaries build
```

## CLI 명령어

Intlayer는 다음과 같은 CLI 도구를 제공합니다:

- 콘텐츠 선언을 감사하고 누락된 번역을 완성합니다
- 콘텐츠 선언에서 사전을 빌드합니다
- CMS에서 로컬 프로젝트로 원격 사전을 푸시 및 풀합니다

자세한 내용은 [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)를 참조하세요.

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
