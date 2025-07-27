---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Mapeador de Locale
description: Descubra como o Mapeador de Locale funciona. Veja os passos usados pelo Mapeador de Locale na sua aplicação. Veja o que os diferentes pacotes fazem.
keywords:
  - Mapeador de Locale
  - Começar
  - Intlayer
  - Aplicação
  - Pacotes
slugs:
  - doc
  - locale-mapper
---

# Mapeador de Locale

O Mapeador de Locale é uma ferramenta poderosa que ajuda você a trabalhar com dados de internacionalização na sua aplicação Intlayer. Ele fornece três funções principais para transformar e organizar dados específicos de locale: `localeMap`, `localeFlatMap` e `localeRecord`.

## Como o Mapeador de Locale Funciona

O Mapeador de Locale opera sobre um objeto `LocaleData` que contém todas as informações necessárias sobre um locale:

```typescript
type LocaleData = {
  locale: LocalesValues; // Código do locale atual (ex.: 'en', 'fr')
  defaultLocale: LocalesValues; // Código do locale padrão
  isDefault: boolean; // Indica se este é o locale padrão
  locales: LocalesValues[]; // Array de todos os locales disponíveis
  urlPrefix: string; // Prefixo de URL para este locale (ex.: '/fr' ou '')
};
```

As funções do mapeador geram automaticamente esses dados para cada locale na sua configuração, levando em consideração:

- Sua lista de locales configurados
- A configuração do locale padrão
- Se o locale padrão deve ser prefixado nas URLs

## Funções Principais

### `localeMap`

Transforma cada locale em um único objeto usando uma função mapeadora.

```typescript
localeMap<T>(
  mapper: (locale: LocaleData) => T,
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Exemplo: Criando objetos de rotas**

```typescript
import { localeMap } from "@intlayer/core";

const routes = localeMap((localizedData) => ({
  path: localizedData.urlPrefix,
  name: localizedData.locale,
  isDefault: localizedData.isDefault,
  locales: localizedData.locales,
  defaultLocale: localizedData.defaultLocale,
}));

// Resultado:
// [
//   { path: '/', name: 'en', isDefault: true, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/fr', name: 'fr', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/es', name: 'es', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' }
// ]
```

### `localeFlatMap`

Similar to `localeMap`, but the mapper function returns an array of objects that gets flattened into a single array.

```typescript
localeFlatMap<T>(
  mapper: (locale: LocaleData) => T[],
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Exemplo: Criando múltiplas rotas por localidade**

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

// Resultado:
// [
//   { path: '/', name: 'en', isDefault: true },
//   { path: '/about', name: 'en-about', isDefault: true },
//   { path: '/fr', name: 'fr', isDefault: false },
//   { path: '/fr/about', name: 'fr-about', isDefault: false },
//   { path: '/es', name: 'es', isDefault: false },
//   { path: '/es/about', name: 'es-about', isDefault: false }
// ]
```

### `localeRecord`

Cria um objeto record onde cada localidade é uma chave que mapeia para um valor transformado pela função mapper.

```typescript
localeRecord<T>(
  mapper: (locale: LocaleData) => T,
  locales?: Locales[],
  defaultLocale?: Locales,
  prefixDefault?: boolean
): Record<Locales, T>
```

**Exemplo: Carregando arquivos de tradução**

```typescript
import { localeRecord } from "@intlayer/core";

const translations = localeRecord(({ locale }) =>
  require(`./translations/${locale}.json`)
);

// Resultado:
// {
//   en: { welcome: 'Welcome', hello: 'Hello' },
//   fr: { welcome: 'Bienvenue', hello: 'Bonjour' },
//   es: { welcome: 'Bienvenido', hello: 'Hola' }
// }
```

## Configurando o Locale Mapper

O Locale Mapper usa automaticamente a configuração do seu Intlayer, mas você pode sobrescrever os padrões passando parâmetros:

### Usando Configuração Padrão

```typescript
import { localeMap } from "@intlayer/core";

// Usa a configuração do intlayer.config.ts
const routes = localeMap((data) => ({
  path: data.urlPrefix,
  locale: data.locale,
}));
```

### Sobrescrevendo a Configuração

```typescript
import { localeMap } from "@intlayer/core";

// Sobrescreve os locais e o local padrão
const customRoutes = localeMap(
  (data) => ({ path: data.urlPrefix, locale: data.locale }),
  //  ["en", "fr", "de"], // Locais personalizados
  "en", // Local padrão personalizado
  true // Prefixar local padrão nas URLs
);
```

## Exemplos Avançados de Uso

### Criando Menus de Navegação

```typescript
import { localeMap } from "@intlayer/core";

const navigationItems = localeMap((data) => ({
  label: data.locale.toUpperCase(),
  href: data.urlPrefix || "/",
  isActive: data.isDefault,
  flag: `/flags/${data.locale}.svg`,
}));
```

### Gerando Dados para Sitemap

```typescript
import { localeFlatMap } from "@intlayer/core";

const sitemapUrls = localeFlatMap((data) => [
  {
    url: `${data.urlPrefix}/`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: data.isDefault ? 1.0 : 0.8,
  },
  {
    url: `${data.urlPrefix}/about`,
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: data.isDefault ? 0.8 : 0.6,
  },
]);
```

### Carregamento Dinâmico de Traduções

```typescript
import { localeRecord } from "@intlayer/core";

const translationModules = localeRecord(({ locale }) => ({
  messages: import(`./locales/${locale}/messages.json`),
  validation: import(`./locales/${locale}/validation.json`),
  metadata: {
    locale,
    direction: ["ar", "he", "fa"].includes(locale) ? "rtl" : "ltr",
  },
}));
```

## Integração com Configuração

O Locale Mapper integra-se perfeitamente com a sua configuração Intlayer:

- **Locales**: Usa automaticamente `configuration.internationalization.locales`
- **Local Padrão**: Usa `configuration.internationalization.defaultLocale`
- **Prefixo de URL**: Respeita `configuration.middleware.prefixDefault`

Isso garante consistência em toda a sua aplicação e reduz a duplicação de configuração.

## Histórico da Documentação

| Versão | Data       | Alterações                             |
| ------ | ---------- | -------------------------------------- |
| 5.7.2  | 2025-07-27 | Adiciona documentação do locale mapper |
