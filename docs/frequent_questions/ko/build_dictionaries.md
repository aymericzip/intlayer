---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 사전 빌드 방법
description: 사전 빌드 방법을 알아보세요.
keywords:
  - 빌드
  - 사전
  - intlayer
  - 명령어
  - 감시
  - vscode
  - 플러그인
  - 프레임워크
  - next.js
  - vite
slugs:
  - doc
  - faq
  - build-dictionaries
---

# 사전 빌드

## 사전 빌드 방법

Intlayer는 사전을 빌드하기 위한 커맨드라인 도구를 제공합니다.

```bash
npx intlayer dictionaries build
```

이 명령어는:

- 프로젝트 내 모든 콘텐츠 선언 파일(`.content.{ts,tsx,js,mjs,cjs,json,...}`)을 스캔합니다.
- 사전을 생성하여 `.intlayer/dictionary` 폴더에 저장합니다.

### 감시 모드

콘텐츠 선언 파일에 변경 사항이 있을 때 사전을 자동으로 업데이트하려면 다음 명령어를 실행하세요:

```bash
npx intlayer dictionaries build --watch
```

이 모드에서는 콘텐츠 선언 파일에 변경 사항이 있을 때마다 Intlayer가 사전을 스캔하고 빌드하며 `.intlayer/dictionary` 폴더를 자동으로 업데이트합니다.

### VSCode 확장 프로그램 사용하기

[Intlayer VSCode 확장 프로그램](https://github.com/aymericzip/intlayer/tree/main/docs/ko/vs_code_extension.md)을 사용하여 VSCode에서 Intlayer 경험을 향상시킬 수 있습니다.

### 선호하는 애플리케이션 프레임워크용 플러그인 사용하기

Next.js(Webpack / Turbopack), Vite, React Native, Lynx 등과 같은 프레임워크를 사용하고 있다면, Intlayer는 애플리케이션에 Intlayer를 통합할 수 있는 플러그인을 제공합니다.

Intlayer는 애플리케이션 빌드 전에 사전을 빌드합니다.
마찬가지로 개발 모드에서는 콘텐츠 선언 파일의 변경 사항을 감시하고 사전을 자동으로 다시 빌드합니다.

따라서 플러그인 통합 방법을 배우려면 사용하는 프레임워크의 특정 문서를 참조하세요.
