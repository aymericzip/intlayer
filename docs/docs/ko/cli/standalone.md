---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: 독립 실행형 번들 (Standalone Bundle)
description: 애플리케이션 콘텐츠의 독립 실행형 JavaScript 번들을 만드는 방법을 알아봅니다.
keywords:
  - Standalone
  - Bundle
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "독립 실행형 명령어 문서 초기화"
---

# 독립 실행형 번들 (Standalone Bundle)

`standalone` 명령어를 사용하면 Intlayer와 지정된 다른 패키지를 포함하는 독립 실행형 JavaScript 번들을 만들 수 있습니다. 이는 간단한 HTML/JS 애플리케이션과 같이 패키지 관리자나 번들러가 없는 환경에서 Intlayer를 사용하는 데 특히 유용합니다.

번들은 [esbuild](https://esbuild.github.io/)를 사용하여 요청된 패키지와 그 종속성을 단일 파일로 결합하며, 이 파일은 모든 웹 프로젝트에서 쉽게 가져올 수 있습니다.

## 사용법

```bash
npx intlayer standalone --packages [패키지...] [옵션]
```

## 옵션

- `-o, --outfile [outfile]` - 선택 사항. 출력 파일 이름입니다. 기본값: `intlayer-bundle.js`.
- `--packages [패키지...]` - 필수 사항. 번들에 포함할 패키지 목록입니다 (예: `intlayer`, `vanilla-intlayer`).
- `--version [version]` - 선택 사항. 번들링할 패키지의 버전입니다. 지정하지 않으면 기본적으로 Intlayer CLI의 버전이 사용됩니다.
- `--minify` - 선택 사항. 출력을 압축(minify)할지 여부입니다. 기본값: `true`.
- `--platform [platform]` - 선택 사항. 번들의 대상 플랫폼입니다 (예: `browser`, `node`). 기본값: `browser`.
- `--format [format]` - 선택 사항. 번들의 출력 형식입니다 (예: `esm`, `cjs`, `iife`). 기본값: `esm`.

## 공통 옵션

- `--env-file [envFile]` - 환경 파일입니다.
- `-e, --env [env]` - 환경입니다.
- `--base-dir [baseDir]` - 기본 디렉토리입니다.
- `--no-cache` - 캐시를 비활성화합니다.
- `--verbose` - 상세 출력을 표시합니다.

## 예시:

### Vanilla JS용 번들 생성:

```bash
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

이렇게 하면 `intlayer`와 `vanilla-intlayer` 패키지가 모두 포함된 `intlayer.js` 파일이 생성되며, 압축된 ESM 형식으로 브라우저에서 `<script>` 태그를 통해 사용할 준비가 됩니다.

### 특정 버전 번들링:

```bash
npx intlayer standalone --packages intlayer --version 8.6.4
```

### 다른 형식으로 번들링:

```bash
npx intlayer standalone --packages intlayer --format iife
```

## 작동 원리:

1. **임시 환경 생성** - 종속성을 관리하기 위한 임시 디렉토리를 설정합니다.
2. **패키지 설치** - `npm` 또는 `bun`(사용 가능한 경우)을 사용하여 요청된 패키지와 그 종속성을 설치합니다.
3. **진입점 생성** - 요청된 모든 패키지를 내보내고 브라우저에서 실행될 때 글로벌 변수로 노출하는 임시 진입점 파일을 만듭니다.
4. **esbuild로 번들링** - esbuild를 사용하여 모든 것을 단일 파일로 결합하고, 요청에 따라 압축 및 서식 지정을 적용합니다.
5. **파일 생성** - 결과물 번들을 지정된 출력 경로에 씁니다.

## 글로벌 변수

번들이 브라우저에 로드되면 요청된 패키지를 `window` 객체의 글로벌 변수로 노출합니다. 변수 이름은 패키지 이름에서 파생됩니다 (예: `intlayer`는 `Intlayer`, `vanilla-intlayer`는 `VanillaIntlayer`가 됨).

```javascript
// 번들에서 Intlayer에 액세스
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```
