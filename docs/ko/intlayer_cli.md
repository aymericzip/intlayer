---
docName: intlayer_cli
url: /doc/concept/cli
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_cli.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: CLI
description: Intlayer CLI를 사용하여 다국어 웹사이트를 관리하는 방법을 알아보세요. 이 온라인 문서의 단계를 따라 몇 분 만에 프로젝트를 설정하십시오.
keywords:
  - CLI
  - 명령줄 인터페이스
  - 국제화
  - 문서
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Intlayer CLI

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

> `intlayer` 패키지가 이미 설치되어 있다면, CLI가 자동으로 설치됩니다. 이 단계를 건너뛸 수 있습니다.

## intlayer-cli 패키지

`intlayer-cli` 패키지는 [intlayer 선언](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/get_started.md)을 사전으로 변환하는 것을 목적으로 합니다.

이 패키지는 `src/**/*.content.{ts|js|mjs|cjs|json}`와 같은 모든 intlayer 파일을 변환합니다. [Intlayer 선언 파일을 선언하는 방법을 확인하세요](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

intlayer 사전을 해석하려면 [react-intlayer](https://www.npmjs.com/package/react-intlayer) 또는 [next-intlayer](https://www.npmjs.com/package/next-intlayer)와 같은 해석기를 사용할 수 있습니다.

## 설정 파일 지원

Intlayer는 여러 설정 파일 형식을 지원합니다:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

사용 가능한 로케일 또는 기타 매개변수를 설정하는 방법은 [여기 설정 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

## intlayer 명령 실행

### 사전 빌드

사전을 빌드하려면 다음 명령을 실행하세요:

```bash
npx intlayer dictionaries build
```

또는 감시 모드에서 실행

```bash
npx intlayer dictionaries build --watch
```

이 명령은 기본적으로 `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`로 선언된 콘텐츠 파일을 찾고 `.intlayer` 디렉토리에 사전을 빌드합니다.

### 사전 푸시

```bash
npx intlayer dictionary push
```

[intlayer 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_visual_editor.md)가 설치되어 있다면, 사전을 편집기로 푸시할 수도 있습니다. 이 명령은 사전을 [편집기](https://intlayer.org/dashboard)에 사용할 수 있도록 합니다. 이를 통해 팀과 사전을 공유하고 애플리케이션 코드를 수정하지 않고 콘텐츠를 편집할 수 있습니다.

##### 인수:

- `-d`, `--dictionaries`: 푸시할 사전의 ID. 지정하지 않으면 모든 사전이 푸시됩니다.
  > 예: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: 사전을 푸시한 후 로케일 디렉토리를 삭제할지 묻는 질문을 건너뛰고 삭제합니다. 기본적으로 사전이 로컬에 정의된 경우 원격 사전의 내용을 덮어씁니다.
  > 예: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: 사전을 푸시한 후 로케일 디렉토리를 삭제할지 묻는 질문을 건너뛰고 유지합니다. 기본적으로 사전이 로컬에 정의된 경우 원격 사전의 내용을 덮어씁니다.
  > 예: `npx intlayer dictionary push -k`
- `--env`: 환경을 지정합니다 (예: `development`, `production`).
- `--env-file`: 변수를 로드하기 위한 사용자 정의 환경 파일을 제공합니다.
- `--base-dir`: 프로젝트의 기본 디렉토리를 지정합니다.
- `--verbose`: 디버깅을 위한 자세한 로깅을 활성화합니다.
- `--git-diff`: 푸시되지 않은 변경 사항이 있는 사전만 실행합니다.
- `--git-diff-base`: git diff의 기본 참조를 지정합니다.
- `--git-diff-current`: git diff의 현재 참조를 지정합니다.
- `--uncommitted`: 커밋되지 않은 변경 사항을 포함합니다.
- `--unpushed`: 푸시되지 않은 변경 사항을 포함합니다.
- `--untracked`: 추적되지 않은 파일을 포함합니다.

### 원격 사전 가져오기

```bash
npx intlayer dictionary pull
```

[intlayer 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_visual_editor.md)가 설치되어 있다면, 편집기에서 사전을 가져올 수도 있습니다. 이를 통해 애플리케이션의 필요에 따라 사전 내용을 덮어쓸 수 있습니다.

##### 인수:

- `-d, --dictionaries`: 가져올 사전의 ID. 지정하지 않으면 모든 사전이 가져와집니다.
  > 예: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: 새 사전이 저장될 디렉토리의 경로. 지정하지 않으면 새 사전은 프로젝트의 `./intlayer-dictionaries` 디렉토리에 저장됩니다. 사전 내용에 `filePath` 필드가 지정된 경우 사전은 이 인수를 고려하지 않고 지정된 `filePath` 디렉토리에 저장됩니다.
- `--env`: 환경을 지정합니다 (예: `development`, `production`).
- `--env-file`: 변수를 로드하기 위한 사용자 정의 환경 파일을 제공합니다.
- `--base-dir`: 프로젝트의 기본 디렉토리를 지정합니다.
- `--verbose`: 디버깅을 위한 자세한 로깅을 활성화합니다.

##### 예:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### 사전 감사

```bash
npx intlayer audit
```

이 명령은 콘텐츠 선언 파일을 분석하여 누락된 번역, 구조적 불일치 또는 타입 비호환성과 같은 잠재적인 문제를 찾습니다. 문제가 발견되면 **intlayer audit**은 사전을 일관되고 완전하게 유지하기 위해 업데이트를 제안하거나 적용합니다.

##### 인수:

- **`-f, --files [files...]`**  
  감사할 특정 콘텐츠 선언 파일 목록. 제공되지 않으면 발견된 모든 `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` 파일이 감사됩니다.

- **`--exclude [excludedGlobs...]`**  
  감사에서 제외할 글로브 패턴 (예: `--exclude "src/test/**"`).

- **`--source-locale [sourceLocale]`**  
  번역할 소스 로케일. 지정하지 않으면 구성의 기본 로케일이 사용됩니다.

- **`--output-locales [outputLocales...]`**  
  번역할 대상 로케일. 지정하지 않으면 소스 로케일을 제외한 구성의 모든 로케일이 사용됩니다.

- **`--mode [mode]`**  
  번역 모드: 'complete', 'review', 또는 'missing-only'. 기본값은 'missing-only'입니다.

- **`--git-diff`**  
  git 저장소에서 푸시되지 않은 변경 사항이 있는 사전만 실행합니다.

- **`--git-diff-base`**  
  git diff의 기본 참조를 지정합니다.

- **`--git-diff-current`**  
  git diff의 현재 참조를 지정합니다.

- **`--uncommitted`**  
  커밋되지 않은 변경 사항을 포함합니다.

- **`--unpushed`**  
  푸시되지 않은 변경 사항을 포함합니다.

- **`--untracked`**  
  추적되지 않은 파일을 포함합니다.

- **`--keys [keys...]`**  
  지정된 키를 기반으로 사전을 필터링합니다.

- **`--excluded-keys [excludedKeys...]`**  
  지정된 키를 기반으로 사전을 제외합니다.

- **`--path-filter [pathFilters...]`**  
  파일 경로의 글로브 패턴을 기반으로 사전을 필터링합니다.

- **`--model [model]`**  
  번역에 사용할 AI 모델 (예: `gpt-3.5-turbo`).

- **`--provider [provider]`**  
  번역에 사용할 AI 제공자.

- **`--temperature [temperature]`**  
  AI 모델의 온도 설정.

- **`--api-key [apiKey]`**  
  AI 서비스에 대한 자체 API 키를 제공합니다.

- **`--custom-prompt [prompt]`**  
  번역 지침을 위한 사용자 정의 프롬프트를 제공합니다.

- **`--application-context [applicationContext]`**  
  AI 번역을 위한 추가 컨텍스트를 제공합니다.

- **`--env`**  
  환경을 지정합니다 (예: `development`, `production`).

- **`--env-file [envFile]`**  
  변수를 로드하기 위한 사용자 정의 환경 파일을 제공합니다.

- **`--base-dir`**  
  프로젝트의 기본 디렉토리를 지정합니다.

- **`--verbose`**  
  디버깅을 위한 자세한 로깅을 활성화합니다.

##### 예:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

이 명령은 GPT-3.5 Turbo 모델을 사용하여 `src/home/` 디렉토리의 모든 콘텐츠 선언 파일의 내용을 영어에서 프랑스어와 스페인어로 번역합니다.

### 설정 관리

#### 설정 가져오기

`get configuration` 명령은 Intlayer의 현재 설정, 특히 로케일 설정을 검색합니다. 이는 설정을 확인하는 데 유용합니다.

```bash
npx intlayer config get
```

##### 인수:

- **`--env`**: 환경을 지정합니다 (예: `development`, `production`).
- **`--env-file`**: 변수를 로드할 사용자 지정 환경 파일을 제공합니다.
- **`--base-dir`**: 프로젝트의 기본 디렉토리를 지정합니다.
- **`--verbose`**: 디버깅을 위한 자세한 로깅을 활성화합니다.

#### 설정 푸시

`push configuration` 명령은 설정을 Intlayer CMS 및 편집기로 업로드합니다. 이 단계는 Intlayer Visual Editor에서 원격 사전을 사용하려면 필수입니다.

```bash
npx intlayer config push
```

##### 인수:

- **`--env`**: 환경을 지정합니다 (예: `development`, `production`).
- **`--env-file`**: 변수를 로드할 사용자 지정 환경 파일을 제공합니다.
- **`--base-dir`**: 프로젝트의 기본 디렉토리를 지정합니다.
- **`--verbose`**: 디버깅을 위한 자세한 로깅을 활성화합니다.

설정을 푸시하면 프로젝트가 Intlayer CMS와 완전히 통합되어 팀 간 원활한 사전 관리를 가능하게 합니다.

## `package.json`에서 intlayer 명령 사용

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer dictionaries build",
  "intlayer:watch": "npx intlayer dictionaries build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```

## intlayer 명령어 디버깅

### 1. **최신 버전을 사용하고 있는지 확인**

실행:

```bash
npx intlayer --version                  # 현재 로컬 intlayer 버전
npx intlayer@latest --version          # 최신 intlayer 버전
```

### 2. **명령어가 등록되어 있는지 확인**

다음과 같이 확인할 수 있습니다:

```bash
npx intlayer --help      # 사용 가능한 명령어 목록과 사용 정보 표시
```

### 3. **터미널 재시작**

새로운 명령어를 인식하기 위해 터미널 재시작이 필요할 수 있습니다.

### 4. **npx 캐시 지우기 (이전 버전에 문제가 있는 경우)**

```bash
npx clear-npx-cache
```
