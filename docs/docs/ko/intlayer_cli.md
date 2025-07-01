---
createdAt: 2024-08-11
updatedAt: 2025-06-29
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
---

# Intlayer CLI

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

> `intlayer` 패키지가 이미 설치되어 있다면, CLI도 자동으로 설치됩니다. 이 단계는 건너뛸 수 있습니다.

## intlayer-cli 패키지

`intlayer-cli` 패키지는 [intlayer 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)을 사전(dictionary)으로 변환하는 역할을 합니다.

이 패키지는 `src/**/*.content.{ts|js|mjs|cjs|json}`와 같은 모든 intlayer 파일을 변환합니다. [Intlayer 선언 파일을 선언하는 방법을 확인하세요](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

intlayer 사전을 해석하려면 [react-intlayer](https://www.npmjs.com/package/react-intlayer) 또는 [next-intlayer](https://www.npmjs.com/package/next-intlayer)와 같은 해석기를 사용할 수 있습니다.

## 구성 파일 지원

Intlayer는 여러 가지 구성 파일 형식을 지원합니다:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

사용 가능한 로케일이나 기타 매개변수를 구성하는 방법은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

## CLI SDK

CLI SDK는 Intlayer CLI를 자신의 코드에서 사용할 수 있게 해주는 라이브러리입니다.

```bash packageManager="npm"
npm install @intlayer/cli -D
```

```bash packageManager="yarn"
yarn add @intlayer/cli -D
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli -D
```

사용 예시:

```ts
import {
  push,
  pull,
  fill,
  build,
  docTranslate,
  docReview,
} from "@intlayer/cli";

push();
pull();
// ...
fill();
// ...
build();
// ...
docTranslate();
// ...
docReview();
// ...
```

## intlayer 명령어 실행하기

### 사전 빌드하기

사전을 빌드하려면 다음 명령어를 실행하세요:

```bash
npx intlayer build
```

또는 감시 모드로 실행하려면

```bash
npx intlayer build --watch
```

이 명령어는 기본적으로 `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` 경로에서 선언된 콘텐츠 파일을 찾아 `.intlayer` 디렉토리에 사전을 빌드합니다.

##### 별칭:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### 사전 푸시하기

```bash
npx intlayer dictionary push
```

[intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)가 설치되어 있다면, 사전을 에디터로 푸시할 수도 있습니다. 이 명령어는 사전을 [에디터](https://intlayer.org/dashboard)에서 사용할 수 있도록 해줍니다. 이를 통해 팀과 사전을 공유하고 애플리케이션 코드를 수정하지 않고도 콘텐츠를 편집할 수 있습니다.

##### 별칭:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### 인수:

- `-d`, `--dictionaries`: 가져올 사전의 ID들입니다. 지정하지 않으면 모든 사전이 푸시됩니다.
  > 예시: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: 사전이 푸시된 후 로케일 디렉터리를 삭제할지 묻는 질문을 건너뛰고 삭제합니다. 기본적으로 사전이 로컬에 정의되어 있으면 원격 사전 내용을 덮어씁니다.
  > 예시: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: 사전이 푸시된 후 로케일 디렉터리를 삭제할지 묻는 질문을 건너뛰고 유지합니다. 기본적으로 사전이 로컬에 정의되어 있으면 원격 사전 내용을 덮어씁니다.
  > 예시: `npx intlayer dictionary push -k`
- `--env`: 환경을 지정합니다 (예: `development`, `production`).
- `--env-file`: 변수 로드를 위한 사용자 지정 환경 파일을 제공합니다.
- `--base-dir`: 프로젝트의 기본 디렉터리를 지정합니다.
- `--verbose`: 디버깅을 위해 자세한 로깅을 활성화합니다.
- `--git-diff`: 기본 브랜치(기본값 `origin/main`)에서 현재 브랜치(기본값: `HEAD`)로 변경된 사전만 실행합니다.
- `--git-diff-base`: git diff의 기준 참조를 지정합니다(기본값 `origin/main`).
- `--git-diff-current`: git diff의 현재 참조를 지정합니다(기본값 `HEAD`).
- `--uncommitted`: 커밋되지 않은 변경 사항을 포함합니다.
- `--unpushed`: 푸시되지 않은 변경 사항을 포함합니다.
- `--untracked`: 추적되지 않은 파일을 포함합니다.

### 원격 사전 가져오기

```bash
npx intlayer pull
```

[intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)이 설치되어 있으면, 에디터에서 사전을 가져올 수도 있습니다. 이렇게 하면 애플리케이션의 필요에 따라 사전의 내용을 덮어쓸 수 있습니다.

##### 별칭:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### 인수:

- `-d, --dictionaries`: 가져올 사전의 ID들입니다. 지정하지 않으면 모든 사전이 가져와집니다.
  > 예시: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : 새 사전이 저장될 디렉토리 경로입니다. 지정하지 않으면 새 사전은 프로젝트의 `./intlayer-dictionaries` 디렉토리에 저장됩니다. 사전 내용에 `filePath` 필드가 지정되어 있으면, 사전은 이 인수를 무시하고 지정된 `filePath` 디렉토리에 저장됩니다.
- `--env`: 환경을 지정합니다 (예: `development`, `production`).
- `--env-file`: 변수를 로드할 사용자 정의 환경 파일을 제공합니다.
- `--base-dir`: 프로젝트의 기본 디렉토리를 지정합니다.
- `--verbose`: 디버깅을 위한 상세 로그 출력을 활성화합니다.

##### 예시:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### 사전 채우기 / 감사 / 번역

```bash
bash
npx intlayer fill
```

이 명령어는 누락된 번역, 구조적 불일치 또는 타입 불일치와 같은 잠재적인 문제에 대해 콘텐츠 선언 파일을 분석합니다. 문제가 발견되면, **intlayer fill**은 사전을 일관되고 완전하게 유지하기 위해 업데이트를 제안하거나 적용합니다.

##### 별칭:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### 인수:

- `-f, --file [files...]`
  감사할 특정 콘텐츠 선언 파일 목록입니다. 지정하지 않으면 발견된 모든 `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` 파일이 감사 대상이 됩니다.

- `--exclude [excludedGlobs...]`
  감사에서 제외할 glob 패턴입니다 (예: `--exclude "src/test/**"`).

- `--source-locale [sourceLocale]`
  번역할 원본 로케일입니다. 지정하지 않으면 구성에서 기본 로케일이 사용됩니다.

- `--output-locales [outputLocales...]`
  번역할 대상 로케일입니다. 지정하지 않으면 원본 로케일을 제외한 구성의 모든 로케일이 사용됩니다.

- `--mode [mode]`
  번역 모드: 'complete', 'review', 또는 'missing-only' 중 하나입니다. 기본값은 'missing-only'입니다.

- `--git-diff`
  기본 브랜치(기본값 `origin/main`)에서 현재 브랜치(기본값 `HEAD`)로의 변경 사항이 포함된 사전을 필터링합니다.

- `--git-diff-base`
  git diff의 기준 참조를 지정합니다 (기본값 `origin/main`).

- `--git-diff-current`
  git diff의 현재 참조를 지정합니다 (기본값 `HEAD`).

- `--uncommitted`
  커밋되지 않은 변경 사항이 포함된 사전을 필터링합니다.

- `--unpushed`
- `--unpushed`
  푸시되지 않은 변경 사항이 포함된 사전을 필터링합니다.

- `--untracked`
  추적되지 않은 파일이 포함된 사전을 필터링합니다.

- `--keys [keys...]`
  지정된 키를 기준으로 사전을 필터링합니다.

- `--excluded-keys [excludedKeys...]`
  지정된 키를 기준으로 사전을 제외합니다.

- `--path-filter [pathFilters...]`
  파일 경로에 대한 glob 패턴을 기준으로 사전을 필터링합니다.

- `--model [model]`
  번역에 사용할 AI 모델 (예: `gpt-3.5-turbo`).

- `--provider [provider]`
  번역에 사용할 AI 제공자.

- `--temperature [temperature]`
  AI 모델의 온도 설정.

- `--api-key [apiKey]`
  AI 서비스에 사용할 API 키를 제공합니다.

- `--custom-prompt [prompt]`
  번역 지침을 위한 사용자 지정 프롬프트를 제공합니다.

- `--application-context [applicationContext]`
  AI 번역을 위한 추가 컨텍스트를 제공합니다.

- `--env`
  환경을 지정합니다 (예: `development`, `production`).

- `--env-file [envFile]`
  변수를 로드할 사용자 지정 환경 파일을 제공합니다.

- `--base-dir`
  프로젝트의 기본 디렉토리를 지정합니다.

- `--verbose`
  디버깅을 위한 자세한 로깅을 활성화합니다.

##### 예시:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

이 명령은 `src/home/` 디렉토리 내 모든 콘텐츠 선언 파일에 대해 영어에서 프랑스어 및 스페인어로 GPT-3.5 Turbo 모델을 사용하여 콘텐츠를 번역합니다.

### 구성 관리

#### 구성 가져오기

`configuration get` 명령어는 Intlayer의 현재 설정, 특히 로케일 설정을 가져옵니다. 이는 설정을 확인하는 데 유용합니다.

```bash
npx intlayer configuration get
```

##### 별칭(Aliases):

- `npx intlayer config get`
- `npx intlayer conf get`

##### 인수(Arguments):

- **`--env`**: 환경을 지정합니다 (예: `development`, `production`).
- **`--env-file`**: 변수 로드를 위한 사용자 지정 환경 파일을 제공합니다.
- **`--base-dir`**: 프로젝트의 기본 디렉토리를 지정합니다.
- **`--verbose`**: 디버깅을 위한 상세 로깅을 활성화합니다.

#### 구성 푸시(Push Configuration)

`configuration push` 명령어는 설정을 Intlayer CMS 및 에디터에 업로드합니다. 이 단계는 Intlayer 비주얼 에디터에서 원격 사전을 사용하기 위해 필요합니다.

```bash
bash
npx intlayer configuration push
```

##### 별칭:

- `npx intlayer config push`
- `npx intlayer conf push`

##### 인수:

- **`--env`**: 환경을 지정합니다 (예: `development`, `production`).
- **`--env-file`**: 변수 로드를 위한 사용자 지정 환경 파일을 제공합니다.
- **`--base-dir`**: 프로젝트의 기본 디렉토리를 지정합니다.
- **`--verbose`**: 디버깅을 위한 자세한 로깅을 활성화합니다.

구성을 푸시하면 프로젝트가 Intlayer CMS와 완전히 통합되어 팀 간 원활한 사전 관리가 가능합니다.

### 문서 관리

`doc` 명령어는 여러 로케일에 걸친 문서 파일을 관리하고 번역하는 도구를 제공합니다.

#### 문서 번역

`doc translate` 명령어는 AI 번역 서비스를 사용하여 기본 로케일에서 대상 로케일로 문서 파일을 자동으로 번역합니다.

```bash
npx intlayer doc translate
```

##### 인수:

- **`--doc-pattern [docPattern...]`**: 번역할 문서 파일을 매칭하는 glob 패턴입니다.
  > 예시: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`
- **`--excluded-glob-pattern [excludedGlobPattern...]`**: 번역에서 제외할 glob 패턴입니다.
  > 예시: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`
- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: 동시에 번역할 파일 수입니다.
  > 예시: `npx intlayer doc translate --nb-simultaneous-file-processed 5`
- **`--locales [locales...]`**: 문서 번역 대상 로케일입니다.
  > 예시: `npx intlayer doc translate --locales fr es de`
- **`--base-locale [baseLocale]`**: 번역할 원본 로케일입니다.
  > 예시: `npx intlayer doc translate --base-locale en`
- **`--model [model]`**: 번역에 사용할 AI 모델입니다 (예: `gpt-3.5-turbo`).
- **`--provider [provider]`**: 번역에 사용할 AI 제공자입니다.
- **`--temperature [temperature]`**: AI 모델의 온도 설정입니다.
- **`--api-key [apiKey]`**: AI 서비스에 사용할 API 키를 제공합니다.
- **`--custom-prompt [prompt]`**: 번역 지침을 위한 사용자 지정 프롬프트를 제공합니다.
- **`--application-context [applicationContext]`**: AI 번역에 추가적인 컨텍스트를 제공합니다.
- **`--env`**: 환경을 지정합니다 (예: `development`, `production`).
- **`--env-file [envFile]`**: 변수 로드를 위한 사용자 정의 환경 파일을 제공합니다.
- **`--base-dir`**: 프로젝트의 기본 디렉토리를 지정합니다.
- **`--verbose`**: 디버깅을 위한 상세 로그 출력을 활성화합니다.
- **`--custom-instructions [customInstructions]`**: 프롬프트에 추가되는 사용자 정의 지침입니다. 포맷팅, URL 번역 등 특정 규칙을 적용하는 데 유용합니다.

##### 예시:

```bash
npx intlayer doc translate
  --doc-pattern "docs/en/**/*.md"
  --base-locale en --locales fr es
  --model chatgpt-4o-latest
  --custom-instructions "$(cat ./instructions.md)"
```

> 출력 파일 경로는 다음 패턴을 대체하여 결정됩니다
>
> - `/{{baseLocale}}/` 는 `/{{locale}}/` 로 변경 (Unix)
> - `\{{baseLocale}}\` 는 `\{{locale}}\` 로 변경됩니다 (Windows)
> - `_{{baseLocale}}.` 는 `_{{locale}}.` 로 변경됩니다
> - `{{baseLocale}}_` 는 `{{locale}}_` 로 변경됩니다
> - `.{{baseLocaleName}}.` 는 `.{{localeName}}.` 로 변경됩니다
>
> 만약 해당 패턴이 발견되지 않으면, 출력 파일은 파일 확장자에 `.{{locale}}` 을 추가합니다. 예를 들어 `./my/file.md` 는 프랑스어 로케일의 경우 `./my/file.fr.md` 로 번역됩니다.

#### 문서 검토

`doc review` 명령어는 다양한 로케일에 걸쳐 문서 파일의 품질, 일관성 및 완전성을 분석합니다.

```bash
npx intlayer doc review
```

##### 인자:

`doc review` 명령어는 `doc translate` 와 동일한 인자를 받아 특정 문서 파일을 검토하고 품질 검사를 적용할 수 있습니다.

##### 예시:

```bash
npx intlayer doc review
 --doc-pattern "docs/ko/**/*.md"
 --locales fr es de
 --model chatgpt-4o-latest
 --custom-instructions "$(cat ./instructions.md)"
```

## `package.json`에서 intlayer 명령어 사용하기

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

## intlayer 명령어 디버깅

### 1. **최신 버전을 사용하고 있는지 확인하기**

다음 명령어를 실행하세요:

```bash
npx intlayer --version                  # 현재 로컬 intlayer 버전
npx intlayer@latest --version           # 최신 intlayer 버전
```

### 2. **명령어가 등록되었는지 확인하기**

다음 명령어로 확인할 수 있습니다:

```bash
npx intlayer --help                     # 사용 가능한 명령어 목록과 사용법 정보를 표시합니다
npx intlayer dictionary build --help    # 특정 명령어에 대한 사용 가능한 옵션 목록을 표시합니다
```

### 3. **터미널을 재시작하세요**

새로운 명령어를 인식하려면 때때로 터미널을 재시작해야 합니다.

### 4. **npx 캐시를 지우기 (이전 버전에 갇힌 경우)**

```bash
npx clear-npx-cache
```

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
