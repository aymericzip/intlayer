# Intlayer CLI

## 패키지 설치

npm을 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
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
npx intlayer build
```

또는 감시 모드에서 실행

```bash
npx intlayer build --watch
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
- `-r`, `--deleteLocaleDictionary`: 사전이 푸시된 후 로케일 디렉토리를 삭제할지 묻는 질문을 건너뛰고 삭제합니다. 기본적으로 로컬에 정의된 사전은 원격 사전 내용을 덮어씁니다.
  > 예: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: 사전이 푸시된 후 로케일 디렉토리를 삭제할지 묻는 질문을 건너뛰고 유지합니다. 기본적으로 로컬에 정의된 사전은 원격 사전 내용을 덮어씁니다.
  > 예: `npx intlayer dictionary push -k`

### 원격 사전 가져오기

```bash
npx intlayer dictionary pull
```

[intlayer 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_visual_editor.md)가 설치되어 있다면, 편집기에서 사전을 가져올 수도 있습니다. 이를 통해 애플리케이션의 필요에 따라 사전 내용을 덮어쓸 수 있습니다.

##### 인수:

- `-d, --dictionaries`: 가져올 사전의 ID. 지정하지 않으면 모든 사전이 가져옵니다.
  > 예: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : 새 사전을 저장할 디렉토리 경로. 지정하지 않으면 새 사전은 프로젝트의 `./intlayer-dictionaries` 디렉토리에 저장됩니다. 사전 콘텐츠에 `filePath` 필드가 지정된 경우, 이 인수는 무시되고 지정된 `filePath` 디렉토리에 저장됩니다.

##### 예:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### 사전 감사

```bash
npx intlayer audit
```

이 명령은 콘텐츠 선언 파일에서 누락된 번역, 구조적 불일치 또는 타입 불일치와 같은 잠재적인 문제를 분석합니다. 문제가 발견되면 **intlayer audit**은 사전을 일관되고 완전하게 유지하기 위해 업데이트를 제안하거나 적용합니다.

##### 인수:

- **`-f, --files [files...]`**  
  감사할 특정 콘텐츠 선언 파일 목록. 제공되지 않으면 발견된 모든 `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` 파일이 감사됩니다.

- **`--exclude [excludedGlobs...]`**  
  감사에서 제외할 글롭 패턴 (예: `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  감사에 사용할 ChatGPT 모델 (예: `gpt-3.5-turbo`).

- **`-p, --custom-prompt [prompt]`**  
  감사 지침에 대한 사용자 지정 프롬프트를 제공합니다.

- **`-l, --async-limit [asyncLimit]`**  
  동시에 처리할 파일의 최대 수.

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  OAuth2 인증을 우회하기 위해 OpenAI API 키를 제공합니다.

##### 예:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

이 명령은 `tests/**` 아래의 파일을 무시하고 `gpt-3.5-turbo` 모델을 사용하여 발견된 콘텐츠 선언 파일을 감사합니다. 누락된 번역과 같은 문제가 발견되면 원래 파일 구조를 유지하면서 수정됩니다.

### 설정 관리

#### 설정 가져오기

`get configuration` 명령은 Intlayer의 현재 설정, 특히 로케일 설정을 검색합니다. 이는 설정을 확인하는 데 유용합니다.

```bash
npx intlayer config get
```

##### 인수:

- **`--env`**: 환경을 지정합니다 (예: `development`, `production`).
- **`--env-file`**: 변수를 로드할 사용자 지정 환경 파일을 제공합니다.
- **`--verbose`**: 디버깅을 위한 자세한 로깅을 활성화합니다.

#### 설정 푸시

`push configuration` 명령은 설정을 Intlayer CMS 및 편집기로 업로드합니다. 이 단계는 Intlayer Visual Editor에서 원격 사전을 사용하려면 필수입니다.

```bash
npx intlayer config push
```

##### 인수:

- **`--env`**: 환경을 지정합니다 (예: `development`, `production`).
- **`--env-file`**: 변수를 로드할 사용자 지정 환경 파일을 제공합니다.
- **`--verbose`**: 디버깅을 위한 자세한 로깅을 활성화합니다.

설정을 푸시하면 프로젝트가 Intlayer CMS와 완전히 통합되어 팀 간 원활한 사전 관리를 가능하게 합니다.

## `package.json`에서 intlayer 명령 사용

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```
