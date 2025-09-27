---
createdAt: 2025-03-17
updatedAt: 2025-09-22
title: 공식 VS 코드 확장
description: VS 코드에서 Intlayer 확장을 사용하여 개발 워크플로를 향상시키는 방법을 알아보세요. 현지화된 콘텐츠 간을 빠르게 탐색하고 사전을 효율적으로 관리할 수 있습니다.
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

**정의로 이동 지원** – `useIntlayer` 키에서 `⌘ + 클릭`(Mac) 또는 `Ctrl + 클릭`(Windows/Linux)을 사용하여 해당 콘텐츠 파일을 즉시 엽니다.  
**원활한 통합** – **react-intlayer** 및 **next-intlayer** 프로젝트와 문제없이 작동합니다.  
**다국어 지원** – 다양한 언어의 현지화된 콘텐츠를 지원합니다.  
**VS 코드 통합** – VS 코드의 탐색 및 명령 팔레트와 원활하게 통합됩니다.

### 사전 관리 명령어

VS 코드에서 직접 콘텐츠 사전을 관리하세요:

- **사전 빌드** – 프로젝트 구조를 기반으로 콘텐츠 파일을 생성합니다.
- **사전 푸시** – 최신 사전 콘텐츠를 저장소에 업로드합니다.
- **사전 풀** – 저장소에서 최신 사전 콘텐츠를 로컬 환경으로 동기화합니다.
- **사전 채우기** – 프로젝트의 콘텐츠로 사전을 채웁니다.
- **사전 테스트** – 누락되었거나 불완전한 번역을 식별합니다.

### 콘텐츠 선언 생성기

다양한 형식으로 구조화된 사전 파일을 쉽게 생성할 수 있습니다:

현재 컴포넌트 작업 중이라면 `.content.{ts,tsx,js,jsx,mjs,cjs,json}` 파일을 자동으로 생성합니다.

컴포넌트 예시:

```tsx fileName="src/components/MyComponent/index.tsx"
const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("my-component");

  return <span>{myTranslatedContent}</span>;
};
```

TypeScript 형식으로 생성된 파일:

```tsx fileName="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "my-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

사용 가능한 형식:

- **TypeScript (`.ts`)**
- **ES 모듈 (`.esm`)**
- **CommonJS (`.cjs`)**
- **JSON (`.json`)**

### Intlayer 탭 (활동 표시줄)

VS Code 활동 표시줄에서 Intlayer 아이콘을 클릭하여 Intlayer 탭을 엽니다. 이 탭에는 두 가지 뷰가 포함되어 있습니다:

- **검색(Search)**: 사전과 그 내용을 빠르게 필터링할 수 있는 실시간 검색 바입니다. 입력할 때마다 결과가 즉시 업데이트됩니다.
- **사전(Dictionaries)**: 환경/프로젝트, 사전 키, 그리고 항목을 기여하는 파일들의 트리 뷰입니다. 다음 작업을 할 수 있습니다:
  - 파일을 클릭하여 편집기에서 엽니다.
  - 툴바를 사용하여 다음 작업을 실행합니다: 빌드(Build), 풀(Pull), 푸시(Push), 채우기(Fill), 새로고침(Refresh), 테스트(Test), 사전 파일 생성(Create Dictionary File).
  - 항목별 작업을 위한 컨텍스트 메뉴를 사용합니다:
    - 사전에서는: 풀(Pull) 또는 푸시(Push)
    - 파일에서는: 사전 채우기(Fill Dictionary)
  - 편집기를 전환할 때, 해당 파일이 사전에 속해 있으면 트리가 일치하는 파일을 표시합니다.

## 설치

**Intlayer**를 VS Code 마켓플레이스에서 직접 설치할 수 있습니다:

1. **VS Code**를 엽니다.
2. **확장 마켓플레이스**로 이동합니다.
3. **"Intlayer"**를 검색합니다.
4. **설치**를 클릭합니다.

## 사용법

### 빠른 탐색

1. **react-intlayer**를 사용하는 프로젝트를 엽니다.
2. `useIntlayer()` 호출을 찾습니다. 예를 들어:

   ```tsx
   const content = useIntlayer("app");
   ```

3. 키(예: `"app"`)에서 **Command-클릭**(`⌘+Click`, macOS) 또는 **Ctrl-클릭**(Windows/Linux)합니다.
4. VS Code가 자동으로 해당 사전 파일(예: `src/app.content.ts`)을 엽니다.

### 콘텐츠 사전 관리

### Intlayer 탭 (활동 표시줄)

사전을 탐색하고 관리하려면 사이드 탭을 사용하세요:

- 활동 표시줄에서 Intlayer 아이콘을 엽니다.
- **검색(Search)**에서 실시간으로 사전과 항목을 필터링하려면 입력하세요.
- **사전(Dictionaries)**에서는 환경, 사전, 파일을 탐색할 수 있습니다. 툴바를 사용하여 빌드(Build), 풀(Pull), 푸시(Push), 채우기(Fill), 새로고침(Refresh), 테스트(Test), 사전 파일 생성(Create Dictionary File)을 수행하세요. 사전에서 풀/푸시, 파일에서 채우기 등의 컨텍스트 작업은 마우스 오른쪽 버튼 클릭으로 실행할 수 있습니다. 현재 편집 중인 파일은 해당되는 경우 트리에서 자동으로 표시됩니다.

#### 사전 빌드하기

모든 사전 콘텐츠 파일을 생성하려면:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

**Build Dictionaries**를 검색하여 명령을 실행하세요.

#### 사전 푸시하기

최신 사전 콘텐츠를 업로드하려면:

1. **명령 팔레트(Command Palette)**를 엽니다.
2. **Push Dictionaries**를 검색합니다.
3. 푸시할 사전을 선택하고 확인합니다.

#### 사전 풀하기

최신 사전 콘텐츠 동기화:

1. **명령 팔레트**를 엽니다.
2. **Pull Dictionaries**를 검색합니다.
3. 가져올 사전을 선택합니다.

#### 사전 채우기

프로젝트의 콘텐츠로 사전을 채웁니다:

1. **명령 팔레트**를 엽니다.
2. **Fill Dictionaries**를 검색합니다.
3. 사전을 채우기 위해 명령을 실행합니다.

#### 사전 테스트

사전을 검증하고 누락된 번역을 찾습니다:

1. **명령 팔레트**를 엽니다.
2. **Test Dictionaries**를 검색합니다.
3. 보고된 문제를 검토하고 필요에 따라 수정합니다.

## 문서 이력

| 버전   | 날짜       | 변경 사항   |
| ------ | ---------- | ----------- |
| 5.5.10 | 2025-06-29 | 이력 초기화 |
