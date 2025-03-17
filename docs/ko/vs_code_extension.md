# 공식 VS Code 확장 프로그램

## 개요

**Intlayer**는 **Intlayer**의 공식 Visual Studio Code 확장 프로그램으로, **React, Next.js, JavaScript** 프로젝트에서 로컬라이즈된 콘텐츠 작업 시 개발자 경험을 향상시키기 위해 설계되었습니다.

이 확장 프로그램을 사용하면 개발자는 콘텐츠 사전을 **빠르게 탐색**하고, 로컬라이제이션 파일을 관리하며, 강력한 자동화 명령으로 워크플로우를 간소화할 수 있습니다.

## 기능

### 즉시 탐색

**정의로 이동 지원** – `useIntlayer` 키를 `Cmd+Click` (Mac) 또는 `Ctrl+Click` (Windows/Linux)으로 클릭하여 해당 콘텐츠 파일을 즉시 엽니다.  
**원활한 통합** – **react-intlayer** 및 **next-intlayer** 프로젝트와 매끄럽게 작동합니다.  
**다국어 지원** – 다양한 언어의 로컬라이즈된 콘텐츠를 지원합니다.  
**VS Code 통합** – VS Code의 탐색 및 명령 팔레트와 원활하게 통합됩니다.

### 사전 관리 명령

VS Code에서 직접 콘텐츠 사전을 관리하세요:

- **사전 생성** (`extension.buildDictionaries`) – 프로젝트 구조를 기반으로 콘텐츠 파일을 생성합니다.
- **사전 업로드** (`extension.pushDictionaries`) – 최신 사전 콘텐츠를 저장소에 업로드합니다.
- **사전 동기화** (`extension.pullDictionaries`) – 최신 사전 콘텐츠를 저장소에서 로컬 환경으로 동기화합니다.

### 콘텐츠 선언 생성기

다양한 형식으로 구조화된 사전 파일을 쉽게 생성하세요:

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ES Module (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## 설치

**Intlayer**를 VS Code 마켓플레이스에서 직접 설치할 수 있습니다:

1. **VS Code**를 엽니다.
2. **확장 프로그램 마켓플레이스**로 이동합니다.
3. **"Intlayer"**를 검색합니다.
4. **설치**를 클릭합니다.

또는 명령줄을 통해 설치할 수 있습니다:

```sh
code --install-extension intlayer
```

## 사용법

### 빠른 탐색

1. **react-intlayer**를 사용하는 프로젝트를 엽니다.
2. `useIntlayer()` 호출을 찾습니다. 예:

   ```tsx
   const content = useIntlayer("app");
   ```

3. 키(예: `"app"`)를 **Command+클릭** (`⌘+Click` macOS) 또는 **Ctrl+클릭** (Windows/Linux)합니다.
4. VS Code가 자동으로 해당 사전 파일을 엽니다. 예: `src/app.content.ts`.

### 콘텐츠 사전 관리

#### 사전 생성

모든 사전 콘텐츠 파일을 생성하려면:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

**Build Dictionaries**를 검색하고 명령을 실행합니다.

#### 사전 업로드

최신 사전 콘텐츠를 업로드하려면:

1. **명령 팔레트**를 엽니다.
2. **Push Dictionaries**를 검색합니다.
3. 업로드할 사전을 선택하고 확인합니다.

#### 사전 동기화

최신 사전 콘텐츠를 동기화하려면:

1. **명령 팔레트**를 엽니다.
2. **Pull Dictionaries**를 검색합니다.
3. 동기화할 사전을 선택합니다.

### 사전 파일 경로 사용자 정의

기본적으로 확장은 표준 **Intlayer** 프로젝트 구조를 따릅니다. 그러나 사용자 정의 경로를 구성할 수 있습니다:

1. **설정 (`Cmd + ,` macOS / `Ctrl + ,` Windows/Linux)**을 엽니다.
2. `Intlayer`를 검색합니다.
3. 콘텐츠 파일 경로 설정을 조정합니다.

## 개발 및 기여

기여하고 싶으신가요? 커뮤니티의 기여를 환영합니다!

저장소 URL: https://github.com/aymericzip/intlayer-vs-code-extension

### 시작하기

저장소를 복제하고 종속성을 설치하세요:

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> 확장을 빌드하고 게시하기 위한 `vsce` 패키지와의 호환성을 위해 `npm` 패키지 관리자를 사용하세요.

### 개발 모드에서 실행

1. **VS Code**에서 프로젝트를 엽니다.
2. `F5`를 눌러 새로운 **확장 개발 호스트** 창을 실행합니다.

### Pull Request 제출

확장을 개선했다면 [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension)에 PR을 제출하세요.

## 피드백 및 문제

버그를 발견했거나 기능 요청이 있나요? **GitHub 저장소**에서 이슈를 열어주세요:

[GitHub Issues](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## 라이선스

Intlayer는 **MIT 라이선스**로 배포됩니다.
