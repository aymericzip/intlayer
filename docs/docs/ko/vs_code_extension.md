---
createdAt: 2025-03-17
updatedAt: 2025-06-29
title: 공식 VS 코드 확장
description: VS 코드에서 Intlayer 확장을 사용하여 개발 워크플로우를 향상시키는 방법을 알아보세요. 현지화된 콘텐츠 간 빠른 탐색과 사전 관리를 효율적으로 수행할 수 있습니다.
keywords:
  - VS 코드 확장
  - Intlayer
  - 현지화
  - 개발 도구
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
---

# 공식 VS 코드 확장

## 개요

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)는 프로젝트에서 현지화된 콘텐츠 작업 시 개발자 경험을 향상시키기 위해 설계된 **Intlayer**의 공식 Visual Studio Code 확장입니다.

![Intlayer VS 코드 확장](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

확장 링크: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## 기능

### 즉시 탐색

**정의로 이동 지원** – `useIntlayer` 키에서 `Cmd+클릭`(Mac) 또는 `Ctrl+클릭`(Windows/Linux)을 사용하여 해당 콘텐츠 파일을 즉시 엽니다.  
**원활한 통합** – **react-intlayer** 및 **next-intlayer** 프로젝트와 문제없이 작동합니다.  
**다국어 지원** – 다양한 언어의 현지화된 콘텐츠를 지원합니다.  
**VS Code 통합** – VS Code의 탐색 및 명령 팔레트와 원활하게 통합됩니다.

### 사전 관리 명령어

VS Code에서 직접 콘텐츠 사전을 관리하세요:

- **사전 빌드** (`extension.buildDictionaries`) – 프로젝트 구조에 따라 콘텐츠 파일을 생성합니다.
- **사전 푸시** (`extension.pushDictionaries`) – 최신 사전 콘텐츠를 저장소에 업로드합니다.
- **사전 풀** (`extension.pullDictionaries`) – 저장소에서 최신 사전 콘텐츠를 로컬 환경과 동기화합니다.

### 콘텐츠 선언 생성기

다양한 형식으로 구조화된 사전 파일을 쉽게 생성할 수 있습니다:

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ES 모듈 (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## 설치

**Intlayer**를 VS Code 마켓플레이스에서 직접 설치할 수 있습니다:

1. **VS Code**를 엽니다.
2. **확장 마켓플레이스**로 이동합니다.
3. **"Intlayer"**를 검색합니다.
4. **설치**를 클릭합니다.

또는 명령줄을 통해 설치할 수도 있습니다:

```sh
code --install-extension intlayer
```

## 사용법

### 빠른 탐색

1. **react-intlayer**를 사용하는 프로젝트를 엽니다.
2. 다음과 같이 `useIntlayer()` 호출을 찾습니다:

   ```tsx
   const content = useIntlayer("app");
   ```

3. 키(예: `"app"`)에서 **명령-클릭**(`⌘+클릭` macOS) 또는 **Ctrl+클릭**(Windows/Linux)을 합니다.
4. VS Code가 자동으로 해당 사전 파일을 엽니다. 예: `src/app.content.ts`.

### 콘텐츠 사전 관리

#### 사전 빌드하기

모든 사전 콘텐츠 파일을 생성하려면:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

**Build Dictionaries**를 검색하고 명령을 실행하세요.

#### 사전 푸시하기

최신 사전 콘텐츠를 업로드하려면:

1. **명령 팔레트**를 엽니다.
2. **Push Dictionaries**를 검색합니다.
3. 푸시할 사전을 선택하고 확인합니다.

#### 사전 풀하기

최신 사전 콘텐츠를 동기화하려면:

1. **명령 팔레트**를 엽니다.
2. **Pull Dictionaries**를 검색합니다.
3. 풀 사전을 선택합니다.

## 개발 및 기여

기여하고 싶으신가요? 커뮤니티 기여를 환영합니다!

저장소 URL: https://github.com/aymericzip/intlayer-vs-code-extension

### 시작하기

저장소를 클론하고 의존성을 설치하세요:

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> 확장 기능을 빌드하고 배포하기 위해 `vsce` 패키지와 호환되는 `npm` 패키지 관리자를 사용하세요.

### 개발 모드에서 실행하기

1. **VS Code**에서 프로젝트를 엽니다.
2. `F5` 키를 눌러 새로운 **확장 개발 호스트(Extension Development Host)** 창을 실행합니다.

### 풀 리퀘스트 제출하기

확장 기능을 개선하셨다면, [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension)에서 PR을 제출하세요.

## 피드백 및 이슈

버그를 발견했거나 기능 요청이 있나요? 우리의 **GitHub 저장소**에 이슈를 열어주세요:

[GitHub 이슈](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## 라이선스

Intlayer는 **MIT 라이선스** 하에 배포됩니다.

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
