---
createdAt: 2026-06-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer scan: auditar i18n e SEO de um site"
description: Saiba como usar o comando scan do CLI Intlayer para medir o tamanho da página e auditar a saúde de i18n/SEO de qualquer website.
keywords:
  - Scan
  - SEO
  - i18n
  - Auditoria
  - CLI
  - Intlayer
  - Tamanho de página
  - Bundle
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 9.5.11
    date: 2026-09-26
    changes: "Detetar a estratégia de roteamento e a stack i18n (bibliotecas, TMS); adicionar verificações de reciprocidade hreflang, og:locale e seletor de idioma; seguir sitemaps de robots.txt, índices de sitemaps e sitemaps comprimidos com gzip"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Adicionar o flag `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Adicionar comando scan"
author: aymericzip
---

# Escanear Website

O comando `scan` obtém um URL público, mede o tamanho total da página e audita a saúde de i18n e SEO da página. Produz um relatório com pontuação (0–100) que cobre atributos HTML, links canónicos, tags hreflang e os respetivos links de retorno, robots.txt, sitemaps, links internos localizados e o peso de cada idioma no bundle JavaScript.

Também informa como o site codifica a locale nos seus URLs (estratégia de roteamento) e que framework, biblioteca i18n, sistema de gestão de traduções (TMS) ou proxy de tradução utiliza. As mesmas verificações alimentam o [scanner SEO i18n online](https://intlayer.org/i18n-seo-scanner) e a extensão do Chrome do Intlayer.

Não são necessárias dependências adicionais. Quando o [puppeteer](https://pptr.dev/) está instalado, o scan pode capturar partes de JavaScript carregadas dinamicamente (lazy-loaded) para uma análise de bundle mais precisa; caso contrário, recorre à inspeção dos scripts carregados diretamente declarados no HTML.

## Utilização

```bash packageManager="npm"
npx intlayer scan <url>
```

```bash packageManager="yarn"
yarn intlayer scan <url>
```

```bash packageManager="pnpm"
pnpm intlayer scan <url>
```

```bash packageManager="bun"
bun x intlayer scan <url>
```

### Exemplo

```bash packageManager="npm"
npx intlayer scan https://example.com
```

Exemplo de saída:

```
🔍 Scanned https://example.com/fr (basic mode)

Score: 91/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: fr, en, es, de
Routing: locale prefix except for the default locale (every hreflang alternate but "en" starts with a locale segment, default locale: en)

