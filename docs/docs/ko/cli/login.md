---
createdAt: 2025-12-16
updatedAt: 2025-12-16
title: CLI - 로그인
description: Intlayer CLI의 login 명령을 사용하여 Intlayer CMS에 인증하고 액세스 자격증명을 얻는 방법을 알아보세요.
keywords:
  - CLI
  - Login
  - Authentication
  - CMS
  - Intlayer
  - Credentials
slugs:
  - doc
  - concept
  - cli
  - login
---

# Intlayer CLI 로그인 명령

---

## 설명

`login` 명령은 Intlayer CLI에서 Intlayer CMS에 인증할 수 있게 해줍니다. 이 명령은 기본 브라우저를 자동으로 열어 인증 절차를 완료하고 Intlayer 서비스를 사용하기 위한 필요한 자격증명(Client ID 및 Client Secret)을 수신합니다.

## 사용법

```bash
npx intlayer login [options]
```

또는

```bash
intlayer login [options]
```

## 옵션

### `--cms-url <url>`

인증을 위해 연결할 Intlayer CMS의 URL을 지정합니다.

- **타입**: `string`
- **기본값**: `intlayer.config.*`에 설정된 값 또는 `https://intlayer.org`
- **예제**:

```bash
npx intlayer login --cms-url https://intlayer.org
```

### 구성 옵션

일반적인 구성 옵션도 사용할 수 있습니다:

- `--env-file <path>`: 환경 파일의 경로
- `-e, --env <env>`: 실행 환경
- `--base-dir <dir>`: 프로젝트의 기본 디렉터리
- `--verbose`: 자세한 출력 활성화 (기본값: true)
- `--prefix <prefix>`: 로그 접두사

## 동작 방식

1. **로컬 서버 시작**: 명령은 CMS로부터 자격증명을 수신하기 위해 무작위 포트에서 로컬 HTTP 서버를 시작합니다

인증을 위해 연결할 Intlayer CMS의 URL을 지정합니다.

- **형식**: `string`
- **기본값**: `intlayer.config.*`에 구성된 값 또는 `https://intlayer.org`
- **예제**:

```bash
npx intlayer login --cms-url https://intlayer.org
```

### 구성 옵션

다음과 같은 공통 구성 옵션도 사용할 수 있습니다:

- `--env-file <path>`: 환경 파일의 경로
- `-e, --env <env>`: 실행 환경
- `--base-dir <dir>`: 프로젝트의 기본 디렉터리
- `--verbose`: 자세한 출력 활성화 (기본값: true)
- `--prefix <prefix>`: 로그 접두사

## 동작 방식

1. **로컬 서버 시작**: 이 명령은 CMS로부터 자격증명을 수신하기 위해 임의의 포트에서 로컬 HTTP 서버를 시작합니다
2. **브라우저 열기**: 명령어는 기본 브라우저를 자동으로 열어 CMS 로그인 URL로 이동합니다
3. **인증**: 브라우저에서 Intlayer 계정으로 인증을 완료합니다
4. **자격증명 수신**: 로컬 서버는 CMS로부터 Client ID 및 Client Secret을 수신합니다
5. **지침**: 명령어가 프로젝트에서 자격증명을 구성하는 방법에 대한 지침을 표시합니다

## 출력

성공적으로 로그인한 후, 명령어는 다음을 표시합니다:

1. **수신된 자격증명** (Client ID 및 Client Secret)
2. **`.env` 파일에 대한 지침**:

```bash
INTLAYER_CLIENT_ID=your_client_id
INTLAYER_CLIENT_SECRET=your_client_secret
```

3. **Intlayer 구성 파일에 대한 지침**:

```typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
```

## 수동 구성

브라우저가 자동으로 열리지 않는 경우, 터미널에 표시된 URL을 수동으로 방문할 수 있습니다.

## 예제

### 사용자 정의 CMS URL로 로그인

```bash
npx intlayer login --cms-url https://custom-cms.example.com
```

### 지정된 환경 파일로 로그인

```bash
npx intlayer login --env-file .env.production
```

### Verbose 모드로 로그인

```bash
npx intlayer login --verbose
```

## 문제 해결

### 브라우저가 열리지 않는 경우

브라우저가 자동으로 열리지 않으면, 터미널에 표시된 URL을 복사하여 브라우저에 수동으로 붙여 넣어 열어보세요.

### 연결 문제

연결 문제가 발생하면 다음을 확인하세요:

1. CMS URL이 올바른지
2. 인터넷 연결이 정상인지
3. 연결을 차단하는 방화벽이 없는지
4. 인터넷 연결이 정상적으로 작동하는지 확인하세요
5. 방화벽이 연결을 차단하고 있지 않은지 확인하세요

### 자격 증명을 받지 못한 경우

자격 증명을 받지 못한 경우:

1. 브라우저에서 인증 과정을 완료했는지 확인하세요
2. 로컬 포트가 차단되어 있지 않은지 확인하세요
3. 명령을 다시 시도하세요

## 다음 단계

로그인 완료 후:

1. 자격 증명을 `.env` 파일에 추가하세요
2. 자격 증명을 사용하여 `intlayer.config.*` 파일을 구성하세요
3. 딕셔너리 관리를 위해 CLI 명령어를 사용하세요:
   - [`npx intlayer push`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/push.md) - 딕셔너리를 CMS에 푸시합니다
   - [`npx intlayer pull`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/pull.md) - CMS에서 딕셔너리를 가져옵니다
   - [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md) - 누락된 번역을 채웁니다
   - [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md) - 누락된 번역 채우기

## 참고

- [CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)
- [Intlayer 구성](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)
