---
createdAt: 2026-04-20
updatedAt: 2026-04-20
title: i18n 라이브러리 벤치마크
description: Intlayer 가 성능 및 번들 크기 측면에서 다른 i18n 라이브러리와 어떻게 비교되는지 알아보세요.
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - tanstack
  - intlayer
slugs:
  - doc
  - benchmark
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "벤치마크 초기화"
---

# Benchmark Bloom — 리포트

Benchmark Bloom은 여러 React 프레임워크와 로딩 전략에 걸쳐 i18n(국제화) 라이브러리가 실제 애플리케이션에 미치는 영향을 측정하는 성능 벤치마크 스위트입니다.

각 프레임워크에 대한 자세한 리포트와 기술 문서는 아래에서 확인할 수 있습니다.

- [**Next.js 벤치마크 리포트**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md)
- [**TanStack Start 벤치마크 리포트**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)

---

## 현재 결과

실시간 비교 및 요약 데이터는 [**인터랙티브 벤치마크 대시보드**](https://intlayer.org/benchmark)에서 확인하세요.
| `scoped-dynamic` | 높음 (누수 거의 없음) | 높음 |

`static`에서 `scoped-dynamic`으로 전환하면 일반적으로 사용되지 않는 콘텐츠가 60~90% 줄어들지만, 훨씬 더 많은 설정이 필요합니다. Intlayer와 같은 라이브러리는 scoped-dynamic 패턴을 자동화하므로 개발자는 번거로운 작업 없이 효율성을 얻을 수 있습니다.

### 누수 수치 읽는 법

페이지 누수가 **35%**라는 것은 해당 페이지를 위해 다운로드된 JavaScript의 35%에 다른 페이지의 문자열(사용자가 이 페이지에서 볼 수 없는 콘텐츠)이 포함되어 있음을 의미합니다. 400KB 페이지의 경우 약 140KB의 피할 수 있는 데이터입니다.

로케일 누수가 **10%**라는 것은 번들의 10%에 현재 사용자가 사용하지 않는 언어의 번역이 포함되어 있음을 의미합니다.

### 반응성 vs 렌더링 시간

- **E2E 반응성**: 네트워크, 프레임워크 오버헤드, DOM 업데이트를 포함한 전체 사용자 경험을 측정합니다.
- **React Profiler 시간**: React 트리 재렌더링 비용을 분리하여 측정합니다.

로케일 전환 시 네트워크 요청(새 로케일 파일 가져오기)이 포함되는 경우 라이브러리의 Profiler 시간은 짧지만 E2E 시간은 길 수 있습니다. 반대로, 업데이트를 효율적으로 일괄 처리하는 경우 Profiler 시간은 길더라도 여전히 빠르게 느껴질 수 있습니다.
