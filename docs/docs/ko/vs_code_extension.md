---
createdAt: 2025-03-17
updatedAt: 2025-09-30
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

![사전 채우기](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_fill_active_dictionary.gif?raw=true)

- **즉시 탐색** – `useIntlayer` 키를 클릭하면 올바른 콘텐츠 파일로 빠르게 이동합니다.
- **사전 채우기** – 프로젝트의 콘텐츠로 사전을 채웁니다.

![명령어 목록](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_list_commands.gif?raw=true)

- **Intlayer 명령어에 쉽게 접근** – 콘텐츠 사전을 빌드, 푸시, 풀, 채우기, 테스트를 손쉽게 수행합니다.

![콘텐츠 파일 생성](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_create_content_file.gif?raw=true)

- **콘텐츠 선언 생성기** – 다양한 형식(`.ts`, `.esm`, `.cjs`, `.json`)으로 사전 콘텐츠 파일을 생성합니다.

![사전 테스트](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_test_missing_dictionary.gif?raw=true)

- **사전 테스트** – 누락된 번역이 있는지 사전을 테스트합니다.

![사전 재구성](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_rebuild_dictionary.gif?raw=true)

- **사전을 최신 상태로 유지** – 프로젝트의 최신 콘텐츠로 사전을 최신 상태로 유지합니다.

![Intlayer 탭 (활동 표시줄)](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_search_dictionary.gif?raw=true)

- **Intlayer 탭 (활동 표시줄)** – 전용 사이드 탭에서 도구 모음과 컨텍스트 작업(빌드, 풀, 푸시, 채우기, 새로 고침, 테스트, 파일 생성)과 함께 사전을 탐색하고 검색합니다.

## 사용법

### 빠른 탐색

1. **react-intlayer**를 사용하는 프로젝트를 엽니다.
2. 다음과 같이 `useIntlayer()` 호출을 찾습니다:

   ```tsx
   const content = useIntlayer("app");
   ```

3. 키(예: `"app"`)에서 **명령-클릭**(`⌘+클릭` macOS) 또는 **Ctrl+클릭**(Windows/Linux)을 합니다.
4. VS Code가 자동으로 해당 사전 파일을 엽니다. 예: `src/app.content.ts`.

### Intlayer 탭 (활동 표시줄)

사이드 탭을 사용하여 사전을 탐색하고 관리하세요:

- 활동 표시줄에서 Intlayer 아이콘을 엽니다.
- **검색**에서 입력하여 사전과 항목을 실시간으로 필터링합니다.
- **사전**에서 환경, 사전, 파일을 탐색합니다. 툴바를 사용하여 빌드(Build), 풀(Pull), 푸시(Push), 채우기(Fill), 새로고침(Refresh), 테스트(Test), 사전 파일 생성(Create Dictionary File)을 수행할 수 있습니다. 마우스 오른쪽 버튼 클릭으로 컨텍스트 작업(사전에서 풀/푸시, 파일에서 채우기)을 사용할 수 있습니다. 현재 편집 중인 파일은 해당되는 경우 트리에서 자동으로 표시됩니다.

### 명령어 접근

명령어는 **명령 팔레트**에서 접근할 수 있습니다.

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

- **사전 빌드(Build Dictionaries)**
- **사전 푸시(Push Dictionaries)**
- **사전 풀(Pull Dictionaries)**
- **사전 채우기(Fill Dictionaries)**
- **사전 테스트(Test Dictionaries)**
- **사전 파일 생성(Create Dictionary File)**

### 환경 변수 로딩

Intlayer는 AI API 키와 Intlayer 클라이언트 ID 및 시크릿을 환경 변수에 저장할 것을 권장합니다.

이 확장 프로그램은 작업 공간에서 환경 변수를 로드하여 올바른 컨텍스트로 Intlayer 명령을 실행할 수 있습니다.

- **로드 순서(우선순위)**: `.env.<env>.local` → `.env.<env>` → `.env.local` → `.env`
- **비파괴적**: 기존의 `process.env` 값은 덮어쓰지 않습니다.
- **범위**: 파일은 구성된 기본 디렉터리(기본값은 작업 공간 루트)에서 해석됩니다.

#### 활성 환경 선택

- **명령 팔레트**: 팔레트를 열고 `Intlayer: Select Environment` 명령을 실행한 후 환경(예: `development`, `staging`, `production`)을 선택합니다. 확장 기능은 위 우선순위 목록에서 첫 번째로 사용 가능한 파일을 로드하려 시도하며, “Loaded env from .env.<env>.local”과 같은 알림을 표시합니다.
- **설정**: `설정 → 확장 기능 → Intlayer`로 이동하여 다음을 설정합니다:
  - **환경(Environment)**: `.env.<env>*` 파일을 해석하는 데 사용되는 환경 이름입니다.
  - (선택 사항) **Env 파일**: 명시적인 `.env` 파일 경로입니다. 제공되면 추론된 목록보다 우선합니다.

#### 모노레포 및 사용자 지정 디렉토리

워크스페이스 루트 외부에 `.env` 파일이 있는 경우, `설정 → 확장 기능 → Intlayer`에서 **기본 디렉터리**를 설정하세요. 로더는 해당 디렉터리를 기준으로 `.env` 파일을 찾습니다.

## 문서 이력

| 버전   | 날짜       | 변경 사항                                |
| ------ | ---------- | ---------------------------------------- |
| 6.1.5  | 2025-09-30 | 데모 GIF 추가                            |
| 6.1.0  | 2025-09-24 | 환경 선택 섹션 추가                      |
| 6.0.0  | 2025-09-22 | Intlayer 탭 / 채우기 및 테스트 명령 추가 |
| 5.5.10 | 2025-06-29 | 초기 이력                                |
