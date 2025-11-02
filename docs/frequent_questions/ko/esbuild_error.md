---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: ESBuild 오류
description: ESBuild 오류를 해결하는 방법을 알아보세요.
keywords:
  - esbuild
  - 오류
  - intlayer
  - 플러그인
  - 프레임워크
  - next.js
  - vite
  - react-native
  - lynx
slugs:
  - frequent-questions
  - esbuild-error
---

# ESBuild 오류

빌드 과정에서 ESBuild 오류가 발생한다면, Intlayer 플러그인이 올바르게 구성되지 않았을 가능성이 큽니다.

ESBuild는 콘텐츠 선언 파일(`.content.{ts,js,mjs,cjs,json}`)을 읽고, 해당 사전을 `.intlayer/dictionary` 폴더에 생성하는 역할을 합니다. 또한 구성 파일(`intlayer.config.ts`)도 읽습니다.

Intlayer는 번들러와 통합할 수 있는 플러그인을 제공합니다. 이 플러그인은 서버 측에서만 실행되어야 하는 컴포넌트에 별칭(alias)을 지정하도록 설계되었습니다.

Next.js(Webpack / Turbopack), Vite, React Native, Lynx 등과 같은 프레임워크를 사용 중이라면, Intlayer를 애플리케이션에 통합할 수 있는 플러그인을 제공합니다. 따라서 플러그인 통합 방법을 배우려면 사용 중인 프레임워크의 특정 문서를 참조하세요.
