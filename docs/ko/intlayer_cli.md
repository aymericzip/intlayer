# Intlayer CLI

## 패키지 설치

필요한 패키지를 npm을 사용하여 설치합니다:

```bash
npm install intlayer-cli
```

```bash
yarn add intlayer-cli
```

```bash
pnpm add intlayer-cli
```

> 참고: `intlayer` 패키지가 이미 설치되어 있는 경우, cli는 자동으로 설치됩니다. 이 단계를 건너뛰어도 됩니다.

## intlayer-cli 패키지

`intlayer-cli` 패키지는 당신의 [intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md) 선언을 사전으로 변환하기 위해 의도되었습니다.

이 패키지는 `src/**/*.content.{ts|js|mjs|cjs|json}`과 같은 모든 intlayer 파일을 변환합니다. [Intlayer 선언 파일을 선언하는 방법을 보려면](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md) 여기를 확인하세요.

intlayer 사전을 해석하기 위해 [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/react-intlayer/README.md) 또는 [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/next-intlayer/README.md)와 같은 인터프리터를 사용할 수 있습니다.

## 구성 파일 지원

Intlayer는 여러 구성 파일 형식을 지원합니다:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

사용 가능한 로케일 또는 기타 매개변수를 구성하는 방법에 대한 자세한 내용은 [여기에서 구성 문서를 참조하세요](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md).

## intlayer 명령 실행

### 사전 생성

사전을 생성하려면 다음 명령을 실행할 수 있습니다:

```bash
npx intlayer build
```

또는 감시 모드에서

```bash
npx intlayer build --watch
```

이 명령은 기본적으로 `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`로 선언 내용 파일을 찾습니다. 그리고 `.intlayer` 디렉토리에 사전을 생성합니다.

### 사전 푸시

```bash
npx intlayer push
```

[intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_editor.md) 가 설치되어 있으면 사전을 편집기로 푸시할 수도 있습니다. 이 명령은 [https://intlayer.org/dashboard/content](https://intlayer.org/dashboard/content)에서 편집기가 사전을 사용할 수 있도록 허용합니다. 이렇게 하면 팀과 사전을 공유하고 애플리케이션 코드 편집 없이 내용을 수정할 수 있습니다.

##### 인수:

- `-d`, `--dictionaries`: 푸시할 사전의 ID. 지정하지 않으면 모든 사전이 푸시됩니다.
  > 예: `npx intlayer push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: 사전 푸시 후 로케일 디렉토리를 삭제할 것인지 질문을 건너뛰고 제거합니다. 기본적으로 사전이 로컬로 정의되어 있으면 원격 사전 내용을 덮어씁니다.
  > 예: `npx intlayer push -r`
- `-k`, `--keepLocaleDictionary`: 사전 푸시 후 로케일 디렉토리를 삭제할 것인지 질문을 건너뛰고 유지합니다. 기본적으로 사전이 로컬로 정의되어 있으면 원격 사전 내용을 덮어씁니다.
  > 예: `npx intlayer push -k`

### 원격 사전 가져오기

```bash
npx intlayer pull
```

[intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_editor.md) 가 설치되어 있으면 편집기에서 사전을 가져올 수도 있습니다. 이렇게 하면 애플리케이션의 필요에 따라 사전의 내용을 덮어쓸 수 있습니다.

##### 인수:

- `-d, --dictionaries`: 가져올 사전의 ID. 지정하지 않으면 모든 사전이 가져옵니다.
  > 예: `npx intlayer pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : 새 사전이 저장될 디렉토리의 경로. 지정하지 않으면 새 사전은 프로젝트의 `./intlayer-dictionaries` 디렉토리에 저장됩니다. 사전 내용에 `filePath` 필드가 지정된 경우, 이 인수를 고려하지 않고 지정된 `filePath` 디렉토리에 저장됩니다.
  > 예: `npx intlayer pull --newDictionariesPath ./my-dictionaries`

## `package.json`에서 intlayer 명령 사용:

```json
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull"
}
```
