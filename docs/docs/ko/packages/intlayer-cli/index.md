# intlayer-cli: NPM 패키지를 사용하여 Intlayer CLI 사용하기

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React, Express.js와 같은 프레임워크와 호환됩니다.

**`intlayer-cli`** 패키지는 `@intlayer/cli` 패키지를 소비하고 `intlayer` 명령줄 인터페이스에서 사용할 수 있도록 하는 NPM 패키지입니다.

> 이 패키지는 [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/ko/packages/intlayer/index.md) 패키지가 설치된 경우 필요하지 않습니다. `intlayer` 패키지와 비교했을 때, `intlayer-cli` 패키지는 CLI 도구만 포함하고 `@intlayer/core` 종속성이 없는 더 가벼운 패키지입니다.

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## 사용법

다음은 `intlayer-cli` 패키지를 사용하는 예제입니다:

```bash
npx intlayer dictionaries build
```

## CLI 명령어

Intlayer는 다음을 수행할 수 있는 CLI 도구를 제공합니다:

- 콘텐츠 선언을 감사하고 누락된 번역을 완성
- 콘텐츠 선언에서 사전을 빌드
- CMS에서 로컬 프로젝트로 원격 사전을 푸시 및 풀

자세한 내용은 [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)를 참조하세요.
