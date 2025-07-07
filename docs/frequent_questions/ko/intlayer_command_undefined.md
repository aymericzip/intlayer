---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Intlayer 명령어 정의되지 않음
description: intlayer 명령어 정의되지 않음 오류를 해결하는 방법을 알아보세요.
keywords:
  - intlayer
  - 명령어
  - 정의되지 않음
  - 오류
  - vscode
  - 확장
  - 플러그인
  - 프레임워크
  - next.js
  - vite
slugs:
  - 문서
  - FAQ
  - intlayer-명령어-정의되지-않음
---

# Intlayer 명령어 정의되지 않음

## 개요

Intlayer CLI는 사전 구축, 번역 푸시 등 intlayer 콘텐츠를 편리하게 제어할 수 있는 방법을 제공합니다. 그러나 프로젝트가 작동하는 데 필수적인 것은 아닙니다. 만약 Next.js용 `withIntlayer()`나 Vite용 `intlayerPlugin()`과 같은 번들러 플러그인을 사용하고 있다면, Intlayer는 앱 빌드 또는 개발 서버 시작 시 자동으로 사전을 빌드합니다. 개발 모드에서는 변경 사항을 감지하여 콘텐츠 선언 파일을 자동으로 재빌드하기도 합니다.

intlayer 명령어에 접근하는 방법은 다음과 같습니다:

- `intlayer` CLI 명령어를 직접 사용하는 방법
- [VSCode 확장](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md) 사용
- `@intlayer/cli` SDK 사용

## 문제점

`intlayer` 명령어를 사용하려고 할 때 다음과 같은 오류가 발생할 수 있습니다:

```bash
'intlayer'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램 또는 배치 파일로 인식되지 않습니다.
```

## 해결 방법

다음 해결 방법을 순서대로 시도해 보세요:

1. **명령어가 설치되어 있는지 확인**

```bash
npx intlayer -h
```

예상 출력:

```bash
Usage: intlayer [options] [command]

Intlayer CLI

Options:
    -V, --version            버전 번호 출력
    -h, --help               명령어 도움말 표시

Commands:
    dictionary|dictionaries  사전 관련 작업
    configuration|config     설정 관련 작업
    help [command]           명령어 도움말 표시
```

2. **intlayer-cli 패키지를 전역으로 설치**

```bash
npm install intlayer-cli -g -g
```

> 이미 `intlayer` 패키지를 설치한 경우에는 필요하지 않을 수 있습니다.

3. **패키지를 전역으로 설치**

```bash
npm install intlayer -g
```

4. **터미널 재시작**
   새로운 명령어를 인식하려면 터미널을 재시작해야 할 때가 있습니다.

5. **정리 후 재설치**
   위의 방법들이 효과가 없으면 다음을 시도하세요:

```bash
rm -rf node_modules package-lock.json
npm install
```

6. **설치 파일 확인**
   문제가 계속되면 다음 파일들이 존재하는지 확인하세요:

   - `node_modules/intlayer/dist/cjs/cli.cjs`
   - `node_modules/intlayer/package.json` (`bin` 필드가 `./dist/cjs/cli.cjs`를 참조해야 함)

7. **PATH 환경 변수 확인**
   npm 전역 bin 디렉토리가 PATH에 포함되어 있는지 확인하세요:

```bash
# Unix 기반 시스템(macOS/Linux)의 경우
echo $PATH
# /usr/local/bin 또는 ~/.npm-global/bin과 같은 경로가 포함되어야 합니다

# Windows의 경우
echo %PATH%
# npm 글로벌 bin 디렉토리가 포함되어야 합니다
```

8. **전체 경로를 사용하여 npx 실행**
   명령어가 여전히 인식되지 않는 경우, 전체 경로를 사용하여 npx를 실행해 보세요:

```bash
npx ./node_modules/intlayer/ dictionaries build
```

9. **충돌하는 설치 확인**

```bash
# 전역에 설치된 모든 패키지 목록 확인
npm list -g --depth=0

# 충돌하는 전역 설치 제거
npm uninstall -g intlayer
npm uninstall -g intlayer-cli
# 그런 다음 재설치
npm install -g intlayer
```

10. **Node.js 및 npm 버전 확인**
    호환 가능한 버전을 사용하고 있는지 확인하세요:

```bash
node --version
npm --version
```

    구버전을 사용 중이라면 Node.js와 npm을 업데이트하는 것을 고려하세요.

11. **권한 문제 확인하기**  
    권한 오류가 발생하는 경우:

```bash
# 유닉스 기반 시스템용
sudo npm install -g intlayer

# 또는 npm 기본 디렉토리 변경
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
# ~/.profile 또는 ~/.bashrc에 다음을 추가하세요:
export PATH=~/.npm-global/bin:$PATH
```
