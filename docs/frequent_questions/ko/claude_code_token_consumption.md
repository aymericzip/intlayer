---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: 번역 생성 시 Claude Code 토큰 소모를 줄이는 방법
description: Claude Code로 번역할 때 토큰이 낭비되는 이유와 Intlayer가 대신 수행하는 작업(번역된 키 필터링, JSON 청크 분할, 마크다운 블록 단위 번역), claude setup-token으로 Claude 구독을 재사용하는 방법을 알아봅니다.
keywords:
  - claude code
  - tokens
  - 토큰 소모
  - setup-token
  - i18n
  - 국제화
  - 번역
  - fill
  - mcp
  - 에이전트
slugs:
  - frequent-questions
  - claude-code-token-consumption
author: aymericzip
---

# 번역 생성 시 Claude Code 토큰 소모를 줄이는 방법

## 문제 설명

Claude Code(또는 다른 코딩 에이전트)에 콘텐츠 번역을 직접 요청하는 것은 가장 비용이 많이 드는 방식입니다. 실행할 때마다 에이전트는 다음 작업을 반복해야 합니다.

- 이미 번역된 키까지 포함하여 전체 JSON 또는 콘텐츠 파일을 컨텍스트에 로드합니다.
- 관련 파일을 검색하여 콘텐츠의 위치와 구조를 파악합니다.
- 누락된 로케일이 무엇인지, 무엇을 생성해야 하는지 파악합니다.
- 매번 커스텀 지침("URL은 이런 방식으로 변환", "브랜드 이름은 영어로 유지", "친근한 어조 사용")을 다시 읽습니다.
- 변경되지 않은 부분을 포함하여 파일 전체를 다시 작성합니다.

이 모든 내용이 매 턴마다 다시 전송되므로 비용은 `콘텐츠 크기 × 로케일 수 × 턴 수`에 비례하여 증가하며, 서식이나 키의 불일치를 수작업으로 감지해야 합니다.

## Intlayer가 대신 처리하는 작업

Intlayer의 핵심 가치는 번역 전용 파이프라인을 통해 에이전트 외부에서 이 작업을 수행한다는 점입니다.

- **기존 번역 필터링**으로 토큰 사용량을 제한합니다. JSON에서 이미 번역된 키는 제거되고, 누락된 키만 모델로 전달됩니다.
- **마크다운을 블록 단위로 번역합니다.** 문서의 경우 [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/doc-translate.md) 및 [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/doc-review.md)가 각 블록을 기본 문서와 비교하여 이미 번역되었거나 변경되지 않은 블록을 건너뜁니다.
- **JSON이 너무 큰 경우 청크로 분할**하여 컨텍스트 윈도우의 최적 구간에 머무릅니다.
- **JSON 평탄화 및 재구성**을 통해 토큰 소비를 최적화합니다.
- **커스텀 프롬프트 삽입**을 지원하여 브랜드와 용어에 대한 특정 규칙(`applicationContext`, `--custom-instructions`)을 매 대화마다 반복하지 않고 한 번만 작성할 수 있습니다.
- **구조 유효성 검사**를 수행하여 일관성을 보장하고 키 누락을 방지하며, 서식(마크다운, HTML, 삽입 태그, 복수형)을 보존합니다.
- **재시도(retry) 관리**를 구현하여 출력이 잘못된 형식일 때 자동으로 복구합니다.
- **요청 큐잉 및 병렬화**를 통해 파일, 청크, 로케일 전반의 처리 속도를 극대화합니다.

이 중 어느 것도 에이전트의 컨텍스트를 거치지 않습니다. 기본 원칙은 에이전트가 **무엇을** 국제화할지 결정하게 하고, 반복적인 작업은 Intlayer에 맡기는 것입니다.

## 해결 방법

### 1. 추출 작업을 `intlayer extract`에 위임

에이전트에게 각 컴포넌트를 수작업으로 다시 작성하도록 요청하는 대신 [`extract`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md) 명령을 실행하게 하세요. 전체 파일을 에이전트 컨텍스트에 올리지 않고도 하드코딩된 문자열을 컴포넌트 옆의 `.content` 파일로 옮겨줍니다.

```bash
npx intlayer extract --file src/components/Header.tsx
```

### 2. 번역 작업을 `intlayer fill`에 위임

