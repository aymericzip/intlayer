---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 로케일 매퍼
description: 로케일 매퍼가 어떻게 작동하는지 알아보세요. 애플리케이션에서 로케일 매퍼가 사용하는 단계를 확인하세요. 다양한 패키지가 하는 역할을 확인하세요.
keywords:
  - 로케일 매퍼
  - 시작하기
  - Intlayer
  - 애플리케이션
  - 패키지
slugs:
  - doc
  - locale-mapper
---

# 로케일 매퍼

로케일 매퍼는 Intlayer 애플리케이션에서 국제화 데이터를 다루는 데 도움을 주는 강력한 유틸리티입니다. 로케일별 데이터를 변환하고 조직하는 세 가지 주요 함수인 `localeMap`, `localeFlatMap`, `localeRecord`를 제공합니다.

## 로케일 매퍼 작동 방식

로케일 매퍼는 로케일에 관한 모든 필요한 정보를 포함하는 `LocaleData` 객체를 기반으로 작동합니다:

```typescript
type LocaleData = {
  locale: LocalesValues; // 현재 로케일 코드 (예: 'en', 'fr')
  defaultLocale: LocalesValues; // 기본 로케일 코드
  isDefault: boolean; // 이 로케일이 기본 로케일인지 여부
  locales: LocalesValues[]; // 사용 가능한 모든 로케일 배열
  urlPrefix: string; // 이 로케일의 URL 접두사 (예: '/fr' 또는 '')
};
```

매퍼 함수는 구성에 있는 각 로케일에 대해 이 데이터를 자동으로 생성하며, 다음 사항을 고려합니다:

- 구성된 로케일 목록
- 기본 로케일 설정
- 기본 로케일이 URL에 접두사로 붙어야 하는지 여부

## 핵심 함수

### `localeMap`

매퍼 함수를 사용하여 각 로케일을 단일 객체로 변환합니다.

```typescript
localeMap<T>(
  mapper: (locale: LocaleData) => T,
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**예제: 라우트 객체 생성하기**

```typescript
import { localeMap } from "@intlayer/core";

const routes = localeMap((localizedData) => ({
  path: localizedData.urlPrefix,
  name: localizedData.locale,
  isDefault: localizedData.isDefault,
  locales: localizedData.locales,
  defaultLocale: localizedData.defaultLocale,
}));

// 결과:
// [
//   { path: '/', name: 'en', isDefault: true, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/fr', name: 'fr', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/es', name: 'es', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' }
// ]
```

### `localeFlatMap`

`localeMap`과 유사하지만, 매퍼 함수가 객체 배열을 반환하며 이 배열이 단일 배열로 평탄화됩니다.

```typescript
localeFlatMap<T>(
  mapper: (locale: LocaleData) => T[],
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**예제: 로케일별로 여러 경로 생성하기**

```typescript
import { localeFlatMap } from "@intlayer/core";

const routes = localeFlatMap((localizedData) => [
  {
    path: localizedData.urlPrefix,
    name: localizedData.locale,
    isDefault: localizedData.isDefault,
  },
  {
    path: `${localizedData.urlPrefix}/about`,
    name: `${localizedData.locale}-about`,
    isDefault: localizedData.isDefault,
  },
]);

// 결과:
// [
//   { path: '/', name: 'en', isDefault: true },
  { path: '/about', name: 'en-about', isDefault: true },
  { path: '/fr', name: 'fr', isDefault: false },
  { path: '/fr/about', name: 'fr-about', isDefault: false },
  { path: '/es', name: 'es', isDefault: false },
  { path: '/es/about', name: 'es-about', isDefault: false }
]
```

### `localeRecord`

각 로케일이 키가 되고, 매퍼 함수에 의해 변환된 값을 매핑하는 레코드 객체를 생성합니다.

```typescript
localeRecord<T>(
  mapper: (locale: LocaleData) => T,
  locales?: Locales[],
  defaultLocale?: Locales,
  prefixDefault?: boolean
): Record<Locales, T>
```

**예제: 번역 파일 로딩하기**

```typescript
import { localeRecord } from "@intlayer/core";

const translations = localeRecord(({ locale }) =>
  require(`./translations/${locale}.json`)
);

// 결과:
// {
//   en: { welcome: 'Welcome', hello: 'Hello' },
//   fr: { welcome: 'Bienvenue', hello: 'Bonjour' },
//   es: { welcome: 'Bienvenido', hello: 'Hola' }
// }
```

## 로케일 매퍼 설정하기

로케일 매퍼는 자동으로 Intlayer 설정을 사용하지만, 매개변수를 전달하여 기본값을 재정의할 수 있습니다:

### 기본 설정 사용하기

```typescript
import { localeMap } from "@intlayer/core";

// intlayer.config.ts의 설정을 사용합니다
const routes = localeMap((data) => ({
  path: data.urlPrefix,
  locale: data.locale,
}));
```

### 설정 재정의하기

```typescript
import { localeMap } from "@intlayer/core";

// 로케일과 기본 로케일을 재정의합니다
const customRoutes = localeMap(
  (data) => ({ path: data.urlPrefix, locale: data.locale }),
  ["en", "fr", "de"], // 사용자 지정 로케일
  "en", // 사용자 지정 기본 로케일
  true // URL에 기본 로케일 접두사 추가
);
```

## 고급 사용 예제

### 내비게이션 메뉴 생성

```typescript
import { localeMap } from "@intlayer/core";

const navigationItems = localeMap((data) => ({
  label: data.locale.toUpperCase(), // 로케일을 대문자로 표시
  href: data.urlPrefix || "/", // URL 접두사 또는 기본 경로
  isActive: data.isDefault, // 기본 로케일 여부
  flag: `/flags/${data.locale}.svg`, // 로케일에 해당하는 국기 아이콘 경로
}));
```

### 사이트맵 데이터 생성

```typescript
import { localeFlatMap } from "@intlayer/core";

const sitemapUrls = localeFlatMap((data) => [
  {
    url: `${data.urlPrefix}/`, // URL 경로
    lastmod: new Date().toISOString(), // 마지막 수정 날짜
    changefreq: "daily", // 변경 빈도
    priority: data.isDefault ? 1.0 : 0.8, // 우선순위
  },
  {
    url: `${data.urlPrefix}/about`,
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: data.isDefault ? 0.8 : 0.6,
  },
]);
```

### 동적 번역 로딩

```typescript
import { localeRecord } from "@intlayer/core";

const translationModules = localeRecord(({ locale }) => ({
  messages: import(`./locales/${locale}/messages.json`),
  validation: import(`./locales/${locale}/validation.json`),
  metadata: {
    locale,
    direction: ["ar", "he", "fa"].includes(locale) ? "rtl" : "ltr", // 오른쪽에서 왼쪽으로 읽는 언어인지 여부
  },
}));
```

## 구성 통합

Locale Mapper는 Intlayer 구성과 원활하게 통합됩니다:

- **Locales**: `configuration.internationalization.locales`를 자동으로 사용합니다
- **기본 로케일**: `configuration.internationalization.defaultLocale`를 사용합니다
- **URL 접두사**: `configuration.middleware.prefixDefault`를 준수합니다

이것은 애플리케이션 전반에 걸쳐 일관성을 보장하고 구성 중복을 줄여줍니다.

## 문서 이력

| 버전  | 날짜       | 변경 사항             |
| ----- | ---------- | --------------------- |
| 5.7.2 | 2025-07-27 | 로케일 매퍼 문서 추가 |