Stack:
  Framework Next.js 15.1.0 (window.next.version)
  i18n library next-intl (JavaScript bundle contains "X-NEXT-INTL-LOCALE")
  TMS Crowdin (loads https://distributions.crowdin.net/…)

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ locale signals consistent (lang, URL, hreflang)
  ⚠ og:locale meta tag
      Missing <meta property="og:locale">: social previews default to en_US
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ hreflang alternates link back
  ✓ unused bundle locale content
  ✓ localized internal links
  ⚠ all internal links keep the locale
      2 internal links leave the "fr" locale (0 to another locale, 2 without locale)
        <a href="/pricing">Tarifs</a>
  ✓ crawlable language switcher
  ✓ robots.txt present
  ✓ robots.txt keeps localized URLs crawlable
  ✓ sitemap present
  ✓ sitemap lists every locale
  ✓ sitemap has alternate links
  ✓ sitemap has x-default

Bundle locale weight:
  Translations shipped: 120.50 KB
  Unused (other locales): 45.20 KB (37%)
```

## Opções

### `<url>` (obrigatório)

O URL completo a escanear (por exemplo, `https://example.com`).

### `--no-deep`

Desativa o scan profundo baseado em renderização.

Por padrão, o comando tenta utilizar o [puppeteer](https://pptr.dev/) para renderizar a página num navegador headless, capturar as partes de JavaScript carregadas de forma diferida e medir o tamanho real de transferência. Se o puppeteer não estiver instalado, o comando recorre automaticamente ao modo básico.

Passe `--no-deep` para forçar o modo básico mesmo quando o puppeteer estiver disponível.

> Exemplo: `npx intlayer scan https://example.com --no-deep`

### `--json`

Apresenta o resultado completo do scan como um objeto JSON em vez de um relatório formatado. Útil para consumo programático ou pipelines de CI.

> Exemplo: `npx intlayer scan https://example.com --json`

### Opções de configuração padrão

- **`--base-dir`** — Diretório base utilizado para localizar o ficheiro `intlayer.config.*`.
- **`-e, --env`** — Ambiente de destino (por exemplo, `development`, `production`).
- **`--env-file`** — Caminho para um ficheiro `.env` personalizado.
- **`--no-cache`** — Desativar cache de configuração.
- **`--ci`** — Executa o comando em cada projeto Intlayer do monorepo (ou apenas no atual quando executado de dentro de um diretório de projeto). Credenciais por projeto podem ser injetadas via `INTLAYER_PROJECT_CREDENTIALS`, um objeto JSON que associa cada caminho de projeto a `{ "clientId", "clientSecret" }`.
- **`--verbose`** — Ativar logs detalhados (padrão no modo CLI).
- **`--prefix`** — Prefixo de log personalizado.

## Estratégia de roteamento

O padrão de locale partilhado pelos alternativos hreflang da página revela como o site roteia as suas locales. Sem alternativos, apenas o URL analisado é utilizado (baixo nível de confiança).

| Estratégia          | Exemplo                               |
| ------------------- | ------------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`              |
| `prefix-no-default` | `/about` (locale padrão), `/fr/about` |
| `search-params`     | `/about?lang=fr`                      |
| `subdomain`         | `fr.example.com`                      |
| `domain`            | `example.fr`, `example.de`            |
| `no-prefix`         | Um URL para cada locale (cookie)      |

As verificações de links, links canónicos, robots.txt e sitemaps leem cada URL através desta estratégia. Por exemplo, um link sem prefixo está correto na locale padrão de um site `prefix-no-default`, e um link sem `?lang=` abandona a locale num site `search-params`.

## Stack detetada

Frameworks, bibliotecas i18n (Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…), sistemas de gestão de traduções (Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS) e proxies de tradução (Weglot, Localize, GTranslate…) são identificados a partir do HTML, dos recursos carregados e dos bundles JavaScript. O modo profundo também lê variáveis globais do window e cookies.

## O que é verificado

| Verificação                     | Descrição                                                                                               | Peso da pontuação |
| ------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------- |
| `html lang`                     | `<html lang>` está presente e é uma tag BCP 47 válida                                                   | 9                 |
| `html dir`                      | `dir="rtl"` está definido para idiomas lidos da direita para a esquerda (`ltr` é o padrão)              | 3                 |
| `locale signals consistent`     | `<html lang>`, a locale do URL e a entrada hreflang própria coincidem                                   | 5                 |
| `og:locale`                     | `og:locale` está definido e corresponde a `<html lang>`                                                 | 3                 |
| `canonical`                     | Existe um link canónico e não aponta para outra versão de idioma                                        | 10                |
| `hreflang`                      | As tags hreflang existem, com códigos válidos, URLs absolutos, sem duplicados e com uma auto-referência | 9                 |
| `x-default hreflang`            | Existe uma alternativa hreflang `x-default`                                                             | 7                 |
| `hreflang alternates link back` | Os alternativos respondem com 200, não são redirecionados, referenciam de volta e declaram o idioma     | 8                 |
| `localized links`               | Os links internos apontam para a locale da página                                                       | 8                 |
| `all links keep the locale`     | Nenhum link interno muda ou perde a locale                                                              | 6                 |
| `language switcher`             | Existem links `<a href>` rastreáveis para as outras versões de idioma                                   | 6                 |
| `robots.txt present`            | `/robots.txt` devolve uma resposta 200                                                                  | 10                |
| `robots.txt localized URLs`     | Nem o site nem os seus URLs localizados estão bloqueados para o Googlebot                               | 8                 |
| `sitemap present`               | É encontrado um sitemap (diretivas `Sitemap:` no robots.txt, `/sitemap.xml`, `/sitemap_index.xml`)      | 10                |
| `sitemap locale coverage`       | Cada locale está listada, e entradas com alternativos listam-se a si próprias                           | 9                 |
| `sitemap alternates`            | O sitemap contém links alternativos `hreflang`                                                          | 8                 |
| `sitemap x-default`             | O sitemap contém um hreflang `x-default`                                                                | 7                 |
| `unused bundle content`         | O bundle JS principal não inclui traduções de outras locales                                            | 8                 |

Um aviso concede metade do peso. A pontuação final é a soma ponderada das verificações executadas expressa em percentagem (0–100). As verificações reprovadas mostram os primeiros problemas encontrados; utilize `--json` para obter todos os detalhes.

## Utilização programática da função de scan

A função `scan` também é exportada a partir de `@intlayer/cli` para que possa ser chamada nos seus próprios scripts:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Para acesso de nível inferior, `scanWebsite` de `@intlayer/engine/scan` devolve um objeto `ScanResult` estruturado:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