에이전트에게 직접 번역을 요청하지 마세요. [`fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md) 명령은 위에서 설명한 파이프라인을 적용합니다. 누락된 키만 전송하고 청크로 나누며 로케일을 병렬로 실행하여 결과를 콘텐츠 파일에 직접 반영합니다.

```bash
npx intlayer fill
```

몇 가지 플래그를 통해 실행 범위를 최소화할 수 있습니다.

- `--git-diff`(또는 `--uncommitted`): 현재 브랜치에서 변경된 딕셔너리만 처리합니다.
- `--file` 또는 `--keys`: 특정 콘텐츠 파일을 지정합니다.
- `--output-locales fr es`: 현재 실제로 필요한 로케일로만 실행을 제한합니다.
- `--skip-metadata`: 제목, 설명, 태그 생성을 건너뜁니다.
- `--data-serialization toon`: 모델에 더 간결한 페이로드를 전달합니다(토큰 절약, 출력 일관성 소폭 변동 가능).

```bash
npx intlayer fill --git-diff --output-locales fr es --skip-metadata
```

### 3. `doc translate` 및 `doc review`로 마크다운 번역

에이전트에게 `.md` 파일 번역을 요청하면 수정할 때마다 각 로케일별 전체 문서를 붙여넣어야 합니다. 반면 [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/doc-translate.md) 및 [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/doc-review.md) 명령은 블록 단위로 동작합니다.

번역 대상 파일이 아직 존재하지 않는 경우 `doc translate`를 사용하세요. 마크다운을 청크로 나누고 병렬로 번역하여 대상 파일을 생성합니다.

```bash
npx intlayer doc translate --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

번역 대상 파일이 이미 존재하는 경우 `doc review`를 사용하세요. 각 블록을 기본 문서와 비교하여 이미 번역되었거나 변경되지 않은 블록은 건너뛰고, 차이가 있는 블록만 전달합니다.

```bash
npx intlayer doc review --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

두 명령 모두 프롬프트마다 반복할 필요 없이 규칙을 한 번만 전달하면 됩니다.

```bash
npx intlayer doc translate --custom-instructions "Do not translate URLs. Keep the markdown structure and the code blocks untouched."
```

Intlayer 측의 AI 호출 없이 에이전트가 검토 흐름에 참여해야 할 때는 `doc review`의 두 가지 모드가 유용합니다.

- `--mode report`: 주의가 필요한 블록을 줄 번호와 함께 출력하여 에이전트가 해당 블록만 수정할 수 있도록 합니다.
- `--mode synthesis`: 최신 상태인 문서와 아직 편집할 블록이 남아있는 문서의 목록만 출력합니다.

```bash
npx intlayer doc review --mode report --locales fr
```

### 4. 에이전트가 MCP 서버를 통해 CLI를 호출하도록 설정

[Intlayer MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)를 사용하면 에이전트가 최신 문서를 기반으로 응답하며, 대화 내에서 직접 번역 로직을 구현하는 대신 `intlayer fill` 또는 `intlayer doc review`를 직접 실행합니다.

```bash
claude mcp add intlayer npx -y @intlayer/mcp
```

`npx intlayer init skills`로 [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)를 설치하면 에이전트가 Intlayer API를 임의로 추측하거나 작업마다 문서를 다시 읽는 낭비도 방지할 수 있습니다.

### 5. `claude setup-token`으로 Claude 구독 재사용

대화형 Claude Code 세션에서 i18n 설정을 실행하면 전체 대화 내역이 컨텍스트에 누적됩니다. 부담이 큰 작업은 짧은 헤드리스(headless) 세션으로 전환하여 실행하세요.

Claude 구독에서 장기 지속 토큰을 생성합니다.

```bash
claude setup-token
```

이를 `CLAUDE_CODE_OAUTH_TOKEN`으로 저장(환경 변수 `.env` 파일 또는 CI 시크릿)한 뒤, Intlayer 명령을 실행하는 단발성 세션에서 재사용합니다.

```bash
CLAUDE_CODE_OAUTH_TOKEN=... claude -p "Run npx intlayer extract on src/components, then npx intlayer fill --uncommitted"
```

해당 세션은 전체 대화 내역 없이 해당 프롬프트와 명령 출력만 담게 됩니다. 동일한 토큰을 [Claude Code GitHub Action](https://github.com/anthropics/claude-code-action)에서도 사용하여 모든 풀 리퀘스트마다 `intlayer fill`을 실행할 수 있습니다.

> `claude setup-token`으로 발급된 토큰은 Claude Code 전용 인증 토큰입니다. `ai.apiKey`의 Anthropic API 키로는 사용할 수 없습니다. 번역 자체에는 [Intlayer 계정](https://app.intlayer.org)(무료 티어 포함)이나 [`ai`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md#ai-configuration)에 설정한 자체 제공업체 API 키가 사용됩니다.

## 요약

| 작업             | 담당                     | 에이전트 컨텍스트 내 토큰 |
| ---------------- | ------------------------ | ------------------------- |
| 현지화 대상 결정 | Claude Code              | 낮음                      |
| 문자열 추출      | `intlayer extract`       | 없음                      |
| 콘텐츠 번역      | `intlayer fill`          | 없음                      |
| 문서 번역        | `intlayer doc translate` | 없음                      |
| 문서 업데이트    | `intlayer doc review`    | 없음                      |
| 명령 실행        | 헤드리스 Claude Code     | 프롬프트 + 명령 출력      |
