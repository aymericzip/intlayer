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

> `intlayer` 패키지가 이미 설치되어 있다면, cli는 자동으로 설치됩니다. 이 단계는 생략할 수 있습니다.

## intlayer-cli 패키지

`intlayer-cli` 패키지는 [intlayer 선언](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md)을 사전으로 변환할 의도로 만들어졌습니다.

이 패키지는 `src/**/*.content.{ts|js|mjs|cjs|json}`와 같은 모든 intlayer 파일을 변환합니다. [Intlayer 선언 파일 설정 방법 보기](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

intlayer 사전을 해석하기 위해 [react-intlayer](https://www.npmjs.com/package/react-intlayer) 또는 [next-intlayer](https://www.npmjs.com/package/next-intlayer)와 같은 해석기를 사용할 수 있습니다.

## 구성 파일 지원

Intlayer는 여러 구성 파일 형식을 지원합니다:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

사용 가능한 로케일이나 기타 매개변수 구성 방법은 [여기에서 구성 문서 보기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md).

## intlayer 명령어 실행

### 사전 빌드

사전을 빌드하려면 다음 명령어를 실행합니다:

```bash
npx intlayer build
```

또는 감시 모드에서

```bash
npx intlayer build --watch
```

이 명령은 기본적으로 `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`로 선언 콘텐츠 파일을 찾아 사전을 `.intlayer` 디렉토리에 빌드합니다.

### 사전 푸시하기

```bash
npx intlayer push
```

[intlayer 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_editor.md)가 설치되어 있다면, 사전을 에디터로 푸시할 수도 있습니다. 이 명령은 [에디터](https://intlayer.org/dashboard)에 사전을 사용할 수 있게 합니다. 이렇게 하면 팀과 사전을 공유하고 코드 편집 없이 콘텐츠를 수정할 수 있습니다.

##### 인수:

- `-d`, `--dictionaries`: 풀할 사전의 ID. 지정하지 않으면 모든 사전이 푸시됩니다.
  > 예시: `npx intlayer push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: 사전이 푸시된 후 로케일 디렉토리를 삭제할 것인지 묻는 질문을 건너뛰고 삭제합니다. 기본적으로, 사전이 로컬로 정의되어 있으면 원거리에 있는 사전 콘텐츠를 덮어씁니다.
  > 예시: `npx intlayer push -r`
- `-k`, `--keepLocaleDictionary`: 사전이 푸시된 후 로케일 디렉토리를 삭제할 것인지 묻는 질문을 건너뛰고 유지합니다. 기본적으로, 사전이 로컬로 정의되어 있으면 원거리에 있는 사전 콘텐츠를 덮어씁니다.
  > 예시: `npx intlayer push -k`

### 원거리 사전 풀기

```bash
npx intlayer pull
```

[intlayer 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_editor.md)가 설치되어 있다면, 에디터에서 사전을 풀 수도 있습니다. 이렇게 하면 애플리케이션의 필요에 따라 사전의 내용을 덮어쓸 수 있습니다.

##### 인수:

- `-d, --dictionaries`: 풀할 사전의 ID. 지정하지 않으면 모든 사전이 풀립니다.
  > 예시: `npx intlayer pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: 새 사전이 저장될 디렉토리의 경로. 지정하지 않으면, 새 사전은 프로젝트의 `./intlayer-dictionaries` 디렉토리에 저장됩니다. 사전 콘텐츠에 `filePath` 필드가 지정된 경우, 이 인수는 무시되며 지정된 `filePath` 디렉토리에 저장됩니다.

##### 예시:

```bash
npx intlayer pull --newDictionariesPath ./my-dictionaries-dir/
```

### 사전 감사하기

```bash
npx intlayer audit
```

이 명령은 누락된 번역, 구조적 불일치 또는 유형 불일치와 같은 잠재적인 문제에 대해 콘텐츠 선언 파일을 분석합니다. 문제가 발견되면 **intlayer audit**는 사전을 일관되고 완벽하게 유지하기 위해 업데이트를 제안하거나 적용합니다.

##### 인수:

- **`-f, --files [files...]`**  
  감사할 특정 콘텐츠 선언 파일 목록입니다. 제공하지 않으면, 발견된 모든 `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` 파일이 감사됩니다.

- **`--exclude [excludedGlobs...]`**  
  감사를 제외할 Globs 패턴 (예: `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  감사를 위해 사용할 ChatGPT 모델 (예: `gpt-3.5-turbo`).

- **`-p, --custom-prompt [prompt]`**  
  감사 지침을 위한 사용자 지정 프롬프트 제공.

- **`-l, --async-limit [asyncLimit]`**  
  동시에 처리할 최대 파일 수입니다.

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  OAuth2 인증을 우회하기 위해 자신의 OpenAI API 키 제공.

##### 예시:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

이 명령은 `tests/**` 아래의 모든 파일을 무시하고 발견된 콘텐츠 선언 파일을 감사하기 위해 `gpt-3.5-turbo` 모델을 사용합니다. 문제가 발견되면 누락된 번역과 같은 문제가 원본 파일 구조를 유지하면서 제자리에서 수정됩니다.

## `package.json`에서 intlayer 명령 사용하기

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:audit": "npx intlayer audit"
}
```
